import { CalorieCalculator } from "./CalculadorCalorias";








export const CalculadoraCena = ({sumatoriaTotal, setCalculadoraCena, valorCalorias, actualizarFormulario, setCambioEnCalculadora}) => {


  return (
    <div className="">
      {/*  translate-middle colocar en className si se quiere centrar, estaba en position absolute top-50 start-0*/}
      <div style={{width: "97%", height: "45%", opacity:"90%", position:"fixed", top: "35%", left: "0%", color:"white"}} className="offcanvas offcanvas-start shadow-lg rounded bg-dark" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="cena" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header py-2">
            <h5 className="offcanvas-title p-0 fs-6" id="offcanvasScrollingLabel">Cena   {valorCalorias.cena} </h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>



        {/* CALCULADORA */}
        <div className="offcanvas-body p-0">
            <CalorieCalculator
              sumatoriaTotal={sumatoriaTotal} 
              setCalculadoraCena={setCalculadoraCena}
              actualizarFormulario={actualizarFormulario}
              setCambioEnCalculadora={setCambioEnCalculadora}
            />
        </div>

      </div>



    </div>
  )
}
