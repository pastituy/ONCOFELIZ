import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = "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";

interface Mensaje {
  id: string;
  texto: string;
  remitente: 'usuario' | 'asistente';
  timestamp: Date;
  tieneEnlaceWhatsApp?: boolean;
}

export default function ChatPadresScreen() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [entrada, setEntrada] = useState('');
  const [cargando, setCargando] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Cargar mensajes guardados al iniciar
  useEffect(() => {
    cargarMensajes();
  }, []);

  // Guardar mensajes cuando cambien
  useEffect(() => {
    guardarMensajes();
  }, [mensajes]);

  // Scroll automático al final
  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [mensajes]);

  const cargarMensajes = async () => {
    try {
      const mensajesGuardados = await AsyncStorage.getItem('chat-padres-mensajes');
      if (mensajesGuardados) {
        const mensajesParsed = JSON.parse(mensajesGuardados).map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
        setMensajes(mensajesParsed);
      } else {
        // Mensaje de bienvenida inicial
        const mensajeBienvenida: Mensaje = {
          id: 'bienvenida',
          texto: '¡Hola! Soy el asistente de cáncer infantil. Estoy aquí para ayudarte con consultas médicas, información sobre tratamientos, apoyo emocional y recursos disponibles. ¿En qué puedo ayudarte hoy?',
          remitente: 'asistente',
          timestamp: new Date()
        };
        setMensajes([mensajeBienvenida]);
      }
    } catch (error) {
      console.error('Error al cargar mensajes:', error);
    }
  };

  const guardarMensajes = async () => {
    try {
      await AsyncStorage.setItem('chat-padres-mensajes', JSON.stringify(mensajes));
    } catch (error) {
      console.error('Error al guardar mensajes:', error);
    }
  };

  const openWhatsApp = () => {
    const phoneNumber = "59179397462"; // Número sin el '+' y sin espacios
    const message = "Hola, soy usuario de oncoFeliz y necesito comunicarme con la psicóloga. ¿Podrían asistirme por favor?";
    
    const encodedMessage = encodeURIComponent(message);
    
    // URL para WhatsApp Web
    const whatsappWebURL = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    
    Linking.openURL(whatsappWebURL).catch((err) => {
      // Si no se puede abrir WhatsApp Web, mostrar alerta
      Alert.alert(
        "Error", 
        "No se pudo abrir WhatsApp Web. Verifica tu conexión a internet."
      );
    });
  };

  // Función para detectar si la pregunta es sobre psicóloga
  const detectarConsultaPsicologa = (mensaje: string): boolean => {
    const palabrasClave = [
      'psicologa', 'psicóloga', 'psicologo', 'psicólogo',
      'psicologica', 'psicológica', 'apoyo psicologico', 'apoyo psicológico',
      'ayuda emocional', 'support psicológico', 'terapia',
      'hablar con alguien', 'necesito hablar'
    ];
    
    const mensajeLower = mensaje.toLowerCase();
    return palabrasClave.some(palabra => mensajeLower.includes(palabra));
  };

  const enviarMensaje = async () => {
    if (entrada.trim() === '' || cargando) return;

    const mensajeUsuario: Mensaje = {
      id: Date.now().toString(),
      texto: entrada.trim(),
      remitente: 'usuario',
      timestamp: new Date()
    };

    setMensajes(prev => [...prev, mensajeUsuario]);
    const preguntaUsuario = entrada.trim();
    const esConsultaPsicologa = detectarConsultaPsicologa(preguntaUsuario);
    setEntrada('');
    setCargando(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'com.cancerinfantil.app',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `Eres un asistente especializado en cáncer infantil, pero solo cancer, nada de otras preguntas, estas limitado a responde cualquier cosa que no sea relacionado que ayuda a padres y familiares. Tu objetivo es:

1. Proporcionar información médica precisa y comprensible sobre cáncer infantil
2. Ofrecer apoyo emocional y psicológico a las familias
3. Explicar tratamientos, efectos secundarios y cuidados
4. Proporcionar recursos y contactos útiles
5. Responder con empatía y comprensión

IMPORTANTE:
- Siempre recuerda que NO reemplazas la consulta médica profesional
- Si detectas una emergencia médica, recomienda contactar inmediatamente al médico
- Sé empático y comprensivo con la situación emocional de los padres
- Proporciona información basada en evidencia científica
- Ofrece esperanza realista y apoyo

Cuando te pregunten sobre comunicarse con la psicóloga o apoyo psicológico, responde:
"Comprendo que necesitas apoyo psicológico. Tenemos una psicóloga especializada en cáncer infantil disponible para ayudarte. Puedes contactarla directamente por WhatsApp al número: 59179397462

Haz clic en el botón de WhatsApp que aparece abajo para comunicarte directamente con ella."

Responde de manera cálida, profesional y con información útil. Pregunta detalles si necesitas más contexto para ayudar mejor.
`
            },
            {
              role: 'user',
              content: preguntaUsuario
            }
          ],
          temperature: 0.7,
          max_tokens: 800
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0]) {
        throw new Error('No se recibió respuesta válida del asistente');
      }

      const respuestaAsistente: Mensaje = {
        id: (Date.now() + 1).toString(),
        texto: data.choices[0].message.content.trim(),
        remitente: 'asistente',
        timestamp: new Date(),
        tieneEnlaceWhatsApp: esConsultaPsicologa
      };

      setMensajes(prev => [...prev, respuestaAsistente]);

    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      
      const mensajeError: Mensaje = {
        id: (Date.now() + 1).toString(),
        texto: 'Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, intenta nuevamente o contacta con el equipo médico si es urgente.',
        remitente: 'asistente',
        timestamp: new Date()
      };

      setMensajes(prev => [...prev, mensajeError]);
      
      Alert.alert(
        'Error',
        'No se pudo enviar el mensaje. Verifica tu conexión a internet e intenta nuevamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setCargando(false);
    }
  };

  const limpiarChat = async() => {
            setMensajes([]);
            await AsyncStorage.removeItem('chat-padres-mensajes');
            const mensajeBienvenida: Mensaje = {
              id: 'bienvenida-nuevo',
              texto: '¡Hola! Soy el asistente de cáncer infantil. ¿En qué puedo ayudarte hoy?',
              remitente: 'asistente',
              timestamp: new Date()
            };
            setMensajes([mensajeBienvenida]);
          
  };

  const formatearTiempo = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessage = ({ item }: { item: Mensaje }) => (
    <View style={styles.mensajeContainer}>
      <View
        style={[
          styles.mensaje,
          item.remitente === 'usuario' ? styles.mensajeUsuario : styles.mensajeAsistente,
        ]}
      >
        <Text style={[
          styles.textoMensaje,
          item.remitente === 'usuario' ? styles.textoUsuario : styles.textoAsistente
        ]}>
          {item.texto}
        </Text>
        
        {/* Botón de WhatsApp si el mensaje lo requiere */}
        {item.tieneEnlaceWhatsApp && (
          <TouchableOpacity 
            style={styles.botonWhatsApp}
            onPress={openWhatsApp}
          >
            <Text style={styles.textoBotonWhatsApp}>
              💬 Contactar Psicóloga por WhatsApp
            </Text>
          </TouchableOpacity>
        )}
        
        <Text style={[
          styles.timestamp,
          item.remitente === 'usuario' ? styles.timestampUsuario : styles.timestampAsistente
        ]}>
          {formatearTiempo(item.timestamp)}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: 'height' })}
      keyboardVerticalOffset={Platform.select({ ios: 90, android: 0 })}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Asistente Médico</Text>
        <Text style={styles.headerSubtitulo}>Cáncer Infantil</Text>
        <TouchableOpacity onPress={limpiarChat} style={styles.botonLimpiar}>
          <Text style={styles.textoLimpiar}>Limpiar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de mensajes */}
      <FlatList
        ref={flatListRef}
        data={mensajes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
        renderItem={renderMessage}
        showsVerticalScrollIndicator={false}
      />

      {/* Indicador de carga */}
      {cargando && (
        <View style={styles.indicadorCarga}>
          <ActivityIndicator size="small" color="#FF6B47" />
          <Text style={styles.textoCargando}>El asistente está escribiendo...</Text>
        </View>
      )}

      {/* Input de mensaje */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Escribe tu consulta médica..."
          value={entrada}
          onChangeText={setEntrada}
          style={styles.input}
          multiline
          maxLength={500}
          editable={!cargando}
          placeholderTextColor="#999"
        />
        <TouchableOpacity 
          onPress={enviarMensaje} 
          style={[
            styles.botonEnviar,
            (entrada.trim() === '' || cargando) && styles.botonDeshabilitado
          ]}
          disabled={entrada.trim() === '' || cargando}
        >
          {cargando ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.textoBotonEnviar}>📤</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Disclaimer médico */}
      <View style={styles.disclaimer}>
        <Text style={styles.textoDisclaimer}>
          💡 Este asistente proporciona información general. En caso de emergencia, contacta inmediatamente a tu médico.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#FF6B47',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitulo: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitulo: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    position: 'absolute',
    bottom: 5,
    left: 20,
  },
  botonLimpiar: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  textoLimpiar: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  mensajeContainer: {
    marginBottom: 12,
  },
  mensaje: {
    padding: 12,
    borderRadius: 18,
    maxWidth: '85%',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  mensajeUsuario: {
    backgroundColor: '#FF6B47',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  mensajeAsistente: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  textoMensaje: {
    fontSize: 15,
    lineHeight: 20,
  },
  textoUsuario: {
    color: 'white',
  },
  textoAsistente: {
    color: '#333',
  },
  botonWhatsApp: {
    backgroundColor: '#25D366',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  textoBotonWhatsApp: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
    opacity: 0.7,
  },
  timestampUsuario: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'right',
  },
  timestampAsistente: {
    color: '#666',
  },
  indicadorCarga: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 107, 71, 0.1)',
    marginHorizontal: 16,
    borderRadius: 8,
  },
  textoCargando: {
    marginLeft: 8,
    color: '#FF6B47',
    fontSize: 13,
    fontStyle: 'italic',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    maxHeight: 80,
    paddingVertical: 8,
  },
  botonEnviar: {
    backgroundColor: '#FF6B47',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  botonDeshabilitado: {
    backgroundColor: '#ccc',
  },
  textoBotonEnviar: {
    fontSize: 16,
  },
  disclaimer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff3cd',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ffeaa7',
  },
  textoDisclaimer: {
    fontSize: 11,
    color: '#856404',
    textAlign: 'center',
    lineHeight: 14,
  },
});