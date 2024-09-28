import { db } from "../firebase/firebase-config"





export const cargarDietasAlumnos = async (uid)=>{
    const dietasSnap = await db.collection(`${uid}/grupo/alumnos/1kwKzuRVFbSJlb1BTeuq/dieta`).get();

    const notes = [];

    dietasSnap.forEach((snapHijo) =>{
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        });
    });
    
    

    // console.log("LA DIETAAAAAAAAAAAAAAAAA:  ",notes[0]);
    

    return notes;
}