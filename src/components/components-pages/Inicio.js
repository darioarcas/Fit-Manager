import { AlumnoInfo } from './informacion-paginas/inicio/AlumnoInfo';
import { useDispatch, useSelector } from 'react-redux';
import { activarAlumno, agregarAlumno } from '../../actions/alumno';
import { Ficha } from './informacion-paginas/inicio/Ficha';
import { Rutinas } from './Rutinas';
import { DietaAlumno } from './informacion-paginas/inicio/DietaAlumno';
import { useRef } from 'react';

// import moment from "moment"; // npm i moment --save

// //Ejemplo del objeto
// const alumnos = [1,2,
//   {
//     id: 'AS3554F545GDF4',
//     nombre: 'Ignacio',
//     pais: 'Argentina',
//     celular: '35497382',
//     ficha: '',
//     plan: '',
//     costo: '80',
//     fechaInicio: 5456456,
//     fechaFinal: 456456456
// }]

export const Inicio = (valor) => { 

  const dispatch = useDispatch();

  
  const alumnos = useSelector(store=>{return store.alumnos.notes});
  
  // Para simular el click del boton para cerrar el formulario
  const botonRef = useRef(null);

  // con moment manejamos las fechas
  // info: https://momentjs.com/docs/#/displaying/
  // const fecha = moment(alumnos.fechaCreado);

  const alumnoActivo = useSelector((store)=>{return store.alumnos.active});



  const handleAlumno = (id, alumno)=>{
    dispatch(activarAlumno(id, alumno));
  }


  const cargarFicha = (id, alumno)=>{
    handleAlumno(id, alumno);

    // Añade una clase para cargar las dietas y rutinas
    const fichaShow = document.getElementById("ficha");    
    fichaShow.classList.add('cargar-ficha');
  }
  
  
  
  const funcionSow = ()=>{
    const fichaShow = document.getElementById("ficha");
    // console.log("Lo que contiene el div de la ficha: ", fichaShow);

    if(fichaShow !== null){
      // Carga los datos de la ficha solo cuando el boton Ficha es presionado
      if(fichaShow.classList.contains("cargar-ficha")){
        return <>
          <Ficha/>
          <DietaAlumno/>
          <Rutinas/>
        </> 
      }
    }
    
    return false;
  }



  const handleAddNew = ()=>{
    dispatch(agregarAlumno());
  }



  

  return (
    <div>
      <div className='m-0 p-0 w-100 d-flex justify-content-center'>

        <div
          onClick={()=>handleAddNew()}
          className='mt-5 w-50 btn btn-outline-success me-2 mb-3 '
          
        >
          Agregar Alumno
        </div>

      </div>

      {/* <div className='mt-5 d-flex justify-content-center align-items-center'> */}



        {/* <table className="table table-dark table-bordered border-success table-hover w-75" style={{fontSize:"12px"}}>
          <thead className='table-secondary'> */}

                    {/* Columnas */}
            {/* <tr >
              <th scope="col" style={{padding:"0", width: "8px", fontSize:"11px"}}>#</th>
              <th scope="col" style={{padding:"0", width: "8px", fontSize:"11px"}}>Nombre</th>
              <th scope="col" style={{padding:"0", width: "8px", fontSize:"11px"}}>Pais</th>
              <th scope="col" style={{padding:"0", width: "8px", fontSize:"11px"}}>Celular</th>
              <th scope="col" style={{padding:"0", width: "8px", fontSize:"11px"}}>Ficha</th>
              <th scope="col" style={{padding:"0", width: "8px", fontSize:"11px"}}>Plan</th>
              <th scope="col" style={{padding:"0", width: "8px", fontSize:"11px"}}>Costo</th>
              <th scope="col" style={{padding:"0", width: "8px", fontSize:"11px"}}>FechaInicio</th>
              <th scope="col" style={{padding:"0", width: "8px", fontSize:"11px"}}>FechaFinal</th>
              <th scope="col" style={{padding:"0", width: "8px", fontSize:"11px"}}>Dias Restantes</th>
            </tr>
          </thead>


          <tbody> */}

                     {/* Filas */}
            
              {/* {

                Object.values(alumnos).map((alumno, index) => {
                  
                  return(
                    <tr key={index} onClick={()=>{ return handleAlumno(alumno.id, alumno)}}>
                      <th scope="row" style={{padding:"0", width: "9px", fontSize:"8px"}}>{index + 1}</th>
                      <td style={{padding:"2px", width: "7px", height: "30px", fontSize:"8px"}}>{alumno.nombre}</td>
                      <td style={{padding:"2px", width: "7px", height: "30px", fontSize:"8px"}}>{alumno.pais}</td>
                      <td style={{padding:"2px", width: "7px", height: "30px", fontSize:"8px"}}>{alumno.celular}</td>
                      <td style={{padding:"2px", width: "7px", height: "30px", fontSize:"8px"}}>{alumno.ficha}</td>
                      <td style={{padding:"2px", width: "7px", height: "30px", fontSize:"8px"}}>{alumno.plan}</td>
                      <td style={{padding:"2px", width: "7px", height: "30px", fontSize:"8px"}}>{alumno.costo}</td>
                      <td style={{padding:"2px", width: "7px", height: "30px", fontSize:"8px"}}>{alumno.fechaInicio}</td>
                      <td style={{padding:"2px", width: "7px", height: "30px", fontSize:"8px"}}>{alumno.fechaFinal}</td>
                      <td style={{padding:"2px", width: "7px", height: "30px", fontSize:"8px"}}>Faltan 2 dias</td>
                    </tr>
                  )
                })
              } */}
            
          {/* </tbody>
        </table>

      </div> */}
      


      





      <div className='d-flex flex-wrap w-100' style={{overflow:"clip"}}>

        {

          Object.values(alumnos).map((alumno, index) => {
            
            return(
              <div key={index} className='animate__animated animate__faster d-flex justify-content-center animate__fadeInLeft' style={{width:"50%", overflow:"clip"}} >

                <div className="card border-dark" style={{width: "12rem", overflow:"clip", fontSize:"12px", margin:"2%"}}>
                  <div className='d-flex flex-direction-column'>

                    <div style={{width:"40%"}}>
                      {/* <img src="..." className="card-img-top" alt="..." /> */}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="60px" viewBox="0 -960 960 960" 
                        width="60px" fill="#016892">
                          <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
                      /></svg>


                      {/* WHATSAPP */}
                      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">    <path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z"/></svg>
                    </div>

                    <div className="card-body  p-1">
                      <div className='d-flex justify-content-between'>
                        <h5 className="card-title m-0 fw-semibold">{alumno.nombre}</h5>
                        <div className="card-title m-0 p-0" style={{fontSize:"9px"}}>{alumno.pais}</div>
                      </div>
                      <p className="card-text m-0 fw-semibold" style={{color:"#91ded8"}}>Finaliza en: días</p>
                      <p className="card-text m-0 fw-semibold opacity-75">costo: ${alumno.costo}</p>
                      <div className='d-flex justify-content-between'>
                        <div
                          onClick={()=>{ return cargarFicha(alumno.id, alumno)}} 
                          className="btn btn-primary py-1 px-2"
                          data-bs-toggle="modal" 
                          data-bs-target="#ficha"
                        >
                          Ficha
                                                  
                        </div>
                        
                        
                        <div 
                          className="btn btn-primary py-1 px-2" 
                          onClick={()=>{ return handleAlumno(alumno.id, alumno)}} 
                          data-bs-toggle="modal" 
                          data-bs-target="#formulario"
                        >Form</div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            )
          })
        }
      </div>


      {/* {
        (alumnoActivo )
          // &&
        } */}
      

      
      {/* FORMULARIO */}
      <div className="modal fade w-100" id="formulario" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered d-flex justify-content-center">
          <div className="modal-content w-75 bg-transparent">
          {(alumnoActivo) && <AlumnoInfo botonRef={botonRef} />}
          
          <div ref={botonRef} data-bs-dismiss="modal" type="button" className="btn bg-dark" style={{visibility:"hidden",height:"0px", width:"0px"}}></div>
          
            
          </div>
        </div>
      </div>




      {/* FICHA */}
      <div className="modal fade" style={{width:"100vw", height:"100vh"}} id="ficha" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered d-flex justify-content-center">
          <div className="modal-content" style={{marginBottom:"50%"}}>
            
            
            {/* CONTENIDO */}
            
            {funcionSow()}            
            
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            
          </div>
        </div>
      </div>


    </div>
  )
}
