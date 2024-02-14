import React from "react"
import { Box } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import avionesService from "../../services/avionesService"
import { RiDeleteBin5Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { eliminarAvion } from "../../reducers/avionReducer"

const AvionesLista = () => {
  const dispatch = useDispatch()
  const aviones = useSelector((state) => state.aviones)

  const confirmarEliminacion = async (idAvion) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esto?")
    if (confirmacion) {
      await avionesService.deleteAvion(idAvion)
      dispatch(eliminarAvion(idAvion))
    }
  }

   const columns = [
     { field: "idavion", headerName: "ID", flex: 0.5},
     { field: "nombre", headerName: "Nombre", flex: 1 },
     { field: "año", headerName: "Año", flex: 1 },
     { field: "capacidadturista", headerName: "Capacidad Turista", flex: 1 },
     { field: "capacidadpremium", headerName: "Capacidad Premium", flex: 1 },
     { field: "capacidadbusiness", headerName: "Capacidad Business", flex: 1 },
     {
       field: "modelo",
       headerName: "Modelo",
       flex: 1,
       valueGetter: (params) => params.row.modeloavion.modelo,
     },
     {
       field: "acciones",
       headerName: "Acciones",
       sortable: false,
       flex: 1,
       renderCell: (params) => (
         <button
           onClick={() => confirmarEliminacion(params.row.idavion)}
           style={{ cursor: "pointer" }}
         >
           <RiDeleteBin5Line />
         </button>
       ),
     },
   ]

  return (
      <Box sx={{ height: "75vh", width: "100%" }}>
        <DataGrid
          rows={aviones}
          columns={columns}
          getRowId={(row) => row.idavion}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
  )
}

export default AvionesLista
