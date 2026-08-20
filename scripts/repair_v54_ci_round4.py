from pathlib import Path

path = Path('frontend/main.jsx')
text = path.read_text()

old = '''      const paintInterval = boostRef.current ? 30 : 180;
      if (!reduced && time - lastPaint < paintInterval) { frame = requestAnimationFrame(draw); return; }
      lastPaint = time;'''
new = '''      const paintInterval = boostRef.current ? 30 : 220;
      if (!reduced && time - lastPaint < paintInterval) {
        frame = requestAnimationFrame(draw);
        return;
      }
      lastPaint = time;'''
assert text.count(old) == 1, f'paint interval authority mismatch: {text.count(old)}'
text = text.replace(old, new, 1)

old = '      if (!reduced) frame = requestAnimationFrame(draw);\n'
assert text.count(old) >= 2, f'draw scheduling authority mismatch: {text.count(old)}'
# Replace only the ComputationalField occurrence (first occurrence in file).
new = '''      if (!reduced) {
        if (boostRef.current) frame = requestAnimationFrame(draw);
        else window.setTimeout(() => { frame = requestAnimationFrame(draw); }, 180);
      }
'''
text = text.replace(old, new, 1)

path.write_text(text)
