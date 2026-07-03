import Link from "next/link";
import { Users, TrendingUp, Eye, UserCheck, ArrowRight } from "lucide-react";
import { getDashboardStats } from "@/lib/admin/stats";
import StatTile from "@/components/admin/StatTile";
import BarChart from "@/components/admin/BarChart";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", maxWidth: "1100px" }}>
      <div>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#1e293b" }}>
          Dashboard
        </h1>
        <p style={{ color: "#64748b", fontSize: ".9rem", marginTop: ".25rem" }}>
          Visão geral de acessos e inscrições do site.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        <StatTile label="Total de inscrições" value={stats.totalInscricoes} icon={Users} />
        <StatTile label="Inscrições (7 dias)" value={stats.inscricoesUltimos7Dias} icon={TrendingUp} />
        <StatTile label="Visitas (30 dias)" value={stats.totalVisitas30d} icon={Eye} />
        <StatTile label="Visitantes únicos (30 dias)" value={stats.visitantesUnicos30d} icon={UserCheck} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)",
          gap: "1.25rem",
        }}
        className="admin-dashboard-grid"
      >
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "1rem", padding: "1.4rem" }}>
          <h2 style={{ fontSize: ".95rem", fontWeight: 700, color: "#1e293b", marginBottom: "1.1rem" }}>
            Visitas por dia (últimos 14 dias)
          </h2>
          <BarChart data={stats.visitasPorDia} color="#2563eb" />
        </div>

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "1rem", padding: "1.4rem" }}>
          <h2 style={{ fontSize: ".95rem", fontWeight: 700, color: "#1e293b", marginBottom: "1.1rem" }}>
            Páginas mais visitadas
          </h2>
          {stats.paginasMaisVisitadas.length === 0 ? (
            <p style={{ color: "#94a3b8", fontSize: ".85rem" }}>Sem dados ainda.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
              {stats.paginasMaisVisitadas.map((p) => {
                const max = stats.paginasMaisVisitadas[0].count;
                const pct = Math.max(6, (p.count / max) * 100);
                return (
                  <div key={p.path}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".8rem", marginBottom: ".25rem" }}>
                      <span style={{ color: "#334155", fontWeight: 600 }}>{p.path}</span>
                      <span style={{ color: "#64748b" }}>{p.count}</span>
                    </div>
                    <div style={{ height: "8px", borderRadius: "999px", background: "#eff6ff" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${pct}%`,
                          borderRadius: "999px",
                          background: "#2563eb",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "1rem", padding: "1.4rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: ".95rem", fontWeight: 700, color: "#1e293b" }}>Inscrições recentes</h2>
          <Link
            href="/admin/inscricoes"
            style={{ display: "flex", alignItems: "center", gap: ".3rem", fontSize: ".82rem", fontWeight: 700, color: "#2563eb", textDecoration: "none" }}
          >
            Ver todas <ArrowRight style={{ width: ".9rem", height: ".9rem" }} />
          </Link>
        </div>

        {stats.inscricoesRecentes.length === 0 ? (
          <p style={{ color: "#94a3b8", fontSize: ".85rem" }}>Nenhuma inscrição recebida ainda.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
              <thead>
                <tr style={{ textAlign: "left", color: "#94a3b8", fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".03em" }}>
                  <th style={{ padding: ".5rem .75rem .5rem 0" }}>Nome</th>
                  <th style={{ padding: ".5rem .75rem" }}>Contato</th>
                  <th style={{ padding: ".5rem .75rem" }}>Interesse</th>
                  <th style={{ padding: ".5rem 0" }}>Data</th>
                </tr>
              </thead>
              <tbody>
                {stats.inscricoesRecentes.map((row) => (
                  <tr key={row.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                    <td style={{ padding: ".65rem .75rem .65rem 0", fontWeight: 600, color: "#1e293b" }}>{row.nome}</td>
                    <td style={{ padding: ".65rem .75rem", color: "#475569" }}>
                      {row.email}
                      <br />
                      <span style={{ color: "#94a3b8" }}>{row.whatsapp}</span>
                    </td>
                    <td style={{ padding: ".65rem .75rem", color: "#475569" }}>{row.interesse}</td>
                    <td style={{ padding: ".65rem 0", color: "#94a3b8", whiteSpace: "nowrap" }}>
                      {new Date(row.created_at).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
