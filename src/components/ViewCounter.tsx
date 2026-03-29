'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface ViewCounterProps {
  slug: string;
}

export function ViewCounter({ slug }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);
  const t = useTranslations('post');

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!url) return;

    fetch(`/api/views/${slug}`, { method: 'POST' })
      .then((r) => r.json())
      .then((d) => setViews(d.count))
      .catch(() => {});
  }, [slug]);

  if (views === null) return null;

  return (
    <span className="text-sm text-slate-400 dark:text-slate-500">
      {views.toLocaleString()} {t('views')}
    </span>
  );
}
