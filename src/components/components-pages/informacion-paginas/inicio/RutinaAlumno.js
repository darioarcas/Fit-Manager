import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarTool } from '../rutinas/BarTool';
import { ejercicios } from '../rutinas/RutinasArreglos';
import { activarRutina, agregarRutina, eliminarRutina, guardarRutina } from '../../../../actions/rutina';
import { deArregloAObjetoHelper } from '../../../../helpers/deArregloAObjeto';
import Swal from 'sweetalert2';
import { activarDieta } from '../../../../actions/dietas';
import { activarDietaAlumno } from '../../../../actions/alumno';
// import PdfGenerator from './pdf/PdfGenerator';



// // Rutina
// const rutinaInit = {
//   id:"",
//   nombre:"Asigna un Nombre",
//   sesion1:{
//       ejercicio1:{
//           ejercicio: "",
//           img: "",
//           video: "",
//           pausa: "",
//           ejecucion: ""
//       },
//   },
//   sesion2:{
//     ejercicio1:{
//       ejercicio: "",
//       img: "",
//       video: "",
//       pausa: "",
//       ejecucion: ""
//     },
//   },
//   sesion3:{
//     ejercicio1:{
//       ejercicio: "",
//       img: "",
//       video: "",
//       pausa: "",
//       ejecucion: ""
//     },
//   },
//   sesion4:{},
//   sesion5:{},
//   sesion6:{},
//   sesion7:{},
// }

// const ejercicioInit = [
//   {
//     ejercicio: "juancito",
//     img: "",
//     video: "",
//     pausa: "",
//     ejecucion: ""
//   },
//   {
//     ejercicio: "",
//     img: "",
//     video: "",
//     pausa: "",
//     ejecucion: ""
//   },
//   {
//     ejercicio: "",
//     img: "",
//     video: "",
//     pausa: "",
//     ejecucion: ""
//   }
// ]



export const RutinaAlumno = () => {

  
  
  
  // Extraemos del reducer las rutinas que el usuario haya guardado
  const rutinas = useSelector(reducer => (
      // De forma condicional verificamos que exista la rutina1
      reducer.rutinas.rutinas.rutina1 ? 
      reducer.rutinas.rutinas : 

      // Si no existe (por ser usuario nuevo, o haberse eliminado todas), se crea una 
      {
        rutina1:{
          id:"",
          nombre:"",
          sesion1:{}
        }
      }

    )
  );

  // Las rutinas guardadas del usuario y la rutina activa, osea, {rutinas:{},active:{}}
  // En el caso de la rutina del alumno, siempre sera el mismo id, que sera el id de la dieta
  const selectorRutinaActiva = useSelector(reducer=>(reducer.alumnos.active.dieta[0]));


  // Se carga una rutina por defecto hasta que el useEffect con la funcion setRutinaActiva(rutinaAlumno);
  // actualiza el estado cargado por el reducer
  const rutinaAlumno = useSelector(reducer=>(
    reducer.alumnos.active.dieta[0].rutina ?
    reducer.alumnos.active.dieta[0].rutina :
    {id: selectorRutinaActiva.id, nombre:"", sesion1:{ejercicio1:{ejercicio:"", ejecucion:"", pausa:""}}}

  ));

  const dieta =  useSelector (store=>{return store.alumnos.active.dieta[0]});

  const cargaFicha = useSelector(reducer => reducer.alumnos.carga);



  
  // SOLUCIONAR ESTE ERROR!! el id de rutina activa deberia actualizarse cuando
  // se guarda una nueva rutina: El error ocurre cuando no existen rutinas, se guarda una rutina
  // (el id de rutinaActiva queda vacio) y se intentan guardar los cambios
  useEffect(() => {
    setRutinaActiva({...rutinaActiva, id: selectorRutinaActiva.id});
  }, [selectorRutinaActiva.id]);
  
  
  
  
  // Tomamos la rutina guardada del alumno
  const [rutinaActiva, setRutinaActiva] = useState(rutinaAlumno);

  



  // Carga el estado guardado de la rutina cuando este lista
  const idAnterior = useRef(selectorRutinaActiva.id)
  useEffect(() => {
    if(cargaFicha && idAnterior.current !== selectorRutinaActiva.id){
      idAnterior.current = selectorRutinaActiva.id;
      setRutinaActiva(rutinaAlumno);
    }
  }, [rutinaAlumno])
  



  
  const [numeroEjercicios, setNumeroEjercicios] = useState(Object.values(rutinaActiva.sesion1).length);



  // Le restamos el id y el nombre
  const [numeroSesiones, setNumeroSesiones] = useState(Object.values(rutinaActiva).length - 2);

  const [nombreRutina, setNombreRutina] = useState(rutinaActiva.nombre);

  const [selectorNombreRutina, setSelectorNombreRutina] = useState(nombreRutina);


  // rutinaAlumnoId es el id de la dieta del usuario, y sera el id de la rutina cuando guardemos la rutina del alumno en sus datos (el id de la db de la dieta del alumno)
  // rutinaUsuarioId sera el id de la rutina cuando guardemos la rutina como la rutina del usuario (el id de la db del usuario)
  // const [ids, setIds] = useState({rutinaAlumnoId:"", rutinaUsuarioId:""});

  const dispatch = useDispatch();

  







  // Cambio en Ejercicio
  const handleSelectChange = (e, index, sesiones) => {
    
    const sinTitulo ={
      ejercicio: "",
      img: "",
      video: "",
      pausa: "",
      ejecucion: ""
    }

    // Devuelve el primer elemento del array que cumple con la condición
    // Si el ejercicio:"" entonces se selecciona sinTitulo
    const ejercicioEncontrado = (e.target.value === "") ? sinTitulo : ejercicios.find(a => a.ejercicio === e.target.value);

    
    // Solo modificamos el objeto seleccionado dentro del arreglo de objetos

    // Creamos una copia del objeto, en un arreglo
    const rutinaActivaHandle = [];
    if(sesiones === 'sesion1') rutinaActivaHandle.push(rutinaActiva.sesion1);
    else if(sesiones === 'sesion2') rutinaActivaHandle.push(rutinaActiva.sesion2);
    else if(sesiones === 'sesion3') rutinaActivaHandle.push(rutinaActiva.sesion3);
    else if(sesiones === 'sesion4') rutinaActivaHandle.push(rutinaActiva.sesion4);
    else if(sesiones === 'sesion5') rutinaActivaHandle.push(rutinaActiva.sesion5);
    else if(sesiones === 'sesion6') rutinaActivaHandle.push(rutinaActiva.sesion6);
    else if(sesiones === 'sesion7') rutinaActivaHandle.push(rutinaActiva.sesion7);

    // Reemplazamos el nuevo valor
    const nuevoarreglo = Object.values(rutinaActivaHandle[0]).map((seleccionado, i)=>{
      if(i === index){
        return {
          ...seleccionado,
          ejercicio: ejercicioEncontrado.ejercicio,
          img: ejercicioEncontrado.img,
          video: ejercicioEncontrado.video

        };
      }
      return seleccionado;
    });
    
    
    // Actualizamos rutinaActiva
    
    if(sesiones === 'sesion1') setRutinaActiva({...rutinaActiva, sesion1: deArregloAObjetoHelper(nuevoarreglo, 'ejercicio')})
    else if(sesiones === 'sesion2') setRutinaActiva({...rutinaActiva, sesion2: deArregloAObjetoHelper(nuevoarreglo, 'ejercicio')})
    else if(sesiones === 'sesion3') setRutinaActiva({...rutinaActiva, sesion3: deArregloAObjetoHelper(nuevoarreglo, 'ejercicio')})
    else if(sesiones === 'sesion4') setRutinaActiva({...rutinaActiva, sesion4: deArregloAObjetoHelper(nuevoarreglo, 'ejercicio')})
    else if(sesiones === 'sesion5') setRutinaActiva({...rutinaActiva, sesion5: deArregloAObjetoHelper(nuevoarreglo, 'ejercicio')})
    else if(sesiones === 'sesion6') setRutinaActiva({...rutinaActiva, sesion6: deArregloAObjetoHelper(nuevoarreglo, 'ejercicio')})
    else if(sesiones === 'sesion7') setRutinaActiva({...rutinaActiva, sesion7: deArregloAObjetoHelper(nuevoarreglo, 'ejercicio')})

  };













  // Cambio en Ejecucion
  const handleEjecucionChange = (e, index, cl, sesiones)=>{
    // Solo modificamos el objeto seleccionado dentro del arreglo de objetos
    const sesionActivaHandle = [];
    if(cl === 'sesion1') sesionActivaHandle.push(rutinaActiva.sesion1);
    else if(cl === 'sesion2') sesionActivaHandle.push(rutinaActiva.sesion2);
    else if(cl === 'sesion3') sesionActivaHandle.push(rutinaActiva.sesion3);
    else if(cl === 'sesion4') sesionActivaHandle.push(rutinaActiva.sesion4);
    else if(cl === 'sesion5') sesionActivaHandle.push(rutinaActiva.sesion5);
    else if(cl === 'sesion6') sesionActivaHandle.push(rutinaActiva.sesion6);
    else if(cl === 'sesion7') sesionActivaHandle.push(rutinaActiva.sesion7);

    // El nuevo arreglo contiene la nueva sesion actualizada en un arreglo de objetos(ejercicios)
    const nuevoarregloEjercicios = Object.values(sesionActivaHandle[0]).map((ejercicio, i)=>{
      // Encontramos el ejercicio en el que hay que actualizar la ejecucion
      if(i === index){
        return {
          ...ejercicio,
          ejecucion: e.target.value
        }
      }
      return ejercicio;
    });


    // Actualizamos rutinaActiva
    
    if(cl === 'sesion1') setRutinaActiva({...rutinaActiva, sesion1: deArregloAObjetoHelper(nuevoarregloEjercicios, 'ejercicio')})
    else if(cl === 'sesion2') setRutinaActiva({...rutinaActiva, sesion2: deArregloAObjetoHelper(nuevoarregloEjercicios, 'ejercicio')})
    else if(cl === 'sesion3') setRutinaActiva({...rutinaActiva, sesion3: deArregloAObjetoHelper(nuevoarregloEjercicios, 'ejercicio')})
    else if(cl === 'sesion4') setRutinaActiva({...rutinaActiva, sesion4: deArregloAObjetoHelper(nuevoarregloEjercicios, 'ejercicio')})
    else if(cl === 'sesion5') setRutinaActiva({...rutinaActiva, sesion5: deArregloAObjetoHelper(nuevoarregloEjercicios, 'ejercicio')})
    else if(cl === 'sesion6') setRutinaActiva({...rutinaActiva, sesion6: deArregloAObjetoHelper(nuevoarregloEjercicios, 'ejercicio')})
    else if(cl === 'sesion7') setRutinaActiva({...rutinaActiva, sesion7: deArregloAObjetoHelper(nuevoarregloEjercicios, 'ejercicio')})
  


  }
  



  // Cambio en Pausa
  const handlePausaChange = (e, index, cl, sesiones)=>{
    // console.log(cl, index, sesiones);
    // Solo modificamos el objeto seleccionado dentro del arreglo de objetos
    const sesionActivaHandle = [];
    if(cl === 'sesion1') sesionActivaHandle.push(rutinaActiva.sesion1);
    else if(cl === 'sesion2') sesionActivaHandle.push(rutinaActiva.sesion2);
    else if(cl === 'sesion3') sesionActivaHandle.push(rutinaActiva.sesion3);
    else if(cl === 'sesion4') sesionActivaHandle.push(rutinaActiva.sesion4);
    else if(cl === 'sesion5') sesionActivaHandle.push(rutinaActiva.sesion5);
    else if(cl === 'sesion6') sesionActivaHandle.push(rutinaActiva.sesion6);
    else if(cl === 'sesion7') sesionActivaHandle.push(rutinaActiva.sesion7);

    // El nuevo arreglo contiene la nueva sesion actualizada en un arreglo de objetos(ejercicios)
    const nuevoarregloEjercicios = Object.values(sesionActivaHandle[0]).map((ejercicio, i)=>{
      // Encontramos el ejercicio en el que hay que actualizar la ejecucion
      if(i === index){
        return {
          ...ejercicio,
          pausa: e.target.value
        }
      }
      return ejercicio;
    });


    // Actualizamos rutinaActiva
    
    if(cl === 'sesion1') setRutinaActiva({...rutinaActiva, sesion1: deArregloAObjetoHelper(nuevoarregloEjercicios, 'ejercicio')})
    else if(cl === 'sesion2') setRutinaActiva({...rutinaActiva, sesion2: deArregloAObjetoHelper(nuevoarregloEjercicios, 'ejercicio')})
    else if(cl === 'sesion3') setRutinaActiva({...rutinaActiva, sesion3: deArregloAObjetoHelper(nuevoarregloEjercicios, 'ejercicio')})
    else if(cl === 'sesion4') setRutinaActiva({...rutinaActiva, sesion4: deArregloAObjetoHelper(nuevoarregloEjercicios, 'ejercicio')})
    else if(cl === 'sesion5') setRutinaActiva({...rutinaActiva, sesion5: deArregloAObjetoHelper(nuevoarregloEjercicios, 'ejercicio')})
    else if(cl === 'sesion6') setRutinaActiva({...rutinaActiva, sesion6: deArregloAObjetoHelper(nuevoarregloEjercicios, 'ejercicio')})
    else if(cl === 'sesion7') setRutinaActiva({...rutinaActiva, sesion7: deArregloAObjetoHelper(nuevoarregloEjercicios, 'ejercicio')})
  


  }









  

  useEffect(() => {
    setNumeroEjercicios(Object.values(rutinaActiva.sesion1).length);
    setNumeroSesiones(Object.values(rutinaActiva).length - 2);
    actualizarRutinaEnReducer();
  }, [rutinaActiva]);
  




  const actualizarRutinaEnReducer = ()=>{
    const nuevaDieta = {...dieta, rutina: rutinaActiva}
    // Valores de PCaGCal
    dispatch(activarDieta(selectorRutinaActiva.id,{ ...nuevaDieta}));
    // Actualiza el Reducer del Alumno (dieta del Alumno)
    dispatch(activarDietaAlumno(selectorRutinaActiva.id, {...nuevaDieta})); 
  }



  const selectorSesiones = (cantidadSesiones)=>{

    
    const largoRutinaActiva = Object.values(rutinaActiva).length - 2;
    
    // Sumamos sesiones
    if(largoRutinaActiva < cantidadSesiones){

      const arregloInicial = [];

      const arregloDeObjetos = sumarObjetos(numeroEjercicios, 0);

      // Guardamos la cantidad de objetos en un arreglo (ejecicios vacios)
      for (let i = (largoRutinaActiva + 1); i <= (cantidadSesiones); i++) {
        arregloInicial.push(deArregloAObjetoHelper(arregloDeObjetos, 'ejercicio'));        
      }


      const rutinaNueva = [];
      // Creamos una copia de rutinaActiva y descartamos el id y el nombre
      Object.entries(rutinaActiva).forEach(([clave, valor])=>{
        if(clave !== 'id' && clave !== 'nombre' ){
          rutinaNueva.push(valor);
        }
      });
      
      // const id = [rutinaActiva.id];
      const id = [];
      Object.entries(rutinaActiva).forEach(([clave, valor])=>{
        if(clave === 'id'){
          id.push(valor);
        }
      });

      // const nombre = [rutinaActiva.nombre];
      const nombre = [];
      Object.entries(rutinaActiva).forEach(([clave, valor])=>{
        if(clave === 'nombre'){
          nombre.push(valor);
        }
      });



      // Agregamos los nuevos ejercicios
      arregloInicial.forEach((objeto, index)=>{rutinaNueva.push(arregloInicial[index]);});
      // arregloInicial.map((objeto, index)=>{rutinaNueva.push(arregloInicial[index]);});

      setRutinaActiva(deArregloAObjetoHelper(rutinaNueva, 'sesion'));
      setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, id: id[0]}));
      setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, nombre: nombre[0]}));
    }




    
    // Quitamos Sesiones
    else if(largoRutinaActiva > cantidadSesiones){
      // Eliminar los últimos objetos
      const rutinaNueva = [];
      // Descartamos el id y el nombre
      Object.entries(rutinaActiva).forEach(([clave, valor])=>{
        if(clave !== 'id' && clave !== 'nombre' ){
          rutinaNueva.push(valor);
        }
      });


      const id = [];
      Object.entries(rutinaActiva).forEach(([clave, valor])=>{
        if(clave === 'id'){
          id.push(valor);
        }
      });
      const nombre = [];
      Object.entries(rutinaActiva).forEach(([clave, valor])=>{
        if(clave === 'nombre'){
          nombre.push(valor);
        }
      });




      const rutinaPost = [...Object.values(rutinaNueva)].reverse().slice((largoRutinaActiva - cantidadSesiones));
      rutinaPost.reverse()
      

      setRutinaActiva(deArregloAObjetoHelper(rutinaPost, 'sesion'));
      setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, id: id[0]}));
      setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, nombre: nombre[0]}));
      
    }
  }









  const selectorEjercicios = (cantidadEjercicios)=>{

    const largoSesionesActivas = [];

    // Descartamos el id y el nombre y obtenemos el largo de la sesion
    Object.entries(rutinaActiva).forEach(([clave, valor])=>{
      if(clave !== 'id' && clave !== 'nombre' ){
        largoSesionesActivas.push(Object.values(valor).length);
      }
    });

    // Rellenamos los otros espacios con cero
    for (let i = (largoSesionesActivas.length); i < 7; i++) {
      largoSesionesActivas.push(0);
      
    }


    
    
    // Agregamos objetos
    if(largoSesionesActivas[0] < cantidadEjercicios){     
      
      const arregloInicialSesion1 = sumarObjetos(cantidadEjercicios, largoSesionesActivas[0]);
      const arregloInicialSesion2 = sumarObjetos(cantidadEjercicios, largoSesionesActivas[1]);
      const arregloInicialSesion3 = sumarObjetos(cantidadEjercicios, largoSesionesActivas[2]);
      const arregloInicialSesion4 = sumarObjetos(cantidadEjercicios, largoSesionesActivas[3]);
      const arregloInicialSesion5 = sumarObjetos(cantidadEjercicios, largoSesionesActivas[4]);
      const arregloInicialSesion6 = sumarObjetos(cantidadEjercicios, largoSesionesActivas[5]);
      const arregloInicialSesion7 = sumarObjetos(cantidadEjercicios, largoSesionesActivas[6]);
      
      
      const sesionesNuevas1 = [...Object.values(rutinaActiva.sesion1)];
      // Sesiones previas para comprobar que la sesion existe,
      // porque si no existe la funfion .push da error ya que intenta iterar sobre undefine
      const sesionesNuevas2Prev = [0];
      const sesionesNuevas3Prev = [0];
      const sesionesNuevas4Prev = [0];
      const sesionesNuevas5Prev = [0];
      const sesionesNuevas6Prev = [0];
      const sesionesNuevas7Prev = [0];
      // Primero comprobamos que exista la sesion
      if(rutinaActiva.sesion2 && rutinaActiva.sesion2 !== null){sesionesNuevas2Prev.push([...Object.values(rutinaActiva.sesion2)])}
      if(rutinaActiva.sesion3 && rutinaActiva.sesion3 !== null){sesionesNuevas3Prev.push([...Object.values(rutinaActiva.sesion3)])}
      if(rutinaActiva.sesion4 && rutinaActiva.sesion4 !== null){sesionesNuevas4Prev.push([...Object.values(rutinaActiva.sesion4)])}
      if(rutinaActiva.sesion5 && rutinaActiva.sesion5 !== null){sesionesNuevas5Prev.push([...Object.values(rutinaActiva.sesion5)])}
      if(rutinaActiva.sesion6 && rutinaActiva.sesion6 !== null){sesionesNuevas6Prev.push([...Object.values(rutinaActiva.sesion6)])}
      if(rutinaActiva.sesion7 && rutinaActiva.sesion7 !== null){sesionesNuevas7Prev.push([...Object.values(rutinaActiva.sesion7)])}

      // Si la sesion no existe, las sesiones nuevas toman el valor de cero
      const [sesionesNuevas2] = [sesionesNuevas2Prev[sesionesNuevas2Prev.length - 1]];
      const [sesionesNuevas3] = [sesionesNuevas3Prev[sesionesNuevas3Prev.length - 1]];
      const [sesionesNuevas4] = [sesionesNuevas4Prev[sesionesNuevas4Prev.length - 1]];
      const [sesionesNuevas5] = [sesionesNuevas5Prev[sesionesNuevas5Prev.length - 1]];
      const [sesionesNuevas6] = [sesionesNuevas6Prev[sesionesNuevas6Prev.length - 1]];
      const [sesionesNuevas7] = [sesionesNuevas7Prev[sesionesNuevas7Prev.length - 1]];
      
      // console.log("largoSesionesActivas: ",
      //   largoSesionesActivas[0],
      //   largoSesionesActivas[1],
      //   largoSesionesActivas[2],
      //   largoSesionesActivas[3],
      //   largoSesionesActivas[4],
      //   largoSesionesActivas[5],
      //   largoSesionesActivas[6],
      //   largoSesionesActivas[7],

      // );


      // Fusionamos los arreglos nuevos con los viejos
      arregloInicialSesion1.forEach((objeto, index)=>{sesionesNuevas1.push(arregloInicialSesion1[index]);})
      // Primero comprobamos que las constantes sean distintas de un numero entero con la funcion Number.isInteger()
      arregloInicialSesion2.forEach((objeto, index)=>{ if(!Number.isInteger(sesionesNuevas2)){sesionesNuevas2.push(arregloInicialSesion2[index]);}})
      arregloInicialSesion3.forEach((objeto, index)=>{ if(!Number.isInteger(sesionesNuevas3)){sesionesNuevas3.push(arregloInicialSesion3[index]);}})
      arregloInicialSesion4.forEach((objeto, index)=>{ if(!Number.isInteger(sesionesNuevas4)){sesionesNuevas4.push(arregloInicialSesion4[index]);}})
      arregloInicialSesion5.forEach((objeto, index)=>{ if(!Number.isInteger(sesionesNuevas5)){sesionesNuevas5.push(arregloInicialSesion5[index]);}})
      arregloInicialSesion6.forEach((objeto, index)=>{ if(!Number.isInteger(sesionesNuevas6)){sesionesNuevas6.push(arregloInicialSesion6[index]);}})
      arregloInicialSesion7.forEach((objeto, index)=>{ if(!Number.isInteger(sesionesNuevas7)){sesionesNuevas7.push(arregloInicialSesion7[index]);}})
      
      

      

        // Agregamos los nuevos objetos a la rutinaActiva
        // Transformando los arreglos a objetos
        if(rutinaActiva.sesion1) setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, sesion1: deArregloAObjetoHelper(sesionesNuevas1, 'ejercicio')}));    
        if(rutinaActiva.sesion2) setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, sesion2: deArregloAObjetoHelper(sesionesNuevas2, 'ejercicio')}));       
        if(rutinaActiva.sesion3) setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, sesion3: deArregloAObjetoHelper(sesionesNuevas3, 'ejercicio')}));    
        if(rutinaActiva.sesion4) setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, sesion4: deArregloAObjetoHelper(sesionesNuevas4, 'ejercicio')}));    
        if(rutinaActiva.sesion5) setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, sesion5: deArregloAObjetoHelper(sesionesNuevas5, 'ejercicio')}));    
        if(rutinaActiva.sesion6) setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, sesion6: deArregloAObjetoHelper(sesionesNuevas6, 'ejercicio')}));    
        if(rutinaActiva.sesion7) setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, sesion7: deArregloAObjetoHelper(sesionesNuevas7, 'ejercicio')}));
      
        
        
    }


    



    // Quitamos objetos
    else if (largoSesionesActivas[0] > cantidadEjercicios){


      const sesiones1Nuevas = [...Object.values(rutinaActiva.sesion1)].reverse().slice((largoSesionesActivas[0] - cantidadEjercicios));
      
      // Sesiones previas para comprobar la existencia de las mismas
      const sesiones2NuevasPrev = [0];
      const sesiones3NuevasPrev = [0];
      const sesiones4NuevasPrev = [0];
      const sesiones5NuevasPrev = [0];
      const sesiones6NuevasPrev = [0];
      const sesiones7NuevasPrev = [0];

      // Eliminar los últimos objetos
      if(rutinaActiva.sesion2 && rutinaActiva.sesion2 !== null){sesiones2NuevasPrev.push([...Object.values(rutinaActiva.sesion2)].reverse().slice((largoSesionesActivas[1] - cantidadEjercicios)))}
      if(rutinaActiva.sesion3 && rutinaActiva.sesion3 !== null){sesiones3NuevasPrev.push([...Object.values(rutinaActiva.sesion3)].reverse().slice((largoSesionesActivas[2] - cantidadEjercicios)))}
      if(rutinaActiva.sesion4 && rutinaActiva.sesion4 !== null){sesiones4NuevasPrev.push([...Object.values(rutinaActiva.sesion4)].reverse().slice((largoSesionesActivas[3] - cantidadEjercicios)))}
      if(rutinaActiva.sesion5 && rutinaActiva.sesion5 !== null){sesiones5NuevasPrev.push([...Object.values(rutinaActiva.sesion5)].reverse().slice((largoSesionesActivas[4] - cantidadEjercicios)))}
      if(rutinaActiva.sesion6 && rutinaActiva.sesion6 !== null){sesiones6NuevasPrev.push([...Object.values(rutinaActiva.sesion6)].reverse().slice((largoSesionesActivas[5] - cantidadEjercicios)))}
      if(rutinaActiva.sesion7 && rutinaActiva.sesion7 !== null){sesiones7NuevasPrev.push([...Object.values(rutinaActiva.sesion7)].reverse().slice((largoSesionesActivas[6] - cantidadEjercicios)))}


      const [sesiones2Nuevas] = [sesiones2NuevasPrev[sesiones2NuevasPrev.length - 1]];
      const [sesiones3Nuevas] = [sesiones3NuevasPrev[sesiones3NuevasPrev.length - 1]];
      const [sesiones4Nuevas] = [sesiones4NuevasPrev[sesiones4NuevasPrev.length - 1]];
      const [sesiones5Nuevas] = [sesiones5NuevasPrev[sesiones5NuevasPrev.length - 1]];
      const [sesiones6Nuevas] = [sesiones6NuevasPrev[sesiones6NuevasPrev.length - 1]];
      const [sesiones7Nuevas] = [sesiones7NuevasPrev[sesiones7NuevasPrev.length - 1]];



      // Eliminar los últimos objetos
      sesiones1Nuevas.reverse()
      if(!Number.isInteger(sesiones2Nuevas)){sesiones2Nuevas.reverse()}
      if(!Number.isInteger(sesiones3Nuevas)){sesiones3Nuevas.reverse()}
      if(!Number.isInteger(sesiones4Nuevas)){sesiones4Nuevas.reverse()}
      if(!Number.isInteger(sesiones5Nuevas)){sesiones5Nuevas.reverse()}
      if(!Number.isInteger(sesiones6Nuevas)){sesiones6Nuevas.reverse()}
      if(!Number.isInteger(sesiones7Nuevas)){sesiones7Nuevas.reverse()}


      if(rutinaActiva.sesion1) setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, sesion1: deArregloAObjetoHelper(sesiones1Nuevas, 'ejercicio')}));
      if(rutinaActiva.sesion2 && !Number.isInteger(sesiones2Nuevas)) setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, sesion2: deArregloAObjetoHelper(sesiones2Nuevas, 'ejercicio')}));
      if(rutinaActiva.sesion3 && !Number.isInteger(sesiones3Nuevas)) setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, sesion3: deArregloAObjetoHelper(sesiones3Nuevas, 'ejercicio')}));
      if(rutinaActiva.sesion4 && !Number.isInteger(sesiones4Nuevas)) setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, sesion4: deArregloAObjetoHelper(sesiones4Nuevas, 'ejercicio')}));
      if(rutinaActiva.sesion5 && !Number.isInteger(sesiones5Nuevas)) setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, sesion5: deArregloAObjetoHelper(sesiones5Nuevas, 'ejercicio')}));
      if(rutinaActiva.sesion6 && !Number.isInteger(sesiones6Nuevas)) setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, sesion6: deArregloAObjetoHelper(sesiones6Nuevas, 'ejercicio')}));
      if(rutinaActiva.sesion7 && !Number.isInteger(sesiones7Nuevas)) setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, sesion7: deArregloAObjetoHelper(sesiones7Nuevas, 'ejercicio')}));

      

    }


  }



  const sumarObjetos = (cantidadEjercicios, largoSesionActiva)=>{

    const arregloInicial = [];


    // Guardamos la cantidad de objetos en un arreglo
    for (let i = 0; i < (cantidadEjercicios - largoSesionActiva); i++) {
      const objetoAgregado = {
        ejercicio: "un ejercicio cualquiera",
        img: "",
        video: "",
        pausa: "",
        ejecucion: ""
      }
      arregloInicial.push(objetoAgregado);        
    }

    return arregloInicial;
  }






  // Carga una nueva rutina de las rutinas guardadas
  const selectorRutinas = (nombreRutina)=>{
    if(nombreRutina === "") return;
    const rutina = [];
    Object.entries(rutinas).forEach(([clave, valor])=>{
      if(valor.nombre === nombreRutina){
        rutina.push(valor);
      }
    });

    setRutinaActiva(rutina[0]);
    setNombreRutina(nombreRutina);
    setSelectorNombreRutina(nombreRutina);

  }






  const actualizarRutina = ()=>{
    if(!rutinaActiva.id){
      Swal.fire('Error','Guarda la rutina como NUEVA RUTINA', 'error');
      return;
    }
    dispatch(guardarRutina(rutinaActiva));
    setSelectorNombreRutina(rutinaActiva.nombre);
  }



  const eliminar = ()=>{
    if(!rutinaActiva.id){
      Swal.fire('Error','No Existe esta Rutina', 'error');
      return;
    }
    dispatch(eliminarRutina(rutinaActiva.id));
    setNombreRutina("");
    setRutinaActiva(
      {
        id:"",
        nombre:"",
        sesion1:{}
      }
    );
  }







  useEffect(() => {
    
    // console.log("nuevaRutinaActiva: ", rutinaActiva);
    activarEstaRutina();
  }, [rutinaActiva])
  

  const activarEstaRutina = ()=>{

    dispatch(activarRutina(rutinaActiva.id, rutinaActiva));

  }
  







  // Agregar Nueva Rutina
  const guardar = ()=>{
    dispatch(agregarRutina(rutinaActiva));
    setSelectorNombreRutina(rutinaActiva.nombre);
  }


  























  return (
    <div style={{marginBottom:"100px"}} className='d-flex flex-column justify-content-center align-items-center positon-relative '>

      {/* <div>
        <h5>Convertir a PDF</h5>
        <PdfGenerator /> */}





      {/* <h4 className='bg-dark text-center text-info p-2' style={{fontWeight: "normal", textTransform: "uppercase", width:"100%"}}>Rutina</h4> */}


      <div style={{width:"98%", margin:"0 auto"}}>
        <h4 className='bg-dark text-center text-white p-2 mt-1 w-85 fs-6' style={{fontWeight: "normal", textTransform: "uppercase", borderRadius:"4px"}}>Plan de Entrenamiento</h4>
      </div>


      {/* SESIONES */}

      {Object.entries(rutinaActiva).map(([cl, sesiones, i])=> { if(cl !== 'id' && cl !== 'nombre'){return(






        <div className='mt-5' style={{width:"95%", backgroundColor: "white"}}>

          <table className="table align-middle table-borderless table-sm">
            <thead>
              <tr style={{textAlign:"center"}}>
                <th scope="col" className='text-bg-secondary fw-normal'>°</th>
                <th scope="col" className='text-bg-secondary fw-normal'>Ejercicios</th>
                <th scope="col" className='text-bg-secondary fw-normal'>IMG</th>
                <th scope="col" className='text-bg-secondary fw-normal'>Video</th>
                <th scope="col" className='text-bg-secondary fw-normal'>Pausa</th>
                <th scope="col" className='text-bg-secondary fw-normal'>Ejecucion</th>
              </tr>
            </thead>
            <tbody>
              



              {/* EJERCICIOS */}
              {
                Object.values(sesiones).map(( ejerciciosSeccion, index)=> { return(
                  <tr>
                    <th scope="row">{index +1}</th>



                      {/* SELECTOR EJERCICIOS */}
                      <td style={{width:"20%", backgroundColor: "white"}}>
                        {/* El select debe tener el value guardado del objeto en la base de datos value={el alimento de la base de datos} */}
                        <select 
                          onChange={(e)=>{handleSelectChange(e, index, cl)}}
                          value={ejerciciosSeccion.ejercicio} 
                          className="me-2 fs-6 rounded" 
                          style={{
                            height:"30px", 
                            color:"black", 
                            width:"100%", 
                            border:"none", 
                            backgroundColor: "white",
                            appearance: 'none', // Oculta la flecha en navegadores compatibles
                            WebkitAppearance: 'none', // Para Safari
                            MozAppearance: 'none', // Para Firefox

                          }}
                        >
                          <option value={""}></option>
                          {ejercicios.map((elemento) => (
                            <option key={elemento.ejercicio} value={elemento.ejercicio}>
                              {elemento.ejercicio}
                            </option>
                          ))}
                        </select>
                      </td>

                      

                      {/* IMG */}
                      <td style={{width:"20%"}}>
                        <div>
                          {ejerciciosSeccion.img && <iframe src={ejerciciosSeccion.img} width="100%" height="40px" allow="autoplay"></iframe>}
                        </div>
                      </td>



                      {/* VIDEOS */}
                      <td>{ejerciciosSeccion.video && ejerciciosSeccion.video}</td>



                      {/* PAUSA */}
                      <td>
                        <select 
                          value={ejerciciosSeccion.pausa}
                          onChange={(e)=>{handlePausaChange(e, index, cl, sesiones)}}
                          style={{
                            border:"none",
                            backgroundColor: "white",
                            appearance: 'none', // Oculta la flecha en navegadores compatibles
                            WebkitAppearance: 'none', // Para Safari
                            MozAppearance: 'none', // Para Firefox

                          }}
                        >
                          <option></option>
                          <option value={"25seg"}>25seg</option>
                          <option value={"30seg"}>30seg</option>
                          <option value={"40seg"}>40seg</option>
                          <option value={"1min"}>1min</option>
                          <option value={"1-2min"}>1-2min</option>
                          <option value={"2-3min"}>2-3min</option>
                          <option value={"3-5min"}>3-5min</option>
                        </select>
                      </td>



                      {/* EJECUCION */}
                      <td>
                        <input 
                          style={{width:"90%", border:"none"}}
                          value={ejerciciosSeccion.ejecucion}
                          onChange={(e)=>{handleEjecucionChange(e, index, cl, sesiones)}}
                        >
                        </input>
                      </td>
                  </tr>
                )})
              }

                




              
            </tbody>
          </table>
          
          
        </div>



        )}})

        
      }


      {/* RUTINA DE ABS */}
      <div style={{width:"98%", margin:"0 auto"}}>
        <h4 className='bg-dark text-center text-white p-2 mt-5 w-85 fs-6' style={{fontWeight: "normal", textTransform: "uppercase", borderRadius:"4px"}}>Rutina de ABS</h4>
      </div>

      

      <div className='mt-5' style={{width:"95%", backgroundColor: "white"}}>

          <table className="table align-middle table-borderless table-sm">
            <thead>
              <tr style={{textAlign:"center"}}>
                <th scope="col" className='text-bg-secondary fw-normal'>°</th>
                <th scope="col" className='text-bg-secondary fw-normal'>Ejercicios</th>
                <th scope="col" className='text-bg-secondary fw-normal'>IMG</th>
                <th scope="col" className='text-bg-secondary fw-normal'>Video</th>
                <th scope="col" className='text-bg-secondary fw-normal'>Pausa</th>
                <th scope="col" className='text-bg-secondary fw-normal'>Ejecucion</th>
              </tr>
            </thead>
            <tbody>
              



              
              {/* EJERCICIOS */
                dieta.rutinaABS &&
                Object.values(dieta.rutinaABS).map(( ejerciciosSeccion, index)=> { return(
                  <tr>
                    <th scope="row">{index +1}</th>



                      {/* SELECTOR EJERCICIOS */}
                      <td style={{width:"20%", backgroundColor: "white"}}>
                        {/* El select debe tener el value guardado del objeto en la base de datos value={el alimento de la base de datos} */}
                        <select 
                          // onChange={(e)=>{handleSelectChange(e, index, cl)}}
                          value={ejerciciosSeccion.ejercicio} 
                          className="me-2 fs-6 rounded" 
                          style={{
                            height:"30px", 
                            color:"black", 
                            width:"100%", 
                            border:"none", 
                            backgroundColor: "white",
                            appearance: 'none', // Oculta la flecha en navegadores compatibles
                            WebkitAppearance: 'none', // Para Safari
                            MozAppearance: 'none', // Para Firefox

                          }}
                        >
                          <option value={""}></option>
                          {ejercicios.map((elemento) => (
                            <option key={elemento.ejercicio} value={elemento.ejercicio}>
                              {elemento.ejercicio}
                            </option>
                          ))}
                        </select>
                      </td>

                      

                      {/* IMG */}
                      <td style={{width:"20%"}}>
                        <div>
                          {ejerciciosSeccion.img && <iframe src={ejerciciosSeccion.img} width="100%" height="40px" allow="autoplay"></iframe>}
                        </div>
                      </td>



                      {/* VIDEOS */}
                      <td>{ejerciciosSeccion.video && ejerciciosSeccion.video}</td>



                      {/* PAUSA */}
                      <td>
                        <select 
                          value={ejerciciosSeccion.pausa}
                          // onChange={(e)=>{handlePausaChange(e, index, cl, sesiones)}}
                          style={{
                            border:"none",
                            backgroundColor: "white",
                            appearance: 'none', // Oculta la flecha en navegadores compatibles
                            WebkitAppearance: 'none', // Para Safari
                            MozAppearance: 'none', // Para Firefox

                          }}
                        >
                          <option></option>
                          <option value={"25seg"}>25seg</option>
                          <option value={"30seg"}>30seg</option>
                          <option value={"40seg"}>40seg</option>
                          <option value={"1min"}>1min</option>
                          <option value={"1-2min"}>1-2min</option>
                          <option value={"2-3min"}>2-3min</option>
                          <option value={"3-5min"}>3-5min</option>
                        </select>
                      </td>



                      {/* EJECUCION */}
                      <td>
                        <input 
                          style={{width:"90%", border:"none"}}
                          value={ejerciciosSeccion.ejecucion}
                          // onChange={(e)=>{handleEjecucionChange(e, index, cl, sesiones)}}
                        >
                        </input>
                      </td>
                  </tr>
                )})
              }

                




              
            </tbody>
          </table>
          
          
        </div>
















      
      
      
      
      
      {/* CARDIO */}
      <div style={{width:"98%", margin:"0 auto"}}>
        <h4 className='bg-dark text-center text-white p-2 mt-5 w-85 fs-6' style={{fontWeight: "normal", textTransform: "uppercase", borderRadius:"4px"}}>Cardio</h4>
      </div>
      <textarea className='w-100 mt-2'></textarea>
      
      
      
      
      {/* DIAS DE ENTRENAMIENTO */}
      <div style={{width:"98%", margin:"0 auto"}}>
        <h4 className='bg-dark text-center text-white p-2 mt-5 w-85 fs-6' style={{fontWeight: "normal", textTransform: "uppercase", borderRadius:"4px"}}>Días de Entrenamiento</h4>
      </div>
      

      

        


        <div className='position-fixed bottom-0 bg-black w-100 px-2 py-1 pb-4' style={{opacity:"70%"}}>
          <BarTool 
            selectorEjercicios={selectorEjercicios}
            numeroEjercicios={numeroEjercicios}
            guardar={guardar}
            selectorSesiones={selectorSesiones}
            numeroSesiones={numeroSesiones}
            rutinas={rutinas}
            selectorRutinas={selectorRutinas}
            nombreRutina={nombreRutina}
            setNombreRutina={setNombreRutina}
            setRutinaActiva={setRutinaActiva}
            actualizarRutina={actualizarRutina}
            eliminar={eliminar}
            selectorNombreRutina={selectorNombreRutina}
          />
        </div>


    </div>
  )
}
