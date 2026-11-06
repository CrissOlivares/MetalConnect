
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { obtenerRolUsuario } from '../../services/profiles';
import { obtenerMisTrabajos, obtenerTrabajosDisponibles } from '../../services/trabajos';
import { trabajosStyles } from '../../styles/trabajosStyles';

type TrabajoDisponible = {
  id: number;
  titulo: string;
  categoria: string | null;
  ubicacion: string | null;
  descripcion: string | null;
  estado: string;
};

export default function TrabajosScreen() {
  const router = useRouter();
  const [trabajos, setTrabajos] = useState<TrabajoDisponible[]>([]);
  const [cargando, setCargando] = useState(true);
  const { user, loading: cargandoSesion } = useAuth();
  const [rol, setRol] = useState<
    'cliente' | 'taller' | 'independiente' | null>(null);
  const [error, setError] = useState('');

  useFocusEffect(
    useCallback(() => {
      let activo = true;

      const cargarTrabajos = async () => {
        setCargando(true);
        setError('');
        setTrabajos([]);
        setRol(null);

        if (cargandoSesion) return;

        if (!user) {
          if (activo) {
            setError('Debes iniciar sesión para ver los trabajos.');
            setCargando(false);
          }
          return;
        }
        const { rol: rolUsuario, error: errorRol } =
          await obtenerRolUsuario(user.id);

        if (!activo) return;

        if (errorRol || !rolUsuario) {
          setError('No se pudo obtener el rol del usuario.');
          setCargando(false);
          return;
        }

        setRol(rolUsuario)

        if (rolUsuario === 'independiente') {
          setTrabajos([]);
          setCargando(false);
          return;
        }

        const { data, error } =
          rolUsuario === 'cliente'
            ? await obtenerMisTrabajos(user.id)
            : await obtenerTrabajosDisponibles();

        if (!activo) return;

        if (error) {
          setError(error.message);
        } else {
          setTrabajos(data ?? []);
        }

        setCargando(false);
      };

      cargarTrabajos();

      return () => {
        activo = false;
      };
    }, [user, cargandoSesion])
  );

  return (
    <ScrollView
      style={trabajosStyles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={trabajosStyles.titulo}>
        {rol === 'cliente' ? 'Mis trabajos' : 'Trabajos disponibles'}
      </Text>

      <Text style={trabajosStyles.descripcion}>
        {rol === 'cliente'
          ? 'Consulta los trabajos que has publicado'
          : rol === 'taller'
            ? 'Explora los trabajos publicados por clientes.'
            : 'Esta sección estará disponible proximamente'
        }
      </Text>

      {cargando && (
        <ActivityIndicator
          size="large"
          color="#FF6B00"
          style={{ marginTop: 30 }}
        />
      )}

      {!!error && (
        <Text style={trabajosStyles.descripcion}>
          Error al cargar trabajos: {error}
        </Text>
      )}

      {!cargando && !error && trabajos.length === 0 && (
        <Text style={trabajosStyles.descripcion}>
          { rol === 'cliente'
              ? 'Aún no has publicado trabajos.'
              : 'No hay trabajos disponibles por ahora.'
          }
        </Text>

      )}

      {!cargando && !error && trabajos.map((trabajo) => (
        <TouchableOpacity
          key={trabajo.id}
          style={trabajosStyles.tarjeta}
          onPress={() =>
            router.push(`/detalle-trabajo/${trabajo.id}` as any)
          }
        >
          <Text style={trabajosStyles.tarjetaTitulo}>
            {trabajo.titulo}
          </Text>

          <Text style={trabajosStyles.tarjetaInfo}>
            📍 {trabajo.ubicacion}
          </Text>

          <Text style={trabajosStyles.tarjetaInfo}>
            🔧 {trabajo.categoria}
          </Text>

          <Text style={trabajosStyles.tarjetaDescripcion}>
            {trabajo.descripcion}
          </Text>

          <Text style={trabajosStyles.verDetalle}>
            Ver detalles →
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}



