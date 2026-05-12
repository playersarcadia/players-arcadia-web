/**
 * Marketing site → GamersArc API: origin and /api/v1-prefixed paths.
 * NEXT_PUBLIC_API_URL is scheme+host only; optional NEXT_PUBLIC_API_PATH_PREFIX (default /api/v1).
 */

export function getPublicApiOrigin(): string {
  return (process.env.NEXT_PUBLIC_API_URL?.trim() || "").replace(/\/$/, "");
}

export function getPublicApiPathPrefix(): string {
  return (process.env.NEXT_PUBLIC_API_PATH_PREFIX ?? "/api/v1").replace(/\/$/, "");
}

/** e.g. /waiting_list/join → /api/v1/waiting_list/join */
export function withApiVersionPath(path: string): string {
  const prefix = getPublicApiPathPrefix();
  const p = path.startsWith("/") ? path : `/${path}`;
  if (!prefix) return p;
  if (p === prefix || p.startsWith(`${prefix}/`)) return p;
  return `${prefix}${p}`;
}

/** Full URL for a versioned JSON API route. */
export function publicVersionedApiUrl(path: string): string {
  const base = getPublicApiOrigin();
  return `${base}${withApiVersionPath(path)}`;
}

/** OpenAPI/Swagger is at /docs on the API host (not under /api/v1). */
export function getPublicApiDocsUrl(): string | null {
  const base = getPublicApiOrigin();
  if (!base) return null;
  return `${base}/docs`;
}
