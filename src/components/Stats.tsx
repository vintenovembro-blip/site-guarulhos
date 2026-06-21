"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Users, Trophy, BookOpen, Heart } from "lucide-react";

const stats = [
  { icon: Users,    value: 200, suffix: "+", label: "Alunos Atendidos",     iconBg: "#dbeafe", iconColor: "#2563eb", numColor: "#2563eb" },
  { icon: Trophy,   value: 85,  suffix: "%", label: "Taxa de Aprovação",    iconBg: "#fef9c3", iconColor: "#ca8a04", numColor: "#a16207" },
  { icon: BookOpen, value: 12,  suffix: "",  label: "Disciplinas Cobertas", iconBg: "#dcfce7", iconColor: "#16a34a", numColor: "#15803d" },
  { icon: Heart,    value: 100, suffix: "%", label: "Gratuito Para Todos",  iconBg: "#fee2e2", iconColor: "#ef4444", numColor: "#dc2626" },
];

function CountUp({ target, suffix, color }: { target: number; suffix: string; color: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
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
  }, [inView, target, reduce]);

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
              <div style={{ fontSize: "clamp(1.75rem, 5vw, 2.25rem)", fontWeight: 900, fontFamily: "Poppins, sans-serif", lineHeight: 1, marginBottom: ".3rem" }}>
                <CountUp target={s.value} suffix={s.suffix} color={s.numColor} />
              </div>
              <div style={{ color: "#64748b", fontSize: ".78rem", fontWeight: 500, lineHeight: 1.3 }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
