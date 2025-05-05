// /creacion-prestamo/page.jsx
"use client";

import React, { useState } from "react";
import styles from "../components/FormularioProducto.module.css"; // Importa el nuevo archivo de estilos
import Link from "next/link";
import { crearPrestamo } from "../api/prestamos";
import { useRouter } from "next/navigation";

function FormularioProducto() {
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [minTerm, setMinTerm] = useState("");
  const [maxTerm, setMaxTerm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (minAmount > maxAmount) {
      return setError(
        "El monto mínimo no puede ser mayor que el monto máximo."
      );
    }
    if (minTerm > maxTerm) {
      return setError(
        "El plazo mínimo no puede ser mayor que el plazo máximo."
      );
    }
    if (
      !productName ||
      !interestRate ||
      !minAmount ||
      !maxAmount ||
      !minTerm ||
      !maxTerm
    ) {
      return setError("Por favor, completa todos los campos.");
    }
    setError("");
    // Aquí puedes enviar los datos del formulario a tu backend
    try {
      await crearPrestamo({
        name: productName,
        annualInterestRate: interestRate,
        minimumAmount: minAmount,
        maximumAmount: maxAmount,
        minimumTerm: minTerm,
        maximumTerm: maxTerm,
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      setError("Error realizando la petición");
    }
  };

  return (
    <div className={styles["principal"]}>
      <div className={styles["recuadro"]}>
        <h1 className={styles["title"]}>Creación Tipo de Préstamo</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles["formulario-container"]}>
            <div>
              <label
                className={styles["formulario-label"]}
                htmlFor="nombreProducto"
              >
                Nombre del producto:
              </label>
              <input
                className={styles["formulario-input"]}
                type="text"
                id="nombreProducto"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div>
              <label
                className={styles["formulario-label"]}
                htmlFor="tasaInteres"
              >
                Tasa de interés anual (%):
              </label>
              <input
                className={styles["formulario-input"]}
                type="number"
                id="tasaInteres"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            <div>
              <label className={styles["formulario-label"]} htmlFor="montoMin">
                Monto mínimo permitido:
              </label>
              <input
                className={styles["formulario-input"]}
                type="number"
                id="montoMin"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
              />
            </div>
            <div>
              <label className={styles["formulario-label"]} htmlFor="montoMax">
                Monto máximo permitido:
              </label>
              <input
                className={styles["formulario-input"]}
                type="number"
                id="montoMax"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
              />
            </div>
            <div>
              <label className={styles["formulario-label"]} htmlFor="plazoMin">
                Plazo mínimo en meses:
              </label>
              <input
                className={styles["formulario-input"]}
                type="number"
                id="plazoMin"
                value={minTerm}
                onChange={(e) => setMinTerm(e.target.value)}
              />
            </div>
            <div>
              <label className={styles["formulario-label"]} htmlFor="plazoMax">
                Plazo máximo en meses:
              </label>
              <input
                className={styles["formulario-input"]}
                type="number"
                id="plazoMax"
                value={maxTerm}
                onChange={(e) => setMaxTerm(e.target.value)}
              />
            </div>
          </div>
          {error && <p className={styles["msgError"]}>{error}</p>}
          <div className={styles.contenedorBotones}>
            <Link href={"/"} className={styles.regresarBoton}>
              Regresar
            </Link>
            <button type="submit" className={styles.enviarBoton}>
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioProducto;
