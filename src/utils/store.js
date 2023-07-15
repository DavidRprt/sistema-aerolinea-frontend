import { configureStore } from "@reduxjs/toolkit"
import aeropuertoReducer from "../reducers/aeropuertoReducer"
import avionReducer from "../reducers/avionReducer"
import modeloReducer from "../reducers/modeloReducer"
import rutaReducer from "../reducers/rutaReducer"

const store = configureStore({
  reducer: {
    aeropuertos: aeropuertoReducer,
    aviones: avionReducer,
    modelos: modeloReducer,
    rutas: rutaReducer
  },
})

export default store
