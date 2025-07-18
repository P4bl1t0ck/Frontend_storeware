import { useEffect, useState } from "react";
import { getProductos } from "../api/productos"; 
import ProductoCard from "../components/ProductoCard";
import "./Home.css";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="home-container"><p>Cargando productos…</p></div>;
  if (error) return <div className="home-container"><p>{error}</p></div>;

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Tienda StoreWare <span className="highlight">🛒</span></h1>
        <p className="home-subtitle">Los mejores productos al mejor precio</p>
      </header>
      
      {productos.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📦</span>
          <p>No hay productos que mostrar</p>
        </div>
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
