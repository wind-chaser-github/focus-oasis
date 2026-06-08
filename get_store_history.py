import json
with open('/Users/chaser/.gemini/antigravity-ide/brain/ac8d33e3-c641-4dfc-a916-af10ce57f4f7/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            tool_calls = data.get('tool_calls', [])
            for call in tool_calls:
                if call.get('name') == 'write_to_file':
                    args = call.get('args', {})
                    if 'useTimerStore.ts' in args.get('TargetFile', ''):
                        print("==== STORE WRITE ====")
                        content = args.get('CodeContent', '')
                        if content.startswith('"'):
                            try:
                                content = json.loads(content)
                            except:
                                pass
                        print(content[:300])
        except Exception as e:
            pass
