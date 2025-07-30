import { hasSupabaseEnv } from "@/lib/utils";
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = () =>
  createBrowserClient(supabaseUrl!, supabaseKey!);

export const getAccessToken = async () => {
  if (!hasSupabaseEnv) {
    console.error("Missing supabase credentials");
    return null;
  }

  const supabase = createClient();

  const { error, data } = await supabase.auth.getSession();
  if (error) return null;

  return data.session?.access_token;
};
