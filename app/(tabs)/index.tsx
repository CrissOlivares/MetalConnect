import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { homeStyles } from '../../styles/homeStyles';

export default function HomeScreen() {
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
      <TouchableOpacity style={homeStyles.btnBusco}>
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

    </View>
  );
}