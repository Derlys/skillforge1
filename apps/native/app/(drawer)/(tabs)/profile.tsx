import { Ionicons } from '@expo/vector-icons'
import { Pressable, ScrollView, StatusBar, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAppTheme } from '../../../src/core/providers/app-theme-provider'
import { theme } from '../../../src/core/theme'
import { useI18n } from '../../../src/shared/i18n/use-i18n'

// Mock Data for Logged in User
const user = {
  name: 'Alex Dev',
  initials: 'AD',
  role: 'Web3 Developer',
  location: 'Mexico City, MX',
  stats: {
    sessionsBooked: 12,
    walletBalance: '4.5 SOL',
    reviewsLeft: 8,
  },
  bio: 'Frontend engineer transitioning into full-stack Solana development. Currently learning Rust and Anchor to build decentralized protocols. Always eager to connect with seasoned mentors!',
  interests: [
    { id: 'rust', label: 'Rust Basics', icon: 'code-slash-outline' },
    { id: 'solana', label: 'Solana Core', icon: 'cube-outline' },
    { id: 'defi', label: 'DeFi Architecture', icon: 'swap-horizontal-outline' },
    { id: 'ui', label: 'dApp UI/UX', icon: 'color-palette-outline' },
  ],
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets()
  const { t, currentLanguage, changeLanguage } = useI18n()
  const { currentTheme, setTheme } = useAppTheme()

  const isDark = currentTheme === 'dark'
  const bgMain = 'bg-[#F3F4F6] dark:bg-[#0F101A]'
  const bgCard = 'bg-white dark:bg-[#161721]'
  const bgCardSecondary = 'bg-gray-100 dark:bg-[#252836]'
  const textMain = 'text-gray-900 dark:text-white'
  const textSecondary = 'text-gray-500 dark:text-[#8A8A93]'
  const borderColor = 'border-black/10 dark:border-white/10'

  const handleLanguageChange = (lang: 'en' | 'es') => {
    changeLanguage(lang)
  }

  const handleThemeChange = (mode: 'light' | 'dark') => {
    setTheme(mode)
  }

  return (
    <View className={`flex-1 ${bgMain}`} style={{ paddingTop: insets.top }}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        translucent
      />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
        <Text className={`font-bold text-xl ${textMain}`}>
          {t('profile.myProfile')}
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
      >
        {/* Profile Header Background (Gradients/Glow) */}
        <View className="relative items-center overflow-hidden px-6 pt-10 pb-6">
          {/* Faux structural background shape (imitates radial gradient) */}
          <View className="absolute top-[-50px] h-[300px] w-[500px] rounded-[100%] bg-primary/5 opacity-50 blur-3xl" />

          <View
            className={`mb-4 h-24 w-24 items-center justify-center rounded-full border-2 ${isDark ? 'border-primary/40 bg-[#342F70]' : 'border-primary/20 bg-primary/10'}`}
            style={{
              shadowColor: theme.colors.primary,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 20,
              elevation: 10,
            }}
          >
            <Text
              className={`font-bold text-3xl ${isDark ? 'text-gray-900 dark:text-white' : 'text-primary'}`}
            >
              {user.initials}
            </Text>
          </View>

          <Text
            className={`mb-1 text-center font-bold text-2xl tracking-tight ${textMain}`}
          >
            {user.name}
          </Text>
          <Text className={`text-center text-sm ${textSecondary}`}>
            {user.role}
          </Text>

          {/* Location */}
          <View className="mt-2 flex-row items-center gap-1.5">
            <Ionicons
              name="location-outline"
              size={12}
              color={isDark ? '#8A8A93' : '#6B7280'}
            />
            <Text className={`text-sm ${textSecondary}`}>{user.location}</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View
          className={`mx-6 mb-6 rounded-xl border ${borderColor} ${bgCard} p-4`}
        >
          <View className="flex-row items-center justify-between">
            {/* Sessions */}
            <View className={`flex-1 items-center border-r ${borderColor}`}>
              <View className="mb-1 flex-row items-center gap-1">
                <Ionicons
                  name="calendar-outline"
                  size={14}
                  color={isDark ? theme.colors.iconAccent : '#6B7280'}
                />
                <Text className={`font-bold text-base ${textMain}`}>
                  {user.stats.sessionsBooked}
                </Text>
              </View>
              <Text
                className={`text-[11px] uppercase tracking-wide ${textSecondary}`}
              >
                {t('profile.sessions')}
              </Text>
            </View>

            {/* Wallet Balance */}
            <View className={`flex-1 items-center border-r ${borderColor}`}>
              <View className="mb-1 flex-row items-center gap-1">
                <Ionicons
                  name="wallet-outline"
                  size={14}
                  color={isDark ? theme.colors.iconAccent : '#6B7280'}
                />
                <Text className={`font-bold text-base ${textMain}`}>
                  {user.stats.walletBalance}
                </Text>
              </View>
              <Text
                className={`text-[11px] uppercase tracking-wide ${textSecondary}`}
              >
                {t('profile.balance')}
              </Text>
            </View>

            {/* Reviews */}
            <View className="flex-1 items-center">
              <View className="mb-1 flex-row items-center gap-1">
                <Ionicons
                  name="star-outline"
                  size={14}
                  color={isDark ? theme.colors.iconAccent : '#6B7280'}
                />
                <Text className={`font-bold text-base ${textMain}`}>
                  {user.stats.reviewsLeft}
                </Text>
              </View>
              <Text
                className={`text-[11px] uppercase tracking-wide ${textSecondary}`}
              >
                {t('profile.reviews')}
              </Text>
            </View>
          </View>
        </View>

        {/* Content Sections */}
        <View className="flex-col gap-8 px-6">
          {/* Bio Section */}
          <View className="gap-2.5">
            <Text
              className={`font-semibold text-xs uppercase tracking-wider ${textMain}`}
            >
              {t('profile.aboutMe')}
            </Text>
            <Text className={`text-sm leading-6 ${textSecondary}`}>
              {user.bio}
            </Text>
          </View>

          {/* Interests Section */}
          <View className="gap-3">
            <Text
              className={`font-semibold text-xs uppercase tracking-wider ${textMain}`}
            >
              {t('profile.learningInterests')}
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {user.interests.map((interest) => (
                <View
                  key={interest.id}
                  className={`flex-row items-center gap-2 rounded-full border ${borderColor} ${bgCard} px-4 py-2.5`}
                >
                  <Ionicons
                    name={interest.icon as keyof typeof Ionicons.glyphMap}
                    size={14}
                    color={isDark ? theme.colors.iconAccent : '#6B7280'}
                  />
                  <Text
                    className={`font-medium text-xs ${isDark ? 'text-gray-900/80 dark:text-white/80' : 'text-gray-700'}`}
                  >
                    {interest.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Preferences */}
          <View className="mt-4 gap-3">
            <Text
              className={`font-semibold text-xs uppercase tracking-wider ${textMain}`}
            >
              {t('profile.preferences')}
            </Text>

            <View
              className={`rounded-xl border ${borderColor} ${bgCard} gap-4 p-4`}
            >
              {/* Language */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View
                    className={`h-8 w-8 items-center justify-center rounded-lg ${isDark ? 'bg-black/5 dark:bg-white/5' : 'bg-gray-100'}`}
                  >
                    <Ionicons
                      name="language-outline"
                      size={16}
                      color={isDark ? theme.colors.iconAccent : '#6B7280'}
                    />
                  </View>
                  <Text className={`font-medium text-sm ${textMain}`}>
                    {t('profile.language')}
                  </Text>
                </View>

                <View
                  className={`flex-row items-center ${bgCardSecondary} rounded-xl border ${borderColor} p-1`}
                >
                  <Pressable
                    onPress={() => handleLanguageChange('en')}
                    className={`rounded-lg px-4 py-1.5 transition-colors ${currentLanguage.startsWith('en') ? (isDark ? 'bg-[#3E4150]' : 'bg-white shadow-sm') : ''}`}
                  >
                    <Text
                      className={`font-semibold text-xs ${currentLanguage.startsWith('en') ? textMain : textSecondary}`}
                    >
                      EN
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleLanguageChange('es')}
                    className={`rounded-lg px-4 py-1.5 transition-colors ${currentLanguage.startsWith('es') ? (isDark ? 'bg-[#3E4150]' : 'bg-white shadow-sm') : ''}`}
                  >
                    <Text
                      className={`font-semibold text-xs ${currentLanguage.startsWith('es') ? textMain : textSecondary}`}
                    >
                      ES
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View className={`h-px ${borderColor} border-t`} />

              {/* Theme */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View
                    className={`h-8 w-8 items-center justify-center rounded-lg ${isDark ? 'bg-black/5 dark:bg-white/5' : 'bg-gray-100'}`}
                  >
                    <Ionicons
                      name={isDark ? 'moon-outline' : 'sunny-outline'}
                      size={16}
                      color={isDark ? theme.colors.iconAccent : '#6B7280'}
                    />
                  </View>
                  <Text className={`font-medium text-sm ${textMain}`}>
                    {t('profile.theme')}
                  </Text>
                </View>

                <View
                  className={`flex-row items-center ${bgCardSecondary} rounded-xl border ${borderColor} p-1`}
                >
                  <Pressable
                    onPress={() => handleThemeChange('light')}
                    className={`flex-row items-center gap-1.5 rounded-lg px-3 py-1.5 transition-colors ${!isDark ? 'bg-white shadow-sm' : ''}`}
                  >
                    {!isDark && (
                      <Ionicons name="sunny" size={12} color="#000" />
                    )}
                    <Text
                      className={`font-semibold text-xs ${!isDark ? textMain : textSecondary}`}
                    >
                      Light
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleThemeChange('dark')}
                    className={`flex-row items-center gap-1.5 rounded-lg px-3 py-1.5 transition-colors ${isDark ? 'bg-[#3E4150]' : ''}`}
                  >
                    {isDark && <Ionicons name="moon" size={12} color="#fff" />}
                    <Text
                      className={`font-semibold text-xs ${isDark ? textMain : textSecondary}`}
                    >
                      Dark
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

          {/* Actions / Menu */}
          <View className="mt-4 gap-3">
            <Text
              className={`font-semibold text-xs uppercase tracking-wider ${textMain}`}
            >
              {t('profile.account')}
            </Text>
            <View
              className={`rounded-xl border ${borderColor} ${bgCard} overflow-hidden`}
            >
              <Pressable
                className={`flex-row items-center justify-between border-b p-4 active:bg-gray-500/10 ${borderColor}`}
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className={`h-8 w-8 items-center justify-center rounded-lg ${isDark ? 'bg-black/5 dark:bg-white/5' : 'bg-gray-100'}`}
                  >
                    <Ionicons
                      name="person-outline"
                      size={16}
                      color={isDark ? theme.colors.iconAccent : '#6B7280'}
                    />
                  </View>
                  <Text className={`font-medium text-sm ${textMain}`}>
                    {t('profile.editProfile')}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#8A8A93" />
              </Pressable>

              <Pressable
                className={`flex-row items-center justify-between border-b p-4 active:bg-gray-500/10 ${borderColor}`}
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className={`h-8 w-8 items-center justify-center rounded-lg ${isDark ? 'bg-black/5 dark:bg-white/5' : 'bg-gray-100'}`}
                  >
                    <Ionicons
                      name="card-outline"
                      size={16}
                      color={isDark ? theme.colors.iconAccent : '#6B7280'}
                    />
                  </View>
                  <Text className={`font-medium text-sm ${textMain}`}>
                    {t('profile.paymentMethods')}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#8A8A93" />
              </Pressable>

              <Pressable className="flex-row items-center justify-between p-4 active:bg-red-500/10">
                <View className="flex-row items-center gap-3">
                  <View className="h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                    <Ionicons
                      name="log-out-outline"
                      size={16}
                      color="#ef4444"
                    />
                  </View>
                  <Text className="font-medium text-red-500 text-sm">
                    {t('profile.signOut')}
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
