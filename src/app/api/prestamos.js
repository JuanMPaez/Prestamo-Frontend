const URL_PRESTAMOS = `${process.env.NEXT_PUBLIC_URL_PRESTAMOS}/api`; // Define constante URL_PRESTAMOS

export const getPrestamos = async () => {
  try {
    const url = `${URL_PRESTAMOS}/tipos-prestamo`;
    const response = await fetch(url); // Realiza una solicitud GET a la URL especificada utilizando la función fetch. await espera a que la solicitud se complete.
    if (!response.ok) {
      throw new Error("Falied to connect");
    }
    const responseData = await response.json(); // Convierte la respuesta (que es un objeto Response) en un objeto JSON.
    return responseData?.resultados ?? []; // ? permite evaluar undefined en lugar de generar un error. Operador de coalescencia nula (??) ofrece un array vacio en caso de no tener resultados.
  } catch (error) {
    console.error(error);
  }
};

export const crearPrestamo = async (bodyCrearPrestamo) => {
  try {
    const url = `${URL_PRESTAMOS}/tipos-prestamo`;
    const response = await fetch(url, { // Realiza una solicitud POST a la URL.
      method: "POST",
      body: JSON.stringify(bodyCrearPrestamo),
      headers: {
        'Content-Type':'application/json' // Importante para uqe lo reconozca la aplicación.
      }
    });
    if (!response.ok) {
      throw new Error("Falied to connect");
    }
    const responseData = await response.json();
    return responseData?.status ?? false;
  } catch (error) {
    console.error(error);
  }
};

export const simularPrestamo = async (id, monto, plazo) => {
  try {
    const url = `${URL_PRESTAMOS}/tipos-prestamo/${id}/simulacion?monto=${monto}&plazo=${plazo}`; // Incluye los parámetros montoyplazo` como parámetros de consulta (query parameters) en la URL.
    const response = await fetch(url); // Realiza una solicitud GET
    if (!response.ok) {
      throw new Error("Falied to connect");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
};
