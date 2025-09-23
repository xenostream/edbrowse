# Preface
이 책은 **정규 표현식** (regular expression)의 특징을 예제를 통해서 하나씩 설명하는 방식으로 진행합니다. 각 예제를 직접 타이핑하고 실험해보는 것이 좋습니다. 예제 입력과 제시한 해결 방법을 이해하려고 노력하고, 입력이나 코드 일부를 변경했을 때, 출력이 어떻게 변하는지 직접 확인해보시기 바랍니다. 이것은 자동차 운전 배우기에 비유할 수 있는데, 아무리 읽고 듣더라도 실제 경험이 없는 한, 숙련되기 어렵다는 점에서 유사합니다. 스크립팅과 자동화 작업은 입력 데이터에서 텍스트의 특정 부분을 "추출" 하거나, 한 형식에서 다른 형식으로 변환할 경우가 자주 있습니다. 이 책은 각종 텍스트 처리를 위한 미니 프로그래밍 언어인 "정규 표현식" 을 이해하는 데 도움을 줄 수 있습니다.

이 책은 정규 표현식의 기능을 하나씩 소개하기 위해 예제에 크게 의존합니다. 각 예제를 직접 타이핑하고 직접 실험해 볼 것을 권장합니다. 제시한 해법뿐 아니라, 샘플 입력을 이해하도록 노력하고, 입력이나 코드의 일부를 바꿀 때, 출력이 변하는지(혹은 변하지 않는지!) 확인해 보시기 바랍니다. 비유를 들면, 자동차 운전을 배우는 것을 생각해 보세요 — 그것들에 대해 아무리 많이 읽거나 설명을 들어도, 숙련되려면 실습 경험이 필요합니다.

## Prerequisites
먼저, 프로그래밍 기초에 익숙해야 합니다. 또한, JavaScript 문법과 `map`, `filter` 같은 함수형 프로그래밍 개념에 대한 실무 지식을 갖추고 있어야 합니다.  

또한, 도움말 읽는 것, 온라인 검색하기, 추가 학습을 위해 제공된 외부 링크 방문하기, 예제를 직접 만져 보면서 실험하기, 막혔을 때 도움을 요청하기 등에도 익숙해지는 것도 기대됩니다. 다시 말해, 단순히 수동적으로 내용을 소비하는 대신, 적극적이고 호기심을 가지고 학습에 임해야 합니다.

## Conventions
- 여기서 제시한 예제는 Chrome/Chromium 콘솔(F12)에서 테스트되었으며, 다른 브라우저나 플랫폼에서는 사용할 수 없는 기능들을 포함할 수 있습니다.  

- 코드 조각은 콘솔에서 복사·붙여넣기 한 뒤, 설명을 위해 수정한 것입니다. 일부 명령어 앞에는 맥락과 설명을 제공하기 위해 주석이 붙어 있습니다. 가독성을 높이기 위해 빈 줄을 추가했으며, 출력이 `undefined` 이거나 굳이 보여줄 필요가 없을 경우는 생략했습니다.  

- 별도의 언급이 없는 한, 모든 예제와 설명은 ASCII 문자 기준으로 작성되었습니다.

- 책 전반에 걸쳐 특정 주제를 더 깊이 탐구할 수 있도록 외부 링크가 제공됩니다.
  
- `learn_js_regexp` 저장소에는 이 책과 관련된 모든 코드 조각, 연습 문제, 기타 세부 사항이 담겨 있습니다. 만약 `git` 명령어에 익숙하지 않다면, 웹페이지에서 **Code** 버튼을 클릭해서 파일을 받을 수 있습니다.

## Acknowledgements
- **[MDN: 정규 표현식 — 문서와 예제](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions)**  
- **[/r/learnjavascript/](https://old.reddit.com/r/learnjavascript/)** 와 **[/r/regex/](https://old.reddit.com/r/regex/)** — 초보자와 숙련된 프로그래머 모두에게 유용한 포럼  
- **[stackoverflow](https://stackoverflow.com/)** — JavaScript와 정규 표현식에 관한 적절한 질문에 대한 답변을 얻기 위해  
- **[tex.stackexchange](https://tex.stackexchange.com/)** — pandoc 및 tex 관련 질문에 대한 도움을 위해  
- **[canva](https://www.canva.com/)** — 표지 이미지  
- **[Amada44](https://commons.wikimedia.org/wiki/User:Amada44)의 [Warning](https://commons.wikimedia.org/wiki/File:Warning_icon.svg) 및 [Info](https://commons.wikimedia.org/wiki/File:Info_icon_002.svg) 아이콘 — 퍼블릭 도메인 하에 제공됨**  
- **[oxipng](https://github.com/shssoichiro/oxipng), [pngquant](https://pngquant.org/) 및 [svgcleaner](https://github.com/RazrFalcon/svgcleaner)** — 이미지 최적화  
- **[mdBook](https://github.com/rust-lang/mdBook)** — 현재 읽고 있는 책의 웹 버전  
- **[mdBook-pagetoc](https://github.com/JorelAli/mdBook-pagetoc)** — 각 장의 목차를 추가하기 위해  
- **[minify-html](https://github.com/wilsonzlin/minify-html)** — html 파일을 최소화하기 위해  

## Feedback and Errata
이 책에 대해 어떻게 느꼈는지 알려주시면 대단히 감사하겠습니다. 간단한 감사 인사부터 오탈자 지적, 코드 조각의 실수, 이 책의 어떤 측면이 당신에게 효과적이었는지(혹은 그렇지 않았는지) 등에 이르기까지 무엇이든 좋습니다. 독자 피드백은 필수적이며, 특히 자가 출판 저자에게는 더욱 그렇습니다.

다음 방법으로 연락하실 수 있습니다:

Issue Manager: [https://github.com/learnbyexample/learn_js_regexp/issues](https://github.com/learnbyexample/learn_js_regexp/issues)  
E-mail: learnbyexample.net@gmail.com  
Twitter: [https://twitter.com/learn_byexample](https://twitter.com/learn_byexample)

## Author info
**Sundeep Agarwal** 은 최소한의 노력으로 소박한 생활을 유지하는 것을 선호하는 게으른 존재입니다. 그는 Analog Devices에서 설계 엔지니어로 일하며 막대한 부를 축적했고, 스물여덟 살이라는 이른 나이에 기업에서 은퇴했습니다. 그러나, 몇 년 만에 저축을 탕진하고 생계를 위해 허둥대야 했습니다. 모든 역경을 딛고, 프로그래밍 전자책 판매가 그의 게으른 삶을 다시는 직장을 찾지 않아도 되도록 구해주었습니다. 이제 그는 원하는 판타지 전자책을 모두 살 수 있고, 인터넷을 탐색하는 데 지나치게 많은 시간을 보냅니다.  

창작의 영감이 떠오를 때면 그는 또 다른 프로그래밍 전자책을 집필하는데, 그 책에는 어김없이 **정규 표현식** 예제가 최소 하나는 포함됩니다. 전자책 자료 조사와 일상적인 소셜 미디어 사용으로 북마크가 넘쳐나자, 그는 정신 건강을 위해 큐레이션된 자료 목록을 따로 관리합니다. 그는 무료 학습 자료와 오픈 소스 도구에 감사하며, 그의 기여물은 [GitHub 저장소](https://github.com/learnbyexample)에서 확인할 수 있습니다.  

그가 집필한 프로그래밍 전자책 목록은 [이 페이지](https://learnbyexample.github.io/books/)에서 볼 수 있습니다.

---

# Why is it needed?
정규 표현식은 텍스트 처리를 위한 다재다능한 도구입니다. 스크립트 목적에 사용되는 대부분의 프로그래밍 언어의 표준 라이브러리에 포함되어 있으며, 그렇지 않은 경우, 보통 서드파티 라이브러리로 찾을 수 있습니다. 정규 표현식의 문법과 기능은 각 언어마다 다릅니다. JavaScript의 문법은 Perl 언어와 유사하지만, 기능 면에서 상당한 차이가 있습니다.  

JavaScript의 String 객체는 텍스트를 다루기 위한 다양한 메서드를 지원합니다. 그렇다면, 정규 표현식은 무엇이 특별하며 왜 필요할까요? 학습과 이해의 관점에서 정규 표현식은 텍스트 처리에 특화된 **미니 프로그래밍 언어** 로 볼 수 있습니다. 정규 표현식의 일부를 변수처럼 저장해서 나중에 재사용할 수 있습니다. AND, OR, NOT 조건을 수행하는 방법도 있으며, 범위, 반복 등과 유사한 연산도 처리 가능합니다.  

다음은 몇 가지 일반적인 사용 사례입니다:  

- 문자열이 정해진 규칙 집합을 만족하는지 확인하기 위해 문자열을 정제하기. 예: 주어진 문자열이 비밀번호 규칙에 맞는지 확인  

- 알파벳, 숫자, 구두점 같은 추상적 수준에서 텍스트를 필터링하거나 추출하기  

- 조건부 문자열 치환. 예: 문자열 시작이나 끝에서, 전체 단어만, 주변 텍스트에 따라 치환하기 등.  

아마 LibreOffice Writer 프로그램의 스크린샷 같은 그래픽 기반의 검색 및 치환 도구에는 익숙할 것입니다. **대소문자 구분(Match case)**, **전체 단어만(Whole words only)**, **바꾸기(Replace)**, **모두 바꾸기(Replace All)** 등이 정규 표현식이 지원하는 기본 기능 중 일부입니다.  

여기서 언급된 정규 표현식 관련 글들을 정리합니다. 각 링크는 정규 표현식의 역사, 활용 범위, 그리고 주의할 점들을 다루고 있습니다.  

- 📖 **[The true power of regular expressions](https://www.npopov.com/2012/06/15/The-true-power-of-regular-expressions.html)** — 정규 표현식이 “regular” 하다는 의미를 형식 언어 이론의 맥락에서 설명하며, 실제 구현체가 얼마나 강력한지 보여줍니다.  
- 💬 **[Is it a must for every programmer to learn regular expressions?](https://stackoverflow.com/questions/887107/are-regular-expressions-a-must-for-programming)** — 모든 프로그래머가 반드시 정규 표현식을 배워야 하는지에 대한 토론입니다. 기본 정도는 알아두는 것이 좋다는 의견이 많습니다.  
- ⚠️ **[When you should NOT use Regular Expressions?](https://stackoverflow.com/questions/7553722/when-should-i-not-use-regular-expressions)** — HTML, XML 같은 재귀적 구조를 파싱할 때처럼 정규 표현식을 쓰면 안 되는 상황들을 다룹니다. 이미 더 적합한 파서가 있는 경우도 포함됩니다.  
- 😅 **[Now You Have Two Problems](https://blog.codinghorror.com/regular-expressions-now-you-have-two-problems/)** — “정규 표현식을 쓰면 문제가 두 개가 된다” 는 유명한 밈의 기원을 풀어주며, 남용이 문제인 것이지 정규 표현식 자체는 강력한 도구임을 설명합니다.  
- 🌐 **[Regular expression — Wikipedia](https://en.wikipedia.org/wiki/Regular_expression)** — 정규 표현식의 역사, 이론적 배경(정규 언어), 다양한 구현체와 문법 차이를 폭넓게 다룹니다.  

👉 요약하면, 정규 표현식은 비밀번호 검증 같은 실제 사례에도 매우 유용하지만, 모든 문제에 무조건 적용할 수 있는 만능 도구는 아닙니다. 특히 복잡한 구조적인 데이터를 다룰 때는 적절한 도구를 선택하는 것이 중요하다는 점을 여러 글에서 강조하고 있습니다.  

## How this book is organized
이 책은 개념을 하나씩 차례대로 소개하며, 각 장 끝의 연습 문제는 그 장에서 다룬 기능만을 사용합니다. 각 개념에는 다양한 문제와 예외적인 경우를 다루는 풍부한 예제가 함께 제공됩니다. 앞서 언급했듯이, 예제를 따라가면서 코드 조각을 직접 타이핑하는 것을 강력히 권장합니다. 샘플 입력 문자열의 특성과 실제 사용된 프로그래밍 명령어를 모두 이해하는 것이 중요합니다.  

또한, 두 개의 간주(Interlude) 장에서는 유용한 도구들을 개괄적으로 소개하며, 마지막 장에는 추가 자료들이 정리되어 있습니다.  

이 책에서 다루는 목차는 다음과 같습니다:  

- **RegExp introduction**  
- **Anchors**  
- **Alternation and Grouping**  
- **Escaping metacharacters**  
- **Dot metacharacter and Quantifiers**  
- **Interlude: Tools for debugging and visualization**  
- **Working with matched portions**  
- **Character class**  
- **Groupings and backreferences**  
- **Interlude: Common tasks**  
- **Lookarounds**  
- **Unicode**  
- **Further Reading**  

이 책을 마칠 즈음에는 정규 표현식을 작성하고 읽는 데 익숙해지고, 그것들을 디버깅하는 방법과 피해야 할 상황을 알게 될 것입니다.


---

# RegExp introduction
이 장에는 **RegExp 객체를 정의하고, 문자열 메서드 안에서 사용하는 방법** 을 시작합니다. 단순하게 만들기 위해, 예제는 정규 표현식과 관련된 특수 문자를 사용하지 않습니다. 주요 초점은 문법과 텍스트 처리 예제에 익숙해지는 데 있습니다.  

이 장에는 두 가지 메서드를 사용합니다:  
- **`test()` 메서드** — 입력에 특정 문자열이 포함되어 있는지 검색합니다.  

- **`replace()` 메서드** — 입력의 일부를 다른 것으로 대체합니다.  

> [!INFORMATION]
> ℹ️ 이 책에서는 **regular expressions** 와 **regexp** 라는 용어를 서로 바꿔 사용합니다. 다만, JavaScript 객체를 특별히 지칭할 때는 **RegExp** 라는 표기를 사용합니다.

























  
