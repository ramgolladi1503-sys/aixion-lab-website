from pathlib import Path

path = Path('frontend/main.jsx')
text = path.read_text()

old = '''        if (boostRef.current) frame = requestAnimationFrame(draw);
        else window.setTimeout(() => { frame = requestAnimationFrame(draw); }, 180);'''
new = '''        if (boostRef.current) frame = requestAnimationFrame(draw);
        else window.setTimeout(() => { frame = requestAnimationFrame(draw); }, 2000);'''
assert text.count(old) == 1, f'idle scheduler authority mismatch: {text.count(old)}'
text = text.replace(old, new, 1)

path.write_text(text)
