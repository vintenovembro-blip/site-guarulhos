import { LucideIcon } from "lucide-react";

export default function StatTile({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: "1rem",
        padding: "1.25rem 1.4rem",
        display: "flex",
        flexDirection: "column",
        gap: ".6rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: ".82rem", color: "#64748b", fontWeight: 600 }}>{label}</span>
        <div
          style={{
            width: "2rem",
            height: "2rem",
            borderRadius: ".55rem",
            background: "#eff6ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon style={{ width: "1.05rem", height: "1.05rem", color: "#2563eb" }} />
        </div>
      </div>
      <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.9rem", color: "#1e293b", lineHeight: 1 }}>
        {value}
      </div>
    </div>
  );
}
