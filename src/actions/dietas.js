import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { cargarDietas } from "../helpers/cargarDietas";
import { types } from "../types/types";









export const agregarDieta = () => {
    // MiddleWare para agregar a la base de datos la dieta
    return async (dispatch, getState)=>{
  
        const uid = getState().auth.uid;

        const nuevaDieta = {
            desayuno1: "",
            desayuno2: "",
            desayuno3: "",
            almuerzo1: "",
            almuerzo2: "",
            almuerzo3: "",
            merienda1: "",
            merienda2: "",
            merienda3: "",
            cena1: "",
            cena2: "",
            cena3: "",
            calculadorasAlimentos:{
              selectorAlimentosDesayuno:{},
              selectorAlimentosAlmuerzo:{},
              selectorAlimentosMerienda:{},
              selectorAlimentosCena:{},
              selectorAlimentosPostWork:{},
              selectorAlimentosSnack:{},
            },
            rutina:{
              id:"", 
              nombre:"", 
              sesion1:{ejercicio1:{}},
            },
            ruitnaABS:{
              ejercicio1:{}, 
              ejercicio2:{}, 
              ejercicio3:{}
            }, 
            cardio:{}, 
            diasEntrenamiento:{
              semana1:{}, 
              semana2:{}
            },
            progreso:{},
            recetas:{},
            suplementacion:{},
            postWork1: "",
            postWork2: "",
            postWork3: "",
            snack1: "",
            snack2: "",
            snack3: "",
            fecha: new Date().getTime(),
            calorias: "",
            proteinas: "",
            carbohidratos: "",
            grasas: ""
        };
    
    
        const doc = await db.collection(`${uid}/dietas-usuario/dieta`).add(nuevaDieta);
        dispatch(activarDieta(doc.id, nuevaDieta));
        dispatch(agregarNuevaDietaReducer(doc.id, nuevaDieta));
    }
  }



export const agregarNuevaDietaReducer = (id, dieta)=>{
    return {
        type: types.dietaNew,

        // agregamos el id de la dieta al arreglo
        payload: {
            ...dieta, id
     }
    }
}






export const empezarCargaDietas = (uid)=>{
    return async(dispatch)=>{
  
        // Cargamos las notas del usuario
        const dietas = await cargarDietas(uid);
        // llamamos a la accion y la enviamos al store
        dispatch(setearDietasReducer(dietas));
    }
  }
  
  
  
  
  export const setearDietasReducer = (dietas)=>{
    return {
        type: types.dietaLoad,
        payload: [...dietas]
    }
  }






  export const activarDieta = (id, dieta)=>{

    return{
      
      type: types.dietaActive,
      payload: {id, ...dieta}
    }
  }








  export const cierraFormularioDieta = ()=>{
    return{
      type: types.dietaCerrarFormulario
    }
  }








  export const eliminarDieta = (id)=>{
    
    return async(dispatch, getState)=>{
  
        const uid = getState().auth.uid;
        await db.doc(`${uid}/dietas-usuario/dieta/${id}`).delete();
  
        Swal.fire({
            title: 'Eliminado Correctamente',
            timer: 800,
            icon: 'success'
        });
        dispatch(borrarDieta(id));
    }
  }
  
  
  export const borrarDieta = (id)=>{
    return {
        type: types.dietaDelete,
        payload: id
    }
  }












  
// actualizar alumno
export const guardarDieta = (dieta)=>{

    // utilizamos el midleware
    return async (dispatch, getState)=>{
  
  
        const uid = getState().auth.uid;
  
        // creamos una copia de la nota para eliminar el id
        const dietaAFirestore = {...dieta};
        // eliminamos el id
        delete dietaAFirestore.id;
        
        // grabamos en la base de datos
        await db.doc(`${uid}/dietas-usuario/dieta/${dieta.id}`).update(dietaAFirestore);
        
        // console.log("Guardar Dieta: ",dieta);
  
        // Actualizamos el alumno en el store
        dispatch(refrescarDieta(dieta.id, dieta));
  
        // Swal.fire('Guardado', note.title, 'success');
        Swal.fire({
            title: 'Guardado',
            timer: 800,
            icon: 'success'
        });
    }
  }
  
  
  
  
  
  export const refrescarDieta = (id, dieta)=>{
    return {
        type: types.dietaUpdate,
        payload: {
            id,
            dieta
        }
  
    }
  }
  
  




  
  /////////////////////      CALCULADORA

  export const actualizarProteina = (id, dietaValores, dietaActiva)=>{

    return{
      type: types.dietaProteinaActualizar,
      payload:{
        id, dietaValores
      }
    }
  }
  