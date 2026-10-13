import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { clienteStyles } from '../styles/clienteStyles';
import { ThemeColors } from '../constants/theme';
import { useAuth } from '../hooks/useAuth';
import { obtenerMisTrabajos, Trabajo } from '../services/trabajos';

export default function ClienteScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [tabActiva, setTabActiva] = useState<'trabajos' | 'ofertas'>('trabajos');
  const [trabajos, setTrabajos] = useState<Trabajo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Recarga la lista cada vez que se vuelve a esta pantalla (ej: después de publicar)
  useFocusEffect(
    useCallback(() => {
      if (!user) return;
      obtenerMisTrabajos(user.id).then(({ data, error }) => {
        if (error) setError(error.message);
        else setTrabajos(data);
        setCargando(false);
      });
    }, [user])
  );

  const totalOfertas = trabajos.reduce((acc, t) => acc + t.ofertas, 0);
  const conRespuesta = trabajos.filter((t) => t.ofertas > 0).length;

  return (
    <ScrollView style={clienteStyles.contenedor} showsVerticalScrollIndicator={false}>

      {/* Encabezado */}
      <Text style={clienteStyles.titulo}>Área Cliente</Text>
      <Text style={clienteStyles.subtitulo}>
        <Text style={clienteStyles.subtituloDestacado}>Publica</Text> trabajos y recibe presupuestos de talleres verificados
      </Text>

      {/* Estadísticas */}
      <View style={clienteStyles.filaEstadisticas}>
        <View style={clienteStyles.tarjetaEstadistica}>
          <Text style={[clienteStyles.estadisticaNumero, { color: ThemeColors.naranja }]}>{trabajos.length}</Text>
          <Text style={clienteStyles.estadisticaEtiqueta}>Trabajos Publicados</Text>
        </View>
        <View style={clienteStyles.tarjetaEstadistica}>
          <Text style={[clienteStyles.estadisticaNumero, { color: ThemeColors.azul }]}>{totalOfertas}</Text>
          <Text style={clienteStyles.estadisticaEtiqueta}>Ofertas Recibidas</Text>
        </View>
        <View style={clienteStyles.tarjetaEstadistica}>
          <Text style={[clienteStyles.estadisticaNumero, { color: ThemeColors.textoBlanco }]}>{conRespuesta}</Text>
          <Text style={clienteStyles.estadisticaEtiqueta}>Con Respuesta</Text>
        </View>
      </View>

      {/* Botón publicar */}
      <TouchableOpacity style={clienteStyles.btnPublicar} onPress={() => router.push('/publicar-trabajo')}>
        <Ionicons name="add" size={20} color="white" />
        <Text style={clienteStyles.btnPublicarTexto}>Publicar Nuevo Trabajo</Text>
      </TouchableOpacity>

      {/* Tabs */}
      <View style={clienteStyles.contenedorTabs}>
        <TouchableOpacity
          style={[clienteStyles.tab, tabActiva === 'trabajos' && clienteStyles.tabActiva]}
          onPress={() => setTabActiva('trabajos')}
        >
          <Ionicons
            name="document-text-outline"
            size={15}
            color={tabActiva === 'trabajos' ? 'white' : ThemeColors.textoGris}
          />
          <Text style={[clienteStyles.tabTexto, tabActiva === 'trabajos' && clienteStyles.tabTextoActiva]}>
            Mis Trabajos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[clienteStyles.tab, tabActiva === 'ofertas' && clienteStyles.tabActiva]}
          onPress={() => setTabActiva('ofertas')}
        >
          <Ionicons
            name="chatbubble-outline"
            size={15}
            color={tabActiva === 'ofertas' ? 'white' : ThemeColors.textoGris}
          />
          <Text style={[clienteStyles.tabTexto, tabActiva === 'ofertas' && clienteStyles.tabTextoActiva]}>
            Ofertas ({totalOfertas})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de trabajos */}
      {cargando && <ActivityIndicator color={ThemeColors.naranja} />}
      {error ? <Text style={clienteStyles.textoMensaje}>Error al cargar: {error}</Text> : null}
      {!cargando && !error && trabajos.length === 0 && (
        <Text style={clienteStyles.textoMensaje}>Aún no has publicado trabajos</Text>
      )}
      {trabajos.map((trabajo) => (
        <TouchableOpacity key={trabajo.id} style={clienteStyles.tarjetaTrabajo}>
          <View style={clienteStyles.trabajoCabecera}>
            <Text style={clienteStyles.trabajoTitulo}>{trabajo.titulo}</Text>
            <View style={clienteStyles.etiqueta}>
              <Text style={clienteStyles.etiquetaTexto}>{trabajo.estado}</Text>
            </View>
          </View>

          <Text style={clienteStyles.trabajoInfo}>
            {trabajo.categoria} • {trabajo.ubicacion}
          </Text>

          <Text style={clienteStyles.trabajoDescripcion}>{trabajo.descripcion}</Text>

          <View style={clienteStyles.trabajoPie}>
            <Text style={clienteStyles.trabajoFecha}>
              {new Date(trabajo.created_at).toLocaleDateString('es-CL')}
            </Text>
            <View style={clienteStyles.filaOfertas}>
              <Ionicons name="chatbubble-outline" size={14} color={ThemeColors.naranja} />
              <Text style={clienteStyles.ofertasTexto}>
                {trabajo.ofertas} {trabajo.ofertas === 1 ? 'oferta' : 'ofertas'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

    </ScrollView>
  );
}
