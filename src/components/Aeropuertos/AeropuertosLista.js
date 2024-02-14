import React from "react"
import aeropuertosService from "../../services/aeropuertosService"
import { eliminarAeropuerto } from "../../reducers/aeropuertoReducer"
import { useDispatch, useSelector } from "react-redux"
import { RiDeleteBin5Line } from "react-icons/ri"
import { Box } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"

const AeropuertosLista = () => {
  const dispatch = useDispatch()
  const aeropuertos = useSelector((state) => state.aeropuertos)

  const confirmarEliminacion = async (idAeropuerto) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esto?")
    if (confirmacion) {
      await aeropuertosService.deleteAeropuerto(idAeropuerto)
      dispatch(eliminarAeropuerto(idAeropuerto))
    }
  }

  const columns = [
  { field: "idaeropuerto", headerName: "Código", flex: 1 },
  { field: "nombre", headerName: "Nombre", flex: 1 },
  { field: "ciudad", headerName: "Ciudad", flex: 1 },
  { field: "pais", headerName: "País", flex: 1 },
  { field: "latitud", headerName: "Latitud", flex: 1 },
  { field: "longitud", headerName: "Longitud", flex: 1 },
  { field: "timezone", headerName: "Zona Horaria", flex: 1 },
  {
    field: "acciones",
    headerName: "Acciones",
    sortable: false,
    flex: 1,
    renderCell: (params) => (
      <button
        onClick={() => confirmarEliminacion(params.row.idaeropuerto)}
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
        rows={aeropuertos}
        columns={columns}
        getRowId={(row) => row.idaeropuerto}
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  )
}

export default AeropuertosLista
