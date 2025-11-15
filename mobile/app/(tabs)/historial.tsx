import { stylesHistoria as styles } from "@/style/styleHistoria";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { usePatientData } from "@/hooks/userPatientData";

interface HistorialItem {
  id: number;
  tipo: "Diagnóstico" | "Tratamiento" | "Sesión" | "Cita" | "Gasto";
  nombre: string;
  fecha: string;
  estado: "Completado" | "En curso" | "Pendiente" | "Confirmada" | "Programada" | "Pagado" | "Pendiente de Pago";
  descripcion?: string;
  observaciones?: string;
  montoInfo?: {
    total: string;
    cubierto: string;
    familia: string;
  };
}

const getIconForType = (tipo: string) => {
  switch (tipo) {
    case "Diagnóstico":
      return "🔍";
    case "Tratamiento":
      return "⚕️";
    case "Sesión":
      return "💬";
    case "Cita":
      return "📅";
    case "Gasto":
      return "💰";
    default:
      return "📋";
  }
};

const mapEstadoCita = (estado: string) => {
  switch (estado) {
    case "CONFIRMADA":
      return "Confirmada";
    case "PROGRAMADA":
      return "Programada";
    case "COMPLETADA":
      return "Completado";
    default:
      return estado;
  }
};

const mapEstadoSesion = (estado: string) => {
  switch (estado) {
    case "COMPLETADA":
      return "Completado";
    case "EN_PROGRESO":
      return "En curso";
    case "PROGRAMADA":
      return "Pendiente";
    default:
      return estado;
  }
};

const mapEstadoTratamiento = (estado: boolean) => {
  return estado ? "En curso" : "Pendiente";
};

const formatearMoneda = (monto: string) => {
  return `Bs. ${parseFloat(monto).toLocaleString('es-BO')}`;
};

export default function HistorialPacienteScreen() {
  const { patientData, loading, error } = usePatientData();
  
  // Extraer el primer paciente de los datos
  const paciente:any = patientData?.[0];
  const padre = paciente?.padre;
  const historialClinico = paciente?.HistorialClinico || [];
  const tratamientos = paciente?.Tratamiento || [];
  const sesiones = paciente?.Sesion || [];
  const citas = paciente?.Cita || [];
  const gastosMedicos = paciente?.GastoMedico || [];

  const formatearFecha = (fecha: string) => {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Crear array combinado del historial
  const crearHistorialCompleto = (): HistorialItem[] => {
    const historial: HistorialItem[] = [];

    // Agregar diagnósticos del historial clínico
    historialClinico.forEach((diagnostico:any) => {
      historial.push({
        id: `diagnostico-${diagnostico.id}`,
        tipo: "Diagnóstico",
        nombre: diagnostico.diagnostico,
        fecha: formatearFecha(diagnostico.fechaIngreso),
        estado: diagnostico.estado === "EN_TRATAMIENTO" ? "En curso" : "Completado",
        descripcion: diagnostico.observaciones,
      });
    });

    // Agregar tratamientos
    tratamientos.forEach((tratamiento:any) => {
      historial.push({
        id: `tratamiento-${tratamiento.id}`,
        tipo: "Tratamiento",
        nombre: `${tratamiento.tipoTratamiento} - ${tratamiento.descripcion}`,
        fecha: formatearFecha(tratamiento.fecha),
        estado: mapEstadoTratamiento(tratamiento.estado),
        descripcion: `Próxima cita: ${formatearFecha(tratamiento.siguienteCita)}`,
      });
    });

    // Agregar sesiones
    sesiones.forEach((sesion:any) => {
      historial.push({
        id: `sesion-${sesion.id}`,
        tipo: "Sesión",
        nombre: `Sesión ${sesion.tipo.toLowerCase()} - ${sesion.duracion} min - Psicólogo`,
        fecha: formatearFecha(sesion.fecha),
        estado: mapEstadoSesion(sesion.estado),
        descripcion: sesion.notas,
      });
    });

    // Agregar citas
    citas.forEach((cita:any) => {
      historial.push({
        id: `cita-${cita.id}`,
        tipo: "Cita",
        nombre: `${cita.tipo} - ${cita.hora} - Trabajora social`,
        fecha: formatearFecha(cita.fecha),
        estado: mapEstadoCita(cita.estado),
        descripcion: cita.notas,
      });
    });

    // Agregar gastos médicos
    gastosMedicos.forEach((gasto:any) => {
      const montoFaltante = parseFloat(gasto.montoTotal) - parseFloat(gasto.montoCubierto) - parseFloat(gasto.montoFamilia);
      historial.push({
        id: `gasto-${gasto.id}`,
        tipo: "Gasto",
        nombre: `Gasto médico - ${gasto.concepto}`,
        fecha: formatearFecha(gasto.fecha),
        estado: montoFaltante <= 0 ? "Pagado" : "Pendiente de Pago",
        descripcion: gasto.observaciones,
        montoInfo: {
          total: gasto.montoTotal,
          cubierto: gasto.montoCubierto,
          familia: gasto.montoFamilia
        }
      });
    });

    // Ordenar por fecha (más reciente primero)
    return historial.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  };

  const historialCompleto = crearHistorialCompleto();

  // Calcular estadísticas
  const calcularEstadisticas = () => {
    const totalTratamientos = tratamientos.length;
    const tratamientosActivos = tratamientos.filter((t:any) => t.estado).length;
    const sesionesCompletadas = sesiones.filter((s:any) => s.estado === "COMPLETADA").length;
    const citasConfirmadas = citas.filter((c:any) => c.estado === "CONFIRMADA").length;
    
    // Calcular estadísticas de gastos
    const totalGastos = gastosMedicos.reduce((sum:number, gasto:any) => sum + parseFloat(gasto.montoTotal), 0);
    const totalCubierto = gastosMedicos.reduce((sum:number, gasto:any) => sum + parseFloat(gasto.montoCubierto), 0);
    const totalFamilia = gastosMedicos.reduce((sum:number, gasto:any) => sum + parseFloat(gasto.montoFamilia), 0);
    const montoPendiente = totalGastos - totalCubierto - totalFamilia;
    
    return {
      totalTratamientos,
      tratamientosActivos,
      sesionesCompletadas,
      citasConfirmadas,
      ultimoDiagnostico: historialClinico[historialClinico.length - 1]?.diagnostico || "No disponible",
      gastos: {
        total: totalGastos,
        cubierto: totalCubierto,
        familia: totalFamilia,
        pendiente: montoPendiente
      }
    };
  };

  const estadisticas = calcularEstadisticas();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text>Cargando historial...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !paciente) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text>Error al cargar el historial del paciente</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Historial del Paciente</Text>
          <Text style={styles.subtitle}>
            {`${paciente.nombre} ${paciente.apellido}`}
          </Text>
          <Text style={styles.subtitle}>
            CI: {padre?.ci || "No disponible"}
          </Text>
        </View>

        <View style={styles.resumenCard}>
          <Text style={styles.resumenTitle}>Resumen del Tratamiento</Text>
          <Text style={styles.resumenText}>
            ⚕️ Tipo de cáncer: {paciente.tipoCancer}
          </Text>
          <Text style={styles.resumenText}>
            🏥 Tratamientos activos: {estadisticas.tratamientosActivos}/{estadisticas.totalTratamientos}
          </Text>
          <Text style={styles.resumenText}>
            💬 Sesiones completadas: {estadisticas.sesionesCompletadas}
          </Text>
          <Text style={styles.resumenText}>
            📅 Citas confirmadas: {estadisticas.citasConfirmadas}
          </Text>
          <Text style={styles.resumenText}>
            🔍 Último diagnóstico: {estadisticas.ultimoDiagnostico}
          </Text>
          {gastosMedicos.length > 0 && (
            <>
              <Text style={styles.resumenText}>
                💰 Total gastos: {formatearMoneda(estadisticas.gastos.total.toString())}
              </Text>
              <Text style={styles.resumenText}>
                🏥 Cubierto por institución: {formatearMoneda(estadisticas.gastos.cubierto.toString())}
              </Text>
              <Text style={styles.resumenText}>
                👨‍👩‍👧‍👦 Aporte familiar: {formatearMoneda(estadisticas.gastos.familia.toString())}
              </Text>
              {estadisticas.gastos.pendiente > 0 && (
                <Text style={[styles.resumenText, { color: '#e74c3c' }]}>
                  ⚠️ Monto pendiente: {formatearMoneda(estadisticas.gastos.pendiente.toString())}
                </Text>
              )}
            </>
          )}
        </View>

        {historialCompleto.length === 0 ? (
          <View style={styles.card}>
            <Text style={styles.nombre}>No hay historial disponible</Text>
          </View>
        ) : (
          historialCompleto.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.tipoContainer}>
                  <Text style={styles.tipoIcon}>{getIconForType(item.tipo)}</Text>
                  <Text style={styles.tipo}>{item.tipo}</Text>
                </View>
                <Text
                  style={[
                    styles.estado,
                    item.estado === "En curso" || item.estado === "Confirmada" || item.estado === "Pagado"
                      ? styles.enCurso
                      : item.estado === "Pendiente" || item.estado === "Programada" || item.estado === "Pendiente de Pago"
                      ? styles.pendiente
                      : styles.completado,
                  ]}
                >
                  {item.estado}
                </Text>
              </View>

              <Text style={styles.nombre}>{item.nombre}</Text>

              <View style={styles.infoContainer}>
                <Text style={styles.info}>📅 Fecha: {item.fecha}</Text>
                {item.descripcion && (
                  <Text style={styles.info}>📝 {item.descripcion}</Text>
                )}
                
                {/* Información específica para gastos médicos */}
                {item.tipo === "Gasto" && item.montoInfo && (
                  <>
                    <Text style={styles.info}>
                      💰 Total: {formatearMoneda(item.montoInfo.total)}
                    </Text>
                    <Text style={styles.info}>
                      🏥 Cubierto: {formatearMoneda(item.montoInfo.cubierto)}
                    </Text>
                    <Text style={styles.info}>
                      👨‍👩‍👧‍👦 Familia: {formatearMoneda(item.montoInfo.familia)}
                    </Text>
                    {(() => {
                      const pendiente = parseFloat(item.montoInfo.total) - 
                                      parseFloat(item.montoInfo.cubierto) - 
                                      parseFloat(item.montoInfo.familia);
                      return pendiente > 0 ? (
                        <Text style={[styles.info, { color: '#e74c3c', fontWeight: 'bold' }]}>
                          ⚠️ Pendiente: {formatearMoneda(pendiente.toString())}
                        </Text>
                      ) : (
                        <Text style={[styles.info, { color: '#27ae60', fontWeight: 'bold' }]}>
                          ✅ Completamente cubierto
                        </Text>
                      );
                    })()}
                  </>
                )}
                
                <Text style={styles.info}>
                  🏥 OncoFeliz
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}