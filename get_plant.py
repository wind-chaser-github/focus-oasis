import json

with open('/Users/chaser/.gemini/antigravity-ide/brain/ac8d33e3-c641-4dfc-a916-af10ce57f4f7/.system_generated/logs/transcript.jsonl', 'r') as f:
    for i, line in enumerate(f):
        if 'export const Plant' in line:
            data = json.loads(line)
            content = ""
            
            if 'tool_calls' in data:
                for call in data['tool_calls']:
                    if call['name'] in ['write_to_file', 'replace_file_content']:
                        if 'Plant.tsx' in call['args'].get('TargetFile', ''):
                            content = call['args'].get('CodeContent', call['args'].get('ReplacementContent', ''))
            
            if not content and 'content' in data:
                content = data['content']
            
            if content and 'export const Plant' in content and '<truncated' not in content:
                print(f"FOUND Plant at step {data.get('step_index', i)}")
                with open(f"true_plant_{data.get('step_index', i)}.tsx", "w") as out:
                    out.write(content)
