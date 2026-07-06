"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Phone, BookOpen, Target, MapPin, Hash,
  CheckCircle2, Loader2, AlertCircle, Sparkles, ArrowRight, ArrowLeft,
} from "lucide-react";

interface FormData {
  nome: string;
  dataNascimento: string;
  email: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  serie: string;
  interesse: string;
  unidade: string;
  whatsapp: string;
}

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const CURRENT_YEAR = new Date().getFullYear();
const DIAS = Array.from({ length: 31 }, (_, i) => i + 1);
const ANOS = Array.from({ length: 91 }, (_, i) => CURRENT_YEAR - 10 - i);

function isValidCalendarDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

const STEPS: { title: string; fields: (keyof FormData)[] }[] = [
  { title: "Dados pessoais", fields: ["nome", "dataNascimento", "email"] },
  { title: "Endereço", fields: ["cep", "rua", "numero", "bairro", "cidade"] },
  { title: "Curso", fields: ["serie", "interesse", "unidade", "whatsapp"] },
];

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

const selectStyle: React.CSSProperties = { ...inputStyle, paddingRight: "2rem", cursor: "pointer" };

const compactSelectStyle: React.CSSProperties = {
  ...inputStyle,
  padding: ".875rem .5rem",
  cursor: "pointer",
};

const compactSelectErrorStyle: React.CSSProperties = {
  ...compactSelectStyle,
  borderColor: "#fca5a5",
  background: "#fff5f5",
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

const fieldPos = { position: "relative" as const };
const iconStyle: React.CSSProperties = {
  position: "absolute", left: ".875rem", top: "50%", transform: "translateY(-50%)",
  width: "1rem", height: "1rem", color: "#94a3b8", pointerEvents: "none",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p style={{ marginTop: ".3rem", fontSize: ".75rem", color: "#f87171", display: "flex", alignItems: "center", gap: ".3rem" }}>
      <AlertCircle style={{ width: ".8rem", height: ".8rem" }} />
      {message}
    </p>
  );
}

export default function InscricaoWizard() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const updateNascimento = (novoDia: string, novoMes: string, novoAno: string) => {
    if (novoDia && novoMes && novoAno) {
      const iso = `${novoAno}-${novoMes.padStart(2, "0")}-${novoDia.padStart(2, "0")}`;
      setValue("dataNascimento", iso, { shouldValidate: true });
    } else {
      setValue("dataNascimento", "", { shouldValidate: true });
    }
  };

  const isLastStep = step === STEPS.length - 1;

  const goNext = async () => {
    const valid = await trigger(STEPS[step].fields);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length !== 8) return;
    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setValue("rua", data.logradouro || "", { shouldValidate: true });
        setValue("bairro", data.bairro || "", { shouldValidate: true });
        setValue("cidade", data.localidade || "", { shouldValidate: true });
      }
    } catch {
      // silencioso — usuário pode preencher manualmente
    }
    setCepLoading(false);
  };

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/inscricao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        setStatus("success");
        reset();
        setStep(0);
      } else {
        setErrorMsg(json.error || "Erro ao enviar. Tente novamente.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Erro de conexão. Verifique sua internet e tente novamente.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "2rem 0" }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: .45, delay: .1 }} style={{ width: "5rem", height: "5rem", background: "rgba(22,163,74,.15)", border: "2px solid rgba(74,222,128,.4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", boxShadow: "0 0 24px rgba(74,222,128,.3)" }}>
          <CheckCircle2 style={{ width: "2.5rem", height: "2.5rem", color: "#4ade80" }} />
        </motion.div>
        <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "1.35rem", color: "#2563eb", marginBottom: ".5rem" }}>Inscrição Confirmada!</h3>
        <p style={{ color: "#475569", fontSize: ".88rem", lineHeight: 1.6 }}>Em breve você receberá mais informações por e-mail e WhatsApp.</p>
        <button onClick={() => setStatus("idle")} style={{ marginTop: "1.5rem", padding: ".75rem 1.5rem", background: "linear-gradient(135deg,#2563eb,#3b82f6)", color: "#fff", borderRadius: ".75rem", fontWeight: 700, fontSize: ".9rem", border: "none", cursor: "pointer", minHeight: "48px", fontFamily: "inherit" }}>
          Nova inscrição
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div style={{ marginBottom: "1.25rem" }}>
        <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "1.2rem", color: "#2563eb", marginBottom: ".2rem" }}>Inscreva-se Gratuitamente</h3>
        <p style={{ color: "#94a3b8", fontSize: ".82rem" }}>Passo {step + 1} de {STEPS.length} · {STEPS[step].title}</p>
      </div>

      {/* Progress bar */}
      <div style={{ display: "flex", gap: ".4rem", marginBottom: "1.5rem" }}>
        {STEPS.map((s, i) => (
          <div key={s.title} style={{ flex: 1, height: "6px", borderRadius: "999px", background: i <= step ? "#2563eb" : "#e2e8f0", transition: "background .3s" }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: .25 }}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {step === 0 && (
            <>
              <div>
                <label htmlFor="f-nome" style={labelStyle}>Nome Completo *</label>
                <div style={fieldPos}>
                  <User style={iconStyle} />
                  <input id="f-nome" type="text" autoComplete="name" {...register("nome", { required: "Nome é obrigatório", minLength: { value: 3, message: "Nome muito curto" } })} placeholder="Seu nome completo" style={errors.nome ? inputErrorStyle : inputStyle} />
                </div>
                <FieldError message={errors.nome?.message} />
              </div>

              <div>
                <label style={labelStyle}>Data de Nascimento *</label>
                <input type="hidden" {...register("dataNascimento", {
                  required: "Data de nascimento é obrigatória",
                  validate: (v) => isValidCalendarDate(v) || "Data inválida",
                })} />
                <div className="birthdate-row">
                  <select
                    aria-label="Dia"
                    value={dia}
                    onChange={(e) => { setDia(e.target.value); updateNascimento(e.target.value, mes, ano); }}
                    style={errors.dataNascimento ? compactSelectErrorStyle : compactSelectStyle}
                  >
                    <option value="">Dia</option>
                    {DIAS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <select
                    aria-label="Mês"
                    value={mes}
                    onChange={(e) => { setMes(e.target.value); updateNascimento(dia, e.target.value, ano); }}
                    style={errors.dataNascimento ? compactSelectErrorStyle : compactSelectStyle}
                  >
                    <option value="">Mês</option>
                    {MESES.map((nome, i) => <option key={nome} value={i + 1}>{nome}</option>)}
                  </select>
                  <select
                    aria-label="Ano"
                    value={ano}
                    onChange={(e) => { setAno(e.target.value); updateNascimento(dia, mes, e.target.value); }}
                    style={errors.dataNascimento ? compactSelectErrorStyle : compactSelectStyle}
                  >
                    <option value="">Ano</option>
                    {ANOS.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <FieldError message={errors.dataNascimento?.message} />
              </div>

              <div>
                <label htmlFor="f-email" style={labelStyle}>E-mail *</label>
                <div style={fieldPos}>
                  <Mail style={iconStyle} />
                  <input id="f-email" type="email" autoComplete="email" inputMode="email" {...register("email", { required: "E-mail é obrigatório", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "E-mail inválido" } })} placeholder="seu@email.com" style={errors.email ? inputErrorStyle : inputStyle} />
                </div>
                <FieldError message={errors.email?.message} />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div>
                <label htmlFor="f-cep" style={labelStyle}>CEP *</label>
                <div style={fieldPos}>
                  <MapPin style={iconStyle} />
                  <input id="f-cep" type="text" inputMode="numeric" autoComplete="postal-code" {...register("cep", { required: "CEP é obrigatório", minLength: { value: 8, message: "CEP inválido" } })} onBlur={handleCepBlur} placeholder="00000-000" style={errors.cep ? inputErrorStyle : inputStyle} />
                </div>
                <FieldError message={errors.cep?.message ?? (cepLoading ? "Buscando endereço..." : undefined)} />
              </div>

              <div>
                <label htmlFor="f-rua" style={labelStyle}>Rua *</label>
                <div style={fieldPos}>
                  <MapPin style={iconStyle} />
                  <input id="f-rua" type="text" autoComplete="address-line1" {...register("rua", { required: "Rua é obrigatória" })} placeholder="Nome da rua" style={errors.rua ? inputErrorStyle : inputStyle} />
                </div>
                <FieldError message={errors.rua?.message} />
              </div>

              <div className="select-row">
                <div>
                  <label htmlFor="f-numero" style={labelStyle}>Número *</label>
                  <div style={fieldPos}>
                    <Hash style={iconStyle} />
                    <input id="f-numero" type="text" autoComplete="address-line2" {...register("numero", { required: "Obrigatório" })} placeholder="Nº" style={errors.numero ? inputErrorStyle : inputStyle} />
                  </div>
                  <FieldError message={errors.numero?.message} />
                </div>
                <div>
                  <label htmlFor="f-bairro" style={labelStyle}>Bairro *</label>
                  <div style={fieldPos}>
                    <MapPin style={iconStyle} />
                    <input id="f-bairro" type="text" {...register("bairro", { required: "Obrigatório" })} placeholder="Bairro" style={errors.bairro ? inputErrorStyle : inputStyle} />
                  </div>
                  <FieldError message={errors.bairro?.message} />
                </div>
              </div>

              <div>
                <label htmlFor="f-cidade" style={labelStyle}>Cidade *</label>
                <div style={fieldPos}>
                  <MapPin style={iconStyle} />
                  <input id="f-cidade" type="text" autoComplete="address-level2" {...register("cidade", { required: "Cidade é obrigatória" })} placeholder="Cidade" style={errors.cidade ? inputErrorStyle : inputStyle} />
                </div>
                <FieldError message={errors.cidade?.message} />
              </div>
            </>
          )}

          {step === 2 && (
            <>
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
                  {errors.serie && <FieldError message="Obrigatório" />}
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
                  {errors.interesse && <FieldError message="Obrigatório" />}
                </div>
              </div>

              <div>
                <label htmlFor="f-unidade" style={labelStyle}>Unidade *</label>
                <div style={fieldPos}>
                  <MapPin style={iconStyle} />
                  <select id="f-unidade" {...register("unidade", { required: true })} style={errors.unidade ? inputErrorStyle : selectStyle}>
                    <option value="">Selecione</option>
                    <option value="ceu-bonsucesso">CEU Bonsucesso</option>
                    <option value="ceu-continental">CEU Continental</option>
                  </select>
                </div>
                {errors.unidade && <FieldError message="Obrigatório" />}
              </div>

              <div>
                <label htmlFor="f-phone" style={labelStyle}>WhatsApp *</label>
                <div style={fieldPos}>
                  <Phone style={iconStyle} />
                  <input id="f-phone" type="tel" autoComplete="tel" inputMode="tel" {...register("whatsapp", { required: "WhatsApp é obrigatório", minLength: { value: 10, message: "Número inválido" } })} placeholder="(11) 99999-9999" style={errors.whatsapp ? inputErrorStyle : inputStyle} />
                </div>
                <FieldError message={errors.whatsapp?.message} />
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {status === "error" && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: "1rem", padding: ".75rem 1rem", background: "rgba(239,68,68,.1)", border: "1px solid rgba(248,113,113,.4)", borderRadius: ".75rem", display: "flex", alignItems: "flex-start", gap: ".5rem", color: "#f87171", fontSize: ".82rem" }}>
          <AlertCircle style={{ width: "1rem", height: "1rem", flexShrink: 0, marginTop: ".1rem" }} />
          {errorMsg}
        </motion.div>
      )}

      <div style={{ display: "flex", gap: ".75rem", marginTop: "1.5rem" }}>
        {step > 0 && (
          <button type="button" onClick={goBack} style={{ flex: "0 0 auto", padding: "1rem 1.25rem", background: "#f1f5f9", color: "#475569", borderRadius: ".875rem", fontWeight: 700, fontSize: ".9rem", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", minHeight: "56px", fontFamily: "inherit" }}>
            <ArrowLeft style={{ width: "1rem", height: "1rem" }} />
            Voltar
          </button>
        )}

        {isLastStep ? (
          <button type="submit" disabled={status === "loading"}
            style={{ flex: 1, padding: "1rem", background: status === "loading" ? "rgba(37,99,235,.5)" : "linear-gradient(135deg,#2563eb,#3b82f6)", color: "#fff", borderRadius: ".875rem", fontWeight: 800, fontSize: "1rem", border: "none", cursor: status === "loading" ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", minHeight: "56px", fontFamily: "inherit", boxShadow: status === "loading" ? "none" : "0 0 28px rgba(59,130,246,.45), 0 8px 24px rgba(37,99,235,.3)" }}>
            {status === "loading" ? <><Loader2 style={{ width: "1.1rem", height: "1.1rem" }} className="animate-spin" />Enviando...</> : <><Sparkles style={{ width: "1.1rem", height: "1.1rem" }} />Garantir Minha Vaga Grátis!</>}
          </button>
        ) : (
          <button type="button" onClick={goNext}
            style={{ flex: 1, padding: "1rem", background: "linear-gradient(135deg,#2563eb,#3b82f6)", color: "#fff", borderRadius: ".875rem", fontWeight: 800, fontSize: "1rem", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", minHeight: "56px", fontFamily: "inherit" }}>
            Próximo
            <ArrowRight style={{ width: "1.1rem", height: "1.1rem" }} />
          </button>
        )}
      </div>

      <p style={{ marginTop: ".75rem", textAlign: "center", fontSize: ".72rem", color: "#94a3b8" }}>
        Seus dados estão seguros. Não enviamos spam.
      </p>
    </form>
  );
}
