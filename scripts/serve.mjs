import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve("out");
const port = Number(process.env.PORT || 3100);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".json": "application/json",
};
http
  .createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      let file = resolve(root, "." + pathname);
      if (file !== root && !file.startsWith(root + sep)) {
        res.writeHead(403).end();
        return;
      }
      const candidates =
        pathname === "/"
          ? [resolve(root, "index.html")]
          : [file, file + ".html", resolve(file, "index.html")];
      let found = false;
      for (const candidate of candidates) {
        try {
          if ((await stat(candidate)).isFile()) {
            file = candidate;
            found = true;
            break;
          }
        } catch {}
      }
      if (!found) throw new Error("Not found");
      const data = await readFile(file);
      res
        .writeHead(200, {
          "Content-Type": mime[extname(file)] || "application/octet-stream",
          "Cache-Control": "no-store",
        })
        .end(data);
    } catch {
      res
        .writeHead(404, { "Content-Type": "text/html" })
        .end(
          await readFile(resolve(root, "404.html")).catch(() => "Not found"),
        );
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Aixion static preview: http://127.0.0.1:${port} (out/)`),
  );
