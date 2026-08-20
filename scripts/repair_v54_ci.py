from pathlib import Path

path = Path('frontend/main.jsx')
text = path.read_text()

replacements = [
    ('const points = Array.from({ length: 168 },', 'const points = Array.from({ length: 96 },'),
    ('for (let j = i + 1; j < Math.min(points.length, i + 9); j += 1) {', 'for (let j = i + 1; j < Math.min(points.length, i + 6); j += 1) {'),
    ('for (let index = 0; index < 34; index += 1) {', 'for (let index = 0; index < 18; index += 1) {'),
    ('if (key === page && !deep && !routingRef.current) return;', 'if (pathFor(key) === window.location.pathname && !deep && !routingRef.current) return;'),
    ('const commitTimer = window.setTimeout(commit, reduced ? 90 : 430);', 'const commitTimer = window.setTimeout(commit, reduced ? 140 : 430);'),
    ('const completeTimer = window.setTimeout(complete, reduced ? 280 : 980);', 'const completeTimer = window.setTimeout(complete, reduced ? 680 : 980);'),
    ('timeline.to(veil, { opacity: 1, duration: 0.08 }).call(commit).to(veil, { opacity: 0, duration: 0.12 });', 'timeline.to(veil, { opacity: 1, duration: 0.12 }).call(commit).to(veil, { opacity: 1, duration: 0.18 }).to(veil, { opacity: 0, duration: 0.24 });'),
]

for old, new in replacements:
    count = text.count(old)
    assert count == 1, f'authority mismatch for {old!r}: {count}'
    text = text.replace(old, new, 1)

# Lower DPR only for the primary computational field; preserve Deep Space fidelity.
old = 'dpr = Math.min(window.devicePixelRatio || 1, 1.5);'
assert text.count(old) == 2, f'dpr authority mismatch: {text.count(old)}'
text = text.replace(old, 'dpr = Math.min(window.devicePixelRatio || 1, 1.25);', 1)

path.write_text(text)
