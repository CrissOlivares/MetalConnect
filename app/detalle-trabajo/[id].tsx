import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { obtenerDetalleTrabajo, Trabajo } from '../../services/trabajos';

export default function DetalleTrabajoScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [trabajo, setTrabajo] = useState<Trabajo | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarTrabajo = async () => {
      if (!id || !Number.isSafeInteger(Number(id))) {
        setError('El ID del trabajo no es válido.');
        setCargando(false);
        return;
      }

      const { data, error } = await obtenerDetalleTrabajo(Number(id));

      if (error) {
        setError(error.message);
      } else {
        setTrabajo(data);
      }

      setCargando(false);
    };

    cargarTrabajo();
  }, [id]);

  if (cargando) {
    return (
      <View style={{ flex: 1, backgroundColor: '#181818', justifyContent: 'center' }}>
        <ActivityIndicator color="#FF6B00" size="large" />
      </View>
    );
  }

  if (error || !trabajo) {
    return (
      <View style={{ flex: 1, backgroundColor: '#181818', padding: 24 }}>
        <Text style={{ color: '#FFFFFF' }}>
          {error || 'No se encontró el trabajo.'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#181818' }}
      contentContainerStyle={{ padding: 20, paddingTop: 50, paddingBottom: 40 }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ color: '#FF6B00', marginBottom: 20 }}>
          ← Volver
        </Text>
      </TouchableOpacity>

      <Text style={{ color: '#FFFFFF', fontSize: 26, fontWeight: 'bold' }}>
        {trabajo.titulo}
      </Text>

      <Text style={{ color: '#FF6B00', marginTop: 10 }}>
        {trabajo.estado}
      </Text>

      <Text style={{ color: '#A1A1AA', marginTop: 20 }}>
        📍 {trabajo.ubicacion}
      </Text>

      <Text style={{ color: '#A1A1AA', marginTop: 10 }}>
        🔧 {trabajo.categoria}
      </Text>

      <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginTop: 30 }}>
        Descripción
      </Text>

      <Text style={{ color: '#D4D4D8', marginTop: 10 }}>
        {trabajo.descripcion}
      </Text>

      <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginTop: 30 }}>
        Especificaciones
      </Text>

      {Object.entries(trabajo.especificaciones ?? {}).map(([campo, valor]) => (
        <View
          key={campo}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
          }}
        >
          <Text style={{ color: '#A1A1AA' }}>{campo}</Text>
          <Text style={{ color: '#FFFFFF' }}>{String(valor)}</Text>
        </View>
      ))}

      <Text style={{ color: '#A1A1AA', marginTop: 30 }}>
        Publicado el {new Date(trabajo.created_at).toLocaleDateString('es-CL')}
      </Text>
    </ScrollView>
  );
}