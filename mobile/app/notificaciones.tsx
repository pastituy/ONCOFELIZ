import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { stylesNotificaciones as styles } from '@/style/styleNotificacion';
import { usePatientData } from '@/hooks/userPatientData';

export default function Notificaciones() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<any>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Aquí obtienes los datos del paciente
  const { patientData, loading, error } = usePatientData();
  const paciente: any = patientData?.[0];

  useEffect(() => {
    if (paciente) {
      const generatedNotifications = generateNotificationsFromPatientData(paciente);
      setNotifications(generatedNotifications);
      setUnreadCount(generatedNotifications.filter((n: any) => !n.isRead).length);
    }
  }, [paciente]);

  const generateNotificationsFromPatientData = (paciente: any) => {
    const notifications = [];
    let notificationId = 1;

    // Notificaciones basadas en citas próximas
    if (paciente.Cita && paciente.Cita.length > 0) {
      paciente.Cita.forEach((cita: any) => {
        const citaFecha = new Date(cita.fecha);
        const hoy = new Date();
        const diferenciaDias = Math.ceil((citaFecha.getTime() - hoy.getTime()) / (1000 * 3600 * 24));

        if (diferenciaDias >= 0 && diferenciaDias <= 2) {
          notifications.push({
            id: notificationId++,
            type: 'reminder',
            title: `Cita médica próxima - ${paciente.nombre}`,
            message: `${cita.tipo} programada para el ${citaFecha.toLocaleDateString()} a las ${cita.hora}. ${cita.notas || ''}`,
            time: diferenciaDias === 0 ? 'Hoy' : diferenciaDias === 1 ? 'Mañana' : `${diferenciaDias} días`,
            isRead: false,
            priority: diferenciaDias === 0 ? 'high' : 'normal',
            data: { citaId: cita.id, tipo: 'cita' }
          });
        }
      });
    }

    // Notificaciones basadas en tratamientos activos
    if (paciente.Tratamiento && paciente.Tratamiento.length > 0) {
      const tratamientosActivos = paciente.Tratamiento.filter((t: any) => t.estado);
      
      tratamientosActivos.forEach((tratamiento: any) => {
        const siguienteCita = new Date(tratamiento.siguienteCita);
        const hoy = new Date();
        const diferenciaDias = Math.ceil((siguienteCita.getTime() - hoy.getTime()) / (1000 * 3600 * 24));

        if (diferenciaDias >= 0 && diferenciaDias <= 3) {
          notifications.push({
            id: notificationId++,
            type: 'treatment',
            title: `Recordatorio de tratamiento - ${paciente.nombre}`,
            message: `${tratamiento.tipoTratamiento}: ${tratamiento.descripcion}. Próxima sesión: ${siguienteCita.toLocaleDateString()}`,
            time: diferenciaDias === 0 ? 'Hoy' : `${diferenciaDias} días`,
            isRead: false,
            priority: diferenciaDias <= 1 ? 'high' : 'normal',
            data: { tratamientoId: tratamiento.id, tipo: 'tratamiento' }
          });
        }
      });
    }

    // Notificación de registro emocional diario
   /*  notifications.push({
      id: notificationId++,
      type: 'reminder',
      title: 'Registro emocional diario',
      message: `Es hora de registrar cómo te has sentido hoy. Tu bienestar emocional es importante para el proceso de ${paciente.nombre}.`,
      time: '2 min',
      isRead: false,
      priority: 'normal',
      data: { tipo: 'registro_emocional' }
    }); */

    // Notificaciones basadas en historial clínico
    if (paciente.HistorialClinico && paciente.HistorialClinico.length > 0) {
      const ultimoHistorial = paciente.HistorialClinico[paciente.HistorialClinico.length - 1];
      
      if (ultimoHistorial.estado === 'EN_TRATAMIENTO') {
        notifications.push({
          id: notificationId++,
          type: 'info',
          title: 'Seguimiento del tratamiento',
          message: `${paciente.nombre} continúa en tratamiento para ${paciente.tipoCancer}. Última actualización: ${new Date(ultimoHistorial.updatedAt).toLocaleDateString()}`,
          time: '1 hora',
          isRead: false,
          priority: 'normal',
          data: { historialId: ultimoHistorial.id, tipo: 'historial' }
        });
      }
    }

    // Notificaciones basadas en sesiones completadas recientes
    if (paciente.Sesion && paciente.Sesion.length > 0) {
      const sesionesRecientes = paciente.Sesion.filter((s: any) => {
        const fechaSesion = new Date(s.updatedAt);
        const hoy = new Date();
        const diferenciaDias = Math.ceil((hoy.getTime() - fechaSesion.getTime()) / (1000 * 3600 * 24));
        return diferenciaDias <= 7 && s.estado === 'COMPLETADA';
      });

      if (sesionesRecientes.length > 0) {
        const ultimaSesion = sesionesRecientes[sesionesRecientes.length - 1];
        notifications.push({
          id: notificationId++,
          type: 'support',
          title: 'Sesión completada',
          message: `Sesión ${ultimaSesion.tipo.toLowerCase()} completada exitosamente. Duración: ${ultimaSesion.duracion} min. ${ultimaSesion.notas || ''}`,
          time: '3 horas',
          isRead: true,
          priority: 'normal',
          data: { sesionId: ultimaSesion.id, tipo: 'sesion' }
        });
      }
    }

    // Notificación de información general
    notifications.push({
      id: notificationId++,
      type: 'info',
      title: 'Recursos de apoyo disponibles',
      message: `Nuevos recursos disponibles para familias con niños en tratamiento de ${paciente.tipoCancer} en ${paciente.ciudad}`,
      time: '2 días',
      isRead: true,
      priority: 'normal',
      data: { tipo: 'recursos' }
    });

    // Notificación del trabajador social
    notifications.push({
      id: notificationId++,
      type: 'support',
      title: 'Mensaje del trabajador social',
      message: `Hola ${paciente.padre?.nombre}, ¿cómo han estado tú y ${paciente.nombre}? Me gustaría saber cómo se sienten hoy.`,
      time: '1 día',
      isRead: false,
      priority: 'normal',
      data: { tipo: 'trabajador_social' }
    });

    // Alerta si hay muchas sesiones recientes (podría indicar necesidad de más apoyo)
   /*  if (paciente.Sesion && paciente.Sesion.length >= 2) {
      notifications.push({
        id: notificationId++,
        type: 'alert',
        title: 'Seguimiento emocional',
        message: `Hemos notado que has tenido varias sesiones recientemente. ¿Te gustaría hablar sobre cómo te has sentido durante el proceso de ${paciente.nombre}?`,
        time: '6 horas',
        isRead: false,
        priority: 'high',
        data: { tipo: 'seguimiento_emocional' }
      });
    } */

    return notifications.sort((a, b) => {
      // Ordenar por prioridad (high primero) y luego por no leídas
      if (a.priority === 'high' && b.priority !== 'high') return -1;
      if (b.priority === 'high' && a.priority !== 'high') return 1;
      if (!a.isRead && b.isRead) return -1;
      if (a.isRead && !b.isRead) return 1;
      return 0;
    });
  };

  const getNotificationIcon = (type: any) => {
    switch (type) {
      case 'reminder': return '⏰';
      case 'treatment': return '💊';
      case 'support': return '💬';
      case 'alert': return '⚠️';
      case 'info': return 'ℹ️';
      case 'system': return '📱';
      default: return '🔔';
    }
  };

  const getNotificationColor = (priority: any, isRead: any) => {
    if (isRead) return '#F8FAFC';
    
    switch (priority) {
      case 'high': return '#FEF2F2';
      case 'low': return '#F0F9FF';
      default: return '#F8FAFC';
    }
  };

  const getBorderColor = (priority: any, isRead: any) => {
    if (isRead) return '#E2E8F0';
    
    switch (priority) {
      case 'high': return '#FCA5A5';
      case 'low': return '#93C5FD';
      default: return '#E2E8F0';
    }
  };

  const handleNotificationPress = (notification: any) => {
    // Marcar como leída
    setNotifications((prev: any) => 
      prev.map((n: any) => 
        n.id === notification.id ? { ...n, isRead: true } : n
      )
    );
    
    if (unreadCount > 0) {
      setUnreadCount(prev => prev - 1);
    }

    // Navegar según el tipo de notificación y los datos
    const { data } = notification;
    
    switch (notification.type) {
      case 'reminder':
        if (data?.tipo === 'cita') {
          router.push('/calendario'); // O la ruta específica para citas
        } else if (data?.tipo === 'registro_emocional') {
          router.push('/'); // Dashboard para registro emocional
        } else {
          router.push('/');
        }
        break;
        
      case 'treatment':
        router.push('/historial'); // O la ruta específica para tratamientos
        break;
        
      case 'support':
        router.push('/chatbot');
        break;
        
      case 'alert':
        Alert.alert(
          'Seguimiento emocional',
          '¿Te gustaría hablar con nuestro asistente sobre cómo te has sentido?',
          [
            { text: 'Ahora no', style: 'cancel' },
            { text: 'Hablar', onPress: () => router.push('/chatbot') }
          ]
        );
        break;
        
      case 'info':
        router.push('/chatbot');
        break;
        
      default:
        Alert.alert('Notificación', notification.message);
    }
  };

  const markAllAsRead = () => {
    Alert.alert(
      'Marcar todas como leídas',
      '¿Estás seguro que deseas marcar todas las notificaciones como leídas?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Marcar todas', 
          onPress: () => {
            setNotifications((prev: any) => prev.map((n: any) => ({ ...n, isRead: true })));
            setUnreadCount(0);
          }
        }
      ]
    );
  };

  const clearAllNotifications = () => {
    Alert.alert(
      'Limpiar notificaciones',
      '¿Estás seguro que deseas eliminar todas las notificaciones?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar todas', 
          style: 'destructive',
          onPress: () => {
            setNotifications([]);
            setUnreadCount(0);
          }
        }
      ]
    );
  };

  const NotificationItem = ({ notification }: any) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        { 
          backgroundColor: getNotificationColor(notification.priority, notification.isRead),
          borderColor: getBorderColor(notification.priority, notification.isRead)
        }
      ]}
      onPress={() => handleNotificationPress(notification)}
      activeOpacity={0.7}
    >
      <View style={styles.notificationContent}>
        <View style={styles.notificationIcon}>
          <Text style={styles.notificationIconText}>
            {getNotificationIcon(notification.type)}
          </Text>
        </View>
        
        <View style={styles.notificationText}>
          <View style={styles.notificationHeader}>
            <Text style={[
              styles.notificationTitle,
              !notification.isRead && styles.notificationTitleUnread
            ]}>
              {notification.title}
            </Text>
            <Text style={styles.notificationTime}>{notification.time}</Text>
          </View>
          
          <Text style={styles.notificationMessage} numberOfLines={2}>
            {notification.message}
          </Text>
          
          {!notification.isRead && (
            <View style={styles.unreadIndicator} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  // Mostrar loading mientras se cargan los datos
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.loadingContainer}>
          <Text>Cargando notificaciones...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Mostrar error si hay problemas
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.errorContainer}>
          <Text>Error al cargar notificaciones</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Notificaciones</Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Patient Info Header */}
      {paciente && (
        <View style={styles.patientInfo}>
          <Text style={styles.patientInfoText}>
            Notificaciones para {paciente.nombre} {paciente.apellido}
          </Text>
        </View>
      )}

      {/* Actions */}
      {notifications.length > 0 && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <Text style={[
              styles.actionButtonText,
              unreadCount === 0 && styles.actionButtonTextDisabled
            ]}>
              Marcar todas como leídas
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.actionButtonSecondary]}
            onPress={clearAllNotifications}
          >
            <Text style={styles.actionButtonSecondaryText}>Limpiar todo</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>🔔</Text>
            <Text style={styles.emptyStateTitle}>No hay notificaciones</Text>
            <Text style={styles.emptyStateMessage}>
              Cuando tengas nuevas notificaciones aparecerán aquí
            </Text>
          </View>
        ) : (
          <View style={styles.notificationsList}>
            {notifications.map((notification: any) => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}