import React from "react"
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Path,
} from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 24,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  ticket: {
    padding: 16,
    borderRadius: 12,
    border: "1pt solid #666",
    marginBottom: 12,
    backgroundColor: "#eee",
  },
  ticketHeader: {
    fontSize: 18,
    marginBottom: 8,
    color: "#444",
  },
  section: {
    margin: 4,
    fontSize: 12,
    lineHeight: 1.5,
  },
  bold: {
    fontWeight: "bold",
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  footer: {
    marginTop: 24,
    fontSize: 12,
    textAlign: "center",
    color: "#aaa",
  },
})

const PasajePDF = ({ pasaje }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>AirFly - Detalles del Pasaje</Text>
      </View>
      <View style={styles.ticket}>
        <Text style={styles.ticketHeader}>Pasaje Aéreo</Text>
        <View style={styles.section}>
          <Text>
            <Text style={styles.bold}>Pasajero:</Text> {pasaje.cliente.nombre}{" "}
            {pasaje.cliente.apellido}
          </Text>
          <Text>
            <Text style={styles.bold}>Clase:</Text> {pasaje.idclase}
          </Text>
          <Text>
            <Text style={styles.bold}>Fecha:</Text> {pasaje.fecha}
          </Text>
          <Text>
            <Text style={styles.bold}>Precio:</Text> ${pasaje.precio}
          </Text>
          <Text>
            <Text style={styles.bold}>Origen:</Text> {pasaje.rutum.idorigen}
          </Text>
          <Text>
            <Text style={styles.bold}>Destino:</Text> {pasaje.rutum.iddestino}
          </Text>
          <Text>
            <Text style={styles.bold}>Salida:</Text>{" "}
            {pasaje.rutum.horariosalida}
          </Text>
          <Text>
            <Text style={styles.bold}>Duración:</Text> {pasaje.rutum.duracion}{" "}
            horas
          </Text>
          <Text>
            <Text style={styles.bold}>Avión:</Text> {pasaje.rutum.avion.nombre}
          </Text>
        </View>
      </View>
      <View style={styles.barcode}>
        <Svg width={200} height={100} viewBox="0 0 100 50">
          {/* Simulación de un código de barras */}
          <Path
            d="M 10,10 L 10,40 M 15,10 L 15,40 M 20,10 L 20,40"
            stroke="#000"
            strokeWidth={2}
          />
          <Path
            d="M 25,10 L 25,40 M 30,10 L 30,40"
            stroke="#000"
            strokeWidth={1}
          />
          <Path
            d="M 35,10 L 35,40 M 40,10 L 40,40 M 45,10 L 45,40"
            stroke="#000"
            strokeWidth={2}
          />
          <Path d="M 50,10 L 50,40" stroke="#000" strokeWidth={1} />
          <Path
            d="M 55,10 L 55,40 M 60,10 L 60,40 M 65,10 L 65,40"
            stroke="#000"
            strokeWidth={2}
          />
        </Svg>
      </View>
      <View style={styles.footer}>
        <Text>Gracias por volar con AirFly</Text>
      </View>
    </Page>
  </Document>
)

export default PasajePDF
