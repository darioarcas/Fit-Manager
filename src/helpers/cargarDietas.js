import { db } from "../firebase/firebase-config"





export const cargarDietas = async (uid)=>{
    const dietasSnap = await db.collection(`${uid}/dietas-usuario/dieta`).get();

    const notes = [];

    dietasSnap.forEach((snapHijo) =>{
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        });
    });
    
    

    // console.log(notes);
    

    return notes;
}