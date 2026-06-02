import { StyleSheet } from 'react-native';
import { FontSizes, FontWeights, Radius, Spacing, ThemeColors } from '../constants/theme';

export const tallerStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: ThemeColors.fondo,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
  },

  // Encabezado
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

  // Campos del formulario
  campoContenedor: {
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

  // Fila de dos campos
  fila: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  campoMitad: {
    flex: 1,
  },

  // Especialidades
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

  // Portafolio
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

  // Botón registrar
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
});
