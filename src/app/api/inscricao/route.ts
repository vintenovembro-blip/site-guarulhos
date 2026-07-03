import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nome, email, whatsapp, serie, interesse } = body;

    if (!nome || !email || !whatsapp || !serie || !interesse) {
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
    const { error } = await supabase
      .from("inscricoes")
      .insert({ nome, email, whatsapp, serie, interesse });

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
