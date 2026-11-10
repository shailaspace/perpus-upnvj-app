import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedReservations = JSON.parse(
      localStorage.getItem("reservations") || "[]"
    );

    setHistory(savedReservations);
  }, []);

  function handleCancel(id) {
    const updatedHistory = history.map((item) =>
      item.id === id
        ? { ...item, status: "Dibatalkan" }
        : item
    );

    localStorage.setItem(
      "reservations",
      JSON.stringify(updatedHistory)
    );

    setHistory(updatedHistory);
  }

  return (
    <div className="visitor-layout">
      <Sidebar />

      <div className="visitor-content">
        <main className="visitor-page">
          <section className="visitor-header">
            <p className="visitor-label">
              LIBRARY SEAT MANAGEMENT
            </p>
            <h1>Riwayat Pemesanan</h1>
            <p>Lihat daftar penggunaan kursi perpustakaanmu.</p>
          </section>

          <section className="history-section">
            <h2>Riwayat Penggunaan Kursi</h2>

            <div className="history-list">
              {history.length > 0 ? (
                history.map((item) => (
                  <div className="history-card" key={item.id}>
                    <div>
                      <h3>Kursi {item.seat}</h3>
                      <p>{item.floor}</p>
                      <p>{item.date}</p>
                      <p>{item.time}</p>
                      <p>Durasi: {item.duration} jam</p>
                    </div>

                    <div>
                      <span className="history-status">
                        {item.status}
                      </span>

                      {item.status !== "Dibatalkan" && (
                        <button
                          className="cancel-button"
                          onClick={() => handleCancel(item.id)}
                        >
                          Batalkan Pemesanan
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>Belum ada riwayat pemesanan.</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default HistoryPage;