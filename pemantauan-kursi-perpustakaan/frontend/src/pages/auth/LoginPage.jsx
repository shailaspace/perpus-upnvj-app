
function LoginPage() {
  return (
    <div className="login-page">
      {/* Bagian kiri: foto dan informasi perpustakaan */}
      <section className="login-visual">
        <img
          src="/images/perpustakaan-upnvj.jpeg"
          alt="Gedung Perpustakaan UPNVJ"
        />

        <div className="visual-overlay">
          <h1>Ruang untuk Bertumbuh</h1>
          <p>
            Ide besar dimulai dari satu tempat.
            Pilih kursimu, temukan fokusmu.
          </p>
        </div>
      </section>

      {/* Bagian kanan: form login */}
      <section className="login-form-section">
        <div className="login-form">
          <p className="login-label">PORTAL PERPUSTAKAAN</p>

          <h2>Selamat datang kembali.</h2>

          <p>
            Masuk untuk menemukan tempat terbaikmu
            di Perpustakaan UPNVJ.
          </p>

          <form>
            <label>NIM / Email</label>
            <input
              type="text"
              placeholder="Masukkan NIM atau email"
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Masukkan password"
            />

            <button type="submit">Login</button>
          </form>

          <p className="login-note">
            Gunakan akun yang telah terdaftar.
          </p>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;