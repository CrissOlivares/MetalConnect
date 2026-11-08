import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { obtenerPresupuestoIA } from '../../services/presupuestosIA';
import { supabase } from '../../services/supabase';
import { obtenerDetalleTrabajo, Trabajo } from '../../services/trabajos';
import { trabajosStyles as styles } from '../../styles/trabajosStyles';

export default function DetalleTrabajoScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [trabajo, setTrabajo] = useState<Trabajo | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [presupuestoIA, setPresupeustoIA] = useState<any>(null);
  const [esPropietario, setEsPropietario] = useState(false);
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
    </ScrollView>
    </>   
  );
}