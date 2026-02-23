import { expo } from '@better-auth/expo'
import { solanaAuth } from '@skillforge1/better-auth-solana'
import { db } from '@skillforge1/db'
import * as schema from '@skillforge1/db/schema/auth'
import { env } from '@skillforge1/env/server'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',

    schema: schema,
  }),
  trustedOrigins: [
    ...env.CORS_ORIGINS,
    ...(env.NODE_ENV === 'development'
      ? [
          'exp://',
          'exp://**',
          'skillforge1://**',
          'exp://192.168.*.*:*/**',
          'http://localhost:8081',
        ]
      : []),
  ],
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    },
  },
  plugins: [
    expo(),
    solanaAuth({
      domain: new URL(env.BETTER_AUTH_URL).hostname,
      anonymous: true,
      cluster: env.SOLANA_CLUSTER,
      emailDomainName: env.SOLANA_EMAIL_DOMAIN,
    }),
  ],
})
