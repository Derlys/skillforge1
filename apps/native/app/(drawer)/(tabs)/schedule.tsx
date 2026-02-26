import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { theme } from '../../../src/core/theme'
import { useBookings } from '../../../src/features/booking/store'

type Tab = 'upcoming' | 'completed'

export default function BookingsScreen() {
  const insets = useSafeAreaInsets()
  const [activeTab, setActiveTab] = useState<Tab>('upcoming')
  const allBookings = useBookings()

  const bookings = allBookings.filter((b) =>
    activeTab === 'upcoming'
      ? b.status === 'upcoming'
      : b.status === 'completed' || b.status === 'cancelled',
  )

  return (
    <View
      className="flex-1 bg-[#F3F4F6] dark:bg-[#0F101A]"
      style={{ paddingTop: insets.top }}
    >
      {/* Header */}
      <View className="px-6 py-4">
        <Text className="font-bold text-3xl text-gray-900 tracking-tight dark:text-white">
          Mis Sesiones
        </Text>
      </View>

      {/* Tabs / Segmented Control */}
      <View className="mb-6 px-6">
        <View className="flex-row rounded-xl border border-black/5 bg-white p-1 shadow-sm dark:border-white/5 dark:bg-[#161721]">
          <Pressable
            onPress={() => setActiveTab('upcoming')}
            className={`flex-1 items-center justify-center rounded-lg py-2.5 transition-colors ${
              activeTab === 'upcoming'
                ? 'bg-gray-100 dark:bg-[#252836]'
                : 'bg-transparent'
            }`}
          >
            <Text
              className={`font-semibold text-sm ${
                activeTab === 'upcoming'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-[#8A8A93]'
              }`}
            >
              Próximas
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('completed')}
            className={`flex-1 items-center justify-center rounded-lg py-2.5 transition-colors ${
              activeTab === 'completed'
                ? 'bg-gray-100 dark:bg-[#252836]'
                : 'bg-transparent'
            }`}
          >
            <Text
              className={`font-semibold text-sm ${
                activeTab === 'completed'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-[#8A8A93]'
              }`}
            >
              Completadas
            </Text>
          </Pressable>
        </View>
      </View>

      {/* List */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: insets.bottom + 80,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {bookings.length === 0 ? (
          <View className="items-center justify-center gap-4 pt-24">
            <Ionicons
              name="calendar-outline"
              size={64}
              color="rgba(255,255,255,0.05)"
            />
            <Text className="px-8 text-center text-gray-900/40 text-sm dark:text-white/40">
              No tienes sesiones{' '}
              {activeTab === 'upcoming' ? 'próximas' : 'completadas'}.
            </Text>
          </View>
        ) : (
          bookings.map((booking) => (
            <View
              key={booking.id}
              className="overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-[#161721]"
            >
              {/* Card Header */}
              <View className="flex-row items-center gap-3 border-black/5 border-b p-4 dark:border-white/5">
                <View className="h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-[#342F70]">
                  <Text className="font-bold text-gray-900 text-sm dark:text-white">
                    {booking.mentorInitials}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-base text-gray-900 dark:text-white">
                    {booking.mentorName}
                  </Text>
                  <Text
                    className="mt-0.5 text-gray-500 text-xs dark:text-[#8A8A93]"
                    numberOfLines={1}
                  >
                    {booking.topic}
                  </Text>
                </View>
                {booking.status === 'upcoming' && (
                  <View className="rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1">
                    <Text className="font-bold text-[10px] text-primary uppercase tracking-widest">
                      Activa
                    </Text>
                  </View>
                )}
                {booking.status === 'cancelled' && (
                  <View className="rounded-md border border-red-500/20 bg-red-500/10 px-2.5 py-1">
                    <Text className="font-bold text-[10px] text-red-500 uppercase tracking-widest">
                      Cancelada
                    </Text>
                  </View>
                )}
              </View>

              {/* Details & Actions */}
              <View className="gap-4 bg-[#F3F4F6]/30 p-4 dark:bg-[#0F101A]/30">
                {/* Info Row */}
                <View className="flex-row items-center gap-6">
                  <View className="flex-1 flex-row items-center gap-2">
                    <Ionicons
                      name="calendar-clear-outline"
                      size={16}
                      color={theme.colors.iconAccent}
                    />
                    <View>
                      <Text className="font-medium text-gray-900 text-sm dark:text-white">
                        {booking.date}
                      </Text>
                      <Text className="mt-0.5 text-[11px] text-gray-500 dark:text-[#8A8A93]">
                        {booking.time}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-1 flex-row items-center gap-2">
                    <Ionicons
                      name="videocam-outline"
                      size={16}
                      color={theme.colors.iconAccent}
                    />
                    <View>
                      <Text className="font-medium text-gray-900 text-sm dark:text-white">
                        {booking.platform}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Buttons directly matched to aesthetic */}
                <View className="pt-2">
                  <Pressable
                    onPress={() =>
                      router.push({
                        pathname: '/booking/[id]',
                        params: { id: booking.id },
                      })
                    }
                    className="w-full flex-row items-center justify-center gap-2 rounded-lg border border-black/5 bg-gray-100 py-3 active:bg-[#323644] dark:border-white/5 dark:bg-[#252836]"
                  >
                    <Text className="font-semibold text-gray-900 text-sm dark:text-white">
                      Ver Detalles
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color={theme.colors.iconAccent}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}
