import { askGemini } from '@/services/gemini'
import { useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

type Message = {
  id: string
  role: 'user' | 'bot'
  text: string
}

export default function ChatBot() {
  const [visible, setVisible] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'bot', text: '¡Hola! Soy el asistente de MetalConnect. ¿En qué puedo ayudarte?' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const flatListRef = useRef<FlatList<Message>>(null)

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const reply = await askGemini(text)
      const botMsg: Message = { id: Date.now().toString() + 'b', role: 'bot', text: reply }
      setMessages(prev => [...prev, botMsg])
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString() + 'e', role: 'bot', text: String(err) },
      ])
    } finally {
      setLoading(false)
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100)
    }
  }

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={() => setVisible(true)}>
        <Text style={styles.fabIcon}>🤖</Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.overlay}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Asistente MetalConnect</Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.messageList}
              renderItem={({ item }) => (
                <View style={[styles.bubble, item.role === 'user' ? styles.bubbleUser : styles.bubbleBot]}>
                  <Text style={[styles.bubbleText, item.role === 'user' ? styles.textUser : styles.textBot]}>
                    {item.text}
                  </Text>
                </View>
              )}
            />

            {loading && <ActivityIndicator style={{ marginVertical: 8 }} color="#1a73e8" />}

            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Escribe tu pregunta..."
                value={input}
                onChangeText={setInput}
                onSubmitEditing={sendMessage}
                returnKeyType="send"
                editable={!loading}
              />
              <TouchableOpacity style={styles.sendBtn} onPress={sendMessage} disabled={loading}>
                <Text style={styles.sendIcon}>➤</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 999,
  },
  fabIcon: { fontSize: 24 },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    height: '75%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a73e8',
    padding: 16,
  },
  headerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  closeBtn: { color: '#fff', fontSize: 18, paddingHorizontal: 4 },
  messageList: { padding: 12, gap: 8 },
  bubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 14,
    marginVertical: 4,
  },
  bubbleUser: { backgroundColor: '#1a73e8', alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  bubbleBot: { backgroundColor: '#f1f3f4', alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  textUser: { color: '#fff' },
  textBot: { color: '#202124' },
  inputRow: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f3f4',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
  },
  sendBtn: {
    backgroundColor: '#1a73e8',
    borderRadius: 24,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  sendIcon: { color: '#fff', fontSize: 16 },
})
