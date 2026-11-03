import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { especialidades } from '../constants/especialidades';
import { ThemeColors } from '../constants/theme';
import { publicarTrabajo } from '../services/trabajos';
import { tallerStyles } from '../styles/tallerStyles';

export default function PublicarTrabajoScreen() {
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [fotos, setFotos] = useState<string[]>([]);

  const seleccionarFotos= async () => {
    if (fotos.length >= 5) {
      Alert.alert('Límite alcanzado','Puedes subir un máximo de 5 fotografías.');
      return;
  }

  const resultado = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsMultipleSelection: true,
    selectionLimit: 5 - fotos.length,
    quality: 0.8,
  });

  if (!resultado.canceled) {
    const nuevasFotos = resultado.assets.map((foto) => foto.uri);

    setFotos((anteriores) =>
      [...anteriores, ...nuevasFotos].slice(0, 5)
    );
  }
  };

  const handlePublicar = async () => {
    if (!titulo || !categoria || !ubicacion || !descripcion) {
      setError('Por favor completa todos los campos');
      return;
    }
    setCargando(true);
    setError('');
    const { error: dbError } = await publicarTrabajo({ titulo, categoria, ubicacion, descripcion }, fotos);
    setCargando(false);
    if (dbError) {
      setError(dbError.message);
    } else {
      router.back();
    }
  };

  return (
    <ScrollView style={tallerStyles.container} showsVerticalScrollIndicator={false}>

      <Text style={tallerStyles.titulo}>Publicar Trabajo</Text>
      <Text style={tallerStyles.subtitulo}>
        Describe lo que necesitas y recibe presupuestos de talleres
      </Text>

      <View style={tallerStyles.campoContainer}>
        <Text style={tallerStyles.etiqueta}>Título</Text>
        <TextInput
          style={tallerStyles.campo}
          placeholder="Ej: Fabricar portón de 3 metros"
          placeholderTextColor={ThemeColors.textoGris}
          value={titulo}
          onChangeText={setTitulo}
        />
      </View>

      <View style={tallerStyles.campoContainer}>
        <Text style={tallerStyles.etiqueta}>Ubicación</Text>
        <TextInput
          style={tallerStyles.campo}
          placeholder="Las Condes, Santiago"
          placeholderTextColor={ThemeColors.textoGris}
          value={ubicacion}
          onChangeText={setUbicacion}
        />
      </View>

      <View style={tallerStyles.campoContainer}>
        <Text style={tallerStyles.etiqueta}>Descripción</Text>
        <TextInput
          style={[tallerStyles.campo, { minHeight: 100, textAlignVertical: 'top' }]}
          placeholder="Medidas, materiales, plazos..."
          placeholderTextColor={ThemeColors.textoGris}
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
        />
      </View>

      <Text style={tallerStyles.especialidadesTitulo}>Categoría</Text>
      <View style={tallerStyles.especialidadesGrilla}>
        {especialidades.map((especialidad) => {
          const activa = categoria === especialidad;
          return (
            <TouchableOpacity
              key={especialidad}
              style={[tallerStyles.especialidadBtn, activa && tallerStyles.especialidadBtnActiva]}
              onPress={() => setCategoria(especialidad)}
            >
              <Text style={[tallerStyles.especialidadTexto, activa && tallerStyles.especialidadTextoActiva]}>
                {especialidad}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={tallerStyles.portafolioTitulo}>Fotografías del trabajo (opcional)</Text>
      <TouchableOpacity style={tallerStyles.portafolioArea} onPress={seleccionarFotos}>
        <Text style={tallerStyles.portafolioTexto}>📸 Agregar fotografías</Text>
        <Text style={tallerStyles.portafolioSubtexto}>Máximo 5 imágenes (JPG, PNG o WebP)</Text>
      </TouchableOpacity>

      {fotos.length > 0 && (
        <View style={tallerStyles.fotosGrilla}>
          {fotos.map((uri) => (
            <View key={uri} style={tallerStyles.fotoContenedor}>
              <Image source={{ uri }} style={tallerStyles.foto}/>
              <TouchableOpacity style={tallerStyles.fotoBorrar} onPress={() => setFotos((anteriores) => anteriores.filter((foto) => foto !== uri))}>
                <Text style={{ color: '#FF6B00', fontSize: 22 }}>✕</Text>
              </TouchableOpacity>
        </View>
          ))}
        </View>
      )}

      
        

      {error ? (
        <Text style={{ color: 'red', textAlign: 'center', marginBottom: 8 }}>{error}</Text>
      ) : null}

      <TouchableOpacity style={tallerStyles.btnRegistrar} onPress={handlePublicar} disabled={cargando}>
        <Text style={tallerStyles.btnRegistrarTexto}>
          {cargando ? 'Publicando...' : 'Publicar Trabajo'}
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
