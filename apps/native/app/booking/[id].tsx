import { Ionicons } from '@expo/vector-icons'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { theme } from '../../src/core/theme'
import { BookingFlow } from '../../src/features/booking/components/booking-flow'
import { bookingStore, useBookings } from '../../src/features/booking/store'

export default function BookingDetailsScreen() {
  const { id } = useLocalSearchParams()
  const insets = useSafeAreaInsets()

  // Use the sync external store to get real-time mock data
  const bookings = useBookings()
  const booking = bookings.find((b) => b.id === id)

  const [isCopying, setIsCopying] = React.useState(false)
  const [showToast, setShowToast] = React.useState(false)
  const [isRescheduling, setIsRescheduling] = React.useState(false)

  if (!booking) return null

  const handleCopyLink = () => {
    if (booking.link) {
      setIsCopying(true)
      setTimeout(() => {
        setIsCopying(false)
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
      }, 1000)
    }
  }

  const handleCancel = () => {
    if (Platform.OS === 'web') {
      const isConfirmed = window.confirm(
        'Algunos cargos pueden ser cobrados según la política de cancelación del mentor. ¿Deseas proceder? (Ok para cancelar)',
      )
      if (isConfirmed) {
        bookingStore.cancelBooking(booking.id)
        router.back()
      }
    } else {
      Alert.alert(
        'Cancelar sesión',
        'Algunos cargos pueden ser cobrados según la política de cancelación del mentor. ¿Deseas proceder?',
        [
          { text: 'No', style: 'cancel' },
          {
            text: 'Sí, cancelar',
            style: 'destructive',
            onPress: () => {
              bookingStore.cancelBooking(booking.id)
              router.back()
            },
          },
        ],
      )
    }
  }

  const handleRescheduleSuccess = () => {
    bookingStore.rescheduleBooking(booking.id)
    setIsRescheduling(false)
  }

  return (
    <View className="flex-1 bg-[#F3F4F6] dark:bg-[#0F101A]">
      <Stack.Screen options={{ headerShown: false }} />

      {showToast && (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutUp}
          className="absolute z-50 w-full self-center px-6"
          style={{ top: insets.top + 20 }}
        >
          <View
            className="flex-row items-center gap-3 rounded-xl border border-black/10 bg-gray-100 p-4 shadow-lg dark:border-white/10 dark:bg-[#252836]"
            style={{ elevation: 10 }}
          >
            <View className="h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
              <Ionicons name="checkmark" size={16} color="#22c55e" />
            </View>
            <Text className="font-medium text-gray-900 text-sm dark:text-white">
              ¡Enlace copiado al portapapeles!
            </Text>
          </View>
        </Animated.View>
      )}

      <View
        className="flex-row items-center border-black/10 border-b px-6 py-4 dark:border-white/10"
        style={{ paddingTop: insets.top + 16 }}
      >
        <Pressable
          onPress={() => router.back()}
          className="-ml-2 p-2 active:opacity-70"
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color={theme.colors.iconAccent}
          />
        </Pressable>
        <Text className="mr-6 flex-1 text-center font-bold text-gray-900 text-lg dark:text-white">
          Detalles de la sesión
        </Text>
      </View>

      <ScrollView
        className="mb-6 flex-1 px-6 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-4 mb-8 items-center">
          <View className="mb-4 h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-[#342F70]">
            <Text className="font-bold text-2xl text-gray-900 dark:text-white">
              {booking.mentorInitials}
            </Text>
          </View>
          <Text className="font-bold text-2xl text-gray-900 dark:text-white">
            {booking.mentorName}
          </Text>
          <Text className="mt-2 px-4 text-center text-gray-500 text-sm leading-5 dark:text-[#8A8A93]">
            {booking.topic}
          </Text>
        </View>

        <View className="mb-6 gap-5 rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#161721]">
          <View className="flex-row items-center gap-4">
            <View className="h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">
              <Ionicons
                name="calendar-outline"
                size={20}
                color={theme.colors.iconAccent}
              />
            </View>
            <View>
              <Text className="font-semibold text-gray-500 text-xs uppercase tracking-wider dark:text-[#8A8A93]">
                Fecha
              </Text>
              <Text className="mt-0.5 font-medium text-gray-900 text-sm dark:text-white">
                {booking.date}
              </Text>
            </View>
          </View>

          <View className="ml-14 h-px bg-black/5 dark:bg-white/5" />

          <View className="flex-row items-center gap-4">
            <View className="h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">
              <Ionicons
                name="time-outline"
                size={20}
                color={theme.colors.iconAccent}
              />
            </View>
            <View>
              <Text className="font-semibold text-gray-500 text-xs uppercase tracking-wider dark:text-[#8A8A93]">
                Hora
              </Text>
              <Text className="mt-0.5 font-medium text-gray-900 text-sm dark:text-white">
                {booking.time}
              </Text>
            </View>
          </View>

          <View className="ml-14 h-px bg-black/5 dark:bg-white/5" />

          <View className="flex-row items-center gap-4">
            <View className="h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">
              <Ionicons
                name="videocam-outline"
                size={20}
                color={theme.colors.iconAccent}
              />
            </View>
            <View>
              <Text className="font-semibold text-gray-500 text-xs uppercase tracking-wider dark:text-[#8A8A93]">
                Plataforma
              </Text>
              <Text className="mt-0.5 font-medium text-gray-900 text-sm dark:text-white">
                {booking.platform}
              </Text>
            </View>
          </View>

          {booking.price && (
            <>
              <View className="ml-14 h-px bg-black/5 dark:bg-white/5" />
              <View className="flex-row items-center gap-4">
                <View className="h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">
                  <Ionicons
                    name="card-outline"
                    size={20}
                    color={theme.colors.iconAccent}
                  />
                </View>
                <View>
                  <Text className="font-semibold text-gray-500 text-xs uppercase tracking-wider dark:text-[#8A8A93]">
                    Total Pagado
                  </Text>
                  <Text className="mt-0.5 font-bold text-base text-primary">
                    {booking.price}
                  </Text>
                </View>
              </View>
            </>
          )}

          {booking.link && (
            <>
              <View className="ml-14 h-px bg-black/5 dark:bg-white/5" />
              <View className="flex-row items-center gap-4">
                <View className="h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">
                  <Ionicons
                    name="link-outline"
                    size={20}
                    color={theme.colors.iconAccent}
                  />
                </View>
                <View className="flex-1 pr-4">
                  <Text className="font-semibold text-gray-500 text-xs uppercase tracking-wider dark:text-[#8A8A93]">
                    Enlace de la reunión
                  </Text>
                  <Text
                    className="mt-0.5 text-gray-900/50 text-sm dark:text-white/50"
                    numberOfLines={1}
                  >
                    {booking.link}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Acciones */}
        <View className="gap-3 pb-10">
          {booking.status === 'upcoming' ? (
            <>
              <Pressable
                onPress={handleCopyLink}
                disabled={isCopying}
                className="mb-2 w-full flex-row items-center justify-center gap-2 rounded-xl bg-primary py-4 active:bg-primary/90"
              >
                {isCopying ? (
                  <>
                    <ActivityIndicator size="small" color="black" />
                    <Text className="text-center font-semibold text-base text-black">
                      Copiando...
                    </Text>
                  </>
                ) : (
                  <>
                    <Ionicons name="copy-outline" size={20} color="black" />
                    <Text className="text-center font-semibold text-base text-black">
                      Copiar link de reunión
                    </Text>
                  </>
                )}
              </Pressable>
              <View className="mt-2 flex-row gap-3">
                <Pressable
                  onPress={() => setIsRescheduling(true)}
                  className="flex-1 items-center justify-center rounded-xl border border-black/10 py-4 active:bg-black/5 dark:border-white/10 dark:bg-white/5"
                >
                  <Text className="font-semibold text-base text-gray-900 dark:text-white">
                    Reschedule
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleCancel}
                  className="flex-1 items-center justify-center rounded-xl border border-red-500/30 py-4 active:bg-red-500/10"
                >
                  <Text className="font-semibold text-base text-red-500">
                    Cancelar
                  </Text>
                </Pressable>
              </View>
            </>
          ) : (
            <>
              <Pressable className="mb-2 w-full flex-row items-center justify-center rounded-xl border border-black/5 bg-gray-100 py-4 active:bg-[#323644] dark:border-white/5 dark:bg-[#252836]">
                <Text className="text-center font-semibold text-base text-gray-900 dark:text-white">
                  Book again
                </Text>
              </Pressable>
              <Pressable className="w-full flex-row items-center justify-center rounded-xl bg-transparent py-4 active:bg-black/5 dark:bg-white/5">
                <Text className="text-center font-semibold text-base text-gray-500 dark:text-[#8A8A93]">
                  Dejar Review
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>

      {/* Reschedule Flow Modal isolated to this exact screen */}
      <Modal
        visible={isRescheduling}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setIsRescheduling(false)}
      >
        <View className="flex-1" style={{ paddingTop: insets.top }}>
          {/* We skip to step calendar as discussed */}
          <BookingFlow
            initialStep="calendar"
            initialServiceId="1"
            onClose={() => setIsRescheduling(false)}
            onRescheduleSuccess={handleRescheduleSuccess}
          />
        </View>
      </Modal>
    </View>
  )
}
