// Contiene las acciones que puedes realizar en un alumno



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

*/

import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { cargarAlumnos } from "../helpers/cargarAlumnos";
import { types } from "../types/types"
import { cargarDietasAlumnos } from "../helpers/cargarDietasAlumnos";






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
    dispatch(activarAlumno(doc.id, nuevoAlumno));
    dispatch(agregarNuevoAlumno(doc.id, nuevoAlumno));
  }
}





export const agregarNuevoAlumno = (id, alumno)=>{
  return {
      type: types.alumnoAddNew,
      payload:{
          id,
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

export const empezarCargaDietasAlumnos = (uid)=>{
  return async(dispatch)=>{
    const dietasAlumnos = await cargarDietasAlumnos(uid);
    dispatch(setearDietasAlumnosReducer(dietasAlumnos));
  }
}

export const setearDietasAlumnosReducer = (dietas)=>{
  console.log("LA DIETAAAAAAA:   ", dietas);
    return {
        type: types.dietaAlumnoLoad,
        payload: [...dietas]
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








export const activarAlumno = (id, alumno)=>{

  return{
    
    type: types.alumnoActive,
    payload: {
      id,
      ...alumno
    }
  }
}




// actualizar alumno
export const guardarAlumno = (alumno)=>{

  // utilizamos el midleware
  return async (dispatch, getState)=>{


      const uid = getState().auth.uid;

      // creamos una copia de la nota para eliminar el id
      const alumnoAFirestore = {...alumno};
      // eliminamos el id
      delete alumnoAFirestore.id;
      
      // grabamos en la base de datos
      await db.doc(`${uid}/grupo/alumnos/${alumno.id}`).update(alumnoAFirestore);


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






export const eliminarAlumno = (id)=>{
  return async(dispatch, getState)=>{

      const uid = getState().auth.uid;
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