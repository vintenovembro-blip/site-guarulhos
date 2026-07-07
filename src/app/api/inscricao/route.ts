import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { UNIDADES } from "@/lib/unidades";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nome, email, whatsapp, serie, interesse, unidade,
      dataNascimento, cep, rua, numero, bairro, cidade,
    } = body;

    if (
      !nome || !email || !whatsapp || !serie || !interesse || !unidade ||
      !dataNascimento || !cep || !rua || !numero || !bairro || !cidade
    ) {
      return NextResponse.json(
        { error: "Todos os campos obrigatórios devem ser preenchidos." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "E-mail inválido." },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServiceClient();

    const unidadeConfig = UNIDADES.find((u) => u.value === unidade);
    if (unidadeConfig) {
      const { count } = await supabase
        .from("inscricoes")
        .select("*", { count: "exact", head: true })
        .eq("unidade", unidadeConfig.value);

      if ((count ?? 0) >= unidadeConfig.capacidade) {
        return NextResponse.json(
          { error: "As vagas dessa unidade acabaram de ser preenchidas. Volte e escolha outra opção." },
          { status: 409 }
        );
      }
    }

    const { error } = await supabase
      .from("inscricoes")
      .insert({
        nome, email, whatsapp, serie, interesse, unidade,
        data_nascimento: dataNascimento, cep, rua, numero, bairro, cidade,
      });

    if (error) {
      console.error("Erro ao salvar inscrição no Supabase:", error);
      return NextResponse.json(
        { error: "Erro interno. Tente novamente em instantes." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inscrição realizada com sucesso! Em breve entraremos em contato.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Erro interno. Tente novamente em instantes." },
      { status: 500 }
    );
  }
}
