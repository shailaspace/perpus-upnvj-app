
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SeatPage from "./pages/visitor/SeatPage";
import LoginPage from "./pages/auth/LoginPage";
import VisitorPage from "./pages/visitor/VisitorPage";
import AdminPage from "./pages/admin/AdminPage";
import HistoryPage from "./pages/visitor/HistoryPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Halaman Pengunjung */}
        <Route path="/visitor/home" element={<VisitorPage />} />

        {/* Halaman Admin */}
        <Route path="/admin/dashboard" element={<AdminPage />} />

        {/* Jika URL tidak ditemukan, kembali ke login */}
        <Route path="*" element={<Navigate to="/login" replace />} />

        <Route path="/visitor/seats" element={<SeatPage />} />

        <Route path="/visitor/history" element={<HistoryPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
