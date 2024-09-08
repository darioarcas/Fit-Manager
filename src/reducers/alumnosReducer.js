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

import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}



export const alumnosReducer = (state = initialState, action)=>{
    
    switch (action.type) {

        case types.alumnoActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }


        case types.alumnoLoad:
            return {
                ...state,
                notes: [...action.payload]
            }



        case types.alumnoAddNew:
            return{
                ...state,
                notes: [action.payload, ...state.notes]
            }



        case types.alumnoUpdate:
            return{
                ...state,
                notes: state.notes.map(
                    (alumno) => (alumno.id === action.payload.id)
                        ? action.payload.alumno
                        : alumno
                )
            }

        case types.cerrarFormulario:
            return {
                ...state,
                active: null
            }



        case types.alumnoDelete:
            return{
                ...state,
                active: null,
                // Devuelve todos los alumnos, exeptuando el que coincida con el id del payload
                notes: state.notes.filter(alumno => alumno.id !== action.payload)
            }




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