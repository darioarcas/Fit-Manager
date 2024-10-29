// import {Link} from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';

export const LoginScreen = () => {

  const dispatch = useDispatch();

  const loading = useSelector((store)=>{ return store.ui.loading });


  const [formValues, handleInputChange] = useForm({
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

  const loginAnonymously = ()=>{
    dispatch(startLoginEmailPassword("anonimo@anonimo.com", "123456"));
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

                <div className='d-flex flex-column justify-content-center mb-3'>

                <p className='m-0 p-0'>Ingresar con Google</p>

                <div
                    className="google-btn d-flex" 
                    onClick={()=>{return handleGoogleLogin()}}
                >

                    
                    <div className="google-icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>

                    </div>
                    <p className="btn-text" style={{padding:"auto auto auto 0", margin:"auto auto auto 0"}}>
                        <b >Sign in with google</b>
                    </p>
                </div>
                </div>

                {/* <Link to='/auth/register' className='link'>Crear una cuenta</Link> */}

                <div className='btn btn-outline-secondary' onClick={loginAnonymously}>
                  <h6>Ingresar como Anómimo</h6>
                </div>


            </form>
        </ div>
    </div>
  )
}