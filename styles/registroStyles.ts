import { StyleSheet } from 'react-native';
import { FontSizes, FontWeights, Radius, Spacing, ThemeColors } from '../constants/theme';

export const registroStyles = StyleSheet.create({
  contenedor: {
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
    fontSize: FontSizes.titulo,
    fontWeight: FontWeights.bold,
    color: ThemeColors.textoBlanco,
    marginBottom: Spacing.xs,
  },
  subtitulo: {
    fontSize: FontSizes.texto,
    color: ThemeColors.textoGris,
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
  campoFila: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ThemeColors.fondoCard,
    borderWidth: 1,
    borderColor: ThemeColors.borde,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
  },
  campoFilaTexto: {
    flex: 1,
    paddingVertical: Spacing.sm,
    color: ThemeColors.textoBlanco,
    fontSize: FontSizes.texto,
  },

  btnRegistro: {
    backgroundColor: ThemeColors.naranja,
    paddingVertical: Spacing.md,
    borderRadius: Radius.sm,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  btnRegistroTexto: {
    color: ThemeColors.textoBlanco,
    fontSize: FontSizes.texto,
    fontWeight: FontWeights.bold,
  },

  loginFila: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  loginTexto: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.textoGris,
  },
  loginEnlace: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.naranja,
    fontWeight: FontWeights.bold,
  },
    separador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  separadorLinea: {
    flex: 1,
    height: 1,
    backgroundColor: ThemeColors.borde,
  },
  separadorTexto: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.textoGris,
  },
  btnGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    backgroundColor: ThemeColors.fondoCard,
    borderWidth: 1,
    borderColor: ThemeColors.borde,
    paddingVertical: Spacing.md,
    borderRadius: Radius.sm,
    marginBottom: Spacing.lg,
  },
  btnGoogleTexto: {
    color: ThemeColors.textoBlanco,
    fontSize: FontSizes.texto,
    fontWeight: FontWeights.bold,
  },
});
