import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity,
    View
} from 'react-native';
import { supabase } from '../services/supabase';
import { resetPasswordStyles as styles } from '../styles/resetPasswordStyles';


export default function ResetPasswordScreen() {
    const router = useRouter();
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');
    const [claveVisible, setClaveVisible] = useState(false);
    const [confirmarVisible, setConfirmarVisible] = useState(false);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const [actualizado, setActualizado] = useState(false);

    const handleGuardar = async () => {
        if (!clave || !confirmarClave) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        if (clave.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        if (clave !== confirmarClave) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        setCargando(true);
        setError('');
        const { error } = await supabase.auth.updateUser({ password: clave });
        setCargando(false)
        if (error) {
            setError('Error al actualizar la contraseña. Intenta nuevamente.');
        } else {
            setActualizado(true);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style= { styles.logoContainer }>
                <View style= {styles.iconoContainer}>
                    <Ionicons name="lock-closed-outline" size={40} color="white" />
                </View>
                <Text style ={styles.titulo}>Nueva contraseña</Text>
                <Text style = {styles.subtitulo} >Ingresa tu nueva contraseña</Text>
            </View>

            {actualizado ? (
                <View style={styles.mensajeExito}>
                    <Ionicons name="checkmark-circle-outline" size={22} color="#4caf50" />
                    <Text style={styles.mensajeExitoTexto}>¡Contraseña actualizada con éxito!</Text>
                </View>
            ): (
                 <View style={styles.formulario}>
                    <Text style={styles.etiquetaCampo}>Nueva contraseña</Text>
                    <View style={styles.campoFila}>
                         <TextInput
                            style={styles.campoTexto}
                            placeholder="••••••••"
                            placeholderTextColor="#aaaaaa"
                            value={clave}
                            onChangeText={setClave}
                            secureTextEntry={!claveVisible}
                        />
                        <TouchableOpacity onPress={() => setClaveVisible(!claveVisible)}>
                            <Ionicons name={claveVisible ? 'eye-off-outline' : 'eye-outline'} size={20} color="#aaaaaa" />
                        </TouchableOpacity>
                    </View>

                     <Text style={styles.etiquetaCampo}>Confirmar contraseña</Text>
                     <View style={styles.campoFila}>
                        <TextInput
                            style={styles.campoTexto}
                            placeholder="••••••••"
                            placeholderTextColor="#aaaaaa"
                            value={confirmarClave}
                            onChangeText={setConfirmarClave}
                            secureTextEntry={!confirmarVisible}
                        />
                        <TouchableOpacity onPress={() => setConfirmarVisible(!confirmarVisible)}>
                            <Ionicons name={confirmarVisible ? 'eye-off-outline' : 'eye-outline'} size={20} color="#aaaaaa" />
                        </TouchableOpacity>
                     </View>

                     {error ? <Text style={styles.errorTexto}>{error}</Text> : null}
                 </View>
            )}

            <TouchableOpacity
                style={[styles.btnGuardar, cargando && styles.btnDeshabilitado]}
                onPress={actualizado ? () => router.replace('/login') : handleGuardar}
                disabled={cargando}
            >
                
            <Text style={styles.btnGuardarTexto}>
                {actualizado ? 'Ir al inicio de sesión' : cargando ? 'Guardando...' : 'Guardar contraseña'}
            </Text>

            </TouchableOpacity>

            {!actualizado && (
                <View style={styles.volverFila}>
                    <Text style={styles.volverTexto}>¿Recordaste tu contraseña?</Text>
                    <TouchableOpacity onPress={() => router.replace('/login')}>
                        <Text style={styles.volverEnlace}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>
            )}

            </KeyboardAvoidingView>
    )
}


