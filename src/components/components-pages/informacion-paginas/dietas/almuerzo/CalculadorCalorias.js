import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SelectorAlimentos1 } from './SelectorAlimentos1';

const initialArray = { 
  calorias: 0,
  proteinas: 0,
  carbohidratos: 0,
  grasas: 0
};





export const CalorieCalculator = ({sumatoriaTotal, setCalculadoraAlmuerzo, actualizarFormulario, setCambioEnCalculadora}) => {

  const dietaActiva = useSelector((store)=>{return store.dietas.active});


  // Estado de cada alimento para que se sumen
  const [alimentos1, setAlimentos1] = useState(initialArray);
  const [alimentos2, setAlimentos2] = useState(initialArray);
  const [alimentos3, setAlimentos3] = useState(initialArray);
  const [alimentos4, setAlimentos4] = useState(initialArray);
  const [alimentos5, setAlimentos5] = useState(initialArray);
  const [alimentos6, setAlimentos6] = useState(initialArray);
  const [alimentos7, setAlimentos7] = useState(initialArray);


  // El estado inicial de la suma
  const [numero, setNumero] = useState(0);





  
  const setearAlimentos = (dietaValores, n)=>{

    if(numero === 0 || n === 1){
      // Para que se dispare la primera vez
      setNumero(n);

      const suma = { 
        calorias: (parseFloat(dietaValores.calorias)  + parseFloat(alimentos2.calorias)  + parseFloat(alimentos3.calorias)  + parseFloat(alimentos4.calorias)  + parseFloat(alimentos5.calorias)  + parseFloat(alimentos6.calorias)  + parseFloat(alimentos7.calorias)).toFixed(2),
        proteinas: (parseFloat(dietaValores.proteinas) + parseFloat(alimentos2.proteinas) + parseFloat(alimentos3.proteinas) + parseFloat(alimentos4.proteinas)  + parseFloat(alimentos5.proteinas) + parseFloat(alimentos6.proteinas) + parseFloat(alimentos7.proteinas)).toFixed(2),
        carbohidratos: (parseFloat(dietaValores.carbohidratos) + parseFloat(alimentos2.carbohidratos) + parseFloat(alimentos3.carbohidratos) + parseFloat(alimentos4.carbohidratos) + parseFloat(alimentos5.carbohidratos) + parseFloat(alimentos6.carbohidratos) + parseFloat(alimentos7.carbohidratos)).toFixed(2),
        grasas: (parseFloat(dietaValores.grasas) + parseFloat(alimentos2.grasas) + parseFloat(alimentos3.grasas) + parseFloat(alimentos4.grasas) + parseFloat(alimentos5.grasas) + parseFloat(alimentos6.grasas) + parseFloat(alimentos7.grasas)).toFixed(2)
      };
      setCalculadoraAlmuerzo(suma);
      sumatoriaTotal(dietaActiva.id, suma, dietaActiva, "almuerzo");


    }else if(numero === 0 || n === 2){
      // Para que se dispare la primera vez
      setNumero(n);


        
        const suma = { 
          calorias: ((parseFloat(dietaValores.calorias) + parseFloat(alimentos1.calorias)  + parseFloat(alimentos3.calorias)  + parseFloat(alimentos4.calorias)  + parseFloat(alimentos5.calorias)  + parseFloat(alimentos6.calorias)  + parseFloat(alimentos7.calorias))).toFixed(2),
          proteinas: ((parseFloat(dietaValores.proteinas) + parseFloat(alimentos1.proteinas) + parseFloat(alimentos3.proteinas) + parseFloat(alimentos4.proteinas)  + parseFloat(alimentos5.proteinas) + parseFloat(alimentos6.proteinas) + parseFloat(alimentos7.proteinas))).toFixed(2),
          carbohidratos: ((parseFloat(dietaValores.carbohidratos) + parseFloat(alimentos1.carbohidratos) + parseFloat(alimentos3.carbohidratos) + parseFloat(alimentos4.carbohidratos) + parseFloat(alimentos5.carbohidratos) + parseFloat(alimentos6.carbohidratos) + parseFloat(alimentos7.carbohidratos))).toFixed(2),
          grasas: ((parseFloat(dietaValores.grasas) + parseFloat(alimentos1.grasas) + parseFloat(alimentos3.grasas) + parseFloat(alimentos4.grasas) + parseFloat(alimentos5.grasas) + parseFloat(alimentos6.grasas) + parseFloat(alimentos7.grasas))).toFixed(2)
        };
        setCalculadoraAlmuerzo(suma);
        sumatoriaTotal(dietaActiva.id, suma, dietaActiva, "almuerzo");
     }else if(numero === 0 || n === 3){
      // Para que se dispare la primera vez
      setNumero(n);


        
        const suma = { 
          calorias: ((parseFloat(dietaValores.calorias) + parseFloat(alimentos1.calorias)  + parseFloat(alimentos2.calorias)  + parseFloat(alimentos4.calorias)  + parseFloat(alimentos5.calorias)  + parseFloat(alimentos6.calorias)  + parseFloat(alimentos7.calorias))).toFixed(2),
          proteinas: ((parseFloat(dietaValores.proteinas) + parseFloat(alimentos1.proteinas) + parseFloat(alimentos2.proteinas) + parseFloat(alimentos4.proteinas)  + parseFloat(alimentos5.proteinas) + parseFloat(alimentos6.proteinas) + parseFloat(alimentos7.proteinas))).toFixed(2),
          carbohidratos: ((parseFloat(dietaValores.carbohidratos) + parseFloat(alimentos1.carbohidratos) + parseFloat(alimentos2.carbohidratos) + parseFloat(alimentos4.carbohidratos) + parseFloat(alimentos5.carbohidratos) + parseFloat(alimentos6.carbohidratos) + parseFloat(alimentos7.carbohidratos))).toFixed(2),
          grasas: ((parseFloat(dietaValores.grasas) + parseFloat(alimentos1.grasas) + parseFloat(alimentos2.grasas) + parseFloat(alimentos4.grasas) + parseFloat(alimentos5.grasas) + parseFloat(alimentos6.grasas) + parseFloat(alimentos7.grasas))).toFixed(2)
        };
        setCalculadoraAlmuerzo(suma);
        sumatoriaTotal(dietaActiva.id, suma, dietaActiva, "almuerzo");
     }else if(numero === 0 || n === 4){
      // Para que se dispare la primera vez
      setNumero(n);


        
        const suma = { 
          calorias: ((parseFloat(dietaValores.calorias) + parseFloat(alimentos1.calorias)  + parseFloat(alimentos2.calorias)  + parseFloat(alimentos3.calorias)  + parseFloat(alimentos5.calorias)  + parseFloat(alimentos6.calorias)  + parseFloat(alimentos7.calorias))).toFixed(2),
          proteinas: ((parseFloat(dietaValores.proteinas) + parseFloat(alimentos1.proteinas) + parseFloat(alimentos2.proteinas) + parseFloat(alimentos3.proteinas)  + parseFloat(alimentos5.proteinas) + parseFloat(alimentos6.proteinas) + parseFloat(alimentos7.proteinas))).toFixed(2),
          carbohidratos: ((parseFloat(dietaValores.carbohidratos) + parseFloat(alimentos1.carbohidratos) + parseFloat(alimentos2.carbohidratos) + parseFloat(alimentos3.carbohidratos) + parseFloat(alimentos5.carbohidratos) + parseFloat(alimentos6.carbohidratos) + parseFloat(alimentos7.carbohidratos))).toFixed(2),
          grasas: ((parseFloat(dietaValores.grasas) + parseFloat(alimentos1.grasas) + parseFloat(alimentos2.grasas) + parseFloat(alimentos3.grasas) + parseFloat(alimentos5.grasas) + parseFloat(alimentos6.grasas) + parseFloat(alimentos7.grasas))).toFixed(2)
        };
        setCalculadoraAlmuerzo(suma);
        sumatoriaTotal(dietaActiva.id, suma, dietaActiva, "almuerzo");
     }else if(numero === 0 || n === 5){
      // Para que se dispare la primera vez
      setNumero(n);


        
        const suma = { 
          calorias: ((parseFloat(dietaValores.calorias) + parseFloat(alimentos1.calorias)  + parseFloat(alimentos2.calorias)  + parseFloat(alimentos3.calorias)  + parseFloat(alimentos4.calorias)  + parseFloat(alimentos6.calorias)  + parseFloat(alimentos7.calorias))).toFixed(2),
          proteinas: ((parseFloat(dietaValores.proteinas) + parseFloat(alimentos1.proteinas) + parseFloat(alimentos2.proteinas) + parseFloat(alimentos3.proteinas)  + parseFloat(alimentos4.proteinas) + parseFloat(alimentos6.proteinas) + parseFloat(alimentos7.proteinas))).toFixed(2),
          carbohidratos: ((parseFloat(dietaValores.carbohidratos) + parseFloat(alimentos1.carbohidratos) + parseFloat(alimentos2.carbohidratos) + parseFloat(alimentos3.carbohidratos) + parseFloat(alimentos4.carbohidratos) + parseFloat(alimentos6.carbohidratos) + parseFloat(alimentos7.carbohidratos))).toFixed(2),
          grasas: ((parseFloat(dietaValores.grasas) + parseFloat(alimentos1.grasas) + parseFloat(alimentos2.grasas) + parseFloat(alimentos3.grasas) + parseFloat(alimentos4.grasas) + parseFloat(alimentos6.grasas) + parseFloat(alimentos7.grasas))).toFixed(2)
        };
        setCalculadoraAlmuerzo(suma);
        sumatoriaTotal(dietaActiva.id, suma, dietaActiva, "almuerzo");
     }else if(numero === 0 || n === 6){
      // Para que se dispare la primera vez
      setNumero(n);


        
        const suma = { 
          calorias: ((parseFloat(dietaValores.calorias) + parseFloat(alimentos1.calorias)  + parseFloat(alimentos2.calorias)  + parseFloat(alimentos3.calorias)  + parseFloat(alimentos4.calorias)  + parseFloat(alimentos5.calorias)  + parseFloat(alimentos7.calorias))).toFixed(2),
          proteinas: ((parseFloat(dietaValores.proteinas) + parseFloat(alimentos1.proteinas) + parseFloat(alimentos2.proteinas) + parseFloat(alimentos3.proteinas)  + parseFloat(alimentos4.proteinas) + parseFloat(alimentos5.proteinas) + parseFloat(alimentos7.proteinas))).toFixed(2),
          carbohidratos: ((parseFloat(dietaValores.carbohidratos) + parseFloat(alimentos1.carbohidratos) + parseFloat(alimentos2.carbohidratos) + parseFloat(alimentos3.carbohidratos) + parseFloat(alimentos4.carbohidratos) + parseFloat(alimentos5.carbohidratos) + parseFloat(alimentos7.carbohidratos))).toFixed(2),
          grasas: ((parseFloat(dietaValores.grasas) + parseFloat(alimentos1.grasas) + parseFloat(alimentos2.grasas) + parseFloat(alimentos3.grasas) + parseFloat(alimentos4.grasas) + parseFloat(alimentos5.grasas) + parseFloat(alimentos7.grasas))).toFixed(2)
        };
        setCalculadoraAlmuerzo(suma);
        sumatoriaTotal(dietaActiva.id, suma, dietaActiva, "almuerzo");
     }else if(numero === 0 || n === 7){
      // Para que se dispare la primera vez
      setNumero(n);


        
        const suma = { 
          calorias: ((parseFloat(dietaValores.calorias) + parseFloat(alimentos1.calorias)  + parseFloat(alimentos2.calorias)  + parseFloat(alimentos3.calorias)  + parseFloat(alimentos4.calorias)  + parseFloat(alimentos5.calorias)  + parseFloat(alimentos6.calorias))).toFixed(2),
          proteinas: ((parseFloat(dietaValores.proteinas) + parseFloat(alimentos1.proteinas) + parseFloat(alimentos2.proteinas) + parseFloat(alimentos3.proteinas)  + parseFloat(alimentos4.proteinas) + parseFloat(alimentos5.proteinas) + parseFloat(alimentos6.proteinas))).toFixed(2),
          carbohidratos: ((parseFloat(dietaValores.carbohidratos) + parseFloat(alimentos1.carbohidratos) + parseFloat(alimentos2.carbohidratos) + parseFloat(alimentos3.carbohidratos) + parseFloat(alimentos4.carbohidratos) + parseFloat(alimentos5.carbohidratos) + parseFloat(alimentos6.carbohidratos))).toFixed(2),
          grasas: ((parseFloat(dietaValores.grasas) + parseFloat(alimentos1.grasas) + parseFloat(alimentos2.grasas) + parseFloat(alimentos3.grasas) + parseFloat(alimentos4.grasas) + parseFloat(alimentos5.grasas) + parseFloat(alimentos6.grasas))).toFixed(2)
        };
        setCalculadoraAlmuerzo(suma);
        sumatoriaTotal(dietaActiva.id, suma, dietaActiva, "almuerzo");
     }
  }






  return (
    <div className="container mt-4 " style={{fontSize: "12px"}}>

      {/* Alimento Cantidad KCal P Car G */}


      <SelectorAlimentos1
        setAlimentos1={setAlimentos1}
        setAlimentos2={setAlimentos2}
        setAlimentos3={setAlimentos3}
        setAlimentos4={setAlimentos4}
        setAlimentos5={setAlimentos5}
        setAlimentos6={setAlimentos6}
        setAlimentos7={setAlimentos7}
        setearAlimentos={setearAlimentos}
        actualizarFormulario={actualizarFormulario}
        setCambioEnCalculadora={setCambioEnCalculadora}
      />

    </div>
  );
}
