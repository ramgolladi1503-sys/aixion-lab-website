"""Export full changed text files and binary hashes for local review, without publishing artifacts."""
from pathlib import Path
import hashlib
import subprocess
root = Path(__file__).resolve().parents[1]
paths = set(subprocess.check_output(['git', 'diff', '--name-only', 'HEAD'], cwd=root, text=True).splitlines())
paths.update(subprocess.check_output(['git', 'ls-files', '--others', '--exclude-standard'], cwd=root, text=True).splitlines())
out = root / 'artifacts' / 'changed-source-review.md'
out.parent.mkdir(exist_ok=True)
with out.open('w') as stream:
    stream.write('# Complete changed-source review\n\nGenerated from the isolated rebuild working tree. Deleted files remain available in Git history. Binary files are identified by SHA-256.\n\n')
    for name in sorted(paths):
        path = root / name
        stream.write(f'## {name}\n\n')
        if not path.exists():
            stream.write('Deleted from runtime; preserved in Git history.\n\n')
            continue
        data = path.read_bytes()
        try:
            text = data.decode('utf-8')
        except UnicodeDecodeError:
            stream.write(f'Binary: {len(data)} bytes; SHA-256 `{hashlib.sha256(data).hexdigest()}`\n\n')
            continue
        fence = '`' * 8
        stream.write(f'{fence}\n{text}\n{fence}\n\n')
print(out)
