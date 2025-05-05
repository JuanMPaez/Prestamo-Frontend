const URL_PRESTAMOS = `${process.env.NEXT_PUBLIC_URL_PRESTAMOS}/api`;

export const getPrestamos = async () => {
  try {
    const url = `${URL_PRESTAMOS}/tipos-prestamo`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Falied to connect");
    }
    const responseData = await response.json();
    return responseData?.resultados ?? [];
  } catch (error) {
    console.error(error);
  }
};

export const crearPrestamo = async (bodyCrearPrestamo) => {
  try {
    const url = `${URL_PRESTAMOS}/tipos-prestamo`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(bodyCrearPrestamo),
      headers: {
        'Content-Type':'application/json'
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
    const url = `${URL_PRESTAMOS}/tipos-prestamo/${id}/simulacion?monto=${monto}&plazo=${plazo}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Falied to connect");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
};
