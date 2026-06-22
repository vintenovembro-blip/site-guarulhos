"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ana Beatriz S.", role: "Aprovada na ETEC — Técnico em Informática · Guarulhos",
    text: "Moro nos Pimentas e não tinha como pagar cursinho. O Sua Chance chegou no CEU do meu bairro e me preparou de verdade. Passei no Vestibulinho na primeira tentativa. Obrigada, Instituto 20 de Novembro!",
    stars: 5, avatar: "AB", color: "#2563eb",
  },
  {
    name: "Lucas M.", role: "Aprovado na ETEC — Técnico em Administração · Bonsucesso",
    text: "Frequentei o CEU Bonsucesso toda quinta, sexta e sábado. Os professores seguem o CPOP do MEC e o conteúdo é exatamente o que cai no Vestibulinho. O programa mudou minha história!",
    stars: 5, avatar: "LM", color: "#7c3aed",
  },
  {
    name: "Giovanna P.", role: "Aprovada no ENEM — Bolsa PROUNI · Cabuçu",
    text: "Usei o formato híbrido porque trabalhava de dia. Acompanhei tudo pela plataforma e tirei a nota que precisava no ENEM. Agora estou na faculdade com bolsa integral. Isso é inclusão de verdade!",
    stars: 5, avatar: "GP", color: "#16a34a",
  },
  {
    name: "Rafael T.", role: "Aprovado na ETEC — Técnico em Eletrônica · Periferia de Guarulhos",
    text: "Vim do Cabuçu sem acreditar que conseguiria. A equipe do Sua Chance e da Secretaria de Juventude fizeram toda a diferença. O programa democratizou o acesso que a gente da periferia nunca teve.",
    stars: 5, avatar: "RT", color: "#ea580c",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  return (
    <section ref={ref} className="section-py" style={{ background: "#fff" }}>
      <div className="container-inner">

        <div className="section-header">
          <motion.div initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .4 }}
            style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", background: "#fef9c3", color: "#a16207", padding: ".4rem 1rem", borderRadius: "999px", fontSize: ".8rem", fontWeight: 700, marginBottom: "1rem" }}>
            <Star style={{ width: "1rem", height: "1rem", fill: "#ca8a04", color: "#ca8a04", flexShrink: 0 }} />
            Depoimentos
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .45, delay: .08 }}
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(1.75rem, 5vw, 3rem)", color: "#2563eb", lineHeight: 1.15, marginBottom: ".875rem" }}>
            Jovens de Guarulhos que{" "}
            <span style={{ color: "#3b82f6" }}>conquistaram</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .45, delay: .15 }}
            style={{ color: "#475569", fontSize: "clamp(.9rem, 2.5vw, 1.05rem)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.65 }}>
            Histórias reais de quem passou pelo programa Sua Chance nas periferias de Guarulhos.
          </motion.p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: reduce ? 0 : 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .45, delay: i * .09 + .2 }}
              style={{ position: "relative", padding: "1.25rem", borderRadius: "1rem", border: "1px solid #f1f5f9", background: "#fff", boxShadow: "0 2px 12px rgba(37,99,235,.06)", minWidth: 0, overflow: "hidden" }}
              whileHover={reduce ? {} : { boxShadow: "0 10px 30px rgba(37,99,235,.12)", borderColor: "#bfdbfe", y: -2 }}
            >
              <div aria-hidden style={{ position: "absolute", top: "1rem", right: "1rem", fontSize: "4rem", lineHeight: 1, color: "#dbeafe", fontFamily: "Georgia, serif", userSelect: "none" }}>"</div>

              <div style={{ display: "flex", gap: ".2rem", marginBottom: ".875rem" }}>
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} aria-hidden style={{ width: "1rem", height: "1rem", fill: "#f59e0b", color: "#f59e0b", flexShrink: 0 }} />
                ))}
              </div>

              <p style={{ color: "#374151", fontSize: ".85rem", lineHeight: 1.65, marginBottom: "1rem", paddingRight: "1.5rem", fontStyle: "italic" }}>
                &ldquo;{t.text}&rdquo;
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", background: t.color, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: ".72rem", fontWeight: 800, flexShrink: 0 }}>
                  {t.avatar}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: "#2563eb", fontSize: ".85rem" }}>{t.name}</div>
                  <div style={{ color: "#64748b", fontSize: ".75rem" }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
