from pathlib import Path

path = Path('frontend/main.jsx')
text = path.read_text()

old_guard = '''    if (key === page && !deep && !routingRef.current) return;'''
new_guard = '''    if (routingRef.current?.key === key) return;\n    if (key === page && !deep && !routingRef.current) return;'''
assert text.count(old_guard) == 1, f'guard authority mismatch: {text.count(old_guard)}'
text = text.replace(old_guard, new_guard, 1)

old_button = '''onBlur={() => setHovered(null)} onClick={(event) => navigate(node.key, event.currentTarget)} aria-label={`Open ${node.label}`}'''
new_button = '''onBlur={() => setHovered(null)} onPointerUp={(event) => navigate(node.key, event.currentTarget)} onClick={(event) => navigate(node.key, event.currentTarget)} aria-label={`Open ${node.label}`}'''
assert text.count(old_button) == 1, f'home-node authority mismatch: {text.count(old_button)}'
text = text.replace(old_button, new_button, 1)

path.write_text(text)
