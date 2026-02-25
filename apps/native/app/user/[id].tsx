import { Ionicons } from '@expo/vector-icons'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native'

const SERVICES = [
  { id: '1', title: 'Smart Contract Audit', price: '4.5 SOL' },
  { id: '2', title: 'Architecture Review', price: '3.0 SOL' },
  { id: '3', title: 'Code Review (1hr)', price: '2.5 SOL' },
  { id: '4', title: 'Consultation Call', price: '1.5 SOL' },
]

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams()
  // Mock data based on id, but for now we'll just show Elena's profile
  // from the design

  return (
    <SafeAreaView className="flex-1 bg-[#0F101A]">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />

      {/* Header with back button */}
      <View className="z-10 px-6 pt-4 pb-2">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-start justify-center"
        >
          <Ionicons name="chevron-back" size={28} color="#8A8A93" />
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View className="items-center px-6 pt-2 pb-6">
          <View className="mb-6 h-32 w-32 items-center justify-center rounded-full bg-[#342F70]">
            <Text className="font-bold text-5xl text-white">EV</Text>
          </View>
          <Text className="mb-2 font-bold text-3xl text-white">
            Elena Vasquez
          </Text>
          <Text className="text-[#8A8A93] text-base">
            Solana Core Contributor • 8 years
          </Text>
        </View>

        {/* Divider */}
        <View className="mx-6 mb-8 h-[1px] bg-white/5" />

        {/* Services Section */}
        <View className="mb-10 px-6">
          <Text className="mb-4 font-bold text-[#8A8A93] text-xs uppercase tracking-wider">
            Services
          </Text>
          <View className="gap-3">
            {SERVICES.map((service) => (
              <Pressable
                key={service.id}
                className="flex-row items-center justify-between rounded-2xl border border-white/5 bg-[#161721] p-5"
              >
                <Text className="font-medium text-base text-white">
                  {service.title}
                </Text>
                <Text className="font-bold text-[#FFD700] text-base">
                  {service.price}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Social Icons */}
        <View className="flex-row justify-center gap-4 pb-32">
          <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-white/5 active:bg-white/10">
            <Ionicons name="logo-github" size={20} color="white" />
          </Pressable>
          <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-white/5 active:bg-white/10">
            <Ionicons name="logo-twitter" size={20} color="white" />
          </Pressable>
          <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-white/5 active:bg-white/10">
            <Ionicons name="globe-outline" size={20} color="white" />
          </Pressable>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View className="absolute right-0 bottom-0 left-0 bg-[#0F101A]/90 p-6 pt-4">
        <Pressable className="h-11 items-center justify-center rounded-lg bg-[#FFD700] shadow-sm active:bg-[#CCA900]">
          <Text className="font-semibold text-base text-black">
            Book Session
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
