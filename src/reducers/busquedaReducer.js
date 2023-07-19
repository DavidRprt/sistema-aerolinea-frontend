import { createSlice } from "@reduxjs/toolkit"

const busquedaSlice = createSlice({
  name: "busqueda",
  initialState: null, 
  reducers: {
    guardarBusqueda: (state, action) => {
      return action.payload
    },
  },
})

export const { guardarBusqueda } = busquedaSlice.actions
export default busquedaSlice.reducer
