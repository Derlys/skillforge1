const fs = require('node:fs')
const path = './src/features/home/screens/home-screen.tsx'
let txt = fs.readFileSync(path, 'utf8')

txt = txt.replace(/bg-white/g, 'bg-background')
txt = txt.replace(/text-gray-900 dark:text-white/g, 'text-foreground')
txt = txt.replace(/text-gray-500 dark:text-\[#8A8A93\]/g, 'text-muted')
txt = txt.replace(/text-black/g, 'text-foreground')
txt = txt.replace(/border-gray-200/g, 'border-border/10')

fs.writeFileSync(path, txt, 'utf8')
console.log('Fixed home-screen.tsx')
