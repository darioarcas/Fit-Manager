import React from 'react';

export const ContadorDeDias = ({ startDate, months }) => {

    // Convertir la fecha inicial a un objeto Date
    const start = new Date(startDate);

    // Calcular la fecha final sumando los meses
    const end = new Date(start);
    end.setMonth(start.getMonth() + months);

    // Calcular los días restantes
    const now = new Date();
    const timeDiff = end - now; // Diferencia en milisegundos
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convertir a días

   

    return (
        <div>
            {daysRemaining > 0 ? (
                <p className="card-text m-0 fw-semibold" style={{color:"#91ded8"}}>Finaliza en: <p className='d-inline text-info opacity-75'>{daysRemaining}</p> días</p>
            ) : (
                <p className='card-text m-0 fw-semibold text-danger opacity-50'>Finalizó</p>
            )}
        </div>
    );
};
