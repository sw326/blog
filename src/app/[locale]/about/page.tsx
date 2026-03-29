import type { Metadata } from 'next';
import { SocialLinks } from '@/components/SocialLinks';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'about',
    description: 'developer',
  };
}

export default async function AboutPage() {
  return (
    <div className="pt-12 space-y-8">
      <p className="text-sm text-[var(--foreground)]">developer</p>
      <SocialLinks showLabel />
    </div>
  );
}
