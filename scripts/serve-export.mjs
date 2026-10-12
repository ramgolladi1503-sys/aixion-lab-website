import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";

const exportRoot = resolve(process.cwd(), "out");
const portIndex = process.argv.indexOf("--port");
const port = Number(portIndex === -1 ? process.env.PORT ?? "4173" : process.argv[portIndex + 1]);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("Static export preview port must be an integer between 1 and 65535.");
}

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
  [".xml", "application/xml; charset=utf-8"],
]);

function resolveCandidates(requestUrl) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(requestUrl, "http://localhost").pathname);
  } catch {
    return null;
  }

  const target = resolve(exportRoot, `.${pathname}`);
  if (target !== exportRoot && !target.startsWith(`${exportRoot}${sep}`)) return null;

  if (pathname.endsWith("/")) return [join(target, "index.html")];
  if (extname(target)) return [target];
  return [`${target}.html`, join(target, "index.html")];
}

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD", "Content-Length": "0" });
    response.end();
    return;
  }

  const candidates = resolveCandidates(request.url ?? "/");
  if (!candidates) {
    response.writeHead(400, { "Content-Length": "0", "X-Content-Type-Options": "nosniff" });
    response.end();
    return;
  }

  let body;
  let filePath;
  for (const candidate of candidates) {
    try {
      body = await readFile(candidate);
      filePath = candidate;
      break;
    } catch (error) {
      if (error?.code !== "ENOENT" && error?.code !== "ENOTDIR") {
        response.writeHead(500, { "Content-Length": "0", "X-Content-Type-Options": "nosniff" });
        response.end();
        return;
      }
    }
  }

  let status = 200;
  if (!body) {
    try {
      body = await readFile(join(exportRoot, "404.html"));
      filePath = join(exportRoot, "404.html");
      status = 404;
    } catch {
      response.writeHead(404, { "Content-Length": "0", "X-Content-Type-Options": "nosniff" });
      response.end();
      return;
    }
  }

  const headers = {
    "Cache-Control": request.url?.startsWith("/_next/static/") ? "public, max-age=31536000, immutable" : "no-cache",
    "Content-Length": String(body.length),
    "Content-Type": contentTypes.get(extname(filePath)) ?? "application/octet-stream",
    "X-Content-Type-Options": "nosniff",
  };
  response.writeHead(status, headers);
  response.end(request.method === "HEAD" ? undefined : body);
});

server.listen(port, "127.0.0.1", () => {
  process.stdout.write(`Static export preview listening at http://127.0.0.1:${port}\n`);
});
