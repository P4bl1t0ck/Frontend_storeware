import React, { useEffect, useState } from "react";
import { createProducto } from "../api/productos";
import { getProveedores } from "../api/proveedores";
import "./ProductoForm.css";

// Basic validation rules matching backend attributes
const nombreMax = 100;
const descripcionMax = 500;
const precioMin = 1.0;
const precioMax = 100000.0;
const stockMin = 0;
const stockMax = 999;
const categoriaMax = 50;

export default function ProductoForm({ onCreated }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    proveedorId: ""
  });

  const [proveedores, setProveedores] = useState([]);
  const [loadingProv, setLoadingProv] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Load proveedores (optional)
  useEffect(() => {
    (async () => {
      setLoadingProv(true);
      const data = await getProveedores();
      setProveedores(data);
      setLoadingProv(false);
    })();
  }, []);

  function updateField(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function validate() {
    const e = {};
    if (!form.nombre?.trim()) e.nombre = "El nombre es obligatorio.";
    else if (form.nombre.length > nombreMax) e.nombre = `Máximo ${nombreMax} caracteres.`;

    if (!form.descripcion?.trim()) e.descripcion = "La descripción es obligatoria.";
    else if (form.descripcion.length > descripcionMax) e.descripcion = `Máximo ${descripcionMax} caracteres.`;

    const precioNum = Number(form.precio);
    if (isNaN(precioNum)) e.precio = "Precio inválido.";
    else if (precioNum < precioMin || precioNum > precioMax) e.precio = `Entre ${precioMin} y ${precioMax}.`;

    const stockNum = parseInt(form.stock, 10);
    if (isNaN(stockNum)) e.stock = "Stock inválido.";
    else if (stockNum < stockMin || stockNum > stockMax) e.stock = `Entre ${stockMin} y ${stockMax}.`;

    if (!form.categoria?.trim()) e.categoria = "La categoría es obligatoria.";
    else if (form.categoria.length > categoriaMax) e.categoria = `Máximo ${categoriaMax} caracteres.`;

    const provNum = parseInt(form.proveedorId, 10);
    if (isNaN(provNum) || provNum <= 0) e.proveedorId = "Seleccione un proveedor.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        precio: Number(form.precio),
        stock: parseInt(form.stock, 10),
        categoria: form.categoria.trim(),
        proveedorId: parseInt(form.proveedorId, 10)
      };
      const created = await createProducto(payload);
      if (onCreated) onCreated(created);
      // Reset form
      setForm({ nombre:"", descripcion:"", precio:"", stock:"", categoria:"", proveedorId:"" });
    } catch (err) {
      console.error("Error creando producto", err);
      setSubmitError(err.response?.data?.title || "Error al crear el producto.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="producto-form" onSubmit={handleSubmit}>
      <h2>Nuevo Producto</h2>

      <div className="pf-field">
        <label>Nombre *</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={updateField}
          maxLength={nombreMax}
          required
        />
        {errors.nombre && <span className="pf-error">{errors.nombre}</span>}
      </div>

      <div className="pf-field">
        <label>Descripción *</label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={updateField}
          maxLength={descripcionMax}
          required
        />
        {errors.descripcion && <span className="pf-error">{errors.descripcion}</span>}
      </div>

      <div className="pf-field pf-row">
        <div>
          <label>Precio *</label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={updateField}
            step="0.01"
            min={precioMin}
            max={precioMax}
            required
          />
          {errors.precio && <span className="pf-error">{errors.precio}</span>}
        </div>
        <div>
          <label>Stock *</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={updateField}
            min={stockMin}
            max={stockMax}
            required
          />
          {errors.stock && <span className="pf-error">{errors.stock}</span>}
        </div>
      </div>

      <div className="pf-field">
        <label>Categoría *</label>
        <input
          type="text"
          name="categoria"
          value={form.categoria}
          onChange={updateField}
          maxLength={categoriaMax}
          required
        />
        {errors.categoria && <span className="pf-error">{errors.categoria}</span>}
      </div>

      <div className="pf-field">
        <label>Proveedor *</label>
        {loadingProv ? (
          <p>Cargando proveedores…</p>
        ) : proveedores.length > 0 ? (
          <select name="proveedorId" value={form.proveedorId} onChange={updateField} required>
            <option value="">-- Seleccione --</option>
            {proveedores.map(p => (
              <option key={p.id} value={p.id}>{p.nombre || `Proveedor ${p.id}`}</option>
            ))}
          </select>
        ) : (
          <>
            <input
              type="number"
              name="proveedorId"
              value={form.proveedorId}
              onChange={updateField}
              placeholder="Ingrese Id de proveedor"
              required
            />
            <small>No se pudieron cargar proveedores de la API.</small>
          </>
        )}
        {errors.proveedorId && <span className="pf-error">{errors.proveedorId}</span>}
      </div>

      {submitError && <div className="pf-submit-error">{submitError}</div>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Guardando..." : "Guardar Producto"}
      </button>
    </form>
  );
}
