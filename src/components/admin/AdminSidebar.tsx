"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { LayoutDashboard, Users, LogOut, Menu, X } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Inscrições", href: "/admin/inscricoes", icon: Users },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const navContent = (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: ".6rem", padding: "0 .25rem", marginBottom: "2rem" }}>
        <Image
          src="/images/logos/Logo normal.png"
          alt="Sua Chance"
          width={110}
          height={38}
          style={{ height: "auto", width: "110px", objectFit: "contain" }}
          unoptimized
        />
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: ".3rem", flex: 1 }}>
        {NAV.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".75rem",
                padding: ".7rem .9rem",
                borderRadius: ".65rem",
                fontSize: ".9rem",
                fontWeight: 600,
                textDecoration: "none",
                color: active ? "#2563eb" : "#475569",
                background: active ? "#eff6ff" : "transparent",
              }}
            >
              <Icon style={{ width: "1.1rem", height: "1.1rem", flexShrink: 0 }} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "1rem", marginTop: "1rem" }}>
        <div style={{ fontSize: ".78rem", color: "#94a3b8", marginBottom: ".65rem", wordBreak: "break-all", padding: "0 .25rem" }}>
          {email}
        </div>
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".65rem",
            width: "100%",
            padding: ".7rem .9rem",
            borderRadius: ".65rem",
            border: "none",
            background: "transparent",
            color: "#ef4444",
            fontWeight: 600,
            fontSize: ".9rem",
            cursor: "pointer",
          }}
        >
          <LogOut style={{ width: "1.1rem", height: "1.1rem" }} />
          Sair
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="admin-mobile-bar"
        style={{
          display: "none",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.25rem",
          background: "#fff",
          borderBottom: "1px solid #e2e8f0",
          position: "sticky",
          top: 0,
          zIndex: 30,
        }}
      >
        <Image
          src="/images/logos/Logo normal.png"
          alt="Sua Chance"
          width={100}
          height={34}
          style={{ height: "auto", width: "100px", objectFit: "contain" }}
          unoptimized
        />
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          style={{ background: "none", border: "none", cursor: "pointer", padding: ".25rem" }}
        >
          {open ? <X style={{ width: "1.5rem", height: "1.5rem" }} /> : <Menu style={{ width: "1.5rem", height: "1.5rem" }} />}
        </button>
      </div>

      {open && (
        <div
          className="admin-mobile-nav"
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#fff",
            borderBottom: "1px solid #e2e8f0",
            padding: "1rem 1.25rem 1.25rem",
            position: "sticky",
            top: "65px",
            zIndex: 29,
          }}
        >
          {navContent}
        </div>
      )}

      {/* Desktop sidebar */}
      <aside
        className="admin-desktop-sidebar"
        style={{
          display: "none",
          flexDirection: "column",
          width: "240px",
          flexShrink: 0,
          background: "#fff",
          borderRight: "1px solid #e2e8f0",
          padding: "1.5rem 1rem",
          minHeight: "100dvh",
          position: "sticky",
          top: 0,
        }}
      >
        {navContent}
      </aside>
    </>
  );
}
