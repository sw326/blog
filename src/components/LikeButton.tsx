'use client';

import { useEffect, useState } from 'react';

interface Props {
  slug: string;
}

function getFingerprint(slug: string): string {
  const key = `like_fp_${slug}`;
  let fp = localStorage.getItem(key);
  if (!fp) {
    fp = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(key, fp);
  }
  return fp;
}

export function LikeButton({ slug }: Props) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/likes/${slug}`)
      .then((r) => r.json())
      .then((d) => setCount(d.count ?? 0))
      .catch(() => setCount(0));

    // 로컬 상태 복원
    const fp = localStorage.getItem(`like_fp_${slug}`);
    if (fp) {
      const likedKey = `liked_${slug}`;
      setLiked(localStorage.getItem(likedKey) === '1');
    }
  }, [slug]);

  async function toggle() {
    if (loading) return;
    setLoading(true);
    try {
      const fp = getFingerprint(slug);
      const res = await fetch(`/api/likes/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fingerprint: fp }),
      });
      const data = await res.json();
      setLiked(data.liked);
      setCount(data.count);
      localStorage.setItem(`liked_${slug}`, data.liked ? '1' : '0');
    } catch {
      //
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex items-center gap-1.5 text-xs transition-colors ${
        liked
          ? 'text-[var(--foreground)]'
          : 'text-[var(--subtle)] hover:text-[var(--muted)]'
      }`}
      aria-label="like"
    >
      <svg
        width={13}
        height={13}
        viewBox="0 0 24 24"
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {count !== null && <span>{count}</span>}
    </button>
  );
}
