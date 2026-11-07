---
title: 설치와 시작
description: 새 사이트에 테마를 적용하는 가장 짧은 방법입니다.
weight: 10
tags: [설치, 가이드]
---

## Hugo Module

사이트 루트에서 모듈을 만들고 `hugo.yaml`에 테마를 지정합니다. Hugo Extended 0.146.0 이상과 Go 1.24 이상이 필요합니다.

```sh
hugo mod init github.com/example/my-site
hugo mod get github.com/leejongyoung/hugo-theme-krds@v1.2.2
```

```yaml
module:
  imports:
    - path: github.com/leejongyoung/hugo-theme-krds
```

## GitHub Pages에 올리기

저장소의 Pages Source를 **GitHub Actions**로 지정하고, Hugo로 빌드한 정적 파일을 공식 Pages Actions로 배포하세요. 이 사이트도 그렇게 배포합니다. 워크플로 예제는 저장소의 `.github/workflows/pages.yml`입니다.

## Git submodule로 설치

```sh
git submodule add https://github.com/leejongyoung/hugo-theme-krds.git themes/hugo-theme-krds
```

```yaml
theme: hugo-theme-krds
```

## 메뉴 설정

`hugo.yaml`의 `menus`에 `main`, `docs`, `footer`, `utility`를 정의합니다.
