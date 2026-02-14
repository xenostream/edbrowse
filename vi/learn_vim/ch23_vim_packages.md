# Ch23. Vim Packages
이전 장은 플러그인 설치를 위해 외부 플러그인 관리자를 사용하는 방법을 언급했습니다. 버전 8부터 Vim은 **packages** 라는 자체 내장 플러그인 관리자를 제공합니다. 이 장은 Vim 패키지를 사용해서 플러그인을 설치하는 방법을 배웁니다.

사용 중인 Vim 빌드에 패키지 기능이 있는지 확인하려면 `:version` 을 실행하고 `+packages` 속성이 있는지 살펴봅니다. 또는 `:echo has(‘packages’)` 를 실행해도 됩니다. (1이 반환되면 패키지 기능이 있는 것입니다.)


## Pack Directory
루트 경로에 `~/.vim/` 디렉터리가 있는지 확인합니다. 없다면 생성합니다. 그 안에 `pack`이란 디렉터리(`~/.vim/pack/`)를 만듭니다. Vim은 자동으로 이 디렉터리에서 패키지를 검색합니다.


## Two Types of Loading
Vim 패키지는 자동 로딩과 수동 로딩이란 두 가지 로딩 메커니즘이 있습니다.


### Automatic Loading
Vim 시작 시 플러그인을 자동으로 로드하려면 `start/` 디렉터리에 배치합니다. 경로는 다음과 같습니다:

```
~/.vim/pack/*/start/
```

이제 궁금할 수 있습니다. “`pack/` 과 `start/` 사이에 있는 `*` 는 무엇일까요?”  `*` 는 임의의 이름으로 원하는 대로 지정할 수 있습니다. `packdemo/` 라고 명명해 보겠습니다:

```
~/.vim/pack/packdemo/start/
```

만약 이 단계를 생략하고 다음과 같이 하면:

```
~/.vim/pack/start/
```

패키지 시스템이 작동하지 않습니다. `pack/` 과 `start/` 사이에 이름을 반드시 넣어야 합니다.

이 데모는 [NERDTree](https://github.com/preservim/nerdtree) 플러그인을 설치해 보겠습니다. `start/` 디렉터리로 이동한 후(`cd ~/.vim/pack/packdemo/start/`) NERDTree 저장소를 복제합니다:

```
git clone https://github.com/preservim/nerdtree.git
```

이것으로 끝입니다! 이제 준비가 완료되었습니다. 다음에 Vim을 시작하면 `:NERDTreeToggle` 같은 NERDTree 명령어를 바로 실행할 수 있습니다.

`~/.vim/pack/*/start/` 경로 내에는 원하는 만큼 플러그인 저장소를 복제할 수 있습니다. Vim은 각 저장소를 자동으로 로드합니다. 복제한 저장소를 삭제하면(`rm -rf nerdtree/`), 해당 플러그인은 더 이상 사용할 수 없습니다.


### Manual Loading
Vim 시작 시 플러그인을 수동으로 로드하려면 `opt/` 디렉터리에 배치합니다. 자동 로드와 마찬가지로 경로는 다음과 같습니다:

```
~/.vim/pack/*/opt/
```

앞서 사용한 `packdemo/` 디렉터리를 예로 들어 보겠습니다:

```
~/.vim/pack/packdemo/opt/
```

이번에는 [killersheep](https://github.com/vim/killersheep) 게임을 설치해 보겠습니다. (Vim 8.2 이상 필요). `opt/` 디렉터리로 이동한 후(`cd ~/.vim/pack/packdemo/opt/`) 저장소를 복제합니다:

```
git clone https://github.com/vim/killersheep.git
```

Vim을 실행합니다. 게임을 실행하는 명령어는 `:KillKillKill` 입니다. 실행해 보시기 바랍니다. Vim은 유효한 에디터 명령어가 아니라고 오류 메시지를 표시합니다. 먼저 플러그인을 **수동으로** 로드해야 합니다. 이렇게 해 보시기 바랍니다:

```
:packadd killersheep
```

이제 다시 `:KillKillKill` 명령어를 실행합니다. 이제는 정상 작동합니다.

“왜 수동으로 패키지를 로드하지? 시작할 때 자동으로 다 로드하는 게 더 낫지 않나?” 라고 궁금해할 수 있습니다.

좋은 질문입니다. KillerSheep 게임처럼 항상 사용하지 않는 플러그인이 있을 때가 있습니다. 10가지 게임을 모두 로드하면 Vim 시작 속도가 느려질 수 있습니다. 하지만, 가끔 심심할 때 게임하고 싶을 때가 있습니다. 필수적이지 않은 플러그인은 수동 로딩을 활용합니다.

플러그인을 조건부로 추가하는 용도로 사용할 수 있습니다. 예를 들어, Neovim과 Vim 모두 사용하는데 Neovim 전용 최적화 플러그인이 있다면, vimrc에 다음과 같이 추가할 수 있습니다:

```
if has('nvim')
  packadd! neovim-only-plugin
else
  packadd! generic-vim-plugin
endif
```


## Organizing Packages
Vim 패키지 시스템을 사용하기 위한 요구사항은 다음 중 하나를 갖는 것입니다:

```
~/.vim/pack/*/start/
```

또는:

```
~/.vim/pack/*/opt/
```

`*` 는 **어떤** 이름이든 될 수 있다는 사실은 패키지를 정리하는 데 활용할 수 있습니다. 플러그인을 카테고리(색상, 구문, 게임)별로 그룹화하려면:

```
~/.vim/pack/colors/
~/.vim/pack/syntax/
~/.vim/pack/games/
```

각 디렉토리 내부도 `start/` 와 `opt/` 를 계속 사용할 수 있습니다.

```
~/.vim/pack/colors/start/
~/.vim/pack/colors/opt/

~/.vim/pack/syntax/start/
~/.vim/pack/syntax/opt/

~/.vim/pack/games/start/
~/.vim/pack/games/opt/
```

## Adding Packages the Smart Way
Vim 패키지가 vim-pathogen, vundle.vim, dein.vim, vim-plug 같은 인기 플러그인 관리자를 쓸모없게 만들지 궁금할 수 있습니다.

답은 언제나 그렇듯 “상황에 따라 다릅니다!”

저는 여전히 vim-plug 를 사용합니다. 플러그인을 추가, 제거 또는 업데이트하기 쉽기 때문입니다. 많은 플러그인을 사용한다면, 여러 개를 동시에 쉽게 업데이트할 수 있어 플러그인 관리자를 사용하는 것이 좀 더 편리할 수 있습니다. 일부 플러그인 관리자는 비동기 기능도 제공합니다.

미니멀리스트라면 Vim 패키지를 시도합니다. 플러그인을 많이 사용하는 사용자라면 플러그인 관리자 사용을 고려합니다.



## Link
- Prev [Ch22. Vimrc](./ch22_vimrc.md)
- Next [Ch24. Vim Runtime](./ch24_vim_runtime.md)
