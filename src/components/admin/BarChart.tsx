"use client";

import { useState } from "react";
import type { DayCount } from "@/lib/admin/stats";

function formatDateLabel(iso: string) {
  const [, m, d] = iso.split("-");
  return `${d}/${m}`;
}

export default function BarChart({
  data,
  color = "#2563eb",
}: {
  data: DayCount[];
  color?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...data.map((d) => d.count));
  const labelStep = Math.max(1, Math.ceil(data.length / 7));

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "4px",
          height: "160px",
          borderBottom: "1px solid #e2e8f0",
          padding: "0 2px",
        }}
      >
        {data.map((d, i) => {
          const h = d.count === 0 ? 2 : Math.max(6, (d.count / max) * 150);
          return (
            <div
              key={d.date}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover((v) => (v === i ? null : v))}
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                position: "relative",
                height: "100%",
                alignItems: "flex-end",
              }}
            >
              {hover === i && (
                <div
                  style={{
                    position: "absolute",
                    bottom: `calc(${h}px + 8px)`,
                    background: "#1e293b",
                    color: "#fff",
                    fontSize: ".7rem",
                    padding: ".3rem .55rem",
                    borderRadius: ".4rem",
                    whiteSpace: "nowrap",
                    zIndex: 5,
                    pointerEvents: "none",
                  }}
                >
                  {formatDateLabel(d.date)}: <strong>{d.count}</strong>
                </div>
              )}
              <div
                style={{
                  width: "100%",
                  maxWidth: "24px",
                  height: `${h}px`,
                  background: hover === i ? color : `${color}b3`,
                  borderRadius: "4px 4px 0 0",
                  transition: "background .15s",
                }}
              />
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: "4px", padding: "0 2px", marginTop: ".4rem" }}>
        {data.map((d, i) => (
          <div
            key={d.date}
            style={{ flex: 1, textAlign: "center", fontSize: ".65rem", color: "#94a3b8" }}
          >
            {i % labelStep === 0 ? formatDateLabel(d.date) : ""}
          </div>
        ))}
      </div>
    </div>
  );
}
