import React, { useState } from "react";
import ProductoForm from "../components/ProductoForm";
import { getProductos } from "../api/productos";
import ProductoCard from "../components/ProductoCard";
import "./AdminAddProducto.css";

export default function AdminAddProducto() {
  const [productos, setProductos] = useState([]);

  async function reloadProductos() {
    const data = await getProductos();
    setProductos(data);
  }

  return (
    <div className="admin-add-producto-container">
      <ProductoForm onCreated={reloadProductos} />
      <hr />
      <h2>Productos existentes</h2>
      <button onClick={reloadProductos}>Recargar</button>
      <div className="producto-grid">
        {productos.map(p => (
          <ProductoCard key={p.id} producto={p} />
        ))}
      </div>
    </div>
  );
}
