import { Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { Platform, Pressable, View } from 'react-native'
import { withUniwind } from 'uniwind'

import { useAppTheme } from '@/src/core/providers/app-theme-provider'

const StyledIonicons = withUniwind(Ionicons)

export function ThemeToggle() {
  const { toggleTheme, isLight } = useAppTheme()

  return (
    <Pressable
      onPress={() => {
        if (Platform.OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        }
        toggleTheme()
      }}
      className="px-2.5"
    >
      <View>
        <StyledIonicons
          name={isLight ? 'moon' : 'sunny'}
          size={20}
          className="text-gray-900 dark:text-white"
        />
      </View>
    </Pressable>
  )
}
