import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useUser } from "@/context/userContext";
import { stylesPerfil as styles } from "@/style/stylePerfil";
import { usePatientData } from "@/hooks/userPatientData";

export default function PerfilScreen() {
  const { patientData, loading, error } = usePatientData();
  const { userData, logout } = useUser();

  // Extraer el primer paciente de los datos
  const paciente: any = patientData?.[0];
  const padre = paciente?.padre;
  const historialActual =
    paciente?.HistorialClinico?.[paciente.HistorialClinico.length - 1];
  const tratamientos = paciente?.Tratamiento || [];
  const sesiones = paciente?.Sesion || [];
  const citas = paciente?.Cita || [];
  const gastosMedicos = paciente?.GastoMedico || [];

  const calcularEdad = (fechaNacimiento: string) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const formatearFecha = (fecha: string) => {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatearMoneda = (monto: string | number) => {
    const montoNum = typeof monto === 'string' ? parseFloat(monto) : monto;
    return `Bs. ${montoNum.toLocaleString('es-BO')}`;
  };

  // Calcular estadísticas del tratamiento
  const calcularEstadisticasTratamiento = () => {
    const totalTratamientos = tratamientos.length;
    const tratamientosActivos = tratamientos.filter(
      (t: any) => t.estado
    ).length;
    const sesionesCompletadas = sesiones.filter(
      (s: any) => s.estado === "COMPLETADA"
    ).length;

    return {
      ciclosCompletados: sesionesCompletadas,
      tratamientosActivos,
      totalTratamientos,
      progreso:
        totalTratamientos > 0
          ? Math.round((tratamientosActivos / totalTratamientos) * 100)
          : 0,
    };
  };

  // Calcular estadísticas de gastos médicos
  const calcularEstadisticasGastos = () => {
    if (gastosMedicos.length === 0) {
      return {
        totalGastos: 0,
        totalCubierto: 0,
        totalFamilia: 0,
        montoPendiente: 0,
        porcentajeCubierto: 0,
        ultimoGasto: null
      };
    }

    const totalGastos = gastosMedicos.reduce((sum: number, gasto: any) => 
      sum + parseFloat(gasto.montoTotal), 0);
    const totalCubierto = gastosMedicos.reduce((sum: number, gasto: any) => 
      sum + parseFloat(gasto.montoCubierto), 0);
    const totalFamilia = gastosMedicos.reduce((sum: number, gasto: any) => 
      sum + parseFloat(gasto.montoFamilia), 0);
    const montoPendiente = totalGastos - totalCubierto - totalFamilia;
    const porcentajeCubierto = totalGastos > 0 ? Math.round(((totalCubierto + totalFamilia) / totalGastos) * 100) : 0;
    
    // Obtener el último gasto (más reciente)
    const ultimoGasto = gastosMedicos.reduce((ultimo: any, actual: any) => {
      return new Date(actual.fecha) > new Date(ultimo.fecha) ? actual : ultimo;
    }, gastosMedicos[0]);

    return {
      totalGastos,
      totalCubierto,
      totalFamilia,
      montoPendiente,
      porcentajeCubierto,
      ultimoGasto
    };
  };

  const estadisticas = calcularEstadisticasTratamiento();
  const estadisticasGastos = calcularEstadisticasGastos();

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (error || !paciente) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>Error al cargar los datos del paciente</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {historialActual?.estado === "EN_TRATAMIENTO"
                ? "En Tratamiento"
                : "Activo"}
            </Text>
          </View>
        </View>

        <Text style={styles.name}>
          {`${paciente.nombre} ${paciente.apellido}` ||
            "Beneficiario sin nombre"}
        </Text>
        <Text style={styles.subtitle}>Paciente oncológico</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>👤</Text>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Edad</Text>
                <Text style={styles.infoValue}>
                  {paciente.edad ? `${paciente.edad} años` : "No disponible"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>🏥</Text>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Diagnóstico</Text>
                <Text style={styles.infoValue}>
                  {paciente.tipoCancer ||
                    historialActual?.diagnostico ||
                    "No disponible"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>👨‍👩‍👧‍👦</Text>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Responsable</Text>
                <Text style={styles.infoValue}>
                  {padre
                    ? `${padre.nombre} ${padre.apellido}`
                    : "No registrado"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📱</Text>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Teléfono</Text>
                <Text style={styles.infoValue}>
                  {padre?.telefono || "No disponible"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📍</Text>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Ubicación</Text>
                <Text style={styles.infoValue}>
                  {padre?.ubicacion || paciente.ciudad || "No disponible"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📅</Text>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Fecha de registro</Text>
                <Text style={styles.infoValue}>
                  {paciente?.fechaRegistro
                    ? formatearFecha(paciente?.fechaRegistro)
                    : "No disponible"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>🏥</Text>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Fundación</Text>
                <Text style={styles.infoValue}>Fundación Esperanza</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.estadisticasCard}>
          <Text style={styles.cardTitle}>Estado del Tratamiento</Text>
          <View style={styles.estadisticasContainer}>
            <View style={styles.estadisticaItem}>
              <Text style={styles.estadisticaNumero}>
                {estadisticas.ciclosCompletados}
              </Text>
              <Text style={styles.estadisticaLabel}>Sesiones completadas</Text>
            </View>
            <View style={styles.estadisticaItem}>
              <Text style={styles.estadisticaNumero}>
                {estadisticas.tratamientosActivos}
              </Text>
              <Text style={styles.estadisticaLabel}>Tratamientos activos</Text>
            </View>
            <View style={styles.estadisticaItem}>
              <Text style={styles.estadisticaNumero}>
                {estadisticas.progreso}%
              </Text>
              <Text style={styles.estadisticaLabel}>Progreso</Text>
            </View>
          </View>
        </View>

        {/* Nueva sección de estadísticas financieras */}
        {gastosMedicos.length > 0 && (
          <View style={styles.estadisticasCard}>
            <Text style={styles.cardTitle}>Estado Financiero</Text>
            <View style={styles.estadisticasContainer}>
              <View style={styles.estadisticaItem}>
                <Text style={styles.estadisticaNumero}>
                  {formatearMoneda(estadisticasGastos.totalGastos)}
                </Text>
                <Text style={styles.estadisticaLabel}>Total gastos</Text>
              </View>
              <View style={styles.estadisticaItem}>
                <Text style={[
                  styles.estadisticaNumero,
                  { color: estadisticasGastos.montoPendiente > 0 ? '#e74c3c' : '#27ae60' }
                ]}>
                  {formatearMoneda(estadisticasGastos.montoPendiente)}
                </Text>
                <Text style={styles.estadisticaLabel}>Pendiente</Text>
              </View>
              <View style={styles.estadisticaItem}>
                <Text style={[
                  styles.estadisticaNumero,
                  { color: estadisticasGastos.porcentajeCubierto >= 80 ? '#27ae60' : '#f39c12' }
                ]}>
                  {estadisticasGastos.porcentajeCubierto}%
                </Text>
                <Text style={styles.estadisticaLabel}>Cubierto</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.apoyoCard}>
          <Text style={styles.cardTitle}>Información del Tratamiento</Text>
          <View style={styles.apoyoInfo}>
            <Text style={styles.apoyoText}>
              💊 Tipo principal: {paciente?.tipoCancer}
            </Text>
            <Text style={styles.apoyoText}>
              ⚕️ Estado: {historialActual?.estado || "No definido"}
            </Text>
            <Text style={styles.apoyoText}>
              📊 Total sesiones: {sesiones.length}
            </Text>
            <Text style={styles.apoyoText}>
              📅 Próximas citas:{" "}
              {
                citas.filter(
                  (c: any) =>
                    c.estado === "PROGRAMADA" || c.estado === "CONFIRMADA"
                ).length
              }
            </Text>
            {historialActual?.observaciones && (
              <Text style={styles.apoyoText}>
                📝 Observaciones: {historialActual.observaciones}
              </Text>
            )}
          </View>
        </View>

        {/* Nueva sección de información financiera detallada */}
        {gastosMedicos.length > 0 && (
          <View style={styles.apoyoCard}>
            <Text style={styles.cardTitle}>Información Financiera</Text>
            <View style={styles.apoyoInfo}>
              <Text style={styles.apoyoText}>
                💰 Total acumulado: {formatearMoneda(estadisticasGastos.totalGastos)}
              </Text>
              <Text style={styles.apoyoText}>
                🏥 Cubierto por institución: {formatearMoneda(estadisticasGastos.totalCubierto)}
              </Text>
              <Text style={styles.apoyoText}>
                👨‍👩‍👧‍👦 Aporte familiar: {formatearMoneda(estadisticasGastos.totalFamilia)}
              </Text>
              {estadisticasGastos.montoPendiente > 0 ? (
                <Text style={[styles.apoyoText, { color: '#e74c3c', fontWeight: 'bold' }]}>
                  ⚠️ Monto pendiente: {formatearMoneda(estadisticasGastos.montoPendiente)}
                </Text>
              ) : (
                <Text style={[styles.apoyoText, { color: '#27ae60', fontWeight: 'bold' }]}>
                  ✅ Sin montos pendientes
                </Text>
              )}
              <Text style={styles.apoyoText}>
                📊 Total registros: {gastosMedicos.length} gastos médicos
              </Text>
              {estadisticasGastos.ultimoGasto && (
                <Text style={styles.apoyoText}>
                  📅 Último gasto: {estadisticasGastos.ultimoGasto.concepto} - {formatearFecha(estadisticasGastos.ultimoGasto.fecha)}
                </Text>
              )}
            </View>
          </View>
        )}

        {/* Card adicional para últimas citas */}
        {citas.length > 0 && (
          <View style={styles.apoyoCard}>
            <Text style={styles.cardTitle}>Próximas Citas</Text>
            <View style={styles.apoyoInfo}>
              {citas.slice(0, 3).map((cita: any, index: number) => (
                <Text key={cita.id} style={styles.apoyoText}>
                  📅 {formatearFecha(cita.fecha)} - {cita.hora} ({cita.tipo}) -{" "}
                  {cita.estado}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Card adicional para últimos gastos médicos */}
        {gastosMedicos.length > 0 && (
          <View style={styles.apoyoCard}>
            <Text style={styles.cardTitle}>Últimos Gastos Médicos</Text>
            <View style={styles.apoyoInfo}>
              {gastosMedicos
                .sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                .slice(0, 3)
                .map((gasto: any, index: number) => {
                  const pendiente = parseFloat(gasto.montoTotal) - parseFloat(gasto.montoCubierto) - parseFloat(gasto.montoFamilia);
                  return (
                    <View key={gasto.id} style={{ marginBottom: 8 }}>
                      <Text style={styles.apoyoText}>
                        💰 {gasto.concepto} - {formatearFecha(gasto.fecha)}
                      </Text>
                      <Text style={styles.apoyoText}>
                        Total: {formatearMoneda(gasto.montoTotal)} | 
                        Pendiente: {pendiente > 0 ? formatearMoneda(pendiente) : "Cubierto"}
                      </Text>
                      {gasto.observaciones && (
                        <Text style={[styles.apoyoText, { fontSize: 12, opacity: 0.8 }]}>
                          📝 {gasto.observaciones}
                        </Text>
                      )}
                    </View>
                  );
                })
              }
            </View>
          </View>
        )}
      </View>

      <Pressable style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </Pressable>
    </ScrollView>
  );
}