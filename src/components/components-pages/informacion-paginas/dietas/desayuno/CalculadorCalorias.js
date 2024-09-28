import React, { useEffect, useRef, useState } from 'react';
import { alimentos } from '../arreglos';
import { useDispatch, useSelector } from 'react-redux';
import { actualizarProteina } from '../../../../../actions/dietas';
import { SelectorAlimentos1 } from './SelectorAlimentos1';
import { SelectorAlimentos2 } from './SelectorAlimentos2';
import { SelectorAlimentos3 } from './SelectorAlimentos3';
import { SelectorAlimentos4 } from './SelectorAlimentos4';
import { SelectorAlimentos5 } from './SelectorAlimentos5';
import { SelectorAlimentos6 } from './SelectorAlimentos6';
import { SelectorAlimentos7 } from './SelectorAlimentos7';

const initialArray = { 
  calorias: 0,
  proteinas: 0,
  carbohidratos: 0,
  grasas: 0
};





export const CalorieCalculator = ({sumatoriaTotal, setCalculadoraDesayuno}) => {

  const dietaActiva = useSelector((store)=>{return store.dietas.active});


  // Almacena el estado de cada alimento para que se sumen
  const [alimentos1, setAlimentos1] = useState(initialArray);
  const [alimentos2, setAlimentos2] = useState(initialArray);
  const [alimentos3, setAlimentos3] = useState(initialArray);
  const [alimentos4, setAlimentos4] = useState(initialArray);
  const [alimentos5, setAlimentos5] = useState(initialArray);
  const [alimentos6, setAlimentos6] = useState(initialArray);
  const [alimentos7, setAlimentos7] = useState(initialArray);


  // Para que se dispare el estado inicial de la suma
  const [numero, setNumero] = useState(0)



  const dispatch = useDispatch();
  // const [seleccionado, setSeleccionado] = useState(alimentos[0]);
  // const [cantidad, setCantidad] = useState(0);



  // const handleSelectChange = (e) => {
  //   // Devuelve el primer elemento del array que cumple con la condición
  //   const alimentoSeleccionado = alimentos.find(a => a.nombre === e.target.value);
  //   setSeleccionado(alimentoSeleccionado);
  //   setCantidad(0); // Reiniciar la cantidad al cambiar el alimento
  // };





  
  
  
  // // // Calcular los valores cuando cambia la cantidad
  // useEffect(() => {
  //   const calcularValores = () => {
      
  //     const factor = cantidad / seleccionado.cantidad;
      
      
  //     return {
        
  //       calorias: (seleccionado.calorias * factor).toFixed(2),
  //       proteinas: (seleccionado.proteinas * factor).toFixed(2),
  //       carbohidratos: (seleccionado.carbohidratos * factor).toFixed(2),
  //       grasas: (seleccionado.grasas * factor).toFixed(2),
  //     };
      
  //   };
  //   const totales = calcularValores();
  // }, [cantidad])
  
  
  
  






  // n es el numero del selector
  const setearAlimentos = (dietaValores, n)=>{

    if(numero === 0 || n === 1){
      // Para que se dispare la primera vez
      setNumero(n);


      // Suma de los 7 alimentos de los selectores
      const suma = { 
        calorias: (parseFloat(dietaValores.calorias)  + parseFloat(alimentos2.calorias)  + parseFloat(alimentos3.calorias)  + parseFloat(alimentos4.calorias)  + parseFloat(alimentos5.calorias)  + parseFloat(alimentos6.calorias)  + parseFloat(alimentos7.calorias)).toFixed(2),
        proteinas: (parseFloat(dietaValores.proteinas) + parseFloat(alimentos2.proteinas) + parseFloat(alimentos3.proteinas) + parseFloat(alimentos4.proteinas)  + parseFloat(alimentos5.proteinas) + parseFloat(alimentos6.proteinas) + parseFloat(alimentos7.proteinas)).toFixed(2),
        carbohidratos: (parseFloat(dietaValores.carbohidratos) + parseFloat(alimentos2.carbohidratos) + parseFloat(alimentos3.carbohidratos) + parseFloat(alimentos4.carbohidratos) + parseFloat(alimentos5.carbohidratos) + parseFloat(alimentos6.carbohidratos) + parseFloat(alimentos7.carbohidratos)).toFixed(2),
        grasas: (parseFloat(dietaValores.grasas) + parseFloat(alimentos2.grasas) + parseFloat(alimentos3.grasas) + parseFloat(alimentos4.grasas) + parseFloat(alimentos5.grasas) + parseFloat(alimentos6.grasas) + parseFloat(alimentos7.grasas)).toFixed(2)
      };
      setCalculadoraDesayuno(suma);
      sumatoriaTotal(dietaActiva.id, suma, dietaActiva, "desayuno");


    }else if(numero === 0 || n === 2){
      // Para que se dispare la primera vez
      setNumero(n);


        
        const suma = { 
          calorias: ((parseFloat(dietaValores.calorias) + parseFloat(alimentos1.calorias)  + parseFloat(alimentos3.calorias)  + parseFloat(alimentos4.calorias)  + parseFloat(alimentos5.calorias)  + parseFloat(alimentos6.calorias)  + parseFloat(alimentos7.calorias))).toFixed(2),
          proteinas: ((parseFloat(dietaValores.proteinas) + parseFloat(alimentos1.proteinas) + parseFloat(alimentos3.proteinas) + parseFloat(alimentos4.proteinas)  + parseFloat(alimentos5.proteinas) + parseFloat(alimentos6.proteinas) + parseFloat(alimentos7.proteinas))).toFixed(2),
          carbohidratos: ((parseFloat(dietaValores.carbohidratos) + parseFloat(alimentos1.carbohidratos) + parseFloat(alimentos3.carbohidratos) + parseFloat(alimentos4.carbohidratos) + parseFloat(alimentos5.carbohidratos) + parseFloat(alimentos6.carbohidratos) + parseFloat(alimentos7.carbohidratos))).toFixed(2),
          grasas: ((parseFloat(dietaValores.grasas) + parseFloat(alimentos1.grasas) + parseFloat(alimentos3.grasas) + parseFloat(alimentos4.grasas) + parseFloat(alimentos5.grasas) + parseFloat(alimentos6.grasas) + parseFloat(alimentos7.grasas))).toFixed(2)
        };
        setCalculadoraDesayuno(suma);
        sumatoriaTotal(dietaActiva.id, suma, dietaActiva, "desayuno");
     }else if(numero === 0 || n === 3){
      // Para que se dispare la primera vez
      setNumero(n);


        
        const suma = { 
          calorias: ((parseFloat(dietaValores.calorias) + parseFloat(alimentos1.calorias)  + parseFloat(alimentos2.calorias)  + parseFloat(alimentos4.calorias)  + parseFloat(alimentos5.calorias)  + parseFloat(alimentos6.calorias)  + parseFloat(alimentos7.calorias))).toFixed(2),
          proteinas: ((parseFloat(dietaValores.proteinas) + parseFloat(alimentos1.proteinas) + parseFloat(alimentos2.proteinas) + parseFloat(alimentos4.proteinas)  + parseFloat(alimentos5.proteinas) + parseFloat(alimentos6.proteinas) + parseFloat(alimentos7.proteinas))).toFixed(2),
          carbohidratos: ((parseFloat(dietaValores.carbohidratos) + parseFloat(alimentos1.carbohidratos) + parseFloat(alimentos2.carbohidratos) + parseFloat(alimentos4.carbohidratos) + parseFloat(alimentos5.carbohidratos) + parseFloat(alimentos6.carbohidratos) + parseFloat(alimentos7.carbohidratos))).toFixed(2),
          grasas: ((parseFloat(dietaValores.grasas) + parseFloat(alimentos1.grasas) + parseFloat(alimentos2.grasas) + parseFloat(alimentos4.grasas) + parseFloat(alimentos5.grasas) + parseFloat(alimentos6.grasas) + parseFloat(alimentos7.grasas))).toFixed(2)
        };
        setCalculadoraDesayuno(suma);
        sumatoriaTotal(dietaActiva.id, suma, dietaActiva, "desayuno");
     }else if(numero === 0 || n === 4){
      // Para que se dispare la primera vez
      setNumero(n);


        
        const suma = { 
          calorias: ((parseFloat(dietaValores.calorias) + parseFloat(alimentos1.calorias)  + parseFloat(alimentos2.calorias)  + parseFloat(alimentos3.calorias)  + parseFloat(alimentos5.calorias)  + parseFloat(alimentos6.calorias)  + parseFloat(alimentos7.calorias))).toFixed(2),
          proteinas: ((parseFloat(dietaValores.proteinas) + parseFloat(alimentos1.proteinas) + parseFloat(alimentos2.proteinas) + parseFloat(alimentos3.proteinas)  + parseFloat(alimentos5.proteinas) + parseFloat(alimentos6.proteinas) + parseFloat(alimentos7.proteinas))).toFixed(2),
          carbohidratos: ((parseFloat(dietaValores.carbohidratos) + parseFloat(alimentos1.carbohidratos) + parseFloat(alimentos2.carbohidratos) + parseFloat(alimentos3.carbohidratos) + parseFloat(alimentos5.carbohidratos) + parseFloat(alimentos6.carbohidratos) + parseFloat(alimentos7.carbohidratos))).toFixed(2),
          grasas: ((parseFloat(dietaValores.grasas) + parseFloat(alimentos1.grasas) + parseFloat(alimentos2.grasas) + parseFloat(alimentos3.grasas) + parseFloat(alimentos5.grasas) + parseFloat(alimentos6.grasas) + parseFloat(alimentos7.grasas))).toFixed(2)
        };
        setCalculadoraDesayuno(suma);
        sumatoriaTotal(dietaActiva.id, suma, dietaActiva, "desayuno");
     }else if(numero === 0 || n === 5){
      // Para que se dispare la primera vez
      setNumero(n);


        
        const suma = { 
          calorias: ((parseFloat(dietaValores.calorias) + parseFloat(alimentos1.calorias)  + parseFloat(alimentos2.calorias)  + parseFloat(alimentos3.calorias)  + parseFloat(alimentos4.calorias)  + parseFloat(alimentos6.calorias)  + parseFloat(alimentos7.calorias))).toFixed(2),
          proteinas: ((parseFloat(dietaValores.proteinas) + parseFloat(alimentos1.proteinas) + parseFloat(alimentos2.proteinas) + parseFloat(alimentos3.proteinas)  + parseFloat(alimentos4.proteinas) + parseFloat(alimentos6.proteinas) + parseFloat(alimentos7.proteinas))).toFixed(2),
          carbohidratos: ((parseFloat(dietaValores.carbohidratos) + parseFloat(alimentos1.carbohidratos) + parseFloat(alimentos2.carbohidratos) + parseFloat(alimentos3.carbohidratos) + parseFloat(alimentos4.carbohidratos) + parseFloat(alimentos6.carbohidratos) + parseFloat(alimentos7.carbohidratos))).toFixed(2),
          grasas: ((parseFloat(dietaValores.grasas) + parseFloat(alimentos1.grasas) + parseFloat(alimentos2.grasas) + parseFloat(alimentos3.grasas) + parseFloat(alimentos4.grasas) + parseFloat(alimentos6.grasas) + parseFloat(alimentos7.grasas))).toFixed(2)
        };
        setCalculadoraDesayuno(suma);
        sumatoriaTotal(dietaActiva.id, suma, dietaActiva, "desayuno");
     }else if(numero === 0 || n === 6){
      // Para que se dispare la primera vez
      setNumero(n);


        
        const suma = { 
          calorias: ((parseFloat(dietaValores.calorias) + parseFloat(alimentos1.calorias)  + parseFloat(alimentos2.calorias)  + parseFloat(alimentos3.calorias)  + parseFloat(alimentos4.calorias)  + parseFloat(alimentos5.calorias)  + parseFloat(alimentos7.calorias))).toFixed(2),
          proteinas: ((parseFloat(dietaValores.proteinas) + parseFloat(alimentos1.proteinas) + parseFloat(alimentos2.proteinas) + parseFloat(alimentos3.proteinas)  + parseFloat(alimentos4.proteinas) + parseFloat(alimentos5.proteinas) + parseFloat(alimentos7.proteinas))).toFixed(2),
          carbohidratos: ((parseFloat(dietaValores.carbohidratos) + parseFloat(alimentos1.carbohidratos) + parseFloat(alimentos2.carbohidratos) + parseFloat(alimentos3.carbohidratos) + parseFloat(alimentos4.carbohidratos) + parseFloat(alimentos5.carbohidratos) + parseFloat(alimentos7.carbohidratos))).toFixed(2),
          grasas: ((parseFloat(dietaValores.grasas) + parseFloat(alimentos1.grasas) + parseFloat(alimentos2.grasas) + parseFloat(alimentos3.grasas) + parseFloat(alimentos4.grasas) + parseFloat(alimentos5.grasas) + parseFloat(alimentos7.grasas))).toFixed(2)
        };
        setCalculadoraDesayuno(suma);
        sumatoriaTotal(dietaActiva.id, suma, dietaActiva, "desayuno");
     }else if(numero === 0 || n === 7){
      // Para que se dispare la primera vez
      setNumero(n);


        
        const suma = { 
          calorias: ((parseFloat(dietaValores.calorias) + parseFloat(alimentos1.calorias)  + parseFloat(alimentos2.calorias)  + parseFloat(alimentos3.calorias)  + parseFloat(alimentos4.calorias)  + parseFloat(alimentos5.calorias)  + parseFloat(alimentos6.calorias))).toFixed(2),
          proteinas: ((parseFloat(dietaValores.proteinas) + parseFloat(alimentos1.proteinas) + parseFloat(alimentos2.proteinas) + parseFloat(alimentos3.proteinas)  + parseFloat(alimentos4.proteinas) + parseFloat(alimentos5.proteinas) + parseFloat(alimentos6.proteinas))).toFixed(2),
          carbohidratos: ((parseFloat(dietaValores.carbohidratos) + parseFloat(alimentos1.carbohidratos) + parseFloat(alimentos2.carbohidratos) + parseFloat(alimentos3.carbohidratos) + parseFloat(alimentos4.carbohidratos) + parseFloat(alimentos5.carbohidratos) + parseFloat(alimentos6.carbohidratos))).toFixed(2),
          grasas: ((parseFloat(dietaValores.grasas) + parseFloat(alimentos1.grasas) + parseFloat(alimentos2.grasas) + parseFloat(alimentos3.grasas) + parseFloat(alimentos4.grasas) + parseFloat(alimentos5.grasas) + parseFloat(alimentos6.grasas))).toFixed(2)
        };
        setCalculadoraDesayuno(suma);
        sumatoriaTotal(dietaActiva.id, suma, dietaActiva, "desayuno");
     }
  }



  
  // Calcular los valores en tiempo real (Se dispara muchas veces)
  
  // const calcularValores = () => {
    
    //     const factor = cantidad / seleccionado.cantidad;
    //     console.log("Me dispare");


  //     return {
  //       calorias: (seleccionado.calorias * factor).toFixed(2),
  //       proteinas: (seleccionado.proteinas * factor).toFixed(2),
  //       carbohidratos: (seleccionado.carbohidratos * factor).toFixed(2),
  //       grasas: (seleccionado.grasas * factor).toFixed(2),
  //     };
  // };

  // const totales = calcularValores();








  // const handleInputChange = (e) => {

  //   setCantidad(e.target.value);
  //   // Seteamos el input para modificarlo y enviarlo al padre
  //   // setInput(e);

  //   // Cargamos el nuevo valor de las proteinas en el padre



  //   // Proteinas
  //   // const ppp = {...e};
  //   // ppp.target.name = "proteinas";
  //   const factor = e.target.value / seleccionado.cantidad;
  //   const dietaValores = {
  //     calorias: (seleccionado.calorias * factor).toFixed(2),
  //     proteinas: (seleccionado.proteinas * factor).toFixed(2),
  //     carbohidratos: (seleccionado.carbohidratos * factor).toFixed(2),
  //     grasas: (seleccionado.grasas * factor).toFixed(2),
  //   };
  //   // ppp.target.value = proteinasValor;
  //   // // setInput(ppp);
  //   // proteinasHijo(ppp);



  //   dispatch(actualizarProteina(dietaActiva.id, dietaValores, dietaActiva));
    

  // };






  return (
    <div className="container mt-4 " style={{fontSize: "12px"}}>

      {/* Alimento Cantidad KCal P Car G */}


      <SelectorAlimentos1
        setAlimentos1={setAlimentos1}
        setearAlimentos={setearAlimentos}
      />

      <SelectorAlimentos2
        setAlimentos2={setAlimentos2}
        setearAlimentos={setearAlimentos}
      />

      <SelectorAlimentos3
        setAlimentos3={setAlimentos3}
        setearAlimentos={setearAlimentos}
      />

      <SelectorAlimentos4
        setAlimentos4={setAlimentos4}
        setearAlimentos={setearAlimentos}
      />

      <SelectorAlimentos5
        setAlimentos5={setAlimentos5}
        setearAlimentos={setearAlimentos}
      />

      <SelectorAlimentos6
        setAlimentos6={setAlimentos6}
        setearAlimentos={setearAlimentos}
      />

      <SelectorAlimentos7
        setAlimentos7={setAlimentos7}
        setearAlimentos={setearAlimentos}
      />




    </div>
  );
}
