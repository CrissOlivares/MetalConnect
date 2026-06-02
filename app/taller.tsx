import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

  const toggleEspecialidad = (especialidad: string) => {
    if (seleccionadas.includes(especialidad)) {
      setSeleccionadas(seleccionadas.filter((e) => e !== especialidad));
    } else {
      setSeleccionadas([...seleccionadas, especialidad]);
    }
  };

  return (
    <ScrollView style={tallerStyles.contenedor} showsVerticalScrollIndicator={false}>

      {/* Encabezado */}
      <Text style={tallerStyles.titulo}>Registrar Mi Taller</Text>
      <Text style={tallerStyles.subtitulo}>
        Completa la información de tu empresa para recibir solicitudes
      </Text>

      {/* Nombre del taller */}
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

      {/* RUT */}
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

      {/* Dirección */}
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

      {/* Teléfono y WhatsApp */}
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

      {/* Horario */}
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

      {/* Especialidades */}
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

      {/* Portafolio */}
      <Text style={tallerStyles.portafolioTitulo}>Portafolio de Trabajos (opcional)</Text>
      <TouchableOpacity style={tallerStyles.portafolioArea}>
        <Ionicons name="cloud-upload-outline" size={32} color={ThemeColors.naranja} />
        <Text style={tallerStyles.portafolioTexto}>Sube fotos de tus mejores trabajos</Text>
        <Text style={tallerStyles.portafolioSubtexto}>JPG o PNG hasta 10MB cada una</Text>
      </TouchableOpacity>

      {/* Botón registrar */}
      <TouchableOpacity style={tallerStyles.btnRegistrar}>
        <Text style={tallerStyles.btnRegistrarTexto}>Registrar Taller</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
