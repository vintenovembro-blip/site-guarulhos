"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { User, Mail, Phone, BookOpen, Target, CheckCircle2, Loader2, AlertCircle, Sparkles, MapPin } from "lucide-react";

interface FormData {
  nome: string;
  email: string;
  whatsapp: string;
  serie: string;
  interesse: string;
  comoConheceu: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: ".875rem 1rem .875rem 2.75rem",
  borderRadius: ".75rem",
  border: "1px solid #e2e8f0",
  background: "#f8fafc",
  color: "#1e293b",
  fontSize: "16px",
  lineHeight: 1.4,
  outline: "none",
  minHeight: "52px",
  fontFamily: "inherit",
  boxSizing: "border-box",
  appearance: "none",
  WebkitAppearance: "none",
};

const inputErrorStyle: React.CSSProperties = {
  ...inputStyle,
  borderColor: "#fca5a5",
  background: "#fff5f5",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  paddingRight: "2rem",
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: ".7rem",
  fontWeight: 700,
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: ".06em",
  marginBottom: ".4rem",
};

export default function InscricaoForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/inscricao", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (res.ok) { setStatus("success"); reset(); }
      else { setErrorMsg(json.error || "Erro ao enviar. Tente novamente."); setStatus("error"); }
    } catch {
      setErrorMsg("Erro de conexão. Verifique sua internet e tente novamente.");
      setStatus("error");
    }
  };

  const fieldPos = { position: "relative" as const };
  const iconStyle: React.CSSProperties = { position: "absolute", left: ".875rem", top: "50%", transform: "translateY(-50%)", width: "1rem", height: "1rem", color: "#94a3b8", pointerEvents: "none" };

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
              <span style={{ color: "#fff" }}>600 vagas presenciais + vagas ilimitadas online</span>
            </div>

            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(1.75rem, 5vw, 2.75rem)", lineHeight: 1.1, marginBottom: "1rem" }}>
              Garanta sua vaga{" "}
              <span style={{ color: "#fbbf24" }}>agora mesmo!</span>
            </h2>

            <p style={{ color: "rgba(255,255,255,.88)", fontSize: "clamp(.9rem, 2.5vw, 1.05rem)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Uma iniciativa do <strong style={{ color: "#fff" }}>Cursinho 20 de Novembro</strong> com a Secretaria de Juventude de Guarulhos. Vagas presenciais nos CEUs Pimentas, Bonsucesso e Cabuçu — ou acompanhe online pelo formato híbrido.{" "}
              <strong style={{ color: "#f0f6ff" }}>Totalmente gratuito.</strong>
            </p>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".75rem" }}>
              {["200 vagas por CEU (Pimentas, Bonsucesso, Cabuçu)", "Vagas ilimitadas no formato híbrido/online", "Metodologia CPOP alinhada ao MEC", "Para jovens de 15 a 25 anos de Guarulhos"].map((item, i) => (
                <motion.li key={item} initial={{ opacity: 0, x: reduce ? 0 : -14 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: .1 * i + .3 }}
                  style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
                  <CheckCircle2 style={{ width: "1.15rem", height: "1.15rem", color: "#4ade80", flexShrink: 0 }} />
                  <span style={{ color: "rgba(255,255,255,.88)", fontSize: ".88rem" }}>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* FORM CARD */}
          <motion.div className="inscricao-form" initial={{ opacity: 0, y: reduce ? 0 : 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .55, delay: .15 }} style={{ minWidth: 0 }}>
            <div style={{ background: "#fff", borderRadius: "1.5rem", padding: "1.75rem", boxShadow: "0 25px 60px rgba(37,99,235,.18), 0 8px 24px rgba(0,0,0,.08)" }}>
              <AnimatePresence mode="wait">

                {/* SUCCESS */}
                {status === "success" ? (
                  <motion.div key="ok" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "2rem 0" }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: .45, delay: .1 }} style={{ width: "5rem", height: "5rem", background: "rgba(22,163,74,.15)", border: "2px solid rgba(74,222,128,.4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", boxShadow: "0 0 24px rgba(74,222,128,.3)" }}>
                      <CheckCircle2 style={{ width: "2.5rem", height: "2.5rem", color: "#4ade80" }} />
                    </motion.div>
                    <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "1.35rem", color: "#2563eb", marginBottom: ".5rem" }}>Inscrição Confirmada!</h3>
                    <p style={{ color: "#475569", fontSize: ".88rem", lineHeight: 1.6 }}>Em breve você receberá mais informações por e-mail e WhatsApp.</p>
                    <button onClick={() => setStatus("idle")} style={{ marginTop: "1.5rem", padding: ".75rem 1.5rem", background: "linear-gradient(135deg,#2563eb,#3b82f6)", color: "#fff", borderRadius: ".75rem", fontWeight: 700, fontSize: ".9rem", border: "none", cursor: "pointer", minHeight: "48px", fontFamily: "inherit" }}>
                      Nova inscrição
                    </button>
                  </motion.div>

                ) : (

                  /* FORM */
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div style={{ marginBottom: "1.25rem" }}>
                      <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "1.2rem", color: "#2563eb", marginBottom: ".2rem" }}>Inscreva-se Gratuitamente</h3>
                      <p style={{ color: "#94a3b8", fontSize: ".82rem" }}>Preencha os dados abaixo</p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                      {/* Nome */}
                      <div>
                        <label htmlFor="f-nome" style={labelStyle}>Nome Completo *</label>
                        <div style={fieldPos}>
                          <User style={iconStyle} />
                          <input id="f-nome" type="text" autoComplete="name" {...register("nome", { required: "Nome é obrigatório", minLength: { value: 3, message: "Nome muito curto" } })} placeholder="Seu nome completo" style={errors.nome ? inputErrorStyle : inputStyle} />
                        </div>
                        {errors.nome && <p style={{ marginTop: ".3rem", fontSize: ".75rem", color: "#f87171", display: "flex", alignItems: "center", gap: ".3rem" }}><AlertCircle style={{ width: ".8rem", height: ".8rem" }} />{errors.nome.message}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="f-email" style={labelStyle}>E-mail *</label>
                        <div style={fieldPos}>
                          <Mail style={iconStyle} />
                          <input id="f-email" type="email" autoComplete="email" inputMode="email" {...register("email", { required: "E-mail é obrigatório", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "E-mail inválido" } })} placeholder="seu@email.com" style={errors.email ? inputErrorStyle : inputStyle} />
                        </div>
                        {errors.email && <p style={{ marginTop: ".3rem", fontSize: ".75rem", color: "#f87171", display: "flex", alignItems: "center", gap: ".3rem" }}><AlertCircle style={{ width: ".8rem", height: ".8rem" }} />{errors.email.message}</p>}
                      </div>

                      {/* WhatsApp */}
                      <div>
                        <label htmlFor="f-phone" style={labelStyle}>WhatsApp *</label>
                        <div style={fieldPos}>
                          <Phone style={iconStyle} />
                          <input id="f-phone" type="tel" autoComplete="tel" inputMode="tel" {...register("whatsapp", { required: "WhatsApp é obrigatório", minLength: { value: 10, message: "Número inválido" } })} placeholder="(11) 99999-9999" style={errors.whatsapp ? inputErrorStyle : inputStyle} />
                        </div>
                        {errors.whatsapp && <p style={{ marginTop: ".3rem", fontSize: ".75rem", color: "#f87171", display: "flex", alignItems: "center", gap: ".3rem" }}><AlertCircle style={{ width: ".8rem", height: ".8rem" }} />{errors.whatsapp.message}</p>}
                      </div>

                      {/* Série + Interesse */}
                      <div>
                        <div className="select-row">
                          <div>
                            <label htmlFor="f-serie" style={labelStyle}>Série *</label>
                            <div style={fieldPos}>
                              <BookOpen style={iconStyle} />
                              <select id="f-serie" {...register("serie", { required: true })} style={errors.serie ? inputErrorStyle : selectStyle}>
                                <option value="">Selecione</option>
                                <option value="1-medio">1° Médio</option>
                                <option value="2-medio">2° Médio</option>
                                <option value="3-medio">3° Médio</option>
                                <option value="formado">Já formado</option>
                              </select>
                            </div>
                            {errors.serie && <p style={{ marginTop: ".3rem", fontSize: ".75rem", color: "#f87171" }}>Obrigatório</p>}
                          </div>
                          <div>
                            <label htmlFor="f-interesse" style={labelStyle}>Interesse *</label>
                            <div style={fieldPos}>
                              <Target style={iconStyle} />
                              <select id="f-interesse" {...register("interesse", { required: true })} style={errors.interesse ? inputErrorStyle : selectStyle}>
                                <option value="">Selecione</option>
                                <option value="etec">ETEC</option>
                                <option value="enem">ENEM</option>
                                <option value="ambos">ETEC + ENEM</option>
                              </select>
                            </div>
                            {errors.interesse && <p style={{ marginTop: ".3rem", fontSize: ".75rem", color: "#f87171" }}>Obrigatório</p>}
                          </div>
                        </div>
                      </div>

                      {/* Unidade / Modalidade */}
                      <div>
                        <label htmlFor="f-unidade" style={labelStyle}>Unidade / Modalidade *</label>
                        <div style={fieldPos}>
                          <MapPin style={iconStyle} />
                          <select id="f-unidade" {...register("comoConheceu", { required: true })} style={errors.comoConheceu ? { ...inputErrorStyle, paddingLeft: "2.75rem", paddingRight: "2rem", cursor: "pointer" } : { ...selectStyle, paddingLeft: "2.75rem" }}>
                            <option value="">Selecione</option>
                            <option value="ceu-pimentas">CEU Pimentas — Presencial</option>
                            <option value="ceu-bonsucesso">CEU Bonsucesso — Presencial</option>
                            <option value="ceu-cabucu">CEU Cabuçu — Presencial</option>
                            <option value="hibrido-online">Online (Formato Híbrido)</option>
                          </select>
                        </div>
                        {errors.comoConheceu && <p style={{ marginTop: ".3rem", fontSize: ".75rem", color: "#f87171" }}>Obrigatório</p>}
                      </div>
                    </div>

                    {/* Error */}
                    {status === "error" && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: "1rem", padding: ".75rem 1rem", background: "rgba(239,68,68,.1)", border: "1px solid rgba(248,113,113,.4)", borderRadius: ".75rem", display: "flex", alignItems: "flex-start", gap: ".5rem", color: "#f87171", fontSize: ".82rem" }}>
                        <AlertCircle style={{ width: "1rem", height: "1rem", flexShrink: 0, marginTop: ".1rem" }} />
                        {errorMsg}
                      </motion.div>
                    )}

                    {/* Submit */}
                    <button type="submit" disabled={status === "loading"}
                      style={{ marginTop: "1.25rem", width: "100%", padding: "1rem", background: status === "loading" ? "rgba(37,99,235,.5)" : "linear-gradient(135deg,#2563eb,#3b82f6)", color: "#fff", borderRadius: ".875rem", fontWeight: 800, fontSize: "1rem", border: "none", cursor: status === "loading" ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", minHeight: "56px", fontFamily: "inherit", boxShadow: status === "loading" ? "none" : "0 0 28px rgba(59,130,246,.45), 0 8px 24px rgba(37,99,235,.3)" }}>
                      {status === "loading" ? <><Loader2 style={{ width: "1.1rem", height: "1.1rem" }} className="animate-spin" />Enviando...</> : <><Sparkles style={{ width: "1.1rem", height: "1.1rem" }} />Garantir Minha Vaga Grátis!</>}
                    </button>

                    <p style={{ marginTop: ".75rem", textAlign: "center", fontSize: ".72rem", color: "#94a3b8" }}>
                      Seus dados estão seguros. Não enviamos spam.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
