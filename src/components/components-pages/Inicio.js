import { AlumnoInfo } from './informacion-paginas/inicio/AlumnoInfo';
import { useDispatch, useSelector } from 'react-redux';
import { activarAlumno, agregarAlumno } from '../../actions/alumno';

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


  // con moment manejamos las fechas
  // info: https://momentjs.com/docs/#/displaying/
  // const fecha = moment(alumnos.fechaCreado);

  const alumnoActivo = useSelector((store)=>{return store.alumnos.active});



  const handleAlumno = (id, alumno)=>{
    dispatch(activarAlumno(id, alumno));
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

      <div className='mt-5 d-flex justify-content-center align-items-center'>



        <table className="table table-dark table-bordered border-success table-hover w-75" style={{fontSize:"12px"}}>
          <thead className='table-secondary'>

                    {/* Columnas */}
            <tr >
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


          <tbody>

                     {/* Filas */}
            
              {

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
              }
            
          </tbody>
        </table>

      </div>
      


      {
        (alumnoActivo )
          && <AlumnoInfo />
      }


    </div>
  )
}
