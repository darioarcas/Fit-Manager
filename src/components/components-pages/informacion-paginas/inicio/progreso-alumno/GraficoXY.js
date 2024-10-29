import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';


// instalar las dependencias: npm install chart.js react-chartjs-2

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export const GraficoXY = ({semanaYPeso}) => {
const datos = [];
// Si no hay datos iniciales
if(semanaYPeso === undefined || semanaYPeso === null){
    datos[0] = [
        { x: 1, y: 0 }
    ];
}
else{
    // Quita los datos en cero y menores a 10kg
    const quitarDatosEnCero = [];
    semanaYPeso.map((valor)=>{
        if(valor.y > 10) return quitarDatosEnCero.push(valor);
        return valor;
    })
    datos[0] = quitarDatosEnCero;
}
const blanco = "#fff";
// const grisOscuro = "#545454";
const grisClaro = "#ced3d3";
// const negro = "#000000";

const colorLetrasGrafico = grisClaro;
const colorFondo = blanco;
  // Datos de ejemplo: semanas y pesos
const data = {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
        datasets: [
            {
            label: 'Peso (kg)',
            data: datos[0],
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
            fill: false,
            showLine: true,
            },
        ],
    };

  const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top',
        },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Semanas',
                color:  colorLetrasGrafico,
            },
            grid: {
                display: false // Oculta las líneas verticales
            },
            ticks:{
                color: colorLetrasGrafico // Color de las etiquetas del eje X
            }
        },
        y: {
            title: {
                display: true,
                text: 'Peso (kg)',
                color:  colorLetrasGrafico,
            },
            grid: {
                display: false // Oculta las líneas horizontales
            },
            ticks:{
                color: colorLetrasGrafico // Color de las etiquetas del eje Y
            }
        },
    },
    elements:{
        point:{
         radius :5 // Tamaño de los puntos
        }
    }
    };

    return (
        <div style={{ backgroundColor: colorFondo, margin: '20px 0', padding:"10px 0", borderRadius: '5px' }} className='text-bg-dark'>
          <h2 style={{ color:  colorLetrasGrafico , textAlign: "center"}}>Progreso de Peso</h2>
          <Scatter data={data} options={options} />
        </div>
      );
};