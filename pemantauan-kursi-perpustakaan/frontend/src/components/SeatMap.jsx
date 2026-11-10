import { useState } from "react";

function SeatMap() {
const [seats, setSeats] = useState(() => {
  const initialSeats = [
    { id: "A1", status: "available" },
    { id: "A2", status: "occupied" },
    { id: "A3", status: "available" },
    { id: "A4", status: "available" },
    { id: "B1", status: "occupied" },
    { id: "B2", status: "available" },
    { id: "B3", status: "available" },
    { id: "B4", status: "occupied" },
  ];

  const savedReservations = JSON.parse(
    localStorage.getItem("reservations") || "[]"
  );

    const reservedSeats = savedReservations
    .filter((item) => item.status !== "Dibatalkan")
    .map((item) => item.seat);

  return initialSeats.map((seat) =>
    reservedSeats.includes(seat.id)
      ? { ...seat, status: "occupied" }
      : seat
  );
});

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [confirmedSeat, setConfirmedSeat] = useState(null);
  const [duration, setDuration] = useState("1");

  function handleConfirmation() {
    console.log("Tombol konfirmasi dijalankan!");
    const reservation = {
  id: Date.now(),
  seat: selectedSeat,
  floor: "Lantai 1",
  date: new Date().toLocaleDateString("id-ID"),
  time: new Date().toLocaleTimeString("id-ID"),
  duration: Number(duration),
  status: "Dikonfirmasi",
};

const savedReservations = JSON.parse(
  localStorage.getItem("reservations") || "[]"
);

localStorage.setItem(
  "reservations",
  JSON.stringify([...savedReservations, reservation])
);
    setSeats((currentSeats) =>
      currentSeats.map((seat) =>
        seat.id === selectedSeat
          ? { ...seat, status: "occupied" }
          : seat
      )
    );

    setConfirmedSeat(selectedSeat);
    setSelectedSeat(null);
  }

  return (
    <div>
      <div className="seat-map">
        {seats.map((seat) => (
          <button
            key={seat.id}
            disabled={seat.status === "occupied"}
            onClick={() => setSelectedSeat(seat.id)}
            className={`seat ${seat.status} ${
              selectedSeat === seat.id ? "selected" : ""
            }`}
          >
            {seat.id}
          </button>
        ))}
      </div>

      {selectedSeat && (
        <div className="confirmation-panel">
          <p>Konfirmasi Pilihan Kursi</p>
          <h3>Kursi {selectedSeat}</h3>

          <label htmlFor="duration">Durasi Penggunaan</label>

          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="1">1 Jam</option>
            <option value="2">2 Jam</option>
            <option value="3">3 Jam</option>
          </select>

          <button onClick={handleConfirmation}>
            Konfirmasi Kursi
          </button>
        </div>
      )}

      {confirmedSeat && (
        <p className="confirmation-success">
          Kursi {confirmedSeat} berhasil dikonfirmasi
          untuk {duration} jam!
        </p>
      )}
    </div>
  );
}

export default SeatMap;