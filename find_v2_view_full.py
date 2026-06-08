import json
import re

with open('/Users/chaser/.gemini/antigravity-ide/brain/ac8d33e3-c641-4dfc-a916-af10ce57f4f7/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            content = data.get('content', '')
            if 'Total Lines:' in content and 'Plant.tsx' in content and 'crystalRef' in content:
                print("FOUND A VIEW_FILE WITH CRYSTALREF!")
                lines = content.split('\n')
                code_lines = []
                for cl in lines:
                    match = re.match(r'^\d+:\s(.*)$', cl)
                    if match:
                        code_lines.append(match.group(1))
                if code_lines:
                    print("Number of lines extracted:", len(code_lines))
                    print(code_lines[-10:]) # print last 10 lines
        except Exception as e:
            pass
