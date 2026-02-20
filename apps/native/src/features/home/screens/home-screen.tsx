import { Ionicons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { Chip, useThemeColor } from 'heroui-native'
import { Pressable, Text, View } from 'react-native'

import { ServiceSelectionScreen } from '@/src/features/onboarding/screens/service-selection-screen'
import { SolanaConnect } from '@/src/features/solana/components/solana-connect-card'
import { orpc, queryClient } from '@/src/shared/api/orpc'
import { authClient } from '@/src/shared/auth/auth-client'
import { Container } from '@/src/shared/ui/container'

export default function Home() {
  const healthCheck = useQuery(orpc.healthCheck.queryOptions())
  const privateData = useQuery(orpc.privateData.queryOptions())
  const { data: session } = authClient.useSession()

  const mutedColor = useThemeColor('muted')
  const successColor = useThemeColor('success')
  const dangerColor = useThemeColor('danger')

  if (!session?.user) {
    return <ServiceSelectionScreen />
  }

  const isConnected = healthCheck?.data === 'OK'
  const isLoading = healthCheck?.isLoading

  return (
    <Container className="bg-white">
      <View className="space-y-6 p-6">
        <View className="mb-6 py-4">
          <Text className="mb-2 font-bold text-4xl text-foreground">
            solana-mobile-stack
          </Text>
        </View>

        <View className="mb-6">
          <SolanaConnect />
        </View>

        <View className="mb-6 rounded-lg bg-success/10 p-4">
          <Text className="mb-2 text-base text-foreground">
            Bienvenido, <Text className="font-medium">{session.user.name}</Text>
          </Text>
          <Text className="mb-4 text-muted text-sm">{session.user.email}</Text>
          <Pressable
            className="self-start rounded-lg bg-danger px-4 py-3 active:opacity-70"
            onPress={() => {
              authClient.signOut()
              queryClient.invalidateQueries()
            }}
          >
            <Text className="font-medium text-foreground">Cerrar sesión</Text>
          </Pressable>
        </View>

        <View className="rounded-lg border border-gray-200 p-4">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="font-semibold text-black">Estado del Sistema</Text>
            <Chip color={isConnected ? 'success' : 'danger'} size="sm">
              <Chip.Label>{isConnected ? 'EN LÍNEA' : 'OFFLINE'}</Chip.Label>
            </Chip>
          </View>

          <View className="flex-row items-center">
            <View
              className={`mr-3 h-3 w-3 rounded-full ${isConnected ? 'bg-success' : 'bg-muted'}`}
            />
            <View className="flex-1">
              <Text className="mb-1 font-medium text-foreground">
                ORPC Backend
              </Text>
              <Text className="text-muted text-sm">
                {isLoading
                  ? 'Verificando conexión...'
                  : isConnected
                    ? 'Conectado a la API'
                    : 'API Desconectado'}
              </Text>
            </View>
            {isLoading && (
              <Ionicons name="hourglass-outline" size={20} color={mutedColor} />
            )}
            {!isLoading && isConnected && (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={successColor}
              />
            )}
            {!isLoading && !isConnected && (
              <Ionicons name="close-circle" size={20} color={dangerColor} />
            )}
          </View>
        </View>

        <View className="my-6 rounded-lg border border-gray-200 p-4">
          <Text className="mb-2 font-semibold text-black">Datos Privados</Text>
          <Text className="text-muted">
            {privateData.data?.message || 'No has iniciado sesión'}
          </Text>
        </View>
      </View>
    </Container>
  )
}
