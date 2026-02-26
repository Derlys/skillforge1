const fs = require('node:fs')
const path = require('node:path')

const replacements = [
  { search: /bg-\[#0F101A\]/g, replace: 'bg-background' },
  { search: /bg-\[#161721\]/g, replace: 'bg-card' },
  { search: /bg-\[#252836\]/g, replace: 'bg-surface' },
  { search: /text-\[#8A8A93\]/g, replace: 'text-muted' },
  // Be careful with exactly matching text-white logic.
  // text-white is so common, but we will replace it since it represents the foreground.
  { search: /text-white/g, replace: 'text-foreground' },
  { search: /border-white\/10/g, replace: 'border-border/10' },
  { search: /border-white\/5/g, replace: 'border-border/5' },
  { search: /bg-white\/5/g, replace: 'bg-foreground/5' },
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
      for (const { search, replace } of replacements) {
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
