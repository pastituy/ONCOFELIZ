import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");
export const stylesCalendario = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 2,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: "#FF6B35",
  },
  toggleText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  toggleTextActive: {
    color: "#FFFFFF",
  },
  mesNavegacion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  mesButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF6B35",
    justifyContent: "center",
    alignItems: "center",
  },
  mesButtonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  mesTexto: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  diasSemana: {
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    paddingVertical: 8,
  },
  diaSemana: {
    flex: 1,
    alignItems: "center",
  },
  diaSemanaTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  calendario: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#FFFFFF",
  },
  diaContainer: {
    width: width / 7,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#E0E0E0",
    position: "relative",
  },
  diaOtroMes: {
    backgroundColor: "#F8F8F8",
  },
  diaSeleccionado: {
    backgroundColor: "#FF6B35",
  },
  diaHoy: {
    backgroundColor: "#FFE0D6",
  },
  diaTexto: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  diaOtroMesTexto: {
    color: "#CCC",
  },
  diaSeleccionadoTexto: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  diaHoyTexto: {
    color: "#FF6B35",
    fontWeight: "700",
  },
  indicadorCitas: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#FF6B35",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  indicadorTexto: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  citasDelDia: {
    padding: 16,
  },
  citasDelDiaTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  citaCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  citaBorder: {
    width: 4,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  citaContent: {
    flex: 1,
    padding: 12,
  },
  citaTipo: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  citaHora: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  citaProfesional: {
    fontSize: 14,
    color: "#666",
  },
  noCitas: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    marginTop: 20,
  },
  listView: {
    padding: 16,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  listCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  listBorder: {
    width: 4,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  listContent: {
    flex: 1,
    padding: 12,
  },
  listTipo: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  listFecha: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  listProfesional: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  listEstado: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "600",
    alignSelf: "flex-start",
  },
  estadoProxima: {
    backgroundColor: "#FFF3E0",
    color: "#FF6B35",
  },
  estadoCompletada: {
    backgroundColor: "#E8F5E9",
    color: "#2E7D32",
  },
  citaEstado: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginTop: 8,
  },
  estadoConfirmada: {
    backgroundColor: "#E8F5E8",
    color: "#2E7D32",
  },
  estadoProgramada: {
    backgroundColor: "#E3F2FD",
    color: "#1565C0",
  },
  citasNotas: {
    fontSize: 13,
    color: "#555",
    marginTop: 6,
    fontStyle: "italic",
    lineHeight: 18,
  },
  citaNotas: {
    fontSize: 13,
    color: "#555",
    marginTop: 6,
    fontStyle: "italic",
    lineHeight: 18,
  },
  listNotas: {
    fontSize: 13,
    color: "#555",
    marginTop: 6,
    fontStyle: "italic",
    lineHeight: 18,
  },
  estadoCancelada: {
    backgroundColor: "#E8F5E9",
    color: "#f61714",
  },
});
