import { AlumnoInfo } from './informacion-paginas/inicio/AlumnoInfo';
import { useDispatch, useSelector } from 'react-redux';
import { activarAlumno, agregarAlumno } from '../../actions/alumno';

export const Dietas = () => {

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



        <table className="table table-dark table-bordered border-success table-hover w-75">
          <thead className='table-secondary'>

                    {/* Columnas */}
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Pais</th>
              <th scope="col">Celular</th>
              <th scope="col">Ficha</th>
              <th scope="col">Plan</th>
              <th scope="col">Costo</th>
              <th scope="col">FechaInicio</th>
              <th scope="col">FechaFinal</th>
              <th scope="col">Dias Restantes</th>
            </tr>
          </thead>


          <tbody>

                     {/* Filas */}
            
              {

                Object.values(alumnos).map((alumno, index) => {
                  
                  return(
                    <tr key={index} onClick={()=>{ return handleAlumno(alumno.id, alumno)}}>
                      <th scope="row" >{index + 1}</th>
                      <td>{alumno.nombre}</td>
                      <td>{alumno.pais}</td>
                      <td>{alumno.celular}</td>
                      <td>{alumno.ficha}</td>
                      <td>{alumno.plan}</td>
                      <td>{alumno.costo}</td>
                      <td>{alumno.fechaInicio}</td>
                      <td>{alumno.fechaFinal}</td>
                      <td>Faltan 2 dias</td>
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
