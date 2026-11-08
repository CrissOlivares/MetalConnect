
import ChatBot from '@/components/ChatBot'
import { useAuth } from '@/hooks/useAuth'
import { Stack, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import 'react-native-reanimated'

export const unstable_settings = {
  anchor: '(tabs)',
}

export default function RootLayout() {
  
  const { user, loading } = useAuth()
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    if (loading) return
    const pantallaActual = segments[0]
    const esPantallaPublica = pantallaActual === 'login' || 
                          pantallaActual === 'registro' ||
                          pantallaActual === 'forgot-password' ||
                          pantallaActual === 'reset-password'

    if (!user && !esPantallaPublica) {
      router.replace('/login')
    }

    if (user && esPantallaPublica) {
      router.replace('/(tabs)')
    }
  }, [user, loading, segments])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
  <>
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: '#181818' },
        headerStyle: { backgroundColor: '#181818' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
        fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="cliente" options={{ title: 'MetalConnect' }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="registro" options={{ headerShown: false }} />
      <Stack.Screen name="taller" options={{ title: 'MetalConnect' }} />
      <Stack.Screen name="publicar-trabajo" options={{ title: 'MetalConnect' }} />
      <Stack.Screen name="detalle-trabajo/[id]" options={{ title: 'Detalle del trabajo' }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="reset-password" options={{ headerShown: false }} />
    </Stack>

    <StatusBar style="light" />
    {user && <ChatBot />}
  </>
)
}
