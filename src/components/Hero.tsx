"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowRight, Play, Zap } from "lucide-react";

const STATS = [
  { value: "200+", label: "Alunos" },
  { value: "85%",  label: "Aprovação" },
  { value: "100%", label: "Gratuito" },
];

interface Particle {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const list: Particle[] = Array.from({ length: 55 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 2.5,
      opacity: Math.random() * 0.5 + 0.15,
    }));
    setParticles(list);
  }, []);

  const go = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="inicio"
      className="hero-height gradient-hero"
      style={{ position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}
    >
      {/* ── PARTICLES ── */}
      <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>

        {/* Soft glow orbs */}
        <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: "55rem", height: "25rem", background: "radial-gradient(ellipse, rgba(255,255,255,.18) 0%, transparent 65%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: "35%", right: "-8%", width: "24rem", height: "24rem", background: "radial-gradient(ellipse, rgba(255,255,255,.12) 0%, transparent 65%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "0%", left: "0%", width: "20rem", height: "20rem", background: "radial-gradient(ellipse, rgba(255,255,255,.1) 0%, transparent 65%)", borderRadius: "50%" }} />

        {/* White floating particles */}
        {!reduce && particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: "#fff",
              borderRadius: "50%",
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 3}px rgba(255,255,255,.8)`,
              animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="container-inner" style={{ position: "relative", zIndex: 1, paddingTop: "6rem", paddingBottom: "4rem" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5 }}
            style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".4rem 1.1rem", borderRadius: "999px", fontSize: ".78rem", fontWeight: 700, marginBottom: "1.75rem", color: "#fff", letterSpacing: ".04em", textTransform: "uppercase", background: "rgba(255,255,255,.2)", border: "1px solid rgba(255,255,255,.35)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
          >
            <Zap style={{ width: ".875rem", height: ".875rem", color: "#fbbf24", flexShrink: 0 }} />
            Cursinho Gratuito · ETEC &amp; ENEM
            <Zap style={{ width: ".875rem", height: ".875rem", color: "#fbbf24", flexShrink: 0 }} />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: reduce ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .65, delay: .1 }}
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(2.5rem, 9vw, 5.5rem)", lineHeight: 1.05, letterSpacing: "-.02em", marginBottom: "1.5rem", color: "#fff" }}
          >
            Sua vaga na{" "}
            <span style={{ background: "linear-gradient(135deg,#fff 0%,#dbeafe 60%,#fff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              ETEC e ENEM
            </span>
            <br />começa aqui.{" "}
            <span style={{ color: "#fbbf24" }}>De graça.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .55, delay: .2 }}
            style={{ color: "rgba(255,255,255,.9)", fontSize: "clamp(1rem, 3vw, 1.2rem)", lineHeight: 1.7, maxWidth: "580px", marginBottom: "2.5rem" }}
          >
            O Cursinho Sua Chance prepara você com metodologia focada, professores
            apaixonados e material completo —{" "}
            <strong style={{ color: "#fff", fontWeight: 700 }}>totalmente gratuito.</strong>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5, delay: .3 }}
            style={{ display: "flex", flexDirection: "column", gap: ".875rem", width: "100%", maxWidth: "400px" }}
          >
            <button
              onClick={() => go("#inscricao")}
              style={{ width: "100%", padding: "1.1rem 1.5rem", background: "#fff", color: "#2563eb", borderRadius: "1rem", fontWeight: 800, fontSize: "1.05rem", border: "none", cursor: "pointer", minHeight: "60px", fontFamily: "Poppins, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: ".625rem", boxShadow: "0 8px 32px rgba(0,0,0,.2)", animation: reduce ? "none" : "pulse-glow 2.5s ease-in-out infinite" }}
            >
              <Sparkles style={{ width: "1.1rem", height: "1.1rem", flexShrink: 0 }} />
              Garantir Minha Vaga Grátis
              <ArrowRight style={{ width: "1.1rem", height: "1.1rem", flexShrink: 0 }} />
            </button>

            <button
              onClick={() => go("#sobre")}
              style={{ width: "100%", padding: "1rem 1.5rem", color: "#fff", borderRadius: "1rem", fontWeight: 700, fontSize: ".95rem", border: "1px solid rgba(255,255,255,.4)", cursor: "pointer", minHeight: "52px", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", background: "rgba(255,255,255,.15)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
            >
              <Play style={{ width: "1rem", height: "1rem", flexShrink: 0 }} />
              Conheça o Cursinho
            </button>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5, delay: .45 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: ".875rem", width: "100%", maxWidth: "360px", marginTop: "3rem" }}
          >
            {STATS.map((s) => (
              <div key={s.label} style={{ padding: ".875rem .5rem", borderRadius: ".875rem", textAlign: "center", background: "rgba(255,255,255,.2)", border: "1px solid rgba(255,255,255,.35)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
                <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "1.35rem", color: "#fff", lineHeight: 1, marginBottom: ".2rem" }}>{s.value}</div>
                <div style={{ fontSize: ".68rem", color: "rgba(255,255,255,.8)", fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
