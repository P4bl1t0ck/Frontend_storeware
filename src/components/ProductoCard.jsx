import "./ProductoCard.css";

export default function ProductoCard({ producto }) {
  return (
    <div className="producto-card">
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <strong>${producto.precio}</strong>
    </div>
  );
}
