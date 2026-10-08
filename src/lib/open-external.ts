// Opens external links reliably, including inside sandboxed preview iframes
// where a plain same-tab or _blank navigation can be blocked (COOP / sandbox).
export function openExternal(url: string) {
  if (typeof window === "undefined") return;

  const inIframe = (() => {
    try {
      return window.top !== window.self;
    } catch {
      return true;
    }
  })();

  // Normal browsing (phones included): navigate in the same tab.
  // window.open here is what iOS Safari blocks with a
  // "Cross-Origin-Opener-Policy" error, so we never use it.
  if (!inIframe) {
    window.location.href = url;
    return;
  }

  // Inside a preview iframe: try a new tab, then the parent frame.
  try {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (win) return;
  } catch {
    /* blocked — fall through */
  }
  try {
    if (window.top) {
      window.top.location.href = url;
      return;
    }
  } catch {
    /* cross-origin parent — fall through */
  }
  window.location.href = url;
}

export function installExternalLinkHandler() {
  if (typeof document === "undefined") return () => {};

  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
    const anchor = (event.target as HTMLElement | null)?.closest?.("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href || !/^https?:\/\//i.test(href)) return;
    if (new URL(href, window.location.href).origin === window.location.origin) return;

    event.preventDefault();
    openExternal(href);
  };

  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
