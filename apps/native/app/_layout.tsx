import '@/polyfills'
import '@/global.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { HeroUINativeProvider } from 'heroui-native'
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'

import { AppThemeProvider } from '@/src/core/providers/app-theme-provider'
import { queryClient } from '@/src/shared/api/orpc'
import '@/src/shared/i18n'

export const unstable_settings = {
  initialRouteName: '(drawer)',
}

function StackLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen
        name="onboarding"
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="modal"
        options={{ title: 'Modal', presentation: 'modal' }}
      />
    </Stack>
  )
}

let MobileWalletProvider: React.ComponentType<any> | null = null
let cluster: any = null

if (Platform.OS === 'android') {
  try {
    const walletKit = require('@wallet-ui/react-native-kit')
    MobileWalletProvider = walletKit.MobileWalletProvider
    cluster = walletKit.createSolanaDevnet()
  } catch (e) {
    console.warn('MobileWalletProvider not available:', e)
  }
}

const identity = {
  name: 'Solana Mobile Stack',
  uri: 'https://solana.com',
  icon: 'favicon.png',
}

function WalletProvider({ children }: { children: React.ReactNode }) {
  if (MobileWalletProvider && cluster) {
    return (
      <MobileWalletProvider cluster={cluster} identity={identity}>
        {children}
      </MobileWalletProvider>
    )
  }
  return <>{children}</>
}

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <KeyboardProvider>
            <AppThemeProvider>
              <HeroUINativeProvider>
                <StackLayout />
              </HeroUINativeProvider>
            </AppThemeProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </WalletProvider>
    </QueryClientProvider>
  )
}
