import json
import re

files_to_restore = [
    'src/components/ui/Overlay.tsx',
    'src/components/ui/Timer.tsx',
    'src/store/useTimerStore.ts',
    'src/index.css',
    'src/App.tsx',
    'src/components/canvas/Scene.tsx'
]

latest_views = {f: None for f in files_to_restore}

with open('/Users/chaser/.gemini/antigravity-ide/brain/ac8d33e3-c641-4dfc-a916-af10ce57f4f7/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            step = data.get('step_index', 0)
            if step > 1140:
                break
            content = data.get('content', '')
            if 'Total Lines:' in content and 'File Path:' in content:
                for filename in files_to_restore:
                    if filename in content:
                        lines = content.split('\n')
                        code_lines = []
                        for cl in lines:
                            match = re.match(r'^\d+:\s(.*)$', cl)
                            if match:
                                code_lines.append(match.group(1))
                        # Check if the view is truncated
                        if len(code_lines) > 0 and '<truncated' not in code_lines[-1]:
                            latest_views[filename] = '\n'.join(code_lines)
        except Exception as e:
            pass

for f, c in latest_views.items():
    if c:
        with open(f, 'w') as out:
            out.write(c)
        print("Restored from VIEW_FILE:", f)
    else:
        print("Could not find full view for:", f)
