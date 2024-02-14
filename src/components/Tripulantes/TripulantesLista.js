import React, { useState, useEffect } from "react"
import tripulacionService from "../../services/tripulacionService"
import { Box } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { useNavigate } from "react-router-dom"
import IconButton from "@mui/material/IconButton"

const TripulanteTable = () => {
  const [tripulantes, setTripulantes] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTripulantes = async () => {
      try {
        const data = await tripulacionService.getAllTripulantes()
        setTripulantes(data)
      } catch (error) {
        console.error("Error al obtener los tripulantes:", error)
      }
    }

    fetchTripulantes()
  }, [])

  const handleViewDetails = (idtripulante) => {
    navigate(`/detalles-del-tripulante/${idtripulante}`)
  }

  const columns = [
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "apellido", headerName: "Apellido", flex: 1 },
    {
      field: "cargo",
      headerName: "Cargo",
      flex: 1,
      valueGetter: (params) => params.row.cargo.nombre,
    },
    {
      field: "tripulacion",
      headerName: "Nombre Tripulación",
      flex: 1,
      valueGetter: (params) => params.row.tripulacion.nombre,
    },
    {
      field: "detalles",
      headerName: "Ver Más",
      sortable: false,
      renderCell: (params) => {
        return (
          <IconButton
            aria-label="ver detalles"
            onClick={() => handleViewDetails(params.row.idtripulante)}
          >
            +
          </IconButton>
        )
      },
      flex: 0.5,
    },
  ]

  return (
    <Box sx={{ height: "75vh", width: "100%" }}>
      <DataGrid
        rows={tripulantes}
        columns={columns}
        getRowId={(row) => row.idtripulante}
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  )
}

export default TripulanteTable
