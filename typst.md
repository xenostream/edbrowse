# 튜토리얼  
Typst 튜토리얼에 오신 것을 환영합니다! 이 튜토리얼에서는 Typst로 문서를 작성하고 서식을 지정하는 방법을 배웁니다. 일상적인 작업부터 시작하여 점차 더 고급 기능을 소개할 것입니다. 이 튜토리얼은 Typst, 다른 마크업 언어 또는 프로그래밍에 대한 사전 지식을 필요로 하지 않습니다. 단지 텍스트 파일을 편집할 줄 안다고 가정합니다.

시작하는 가장 좋은 방법은 Typst 앱에 무료로 가입하고 아래의 단계에 따라 진행하는 것입니다. 앱은 즉시 미리 보기, 구문 강조, 유용한 자동 완성 기능을 제공합니다. 또는 오픈소스 CLI를 사용하여 로컬 텍스트 편집기에서 따라할 수도 있습니다.

## Typst를 언제 사용할까  
시작하기 전에 Typst가 무엇이며 언제 사용하는지 알아봅시다. Typst는 문서 조판을 위한 마크업 언어입니다. 배우기 쉽고, 빠르며, 다재다능하도록 설계되었습니다. Typst는 마크업이 포함된 텍스트 파일을 PDF로 출력합니다.

Typst는 에세이, 기사, 과학 논문, 책, 보고서, 과제와 같은 장문의 글을 작성할 때 좋은 선택입니다. 또한 수학, 물리학, 공학 분야의 논문과 같이 수학적 표기법이 포함된 문서에 적합합니다. 마지막으로 강력한 스타일링 및 자동화 기능 덕분에 책 시리즈처럼 공통 스타일을 공유하는 문서 집합에도 탁월한 선택입니다.

## 배울 내용  
이 튜토리얼은 네 개의 챕터로 구성되어 있으며, 각 챕터는 이전 내용을 기반으로 확장됩니다. 각 챕터에서 배우게 될 내용은 다음과 같습니다:

1. Typst로 작성하기: 텍스트를 작성하고 이미지, 수식 및 기타 요소를 삽입하는 방법을 배우세요.  
1. 서식 지정: 글꼴 크기, 제목 스타일 등 문서 서식을 조정하는 방법을 배우세요.  
1. 고급 스타일링: 저자 목록과 들여쓰기 제목 등 전형적인 특성이 포함된 과학 논문을 위한 복잡한 페이지 레이아웃을 만드세요.  
1. 템플릿 만들기: 이전 챕터에서 만든 논문을 기반으로 재사용 가능한 템플릿을 만드세요.  

Typst를 즐겁게 사용하길 바랍니다!

---

# Typst로 작성하기  
자, 시작해봅시다! 당신은 대학에서 기술 보고서를 작성하라는 과제를 받았다고 가정해봅시다. 그 보고서에는 산문, 수학식, 제목, 도표 등이 포함될 것입니다. 시작하려면 Typst 앱에서 새 프로젝트를 만듭니다. 그러면 편집기로 이동하며, 두 개의 패널을 볼 수 있습니다: 문서를 작성하는 소스 패널과 렌더링된 문서를 보여주는 미리보기 패널입니다.

![](./images/img_20250731_211602.jpg)

이미 보고서에 대한 훌륭한 관점이 떠올랐습니다. 그럼 서론을 작성하면서 시작해봅시다. 편집기 패널에 텍스트를 입력하세요. 입력한 텍스트는 즉시 미리보기 페이지에 나타납니다.

```typst
In this report, we will explore the  
various factors that influence fluid  
dynamics in glaciers and how they  
contribute to the formation and  
behaviour of these natural structures.  
```

![](./images/img_20250731_211654.jpg)

튜토리얼 전반에 걸쳐 위와 같은 코드 예시를 보여줄 것입니다. 앱과 마찬가지로 첫 번째 패널에는 마크업이 포함되어 있고 두 번째 패널에는 미리보기가 표시됩니다. 예시를 확인할 수 있도록 페이지 크기를 축소했습니다.

다음 단계는 제목을 추가하고 일부 텍스트를 강조하는 것입니다. Typst는 가장 일반적인 서식 작업을 위해 간단한 마크업을 사용합니다. 제목을 추가하려면 = 문자를 입력하고, 텍스트를 기울임꼴로 강조하려면 _밑줄_로 감싸세요.

```typst
= Introduction  
In this report, we will explore the  
various factors that influence _fluid  
dynamics_ in glaciers and how they  
contribute to the formation and  
behaviour of these natural structures.  
```

![](./images/img_20250731_211730.jpg)


쉽죠! 새 단락을 추가하려면 텍스트 두 줄 사이에 빈 줄을 삽입하면 됩니다. 해당 단락에 부제목이 필요하다면 = 대신 ==를 입력하세요. = 문자의 개수가 제목의 계층 수준을 결정합니다.

이제 빙하 역학에 영향을 미치는 몇 가지 요인을 나열해봅시다. 이를 위해 번호 매기기 목록을 사용합니다. 목록의 각 항목에 대해 줄의 시작에 + 문자를 입력하면 Typst가 항목에 자동으로 번호를 매깁니다.

```typst
+ The climate  
+ The topography  
+ The geology 
```

![](./images/img_20250731_211759.jpg)


글머리 기호 목록을 추가하려면 + 대신 - 문자를 사용하면 됩니다. 목록을 중첩시킬 수도 있습니다. 예를 들어 위 목록의 첫 항목에 하위 목록을 추가하려면 들여쓰기 하세요.

```typst
+ The climate  
  - Temperature  
  - Precipitation  
+ The topography  
+ The geology  
```

![](./images/img_20250731_211819.jpg)


## 그림 추가하기  
보고서에 그림이 들어가면 좋겠다고 생각했군요. 그럼 추가해봅시다. Typst는 PNG, JPEG, GIF, SVG 형식의 이미지를 지원합니다. 프로젝트에 이미지 파일을 추가하려면 왼쪽 사이드바에 있는 상자 아이콘을 클릭해 파일 패널을 여세요. 여기에서 프로젝트에 있는 모든 파일 목록을 볼 수 있습니다. 현재는 작성 중인 Typst 메인 파일만 있습니다. 다른 파일을 업로드하려면 오른쪽 상단에 있는 화살표 버튼을 클릭하세요. 이 버튼을 클릭하면 컴퓨터에서 업로드할 파일을 선택할 수 있는 업로드 대화상자가 열립니다. 보고서에 사용할 이미지 파일을 선택하세요.

![](./images/img_20250731_211838.jpg)


이전에 봤듯이 Typst에서는 특정 기호(마크업)가 특별한 의미를 가집니다. =, -, +, _ 기호를 이용해 각각 제목, 목록, 강조 텍스트를 만들 수 있습니다. 하지만 문서에 넣고 싶은 모든 요소에 대해 고유의 기호를 만들면 너무 복잡해지겠죠. 그래서 Typst는 흔한 작업에만 마크업 기호를 할당하고, 나머지는 함수로 처리합니다. 그림을 넣으려면 Typst의 `image` 함수를 사용하면 됩니다.

```typst
#image("glacier.jpg")
```

![](./images/img_20250731_211908.jpg)

일반적으로 함수는 인자를 받아서 결과를 출력합니다. 마크업 내에서 함수를 호출하면 Typst가 결과값을 문서에 삽입합니다. 여기서 `image` 함수는 하나의 인자, 즉 이미지 파일 경로를 받습니다. 함수를 마크업에서 호출하려면 먼저 `#` 문자를 입력하고 함수 이름을 바로 적은 다음, 괄호로 인자를 감쌉니다. Typst는 여러 종류의 데이터 타입을 인자로 인식할 수 있는데, 파일 경로는 짧은 문자열이므로 큰따옴표로 감싸야 합니다.

삽입된 이미지는 기본적으로 페이지 너비 전체를 사용합니다. 너비를 조정하려면 `image` 함수에 `width` 인자를 전달하면 됩니다. 이 인자는 이름이 붙은 인자(name: value 쌍)입니다. 여러 인자가 있을 경우 쉼표로 구분하므로 먼저 경로 뒤에 쉼표를 넣어야 합니다.

```typst
#image("glacier.jpg", width: 70%)
```

![](./images/img_20250731_211927.jpg)

`width` 인자는 상대적인 길이입니다. 위 예에서는 퍼센트를 지정해 이미지가 페이지 너비의 70%만 차지하게 했습니다. 절대값(`1cm`, `0.7in` 등)도 사용할 수 있습니다.

텍스트처럼, 이미지도 기본적으로 페이지 왼쪽에 정렬됩니다. 또, 캡션이 없습니다. 이 부분은 `figure` 함수를 사용해 보완할 수 있습니다. `figure` 함수는 그림 내용은 위치 인자로, 캡션은 선택적 이름 인자로 받습니다.

함수의 인자 목록 안에서는 Typst가 이미 코드 모드이므로 `image` 함수 앞의 `#`를 제거해야 합니다. `#`는 마크업 텍스트에서만 필요합니다(함수 호출을 명확히 하기 위해).

캡션은 마크업으로 구성됩니다. 함수에 마크업을 전달하려면 대괄호로 감싸야 합니다. 이를 콘텐츠 블록이라고 합니다.


```typst
#figure(
  image("glacier.jpg", width: 70%),
  caption: [
    _Glaciers_ form an important part
    of the earth's climate system.
  ],
)
```

![](./images/img_20250731_211956.jpg)


보고서를 계속 작성하다 보면 그림을 참조해야 할 때가 있겠죠. 그림에 참조를 달려면 먼저 그림에 레이블을 붙입니다. 레이블은 문서 내 요소를 고유하게 식별해줍니다. 함수 뒤에 꺾쇠(`<>`)로 감싼 이름을 추가하면 됩니다. 이후 텍스트에서는 `@` 기호 뒤에 이름을 써서 해당 그림을 참조할 수 있습니다. 제목이나 수식에도 레이블을 붙일 수 있습니다.

```typst
Glaciers as the one shown in
@glaciers will cease to exist if
we don't take action soon!

#figure(
  image("glacier.jpg", width: 70%),
  caption: [
    _Glaciers_ form an important part
    of the earth's climate system.
  ],
) <glaciers>
```

![](./images/img_20250731_212015.jpg)

> [!NOTE]
> 지금까지 함수에 콘텐츠 블록(대괄호 안의 마크업)과 문자열(큰따옴표 안의 텍스트)을 전달해봤습니다. 둘 다 텍스트를 포함할 수 있지만, 차이가 있습니다.
> 
> - 콘텐츠 블록은 텍스트 외에도 마크업, 함수 호출 등 다양한 요소를 포함할 수 있습니다.  
> - 문자열은 단순한 문자들의 나열일 뿐입니다.
> 
> 예를 들어 `image` 함수는 이미지 파일 경로를 기대합니다. 텍스트 단락이나 또 다른 이미지를 경로 인자로 넘기는 것은 말이 되지 않기 때문에 문자열만 허용됩니다. 반대로 콘텐츠를 기대하는 곳에서는 문자열도 유효한 콘텐츠로 인식되므로 사용할 수 있습니다.


## 참고 문헌 추가하기  
보고서를 작성하면서 몇 가지 주장에 근거를 제시해야 합니다. `bibliography` 함수를 사용하면 문서에 참고 문헌을 추가할 수 있습니다. 이 함수는 참고 문헌 파일의 경로를 인자로 받습니다.

Typst의 기본 참고 문헌 형식은 Hayagriva이지만 호환성을 위해 BibLaTeX 파일도 사용할 수 있습니다. 마침 같은 반 친구가 문헌 조사를 마친 후 `.bib` 파일을 보내줬기 때문에 그 파일을 사용하면 됩니다. 파일 패널을 통해 업로드하면 Typst에서 접근할 수 있습니다.

문서에 참고 문헌이 포함되면 인용을 시작할 수 있습니다. 인용 구문은 레이블 참조 방식과 동일합니다. 출처를 처음 인용하면 해당 항목이 문서의 참고 문헌 섹션에 자동으로 추가됩니다. Typst는 다양한 인용 및 참고 문헌 스타일을 지원합니다. 더 자세한 사항은 참조 문서를 확인하세요.

```typst
= Methods
We follow the glacier melting models
established in @glacier-melt.

#bibliography("works.bib")
```

![](./images/img_20250731_212117.jpg)


## 수학  
방법 섹션을 작성한 후, 문서의 핵심인 수식으로 넘어갑니다. Typst는 내장 수학 조판 기능을 가지고 있으며 자체 수학 표기법을 사용합니다. 간단한 수식부터 시작해봅시다. 수식은 `$` 기호로 감싸서 Typst에게 수학 표현임을 알려줍니다.

```typst
The equation $Q = rho A v + C$
defines the glacial flow rate.
```

![](./images/img_20250731_212148.jpg)

이 수식은 주변 텍스트와 같은 줄에 표시됩니다. 별도의 줄에 표시하고 싶다면 수식 앞뒤에 공백을 추가하세요:

```typst
The flow rate of a glacier is
defined by the following equation:

$ Q = rho A v + C $
```

![](./images/img_20250731_212207.jpg)

Typst는 단일 문자인 Q, A, v, C는 그대로 표시하고, rho는 그리스 문자로 변환합니다. 수학 모드에서는 단일 문자는 그대로 나타내며, 여러 문자로 구성된 단어는 기호, 변수 또는 함수 이름으로 해석됩니다. 단일 문자 간 곱셈을 나타내려면 사이에 공백을 넣으세요.

복수 문자로 구성된 변수를 사용하려면 큰따옴표로 감싸면 됩니다:

```typst
$ Q = rho A v + "time offset" $
```

![](./images/img_20250731_212230.jpg)

논문에 합산 공식도 필요하겠죠. 합산 기호와 함께 아래첨자와 위첨자를 사용해 합산 범위를 지정할 수 있습니다:

```typst
Total displaced soil by glacial flow:

$ 7.32 beta +
  sum_(i=0)^nabla Q_i / 2 $
```

![](./images/img_20250731_212245.jpg)

아래첨자는 `_` 문자 뒤에 쓰고, 위첨자는 `^` 문자 뒤에 씁니다. 여러 항목으로 구성된 아래/위첨자는 괄호 `( )`로 감싸야 합니다.

위 예시에서는 분수를 삽입하는 방법도 보여줍니다. 분자는 분모 앞에 `/` 문자를 사용하면 Typst가 자동으로 분수로 변환합니다. 괄호는 똑똑하게 해석되므로 계산기처럼 수식을 입력하면 Typst가 괄호로 묶인 부분을 적절한 표기로 바꿔줍니다.

```typst
Total displaced soil by glacial flow:

$ 7.32 beta +
  sum_(i=0)^nabla
    (Q_i (a_i - epsilon)) / 2 $
```

![](./images/img_20250731_212311.jpg)

모든 수학 표현에 특수 문법이 있는 것은 아닙니다. 이미지 함수처럼 수학에서도 다양한 함수를 사용합니다. 수학 모드 내에서는 함수 이름 앞에 `#`를 붙일 필요가 없습니다.

```typst
$ v := vec(x_1, x_2, x_3) $
```

![](./images/img_20250731_212359.jpg)

일부 함수는 수학 모드에서만 사용할 수 있습니다. 예를 들어 `cal` 함수는 집합에 자주 사용하는 장식 문자(calligraphic letter)를 조판할 때 사용합니다. 수학 관련 함수 목록은 참조 문서의 수학 섹션에서 확인할 수 있습니다.

기호 중 일부는 다양한 변형이 있습니다. 예를 들어 화살표는 이름 뒤에 점(`.`)과 수정자 이름을 붙이면 됩니다:

```typst
$ a arrow.squiggly b $
```

![](./images/img_20250731_212414.jpg)

이 표기법은 마크업 모드에서도 사용할 수 있지만, 그 경우에는 `#sym.` 접두어를 붙여야 합니다. 사용 가능한 기호 목록은 심볼 섹션에서 확인하세요.

## 리뷰  
이제 Typst에서 기본 문서를 작성하는 방법을 익혔습니다. 강조 텍스트, 목록 작성, 이미지 삽입, 콘텐츠 정렬, 수학 수식 조판 등을 배웠으며 Typst의 함수들도 이해했습니다. Typst는 표, 도형, 코드 블록 등 더 많은 종류의 콘텐츠도 문서에 삽입할 수 있습니다. 이 외 기능들이 궁금하다면 참조 문서를 살펴보세요.

현재 보고서 작성을 완료했고 오른쪽 상단의 다운로드 버튼을 눌러 PDF도 저장했습니다. 하지만 보고서 외형이 다소 밋밋하게 느껴진다면, 다음 섹션에서는 문서 외관을 사용자 정의하는 방법을 알아보겠습니다.


---


# 서식 지정하기  
지금까지 일부 텍스트, 몇 개의 수식과 이미지가 포함된 보고서를 작성했습니다. 하지만 여전히 매우 단순하게 보입니다. 조교는 당신이 새로운 조판 시스템을 사용하고 있다는 사실을 모릅니다. 당신의 보고서가 다른 학생들의 제출물과 잘 어울리기를 바랍니다. 이번 장에서는 Typst의 스타일링 시스템을 사용하여 보고서의 서식을 지정하는 방법을 살펴보겠습니다.

## 설정 규칙  
앞서 본 것처럼 Typst에는 콘텐츠를 삽입하는 함수(예: image 함수)와 인자로 받은 콘텐츠를 조작하는 함수(예: align 함수)가 있습니다. 글꼴을 변경하고 싶다면 문서 전체를 해당 함수로 감싸는 방법을 떠올릴 수 있습니다.

```typst
#text(font: "New Computer Modern")[
  = Background
  In the case of glaciers, fluid
  dynamics principles can be used
  to understand how the movement
  and behaviour of the ice is
  influenced by factors such as
  temperature, pressure, and the
  presence of other fluids (such as
  water).
]
```

![](./images/img_20250731_212512.jpg)

잠깐만요, 함수의 모든 인자는 괄호 안에서 지정되어야 하지 않나요? 왜 괄호 다음에 콘텐츠가 포함된 또 다른 대괄호가 있을까요? 콘텐츠를 함수에 전달하는 일이 Typst에서 매우 흔하기 때문에 특별한 문법이 마련되어 있습니다. 콘텐츠를 인자 목록 안에 넣는 대신, 일반 인자 뒤에 바로 대괄호를 사용해 쓸 수 있습니다.

위와 같은 방식은 작동합니다. text 함수를 사용하면 해당 블록 내의 모든 텍스트에 대해 글꼴을 조정할 수 있습니다. 하지만 문서 전체를 여러 함수로 감싸고 스타일을 부분적으로 적용하는 방식은 곧 번거로워집니다.

다행히도 Typst에는 더 깔끔한 방법이 있습니다. 설정 규칙(set rules)을 사용하면 특정 콘텐츠 유형에 대해 스타일 속성을 일괄 적용할 수 있습니다. 설정 규칙은 `set` 키워드 다음에 스타일 속성을 설정할 함수 이름, 괄호 안의 인자 목록으로 구성됩니다.

```typst
#set text(
  font: "New Computer Modern"
)

= Background
In the case of glaciers, fluid
dynamics principles can be used
to understand how the movement
and behaviour of the ice is
influenced by factors such as
temperature, pressure, and the
presence of other fluids (such as
water).
```

![](./images/img_20250731_212530.jpg)

> [!INFO]
> 좀 더 기술적인 용어로 설명하면, 설정 규칙은 해당 함수의 일부 인자에 대한 기본값을 모든 이후 호출에 적용하는 것입니다.

## 자동 완성 패널  
앱에서 따라해 보면서 몇 가지를 시도해봤다면, `#` 문자를 입력할 때마다 사용 가능한 함수와 인자들을 보여주는 패널이 나타나는 것을 확인했을 겁니다. 이것이 자동 완성 패널입니다. 문서를 작성하면서 매우 유용하게 사용할 수 있습니다. Return 키를 눌러 제안을 적용하거나, 화살표 키로 원하는 항목으로 이동할 수 있습니다. Escape 키를 눌러 패널을 닫을 수 있으며, 다시 열려면 `#`를 입력하거나 `Ctrl + Space`를 누르세요. 자동 완성 패널을 사용해 각 함수에 적합한 인자를 확인하세요. 대부분의 제안에는 기능에 대한 간단한 설명도 함께 제공됩니다.

![](./images/img_20250731_212632.jpg)


## 페이지 설정  
다시 설정 규칙으로 돌아가서, 규칙을 작성할 때는 스타일링하고자 하는 요소의 종류에 따라 함수를 선택합니다. 다음은 설정 규칙에서 자주 사용되는 함수들입니다:

- text: 글꼴 종류, 크기, 색상 및 기타 텍스트 속성 설정  
- page: 페이지 크기, 여백, 머리말/꼬리말 및 컬럼 활성화  
- par: 문단 정렬, 줄간격 등 설정  
- heading: 제목 스타일 지정 및 번호 매기기 활성화  
- document: PDF 출력물의 메타데이터(제목, 저자 등) 설정

모든 함수 인자가 설정 가능한 것은 아닙니다. 일반적으로, 함수가 작업을 어떻게 수행할지 알려주는 인자만 설정할 수 있습니다. 함수 참조 페이지에서는 어떤 인자가 설정 가능한지를 안내합니다.

문서에 몇 가지 스타일을 더 추가해봅시다. 여백을 넓히고 세리프 글꼴을 적용하고, 예제를 위해 다른 용지 크기도 설정해보겠습니다.

```typst
#set page(
  paper: "a6",
  margin: (x: 1.8cm, y: 1.5cm),
)
#set text(
  font: "New Computer Modern",
  size: 10pt
)
#set par(
  justify: true,
  leading: 0.52em,
)

= Introduction
In this report, we will explore the
various factors that influence fluid
dynamics in glaciers and how they
contribute to the formation and
behaviour of these natural structures.

...

#align(center + bottom)[
  #image("glacier.jpg", width: 70%)

  *Glaciers form an important
  part of the earth's climate
  system.*
]
```

![](./images/img_20250731_212704.jpg)

여기서 주목해야 할 몇 가지 사항이 있습니다.

첫 번째는 page 설정 규칙입니다. 두 개의 인자를 받습니다: 페이지 크기와 여백. 페이지 크기는 문자열로 지정됩니다. Typst는 여러 표준 페이지 크기를 지원하며, 사용자 지정도 가능합니다. 여백은 딕셔너리로 지정됩니다. 딕셔너리는 키-값 쌍의 집합입니다. 이 경우, 키는 `x`와 `y`이며, 값은 각각 수평 및 수직 여백입니다. `left`, `right`, `top`, `bottom` 키를 사용해 각 면의 여백을 따로 지정할 수도 있습니다.

다음은 text 설정 규칙입니다. 여기에서는 글꼴 크기를 `10pt`, 글꼴 종류를 `"New Computer Modern"`으로 설정했습니다. Typst 앱에는 여러 글꼴이 포함되어 있어 문서에 활용할 수 있습니다. 텍스트 함수의 인자 리스트에 있는 상태에서 자동 완성 패널을 통해 사용 가능한 글꼴을 확인할 수 있습니다.

줄 간격(leading)도 설정했습니다. 줄 간격은 길이 값으로 지정되며, 이 예에서는 `em` 단위를 사용했습니다. `1em`은 현재 글꼴 크기(기본 11pt)에 해당합니다.

마지막으로 이미지에 수직 정렬을 추가하여 중앙 정렬에 + 연산자로 결합해 아래쪽 정렬까지 수행했습니다. 수직 및 수평 정렬은 `+` 연산자로 결합해 2차원 정렬을 만들 수 있습니다.


## 약간의 세련미  
문서를 더 명확하게 구성하기 위해 이제 제목에 번호를 매기고자 합니다. 이를 위해 heading 함수의 numbering 인자를 설정합니다.

```typst
#set heading(numbering: "1.")

= Introduction
#lorem(10)

== Background
#lorem(12)

== Methods
#lorem(15)
```

![](./images/img_20250731_212732.jpg)

numbering 인자로 문자열 "1."을 지정했습니다. 이는 Typst에게 각 제목 수준에 아라비아 숫자를 사용하고 점을 구분 기호로 쓰도록 지시합니다. 제목에 문자, 로마 숫자, 기호도 사용할 수 있습니다:

```typst
#set heading(numbering: "1.a")

= Introduction
#lorem(10)

== Background
#lorem(12)

== Methods
#lorem(15)
```

![](./images/img_20250731_212744.jpg)

이 예시에서는 lorem 함수를 사용해 Lorem Ipsum 텍스트를 생성합니다. 이 함수는 숫자를 인자로 받아 해당 수만큼의 단어를 생성합니다.

> [!INFO]
> 왜 heading과 text 설정 규칙이 각 함수로 생성하지 않은 텍스트와 제목에도 적용되는지 궁금하셨나요?
>
> Typst는 사용자가 `= Conclusion`을 입력할 때마다 내부적으로 heading 함수를 호출합니다. 사실 `#heading[Conclusion]` 함수 호출은 위의 heading 마크업과 동일합니다. 다른 마크업 요소들도 마찬가지로 해당 함수 호출의 문법적 설탕(syntax sugar)입니다.


## 표시 규칙  
지금까지의 결과에 어느 정도 만족하고 있을 것입니다. 하지만 마지막으로 고쳐야 할 점이 있습니다: 보고서는 더 큰 프로젝트를 위해 작성되며, 해당 프로젝트의 이름은 로고와 함께 표시되어야 합니다. 심지어 일반 문장 안에서도 말이죠.

가능한 방법을 생각해 봅니다. 검색 후 바꾸기 기능으로 모든 로고 위치 앞에 `#image("logo.svg")`를 삽입할 수 있습니다. 매우 번거롭게 들립니다. 대신 로고와 이미지가 항상 함께 나타나는 사용자 정의 함수를 만들 수도 있습니다. 하지만 훨씬 더 쉬운 방법이 있습니다.

show 규칙을 사용하면 Typst가 특정 요소를 표시하는 방식을 재정의할 수 있습니다. 어떤 요소를 어떻게 다르게 표시할지 지정할 수 있습니다. show 규칙은 텍스트, 다양한 함수, 심지어 문서 전체에도 적용 가능합니다.

```typst
#show "ArtosFlow": name => box[
  #box(image(
    "logo.svg",
    height: 0.7em,
  ))
  #name
]

This report is embedded in the
ArtosFlow project. ArtosFlow is a
project of the Artos Institute.
```

![](./images/img_20250731_212846.jpg)

이 예시에는 새로운 문법이 많습니다: show 키워드 다음에 표시를 변경할 텍스트 문자열과 콜론이 옵니다. 그 후 표시할 콘텐츠를 인자로 받는 함수를 작성합니다. 여기서는 그 인자를 `name`이라고 불렀습니다. 이제 함수 본문에서 `name` 변수를 사용해 `ArtosFlow`라는 이름을 출력할 수 있습니다. show 규칙은 이름 앞에 로고 이미지를 추가하고 줄바꿈을 방지하기 위해 결과를 box에 넣습니다. 이미지는 별도의 단락으로 표시되지 않도록 또 다른 box 안에 삽입됩니다.

첫 번째 box 함수와 image 함수 호출에는 `#` 기호가 필요하지 않습니다. 마크업 내부에 직접 삽입되지 않았기 때문입니다. Typst가 마크업이 아닌 코드를 기대하는 위치에서는 함수나 키워드, 변수에 접근할 때 앞에 `#`를 붙일 필요가 없습니다. 이는 인자 목록, 함수 정의, 코드 블록에서 확인할 수 있습니다.

## 리뷰  
이제 Typst 문서에 기본 서식을 적용하는 방법을 알게 되었습니다. 글꼴 설정, 문단 정렬, 페이지 크기 변경, 설정 규칙으로 제목에 번호 매기기 등을 배웠습니다. 또한 show 규칙을 사용해 문서 전반에 텍스트가 나타나는 방식을 바꾸는 방법도 배웠습니다.

보고서를 제출했고, 지도교수가 매우 만족하여 그것을 학회 논문으로 발전시키고 싶다고 합니다! 다음 장에서는 고급 show 규칙과 함수를 사용해 문서를 논문 형태로 서식 지정하는 방법을 배우게 됩니다.


---


# 고급 스타일링  
튜토리얼의 지난 두 챕터에서 Typst로 문서를 작성하는 방법과 서식을 변경하는 방법을 배웠습니다. 지난 챕터 동안 작성한 보고서는 최고 점수를 받았고, 지도교수님은 이를 기반으로 학회 논문을 작성하고자 합니다! 당연히 보고서는 학회의 스타일 가이드를 따라야 합니다. 어떻게 그 요구사항을 만족시킬 수 있을지 살펴봅시다.

시작하기 전에 팀을 생성하고 지도교수님을 초대하여 팀에 추가합시다. 편집기의 왼쪽 상단에 있는 뒤로가기 아이콘을 눌러 앱 대시보드로 돌아간 후, 왼쪽 툴바의 플러스 아이콘을 선택하여 팀을 만듭니다. 생성된 팀을 클릭하고 팀 이름 옆의 '팀 관리' 버튼을 눌러 설정으로 이동합니다. 이제 지도교수님 이메일 주소를 입력하여 초대할 수 있습니다.

![](./images/img_20250731_212918.jpg)

다음으로 프로젝트를 해당 팀으로 이동합니다: 프로젝트를 열고 왼쪽 툴바의 톱니바퀴 아이콘을 눌러 설정으로 이동한 뒤, 소유자 드롭다운에서 새 팀을 선택하세요. 변경 사항을 저장하는 것도 잊지 마세요!

이제 지도교수님도 프로젝트를 편집할 수 있고, 두 사람 모두 실시간으로 변경 사항을 볼 수 있습니다. Discord 서버에 참여하면 다른 사용자들과 팀 기능을 사용해볼 수 있습니다.


## 학회 스타일 가이드  
레이아웃 가이드는 학회 웹사이트에서 확인할 수 있습니다. 주요 내용은 다음과 같습니다:

- 글꼴은 11pt 세리프 폰트  
- 제목은 17pt 굵은 글꼴  
- 논문은 단일 열 요약과 두 개 열 본문으로 구성됨  
- 요약은 중앙 정렬  
- 본문은 양쪽 정렬  
- 1단계 섹션 제목은 13pt, 중앙 정렬, 스몰 캐피털  
- 2단계 제목은 인라인, 이탤릭체, 본문과 동일한 크기  
- 페이지는 미국 레터 사이즈이며, 바닥 중앙에 번호가 있고 페이지 오른쪽 위에 제목 포함

이미 많은 부분은 다룰 줄 알지만 몇 가지는 새로운 기술이 필요합니다.

## 적절한 설정 규칙 작성  
문서를 위한 설정 규칙부터 작성합시다:

```typst
#set page(
  paper: "us-letter",
  header: align(right)[
    A fluid dynamic model for
    glacier flow
  ],
  numbering: "1",
)
#set par(justify: true)
#set text(
  font: "Libertinus Serif",
  size: 11pt,
)

#lorem(600)
```

![](./images/img_20250731_212957.jpg)

텍스트 크기를 11pt로, 폰트를 Libertinus Serif로 지정합니다. 문단 양쪽 정렬을 활성화하고 페이지 크기를 미국 레터로 설정합니다.

새로운 요소는 `header` 인자입니다: 각 페이지 상단 여백을 채울 콘텐츠를 지정할 수 있습니다. 여기에 학회에서 요구하는 논문 제목을 넣고, `align` 함수를 사용해 오른쪽 정렬합니다.

마지막으로 `numbering` 인자를 통해 페이지 번호 형식을 설정합니다. `"1"`을 지정하면 페이지 번호만 간단히 표시되며, `"(1/1)"` 형식도 가능하고 커스텀 함수로 번호 스타일을 완전히 바꿀 수도 있습니다.

## 제목과 요약 추가  
이제 제목과 요약을 추가합시다. 제목은 중앙 정렬하고 별표(*)로 둘러싸서 굵게 만듭니다:

```typst
#align(center, text(17pt)[
  *A fluid dynamic model
  for glacier flow*
])
```

![](./images/img_20250731_213021.jpg)

이렇게 하면 전역 text 설정 규칙을 무시하고 17pt로 지역 설정한 것입니다. 저자 목록도 추가합시다. 지도교수님과 공동으로 논문을 작성하기 때문에 두 사람의 이름을 넣습니다:

```typst
#grid(
  columns: (1fr, 1fr),
  align(center)[
    Therese Tungsten \
    Artos Institute \
    #link("mailto:tung@artos.edu")
  ],
  align(center)[
    Dr. John Doe \
    Artos Institute \
    #link("mailto:doe@artos.edu")
  ]
)
```

![](./images/img_20250731_213033.jpg)

두 개의 저자 블록이 나란히 배치됩니다. `grid` 함수를 사용해 레이아웃을 구성하며, `columns` 인자에 (1fr, 1fr)을 지정하여 공간을 반으로 나눕니다. 각 셀에 들어갈 콘텐츠를 두 개 전달하며, `align`을 통해 중앙 정렬합니다. `grid`는 셀 수에 따라 자동으로 행을 추가하지만 `rows` 인자로 직접 지정할 수도 있습니다.

이제 요약을 추가합시다. 학회 요구사항에 따라 요약은 들여쓰기 없이 중앙 정렬되어야 합니다:

```typst
#align(center)[
  #set par(justify: false)
  *Abstract* \
  #lorem(80)
]
```

![](./images/img_20250731_213052.jpg)

잘 했습니다! 여기서는 `align` 콘텐츠 인자 내에 `set` 규칙을 작성해 요약 부분만 양쪽 정렬을 비활성화했습니다. 이는 문서 전반에 영향을 주지 않으며, 콘텐츠 블록 내부에서만 스타일이 적용됩니다.

제목을 변수로 저장하면 header와 title에 중복 입력하지 않아도 됩니다. `let` 키워드로 변수 지정이 가능합니다:

```typst
#let title = [
  A fluid dynamic model
  for glacier flow
]

...

#set page(
  header: align(
    right + horizon,
    title
  ),
  ...
)

#align(center, text(17pt)[
  *#title*
])

...
```

![](./images/img_20250731_213116.jpg)

이렇게 하면 변수에 저장된 콘텐츠를 함수 또는 마크업 내에서 `#`로 호출할 수 있습니다. 제목을 바꿔야 할 경우 한 곳만 수정하면 됩니다.



## 열과 제목 추가하기  
앞서 작성한 논문은 안타깝게도 매우 답답하게 보입니다. 이를 해결하기 위해 제목을 추가하고 문서를 두 개의 열로 바꿔봅시다. 다행히도 아주 간단합니다. page 설정 규칙에 columns 인자를 추가하면 됩니다.

columns: 2 인자를 추가함으로써 문서 전체가 두 개의 열로 구성됩니다. 하지만 제목과 저자 정보에도 영향을 미치게 되죠. 이를 전체 너비로 유지하려면 place 함수로 감싸면 됩니다. place는 정렬 방식과 콘텐츠를 위치 인자로 받고, scope라는 이름 인자를 사용하여 현재 열 기준으로 배치할지 아니면 상위(페이지) 기준으로 배치할지 결정할 수 있습니다. 또 하나 설정할 부분이 있습니다. 다른 인자가 주어지지 않으면 place는 콘텐츠를 문서 흐름에서 분리하고, 컨테이너 내의 다른 콘텐츠 레이아웃에 영향을 주지 않고 덮어씌웁니다.

```typst
#place(
  top + center,
  rect(fill: black),
)
#lorem(30)
```

![](./images/img_20250731_213134.jpg)

place를 사용하지 않았다면 사각형은 별도의 줄에 표시되었겠지만, 위처럼 사용하면 뒤따라오는 텍스트를 겹쳐서 표시할 수 있습니다. 또한 그 텍스트는 마치 사각형이 존재하지 않는 것처럼 동작합니다. 이 동작을 바꾸고 싶다면 float: true 인자를 추가하면 됩니다. 페이지 상단 또는 하단에 배치된 요소가 차지하는 공간을 다른 콘텐츠가 차지하지 않도록 보장해줍니다.

```typst
#set page(
  paper: "us-letter",
  header: align(
    right + horizon,
    title
  ),
  numbering: "1",
  columns: 2,
)

#place(
  top + center,
  float: true,
  scope: "parent",
  clearance: 2em,
)[
  ...

  #par(justify: false)[
    *Abstract* \
    #lorem(80)
  ]
]

= Introduction
#lorem(300)

= Related Work
#lorem(200)
```

![](./images/img_20250731_213148.jpg)


이 예시에서는 v 함수 대신 place 함수의 clearance 인자를 사용해 본문과의 간격을 설정했습니다. 또한 각 구성 요소 주위의 align(center, ...) 호출을 제거할 수 있습니다. 정렬이 placement로부터 상속되기 때문입니다.

이제 제목을 스타일링할 차례입니다. 중앙 정렬하고 스몰 캐피털로 설정해야 합니다. heading 함수만으로는 불가능하므로 heading에 대해 사용자 지정 show 규칙을 작성해야 합니다.

```typst
#show heading: it => [
  #set align(center)
  #set text(13pt, weight: "regular")
  #block(smallcaps(it.body))
]
```

![](./images/img_20250731_213202.jpg)

훌륭합니다! 이 show 규칙은 모든 heading에 적용됩니다. heading은 파라미터 it로 전달되며, 콘텐츠로 사용할 수 있을 뿐 아니라 title, numbers, level 같은 필드를 통해 원하는 스타일을 구성할 수 있습니다. 여기서는 중앙 정렬, 글꼴 굵기를 기본값(bold)에서 "regular"로 변경하고, smallcaps 함수로 제목을 스몰 캐피털로 렌더링합니다.

남은 문제는 모든 제목이 똑같이 보인다는 것입니다. Motivation과 Problem Statement 같은 하위 섹션들은 이탤릭체 인라인 제목이 되어야 하지만 지금은 섹션 제목과 구분되지 않습니다. 이를 해결하려면 show 규칙에 where 선택자를 사용하는 방법이 있습니다. 이는 heading과 다른 요소에 사용할 수 있는 메서드로, level 기준으로 필터링할 수 있습니다. 이를 통해 섹션과 하위 섹션 제목을 구분할 수 있습니다:

```typst
#show heading.where(
  level: 1
): it => block(width: 100%)[
  #set align(center)
  #set text(13pt, weight: "regular")
  #smallcaps(it.body)
]

#show heading.where(
  level: 2
): it => text(
  size: 11pt,
  weight: "regular",
  style: "italic",
  it.body + [.],
)
```

![](./images/img_20250731_213246.jpg)

아주 좋습니다! 두 개의 show 규칙을 작성하여 각각 1단계와 2단계 제목에만 적용되도록 설정했습니다. where 선택자로 제목의 level을 기준으로 필터링한 후, 하위 섹션 제목을 인라인 이탤릭체로 렌더링하고 끝에 마침표를 자동으로 추가했습니다.

학회 스타일 가이드를 다시 검토해봅시다:

- 글꼴은 11pt 세리프 폰트 ✓  
- 제목은 17pt 굵은 글꼴 ✓  
- 논문은 단일 열 요약과 두 열 본문으로 구성 ✓  
- 요약은 중앙 정렬 ✓  
- 본문은 양쪽 정렬 ✓  
- 1단계 섹션 제목은 중앙 정렬, 스몰 캐피털, 13pt ✓  
- 2단계 제목은 인라인, 이탤릭체, 본문 크기와 동일 ✓  
- 페이지는 US 레터 크기, 바닥 중앙에 번호, 오른쪽 위에 제목 표시 ✓  

이제 모든 요구사항을 충족했으며, 학회에 논문을 제출할 수 있습니다! 완성된 논문은 다음과 같은 모습입니다:

![](./images/img_20250731_213310.jpg)


## 리뷰  
이제 헤더와 푸터 생성, 함수 및 범위(scope)를 이용한 지역 스타일 덮어쓰기, grid 함수를 이용한 복잡한 레이아웃 구성, 특정 함수 및 문서 전체에 대한 show 규칙 작성 방법을 배웠습니다. 또한 where 선택자를 사용해 제목의 level에 따라 필터링하는 방법도 배웠습니다.

논문은 큰 성공을 거두었습니다! 학회에서 당신과 뜻이 맞는 많은 연구자들을 만났고, 내년 같은 장소에서 발표할 프로젝트를 계획 중입니다. 같은 스타일 가이드를 사용해야 하므로, 이제 팀 전체가 사용할 수 있는 템플릿을 만들어 시간을 절약하고 싶으시겠죠?

다음 섹션에서는 여러 문서에서 재사용 가능한 템플릿을 만드는 방법을 배워봅니다. 이는 더 고급 주제이므로, 지금 당장은 부담스럽다면 나중에 다시 돌아오셔도 좋습니다.


---



# 템플릿 만들기  
튜토리얼의 이전 세 챕터에서는 Typst로 문서를 작성하고 기본 스타일을 적용한 뒤, 출판사의 스타일 가이드에 맞춰 외형을 심화해서 사용자 정의하는 법을 배웠습니다. 이전 챕터에서 작성한 논문이 큰 성공을 거두면서, 같은 학회에 후속 논문을 집필해달라는 요청을 받았습니다. 이번에는 앞서 만든 스타일을 재사용 가능한 템플릿으로 바꾸고자 합니다. 이 챕터에서는 당신과 팀이 단 하나의 show 규칙으로 사용할 수 있는 템플릿을 만드는 법을 배웁니다. 시작해봅시다!

## 간단한 템플릿  
Typst에서 템플릿은 문서 전체를 감쌀 수 있는 함수입니다. 이를 배우기 위해 먼저 자신만의 함수를 어떻게 작성하는지 살펴봅시다. 함수는 원하는 어떤 작업이든 할 수 있습니다. 그러니 약간 과감해도 됩니다!

```typst
#let amazed(term) = box[✨ #term ✨]

You are #amazed[beautiful]!
```

![](./images/img_20250731_213342.jpg)

이 함수는 단 하나의 인자 term을 받아, term을 반짝이 사이에 감싼 콘텐츠 블록을 반환합니다. 전체를 box로 감싸기 때문에 감탄할 term과 반짝이가 줄바꿈에 의해 떨어지지 않습니다.

Typst에서 제공하는 많은 함수는 선택적 이름 인자를 지원합니다. 사용자 정의 함수에서도 이를 사용할 수 있습니다. 이제 텍스트의 색상을 선택할 수 있게 color 인자를 추가하고, 인자가 제공되지 않을 경우 대비해 기본 색상도 설정해줍니다.

```typst
#let amazed(term, color: blue) = {
  text(color, box[✨ #term ✨])
}

You are #amazed[beautiful]!
I am #amazed(color: purple)[amazed]!
```

![](./images/img_20250731_213355.jpg)

이제 amazed처럼 문서 전체를 사용자 정의 함수로 감싸는 방식으로 템플릿을 만들 수 있습니다. 하지만 문서를 큰 함수 호출로 감싸는 건 번거롭습니다! 대신 `everything` show 규칙을 사용하면 코드가 더 깔끔해집니다. 이 규칙을 작성하려면 `show` 키워드 뒤에 콜론을 붙이고 함수를 제공합니다. 함수는 나머지 문서를 인자로 받아 원하는 작업을 수행할 수 있습니다. amazed 함수는 콘텐츠 하나만 받으면 호출할 수 있기 때문에, 이름만 지정해서 show 규칙에 전달할 수 있습니다. 시도해봅시다:

```typst
#show: amazed
I choose to focus on the good
in my life and let go of any
negative thoughts or beliefs.
In fact, I am amazing!
```

![](./images/img_20250731_213409.jpg)

이제 전체 문서가 amazed 함수에 전달되어 마치 감싸진 것처럼 작동합니다. 이 함수 자체로는 특별히 유용하지 않지만, set 규칙과 이름 인자를 함께 사용하면 매우 강력해질 수 있습니다.


## set 및 show 규칙 내장하기  
템플릿에 일부 set 및 show 규칙을 적용하려면 함수 내부의 콘텐츠 블록에 `set` 및 `show`를 사용한 다음 문서를 해당 콘텐츠 블록에 삽입하면 됩니다.

```typst
#let template(doc) = [
  #set text(font: "Inria Serif")
  #show "something cool": [Typst]
  #doc
]

#show: template
I am learning something cool today.
It's going great so far!
```

![](./images/img_20250731_213437.jpg)

앞서 배운 것처럼 set 규칙은 해당 콘텐츠 블록 안의 모든 항목에 적용됩니다. everything show 규칙은 전체 문서를 template 함수에 전달하기 때문에, 템플릿 내부의 text set 규칙과 문자열 show 규칙이 문서 전체에 적용됩니다. 이 원리를 활용하여 앞서 작성한 논문의 본문 스타일을 재현하는 템플릿을 만들어봅시다.

```typst
#let conf(title, doc) = {
  set page(
    paper: "us-letter",
    header: align(
      right + horizon,
      title
    ),
    columns: 2,
    ...
  )
  set par(justify: true)
  set text(
    font: "Libertinus Serif",
    size: 11pt,
  )

  // 제목에 대한 show 규칙
  ...

  doc
}

#show: doc => conf(
  [Paper title],
  doc,
)

= Introduction
#lorem(90)

...
```

![](./images/img_20250731_213449.jpg)

이 코드 대부분은 이전 챕터에서 복사해온 것입니다. 차이점 두 가지는 다음과 같습니다:

1. 문서 전체를 everything show 규칙으로 `conf` 함수에 감쌌습니다. 함수는 몇 가지 set 및 show 규칙을 적용한 뒤 전달받은 콘텐츠를 마지막에 출력합니다.

2. 콘텐츠 블록 대신 중괄호 `{}`를 사용한 코드 블록을 채택했습니다. 이로써 모든 set 규칙이나 함수 호출 앞에 `#`을 붙이지 않아도 됩니다. 대신 코드 블록에서는 마크업을 직접 작성할 수 없습니다.

또한 제목의 처리 방식도 주목할 필요가 있습니다. 이전에는 변수에 저장되어 있었지만, 이제는 템플릿 함수의 첫 번째 인자로 전달됩니다. 이를 위해 everything show 규칙에 클로저(이름 없는 즉시 실행 함수)를 전달했습니다. conf 함수는 제목과 본문 두 개의 위치 인자를 필요로 하지만, show 규칙은 본문만 넘겨줍니다. 따라서 새로운 함수 정의를 추가하여 논문 제목을 설정하고 show 규칙의 단일 인자를 활용할 수 있게 만들었습니다.


## 이름 있는 인자를 사용하는 템플릿  
이전 챕터에서 작성한 논문에는 제목과 저자 목록이 포함되어 있었습니다. 이번에는 이 요소들을 템플릿에 추가해봅시다. 제목 외에도, 템플릿에서 소속과 이메일을 포함한 저자 목록과 논문의 초록을 입력받도록 할 것입니다. 가독성을 유지하기 위해 이 요소들은 이름 있는 인자로 추가합니다. 최종적으로 템플릿을 다음처럼 사용하고자 합니다:

```typst
#show: doc => conf(
  title: [Towards Improved Modelling],
  authors: (
    (
      name: "Theresa Tungsten",
      affiliation: "Artos Institute",
      email: "tung@artos.edu",
    ),
    (
      name: "Eugene Deklan",
      affiliation: "Honduras State",
      email: "e.deklan@hstate.hn",
    ),
  ),
  abstract: lorem(80),
  doc,
)
```

새로운 템플릿 함수 구성을 해보겠습니다. 먼저 title 인자에 기본값을 추가합니다. 이렇게 하면 제목을 명시하지 않아도 템플릿을 호출할 수 있습니다. authors와 abstract도 기본값이 비어 있는 이름 있는 인자로 추가합니다. 이후 이전 챕터에서 사용한 제목, 초록, 저자 정보를 생성하는 코드를 복사하고, 고정된 정보를 인자로 교체합니다.

새로운 authors 인자는 name, affiliation, email 키를 갖는 딕셔너리 배열을 기대합니다. 저자 수는 가변적이므로, 한 줄에 1, 2 또는 3개의 열이 필요합니다. authors 배열에 .len() 메서드를 사용하여 저자 수를 파악하고, 이 값을 최대 3으로 제한해 열 수를 정합니다. 저자가 3명을 넘는 경우에는 새 행이 추가됩니다. 이를 위해 grid 함수에 row-gutter 인자를 추가합니다. 그렇지 않으면 행 간 간격이 너무 좁아지게 됩니다. 저자 정보를 추출할 때는 필드 접근 문법을 사용합니다.

각 저자에 대해 grid에 인자를 제공해야 합니다. 이때 배열의 map 메서드가 유용하게 작동합니다. 이 메서드는 배열의 각 항목에 대해 함수를 호출하며, 각 저자 정보를 형식화하고 콘텐츠 배열을 반환하는 함수를 인자로 받습니다. 이제 콘텐츠 배열을 grid 함수의 여러 인자로 전달해야 하는데, spread 연산자(..)를 사용하면 배열의 항목들을 각각 독립된 인자로 적용할 수 있습니다.

최종적인 템플릿 함수는 다음과 같습니다:

```typst
#let conf(
  title: none,
  authors: (),
  abstract: [],
  doc,
) = {
  // 이전의 set 및 show 규칙
  ...

  set align(center)
  text(17pt, title)

  let count = authors.len()
  let ncols = calc.min(count, 3)
  grid(
    columns: (1fr,) * ncols,
    row-gutter: 24pt,
    ..authors.map(author => [
      #author.name \
      #author.affiliation \
      #link("mailto:" + author.email)
    ]),
  )

  par(justify: false)[
    *Abstract* \
    #abstract
  ]

  set align(left)
  doc
}
```

## 별도의 파일  
일반적으로 템플릿은 별도의 파일로 작성된 뒤 문서에 import하여 사용됩니다. 이렇게 하면 메인 파일을 깔끔하게 유지하면서 템플릿을 손쉽게 재사용할 수 있습니다. 파일 패널에서 플러스 버튼을 눌러 새 텍스트 파일을 만들고 이름을 `conf.typ`으로 지정합니다. conf 함수 정의를 이 새 파일로 옮깁니다. 이제 메인 파일에서는 show 규칙 앞에 import를 추가하여 템플릿을 불러올 수 있습니다. `import` 키워드 뒤에 경로를 지정하고 콜론 뒤에 불러올 함수 이름을 적습니다.

템플릿을 조금 더 우아하게 적용하기 위해 `.with` 메서드를 사용할 수 있습니다. 이 메서드는 이름 있는 인자들을 미리 채워 넣을 수 있어, 클로저를 직접 작성하고 콘텐츠 인자를 템플릿 마지막에 추가하는 수고를 줄여줍니다. Typst Universe에 등록된 템플릿들은 이 형식의 함수 호출 방식에 맞춰 디자인되어 있습니다.

```typst
#import "conf.typ": conf
#show: conf.with(
  title: [
    Towards Improved Modelling
  ],
  authors: (
    (
      name: "Theresa Tungsten",
      affiliation: "Artos Institute",
      email: "tung@artos.edu",
    ),
    (
      name: "Eugene Deklan",
      affiliation: "Honduras State",
      email: "e.deklan@hstate.hn",
    ),
  ),
  abstract: lorem(80),
)

= Introduction
#lorem(90)

== Motivation
#lorem(140)

== Problem Statement
#lorem(50)

= Related Work
#lorem(200)
```

![](./images/img_20250731_213650.jpg)

이제 학회 논문을 해당 학회를 위한 재사용 가능한 템플릿으로 전환했습니다! 포럼이나 Typst의 Discord 서버에 공유하여 다른 사람들도 사용할 수 있도록 해보세요.


## 리뷰
축하합니다. Typst 튜토리얼을 완료했습니다! 이번 섹션에서는 사용자 정의 함수 작성 방법, 재사용 가능한 문서 스타일을 정의하는 템플릿을 만드는 방법, 그리고 적용 방법을 배웠습니다. 많은 것을 배웠고, 이제 Typst를 이용해 자신만의 문서를 작성하고 다른 사람과 공유할 수 있게 되었습니다.

Typst는 여전히 젊은 프로젝트이며 여러분의 피드백을 기다리고 있습니다. 질문, 제안 또는 버그를 발견하셨다면 포럼, Discord 서버, GitHub 또는 웹 앱의 피드백 폼(도움말 메뉴에서 언제든지 접근 가능)을 통해 알려주세요.

지금 바로 회원가입하고 무언가를 써보는 건 어떨까요?


























