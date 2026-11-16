import { File } from 'expo-file-system';
import { generarPresupuestoIA } from './presupuestosIA';
import { supabase } from './supabase';

export type Trabajo = {
  id: number
  titulo: string
  categoria: string | null
  ubicacion: string | null
  descripcion: string | null
  estado: string
  created_at: string
  fotos: string []
  ofertas: number
  especificaciones: Record<string, string>
}

export type NuevoTrabajo = {
  titulo: string
  categoria: string
  ubicacion: string
  descripcion: string
  especificaciones: Record<string, string>;
}

export const subirFotosTrabajo = async (
  fotos: string[],
  userId: string
): Promise<string[]> => {
  const rutas: string[] = []

  if (fotos.length > 5) {
    throw new Error('Solo puedes subir un máximo de 5 fotografías.')
  }

  try {
    for (const uri of fotos) {
      const archivo = new File(uri);

      if (archivo.size > 15 * 1024 * 1024){
        throw new Error('Cada fotografía debe pesar menos de 15 MB');
      }

      const extension = uri.split('?')[0].split('.').pop()?.toLocaleLowerCase();

      if (!['jpg', 'jpeg', 'png', 'webp'].includes(extension ?? '')) {
        throw new Error('Solo se permiten imágenes JPG, PNG o WebP.'); 
    }

      const tipoMime =
        extension == 'png'
          ? 'image/png'
          : extension === 'webp'
            ? 'image/webp'
            : 'image/jpeg';
      
      const arrayBuffer = await archivo.arrayBuffer();

      const nombreArchivo =
        `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

      const ruta = `${userId}/${nombreArchivo}`;

      const { error } = await supabase.storage
        .from('trabajos')
        .upload(ruta, arrayBuffer, {
          contentType: tipoMime,
          upsert: false,
        });

      if (error) {
        throw error;
      }

      rutas.push(ruta);
    }

    return rutas;
  } catch (error) {

    if (rutas.length > 0) {
      const { error: errorLimpieza } = await supabase.storage
        .from('trabajos')
        .remove(rutas);

      if (errorLimpieza) {
        console.error('Error limpiando fotografías:', errorLimpieza);
      }
    }
    throw error;
  }
};



// Trabajos publicados por el usuario, con la cantidad de ofertas de cada uno

export const obtenerMisTrabajos = async (userId: string) => {
  const { data, error } = await supabase
    .from('trabajos')
    .select('*, ofertas!ofertas_trabajo_id_fkey(count)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  const trabajos: Trabajo[] = (data ?? []).map((t: any) => ({
    ...t,
    ofertas: t.ofertas?.[0]?.count ?? 0,
  }));

  return { data: trabajos, error };
};


// Publicar un trabajo nuevo
export const publicarTrabajo = async (
  trabajo: NuevoTrabajo,
  fotos: string[] = []
) => {
  const { data: authData, error: authError } =
    await supabase.auth.getUser();

  if (authError || !authData.user) {
    return {
      data: null,
      error: new Error('Debes iniciar sesión para publicar un trabajo.'),
    };
  }

  const userId = authData.user.id;
  let rutas: string[] = [];

  try {
    if (fotos.length > 0) {
      rutas = await subirFotosTrabajo(fotos, userId);
    }

    const { data, error } = await supabase
      .from('trabajos')
      .insert({
        ...trabajo,
        user_id: userId,
        fotos: rutas,
      })
      .select()
      .single();

    if (error) throw error;

    try {
      const resultadoIA = await generarPresupuestoIA(data.id);

      if (resultadoIA.error) {
        console.warn(
          'El trabajo fue publicado, pero no se generó el presupuesto con IA.',
          resultadoIA.error
        );
      }
    } catch (errorIA) {
      console.warn(
        'El trabajo se publicó, pero falló la generacion del presupuesto con IA,',
        errorIA
      );
    }

    return {data, error:null};

  } catch (error) {
    // Eliminar imágenes subidas si falla la publicación.
    if (rutas.length > 0) {
      const { error: errorLimpieza } = await supabase.storage
        .from('trabajos')
        .remove(rutas);

      if (errorLimpieza) {
        console.error('Error eliminando fotografías:', errorLimpieza);
      }
    }

    return {
      data: null,
      error: error instanceof Error
        ? error
        : new Error('No se pudo publicar el trabajo.'),
    };
  }
};

export const obtenerDetalleTrabajo = async (trabajoId: number) => {
  const { data, error } = await supabase
    .from('trabajos')
    .select('*')
    .eq('id', trabajoId)
    .single();

  return { data: data as Trabajo | null, error };
};

export const obtenerTrabajosDisponibles = async () => {
  const { data, error } = await supabase
    .from('trabajos')
    .select(`
      id,
      titulo,
      categoria,
      ubicacion,
      descripcion,
      estado,
      created_at,
      fotos,
      especificaciones
    `)
    .eq('estado', 'Abierto')
    .order('created_at', { ascending: false });
  
  return { data, error };
};


export const obtenerTrabajosAsignados = async (userId: string) => {
  // Obtener el taller del usuario
  const { data: taller, error: errorTaller } = await supabase
    .from('talleres')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();

  if (errorTaller) {
    return { data: [], error: errorTaller };
  }

  if (!taller) {
    return { data: [], error: null };
  }

  // Obtener ofertas del taller
  const { data: ofertas, error: errorOfertas } = await supabase
    .from('ofertas')
    .select('id')
    .eq('taller_id', taller.id);

  if (errorOfertas) {
    return { data: [], error: errorOfertas };
  }

  const idsOfertas = (ofertas ?? []).map((oferta) => oferta.id);

  if (idsOfertas.length === 0) {
    return { data: [], error: null };
  }

  // Obtener trabajos donde se aceptó una oferta del taller
  const { data, error } = await supabase
    .from('trabajos')
    .select('*')
    .eq('estado', 'Asignado')
    .in('oferta_aceptada_id', idsOfertas)
    .order('created_at', { ascending: false });

  return { data: data ?? [], error };
};


export const eliminarTrabajo = async (trabajoId: number) => {
  const { data: authData, error: authError } =
    await supabase.auth.getUser();

  if (authError || !authData.user) {
    return {
      error: new Error('Debes iniciar sesión para eliminar un trabajo.'),
    };
  }

  const userId = authData.user.id;

  const { data: trabajo, error: errorConsulta } = await supabase
    .from('trabajos')
    .select('id, estado')
    .eq('id', trabajoId)
    .eq('user_id', userId)
    .single();

  if (errorConsulta) return { error: errorConsulta };

  if (trabajo.estado !== 'Abierto') {
    return {
      error: new Error('No puedes eliminar un trabajo que ya está asignado.'),
    };
  }

  const { data: eliminado, error } = await supabase
    .from('trabajos')
    .delete()
    .eq('id', trabajoId)
    .eq('user_id', userId)
    .eq('estado', 'Abierto')
    .select('id')
    .maybeSingle();

  if (error) return { error };

  if (!eliminado) {
    return {
      error: new Error('No se pudo eliminar el trabajo.'),
    };
  }

  return { error: null };
};


