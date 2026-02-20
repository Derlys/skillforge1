import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native'

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

  return (
    <SafeAreaView className="flex-1 bg-[#0B0C14]">
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View className="px-6 pt-6 pb-4">
        <Text className="mb-1 font-bold text-[#FFD700] text-sm tracking-wide">
          SkillForge
        </Text>
        <Text className="font-bold text-3xl text-white">Experts</Text>
      </View>

      {/* Search Bar */}
      <View className="mb-6 px-6">
        <View className="flex-row items-center rounded-2xl border border-white/5 bg-[#1C1D29] px-4 py-3.5">
          <Ionicons name="search" size={20} color="rgba(255,255,255,0.4)" />
          <TextInput
            placeholder="Search experts..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            className="ml-3 flex-1 text-base text-white"
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
                    ? 'border-[#FFD700]/20 bg-[#FFD700]/10'
                    : 'border-white/5 bg-[#1C1D29]'
                }`}
              >
                <Text
                  className={`font-medium text-sm ${
                    isActive ? 'text-[#FFD700]' : 'text-white/60'
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
            className="flex-row items-center rounded-3xl border border-white/5 bg-[#1C1D29] p-5 active:bg-[#252631]"
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
              <Text className="mb-0.5 font-bold text-lg text-white">
                {expert.name}
              </Text>
              <Text className="mb-1 text-sm text-white/40">{expert.role}</Text>
              <Text className="font-semibold text-[#FFD700] text-xs">
                {expert.rate}
              </Text>
            </View>

            {/* Chevron */}
            <Ionicons
              name="chevron-forward"
              size={20}
              color="rgba(255,255,255,0.2)"
            />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
