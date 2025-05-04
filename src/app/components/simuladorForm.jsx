"use client";
import React, { useState } from 'react';
import styles from './simulador.module.css';
import { calcularCuota } from '../utils/db';

export default function SimuladorForm({ productos }) {
  const [monto, setMonto] = useState('');
  const [plazo, setPlazo] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResultado(null);

    const producto = productos.find((p) => p.id === parseInt(productoSeleccionado, 10)); //Parsear a entero

    if (!producto || !monto || !plazo || isNaN(parseInt(monto, 10)) || isNaN(parseInt(plazo, 10))) {
      setError('Por favor, completa todos los campos correctamente.');
      return;
    }

    const montoNumerico = parseInt(monto, 10);
    const plazoNumerico = parseInt(plazo, 10);

    if (montoNumerico < producto.minimumAmount || montoNumerico > producto.maximumAmount) {
      setError(`El monto debe estar entre ${producto.minimumAmount} y ${producto.maximumAmount}.`);
      return;
    }

    if (plazoNumerico < producto.minimumTerm || plazoNumerico > producto.maximumTerm) {
      setError(`El plazo debe estar entre ${producto.minimumTerm} y ${producto.maximumTerm} meses.`);
      return;
    }

    const cuotaMensual = calcularCuota(montoNumerico, plazoNumerico, producto.annualInterestRate);
    const costoTotal = cuotaMensual * plazoNumerico;

    setResultado({ cuotaMensual, costoTotal });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={styles['formulario-label']} htmlFor="producto">Selecciona un producto:</label>
      <select
        className={styles['formulario-input']}
        id="producto"
        value={productoSeleccionado}
        onChange={(e) => setProductoSeleccionado(e.target.value)}
        required // Agrega validación requerida
      >
        <option value="">Selecciona un producto</option>
        {productos.map((producto) => (
          <option key={producto.id} value={producto.id}>
            {producto.name}
          </option>
        ))}
      </select>
      {productoSeleccionado !== '' && 
      <> 
        <div>
          <label className={styles['formulario-label']} htmlFor="monto">Monto:</label>
          <input
            className={styles['formulario-input']}
            type="number"
            id="monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
            min="0" // Agrega validación mínima
          />
        </div>
        <div>
          <label className={styles['formulario-label']} htmlFor="plazo">Plazo (meses):</label>
          <input
            className={styles['formulario-input']}
            type="number"
            id="plazo"
            value={plazo}
            onChange={(e) => setPlazo(e.target.value)}
            required
            min="0" // Agrega validación mínima
          />
        </div>
        <button type="submit" className={styles.submitButton}>Simular</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {resultado && (
          <div>
            <h2 className={styles.subtitle}>Resultados de la Simulación</h2>
            <p className='enunciadoResultado'><strong>Cuota mensual estimada:</strong> {resultado.cuotaMensual.toFixed(2)}</p>
            <p className='enunciadoResultado'><strong>Costo total del préstamo:</strong> {resultado.costoTotal.toFixed(2)}</p>
          </div>
        )}
      </>
      }
    </form>
  );
}