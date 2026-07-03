import { createSupabaseServerClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="admin-panel-root" style={{ minHeight: "100dvh", background: "#f8fafc" }}>
      <AdminSidebar email={user?.email ?? ""} />
      <main style={{ flex: 1, minWidth: 0, padding: "2rem clamp(1rem, 4vw, 2.5rem)" }}>
        {children}
      </main>
    </div>
  );
}
