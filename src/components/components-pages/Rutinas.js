import React, { useEffect, useState } from 'react';
import { BarTool } from './informacion-paginas/rutinas/BarTool';
import { ejercicios } from './informacion-paginas/rutinas/RutinasArreglos';



const rutinaInit = [
  {
    ejercicio: "",
    img: "",
    video: ""
  },
  {
    ejercicio: "",
    img: "",
    video: ""
  },
  {
    ejercicio: "",
    img: "",
    video: ""
  }
]



export const Rutinas = () => {


  const [seleccionado, setSeleccionado] = useState(ejercicios[0]);
  const [imgs, setImgs] = useState("");
  const [rutina, setRutina] = useState(rutinaInit);
  const [numeroRutinas, setNumeroRutinas] = useState(rutina.length)



  const handleSelectChange = (e) => {
    // Devuelve el primer elemento del array que cumple con la condición
    const alimentoSeleccionado = ejercicios.find(a => a.ejercicio === e.target.value);
    // console.log(alimentoSeleccionado.img);
    setSeleccionado(alimentoSeleccionado);
    img(alimentoSeleccionado);
  };


  const img = (e)=>{
    
    setImgs(e.img);
  }

  useEffect(() => {
    setNumeroRutinas(rutina.length);
  }, [rutina])
  

  const botonAgregar = (e)=>{

    if(rutina.length <= 6){

        console.log(e.target.value);
        setRutina( [...rutina ,
          {
          ejercicio: "",
          img: "",
          video: ""
        }]);
    
        console.log(rutina.length);
    }
  }

  const botonQuitar = ()=>{

    setRutina( rutina.slice(0, rutina.length - 1));
    console.log(rutina.length);
  }
  


  return (
    <div className='d-flex justify-content-center positon-relative'>

      <div className='mt-5' style={{width:"95%"}}>

        <table class="table align-middle table-borderless table-sm">
          <thead >
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ejercicio</th>
              <th scope="col">IMG</th>
              <th scope="col">Video</th>
              <th scope="col">Pausa</th>
              <th scope="col">Ejecucion</th>
            </tr>
          </thead>
          <tbody>
            

            {
              rutina.map((rutinas, index)=> { return(
                <tr>
                  <th scope="row">{index +1}</th>


                    <td style={{width:"20%"}}>
                      {/* El select debe tener el value guardado del objeto en la base de datos value={el alimento de la base de datos} */}
                      <select id="alimento" onChange={handleSelectChange}  value={seleccionado.ejercicio} className="me-2 fs-6 rounded" style={{height:"30px", color:"black", width:"100%", border:"none"}}>
                        {ejercicios.map((elemento) => (
                          <option key={elemento.ejercicio} value={elemento.ejercicio}>
                            {elemento.ejercicio}
                          </option>
                        ))}
                      </select>
                    </td>


                    <td style={{width:"20%"}}>
                      <div style={{backgroundSize: 'cover', backgroundImage: `url(${imgs})`}}>
                      {imgs && <iframe src={imgs} width="100%" height="40px" allow="autoplay"></iframe>}
                      </div>
                    </td>

                    <td>video</td>

                    <td>
                      <select style={{border:"none"}}>
                        <option>25seg</option>
                        <option>30seg</option>
                        <option>40seg</option>
                        <option>1min</option>
                        <option>1-2min</option>
                        <option>2-3min</option>
                        <option>3-5min</option>
                      </select>
                    </td>


                    <td>video</td>
                </tr>
              )})
            }

              




            
          </tbody>
        </table>
        
        
      </div>
      

      


      <div className='position-fixed bottom-0 bg-black w-100 px-4 py-1 pb-4' style={{opacity:"30%"}}>
        <BarTool botonAgregar={botonAgregar} botonQuitar={botonQuitar} numeroRutinas={numeroRutinas}/>
      </div>
    </div>
  )
}
