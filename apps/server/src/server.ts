import { env } from '@solana-mobile-stack/env/server'
import app from './index.js'

const port = env.PORT

Bun.serve({
  port,
  fetch: app.fetch,
})

console.log(`🚀 Server running at http://localhost:${port}`)
