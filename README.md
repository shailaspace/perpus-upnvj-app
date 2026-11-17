# 📚 Portal Mahasiswa: Sistem Pemantauan & Pemilihan Kursi Perpustakaan UPNVJ

🔗🔗https://sistem-booking-perpustakaan-p898.vercel.app/

Sistem informasi berbasis web (*Web-based Platform*) untuk memantau ketersediaan kursi perpustakaan secara *real-time* dan memfasilitasi klaim tempat duduk menggunakan pemindaian QR Code. Proyek ini dikembangkan untuk memenuhi tugas mata kuliah Manajemen Proyek Perangkat Lunak (MPPL) di Universitas Pembangunan Nasional "Veteran" Jakarta.

## ✨ Fitur Utama
* **Dasbor Real-Time:** Menampilkan statistik ketersediaan kursi di 3 lantai perpustakaan secara langsung (*live update*).
* **Klaim via QR Code:** Memvalidasi kehadiran fisik dan identitas kursi melalui pemindaian kode QR di lokasi.
* **Kendali Konkurensi (Concurrency Control):** Algoritma pencegahan *double-booking* yang mengunci baris data untuk menolak permintaan bersamaan di milidetik yang sama.
* **Rute Evakuasi Cerdas:** Implementasi algoritma *Graph* (jalur terpendek) untuk menentukan rute darurat dari kursi pengunjung menuju pintu keluar terdekat.
* **Manajemen Sesi:** Pengaturan durasi belajar (1-3 jam) yang terintegrasi dengan riwayat aktivitas mahasiswa.

## 🛠️ Tumpukan Teknologi (Tech Stack)
* **Frontend:** React.js, Vanilla CSS, HTML5
* **Backend & Algoritma:** Node.js, Supabase Edge Functions
* **Database & BaaS:** Supabase (PostgreSQL)

## 👥 Pembagian Peran Tim (Sprint 3)
* **UI/UX & Frontend (Pinkan):** Bertanggung jawab atas desain antarmuka, tata letak, dan integrasi DOM menggunakan React.js.
* **Algorithm & Backend (Shaila):** Mengelola arsitektur *server*, validasi muatan QR Code, kontrol konkurensi basis data, dan kalkulasi algoritma *Graph* rute evakuasi.
* **Database (Oktavia):** Merancang skema relasional (tabel `ruangan`, `kursi`, `riwayat_klaim`) dan migrasi basis data di Supabase.

## 🗄️ Skema Database Utama
Sistem ini menggunakan tiga tabel utama pada PostgreSQL:
1. `ruangan` (id, nama_ruangan, lantai, kapasitas)
2. `kursi` (id, ruangan_id, nomor_kursi, kode_qr, status)
3. `riwayat_klaim` (id, mahasiswa_nim, kursi_id, tanggal_klaim, waktu_mulai, durasi_jam, status_sesi)

## 🚀 Cara Instalasi & Menjalankan Proyek

### Prasyarat
* [Node.js](https://nodejs.org/) (versi 16 atau terbaru)
* [Git](https://git-scm.com/)
* Akun [Supabase](https://supabase.com/)

### Langkah Instalasi

1. **Kloning Repositori**
   ```bash
   git clone [https://github.com/](https://github.com/)[USERNAME-GITHUB-ANDA]/proyek-perpustakaan.git
   cd proyek-perpustakaan
