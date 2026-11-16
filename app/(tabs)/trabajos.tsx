
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { obtenerRolUsuario } from '../../services/profiles';
import {
  obtenerMisTrabajos,
  obtenerTrabajosAsignados,
  obtenerTrabajosDisponibles,
} from '../../services/trabajos';
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
  const { user, loading: cargandoSesion } = useAuth();

  const [trabajos, setTrabajos] = useState<TrabajoDisponible[]>([]);
  const [trabajosAsignados, setTrabajosAsignados] = useState<TrabajoDisponible[]>([]);
  const [cargando, setCargando] = useState(true);
  const [rol, setRol] = useState<'cliente' | 'taller' | 'independiente' | null>(null);
  const [error, setError] = useState('');
  const [tabActiva, setTabActiva] = useState<'disponibles' | 'asignados'>('disponibles');

  useFocusEffect(
    useCallback(() => {
      let activo = true;

      const cargarTrabajos = async () => {
        setCargando(true);
        setError('');
        setTrabajos([]);
        setTrabajosAsignados([]);
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

        setRol(rolUsuario);

        if (rolUsuario === 'independiente') {
          setCargando(false);
          return;
        }

        if (rolUsuario === 'cliente') {
          const { data, error } = await obtenerMisTrabajos(user.id);

          if (!activo) return;

          if (error) setError(error.message);
          else setTrabajos(data ?? []);
        }

        if (rolUsuario === 'taller') {
          const [disponibles, asignados] = await Promise.all([
            obtenerTrabajosDisponibles(),
            obtenerTrabajosAsignados(user.id),
          ]);

          console.log('DISPONIBLES:', disponibles);
          console.log('ASIGNADOS:', asignados);

          if (!activo) return;

          if (disponibles.error) {
            setError(disponibles.error.message);
          } else if (asignados.error) {
            setError(asignados.error.message);
          } else {
            setTrabajos(disponibles.data ?? []);
            setTrabajosAsignados(asignados.data ?? []);
          }
        }

        setCargando(false);
      };

      cargarTrabajos();

      return () => {
        activo = false;
      };
    }, [user, cargandoSesion])
  );

  const renderizarTrabajo = (trabajo: TrabajoDisponible) => (
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

      {trabajo.estado === 'Asignado' && (
        <Text style={trabajosStyles.estadoAsignado}>
          ✓ Trabajo asignado
        </Text>
      )}

      <Text style={trabajosStyles.verDetalle}>
        Ver detalles →
      </Text>
    </TouchableOpacity>
  );

  
return (
  <ScrollView
    style={trabajosStyles.container}
    contentContainerStyle={{ paddingBottom: 40 }}
  >
    <Text style={trabajosStyles.titulo}>
      {rol === 'cliente' ? 'Mis trabajos' : 'Trabajos'}
    </Text>

    <Text style={trabajosStyles.descripcion}>
      {rol === 'cliente'
        ? 'Consulta los trabajos que has publicado.'
        : rol === 'taller'
          ? 'Explora trabajos disponibles y revisa tus asignaciones.'
          : 'Esta sección estará disponible próximamente.'}
    </Text>

    {rol === 'taller' && (
      <View style={trabajosStyles.contenedorTabs}>
        <TouchableOpacity
          style={[
            trabajosStyles.tab,
            tabActiva === 'disponibles' && trabajosStyles.tabActiva,
          ]}
          onPress={() => setTabActiva('disponibles')}
        >
          <Text
            style={[
              trabajosStyles.tabTexto,
              tabActiva === 'disponibles' && trabajosStyles.tabTextoActivo,
            ]}
          >
            Disponibles
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            trabajosStyles.tab,
            tabActiva === 'asignados' && trabajosStyles.tabActiva,
          ]}
          onPress={() => setTabActiva('asignados')}
        >
          <Text
            style={[
              trabajosStyles.tabTexto,
              tabActiva === 'asignados' && trabajosStyles.tabTextoActivo,
            ]}
          >
            Asignados ({trabajosAsignados.length})
          </Text>
        </TouchableOpacity>
      </View>
    )}

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

    {!cargando && !error && rol === 'cliente' && (
      <>
        {trabajos.length === 0 ? (
          <Text style={trabajosStyles.descripcion}>
            Aún no has publicado trabajos.
          </Text>
        ) : (
          trabajos.map(renderizarTrabajo)
        )}
      </>
    )}

    {!cargando && !error && rol === 'taller' && (
      <>
        {tabActiva === 'disponibles' ? (
          trabajos.length === 0 ? (
            <Text style={trabajosStyles.descripcion}>
              No hay trabajos disponibles por ahora.
            </Text>
          ) : (
            trabajos.map(renderizarTrabajo)
          )
        ) : (
          trabajosAsignados.length === 0 ? (
            <Text style={trabajosStyles.descripcion}>
              Todavía no tienes trabajos asignados.
            </Text>
          ) : (
            trabajosAsignados.map(renderizarTrabajo)
          )
        )}
      </>
    )}
  </ScrollView>
);

}
