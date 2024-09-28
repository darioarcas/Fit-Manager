import React, { useEffect, useState } from 'react';












export const Calculadora = () => {




  // const MidiController = () => {
  //   const [ccMessages, setCcMessages] = useState([]);
  //   const [cambios, setCambios] = useState(0)
  
  //   useEffect(() => {
  //     const handleMIDIMessage = (event) => {
  //       const [status, control, value] = event.data;
  
  //       // Verifica si es un mensaje de Control Change (CC)
  //       if (status >= 176 && status <= 191) { // 176-191 son los códigos para Control Change en canales 1-16
  //         // Agrega el mensaje CC a la lista
  //         setCcMessages((prevMessages) => [
  //           ...prevMessages,
  //           { control, value }
  //         ]);
  
  //         // Muestra el valor del potenciómetro como porcentaje
  //         const percentage = Math.round((value / 127) * 100);
  //         // setCambios(value);
  //         console.log(`Control Change - CC: ${control}, Valor: ${value} (${percentage}%)`);
  //         // console.log(ccMessages[1].value);
  //       }
  //     };
  
  //     const initMIDI = async () => {
  //       try {
  //         const midiAccess = await navigator.requestMIDIAccess();
  //         const inputs = midiAccess.inputs;
  
  //         inputs.forEach((input) => {
  //           input.onmidimessage = handleMIDIMessage;
  //         });
  //       } catch (error) {
  //         console.error('Error al acceder a dispositivos MIDI:', error);
  //       }
  //     };
  
  //     initMIDI();
  //   }, []);
  
  //   return (
  //     <div>
  //       <h1>Controlador MIDI</h1>
  //       <h2>Mensajes CC Recibidos:</h2>
  //       {/* {cambios} */}
  //       <ul>
          
  //         {/* {ccMessages.map((msg, index) => (
  //           <li key={index}>
  //             CC: {msg.control}, Valor: {msg.value}
  //           </li>
  //         ))} */}
  //       </ul>
  //     </div>
  //   );
  // };







  // return (
  //   <div style={{color:"white"}}>{MidiController()}</div>
  // )
}










