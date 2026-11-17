const API_URL = import.meta.env.VITE_API_URL || "/api";
export async function getApiStatus() {
  const res = await fetch(`${API_URL}/status`);
  if (!res.ok) throw new Error("Backend offline");
  return res.json();
}

export async function getFloors(date) {
  const query = date ? `?date=${encodeURIComponent(date)}` : "";
  const res = await fetch(`${API_URL}/floors${query}`);
  if (!res.ok) throw new Error("Gagal mengambil data lantai");
  return res.json();
}

export async function loginMahasiswa(nimOrEmail, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nimOrEmail, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login gagal");
  return data.user;
}

export async function registerMahasiswa(payload) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registrasi gagal");
  return data;
}

export async function sendResetCode(email) {
  const res = await fetch(`${API_URL}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Gagal mengirim kode");
  return data;
}

export async function confirmResetPassword(email, otp, newPassword) {
  const res = await fetch(`${API_URL}/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, newPassword }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Gagal mengubah password");
  return data;
}

export async function getHistory(nim) {
  const res = await fetch(`${API_URL}/history/${nim}`);
  if (!res.ok) throw new Error("Gagal mengambil riwayat");
  return res.json();
}

export async function claimSeats(payload) {
  const res = await fetch(`${API_URL}/claim`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message || "Klaim gagal");
    err.conflictSeat = data.conflictSeat;
    throw err;
  }
  return data;
}