# Preface

이 책은 정규 표현식(*regular expression*)의 특징을 예제를 통해 하나씩 설명하는 방식으로 진행합니다. 따라서, 각 예제를 직접 타이핑하고 실험해 보는 것이 좋습니다. 예제 입력과 제시한 해결 방법을 정확히 이해하도록 노력하고 입력이나 코드 일부를 변경했을 때 출력이 어떻게 변하는지 직접 확인하시기 바랍니다. 이것은 자동차 운전 배우기에 비유할 수 있는데 아무리 읽고 듣더라도 실제 경험이 없는 한 숙련하기는 어렵다는 점에서 유사합니다. 

스크립팅(*scripting*)과 자동화(*automation*) 작업은 입력 데이터의 특정 부분을 "추출" 하거나 한 형식에서 다른 형식으로 변환할 경우가 자주 있습니다. 이 책은 각종 텍스트 처리를 위한 미니 프로그래밍 언어인 "정규 표현식" 을 이해하는 데 도움을 줄 수 있습니다.

이 책은 정규 표현식의 기능을 하나씩 소개할 때 예제에 크게 의존합니다. 각 예제를 직접 타이핑하고 실험할 것을 강력히 권장합니다. 제시한 해법뿐만 아니라 예제를 이해하도록 노력하고 입력이나 코드의 일부를 바꿀 때 출력이 어떻게 변하는지(혹은 변하지 않는지!) 확인합니다. 비유를 들면, 자동차 운전을 배우는 것을 생각합니다 — 그것에 대해 아무리 많이 읽거나 설명을 들어도 숙련되려면 실습 경험이 필요합니다.


## Prerequisites

먼저, 프로그래밍 기초에 익숙해야 합니다. 또한, JavaScript 문법과 `map`, `filter` 같은 함수형 프로그래밍 개념에 대한 실무 지식도 갖춰야 합니다.  

또한, 도움말 읽는 것, 온라인 검색하기, 추가 학습을 위해 제공된 외부 링크 방문하기, 예제를 직접 만들고 실험하기, 문제에 막혔을 때 도움 요청하기 등에 익숙해지는 것도 기대됩니다. 다시 말해, 단순히 수동적으로 내용을 소비하는 대신 적극적이고 호기심을 가지고 학습에 임해야 합니다.


## Conventions

- 여기서 제시한 예제는 Chrome/Chromium 콘솔(<kbd>F12</kbd> 또는 <kbd>Ctrl + Shift + J</kbd>)에서 테스트했으며 다른 브라우저나 플랫폼에서 사용할 수 없는 기능을 포함할 수도 있습니다.  

- 코드 조각은 콘솔에 복사·붙여넣기한 뒤 설명을 위해 수정한 것입니다. 일부 명령어 앞에는 맥락과 설명을 위한 주석이 있습니다. 가독성을 높이기 위해 빈 줄을 추가했으며 출력이 `undefined` 이거나 굳이 보여줄 필요가 없을 경우 생략했습니다.  

- 별도의 언급이 없는 한 모든 예제와 설명은 ASCII 문자 기준으로 작성됩니다.

- 책 전반에 걸쳐 특정 주제를 좀 더 깊이 탐구할 수 있는 외부 링크가 제공됩니다.
  
- `learn_js_regexp` 저장소는 모든 코드 조각, 연습 문제, 기타 세부 사항이 담겨 있습니다. 만약 `git` 명령어에 익숙치 않다면 저장소에서 **Code** 버튼을 클릭해서 파일을 받을 수 있습니다.

## Acknowledgements
- [MDN: 정규 표현식 — 문서와 예제](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions)  
- [/r/learnjavascript/](https://old.reddit.com/r/learnjavascript/) 와 [/r/regex/](https://old.reddit.com/r/regex/) — 초보자와 숙련된 프로그래머 모두에게 유용한 포럼  
- [stackoverflow](https://stackoverflow.com/) — JavaScript와 정규 표현식에 관한 적절한 질문에 대한 답변을 얻기 위해  
- [tex.stackexchange](https://tex.stackexchange.com/) — pandoc 및 tex 관련 질문에 대한 도움을 위해  
- [canva](https://www.canva.com/) — 표지 이미지  
- [Amada44](https://commons.wikimedia.org/wiki/User:Amada44) 의 [Warning](https://commons.wikimedia.org/wiki/File:Warning_icon.svg) 및 [Info](https://commons.wikimedia.org/wiki/File:Info_icon_002.svg) 아이콘 — 퍼블릭 도메인 하에 제공됨  
- [oxipng](https://github.com/shssoichiro/oxipng), [pngquant](https://pngquant.org/) 및 [svgcleaner](https://github.com/RazrFalcon/svgcleaner) — 이미지 최적화  
- [mdBook](https://github.com/rust-lang/mdBook) — 현재 읽고 있는 책의 웹 버전  
  - [mdBook-pagetoc](https://github.com/JorelAli/mdBook-pagetoc) — 각 장의 목차를 추가하기 위해  
  - [minify-html](https://github.com/wilsonzlin/minify-html) — html 파일을 최소화하기 위해  

## Feedback and Errata
이 책에 대해 어떻게 느꼈는지 알려주시면 대단히 감사하겠습니다. 간단한 감사 인사부터 오탈자 지적, 코드 조각의 실수, 이 책의 어떤 측면이 당신에게 효과적인지(혹은 그렇지 않은지) 등에 이르기까지 무엇이든 좋습니다. 독자의 피드백은 필수이며 특히 자가 출판 저자는 더 더욱 그렇습니다.

다음 방법으로 저에게 연락하실 수 있습니다:

Issue Manager: [https://github.com/learnbyexample/learn_js_regexp/issues](https://github.com/learnbyexample/learn_js_regexp/issues)  
E-mail: learnbyexample.net@gmail.com  
Twitter: [https://twitter.com/learn_byexample](https://twitter.com/learn_byexample)

## Author info
*Sundeep Agarwal* 은 최소한의 노력으로 소박한 생활을 유지하는 것을 선호하는 아주 게으른 존재입니다. 그는 Analog Devices에서 설계 엔지니어로 일하며 막대한 부를 축적했고 스물 여덟 살이라는 이른 나이에 기업에서 은퇴했습니다. 그러나, 몇 년만에 저축을 탕진하고 생계를 위해 허둥대야 했습니다. 모든 역경을 딛고 프로그래밍 전자책 판매가 그의 게으른 삶을 다시는 직장을 찾지 않도록 구해주었습니다. 이제 그는 원하는 판타지 전자책을 모두 살 수 있고 인터넷을 탐색하는 데 지나치게 많은 시간을 보냅니다.  

창작 영감이 떠오를 때면 그는 또 다른 프로그래밍 전자책을 집필하는데 그 책에는 어김없이 정규 표현식 예제가 최소 하나는 포함됩니다. 전자책 자료 조사와 일상적인 소셜 미디어 사용으로 북마크가 넘쳐나자 그는 정신 건강을 위해 큐레이션된 자료 목록을 별도로 관리합니다. 그는 무료 학습 자료와 오픈 소스 도구에 항상 감사하며 그의 기여물은 [GitHub 저장소](https://github.com/learnbyexample)에서 확인할 수 있습니다.  

그가 집필한 프로그래밍 전자책 목록은 [이 페이지](https://learnbyexample.github.io/books/)에서 볼 수 있습니다.

---

# Why is it needed?
정규 표현식은 텍스트 처리를 위한 다재다능한 도구입니다. 스크립팅 목적으로 사용하는 대부분의 프로그래밍 언어의 표준 라이브러리에 포함되며 그렇지 않은 경우는 서드파티 라이브러리 형태로 찾을 수 있습니다. 정규 표현식의 문법과 기능은 언어마다 다를 수 있습니다. JavaScript 언어의 문법은 Perl 언어와 유사하지만 기능 면에서 상당한 차이가 있습니다.  

JavaScript 언어의 `String` 객체는 텍스트를 다루기 위한 다양한 메서드를 지원합니다. 그렇다면, 정규 표현식은 무엇이 그렇게 특별하며 왜 필요할까요? 학습과 이해의 관점에서 정규 표현식은 텍스트 처리에 특화된 미니 프로그래밍 언어로 볼 수 있습니다. 정규 표현식의 일부를 변수처럼 저장해서 나중에 재사용할 수 있습니다.(부분 문자열과 역참조) AND, OR, NOT 조건을 수행하는 방법도 있으며 범위, 반복 등과 유사한 연산도 처리 가능합니다.  

다음은 몇 가지 일반적인 사용 사례입니다:  

- 문자열이 정해진 규칙 집합을 만족하는지 확인하기 위해 문자열 정제하기 (예: 문자열이 비밀번호 규칙에 맞는지 확인)  
- 알파벳, 숫자, 구두점 같은 추상적인 수준으로 텍스트를 "필터링" 하거나 "추출" 하기  
- 조건부 문자열 치환 (예: 문자열 시작이나 끝에서, 전체 단어만, 주변 텍스트에 따라 치환하기 등)  

아마 그래픽 기반의 LibreOffice Writer 프로그램의 검색 및 치환 도구에 익숙할 겁니다. 대소문자 구분(Match case), 전체 단어만(Whole words only), 바꾸기(Replace), 모두 바꾸기(Replace All) 등이 정규 표현식이 지원하는 기본 기능 중 일부입니다.  

여기서 언급된 정규 표현식 관련 글들을 정리합니다. 각 링크는 정규 표현식의 역사, 활용 범위 그리고 주의할 점을 다루고 있습니다.  

- 📖 [The true power of regular expressions](https://www.npopov.com/2012/06/15/The-true-power-of-regular-expressions.html) — 정규 표현식이 “regular” 하다는 의미를 형식 언어 이론 맥락에서 설명하며 실제 구현체가 얼마나 강력한지 잘 보여줍니다.  
- 💬 [Is it a must for every programmer to learn regular expressions?](https://stackoverflow.com/questions/887107/are-regular-expressions-a-must-for-programming) — 모든 프로그래머가 반드시 정규 표현식을 배워야 하는지에 대한 토론입니다. 기본 정도는 알아두는 것이 좋다는 의견이 많습니다.  
- ⚠️ [When you should NOT use Regular Expressions?](https://stackoverflow.com/questions/7553722/when-should-i-not-use-regular-expressions) — HTML, XML 같은 재귀적 구조를 파싱할 때처럼 정규 표현식을 쓰면 안되는 상황들을 다룹니다. 이미 좀 더 적합한 파서가 있는 경우도 포함됩니다.  
- 😅 [Now You Have Two Problems](https://blog.codinghorror.com/regular-expressions-now-you-have-two-problems/) — “정규 표현식을 쓰면 하나의 문제가 두 개가 된다!” 는 유명한 밈의 기원을 풀어주며 남용이 문제인 것이지 정규 표현식 자체는 강력한 도구임을 설명합니다.  
- 🌐 [Regular expression — Wikipedia](https://en.wikipedia.org/wiki/Regular_expression) — 정규 표현식의 역사, 이론적 배경(정규 언어), 다양한 구현체와 문법 차이를 폭넓게 다룹니다.  

요약하면, 정규 표현식은 비밀번호 검증 같은 것에 유용하지만 모든 문제에 무조건 적용할 수 있는 만능 도구는 아닙니다. 특히 복잡한 구조의 데이터를 다룰 때는 적절한 도구를 선택하는 것이 중요하다는 점을 여러 글에서 강조하고 있습니다.  


## How this book is organized

이 책은 개념을 하나씩 차례대로 소개하며 각 장 끝의 연습 문제는 그 장에서 다룬 기능만 사용합니다. 각 개념은 다양한 문제와 예외적인 경우를 다루는 풍부한 예제가 제공됩니다. 앞서 언급했듯이, 예제를 따라가면서 코드 조각을 직접 타이핑할 것을 강력히 권장합니다. 샘플 입력 문자열의 특성과 실제 사용된 프로그래밍 명령어 모두를 이해하는 것이 중요합니다.  

또한, 두 개의 간주(*Interlude*) 장은 유용한 도구를 개괄적으로 소개하며 마지막 장은 추가 자료들이 정리되어 있습니다.  

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

이 책을 마칠 즈음엔 정규 표현식을 작성하고 읽는 데 익숙해지고 디버깅 방법과 피해야할 상황까지 잘 알게 될 겁니다.


---

# RegExp introduction

이 장은 JavaScript 언어의 `RegExp` 객체를 정의하고 문자열 메서드로 사용하는 방법을 설명합니다. 예제는 단순하도록 정규 표현식 특수 문자를 사용하지 않습니다. 여기서 중요한 것은 "문법" 과 "텍스트 처리" 작업에 익숙해지는 것입니다.  

이번 장은 두 가지 메서드만 사용합니다:  

- `test()` 메서드 — 입력에 특정 문자열이 포함되어 있는지 검사합니다.  
- `replace()` 메서드 — 입력 문자열을 다른 문자열로 대체합니다.  

> [!NOTE]
> ℹ️ 이 책은 `regular expressions` 와 `regexp` 라는 용어를 혼용합니다. 다만, JavaScript 객체를 구체적으로 지칭할 때는 `RegExp` 표기법을 사용합니다.


## Console and documentation

서문에 언급했듯이 예제는 Chrome/Chromium 콘솔에서 테스트했습니다. Chromium 기반의 다른 브라우저도 작동합니다. 새로운 탭에서 <kbd>Ctrl+Shift+J</kbd> 단축키로 콘솔을 엽니다.[^1] 

[^1]: 일부 변수는 여러 장에서 재사용하므로 오류를 피하려면 다른 탭을 열고 사용합니다.  

예제, 도움말, 브라우저 호환성 관련 세부 사항은 [MDN: Regular Expressions Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) 및 [MDN: Regular Expressions Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions) 를 참조합니다.


## `test()` method
먼저, 문자열의 일부인지 테스트하는 간단한 예제부터 시작합니다. 보통 `String` 객체의 `includes()` 메서드를 사용하고 문자열을 인자로 전달합니다. 정규 표현식의 경우 검색 문자열을 `/.../` 구분자에 넣어 정의한 `RegExp` 객체의 `test()` 메서드를 사용합니다. 다음과 같습니다.  

```js
let sentence = 'This is a sample string'

// 'sentence' 변수가 주어진 문자열을 포함하는지 확인
sentence.includes('is')
// true
sentence.includes('z')
// false

// 'sentence'  변수가 RegExp 객체로 정의한 패턴과 일치하는지 확인
/is/.test(sentence)
// true
/z/.test(sentence)
// false
```

다음은 조건문으로 RegExp 클래스의 `test()` 메서드를 사용하는 몇 가지 예입니다.  

```js
let report = 'string theory'

if (/ring/.test(report)) {
    console.log('mission success')
}
// mission success

if (!/fire/.test(report)) {
    console.log('mission failed')
}
// mission failed
```

그리고 다음은 배열 처리 예제입니다.  

```js
let words = ['cat', 'attempt', 'tattle']

// 'tt' 를 포함하는 모든 요소 가져오기
words.filter(w => /tt/.test(w))
// ['attempt', 'tattle']

// 모든 요소가 'at' 을 포함하는지 확인
words.every(w => /at/.test(w))
// true

// 어떤 요소라도 'stat' 을 포함하는지 확인
words.some(w => /stat/.test(w))
// false
```


## Flags
JavaScript의 정규 표현식은 소문자를 사용하는 "플래그" (*flags*)로 기능을 활성화합니다. 플래그는 명령줄 옵션과 유사합니다. 예를 들어, `grep -i` 는 대소문자를 구분하지 않는 매칭 작업을 수행합니다.  

이번 장은 다음과 같은 플래그에 대해 설명합니다:  

- `i` 플래그(*ignore case*): 알파벳을 매칭할 때 대소문자를 무시함. (기본값은 대소문자를 구분하는 매칭)  
- `g` 플래그(*global*): 모든 발생을 매칭함. (기본적으로는 첫 번째만 매칭)  

다음은 `i` 플래그를 사용한 예입니다. `g` 플래그는 `replace()` 메서드에서 설명합니다.  

```js
/cat/.test('CaT')
// false
/cat/i.test('CaT')
// true

['Cat', 'cot', 'CATER', 'SCat', 'ScUtTLe'].filter(w => /cat/i.test(w))
// ['Cat', 'CATER', 'SCat']
```


## RegExp constructor and reuse
`RegExp` 객체를 변수에 저장할 수 있습니다. 이 방법은 코드의 명확성을 높이고 재사용 가능하다는 장점이 있습니다.  

```js
const pet = /dog/

pet.test('They bought a dog')
// true
pet.test('A cat crossed their path')
// false
```

`RegExp` 객체는 `RegExp()` 생성자로 만들 수 있습니다. 이 경우, 첫 번째 인자는 문자열 또는 `RegExp` 객체이고 두 번째 인자는 하나 이상의 플래그를 지정합니다.  

```js
const pat = new RegExp('dog')
pat
// /dog/

// 플래그가 필요하면, 두 번째 인자로 지정
new RegExp('dog', 'i')
// /dog/i
```

`/.../` 형식보다 생성자 형식의 장점은 "정규 표현식을 동적으로 구성할 수 있다!" 는 점입니다. 예를 들어, 변수나 표현식 결과를 삽입할 수 있습니다.  

```js
let greeting = 'hi'

const pat1 = new RegExp(`${greeting} there`)
pat1
// /hi there/

new RegExp(`${greeting.toUpperCase()} there`)
// /HI there/
```


## `replace()` method
`replace()` 메서드는 "검색 및 치환" 작업에 사용합니다.  

```js
// 첫 번째 일치 항목만 변경
'1,2,3,4'.replace(/,/, '-')
// '1-2,3,4'

// 'g' 플래그를 추가하면 모든 일치 항목 변경
'1,2,3,4'.replace(/,/g, '-')
// '1-2-3-4'

// 여러 플래그를 결합할 수 있음
'cArT PART tart mArt'.replace(/art/ig, '2')
// 'c2 P2 t2 m2'
```

**문자열은 불변(immutable)** 이란 점을 잊어 버리는 것이 가장 흔한 실수입니다!! 

따라서, 동일한 변수에 변경 사항을 다시 저장하려면 반드시 처리 결과를 변수에 **명시적으로 다시 할당** 해야 합니다.  

```js
let word = 'cater'

// 이 경우 문자열은 반환하지만 'word' 변수는 수정되지 않음
word.replace(/cat/, 'hack')
// 'hacker'
word
// 'cater'

// 'word' 변수를 변경하려면, 결과를 명시적으로 다시 변수에 할당해야 함
word = word.replace(/cat/, 'hack')
// 'hacker'
word
// 'hacker'
```

> [!WARNING]
> ⚠️ `test()` 메서드에 `g` 플래그를 사용할 수 있습니다. 사용 예제는 [MDN: test](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test#Examples) 문서를 참고합니다. 그러나, 제 생각에는 `test()` 메소드와 `g` 플래그를 사용하면 원치 않는 결과를 얻을 수도 있습니다. 대신, `match()` 메서드를 사용하고 필요한 로직을 명시적으로 작성할 것을 권장합니다.


## Cheatsheet and Summary

| Note                          | Description                                                                 |
|-------------------------------|-----------------------------------------------------------------------------|
| [MDN: Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions)      | JavaScript 정규 표현식에 대한 MDN 참고 문서                                |
| /pat/                         | RegExp 객체                                                                 |
| const p1 = /pat/              | 정규 표현식을 변수에 저장해서 재사용. 명확성을 위해 사용                      |
| /pat/.test(s)                 | 패턴이 입력 문자열 어딘가 존재하는지 확인                                 |
| returns true or false         | `true` 또는 `false` 반환                                                      |
| i                             | 알파벳을 매칭할 때 대소문자를 무시하는 플래그                               |
| g                             | 모든 발생을 매칭하는 플래그                                                 |
| new RegExp('pat', 'i')        | 문자열로 RegExp 객체 생성                                                  |
| optional second argument ...  | 두 번째 인자는 선택 사항으로 플래그 지정                                     |
| use backtick strings with ${} | 문자열 보간을 위한 `${}` 가 포함된 백틱 문자 사용                                 |
| s.replace(/pat/, 'repl')      | 검색 및 치환 메서드                                                  |

이번 장은 `RegExp` 객체를 정의하고 `test()` 및 `replace()` 메서드 사용법을 소개했습니다. 또한, 정규 표현식의 기본 동작을 변경하는 플래그 사용법도 배웠습니다. 예제는 텍스트 처리 개념을 소개하는 데 초점을 맞췄습니다. 다음 장부터 정규 표현식 문법과 기능에 대해 배웁니다.


## Exercises

> [!NOTE]
> 각 장의 연습 문제는 해당 장에서 설명한 내용으로 풀어보시기 바랍니다. 일부 연습 문제는 이후 장의 기법으로 더 쉽게 풀 수도 있지만 연습 문제의 목적은 지금까지 설명한 기능을 깊이 탐구하는 것입니다.  

> [!NOTE]
> 모든 연습문제는 [Exercises.md](https://github.com/learnbyexample/learn_js_regexp/blob/master/Exercises.md) 파일에 모아져 있습니다. 해답은 [Exercise_solutions.md](https://github.com/learnbyexample/learn_js_regexp/blob/master/Exercise_solutions.md) 파일을 참조합니다.  

1) 주어진 입력 문자열에 two 가 대소문자 구분없이 포함되어 있는지 확인합니다.  

```js
> let s1 = 'Their artwork is exceptional'
> let s2 = 'one plus tw0 is not three'
> let s3 = 'TRUSTWORTHY'

> const pat1 =  // add your solution here 
// const pat1 = /two/i

> pat1.test(s1)
< true
> pat1.test(s2)
< false
> pat1.test(s3)
< true
```

2) 주어진 배열에 e 를 포함하지 않는 모든 요소만 걸러냅니다.  

```js
> let items = ['goal', 'new', 'user', 'sit', 'eat', 'dinner']

> items.filter(w => test(w))       // add your solution here
// items.filter(w => !/e/.test(w))

< ['goal', 'sit']
```

3) 주어진 문자열에 5 의 첫 번째 항목만 five 로 바꿉니다.  

```js
> let ip = 'They ate 5 apples and 5 oranges'

> ip.replace()       // add your solution here
// ip.replace(/5/, 'five')

< 'They ate five apples and 5 oranges'
```

4) 주어진 문자열에 5 의 모든 항목을 five 로 바꿉니다.  

```js
> let ip = 'They ate 5 apples and 5 oranges'

> ip.replace()      // add your solution here
// ip.replace(/5/g, 'five')

< 'They ate five apples and five oranges'
```

5) 대소문자 구분없이 note 의 모든 항목을 X 로 바꿉니다.  

```js
> let ip = 'This note should not be NoTeD'

> ip.replace()     // add your solution here
// ip.replace(/note/ig, 'X')

< 'This X should not be XD'
```

6) 주어진 여러 줄의 입력 문자열에 2 를 포함하지 않는 모든 줄을 걸러냅니다.  

```js
> let purchases = `items qty
apple 24
mango 50
guava 42
onion 31
water 10`

> const num =       // add your solution here
// const num = /2/

> console.log(purchases.split('\n')
                       .filter(e => test(e))       // add your solution here
                       // .filter(e => !num.test(e))
                       .join('\n'))
< items qty
  mango 50
  onion 31
  water 10
```

> [!NOTE]
> 점 메타 문자와 수량자를 설명하는 장 끝 부분에 이 문제를 `replace()` 메서드로 풀 수 있습니다.  

7) 주어진 배열에 a 또는 w 를 포함하는 모든 항목을 걸러냅니다.  

```js
> let items = ['goal', 'new', 'user', 'sit', 'eat', 'dinner']

> items.filter(w => test(w) || test(w))     // add your solution here
// items.filter(w => /a/.test(w) || /w/.test(w))

< ['goal', 'new', 'eat']
```

8) 주어진 배열에 e 와 n 을 모두 포함하는 모든 항목을 걸러냅니다.  

```js
> let items = ['goal', 'new', 'user', 'sit', 'eat', 'dinner']

> items.filter(w => test(w) && test(w))     // add your solution here
// items.filter(w => /e/.test(w) && /n/.test(w))
< ['new', 'dinner']
```

9) 주어진 문자열에 0xA0 을 0x7F 로, 0xC0 을 0x1F 로 바꿉니다.  

```js
> let ip = 'start address: 0xA0, func1 address: 0xC0'

> ip.replace()        // add your solution here
// ip.replace(/0xA0/, '0x7F').replace(/0xC0/, '0x1F')
< 'start address: 0x7F, func1 address: 0x1F'
```


---


# Anchors

이번 장은 패턴을 "한정하는 방법" 에 대해 배웁니다. 입력 문자열의 어디서든 일치시키는 대신 제약 사항을 지정합니다. 지금은 정규 표현식에 포함된 기능만 살펴봅니다. 이후 장에는 사용자 지정 규칙을 정의하는 방법도 배웁니다.

제약 사항은 특정 문자와 이스케이프 시퀀스에 "특별한 의미를 부여" 해서 처리합니다. 이렇게 특별한 의미를 가진 문자를 정규식 용어로는 "메타 문자" (*meta character*)라고 합니다. 이런 메타 문자를 문자 그대로 매치할 경우, `\` 문자로 이스케이프해야 합니다. (메타 문자 이스케이프 장에서 다시 설명합니다.)


## String anchors

제약 사항은 입력 문자열의 "시작" 이나 "끝" 에서 일치하는 것 같이 "정규식을 한정하는 것" 에 관한 것입니다. 문자열 메서드인 `startsWith()` 와 `endsWith()` 와 유사한 기능입니다. 

먼저, 문자열 시작으로 매칭을 제한하는 `^` 메타 문자입니다.

```js
// ^ 문자는 검색어의 접두사로 배치합니다
> /^cat/.test('cater')
< true
> /^cat/.test('concatenation')
< false

> /^hi/.test('hi hello\ntop spot')
< true
> /^top/.test('hi hello\ntop spot')
< false
```

문자열의 끝으로 매칭을 제한하려면 `$` 메타 문자를 사용합니다.

```js
// $ 문자는 검색어의 접미사로 배치합니다
> /are$/.test('spare')
< true
> /are$/.test('nearest')
< false

> let words = ['surrender', 'unicorn', 'newer', 'door', 'empty', 'eel', 'pest']
> words.filter(w => /er$/.test(w))
< ['surrender', 'newer']
> words.filter(w => /t$/.test(w))
< ['pest']
```

문자열 시작과 끝 앵커를 결합하면 전체 문자열로 매칭을 정확히 제한할 수 있습니다. 이것은 `==` 연산자로 문자열 비교와 유사합니다.

```js
> /^cat$/.test('cat')
< true
> /^cat$/.test('cater')
< false
```

패턴에 앵커만 사용해서 문자열 연결 연산을 에뮬레이트할 수 있습니다.

```js
// 문자열의 시작에 텍스트 삽입
> 'live'.replace(/^/, 're')
< 'relive'
> 'send'.replace(/^/, 're')
< 'resend'

// 텍스트 덧붙이기
> 'cat'.replace(/$/, 'er')
< 'cater'
> 'hack'.replace(/$/, 'er')
< 'hacker'
```


## Line anchors

입력 문자열은 한 줄 또는 여러 줄일 수 있습니다. 문자 `\r, \n, \u2028` (줄 구분자) 및 `\u2029` (문단 구분자)는 "줄 구분자로 간주" 합니다. 

`m` (*multi-line*)플래그는 `^` 및 `$` 앵커 문자로 모든 줄의 시작과 끝으로 매칭합니다.

```js
// 문자열의 어떤 줄이 'top' 으로 시작하는지 확인
> /^top/m.test('hi hello\ntop spot')
< true

// 문자열의 어떤 줄이 'er' 로 끝나는지 확인
> /er$/m.test('spare\npar\nera\ndare')
< false

// 문자열 배열의 어떤 줄이 'are' 로 끝나는 항목만 필터링
> let elements = ['spare\ntool', 'par\n', 'dare', 'spared']
> elements.filter(e => /are$/m.test(e))
< ['spare\ntool', 'dare']

// 문자열의 어떤 전체 줄이 'par' 인지 확인
> /^par$/m.test('spare\npar\nera\ndare')
< true
```

"문자열 앵커" 와 마찬가지로 "라인 앵커" 를 단독 패턴으로 사용할 수 있습니다.

```js
> let items = 'catapults\nconcatenate\ncat'

> console.log(items.replace(/^/gm, '* '))
< * catapults
  * concatenate
  * cat

> console.log(items.replace(/$/gm, '.'))
< catapults.
  concatenate.
  cat.
```

> [!WARNING]
> 문자열 끝에 줄 구분자 문자가 있을 경우 구분자 뒤에 추가적인 줄 시작/끝 매칭이 발생합니다.

```js
// 다음은 'fig ' 가 세 번 삽입됩니다
> console.log('1\n2\n'.replace(/^/mg, 'fig '))
< fig 1
  fig 2
  fig 

> console.log('1\n2\n'.replace(/$/mg, ' apple'))
< 1 apple
  2 apple
   apple
```

> [!WARNING]
> Windows에서 생성한 텍스트 파일의 경우 `\r\n` 줄 바꿈 시퀀스를 `\n` 으로 변환해야 합니다. 그렇지 않으면 `\r` 및 `\n` 문자 모두 줄 끝으로 매칭합니다. 정규 표현식에서 `\r` 시퀀스를 수량자로 선택 문자로 만들어 이 문제를 처리할 수 있습니다. (예제는 그리디 수량자 섹션을 참조합니다.)


## Word anchors

"단어 앵커" 는 세 번째 유형의 제약 사항입니다. 알파벳(대소문자 구분 없음), 숫자 그리고 밑줄 문자(`_`)는 단어로 간주합니다. 왜 숫자와 밑줄까지 포함하는지? 알파벳만으로 안되는지 궁금할 수 있습니다. 이것은 변수와 함수 이름 지정 관례에서 비롯됩니다 — 일반적으로 알파벳, 숫자, 밑줄이 허용됩니다. 그래서, 이런 정의 방식은 자연어보다 프로그래밍 언어에 초점이 맞춰져 있습니다.

이스케이프 시퀀스 `\b` 는 단어 경계(*word boundary*)를 나타냅니다. 단어 시작과 단어 끝 앵커 모두 동일하게 사용합니다. "단어 시작" 은 단어 앞의 문자가 비-단어이거나, 문자가 없는 경우(문자열의 시작)를 의미합니다. 마찬가지로, "단어 끝" 은 단어 뒤의 문자가 비-단어이거나, 문자가 없는 경우(문자열의 끝)를 의미합니다. 따라서, 단어 없이 단어 경계 `\b` 를 사용할 수 없음을 암시합니다.

```js
> let words = 'par spar apparent spare part'

// 'par' 가 어디에 나타나든 대체
> words.replace(/par/g, 'X')
< 'X sX apXent sXe Xt'

// 단어 시작 'par' 대체
> words.replace(/\bpar/g, 'X')
< 'X spar apparent spare Xt'

// 단어 끝 'par' 대체
> words.replace(/par\b/g, 'X')
< 'X sX apparent spare part'

// 다른 단어의 일부가 아닐 때, 'par' 대체
> words.replace(/\bpar\b/g, 'X')
< 'X spar apparent spare part'
```

단어 경계를 패턴으로 사용하면 창의적인 해법을 얻을 수 있습니다:

```js
// 공백으로 구분된 단어를 큰따옴표로 감싼 csv 형식으로 변환
// 'replace' 메서드를 두 번 사용함에 주의
> let words = 'par spar apparent spare part'
> console.log(words.replace(/\b/g, '"').replace(/ /g, ','))
< "par","spar","apparent","spare","part"

// 프로그래밍 코드를 읽기 쉽게 만들기
// 단지 설명용 예시일 뿐이며, 모든 경우 동작하지 않을 수 있음
> 'output=num1+35*42/num2'.replace(/\b/g, ' ')
< ' output = num1 + 35 * 42 / num2 '

// 문자열 시작/끝의 공백을 잘라낼 수 있음
// 나중에 trim 메소드가 필요없도록, 한정을 추가하는 방법도 배우게 됨
> 'output=num1+35*42/num2'.replace(/\b/g, ' ').trim()
< 'output = num1 + 35 * 42 / num2'
```


## Opposite Word Anchor

단어 경계의 반대 앵커도 있습니다. `\B` 는 `\b` 가 "매치되지 않으면" 어디든 매치됩니다. 이런 이중성은 다른 이스케이프 시퀀스에서 볼 겁니다. "부정 논리" 는 텍스트 처리에 유용합니다. 하지만, 주의해서 사용해야 합니다. 의도치 않은 것까지 매치할 수 있습니다.

```js
> let words = 'par spar apparent spare part'

// 단어 시작이 아닐 때, 'par' 대체
> words.replace(/\Bpar/g, 'X')
< 'par sX apXent sXe part'

// 단어 끝 'par' 대체, 전체 단어 'par' 는 제외
> words.replace(/\Bpar\b/g, 'X')
< 'par sX apparent spare part'

// 단어 끝이 아닐 때, 'par' 대체
> words.replace(/par\B/g, 'X')
< 'par spar apXent sXe Xt'

// 'par' 가 단어로 둘러싸여 있을 때, 대체
> words.replace(/\Bpar\B/g, 'X')
< 'par spar apXent sXe part'
```

다음은 두 단어 앵커를 비교·대조하기 위한 패턴 예제입니다.

```js
> 'copper'.replace(/\b/g, ':')
< ':copper:'
> 'copper'.replace(/\B/g, ':')
< 'c:o:p:p:e:r'

> '-----hello-----'.replace(/\b/g, ' ')
< '----- hello -----'
> '-----hello-----'.replace(/\B/g, ' ')
< ' - - - - -h e l l o- - - - - '
```

## Cheatsheet and Summary

| Note           | Description                                                   |
|----------------|---------------------------------------------------------------|
| meta character  | 정규 표현식에서 특별한 의미를 가지는 문자들                        |
| ^              | 문자열 시작으로 매칭 제한                                 |
| $              | 문자열 끝으로 매칭 제한                                   |
| m              | ^ 와 $ 앵커로 여러 줄의 시작/끝을 매칭하는 플래그              |
| `\r, \n, \u2028, \u2029` | 줄 구분자로 간주함                                   |
| DOS-style files| `\r\n` 을 사용하며 특별한 주의가 필요할 수 있음                 |
| `\b`             | 단어의 시작과 끝으로 매칭을 제한                              |
| word characters| 알파벳, 숫자, 밑줄                                            |
| `\B`             | `\b` 가 매치되지 않는 곳이면 어디든 매치                       | 

이번 장은 정규 표현식의 구성 요소를 살펴보기 시작했고 흥미로운 방식으로 사용할 수 있음을 봤습니다. 그와 동시에 정규 표현식은 텍스트 처리 영역의 도구일 뿐입니다. 종종 정규 표현식과 문자열 메서드 및 표현식과 결합해서 좀 더 단순한 해법을 얻을 수 있습니다. 연습, 경험 그리고 상상력이 창의적인 해법을 구성하는 데 많은 도움을 줍니다. 이어지는 장은 또 다른 정규식 기능과 결합된 앵커의 예를 설명합니다.


## Exercises

1) 주어진 입력 문자열에 is 또는 the 가 전체 단어로 포함되는지 확인합니다.  

```js
> let str1 = 'is; (this)'
> let str2 = "The food isn't good"
> let str3 = 'the2 cats'
> let str4 = 'switch on the light'

> const pat1 =      // 여기에 해답을 추가하세요
> const pat2 =      // 여기에 해답을 추가하세요
// > const pat1 = /\bis\b/
// > const pat2 = /\bthe\b/

> pat1.test(str1) || pat2.test(str1)
< true
> pat1.test(str2) || pat2.test(str2)
< false
> pat1.test(str3) || pat2.test(str3)
< false
> pat1.test(str4) || pat2.test(str4)
< true
```

2) 주어진 입력 문자열에 전체 단어 red 만 brown 으로 바꿉니다.  

```js
> let ip = 'bred red spread credible red;'

> ip.replace()       // 여기에 해답을 추가하세요
// ip.replace(/\bred\b/g, 'brown')

< 'bred brown spread credible brown;'
```

3) 주어진 배열에 단어 문자로 둘러싸인 42 를 포함하는 모든 항목을 걸러냅니다.  

```js
> let items = ['hi42bye', 'nice1423', 'bad42', 'cool_42a', 'fake4b']

> items.filter(e => test(e))       // 여기에 해답을 추가하세요
// items.filter(e => /\B42\B/.test(e))

< ['hi42bye', 'nice1423', 'cool_42a']
```

4) 주어진 배열에 den 으로 시작하거나, ly 로 끝나는 모든 항목을 걸러냅니다.  

```js
> let items = ['lovely', '1\ndentist', '2 lonely', 'eden', 'fly\n', 'dent']

> items.filter(e => test(e) || test(e))        // 여기에 해답을 추가하세요
// items.filter(e => /^den/.test(e) || /ly$/.test(e))

< ['lovely', '2 lonely', 'dent']
```

5) 주어진 입력 문자열에 줄의 시작에 있을 때만 전체 단어 mall 을 1234 로 바꿉니다.  

```js
> let para = `(mall) call ball pall
ball fall wall tall
mall call ball pall
wall mall ball fall
mallet wallet malls
mall:call:ball:pall`

> console.log(para.replace())        // 여기에 해답을 추가하세요
// console.log(para.replace(/^mall\b/gm, '1234'))

< (mall) call ball pall
  ball fall wall tall
  1234 call ball pall
  wall mall ball fall
  mallet wallet malls
  1234:call:ball:pall
```

6) 주어진 배열에 줄이 den 으로 시작하거나, ly 로 끝나는 항목을 모두 걸러냅니다.  

```js
> let items = ['lovely', '1\ndentist', '2 lonely', 'eden', 'fly\nfar', 'dent']

> items.filter(e => test(e) || test(e))      // 여기에 해답을 추가하세요
// items.filter(e => /^den/m.test(e) || /ly$/m.test(e))

< ['lovely', '1\ndentist', '2 lonely', 'fly\nfar', 'dent']
```

7) 주어진 배열에 대소문자 구분없이 전체 요소가 12\nthree 인 것만 걸러냅니다.  

```js
> let items = ['12\nthree\n', '12\nThree', '12\nthree\n4', '12\nthree']

> items.filter(e => test(e))     // 여기에 해답을 추가하세요
// items.filter(e => /^12\nthree$/i.test(e))

< ['12\nThree', '12\nthree']
```

8) 주어진 배열에 hand 로 시작하고, 그 뒤에 최소한 하나의 단어가 따라오는 모든 항목의 hand 를 X 로 바꿉니다.  

```js
> let items = ['handed', 'hand', 'handy', 'un-handed', 'handle', 'hand-2']

> items.map(w => w.replace())        // 여기에 해답을 추가하세요
// items.map(w => w.replace(/^hand\B/, 'X'))

< ['Xed', 'hand', 'Xy', 'un-handed', 'Xle', 'hand-2']
```

9) 주어진 배열에 h 로 시작하는 모든 항목을 걸러냅니다. 추가로, 이렇게 필터링된 항목의 e 를 X 로 바꿉니다.  

```js
> let items = ['handed', 'hand', 'handy', 'unhanded', 'handle', 'hand-2']

> items.filter(w => test(w)).map(w => w.replace())        // 여기에 해답을 추가하세요
// items.filter(w => /^h/.test(w)).map(w => w.replace(/e/g, 'X'))

< ['handXd', 'hand', 'handy', 'handlX', 'hand-2']
```

10) 다음 코드는 true 대신 false 를 출력할까요?  

```js
> /end$/.test('bend it\nand send\n')
< false

> /end$/m.test('bend it\nand send\n')
< true
```


---


# Alternation and Grouping

간혹, 입력 문자열이 여러 패턴과 일치하는지 확인할 때가 있습니다. 예를 들어, 어떤 제품의 색상이 green 인지, blue 인지, red 인지 확인하는 경우입니다. 이번 장에는 이러한 경우 사용하는 교대(Alternation)를 사용하는 방법을 보여줍니다.  

패턴들은 서로 공통된 요소를 가질 수도 있는데, 이럴 때는 그룹화(Grouping)로 좀 더 간결한 정규 표현식을 만들 수 있습니다. 또한, 이번 장에는 어떤 교대 항목이 우선권을 갖는지 결정하는 우선순위 규칙(Precedence rules)에 대해서도 다룹니다.  


## Alternation
조건식이 논리 OR과 결합되면, 조건들 중 하나라도 만족하면 true 로 평가됩니다. 이와 마찬가지로, 정규 표현식에는 `|` 메타문자로 여러 패턴을 결합해서 논리 OR을 표현할 수 있습니다. 

입력 문자열에서 패턴들 중 하나라도 발견되면 매칭은 성공합니다. 패턴은 정규 표현식의 모든 기능을 그대로 사용할 수 있으며 예를 들어, 각자 독립된 앵커를 가질 수도 있습니다. 몇 가지 예는 다음과 같습니다.

```js
// 'cat' 또는 'dog' 을 매치
> const pets = /cat|dog/
> pets.test('I like cats')
< true
> pets.test('I like dogs')
< true
> pets.test('I like parrots')
< false

// 문자열 시작의 'cat' 또는 단어 끝의 'cat' 을 대체
> 'catapults concatenate cat scat cater'.replace(/^cat|cat\b/g, 'X')
< 'Xapults concatenate X sX cater'

// 'cat' 또는 'dog' 또는 'fox' 를 'mammal' 로 대체
> 'cat dog bee parrot fox'.replace(/cat|dog|fox/g, 'mammal')
< 'mammal mammal bee parrot mammal'
```

> [!NOTE]
> 위의 예제로 수 많은 교대(alternation)가 필요한 상황도 있을 수 있음을 추론할 수 있습니다. 예제와 세부 사항은 Dynamically building alternation 절을 참조하시기 바랍니다.


## Grouping
정규 표현식의 여러 대안들 사이에는 종종 공통된 부분이 있습니다. 공통된 문자일 수도 있고, 앵커 같은 한정자일 수 있습니다. 이런 경우는 괄호 메타문자 쌍으로 그룹화할 수 있습니다. 수학에서 `a(b+c)d = abd+acd` 가 되는 것처럼, 정규 표현식에서는 `a(b|c)d = abd|acd` 가 됩니다.

```js
// 그룹화하지 않은 경우
> 'red reform read arrest'.replace(/reform|rest/g, 'X')
< 'red X read arX'

// 그룹화한 경우
> 'red reform read arrest'.replace(/re(form|st)/g, 'X')
< 'red X read arX'

// 그룹화하지 않은 경우
> 'par spare part party'.replace(/\bpar\b|\bpart\b/g, 'X')
< 'X spare X party'

// 공통 앵커를 뽑아낸 경우
> 'par spare part party'.replace(/\b(par|part)\b/g, 'X')
< 'X spare X party'

// 공통 문자까지 뽑아낸 경우
// 나중에 빈 교대를 사용하는 대신, 좀 더 나은 기법을 배웁니다.
> 'par spare part party'.replace(/\bpar(|t)\b/g, 'X')
< 'X spare X party'
```

> [!NOTE]
> 그룹화는 단순히 간결한 정규 표현식을 만드는 것 이상의 용도가 있습니다. 이들은 이후 장에서 필요할 때마다 다룹니다.


## Precedence rules
교대를 사용할 때, 까다로운 상황이 종종 있습니다. 입력 문자열에 매치 여부를 테스트한 후, 불리언 결과를 얻는 경우는 모호함이 없습니다. 그러나, 문자열 치환 같은 경우는 몇 가지 요인에 따라 달라집니다. 

예를 들어, are 또는 spared 를 치환한다고 가정합니다. — 어느 쪽이 우선권을 가질까요? 좀 더 긴 단어 spared 일까요, 아니면 그 안에 포함된 부분 문자열 are 일까요, 아니면 또 다른 기준일까요?

정규 표현식의 교대는 입력 문자열에서 먼저 매치되는 대안이 우선권을 가집니다!!

```js
> let words = 'lion elephant are rope not'

// 주어진 입력 문자열에서 'on' 의 시작 인덱스 < 'ant' 의 인덱스
// 따라서, 교대 순서와 상관없이 'on' 이 치환됩니다
> words.replace(/on|ant/, 'X')
< 'liX elephant are rope not'
> words.replace(/ant|on/, 'X')
< 'liX elephant are rope not'
```

그렇다면, 대안들의 시작 인덱스가 같다면 어떻게 될까요?  

이럴 경우, 선언한 순서대로 즉, 왼쪽에서 오른쪽으로 우선권이 결정됩니다.

```js
> let mood = 'best years'

// 'year' 와 'years' 의 시작 인덱스는 항상 동일
// 따라서, 어느 것이 치환되는지는 교대 순서에 달려 있음
> mood.replace(/year|years/, 'X')
< 'best Xs'
> mood.replace(/years|year/, 'X')
< 'best X'
```

이런 문제를 확실히 보여주는 또 다른 예입니다.

```js
> let sample = 'ear xerox at mare part learn eye'

// 이것은 replace(/ar/g, 'X') 와 동일하게 동작
> sample.replace(/ar|are|art/g, 'X')
< 'eX xerox at mXe pXt leXn eye'

// 이것은 replace(/are|ar/g, 'X') 와 동일하게 동작
> sample.replace(/are|ar|art/g, 'X')
< 'eX xerox at mX pXt leXn eye'

// 휴, 드디어 원하는 대로 동작
> sample.replace(/are|art|ar/g, 'X')
< 'eX xerox at mX pX leXn eye'
```


## Cheatsheet and Summary
| Note                   | Description                                                        |
|-------------------------|--------------------------------------------------------------------|
| pat1\|pat2\|pat3        | 조건부 OR로 결합된 여러 정규식                                     |
| each alternative        | 각 대안은 독립적인 앵커를 가질 수 있음                             |
| ()                      | 패턴(들)을 그룹화                                                  |
| a(b\|c)d                | abd\|acd 와 동일                                                    |
| Alternation precedence  | 입력에서 더 먼저 매치되는 패턴이 우선권을 가짐                      |
| tie-breaker             | 동일한 시작 위치에서 매치될 경우 왼쪽에서 오른쪽 순서가 우선권을 가짐 |

이번 장은 `|` 메타문자로 하나 이상의 매치를 동일한 정규 표현식에서 지정하는 것에 관한 것이었습니다. 교대(alternation)들 사이에 공통 부분이 있다면, `(...)` 그룹화로 보다 단순화할 수 있습니다. 교대들 중에서 가장 먼저 매치되는 패턴이 우선권을 가지며, 여러 교대가 동일한 시작 위치를 가질 경우, 왼쪽에서 오른쪽 순서로 우선권을 결정합니다. 다음 장에는 우선순위 규칙을 고려해서, 문자열 배열에 교대 패턴을 구성하는 방법을 배웁니다. 그룹화는 또 다른 다양한 용도를 가지며, 이것은 이후 장에서 다시 다룹니다.


## Exercises
1) 주어진 입력 배열에서 den 으로 시작하거나 ly 로 끝나는 모든 요소를 걸러내세요.

```js
> let items = ['lovely', '1\ndentist', '2 lonely', 'eden', 'fly\n', 'dent']

> items.filter()        // add your solution here
< ['lovely', '2 lonely', 'dent']
```

2) 주어진 배열에서, den 으로 시작하는 줄 또는 ly 로 끝나는 줄을 가진 모든 요소를 걸러내세요.

```js
> let items = ['lovely', '1\ndentist', '2 lonely', 'eden', 'fly\nfar', 'dent']

> items.filter()        // add your solution here
< ['lovely', '1\ndentist', '2 lonely', 'fly\nfar', 'dent']
```

3) 주어진 입력 문자열들에서, removed 또는 reed 또는 received 또는 refused 의 모든 발생을 X 로 바꾸세요.

```js
> let s1 = 'creed refuse removed read'
> let s2 = 'refused reed redo received'

> const pat1 =      // add your solution here

> s1.replace(pat1, 'X')
< 'cX refuse X read'
> s2.replace(pat1, 'X')
< 'X X redo X'
```

4) 주어진 입력 문자열들에서, late 또는 later 또는 slated 를 A 로 바꾸세요.

```js
> let str1 = 'plate full of slate'
> let str2 = "slated for later, don't be late"

> const pat2 =      // add your solution here

> str1.replace(pat2, 'A')
< 'pA full of sA'
> str2.replace(pat2, 'A')
< "A for A, don't be A"
```

---

# Escaping metacharacters
정규 표현식 리터럴을 구성하는 데 도움되는 몇 가지 메타문자와 이스케이프 시퀀스를 이미 살펴 봤습니다. 정규 표현식 객체의 구분자로 사용하는 `/` 문자도 있습니다. 이번 장에는 그러한 문자들의 특별한 의미를 제거하는 방법을 보여줍니다. 

또한, 일반 문자열에서 정규 표현식 리터럴로 만들 때, 이러한 특수 문자를 어떻게 처리해야 하는지도 배웁니다.


## Escaping with backslash
메타문자를 문자 그대로 매치하려면 즉, 특별한 의미를 제거하려면, 해당 문자 앞에 `\` (백슬래시) 문자를 접두사로 붙입니다. 문자 그대로의 `\` 문자를 나타내려면 `\\` 를 사용합니다.

```js
// ^ 문자가 앵커로 사용되지 않더라도, 문자 그대로 매치되지 않음
> /b^2/.test('a^2 + b^2 - C*3')
< false
// 이스케이프하면 제대로 동작함
> /b\^2/.test('a^2 + b^2 - C*3')
< true

// ( 또는 ) 문자를 문자 그대로 매치
> '(a*b) + c'.replace(/\(|\)/g, '')
< 'a*b + c'

> '\\learn\\by\\example'.replace(/\\/g, '/')
< '/learn/by/example'
```

## Dynamically escaping metacharacters
외부에서 가져온 문자열을 있는 그대로 매칭할 경우, 정규 표현식을 직접 정의할 때는 필요한 곳에서 메타문자를 수동으로 이스케이프할 수 있습니다. 그러나, 다른 곳에서 얻은 문자열의 내용을 문자 그대로 매칭해야 한다면, 정규 표현식을 구성하는 동안 모든 메타문자를 어떻게든 이스케이프해야 합니다. 해법은 물론 정규 표현식을 사용하는 방법입니다!! 보통 프로그래밍 언어 자체가 이러한 경우를 위한 내장 메서드를 제공합니다. JavaScript 에는 없지만, [MDN: Regular Expressions Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping) 에서 다음과 같이 함수 형태로 처리하고 있습니다.

```js
> function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }
```

위의 정규 표현식에는 아직까지 배우지 않은 내용이 많이 있습니다. 이것은 다음 장에서 논의할 것입니다. 지금은 이 함수가 모든 메타문자를 자동으로 이스케이프한다는 것만 알면 충분합니다. 예는 아래에 나와 있습니다.

```js
// 정규식이 적용될 샘플 입력
> let eqn = 'f*(a^b) - 3*(a^b)'
// 다른 곳에서 얻은, 문자 그대로 매칭되어야 하는 샘플 문자열
> const usr_str = '(a^b)'

// 경우 1: 모든 매치를 치환
// 'escapeRegExp'  함수를 사용해서 메타문자 이스케이프
> const pat = new RegExp(escapeRegExp(usr_str), 'g')
> pat
< /\(a\^b\)/g
> eqn.replace(pat, 'c')
< 'f*c - 3*c'

// 경우 2: 입력 문자열의 끝에서만 치환
> eqn.replace(new RegExp(escapeRegExp(usr_str) + '$'), 'c')
"f*(a^b) - 3*c"
```

> [!NOTE]
> 위의 함수에서 `/` 구분자 문자가 이스케이프되지 않는다는 점을 유의하시기 바랍니다. 구분자까지 이스케이프하려면 `[.*+?^${}()|[\]\\\/]` 를 사용할 수 있습니다.


## Dynamically building alternation
이전 장의 예제는 단일 정규 표현식이 `|` 메타문자를 사용해서 결합된 여러 패턴을 포함할 경우를 보여주었습니다. 종종 문자열 배열이 있고, 그 요소들 중 어느 것이든 문자 그대로 매치하는 요구사항이 있습니다. 그렇게 처리하려면, 문자열들을 `|` 메타문자로 결합하기 전에, 모든 메타문자를 이스케이프해야 합니다. 다음 함수는 이전 절에서 소개한 `escapeRegExp()` 함수를 사용합니다.

```js
> function unionRegExp(arr) {
    return arr.map(w => escapeRegExp(w)).join('|')
  }
```

그리고 필요한 정규 표현식을 구성하기 위해 `unionRegExp()` 함수를 사용한 몇 가지 예는 다음과 같습니다.

```js
// 여기서는 교대의 순서는 중요하지 않음
// 그리고 다른 정규식 기능들이 필요하지 않다고 가정
> let w1 = ['c^t', 'dog$', 'f|x']
> const p1 = new RegExp(unionRegExp(w1), 'g')
> p1
< /c\^t|dog\$|f\|x/g
> 'c^t dog$ bee parrot f|x'.replace(p1, 'mammal')
< 'mammal mammal bee parrot mammal'

// 여기서는 교대 우선순위 규칙을 먼저 적용해야 함
// 그리고 용어들이 전체 단어로 매치되어야 한다고 가정
> let w2 = ['hand', 'handy', 'handful']
// 문자열 길이로 정렬, 가장 긴 것이 먼저
> w2.sort((a, b) => b.length - a.length)
< ['handful', 'handy', 'hand']
> const p2 = new RegExp(`\\b(${unionRegExp(w2)})\\b`, 'g')
> p2
< /\b(handful|handy|hand)\b/g
// 'hands' 와 'handed' 는 치환되지 않음에 유의
> 'handful handed handy hands hand'.replace(p2, 'X')
< 'X handed X hands X'
```

> [!NOTE]
> [XRegExp](https://github.com/slevithan/xregexp) 유틸리티는 `[XRegExp.escape()](https://xregexp.com/api/#escape)` 와 `[XRegExp.union()](https://xregexp.com/api/#union)` 같은 편리한 메서드를 제공합니다. union 메서드는 문자열과 정규식 리터럴을 혼합해서 허용하는 추가 기능이 있으며, 역참조의 번호 재지정도 처리합니다.


## source and flags properties
정규 표현식 객체의 내용을 얻어야 할 경우, `source` 와 `flags` 속성을 사용해서 각각 패턴 문자열과 플래그를 가져올 수 있습니다. 이러한 방법은 다른 정규 표현식 객체의 내용을 사용해서 새로운 정규식 객체를 만드는 데 도움이 됩니다.  

```js
> const p3 = /\bpar\b/
> const p4 = new RegExp(p3.source + '|cat', 'g')

> p4
< /\bpar\b|cat/g
> console.log(p4.source)
< \bpar\b|cat
> p4.flags
< 'g'

> 'cater cat concatenate par spare'.replace(p4, 'X')
< 'Xer X conXenate X spare'
```


## Escaping the delimiter
이스케이프할 때, 주의할 또 다른 문자는 정규 표현식 리터럴을 정의할 때, 사용하는 구분자(delimiter)입니다. 또는, 패턴에 따라, `new RegExp` 생성자를 사용하면 이스케이프를 피할 수 있습니다.

```js
> let path = '/home/joe/report/sales/ip.txt'

// 이것은 'leaning toothpick syndrome(기울어진 이쑤시개 증후군)' 이라 불림
> path.replace(/^\/home\/joe\//, '~/')
< '~/report/sales/ip.txt'

// 'new RegExp' 를 사용하면 가독성이 좋아지고 오타를 줄일 수 있음
> path.replace(new RegExp(`^/home/joe/`), '~/')
< '~/report/sales/ip.txt'
```

## Escape sequences
탭(tab)과 줄바꿈(newline) 같은 특정 문자들은 각각 `\t` 와 `\n` 이스케이프 시퀀스로 표현할 수 있습니다. 이것은 일반 문자열 리터럴에서 처리하는 방식과 유사합니다. 그러나, `\b`는 앞서 본 것처럼 정규 표현식에는 단어 경계를 의미하지만, 일반 문자열 리터럴에는 백스페이스 문자를 의미합니다.  

추가로, 정규 표현식에만 해당하는 여러 시퀀스들이 있습니다. 전체 목록은 MDN 문서의 *[Using special characters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#using_special_characters)* 절에 나와 있으며, 다음과 같습니다:  

`\b \B \cX \d \D \f \k<name> \n \p \P \r \s \S \t \uhhhh \u{hhhh} \v \w \W \xhh \0`  

사용 예는 다음과 같습니다:

```js
> 'a\tb\tc'.replace(/\t/g, ':')
< 'a:b:c'

> '1\n2\n3'.replace(/\n/g, ' ')
< '1 2 3'

// 문자열 리터럴에서 정규 표현식을 생성할 때는 \ 대신 \\를 사용해야 함
// 단일 백슬래시 문자를 문자 그대로 표현해야 할 때
> new RegExp('123\tabc')
< /123    abc/
> new RegExp('123\\tabc')
< /123\tabc/
```

콘솔의 또 다른 예:

**Backslash in RegExp**

만약, 정의되지 않은 이스케이프 시퀀스는, 이스케이프된 문자 자체로 처리됩니다.

```js
// 여기서 \e 는 단순히 e 로 처리됨
> /\e/.test('hello')
< true
```

또한 문자를 16진수 이스케이프 형식 `\xhh` (hh는 정확히 두 자리 16진수)로 표현할 수도 있습니다. 메타문자를 이스케이프를 통해서 표현하면, 메타문자 기능이 아닌 문자 그대로 처리됩니다. 유니코드 문자를 위한 이스케이프는 Codepoints 절에서 다룰 것입니다.

```js
// \x20 은 공백 문자
> 'h e l l o'.replace(/\x20/g, '')
< 'hello'

// \x7c 는 '|' 문자
// 그러나 교대 메타문자로 취급되지 않음
> '12|30'.replace(/2\x7c3/g, '5')
< '150'
> '12|30'.replace(/2|3/g, '5')
< '15|50'
```

> [!NOTE]
> 모든 ASCII 문자와 그 16진수 표현을 담은 유용한 치트시트는 **[ASCII 코드 표](https://ascii.cl/)** 를 참고하시기 바랍니다.


## Cheatsheet and Summary
| Note                  | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| \                     | 메타문자 앞에 붙여 문자 그대로 매치                                          |
| \\                    | `\` 자체를 문자 그대로 매치                                                  |
| source                | RegExp 객체를 문자열로 변환하는 속성                                         |
|                       | 다른 RegExp 안에 RegExp를 삽입할 때 유용                                    |
| flags                 | RegExp 객체의 플래그를 얻는 속성                                             |
| RegExp(`pat`)         | `/` 구분자 문자를 이스케이프하지 않거나 줄이는 데 도움                      |
| Alternation precedence| 동일한 시작 위치에서 매치될 경우 왼쪽에서 오른쪽 순서가 우선권을 가짐        |
|                       | 견고한 해법: 교대 패턴들을 길이 기준으로 정렬, 긴 것부터 먼저               |
| \t                    | 문자열 리터럴에서 지원되는 것과 같은 이스케이프 시퀀스                      |
| \b                    | 정규식에서는 단어 경계, 문자열 리터럴에서는 백스페이스                      |
| \e                    | 정의되지 않은 이스케이프는 이스케이프된 문자를 그대로 매치                  |
| \xhh                  | 16진수 값으로 문자를 표현                                                    |
| \x7c                  | `|` 문자를 문자 그대로 매치                                                  |


## Exercises
1) 주어진 입력 문자열들을 동일한 논리를 사용하여 기대된 출력으로 변환하세요.

```js
> let str1 = '(9-2)*5+qty/3-(9-2)*7'
> let str2 = '(qty+4)/2-(9-2)*5+pq/4'

> const pat1 =      // add your solution here
> str1.replace()        // add your solution here
< '35+qty/3-(9-2)*7'
> str2.replace()        // add your solution here
< '(qty+4)/2-35+pq/4'
```

2) `(4)\|` 를 주어진 입력 문자열들의 시작 또는 끝에서만 2 로 치환하세요.

```js
> let s1 = '2.3/(4)\\|6 fig 5.3-(4)\\|'
> let s2 = '(4)\\|42 - (4)\\|3'
> let s3 = 'two - (4)\\|\n'

> const pat2 =      // add your solution here

> s1.replace()      // add your solution here
< '2.3/(4)\\|6 fig 5.3-2'
> s2.replace()      // add your solution here
< '242 - (4)\\|3'
> s3.replace()      // add your solution here
< 'two - (4)\\|\n'
```

3) 주어진 입력 문자열들에 대해, 배열 items 의 일치하는 모든 요소를 X 로 치환하세요. items 의 요소들은 문자 그대로 매치하세요. items 의 어떤 두 요소도 매칭 충돌을 일으키지 않는다고 가정하세요.

```js
> let items = ['a.b', '3+n', 'x\\y\\z', 'qty||price', '{n}']

// add your solution here
> const pat3 =      // add your solution here

> '0a.bcd'.replace(pat3, 'X')
< '0Xcd'
> 'E{n}AMPLE'.replace(pat3, 'X')
< 'EXAMPLE'
> '43+n2 ax\\y\\ze'.replace(pat3, 'X')
< '4X2 aXe'
```

4) 주어진 입력 문자열에 대해, 백스페이스 문자 \b 를 단일 공백 문자로 치환하세요.

```js
> let ip = '123\b456'

> ip.replace()      // add your solution here
< '123 456'
```

5) 모든 \e 의 발생을 e 로 치환하세요.

```js
> let ip = 'th\\er\\e ar\\e common asp\\ects among th\\e alt\\ernations'

> ip.replace()      // add your solution here
< 'there are common aspects among the alternations'
```

6) 주어진 문자열 ip 에 대해, 배열 eqns 의 일치하는 아무 항목이나 X 로 치환하세요. eqns 의 항목들은 문자 그대로 매치하세요.

```js
> let ip = '3-(a^b)+2*(a^b)-(a/b)+3'
> let eqns = ['(a^b)', '(a/b)', '(a^b)+2']

// add your solution here
> const pat4 =      // add your solution here

> ip.replace(pat4, 'X')
< '3-X*X-X+3'
```

---

# Dot metacharacter and Quantifiers
이 장에는 마침표(dot) 메타문자와 수량자와 관련된 메타문자를 소개합니다. 문자열 메서드 `repeat()` 와 비슷하게, 수량자는 정규 표현식 패턴의 일부를 반복할 수 있도록 해 주며, 그로써 패턴을 보다 간결하게 만들고 가독성을 높여줍니다. 수량자는 또한, 반복 범위를 지정하는 방법을 제공합니다. 이 범위는 시작값과 끝값을 제한하거나 제한하지 않는 유연성을 갖습니다. 마침표 메타문자(필요하다면 교대(`|`)와 함께)와 결합하면, 수량자는 패턴들 사이에 조건부 AND 논리를 구성할 수 있도록 만듭니다.


## Dot metacharacter
마침표(dot) 메타문자는 \r, \n, \u2028(줄 구분자) 그리고 \u2029(문단 구분자) 문자를 제외한, 임의의 문자를 매치하기 위한 자리표시자 역할을 처리합니다. 이들은 이전에 라인 앵커 절에서 본 동일한 문자들입니다.

```js
// 문자 'c', 임의의 문자, 그리고 문자 't' 를 매치
> 'tac tin c.t abc;tuv acute'.replace(/c.t/g, 'X')
< 'taXin X abXuv aXe'

// 문자 'r', 임의의 두 문자, 그리고 문자 'd' 를 매치
> 'breadth markedly reported overrides'.replace(/r..d/g, 'X')
< 'bXth maXly repoX oveXes'

// 문자 '2', 임의의 문자, 그리고 문자 '3' 을 매치
> '42\t35'.replace(/2.3/, '8')
< '485'
```

s 플래그 절에는 줄 구분자도 포함하는 방법을 보여줍니다. 문자 클래스 장에는 제한된 문자 집합에 사용자 정의 자리표시자를 어떻게 정의하는지 설명합니다.

> [!WARNING]
> 경고 일부 문자들(예: g̈)은 하나 이상의 코드포인트(문자의 숫자 값)를 가집니다. 이런 문자들을 매치하려면, 여러 개의 `.` 메타문자를 사용해야 합니다. (코드포인트의 개수와 같게)

```js
> 'cag̈ed'.replace(/a.e/, 'o')
< 'cag̈ed'

> 'cag̈ed'.replace(/a..e/, 'o')
< 'cod'
```

## split() method
이 장에는 예제를 설명하기 위해 **split() 메서드** 도 추가로 사용합니다.  `split()` 메서드는 주어진 정규 표현식(또는 문자열)을 기준으로 문자열을 분리하고, 문자열 배열을 반환합니다.  

```js
> 'apple-85-mango-70'.split(/-/)
< ['apple', '85', 'mango', '70']

// 선택적인 'limit' 인자를 사용하여 출력 요소의 최대 개수를 지정할 수 있음
> 'apple-85-mango-70'.split(/-/, 2)
< ['apple', '85']

// 마침표 메타문자를 사용한 예시
> 'bus:3:car:-:van'.split(/:.:/)
< ['bus', 'car', 'van']
```

> [!NOTE]
> **참고:** 캡처 그룹이 `split()` 메서드의 출력에 어떤 영향을 미치는지는 *split() with capture groups* 절에서 다룹니다.


## Greedy quantifiers
수량자는 정규 표현식 일부를 반복하는 데 도움을 줍니다. 이것은 리터럴 문자, 그룹화 및 이후에 배우게 될 다른 기능에 적용할 수 있습니다. 정확한 개수와 제한된 범위를 지정할 수 있는 능력 외에도, 제한되지 않은 가변적인 개수까지 매치할 수 있습니다. 입력 문자열이 가변적인 개수를 갖는 패턴을 여러 방식으로 만족시킬 수 있는 경우, 가능한 범위를 좁히기 위해 두 종류의 수량자 중에서 하나를 선택할 수 있습니다. 이 절에는 탐욕형(greedy) 수량자를 다룹니다.

먼저, `?` 메타문자는 문자 또는 그룹을 0 회 또는 1 회 매치하도록 정량화합니다. 다시 말해, 해당 부분을 선택적으로 매치되도록 만듭니다. 이것은 교대와 그룹화에 비해 좀 더 간결한 정규 표현식을 만듭니다.

```js
// 다음과 동일: /ear|ar/g
> 'far feat flare fear'.replace(/e?ar/g, 'X')
< 'fX feat flXe fX'

// 다음과 동일: /\bpar(t|)\b/g
> 'par spare part party'.replace(/\bpart?\b/g, 'X')
< 'X spare X party'

// 다음과 동일: /\b(re.d|red)\b/
> ['red', 'ready', 're;d', 'redo', 'reed'].filter(w => /\bre.?d\b/.test(w))
< ['red', 're;d', 'reed']

// 다음과 동일: /part|parrot/g
> 'par part parrot parent'.replace(/par(ro)?t/g, 'X')
< 'par X X parent'
// 다음과 동일: /part|parrot|parent/g
> 'par part parrot parent'.replace(/par(en|ro)?t/g, 'X')
< 'par X X X'
```

`*` 메타문자는 문자 또는 그룹을 0회 이상 매치하도록 정량화합니다. 상한은 없습니다.

```js
// 't' 다음에 'a' 가 0회 이상, 그 뒤에 'r' 을 매치
> 'tr tear tare steer sitaara'.replace(/ta*r/g, 'X')
< 'X tear Xe steer siXa'

// 't' 다음에 'e' 또는 'a' 가 0회 이상, 그 뒤에 'r' 을 매치
> 'tr tear tare steer sitaara'.replace(/t(e|a)*r/g, 'X')
< 'X X Xe sX siXa'

// '1' 이 0회 이상 뒤따르고 그 뒤에 '2' 를 매치
> '3111111111125111142'.replace(/1*2/g, 'X')
< '3X511114X'
```

여기에서는 split() 메서드의 추가 예시를 보여줍니다.

```js
// 마지막 요소가 빈 문자열인 이유: 문자열 끝의 '2' 뒤에는 아무것도 없기 때문
> '3111111111125111142'.split(/1*2/)
< ['3', '511114', '']
```

```js
// '25' 와 '42' 가 어떻게 분리되는지에 주목하세요. 그 사이에는 '1' 이 0번 있습니다.
> '3111111111125111142'.split(/1*/)
< ['3', '2', '5', '4', '2']
```

`+` 메타문자는 문자나 그룹을 1회 이상 매치하도록 정량화합니다. `*` 수량자와 유사하게 상한은 없습니다. 좀 더 중요하게는, 빈 문자열을 매치하는 것 같은 의외의 동작이 없습니다.

```js
> 'tr tear tare steer sitaara'.replace(/ta+r/g, 'X')
< 'tr tear Xe steer siXa'
> 'tr tear tare steer sitaara'.replace(/t(e|a)+r/g, 'X')
< 'tr X Xe sX siXa'

> '3111111111125111142'.replace(/1+2/g, 'X')
< '3X5111142'
> '3111111111125111142'.split(/1+/)
< ['3', '25', '42']
```

중괄호 `{}` 메타문자를 사용하면 정수 반복 횟수의 범위를, 유한/무한 모두 지정할 수 있습니다. 이 수량자는 다음과 같은 세 가지 방식으로 사용할 수 있습니다.

| Quantifier | Description            |
|------------|------------------------|
| {m,n}      | m회에서 n회까지 매치   |
| {m,}       | 최소 m회 이상 매치     |
| {n}        | 정확히 n회 매치        |

```js
> let repeats = ['abc', 'ac', 'abbc', 'xabbbcz', 'bc', 'abbbbbc']

> repeats.filter(w => /ab{1,4}c/.test(w))
< ['abc', 'abbc', 'xabbbcz']
> repeats.filter(w => /ab{0,2}c/.test(w))
< ['abc', 'ac', 'abbc']

> repeats.filter(w => /ab{3,}c/.test(w))
< ['xabbbcz', 'abbbbbc']
> repeats.filter(w => /ab{3}c/.test(w))
< ['xabbbcz']
```

> [!NOTE]
> `{}` 메타문자를 문자 그대로 매치하려면 이스케이프해야 합니다. 그러나, `()` 메타문자와 달리 훨씬 더 융통성이 있습니다. 예를 들어, `{` 만 이스케이프하면 충분하다거나, 위에서 나열한 형태에 엄밀히 부합하지 않으면 아예 이스케이프가 필요하지 않습니다.

```js
> 'a{5} = 10'.replace(/a\{5}/g, 'a{6}')
< 'a{6} = 10'

> 'report_{a,b}.txt'.replace(/_{a,b}/g, '-{c,d}')
< 'report-{c,d}.txt'
```

## AND Conditional
다음으로, 마침표 메타문자와 수량자를 사용해서 AND 조건을 구성하는 방법입니다.

```js
// 'Error' 다음에 0개 이상의 문자가 오고 그 다음에 'valid' 가 오는 것을 매치
> /Error.*valid/.test('Error: not a valid input')
< true

> /Error.*valid/.test('Error: key not found')
< false
```

임의의 순서로 매치되도록 만들려면 교대도 도입해야 합니다. 이것은 2개 또는 3개의 패턴에는 어느 정도 관리할 만합니다. 좀 더 쉬운 접근법은 AND 조건을 사용해서 구현하는 절을 참조하시기 바랍니다.

```js
> /cat.*dog|dog.*cat/.test('cat and dog')
< true
> /cat.*dog|dog.*cat/.test('dog and cat')
< true
```

```js
// 불리언 결과만 필요하다면, 이것이 확장 가능한 접근법이 될 것입니다
> let patterns = [/cat/, /dog/]
> patterns.every(p => p.test('cat and dog'))
< true
> patterns.every(p => p.test('dog and cat'))
< true
```

## What does greedy mean?
`?` 수량자를 사용할 때, 둘 다 정규 표현식을 만족시킬 수 있다면, 자바스크립트는 0회 또는 1회 매치를 어떻게 결정할까요? 예를 들어, 정규 표현식 `'foot'.replace(/f.?o/, 'X')`를 고려합니다 — `foo` 가 대체될까요, 아니면 `fo` 가 대체될까요? 이것은 항상 `foo` 가 대체됩니다. 왜냐하면, 이것은 탐욕적(greedy) 수량자이기 때문이며 즉, 가능한 한 많이 매치하려고 시도합니다.

```js
> 'foot'.replace(/f.?o/, 'X')
< 'Xt'
```

```js
// 좀 더 실용적인 예
// '<' 가 이미 접두사로 '\' 가 붙어 있지 않다면 '\' 를 붙입니다
// '<' 와 '\<' 둘 다 '\<' 로 대체됩니다
> console.log('table < fig \\< bat < cake'.replace(/\\?</g, '\\<'))
< table \< fig \< bat \< cake
```

```js
// /handful|handy|hand/ 같은 장난은 안녕
> 'hand handy handful'.replace(/hand(y|ful)?/g, 'X')
< 'X X X'
```

하지만 잠깐, `/Error.*valid/` 예제는 어떻게 동작했을까요? `.*` 가 Error 이후의 모든 문자를 소비해야 하지 않을까요? 좋은 질문입니다. 정규 표현식 엔진은 실제 모든 문자를 소비합니다. 그런 다음, 정규 표현식이 실패한다는 것을 깨닫고, 문자열 끝에서 한 문자를 되돌려 주고, 전체 정규 표현식이 만족되는지 다시 확인합니다. 이런 과정은 매치가 발견되거나, 실패가 확인될 때까지 반복됩니다. 정규 표현식 용어로는 백트래킹(backtracking)이라 부릅니다.

```js
> let sentence = 'that is quite a fabricated tale'

// t.*a 는 항상 첫 번째 't' 에서 마지막 'a' 까지 매치됩니다
// 이것은 그러한 패턴에 대해 둘 이상의 매치가 있을 수 없다는 것을 의미합니다
> sentence.replace(/t.*a/, 'X')
< 'Xle'
> 'star'.replace(/t.*a/, 'X')
< 'sXr'
```

```js
// t.*a 에 대해 첫 번째 't' 에서 마지막 'a' 까지 매치하는 것은 이 경우는 작동하지 않습니다
// 따라서 전체 정규식이 매치될 수 있을 때까지 정규식 엔진이 백트래킹합니다
> sentence.replace(/t.*a.*q.*f/, 'X')
< 'Xabricated tale'
> sentence.replace(/t.*a.*u/, 'X')
< 'Xite a fabricated tale'
```

> [!WARNING]
> 경고 백트래킹은 특정 코너 케이스에서 상당히 시간이 많이 걸릴 수 있습니다. 혹은, 재앙일 수도 있습니다 — 예로 [cloudflare: 2019년 7월 2일 Cloudflare 장애의 세부 사항](https://blog.cloudflare.com/details-of-the-cloudflare-outage-on-july-2-2019/)을 참조하시기 바립니다. 좀 더 많은 예제와 해결책은 이 [게시물](https://javascript.info/regexp-catastrophic-backtracking)을 참조하시기 바랍니다.


## Non-greedy quantifiers
이름으로 알 수 있듯이, 수량자들은 가능한 한, 최소한으로 매치하려고 시도합니다. **게으른(lazy)** 또는 **마지못해(reluctant)** 수량자라고도 불립니다. 탐욕적(greedy) 수량자에 `?` 문자를 덧붙이면 비탐욕적(non-greedy)이 됩니다.

```js
> 'foot'.replace(/f.??o/, 'X')
< 'Xot'

> 'frost'.replace(/f.??o/, 'X')
< 'Xst'

> '123456789'.replace(/.{2,5}?/, 'X')
< 'X3456789'
```

탐욕적 수량자와 마찬가지로, 게으른 수량자도 전체 정규 표현식을 만족시키려고 시도합니다. 예를 들어, `.*?` 는 먼저 빈 매치에서 시작한 다음, 매치가 발견될 때까지 한 글자씩 앞으로 이동합니다.

```js
// 탐욕적 수량자는 첫 번째 ':' 에서 마지막 ':' 까지 매치합니다
> 'green:3.14:teal::brown:oh!:blue'.split(/:.*:/)
< ['green', 'blue']

// 비탐욕적 수량자는 ':' 에서 바로 다음 ':' 까지만 매치합니다
> 'green:3.14:teal::brown:oh!:blue'.split(/:.*?:/)
< ['green', 'teal', 'brown', 'blue']
```

## s flag
`s` 플래그를 사용하면 마침표(`.`) 메타문자가 `\r`, `\n`, 그리고 줄/문단 구분 문자까지 매치할 수 있습니다.  

```js
// 기본적으로 . 메타문자는 줄 구분 문자를 매치하지 않습니다
> console.log('Hi there\nHave a Nice Day'.replace(/the.*ice/, 'X'))
< Hi there
  Have a Nice Day

// 's' 플래그를 사용하면 줄 구분 문자도 매치할 수 있습니다
> console.log('Hi there\nHave a Nice Day'.replace(/the.*ice/s, 'X'))
< Hi X Day
```  

## Cheatsheet and Summary
알겠습니다. 요청하신 부분을 빠짐없이 **직역**해 드릴게요.  

---

| Note                  | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| .                     | 줄 구분자를 제외한 임의의 문자와 매치                                       |
| s                     | 마침표 메타문자가 줄 구분자도 매치하도록 하는 플래그                        |
| greedy                | 가능한 한 많이 매치                                                         |
| ?                     | 탐욕적 수량자, 0회 또는 1회 매치                                            |
| *                     | 탐욕적 수량자, 0회 이상 매치                                                |
| +                     | 탐욕적 수량자, 1회 이상 매치                                                |
| {m,n}                 | 탐욕적 수량자, m회에서 n회까지 매치                                         |
| {m,}                  | 탐욕적 수량자, 최소 m회 이상 매치                                           |
| {n}                   | 탐욕적 수량자, 정확히 n회 매치                                              |
| pat1.*pat2            | pat1과 pat2 사이에 임의의 개수의 문자가 있음                                |
| pat1.*pat2\|pat2.*pat1 | pat1과 pat2가 어떤 순서로든 둘 다 매치                                      |
| non-greedy            | 탐욕적 수량자에 ?를 덧붙임                                                  |
|                       | 가능한 한 최소한으로 매치                                                   |
| s.split(/pat/)        | 정규식을 기준으로 문자열을 분리                                              |

이번 장에는 고정된 문자열 대신 자리표시자를 지정하는 개념을 소개했습니다. 수량자와 결합했을 때, 단순한 정규 표현식이 어떻게 넓은 범위의 텍스트까지 매치할 수 있는지 엿볼 수 있습니다. 다음 장에는 제한된 집합의 자리표시자 문자를 직접 만드는 방법을 배우게 될 것입니다.


## Exercises

> [!NOTE]
> 입력 문자열의 내용에 따라 s 플래그를 사용하시기 바랍니다.

1) 주어진 입력에서 42//5 또는 42/5 를 8 로 바꾸세요.

```js
> let ip = 'a+42//5-c pressure*3+42/5-14256'

// add your solution here
< 'a+8-c pressure*3+8-14256'
```

2) 배열 항목들에서, hand 로 시작하고 즉시 최대 한 글자 더로 끝나거나 le 로 끝나는 모든 요소를 필터링하세요.

```js
> let items = ['handed', 'hand', 'handled', 'handy', 'unhand', 'hands', 'handle']

// add your solution here
< ['hand', 'handy', 'hands', 'handle']
```

3) 주어진 입력 문자열들에 대해, `split()` 메서드를 사용해서 보여준 출력처럼 얻으세요.

```js
> let eqn1 = 'a+42//5-c'
> let eqn2 = 'pressure*3+42/5-14256'
> let eqn3 = 'r*42-5/3+42///5-42/53+a'

> const pat1 =      // add your solution here

> eqn1.split(pat1)
< ['a+', '-c']
> eqn2.split(pat1)
< ['pressure*3+', '-14256']
> eqn3.split(pat1)
< ['r*42-5/3+42///5-', '3+a']
```

4) 주어진 입력 문자열들에 대해, i 가 처음 나타나는 곳부터 문자열 끝까지 모든 것을 제거하세요.

```js
> let s1 = 'remove the special meaning of such constructs'
> let s2 = 'characters while constructing'
> let s3 = 'input output'

> const pat2 =      // add your solution here

> s1.replace(pat2, '')
< 'remove the spec'
> s2.replace(pat2, '')
< 'characters wh'
> s3.replace(pat2, '')
< ''
```

5) 주어진 문자열들에 대해, 보여준 출력처럼 얻을 수 있도록 정규식을 구성하세요.

```js
> let str1 = 'a+b(addition)'
> let str2 = 'a/b(division) + c%d(#modulo)'
> let str3 = 'Hi there(greeting). Nice day(a(b)'

> const remove_parentheses =        // add your solution here

> str1.replace(remove_parentheses, '')
< 'a+b'
> str2.replace(remove_parentheses, '')
< 'a/b + c%d'
> str3.replace(remove_parentheses, '')
< 'Hi there. Nice day'
```

6) 주어진 정규식을 올바른 출력이 나오도록 수정하세요.

```js
> let words = 'plink incoming tint winter in caution sentient'

// wrong output
> const w1 = /int|in|ion|ing|inco|inter|ink/g
> words.replace(w1, 'X')
"plXk XcomXg tX wXer X cautX sentient"

// expected output
> const w2 =        // add your solution here
> words.replace(w2, 'X')
"plX XmX tX wX X cautX sentient"
```

7) 주어진 탐욕적 수량자들에 대해, `{m,n}` 표현을 사용한 동등한 형태는 무엇인가요?

```
? is same as
* is same as
+ is same as
```

8) `(a*|b*)` 는 `(a|b)*` 와 동일하다 — 참 혹은 거짓?

9) 주어진 입력 문자열들에 대해, test가 (대소문자와 무관하게) 처음 나타나는 곳부터 문자열 끝까지 모든 것을 제거하되, test 가 문자열 끝에 있는 경우는 제외하세요.

```js
> let s1 = 'this is a Test'
> let s2 = 'always test your regexp for corner\ncases'
> let s3 = 'a TEST of skill tests?'

> let pat3 =        // add your solution here

> s1.replace(pat3, '')
< 'this is a Test'
> s2.replace(pat3, '')
< 'always '
> s3.replace(pat3, '')
< 'a '
```

10) 입력 배열 words 에 대해, s 로 시작하고 e 와 t 를 어떤 순서로든 포함하는 모든 요소를 필터링하세요.

```js
> let words = ['sequoia', 'subtle', 'exhibit', 'a set', 'sets', 'tests', 'site']

// add your solution here
< ['subtle', 'sets', 'site']
```

11) 입력 배열 words 에 대해, 길이가 6 보다 작은 모든 요소를 제거하세요.

```js
> let words = ['sequoia', 'subtle', 'exhibit', 'asset', 'sets', 'tests', 'site']

// add your solution here
< ['sequoia', 'subtle', 'exhibit']
```

12) 입력 배열 words 에 대해, s 또는 t 로 시작하고 최대 6개의 문자 길이를 갖는 모든 요소를 필터링하세요.

```js
> let words = ['sequoia', 'subtle', 'exhibit', 'asset', 'sets', 't set', 'site']

// add your solution here
< ['subtle', 'sets', 't set', 'site']
```

13) 문자열 start 가 줄의 시작에 있을 경우, 줄의 끝에 문자열 end 가 다음으로 나타나는 곳까지 삭제하세요. 이러한 키워드는 대소문자와 무관하게 매치하세요.

```js
> let para = `good start
start working on that
project you always wanted
to, do not let it end
hi there
start and end the end
42
Start and try to
finish the End
bye`

> const mpat =      // add your solution here
> console.log(para.replace(mpat, ''))
< good start
  
  hi there
  
  42
  
  bye
```

14) 왜 이 코드가 보여준 출력 결과를 내는지 추론할 수 있나요? 목표는 모든 `<characters>` 패턴을 제거하되 `<>` 는 제거하지 않는 것이었습니다. 기대되는 결과는 `a 1<> b 2<> c` 였습니다.

```js
> let ip = 'a<apple> 1<> b<bye> 2<> c<cat>'
> ip.replace(/<.+?>/g, '')
< 'a 1 2'
```

15) 주어진 입력 문자열들에 대해, 아래에 보여준 출력처럼 얻을 수 있도록 `split()` 메서드를 사용하세요.

```js
> let s1 = 'go there  ::   this :: that'
> let s2 = 'a::b :: c::d e::f :: 4::5'
> let s3 = '42:: hi::bye::see :: carefully'

> const pat4 =      // add your solution here

> s1.split()        // add your solution here
< ['go there', 'this :: that']
> s2.split()        // add your solution here
< ['a::b', 'c::d e::f :: 4::5']
> s3.split()        // add your solution here
< ['42:: hi::bye::see', 'carefully']
```

---

# Interlude: Tools for debugging and visualization
정규 표현식이 복잡해질수록 문제가 생겼을 때 디버깅 과정이 어려워질 수 있습니다. 처음부터 정규 표현식을 한 단계씩 구축하고, 입력 문자열을 테스트하는 것은 문제를 해결하는 데 크게 도움이 됩니다. 이러한 과정을 돕기 위해 다양한 온라인 정규 표현식 도구를 사용할 수 있습니다.


## regex101
[regex101](https://regex101.com/)은 정규 표현식을 테스트하기 위한 인기 있는 사이트입니다. 먼저, JavaScript를 플레이버로 선택해야 합니다. 그런 다음 정규 표현식, 입력 문자열, 플래그 그리고 선택적인 치환 문자열을 추가할 수 있습니다. 매치된 부분은 하이라이트되며 설명은 별도의 창에서 제공됩니다.

다음은 이 링크의 스크린샷입니다 — regex101: /ab{0,2}c/g

regex101 예제

> [!NOTE]
> 사이트에서 제공하는 모든 기능을 꼭 한 번 탐색해 보시기 바랍니다. 빠른 참조와 링크 공유, 코드 생성기, 퀴즈, 치트시트 같은 기능이 있습니다. [regexr](https://regexr.com/) 는 유사한 기능을 제공하는 또 다른 사이트입니다.


## regulex
또 다른 유용한 도구는 [jex: regulex](https://jex.im/regulex/)로, 정규 표현식을 철도 다이어그램으로 변환해서 패턴을 이해하는 데 시각적인 도움을 제공합니다.

아래 이미지는 이 링크의 스크린샷입니다 — regulex: /\bpar(en|ro)?t\b/

regulex 예제

> [!NOTE]
> [debuggex](https://www.debuggex.com/) 는 유사한 기능을 제공하는 또 다른 사이트입니다.


## regexcrossword  
연습을 위해, [regexcrossword](https://regexcrossword.com/) 가 종종 추천됩니다. 이 사이트는 JavaScript 플레이버만 지원합니다. 도움말은 [regexcrossword: howtoplay](https://regexcrossword.com/howtoplay)를 참조하시기 바랍니다.  


## Summary  
이번 장에는 정규 표현식을 이해하고 대화형으로 해결/디버깅하는 데 도움이 되는 온라인 도구들을 간단히 소개했습니다. 구문과 기능은 다양한 도구와 프로그래밍 언어 사이에서, 때로는 상당히 다르게 나타날 수도 있습니다. 따라서, 여러분이 사용하는 프로그램이 여러분이 사용하는 정규식 플레이버를 지원하는지 반드시 확인하시기 바랍니다.

---

# Working with matched portions
다양한 텍스트를 매치할 수 있는 몇 가지 기능을 살펴 봤습니다. 이번 장에는 매치된 부분을 추출하고, 그것을 다루는 방법을 배우게 될 것입니다. 세 가지 새로운 메서드가 소개됩니다. 또한, `replace()` 메서드의 치환 부분에서 함수와 사전 기능을 사용하는 몇 가지 요령도 배우게 될 것입니다.


## match() method
`match()` 메서드는 여러 가지 방식으로 사용할 수 있습니다. `g` 플래그가 사용되지 않고, 정규 표현식이 성공하면, 첫 번째 매치된 부분에 대한 다양한 세부 정보를 담은 배열 객체를 얻습니다.  

```js
// 'g' 플래그가 사용되지 않았음을 주의
> 'too soon a song snatch'.match(/so+n/)
< ['soon', index: 4, input: 'too soon a song snatch', groups: undefined]

// 매치된 부분만 얻으려면
> 'too soon a song snatch'.match(/so+n/)[0]
< 'soon'

// 비-정규식 객체는 RegExp(object)로 처리됨
> 'too soon a song snatch'.match('so+n')
< ['soon', index: 4, input: 'too soon a song snatch', groups: undefined]
```

- **index** 속성은 매치된 부분의 시작 위치를 알려줍니다.
  
- **input** 속성은 `match()` 메서드가 사용된 입력 문자열을 제공합니다.  

- 주어진 정규 표현식이 실패하면, 출력은 빈 배열이 아니라, **null** 입니다.  

- **groups** 속성은 *Named capture groups*  절에서 다룹니다.  

-  좀 더 많은 세부 사항과 예시는 [MDN: match](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) 문서를 참고하시기 바랍니다.  

```js
> let s1 = 'cat and dog'

> s1.match(/dog/).index
< 8
> s1.match(/dog/).input
< 'cat and dog'

> s1.match(/xyz/)
< null
```

## search() method
`search()` 메서드는 첫 번째 매치된 부분의 인덱스를 반환합니다. 정규 표현식이 실패하면 출력으로 **-1** 을 반환합니다.  

```js
// match(/dog/).index 와 동일
> 'cat and dog'.search(/dog/)
< 8

// 여기서는 match(/xyz/).index 를 사용할 수 없음
// 정규식이 매치되지 않으면 'match' 는 'null' 을 반환하기 때문
> 'cat and dog'.search(/xyz/)
< -1
```

## Capture groups
`()` 그룹핑은 **캡처 그룹(capture group)** 이라 불립니다. 여러 가지 용도가 있는데, 그 중 하나는 해당 그룹에서 매치된 부분을 다룰 수 있다는 점입니다. 캡처 그룹이 `match()` 메서드와 함께 사용되면, 그 그룹에서 매치된 부분들도 배열 출력의 일부가 됩니다. 배열의 첫 번째 요소는 항상 전체 매치된 부분이고, 그 뒤에 그룹들에 의해 캡처된 텍스트가 (존재한다면) 이어집니다.  

```js
> let motivation = 'improve yourself.'

> motivation.match(/pr.*our/)
< ['prove your', index: 2, input: 'improve yourself.', groups: undefined]

// 전체 매치된 부분 가져오기
> motivation.match(/pr.*our/)[0]
< 'prove your'
```

캡처 그룹 예입니다. 가장 왼쪽의 `(` 는 그룹 번호 1 을 갖게 되고, 두 번째 왼쪽의 `(` 는 그룹 번호 2 를 갖는 방식입니다.  

```js
> let purchase = 'coffee:100g tea:250g sugar:75g chocolate:50g'

// 여기서는 세 개의 캡처 그룹이 사용됨
> let m = purchase.match(/:(.*?)g.*?:(.*?)g.*?chocolate:(.*?)g/)
> m
< [':100g tea:250g sugar:75g chocolate:50g', '100', '250', '50', index: 6,
   input: 'coffee:100g tea:250g sugar:75g chocolate:50g', groups: undefined]

// 캡처 그룹 부분
> m[1]
< '100'
> m[3]
< '50'
```


## d flag
`d` 플래그를 사용해서 매치된 부분들의 시작 위치와 끝 위치 둘 다를 얻을 수 있습니다. 끝 위치는 매치된 부분의 길이를 시작 인덱스에 더해서 계산합니다. 다음은 예입니다:  

```js
// 'indices' 속성이 추가된 것에 주목
> 'awesome'.match(/so/d)
< ['so', index: 3, input: 'awesome', groups: undefined, indices: Array(1)]

// 전체 매치된 부분의 시작과 끝+1 위치
> 'awesome'.match(/so/d).indices[0]
< [3, 5]
```

그리고 캡처 그룹이 사용된 경우의 예입니다:  

```js
> 'coffee:100g tea:250g'.match(/:(.*?)g/d)
< [':100g', '100', index: 6, input: 'coffee:100g tea:250g',
   groups: undefined, indices: Array(2)]

// 전체 매치의 위치
> 'coffee:100g tea:250g'.match(/:(.*?)g/d).indices[0]
< [6, 11]

// 첫 번째 캡처 그룹의 위치
> 'coffee:100g tea:250g'.match(/:(.*?)g/d).indices[1]
< [7, 10]
```

## Getting all the matched portions
`match()` 메서드는 `g` 플래그가 사용될 때, 모든 매치된 부분을 반환합니다. 캡처 그룹 부분들과 세 가지 속성들은 출력의 일부가 되지 않습니다.  

```js
> 'too soon a song snatch'.match(/so*n/g)
< ['soon', 'son', 'sn']

> 'too soon a song snatch'.match(/so+n/g)
< ['soon', 'son']

> 'PAR spar apparent SpArE part pare'.match(/\bs?pare?\b/ig)
< ['PAR', 'spar', 'SpArE', 'pare']

// 캡처 그룹이 사용되더라도 전체 매치된 부분이 반환됨
> 'par spar apparent spare part'.match(/\bs?par(e|t)\b/g)
< ['spare', 'part']
```

이것은 디버깅 목적에 유용합니다. 예를 들어, `replace()` 메서드를 사용하기 전에 잠재적인 매치들을 확인할 수 있습니다.  

```js
> 'green:3.14:teal::brown:oh!:blue'.match(/:.*:/g)
< [':3.14:teal::brown:oh!:']

> 'green:3.14:teal::brown:oh!:blue'.match(/:.*?:/g)
< [':3.14:', '::', ':oh!:']
```

## matchAll() method
`g` 플래그가 활성화된 상태에서 모든 매치에 캡처 그룹 부분과 속성이 필요하다면, `matchAll()` 메서드를 사용합니다. 출력으로 이터레이터가 반환됩니다.

```js
> 'song too soon snatch'.matchAll(/so*n/g)
< RegExpStringIterator {}

// 이터레이터 결과를 배열의 배열로 변환
> let arr = [...'song too soon snatch'.matchAll(/so*n/g)]
> arr
< (3) [Array(1), Array(1), Array(1)]
  0: ['son', index: 0, input: 'song too soon snatch', groups: undefined]
  1: ['soon', index: 9, input: 'song too soon snatch', groups: undefined]
  2: ['sn', index: 14, input: 'song too soon snatch', groups: undefined]
  length: 3
  [[Prototype]]: Array(0)

// 첫 번째 매치에 대한 세부 정보를 가진 배열 얻기
> arr[0]
< ['son', index: 0, input: 'song too soon snatch', groups: undefined]
// 두 번째 매치의 시작 인덱스 얻기
> arr[1].index
< 9
```

또한, `Array.from()` 메소드를 사용해서 이터레이터를 배열 객체로 변환할 수 있습니다. 이것은 두 번째 인자로 매핑 함수를 제공할 수 있게 해줍니다.

```js
// match(/so*n/g)와 동일
> Array.from('song too soon snatch'.matchAll(/so*n/g), m => m[0])
< ['son', 'soon', 'sn']
// 각 매치의 시작 인덱스 얻기
> Array.from('song too soon snatch'.matchAll(/so*n/g), m => m.index)
< [0, 9, 14]

// 각 매치에 대해 캡처 그룹 부분만 배열로 얻기
> Array.from('2023/04,1986/Mar,'.matchAll(/(.*?)\/(.*?),/g), m => m.slice(1))
< (2) [Array(2), Array(2)]
  0: (2) ['2023', '04']
  1: (2) ['1986', 'Mar']
  length: 2
  [[Prototype]]: Array(0)
```

> [!NOTE]
> `matchAll()` 메서드가 도입되기 전에, `exec()` 메서드를 사용해야 했습니다. 자세한 내용과 예는 [MDN: exec](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) 를 참조하시기 바랍니다.


## split() with capture groups
캡처 그룹은 `split()` 메서드에 영향을 미칩니다. 분할에 사용된 패턴이 캡처 그룹을 포함한다면, 그 그룹에 의해 매치된 부분도 출력 배열의 일부가 됩니다.

```js
// 캡처 그룹 없이
> '31111111111251111426'.split(/1*4?2/)
< ['3', '5', '6']

// 출력에 패턴의 매치된 부분도 포함시키기
> '31111111111251111426'.split(/(1*4?2)/)
< ['3', '11111111112', '5', '111142', '6']
```

패턴의 일부가 캡처 그룹 밖에 있다면, 그렇게 매치된 텍스트는 출력에 포함되지 않습니다. 캡처 그룹이 참여하지 않았다면, 출력 배열에서 `undefined` 으로 표시됩니다.

```js
// 여기서 4?2 는 캡처 그룹 밖에 있으므로, 그 부분은 출력에 포함되지 않음
> '31111111111251111426'.split(/(1*)4?2/)
< ['3', '1111111111', '5', '1111', '6']

// 여러 캡처 그룹 예시
// b+ 에 의해 매치된 부분이 출력에 존재하지 않음을 주의
> '3.14aabccc42'.split(/(a+)b+(c+)/)
< ['3.14', 'aa', 'ccc', '42']

// 여기서 (4)? 는 첫 번째 경우에 0회 매치됨
> '31111111111251111426'.split(/(1*)(4)?2/)
< ['3', '1111111111', undefined, '5', '1111', '4', '6']
```

캡처 그룹과 선택적인 limit 인자의 사용은 입력 문자열을 세 부분으로 분할하는 데 도움이 될 수 있습니다:

- **첫 번째 매치 이전 부분**

- **패턴 자체에 의해 매치된 부분**

- **패턴 이후의 부분**

```js
// 필요하다면 's' 플래그도 사용
> '3.14aabccc42abc88'.split(/(a+b+c+)(.*)/, 3)
< ['3.14', 'aabccc', '42abc88']
```

## Using functions in the replacement section
가끔 단순한 치환 문자열만으로 충분하지 않고, 매치된 부분에 약간의 처리가 필요할 때가 있습니다. 이런 경우에는 치환 섹션에서 함수를 사용할 수 있습니다. 함수에 제공되는 인자들은 `match()` 메서드가 제공하는 상세 정보와 유사합니다. 첫 번째 인자는 전체 매치된 부분입니다. 캡처 그룹이 사용되면, 그 그룹에 의해 매치된 부분들이 그 다음에 옵니다. 그 다음에는 매치된 부분의 인덱스가 오고, 마지막으로 입력 문자열이 옵니다. 복잡도에 따라, 완전히 정의된 함수나 화살표 함수 표현식을 사용할 수 있습니다.

```js
> function titleCase(m) {
      return m[0].toUpperCase() + m.substr(1).toLowerCase()
  }

// 두 번째 인자로는 함수 이름만으로 충분합니다
// 매치된 부분의 상세 정보가 자동으로 함수에 전달됩니다
// 이 예제에서 'titleCase' 는 전체 매치된 부분만을 사용합니다
> 'aBc ac ADC aBbBC'.replace(/a.*?c/ig, titleCase)
< 'Abc Ac Adc Abbbc'

// 간단한 경우에는 화살표 함수 표현식도 사용할 수 있습니다
> 'abc ac adc abbbc'.replace(/ab*c/g, m => m.toUpperCase())
< 'ABC AC adc ABBBC'

// \d는 나중에 다룰 것입니다
// 지금은 숫자 문자 전체와 매치된다는 것만 알면 됩니다
> '1 42 317'.replace(/\d+/g, m => m*2)
< '2 84 634'
```

다음은 캡처 그룹을 사용한 예제입니다. 더 자세한 내용은 [MDN: replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)를 참조하시기 바랍니다.

```js
> function titleCase(m, g1, g2) {
        return g1.toUpperCase() + g2.toLowerCase()
  }
> 'aBc ac ADC aBbBC'.replace(/(a)(.*?c)/ig, titleCase)
< 'Abc Ac Adc Abbbc'
```

## Using dictionary in the replacement section
대체 섹션에서 필요한 기능은 때때로 사전(dictionary)을 사용해서 단순화할 수 있습니다. 매치된 부분은 사전에서 해당 값을 얻기 위한 키로 작동합니다.

```js
// 일대일 매핑
> let h = { '1': 'one', '2': 'two', '4': 'four' }

> '9234012'.replace(/1|2|4/g, k => h[k])
< '9two3four0onetwo'

// 매치된 텍스트가 키로 존재하지 않으면, 기본값이 사용됩니다
// \d 가 모든 숫자 문자와 매치된다는 것을 상기하세요
> '9234012'.replace(/\d/g, k => k in h ? h[k] : 'X')
< 'XtwoXfourXonetwo'
```

중간 결과를 사용하지 않고 두 개 이상의 부분을 교환해야 할 때는, 사전을 사용하는 것이 권장됩니다.

```js
> let swap = { 'cat': 'tiger', 'tiger': 'cat' }

> 'cat tiger dog tiger cat'.replace(/cat|tiger/g, k => swap[k])
< 'tiger cat dog cat tiger'
```

많은 항목을 가진 사전이고 개발 중에 변경될 가능성이 높다면, 교차 목록(alternation)을 수동으로 만드는 것이 좋은 선택이 아닙니다. 또한, 우선순위 규칙에 따라 가장 긴 길이의 문자열이 먼저 와야 한다는 것도 상기하시기 바랍니다. 동적으로 교차 목록 만들기 섹션에서 소개된 `unionRegExp()` 함수가 도움이 됩니다.

```js
> let d = { 'hand': 1, 'handy': 2, 'handful': 3, 'a^b': 4 }

// 우선순위 규칙을 처리하기 위해 키를 정렬
// 필요하다면 앵커를 추가
> const p = unionRegExp(Object.keys(d).sort((a, b) => b.length - a.length))
> console.log(p)
< handful|handy|hand|a\^b

> 'handful hand pin handy (a^b)'.replace(new RegExp(p, 'g'), k => d[k])
< '3 1 pin 2 (4)'
```

## Cheatsheet and Summary
**Note** | **Description**  
---|---  
`m = s.match(/pat/)` | g 플래그가 사용되지 않았고 정규식이 성공한다고 가정하면, 매치된 부분과 3개의 속성을 가진 배열을 반환한다  
`index` 속성 | 매치의 시작 위치를 제공한다  
`input` 속성 | 입력 문자열 `s`를 제공한다  
`groups` 속성 | 명명된 캡처 그룹들의 사전을 제공한다  
`m[0]` | 위의 경우, 전체 매치된 부분을 제공한다  
`m[1]` | 첫 번째 캡처 그룹의 매치된 부분  
`m[2]` | 두 번째 캡처 그룹의 매치된 부분, 그리고 계속 이어진다  
`d` 플래그 | `indices` 속성을 통해 매치된 부분들의 시작과 끝 위치를 얻는다  
`s.match(/pat/g)` | 매치된 부분들만 반환하며, 속성은 없다. 캡처 그룹은 출력에 영향을 주지 않는다. 정규식이 실패하면 `match`는 `null`을 반환한다  
`s.matchAll(/pat/g)` | 각 매치된 부분과 그 속성들에 대한 세부 정보를 포함하는 이터레이터를 반환한다. `[...]` 또는 `Array.from()`을 사용하여 배열로 변환할 수 있다. `Array.from()`은 매핑 함수를 허용하기도 한다  
`s.replace(/pat/, func)` | 치환 문자열을 제공하기 위해 함수를 사용할 수 있다. 각 매치된 부분의 세부 정보가 인자로 전달된다. 비슷하게, 사전을 치환에 사용할 수도 있다  
`s.search(/pat/)` | 정규식이 성공하면 첫 번째 매치의 시작 위치를 제공한다. 정규식이 실패하면 -1을 반환한다  
`split()` | 캡처 그룹은 `split()` 메서드에도 영향을 준다. 그룹들에 의해 매치된 텍스트는 출력의 일부가 된다. 그룹 밖의 패턴에 의해 매치된 부분은 출력에 포함되지 않는다. 매치되지 않은 그룹은 `undefined`로 표시된다  

이번 장에는 입력 문자열의 다양한 매치된 부분을 다룰 수 있게 해주는, `match()` 와 `matchAll()` 메서드를 소개했습니다. `search()` 메서드는 첫 번째 매치의 시작 위치만 필요할 때 유용합니다. 시작과 끝 위치 둘 다 필요하다면, `d` 플래그를 사용할 수 있습니다. `replace()` 메서드는 치환 섹션에서 함수를 사용할 수 있게 해주며, 이를 통해 매치된 부분을 치환 문자열로 사용하기 전에 처리할 수 있습니다. 또한, 사전을 사용해서 매치된 부분을 키로 삼아 치환 문자열을 제공할 수도 있습니다. 캡처 그룹에 대해서도 배웠으며, 앞 장에서 그룹핑의 좀 더 많은 활용법을 보게 될 것입니다.

## Exercises
1) 주어진 문자열에 첫 번째 is 부터 마지막 t 까지의 매치된 부분을 추출하시오.

```js
> let str1 = 'What is the biggest fruit you have seen?'
> let str2 = 'Your mission is to read and practice consistently'

> const pat1 =      // 여기 해답을 추가하세요

// str1에 대한 해답을 여기 추가하세요
< 'is the biggest fruit'
// str2에 대한 해답을 여기 추가하세요
< 'ission is to read and practice consistent'
```

2) 주어진 입력 문자열들에 대해 is 또는 the 또는 was 또는 to 의 첫 번째 발생의 시작 인덱스를 찾으시오. 각 입력 문자열에 대해 최소 한 번의 매치가 있다고 가정하시오.

```js
> let s1 = 'match after the last newline character'
> let s2 = 'and then you want to test'
> let s3 = 'this is good bye then'
> let s4 = 'who was there to see?'

> const pat2 =      // 여기 해답을 추가하세요

// s1에 대한 해답을 여기 추가하세요
< 12
// s2에 대한 해답을 여기 추가하세요
< 4
// s3에 대한 해답을 여기 추가하세요
< 2
// s4에 대한 해답을 여기 추가하세요
< 4
```

3) 주어진 입력 문자열들에 대해 is 또는 the 또는 was 또는 to 의 마지막 발생의 시작 인덱스를 찾으시오. 각 입력 문자열에 대해 최소 한 번의 매치가 있다고 가정하시오.

```js
> let s1 = 'match after the last newline character'
> let s2 = 'and then you want to test'
> let s3 = 'this is good bye then'
> let s4 = 'who was there to see?'

> const pat3 =      // 여기 해답을 추가하세요

// s1에 대한 해답을 여기 추가하세요
< 12
// s2에 대한 해답을 여기 추가하세요
< 18
// s3에 대한 해답을 여기 추가하세요
< 17
// s4에 대한 해답을 여기 추가하세요
< 14
```

4) 주어진 입력 문자열에는 : 가 정확히 한 번 포함되어 있습니다. 출력으로 : 이후의 모든 문자를 추출하시오.

```js
> let ip = 'fruits:apple, mango, guava, blueberry'

// 여기 해답을 추가하세요
< 'apple, mango, guava, blueberry'
```

5) 주어진 입력 문자열에서 ( 과 ) 사이의 모든 단어를 배열로 추출하시오 (괄호를 포함하여). 입력에 깨진 괄호는 포함되지 않는다고 가정하시오.

```js
> let ip = 'another (way) to reuse (portion) matched (by) capture groups'

// 여기 해답을 추가하세요
< ['(way)', '(portion)', '(by)']
```

6) < 의 모든 발생부터 다음에 발생하는 > 까지를 추출하시오, 단 < 와 > 사이에 최소한 하나의 문자가 있어야 합니다.

```js
> let ip = 'a<apple> 1<> b<bye> 2<> c<cat>'

// 여기 해답을 추가하세요
< ['<apple>', '<> b<bye>', '<> c<cat>']
```

7) `matchAll()` 메소드를 사용해서 주어진 입력 문자열들에 대해 아래와 같이 출력을 얻으시오. 입력 문자열들에 사용된 문자들을 주의 깊게 보시오.

```js
> let row1 = '-2,5 4,+3 +42,-53 4356246,-357532354 '
> let row2 = '1.32,-3.14 634,5.63 63.3e3,9907809345343.235 '

> const pat4 =      // 여기 해답을 추가하세요

// row1에 대한 해답을 여기 추가하세요
< (4) [Array(2), Array(2), Array(2), Array(2)]
  0: (2) ['-2', '5']
  1: (2) ['4', '+3']
  2: (2) ['+42', '-53']
  3: (2) ['4356246', '-357532354']
  length: 4
  [[Prototype]]: Array(0)

// row2에 대한 해답을 여기 추가하세요
< (3) [Array(2), Array(2), Array(2)]
  0: (2) ['1.32', '-3.14']
  1: (2) ['634', '5.63']
  2: (2) ['63.3e3', '9907809345343.235']
  length: 3
  [[Prototype]]: Array(0)
```

8) 이전 문제의 확장입니다. 쉼표로 구분된 각 숫자 쌍의 합을 구하시오.

- row1의 경우, 정수의 합을 구하시오. 예를 들어, -2와 5의 합은 3입니다.  

- row2의 경우, 부동소수점 숫자의 합을 구하시오. 예를 들어, 1.32와 -3.14의 합은 -1.82입니다.

```js
> let row1 = '-2,5 4,+3 +42,-53 4356246,-357532354 '
> let row2 = '1.32,-3.14 634,5.63 63.3e3,9907809345343.235 '

 // 이전 문제와 동일해야 함
> const pat5 =      // 여기 해답을 추가하세요

// row1에 대한 해답을 여기 추가하세요
< [3, 7, -11, -353176108]

// row2에 대한 해답을 여기 추가하세요
< [-1.82, 639.63, 9907809408643.234]
```

9) `split()` 메서드를 사용해서 아래와 같이 출력을 얻으시오.

```js
> let ip = '42:no-output;1000:car-tr:u-ck;SQEX49801'

// 여기 해답을 추가하세요
< ['42', 'output', '1000', 'tr:u-ck', 'SQEX49801']
```

10) 주어진 입력을 교대 대소문자로 변경하는 문자열 함수를 작성하시오. 첫 번째 알파벳은 소문자로, 다음은 대문자, 그 다음은 소문자, 이런 식으로 변경하시오. 알파벳이 아닌 문자는 그대로 두며 대소문자 변경에 영향을 주지 않아야 합니다.

```js
> function aLtErNaTeCaSe(ip) {
      // 여기 해답을 추가하세요
  }

> aLtErNaTeCaSe('HI THERE!')
< 'hI tHeRe!'
> aLtErNaTeCaSe('good morning')
< 'gOoD mOrNiNg'
> aLtErNaTeCaSe('Sample123string42with777numbers')
< 'sAmPlE123sTrInG42wItH777nUmBeRs'
```

11) par의 모든 발생을 spar 로, spare 를 extra 로, park 를 garden 으로 치환하시오.

```js
> let s1 = 'apartment has a park'
> let s2 = 'do you have a spare cable'
> let s3 = 'write a parser'

> let d1 =          // 여기 해답을 추가하세요
> const pat6 =      // 여기 해답을 추가하세요

> s1.replace(pat6, k => d1[k])
< 'aspartment has a garden'
> s2.replace(pat6, k => d1[k])
< 'do you have a extra cable'
> s3.replace(pat6, k => d1[k])
< 'write a sparser'
```

12) match() 메서드와 함께 사용하여 매치된 부분들의 시작과 끝 위치를 모두 얻을 수 있는 플래그와 속성의 이름을 쓰시오.









  
