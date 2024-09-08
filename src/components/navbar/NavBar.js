import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { startLogout } from "../../actions/auth";

export const NavBar = () => {



    const dispatch = useDispatch();
    const userName = useSelector((state)=>{ return state.auth.name });

    const handleLogout = ()=>{
       dispatch(startLogout());
    }



    return (
        <div className="posicion-fija">
            <nav className="navbar bg-body-tertiary p-0">
                <div className="d-flex justify-content-center flex-column container-fluid vh-100 nav-bar">
                    <div>
                        <h3 className="navbar-brand mb-1 color-white">FIT Manager</h3>
                        <p className="navbar-brand mb-3 color-secundary">{userName}</p>
                    </div>
                    <nav className="container-fluid justify-content-center nav flex-column">
                        
                        <Link to="/" className="btn btn-outline-success me-2 mb-3">Inicio</Link>
                        <Link to="/perfil" className="btn btn-outline-success me-2 mb-3">Perfil</Link>
                        <Link to="/pago" className="btn btn-outline-success me-2 mb-3">Pago</Link>
                        <Link to="/dietas" className="btn btn-outline-success me-2 mb-3">Dietas</Link>
                        <Link to="/rutinas" className="btn btn-outline-success me-2 mb-3">Rutinas</Link>
                        <Link to="/calculadora" className="btn btn-outline-success me-2 mb-3">Calculadora</Link>
                        <Link to="/ajustes" className="btn btn-outline-success me-2 mb-3">Ajustes</Link>
                        <button onClick={()=>{handleLogout()}} className="btn btn-outline-success me-2 mb-3">Cerrar Sesion</button>
                    </nav>
                </div>
            </nav>
        </div>
    )
}



// la clase "active" selecciona la pestaña en la que se llamo a la clase "active" 

{/* <NavLink 
    className={({isActive})=>"nav-item nav-link " + (isActive ? "active" : "")} 
    to="/marvel"
>
    Marvel
</NavLink> */}