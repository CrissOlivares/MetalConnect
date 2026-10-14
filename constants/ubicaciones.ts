
import datos from './ubicacionesChile.json';

// Obtiene las regiones desde el JSON
export const regiones = datos.regiones.map((item) => ({
  label: item.region,
  value: item.region,
}));

// Agrupar las comunas según su región
export const comunasPorRegion: Record<string, string[]> =
  Object.fromEntries(
    datos.regiones.map((item) => [
      item.region,
      item.comunas,
    ])
  );

