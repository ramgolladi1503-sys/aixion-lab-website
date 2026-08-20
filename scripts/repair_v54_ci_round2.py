from pathlib import Path

path = Path('frontend/main.jsx')
text = path.read_text()

replacements = [
    ('const points = Array.from({ length: 96 },', 'const points = Array.from({ length: 64 },'),
    ('for (let j = i + 1; j < Math.min(points.length, i + 6); j += 1) {', 'for (let j = i + 1; j < Math.min(points.length, i + 5); j += 1) {'),
    ('for (let index = 0; index < 18; index += 1) {', 'for (let index = 0; index < 10; index += 1) {'),
    ('    const draw = (time) => {\n      context.clearRect(0, 0, width, height);', '    let lastPaint = 0;\n    const draw = (time) => {\n      if (!reduced && time - lastPaint < 30) { frame = requestAnimationFrame(draw); return; }\n      lastPaint = time;\n      context.clearRect(0, 0, width, height);'),
    ('onPointerUp={(event) => navigate(node.key, event.currentTarget)} onClick={(event) => navigate(node.key, event.currentTarget)}', 'onPointerDown={(event) => navigate(node.key, event.currentTarget)} onClick={(event) => navigate(node.key, event.currentTarget)}'),
]

for old, new in replacements:
    count = text.count(old)
    assert count == 1, f'authority mismatch for {old!r}: {count}'
    text = text.replace(old, new, 1)

path.write_text(text)
