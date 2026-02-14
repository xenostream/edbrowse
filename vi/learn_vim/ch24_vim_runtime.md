# Ch24. Vim Runtime
이전 장들에서 Vim이 `~/.vim/` 디렉토리 내부에 `pack/`(22장)이나 `compiler/`(19장) 같은 특수 경로를 자동으로 탐색한다고 언급한 바 있습니다. 이들은 Vim 런타임 경로의 예입니다.

Vim에는 이 두 가지 외에도 좀 더 많은 런타임 경로가 존재합니다. 본 장은 이런 런타임 경로에 대한 개요를 학습하게 됩니다. 본 장의 목표는 각 경로가 언제 호출되는지 보여주는 데 있습니다. 이를 이해하면 Vim을 좀 더 깊이 이해하고 커스터마이징할 수 있게 됩니다.


## Runtime Path
유닉스 시스템에서 Vim 런타임 경로 중 하나는 `$HOME/.vim/` 입니다. (Windows 같은 다른 운영체제를 사용한다면 경로는 다를 수 있습니다.) 다양한 운영체제의 런타임 경로를 확인하려면 `:h ‘runtimepath’`를 참조합니다. 이 장은 기본 런타임 경로로 `~/.vim/` 을 사용합니다.


## Plugin Scripts
Vim은 플러그인 런타임 경로가 있어, Vim이 시작될 때마다 이 디렉토리 내의 모든 스크립트를 한 번씩 실행합니다. “plugin” 이란 이름을 Vim 외부 플러그인(NERDTree, fzf.vim 등)과 혼동하지 마시기 바랍니다.

`~/.vim/` 디렉터리로 이동해서 `plugin/` 디렉터리를 생성합니다. `donut.vim` 과 `chocolate.vim` 두 개의 파일을 만듭니다

`~/.vim/plugin/donut.vim` 내부:

```
echo “donut!”
```

`~/.vim/plugin/chocolate.vim` 내부:

```
echo “chocolate!”
```

이제 Vim을 종료합니다. 다음에 Vim을 시작하면 `“donut!”` 과 `“chocolate!”` 모두 출력되는 것을 확인할 수 있습니다. 플러그인 런타임 경로는 초기화 스크립트에 사용할 수 있습니다.


## Filetype Detection
시작하기 전에, 이런 감지 기능이 제대로 작동하려면 vimrc 파일에 최소한 다음 줄이 포함되어 있는지 확인합니다:

```
filetype plugin indent on
```

좀 더 자세한 내용은 `:h filetype-overview` 를 참조합니다. 기본적으로 이 설정은 Vim의 파일 유형 감지 기능을 활성화합니다.

새 파일을 열 때 Vim은 일반적으로 파일 유형을 인식합니다. 예를 들어, `hello.rb` 파일을 열면 `:set filetype?` 명령을 실행했을 때 `filetype=ruby` 라는 올바른 응답이 반환됩니다.

Vim은 “일반적인” 파일 유형(Ruby, Python, Javascript 등)을 감지하는 방법을 알고 있습니다. 하지만, 사용자 정의 파일을 가지고 있다면 어떻게 해야 할까요? Vim이 이를 감지하고 올바른 파일 유형을 할당하도록 가르쳐야 합니다.

감지 방법은 두 가지가 있습니다: 파일 이름과 파일 내용을 사용하는 방법입니다.


### File Name Detection
파일 이름 감지 기능은 파일 이름으로 파일 유형을 식별합니다. `hello.rb` 파일을 열면 Vim은 `.rb` 확장자로 해당 파일이 Ruby 파일임을 인식합니다.

파일 이름 감지는 두 가지 방법이 있습니다: `ftdetect/` 런타임 디렉터리 사용과 `filetype.vim` 런타임 파일 사용입니다. 두 가지 방법을 모두 살펴보겠습니다.

#### `ftdetect/`
`hello.chocodonut` 라는 생소한(하지만 맛있는) 파일을 만들어 보겠습니다. 이 파일을 열고 `:set filetype?` 를 실행하면, 일반적인 파일 확장자가 아니기 때문에 Vim은 이를 어떻게 처리할지 모릅니다. `filetype=` 를 반환합니다.

Vim에 `.chocodonut` 로 끝나는 모든 파일을 “chocodonut” 파일 유형으로 설정하도록 지시해야 합니다. 런타임 루트(`~/.vim/`)에 `ftdetect/` 디렉터리를 생성합니다. 그 안에 `chocodonut.vim` 이란 파일을 만들고(`~/.vim/ftdetect/chocodonut.vim`), 이 파일 안에 다음을 추가합니다:

```
autocmd BufNewFile,BufRead *.chocodonut set filetype=chocodonut
```

`BufNewFile` 및 `BufRead` 는 새 버퍼를 생성하거나 새 버퍼를 열 때마다 트리거됩니다. `*.chocodonut` 은 열린 버퍼의 파일 확장자가 `.chocodonut` 인 경우만 이 이벤트가 트리거됨을 의미합니다. 마지막으로, `set filetype=chocodonut` 명령어는 파일 유형을 chocodonut 유형으로 설정합니다.

Vim을 재시작합니다. 이제 `hello.chocodonut` 파일을 열고 `:set filetype?`을 실행합니다. `filetype=chocodonut` 이 반환됩니다.

맛있네요! `ftdetect/` 안에 원하는 만큼 파일을 넣을 수 있습니다. 나중에 도넛 파일 유형을 확장하기로 결정했다면 `ftdetect/strawberrydonut.vim`, `ftdetect/plaindonut.vim` 등을 추가할 수도 있습니다.

Vim에서 파일 유형을 설정하는 방법은 실제로 두 가지가 있습니다. 하나는 방금 사용한 `set filetype=chocodonut` 입니다. 다른 방법은 `setfiletype chocodonut` 을 실행하는 것입니다. 전자의 명령어 `set filetype=chocodonut` 은 **항상** 파일 유형을 초코 도넛 유형으로 설정하는 반면, 후자의 명령어 `setfiletype chocodonut` 은 아직 파일 유형이 설정되지 않은 경우만 파일 유형을 설정합니다.


#### Filetype File
두 번째 파일 감지 방법은 루트 디렉터리(`~/.vim/filetype.vim`)에 `filetype.vim` 파일을 생성해야 합니다. 다음 내용을 추가합니다:

```
autocmd BufNewFile,BufRead *.plaindonut set filetype=plaindonut
```

`hello.plaindonut` 파일을 생성합니다. 파일을 열고 `:set filetype?` 를 실행하면 Vim이 올바른 사용자 정의 파일 유형 `filetype=plaindonut` 을 표시합니다.

와, 정말 작동하네요! 참고로 `filetype.vim` 을 수정하다 보면 `hello.plaindonut` 파일을 열 때마다 이 파일이 여러 번 실행되는 걸 발견할 수 있습니다. 이를 방지하려면 메인 스크립트가 한 번만 실행되도록 가드(guard)를 추가합니다. `filetype.vim` 을 다음과 같이 업데이트합니다:

```
if exists("did_load_filetypes")
  finish
endif

augroup donutfiletypedetection
  autocmd! BufRead,BufNewFile *.plaindonut setfiletype plaindonut
augroup END
```

`finish` 는 스크립트의 나머지 실행을 중지하는 Vim 명령어입니다. `“did_load_filetypes”` 표현식은 Vim의 내장 함수가 아닙니다. 실제로는 `$VIMRUNTIME/filetype.vim` 내부에서 사용되는 전역 변수입니다. 궁금하면 `:e $VIMRUNTIME/filetype.vim` 을 실행합니다. 해당 파일 내부에 다음과 같은 줄을 확인할 수 있습니다:

```
if exists("did_load_filetypes")
  finish
endif

let did_load_filetypes = 1
```

Vim이 이 파일을 호출하면 `did_load_filetypes` 변수를 정의하고 1로 설정합니다. Vim에서 1은 참 값입니다. `filetype.vim` 의 나머지 부분도 읽어보시기 바랍니다. Vim이 이 파일을 호출할 때 어떤 동작을 하는지 이해할 수 있는지 확인합니다.


### File Type Script
파일 내용을 기반으로 파일 유형을 감지하고 할당하는 방법을 알아봅니다.

확정된 확장자가 없는 파일 모음이 있다고 가정해 보겠습니다. 이 파일들의 유일한 공통점은 모두 첫 줄에 “donutify” 라는 단어로 시작한다는 점입니다. 이 파일들을 `donut` 파일 유형으로 분류하고 싶습니다. `sugardonut`, `glazeddonut`, `frieddonut`(확장자 없음)이란 새 파일을 생성합니다. 각 파일 안에 다음 줄을 추가합니다:

```
donutify
```

`sugardonut` 내부에서 `:set filetype?` 를 실행하면 Vim은 이 파일에 어떤 파일 유형을 할당할지 알지 못합니다. `filetype=` 를 반환합니다.

런타임 루트 경로에 `scripts.vim` 파일(`~/.vim/scripts.vim`)을 추가합니다. 그 안에 다음을 추가합니다:

```
if did_filetype()
  finish
endif

if getline(1) =~ '^\\<donutify\\>'
  setfiletype donut
endif
```

`getline(1)` 함수는 첫 번째 줄의 텍스트를 반환합니다. 첫 번째 줄이 “donutify” 라는 단어로 시작하는지 확인합니다. `did_filetype()` 함수는 Vim 내장 함수입니다. 파일 유형 관련 이벤트가 한 번 이상 트리거되면 true 를 반환합니다. 파일 유형 이벤트의 재실행을 중지하는 가드 역할을 합니다.

`sugardonut` 파일을 열고 `:set filetype?` 을 실행하면 Vim은 `filetype=donut` 을 반환합니다. 다른 도넛 파일(`glazeddonut` 및 `frieddonut`)을 열어도 Vim은 해당 파일 유형을 `donut` 유형으로 식별합니다.

`scripts.vim` 은 Vim이 알 수 없는 파일 유형의 파일을 열 때만 실행됩니다. Vim이 알려진 파일 유형의 파일을 열 경우 `scripts.vim` 은 실행되지 않습니다.


## File Type Plugin
chocodonut 파일을 열 때 Vim이 chocodonut 전용 스크립트를 실행하고, plaindonut 파일을 열 때는 해당 스크립트를 실행하지 않도록 처리하려면 어떻게 해야 할까요?

파일 유형 플러그인 런타임 경로(`~/.vim/ftplugin/`)를 사용하면 됩니다. Vim은 이 디렉터리 내에서 방금 열었던 파일 유형과 동일한 이름의 파일을 찾습니다. `chocodonut.vim` 파일(`~/.vim/ftplugin/chocodonut.vim`)을 생성합니다:

```
echo "Calling from chocodonut ftplugin"
```

다른 ftplugin 파일인 `plaindonut.vim` 을 생성합니다 (`~/.vim/ftplugin/plaindonut.vim`):

```
echo "Calling from plaindonut ftplugin"
```

이제 chocodonut 파일 유형을 열 때마다 Vim은 `~/.vim/ftplugin/chocodonut.vim` 의 스크립트를 실행합니다. plaindonut 파일 유형을 열 때마다 Vim은 `~/.vim/ftplugin/plaindonut.vim` 의 스크립트를 실행합니다.

> [!CAUTION]
> 주의 사항: 이 파일들은 버퍼 파일 유형이 설정될 때마다(예: `set filetype=chocodonut`) 실행됩니다. 서로 다른 chocodonut 파일 3개를 열 경우, 스크립트는 **총** 세 번 실행됩니다.


## Indent Files
Vim에는 ftplugin과 유사하게 작동하는 들여쓰기 런타임 경로가 있습니다. Vim은 열려 있는 파일 유형과 동일한 이름의 파일을 찾습니다. 이런 들여쓰기 런타임 경로의 목적은 들여쓰기 관련 코드를 저장하는 것입니다. `~/.vim/indent/chocodonut.vim` 파일이 있다면, chocodonut 파일 유형을 열 때만 실행됩니다. 여기서 chocodonut 파일의 들여쓰기 관련 코드를 저장할 수 있습니다.


## Colors
Vim은 색상 스킴을 저장하기 위한 색상 런타임 경로(`~/.vim/colors/`)를 가지고 있습니다. 이 디렉토리에 들어가는 모든 파일은 `:color` 명령줄 명령에서 표시됩니다.

`~/.vim/colors/beautifulprettycolors.vim` 파일이 있다면, `:color` 를 실행하고 `<Tab>` 키를 누를 때 `beautifulprettycolors` 가 색상 옵션 중 하나로 표시됩니다. 자신만의 색상 스킴을 추가하려면 바로 이곳에 저장하면 됩니다.

다른 사람들이 만든 색상 스킴을 살펴보려면 [vimcolors](https://vimcolors.com/)를 방문합니다.


## Syntax Highlighting
Vim은 구문 강조를 정의하기 위한 구문 런타임 경로(`~/.vim/syntax/`)를 가지고 있습니다.

`hello.chocodonut` 파일이 있다고 가정해 보겠습니다. 그 안에 다음과 같은 표현식이 있습니다:

```
(donut "tasty")
(donut "savory")
```

Vim은 이제 올바른 파일 유형을 인식하지만 모든 텍스트가 동일한 색상으로 표시됩니다. “donut” 키워드를 강조 표시하기 위한 구문 강조 규칙을 추가해 보겠습니다. 새로운 chocodonut 구문 파일인 `~/.vim/syntax/chocodonut.vim` 을 생성합니다. 그 안에 다음을 추가합니다:

```
syntax keyword donutKeyword donut

highlight link donutKeyword Keyword
```

이제 `hello.chocodonut` 파일을 다시 열어봅니다. `donut` 키워드가 강조 표시됩니다.

이 장은 구문 강조에 대해 깊이 있게 다루지 않습니다. 이는 방대한 주제입니다. 궁금하다면 `:h syntax.txt` 를 확인합니다.

[vim-polyglot](https://github.com/sheerun/vim-polyglot) 플러그인은 많은 인기 프로그래밍 언어에 대한 강조 기능을 제공하는 훌륭한 플러그인입니다.


## Documentation
플러그인을 만들 경우 자체 문서를 작성해야 합니다. 이를 위해 문서 런타임 경로를 사용합니다.

chocodonut 및 plaindonut 키워드에 대한 기본 문서를 만들어 보겠습니다. `donut.txt` 파일(`~/.vim/doc/donut.txt`)을 생성합니다. 내부에는 다음 텍스트를 추가합니다:

```
*chocodonut* Delicious chocolate donut

*plaindonut* No choco goodness but still delicious nonetheless
```

`chocodonut` 와 `plaindonut`(`:h chocodonut` 및 `:h plaindonut`)를 검색해 보면 아무것도 찾을 수 없습니다.

먼저 `:helptags` 를 실행해서 새로운 도움말 항목을 생성해야 합니다. `:helptags ~/.vim/doc/`를 실행합니다.

이제 `:h chocodonut` 및 `:h plaindonut` 을 실행하면 새로 생성된 도움말 항목을 확인할 수 있습니다. 해당 파일은 읽기 전용이며 “help” 파일 유형으로 변경됨을 확인합니다.


## Lazy Loading Scripts
이 장에서 배운 모든 런타임 경로는 자동으로 실행됩니다. 스크립트를 수동으로 로드하려면 autoload 런타임 경로를 사용합니다.

autoload 디렉터리(`~/.vim/autoload/`)를 생성합니다. 해당 디렉터리 안에 새로운 파일을 만들고 `tasty.vim`(`~/.vim/autoload/tasty.vim`)이란 이름으로 저장합니다. 그 안에 다음을 입력합니다:

```
echo "tasty.vim global"

function tasty#donut()
  echo "tasty#donut"
endfunction
```

함수 이름은 `donut()` 이 아닌 `tasty#donut` 임을 유의합니다. 자동 로드 기능을 사용할 때는 해시 기호(`#`)가 필수입니다. 자동 로드 기능의 함수 명명 규칙은 다음과 같습니다:

```
function fileName#functionName()
  ...
endfunction
```

이 경우 파일 이름은 `tasty.vim` 이고 함수 이름은 (기술적으로) `donut` 입니다.

함수를 호출하려면 `call` 명령어가 필요합니다. `:call tasty#donut()` 로 해당 함수를 호출해 보겠습니다.

함수를 처음 호출할 때는 두 개의 에코 메시지(“tasty.vim global” 과 “tasty#donut”)가 모두 표시되야 합니다. 이후 `tasty#donut` 함수 호출 시에는 “tasty#donut” 에코만 표시됩니다.

Vim에서 파일을 열 때, 기존 런타임 경로와 달리 자동 로드 스크립트는 자동으로 로드되지 않습니다. 명시적으로 `tasty#donut()` 를 호출해야만 Vim이 `tasty.vim` 파일을 찾아서 내부 모든 내용(`tasty#donut()` 함수 포함)을 로드합니다. 자주 사용하지 않지만 많은 리소스를 사용하는 함수는 자동 로딩이 완벽한 메커니즘입니다.

자동 로딩 디렉터리는 원하는 만큼 중첩해서 추가할 수 있습니다. 런타임 경로 `~/.vim/autoload/one/two/three/tasty.vim` 이 있다면 `:call one#two#three#tasty#donut()` 로 함수를 호출할 수 있습니다.


## After Scripts
Vim에는 `~/.vim/` 구조를 반영한 실행 후 경로(`~/.vim/after/`)가 있습니다. 이 경로에 있는 모든 파일은 마지막에 실행되므로 개발자들은 일반적으로 이 경로를 스크립트 재정의에 사용합니다.

예를 들어, `plugin/chocolate.vim` 의 스크립트를 덮어쓰려면 `~/.vim/after/plugin/chocolate.vim` 파일을 생성해서 오버라이드 스크립트를 넣으면 됩니다. Vim은 `~/.vim/plugin/chocolate.vim` **이후**에 `~/.vim/after/plugin/chocolate.vim` 을 실행합니다.


## $VIMRUNTIME
Vim은 기본 스크립트와 지원 파일을 위한 환경 변수 `$VIMRUNTIME` 을 제공합니다. `:e $VIMRUNTIME` 을 실행해서 확인할 수 있습니다.

이 구조는 익숙할 것입니다. 이 장에서 배운 여러 런타임 경로가 포함되어 있습니다.

21장에서 Vim을 실행할 때 일곱 가지 위치에서 vimrc 파일을 검색한다는 점을 배웠습니다. 마지막으로 확인하는 위치가 `$VIMRUNTIME/defaults.vim` 이라고 설명했습니다. 사용자 vimrc 파일을 찾지 못하면 Vim은 `defaults.vim` 을 기본 vimrc로 사용합니다.

vim-polyglot 같은 구문 플러그인 없이 Vim을 실행했는데도 파일이 구문 강조 표시된 적이 있나요? 이는 Vim이 런타임 경로에서 구문 파일을 찾지 못하면 `$VIMRUNTIME` 의 syntax 디렉터리에서 구문 파일을 찾기 때문입니다.

자세한 내용은 `:h $VIMRUNTIME` 을 확인합니다.


## Runtimepath Option
런타임 경로를 확인하려면 `:set runtimepath?` 를 실행합니다.

Vim-Plug나 널리 쓰이는 외부 플러그인 관리자를 사용한다면 디렉터리 목록이 표시됩니다. 예를 들어, 제 환경에서는 다음과 같이 표시됩니다:

```
runtimepath=~/.vim,~/.vim/plugged/vim-signify,~/.vim/plugged/base16-vim,~/.vim/plugged/fzf.vim,~/.vim/plugged/fzf,~/.vim/plugged/vim-gutentags,~/.vim/plugged/tcomment_vim,~/.vim/plugged/emmet-vim,~/.vim/plugged/vim-fugitive,~/.vim/plugged/vim-sensible,~/.vim/plugged/lightline.vim, ...
```

플러그인 관리자의 역할 중 하나는 각 플러그인을 런타임 경로에 추가한다는 것입니다. 각 런타임 경로는 `~/.vim/` 과 유사한 자체 디렉터리 구조를 가질 수 있습니다.

`~/box/of/donuts/` 디렉터리가 있고 이 디렉터리를 런타임 경로에 추가하려면 vimrc에 다음을 추가합니다:

```
set rtp+=$HOME/box/of/donuts/
```

`~/box/of/donuts/` 안에 플러그인 디렉터리(`~/box/of/donuts/plugin/hello.vim`)와 ftplugin(`~/box/of/donuts/ftplugin/chocodonut.vim`)이 있다면, Vim을 실행할 때 `plugin/hello.vim` 의 모든 스크립트가 실행됩니다. 초코도넛 파일을 열 때 Vim은 `ftplugin/chocodonut.vim` 도 실행합니다.

직접 시도해 보시기 바랍니다: 임의의 경로를 생성하고 런타임 경로에 추가합니다. 이 장에서 배운 런타임 경로 몇 가지를 추가합니다. 예상대로 작동하는지 확인합니다.


## Learn Runtime the Smart Way
천천히 읽어보시고 런타임 경로들을 직접 만져보시기 바랍니다. 실제 환경에서 런타임 경로가 어떻게 사용되는지 확인하려면, 자주 사용하는 Vim 플러그인 저장소 중 하나를 방문해서 디렉터리 구조를 살펴봅니다. 이제 대부분을 이해할 수 있을 겁니다. 따라가면서 큰 그림을 파악해 보시기 바랍니다. Vim 디렉터리 구조를 이해하셨으니, 이제 Vimscript를 배울 준비가 되셨습니다.


## Link
- Prev [Ch23. Vim Packages](./ch23_vim_packages.md)
- Next [Ch25. Vimscript Basic Data Types](./ch25_vimscript_basic_data_types.md)
