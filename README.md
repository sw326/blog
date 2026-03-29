# sw326 blog

> 보안·개발·자동화를 배우며 기록하는 TIL 블로그

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://typescriptlang.org)

## 🛠️ Stack

| 항목 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Content | MDX + gray-matter + next-mdx-remote |
| i18n | next-intl (ko/en) |
| DB | Supabase (view count) |
| 댓글 | Giscus |
| Analytics | Vercel Analytics |
| 배포 | Vercel |

## 🚀 로컬 개발

```bash
# 의존성 설치
npm install

# 환경변수 설정
cp .env.local.example .env.local

# 개발 서버
npm run dev
```

## 📝 TIL 작성

`content/til/` 디렉토리에 MDX 파일을 추가합니다.

```
content/til/YYYY-MM-DD-slug.mdx
```

### Frontmatter 스키마

```yaml
---
title: "제목"
date: "2026-03-29"
tags: ["tag1", "tag2"]
lang: "ko"          # ko | en
summary: "한 줄 요약"
---
```

## 🗄️ Supabase 설정

뷰 카운트 기능을 위한 테이블 생성:

```sql
-- 뷰 카운트
create table post_views (
  slug text primary key,
  count integer default 0
);

-- increment RPC function
create or replace function increment_view(post_slug text)
returns integer as $$
  insert into post_views (slug, count)
  values (post_slug, 1)
  on conflict (slug)
  do update set count = post_views.count + 1
  returning count;
$$ language sql;
```

## 🔧 환경변수

| 변수 | 필수 | 설명 |
|------|------|------|
| `NEXT_PUBLIC_SITE_URL` | 선택 | 사이트 URL (sitemap용) |
| `NEXT_PUBLIC_SUPABASE_URL` | 선택 | Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 선택 | Supabase 익명 키 |
| `NEXT_PUBLIC_GISCUS_REPO` | 선택 | Giscus 레포 (형식: `user/repo`) |
| `NEXT_PUBLIC_GISCUS_REPO_ID` | 선택 | Giscus 레포 ID |
| `NEXT_PUBLIC_GISCUS_CATEGORY_ID` | 선택 | Giscus 카테고리 ID |

> Supabase/Giscus 환경변수 미설정 시 graceful fallback (에러 없이 숨김)

## 📁 디렉토리 구조

```
/
├── content/til/          # MDX TIL 파일
├── src/
│   ├── app/
│   │   ├── [locale]/     # i18n 라우팅 (ko/en)
│   │   │   ├── page.tsx        # 홈
│   │   │   ├── til/page.tsx    # TIL 목록
│   │   │   ├── til/[slug]/     # TIL 상세
│   │   │   └── about/page.tsx  # 소개
│   │   ├── api/views/    # 뷰 카운트 API
│   │   ├── sitemap.ts    # sitemap.xml
│   │   └── robots.ts     # robots.txt
│   ├── components/       # 재사용 컴포넌트
│   ├── i18n/             # 번역 파일 (ko.json, en.json)
│   ├── lib/              # 유틸리티 (mdx.ts, supabase.ts)
│   └── types/            # TypeScript 타입
└── .env.local.example
```

---

Built with ❤️ by 🦞 첨지봇
