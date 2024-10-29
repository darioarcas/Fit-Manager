import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { startLogout } from "../../actions/auth";
// import { SassColor } from "sass";

export const NavBar = () => {



    const dispatch = useDispatch();
    const userName = useSelector((state)=>{ return state.auth.name });

    const handleLogout = ()=>{
       dispatch(startLogout());
    }



    return (
        <div className="posicion-fija w-100vw">


                {/* BOTON MENU */}
                <button className="navbar nav-bar-dark bg-black opacity-50 navbar-toggler position-fixed top-0 start-0 m-3 mt-4 z-3"   type="button" data-bs-target="#offcanvasNavbar" data-bs-toggle="offcanvas">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="offcanvas offcanvas-start text-bg-dark w-20-porciento" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                   
                    <nav className="navbar bg-body-tertiary p-0">

                        <div className="d-flex justify-content-center container-fluid vh-100 nav-bar ">

                            <div className="w-100">
                                <h2 className="mb-1 color-white tamaño2">FIT Manager</h2>
                                <p className="mb-3 color-secundary tamaño2">{userName}</p>
                            </div>
                            <nav className="nav flex-column w-100" data-bs-dismiss="offcanvas">
                                
                                <Link to="/" className="btn btn-outline-success me-2 mb-3 tamaño" >Alumno</Link>
                                {/* <Link to="/perfil" className="btn btn-outline-success me-2 mb-3 tamaño" >Perfil</Link> */}
                                {/* <Link to="/pago" type="button" className="btn btn-outline-success me-2 mb-3 tamaño" >Pago</Link> */}
                                <Link to="/dietas" className="btn btn-outline-success me-2 mb-3 tamaño" >Dietas</Link>
                                <Link to="/rutinas" className="btn btn-outline-success me-2 mb-3 tamaño" >Rutinas</Link>
                                {/* <Link to="/calculadora" className="btn btn-outline-success me-2 mb-3 tamaño" >Calculadora</Link> */}
                                {/* <Link to="/ajustes" className="btn btn-outline-success me-2 mb-3 tamaño" >Ajustes</Link> */}
                                <button onClick={()=>{handleLogout()}} className="btn btn-outline-success me-2 mb-3 tamaño" >Cerrar Sesion</button>
                            </nav>
                        </div>
                    </nav>
                </div>

         </div>
    )
}

