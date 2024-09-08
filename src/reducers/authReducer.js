import { types } from "../types/types";

/*
    {
        uid: '384753098470945',
        name: 'Dario'
    }
*/



export const authReducer = (state={auth: 123}, action)=>{


    switch (action.type) {
        case types.login:
            
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            };
        
        case types.logout:
            
            return {};

        default:
            return state;
    }
}