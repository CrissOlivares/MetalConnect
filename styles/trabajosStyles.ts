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

  // PRESUPUESTO GENERADO POR IA

  tarjetaPresupuesto: {
    backgroundColor: '#262626',
    borderRadius: 16,
    padding: 20,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#333333',
  },

  tituloPresupuesto: {
    color: '#FF6B00',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    },

  montoTotal: {
    color: '#FF6B00',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  filaCosto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  textoCosto: {
    color: '#D4D4D8',
  },

  valorCosto: {
    color: '#FFFFFF',
  },

  textoAvisoIA: {
    color: '#A1A1AA',
    fontSize: 12,
    marginTop: 20,
    lineHeight: 18,
  },

  tituloSeccionPresupuesto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 20,
  },

  textoPresupuesto: {
    color: '#D4D4D8',
    marginTop: 8,
  },


  formularioOferta: {
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 20,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#333333',
  },

  tituloOferta: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  descripcionOferta: {
    color: '#A1A1AA',
    marginBottom: 20,
  },

  etiquetaOferta: {
    color: '#FFFFFF',
    marginBottom: 8,
  },

  inputOferta: {
    backgroundColor: '#181818',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
  },

  inputMensajeOferta: {
    minHeight: 100,
    textAlignVertical: 'top',
  },

  botonEnviarOferta: {
    backgroundColor: '#FF6B00',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBotonOferta: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },


});