import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { especialidades } from '../constants/especialidades';
import { especificacionesTrabajo } from '../constants/especificacionesTrabajo';
import { materiales } from '../constants/materiales';
import { ThemeColors } from '../constants/theme';
import { comunasPorRegion, regiones } from '../constants/ubicaciones';
import { publicarTrabajo } from '../services/trabajos';
import { tallerStyles } from '../styles/tallerStyles';

export default function PublicarTrabajoScreen() {
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [fotos, setFotos] = useState<string[]>([]);
  const [especificaciones, setEspecificaciones] = useState<Record<string, string>>({});
  const [unidadMedida, setUnidadMedida] = useState('cm');

  const actualizarEspecificacion = (campo: string, valor: string) => {
    setEspecificaciones((anteriores) => ({...anteriores, [campo]: valor,
    }));
  };

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
    if (!titulo || !categoria || !region || !comuna || !descripcion.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }
    setCargando(true);
    setError('');
    const ubicacion = `${comuna}, ${region}`;
    const { error: dbError } = await publicarTrabajo({ titulo, categoria, ubicacion, descripcion, especificaciones : {...especificaciones, unidadMedida,}}, fotos);
    setCargando(false);
    if (dbError) {
      setError(dbError.message);
    } else {
      router.back();
    }
  };

  return (
    <ScrollView style={tallerStyles.container} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

      <Text style={tallerStyles.titulo}>Publicar Trabajo</Text>
      <Text style={tallerStyles.subtitulo}>
        Describe lo que necesitas y recibe presupuestos de talleres
      </Text>


      {/* TITULO */}
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

      {/* REGIÓN */}

      <View style={tallerStyles.campoContainer}>
        <Text style={tallerStyles.etiqueta}>Región</Text>

        <View style={tallerStyles.pickerContainer}>
          <Picker
            selectedValue={region}
            onValueChange={(valor) => {
              setRegion(valor);
              setComuna('');
            }}
            mode="dropdown"
            dropdownIconColor="#FFFFFF"
            style={tallerStyles.picker}
          >
            <Picker.Item label="Selecciona una región" value="" />

            {regiones.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>
      </View>

      {/* COMUNA */}

      <View style={tallerStyles.campoContainer}>
        <Text style={tallerStyles.etiqueta}>Comuna</Text>

        <View style={tallerStyles.pickerContainer}>
          <Picker
            selectedValue={comuna}
            onValueChange={setComuna}
            enabled={!!region}
            mode="dropdown"
            dropdownIconColor="#FFFFFF"
            style={tallerStyles.picker}
          >
            <Picker.Item label="Selecciona una comuna" value="" />

            {(comunasPorRegion[region] ?? []).map((item) => (
              <Picker.Item
                key={item}
                label={item}
                value={item}
              />
            ))}
          </Picker>
        </View>
      </View>


      {/* DESCRIPCIÓN */}
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
                onPress={() => {setCategoria(especialidad); setEspecificaciones({});}}
              >
                <Text style={[tallerStyles.especialidadTexto, activa && tallerStyles.especialidadTextoActiva]}>
                  {especialidad}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {Boolean(categoria) && (
          <View style={tallerStyles.campoContainer}>
            <Text style={[tallerStyles.etiqueta,{ marginBottom: 20 },]} >
              Especificaciones del trabajo
            </Text>

            <Text style={tallerStyles.etiqueta}>Unidad de medida</Text>

            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
              {['mm', 'cm', 'm'].map((unidad) => (
                <TouchableOpacity
                  key={unidad}
                  style={[ 
                    tallerStyles.materialBoton, 
                    unidadMedida === unidad && { borderColor: '#FF6B00',
                      backgroundColor: '#3A2A20',
                    },
                  ]}
                  onPress={() => setUnidadMedida(unidad)}
                >
                  <Text style={{ color: '#FFFFFF' }}>{unidad}</Text>
                </TouchableOpacity>
              ))}

            </View>



            {(especificacionesTrabajo[categoria] ?? []).map((campo) => (
              <View key={campo} style={{ marginBottom: 15 }}>
                <Text style={tallerStyles.etiqueta}>{campo}</Text>

                {campo === 'Material' ? (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    {materiales.map((material) => (
                      <TouchableOpacity
                        key={material}
                        style={[
                          tallerStyles.materialBoton,
                          especificaciones[campo] === material && {
                            borderColor: '#FF6B00',
                            backgroundColor: '#3A2A20',
                          },
                        ]}
                        onPress={() => actualizarEspecificacion(campo, material)}
                      >
                        <Text style={{ color: '#FFFFFF' }}>
                          {material}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <TextInput
                    style={tallerStyles.campo}
                    placeholder={`Ingresa ${campo.toLowerCase()}`}
                    placeholderTextColor={ThemeColors.textoGris}
                    value={especificaciones[campo] ?? ''}
                    onChangeText={(valor) =>
                      actualizarEspecificacion(campo, valor)
                    }
                    keyboardType="decimal-pad"
                  />
                )}
              </View>
            ))}
          </View>
        )}

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
                  <Text style={{ color: '#FF6B00', fontSize: 22 }}>
                    ✕
                  </Text>
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
