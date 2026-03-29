import { NextRequest, NextResponse } from 'next/server';
import { incrementViewCount, getViewCount } from '@/lib/supabase';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const count = await incrementViewCount(slug);
  return NextResponse.json({ count });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const count = await getViewCount(slug);
  return NextResponse.json({ count });
}
