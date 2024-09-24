





export const BarTool = ({
    selectorEjercicios,
    numeroEjercicios,
    activarEstaRutina,
    guardar,
    numeroSesionActiva,
    selectorSesiones,
    numeroSesiones,
    rutinas,
    selectorRutinas,
    nombreRutina,
    setNombreRutina,
    setRutinaActiva,
    rutinaActiva,
    actualizarRutina,
    eliminarRutina
}) => {




    const handleNameChange = (e)=>{
        setNombreRutina(e.target.value);
        console.log("Nombre: ", e.target.value);
        setRutinaActiva(prevActiva=>({...prevActiva, nombre: e.target.value}));
    }



  return (
    <div className="text-white d-flex flex-column " style={{width:"100%"}}>
        
        <div style={{display:"block"}} className="d-flex justify-content-between mb-4">

            <div style={{width:"29%"}}>
                <p className="mb-0">EJERCICIOS</p>
                <select style={{border:"none",borderRadius:"5px", backgroundColor:"#151515", color:"white", width:"100%"}} value={numeroEjercicios} onChange={(e)=>{selectorEjercicios(e.target.value)}}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                </select>





            </div>





            <div style={{width:"29%"}}>
                <p className="mb-0">SESIONES</p>
                <select style={{border:"none",borderRadius:"5px", backgroundColor:"#151515", color:"white", width:"100%"}} value={numeroSesiones} onChange={(e)=>{selectorSesiones(e.target.value)}}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                </select>
            </div>




            

            <div style={{width:"37%"}}>
                <p className="text-center mb-0">CARGAR RUTINA</p>
                <select style={{border:"none",borderRadius:"5px", backgroundColor:"#151515", color:"white", width:"100%"}} onChange={(e)=>{selectorRutinas(e.target.value)}}>
                    {Object.entries(rutinas).map(([clave, valor, index]) => (
                        //   selected={rutinaActiva.nombre}
                        <option key={index} value={valor.nombre}>
                        {valor.nombre}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        
        
        
        
        {/* <div style={{
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
        </div> */}
        

        <div className="d-flex justify-content-between">

            
            <div className="d-flex">
                <p style={{margin:"auto 0", marginRight:"5px"}}>Nombre:</p>
                <input 
                    type="text" 
                    style={{
                        backgroundColor:"#181818", 
                        color:"white", 
                        border:"none", 
                        borderRadius:"5px", 
                        margin:"auto auto auto 3%",
                        padding:"0",
                        height:"100%",
                        width:"60%",
                        textAlign:"center",
                        fontSize:"19px"
                    }} 
                    value={nombreRutina} 
                    onChange={(e)=>{handleNameChange(e)}}
                />
            </div>
            


            {/* <div className="d-flex justify-content-between m-0 p-0"> */}
                <div style={{
                        backgroundColor:"#1e4b4f",
                        padding:"0",
                        margin:"auto 7px",
                        // marginRight:"7px",
                        width:"30%",
                        // border:"solid white 2px",
                        borderRadius:"5px",
                        height:"40%",
                        cursor:"pointer",

                    }}
                    onClick={guardar}
                >
                    <p style={{textAlign:"center", margin:"0 auto", fontSize:"12px"}}>GUARDAR COMO NUEVO</p>
                </div>
                
                
                
                
                
                <div style={{
                        backgroundColor:"#1e4b4f",
                        padding:"0",
                        margin:"auto 0",
                        marginRight:"7px",
                        width:"30%",
                        // border:"solid white 2px",
                        borderRadius:"5px",
                        height:"40%",
                        cursor:"pointer",            

                    }}
                    onClick={actualizarRutina}
                >
                    <p style={{textAlign:"center", margin:"0 auto", fontSize:"12px", overflow:"clip"}}>GUARDAR CAMBIOS</p>
                </div>
                
                
                
                
                
                <div style={{
                        backgroundColor:"#1e4b4f",
                        padding:"0",
                        margin:"auto 0",
                        width:"20%",
                        // border:"solid white 2px",
                        borderRadius:"5px",
                        height:"100%",
                        cursor:"pointer",            

                    }}
                    onClick={eliminarRutina}
                >
                    <p style={{textAlign:"center", margin:"0 auto", fontSize:"12px", overflow:"clip"}}>ELIMINAR</p>
                </div>





            {/* </div> */}



        </div>





        
    </div>
  )
}
