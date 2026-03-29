import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

const links = [
  { label: 'GitHub', href: 'https://github.com/sw326', icon: '🐙' },
  { label: 'Twitter/X', href: 'https://x.com/sw326', icon: '𝕏' },
  { label: 'Email', href: 'mailto:sungwoo326@gmail.com', icon: '📧' },
];

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
        {t('title')}
      </h1>
      <p className="text-lg text-slate-500 dark:text-slate-400 mb-12">
        {t('subtitle')}
      </p>

      <div className="space-y-8">
        <section className="p-6 rounded-xl border border-amber-100 dark:border-slate-700
          bg-white dark:bg-slate-800/50">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">
            🛠️ {locale === 'ko' ? '관심 분야' : 'Interests'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {['Security', 'Backend', 'Automation', 'Android', 'Python', 'Next.js'].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg text-sm font-medium
                  bg-amber-50 dark:bg-slate-700
                  text-amber-700 dark:text-amber-300
                  border border-amber-200 dark:border-slate-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="p-6 rounded-xl border border-amber-100 dark:border-slate-700
          bg-white dark:bg-slate-800/50">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">
            🔗 {t('links')}
          </h2>
          <div className="space-y-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg
                  hover:bg-amber-50 dark:hover:bg-slate-700
                  text-slate-600 dark:text-slate-300
                  hover:text-amber-600 dark:hover:text-amber-400
                  transition-all duration-200 group"
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-medium">{link.label}</span>
                <span className="ml-auto text-xs text-slate-400 group-hover:text-amber-400 transition-colors">
                  →
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
