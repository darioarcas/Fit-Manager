import { alimentos } from "./arreglos"
import { CalorieCalculator } from "./CalculadorCalorias";








export const CalculadoraDieta = ({proteinasHijo, carbohidratosHijo, grasasHijo, caloriasHijo}) => {


  return (
    <div>
      {/*  translate-middle colocar en className si se quiere centrar, estaba en position absolute*/}
      <div style={{width: "97%", height: "20%", position:"fixed", opacity:"90%", color:"white"}} className="offcanvas offcanvas-start shadow-lg top-50 start-0 rounded bg-dark" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header py-2">
            <h5 className="offcanvas-title p-0 fs-6" id="offcanvasScrollingLabel">Calcular Alimentos</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>



        {/* CALCULADORA */}
        <div className="offcanvas-body p-0">
            <CalorieCalculator  proteinasHijo = {proteinasHijo} carbohidratosHijo = {carbohidratosHijo} grasasHijo = {grasasHijo} caloriasHijo = {caloriasHijo}  />
        </div>

      </div>



    </div>
  )
}
