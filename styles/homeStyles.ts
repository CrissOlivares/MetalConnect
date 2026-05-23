import { StyleSheet } from 'react-native';
import { FontSizes, FontWeights, Radius, Spacing, ThemeColors } from '../constants/theme';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.fondo,
    alignItems: 'center',
    paddingTop: Spacing.xxl,
    paddingHorizontal: Spacing.md,
  },
  iconContainer: {
    backgroundColor: ThemeColors.naranja,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSizes.titulo,
    fontWeight: FontWeights.bold,
    color: ThemeColors.textoBlanco,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.texto,
    color: ThemeColors.textoGris,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  btnBusco: {
    backgroundColor: ThemeColors.azul,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    width: '100%',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  btnTaller: {
    backgroundColor: ThemeColors.naranja,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    width: '100%',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  btnText: {
    color: ThemeColors.textoBlanco,
    fontSize: FontSizes.texto,
    fontWeight: FontWeights.bold,
  },
  porQueTitle: {
    fontSize: FontSizes.subtitulo,
    fontWeight: FontWeights.bold,
    color: ThemeColors.textoBlanco,
    alignSelf: 'flex-start',
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: ThemeColors.fondoCard,
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'center',
    width: '100%',
  },
  cardIcon: {
    backgroundColor: ThemeColors.naranja,
    padding: Spacing.sm,
    borderRadius: Radius.full,
    marginBottom: Spacing.sm,
  },
  cardTitle: {
    fontSize: FontSizes.texto,
    fontWeight: FontWeights.bold,
    color: ThemeColors.textoBlanco,
    marginBottom: Spacing.xs,
  },
  cardText: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.textoGris,
    textAlign: 'center',
  },
  linkLogin: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.textoGris,
    marginTop: Spacing.sm,
  },
});