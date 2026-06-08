import json

with open('/Users/chaser/.gemini/antigravity-ide/brain/ac8d33e3-c641-4dfc-a916-af10ce57f4f7/.system_generated/logs/transcript.jsonl', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            tool_calls = data.get('tool_calls', [])
            for call in tool_calls:
                if call.get('name') == 'run_command':
                    args = call.get('args', {})
                    cmd = args.get('CommandLine', '')
                    if 'curl' in cmd or 'wget' in cmd or 'npm install' in cmd:
                        print("CMD:", cmd)
        except Exception as e:
            pass
