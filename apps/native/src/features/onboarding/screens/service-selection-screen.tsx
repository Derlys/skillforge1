import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, SafeAreaView, StatusBar, Text, View } from 'react-native'

import { useI18n } from '@/src/shared/i18n/use-i18n'

interface SelectionCardProps {
  title: string
  description: string
  icon: keyof typeof Ionicons.glyphMap
  iconColor: string
  onPress: () => void
}

function SelectionCard({
  title,
  description,
  icon,
  iconColor,
  onPress,
}: SelectionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full flex-row items-center gap-6 rounded-3xl border border-white/5 bg-[#161721] p-6 active:bg-[#1C1D29]"
    >
      <View className="h-14 w-14 items-center justify-center rounded-2xl bg-[#252631]">
        <Ionicons name={icon} size={28} color={iconColor} />
      </View>

      <View className="flex-1 gap-1">
        <Text className="font-bold text-white text-xl">{title}</Text>
        <Text className="text-sm text-white/40 leading-5">{description}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color="rgba(255,255,255,0.2)"
      />
    </Pressable>
  )
}

export function ServiceSelectionScreen({ onBack }: { onBack?: () => void }) {
  const { t } = useI18n()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.replace('/onboarding')
    }
  }

  const handleRoleSelect = (role: 'expert' | 'mentor') => {
    // TODO: persist role selection (e.g. to AsyncStorage or auth state)
    console.log(`Role selected: ${role}`)
    // Navigate into the main tabs (already here, but go to search or stay)
    router.replace('/(drawer)/(tabs)/search')
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0B0C14]">
      <StatusBar barStyle="light-content" />

      {/* Back button */}
      <View className="flex-row px-6 pt-4">
        <Pressable
          className="h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 active:bg-white/10"
          onPress={handleBack}
        >
          <Ionicons name="arrow-back" size={20} color="white" />
        </Pressable>
      </View>

      <View className="flex-1 px-6 pt-8">
        {/* Header */}
        <View className="mb-12 items-center">
          <Text className="mb-3 font-bold text-3xl text-white">
            {t('auth.onboarding.title')}
          </Text>
          <Text className="text-lg text-white/60">
            {t('auth.onboarding.subtitle')}
          </Text>
        </View>

        {/* Selection Cards */}
        <View className="gap-4">
          <SelectionCard
            title={t('auth.onboarding.findExpert.title')}
            description={t('auth.onboarding.findExpert.description')}
            icon="search-outline"
            iconColor="#FFD700"
            onPress={() => handleRoleSelect('expert')}
          />

          <SelectionCard
            title={t('auth.onboarding.becomeMentor.title')}
            description={t('auth.onboarding.becomeMentor.description')}
            icon="ribbon-outline"
            iconColor="#FFD700"
            onPress={() => handleRoleSelect('mentor')}
          />
        </View>

        {/* Footer info */}
        <View className="flex-1 justify-end pb-12">
          <Text className="px-12 text-center text-white/30 text-xs leading-5">
            {t('auth.onboarding.footer')}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
