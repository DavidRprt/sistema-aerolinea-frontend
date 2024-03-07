import React, { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import rutasService from "../../services/rutasService"
import { RiDeleteBin5Line } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { eliminarRuta } from "../../reducers/rutaReducer"
import tripulacionService from "../../services/tripulacionService"

const RutasLista = () => {
  const dispatch = useDispatch()
  const rutas = useSelector((state) => state.rutas)
  const [tripulaciones, setTripulaciones] = useState([])

  const confirmarEliminacion = async (idRuta) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esto?")
    if (confirmacion) {
      await rutasService.deleteRuta(idRuta)
      dispatch(eliminarRuta(idRuta))
    }
  }

  useEffect(() => {
    const fetchCargos = async () => {
      try {
        const data = await tripulacionService.getAllTripulaciones()
        setTripulaciones(data)
      } catch (error) {
        console.error("Error al obtener los cargos:", error)
      }
    }

    fetchCargos()
  }, [])

  const columns = [
    { field: "idruta", headerName: "ID Ruta", flex: 0.5 },
    { field: "idorigen", headerName: "Origen", flex: 0.5 },
    { field: "iddestino", headerName: "Destino", flex: 0.5 },
    { field: "preciobase", headerName: "Precio Base", flex: 0.5 },
    { field: "horariosalida", headerName: "Horario de Salida", flex: 0.5 },
    { field: "duracion", headerName: "Duración (h)", flex: 0.5 },
    {
      field: "avion",
      headerName: "Avión",
      width: 200,
      valueGetter: (params) => params.row.avion.nombre,
    },
    { field: "lunes", headerName: "Lunes", flex: 0.5, type: "boolean" },
    { field: "martes", headerName: "Martes", flex: 0.5, type: "boolean" },
    {
      field: "miercoles",
      headerName: "Miércoles",
      width: 100,
      type: "boolean",
    },
    { field: "jueves", headerName: "Jueves", flex: 0.5, type: "boolean" },
    { field: "viernes", headerName: "Viernes", flex: 0.5, type: "boolean" },
    { field: "sabado", headerName: "Sábado", flex: 0.5, type: "boolean" },
    { field: "domingo", headerName: "Domingo", flex: 0.5, type: "boolean" },
    {
      field: "nombreTripulacion",
      headerName: "Tripulación",
      width: 200,
      valueGetter: (params) => {
        const tripulacion = tripulaciones.find(
          (t) => t.idtripulacion === params.row.idtripulacion
        )
        return tripulacion ? tripulacion.nombre : "No asignado"
      },
    },
    {
      field: "acciones",
      headerName: "Acciones",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <button
          onClick={() => confirmarEliminacion(params.row.idruta)}
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
        rows={rutas}
        columns={columns}
        getRowId={(row) => row.idruta}
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  )
}

export default RutasLista
