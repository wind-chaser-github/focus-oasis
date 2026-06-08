import json

with open('/Users/chaser/.gemini/antigravity-ide/brain/ac8d33e3-c641-4dfc-a916-af10ce57f4f7/.system_generated/logs/transcript.jsonl', 'r') as f:
    for i, line in enumerate(f):
        if 'crystalMaterialRef' in line:
            data = json.loads(line)
            content = data.get('content', '')
            if content and 'crystalMaterialRef' in content and '<truncated' not in content:
                print(f"FOUND IN MODEL CONTENT at step {data.get('step_index', i)}")
                with open(f"model_crystal_{data.get('step_index', i)}.tsx", 'w') as out:
                    out.write(content)
