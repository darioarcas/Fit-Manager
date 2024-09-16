import React from 'react'
import { BarTool } from './informacion-paginas/rutinas/BarTool'

export const Rutinas = () => {
  return (
    <div className='d-flex justify-content-center'>

      <div className='w-75 text-whitetable-responsive'>

        <table class="table table-dark table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
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
        
        <BarTool/>
        
      </div>

    </div>
  )
}
