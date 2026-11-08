# hugo-theme-krds

> 행정안전부가 공공누리 제1유형으로 개방한 [범정부 UI/UX 디자인시스템(KRDS)](https://www.krds.go.kr)을 바탕으로 만든 Hugo 테마입니다.
> *Hugo theme based on KRDS (Korea Design System).*

KRDS의 디자인 토큰과 HTML 컴포넌트를 그대로 가져와 문서·블로그 사이트를 만드는 범용 Hugo 테마입니다.

- **KRDS 원본 유지:** 토큰·CSS·JS는 원본을 고치지 않고 `static/assets`로 가져옵니다. 색과 글꼴은 CSS 변수를 다시 선언해서 바꿉니다(KRDS 개발자 가이드의 방식).
- **글자 크기·화면 모드:** 글자 크기 5단계, 화면 모드(기본 밝은 배경 / 선명하게 어두운 배경 / 시스템 설정)를 헤더에서 바꾸고 기억합니다.
- **레이아웃:** `home`, `single`, `docs`(사이드 내비게이션 + 이 페이지의 구성), `blog`, `taxonomy`(태그 모아보기), `search`(검색)
- **컴포넌트:** 건너뛰기 링크, 헤더·메인메뉴(PC)·전체메뉴(모바일), 브레드크럼, 사이드 내비게이션, 페이지네이션, 푸터, 버튼·배지
- **서체:** Pretendard GOV 셀프 호스팅(외부 CDN 없음)
- **태그·검색:** 태그 링크와 태그 페이지, 서버 없이 브라우저에서 도는 검색(한글 부분 일치, 태그로 좁히기, 질문처럼 문장으로 적어 가까운 내용 찾기)
- **수식·도표·임베드:** KaTeX, Mermaid, Chart.js와 privacy-first YouTube·Vimeo·iframe shortcode를 필요한 페이지에서만 불러옵니다. pdf·이미지 미리보기와 글 하단 파일 목록(`attachment` shortcode + `attachments:`)도 제공합니다.
- **아이콘:** Font Awesome Free SVG 아이콘 세트(`icon` shortcode). 첨부 파일 카드는 확장자별 아이콘을 자동으로 고릅니다.
- **위키:** `[[문서 링크]]`, 역링크, 정보 상자, 분류·검색 필터, 작성이 필요한 문서·고아 문서 목록을 갖춘 위키 레이아웃

**데모:** <https://leejongyoung.github.io/hugo-theme-krds/> · 소스: [`exampleSite/`](exampleSite) (`hugo server`로 확인)

## 설치

이 테마는 **Hugo Extended 0.158.0 이상**과 **Go 1.24 이상**이 필요합니다.

### 방법 1. Hugo Module

```sh
hugo mod init github.com/example/my-site
hugo mod get github.com/leejongyoung/hugo-theme-krds@v1.8.1
```

```yaml
# hugo.yaml
module:
  imports:
    - path: github.com/leejongyoung/hugo-theme-krds
```

`@v1.8.1`처럼 태그를 붙여 버전을 고정할 수 있습니다. 이 저장소의 `exampleSite/go.mod`도 로컬 테마를 Module로 불러 빌드합니다.

### 방법 2. Git submodule

```sh
git submodule add https://github.com/leejongyoung/hugo-theme-krds.git themes/hugo-theme-krds
```

```yaml
# hugo.yaml
theme: hugo-theme-krds
```

Hugo Module 방식을 권장합니다. 모듈은 버전 고정과 업데이트가 명시적이고 여러 사이트에서 같은 테마를 재사용하기 쉽습니다.

### GitHub Pages에 배포하기 (Actions)

1. 이 저장소의 [`.github/workflows/pages.yml`](.github/workflows/pages.yml)을 사이트 저장소에 복사하고 `exampleSite` 경로를 사이트 루트에 맞게 바꿉니다.
2. 저장소 **Settings → Pages**에서 Source를 *GitHub Actions*로 지정합니다.
3. 프로젝트 사이트라면 workflow의 `--baseURL`을 Pages가 제공한 주소로 전달합니다.

이 저장소의 [데모](https://leejongyoung.github.io/hugo-theme-krds/)도 같은 방식으로 배포됩니다. Actions는 Node.js 24 계열 공식 action(`checkout@v7`, `setup-go@v7`, `configure-pages@v6`, `upload-pages-artifact@v5`, `deploy-pages@v5`)과 `ubuntu-24.04`를 사용합니다. Hugo Extended는 공식 Release archive를 SHA-256으로 검증한 뒤 설치합니다.

## 시작하기

1. `hugo.yaml`에 메뉴를 만듭니다([예제](exampleSite/hugo.yaml)).

   ```yaml
   menus:
     main:          # 상단 메뉴(최대 2단계)
       - name: 소개
         pageRef: /about
         weight: 10
       - name: 문서
         pageRef: /docs
         identifier: main-docs
         weight: 20
       - name: 시작하기
         pageRef: /docs/getting-started
         parent: main-docs
         weight: 21
     utility:       # 헤더 맨 위 보조 링크
       - name: GitHub
         url: https://github.com/...
     footer:        # 푸터 링크
       - name: KRDS 누리집
         url: https://www.krds.go.kr
   ```

2. 콘텐츠를 section에 둡니다. Hugo의 기본 pretty URL이 메뉴의 `/docs/x/` 형태와 맞습니다.

| 레이아웃 | 용도 | 주요 front matter |
| :--- | :--- | :--- |
| `home` | 첫 화면 | `hero`(eyebrow, title, lead, actions[]), `features[]` |
| `_default/single` | 일반 페이지 | `title`, `description` |
| `docs` | 사이드 메뉴가 있는 문서 | `title`, `description`, `weight` |
| `blog` | 글 목록과 글 | `title`, `date`, `tags`, `author` |
| `taxonomy` | 태그 모아보기 | Hugo `tags` taxonomy |
| `search` | 검색 | `content/search/_index.md` |

## 설정

```yaml
# hugo.yaml
params:
  description: 사이트 설명
  footer:
    description: 사이트 설명
    contact:
      - label: 이메일
        value: me@example.com
    copyright: 사이트 이름

taxonomies:
  tag: tags

outputs:
  home: [HTML, RSS, JSON]  # JSON은 검색 색인
```

### 색·글꼴 바꾸기

사이트의 CSS를 테마 CSS 뒤에 불러오고 KRDS 변수를 다시 선언합니다.

```yaml
params:
  customCSS:
    - css/custom.css
```

```css
:root {
  --krds-color-light-primary-50: #0b7a5b;
}
```

사용할 수 있는 토큰은 `static/assets/css/main.css`와 [KRDS 디자인 토큰 목록](https://www.krds.go.kr/html/site/style/style_07.html)을 참고하세요.

### 덮어쓰기

테마의 `layouts/` 파일과 같은 경로로 사이트에 파일을 두면 사이트 파일이 우선합니다. `<head>`에 태그를 더하려면 `layouts/_partials/head.html`을 복사해 확장하거나 `params.customCSS`를 사용하세요.

## 수식·다이어그램·차트·임베드

모두 **필요한 페이지에서만** 해당 라이브러리를 불러옵니다(일반 페이지에는 추가 요청이 없습니다). 외부 서비스는 **사용자가 버튼을 누르기 전에는 연결하지 않습니다.** 예제는 [데모의 "임베드와 수식"](https://leejongyoung.github.io/hugo-theme-krds/docs/embeds/)과 [`exampleSite/content/docs/embeds.md`](exampleSite/content/docs/embeds.md)입니다.

TeX 역슬래시를 KaTeX까지 보존하려면 `hugo.yaml`에 Goldmark passthrough를 켭니다.

```yaml
markup:
  goldmark:
    extensions:
      passthrough:
        enable: true
        delimiters:
          block:
            - ['\[', '\]']
            - ['$$', '$$']
          inline:
            - ['\(', '\)']
```

| 기능 | 쓰는 법 | 라이브러리 |
| :--- | :--- | :--- |
| 수식 | 본문에 `$$ ... $$` (인라인은 `\( ... \)`) | KaTeX |
| 다이어그램 | `mermaid` 코드 블록 | Mermaid |
| 차트 | `chart` 코드 블록에 Chart.js 설정을 **JSON**으로 | Chart.js |
| YouTube | `{{</* youtube id="영상ID" title="제목" */>}}` 또는 `url="https://youtu.be/..."` | 없음(iframe) |
| Vimeo | `{{</* vimeo id="123456" title="제목" */>}}` | 없음(iframe) |
| 그 밖의 페이지 | `{{</* iframe url="https://..." title="제목" */>}}` | 없음(iframe, sandbox) |
| 첨부 파일 | `{{</* attachment src="..." title="..." */>}}`(본문 미리보기) + `attachments:`(글 하단 동작 목록) | pdf·이미지·스프레드시트 새 탭 viewer, HWPX·텍스트(줄 번호·인코딩 표시·형식별 색상·복사) 브라우저 직접 미리보기, HWP/HWPX PDF 변환 action, 첨부 바이러스 검사(ClamAV) action·표시, 형식별 파일 아이콘("H" 한글 아이콘 포함)·SHA-256 전체 표시 |

- **수식:** 달러 기호가 든 일반 문장(`$4와 $6`)은 수식으로 바뀌지 않습니다. 단일 `$ ... $`는 지원하지 않습니다. KaTeX가 MathML도 함께 내보냅니다.
- **다이어그램:** 화면 모드를 바꾸면 현재 색으로 다시 그리고, "다이어그램 원문 보기"를 제공합니다. 색은 KRDS 토큰에서 가져옵니다.
- **차트:** 색은 KRDS 색을 자동으로 쓰고 점 모양도 달리합니다. "데이터 표로 보기"가 자동으로 생깁니다. JSON만 받으므로 함수(콜백)는 쓸 수 없습니다. `title`·`description`은 접근성용 추가 키입니다.
- **개인정보:** YouTube는 `youtube-nocookie.com`, Vimeo는 `dnt=1`을 씁니다. 재생 버튼을 누르기 전에는 외부에 요청하지 않으며 일반 iframe에는 `sandbox`가 기본으로 걸립니다. YouTube `thumbnail=true`는 선택한 경우에만 페이지 로드 때 `i.ytimg.com`에 연결합니다.
- **끄기:** 페이지 front matter의 `math`·`mermaid`·`chart`를 `true`/`false`로 지정하거나, `hugo.yaml`의 `params.krds.math`·`params.krds.mermaid`·`params.krds.chart`를 `false`로 둡니다.
- **접근성:** `title`(영상 제목)을 꼭 적으세요. 스크린리더가 iframe 이름으로 읽습니다. 자체 호스팅 영상에는 자막을 함께 넣는 것을 권장합니다.

용량: Mermaid(약 3.7MB, 다이어그램 종류별로 필요한 조각만 불러옴), Chart.js 205KB, KaTeX 약 600KB(글꼴 포함)이며 해당 코드 블록·수식이 있는 페이지에서만 받습니다.

## 홈 화면

홈(`content/_index.md`)의 front matter에 `banner`·`tabs`·`cards`·`cardnews`를 적으면 구역이 나타납니다(모두 선택, 기존 `hero`·`features`와 함께 씁니다). 예제는 [`exampleSite/content/_index.md`](exampleSite/content/_index.md), 전체 설명은 [데모의 "홈 화면 꾸미기"](https://leejongyoung.github.io/hugo-theme-krds/docs/home/)입니다.

- **슬라이드 배너(`banner`):** 자동 넘김, 멈춤·재생 버튼, 이전·다음, 점, 화살표 키, 터치 밀기. 마우스·초점이 있는 동안 잠시 멈추고, "움직임 줄이기" 설정이면 자동 재생하지 않습니다.
- **탭(`tabs`):** 최근 글(`source: posts`), 최근 바뀐 위키 문서(`source: wiki`), 직접 적은 카드(`items`)를 탭으로 나눕니다. 방향키·Home·End로 옮깁니다.
- **카드뷰(`cards`)·주요 기능(`features`):** Font Awesome 아이콘(`icon`)과 태그가 있는 카드 격자.
- **카드뉴스(`cardnews`):** 색 배경(`tone`: blue·green·purple·orange·dark)의 세로형 카드를 가로로 넘겨 봅니다. 이전·다음 버튼과 "1 / 5" 표시.
- 자바스크립트가 없으면 슬라이드는 세로 목록, 탭은 제목이 붙은 구역으로 보이고, 선명하게(고대비) 모드에서는 검정 바탕에 흰 테두리가 됩니다.
- 최근 글 구역은 `recent_posts: false`로 끌 수 있습니다.

## 아이콘

[Font Awesome Free](https://fontawesome.com) 7.3.1의 SVG 아이콘 약 80개가 `static/assets/img/fa/`에 들어 있습니다. 글꼴 파일이나 외부 서버 없이 글자색을 따라 칠해지는 마스크 아이콘입니다.

```go-html-template
{{</* icon "file-pdf" */>}}
{{</* icon name="github" style="brands" */>}}
{{</* icon name="circle-info" label="안내" */>}}
```

- 첨부 파일 카드는 확장자(`pdf`·`docx`·`xlsx`·`hwpx` 등)에 맞는 아이콘과 색을 자동으로 고릅니다.
- 템플릿에서는 `<i class="th-fa th-fa-file-pdf" aria-hidden="true"></i>`로 직접 쓸 수 있고, 전체 목록과 추가 방법은 [데모의 "아이콘"](https://leejongyoung.github.io/hugo-theme-krds/docs/icons/)에 있습니다.
- 아이콘은 CC BY 4.0이므로 `NOTICE.md`와 `static/assets/img/fa/LICENSE.txt`를 지우지 마세요.

## 위키

`content/wiki/`에 마크다운 문서를 두면 문서끼리 `[[문서 링크]]`로 잇는 위키가 됩니다. 예제는 [`exampleSite/content/wiki/`](exampleSite/content/wiki), 사용법은 [데모의 위키](https://leejongyoung.github.io/hugo-theme-krds/wiki/)입니다.

```yaml
# content/wiki/_index.md — 위키 홈
---
title: 위키
description: 문서를 서로 연결해 모아 둔 위키입니다.
---
```

```yaml
# content/wiki/디자인-토큰.md — 위키 문서
---
title: 디자인 토큰
summary: 목록 카드에 쓰이는 한 줄 요약
category: 테마
wiki_aliases: [토큰, tokens]
tags: [디자인]
lastmod: 2026-11-08
infobox:
  - label: 저장소
    value: owner/repo
---
```

```yaml
# hugo.yaml
menus:
  main:
    - name: 위키
      pageRef: /wiki
      weight: 50
params:
  krds:
    wiki:                  # 선택: 있으면 편집·변경 이력·새 문서 만들기 링크가 생깁니다
      repo: owner/repo
      branch: main
      contentDir: content
```

- **문서 링크:** `[[제목]]`, `[[제목|표시 글]]`, `[[제목#섹션]]`. 제목 → 파일 이름 → `wiki_aliases` 순으로 찾고, 없는 문서는 붉은 점선으로 보이며 누르면 새 문서를 만드는 GitHub 화면이 열립니다. 코드 블록 안은 링크로 바뀌지 않습니다.
- **문서 화면:** 분류별 왼쪽 메뉴, 정보 상자(`infobox`), 이 문서를 가리키는 문서(역링크), 관련 문서, 문서 편집·변경 이력·주소 복사·인쇄.
- **위키 홈:** 제목·별칭·태그·요약 검색(`/` 키로 이동), 분류 필터, 정렬, 무작위 문서, 최근 바뀐 문서, 작성이 필요한 문서, 고아 문서. 검색어·분류·정렬은 주소(`?q=&category=&sort=`)에 반영됩니다.
- **동작 방식:** 빌드할 때 `/wiki-index.json` 하나를 만들고 브라우저가 이 파일만 읽습니다. 외부 요청이 없습니다. 링크 해석은 자바스크립트가 필요하고, 꺼져 있으면 `[[ ]]`가 글자 그대로 보입니다.
- **제외:** 위키 문서도 사이트 검색에 포함됩니다. 빼려면 front matter에 `searchExclude: true`를 적으세요.


## 태그와 검색

태그와 검색은 Hugo의 taxonomy와 home JSON output을 사용합니다. [`exampleSite/content/tags/_index.md`](exampleSite/content/tags/_index.md), [`exampleSite/content/search/_index.md`](exampleSite/content/search/_index.md), [데모의 "태그와 검색"](https://leejongyoung.github.io/hugo-theme-krds/docs/search-tags/)을 참고하세요.

- **태그:** `tags`가 있는 글과 문서를 개수 많은 순서로 보여 줍니다. `/tags/`에서 태그별 글을 한 페이지에 모아 보고 개별 term 페이지도 사용할 수 있습니다.
- **검색:** 빌드할 때 home JSON output(`/index.json`)을 만들고 브라우저가 이 파일 하나만 받아 검색합니다. 외부 서비스·외부 요청이 없습니다. 공백으로 나눈 단어가 모두 들어 있는 글을 찾고 제목 > 태그 > 요약 > 본문 순으로 점수를 줍니다. 태그 칩으로 좁히고 `?q=…&tag=…` 주소로 결과를 공유합니다.
- **제외:** front matter에 `searchExclude: true`를 지정하면 색인에서 빠집니다.
- **한계:** 형태소 분석이나 오타 보정은 없습니다. 영어 외 언어의 대소문자 규칙은 `toLowerCase()`에 따릅니다.

## 접근성과 검증

- PC GNB는 Enter로 열고 Tab으로 이동하며 Escape로 닫으면 trigger로 포커스가 돌아갑니다.
- 모바일 전체메뉴는 dialog로 열리고 Escape로 닫힙니다.
- 첫 Tab의 "본문 바로가기", 화면 모드, 글자 크기, 가로 overflow를 실제 브라우저에서 확인합니다.
- 360px 모바일과 1439·1568·1920px PC 정렬선을 검증합니다.
- axe-core 4.13으로 밝은 모드, 선명하게 모드, 시스템 설정을 확인합니다.

실제 스크린리더, Safari·Firefox, Windows 고대비 모드 같은 조합은 별도 확인이 필요합니다. 접근성 인증을 받은 테마가 아닙니다.

## 알려진 한계

- 메인메뉴는 2단계까지입니다.
- KRDS 전체 CSS·아이콘과 Pretendard GOV를 포함해 번들이 작은 테마보다 큽니다.
- Mermaid의 ELK 레이아웃과 다이어그램 안의 수식은 용량 때문에 포함하지 않았습니다(`layout: dagre`로 고정).
- 외부 영상·지도의 접근성은 각 서비스에 달려 있고, 이 테마가 보장하지 않습니다.
- KRDS 스크립트는 body의 CSS `zoom`으로 글자 크기를 바꿉니다.

## 개발

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

## 기여와 지원

- 버그·접근성 문제·기능 제안·질문: [이슈 작성](https://github.com/leejongyoung/hugo-theme-krds/issues/new/choose)
- 기여 방법과 원칙: [CONTRIBUTING.md](CONTRIBUTING.md) · 행동강령: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- 보안 취약점: 공개 이슈 대신 [SECURITY.md](SECURITY.md)의 비공개 신고
- 도움 받는 곳: [SUPPORT.md](SUPPORT.md) · 변경 이력: [CHANGELOG.md](CHANGELOG.md)

## 라이선스와 출처

- 테마 코드: [MIT](LICENSE)
- KRDS 자료: 공공누리 제1유형(출처 표시 필수). 푸터의 출처 문구를 지우지 마세요.
- Pretendard GOV: SIL OFL 1.1

자세한 내용은 [NOTICE.md](NOTICE.md)를 보세요.
