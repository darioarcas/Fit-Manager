import { useDispatch, useSelector } from 'react-redux';
import { activarDieta, agregarDieta, cierraFormularioDieta, eliminarDieta, guardarDieta } from '../../actions/dietas';

import { useForm } from '../../hooks/useForm';
import { useEffect, useRef } from 'react';
import { CalculadoraDieta } from './informacion-paginas/dietas/CalculadoraDieta';
/*

const dietaInit = {
  id:"",
  desayuno1: "",
  desayuno2: "",
  desayuno3: "",
  almuerzo1: "",
  almuerzo2: "",
  almuerzo3: "",
  merienda1: "",
  merienda2: "",
  merienda3: "",
  cena1: "",
  cena2: "",
  cena3: "",
  postWork1: "",
  postWork2: "",
  postWork3: "",
  snack1: "",
  snack2: "",
  snack3: "",
  fecha: new Date().getTime(),
  calorias: "",
  proteinas: "",
  carbohidratos: "",
  grasas: ""
};


*/



export const Dietas = () => {
  
  const dispatch = useDispatch();
  

  
   const dietas = useSelector(store=>{return store.dietas.dietas});


  // con moment manejamos las fechas
  // info: https://momentjs.com/docs/#/displaying/
  // const fecha = moment(alumnos.fechaCreado);









  const dietaActiva = useSelector((store)=>{return store.dietas.active});


  const {calorias, proteinas, carbohidratos, grasas} = dietaActiva;
 
  const [formValues, handleInputChange, reset] = useForm(dietaActiva);

  const {
    desayuno1, desayuno2, desayuno3,
    almuerzo1, almuerzo2, almuerzo3,
    merienda1, merienda2, merienda3,
    cena1, cena2, cena3,
    postWork1, postWork2, postWork3,
    snack1, snack2, snack3,
    fecha} = formValues;



  const handleDieta = (id, dieta)=>{
    if(id !== dietaActiva.id){
      
      console.log("handleACTIVARDIETA");
      dispatch(activarDieta(id, dieta));
    }
  }

  const handleAddNew = ()=>{
    dispatch(agregarDieta());
  }


  const handleBorrar = ()=>{
    dispatch(eliminarDieta(dietaActiva.id));

  }

  const cerrarFormulario = ()=>{
    console.log("ACTIVE: NULL");
    // dispatch(cierraFormularioDieta());
  }











  


    ////////////////////////////////////////////////////////////////////////////
    // Arreglo al problema que el formulario no se actualiza a la nota actual //
    ////////////////////////////////////////////////////////////////////////////

    // Solo se debe disparar el effect cuando el id de la nota cambia

    // useRef permite almacenar una variable mutable que permite que no se redibuje el 
    // componente si cambia
    
    const activeId = useRef(dietaActiva.id);
    
    useEffect(() => {
      //Comparo la nota anterior (activeId) con la nueva nota (note.id)
      if(dietaActiva.id !== activeId.current){
        
        reset(dietaActiva);
        
        // Si son diferentes entonces se almacena el nuevo valor
        activeId.current = dietaActiva.id;
      }
      
    }, [dietaActiva, reset]);
    
    
    
    
    
    
    // graba en memoria (en el store) los cambios del formulario
    useEffect(() => {
      
      dispatch(activarDieta(formValues.id, {...formValues}));
      
    }, [formValues, dispatch])
    
    
    
    
    
    const handleGuardarCambios = ()=>{
      dispatch(guardarDieta(dietaActiva));
      // dispatch(cierraFormularioDieta());
      
    }



    const proteinasHijo = (e)=>{
      
      
      // handleInputChange(e);
    }
    const carbohidratosHijo = (e)=>{
      
      
      // handleInputChange(e);
    }
    const grasasHijo = (e)=>{
      
      
      // handleInputChange(e);
    }
    const caloriasHijo = (e)=>{
      
      
      // handleInputChange(e);
    }
    
    
    
   







  return (
    <div className='w-100'>
      {/* <div style={{zIndex:"-1", width: "100vw", height:"100vh", position:"absolute"}} onClick={()=>cerrarFormulario()}></div> */}
      <div className='m-0 p-0 w-100 d-flex justify-content-center'>

        <div
          onClick={()=>handleAddNew()}
          className='mt-4 btn p-1 btn-outline-success position-absolute top-0 start-50 translate-middle  position-fixed'
          style={{width: "30%", fontSize: "13px"}}
          
        >
          Nueva Dieta
        </div>

      </div>

      



      <div  className='d-flex justify-content-center'>

        <div className='mt-5 d-flex flex-column justify-content-center align-items-center' style={{width: "85%"}}>


          {

            Object.values(dietas).map((dieta, index) => {
              
              return(
                <div className='w-100 bg-white mb-5' key={dieta.id} onClick={()=>{ return handleDieta(dieta.id, dieta)}}>
                  
                  


                  
                  <form>





                    <h4 className='bg-dark text-center text-info p-2' style={{fontWeight: "normal", textTransform: "uppercase"}}>Dieta {index + 1}</h4>
                    

                    <div className='p-2'>
                      <div className='d-flex justify-content-between pl-1 pr-1 fw-bold' style={{fontSize:"12px"}}>
                        
                        <div className='d-flex' style={{ height:"20px"}}>
                          <p className='m-0' style={{width:"50%", height:"100%"}}>Nombre: </p><input type="text" name="nombre" className="bg-white bg-opacity-10 color-dark form-control border-info mb-0 mt-1" style={{width:"50%", height:"25%", border:"none", fontSize:"12px"}} />
                        </div>

                        <div className='d-flex' style={{ height:"20px"}}>
                          <p className='m-0' style={{width:"50%", height:"40%"}}>Proteinas: </p><input type="text" name="proteinas" className="bg-white bg-opacity-10 color-dark form-control border-info mb-0 mt-1" style={{width:"50%", height:"25%", border:"none", fontSize:"12px"}} value={proteinas} />
                        </div>
                        
                      </div>

                      <div className='d-flex justify-content-between pl-1 pr-1 fw-bold' style={{fontSize:"12px"}}>
                        <div className='d-flex' style={{ height:"20px", maxWidth: "50%"}}>

                          <p className='m-0'>Fecha:</p><input type="date" name="fecha" className="bg-white bg-opacity-10 color-dark form-control border-info mb-2 mt-1" style={{width:"50%", height:"25%", border:"none", fontSize:"12px"}} value={(dieta.id === dietaActiva.id) ? fecha : dieta.fecha} onChange={handleInputChange} />
                        </div>
                        <div className='d-flex' style={{ height:"20px"}}>

                          <p className='m-0'>Carbohidratos: </p><input type="text" name="carbohidratos" className="bg-white bg-opacity-10 color-dark form-control border-info mb-2 mt-1" style={{width:"50%", height:"25%", border:"none", fontSize:"12px"}} value={(dieta.id === dietaActiva.id) ? carbohidratos : dieta.carbohidratos} />
                        </div>
                      </div>


                      <div className='d-flex justify-content-between pl-1 pr-1 fw-bold' style={{fontSize:"12px"}}>
                        
                        <div className='d-flex' style={{ height:"20px"}}>
                          <p className='m-0'>Calorias: </p><input type="text" name="calorias" className="bg-white bg-opacity-10 color-dark form-control border-info mb-2 mt-1" style={{width:"50%", height:"25%", border:"none", fontSize:"12px"}} value={(dieta.id === dietaActiva.id) ? calorias : dieta.calorias} />
                        </div>

                        <div className='d-flex' style={{ height:"20px"}}>
                          <p className='m-0'>Grasas: </p><input type="text" name="grasas" className="bg-white bg-opacity-10 color-dark form-control border-info mb-2 mt-1" style={{width:"50%", height:"25%", border:"none", fontSize:"12px"}} value={(dieta.id === dietaActiva.id) ? grasas : dieta.grasas} />
                        </div>

                      </div>
                      
                      
                      <hr className='m-3 bg-info'/>
                      
                      
                      
                      
                      
                      
                      
                      
                      
                                                      {/* DESAYUNO */}

                      <div className='d-flex justify-content-between'>
                        <p style={{fontWeight: "bold"}}>Desayuno: </p>

                        {/* Boton Calculadora */}
                        <button className="btn btn-outline color-info p-1 opacity-15" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Calculadora</button>
                      </div>

                      <div>
                        <input name='desayuno1' className="text-body-secondary d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dieta.id === dietaActiva.id) ? desayuno1 : dieta.desayuno1} onChange={handleInputChange}></input>
                        <hr className='m-0 bg-dark'/>
                        <input name='desayuno2' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dieta.id === dietaActiva.id) ? desayuno2 : dieta.desayuno2} onChange={handleInputChange}></input>
                        <hr className='m-0 bg-dark'/>
                        <input name='desayuno3' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dieta.id === dietaActiva.id) ? desayuno3 : dieta.desayuno3} onChange={handleInputChange}></input>
                        <hr className='m-0 bg-dark'/>
                      </div> 

                                                     {/* CALCULADORA */}
                      <CalculadoraDieta proteinasHijo = {proteinasHijo} carbohidratosHijo = {carbohidratosHijo} grasasHijo = {grasasHijo} caloriasHijo = {caloriasHijo}  />
                      


                      <p style={{fontWeight: "bold"}}>Almuerzo: </p>
                        <input name='almuerzo1' className="text-body-secondary d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dieta.id === dietaActiva.id) ? almuerzo1 : dieta.almuerzo1} onChange={handleInputChange}></input>
                        <hr className='m-0 bg-dark'/>
                        <input name='almuerzo2' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dieta.id === dietaActiva.id) ? almuerzo2 : dieta.almuerzo2} onChange={handleInputChange}></input>
                        <hr className='m-0 bg-dark'/>
                        <input name='almuerzo3' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dieta.id === dietaActiva.id) ? almuerzo3 : dieta.almuerzo3} onChange={handleInputChange}></input>
                        <hr className='m-0 bg-dark'/>


                      <p style={{fontWeight: "bold"}}>Merienda: </p>
                        <input name='merienda1' className="text-body-secondary d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dieta.id === dietaActiva.id) ? merienda1 : dieta.merienda1} onChange={handleInputChange}></input>
                        <hr className='m-0 bg-dark'/>
                        <input name='merienda2' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dieta.id === dietaActiva.id) ? merienda2 : dieta.merienda2} onChange={handleInputChange}></input>
                        <hr className='m-0 bg-dark'/>
                        <input name='merienda3' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dieta.id === dietaActiva.id) ? merienda3 : dieta.merienda3} onChange={handleInputChange}></input>
                        <hr className='m-0 bg-dark'/>


                      <p style={{fontWeight: "bold"}}>Cena: </p><p className="text-body-secondary">{dieta.cena}</p>
                        <input name='cena1' className="text-body-secondary d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dieta.id === dietaActiva.id) ? cena1 : dieta.cena1} onChange={handleInputChange}></input>
                        <hr className='m-0 bg-dark'/>
                        <input name='cena2' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dieta.id === dietaActiva.id) ? cena2 : dieta.cena2} onChange={handleInputChange}></input>
                        <hr className='m-0 bg-dark'/>
                        <input name='cena3' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dieta.id === dietaActiva.id) ? cena3 : dieta.cena3} onChange={handleInputChange}></input>
                        <hr className='m-0 bg-dark'/>


                      <p style={{fontWeight: "bold"}}>PostWork: </p><p className="text-body-secondary">{dieta.postWork}</p>
                        <input name='postWork1' className="text-body-secondary d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dieta.id === dietaActiva.id) ? postWork1 : dieta.postWork1} onChange={handleInputChange}></input>
                        <hr className='m-0 bg-dark'/>
                        <input name='postWork2' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dieta.id === dietaActiva.id) ? postWork2 : dieta.postWork2} onChange={handleInputChange}></input>
                        <hr className='m-0 bg-dark'/>
                        <input name='postWork3' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dieta.id === dietaActiva.id) ? postWork3 : dieta.postWork3} onChange={handleInputChange}></input>
                        <hr className='m-0 bg-dark'/>


                      <p style={{fontWeight: "bold"}}>Snack: </p><p className="text-body-secondary">{dieta.snack}</p>
                        <input name='snack1' className="text-body-secondary d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dieta.id === dietaActiva.id) ? snack1 : dieta.snack1} onChange={handleInputChange}></input>
                        <hr className='m-0 bg-dark'/>
                        <input name='snack2' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dieta.id === dietaActiva.id) ? snack2 : dieta.snack2} onChange={handleInputChange}></input>
                        <hr className='m-0 bg-dark'/>
                        <input name='snack3' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dieta.id === dietaActiva.id) ? snack3 : dieta.snack3} onChange={handleInputChange}></input>
                        <hr className='m-0 bg-dark'/>




                          


                    </div>

                  </form>
                </div>

              )
            })
          }

          {
            (dietaActiva)
              && 
                <div onClick={()=>handleBorrar()} className="mt-1 p-1 btn btn-outline-success  position-absolute top-0 start-0  position-fixed" style={{width: "30%", fontSize: "13px"}}>Eliminar Dieta</div>
          }


          {
            (dietaActiva )// !== dietas.filter()
              && 
                <div onClick={()=>handleGuardarCambios()} className="mt-1 btn btn-outline-success position-absolute top-0 end-0 position-fixed" style={{width: "30%", fontSize: "13px"}}>Guardar Cambios</div>
          }

        </div>
        


      </div>

    </div>
  )
}
