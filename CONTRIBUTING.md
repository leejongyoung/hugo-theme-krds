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
