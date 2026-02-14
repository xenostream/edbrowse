# Ch03. Searching Files
이 장의 목표는 Vim에서 빠르게 검색하는 방법을 소개하는 것입니다. 빠른 검색 능력은 Vim 생산성을 높이는 훌륭한 방법입니다. 제가 파일을 빠르게 검색하는 방법을 깨달았을 때, 저는 Vim을 풀타임으로 사용하기로 결정했습니다.

이 장은 두 부분으로 나뉩니다: 플러그인 없이 검색하는 방법과 [fzf.vim](https://github.com/junegunn/fzf.vim) 플러그인을 사용한 검색 방법입니다. 시작해 보겠습니다!


## Opening and Editing Files
Vim에서 파일을 열려면 `:edit` 명령을 사용할 수 있습니다.

```
:edit file.txt
```

`file.txt` 파일이 존재하면 `file.txt` 버퍼를 엽니다. `file.txt` 파일이 존재하지 않으면 `file.txt` 에 대한 새 버퍼를 생성합니다.

`:edit` 명령어도 `<Tab>` 키를 이용한 자동완성이 작동합니다. 예를 들어, 파일이 [Rails](https://rubyonrails.org/) 의 **a**pp **c**ontroller **u**sers 컨트롤러 디렉터리 `./app/controllers/users_controllers.rb` 에 있다면, `<Tab>` 키를 사용해서 빠르게 확장할 수 있습니다:

```
:edit a<Tab>c<Tab>u<Tab>
```

`:edit` 는 와일드카드 인수를 허용합니다. `*` 는 현재 디렉토리 내의 모든 파일을 일치시킵니다. 현재 디렉토리에서 `.yml` 확장자를 가진 파일만 찾으려면:

```
:edit *.yml<Tab>
```

`**` 를 사용하면 재귀적으로 검색할 수 있습니다. 프로젝트 내의 모든 `*.md` 파일을 찾고 싶지만, 어떤 디렉토리에 있는지 확실치 않다면 다음과 같이 할 수 있습니다:

```
:edit **/*.md<Tab>
```

`:edit` 명령어는 Vim의 내장 파일 탐색기인 `netrw` 를 실행하는 데 사용할 수 있습니다. 이를 위해 파일 대신 디렉터리 인수를 `:edit` 에 전달합니다:

```
:edit .
:edit test/unit/
```


## Searching Files With Find
`:find` 명령어로 파일을 찾을 수 있습니다. 예를 들어:

```
:find package.json
:find app/controllers/users_controller.rb
```

자동 완성은 `:find` 와 함께 작동합니다:

```
:find p<Tab>                " to find package.json
:find a<Tab>c<Tab>u<Tab>    " to find app/controllers/users_controller.rb
```

`:find` 가 `:edit` 과 비슷해 보인다는 점을 눈치채셨을 겁니다. 차이점이 무엇일까요?


## Find and Path
차이점은 `:find` 는 `path` 에서 파일을 찾지만 `:edit` 는 그렇지 않다는 것입니다. `path` 에 대해 조금 알아보겠습니다. 경로를 수정하는 방법을 익히면 `:find` 는 강력한 검색 도구가 될 수 있습니다. 현재 경로를 확인하려면 다음을 실행합니다:

```
:set path?
```

기본적으로 여러분의 값은 다음과 같을 수 있습니다:

```
path=.,/usr/include,,
```

- `.` 는 현재 열려 있는 파일의 디렉터리에서 검색함을 의미합니다.
- `,` 는 현재 디렉터리에서 검색함을 의미합니다.
- `/usr/include` 는 C 라이브러리 헤더 파일의 일반적인 디렉터리 경로입니다.

첫 번째 두 가지는 현재 맥락에서 중요하며, 세 번째는 당분간 무시해도 됩니다. 여기서 핵심은 Vim은 "파일을 찾을 경로를 수정할 수 있다" 는 점입니다. 다음과 같은 프로젝트 구조를 가정해 보겠습니다:

```
app/
  assets/
  controllers/
    application_controller.rb
    comments_controller.rb
    users_controller.rb
    ...
```

루트 디렉터리에서 `users_controller.rb` 로 이동하려면 여러 디렉터리를 거쳐야 하며(상당한 양의 탭 키를 눌러야 함), 프레임워크 작업 시 대부분의 시간(90%)을 특정 디렉터리에서 보내는 경우가 많습니다. 이 경우 최소한의 키 입력으로 `controllers/` 디렉터리로 이동하는 것은 중요합니다. `path` 설정으로 이동 작업을 단축할 수 있습니다.

현재 `path` 에 `app/controllers/` 를 추가합니다. 방법은 다음과 같습니다:

```
:set path+=app/controllers/
```

경로가 업데이트됐으므로, 이제 `:find u<Tab>` 을 입력하면 Vim은 `app/controllers/` 디렉토리 내에서 “u” 로 시작하는 파일을 검색합니다.

`app/controllers/account/users_controller.rb` 처럼 중첩된 `controllers/` 디렉토리가 있는 경우, Vim은 `users_controllers` 를 찾지 못합니다. 대신 `:set path+=app/controllers/**` 를 추가해야 자동완성이 `users_controller.rb` 를 찾을 수 있습니다. 이제 탭 키를 세 번 누르지 않고 한 번만 눌러도 `users_controller.rb` 를 찾을 수 있습니다.

프로젝트 전체 디렉터리를 추가하면 탭 키를 누를 때 Vim은 해당 파일을 모든 곳에서 검색할 거라고 생각할 수 있습니다. 예를 들어:

```
:set path+=$PWD/**
```

`$PWD` 는 현재 작업 디렉터리입니다. `<Tab>` 키를 눌렀을 때 모든 파일에 접근할 수 있도록 프로젝트 전체를 `path` 에 추가하면, 소규모 프로젝트는 작동할 수 있지만 프로젝트에 파일이 많을 경우는 검색 속도가 크게 느려집니다. 가장 자주 방문하는 파일/디렉터리의 `path` 만 추가할 것을 권장합니다.

vimrc 설정 파일에 `set path+={your-path-here}` 를 추가할 수 있습니다. `path` 업데이트는 몇 초밖에 걸리지 않으며, 이를 통해 많은 시간을 절약할 수 있습니다.


## Searching in Files With Grep
파일 내에서 검색(파일 내의 문구 찾기)이 필요할 경우 grep을 사용할 수 있습니다. Vim에는 이를 수행하는 두 가지 방법이 있습니다:

- 내부 grep (`:vim` 이 맞습니다! `:vim` 이라 표기합니다. `:vimgrep` 의 약어입니다.)
- 외부 grep (`:grep`)

먼저 내부 grep부터 살펴보겠습니다. `:vim`의 구문은 다음과 같습니다:

```
:vim /pattern/ file
```

- `/pattern/` 은 검색어의 정규 표현식 패턴입니다.
- `file` 은 파일 인자입니다. 여러 인자를 전달할 수 있습니다. Vim은 파일 인자 내에서 패턴을 검색합니다. `:find` 와 마찬가지로 `*` 및 `**` 와일드카드를 전달할 수 있습니다.

예를 들어, `app/controllers/` 디렉토리 내의 모든 루비 파일(`.rb`)에서 “breakfast” 문자열의 모든 발생 위치를 찾으려면:

```
:vim /breakfast/ app/controllers/**/*.rb
```

실행 후 첫 번째 결과로 이동합니다. Vim의 `vim` 검색 명령어는 `quickfix` 작업을 사용합니다. 모든 검색 결과를 보려면 `:copen` 을 실행합니다. 이렇게 하면 `quickfix` 창이 열립니다. 즉시 생산성을 높일 수 있는 유용한 quickfix 명령어 몇 가지를 소개합니다:

```
:copen        퀵픽스 창 열기
:cclose       퀵픽스 창 닫기
:cnext        다음 오류로 이동
:cprevious    이전 오류로 이동
:colder       이전 오류 목록으로 이동
:cnewer       최신 오류 목록으로 이동
```

quickfix에 대해 자세히 알아보려면 `:h quickfix` 를 확인합니다.

내부 grep(`:vim`)을 실행할 때 일치 항목이 많으면 속도가 느려질 수 있습니다. 이는 Vim이 일치하는 각 파일을 마치 편집 중인 것처럼 메모리에 로드하기 때문입니다. 검색어와 일치하는 파일이 많으면 Vim은 모두 로드하므로 많은 메모리를 소모합니다.

이제 외부 grep에 대해 이야기해 보겠습니다. 기본적으로 터미널 명령어 `grep` 을 사용합니다. `app/controllers/` 디렉토리 내의 루비 파일에서 “lunch” 를 검색하려면 다음과 같이 할 수 있습니다:

```
:grep -R "lunch" app/controllers/
```

`/pattern/` 대신 터미널 grep 구문인 `“pattern”` 을 따릅니다. 또한, `quickfix` 를 사용해서 모든 일치 항목을 표시합니다.

Vim은 `:grep` 명령 실행 시 실행할 외부 프로그램을 지정하는 `grepprg` 변수를 정의합니다. 이를 통해 Vim을 종료하지 않고도 터미널 `grep` 명령을 호출할 수 있습니다. 추후 `:grep` 명령 사용 시 사용할 기본 실행 프로그램을 변경하는 방법을 설명하겠습니다.


## Browsing Files With Netrw
`netrw` 는 Vim의 내장 파일 탐색기입니다. 프로젝트의 계층 구조를 확인하는 데 유용합니다. `netrw` 를 실행하려면 `.vimrc` 에 다음 두 가지 설정이 필요합니다:

```
set nocp
filetype plugin on
```

`netrw` 는 방대한 주제이므로 기본적인 사용법만 다루지만, 시작하는 데는 충분할 것입니다. Vim을 실행할 때 파일 대신 디렉터리를 매개변수로 전달하면 `netrw` 를 시작할 수 있습니다. 예를 들어:

```
vim .
vim src/client/
vim app/controllers/
```

Vim 내부에서 `netrw` 를 실행하려면 `:edit` 명령을 사용하고 파일명 대신 디렉터리 매개변수를 전달하면 됩니다:

```
:edit .
:edit src/client/
:edit app/controllers/
```

디렉터리를 전달하지 않고 `netrw` 창을 실행하는 다른 방법도 있습니다:

```
:Explore     현재 파일에서 netrw 실행
:Sexplore    말 그대로 화면 상단 분할 영역에서 netrw 실행
:Vexplore    화면 좌측 분할 영역에서 netrw 실행
```

`netrw` 는 Vim 모션 명령으로 탐색할 수 있습니다. (모션 명령은 후반부 장에서 자세히 다룹니다.) 파일이나 디렉터리를 생성, 삭제 또는 이름 변경할 경우 유용한 `netrw` 명령어 목록은 다음과 같습니다:

```
%    새 파일 생성
d    새 디렉터리 생성
R    파일 또는 디렉터리 이름 변경
D    파일 또는 디렉터리 삭제
```

`:h netrw` 는 매우 포괄적입니다. 시간이 되면 한번 살펴보시기 바랍니다.

`netrw` 가 너무 심심하다면, [vim-vinegar](https://github.com/tpope/vim-vinegar) 플러그인으로 기능을 강화할 수 있습니다. 다른 파일 탐색기를 원하면 [NERDTree](https://github.com/preservim/nerdtree)도 훌륭한 대안입니다. 한번 살펴보시기 바랍니다!


## Fzf
이제 Vim 내장 도구로 파일을 검색하는 방법을 배웠으니, 플러그인을 사용하는 법을 알아보겠습니다.

현대식 텍스트 에디터가 잘 구현하고 Vim이 미흡했던 점 중 하나는 파일 검색의 용이성, 특히 퍼지 검색 기능입니다. 본 장 후반부에는 [fzf.vim](https://github.com/junegunn/fzf.vim)을 활용해서 Vim에서 쉽고 강력하게 검색하는 방법을 소개하겠습니다.


## Setup
먼저, [fzf](https://github.com/junegunn/fzf) 와 [ripgrep](https://github.com/BurntSushi/ripgrep) 이 설치되어 있는지 확인합니다. 해당 github 저장소의 지침을 따릅니다. 설치가 성공적으로 완료되면 `fzf` 와 `rg` 명령어를 사용할 수 있습니다.

Ripgrep은 grep과 유사한 검색 도구입니다. (이름으로 알 수 있듯이). 일반적으로 grep보다 빠르며 다양한 유용한 기능을 제공합니다. Fzf는 범용 명령줄 퍼지 검색 도구입니다. ripgrep을 포함한 모든 명령어와 함께 사용할 수 있습니다. 이 둘을 함께 사용하면 강력한 검색 도구 조합을 만들 수 있습니다.

fzf는 기본적으로 ripgrep을 사용하지 않으므로, `FZF_DEFAULT_COMMAND` 변수를 정의해서 fzf가 ripgrep을 사용하도록 설정해야 합니다. 저의 `.zshrc` 파일(bash 사용 시 `.bashrc`)에는 다음과 같이 설정되어 있습니다:

```
if type rg &> /dev/null; then
  export FZF_DEFAULT_COMMAND='rg --files'
  export FZF_DEFAULT_OPTS='-m'
fi
```

`FZF_DEFAULT_OPTS` 의 `-m` 옵션에 주목합니다. 이 옵션은 `<Tab>` 또는 `<Shift-Tab>`으로 여러 항목을 선택할 수 있습니다. Vim에서 fzf를 사용하기 위해 이 줄이 꼭 필요한 건 아니지만, 유용한 옵션이라고 생각합니다. 곧 설명할 여러 파일에서 검색 및 바꾸기 작업을 수행할 때 특히 유용합니다. fzf 명령어는 더 많은 옵션을 지원하지만, 여기서는 다루지 않겠습니다. 자세한 내용은 [fzf 공식 저장소](https://github.com/junegunn/fzf#usage) 나 `man fzf` 를 참고합니다. 최소한 `export FZF_DEFAULT_COMMAND=‘rg’` 는 설정해야 합니다.

fzf 와 ripgrep 설치 후 fzf 플러그인을 설정해 보겠습니다. 본 가이드는 [vim-plug](https://github.com/junegunn/vim-plug) 플러그인 관리자를 사용하지만, 다른 관리자도 가능합니다.

`.vimrc` 의 plugins 섹션에 다음을 추가합니다. fzf 제작자가 만든 [fzf.vim](https://github.com/junegunn/fzf.vim) 플러그인을 사용해야 합니다.

```
call plug#begin()
Plug 'junegunn/fzf.vim'
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
call plug#end()
```

이 줄을 추가한 후에는 `vim` 을 열고 `:PlugInstall` 을 실행해야 합니다. 이 명령은 `vimrc` 파일에 정의되어 있지만 설치되지 않은 모든 플러그인을 설치합니다. 이 경우 `fzf.vim` 과 `fzf` 가 설치됩니다. 

이 플러그인에 대한 자세한 내용은 [fzf.vim 저장소](https://github.com/junegunn/fzf/blob/master/README-VIM.md) 에서 확인할 수 있습니다.


## Fzf Syntax
fzf를 효율적으로 사용하려면 기본적인 fzf 구문을 익혀야 합니다. 다행히 목록은 간단합니다:

- `^` 는 접두사 완전 일치입니다. “welcome” 으로 시작하는 문구를 검색하려면: `^welcome`
- `$` 는 접미사 완전 일치입니다. “my friends” 로 끝나는 문구를 검색하려면: `friends$`
- `'` 는 완전 일치입니다. “welcome my friends” 라는 문구를 검색하려면: `'welcome my friends`
- `|` 는 “또는” 일치입니다. ‘friends’ 또는 “foes” 중 하나를 검색하려면: `friends | foes`
- `!` 는 역일치입니다. “welcome” 을 포함하고 “friends” 를 포함하지 않는 구문을 검색하려면: `welcome !friends`

이런 옵션은 혼합해서 사용할 수 있습니다. 예를 들어, `^hello | ^welcome friends$` 는 “welcome” 또는 “hello” 로 시작하고 “friends” 로 끝나는 구문을 검색합니다.


## Finding Files
Vim 내에서 fzf.vim 플러그인을 사용해서 파일을 검색하려면 `:Files` 명령을 사용할 수 있습니다. Vim에서 `:Files` 를 실행하면 fzf 검색 프롬프트가 표시됩니다.

이 명령은 자주 사용하므로 키보드 단축키에 매핑하는 것이 좋습니다. 저는 `Ctrl-f` 로 매핑했습니다. 저의 vimrc는 다음과 같이 설정되어 있습니다:

```
nnoremap <silent> <C-f> :Files<CR>
```

## Finding in Files
파일 내부 검색을 위해 `:Rg` 명령어를 사용할 수 있습니다.

이 명령어 역시 자주 사용하므로 키보드 단축키로 매핑하는 것이 좋습니다. 저는 `<Leader>f` 로 매핑했습니다. `<Leader>` 키는 기본적으로 `\` 에 매핑되어 있습니다.

```
nnoremap <silent> <Leader>f :Rg<CR>
```


## Other Searches
Fzf.vim은 다양한 검색 명령어를 제공합니다. 여기서 일일이 설명하진  않지만, [여기](https://github.com/junegunn/fzf.vim#commands) 에서 확인할 수 있습니다.

저의  fzf 매핑은 다음과 같습니다:

```
nnoremap <silent> <Leader>b :Buffers<CR>
nnoremap <silent> <C-f> :Files<CR>
nnoremap <silent> <Leader>f :Rg<CR>
nnoremap <silent> <Leader>/ :BLines<CR>
nnoremap <silent> <Leader>' :Marks<CR>
nnoremap <silent> <Leader>g :Commits<CR>
nnoremap <silent> <Leader>H :Helptags<CR>
nnoremap <silent> <Leader>hh :History<CR>
nnoremap <silent> <Leader>h: :History:<CR>
nnoremap <silent> <Leader>h/ :History/<CR>
```

## Replacing Grep With Rg
앞서 언급했듯이, Vim은 파일 검색을 위해 두 가지 방법을 제공합니다: `:vim` 과 `:grep` 입니다. `:grep` 은 외부 검색 도구를 사용하며, `grepprg` 키워드로 재할당할 수 있습니다. `:grep` 명령을 실행할 때 터미널 grep 대신 ripgrep을 사용하도록 Vim을 구성하는 방법을 보여드리겠습니다.

이제 `:grep` Vim 명령어가 ripgrep을 사용하도록 `grepprg` 을 설정해 보겠습니다. vimrc 파일에 다음을 추가합니다:

```
set grepprg=rg\ --vimgrep\ --smart-case\ --follow
```

위의 옵션 중 일부는 자유롭게 수정해도 됩니다! 위의 옵션 의미에 대한 자세한 내용은 `man rg` 를 참고합니다.

`grepprg` 를 업데이트한 후에 `:grep` 을 실행하면 `grep` 대신 `rg --vimgrep --smart-case --follow` 가 실행됩니다.  ripgrep으로 “donut” 을 검색하려면 이제 `:grep ‘donut’ . -R` 대신 좀 더 간결한 명령어 `:grep “donut”` 을 실행할 수 있습니다.

기존 `:grep` 과 마찬가지로, 이 새로운 `:grep` 도 결과를 표시하기 위해 퀵픽스 창을 사용합니다.

“음, 괜찮긴 한데 Vim에서 `:grep` 을 써본 적도 없고, 그냥 `:Rg` 로 파일 내의 문구를 찾으면 되지 않나? 도대체 언제 `:grep` 을 써야지?” 라고 생각할 수 있습니다.

아주 좋은 질문입니다. 여러 파일에서 검색 및 교체를 수행할 때 Vim의 `:grep` 이 필요할 수 있는데, 이에 대해서는 다음에 다루겠습니다.


## Search and Replace in Multiple Files
VSCode 같은 현대적인 텍스트 편집기는 여러 파일에서 문자열을 검색하고 바꾸는 작업을 매우 쉽게 처리합니다. Vim에서 이를 쉽게 수행하는 두 가지 다른 방법을 보여드리겠습니다.

첫 번째 방법은 프로젝트 내의 **모든**  일치 문구를 바꾸는 것입니다. `:grep` 을 사용해야 합니다. “pizza” 를 “donut” 으로 모두 바꾸려면 다음과 같이 입력합니다:

```
:grep "pizza"
:cfdo %s/pizza/donut/g | update
```

명령어를 하나씩 살펴보겠습니다:

1. `:grep pizza` 는 ripgrep을 사용해서 “pizza” 가 포함된 모든 부분을 검색합니다. (참고로, `grepprg` 를 ripgrep으로 재설정하지 않아도 이 명령은 작동합니다. 대신, `:grep ‘pizza’` 대신 `:grep “pizza” . -R` 을 사용해야 합니다.)
2. `:cfdo` 는 퀵픽스 목록에 포함된 모든 파일에 전달된 명령을 실행합니다. 이 경우 명령은 대체 명령 `%s/pizza/donut/g` 입니다. 파이프(`|`)는 연쇄 연산자입니다. `update` 명령은 대체 후 각 파일을 저장합니다. 대체 명령는 후반부 장에서 자세히 다룰 예정입니다.

두 번째 방법은 선택한 파일에서 검색 및 바꾸기입니다. 이 방법을 사용하면 수동으로 선택-바꾸기를 수행할 파일을 선택할 수 있습니다. 방법은 다음과 같습니다:

1. 먼저 버퍼를 모두 지웁니다. 버퍼 목록은 대체 작업을 적용할 파일만 포함되야 합니다. Vim을 재시작하거나 `:%bd | e#` 명령을 실행합니다. (`%bd` 는 모든 버퍼를 삭제하고 `e#` 는 마지막으로 열었던 파일을 엽니다.)
2. `:Files` 를 실행합니다.
3. 검색 및 치환을 수행할 모든 파일을 선택합니다. 여러 파일을 선택하려면 `<Tab>` / `<Shift-Tab>` 을 사용합니다. 이는 `FZF_DEFAULT_OPTS` 에 다중 플래그(`-m`)가 설정된 경우만 가능합니다.
4. `:bufdo %s/pizza/donut/g | update` 를 실행합니다. 이 명령어는 앞서 소개한 `:cfdo %s/pizza/donut/g | update` 와 유사합니다. 차이점은 모든 퀵픽스 항목(`:cfdo`) 대신 모든 버퍼 항목(`:bufdo`)을 대체한다는 점입니다.


## Learn Search the Smart Way
검색 작업은 텍스트 편집의 핵심입니다. Vim에서 효과적으로 검색하는 방법을 익히면 텍스트 편집 작업 흐름이 크게 개선됩니다.

Fzf.vim은 판도를 바꾸는 도구입니다. 이 플러그인 없이 Vim을 사용하는 건 상상조차 할 수 없습니다. Vim을 시작할 때 훌륭한 검색 도구를 갖추는 것은 매우 중요하다고 생각합니다. 현대적인 텍스트 편집기들이 가진 핵심 기능, 예를 들어 쉽고 강력한 검색 기능이 부족해 보인다는 이유로 Vim으로의 전환에 어려움을 겪는 사람들을 많이 봤습니다. 이 장이 여러분의 Vim 전환을 좀 더 수월하게 만드는 데 도움되길 바랍니다. 

방금 Vim의 확장성을 직접 목격했습니다. 플러그인과 외부 프로그램으로 검색 기능을 확장할 수 있다는 점입니다. 앞으로 Vim에 어떤 기능을 추가할지 항상 염두에 둡니다. 아마 Vim에 내장되어 있거나, 누군가 플러그인을 만들었거나, 해당 기능을 위한 프로그램이 존재할 가능성이 높습니다. 

다음은 Vim에서 매우 중요한 주제인 Vim 문법에 대해 배워보겠습니다.
## Link
- Prev [Ch02. Buffers, Windows, and Tabs](./ch02_buffers_windows_tabs.md)
- Next [Ch04. Vim Grammar](./ch04_vim_grammar.md)
