
import { supabase } from './supabase';

type NuevaOferta = {
  trabajoId: number;
  tallerId: number;
  precio: number;
  mensaje: string;
};

export const enviarOferta = async ({
  trabajoId,
  tallerId,
  precio,
  mensaje,
}: NuevaOferta) => {
  if (!Number.isSafeInteger(trabajoId) || trabajoId <= 0) {
    throw new Error('El trabajo no es válido.');
  }

  if (!Number.isSafeInteger(tallerId) || tallerId <= 0) {
    throw new Error('El taller no es válido.');
  }

  if (!Number.isSafeInteger(precio) || precio <= 0) {
    throw new Error('Ingresa un precio válido en pesos chilenos.');
  }

  if (!mensaje.trim()) {
    throw new Error('Debes escribir un mensaje para el cliente.');
  }

  const { data: authData, error: authError } =
    await supabase.auth.getUser();

  if (authError || !authData.user) {
    throw new Error('Debes iniciar sesión para enviar una oferta.');
  }

  const { data: taller, error: errorTaller } = await supabase
    .from('talleres')
    .select('id')
    .eq('id', tallerId)
    .eq('user_id', authData.user.id)
    .maybeSingle();

  if (errorTaller) throw errorTaller;

  if (!taller) {
    throw new Error('No tienes permiso para ofertar desde este taller.');
  }

  const { data: trabajo, error: errorTrabajo } = await supabase
    .from('trabajos')
    .select('id, user_id, estado')
    .eq('id', trabajoId)
    .maybeSingle();

  if (errorTrabajo) throw errorTrabajo;

  if (!trabajo || trabajo.estado !== 'Abierto') {
    throw new Error('Este trabajo ya no está disponible para ofertas.');
  }

  if (trabajo.user_id === authData.user.id) {
    throw new Error('No puedes enviar una oferta a tu propio trabajo.');
  }

  const { data: ofertaExistente, error: errorConsulta } = await supabase
    .from('ofertas')
    .select('id')
    .eq('trabajo_id', trabajoId)
    .eq('taller_id', tallerId)
    .maybeSingle();

  if (errorConsulta) throw errorConsulta;

  if (ofertaExistente) {
    throw new Error('Tu taller ya envió una oferta para este trabajo.');
  }

  const { data, error } = await supabase
    .from('ofertas')
    .insert({
      trabajo_id: trabajoId,
      taller_id: tallerId,
      precio,
      mensaje: mensaje.trim(),
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};
