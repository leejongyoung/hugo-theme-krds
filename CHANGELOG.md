# 변경 이력

## [Unreleased]

## [1.7.1] - 2026-11-08

### 추가
- `script/check-shared.py`와 CI의 `shared-files` 잡: Hugo·Jekyll 두 테마에서 같아야 하는 파일(`hwpx.js`, `text.js`, `home.js`, `wiki.js`, `attachment-viewer.*`, `document-previews/`, `attachment-scan/`, vendor·아이콘 폴더, 예제 첨부 파일 등)이 상대 저장소의 `main`과 어긋나면 경고합니다. 지금은 경고만 남기고 실패시키지 않으며 `--strict`로 실패로 바꿀 수 있습니다. CONTRIBUTING에 설명을 추가했습니다
- 문서: 검사 기록을 CI가 자동으로 커밋하는 방법(선택). 실제 GitHub 러너에서 시험한 동작(처음 검사·커밋, 다음 빌드는 건너뜀, 새 파일만 검사)을 바탕으로 제약도 적었습니다

### 변경
- 예제 `sample.hwpx`에 하이퍼링크를 넣어 데모에서 링크가 어떻게 보이는지 확인할 수 있습니다

## [1.7.0] - 2026-11-08

### 추가
- HWPX 미리보기가 하이퍼링크 필드를 클릭 가능한 링크로 표시합니다. `http:`·`https:`·`mailto:`만 링크로 만들고 그 밖의 주소(`javascript:` 등)는 글자로만 보여 줍니다. 새 탭에서 열리고(`noopener noreferrer`) 본문 링크와 같은 색·밑줄을 씁니다
- CI에 최소 지원 버전(Hugo 0.158.0)으로 예제 사이트를 빌드하는 잡을 추가했고, `theme.toml`의 `min_version`과 시험 버전이 다르면 실패하게 했습니다

## [1.6.1] - 2026-11-08

### 변경
- 첨부 바이러스 검사 표시에서 날짜를 빼고 "바이러스 검사 통과"만 보여 줍니다(마우스를 올리면 엔진·검사 날짜 표시)
- 모바일(767px 이하)에서 첨부 카드의 제목·설명은 2줄, SHA-256은 1줄로 줄여 …로 표시(viewer 제목도 2줄). 글자 수가 아니라 CSS로 줄이므로 화면 폭에 맞게 조절되고, 전체 값은 문서에 그대로 남음
- 예제 첨부 설명(`desc`)에서 "브라우저 내장 미리보기" 같은 군더더기 문구를 제거해 카드를 짧게 함

### 수정
- 테마가 요구하는 최소 Hugo 버전을 `0.146.0`에서 `0.158.0`으로 바로잡음. `site.Language.Locale`을 쓰는 레이아웃이 0.157.0 이하에서는 빌드 오류를 내고(0.146.0·0.150.0·0.152.2·0.154.5·0.156.0·0.157.0에서 확인), 0.158.0부터 예제 사이트가 `--panicOnWarning`까지 통과함
- 첨부 바이러스 검사 표시의 데이터 조회를 `hugo.Data`로 단순화(최소 버전이 0.156 이상이 되어 `site.Data` 분기가 필요 없음)

## [1.6.0] - 2026-11-08

### 추가
- 첨부 파일 바이러스 검사 옵션: `attachment-scan` GitHub Action이 ClamAV로 새로 들어온 파일만(주소·SHA-256 기준, 처음 한 번) 검사해 `data/attachment_scan.json`에 기록하고, 감염이 있으면 빌드를 실패시킵니다. 기록된 파일 카드에 "바이러스 검사 통과 · 날짜" 표시가 붙습니다
- 첨부 텍스트 미리보기(`txt`·`log`·`md`·`json`·`xml`·`yml`·`ini`·`conf`·`toml` 등): `<pre>`로 본문 카드(앞 100KB)와 새 탭 viewer(앞 2MB, 인쇄 가능)에 표시. UTF-8·UTF-16(BOM)·EUC-KR(CP949) 자동 판별, 내용은 `textContent`로만 넣어 HTML이 실행되지 않음, NUL이 있으면 텍스트로 보지 않음
- 예제 `sample-euckr.txt`, `sample.txt` 갱신과 문서 설명

### 변경
- 한글(hwp·hwpx) 파일 아이콘을 "H"가 들어간 전용 `file-hwp`로 바꾸고 색을 보라에서 진한 파랑으로 변경(Font Awesome 문서 아이콘 윤곽을 바탕으로 만든 수정본, NOTICE에 명시)

## [1.5.1] - 2026-11-08

### 수정
- 글 하단·위키 문서의 첨부 목록 예제(첨부 사용법 글, 첨부 위키)에 한글(HWPX) 예제가 빠져 있던 것을 추가

## [1.5.0] - 2026-11-08

### 추가
- 한글(HWPX) 첨부 파일을 변환 없이 브라우저에서 바로 미리보기(`hwpx.js`, `static/assets/js/hwpx.js`). ZIP을 직접 풀어 문단·글자 모양(굵기·기울임·밑줄·취소선·색·크기)·문단 정렬·표(칸 합치기)·그림을 그립니다. 본문 카드와 새 탭 viewer(인쇄 가능)에서 동작하고 `preview_pdf`가 있으면 PDF가 우선입니다
- 예제 `sample.hwpx`와 문서·위키·블로그 설명. 쪽 모양·머리말·쪽 번호·도형·수식은 그리지 않고, 예전 형식 `hwp`와 암호가 걸린 문서는 미리볼 수 없음(내려받기만 제공)

## [1.4.0] - 2026-11-08

### 추가
- 홈 화면 구역: 슬라이드 배너(`banner`, 자동 넘김·멈춤/재생·이전/다음·점·화살표 키·터치, 움직임 줄이기 존중), 탭(`tabs`, 최근 글·최근 바뀐 위키·직접 적은 카드), 카드뷰(`cards`), 카드뉴스(`cardnews`, 가로 스냅 스크롤·이전/다음·위치 표시). `features` 카드에도 Font Awesome `icon`을 쓸 수 있음. 최근 글 구역은 `recent_posts: false`로 끌 수 있음
- 문서 "홈 화면 꾸미기", 예제 홈에 위 구역 반영
- Font Awesome 아이콘 `play`·`pause`·`chevron-left` 추가

## [1.3.0] - 2026-11-08

### 추가
- 위키: 문서끼리 `[[문서 링크]]`로 잇는 위키 레이아웃(`layouts/wiki/`, `wiki-*` partial, `wiki.js`, `/wiki-index.json`). 분류별 왼쪽 메뉴, 정보 상자(`infobox`), 역링크·관련 문서, 문서 편집·변경 이력·주소 복사·인쇄, 위키 홈의 검색·분류 필터·정렬·무작위 문서·최근 바뀐 문서·작성이 필요한 문서·고아 문서. 메인 메뉴의 태그 옆에 "위키"를 추가한 예제와 예제 문서 10개
- Font Awesome Free 7.3.1 SVG 아이콘 약 80개(`th-fa` 마스크 아이콘)와 `icon`·`icon-gallery` shortcode, 문서 "아이콘"(아이콘 목록 포함)
- 블로그 예제 글 "첨부 파일 사용법 한눈에 보기"
- 라이선스 고지: SheetJS(Apache-2.0) `LICENSE`와 NOTICE 항목, Font Awesome Free(CC BY 4.0) NOTICE 항목

### 변경
- 첨부 파일 카드·viewer의 파일 아이콘을 Font Awesome 문서 아이콘을 담은 색 타일로 교체(PDF·워드·스프레드시트·프레젠테이션·한글·이미지·음원·영상·압축·코드·텍스트). 카드의 형식 라벨은 확장자(`DOCX`, `HWPX` 등)로 표시
- 미리보기·내려받기·인쇄 버튼의 아이콘을 Font Awesome으로 통일

### 수정
- 예제 문서의 `sample.txt` SHA-256 값에서 `0`이 빠져 63자리였던 오기를 64자리로 정정


## [1.2.6] - 2026-11-08

### 변경
- 본문 첨부 카드의 중복 버튼을 없애고, 글 하단 첨부 목록에 미리보기·내려받기 동작을 오른쪽 정렬
- 문서형 파일 아이콘을 접힌 모서리·확장자 라벨·형식별 색 구성으로 통일하고 SHA-256 전체 값을 카드에 표시
- 첨부 viewer 상단을 파일 아이콘·문서 제목·인쇄·원본 내려받기 구조로 개편

## [1.2.5] - 2026-11-08

### 변경
- 첨부 미리보기 버튼을 새 탭의 브라우저 viewer 링크로 복원하고, 미리보기 없는 카드의 내려받기 버튼도 오른쪽 정렬
- PDF·HWP/HWPX·HTML은 KRDS 전용 아이콘, 그 밖의 파일은 확장자 아이콘으로 표시

### 추가
- GitHub Actions에서 H2Orestart v0.8.0으로 HWP/HWPX·오피스 문서를 PDF로 변환하는 `document-previews` composite action

## [1.2.4] - 2026-11-08

### 변경
- 미리보기 버튼을 누르면 본문에 미리보기가 펼쳐지도록 변경 (새 창 열기 대신, 다시 누르면 접힘). 미리보기가 없는 카드에는 버튼 없음

## [1.2.3] - 2026-11-08

### 수정
- 첨부 문서의 hwpx→PDF 변환 안내를 H2Orestart 전제조건 포함으로 정정 (순정 LibreOffice는 hwpx 변환 불가, 실측 확인)

## [1.2.2] - 2026-11-07

### 추가
- 스프레드시트(xls·xlsx·ods·csv·tsv) 표 미리보기: 테마 내장 SheetJS로 브라우저에서 직접 렌더, 외부 연결 없음
- 첨부 파일 문서를 `embeds.md`에서 `attachments.md`로 분리

### 변경
- 외부 문서 뷰어(`viewer=`) 제거: 보이지 않는 문제가 있어 내장 미리보기로 일원화
- 미리보기 버튼을 오른쪽 끝으로, SHA-256을 다음 줄 왼쪽으로 배치

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
