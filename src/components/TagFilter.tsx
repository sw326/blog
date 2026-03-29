'use client';

import { useState } from 'react';
import { TilCard } from './TilCard';
import type { TilMeta } from '@/types';
import { useTranslations } from 'next-intl';

interface TagFilterProps {
  posts: TilMeta[];
  tags: string[];
  locale: string;
}

export function TagFilter({ posts, tags, locale }: TagFilterProps) {
  const [active, setActive] = useState<string | null>(null);
  const t = useTranslations('til');

  const filtered = active ? posts.filter((p) => p.tags.includes(active)) : posts;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActive(null)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
            active === null
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-amber-50 dark:bg-slate-700 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-slate-600 hover:border-amber-400'
          }`}
        >
          {t('all_tags')}
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag === active ? null : tag)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
              active === tag
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-amber-50 dark:bg-slate-700 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-slate-600 hover:border-amber-400'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-slate-400 dark:text-slate-500 text-center py-12">{t('no_posts')}</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((post) => (
            <TilCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
