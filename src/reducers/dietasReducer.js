import { types } from "../types/types";



// const init = [];

const init = {
    dietas: [],
    active: {id: ''}
}

export const dietasReducer = (state = init, action) => {
  


    switch (action.type) {




        case types.dietaNew:
            
            return {
                ...state,
                dietas: [...state.dietas, action.payload]
            }
        
                
        
        
        
        
        
        case types.dietaLoad:
            
            return {
                ...state,
                dietas: [...action.payload]
            }
    





        // Dieta Activa
        case types.dietaActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }




        // Se cierra el formulario, el alumno ya no es el activo en el store
        case types.dietaCerrarFormulario:
            return {
                ...state,
                active: {}
            }






        // Se elimina una Dieta
        case types.dietaDelete:
            return{
                ...state,
                active: {},
                // Devuelve todos los alumnos, exeptuando el que coincida con el id del payload
                dietas: state.dietas.filter(dieta => dieta.id !== action.payload)
            }










        // Se modifica un alumno
        case types.dietaUpdate:
            return{
                ...state,
                dietas: state.dietas.map(
                    (dieta) => (dieta.id === action.payload.id)
                        ? action.payload.dieta
                        : dieta
                    )
            }


        case types.dietaProteinaActualizar:
            return{
                ...state,
                active: {
                    ...state.active,
                    ...action.payload.dietaValores
                }
            }

            
        default:
            return state;
    }
}
