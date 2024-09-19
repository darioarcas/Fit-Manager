import { types } from "../types/types";


// Rutinas
const initialState = {
    rutina1:{
        id:"",
        nombre:"Nombre rutina",
        sesion1:{
            ejercicio1:{
                ejercicio: "",
                img: "",
                video: "",
                pausa: "",
                ejecucion: ""
            }
        },
        sesion2:{},
        sesion3:{},
        sesion4:{},
        sesion5:{},
        sesion6:{},
        sesion7:{},
    },
    active:{
        rutina:{
            id:"",
            nombre:"Nombre rutina Activa",
            sesion1:{
                ejercicio1:{
                    ejercicio: "",
                    img: "",
                    video: "",
                    pausa: "",
                    ejecucion: ""
                }
            },
            sesion2:{},
            sesion3:{},
            sesion4:{},
            sesion5:{},
            sesion6:{},
            sesion7:{},
        }
    }
}



export const rutinasReducer = (state=initialState, action) => {
    



    switch (action.type) {
        



        case types.rutinaActive:

            return action.payload;
                
            
    








        default:
            return state;
    }
}






























// // Rutinas
// const initialState = [
//     {
//         rutina1:{
//             sesion:[
//                 {
//                     ejercicio: "Pepito",
//                     img: "",
//                     video: "",
//                     pausa: "",
//                     ejecucion: ""
//                 },                
//             ],
//             nombre: ""
//         },
//         rutina2:{sesion:[], nombre:""},
//         rutina3:{sesion:[], nombre:""},
//         rutina4:{sesion:[], nombre:""},
//         rutina5:{sesion:[], nombre:""},
//         rutina6:{sesion:[], nombre:""},
//         rutina7:{sesion:[], nombre:""},

        

//         active:{
//             rutina:{
//                 sesion:[
//                     {
//                         ejercicio: "",
//                         img: "",
//                         video: "",
//                         pausa: "",
//                         ejecucion: ""
//                     },
//                 ],
//                 nombre: ""
//             }
//         }
//     }
// ];
















// case types.rutinaActive:

//             return state.map((rutina, index)=>{
                
//                 const nuevaRutina = Object.entries(rutina).map(([clave, sesionNombre]) => {
//                     if(clave === "active"){
//                         console.log("sesionNombre.rutina", sesionNombre.rutina);
//                         if(Object.keys(sesionNombre.rutina).length > 1){
//                             const objetoExistente = sesionNombre.rutina.sesion;
//                             return {
//                                 active:{
//                                     rutina:{
                                        
//                                         sesion22:[
//                                             action.payload.rutina,
//                                         ],
//                                         nombre: ""
//                                     }
//                                 }
//                             }
//                         }
//                         return {
//                             active:{
//                                 rutina:{
//                                     sesion22:[
//                                         action.payload.rutina,
//                                     ],
//                                     nombre: ""
//                                 }
//                             }
//                         }
//                     }

//                     return sesionNombre;
                    
//                 });

//                 console.log("NUEVA RUTINA: ", nuevaRutina);
//                 console.log("RUTINA: ", rutina);
//                 return rutina;
//             })