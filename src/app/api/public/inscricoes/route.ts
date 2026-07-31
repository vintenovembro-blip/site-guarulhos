import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { isAuthorized } from "@/lib/apiAuth";

export const dynamic = "force-dynamic";

const CAMPOS =
  "id,nome,email,whatsapp,data_nascimento,cep,rua,numero,bairro,cidade,serie,interesse,unidade,created_at,ead_sincronizado,ead_sincronizado_em";

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const apenasPendentes = searchParams.get("pendentes") === "true";
  const limit = Math.min(Number(searchParams.get("limit")) || 500, 2000);

  const supabase = createSupabaseServiceClient();
  let query = supabase
    .from("inscricoes")
    .select(CAMPOS)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (apenasPendentes) {
    query = query.eq("ead_sincronizado", false);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Erro ao listar inscrições (API pública):", error);
    return NextResponse.json({ error: "Erro ao buscar inscrições." }, { status: 500 });
  }

  return NextResponse.json({ total: data.length, inscricoes: data });
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const ids: unknown = body?.ids;

    if (!Array.isArray(ids) || ids.length === 0 || !ids.every((id) => typeof id === "string")) {
      return NextResponse.json(
        { error: "Envie um array 'ids' com pelo menos um ID de inscrição." },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServiceClient();
    const { error, count } = await supabase
      .from("inscricoes")
      .update(
        { ead_sincronizado: true, ead_sincronizado_em: new Date().toISOString() },
        { count: "exact" }
      )
      .in("id", ids);

    if (error) {
      console.error("Erro ao marcar inscrições como sincronizadas:", error);
      return NextResponse.json({ error: "Erro ao atualizar inscrições." }, { status: 500 });
    }

    return NextResponse.json({ success: true, atualizadas: count ?? 0 });
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }
}
