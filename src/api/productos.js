import axios from "axios";

// Configuración correcta de la URL base
const API_BASE = "http://localhost:5242";
const PRODUCTOS_URL = `${API_BASE}/api/ProductoApi`;

export async function getProductos() {
  try {
    const response = await axios.get(PRODUCTOS_URL);
    console.log("Datos recibidos:", response.data); // Para depuración
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
}

export async function createProducto(payload) {
  try {
    const response = await axios.post(PRODUCTOS_URL, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
}