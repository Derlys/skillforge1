const fs = require('node:fs')
const path = require('node:path')

const exactReplacements = [
  {
    search: /bg-background\/30/g,
    replace: 'bg-[#F3F4F6]/30 dark:bg-[#0F101A]/30',
  },
  { search: /bg-background/g, replace: 'bg-[#F3F4F6] dark:bg-[#0F101A]' },
  { search: /bg-card/g, replace: 'bg-white dark:bg-[#161721]' },
  { search: /bg-surface/g, replace: 'bg-gray-100 dark:bg-[#252836]' },
  {
    search: /text-foreground\/80/g,
    replace: 'text-gray-900/80 dark:text-white/80',
  },
  {
    search: /text-foreground\/50/g,
    replace: 'text-gray-900/50 dark:text-white/50',
  },
  {
    search: /text-foreground\/40/g,
    replace: 'text-gray-900/40 dark:text-white/40',
  },
  { search: /text-foreground/g, replace: 'text-gray-900 dark:text-white' },
  { search: /text-muted/g, replace: 'text-gray-500 dark:text-[#8A8A93]' },
  {
    search: /border-border\/10/g,
    replace: 'border-black/10 dark:border-white/10',
  },
  {
    search: /border-border\/5/g,
    replace: 'border-black/5 dark:border-white/5',
  },
  { search: /bg-foreground\/5/g, replace: 'bg-black/5 dark:bg-white/5' },
]

function processDirectory(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath)
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8')
      const original = content
      for (const { search, replace } of exactReplacements) {
        content = content.replace(search, replace)
      }
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8')
        console.log('Updated', fullPath)
      }
    }
  }
}

processDirectory('./app')
processDirectory('./src')
console.log('Done')
