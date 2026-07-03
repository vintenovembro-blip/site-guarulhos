import { createSupabaseServiceClient } from "@/lib/supabase/service";
import InscricoesTable from "@/components/admin/InscricoesTable";
import type { Inscricao } from "@/lib/admin/stats";

export const dynamic = "force-dynamic";

async function getInscricoes(): Promise<Inscricao[]> {
  const supabase = createSupabaseServiceClient();
  const { data } = await supabase
    .from("inscricoes")
    .select("id,nome,email,whatsapp,serie,interesse,created_at")
    .order("created_at", { ascending: false })
    .limit(2000);
  return data ?? [];
}

export default async function InscricoesPage() {
  const inscricoes = await getInscricoes();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "1100px" }}>
      <div>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#1e293b" }}>
          Inscrições
        </h1>
        <p style={{ color: "#64748b", fontSize: ".9rem", marginTop: ".25rem" }}>
          Todas as inscrições recebidas pelo formulário do site.
        </p>
      </div>

      <InscricoesTable inscricoes={inscricoes} />
    </div>
  );
}
