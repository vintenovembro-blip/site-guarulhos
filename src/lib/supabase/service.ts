import { createClient } from "@supabase/supabase-js";

export function createSupabaseServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false },
      global: {
        // Evita que o Next.js armazene em cache as respostas do PostgREST —
        // sem isso, contagens (ex: vagas por unidade) ficam presas no valor
        // da primeira chamada e nunca se atualizam.
        fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
      },
    }
  );
}
