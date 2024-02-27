import React from "react"
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    margin: 10,
    fontWeight: "bold",
  },
  aeropuertoInfo: {
    marginBottom: 10, 
  },
  aeropuertoText: {
    fontSize: 12,
    marginBottom: 5, 
  },
  aeropuertoSubtitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10, 
  },
})


const ReporteAeropuertosPDF = ({ datos }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Reporte de AirFly</Text>
      <Text style={styles.subtitle}>Reporte de Aeropuertos y Rutas</Text>
      {datos.map((aeropuerto, index) => (
        <View key={index} style={styles.aeropuertoInfo}>
          <Text style={styles.aeropuertoSubtitle}>{aeropuerto.nombre}</Text>
          <Text style={styles.aeropuertoText}>Ciudad: {aeropuerto.ciudad}</Text>
          <Text style={styles.aeropuertoText}>
            Código: {aeropuerto.idaeropuerto}
          </Text>
          <Text style={styles.aeropuertoText}>País: {aeropuerto.pais}</Text>
          <Text style={styles.aeropuertoText}>
            Total de Rutas: {aeropuerto.totalrutas}
          </Text>
        </View>
      ))}
    </Page>
  </Document>
)


export default ReporteAeropuertosPDF
