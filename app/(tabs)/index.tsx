import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from '../../services/auth';
import { homeStyles } from '../../styles/homeStyles';

export default function HomeScreen() {
  const router = useRouter();
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [user, loading])

  if (loading) return null

  const handleSignOut = async () => {
    await signOut()
    router.replace('/login')
  }

  return (
    <View style={homeStyles.container}>

      {/* Ícono superior */}
      <View style={homeStyles.iconContainer}>
        <Ionicons name="construct" size={40} color="white" />
      </View>

      {/* Título */}
      <Text style={homeStyles.title}>MetalConnect</Text>
      <Text style={homeStyles.subtitle}>
        Conecta con los mejores talleres metalúrgicos de tu zona
      </Text>

      {/* Botones */}
      <TouchableOpacity style={homeStyles.btnBusco} onPress={() => router.push('/cliente')}>
        <Ionicons name="search" size={20} color="white" />
        <Text style={homeStyles.btnText}>Busco Servicio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={homeStyles.btnTaller}>
        <Ionicons name="business" size={20} color="white" />
        <Text style={homeStyles.btnText}>Soy Taller</Text>
      </TouchableOpacity>

      {/* Por qué MetalConnect */}
      <Text style={homeStyles.porQueTitle}>¿Por qué MetalConnect?</Text>

      <View style={homeStyles.card}>
        <View style={homeStyles.cardIcon}>
          <Ionicons name="flash" size={30} color="white" />
        </View>
        <Text style={homeStyles.cardTitle}>Cotiza Fácil</Text>
        <Text style={homeStyles.cardText}>
          Publica tu trabajo y recibe múltiples presupuestos de talleres verificados
        </Text>
      </View>

      {/* Cerrar sesión */}
      <TouchableOpacity
        onPress={handleSignOut}
        style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', gap: 8 }}
      >
        <Ionicons name="log-out-outline" size={20} color="#FF6B00" />
        <Text style={{ color: '#FF6B00', fontSize: 14 }}>Cerrar sesión</Text>
      </TouchableOpacity>

    </View>
  );
}