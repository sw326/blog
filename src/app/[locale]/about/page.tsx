import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About',
    description: 'developer',
  };
}

export default async function AboutPage() {
  return (
    <div className="pt-12 space-y-8">
      <p className="text-sm text-[var(--foreground)]">developer</p>

      <div className="flex gap-6">
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
    </div>
  );
}
