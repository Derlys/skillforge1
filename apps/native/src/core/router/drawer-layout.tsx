import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import { useThemeColor } from 'heroui-native'
import { useCallback } from 'react'
import { Pressable, Text } from 'react-native'
import { withUniwind } from 'uniwind'

import { ThemeToggle } from '@/src/shared/ui/theme-toggle'

const StyledIonicons = withUniwind(Ionicons)
const StyledMaterialIcons = withUniwind(MaterialIcons)

function DrawerLayout() {
  const themeColorForeground = useThemeColor('foreground')
  const themeColorBackground = useThemeColor('background')

  const renderThemeToggle = useCallback(() => <ThemeToggle />, [])

  return (
    <Drawer
      screenOptions={{
        headerTintColor: themeColorForeground,
        headerStyle: { backgroundColor: themeColorBackground },
        headerTitleStyle: {
          fontWeight: '600',
          color: themeColorForeground,
        },
        headerRight: renderThemeToggle,
        drawerStyle: { backgroundColor: themeColorBackground },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: 'Home',
          drawerLabel: ({ color, focused }) => (
            <Text style={{ color: focused ? color : themeColorForeground }}>
              Home
            </Text>
          ),
          drawerIcon: ({ size, focused }) => (
            <StyledIonicons
              name="home-outline"
              size={size}
              className={
                focused ? 'text-primary' : 'text-gray-900 dark:text-white'
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerTitle: 'Tabs',
          drawerLabel: ({ color, focused }) => (
            <Text style={{ color: focused ? color : themeColorForeground }}>
              Tabs
            </Text>
          ),
          drawerIcon: ({ size, focused }) => (
            <StyledMaterialIcons
              name="border-bottom"
              size={size}
              className={
                focused ? 'text-primary' : 'text-gray-900 dark:text-white'
              }
            />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable className="mr-4">
                <StyledIonicons
                  name="add-outline"
                  size={24}
                  className="text-gray-900 dark:text-white"
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Drawer.Screen
        name="todos"
        options={{
          headerTitle: 'Todos',
          drawerLabel: ({ color, focused }) => (
            <Text style={{ color: focused ? color : themeColorForeground }}>
              Todos
            </Text>
          ),
          drawerIcon: ({ size, focused }) => (
            <StyledIonicons
              name="checkbox-outline"
              size={size}
              className={
                focused ? 'text-primary' : 'text-gray-900 dark:text-white'
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ai"
        options={{
          headerTitle: 'AI',
          drawerLabel: ({ color, focused }) => (
            <Text style={{ color: focused ? color : themeColorForeground }}>
              AI
            </Text>
          ),
          drawerIcon: ({ size, focused }) => (
            <StyledIonicons
              name="chatbubble-ellipses-outline"
              size={size}
              className={
                focused ? 'text-primary' : 'text-gray-900 dark:text-white'
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="solana"
        options={{
          headerTitle: 'Solana',
          drawerLabel: ({ color, focused }) => (
            <Text style={{ color: focused ? color : themeColorForeground }}>
              Solana
            </Text>
          ),
          drawerIcon: ({ size, focused }) => (
            <StyledIonicons
              name="wallet-outline"
              size={size}
              className={
                focused ? 'text-primary' : 'text-gray-900 dark:text-white'
              }
            />
          ),
        }}
      />
    </Drawer>
  )
}

export default DrawerLayout
