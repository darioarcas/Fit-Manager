import { BrowserRouter, Route, Routes } from "react-router-dom"; // npm install react-router-dom
import { FitManagerApp } from "../FitManagerApp";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { LoginScreen } from "../components/login/LoginScreen";
import { useEffect, useState } from "react";
import { firebase } from '../firebase/firebase-config';
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { empezarCargaAlumnos} from "../actions/alumno";


export const AppRouter = () => {

    const dispatch = useDispatch();


    // El checking es para asegurarnos de no mostrar nada de nuestra pagina
    // hasta recibir la respuesta de firebase
    const [cheking, setCheking] = useState(true);

    // Con este state sabremos si el usuario esta logueado
    const [isLoggedIn, setIsLoggedIn] = useState(false);





    useEffect(() => {
        
        // Para mantener el inicio de sesion al recargar la pagina
        // corroboramos que el usuario esta autenticado
        firebase.auth().onAuthStateChanged(async (user)=>{
            
            // Si existe el id del usuario
            if (user?.uid){
                
                // Volvemos a cargar el usuario
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                
                // // Cargamos las notas del usuario
                // // llamamos a la accion y la enviamos al store
                dispatch(empezarCargaAlumnos(user.uid));

        }else{

            setIsLoggedIn(false);
        }
        });

        setCheking(false);

    }, [ dispatch, setCheking, setIsLoggedIn ]);




    // El cheking en true significa que aun no recibimos respuesta de firebase
    if(cheking){
        return (<h1>Espere...</h1>);
    }





  return (
    <div>
        
        {/* <BrowserRouter basename="/Fit-Manager"> */}
        <BrowserRouter>
            <Routes>

                <Route path="/Fit-Manager/login" element={
                    <PublicRoute isLoggedIn={isLoggedIn}>
                        <LoginScreen />
                    </PublicRoute>
                }/>

                <Route path="/Fit-Manager/*" element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <FitManagerApp />
                    </PrivateRoute>
                } />

            </Routes>
        </BrowserRouter>

    </div>
  )
}
