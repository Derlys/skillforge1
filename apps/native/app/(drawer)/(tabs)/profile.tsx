import { Ionicons } from '@expo/vector-icons'
import { Text, View } from 'react-native'

export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-[#0B0C14]">
      <Ionicons name="person-outline" size={64} color="rgba(255,255,255,0.1)" />
      <Text className="font-bold text-2xl text-white">Profile</Text>
      <Text className="px-8 text-center text-sm text-white/40">
        Manage your account, preferences, and wallet.
      </Text>
    </View>
  )
}
