





export const BarTool = ({
    botonAgregar,
    botonQuitar,
    numeroEjercicios,
    activarEstaRutina,
    guardar,
    numeroSesionActiva
}) => {



  return (
    <div className="text-white d-flex justify-content-between" style={{width:"90%"}}>
        
        
        <div>
            <p>EJERCICIOS</p>
            <select style={{border:"none", width:"100%"}} value={numeroEjercicios} onChange={(e)=>{botonAgregar(e.target.value)}}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
            </select>





{/* 

            <div className="d-flex" style={{justifyContent:"space-between"}}>
                <div 
                    style={{
                        fontWeight:"bold",
                        backgroundColor:"white",
                        borderRadius:"5px",
                        color:"black",
                        margin:"0px 0px",
                        padding:"0px 5px",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center"                   
                    }} 
                    onClick={botonAgregar}
                >
                    <h3 className="p-0 m-0">+</h3>
                </div>
                <p 
                    className="m-0 fs-6"
                    style={{
                        fontWeight:"bold",
                        backgroundColor:"white",
                        borderRadius:"5px",
                        color:"black",
                        margin:"0px 0px",
                        padding:"0px 4px",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center"                   
                    }} 
                >
                    {numeroEjercicios}                    
                </p>
                <div 
                    style={{
                        fontWeight:"bold",
                        backgroundColor:"white",
                        borderRadius:"5px",
                        color:"black",
                        margin:"0px 0px",
                        padding:"0px 8px",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center"                   
                    }} 
                    onClick={botonQuitar}
                >
                    <h3 className="p-0 m-0">-</h3>
                </div>
            </div> */}



        </div>





        <div>
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





        <div>
            <p>CARGAR RUTINA</p>
            <select style={{border:"none", width:"100%"}}>
                <option></option>
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
