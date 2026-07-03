import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

export async function POST(request: NextRequest) {
  try {
    const { path, visitorId } = await request.json();

    if (!path || typeof path !== "string" || path.startsWith("/admin")) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const supabase = createSupabaseServiceClient();
    await supabase.from("page_views").insert({
      path,
      referrer: request.headers.get("referer") ?? null,
      user_agent: request.headers.get("user-agent") ?? null,
      visitor_id: typeof visitorId === "string" ? visitorId : null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
