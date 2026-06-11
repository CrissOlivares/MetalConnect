import { StyleSheet } from 'react-native';
import { FontSizes, FontWeights, Radius, Spacing, ThemeColors } from '../constants/theme';

export const forgotPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.fondo,
    paddingHorizontal: Spacing.md,
    justifyContent: 'center',
  },
  logoContenedor: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  iconoContenedor: {
    backgroundColor: ThemeColors.naranja,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
  },
  titulo: {
    fontSize: FontSizes.subtitulo,
    fontWeight: FontWeights.bold,
    color: ThemeColors.textoBlanco,
    marginBottom: Spacing.xs,
  },
  subtitulo: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.textoGris,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },
  formulario: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  etiquetaCampo: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.textoGris,
    marginBottom: 4,
  },
  campo: {
    backgroundColor: ThemeColors.fondoCard,
    borderWidth: 1,
    borderColor: ThemeColors.borde,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    color: ThemeColors.textoBlanco,
    fontSize: FontSizes.texto,
  },
  mensajeExito: {
    backgroundColor: '#1a2e1a',
    borderWidth: 1,
    borderColor: '#2d5a2d',
    borderRadius: Radius.sm,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    alignItems: 'center',
    gap: 6,
  },
  mensajeExitoTexto: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.verde,
    textAlign: 'center',
  },
  btnEnviar: {
    backgroundColor: ThemeColors.naranja,
    paddingVertical: Spacing.md,
    borderRadius: Radius.sm,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  btnEnviarTexto: {
    color: ThemeColors.textoBlanco,
    fontSize: FontSizes.texto,
    fontWeight: FontWeights.bold,
  },
  volverFila: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  volverTexto: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.textoGris,
  },
  volverEnlace: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.naranja,
    fontWeight: FontWeights.bold,
  },
});
