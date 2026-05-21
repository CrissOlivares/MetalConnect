import { StyleSheet } from 'react-native';
import { FontSizes, FontWeights, Radius, Spacing, ThemeColors } from '../constants/theme';

export const clienteStyles = StyleSheet.create({
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
    marginBottom: Spacing.xs,
  },
  subtitulo: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.textoGris,
    marginBottom: Spacing.lg,
  },
  subtituloDestacado: {
    color: ThemeColors.naranja,
    fontWeight: FontWeights.bold,
  },

  // Estadísticas
  filaEstadisticas: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  tarjetaEstadistica: {
    flex: 1,
    backgroundColor: ThemeColors.fondoCard,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: ThemeColors.borde,
    padding: Spacing.sm,
  },
  estadisticaNumero: {
    fontSize: FontSizes.subtitulo,
    fontWeight: FontWeights.bold,
    marginBottom: 4,
  },
  estadisticaEtiqueta: {
    fontSize: 11,
    color: ThemeColors.textoGris,
  },

  // Botón publicar
  btnPublicar: {
    backgroundColor: ThemeColors.naranja,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.md,
    borderRadius: Radius.sm,
    marginBottom: Spacing.lg,
  },
  btnPublicarTexto: {
    color: ThemeColors.textoBlanco,
    fontSize: FontSizes.texto,
    fontWeight: FontWeights.bold,
  },

  // Tabs
  contenedorTabs: {
    flexDirection: 'row',
    backgroundColor: ThemeColors.fondoCard,
    borderRadius: Radius.sm,
    padding: 4,
    marginBottom: Spacing.md,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
  },
  tabActiva: {
    backgroundColor: ThemeColors.naranja,
  },
  tabTexto: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.textoGris,
    fontWeight: FontWeights.normal,
  },
  tabTextoActiva: {
    color: ThemeColors.textoBlanco,
    fontWeight: FontWeights.bold,
  },

  // Tarjetas de trabajo
  tarjetaTrabajo: {
    backgroundColor: ThemeColors.fondoCard,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: ThemeColors.borde,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  trabajoCabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  trabajoTitulo: {
    fontSize: FontSizes.texto,
    fontWeight: FontWeights.bold,
    color: ThemeColors.textoBlanco,
    flex: 1,
    marginRight: Spacing.xs,
  },
  etiqueta: {
    backgroundColor: ThemeColors.naranja,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  etiquetaTexto: {
    color: ThemeColors.textoBlanco,
    fontSize: 11,
    fontWeight: FontWeights.bold,
  },
  trabajoInfo: {
    fontSize: 12,
    color: ThemeColors.textoGris,
    marginBottom: Spacing.xs,
  },
  trabajoDescripcion: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.textoGris,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  trabajoPie: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trabajoFecha: {
    fontSize: 12,
    color: ThemeColors.textoGris,
  },
  filaOfertas: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ofertasTexto: {
    fontSize: FontSizes.pequeño,
    color: ThemeColors.naranja,
    fontWeight: FontWeights.bold,
  },
});
