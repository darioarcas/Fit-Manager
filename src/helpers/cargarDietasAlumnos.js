// import { useSelector } from "react-redux";
import { db } from "../firebase/firebase-config"






export const cargarDietasAlumnos = async (uid, id, dietaId)=>{
    // id probado: 1kwKzuRVFbSJlb1BTeuq
    const dietasSnap = await db.collection(`${uid}/grupo/alumnos/${id}/dieta`).get();

    const notes = [];

    dietasSnap.forEach((snapHijo) =>{
        notes.push({
            id: dietaId,
            ...snapHijo.data()
        });
    });
    
    

    // console.log("LA DIETAAAAAAAAAAAAAAAAA:  ",notes[0]);
    

    return notes;
}