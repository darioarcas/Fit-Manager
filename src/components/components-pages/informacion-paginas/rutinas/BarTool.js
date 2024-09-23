





export const BarTool = ({
    selectorEjercicios,
    numeroEjercicios,
    activarEstaRutina,
    guardar,
    numeroSesionActiva,
    selectorSesiones,
    numeroSesiones,
    rutinas
}) => {



  return (
    <div className="text-white d-flex justify-content-between" style={{width:"90%"}}>
        
        
        <div>
            <p>EJERCICIOS</p>
            <select style={{border:"none", width:"100%"}} value={numeroEjercicios} onChange={(e)=>{selectorEjercicios(e.target.value)}}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
            </select>





        </div>





        <div>
            <p>SESIONES</p>
            <select style={{border:"none", width:"100%"}} value={numeroSesiones} onChange={(e)=>{selectorSesiones(e.target.value)}}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
            </select>
        </div>





        <div>
            <p>CARGAR RUTINA</p>
            <select style={{border:"none", width:"100%"}}>
                {Object.entries(rutinas).map(([clave, valor, index]) => (
                    <option key={index} value={valor.nombre}>
                    {valor.nombre}
                    </option>
                ))}
            </select>
        </div>
        
        
        
        
        <div style={{
                backgroundColor:"#59d9df",
                padding:"5px", width:"10%",
                border:"solid white 4px",
                borderRadius:"5px",
                height:"40%",
                cursor:"pointer",            

            }}
            onClick={activarEstaRutina}
        >
            <p style={{textAlign:"center", margin:"0 auto"}}>ACTIVAR RUTINA</p>
        </div>
        
        
        
        
        <div style={{
                backgroundColor:"#59d9df",
                padding:"5px", width:"10%",
                border:"solid white 4px",
                borderRadius:"5px",
                height:"40%",
                cursor:"pointer",            

            }}
            onClick={guardar}
        >
            <p style={{textAlign:"center", margin:"0 auto"}}>GUARDAR</p>
        </div>





        
    </div>
  )
}
