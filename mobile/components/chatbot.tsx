import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

export default function ChatBotFloating() {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');

  const toggleChat = () => setVisible(!visible);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessages: any = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Simulación de respuesta
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: 'user', text: input },
        { from: 'bot', text: 'Gracias por tu mensaje. Te responderé pronto.' },
      ]);
    }, 500);
  };

  const renderItem = ({ item }: { item: { from: 'user' | 'bot'; text: string } }) => (
    <View
      style={[
        styles.message,
        item.from === 'user' ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <>
      <Pressable style={styles.floatingButton} onPress={toggleChat}>
        <Ionicons name="chatbubble-ellipses" size={28} color="white" />
      </Pressable>

      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.chatContainer}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatTitle}>Asistente Virtual</Text>
              <Pressable onPress={toggleChat}>
                <Ionicons name="close" size={24} color="#FF8C00" />
              </Pressable>
            </View>

            <FlatList
              data={messages}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={{ paddingBottom: 10 }}
            />

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Escribe tu mensaje..."
                value={input}
                onChangeText={setInput}
              />
              <Pressable style={styles.sendButton} onPress={sendMessage}>
                <Ionicons name="send" size={20} color="white" />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#FF8C00',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    zIndex: 99,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
  },
  
  chatContainer: {
    height: '60%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  message: {
    maxWidth: '80%',
    marginVertical: 4,
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFDAB9',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EDEDED',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendButton: {
    backgroundColor: '#FF8C00',
    marginLeft: 8,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
