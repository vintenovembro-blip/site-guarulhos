import { createSupabaseServiceClient } from "@/lib/supabase/service";

export interface Inscricao {
  id: string;
  nome: string;
  email: string;
  whatsapp: string;
  serie: string;
  interesse: string;
  unidade: string;
  data_nascimento: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  created_at: string;
}

export interface DayCount {
  date: string;
  count: number;
}

export interface DashboardStats {
  totalInscricoes: number;
  inscricoesUltimos7Dias: number;
  totalVisitas30d: number;
  visitantesUnicos30d: number;
  inscricoesPorDia: DayCount[];
  visitasPorDia: DayCount[];
  paginasMaisVisitadas: { path: string; count: number }[];
  inscricoesRecentes: Inscricao[];
}

function lastNDays(n: number): string[] {
  const days: string[] = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(today.getUTCDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function bucketByDay(rows: { created_at: string }[], days: string[]): DayCount[] {
  const counts = new Map(days.map((d) => [d, 0]));
  for (const row of rows) {
    const day = row.created_at.slice(0, 10);
    if (counts.has(day)) counts.set(day, (counts.get(day) ?? 0) + 1);
  }
  return days.map((date) => ({ date, count: counts.get(date) ?? 0 }));
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = createSupabaseServiceClient();

  const days14 = lastNDays(14);
  const since14 = new Date(`${days14[0]}T00:00:00.000Z`).toISOString();
  const since30 = new Date();
  since30.setUTCDate(since30.getUTCDate() - 29);
  since30.setUTCHours(0, 0, 0, 0);

  const [
    totalInscricoesRes,
    inscricoes14Res,
    recentesRes,
    totalVisitas30dRes,
    visitas14Res,
    topPagesRes,
  ] = await Promise.all([
    supabase.from("inscricoes").select("*", { count: "exact", head: true }),
    supabase.from("inscricoes").select("created_at").gte("created_at", since14),
    supabase
      .from("inscricoes")
      .select("id,nome,email,whatsapp,serie,interesse,unidade,data_nascimento,cep,rua,numero,bairro,cidade,created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("page_views")
      .select("visitor_id", { count: "exact" })
      .gte("created_at", since30.toISOString()),
    supabase.from("page_views").select("created_at").gte("created_at", since14),
    supabase.from("page_views").select("path").gte("created_at", since30.toISOString()),
  ]);

  const inscricoesPorDia = bucketByDay(inscricoes14Res.data ?? [], days14);
  const visitasPorDia = bucketByDay(visitas14Res.data ?? [], days14);

  const inscricoesUltimos7Dias = inscricoesPorDia
    .slice(-7)
    .reduce((sum, d) => sum + d.count, 0);

  const visitorIds = new Set(
    (totalVisitas30dRes.data ?? [])
      .map((r) => r.visitor_id as string | null)
      .filter((id): id is string => Boolean(id))
  );

  const pageCounts = new Map<string, number>();
  for (const row of topPagesRes.data ?? []) {
    pageCounts.set(row.path, (pageCounts.get(row.path) ?? 0) + 1);
  }
  const paginasMaisVisitadas = [...pageCounts.entries()]
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalInscricoes: totalInscricoesRes.count ?? 0,
    inscricoesUltimos7Dias,
    totalVisitas30d: totalVisitas30dRes.count ?? 0,
    visitantesUnicos30d: visitorIds.size,
    inscricoesPorDia,
    visitasPorDia,
    paginasMaisVisitadas,
    inscricoesRecentes: recentesRes.data ?? [],
  };
}
