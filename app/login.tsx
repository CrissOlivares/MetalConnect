import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemeColors } from '../constants/theme';
import { signIn } from '../services/auth';
import { loginStyles } from '../styles/loginStyles';

export default function LoginScreen() {
  const router = useRouter();
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [claveVisible, setClaveVisible] = useState(false)
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleLogin = async () => {
    if (!correo || !clave) {
      setError('Por favor completa todos los campos')
      return
    }
    setCargando(true)
    setError('')
    const { error } = await signIn(correo, clave)
    if (error) {
      if (error.message === 'Invalid login credentials') {
        setError('Correo o contraseña incorrectos')
      } else {
        setError(error.message)
      }
    }
    setCargando(false)
  }

  const handleOlvideContrasena = () => {
    router.push('/forgot-password')
  }

  return (
    <KeyboardAvoidingView
      style={loginStyles.contenedor}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Logo y título */}
      <View style={loginStyles.logoContenedor}>
        <View style={loginStyles.iconoContenedor}>
          <Ionicons name="construct" size={40} color="white" />
        </View>
        <Text style={loginStyles.titulo}>MetalConnect</Text>
        <Text style={loginStyles.subtitulo}>Bienvenido de vuelta</Text>
      </View>

      {/* Formulario */}
      <View style={loginStyles.formulario}>

        {/* Correo */}
        <View>
          <Text style={loginStyles.etiquetaCampo}>Correo electrónico</Text>
          <TextInput
            style={loginStyles.campo}
            placeholder="tucorreo@email.com"
            placeholderTextColor={ThemeColors.textoGris}
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Contraseña */}
        <View>
          <Text style={loginStyles.etiquetaCampo}>Contraseña</Text>
          <View style={loginStyles.campoFila}>
            <TextInput
              style={loginStyles.campoFilaTexto}
              placeholder="••••••••"
              placeholderTextColor={ThemeColors.textoGris}
              value={clave}
              onChangeText={setClave}
              secureTextEntry={!claveVisible}
            />
            <TouchableOpacity onPress={() => setClaveVisible(!claveVisible)}>
              <Ionicons
                name={claveVisible ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={ThemeColors.textoGris}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Error */}
        {error ? (
          <Text style={{ color: 'red', textAlign: 'center', marginTop: 8 }}>{error}</Text>
        ) : null}

        {/* Olvidé contraseña */}
        <TouchableOpacity style={loginStyles.olvideClave} onPress={handleOlvideContrasena}>
          <Text style={loginStyles.olvideClaveTex}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

      </View>

      {/* Botón login */}
      <TouchableOpacity
        style={loginStyles.btnLogin}
        onPress={handleLogin}
        disabled={cargando}
      >
        <Text style={loginStyles.btnLoginTexto}>
          {cargando ? 'Ingresando...' : 'Iniciar Sesión'}
        </Text>
      </TouchableOpacity>

      {/* Separador */}
      <View style={loginStyles.separador}>
        <View style={loginStyles.separadorLinea} />
        <Text style={loginStyles.separadorTexto}>o</Text>
        <View style={loginStyles.separadorLinea} />
      </View>

      {/* Registro */}
      <View style={loginStyles.registroFila}>
        <Text style={loginStyles.registroTexto}>¿No tienes cuenta?</Text>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={loginStyles.registroEnlace}>Regístrate</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}