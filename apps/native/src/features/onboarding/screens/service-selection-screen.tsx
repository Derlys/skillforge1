import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Pressable, SafeAreaView, StatusBar, Text, View } from 'react-native'
import { useAppTheme } from '@/src/core/providers/app-theme-provider'
import { useI18n } from '@/src/shared/i18n/use-i18n'

interface SelectionCardProps {
  title: string
  description: string
  icon: keyof typeof Ionicons.glyphMap
  iconColor: string
  onPress: () => void
  isDark: boolean
}

function SelectionCard({
  title,
  description,
  icon,
  iconColor,
  onPress,
  isDark,
}: SelectionCardProps) {
  const cardBg = isDark ? '#161721' : '#FFFFFF'
  const textColor = isDark ? '#FFFFFF' : '#111827'
  const textSecondary = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(17,24,39,0.4)'

  return (
    <Pressable
      onPress={onPress}
      className="w-full flex-row items-center gap-6 rounded-3xl border border-black/5 p-6 active:bg-[#1C1D29]"
      style={{
        backgroundColor: cardBg,
        borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      }}
    >
      <View className="h-14 w-14 items-center justify-center rounded-2xl bg-[#252631]">
        <Ionicons name={icon} size={28} color={iconColor} />
      </View>

      <View className="flex-1 gap-1">
        <Text className="font-bold text-xl" style={{ color: textColor }}>
          {title}
        </Text>
        <Text className="text-sm leading-5" style={{ color: textSecondary }}>
          {description}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
      />
    </Pressable>
  )
}

export function ServiceSelectionScreen({ onBack }: { onBack?: () => void }) {
  const { t } = useI18n()
  const { isDark } = useAppTheme()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.replace('/onboarding')
    }
  }

  const handleRoleSelect = (role: 'expert' | 'mentor') => {
    console.log(`Role selected: ${role}`)
    router.replace('/(drawer)/(tabs)/search')
  }

  const bgColor = isDark ? '#0B0C14' : '#F3F4F6'
  const textColor = isDark ? '#FFFFFF' : '#111827'
  const textSecondary = isDark ? 'rgba(255,255,255,0.6)' : '#6B7280'

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: bgColor }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Back button */}
      <View className="flex-row px-6 pt-4">
        <Pressable
          className="h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-black/5 active:bg-white/10 dark:border-white/5 dark:bg-white/5"
          onPress={handleBack}
        >
          <Ionicons name="arrow-back" size={20} color="white" />
        </Pressable>
      </View>

      <View className="flex-1 px-6 pt-8">
        {/* Header */}
        <View className="mb-12 items-center">
          <Text
            className="mb-3 font-bold text-3xl"
            style={{ color: textColor }}
          >
            {t('auth.onboarding.title')}
          </Text>
          <Text className="text-lg" style={{ color: textSecondary }}>
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
            isDark={isDark}
          />

          <SelectionCard
            title={t('auth.onboarding.becomeMentor.title')}
            description={t('auth.onboarding.becomeMentor.description')}
            icon="ribbon-outline"
            iconColor="#FFD700"
            onPress={() => handleRoleSelect('mentor')}
            isDark={isDark}
          />
        </View>

        {/* Footer info */}
        <View className="flex-1 justify-end pb-12">
          <Text
            className="px-12 text-center text-xs leading-5"
            style={{
              color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(17,24,39,0.5)',
            }}
          >
            {t('auth.onboarding.footer')}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
