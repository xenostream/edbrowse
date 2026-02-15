# Ch27. Vimscript Variable Scopes
Vimscript 함수를 살펴보기 전에, Vim 변수의 다양한 출처와 범위에 대해 알아봅시다.


## Mutable and Immutable Variables
Vim에서 변수에 값을 할당하려면 `let` 을 사용합니다:

```
let pancake = "pancake"
```

나중에 언제든지 그 변수를 호출할 수 있습니다.

```
echo pancake
" returns "pancake"
```

`let` 은 가변적입니다. 즉, 향후 언제든지 값을 변경할 수 있습니다.

```
let pancake = "pancake"
let pancake = "not waffles"

echo pancake
" returns "not waffles"
```

설정된 변수의 값을 변경하려면 여전히 `let` 을 사용해야 합니다.

```
let beverage = "milk"

beverage = "orange juice"
" throws an error
```

`const` 를 사용해서 불변 변수를 정의할 수 있습니다. 불변이므로 변수 값이 할당된 후에는 다른 값으로 재할당할 수 없습니다.

```
const waffle = "waffle"
const waffle = "pancake"
" throws an error
```


## Variable Sources
변수의 출처는 환경 변수, 옵션 변수, 레지스터 변수 세 가지입니다.


### Environment Variable
Vim은 터미널 환경 변수에 접근할 수 있습니다. 예를 들어, 터미널에서 `SHELL` 환경 변수를 사용할 수 있다면 Vim에서 다음과 같이 접근할 수 있습니다:

```
echo $SHELL
" returns $SHELL value. In my case, it returns /bin/bash
```


### Option Variable
Vim 옵션은 `&` 로 접근할 수 있습니다. (`set` 으로 접근하는 설정입니다.)

예를 들어, Vim이 사용하는 배경을 확인하려면 다음을 실행합니다:

```
echo &background
" returns either "light" or "dark"
```

또는 `set background?` 명령어를 실행해서 `background` 옵션의 값을 확인할 수 있습니다.


### Register Variable
Vim 레지스터(제8장)는 `@` 로 접근할 수 있습니다.

레지스터 a에 “chocolate” 값이 저장되어 있다고 가정합니다. 이를 접근하려면 `@a` 를 사용하면 됩니다. `let` 을 사용해서 업데이트할 수도 있습니다.

```
echo @a
" returns chocolate

let @a .= " donut"

echo @a
" returns "chocolate donut"
```

이제 레지스터 `a` (`“ap`)에서 붙여넣으면 ”chocolate donut“ 이 반환됩니다. 연산자 `.=` 는 두 문자열을 연결합니다. 표현식 `let @a .= ” donut“` 는 `let @a = @a . ” donut"` 와 동일합니다.


## Variable Scopes
Vim에는 9가지 서로 다른 변수 범위가 있습니다. 각 범위는 앞에 붙은 문자로 구분할 수 있습니다:

```
g:           전역 변수
{nothing}    전역 변수
b:           버퍼 로컬 변수
w:           윈도우 로컬 변수
t:           탭 로컬 변수
s:           소스된 Vimscript 변수
l:           함수 로컬 변수
a:           함수 형식 매개변수 변수
v:           내장 Vim 변수
```


### Global Variable
“일반” 변수를 선언할 때:

```
let pancake = "pancake"
```

`pancake` 는 실제로 전역 변수입니다. 전역 변수를 정의하면 어디서든 호출할 수 있습니다.

변수 앞에 `g:` 를 붙여도 전역 변수를 생성할 수 있습니다.

```
let g:waffle = "waffle"
```

이 경우 `pancake` 와 `g:waffle` 은 동일한 범위를 가집니다. `g:` 를 붙이거나 붙이지 않고 각각 호출할 수 있습니다.

```
echo pancake
" returns "pancake"

echo g:pancake
" returns "pancake"

echo waffle
" returns "waffle"

echo g:waffle
" returns "waffle"
```


### Buffer Variable
`b:` 로 시작하는 변수는 버퍼 변수입니다. 버퍼 변수는 현재 버퍼(Ch. 02)에 국한된 변수입니다. 여러 버퍼를 열었을 경우, 각 버퍼는 서로 분리된 버퍼 변수 목록을 가집니다.

버퍼 1:

```
const b:donut = "chocolate donut"
```

버퍼 2:

```
const b:donut = "blueberry donut"
```

버퍼 1에서 `echo b:donut` 을 실행하면 “chocolate donut” 을 반환합니다. 버퍼 2에서 실행하면 “blueberry donut” 을 반환합니다.

참고로, Vim은 현재 버퍼에 가해진 모든 변경 사항을 추적하는 **특별한** 버퍼 변수 `b:changedtick` 이 있습니다.

1. `echo b:changedtick` 을 실행하고 반환된 숫자를 기록합니다.
2. Vim에서 변경 사항을 적용합니다.
3. 다시 `echo b:changedtick` 을 실행하고 새로 반환된 숫자를 기록합니다.


### Window Variable
`w:` 로 시작하는 변수는 창 변수입니다. 해당 창에서만 존재합니다.

창 1:

```
const w:donut = "chocolate donut"
```

창 2:

```
const w:donut = "raspberry donut"
```

각 창에서 `echo w:donut` 을 호출하면 고유한 값을 얻을 수 있습니다.


### Tab Variable
`t:` 로 시작하는 변수는 탭 변수입니다. 해당 탭에서만 존재합니다.

탭 1:

```
const t:donut = "chocolate donut"
```

탭 2:

```
const t:donut = "blackberry donut"
```

각 탭에서 `echo t:donut` 을 호출하면 고유한 값을 얻을 수 있습니다.


### Script Variable
`s:` 로 시작하는 변수는 스크립트 변수입니다. 이런 변수는 해당 스크립트 내부에서만 접근할 수 있습니다.

임의의 파일 `dozen.vim` 이 있고 그 안에 다음과 같은 내용이 있다면:

```
let s:dozen = 12

function Consume()
  let s:dozen -= 1
  echo s:dozen " is left"
endfunction
```

`:source dozen.vim` 명령어로 파일을 불러옵니다. 이제 `Consume` 함수를 호출합니다:

```
:call Consume()
" returns "11 is left"

:call Consume()
" returns "10 is left"

:echo s:dozen
" Undefined variable error
```

`Consume` 를 호출하면 예상대로 `s:dozen` 값이 감소하는 것을 확인할 수 있습니다. `s:dozen` 값을 직접 가져오려고 하면 Vim이 해당 변수를 찾을 수 없습니다. 범위를 벗어났기 때문입니다. `s:dozen` 은 `dozen.vim` 내부에서만 접근 가능합니다.

`dozen.vim` 파일을 소스할 때마다 `s:dozen` 카운터가 재설정됩니다. `s:dozen` 값을 감소시키는 도중에 `:source dozen.vim` 을 실행하면 카운터가 12로 재설정됩니다. 이는  사용자에게 예상치 못한 문제가 될 수 있습니다. 이 문제를 해결하려면 코드를 리팩터링합니다:

```
if !exists("s:dozen")
  let s:dozen = 12
endif

function Consume()
  let s:dozen -= 1
  echo s:dozen
endfunction
```

이제 감소 과정 중에 `dozen.vim` 을 소스하면, Vim은 `!exists(“s:dozen”)` 을 읽고 참임을 확인한 후 값을 12로 재설정하지 않습니다.


### Function Local and Function Formal Parameter Variable
함수 내의 변수(`l:`)와 함수 형식 변수(`a:`)는 다음 장에서 다룰 예정입니다.


### Built-in Vim Variables
`v:` 로 시작하는 변수는 Vim의 특수 내장 변수입니다. 이 변수들은 정의할 수 없습니다. 이미 몇 가지를 보셨을 것입니다.

- `v:version` 은 사용 중인 Vim 버전을 알려줍니다.
- `v:key` 는 사전(dictionary)을 반복할 때 현재 항목 값을 담습니다.
- `v:val` 은 `map()` 또는 `filter()` 연산을 실행할 때 현재 항목 값을 담습니다.
- `v:true`, `v:false`, `v:null`, `v:none` 은 특수한 데이터 유형입니다.

기타 변수도 존재합니다. Vim 내장 변수 목록은 `:h vim-variable` 또는 `:h v:` 를 참조합니다.


## Using Vim Variable Scopes the Smart Way
환경 변수, 옵션 변수, 레지스터 변수에 빠르게 접근할 수 있다는 점은 편집기와 터미널 환경을 자유롭게 커스터마이징할 수 있는 폭넓은 유연성을 제공합니다. 또한, Vim은 각각 특정 제약 조건 하에 존재하는 9가지 서로 다른 변수 범위가 있다는 것도 배웠습니다. 이런 독특한 변수 유형을 활용해서 프로그램의 의존성을 분리할 수 있습니다.

자, 여기까지 왔습니다. 데이터 유형, 결합 방법, 변수 범위에 대해 배웠습니다. 이제 남은 것은 단 하나: 함수 뿐입니다.


## Link
- Prev [Ch26. Vimscript Conditionals and Loops](./ch26_vimscript_conditionals_and_loops.md)
- Next [Ch28. Vimscript Functions](./ch28_vimscript_functions.md)
