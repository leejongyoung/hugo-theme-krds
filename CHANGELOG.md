# 변경 이력

## [1.2.1] - 2026-11-07

### 추가
- 첨부 파일에 새 창 미리보기 버튼과 SHA-256 표시(`sha256:`) 추가
- 예제 파일 확충: 다이어그램 SVG, 보고서 docx(+변환본 pdf), 데이터 xlsx, 안내 txt — 형식별 미리보기를 문서에서 확인

## [1.2.0] - 2026-11-07

### 추가
- 첨부 파일 미리보기와 글 하단 파일 목록 (`attachment` shortcode + `attachments:` front matter). pdf·이미지는 브라우저 내장 렌더, 오피스 문서(hwp·hwpx·docx·xlsx·cell 등)는 PDF 변환본(`preview_pdf`) 또는 클릭 후 연결되는 외부 뷰어(`viewer="google"|"office"`), 그 외 내려받기 카드

## [1.1.2] - 2026-11-07

### 수정
- iframe shortcode의 `link`가 `https://`로 시작하지 않으면 provider 링크를 출력하지 않음 (`javascript:` 등 비정상 scheme 차단)

## [1.1.1] - 2026-11-07

### 수정
- Hugo가 동적 `--th-embed-ratio`를 `ZgotmplZ`로 치환해 YouTube·Vimeo·iframe frame이 2px로 붕괴하고 버튼이 클릭되지 않던 문제
- 자체 video의 사용자 지정 `ratio`가 적용되지 않던 문제
- YouTube `url=` 형식이 Go RE2 비호환 정규식으로 실패하던 문제

### 추가
- YouTube `thumbnail=true`와 URL 형식 ID 추출
- 일반 iframe의 provider 이름 자동 추론

## [1.1.0] - 2026-11-07

### 추가
- KaTeX 수식, Mermaid 다이어그램, Chart.js 차트의 페이지별 지연 로딩
- YouTube·Vimeo·일반 iframe privacy-first shortcode와 자체 video·audio shortcode
- Jekyll 데모와 같은 예제 문서·글·태그 분포

### 변경
- Jekyll 테마와 동일한 KRDS CSS, Pretendard GOV, icon 자산 및 header·GNB·footer DOM으로 교체
- 소개, 문서, 블로그, 태그, 검색의 1440px PC layout과 360px 반응형 layout을 동일하게 정렬
- README와 저장소 description·topics를 Jekyll 테마 구성에 맞춤

### 수정
- 모바일 전체메뉴 Escape 닫기와 opener 포커스 복귀
- Hugo 검색 색인을 Jekyll 검색 runtime schema와 일치시킴
- project Pages base path에서 자체 video·audio·caption URL이 404가 되던 문제

## [1.0.0] - 2026-11-07

### 추가
- KRDS 기반 반응형 header, 2단계 GNB, mobile menu, footer
- 소개, 일반 페이지, 문서, 블로그, 태그 taxonomy 레이아웃
- 빌드 시 생성되는 JSON 색인과 브라우저 내 검색
- 밝은 화면, 고대비 화면, 시스템 화면 모드와 글자 크기 저장
- Hugo Module 설치, exampleSite, CI, GitHub Pages 배포 구성
