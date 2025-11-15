import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  Dimensions,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { usePatientData } from "@/hooks/userPatientData";
import { stylesIndex as styles } from "@/style/styleIndex";

const { width } = Dimensions.get("window");

export default function Dashboard() {
  const { patientData, loading, error } = usePatientData();
  const paciente: any = patientData?.[0];

  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState(null);

  const navigateToSection = (route: any) => {
    router.push(route);
  };

  const openFacebookPage = () => {
    const url = "https://www.facebook.com/p/Fundacion-Oncofeliz-100081289495886/";
    Linking.openURL(url).catch((err) =>
      Alert.alert("Error", "No se pudo abrir el enlace")
    );
  };

 const openWhatsApp = () => {
  const phoneNumber = "59179397462"; // Número sin el '+' y sin espacios
  const message = "Hola, soy usuario de oncoFeliz y necesito ayuda con la aplicación. ¿Podrían asistirme por favor?";
  
  const encodedMessage = encodeURIComponent(message);
  
  const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
  
  Linking.openURL(whatsappURL).catch((err) => {
    // Si no se puede abrir WhatsApp, mostrar alerta
    Alert.alert(
      "Error", 
      "No se pudo abrir WhatsApp. Asegúrate de tener WhatsApp instalado en tu dispositivo."
    );
  });
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header minimalista */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>
                Hola, {paciente?.padre?.nombre}
              </Text>
              <Text style={styles.date}>Miércoles, 2 de Julio</Text>
            </View>
            <View style={styles.navigationBar}>
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigateToSection("/notificaciones")}
              >
                <Text style={styles.navIcon}>🔔</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigateToSection("/configuracion")}
              >
                <Text style={styles.navIcon}>⚙️</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tratamiento</Text>
          <TouchableOpacity
            style={styles.treatmentCard}
            onPress={() =>
              Alert.alert(
                "Confirmado",
                "Has indicado que tu hijo continúa en tratamiento activo."
              )
            }
            activeOpacity={0.7}
          >
            <View style={styles.treatmentContent}>
              <View style={styles.treatmentIcon}>
                <Text style={styles.treatmentIconText}>✓</Text>
              </View>
              <View style={styles.treatmentText}>
                <Text style={styles.treatmentTitle}>
                  Confirmar tratamiento activo
                </Text>
                <Text style={styles.treatmentSubtitle}>
                  Mi hijo continúa con el tratamiento
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Información importante */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información importante</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoIcon}>ℹ️</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Importancia del tratamiento</Text>
              <Text style={styles.infoText}>
                Interrumpir el tratamiento puede empeorar la salud del niño.
                Muchos casos que se abandonan deben continuar con tratamientos
                paliativos.
              </Text>
            </View>
          </View>
        </View>

        {/* Asistente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Asistente</Text>
          <TouchableOpacity
            style={styles.assistantCard}
            onPress={() => router.push("/chatbot")}
            activeOpacity={0.7}
          >
            <View style={styles.assistantContent}>
              <View style={styles.assistantIcon}>
                <Text style={styles.assistantIconText}>💬</Text>
              </View>
              <View style={styles.assistantText}>
                <Text style={styles.assistantTitle}>
                  Hablar con trabajador social
                </Text>
                <Text style={styles.assistantSubtitle}>
                  Disponible 24/7 para ayudarte
                </Text>
              </View>
              <Text style={styles.assistantArrow}>→</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Ayuda */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ayuda</Text>
          <View style={styles.helpContainer}>
            <TouchableOpacity
              style={[styles.helpButton, localStyles.facebookButton]}
              onPress={openFacebookPage}
            >
              <View style={localStyles.buttonContent}>
                <Text style={styles.helpButtonText}>Centro de ayuda</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.helpButton, styles.helpButtonSecondary, localStyles.phoneButton]}
              onPress={openWhatsApp}
            >
              <View style={localStyles.buttonContent}>
                <Text style={styles.helpButtonSecondaryText}>
                  Contactar soporte
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  facebookButton: {
    backgroundColor: '#4267B2',
    borderColor: '#4267B2',
  },
  phoneButton: {
    backgroundColor: '#25D366',
    borderColor: '#25D366',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 16,
    marginRight: 8,
  },
});