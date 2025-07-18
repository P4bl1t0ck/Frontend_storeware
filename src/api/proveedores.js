import axios from "axios";
import { API_BASE } from "./config";

const PROVEEDORES_URL = '${API_BASE}/api/ProveedorApi'; 
//apunta a nuesto API de proveedores

export async function getProveedores() {
  try {
    const { data } = await axios.get(PROVEEDORES_URL);
    return data;
  } catch (err) {
    console.warn("No se pudo obtener proveedores desde la API. Usa lista manual.", err);
    return [];
  }
}