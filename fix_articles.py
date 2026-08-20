import os
import re

files = [
    r"c:\HandsOn\handson-app\src\app\(site)\engenharia-reversa-software\page.tsx",
    r"c:\HandsOn\handson-app\src\app\(site)\modernizacao-sistemas-legados\page.tsx",
    r"c:\HandsOn\handson-app\src\app\(site)\sistema-sem-codigo-fonte\page.tsx",
    r"c:\HandsOn\handson-app\src\app\(site)\excel-para-sistema\page.tsx",
    r"c:\HandsOn\handson-app\src\app\(site)\migracao-access\page.tsx",
]

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Reduce top padding. Change py-16 to pt-4 pb-16 in the article tag
    content = content.replace("py-16 prose", "pt-4 pb-16 prose")

    # 2. Break paragraphs by period. 
    # Find all <p>...</p> tags that are not part of the Call To Action section.
    # The CTA section has <p className="text-lg...">
    
    def process_p_tag(match):
        p_attrs = match.group(1)
        p_content = match.group(2).strip()
        
        # Don't break if it has className (like the CTA)
        if 'className' in p_attrs:
            return match.group(0)
            
        # Split by ". "
        sentences = []
        parts = p_content.split('. ')
        for i, part in enumerate(parts):
            if i < len(parts) - 1:
                sentences.append(part + '.')
            else:
                sentences.append(part)
                
        # Join with </p>\n<p>
        new_content = "\n        </p>\n        <p>\n          ".join(sentences)
        return f"<p{p_attrs}>\n          {new_content}\n        </p>"

    # Use regex to find <p>...</p> (non-greedy)
    new_content = re.sub(r'<p([^>]*)>(.*?)</p>', process_p_tag, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Done")
