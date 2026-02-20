import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets()

  return (
    <View
      className="flex-row items-center justify-around border-white/5 border-t bg-[#0D0E18] px-4"
      style={{
        paddingBottom: Math.max(insets.bottom, 24),
        paddingTop: 16,
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key]

        if (options.href === null) return null

        const label = options.title !== undefined ? options.title : route.name
        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        let iconName: keyof typeof Ionicons.glyphMap = 'help-outline'
        if (route.name === 'index') iconName = 'home-outline'
        else if (route.name === 'explore' || route.name === 'search')
          iconName = 'search-outline'
        else if (route.name === 'bookings') iconName = 'calendar-outline'
        else if (route.name === 'profile') iconName = 'person-outline'

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            className="flex-1 items-center justify-center gap-1"
          >
            <View
              className={`h-10 w-10 items-center justify-center rounded-full ${
                isFocused ? 'bg-[#FFD700]/10' : ''
              }`}
            >
              <Ionicons
                name={iconName}
                size={22}
                color={isFocused ? '#FFD700' : 'rgba(255,255,255,0.35)'}
              />
            </View>
            <Text
              style={{
                color: isFocused ? '#FFD700' : 'rgba(255,255,255,0.35)',
                fontSize: 10,
                fontWeight: '500',
              }}
            >
              {label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="search" options={{ title: 'Search' }} />
      <Tabs.Screen name="bookings" options={{ title: 'Bookings' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  )
}
