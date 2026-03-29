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
      className="flex items-baseline gap-6 py-2 group"
    >
      <time className="text-xs text-[var(--subtle)] shrink-0 font-mono">
        {post.date}
      </time>
      <span className="text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
        {post.title}
      </span>
      {post.tags.length > 0 && (
        <span className="text-xs text-[var(--subtle)] shrink-0 ml-auto">
          {post.tags.join(' ')}
        </span>
      )}
    </Link>
  );
}
