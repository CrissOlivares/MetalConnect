import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  aceptarOferta,
  enviarOferta,
  obtenerOfertasTrabajo,
  OfertaRecibida,
} from '../../services/ofertas';
import { obtenerPresupuestoIA } from '../../services/presupuestosIA';
import { supabase } from '../../services/supabase';
import { eliminarTrabajo, obtenerDetalleTrabajo, Trabajo } from '../../services/trabajos';
import { trabajosStyles as styles } from '../../styles/trabajosStyles';


const formatearCampo = (campo: string) => {
  return campo
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (letra) => letra.toUpperCase());
};

const formatearValor = (valor: unknown): string => {
  if (valor === null || valor === undefined || valor === '') {
    return 'No especificado';
  }

  if (typeof valor === 'boolean') {
    return valor ? 'Sí' : 'No';
  }

  if (Array.isArray(valor)) {
    return valor.map(formatearValor).join(', ');
  }

  if (typeof valor === 'object') {
    return JSON.stringify(valor);
  }

  return String(valor);
};


export default function DetalleTrabajoScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [trabajo, setTrabajo] = useState<Trabajo | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [presupuestoIA, setPresupeustoIA] = useState<any>(null);
  const [esPropietario, setEsPropietario] = useState(false);
  const [tallerId, setTallerId] = useState<number | null>(null);
  const [precioOferta, setPrecioOferta] = useState('');
  const [mensajeOferta, setMensajeOferta] = useState('');
  const [enviandoOferta, setEnviandoOferta] = useState(false);
  const [aceptandoOferta, setAceptandoOferta] = useState(false);
  const [ofertasRecibidas, setOfertasRecibidas] =
    useState<OfertaRecibida[]>([]);

  const [cargandoOfertas, setCargandoOfertas] = useState(false);
  const [errorOfertas, setErrorOfertas] = useState('');
  const [eliminandoTrabajo, setEliminandoTrabajo] = useState(false);
  const [cargandoPresupuesto, setCargandoPresupuesto] = useState(true);

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

        // se comprueba si el trabajo pertenece al usuario
        const { data: authData } = await supabase.auth.getUser();

        const propietario =
          !!authData.user &&
          authData.user.id === (data as Trabajo & {user_id : string })?.user_id;
        
        setEsPropietario(propietario);

      if (authData.user && !propietario) {
        const { data: taller, error: errorTaller } = await supabase
          .from('talleres')
          .select('id')
          .eq('user_id', authData.user.id)
          .maybeSingle();

        if (errorTaller) {
          console.warn(
            'No se pudo consultar el taller:',
            errorTaller.message
          );
        } else {
          setTallerId(taller?.id ?? null);
        }
      }

      if (propietario) {
        setCargandoOfertas(true);
        setErrorOfertas('');

        try {
          const ofertas = await obtenerOfertasTrabajo(Number(id));
          setOfertasRecibidas(ofertas);
        } catch (error) {
          setErrorOfertas(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar las ofertas.'
          );
        } finally {
          setCargandoOfertas(false);
        }
      }


        // solo si es el propietario se calcula el presupuesto

        if (propietario) {
          const { data: presupuesto, error: errorPresupuesto } =
            await obtenerPresupuestoIA(Number(id));

          if (errorPresupuesto) {
            console.warn(
              'No se pudo consultar el presupuesto IA:',
              errorPresupuesto.message
            );
          } else {
            setPresupeustoIA(presupuesto);
          }
        }
      }

      setCargandoPresupuesto(false);
      setCargando(false);
    };

    cargarTrabajo();
  }, [id]);

  
const manejarEnviarOferta = async () => {
  if (enviandoOferta) return;

  if (tallerId === null || !trabajo || esPropietario) {
    Alert.alert('Error', 'No tienes permiso para enviar esta oferta.');
      return;
    }

  const precio = Number(precioOferta.trim());

  if (!Number.isSafeInteger(precio) || precio <= 0) {
    Alert.alert('Precio inválido', 'Ingresa un precio válido en pesos chilenos.');
      return;
    }

  if (!mensajeOferta.trim()) {
    Alert.alert('Mensaje requerido', 'Escribe un mensaje para el cliente.');
      return;
    }

  try {
    setEnviandoOferta(true);

  await enviarOferta({
    trabajoId: Number(id),
    tallerId,
    precio,
    mensaje: mensajeOferta,
    });

  Alert.alert('Oferta enviada', 'Tu cotización fue enviada correctamente.');

    setPrecioOferta('');
    setMensajeOferta('');
  } catch (error) {
    const mensaje =
      error instanceof Error
        ? error.message
        : 'No se pudo enviar la oferta.';

    Alert.alert('Error al enviar oferta', mensaje);
  } finally {
    setEnviandoOferta(false);
    }
  };

const manejarAceptarOferta = (ofertaId: number) => {
  if (aceptandoOferta || !trabajo || !esPropietario) return;

  Alert.alert(
    'Aceptar oferta',
    '¿Estás segura de aceptar esta oferta? El trabajo quedará asignado a este taller.',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Aceptar',
        onPress: async () => {
          try {
            setAceptandoOferta(true);

            await aceptarOferta(Number(id), ofertaId);

            setTrabajo((anterior) =>
              anterior
                ? { ...anterior, estado: 'Asignado' }
                : anterior
            );

            Alert.alert(
              'Oferta aceptada',
              'El trabajo fue asignado correctamente.'
            );
          } catch (error) {
            Alert.alert(
              'Error',
              error instanceof Error
                ? error.message
                : 'No se pudo aceptar la oferta.'
            );
          } finally {
            setAceptandoOferta(false);
          }
        },
      },
    ]
  );
};


const manejarEliminarTrabajo = () => {
  if (!trabajo || !esPropietario || trabajo.estado !== 'Abierto') {
    return;
  }

  const confirmarEliminacion = async () => {
    if (eliminandoTrabajo) return;

    setEliminandoTrabajo(true);

    try {
      const { error } = await eliminarTrabajo(trabajo.id);

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      router.back();
    } catch {
      Alert.alert('Error', 'No se pudo eliminar el trabajo.');
    } finally {
      setEliminandoTrabajo(false);
    }
  };

  if (Platform.OS === 'web') {
    const confirmado = window.confirm(
      '¿Estás seguro de que deseas eliminar este trabajo? Esta acción no se puede deshacer.'
    );

    if (confirmado) {
      void confirmarEliminacion();
    }
  } else {
    Alert.alert(
      'Eliminar trabajo',
      '¿Estás seguro de que deseas eliminar este trabajo? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => void confirmarEliminacion(),
        },
      ]
    );
  }
};


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
  <>
    <Stack.Screen
      options={{
        title: 'Detalle del trabajo',
        headerStyle: {
          backgroundColor: '#181818',
        },
        headerTintColor: '#FFFFFF',
      }}
  />
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
    <ScrollView
      style={{ flex: 1, backgroundColor: '#181818' }}
      contentContainerStyle={{ padding: 20, paddingTop: 50, paddingBottom: 40 }}
      automaticallyAdjustKeyboardInsets={true}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
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

      
    {Object.entries(trabajo.especificaciones ?? {}).map(
      ([campo, valor]) => (
        <View
          key={campo}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginTop: 12,
            gap: 16,
          }}
        >
          <Text
            style={{
              color: '#A1A1AA',
              flex: 1,
            }}
          >
            {formatearCampo(campo)}
          </Text>

          <Text
            style={{
              color: '#FFFFFF',
              flex: 1,
              textAlign: 'right',
            }}
          >
            {formatearValor(valor)}
          </Text>
        </View>
      )
    )}


    <Text style={{ color: '#A1A1AA', marginTop: 30 }}>
      Publicado el {new Date(trabajo.created_at).toLocaleDateString('es-CL')}
    </Text>
    
  {esPropietario && presupuestoIA && (
    <View style={styles.tarjetaPresupuesto}>
      <Text style={styles.tituloPresupuesto}>
        ✨ Presupuesto estimado por IA
      </Text>

      <Text style={styles.montoTotal}>
        ${Number(presupuestoIA.costo_total).toLocaleString('es-CL')} CLP
      </Text>

    <View style={styles.filaCosto}>
      <Text style={styles.textoCosto}>Materiales</Text>
      <Text style={styles.valorCosto}>
        ${Number(presupuestoIA.costo_materiales).toLocaleString('es-CL')}
        </Text>
    </View>

    <View style={styles.filaCosto}>
      <Text style={styles.textoCosto}>Mano de obra</Text>
      <Text style={styles.valorCosto}>
        ${Number(presupuestoIA.costo_mano_obra).toLocaleString('es-CL')}
      </Text>
    </View>

    <View style={styles.filaCosto}>
      <Text style={styles.textoCosto}>Otros costos</Text>
      <Text style={styles.valorCosto}>
        ${Number(presupuestoIA.otros_costos).toLocaleString('es-CL')}
      </Text>
    </View>

    <Text style={styles.tituloSeccionPresupuesto}>
      ⏱ Tiempo estimado
    </Text>

    <Text style={styles.textoPresupuesto}>
      {presupuestoIA.tiempo_estimado}
    </Text>

    <Text style={styles.tituloSeccionPresupuesto}>
      Explicación de la estimación
    </Text>

    <Text style={styles.textoPresupuesto}>
      {presupuestoIA.explicacion}
    </Text>

    <Text style={styles.textoAvisoIA}>
      Este presupuesto es una estimación orientativa generada
      por inteligencia artificial. El precio final dependerá
      de las cotizaciones de los talleres.
    </Text>

    </View>
  )}


  {esPropietario && (
    <View style={styles.seccionOfertasRecibidas}>
      <Text style={styles.tituloOferta}>
        Ofertas recibidas ({ofertasRecibidas.length})
      </Text>

      {cargandoOfertas ? (
        <ActivityIndicator color="#FF6B00" />
      ) : errorOfertas ? (
        <Text style={styles.descripcionOferta}>
          {errorOfertas}
        </Text>
      ) : ofertasRecibidas.length === 0 ? (
        <Text style={styles.descripcionOferta}>
          Todavía no has recibido ofertas para este trabajo.
        </Text>
      ) : (
        ofertasRecibidas.map((oferta) => (
          <View key={oferta.id} style={styles.tarjetaOfertaRecibida}>
            <Text style={styles.nombreTallerOferta}>
              {oferta.taller?.nombre ?? 'Taller'}
            </Text>

            <Text style={styles.precioOfertaRecibida}>
              ${Number(oferta.precio).toLocaleString('es-CL')} CLP
            </Text>

            <Text style={styles.mensajeOfertaRecibida}>
              {oferta.mensaje}
            </Text>

            <Text style={styles.fechaOfertaRecibida}>
              Enviada el{' '}
              {new Date(oferta.created_at).toLocaleDateString('es-CL')}
            </Text>
            {trabajo.estado === 'Abierto' && (
              <TouchableOpacity
                style={styles.botonAceptarOferta}
                onPress={() => manejarAceptarOferta(oferta.id)}
                disabled={aceptandoOferta}
              >
                <Text style={styles.textoBotonAceptarOferta}>
                  {aceptandoOferta ? 'Aceptando...' : 'Aceptar oferta'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      )}
    </View>
  )}


  {tallerId !== null && !esPropietario && trabajo.estado === 'Abierto' && (
    <View style={styles.formularioOferta}>
      <Text style={styles.tituloOferta}>
        Enviar oferta
      </Text>

      <Text style={styles.descripcionOferta}>
        Envía tu cotización al cliente para este trabajo.
      </Text>

      <Text style={styles.etiquetaOferta}>
        Precio de tu oferta (CLP)
      </Text>

      <TextInput
        style={styles.inputOferta}
        placeholder="Ej: 150000"
        placeholderTextColor="#A1A1AA"
        keyboardType="numeric"
        value={precioOferta}
        onChangeText={setPrecioOferta}
      />

      <Text style={styles.etiquetaOferta}>
        Mensaje para el cliente
      </Text>

      <TextInput
        style={[styles.inputOferta, styles.inputMensajeOferta]}
        placeholder="Describe tu propuesta, materiales y plazo estimado..."
        placeholderTextColor="#A1A1AA"
        multiline
        value={mensajeOferta}
        onChangeText={setMensajeOferta}
      />

      <TouchableOpacity
        style={styles.botonEnviarOferta}
        onPress={manejarEnviarOferta}
        disabled={enviandoOferta}
      >
        <Text style={styles.textoBotonOferta}>
          {enviandoOferta ? 'Enviando...' : 'Enviar oferta'}
        </Text>
      </TouchableOpacity>
    </View>
  )}

  
{esPropietario && trabajo.estado === 'Abierto' && (
  <TouchableOpacity
    style={styles.botonEliminarTrabajo}
    onPress={manejarEliminarTrabajo}
    disabled={eliminandoTrabajo}
  >
    <Text style={styles.textoBotonEliminarTrabajo}>
      {eliminandoTrabajo ? 'Eliminando...' : 'Eliminar trabajo'}
    </Text>
  </TouchableOpacity>
)}


  </ScrollView>
  </KeyboardAvoidingView>
  </>   
);
}