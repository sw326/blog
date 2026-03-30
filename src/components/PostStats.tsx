'use client';

import { useEffect, useState } from 'react';

interface Props {
  slug: string;
}

export function PostStats({ slug }: Props) {
  const [views, setViews] = useState<number | null>(null);
  const [likes, setLikes] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/views/${slug}`)
      .then((r) => r.json())
      .then((d) => setViews(d.count ?? 0))
      .catch(() => setViews(0));

    fetch(`/api/likes/${slug}`)
      .then((r) => r.json())
      .then((d) => setLikes(d.count ?? 0))
      .catch(() => setLikes(0));
  }, [slug]);

  if (views === null && likes === null) return null;

  return (
    <span className="flex items-center gap-2.5 text-xs text-[var(--subtle)] shrink-0">
      {views !== null && views > 0 && (
        <span>{views.toLocaleString()}</span>
      )}
      {likes !== null && likes > 0 && (
        <span className="flex items-center gap-0.5">
          <svg width={10} height={10} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {likes}
        </span>
      )}
    </span>
  );
}
