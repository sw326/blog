import { MetadataRoute } from 'next';
import { getAllTilSlugs } from '@/lib/mdx';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sw326.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllTilSlugs();
  const locales = ['ko', 'en'];

  const staticRoutes = locales.flatMap((locale) => [
    { url: `${BASE_URL}/${locale}`, lastModified: new Date() },
    { url: `${BASE_URL}/${locale}/til`, lastModified: new Date() },
    { url: `${BASE_URL}/${locale}/about`, lastModified: new Date() },
  ]);

  const postRoutes = locales.flatMap((locale) =>
    slugs.map((slug) => ({
      url: `${BASE_URL}/${locale}/til/${slug}`,
      lastModified: new Date(),
    }))
  );

  return [...staticRoutes, ...postRoutes];
}
