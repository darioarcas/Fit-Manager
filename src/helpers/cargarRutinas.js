import { db } from "../firebase/firebase-config"





export const cargarRutinas = async (uid)=>{
    const rutinasSnap = await db.collection(`${uid}/rutinas-usuario/rutina`).get();

    const notes = [];

    rutinasSnap.forEach((snapHijo) =>{
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        });
    });
    

    return notes;
}