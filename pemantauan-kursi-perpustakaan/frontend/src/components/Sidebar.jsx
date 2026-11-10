import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-brand">
        <div className="brand-icon">▣</div>
        <div>
          <h3>Perpustakaan</h3>
          <p>UPNVJ</p>
        </div>
      </div>
<div className="sidebar-menu">
  <p className="menu-label">MENU UTAMA</p>

  <NavLink to="/visitor/home">
    <span>⌂</span> Home
  </NavLink>

  <NavLink to="/visitor/seats">
    <span>▤</span> Denah Kursi
  </NavLink>

  <NavLink to="/visitor/history">
    <span>◷</span> Riwayat
  </NavLink>
</div>

      {/* Footer Sidebar */}
      <div className="sidebar-bottom">
        <a href="#">ⓘ Hubungi pustakawan ↗</a>
        <p>© 2026 Perpustakaan UPNVJ</p>
      </div>
    </aside>
  );
}

export default Sidebar;
