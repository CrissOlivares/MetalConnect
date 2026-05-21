# MetalConnect
Es una app de Marketplace que conecta talleres metalúrgicos e independientes con clientes y que necesitan servicios industriales

## Estado del proyecto
a fecha de hoy 21-05-2026 en desarrollo

## Disponibilidad
Actualmente a fecha 14-04-2026 se esta desarrollando para personas de Chile
Diseñado para expedirse a toda Latinoamérica 

## Tecnologías
- React Native
- Expo
- React Navigation
- TypeScript

Base de datos:
- Supabase (DB, Auth, Storage)

Funcionalidades específicas:
- Expo Image Picker (fotos)
- Expo Location (Obtener ubicación del usuario)
- React Native Maps (Mostrar mapa)
- Expo Notifications (Notificaciones push)

## Como instalar el proyecto

### Requisitos
- Node.js instalado
- Expo Go en el celular

### Pasos
1.- Clonar el repositorio
git clone https://github.com/CrissOlivares/MetalConnect.git

2.- Entrar a la carpeta
cd MetalConnect

3.- Instalar dependencias
npm Install

4.- IMPORTANTE CREAR VARIABLE DE ENTORNO de nombre .env en la raiz del proyecto
EXPO_PUBLIC_SUPABASE_URL=https://auvdtuozebzruwmibuuu.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=aqui la key que te pase al wsp

5.- Correr la app
npx expo start

6.- Escanear el QR con Expo Go


