import { useChat } from '@ai-sdk/react'
import { Ionicons } from '@expo/vector-icons'
import { env } from '@solana-mobile-stack/env/native'
import { DefaultChatTransport } from 'ai'
import { fetch as expoFetch } from 'expo/fetch'
import {
  Button,
  FieldError,
  Input,
  Separator,
  Surface,
  TextField,
  useThemeColor,
} from 'heroui-native'
import { useEffect, useRef, useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native'

import { Container } from '@/src/shared/ui/container'

const generateAPIUrl = (relativePath: string) => {
  const serverUrl = env.EXPO_PUBLIC_SERVER_URL
  if (!serverUrl) {
    throw new Error(
      'EXPO_PUBLIC_SERVER_URL environment variable is not defined',
    )
  }
  const path = relativePath.startsWith('/') ? relativePath : `/${relativePath}`
  return serverUrl.concat(path)
}

export default function AIScreen() {
  const [input, setInput] = useState('')
  const { messages, error, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: generateAPIUrl('/ai'),
    }),
    onError: (error) => console.error(error, 'AI Chat Error'),
  })
  const scrollViewRef = useRef<ScrollView>(null)
  const foregroundColor = useThemeColor('foreground')
  const mutedColor = useThemeColor('muted')

  useEffect(() => {
    const messagesCount = messages.length
    if (messagesCount === 0) return
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }, [messages.length])

  const onSubmit = () => {
    const value = input.trim()
    if (value) {
      sendMessage({ text: value })
      setInput('')
    }
  }

  if (error) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center px-4">
          <Surface variant="secondary" className="rounded-lg p-4">
            <FieldError isInvalid className="mb-2">
              {error.message}
            </FieldError>
            <Text className="text-center text-gray-500 text-xs dark:text-[#8A8A93]">
              Please check your connection and try again.
            </Text>
          </Surface>
        </View>
      </Container>
    )
  }

  return (
    <Container>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 px-4 py-4">
          <View className="mb-4 py-4">
            <Text className="font-semibold text-2xl text-gray-900 tracking-tight dark:text-white">
              AI Chat
            </Text>
            <Text className="mt-1 text-gray-500 text-sm dark:text-[#8A8A93]">
              Chat with our AI assistant
            </Text>
          </View>

          <ScrollView
            ref={scrollViewRef}
            className="mb-4 flex-1"
            showsVerticalScrollIndicator={false}
          >
            {messages.length === 0 ? (
              <View className="flex-1 items-center justify-center py-10">
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={32}
                  color={mutedColor}
                />
                <Text className="mt-3 text-gray-500 text-sm dark:text-[#8A8A93]">
                  Ask me anything to get started
                </Text>
              </View>
            ) : (
              <View className="gap-2">
                {messages.map((message) => (
                  <Surface
                    key={message.id}
                    variant={message.role === 'user' ? 'tertiary' : 'secondary'}
                    className={`rounded-lg p-3 ${message.role === 'user' ? 'ml-10' : 'mr-10'}`}
                  >
                    <Text className="mb-1 font-medium text-gray-500 text-xs dark:text-[#8A8A93]">
                      {message.role === 'user' ? 'You' : 'AI'}
                    </Text>
                    <View className="gap-1">
                      {message.parts.map((part, i) =>
                        part.type === 'text' ? (
                          <Text
                            key={`${message.id}-${i}`}
                            className="text-gray-900 text-sm leading-relaxed dark:text-white"
                          >
                            {part.text}
                          </Text>
                        ) : (
                          <Text
                            key={`${message.id}-${i}`}
                            className="text-gray-900 text-sm leading-relaxed dark:text-white"
                          >
                            {JSON.stringify(part)}
                          </Text>
                        ),
                      )}
                    </View>
                  </Surface>
                ))}
              </View>
            )}
          </ScrollView>

          <Separator className="mb-3" />

          <View className="flex-row items-center gap-2">
            <View className="flex-1">
              <TextField>
                <Input
                  value={input}
                  onChangeText={setInput}
                  placeholder="Type a message..."
                  onSubmitEditing={onSubmit}
                  autoFocus
                />
              </TextField>
            </View>
            <Button
              isIconOnly
              variant={input.trim() ? 'primary' : 'secondary'}
              onPress={onSubmit}
              isDisabled={!input.trim()}
              size="sm"
            >
              <Ionicons
                name="arrow-up"
                size={18}
                color={input.trim() ? foregroundColor : mutedColor}
              />
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
  )
}
