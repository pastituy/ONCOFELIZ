import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
  StatusBar,
  TextInput,
  Modal,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function Configuracion() {
  const router = useRouter();
  
  const [notificacionesActivas, setNotificacionesActivas] = useState(true);
  const [recordatoriosTratamiento, setRecordatoriosTratamiento] = useState(true);
  const [registroEmocionalDiario, setRegistroEmocionalDiario] = useState(true);
  const [modoPrivado, setModoPrivado] = useState(false);
  
  // Estados para modales
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [supportModalVisible, setSupportModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  
  // Estados para formularios
  const [supportMessage, setSupportMessage] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportPhone, setSupportPhone] = useState('');
  const [reportTitle, setReportTitle] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [reportType, setReportType] = useState('bug');

  const handleLogout = () => {
    router.replace('/')
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión', 
          style: 'destructive',
          onPress: () => {
            // Aquí iría la lógica de logout real
            // Ejemplo: AsyncStorage.removeItem('token');
            Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente', [
              { text: 'OK', onPress: () => router.replace('/login') }
            ]);
          }
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Eliminar Cuenta',
      'Esta acción no se puede deshacer. Se eliminarán todos tus datos y registros emocionales.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Cuenta eliminada', 'Tu cuenta ha sido eliminada correctamente');
          }
        },
      ]
    );
  };

  const handleSupportSubmit = () => {
    if (!supportMessage.trim()) {
      Alert.alert('Error', 'Por favor describe tu consulta');
      return;
    }
    
    // Simular envío de soporte
    Alert.alert(
      'Mensaje enviado', 
      'Tu mensaje ha sido enviado a nuestro equipo de soporte. Te contactaremos pronto.',
      [
        { text: 'OK', onPress: () => {
          setSupportModalVisible(false);
          setSupportMessage('');
          setSupportEmail('');
          setSupportPhone('');
        }}
      ]
    );
  };

  const handleReportSubmit = () => {
    if (!reportTitle.trim() || !reportDescription.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    
    // Simular envío de reporte
    Alert.alert(
      'Reporte enviado', 
      'Gracias por tu reporte. Nuestro equipo lo revisará pronto.',
      [
        { text: 'OK', onPress: () => {
          setReportModalVisible(false);
          setReportTitle('');
          setReportDescription('');
          setReportType('bug');
        }}
      ]
    );
  };

  const faqData = [
    {
      question: "¿Cómo registro el estado emocional diario?",
      answer: "Ve al dashboard principal y presiona 'Registrar Estado'. Puedes seleccionar emojis y agregar notas sobre cómo te sientes."
    },
    {
      question: "¿Cómo confirmo que el tratamiento continúa?",
      answer: "En la sección de tratamientos, presiona 'Confirmar tratamiento activo' y actualiza la información según las indicaciones médicas."
    },
    {
      question: "¿Puedo ver el historial de mis registros?",
      answer: "Sí, ve a la sección 'Historial' donde podrás ver todos tus registros emocionales y su progreso a lo largo del tiempo."
    },
    {
      question: "¿Cómo contactar al trabajador social?",
      answer: "Usa el chatbot integrado o ve a la sección de contactos donde encontrarás la información directa del trabajador social asignado."
    },
    {
      question: "¿Los datos están seguros?",
      answer: "Sí, todos los datos están encriptados y protegidos. Solo el personal médico autorizado puede acceder a la información."
    },
    {
      question: "¿Puedo usar la app offline?",
      answer: "Algunas funciones como registrar emociones funcionan offline. Los datos se sincronizarán cuando tengas conexión a internet."
    }
  ];

  const SettingItem = ({ title, subtitle, onPress, rightComponent, showArrow = false }:any) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.settingContent}>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
        <View style={styles.settingRight}>
          {rightComponent}
          {showArrow && <Text style={styles.settingArrow}>→</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }:any) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const FAQItem = ({ question, answer }:any) => {
    const [expanded, setExpanded] = useState(false);
    
    return (
      <View style={styles.faqItem}>
        <TouchableOpacity 
          style={styles.faqQuestion}
          onPress={() => setExpanded(!expanded)}
        >
          <Text style={styles.faqQuestionText}>{question}</Text>
          <Text style={styles.faqArrow}>{expanded ? '▼' : '▶'}</Text>
        </TouchableOpacity>
        {expanded && (
          <View style={styles.faqAnswer}>
            <Text style={styles.faqAnswerText}>{answer}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Configuración</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.section}>
          <SectionHeader title="Notificaciones" />
          
          <SettingItem
            title="Notificaciones push"
            subtitle="Recibe alertas importantes en tu dispositivo"
            rightComponent={
              <Switch
                value={notificacionesActivas}
                onValueChange={(value) => {
                  setNotificacionesActivas(value);
                  Alert.alert(
                    'Configuración actualizada',
                    value ? 'Las notificaciones han sido activadas' : 'Las notificaciones han sido desactivadas'
                  );
                }}
                trackColor={{ false: '#E2E8F0', true: '#FF6B35' }}
                thumbColor={notificacionesActivas ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
          
          <SettingItem
            title="Recordatorios de tratamiento"
            subtitle="Alertas para confirmar el tratamiento activo"
            rightComponent={
              <Switch
                value={recordatoriosTratamiento}
                onValueChange={(value) => {
                  setRecordatoriosTratamiento(value);
                  Alert.alert(
                    'Configuración actualizada',
                    value ? 'Los recordatorios de tratamiento han sido activados' : 'Los recordatorios de tratamiento han sido desactivados'
                  );
                }}
                trackColor={{ false: '#E2E8F0', true: '#FF6B35' }}
                thumbColor={recordatoriosTratamiento ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />

          <SettingItem
            title="Registro emocional diario"
            subtitle="Recordatorio para registrar tu estado emocional"
            rightComponent={
              <Switch
                value={registroEmocionalDiario}
                onValueChange={(value) => {
                  setRegistroEmocionalDiario(value);
                  Alert.alert(
                    'Configuración actualizada',
                    value ? 'Los recordatorios de registro emocional han sido activados' : 'Los recordatorios de registro emocional han sido desactivados'
                  );
                }}
                trackColor={{ false: '#E2E8F0', true: '#FF6B35' }}
                thumbColor={registroEmocionalDiario ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
        </View>

        {/* Soporte */}
        <View style={styles.section}>
          <SectionHeader title="Soporte" />
          
          <SettingItem
            title="Centro de ayuda"
            subtitle="Preguntas frecuentes y guías"
            onPress={() => setHelpModalVisible(true)}
            showArrow={true}
          />
          
          <SettingItem
            title="Contactar soporte"
            subtitle="Habla directamente con nuestro equipo"
            onPress={() => setSupportModalVisible(true)}
            showArrow={true}
          />
          
          <SettingItem
            title="Reportar problema"
            subtitle="Ayúdanos a mejorar la aplicación"
            onPress={() => setReportModalVisible(true)}
            showArrow={true}
          />

          <SettingItem
            title="Llamar a emergencia"
            subtitle="Línea directa 24/7: 911"
            onPress={() => {
              Alert.alert(
                'Llamar a emergencia',
                '¿Deseas llamar al número de emergencia 911?',
                [
                  { text: 'Cancelar', style: 'cancel' },
                  { text: 'Llamar', onPress: () => Linking.openURL('tel:911') }
                ]
              );
            }}
            showArrow={true}
          />
        </View>

        {/* Información de la app */}
        <View style={styles.section}>
          <SectionHeader title="Información" />
          
          <SettingItem
            title="Versión de la aplicación"
            subtitle="1.0.0 (Build 1)"
          />
          
          <SettingItem
            title="Acerca de"
            subtitle="Sistema de seguimiento emocional y tratamiento"
            onPress={() => setAboutModalVisible(true)}
            showArrow={true}
          />

          <SettingItem
            title="Términos y condiciones"
            subtitle="Política de privacidad y uso"
            onPress={() => Alert.alert('Términos y condiciones', 'Al usar esta aplicación, aceptas compartir información médica necesaria para tu seguimiento. Todos los datos están protegidos bajo normativas de privacidad médica.')}
            showArrow={true}
          />
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteButtonText}>Eliminar Cuenta</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Modal Centro de Ayuda */}
      <Modal
        visible={helpModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Centro de Ayuda</Text>
            <TouchableOpacity onPress={() => setHelpModalVisible(false)}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <Text style={styles.faqTitle}>Preguntas Frecuentes</Text>
            {faqData.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
            
            <View style={styles.helpSection}>
              <Text style={styles.helpSectionTitle}>¿Necesitas más ayuda?</Text>
              <Text style={styles.helpSectionText}>
                Si no encuentras la respuesta a tu pregunta, puedes contactar directamente a nuestro equipo de soporte.
              </Text>
              <TouchableOpacity 
                style={styles.helpContactButton}
                onPress={() => {
                  setHelpModalVisible(false);
                  setTimeout(() => setSupportModalVisible(true), 300);
                }}
              >
                <Text style={styles.helpContactButtonText}>Contactar Soporte</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Modal Contactar Soporte */}
      <Modal
        visible={supportModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Contactar Soporte</Text>
            <TouchableOpacity onPress={() => setSupportModalVisible(false)}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <Text style={styles.formLabel}>Describe tu consulta *</Text>
            <TextInput
              style={[styles.formInput, styles.formTextArea]}
              value={supportMessage}
              onChangeText={setSupportMessage}
              placeholder="Describe tu consulta o problema..."
              multiline
              numberOfLines={4}
            />
            
            <Text style={styles.formLabel}>Email de contacto (opcional)</Text>
            <TextInput
              style={styles.formInput}
              value={supportEmail}
              onChangeText={setSupportEmail}
              placeholder="tu-email@ejemplo.com"
              keyboardType="email-address"
            />
            
            <Text style={styles.formLabel}>Teléfono (opcional)</Text>
            <TextInput
              style={styles.formInput}
              value={supportPhone}
              onChangeText={setSupportPhone}
              placeholder="+591 XXXXXXXX"
              keyboardType="phone-pad"
            />
            
            <View style={styles.supportInfo}>
              <Text style={styles.supportInfoTitle}>Otras formas de contacto:</Text>
              <TouchableOpacity 
                style={styles.supportContactItem}
                onPress={() => Linking.openURL('tel:+59144123456')}
              >
                <Text style={styles.supportContactText}>📞 Teléfono: +591 4 412-3456</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.supportContactItem}
                onPress={() => Linking.openURL('mailto:soporte@miapp.com')}
              >
                <Text style={styles.supportContactText}>📧 Email: soporte@miapp.com</Text>
              </TouchableOpacity>
              <Text style={styles.supportContactText}>🕐 Horario: Lunes a Viernes 8:00-18:00</Text>
            </View>
            
            <TouchableOpacity style={styles.submitButton} onPress={handleSupportSubmit}>
              <Text style={styles.submitButtonText}>Enviar Mensaje</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Modal Reportar Problema */}
      <Modal
        visible={reportModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Reportar Problema</Text>
            <TouchableOpacity onPress={() => setReportModalVisible(false)}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <Text style={styles.formLabel}>Tipo de problema</Text>
            <View style={styles.radioGroup}>
              {[
                { value: 'bug', label: '🐛 Error en la aplicación' },
                { value: 'feature', label: '💡 Solicitud de función' },
                { value: 'performance', label: '⚡ Problema de rendimiento' },
                { value: 'other', label: '❓ Otro' }
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.radioOption}
                  onPress={() => setReportType(option.value)}
                >
                  <View style={[styles.radioCircle, reportType === option.value && styles.radioSelected]} />
                  <Text style={styles.radioLabel}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={styles.formLabel}>Título del problema *</Text>
            <TextInput
              style={styles.formInput}
              value={reportTitle}
              onChangeText={setReportTitle}
              placeholder="Resumen breve del problema"
            />
            
            <Text style={styles.formLabel}>Descripción detallada *</Text>
            <TextInput
              style={[styles.formInput, styles.formTextArea]}
              value={reportDescription}
              onChangeText={setReportDescription}
              placeholder="Describe el problema paso a paso. Incluye cuándo ocurre, qué esperabas que pasara, y cualquier mensaje de error."
              multiline
              numberOfLines={6}
            />
            
            <TouchableOpacity style={styles.submitButton} onPress={handleReportSubmit}>
              <Text style={styles.submitButtonText}>Enviar Reporte</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Modal Acerca de */}
      <Modal
        visible={aboutModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Acerca de la Aplicación</Text>
            <TouchableOpacity onPress={() => setAboutModalVisible(false)}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.aboutSection}>
              <Text style={styles.aboutTitle}>Sistema de Seguimiento Emocional</Text>
              <Text style={styles.aboutVersion}>Versión 1.0.0</Text>
              
              <Text style={styles.aboutDescription}>
                Esta aplicación está diseñada para apoyar a familias con niños en tratamiento médico, 
                proporcionando herramientas para el seguimiento emocional, recordatorios de tratamiento 
                y comunicación directa con el equipo de atención médica.
              </Text>
              
              <View style={styles.featuresList}>
                <Text style={styles.featuresTitle}>Características principales:</Text>
                <Text style={styles.featureItem}>• Registro diario del estado emocional</Text>
                <Text style={styles.featureItem}>• Recordatorios de tratamiento y citas</Text>
                <Text style={styles.featureItem}>• Comunicación con trabajadores sociales</Text>
                <Text style={styles.featureItem}>• Seguimiento del progreso emocional</Text>
                <Text style={styles.featureItem}>• Recursos de apoyo y orientación</Text>
              </View>
              
              <View style={styles.aboutContact}>
                <Text style={styles.aboutContactTitle}>Desarrollado por:</Text>
                <Text style={styles.aboutContactText}>Equipo de Desarrollo Médico</Text>
                <Text style={styles.aboutContactText}>En colaboración con profesionales de la salud</Text>
              </View>
              
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    marginRight: 16,
  },
  backText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    backgroundColor: '#FFFFFF',
    marginBottom: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingArrow: {
    fontSize: 16,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EF4444',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  modalCloseButton: {
    fontSize: 24,
    color: '#6B7280',
    padding: 4,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginVertical: 16,
  },
  faqItem: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    flex: 1,
  },
  faqArrow: {
    fontSize: 14,
    color: '#6B7280',
  },
  faqAnswer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  helpSection: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#F0F9FF',
    borderRadius: 8,
    marginBottom: 24,
  },
  helpSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  helpSectionText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  helpContactButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  helpContactButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  formTextArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  supportInfo: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  supportInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  supportContactItem: {
    paddingVertical: 4,
  },
  supportContactText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  submitButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  radioGroup: {
    marginBottom: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
  },
  radioSelected: {
    borderColor: '#FF6B35',
    backgroundColor: '#FF6B35',
  },
  radioLabel: {
    fontSize: 16,
    color: '#1F2937',
  },
  aboutSection: {
    paddingVertical: 16,
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  aboutVersion: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  aboutDescription: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 24,
  },
  featuresList: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  featureItem: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    lineHeight: 20,
  },
  aboutContact: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  aboutContactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  aboutContactText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
});