import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../../hooks/useForm"
import { useEffect, useRef } from "react";
import { activarAlumno, cierraFormulario, eliminarAlumno, guardarAlumno } from "../../../../actions/alumno";

export const AlumnoInfo = () => {

    const dispatch = useDispatch();
    const alumnoActivo = useSelector((store)=>{return store.alumnos.active});
    
    const [formValues, handleInputChange, reset] = useForm(alumnoActivo);

    const {nombre, pais, celular, ficha, plan, costo, fechaInicio, fechaFinal} = formValues;







    ////////////////////////////////////////////////////////////////////////////
    // Arreglo al problema que el formulario no se actualiza a la nota actual //
    ////////////////////////////////////////////////////////////////////////////

    // Solo se debe disparar el effect cuando el id de la nota cambia

    // useRef permite almacenar una variable mutable que permite que no se redibuje el 
    // componente si cambia
    const activeId = useRef(alumnoActivo.id);


    useEffect(() => {
        //Comparo la nota anterior (activeId) con la nueva nota (note.id)
        if(alumnoActivo.id !== activeId.current){

            reset(alumnoActivo);

            // Si son diferentes entonces se almacena el nuevo valor
            activeId.current = alumnoActivo.id;
        }

    }, [alumnoActivo, reset]);






     // graba en memoria (en el store) los cambios del formulario
     useEffect(() => {

        dispatch(activarAlumno(formValues.id, {...formValues}));
        
    }, [formValues, dispatch])


    const handleGuardarCambios = ()=>{
        dispatch(guardarAlumno(alumnoActivo));
        dispatch(cierraFormulario());

    }


    const cerrarFormulario = ()=>{
        dispatch(cierraFormulario());
    }


    const handleBorrar = ()=>{
        dispatch(eliminarAlumno(alumnoActivo.id));
    }



    const countries = [
        { code: '1', name: 'Argentina' },
        { code: '2', name: 'Australia' },
        { code: '3', name: 'Bolivia' },
        { code: '4', name: 'Brasil' },
        { code: '5', name: 'Canadá' },
        { code: '6', name: 'Chile' },
        { code: '7', name: 'Colombia' },
        { code: '8', name: 'Costa Rica' },
        { code: '9', name: 'Cuba' },
        { code: '10', name: 'Ecuador' },
        { code: '11', name: 'El Salvador' },
        { code: '12', name: 'España' },
        { code: '13', name: 'Francia' },
        { code: '14', name: 'Germany (Alemania)' },
        { code: '15', name: 'Guatemala' },
        { code: '16', name: 'Honduras' },
        { code: '17', name: 'Italia' },
        { code: '18', name: 'Japón' },
        { code: '19', name: 'México' },
        { code: '20', name: 'Nicaragua' },
        { code: '20', name: 'Panamá' },
        { code: '20', name: 'Paraguay' },
        { code: '20', name: 'Perú' },
        { code: '20', name: 'Puerto Rico' },
        { code: '20', name: 'República Dominicana' },
        { code: '20', name: 'Reino Unido' },
        { code: '20', name: 'Sudáfrica' },
        { code: '20', name: 'Uruguay' },
        { code: '20', name: 'Venezuela' },
        { code: '20', name: 'Estados Unidos' },
        // Agrega más países según sea necesario
    ];





    return (
    <div>

        <form className="container bg-black form-control border-info w-75 rounded-end">
            <div className="container d-flex flex-column ">
                    <input  type="text" name="nombre" className="bg-white bg-opacity-10 color-white form-control border-success mb-2 mt-1" placeholder="Nombre" value={nombre} onChange={handleInputChange}></input>
                    
                    <select  name="pais" className="bg-white bg-opacity-10 color-white form-control border-success mb-2 mt-1" value={pais} onChange={handleInputChange}>
                        <option value="">--Seleccione un país--</option>
                        {countries.map((country) => (
                        <option key={country.name} >
                            {country.name}
                        </option>
                        ))}
                    </select>

                    <input  type="text" name="celular" className="bg-white bg-opacity-10 color-white form-control border-success mb-2 mt-1" placeholder="Celular" value={celular} onChange={handleInputChange}></input>
                    <input  type="text" name="ficha" className="bg-white bg-opacity-10 color-white form-control border-success mb-2 mt-1" placeholder="Ficha" value={ficha} onChange={handleInputChange}></input>
                    <input  type="text" name="plan" className="bg-white bg-opacity-10 color-white form-control border-success mb-2 mt-1" placeholder="Plan" value={plan} onChange={handleInputChange}></input>
                    <input  type="text" name="costo" className="bg-white bg-opacity-10 color-white form-control border-success mb-2 mt-1" placeholder="Costo" value={costo} onChange={handleInputChange}></input>
                    <input  type="date" name="fechaInicio" className="bg-white bg-opacity-10 color-white form-control border-success mb-2 mt-1" placeholder="Fecha de Inicio" value={fechaInicio} onChange={handleInputChange}></input>
                    <input  type="date" name="fechaFinal" className="bg-white bg-opacity-10 color-white form-control border-success mb-2 mt-1" placeholder="Fecha Final" value={fechaFinal} onChange={handleInputChange}></input>




                    
                    



            </div>
            <div onClick={()=>handleGuardarCambios()} className="mt-3 btn btn-outline-success me-2 mb-3 ml-5">Guardar Cambios</div>
            <div onClick={()=>handleBorrar()} className="mt-3 btn btn-outline-success me-2 mb-3 ml-5">Eliminar Alumno</div>
            <div onClick={()=>cerrarFormulario()} className="mt-3 btn btn-outline-success me-2 mb-3 ml-5">Cerrar Formulario</div>
        </form>

    </div>
  )
}
