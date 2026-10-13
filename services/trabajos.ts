import { supabase } from './supabase'

export type Trabajo = {
  id: number
  titulo: string
  categoria: string | null
  ubicacion: string | null
  descripcion: string | null
  estado: string
  created_at: string
  ofertas: number
}

export type NuevoTrabajo = {
  titulo: string
  categoria: string
  ubicacion: string
  descripcion: string
}

// Trabajos publicados por el usuario, con la cantidad de ofertas de cada uno
export const obtenerMisTrabajos = async (userId: string) => {
  const { data, error } = await supabase
    .from('trabajos')
    .select('*, ofertas(count)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  const trabajos: Trabajo[] = (data ?? []).map((t: any) => ({
    ...t,
    ofertas: t.ofertas?.[0]?.count ?? 0,
  }))
  return { data: trabajos, error }
}

// Publicar un trabajo nuevo
export const publicarTrabajo = async (trabajo: NuevoTrabajo) => {
  const { data, error } = await supabase.from('trabajos').insert(trabajo).select().single()
  return { data, error }
}
