from pathlib import Path

path = Path('frontend/main.jsx')
text = path.read_text()

old = '''      <span className="entry-emblem-shell"><Emblem className="entry-emblem"/></span>\n      <small>ENTER</small>\n    </button>\n  </main>;'''
new = '''      <span className="entry-emblem-shell"><Emblem className="entry-emblem"/></span>\n      <small>ENTER</small>\n    </button>\n    <div className="entry-context" aria-hidden="true">\n      <strong>ENGINEERING · AI · RESEARCH</strong>\n      <span>Systems built to be challenged, observed and proven.</span>\n    </div>\n  </main>;'''

count = text.count(old)
assert count == 1, f'entry authority mismatch: {count}'
path.write_text(text.replace(old, new, 1))
