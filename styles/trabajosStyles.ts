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

  seccionOfertasRecibidas: {
  marginTop: 30,
  marginBottom: 20,
  },

  tarjetaOfertaRecibida: {
  backgroundColor: '#262626',
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#333333',
  padding: 16,
  marginTop: 12,
  },

  nombreTallerOferta: {
  color: '#FFFFFF',
  fontSize: 17,
  fontWeight: 'bold',
  marginBottom: 10,
  },

  precioOfertaRecibida: {
  color: '#FF6B00',
  fontSize: 22,
  fontWeight: 'bold',
  marginBottom: 12,
  },

  mensajeOfertaRecibida: {
  color: '#D4D4D8',
  fontSize: 14,
  lineHeight: 21,
  marginBottom: 12,
  },

  fechaOfertaRecibida: {
  color: '#A1A1AA',
  fontSize: 12,
  },

  botonAceptarOferta: {
  backgroundColor: '#FF6B00',
  borderRadius: 8,
  paddingVertical: 14,
  alignItems: 'center',
  marginTop: 15,
  },

  textoAceptarOferta: {
  color: '#FFFFFF',
  fontSize: 15,
  fontWeight: 'bold',
  },

  textoBotonAceptarOferta: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: 'bold',
  textAlign: 'center',
  },

  
  seccionAsignados: {
  marginTop: 30,
  },

  tituloSeccion: {
  color: '#FFFFFF',
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 16,
  },

  estadoAsignado: {
  color: '#4ADE80',
  fontSize: 14,
  fontWeight: 'bold',
  marginTop: 10,
  },

  
  contenedorTabs: {
  flexDirection: 'row',
  backgroundColor: '#262626',
  borderRadius: 10,
  padding: 4,
  marginTop: 20,
  marginBottom: 20,
  },

  tab: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 12,
  borderRadius: 8,
  },

  tabActiva: {
  backgroundColor: '#FF6B00',
  },

  tabTexto: {
  color: '#AAAAAA',
  fontSize: 14,
  fontWeight: '600',
  },

  tabTextoActivo: {
  color: '#FFFFFF',
  fontWeight: 'bold',
  },

  
  botonEliminarTrabajo: {
  backgroundColor: '#B91C1C',
  paddingVertical: 14,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 24,
  marginBottom: 20,
  },

  textoBotonEliminarTrabajo: {
  color: '#FFFFFF',
  fontSize: 15,
  fontWeight: 'bold',
  },





});