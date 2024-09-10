import { db } from "../firebase/firebase-config"





export const cargarAlumnos = async (uid)=>{
    const alumnosSnap = await db.collection(`${uid}/grupo/alumnos`).get();

    const notes = [];

    alumnosSnap.forEach((snapHijo) =>{
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        });
    });
    
    

    // console.log(notes);
    

    return notes;
}