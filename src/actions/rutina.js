import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { cargarRutinas } from "../helpers/cargarRutinas";
import { types } from "../types/types";
import { deArregloAObjetoHelper } from "../helpers/deArregloAObjeto";









export const agregarRutina = (nuevaRutina) => {
    // MiddleWare para agregar a la base de datos la Rutina
    return async (dispatch, getState)=>{
  
        const uid = getState().auth.uid;

        // creamos una copia de la nota para eliminar el id
        const rutinaAFirestore = {...nuevaRutina};
        // eliminamos el id
        delete rutinaAFirestore.id;

        // const nuevaRutina = {
        //   rutina:{
        //       nombre:"Nombre rutina",
        //       sesion1:{
        //           ejercicio1:{
        //               ejercicio: "",
        //               img: "",
        //               video: "",
        //               pausa: "",
        //               ejecucion: ""
        //           }
        //       },
        //       sesion2:{},
        //       sesion3:{},
        //       sesion4:{},
        //       sesion5:{},
        //       sesion6:{},
        //       sesion7:{},
        //   }
        // }
    
    
        const doc = await db.collection(`${uid}/rutinas-usuario/rutina`).add(rutinaAFirestore);
        dispatch(activarRutina(doc.id, nuevaRutina));
       dispatch(agregarNuevaRutinaReducer(doc.id, nuevaRutina));

      //  // Actualizamos el alumno en el store
      //  dispatch(refrescarRutina(doc.id, nuevaRutina));

       // Swal.fire('Guardado', note.title, 'success');
       Swal.fire({
        title: 'Guardado!',
        timer: 800,
        icon: 'success'
    });
    }
  }



export const agregarNuevaRutinaReducer = (id, rutina)=>{
    return {
        type: types.rutinaNew,

        // agregamos el id de la rutina al arreglo
        payload: {
            ...rutina, id
     }
    }
}






export const empezarCargaRutinas = (uid)=>{
    return async(dispatch)=>{
  
        // Cargamos las notas del usuario
        // llamada a la db para extraer las rutinas
        const rutinas = await cargarRutinas(uid);
        // llamamos a la accion y la enviamos al store
        dispatch(setearRutinasReducer(deArregloAObjetoHelper(rutinas, 'rutina')));
        // dispatch(setearRutinasReducer(rutinas));
    }
  }
  
  
  
  
  export const setearRutinasReducer = (rutinas)=>{
    return {
        type: types.rutinaLoad,
        payload: {...rutinas}
    }
  }






  export const activarRutina = (id, rutina)=>{
    
    return{
      
      type: types.rutinaActive,
      payload: {
        ...rutina,
        id,
      }

      
    }
  }








  export const cierraFormularioRutina = ()=>{
    return{
      type: types.rutinaCerrarFormulario
    }
  }








  export const eliminarRutina = (id)=>{
    
    return async(dispatch, getState)=>{
  
        const uid = getState().auth.uid;
        await db.doc(`${uid}/rutinas-usuario/rutina/${id}`).delete();
  
        Swal.fire({
            title: 'Eliminado Correctamente',
            timer: 800,
            icon: 'success'
        });
        dispatch(borrarRutina(id));
    }
  }
  
  
  export const borrarRutina = (id)=>{
    return {
        type: types.rutinaDelete,
        payload: id
    }
  }












  
// actualizar alumno
export const guardarRutina = (rutina)=>{

    // utilizamos el midleware
    return async (dispatch, getState)=>{
  
  
        const uid = getState().auth.uid;
  
        // creamos una copia de la nota para eliminar el id
        const rutinaAFirestore = {...rutina};
        // eliminamos el id
        delete rutinaAFirestore.id;
        
        // grabamos en la base de datos
        await db.doc(`${uid}/rutinas-usuario/rutina/${rutina.id}`).update(rutinaAFirestore);
        
        // console.log("Guardar rutina: ",rutina);
  
        // Actualizamos el alumno en el store
        dispatch(refrescarRutina(rutina.id, rutina));
  
        // Swal.fire('Guardado', note.title, 'success');
        Swal.fire({
            title: 'Actualizado!',
            timer: 800,
            icon: 'success'
        });
    }
  }
  
  
  
  
  
  export const refrescarRutina = (id, rutina)=>{
    return {
        type: types.rutinaUpdate,
        payload: {
            id,
            rutina
        }
  
    }
  }
  
  




  
  /////////////////////      CALCULADORA

//   export const actualizarProteina = (id, rutinaValores, rutinaActiva)=>{

//     return{
//       type: types.rutinaProteinaActualizar,
//       payload:{
//         id, rutinaValores
//       }
//     }
//   }
  