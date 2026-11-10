import Sidebar from "../../components/Sidebar";
import SeatMap from "../../components/SeatMap";

function SeatPage() {
  return (
    <div className="visitor-layout">
      <Sidebar />

      <div className="visitor-content">
        <main className="visitor-page">
          <div className="visitor-header">
            <p className="visitor-label">LIBRARY SEAT MANAGEMENT</p>
            <h1>Denah Kursi Perpustakaan</h1>
            <p>Pilih kursi yang tersedia untuk memulai aktivitas belajar.</p>
          </div>

          <section style={{ marginTop: "25px" }}>
            <h2 style={{ marginBottom: "15px", color: "#173e32" }}>
              Lantai 1
            </h2>

            <SeatMap />
          </section>
        </main>
      </div>
    </div>
  );
}

export default SeatPage;