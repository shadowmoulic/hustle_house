import os
import re

html_files = []
for root, dirs, files in os.walk('.'):
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

favicon_tags = """    <link rel="icon" type="image/png" href="/logo.png">
    <link rel="shortcut icon" type="image/png" href="/logo.png">
    <link rel="apple-touch-icon" href="/logo.png">"""

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if '<link rel="icon"' in content or '<link rel="shortcut icon"' in content:
        content = re.sub(r'\s*<link rel="icon"[^\>]*>', '', content)
        content = re.sub(r'\s*<link rel="shortcut icon"[^\>]*>', '', content)
        content = re.sub(r'\s*<link rel="apple-touch-icon"[^\>]*>', '', content)
        
        if '</title>' in content:
            content = content.replace('</title>', '</title>\n' + favicon_tags, 1)
        
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f'Updated {filepath}')
