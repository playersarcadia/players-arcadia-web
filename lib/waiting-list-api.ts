/**
 * Public waiting-list signup against GamersArc API (POST /waiting_list/join-waiting-list).
 * Uses the same CSRF cookie flow as other frontends when the API runs with CSRF enabled.
 */

const getApiBase = (): string => {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim() || "";
  return raw.replace(/\/$/, "");
};

function readCsrfCookie(): string | null {
  if (typeof document === "undefined") return null;
  const row = document.cookie.split("; ").find((r) => r.startsWith("csrftoken="));
  return row ? decodeURIComponent(row.split("=").slice(1).join("=")) : null;
}

async function bootstrapCsrfCookie(apiBase: string): Promise<void> {
  // console.log('🔍 API Base URL:', apiBase);
  // console.log('🌐 Fetching CSRF from:', `${apiBase}/`);
  await fetch(`${apiBase}/`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });
}

function parseErrorDetail(data: unknown): string {
  if (!data || typeof data !== "object") return "";
  const d = data as { detail?: unknown };
  if (typeof d.detail === "string") return d.detail;
  if (Array.isArray(d.detail)) {
    return d.detail
      .map((item) => {
        if (item && typeof item === "object" && "msg" in item) {
          return String((item as { msg: string }).msg);
        }
        return "";
      })
      .filter(Boolean)
      .join(" ");
  }
  return "";
}

export type JoinWaitingListResult =
  | { ok: true }
  | { ok: false; message: string };

/**
 * POST /waiting_list/join-waiting-list — body must be `{ email }` (valid email string).
 * Backend: `WaitingListRequest` (Pydantic EmailStr). Persists `waiting_list.email` (unique).
 * 201 = created; 409 = email already on the list; CSRF header when API enforces it.
 */
export async function joinWaitingList(email: string): Promise<JoinWaitingListResult> {
  const apiBase = getApiBase();
  if (!apiBase) {
    return { ok: false, message: "Service is not configured. Please try again later." };
  }

  await bootstrapCsrfCookie(apiBase);
  const csrf = readCsrfCookie();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (csrf) {
    headers["X-CSRF-Token"] = csrf;
  }

  let res: Response;
  try {
    res = await fetch(`${apiBase}/waiting_list/join-waiting-list`, {
      method: "POST",
      credentials: "include",
      headers,
      body: JSON.stringify({ email: email.trim() }),
    });
  } catch {
    return { ok: false, message: "Network error. Check your connection and try again." };
  }

  if (res.status === 201) {
    return { ok: true };
  }

  let message = "Something went wrong. Please try again.";
  try {
    const data = await res.json();
    const detail = parseErrorDetail(data);
    if (detail) message = detail;
  } catch {
    /* use default */
  }

  if (res.status === 409) {
    message = "You're already on the list — we'll be in touch!";
  }
  if (res.status === 403 && message.toLowerCase().includes("csrf")) {
    message = "Security check failed. Refresh the page and try again.";
  }

  return { ok: false, message };
}

/** Dismiss flag for the landing waitlist modal (single key; legacy `_v2` is merged and removed). */
export const WAITLIST_MODAL_STORAGE_KEY = "gamersarc_waitlist_modal_hidden";

const WAITLIST_MODAL_STORAGE_KEY_LEGACY_V2 = "gamersarc_waitlist_modal_hidden_v2";

/** Merges legacy `_v2` into the canonical key and deletes `_v2` so only one item remains. */
export function migrateWaitlistModalStorage(): void {
  if (typeof window === "undefined") return;
  try {
    if (localStorage.getItem(WAITLIST_MODAL_STORAGE_KEY_LEGACY_V2) === "1") {
      localStorage.setItem(WAITLIST_MODAL_STORAGE_KEY, "1");
    }
    localStorage.removeItem(WAITLIST_MODAL_STORAGE_KEY_LEGACY_V2);
  } catch {
    /* ignore */
  }
}
