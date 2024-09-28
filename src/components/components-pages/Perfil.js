import React, { useState, useEffect } from 'react';


export const Perfil = () => {






  // const CountdownTimer = () => {
  //   const [startDate, setStartDate] = useState('');
  //   const [months, setMonths] = useState(0);
  //   const [endDate, setEndDate] = useState(null);
  //   const [daysLeft, setDaysLeft] = useState(0);
  
  //   useEffect(() => {
  //     let interval;
  //     if (endDate) {
  //       interval = setInterval(() => {
  //         const now = new Date();
  //         const timeLeft = endDate - now;
  //         const daysRemaining = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
  
  //         if (daysRemaining >= 0) {
  //           setDaysLeft(daysRemaining);
  //         } else {
  //           clearInterval(interval);
  //           setDaysLeft(0); // Si ya pasó la fecha
  //         }
  //       }, 1000);
  
  //       return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  //     }
  //   }, [endDate]);
  
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const start = new Date(startDate);
  //     const end = new Date(start.setMonth(start.getMonth() + parseInt(months)));
  //     setEndDate(end);
  //     setDaysLeft(Math.ceil((end - new Date()) / (1000 * 60 * 60 * 24))); // Calcular días restantes inicialmente
  //   };
  
  //   return (
  //     <div>
  //       <h1>Contador de Días</h1>
  //       <form onSubmit={handleSubmit}>
  //         <div>
  //           <label>
  //             Fecha de Inicio:
  //             <input 
  //               type="date" 
  //               value={startDate} 
  //               onChange={(e) => setStartDate(e.target.value)} 
  //               required 
  //             />
  //           </label>
  //         </div>
  //         <div>
  //           <label>
  //             Cantidad de Meses:
  //             <input 
  //               type="number" 
  //               value={months} 
  //               onChange={(e) => setMonths(e.target.value)} 
  //               min="1" 
  //               required 
  //             />
  //           </label>
  //         </div>
  //         <button type="submit">Calcular</button>
  //       </form>
  
  //       {endDate && (
  //         <div>
  //           <h2>Tiempo restante:</h2>
  //           {daysLeft > 0 ? (
  //             <p>Quedan {daysLeft} días hasta el plazo final.</p>
  //           ) : (
  //             <p>El plazo ha terminado.</p>
  //           )}
  //         </div>
  //       )}
  //     </div>
  //   );
  // };










  // return (
  //   <div style={{color:"white"}}>{CountdownTimer()}</div>
  // )
}








