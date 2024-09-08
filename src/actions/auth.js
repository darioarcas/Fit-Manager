import Swal from 'sweetalert2'; // npm install sweetalert2
import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { finishLoading, startLoading } from "./ui";
import { cerrarSesionAlumno } from './alumno';
// import { noteLogout } from './notes';



export const startLoginEmailPassword = (email, password)=>{
    


    return (dispatch)=>{
        // comienza el logueo y bloqueamos el boton
        // para evitar que se presione varias veces
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async({user})=>{
                
                // De esta forma podemos actualizar el nombre
                // await user.updateProfile({displayName: 'Juancito'});

                dispatch(login(user.uid, user.displayName));

                dispatch(finishLoading());
                
            }).catch((err)=>{
                    console.log(err);

                    // Finaliza el logueo del usuario
                    dispatch(finishLoading());

                    Swal.fire('Error','Credenciales invalidas', 'error');
                });
            
    }
}



export const starRegisterEmailPasswordName = (email, password, name)=>{
    return (dispatch)=>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async({user})=>{

                await user.updateProfile({displayName: name});

                dispatch(login(user.uid, user.displayName));
            }).catch((err)=>{console.log(err);});

    }
}





export const startGoogleLogin = ()=>{
    return (dispatch)=>{
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) =>{
                dispatch(login(user.uid, user.displayName))
            })
    }
}




export const login = (uid, displayName)=>{
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}




export const startLogout = ()=>{

    // se hace la consulta a firebase
    return async(dispatch)=>{
        await firebase.auth().signOut();

        // Se desloguea, reiniciando el arreglo
        dispatch(cerrarSesionAlumno());
        dispatch(logout());
    }
}


export const logout = ()=>{
    return {
        type: types.logout
    }
}