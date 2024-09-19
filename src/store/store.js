import {applyMiddleware, configureStore} from '@reduxjs/toolkit';// instalar 'npm install @reduxjs/toolkit'
import {thunk} from 'redux-thunk';//instalar 'npm install redux-thunk'
import { alumnosReducer } from '../reducers/alumnosReducer';
import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { dietasReducer } from '../reducers/dietasReducer';
import { rutinasReducer } from '../reducers/rutinasReducer';



export const store = configureStore({
    reducer: {
      //   laDescripcionDelNombre: algunReducer
      dietas: dietasReducer,
      ui: uiReducer,
      auth: authReducer,
      alumnos: alumnosReducer,
      rutinas: rutinasReducer,
    }
  }, applyMiddleware(thunk));










  // NOTA:
  //   Utilizamos thunk para realizar peticiones a bases de datos o acciones asincronas,
  //   de esta forma por medio de thunk podemos llamar al dispatch en el argumento de un callback
  //   en un return de una funcion