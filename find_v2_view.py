import json
import re

with open('/Users/chaser/.gemini/antigravity-ide/brain/ac8d33e3-c641-4dfc-a916-af10ce57f4f7/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            content = data.get('content', '')
            if 'Total Lines:' in content and 'Plant.tsx' in content and 'crystalRef' in content:
                # We found a view_file output for V2 Plant.tsx!
                lines = content.split('\n')
                code_lines = []
                for cl in lines:
                    match = re.match(r'^\d+:\s(.*)$', cl)
                    if match:
                        code_lines.append(match.group(1))
                if code_lines:
                    with open('src/components/canvas/Plant.tsx', 'w') as out:
                        out.write('\n'.join(code_lines))
                    print("Extracted FULL V2 Plant.tsx from transcript!")
                    exit(0)
        except Exception as e:
            pass
