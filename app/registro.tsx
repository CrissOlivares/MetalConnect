import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemeColors } from '../constants/theme';
import { signUp } from '../services/auth';
import { registroStyles } from '../styles/registroStyles';

export default function RegistroScreen() {
    const router = useRouter();
    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [clave, setClave] = useState('')
    const [telefono, setTelefono] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [confirmarClave, setConfirmarClave] = useState('')
    const [claveVisible, setClaveVisible] = useState(false)
    const [confirmarClaveVisible, setConfirmarClaveVisible] = useState(false)
    const [error, setError] = useState('')
    const [cargando, setCargando] = useState(false)

    const handleRegistro = async () => {
        if (!nombre || !correo || !telefono || !ciudad || !clave || !confirmarClave) {
            setError('Por favor completa todos los campos')
            return
        }
        if (clave !== confirmarClave) {
            setError('Las contraseñas no coinciden')
            return
        }
        if (clave.length < 6 ) {
            setError('La contraseña debe tener al menos 6 caracteres')
            return
        }
        setCargando(true)
        setError('')
        const {error: authError } = await signUp(correo, clave)
        if (authError) {
            setError(authError.message)
        } else {
            router.replace('/login')
        }
        setCargando(false)
    }

    return (
        <KeyboardAvoidingView
            style={registroStyles.contenedor}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* Logo y título */}
            <View style={registroStyles.logoContainer}>
                <View style={registroStyles.iconoContainer}>
                    <Ionicons name="construct" size={40} color="white" />
                </View>
                <Text style={registroStyles.titulo}>MetalConnect</Text>
                <Text style={registroStyles.subtitulo}>Crea tu cuenta</Text>
            </View>

            {/* Formulario */}
            <View style={registroStyles.formulario}>
                {/* Nombre */}
                <View>
                    <Text style={registroStyles.etiquetaCampo}>Nombre Completo</Text>
                    <TextInput
                        style={registroStyles.campo}
                        placeholder="Tu nombre completo"
                        placeholderTextColor={ThemeColors.textoGris}
                        value={nombre}
                        onChangeText={setNombre}
                        autoCapitalize="words"
                    />
                </View>

            {/* Correo */}
            <View>
                <Text style={registroStyles.etiquetaCampo}>Correo electrónico</Text>
                <TextInput
                        style={registroStyles.campo}
                        placeholder="tucorreo@email.com"
                        placeholderTextColor={ThemeColors.textoGris}
                        value={correo}
                        onChangeText={setCorreo}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
            </View>

            {/* Teléfono */}
            <View>
                <Text style={registroStyles.etiquetaCampo}>Teléfono</Text>
                <TextInput
                        style={registroStyles.campo}
                        placeholder="+56 9 1234 5678"
                        placeholderTextColor={ThemeColors.textoGris}
                        value={telefono}
                        onChangeText={setTelefono}
                        keyboardType="phone-pad"
                />
            </View>

            {/* Ciudad */}
            <View>
                <Text style={registroStyles.etiquetaCampo}>Ciudad</Text>
                <TextInput
                        style={registroStyles.campo}
                        placeholder="Santiago"
                        placeholderTextColor={ThemeColors.textoGris}
                        value={ciudad}
                        onChangeText={setCiudad}
                        autoCapitalize="words"
                />
            </View>

            {/* Contraseña */}
            <View>
                <Text style={registroStyles.etiquetaCampo}>Contraseña</Text>
                <View style={registroStyles.campoFila}>
                <TextInput
                        style={registroStyles.campoFilaTexto}
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


            {/* Confirmar contraseña */}
            <View>
                <Text style={registroStyles.etiquetaCampo}>Confirmar contraseña</Text>
                <View style={registroStyles.campoFila}>
                <TextInput
                        style={registroStyles.campoFilaTexto}
                        placeholder="••••••••"
                        placeholderTextColor={ThemeColors.textoGris}
                        value={confirmarClave}
                        onChangeText={setConfirmarClave}
                        secureTextEntry={!confirmarClaveVisible}
                    />
                <TouchableOpacity onPress={() => setConfirmarClaveVisible(!confirmarClaveVisible)}>
                    <Ionicons
                        name={confirmarClaveVisible ? 'eye-off-outline' : 'eye-outline'}
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
            </View>

            {/* Botón registro */}
            <TouchableOpacity
                style={registroStyles.btnRegistro}
                onPress={handleRegistro}
                disabled={cargando}
            >
                <Text style={registroStyles.btnRegistroTexto}>
                {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
                </Text>
            </TouchableOpacity>

            {/* Separador */}
            <View style={registroStyles.separador}>
                <View style={registroStyles.separadorLinea} />
                <Text style={registroStyles.separadorTexto}>o</Text>
                <View style={registroStyles.separadorLinea} />
            </View>

            {/* Botón Google */}
            <TouchableOpacity style={registroStyles.btnGoogle} onPress={() => {}}>
                <Ionicons name="logo-google" size={20} color={ThemeColors.textoBlanco} />
                <Text style={registroStyles.btnGoogleTexto}>Continuar con Google</Text>
            </TouchableOpacity>

            {/* Ya tienes cuenta */}
            <View style={registroStyles.loginFila}>
                <Text style={registroStyles.loginTexto}>¿Ya tienes cuenta?</Text>
                <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text style={registroStyles.loginEnlace}>Inicia sesión</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
  );
}