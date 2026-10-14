
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { perfilStyles as styles } from '../../styles/perfilStyles';

import { supabase } from '../../services/supabase';

type Perfil = {
  user_id: string;
  name: string;
  phone: string | null;
  address: string | null;
  description: string | null;
  company: string | null;
  avatar_url: string | null;
  is_premium: boolean;
  is_taller: boolean;
  is_independiente: boolean;
};

export default function PerfilScreen() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [correo, setCorreo] = useState('');

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [editando, setEditando] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [empresa, setEmpresa] = useState('');

  // Obtener los datos del usuario desde Supabase
  const cargarPerfil = useCallback(async () => {
    try {
      setCargando(true);
      setMensajeError('');

      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('No se encontró una sesión activa.');
      }

      setCorreo(authData.user.email ?? '');

      const { data, error } = await supabase
        .from('profiles')
        .select(
          'user_id, name, phone, address, description, company, avatar_url, is_premium, is_taller, is_independiente'
        )
        .eq('user_id', authData.user.id)
        .single();

      if (error) throw error;

      const datos = data as Perfil;

      setPerfil(datos);
      setNombre(datos.name ?? '');
      setTelefono(datos.phone ?? '');
      setDireccion(datos.address ?? '');
      setDescripcion(datos.description ?? '');
      setEmpresa(datos.company ?? '');
    } catch (error: any) {
      const mensaje =
        error.message ?? 'No se pudo cargar el perfil.';

      setMensajeError(mensaje);
      Alert.alert('Error', mensaje);
    } finally {
      setCargando(false);
    }
  }, []);

  // Actualizar el perfil 
  useFocusEffect(
    useCallback(() => {
      cargarPerfil();
    }, [cargarPerfil])
  );

  // Guardar los cambios del perfil
  const guardarCambios = async () => {
    if (!perfil || guardando) return;

    if (!nombre.trim()) {
      Alert.alert(
        'Atención',
        'El nombre no puede estar vacío.'
      );
      return;
    }

    try {
      setGuardando(true);

      const { data, error } = await supabase
        .from('profiles')
        .update({
          name: nombre.trim(),
          phone: telefono.trim() || null,
          address: direccion.trim() || null,
          description: descripcion.trim() || null,
          company: empresa.trim() || null,
        })
        .eq('user_id', perfil.user_id)
        .select('user_id')
        .single();

      if (error) throw error;

      if (!data) {
        throw new Error(
          'No se pudo confirmar la actualización del perfil.'
        );
      }

      setEditando(false);
      await cargarPerfil();

      Alert.alert(
        'Perfil actualizado',
        'Tus cambios se guardaron correctamente.'
      );
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.message ?? 'No se pudieron guardar los cambios.'
      );
    } finally {
      setGuardando(false);
    }
  };

  // Cancelar edición y restaurar los valores anteriores
  const cancelarEdicion = () => {
    if (!perfil) return;

    setNombre(perfil.name ?? '');
    setTelefono(perfil.phone ?? '');
    setDireccion(perfil.address ?? '');
    setDescripcion(perfil.description ?? '');
    setEmpresa(perfil.company ?? '');

    setEditando(false);
  };

  // Cerrar sesión
  const cerrarSesion = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    setPerfil(null);
    router.replace('/login');

  } catch (error: any) {
    Alert.alert(
      'Error al cerrar sesión',
      error.message ?? 'Inténtalo nuevamente.'
    );
  }
};

  // tipo de cuenta
  const tipoCuenta = perfil?.is_taller
    ? 'Taller'
    : perfil?.is_independiente
      ? 'Trabajador independiente'
      : 'Cliente';

  // Pantalla de carga
  if (cargando && !perfil) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator
          size="large"
          color="#FF6B00"
        />
        <Text style={styles.textoSecundario}>
          Cargando perfil...
        </Text>
      </View>
    );
  }

  // Pantalla de error
  if (!perfil) {
    return (
      <View style={styles.centrado}>
        <Ionicons
          name="alert-circle-outline"
          size={50}
          color="#FF6B00"
        />

        <Text style={styles.texto}>
          No se pudo cargar tu perfil.
        </Text>

        {!!mensajeError && (
          <Text style={styles.textoSecundario}>
            {mensajeError}
          </Text>
        )}

        <TouchableOpacity
          style={styles.botonPrincipal}
          onPress={cargarPerfil}
        >
          <Text style={styles.textoBoton}>
            Reintentar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.contenedor}
      contentContainerStyle={styles.contenido}
      keyboardShouldPersistTaps="handled"
    >
      {/* titulo */}
      <Text style={styles.titulo}>
        Mi perfil
      </Text>

      {/* tarjeta de perfil */}
      <View style={styles.tarjeta}>
        <View style={styles.avatarContenedor}>
          {perfil.avatar_url ? (
            <Image
              source={{ uri: perfil.avatar_url }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons
                name="person"
                size={42}
                color="#FF6B00"
              />
            </View>
          )}
        </View>

        <Text style={styles.nombrePerfil}>
          {perfil.name}
        </Text>

        <View style={styles.etiquetaRol}>
          <Ionicons
            name={
              perfil.is_taller
                ? 'business-outline'
                : perfil.is_independiente
                  ? 'construct-outline'
                  : 'person-outline'
            }
            size={16}
            color="#FF6B00"
          />

          <Text style={styles.textoRol}>
            {tipoCuenta}
          </Text>
        </View>

        {perfil.is_premium && (
          <View style={styles.etiquetaPremium}>
            <Ionicons
              name="star"
              size={15}
              color="#FFD700"
            />

            <Text style={styles.textoPremium}>
              Cuenta Premium
            </Text>
          </View>
        )}
      </View>

      {/* informacion personal */}
      <View style={styles.tarjeta}>
        <View style={styles.encabezadoSeccion}>
          <Text style={styles.subtitulo}>
            Información personal
          </Text>

          {!editando && (
            <TouchableOpacity
              onPress={() => setEditando(true)}
              style={styles.botonEditar}
            >
              <Ionicons
                name="create-outline"
                size={18}
                color="#FF6B00"
              />

              <Text style={styles.textoEditar}>
                Editar
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* nombre */}
        <Text style={styles.etiqueta}>
          Nombre
        </Text>

        {editando ? (
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Tu nombre"
            placeholderTextColor="#777777"
          />
        ) : (
          <Text style={styles.valor}>
            {perfil.name}
          </Text>
        )}

        {/* correo */}
        <Text style={styles.etiqueta}>
          Correo electrónico
        </Text>

        <Text style={styles.valor}>
          {correo || 'No registrado'}
        </Text>

        {/* teléfono */}
        <Text style={styles.etiqueta}>
          Teléfono
        </Text>

        {editando ? (
          <TextInput
            style={styles.input}
            value={telefono}
            onChangeText={setTelefono}
            placeholder="Tu teléfono"
            placeholderTextColor="#777777"
            keyboardType="phone-pad"
          />
        ) : (
          <Text style={styles.valor}>
            {perfil.phone || 'No registrado'}
          </Text>
        )}

        {/* dirección */}
        <Text style={styles.etiqueta}>
          Dirección o ciudad
        </Text>

        {editando ? (
          <TextInput
            style={styles.input}
            value={direccion}
            onChangeText={setDireccion}
            placeholder="Tu dirección o ciudad"
            placeholderTextColor="#777777"
          />
        ) : (
          <Text style={styles.valor}>
            {perfil.address || 'No registrada'}
          </Text>
        )}

        {/* empresa */}
        <Text style={styles.etiqueta}>
          Empresa o taller
        </Text>

        {editando ? (
          <TextInput
            style={styles.input}
            value={empresa}
            onChangeText={setEmpresa}
            placeholder="Nombre de empresa o taller"
            placeholderTextColor="#777777"
          />
        ) : (
          <Text style={styles.valor}>
            {perfil.company || 'No registrada'}
          </Text>
        )}

        {/* descripcion*/}
        <Text style={styles.etiqueta}>
          Descripción
        </Text>

        {editando ? (
          <TextInput
            style={[
              styles.input,
              styles.inputDescripcion,
            ]}
            value={descripcion}
            onChangeText={setDescripcion}
            placeholder="Cuéntanos sobre ti o tus servicios"
            placeholderTextColor="#777777"
            multiline
            textAlignVertical="top"
          />
        ) : (
          <Text style={styles.valor}>
            {perfil.description || 'Sin descripción'}
          </Text>
        )}

        {/* editar cuenta */}
        {editando && (
          <View style={styles.contenedorBotones}>
            <TouchableOpacity
              style={styles.botonCancelar}
              onPress={cancelarEdicion}
              disabled={guardando}
            >
              <Text style={styles.textoCancelar}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.botonGuardar,
                guardando && styles.botonDeshabilitado,
              ]}
              onPress={guardarCambios}
              disabled={guardando}
            >
              {guardando ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.textoBoton}>
                  Guardar cambios
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* información de cuenta */}
      <View style={styles.tarjeta}>
        <Text style={styles.subtitulo}>
          Información de la cuenta
        </Text>

        <View style={styles.filaInformacion}>
          <Text style={styles.textoSecundario}>
            Tipo de cuenta
          </Text>

          <Text style={styles.valorInformacion}>
            {tipoCuenta}
          </Text>
        </View>

        <View style={styles.separador} />

        <View style={styles.filaInformacion}>
          <Text style={styles.textoSecundario}>
            Membresía
          </Text>

          <Text style={styles.valorInformacion}>
            {perfil.is_premium ? 'Premium' : 'Gratuita'}
          </Text>
        </View>

        <Text style={styles.avisoRol}>
          El tipo de cuenta no puede modificarse
          después del registro.
        </Text>
      </View>

      {/* CERRAR SESIÓN */}
      <TouchableOpacity
        style={styles.botonCerrarSesion}
        onPress={cerrarSesion}
      >
        <Ionicons
          name="log-out-outline"
          size={20}
          color="#FF6B00"
        />

        <Text style={styles.textoCerrarSesion}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}



