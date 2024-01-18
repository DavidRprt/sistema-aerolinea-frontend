import React from "react"
import { Box } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { useDispatch, useSelector } from "react-redux"
import { eliminarModelo } from "../../reducers/modeloReducer"
import avionesService from "../../services/avionesService"
import { RiDeleteBin5Line } from "react-icons/ri"

const ModelosLista = () => {
  const dispatch = useDispatch()
  const modelos = useSelector((state) => state.modelos)

  const confirmarEliminacion = async (idModelo) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esto?")
    if (confirmacion) {
      await avionesService.deleteModelo(idModelo)
      dispatch(eliminarModelo(idModelo))
    }
  }


  const columns = [
    { field: "idmodelo", headerName: "ID", flex: 1 },
    { field: "modelo", headerName: "Modelo", flex: 1 },
    { field: "autonomia", headerName: "Autonomía (km)", flex: 1 },
    {
      field: "acciones",
      headerName: "Acciones",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <button
          onClick={() => confirmarEliminacion(params.row.idmodelo)}
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
        rows={modelos}
        columns={columns}
        getRowId={(row) => row.idmodelo}
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  )
}

export default ModelosLista
