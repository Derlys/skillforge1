const fs = require('node:fs')
const path = require('node:path')

// Load environment variables from env file (preferred) or .env file
const envFile = path.join(__dirname, 'env')
const dotEnvFile = path.join(__dirname, '.env')
const env = {}

// Try to load from 'env' file first, then fallback to '.env'
const fileToLoad = fs.existsSync(envFile) ? envFile : dotEnvFile

if (fs.existsSync(fileToLoad)) {
  const content = fs.readFileSync(fileToLoad, 'utf8')
  const lines = content.split('\n')

  lines.forEach((line) => {
    const trimmed = line.trim()
    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith('#')) {
      return
    }

    const [key, ...valueParts] = trimmed.split('=')
    if (key) {
      const value = valueParts.join('=').trim()
      const keyTrimmed = key.trim()
      env[keyTrimmed] = value
      // CRITICAL: Set in process.env BEFORE module.exports
      // Expo reads EXPO_PUBLIC_* from process.env during build
      process.env[keyTrimmed] = value
    }
  })
}

// Debug: Log loaded env vars (only in development)
if (process.env.NODE_ENV !== 'production') {
  console.log('[app.config.js] Loaded env vars:', Object.keys(env))
  console.log(
    '[app.config.js] EXPO_PUBLIC_SERVER_URL:',
    process.env.EXPO_PUBLIC_SERVER_URL,
  )
}

module.exports = {
  expo: {
    scheme: 'solana-mobile-stack',
    userInterfaceStyle: 'automatic',
    orientation: 'default',
    web: {
      bundler: 'metro',
    },
    name: 'solana-mobile-stack',
    slug: 'solana-mobile-stack',
    plugins: ['expo-font', 'react-native-quick-crypto', 'expo-secure-store'],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    android: {
      package: 'com.anonymous.solanamobilestack',
    },
    ios: {
      bundleIdentifier: 'com.anonymous.solanamobilestack',
    },
    extra: {
      // Expose env variables through Constants.expoConfig.extra as fallback
      ...env,
    },
  },
}
