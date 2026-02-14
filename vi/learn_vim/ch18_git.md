# Ch18. Git
Vim과 git은 서로 다른 두 가지 용도로 훌륭한 도구입니다. Git은 버전 관리 도구입니다. Vim은 텍스트 편집기입니다.

이 장은 Vim과 git을 함께 통합하는 다양한 방법을 배웁니다.


## Diffing
이전 장에서 다룬 것 같이, 여러 파일 간의 차이점을 표시하려면 `vimdiff` 명령어를 실행할 수 있습니다.

`file1.txt` 와 `file2.txt` 라는 두 개의 파일을 가정합니다.

`file1.txt` 내부:

```
pancakes
waffles
apples

milk
apple juice

yogurt
```

`file2.txt` 내부:

```
pancakes
waffles
oranges

milk
orange juice

yogurt
```

두 파일의 차이점을 보려면 다음을 실행합니다:

```
vimdiff file1.txt file2.txt
```

또는 다음 명령을 실행할 수도 있습니다:

```
vim -d file1.txt file2.txt
```

`vimdiff` 는 두 버퍼를 나란히 표시합니다. 왼쪽은 `file1.txt` 이고 오른쪽은 `file2.txt` 입니다. 첫 번째 차이점(apples와 oranges)은 양쪽 줄에서 모두 강조 표시됩니다.

두 번째 버퍼에 오렌지 대신 사과를 넣으려면, 현재 위치(`file1.txt` 상)의 내용을 `file2.txt` 로 옮기려면 먼저 `]c` 로 다음 차이점 창으로 이동합니다. (이전 차이점 창으로 이동하려면 `[c` 를 사용합니다). 커서가 사과에 위치해야 합니다. `:diffput` 을 실행하면 두 파일 모두 사과를 가지게 됩니다.

다른 버퍼(오렌지 주스, `file2.txt`)의 텍스트를 현재 버퍼(사과 주스, `file1.txt`)의 텍스트로 대체하려면, 커서가 여전히 `file1.txt` 창에 있는 상태에서 먼저 `]c` 로 다음 차이점으로 이동합니다. 커서가 이제 사과 주스에 위치해야 합니다. `:diffget` 을 실행해서 다른 버퍼의 오렌지 주스를 가져와서 현재 버퍼의 사과 주스를 대체합니다.

`:diffput` 은 현재 버퍼의 텍스트를 다른 버퍼로 **내보냅니다**. `:diffget` 은 다른 버퍼의 텍스트를 현재 버퍼로 **가져옵니다**.

여러 버퍼가 있는 경우 `:diffput fileN.txt` 와 `:diffget fileN.txt` 를 실행해서 fileN 버퍼를 지정할 수 있습니다.



## Vim As a Merge Tool

> "I love resolving merge conflicts!" - Nobody

머지(병합) 충돌을 해결하는 걸 좋아하는 사람은 아무도 없습니다. 하지만, 이는 피할 수 없는 일입니다. 이 섹션은 Vim을 머지 충돌 해결 도구로 활용하는 방법을 배웁니다.

먼저, 다음 명령을 실행해서 기본 머지 도구를 `vimdiff` 로 변경합니다:

```
git config merge.tool vimdiff
git config merge.conflictstyle diff3
git config mergetool.prompt false
```

또는 `~/.gitconfig` 파일을 직접 수정할 수도 있습니다. (기본적으로 루트 디렉터리에 위치하지만, 사용자에 따라 다른 위치에 있을 수 있습니다.) 위의 명령어들은 gitconfig 파일을 다음 설정과 동일하게 수정해야 합니다. 아직 실행하지 않았다면, gitconfig 파일을 수동으로 편집할 수도 있습니다.

```
[core]
  editor = vim
[merge]
  tool = vimdiff
  conflictstyle = diff3
[difftool]
  prompt = false
```

이것을 테스트하기 위해 가짜 병합 충돌 상황을 만들어 보겠습니다. `/food` 디렉터리를 생성하고 Git 저장소로 만듭니다:

```
git init
```

`breakfast.txt` 파일을 추가합니다. 내용은 다음과 같습니다:

```
pancakes
waffles
oranges
```

파일을 추가하고 커밋합니다:

```
git add .
git commit -m "Initial breakfast commit"
```

다음으로 새로운 브랜치를 생성하고 apples 브랜치라고 명명합니다:

```
git checkout -b apples
```

`breakfast.txt` 파일을 변경합니다:

```
pancakes
waffles
apples
```

파일을 저장한 후 변경 사항을 추가하고 커밋합니다:

```
git add .
git commit -m "Apples not oranges"
```

좋습니다. 이제 마스터 브랜치에는 오렌지가, 애플스 브랜치에는 사과가 있습니다. 마스터 브랜치로 돌아가겠습니다:

```
git checkout master
```

`breakfast.txt` 파일에는 기본 텍스트인 'orange'  가 표시되야 합니다. 지금이 제철인 포도로 변경해 보겠습니다:

```
pancakes
waffles
grapes
```

저장, 추가, 커밋합니다:

```
git add .
git commit -m "Grapes not oranges"
```

이제 애플스 브랜치를 마스터 브랜치에 병합할 준비가 되었습니다:

```
git merge apples
```

다음과 같은 오류가 표시됩니다:

```
Auto-merging breakfast.txt
CONFLICT (content): Merge conflict in breakfast.txt
Automatic merge failed; fix conflicts and then commit the result.
```

충돌이 발생습니다! 새로 설정된 `mergetool` 을 사용해서 충돌을 해결해 보겠습니다. 다음 명령을 실행합니다:

```
git mergetool
```

Vim이 네 개의 창을 표시합니다. 상단 세 개에 주목합니다:

- `LOCAL` 에는 `grapes` 가 포함됩니다. 이는 “로컬” 의 변경 사항으로, 병합 대상입니다.
- `BASE` 에는 `grapes` 가 있습니다. `LOCAL` 과 `REMOTE` 의 공통 조상으로, 둘의 차이점을 비교하기 위한 기준입니다.
- `REMOTE` 에는 `apples` 가 있습니다. 병합 대상이 되는 내용입니다.

하단(네 번째 창)에는 다음과 같은 내용이 표시됩니다:

```
pancakes
waffles
<<<<<<< HEAD
grapes
||||||| db63958
oranges
=======
apples
>>>>>>> apples
```

네 번째 창에는 병합 충돌 텍스트가 표시됩니다. 이 설정으로 각 환경의 변경 사항을 좀 더 쉽게 확인할 수 있습니다. `LOCAL`, `BASE`, `REMOTE` 의 내용을 동시에 볼 수 있습니다.

커서는 네 번째 창에서 강조 표시된 영역에 위치해야 합니다. `LOCAL` (포도)의 변경 사항을 확인하려면 `:diffget LOCAL` 을 실행합니다. `BASE` (오렌지)의 변경 사항을 확인하려면 `:diffget BASE` 를, `REMOTE` (사과)의 변경 사항을 확인하려면 `:diffget REMOTE` 를 실행합니다.

이번에는 `LOCAL` 의 변경 사항을 확인해 보겠습니다. `:diffget LOCAL` 을 실행합니다. 이제 네 번째 창에 포도(grapes)가 표시됩니다. 작업 완료 후 모든 파일을 저장하고 종료합니다. (`:wqall`). 어렵지 않았죠?

참고로 `breakfast.txt.orig` 파일도 생성됩니다. Git은 문제가 발생할 경우를 대비해서 백업 파일을 만듭니다. 병합 시 백업 파일 생성을 원치 않는다면 다음 명령을 실행합니다:

```
git config --global mergetool.keepBackup false
```


## Git Inside Vim
Vim에는 기본적으로 내장된 git 기능이 없습니다. Vim에서 git 명령어를 실행하는 한 가지 방법은 명령줄 모드에서 뱅 연산자 `!`를 사용하는 것입니다.

모든 git 명령어는 `!` 과 함께 실행할 수 있습니다:

```
:!git status
:!git commit
:!git diff
:!git push origin master
```

Vim의 `%`(현재 버퍼) 또는 `#`(다른 버퍼) 규칙도 사용할 수 있습니다:

```
:!git add %         " git add current file
:!git checkout #    " git checkout the other file
```

여러 파일을 서로 다른 Vim 창에 추가하는 데 사용할 수 있는 Vim 트릭은 다음과 같이 실행하는 것입니다:

```
:windo !git add %
```

그런 다음 커밋을 수행합니다:

```
:!git commit "Just git-added everything in my Vim window, cool"
```

`windo` 명령어는 Vim의 “do” 명령어 중 하나로, 앞서 보셨던 `argdo` 와 유사합니다. `windo` 는 각 창에 명령어를 실행합니다.

대안으로, 작업 흐름에 따라 `bufdo !git add %` 를 사용해서 모든 버퍼를 git add 하거나 `argdo !git add %` 를 사용해서 모든 파일 인수를 git add 할 수도 있습니다.


## Plugins
Vim용 git 지원 플러그인은 다양합니다. 다음은 Vim에서 널리 사용되는 git 관련 플러그인 목록입니다. (이 글을 읽는 시점에는 더 많은 플러그인이 존재할 수 있습니다.):

- [vim-gitgutter](https://github.com/airblade/vim-gitgutter)
- [vim-signify](https://github.com/mhinz/vim-signify)
- [vim-fugitive](https://github.com/tpope/vim-fugitive)
- [gv.vim](https://github.com/junegunn/gv.vim)
- [vimagit](https://github.com/jreybert/vimagit)
- [vim-twiggy](https://github.com/sodapopcan/vim-twiggy)
- [rhubarb](https://github.com/tpope/vim-rhubarb)

가장 인기 있는 것 중 하나는 vim-fugitive입니다. 이 장의 나머지 부분에서 이 플러그인을 사용한 여러 git 워크플로를 살펴보겠습니다.


## Vim-fugitive
vim-fugitive 플러그인을 사용하면 Vim 편집기를 벗어나지 않고도 git CLI를 실행할 수 있습니다. 일부 명령어는 Vim 내부에서 실행할 때 좀 더 편리하다는 것을 알게 될 것입니다.

시작하려면 Vim 플러그인 관리자를 사용합니다. ([vim-plug](https://github.com/junegunn/vim-plug), [vundle](https://github.com/VundleVim/Vundle.vim), [dein.vim](https://github.com/Shougo/dein.vim) 등).


## Git Status
`:Git` 명령어를 매개변수 없이 실행하면 vim-fugitive가 git 요약 창을 표시합니다. 이 창에는 추적되지 않은 파일, 스테이징되지 않은 파일, 스테이징된 파일이 표시됩니다. 이 “`git status`” 모드는 다음과 같은 작업을 수행할 수 있습니다:

- `Ctrl-N` / `Ctrl-P`: 파일 목록을 위/아래로 이동합니다.
- 커서 위치 파일 스테이징/스테이징 해제: `-`
- 커서 위치 파일 스테이징: `s`
- 커서 위치 파일 스테이징 해제: `u`
- 커서 위치 파일 인라인 차이 표시/숨기기: `>` / `<`

자세한 내용은 `:h fugitive-staging-maps`를 참조합니다.


## Git Blame
현재 파일에서 `:Git blame` 명령을 실행하면 vim-fugitive가 분할된 blame 창을 표시합니다. 이 기능은 버그가 있는 코드 줄을 작성한 사람을 찾아내어 그에게 화를 내는 데 유용할 수 있습니다. (농담입니다.)

`“git blame”` 모드에서 수행할 수 있는 작업:

- `q`: blame 창 닫기
- `A`: 작성자 열 크기 조정
- `C`: 커밋 열 크기 조정
- `D`: 날짜/시간 열 크기 조정

자세한 내용은 `:h :Git_blame` 을 참조합니다.


## Gdiffsplit
`:Gdiffsplit` 명령을 실행하면 vim-fugitive는 현재 파일의 최신 변경 사항을 인덱스 또는 작업 트리와 비교해서 `vimdiff` 를 실행합니다. `:Gdiffsplit <commit>` 을 실행하면 vim-fugitive는 `<commit>` 내부의 해당 파일을 대상으로 `vimdiff` 를 실행합니다.

현재 `vimdiff` 모드에 있으므로, `:diffput` 및 `:diffget` 명령으로 diff를 **적용**하거나 **취소**할 수 있습니다.


## Gwrite and Gread
파일에서 변경 후 `:Gwrite` 명령을 실행하면 vim-fugitive가 변경 사항을 스테이징합니다. 이는 `git add <현재 파일>`을 실행하는 것과 유사합니다.

파일에서 변경 후 `:Gread` 명령을 실행하면 vim-fugitive가 파일을 변경 전 상태로 복원합니다. 이는 `git checkout <현재 파일>` 을 실행하는 것과 유사합니다. `:Gread` 실행의 장점 중 하나는 이 작업은 실행 취소 가능하다는 점입니다. `:Gread` 실행 후 마음이 바뀌어 이전 변경 사항을 유지하려면, 단순히 실행 취소(`u`)를 실행하면 Vim이 `:Gread` 작업을 취소합니다. CLI에서 `git checkout <current-file>`을 실행했다면 이는 불가능했을 것입니다.


## Gclog
`:Gclog` 명령을 실행하면 vim-fugitive가 커밋 기록을 표시합니다. 이는 `git log` 명령을 실행하는 것과 유사합니다. vim-fugitive는 이를 위해 Vim의 퀵픽스(quickfix)를 사용하므로, `:cnext` 및 `:cprevious` 를 사용해서 다음 또는 이전 로그 정보로 이동할 수 있습니다. `:copen` 과 `:cclose` 로 로그 목록을 열고 닫을 수 있습니다.

`“git log”` 모드는 두 가지 작업을 수행할 수 있습니다:

- 트리 보기
- 부모(이전 커밋) 방문

`:Gclog` 명령어도 `git log` 명령어와 마찬가지로 인수를 전달할 수 있습니다. 프로젝트의 커밋 기록이 길고 최근 세 개의 커밋만 확인한다면 `:Gclog -3` 을 실행합니다. 커밋 날짜 기준으로 필터링한다면 `:Gclog --after=“1월 1일” --before=“3월 14일”` 같이 실행할 수 있습니다.


## More Vim-fugitive
이것들은 vim-fugitive가 할 수 있는 일의 일부 예일 뿐입니다. vim-fugitive에 대해 좀 더 알고 싶다면 `:h fugitive.txt` 를 확인합니다. 대부분 인기 있는 git 명령어는 아마도 vim-fugitive로 최적화되어 있습니다. 문서에서 찾아보기만 하면 됩니다.

vim-fugitive의 “특수 모드” (예: `:Git` 또는 `:Git blame` 모드) 내에서 사용 가능한 단축키를 확인하려면 `g?` 를 누릅니다. vim-fugitive가 현재 모드에 맞는 `:help` 창을 표시해 줍니다. 참 편리하죠!


## Learn Vim and Git the Smart Way
vim-fugitive가 여러분의 작업 흐름에 좋은 보완이 될 수도 있고 아닐 수도 있습니다. 어쨌든, 위에 나열된 모든 플러그인을 꼭 확인해 보시길 강력히 권합니다. 제가 언급하지 않은 다른 플러그인도 있습니다. 직접 사용해 보시기 바랍니다.

Vim-git 통합을 좀 더 잘 활용하는 한 가지 확실한 방법은 git에 대해 더 많이 공부하는 것입니다. git 자체만 해도 방대한 주제이며, 저는 그 일부만 보여드렸을 뿐입니다. 그럼 이제 **git을 시작해 보겠습니다** (말장난은 양해 부탁드립니다.) 

다음으로 Vim을 사용해서 코드를 컴파일하는 방법에 대해 이야기해 보겠습니다!


## Link
- Prev [Ch17. Fold](./ch17_fold.md)
- Next [Ch19. Compile](./ch19_compile.md)
