


//////////////////// Funcion Para Ordenar las Rutinas Cargadas






// Función para ordenar las sesiones y ejercicios
export const ordenarRutinasHelper = (rutinas) => {
    const rutinasOrdenadas = {};
  
  
    // Por cada clave y valor que haya en rutinas
    for (const [nombreRutina, datosRutina] of Object.entries(rutinas)) {
      const sesionesOrdenadas = {};
  
      // Obtenemos un arreglo de las claves de las sesiones (las ordenamos y reconstruimos el objeto)
      const sesionesKeys = Object.keys(datosRutina)
      // Filtramos el array de claves y obtenemos solo aquellas que comienzan con la cadena 'sesion'
        .filter(key => key.startsWith('sesion'))
      // Ordena las claves quitando la palabra sesion y ordenando los numeros de menor a mayor (ver punto 3)
        .sort((a, b) => parseInt(a.replace('sesion', '')) - parseInt(b.replace('sesion', '')));
  
      for (const sesionKey of sesionesKeys) {
        const ejerciciosOrdenados = {};
  
        // Obtener las claves de los ejercicios, ordenarlas y reconstruir el objeto
        const ejerciciosKeys = Object.keys(datosRutina[sesionKey])
          .filter(key => key.startsWith('ejercicio'))
          .sort((a, b) => parseInt(a.replace('ejercicio', '')) - parseInt(b.replace('ejercicio', '')));
  
        for (const ejercicioKey of ejerciciosKeys) {
          ejerciciosOrdenados[ejercicioKey] = datosRutina[sesionKey][ejercicioKey];
        }
  
        sesionesOrdenadas[sesionKey] = ejerciciosOrdenados;
      }
  
      rutinasOrdenadas[nombreRutina] = {
        ...datosRutina,
        ...sesionesOrdenadas
      };
    }
  
    return rutinasOrdenadas;
  };
  
  
  
  
  
  
  
  ////////////// EXPLICACION PUNTO 3
  
  
  //  .sort((a, b) => parseInt(a.replace('sesion', '')) - parseInt(b.replace('sesion', '')))
  
  
  // Expliccion: Este método ordena el array resultante de la operación anterior (las claves que comienzan
  // con 'sesion'). La función de comparación toma dos elementos (a y b) y los compara para determinar su orden.
  
  // Desglose de la función de comparación:
  
  // a.replace('sesion', ''): Esto elimina la parte 'sesion' del string, dejando solo el número. Por ejemplo,
  // para 'sesion1', esto devolvería '1'.
  // parseInt(...): Convierte ese string en un número entero. Así, parseInt('1') se convierte en el número 1.
  // Comparación: La resta entre los dos números (parseInt(...)) determina su orden:
  
  // Si el resultado es negativo (es decir, a es menor que b), entonces a aparecerá antes que b.
  // Si el resultado es positivo (es decir, a es mayor que b), entonces b aparecerá antes que a.
  // Si el resultado es cero, no hay cambio en el orden entre esos dos elementos.