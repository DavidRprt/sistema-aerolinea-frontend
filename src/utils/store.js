import { configureStore } from "@reduxjs/toolkit"
import aeropuertoReducer from "../reducers/aeropuertoReducer"
import avionReducer from "../reducers/avionReducer"
import modeloReducer from "../reducers/modeloReducer"

const store = configureStore({
  reducer: {
    aeropuertos: aeropuertoReducer,
    aviones: avionReducer,
    modelos: modeloReducer,
  },
})

export default store
