import Link from 'next/link';
import type { TilMeta } from '@/types';

interface TilRowProps {
  post: TilMeta;
  locale: string;
}

export function TilRow({ post, locale }: TilRowProps) {
  return (
    <Link
      href={`/${locale}/til/${post.slug}`}
      className="block py-2.5 group"
    >
      <time className="text-xs text-[var(--subtle)] font-mono block mb-0.5">
        {post.date}
      </time>
      <span className="text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors block">
        {post.title}
      </span>
      {post.tags.length > 0 && (
        <span className="text-xs text-[var(--subtle)] block mt-0.5">
          {post.tags.join(' · ')}
        </span>
      )}
    </Link>
  );
}
