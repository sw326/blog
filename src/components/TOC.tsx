'use client';

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TOC() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('article h2, article h3'));
    const items = elements.map((el) => ({
      id: el.id,
      text: el.textContent ?? '',
      level: Number(el.tagName[1]),
    }));
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: '0px 0px -60% 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function scrollTo(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(id);
    // URL hash 업데이트 (뒤로가기 지원)
    history.pushState(null, '', `#${id}`);
  }

  if (headings.length === 0) return null;

  return (
    <nav>
      <p className="text-xs text-[var(--subtle)] mb-3 uppercase tracking-wider">
        contents
      </p>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 10}px` }}>
            <a
              href={`#${h.id}`}
              onClick={(e) => scrollTo(e, h.id)}
              className={`block text-xs transition-colors duration-150 leading-relaxed
                ${active === h.id
                  ? 'text-[var(--foreground)]'
                  : 'text-[var(--subtle)] hover:text-[var(--muted)]'
                }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
