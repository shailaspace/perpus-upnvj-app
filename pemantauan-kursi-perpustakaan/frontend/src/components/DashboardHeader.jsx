
function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <div className="header-greeting">
        <h3>Halo, Nadia 👋</h3>
        <p>Selasa, 20 Oktober 2026</p>
      </div>

      <div className="header-actions">
        <div className="profile-icon">NP</div>
        <button>Profil</button>
        <button>↪ Logout</button>
      </div>
    </header>
  );
}

export default DashboardHeader;
