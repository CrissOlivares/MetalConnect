import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemeColors } from '../constants/theme';
import { tallerStyles } from '../styles/tallerStyles';

const especialidades = [
  'Soldadura MIG/TIG',
  'Carpintería Metálica',
  'Torno/Fresado',
  'Corte Láser',
  'Plegado',
  'Caldería',
  'Estructuras',
  'Cerrajería',
  'Corte Plasma',
  'Mecanizado CNC',
];

export default function TallerScreen() {
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [horario, setHorario] = useState('');
  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);
  const [fotos, setFotos] = useState<string[]>([]);

  const seleccionarFotos = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería para subir fotos.');
      return;
    }
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });
    if (!resultado.canceled) {
      const nuevasFotos = resultado.assets.map((a) => a.uri);
      setFotos([...fotos, ...nuevasFotos]);
    }
  };

  const eliminarFoto = (uri: string) => {
    setFotos(fotos.filter((f) => f !== uri));
  };

  const toggleEspecialidad = (especialidad: string) => {
    if (seleccionadas.includes(especialidad)) {
      setSeleccionadas(seleccionadas.filter((e) => e !== especialidad));
    } else {
      setSeleccionadas([...seleccionadas, especialidad]);
    }
  };

  return (
    <ScrollView style={tallerStyles.contenedor} showsVerticalScrollIndicator={false}>

      <Text style={tallerStyles.titulo}>Registrar Mi Taller</Text>
      <Text style={tallerStyles.subtitulo}>
        Completa la información de tu empresa para recibir solicitudes
      </Text>

      <View style={tallerStyles.campoContenedor}>
        <Text style={tallerStyles.etiqueta}>Nombre del Taller</Text>
        <TextInput
          style={tallerStyles.campo}
          placeholder="Ej: Taller MetalPro"
          placeholderTextColor={ThemeColors.textoGris}
          value={nombre}
          onChangeText={setNombre}
        />
      </View>

      <View style={tallerStyles.campoContenedor}>
        <Text style={tallerStyles.etiqueta}>RUT Empresa</Text>
        <TextInput
          style={tallerStyles.campo}
          placeholder="76.123.456-7"
          placeholderTextColor={ThemeColors.textoGris}
          value={rut}
          onChangeText={setRut}
        />
      </View>

      <View style={tallerStyles.campoContenedor}>
        <Text style={tallerStyles.etiqueta}>Dirección</Text>
        <TextInput
          style={tallerStyles.campo}
          placeholder="Av. Industrial 1234, Santiago"
          placeholderTextColor={ThemeColors.textoGris}
          value={direccion}
          onChangeText={setDireccion}
        />
      </View>

      <View style={tallerStyles.fila}>
        <View style={tallerStyles.campoMitad}>
          <Text style={tallerStyles.etiqueta}>Teléfono</Text>
          <TextInput
            style={tallerStyles.campo}
            placeholder="+56 9 1234 5678"
            placeholderTextColor={ThemeColors.textoGris}
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
          />
        </View>
        <View style={tallerStyles.campoMitad}>
          <Text style={tallerStyles.etiqueta}>WhatsApp</Text>
          <TextInput
            style={tallerStyles.campo}
            placeholder="+56912345678"
            placeholderTextColor={ThemeColors.textoGris}
            value={whatsapp}
            onChangeText={setWhatsapp}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={tallerStyles.campoContenedor}>
        <Text style={tallerStyles.etiqueta}>Horario de Atención</Text>
        <TextInput
          style={tallerStyles.campo}
          placeholder="Lun-Vie: 8:00-18:00"
          placeholderTextColor={ThemeColors.textoGris}
          value={horario}
          onChangeText={setHorario}
        />
      </View>

      <Text style={tallerStyles.especialidadesTitulo}>Especialidades</Text>
      <View style={tallerStyles.especialidadesGrilla}>
        {especialidades.map((especialidad) => {
          const activa = seleccionadas.includes(especialidad);
          return (
            <TouchableOpacity
              key={especialidad}
              style={[tallerStyles.especialidadBtn, activa && tallerStyles.especialidadBtnActiva]}
              onPress={() => toggleEspecialidad(especialidad)}
            >
              <Text style={[tallerStyles.especialidadTexto, activa && tallerStyles.especialidadTextoActiva]}>
                {especialidad}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={tallerStyles.portafolioTitulo}>Portafolio de Trabajos (opcional)</Text>
      <TouchableOpacity style={tallerStyles.portafolioArea} onPress={seleccionarFotos}>
        <Ionicons name="cloud-upload-outline" size={32} color={ThemeColors.naranja} />
        <Text style={tallerStyles.portafolioTexto}>Sube fotos de tus mejores trabajos</Text>
        <Text style={tallerStyles.portafolioSubtexto}>JPG o PNG hasta 10MB cada una</Text>
      </TouchableOpacity>

      {fotos.length > 0 && (
        <View style={tallerStyles.fotosGrilla}>
          {fotos.map((uri) => (
            <View key={uri} style={tallerStyles.fotoContenedor}>
              <Image source={{ uri }} style={tallerStyles.foto} />
              <TouchableOpacity
                style={tallerStyles.fotoBorrar}
                onPress={() => eliminarFoto(uri)}
              >
                <Ionicons name="close-circle" size={22} color={ThemeColors.naranja} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={tallerStyles.btnRegistrar}>
        <Text style={tallerStyles.btnRegistrarTexto}>Registrar Taller</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
