// /simulacion-prestamo/page.jsx
"use client";
import React, { useState, useEffect } from 'react';
import SimuladorForm from '../components/simuladorForm';
import styles from '../components/simulador.module.css';
import { obtenerProductos } from '../utils/db';

export default function Simulador() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Obtener los productos de la base de datos usando utils/db.js
    const fetchProductos = async () => {
      const productosDB = await obtenerProductos(); // Función de utils/db.js
      setProductos(productosDB);
      console.log(productosDB);
    };
    fetchProductos();
  }, []);

  return (
    <div className= "grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className={styles['recuadro']}>
        <h1 className={styles.title}>Simulador de Préstamos</h1>
        {productos.length > 0 && (
          <div>
            <SimuladorForm productos={productos} />
          </div>
        )}
        {productos.length === 0 && <p>Cargando productos...</p>}
      </div>
    </div>
  );
}