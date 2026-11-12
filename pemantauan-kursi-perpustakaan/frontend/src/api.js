
const API_URL = "http://localhost:5000";

export async function getApiStatus() {
  const response = await fetch(`${API_URL}/`);

  if (!response.ok) {
    throw new Error("Gagal menghubungi backend");
  }

  return response.json();
}

export async function getFloors() {
  const response = await fetch(`${API_URL}/api/floors`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data lantai");
  }

  return response.json();
}