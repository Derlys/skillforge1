import { Ionicons } from '@expo/vector-icons'
import { router, Stack } from 'expo-router'
import { useState } from 'react'
import {
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { theme } from '../../src/core/theme'
import { BookingFlow } from '../../src/features/booking/components/booking-flow'

// Mock Data
const mentor = {
  name: 'Elena Vasquez',
  initials: 'EV',
  role: 'Solana Core Contributor',
  experience: '8 years',
  location: 'Bogota, Colombia',
  rating: 4.9,
  totalSessions: 234,
  totalReviews: 89,
  bio: 'Ingeniera de software apasionada por blockchain y sistemas distribuidos. He contribuido al ecosistema Solana durante los ultimos 3 anos y lidero equipos de desarrollo en proyectos DeFi. Me encanta ayudar a otros devs a crecer en su carrera tech.',
  social: {
    github: 'https://github.com/elenavasquez',
    twitter: 'https://twitter.com/elenavasquez',
    website: 'https://elenavasquez.dev',
  },
}

const skills = [
  { id: 'code-review', label: 'Code Review', icon: 'code-slash-outline' },
  { id: 'career', label: 'Carrera Tech', icon: 'briefcase-outline' },
  { id: 'project', label: 'Proyecto Personal', icon: 'bulb-outline' },
  { id: 'startup', label: 'Startup / Producto', icon: 'rocket-outline' },
  { id: 'learning', label: 'Plan de Estudio', icon: 'school-outline' },
  { id: 'general', label: 'Charla General', icon: 'chatbubbles-outline' },
]

const sessionDurations = [
  { minutes: 30, label: '30 min' },
  { minutes: 45, label: '45 min' },
  { minutes: 60, label: '60 min' },
]

const sessionPlatforms = [
  { id: 'meet', label: 'Google Meet', icon: 'videocam-outline' },
  { id: 'zoom', label: 'Zoom', icon: 'videocam-outline' },
]

const sessionAvailability = [
  { id: 'lun', label: 'Lun' },
  { id: 'mar', label: 'Mar' },
  { id: 'mie', label: 'Mie' },
  { id: 'jue', label: 'Jue' },
  { id: 'vie', label: 'Vie' },
]

const reviews = [
  {
    name: 'Carlos M.',
    text: 'Excelente mentora. Me ayudo a estructurar mi proyecto y a entender mejor Solana.',
    rating: 5,
  },
  {
    name: 'Sofia R.',
    text: 'La sesion de code review fue increible. Muy detallada y con consejos practicos.',
    rating: 5,
  },
]

export default function UserProfileScreen() {
  const insets = useSafeAreaInsets()
  const [showBookingModal, setShowBookingModal] = useState(false)

  const openUrl = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err))
  }

  return (
    <View className="flex-1 bg-[#F3F4F6] dark:bg-[#0F101A]">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" translucent />

      {/* Header with back button */}
      <View
        className="absolute z-10 w-full flex-row items-center px-6 pb-2"
        style={{ paddingTop: insets.top + 16 }}
      >
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center p-2 active:opacity-70"
        >
          <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
      >
        {/* Profile Header Background (Gradients/Glow) */}
        <View className="relative items-center overflow-hidden px-6 pt-24 pb-6">
          {/* Faux structural background shape (imitates radial gradient) */}
          <View className="absolute top-[-50px] h-[300px] w-[500px] rounded-[100%] bg-primary/5 opacity-50 blur-3xl" />

          <View
            className="mb-4 h-24 w-24 items-center justify-center rounded-full border-2 border-primary/40 bg-[#342F70]"
            style={{
              shadowColor: theme.colors.primary,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 20,
              elevation: 10,
            }}
          >
            <Text className="font-bold text-3xl text-gray-900 dark:text-white">
              {mentor.initials}
            </Text>
          </View>

          <Text className="mb-1 text-center font-bold text-2xl text-gray-900 tracking-tight dark:text-white">
            {mentor.name}
          </Text>
          <Text className="text-center text-gray-500 text-sm dark:text-[#8A8A93]">
            {mentor.role} · {mentor.experience}
          </Text>

          {/* Location */}
          <View className="mt-2 flex-row items-center gap-1.5">
            <Ionicons name="location-outline" size={12} color="#8A8A93" />
            <Text className="text-gray-500 text-sm dark:text-[#8A8A93]">
              {mentor.location}
            </Text>
          </View>

          {/* Social Icons */}
          <View className="mt-4 flex-row justify-center gap-3">
            <Pressable
              onPress={() => openUrl(mentor.social.github)}
              className="h-10 w-10 items-center justify-center rounded-full bg-white active:bg-gray-100 dark:bg-[#161721] dark:bg-[#252836]"
            >
              <Ionicons name="logo-github" size={18} color="#FFFFFF" />
            </Pressable>
            <Pressable
              onPress={() => openUrl(mentor.social.twitter)}
              className="h-10 w-10 items-center justify-center rounded-full bg-white active:bg-gray-100 dark:bg-[#161721] dark:bg-[#252836]"
            >
              <Ionicons name="logo-twitter" size={18} color="#FFFFFF" />
            </Pressable>
            <Pressable
              onPress={() => openUrl(mentor.social.website)}
              className="h-10 w-10 items-center justify-center rounded-full bg-white active:bg-gray-100 dark:bg-[#161721] dark:bg-[#252836]"
            >
              <Ionicons name="globe-outline" size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        {/* Stats Row */}
        <View className="mx-6 mb-6 rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-[#161721]">
          <View className="flex-row items-center justify-between">
            {/* Rating */}
            <View className="flex-1 items-center border-black/10 border-r dark:border-white/10">
              <View className="mb-1 flex-row items-center gap-1">
                <Ionicons
                  name="star-outline"
                  size={14}
                  color={theme.colors.iconAccent}
                />
                <Text className="font-bold text-base text-gray-900 dark:text-white">
                  {mentor.rating}
                </Text>
              </View>
              <Text className="text-[11px] text-gray-500 uppercase tracking-wide dark:text-[#8A8A93]">
                Rating
              </Text>
            </View>

            {/* Total Sessions */}
            <View className="flex-1 items-center border-black/10 border-r dark:border-white/10">
              <View className="mb-1 flex-row items-center gap-1">
                <Ionicons
                  name="people-outline"
                  size={14}
                  color={theme.colors.iconAccent}
                />
                <Text className="font-bold text-base text-gray-900 dark:text-white">
                  {mentor.totalSessions}
                </Text>
              </View>
              <Text className="text-[11px] text-gray-500 uppercase tracking-wide dark:text-[#8A8A93]">
                Sessions
              </Text>
            </View>

            {/* Total Reviews */}
            <View className="flex-1 items-center">
              <View className="mb-1 flex-row items-center gap-1">
                <Ionicons
                  name="chatbubbles-outline"
                  size={14}
                  color={theme.colors.iconAccent}
                />
                <Text className="font-bold text-base text-gray-900 dark:text-white">
                  {mentor.totalReviews}
                </Text>
              </View>
              <Text className="text-[11px] text-gray-500 uppercase tracking-wide dark:text-[#8A8A93]">
                Reviews
              </Text>
            </View>
          </View>
        </View>

        {/* Content Sections */}
        <View className="flex-col gap-8 px-6">
          {/* Bio Section */}
          <View className="gap-2.5">
            <Text className="font-semibold text-gray-900 text-xs uppercase tracking-wider dark:text-white">
              Sobre mi
            </Text>
            <Text className="text-gray-500 text-sm leading-6 dark:text-[#8A8A93]">
              {mentor.bio}
            </Text>
          </View>

          {/* Topics Section */}
          <View className="gap-3">
            <Text className="font-semibold text-gray-900 text-xs uppercase tracking-wider dark:text-white">
              Temas de mentoria
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {skills.map((skill) => (
                <View
                  key={skill.id}
                  className="flex-row items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 dark:border-white/10 dark:bg-[#161721]"
                >
                  <Ionicons
                    name={skill.icon as keyof typeof Ionicons.glyphMap}
                    size={14}
                    color={theme.colors.iconAccent}
                  />
                  <Text className="font-medium text-gray-900/80 text-xs dark:text-white/80">
                    {skill.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Session Details Layout */}
          <View className="gap-3">
            <Text className="font-semibold text-gray-900 text-xs uppercase tracking-wider dark:text-white">
              Detalles de la sesion
            </Text>
            <View className="gap-5 rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#161721]">
              {/* Duration */}
              <View className="gap-2.5">
                <View className="flex-row items-center gap-2">
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color={theme.colors.iconAccent}
                  />
                  <Text className="font-medium text-[10px] text-gray-500 uppercase tracking-widest dark:text-[#8A8A93]">
                    Duracion
                  </Text>
                </View>
                <View className="flex-row flex-wrap gap-2">
                  {sessionDurations.map((d) => (
                    <View
                      key={d.minutes}
                      className="min-w-[72px] items-center justify-center rounded-lg border border-black/10 bg-gray-100 px-4 py-2 dark:border-white/10 dark:bg-[#252836]"
                    >
                      <Text className="font-semibold text-gray-900 text-sm dark:text-white">
                        {d.label}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              <View className="h-px bg-black/5 dark:bg-white/5" />

              {/* Platform */}
              <View className="gap-2.5">
                <View className="flex-row items-center gap-2">
                  <Ionicons
                    name="videocam-outline"
                    size={14}
                    color={theme.colors.iconAccent}
                  />
                  <Text className="font-medium text-[10px] text-gray-500 uppercase tracking-widest dark:text-[#8A8A93]">
                    Plataforma
                  </Text>
                </View>
                <View className="flex-row flex-wrap gap-2">
                  {sessionPlatforms.map((p) => (
                    <View
                      key={p.id}
                      className="flex-row items-center gap-2.5 rounded-lg border border-black/10 bg-gray-100 px-4 py-2 dark:border-white/10 dark:bg-[#252836]"
                    >
                      <Ionicons
                        name={p.icon as keyof typeof Ionicons.glyphMap}
                        size={14}
                        color={theme.colors.iconAccent}
                      />
                      <Text className="font-medium text-gray-900 text-sm dark:text-white">
                        {p.label}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              <View className="h-px bg-black/5 dark:bg-white/5" />

              {/* Availability */}
              <View className="gap-2.5">
                <View className="flex-row items-center gap-2">
                  <Ionicons
                    name="calendar-outline"
                    size={14}
                    color={theme.colors.iconAccent}
                  />
                  <Text className="font-medium text-[10px] text-gray-500 uppercase tracking-widest dark:text-[#8A8A93]">
                    Disponibilidad
                  </Text>
                </View>
                <View className="flex-row flex-wrap gap-2">
                  {sessionAvailability.map((day) => (
                    <View
                      key={day.id}
                      className="min-w-[52px] items-center justify-center rounded-lg border border-black/10 bg-gray-100 px-4 py-2 dark:border-white/10 dark:bg-[#252836]"
                    >
                      <Text className="font-semibold text-gray-900 text-sm dark:text-white">
                        {day.label}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* Recent Reviews */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="font-semibold text-gray-900 text-xs uppercase tracking-wider dark:text-white">
                Reviews recientes
              </Text>
              <Text className="text-gray-500 text-xs dark:text-[#8A8A93]">
                {mentor.totalReviews} total
              </Text>
            </View>

            <View className="gap-3">
              {reviews.map((review) => (
                <View
                  key={review.name}
                  className="gap-2.5 rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-[#161721]"
                >
                  <View className="flex-row items-center justify-between">
                    <Text className="font-medium text-gray-900 text-sm dark:text-white">
                      {review.name}
                    </Text>
                    <View className="flex-row items-center gap-0.5">
                      {Array.from({ length: review.rating }).map(
                        (__, starNum) => (
                          <Ionicons
                            key={`${review.name}-star-${starNum + 1}`}
                            name="star"
                            size={10}
                            color={theme.colors.iconAccent}
                          />
                        ),
                      )}
                    </View>
                  </View>
                  <Text className="text-gray-500 text-xs leading-5 dark:text-[#8A8A93]">
                    {review.text}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar / CTA */}
      <View
        className="absolute right-0 bottom-0 left-0 items-center justify-center p-5"
        style={{
          paddingBottom: insets.bottom + 20,
          backgroundColor:
            Platform.OS === 'ios' ? 'rgba(15, 16, 26, 0.9)' : '#0F101A', // Slight blur imitation safely via transparency
        }}
      >
        <Pressable
          className="w-full flex-row items-center justify-center gap-2 rounded-xl bg-primary py-4 active:bg-primary/80"
          style={{
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 15,
            elevation: 8,
          }}
          onPress={() => setShowBookingModal(true)}
        >
          <Text className="font-semibold text-black text-sm">Book Session</Text>
          <Ionicons name="chevron-forward" size={16} color="#000000" />
        </Pressable>
      </View>

      {/* Booking Flow Modal */}
      <Modal
        visible={showBookingModal}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View className="flex-1" style={{ paddingTop: insets.top }}>
          <BookingFlow
            onClose={() => setShowBookingModal(false)}
            onSuccessComplete={() => {
              setShowBookingModal(false)
              router.push({ pathname: '/booking/[id]', params: { id: 'b1' } })
            }}
          />
        </View>
      </Modal>
    </View>
  )
}
