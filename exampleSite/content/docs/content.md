---
title: 콘텐츠 작성
description: 일반 페이지, 문서, 블로그 글의 front matter를 작성합니다.
weight: 30
tags: [콘텐츠, Markdown]
---

## 일반 페이지

제목과 설명을 지정하면 breadcrumb와 본문 머리말이 자동으로 만들어집니다.

## 문서

`content/docs/` 아래 페이지는 문서 LNB와 이 페이지의 구성 목차를 사용합니다. `weight`가 LNB 순서를 결정합니다.

## 블로그 글

`content/blog/` 아래 글은 날짜와 태그를 표시합니다.

```yaml
---
title: 새 소식
date: 2026-11-07
tags: [소식, Hugo]
---
```

## 표와 코드

| 항목 | 지원 |
|---|---|
| Markdown 표 | 지원 |
| 코드 블록 | 가로 스크롤 지원 |
| heading 링크 | Hugo 기본 anchor |
