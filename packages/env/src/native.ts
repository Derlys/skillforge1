declare const __DEV__: boolean

import { createEnv } from '@t3-oss/env-core'
import Constants from 'expo-constants'
import { z } from 'zod'

// Merge process.env with Constants.expoConfig.extra for Expo compatibility
// Expo injects EXPO_PUBLIC_* variables at build time, but we also check extra as fallback
const runtimeEnv = {
  ...process.env,
  ...(Constants.expoConfig?.extra || {}),
}

// Debug: Log available env vars (remove in production)
if (__DEV__) {
  console.log(
    '[ENV] Available EXPO_PUBLIC_SERVER_URL:',
    runtimeEnv.EXPO_PUBLIC_SERVER_URL,
  )
  console.log('[ENV] Constants.extra:', Constants.expoConfig?.extra)
}

export const env = createEnv({
  clientPrefix: 'EXPO_PUBLIC_',
  client: {
    EXPO_PUBLIC_SERVER_URL: z.url(),
  },
  runtimeEnv,
  emptyStringAsUndefined: true,
})
