"use client";

import { useMemo, useState } from "react";
import { Search, Download } from "lucide-react";
import type { Inscricao } from "@/lib/admin/stats";

function formatDateOnly(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function toCsv(rows: Inscricao[]) {
  const header = [
    "Nome", "Data de Nascimento", "E-mail", "WhatsApp",
    "CEP", "Rua", "Número", "Bairro", "Cidade",
    "Série", "Interesse", "Unidade", "Data de Inscrição",
  ];
  const lines = rows.map((r) =>
    [
      r.nome,
      r.data_nascimento ? formatDateOnly(r.data_nascimento) : "",
      r.email, r.whatsapp,
      r.cep, r.rua, r.numero, r.bairro, r.cidade,
      r.serie, r.interesse, r.unidade,
      new Date(r.created_at).toLocaleString("pt-BR"),
    ]
      .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
      .join(",")
  );
  return [header.join(","), ...lines].join("\n");
}

export default function InscricoesTable({ inscricoes }: { inscricoes: Inscricao[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return inscricoes;
    return inscricoes.filter((r) =>
      [r.nome, r.email, r.whatsapp, r.serie, r.interesse, r.unidade, r.cidade].some((v) => (v ?? "").toLowerCase().includes(q))
    );
  }, [inscricoes, query]);

  const handleExport = () => {
    const csv = toCsv(filtered);
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inscricoes-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ position: "relative", flex: "1 1 240px", maxWidth: "320px" }}>
          <Search
            style={{ position: "absolute", left: ".75rem", top: "50%", transform: "translateY(-50%)", width: "1rem", height: "1rem", color: "#94a3b8" }}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome, e-mail, whatsapp..."
            style={{
              width: "100%",
              padding: ".65rem .75rem .65rem 2.25rem",
              borderRadius: ".6rem",
              border: "1px solid #cbd5e1",
              fontSize: ".85rem",
              outline: "none",
            }}
          />
        </div>

        <button
          onClick={handleExport}
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            padding: ".6rem 1rem",
            borderRadius: ".6rem",
            border: "1px solid #cbd5e1",
            background: "#fff",
            color: "#334155",
            fontWeight: 600,
            fontSize: ".82rem",
            cursor: "pointer",
          }}
        >
          <Download style={{ width: "1rem", height: "1rem" }} />
          Exportar CSV
        </button>
      </div>

      <div style={{ fontSize: ".8rem", color: "#94a3b8" }}>
        {filtered.length} {filtered.length === 1 ? "inscrição encontrada" : "inscrições encontradas"}
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "1rem", overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <p style={{ color: "#94a3b8", fontSize: ".85rem", padding: "2rem", textAlign: "center" }}>
            Nenhuma inscrição encontrada.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
              <thead>
                <tr style={{ textAlign: "left", color: "#94a3b8", fontSize: ".72rem", textTransform: "uppercase", letterSpacing: ".03em", background: "#f8fafc" }}>
                  <th style={{ padding: ".75rem 1rem" }}>Nome</th>
                  <th style={{ padding: ".75rem 1rem" }}>Nascimento</th>
                  <th style={{ padding: ".75rem 1rem" }}>E-mail</th>
                  <th style={{ padding: ".75rem 1rem" }}>WhatsApp</th>
                  <th style={{ padding: ".75rem 1rem" }}>Endereço</th>
                  <th style={{ padding: ".75rem 1rem" }}>Série</th>
                  <th style={{ padding: ".75rem 1rem" }}>Interesse</th>
                  <th style={{ padding: ".75rem 1rem" }}>Unidade</th>
                  <th style={{ padding: ".75rem 1rem" }}>Data</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                    <td style={{ padding: ".75rem 1rem", fontWeight: 600, color: "#1e293b", whiteSpace: "nowrap" }}>{row.nome}</td>
                    <td style={{ padding: ".75rem 1rem", color: "#475569", whiteSpace: "nowrap" }}>
                      {row.data_nascimento ? formatDateOnly(row.data_nascimento) : "—"}
                    </td>
                    <td style={{ padding: ".75rem 1rem", color: "#475569" }}>{row.email}</td>
                    <td style={{ padding: ".75rem 1rem", color: "#475569", whiteSpace: "nowrap" }}>{row.whatsapp}</td>
                    <td style={{ padding: ".75rem 1rem", color: "#475569", whiteSpace: "nowrap" }}>
                      {row.rua ? `${row.rua}, ${row.numero} — ${row.bairro}, ${row.cidade}` : "—"}
                    </td>
                    <td style={{ padding: ".75rem 1rem", color: "#475569", whiteSpace: "nowrap" }}>{row.serie}</td>
                    <td style={{ padding: ".75rem 1rem", color: "#475569" }}>{row.interesse}</td>
                    <td style={{ padding: ".75rem 1rem", color: "#475569", whiteSpace: "nowrap" }}>{row.unidade || "—"}</td>
                    <td style={{ padding: ".75rem 1rem", color: "#94a3b8", whiteSpace: "nowrap" }}>
                      {new Date(row.created_at).toLocaleString("pt-BR")}
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
