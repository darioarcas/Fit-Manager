// Recibe los valores(proteinas, carbohidratos, grasas, calorias)
// de las calculadoras (desayuno, almuerzo, merienda...etc). Los suma y los manda al reducer
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { actualizarProteina } from '../../../../../actions/dietas';
import { CalculadoraDesayuno } from '../desayuno/CalculadoraDesayuno';
import { CalculadoraAlmuerzo } from '../almuerzo/CalculadoraAlmuerzo';
import { CalculadoraMerienda } from '../merienda/CalculadoraMerienda';
import { CalculadoraCena } from '../cena/CalculadoraCena';
import { CalculadoraPostWork } from '../post-work/CalculadoraPostWork';
import { CalculadoraSnack } from '../snack/CalculadoraSnack';


const initialArray = { 
    calorias: 0,
    proteinas: 0,
    carbohidratos: 0,
    grasas: 0
  };



export const SumaTotal = () => {



    const dispatch = useDispatch();
    // Almacenamos el estado de la calculadora para la proxima suma
    const [calculadoraDesayuno, setCalculadoraDesayuno] = useState(initialArray);
    const [calculadoraAlmuerzo, setCalculadoraAlmuerzo] = useState(initialArray);
    const [calculadoraMerienda, setCalculadoraMerienda] = useState(initialArray);
    const [calculadoraCena, setCalculadoraCena] = useState(initialArray);
    const [calculadoraPostWork, setCalculadoraPostWork] = useState(initialArray);
    const [calculadoraSnack, setCalculadoraSnack] = useState(initialArray);



    const sumatoriaTotal = (id, sumaCalculadora, dietaActiva, calculadora)=>{

        
        
        // Almacenamos el valor correspondiente a cada calculadora
        switch (calculadora) {
            case "desayuno":

                const suma1 = { 
                    calorias: (parseFloat(sumaCalculadora.calorias)  + parseFloat(calculadoraAlmuerzo.calorias)  + parseFloat(calculadoraMerienda.calorias)  + parseFloat(calculadoraCena.calorias)  + parseFloat(calculadoraPostWork.calorias)  + parseFloat(calculadoraSnack.calorias)).toFixed(2),
                    proteinas: (parseFloat(sumaCalculadora.proteinas)  + parseFloat(calculadoraAlmuerzo.proteinas)  + parseFloat(calculadoraMerienda.proteinas)  + parseFloat(calculadoraCena.proteinas)  + parseFloat(calculadoraPostWork.proteinas)  + parseFloat(calculadoraSnack.proteinas)).toFixed(2),
                    carbohidratos: (parseFloat(sumaCalculadora.carbohidratos)  + parseFloat(calculadoraAlmuerzo.carbohidratos)  + parseFloat(calculadoraMerienda.carbohidratos)  + parseFloat(calculadoraCena.carbohidratos)  + parseFloat(calculadoraPostWork.carbohidratos)  + parseFloat(calculadoraSnack.carbohidratos)).toFixed(2),
                    grasas: (parseFloat(sumaCalculadora.grasas)  + parseFloat(calculadoraAlmuerzo.grasas)  + parseFloat(calculadoraMerienda.grasas)  + parseFloat(calculadoraCena.grasas)  + parseFloat(calculadoraPostWork.grasas)  + parseFloat(calculadoraSnack.grasas)).toFixed(2),
                }

                dispatch(actualizarProteina(id, suma1, dietaActiva));

                break;



            case "almuerzo":

                const suma2 = { 
                    calorias: (parseFloat(calculadoraDesayuno.calorias)  + parseFloat(sumaCalculadora.calorias)  + parseFloat(calculadoraMerienda.calorias)  + parseFloat(calculadoraCena.calorias)  + parseFloat(calculadoraPostWork.calorias)  + parseFloat(calculadoraSnack.calorias)).toFixed(2),
                    proteinas: (parseFloat(calculadoraDesayuno.proteinas)  + parseFloat(sumaCalculadora.proteinas)  + parseFloat(calculadoraMerienda.proteinas)  + parseFloat(calculadoraCena.proteinas)  + parseFloat(calculadoraPostWork.proteinas)  + parseFloat(calculadoraSnack.proteinas)).toFixed(2),
                    carbohidratos: (parseFloat(calculadoraDesayuno.carbohidratos)  + parseFloat(sumaCalculadora.carbohidratos)  + parseFloat(calculadoraMerienda.carbohidratos)  + parseFloat(calculadoraCena.carbohidratos)  + parseFloat(calculadoraPostWork.carbohidratos)  + parseFloat(calculadoraSnack.carbohidratos)).toFixed(2),
                    grasas: (parseFloat(calculadoraDesayuno.grasas)  + parseFloat(sumaCalculadora.grasas)  + parseFloat(calculadoraMerienda.grasas)  + parseFloat(calculadoraCena.grasas)  + parseFloat(calculadoraPostWork.grasas)  + parseFloat(calculadoraSnack.grasas)).toFixed(2),
                }

                dispatch(actualizarProteina(id, suma2, dietaActiva));


                break;



            case "merienda":

                const suma3 = { 
                    calorias: (parseFloat(calculadoraDesayuno.calorias)  + parseFloat(calculadoraAlmuerzo.calorias)  + parseFloat(sumaCalculadora.calorias)  + parseFloat(calculadoraCena.calorias)  + parseFloat(calculadoraPostWork.calorias)  + parseFloat(calculadoraSnack.calorias)).toFixed(2),
                    proteinas: (parseFloat(calculadoraDesayuno.proteinas)  + parseFloat(calculadoraAlmuerzo.proteinas)  + parseFloat(sumaCalculadora.proteinas)  + parseFloat(calculadoraCena.proteinas)  + parseFloat(calculadoraPostWork.proteinas)  + parseFloat(calculadoraSnack.proteinas)).toFixed(2),
                    carbohidratos: (parseFloat(calculadoraDesayuno.carbohidratos)  + parseFloat(calculadoraAlmuerzo.carbohidratos)  + parseFloat(sumaCalculadora.carbohidratos)  + parseFloat(calculadoraCena.carbohidratos)  + parseFloat(calculadoraPostWork.carbohidratos)  + parseFloat(calculadoraSnack.carbohidratos)).toFixed(2),
                    grasas: (parseFloat(calculadoraDesayuno.grasas)  + parseFloat(calculadoraAlmuerzo.grasas)  + parseFloat(sumaCalculadora.grasas)  + parseFloat(calculadoraCena.grasas)  + parseFloat(calculadoraPostWork.grasas)  + parseFloat(calculadoraSnack.grasas)).toFixed(2),
                }

                dispatch(actualizarProteina(id, suma3, dietaActiva));


                break;



            case "cena":

                const suma4 = { 
                    calorias: (parseFloat(calculadoraDesayuno.calorias)  + parseFloat(calculadoraAlmuerzo.calorias)  + parseFloat(calculadoraMerienda.calorias)  + parseFloat(sumaCalculadora.calorias)  + parseFloat(calculadoraPostWork.calorias)  + parseFloat(calculadoraSnack.calorias)).toFixed(2),
                    proteinas: (parseFloat(calculadoraDesayuno.proteinas)  + parseFloat(calculadoraAlmuerzo.proteinas)  + parseFloat(calculadoraMerienda.proteinas)  + parseFloat(sumaCalculadora.proteinas)  + parseFloat(calculadoraPostWork.proteinas)  + parseFloat(calculadoraSnack.proteinas)).toFixed(2),
                    carbohidratos: (parseFloat(calculadoraDesayuno.carbohidratos)  + parseFloat(calculadoraAlmuerzo.carbohidratos)  + parseFloat(calculadoraMerienda.carbohidratos)  + parseFloat(sumaCalculadora.carbohidratos)  + parseFloat(calculadoraPostWork.carbohidratos)  + parseFloat(calculadoraSnack.carbohidratos)).toFixed(2),
                    grasas: (parseFloat(calculadoraDesayuno.grasas)  + parseFloat(calculadoraAlmuerzo.grasas)  + parseFloat(calculadoraMerienda.grasas)  + parseFloat(sumaCalculadora.grasas)  + parseFloat(calculadoraPostWork.grasas)  + parseFloat(calculadoraSnack.grasas)).toFixed(2),
                }

                dispatch(actualizarProteina(id, suma4, dietaActiva));


                break;



            case "post-work":

                const suma5 = { 
                    calorias: (parseFloat(calculadoraDesayuno.calorias)  + parseFloat(calculadoraAlmuerzo.calorias)  + parseFloat(calculadoraMerienda.calorias)  + parseFloat(calculadoraCena.calorias)  + parseFloat(sumaCalculadora.calorias)  + parseFloat(calculadoraSnack.calorias)).toFixed(2),
                    proteinas: (parseFloat(calculadoraDesayuno.proteinas)  + parseFloat(calculadoraAlmuerzo.proteinas)  + parseFloat(calculadoraMerienda.proteinas)  + parseFloat(calculadoraCena.proteinas)  + parseFloat(sumaCalculadora.proteinas)  + parseFloat(calculadoraSnack.proteinas)).toFixed(2),
                    carbohidratos: (parseFloat(calculadoraDesayuno.carbohidratos)  + parseFloat(calculadoraAlmuerzo.carbohidratos)  + parseFloat(calculadoraMerienda.carbohidratos)  + parseFloat(calculadoraCena.carbohidratos)  + parseFloat(sumaCalculadora.carbohidratos)  + parseFloat(calculadoraSnack.carbohidratos)).toFixed(2),
                    grasas: (parseFloat(calculadoraDesayuno.grasas)  + parseFloat(calculadoraAlmuerzo.grasas)  + parseFloat(calculadoraMerienda.grasas)  + parseFloat(calculadoraCena.grasas)  + parseFloat(sumaCalculadora.grasas)  + parseFloat(calculadoraSnack.grasas)).toFixed(2),
                }

                dispatch(actualizarProteina(id, suma5, dietaActiva));


                break;



            case "snack":

                const suma6 = { 
                    calorias: (parseFloat(calculadoraDesayuno.calorias)  + parseFloat(calculadoraAlmuerzo.calorias)  + parseFloat(calculadoraMerienda.calorias)  + parseFloat(calculadoraCena.calorias)  + parseFloat(calculadoraPostWork.calorias)  + parseFloat(sumaCalculadora.calorias)).toFixed(2),
                    proteinas: (parseFloat(calculadoraDesayuno.proteinas)  + parseFloat(calculadoraAlmuerzo.proteinas)  + parseFloat(calculadoraMerienda.proteinas)  + parseFloat(calculadoraCena.proteinas)  + parseFloat(calculadoraPostWork.proteinas)  + parseFloat(sumaCalculadora.proteinas)).toFixed(2),
                    carbohidratos: (parseFloat(calculadoraDesayuno.carbohidratos)  + parseFloat(calculadoraAlmuerzo.carbohidratos)  + parseFloat(calculadoraMerienda.carbohidratos)  + parseFloat(calculadoraCena.carbohidratos)  + parseFloat(calculadoraPostWork.carbohidratos)  + parseFloat(sumaCalculadora.carbohidratos)).toFixed(2),
                    grasas: (parseFloat(calculadoraDesayuno.grasas)  + parseFloat(calculadoraAlmuerzo.grasas)  + parseFloat(calculadoraMerienda.grasas)  + parseFloat(calculadoraCena.grasas)  + parseFloat(calculadoraPostWork.grasas)  + parseFloat(sumaCalculadora.grasas)).toFixed(2),
                }

                dispatch(actualizarProteina(id, suma6, dietaActiva));


                break;


        
            default:
                break;
        }



    }


    return<>
        <CalculadoraDesayuno sumatoriaTotal={sumatoriaTotal} setCalculadoraDesayuno={setCalculadoraDesayuno} />
        <CalculadoraAlmuerzo sumatoriaTotal={sumatoriaTotal} setCalculadoraAlmuerzo={setCalculadoraAlmuerzo} />
        <CalculadoraMerienda sumatoriaTotal={sumatoriaTotal} setCalculadoraMerienda={setCalculadoraMerienda} />
        <CalculadoraCena sumatoriaTotal={sumatoriaTotal} setCalculadoraCena={setCalculadoraCena} />
        <CalculadoraPostWork sumatoriaTotal={sumatoriaTotal} setCalculadoraPostWork={setCalculadoraPostWork} />
        <CalculadoraSnack sumatoriaTotal={sumatoriaTotal} setCalculadoraSnack={setCalculadoraSnack} />

    </>

    
}

