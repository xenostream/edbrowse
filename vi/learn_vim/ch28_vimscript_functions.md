# Ch28. Vimscript Functions
함수는 추상화의 수단이며, 새로운 언어를 배우는 데 있어 세 번째 요소입니다.

이전 장들에서 여러분은 Vimscript 내장 함수(`len()`, `filter()`, `map()` 등)와 사용자 정의 함수가 작동하는 모습을 봤습니다. 이 장은 함수가 어떻게 작동하는지 좀 더 깊이 있게 배웁니다.


## Function Syntax Rules
기본적으로 Vimscript 함수는 다음과 같은 구문을 가집니다:

```
function {FunctionName}()
  {do-something}
endfunction
```

함수 정의는 대문자로 시작해야 합니다. `function` 키워드로 시작해서 `endfunction` 으로 끝납니다. 다음은 유효한 함수 예입니다:

```
function! Tasty()
  echo "Tasty"
endfunction
```

다음은 대문자로 시작하지 않으므로 유효한 함수가 아닙니다.

```
function tasty()
  echo "Tasty"
endfunction
```

함수 앞에 스크립트 변수(`s:`)를 붙이면 소문자로 사용할 수 있습니다. `function s:tasty()` 는 유효한 이름입니다. Vim이 대문자 이름을 요구하는 이유는 Vim의 내장 함수(모두 소문자)와 혼동을 방지하기 위함입니다.

함수명은 숫자로 시작할 수 없습니다. `1Tasty()` 는 유효한 함수명이 아니지만 `Tasty1()` 은 가능합니다. 또한, 함수명은 `_` 이외의 영숫자가 아닌 문자를 포함할 수 없습니다. `Tasty-food()`, `Tasty&food()`, `Tasty.food()`는 유효한 함수명이 아닙니다. `Tasty_food()` 는 **유효합니다**.

동일한 이름의 함수를 두 개 정의하면 Vim은 `Tasty` 함수가 이미 존재한다는 오류 메시지를 표시합니다. 기존 함수를 덮어쓰려면 `function` 키워드 뒤에 `!` 를 추가합니다.

```
function! Tasty()
  echo "Tasty"
endfunction
```


## Listing Available Functions
Vim의 모든 내장 및 사용자 정의 함수를 보려면 `:function` 명령을 실행합니다. `Tasty` 함수의 내용을 보려면 `:function Tasty` 를 실행합니다.

Vim의 검색 탐색(`/pattern`)과 유사하게 `:function /pattern` 으로 패턴을 사용해서 함수를 검색할 수도 있습니다. “map” 이란 단어가 포함된 모든 함수를 검색하려면 `:function /map` 을 실행합니다. 외부 플러그인을 사용하는 경우 Vim은 해당 플러그인에 정의된 함수도 표시합니다.

함수의 출처를 확인하려면 `:function` 명령과 함께 `:verbose` 명령을 사용할 수 있습니다. “map” 이란 단어가 포함된 모든 함수의 출처를 확인하려면 다음을 실행합니다:

```
:verbose function /map
```

실행해 보니 여러 결과가 나왔습니다. 이 결과는 `fzf#vim#maps` 자동 로드 함수(요약하자면 23장을 참조합니다.)가 `~/.vim/plugged/fzf.vim/autoload/fzf/vim.vim` 파일의 1263번째 줄에 작성되어 있음을 알려줍니다. 이는 디버깅에 유용합니다.

```
function fzf#vim#maps(mode, ...)
        Last set from ~/.vim/plugged/fzf.vim/autoload/fzf/vim.vim line 1263
```


## Removing a Function
기존 함수를 제거하려면 `:delfunction {함수명}` 을 사용합니다. `Tasty` 함수를 삭제하려면 `:delfunction Tasty` 를 실행합니다.


## Function Return Value
함수가 값을 반환하려면 명시적인 `return` 값을 전달해야 합니다. 그렇지 않으면 Vim은 자동으로 암시적인 값 0을 반환합니다.

```
function! Tasty()
  echo "Tasty"
endfunction
```

빈 `return`도 0 값과 동일합니다.

```
function! Tasty()
  echo "Tasty"
  return
endfunction
```

위의 함수를 사용해서 `:echo Tasty()` 를 실행하면, Vim이 “Tasty” 를 표시한 후 암시적 반환값인 0을 반환합니다. `Tasty()` 가 “Tasty” 값을 반환하려면 다음과 같이 처리할 수 있습니다:

```
function! Tasty()
  return "Tasty"
endfunction
```

이제 `:echo Tasty()` 를 실행하면 “Tasty” 문자열이 반환됩니다.

표현식 안에서 함수를 사용할 수 있습니다. Vim은 해당 함수의 반환값을 사용합니다. 표현식 `:echo Tasty() . “ Food!”` 는 “Tasty Food!” 를 출력합니다.


## Formal Arguments
`Tasty` 함수에 형식 매개변수 `food` 를 전달하려면 다음과 같이 할 수 있습니다:

```
function! Tasty(food)
  return "Tasty " . a:food
endfunction

echo Tasty("pastry")
" returns "Tasty pastry"
```

`a:` 는 지난 장에서 언급된 변수 범위 중 하나입니다. 이는 형식 매개변수 변수입니다. 함수 내에서 형식 매개변수 값을 받는 Vim의 방식입니다. 이를 사용하지 않으면 Vim은 오류를 발생시킵니다:

```
function! Tasty(food)
  return "Tasty " . food
endfunction

echo Tasty("pasta")
" returns "undefined variable name" error
```


## Function Local Variable
이전 장에서 배우지 않은 다른 변수인 함수 내 변수(`l:`)에 대해 알아보겠습니다.

함수를 작성할 때 내부에서 변수를 정의할 수 있습니다:

```
function! Yummy()
  let location = "tummy"
  return "Yummy in my " . location
endfunction

echo Yummy()
" returns "Yummy in my tummy"
```

이 맥락에서 변수 `location` 은 `l:location` 과 동일합니다. 함수 내에서 변수를 정의하면 해당 변수는 그 함수에 **로컬**합니다. 사용자가 `location` 을 보면 전역 변수로 오해하기 쉽습니다. 저는 간결함보다 명확함을 선호하므로, 함수 변수임을 나타내기 위해 `l:` 을 붙이는 것을 선호합니다.

`l:count` 를 사용하는 또 다른 이유는 Vim에 일반 변수와 유사한 별칭을 가진 특수 변수가 존재하기 때문입니다. `v:count` 가 대표적인 예입니다. 이 변수는 `count` 라는 별칭을 가집니다. Vim에서 `count` 를 호출하는 것은 `v:count` 를 호출하는 것과 동일합니다. 이런 특수 변수를 실수로 호출하기 쉽습니다.

```
function! Calories()
  let count = "count"
  return "I do not " . count . " my calories"
endfunction

echo Calories()
" throws an error
```

위의 실행은 `let count = “Count”` 가 암묵적으로 Vim의 특수 변수 `v:count` 를 재정의하려 시도하기 때문에 오류를 발생시킵니다. 특수 변수(`v:`)는 읽기 전용임을 기억합니다. 이를 변경할 수 없습니다!! 수정하려면 `l:count` 를 사용합니다:

```
function! Calories()
  let l:count = "count"
  return "I do not " . l:count . " my calories"
endfunction

echo Calories()
" returns "I do not count my calories"
```


## Calling a Function
Vim은 함수를 호출하는 `:call` 명령어가 있습니다.

```
function! Tasty(food)
  return "Tasty " . a:food
endfunction

call Tasty("gravy")
```

`call` 명령어는 반환 값을 출력하지 않습니다. `echo` 와 함께 호출해 보겠습니다.

```
echo call Tasty("gravy")
```

아이고, 오류가 발생했네요. 위의 `call` 명령어는 명령줄 명령어(`:call`)입니다. 위의 `echo` 명령어도 명령줄 명령어(`:echo`)입니다. 명령줄 명령어를 다른 명령줄 명령어로 호출할 수는 없습니다. 다른 형태의 `call` 명령어를 시도해 보겠습니다:

```
echo call("Tasty", ["gravy"])
" returns "Tasty gravy"
```

혼란을 없애기 위해 설명하자면, 방금 두 가지 다른 `call` 명령어를 사용했습니다: 명령줄 명령어인 `:call` 과 함수인 `call()` 입니다. `call()` 함수는 첫 번째 인자로 함수 이름(문자열)을, 두 번째 인자로 형식 매개변수(목록)를 받습니다.

`:call` 과 `call()` 에 대해 좀 더 알아보려면 `:h call()` 과 `:h :call` 을 확인합니다.


## Default Argument
함수 매개변수에 기본값을 지정하려면 `=` 를 사용합니다. `Breakfast` 를 하나의 인자로만 호출하면 `beverage` 인자는 기본값인 “milk” 를 사용합니다.

```
function! Breakfast(meal, beverage = "Milk")
  return "I had " . a:meal . " and " . a:beverage . " for breakfast"
endfunction

echo Breakfast("Hash Browns")
" returns I had hash browns and milk for breakfast

echo Breakfast("Cereal", "Orange Juice")
" returns I had Cereal and Orange Juice for breakfast
```


## Variable Arguments
세 개의 점(`...`)을 사용해서 가변 인수를 전달할 수 있습니다. 가변 인수는 사용자가 몇 개의 변수를 제공할지 알 수 없을 때 유용합니다.

무제한 뷔페를 만든다고 가정합니다. (고객이 얼마나 많은 음식을 먹을지 절대 알 수 없습니다.):

```
function! Buffet(...)
  return a:1
endfunction
```

`echo Buffet(“Noodles”)` 를 실행하면 “Noodles” 가 출력됩니다. Vim은 `a:1` 을 사용해서 `...` 에 전달된 **첫 번째** 인자를 최대 20개 출력합니다. (`a:1` 은 첫 번째 인자, `a:2` 는 두 번째 인자 등) `echo Buffet(“Noodles”, ‘Sushi’)` 를 실행하면 여전히 “Noodles” 만 표시됩니다. 업데이트해 보겠습니다:

```
function! Buffet(...)
  return a:1 . " " . a:2
endfunction

echo Buffet("Noodles", "Sushi")
" returns "Noodles Sushi"
```

이 접근법의 문제는 `echo Buffet(“Noodles”)` (변수 하나만 있는 경우)를 실행하면 Vim이 정의되지 않은 변수 `a:2` 가 있다고 오류 메시지를 표시한다는 점입니다. 사용자가 정확히 입력한 내용을 표시할 수 있도록 어떻게 유연하게 만들 수 있을까요?

다행히 Vim에는 `...` 로 전달된 인자의 **개수**를 표시하는 특수 변수 `a:0` 이 있습니다.

```
function! Buffet(...)
  return a:0
endfunction

echo Buffet("Noodles")
" returns 1

echo Buffet("Noodles", "Sushi")
" returns 2

echo Buffet("Noodles", "Sushi", "Ice cream", "Tofu", "Mochi")
" returns 5
```

이를 통해 인자의 길이를 사용해서 반복할 수 있습니다.

```
function! Buffet(...)
  let l:food_counter = 1
  let l:foods = ""
  while l:food_counter <= a:0
    let l:foods .= a:{l:food_counter} . " "
    let l:food_counter += 1
  endwhile
  return l:foods
endfunction
```

중괄호 `a:{l:food_counter}` 는 문자열 보간입니다. 이는 `food_counter` 카운터의 값을 사용해서 형식 매개변수 인자 `a:1`, `a:2`, `a:3` 등을 호출합니다.

```
echo Buffet("Noodles")
" returns "Noodles"

echo Buffet("Noodles", "Sushi", "Ice cream", "Tofu", "Mochi")
" returns everything you passed: "Noodles Sushi Ice cream Tofu Mochi"
```

가변 인수는 한 가지 더 `a:000` 특별한 변수가 있습니다. 이 변수는 모든 가변 인수를 리스트 형식으로 가집니다.

```
function! Buffet(...)
  return a:000
endfunction

echo Buffet("Noodles")
" returns ["Noodles"]

echo Buffet("Noodles", "Sushi", "Ice cream", "Tofu", "Mochi")
" returns ["Noodles", "Sushi", "Ice cream", "Tofu", "Mochi"]
```

함수를 `for` 루프를 사용하도록 리팩토링해 보겠습니다:

```
function! Buffet(...)
  let l:foods = ""
  for food_item in a:000
    let l:foods .= food_item . " "
  endfor
  return l:foods
endfunction

echo Buffet("Noodles", "Sushi", "Ice cream", "Tofu", "Mochi")
" returns Noodles Sushi Ice cream Tofu Mochi
```


## Range
함수 정의 끝에 `range` 키워드를 추가해서 **범위 지정**된 Vimscript 함수를 정의할 수 있습니다. 범위 지정된 함수는 `a:firstline` 과 `a:lastline` 이란 두 개의 특수 변수가 사용 가능합니다.

```
function! Breakfast() range
  echo a:firstline
  echo a:lastline
endfunction
```

100번째 줄에서 `call Breakfast()` 를 실행하면 `firstline` 과 `lastline` 모두 100을 표시합니다. 101~105번째 줄을 시각적으로 선택(`v`, `V` 또는 `Ctrl-V`)한 후 `call Breakfast()` 를 실행하면 `firstline` 은 101을, `lastline` 은 105를 표시합니다. `firstline` 과 `lastline` 은 함수가 호출된 최소 및 최대 범위를 표시합니다.

`:call`에 범위를 전달하는 방법도 있습니다. `:11,20call Breakfast()` 를 실행하면 `firstline` 에 11, `lastline` 에 20이 표시됩니다.

“Vimscript 함수가 범위를 받아들이는 건 좋지만, `line(”.“)` 로 줄 번호를 얻을 수 있지 않나요? 같은 결과를 내지 않을까요?” 라고 물을 수도 있습니다.

좋은 질문입니다. 만약 이것이 여러분이 의미하는 바라면:

```
function! Breakfast()
  echo line(".")
endfunction
```

`:11,20call Breakfast()` 를 호출하면 `Breakfast` 함수가 10번 실행됩니다. (범위 내 각 줄마다 한 번씩) `range` 인수를 전달한 경우와 비교합니다:

```
function! Breakfast() range
  echo line(".")
endfunction
```

`11,20call Breakfast()` 를 호출하면 `Breakfast` 함수가 **한 번**만 실행됩니다.

`range` 키워드를 전달하고 `call` 에 숫자 범위(예: `11,20`)를 전달하면 Vim은 해당 함수를 단 한 번만 실행합니다. `range` 키워드를 전달하지 않고 `call` 에 숫자 범위(예: `11,20`)를 전달하면 Vim은 범위에 따라 해당 함수를 N번 실행합니다. (이 경우 N = 10)


## Dictionary
함수를 정의할 때 `dict` 키워드를 추가하면 함수를 사전 항목으로 추가할 수 있습니다.

`breakfast` 항목을 반환하는 `SecondBreakfast` 함수가 있다면:

```
function! SecondBreakfast() dict
  return self.breakfast
endfunction
```

이 함수를 `meals` 사전(dictionary)에 추가합니다:

```
let meals = {"breakfast": "pancakes", "second_breakfast": function("SecondBreakfast"), "lunch": "pasta"}

echo meals.second_breakfast()
" returns "pancakes"
```

`dict` 키워드와 함께 사용될 때, 키 변수 `self` 는 함수가 저장된 사전(이 경우 `meals` 사전)을 가리킵니다. `self.breakfast` 표현식은 `meals.breakfast` 와 동일합니다.

사전 객체에 함수를 추가하는 또 다른 방법은 네임스페이스를 사용하는 것입니다.

```
function! meals.second_lunch()
  return self.lunch
endfunction

echo meals.second_lunch()
" returns "pasta"
```

네임스페이스를 사용하면 `dict` 키워드를 사용할 필요가 없습니다.


## Funcref

함수 참조(funcref)는 함수에 대한 참조입니다. 이는 제24장에서 언급된 Vimscript의 기본 데이터 유형 중 하나입니다.

위의 `function(“SecondBreakfast”)` 표현식은 함수 참조의 예입니다. Vim에는 함수 이름(문자열)을 전달하면 함수 참조를 반환하는 내장 함수 `function()` 이 있습니다.

```
function! Breakfast(item)
  return "I am having " . a:item . " for breakfast"
endfunction

let Breakfastify = Breakfast
" returns error

let Breakfastify = function("Breakfast")

echo Breakfastify("oatmeal")
" returns "I am having oatmeal for breakfast"

echo Breakfastify("pancake")
" returns "I am having pancake for breakfast"
```

Vim에서 함수를 변수에 할당하려면 `let MyVar = MyFunc` 처럼 직접 할당할 수 없습니다. `function()` 함수를 사용해야 합니다. 예를 들어, `let MyVar = function(“MyFunc”)` 와 같이 작성합니다.

맵과 필터는 funcref 를 사용할 수 있습니다. 맵과 필터는 첫 번째 인자로 인덱스를, 두 번째 인자로 반복된 값을 전달한다는 점에 유의합니다.

```
function! Breakfast(index, item)
  return "I am having " . a:item . " for breakfast"
endfunction

let breakfast_items = ["pancakes", "hash browns", "waffles"]
let first_meals = map(breakfast_items, function("Breakfast"))

for meal in first_meals
  echo meal
endfor
```


## Lambda
맵과 필터에서 함수를 사용하는 좀 더 나은 방법은 람다 표현식(이름 없는 함수라고도 함)을 사용하는 것입니다. 예를 들어:

```
let Plus = {x,y -> x + y}
echo Plus(1,2)
" returns 3

let Tasty = { -> 'tasty'}
echo Tasty()
" returns "tasty"
```

람다 표현식 내부에서 함수를 호출할 수 있습니다:

```
function! Lunch(item)
  return "I am having " . a:item . " for lunch"
endfunction

let lunch_items = ["sushi", "ramen", "sashimi"]

let day_meals = map(lunch_items, {index, item -> Lunch(item)})

for meal in day_meals
  echo meal
endfor
```

람다 내부에서 함수를 호출하고 싶지 않다면, 다음과 같이 리팩토링할 수 있습니다:

```
let day_meals = map(lunch_items, {index, item -> "I am having " . item . " for lunch"})
```


## Method Chaining
여러 Vimscript 함수와 람다 표현식을 `->` 로 순차적으로 연결할 수 있습니다. `->` 뒤에는 반드시 **공백 없이** 메서드 이름을 따라야 한다는 점을 유의합니다.

```
Source->Method1()->Method2()->...->MethodN()
```

메서드 체이닝을 사용해서 부동 소수점 숫자를 정수로 변환하려면:

```
echo 3.14->float2nr()
" returns 3
```

좀 더 복잡한 예제를 살펴보겠습니다. 목록의 각 항목 첫 글자를 대문자로 변환한 후, 목록을 정렬하고, 정렬된 목록을 연결해서 하나의 문자열을 생성한다고 가정합니다.

```
function! Capitalizer(word)
  return substitute(a:word, "\^\.", "\\u&", "g")
endfunction

function! CapitalizeList(word_list)
  return map(a:word_list, {index, word -> Capitalizer(word)})
endfunction

let dinner_items = ["bruschetta", "antipasto", "calzone"]

echo dinner_items->CapitalizeList()->sort()->join(", ")
" returns "Antipasto, Bruschetta, Calzone"
```

메서드 체이닝을 사용하면 순서가 좀 더 쉽게 읽고 이해됩니다. `dinner_items->CapitalizeList()->sort()->join(“, ”)` 를 한눈에 훑어보기만 해도 정확히 무슨 일이 일어나는지 알 수 있습니다.


## Closure
함수 내부에서 변수를 정의하면, 해당 변수는 그 함수의 경계 내에서만 존재합니다. 이를 어휘적 범위라고 합니다.

```
function! Lunch()
  let appetizer = "shrimp"

  function! SecondLunch()
    return appetizer
  endfunction

  return funcref("SecondLunch")
endfunction
```

`appetizer` 는 `Lunch` 함수 내부에서 정의되며, 이 함수는 `SecondLunch` 함수 참조를 반환합니다. `SecondLunch` 가 `appetizer` 를 사용하지만, Vimscript는 해당 변수에 접근할 수 없다는 점에 유의합니다. `echo Lunch()()` 를 실행하면 Vim에서 정의되지 않은 변수 오류가 발생합니다.

이 문제를 해결하려면 `closure` 키워드를 사용합니다. 리팩토링해 보겠습니다:

```
function! Lunch()
  let appetizer = "shrimp"

  function! SecondLunch() closure
    return appetizer
  endfunction

  return funcref("SecondLunch")
endfunction
```

이제 `echo Lunch()()` 를 실행하면 Vim은 “shrimp” 를 반환합니다.


## Learn Vimscript Functions the Smart Way
이 장에서 Vim 함수의 구조를 배웠습니다. `range`, `dict`, `closure` 같은 특수 키워드를 활용해서 함수 동작을 수정하는 방법을 익혔습니다. 또한, 람다 표현식을 사용하고 여러 함수를 연결하는 법도 배웠습니다. 함수는 복잡한 추상화를 구현하는 중요한 도구입니다.

이제 배운 내용을 종합해서 직접 플러그인을 만들어 보겠습니다.


## Link
- Prev [Ch27. Vimscript Variable Scopes](./ch27_vimscript_variable_scopes.md)
- Next [Ch29. Write a Plugin: Creating a Titlecase Operator](./ch29_plugin_example_writing-a-titlecase-plugin.md)
