import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { clienteStyles } from '../styles/clienteStyles';
import { ThemeColors } from '../constants/theme';

const trabajos = [
  {
    id: '1',
    titulo: 'Fabricar portón de 3 metros',
    categoria: 'Carpintería Metálica',
    ubicacion: 'Las Condes, Santiago',
    descripcion:
      'Necesito un portón corredizo de acero de 3 metros de ancho por 2.5 de alto. Incluir motor eléctrico.',
    fecha: '17-05-2026',
    ofertas: 2,
    estado: 'Abierto',
  },
  {
    id: '2',
    titulo: 'Reparar eje de transmisión',
    categoria: 'Torno/Fresado',
    ubicacion: 'Maipú, Santiago',
    descripcion: 'Eje de camión doblado. Necesita enderezado y soldadura.',
    fecha: '18-05-2026',
    ofertas: 1,
    estado: 'Abierto',
  },
];

export default function ClienteScreen() {
  const [tabActiva, setTabActiva] = useState<'trabajos' | 'ofertas'>('trabajos');

  const totalOfertas = trabajos.reduce((acc, t) => acc + t.ofertas, 0);

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
          <Text style={[clienteStyles.estadisticaNumero, { color: ThemeColors.naranja }]}>2</Text>
          <Text style={clienteStyles.estadisticaEtiqueta}>Trabajos Publicados</Text>
        </View>
        <View style={clienteStyles.tarjetaEstadistica}>
          <Text style={[clienteStyles.estadisticaNumero, { color: ThemeColors.azul }]}>3</Text>
          <Text style={clienteStyles.estadisticaEtiqueta}>Ofertas Recibidas</Text>
        </View>
        <View style={clienteStyles.tarjetaEstadistica}>
          <Text style={[clienteStyles.estadisticaNumero, { color: ThemeColors.textoBlanco }]}>2</Text>
          <Text style={clienteStyles.estadisticaEtiqueta}>Con Respuesta</Text>
        </View>
      </View>

      {/* Botón publicar */}
      <TouchableOpacity style={clienteStyles.btnPublicar}>
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
            <Text style={clienteStyles.trabajoFecha}>{trabajo.fecha}</Text>
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
