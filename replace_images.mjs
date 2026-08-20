import fs from 'fs'
import path from 'path'
import { globSync } from 'glob' // Next.js projects usually have glob or I can just write a recursive readdir

const dir = './src/app/(site)'

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      if (file.endsWith('.tsx')) {
        arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
      }
    }
  })

  return arrayOfFiles
}

const files = getAllFiles(dir, [])

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8')
  const original = content

  if (content.includes('<img') && !content.includes('import Image')) {
    if (content.includes('import ')) {
      content = content.replace(/^(import.*)$/m, "import Image from 'next/image'\n$1")
    } else {
      content = "import Image from 'next/image'\n\n" + content
    }
  }

  content = content.replace(/<img\s+([^>]+?)\s*\/?>/g, (match, attrs) => {
    if (!attrs.includes('width=')) {
      attrs += ' width={1200} height={800}'
    }
    return `<Image ${attrs.trim()} />`
  })

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8')
    console.log('Updated ' + file)
  }
})
