import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  clientes: [], // Array para todos los clientes
  clienteCargado: null, // Cliente específico cargado
}

const clientesSlice = createSlice({
  name: "clientes",
  initialState,
  reducers: {
    cargarClientes: (state, action) => {
      state.clientes = action.payload
    },
    cargarSingleCliente: (state, action) => {
      state.clienteCargado = action.payload
    },
  },
})

export const { cargarClientes, cargarSingleCliente } = clientesSlice.actions
export default clientesSlice.reducer