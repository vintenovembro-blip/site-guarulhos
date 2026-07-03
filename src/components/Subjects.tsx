"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { Calculator, BookOpen, FlaskConical, Globe2, Landmark, Languages, Microscope, Pen, Map, ChevronRight } from "lucide-react";

type Tab = "etec" | "enem";

const data: Record<Tab, { icon: React.ElementType; name: string; topics: string[]; iconBg: string; iconColor: string }[]> = {
  etec: [
    { icon: Calculator,   name: "Matemática",  topics: ["Álgebra", "Geometria", "Funções", "Probabilidade"],         iconBg: "#dbeafe", iconColor: "#2563eb" },
    { icon: BookOpen,     name: "Português",   topics: ["Interpretação", "Gramática", "Redação", "Literatura"],       iconBg: "#ede9fe", iconColor: "#7c3aed" },
    { icon: FlaskConical, name: "Ciências",    topics: ["Física Básica", "Química Básica", "Biologia Básica"],        iconBg: "#dcfce7", iconColor: "#16a34a" },
    { icon: Globe2,       name: "Inglês",      topics: ["Interpretação", "Vocabulário", "Gramática", "Listening"],    iconBg: "#cffafe", iconColor: "#0891b2" },
    { icon: Landmark,     name: "História",    topics: ["Brasil", "Mundo", "Atualidades"],                            iconBg: "#ffedd5", iconColor: "#ea580c" },
    { icon: Map,          name: "Geografia",   topics: ["Cartografia", "Brasil", "Geopolítica"],                      iconBg: "#ccfbf1", iconColor: "#0d9488" },
  ],
  enem: [
    { icon: Calculator,  name: "Matemática",           topics: ["Funções", "Trigonometria", "Estatística", "Geometria Espacial"],    iconBg: "#dbeafe", iconColor: "#2563eb" },
    { icon: Pen,         name: "Redação",              topics: ["Dissertação Argumentativa", "Competências 1 a 5", "Temas Sociais"], iconBg: "#fce7f3", iconColor: "#db2777" },
    { icon: Microscope,  name: "Ciências da Natureza", topics: ["Física", "Química", "Biologia", "Ecologia"],                       iconBg: "#dcfce7", iconColor: "#16a34a" },
    { icon: Landmark,    name: "Ciências Humanas",     topics: ["História", "Geografia", "Filosofia", "Sociologia"],                iconBg: "#ffedd5", iconColor: "#ea580c" },
    { icon: Languages,   name: "Linguagens",           topics: ["Português", "Literatura", "Artes", "Inglês ou Espanhol"],          iconBg: "#ede9fe", iconColor: "#7c3aed" },
    { icon: BookOpen,    name: "Atualidades",          topics: ["Política", "Economia", "Meio Ambiente", "Tecnologia"],             iconBg: "#fee2e2", iconColor: "#dc2626" },
  ],
};

export default function Subjects() {
  const [tab, setTab] = useState<Tab>("etec");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const router = useRouter();

  return (
    <section id="materias" ref={ref} className="section-py" style={{ background: "#fff" }}>
      <div className="container-inner">

        <div className="section-header">
          <motion.div initial={{ opacity: 0, y: reduce ? 0 : 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .4 }}
            style={{ display: "inline-flex", alignItems: "center", background: "#dbeafe", color: "#2563eb", padding: ".4rem 1rem", borderRadius: "999px", fontSize: ".8rem", fontWeight: 700, marginBottom: "1rem" }}>
            Grade Curricular
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: reduce ? 0 : 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .45, delay: .07 }}
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(1.75rem, 5vw, 3rem)", color: "#2563eb", lineHeight: 1.15, marginBottom: ".875rem" }}>
            Tudo que vai cair na{" "}
            <span style={{ color: "#2563eb" }}>sua prova</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: reduce ? 0 : 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .45, delay: .13 }}
            style={{ color: "#475569", fontSize: "clamp(.9rem, 2.5vw, 1.05rem)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.65 }}>
            Cobertura completa das disciplinas do Vestibulinho da ETEC e todas as áreas do ENEM.
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .4, delay: .18 }}
          style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <div style={{ display: "flex", background: "#eff6ff", padding: ".375rem", borderRadius: "1rem", gap: ".25rem", width: "100%", maxWidth: "380px", border: "1px solid #dbeafe" }}>
            {(["etec", "enem"] as Tab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                style={{ flex: 1, padding: ".75rem .5rem", borderRadius: ".75rem", fontWeight: 800, fontSize: ".875rem", border: "none", cursor: "pointer", background: tab === t ? "linear-gradient(135deg,#2563eb,#3b82f6)" : "none", color: tab === t ? "#fff" : "#64748b", fontFamily: "Poppins, sans-serif", minHeight: "48px", transition: "background .25s, color .25s", boxShadow: tab === t ? "0 4px 14px rgba(37,99,235,.3)" : "none" }}>
                {t === "etec" ? "Vestibulinho ETEC" : "ENEM"}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduce ? 0 : -12 }} transition={{ duration: .28 }} className="subjects-container">
            {data[tab].map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0, scale: reduce ? 1 : .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .28, delay: i * .05 }}
                style={{ padding: "1.1rem", borderRadius: "1rem", border: "1px solid #f1f5f9", background: "#fff", boxShadow: "0 2px 8px rgba(37,99,235,.05)", minWidth: 0, overflow: "hidden" }}
                whileHover={reduce ? {} : { boxShadow: "0 8px 24px rgba(37,99,235,.12)", borderColor: "#bfdbfe", y: -2 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: ".625rem", marginBottom: ".75rem" }}>
                  <div style={{ width: "2.25rem", height: "2.25rem", background: s.iconBg, borderRadius: ".625rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <s.icon style={{ width: "1rem", height: "1rem", color: s.iconColor }} />
                  </div>
                  <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: ".78rem", color: "#2563eb", lineHeight: 1.2, minWidth: 0, wordBreak: "break-word" }}>{s.name}</h3>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".35rem" }}>
                  {s.topics.map((t) => (
                    <li key={t} style={{ display: "flex", alignItems: "center", gap: ".35rem", fontSize: ".7rem", color: "#64748b" }}>
                      <ChevronRight style={{ width: ".75rem", height: ".75rem", color: s.iconColor, flexShrink: 0 }} />
                      <span style={{ minWidth: 0, wordBreak: "break-word" }}>{t}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .4, delay: .5 }} style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p style={{ color: "#94a3b8", fontSize: ".82rem", marginBottom: "1rem" }}>+ Simulados, revisões e materiais exclusivos para cada disciplina</p>
          <button onClick={() => router.push("/inscricao")}
            style={{ padding: "1rem 2rem", background: "linear-gradient(135deg,#2563eb,#3b82f6)", color: "#fff", borderRadius: "1rem", fontWeight: 800, fontSize: "1rem", border: "none", cursor: "pointer", minHeight: "56px", fontFamily: "inherit", boxShadow: "0 8px 24px rgba(37,99,235,.3)" }}>
            Quero Estudar Tudo Isso Grátis!
          </button>
        </motion.div>
      </div>
    </section>
  );
}
