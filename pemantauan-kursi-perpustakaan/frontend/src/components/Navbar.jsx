
function Navbar() {
  return (
    <nav className="visitor-navbar">
      <div className="navbar-brand">
        <h2>Perpustakaan UPNVJ</h2>
      </div>

      <div className="navbar-menu">
        <a href="/visitor/home">Home</a>
        <a href="/visitor/seats">Denah Kursi</a>
        <a href="/visitor/history">Riwayat</a>
      </div>

      <div className="navbar-profile">
        <span>Pengunjung</span>
      </div>
    </nav>
  );
}

export default Navbar;
