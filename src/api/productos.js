import axios from "axios";
import { API_BASE } from "./config";

const PRODUCTOS_URL = '${API_BASE}/api/ProductoApi';
//apunta a nuestro API de productos
//Para su uso o coonsumo

export async function getProductos() {
  const { data } = await axios.get(PRODUCTOS_URL);
  return data;
}

export async function createProducto(payload) {
  // payload shape expected by backend Producto model
  // { nombre, descripcion, precio, stock, categoria, proveedorId }
  const { data } = await axios.post(PRODUCTOS_URL, payload);
  return data;
}
