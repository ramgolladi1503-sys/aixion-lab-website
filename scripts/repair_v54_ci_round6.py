from pathlib import Path

path = Path('frontend/main.jsx')
text = path.read_text()

# Add an explicit wake hook for the computational field so idle Home schedules no rAF loop.
old = '''  const modeRef = useRef(mode);
  const boostRef = useRef(boost);
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { boostRef.current = boost; }, [boost]);'''
new = '''  const modeRef = useRef(mode);
  const boostRef = useRef(boost);
  const wakeRef = useRef(null);
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => {
    boostRef.current = boost;
    wakeRef.current?.();
  }, [boost]);'''
assert text.count(old) == 1, f'boost authority mismatch: {text.count(old)}'
text = text.replace(old, new, 1)

old = '''    let frame = 0;

    const resize = () => {'''
new = '''    let frame = 0;

    const resize = () => {'''
assert text.count(old) >= 2, f'frame authority mismatch: {text.count(old)}'
# no-op authority check; retained intentionally

old = '''      const paintInterval = boostRef.current ? 30 : 220;
      if (!reduced && time - lastPaint < paintInterval) {
        frame = requestAnimationFrame(draw);
        return;
      }
      lastPaint = time;'''
new = '''      if (!reduced && boostRef.current && time - lastPaint < 30) {
        frame = requestAnimationFrame(draw);
        return;
      }
      lastPaint = time;'''
assert text.count(old) == 1, f'paint throttle authority mismatch: {text.count(old)}'
text = text.replace(old, new, 1)

old = '''      if (!reduced) {
        if (boostRef.current) frame = requestAnimationFrame(draw);
        else window.setTimeout(() => { frame = requestAnimationFrame(draw); }, 2000);
      }
    };

    resize();'''
new = '''      if (!reduced && boostRef.current) frame = requestAnimationFrame(draw);
    };

    wakeRef.current = () => {
      if (!reduced) frame = requestAnimationFrame(draw);
    };

    resize();'''
assert text.count(old) == 1, f'idle scheduler authority mismatch: {text.count(old)}'
text = text.replace(old, new, 1)

old = '''    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, []);'''
new = '''    return () => {
      wakeRef.current = null;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, []);'''
assert text.count(old) == 1, f'cleanup authority mismatch: {text.count(old)}'
text = text.replace(old, new, 1)

path.write_text(text)
