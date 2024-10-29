import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { RutinaAlumno } from '../RutinaAlumno';
import { DietaAlumno } from '../DietaAlumno';
import { useSelector } from 'react-redux';

const PdfGenerator = ({numero=false}) => {
  const sectionRef = React.useRef();
  const alumnoNombre = useSelector(reducer=>reducer.alumnos.active.nombre);
  const nombreArchivo = ["Dieta", "Rutina", "Recetas", "Progreso"];

  const handleDownloadPdf = () => {
    html2canvas(sectionRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // Definir un tamaño de página personalizado (ancho, alto)
      const pdfWidth = 210; // Ancho en mm
      const pdfHeight = 700; // Alto en mm (mayor que A4)

      const pdf = new jsPDF({
        orientation: 'portrait', // o 'landscape' para horizontal
        unit: 'mm',
        format: [pdfWidth, pdfHeight], // Tamaño personalizado
        putOnlyUsedFonts: true,
        floatPrecision: 16 // Precisión flotante
      });


      const imgWidth = 190; // Ancho de la imagen en mm
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${nombreArchivo[numero - 1]} - ${alumnoNombre}.pdf`);
    });
  };


  

  return (
    <div>
        <button className='btn btn-outline-danger btn-sm mt-2 fw-bold position-absolute me-3 end-0' style={{}} onClick={handleDownloadPdf}>PDF</button>
        <div ref={sectionRef} style={{}}>
        {/* <h1>Sección a convertir en PDF</h1>
        <p>Este es el contenido que se incluirá en el PDF.</p> */}
        {(numero === 1) && <DietaAlumno/>}
        {(numero === 2) && <RutinaAlumno/>}
        {(numero === 3) && <RutinaAlumno/>}
        {(numero === 4) && <RutinaAlumno/>}
        </div>
    </div>
  );
};

export default PdfGenerator;