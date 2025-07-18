import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AdminAddProducto from "./pages/AdminAddProducto";
import Banner from "./components/Banner/Banner";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      {/* Banner superior - Reemplaza con tu imagen */}
      <header className="app-banner">
        <Banner imageUrl="/banner.jpg" 
                title="StoreWare Fresh" 
                subitle="Storeware"
                />
      </header>

      {/* Barra de navegación lateral */}
      <NavSidebar />

      {/* Contenido principal */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/productos/nuevo" element={<AdminAddProducto />} />
        </Routes>
      </main>
    </div>
  );
}

// Componente de barra lateral separado para mejor manejo
function NavSidebar() {
  const location = useLocation();

  return (
    <nav className="sidebar">
      <ul className="nav-menu">
        <li className="nav-item">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Inicio</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/admin/productos/nuevo"
            className={`nav-link ${
              location.pathname.includes("/admin/productos") ? "active" : ""
            }`}
          >
            <span className="nav-icon">📦</span>
            <span className="nav-text">Productos</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
