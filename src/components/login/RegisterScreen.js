import {Link} from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
// import validator from "validator";
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { starRegisterEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {


  const msgError = useSelector((state) =>{ return state.ui.msgError });
  console.log(msgError);

  const dispatch = useDispatch();


  const [formValues, handleInputChange] = useForm({
    name: 'Tu Nombre',
    email: 'Tu Email',
    password1: '',
    password2: ''
  });

  const {name, email, password1, password2} = formValues;




  const handleRegister = (e)=>{
    e.preventDefault();
    if(isFormValid()){
      dispatch(starRegisterEmailPasswordName(email, password1, name));
    }
  }

  const isFormValid = ()=>{


    if(name.trim().length === 0){
      dispatch(setError("Nombre no valido"));
      return false;
    }
    // else if(!validator.isEmail(email)){
    //   dispatch(setError("El Email no es Valido"));
    //   return false;
    // }
    else if (password1 !== password2 || password1.length <= 5 || password2.length === 0){
      dispatch(setError("La contraseña no es Valida o es menor a 6 caracteres"));
      return false;
    }

    dispatch(removeError());
    return true;
    
  }



  return (
    <>
      <h3 className='auth__title'>Register</h3>
      <form>

        {
          msgError &&
          (<div className='auth__alert-error'>{msgError}</div>)
        }



        <input
          type="name"
          placeholder="Nombre"
          name="name"
          className='auth__input'
          // value = {name}
          onChange={(e)=>{return handleInputChange(e)}}
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          className='auth__input'
          // value = {email}
          onChange={(e)=>{return handleInputChange(e)}}
        />
        
        <input
          type="password"
          placeholder="Contraseña"
          name="password1"
          className='auth__input'
          // value = {password1}
          onChange={(e)=>{return handleInputChange(e)}}
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          name="password2"
          className='auth__input'
          // value = {password2}
          onChange={(e)=>{return handleInputChange(e)}}
        />

        <button
          type="submit" 
          className='btn btn-primary btn-block mb-5'
          onClick={(e)=>{return handleRegister(e)}}         
        >
          Registrarse
        </button>

        <Link to='/auth/login' className='link'>Crear una cuenta</Link>


      </form>
    </>
  )
}
