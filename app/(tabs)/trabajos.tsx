
import { StyleSheet, Text, View } from 'react-native';

export default function TrabajosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Trabajos</Text>
      <Text style={styles.descripcion}>
        Aquí podrás consultar los trabajos de MetalConnect.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 24,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  descripcion: {
    marginTop: 12,
    fontSize: 15,
    color: '#64748B',
  },
});
