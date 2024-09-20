





export const deArregloAObjetoHelper = (arreglo)=>{
    // Convertimos el arreglo en un objeto
    const ejercicioObject = arreglo.reduce((accumulator, user, index) => {
      // Usamos una clave personalizada
      const clave = `ejercicio${index + 1}`;
      accumulator[clave] = user;
      return accumulator; // Retornamos el acumulador para la siguiente iteración
    }, {}); // Inicializamos el acumulador como un objeto vacío
    return ejercicioObject;
}