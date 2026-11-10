
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Perpustakaan UPNVJ</h3>
          <p>
            Ruang untuk belajar, berkembang,
            dan menemukan inspirasi.
          </p>
        </div>

        <div className="footer-column">
          <h4>Navigasi</h4>
          <a href="/visitor/home">Home</a>
          <a href="/visitor/seats">Denah Kursi</a>
          <a href="/visitor/history">Riwayat</a>
        </div>

        <div className="footer-column">
          <h4>Layanan</h4>
          <a href="#">Panduan Penggunaan</a>
          <a href="#">Bantuan</a>
        </div>

        <div className="footer-column">
          <h4>Kontak</h4>
          <p>Perpustakaan UPNVJ</p>
          <p>Jakarta, Indonesia</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2026 Perpustakaan UPNVJ.
          Library Seat Management System.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
