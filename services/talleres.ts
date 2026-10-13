import { supabase } from './supabase'

export type NuevoTaller = {
  nombre: string
  rut: string
  direccion: string
  telefono: string
  whatsapp: string
  horario: string
  especialidades: string[]
}

// Registrar el taller del usuario (uno por cuenta)
export const registrarTaller = async (taller: NuevoTaller) => {
  const { data, error } = await supabase.from('talleres').insert(taller).select().single()
  return { data, error }
}
