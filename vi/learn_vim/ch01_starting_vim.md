# Ch01. Starting Vim
이 장은 터미널에서 Vim을 시작하는 다양한 방법을 배웁니다. 본 가이드를 작성할 당시 저는 Vim 8.2를 사용했습니다. Neovim이나 더 오래된 버전의 Vim을 사용하더라도 대부분 문제없이 사용할 수 있지만, 일부 명령어는 "지원되지 않을 수 있다" 는 점을 유의합니다.


## Installing
특정 컴퓨터에 Vim을 설치하는 방법에 대한 자세한 설명은 생략하겠습니다. 다행히 대부분의 유닉스 기반 컴퓨터는 Vim이 이미 설치되어 있습니다. 그렇지 않다면 대부분의 배포판에는 Vim 설치 방법이 안내되어 있습니다.

Vim 설치 과정에 대한 자세한 정보를 확인하려면 공식 다운로드 웹사이트나 공식 GitHub 저장소를 방문합니다:

- [Vim website](https://www.vim.org/download.php)
- [Vim github](https://github.com/vim/vim)


## The Vim Command
이제 Vim을 설치했으니 터미널에서 다음 명령을 실행합니다:

```bash
vim
```

시작 화면이 표시됩니다. 여기서 새 파일을 작업하게 됩니다. 대부분의 텍스트 편집기나 IDE와 달리 Vim은 "모드 기반 편집기" 입니다. “hello” 를 입력하려면 `i` 로 삽입 모드로 전환해야 합니다. `ihello<Esc>` 를 입력해서 “hello” 텍스트를 삽입합니다.


## Exiting Vim
Vim을 종료하는 방법에는 여러 가지가 있습니다. 가장 일반적인 방법은 다음과 같이 입력하는 것입니다:

```
:quit
```

간단히 `:q` 를 입력할 수 있습니다. 이 명령은 명령줄 모드(Vim의 또 다른 모드)용 명령입니다. 일반 모드에서 `:` 을 입력하면 커서는 화면 하단으로 이동하며, 여기서 몇 가지 명령을 입력할 수 있습니다. 명령줄 모드는 15장에서 자세히 배우게 됩니다. 삽입 모드에서 `:` 을 입력하면 화면에 “:” 문자가 그대로 출력됩니다. 이 경우 다시 일반 모드로 전환해야 합니다. `<Esc>`를 입력해서 일반 모드로 전환합니다. 참고로 명령줄 모드도 `<Esc>` 를 눌러 일반 모드로 돌아갈 수 있습니다. 여러 Vim 모드에서 `<Esc>` 를 눌러 일반 모드로 “탈출” 할 수 있다는 점을 알게 됩니다.


## Saving a File
변경 사항을 저장하려면 다음을 입력합니다:

```
:write
```

간단히 `:w` 를 입력해도 됩니다. 새 파일인 경우 저장하기 전에 이름을 지정해야 합니다. `file.txt` 라고 이름 지어 보겠습니다. 다음을 실행합니다:

```
:w file.txt
```

저장하고 종료하려면 `:w` 와 `:q` 명령을 결합할 수 있습니다:

```
:wq
```

변경 사항을 저장하지 않고 종료하려면 `:q` 뒤에 `!` 를 추가해서 강제 종료합니다:

```
:q!
```

Vim을 종료하는 다른 방법도 있지만, 이 방법들이 일상적으로 자주 사용할 방법입니다.


## Help
이 가이드 전반에 걸쳐 다양한 Vim 도움말 페이지를 참조합니다. 도움말 페이지는 `:help {명령어}`(줄여서 `:h`)를 입력해서 열 수 있습니다. `:h` 명령어는 주제나 명령어 이름을 인수로 전달할 수 있습니다. 예를 들어, Vim을 종료하는 다양한 방법을 알아보려면 다음을 입력합니다:

```
:h write-quit
```

어떻게 “write-quit” 을 검색할지 알았을까요? 사실 몰랐습니다. 그냥 `:h` 를 입력한 다음 “quit” 을 입력하고 `<Tab>` 을 눌렀을 뿐입니다. Vim이 관련 키워드를 선택할 수 있게 표시했습니다. 뭔가를 찾아봐야 할 때(“Vim으로 이런 걸 할 수 있으면 좋겠는데...”)는 그냥 `:h` 를 입력하고 키워드를 몇 개 입력한 다음 `<Tab>` 을 누릅니다.


## Opening a File
터미널에서 Vim으로 파일(`hello1.txt`)을 열려면 다음 명령을 실행합니다:

```bash
vim hello1.txt
```

여러 파일을 한 번에 열 수도 있습니다:

```bash
vim hello1.txt hello2.txt hello3.txt
```

Vim은 `hello1.txt`, `hello2.txt`, `hello3.txt`를 각각 별도의 버퍼로 엽니다. 버퍼는 다음 장에서 배웁니다.


## Arguments
`vim` 터미널 명령어는 다양한 플래그와 옵션과 함께 전달할 수 있습니다.

현재 Vim 버전을 확인하려면 다음을 실행합니다:

```bash
vim --version
```

이 명령은 현재 Vim 버전과 사용 가능한 모든 기능을 표시하며, 각 기능 앞에는 `+` 또는 `-` 기호가 붙습니다. 본 가이드의 일부 기능은 특정 기능이 활성화되어야 사용 가능합니다. 예를 들어, 후반부 장에는 `:history` 명령어를 사용해서 Vim의 명령줄 기록을 살펴봅니다. 이 명령이 작동하려면 설치된 Vim에 `+cmdline_history` 기능이 포함되어야 합니다. 특히 인기 있는 다운로드 소스에서 설치한 경우, 설치된 Vim에 필요한 기능이 모두 포함되어 있을 가능성이 높습니다.

터미널에서 수행하는 많은 작업은 Vim 내부에서도 가능합니다. Vim **내부**  에서 버전을 확인하려면 다음을 실행합니다: 

```
:version
```

`hello.txt` 파일을 열고 즉시 Vim 명령어를 실행하려면 `vim` 명령어에 `+{cmd}` 옵션을 전달할 수 있습니다.

Vim은 `:s` 명령어(`:substitute` 의 약어)로 문자열을 대체할 수 있습니다. `hello.txt` 파일을 열고 “pancake” 가 나오는 모든 부분을 “bagel” 로 대체하려면 다음을 실행합니다:

```bash
vim +%s/pancake/bagel/g hello.txt
```

다음 Vim 명령어들은 중첩할 수 있습니다:


```bash
vim +%s/pancake/bagel/g +%s/bagel/egg/g +%s/egg/donut/g hello.txt
```

Vim은 다음과 같이 처리합니다:

1. “pancake” 를 모두 “bagel” 로 대체합니다.
2. 그런 다음 “bagel” 을 “egg” 로 대체합니다.
3. 그런 다음 “egg” 를 “donut” 로 대체합니다.

대체 기능은 후속 장에서 배웁니다.

`+` 구문 대신 `-c` 옵션 뒤에 Vim 명령어를 전달할 수도 있습니다:

```bash
vim -c %s/pancake/bagel/g hello.txt
vim -c %s/pancake/bagel/g -c %s/bagel/egg/g -c %s/egg/donut/g hello.txt
```


## Opening Multiple Windows
Vim을 가로 및 세로 분할 창으로 실행하려면 각각 `-o` 및 `-O` 옵션을 사용합니다.

Vim을 가로로 2개 창으로 열려면 다음을 실행합니다:

```bash
vim -o2
```

5개의 가로 창으로 Vim을 열려면 다음을 실행합니다:

```bash
vim -o5
```

5개의 가로 창으로 Vim을 열고 첫 두 창에 `hello1.txt` 와 `hello2.txt` 를 채우려면 다음을 실행합니다:

```bash
vim -o5 hello1.txt hello2.txt
```

Vim을 2개의 세로 창, 5개의 세로 창, 그리고 `hello1.txt` 와 `hello2.txt` 두 파일을 포함한 5개의 세로 창으로 열려면 다음을 실행합니다:

```bash
vim -O2
vim -O5
vim -O5 hello1.txt hello2.txt
```


## Suspending
편집 중 Vim을 일시 중지할 경우 `Ctrl-z` 를 누를 수 있습니다. `:stop` 또는 `:suspend` 명령을 실행해도 됩니다. 일시 중지된 Vim으로 돌아가려면 터미널에서 `fg` 를 실행합니다.


## Starting Vim the Smart Way
`vim` 명령어는 다른 터미널 명령어와 마찬가지로 다양한 옵션을 사용할 수 있습니다. 두 가지 옵션(`+{cmd}` 및 `-c cmd`)을 통해 Vim 명령줄 모드 명령을 매개변수로 전달할 수 있습니다. 본 가이드를 통해 더 많은 명령어를 익히면서 Vim 시작 시 해당 명령어를 실행합니다. 또한, 터미널 명령어인 `vim` 은 다른 많은 터미널 명령어와 결합할 수 있습니다. 예를 들어, `ls -l | vim -` 명령을 사용하면 `ls` 명령의 출력을 Vim으로 리디렉션해서 편집할 수 있습니다.

터미널에서 `vim` 명령에 대해 자세히 알아보려면 `man vim` 을 참조합니다. Vim 편집기에 대해 더 알고 싶다면 본 가이드를 계속 읽고 `:help` 명령을 사용합니다 .

## Link
- Prev [Ch00. Read This First](./ch00_read_this_first.md)
- Next [Ch02. Buffers, Windows, and Tabs](./ch02_buffers_windows_tabs.md)
