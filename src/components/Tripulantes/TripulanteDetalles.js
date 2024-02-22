import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import tripulacionService from "../../services/tripulacionService"
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material"

const TripulanteDetalles = () => {
  const { idtripulante } = useParams()
  const [tripulaciones, setTripulaciones] = useState([])
  const [selectedTripulacion, setSelectedTripulacion] = useState({
    id: "",
    nombre: "",
  })
  const [tripulante, setTripulante] = useState({
    idtripulante: "",
    nombre: "",
    apellido: "",
    idcargo: "",
  })

  const cargos = [
    { idCargo: 1, nombre: "Piloto" },
    { idCargo: 2, nombre: "Copiloto" },
    { idCargo: 3, nombre: "Jefe de cabina" },
    { idCargo: 4, nombre: "TPC" },
  ]

  useEffect(() => {
    const fetchTripulante = async () => {
      try {
        const tripulantesData = await tripulacionService.getAllTripulantes()
        const tripulacionesData = await tripulacionService.getAllTripulaciones()
        setTripulaciones(tripulacionesData)
        const tripulanteData = tripulantesData.find(
          (t) => t.idtripulante.toString() === idtripulante
        )

        if (tripulanteData) {
          setTripulante(tripulanteData)
          setSelectedTripulacion({
            id: tripulanteData.tripulacion?.idtripulacion || "",
            nombre: tripulanteData.tripulacion?.nombre || "",
          })
        }
      } catch (error) {
        console.error("Error al obtener los tripulantes:", error)
      }
    }

    fetchTripulante()
  }, [idtripulante])

  const handleTripulacionChange = (e) => {
    const tripulacionSeleccionada = tripulaciones.find(
      (t) => t.nombre === e.target.value
    )
    setSelectedTripulacion({
      id: tripulacionSeleccionada ? tripulacionSeleccionada.idtripulacion : "",
      nombre: e.target.value,
    })
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTripulante({ ...tripulante, [name]: value })
  }

  const handleSaveChanges = async () => {
    const tripulanteActualizado = {
      ...tripulante,
      idcargo: tripulante.idcargo,
      idtripulacion: selectedTripulacion.id,
    }

    delete tripulanteActualizado.cargo
    delete tripulanteActualizado.idtripulacionAnterior

    console.log("Tripulante actualizado:", tripulanteActualizado)

    try {
      await tripulacionService.updateTripulante(
        tripulante.idtripulante,
        tripulanteActualizado
      )
    } catch (error) {
      console.error("Error al actualizar el tripulante:", error)
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <TextField
        label="Nombre"
        name="nombre"
        value={tripulante.nombre}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Apellido"
        name="apellido"
        value={tripulante.apellido}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="cargo-label">Cargo</InputLabel>
        <Select
          labelId="cargo-label"
          name="idcargo"
          value={tripulante.idcargo || ""}
          label="Cargo"
          onChange={handleInputChange}
        >
          {cargos.map((cargo) => (
            <MenuItem key={cargo.idCargo} value={cargo.idCargo}>
              {cargo.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="tripulacion-label">Tripulación</InputLabel>
        <Select
          labelId="tripulacion-label"
          name="tripulacion"
          value={selectedTripulacion.nombre}
          label="Tripulación"
          onChange={handleTripulacionChange}
        >
          {tripulaciones.map((tripulacion) => (
            <MenuItem
              key={tripulacion.idtripulacion}
              value={tripulacion.nombre}
            >
              {tripulacion.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveChanges}
        sx={{ mt: 2 }}
      >
        Guardar Cambios
      </Button>
    </Box>
  )
}

export default TripulanteDetalles
