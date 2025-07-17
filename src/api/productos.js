import axios from "axios";

const API_URL = "https://localhost:5242/api/ProductosApi";

export const getProductos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
