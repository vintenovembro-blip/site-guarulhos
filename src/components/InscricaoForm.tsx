"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { CheckCircle2, Sparkles, ArrowRight, ClipboardList, MapPinned, GraduationCap } from "lucide-react";

const passos = [
  { icon: ClipboardList, label: "Dados pessoais" },
  { icon: MapPinned,     label: "Endereço" },
  { icon: GraduationCap, label: "Curso e unidade" },
];

export default function InscricaoForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const router = useRouter();

  return (
    <section id="inscricao" ref={ref} className="section-py gradient-cta" style={{ position: "relative", overflow: "hidden" }}>
      {/* Glow orbs */}
      <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 0, left: "20%", width: "20rem", height: "20rem", background: "radial-gradient(ellipse, rgba(37,99,235,.2) 0%, transparent 65%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: 0, right: "15%", width: "18rem", height: "18rem", background: "radial-gradient(ellipse, rgba(124,58,237,.15) 0%, transparent 65%)", borderRadius: "50%" }} />
      </div>

      <div className="container-inner" style={{ position: "relative", zIndex: 1 }}>
        <div className="inscricao-row">

          {/* PITCH */}
          <motion.div className="inscricao-pitch" initial={{ opacity: 0, y: reduce ? 0 : 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .55 }} style={{ color: "#f0f6ff", minWidth: 0 }}>
            <div className="glass" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".4rem 1rem", borderRadius: "999px", fontSize: ".8rem", marginBottom: "1.25rem" }}>
              <Sparkles style={{ width: "1rem", height: "1rem", color: "#fbbf24", flexShrink: 0 }} />
              <span style={{ color: "#fff" }}>400 vagas presenciais aos sábados</span>
            </div>

            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(1.75rem, 5vw, 2.75rem)", lineHeight: 1.1, marginBottom: "1rem" }}>
              Garanta sua vaga{" "}
              <span style={{ color: "#fbbf24" }}>agora mesmo!</span>
            </h2>

            <p style={{ color: "rgba(255,255,255,.88)", fontSize: "clamp(.9rem, 2.5vw, 1.05rem)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Uma iniciativa do <strong style={{ color: "#fff" }}>Cursinho 20 de Novembro</strong> com a Secretaria de Juventude de Guarulhos. Vagas presenciais aos sábados no CEU Bonsucesso e no CEU Continental.{" "}
              <strong style={{ color: "#f0f6ff" }}>Totalmente gratuito.</strong>
            </p>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".75rem" }}>
              {["200 vagas em cada CEU (Bonsucesso e Continental)", "Aulas aos sábados, com horário por unidade", "Metodologia CPOP alinhada ao MEC", "Para jovens de 15 a 29 anos de Guarulhos"].map((item, i) => (
                <motion.li key={item} initial={{ opacity: 0, x: reduce ? 0 : -14 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: .1 * i + .3 }}
                  style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
                  <CheckCircle2 style={{ width: "1.15rem", height: "1.15rem", color: "#4ade80", flexShrink: 0 }} />
                  <span style={{ color: "rgba(255,255,255,.88)", fontSize: ".88rem" }}>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* CTA CARD */}
          <motion.div className="inscricao-form" initial={{ opacity: 0, y: reduce ? 0 : 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .55, delay: .15 }} style={{ minWidth: 0 }}>
            <div style={{ background: "#fff", borderRadius: "1.5rem", padding: "2rem 1.75rem", boxShadow: "0 25px 60px rgba(37,99,235,.18), 0 8px 24px rgba(0,0,0,.08)" }}>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "1.2rem", color: "#2563eb", marginBottom: ".2rem" }}>
                Inscreva-se em 3 passos simples
              </h3>
              <p style={{ color: "#94a3b8", fontSize: ".82rem", marginBottom: "1.75rem" }}>Leva menos de 2 minutos</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginBottom: "2rem" }}>
                {passos.map((p, i) => (
                  <div key={p.label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: "2.75rem", height: "2.75rem", flexShrink: 0, borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#2563eb" }}>
                      <p.icon style={{ width: "1.25rem", height: "1.25rem" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: ".72rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em" }}>Passo {i + 1}</div>
                      <div style={{ fontSize: ".92rem", color: "#1e293b", fontWeight: 700 }}>{p.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => router.push("/inscricao")}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", width: "100%", padding: "1.1rem", background: "linear-gradient(135deg,#2563eb,#3b82f6)", color: "#fff", borderRadius: ".875rem", fontWeight: 800, fontSize: "1rem", border: "none", cursor: "pointer", minHeight: "56px", fontFamily: "inherit", boxShadow: "0 0 28px rgba(59,130,246,.45), 0 8px 24px rgba(37,99,235,.3)" }}
              >
                <Sparkles style={{ width: "1.1rem", height: "1.1rem" }} />
                Começar Inscrição
                <ArrowRight style={{ width: "1.1rem", height: "1.1rem" }} />
              </button>

              <p style={{ marginTop: ".75rem", textAlign: "center", fontSize: ".72rem", color: "#94a3b8" }}>
                Seus dados estão seguros. Não enviamos spam.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
