import { StyleSheet } from 'react-native';

export const perfilStyles = StyleSheet.create({
    contenedor: {
    flex: 1,
    backgroundColor: '#181818',
  },

  contenido: {
    padding: 20,
    paddingBottom: 40,
  },

  centrado: {
    flex: 1,
    backgroundColor: '#181818',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 15,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },

  tarjeta: {
    backgroundColor: '#262626',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },

  avatarContenedor: {
    alignItems: 'center',
    marginBottom: 14,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#383838',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B00',
  },

  nombrePerfil: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },

  etiquetaRol: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#383838',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 7,
  },

  textoRol: {
    color: '#FF6B00',
    fontWeight: '600',
    fontSize: 13,
  },

  etiquetaPremium: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 12,
    gap: 6,
  },

  textoPremium: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 13,
  },

  encabezadoSeccion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  subtitulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },

  botonEditar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  textoEditar: {
    color: '#FF6B00',
    fontWeight: '600',
  },

  etiqueta: {
    color: '#A1A1AA',
    fontSize: 13,
    marginBottom: 7,
    marginTop: 14,
  },

  valor: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 5,
  },

  input: {
    backgroundColor: '#181818',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 5,
  },

  inputDescripcion: {
    minHeight: 100,
  },

  contenedorBotones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
  },

  botonCancelar: {
    flex: 1,
    backgroundColor: '#383838',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoCancelar: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  botonGuardar: {
    flex: 1,
    backgroundColor: '#FF6B00',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  botonPrincipal: {
    backgroundColor: '#FF6B00',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },

  textoBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },

  botonDeshabilitado: {
    opacity: 0.6,
  },

  filaInformacion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },

  valorInformacion: {
    color: '#FFFFFF',
    fontWeight: '600',
    flexShrink: 1,
    textAlign: 'right',
  },

  separador: {
    height: 1,
    backgroundColor: '#383838',
  },

  texto: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },

  textoSecundario: {
    color: '#A1A1AA',
    fontSize: 14,
    textAlign: 'center',
  },

  avisoRol: {
    color: '#A1A1AA',
    fontSize: 12,
    marginTop: 18,
    lineHeight: 18,
  },

  botonCerrarSesion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 17,
    borderWidth: 1,
    borderColor: '#FF6B00',
    marginBottom: 15,
  },

  textoCerrarSesion: {
    color: '#FF6B00',
    fontSize: 16,
    fontWeight: 'bold',
  },







});