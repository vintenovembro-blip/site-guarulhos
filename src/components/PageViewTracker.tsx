"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getOrCreateVisitorId(): string {
  const match = document.cookie.match(/(?:^|; )sc_vid=([^;]+)/);
  if (match) return match[1];

  const id = crypto.randomUUID();
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `sc_vid=${id}; path=/; max-age=${oneYear}; SameSite=Lax`;
  return id;
}

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;

    const visitorId = getOrCreateVisitorId();
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, visitorId }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
