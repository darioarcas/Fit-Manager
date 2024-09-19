import React, { useEffect, useState } from 'react';
import { BarTool } from './informacion-paginas/rutinas/BarTool';
import { ejercicios } from './informacion-paginas/rutinas/RutinasArreglos';
import { activarRutina, agregarRutina } from '../../actions/rutina';
import { useDispatch } from 'react-redux';



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

  // ejercicioSeleccionado contiene todos los ejercicios de una sesion
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(ejercicioInit);
  const [numeroEjercicios, setNumeroEjercicios] = useState(ejercicioSeleccionado.length)
  // La rutinaActiva se tomaria desde un useSelector para tomar el objeto cargado(por un action) desde la db
  const [rutinaActiva, setRutinaActiva] = useState(rutinaInit);
  // const [sesionAuxiliar, setSesionAuxiliar] = useState({});
  const [sesion, setSesion] = useState({sesion1:1, sesion2:2, sesion3:3, sesion4:4, sesion5:5, sesion6:6, sesion7:7});

  const dispatch = useDispatch();

  

  const handleSelectChange = (e, index) => {
    // Devuelve el primer elemento del array que cumple con la condición
    
    const ejercicioEncontrado = ejercicios.find(a => a.ejercicio === e.target.value);

    
    // Solo modificamos el objeto seleccionado dentro del arreglo de objetos
    const nuevoarreglo = ejercicioSeleccionado.map((seleccionado, i)=>{
      if(i === index){
        return ejercicioEncontrado;
      }
      return seleccionado;
    });

    
    
    setEjercicioSeleccionado(nuevoarreglo);

    // setRutinaActiva();

  };
  
  

  useEffect(() => {
    setNumeroEjercicios(ejercicioSeleccionado.length);
  }, [ejercicioSeleccionado])
  





  const botonAgregar = (e)=>{

    if(ejercicioSeleccionado.length <= 6){

        setEjercicioSeleccionado( [...ejercicioSeleccionado ,
          {
          ejercicio: "un ejercicio cualquiera",
          img: "",
          video: "",
          pausa: "",
          ejecucion: ""
        }]);



        console.log("viejaRutinaActiva: ", rutinaActiva);
        console.log("ejercicioSeleccionado: ", ejercicioSeleccionado);

        // Actualizamos rutinaActiva
        setRutinaActiva({...rutinaActiva, sesion1: deArregloAObjeto([...ejercicioSeleccionado ,
          {
          ejercicio: "un ejercicio cualquiera",
          img: "",
          video: "",
          pausa: "",
          ejecucion: ""
        }])});
    
    }
  }

  useEffect(() => {
    console.log("nuevaRutinaActiva: ", rutinaActiva);
  }, [ejercicioSeleccionado])
  




  const deArregloAObjeto = (arreglo)=>{
    // Convertimos el arreglo en un objeto
    const ejercicioObject = arreglo.reduce((accumulator, user, index) => {
      // Usamos una clave personalizada
      const clave = `ejercicio${index + 1}`;
      accumulator[clave] = user;
      return accumulator; // Retornamos el acumulador para la siguiente iteración
    }, {}); // Inicializamos el acumulador como un objeto vacío
    return ejercicioObject;
  }


  // Agregar Nueva Rutina
  const guardar = ()=>{
    console.log("GUARDANDO!!!!!!!");
    dispatch(agregarRutina());
  }



  const botonQuitar = ()=>{

    setEjercicioSeleccionado( ejercicioSeleccionado.slice(0, ejercicioSeleccionado.length - 1));
    setRutinaActiva({...rutinaActiva, sesion1: deArregloAObjeto(ejercicioSeleccionado.slice(0, ejercicioSeleccionado.length - 1))});

  }


  const activarEstaRutina = ()=>{
    // console.log("Rutina Activa", ejercicioSeleccionado[0]);

    dispatch(activarRutina("esto es un id", ejercicioSeleccionado[0]));
  }
  

  const numeroSesionActiva = (numero)=>{
    // const ejerciciosSesion = Object.entries(rutinaActiva).map(([clave, valor])=>{

    // });
  }


  const numeroSesion = (numero)=>{

  }

  return (
    <div className='d-flex justify-content-center positon-relative'>







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
            

            {
              ejercicioSeleccionado.map((seleccionados, index)=> { return(
              // Object.entries(rutinaActiva).map((clave, seleccionados, index)=> { if(clave === "sesion1"){   return(
                <tr>
                  <th scope="row">{index +1}</th>


                    <td style={{width:"20%"}}>
                      {/* El select debe tener el value guardado del objeto en la base de datos value={el alimento de la base de datos} */}
                      <select onChange={(e)=>{handleSelectChange(e, index)}}  value={seleccionados.ejercicio} className="me-2 fs-6 rounded" style={{height:"30px", color:"black", width:"100%", border:"none"}}>
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
                        {seleccionados.img && <iframe src={seleccionados.img} width="100%" height="40px" allow="autoplay"></iframe>}
                      </div>
                    </td>

                    <td>{seleccionados.video && seleccionados.video}</td>

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


                    <td>video</td>
                </tr>
              )})
            }

              




            
          </tbody>
        </table>
        
        
      </div>
     

      


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
    </div>
  )
}
