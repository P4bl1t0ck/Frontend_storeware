import "./ProductoCard.css";

export default function ProductoCard({ producto }) {
  return (
    <div className="producto-card">
      <div className="producto-header">
        <h3 className="producto-nombre">{producto.nombre}</h3>
        <span className="producto-precio">${producto.precio.toFixed(2)}</span>
      </div>
      
      <p className="producto-descripcion">{producto.descripcion}</p>
      
      <div className="producto-meta">
        <span className="meta-item stock">
          <span className="meta-icon">📦</span> 
          {producto.stock} unidades
        </span>
        <span className="meta-item categoria">
          <span className="meta-icon">🏷️</span>
          {producto.categoria}
        </span>
        {producto.proveedorId != null && (
          <span className="meta-item proveedor">
            <span className="meta-icon">🏭</span>
            Prov. {producto.proveedorId}
          </span>
        )}
      </div>
      
      <button className="producto-button">
        Ver detalles
      </button>
    </div>
  );
}
