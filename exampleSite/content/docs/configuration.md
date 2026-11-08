---
title: 설정
description: 사이트 이름, 푸터, 색과 글꼴을 바꾸는 방법입니다.
weight: 20
tags: [설정, 가이드]
---

## hugo.yaml

| 키 | 설명 |
| :--- | :--- |
| `params.description` | 사이트 설명 |
| `params.footer.description` | 푸터 설명 |
| `params.footer.contact` | 푸터 연락처 목록(`label`, `value`) |
| `params.customCSS` | 테마 CSS 뒤에 불러올 사이트 CSS 경로 목록 |
| `params.krds.hwp.rhwp` | 고화질 한글 미리보기(rhwp)를 켤지(기본 꺼짐). rhwp 파일은 테마에 없고 `rhwp-vendor` action으로 받아야 합니다([첨부 파일]({{< relref "/docs/attachments" >}}) 참고) |
| `params.krds.search.sentence` | 검색의 "문장으로 찾기"를 켤지(기본 `true`). 끄면 색인에서 소제목별 본문이 빠집니다 |
| `pagination.pagerSize` | 글 목록 한 페이지의 글 수 |
| `outputs.home` | 검색에 필요한 `JSON`을 포함한 홈 출력 형식 |

## 색과 글꼴 바꾸기

KRDS 토큰은 원본을 고치지 않고 CSS 변수를 다시 선언해서 바꿉니다. 사이트의 CSS를 `params.customCSS`로 테마 스타일 뒤에 불러옵니다.

```yaml
params:
  customCSS:
    - css/custom.css
```

```css
:root {
  --krds-typo-font-type: "Pretendard GOV", sans-serif;
}
```

## 푸터 출처 표시

푸터의 KRDS 출처 문구는 KRDS 이용 조건에 따른 것이므로 지우지 않습니다.
