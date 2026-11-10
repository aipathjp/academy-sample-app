import { createClient } from "@supabase/supabase-js";

// Supabase とつなぐための「住所」と「鍵」。.env.local（公開先では Vercel の環境変数）に書く
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error(
    "Supabase の環境変数がありません。.env.local に NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY を書いてください。",
  );
}

export const supabase = createClient(url, key);

// ログイン画面を作らずに使えるよう、初めて開いたときに「名前のないユーザー」として自動でログインする。
// データの見張り役（RLS）が、このユーザーのデータだけを見せる。
let signingIn: Promise<void> | null = null;

export function ensureSignedIn(): Promise<void> {
  if (!signingIn) {
    signingIn = (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) return;
      const { error } = await supabase.auth.signInAnonymously();
      if (error) throw error;
    })().catch((error) => {
      signingIn = null;
      throw error;
    });
  }
  return signingIn;
}
