/**
 * Local equivalent of the reference site's data boundary.
 *
 * The reference CMS is private, so this deliberately models the observable
 * contract rather than pretending to reproduce its server implementation.
 */
export type ContentStatus = "loading" | "ready" | "empty" | "error";

export type ContentEnvelope<T> = {
  status: ContentStatus;
  items: readonly T[];
  source: "local" | "fallback";
  error?: string;
};

export function resolveContent<T>(
  primary: readonly T[] | null | undefined,
  fallback: readonly T[] = [],
): ContentEnvelope<T> {
  if (primary && primary.length > 0) {
    return { status: "ready", items: primary, source: "local" };
  }
  if (fallback.length > 0) {
    return { status: "ready", items: fallback, source: "fallback" };
  }
  return { status: "empty", items: [], source: "fallback" };
}

export function contentState<T>(
  envelope: ContentEnvelope<T>,
): "content-loading" | "content-ready" | "content-empty" | "content-error" {
  return `content-${envelope.status}`;
}
