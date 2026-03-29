import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export async function getViewCount(slug: string): Promise<number> {
  if (!supabase) return 0;
  try {
    const { data } = await supabase
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
  if (!supabase) return 0;
  try {
    const { data } = await supabase.rpc('increment_view', { post_slug: slug });
    return data ?? 0;
  } catch {
    return 0;
  }
}

export { supabase };
