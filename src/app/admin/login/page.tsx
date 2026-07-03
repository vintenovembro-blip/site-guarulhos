"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogIn } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("E-mail ou senha inválidos.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f6ff",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          background: "#fff",
          borderRadius: "1.25rem",
          padding: "2.5rem 2rem",
          boxShadow: "0 20px 50px rgba(30,64,175,.12)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
          <Image
            src="/images/logos/Logo normal.png"
            alt="Sua Chance"
            width={140}
            height={48}
            style={{ height: "auto", width: "140px", objectFit: "contain" }}
            priority
            unoptimized
          />
        </div>

        <h1
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 800,
            fontSize: "1.25rem",
            textAlign: "center",
            color: "#1e293b",
            marginBottom: ".35rem",
          }}
        >
          Painel Administrativo
        </h1>
        <p style={{ textAlign: "center", color: "#64748b", fontSize: ".875rem", marginBottom: "2rem" }}>
          Entre com sua conta para continuar
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: ".8rem", fontWeight: 600, color: "#334155", marginBottom: ".35rem" }}>
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@email.com"
              style={{
                width: "100%",
                padding: ".75rem .9rem",
                borderRadius: ".65rem",
                border: "1px solid #cbd5e1",
                fontSize: ".95rem",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: ".8rem", fontWeight: 600, color: "#334155", marginBottom: ".35rem" }}>
              Senha
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: ".75rem .9rem",
                borderRadius: ".65rem",
                border: "1px solid #cbd5e1",
                fontSize: ".95rem",
                outline: "none",
              }}
            />
          </div>

          {error && (
            <div style={{ color: "#dc2626", fontSize: ".85rem", background: "#fef2f2", padding: ".6rem .8rem", borderRadius: ".5rem" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: ".5rem",
              width: "100%",
              padding: ".85rem",
              marginTop: ".5rem",
              background: loading ? "#93c5fd" : "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: ".65rem",
              fontWeight: 700,
              fontSize: ".95rem",
              cursor: loading ? "default" : "pointer",
            }}
          >
            <LogIn style={{ width: "1.05rem", height: "1.05rem" }} />
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
