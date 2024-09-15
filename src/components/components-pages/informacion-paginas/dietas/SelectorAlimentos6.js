import { alimentos } from './arreglos';
import { useState } from 'react';



export const SelectorAlimentos6 = ({setAlimentos6, setearAlimentos}) => {


  const [seleccionado, setSeleccionado] = useState(alimentos[0]);
  const [cantidad, setCantidad] = useState(0);




  const handleSelectChange = (e) => {
    // Devuelve el primer elemento del array que cumple con la condición
    const alimentoSeleccionado = alimentos.find(a => a.nombre === e.target.value);
    setSeleccionado(alimentoSeleccionado);
    setCantidad(0); // Reiniciar la cantidad al cambiar el alimento
  };






  const handleInputChange = (e) => {

    setCantidad(e.target.value);

    const factor = e.target.value / seleccionado.cantidad;

    const dietaValores = {
      calorias: (seleccionado.calorias * factor).toFixed(2),
      proteinas: (seleccionado.proteinas * factor).toFixed(2),
      carbohidratos: (seleccionado.carbohidratos * factor).toFixed(2),
      grasas: (seleccionado.grasas * factor).toFixed(2),
    };

    setAlimentos6(dietaValores);
    setearAlimentos(dietaValores, 6);

  };





  return (
    <div>
        
      {/* ALIMENTO */}
      <div className="d-flex flex-row" >
        <div className="d-flex flex-column" style={{width: "30%"}}>
          <select select="Claras de Huevo (40gr)" id="alimento" onChange={handleSelectChange} value={seleccionado.nombre} className="me-2 fs-6 bg-dark rounded" style={{height:"30px", color:"white"}}>
            {alimentos.map((alimento) => (
              <option key={alimento.nombre} value={alimento.nombre}>
                {alimento.nombre}
              </option>
            ))}
          </select>
        </div>


        {/* CANTIDAD */}
        <div className="d-flex flex-column" style={{width: "30%"}}>
          <div className='d-flex flex-row'>
            <input
                style={{width: "60%", height:"30px", color:"white"}}
                type="number"
                id="cantidad"
                value={cantidad}
                onChange={handleInputChange}
                min="0"
                className="fs-6 bg-dark rounded"
            />
            <p>
                ({seleccionado.unidad})
            </p>
          </div>
        </div>


        {/* KCal P C G */}
        <div className="d-flex">
            <div className="d-flex flex-column justify-content-center">
                <p style={{height:"30px", marginBottom:"0px", marginTop:"10px"}}>{(((seleccionado.calorias * (cantidad / seleccionado.cantidad)))/100).toFixed(2)}</p>
            </div>

            <div className="d-flex flex-column justify-content-center" >
                <p style={{height:"30px", marginBottom:"0px", marginTop:"10px"}} name="proteinas" value={(seleccionado.proteinas * (cantidad / seleccionado.cantidad)).toFixed(2)}>{(seleccionado.proteinas * (cantidad / seleccionado.cantidad)).toFixed(2)}g</p>
            </div>

            <div className="d-flex flex-column justify-content-center">
                <p style={{height:"30px", marginBottom:"0px", marginTop:"10px"}}>{(seleccionado.carbohidratos * (cantidad / seleccionado.cantidad)).toFixed(2)}g</p>
            </div>

            <div className="d-flex flex-column justify-content-center">
                <p style={{height:"30px", marginBottom:"0px", marginTop:"10px"}}>{(seleccionado.grasas * (cantidad / seleccionado.cantidad)).toFixed(2)}g</p>
            </div>
        </div>


      </div>
    </div>
  )
}
