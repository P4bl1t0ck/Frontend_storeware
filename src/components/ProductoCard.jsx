import "./ProductoCard.css";

export default function ProductoCard({ producto }) {
  return (
    <div className="producto-card">
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <strong>${producto.precio.toFixed(2)}</strong>
      <div className="producto-meta">
        <span>Stock: {producto.stock}</span>
        <span>Cat: {producto.categoria}</span>
        {producto.proveedorId != null && <span>Prov: {producto.proveedorId}</span>}
      </div>
    </div>
  );
}
