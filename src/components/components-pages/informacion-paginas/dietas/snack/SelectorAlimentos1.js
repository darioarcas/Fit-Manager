import { useSelector } from 'react-redux';
import { alimentos } from '../arreglos';
import { useEffect, useState } from 'react';



export const SelectorAlimentos1 = ({setAlimentos1, setearAlimentos, actualizarFormulario, setCambioEnCalculadora, setAlimentos2, setAlimentos3, setAlimentos4, setAlimentos5, setAlimentos6, setAlimentos7}) => {

  const dieta =  useSelector (store=>{ return store.alumnos.active.dieta[0]});
  const alumnoActivoId = useSelector(store=>{ return store.alumnos.active.id ? store.alumnos.active.id : "no-existe"});
  const cargaFicha = useSelector(reducer => reducer.alumnos.carga);
  
  const [cargaCalculadoraDB, setCargaCalculadoraDB] = useState(false);


  const [seleccionado, setSeleccionado] = useState([
    alimentos[0],
    alimentos[0],
    alimentos[0],
    alimentos[0],
    alimentos[0],
    alimentos[0],
    alimentos[0],
  ]);
  const [seleccionReducer, setSeleccionReducer] = useState(["", "", "", "", "", "", ""]);
  const [cantidad, setCantidad] = useState([0, 0, 0, 0, 0, 0, 0]);





  const handleSelectChange = (e, origen = false, index) => {
    // if(origen === "usuario" && cargaFicha)setCambioEnCalculadora(true);
    // else {setCambioEnCalculadora(false);}

    // Devuelve el primer elemento del array que cumple con la condición
    const alimentoSeleccionado = alimentos.find(a => a.nombre === e.target.value);



    // // Reemplazamos solo el alimento seleccionado
    const copiaSeleccionado = seleccionado;
    const copiaSeleccionReducer = seleccionReducer;

    copiaSeleccionado[index] = {...copiaSeleccionado[index], ...alimentoSeleccionado};
    copiaSeleccionReducer[index] = alimentoSeleccionado.nombre;
    setSeleccionado(copiaSeleccionado);
    setSeleccionReducer(copiaSeleccionReducer);
    if(origen === "usuario"){
      setCantidad(cantidad.map((valor,i)=>{
        if(i === index) return 0;
        return valor;
      }));
  }
    
  };



  

    // Extrae las dependencias a variables separadas
    const seleccionadosArray = seleccionado.slice(0, 7); // Asumiendo que necesitas los primeros 7 elementos
    const cantidadesArray = cantidad.slice(0, 7); // Asumiendo que necesitas los primeros 7 elementos
  
  
    useEffect(() => {
      // Actualiza el alimento seleccionado en el reducer de dietas.active y del alumnos.active.dieta
      // En alumnos.active.dieta
      // cuando ya cargo la ficha y los datos de la calculadora
      if(cargaFicha === true && cargaCalculadoraDB === true){
        if(dietaParaReducer().calculadorasAlimentos !== undefined){
          actualizarFormulario(dietaParaReducer(), true);
        }
      }
    }, 
    [
      ...seleccionadosArray, 
      ...cantidadesArray,
    ])
    // [
    //   seleccionado[0], seleccionado[1], seleccionado[2], seleccionado[3], seleccionado[4], seleccionado[5], seleccionado[6], 
    //   cantidad[0], cantidad[1], cantidad[2], cantidad[3], cantidad[4], cantidad[5], cantidad[6]
    // ])


    
  


  const dietaParaReducer = ()=>{
    return {
      ...dieta,
      calculadorasAlimentos: {...dieta.calculadorasAlimentos, selectorAlimentosSnack: {
          selector1: {seleccionado: seleccionReducer[0], cantidad: parseInt(cantidad[0])},
          selector2: {seleccionado: seleccionReducer[1], cantidad: parseInt(cantidad[1])},
          selector3: {seleccionado: seleccionReducer[2], cantidad: parseInt(cantidad[2])},
          selector4: {seleccionado: seleccionReducer[3], cantidad: parseInt(cantidad[3])},
          selector5: {seleccionado: seleccionReducer[4], cantidad: parseInt(cantidad[4])},
          selector6: {seleccionado: seleccionReducer[5], cantidad: parseInt(cantidad[5])},
          selector7: {seleccionado: seleccionReducer[6], cantidad: parseInt(cantidad[6])},
        }
      }
    }
  }




  const handleInputChange = (e, origen = false, index) => {

    
    // Solo activamos la calculadora cuando el usuario ingresa datos nuevos
    // si quitamos esta condicion la calculadora se reinicia a 0
    if(origen === "usuario" && cargaFicha)setCambioEnCalculadora(true);
    else {setCambioEnCalculadora(false);}

    const copiaCantidad = cantidad;
    copiaCantidad[index] = e.target.value;
    setCantidad(copiaCantidad);



    const factor = e.target.value / seleccionado[index].cantidad;

    const dietaValores = {
      calorias: (seleccionado[index].calorias * factor).toFixed(2),
      proteinas: (seleccionado[index].proteinas * factor).toFixed(2),
      carbohidratos: (seleccionado[index].carbohidratos * factor).toFixed(2),
      grasas: (seleccionado[index].grasas * factor).toFixed(2),
    };


    // Guarda el valor en memoria
    if(index === 0)setAlimentos1(dietaValores);
    else if(index === 1)setAlimentos2(dietaValores);
    else if(index === 2)setAlimentos3(dietaValores);
    else if(index === 3)setAlimentos4(dietaValores);
    else if(index === 4)setAlimentos5(dietaValores);
    else if(index === 5)setAlimentos6(dietaValores);
    else if(index === 6)setAlimentos7(dietaValores);

    // Suma el valor con los otros selectores y los envia al reducer
    setearAlimentos(dietaValores, index + 1);
    
  };

  


  // Cambia el selector de alimentos y la cantidad a los valores guardados
  useEffect(() => {
    // Si se cargaron los alimentos
    if(cargaFicha === true && dieta.calculadorasAlimentos){
      setCambioEnCalculadora(false);

      const indicesVacios = ["", "", "", "", "", "", ""];

      // Si existe el selector de alimentos
      if(dieta.calculadorasAlimentos.selectorAlimentosSnack){
        // Ordenar el objeto dieta.calculadorasAlimentos.selectorAlimentosDesayuno de menor a mayor
        Object.entries(dieta.calculadorasAlimentos.selectorAlimentosSnack)
        .map(([clave, valor, index])=>{
          // Buscamos la posicion del selector
          const indice = parseInt(clave.replace("selector", '')) - 1;
          indicesVacios[indice] = indice;
          // Cargar cada nombre y cantidad en el formulario. En el caso de no haber datos, cargarlo vacio
          const nombreAlimento = valor.seleccionado;
          const cantidadAlimento = valor.cantidad;
          const nombre = {target:{value:nombreAlimento}};
          const cantidad = {target:{value:cantidadAlimento}};
          // Se carga el alimento en el indice correspondiente
          handleSelectChange(nombre, "db", indice);
          handleInputChange(cantidad, "db", indice);
          return "";
        });
      }else{
        // Si no existe, lo creamos
        actualizarFormulario(dietaParaReducer(), true);
      }

      // A los selectores que no tienen informacion se les asigna un nombre vacio y una cantidad cero
      for (let i = 0; i < 7; i++) {
        if(indicesVacios[i] === ""){
          const nombre = {target:{value:""}};
          const cantidad = {target:{value:0}};
          // Nombre
          handleSelectChange(nombre, "db", i);
          // Cantidad
          handleInputChange(cantidad, "db", i);
        }       
      }


      setCargaCalculadoraDB(true);
    }
  }, [alumnoActivoId, cargaFicha]);







  return (
    <div>

      {seleccionado.map((valor, index)=>{
        return <>
          {/* ALIMENTO */}
          <div className="d-flex flex-row" >
            <div className="d-flex flex-column" style={{width: "50%"}}>
              <select select="Claras de Huevo (40gr)" id="alimento" onChange={(e)=>{handleSelectChange(e, "usuario", index)}} value={valor.nombre} className="me-2 fs-6 bg-dark rounded" style={{height:"30px", color:"white"}}>
                {alimentos.map((alimento) => (
                  <option key={alimento.nombre} value={alimento.nombre}>
                    {alimento.nombre}
                  </option>
                ))}
              </select>
            </div>


            {/* CANTIDAD */}
            <div className="d-flex" style={{width: "50%"}}>
              <div className='d-flex flex-row'>
                <input
                    style={{width: "100%", height:"30px", color:"white"}}
                    type="number"
                    id="cantidad"
                    value={cantidad[index]}
                    onChange={(e)=>{handleInputChange(e, "usuario", index)}}
                    min="0"
                    className="fs-6 bg-dark rounded"
                />
                <p style={{margin:"0 auto", padding:"0", textAlign:"initial"}}>
                    ({valor.unidad})
                </p>
              </div>
            </div>



          </div>
        </>
      })}
        
    </div>
  )
}



