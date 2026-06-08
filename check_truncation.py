import json

with open('/Users/chaser/.gemini/antigravity-ide/brain/ac8d33e3-c641-4dfc-a916-af10ce57f4f7/.system_generated/logs/transcript.jsonl', 'r') as f:
    writes = []
    for line in f:
        try:
            data = json.loads(line)
            tool_calls = data.get('tool_calls', [])
            for call in tool_calls:
                if call.get('name') == 'write_to_file':
                    args = call.get('args', {})
                    if 'Plant.tsx' in args.get('TargetFile', ''):
                        content = args.get('CodeContent', '')
                        writes.append(content)
        except Exception as e:
            pass
    print("Write 0 truncated:", "<truncated" in writes[0])
    if len(writes) > 1:
        print("Write 1 truncated:", "<truncated" in writes[1])
        print("Write 1 length:", len(writes[1]))
