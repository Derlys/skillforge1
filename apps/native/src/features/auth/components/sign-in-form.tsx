import { Button, Input, Label, Spinner, TextField } from 'heroui-native'
import { useState } from 'react'
import { Text, View } from 'react-native'
import { queryClient } from '@/src/shared/api/orpc'
import { authClient } from '@/src/shared/auth/auth-client'

import { useI18n } from '@/src/shared/i18n/use-i18n'

interface SignInFormProps {
  onSignUpPress?: () => void
}

export function SignIn({ onSignUpPress }: SignInFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { t } = useI18n()

  async function handleLogin() {
    if (!email || !password) {
      setError(t('auth.signIn.errorFields'))
      return
    }

    setIsLoading(true)
    setError(null)

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError(error) {
          setError(error.error?.message || t('auth.signIn.error'))
          setIsLoading(false)
        },
        onSuccess() {
          setEmail('')
          setPassword('')
          queryClient.refetchQueries()
        },
        onFinished() {
          setIsLoading(false)
        },
      },
    )
  }

  return (
    <View className="w-full gap-8">
      {/* Title */}
      <View>
        <Text className="mb-2 font-bold text-3xl text-gray-900 dark:text-white">
          {t('auth.signIn.title')}
        </Text>
        <Text className="text-base text-gray-900 dark:text-white/60">
          {t('auth.signIn.subtitle')}
        </Text>
      </View>

      {/* Error Message */}
      {error && (
        <View className="rounded-2xl border border-danger/20 bg-danger/10 p-4">
          <Text className="text-center font-medium text-danger text-sm">
            {error}
          </Text>
        </View>
      )}

      {/* Form Fields */}
      <View className="gap-5">
        <TextField>
          <Label className="mb-1 ml-1 font-medium text-gray-900/80 text-sm dark:text-white/80">
            {t('auth.signIn.email')}
          </Label>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder={t('auth.signIn.emailPlaceholder')}
            placeholderTextColor="rgba(255,255,255,0.3)"
            keyboardType="email-address"
            autoCapitalize="none"
            className="h-14 rounded-2xl border-black/5 bg-[#1A1B23] px-4 text-gray-900 dark:border-white/5 dark:text-white"
          />
        </TextField>

        <TextField>
          <Label className="mb-1 ml-1 font-medium text-gray-900/80 text-sm dark:text-white/80">
            {t('auth.signIn.password')}
          </Label>
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="rgba(255,255,255,0.3)"
            secureTextEntry
            className="h-14 rounded-2xl border-black/5 bg-[#1A1B23] px-4 text-gray-900 dark:border-white/5 dark:text-white"
          />
        </TextField>

        {/* Sign In Button */}
        <Button
          onPress={handleLogin}
          isDisabled={isLoading}
          className="mt-4 h-14 rounded-2xl bg-white active:bg-white/90"
        >
          {isLoading ? (
            <Spinner size="sm" color="black" />
          ) : (
            <Text className="font-bold text-black text-lg">
              {t('auth.signIn.submit')}
            </Text>
          )}
        </Button>
      </View>

      {/* Sign Up Link */}
      <View className="flex-row items-center justify-center gap-2 pt-2">
        <Text className="text-gray-900/40 dark:text-white/40">
          {t('auth.signIn.noAccount')}
        </Text>
        <Text
          className="font-bold text-gray-900 dark:text-white"
          onPress={onSignUpPress}
        >
          {t('auth.signIn.signUp')}
        </Text>
      </View>
    </View>
  )
}
