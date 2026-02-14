# Ch22. Vimrc
이전 장에서는 Vim 사용법을 배웠습니다. 이 장은 vimrc를 구성하고 설정하는 방법을 배웁니다. 


## How Vim Finds Vimrc
vimrc에 대한 일반적인 방법은 홈 디렉터리 `~/.vimrc`(운영체제에 따라 다를 수 있음)에 `.vimrc` 닷 파일을 추가하는 것입니다.

Vim은 vimrc 파일을 찾기 위해 여러 위치를 내부적으로 확인합니다. Vim이 확인하는 위치는 다음과 같습니다:

- `$VIMINIT`
- `$HOME/.vimrc`
- `$HOME/.vim/vimrc`
- `$EXINIT`
- `$HOME/.exrc`
- `$VIMRUNTIME/defaults.vim`

Vim을 시작하면 위의 여섯 위치를 순서대로 vimrc 파일을 검색합니다. 가장 먼저 발견된 vimrc 파일이 사용되며 나머지는 무시됩니다. 

먼저 Vim은 `$VIMINIT` 를 찾습니다. 해당 위치에 파일이 없으면 `$HOME/.vimrc` 를 확인합니다. 여전히 없으면 `$HOME/.vim/vimrc` 를 검색합니다. Vim이 해당 파일을 발견하면 더 이상 찾지 않고 `$HOME/.vim/vimrc` 를 사용합니다. 

첫 번째 위치인 `$VIMINIT` 는 환경 변수입니다. 기본적으로 정의되어 있지 않습니다. `~/dotfiles/testvimrc` 를 `$VIMINIT` 값으로 사용하려면 해당 vimrc 경로를 포함하는 환경 변수를 생성합니다. `export VIMINIT=‘let $MYVIMRC=“$HOME/dotfiles/testvimrc” | source $MYVIMRC’` 를 실행하면 Vim은 이제 `~/dotfiles/testvimrc` 를 vimrc 파일로 사용합니다.

두 번째 위치인 `$HOME/.vimrc` 는 많은 Vim 사용자에게 관례적인 경로입니다. `$HOME` 은 대부분의 경우 홈 디렉터리(`~`)를 의미합니다. `~/.vimrc` 파일이 존재하면 Vim은 이를 기본 vimrc 파일로 사용합니다.

세 번째 파일인 `$HOME/.vim/vimrc` 는 `~/.vim` 디렉터리 내에 위치합니다. 플러그인, 사용자 정의 스크립트 또는 뷰 파일을 위해 이미 `~/.vim` 디렉터리가 존재할 수 있습니다. vimrc 파일 이름에는 점이 없다는 점에 유의합니다. (`$HOME/.vim/.vimrc` 는 작동하지 않지만 `$HOME/.vim/vimrc` 는 작동합니다.)

네 번째, `$EXINIT` 는 `$VIMINIT` 와 유사하게 작동합니다.

다섯 번째, `$HOME/.exrc` 는 `$HOME/.vimrc` 와 유사하게 작동합니다.

여섯 번째, `$VIMRUNTIME/defaults.vim` 은 Vim 빌드에 포함된 기본 vimrc 파일입니다. 저의 경우 Homebrew로 설치한 Vim 8.2를 사용 중이므로 경로는 (`/usr/local/share/vim/vim82`) 입니다. Vim이 앞서 언급한 여섯 개의 vimrc 파일을 모두 찾지 못하면 이 파일을 사용합니다.

본 장의 나머지 부분에서 vimrc가 `~/.vimrc` 경로를 사용한다고 가정합니다. 


## What to Put in My Vimrc?
시작할 때 제가 던진 질문은 “vimrc에 무엇을 넣어야 할까?” 였습니다.

정답은 “원하는 건 뭐든 넣으세요!” 입니다. 다른 사람의 vimrc를 복사해서 붙여넣고 싶은 유혹은 분명히 있지만, 이를 참아야 합니다. 꼭 다른 사람의 vimrc를 사용해야 한다면, 그 설정이 무엇을 하는지, 그리고 어떻게 사용하는지, 그리고 가장 중요한 것은 자신에게 적합한지 반드시 확인해야 합니다. 누군가가 사용한다고 해서 당신도 반드시 사용해야 하는 것은 아닙니다.


## Basic Vimrc Content
간단히 말해, vimrc는 다음 요소들의 모음입니다:

- 플러그인
- 설정
- 사용자 정의 함수
- 사용자 정의 명령어
- 매핑

위에서 언급하지 않은 다른 요소도 있지만, 일반적으로 이 항목들이 대부분의 사용 사례를 포괄합니다.


### Plugins
이전 장들에서 [fzf.vim](https://github.com/junegunn/fzf.vim), [vim-mundo](https://github.com/simnalamburt/vim-mundo), 그리고 [vim-fugitive](https://github.com/tpope/vim-fugitive) 같은 다양한 플러그인들을 언급했습니다.

10년 전만 해도 플러그인 관리는 악몽과 같았습니다. 하지만, 현대적인 플러그인 관리자의 등장으로 이제는 플러그인 설치가 몇 초 만에 가능합니다. 저는 현재 [vim-plug](https://github.com/junegunn/vim-plug)를 플러그인 관리자로 사용하므로, 이 섹션은 이를 예로 들겠습니다. 다른 인기 플러그인 관리자들도 개념은 비슷합니다. 다음과 같은 다양한 관리자들을 꼭 살펴보시길 강력히 추천합니다:

-[vundle.vim](https://github.com/VundleVim/Vundle.vim)
- [vim-pathogen](https://github.com/tpope/vim-pathogen)
- [dein.vim](https://github.com/Shougo/dein.vim)

위에서 언급한 것 외에도 많은 플러그인 관리자가 있으니 자유롭게 살펴보시기 바랍니다. vim-plug를 설치하려면 유닉스 머신을 사용 중이라면 다음 명령어를 실행합니다:

```
curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

새로운 플러그인을 추가하려면 `call plug#begin()` 과 `call plug#end()` 라인 사이에 플러그인 이름(`Plug ‘github-username/repository-name’`)을 추가합니다. 예를 들어, `emmet-vim` 과 `nerdtree` 를 설치하려면 vimrc 파일에 다음 코드 조각을 추가합니다:

```
call plug#begin('~/.vim/plugged')
  Plug 'mattn/emmet-vim'
  Plug 'preservim/nerdtree'
call plug#end()
```

변경 사항을 저장하고 소스 처리(`:source %`)한 후 `:PlugInstall` 을 실행해서 플러그인을 설치합니다.

향후 사용하지 않는 플러그인을 제거할 경우, `call` 블록에서 해당 플러그인 이름을 삭제하고 저장 및 소스 처리한 후 `:PlugClean` 명령어를 실행하면 시스템에서 제거됩니다.

Vim 8에는 자체 내장 패키지 관리자가 있습니다. 자세한 내용은 `:h packages` 를 참조합니다. 다음 장은 사용 방법을 설명하겠습니다.


### Settings
어떤 vimrc 파일도 `set` 옵션이 많이 등장하는 것은 흔한 일입니다. 명령줄 모드에서 set 명령을 실행하면 영구적이지 않습니다. Vim을 종료하면 설정 내용은 사라집니다. 예를 들어, Vim을 실행할 때마다 명령줄 모드에서 `:set relativenumber number` 를 실행하는 대신, vimrc에 다음과 같이 설정할 수 있습니다:

```
set relativenumber number
```

일부 설정은 값을 전달해야 합니다. (예: `set tabstop=2`) 각 설정이 허용하는 값 유형은 해당 설정의 도움말 페이지를 참조합니다.

`set` 대신 `let` 을 사용할 수도 있습니다. (앞에 `&` 를 붙여야 함). `let` 을 사용하면 표현식을 값으로 지정할 수 있습니다. 예를 들어, 경로가 존재할 때만 `‘dictionary’` 옵션을 경로로 설정하려면:

```
let s:english_dict = "/usr/share/dict/words"

if filereadable(s:english_dict)
  let &dictionary=s:english_dict
endif
```

Vimscript 할당문과 조건문은 후반부 장에서 배웁니다.

Vim에서 가능한 모든 옵션 목록을 보려면 `:h E355` 를 확인합니다.


### Custom Functions

Vimrc는 사용자 정의 함수를 작성하기에 적합한 장소입니다. 자신의 Vimscript 함수를 작성하는 방법은 후속 장에서 배웁니다.


### Custom Commands
`command` 를 사용해서 사용자 정의 명령줄 명령을 생성할 수 있습니다.

오늘 날짜를 표시하는 기본 명령 `GimmeDate` 를 생성하려면:

```
:command! GimmeDate echo call("strftime", ["%F"])
```

`:GimmeDate` 를 실행하면 Vim은 “2025-01-1” 같은 날짜를 표시합니다.

입력이 필요한 기본 명령어를 만들려면 `<args>` 를 사용할 수 있습니다. `GimmeDate` 에 특정 시간/날짜 형식을 전달하려면:

```
:command! GimmeDate echo call("strftime", [<args>])

:GimmeDate "%F"
" 2020-01-01

:GimmeDate "%H:%M"
" 11:30
```

인수 개수를 제한하려면 `-nargs` 플래그를 전달합니다. `-nargs=0` 은 인수를 전혀 전달하지 않으며, `-nargs=1` 은 하나의 인수를, `-nargs=+` 는 최소 하나의 인수를, `-nargs=*` 는 임의 개수의 인수를, `-nargs=?` 는 0개 또는 하나의 인수를 전달합니다. n번째 인수를 전달하려면 `-nargs=n` 을 사용합니다. (여기서 `n`은 정수입니다.)

`<args>` 는 `<f-args>` 와 `<q-args>` 두 가지 변형이 있습니다. 전자는 Vimscript 함수에 인수를 전달하는 데 사용됩니다. 후자는 사용자 입력을 자동으로 문자열로 변환하는 데 사용됩니다.

`args` 사용법:

```
:command! -nargs=1 Hello echo "Hello " . <args>
:Hello "Iggy"
" returns 'Hello Iggy'

:Hello Iggy
" Undefined variable error
```

`q-args` 사용법:

```
:command! -nargs=1 Hello echo "Hello " . <q-args>
:Hello Iggy
" returns 'Hello Iggy'
```

`f-args` 사용법:

```
:function! PrintHello(person1, person2)
:  echo "Hello " . a:person1 . " and " . a:person2
:endfunction

:command! -nargs=* Hello call PrintHello(<f-args>)

:Hello Iggy1 Iggy2
" returns "Hello Iggy1 and Iggy2"
```

위의 함수들은 Vimscript 함수 장을 읽으면 훨씬 더 이해하기 쉬워집니다.

명령어와 인수에 대해 좀 더 알아보려면 `:h command` 와 `:args` 를 확인합니다.


### Maps
반복적으로 동일한 복잡한 작업을 수행한다면, 해당 작업에 대한 매핑을 생성해야 한다는 좋은 지표입니다.

예를 들어, 저의 vimrc는 다음과 같은 두 가지 매핑이 있습니다:

```
nnoremap <silent> <C-f> :GFiles<CR>
nnoremap <Leader>tn :call ToggleNumber()<CR>
```

첫 번째 매핑은 `Ctrl-F` 를 [fzf.vim](https://github.com/junegunn/fzf.vim) 플러그인의 `:Gfiles` 명령어(Git 파일을 빠르게 검색)에 할당했습니다. 두 번째 설정은 `<Leader>tn` 을 사용자 정의 함수 `ToggleNumber` 호출에 매핑했습니다. (`norelativenumber` 와 `relativenumber` 옵션 전환). `Ctrl-F` 매핑은 Vim 기본 페이지 스크롤 기능을 덮어씁니다. 매핑이 충돌할 경우 Vim 제어 기능을 덮어쓸 수 있습니다. 해당 기능을 거의 사용하지 않아서 안전하게 덮어쓸 수 있다고 판단했습니다.

그런데 `<Leader>tn` 에서 “Leader” 키는 무엇일까요?

Vim은 매핑을 돕기 위해 리더 키를 사용합니다. 예를 들어, 저는 `<Leader>tn` 을 `ToggleNumber()` 함수 실행에 매핑했습니다. 리더 키가 없다면 `tn` 을 사용했겠지만, Vim은 이미 `t` (검색 이동 명령어 “till”)를 사용합니다. 리더 키를 사용하면 기존 명령어와 충돌하지 않고 리더로 지정된 키를 누른 후 `tn` 을 입력할 수 있습니다. 리더 키는 매핑 조합을 시작하도록 설정할 수 있는 키입니다. 기본적으로 Vim은 백슬래시를 리더 키로 사용합니다. (따라서 `<Leader>tn` 은 “백슬래시-t-n” 입니다.)

개인적으로는 백슬래시 기본값 대신 `<Space>` 를 리더 키로 사용하는 것을 선호합니다. 리더 키를 변경하려면 vimrc에 다음을 추가합니다:

```
let mapleader = "\<space>"
```

위에서 사용된 `nnoremap` 명령어는 세 부분으로 나눌 수 있습니다:

- `n` 은 일반 모드를 나타냅니다.
- `nore` 는 비재귀적(non-recursive)을 의미합니다.
- `map` 은 매핑 명령어입니다.

최소한 `nnoremap` 대신 `nmap` 을 사용할 수도 있습니다. (`nmap <silent> <C-f> :Gfiles<CR>`) 그러나, 잠재적인 무한 루프를 피하기 위해 비재귀 변형을 사용하는 것은 좋은 관행입니다.

비재귀적으로 매핑하지 않을 경우 발생할 수 있는 상황을 살펴보겠습니다. 예를 들어, 줄 끝에 세미콜론을 추가하는 매핑을 `B` 에 추가하고, 한 단어(WORD) 뒤로 이동하는 매핑을 추가한다고 가정해 보겠습니다. (Vim에서 `B` 는 한 단어 뒤로 이동하는 일반 모드 내비게이션 키임을 기억합니다).

```
nmap B A;<esc>B
```

`B` 를 누르면... 이런! Vim이 제어 불가능하게 `;` 를 추가합니다. (`Ctrl-C` 로 중단합니다.) 왜 이럴까요? 매핑 `A;<esc>B` 에서 `B` 는 Vim의 기본 `B` 함수(한 단어 뒤로 이동)가 아니라 매핑된 함수를 가리키기 때문입니다. 실제로 여러분이 가진 것은 다음과 같습니다:

```
A;<esc>A;<esc>A;<esc>A;esc>...
```

이 문제를 해결하려면 비재귀적 맵을 추가해야 합니다:

```
nnoremap B A;<esc>B
```

이제 `B` 를 다시 호출합니다. 이번에는 줄 끝에 `;` 를 성공적으로 추가하고 한 단어(WORD) 뒤로 이동합니다. 이 매핑에서 `B` 는 Vim의 원래 `B`  기능을 나타냅니다.

Vim은 모드별로 다른 매핑을 가지고 있습니다. 삽입 모드에서 `jk` 를 눌렀을 때 삽입 모드를 종료하는 매핑을 만들려면:

```
inoremap jk <esc>
```

다른 맵 모드는 다음과 같습니다: 

- `map` (일반, 시각, 선택, 연산자 대기)
- `vmap` (시각 및 선택)
- `smap` (선택)
- `xmap` (시각)
- `omap` (연산자 대기)
- `map!` (삽입 및 명령줄)
- `lmap` (삽입, 명령줄, 언어 인수)
- `cmap` (명령줄)
- `tmap` (터미널 작업). 

이들에 대해서는 자세히 다루지 않겠습니다. 자세한 내용은 `:h map.txt`를 참조합니다.

가장 직관적이고 일관되며 기억하기 쉬운 매핑을 만드시기 바랍니다.


## Organizing Vimrc
시간이 지남에 따라 vimrc 파일은 점점 커지고 복잡해집니다. vimrc 파일을 깔끔하게 유지하는 방법은 두 가지입니다:

- vimrc 파일을 여러 개의 파일로 분할합니다.
- vimrc 파일을 접습니다.


### Splitting Your Vimrc
Vim의 `source` 명령어를 사용해서 vimrc를 여러 파일로 분할할 수 있습니다. 이 명령어는 지정된 파일 인자에서 명령줄 명령어를 읽어옵니다.

`~/.vim` 디렉터리 안에 `/settings`(`~/.vim/settings`)라는 파일을 생성해 보겠습니다. 파일 이름 자체는 임의로 지정할 수 있으며 원하는 대로 명명해도 됩니다.

이 파일을 네 가지 구성 요소로 분할할 예정입니다:

- 타사 플러그인 (`~/.vim/settings/plugins.vim`).
- 일반 설정 (`~/.vim/settings/configs.vim`).
- 사용자 정의 함수 (`~/.vim/settings/functions.vim`).
- 키 매핑 (`~/.vim/settings/mappings.vim`) .

`~/.vimrc` 내부:

```
source $HOME/.vim/settings/plugins.vim
source $HOME/.vim/settings/configs.vim
source $HOME/.vim/settings/functions.vim
source $HOME/.vim/settings/mappings.vim
```

이 파일들은 경로에 커서를 놓고 `gf` 를 눌러 편집할 수 있습니다.

`~/.vim/settings/plugins.vim` 내부:

```
call plug#begin('~/.vim/plugged')
  Plug 'mattn/emmet-vim'
  Plug 'preservim/nerdtree'
call plug#end()
```

`~/.vim/settings/configs.vim` 내부:

```
set nocompatible
set relativenumber
set number
```

`~/.vim/settings/functions.vim` 내부:

```
function! ToggleNumber()
  if(&relativenumber == 1)
    set norelativenumber
  else
    set relativenumber
  endif
endfunc
```

`~/.vim/settings/mappings.vim` 내부:

```
inoremap jk <esc>
nnoremap <silent> <C-f> :GFiles<CR>
nnoremap <Leader>tn :call ToggleNumber()<CR>
```

vimrc는 평소처럼 작동하지만 단 네 줄로 구성됩니다!

이렇게 설정하면 어디로 가야할지 쉽게 알 수 있습니다. 매핑을 추가하려면 `/mappings.vim` 파일에 추가합니다. 앞으로 vimrc가 커져도 언제든지 디렉터리를 추가할 수 있습니다. 예를 들어, 색상 테마 설정이 필요하다면 `~/.vim/settings/themes.vim` 을 추가하면 됩니다.


### Keeping One Vimrc File
이동성을 위해 하나의 vimrc 파일로 유지하려면, 마커 폴드를 사용해서 파일을 정리할 수 있습니다. vimrc 파일 상단에 다음을 추가합니다:

```
" setup folds {{{
augroup filetype_vim
  autocmd!
  autocmd FileType vim setlocal foldmethod=marker
augroup END
" }}}
```

Vim은 현재 버퍼의 파일 유형을 감지할 수 있습니다. (`:set filetype?`) `vim` 파일 유형인 경우 마커 폴드 방식을 사용할 수 있습니다. 마커 폴드는 폴드의 시작과 끝을 표시하기 위해 `{{{` 와 `}}}` 를 사용한다는 점을 기억합니다.

vimrc의 나머지 부분에 `{{{` 및 `}}}` 폴드를 추가합니다. (`"` 로 주석 처리하는 것을 잊지 마시기 바랍니다.):

```
" setup folds {{{
augroup filetype_vim
  autocmd!
  autocmd FileType vim setlocal foldmethod=marker
augroup END
" }}}

" plugins {{{
call plug#begin('~/.vim/plugged')
  Plug 'mattn/emmet-vim'
  Plug 'preservim/nerdtree'
call plug#end()
" }}}

" configs {{{
set nocompatible
set relativenumber
set number
" }}}

" functions {{{
function! ToggleNumber()
  if(&relativenumber == 1)
    set norelativenumber
  else
    set relativenumber
  endif
endfunc
" }}}

" mappings {{{
inoremap jk <esc>
nnoremap <silent> <C-f> :GFiles<CR>
nnoremap <Leader>tn :call ToggleNumber()<CR>
" }}}
```

vimrc 파일은 다음과 같이 표시됩니다:

```
+-- 6 lines: setup folds -----

+-- 6 lines: plugins ---------

+-- 5 lines: configs ---------

+-- 9 lines: functions -------

+-- 5 lines: mappings --------
```


## Running Vim With or Without Vimrc and Plugins
vimrc와 플러그인 없이 Vim을 실행하려면 다음을 실행합니다:

```
vim -u NONE
```

vimrc는 있지만 플러그인 없이 Vim을 실행하려면 다음을 실행합니다:

```
vim -u NORC
```

vimrc는 있지만 플러그인 없이 Vim을 실행하려면 다음을 실행합니다:

```
vim --noplugin
```

다른 vimrc(예: `~/.vimrc-backup`)로 Vim을 실행하려면 다음을 실행합니다:

```
vim -u ~/.vimrc-backup
```

깨진 vimrc를 수정하는 데 유용한, 플러그인 없이 `defaults.vim` 만 사용해서 Vim을 실행하려면 다음을 실행합니다:

```
vim --clean
```


## Configure Vimrc the Smart Way
Vimrc는 Vim 커스터마이징의 중요한 구성 요소입니다. vimrc를 구축하기 시작하는 좋은 방법은 다른 사람들의 vimrc를 읽고 시간이 지남에 따라 점차적으로 만들어 나가는 것입니다. 최고의 vimrc는 개발자 X가 사용하는 것이 아니라, 여러분의 사고 방식과 편집 스타일에 정확히 맞춘 것입니다.


## Link
- Prev [Ch21. Multiple File Operations](./ch21_multiple_file_operations.md)
- Next [Ch23. Vim Packages](./ch23_vim_packages.md)
