import {Link} from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';

export const LoginScreen = () => {

  const dispatch = useDispatch();

  const loading = useSelector((store)=>{ return store.ui.loading });


  const [formValues, handleInputChange, reset] = useForm({
    email: '',
    password: ''
  });

  const {email, password} = formValues;


  const handleLogin = (e)=>{
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  }


  const handleGoogleLogin = ()=>{
    dispatch(startGoogleLogin());
  }


  return (
    <div className='container-fluid vh-100 d-flex justify-content-center align-items-center'>

        < div style={{width: 300}} className='p-3 mb-2 bg-light-subtle text-info-emphasis form-control border-info'>
            <h3 className='auth__title'>Login</h3>
            <form onSubmit={(e)=>{return handleLogin(e)}}>
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className='form-control mb-3'
                    value={ email }
                    onChange={ handleInputChange }
                />
                
                <input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    className='form-control mb-3'
                    value={ password }
                    onChange={ handleInputChange }
                />

                <button 
                type="submit" 
                className='btn btn-primary w-100 mb-3'
                disabled={loading}
                >
                Login
                </button>

                <div className='d-flex flex-column justify-content-center'>

                <p>Ingresar con Google</p>

                <div
                    className="google-btn" 
                    onClick={()=>{return handleGoogleLogin()}}
                >

                    
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                    </div>
                    <p className="btn-text">
                        <b>Sign in with google</b>
                    </p>
                </div>
                </div>

                <Link to='/auth/register' className='link'>Crear una cuenta</Link>


            </form>
        </ div>
    </div>
  )
}