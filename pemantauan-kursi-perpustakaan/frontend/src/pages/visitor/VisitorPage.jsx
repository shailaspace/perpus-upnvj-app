
import Sidebar from "../../components/Sidebar";

function VisitorPage() {
  return (
    <div className="visitor-layout">
      <Sidebar />

      <div className="visitor-content">
        <main className="visitor-page">
          {/* Bagian Sambutan */}
          <section className="visitor-header">
            <div>
              <p className="visitor-label">
                LIBRARY SEAT MANAGEMENT
              </p>
              <h1>Selamat Datang di Perpustakaan UPNVJ</h1>
              <p>
                Temukan tempat terbaik untuk belajar dan
                mengembangkan ide.
              </p>
            </div>
          </section>

          {/* Informasi Perpustakaan */}
          <section className="visitor-stats">
            <div className="stat-card">
              <h3>144</h3>
              <p>Total Kursi</p>
            </div>

            <div className="stat-card">
              <h3>3</h3>
              <p>Jumlah Lantai</p>
            </div>

            <div className="stat-card">
              <h3>08.00–20.00</h3>
              <p>Jam Operasional</p>
            </div>
          </section>
          {/* BANNER PEMILIHAN KURSI */}
<section className="visitor-banner">
  <div className="banner-text">
    <p>YOUR SPACE, YOUR PRODUCTIVITY</p>
    <h2>Temukan Kursi Nyamanmu!</h2>
    <span>
      Pilih tempat duduk favoritmu dan mulai aktivitas
      belajar dengan lebih nyaman.
    </span>
    <a href="/visitor/seats" className="banner-button">
      Pilih Kursi Sekarang →
    </a>
  </div>

  <div className="banner-decoration">
    <span>📚</span>
  </div>
</section>
{/* PANDUAN MEMILIH KURSI */}
<section className="guide-section">
  <div className="section-heading">
    <p className="visitor-label">HOW IT WORKS</p>
    <h2>Cara Memilih Kursi</h2>
    <p>Ikuti tiga langkah mudah untuk mendapatkan tempat duduk.</p>
  </div>

  <div className="guide-grid">
    <div className="guide-card">
      <span className="guide-number">01</span>
      <h3>Pilih Lantai</h3>
      <p>Pilih lantai perpustakaan yang ingin kamu kunjungi.</p>
    </div>

    <div className="guide-card">
      <span className="guide-number">02</span>
      <h3>Pilih Kursi</h3>
      <p>Lihat denah dan pilih kursi yang masih tersedia.</p>
    </div>

    <div className="guide-card">
      <span className="guide-number">03</span>
      <h3>Scan QR Code</h3>
      <p>Scan QR Code pada kursi untuk melakukan konfirmasi.</p>
    </div>
  </div>
</section>
        </main>
      </div>
    </div>
  );
}

export default VisitorPage;
