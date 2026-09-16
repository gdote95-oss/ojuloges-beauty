import { supabase } from "@/integrations/supabase/client";

export type TrackKind =
  | "whatsapp_click"
  | "call_click"
  | "booksy_click"
  | "instagram_click"
  | "form_submit";

/**
 * Fire-and-forget analytics. Safe to call from any click handler.
 * If the backend env vars are missing (e.g. when self-hosting before
 * configuring secrets), this silently no-ops instead of crashing the page.
 */
export function trackEvent(kind: TrackKind) {
  if (typeof window === "undefined") return;
  try {
    const path = window.location.pathname;
    const referrer = typeof document !== "undefined" ? document.referrer || null : null;
    // Wrap the .from() call too — the supabase proxy throws on access when
    // env vars are missing, and we never want that to break a click handler.
    Promise.resolve()
      .then(() => supabase.from("interaction_events").insert({ kind, path, referrer }))
      .catch(() => {});
  } catch {
    // ignore — tracking must never block the user
  }
}
