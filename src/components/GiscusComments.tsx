'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const REPO = process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}` | undefined;
const REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

export function GiscusComments() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!REPO || !REPO_ID || !CATEGORY_ID) return null;
  if (!mounted) return null;

  return (
    <div className="mt-12 pt-8 border-t border-amber-100 dark:border-slate-700">
      <Giscus
        repo={REPO}
        repoId={REPO_ID}
        category="General"
        categoryId={CATEGORY_ID}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme === 'dark' ? 'dark' : 'light'}
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
