import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = getSupabaseClient();
  if (!supabase) return NextResponse.json({ count: 0 });

  try {
    const { count } = await supabase
      .from('post_likes')
      .select('*', { count: 'exact', head: true })
      .eq('slug', slug);
    return NextResponse.json({ count: count ?? 0 });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = getSupabaseClient();
  if (!supabase) return NextResponse.json({ liked: false, count: 0 });

  try {
    const { fingerprint } = await req.json();
    if (!fingerprint) return NextResponse.json({ liked: false, count: 0 });

    const { data } = await supabase.rpc('toggle_like', {
      post_slug: slug,
      user_fingerprint: fingerprint,
    });
    return NextResponse.json(data ?? { liked: false, count: 0 });
  } catch {
    return NextResponse.json({ liked: false, count: 0 });
  }
}
