import { stylesCalendario as styles } from "@/style/styleCalendario";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { usePatientData } from "@/hooks/userPatientData";

interface CitaAdaptada {
  id: number;
  tipo: "CONSULTA" | "SEGUIMIENTO" | "TRATAMIENTO" | "REVISION";
  fecha: string; // formato: YYYY-MM-DD
  hora: string; // formato: HH:mm
  profesional: string;
  estado: "PROGRAMADA" | "CONFIRMADA" | "COMPLETADA" | "CANCELADA";
  notas?: string;
}

const { width } = Dimensions.get("window");
const DIAS_SEMANA = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function CalendarioScreen() {
  const { patientData, loading, error } = usePatientData();
  const [citas, setCitas] = useState<CitaAdaptada[]>([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [mesActual, setMesActual] = useState(new Date());
  const [vistaActual, setVistaActual] = useState<"calendario" | "lista">(
    "calendario"
  );

  // Extraer el primer paciente de los datos
  const paciente:any = patientData?.[0];
  const citasPaciente = paciente?.Cita || [];
  const tratamientos = paciente?.Tratamiento || [];

  useEffect(() => {
    if (paciente) {
      const citasAdaptadas: CitaAdaptada[] = [];
      
      // Agregar citas regulares
      citasPaciente.forEach((cita:any) => {
        citasAdaptadas.push({
          id: cita.id,
          tipo: cita.tipo,
          fecha: new Date(cita.fecha).toISOString().split('T')[0],
          hora: cita.hora,
          profesional: getProfesionalPorTipo(cita.tipo),
          estado: cita.estado,
          notas: cita.notas,
        });
      });

      // Agregar tratamientos como citas
      tratamientos.forEach((tratamiento:any) => {
        if (tratamiento.siguienteCita) {
          citasAdaptadas.push({
            id: `tratamiento-${tratamiento.id}`,
            tipo: "TRATAMIENTO",
            fecha: new Date(tratamiento.siguienteCita).toISOString().split('T')[0],
            hora: "10:00", // Hora por defecto para tratamientos
            profesional: getProfesionalPorTipo("TRATAMIENTO"),
            estado: tratamiento.estado ? "PROGRAMADA" : "CANCELADA",
            notas: tratamiento.descripcion,
          });
        }
      });

      setCitas(citasAdaptadas);
    }
  }, [paciente]);

  const getProfesionalPorTipo = (tipo: string) => {
    switch (tipo) {
      case "CONSULTA":
        return "Dr. Mario Vargas";
      case "SEGUIMIENTO":
        return "Lic. Andrea Morales";
      case "TRATAMIENTO":
        return "Dra. Ana Pérez - Oncología";
      case "REVISION":
        return "Dr. Luis Rojas";
      default:
        return "Personal Médico";
    }
  };

  const mapearEstadoParaMostrar = (estado: string) => {
    switch (estado) {
      case "PROGRAMADA":
        return "Programada";
      case "CONFIRMADA":
        return "Confirmada";
      case "COMPLETADA":
        return "Completada";
      case "CANCELADA":
        return "Cancelada";
      default:
        return estado;
    }
  };

  const obtenerDiasDelMes = () => {
    const año = mesActual.getFullYear();
    const mes = mesActual.getMonth();

    const primerDia = new Date(año, mes, 1);
    const ultimoDia = new Date(año, mes + 1, 0);
    const diasEnMes = ultimoDia.getDate();
    const primerDiaSemana = primerDia.getDay();

    const dias = [];

    // Días del mes anterior
    for (let i = primerDiaSemana - 1; i >= 0; i--) {
      const dia = new Date(año, mes, -i);
      dias.push({ fecha: dia, esDelMes: false });
    }

    // Días del mes actual
    for (let dia = 1; dia <= diasEnMes; dia++) {
      const fecha = new Date(año, mes, dia);
      dias.push({ fecha, esDelMes: true });
    }

    // Completar la última semana
    const diasRestantes = 42 - dias.length;
    for (let i = 1; i <= diasRestantes; i++) {
      const fecha = new Date(año, mes + 1, i);
      dias.push({ fecha, esDelMes: false });
    }

    return dias;
  };

  const obtenerCitasDelDia = (fecha: Date) => {
    const fechaStr = fecha.toISOString().split("T")[0];
    return citas.filter((cita) => cita.fecha === fechaStr);
  };

  const cambiarMes = (direccion: "anterior" | "siguiente") => {
    const nuevoMes = new Date(mesActual);
    if (direccion === "anterior") {
      nuevoMes.setMonth(mesActual.getMonth() - 1);
    } else {
      nuevoMes.setMonth(mesActual.getMonth() + 1);
    }
    setMesActual(nuevoMes);
  };

  const esFechaSeleccionada = (fecha: Date) => {
    return fecha.toDateString() === fechaSeleccionada.toDateString();
  };

  const esHoy = (fecha: Date) => {
    return fecha.toDateString() === new Date().toDateString();
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "CONSULTA":
        return "#FF6B35";
      case "SEGUIMIENTO":
        return "#FF8C5A";
      case "TRATAMIENTO":
        return "#FF9F7A";
      case "REVISION":
        return "#FFB79A";
      default:
        return "#FF6B35";
    }
  };

  const getTipoTexto = (tipo: string) => {
    switch (tipo) {
      case "CONSULTA":
        return "Consulta Médica";
      case "SEGUIMIENTO":
        return "Seguimiento";
      case "TRATAMIENTO":
        return "Tratamiento";
      case "REVISION":
        return "Revisión";
      default:
        return tipo;
    }
  };

  const citasDelDiaSeleccionado = obtenerCitasDelDia(fechaSeleccionada);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text>Cargando calendario...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !paciente) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text>Error al cargar las citas</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📅 Calendario - {paciente.nombre}</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              vistaActual === "calendario" && styles.toggleButtonActive,
            ]}
            onPress={() => setVistaActual("calendario")}
          >
            <Text
              style={[
                styles.toggleText,
                vistaActual === "calendario" && styles.toggleTextActive,
              ]}
            >
              Calendario
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              vistaActual === "lista" && styles.toggleButtonActive,
            ]}
            onPress={() => setVistaActual("lista")}
          >
            <Text
              style={[
                styles.toggleText,
                vistaActual === "lista" && styles.toggleTextActive,
              ]}
            >
              Lista
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {vistaActual === "calendario" ? (
          <>
            {/* Navegación del mes */}
            <View style={styles.mesNavegacion}>
              <TouchableOpacity
                style={styles.mesButton}
                onPress={() => cambiarMes("anterior")}
              >
                <Text style={styles.mesButtonText}>‹</Text>
              </TouchableOpacity>

              <Text style={styles.mesTexto}>
                {MESES[mesActual.getMonth()]} {mesActual.getFullYear()}
              </Text>

              <TouchableOpacity
                style={styles.mesButton}
                onPress={() => cambiarMes("siguiente")}
              >
                <Text style={styles.mesButtonText}>›</Text>
              </TouchableOpacity>
            </View>

            {/* Días de la semana */}
            <View style={styles.diasSemana}>
              {DIAS_SEMANA.map((dia, index) => (
                <View key={index} style={styles.diaSemana}>
                  <Text style={styles.diaSemanaTexto}>{dia}</Text>
                </View>
              ))}
            </View>

            {/* Calendario */}
            <View style={styles.calendario}>
              {obtenerDiasDelMes().map((item, index) => {
                const citasDelDia = obtenerCitasDelDia(item.fecha);
                const esSeleccionado = esFechaSeleccionada(item.fecha);
                const esHoyDia = esHoy(item.fecha);

                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.diaContainer,
                      !item.esDelMes && styles.diaOtroMes,
                      esSeleccionado && styles.diaSeleccionado,
                      esHoyDia && styles.diaHoy,
                    ]}
                    onPress={() => setFechaSeleccionada(item.fecha)}
                  >
                    <Text
                      style={[
                        styles.diaTexto,
                        !item.esDelMes && styles.diaOtroMesTexto,
                        esSeleccionado && styles.diaSeleccionadoTexto,
                        esHoyDia && styles.diaHoyTexto,
                      ]}
                    >
                      {item.fecha.getDate()}
                    </Text>
                    {citasDelDia.length > 0 && (
                      <View style={styles.indicadorCitas}>
                        <Text style={styles.indicadorTexto}>
                          {citasDelDia.length}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Citas del día seleccionado */}
            <View style={styles.citasDelDia}>
              <Text style={styles.citasDelDiaTitle}>
                Citas del{" "}
                {fechaSeleccionada.toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </Text>

              {citasDelDiaSeleccionado.length > 0 ? (
                citasDelDiaSeleccionado.map((cita) => (
                  <View key={cita.id} style={styles.citaCard}>
                    <View
                      style={[
                        styles.citaBorder,
                        { backgroundColor: getTipoColor(cita.tipo) },
                      ]}
                    />
                    <View style={styles.citaContent}>
                      <Text
                        style={[
                          styles.citaTipo,
                          { color: getTipoColor(cita.tipo) },
                        ]}
                      >
                        {getTipoTexto(cita.tipo)}
                      </Text>
                      <Text style={styles.citaHora}>🕐 {cita.hora}</Text>
                      <Text style={styles.citaProfesional}>
                        👤 {cita.profesional}
                      </Text>
                      <Text style={[
                        styles.citaEstado,
                        cita.estado === "CONFIRMADA" ? styles.estadoConfirmada : 
                        cita.estado === "PROGRAMADA" ? styles.estadoProgramada :
                        cita.estado === "COMPLETADA" ? styles.estadoCompletada : styles.estadoCancelada
                      ]}>
                        Estado: {mapearEstadoParaMostrar(cita.estado)}
                      </Text>
                      {cita.notas && (
                        <Text style={styles.citaNotas}>📝 {cita.notas}</Text>
                      )}
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noCitas}>
                  No hay citas programadas para este día
                </Text>
              )}
            </View>
          </>
        ) : (
          /* Vista de lista */
          <View style={styles.listView}>
            <Text style={styles.listTitle}>Todas las citas ({citas.length})</Text>
            {citas.length > 0 ? (
              citas
                .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
                .map((cita) => (
                  <View key={cita.id} style={styles.listCard}>
                    <View
                      style={[
                        styles.listBorder,
                        { backgroundColor: getTipoColor(cita.tipo) },
                      ]}
                    />
                    <View style={styles.listContent}>
                      <Text
                        style={[
                          styles.listTipo,
                          { color: getTipoColor(cita.tipo) },
                        ]}
                      >
                        {getTipoTexto(cita.tipo)}
                      </Text>
                      <Text style={styles.listFecha}>
                        📅 {new Date(cita.fecha).toLocaleDateString("es-ES")} 🕐{" "}
                        {cita.hora}
                      </Text>
                      <Text style={styles.listProfesional}>
                        👤 {cita.profesional}
                      </Text>
                      <Text
                        style={[
                          styles.listEstado,
                          cita.estado === "CONFIRMADA" || cita.estado === "PROGRAMADA"
                            ? styles.estadoProxima
                            : styles.estadoCompletada,
                        ]}
                      >
                        {mapearEstadoParaMostrar(cita.estado)}
                      </Text>
                      {cita.notas && (
                        <Text style={styles.listNotas}>📝 {cita.notas}</Text>
                      )}
                    </View>
                  </View>
                ))
            ) : (
              <Text style={styles.noCitas}>No hay citas programadas</Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}