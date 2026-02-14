# Ch20. Views, Sessions, and Viminfo
프로젝트 작업을 한동안 하다 보면, 설정, 폴더, 버퍼, 레이아웃 등이 점차 자리를 잡아 프로젝트가 형태를 갖추게 됩니다. 마치 한동안 살다 보면 아파트를 꾸미게 되는 것과 비슷합니다. 문제는 Vim을 닫으면 이런 변경 사항이 모두 사라진다는 점입니다. 다음에 Vim을 열었을 때 마치 한 번도 떠나지 않은 것처럼 그대로 유지된다면 얼마나 좋을까요?

이 장은 View, Session, Viminfo를 활용해서 프로젝트의 “스냅샷” 을 보존하는 방법을 배웁니다.


## View
뷰는 세 가지(뷰, 세션, 빔인포) 중 가장 작은 하위 집합입니다. 하나의 창에 대한 설정 모음입니다. 창에서 오랜 시간 작업하면서 맵과 폴드를 보존하려면 뷰를 사용할 수 있습니다.

`foo.txt` 라는 파일을 생성해 보겠습니다:

```
foo1
foo2
foo3
foo4
foo5
foo6
foo7
foo8
foo9
foo10
```

이 파일에서 세 가지 변경 사항을 생성합니다:

1. 1번째 줄에 수동 폴드 `zf4j` 생성 (다음 4줄을 폴드)
2. `number` 설정을 변경합니다: `setlocal nonumber norelativenumber`. 이렇게 하면 창 왼쪽의 번호 표시기가 제거됩니다.
3. `j` 키를 누를 때마다 한 줄이 아닌 두 줄씩 이동하도록 로컬 매핑을 생성합니다: `:nnoremap <buffer> j jj`

파일이 다음과 같이 표시되야 합니다:

```
+-- 5 lines: foo1 -----
foo6
foo7
foo8
foo9
foo10
```


### Configuring View Attributes
다음을 실행합니다:

```
:set viewoptions?
```

기본값은 다음과 같아야 합니다. (사용자의 vimrc에 따라 다를 수 있음):

```
viewoptions=folds,cursor,curdir
```

`viewoptions` 을 설정해 보겠습니다. 유지하고 싶은 세 가지 속성은 폴드(folds), 커서 매핑(cursor), 로컬 설정 옵션(local set options)입니다. 설정 값이 제 것과 같다면 이미 `folds` 옵션이 있습니다. 뷰에 `localoptions` 를 기억하도록 지시합니다. 

다음을 실행합니다:

```
:set viewoptions+=localoptions
```

`viewoptions` 에 사용할 수 있는 다른 옵션을 확인하려면 `:h viewoptions` 를 참조합니다. 이제 `:set viewoptions?` 를 실행하면 다음과 같이 표시됩니다:

```
viewoptions=folds,cursor,curdir,localoptions
```


### Saving the View
`foo.txt` 창이 제대로 접혀 있고 `nonumber norelativenumber` 옵션이 설정된 상태에서 뷰를 저장해 보겠습니다. 다음 명령을 실행합니다:

```
:mkview
```

Vim은 뷰 파일을 생성합니다.


### View Files
“Vim은 뷰 파일을 어디에 저장했을까?” 궁금할 수 있습니다. Vim이 저장하는 위치를 확인하려면 다음을 실행합니다:

```
:set viewdir?
```

유닉스 기반 OS는 기본값이 `~/.vim/view` 로 표시됩니다. (다른 OS를 사용 중이라면 다른 경로가 표시될 수 있습니다. 자세한 내용은 `:h viewdir` 을 참조합니다.) 유닉스 기반 OS를 사용 중이고 다른 경로로 변경하려면 vimrc에 다음을 추가합니다:

```
set viewdir=$HOME/else/where
```


### Loading the View File
`foo.txt`를 닫지 않았다면 닫은 후 다시 열어봅니다. **변경 사항이 적용되지 않은 원본 텍스트가 표시되야 합니다.** 이는 정상적인 동작입니다.

상태를 복원하려면 뷰 파일을 불러와야 합니다. 다음 명령을 실행합니다:

```
:loadview
```

이제 다음과 같이 표시되야 합니다:

```
+-- 5 lines: foo1 -----
foo6
foo7
foo8
foo9
foo10
```

접힌 부분, 지역 설정 및 지역 매핑이 복원됩니다. 확인해 보면, `:mkview` 명령을 실행했을 때 커서를 위치한  줄에 커서가 위치해 있을 겁니다. `cursor` 옵션이 설정되어 있는 한, View는 커서 위치도 기억합니다.


### Multiple Views
Vim은 9개의 번호가 매겨진 뷰(1-9)를 저장할 수 있습니다.

추가적인 폴드(예: 마지막 두 줄을 폴드)를 `:9,10 fold` 로 만든다고 가정합니다. 이를 뷰 1로 저장해 보겠습니다. 다음을 실행합니다:

```
:mkview 1
```

`:6,7 fold` 로 한 번 더 폴드를 만들고 다른 뷰로 저장하려면 다음을 실행합니다:

```
:mkview 2
```

파일을 닫습니다. `foo.txt` 를 열었을 때 뷰 1을 불러오려면 다음을 실행합니다:

```
:loadview 1
```

뷰 2를 불러오려면 다음을 실행합니다:

```
:loadview 2
```

원래 뷰를 불러오려면 다음을 실행합니다:

```
:loadview
```


### Automating View Creation
가장 최악의 상황 중 하나는, 폴더로 구성된 대용량 파일을 정리하는 데 수많은 시간을 투자한 후 실수로 창을 닫아서 모든 폴더 정보를 잃어버리는 경우입니다. 이를 방지하려면 버퍼를 닫을 때마다 자동으로 뷰를 생성하도록 설정하는 것이 좋습니다. vimrc에 다음을 추가합니다:

```
autocmd BufWinLeave *.txt mkview
```

또한, 버퍼를 열 때 뷰를 로드하는 것도 유용합니다:

```
autocmd BufWinEnter *.txt silent loadview
```

이제 `txt` 파일 작업 시 뷰 생성 및 로딩을 걱정하지 않아도 됩니다. 시간이 지남에 따라 `~/.vim/view` 디렉터리에 뷰 파일이 쌓일 수 있으니, 몇 달에 한 번씩 정리하는 것이 좋습니다.


## Sessions
뷰(View)가 창(window)의 설정을 저장한다면, 세션(Session)은 모든 창(레이아웃 포함)의 정보를 저장합니다.


### Creating a New Session
`foobarbaz` 프로젝트에서 다음 3개의 파일을 작업한다고 가정합니다:

`foo.txt` 내부:

```
foo1
foo2
foo3
foo4
foo5
foo6
foo7
foo8
foo9
foo10
```

`bar.txt` 내부:

```
bar1
bar2
bar3
bar4
bar5
bar6
bar7
bar8
bar9
bar10
```

`baz.txt` 내부:

```
baz1
baz2
baz3
baz4
baz5
baz6
baz7
baz8
baz9
baz10
```

이제 `:split` 과 `:vsplit` 으로 창을 분할했다고 가정해 보겠습니다. 이 상태를 유지하려면 세션을 저장해야 합니다. 다음 명령을 실행합니다:

```
:mksession
```

기본적으로 `~/.vim/view` 에 저장하는 `mkview` 와 달리, `mksession` 은 현재 디렉토리에 세션 파일(`Session.vim`)을 저장합니다. 내용이 궁금하면 파일을 확인합니다.

세션 파일을 다른 위치에 저장하려면 `mksession` 에 인수를 전달합니다:

```
:mksession ~/some/where/else.vim
```

기존 세션 파일을 덮어쓰려면 명령어 앞에 `!` 를 붙여 실행합니다. (`:mksession! ~/some/where/else.vim`)


### Loading a Session
세션을 로드하려면 다음을 실행합니다:

```
:source Session.vim
```

이제 Vim은 분할 창을 포함해서 마지막으로 사용했던 상태 그대로 나타납니다! 또는 터미널에서 세션 파일을 로드할 수도 있습니다:

```
vim -S Session.vim
```


### Configuring Session Attributes
세션이 저장하는 속성을 구성할 수 있습니다. 현재 저장 중인 항목을 확인하려면 다음 명령을 실행합니다:

```
:set sessionoptions?
```

제 환경에서는 다음과 같이 표시됩니다:

```
blank,buffers,curdir,folds,help,tabpages,winsize,terminal
```

세션을 저장할 때 `terminal` 을 저장하지 않으려면 세션 옵션에서 제거합니다. 다음 명령을 실행합니다:

```
:set sessionoptions-=terminal
```

세션을 저장할 때 `options` 을 추가하려면 다음을 실행합니다:

```
:set sessionoptions+=options
```

`sessionoptions` 이 저장할 수 있는 속성은 다음과 같습니다:

- `blank`: 빈 창 저장
- `buffers`: 버퍼 저장
- `folds`: 폴드 저장
- `globals`: 전역 변수 저장 (대문자로 시작하고 소문자가 하나 이상 포함되어야 함)
- `options`: 옵션 및 매핑 저장
- `resize`: 창 줄/열 크기 저장
- `winpos`: 창 위치 저장
- `winsize`: 창 크기 저장
- `tabpages`: 탭 저장
- `unix`: Unix 형식의 파일 저장

전체 목록은 `:h ‘sessionoptions’`를 참조합니다.

세션은 프로젝트의 외부 속성을 보존하는 유용한 도구입니다. 그러나, 로컬 마크, 레지스터, 히스토리 등과 같은 일부 내부 속성은 세션에 저장되지 않습니다. 이를 저장하려면 Viminfo를 사용해야 합니다!


## Viminfo
주목합니다! 단어를 레지스터 a에 저장하고 Vim을 종료한 후, 다음에 Vim을 열면 해당 텍스트가 여전히 레지스터 a에 저장되어 있습니다! 이는 사실 Viminfo의 역할입니다. Viminfo가 없다면, Vim을 닫은 후 레지스터 내용을 기억하지 못합니다.

Vim 8 이상을 사용한다면, Vim은 기본적으로 Viminfo를 활성화합니다. 따라서, 여러분은 모르고 있었을지 몰라도, 지금까지 계속 Viminfo를 사용했을 수도 있습니다!

“Viminfo는 무엇을 저장하나요? 세션(Session)과 어떻게 다른가요?” 라고 궁금해하실 수 있습니다.

Viminfo를 사용하려면 먼저 `+viminfo` 기능이 활성화되어 있어야 합니다. (`:version` 참조). Viminfo는 다음을 저장합니다:

- 명령줄 기록
- 검색 문자열 기록
- 입력 줄 기록
- 비어 있지 않은 레지스터 내용
- 여러 파일의 마크
- 파일 내 위치로 연결되는 파일 마크
- 마지막 검색/대체 패턴(‘n’ 및 ‘&’ 명령어용)
- 버퍼 목록
- 전역 변수

일반적으로 세션은 “외부” 속성을 저장하고, Viminfo는 “내부” 속성을 저장합니다.

프로젝트마다 하나의 세션 파일을 가질 수 있는 세션과 달리, 일반적으로 컴퓨터마다 하나의 Viminfo 파일을 사용합니다. Viminfo는 프로젝트에 구애받지 않습니다.

Unix의 기본 Viminfo 위치는 `$HOME/.viminfo`(`~/.viminfo`)입니다. 다른 OS를 사용하는 경우 Viminfo 위치는 다를 수 있습니다. `:h viminfo-file-name` 을 확인합니다. 텍스트를 레지스터에 복사하는 등 “내부” 변경을 처리할 때마다 Vim은 자동으로 Viminfo 파일을 업데이트합니다.

> [!CAUTION]
> `nocompatible` 옵션이 설정되어 있는지 확인합니다. (`set nocompatible`). 그렇지 않으면 Viminfo는 작동하지 않습니다.


### Writing and Reading Viminfo
비록 하나의 Viminfo 파일만 사용하더라도, 여러 개의 Viminfo 파일을 생성할 수 있습니다. Viminfo 파일을 작성하려면 `:wviminfo` 명령어(줄여서 `:wv`)를 사용합니다.

```
:wv ~/.viminfo_extra
```

기존 Viminfo 파일을 덮어쓰려면 `wv` 명령어에 느낌표를 추가합니다:

```
:wv! ~/.viminfo_extra
```

기본적으로 Vim은 `~/.viminfo` 파일을 읽습니다. 다른 Viminfo 파일을 읽으려면 `:rviminfo` 를 실행하거나, 줄여서 `:rv` 를 사용합니다:

```
:rv ~/.viminfo_extra
```

터미널에서 다른 Viminfo 파일로 Vim을 시작하려면 `i` 플래그를 사용합니다:

```
vim -i viminfo_extra
```

코딩과 글쓰기처럼 서로 다른 작업에 Vim을 사용하는 경우, 글쓰기에 최적화된 Viminfo와 코딩용 Viminfo를 따로 생성할 수 있습니다.

```
vim -i viminfo_writing

vim -i viminfo_coding
```


### Starting Vim Without Viminfo
Viminfo 없이 Vim을 시작하려면 터미널에서 다음 명령을 실행합니다:

```
vim -i NONE
```

영구적으로 설정하려면 vimrc 파일에 다음을 추가합니다:

```
set viminfo="NONE"
```


### Configuring Viminfo Attributes
`viewoptions` 및 `sessionoptions` 과 마찬가지로, `viminfo` 옵션을 사용해서 저장할 속성을 지정할 수 있습니다. 

다음을 실행합니다:

```
:set viminfo?
```

다음과 같은 결과를 얻습니다:

```
!,'100,<50,s10,h
```

이것은 암호처럼 보입니다. 하나씩 살펴보겠습니다:

- `!` 는 대문자로 시작하고 소문자를 포함하지 않는 전역 변수를 저장합니다. `g:` 는 전역 변수를 나타냅니다. 예를 들어, `let g:FOO = “foo”` 같은 할당문을 작성하면 Viminfo는 전역 변수 `FOO` 를 저장합니다. 그러나, `let g:Foo = “foo”` 같이 작성하면 소문자가 포함되어 있어 Viminfo가 이 전역 변수를 저장하지 않습니다. `!` 가 없으면 Vim은 이런 전역 변수를 저장하지 않습니다.
- `'100` 은 마크를 나타냅니다. 이 경우 Viminfo는 마지막 100개 파일의 로컬 마크(a-z)를 저장합니다. 너무 많은 파일을 저장하도록 설정하면 Vim이 느려질 수 있으니 주의합니다. 1,000개가 적당한 수치입니다.
- `<50` 은 각 레지스터에 저장되는 최대 줄 수(이 경우 50줄)를 Viminfo에 알려줍니다. 레지스터 a에 100줄의 텍스트를 복사(`“ay99j`)한 후 Vim을 종료하면, 다음에 Vim을 열고 레지스터 a에서 붙여넣기(`”ap`)할 때 Vim은 최대 50줄만 붙여넣습니다. 최대 줄 수를 지정하지 않으면 **모든** 줄이 저장됩니다. 0을 지정하면 아무것도 저장되지 않습니다.
- `s10` 은 레지스터의 크기 제한(kb 단위)을 설정합니다. 이 경우 10kb를 초과하는 레지스터는 제외됩니다.
- `h` 는 Vim 시작 시 `hlsearch` 의 강조 표시를 비활성화합니다.

전달할 수 있는 다른 옵션들도 있습니다. 자세한 내용은 `:h ‘viminfo’` 를 참조합니다.


## Using Views, Sessions, and Viminfo the Smart Way
Vim은 뷰(View), 세션(Session), 빔인포(Viminfo)를 통해 서로 다른 수준의 Vim 환경 스냅샷을 생성합니다. 소규모 프로젝트는 뷰를, 대규모 프로젝트는 세션을 사용합니다. 뷰, 세션, 빔인포가 제공하는 모든 옵션을 꼼꼼히 살펴보는 시간을 가져야 합니다.

자신만의 편집 스타일에 맞춰 뷰, 세션, 빔인포를 생성합니다. 컴퓨터 외부에서 Vim을 사용할 경우, 설정만 불러오면 즉시 익숙한 환경을 느낄 수 있습니다!


## Link
- Prev [Ch19. Compile](./ch19_compile.md)
- Next [Ch21. Multiple File Operations](./ch21_multiple_file_operations.md)
