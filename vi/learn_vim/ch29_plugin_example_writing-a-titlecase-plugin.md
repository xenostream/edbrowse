# Ch29. Write a Plugin: Creating a Titlecase Operator
Vim을 잘 다루게 되면 자신만의 플러그인을 만들 수 있습니다. 저는 최근 첫 Vim 플러그인인 [totitle-vim](https://github.com/iggredible/totitle-vim) 을 작성했습니다. 이 플러그인은 Vim의 대문자 변환 `gU`, 소문자 변환 `gu`, 대소문자 전환 `g~` 연산자와 유사한 제목 대소문자 변환 연산자 플러그인입니다.

이 장은 `totitle-vim` 플러그인의 구조를 상세히 설명하겠습니다. 개발 과정을 조명함으로써 여러분이 자신만의 독특한 플러그인을 만들도록 영감을 드리고자 합니다!


## The Problem
저는 이 가이드를 포함해서 모든 글을 Vim으로 작성합니다.

주요 문제 중 하나는 제목에 적절한 타이틀 케이스를 적용하는 것이었습니다. 이를 자동화하는 한 가지 방법은 `g/^#/ s/\<./\u\0/g` 명령으로 헤더의 각 단어 첫 글자를 대문자로 바꾸는 것입니다. 기본적인 용도는 이 명령이 충분했지만, 실제 타이틀 케이스만큼 효과적이진 않았습니다. “Capitalize The First Letter Of Each Word” 라는 문구에서 “The” 와 “Of” 도 대문자로 처리되야 합니다. 적절한 대소문자 처리가 되지 않으면 문장이 약간 어색해 보입니다.

처음에는 플러그인을 만들 계획이 없었습니다. 게다가 이미 제목 대소문자 처리 플러그인([vim-titlecase](https://github.com/christoomey/vim-titlecase)) 이 존재한다는 사실도 알게 되었습니다. 하지만, 몇 가지 기능이 제가 원하는 방식대로 작동하지 않았습니다. 가장 큰 문제는 블록 단위 시각 모드 동작이었습니다. 예를 들어, 다음과 같은 문장이 있을 때:

```
test title one
test title two
test title three
```

“tle” 에 블록 시각적 강조 표시를 사용하면:

```
test ti[tle] one
test ti[tle] two
test ti[tle] three
```

`gt` 를 누르면 플러그인은 대문자로 변환하지 않았습니다. `gu`, `gU`, `g~` 의 동작과 일관성이 없다고 생각했습니다. 그래서, 그 titlecase 플러그인 저장소를 기반으로 작업해서 `gu`, `gU`, `g~` 와 일관된 titlecase 플러그인을 직접 만들기로 했습니다!. 다시 말해, vim-titlecase 플러그인 자체는 훌륭한 플러그인으로 단독으로도 충분히 사용할 가치가 있습니다. (사실은, 아마 마음 한켠에선 그냥 제 자신의 Vim 플러그인을 만들고 싶었던 것 같습니다. 블록 단위 대문자 변환 기능은 극단적인 경우를 제외하면 실제 사용 환경에서 그다지 자주 쓰일 것 같지는 않습니다.)


### Planning for the Plugin
첫 줄의 코드를 작성하기 전에, 제목 대소문자 규칙이 무엇인지 결정해야 합니다. [titlecaseconverter 사이트](https://titlecaseconverter.com/rules/) 에서 다양한 대소문자 규칙을 정리한 깔끔한 표를 찾았습니다. 영어는 최소 8가지 서로 다른 대소문자 규칙이 있다는 사실을 알고 계셨나요? **헉!**

결국 해당 목록에서 공통점을 추출해서 플러그인에 적용할 기본 규칙을 마련했습니다. 게다가 사람들이 “야, 너 AMA를 쓰면서 왜 APA는 안 써?”라고 불평할 것 같진 않네요. 기본 규칙은 다음과 같습니다:

- 첫 단어는 항상 대문자로 시작합니다.
- 일부 부사, 접속사, 전치사는 소문자로 표기합니다.
- 입력 단어가 완전히 대문자인 경우 아무 작업도 처리하지 않습니다. (약어일 수 있음)

어떤 단어를 소문자로 표기할지는 규칙마다 목록이 다릅니다. 저는 `a an and at but by en for in nor of off on or out per so the to up yet vs via` 를 따르기로 결정했습니다.


### Planning for the User Interface
이 플러그인은 Vim의 기존 대소문자 변환 연산자(`gu`, `gU`, `g~`)를 보완하는 연산자가 되길 원합니다. 연산자로서, 이동 명령이나 텍스트 객체를 인수로 받아야 합니다. (`gtw` 는 다음 단어의 첫 글자를 대문자로, `gtiw` 는 괄호 안 단어의 첫 글자를 대문자로, `gt$` 는 현재 위치부터 줄 끝까지의 단어들을 대문자로, `gtt` 는 현재 줄 전체를 대문자로, `gti(` 는 괄호 안 단어들을 대문자로 변환하고 또한 쉬운 기억을 위해 `gt` 로 매핑되길 원합니다. 게다가 모든 시각 모드(`v`, `V`, `Ctrl-V`)에서 작동해야 합니다. **어떤** 시각 모드든 텍스트를 강조 표시한 후 `gt` 를 누르면, 강조 표시된 모든 텍스트가 대문자로 변환되야 합니다.


## Vim Runtime
리포지토리를 살펴보면 가장 먼저 눈에 띄는 것은 `plugin/` 과 `doc/` 라는 두 개의 디렉터리가 있다는 점입니다. Vim을 시작하면 `~/.vim` 디렉터리 내부의 특수 파일과 디렉터리를 검색하고 해당 디렉터리 내의 모든 스크립트 파일을 실행합니다. 자세한 내용은 Vim 런타임 장을 참고합니다.

이 플러그인은 두 개의 Vim 런타임 디렉터리를 사용합니다: `doc/` 와 `plugin/`, `doc/` 는 도움말 문서를 저장하는 공간입니다. (나중에 `:h totitle` 처럼 키워드를 검색할 수 있도록) 도움말 페이지 생성 방법은 나중에 설명하겠습니다. 지금은 `plugin/` 에 집중해 보겠습니다. `plugin/` 디렉터리는 Vim이 시작될 때 한 번만 실행됩니다. 이 디렉터리에는 `totitle.vim` 이란 파일 하나가 있습니다. 파일 이름은 중요하지 않습니다. (`whatever.vim` 이라 해도 작동합니다.) 플러그인 작동에 필요한 모든 코드는 이 파일 안에 있습니다.


## Mappings
코드를 살펴보겠습니다!

파일 시작 부분에 다음과 같은 내용이 있습니다:

```
if !exists('g:totitle_default_keys')
  let g:totitle_default_keys = 1
endif
```

Vim을 시작할 때 `g:totitle_default_keys` 는 아직 존재하지 않으므로 `!exists(...)` 는 참을 반환합니다. 이 경우 `g:totitle_default_keys` 를 1로 정의합니다. Vim은 0이 거짓값(falsy)이고 0이 아닌 값은 참값(truthy)입니다. (참값을 나타내려면 1을 사용합니다.)

파일 맨 아래로 이동합니다. 다음과 같은 내용을 확인할 수 있습니다:

```
if g:totitle_default_keys
  nnoremap <expr> gt ToTitle()
  xnoremap <expr> gt ToTitle()
  nnoremap <expr> gtt ToTitle() .. '_'
endif
```

여기서 주요 `gt` 매핑이 정의됩니다. 이 경우 파일 하단의 `if` 조건문에 도달할 때쯤이면 `if g:totitle_default_keys` 가 1(참값)을 반환하므로, Vim은 다음과 같은 매핑을 수행합니다:

- `nnoremap <expr> gt ToTitle()` 은 일반 모드 **연산자**를 매핑합니다. 이를 통해 `gtw` 같이 다음 단어를 대소문자 구분해서 표기하거나 `gtiw` 같이 내부 단어를 대소문자 구분해서 표기하는 연산자 + 이동/텍스트 객체를 실행할 수 있습니다. 연산자 매핑의 작동 방식에 대한 자세한 내용은 나중에 설명하겠습니다.
- `xnoremap <expr> gt ToTitle()` 은 시각 모드 연산자를 매핑합니다. 이를 통해 시각적으로 강조 표시된 텍스트를 대소문자 변환할 수 있습니다.
- `nnoremap <expr> gtt ToTitle() .. ‘_’` 은 일반 모드에서 줄 단위 연산자(`guu` 및 `gUU` 와 유사)를 매핑합니다. 끝에 있는 `.. ‘_’` 의 역할이 궁금할 수 있습니다. `..` 는 Vim의 문자열 보간 연산자입니다. `_` 는 연산자와 함께 사용되는 이동 명령어입니다. `:help _` 를 보면 언더스코어(`_`)가 아래로 1줄을 카운트하는 데 사용된다고 설명되어 있습니다. 이는 현재 줄에 연산자를 수행합니다. (다른 연산자로 시도합니다. `gU_` 나 `d_` 를 실행해 보면 `gUU` 나 `dd` 와 동일하게 동작함을 알 수 있습니다).
- 마지막으로 `<expr>` 인자를 사용하면 카운트를 지정할 수 있습니다. 따라서, `3gtw` 를 사용하면 다음 3개의 단어에 대소문자를 전환할 수 있습니다.

기본 `gt` 매핑을 사용하지 않으려면 어떻게 해야 할까요? 결국 Vim의 기본 `gt` (탭 다음) 매핑을 재정의하는 것입니다. `gt` 대신 `gz` 를 사용하려면? 이전에 `if !exists(‘g:totitle_default_keys’)` 와 `if g:totitle_default_keys` 를 확인하는 번거로움을 겪었던 것을 기억하시나요? vimrc에 `let g:totitle_default_keys = 0` 을 추가하면, 플러그인이 실행될 때 `g:totitle_default_keys` 가 이미 존재하게 됩니다. (vimrc 코드는 `plugin/` 런타임 파일보다 먼저 실행됨) 따라서, `!exists(‘g:totitle_default_keys’)` 는 false 를 반환합니다. 또한, `if g:totitle_default_keys` 는 거짓값(0 값을 가지므로)이 되므로 `gt` 매핑도 수행되지 않습니다! 이로써 Vimrc에 사용자 정의 매핑을 효과적으로 정의할 수 있습니다.

`gz` 에 대한 사용자 정의 대소문자 변환 매핑을 정의하려면 vimrc에 다음을 추가합니다:

```
let g:totitle_default_keys = 0

nnoremap <expr> gz ToTitle()
xnoremap <expr> gz ToTitle()
nnoremap <expr> gzz ToTitle() .. '_'
```

아주 쉬습니다.


## The ToTitle Function
`ToTitle()` 함수는 이 파일에서 가장 긴 함수임이 분명합니다.

```
 function! ToTitle(type = '')
  if a:type ==# ''
    set opfunc=ToTitle
    return 'g@'
  endif

  " invoke this when calling the ToTitle() function
  if a:type != 'block' && a:type != 'line' && a:type != 'char'
    let l:words = a:type
    let l:wordsArr = trim(l:words)->split('\s\+')
    call map(l:wordsArr, 's:capitalize(v:val)')
    return l:wordsArr->join(' ')
  endif

  " save the current settings
  let l:sel_save = &selection
  let l:reg_save = getreginfo('"')
  let l:cb_save = &clipboard
  let l:visual_marks_save = [getpos("'<"), getpos("'>")]

  try
    set clipboard= selection=inclusive
    let l:commands = #{line: "'[V']y", char: "`[v`]y", block: "`[\<c-v>`]y"}

    silent exe 'noautocmd keepjumps normal! ' .. get(l:commands, a:type, '')
    let l:selected_phrase = getreg('"')
    let l:WORD_PATTERN = '\<\k*\>'
    let l:UPCASE_REPLACEMENT = '\=s:capitalize(submatch(0))'

    let l:startLine = line("'<")
    let l:startCol = virtcol(".")

    " when user calls a block operation
    if a:type ==# "block"
      sil! keepj norm! gv"ad
      keepj $
      keepj pu_

      let l:lastLine = line("$")

      sil! keepj norm "ap

      let l:curLine = line(".")

      sil! keepj norm! VGg@
      exe "keepj norm! 0\<c-v>G$h\"ad"
      exe "keepj " . l:startLine
      exe "sil! keepj norm! " . l:startCol . "\<bar>\"aP"
      exe "keepj " . l:lastLine
      sil! keepj norm! "_dG
      exe "keepj " . l:startLine
      exe "sil! keepj norm! " . l:startCol . "\<bar>"

    " when user calls a char or line operation
    else
      let l:titlecased = substitute(@@, l:WORD_PATTERN, l:UPCASE_REPLACEMENT, 'g')
      let l:titlecased = s:capitalizeFirstWord(l:titlecased)
      call setreg('"', l:titlecased)
      let l:subcommands = #{line: "'[V']p", char: "`[v`]p", block: "`[\<c-v>`]p"}
      silent execute "noautocmd keepjumps normal! " .. get(l:subcommands, a:type, "")
      exe "keepj " . l:startLine
      exe "sil! keepj norm! " . l:startCol . "\<bar>"
    endif
  finally

    " restore the settings
    call setreg('"', l:reg_save)
    call setpos("'<", l:visual_marks_save[0])
    call setpos("'>", l:visual_marks_save[1])
    let &clipboard = l:cb_save
    let &selection = l:sel_save
  endtry
  return
endfunction
```

이건 너무 길어서, 나눠서 보겠습니다.

> [!NOTE]
> 이걸 좀 더 작은 섹션으로 리팩토링할 수 있지만, 이 장을 완성하기 위해 그냥 그대로 뒀습니다.


## The Operator Function
다음은 코드의 첫 번째 부분입니다:

```
if a:type ==# ''
  set opfunc=ToTitle
  return 'g@'
endif
```

`opfunc` 가 대체 뭐야? 왜 `g@` 를 반환하는 거지?

Vim에는 `g@` 라는 특수 연산자, 즉 연산자 함수가 있습니다. 이 연산자를 사용하면 `opfunc` 옵션에 할당된 **어떤** 함수든 사용할 수 있습니다. `opfunc` 에 함수 `Foo()` 가 할당되어 있다면, `g@w` 를 실행할 때 다음 단어에 `Foo()` 를 실행하는 것입니다. `g@i(` 를 실행하면 안쪽 괄호에 `Foo()` 를 실행합니다. 이 연산자 함수는 사용자 정의 Vim 연산자를 만드는 데 핵심적입니다.

다음 줄은 `opfunc` 를 `ToTitle` 함수에 할당합니다.

```
set opfunc=ToTitle
```

다음 줄은 문자 그대로 `g@` 를 반환합니다:

```
return g@
```

그렇다면 정확히 이 두 줄은 어떻게 작동하며 왜 `g@` 를 반환하는 걸까요?

다음과 같은 맵이 있다고 가정해 보겠습니다:

```
nnoremap <expr> gt ToTitle()`
```

그 다음 `gtw` (다음 단어 대문자 첫 글자 변환)를 누릅니다. `gtw` 를 처음 실행할 때 Vim은 `ToTitle()` 메서드를 호출합니다. 하지만, 현재 `opfunc` 는 여전히 비어 있습니다. 또한, `ToTitle()` 에 어떤 인수도 전달하지 않으므로 `a:type` 값은 `‘’` 가 됩니다. 이로 인해 조건식에서 인자 `a:type` 을 검사하는 `if a:type ==# ‘’` 이 참으로 평가됩니다. 내부에서 `set opfunc=ToTitle` 로 `opfunc` 를 `ToTitle` 함수에 할당합니다. 이제 `opfunc` 는 `ToTitle` 로 설정됩니다. 마지막으로 `opfunc` 를 `ToTitle` 함수에 할당한 후 `g@` 를 반환합니다. 왜 `g@` 를 반환하는지는 아래에서 설명하겠습니다.

아직 끝난 게 아닙니다. 방금 `gtw` 를 눌렀다는 점을 기억합니다. `gt` 를 눌러 위의 모든 작업을 수행했지만, 아직 `w` 를 처리해야 합니다. 이 시점에서 `g@` 를 반환함으로써, 기술적으로 `g@w` 를 갖게 됩니다. (이것이 `return g@` 가 필요한 이유입니다.) `g@` 는 함수 연산자이므로, 여기에 `w` 이동 명령을 전달하게 됩니다. 따라서, Vim은 `g@w` 를 수신하면 `ToTitle` 을 **한 번 더** 호출합니다. (조금 후에 보시겠지만 무한 루프에 빠지지 않으니 걱정하지 마세요.)

요약하자면, `gtw` 를 누르면 Vim은 `opfunc` 가 비어 있는지 확인합니다. 비어 있으면 Vim은 `ToTitle` 을 할당합니다. 그런 다음 `g@` 를 반환하는데, 이는 본질적으로 `ToTitle` 을 한 번 더 호출해서 이제 연산자로 사용할 수 있게 합니다. 이것이 사용자 정의 연산자 생성에서 가장 까다로운 부분이며, 여러분은 해냈습니다! 다음으로, 입력값을 실제로 대소문자 변환하기 위한 `ToTitle()` 의 논리를 구축해야 합니다.


## Processing the Input
이제 `gt` 가 `ToTitle()` 을 실행하는 연산자로 작동합니다. 그런데 다음에는 무엇을 해야 할까요? 실제로 텍스트를 제목체로 변환하려면 어떻게 해야 할까요?

Vim에서 어떤 연산자를 실행할 때마다 세 가지 다른 동작 유형이 있습니다: 문자, 줄, 블록. `g@w` (단어)는 문자 연산의 예입니다. `g@j` (한 줄 아래)는 줄 연산의 예입니다. 블록 작업은 드물지만, 일반적으로 `Ctrl-V` (비주얼 블록) 작업을 수행할 때는 블록 작업으로 간주됩니다. 몇 개의 문자 앞/뒤를 대상으로 하는 작업은 일반적으로 문자 작업으로 간주됩니다. (`b`, `e`, `w`, `ge` 등) 몇 줄 아래/위로 이동하는 조작은 일반적으로 줄 조작으로 간주됩니다. (`j`, `k`) 열 단위로 앞으로, 뒤로, 위로, 아래로 이동하는 조작은 일반적으로 블록 조작으로 간주됩니다. (이는 대개 열 단위 강제 이동 또는 블록 단위 시각 모드입니다; 자세한 내용은 `:h forced-motion` 참조)

즉, `g@w` 를 누르면 `g@` 는 리터럴 문자열 `“char”` 를 `ToTitle()` 의 인자로 전달합니다. `g@j` 를 누르면 `g@` 는 리터럴 문자열 `“line”` 을 `ToTitle()` 의 인자로 전달합니다. 이 문자열이 `ToTitle` 함수에 `type` 인자로 전달됩니다.


## Creating Your Own Custom Function Operator
잠시 멈추고 `g@` 를 사용해서 가짜 함수를 작성합니다:

```
function! Test(some_arg)
  echom a:some_arg 
endfunction
```

이제 다음 명령을 실행해서 해당 함수를 `opfunc` 에 할당합니다:

```
:set opfunc=Test
```

`g@` 연산자는 `Test(some_arg)` 를 실행하며, 수행하는 작업에 따라 `“char”`, `‘line’` 또는 `“block”` 을 인수로 전달합니다. `g@iw` (내부 단어), `g@j` (한 줄 아래), `g@$` (줄 끝까지) 등 다양한 연산을 실행합니다. 출력되는 값이 어떻게 달라지는지 확인합니다. 블록 연산을 테스트하려면 Vim의 `g@Ctrl-Vj`(한 열 아래 블록 연산) 강제 이동을 사용할 수 있습니다.

비주얼 모드도 사용할 수 있습니다. `v`, `V`, `Ctrl-V` 등 다양한 비주얼 하이라이트를 사용한 후 `g@` 를 누릅니다. 

> [!CAUTION]
> 주의: 출력 에코가 매우 빠르게 깜빡이므로 눈치 빠르게 확인해야 합니다. 하지만, 에코는 분명히 존재합니다. 또한, `echom`을 사용 중이므로 `:messages` 로 기록된 에코 메시지를 확인할 수 있습니다.

꽤 멋지지 않나요? Vim으로 프로그래밍할 수 있는 것들! 학교에서 왜 이런 걸 가르쳐주지 않았을까요? 플러그인 작업을 계속합니다.


## ToTitle As a Function
다음 몇 줄로 넘어가겠습니다:

```
if a:type != 'block' && a:type != 'line' && a:type != 'char'
  let l:words = a:type
  let l:wordsArr = trim(l:words)->split('\s\+')
  call map(l:wordsArr, 's:capitalize(v:val)')
  return l:wordsArr->join(' ')
endif
```

이 줄은 실제로 `ToTitle()` 연산자의 동작과는 무관하며, 호출 가능한 TitleCase 함수로 활성화하기 위한 것입니다. (네, 단일 책임 원칙을 위반하고 있다는 걸 알고 있습니다.) 동기는 Vim이 기본적으로 `toupper()` 와 `tolower()` 함수를 제공해서 주어진 문자열을 대문자/소문자로 변환해 주기 때문입니다. 예: `:echo toupper(‘hello’)` 는 `‘HELLO’` 를 반환하고, `:echo tolower(‘HELLO’)` 는 `‘hello’` 를 반환합니다. 이 플러그인이 `ToTitle` 을 실행할 수 있도록 해서 `:echo ToTitle(‘once upon a time’)` 를 실행하면 `‘Once Upon a Time’` 을 반환값으로 얻을 수 있게 하고 싶습니다.

지금쯤이면 `g@` 와 함께 `ToTitle(type)` 을 호출할 때 `type` 인자의 값이 `‘block’`, `‘line’` 또는 `‘char’` 중 하나임을 알 것입니다. 인자가 `‘block’`, `‘line’`, `‘char’` 중 어느 것도 아닌 경우, `ToTitle()` 이 `g@` 외부에서 호출되고 있다고 안전하게 가정할 수 있습니다. 이 경우 공백(`\s\+`)으로 분할해서 다음과 같이 처리합니다:

```
let l:wordsArr = trim(l:words)->split('\s\+')
```

그런 다음 각 요소를 대문자로 변환합니다:


```
call map(l:wordsArr, ‘s:capitalize(v:val)’)
```

다시 합치기 전에:

```
l:wordsArr->join(‘ ’)
```


`capitalize()` 함수는 나중에 다룰 예정입니다.


## Temporary Variables

다음 몇 줄은:

```
let l:sel_save = &selection
let l:reg_save = getreginfo('"')
let l:cb_save = &clipboard
let l:visual_marks_save = [getpos("'<"), getpos("'>")]
```

이 명령어들은 다양한 현재 상태를 임시 변수에 저장합니다. 이후 시각 모드, 마크, 레지스터를 사용합니다. 이 작업들은 몇 가지 상태를 변경합니다. 변경 내역을 수정하고 싶지 않으므로, 나중에 상태를 복원할 수 있도록 임시 변수에 저장합니다.


## Capitalizing the Selections

다음 줄들이 중요합니다:

```
try
  set clipboard= selection=inclusive
  let l:commands = #{line: "'[V']y", char: "`[v`]y", block: "`[\<c-v>`]y"}

  silent exe 'noautocmd keepjumps normal! ' .. get(l:commands, a:type, '')
  let l:selected_phrase = getreg('"')
  let l:WORD_PATTERN = '\<\k*\>'
  let l:UPCASE_REPLACEMENT = '\=s:capitalize(submatch(0))'

  let l:startLine = line("'<")
  let l:startCol = virtcol(".")

```

작은 단위로 살펴보겠습니다:

```
set clipboard= selection=inclusive
```

먼저 `selection` 옵션을 포함 모드로 설정하고 `clipboard` 를 비워둡니다. 선택 속성은 일반적으로 시각 모드에서 사용되며 `old`, `inclusive`, `exclusive` 세 가지 가능한 값이 있습니다. 포함 모드로 설정하면 선택 영역의 마지막 문자가 포함됩니다. 여기서 자세히 다루지 않겠지만, 핵심은 ‘포함' 으로 설정하면 비주얼 모드에서 일관된 동작을 보장한다는 점입니다. 기본적으로 Vim은 '포함' 으로 설정하지만, 플러그인 중 하나가 다른 값으로 설정할 경우를 대비해서 여기서 직접 설정합니다. 실제 동작이 궁금하다면 `:h 'clipboard’` 와 `:h ‘selection’` 을 참고합니다.

다음으로 이상하게 보이는 해시 기호 뒤에 실행 명령어가 있습니다:

```
let l:commands = #{line: "'[V']y", char: "`[v`]y", block: "`[\<c-v>`]y"}
silent exe 'noautocmd keepjumps normal! ' .. get(l:commands, a:type, '')
```

첫째, `#{}` 구문은 Vim의 사전 데이터 유형입니다. 로컬 변수 `l:commands` 는 ‘lines’, ‘char’, ‘block' 을 키로 하는 해시입니다. 명령어 `silent exe ’...'` 는 문자열 내부의 명령어를 조용히 실행합니다. (그렇지 않으면 화면 하단에 알림이 표시됩니다.) 

둘째, 실행된 명령어는 `‘noautocmd keepjumps normal! ’ .. get(l:commands, a:type, ‘’)` 입니다. 첫 번째 명령어 `noautocmd` 는 후속 명령어를 자동 명령어 트리거 없이 실행합니다. 두 번째 명령어 `keepjumps` 는 커서 이동 시 커서 이동을 기록하지 않도록 합니다. Vim은 특정 이동 명령은 변경 목록, 점프 목록, 마크 목록에 자동으로 기록됩니다. 이 명령들은 이를 방지합니다. `noautocmd` 와 `keepjumps` 를 사용하는 목적은 이런 부작용을 막기 위함입니다. 마지막으로 `normal` 명령은 문자열을 일반 명령으로 실행합니다. `..` 는 Vim의 문자열 보간 구문입니다. `get()` 은 리스트, 블롭 또는 사전(dictionary)을 인수로 받는 게터 메서드입니다. 이 경우 사전 `l:commands` 를 전달합니다. 키는 `a:type` 입니다. 앞서 `a:type` 은 ‘char’, ‘line’, ‘block’ 세 가지 문자열 값 중 하나임을 배웠습니다. 따라서, `a:type` 이 ‘line' 인 경우 `“noautocmd keepjumps normal! ’[V']y”` 를 실행합니다. (자세한 내용은 `:h silent`, `:h :exe`, `:h :noautocmd`, `:h :keepjumps`, `:h :normal`, `:h get()` 을 참조합니다.)

`‘[V’]y` 가 수행하는 작업을 살펴보겠습니다. 먼저 다음과 같은 본문 텍스트를 가정합니다:

```
the second breakfast
is better than the first breakfast
```

커서가 첫 번째 줄에 있다고 가정합니다. 그런 다음 `g@j` 를 누릅니다. (`j` 를 사용해서 한 줄 아래에서 연산자 함수 `g@` 를 실행) `'[` 는 커서를 이전에 변경하거나 붙여넣은 텍스트의 시작 부분으로 이동시킵니다. 기술적으로 `g@j` 로 텍스트를 변경하거나 붙여넣지 않았지만, Vim은 `g@` 명령의 시작 및 종료 위치 정보를 `‘[` 과 `’]` 으로 기억합니다. (자세한 내용은 `:h g@` 참조) 이 경우 `'[` 을 누르면 커서가 첫 번째 줄로 이동하는데, 이는 `g@` 실행 시 시작 위치이기 때문입니다. `V` 는 줄 단위 시각 모드 명령어입니다. 마지막으로 `']` 는 커서를 이전에 변경하거나 복사한 텍스트의 끝으로 이동시키지만, 이 경우는 마지막 `g@` 작업의 끝으로 커서를 이동시킵니다. 마지막으로 `y` 는 선택된 텍스트를 복사합니다.

방금 수행한 작업은 `g@` 를 실행한 동일한 텍스트 블록을 복사한 것입니다.

여기서 다른 두 명령어를 살펴보면:

```
let l:commands = #{line: "'[V']y", char: "`[v`]y", block: "`[\<c-v>`]y"}
```

모두 비슷한 동작을 수행하지만, 줄 단위 동작 대신 문자 단위 또는 블록 단위 동작을 사용한다는 점이 다릅니다. 반복되는 말처럼 들리겠지만, 세 경우 모두 `g@` 를 수행한 동일한 텍스트 블록을 효과적으로 복사하는 것입니다.

다음 줄을 살펴보겠습니다:

```
let l:selected_phrase = getreg('"')
```

이 줄은 이름 없는 레지스터(`"`)의 내용을 가져와서 변수 `l:selected_phrase` 에 저장합니다. 잠깐만요... 방금 텍스트 본문을 복사하지 않았나요? 이름 없는 레지스터에는 방금 복사한 텍스트가 들어 있습니다. 이 플러그인이 텍스트 복사본을 가져올 수 있는 방식이 바로 이것입니다.

다음 줄은 정규 표현식 패턴입니다:

```
let l:WORD_PATTERN = '\<\k*\>'
```

`\<`와 `\>`는 단어 경계 패턴입니다. `\<` 뒤에 오는 문자는 단어의 시작을, `\>` 앞에 오는 문자는 단어의 끝을 일치시킵니다. `\k` 는 키워드 패턴입니다. Vim이 어떤 문자를 키워드로 받아들이는지 확인하려면 `:set iskeyword?` 를 사용합니다. Vim에서 `w` 이동 명령은 커서를 단어 단위로 이동시킨다는 점을 기억합니다. Vim은 “키워드” 에 대한 사전 정의된 개념을 가지고 있습니다. (`iskeyword` 옵션을 변경해서 편집할 수도 있음) 자세한 내용은 `:h /\<`, `:h /\>`, `:h /\k` 및 `:h ‘iskeyword’` 를 참조합니다. 마지막으로, `*` 는 뒤따르는 패턴이 0개 이상 반복됨을 의미합니다.

전체적으로 `‘\<\k*\>’` 는 단어를 일치시킵니다. 문자열이 있다면:

```
one two three
```

패턴과 일치시키면 세 개의 일치 항목(“one”, ‘two’, “three”)이 반환됩니다.

마지막으로 다른 패턴이 있습니다:

```
let l:UPCASE_REPLACEMENT = ‘\=s:capitalize(submatch(0))’
```

Vim의 substitute 명령어는 `\={your-expression}` 형식의 표현식과 함께 사용할 수 있습니다. 예를 들어, 현재 줄에서 “donut” 문자열을 대문자로 바꾸려면 Vim의 `toupper()` 함수를 사용할 수 있습니다. `:%s/donut/\=toupper(submatch(0))/g` 를 실행합니다. `submatch(0)` 은 substitute 명령어에서 사용되는 특수 표현식입니다. 일치된 전체 텍스트를 반환합니다.

다음 두 줄:

```
let l:startLine = line("'<")
let l:startCol = virtcol(".")
```

`line()` 표현식은 줄 번호를 반환합니다. 여기서는 마지막으로 선택한 시각적 영역의 첫 번째 줄을 나타내는 마크 `‘<` 와 함께 전달합니다. 텍스트를 붙여넣기 위해 시각 모드를 사용했음을 기억합니다. `’<` 는 해당 시각적 영역 선택의 시작 부분의 줄 번호를 반환합니다. `virtcol()` 표현식은 현재 커서의 열 번호를 반환합니다. 곧 커서를 여기저기 이동할 것이므로, 나중에 다시 돌아올 수 있도록 커서 위치를 저장해야 합니다.

여기서 잠시 멈추고 지금까지 배운 내용을 복습합니다. 제대로 따라오고 있는지 확인합니다. 준비되면 계속 진행합니다.


## Handling a Block Operation
이 부분을 살펴보겠습니다:

```
if a:type ==# "block"
  sil! keepj norm! gv"ad
  keepj $
  keepj pu_

  let l:lastLine = line("$")

  sil! keepj norm "ap

  let l:curLine = line(".")

  sil! keepj norm! VGg@
  exe "keepj norm! 0\<c-v>G$h\"ad" 
  exe "keepj " . l:startLine
  exe "sil! keepj norm! " . l:startCol . "\<bar>\"aP"
  exe "keepj " . l:lastLine
  sil! keepj norm! "_dG
  exe "keepj " . l:startLine
  exe "sil! keepj norm! " . l:startCol . "\<bar>"
```

이제 텍스트를 실제로 대문자로 변환할 때입니다. `a:type` 이 ‘char’, ‘line’, ‘block’ 중 하나임을 기억합니다. 대부분의 경우 'char' 와 'line' 을 처리합니다. 하지만, 가끔 블록을 처리할 수도 있습니다. 드문 경우지만, 그럼에도 불구하고 반드시 처리해야 합니다. 안타깝게도 블록 처리는 문자나 줄 처리만큼 간단하지 않습니다. 약간의 추가 노력이 필요하지만, 충분히 가능합니다.

시작하기 전에 블록을 받을 수 있는 예를 살펴보겠습니다. 다음과 같은 텍스트를 가정합니다:

```
pancake for breakfast
pancake for lunch
pancake for dinner
```

커서가 첫 번째 줄의 “pancake” 라는 단어의 ‘c’ 에 있다고 가정합니다. 그런 다음 시각적 블록 선택(`Ctrl-V`)을 사용해서 아래로 및 앞으로 선택해서 세 줄 모두의 “cake” 를 선택합니다:

```
pan[cake] for breakfast
pan[cake] for lunch
pan[cake] for dinner
```

`gt` 를 누르면 다음과 같은 결과를 얻으려 합니다:

```
panCake for breakfast
panCake for lunch
panCake for dinner

```

기본 가정 사항은 다음과 같습니다: “pancakes” 에서 세 개의 “cake” 를 강조 표시할 때, Vim에 강조 표시할 세 줄의 단어가 있다고 알려주는 것입니다. 이 단어들은 “cake”, “cake”, “cake” 입니다. 결과는 “Cake”, ‘Cake’, “Cake” 가 될 것으로 예상합니다.

이제 구현 세부 사항으로 넘어가 보겠습니다. 다음 몇 줄에는 다음과 같은 내용이 있습니다:

```
sil! keepj norm! gv"ad
keepj $
keepj pu_
let l:lastLine = line("$")
sil! keepj norm "ap
let l:curLine = line(".")
```

첫 번째 줄:

```
sil! keepj norm! gv"ad
```

`sil!` 은 조용히 실행되며 `keepj` 는 이동 시 점프 기록을 유지합니다. 그런 다음 일반 명령어 `gv“ad` 를 실행합니다. `gv` 는 시각적으로 강조 표시된 마지막 텍스트를 선택합니다. (팬케이크 예에서 세 개의 'cakes' 를 모두 다시 강조 표시합니다.) `”ad` 는 시각적으로 강조 표시된 텍스트를 삭제하고 레지스터 a에 저장합니다. 결과적으로 다음과 같은 상태가 됩니다:

```
pan for breakfast
pan for lunch
pan for dinner
```

이제 레지스터 a에 'cakes' 라는 3개의 **블록**(줄이 아님)이 저장됩니다. 이 구분은 중요합니다. 줄 단위 시각 모드로 텍스트를 붙여넣는 것과 블록 단위 시각 모드로 텍스트를 붙여넣는 것은 다릅니다. 나중에 다시 볼 것이므로 이 점을 명심합니다.

다음으로 다음과 같은 상황이 있습니다:

```
keepj $
keepj pu_
```

`$` 는 파일의 마지막 줄로 이동합니다. `pu_` 는 커서 위치 바로 아래에 한 줄을 삽입합니다. 점프 기록을 변경하지 않으려면 `keepj` 와 함께 실행해야 합니다.

그런 다음 마지막 줄의 줄 번호(`line(“$”)`) 를 로컬 변수 `lastLine` 에 저장합니다.

```
let l:lastLine = line("$")
```

그런 다음 레지스터의 내용을 `norm "ap` 로 붙여넣습니다.

```
sil! keepj norm "ap
```

이 작업은 파일의 마지막 줄 아래에 새로 생성한 줄에서 수행된다는 점을 명심합니다. 현재 파일의 맨 아래에 위치해 있습니다. 붙여넣기하면 다음과 같은 **블록** 텍스트가 생성됩니다:

```
cake
cake
cake
```

다음으로, 커서가 위치한 현재 줄의 위치를 저장합니다.

```
let l:curLine = line(".")
```

자, 이제 다음 몇 줄을 살펴보겠습니다:

```
sil! keepj norm! VGg@
exe "keepj norm! 0\<c-v>G$h\"ad"
exe "keepj " . l:startLine
exe "sil! keepj norm! " . l:startCol . "\<bar>\"aP"
exe "keepj " . l:lastLine
sil! keepj norm! "_dG
exe "keepj " . l:startLine
exe "sil! keepj norm! " . l:startCol . "\<bar>"
```

다음 라인:

```
sil! keepj norm! VGg@
```

`VG` 는 현재 줄부터 파일 끝까지 줄 단위 시각 모드로 시각적으로 강조 표시합니다. 따라서, 여기서 ‘cake’ 텍스트 세 블록을 줄 단위 강조 표시로 강조하는 것입니다. (블록과 줄의 차이를 기억합니다.) 처음 세 개의 “cake” 텍스트를 붙여넣을 때는 블록 단위로 붙여넣었습니다. 지금은 줄 단위로 강조 표시하고 있습니다. 겉보기는 같아 보일 수 있지만, 내부적으로 Vim은 텍스트 블록 붙여넣기와 텍스트 줄 붙여넣기의 차이를 인식합니다.

```
cake
cake
cake
```

`g@` 는 함수 연산자이므로, 본질적으로 자신을 재귀적으로 호출합니다. 그런데 왜 그럴까요? 이로 인해 어떤 결과가 발생하나요?

`g@` 에 재귀 호출을 수행하면서 ‘cake’ 텍스트의 3줄 전체를 전달합니다. (`V` 로 실행한 후에는 블록이 아닌 줄 단위로 처리됨) 이 텍스트는 코드의 다른 부분에서 처리됩니다. (나중에 설명할 내용입니다.) `g@` 실행 결과는 제목 대문자 처리된 텍스트 3줄입니다:

```
Cake
Cake
Cake
```

다음 라인:

```
exe "keepj norm! 0\<c-v>G$h\"ad"
```

이 명령은 일반 모드에서 줄 시작 부분(`0`)으로 이동하는 명령을 실행한 후, 블록 시각 하이라이트를 사용해서 해당 줄의 마지막 줄과 마지막 문자(`<c-v>G$`)로 이동합니다. `h` 는 커서를 조정하기 위한 것입니다. (`$` 를 수행할 때 Vim은 오른쪽으로 한 줄 더 이동합니다.) 마지막으로, 하이라이트된 텍스트를 삭제하고 레지스터 a에 저장합니다. (`"ad`)

다음 라인:

```
exe "keepj " . l:startLine
```

커서를 `startLine` 이 있던 위치로 되돌립니다.

다음 라인:

```
exe "sil! keepj norm! " . l:startCol . "\<bar>\"aP"
```

`startLine` 위치에 있을 때, 이제 `startCol` 로 표시된 열로 이동합니다. `\<bar>\` 는 바(bar) `|` 이동 명령어입니다. Vim의 바 이동은 커서를 n번째 열로 이동시킵니다. (예를 들어 `startCol` 이 4라면, `4|` 실행 시 커서가 4번째 열 위치로 이동합니다.) `startCol` 은 제목체로 변환하려는 텍스트의 열 위치를 저장한 위치임을 기억합니다. 마지막으로 `"aP` 는 레지스터 a에 저장된 텍스트를 붙여넣습니다. 이는 삭제된 위치에 텍스트를 다시 복원합니다.

다음 4줄을 살펴보겠습니다:

```
exe "keepj " . l:lastLine
sil! keepj norm! "_dG
exe "keepj " . l:startLine
exe "sil! keepj norm! " . l:startCol . "\<bar>"
```

`exe “keepj ” . l:lastLine` 는 커서를 이전의 `lastLine` 위치로 되돌립니다. `sil! keepj norm! “_dG` 는 블랙홀 레지스터(`”_dG`)를 사용해서 생성된 여분의 공백을 삭제해서 이름 없는 레지스터가 깨끗히 유지되도록 합니다. `exe “keepj ” . l:startLine` 는 커서를 `startLine` 로 되돌립니다. 마지막으로, `exe “sil! keepj norm! ” . l:startCol . “\<bar>”` 는 커서를 `startCol` 열로 이동시킵니다.

이 모든 작업은 Vim에서 수동으로 수행할 수 있습니다. 하지만, 이런 작업을 재사용 가능한 함수로 전환하면, 대문자 표기(titlecase)가 필요한 때마다 30줄 이상의 명령어를 매번 실행할 필요가 없어진다는 장점이 있습니다. 여기서 핵심은, Vim에서 수동으로 할 수 있는 모든 작업은 재사용 가능한 함수로, 즉 플러그인으로 전환할 수 있다는 점입니다!

다음은 그 예입니다.

주어진 텍스트:

```
pancake for breakfast
pancake for lunch
pancake for dinner

... some text
```

먼저, 블록 단위로 시각적으로 강조 표시합니다:

```
pan[cake] for breakfast
pan[cake] for lunch
pan[cake] for dinner

... some text
```

그런 다음 삭제하고 그 텍스트를 레지스터 a에 저장합니다:

```
pan for breakfast
pan for lunch
pan for dinner

... some text
```

그런 다음 파일 하단에 붙여넣습니다:

```
pan for breakfast
pan for lunch
pan for dinner

... some text
cake
cake
cake
```

그런 다음 대문자로 표기합니다:

```
pan for breakfast
pan for lunch
pan for dinner

... some text
Cake
Cake
Cake
```

마지막으로 대문자로 표기한 텍스트를 다시 넣습니다:

```
panCake for breakfast
panCake for lunch
panCake for dinner

... some text
```


## Handling Line and Char Operations
아직 끝난 게 아닙니다. 블록 텍스트에 `gt` 를 실행할 때의 특수한 경우만 처리했을 뿐입니다. ‘줄' 과 '문자’ 연산도 처리해야 합니다. `else` 코드를 살펴보면서 어떻게 처리하는지 알아보겠습니다.

다음은 해당 코드입니다:

```
if a:type ==# "block"
  # ... 
else
  let l:titlecased = substitute(@@, l:WORD_PATTERN, l:UPCASE_REPLACEMENT, 'g')
  let l:titlecased = s:capitalizeFirstWord(l:titlecased)
  call setreg('"', l:titlecased)
  let l:subcommands = #{line: "'[V']p", char: "`[v`]p", block: "`[\<c-v>`]p"}
  silent execute "noautocmd keepjumps normal! " .. get(l:subcommands, a:type, "")
  exe "keepj " . l:startLine
  exe "sil! keepj norm! " . l:startCol . "\<bar>"
endif
```

한 줄씩 살펴보겠습니다. 이 플러그인의 핵심은 사실 이 줄에 있습니다:

```
let l:titlecased = substitute(@@, l:WORD_PATTERN, l:UPCASE_REPLACEMENT, 'g')
```

`@@` 는 제목 대문자 처리할 이름 없는 레지스터의 텍스트를 포함합니다. `l:WORD_PATTERN` 은 개별 키워드 일치 항목입니다. `l:UPCASE_REPLACEMENT` 는 `capitalize()` 명령어 호출입니다. (나중에 보게 됩니다.) `‘g’` 는 대체 명령어가 첫 번째 단어 뿐만 아니라 주어진 모든 단어를 대체하도록 지시하는 전역 플래그입니다.

다음 라인:

```
let l:titlecased = s:capitalizeFirstWord(l:titlecased)
```

이렇게 하면 첫 단어는 항상 대문자로 시작하게 됩니다. “an apple a day keeps the doctor away” 같은 문장의 경우, 첫 단어인 “an” 은 특수 단어이므로 대체 명령어가 이를 대문자로 바꾸지 않습니다. 어떤 경우도 첫 글자를 항상 대문자로 만드는 방법이 필요합니다. 이 함수는 바로 그 역할을 합니다. (이 함수의 세부 사항은 나중에 살펴보게 됩니다.) 이런 대문자 처리 방법의 결과는 로컬 변수 `l:titlecased` 에 저장됩니다.

다음 라인:

```
call setreg('"', l:titlecased)
```

이것은 대문자로 변환된 문자열을 이름 없는 레지스터(`"`)에 넣습니다.

다음으로, 다음 두 줄:

```
let l:subcommands = #{line: "'[V']p", char: "`[v`]p", block: "`[\<c-v>`]p"}
silent execute "noautocmd keepjumps normal! " .. get(l:subcommands, a:type, "")
```

어라, 이거 익숙한데! `l:commands` 에서 비슷한 패턴을 본 적 있습니다. yank 대신 paste(`p`)를 사용합니다. 복습을 위해 `l:commands` 를 다룬 이전 섹션을 확인합니다.

마지막으로, 다음 두 줄:

```
exe "keepj " . l:startLine
exe "sil! keepj norm! " . l:startCol . "\<bar>"
```

커서를 시작했던 줄과 열로 되돌리고 있습니다. 그게 전부입니다!

다시 정리해 보겠습니다. 위의 대체 메서드는 주어진 텍스트를 대문자로 변환하고 특수 단어(자세한 내용은 후술)를 건너뛸 만큼 똑똑합니다. 제목체 문자열을 생성한 후에는 이름 없는 레지스터에 저장합니다. 그런 다음 `g@` 명령어로 작업한 것과 정확히 동일한 텍스트를 시각적으로 강조 표시한 후, 이름 없는 레지스터에 붙여넣습니다. (이는 효과적으로 제목체가 아닌 텍스트를 제목체 버전으로 대체합니다.) 마지막으로 커서를 시작 위치로 되돌립니다.


## Cleanups
기술적으로는 완료되었습니다. 텍스트는 이제 제목체로 변환되었습니다. 남은 작업은 레지스터와 설정을 복원하는 것뿐입니다.

```
call setreg('"', l:reg_save)
call setpos("'<", l:visual_marks_save[0])
call setpos("'>", l:visual_marks_save[1])
let &clipboard = l:cb_save
let &selection = l:sel_save
```

다음 항목들을 복원합니다:

- 이름이 지정되지 않은 레지스터
- `<` 및 `>` 기호
- `‘clipboard’` 및 `‘selection’` 옵션

휴, 끝났습니다. 꽤 긴 함수였습니다. 작은 함수들로 분할해서 좀 더 짧게 만들 수도 있었지만, 지금은 이 정도로 충분합니다. 이제 대문자 변환 함수들을 간단히 살펴보겠습니다.


## The Capitalize Function
이 섹션은 `s:capitalize()` 함수를 살펴보겠습니다. 이 함수는 다음과 같습니다:

```
function! s:capitalize(string)
    if(toupper(a:string) ==# a:string && a:string != 'A')
        return a:string
    endif

    let l:str = tolower(a:string)
    let l:exclusions = '^\(a\|an\|and\|at\|but\|by\|en\|for\|in\|nor\|of\|off\|on\|or\|out\|per\|so\|the\|to\|up\|yet\|v\.?\|vs\.?\|via\)$'
    if (match(l:str, l:exclusions) >= 0) || (index(s:local_exclusion_list, l:str) >= 0)
      return l:str
    endif

    return toupper(l:str[0]) . l:str[1:]
endfunction
```

`capitalize()` 함수의 인자 `a:string` 은 `g@` 연산자가 전달하는 개별 단어임을 상기합니다. 따라서, “pancake for breakfast” 텍스트에 `gt` 를 실행하면 `ToTitle` 은 `capitalize(string)` 을 **세 번** 호출합니다. “pancake” 에 한 번, “for” 에 한 번, “breakfast” 에 한 번씩 호출됩니다.

함수의 첫 부분은 다음과 같습니다:

```
if(toupper(a:string) ==# a:string && a:string != 'A')
  return a:string
endif
```

첫 번째 조건(`toupper(a:string) ==# a:string`)은 인자의 대문자 변환 버전이 문자열과 동일한지, 그리고 문자열 자체가 “A” 인지 확인합니다. 이 조건들이 참이면 해당 문자열을 반환합니다. 이는 주어진 단어가 이미 완전히 대문자로 변환된 경우 약어라는 가정에서 비롯됩니다. 예를 들어, “CEO” 라는 단어는 그렇지 않으면 “Ceo” 로 변환됩니다. 음, 당신의 CEO는 기뻐하지 않을 겁니다. 따라서, 완전히 대문자로 된 단어는 그대로 두는 것이 가장 좋습니다. 두 번째 조건인 `a:string != ‘A’` 는 대문자 “A” 문자에 경계를 처리합니다. `a:string` 이 이미 대문자 “A” 인 경우, `toupper(a:string) ==# a:string` 테스트를 우연히 통과할 수 있습니다. 영어에서 “a” 는 부정 관사이므로 소문자로 변환해야 합니다.

다음 부분은 문자열을 소문자로 강제 변환합니다:

```
let l:str = tolower(a:string)
```


다음 부분은 모든 단어 제외 목록의 정규 표현식입니다. 이 목록은 https://titlecaseconverter.com/rules/ 에서 가져왔습니다:

```
let l:exclusions = '^\(a\|an\|and\|at\|but\|by\|en\|for\|in\|nor\|of\|off\|on\|or\|out\|per\|so\|the\|to\|up\|yet\|v\.?\|vs\.?\|via\)$'
```

다음 부분:

```
if (match(l:str, l:exclusions) >= 0) || (index(s:local_exclusion_list, l:str) >= 0)
  return l:str
endif
```

먼저, 문자열이 제외 단어 목록(`l:exclusions`)에 포함되어 있는지 확인합니다. 포함되어 있다면 대문자로 변환하지 않습니다. 그런 다음 문자열이 로컬 제외 목록(`s:local_exclusion_list`)에 포함되어 있는지 확인합니다. 이 제외 목록은 사용자가 vimrc에 추가할 수 있는 사용자 정의 목록입니다. (사용자가 특수 단어에 대한 추가 요구 사항이 있는 경우)

마지막 단계는 단어의 대문자 변환된 버전을 반환합니다. 첫 글자는 대문자로 변환되고 나머지 글자는 그대로 유지됩니다.

```
return toupper(l:str[0]) . l:str[1:]
```

두 번째 대문자 변환 함수를 살펴보겠습니다. 함수는 다음과 같습니다:

```
function! s:capitalizeFirstWord(string)
  if (a:string =~ "\n")
    let l:lineArr = trim(a:string)->split('\n')
    let l:lineArr = map(l:lineArr, 'toupper(v:val[0]) . v:val[1:]')
    return l:lineArr->join("\n")
  endif
  return toupper(a:string[0]) . a:string[1:]
endfunction
```

이 함수는 “an apple a day keeps the doctor away” 처럼 문장이 제외된 단어로 시작하는 극단적인 경우를 처리하기 위해 만들어졌습니다. 영어 대소문자 규칙에 따르면, 문장의 첫 단어는 특별한 단어인지 여부와 상관없이 반드시 대문자로 시작해야 합니다. `substitute()` 명령만 사용하면 문장의 “an” 이 소문자로 변환됩니다. 첫 글자를 강제로 대문자로 처리해야 합니다.

이 `capitalizeFirstWord` 함수에서 `a:string` 인자는 `capitalize` 함수 내부의 `a:string` 처럼 개별 단어가 아니라 전체 텍스트를 가리킵니다. 따라서 “pancake for breakfast” 의 경우 `a:string` 값은 “pancake for breakfast” 가 됩니다. 전체 텍스트에 대해 `capitalizeFirstWord` 를 단 한 번만 실행합니다.

주의해야 할 시나리오 중 하나는 `“an apple a day\nkeeps the doctor away”` 같은 여러 줄로 구성된 문자열입니다. 모든 줄의 첫 글자를 대문자로 변환해야 합니다. 줄바꿈이 없다면 단순히 첫 글자를 대문자로 변환하면 됩니다.

```
return toupper(a:string[0]) . a:string[1:]
```

줄바꿈이 있는 경우 각 줄의 첫 글자를 모두 대문자로 변환해야 하므로, 줄바꿈으로 구분된 배열로 분할합니다:

```
let l:lineArr = trim(a:string)->split('\n')
```

그런 다음 배열의 각 요소를 순회하며 각 요소의 첫 번째 단어의 첫 글자를 대문자로 변경합니다:

```
let l:lineArr = map(l:lineArr, 'toupper(v:val[0]) . v:val[1:]')
```

마지막으로 배열 요소들을 합칩니다:

```
return l:lineArr->join("\n")
```

이제 끝났습니다!


## Docs
저장소의 두 번째 디렉터리는 `docs/` 디렉터리입니다. 플러그인에 대한 철저한 문서를 제공하는 것이 좋습니다. 이 섹션은 자체 플러그인 문서를 만드는 방법을 간략히 살펴보겠습니다.

`docs/` 디렉터리는 Vim의 특수 런타임 경로 중 하나입니다. Vim은 `docs/` 내의 모든 파일을 읽으므로 특정 키워드를 검색할 때 해당 키워드가 `docs/` 디렉터리 내의 파일에서 발견되면 도움말 페이지에 표시됩니다. 여기 `totitle.txt` 파일이 있습니다. 플러그인 이름이므로 이렇게 명명했지만 원하는 대로 이름을 지정할 수 있습니다.

Vim 도움말 파일은 기본적으로 텍스트 파일입니다. 일반 텍스트 파일과 Vim 도움말 파일의 차이는 후자가 특별한 “help” 구문을 사용한다는 점입니다. 하지만, 먼저 Vim이 이를 일반 텍스트 파일 유형이 아닌 `help` 파일 유형으로 처리하도록 설정해야 합니다. 이 `totitle.txt` 를 **도움말** 파일로 해석하도록 Vim에 지시하려면 `:set ft=help` 를 실행합니다. (자세한 내용은 `:h ‘filetype’` 참조) 

> [!NOTE]
> 참고로, `totitle.txt` 를 **일반** 텍스트 파일로 해석하도록 Vim에 지시하려면 `:set ft=txt` 를 실행합니다.


### The Help File Special Syntax
키워드를 검색 가능하게 하려면 해당 키워드를 별표로 둘러쌉니다. 사용자가 `:h totitle` 을 검색할 때 `totitle` 키워드가 검색되도록 하려면 도움말 파일에서 `*totitle*` 로 작성합니다.

예를 들어, 목차 상단에 다음과 같은 줄이 있습니다:

```
TABLE OF CONTENTS                                     *totitle*  *totitle-toc*

// more TOC stuff
```

참고로 두 개의 키워드인 `*totitle*` 과 `*totitle-toc*` 를 사용해서 목차 섹션을 표시했습니다. 원하는 만큼 키워드를 사용할 수 있습니다. 즉, `:h totitle` 또는 `:h totitle-toc` 중 하나를 검색할 때마다 Vim은 이 위치로 이동합니다.

파일 하단 어딘가에 있는 또 다른 예입니다:

```
2. Usage                                                       *totitle-usage*

// usage
```

`:h totitle-usage` 를 검색하면 Vim은 이 섹션으로 이동합니다.

도움말 파일 내의 다른 섹션을 참조하려면 키워드를 `|` 기호로 둘러싸서 내부 링크를 사용할 수도 있습니다. 목차 섹션에서 `|totitle-intro|`, `|totitle-usage|` 등과 같이 기호로 둘러싸인 키워드를 확인할 수 있습니다.

```
TABLE OF CONTENTS                                     *totitle*  *totitle-toc*

    1. Intro ........................... |totitle-intro|
    2. Usage ........................... |totitle-usage|
    3. Words to capitalize ............. |totitle-words|
    4. Operator ........................ |totitle-operator|
    5. Key-binding ..................... |totitle-keybinding|
    6. Bugs ............................ |totitle-bug-report|
    7. Contributing .................... |totitle-contributing|
    8. Credits ......................... |totitle-credits|

```
이를 통해 정의로 이동할 수 있습니다. 커서를 `|totitle-intro|` 어느 위치에 놓고 `Ctrl-]` 을 누르면 Vim이 해당 단어의 정의로 이동합니다. 이 경우 `*totitle-intro*` 위치로 이동합니다. 이렇게 하면 도움말 문서 내의 다른 키워드로 연결할 수 있습니다.

Vim에서 문서 파일을 작성하는 데 정해진 방식은 없습니다. 다양한 작성자의 플러그인을 살펴보면 각기 다른 형식을 사용하는 경우가 많습니다. 핵심은 사용자가 이해하기 쉬운 도움말 문서를 만드는 것입니다.

마지막으로, 처음에 로컬에서 자체 플러그인을 작성 중이고 문서 페이지를 테스트할 경우, 단순히 `~/.vim/docs/` 안에 txt 파일을 추가하는 것만으로는 키워드 검색이 자동으로 가능해지지 않습니다. Vim에 문서 페이지를 추가하도록 지시해야 합니다. 새로운 태그 파일을 생성하려면 `:helptags ~/.vim/doc` 명령을 실행합니다. 이제 키워드 검색을 시작할 수 있습니다.


## Conclusion
끝까지 잘 따라오셨습니다! 이 장은 모든 Vimscript 장들을 종합한 내용입니다. 지금까지 배운 것들을 실제로 적용하는 단계입니다. 이 글을 읽으신 후에는 Vim 플러그인을 만드는 방법을 이해했을 뿐만 아니라, 여러분만의 플러그인을 작성하려는 동기도 얻으셨기를 바랍니다.

같은 작업 순서를 반복해서 수행할 때마다, 여러분만의 플러그인을 만들어 보시기 바랍니다! 바퀴를 다시 발명하지 말라는 말이 있습니다. 하지만, 배움을 위해 바퀴를 다시 발명하는 것은 유익할 수 있다고 생각합니다. 다른 사람들의 플러그인을 읽어보시기 바랍니다. 그리고 재현해 보시기 바랍니다. 그로부터 배웁니다. 직접 작성해 보시기 바랍니다! 누가 알겠습니까, 이 글을 읽고 나서 다음에 나올 멋진, 엄청나게 인기 있는 플러그인을 당신이 만들지도 모르니까요. 이 다음 전설적인 팀 포프(Tim Pope)가 될 수도 있습니다. 그렇게 된다면 꼭 저에게 알려주세요!! 


## Link
- Prev [Ch28. Vimscript Functions](./ch28_vimscript_functions.md)
