import json

with open('/Users/chaser/.gemini/antigravity-ide/brain/ac8d33e3-c641-4dfc-a916-af10ce57f4f7/.system_generated/logs/transcript.jsonl', 'r') as f:
    for i, line in enumerate(f):
        if 'crystalMaterialRef' in line:
            try:
                data = json.loads(line)
                content = ""
                # Check tool calls
                if 'tool_calls' in data:
                    for call in data['tool_calls']:
                        if call['name'] == 'write_to_file' or call['name'] == 'replace_file_content':
                            if 'Plant.tsx' in call['args'].get('TargetFile', ''):
                                content = call['args'].get('CodeContent', call['args'].get('ReplacementContent', ''))
                # Check content
                if 'content' in data:
                    content = data['content']
                
                if content and 'crystalMaterialRef' in content:
                    print(f"FOUND crystalMaterialRef at step {data.get('step_index', i)}!")
                    # Just save the whole content to see what it is
                    with open(f"crystal_candidate_{data.get('step_index', i)}.tsx", "w") as out:
                        out.write(content)
            except Exception as e:
                pass
