import os
import glob
import re

# Get all tsx files in src/app/(site)/
files = glob.glob(r'c:\HandsOn\handson-app\src\app\(site)\**\page.tsx', recursive=True)

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content

    # Add import Image if not present and if there's an img tag
    if '<img' in content and 'import Image' not in content:
        # Find the first import and add it before
        if 'import' in content:
            content = re.sub(r'^(import.*?)$', r"import Image from 'next/image'\n\1", content, count=1, flags=re.MULTILINE)
        else:
            content = "import Image from 'next/image'\n\n" + content
    
    # Replace <img src="..." alt="..." className="..."> with <Image src="..." alt="..." className="..." width={1200} height={800} />
    def replace_img(match):
        attrs = match.group(1)
        # Check if width/height are already present
        if 'width=' not in attrs:
            attrs += ' width={1200} height={800}'
        return f"<Image{attrs} />"

    content = re.sub(r'<img\s+([^>]+?)\s*/?>', replace_img, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

print("Done")
