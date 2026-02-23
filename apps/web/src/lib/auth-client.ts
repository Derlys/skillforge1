import { solanaAuthClient } from '@skillforge1/better-auth-solana/client'
import { env } from '@skillforge1/env/web'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: env.VITE_SERVER_URL,
  plugins: [solanaAuthClient()],
})
