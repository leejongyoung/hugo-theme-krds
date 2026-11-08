# 기여 안내

## 개발 환경

```sh
mise install
cd exampleSite
mise exec -- hugo server --disableFastRender
```

## 변경 원칙

- 테마 기능은 `layouts/`와 `assets/`에 구현합니다.
- `exampleSite/`에는 소비자가 복사할 수 있는 설정과 실제 사용 예제를 유지합니다.
- 메뉴와 대화형 UI는 키보드와 360px 화면에서 확인합니다.
- 새로운 외부 서비스나 JavaScript 의존성은 필요성과 개인정보 영향을 설명합니다.

## 제출 전 확인

```sh
cd exampleSite
mise exec -- hugo --gc --minify --panicOnWarning
```

UI 변경은 PC·모바일 화면과 axe 결과를 함께 확인합니다.

## 두 테마가 같아야 하는 파일

Hugo와 Jekyll 테마는 같은 기능을 나란히 제공해서 일부 파일(`hwp.js`, `text.js`, `home.js`, `wiki.js`, `attachment-viewer.*`, `document-previews/`, `attachment-scan/`, vendor·아이콘 폴더, 예제 첨부 파일 등)이 두 저장소에서 같아야 합니다. `theme.js`·`embeds.js`·`math.js`·`search.js`는 머리 주석만 달라도 됩니다.

- `script/check-shared.py`가 상대 저장소의 `main`과 비교하고 CI의 `shared-files` 잡이 돌립니다. PR·푸시에서는 어긋나면 **경고 주석만** 남기고 실패시키지 않습니다. 한쪽 PR이 아직 병합되지 않아 일시적으로 달라질 수 있기 때문입니다(공용 파일을 건드리는 PR은 늘 경고가 납니다). 대신 `shared-drift` 워크플로가 **매주 월요일** `--strict`로 돌아, 일주일이 지나도 어긋나 있으면 실패하고 알림이 갑니다. 직접 돌리려면 Actions에서 `shared-drift`를 실행(`workflow_dispatch`)하세요.
- 이 스크립트도 두 저장소에서 같은 파일입니다. 고치면 양쪽에 반영하세요.
- 로컬에서는 `python3 script/check-shared.py --other <상대 저장소 경로>`로 돌립니다. `--strict`를 주면 어긋날 때 실패합니다.
- 같아야 하는 파일의 목록은 스크립트의 `TARGETS`입니다. 새로 공용으로 쓰는 파일을 만들면 여기에 추가하세요.
