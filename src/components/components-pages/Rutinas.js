import React, { useEffect, useState } from 'react';
import { BarTool } from './informacion-paginas/rutinas/BarTool';
import { ejercicios } from './informacion-paginas/rutinas/RutinasArreglos';
import { activarRutina, agregarRutina } from '../../actions/rutina';
import { useDispatch, useSelector } from 'react-redux';
import { deArregloAObjetoHelper } from '../../helpers/deArregloAObjeto';
import App from './CalculadoraIC';



// Rutina
const rutinaInit = {
  id:"",
  nombre:"Nombre rutina",
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
  const rutinas = useSelector(reducer => (reducer.rutinas.rutinas));
  
  
  // ejercicioSeleccionado contiene todos los ejercicios de una sesion
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(Object.values(rutinas.rutina2.sesion1));

  
  
  
  // La rutinaActiva se tomaria desde un useSelector para tomar el objeto cargado(por un action) desde la db
  const [rutinaActiva, setRutinaActiva] = useState(rutinas.rutina2);
  // console.log("Rutina Activa Primero: ", rutinas);
  
  const [numeroEjercicios, setNumeroEjercicios] = useState(Object.values(rutinaActiva.sesion1).length);


  const [auxiliar, setAuxiliar] = useState([]);
  const [sesion, setSesion] = useState({sesion1:1, sesion2:2, sesion3:3, sesion4:4, sesion5:5, sesion6:6, sesion7:7});

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
  }, [rutinaActiva]);
  





  const botonAgregar = (cantidadAgregar)=>{


    const largoSesionActiva = Object.values(rutinaActiva.sesion1).length;


    
    // Agregamos objetos
    if(largoSesionActiva < cantidadAgregar){     
      
      const arregloInicial = [];

      // Guardamos la cantidad de objetos en un arreglo
      for (let i = 0; i < (cantidadAgregar - largoSesionActiva); i++) {
        const objetoAgregado = {
          ejercicio: "un ejercicio cualquiera",
          img: "",
          video: "",
          pausa: "",
          ejecucion: ""
        }
        arregloInicial.push(objetoAgregado);        
      }
      const sesionesNuevas = [...Object.values(rutinaActiva.sesion1)];
      const sesionesNuevas2 = [...Object.values(rutinaActiva.sesion2)];
      const sesionesNuevas3 = [...Object.values(rutinaActiva.sesion3)];
      // Fusionamos los arreglos nuevos con los viejos
      arregloInicial.map((objeto, index)=>{
        sesionesNuevas.push(arregloInicial[index]);
        sesionesNuevas2.push(arregloInicial[index]);
        sesionesNuevas3.push(arregloInicial[index]);
      })


      console.log("NUEVA SESION 2: ", sesionesNuevas2);

        // Agregamos los nuevos objetos a la rutinaActiva
        // Transformando los arreglos a objetos
        if(rutinaActiva.sesion1) setRutinaActiva({...rutinaActiva, sesion1: deArregloAObjetoHelper(sesionesNuevas, 'ejercicio')});    
        if(rutinaActiva.sesion2) setRutinaActiva({...rutinaActiva, sesion2: deArregloAObjetoHelper(sesionesNuevas2, 'ejercicio')});    
        if(rutinaActiva.sesion3) setRutinaActiva({...rutinaActiva, sesion3: deArregloAObjetoHelper(sesionesNuevas3, 'ejercicio')});    
        if(rutinaActiva.sesion4) setRutinaActiva({...rutinaActiva, sesion4: deArregloAObjetoHelper(sesionesNuevas, 'ejercicio')});    
        if(rutinaActiva.sesion5) setRutinaActiva({...rutinaActiva, sesion5: deArregloAObjetoHelper(sesionesNuevas, 'ejercicio')});    
        if(rutinaActiva.sesion6) setRutinaActiva({...rutinaActiva, sesion6: deArregloAObjetoHelper(sesionesNuevas, 'ejercicio')});    
        if(rutinaActiva.sesion7) setRutinaActiva({...rutinaActiva, sesion7: deArregloAObjetoHelper(sesionesNuevas, 'ejercicio')});    
    }



    // Quitamos objetos
    else if (largoSesionActiva > cantidadAgregar){


      // Eliminar los últimos objetos
      const sesionesNuevas = [...Object.values(rutinaActiva.sesion1)].reverse().slice((largoSesionActiva - cantidadAgregar));


      setRutinaActiva({...rutinaActiva, sesion1: deArregloAObjetoHelper(sesionesNuevas.reverse(), 'ejercicio')});

      Object.entries(rutinaActiva).map(([clave, valor, index])=>{
        if(
          clave === 'sesion1' || 
          clave === 'sesion2' || 
          clave === 'sesion3' || 
          clave === 'sesion4' ||
          clave === 'sesion5' ||
          clave === 'sesion6' ||
          clave === 'sesion7'
        ){
          console.log("CALVE: ", clave);
        }
      });

    }


  }

  useEffect(() => {
    // console.log("nuevaRutinaActiva: ", rutinaActiva);
    activarEstaRutina();
  }, [rutinaActiva])
  







  // Agregar Nueva Rutina
  const guardar = ()=>{
    console.log("GUARDANDO!!!!!!!");
    dispatch(agregarRutina(rutinaActiva));
  }



  const botonQuitar = ()=>{

    setEjercicioSeleccionado( ejercicioSeleccionado.slice(0, ejercicioSeleccionado.length - 1));

    const sesion1nueva = [...Object.values(rutinaActiva.sesion1)];

    setRutinaActiva({...rutinaActiva, sesion1: deArregloAObjetoHelper(sesion1nueva.slice(0, sesion1nueva.length - 1), 'ejercicio')});

  }


  const activarEstaRutina = ()=>{

    dispatch(activarRutina(rutinaActiva.id, rutinaActiva));
  }
  

  const numeroSesionActiva = (numero)=>{
    // const ejerciciosSesion = Object.entries(rutinaActiva).map(([clave, valor])=>{

    // });
  }


  const numeroSesion = (numero)=>{

  }




















  return (
    <div className='d-flex flex-column justify-content-center align-items-center positon-relative '>




    {/* SESIONES */}

    {Object.entries(rutinaActiva).map(([cl, sesiones, i])=> { if(cl !== 'id' && cl !== 'nombre'){return(






      <div className='mt-5' style={{width:"95%"}}>

        <table class="table align-middle table-borderless table-sm">
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
                    <td style={{width:"20%"}}>
                      {/* El select debe tener el value guardado del objeto en la base de datos value={el alimento de la base de datos} */}
                      <select onChange={(e)=>{handleSelectChange(e, index, cl)}}  value={ejerciciosSeccion.ejercicio} className="me-2 fs-6 rounded" style={{height:"30px", color:"black", width:"100%", border:"none"}}>
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
     

      


      <div className='position-fixed bottom-0 bg-black w-100 px-4 py-1 pb-4' style={{opacity:"30%"}}>
        <BarTool 
          botonAgregar={botonAgregar} 
          botonQuitar={botonQuitar} 
          numeroEjercicios={numeroEjercicios}
          activarEstaRutina={activarEstaRutina}
          guardar={guardar}
          numeroSesionActiva={numeroSesionActiva}
        />
      </div>



      {/* <App /> */}
    </div>
  )
}
