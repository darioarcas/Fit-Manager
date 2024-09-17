





export const BarTool = ({botonAgregar, botonQuitar, numeroRutinas}) => {
  return (
    <div className="text-white d-flex" style={{width:"90%"}}>
        
        
        <div style={{paddingRight:"3%"}}>
            <p>EJERCICIOS</p>
            {/* <select style={{border:"none", width:"100%"}}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
            </select> */}

            <div className="d-flex" style={{justifyContent:"space-between"}}>
                <div style={{paddingRight:"5px", fontWeight:"bold"}} onClick={botonAgregar}>
                    <h3>+</h3>
                </div>
                <p className="m-0 fs-5">{numeroRutinas}</p>
                <div style={{paddingLeft:"8px", fontWeight:"bold"}} onClick={botonQuitar}>
                    <h3>-</h3>
                </div>
            </div>

        </div>
        <div style={{paddingRight:"3%"}}>
            <p>SESIONES</p>
            <select style={{border:"none", width:"100%"}}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
            </select>
        </div>
        <div style={{paddingRight:"3%"}}>
            <p>CARGAR RUTINA</p>
            <select style={{border:"none", width:"100%"}}>
                <option></option>
            </select>
        </div>

        
    </div>
  )
}
