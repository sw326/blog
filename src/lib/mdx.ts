import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { TilMeta, TilPost } from '@/types';

const contentDir = path.join(process.cwd(), 'content', 'til');

export function getAllTilSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getTilPost(slug: string): TilPost | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    tags: data.tags ?? [],
    lang: data.lang ?? 'ko',
    summary: data.summary ?? '',
    content,
  };
}

export function getAllTilMeta(): TilMeta[] {
  const slugs = getAllTilSlugs();
  return slugs
    .map((slug) => {
      const post = getTilPost(slug);
      if (!post) return null;
      const { content: _content, ...meta } = post;
      return meta;
    })
    .filter(Boolean)
    .sort((a, b) => (a!.date < b!.date ? 1 : -1)) as TilMeta[];
}

export function getAllTags(): string[] {
  const all = getAllTilMeta().flatMap((p) => p.tags);
  return Array.from(new Set(all)).sort();
}
