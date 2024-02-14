import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
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
  const navigate = useNavigate()
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
        const tripulanteData = tripulantesData.find(
          (t) => t.idtripulante.toString() === idtripulante
        )

        if (tripulanteData) {
          setTripulante(tripulanteData)
        }
      } catch (error) {
        console.error("Error al obtener los tripulantes:", error)
      }
    }

    fetchTripulante()
  }, [idtripulante])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTripulante({ ...tripulante, [name]: value })
  }

  const handleSaveChanges = async () => {
    try {
      await tripulacionService.updateTripulante(idtripulante, tripulante)
      navigate("/ruta-a-la-que-redireccionar-despues-de-guardar")
    } catch (error) {
      console.error("Error al guardar los cambios:", error)
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
