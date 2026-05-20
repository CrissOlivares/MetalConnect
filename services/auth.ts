import { supabase } from './supabase'

// Registrar un usuario nuevo
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

// Iniciar sesión
export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  // Cerrar sesión
export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  // Recuperar contraseña
export const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    return { data, error }
  }
  