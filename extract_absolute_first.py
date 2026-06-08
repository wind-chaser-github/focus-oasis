import json

with open('/Users/chaser/.gemini/antigravity-ide/brain/ac8d33e3-c641-4dfc-a916-af10ce57f4f7/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            tool_calls = data.get('tool_calls', [])
            for call in tool_calls:
                if call.get('name') == 'write_to_file':
                    args = call.get('args', {})
                    if 'Overlay.tsx' in args.get('TargetFile', ''):
                        content = args.get('CodeContent', '')
                        with open('src/components/ui/Overlay.tsx', 'w') as out:
                            out.write(content)
                        print("Wrote first Overlay.tsx!")
                        exit(0)
        except:
            pass
