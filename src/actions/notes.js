import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

// react-journal
// https://api.cloudinary.com/v1_1/dzdhg0oe7/image/upload





export const startNewNote = ()=>{
    return async(dispatch, getState)=>{
        const uid = getState().auth.uid;

        const newNote = {
            title: '',
            body:'',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

        dispatch(activeNote(doc.id, newNote));

        dispatch(addNewNote(doc.id, newNote));
    }
}


export const activeNote = (id, note)=>{
    return {
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    }
}


export const addNewNote = (id, note)=>{
    return {
        type: types.notesAddNew,
        payload:{
            id,
            ...note
        }
    }
}


export const startLoadingNotes = (uid)=>{
    return async(dispatch)=>{

        // Cargamos las notas del usuario
        const notes = await loadNotes(uid);
        // llamamos a la accion y la enviamos al store
        dispatch(setNotes(notes));
    }
}


export const setNotes = (notes)=>{
    return {
        type: types.notesLoad,
        payload: [...notes]
    }
}


export const startSaveNote = (note)=>{

    // utilizamos el midleware
    return async (dispatch, getState)=>{


        const uid = getState().auth.uid;

        // si el url de la imagen no existe, lo borramos
        if(!note.url){
            delete note.url;
        }

        // creamos una copia de la nota para eliminar el id
        const noteToFirestore = {...note};
        // eliminamos el id
        delete noteToFirestore.id;
        
        // grabamos en la base de datos
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);


        // Actualizamos la nota en el store
        dispatch(refreshNote(note.id, note));
        // dispatch(startLoadingNotes(uid));

        // Swal.fire('Guardado', note.title, 'success');
        Swal.fire({
            title: 'Guardado',
            timer: 800,
            icon: 'success'
        });
    }
}



export const refreshNote = (id, note)=>{
    return {
        type: types.notesUpdate,
        payload: {
            id,
            note
        }

    }
}



export const startUploading = (file)=>{

    return async (dispatch, getState)=>{

        const {active:activeNote} = getState().notes;

        Swal.fire({
            title: 'Subiendo...',
            text: 'Por favor aguarde...',
            allowOutsideClick: false,
            // onBeforeOpen: ()=>{
            //     Swal.showLoading();
            // }
        });

        const fileUrl = await fileUpload(file);

        // construimos una nueva nota, para no alterar la nota del store y que lance un error
        const notaActiva = {...activeNote};
        // colocamos el nuevo url
        notaActiva.url = fileUrl;

        dispatch(startSaveNote(notaActiva));

        Swal.close();
    }
}




export const startDeleting = (id)=>{
    return async(dispatch, getState)=>{

        const uid = getState().auth.uid;
        await db.doc(`${uid}/journal/notes/${id}`).delete();

        Swal.fire({
            title: 'Eliminado Correctamente',
            timer: 800,
            icon: 'success'
        });
        dispatch(deleteNote(id));
    }
}


export const deleteNote = (id)=>{
    return {
        type: types.notesDelete,
        payload: id
    }
}




export const noteLogout = ()=>{
    return {
        type: types.notesLogoutCleaning
    }
}