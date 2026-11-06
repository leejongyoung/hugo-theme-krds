---
title: 시작하기
description: Hugo Module로 테마를 설치하고 첫 페이지를 빌드합니다.
weight: 10
tags: [Hugo, 설치]
---

## 요구 사항

- Hugo Extended 0.146.0 이상
- Go 1.24 이상

## 모듈 초기화

사이트 루트에서 모듈을 만들고 테마를 추가합니다.

```sh
hugo mod init github.com/example/my-site
hugo mod get github.com/leejongyoung/hugo-theme-krds@v1.0.0
```

`hugo.yaml`에 모듈을 등록합니다.

```yaml
module:
  imports:
    - path: github.com/leejongyoung/hugo-theme-krds
```

## 빌드

```sh
hugo --gc --minify
```
