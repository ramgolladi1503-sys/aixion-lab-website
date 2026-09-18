import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL("..", import.meta.url)), "out");
const port = Number(process.env.PORT || 3000);

createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url || "/", `http://127.0.0.1:${port}`).pathname);
  const safe = normalize(pathname).replace(/^([.][.][/\\])+/, "");
  const candidates = [join(root, safe), join(root, `${safe}.html`), join(root, safe, "index.html")];
  if (safe === "/") candidates.unshift(join(root, "index.html"));
  for (const file of candidates) {
    try { const body = await readFile(file); const type = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".json": "application/json" }[extname(file)] || "application/octet-stream"; response.statusCode = 200; response.setHeader("content-type", type); response.end(body); return; } catch {}
  }
  try { response.statusCode = 404; response.setHeader("content-type", "text/html; charset=utf-8"); response.end(await readFile(join(root, "404.html"))); } catch { response.statusCode = 404; response.end("Not found"); }
}).listen(port, "127.0.0.1");
