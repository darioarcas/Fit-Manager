import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../../hooks/useForm"
import { useEffect, useRef } from "react";
import { activarAlumno, eliminarAlumno, guardarAlumno } from "../../../../actions/alumno";

export const AlumnoInfo = ({botonRef}) => {

    const dispatch = useDispatch();
    const alumnoActivo = useSelector((store)=>{return store.alumnos.active});
    
    const [formValues, handleInputChange, reset] = useForm(alumnoActivo);

    const {nombre, pais, celular, plan, costo, fechaInicio} = formValues;







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
    //  const cambioFormulario = useRef(formValues)
     useEffect(() => {

        dispatch(activarAlumno(formValues.id, {...formValues}));
        
    // }, [])
    }, [formValues])


    const handleGuardarCambios = ()=>{
        // Eliminamos la dieta para cargar a la db
        const alumnoGuardar = {...alumnoActivo};
        delete alumnoGuardar.dieta;

        dispatch(guardarAlumno(alumnoActivo, alumnoGuardar));
        // dispatch(cierraFormulario());
        const fichaShow = document.getElementById("formulario");
        botonRef.current.click();

    }


    const cerrarFormulario = ()=>{
        // dispatch(cierraFormulario());
    }


    const handleBorrar = ()=>{
        dispatch(eliminarAlumno(alumnoActivo.id, alumnoActivo.dietaId));
        botonRef.current.click();
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
        { code: '21', name: 'Panamá' },
        { code: '22', name: 'Paraguay' },
        { code: '23', name: 'Perú' },
        { code: '24', name: 'Puerto Rico' },
        { code: '25', name: 'República Dominicana' },
        { code: '26', name: 'Reino Unido' },
        { code: '27', name: 'Sudáfrica' },
        { code: '28', name: 'Uruguay' },
        { code: '29', name: 'Venezuela' },
        { code: '30', name: 'Estados Unidos' },
        // Agrega más países según sea necesario
    ];






    // cierra el modal cuando se presiona back en un dispositivo movil
    useEffect(() => {
    const handleBackButton = (event) => {
        const modal = document.getElementById('formulario');
        if (modal) {
        event.preventDefault();
        // Simula el boton cerrar del modal
        botonRef.current.click();
        // window.history.back(); // Regresa al estado anterior
        }
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
        window.removeEventListener('popstate', handleBackButton);
    };
    }, []);



    return (
    <div>

        <form className="container bg-black bg-gradient form-control border-info w-100 h-100 rounded-end position-relative">
            <div><h3 className="text-white fw-light text-center">FORMULARIO</h3></div>
            <div className="container d-flex flex-column ">
                <input  type="text" name="nombre" className="bg-white bg-opacity-10 color-white rounded border-info-subtle mb-2 mt-1 mx-0 p-2" placeholder="Nombre" value={nombre} onChange={handleInputChange}></input>
                
                <select  name="pais" className="bg-white bg-opacity-10 color-white rounded border-info-subtle mb-2 mt-1 mx-0 p-2" value={pais} onChange={handleInputChange}>
                    <option className="bg-dark" value="">--Seleccione un país--</option>
                    {countries.map((country) => (
                    <option className="bg-dark" key={country.name} >
                        {country.name}
                    </option>
                    ))}
                </select>

                <input  type="text" name="celular" className="bg-white bg-opacity-10 color-white rounded border-info-subtle mb-2 mt-1 mx-0 p-2" placeholder="Celular" value={celular} onChange={handleInputChange}></input>
                {/* <input  type="text" name="ficha" className="bg-white bg-opacity-10 color-white rounded border-info-subtle mb-2 mt-1 mx-0 p-2" placeholder="Ficha" value={ficha} onChange={handleInputChange}></input> */}
                <input  type="text" name="plan" className="bg-white bg-opacity-10 color-white rounded border-info-subtle mb-2 mt-1 mx-0 p-2" placeholder="Plan" value={plan} onChange={handleInputChange}></input>
                <input  type="text" name="costo" className="bg-white bg-opacity-10 color-white rounded border-info-subtle mb-2 mt-1 mx-0 p-2" placeholder="Costo" value={costo} onChange={handleInputChange}></input>
                <input  type="date" name="fechaInicio" className="bg-white bg-opacity-10 color-white rounded border-info-subtle mb-2 mt-1 mx-0 p-2" placeholder="Fecha de Inicio" value={fechaInicio} onChange={handleInputChange}></input>
                {/* <input  type="date" name="fechaFinal" className="bg-white bg-opacity-10 color-white rounded border-info-subtle mb-2 mt-1 mx-0 p-2" placeholder="Fecha Final" value={fechaFinal} onChange={handleInputChange}></input> */}




                    
                    



            </div>
            <div className="d-flex justify-content-between">
                <div onClick={()=>handleGuardarCambios()} className="mt-3 btn btn-outline-info me-2 mb-3 mx-2 w-50">Guardar</div>
                <div ref={botonRef} onClick={()=>cerrarFormulario()} data-bs-dismiss="modal" type="button" className="mt-3 btn btn-outline-light opacity-75 fw-semibold me-2 mb-3 mx-2 w-50">Cerrar</div>
            </div>
                
            <div onClick={()=>handleBorrar()} className="btn btn-outline-danger px-3 py-0 mt-2 fw-semibold border-0 position-absolute top-0 end-0">Eliminar</div>
        </form>

    </div>
  )
}
