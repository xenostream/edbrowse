# Ch26. Vimscript Conditionals and Loops
기본 데이터 유형을 학습한 후, 다음 단계는 이를 결합해서 기본 프로그램을 작성하는 방법을 배우는 것입니다. 기본 프로그램은 조건문과 반복문으로 구성됩니다.

이 장은 Vimscript 데이터 유형을 사용해서 조건문과 반복문을 작성하는 방법을 배웁니다.


## Relational Operators
Vimscript 관계 연산자는 많은 프로그래밍 언어와 유사합니다:

```
a == b        같음
a != b        다름
a > b         보다 큼
a >= b        보다 크거나 같음
a < b         보다 작음
a <= b        보다 작거나 같음
```

예를 들어:

```
:echo 5 == 5
:echo 5 != 5
:echo 10 > 5
:echo 10 >= 5
:echo 10 < 5
:echo 5 <= 5
```

문자열은 산술 표현식에서 숫자로 강제 변환된다는 점을 상기합니다. 여기서 Vim은 등호 표현식도 문자열을 숫자로 강제 변환합니다. “5foo” 는 5(참 값)로 강제 변환됩니다:

```
:echo 5 == "5foo"
" returns true
```

또한 문자열을 “foo5” 처럼 숫자가 아닌 문자로 시작하면 해당 문자열이 숫자 0(falsy)로 변환된다는 점을 기억합니다.

```
echo 5 == "foo5"
" returns false
```


### String Logic Operators

Vim은 문자열 비교를 위한 더 많은 관계 연산자를 제공합니다:

```
a =~ b
a !~ b
```

예를 들어:

```
let str = "hearty breakfast"

echo str =~ "hearty"
" returns true

echo str =~ "dinner"
" returns false

echo str !~ "dinner"
" returns true
```

`=~` 연산자는 주어진 문자열에 정규 표현식 일치를 수행합니다. 위의 예에서 `str =~ “hearty”` 는 `str` 이 “hearty” 패턴을 **포함**하므로 참을 반환합니다. `==` 와 `!=` 를 사용할 수도 있지만, 이들을 사용하면 표현식이 문자열 전체와 비교됩니다. `=~` 와 `!~` 는 좀 더 유연한 선택지입니다.

```
echo str == "hearty"
" returns false

echo str == "hearty breakfast"
" returns true
```

다음을 시도합니다. 대문자 “H” 에 주목합니다:

```
echo str =~ "Hearty"
" true
```

“Hearty” 가 대문자로 시작해도 true 를 반환합니다. 흥미롭네요... 알고 보니 제 Vim 설정이 대소문자 구분 무시(`set ignorecase`)로 설정되어 있어서, Vim이 동일성 비교를 할 때 제 Vim 설정을 따라 대소문자를 무시하는 거였습니다. 대소문자 구분 무시 기능을 끄면(`set noignorecase`), 비교 결과가 false 로 바뀝니다.

```
set noignorecase
echo str =~ "Hearty"
" returns false because case matters

set ignorecase
echo str =~ "Hearty"
" returns true because case doesn't matter
```

다른 사람을 위해 플러그인을 작성 중이라면 이건 까다로운 상황입니다. 사용자가 `ignorecase` 를 사용할까요, 아니면 `noignorecase` 를 사용할까요? 사용자에게 무시할 대소문자 옵션을 변경하도록 강요하는 건 절대 원치 않을 겁니다. 그렇다면 어떻게 해야 할까요?

다행히 Vim에는 **항상** 대소문자를 무시하거나 일치시킬 수 있는 연산자가 있습니다. 항상 대소문자를 일치시키려면 끝에 `#` 을 추가하세요.

```
set ignorecase
echo str =~# "hearty"
" returns true

echo str =~# "HearTY"
" returns false

set noignorecase
echo str =~# "hearty"
" true

echo str =~# "HearTY"
" false

echo str !~# "HearTY"
" true
```

비교 시 항상 대소문자를 무시하려면 `?` 를 붙입니다:

```
set ignorecase
echo str =~? "hearty"
" true

echo str =~? "HearTY"
" true

set noignorecase
echo str =~? "hearty"
" true

echo str =~? "HearTY"
" true

echo str !~? "HearTY"
" false
```

저는 항상 대소문자를 구분하고 안전하게 처리하기 위해 `#` 을 사용하는 것을 선호합니다.


## If
이제 Vim의 등호 표현식을 살펴보았으니, 기본적인 조건 연산자인 `if` 문을 살펴보겠습니다.

최소한의 구문은 다음과 같습니다:

```
if {clause}
  {some expression}
endif
```

`elseif` 및 `else` 를 사용해서 분석을 확장할 수 있습니다.

```
if {predicate1}
  {expression1}
elseif {predicate2}
  {expression2}
elseif {predicate3}
  {expression3}
else
  {expression4}
endif
```

예를 들어, 플러그인 [vim-signify](https://github.com/mhinz/vim-signify) 는 사용자의 Vim 설정에 따라 다른 설치 방법을 사용합니다. 다음은 해당 플러그인의 `readme` 에 있는 설치 지침으로, `if` 문을 사용합니다:

```
if has('nvim') || has('patch-8.0.902')
  Plug 'mhinz/vim-signify'
else
  Plug 'mhinz/vim-signify', { 'branch': 'legacy' }
endif
```


## Ternary Expression
Vim은 한 줄로 처리하는 경우 분석을 위한 삼항 표현식을 제공합니다:

```
{predicate} ? expressiontrue : expressionfalse
```

예를 들어:

```
echo 1 ? "I am true" : "I am false"
```

1은 참 값이므로 Vim은 “I am true” 를 출력합니다. 특정 시간 이후에 Vim을 사용할 경우 `background` 를 어둡게 설정하고 싶다면, vimrc에 다음을 추가합니다:

```
let &background = strftime("%H") < 18 ? "light" : "dark"
```

`&background` 는 Vim의 `‘background’` 옵션입니다. `strftime(“%H”)` 는 현재 시간을 시간 단위로 반환합니다. 아직 오후 6시가 아니라면 밝은 배경을 사용합니다. 그렇지 않으면 어두운 배경을 사용합니다.


## or
논리적 “또는”(`||`) 연산자는 많은 프로그래밍 언어와 동일하게 작동합니다.

```
{Falsy expression}  || {Falsy expression}   false
{Falsy expression}  || {Truthy expression}  true
{Truthy expression} || {Falsy expression}   true
{Truthy expression} || {Truthy expression}  true
```

Vim은 표현식을 평가해서 1(참값) 또는 0(거짓값)을 반환합니다.

```
echo 5 || 0
" returns 1

echo 5 || 5
" returns 1

echo 0 || 0
" returns 0

echo "foo5" || "foo5"
" returns 0

echo "5foo" || "foo5"
" returns 1
```

현재 표현식이 참으로 평가되면, 후속 표현식은 평가되지 않습니다.

```
let one_dozen = 12

echo one_dozen || two_dozen
" returns 1

echo two_dozen || one_dozen
" returns error
```

`two_dozen` 은 절대 정의되지 않습니다. `one_dozen || two_dozen` 표현식은 `one_dozen` 이 먼저 평가되어 참으로 판정되므로 Vim이 `two_dozen` 을 평가하지 않으므로 오류가 발생하지 않습니다.


## and
논리적 ‘and’(`&&`)는 논리적 'or' 의 보완입니다.

```
{Falsy Expression}  && {Falsy Expression}   false
{Falsy expression}  && {Truthy expression}  false
{Truthy Expression} && {Falsy Expression}   false
{Truthy expression} && {Truthy expression}  true
```

예를 들어:

```
echo 0 && 0
" returns 0

echo 0 && 10
" returns 0
```

`&&` 연산자는 첫 번째 거짓 값을 만나기 전까지 표현식을 평가합니다. 예를 들어, `true && true` 의 경우 두 표현식 모두 평가되어 `true` 를 반환합니다. `true && false && true` 의 경우 첫 번째 `true` 를 평가한 후 첫 번째 `false` 에서 중단됩니다. 세 번째 `true` 는 평가되지 않습니다.

```
let one_dozen = 12
echo one_dozen && 10
" returns 1

echo one_dozen && v:false
" returns 0

echo one_dozen && two_dozen
" returns error

echo exists("one_dozen") && one_dozen == 12
" returns 1
```


## for
`for` 루프는 일반적으로 리스트 데이터 유형과 함께 사용됩니다.

```
let breakfasts = ["pancakes", "waffles", "eggs"]

for breakfast in breakfasts
  echo breakfast
endfor
```

중첩된 목록과 함께 작동합니다:

```
let meals = [["breakfast", "pancakes"], ["lunch", "fish"], ["dinner", "pasta"]]

for [meal_type, food] in meals
  echo "I am having " . food . " for " . meal_type
endfor
```

기술적으로 `keys()` 메서드를 사용하면 사전(dictionary)에 `for` 루프를 적용할 수 있습니다.

```
let beverages = #{breakfast: "milk", lunch: "orange juice", dinner: "water"}
for beverage_type in keys(beverages)
  echo "I am drinking " . beverages[beverage_type] . " for " . beverage_type
endfor
```


## While
또 다른 일반적인 루프는 `while` 루프입니다.

```
let counter = 1
while counter < 5
  echo "Counter is: " . counter
  let counter += 1
endwhile
```

현재 줄부터 마지막 줄까지의 내용을 가져오려면:

```
let current_line = line(".")
let last_line = line("$")

while current_line <= last_line
  echo getline(current_line)
  let current_line += 1
endwhile
```


## Error Handling
종종 프로그램이 예상한 대로 실행되지 않습니다. 그 결과, 당신은 당황하게 됩니다. (말장난 의도) 필요한 것은 적절한 오류 처리입니다.


### Break
`while` 또는 `for` 루프 내부에서 `break` 를 사용하면 루프가 중단됩니다.

파일 시작부터 현재 줄까지의 텍스트를 가져오되, “donut” 단어를 발견하면 중단하려면:

```
let line = 0
let last_line = line("$")
let total_word = ""

while line <= last_line
  let line += 1
  let line_text = getline(line)
  if line_text =~# "donut"
    break
  endif
  echo line_text
  let total_word .= line_text . " "
endwhile

echo total_word
```

다음과 같은 텍스트가 있다면:

```
one
two
three
donut
four
five
```

위의 `while` 루프를 실행하면 “one two three” 만 출력되고 나머지 텍스트는 출력되지 않습니다. 루프가 “donut” 과 일치하는 순간 중단되기 때문입니다.


### Continue
`continue` 메서드는 루프 내에서 호출되는 점에서 `break` 와 유사합니다. 차이점은 루프를 종료하는 대신 현재 반복을 건너뛰기만 한다는 점입니다.

동일한 텍스트를 가지고 있지만 `break` 대신 `continue` 를 사용한다고 가정해 보겠습니다:

```
let line = 0
let last_line = line("$")
let total_word = ""

while line <= last_line
  let line += 1
  let line_text = getline(line)
  if line_text =~# "donut"
    continue
  endif
  echo line_text
  let total_word .= line_text . " "
endwhile

echo total_word
```

이번에는 `one two three four five` 를 반환합니다. “donut” 이란 단어가 있는 줄은 건너뛰지만, 루프는 계속됩니다.


### try, finally, and catch
Vim은 오류를 처리하기 위해 `try`, `finally`, `catch` 를 제공합니다. 오류를 시뮬레이션하려면 `throw` 명령어를 사용할 수 있습니다.

```
try
  echo "Try"
  throw "Nope"
endtry
```

다음을 실행합니다. Vim은 `"예외 처리 실패: Nope"` 라는 오류 메시지를 표시합니다.

이제 catch 블록을 추가합니다:

```
try
  echo "Try"
  throw "Nope"
catch
  echo "Caught it"
endtry
```

이제 오류가 더 이상 발생하지 않습니다. “Try” 와 “Caught it” 이 표시되야 합니다.

`catch` 를 제거하고 `finally` 를 추가해 보겠습니다:

```
try
  echo "Try"
  throw "Nope"
  echo "You won't see me"
finally
  echo "Finally"
endtry
```

다음을 실행합니다. 이제 Vim이 오류와 “Finally” 를 표시합니다.

이제 모두 합쳐 보겠습니다:

```
try
  echo "Try"
  throw "Nope"
catch
  echo "Caught it"
finally
  echo "Finally"
endtry
```

이번에는 Vim이 “Caught it” 과 “Finally” 를 모두 표시합니다. Vim이 이를 잡아냈기 때문에 오류는 표시되지 않습니다.

오류는 다양한 곳에서 발생합니다. 또 다른 오류 원인은 존재하지 않는 함수를 호출하는 경우입니다. 아래의 `Nope()` 함수처럼 말입니다:

```
try
  echo "Try"
  call Nope()
catch
  echo "Caught it"
finally
  echo "Finally"
endtry
```

`catch` 와 `finally` 의 차이점은 `finally` 는 오류 발생 여부와 상관없이 항상 실행되는 반면, `catch` 는 코드에서 오류가 발생했을 때만 실행된다는 점입니다.

`:catch` 를 사용하면 특정 오류를 잡을 수 있습니다. `:h :catch` 에 따르면:

```
catch /^Vim:Interrupt$/.             " catch interrupts (CTRL-C)
catch /^Vim\\%((\\a\\+)\\)\\=:E/.    " catch all Vim errors
catch /^Vim\\%((\\a\\+)\\)\\=:/.     " catch errors and interrupts
catch /^Vim(write):/.                " catch all errors in :write
catch /^Vim\\%((\\a\\+)\\)\\=:E123:/ " catch error E123
catch /my-exception/.                " catch user exception
catch /.*/                           " catch everything
catch.                               " same as /.*/
```

`try` 블록 내부에서는 인터럽트가 처리 가능한 오류로 간주됩니다.

```
try
  catch /^Vim:Interrupt$/
  sleep 100
endtry
```

vimrc에서 [gruvbox](https://github.com/morhetz/gruvbox) 같은 커스텀 색상 스킴을 사용 중인데, 실수로 색상 스킴 디렉터리를 삭제했지만 vimrc에 `colorscheme gruvbox` 라인이 남아 있다면, Vim은 `source` 명령을 실행할 때 오류를 발생시킵니다. 이를 해결하기 위해 저는 vimrc에 다음을 추가합니다:

```
try
  colorscheme gruvbox
catch
  colorscheme default
endtry
```

`gruvbox` 디렉터리 없이 vimrc를 `source` 하면 Vim은 `colorscheme default` 를 사용합니다.


## Learn Conditionals the Smart Way
이전 장에서 Vim 기본 데이터 유형에 대해 배웠습니다. 이번 장은 조건문과 반복문을 사용해서 기본 프로그램을 작성하기 위해 이들을 결합하는 방법을 배웠습니다. 이것은 프로그래밍의 기초입니다.

다음으로 변수 범위에 대해 알아보겠습니다.


## Link
- Prev [Ch25. Vimscript Basic Data Types](./ch25_vimscript_basic_data_types.md)
- Next [Ch27. Vimscript Variable Scopes](./ch27_vimscript_variable_scopes.md)
