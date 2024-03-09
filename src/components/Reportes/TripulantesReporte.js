import React, { useEffect, useState } from "react"
import tripulacionService from "../../services/tripulacionService"
import { DataGrid } from "@mui/x-data-grid"
import { Box } from "@mui/material"
import { format } from "date-fns"

const TripulantesReporte = () => {
  const [cambios, setCambios] = useState([])
  const [cargos, setCargos] = useState([])
  const [tripulaciones, setTripulaciones] = useState([])

  useEffect(() => {
    const cargarLogs = async () => {
      const logsObtenidos = await tripulacionService.getLogs()
      const cargos = await tripulacionService.getAllCargos()
      const tripulaciones = await tripulacionService.getAllTripulaciones()
      setCargos(cargos)
      setTripulaciones(tripulaciones)
      const cambiosDetectados = detectarCambios(logsObtenidos)

      setCambios(cambiosDetectados)
    }

    cargarLogs()
  })

  function detectarCambios(arrayOriginal) {
    const cambios = []

    arrayOriginal.forEach((item) => {
      // Verificar cambio de nombre
      if (item.nombre_anterior !== item.nombre_actualizado) {
        cambios.push({
          usuario: {
            id: item.usuario_id,
            nombre: item.empleado.nombre,
            apellido: item.empleado.apellido,
          },
          tripulante_id: item.tripulante_id,
          hora: item.hora,
          valor_anterior: item.nombre_anterior,
          valor_actualizado: item.nombre_actualizado,
          tipo_de_cambio: "Cambio de nombre",
          nombre: item.nombre_actualizado,
          apellido: item.apellido_actualizado,
        })
      }

      // Verificar cambio de apellido
      if (item.apellido_anterior !== item.apellido_actualizado) {
        cambios.push({
          usuario: {
            id: item.usuario_id,
            nombre: item.empleado.nombre,
            apellido: item.empleado.apellido,
          },
          tripulante_id: item.tripulante_id,
          hora: item.hora,
          valor_anterior: item.apellido_anterior,
          valor_actualizado: item.apellido_actualizado,
          tipo_de_cambio: "Cambio de apellido",
          nombre: item.nombre_actualizado,
          apellido: item.apellido_actualizado,
        })
      }

      // Verificar cambio de tripulacion
      if (item.tripulacion_id_anterior !== item.tripulacion_id_actualizada) {
        const nombreTripulacionAnterior =
          tripulaciones.find(
            (t) => t.idtripulacion === item.tripulacion_id_anterior
          )?.nombre || "Desconocido"
        const nombreTripulacionActualizada =
          tripulaciones.find(
            (t) => t.idtripulacion === item.tripulacion_id_actualizada
          )?.nombre || "Desconocido"

        cambios.push({
          usuario: {
            id: item.usuario_id,
            nombre: item.empleado.nombre,
            apellido: item.empleado.apellido,
          },
          tripulante_id: item.tripulante_id,
          hora: item.hora,
          valor_anterior: nombreTripulacionAnterior,
          valor_actualizado: nombreTripulacionActualizada,
          tipo_de_cambio: "Cambio de tripulacion",
          nombre: item.nombre_actualizado,
          apellido: item.apellido_actualizado,
        })
      }

      // Verificar cambio de cargo
      if (item.cargo_id_anterior !== item.cargo_id_actualizado) {
        // Encuentra el cargo anterior por su ID
        const cargoAnterior =
          cargos.find((cargo) => cargo.idcargo === item.cargo_id_anterior)
            ?.nombre || "Desconocido"
        // Encuentra el cargo actualizado por su ID
        const cargoActualizado =
          cargos.find((cargo) => cargo.idcargo === item.cargo_id_actualizado)
            ?.nombre || "Desconocido"

        cambios.push({
          usuario: {
            id: item.usuario_id,
            nombre: item.empleado.nombre,
            apellido: item.empleado.apellido,
          },
          tripulante_id: item.tripulante_id,
          hora: item.hora,
          valor_anterior: cargoAnterior,
          valor_actualizado: cargoActualizado,
          tipo_de_cambio: "Cambio de cargo",
          nombre: item.nombre_actualizado,
          apellido: item.apellido_actualizado,
        })
      }
    })

    return cambios
  }

  const columns = [
    { field: "tripulante_id", headerName: "ID Tripulante", width: 100 },
    {
      field: "nombre_tripulante",
      headerName: "Nombre Tripulante",
      width: 200,
      valueGetter: (params) => `${params.row.nombre} ${params.row.apellido}`,
    },
    {
      field: "usuario",
      headerName: "Usuario",
      width: 200,
      valueGetter: (params) =>
        `${params.row.usuario.nombre} ${params.row.usuario.apellido}`,
    },
    {
      field: "tipo_de_cambio",
      headerName: "Tipo de Cambio",
      width: 150,
      flex: 2,
    },

    { field: "valor_anterior", headerName: "Valor Anterior", width: 150 },
    { field: "valor_actualizado", headerName: "Valor Actualizado", width: 150 },
    {
      field: "hora",
      headerName: "Hora",
      width: 200,
      flex: 3,
      renderCell: (params) => format(new Date(params.value), "PPPpp"),
    },
  ]

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={cambios}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.tripulante_id + row.hora + row.tipo_de_cambio}
      />
    </Box>
  )
}

export default TripulantesReporte
