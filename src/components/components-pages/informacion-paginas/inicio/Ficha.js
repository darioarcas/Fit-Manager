// import { Dietas } from "../../Dietas"
// import { Rutinas } from "../../Rutinas"
// import { DietaAlumno } from "./DietaAlumno"
import { useEffect } from "react";
import PdfGenerator from "./pdf/PdfGenerator"
import { PreguntasFrecuentes } from "./PreguntasFrecuentes"
import { ProgresoAlumno } from "./ProgresoAlumno"
// import { RutinaAlumno } from "./RutinaAlumno"


export const Ficha = ({alumnoActivo, botonFicha}) => {


  // cierra el modal cuando se presiona back en un dispositivo movil
  useEffect(() => {
    const handleBackButton = (event) => {
      const modal = document.getElementById('ficha');
      if (modal && modal.classList.contains('cargar-ficha')) {
        event.preventDefault();
        // Simula el boton cerrar del modal
        botonFicha.current.click();
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
        
        <div className="d-flex justify-content-center">
            <h3 className="text-center text-dark fw-semi-bold fs-4 text-uppercase w-75 my-3">Ficha de {alumnoActivo.nombre}</h3>
        </div>

        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Dieta</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Rutina</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Progreso</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="preguntas-tab" data-bs-toggle="tab" data-bs-target="#preguntas-tab-pane" type="button" role="tab" aria-controls="preguntas-tab-pane" aria-selected="false">Preguntas</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          {/* DIETA */}
          <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0"><PdfGenerator numero={1}/></div>
          {/* RUTINA */}
          <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0"><PdfGenerator numero={2}/></div>
          {/* <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0"><RutinaAlumno/></div> */}
          {/* PROGRESO */}
          <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0"><ProgresoAlumno/></div>
          {/* PREGUNTAS */}
          <div className="tab-pane fade" id="preguntas-tab-pane" role="tabpanel" aria-labelledby="preguntas-tab" tabIndex="0"><PreguntasFrecuentes/></div>
        </div>

    </div>
  )
}
