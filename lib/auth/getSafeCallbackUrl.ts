export function getSafeCallbackUrl(value: string | null) {
  if (!value) return "/";
  try {
    const url = new URL(value, window.location.origin);
    if (url.origin !== window.location.origin) return "/";
    const path = `${url.pathname}${url.search}${url.hash}`;

    if (!path.startsWith("/") || path.startsWith("//")) return "/";

    if (url.pathname === "/login" || url.pathname === "/signup") return "/";

    return path;
  } catch {
    return "/";
  }
}
