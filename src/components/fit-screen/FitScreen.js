import { Route, Routes } from "react-router-dom"
import { Inicio } from "../components-pages/Inicio"
import { Perfil } from "../components-pages/Perfil"
import { Pago } from "../components-pages/Pago"
import { Dietas } from "../components-pages/Dietas"
import { Rutinas } from "../components-pages/Rutinas"
import { Calculadora } from "../components-pages/Calculadora"
import { Ajustes } from "../components-pages/Ajustes"


export const FitScreen = () => {
  return (
    <div className="feet-screen">


        {/* Ruteo de paginas */}
        <Routes>
            <Route path="/" element={<Inicio />}/>
            <Route path="/perfil" element={<Perfil />}/>
            <Route path="/pago" element={<Pago />}/>
            <Route path="/dietas" element={<Dietas />}/>
            <Route path="/rutinas" element={<Rutinas />}/>
            <Route path="/calculadora" element={<Calculadora />}/>
            <Route path="/ajustes" element={<Ajustes />}/>


            <Route path="/*" element={<Inicio />}/>
        </Routes>


    </div>
  )
}
