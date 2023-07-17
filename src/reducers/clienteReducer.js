import { createSlice } from "@reduxjs/toolkit"

const clientesSlice = createSlice({
  name: "clientes",
  initialState: [],
  reducers: {
    cargarClientes: (state, action) => {
      return action.payload
    },
  },
})

export const { cargarClientes } = clientesSlice.actions
export default clientesSlice.reducer
