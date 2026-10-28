import { StyleSheet } from 'react-native';
import { FontSizes, FontWeights, Radius, Spacing, ThemeColors } from '../constants/theme';

export const tallerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.fondo,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
  },
  titulo: {
    fontSize: FontSizes.subtitulo,
    fontWeight: FontWeights.bold,
    color: ThemeColors.textoBlanco,
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.textoGris,
    marginBottom: Spacing.lg,
  },
  campoContainer: {
    marginBottom: Spacing.sm,
  },
  etiqueta: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.textoBlanco,
    fontWeight: FontWeights.bold,
    marginBottom: 6,
  },
  campo: {
    backgroundColor: ThemeColors.fondoCard,
    borderWidth: 1,
    borderColor: ThemeColors.borde,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    color: ThemeColors.textoBlanco,
    fontSize: FontSizes.pequeño,
  },
  fila: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  campoMitad: {
    flex: 1,
  },
  especialidadesTitulo: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.textoBlanco,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.sm,
  },
  especialidadesGrilla: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  especialidadBtn: {
    width: '48%',
    backgroundColor: ThemeColors.fondoCard,
    borderWidth: 1,
    borderColor: ThemeColors.borde,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
  },
  especialidadBtnActiva: {
    borderColor: ThemeColors.naranja,
    backgroundColor: '#2a1500',
  },
  especialidadTexto: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.textoGris,
  },
  especialidadTextoActiva: {
    color: ThemeColors.naranja,
    fontWeight: FontWeights.bold,
  },
  portafolioTitulo: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.textoBlanco,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.sm,
  },
  portafolioArea: {
    backgroundColor: ThemeColors.fondoCard,
    borderWidth: 1,
    borderColor: ThemeColors.borde,
    borderRadius: Radius.sm,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
    marginBottom: Spacing.lg,
    gap: Spacing.xs,
  },
  portafolioTexto: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.naranja,
  },
  portafolioSubtexto: {
    fontSize: 11,
    color: ThemeColors.textoGris,
  },
  fotosGrilla: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  fotoContenedor: {
    position: 'relative',
    width: '48%',
  },
  foto: {
    width: '100%',
    height: 120,
    borderRadius: Radius.sm,
  },
  fotoBorrar: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  btnRegistrar: {
    backgroundColor: ThemeColors.naranja,
    paddingVertical: Spacing.md,
    borderRadius: Radius.sm,
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  btnRegistrarTexto: {
    color: ThemeColors.textoBlanco,
    fontSize: FontSizes.texto,
    fontWeight: FontWeights.bold,
  },

  pantallaVerificacion: {
  flex: 1,
  backgroundColor: '#181818',
  justifyContent: 'center',
  alignItems: 'center',
  },

  textoVerificacion: {
  color: '#FFFFFF',
  },

  pantallaAccesoRestringido: {
  flex: 1,
  backgroundColor: '#181818',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  },

  tituloAccesoRestringido: {
  color: '#FFFFFF',
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: 15,
  textAlign: 'center',
  },

  textoAccesoRestringido: {
  color: '#A1A1AA',
  textAlign: 'center',
  marginTop: 10,
  },

  botonVolverPerfil: {
  marginTop: 25,
  },




});
