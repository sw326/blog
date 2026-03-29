import { createClient, SupabaseClient } from '@supabase/supabase-js';

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url === 'https://your-project.supabase.co') return null;
  try {
    return createClient(url, key);
  } catch {
    return null;
  }
}

// lazy init — 빌드 타임에 env 없어도 안전
let _client: SupabaseClient | null | undefined;
function client(): SupabaseClient | null {
  if (_client === undefined) _client = getSupabase();
  return _client;
}

export async function getViewCount(slug: string): Promise<number> {
  const sb = client();
  if (!sb) return 0;
  try {
    const { data } = await sb
      .from('post_views')
      .select('count')
      .eq('slug', slug)
      .single();
    return data?.count ?? 0;
  } catch {
    return 0;
  }
}

export async function incrementViewCount(slug: string): Promise<number> {
  const sb = client();
  if (!sb) return 0;
  try {
    const { data } = await sb.rpc('increment_view', { post_slug: slug });
    return data ?? 0;
  } catch {
    return 0;
  }
}

export async function getLikeCount(slug: string): Promise<number> {
  const sb = client();
  if (!sb) return 0;
  try {
    const { count } = await sb
      .from('post_likes')
      .select('*', { count: 'exact', head: true })
      .eq('slug', slug);
    return count ?? 0;
  } catch {
    return 0;
  }
}

export function getSupabaseClient(): SupabaseClient | null {
  return client();
}
