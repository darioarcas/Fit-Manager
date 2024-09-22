

// Esta funcion devuelve un objeto de objetos a partir de un arreglo de objetos
// recibe como argumento un arreglo de objetos y el nombre de la clave de cada valor dentro del objeto padre



export const deArregloAObjetoHelper = (arreglo, nombreClaveArreglo)=>{
    // Convertimos el arreglo en un objeto
    const ejercicioObject = arreglo.reduce((accumulator, user, index) => {
      // Usamos una clave personalizada
      const clave = `${nombreClaveArreglo}${index + 1}`;
      accumulator[clave] = user;
      return accumulator; // Retornamos el acumulador para la siguiente iteración
    }, {}); // Inicializamos el acumulador como un objeto vacío
    return ejercicioObject;
}