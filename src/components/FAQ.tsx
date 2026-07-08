"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

const faqs = [
  {
    question: "O programa Sua Chance é realmente gratuito?",
    answer: "Sim, 100% gratuito. O programa é uma iniciativa do Cursinho 20 de Novembro em parceria com a Secretaria de Juventude da Prefeitura Municipal de Guarulhos. Não há mensalidades, taxas de matrícula, cobranças por material ou qualquer outro custo para o aluno.",
  },
  {
    question: "Quem pode se inscrever?",
    answer: "Jovens com idades entre 15 e 29 anos moradores de Guarulhos, com prioridade para residentes das regiões periféricas do município. O programa é voltado especialmente para quem não tem condições de custear um cursinho particular.",
  },
  {
    question: "Onde são as aulas presenciais?",
    answer: "As aulas presenciais acontecem aos sábados em dois Centros de Educação Unificados (CEUs) de Guarulhos: CEU Bonsucesso e CEU Continental. Cada unidade oferece 200 vagas, totalizando 400 vagas presenciais.",
  },
  {
    question: "Os dois CEUs têm o mesmo horário?",
    answer: "Não. O CEU Bonsucesso tem aulas aos sábados das 8h às 12h15, e o CEU Continental aos sábados das 13h30 às 17h30. Escolha a unidade e o horário que melhor se encaixam na sua rotina.",
  },
  {
    question: "Qual metodologia o programa utiliza?",
    answer: "O conteúdo e a metodologia estão alinhados às diretrizes dos cursinhos populares do CPOP, vinculados ao Ministério da Educação, garantindo total conformidade com as exigências do Edital 04/2026 CPOP.",
  },
  {
    question: "Para quais exames o programa prepara?",
    answer: "O Sua Chance prepara para o Vestibulinho da ETEC (Escola Técnica Estadual) — porta de entrada para o ensino técnico gratuito em SP — e para o ENEM, que viabiliza o acesso a universidades públicas e bolsas de estudo no ensino superior.",
  },
  {
    question: "Quantas vagas estão disponíveis?",
    answer: "São 400 vagas presenciais, sendo 200 no CEU Bonsucesso e 200 no CEU Continental.",
  },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: reduce ? 0 : 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .38, delay: index * .06 }}
      style={{ borderRadius: "1rem", border: open ? "1px solid #93c5fd" : "1px solid #e2e8f0", background: open ? "#eff6ff" : "#fff", overflow: "hidden", transition: "border-color .2s, background .2s, box-shadow .2s", boxShadow: open ? "0 4px 20px rgba(37,99,235,.1)" : "0 1px 4px rgba(0,0,0,.04)" }}>
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", gap: "1rem", background: "none", border: "none", cursor: "pointer", textAlign: "left", minHeight: "60px", fontFamily: "inherit" }}>
        <span style={{ fontWeight: 600, color: open ? "#2563eb" : "#3b82f6", fontSize: "clamp(.85rem, 2.5vw, .95rem)", lineHeight: 1.4, flex: 1, minWidth: 0, transition: "color .2s" }}>
          {question}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: reduce ? 0 : .22 }}
          style={{ width: "1.75rem", height: "1.75rem", borderRadius: ".5rem", display: "flex", alignItems: "center", justifyContent: "center", background: open ? "#2563eb" : "#f1f5f9", color: open ? "#fff" : "#64748b", flexShrink: 0, transition: "background .2s, color .2s" }}>
          <ChevronDown style={{ width: "1rem", height: "1rem" }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0 : .26, ease: "easeInOut" }} style={{ overflow: "hidden" }}>
            <p style={{ padding: "0 1.25rem 1.25rem", color: "#475569", fontSize: ".85rem", lineHeight: 1.7 }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  return (
    <section id="faq" ref={ref} className="section-py" style={{ background: "#f0f6ff" }}>
      <div className="container-inner">

        <div className="section-header">
          <motion.div initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .4 }}
            style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", background: "#dbeafe", color: "#2563eb", padding: ".4rem 1rem", borderRadius: "999px", fontSize: ".8rem", fontWeight: 700, marginBottom: "1rem" }}>
            <MessageCircleQuestion style={{ width: "1rem", height: "1rem", flexShrink: 0 }} />
            Perguntas Frequentes
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .45, delay: .08 }}
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(1.75rem, 5vw, 3rem)", color: "#2563eb", lineHeight: 1.15, marginBottom: ".875rem" }}>
            Ficou com{" "}
            <span style={{ color: "#3b82f6" }}>dúvidas?</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .45, delay: .15 }}
            style={{ color: "#475569", fontSize: "clamp(.9rem, 2.5vw, 1.05rem)", lineHeight: 1.65 }}>
            Respondemos as perguntas mais comuns sobre o programa Sua Chance.
          </motion.p>
        </div>

        <div style={{ maxWidth: "780px", margin: "0 auto", display: "flex", flexDirection: "column", gap: ".75rem" }}>
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} index={i} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .45, delay: .6 }}
          style={{ maxWidth: "780px", margin: "1.5rem auto 0", padding: "1.25rem", borderRadius: "1rem", border: "1px solid #bfdbfe", background: "#eff6ff", textAlign: "center" }}>
          <p style={{ color: "#2563eb", fontWeight: 600, fontSize: ".9rem", marginBottom: ".25rem" }}>Ainda tem dúvida?</p>
          <p style={{ color: "#64748b", fontSize: ".8rem", marginBottom: "1rem" }}>Fale com a equipe do Cursinho 20 de Novembro pelo WhatsApp.</p>
          <a href="https://wa.me/5511963056974?text=Ol%C3%A1!" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".875rem 1.5rem", background: "#16a34a", color: "#fff", borderRadius: ".875rem", fontWeight: 800, fontSize: ".9rem", textDecoration: "none", minHeight: "52px", boxShadow: "0 4px 16px rgba(22,163,74,.3)" }}>
            <svg style={{ width: "1.15rem", height: "1.15rem", flexShrink: 0 }} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Falar no WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
