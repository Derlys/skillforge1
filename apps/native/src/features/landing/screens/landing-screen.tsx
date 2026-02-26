import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Button } from 'heroui-native'
import { useState } from 'react'
import {
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native'
import { SignIn } from '@/src/features/auth/components/sign-in-form'
import { SignUp } from '@/src/features/auth/components/sign-up-form'
import { useI18n } from '@/src/shared/i18n/use-i18n'

// Note: In a real app, we'd import this from the solana feature
const noopWallet = () => ({
  account: null,
  connect: () => {},
  disconnect: () => {},
})

let useWallet = noopWallet
if (Platform.OS === 'android') {
  try {
    useWallet = require('@wallet-ui/react-native-kit').useMobileWallet
  } catch (e) {
    console.warn('useMobileWallet not available:', e)
  }
}

export function LandingScreen() {
  const [view, setView] = useState<'landing' | 'sign-in' | 'sign-up'>('landing')
  const { connect } = useWallet()
  const { t } = useI18n()

  if (view === 'sign-in') {
    return (
      <View className="flex-1 justify-center bg-[#0B0C14] px-6 py-12">
        <SignIn onSignUpPress={() => setView('sign-up')} />
        <Button
          variant="ghost"
          onPress={() => setView('landing')}
          className="mt-4"
        >
          <Text className="text-gray-900 dark:text-white/60">
            {t('landing.back')}
          </Text>
        </Button>
      </View>
    )
  }

  if (view === 'sign-up') {
    return (
      <View className="flex-1 justify-center bg-[#0B0C14] px-6 py-12">
        <SignUp onSignInPress={() => setView('sign-in')} />
        <Button
          variant="ghost"
          onPress={() => setView('landing')}
          className="mt-4"
        >
          <Text className="text-gray-900 dark:text-white/60">
            {t('landing.back')}
          </Text>
        </Button>
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0B0C14]">
      <StatusBar barStyle="light-content" />

      {/* Top Header with Skip */}
      <View className="flex-row justify-end px-6 pt-4">
        <Pressable
          className="rounded-full border border-black/5 bg-black/5 px-4 py-2 active:bg-white/10 dark:border-white/5 dark:bg-white/5"
          onPress={() => router.replace('/(drawer)/(tabs)')}
        >
          <Text className="font-medium text-gray-900/80 text-xs uppercase tracking-wider dark:text-white/80">
            {t('landing.skip')}
          </Text>
        </Pressable>
      </View>

      <View className="flex-1 items-center justify-between px-6 py-12">
        {/* Header Section */}
        <View className="mt-20 items-center">
          <View className="mb-12 h-0.5 w-12 rounded-full bg-[#3D3E47]" />

          <Text className="mb-2 font-bold text-5xl text-gray-900 dark:text-white">
            {t('landing.title')}
          </Text>
          <Text className="mb-12 font-medium text-gray-900/80 text-lg dark:text-white/80">
            {t('landing.subtitle')}
          </Text>

          <Text className="px-8 text-center text-gray-900/40 text-sm dark:text-white/40">
            {t('landing.description')}
          </Text>
        </View>

        {/* Buttons Section */}
        <View className="mb-10 w-full gap-4">
          <Button
            onPress={connect}
            className="h-14 flex-row items-center justify-center gap-2 rounded-2xl bg-[#FFD700]"
          >
            <Ionicons name="wallet-outline" size={20} color="black" />
            <Text className="font-bold text-black text-lg">
              {t('landing.connectWallet')}
            </Text>
          </Button>

          <View className="flex-row items-center gap-4 py-2">
            <View className="h-[1px] flex-1 bg-white/10" />
            <Text className="text-gray-900/40 text-xs dark:text-white/40">
              {t('landing.or')}
            </Text>
            <View className="h-[1px] flex-1 bg-white/10" />
          </View>

          <Button
            onPress={() => setView('sign-in')}
            className="h-14 flex-row items-center justify-center gap-2 rounded-2xl border border-black/5 bg-[#1A1B23] dark:border-white/5"
          >
            <Ionicons name="mail-outline" size={20} color="white" />
            <Text className="font-semibold text-gray-900 text-lg dark:text-white">
              {t('landing.continueEmail')}
            </Text>
          </Button>
        </View>

        {/* Footer */}
        <View className="flex-row items-center gap-2 opacity-40">
          <Ionicons name="lock-closed-outline" size={12} color="white" />
          <Text className="font-semibold text-[10px] text-gray-900 uppercase tracking-[2px] dark:text-white">
            {t('landing.poweredBy')}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
