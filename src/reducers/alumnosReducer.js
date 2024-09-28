import { types } from "../types/types";
/*

    {
        notes: [],
        active: null, // cuando no hay ningun alumno
        active: {
            id: 'AS3554F545GDF4',
            nombre: '',
            pais: '',
            celular: '',
            ficha: '',
            plan: '',
            costo: '',
            fecha-inicio: 5456456,
            fecha-final: 456456456
        }
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






const initialState = {
    notes: [],
    active: {
        dieta: [dietaInit]
    }
}



export const alumnosReducer = (state = initialState, action)=>{
    
    switch (action.type) {
        // Alumno Activo
        case types.alumnoActive:
            return {
                ...state,
                active: {
                    ...state.active,
                    ...action.payload
                }
            }

        
            
        
        // Se cargan los alumnos desde el action al store
        case types.alumnoLoad:
            return {
                ...state,
                notes: [...action.payload]
            }

        case types.dietaAlumnoLoad:
            return{
                ...state,
                active: {...state.active, dieta:action.payload}
            }



        // Se guarda un nuevo alumno
        case types.alumnoAddNew:
            return{
                ...state,
                notes: [action.payload, ...state.notes]
            }






        // Se modifica un alumno
        case types.alumnoUpdate:
            return{
                ...state,
                notes: state.notes.map(
                    (alumno) => (alumno.id === action.payload.id)
                        ? action.payload.alumno
                        : alumno
                    )
            }
                
                
                
                
                
        // Se elimina un alumno
        case types.alumnoDelete:
            return{
                ...state,
                active: null,
                // Devuelve todos los alumnos, exeptuando el que coincida con el id del payload
                notes: state.notes.filter(alumno => alumno.id !== action.payload)
            }
    


    
    
        // Se cierra el formulario, el alumno ya no es el activo en el store
        case types.cerrarFormulario:
            return {
                ...state,
                active: null
            }
                    
                    
                    
                    

        // Se borran los datos del store cuando se cierra sesion
        case types.alumnoLogoutCleaning:
            return{
                ...state,
                active: null,
                notes: []
            }

        default:
            return state;
    }
}