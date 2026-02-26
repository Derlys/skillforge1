import { Ionicons } from '@expo/vector-icons'
import { Pressable, Text, View } from 'react-native'

interface MentorHeaderProps {
  step: number
  onClose?: () => void
  onBack?: () => void
  isRescheduling?: boolean
}

export function MentorHeader({
  step,
  onClose,
  onBack,
  isRescheduling,
}: MentorHeaderProps) {
  return (
    <View className="items-center px-6 pt-6 pb-4">
      {/* Back Button (Left) */}
      {onBack && (
        <Pressable
          onPress={onBack}
          className="absolute top-6 left-6 z-10 h-10 w-10 items-start justify-center"
        >
          <Ionicons name="chevron-back" size={28} color="#8A8A93" />
        </Pressable>
      )}

      {/* Optional Close Button (Right) */}
      {onClose && (
        <Pressable
          onPress={onClose}
          className="absolute top-6 right-6 z-10 h-10 w-10 items-end justify-center"
        >
          <Ionicons name="close" size={28} color="#8A8A93" />
        </Pressable>
      )}

      {/* Avatar */}
      <View className="mb-3 h-16 w-16 items-center justify-center rounded-full border-2 border-[#FFD700]/30 bg-[#342F70]">
        <Text className="font-bold text-gray-900 text-xl dark:text-white">
          EV
        </Text>
      </View>

      {/* Info */}
      <View className="mb-3 items-center gap-1.5">
        <Text className="text-gray-500 text-sm dark:text-[#8A8A93]">
          Elena Vasquez
        </Text>
        <Text className="text-center font-semibold text-gray-900 text-xl tracking-tight dark:text-white">
          1:1 Mentorship
        </Text>
      </View>

      {/* Session Details */}
      <View className="mb-3 flex-row items-center gap-3 text-sm">
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="time-outline" size={14} color="#8A8A93" />
          <Text className="text-gray-500 text-sm dark:text-[#8A8A93]">
            60 min
          </Text>
        </View>
        <Text className="text-gray-900 dark:text-white/10">|</Text>
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="videocam-outline" size={14} color="#8A8A93" />
          <Text className="text-gray-500 text-sm dark:text-[#8A8A93]">
            Google Meet
          </Text>
        </View>
      </View>

      {/* Timezone */}
      <View className="mb-4 flex-row items-center gap-1.5">
        <Ionicons name="globe-outline" size={12} color="#8A8A93" />
        <Text className="text-gray-500 text-xs dark:text-[#8A8A93]">
          America/Bogota
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="flex-row items-center justify-center gap-2">
        {(isRescheduling ? [1, 2, 3] : [1, 2, 3, 4]).map((s) => (
          <View
            key={s}
            className={`h-1.5 rounded-full ${
              s <= step ? 'w-8 bg-[#FFD700]' : 'w-4 bg-[#4A4A4A]'
            }`}
          />
        ))}
      </View>
    </View>
  )
}
