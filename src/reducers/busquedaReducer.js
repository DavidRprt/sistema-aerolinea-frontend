import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  oneway: true,
  idorigen: "",
  iddestino: "",
  fechhaida: "",
  fechavuelta: "",
}

const busquedaSlice = createSlice({
  name: "busqueda",
  initialState,
  reducers: {
    guardarBusqueda: (state, action) => {
      return action.payload
    },
  },
})

export const { guardarBusqueda } = busquedaSlice.actions
export default busquedaSlice.reducer
