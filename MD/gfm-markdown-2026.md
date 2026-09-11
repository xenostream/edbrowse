# Markdown Complete Syntax Reference (2026)

여러분이 북마크해 둔 모든 마크다운 참고 자료에는 아마 빠진 부분이 하나쯤 있을 것입니다. 잊어버린 각주 구문, 구글에서 계속 검색하게 되는 표 정렬 요령, 중첩된 코드 블록에 필요한 정확한 펜스 문자 등이 바로 그것입니다. 이 참고 자료는 CommonMark 0.31.2 사양(CommonMark, 2024[^1])과 모든 GitHub Flavored Markdown 확장 기능(GFM 사양, 2019[^2])을 모두 다루며, 어떤 구문 요소든 몇 초 만에 찾을 수 있도록 체계적으로 정리되어 있습니다.

[^1]: https://spec.commonmark.org/0.31.2/
[^2]: https://github.github.com/gfm/

마크다운은 기술 문서 작성의 사실상 표준입니다. GitHub만 해도 6억 3천만 개 이상의 리포지토리를 호스팅하며(GitHub Octoverse, 2025[^3]), 이들 중 거의 모든 리포지토리에는 README, 문서, 변경 내역, 기여 가이드를 위한 `.md` 파일이 포함되어 있습니다. VS Code, Obsidian, Notion 또는 MacMD 같은 macOS 전용 뷰어에서 작성하든 상관없이, 이 마크다운 치트 시트는 **정확한 구문을 제공** 하므로 추측이나 시행착오 없이 곧바로 사용할 수 있습니다.

[^3]: https://github.blog/news-insights/octoverse/what-986-million-code-pushes-say-about-the-developer-workflow-in-2025/

> [!NOTE]
> GitHub의 6억 3천만 개 리포지토리는 문서, README, 변경 내역에 마크다운을 사용합니다(GitHub Octoverse, 2025). CommonMark 사양(버전 0.31.2)에는 모든 파서가 동일하게 렌더링되도록 보장하기 위한 600개 이상의 테스트 케이스가 포함되어 있습니다.


## What Does This Markdown Cheat Sheet Cover?

> [!NOTE]
> **요약**: 이 마크다운 치트 시트는 제목, 강조(굵게, 기울임, 취소선), 링크, 이미지, 목록, 코드 블록, 표, 인용문, 수평선, 줄 바꿈, 각주, 수학 식, Mermaid 다이어그램 그리고 원시 HTML을 다룹니다. 모든 예시는 CommonMark 0.31.2[^4] 사양(2024)을 따르며, 별도로 명시된 경우 GFM[^5] 사양을 따릅니다. 이 페이지를 즐겨찾기에 추가하시기 바랍니다. 이 한 장이면 마크다운을 다루는 데 필요한 모든 정보를 확인할 수 있습니다.

[^4]: https://spec.commonmark.org/0.31.2/
[^5]: https://github.github.com/gfm/



## How Do You Write Headings in Markdown?
제목(Headings)은 해시 기호(#) 뒤에 공백을 넣어 작성합니다. 해시 기호의 개수에 따라 <h1> 부터 <h6>까지의 제목 수준이 결정됩니다. CommonMark 사양[^6] (4.2절)에 따르면, 해시 기호와 제목 텍스트 사이에는 “최소 한 개의 공백” 이 있어야 합니다.

[^6]: https://spec.commonmark.org/0.31.2/

```
# 제목 1
## 제목 2
### 제목 3
#### 제목 4
##### 제목 5
###### 제목 6
```

**기억해야 할 규칙**:

- 제목 앞뒤에는 항상 빈 줄을 추가해야 합니다. 그렇지 않으면 일부 파서가 오류를 발생시킬 수 있습니다.

- 절대 수준을 건너뛰지 마시기 바랍니다(`##` 에서 `####` 로 바로 넘어갈 경우). 이는 접근성과 문서 개요를 손상시킵니다.

- 최대 6단계까지 지원됩니다. # 문자가 7개 이상이면 일반 텍스트로 표시됩니다.

- 마무리 해시(## 제목 ##)는 선택 사항이며 순전히 미적 효과를 위한 것입니다.

플랫폼별 제목 동작에 대한 자세한 내용은 마크다운 텍스트 서식 가이드[^7]를 참조합니다.

[^7]: https://macmdviewer.com/blog/markdown-text-formatting


## How Do You Format Bold, Italic, and Strikethrough?
텍스트 강조는 모든 마크다운 치트 시트에서 가장 자주 사용하는 서식입니다. 모든 옵션(굵게, 기울임꼴, 밑줄, 위첨자/아래첨자)을 한 곳에서 확인하려면 마크다운 텍스트 서식 가이드[^8]를 참조합니다. 이 구문은 별표와 밑줄 기호를 사용해서 굵게, 기울임꼴, 굵게-기울임꼴 텍스트를 생성합니다. 저는 GitHub, VS Code, Obsidian, MacMD Viewer에서 세 가지 강조 유형을 모두 테스트해서 크로스 플랫폼 호환성을 확인했습니다.

[^8]: https://macmdviewer.com/blog/markdown-text-formatting

### Bold

```
**굵은 텍스트**
__이것도 굵게__
```

**출력: 굵은 텍스트**

기본적으로 별표 두 개(`**`)를 사용합니다. 밑줄 두 개(`__`)는 대부분의 파서에서 단어 중간에 사용하면 제대로 작동하지 않습니다. 예를 들어, `un__break__able` 은 GitHub에서 렌더링되지 않는 반면, `un**break**able` 은 어디서나 정상적으로 작동합니다. CommonMark 사양[^9] (6.2절)에서는 이를 “강한 강조(strong emphasis)” 로 정의합니다.

[^9]: https://spec.commonmark.org/0.31.2/

### Italic

```
*이탤릭체 텍스트*
_이탤릭체_
```

**출력**: *이탤릭체 텍스트*

같은 이유로 단어 중간에 단일 별표(`*`)를 사용하는 것이 좀 더 안전합니다. `un*frigging*believable` 은 모든 CommonMark 파서에서 작동하지만, 밑줄은 그렇지 않습니다.

### Bold and Italic

```
***굵은 글씨와 이탤릭체***
```

**출력**: ***굵은체 및 이탤릭체***


### Striketrough(GFM)

```
~~삭제된 텍스트~~
```

**출력**: ~~삭제된 텍스트~~

취소선은 GFM 확장 기능으로, CommonMark 핵심 사양의 일부는 아닙니다. GitHub, GitLab, Reddit, Obsidian 및 대부분의 최신 편집기에서 작동합니다. 플랫폼별 동작 및 일반적인 해결 방법은 마크다운 취소선 가이드[^10]를 참조합니다.

[^10]: https://macmdviewer.com/blog/markdown-strikethrough-guide



## How Do You Create Links and Images?
링크와 이미지의 구문은 거의 동일하며, 이미지의 경우 앞쪽에 느낌표가 추가될 뿐입니다.


### Inline Links

```
[링크 텍스트](https://example.com)
[제목이 있는 링크](https://example.com “제목 텍스트”)
```

제목 텍스트는 마우스를 올렸을 때 툴팁으로 표시됩니다. 선택 사항이지만 접근성 측면에서 유용합니다.

### Reference Links
참조 링크는 URL과 텍스트를 분리해서 긴 문서의 가독성을 유지합니다:

```
[링크 텍스트][ref-id]

[ref-id]: https://example.com “선택적 제목”
```

이는 링크가 많은 문서에 특히 유용합니다. 콘텐츠는 깔끔하게 유지되고 URL은 하단에 그룹화됩니다.

### Autolinks
각괄호를 사용하면 원시 URL을 클릭 가능한 링크로 변환할 수 있습니다:

```
<https://example.com>
<user@example.com>
```

GFM은 각괄호가 없는 `https://example.com` 같은 단순 URL도 자동으로 링크로 변환하지만, 이는 비표준 방식이므로 모든 파서에서 작동하지 않습니다.

### Images

```
![대체 텍스트](image.png)
![대체 텍스트](image.png “선택적 제목”)
```

마크다운은 이미지 크기 조정을 위한 기본 구문이 없습니다. 크기를 제어하려면 일반 HTML을 사용해야 합니다:

```
<img src="image.png" alt="대체 텍스트" width="400">
```


## How Do You Format Lists in Markdown?
목록은 모든 .md 파일에서 가장 흔히 사용하는 요소 중 하나입니다. 전체 중첩 규칙, 예외적인 경우 및 플랫폼별 동작은 마크다운 목록 가이드[^11]를 참조합니다.

[^11]: https://macmdviewer.com/blog/markdown-lists-guide

### 번호 없는 목록
-, * 또는 + 뒤에 공백을 붙여 사용합니다:

```
- 첫 번째 항목
- 두 번째 항목
- 세 번째 항목
```

한 가지 문자를 선택하고 문서 전체에 일관되게 사용합니다. 대시(-) 문자가 가장 일반적인 관례입니다.

### 번호가 있는 목록
숫자 뒤에 마침표와 공백을 붙입니다:

```
1. 첫 번째 항목
2. 두 번째 항목
3. 세 번째 항목
```

시작 번호는 `<ol start="N">` 속성을 설정하므로 중요하지만, 그 이후의 번호는 파서에서 무시됩니다. 모든 항목에 `1. 1. 1.` 을 작성하는 것은 유효하며, 버전 관리 시 변경 내역을 좀 더 깔끔하게 유지합니다.

### 중첩 목록
자식 항목은 2~4개의 공백으로 들여쓰기합니다(모든 렌더러에서 4개가 가장 안전합니다):

```
1. 상위 항목
    - 자식 항목
    - 또 다른 자식
        - 손자 항목
2. 다음 상위 항목
```

### 작업 목록(GFM)

```
- [x] 완료된 작업
- [ ] 미완료 작업
- [ ] 다른 작업
```

작업 목록은 GitHub, GitLab 및 대부분의 편집기에서 상호작용 가능한 체크박스로 표시됩니다. 중첩, 프로젝트 관리 패턴 및 플랫폼 지원을 포함한 전체 구문은 마크다운 체크박스 가이드[^12]를 참조합니다.

[^12]: https://macmdviewer.com/blog/markdown-checkbox-guide


## What Is the Syntax for Code in Markdown?
코드 서식은 모든 기술 관련 마크다운 참고 자료에 필수적입니다. 마크다운은 인라인 코드 구간과 펜스 코드 블록 모두 지원합니다.

### 인라인 코드
텍스트를 단일 백틱으로 감쌉니다:

```
`printf()` 함수를 사용하여 출력을 표시합니다.
```

코드 자체에 백틱이 포함되면, 구분자로 이중 백틱을 사용합니다:

```
``내부에 `백틱`이 포함된 코드``
```

### 펜스 코드 블록
삼중 백틱 또는 삼중 물결표를 사용하고, 선택적으로 구문 강조를 위해 언어 식별자를 뒤에 붙일 수 있습니다:

```
'''javascript
function greet(name) {
  return `Hello, ${name}!`;
}
'''
```

일반적인 언어 식별자: 

```
javascript, python, bash, html, css, json, yaml, markdown, sql, typescript, go, rust, csharp, java, ruby, swift, php.
```

### 들여쓰기된 코드 블록
모든 줄을 공백 4개 또는 탭 1개만큼 들여씁니다:

```
    function oldStyle() {
      return true;
    }
```

인덴트된 코드 블록보다 펜스(fenced) 블록을 사용하는 것이 좋습니다. 펜스 블록은 구문 강조를 지원하며 소스 코드 형태로 읽기 쉽기 때문입니다. 제가 테스트한 결과, 인덴트된 코드 블록은 목록 항목과 결합될 때 구문 분석 모호성을 유발하는 반면, 펜스 블록은 이런 문제를 완전히 방지합니다. 고급 예제가 포함된 펜스 및 인덴트 코드 블록에 대한 전체 가이드는 마크다운 코드 블록 가이드[^13]를 참조합니다.

[^13]: https://macmdviewer.com/blog/markdown-code-block


## How Do You Build Tables in Your Markdown Cheat Sheet?
테이블은 GFM 사양[^14] (4.10절)에 정의된 GFM 확장 기능입니다. 테이블은 파이프(|)와 하이픈(-)을 사용해서 열과 행을 정의합니다. 제 경험상 테이블은 사람들이 구글에서 가장 자주 검색하는 구문 요소입니다. 정렬을 위한 콜론(:) 사용법을 금방 잊어버리기 때문입니다.

[^14]: https://github.github.com/gfm/


## 기본 표

```
| 헤더 1 | 헤더 2 | 헤더 3 |
| -------- | -------- | -------- |
| 셀 1   | 셀 2   | 셀 3   |
| 셀 4   | 셀 5   | 셀 6   |
```

## 열 정렬
분리 행에 콜론을 사용해서 정렬을 제어합니다:

```
| 왼쪽     | 중앙   | 오른쪽    |
| :------- | :------: | -------: |
| 정렬됨  | 정렬됨  | 정렬됨  |
```

- `:---`  = 왼쪽 정렬 (기본값)
- `:---:` = 중앙 정렬
- `---:`  = 오른쪽 정렬

### 표 작성 팁
- 각 행의 시작과 끝에 파이프(|)를 사용하는 것은 선택 사항이지만 가독성을 높여줍니다.

- 셀 내용은 시각적으로 정렬될 필요가 없습니다. 파서는 여분의 공백을 무시합니다.

- 셀 내부에서 인라인 서식(굵게, 기울임꼴, 코드, 링크)을 사용할 수 있습니다.

- 복잡한 표의 경우, 마크다운 표 생성기[^15]를 사용해서 시각적으로 구성한 후 구문을 복사합니다.

[^15]: https://macmdviewer.com/tools/markdown-table-generator

- 파이프 및 정렬에 대한 전체 참조, 예외적인 경우 및 플랫폼별 특이 사항에 대해서는 마크다운 표 가이드[^16]를 참조합니다.

[^16]: https://macmdviewer.com/blog/markdown-table-guide

- 콜론 구문은 표 자체가 아닌 셀 내용을 중앙 정렬합니다. 전체 표나 페이지의 다른 요소를 중앙 정렬하려면 마크다운 텍스트 중앙 정렬 가이드[^17]를 참조하세요.

[^17]: https://macmdviewer.com/blog/markdown-center-text


## How Do You Write Blockquotes in Markdown?
블록 인용문은 줄의 시작 부분에 `>` 문자를 사용합니다:

```
> 이것은 블록 인용문입니다.
> 여러 줄에 걸쳐 작성할 수 있습니다.
```

### 중첩된 블록 인용문

```
> 1단계
>> 2단계
>>> 3단계
```

### 다른 요소가 포함된 블록 인용문
블록 인용문에는 단락, 목록, 코드 블록, 제목 등 다른 마크다운 요소를 포함할 수 있습니다:

```
> #### 블록 인용문 내의 제목
>
> - 목록 항목 1
> - 목록 항목 2
>
> `code`도 여기서 작동합니다.
```

이는 문서에 강조 표시, 경고, 출처 표기 블록에서 유용합니다.

## 마크다운의 수평선이란?
한 줄에 하이픈, 별표, 밑줄을 3개 이상 단독 배치하면 수평선(`<hr>`)이 생성됩니다:

```
---
***
___
```

세 가지 모두 동일한 결과를 출력합니다. 하이픈(`---`)을 사용하는 것이 가장 일반적인 관례입니다. 파서가 하이픈을 Setext 제목의 밑줄로 해석하지 않도록 항상 위아래에 빈 줄을 추가해야 합니다.


## How Do You Add Line Breaks in Markdown?
줄 바꿈은 마크다운 구문에서 가장 까다로운 부분 중 하나이며, 코드 검토 시 가장 많은 혼란을 일으키는 부분입니다. 소스 텍스트에서 한 줄의 줄바꿈만으로는 `<br>` 태그가 생성되지 않으며, 동일한 단락으로 이어집니다. 줄 바꿈을 강제하는 방법은 네 가지가 있으며, 마크다운 줄 바꿈 가이드[^18]에서 모든 방법을 자세히 다룹니다.

[^18]: https://macmdviewer.com/blog/markdown-line-break

### 줄 끝 공백
줄 끝에 공백 두 개를 추가합니다:

```
첫 번째 줄··
두 번째 줄
```

(여기서 `··` 는 공백 두 개를 의미합니다.)

### 백슬래시

```
첫 번째 줄\
두 번째 줄
```

백슬래시는 소스 텍스트에서 좀 더 눈에 띄며, 현대적인 마크다운에서 권장하는 방식입니다.

### HTML 줄바꿈 태그

```
첫 번째 줄<br>두 번째 줄
```

이 방법은 항상 작동하지만, 마크다운 소스 텍스트에 HTML이 섞이게 됩니다.

### 빈 줄(새 단락)

```
첫 번째 단락.

두 번째 단락.
```

빈 줄은 새로운 `<p>` 태그를 생성하며, 이는 `<br>` 태그보다 좀 더 많은 수직 공간을 추가합니다.


## What Extended Syntax Belongs on a Markdown Cheat Sheet?
핵심 CommonMark 사양을 넘어, 널리 채택된 여러 확장 기능이 현대적인 문서 작성에 필수적인 기능을 추가합니다. 이런 기능들은 GitHub Flavored Markdown, Obsidian 및 대부분의 최신 편집기에서 지원됩니다. 실제 .md 파일에서 끊임없이 등장하므로, 완벽한 마크다운 치트 시트라면 반드시 이를 포함해야 합니다.

> [!NOTE]
> **핵심 사실**: GitHub는 2021년에 각주 지원 기능을, 2022년 5월에 수학식 렌더링 기능을, 2022년 2월에 Mermaid 다이어그램 렌더링 기능을 추가했습니다(GitHub 블로그, 2022[^19]). 이 세 가지 확장 기능은 외부 도구 없이도 단일 .md 파일에서 표현할 수 있는 범위를 획기적으로 넓혀줍니다.

[^19]: https://github.blog/changelog/2022-05-19-render-mathematical-expressions-in-markdown/

### 각주

```
다음은 각주가 포함된 문장입니다.[^1]

[^1]: 이것은 각주 내용입니다.
```

각주는 문서 하단에 링크된 참조 섹션과 함께 위첨자 숫자 형태로 렌더링됩니다. GitHub(2021년부터), Obsidian, Jekyll, Hugo 및 기타 정적 사이트 생성기에서 지원됩니다. 여러 단락으로 구성된 각주나 중첩된 내용을 포함한 고급 각주 패턴은 마크다운 각주 가이드[^20]를 참조합니다.

[^20]: https://macmdviewer.com/blog/markdown-footnotes-guide


### 정의 목록

```
용어
: 용어의 정의.

다른 용어
: 해당 용어의 정의.
```

정의 목록은 PHP Markdown Extra, Pandoc 및 일부 정적 사이트 생성기에서 지원되지만, GFM이나 핵심 CommonMark는 지원하지 않습니다!!

### 강조 표시/마크

```
==강조된 텍스트==
```

`<mark>강조된 텍스트</mark>` 로 렌더링됩니다. Obsidian 및 일부 마크다운 편집기에서 지원됩니다. GFM은 지원하지 않습니다!! 플랫폼별 지원 현황은 마크다운 하이라이트[^21]를 참조합니다.

[^21]: https://macmdviewer.com/blog/markdown-highlight-text

### 아래첨자 및 위첨자

```
H~2~O (아래첨자)
X^2^ (위첨자)
```

지원은 제한적입니다. Pandoc 및 일부 편집기에서 작동합니다. 좀 더 넓은 호환성을 원한다면 다음과 같은 HTML을 사용합니다: `H<sub>2</sub>O` 및 `X<sup>2</sup>`. 캡션이나 면책 조항에 마크다운 작은 글씨[^22]를 표시할 때도 이와 동일한 태그를 사용합니다.

[^22]: https://macmdviewer.com/blog/markdown-small-text


### 수학 방정식(LaTeX)
인라인 수학식 표현은 달러 기호 하나를, 블록 형태 수학시 표현은 달러 기호 두 개를 사용합니다:

```
인라인: $E = mc^2$

블록:
$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \ldots + x_n
$$
```

GitHub은 2022년 5월에 수학 표현 지원 기능을 추가했습니다(GitHub 블로그[^23], 2022). 전체 LaTeX-in-Markdown 구문은 마크다운 수학 방정식 가이드[^24]를 참조합니다.

[^23]: https://github.blog/changelog/2022-05-19-render-mathematical-expressions-in-markdown/
[^24]: https://macmdviewer.com/blog/markdown-math-equations

### Mermaid 다이어그램
GitHub은 코드 블록에 직접 Mermaid 다이어그램을 렌더링합니다:

```
'''mermaid
graph LR
    A[Start] --> B{Decision}
    B -->|Yes| C[Action]
    B -->|No| D[End]
'''
```

Mermaid는 흐름도, 시퀀스 다이어그램, 간트 차트, 클래스 다이어그램 등을 지원합니다. Mermaid 뷰어[^25]에서 다이어그램을 미리 보고 편집하거나, Mermaid to PNG 변환기[^26]로 이미지로 내보낼 수 있습니다.

[^25]: https://macmdviewer.com/tools/mermaid-viewer
[^26]: https://macmdviewer.com/tools/mermaid-to-png


## How Do You Use HTML Inside Markdown?
마크다운은 구문 자체로는 표현할 수 없는 모든 요소에 대해 인라인 HTML을 지원합니다. CommonMark 사양[^27] (6.6절)에는 원시 HTML 삽입에 대한 규칙이 정의되어 있습니다.

[^27]: https://spec.commonmark.org/0.31.2/

## 일반적인 HTML 사용 사례

```
<details>
<summary>확장하려면 클릭하세요</summary>

숨겨진 콘텐츠는 여기에 들어갑니다. 마크다운은 내부에서도 **정상적으로 작동**합니다.

</details>
```

```
<kbd>Ctrl</kbd> + <kbd>C</kbd>
```

```
<div align="center">
  <img src="logo.png" alt="Logo" width="200">
</div>
```

## 마크다운 내 HTML에 대한 규칙
- 블록 레벨 HTML(`<div>, <table>, <details>`)은 앞뒤에 빈 줄이 있어야 합니다.

- 블록 수준 HTML 내부의 마크다운 서식은 HTML 태그와 마크다운 콘텐츠 사이에 빈 줄이 있을 때만 작동합니다.

- 인라인 HTML(`<kbd>, <sup>, <sub>, <mark>, <br>`)은 텍스트 내 어디서나 사용할 수 있습니다.

- 보안을 중시하는 렌더러는 특정 HTML 태그(`<script>, <style>, <iframe>`)를 제거하거나 정제할 수 있습니다.

- HTML 주석(`<!-- -->`)을 사용하면 렌더링된 출력에서 텍스트를 숨길 수 있지만, 해당 텍스트는 페이지 소스에서는 계속 표시됩니다.


## Which Tools Complement This Markdown Cheat Sheet?
구문을 잘 아는 것도 중요하지만, 적절한 도구를 활용하면 마크다운 작성 속도가 훨씬 빨라집니다. 이 마크다운 치트 시트를 보완해 줄 무료 도구들을 소개합니다:

- 마크다운을 PDF로 변환[^27] — 서식과 코드 강조 표시를 그대로 유지한 채 모든 .md 파일을 깔끔한 PDF 문서로 변환합니다.

- 마크다운을 HTML로 변환[^28] — 웹 게시를 위해 마크다운 표준을 준수하는 HTML로 변환합니다.

- HTML을 마크다운으로 변환[^29] — HTML 페이지를 마크다운 소스 코드로 다시 변환합니다.

- CSV to Markdown[^30] — 스프레드시트 데이터를 올바른 형식의 마크다운 표로 변환합니다.

- PDF to Markdown[^31] — PDF 파일의 내용을 추출해서 편집 가능한 마크다운으로 변환합니다.

- YAML Formatter[^32] — 정적 사이트 생성기에 사용되는 YAML 프론트매터를 유효성 검사하고 서식 지정합니다.

- Markdown Table Generator[^33] — 파이프와 대시를 직접 입력하는 대신 시각적으로 표를 생성합니다.

- Mermaid Viewer[^34] — Mermaid 다이어그램을 적용하기 전에 미리 보거나 디버깅합니다.

- Mermaid에서 PNG[^35] — Mermaid 다이어그램을 렌더링하지 않는 플랫폼을 위해 PNG 이미지로 내보냅니다.

[^27]: https://macmdviewer.com/tools/markdown-to-pdf
[^28]: https://macmdviewer.com/tools/markdown-to-html
[^29]: https://macmdviewer.com/tools/html-to-markdown
[^30]: https://macmdviewer.com/tools/csv-to-markdown
[^31]: https://macmdviewer.com/tools/pdf-to-markdown
[^32]: https://macmdviewer.com/tools/yaml-formatter
[^33]: https://macmdviewer.com/tools/markdown-table-generator
[^34]: https://macmdviewer.com/tools/mermaid-viewer
[^35]: https://macmdviewer.com/tools/mermaid-to-png

macOS에서 마크다운을 작성하고 미리보기 위해, MacMD 뷰어는 실시간 미리 보기, 스크롤 동기화 사이드바, 구문 강조, Mermaid 다이어그램 지원 및 네이티브 macOS 환경을 제공하며 .md 파일을 렌더링합니다. .md 파일을 여는 것이 처음이신가요? MD 파일 여는 방법부터 시작해 보시기 바랍니다. macOS용 마크다운 뷰어 비교에서 이 제품의 성능을 직접 확인해 보시기 바랍니다.


## Quick Reference Table
이 요약된 마크다운 참고표는 빠른 조회를 위해 모든 구문 요소를 다루고 있습니다:

| Element | Syntax | Notes |
| --- | --- --- |
| Heading 1	 | `# Text` | Always add a space after # |
| Heading 2	 | `## Text` | Up to six levels (######) |
| Bold | 	`**text**` | Prefer `**` over `__` |
| Italic | 	`*text*` | Prefer * over _ |
| Bold + Italic | `***text***` | Triple asterisks |
| Strikethrough | `~~text~~` | GFM extension |
| Link | `[text](url)` | Optional title in quotes |
| Image | `![alt](url)` | No native sizing — use HTML |
| Inline code | 'code' | Double backticks for nested |
| Code block | 	'''lang | Add language for highlighting |
| Blockquote | 	`> text` | Nest with >> |
| Unordered list | `- item` | Also * or + |
| Ordered list | `1. item` | Starting number matters |
| Task list | `- [ ] item` | GFM extension |
| Table | `| H | H |` | GFM extension |
| Horizontal rule | `---` | Also `***` or `___` |
| Line break | two spaces or `\` | End of line |
| Footnote | `[^1]` | GFM since 2021 |
| Math (inline) | `$formula$` | LaTeX syntax |
| Math (block) | `$$formula$$` | LaTeX syntax |
| Highlight | `==text==` | Limited support |
| HTML | `<tag>` | Inline or block-level |


## Frequently Asked Questions

### CommonMark와 GFM의 차이점은 무엇인가요?
CommonMark는 제목, 강조, 링크, 이미지, 코드, 목록, 인용문 등 마크다운의 핵심 구문을 정의하는 기본 사양입니다. [CommonMark 사양](https://spec.commonmark.org/0.31.2/) (버전 0.31.2, 2024)에는 일관된 구문 분석을 보장하기 위한 600개 이상의 테스트 케이스가 포함되어 있습니다. GitHub Flavored Markdown(GFM)은 표, 작업 목록, 취소선, 자동 링크, 각주를 추가한 CommonMark의 엄격한 상위 집합입니다. 문서가 CommonMark에서 작동한다면 GFM에서도 작동하지만, 그 반대의 경우는 반드시 그렇지는 않습니다. GFM 사양 기능과 GitHub의 독점 렌더러 확장 기능에 대한 자세한 비교는 [GitHub 마크다운 가이드](https://macmdviewer.com/blog/github-markdown-guide)를 참조합니다.

### 어떤 마크다운 구문이 모든 플랫폼에서 작동하나요?
핵심 CommonMark 구문은 보편적으로 지원됩니다: 제목, 굵게, 기울임꼴, 링크, 이미지, 코드 스팬, 펜스 코드 블록, 블록 인용, 순서 있는 목록, 순서 없는 목록, 수평선. 표, 작업 목록, 취소선, 각주, 수학 식과 같은 확장 기능은 렌더러에 따라 다릅니다. 확실치 않은 경우 CommonMark를 고수하고 [Markdown-to-HTML 변환기](https://macmdviewer.com/tools/markdown-to-html)를 사용해서 테스트합니다.

### 게시하기 전에 마크다운을 어떻게 미리 볼 수 있나요?
대부분의 코드 편집기(VS Code, Sublime Text, IntelliJ)에는 마크다운 미리보기 기능이 내장되어 있습니다. macOS 전용 환경을 원한다면, [MacMD Viewer](https://macmdviewer.com/pricing)를 사용하면 구문 강조, Mermaid 다이어그램, 스크롤에 연동되는 목차 기능을 갖춘 실시간 렌더링을 이용할 수 있습니다. 또한, 별도의 설치 없이 온라인 마크다운-HTML 변환 도구를 사용해서 빠르게 미리 볼 수 있습니다.

### Slack, Discord 및 기타 채팅 앱에서 마크다운을 사용할 수 있나요?
Slack은 외관상 비슷해 보이지만 핵심적인 부분에서 차이가 있는 자체 `mrkdwn` 구문을 사용합니다. 전체 구문은 [Slack 마크다운 가이드](https://macmdviewer.com/blog/markdown-in-slack)를 참조합니다. Discord는 표준 마크다운의 일부와 몇 가지 고유 기능을 지원합니다. 자세한 내용은 [Discord 마크다운 가이드](https://macmdviewer.com/blog/discord-markdown-formatting)를 참조합니다. 두 플랫폼 모두 `**굵게**` 와 `*이탤릭체*` 를 사용하지만, 코드 블록, 링크, 목록은 표준 마크다운과 다르게 작동합니다.

### 마크다운과 다른 형식 간 변환은 어떻게 하나요?
신뢰할 수 있는 형식 변환을 위해 전용 변환기를 사용합니다. 인쇄용 문서의 경우 ‘[마크다운에서 PDF](https://macmdviewer.com/tools/markdown-to-pdf)’, 웹 콘텐츠 변환의 경우 ‘[HTML에서 마크다운](https://macmdviewer.com/tools/html-to-markdown)’, 스프레드시트 데이터의 경우 ‘[CSV에서 마크다운](https://macmdviewer.com/tools/csv-to-markdown)’, PDF에서 텍스트를 추출할 때는 ‘[PDF에서 마크다운](https://macmdviewer.com/tools/pdf-to-markdown)으로’ 변환할 수 있습니다. 위키 플랫폼에서 마이그레이션할 때는 ‘[Confluence에서 마크다운](https://macmdviewer.com/blog/confluence-to-markdown)’ 가이드에서 검증된 5가지 내보내기 방법을 확인할 수 있습니다.

