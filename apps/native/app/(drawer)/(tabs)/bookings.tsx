import { Ionicons } from '@expo/vector-icons'
import { Text, View } from 'react-native'

export default function BookingsScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-[#0B0C14]">
      <Ionicons
        name="calendar-outline"
        size={64}
        color="rgba(255,255,255,0.1)"
      />
      <Text className="font-bold text-2xl text-white">Bookings</Text>
      <Text className="px-8 text-center text-sm text-white/40">
        Your upcoming and past sessions will appear here.
      </Text>
    </View>
  )
}
