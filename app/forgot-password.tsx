import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemeColors } from '../constants/theme';
import { resetPassword } from '../services/auth';
import { forgotPasswordStyles as styles } from '../styles/forgotPasswordStyles';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = async () => {
    if (!correo) {
      setError('Ingresa tu correo electrónico')
      return
    }
    setCargando(true)
    setError('')
    const { error } = await resetPassword(correo)
    setCargando(false)
    if (error) {
      setError('No pudimos enviar el correo. Verifica que sea correcto.')
    } else {
      setEnviado(true)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.logoContenedor}>
        <View style={styles.iconoContenedor}>
          <Ionicons name="lock-open-outline" size={40} color="white" />
        </View>
        <Text style={styles.titulo}>¿Olvidaste tu contraseña?</Text>
        <Text style={styles.subtitulo}>
          Ingresa tu correo y te enviaremos un enlace para restablecerla.
        </Text>
      </View>

      {enviado ? (
        <View style={styles.mensajeExito}>
          <Ionicons name="checkmark-circle-outline" size={22} color={ThemeColors.verde} />
          <Text style={styles.mensajeExitoTexto}>
            ¡Listo! Revisa tu correo{'\n'}{correo}
          </Text>
        </View>
      ) : (
        <View style={styles.formulario}>
          <Text style={styles.etiquetaCampo}>Correo electrónico</Text>
          <TextInput
            style={styles.campo}
            placeholder="tucorreo@email.com"
            placeholderTextColor={ThemeColors.textoGris}
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {error ? <Text style={styles.errorTexto}>{error}</Text> : null}
        </View>
      )}

      <TouchableOpacity
        style={[styles.btnEnviar, cargando && styles.btnDeshabilitado]}
        onPress={enviado ? () => router.replace('/login') : handleEnviar}
        disabled={cargando}
      >
        <Text style={styles.btnEnviarTexto}>
          {enviado ? 'Volver al inicio de sesión' : cargando ? 'Enviando...' : 'Enviar enlace'}
        </Text>
      </TouchableOpacity>

      <View style={styles.volverFila}>
        <Text style={styles.volverTexto}>¿Recordaste tu contraseña?</Text>
        <TouchableOpacity onPress={() => router.replace('/login')}>
          <Text style={styles.volverEnlace}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}
