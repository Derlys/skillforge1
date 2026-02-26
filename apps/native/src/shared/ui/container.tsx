import { cn } from 'heroui-native'
import type { PropsWithChildren } from 'react'
import { ScrollView, View, type ViewProps } from 'react-native'
import Animated, { type AnimatedProps } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAppTheme } from '@/src/core/providers/app-theme-provider'

const AnimatedView = Animated.createAnimatedComponent(View)

type Props = AnimatedProps<ViewProps> & {
  className?: string
}

export function Container({
  children,
  className,
  ...props
}: PropsWithChildren<Props>) {
  const insets = useSafeAreaInsets()
  const { isDark } = useAppTheme()

  return (
    <AnimatedView
      className={cn('flex-1', className)}
      style={{
        backgroundColor: isDark ? '#0F101A' : '#F3F4F6',
        paddingBottom: insets.bottom,
      }}
      {...props}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {children}
      </ScrollView>
    </AnimatedView>
  )
}
