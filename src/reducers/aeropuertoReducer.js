import { createSlice } from "@reduxjs/toolkit"

const aeropuertosSlice = createSlice({
  name: "aeropuertos",
  initialState: [],
  reducers: {
    cargarAeropuertos: (state, action) => {
      return action.payload
    },
    agregarAeropuerto: (state, action) => {
      state.push(action.payload)
    },
    eliminarAeropuerto: (state, action) => {
      return state.filter((aeropuerto) => aeropuerto.idaeropuerto !== action.payload)
    },
  },
})

export const { cargarAeropuertos, agregarAeropuerto, eliminarAeropuerto } =
  aeropuertosSlice.actions
export default aeropuertosSlice.reducer
