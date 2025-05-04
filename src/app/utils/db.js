export const obtenerProductos = async () => {
  try {
    return [{id: 1,
        name: 'a',
        annualInterestRate: 12,
        minimumAmount: 10,
        maximumAmount: 15, 
        minimumTerm: 1, 
        maximumTerm: 10}];
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};

export const calcularCuota = (monto, plazo, tasaInteresAnual) => {
  // Fórmula de cuota mensual (Sistema Francés)
  const tasaMensual = tasaInteresAnual / 12 / 100;
  const numerador = monto * tasaMensual * Math.pow(1 + tasaMensual, plazo);
  const denominador = Math.pow(1 + tasaMensual, plazo) - 1;
  //Manejo de posibles errores de división por cero
  if (denominador === 0) {
    return 0; //O lanza un error según tu manejo de excepciones
  }
  return numerador / denominador;
};