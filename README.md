# Hugo Theme KRDS

범정부 UI/UX 디자인시스템(KRDS)의 정보 구조와 접근성 원칙을 바탕으로 만든 Hugo 테마입니다. Hugo Module로 버전을 고정해 여러 사이트에서 재사용할 수 있습니다.

> 이 프로젝트는 공식 KRDS 배포물이 아닙니다. KRDS 원문과 구성요소 기준은 [KRDS](https://www.krds.go.kr)에서 확인하세요.

## 기능

- 1200px·1440px 반응형 콘텐츠 컨테이너
- PC 2단계 GNB와 모바일 전체메뉴
- 일반 페이지, 문서 LNB·목차, 블로그·페이지 이동
- Hugo `tags` taxonomy
- 빌드 시 생성되는 JSON 색인과 외부 서비스 없는 검색
- 밝은 화면, 고대비 화면, 시스템 화면 모드
- 브라우저에 저장되는 글자 크기
- 키보드 탐색, skip link, 명시적인 focus 상태

## 요구 사항

- Hugo Extended 0.146.0 이상
- Go 1.24 이상

## 설치

사이트 루트에서 Hugo Module을 초기화하고 버전을 지정합니다.

```sh
hugo mod init github.com/example/my-site
hugo mod get github.com/leejongyoung/hugo-theme-krds@v1.0.0
```

`hugo.yaml`:

```yaml
module:
  imports:
    - path: github.com/leejongyoung/hugo-theme-krds

taxonomies:
  tag: tags

outputs:
  home: [HTML, RSS, JSON]
```

검색 페이지를 만듭니다.

```text
content/search/_index.md
```

```yaml
---
title: 검색
description: 제목, 요약, 본문과 태그에서 검색합니다.
searchExclude: true
---
```

## 메뉴

`menus.main`은 한 단계의 하위 메뉴를 지원합니다.

```yaml
menus:
  main:
    - name: 문서
      pageRef: /docs
      identifier: docs
      weight: 20
    - name: 시작하기
      pageRef: /docs/getting-started
      parent: docs
      weight: 21
```

## 사이트 설정

```yaml
params:
  description: 사이트 설명
  footer:
    description: Footer 설명
    copyright: 사이트 이름
    contact:
      - label: 문의
        value: contact@example.com
```

문서 페이지는 `content/docs/`, 블로그 글은 `content/blog/`에 둡니다. `tags` 배열은 taxonomy와 검색 필터에 함께 사용됩니다. 검색에서 제외할 페이지는 `searchExclude: true`를 지정합니다.

## 로컬 개발

```sh
mise install
cd exampleSite
mise exec -- hugo server --disableFastRender
```

배포 빌드:

```sh
cd exampleSite
mise exec -- hugo --gc --minify --panicOnWarning
```

## 예제와 배포

- 예제: <https://leejongyoung.github.io/hugo-theme-krds/>
- 변경 이력: [CHANGELOG.md](CHANGELOG.md)
- 라이선스: [MIT](LICENSE)
