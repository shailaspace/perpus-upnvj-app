
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Mengambil data lantai dari folder data
const floors = require("./data/floor");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route utama
app.get("/", (req, res) => {
  res.json({
    message: "API Perpustakaan berhasil berjalan!"
  });
});

// Mengambil seluruh data lantai dan kursi
app.get("/api/floors", (req, res) => {
  res.json(floors);
});

// Mengambil data berdasarkan ID lantai
app.get("/api/floors/:id", (req, res) => {
  const floor = floors[req.params.id];

  if (!floor) {
    return res.status(404).json({
      message: "Data lantai tidak ditemukan"
    });
  }

  res.json(floor);
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
