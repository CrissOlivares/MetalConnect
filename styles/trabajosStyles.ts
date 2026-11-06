import { StyleSheet } from 'react-native';

export const trabajosStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    padding: 24,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  descripcion: {
    marginTop: 12,
    fontSize: 15,
    color: '#A1A1AA',
  },

  tarjeta: {
    backgroundColor: '#262626',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    padding: 18,
    marginTop: 16,
  },

  tarjetaTitulo: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  tarjetaInfo: {
    color: '#A1A1AA',
    fontSize: 14,
    marginBottom: 8,
  },

  tarjetaDescripcion: {
    color: '#D4D4D8',
    fontSize: 14,
    marginTop: 8,
  },

  verDetalle: {
    color: '#FF6B00',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 16,
  },
});