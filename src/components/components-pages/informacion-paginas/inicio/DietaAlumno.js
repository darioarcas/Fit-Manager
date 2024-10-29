import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import { useForm } from '../../../../hooks/useForm';
import { activarDieta } from '../../../../actions/dietas';
import { SumaTotal } from '../dietas/suma-total/SumaTotal';
import { activarDietaAlumno, empezarCargaDietasAlumnos } from '../../../../actions/alumno';
import { recetas as recetasArray, suplementos } from './dieta-alumno/ArraysDietaAlumno';
import { deArregloAObjetoHelper } from '../../../../helpers/deArregloAObjeto';




// const dietaInit = {
//   id:"",
//   desayuno1: "",
//   desayuno2: "",
//   desayuno3: "",
//   almuerzo1: "",
//   almuerzo2: "",
//   almuerzo3: "",
//   merienda1: "",
//   merienda2: "",
//   merienda3: "",
//   cena1: "",
//   cena2: "",
//   cena3: "",
//   postWork1: "",
//   postWork2: "",
//   postWork3: "",
//   snack1: "",
//   snack2: "",
//   snack3: "",
//   fecha: new Date().getTime(),
//   calorias: "",
//   proteinas: "",
//   carbohidratos: "",
//   grasas: ""
// };





export const DietaAlumno = () => { 
  
  const dispatch = useDispatch();
  
  
  
  // Para cargar la Ficha correspondiente a cada alumno
  // Seleccionamos el id del usuario y alumno para buscar en la db
  const userId = useSelector(store => store.auth.uid);
  // const dietaId = useSelector(store=>{ return store.alumnos.active.dietaId ? store.alumnos.active.dietaId : "no-existe"});
  const dietaId = useSelector(store=>{ if(store.alumnos.active.dietaId !== ""){return store.alumnos.active.dietaId}else{return "no-existe"}});
  const alumnoActivoId = useSelector(store=>{ if(store.alumnos.active.id !== ""){return store.alumnos.active.id}else{return "no-existe"} });
  const dietas =  useSelector (store=>{ return store.alumnos.active.dieta[0]});
  const cargaFicha = useSelector(reducer => reducer.alumnos.carga);


  const [datosNuevos, setDatosNuevos] = useState(false);
  const [cambioEnCalculadora, setCambioEnCalculadora] = useState(false);

  useEffect(() => {
    if(alumnoActivoId !== undefined && alumnoActivoId !== "no-existe"){
    // if(true){
      dispatch(empezarCargaDietasAlumnos(userId, alumnoActivoId, dietaId));
    }

  }, [userId, alumnoActivoId, dietaId])


  





  const dietaActiva = dietas;

  const calculoPCGC = useSelector((store)=>{return store.dietas.active});


  // Para que cargue primero los datos de calculoPCGC de la db
  const handleInputChange2 = (e)=>{
    handleInputChange(e);
    setDatosNuevos(true);
  }



  const {calorias, proteinas, carbohidratos, grasas} = calculoPCGC;

  
 
  const [formValues, handleInputChange, reset, setValues] = useForm(dietaActiva);

  const {
    desayuno1, desayuno2, desayuno3,
    almuerzo1, almuerzo2, almuerzo3,
    merienda1, merienda2, merienda3,
    cena1, cena2, cena3,
    postWork1, postWork2, postWork3,
    snack1, snack2, snack3,
    fecha, suplementacion, recetas} = formValues;





    const suplementacionChange = (e, notaOSuplemento)=>{
      const nuevaSuplementacion = [];
      // Cargamos los datos de la nota o el suplemento
      if(e.target.name === "suplemento1") nuevaSuplementacion[0] = {...suplementacion.suplemento1, [notaOSuplemento]: e.target.value}
      else if(e.target.name === "suplemento2") nuevaSuplementacion[0] = {...suplementacion.suplemento2, [notaOSuplemento]: e.target.value}
      else if(e.target.name === "suplemento3") nuevaSuplementacion[0] = {...suplementacion.suplemento3, [notaOSuplemento]: e.target.value}
      setValues({
          ...formValues,
          suplementacion: {...suplementacion, [e.target.name]: nuevaSuplementacion[0]}
      });
      setDatosNuevos(true);
    }







    const cantidadRecetasChange = (e)=>{

      // Deja el objeto vacio
      if(e.target.value === ""){
        setValues(prev=>({
          ...prev,
          recetas: {}
        }));
      }

      // Sumamos objetos vacios
      else if(e.target.value > Object.values(recetas).length){
        for (let i = Object.values(recetas).length + 1; i <= e.target.value; i++) {
          const clave = `receta${i}`;
          setValues(prev=>({
            ...prev,
            recetas: {...prev.recetas, [clave]: {}}
          }));       
        }
      }

      // Si la nueva cantidad es menor a la cantidad en recetas
      else if(e.target.value < Object.values(recetas).length){
        const cantidadEliminar = Object.values(recetas).length - e.target.value;        
        setValues({
          ...formValues,
          // Eliminamos las recetas y las cargamos
          recetas: deArregloAObjetoHelper(Object.values(recetas).reverse().slice(cantidadEliminar).reverse(), "receta")
        });
      }
    }




    const recetasChange = (e)=>{


      // Si la seleccion es nula
      if(e.target.value === ""){
        setValues(prev=>({
          ...prev,
          recetas: {nombre:""}
        }));        
        return
      };
      const recetaSeleccionada = recetasArray.find(receta => receta.nombre === e.target.value);
      setValues({
        ...formValues,
        recetas: {...recetas, [e.target.name]: recetaSeleccionada}
      });
      setDatosNuevos(true);
    }



    useEffect(() => {
      if(cambioEnCalculadora === true && cargaFicha === true){
        // Activar para que los cambios en la calculadora se efectuen
        setDatosNuevos(true);
      }
    }, [calculoPCGC])
    




    // Carga los valores del formulario en la primera carga de la pagina
    const cambioDeIdAlumnoPrimeraCarga = useRef(alumnoActivoId);
    if((datosNuevos === false && desayuno1 !== dietas.desayuno1) || (cambioDeIdAlumnoPrimeraCarga.current !== alumnoActivoId)){
      cambioDeIdAlumnoPrimeraCarga.current = alumnoActivoId;           
      setValues(dietas);
      // Valores de PCaGCal
      dispatch(activarDieta(dietaId,{ ...dietas}));
      // Actualiza el Reducer del Alumno (dieta del Alumno)
      dispatch(activarDietaAlumno(dietaId, {...dietas}));      
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
    
    
    

    const cambioDeAlumno = useRef(alumnoActivoId);



    const cambioFormulario = useRef({})
    
    // graba en memoria (en el store) los cambios del formulario
    useEffect(() => {

      // Primero cargamos los datos que provienen de la db
      // si no hacemos esto los datos de calculoPCGC se sobrescriben y quedan en 0
      if(datosNuevos === false){
        // console.log("DIETA ID DESDE DIETA ALUMNO: ", dietaId);
        dispatch(activarDieta(dietaId,{ ...dietas}));
        // Actualiza el Reducer del Alumno (dieta del Alumno)
        dispatch(activarDietaAlumno(dietaId, {...dietas}));
      }
      else{
        // Realiza la actualizacion del formulario solo si este cambió
        if(cambioFormulario.current !== formValues){
          // console.log("CAMBIO DE ALUMNO, CURRENT: ", cambioFormulario.current, "FORM: ", formValues);
          cambioFormulario.current = formValues;
          actualizarFormulario();
        }
      }
      
    }, [formValues])




    const actualizarFormulario = (calculadora = "undefined", desdeSelector = false)=>{
        // Si detecta un cambio de alumno se vuelven a cargar los datos de la db
        if(cambioDeAlumno.current !== alumnoActivoId){
          cambioDeAlumno.current = alumnoActivoId;
          setDatosNuevos(false);
          // Evitamos que se cargen los datos que no son de la db
          return;
        }
        // esta condicion previene que se cargue un valor indefinido
        // proveniente del selector(desdeSelector=true), enviado por la ejecucion del codigo del selector
        if(calculadora === "undefined" && desdeSelector === true)return;
        // Actualiza el Reducer de las Dietas (dietaActiva)
        const formValuesActualizado = {
          ...formValues, 
          calorias: calorias ? calorias : "", 
          proteinas: proteinas ? proteinas : "", 
          carbohidratos: carbohidratos ? carbohidratos : "", 
          grasas: grasas ? grasas : "",
          calculadorasAlimentos: calculadora.calculadorasAlimentos ? calculadora.calculadorasAlimentos : dietas.calculadorasAlimentos
  
        }
        dispatch(activarDieta(dietaId,{ ...formValuesActualizado}));
  
        // Actualiza el Reducer del Alumno (dieta del Alumno)
        dispatch(activarDietaAlumno(dietaId, {...formValuesActualizado}));
    }






  return (
    <div className='w-100'>
      



      <div  className='d-flex justify-content-center'>

        <div className='mt-1 d-flex flex-column justify-content-center align-items-center' style={{width: "100%"}}>


          
                <div className='w-100 bg-white mb-5' key={dietas.id}>
                  
                  


                  
                  <form>



                    {/* <div className="d-block bg-black mb-2 btn btn-outline-info opacity-75 p-0" style={{width: "30%", fontSize: "12px"}}>Cargar Dieta</div> */}


                    <h4 className='bg-dark text-center text-info p-2' style={{fontWeight: "normal", textTransform: "uppercase"}}>Dieta</h4>


                    <div style={{width:"98%", margin:"0 auto"}}>
                      <h4 className='bg-dark text-center text-white p-2 mt-5 w-85 fs-6' style={{fontWeight: "normal", textTransform: "uppercase", borderRadius:"4px"}}>Plan Alimenticio</h4>
                    </div>



                    

                    <div className='p-2'>
                      <div className='d-flex pl-1 pr-1 fw-bold' style={{fontSize:"12px"}}>
                        
                        <div className='d-flex' style={{ height:"20px", maxWidth: "50%"}}>

                          <p className='m-0'>Fecha:</p><input key={"fecha-dieta"} type="date" name="fecha" className="bg-white bg-opacity-10 color-dark form-control border-info mb-2 mt-1" style={{width:"50%", height:"25%", border:"none", fontSize:"12px"}} value={(dietas.id === dietaActiva.id) ? fecha : dietas.fecha} onChange={handleInputChange2} />
                        </div>

                        
                      </div>

                      <div className='d-flex justify-content-between pl-1 pr-1 fw-bold' style={{fontSize:"12px"}}>

                        <div className='d-flex' style={{ height:"20px", width:"50%"}}>
                          <p className='m-0'>Carbohidratos: <p className='d-inline fw-normal'>{dietas.carbohidratos} gr</p> </p>
                          {/* <input key={"carbohidratos-dieta"} type="text" name="carbohidratos" className="bg-white bg-opacity-10 color-dark form-control border-info mb-2 mt-1" style={{width:"50%", height:"25%", border:"none", fontSize:"12px"}} value={dietas.carbohidratos} /> */}
                        </div>
                        
                        <div className='d-flex' style={{ height:"20px", width:"50%"}}>
                          <p className='m-0'>Proteinas: <p className='d-inline fw-normal'>{proteinas} gr</p> </p>
                        </div>
                      </div>


                      <div className='d-flex justify-content-between pl-1 pr-1 fw-bold' style={{fontSize:"12px"}}>
                        
                        <div className='d-flex' style={{ height:"20px", width:"50%"}}>
                          <p className='m-0'>Calorias: <p className='d-inline fw-normal'>{(dietas.id === dietaActiva.id) ? calorias : dietas.calorias}</p> </p>
                          {/* <input key={"calorias-dieta"} type="text" name="calorias" className="bg-white bg-opacity-10 color-dark form-control border-info mb-2 mt-1" style={{width:"50%", height:"25%", border:"none", fontSize:"12px"}} value={(dietas.id === dietaActiva.id) ? calorias : dietas.calorias} /> */}
                        </div>

                        <div className='d-flex justify-content-start' style={{ height:"20px", width:"50%"}}>
                          <p className='m-0'>Grasas: <p className='d-inline fw-normal'>{(dietas.id === dietaActiva.id) ? grasas : dietas.grasas} gr</p> </p>
                          {/* <input key={"grasas-dieta"} type="text" name="grasas" className="bg-white bg-opacity-10 color-dark form-control border-info mb-2 mt-1" style={{width:"50%", height:"25%", border:"none", fontSize:"12px"}} value={(dietas.id === dietaActiva.id) ? grasas : dietas.grasas} /> */}
                        </div>

                      </div>
                      
                      
                      <hr className='m-3 bg-info'/>
                      
                      
                      
                      
                      
                      
                      
                      
                      
                                                      {/* DESAYUNO */}

                      <div className='d-flex mb-4'>
                        <p style={{writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize:"10px", letterSpacing: "3px", width:"30px"}} className='text-center p-0 m-0 text-uppercase fw-bolder text-body-tertiary'  type="button" data-bs-toggle="offcanvas" data-bs-target="#desayuno" aria-controls="offcanvasScrolling">
                          Desayuno                          
                        </p>
                        
                        {/* VIÑETA VERTICAL */}
                        <div style={{width:"3px"}} className='bg-dark rounded-1 opacity-50'>
                        </div>

                        {/* Boton Calculadora */}
                        {/* <button className="btn btn-outline color-info p-1 opacity-15" type="button" data-bs-toggle="offcanvas" data-bs-target="#desayuno" aria-controls="offcanvasScrolling">Calculadora</button> */}
                        
                        {/* PUNTOS */}
                        <div style={{width:"12px", position:"relative", color:"#a5ffb9", fontSize:"20px"}}>
                          <ul style={{position:"absolute", left:"22px", top:"0px", margin:"0", padding:"0"}}>
                            <li className='mb-0 p-0 mt-2'></li>
                            <li className='mb-0 p-0 mt-2'></li>
                            <li className='mb-0 p-0 mt-2'></li>
                          </ul>
                        </div>



                        <div style={{width:"87%"}}>
                          <input name='desayuno1' className="text-body-secondary d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dietas.id === dietaActiva.id) ? desayuno1 : dietas.desayuno1} onChange={handleInputChange2}></input>
                          <hr className='m-0 bg-dark'/>
                          <input name='desayuno2' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dietas.id === dietaActiva.id) ? desayuno2 : dietas.desayuno2} onChange={handleInputChange2}></input>
                          <hr className='m-0 bg-dark'/>
                          <input name='desayuno3' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dietas.id === dietaActiva.id) ? desayuno3 : dietas.desayuno3} onChange={handleInputChange2}></input>
                          <hr className='m-0 bg-dark'/>
                        </div> 
                      </div>

                      
                      
                      
                      

                                                      {/* ALMUERZO */}
                      <div className='d-flex mb-4'>
                        <p style={{writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize:"10px", letterSpacing: "2px", width:"30px"}} className='text-center p-0 m-0 text-uppercase fw-bolder text-body-tertiary'  type="button" data-bs-toggle="offcanvas" data-bs-target="#almuerzo" aria-controls="offcanvasScrolling">
                          Almuerzo                          
                        </p>
                        
                        {/* VIÑETA VERTICAL */}
                        <div style={{width:"3px"}} className='bg-dark rounded-1 opacity-50'>
                        </div>

                        {/* PUNTOS */}
                        <div style={{width:"12px", position:"relative", color:"#a5ffb9", fontSize:"20px"}}>
                          <ul style={{position:"absolute", left:"22px", top:"0px", margin:"0", padding:"0"}}>
                            <li className='mb-0 p-0 mt-2'></li>
                            <li className='mb-0 p-0 mt-2'></li>
                            <li className='mb-0 p-0 mt-2'></li>
                          </ul>
                        </div>

                        <div style={{width:"87%"}}>
                          <input name='almuerzo1' className="text-body-secondary d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dietas.id === dietaActiva.id) ? almuerzo1 : dietas.almuerzo1} onChange={handleInputChange2}></input>
                          <hr className='m-0 bg-dark'/>
                          <input name='almuerzo2' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dietas.id === dietaActiva.id) ? almuerzo2 : dietas.almuerzo2} onChange={handleInputChange2}></input>
                          <hr className='m-0 bg-dark'/>
                          <input name='almuerzo3' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dietas.id === dietaActiva.id) ? almuerzo3 : dietas.almuerzo3} onChange={handleInputChange2}></input>
                          <hr className='m-0 bg-dark'/>
                        </div>
                      </div>






                                                      {/* MERIENDA */}
                      <div className='d-flex mb-4'>
                        <p style={{writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize:"10px", letterSpacing: "2px", width:"30px"}} className='text-center p-0 m-0 text-uppercase fw-bolder text-body-tertiary'  type="button" data-bs-toggle="offcanvas" data-bs-target="#merienda" aria-controls="offcanvasScrolling">
                          Merienda                          
                        </p>


                        {/* VIÑETA VERTICAL */}
                        <div style={{width:"3px"}} className='bg-dark rounded-1 opacity-50'>
                        </div>

                        {/* PUNTOS */}
                        <div style={{width:"12px", position:"relative", color:"#a5ffb9", fontSize:"20px"}}>
                          <ul style={{position:"absolute", left:"22px", top:"0px", margin:"0", padding:"0"}}>
                            <li className='mb-0 p-0 mt-2'></li>
                            <li className='mb-0 p-0 mt-2'></li>
                            <li className='mb-0 p-0 mt-2'></li>
                          </ul>
                        </div>



                        <div style={{width:"87%"}}>
                          <input name='merienda1' className="text-body-secondary d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dietas.id === dietaActiva.id) ? merienda1 : dietas.merienda1} onChange={handleInputChange2}></input>
                          <hr className='m-0 bg-dark'/>
                          <input name='merienda2' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dietas.id === dietaActiva.id) ? merienda2 : dietas.merienda2} onChange={handleInputChange2}></input>
                          <hr className='m-0 bg-dark'/>
                          <input name='merienda3' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dietas.id === dietaActiva.id) ? merienda3 : dietas.merienda3} onChange={handleInputChange2}></input>
                          <hr className='m-0 bg-dark'/>
                        </div>
                      </div>






                                                      {/* CENA */}
                      <div className='d-flex mb-4'>
                        <p style={{writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize:"10px", letterSpacing: "2px", width:"30px"}} className='text-center p-0 m-0 text-uppercase fw-bolder text-body-tertiary'  type="button" data-bs-toggle="offcanvas" data-bs-target="#cena" aria-controls="offcanvasScrolling">
                          Cena                          
                        </p>



                        {/* VIÑETA VERTICAL */}
                        <div style={{width:"3px"}} className='bg-dark rounded-1 opacity-50'>
                        </div>

                        {/* PUNTOS */}
                        <div style={{width:"12px", position:"relative", color:"#a5ffb9", fontSize:"20px"}}>
                          <ul style={{position:"absolute", left:"22px", top:"0px", margin:"0", padding:"0"}}>
                            <li className='mb-0 p-0 mt-2'></li>
                            <li className='mb-0 p-0 mt-2'></li>
                            <li className='mb-0 p-0 mt-2'></li>
                          </ul>
                        </div>
                      

                        <div style={{width:"87%"}}>
                          <input name='cena1' className="text-body-secondary d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dietas.id === dietaActiva.id) ? cena1 : dietas.cena1} onChange={handleInputChange2}></input>
                          <hr className='m-0 bg-dark'/>
                          <input name='cena2' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dietas.id === dietaActiva.id) ? cena2 : dietas.cena2} onChange={handleInputChange2}></input>
                          <hr className='m-0 bg-dark'/>
                          <input name='cena3' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dietas.id === dietaActiva.id) ? cena3 : dietas.cena3} onChange={handleInputChange2}></input>
                          <hr className='m-0 bg-dark'/>
                        </div>

                      </div>






                                                      {/* POST WORK */}
                      <div className='d-flex mb-4'>
                        <p style={{writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize:"10px", letterSpacing: "2px", width:"30px"}} className='text-center p-0 m-0 text-uppercase fw-bolder text-body-tertiary'  type="button" data-bs-toggle="offcanvas" data-bs-target="#post-work" aria-controls="offcanvasScrolling">
                          Post Work                          
                        </p>
                      
                        {/* VIÑETA VERTICAL */}
                        <div style={{width:"3px"}} className='bg-dark rounded-1 opacity-50'>
                        </div>

                        {/* PUNTOS */}
                        <div style={{width:"12px", position:"relative", color:"#a5ffb9", fontSize:"20px"}}>
                          <ul style={{position:"absolute", left:"22px", top:"0px", margin:"0", padding:"0"}}>
                            <li className='mb-0 p-0 mt-2'></li>
                            <li className='mb-0 p-0 mt-2'></li>
                            <li className='mb-0 p-0 mt-2'></li>
                          </ul>
                        </div>


                        <div style={{width:"87%"}}>
                          <input name='postWork1' className="text-body-secondary d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dietas.id === dietaActiva.id) ? postWork1 : dietas.postWork1} onChange={handleInputChange2}></input>
                          <hr className='m-0 bg-dark'/>
                          <input name='postWork2' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dietas.id === dietaActiva.id) ? postWork2 : dietas.postWork2} onChange={handleInputChange2}></input>
                          <hr className='m-0 bg-dark'/>
                          <input name='postWork3' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dietas.id === dietaActiva.id) ? postWork3 : dietas.postWork3} onChange={handleInputChange2}></input>
                          <hr className='m-0 bg-dark'/>

                        </div>


                      </div>




                                                      {/* SNACK */}
                      <div className='d-flex mb-4'>
                        <p style={{writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize:"10px", letterSpacing: "2px", width:"30px"}} className='text-center p-0 m-0 text-uppercase fw-bolder text-body-tertiary'  type="button" data-bs-toggle="offcanvas" data-bs-target="#snack" aria-controls="offcanvasScrolling">
                          Snack                         
                        </p>
                      

                        {/* VIÑETA VERTICAL */}
                        <div style={{width:"3px"}} className='bg-dark rounded-1 opacity-50'>
                        </div>

                        {/* PUNTOS */}
                        <div style={{width:"12px", position:"relative", color:"#a5ffb9", fontSize:"20px"}}>
                          <ul style={{position:"absolute", left:"22px", top:"0px", margin:"0", padding:"0"}}>
                            <li className='mb-0 p-0 mt-2'></li>
                            <li className='mb-0 p-0 mt-2'></li>
                            <li className='mb-0 p-0 mt-2'></li>
                          </ul>
                        </div>
                      

                        <div style={{width:"87%"}}>
                          <input name='snack1' className="text-body-secondary d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dietas.id === dietaActiva.id) ? snack1 : dietas.snack1} onChange={handleInputChange2}></input>
                          <hr className='m-0 bg-dark'/>
                          <input name='snack2' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dietas.id === dietaActiva.id) ? snack2 : dietas.snack2} onChange={handleInputChange2}></input>
                          <hr className='m-0 bg-dark'/>
                          <input name='snack3' className="d-block w-100 focus-ring" style={{border: "none", marginBottom: "4px"}} value={(dietas.id === dietaActiva.id) ? snack3 : dietas.snack3} onChange={handleInputChange2}></input>
                          <hr className='m-0 bg-dark'/>
                        </div>

                      </div>




                      {/* SUPLEMENTOS */}
                      <div style={{width:"98%", margin:"0 auto"}}>
                        <h4 className='bg-dark text-center text-white p-2 mt-5 w-85 fs-6' style={{fontWeight: "normal", textTransform: "uppercase", borderRadius:"4px"}}>Suplementación</h4>
                      </div>


                      {/* se utiliza suplementacion cuando se carga */}
                      {suplementacion && Object.entries(suplementacion).map(([clave,valor, index])=>
                        <div>
                          {/* PUNTOS */}
                          <div style={{width:"12px", position:"relative", color:"#a5ffb9", fontSize:"20px"}}>
                            <ul style={{position:"absolute", left:"22px", top:"0px", margin:"0", padding:"0"}}>
                              <li className='mb-0 p-0 mt-2'></li>
                            </ul>
                          </div>


                          <select 
                            name= {clave}
                            onChange={(e)=>{suplementacionChange(e, "suplemento")}}
                            value={valor.suplemento} 
                            className="me-2 fs-6 rounded w-25" 
                            style={{
                              height:"30px", 
                              color:"black", 
                              width:"100%", 
                              border:"none", 
                              margin:"0 0 0 20px",
                              backgroundColor: "white",
                              appearance: 'none', // Oculta la flecha en navegadores compatibles
                              WebkitAppearance: 'none', // Para Safari
                              MozAppearance: 'none', // Para Firefox

                            }}
                          >
                            <option value={""}></option>
                            {suplementos.map((suplemento) => (
                              <option key={`${suplemento}${clave}`} value={suplemento}>
                                {suplemento}
                              </option>
                            ))}
                          </select>

                          <input 
                            name= {clave}
                            className="focus-ring" 
                            style={{border: "none", marginBottom: "4px", width:"60%", borderRadius:"4px"}}
                            value={valor.nota}
                            onChange={(e)=>{suplementacionChange(e, "nota")}}
                          />

                        </div>                        
                      )}






                      {/* RECETAS */}
                      <div  style={{width:"98%", margin:"0 auto"}}>
                        <h4 className='bg-dark text-center text-white p-2 mt-5 w-85 fs-6' style={{fontWeight: "normal", textTransform: "uppercase", borderRadius:"4px"}}>Recetas</h4>
                        
                      </div>

                      <select onChange={cantidadRecetasChange}>
                        <option value={""}></option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                      </select>



                      {recetas && <p style={{fontSize:"12px"}}>"Las recetas no llevan las cantidades definidas de los ingredientes por lo cual se debera usar las cantidades de ingredientes que indique la dieta"</p>}
                      {recetas && Object.entries(recetas).map(([clave, valor, index])=>
                        <div>


                          {/* SELECTOR DE RECETAS */}
                          <select
                            name={clave}
                            onChange={recetasChange}
                            value={(valor.nombre) && valor.nombre}
                            className="me-2 fs-6 rounded w-75 bg-secondary text-white text-center" 
                            style={{
                              height:"30px",
                              padding:"5px",
                              color:"black", 
                              width:"100%", 
                              border:"none", 
                              margin:"0 0 5px 0",
                              backgroundColor: "white",
                              appearance: 'none', // Oculta la flecha en navegadores compatibles
                              WebkitAppearance: 'none', // Para Safari
                              MozAppearance: 'none', // Para Firefox

                            }}
                          >
                            <option value={""}></option>
                            {recetasArray.map((receta) => (
                              <option key={`${receta.nombre}`} value={receta.nombre}>
                                {receta.nombre}
                              </option>
                            ))}
                          </select>
                          


                          
                          <div className='d-flex'>
                            {/* IMG */}
                            {
                              (valor.img) &&
                              <img src={valor.img} style={{width:"50%", borderRadius:"5px", margin:"0 5px 20px 0"}} alt='imagen de la receta'/>
                            }

                            {
                              valor.ingredientes &&
                              <div style={{width:"50%"}}>
                                {/* INGREDIENTES */}
                                <div style={{fontSize:"15px"}}>
                                  <h6>Ingredientes:</h6>
                                  <ul>
                                    {valor.ingredientes.uno && <li>{valor.ingredientes.uno}</li>}
                                    {valor.ingredientes.dos && <li>{valor.ingredientes.dos}</li>}
                                    {valor.ingredientes.tres && <li>{valor.ingredientes.tres}</li>}
                                    {valor.ingredientes.cuatro && <li>{valor.ingredientes.cuatro}</li>}
                                    {valor.ingredientes.cinco && <li>{valor.ingredientes.cinco}</li>}
                                    {valor.ingredientes.seis && <li>{valor.ingredientes.seis}</li>}
                                    {valor.ingredientes.siete && <li>{valor.ingredientes.siete}</li>}
                                  </ul>
                                </div>
                              </div>
                            }



                          </div>


                          {
                            valor.ingredientes &&
                            <div>
                              {/* PREPARACION */}
                              <div style={{fontSize:"15px", width:"100%"}}>
                                <h6>Preparacion:</h6>
                                <ol>
                                  {valor.preparacion.uno && <li>{valor.preparacion.uno}</li>}
                                  {valor.preparacion.dos && <li>{valor.preparacion.dos}</li>}
                                  {valor.preparacion.tres && <li>{valor.preparacion.tres}</li>}
                                  {valor.preparacion.cuatro && <li>{valor.preparacion.cuatro}</li>}
                                  {valor.preparacion.cinco && <li>{valor.preparacion.cinco}</li>}
                                  {valor.preparacion.seis && <li>{valor.preparacion.seis}</li>}
                                  {valor.preparacion.siete && <li>{valor.preparacion.siete}</li>}
                                </ol>
                              </div>

                              {valor.preparacion.nota && <p>Nota: {valor.preparacion.nota}</p>}
                              
                            </div>
                          }
                        
                        <hr style={{width:"80%", margin:"0 auto 20px auto"}}/>
                        </div>                   
                      )}



                      {/* CALCULADORAS */}                      
                                            
                      <SumaTotal 
                        setCambioEnCalculadora={setCambioEnCalculadora} 
                        actualizarFormulario={actualizarFormulario}
                      />


                          


                    </div>

                  </form>
                </div>


        </div>
        


      </div>
    
    </div>
  )
}


