from pathlib import Path

path = Path('frontend/main.jsx')
text = path.read_text()

# Make pointer parallax event-driven; CSS already smooths the transform.
start = text.index('function PointerVariables() {')
end = text.index('\nfunction CursorSystem()', start)
replacement = '''function PointerVariables() {
  useEffect(() => {
    const root = document.documentElement;
    const move = (event) => {
      const x = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      const y = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
      root.style.setProperty("--mx", x.toFixed(4));
      root.style.setProperty("--my", y.toFixed(4));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return null;
}
'''
text = text[:start] + replacement + text[end:]

replacements = [
    ('if (!reduced && time - lastPaint < 30) { frame = requestAnimationFrame(draw); return; }', 'const paintInterval = boostRef.current ? 30 : 180;\n      if (!reduced && time - lastPaint < paintInterval) { frame = requestAnimationFrame(draw); return; }'),
    ('timeline.to(veil, { opacity: 1, duration: 0.12 }).call(commit).to(veil, { opacity: 1, duration: 0.18 }).to(veil, { opacity: 0, duration: 0.24 });', 'timeline.to(veil, { opacity: 1, duration: 0.12 }).call(commit).to(veil, { opacity: 1, duration: 0.85 }).to(veil, { opacity: 0, duration: 0.20 });'),
]
for old, new in replacements:
    count = text.count(old)
    assert count == 1, f'authority mismatch for {old!r}: {count}'
    text = text.replace(old, new, 1)

path.write_text(text)
