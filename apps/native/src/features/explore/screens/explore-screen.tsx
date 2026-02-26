import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAppTheme } from '@/src/core/providers/app-theme-provider'

const CATEGORIES = ['Development', 'Design', 'Strategy', 'Marketing', 'Legal']

const EXPERTS = [
  {
    id: '1',
    initials: 'EV',
    name: 'Elena Vasquez',
    role: 'Smart Contract Development',
    rate: 'from 2.5 SOL/hr',
    color: '#342F70', // Purple
  },
  {
    id: '2',
    initials: 'MC',
    name: 'Marcus Chen',
    role: 'Product Design',
    rate: 'from 1.8 SOL/hr',
    color: '#0A4A32', // Green
  },
  {
    id: '3',
    initials: 'SA',
    name: 'Sofia Andersson',
    role: 'Tokenomics Strategy',
    rate: 'from 3.2 SOL/hr',
    color: '#821D34', // Red
  },
]

export function ExploreScreen() {
  const [activeCategory, setActiveCategory] = useState('Development')
  const insets = useSafeAreaInsets()
  const { isDark } = useAppTheme()

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        translucent
      />

      {/* Header */}
      <View className="px-6 pt-6 pb-4">
        <Text className="font-bold text-3xl text-gray-900 dark:text-white">
          Experts
        </Text>
      </View>

      {/* Search Bar */}
      <View className="mb-6 px-6">
        <View className="flex-row items-center rounded-2xl border border-border/10 bg-card px-4 py-3.5">
          <Ionicons
            name="search"
            size={20}
            color={isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}
          />
          <TextInput
            placeholder="Search experts..."
            placeholderTextColor={
              isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'
            }
            className="ml-3 flex-1 text-base text-foreground"
          />
        </View>
      </View>

      {/* Categories */}
      <View className="mb-6">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
        >
          {CATEGORIES.map((category) => {
            const isActive = category === activeCategory
            return (
              <Pressable
                key={category}
                onPress={() => setActiveCategory(category)}
                className={`rounded-full border px-5 py-2 ${
                  isActive
                    ? 'border-primary/20 bg-primary/10'
                    : 'border-border/5 bg-card'
                }`}
              >
                <Text
                  className={`font-medium text-sm ${
                    isActive ? 'text-primary' : 'text-muted'
                  }`}
                >
                  {category}
                </Text>
              </Pressable>
            )
          })}
        </ScrollView>
      </View>

      {/* Experts List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 24,
          gap: 16,
        }}
      >
        {EXPERTS.map((expert) => (
          <Pressable
            key={expert.id}
            onPress={() => router.push(`/user/${expert.id}`)}
            className="flex-row items-center rounded-3xl border border-border/5 bg-card p-5 active:bg-surface"
          >
            {/* Avatar */}
            <View
              className="mr-4 h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: expert.color }}
            >
              <Text className="font-bold text-lg text-white">
                {expert.initials}
              </Text>
            </View>

            {/* Info */}
            <View className="flex-1 justify-center">
              <Text className="mb-0.5 font-bold text-foreground text-lg">
                {expert.name}
              </Text>
              <Text className="mb-1 text-muted text-sm">{expert.role}</Text>
              <Text className="font-semibold text-primary text-xs">
                {expert.rate}
              </Text>
            </View>

            {/* Chevron */}
            <Ionicons
              name="chevron-forward"
              size={20}
              color={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}
