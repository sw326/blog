'use client';

import { useState } from 'react';
import { TilRow } from './TilRow';
import type { TilMeta } from '@/types';

interface TilTagFilterProps {
  posts: TilMeta[];
  tags: string[];
  locale: string;
}

export function TilTagFilter({ posts, tags, locale }: TilTagFilterProps) {
  const [active, setActive] = useState<string | null>(null);

  const filtered = active ? posts.filter((p) => p.tags.includes(active)) : posts;

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-10">
        <button
          onClick={() => setActive(null)}
          className={`text-xs transition-colors ${
            active === null
              ? 'text-[var(--foreground)]'
              : 'text-[var(--subtle)] hover:text-[var(--foreground)]'
          }`}
        >
          all
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag === active ? null : tag)}
            className={`text-xs transition-colors ${
              active === tag
                ? 'text-[var(--foreground)]'
                : 'text-[var(--subtle)] hover:text-[var(--foreground)]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-[var(--subtle)]">no posts</p>
      ) : (
        <div>
          {filtered.map((post) => (
            <TilRow key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
