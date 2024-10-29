import React, { useEffect, useState } from 'react'
import { GraficoXY } from './progreso-alumno/GraficoXY'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react';
import { activarDieta } from '../../../../actions/dietas';
import { activarDietaAlumno } from '../../../../actions/alumno';
import { listaObjetivos } from './progreso-alumno/ArraysProgreso';

export const ProgresoAlumno = () => {

    const dispatch = useDispatch();

    const dieta =  useSelector (store=>{ return store.alumnos.active.dieta[0]});
    const alumnoActivo = useSelector(reducer => reducer.alumnos.active);
    const cargaFicha = useSelector(reducer => reducer.alumnos.carga);

    // const [semanas, setSemanas] = useState(alumnoActivo.plan * 4);
    const semanas = alumnoActivo.plan * 4;
    const completarSemanas = [];
    for (let i = 0; i < semanas; i++) {
        completarSemanas[i] = {x: i+1};        
    }
    const [semanaYPeso, setSemanaYPeso] = useState(completarSemanas);
    const [pesoYNota, setPesoYNota] = useState({semana1: {peso: 0, nota:""}});

    const [datoUsuario, setDatoUsuario] = useState(false);






    const cargaFichaAnt = useRef(cargaFicha);
    useEffect(() => {
        if(cargaFicha === false){
            cargaFichaAnt.current = "habilitar en la primer carga";
        }
    }, [cargaFicha, alumnoActivo.id])
    



    useEffect(() => {
        if(cargaFicha === true && cargaFichaAnt.current !== cargaFicha && datoUsuario === false){
            cargaFichaAnt.current = cargaFicha;
            const objetoProgreso = alumnoActivo.dieta[0].progreso;

            // comprobamos si existe el progreso en la base de datos
            if(Object.keys(objetoProgreso).length !== 0){
                cargarSemanas(semanas);
                setPesoYNota(prev=>({...prev, ...objetoProgreso}));

                // cargamos los valores de la db en el grafico
                setSemanaYPeso(combinarObjetoEnArreglo(objetoProgreso));




                // const dietaId = alumnoActivo.dietaId;
                // dispatch(activarDieta(dietaId,{ ...dieta, progreso: pesoYNota}));
                // // Actualiza el Reducer del Alumno (dieta del Alumno)
                // dispatch(activarDietaAlumno(dietaId, {...dieta, progreso: pesoYNota}));

                // // Ordenar las claves de menor a mayor
                // setPesoYNota(Object.fromEntries(
                //     Object.entries(pesoYNota).sort(([claveA], [claveB]) => claveA.localeCompare(claveB))
                // ));
            }

            // si no existe pero el plan es por lo menos de 1 mes
            else if(semanas !== 0){
                cargarSemanas(semanas);
                setSemanaYPeso(combinarObjetoEnArreglo(objetoProgreso));

                // const dietaId = alumnoActivo.dietaId;
                // dispatch(activarDieta(dietaId,{ ...dieta, progreso: pesoYNota}));
                // // Actualiza el Reducer del Alumno (dieta del Alumno)
                // dispatch(activarDietaAlumno(dietaId, {...dieta, progreso: pesoYNota}));
            }
        }
    }, [cargaFicha])
    





    useEffect(() => {
        if(cargaFicha && datoUsuario === true){

            const dietaId = alumnoActivo.dietaId;
            dispatch(activarDieta(dietaId,{ ...dieta, progreso: pesoYNota}));
            // Actualiza el Reducer del Alumno (dieta del Alumno)
            dispatch(activarDietaAlumno(dietaId, {...dieta, progreso: pesoYNota}));
        }
    }, [pesoYNota, alumnoActivo.dieta[0].progreso]);
    





    const combinarObjetoEnArreglo = (objetoProgreso)=>{
        // cargamos los valores de la db en el grafico
        Object.entries(objetoProgreso).forEach(([clave, valor])=>{
            const index = parseInt(clave.replace("semana", "")) - 1;
            completarSemanas[index] = {...completarSemanas[index], y: valor.peso};
        });
        return completarSemanas;
    }






    const cargarSemanas = (semanas)=>{
        setPesoYNota(prev=>({}));
        const arregloProgreso = [];
        // Creamos los Objetos de semanas
        for (let i = 0; i < semanas; i++) {
            const semana = `semana${i+1}`;
            arregloProgreso[i] = {[semana]:{peso:"", nota:""}}                
        }
        // Agregamos las semanas a progreso
        arregloProgreso.forEach((objeto, index)=>{
            Object.entries(objeto).forEach(([clave, valor])=>{
                setPesoYNota((prev)=>({...prev, [clave]: valor}));
            })
        });
    }

    




    // Manejo de carga de datos de la db
    // Mientras se esten cargando los datos de la ficha, no toma otros valores
    if(!cargaFicha && datoUsuario){
        setDatoUsuario(false);
    }

    const clickPesoONota = ()=>{
        // Habilita la carga de nuevos datos que el usuario ingrese
        setDatoUsuario(true);
    }





    const cambioPesoYNota = (e, pesoONota, i)=>{
        // setDatoUsuario(true);
        const valor = (pesoONota === "nota") ? e.target.value : e.target.value;
        const clave = e.target.name;
        const semana = `semana${i+1}`;
        // Almacenamos la semana que va a modificarse
        const semanaCambiada = [];
        Object.entries(pesoYNota).forEach(([clave, valor])=>{
            if(clave === semana){
                semanaCambiada[0] = valor
            }
        });
        setPesoYNota({...pesoYNota, [semana]: {...semanaCambiada[0], [clave]: valor}});
        if(pesoONota === "peso"){
            const valorNuevo = semanaYPeso.find(objeto=>objeto.x === (i+1));
            const nuevo = {...valorNuevo, y: valor};
            const arregloNuevo = semanaYPeso.map((objeto)=>{
                if(objeto.x === (i+1)) return nuevo;
                return objeto;
            })
            setSemanaYPeso(arregloNuevo);
        }
    }



  return (
    <div>

        <h2 className='text-center mt-4'>Datos de Progreso</h2>

        <div style={{display:"flex", justifyContent:"center"}}>
            <div className='w-75 text-bg-dark p-1 rounded'>
                <h6 className='fw-semibold'>Nombre: <p className='fw-normal d-inline'>{alumnoActivo.nombre}</p></h6>
                <h6 className='fw-semibold'>Plan: <p className='fw-normal d-inline'>{alumnoActivo.plan}</p></h6>
                <h6 className='fw-semibold'>inicio: <p className='fw-normal d-inline'>{alumnoActivo.fechaInicio}</p></h6>
                <h6 className='fw-semibold'>Objetivo: 
                    <select className='w-75 text-bg-dark p-1 rounded'>
                        {
                            listaObjetivos.map((objetivo, index)=>{
                                return <option key={objetivo}>{objetivo}</option>
                            })
                        }
                    </select>
                </h6>
            </div>
        </div>


        <GraficoXY semanaYPeso = {semanaYPeso}/>


        <div className='m-2 p-2 text-bg-dark  rounded'>
            <div className='d-flex justify-content-between px-4 text-bg-subtle'>
                <h4 className='m-0'>Semana</h4>
                <h4 className='m-0'>Peso (kg)</h4>
                <h4 className='m-0'>Nota</h4>
            </div>
            {Object.entries(pesoYNota).map(([clave, valor])=>{
                const index = parseInt(clave.replace('semana', ''));

                return <div className='d-flex justify-content-between'>
                    <h6 className='w-100 text-center'>{index}</h6>
                    <input 
                        type='number'
                        onClick={clickPesoONota}
                        onChange={(e)=>{cambioPesoYNota(e, "peso", index - 1)}} 
                        name={`peso`} 
                        className='w-75 mx-3 text-bg-dark  border-0 text-center' 
                        value={valor.peso}
                    />
                    <input 
                        type='text'
                        onClick={clickPesoONota}
                        onChange={(e)=>{cambioPesoYNota(e, "nota", index - 1)}} 
                        name={`nota`} 
                        className='w-100 text-bg-dark  border-0' 
                        value={valor.nota}
                    />
                </div>
            })}
        </div>
    </div>
  )
}
