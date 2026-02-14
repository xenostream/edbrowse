# Ch17. Fold
파일을 읽을 때 종종 해당 파일의 기능을 이해하는 데 방해되는 관련 없는 텍스트도  많습니다. 불필요한 잡음을 숨기려면 Vim 폴드를 사용합니다.

이 장은 파일을 폴드하는 다양한 방법을 배웁니다.


## Manual Fold
종이 한 장을 접어서 어떤 텍스트를 가린다고 가정합니다. 실제 텍스트는 사라지지 않고 여전히 존재합니다. Vim 폴드도 같은 방식으로 작동합니다. 텍스트 범위를 접어 표시에서 숨기지만 실제로 삭제하지 않습니다.

폴드 연산자는 `z` 입니다. (종이를 접으면 z 자 모양이 되기 때문입니다.)

다음과 같은 텍스트를 가정합니다:

```
Fold me
Hold me
```

커서를 첫 번째 줄에 두고 `zfj` 를 입력합니다. Vim은 두 줄을 하나로 접습니다. 다음과 같은 모습으로 보입니다:

```
+-- 2 lines: Fold me -----
```

다음은 세부 사항입니다:

- `zf` 는 접기 연산자입니다.
- `j` 는 접기 연산자의 이동 명령어입니다.

접힌 텍스트를 열려면 `zo` 를 사용합니다. 접기를 닫으려면 `zc` 를 사용합니다.

접기는 연산자이므로 문법 규칙(`동사 + 명사`)을 따릅니다. 접기 연산자에 이동 명령이나 텍스트 객체를 전달할 수 있습니다. 내부 단락을 접으려면 `zfip` 을 실행합니다. 파일 끝까지 접으려면 `zfG` 를 실행합니다. `{` 와 `}` 사이의 텍스트를 접으려면 `zfa{` 를 실행합니다.

비주얼 모드에서 접을 수 있습니다. 접을 영역을 선택한 후(`v`, `V` 또는 `Ctrl-v`), `zf` 를 실행합니다.

명령줄 모드에서 `:fold` 명령으로 접을 수 있습니다. 현재 줄과 그 다음 줄을 접으려면 다음을 실행합니다:

```
:,+1fold
```

`,+1` 은 범위입니다. 범위에 매개변수를 전달하지 않으면 기본값은 현재 줄입니다. `+1` 은 다음 줄을 나타내는 범위 지시자입니다. 5번부터 10번 줄까지 접으려면 `:5,10fold` 를 실행합니다. 현재 위치부터 줄 끝까지 접으려면 `:,$fold` 를 실행합니다.

접기 및 펼치기 명령은 매우 다양합니다. 초보자는 너무 많아서 모두 기억하기 어렵습니다. 가장 유용한 명령어는 다음과 같습니다:

- `zR` 모든 접힌 부분을 펼칩니다.
- `zM` 모든 접힌 부분을 접습니다.
- `za` 접힌 부분을 펼치거나 접습니다.

`zR` 과 `zM` 은 어떤 줄에서나 실행할 수 있지만, `za` 는 접히거나 펼쳐진 줄에 있을 때만 작동합니다. 좀 더 많은 접기 명령어를 배우려면 `:h fold-commands` 를 확인합니다.


## Different Fold Methods
위의 섹션은 Vim의 수동 폴딩에 대해 다루었습니다. Vim에는 여섯 가지 다른 폴딩 방법이 있습니다:

1. 수동
2. 들여쓰기
3. 표현식
4. 구문
5. 차이점
6. 마커

현재 사용 중인 폴딩 방법을 확인하려면 `:set foldmethod?` 를 실행합니다. 기본적으로 Vim은 `수동` 방식을 사용합니다.

이 장의 나머지 부분에서 나머지 다섯 가지 접기 방법을 배웁니다. 이제 들여쓰기 접기부터 시작해 보겠습니다.


## Indent Fold
들여쓰기 폴드를 사용하려면 `‘foldmethod’` 를 indent 로 변경합니다:

```
:set foldmethod=indent
```

다음과 같은 텍스트를 가정합니다:

```
One
  Two
  Two again
```

`:set foldmethod=indent` 를 실행하면 다음과 같이 표시됩니다:

```
One
+-- 2 lines: Two -----
```

들여쓰기 폴드 기능에서 Vim은 각 줄의 시작 부분에 있는 공백 수를 확인하고 `‘shiftwidth’` 옵션과 비교해서 폴드 가능 여부를 결정합니다. `‘shiftwidth’` 는 들여쓰기 단계마다 필요한 공백 수를 반환합니다. 다음 명령을 실행하면:

```
:set shiftwidth?
```

Vim의 기본 `‘shiftwidth’` 값은 2입니다. 위의 텍스트에서, 줄 시작과 “Two” 및 “Two again” 텍스트 사이에는 두 개의 공백이 있습니다. Vim은 공백 수와 `‘shiftwidth’` 값이 2임을 확인하고, 해당 줄의 접힘 수준을 1로 간주합니다.

이번에는 줄 시작과 텍스트 사이에 공백이 하나만 있다고 가정해 보겠습니다:

```
One
 Two
 Two again
```

현재 `:set foldmethod=indent` 를 실행하면, 각 줄에 충분한 공간이 없기 때문에 Vim은 들여쓰기된 줄을 접지 않습니다. 한 칸은 들여쓰기로 간주되지 않습니다. 그러나, `‘shiftwidth’`를 1로 변경하면:

```
:set shiftwidth=1
```

텍스트를 접을 수 있습니다. 이제 들여쓰기로 간주됩니다.

`shiftwidth` 를 다시 2로 복원하고 텍스트 사이의 공백도 다시 두 개로 설정합니다. 또한, 두 개의 텍스트를 추가합니다:

```
One
  Two
  Two again
    Three
    Three again
```

`zM` 을 실행하면 다음과 같이 표시됩니다:

```
One
+-- 4 lines: Two -----
```

접힌 줄을 펼칩니다. (`zR`), 그런 다음 커서를 “Three” 에 놓고 텍스트의 접기 상태를 전환합니다. (`za`):

```
One
  Two
  Two again
+-- 2 lines: Three -----
```

이게 뭐지? 폴드 안에 또 폴드?

중첩된 폴드는 유효합니다. “Two” 와 “Two again” 텍스트는 폴드 레벨이 1입니다. “Three” 와 “Three againg” 텍스트는 폴드 레벨이 2입니다. 폴드 가능한 텍스트 안에 폴드 레벨이 더 높은 폴드 가능한 텍스트가 있으면 여러 폴드 레이어가 생성됩니다.


## Expression Fold
표현식 폴드는 폴드에 적용할 표현식을 정의할 수 있습니다. 폴드 표현식을 정의한 후, Vim은 각 줄에서 `foldexpr` 의 값을 스캔합니다. 이 변수를 설정해서 적절한 값을 반환하도록 해야 합니다. `foldexpr` 이 0을 반환하면 해당 줄은 접히지 않습니다. 1을 반환하면 해당 줄의 접힘 수준은 1이 됩니다. 2를 반환하면 해당 줄의 접힘 수준은 2가 됩니다. 정수 이외의 값도 있지만, 여기서는 다루지 않겠습니다. 궁금하면 `:h fold-expr` 을 확인합니다.

먼저, 접힘 방식을 변경해 보겠습니다:

```
:set foldmethod=expr
```

아침 식사 음식 목록이 있고, 'p' 로 시작하는 모든 아침 식사 항목을 접는다고 가정합니다:

```
donut
pancake
pop-tarts
protein bar
salmon
scrambled eggs
```

다음으로, `foldexpr` 을 변경해서 “p” 로 시작하는 표현식을 캡처합니다:

```
:set foldexpr=getline(v:lnum)[0]==\\"p\\"
```

위의 표현식이 복잡해 보입니다. 하나씩 살펴보겠습니다:

- `:set foldexpr` 은 `foldexpr` 옵션을 사용자 정의 표현식을 받아들이도록 설정합니다.
- `getline()` 은 주어진 행의 내용을 반환하는 Vimscript 함수입니다. `:echo getline(5)` 를 실행하면 5번째 행의 내용을 반환합니다.
- `v:lnum` 은 `‘foldexpr’` 표현식을 위한 Vim의 특수 변수입니다. Vim은 각 줄을 스캔하며 해당 시점의 줄 번호를 `v:lnum` 변수에 저장합니다. 5번째 줄에서는 `v:lnum` 의 값이 5가 되고, 10번째 줄에서는 `v:lnum` 의 값이 10이 됩니다.
- `getline(v:lnum)[0]` 에서 `[0]` 은 각 줄의 첫 번째 문자입니다. Vim이 줄을 스캔할 때 `getline(v:lnum)` 은 각 줄의 내용을 반환합니다. `getline(v:lnum)[0]` 은 각 줄의 첫 번째 문자를 반환합니다. 목록의 첫 번째 줄인 “donut” 에서 `getline(v:lnum)[0]` 은 “d” 를 반환합니다. 목록의 두 번째 줄인 “pancake” 에서 `getline(v:lnum)[0]` 은 “p” 를 반환합니다.
- `==\\“p\\”` 는 등호 표현식의 후반부입니다. 방금 평가한 표현식이 “p” 와 동일한지 확인합니다. 참이면 1을 반환하고, 거짓이면 0을 반환합니다. Vim에서 1은 참값(truthy), 0은 거짓값(falsy)입니다. 따라서, “p” 로 시작하는 줄에서는 1을 반환합니다. `‘foldexpr’`의 값이 1이면 폴드 레벨이 1임을 기억합니다.

이 표현식을 실행한 후 다음과 같은 결과를 볼 수 있습니다:

```
donut
+-- 3 lines: pancake -----
salmon
scrambled eggs
```


## Syntax Fold
구문 접기는 구문 언어 강조에 의해 결정됩니다. [vim-polyglot](https://github.com/sheerun/vim-polyglot) 같은 언어 구문 플러그인을 사용한다면, 구문 접기는 곧바로 작동합니다. 접기 방법을 syntax 로 변경하면 됩니다:

```
:set foldmethod=syntax
```

JavaScript 파일을 편집 중이고 vim-polyglot이 설치되어 있다고 가정해 보겠습니다. 다음과 같은 배열이 있다면:

```
const nums = [
  one,
  two,
  three,
  four
]
```

특정 언어에 대한 구문 강조를 정의할 때(일반적으로 `syntax/` 디렉터리 내부), 접을 수 있도록 `fold` 속성을 추가할 수 있습니다. 다음은 vim-polyglot JavaScript 구문 파일의 일부입니다. 끝 부분의 `fold` 키워드를 확인합니다.

```
syntax region  jsBracket                      matchgroup=jsBrackets            start=/\[/ end=/\]/ contains=@jsExpression,jsSpreadExpression extend fold
```

본 가이드는 `syntax` 기능을 다루지 않습니다. 궁금하면 `:h syntax.txt` 를 확인합니다.


## Diff Fold
Vim은 두 개 이상의 파일을 비교하는 diff 절차를 수행할 수 있습니다.

`file1.txt` 파일이 있다면:

```
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
```

그리고 `file2.txt` 파일:

```
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
emacs is ok
```

`vimdiff file1.txt file2.txt` 명령 실행:

```
+-- 3 lines: vim is awesome -----
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
vim is awesome
[vim is awesome] / [emacs is ok]
```

Vim은 동일한 줄 일부를 자동으로 접습니다. `vimdiff` 명령을 실행할 때 Vim은 자동으로 `foldmethod=diff` 를 사용합니다. `:set foldmethod?` 를 실행하면 `diff` 를 반환합니다.


## Marker Fold
마커 폴드를 사용하려면 다음을 실행합니다:

```
:set foldmethod=marker
```

다음과 같은 텍스트를 가정합니다:

```
Hello

{{{
world
vim
}}}
```

`zM` 을 실행하면 다음과 같이 표시됩니다:

```
hello

+-- 4 lines: -----
```

Vim은 `{{{` 와 `}}}` 를 폴드 표시자로 인식해서 그 사이에 있는 텍스트를 폴드합니다. 마커 폴드의 경우, Vim은 폴드 영역을 표시하기 위해 `‘foldmarker’` 옵션으로 정의된 특수 마커를 찾습니다. Vim이 사용하는 마커를 확인하려면 다음 명령을 실행합니다:

```
:set foldmarker?
```

기본적으로 Vim은 `{{{` 와 `}}}` 를 표시자로 사용합니다. 표시자를 “coffee1” 과 “coffee2” 같은 다른 텍스트로 변경하려면:

```
:set foldmarker=coffee1,coffee2
```

다음과 같은 텍스트가 있다면:

```
hello

coffee1
world
vim
coffee2
```

이제 Vim은 `coffee1` 과 `coffee2` 를 새로운 폴딩 마커로 사용합니다. 참고로, 지시자는 리터럴 문자열이어야 하며 정규 표현식이 될 수 없습니다.


## Persisting Fold
Vim 세션을 종료하면 모든 폴드 정보는 사라집니다. `count.txt` 라는 파일이 있다면:

```
one
two
three
four
five
```

그런 다음 “three” 줄부터 아래로 수동 접기 수행(`:3,$fold`):

```
one
two
+-- 3 lines: three ---
```

Vim을 종료하고 `count.txt` 를 다시 열면 폴드는 사라집니다!

폴드를 유지하려면 폴딩 후 다음 명령을 실행합니다:

```
:mkview
```

`count.txt` 파일을 열면 다음 명령을 실행합니다:

```
:loadview
```

폴드가 복원됩니다. 하지만, `mkview` 와 `loadview` 를 수동으로 실행해야 합니다. 언젠가는 파일을 닫기 전에 `mkview` 를 실행하는 걸 잊어버려서 모든 폴드를 잃어버릴 거란 걸 잘 압니다. 이 과정을 자동화하려면 어떻게 해야 할까요?

`.txt` 파일을 닫을 때 자동으로 `mkview` 를 실행하고, `.txt` 파일을 열 때 `loadview` 를 실행하려면 vimrc에 다음을 추가합니다:

```
autocmd BufWinLeave *.txt mkview
autocmd BufWinEnter *.txt silent loadview
```

`autocmd` 는 이벤트 발생 시 명령을 실행하는 데 사용됩니다. 여기서 두 가지 이벤트는 다음과 같습니다:

- `BufWinLeave`: 버퍼를 창에서 제거할 때 발생합니다.
- `BufWinEnter`: 버퍼를 창에 로드할 때 발생합니다.

이제 `.txt` 파일 내에서 폴드를 접고 Vim을 종료한 후, 해당 파일을 다시 열면 폴드 정보가 복원됩니다.

기본적으로 Vim은 `mkview` 실행 시 폴드 정보를 Unix 시스템의 `~/.vim/view` 에 저장합니다. 자세한 내용은 `:h ‘viewdir’`을 참조합니다.


## Learn Fold the Smart Way
Vim을 처음 시작했을 때, 폴드 기능이 유용하지 않다고 생각해서 배우지 않았습니다. 하지만, 코딩을 할수록 폴드 기능이 점점 더 유용하다는 걸 깨달았습니다. 전략적으로 배치된 폴드는 책의 목차처럼 텍스트 구조를 좀 더 제대호 파악할 수 있게 해줍니다.

폴드를 배울 때는 수동 폴드부터 시작합니다. 수동 폴드는 즉석에서 사용할 수 있기 때문입니다. 그런 다음 점진적으로 들여쓰기 폴드와 마커 폴드를 다루는 다양한 기술을 익힙니다. 마지막으로 구문 폴드와 표현식 폴드를 배웁니다. 후자 두 가지를 활용하면 직접 Vim 플러그인을 작성할 수도 있습니다.


## Link
- Prev [Ch16. Tags](./ch16_tags.md)
- Next [Ch18. Git](./ch18_git.md)
