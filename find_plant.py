import json

with open('/Users/chaser/.gemini/antigravity-ide/brain/ac8d33e3-c641-4dfc-a916-af10ce57f4f7/.system_generated/logs/transcript.jsonl', 'r') as f:
    for i, line in enumerate(f):
        if 'Plant' in line and 'export' in line:
            try:
                data = json.loads(line)
                content = ""
                # Check tool calls
                if 'tool_calls' in data:
                    for call in data['tool_calls']:
                        if call['name'] == 'write_to_file':
                            if 'Plant.tsx' in call['args'].get('TargetFile', ''):
                                content = call['args'].get('CodeContent', '')
                # Check content
                if 'content' in data:
                    content = data['content']
                
                if content and len(content) > 1000 and '<truncated' not in content:
                    print(f"FOUND NON-TRUNCATED Plant.tsx at step {data.get('step_index', i)}!")
                    with open(f"plant_candidate_{data.get('step_index', i)}.tsx", "w") as out:
                        out.write(content)
            except Exception as e:
                pass
