import re

with open('very_first_overlay.txt', 'r') as f:
    lines = f.readlines()

code_lines = []
for line in lines:
    match = re.match(r'^\d+:\s(.*)$', line)
    if match:
        code_lines.append(match.group(1))

if code_lines:
    with open('src/components/ui/Overlay.tsx', 'w') as f:
        f.write('\n'.join(code_lines))
    print("Rewrote exactly to the first snapshot!")
else:
    print("Could not parse lines")
