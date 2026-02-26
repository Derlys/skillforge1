#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')

const envFile = path.join(__dirname, 'env')

if (fs.existsSync(envFile)) {
  const content = fs.readFileSync(envFile, 'utf8')
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
      process.env[key.trim()] = value
    }
  })
}
