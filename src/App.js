import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AdminAddProducto from "./pages/AdminAddProducto";

export default function App() {
  return (
    <Router>
      <nav style={{padding:"1rem", background:"#fff", boxShadow:"0 2px 4px rgba(0,0,0,.1)", marginBottom:"1rem"}}>
        <Link to="/" style={{marginRight:"1rem"}}>Inicio</Link>
        <Link to="/admin/productos/nuevo">Nuevo Producto</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/productos/nuevo" element={<AdminAddProducto />} />
      </Routes>
    </Router>
  );
}