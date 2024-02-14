 import React, { useState } from "react"

 const FiltrarTripulantes = ({ setFiltro }) => {
   const [criterio, setCriterio] = useState("")

   const handleFilter = () => {
     switch (criterio) {
       case "antiguedad":
         setFiltro((tripulantes) => {
           return [...tripulantes].sort((a, b) => {
             return new Date(a.fechaIngreso) - new Date(b.fechaIngreso)
           })
         })
         break

       case "cargo":
         setFiltro((tripulantes) => {
           return [...tripulantes].sort((a, b) => a.idCargo - b.idCargo)
         })
         break

       case "nombre":
         setFiltro((tripulantes) => {
           return [...tripulantes].sort((a, b) => {
             if (a.idApellido < b.idApellido) return -1
             if (a.idApellido > b.idApellido) return 1
             return 0
           })
         })
         break

       default:
         setFiltro((tripulantes) => tripulantes) // En caso de que no haya un criterio seleccionado, simplemente devuelve la lista original.
     }
   }

   return (
     <div className="container mx-auto p-4">
       <div className="bg-white p-4 border border-gray-300 rounded">
         <div className="mb-4">
           <label
             className="block text-gray-700 text-sm font-bold mb-2"
             htmlFor="criterio"
           >
             Ordenar por
           </label>
           <select
             id="criterio"
             value={criterio}
             onChange={(e) => setCriterio(e.target.value)}
             className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           >
             <option value="">Selecciona un criterio</option>
             <option value="antiguedad">Antigüedad</option>
             <option value="cargo">Cargo</option>
             <option value="nombre">Nombre</option>
           </select>
         </div>

         <div className="flex items-center justify-end">
           <button
             onClick={handleFilter}
             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           >
             Filtrar
           </button>
         </div>
       </div>
     </div>
   )
 }

 export default FiltrarTripulantes
