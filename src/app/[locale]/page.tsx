import Link from 'next/link';
import { getAllTilMeta } from '@/lib/mdx';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'sw326',
    description: 'developer',
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const posts = getAllTilMeta().slice(0, 10);

  return (
    <div className="space-y-16 pt-12">
      {/* Identity */}
      <section className="space-y-1">
        <p className="text-sm font-medium text-[var(--foreground)]">sw326</p>
        <p className="text-sm text-[var(--muted)]">developer</p>
        <div className="flex gap-6 pt-2">
          <a
            href="https://github.com/sw326"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Notion
          </a>
        </div>
      </section>

      {/* TIL list */}
      {posts.length > 0 && (
        <section>
          <div className="space-y-0">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/til/${post.slug}`}
                className="block py-2.5 group"
              >
                <div className="flex items-baseline gap-4 min-w-0">
                  <time className="text-xs text-[var(--subtle)] shrink-0 font-mono w-24">
                    {post.date}
                  </time>
                  <span className="text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors truncate">
                    {post.title}
                  </span>
                </div>
                {post.tags.length > 0 && (
                  <div className="pl-28 mt-0.5">
                    <span className="text-xs text-[var(--subtle)]">
                      {post.tags.join(' · ')}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
          {getAllTilMeta().length > 10 && (
            <div className="mt-6 pl-28">
              <Link
                href={`/${locale}/til`}
                className="text-xs text-[var(--subtle)] hover:text-[var(--foreground)] transition-colors"
              >
                all posts →
              </Link>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
