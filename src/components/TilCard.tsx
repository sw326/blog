import Link from 'next/link';
import type { TilMeta } from '@/types';

interface TilCardProps {
  post: TilMeta;
  locale: string;
}

export function TilCard({ post, locale }: TilCardProps) {
  return (
    <Link
      href={`/${locale}/til/${post.slug}`}
      className="group block p-5 rounded-xl border border-amber-100 dark:border-slate-700
        hover:border-amber-300 dark:hover:border-amber-500/50
        hover:shadow-md hover:shadow-amber-100/50 dark:hover:shadow-slate-900/50
        bg-white dark:bg-slate-800/50
        transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100
          group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200 leading-snug">
          {post.title}
        </h3>
        <time className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap mt-0.5">
          {post.date}
        </time>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
        {post.summary}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full
              bg-amber-50 dark:bg-slate-700
              text-amber-700 dark:text-amber-300
              border border-amber-200 dark:border-slate-600"
          >
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
