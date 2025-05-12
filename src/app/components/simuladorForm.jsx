"use client"; // Necesario para useState
import React, { useState } from "react";
import styles from "./simulador.module.css";
import { simularPrestamo } from "../api/prestamos";
import Link from "next/link"; // Para navegacion dentro de la aplicacion

export default function SimuladorForm({ prestamos }) {
  const [monto, setMonto] = useState(""); // Utiliza el hook useState para crear una variable de estado llamada monto y una función para actualizarla llamada setMonto. El valor inicial de monto es una cadena vacía ("").
  const [plazo, setPlazo] = useState("");
  const [prestamoSeleccionado, setPrestamoSeleccionado] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario (que es recargar la página).
    setError(null); // Limpia cualquier error previo
    setResultado(null); // Limpia los resultados previos.

    const prestamo = prestamos.find(
      (p) => p.id === parseInt(prestamoSeleccionado, 10) // Busca el tipo de préstamo seleccionado en la lista de préstamos utilizando el ID.
    ); //Parsear a entero

    if (
      !prestamo ||
      !monto ||
      !plazo ||
      isNaN(parseInt(monto, 10)) || // Radix 10 => base 10 (Decimal)
      isNaN(parseInt(plazo, 10))
    ) {
      setError("Por favor, completa todos los campos correctamente.");
      return;
    }

    const montoNumerico = parseInt(monto, 10); // Convierte el monto a un número entero.
    const plazoNumerico = parseInt(plazo, 10); // Convierte el plazo a un número entero.

    if (
      montoNumerico < parseInt(prestamo.minimumamount) ||
      montoNumerico > parseInt(prestamo.maximumamount)
    ) {
      setError(
        `El monto debe estar entre ${prestamo.minimumamount} y ${prestamo.maximumamount}.`
      );
      return;
    }

    if (
      plazoNumerico < parseInt(prestamo.minimumterm) ||
      plazoNumerico > parseInt(prestamo.maximumterm)
    ) {
      setError(
        `El plazo debe estar entre ${prestamo.minimumterm} y ${prestamo.maximumterm} meses.`
      );
      return;
    }

    try {
      const resultadoSimulacion = await simularPrestamo(
        prestamo.id,
        montoNumerico,
        plazoNumerico
      );
      setResultado({
        cuotaMensual: resultadoSimulacion?.cuota_mensual,
        costoTotal: resultadoSimulacion?.costo_total,
      });
    } catch (error) {
      setError(`No se obtuvo resultado`);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={styles["formulario-label"]} htmlFor="prestamo">
        Selecciona un prestamo:
      </label>
      <select
        className={styles["formulario-input"]}
        id="prestamo"
        value={prestamoSeleccionado}
        onChange={(e) => setPrestamoSeleccionado(e.target.value)} // Actualiza el prestamo seleccionado
        required // Agrega validación requerida
      >
        <option value="">Selecciona un prestamo</option>
        {prestamos.map((prestamo) => ( // mapea los prestamos y crea una opcion para cada uno en el menu desplegable
          <option key={prestamo.id} value={prestamo.id}>
            {prestamo.name}
          </option>
        ))}
      </select>
      {prestamoSeleccionado !== "" && ( // Comprobar que se selecciono algo
        <>
          <div>
            <label className={styles["formulario-label"]} htmlFor="monto">
              Monto:
            </label>
            <input
              className={styles["formulario-input"]}
              type="number"
              id="monto"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              required
              min="0" // Agrega validación mínima
            />
          </div>
          <div>
            <label className={styles["formulario-label"]} htmlFor="plazo">
              Plazo (meses):
            </label>
            <input
              className={styles["formulario-input"]}
              type="number"
              id="plazo"
              value={plazo}
              onChange={(e) => setPlazo(e.target.value)}
              required
              min="0" // Agrega validación mínima
            />
          </div>
          {error && <p className={styles["msgError"]}>{error}</p>}
        </> // Fragmentos: Permiten agrupar elementos sin añadir nodos extra al DOM, mejorando la organización y el rendimiento.
        // {error && <p className={styles["msgError"]}>{error}</p>} Muestra el mensaje de error si existe.
      )}
      <div className={styles.contenedorBotones}>
        <Link href={"/"} className={styles.regresarBoton}>
          Regresar
        </Link>
        {prestamoSeleccionado !== "" && (
          <>
            <button type="submit" className={styles.submitButton}>
              Simular
            </button>
          </>
        )}
      </div>
      {resultado && (
        <div>
          <h2 className={styles.subtitle}>Resultados de la Simulación</h2>
          <p className="enunciadoResultado">
            <strong>Cuota mensual estimada:</strong>{" "}
            {resultado.cuotaMensual.toFixed(2)}
          </p>
          <p className="enunciadoResultado">
            <strong>Costo total del préstamo:</strong>{" "}
            {resultado.costoTotal.toFixed(2)}
          </p>
        </div>
      )}
    </form>
  );
}
