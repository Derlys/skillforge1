import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { theme } from '../../../core/theme'

// Generate available dates (next 14 days from today)
const generateAvailableDates = () => {
  const dates: {
    [key: string]: {
      marked: boolean
      dotColor: string
      selectedColor?: string
    }
  } = {}
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Mark available dates (next 14 days)
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const dateString = date.toISOString().split('T')[0]
    dates[dateString] = {
      marked: true,
      dotColor: theme.colors.primary,
    }
  }
  return dates
}

interface StepCalendarProps {
  selected: string
  onSelect: (date: string) => void
}

export function StepCalendar({ selected, onSelect }: StepCalendarProps) {
  const availableDates = React.useMemo(() => generateAvailableDates(), [])

  const getMarkedDates = () => {
    if (!selected) return availableDates

    return {
      ...availableDates,
      [selected]: {
        marked: true,
        dotColor: theme.colors.primary,
        selected: true,
        selectedColor: theme.colors.primary,
      },
    }
  }

  return (
    <View className="flex-1 px-6 pb-6">
      <View className="overflow-hidden rounded-2xl border border-black/5 bg-white p-1 dark:border-white/5 dark:bg-[#161721]">
        <Calendar
          onDayPress={(day: { dateString: string }) => onSelect(day.dateString)}
          markedDates={getMarkedDates()}
          minDate={new Date().toISOString().split('T')[0]}
          disableAllTouchEventsForDisabledDays={true}
          enableSwipeMonths={false}
          renderArrow={(direction) => (
            <Ionicons
              name={direction === 'left' ? 'chevron-back' : 'chevron-forward'}
              size={20}
              color={theme.colors.iconAccent}
            />
          )}
          onPressArrowLeft={(goToPreviousMonth: () => void) =>
            goToPreviousMonth()
          }
          onPressArrowRight={(goToNextMonth: () => void) => goToNextMonth()}
          theme={{
            backgroundColor: '#161721',
            calendarBackground: '#161721',
            textSectionTitleColor: '#8A8A93',
            selectedDayBackgroundColor: theme.colors.primary,
            selectedDayTextColor: '#000000',
            todayTextColor: theme.colors.primary,
            dayTextColor: '#FFFFFF',
            textDisabledColor: '#4A4A4A',
            dotColor: theme.colors.primary,
            selectedDotColor: '#000000',
            arrowColor: theme.colors.iconAccent,
            monthTextColor: '#FFFFFF',
            textDayFontWeight: '400',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '500',
            textDayFontSize: 14,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 12,
          }}
          style={{
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  )
}
