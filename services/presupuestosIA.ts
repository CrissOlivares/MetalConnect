
import { supabase } from './supabase';

export const generarPresupuestoIA = async (trabajoId: number) => {
  const { data, error } = await supabase.functions.invoke(
    'generar-presupuesto-ia',
    {
      body: {
        trabajo_id: trabajoId,
      },
    }
  );

  if (error) {
    console.error('Error al generar presupuesto IA:', error);
    return { data: null, error };
  }

  return {
    data: data?.presupuesto ?? null,
    error: null,
  };
};


export const obtenerPresupuestoIA = async (trabajoId: number) => {
  const { data, error } = await supabase
    .from('presupuestos_ia')
    .select('*')
    .eq('trabajo_id', trabajoId)
    .maybeSingle();

  return { data, error };
};