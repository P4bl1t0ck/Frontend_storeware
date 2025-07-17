import { useEffect, useState } from "react";
import { getProductos } from "../api/productos"; // <-- asegúrate que el archivo se llame productos.js
import ProductoCard from "../components/ProductoCard";
import "./Home.css";

export default function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos()
      .then(data => {
        console.log("Productos recibidos:", data);
        setProductos(data || []); // por si viene null
      })
      .catch(error => {
        console.error("Error al cargar productos:", error);
      });
  }, []);

  return (
    <div className="home-container">
      <h1>Tienda StoreWare 🛒</h1>

      {productos.length === 0 ? (
        <p>No hay productos que mostrar.</p>
      ) : (
        <div className="producto-grid">
          {productos.map(p => (
            <ProductoCard key={p.id} producto={p} />
          ))}
        </div>
      )}
    </div>
  );
}
