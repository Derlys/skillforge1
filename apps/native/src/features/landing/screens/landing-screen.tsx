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
import { useAppTheme } from '@/src/core/providers/app-theme-provider'
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
  const { isDark } = useAppTheme()

  const bgColor = isDark ? '#0B0C14' : '#F3F4F6'
  const textColor = isDark ? '#FFFFFF' : '#111827'
  const textSecondary = isDark ? 'rgba(255,255,255,0.6)' : '#6B7280'

  if (view === 'sign-in') {
    return (
      <View
        className="flex-1 justify-center px-6 py-12"
        style={{ backgroundColor: bgColor }}
      >
        <SignIn onSignUpPress={() => setView('sign-up')} />
        <Button
          variant="ghost"
          onPress={() => setView('landing')}
          className="mt-4"
        >
          <Text style={{ color: textSecondary }}>{t('landing.back')}</Text>
        </Button>
      </View>
    )
  }

  if (view === 'sign-up') {
    return (
      <View
        className="flex-1 justify-center px-6 py-12"
        style={{ backgroundColor: bgColor }}
      >
        <SignUp onSignInPress={() => setView('sign-in')} />
        <Button
          variant="ghost"
          onPress={() => setView('landing')}
          className="mt-4"
        >
          <Text style={{ color: textSecondary }}>{t('landing.back')}</Text>
        </Button>
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: bgColor }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Top Header with Skip */}
      <View className="flex-row justify-end px-6 pt-4">
        <Pressable
          className="rounded-full border border-black/5 bg-black/5 px-4 py-2 active:bg-white/10"
          style={{
            borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            backgroundColor: isDark
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(0,0,0,0.05)',
          }}
          onPress={() => router.replace('/(drawer)/(tabs)')}
        >
          <Text
            className="font-medium text-xs uppercase tracking-wider"
            style={{
              color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(17,24,39,0.8)',
            }}
          >
            {t('landing.skip')}
          </Text>
        </Pressable>
      </View>

      <View className="flex-1 items-center justify-between px-6 py-12">
        {/* Header Section */}
        <View className="mt-20 items-center">
          <View className="mb-12 h-0.5 w-12 rounded-full bg-[#3D3E47]" />

          <Text
            className="mb-2 font-bold text-5xl"
            style={{ color: textColor }}
          >
            {t('landing.title')}
          </Text>
          <Text
            className="mb-12 font-medium text-lg"
            style={{ color: textSecondary }}
          >
            {t('landing.subtitle')}
          </Text>

          <Text
            className="px-8 text-center text-sm"
            style={{
              color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(17,24,39,0.4)',
            }}
          >
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
            <Text className="font-bold text-lg" style={{ color: '#000000' }}>
              {t('landing.connectWallet')}
            </Text>
          </Button>

          <View className="flex-row items-center gap-4 py-2">
            <View
              className="h-[1px] flex-1"
              style={{
                backgroundColor: isDark
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(0,0,0,0.1)',
              }}
            />
            <Text
              className="text-xs"
              style={{
                color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(17,24,39,0.4)',
              }}
            >
              {t('landing.or')}
            </Text>
            <View
              className="h-[1px] flex-1"
              style={{
                backgroundColor: isDark
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(0,0,0,0.1)',
              }}
            />
          </View>

          <Button
            onPress={() => setView('sign-in')}
            className="h-14 flex-row items-center justify-center gap-2 rounded-2xl border"
            style={{
              backgroundColor: isDark ? '#1A1B23' : '#FFFFFF',
              borderColor: isDark
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(0,0,0,0.05)',
            }}
          >
            <Ionicons
              name="mail-outline"
              size={20}
              color={isDark ? 'white' : 'black'}
            />
            <Text
              className="font-semibold text-lg"
              style={{ color: isDark ? 'white' : 'black' }}
            >
              {t('landing.continueEmail')}
            </Text>
          </Button>
        </View>

        {/* Footer */}
        <View className="flex-row items-center gap-2 opacity-40">
          <Ionicons
            name="lock-closed-outline"
            size={12}
            color={isDark ? 'white' : 'black'}
          />
          <Text
            className="font-semibold text-[10px] uppercase tracking-[2px]"
            style={{ color: isDark ? 'white' : 'black' }}
          >
            {t('landing.poweredBy')}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
