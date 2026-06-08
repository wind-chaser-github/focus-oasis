import json

with open('src/components/ui/Overlay.tsx', 'r') as f:
    content = f.read()

if content.startswith('"') and content.endswith('"'):
    try:
        content = json.loads(content)
        with open('src/components/ui/Overlay.tsx', 'w') as f:
            f.write(content)
        print("Fixed JSON string quoting!")
    except:
        pass
