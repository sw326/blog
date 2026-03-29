# TODOS.md — sw326 Blog

## What
개인 블로그 + TIL 사이트 구축. Next.js App Router + Vercel 배포.
URL: https://sw326.vercel.app (또는 blog-sw326.vercel.app)

## Why
- 개발 학습 기록(TIL) 공간 확보
- 포트폴리오 역할 겸용
- 나(OpenClaw)를 통한 TIL 자동 게시 자동화 목표

## Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 + CSS Variables (다크모드)
- **Content**: MDX (`@next/mdx` + `next-mdx-remote`)
- **i18n**: `next-intl` (한국어/영어 병행, `/ko/` `/en/` 라우팅)
- **DB**: Supabase (뷰 카운트, 좋아요) — 기존 프로젝트 재사용
- **댓글**: Giscus (GitHub Discussions 기반)
- **Analytics**: Vercel Analytics
- **SEO**: next/metadata, sitemap.xml, robots.txt, OG 이미지
- **배포**: Vercel

## Design Direction
- 레퍼런스: joshwcomeau.com 감성 (따뜻한 팔레트, 부드러운 타이포, 마이크로 애니메이션)
- 우선순위: **가독성 > 화려함**. 글이 잘 읽히는 게 핵심
- 다크/라이트 모드 모두 지원 (전환 애니메이션 포함)
- 폰트: 한국어 Pretendard + 영어 Inter or Geist

## Directory Structure
```
/
├── content/
│   └── til/           # MDX 파일 (YYYY-MM-DD-slug.mdx)
├── src/
│   ├── app/
│   │   └── [locale]/  # i18n 라우팅
│   │       ├── page.tsx          # 홈 (최근 TIL 목록)
│   │       ├── til/
│   │       │   ├── page.tsx      # TIL 목록
│   │       │   └── [slug]/page.tsx
│   │       └── about/page.tsx
│   ├── components/
│   ├── lib/
│   │   ├── mdx.ts     # MDX 파싱 유틸
│   │   └── supabase.ts
│   └── i18n/
│       ├── ko.json
│       └── en.json
├── TODOS.md
└── README.md
```

## Content Schema (MDX frontmatter)
```yaml
---
title: "SSL 핀닝과 mitmproxy"
date: "2026-03-29"
tags: ["security", "reverse-engineering"]
lang: "ko"          # ko | en
summary: "한 줄 요약"
---
```

## Features — P0 (초기 버전)
- [ ] Next.js 프로젝트 셋업 (App Router, TypeScript, Tailwind v4)
- [ ] next-intl 설정 (ko/en, locale switcher)
- [ ] MDX 파싱 + frontmatter 읽기
- [ ] 홈 페이지 — Hero(간단 소개) + 최근 TIL 목록
- [ ] TIL 목록 페이지 — 날짜순, 태그 필터
- [ ] TIL 상세 페이지 — MDX 렌더링, 목차(TOC), 뷰 카운트
- [ ] About 페이지 — 간단 소개 + GitHub/링크
- [ ] 다크/라이트 모드 토글 (next-themes)
- [ ] Supabase 뷰 카운트 연동
- [ ] Giscus 댓글 연동
- [ ] SEO (메타태그, OG, sitemap, robots.txt)
- [ ] Vercel Analytics 추가
- [ ] 샘플 TIL 글 1개 (MDX)
- [ ] Vercel 배포 설정

## Features — P1 (이후 확장)
- [ ] 좋아요 기능 (Supabase)
- [ ] 검색 기능
- [ ] 카테고리 확장 (Projects, 회고 등)
- [ ] OG 이미지 자동 생성 (`@vercel/og`)
- [ ] RSS 피드
- [ ] 관련 글 추천

## Supabase Tables
```sql
-- 뷰 카운트
create table post_views (
  slug text primary key,
  count integer default 0
);

-- 좋아요 (IP 기반 중복 방지)
create table post_likes (
  id uuid default gen_random_uuid() primary key,
  slug text not null,
  fingerprint text not null,
  created_at timestamptz default now(),
  unique(slug, fingerprint)
);
```

## Env Variables (Vercel에 추가 필요)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_GISCUS_REPO=sw326/blog
NEXT_PUBLIC_GISCUS_REPO_ID=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
```

## Notes
- 글 작성: 로컬 MDX 파일 직접 push OR OpenClaw를 통한 gh CLI 자동 커밋
- gstack: 맥미니 미설치 — /review 생략 (참치봇 환경에서만 사용 가능)
- 이슈 트래킹: sw326/openclaw-workspace#124
