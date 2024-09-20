import React, { useState } from 'react';
import './App.css';

function App() {
  const [edad, setEdad] = useState('');
  const [puntuacion, setPuntuacion] = useState('');
  const [ci, setCi] = useState(null);

  const calcularCI = () => {
    if (edad && puntuacion) {
      // Fórmula simple para calcular CI: (Puntuación / Edad) * 100
      const resultado = (parseInt(puntuacion) / parseInt(edad)) * 100;
      setCi(resultado);
    }
  };

  return (
    <div className="App">
      <h1 style={{color:"white"}}>Calculadora de CI</h1>
      <div>
        <label style={{color:"white"}}>
          Edad:
          <input 
            type="number" 
            value={edad} 
            onChange={(e) => setEdad(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label style={{color:"white"}}>
          Puntuación:
          <input 
            type="number" 
            value={puntuacion} 
            onChange={(e) => setPuntuacion(e.target.value)} 
          />
        </label>
      </div>
      <button onClick={calcularCI} style={{color:"white", marginBottom: "200px"}}>Calcular CI</button>

      {ci !== null && (
        <h2 style={{color:"white"}}>Tu CI es: {ci.toFixed(2)}</h2>
      )}
    </div>
  );
}

export default App;