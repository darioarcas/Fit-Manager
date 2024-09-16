import React from 'react'
import { BarTool } from './informacion-paginas/rutinas/BarTool'

export const Rutinas = () => {
  return (
    <div className='d-flex justify-content-center positon-relative'>

      <div className='w-60 mt-5'>

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
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
        
        
      </div>

      <div className='position-fixed bottom-0 bg-black'>
        <BarTool/>
      </div>
    </div>
  )
}
