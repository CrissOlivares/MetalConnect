import { StyleSheet } from 'react-native';
import { FontSizes, FontWeights, Radius, Spacing, ThemeColors } from '../constants/theme';

export const resetPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.fondo,
    paddingHorizontal: Spacing.md,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  iconoContainer: {
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
    textAlign: 'center',
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
  campoFila: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ThemeColors.fondoCard,
    borderWidth: 1,
    borderColor: ThemeColors.borde,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
  },
  campoTexto: {
    flex: 1,
    paddingVertical: Spacing.sm,
    color: ThemeColors.textoBlanco,
    fontSize: FontSizes.texto,
  },
  errorTexto: {
    color: '#ff4444',
    fontSize: FontSizes.pequeño,
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
  btnGuardar: {
    backgroundColor: ThemeColors.naranja,
    paddingVertical: Spacing.md,
    borderRadius: Radius.sm,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  btnGuardarTexto: {
    color: ThemeColors.textoBlanco,
    fontSize: FontSizes.texto,
    fontWeight: FontWeights.bold,
  },
  btnDeshabilitado: {
    opacity: 0.6,
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