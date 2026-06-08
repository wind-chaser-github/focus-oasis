import json

def get_latest_content_before_step(filename, max_step=1140):
    content = None
    with open('/Users/chaser/.gemini/antigravity-ide/brain/ac8d33e3-c641-4dfc-a916-af10ce57f4f7/.system_generated/logs/transcript.jsonl', 'r') as f:
        for line in f:
            try:
                data = json.loads(line)
                step = data.get('step_index', 0)
                if step >= max_step:
                    break
                
                # Check for write_to_file
                tool_calls = data.get('tool_calls', [])
                for call in tool_calls:
                    if call.get('name') == 'write_to_file':
                        args = call.get('args', {})
                        if filename in args.get('TargetFile', ''):
                            c = args.get('CodeContent', '')
                            if c.startswith('"'):
                                try:
                                    c = json.loads(c)
                                except:
                                    pass
                            if not "<truncated" in c:
                                content = c
                                
            except Exception as e:
                pass
    return content

files_to_restore = [
    'src/components/canvas/Plant.tsx',
    'src/components/ui/Overlay.tsx',
    'src/components/ui/Timer.tsx',
    'src/store/useTimerStore.ts',
    'src/index.css',
    'src/App.tsx',
    'src/components/canvas/Scene.tsx'
]

for f in files_to_restore:
    c = get_latest_content_before_step(f)
    if c:
        with open(f, 'w') as out:
            out.write(c)
        print("Restored:", f)
    else:
        print("Could not find full content for:", f)
