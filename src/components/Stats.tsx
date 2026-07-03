"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Users, MapPin, UserCheck, Calendar } from "lucide-react";

const stats = [
  { icon: Users,     value: 800, suffix: "",           label: "Vagas Presenciais", sub: "400 por unidade CEU",              iconBg: "#dbeafe", iconColor: "#2563eb", numColor: "#2563eb" },
  { icon: MapPin,    value: 2,   suffix: "",           label: "Unidades CEU",      sub: "Bonsucesso · Continental",         iconBg: "#fef9c3", iconColor: "#ca8a04", numColor: "#a16207" },
  { icon: Calendar,  value: 0,   suffix: "Sábados",    label: "Dia de Aula",       sub: "Manhã ou tarde, conforme a unidade", iconBg: "#fee2e2", iconColor: "#ef4444", numColor: "#dc2626" },
  { icon: UserCheck, value: 0,   suffix: "15 a 25 anos", label: "Faixa Etária",    sub: "Jovens de Guarulhos",               iconBg: "#dcfce7", iconColor: "#16a34a", numColor: "#15803d" },
];

function CountUp({ target, suffix, color, isSymbol }: { target: number; suffix: string; color: string; isSymbol?: boolean }) {
  const [n, setN] = useState(isSymbol ? 0 : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (isSymbol || target === 0) { setN(target); return; }
    if (!inView) return;
    if (reduce) { setN(target); return; }
    let cur = 0;
    const step = target / 50;
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setN(target); clearInterval(id); }
      else setN(Math.floor(cur));
    }, 1800 / 50);
    return () => clearInterval(id);
  }, [inView, target, reduce, isSymbol]);

  if (isSymbol || target === 0) {
    return <span ref={ref} style={{ color }}>{suffix}</span>;
  }
  return <span ref={ref} style={{ color }}>{n}{suffix}</span>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  return (
    <section ref={ref} style={{ background: "#fff", borderTop: "1px solid #dbeafe", borderBottom: "1px solid #dbeafe" }}>
      <div className="container-inner" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: .45, delay: i * .08 }}
              whileHover={reduce ? {} : { y: -3, boxShadow: "0 8px 24px rgba(37,99,235,.12)" }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "1.5rem .75rem", borderRadius: "1rem", background: "#f8fbff", border: "1px solid #e0eefe", transition: "box-shadow .25s" }}
            >
              <div style={{ width: "3rem", height: "3rem", background: s.iconBg, borderRadius: ".875rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: ".875rem", flexShrink: 0 }}>
                <s.icon style={{ width: "1.4rem", height: "1.4rem", color: s.iconColor }} />
              </div>
              <div style={{ fontSize: i >= 2 ? "clamp(1.1rem, 3.5vw, 1.5rem)" : "clamp(1.75rem, 5vw, 2.25rem)", fontWeight: 900, fontFamily: "Poppins, sans-serif", lineHeight: 1, marginBottom: ".3rem" }}>
                <CountUp target={s.value} suffix={s.suffix} color={s.numColor} isSymbol={s.value === 0} />
              </div>
              <div style={{ color: "#1e293b", fontSize: ".78rem", fontWeight: 700, lineHeight: 1.3, marginBottom: ".2rem" }}>{s.label}</div>
              <div style={{ color: "#94a3b8", fontSize: ".68rem", lineHeight: 1.3 }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
