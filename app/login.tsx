import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemeColors } from '../constants/theme';
import { signIn } from '../services/auth';
import { loginStyles } from '../styles/loginStyles';

export default function LoginScreen() {
  const router = useRouter();
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [claveVisible, setClaveVisible] = useState(false);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleLogin = async () => {
    if (!correo || !clave) {
      setError('Por favor completa todos los campos')
      return
    }
    setCargando(true)
    setError('')
    const { data, error } = await signIn(correo, clave)
    if (error) {
      if (error.message === 'Invalid login credentials') {
        setError('Correo o contraseña incorrectos')
      } else {
        setError(error.message)
      }
    }
    setCargando(false)
  }

  return (
    <KeyboardAvoidingView
      style={loginStyles.contenedor}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={loginStyles.logoContenedor}>
        <View style={loginStyles.iconoContenedor}>
          <Ionicons name="construct" size={40} color="white" />
        </View>
        <Text style={loginStyles.titulo}>MetalConnect</Text>
        <Text style={loginStyles.subtitulo}>Bienvenido de vuelta</Text>
      </View>

      <View style={loginStyles.formulario}>
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

        {error ? (
          <Text style={{ color: 'red', textAlign: 'center', marginTop: 8 }}>{error}</Text>
        ) : null}

        <TouchableOpacity style={loginStyles.olvideClave} onPress={() => router.push('/forgot-password')}>
          <Text style={loginStyles.olvideClaveTex}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={loginStyles.btnLogin}
        onPress={handleLogin}
        disabled={cargando}
      >
        <Text style={loginStyles.btnLoginTexto}>
          {cargando ? 'Ingresando...' : 'Iniciar Sesión'}
        </Text>
      </TouchableOpacity>

      <View style={loginStyles.separador}>
        <View style={loginStyles.separadorLinea} />
        <Text style={loginStyles.separadorTexto}>o</Text>
        <View style={loginStyles.separadorLinea} />
      </View>

      <View style={loginStyles.registroFila}>
        <Text style={loginStyles.registroTexto}>¿No tienes cuenta?</Text>
        <TouchableOpacity onPress={() => router.push('/registro')}>
          <Text style={loginStyles.registroEnlace}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}