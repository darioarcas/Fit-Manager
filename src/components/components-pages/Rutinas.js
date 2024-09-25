import React, { useEffect, useRef, useState } from 'react';
import { BarTool } from './informacion-paginas/rutinas/BarTool';
import { ejercicios } from './informacion-paginas/rutinas/RutinasArreglos';
import { activarRutina, agregarRutina, eliminarRutina, guardarRutina } from '../../actions/rutina';
import { useDispatch, useSelector } from 'react-redux';
import { deArregloAObjetoHelper } from '../../helpers/deArregloAObjeto';
import App from './CalculadoraIC';
import Swal from 'sweetalert2';



// Rutina
const rutinaInit = {
  id:"",
  nombre:"Asigna un Nombre",
  sesion1:{
      ejercicio1:{
          ejercicio: "",
          img: "",
          video: "",
          pausa: "",
          ejecucion: ""
      },
  },
  sesion2:{
    ejercicio1:{
      ejercicio: "",
      img: "",
      video: "",
      pausa: "",
      ejecucion: ""
    },
  },
  sesion3:{
    ejercicio1:{
      ejercicio: "",
      img: "",
      video: "",
      pausa: "",
      ejecucion: ""
    },
  },
  sesion4:{},
  sesion5:{},
  sesion6:{},
  sesion7:{},
}




const ejercicioInit = [
  {
    ejercicio: "juancito",
    img: "",
    video: "",
    pausa: "",
    ejecucion: ""
  },
  {
    ejercicio: "",
    img: "",
    video: "",
    pausa: "",
    ejecucion: ""
  },
  {
    ejercicio: "",
    img: "",
    video: "",
    pausa: "",
    ejecucion: ""
  }
]



export const Rutinas = () => {

  
  
  
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

  const selectorRutinaActiva = useSelector(reducer=>(reducer.rutinas));




  // SOLUCIONAR ESTE ERROR!! el id de rutina activa deberia actualizarse cuando
  // se guarda una nueva rutina: El error ocurre cuando no existen rutinas, se guarda una rutina
  // (el id de rutinaActiva queda vacio) y se intentan guardar los cambios
  useEffect(() => {
    setRutinaActiva({...rutinaActiva, id: selectorRutinaActiva.active.id});
  }, [selectorRutinaActiva.active.id])
  
  
  
  // ejercicioSeleccionado contiene todos los ejercicios de una sesion
  // const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(Object.values(rutinas.rutina1.sesion1));
  
  
  
  
  // La rutinaActiva se tomaria desde un useSelector para tomar el objeto cargado(por un action) desde la db
  const [rutinaActiva, setRutinaActiva] = useState(rutinas.rutina1);
  // console.log("Rutina Activa Primero: ", rutinas);
  
  
  // // if(!rutinas.id || !rutinas.nombre || !rutinas.sesion1){
  // if(!rutinas.rutina1){
  //   setRutinaActiva(
  //     {
  //       id:"",
  //       nombre:"Nombre rutina",
  //       sesion1:{
  //           ejercicio1:{
  //               ejercicio: "",
  //               img: "",
  //               video: "",
  //               pausa: "",
  //               ejecucion: ""
  //           },
  //       }
  //     }
  //   );
  //   console.log("NO EXISTE RUTINA1: ", rutinas);
  // }
  
  const [numeroEjercicios, setNumeroEjercicios] = useState(Object.values(rutinaActiva.sesion1).length);


  const [auxiliar, setAuxiliar] = useState([]);
  const [numeroSesiones, setNumeroSesiones] = useState(Object.values(rutinaActiva).length - 2);

  const [nombreRutina, setNombreRutina] = useState(rutinaActiva.nombre)

  const dispatch = useDispatch();

  

  const handleSelectChange = (e, index, sesiones) => {
    // Devuelve el primer elemento del array que cumple con la condición
    
    const ejercicioEncontrado = ejercicios.find(a => a.ejercicio === e.target.value);

    
    // Solo modificamos el objeto seleccionado dentro del arreglo de objetos
    const rutinaActivaHandle = [];
    if(sesiones === 'sesion1') rutinaActivaHandle.push(rutinaActiva.sesion1);
    if(sesiones === 'sesion2') rutinaActivaHandle.push(rutinaActiva.sesion2);
    if(sesiones === 'sesion3') rutinaActivaHandle.push(rutinaActiva.sesion3);
    if(sesiones === 'sesion4') rutinaActivaHandle.push(rutinaActiva.sesion4);
    if(sesiones === 'sesion5') rutinaActivaHandle.push(rutinaActiva.sesion5);
    if(sesiones === 'sesion6') rutinaActivaHandle.push(rutinaActiva.sesion6);
    if(sesiones === 'sesion7') rutinaActivaHandle.push(rutinaActiva.sesion7);
    const nuevoarreglo = Object.values(rutinaActivaHandle[0]).map((seleccionado, i)=>{
      if(i === index){
        return ejercicioEncontrado;
      }
      return seleccionado;
    });
    
    
    // Actualizamos rutinaActiva
    
    if(sesiones === 'sesion1') setRutinaActiva({...rutinaActiva, sesion1: deArregloAObjetoHelper(nuevoarreglo, 'ejercicio')})
    if(sesiones === 'sesion2') setRutinaActiva({...rutinaActiva, sesion2: deArregloAObjetoHelper(nuevoarreglo, 'ejercicio')})
    if(sesiones === 'sesion3') setRutinaActiva({...rutinaActiva, sesion3: deArregloAObjetoHelper(nuevoarreglo, 'ejercicio')})
    if(sesiones === 'sesion4') setRutinaActiva({...rutinaActiva, sesion4: deArregloAObjetoHelper(nuevoarreglo, 'ejercicio')})
    if(sesiones === 'sesion5') setRutinaActiva({...rutinaActiva, sesion5: deArregloAObjetoHelper(nuevoarreglo, 'ejercicio')})
    if(sesiones === 'sesion6') setRutinaActiva({...rutinaActiva, sesion6: deArregloAObjetoHelper(nuevoarreglo, 'ejercicio')})
    if(sesiones === 'sesion7') setRutinaActiva({...rutinaActiva, sesion7: deArregloAObjetoHelper(nuevoarreglo, 'ejercicio')})

  };
  
  

  useEffect(() => {
    setNumeroEjercicios(Object.values(rutinaActiva.sesion1).length);
    setNumeroSesiones(Object.values(rutinaActiva).length - 2)
  }, [rutinaActiva]);
  
  console.log("ID ACTIVO: ", rutinaActiva.id);






  const selectorSesiones = (cantidadSesiones)=>{

    
    const largoRutinaActiva = Object.values(rutinaActiva).length - 2;
    
    // Sumamos sesiones
    if(largoRutinaActiva < cantidadSesiones){

      const arregloInicial = [];

      const arregloDeObjetos = sumarObjetos(numeroEjercicios, 0);

      // Guardamos la cantidad de objetos en un arreglo
      for (let i = (largoRutinaActiva + 1); i <= (cantidadSesiones); i++) {
        arregloInicial.push(deArregloAObjetoHelper(arregloDeObjetos, 'ejercicio'));        
      }


      const rutinaNueva = [];
      // Descartamos el id y el nombre
      Object.entries(rutinaActiva).map(([clave, valor, index])=>{
        if(clave !== 'id' && clave !== 'nombre' ){
          rutinaNueva.push(valor);
        }
      });
      
      
      const id = [];
      Object.entries(rutinaActiva).map(([clave, valor])=>{
        if(clave === 'id'){
          id.push(valor);
        }
      });
      const nombre = [];
      Object.entries(rutinaActiva).map(([clave, valor])=>{
        if(clave === 'nombre'){
          nombre.push(valor);
        }
      });
      arregloInicial.map((objeto, index)=>{rutinaNueva.push(arregloInicial[index]);})

      setRutinaActiva(deArregloAObjetoHelper(rutinaNueva, 'sesion'));
      setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, id: id[0]}));
      setRutinaActiva(prevRutinaActiva=>({...prevRutinaActiva, nombre: nombre[0]}));
    }




    
    // Quitamos Sesiones
    else if(largoRutinaActiva > cantidadSesiones){
      // Eliminar los últimos objetos
      const rutinaNueva = [];
      // Descartamos el id y el nombre
      Object.entries(rutinaActiva).map(([clave, valor, index])=>{
        if(clave !== 'id' && clave !== 'nombre' ){
          rutinaNueva.push(valor);
        }
      });


      const id = [];
      Object.entries(rutinaActiva).map(([clave, valor])=>{
        if(clave === 'id'){
          id.push(valor);
        }
      });
      const nombre = [];
      Object.entries(rutinaActiva).map(([clave, valor])=>{
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
    // Descartamos el id y el nombre
    Object.entries(rutinaActiva).map(([clave, valor, index])=>{
      if(clave !== 'id' && clave !== 'nombre' ){
        largoSesionesActivas.push(Object.values(valor).length);
      }
    });
    // Rellenamos los otros espacion con cero
    for (let i = (largoSesionesActivas.length); i < 7; i++) {
      largoSesionesActivas.push(0);
      
    }



    
    
    
    
    
    // const largoSesion1Activa = Object.values(rutinaActiva.sesion1).length;
    // const largoSesion2Activa = Object.values(rutinaActiva.sesion2).length;
    // const largoSesion3Activa = Object.values(rutinaActiva.sesion3).length;
    // const largoSesion4Activa = Object.values(rutinaActiva.sesion4).length;
    // const largoSesion5Activa = Object.values(rutinaActiva.sesion5).length;
    // const largoSesion6Activa = Object.values(rutinaActiva.sesion6).length;
    // const largoSesion7Activa = Object.values(rutinaActiva.sesion7).length;
    
    
    
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
      
      console.log("largoSesionesActivas: ",
        largoSesionesActivas[0],
        largoSesionesActivas[1],
        largoSesionesActivas[2],
        largoSesionesActivas[3],
        largoSesionesActivas[4],
        largoSesionesActivas[5],
        largoSesionesActivas[6],
        largoSesionesActivas[7],

      );
      // console.log("sesionesNuevas2: ",sesionesNuevas2);


      // Fusionamos los arreglos nuevos con los viejos
      arregloInicialSesion1.map((objeto, index)=>{sesionesNuevas1.push(arregloInicialSesion1[index]);})
      // Primero comprobamos que las constantes sean distintas de un numero entero con la funcion Number.isInteger()
      arregloInicialSesion2.map((objeto, index)=>{ if(!Number.isInteger(sesionesNuevas2)){sesionesNuevas2.push(arregloInicialSesion2[index]);}})
      arregloInicialSesion3.map((objeto, index)=>{ if(!Number.isInteger(sesionesNuevas3)){sesionesNuevas3.push(arregloInicialSesion3[index]);}})
      arregloInicialSesion4.map((objeto, index)=>{ if(!Number.isInteger(sesionesNuevas4)){sesionesNuevas4.push(arregloInicialSesion4[index]);}})
      arregloInicialSesion5.map((objeto, index)=>{ if(!Number.isInteger(sesionesNuevas5)){sesionesNuevas5.push(arregloInicialSesion5[index]);}})
      arregloInicialSesion6.map((objeto, index)=>{ if(!Number.isInteger(sesionesNuevas6)){sesionesNuevas6.push(arregloInicialSesion6[index]);}})
      arregloInicialSesion7.map((objeto, index)=>{ if(!Number.isInteger(sesionesNuevas7)){sesionesNuevas7.push(arregloInicialSesion7[index]);}})
      
      

      

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
      // const sesiones2Nuevas = [...Object.values(rutinaActiva.sesion2)].reverse().slice((largoSesionesActivas[1] - cantidadEjercicios));
      // const sesiones3Nuevas = [...Object.values(rutinaActiva.sesion3)].reverse().slice((largoSesionesActivas[2] - cantidadEjercicios));
      // const sesiones4Nuevas = [...Object.values(rutinaActiva.sesion4)].reverse().slice((largoSesionesActivas[3] - cantidadEjercicios));
      // const sesiones5Nuevas = [...Object.values(rutinaActiva.sesion5)].reverse().slice((largoSesionesActivas[4] - cantidadEjercicios));
      // const sesiones6Nuevas = [...Object.values(rutinaActiva.sesion6)].reverse().slice((largoSesionesActivas[5] - cantidadEjercicios));
      // const sesiones7Nuevas = [...Object.values(rutinaActiva.sesion7)].reverse().slice((largoSesionesActivas[6] - cantidadEjercicios));
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





  const selectorRutinas = (nombreRutina)=>{
    if(nombreRutina === "") return;
    const rutina = [];
    Object.entries(rutinas).map(([clave, valor, index])=>{
      if(valor.nombre === nombreRutina){
        rutina.push(valor);
      }
    });

    setRutinaActiva(rutina[0]);
    setNombreRutina(nombreRutina);
  }






  const actualizarRutina = ()=>{
    if(!rutinaActiva.id){
      Swal.fire('Error','Guarda la rutina como NUEVA RUTINA', 'error');
      return;
    }
    dispatch(guardarRutina(rutinaActiva));
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
  const guardar = async()=>{
    dispatch(agregarRutina(rutinaActiva));
    // setRutinaActiva(prevActiva =>({...prevActiva, id: rutinas}));
    console.log("selectorRutinaActiva: ", selectorRutinaActiva);
  }


  const idViejo = useRef(rutinaActiva.id);

  // if(idViejo.current !== selectorRutinaActiva.active.id && selectorRutinaActiva.active.id){
  //   console.log("ID Viejo: ", idViejo.current, "        ID Nuevo: ",selectorRutinaActiva.active.id);
  //   setRutinaActiva({...rutinaActiva, id: selectorRutinaActiva.active.id});
  //   // Si son diferentes entonces se almacena el nuevo valor
  //   idViejo.current = selectorRutinaActiva.active.id;
  // }
  


  

  const numeroSesionActiva = (numero)=>{
    // const ejerciciosSesion = Object.entries(rutinaActiva).map(([clave, valor])=>{

    // });
  }


  const numeroSesion = (numero)=>{

  }




















  return (
    <div style={{marginBottom:"100px"}} className='d-flex flex-column justify-content-center align-items-center positon-relative '>




    {/* SESIONES */}

    {Object.entries(rutinaActiva).map(([cl, sesiones, i])=> { if(cl !== 'id' && cl !== 'nombre'){return(






      <div className='mt-5' style={{width:"95%", backgroundColor: "white"}}>

        <table className="table align-middle table-borderless table-sm">
          <thead >
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ejercicio</th>
              <th scope="col">IMG</th>
              <th scope="col">Video</th>
              <th scope="col">Pausa</th>
              <th scope="col">Ejecucion</th>
            </tr>
          </thead>
          <tbody>
            



            {/* EJERCICIOS */}
            {
              // ejercicioSeleccionado.map((seleccionados, index)=> { return(
              Object.values(sesiones).map(( ejerciciosSeccion, index)=> { if(true){   return(
                <tr>
                  <th scope="row">{index +1}</th>



                    {/* SELECTOR EJERCICIOS */}
                    <td style={{width:"20%", backgroundColor: "white"}}>
                      {/* El select debe tener el value guardado del objeto en la base de datos value={el alimento de la base de datos} */}
                      <select onChange={(e)=>{handleSelectChange(e, index, cl)}}  value={ejerciciosSeccion.ejercicio} className="me-2 fs-6 rounded" style={{height:"30px", color:"black", width:"100%", border:"none", backgroundColor: "white"}}>
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
                      <select style={{border:"none"}}>
                        <option>25seg</option>
                        <option>30seg</option>
                        <option>40seg</option>
                        <option>1min</option>
                        <option>1-2min</option>
                        <option>2-3min</option>
                        <option>3-5min</option>
                      </select>
                    </td>



                    {/* EJECUCION */}
                    <td>video</td>
                </tr>
              )}})
            }

              




            
          </tbody>
        </table>
        
        
      </div>



      )}})}
     

      


      <div className='position-fixed bottom-0 bg-black w-100 px-2 py-1 pb-4' style={{opacity:"70%"}}>
        <BarTool 
          selectorEjercicios={selectorEjercicios}
          numeroEjercicios={numeroEjercicios}
          activarEstaRutina={activarEstaRutina}
          guardar={guardar}
          numeroSesionActiva={numeroSesionActiva}
          selectorSesiones={selectorSesiones}
          numeroSesiones={numeroSesiones}
          rutinas={rutinas}
          selectorRutinas={selectorRutinas}
          nombreRutina={nombreRutina}
          setNombreRutina={setNombreRutina}
          setRutinaActiva={setRutinaActiva}
          rutinaActiva={rutinaActiva}
          actualizarRutina={actualizarRutina}
          eliminar={eliminar}
        />
      </div>



      {/* <App /> */}
    </div>
  )
}
