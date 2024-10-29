import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { cargarAlumnos } from "../helpers/cargarAlumnos";
import { types } from "../types/types"
import { cargarDietasAlumnos } from "../helpers/cargarDietasAlumnos";




// alumno.js contiene las acciones que puedes realizar en un alumno

/*
  // Configuracion de las reglas de la base de datos en firebase

  rules_version = '2';

  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if request.auth != null;
      }
    }
  }




///////////// ESTRUCTURA DE UNA DIETA

const dietaInit = {
    id:"",
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
  }

*/


const dietaInit = {
  id:"",
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
  suplementacion:{
    suplemento1:{suplemento:"", nota:""}, 
    suplemento2:{suplemento:"", nota:""}, 
    suplemento3:{suplemento:"", nota:""}
  },
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
}










export const agregarAlumno = () => {
  // MiddleWare para agregar a la base de datos al alumno
  return async (dispatch, getState)=>{

    const uid = getState().auth.uid;

    const nuevoAlumno = {
      nombre: '',
      pais: '',
      celular: '',
      ficha: '',
      plan: '',
      costo: '',
      fechaInicio: '',
      fechaFinal: '',
      fechaCreado: new Date().getTime()
    }

    const doc = await db.collection(`${uid}/grupo/alumnos`).add(nuevoAlumno);
    //Crear la dieta del alumno
    const dietaId = await db.collection(`${uid}/grupo/alumnos/${doc.id}/dieta`).add(dietaInit);

    dispatch(activarAlumno(doc.id, nuevoAlumno, dietaId.id));
    dispatch(agregarNuevoAlumno(doc.id, nuevoAlumno, dietaId.id));

  }
}





export const agregarNuevoAlumno = (id, alumno, dietaId)=>{
  return {
      type: types.alumnoAddNew,
      payload:{
          id,
          dietaId,
          ...alumno
      }
  }
}



export const empezarCargaAlumnos = (uid)=>{
  return async(dispatch)=>{

      // Cargamos las notas del usuario
      const alumnos = await cargarAlumnos(uid);
      // llamamos a la accion y la enviamos al store
      dispatch(setearAlumnos(alumnos));

      // empezarCargaDietasAlumnos(uid);
      
  }
}



export const empezarCargaDietasAlumnos = (uid, id, dietaId)=>{
  
  
  return async(dispatch, getState)=>{
    dispatch(setearCarga(false));
    // Monitoreo de carga de los datos
    const dietasAlumnos = await cargarDietasAlumnos(uid, id, dietaId);
    if(dietasAlumnos.length === 0){
     dispatch(setearDietasAlumnosReducer([dietaInit]));
    }
    else{
      dispatch(setearDietasAlumnosReducer(dietasAlumnos, dietaId));
    }
    dispatch(setearCarga(true));

  }
}


const setearCarga = (carga)=>{
  return{
    type: types.dietaAlumnoCarga,
    payload: carga
  }
}





export const setearDietasAlumnosReducer = (dietas, dietaId)=>{
    return {
        type: types.dietaAlumnoLoad,
        payload: [{...dietas[0], id: dietaId}]
    }
  }



export const setearAlumnos = (alumnos)=>{
  return {
      type: types.alumnoLoad,
      payload: [...alumnos]
  }
}



export const cierraFormulario = ()=>{
  return{
    type: types.cerrarFormulario
  }
}








export const activarAlumno = (id, alumno, dietaId)=>{

  return{
    
    type: types.alumnoActive,
    payload: {
      id,
      dietaId,
      ...alumno
    }
  }
}




// actualizar alumno
export const guardarAlumno = (alumno, alumnoSinDieta)=>{

  // utilizamos el midleware
  return async (dispatch, getState)=>{


      const uid = getState().auth.uid;

      // creamos una copia de la nota para eliminar el id
      const alumnoAFirestore = {...alumnoSinDieta};
      // eliminamos el id
      delete alumnoAFirestore.id;
      
      // grabamos en la base de datos
      await db.doc(`${uid}/grupo/alumnos/${alumnoSinDieta.id}`).update(alumnoAFirestore);


      // Actualizamos el alumno en el store
      dispatch(refrescarAlumnos(alumno.id, alumno));

      // Swal.fire('Guardado', note.title, 'success');
      Swal.fire({
          title: 'Guardado',
          timer: 800,
          icon: 'success'
      });
  }
}





export const refrescarAlumnos = (id, alumno)=>{
  return {
      type: types.alumnoUpdate,
      payload: {
          id,
          alumno
      }

  }
}






export const eliminarAlumno = (id, dietaId)=>{
  return async(dispatch, getState)=>{

      const uid = getState().auth.uid;
      await db.doc(`${uid}/grupo/alumnos/${id}/dieta/${dietaId}`).delete();
      await db.doc(`${uid}/grupo/alumnos/${id}`).delete();

      Swal.fire({
          title: 'Eliminado Correctamente',
          timer: 800,
          icon: 'success'
      });
      dispatch(borrarAlumno(id));
  }
}


export const borrarAlumno = (id)=>{
  return {
      type: types.alumnoDelete,
      payload: id
  }
}






export const cerrarSesionAlumno = ()=>{
  return {
      type: types.alumnoLogoutCleaning
  }
}






////////////////////      FICHA DEL ALUMNO 








export const activarDietaAlumno = (id, dieta)=>{

  return{
    
    type: types.dietaActiveAlumnoFicha,
    payload: {...dieta, id: id}
  }
}





// actualizar la dieta del alumno
export const actualizarDietaAlumno = (dieta, alumnoId)=>{

  // utilizamos el midleware
  return async (dispatch, getState)=>{


      const uid = getState().auth.uid;

      // creamos una copia de la nota para eliminar el id
      const dietaAFirestore = {...dieta};
      // eliminamos el id
      delete dietaAFirestore.id;
      
      // grabamos en la base de datos
      // Debe tener la siguiente estructura: 
      // /hr9cf7O1gSQ6O1Cm0SVLIbBwlJk1/grupo/alumnos/yDQdhdDe2GEnzCXWNKSK/dieta/eqIuWWvnVNxvGzt5gyGG
      await db.doc(`${uid}/grupo/alumnos/${alumnoId}/dieta/${dieta.id}`).update(dietaAFirestore);


      // Actualizamos el alumno en el store
      // dispatch(refrescarDietaAlumno(dieta));

      // Swal.fire('Guardado', note.title, 'success');
      Swal.fire({
          title: 'Guardado',
          timer: 800,
          icon: 'success'
      });
  }
}





// export const refrescarDietaAlumno = (dieta)=>{
//   return {
//       type: types.dietaUpdateAlumnoFicha,
//       payload: {
//           dieta
//       }

//   }
// }