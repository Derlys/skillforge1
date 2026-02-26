import { Ionicons } from '@expo/vector-icons'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { SERVICES } from '../constants'

interface StepServiceProps {
  selected: string | null
  onSelect: (serviceId: string) => void
}

export function StepService({ selected, onSelect }: StepServiceProps) {
  return (
    <ScrollView
      className="flex-1 px-6 pb-6"
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-4">
        <Text className="font-semibold text-base text-gray-900 dark:text-white">
          Choose a Service
        </Text>
        <Text className="mt-1 text-gray-500 text-sm dark:text-[#8A8A93]">
          Select what you want to talk about
        </Text>
      </View>

      <View className="gap-3">
        {SERVICES.map((service) => {
          const isSelected = selected === service.id
          return (
            <Pressable
              key={service.id}
              onPress={() => onSelect(service.id)}
              className={`flex-row items-center gap-4 rounded-xl border p-4 transition-all ${
                isSelected
                  ? 'border-[#FFD700]/40 bg-[#FFD700]/10'
                  : 'border-black/5 bg-white active:border-white/20 active:bg-black/5 dark:border-white/5 dark:bg-[#161721] dark:bg-white/5'
              }`}
            >
              {/* Icon */}
              <View
                className={`h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  isSelected ? 'bg-[#FFD700]' : 'bg-gray-100 dark:bg-[#252836]'
                }`}
              >
                <Ionicons
                  name={service.icon}
                  size={20}
                  color={isSelected ? '#000000' : '#8A8A93'}
                />
              </View>

              {/* Text */}
              <View className="flex-1 flex-col gap-1">
                <Text
                  className={`font-medium text-base ${
                    isSelected
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-900/80 dark:text-white/80'
                  }`}
                >
                  {service.title}
                </Text>
                <Text
                  className="text-gray-500 text-xs dark:text-[#8A8A93]"
                  numberOfLines={1}
                >
                  {service.description}
                </Text>
              </View>
            </Pressable>
          )
        })}
      </View>
    </ScrollView>
  )
}
