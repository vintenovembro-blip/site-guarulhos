"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ClipboardList, BookOpenCheck, GraduationCap, ArrowRight, ArrowDown } from "lucide-react";

const steps = [
  { number: "01", icon: ClipboardList, title: "Faça sua Inscrição",      description: "Preencha o formulário em menos de 2 minutos. Sem burocracia, sem documentos, sem custo.",                               iconBg: "#2563eb", cardBg: "#eff6ff", cardBorder: "#bfdbfe" },
  { number: "02", icon: BookOpenCheck, title: "Assista às Aulas",         description: "Participe das aulas com professores dedicados, receba material de estudo e pratique com simulados exclusivos.",         iconBg: "#7c3aed", cardBg: "#f5f3ff", cardBorder: "#ddd6fe" },
  { number: "03", icon: GraduationCap, title: "Conquiste sua Aprovação",  description: "Com preparação completa e comunidade de apoio, você chega na prova confiante e conquista sua vaga.",                   iconBg: "#16a34a", cardBg: "#f0fdf4", cardBorder: "#bbf7d0" },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  return (
    <section id="como-funciona" ref={ref} className="section-py" style={{ background: "#f0f6ff" }}>
      <div className="container-inner">

        <div className="section-header">
          <motion.div initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .4 }}
            style={{ display: "inline-flex", alignItems: "center", background: "#dbeafe", color: "#2563eb", padding: ".4rem 1rem", borderRadius: "999px", fontSize: ".8rem", fontWeight: 700, marginBottom: "1rem" }}>
            Como Funciona
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .45, delay: .08 }}
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(1.75rem, 5vw, 3rem)", color: "#2563eb", lineHeight: 1.15, marginBottom: ".875rem" }}>
            3 passos para a sua{" "}
            <span style={{ color: "#2563eb" }}>aprovação</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .45, delay: .15 }}
            style={{ color: "#475569", fontSize: "clamp(.9rem, 2.5vw, 1.05rem)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.65 }}>
            Simples assim. Você foca nos estudos, a gente cuida do resto.
          </motion.p>
        </div>

        <div className="how-steps">
          {steps.map((step, i) => (
            <motion.div key={step.title} initial={{ opacity: 0, y: reduce ? 0 : 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .5, delay: i * .12 + .25 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{ position: "relative", width: "5rem", height: "5rem", background: step.iconBg, borderRadius: "1.25rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", boxShadow: "0 8px 24px rgba(0,0,0,.15)", flexShrink: 0 }}>
                <step.icon style={{ width: "2.25rem", height: "2.25rem", color: "#fff" }} />
                <div style={{ position: "absolute", top: "-.6rem", right: "-.6rem", width: "1.75rem", height: "1.75rem", background: "#fff", border: "2px solid #e2e8f0", borderRadius: ".5rem", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,.08)" }}>
                  <span style={{ fontSize: ".6rem", fontWeight: 900, color: "#475569" }}>{step.number}</span>
                </div>
              </div>

              {i < steps.length - 1 && (
                <div className="how-arrow-down" style={{ marginBottom: "1.25rem", color: "#cbd5e1" }}>
                  <ArrowDown style={{ width: "1.25rem", height: "1.25rem" }} />
                </div>
              )}

              <div style={{ width: "100%", padding: "1.25rem 1rem", borderRadius: "1rem", border: `1px solid ${step.cardBorder}`, background: step.cardBg, boxShadow: "0 2px 12px rgba(37,99,235,.06)" }}>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1rem", color: "#2563eb", marginBottom: ".5rem", lineHeight: 1.3 }}>{step.title}</h3>
                <p style={{ color: "#475569", fontSize: ".82rem", lineHeight: 1.6 }}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .45, delay: .7 }} style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <button onClick={() => document.querySelector("#inscricao")?.scrollIntoView({ behavior: "smooth" })}
            style={{ display: "inline-flex", alignItems: "center", gap: ".75rem", padding: "1rem 1.75rem", background: "linear-gradient(135deg,#2563eb,#3b82f6)", color: "#fff", borderRadius: "1rem", fontWeight: 800, fontSize: "1rem", border: "none", cursor: "pointer", minHeight: "56px", fontFamily: "inherit", boxShadow: "0 8px 24px rgba(37,99,235,.3)" }}>
            Começar Agora — É Grátis!
            <ArrowRight style={{ width: "1.15rem", height: "1.15rem", flexShrink: 0 }} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
