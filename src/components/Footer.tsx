"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Lock } from "lucide-react";

const navLinks = [
  { label: "Início",        href: "#inicio" },
  { label: "Sobre",         href: "#sobre" },
  { label: "Matérias",      href: "#materias" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "FAQ",           href: "#faq" },
];

const WHATSAPP_URL = "https://wa.me/5511963056974?text=Ol%C3%A1!";

const socialLinks = [
  { label: "WhatsApp",  href: WHATSAPP_URL, external: true, svg: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1.15rem", height: "1.15rem" }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
  { label: "Instagram", href: "#", external: false, svg: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1.15rem", height: "1.15rem" }}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  { label: "Facebook",  href: "#", external: false, svg: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1.15rem", height: "1.15rem" }}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { label: "YouTube",   href: "#", external: false, svg: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1.15rem", height: "1.15rem" }}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
];

export default function Footer() {
  const router = useRouter();
  const scrollTo = (href: string) => {
    if (href === "#inscricao") {
      router.push("/inscricao");
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "#f0f6ff", borderTop: "1px solid #dbeafe" }}>
      <div className="container-inner" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <div style={{ marginBottom: "1rem" }}>
              <Image
                src="/images/logos/Logo normal.png"
                alt="Sua Chance — Cursinho Preparatório"
                width={420}
                height={132}
                style={{ height: "9rem", width: "auto", objectFit: "contain" }}
              />
            </div>
            <p style={{ color: "#64748b", fontSize: ".82rem", lineHeight: 1.7, marginBottom: ".75rem", maxWidth: "280px" }}>
              Programa educacional gratuito para jovens de 15 a 25 anos das periferias de Guarulhos — preparação para o Vestibulinho ETEC e ENEM.
            </p>
            <div style={{ marginBottom: "1rem", display: "flex", flexDirection: "column", gap: ".25rem" }}>
              <span style={{ fontSize: ".72rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em" }}>Realização</span>
              <span style={{ fontSize: ".78rem", color: "#2563eb", fontWeight: 700 }}>Cursinho 20 de Novembro</span>
              <span style={{ fontSize: ".78rem", color: "#3b82f6", fontWeight: 600 }}>Secretaria de Juventude · Prefeitura de Guarulhos</span>
            </div>
            <div style={{ display: "flex", gap: ".625rem" }}>
              {socialLinks.map((s) => (
                <motion.a key={s.label} href={s.href} target={s.external ? "_blank" : undefined} rel={s.external ? "noopener noreferrer" : undefined} whileHover={{ scale: 1.1, y: -2 }} aria-label={s.label}
                  style={{ width: "2.75rem", height: "2.75rem", background: "#fff", border: "1px solid #dbeafe", borderRadius: ".75rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#3b82f6", textDecoration: "none", boxShadow: "0 2px 8px rgba(37,99,235,.08)", transition: "border-color .2s, box-shadow .2s" }}>
                  {s.svg}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: ".85rem", marginBottom: "1rem", color: "#2563eb" }}>Navegação</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".625rem" }}>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button onClick={() => scrollTo(link.href)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", fontSize: ".82rem", padding: 0, minHeight: "36px", fontFamily: "inherit", transition: "color .2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#2563eb"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#64748b"; }}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CEUs + CTA */}
          <div>
            <h4 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: ".85rem", marginBottom: "1rem", color: "#2563eb" }}>Unidades CEU</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".5rem", marginBottom: "1.25rem" }}>
              {["CEU Bonsucesso", "CEU Continental"].map((label) => (
                <li key={label}>
                  <button onClick={() => scrollTo("#inscricao")}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", fontSize: ".82rem", padding: 0, minHeight: "36px", fontFamily: "inherit", transition: "color .2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#2563eb"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#64748b"; }}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => scrollTo("#inscricao")}
              style={{ padding: ".75rem 1.25rem", background: "linear-gradient(135deg,#2563eb,#3b82f6)", color: "#fff", borderRadius: ".875rem", fontWeight: 800, fontSize: ".85rem", border: "none", cursor: "pointer", minHeight: "48px", fontFamily: "inherit", boxShadow: "0 4px 16px rgba(37,99,235,.25)" }}>
              Inscreva-se Grátis
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid #dbeafe" }}>
        <div className="container-inner" style={{ paddingTop: "1.25rem", paddingBottom: "1.25rem" }}>
          <div className="footer-bottom-row">
            <p style={{ color: "#94a3b8", fontSize: ".72rem", textAlign: "center" }}>
              © {new Date().getFullYear()} Cursinho 20 de Novembro · Programa Sua Chance Social · Guarulhos/SP
            </p>
            <p style={{ color: "#94a3b8", fontSize: ".72rem", display: "flex", alignItems: "center", gap: ".25rem" }}>
              Feito com <Heart style={{ width: ".75rem", height: ".75rem", color: "#f87171", fill: "#f87171" }} aria-hidden /> para quem quer crescer
            </p>

            <Link
              href="/admin/login"
              style={{ color: "#94a3b8", fontSize: ".72rem", display: "flex", alignItems: "center", gap: ".3rem", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#2563eb"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8"; }}
            >
              <Lock style={{ width: ".7rem", height: ".7rem" }} aria-hidden />
              Área Administrativa
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
