import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../../hooks/useForm"
import { useEffect, useRef } from "react";
import { activarAlumno, cierraFormulario, eliminarAlumno, guardarAlumno } from "../../../../actions/alumno";

export const AlumnoInfo = ({botonRef}) => {


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
        const fichaShow = document.getElementById("formulario");
        botonRef.current.click();
        // var backdrop = document.getElementsByClassName("modal-backdrop");
        // const body = document.body;
        // fichaShow.classList.remove("show");
        // fichaShow.style = "display: none";
        // console.log("FICHASHOW   ", fichaShow);
        // // Reemplaza aria-modal por aria-hidden
        // if (fichaShow.hasAttribute('aria-modal')) {
        //     fichaShow.removeAttribute('aria-modal'); // Elimina el atributo aria-modal
        //     fichaShow.removeAttribute('role'); // Elimina el atributo aria-modal
        //     fichaShow.setAttribute('aria-hidden', 'true'); // Agrega el atributo aria-hidden
        // }
        // backdrop[0].remove();
        // body.classList = "";
        // body.style = "";
        // var myModal = new bootstrap.Modal(document.getElementById('formulario'));
        // myModal.hide(); // Cierra el modal

    }


    const cerrarFormulario = ()=>{
        dispatch(cierraFormulario());
    }


    const handleBorrar = ()=>{
        dispatch(eliminarAlumno(alumnoActivo.id));
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





    return (
    <div>

        <form className="container bg-black form-control border-info w-100 h-100 rounded-end">
            <div className="container d-flex flex-column ">
                <input  type="text" name="nombre" className="bg-white bg-opacity-10 color-white rounded border-success mb-2 mt-1 mx-0 p-2" placeholder="Nombre" value={nombre} onChange={handleInputChange}></input>
                
                <select  name="pais" className="bg-white bg-opacity-10 color-white rounded border-success mb-2 mt-1 mx-0 p-2" value={pais} onChange={handleInputChange}>
                    <option className="bg-dark" value="">--Seleccione un país--</option>
                    {countries.map((country) => (
                    <option className="bg-dark" key={country.name} >
                        {country.name}
                    </option>
                    ))}
                </select>

                <input  type="text" name="celular" className="bg-white bg-opacity-10 color-white rounded border-success mb-2 mt-1 mx-0 p-2" placeholder="Celular" value={celular} onChange={handleInputChange}></input>
                {/* <input  type="text" name="ficha" className="bg-white bg-opacity-10 color-white rounded border-success mb-2 mt-1 mx-0 p-2" placeholder="Ficha" value={ficha} onChange={handleInputChange}></input> */}
                <input  type="text" name="plan" className="bg-white bg-opacity-10 color-white rounded border-success mb-2 mt-1 mx-0 p-2" placeholder="Plan" value={plan} onChange={handleInputChange}></input>
                <input  type="text" name="costo" className="bg-white bg-opacity-10 color-white rounded border-success mb-2 mt-1 mx-0 p-2" placeholder="Costo" value={costo} onChange={handleInputChange}></input>
                <input  type="date" name="fechaInicio" className="bg-white bg-opacity-10 color-white rounded border-success mb-2 mt-1 mx-0 p-2" placeholder="Fecha de Inicio" value={fechaInicio} onChange={handleInputChange}></input>
                {/* <input  type="date" name="fechaFinal" className="bg-white bg-opacity-10 color-white rounded border-success mb-2 mt-1 mx-0 p-2" placeholder="Fecha Final" value={fechaFinal} onChange={handleInputChange}></input> */}




                    
                    



            </div>
            <div className="d-flex">
                <div onClick={()=>handleGuardarCambios()} className="mt-3 btn btn-outline-success me-2 mb-3 ml-5">Guardar Cambios</div>
                <div onClick={()=>handleBorrar()} className="mt-3 btn btn-outline-success me-2 mb-3 ml-5">Eliminar Alumno</div>
            </div>
            {/* <div ref={botonRef} onClick={()=>cerrarFormulario()} data-bs-dismiss="modal" type="button" className="mt-3 btn btn-outline-success me-2 mb-3 ml-5">Cerrar Formulario</div> */}
        </form>

    </div>
  )
}
