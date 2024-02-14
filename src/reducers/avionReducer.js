import { createSlice } from "@reduxjs/toolkit"

const avionSlice = createSlice({
  name: "aviones",
  initialState: [],
  reducers: {
    cargarAviones: (state, action) => {
      return action.payload
    },
    agregarAviones: (state, action) => {
      state.push(action.payload)
    },
    eliminarAvion: (state, action) => {
      return state.filter(
        (avion) => avion.idavion !== action.payload
      )
    },
  },
})

export const { cargarAviones, agregarAviones, eliminarAvion } =
  avionSlice.actions
export default avionSlice.reducer
