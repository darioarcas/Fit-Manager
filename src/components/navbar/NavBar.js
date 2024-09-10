import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { startLogout } from "../../actions/auth";
import { SassColor } from "sass";

export const NavBar = () => {



    const dispatch = useDispatch();
    const userName = useSelector((state)=>{ return state.auth.name });

    const handleLogout = ()=>{
       dispatch(startLogout());
    }



    return (
        <div className="posicion-fija">

            {/* <nav className="navbar bg-body-tertiary w-2"> */}

            {/* <div className="container-fluid"> */}

                <button className="navbar nav-bar-dark bg-black opacity-50 navbar-toggler position-absolute position-fixed top-0 start-0 m-3"   type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>


                <div className="offcanvas offcanvas-start text-bg-dark w-20-porciento" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                   
                    <nav className="navbar bg-body-tertiary p-0">

                        <div className="d-flex justify-content-center container-fluid vh-100 nav-bar ">

                            <div className="w-100">
                                <h2 className="mb-1 color-white tamaño2">FIT Manager</h2>
                                <p className="mb-3 color-secundary tamaño2">{userName}</p>
                            </div>
                            <nav className="nav flex-column w-100" data-bs-dismiss="offcanvas">
                                
                                <Link to="/" className="btn btn-outline-success me-2 mb-3 tamaño" >Alumno</Link>
                                <Link to="/perfil" className="btn btn-outline-success me-2 mb-3 tamaño" >Perfil</Link>
                                <Link to="/pago" type="button" className="btn btn-outline-success me-2 mb-3 tamaño" >Pago</Link>
                                <Link to="/dietas" className="btn btn-outline-success me-2 mb-3 tamaño" >Dietas</Link>
                                <Link to="/rutinas" className="btn btn-outline-success me-2 mb-3 tamaño" >Rutinas</Link>
                                <Link to="/calculadora" className="btn btn-outline-success me-2 mb-3 tamaño" >Calculadora</Link>
                                <Link to="/ajustes" className="btn btn-outline-success me-2 mb-3 tamaño" >Ajustes</Link>
                                <button onClick={()=>{handleLogout()}} className="btn btn-outline-success me-2 mb-3 tamaño" >Cerrar Sesion</button>
                            </nav>
                        </div>
                    </nav>
                </div>
            {/* </div> */}
            {/* </nav> */}


















         </div>
    )
}


            {/* <nav className="navbar bg-body-tertiary p-0">
                <div className="d-flex justify-content-center flex-column container-fluid vh-100 nav-bar">
                    <div>
                        <h3 className="navbar-brand mb-1 color-white">FIT Manager</h3>
                        <p className="navbar-brand mb-3 color-secundary">{userName}</p>
                    </div>
                    <nav className="container-fluid justify-content-center nav flex-column">
                        
                        <Link to="/" className="btn btn-outline-success me-2 mb-3">Alumno</Link>
                        <Link to="/perfil" className="btn btn-outline-success me-2 mb-3">Perfil</Link>
                        <Link to="/pago" className="btn btn-outline-success me-2 mb-3">Pago</Link>
                        <Link to="/dietas" className="btn btn-outline-success me-2 mb-3">Dietas</Link>
                        <Link to="/rutinas" className="btn btn-outline-success me-2 mb-3">Rutinas</Link>
                        <Link to="/calculadora" className="btn btn-outline-success me-2 mb-3">Calculadora</Link>
                        <Link to="/ajustes" className="btn btn-outline-success me-2 mb-3">Ajustes</Link>
                        <button onClick={()=>{handleLogout()}} className="btn btn-outline-success me-2 mb-3">Cerrar Sesion</button>
                    </nav>
                </div>
            </nav> */}

// la clase "active" selecciona la pestaña en la que se llamo a la clase "active" 

{/* <NavLink 
    className={({isActive})=>"nav-item nav-link " + (isActive ? "active" : "")} 
    to="/marvel"
>
    Marvel
</NavLink> */}