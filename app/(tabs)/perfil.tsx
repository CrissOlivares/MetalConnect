

import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

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
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [correo, setCorreo] = useState('');

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [editando, setEditando] = useState(false);

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [empresa, setEmpresa] = useState('');

  const cargarPerfil = useCallback(async () => {
    setCargando(true);

    try {
      const { data, error: authError } =
        await supabase.auth.getUser();

      if (authError || !data.user) {
        throw new Error('No hay una sesión activa');
      }

      setCorreo(data.user.email ?? '');

      const { data: datosPerfil, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      if (error) throw error;

      setPerfil(datosPerfil);
      setNombre(datosPerfil.name ?? '');
      setTelefono(datosPerfil.phone ?? '');
      setDireccion(datosPerfil.address ?? '');
      setDescripcion(datosPerfil.description ?? '');
      setEmpresa(datosPerfil.company ?? '');

    } catch (error: any) {
      Alert.alert(
        'Error',
        error.message ?? 'No se pudo cargar el perfil'
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargarPerfil();
    }, [cargarPerfil])
  );

  const guardarPerfil = async () => {
    if (!perfil) return;

    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre no puede estar vacío');
      return;
    }

    setGuardando(true);

    try {
      const { error } = await supabase
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

      await cargarPerfil();
      setEditando(false);

      Alert.alert(
        '¡Perfil actualizado!',
        'Tus cambios se guardaron correctamente.'
      );

    } catch (error: any) {
      Alert.alert(
        'Error',
        error.message ?? 'No se pudo actualizar el perfil'
      );
    } finally {
      setGuardando(false);
    }
  };

  const cancelarEdicion = () => {
    if (!perfil) return;

    setNombre(perfil.name ?? '');
    setTelefono(perfil.phone ?? '');
    setDireccion(perfil.address ?? '');
    setDescripcion(perfil.description ?? '');
    setEmpresa(perfil.company ?? '');
    setEditando(false);
  };

  const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert('Error', error.message);
    }
    // useAuth redirige automáticamente al login
  };

  const tipoCuenta = perfil?.is_taller
    ? 'Taller'
    : perfil?.is_independiente
      ? 'Trabajador independiente'
      : 'Cliente';

  if (cargando && !perfil) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#FF6B00" />
        <Text style={styles.textoSecundario}>
          Cargando perfil...
        </Text>
      </View>
    );
  }

  if (!perfil) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.textoBlanco}>
          No se encontró el perfil.
        </Text>
        <TouchableOpacity onPress={cargarPerfil}>
          <Text style={styles.textoNaranja}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contenido}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.titulo}>Mi Perfil</Text>

      {/* Tarjeta principal */}
      <View style={styles.tarjetaPerfil}>
        <View style={styles.avatar}>
          {perfil.avatar_url ? (
            <Image
              source={{ uri: perfil.avatar_url }}
              style={styles.imagenAvatar}
            />
          ) : (
            <Ionicons name="person" size={45} color="#FFFFFF" />
          )}
        </View>

        <Text style={styles.nombre}>
          {perfil.name}
        </Text>

        <Text style={styles.tipoCuenta}>
          {tipoCuenta}
        </Text>

        <Text style={styles.premium}>
          {perfil.is_premium
            ? 'Cuenta Premium'
            : 'Cuenta gratuita'}
        </Text>
      </View>

      {/* Información personal */}
      <View style={styles.tarjeta}>
        <Text style={styles.seccion}>
          Información personal
        </Text>

        <Campo
          icono="person-outline"
          etiqueta="Nombre completo"
          valor={nombre}
          cambiar={setNombre}
          editable={editando}
        />

        <Campo
          icono="mail-outline"
          etiqueta="Correo electrónico"
          valor={correo}
          editable={false}
        />

        <Campo
          icono="call-outline"
          etiqueta="Teléfono"
          valor={telefono}
          cambiar={setTelefono}
          editable={editando}
        />

        <Campo
          icono="location-outline"
          etiqueta="Ciudad / Dirección"
          valor={direccion}
          cambiar={setDireccion}
          editable={editando}
        />

        <Campo
          icono="document-text-outline"
          etiqueta="Descripción"
          valor={descripcion}
          cambiar={setDescripcion}
          editable={editando}
          multilinea
        />

        {(perfil.is_taller || perfil.is_independiente) && (
          <Campo
            icono="business-outline"
            etiqueta="Empresa / Taller"
            valor={empresa}
            cambiar={setEmpresa}
            editable={editando}
          />
        )}
      </View>

      {/* Botones */}
      {!editando ? (
        <TouchableOpacity
          style={styles.botonPrincipal}
          onPress={() => setEditando(true)}
        >
          <Ionicons name="create-outline" size={20} color="#FFFFFF" />
          <Text style={styles.textoBoton}>
            Editar perfil
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            style={styles.botonPrincipal}
            onPress={guardarPerfil}
            disabled={guardando}
          >
            <Ionicons name="save-outline" size={20} color="#FFFFFF" />
            <Text style={styles.textoBoton}>
              {guardando ? 'Guardando...' : 'Guardar cambios'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botonCancelar}
            onPress={cancelarEdicion}
            disabled={guardando}
          >
            <Text style={styles.textoCancelar}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.botonCerrar}
        onPress={cerrarSesion}
      >
        <Ionicons name="log-out-outline" size={20} color="#FF6B00" />
        <Text style={styles.textoCerrar}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Componente reutilizable para los campos
function Campo({
  icono,
  etiqueta,
  valor,
  cambiar,
  editable,
  multilinea = false,
}: {
  icono: keyof typeof Ionicons.glyphMap;
  etiqueta: string;
  valor: string;
  cambiar?: (texto: string) => void;
  editable: boolean;
  multilinea?: boolean;
}) {
  return (
    <View style={styles.campoContenedor}>
      <Ionicons name={icono} size={22} color="#FF6B00" />

      <View style={{ flex: 1 }}>
        <Text style={styles.etiqueta}>{etiqueta}</Text>

        {editable ? (
          <TextInput
            style={[
              styles.input,
              multilinea && { minHeight: 80 },
            ]}
            value={valor}
            onChangeText={cambiar}
            placeholder="No especificado"
            placeholderTextColor="#777777"
            multiline={multilinea}
          />
        ) : (
          <Text style={styles.valor}>
            {valor || 'No especificado'}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
  contenido: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },
  centrado: {
    flex: 1,
    backgroundColor: '#181818',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 25,
  },
  tarjetaPerfil: {
    backgroundColor: '#262626',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  imagenAvatar: {
    width: '100%',
    height: '100%',
  },
  nombre: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  tipoCuenta: {
    color: '#A1A1AA',
    marginTop: 5,
    fontSize: 14,
  },
  premium: {
    color: '#FF6B00',
    fontWeight: '600',
    marginTop: 8,
  },
  tarjeta: {
    backgroundColor: '#262626',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  seccion: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 22,
  },
  campoContenedor: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 22,
  },
  etiqueta: {
    color: '#A1A1AA',
    fontSize: 12,
    marginBottom: 5,
  },
  valor: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  input: {
    color: '#FFFFFF',
    backgroundColor: '#333333',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
  },
  botonPrincipal: {
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 12,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botonCancelar: {
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  textoCancelar: {
    color: '#A1A1AA',
    fontSize: 15,
  },
  botonCerrar: {
    borderWidth: 1,
    borderColor: '#FF6B00',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  textoCerrar: {
    color: '#FF6B00',
    fontWeight: '600',
    fontSize: 16,
  },
  textoBlanco: {
    color: '#FFFFFF',
  },
  textoSecundario: {
    color: '#A1A1AA',
  },
  textoNaranja: {
    color: '#FF6B00',
    marginTop: 12,
  },
});
