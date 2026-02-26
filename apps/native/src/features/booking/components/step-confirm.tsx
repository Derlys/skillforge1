import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native'
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Circle, Polyline } from 'react-native-svg'
import { theme } from '../../../core/theme'
import { SERVICES } from '../constants'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedPolyline = Animated.createAnimatedComponent(Polyline)

function AnimatedSuccessIcon() {
  const outerScale = useSharedValue(0.5)
  const outerOpacity = useSharedValue(0)
  const innerScale = useSharedValue(0)
  const checkOffset = useSharedValue(50)

  useEffect(() => {
    outerScale.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.ease),
    })
    outerOpacity.value = withTiming(1, { duration: 500 })
    innerScale.value = withDelay(
      100,
      withSpring(1, { damping: 12, stiffness: 150 }),
    )
    checkOffset.value = withDelay(
      300,
      withTiming(0, { duration: 400, easing: Easing.out(Easing.ease) }),
    )
  }, [checkOffset, innerScale, outerOpacity, outerScale])

  const outerProps = useAnimatedProps(() => ({
    r: 40 * outerScale.value,
    opacity: outerOpacity.value,
  }))

  const innerProps = useAnimatedProps(() => ({
    r: Math.max(0.01, 28 * innerScale.value),
  }))

  const checkProps = useAnimatedProps(() => ({
    strokeDashoffset: checkOffset.value,
  }))

  return (
    <View className="mb-6 h-24 w-24 items-center justify-center">
      <Svg viewBox="0 0 100 100" width={100} height={100}>
        <AnimatedCircle
          cx="50"
          cy="50"
          fill="rgba(255, 215, 0, 0.2)"
          animatedProps={outerProps}
        />
        <AnimatedCircle
          cx="50"
          cy="50"
          fill="#FFD700"
          animatedProps={innerProps}
        />
        <AnimatedPolyline
          points="38,52 46,60 64,42"
          fill="none"
          stroke="#000000"
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={50}
          animatedProps={checkProps}
        />
      </Svg>
    </View>
  )
}

interface StepConfirmProps {
  serviceId: string
  date: string
  time: string
  onCompleted: () => void
  onConfirmSuccess: () => void
  onClose: () => void
  isRescheduling?: boolean
}

export function StepConfirm({
  serviceId,
  date,
  time,
  onCompleted,
  onConfirmSuccess,
  onClose,
  isRescheduling,
}: StepConfirmProps) {
  const { t } = useTranslation()
  const [confirmed, setConfirmed] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const service = SERVICES.find((s) => s.id === serviceId)

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  const handleConfirm = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setConfirmed(true)
      setIsAnimating(false)
      onConfirmSuccess()
    }, 1000)
  }

  if (confirmed) {
    return (
      <View className="relative flex-1 items-center justify-start px-6 pt-16 pb-8">
        {/* Close Button ('X') - returns to mentor profile */}
        <Pressable
          onPress={onClose}
          className="absolute top-6 right-6 z-10 h-10 w-10 items-end justify-center"
        >
          <Ionicons name="close" size={28} color={theme.colors.iconAccent} />
        </Pressable>

        <AnimatedSuccessIcon />
        <View className="mb-8 items-center gap-2">
          <Text className="font-semibold text-gray-900 text-xl dark:text-white">
            {isRescheduling ? 'Meeting Rescheduled' : 'Meeting Booked'}
          </Text>
          <Text className="text-center text-gray-500 text-sm leading-5 dark:text-[#8A8A93]">
            You will receive an email with the Google Meet link and the session
            details.
          </Text>
        </View>

        <View className="w-full gap-4 rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-[#161721]">
          {/* Mentor Name added to summary */}
          <View className="flex-row items-center gap-3">
            <Ionicons
              name="person-outline"
              size={16}
              color={theme.colors.iconAccent}
            />
            <Text className="text-gray-900/80 text-sm dark:text-white/80">
              Elena Vasquez
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Ionicons
              name="chatbubbles-outline"
              size={16}
              color={theme.colors.iconAccent}
            />
            <Text className="text-gray-900/80 text-sm dark:text-white/80">
              {service?.title}
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Ionicons
              name="calendar-outline"
              size={16}
              color={theme.colors.iconAccent}
            />
            <Text className="text-gray-900/80 text-sm capitalize dark:text-white/80">
              {formattedDate}
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Ionicons
              name="time-outline"
              size={16}
              color={theme.colors.iconAccent}
            />
            <Text className="text-gray-900/80 text-sm dark:text-white/80">
              {time} ({service?.duration})
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Ionicons
              name="videocam-outline"
              size={16}
              color={theme.colors.iconAccent}
            />
            <Text className="text-gray-900/80 text-sm dark:text-white/80">
              Google Meet
            </Text>
          </View>
        </View>

        <Pressable
          onPress={onCompleted}
          className="mt-8 w-full flex-row items-center justify-center rounded-xl bg-primary py-4 active:bg-primary/90"
        >
          <Text className="text-center font-semibold text-base text-black">
            Ver Detalles
          </Text>
        </Pressable>
      </View>
    )
  }

  return (
    <ScrollView
      className="flex-1 px-6 pb-6"
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-6 gap-4 rounded-xl border border-black/5 bg-white p-4 dark:border-white/5 dark:bg-[#161721]">
        <View className="flex-row items-start gap-3">
          <View className="h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">
            <Ionicons
              name="chatbubbles-outline"
              size={18}
              color={theme.colors.iconAccent}
            />
          </View>
          <View>
            <Text className="text-gray-500 text-xs dark:text-[#8A8A93]">
              Topic
            </Text>
            <Text className="font-medium text-gray-900 text-sm dark:text-white">
              {service?.title}
            </Text>
          </View>
        </View>

        <View className="h-px bg-black/5 dark:bg-white/5" />

        <View className="flex-row items-start gap-3">
          <View className="h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">
            <Ionicons
              name="calendar-outline"
              size={18}
              color={theme.colors.iconAccent}
            />
          </View>
          <View>
            <Text className="text-gray-500 text-xs dark:text-[#8A8A93]">
              Date
            </Text>
            <Text className="font-medium text-gray-900 text-sm capitalize dark:text-white">
              {formattedDate}
            </Text>
          </View>
        </View>

        <View className="h-px bg-black/5 dark:bg-white/5" />

        <View className="flex-row items-start gap-3">
          <View className="h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">
            <Ionicons
              name="time-outline"
              size={18}
              color={theme.colors.iconAccent}
            />
          </View>
          <View>
            <Text className="text-gray-500 text-xs dark:text-[#8A8A93]">
              Time
            </Text>
            <Text className="font-medium text-gray-900 text-sm dark:text-white">
              {time} - {service?.duration}
            </Text>
          </View>
        </View>

        <View className="h-px bg-black/5 dark:bg-white/5" />

        <View className="flex-row items-start gap-3">
          <View className="h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">
            <Ionicons
              name="videocam-outline"
              size={18}
              color={theme.colors.iconAccent}
            />
          </View>
          <View>
            <Text className="text-gray-500 text-xs dark:text-[#8A8A93]">
              Platform
            </Text>
            <Text className="font-medium text-gray-900 text-sm dark:text-white">
              Google Meet
            </Text>
          </View>
        </View>
      </View>

      {!isRescheduling && (
        <>
          <View className="mb-6 flex-row items-center justify-between border-black/10 border-t px-1 pt-4 dark:border-white/10">
            <Text className="font-bold text-base text-gray-900 dark:text-white">
              {t('schedule.totalPrice')}
            </Text>
            <Text className="font-bold text-lg text-primary">
              {service?.price}
            </Text>
          </View>

          <View className="mb-6 flex-row items-center gap-2">
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="#8A8A93"
            />
            <Text className="flex-1 text-left text-gray-500 text-xs dark:text-[#8A8A93]">
              {t('schedule.transactionNote')}
            </Text>
          </View>
        </>
      )}

      <Pressable
        onPress={handleConfirm}
        disabled={isAnimating}
        className={`w-full flex-row items-center justify-center rounded-xl py-4 transition-all ${
          isAnimating
            ? 'scale-95 bg-primary/60'
            : 'bg-primary active:bg-primary/90'
        }`}
      >
        {isAnimating ? (
          <View className="flex-row items-center justify-center gap-2">
            <ActivityIndicator color={'#000000'} size="small" />
            <Text className="font-semibold text-black">
              {isRescheduling ? 'Rescheduling...' : 'Booking...'}
            </Text>
          </View>
        ) : (
          <Text className="text-center font-semibold text-base text-black">
            {isRescheduling ? 'Reschedule' : 'Book'}
          </Text>
        )}
      </Pressable>
    </ScrollView>
  )
}
