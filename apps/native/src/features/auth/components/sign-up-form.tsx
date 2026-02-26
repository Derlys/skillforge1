import { Button, Input, Label, Spinner, TextField } from 'heroui-native'
import { useState } from 'react'
import { Text, View } from 'react-native'
import { queryClient } from '@/src/shared/api/orpc'
import { authClient } from '@/src/shared/auth/auth-client'

import { useI18n } from '@/src/shared/i18n/use-i18n'

interface SignUpFormProps {
  onSignInPress?: () => void
}

function signUpHandler({
  name,
  email,
  password,
  setError,
  setIsLoading,
  setName,
  setEmail,
  setPassword,
  t,
}: {
  name: string
  email: string
  password: string
  setError: (error: string | null) => void
  setIsLoading: (loading: boolean) => void
  setName: (name: string) => void
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  t: (key: string) => string
}) {
  setIsLoading(true)
  setError(null)

  authClient.signUp.email(
    {
      name,
      email,
      password,
    },
    {
      onError(error) {
        setError(error.error?.message || t('auth.signUp.error'))
        setIsLoading(false)
      },
      onSuccess() {
        setName('')
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

export function SignUp({ onSignInPress }: SignUpFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { t } = useI18n()

  function handlePress() {
    if (!name || !email || !password) {
      setError(t('auth.signUp.errorFields'))
      return
    }
    signUpHandler({
      name,
      email,
      password,
      setError,
      setIsLoading,
      setName,
      setEmail,
      setPassword,
      t,
    })
  }

  return (
    <View className="w-full gap-8">
      {/* Title */}
      <View>
        <Text className="mb-2 font-bold text-3xl text-gray-900 dark:text-white">
          {t('auth.signUp.title')}
        </Text>
        <Text className="text-base text-gray-900 dark:text-white/60">
          {t('auth.signUp.subtitle')}
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
            {t('auth.signUp.name')}
          </Label>
          <Input
            value={name}
            onChangeText={setName}
            placeholder={t('auth.signUp.namePlaceholder')}
            placeholderTextColor="rgba(255,255,255,0.3)"
            className="h-14 rounded-2xl border-black/5 bg-[#1A1B23] px-4 text-gray-900 dark:border-white/5 dark:text-white"
          />
        </TextField>

        <TextField>
          <Label className="mb-1 ml-1 font-medium text-gray-900/80 text-sm dark:text-white/80">
            {t('auth.signUp.email')}
          </Label>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder={t('auth.signUp.emailPlaceholder')}
            placeholderTextColor="rgba(255,255,255,0.3)"
            keyboardType="email-address"
            autoCapitalize="none"
            className="h-14 rounded-2xl border-black/5 bg-[#1A1B23] px-4 text-gray-900 dark:border-white/5 dark:text-white"
          />
        </TextField>

        <TextField>
          <Label className="mb-1 ml-1 font-medium text-gray-900/80 text-sm dark:text-white/80">
            {t('auth.signUp.password')}
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

        {/* Sign Up Button */}
        <Button
          onPress={handlePress}
          isDisabled={isLoading}
          className="mt-4 h-14 rounded-2xl bg-white active:bg-white/90"
        >
          {isLoading ? (
            <Spinner size="sm" color="black" />
          ) : (
            <Text className="font-bold text-black text-lg">
              {t('auth.signUp.submit')}
            </Text>
          )}
        </Button>
      </View>

      {/* Sign In Link */}
      <View className="flex-row items-center justify-center gap-2 pt-2">
        <Text className="text-gray-900/40 dark:text-white/40">
          {t('auth.signUp.haveAccount')}
        </Text>
        <Text
          className="font-bold text-gray-900 dark:text-white"
          onPress={onSignInPress}
        >
          {t('auth.signUp.signIn')}
        </Text>
      </View>
    </View>
  )
}
