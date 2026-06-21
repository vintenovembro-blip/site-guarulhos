"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Target, Lightbulb, Shield, Zap, CheckCircle2 } from "lucide-react";

const diferenciais = [
  { icon: Target,    title: "Foco Total no Resultado",  description: "Metodologia 100% direcionada para o Vestibulinho da ETEC e o ENEM, cobrindo tudo que vai cair.", iconBg: "#dbeafe", iconColor: "#2563eb", border: "#bfdbfe", bg: "#eff6ff" },
  { icon: Lightbulb, title: "Professores Apaixonados",  description: "Professores que ensinam de verdade, com didática clara, exemplos práticos e muita energia.",        iconBg: "#fef9c3", iconColor: "#ca8a04", border: "#fde68a", bg: "#fefce8" },
  { icon: Shield,    title: "Completamente Gratuito",   description: "Educação de qualidade é um direito. Por isso o cursinho é 100% gratuito, sem taxas ocultas.",       iconBg: "#dcfce7", iconColor: "#16a34a", border: "#bbf7d0", bg: "#f0fdf4" },
  { icon: Zap,       title: "Comunidade de Apoio",      description: "Faça parte de uma turma unida que cresce e conquista aprovações juntos.",                            iconBg: "#ede9fe", iconColor: "#7c3aed", border: "#ddd6fe", bg: "#f5f3ff" },
];

const checkItems = [
  "Material didático incluso",
  "Simulados e exercícios extras",
  "Grupo exclusivo de alunos",
  "Plantão de dúvidas",
  "Revisões intensivas antes da prova",
  "Acompanhamento personalizado",
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  return (
    <section id="sobre" ref={ref} className="section-py" style={{ background: "#f0f6ff" }}>
      <div className="container-inner">

        <div className="section-header">
          <motion.div initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .45 }}
            style={{ display: "inline-flex", alignItems: "center", background: "#dbeafe", color: "#2563eb", padding: ".4rem 1rem", borderRadius: "999px", fontSize: ".8rem", fontWeight: 700, marginBottom: "1rem" }}>
            Sobre o Cursinho
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .5, delay: .08 }}
            style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", fontWeight: 900, color: "#2563eb", fontFamily: "Poppins, sans-serif", lineHeight: 1.15, marginBottom: ".875rem" }}>
            Por que escolher o{" "}
            <span style={{ color: "#2563eb" }}>Sua Chance?</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .5, delay: .15 }}
            style={{ color: "#475569", fontSize: "clamp(.95rem, 2.5vw, 1.1rem)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
            Somos um cursinho preparatório criado com um único objetivo: te dar todas as ferramentas para você conquistar sua vaga na ETEC e no ENEM.
          </motion.p>
        </div>

        <div className="about-row">
          <div className="about-left" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".875rem" }}>
            {diferenciais.map((d, i) => (
              <motion.div key={d.title}
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: .45, delay: i * .08 + .2 }}
                style={{ padding: "1.25rem", borderRadius: "1rem", border: `1px solid ${d.border}`, background: d.bg, minWidth: 0, overflow: "hidden", wordBreak: "break-word", boxShadow: "0 2px 12px rgba(37,99,235,.06)" }}
                whileHover={reduce ? {} : { boxShadow: "0 8px 28px rgba(37,99,235,.15)", y: -2 }}
              >
                <div style={{ width: "2.5rem", height: "2.5rem", background: d.iconBg, borderRadius: ".75rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: ".875rem" }}>
                  <d.icon style={{ width: "1.1rem", height: "1.1rem", color: d.iconColor }} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: ".82rem", color: "#2563eb", fontFamily: "Poppins, sans-serif", marginBottom: ".35rem", lineHeight: 1.3 }}>{d.title}</h3>
                <p style={{ color: "#64748b", fontSize: ".75rem", lineHeight: 1.55 }}>{d.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="about-right" initial={{ opacity: 0, y: reduce ? 0 : 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .55, delay: .35 }} style={{ minWidth: 0 }}>
            <div style={{ borderRadius: "1.5rem", padding: "1.75rem", color: "#fff", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)", boxShadow: "0 12px 40px rgba(37,99,235,.35)" }}>
              <div aria-hidden style={{ position: "absolute", top: "-2rem", right: "-2rem", width: "8rem", height: "8rem", borderRadius: "50%", background: "rgba(255,255,255,.07)" }} />
              <div aria-hidden style={{ position: "absolute", bottom: "-2.5rem", left: "-2.5rem", width: "12rem", height: "12rem", borderRadius: "50%", background: "rgba(255,255,255,.05)" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "1.3rem", marginBottom: ".25rem" }}>O que está incluso</h3>
                <p style={{ color: "#bfdbfe", fontSize: ".85rem", marginBottom: "1.25rem" }}>Tudo o que você precisa para passar, sem custar nada.</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".75rem" }}>
                  {checkItems.map((item, i) => (
                    <motion.li key={item} initial={{ opacity: 0, x: reduce ? 0 : -14 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: .4 + i * .07 }}
                      style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
                      <CheckCircle2 style={{ width: "1.1rem", height: "1.1rem", color: "#86efac", flexShrink: 0 }} />
                      <span style={{ fontSize: ".85rem", color: "rgba(255,255,255,.9)" }}>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <button onClick={() => document.querySelector("#inscricao")?.scrollIntoView({ behavior: "smooth" })}
                  style={{ marginTop: "1.5rem", width: "100%", padding: ".875rem", background: "#fff", color: "#2563eb", borderRadius: ".875rem", fontWeight: 800, fontSize: ".95rem", border: "none", cursor: "pointer", minHeight: "52px", fontFamily: "inherit" }}>
                  Garantir Minha Vaga Grátis
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
