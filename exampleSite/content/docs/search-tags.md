---
title: 태그와 검색
description: taxonomy와 로컬 JSON 검색 색인을 구성합니다.
weight: 40
tags: [검색, 태그]
---

## 태그

front matter의 `tags` 배열은 `/tags/` taxonomy와 검색 필터에 함께 사용됩니다.

## 검색

홈의 JSON output이 제목, 요약, 본문 일부, 태그와 날짜를 색인합니다. 검색 페이지는 모든 검색어를 포함한 문서를 찾고 제목과 태그 일치를 우선합니다.

## 검색 제외

민감하거나 색인이 필요 없는 페이지는 다음 값을 지정합니다.

```yaml
searchExclude: true
```
