import { createSlice } from "@reduxjs/toolkit"

const modeloSlice = createSlice({
  name: "modelos",
  initialState: [],
  reducers: {
    cargarModelos: (state, action) => {
      return action.payload
    },
    agregarModelos: (state, action) => {
      state.push(action.payload)
    },
    eliminarModelo: (state, action) => {
      return state.filter(
        (modelo) => modelo.idmodelo !== action.payload
      )
    },
  },
})

export const { cargarModelos, agregarModelos, eliminarModelo } =
  modeloSlice.actions
export default modeloSlice.reducer
