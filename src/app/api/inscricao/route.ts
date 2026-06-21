import { NextRequest, NextResponse } from "next/server";

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

    // Aqui você pode integrar com seu serviço de e-mail, CRM ou planilha
    // Exemplo: Resend, Nodemailer, Google Sheets API, etc.
    console.log("Nova inscrição recebida:", {
      nome,
      email,
      whatsapp,
      serie,
      interesse,
      timestamp: new Date().toISOString(),
    });

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
