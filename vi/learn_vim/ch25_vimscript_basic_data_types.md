# Ch25. Vimscript Basic Data Types
다음 몇 장은 Vim의 내장 프로그래밍 언어인 Vimscript에 대해 배웁니다.

새로운 언어를 배울 때 주목할 세 가지 기본 요소가 있습니다:

- 기본 요소(Primitives)
- 결합 수단(Combination)
- 추상화 수단(Abstraction)

이 장은 Vim의 기본 데이터 유형을 배웁니다.


## Data Types

Vim은 10가지 다른 데이터 유형이 있습니다:

- Number
- Float
- String
- List
- Dictionary
- Special
- Funcref
- Job
- Channel
- Blob

여기서는 처음 여섯 가지 데이터 유형을 다룹니다. 27장은 함수 참조(Funcref)에 대해 배웁니다. Vim 데이터 유형에 대한 자세한 내용은 `:h variables` 를 참조합니다.


## Following Along With Ex Mode
Vim은 기술적으로 내장 REPL을 가지고 있지 않지만, REPL처럼 사용할 수 있는 Ex 모드를 제공합니다. `Q` 또는 `gQ` 로 Ex 모드로 진입할 수 있습니다. Ex 모드는 확장된 명령줄 모드와 유사합니다. (명령줄 모드 명령어를 끊임없이 입력하는 것과 같습니다). Ex 모드를 종료하려면 `:visual` 을 입력합니다.

이 장과 이후의 Vimscript 장은 코드를 따라서 작성할 때 `:echo` 또는 `:echom` 을 사용할 수 있습니다. 이들은 JS의 `console.log` 나 Python의 `print` 함수와 유사합니다. `:echo` 명령어는 입력한 표현식을 평가해서 출력합니다. `:echom` 명령어는 동일한 작업을 수행하지만, 결과물을 메시지 히스토리에 저장합니다.

```
:echom "hello echo message"
```

메시지 기록을 보려면 다음을 실행합니다:

```
:messages
```

메시지 기록을 지우려면 다음을 실행합니다:

```
:messages clear
```


## Number
Vim은 4가지 숫자 유형이 있습니다: 십진수, 16진수, 2진수, 8진수입니다. 참고로, 숫자 데이터 유형이라고 할 때 종종 정수 데이터 유형을 의미합니다. 본 가이드는  숫자와 정수를 같은 의미로 사용합니다.


### Decimal
십진법 체계에 익숙해야 합니다. Vim은 양수와 음수의 십진수를 모두 수용합니다. 1, -1, 10 등입니다. Vimscript 프로그래밍에서 대부분의 경우 십진수 유형을 사용합니다.


### Hexadecimal
16진수는 `0x` 또는 `0X` 로 시작합니다. 기억법: He**x**adecimal


### Binary
바이너리 파일은 `0b` 또는 `0B` 로 시작합니다. 기억법: **B**inary


### Octal
8진수는 `0`, `0o`, `0O` 로 시작합니다. 기억법: **O**ctal


### Printing Numbers
16진수, 2진수 또는 8진수를 `echo` 로 출력하면 Vim은 자동으로 10진수로 변환합니다.

```viml
:echo 42
" returns 42

:echo 052
" returns 42

:echo 0b101010
" returns 42

:echo 0x2A
" returns 42
```


### Truthy and Falsy
Vim에서 0 값은 거짓값(falsy)이며, 0 이 아닌 모든 값은 참 값(truthy)입니다.

다음은 아무것도 출력하지 않습니다.

```viml
:if 0
:  echo "Nope"
:endif
```

다음은 결과를 출력합니다:

```viml
:if 1
:  echo "Yes"
:endif
```

0 이외의 모든 값은 참 값으로 간주되며, 음수도 포함됩니다. 100은 참 값입니다. -1도 참 값입니다.


### Number Arithmetic
숫자는 산술 표현식을 실행하는 데 사용할 수 있습니다:

```viml
:echo 3 + 1
" returns 4

: echo 5 - 3
" returns 2

:echo 2 * 2
" returns 4

:echo 4 / 2
" returns 2
```

나머지가 있는 숫자를 나눌 때, Vim은 나머지를 생략합니다.

```viml
:echo 5 / 2
" returns 2 instead of 2.5
```

좀 더 정확한 결과를 얻으려면 부동 소수점 숫자를 사용해야 합니다.


## Float
부동 소수점은 소수점이 뒤따르는 숫자입니다. 부동 소수점을 표현하는 소수점 표기법(예: 31.4)과 지수 표기법(3.14e01) 두 가지 방법이 있습니다. 숫자와 마찬가지로 양수 및 음수 기호를 사용할 수 있습니다:

```viml
:echo +123.4
" returns 123.4

:echo -1.234e2
" returns -123.4

:echo 0.25
" returns 0.25

:echo 2.5e-1
" returns 0.25
```

부동 소수점 숫자는 소수점과 뒤따르는 숫자가 있어야 합니다. `25e-2` (소수점 없음)와 `1234.` (소수점은 있으나 뒤따르는 숫자 없음)는 모두 유효하지 않은 부동 소수점 숫자입니다.


### Float Arithmetic
숫자와 부동 소수점 수 사이의 산술 연산을 수행할 때, Vim은 결과를 부동 소수점 수로 강제 변환합니다.

```viml
:echo 5 / 2.0
" returns 2.5
```

부동 소수점 연산은 또 다른 부동 소수점 값을 반환합니다.

```
:echo 1.0 + 1.0
" returns 2.0
```


## String
문자열은 큰따옴표(`“”`) 또는 작은따옴표(`‘’`)로 둘러싸인 문자입니다. ‘Hello’, “123”, '123.4' 는 문자열의 예입니다.


### String Concatenation
Vim에서 문자열을 연결하려면 `.` 연산자를 사용합니다.

```viml
:echo "Hello" . " world"
" returns "Hello world"
```

### String Arithmetic
숫자와 문자열에 산술 연산자(`+ - * /`)를 적용할 때, Vim은 문자열을 숫자로 강제 변환합니다.

```viml
:echo "12 donuts" + 3
" returns 15
```

Vim이 “12 donuts”을 인식하면 문자열에서 12를 추출해서 숫자 12로 변환합니다. 그런 다음 덧셈 연산을 수행해서 15를 반환합니다. 이런 문자열-숫자 강제 변환이 작동하려면 숫자 문자가 문자열의 **첫 번째 문자**여야 합니다.

다음은 12가 문자열의 첫 번째 문자가 아니므로 작동하지 않습니다:

```viml
:echo "donuts 12" + 3
" returns 3
```

다음도 작동하지 않습니다. 빈 공백이 문자열의 첫 번째 문자이기 때문입니다:

```viml
:echo " 12 donuts" + 3
" returns 3
```

이런 강제는 두 개의 문자열에도 작동합니다:

```
:echo "12 donuts" + "6 pastries"
" returns 18
```

이것은 `+`뿐만 아니라 모든 산술 연산자와 함께 작동합니다:

```viml
:echo "12 donuts" * "5 boxes"
" returns 60

:echo "12 donuts" - 5
" returns 7

:echo "12 donuts" / "3 people"
" returns 4
```

문자열을 숫자로 강제 변환하는 깔끔한 방법은 0 을 더하거나 1 을 곱하는 것입니다:

```viml
:echo "12" + 0
" returns 12

:echo "12" * 1
" returns 12
```

문자열 내의 부동 소수점 숫자에 산술 연산을 수행할 때, Vim은 이를 부동 소수점이 아닌 정수로 취급합니다:

```
:echo "12.0 donuts" + 12
" returns 24, not 24.0
```


### Number and String Concatenation
점 연산자(`.`)를 사용해서 숫자를 문자열로 강제 변환할 수 있습니다:

```viml
:echo 12 . "donuts"
" returns "12donuts"
```

강제는 숫자 데이터 유형만 적용되며, 부동 소수점은 적용되지 않습니다. 다음은 작동하지 않습니다:

```
:echo 12.0 . "donuts"
" does not return "12.0donuts" but throws an error
```


### String Conditionals
0 은 거짓 값(falsy)이고 0 이 아닌 모든 숫자는 참 값(truthy)임을 기억합니다. 문자열을 조건문으로 사용할 때도 마찬가지입니다.

다음 if 문에서 Vim은 “12donuts” 를 참 값인 12로 강제 변환합니다:

```viml
:if "12donuts"
:  echo "Yum"
:endif
" returns "Yum"
```

반면에, 다음은 거짓 값입니다:

```viml
:if "donuts12"
:  echo "Nope"
:endif
" rerturns nothing
```

Vim은 첫 번째 문자가 숫자가 아니기 때문에 “donuts12” 를 0 으로 강제 변환합니다.


### Double vs Single Quotes
큰 따옴표는 작은따옴표와 다르게 동작합니다. 작은따옴표는 문자를 그대로 표시하는 반면, 큰따옴표는 특수 문자를 허용합니다.

특수 문자란 무엇인가요? 줄바꿈과 큰따옴표 표시를 확인합니다:

```viml
:echo "hello\nworld"
" returns
" hello
" world

:echo "hello \"world\""
" returns "hello "world""
```

따옴표와 비교합니다:

```
:echo 'hello\nworld'
" returns 'hello\nworld'

:echo 'hello \"world\"'
" returns 'hello \"world\"'
```

특수 문자는 이스케이프 처리 시 다른 동작을 처리하는 특수 문자열 문자입니다. `\n` 은 줄바꿈처럼 동작합니다. `\“` 는 리터럴 `”` 처럼 동작합니다. 다른 특수 문자 목록은 `:h expr-quote` 를 참조합니다.


### String Procedures
내장된 문자열 함수 몇 가지를 살펴보겠습니다.

`strlen()` 을 사용하면 문자열의 길이를 구할 수 있습니다.

```
:echo strlen("choco")
" returns 5
```

`str2nr()` 를 사용해서 문자열을 숫자로 변환할 수 있습니다:

```
:echo str2nr("12donuts")
" returns 12

:echo str2nr("donuts12")
" returns 0
```

앞서 설명한 문자열-숫자 강제 변환과 마찬가지로, 숫자가 첫 번째 문자가 아닐 경우 Vim은 이를 감지하지 못합니다.

좋은 소식은 Vim은 문자열을 부동 소수점 숫자로 변환하는 `str2float()` 함수가 있다는 점입니다:

```
:echo str2float("12.5donuts")
" returns 12.5
```

문자열에서 패턴을 `substitute()` 메서드로 대체할 수 있습니다:

```
:echo substitute(“sweet”, “e”, ‘o’, “g”)
“ returns ”swoot"
```

마지막 매개변수 “g” 는 전역 플래그입니다. 이 플래그가 있으면 Vim은 일치하는 모든 발생을 대체합니다. 없으면 첫 번째 일치 항목만 대체합니다.

```
:echo substitute(“sweet”, “e”, ‘o’, “”)
“ returns ”swoet"
```

substitute 명령은 `getline()` 과 결합할 수 있습니다. `getline()` 함수는 지정된 줄 번호의 텍스트를 가져옵니다. 예를 들어, 5번 줄에 “chocolate donut” 이란 텍스트가 있다고 가정해 보겠습니다. 다음 함수를 사용할 수 있습니다:

```
:echo substitute(getline(5), “chocolate”, ‘glazed’, “g”)
" 결과: glazed donut
```

기타 다양한 문자열 처리 절차가 존재합니다. `:h string-functions` 를 참조합니다.


## List
Vimscript의 리스트는 자바스크립트의 배열이나 파이썬의 리스트와 유사합니다. 이는 항목들의 **순서 있는** 시퀀스입니다. 다양한 데이터 유형의 내용을 혼합해서 사용할 수 있습니다:

```
[1,2,3]
['a', 'b', 'c']
[1,'a', 3.14]
[1,2,[3,4]]
```


### Sublists
Vim의 리스트는 0 부터 시작합니다. 특정 항목에 접근하려면 `[n]` 을 사용하며, 여기서 n은 인덱스입니다.

```
:echo ["a", "sweet", "dessert"][0]
" returns "a"

:echo ["a", "sweet", "dessert"][2]
" returns "dessert"
```

최대 인덱스 번호를 초과하면 Vim은 인덱스가 범위를 벗어났다는 오류 메시지를 표시합니다:

```
:echo [“a”, ‘sweet’, “dessert”][999]
" returns an error
```

0 보다 작은 값을 지정하면 Vim은 마지막 요소부터 인덱스를 시작합니다. 최소 인덱스 번호를 초과하는 경우에도 오류가 발생합니다:

```
:echo [“a”, ‘sweet’, “dessert”][-1]
“ returns ”dessert"

:echo [“a”, ‘sweet’, “dessert”][-3]
“ returns ”a"

:echo [“a”, ‘sweet’, “dessert”][-999]
" returns an error
```

`[n:m]` 을 사용하면 목록에서 여러 요소를 “슬라이스” 할 수 있습니다. 여기서 `n` 은 시작 인덱스이고 `m` 은 종료 인덱스입니다.

```
:echo [“chocolate”, “glazed”, “plain”, “strawberry”, “lemon”, ‘sugar’, “cream”][2:4]
“ returns: [”plain“, ‘strawberry’, ”lemon"]
```

`m` 을 지정하지 않을 경우(`[n:]`), Vim은 n번째 요소부터 시작하는 나머지 요소들을 반환합니다. `n` 을 지정하지 않을 경우(`[:m]`), Vim은 첫 번째 요소부터 m번째 요소까지를 반환합니다.

```
:echo [“chocolate”, “glazed”, “plain”, “strawberry”, “lemon”, ‘sugar’, “cream”][2:]
" returns [‘plain’, ‘strawberry’, ‘lemon’, ‘sugar’, ‘cream’]

:echo [“chocolate”, “glazed”, “plain”, “strawberry”, “lemon”, ‘sugar’, “cream”][:4]
" returns: [‘chocolate’, ‘glazed’, ‘plain’, ‘strawberry’, ‘lemon’]
```

배열을 슬라이싱할 때 최대 항목 수를 초과하는 인덱스를 전달할 수 있습니다.

```viml
:echo [“chocolate”, “glazed”, “plain”, “strawberry”, “lemon”, ‘sugar’, “cream”][2:999]
" returns [‘plain’, ‘strawberry’, ‘lemon’, ‘sugar’, ‘cream’]
```


### Slicing String
문자열도 리스트처럼 조각내고 대상으로 지정할 수 있습니다:

```viml
:echo "choco"[0]
" returns "c"

:echo "choco"[1:3]
" returns "hoc"

:echo "choco"[:3]
" returns choc

:echo "choco"[1:]
" returns hoco
```


### List Arithmetic
`+` 연산자를 사용해서 리스트를 연결하고 변경할 수 있습니다:

```viml
:let sweetList = ["chocolate", "strawberry"]
:let sweetList += ["sugar"]
:echo sweetList
" returns ["chocolate", "strawberry", "sugar"]
```


### List Functions
Vim의 내장 리스트 함수를 살펴보겠습니다.

리스트의 길이를 구하려면 `len()`을 사용합니다:

```
:echo len(["chocolate", "strawberry"])
" returns 2
```

목록의 맨 앞에 요소를 추가하려면 `insert()` 를 사용할 수 있습니다:

```
:let sweetList = ["chocolate", "strawberry"]
:call insert(sweetList, "glazed")

:echo sweetList
" returns ["glazed", "chocolate", "strawberry"]
```

`insert()` 에 요소를 추가하려는 인덱스를 전달할 수도 있습니다. 두 번째 요소(인덱스 1) 앞에 항목을 추가하려면:

```
:let sweeterList = ["glazed", "chocolate", "strawberry"]
:call insert(sweeterList, "cream", 1)

:echo sweeterList
" returns ['glazed', 'cream', 'chocolate', 'strawberry']
```

목록 항목을 제거하려면 `remove()` 를 사용합니다. 이 메서드는 제거할 요소와 해당 요소의 인덱스를 인수로 받습니다.

```
:let sweeterList = ["glazed", "chocolate", "strawberry"]
:call remove(sweeterList, 1)

:echo sweeterList
" returns ['glazed', 'strawberry']
```

목록에 `map()` 과 `filter()` 를 사용할 수 있습니다. “choco” 라는 문구를 포함하는 요소를 걸러내려면:

```
:let sweeterList = ["glazed", "chocolate", "strawberry"]
:call filter(sweeterList, 'v:val !~ "choco"')
:echo sweeterList
" returns ["glazed", "strawberry"]

:let sweetestList = ["chocolate", "glazed", "sugar"]
:call map(sweetestList, 'v:val . " donut"')
:echo sweetestList
" returns ['chocolate donut', 'glazed donut', 'sugar donut']
```

`v:val` 변수는 Vim 특수 변수입니다. `map()` 또는 `filter()` 를 사용해서 목록이나 사전(dictionary)을 반복할 때 사용할 수 있으며, 반복되는 각 항목을 나타냅니다.

자세한 내용은 `:h list-functions` 를 참조합니다.


### List Unpacking
목록을 풀어서 목록 항목에 변수를 할당할 수 있습니다:

```
:let favoriteFlavor = ["chocolate", "glazed", "plain"]
:let [flavor1, flavor2, flavor3] = favoriteFlavor

:echo flavor1
" returns "chocolate"

:echo flavor2
" returns "glazed"
```

나머지 목록 항목을 할당하려면 변수 이름 앞에 `;` 를 사용할 수 있습니다:

```
:let favoriteFruits = ["apple", "banana", "lemon", "blueberry", "raspberry"]
:let [fruit1, fruit2; restFruits] = favoriteFruits

:echo fruit1
" returns "apple"

:echo restFruits
" returns ['lemon', 'blueberry', 'raspberry']
```


### Modifying List
목록 항목을 직접 수정할 수 있습니다:

```
:let favoriteFlavor = ["chocolate", "glazed", "plain"]
:let favoriteFlavor[0] = "sugar"
:echo favoriteFlavor
" returns ['sugar', 'glazed', 'plain']
```

여러 목록 항목을 직접 변형할 수 있습니다:

```
:let favoriteFlavor = ["chocolate", "glazed", "plain"]
:let favoriteFlavor[2:] = ["strawberry", "chocolate"]
:echo favoriteFlavor
" returns ['chocolate', 'glazed', 'strawberry', 'chocolate']
```


## Dictionary
Vimscript 사전은 연관된 순서가 없는 목록입니다. 비어 있지 않은 사전은 최소한 하나의 키-값 쌍으로 구성됩니다.

```
{"breakfast": "waffles", "lunch": "pancakes"}
{"meal": ["breakfast", "second breakfast", "third breakfast"]}
{"dinner": 1, "dessert": 2}
```

Vim 사전 데이터 객체는 키로 문자열을 사용합니다. 숫자를 사용하려고 하면 Vim이 이를 문자열로 강제 변환합니다.

```
:let breakfastNo = {1: "7am", 2: "9am", "11ses": "11am"}

:echo breakfastNo
" returns {'1': '7am', '2': '9am', '11ses': '11am'}
```

각 키마다 따옴표를 넣기 귀찮다면 `#{}` 표기법을 사용할 수 있습니다:

```
:let mealPlans = #{breakfast: "waffles", lunch: "pancakes", dinner: "donuts"}

:echo mealPlans
" returns {'lunch': 'pancakes', 'breakfast': 'waffles', 'dinner': 'donuts'}
```

`#{}` 구문을 사용하기 위한 유일한 요구 사항은 각 키가 다음 중 하나여야 한다는 점입니다:

- ASCII character.
- Digit.
- An underscore (`_`).
- A hyphen (`-`).

목록과 마찬가지로, 값으로 어떤 데이터 유형이든 사용할 수 있습니다.

```
:let mealPlan = {"breakfast": ["pancake", "waffle", "hash brown"], "lunch": WhatsForLunch(), "dinner": {"appetizer": "gruel", "entree": "more gruel"}}
```


### Accessing Dictionary
사전에서 값에 접근하려면 대괄호(`[‘key’]`) 또는 점 표기법(`.key`)을 사용해서 키를 호출할 수 있습니다.

```
:let meal = {"breakfast": "gruel omelettes", "lunch": "gruel sandwiches", "dinner": "more gruel"}

:let breakfast = meal['breakfast']
:let lunch = meal.lunch

:echo breakfast
" returns "gruel omelettes"

:echo lunch
" returns "gruel sandwiches"
```


### Modifying Dictionary
사전 내용을 수정하거나 추가할 수도 있습니다:

```
:let meal = {"breakfast": "gruel omelettes", "lunch": "gruel sandwiches"}

:let meal.breakfast = "breakfast tacos"
:let meal["lunch"] = "tacos al pastor"
:let meal["dinner"] = "quesadillas"

:echo meal
" returns {'lunch': 'tacos al pastor', 'breakfast': 'breakfast tacos', 'dinner': 'quesadillas'}
```


### Dictionary Functions
Vim의 사전 처리를 위한 내장 함수 몇 가지를 살펴보겠습니다.

사전의 길이를 확인하려면 `len()` 을 사용합니다.

```
:let mealPlans = #{breakfast: "waffles", lunch: "pancakes", dinner: "donuts"}

:echo len(mealPlans)
" returns 3
```

사전에 특정 키가 포함되어 있는지 확인하려면 `has_key()` 를 사용합니다.

```
:let mealPlans = #{breakfast: "waffles", lunch: "pancakes", dinner: "donuts"}

:echo has_key(mealPlans, "breakfast")
" returns 1

:echo has_key(mealPlans, "dessert")
" returns 0
```

사전에 항목이 있는지 확인하려면 `empty()` 를 사용합니다. `empty()` 함수는 모든 데이터 유형(리스트, 사전, 문자열, 숫자, 부동 소수점 등)에서 작동합니다.

```
:let mealPlans = #{breakfast: "waffles", lunch: "pancakes", dinner: "donuts"}
:let noMealPlan = {}

:echo empty(noMealPlan)
" returns 1

:echo empty(mealPlans)
" returns 0
```

사전에서 항목을 제거하려면 `remove()` 를 사용합니다.

```
:let mealPlans = #{breakfast: "waffles", lunch: "pancakes", dinner: "donuts"}

:echo "removing breakfast: " . remove(mealPlans, "breakfast")
" returns "removing breakfast: 'waffles'""

:echo mealPlans
" returns {'lunch': 'pancakes', 'dinner': 'donuts'}
```

사전을 리스트의 리스트로 변환하려면 `items()` 를 사용합니다:

```
:let mealPlans = #{breakfast: "waffles", lunch: "pancakes", dinner: "donuts"}

:echo items(mealPlans)
" returns [['lunch', 'pancakes'], ['breakfast', 'waffles'], ['dinner', 'donuts']]
```

`filter()` 및 `map()` 도 사용할 수 있습니다.

```
:let breakfastNo = {1: "7am", 2: "9am", "11ses": "11am"}
:call filter(breakfastNo, 'v:key > 1')

:echo breakfastNo
" returns {'2': '9am', '11ses': '11am'}
```

사전에는 키-값 쌍이 포함되므로, Vim은 `v:val` 과 유사하게 작동하는 `v:key` 특수 변수를 제공합니다. 사전을 반복 처리할 때 `v:key` 는 현재 반복 중인 키의 값을 저장합니다.

`mealPlans` 사전이 있다면 `v:key` 를 사용해서 매핑할 수 있습니다.

```
:let mealPlans = #{breakfast: "waffles", lunch: "pancakes", dinner: "donuts"}
:call map(mealPlans, 'v:key . " and milk"')

:echo mealPlans
" returns {'lunch': 'lunch and milk', 'breakfast': 'breakfast and milk', 'dinner': 'dinner and milk'}
```

마찬가지로 `v:val` 을 사용해서 매핑할 수 있습니다:

```
:let mealPlans = #{breakfast: "waffles", lunch: "pancakes", dinner: "donuts"}
:call map(mealPlans, 'v:val . " and milk"')

:echo mealPlans
" returns {'lunch': 'pancakes and milk', 'breakfast': 'waffles and milk', 'dinner': 'donuts and milk'}
```

더 많은 사전 기능을 보려면 `:h dict-functions` 를 확인합니다.


## Special Primitives
Vim에는 특별한 기본 명령어가 있습니다:

- `v:false`
- `v:true`
- `v:none`
- `v:null`

참고로 `v:` 는 Vim의 내장 변수입니다. 이 변수들은 후반부 장에서 좀 더 자세히 다룰 예정입니다.

제 경험상, 이런 특수 원시값을 자주 사용하지 않습니다. 참/거짓 값이 필요하다면 0(거짓)과 0이 아닌 값(참)을 사용합니다. 빈 문자열이 필요하다면 `“”` 를 사용합니다. 하지만 알아두면 좋으니 간단히 살펴보겠습니다.


### True
이는 `true` 와 동일합니다. 값이 0 이 아닌 숫자와 동일합니다. `json_encode()` 로 json을 디코딩할 때 “true” 로 해석됩니다.

```
:echo json_encode({"test": v:true})
" returns {"test": true}
```


### False
이는 `false` 와 동일합니다. 값이 0 인 숫자와 동일합니다. `json_encode()` 로 json을 디코딩할 때 “false” 로 해석됩니다.

```
:echo json_encode({"test": v:false})
" returns {"test": false}
```


### None
이는 빈 문자열과 동일합니다. `json_encode()` 로 json을 디코딩할 때, 이는 빈 항목(`null`)으로 해석됩니다.

```
:echo json_encode({"test": v:none})
" returns {"test": null}
```


### Null
`v:none`과 유사합니다.

```
:echo json_encode({"test": v:null})
" returns {"test": null}
```


## Learn Data Types the Smart Way
이 장은 Vimscript의 기본 데이터 유형인 숫자, 부동 소수점, 문자열, 리스트, 사전, 특수 변수에 대해 배웠습니다. 이들을 익히는 것이 Vimscript 프로그래밍을 시작하는 첫걸음입니다.

다음 장은 이들을 결합해서 등식, 조건문, 반복문 같은 표현식을 작성하는 방법을 배웁니다.


## Link
- Prev [Ch24. Vim Runtime](./ch24_vim_runtime.md)
- Next [Ch26. Vimscript Conditionals and Loops](./ch26_vimscript_conditionals_and_loops.md)
