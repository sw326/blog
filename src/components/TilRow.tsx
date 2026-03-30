import Link from 'next/link';
import { PostStats } from './PostStats';
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
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors min-w-0 truncate">
          {post.title}
        </span>
        <PostStats slug={post.slug} />
      </div>
      {post.tags.length > 0 && (
        <span className="text-xs text-[var(--subtle)] block mt-0.5">
          {post.tags.join(' · ')}
        </span>
      )}
    </Link>
  );
}
