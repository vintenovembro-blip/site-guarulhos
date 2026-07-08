"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowRight, Play } from "lucide-react";
import Image from "next/image";

const STATS = [
  { value: "400",  label: "Vagas Presenciais" },
  { value: "2",    label: "Unidades CEU" },
  { value: "Sáb",  label: "Dia de Aula" },
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
  const router = useRouter();

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

  const go = (id: string) => {
    if (id === "#inscricao") {
      router.push("/inscricao");
      return;
    }
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="hero-height gradient-hero"
      style={{ position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}
    >
      {/* ── PARTICLES ── */}
      <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: "55rem", height: "25rem", background: "radial-gradient(ellipse, rgba(255,255,255,.18) 0%, transparent 65%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: "35%", right: "-8%", width: "24rem", height: "24rem", background: "radial-gradient(ellipse, rgba(255,255,255,.12) 0%, transparent 65%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "0%", left: "0%", width: "20rem", height: "20rem", background: "radial-gradient(ellipse, rgba(255,255,255,.1) 0%, transparent 65%)", borderRadius: "50%" }} />

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

      <div className="container-inner" style={{ position: "relative", zIndex: 1, paddingTop: "9rem", paddingBottom: "0" }}>
        <div className="hero-layout">

          {/* ── LEFT: text content ── */}
          <div className="hero-text-col">

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: reduce ? 0 : 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .65, delay: .1 }}
              className="hero-headline"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: "0.75rem", color: "#fff" }}
            >
              Sua vaga na ETEC e ENEM<br />
              começa aqui.{" "}
              <span style={{ color: "#fff" }}>De graça.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: reduce ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .55, delay: .2 }}
              style={{ color: "rgba(255,255,255,.9)", fontSize: "clamp(1rem, 3vw, 1.2rem)", lineHeight: 1.7, maxWidth: "520px", marginBottom: "2.5rem" }}
            >
              Uma iniciativa do <strong style={{ color: "#fff" }}>Cursinho 20 de Novembro</strong> com a{" "}
              <strong style={{ color: "#fff" }}>Secretaria de Juventude de Guarulhos</strong> — para jovens de 15 a 29 anos das periferias.{" "}
              <strong style={{ color: "#fff", fontWeight: 700 }}>Totalmente gratuito.</strong>
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
              style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: ".875rem", width: "100%", maxWidth: "360px", marginTop: "3rem", marginBottom: "3rem" }}
            >
              {STATS.map((s) => (
                <div key={s.label} style={{ padding: ".875rem .5rem", borderRadius: ".875rem", textAlign: "center", background: "rgba(255,255,255,.2)", border: "1px solid rgba(255,255,255,.35)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
                  <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "1.35rem", color: "#fff", lineHeight: 1, marginBottom: ".2rem" }}>{s.value}</div>
                  <div style={{ fontSize: ".68rem", color: "rgba(255,255,255,.8)", fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: avatar ── */}
          <div className="hero-avatar-col" aria-hidden>
            <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>

              {/* Glow behind avatar */}
              <div className="hero-avatar-glow" style={{ position: "absolute", bottom: "10%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(ellipse, rgba(255,255,255,.35) 0%, rgba(255,255,255,.1) 50%, transparent 75%)", borderRadius: "50%", filter: "blur(18px)", pointerEvents: "none" }} />

              {/* Slide in on load */}
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7, delay: .4, ease: "easeOut" }}>

                {/* Float up/down — Framer Motion only, Safari-safe */}
                <motion.div
                  animate={reduce ? {} : { y: [0, -14, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                  style={{ position: "relative" }}
                >
                  {/* Badge "100% Gratuito!" — oculto no mobile */}
                  <motion.div
                    initial={{ opacity: 0, scale: .6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: .5, delay: .9 }}
                    className="hero-avatar-badge"
                    style={{ position: "absolute", top: "12%", right: "-18px", background: "#fff", color: "#2563eb", borderRadius: "999px", padding: ".35rem .9rem", fontWeight: 800, fontSize: ".75rem", boxShadow: "0 4px 20px rgba(37,99,235,.3)", whiteSpace: "nowrap", zIndex: 2, alignItems: "center", gap: ".3rem" }}
                  >
                    <Sparkles style={{ width: ".75rem", height: ".75rem", color: "#22c55e" }} />
                    100% Gratuito!
                  </motion.div>

                  {/* Badge "Sua vez!" — oculto no mobile */}
                  <motion.div
                    initial={{ opacity: 0, scale: .6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: .5, delay: 1.1 }}
                    className="hero-avatar-badge"
                    style={{ position: "absolute", bottom: "22%", left: "-22px", background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", borderRadius: "999px", padding: ".35rem .9rem", fontWeight: 800, fontSize: ".75rem", boxShadow: "0 4px 20px rgba(34,197,94,.4)", whiteSpace: "nowrap", zIndex: 2, alignItems: "center", gap: ".3rem" }}
                  >
                    Sua vez!
                  </motion.div>

                  <div
                    className="hero-phone-frame"
                    style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,.25))" }}
                  >
                    <div className="hero-phone-notch" />
                    <div className="hero-phone-screen">
                      <Image
                        src="/images/logos/Captura de tela 2026-06-25 135406.png"
                        alt="Portal do aluno do Cursinho 20 de Novembro"
                        fill
                        sizes="(min-width: 900px) 230px, 160px"
                        style={{ objectFit: "cover" }}
                        priority
                        unoptimized
                      />
                    </div>
                  </div>
                </motion.div>

              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
