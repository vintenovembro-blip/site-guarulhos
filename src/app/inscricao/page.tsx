import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import InscricaoWizard from "@/components/InscricaoWizard";

export const metadata: Metadata = {
  title: "Inscreva-se Grátis",
  description:
    "Garanta sua vaga gratuita no Cursinho 20 de Novembro. Preparação para ETEC e ENEM nos CEUs Bonsucesso e Continental, em Guarulhos.",
};

export default function InscricaoPage() {
  return (
    <main className="gradient-hero" style={{ minHeight: "100dvh", display: "flex", alignItems: "center", padding: "2.5rem 1rem" }}>
      <div className="container-inner" style={{ width: "100%" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
            <Link href="/">
              <Image
                src="/images/logos/Logo branco.png"
                alt="Sua Chance"
                width={160}
                height={54}
                style={{ height: "auto", width: "160px", objectFit: "contain" }}
                priority
                unoptimized
              />
            </Link>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
            <div className="glass" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".4rem 1rem", borderRadius: "999px", fontSize: ".8rem" }}>
              <Sparkles style={{ width: "1rem", height: "1rem", color: "#fbbf24", flexShrink: 0 }} />
              <span style={{ color: "#fff" }}>100% gratuito · CEU Bonsucesso e CEU Continental</span>
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: "1.5rem", padding: "1.75rem", boxShadow: "0 25px 60px rgba(37,99,235,.25), 0 8px 24px rgba(0,0,0,.1)" }}>
            <InscricaoWizard />
          </div>

          <p style={{ textAlign: "center", color: "rgba(255,255,255,.75)", fontSize: ".78rem", marginTop: "1.25rem" }}>
            Uma iniciativa do Cursinho 20 de Novembro com a Secretaria de Juventude de Guarulhos.
          </p>
        </div>
      </div>
    </main>
  );
}
