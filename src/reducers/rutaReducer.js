import { createSlice } from "@reduxjs/toolkit"

const rutaSlice = createSlice({
  name: "rutas",
  initialState: [],
  reducers: {
    cargarRutas: (state, action) => {
      return action.payload
    },
    agregarRuta: (state, action) => {
      state.push(action.payload)
    },
    eliminarRuta: (state, action) => {
      return state.filter((ruta) => ruta.idruta !== action.payload)
    },
  },
})

export const { cargarRutas, agregarRuta, eliminarRuta } =
  rutaSlice.actions
export default rutaSlice.reducer
