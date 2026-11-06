---
title: 설정
description: 사이트 메뉴, footer, 페이지 이동과 출력 형식을 설정합니다.
weight: 20
tags: [Hugo, 설정]
---

## 사이트 정보

`title`, `languageCode`, `params.description`을 사이트에 맞게 바꿉니다.

## 주 메뉴

Hugo의 `menus.main`을 사용합니다. 한 단계의 `parent` 관계를 지정하면 PC GNB와 모바일 전체메뉴에 같은 구조가 표시됩니다.

## 검색 출력

검색을 쓰려면 홈 출력에 JSON을 추가합니다.

```yaml
outputs:
  home: [HTML, RSS, JSON]
```

## 페이지 이동

```yaml
pagination:
  pagerSize: 10
```
