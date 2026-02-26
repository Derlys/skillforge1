import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'

function getAvailableSlots(): string[] {
  return [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '7:00 PM',
  ]
}

interface StepTimeProps {
  date: string
  selected: string | null
  onSelect: (time: string) => void
}

export function StepTime({ date, selected, onSelect }: StepTimeProps) {
  const slots = React.useMemo(() => getAvailableSlots(), [])

  const _formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
    : ''

  return (
    <ScrollView
      className="flex-1 px-6 pb-6"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row flex-wrap justify-between gap-y-3">
        {slots.map((slot) => {
          const isSelected = selected === slot
          return (
            <Pressable
              key={slot}
              onPress={() => onSelect(slot)}
              style={{ width: '48%' }}
              className={`flex-row items-center justify-center gap-2 rounded-xl border px-2 py-3.5 transition-all ${
                isSelected
                  ? 'border-[#FFD700] bg-[#FFD700]'
                  : 'border-transparent bg-white active:bg-gray-100 dark:bg-[#161721] dark:bg-[#252836]'
              }`}
            >
              <Ionicons
                name="time-outline"
                size={14}
                color={isSelected ? '#000000' : '#8A8A93'}
              />
              <Text
                className={`font-medium text-sm ${
                  isSelected
                    ? 'text-black'
                    : 'text-gray-900/80 dark:text-white/80'
                }`}
              >
                {slot}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </ScrollView>
  )
}
