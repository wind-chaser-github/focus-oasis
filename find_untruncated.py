import json

with open('/Users/chaser/.gemini/antigravity-ide/brain/ac8d33e3-c641-4dfc-a916-af10ce57f4f7/.system_generated/logs/transcript.jsonl', 'r') as f:
    for i, line in enumerate(f):
        if 'crystalMaterialRef' in line:
            data = json.loads(line)
            # Find any CodeContent or User Input that has this
            if data.get('source') == 'USER_EXPLICIT':
                print(f"FOUND IN USER INPUT at step {data.get('step_index', i)}")
                with open('user_crystal.tsx', 'w') as out:
                    out.write(data.get('content', ''))
            
            tool_calls = data.get('tool_calls', [])
            for call in tool_calls:
                if call['name'] in ['write_to_file', 'replace_file_content']:
                    c = call['args'].get('CodeContent', call['args'].get('ReplacementContent', ''))
                    if 'crystalMaterialRef' in c and '<truncated' not in c:
                        print(f"FOUND UNTRUNCATED WRITE at step {data.get('step_index', i)}")
                        with open('write_crystal.tsx', 'w') as out:
                            out.write(c)
