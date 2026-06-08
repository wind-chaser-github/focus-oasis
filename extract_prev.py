import json
import glob
import re

files = glob.glob('/Users/chaser/.gemini/antigravity-ide/brain/5c2a2d9e-dceb-43ae-87ac-011b77062e90/.system_generated/logs/transcript.jsonl')

if not files:
    print("No previous transcript found")
else:
    with open(files[0], 'r') as f:
        for line in f:
            try:
                data = json.loads(line)
                content = data.get('content', '')
                if 'export const Overlay = ' in content and 'src/components/ui/Overlay.tsx' in content:
                    print(content)
            except:
                pass
