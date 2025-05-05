// /simulacion-prestamo/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import SimuladorForm from "../components/simuladorForm";
import styles from "../components/simulador.module.css";
import { getPrestamos } from "../api/prestamos.js";

export default function Simulador() {
  const [prestamos, setPrestamos] = useState([]);

  useEffect(() => {
    // Obtener los prestamos de la base de datos usando utils/db.js
    const fetchPrestamos = async () => {
      const prestamosDB = await getPrestamos(); // Función de api/prestamos.js
      setPrestamos(prestamosDB);
    };
    fetchPrestamos();
  }, []);

  return (
    <div className={styles["principal"]}>
      <div className={styles["recuadro"]}>
        <h1 className={styles.title}>Simulador de Préstamos</h1>
        {prestamos.length > 0 && (
          <div>
            <SimuladorForm prestamos={prestamos} />
          </div>
        )}
        {prestamos.length === 0 && <p>Cargando prestamos...</p>}
      </div>
    </div>
  );
}
