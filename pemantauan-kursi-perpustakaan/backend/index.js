const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
);

const FLOOR_META = {
  1: {
    id: 1,
    name: "Lantai 1",
    area: "Area Kolaborasi",
    desc: "Ruang diskusi kelompok & meja kolaboratif",
  },
  3: {
    id: 3,
    name: "Lantai 3",
    area: "Area Baca Umum",
    desc: "Koleksi buku utama & meja baca standar",
  },
  4: {
    id: 4,
    name: "Lantai 4",
    area: "Area Belajar Hening",
    desc: "Zona fokus tinggi tanpa suara untuk belajar mandiri",
  },
};

async function fetchFloorsFromSupabase(targetDateParam) {
  await supabase.rpc("sync_status_kursi");

  const todayJakarta = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Jakarta",
  });
  const checkDate = targetDateParam || todayJakarta;

  const [{ data: seatsData, error: seatsErr }, { data: claimsData }] = await Promise.all([
    supabase.from("kursi").select("*").order("id"),
    supabase
      .from("riwayat_klaim")
      .select("lantai, daftar_kursi, status, mulai_at")
      .in("status", ["Aktif", "Terjadwal"]),
  ]);

  if (seatsErr) throw seatsErr;

  const occupiedSet = new Set();
  (claimsData || []).forEach((claim) => {
    const claimDateJakarta = claim.mulai_at
      ? new Date(claim.mulai_at).toLocaleDateString("en-CA", {
          timeZone: "Asia/Jakarta",
        })
      : todayJakarta;

    // Merah jika kursi sudah dipesan ('Aktif' atau 'Terjadwal') pada tanggal yang sedang dilihat di denah
    if (claimDateJakarta === checkDate) {
      (claim.daftar_kursi || []).forEach((seatId) => {
        occupiedSet.add(`${claim.lantai}-${seatId}`);
      });
    }
  });

  const result = {};
  for (const floorId of [1, 3, 4]) {
    const seats = (seatsData || [])
      .filter((s) => Number(s.lantai) === floorId)
      .map((s) => ({
        id: s.id,
        type: s.tipe || undefined,
        status: occupiedSet.has(`${floorId}-${s.id}`) ? "occupied" : "available",
      }));
    const available = seats.filter((s) => s.status === "available").length;
    result[floorId] = {
      ...FLOOR_META[floorId],
      total: seats.length,
      available,
      seats,
    };
  }
  return result;
}

app.get("/api/floors", async (req, res) => {
  try {
    const floors = await fetchFloorsFromSupabase(req.query.date);
    res.json(floors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. AMBIL DATA KURSI PER LANTAI (DINAMIS)
app.get("/api/floors", async (req, res) => {
  try {
    const floors = await fetchFloorsFromSupabase();
    res.json(floors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. DAFTAR AKUN MAHASISWA BARU
app.post("/api/register", async (req, res) => {
  try {
    const { nim, nama, email, password } = req.body;
    if (!nim || !nama || !email || !password) {
      return res.status(400).json({ message: "Semua kolom wajib diisi." });
    }

    const { data: existing } = await supabase
      .from("mahasiswa")
      .select("nim")
      .or(`nim.eq.${nim},email.eq.${email}`)
      .maybeSingle();

    if (existing) {
      return res.status(409).json({ message: "NIM atau Email sudah terdaftar." });
    }

    const { error } = await supabase.from("mahasiswa").insert([
      {
        nim,
        nama,
        email,
        password,
        fakultas: "Ilmu Komputer",
      },
    ]);

    if (error) return res.status(400).json({ message: error.message });

    res.json({ message: "Akun berhasil didaftarkan ke Supabase! Silakan login." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. LOGIN MAHASISWA
app.post("/api/login", async (req, res) => {
  try {
    const { nimOrEmail, password } = req.body;
    const { data: user, error } = await supabase
      .from("mahasiswa")
      .select("*")
      .or(`nim.eq.${nimOrEmail},email.eq.${nimOrEmail}`)
      .eq("password", password)
      .maybeSingle();

    if (error) return res.status(400).json({ message: error.message });
    if (!user) {
      return res.status(401).json({ message: "NIM / Email atau Password salah." });
    }

    res.json({
      user: {
        nim: user.nim,
        nama: user.nama,
        email: user.email,
        fakultas: user.fakultas || "Ilmu Komputer",
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5. LUPA PASSWORD & RESET PASSWORD
const otpStore = {};

app.post("/api/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const { data: user } = await supabase
      .from("mahasiswa")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (!user) {
      return res.status(404).json({ message: "Email tidak terdaftar di sistem." });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    otpStore[email] = otp;
    res.json({ message: "Kode OTP berhasil dibuat.", devOtp: otp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (otpStore[email] !== otp) {
      return res.status(400).json({ message: "Kode OTP salah." });
    }

    const { error } = await supabase
      .from("mahasiswa")
      .update({ password: newPassword })
      .eq("email", email);

    if (error) return res.status(400).json({ message: error.message });

    delete otpStore[email];
    res.json({ message: "Password berhasil diperbarui!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 6. AMBIL RIWAYAT KLAIM PER MAHASISWA (OTOMATIS SINKRON STATUS)
app.get("/api/history/:nim", async (req, res) => {
  try {
    const { nim } = req.params;
    await supabase.rpc("sync_status_kursi");

    const { data, error } = await supabase
      .from("riwayat_klaim")
      .select("*")
      .eq("nim", nim)
      .order("id", { ascending: false });

    if (error) return res.status(400).json({ message: error.message });

    const formatted = (data || []).map((item) => ({
      code: item.kode_klaim || "-",
      seats: Array.isArray(item.daftar_kursi) ? item.daftar_kursi : [],
      floor: `Lantai ${item.lantai || "-"}`,
      area: item.area || "Umum",
      date: item.tanggal_short || item.tanggal_singkat || "-",
      fullDate: item.tanggal_full || item.tanggal_lengkap || item.tanggal_short || "-",
      time: item.waktu || "-",
      duration: item.durasi || "-",
      status: item.status || "Selesai",
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 7. SIMPAN KLAIM KURSI KE SUPABASE (MENDUKUNG TANGGAL & JAM BESOK)
app.post("/api/claim", async (req, res) => {
  try {
    const { floorId, seats, duration, nim, bookingDate, startHour } = req.body;
    const { data, error } = await supabase.rpc("klaim_kursi", {
      p_nim: nim || "2310511042",
      p_lantai: Number(floorId),
      p_kursi: seats,
      p_durasi: Number(duration || 2),
      p_tanggal: bookingDate || null,
      p_jam_mulai: startHour !== undefined && startHour !== null ? Number(startHour) : null,
    });

    if (error) return res.status(400).json({ message: error.message });
    if (!data.success) {
      return res.status(409).json({
        message: data.message,
        conflictSeat: data.conflictSeat,
      });
    }

    const floors = await fetchFloorsFromSupabase();
    res.json({
      message: "Klaim kursi berhasil disimpan!",
      claim: data.claim,
      floors,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server backend berjalan di http://localhost:${PORT}`);
  });
}

app.get("/api/status", (req, res) => {
  res.json({
    status: "success",
    message: "Backend berhasil terhubung!"
  });
});

module.exports = app;