import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { UNIDADES } from "@/lib/unidades";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createSupabaseServiceClient();

    const counts = await Promise.all(
      UNIDADES.map((u) =>
        supabase
          .from("inscricoes")
          .select("*", { count: "exact", head: true })
          .eq("unidade", u.value)
      )
    );

    const unidades = UNIDADES.map((u, i) => {
      const ocupadas = counts[i].count ?? 0;
      return {
        value: u.value,
        label: u.label,
        vagasRestantes: Math.max(u.capacidade - ocupadas, 0),
        lotada: ocupadas >= u.capacidade,
      };
    });

    const todasLotadas = unidades.every((u) => u.lotada);

    return NextResponse.json({ unidades, todasLotadas });
  } catch (error) {
    console.error("Erro ao calcular vagas disponíveis:", error);
    return NextResponse.json(
      { error: "Erro ao calcular vagas disponíveis." },
      { status: 500 }
    );
  }
}
