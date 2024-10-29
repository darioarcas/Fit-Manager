import React from 'react'
import { preguntasFrecuentes } from './dieta-alumno/ArraysDietaAlumno'

export const PreguntasFrecuentes = () => {
  return (
    <div>
        {/* PREGUNTAS FRECUENTES */}
        <div style={{width:"98%", margin:"0 auto"}}>
        <h4 className='bg-dark text-center text-white p-2 mt-5 mb-4 w-85 fs-6' style={{fontWeight: "normal", textTransform: "uppercase", borderRadius:"4px"}}>Preguntas Frecuentes</h4>
        </div>

        <div style={{width:"90%", margin:"0 auto"}}>
            { preguntasFrecuentes.map((preguntas)=>{
            return <div>
                <p className='fw-semibold my-0'>{preguntas.pregunta}</p>
                <p className='fw-normal'>{preguntas.respuesta}</p>
            </div>
            })}
        </div>
    </div>
  )
}
