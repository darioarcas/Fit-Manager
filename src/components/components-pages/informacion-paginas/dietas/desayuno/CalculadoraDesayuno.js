import { CalorieCalculator } from "./CalculadorCalorias";







export const CalculadoraDesayuno = ({sumatoriaTotal, setCalculadoraDesayuno, valorCalorias, actualizarFormulario, setCambioEnCalculadora}) => {


  return (
    <div className="">
      {/*  translate-middle colocar en className si se quiere centrar, estaba en position absolute top-50 start-0*/}
      <div style={{width: "100%", height: "43%", opacity:"90%", position:"fixed", top: "35%", left: "0%", color:"white"}} className="offcanvas offcanvas-start shadow-lg rounded bg-dark" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="desayuno" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header py-2 d-flex">
          <div className="d-flex justify-content-between w-85">
            <h1 className="offcanvas-title p-0 fs-6" id="offcanvasScrollingLabel">Desayuno</h1>
            <div className="pl-5 color-success">
            <p >{valorCalorias.desayuno}</p>
            </div>
          </div>         
            <button type="button" className="btn-close p-0" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>



        {/* CALCULADORA */}
        <div className="offcanvas-body p-0">
            <CalorieCalculator 
              sumatoriaTotal={sumatoriaTotal} 
              setCalculadoraDesayuno={setCalculadoraDesayuno} 
              actualizarFormulario={actualizarFormulario} 
              setCambioEnCalculadora={setCambioEnCalculadora}
            />
        </div>

      </div>



    </div>
  )
}
