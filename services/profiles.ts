import { supabase } from './supabase';

// Obtener el rol del usuario
export const obtenerRolUsuario = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('is_taller, is_independiente')
    .eq('user_id', userId)
    .single();

  if (error) {
    return { rol: null, error };
  }

  let rol: 'cliente' | 'taller' | 'independiente';

  if (data.is_taller) {
    rol = 'taller';
  } else if (data.is_independiente) {
    rol = 'independiente';
  } else {
    rol = 'cliente';
  }

  return { rol, error: null };
};