
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      
screenOptions={{
  headerShown: false,

  // Colores de los iconos y textos
  tabBarActiveTintColor: '#FF6B00',
  tabBarInactiveTintColor: '#A1A1AA',

  // Fondo del menú inferior
  tabBarStyle: {
    backgroundColor: '#181818',
    borderTopColor: '#333333',
    borderTopWidth: 1,
    height: 65 + insets.bottom,
    paddingTop: 8,
    paddingBottom: 8 + insets.bottom,
  },

  // Estilo de los textos
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '600',
  },
}}

    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={typeof color === 'string' ? color : '#A1A1AA'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="trabajos"
        options={{
          title: 'Trabajos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="construct-outline"
              size={size}
              color={typeof color === 'string' ? color : '#A1A1AA'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={typeof color === 'string' ? color : '#A1A1AA'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
