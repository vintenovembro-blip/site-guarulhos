"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Início",        href: "#inicio" },
  { label: "Sobre",         href: "#sobre" },
  { label: "Matérias",      href: "#materias" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "FAQ",           href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = () => setOpen(false);
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .5, ease: "easeOut" }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? "rgba(255,255,255,.96)" : "transparent",
          boxShadow: scrolled ? "0 2px 20px rgba(30,64,175,.1)" : "none",
          borderBottom: scrolled ? "1px solid rgba(30,64,175,.08)" : "1px solid transparent",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          transition: "background .3s, box-shadow .3s, border-color .3s",
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        <div className="container-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4rem" }}>

          <button onClick={() => go("#inicio")} aria-label="Ir para o início"
            style={{ display: "flex", alignItems: "center", background: "none", border: "none", cursor: "pointer", minHeight: "44px", padding: "0 .25rem" }}>
            <Image
              src={scrolled ? "/images/logos/Logo normal.png" : "/images/logos/Logo branco.png"}
              alt="Sua Chance — Cursinho Preparatório"
              width={140}
              height={44}
              style={{ height: "2.5rem", width: "auto", objectFit: "contain", transition: "opacity .3s" }}
              priority
            />
          </button>

          <nav aria-label="Navegação principal" className="desktop-nav">
            {NAV.map((l) => (
              <button key={l.href} onClick={() => go(l.href)}
                style={{ padding: ".5rem .875rem", borderRadius: ".625rem", fontWeight: 500, fontSize: ".875rem", border: "none", cursor: "pointer", background: "none", color: scrolled ? "#2563eb" : "rgba(255,255,255,.9)", minHeight: "44px", fontFamily: "inherit", transition: "background .2s, color .2s" }}
                onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = scrolled ? "#eff6ff" : "rgba(255,255,255,.12)"; b.style.color = scrolled ? "#2563eb" : "#fff"; }}
                onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "none"; b.style.color = scrolled ? "#2563eb" : "rgba(255,255,255,.9)"; }}>
                {l.label}
              </button>
            ))}
            <button onClick={() => go("#inscricao")}
              style={{ marginLeft: ".5rem", padding: ".6rem 1.25rem", borderRadius: ".875rem", fontWeight: 800, fontSize: ".875rem", border: "none", cursor: "pointer", background: scrolled ? "linear-gradient(135deg,#2563eb,#3b82f6)" : "#fff", color: scrolled ? "#fff" : "#2563eb", minHeight: "44px", fontFamily: "inherit", boxShadow: "0 4px 14px rgba(37,99,235,.25)", transition: "background .3s, color .3s" }}>
              Inscreva-se Grátis
            </button>
          </nav>

          <button className="mobile-btn" onClick={() => setOpen(!open)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: "44px", minHeight: "44px", background: "none", border: "none", cursor: "pointer", color: scrolled ? "#2563eb" : "#fff", borderRadius: ".625rem" }}>
            {open ? <X style={{ width: "1.4rem", height: "1.4rem" }} /> : <Menu style={{ width: "1.4rem", height: "1.4rem" }} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .22 }}
            style={{ position: "fixed", top: "calc(4rem + env(safe-area-inset-top, 0px))", left: 0, right: 0, zIndex: 49, background: "#fff", borderBottom: "1px solid #dbeafe", boxShadow: "0 8px 24px rgba(30,64,175,.12)" }}>
            <div className="container-inner" style={{ display: "flex", flexDirection: "column", gap: ".25rem", paddingTop: ".75rem", paddingBottom: "calc(.75rem + env(safe-area-inset-bottom, 0px))" }}>
              {NAV.map((l) => (
                <button key={l.href} onClick={() => go(l.href)}
                  style={{ width: "100%", textAlign: "left", padding: ".875rem 1rem", borderRadius: ".75rem", fontWeight: 600, fontSize: ".95rem", border: "none", cursor: "pointer", background: "none", color: "#374151", minHeight: "52px", fontFamily: "inherit" }}>
                  {l.label}
                </button>
              ))}
              <button onClick={() => go("#inscricao")}
                style={{ marginTop: ".25rem", width: "100%", padding: "1rem", borderRadius: ".875rem", fontWeight: 800, fontSize: "1rem", border: "none", cursor: "pointer", background: "linear-gradient(135deg,#2563eb,#3b82f6)", color: "#fff", minHeight: "56px", fontFamily: "inherit" }}>
                Inscreva-se Grátis
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
