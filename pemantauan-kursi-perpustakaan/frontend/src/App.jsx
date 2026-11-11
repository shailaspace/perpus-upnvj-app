import React, { useState } from "react";
import "./App.css";

// DATA DENAH KURSI PERSIS SESUAI PDF (Lantai 1, 3, dan 4)
const INITIAL_FLOORS = {
  1: {
    id: 1,
    name: "Lantai 1",
    area: "Area Kolaborasi",
    desc: "Ruang diskusi kelompok & meja kolaboratif",
    total: 19,
    available: 19,
    seats: [
      { id: "RD00", type: "table", status: "available" },
      { id: "RD01", type: "table", status: "available" },
      { id: "RD02", type: "table", status: "available" },
      { id: "A01", status: "available" },
      { id: "A02", status: "available" },
      { id: "A03", status: "available" },
      { id: "A04", status: "available" },
      { id: "A05", status: "available" },
      { id: "A06", status: "available" },
      { id: "A07", status: "available" },
      { id: "A08", status: "available" },
      { id: "A09", status: "available" },
      { id: "A10", status: "available" },
      { id: "A11", status: "available" },
      { id: "A12", status: "available" },
      { id: "A15", status: "available" },
      { id: "A16", status: "available" },
      { id: "A17", status: "available" },
      { id: "A18", status: "available" },
    ],
  },
  3: {
    id: 3,
    name: "Lantai 3",
    area: "Area Baca Umum",
    desc: "Koleksi buku utama & meja baca standar",
    total: 59,
    available: 36,
    seats: [
      { id: "RD05", type: "room", status: "available" },
      { id: "C01", status: "occupied" },
      { id: "C02", status: "available" },
      { id: "C03", status: "occupied" },
      { id: "C04", status: "available" },
      { id: "C05", status: "occupied" },
      { id: "C06", status: "occupied" },
      { id: "C07", status: "available" },
      { id: "C08", status: "available" },
      { id: "C09", status: "available" },
      { id: "C10", status: "available" },
      { id: "C11", status: "available" },
      { id: "C12", status: "available" }, // Bisa disimulasikan gagal/terisi di tahap Konfirmasi
      { id: "C13", status: "available" },
      { id: "C14", type: "large", status: "available" },
      { id: "C15", type: "large", status: "occupied" },
      { id: "C16", type: "large", status: "available" },
      { id: "C17", type: "large", status: "occupied" },
      { id: "C18", status: "occupied" },
      { id: "C19", status: "available" },
      { id: "C20", status: "available" },
      { id: "C21", status: "available" },
      { id: "C22", status: "occupied" },
      { id: "C23", status: "available" },
      { id: "C24", status: "available" },
      { id: "C25", status: "available" },
      { id: "C26", status: "occupied" },
      { id: "C27", status: "available" },
      { id: "C28", status: "available" },
      { id: "C29", status: "available" },
      { id: "C30", status: "occupied" },
      { id: "C31", status: "available" },
      { id: "C32", status: "available" },
      { id: "C33", status: "available" },
      { id: "C35", type: "wide", status: "occupied" },
      { id: "C36", type: "wide", status: "occupied" },
      { id: "C37", status: "available" },
      { id: "C38", status: "available" },
      { id: "C39", status: "available" },
      { id: "C40", type: "wide", status: "occupied" },
      { id: "C41", status: "available" },
      { id: "C42", status: "available" },
      { id: "C43", status: "available" },
      { id: "C44", status: "available" },
      { id: "C45", status: "available" },
      { id: "C46", status: "available" },
      { id: "C47", status: "available" },
      { id: "C48", status: "occupied" },
      { id: "C49", status: "available" },
      { id: "C50", status: "occupied" },
      { id: "C51", status: "available" },
      { id: "C52", status: "available" },
      { id: "C53", status: "occupied" },
      { id: "C54", status: "available" },
      { id: "C55", status: "available" },
      { id: "C56", status: "available" },
      { id: "C57", status: "occupied" },
      { id: "C58", status: "occupied" },
    ],
  },
  4: {
    id: 4,
    name: "Lantai 4",
    area: "Area Belajar Hening",
    desc: "Zona fokus tinggi tanpa suara untuk belajar mandiri",
    total: 62,
    available: 62,
    seats: [
      { id: "RD03", type: "room", status: "available" },
      { id: "RD04", type: "room", status: "available" },
      ...Array.from({ length: 60 }, (_, i) => {
        const num = String(i + 1).padStart(2, "0");
        return { id: `D${num}`, status: "available" };
      }),
    ],
  },
};

const INITIAL_HISTORY = [
  {
    code: "KLM-201026-042",
    seats: ["C07", "C12", "C13"],
    floor: "Lantai 3",
    area: "Baca Umum",
    date: "20 Okt 2026",
    fullDate: "20 Oktober 2026",
    time: "10.00-12.00 WIB",
    duration: "2 jam",
    status: "Aktif",
  },
  {
    code: "KLM-191026-031",
    seats: ["C05"],
    floor: "Lantai 3",
    area: "Baca Umum",
    date: "19 Okt 2026",
    fullDate: "19 Oktober 2026",
    time: "13.00-15.00 WIB",
    duration: "2 jam",
    status: "Selesai",
  },
  {
    code: "KLM-161026-018",
    seats: ["A08"],
    floor: "Lantai 1",
    area: "Area Kolaborasi",
    date: "16 Okt 2026",
    fullDate: "16 Oktober 2026",
    time: "09.00-10.00 WIB",
    duration: "1 jam",
    status: "Selesai",
  },
  {
    code: "KLM-151026-024",
    seats: ["D02"],
    floor: "Lantai 4",
    area: "Area Belajar Hening",
    date: "15 Okt 2026",
    fullDate: "15 Oktober 2026",
    time: "10.00-13.00 WIB",
    duration: "3 jam",
    status: "Selesai",
  },
  {
    code: "KLM-131026-027",
    seats: ["A06"],
    floor: "Lantai 1",
    area: "Area Kolaborasi",
    date: "13 Okt 2026",
    fullDate: "13 Oktober 2026",
    time: "14.00-16.00 WIB",
    duration: "2 jam",
    status: "Selesai",
  },
  {
    code: "KLM-121026-009",
    seats: ["D07"],
    floor: "Lantai 4",
    area: "Area Belajar Hening",
    date: "12 Okt 2026",
    fullDate: "12 Oktober 2026",
    time: "08.00-09.00 WIB",
    duration: "1 jam",
    status: "Selesai",
  },
];

export default function App() {
  // Navigation & Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home"); // 'home' | 'seats' | 'history'
  
  // Login Form States
  const [nim, setNim] = useState("2310511042");
  const [password, setPassword] = useState("12345678");
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Toast Notification State (Mirip PDF Hal 2 & 3)
  const [toast, setToast] = useState({
    show: false,
    title: "",
    message: "",
    type: "success", // 'success' | 'error'
  });

  // Seat Claiming States
  const [floors, setFloors] = useState(INITIAL_FLOORS);
  const [selectedFloor, setSelectedFloor] = useState(3);
  const [selectedSeats, setSelectedSeats] = useState(["C07", "C12", "C13"]);
  const [claimStep, setClaimStep] = useState(1); // 1: Pilih Kursi, 2: Konfirmasi, 3: Selesai (Modal)
  const [duration, setDuration] = useState(2); // 1, 2, atau 3 jam
  const [conflictSeat, setConflictSeat] = useState(null); // Untuk simulasi error PDF Hal 10
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Untuk PDF Hal 9

  // History & Detail Modal States
  const [historyList, setHistoryList] = useState(INITIAL_HISTORY);
  const [historyFilter, setHistoryFilter] = useState("Semua"); // 'Semua' | 'Aktif' | 'Selesai'
  const [detailModalItem, setDetailModalItem] = useState(null);
  const [profileModal, setProfileModal] = useState(false);

  // Helper Toast
  const triggerToast = (title, message, type = "success") => {
    setToast({ show: true, title, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3500);
  };

  // 1. HANDLER LOGIN (PDF Hal 1, 2, 3)
  const handleLogin = (e) => {
    e.preventDefault();
    if (nim.trim() === "2310511042" && password.length >= 4) {
      triggerToast(
        "Login berhasil",
        "Selamat datang, Nadia! Mengalihkan ke Home...",
        "success"
      );
      setTimeout(() => {
        setIsLoggedIn(true);
        setActiveMenu("home");
      }, 1200);
    } else {
      triggerToast(
        "Login gagal",
        "NIM / email atau password salah. Silakan coba lagi.",
        "error"
      );
    }
  };

  // Simulasi tombol cepat Login Gagal (untuk demo PDF Hal 3)
  const handleSimulateFailedLogin = () => {
    triggerToast(
      "Login gagal",
      "NIM / email atau password salah. Silakan coba lagi.",
      "error"
    );
  };

  // 2. HANDLER PILIH KURSI (PDF Hal 5, 6, 7)
  const handleSelectFloor = (floorId) => {
    setSelectedFloor(floorId);
    setSelectedSeats([]);
    setConflictSeat(null);
    setClaimStep(1);
  };

  const toggleSeat = (seat) => {
    if (seat.status === "occupied") {
      triggerToast(
        "Kursi Tidak Tersedia",
        `Kursi ${seat.id} sedang digunakan pengunjung lain.`,
        "error"
      );
      return;
    }

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seat.id));
    } else {
      if (selectedSeats.length >= 3) {
        triggerToast(
          "Batas Maksimal Kursi",
          "Kamu hanya dapat memilih maksimal hingga 3 kursi.",
          "error"
        );
        return;
      }
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  // 3. HANDLER KONFIRMASI & KLAIM (PDF Hal 8, 9, 10)
  const handleProceedToConfirm = () => {
    if (selectedSeats.length === 0) {
      triggerToast(
        "Pilih Kursi Dulu",
        "Silakan klik minimal 1 kursi hijau pada denah.",
        "error"
      );
      return;
    }
    setConflictSeat(null);
    setClaimStep(2);
  };

  // Simulasi Error Kursi C12 Diserobot Orang Lain (Persis PDF Hal 10)
  const handleSimulateConflict = () => {
    const targetSeat = selectedSeats.includes("C12")
      ? "C12"
      : selectedSeats[0];
    setConflictSeat(targetSeat);

    // Tandai kursi tersebut menjadi merah (occupied) di state lantai
    setFloors((prev) => {
      const current = prev[selectedFloor];
      const updatedSeats = current.seats.map((s) =>
        s.id === targetSeat ? { ...s, status: "occupied" } : s
      );
      return {
        ...prev,
        [selectedFloor]: {
          ...current,
          available: Math.max(0, current.available - 1),
          seats: updatedSeats,
        },
      };
    });

    triggerToast(
      `Klaim gagal. Kursi ${targetSeat} sudah terisi.`,
      `Gagal mengklaim kursi karena ${targetSeat} baru saja diklaim pengunjung lain.`,
      "error"
    );
  };

  // Eksekusi Klaim Berhasil (Persis PDF Hal 9)
  const handleConfirmClaim = () => {
    if (conflictSeat) {
      triggerToast(
        "Pilih Ulang Kursi",
        `Silakan hapus atau ganti kursi ${conflictSeat} yang sudah terisi.`,
        "error"
      );
      return;
    }

    const endHour = 10 + duration;
    const newClaim = {
      code: `KLM-201026-0${Math.floor(40 + Math.random() * 50)}`,
      seats: [...selectedSeats],
      floor: `Lantai ${selectedFloor}`,
      area: floors[selectedFloor].area.replace("Area ", ""),
      date: "20 Okt 2026",
      fullDate: "20 Oktober 2026",
      time: `10.00-${endHour}.00 WIB`,
      duration: `${duration} jam`,
      status: "Aktif",
    };

    // Tambahkan ke riwayat paling atas
    setHistoryList([newClaim, ...historyList.map(h => ({...h, status: "Selesai"}))]);
    setClaimStep(3);
    setShowSuccessModal(true);
  };

  // ============================================================================
  // RENDER HALAMAN 1 - 3: LOGIN SPLIT SCREEN
  // ============================================================================
  if (!isLoggedIn) {
    return (
      <div className="login-wrapper fade-in">
        {/* SISI KIRI: VISUAL INTERIOR PERPUSTAKAAN */}
        {/* SISI KIRI: VISUAL PERPUSTAKAAN */}
        <div
          className="login-left"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.45) 0%, rgba(15, 23, 42, 0.88) 100%), url("/images/perpustakaan-upnvj.jpeg")`,
          }}
        >
          <div className="brand-logo">
            <div className="logo-box">📖</div>
            <div>
              <strong>Perpustakaan</strong>
              <span>UPNVJ</span>
            </div>
          </div>

          <div className="hero-text-box slide-up">
            <div className="tagline">
              <span className="line-accent"></span>
              RUANG UNTUK BERTUMBUH
            </div>
            <h1>
              Ide besar dimulai
              <br />
              dari satu tempat.
            </h1>
            <p>
              Pilih kursimu, temukan fokusmu. Lebih mudah merencanakan waktu
              belajar di kampus.
            </p>

            <div className="hero-stats">
              <div>
                <h3>140</h3>
                <span>Kursi belajar</span>
              </div>
              <div>
                <h3>3</h3>
                <span>Lantai pilihan</span>
              </div>
              <div>
                <h3>08–20</h3>
                <span>Jam layanan WIB</span>
              </div>
            </div>
          </div>
        </div>

        {/* SISI KANAN: FORM LOGIN */}
        <div className="login-right">
          <div className="login-box slide-up">
            <span className="portal-badge">PORTAL MAHASISWA</span>
            <h2>
              Selamat datang
              <br />
              kembali.
            </h2>
            <p className="subtitle">
              Masuk untuk menemukan tempat terbaikmu di Perpustakaan UPNVJ.
            </p>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>NIM / Email</label>
                <div className="input-box">
                  <span className="icon-left">👤</span>
                  <input
                    type="text"
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                    placeholder="Masukkan NIM atau email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-box">
                  <span className="icon-left">🔒</span>
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    required
                  />
                  <button
                    type="button"
                    className="icon-right-btn"
                    onClick={() => setShowPass(!showPass)}
                    title="Lihat/Sembunyikan Password"
                  >
                    {showPass ? "👁️" : "🙈"}
                  </button>
                </div>
              </div>

              <div className="form-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Ingat saya</span>
                </label>
                <button
                  type="button"
                  className="text-btn-green"
                  onClick={() =>
                    triggerToast(
                      "Reset Password",
                      "Tautan pemulihan kata sandi telah dikirim ke email UPNVJ Anda.",
                      "success"
                    )
                  }
                >
                  Lupa password?
                </button>
              </div>

              <button type="submit" className="btn-primary-full">
                Login <span>&rarr;</span>
              </button>

              {/* Tombol bantu untuk mengetes tampilan Login Gagal di PDF Hal 3 */}
              <div className="demo-helper">
                <small>Mode Demo PDF:</small>
                <button
                  type="button"
                  className="btn-demo-mini"
                  onClick={() => {
                    setNim("2310511042");
                    setPassword("12345678");
                  }}
                >
                  Isi Akun Benar
                </button>
                <button
                  type="button"
                  className="btn-demo-mini danger"
                  onClick={handleSimulateFailedLogin}
                >
                  Tes Notif Login Gagal
                </button>
              </div>
            </form>

            <div className="info-banner">
              <span>ℹ️</span>
              <p>
                Gunakan akun akademik UPNVJ yang terdaftar. Akses khusus
                mahasiswa aktif.
              </p>
            </div>

            <div className="help-footer">
              Kesulitan masuk?{" "}
              <button
                type="button"
                className="text-btn-green"
                onClick={() =>
                  triggerToast(
                    "Layanan Petugas",
                    "Menghubungkan ke Helpdesk Perpustakaan UPNVJ...",
                    "success"
                  )
                }
              >
                Hubungi petugas ↗
              </button>
            </div>

            <div className="copyright-text">
              🛡️ &copy; 2026 Perpustakaan UPNVJ &bull; Akses aman kampus
            </div>
          </div>
        </div>

        {/* TOAST NOTIFICATION POPUP (PDF Hal 2 & 3) */}
        {toast.show && (
          <div className={`floating-toast ${toast.type} bounce-in`}>
            <div className="toast-icon">
              {toast.type === "success" ? "✔" : "✖"}
            </div>
            <div className="toast-body">
              <strong>{toast.title}</strong>
              <p>{toast.message}</p>
            </div>
            <button
              className="toast-close"
              onClick={() => setToast({ ...toast, show: false })}
            >
              ✕
            </button>
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // LAYOUT UTAMA DASHBOARD MAHASISWA (PDF Hal 4 - 11)
  // ============================================================================
  const currentFloorObj = floors[selectedFloor];
  const filteredHistory = historyList.filter((item) => {
    if (historyFilter === "Semua") return true;
    return item.status === historyFilter;
  });

  return (
    <div className="dashboard-layout fade-in">
      {/* SIDEBAR KIRI */}
      <aside className="sidebar">
        <div>
          <div
            className="sidebar-brand"
            onClick={() => setActiveMenu("home")}
            style={{ cursor: "pointer" }}
          >
            <div className="logo-box-green">📖</div>
            <div>
              <strong>Perpustakaan</strong>
              <span>UPNVJ</span>
            </div>
          </div>

          <div className="menu-group">
            <span className="menu-title">MENU UTAMA</span>
            <button
              className={`menu-item ${activeMenu === "home" ? "active" : ""}`}
              onClick={() => setActiveMenu("home")}
            >
              <span>🏠</span> Home
            </button>
            <button
              className={`menu-item ${activeMenu === "seats" ? "active" : ""}`}
              onClick={() => {
                setActiveMenu("seats");
                setClaimStep(1);
              }}
            >
              <span>🪑</span> Denah Kursi
            </button>
            <button
              className={`menu-item ${
                activeMenu === "history" ? "active" : ""
              }`}
              onClick={() => setActiveMenu("history")}
            >
              <span>🕒</span> Riwayat
            </button>
          </div>
        </div>

        <div className="sidebar-footer">
          <button
            className="librarian-btn"
            onClick={() =>
              triggerToast(
                "Pustakawan Online",
                "Halo Nadia! Ada yang bisa kami bantu terkait ketersediaan kursi?",
                "success"
              )
            }
          >
            💬 Hubungi pustakawan ↗
          </button>
          <p className="sidebar-copy">&copy; 2026 Perpustakaan UPNVJ</p>
        </div>
      </aside>

      {/* KONTEN UTAMA KANAN */}
      <div className="main-area">
        {/* TOPBAR HEADER */}
        <header className="topbar">
          <div>
            <h4>Halo, Nadia 👋</h4>
            <span>Selasa, 20 Oktober 2026</span>
          </div>
          <div className="topbar-actions">
            <button
              className="profile-pill"
              onClick={() => setProfileModal(true)}
            >
              <span className="avatar-np">NP</span> Profil
            </button>
            <button
              className="logout-btn"
              onClick={() => {
                setIsLoggedIn(false);
                triggerToast(
                  "Berhasil Keluar",
                  "Sampai jumpa kembali di Perpustakaan UPNVJ!",
                  "success"
                );
              }}
            >
              ↪ Logout
            </button>
          </div>
        </header>

        {/* ISI HALAMAN DINAMIS */}
        <main className="content-container">
          {/* ============================================================== */}
          {/* VIEW 1: DASHBOARD HOME (PDF Hal 4) */}
          {/* ============================================================== */}
          {activeMenu === "home" && (
            <div className="home-view slide-up">
              <span className="section-tag">DASHBOARD MAHASISWA</span>
              <h1 className="page-title">
                Belajar lebih nyaman, mulai di sini.
              </h1>
              <p className="page-subtitle">
                Temukan kursi yang pas untuk rencana belajarmu hari ini.
              </p>

              {/* 3 Kartu Statistik Atas */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-header">
                    <span>Total kursi</span>
                    <span className="stat-icon">🪑</span>
                  </div>
                  <h2>
                    140 <small>kursi</small>
                  </h2>
                  <p>Tersebar di 3 lantai</p>
                </div>

                <div className="stat-card highlight-green">
                  <div className="stat-header">
                    <span>Tersedia</span>
                    <span className="stat-icon">✅</span>
                  </div>
                  <h2>
                    117 <small>kursi</small>
                  </h2>
                  <p className="green-text">● Siap untuk diklaim</p>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span>Terisi</span>
                    <span className="stat-icon">🔴</span>
                  </div>
                  <h2>
                    23 <small>kursi</small>
                  </h2>
                  <p className="red-text">● Sedang digunakan</p>
                </div>
              </div>

              {/* Banner Hijau Utama */}
              <div className="cta-banner">
                <div className="cta-left">
                  <span className="open-pill">
                    ● PERPUSTAKAAN BUKA &bull; 08.00–20.00 WIB
                  </span>
                  <h2>Tempat nyaman untuk ide hebatmu.</h2>
                  <p>
                    Pilih kursi favorit dan atur waktu belajarmu. Klaim tempat
                    sebelum mulai beraktivitas.
                  </p>
                  <button
                    className="btn-white-cta"
                    onClick={() => {
                      setActiveMenu("seats");
                      setClaimStep(1);
                    }}
                  >
                    Klaim Kursi Perpustakaan &rarr;
                  </button>
                </div>

                <div className="cta-right-box">
                  <span className="now-label">SAAT INI</span>
                  <h3>117</h3>
                  <p>kursi tersedia</p>
                  <small>Diperbarui 10.00 WIB</small>
                </div>
              </div>

              {/* Pilih Suasana Belajarmu (3 Lantai) */}
              <h3 className="sub-heading">Pilih suasana belajarmu</h3>
              <div className="floor-cards-grid">
                {[1, 3, 4].map((fId) => {
                  const f = floors[fId];
                  return (
                    <div
                      key={fId}
                      className="floor-card"
                      onClick={() => {
                        handleSelectFloor(fId);
                        setActiveMenu("seats");
                      }}
                    >
                      <div className="floor-card-top">
                        <div>
                          <span className="floor-badge">{f.name}</span>
                          <h4>{f.area}</h4>
                        </div>
                        <span className="arrow-up-right">↗</span>
                      </div>
                      <p className="floor-desc">{f.desc}</p>
                      <div className="floor-progress-bar">
                        <div
                          className="floor-progress-fill"
                          style={{
                            width: `${(f.available / f.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <div className="floor-card-bottom">
                        <strong className="green-text">
                          ● {f.available} tersedia
                        </strong>
                        <span>dari {f.total} kursi</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Klaim kursi dalam 3 langkah */}
              <div className="steps-info-box">
                <h4>Klaim kursi dalam 3 langkah</h4>
                <div className="steps-three-col">
                  <div className="step-col">
                    <div className="step-num">1</div>
                    <div>
                      <strong>Pilih kursi</strong>
                      <p>Cek denah dan kursi tersedia.</p>
                    </div>
                  </div>
                  <div className="step-col">
                    <div className="step-num">2</div>
                    <div>
                      <strong>Atur durasi</strong>
                      <p>Pilih waktu belajar 1–3 jam.</p>
                    </div>
                  </div>
                  <div className="step-col">
                    <div className="step-num">3</div>
                    <div>
                      <strong>Mulai belajar</strong>
                      <p>Gunakan kursi sesuai klaimmu.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 2: DENAH KURSI & KONFIRMASI (PDF Hal 5, 6, 7, 8, 9, 10) */}
          {/* ============================================================== */}
          {activeMenu === "seats" && (
            <div className="seats-view slide-up">
              <span className="section-tag">KLAIM KURSI</span>
              <h1 className="page-title">
                {claimStep === 1
                  ? "Pilih tempat belajarmu"
                  : "Konfirmasi pilihanmu"}
              </h1>
              <p className="page-subtitle">
                {claimStep === 1
                  ? "Pilih kursi hijau yang tersedia. Kamu dapat memilih hingga 3 kursi."
                  : "Periksa detail kursi dan tentukan durasi sebelum klaim."}
              </p>

              {/* Stepper Wizard Interaktif */}
              <div className="stepper-bar">
                <div
                  className={`step-pill ${claimStep >= 1 ? "active" : ""}`}
                  onClick={() => setClaimStep(1)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="circle">{claimStep > 1 ? "✓" : "1"}</span>
                  Pilih kursi
                </div>
                <div className="step-line"></div>
                <div
                  className={`step-pill ${claimStep >= 2 ? "active" : ""}`}
                  onClick={() => {
                    if (selectedSeats.length > 0) setClaimStep(2);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <span className="circle">2</span>
                  Konfirmasi
                </div>
                <div className="step-line"></div>
                <div className={`step-pill ${claimStep === 3 ? "active" : ""}`}>
                  <span className="circle">3</span>
                  Selesai
                </div>
              </div>

              {/* STEP 1: TAMPILAN DENAH INTERAKTIF (PDF Hal 5, 6, 7) */}
              {claimStep === 1 && (
                <>
                  {/* Tab Pilihan Lantai */}
                  <div className="floor-tabs">
                    {[1, 3, 4].map((fId) => (
                      <button
                        key={fId}
                        className={`floor-tab-btn ${
                          selectedFloor === fId ? "active" : ""
                        }`}
                        onClick={() => handleSelectFloor(fId)}
                      >
                        <strong>Lantai {fId}</strong>
                        <span>{floors[fId].available} tersedia</span>
                      </button>
                    ))}
                  </div>

                  {/* Kotak Kanvas Denah */}
                  <div className="map-card">
                    <div className="map-card-header">
                      <div>
                        <h3>{currentFloorObj.area}</h3>
                        <span>
                          {currentFloorObj.total} kursi &bull;{" "}
                          {currentFloorObj.name}
                        </span>
                      </div>
                      <span className="available-badge">
                        ● {currentFloorObj.available} tersedia
                      </span>
                    </div>

                    {/* Kanvas Kursi Sesuai Lantai */}
                    <div className="map-canvas">
                      <div className="door-indicator">🚪 Pintu Masuk &rarr;</div>

                      <div className="seats-grid-layout">
                        {currentFloorObj.seats.map((seat) => {
                          const isSelected = selectedSeats.includes(seat.id);
                          let seatClass = "seat-box ";
                          if (seat.type === "large" || seat.type === "room")
                            seatClass += "seat-large ";
                          if (seat.type === "wide" || seat.type === "table")
                            seatClass += "seat-wide ";

                          if (seat.status === "occupied")
                            seatClass += "occupied";
                          else if (isSelected) seatClass += "selected";
                          else seatClass += "available";

                          return (
                            <button
                              key={seat.id}
                              className={seatClass}
                              onClick={() => toggleSeat(seat)}
                            >
                              {seat.id}
                            </button>
                          );
                        })}
                      </div>

                      {/* Legenda Warna Kursi */}
                      <div className="map-legend">
                        <span>
                          <i className="dot green"></i> Tersedia
                        </span>
                        <span>
                          <i className="dot red"></i> Terisi / nonaktif
                        </span>
                        <span>
                          <i className="dot blue"></i> Dipilih
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="map-Caption">
                    ℹ️ Kursi merah sedang digunakan dan tidak dapat dipilih.
                    Ketersediaan diperiksa lagi saat klaim.
                  </p>

                  {/* Bottom Bar Pemilihan Kursi */}
                  <div className="selection-bottom-bar">
                    <div className="selection-info">
                      <div className="seat-icon-box">🪑</div>
                      <div>
                        <strong>{selectedSeats.length} kursi dipilih</strong>
                        <p>
                          {selectedSeats.length > 0
                            ? `${currentFloorObj.name} • ${selectedSeats.join(
                                ", "
                              )}`
                            : "Belum ada kursi yang dipilih"}
                        </p>
                      </div>
                      {selectedSeats.length > 0 && (
                        <button
                          className="clear-selection-btn"
                          onClick={() => setSelectedSeats([])}
                        >
                          Hapus pilihan
                        </button>
                      )}
                    </div>

                    <button
                      className="btn-primary-action"
                      onClick={handleProceedToConfirm}
                    >
                      Lanjutkan Klaim &rarr;
                    </button>
                  </div>
                </>
              )}

              {/* STEP 2: KONFIRMASI PILIHAN & DURASI (PDF Hal 8, 9, 10) */}
              {claimStep >= 2 && (
                <div className="confirm-container slide-up">
                  {/* Banner Alert Merah Jika Simulasi Gagal/Bentrok Aktif (PDF Hal 10) */}
                  {conflictSeat && (
                    <div className="conflict-alert-banner bounce-in">
                      <span className="alert-icon">⚠️</span>
                      <div style={{ flex: 1 }}>
                        <strong>
                          Klaim gagal. Kursi {conflictSeat} sudah terisi.
                        </strong>
                        <p>
                          Gagal mengklaim kursi karena {conflictSeat} baru saja
                          diklaim oleh pengunjung lain. Silakan pilih kursi
                          pengganti di denah.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="confirm-two-col">
                    {/* Kolom Kiri: Ringkasan & Pilih Durasi */}
                    <div className="confirm-left-col">
                      <div className="white-card">
                        <div className="card-flex-between">
                          <h4>Ringkasan kursi</h4>
                          <button
                            className="text-btn-green"
                            onClick={() => setClaimStep(1)}
                          >
                            Ubah pilihan
                          </button>
                        </div>

                        <div className="selected-chips-row">
                          {selectedSeats.map((id) => (
                            <span
                              key={id}
                              className={`seat-chip ${
                                conflictSeat === id ? "chip-conflict" : ""
                              }`}
                            >
                              🪑 {id}{" "}
                              {conflictSeat === id && " (Tidak tersedia)"}
                            </span>
                          ))}
                        </div>

                        <div className="summary-meta-grid">
                          <div>
                            <small>Lantai</small>
                            <strong>{currentFloorObj.name}</strong>
                          </div>
                          <div>
                            <small>Area</small>
                            <strong>
                              {currentFloorObj.area.replace("Area ", "")}
                            </strong>
                          </div>
                          <div>
                            <small>Tanggal</small>
                            <strong>20 Oktober 2026</strong>
                          </div>
                          <div>
                            <small>Total kursi</small>
                            <strong>{selectedSeats.length} kursi</strong>
                          </div>
                        </div>
                      </div>

                      <div className="white-card">
                        <h4>Berapa lama kamu belajar?</h4>
                        <p className="card-sub">
                          Durasi dimulai saat klaim berhasil.
                        </p>

                        <div className="duration-grid">
                          {[1, 2, 3].map((jam) => (
                            <button
                              key={jam}
                              className={`duration-card ${
                                duration === jam ? "active" : ""
                              }`}
                              onClick={() => setDuration(jam)}
                            >
                              <div className="dur-top">
                                <strong>{jam} Jam</strong>
                                <span className="radio-dot"></span>
                              </div>
                              <p>Mulai 10.00 WIB</p>
                              <small>Selesai {10 + jam}.00 WIB</small>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Kolom Kanan: Info Sebelum Klaim / Pilih Ulang */}
                    <div className="confirm-right-col">
                      {!conflictSeat ? (
                        <div className="white-card">
                          <h4>Sebelum kamu klaim</h4>
                          <ul className="rules-list">
                            <li>
                              <span>✅</span>
                              <div>
                                <strong>Gunakan kursi sesuai nomor</strong>
                                <p>
                                  Pastikan tempat dudukmu sesuai dengan kursi
                                  yang diklaim.
                                </p>
                              </div>
                            </li>
                            <li>
                              <span>⏰</span>
                              <div>
                                <strong>Perhatikan waktu selesai</strong>
                                <p>
                                  Kosongkan kursi saat durasi berakhir agar
                                  dapat digunakan kembali.
                                </p>
                              </div>
                            </li>
                            <li>
                              <span>🤫</span>
                              <div>
                                <strong>Jaga kenyamanan bersama</strong>
                                <p>
                                  Jaga kebersihan dan hormati pengunjung lain.
                                </p>
                              </div>
                            </li>
                          </ul>

                          <div className="user-mini-card">
                            <div className="avatar-np">NP</div>
                            <div>
                              <strong>Nadia Putri</strong>
                              <span>NIM 2310511042</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="white-card conflict-side-card">
                          <h4>Pilih ulang dengan mudah</h4>
                          <p>
                            Kembali ke denah untuk melihat ketersediaan terbaru.
                            Pilih kursi pengganti, lalu konfirmasi kembali
                            durasi belajarmu.
                          </p>
                          <div className="empty-record-note">
                            ℹ️ Belum ada klaim yang tercatat di riwayat.
                          </div>
                          <button
                            className="btn-outline-full"
                            onClick={() => {
                              setSelectedSeats(
                                selectedSeats.filter((s) => s !== conflictSeat)
                              );
                              setConflictSeat(null);
                              setClaimStep(1);
                            }}
                          >
                            &larr; Kembali ke Denah & Pilih Pengganti
                          </button>
                        </div>
                      )}

                      {/* Tombol Simulasi Bentrok Kursi C12 Sesuai PDF Hal 10 */}
                      <div className="demo-conflict-box">
                        <span>🛠️ Fitur Demo PDF Hal. 10:</span>
                        <button
                          type="button"
                          className="btn-demo-mini danger"
                          onClick={handleSimulateConflict}
                        >
                          Simulasikan Kursi C12 Diserobot
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Bar Konfirmasi */}
                  <div className="selection-bottom-bar">
                    <div>
                      <strong>
                        {selectedSeats.length} kursi &bull; {duration} jam
                      </strong>
                      <p>
                        20 Okt 2026 &bull; 10.00–{10 + duration}.00 WIB &bull;
                        Dengan klaim, kamu menyetujui tata tertib perpustakaan.
                      </p>
                    </div>
                    <div className="bottom-btn-group">
                      <button
                        className="btn-secondary"
                        onClick={() => setClaimStep(1)}
                      >
                        Kembali
                      </button>
                      <button
                        className="btn-primary-action"
                        onClick={handleConfirmClaim}
                      >
                        Klaim Sekarang ✓
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 3: RIWAYAT KLAIM KURSI (PDF Hal 11) */}
          {/* ============================================================== */}
          {activeMenu === "history" && (
            <div className="history-view slide-up">
              <span className="section-tag">AKTIVITAS MAHASISWA</span>
              <h1 className="page-title">Riwayat klaim kursi</h1>
              <p className="page-subtitle">
                Semua tempat dan waktu belajar, tersimpan dalam satu halaman.
              </p>

              {/* Banner Status Kursi Aktif Saat Ini */}
              {historyList.some((h) => h.status === "Aktif") && (
                <div className="active-claim-banner">
                  <div className="active-banner-left">
                    <div className="clock-icon-box">🕒</div>
                    <div>
                      <strong>Kursimu aktif sampai 12.00 WIB</strong>
                      <p>
                        {historyList[0].seats.join(", ")} &bull;{" "}
                        {historyList[0].floor} &bull; {historyList[0].fullDate}
                      </p>
                    </div>
                  </div>
                  <div className="active-banner-right">
                    <span className="code-pill">{historyList[0].code}</span>
                    <strong>
                      {historyList[0].seats.length} kursi &bull;{" "}
                      {historyList[0].duration}
                    </strong>
                  </div>
                </div>
              )}

              {/* Filter Tab Riwayat */}
              <div className="history-Single-bar">
                <div className="filter-tabs">
                  {["Semua", "Aktif", "Selesai"].map((tab) => {
                    const count =
                      tab === "Semua"
                        ? historyList.length
                        : historyList.filter((h) => h.status === tab).length;
                    return (
                      <button
                        key={tab}
                        className={`filter-tab ${
                          historyFilter === tab ? "active" : ""
                        }`}
                        onClick={() => setHistoryFilter(tab)}
                      >
                        {tab} ({count})
                      </button>
                    );
                  })}
                </div>
                <div className="month-picker">📅 Oktober 2026</div>
              </div>

              {/* Tabel Riwayat Klaim */}
              <div className="table-card">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Nomor kursi</th>
                      <th>Lantai</th>
                      <th>Tanggal</th>
                      <th>Waktu</th>
                      <th>Durasi</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHistory.map((item) => (
                      <tr key={item.code}>
                        <td>
                          <strong>{item.seats.join(", ")}</strong>
                          <span className="sub-code">{item.code}</span>
                        </td>
                        <td>{item.floor}</td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.duration}</td>
                        <td>
                          <span
                            className={`status-badge ${
                              item.status === "Aktif" ? "aktif" : "selesai"
                            }`}
                          >
                            ● {item.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="detail-link-btn"
                            onClick={() => setDetailModalItem(item)}
                          >
                            Detail &gt;
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="table-footer">
                  <span>
                    Menampilkan 1–{filteredHistory.length} dari{" "}
                    {filteredHistory.length} klaim &bull; Status Selesai berarti
                    durasi klaim sudah berakhir.
                  </span>
                  <div className="pagination">
                    <button disabled>&lt;</button>
                    <button className="active">1</button>
                    <button disabled>&gt;</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ==================================================================== */}
      {/* MODAL POPUP KLAIM BERHASIL (PERSIS PDF HALAMAN 9) */}
      {/* ==================================================================== */}
      {showSuccessModal && (
        <div className="modal-overlay fade-in">
          <div className="modal-card bounce-in">
            <button
              className="modal-close"
              onClick={() => setShowSuccessModal(false)}
            >
              ✕
            </button>
            <div className="modal-success-icon">✓</div>
            <h2>Klaim Kursi Berhasil!</h2>
            <p className="modal-sub">
              Tempat belajarmu sudah siap, Nadia. Selamat belajar dengan nyaman!
            </p>

            <div className="ticket-box">
              <div className="ticket-top">
                <span className="ticket-code">{historyList[0]?.code}</span>
                <span className="status-badge aktif">● Aktif</span>
              </div>
              <div className="ticket-row">
                <span>Nomor kursi</span>
                <strong>{selectedSeats.join(", ")}</strong>
              </div>
              <div className="ticket-row">
                <span>Lantai / total</span>
                <strong>
                  Lantai {selectedFloor} &bull; {selectedSeats.length} kursi
                </strong>
              </div>
              <div className="ticket-row">
                <span>Tanggal</span>
                <strong>20 Oktober 2026</strong>
              </div>
              <div className="ticket-row">
                <span>Waktu</span>
                <strong>10.00–{10 + duration}.00 WIB</strong>
              </div>
              <div className="ticket-row">
                <span>Durasi</span>
                <strong>{duration} jam</strong>
              </div>
            </div>

            <button
              className="btn-primary-full"
              onClick={() => {
                setShowSuccessModal(false);
                setActiveMenu("history");
              }}
            >
              Lihat Riwayat &rarr;
            </button>
            <button
              className="btn-ghost-full"
              onClick={() => {
                setShowSuccessModal(false);
                setActiveMenu("home");
              }}
            >
              Kembali ke Home
            </button>
          </div>
        </div>
      )}

      {/* MODAL DETAIL RIWAYAT */}
      {detailModalItem && (
        <div className="modal-overlay fade-in">
          <div className="modal-card bounce-in">
            <button
              className="modal-close"
              onClick={() => setDetailModalItem(null)}
            >
              ✕
            </button>
            <h3>Detail Tiket Klaim Kursi</h3>
            <p className="modal-sub">Informasi lengkap riwayat reservasi Anda.</p>
            <div className="ticket-box">
              <div className="ticket-top">
                <span className="ticket-code">{detailModalItem.code}</span>
                <span
                  className={`status-badge ${
                    detailModalItem.status === "Aktif" ? "aktif" : "selesai"
                  }`}
                >
                  ● {detailModalItem.status}
                </span>
              </div>
              <div className="ticket-row">
                <span>Nomor Kursi</span>
                <strong>{detailModalItem.seats.join(", ")}</strong>
              </div>
              <div className="ticket-row">
                <span>Lokasi</span>
                <strong>
                  {detailModalItem.floor} ({detailModalItem.area})
                </strong>
              </div>
              <div className="ticket-row">
                <span>Tanggal</span>
                <strong>{detailModalItem.fullDate}</strong>
              </div>
              <div className="ticket-row">
                <span>Waktu & Durasi</span>
                <strong>
                  {detailModalItem.time} ({detailModalItem.duration})
                </strong>
              </div>
            </div>
            <button
              className="btn-primary-full"
              onClick={() => setDetailModalItem(null)}
            >
              Tutup Detail
            </button>
          </div>
        </div>
      )}

      {/* MODAL PROFIL MAHASISWA */}
      {profileModal && (
        <div className="modal-overlay fade-in">
          <div className="modal-card bounce-in">
            <button
              className="modal-close"
              onClick={() => setProfileModal(false)}
            >
              ✕
            </button>
            <div className="avatar-np-large">NP</div>
            <h3>Nadia Putri</h3>
            <p className="modal-sub">Mahasiswa Aktif &bull; Ilmu Komputer UPNVJ</p>
            <div className="ticket-box">
              <div className="ticket-row">
                <span>NIM</span>
                <strong>2310511042</strong>
              </div>
              <div className="ticket-row">
                <span>Fakultas</span>
                <strong>Ilmu Komputer</strong>
              </div>
              <div className="ticket-row">
                <span>Status Akun</span>
                <strong className="green-text">Terverifikasi Akademik</strong>
              </div>
            </div>
            <button
              className="btn-primary-full"
              onClick={() => setProfileModal(false)}
            >
              Selesai
            </button>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION POPUP */}
      {toast.show && (
        <div className={`floating-toast ${toast.type} bounce-in`}>
          <div className="toast-icon">
            {toast.type === "success" ? "✔" : "✖"}
          </div>
          <div className="toast-body">
            <strong>{toast.title}</strong>
            <p>{toast.message}</p>
          </div>
          <button
            className="toast-close"
            onClick={() => setToast({ ...toast, show: false })}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}