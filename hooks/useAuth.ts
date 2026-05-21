import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null) //usuario actual
    const [loading, setLoading] = useState(true) //cargando sesión
    const [timedOut, setTimedOut] = useState(false) // si tardó demasiado
    const [cancelled, setCancelled] = useState(false) // si el usuario canceló

  useEffect(() => {
    let isCancelled = false

    // si tarda más de 30 segundos muestra error
    const timer = setTimeout(() => {
        if (loading) setTimedOut(true)
      }, 30000)
    
    // obtener sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
        if (!isCancelled) {
          setUser(session?.user ?? null)
          setLoading(false)
          clearTimeout(timer)
        }
      })

    // escuchar cambios de sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!isCancelled) {
          setUser(session?.user ?? null)
        }
      })

      return () => {
        isCancelled = true
        clearTimeout(timer)
        subscription.unsubscribe()
      }
    }, [])
    
    // función para cancelar manualmente
  const cancel = () => {
    setCancelled(true)
    setLoading(false)
  }
  return { user, loading, timedOut, cancelled, cancel }
}