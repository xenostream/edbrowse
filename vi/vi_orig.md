# An Introduction to Display Editing with Vi

- William Joy
- Mark Horton

```
Computer Science Division
Department of Electrical Engineering and Computer Science
University of California, Berkeley
Berkeley, Ca. 94720

With Annotations by Gunnar Ritter
Freiburg i. Br., Germany
3/3/02
```

## ABSTRACT
  Vi(visual)은 화면 기반의 대화형 텍스트 편집기입니다. vi를 사용할 때 터미널 화면은 편집 중인 파일의 창 역할을 합니다. 파일에 가한 변경 사항은 화면에 바로 반영됩니다.
  
  vi를 사용하면 파일 내 어디든 쉽게 텍스트를 삽입할 수 있습니다. vi 대부분의 명령은 파일 내에서 커서를 이동시킵니다. 커서를 문자, 단어, 문장, 단락 단위로 앞뒤로 이동시키는 명령이 있습니다. 삭제(`d`)나 변경(`c`) 같은 명령을 커서 이동 명령과 결합하면 단어 삭제나 단락 변경 같은 작업을 간단하고 자연스럽게 수행할 수 있습니다. 이러한 규칙성과 명령을 키에 할당한 기억법 덕분에 편집기 명령 집합은 기억하고 사용하기 쉽습니다.
  
  Vi는 다양한 디스플레이 터미널에서 작동하며, 터미널 설명 파일을 편집하면 새로운 터미널도 쉽게 구동할 수 있습니다. 디스플레이에서 로컬로 줄과 문자를 삽입 및 삭제할 수 있는 지능형 터미널을 사용하는 것이 유리하지만, 느린 전화 회선을 통한 더미 터미널에서도 편집기는 상당히 잘 작동합니다. 편집기는 이러한 상황의 낮은 대역폭까지 고려해서 보다 작은 창 크기와 디스플레이 업데이트 알고리즘을 사용해서 제한된 속도를 최대한 활용합니다.
  
  하드카피 터미널, 스토리지 튜브 및 "유리 터미널" 에서도 한 줄 편집 창을 통해서 vi의 명령 세트를 사용할 수 있습니다. 따라서, vi의 명령 세트는 모든 터미널에서 이용 가능합니다. 보다 전통적인 줄 단위 편집기인 `ex` 의 전체 명령 세트는 vi 내에서도 사용할 수 있으며, 두 편집 모드 간 전환은 매우 간단합니다.
  
  본 문서가 최초 작성된 지 20년 넘은 시점에 vi 소개 자료의 실용성을 유지하도록 이번 판에서는 환경 변화나 편집기의 변화를 반영한 주석을 일부 첨가했습니다.


```
Table of Contents
1. Getting started
1.1. Specifying terminal type
1.2. Editing a file
1.3. The editor's copy: the buffer
1.4. Notational conventions
1.5. Arrow keys
1.6. Special characters: ESC, CR and DEL
1.7. Getting out of the editor
2. Moving around in the file
2.1. Scrolling and paging
2.2. Searching, goto, and previous context
2.3. Moving around on the screen
2.4. Moving within a line
2.5. Summary
2.6. View
3. Making simple changes
3.1. Inserting
3.2. Making small corrections
3.3. More corrections: operators
3.4. Operating on lines
3.5. Undoing
3.6. Summary
4. Moving about; rearranging and duplicating text
4.1. Low level character motions
4.2. Higher level text objects
4.3. Rearranging and duplicating text
4.4. Summary
5. High level commands
5.1. Writing, quitting, editing new files
5.2. Escaping to a shell
5.3. Marking and returning
5.4. Adjusting the screen
6. Special topics
6.1. Editing on slow terminals
6.2. Options, set, and editor startup files
6.3. Recovering lost lines
6.4. Recovering lost files
6.5. Continuous text input
6.6. Features for editing programs
6.7. Filtering portions of the buffer
6.8. Commands for editing LISP
6.9. Macros
6.10 Word Abbreviations
6.11 Abbreviations
7. Nitty-gritty details
7.1. Line representation in the display
7.2. Counts
7.3. More file manipulation commands
7.4. More about searching for strings
7.5. More about input mode
7.6. Upper case only terminals
7.7. Vi and ex
7.8. Open mode: vi on hardcopy terminals and “glass tty's”
```

- Footnotes

- Quick Reference Card

참고: 원문은 여덟 개 섹션으로 설명합니다. 이것은 명백한 오류이므로 이번 판에서 수정했습니다. 4.0 BSD에서 ‘단어 약어’ 섹션이 기존 ‘매크로’ 및 ‘약어’ 하위 섹션 사이에 도입될 때, `.NH 2` 매크로 대신 `.NH` 매크로로 표기되었습니다. 그러나, `troff -ms` 에서 `.NH` 는 `.NH 1` 과 동일한 의미인 “번호가 매겨진 최상위 섹션 시작” 을 의미합니다. 따라서, 단어 약어 섹션은 출력물에서 일곱 번째 섹션이 되었고, 세부 사항은 여덟 번째 섹션이 되면서 기존 일곱 번째 섹션에 대한 모든 참조가 깨지게 되었습니다.



# Getting started
이 문서는 vi 편집기에 대한 간략한 소개를 제공합니다. (발음은 '비-아이' 입니다.) 이 문서를 읽는 동안 익숙한 파일로 vi를 실행 중이어야 합니다. 본 문서의 첫 부분(1\~5절)에서는 vi 사용의 기본적인 사항을 설명합니다. 특히 주목할 만한 몇 가지 주제는 6장에서 다루며, 편집기 기능의 세부적인 작동 방식에 관한 내용은 설명을 복잡하게 하지 않기 위해 7장으로 미뤘습니다.

본 문서에는 짧은 부록이 포함되어 있으며, 각 문자가 vi에서 가지는 특수한 의미를 설명합니다. (참고: 이 내용은 vi(1) 매뉴얼 페이지로 이동되었습니다.) 본 문서에는 빠른 참조 카드도 첨부되어 있습니다. 이 카드는 vi의 명령을 매우 간결한 형식으로 요약합니다. vi 편집기를 배울 동안 이 카드는 항상 가까이 두시기 바랍니다.


## Specifying terminal type
  Before you can start vi you must tell the system what kind of terminal you are using. Note: There might be a predefined setting. Try this by typing the following command:

우선, vi 편집기를 시작하기 전에 현재 사용 중인 "터미널 유형" 을 시스템에 알려야 합니다. 

> [!NOTE]
> 참고: 미리 정의된 설정이 있을 수 있습니다.

다음과 같은 명령을 입력해서 확인합니다:

```
% echo $TERM
xterm
```

위와 같이 단일 단어가 출력되면 별다른 변경 없이 계속 진행하면 됩니다. 그러나, "TERM: 정의되지 않은 변수" 같은 메시지가 표시되거나 출력이 전혀 없는 경우는 현재 사용 중인 터미널 유형을 확인해야 합니다.
  
다음은(필연적으로 불완전한...) 터미널 유형 코드 목록입니다. 사용 중인 터미널이 여기 없다면 시스템 담당자에게 문의해서 터미널 코드를 확인해야 합니다. 터미널에 코드가 할당되지 않은 경우 코드를 지정하고 터미널에 대한 설명을 추가할 수 있습니다.

| Code   | Full name                      | Type        |
|--------|--------------------------------|-------------|
| 2621   | Hewlett-Packard 2621A/P        | Intelligent |
| 2645   | Hewlett-Packard 264x           | Intelligent |
| act4   | Microterm ACT-IV               | Dumb        |
| act5   | Microterm ACT-V                | Dumb        |
| adm3a  | Lear Siegler ADM-3a            | Dumb        |
| adm31  | Lear Siegler ADM-31            | Intelligent |
| c100   | Human Design Concept 100       | Intelligent |
| dm1520 | Datamedia 1520                 | Dumb        |
| dm2500 | Datamedia 2500                 | Intelligent |
| dm3025 | Datamedia 3025                 | Intelligent |
| fox    | Perkin-Elmer Fox               | Dumb        |
| h1500  | Hazeltine 1500                 | Intelligent |
| h19    | Heathkit h19                   | Intelligent |
| i100   | Infoton 100                    | Intelligent |
| mime   | Imitating a smart act4         | Intelligent |
| t1061  | Teleray 1061                   | Intelligent |
| vt52   | Dec VT-52                      | Dumb        |

예를 들어, Hewlett-Packard HP2621A 터미널을 가지고 있다고 가정합니다. 이 터미널이 시스템에 사용하는 코드는 '2621' 입니다. 이 경우, 시스템에 터미널 종류를 알려주기 위해 다음과 같은 명령을 사용할 수 있습니다.

```
% setenv TERM 2621
```

이 명령은 csh 셸에서 작동합니다. 만약, 표준 Bourne 셸인 `sh` 를 사용한다면 다음 명령을 입력합니다.

```
$ TERM=2621
$ export TERM
```

로그인할 때 터미널 종류를 자동으로 설정하려면 다음과 같이 처리합니다. 예를 들어, mime 을 통해 접속하는 하드와이어드 포트를 사용한다면, .login (당신이 csh를 사용하는 경우) 파일에 넣을 수 있는 일반적인 한 줄은 다음과 같습니다.

```
% setenv TERM `tset - -d mime`
```

또는, .profile 파일에 다음과 같이 입력할 수 있습니다. (sh를 사용한다면) 

```
$ TERM=`tset - -d mime`
```

`tset` 포로그램은 터미널이 어떤 포트에 하드와이어되어 있는지 알고 있으며, 접속할 때는 mime을 사용한다는 것만 알려주면 됩니다. 일반적으로 `tset` 프로그램은 erase 와 kill 문자를 변경할 때도 사용합니다.



## Editing a file
시스템에 현재 사용하는 터미널 종류를 알린 후, 파일 복사본을 만들고 vi 편집기를 실행하려면 다음과 같은 명령을 입력합니다.

```
% vi name
```

replacing name with the name of the copy file you just created. The screen should clear and the text of your file should appear on the screen. If something else happens refer to the footnote 1-1.

name 은 편집하기 원하는 파일 이름으로 바꿉니다. 화면이 지워지고 파일에 포함된 텍스트가 화면에 나타납니다. 만약 다른 일이 발생한다면 각주 [^1-1]을 참고하시기 바랍니다.

[^1-1]: 시스템에 잘못된 터미널 유형 코드를 지정하면, 편집기 화면을 엉망으로 만들 수 있습니다. 특정 터미널에 맞는 제어 코드를 다른 종류의 터미널로 보낼 경우 발생합니다.  
이 경우 `:q` (콜론과 q 키)를 입력한 뒤, **RETURN** 키를 눌러서 종료해서 시스템 쉘로 돌아갈 수 있습니다. 무엇이 잘못된건지 확인하고(필요하면 다른 사람에게 물어보고) 다시 시도하시기 바랍니다. 또 다른 문제는 잘못된 파일 이름을 입력해서 편집기가 오류 진단을 출력할 경우입니다. 이 경우, 앞에서 설명한 절차에 따라 편집기를 종료한 뒤, 파일 이름을 올바르게 입력해서 다시 시도해야 합니다. vi 편집기가 입력한 명령에 반응하지 않는다면, 터미널에 `DEL` 키나 `RUB` 키를 눌러 인터럽트를 보낸 뒤, `:q` 명령을 다시 입력한 후 캐리지 리턴(`Enter`) 키를 누릅니다.

## The editor's copy: the buffer
vi 편집기는 현재 편집하는 파일을 직접 수정하지 않습니다!! 

대신, 편집기는 파일의 복사본을 "버퍼" 라 불리는 메모리 내부의 임시 저장소에 만들고, 파일 이름을 기억합니다. 변경한 내용을 원래 파일에 다시 기록하지 않는 한, 파일의 내용에 영향을 주지 않습니다.


## Notational conventions
본 문서에서는 사용자가 입력할 내용은 **굵은 글씨체** 로 제공합니다. 적절한 입력으로 대체할 텍스트는 *이탤릭체* 로 제공합니다. 특수 문자는 작은 대문자로 표시합니다.


## Arrow keys
편집기의 "명령 집합" 은 현재 사용하는 터미널과 독립적입니다. 커서 이동 키가 장착된 터미널은 vi 편집기에서도 그대로 작동합니다. 만약, 커서 이동 키가 없거나, 있다하더라도, `h`, `j`, `k`, `l` 키를 사용해서 커서 이동 키로 사용할 수 있습니다. (이 키들은 adm3a 터미널에서는 화살표로 표시되어 있습니다.) (각주 [^1-2])

[^1-2]: 나중에 보겠지만, `h` 키는 왼쪽으로 이동하며(백스페이스인 `control-h` 처럼), `j` 키는 아래로(같은 열에서), `k` 키는 위로(같은 열에서), `l` 키는 오른쪽으로 이동합니다.

> [!INFO] HP2621 터미널 주의 사항: 이 터미널은 기능 키를 전송하기 위해 반드시 `Shift` 키를 눌러야 합니다. 그렇지 않으면 기능 키는 로컬로만 작동합니다. `Shift` 키 없이 사용하면 커서는 잘못된 위치에 놓이게 됩니다다.


## Special characters: ESC, CR and DEL
특수 키 몇 가지는 매우 중요하므로, 지금 설명합니다. 

키보드에서 `ESC` 또는 `ALT` 라고 표시된 키를 찾습니다. 주로 터미널 왼쪽 위에 있습니다. 이 키를 몇 번 눌러보시기 바랍니다. 편집기는 **명령 모드에 있다** 는 것을 알리는 벨을 울립니다. (각주 [^1-3]). 

[^1-3]: 가능한 경우, 스마트 터미널은 벨소리를 울리는 대신 화면을 조용히 깜박입니다.

불완전하게 입력한 명령을 `ESC` 키로 취소할 수 있으며, 파일에 텍스트를 입력할 때도 `ESC` 키로 텍스트 삽입을 끝냅니다. 이 키는 언제 눌러도 무해하므로, 편집기에서 무슨 일이 일어나고 있는지 모를 때는 그냥 `ESC` 키를 눌러 편집기가 벨소리나 화면을 깜빡일 때까지 기다려도 됩니다.

`CR` 또는 `RETURN` 키는 명령을 종료하는 데 사용되므로 매우 중요합니다. 보통의 경우 이 키는 키보드 오른쪽에 위치하며, 시스템 쉘 명령에서 사용하는 것과 동일한 명령입니다다.

  Another very useful key is the DEL or RUB key, which generates an interrupt, telling the editor to stop what it is doing. It is a forceful way of making the editor listen to you, or to return it to the quiescent state if you don't know or don't like what is going on. Try hitting the '/' key on your terminal. This key is used when you want to specify a string to be searched for. The cursor should now be positioned at the bottom line of the terminal after a '/' printed as a prompt. You can get the cursor back to the current position by hitting the DEL or RUB key; try this now (footnote 1-4). From now on we will simply refer to hitting the DEL or RUB key as “sending an interrupt” (footnote 1-5).

또 하나 유용한 키는 `DEL` 또는 `RUB` 키인데, 이 키는 인터럽트를 생성해서 편집기에게 현재 수행 중인 작업을 중지하라고 알립니다. 이것은 편집기로 하여금 말을 잘듣게 하거나, 무슨 일이 일어나는지 모른다거나 마음에 들지 않을 때, 명령 모드로 되돌리는 강력한 방법입니다. 

터미널에서 '/' 키를 눌러보시기 바랍니다. 이 키는 검색할 문자열을 지정할 때 사용됩니다. 입력 커서는 '/' 문자가 프롬프트로 출력된 후 터미널의 맨 아래 줄에 위치합니다. 이 상태에서 `DEL` 또는 `RUB` 키를 누르면 커서를 현재 위치로 되돌릴 수 있습니다. 지금 바로 이 기능을 시도해 보시기 바랍니다. (각주 [^1-4])

[^1-4]: `/` 검색 명령에 백스페이스 키를 누르면 검색을 취소합니다. 참고: 편집기 화면 하단에 `No previous regular expression` 을 출력하면, 터미널의 **DEL** 키는 삭제 문자 `^?` 를 보내는 것이 아니라, `ESC` 로 시작하는 문자 시퀀스를 보내는 것입니다. 이 경우 인터럽트 기능은 보통 `^C` 에 할당되어 있습니다. (표기법은 2.1절 참조) 적절한 키나 키 시퀀스를 찾을 수 없다면, 시스템 쉘에 다음과 같이 입력합니다. `% stty -a` intr 뒤에 나오는 문자열을 확인합니다. 

지금부터 `DEL` 또는 `RUB` 키를 누르는 것을 단순히 “인터럽트를 보낸다” 고 부르겠습니다. (각주 [^1-5])

[^1-5]: 일부 시스템에서 인터럽트 기능은 대가를 수반합니다. 즉, 입력 커서가 맨 아래 줄에 있을 때, 편집기가 현재 계산 중이라면 입력할 수 없습니다.
 
편집기는 종종 터미널 마지막 줄에 입력한 명령을 에코합니다. 만약, 입력 커서가 마지막 줄 첫 번째 위치에 없다면, 편집기는 현재 검색 명령 처리 중에 파일 내의 새로운 위치를 계산하거나 버퍼의 일부를 다시 포맷하는 등의 계산 작업을 수행 중인 것입니다. 이러한 일이 발생하면 인터럽트 키를 보내서 편집기를 중지시킬 수 있습니다.




## Getting out of the editor
이 입문서로 한동안 작업한 후, 다른 시스템 업무를 처리하려면, 편집기에 `ZZ` 명령을 입력할 수 있습니다. 이 명령은 편집기 버퍼의 내용을, 변경한 경우에 한해, 편집 중인 파일에 다시 기록한 후 편집기를 종료합니다. 또한 `:q!CR` 명령을 입력해서 편집기 세션을 강제 종료할 수 있습니다. (각주 [^1-6]) 

[^1-6]: 마지막 표시 줄에 입력받는 모든 명령은 `CR` 뿐만 아니라 `ESC` 키로 종료할 수 있습니다.

이 명령은 매우 위험하지만 때때로 "필수적인 명령" 으로, 편집기 세션을 강제 종료하고 모든 변경 사항을 폐기할 수 있습니다. 단지 파일을 보기만 할 경우나 편집기의 복사본 파일을 변경한 경우라면 이 명령은 반드시 알아둬야 합니다. 변경한 내용을 정말 저장해야 할 때 이 명령을 입력하지 않도록 주의해야 합니다.




# Moving around in the file
## Scrolling and paging
편집기에는 파일 내에서 입력 커서를 이동하기 위한 여러 명령들이 있습니다. 이 중에서 가장 유용한 것은 `Control` 키와 `D` 키를 동시에 눌러 생성하는 `Control-D` 또는 '^D' 라 표시된 키입니다. 이 `^` 컨트롤키는 본 문서에서는 '↑' 로 표시하며, '^' 표시는 오직 '^x' 형식의 제어 문자 표시에서만 사용됩니다. (각주 [^2-1]).

[^2-1]: 터미널에 `^` 키가 없다면, `↑` 라 표시된 키가 있을 수 있습니다. 어떤 경우든 이 두 문자는 동일합니다. 참고: 일부 웹 브라우저는 위쪽 화살표 문자를 표시할 수 없어서 `&uarr;` 로 표시하기도 합니다. 이것은 uparrow 로 읽으면 됩니다. 여기서 말하는 uparrow 는 커서 키패드에 있는 화살표 키가 아니라, 캐럿(caret) 또는 서컴플렉스(circumflex) 문자를 나타내는 아주 오래된 표기법입니다.

이미 알겠지만, `^D` 키를 누르면 파일을 아래로 스크롤합니다. 따라서, D 문자는 down(아래)을 의미합니다. 많은 편집기 명령은 연상되는 기호 문자로 구성되므로 기억하기 훨씬 쉽습니다. 예를 들어, 위로 스크롤하는 명령은 `^U` 입니다. 단순한 더미 터미널은 위로 스크롤할 수 없는데, 이 경우 `^U` 를 누르면 화면은 지워지고 파일에서 더 앞쪽에 있는 줄이 맨 위에 오도록 새로 고침됩니다.

현재 위치 아래쪽의 파일 내용을 좀 더 보고 싶다면, `^E` 키를 눌러 화면 하단에 한 줄을 추가로 표시하며, 커서는 제자리에 그대로 남습니다. `^Y` 명령은(기억하기 어려운 이름이지만 키보드에 `^U` 옆에 있음) 화면 상단에 한 줄을 더 표시합니다.

파일 내에서 입력 커서를 이동하는 다른 방법들도 있습니다; `^F` 와 `^B` 키는 한 페이지 앞이나 뒤로 이동하며 만약, 페이지 연속성을 유지하려면 `^D` 와 `^U` 대신 이 키를 사용해서 파일을 읽어 내려갈 수 있습니다.

스크롤과 페이지 이동의 차이점을 알아야 합니다. 파일의 텍스트를 읽을 때, `^F` 를 눌러 한 페이지 앞으로 이동한다면 되돌아볼 수 있는 문맥은 거의 남지 않습니다. 반면 스크롤은 보다 많은 문맥을 화면에 남기며, 좀 더 부드럽게 진행됩니다. 따라서, 스크롤이 진행되는 동안 텍스트를 계속해서 읽을 수 있습니다.



## Searching, goto, and previous context
파일 내에서 입력 위치를 지정하는 또 다른 방법은 편집기에 검색할 문자열을 제공하는 것입니다. `/` 문자를 입력한 다음, 검색할 문자열을 입력하고 `CR` 로 종료합니다. 편집기는 이 문자열의 다음 번 발생 위치에 입력 커서를 놓습니다. 그런 다음, `n` 키를 눌러 이 문자열의 다음 번 발생 위치로 이동할 수 있습니다. `?` 문자는 현재 위치에서 뒤쪽으로 검색하며, 그 외에는 `/` 문자와 같습니다. (각주 [^2-2])

[^2-2]: 이런 검색은 보통 파일의 끝에서 처음으로 돌아가면서 수행되므로, 검색 방향에 해당하는 문자열이 없더라도 파일 어딘가에만 있다면 문자열을 찾습니다. 검색에서 이와 같은 래핑 기능을 비활성화하려면 `:se nowrapscanCR` 명령을 사용하거나, 좀 더 간단히 `:se nowsCR` 을 입력합니다.

편집기에 제공한 검색 문자열이 파일에 존재하지 않는다면, 편집기는 화면의 마지막 줄에 진단 메시지를 출력하고, 입력 커서는 원래 위치로 되돌아갑니다.

검색 문자열이 줄 시작에서 일치하길 원한다면, 검색 문자열을 `↑` 문자로 시작합니다. 줄 끝에서만 일치하길 원한다면, 검색 문자열을 `$` 문자로 끝냅니다. 따라서, `/↑searchCR` 은 줄 시작에서 search 라는 단어를 검색하고, `/last$CR` 은 줄의 끝에서 last 라는 단어를 검색합니다. (각주 [^2-3])

[^2-3]: 사실,검색할 문자열은 ex(1) 와 ed(1) 편집기에서 사용하는 정규 표현식이 될 수 있습니다. 아직 이런 기능을 배우지 않았다면 `:se nomagicCR` 명령으로 이 기능을 비활성화할 수 있습니다. 또한, 이 명령을 환경 변수 `EXINIT` 에 넣어두면 항상 적용됩니다. (`EXINIT` 환경 변수에 대해서는 뒤에서 설명합니다.)

`G` 명령은 숫자가 앞에 붙으면 파일 내의 해당 줄로 커서를 위치시킵니다. 따라서, `1G` 는 커서를 파일 내의 첫 번째 줄로 이동시킵니다. `G` 에 숫자를 주지 않으면 파일 끝으로 이동합니다.

파일의 끝 근처에 있고 마지막 줄이 화면의 맨 아래에 있지 않다면, 편집기는 남은 줄에 '~' 문자를 표시하고 이 줄은 파일의 끝을 지난 부분을 의미합니다.

현재 편집 중인 파일에 대한 상태를 알아보려면 `^G` 를 입력합니다. 편집기는 편집 중인 "파일의 이름", "현재 줄 번호", "버퍼에 있는 전체 줄 수" 그리고 버퍼에서 어느 정도 진행된지를 보여줍니다. 지금 바로 이 기능을 시도해보고, 현재 줄 번호를 기억합니다. `G` 명령을 입력해서 파일 끝으로 이동한 다음, 다시 `G` 명령을 입력해서 원래 위치로 돌아올 수 있습니다.

\`\` (백쿼트 두 개) 명령을 사용해서 이전 위치로 돌아갈 수도 있습니다. 이 명령은 사전 준비가 필요 없기 때문에 `G` 명령 보다 편리한 경우가 많습니다. `G` 명령이나 `/` 또는 `?` 문자를 사용한 검색 작업을 수행한 다음, \`\` 를 입력해서 원래 있던 이전 위치로 돌아갑니다. 만약, `n` 명령이나 관심 있는 문맥에서 멀리 이동시키는 다른 명령을 실수로 입력했다면, \`\` 를 눌러서 빠르게 돌아갈 수 있습니다.


## Moving around on the screen
이제 화면에서 커서를 움직여 보겠습니다. 터미널에 화살표 키(각 방향으로 표시된 4개 또는 5개의 키)가 있다면 직접 눌러보고 제대로 작동하는지 확인합니다. 작동하는 화살표 키가 없다면, 항상 `h, j, k, l`  키를 사용할 수 있다. vi의 숙련된 사용자들은 이 키들이 오른손 바로 아래에 있기 때문에 화살표 키보다 이 키들을 더 선호합니다.

`+` 키를 눌러보시기 바랍니다. 누를 때마다 커서는 파일의 다음 줄로 이동하며, 줄에서 처음 공백이 아닌 위치에 놓습니다. `-` 키는 `+` 키와 같지만 반대 방향으로 이동합니다.

이 키들은 파일에서 위아래 줄로 이동할 때 매우 일반적으로 사용됩니다. 이들 키로 화면의 맨 아래나 맨 위를 벗어나면, 화면이 아래로(또는 가능하다면 위로) 스크롤되어 한 줄씩 보입니다. `RETURN` 키는 `+` 키와 동일한 효과를 가집니다.

vi에는 화면의 맨 위, 가운데, 맨 아래로 이동하는 명령도 있습니다. `H` (high)는 화면의 맨 위(홈) 줄로 이동시킵니다. 또한, 앞에 숫자를 붙여 `3H` 처럼 입력합니다. 이것은 화면의 세 번째 줄로 이동시킵니다. 이처럼 많은 vi 명령은 앞에 숫자를 붙이면 흥미로운 동작을 합니다. `M` (Middle)키를 누릅니다. 이것은 화면의 가운데 줄로 이동시키며, `L` (Low)은 화면의 마지막 줄로 이동시킵니다. `L` 명령도 숫자를 받을 수 있으므로, `5L` 은 화면 아래에서 다섯 번째 줄로 이동시킵니다.



## Moving within a line
이제 화면의 어떤 줄에서 단어 하나를 골라보겠습니다. 이때 줄의 첫 번째 단어는 선택하지 말고, `RETURN` 과 `-` 키를 사용해서 해당 단어가 있는 줄로 커서를 이동합니다. `w` 키를 눌러보시기 바랍니다. 이 키는 커서를 줄의 다음 단어로 이동시킵니다.  `b` 키를 눌러 단어 단위로 뒤로 이동합니다. 또한, `e` 키를 눌러 현재 단어의 끝으로 이동합니다. `SPACE` (스페이스 바)는 오른쪽으로 한 문자 이동하며, `BS` (백스페이스 또는 `^H`) 키는 왼쪽으로 한 문자 이동합니다. 이것은 `h` 키와 같은 동작을 처리하며, `BS` 키가 없는 경우에는 유용합니다. (또한, 앞서 언급했듯이 `l` 키는 오른쪽으로 이동합니다.)

줄에 구두점이 포함되어 있다면, `w` 와 `b` 키는 구두점마다 멈춘다는 것을 알아차렸을 것입니다. 구두점에서 멈추지 않고 단어 단위로 앞뒤로 이동하려면 소문자 대신 `W` 와 `B` 를 사용합니다. 이것은 좀 더 큰 단어라고 생각하면 됩니다. 구두점이 있는 몇 줄에 이 키를 직접 사용해고 소문자 `w` 와 `b` 명령과 어떻게 다른지 확인해보시기 바랍니다.

단어 이동 키는 줄 끝에서 멈추지 않고 다음 줄로 이어집니다. 현재 위치보다 아래 줄에 있는 단어로 이동하려면 `w` 키를 반복해서 누릅니다.


## Summary

| 키(Key) | 기능 설명(직역) |
|---------|----------------|
| SPACE | 커서를 한 칸 앞으로 이동 |
| ^B | 이전 페이지로 뒤로 이동 |
| ^D | 아래로 스크롤 |
| ^E | 아래쪽에 한 줄 더 노출 |
| ^F | 다음 페이지로 앞으로 이동 |
| ^G | 현재 무슨 일이 일어나는지 알려줌 |
| ^H | 커서를 뒤로 한 칸 지움(백스페이스) |
| ^N | 다음 줄, 같은 열 |
| ^P | 이전 줄, 같은 열 |
| ^U | 위로 스크롤 |
| ^Y | 위쪽에 한 줄 더 노출 |
| + | 다음 줄, 맨 처음 위치에서 |
| - | 이전 줄, 맨 처음 위치에서 |
| / | 지정한 문자열을 앞으로 검색 |
| ? | 지정한 문자열을 뒤로 검색 |
| B | 구두점을 무시하고 단어 단위로 뒤로 이동 |
| G | 지정한 줄로 이동, 기본값은 마지막 줄 |
| H | 화면의 첫 줄로 이동 |
| M | 화면의 가운데 줄로 이동 |
| L | 화면의 마지막 줄로 이동 |
| W | 구두점을 무시하고 단어 단위로 앞으로 이동 |
| b | 단어 단위로 뒤로 이동 |
| e | 현재 단어의 끝으로 이동 |
| n | `/` 또는 `?` 로 검색한 패턴의 다음 항목으로 이동 |
| w | 현재 단어 다음 단어로 이동 |


## View
편집기를 사용해서 파일을 변경하지 않고 단지 보기만 하려면, `vi` 대신 `view` 로 실행합니다. 이렇게 실행하면 `readonly` 옵션이 설정되고 파일을 실수로 덮어쓰는 것을 방지할 수 있습니다.


---

# Making simple changes
## Inserting
가장 유용한 명령 중 하나는 `i` (insert) 명령입니다. `i` 를 입력한 후 `ESC` 키를 누를 때까지 입력하는 모든 내용이 파일에 삽입됩니다. 지금 시도해보시기 바랍니다. 파일의 어떤 단어 앞에 커서를 위치시키고 그 단어 앞에 텍스트를 삽입합니다. 만약, 더미 터미널(dumb terminal)을 사용 중이면, 잠시 동안 해당 줄의 일부 문자를 덮어쓴 것처럼 보일 수 있지만, `ESC` 키를 누르면 곧바로 다시 나타납니다.

> [!NOTE] 참고: vi 편집기의 최신 버전에서는 입력한 문자를 삽입할 텍스트로 인식하는지 명령으로 인식하는지에 대한 정보를 표시할 수 있습니다. 이를 활성화하려면 `ESC` 키를 누른 후, `:set showmodeCR` 을 입력합니다. 옵션 설정에 대한 자세한 내용은 6.2절에서 확인할 수 있습니다.

이제 's' 문자로 끝나지 않은 단어를 찾습니다. 해당 단어에 커서를 위치시키고 `e` 키를 눌러 단어 끝으로 이동한 다음, `a` 키를 눌러 추가 모드로 들어가고 `sESC` 를 입력해서 텍스트 삽입을 종료합니. 이 명령 시퀀스를 사용하면 단어를 쉽게 단수형에서 복수형으로 만들 수 있습니다.

삽입(`i`)과 추가(`a`) 키를 몇 번 시도해보고 어떻게 작동하는지 확실히 이해하시기 바랍니다. `i` 키는 커서 왼쪽에 텍스트를 배치하고, `a` 키는 오른쪽에 배치합니다.

편집 중인 파일에서 특정 줄 앞이나 뒤에 새로운 줄을 추가할 경우가 자주 있습니다. 의미 있는 줄을 하나 찾아서, 현재 줄 다음에 새로운 줄을 만들려면 `o` 명령을 입력하고, 현재 줄 앞에 새로운 줄을 만들고 싶다면 `O` (대문자)명령을 입력합니다. 이렇게 새로운 줄을 만든 후에는 `ESC` 키를 누를 때까지 입력한 텍스트는 새로운 줄에 삽입됩니다.

많은 편집기 명령은 동일한 문자 키로 호출하며, 하나는 소문자 키로, 다른 하나는 대문자 키로 입력한다는 점만 다릅니다. 이 경우, 대문자 키는 처리 방향에서 소문자 키와 다르며, 주로 대문자 키는 뒤쪽 또는 위쪽으로 작동하고, 소문자 키는 앞쪽 또는 아래쪽으로 이동합니다.

텍스트를 입력할 때는 여러 줄을 입력할 수도 있고 몇 글자만 입력할 수도 있습니다. 여러 줄의 텍스트를 입력하려면 입력 중간에 `RETURN` 키를 누릅니다. 그러면 텍스트를 위한 새로운 줄이 생성되며 계속 입력할 수 있습니다. 느리고 더미 터미널에서는 편집기가 화면 끝부분을 다시 그리는 것을 잠시 기다릴 수 있으며, 기존 화면 줄 위에 입력하도록 허용합니다. 이것은 편집기가 화면 끝부분을 항상 최신 상태로 유지할 때 발생할 수 있는 긴 지연 시간을 피하기 위한 것입니다. 화면 끝부분은 `ESC` 키를 누르면 수정되며, 누락된 줄이 다시 나타납니다.

새로운 텍스트를 삽입할 동안에는 시스템 쉘에서 일반적으로 사용하는 문자(보통 `^H` 또는 `#`)를 사용해서 마지막으로 입력한 문자를 지울 수 있고, 입력 줄을 삭제하는 데 사용하는 문자(보통 `@`, `^X` 또는 `^U`)를 사용해서 현재 줄에 입력한 내용을 지울 수 있습니다. (각주 [^3-1]) 

[^3-1]: 사실 `^H` (백스페이스) 문자는 마지막으로 입력한 문자를 지울 떄 항상 사용할 수 있으며, 이것은 삭제할 문자가 무엇이든 관계없습니다.

`^W` 는 전체 단어를 지우고 이전 단어 뒤의 공백 위치에 커서를 남깁니다. 이것은 삽입 중에 빠르게 되돌아갈 때 유용합니다.

삽입 중에 백스페이스 키를 누르면, 백스페이스로 지운 문자들이 실제 삭제되지 않고 커서만 뒤로 이동하며, 문자들은 화면에 그대로 남아 있습니다. 이것은 비슷한 내용을 입력할 경우 유용합니다. 어쨌든 `ESC` 키를 누르면 해당 문자들은 모두 사라집니다. 만약, 즉시 지우고 싶다면 `ESC` 를 누른 후 진행하면 됩니다.

또한, 삽입하지 않은 문자는 지울 수 없으며, 줄 끝을 넘어서 백스페이스 처리할 수 없다는 점도 알아두시기 바랍니다. 이전 줄로 되돌아가서 수정하려면 `ESC` 키를 누르고 커서를 이전 줄로 이동합니다. 수정을 마친 후에는 원래 위치로 돌아가서 삽입(`i`) 또는 추가(`a`) 명령을 다시 사용할 수 있습니다.



## Making small corrections
기존 텍스트에 작은 수정 작업은 쉽게 처리할 수 있습니다. 잘못된 문자 하나를 찾거나 아무 문자나 골라보시기 바랍니다. 화살표 키를 사용하거나 단어 이동 키를 사용해서 해당 문자 근처로 이동한 다음, 백스페이스(`BS` 키 또는 `^H`, 또는 그냥 `h`)나 스페이스바를 사용해서 커서를 잘못된 문자에 놓습니다. 해당 문자가 필요 없다면 `x` 키를 누릅니다. 이 키는 파일에서 해당 문자를 삭제합니다. 이것은 마치 타자기에서 실수한 문자를 `x` 키로 지우는 방식과 유사하지만 훨씬 깔끔합니다.

문자가 잘못된 경우, 올바른 문자로 교체하려면 `rc` 명령을 사용합니다. 여기서 `c` 는 교체할 올바른 문자입니다. 문자 하나를 여러 문자로 교체할 경우 `s` 명령을 사용해서 문자열로 대체할 수 있으며, 문자열 입력 후 `ESC` 키로 종료합니다. 잘못된 문자의 수가 적은 경우에는 `s` 앞에 교체할 문자 수를 지정할 수 있습니다. 또한, `x` 명령과 함께 숫자를 사용하면 해당 수만큼의 문자를 삭제할 수 있습니다.




## More corrections: operators
당신은 이미 좀 더 높은 수준에서 변경 작업을 처리할 수 있을 만큼 충분히 알고 있습니다. 이제 알아야 할 것은 `d` 키가 삭제 연산자 역할을 처리한다는 것입니다. 단어를 삭제하려면 `dw`  명령을 사용합니. `.` (마침표)키를 몇 번 누릅니다. `dw` 명령 효과가 반복된다는 것을 확인할 수 있습니다. `.` 명령은 마지막으로 수행한 변경 명령을 반복 실행합니다. 이 명령은 생략 부호 '...' 와 비슷하다고 기억하면 됩니다.

이제 `db` 명령을 시도합니다. 이 명령은 단어를 거꾸로 삭제하며 즉, 앞에 있는 단어를 삭제합니다. `dSPACE` 를 시도합니다. 이 명령은 한 문자를 삭제하며, 이것은 `x` 명령과 동일합니다.

또 하나의 매우 유용한 연산자는 `c` 즉, 변경(change) 명령입이다. `cw` 명령은 하나의 단어 텍스트를 변경합니다. 이 명령 뒤에 `ESC` 키로 끝나는 대체 텍스트를 입력합니다. 다른 단어로 바꿀 수 있는 단어를 찾아서 지금 시도해 보시기 바랍니다. 변경될 텍스트의 끝은 `$` 문자로 표시하므로, 새로운 내용을 입력할 동안 확인할 수 있습니다.



## Operating on lines
줄 단위로 작업할 경우가 자주 있습니다. 삭제하고 싶은 줄을 찾아서 즉 `d` 연산자를 `dd` 두 번 입력합니다. 이렇게 처리하면 해당 줄이 삭제됩니다. 더미 터미널(dumb terminal)을 사용할 경우, 편집기는 화면에서 해당 줄을 지우고 `@` 문자만 있는 줄로 대체할 수 있습니다다. 이 줄은 파일의 어떤 줄도 해당하지 않으며, 단지 자리 표시자 역할만 합니다. 이것은 삭제 작업으로 인해 생긴 빈 공간을 메우기 위해 화면 전체를 다시 그리는 데 걸리는 지연 시간을 피하는 데 도움이 됩니다.

`c` 연산자를 두 번 반복합니다. 이렇게 처리하면 한 줄 전체를 변경하며, 기존 내용을 지우고 `ESC` 키를 누를 때까지 입력한 텍스트로 대체됩니다. (각주 [^3-2])
 
[^3-2]: `S` (대문자)명령은 `cc` 명령의 편리한 동의어로, `s` 명령과 유사성에서 나온 것입니다. `S` 명령을 줄 단위 대체(substitute)로, `s` 명령을 문자 단위 대체로 생각하면 됩니다.

또는, `cc` 명령 앞에 숫자를 붙이면 여러 줄을 삭제하거나 변경할 수 있습니다. 예를 들어, `5dd` 는 5줄을 삭제합니다. `dL` 같은 명령을 사용하면 화면 마지막 줄까지의 모든 줄을 삭제할 수 있고, `d3L` 은 화면 아래에서 세 번째 줄까지 삭제합니다. 지금 이 명령들로 몇 가지 시도를 해보시기 바랍니다. (각주 [^3-3]) 
 
[^3-3]: 여기서 미묘한 점은 `d` 뒤에 `/` 검색 명령을 사용할 경우입니다. 이것은 보통 현재 위치부터 일치 지점까지의 문자를 삭제합니다. 만약, 두 지점을 포함한 전체 줄을 삭제하려면, 패턴을 `/pat/+0` 처럼 패턴 주소로 지정하면 됩니다.
 
편집기는 많은 줄을 변경할 때, 그 범위를 알려주므로 변경될 정도를 확인할 수 있습니다. 또한, 편집기는 보이지 않는 텍스트에 영향을 주는 변경이 있을 때 항상 이를 알려줍니다.
 
 
## Undoing
이제 마지막으로, 수행한 변경 작업이 뭔가 잘못되었다고 가정합니다. 삽입, 삭제, 추가 명령을 사용해서 올바른 내용을 다시 입력할 수도 있습니다. 하지만, 변경 작업을 후회하거나 잘못 변경할 경우도 자주 있기 때문에, 편집기는 마지막으로 수행한 변경 작업을 되돌리는 `u` (undo)명령을 제공합니다. 이 명령을 몇 번 시도해보시기 바랍니다. 연속으로 두 번 입력하면 `u` 명령도 `u` 명령 자체를 되돌릴 수 있다는 것을 알 수 있습니다.

`u` 명령은 단 하나의 변경 작업만 되돌릴 수 있습니다. 만약, 한 줄에 여러 번 변경을 가한 후, 원래 상태로 되돌리고 싶어질 수 있습니다. `U` (대문자)명령은 현재 줄을 변경하기 시작하기 이전의 상태로 복원한다.

삭제한 텍스트는 delete 명령으로 복구되지 않더라도 되살릴 수 있습니다. 아래의 '삭제한 텍스트 복구' 섹션을 참조하시기 바랍니다.


## Summary

| 키(Key) | 기능 설명(직역) |
|---------|----------------|
| SPACE | 커서를 한 칸 앞으로 이동 |
| ^H | 커서를 백스페이스 |
| ^W | 입력 중에 단어를 지움 |
| erase | 사용자의 erase(보통 `^H` 또는 `#`), 입력 중에 문자를 지움 |
| kill | 사용자의 kill(보통 `@`, `^X`, 또는 `^U`), 현재 줄에서 입력을 삭제 |
| . | 변경 명령을 반복 실행 |
| O | 현재 줄 위에 새로운 줄을 만들고 입력 |
| U | 현재 줄에 가한 모든 변경 작업 취소 |
| a | 커서 뒤에 텍스트 추가 |
| c | 지정한 객체를 입력 텍스트로 변경 |
| d | 지정한 객체를 삭제 |
| i | 커서 앞에 텍스트 삽입 |
| o | 현재 줄 아래에 새로운 줄을 만들고 입력 |
| u | 마지막 변경 작업 취소 |


---

# Moving about; rearranging and duplicating text
## Low level character motions
이제 괄호나 쉼표, 마침표 같은 구두점이나 괄호 문자가 있는 줄로 커서를 이동합니다. `fx` 명령을 시도합니다. 여기서 `x` 는 해당 문자이며, 이 명령은 현재 줄에서 커서 오른쪽에 있는 다음 `x` 문자를 찾습니다. 그런 다음, `;` 키를 누릅니다. 이 키는 동일한 문자의 다음 번 인스턴스를 찾습니다. `f` 명령과 이어지는 여러 번의 `;` 를 사용하면 단어 이동이나 스페이스 키를 여러 번 사용하는 것보다 줄의 특정 위치로 훨씬 빠르게 이동할 수 있습니다. `F` (대문자)명령도 있으며, 이것은 `f` 와 같지만 반대로 검색합니다. `;` 명령은 `F` 명령도 반복합니다.

줄의 텍스트를 다룰 때는 특정 문자까지(하지만, 그 문자는 포함하지 않고) 처리하는 것이 바람직한 경우가 많습니다. `dfx` 명령을 어떤 문자 `x` 에 시도합니다. 이 명령은 `x` 문자까지 삭제하며, `x` 문자도 함께 삭제됩니다. `u` 명령으로 이를 되돌린 다음 `dtx` 명령을 시도합니다. 여기서 `t` 는 '~까지(to)' 를 의미하며, `x` 문자 직전까지 삭제하고 `x` 는 남겨둡니다. `T` (대문자)명령은 `t` 명령의 반대 방향으로 작동합니다.

한 줄의 텍스트를 다룰 때, `↑` (`^`)는 커서를 해당 줄의 첫 번째 공백이 아닌 위치로 이동시키고, `$` 는 줄의 끝으로 이동시킵니다. 따라서, `$a` 는 현재 줄의 끝에 새로운 텍스트를 추가합니다.

파일에는 탭(`^I`) 문자가 포함되어 있을 수 있습니다. 이 문자들은 탭 정지 위치까지 확장되는 여러 개의 공백으로 표시되며, 탭 정지는 매 8번째 위치마다 있습니다. (각주 [^4-1]) 

[^4-1]: 이것은 `:se ts=xCR` 명령으로 설정할 수 있으며, 예를 들어 `x` 를 4 로 지정하면 매 4열마다 탭 정지가 설정됩니다. 이 설정은 편집기에서 화면 표시 방식에 영향을 줍니다.

커서가 탭에 위치할 때는 해당 탭을 나타내는 여러 공백 중 마지막 공백 위에 놓입니다. 커서를 탭 위에서 앞뒤로 움직여보며 이 동작 방식을 이해하시기 바랍니다.

드물지만 파일에 인쇄되지 않는(non-printing) 문자가 포함될 수 있습니다. 이런 문자들은 이 문서에서 표현한 방식과 동일하게 표시하며, 첫 번째 문자가 `^` 인 두 문자 코드로 나타납니다. 화면에 인쇄되지 않는 문자는 서로 인접한 문자처럼 보이지만, 해당 문자에서 스페이스 또는 백스페이스키를 누르면 이 두 문자가 탭 문자를 나타내는 공백처럼 하나의 문자라는 것을 알 수 있습니다. 

> [!NOTE]
> 참고: 가장 상위 비트가 설정된 인쇄되지 않는 문자는 편집기의 최신 버전에서는 `\nnn` 형식으로 표시되며, 여기서 nnn 은 해당 문자의 8진수 코드입니다.

편집기는 파일에 제어 문자를 삽입할 때, 문자 종류와 beautify 옵션 설정에 따라 이런 문자를 무시할 수 있습니다. 제어 문자를 파일에 삽입하려면 삽입을 시작한 후, 해당 제어 문자 앞에 `^V` 를 입력합니다. `^V` 는 다음 문자를 인용(quote)해서 해당 문자가 파일에 직접 삽입되도록 처리합니다.

ZZZZ

## Higher level text objects
  In working with a document it is often advantageous to work in terms of sentences, paragraphs, and sections. The operations ( and ) move to the beginning of the previous and next sentences respectively. Thus the command d) will delete the rest of the current sentence; likewise d( will delete the previous sentence if you are at the beginning of the current sentence, or the current sentence up to where you are if you are not at the beginning of the current sentence.

문서를 다룰 때는 문장, 단락, 섹션 단위로 작업하는 것이 유리한 경우가 많다. 괄호 연산자인 과 는 각각 이전 문장과 다음 문장의 시작 위치로 커서를 이동시킨다. 따라서  명령은 현재 문장의 나머지를 삭제하며,  명령은 현재 문장의 시작 위치에 있을 경우 이전 문장을 삭제하고, 시작 위치에 있지 않을 경우 현재 문장의 커서 이전 부분을 삭제한다.

  A sentence is defined to end at a '.', '!' or '?' which is followed by either the end of a line, or by two spaces. Any number of closing ')', ']', '"' and ''' characters may appear after the '.', '!' or '?' before the spaces or end of line.

문장은 마침표(), 느낌표(), 또는 물음표()로 끝난다고 정의되며, 그 뒤에는 줄의 끝이나 두 개의 공백이 따라와야 한다. 마침표(), 느낌표(), 또는 물음표() 뒤에는 닫는 괄호(), 닫는 대괄호(), 큰따옴표(), 작은따옴표()가 얼마든지 올 수 있으며, 그 뒤에 공백 두 개 또는 줄의 끝이 와야 한다.

  The operations { and } move over paragraphs and the operations [[ and ]] move over sections (footnote 4-2).

중괄호 연산자인 와 는 단락(paragraph)을 기준으로 이동하며, 대괄호 두 개씩인 와 는 섹션(section)을 기준으로 이동한다 (각주 4-2).

  A paragraph begins after each empty line, and also at each of a set of paragraph macros, specified by the pairs of characters in the definition of the string valued option paragraphs. The default setting for this option defines the paragraph macros of the -ms and -mm macro packages (note:this refers to the troff text formatting system), i.e. the '.IP', '.LP', '.PP' and '.QP', '.P' and '.LI' macros (footnote 4-3). Each paragraph boundary is also a sentence boundary. The sentence and paragraph commands can be given counts to operate over groups of sentences and paragraphs.

단락은 각 빈 줄 이후에 시작되며, 또한 문자열 값 옵션 의 정의에 있는 문자 쌍으로 지정된 단락 매크로들에서도 시작된다. 이 옵션의 기본 설정은  및  매크로 패키지(참고: 이는 troff 텍스트 포맷팅 시스템을 의미함)의 단락 매크로들을 정의한다. 즉, , , , , ,  매크로들이다 (각주 4-3). 각 단락 경계는 또한 문장 경계이기도 하다. 문장 및 단락 명령어에는 숫자를 지정해서 여러 문장이나 단락에 대해 작동하도록 할 수 있다.

  Sections in the editor begin after each macro in the sections option, normally '.NH', '.SH', '.H' and '.HU', and each line with a formfeed ^L in the first column. Section boundaries are always line and paragraph boundaries also.

편집기에서 섹션은  옵션에 지정된 각 매크로 이후에 시작되며, 일반적으로 , , ,  매크로와 첫 번째 열에 폼피드()가 있는 각 줄에서 시작된다. 섹션 경계는 항상 줄 경계이자 단락 경계이기도 하다.

  Try experimenting with the sentence and paragraph commands until you are sure how they work. If you have a large document, try looking through it using the section commands. The section commands interpret a preceding count as a different window size in which to redraw the screen at the new location, and this window size is the base size for newly drawn windows until another size is specified. This is very useful if you are on a slow terminal and are looking for a particular section. You can give the first section command a small count to then see each successive section heading in a small window.

문장 및 단락 명령어가 어떻게 작동하는지 확실히 알 수 있을 때까지 실험해 보세요. 문서가 크다면 섹션 명령어를 사용해서 탐색해 보세요. 섹션 명령어는 앞에 붙는 숫자를 새로운 위치에서 화면을 다시 그릴 때 사용할 다른 창 크기로 해석하며, 이 창 크기는 이후에 다른 크기가 지정되기 전까지 새로 그려지는 창의 기본 크기가 됩니다. 이는 느린 터미널에서 특정 섹션을 찾고 있을 때 매우 유용합니다. 첫 번째 섹션 명령어에 작은 숫자를 주면 이후 각 섹션 제목을 작은 창에서 볼 수 있습니다.


## Rearranging and duplicating text
  The editor has a single unnamed buffer where the last deleted or changed away text is saved, and a set of named buffers a-z which you can use to save copies of text and to move text around in your file and between files.

편집기에는 마지막으로 삭제되었거나 변경된 텍스트가 저장되는 하나의 이름 없는 버퍼가 있으며, 텍스트의 복사본을 저장하거나 파일 내 및 파일 간에 텍스트를 이동하는 데 사용할 수 있는 a부터 z까지의 이름 있는 버퍼 집합이 있다.

  The operator y yanks a copy of the object which follows into the unnamed buffer. If preceded by a buffer name, "xy, where x here is replaced by a letter a-z, it places the text in the named buffer. The text can then be put back in the file with the commands p and P; p puts the text after or below the cursor, while P puts the text before or above the cursor.

연산자 는 뒤따르는 객체의 복사본을 이름 없는 버퍼로 가져온다(yank). 버퍼 이름이 앞에 붙은  형식(여기서 x는 a부터 z까지의 문자로 대체됨)으로 사용되면, 해당 텍스트는 이름 있는 버퍼에 저장된다. 저장된 텍스트는 명령어 와 를 사용해서 파일에 다시 넣을 수 있다. 는 텍스트를 커서 뒤나 아래에 삽입하고, 는 텍스트를 커서 앞이나 위에 삽입한다.

  If the text which you yank forms a part of a line, or is an object such as a sentence which partially spans more than one line, then when you put the text back, it will be placed after the cursor (or before if you use P). If the yanked text forms whole lines, they will be put back as whole lines, without changing the current line. In this case, the put acts much like a o or O command.

가져온(yank) 텍스트가 한 줄의 일부이거나 여러 줄에 걸쳐 있는 문장 같은 객체인 경우, 텍스트를 다시 넣을 때는 커서 뒤(또는 를 사용할 경우 커서 앞)에 삽입된다. 가져온 텍스트가 전체 줄들로 구성되어 있다면, 현재 줄을 변경하지 않고 전체 줄로 다시 삽입된다. 이 경우 삽입 명령은  또는  명령과 매우 유사하게 작동한다.

  Try the command YP. This makes a copy of the current line and leaves you on this copy, which is placed before the current line. The command Y is a convenient abbreviation for yy. The command Yp will also make a copy of the current line, and place it after the current line. You can give Y a count of lines to yank, and thus duplicate several lines; try 3YP.

명령어 를 시도해 보세요. 이 명령은 현재 줄의 복사본을 만들고, 복사된 줄에 커서를 위치시키며, 복사본은 현재 줄 앞에 배치됩니다. 명령어 는 의 편리한 축약형입니다. 명령어  역시 현재 줄의 복사본을 만들고, 복사본을 현재 줄 뒤에 배치합니다. 에 줄 수를 지정하면 여러 줄을 복사할 수 있으며, 예를 들어 를 시도해 보세요.

  To move text within the buffer, you need to delete it in one place, and put it back in another. You can precede a delete operation by the name of a buffer in which the text is to be stored as in "a5dd deleting 5 lines into the named buffer a. You can then move the cursor to the eventual resting place of the these lines and do a "ap or "aP to put them back. In fact, you can switch and edit another file before you put the lines back, by giving a command of the form :e nameCR where name is the name of the other file you want to edit. You will have to write back the contents of the current editor buffer (or discard them) if you have made changes before the editor will let you switch to the other file. An ordinary delete command saves the text in the unnamed buffer, so that an ordinary put can move it elsewhere. However, the unnamed buffer is lost when you change files, so to move text from one file to another you should use an unnamed buffer.

버퍼 내에서 텍스트를 이동하려면 한 위치에서 삭제하고 다른 위치에 다시 삽입해야 한다. 와 같이 삭제 명령 앞에 버퍼 이름을 붙이면, 해당 텍스트는 이름 있는 버퍼 에 저장된다. 그런 다음 커서를 이 텍스트가 최종적으로 위치할 곳으로 이동시켜  또는 를 사용해서 다시 삽입할 수 있다. 실제로는 텍스트를 삽입하기 전에 다른 파일로 전환해서 편집할 수도 있으며, 이때는  형식의 명령을 사용한다. 여기서 은 편집하려는 다른 파일의 이름이다. 현재 편집기 버퍼의 내용을 변경한 경우, 다른 파일로 전환하기 전에 해당 내용을 저장하거나 버려야 한다. 일반적인 삭제 명령은 텍스트를 이름 없는 버퍼에 저장하므로, 일반적인 삽입 명령으로 다른 위치로 텍스트를 이동할 수 있다. 그러나 이름 없는 버퍼는 파일을 변경하면 사라지므로, 파일 간에 텍스트를 이동하려면 이름 있는 버퍼를 사용해야 한다.


## Summary
| Key   | Function Description                                 |
|-------|------------------------------------------------------|
| ↑     | first non-white on line                              |
| $     | end of line                                          |
| )     | forward sentence                                     |
| }     | forward paragraph                                    |
| ]]    | forward section                                      |
| (     | backward sentence                                    |
| {     | backward paragraph                                   |
| [[    | backward section                                     |
| fx    | find x forward in line                               |
| p     | put text back, after cursor or below current line    |
| y     | yank operator, for copies and moves                  |
| tx    | up to x forward, for operators                       |
| Fx    | f backward in line                                   |
| P     | put text back, before cursor or above current line   |
| Tx    | t backward in line                                   |



| 키(Key) | 기능 설명(직역) |
|---------|----------------|
| ↑ | 줄에서 첫 번째 공백이 아닌 문자로 이동 |
| $ | 줄의 끝으로 이동 |
| ) | 문장 앞으로 이동 |
| } | 문단 앞으로 이동 |
| ]] | 섹션 앞으로 이동 |
| ( | 문장 뒤로 이동 |
| { | 문단 뒤로 이동 |
| [[ | 섹션 뒤로 이동 |
| fx | 현재 줄에서 문자 x를 앞으로 찾음 |
| p | 커서 뒤 또는 현재 줄 아래에 텍스트 붙여넣기 |
| y | 복사 및 이동을 위한 yank 연산자 |
| tx | 연산자를 위해 문자 x까지 앞으로 이동 |
| Fx | 현재 줄에서 문자 x를 뒤로 찾음 |
| P | 커서 앞 또는 현재 줄 위에 텍스트 붙여넣기 |
| Tx | 현재 줄에서 문자 x까지 뒤로 이동 |




# High level commands
## Writing, quitting, editing new files
  So far we have seen how to enter vi and to write out our file using either ZZ or :wCR. The first exits from the editor, (writing if changes were made), the second writes and stays in the editor.

지금까지 우리는 에 들어가는 방법과  또는 을 사용해서 파일을 저장하는 방법을 살펴보았다. 첫 번째 명령어는 편집기를 종료하며(변경 사항이 있을 경우 저장함), 두 번째 명령어는 저장만 하고 편집기에는 계속 머무른다.

If you have changed the editor's copy of the file but do not wish to save your changes, either because you messed up the file or decided that the changes are not an improvement to the file, then you can give the command :q!CR to quit from the editor without writing the changes. You can also reedit the same file (starting over) by giving the command :e!CR. These commands should be used only rarely, and with caution, as it is not possible to recover the changes you have made after you discard them in this manner.

편집기에서 파일의 복사본을 변경했지만 변경 사항을 저장하고 싶지 않은 경우—파일을 망쳤거나 변경이 개선이 아니라고 판단한 경우— 명령을 입력하면 변경 사항을 저장하지 않고 편집기를 종료할 수 있다. 같은 파일을 다시 편집(처음부터 시작)하려면  명령을 입력하면 된다. 이러한 명령은 매우 드물게, 그리고 신중하게 사용해야 하며, 이 방식으로 변경 사항을 버린 후에는 복구할 수 없다.

  You can edit a different file without leaving the editor by giving the command :e nameCR. If you have not written out your file before you try to do this, then the editor will tell you this, and delay editing the other file. You can then give the command :wCR to save your work and then the :e nameCR command again, or carefully give the command :e! nameCR, which edits the other file discarding the changes you have made to the current file. To have the editor automatically save changes, include set autowrite in your EXINIT, and use :n instead of :e.

편집기를 종료하지 않고 다른 파일을 편집하려면  명령을 입력하면 된다. 만약 이 명령을 실행하기 전에 현재 파일을 저장하지 않았다면, 편집기는 이를 알려주고 다른 파일의 편집을 지연시킨다. 이 경우  명령으로 작업을 저장한 후 다시  명령을 입력하거나, 현재 파일의 변경 사항을 버리고 다른 파일을 편집하려면  명령을 신중하게 입력하면 된다. 변경 사항을 자동으로 저장하도록 하려면 에 를 포함시키고,  대신  명령을 사용하면 된다.


## Escaping to a shell
  You can get to a shell to execute a single command by giving a vi command of the form :!cmdCR. The system will run the single command cmd and when the command finishes, the editor will ask you to hit a RETURN to continue. When you have finished looking at the output on the screen, you should hit RETURN and the editor will clear the screen and redraw it. You can then continue editing. You can also give another : command when it asks you for a RETURN; in this case the screen will not be redrawn.

단일 명령을 실행하기 위해 셸로 이동하려면  형식의 vi 명령을 입력하면 된다. 시스템은 단일 명령 를 실행하며, 명령이 끝나면 편집기는 계속하려면 RETURN 키를 누르라고 요청한다. 화면에 출력된 내용을 다 확인한 후 RETURN 키를 누르면 편집기가 화면을 지우고 다시 그린다. 이후 편집을 계속할 수 있다. RETURN 키를 누르라는 요청이 나왔을 때 다른  명령을 입력할 수도 있으며, 이 경우 화면은 다시 그려지지 않는다.

  If you wish to execute more than one command in the shell, then you can give the command :shCR. This will give you a new shell, and when you finish with the shell, ending it by typing a ^D, the editor will clear the screen and continue.

셸에서 둘 이상의 명령을 실행하고 싶다면  명령을 입력하면 된다. 이 명령은 새로운 셸을 열어주며, 셸 작업을 마친 후 를 입력해서 셸을 종료하면 편집기가 화면을 지우고 계속 진행한다.

  On systems which support it, ^Z will suspend the editor and return to the (top level) shell. When the editor is resumed, the screen will be redrawn.

이를 지원하는 시스템에서는 를 입력하면 편집기가 일시 중단되고 (최상위) 셸로 돌아간다. 편집기를 다시 시작하면 화면이 다시 그려진다.


## Marking and returning
  The command `` returned to the previous place after a motion of the cursor by a command such as /, ? or G. You can also mark lines in the file with single letter tags and return to these marks later by naming the tags. Try marking the current line with the command mx, where you should pick some letter for x, say 'a'. Then move the cursor to a different line (any way you like) and hit `a. The cursor will return to the place which you marked. Marks last only until you edit another file.

명령어 `` 는 /, ?, G 같은 명령으로 커서가 이동한 후 이전 위치로 돌아간다. 파일의 줄을 한 글자 태그로 표시할 수 있으며, 나중에 이 태그를 지정해서 해당 위치로 돌아갈 수 있다. 현재 줄을 mx 명령으로 표시해보라. 여기서 x는 'a'와 같은 아무 문자로 선택하면 된다. 그런 다음 커서를 다른 줄로 이동시키고 `a 를 입력하면 커서는 표시한 위치로 돌아간다. 표시는 다른 파일을 편집하기 전까지만 유지된다.

  When using operators such as d and referring to marked lines, it is often desirable to delete whole lines rather than deleting to the exact position in the line marked by m. In this case you can use the form 'x rather than `x. Used without an operator, 'x will move to the first non-white character of the marked line; similarly '' moves to the first non-white character of the line containing the previous context mark ``.

연산자 d 같은 것을 사용할 때 표시된 줄을 참조하면, 표시된 m 위치까지 정확히 삭제하는 것보다 전체 줄을 삭제하는 것이 바람직한 경우가 많다. 이 경우 `x 대신 'x 형식을 사용할 수 있다. 연산자 없이 사용하면 'x 는 표시된 줄의 첫 번째 공백이 아닌 문자로 이동한다. 마찬가지로 '' 는 이전 컨텍스트 표시 `` 가 있는 줄의 첫 번째 공백이 아닌 문자로 이동한다.



## Adjusting the screen
  If the screen image is messed up because of a transmission error to your terminal, or because some program other than the editor wrote output to your terminal, you can hit a ^L, the ASCII form-feed character, to cause the screen to be refreshed.

화면 이미지가 전송 오류로 인해 터미널에 잘못 표시되었거나, 편집기 외의 다른 프로그램이 터미널에 출력을 했기 때문에 잘못 표시되었을 경우, 화면을 새로 고치기 위해 ^L, ASCII 폼 피드 문자를 누를 수 있다.

  On a dumb terminal, if there are @ lines in the middle of the screen as a result of line deletion, you may get rid of these lines by typing ^R to cause the editor to retype the screen, closing up these holes.

멍청한 터미널에서는 줄 삭제로 인해 화면 중간에 @ 줄이 생긴 경우, ^R을 입력하면 편집기가 화면을 다시 출력해서 이러한 구멍을 메우고 줄을 제거할 수 있다.

  Finally, if you wish to place a certain line on the screen at the top middle or bottom of the screen, you can position the cursor to that line, and then give a z command. You should follow the z command with a RETURN if you want the line to appear at the top of the window, a . if you want it at the center, or a - if you want it at the bottom.

마지막으로, 화면의 특정 줄을 맨 위, 가운데 또는 맨 아래에 배치하고 싶다면, 커서를 해당 줄로 이동시킨 다음 z 명령을 입력하면 된다. z 명령 뒤에는 줄을 창의 맨 위에 표시하려면 RETURN을, 가운데에 표시하려면 .(점)을, 맨 아래에 표시하려면 -(하이픈)을 입력해야 한다.




# Special topics
## Editing on slow terminals
  When you are on a slow terminal, it is important to limit the amount of output which is generated to your screen so that you will not suffer long delays, waiting for the screen to be refreshed. We have already pointed out how the editor optimizes the updating of the screen during insertions on dumb terminals to limit the delays, and how the editor erases lines to @ when they are deleted on dumb terminals.

느린 터미널을 사용할 때는 화면에 출력되는 양을 제한하는 것이 중요하다. 그래야 화면이 새로 고쳐질 때 오랜 지연을 겪지 않게 된다. 우리는 이미 편집기가 멍청한 터미널에서 삽입 작업 중 화면 갱신을 최적화해서 지연을 줄이는 방법과, 삭제된 줄을 @로 지우는 방법을 설명한 바 있다.

  The use of the slow terminal insertion mode is controlled by the slowopen option. You can force the editor to use this mode even on faster terminals by giving the command :se slowCR. If your system is sluggish this helps lessen the amount of output coming to your terminal. You can disable this option by :se noslowCR.

느린 터미널 삽입 모드의 사용은 slowopen 옵션에 의해 제어된다. 빠른 터미널에서도 이 모드를 강제로 사용하려면 :se slowCR 명령을 입력하면 된다. 시스템이 느릴 경우, 이 설정은 터미널로 출력되는 양을 줄이는 데 도움이 된다. 이 옵션을 비활성화하려면 :se noslowCR 명령을 입력하면 된다.

  The editor can simulate an intelligent terminal on a dumb one. Try giving the command :se redrawCR. This simulation generates a great deal of output and is generally tolerable only on lightly loaded systems and fast terminals. You can disable this by giving the command :se noredrawCR.

편집기는 멍청한 터미널에서 지능형 터미널을 시뮬레이션할 수 있다. :se redrawCR 명령을 입력해보라. 이 시뮬레이션은 많은 양의 출력을 생성하며, 일반적으로 시스템 부하가 적고 터미널이 빠를 때만 견딜 수 있다. 이 기능을 비활성화하려면 :se noredrawCR 명령을 입력하면 된다.

  The editor also makes editing more pleasant at low speed by starting editing in a small window, and letting the window expand as you edit. This works particularly well on intelligent terminals. The editor can expand the window easily when you insert in the middle of the screen on these terminals. If possible, try the editor on an intelligent terminal to see how this works.

편집기는 속도가 느릴 때도 편집을 더 쾌적하게 만들기 위해 작은 창에서 편집을 시작하고, 편집하면서 창을 확장시킨다. 이 기능은 특히 지능형 터미널에서 잘 작동한다. 이러한 터미널에서는 화면 중간에 삽입할 때 편집기가 창을 쉽게 확장할 수 있다. 가능하다면 지능형 터미널에서 편집기를 사용해 이 기능이 어떻게 작동하는지 확인해보라.

  You can control the size of the window which is redrawn each time the screen is cleared by giving window sizes as argument to the commands which cause large screen motions:

화면이 지워질 때마다 다시 그려지는 창의 크기는 큰 화면 이동을 유발하는 명령에 창 크기를 인수로 제공함으로써 제어할 수 있다.

```
:  /  ?  [[  ]]  `  '
```

Thus if you are searching for a particular instance of a common string in a file you can precede the first search command by a small number, say 3, and the editor will draw three line windows around each instance of the string which it locates.

따라서 파일에서 흔한 문자열의 특정 인스턴스를 검색하려는 경우, 첫 번째 검색 명령 앞에 작은 숫자(예: 3)를 붙이면, 편집기가 해당 문자열을 찾을 때마다 그 주변에 세 줄짜리 창을 그린다.

You can easily expand or contract the window, placing the current line as you choose, by giving a number on a z command, after the z and before the following RETURN, . or -. Thus the command z5. redraws the screen with the current line in the center of a five line window (footnote 6-1).

창을 쉽게 확장하거나 축소할 수 있으며, 현재 줄을 원하는 위치에 배치할 수 있습니다. 방법은 z 명령어 뒤에 숫자를 입력하고 RETURN, . 또는 - 앞에 두는 것입니다. 따라서 명령어 `z5.`는 현재 줄을 다섯 줄짜리 창의 중앙에 오도록 화면을 다시 그립니다 (각주 6-1).

  If the editor is redrawing or otherwise updating large portions of the display, you can interrupt this updating by hitting a DEL or RUB as usual. If you do this you may partially confuse the editor about what is displayed on the screen. You can still edit the text on the screen if you wish; clear up the confusion by hitting a ^L; or move or search again, ignoring the current state of the display.

편집기가 화면의 큰 부분을 다시 그리거나 업데이트하고 있을 때, 일반적으로 DEL 또는 RUB 키를 눌러 이 과정을 중단할 수 있습니다. 이렇게 하면 화면에 표시된 내용에 대해 편집기가 부분적으로 혼란을 겪을 수 있습니다. 그래도 화면의 텍스트를 계속 편집할 수 있으며, ^L 키를 눌러 혼란을 해소하거나 현재 화면 상태를 무시하고 다시 이동하거나 검색할 수 있습니다.

  See section 7.8 on open mode for another way to use the vi command set on slow terminals.

7.8절의 오픈 모드에 대한 내용을 참조하면, 느린 터미널에서 vi 명령어 집합을 사용하는 또 다른 방법을 확인할 수 있습니다.


## Options, set, and editor startup files
  The editor has a set of options, some of which have been mentioned above. The most useful options are given in the following table.

편집기에는 여러 가지 옵션이 있으며, 그중 일부는 앞에서 언급되었습니다. 가장 유용한 옵션들은 다음 표에 나와 있습니다.

  The options are of three kinds: numeric options, string options, and toggle options. You can set numeric and string options by a statement of the form

옵션은 세 가지 종류가 있습니다: 숫자 옵션, 문자열 옵션, 그리고 토글 옵션입니다. 숫자 옵션과 문자열 옵션은 다음 형식의 문장으로 설정할 수 있습니다.

```
set opt=val
and toggle options can be set or unset by statements of one of the forms
set opt
set noopt
```

| Name         | Default            | Description                                               |
|--------------|--------------------|-----------------------------------------------------------|
| autoindent   | noai               | Supply indentation automatically                          |
| autowrite    | noaw               | Automatic write before :n, :ta, ^↑, !                     |
| ignorecase   | noic               | Ignore case in searching                                  |
| lisp         | nolisp             | ( { ) } commands deal with S-expressions                  |
| list         | nolist             | Tabs print as ^I; end of lines marked with $              |
| magic        | nomagic            | The characters . [ and * are special in scans             |
| number       | nonu               | Lines are displayed prefixed with line numbers            |
| paragraphs   | para=IPLPPPQPbpP   | LI Macro names which start paragraphs                     |
| redraw       | nore               | Simulate a smart terminal on a dumb one                   |
| sections     | sect=NHSHH         | HU Macro names which start new sections                   |
| shiftwidth   | sw=8               | Shift distance for <, > and input ^D and ^T               |
| showmatch    | nosm               | Show matching ( or { as ) or } is typed                   |
| showmode     | nosmd              | Show input mode description (addition)                    |
| slowopen     | slow               | Postpone display updates during inserts                   |
| term         | dumb               | The kind of terminal you are using                        |

 

| 이름(Name) | 기본값(Default) | 설명(직역) |
|------------|----------------|------------|
| autoindent | noai | 자동으로 들여쓰기를 제공 |
| autowrite | noaw | `:n`, `:ta`, ↑, `!` 전에 자동 저장 |
| ignorecase | noic | 검색 시 대소문자를 무시 |
| lisp | nolisp | `( { ) }` 명령이 S-표현식을 처리 |
| list | nolist | 탭을 ^I로 표시하고, 줄 끝을 `$`로 표시 |
| magic | nomagic | `.`, `[`, `*` 문자가 검색에서 특수하게 동작 |
| number | nonu | 줄 번호를 붙여서 표시 |
| paragraphs | para=IPLPPPQPbpP | LI 매크로 이름이 단락 시작을 나타냄 |
| redraw | nore | 단순 터미널에서 스마트 터미널을 시뮬레이션 |
| sections | sect=NHSHH | HU 매크로 이름이 새 섹션 시작을 나타냄 |
| shiftwidth | sw=8 | `<`, `>` 및 입력 시 ^D, ^T의 이동 간격 |
| showmatch | nosm | `(` 또는 `{` 입력 시 대응되는 `)` 또는 `}` 표시 |
| showmode | nosmd | 입력 모드 설명을 표시(추가 기능) |
| slowopen | slow | 입력 중 화면 갱신을 지연 |
| term | dumb | 사용 중인 터미널 종류 |



These statements can be placed in your EXINIT in your environment, or given while you are running vi by preceding them with a : and following them with a CR.

이러한 문장들은 환경 설정의 EXINIT에 넣을 수 있으며, vi를 실행 중일 때는 앞에 `:`를 붙이고 뒤에 CR(캐리지 리턴)을 추가해서 입력할 수 있습니다.


  You can get a list of all options which you have changed by the command :setCR, or the value of a single option by the command :set opt?CR. A list of all possible options and their values is generated by :set allCR. Set can be abbreviated se. Multiple options can be placed on one line, e.g. :se ai aw nuCR.

변경한 모든 옵션의 목록은 `:setCR` 명령어로 확인할 수 있으며, 단일 옵션의 값은 `:set opt?CR` 명령어로 확인할 수 있습니다. 가능한 모든 옵션과 그 값의 목록은 `:set allCR` 명령어로 생성됩니다. `set`은 `se`로 축약할 수 있으며, 여러 옵션을 한 줄에 입력할 수도 있습니다. 예: `:se ai aw nuCR`.

  Options set by the set command only last while you stay in the editor. It is common to want to have certain options set whenever you use the editor. This can be accomplished by creating a list of ex commands (footnote 6-2) which are to be run every time you start up ex, edit, or vi. A typical list includes a set command, and possibly a few map commands. Since it is advisable to get these commands on one line, they can be separated with the | character, for example:

`set` 명령어로 설정한 옵션은 편집기를 사용하는 동안에만 유지됩니다. 편집기를 사용할 때마다 특정 옵션을 항상 설정하고 싶어하는 경우가 많습니다. 이를 위해 ex 명령어 목록(각주 6-2)을 작성해서 ex, edit 또는 vi를 시작할 때마다 실행되도록 할 수 있습니다. 일반적인 목록에는 `set` 명령어와 몇 개의 `map` 명령어가 포함될 수 있습니다. 이러한 명령어들을 한 줄에 넣는 것이 바람직하므로, `|` 문자로 구분할 수 있습니다. 예:

```
set ai aw terse|map @ dd|map # x
```

which sets the options autoindent, autowrite, terse, (the set command), makes @ delete a line, (the first map), and makes # delete a character, (the second map). (See section 6.9 for a description of the map command) This string should be placed in the variable EXINIT in your environment. If you use the shell csh, put this line in the file .login in your home directory:

자동 들여쓰기(autoindent), 자동 저장(autowrite), 간결한 출력(terse) 옵션을 설정하고(`set` 명령), `@` 키를 누르면 한 줄을 삭제하도록 하고(첫 번째 `map`), `#` 키를 누르면 한 문자를 삭제하도록 합니다(두 번째 `map`). (`map` 명령에 대한 설명은 6.9절 참조) 이 문자열은 환경 변수 `EXINIT`에 저장해야 합니다. 셸로 `csh`를 사용하는 경우, 홈 디렉터리의 `.login` 파일에 다음 줄을 추가합니다:

```
setenv EXINIT 'set ai aw terse|map @ dd|map # x'
```

If you use the standard shell sh, put these lines in the file .profile in your home directory:

표준 셸 sh를 사용하는 경우, 홈 디렉터리에 있는 .profile 파일에 다음 줄들을 넣으십시오.

```
EXINIT='set ai aw terse|map @ dd|map # x'
export EXINIT
```

Of course, the particulars of the line would depend on which options you wanted to set.

물론, 줄의 세부 사항은 설정하려는 옵션에 따라 달라집니다.



## Recovering lost lines
  You might have a serious problem if you delete a number of lines and then regret that they were deleted. Despair not, the editor saves the last 9 deleted blocks of text in a set of numbered registers 1-9. You can get the n'th previous deleted text back in your file by the command "np. The " here says that a buffer name is to follow, n is the number of the buffer you wish to try (use the number 1 for now), and p is the put command, which puts text in the buffer after the cursor. If this doesn't bring back the text you wanted, hit u to undo this and then . (period) to repeat the put command. In general the . command will repeat the last change you made. As a special case, when the last command refers to a numbered text buffer, the . command increments the number of the buffer before repeating the command. Thus a sequence of the form

여러 줄을 삭제한 후 그것을 후회하게 되면 심각한 문제가 생길 수 있습니다. 절망하지 마십시오. 편집기는 마지막으로 삭제된 텍스트 블록 9개를 번호가 매겨진 레지스터 1~9에 저장합니다. 파일에서 n번째 이전에 삭제된 텍스트를 복구하려면 `"np` 명령을 사용하십시오. 여기서 `"`는 버퍼 이름이 뒤따른다는 뜻이고, `n`은 시도하려는 버퍼 번호입니다(지금은 1번을 사용하십시오). `p`는 put 명령으로, 커서 뒤에 텍스트를 삽입합니다. 원하는 텍스트가 복구되지 않으면 `u`를 눌러 이를 실행 취소하고 `.`(마침표)를 눌러 put 명령을 반복하십시오. 일반적으로 `.` 명령은 마지막으로 수행한 변경 작업을 반복합니다. 특별한 경우로, 마지막 명령이 번호가 매겨진 텍스트 버퍼를 참조할 경우 `.` 명령은 버퍼 번호를 증가시킨 후 명령을 반복합니다. 따라서 다음과 같은 형태의 시퀀스는…

```
"1pu.u.u.
```

will, if repeated long enough, show you all the deleted text which has been saved for you. You can omit the u commands here to gather up all this text in the buffer, or stop after any . command to keep just the then recovered text. The command P can also be used rather than p to put the recovered text before rather than after the cursor.

충분히 반복하면 저장된 모든 삭제된 텍스트를 보여줍니다. 여기서 `u` 명령은 생략해서 모든 텍스트를 버퍼에 모을 수 있고, 또는 아무 `.` 명령 이후에 중단해서 그때 복구된 텍스트만 유지할 수도 있습니다. 복구된 텍스트를 커서 뒤가 아닌 앞에 삽입하려면 `p` 대신 `P` 명령을 사용할 수도 있습니다.


## Recovering lost files
  If the system crashes, you can recover the work you were doing to within a few changes. You will normally receive mail when you next login giving you the name of the file which has been saved for you. You should then change to the directory where you were when the system crashed and give a command of the form:

시스템이 충돌하면, 작업 중이던 내용을 몇 가지 변경 이전까지 복구할 수 있습니다. 다음 로그인 시 일반적으로 저장된 파일 이름을 알려주는 메일을 받게 됩니다. 그런 다음 시스템이 충돌했을 때 있었던 디렉터리로 이동해서 다음 형식의 명령을 입력해야 합니다:

```
% vi -r name
```

replacing name with the name of the file which you were editing. This will recover your work to a point near where you left off (footnote 6-3).
  You can get a listing of the files which are saved for you by giving the command:

편집하고 있던 파일의 이름으로 name을 바꾸십시오. 이렇게 하면 작업을 중단했던 지점 근처까지 복구됩니다(각주 6-3).  
저장된 파일들의 목록을 얻으려면 다음 명령을 입력하십시오:

```
% vi -r
```

If there is more than one instance of a particular file saved, the editor gives you the newest instance each time you recover it. You can thus get an older saved copy back by first recovering the newer copies.

특정 파일이 여러 개 저장된 경우, 편집기는 복구할 때마다 가장 최신의 인스턴스를 제공합니다. 따라서 먼저 최신 복사본들을 복구함으로써 더 오래된 저장 복사본을 다시 얻을 수 있습니다.

For this feature to work, vi must be correctly installed by a super user on your system, and the mail program must exist to receive mail. The invocation “vi -r” will not always list all saved files, but they can be recovered even if they are not listed.

이 기능이 작동하려면, vi가 시스템의 슈퍼 유저에 의해 올바르게 설치되어 있어야 하며, 메일 프로그램이 존재해서 메일을 받을 수 있어야 합니다. “vi -r” 호출은 항상 모든 저장된 파일을 나열하지는 않지만, 나열되지 않더라도 복구할 수 있습니다.



## Continuous text input
  When you are typing in large amounts of text it is convenient to have lines broken near the right margin automatically. You can cause this to happen by giving the command :se wm=10CR. This causes all lines to be broken at a space at least 10 columns from the right hand edge of the screen.

많은 양의 텍스트를 입력할 때, 오른쪽 여백 근처에서 줄이 자동으로 끊어지면 편리합니다. 이를 실행하려면 `:se wm=10CR` 명령을 입력하십시오. 이 명령은 화면 오른쪽 가장자리에서 최소 10열 떨어진 공백에서 모든 줄이 끊어지도록 합니다.

  If the editor breaks an input line and you wish to put it back together you can tell it to join the lines with J. You can give J a count of the number of lines to be joined as in 3J to join 3 lines. The editor supplies white space, if appropriate, at the juncture of the joined lines, and leaves the cursor at this white space. You can kill the white space with x if you don't want it.

편집기가 입력 줄을 끊었고 그것을 다시 합치고 싶다면 J로 줄들을 합치라고 지시할 수 있습니다. J에 합칠 줄 수를 줄 수 있으며, 예를 들어 3J는 3줄을 합칩니다. 편집기는 적절한 경우 합쳐진 줄의 접합부에 공백을 제공하며, 커서를 이 공백에 남깁니다. 원하지 않는 경우 x로 이 공백을 제거할 수 있습니다.


## Features for editing programs
  The editor has a number of commands for editing programs. The thing that most distinguishes editing of programs from editing of text is the desirability of maintaining an indented structure to the body of the program. The editor has a autoindent facility for helping you generate correctly indented programs.

편집기에는 프로그램을 편집하기 위한 여러 명령들이 있습니다. 프로그램 편집과 일반 텍스트 편집을 가장 뚜렷하게 구분 짓는 것은 프로그램 본문의 들여쓰기 구조를 유지하는 것이 바람직하다는 점입니다. 편집기에는 올바르게 들여쓰기된 프로그램을 작성하는 데 도움을 주는 자동 들여쓰기 기능이 있습니다.

  To enable this facility you can give the command :se aiCR. Now try opening a new line with o and type some characters on the line after a few tabs. If you now start another line, notice that the editor supplies white space at the beginning of the line to line it up with the previous line. You cannot backspace over this indentation, but you can use ^D key to backtab over the supplied indentation.

이 기능을 활성화하려면 `:se aiCR` 명령을 입력하십시오. 이제 `o`로 새 줄을 열고 몇 번 탭을 누른 후 줄에 문자를 입력해 보십시오. 다음 줄을 시작하면, 편집기가 줄의 시작 부분에 공백을 자동으로 추가해서 이전 줄과 맞추는 것을 확인할 수 있습니다. 이 들여쓰기는 백스페이스로 지울 수 없지만, 제공된 들여쓰기를 되돌리려면 `^D` 키를 사용할 수 있습니다.

  Each time you type ^D you back up one position, normally to an 8 column boundary. This amount is settable; the editor has an option called shiftwidth which you can set to change this value. Try giving the command :se sw=4CR and then experimenting with autoindent again.

^D를 입력할 때마다 한 위치씩 뒤로 이동하며, 일반적으로 8열 경계까지 이동합니다. 이 값은 설정할 수 있으며, 편집기에는 shiftwidth라는 옵션이 있어 이 값을 변경할 수 있습니다. `:se sw=4CR` 명령을 입력한 다음 자동 들여쓰기를 다시 실험해 보십시오.

  For shifting lines in the program left and right, there are operators < and >. These shift the lines you specify right or left by one shiftwidth. Try << and >> which shift one line left or right, and <L and >L shifting the rest of the display left and right.

프로그램에서 줄을 왼쪽이나 오른쪽으로 이동시키기 위해 `<`와 `>` 연산자가 있습니다. 이들은 지정한 줄을 한 shiftwidth만큼 오른쪽이나 왼쪽으로 이동시킵니다. `<<`와 `>>`는 한 줄을 왼쪽이나 오른쪽으로 이동시키며, `<L`과 `>L`은 화면의 나머지 부분을 왼쪽이나 오른쪽으로 이동시킵니다.

  If you have a complicated expression and wish to see how the parentheses match, put the cursor at a left or right parenthesis and hit %. This will show you the matching parenthesis. This works also for braces { and }, and brackets [ and ].

복잡한 표현식이 있고 괄호의 짝을 확인하고 싶다면, 커서를 왼쪽 또는 오른쪽 괄호에 놓고 `%` 키를 누르십시오. 그러면 짝이 되는 괄호를 보여줍니다. 이 기능은 중괄호 `{`, `}` 및 대괄호 `[`, `]`에도 작동합니다.

  If you are editing C programs, you can use the [[ and ]] keys to advance or retreat to a line starting with a {, i.e. a function declaration at a time. When ]] is used with an operator it stops after a line which starts with }; this is sometimes useful with y]].

C 프로그램을 편집할 때는 `[[` 및 `]]` 키를 사용해서 `{`로 시작하는 줄, 즉 함수 선언이 있는 줄로 앞으로 또는 뒤로 이동할 수 있습니다. `]]`를 연산자와 함께 사용할 경우 `};`로 시작하는 줄 이후에 멈추며, 이는 `y]]`와 함께 사용할 때 유용한 경우가 있습니다.


## Filtering portions of the buffer
  You can run system commands over portions of the buffer using the operator !. You can use this to sort lines in the buffer, or to reformat portions of the buffer with a pretty-printer. Try typing in a list of random words, one per line and ending them with a blank line. Back up to the beginning of the list, and then give the command !}sortCR. This says to sort the next paragraph of material, and the blank line ends a paragraph.

버퍼의 일부에 대해 시스템 명령을 실행하려면 `!` 연산자를 사용할 수 있습니다. 이를 이용해 버퍼의 줄들을 정렬하거나, 예쁘게 출력하는 프로그램으로 일부를 다시 포맷할 수 있습니다. 무작위 단어 목록을 한 줄에 하나씩 입력하고 빈 줄로 끝내 보십시오. 목록의 시작 부분으로 되돌아간 다음 `!}sortCR` 명령을 입력하십시오. 이 명령은 다음 단락의 내용을 정렬하라는 뜻이며, 빈 줄이 단락의 끝을 나타냅니다.



## Commands for editing LISP
  If you are editing a LISP program you should set the option lisp by doing :se lispCR. This changes the ( and ) commands to move backward and forward over s-expressions. The { and } commands are like ( and ) but don't stop at atoms. These can be used to skip to the next list, or through a comment quickly.

LISP 프로그램을 편집하고 있다면 `:se lispCR` 명령으로 lisp 옵션을 설정해야 합니다. 이렇게 하면 `(` 및 `)` 명령이 s-표현식을 기준으로 앞뒤로 이동하도록 변경됩니다. `{` 및 `}` 명령은 `(` 및 `)`와 유사하지만 원자(atom)에서는 멈추지 않습니다. 이 명령들은 다음 리스트로 건너뛰거나 주석을 빠르게 통과하는 데 사용할 수 있습니다.

  The autoindent option works differently for LISP, supplying indent to align at the first argument to the last open list. If there is no such argument then the indent is two spaces more than the last level.

자동 들여쓰기(autoindent) 옵션은 LISP에서는 다르게 작동하며, 마지막으로 열린 리스트의 첫 번째 인자에 맞춰 들여쓰기를 제공합니다. 해당 인자가 없으면 들여쓰기는 이전 수준보다 두 칸 더 들어갑니다.

  There is another option which is useful for typing in LISP, the showmatch option. Try setting it with :se smCR and then try typing a '(' some words and then a ')'. Notice that the cursor shows the position of the '(' which matches the ')' briefly. This happens only if the matching '(' is on the screen, and the cursor stays there for at most one second.

LISP를 입력할 때 유용한 또 다른 옵션은 showmatch 옵션입니다. `:se smCR` 명령으로 설정해 보십시오. 그런 다음 `(`를 입력하고 몇 단어를 입력한 후 `)`를 입력해 보십시오. 커서가 일치하는 `(`의 위치를 잠시 보여주는 것을 확인할 수 있습니다. 이 동작은 일치하는 `(`가 화면에 있을 때만 발생하며, 커서는 최대 1초 동안 그 위치에 머뭅니다.

  The editor also has an operator to realign existing lines as though they had been typed in with lisp and autoindent set. This is the = operator. Try the command =% at the beginning of a function. This will realign all the lines of the function declaration.

편집기에는 기존 줄들을 마치 lisp 및 autoindent가 설정된 상태에서 입력된 것처럼 다시 정렬하는 연산자가 있습니다. 이것이 `=` 연산자입니다. 함수의 시작 부분에서 `=%` 명령을 시도해 보십시오. 이 명령은 함수 선언의 모든 줄을 다시 정렬합니다.

  When you are editing LISP,, the [[ and ]] advance and retreat to lines beginning with a (, and are useful for dealing with entire function definitions.

LISP를 편집할 때 `[[`와 `]]`는 `(`로 시작하는 줄로 앞으로 또는 뒤로 이동하며, 전체 함수 정의를 다룰 때 유용합니다.


## Macros
  Vi has a parameterless macro facility, which lets you set it up so that when you hit a single keystroke, the editor will act as though you had hit some longer sequence of keys. You can set this up if you find yourself typing the same sequence of commands repeatedly.

Vi에는 매개변수가 없는 매크로 기능이 있어, 단일 키를 누르면 편집기가 더 긴 키 입력 시퀀스를 누른 것처럼 작동하도록 설정할 수 있습니다. 반복해서 동일한 명령 시퀀스를 입력하게 될 경우 이 기능을 설정할 수 있습니다.

  Briefly, there are two flavors of macros:

간단히 말해서, 매크로에는 두 가지 종류가 있습니다:

a)
Ones where you put the macro body in a buffer register, say x. You can then type @x to invoke the macro. The @ may be followed by another @ to repeat the last macro.
 

매크로 본문을 버퍼 레지스터(예: x)에 넣는 경우. 그런 다음 `@x`를 입력하여 매크로를 호출할 수 있다. `@` 뒤에 또 다른 `@`를 붙이면 마지막 매크로를 반복 실행할 수 있다.  

b)
You can use the map command from vi (typically in your EXINIT) with a command of the form:

vi에서 (일반적으로 EXINIT에서)  map 명령을 다음 형식으로 사용할 수 있습니다:

```
:map lhs rhsCR
```

mapping lhs into rhs. There are restrictions: lhs should be one keystroke (either 1 character or one function key) since it must be entered within one second (unless notimeout is set, in which case you can type it as slowly as you wish, and vi will wait for you to finish it before it echoes anything). The lhs can be no longer than 10 characters, the rhs no longer than 100. To get a space, tab or newline into lhs or rhs you should escape them with a ^V. (It may be necessary to double the ^V if the map command is given inside vi, rather than in ex.) Spaces and tabs inside the rhs need not be escaped.

이것은 `lhs` 를 `rhs` 로 매핑합니다. 몇 가지 제한이 있습니다: `lhs` 는 하나의 키 입력(1 개의 문자 또는 하나의 기능 키)이어야 하며, 1초 이내에 입력되어야 합니다. (단, `notimeout` 이 설정된 경우 원하는 만큼 천천히 입력할 수 있으며, vi는 사용자가 입력을 마칠 때까지 아무 것도 출력하지 않고 기다립니다.) 

`lhs` 는 10자 이하, `rhs` 는 100자 이하이어야 합니다. `lhs` 나 `rhs` 에 공백, 탭 또는 줄바꿈을 넣으려면 `^V` 로 이스케이프해야 합니다. (vi 내부에서 map 명령을 줄 경우 `^V` 를 두 번 입력할 수도 있습니다.) `rhs` 내부의 공백과 탭은 이스케이프하지 않아도 됩니다.

Thus to make the q key write and exit the editor, you can give the command

따라서, `q` 키로 편집기를 저장하고 종료하도록 만들기 위해, 다음 명령을 입력할 수 있습니다.

```
:map q :wq^V^VCR CR
```

which means that whenever you type q, it will be as though you had typed the four characters :wqCR. A ^V's is needed because without it the CR would end the : command, rather than becoming part of the map definition. There are two ^V's because from within vi, two ^V's must be typed to get one. The first CR is part of the rhs, the second terminates the : command.

즉, q를 입력할 때마다 마치 네 글자 `:wqCR`을 입력한 것과 같아진다는 뜻입니다.  `^V`가 필요한 이유는, 그렇지 않으면 `CR`이 `:` 명령을 끝내버리고 매핑 정의의 일부가 되지 않기 때문입니다. `vi` 안에서는 하나의 `^V`를 얻기 위해 두 번 입력해야 하므로 `^V`가 두 개 들어갑니다. 첫 번째 `CR`은 매핑의 오른쪽 부분(rhs)에 포함되고, 두 번째 `CR`은 `:` 명령을 종료합니다.

  Macros can be deleted with

```
unmap lhs
```

  If the lhs of a macro is “#0” through “#9”, this maps the particular function key instead of the 2 character “#” sequence. So that terminals without function keys can access such definitions, the form “#x” will mean function key x on all terminals (and need not be typed within one second.) The character “#” can be changed by using a macro in the usual way:

매크로의 왼쪽 부분(lhs)이 “#0”부터 “#9”까지라면, 이는 두 글자의 “#” 시퀀스가 아니라 해당 기능 키(function key)에 매핑됩니다.  
기능 키가 없는 터미널에서도 이러한 정의에 접근할 수 있도록, “#x” 형식은 모든 터미널에서 기능 키 x를 의미하며(1초 이내에 입력할 필요가 없습니다),  
문자 “#”는 일반적인 매크로 방식으로 변경할 수 있습니다.

```
:map ^V^V^I #
```

to use tab, for example. (This won't affect the map command, which still uses #, but just the invocation from visual mode.
  The undo command reverses an entire macro call as a unit, if it made any changes.

예를 들어 Tab 키를 사용하도록 할 수 있습니다.  
(이는 여전히 `#`를 사용하는 `map` 명령에는 영향을 주지 않고, 단지 비주얼 모드에서의 호출에만 적용됩니다.)  
`undo` 명령은 매크로 호출이 변경을 가했을 경우, 그 전체를 하나의 단위로 되돌립니다.


  Placing a '!' after the word map causes the mapping to apply to input mode, rather than command mode. Thus, to arrange for ^T to be the same as 4 spaces in input mode, you can type:

`map`라는 단어 뒤에 `!`를 붙이면 매핑이 명령 모드가 아니라 입력 모드에 적용됩니다.  
따라서 입력 모드에서 `^T`를 4개의 공백과 동일하게 동작하도록 하려면, 다음과 같이 입력할 수 있습니다:  

```
:map! ^T ^Vb/b/b/b/
```

where b/ is a blank. The ^V is necessary to prevent the blanks from being taken as white space between the lhs and rhs.

여기서 `b/`는 공백(blank)을 의미합니다.  
`^V`는 공백이 lhs와 rhs 사이의 구분용 공백으로 인식되지 않도록 하기 위해 필요합니다.


## Word Abbreviations
  A feature similar to macros in input mode is word abbreviation. This allows you to type a short word and have it expanded into a longer word or words. The commands are :abbreviate and :unabbreviate (:ab and :una) and have the same syntax as :map. For example:

입력 모드에서 매크로와 비슷한 기능으로 **단어 축약(abbreviation)**이 있습니다.  
이 기능을 사용하면 짧은 단어를 입력했을 때 자동으로 더 긴 단어나 구절로 확장됩니다.  
명령어는 `:abbreviate`와 `:unabbreviate` (`:ab`와 `:una`)이며, 구문은 `:map`과 동일합니다.  
예를 들어:

```
:ab eecs Electrical Engineering and Computer Sciences
```

causes the word 'eecs' to always be changed into the phrase 'Electrical Engineering and Computer Sciences'. Word abbreviation is different from macros in that only whole words are affected. If 'eecs' were typed as part of a larger word, it would be left alone. Also, the partial word is echoed as it is typed. There is no need for an abbreviation to be a single keystroke, as it should be with a macro.

단어 `eecs`가 항상 `Electrical Engineering and Computer Sciences`라는 구절로 바뀌게 됩니다.  
단어 축약(abbreviation)은 매크로와 달리 **전체 단어**에만 적용됩니다.  
따라서 `eecs`가 더 긴 단어의 일부로 입력되면 변경되지 않습니다.  
또한, 단어가 완성되기 전까지는 입력한 부분 단어가 그대로 화면에 표시됩니다.  
매크로와 달리, 축약어는 반드시 한 번의 키 입력일 필요가 없습니다.


## Abbreviations
  The editor has a number of short commands which abbreviate longer commands which we have introduced here. You can find these commands easily on the quick reference card. They often save a bit of typing and you can learn them as convenient.

편집기에는 여기서 소개한 긴 명령들을 줄여 쓸 수 있는 여러 **짧은 명령어**가 있습니다.  
이 명령어들은 **빠른 참조 카드(quick reference card)**에서 쉽게 찾을 수 있습니다.  
이들을 사용하면 입력을 조금 줄일 수 있고, 필요할 때마다 익혀서 활용할 수 있습니다.





# Nitty-gritty details
## Line representation in the display
  The editor folds long logical lines onto many physical lines in the display. Commands which advance lines advance logical lines and will skip over all the segments of a line in one motion. The command | moves the cursor to a specific column, and may be useful for getting near the middle of a long line to split it in half. Try 80| on a line which is more than 80 columns long (footnote 7-1).

편집기는 긴 논리 줄을 화면에서 여러 개의 물리 줄로 접습니다. 줄을 앞으로 이동하는 명령은 논리 줄을 이동하며, 한 번에 그 줄의 모든 구간을 건너뜁니다. `|` 명령은 커서를 지정한 열로 옮기며, 긴 줄의 중간 근처로 이동해 그것을 반으로 나누는 데 유용할 수 있습니다. 80자보다 긴 줄에서 `80|`을 시도해 보십시오(각주 7-1).

  The editor only puts full lines on the display; if there is not enough room on the display to fit a logical line, the editor leaves the physical line empty, placing only an @ on the line as a place holder. When you delete lines on a dumb terminal, the editor will often just clear the lines to @ to save time (rather than rewriting the rest of the screen.) You can always maximize the information on the screen by giving the ^R command.

편집기는 화면에 전체 줄만 표시합니다. 논리 줄을 표시할 공간이 충분하지 않으면, 해당 물리 줄을 비워 두고 줄에 `@`만 배치해서 자리 표시자로 사용합니다. 더미 터미널(dumb terminal)에서 줄을 삭제할 때, 편집기는 종종 화면의 나머지를 다시 쓰는 대신 시간을 절약하기 위해 그 줄들을 `@`로 지웁니다. `^R` 명령을 사용하면 화면에 표시되는 정보를 항상 최대화할 수 있습니다.

  If you wish, you can have the editor place line numbers before each line on the display. Give the command :se nuCR to enable this, and the command :se nonuCR to turn it off. You can have tabs represented as ^I and the ends of lines indicated with '$' by giving the command :se listCR; :se nolistCR turns this off.

원한다면, 편집기가 화면의 각 줄 앞에 줄 번호를 표시하도록 할 수 있습니다. 이를 활성화하려면 `:se nuCR` 명령을, 끄려면 `:se nonuCR` 명령을 입력합니다. 탭을 `^I` 로, 줄 끝을 `$` 로 표시하려면 `:se listCR` 명령을 사용하고, 이를 해제하려면 `:se nolistCR` 명령을 사용합니다.

  Finally, lines consisting of only the character '~' are displayed when the last line in the file is in the middle of the screen. These represent physical lines which are past the logical end of file.

마지막 줄이 화면의 중간에 있을 때, `~` 문자만으로 이루어진 줄들이 표시됩니다. 이것들은 논리적인 파일의 끝을 지난 물리 줄들을 나타냅니다.



## Counts
  Most vi commands will use a preceding count to affect their behavior in some way. The following table gives the common ways in which the counts are used:

대부분의 vi 명령은 앞에 붙는 숫자(count)를 사용해서 동작 방식에 어떤 식으로든 영향을 줍니다.  

다음 표는 숫자가 사용되는 일반적인 방법을 보여줍니다.

| Function Category     | Keys/Commands             |
|-----------------------|---------------------------|
| new window size       | : / ? [[ ]] ` ´           |
| scroll amount         | ^D ^U                     |
| line/column number    | z G \|                    |
| repeat effect         | most of the rest          |

  The editor maintains a notion of the current default window size. On terminals which run at speeds greater than 1200 baud the editor uses the full terminal screen. On terminals which are slower than 1200 baud (most dialup lines are in this group) the editor uses 8 lines as the default window size. At 1200 baud the default is 16 lines.

편집기는 현재 기본 창 크기에 대한 개념을 유지합니다. 속도가 1200보드(baud)보다 빠른 터미널에서는 전체 터미널 화면을 사용합니다. 1200보드보다 느린 터미널(대부분의 전화 접속 회선이 여기에 해당)에서는 기본 창 크기로 8줄을 사용합니다. 1200보드에서는 기본값이 16줄입니다.

  This size is the size used when the editor clears and refills the screen after a search or other motion moves far from the edge of the current window. The commands which take a new window size as count all often cause the screen to be redrawn. If you anticipate this, but do not need as large a window as you are currently using, you may wish to change the screen size by specifying the new size before these commands. In any case, the number of lines used on the screen will expand if you move off the top with a - or similar command or off the bottom with a command such as RETURN or ^D. The window will revert to the last specified size the next time it is cleared and refilled (footnote 7-2).

이 크기는, 검색이나 다른 이동으로 현재 창의 가장자리에서 멀리 이동했을 때 편집기가 화면을 지우고 다시 채울 때 사용되는 크기입니다.  
새 창 크기를 숫자(count)로 받는 명령들은 종종 화면을 다시 그리게 됩니다.  
이런 상황이 예상되지만 현재 사용 중인 창만큼 크게 필요하지 않다면, 해당 명령을 실행하기 전에 새 크기를 지정해서 화면 크기를 변경할 수 있습니다.  

어쨌든, `-`나 이와 비슷한 명령으로 화면 위쪽을 벗어나거나, `RETURN`이나 `^D` 같은 명령으로 아래쪽을 벗어나면 화면에 사용되는 줄 수가 늘어납니다.  
창은 다음에 화면이 지워지고 다시 채워질 때 마지막으로 지정한 크기로 되돌아갑니다(각주 7-2).

  The scroll commands ^D and ^U likewise remember the amount of scroll last specified, using half the basic window size initially. The simple insert commands use a count to specify a repetition of the inserted text. Thus 10a+----ESC will insert a grid-like string of text. A few commands also use a preceding count as a line or column number.

스크롤 명령어 `^D`와 `^U`도 마찬가지로 마지막에 지정된 스크롤 양을 기억하며, 처음에는 기본 창 크기의 절반을 사용합니다.  
단순 삽입 명령은 숫자(count)를 사용해서 삽입할 텍스트의 반복 횟수를 지정합니다.  
따라서 `10a+----ESC`는 격자 모양의 문자열을 삽입합니다.  
몇몇 명령은 앞에 붙는 숫자를 줄 번호나 열 번호로 사용하기도 합니다.

  Except for a few commands which ignore any counts (such as ^R), the rest of the editor commands use a count to indicate a simple repetition of their effect. Thus 5w advances five words on the current line, while 5RETURN advances five lines. A very useful instance of a count as a repetition is a count given to the . command, which repeats the last changing command. If you do dw and then 3., you will delete first one and then three words. You can then delete two more words with 2..

`^R`처럼 숫자(count)를 무시하는 몇몇 명령을 제외하면, 나머지 편집기 명령들은 숫자를 사용해 그 효과를 단순 반복합니다.  
예를 들어 `5w`는 현재 줄에서 다섯 단어 앞으로 이동하고, `5RETURN`은 다섯 줄 앞으로 이동합니다.  

숫자를 반복 횟수로 사용하는 아주 유용한 예는 `.` 명령에 숫자를 주는 경우입니다.  
`.` 명령은 마지막으로 수행한 변경 명령을 반복합니다.  
예를 들어 `dw`를 실행한 뒤 `3.`을 입력하면, 먼저 한 단어를 지우고 이어서 세 단어를 지웁니다.  
그 다음 `2.`를 입력하면 두 단어를 더 지웁니다.



## More file manipulation commands
  The following table lists the file manipulation commands which you can use when you are in vi.

다음 표는 vi에서 사용할 수 있는 파일 조작 명령들을 나열한 것입니다.


| Command        | Description                                           |
|----------------|-------------------------------------------------------|
| :w             | write back changes                                    |
| :wq            | write and quit                                        |
| :x             | write (if necessary) and quit (same as ZZ)            |
| :e name        | edit file name                                        |
| :e!            | reedit, discarding changes                            |
| :e + name      | edit, starting at end                                 |
| :e +n          | edit, starting at line n                              |
| :e #           | edit alternate file                                   |
| :w name        | write file name                                       |
| :w! name       | overwrite file name                                   |
| :x,yw name     | write lines x through y to name                       |
| :r name        | read file name into buffer                            |
| :r !cmd        | read output of cmd into buffer                        |
| :n             | edit next file in argument list                       |
| :n!            | edit next file, discarding changes to current         |
| :n args        | specify new argument list                             |
| :ta tag        | edit file containing tag `tag`, at tag                |




| 명령(Command) | 설명(직역) |
|---------------|-----------|
| :w | 변경 사항을 저장(write back) |
| :wq | 저장하고 종료 |
| :x | (필요하면) 저장하고 종료 (ZZ와 동일) |
| :e name | 파일 `name`을 편집 |
| :e! | 변경 사항을 버리고 다시 편집 |
| :e + name | 파일을 열고 끝에서 시작 |
| :e +n | 파일을 열고 n번째 줄에서 시작 |
| :e # | 대체 파일을 편집 |
| :w name | 파일을 `name`으로 저장 |
| :w! name | 파일을 `name`으로 덮어씀 |
| :x,yw name | x번째 줄부터 y번째 줄까지를 `name`에 저장 |
| :r name | 파일 `name`을 버퍼에 읽어옴 |
| :r !cmd | 명령 `cmd`의 출력을 버퍼에 읽어옴 |
| :n | 인자 목록의 다음 파일을 편집 |
| :n! | 현재 변경 사항을 버리고 인자 목록의 다음 파일을 편집 |
| :n args | 새로운 인자 목록을 지정 |
| :ta tag | 태그 `tag`가 있는 파일을 열어 해당 위치에서 편집 |


All of these commands are followed by a CR or ESC. The most basic commands are :w and :e. A normal editing session on a single file will end with a ZZ command. If you are editing for a long period of time you can give :w commands occasionally after major amounts of editing, and then finish with a ZZ. When you edit more than one file, you can finish with one with a :w and start editing a new file by giving a :e command, or set autowrite and use :n <file>.

이 모든 명령은 CR 또는 ESC로 끝납니다.  
가장 기본적인 명령은 `:w`와 `:e`입니다.  
단일 파일을 편집하는 일반적인 세션은 `ZZ` 명령으로 종료됩니다.  
오랫동안 편집하는 경우, 많은 양의 편집 작업 후에 가끔 `:w` 명령을 실행하고, 마지막에 `ZZ`로 마무리할 수 있습니다.  

여러 파일을 편집할 때는, 한 파일을 `:w`로 저장한 뒤 `:e` 명령으로 새 파일을 열거나, `autowrite`를 설정하고 `:n <file>`을 사용해서 새 파일 편집을 시작할 수 있습니다.

  If you make changes to the editor's copy of a file, but do not wish to write them back, then you must give an ! after the command you would otherwise use; this forces the editor to discard any changes you have made. Use this carefully.

편집기의 파일 사본에 변경을 가했지만 이를 다시 저장하고 싶지 않은 경우, 원래 사용하려던 명령 뒤에 `!`를 붙여야 합니다.  
이렇게 하면 편집기가 지금까지 한 모든 변경 사항을 버리게 됩니다.  
주의해서 사용해야 합니다.

  The :e command can be given a + argument to start at the end of the file, or a +n argument to start at line n. In actuality, n may be any editor command not containing a space, usefully a scan like +/pat or +?pat. In forming new names to the e command, you can use the character % which is replaced by the current file name, or the character # which is replaced by the alternate file name. The alternate file name is generally the last name you typed other than the current file. Thus if you try to do a :e and get a diagnostic that you haven't written the file, you can give a :w command and then a :e # command to redo the previous :e.

`:e` 명령에는 `+` 인수를 주어 파일의 끝에서 시작하게 하거나, `+n` 인수를 주어 n번째 줄에서 시작하게 할 수 있습니다.  
실제로 n은 공백이 없는 어떤 편집기 명령도 될 수 있으며, `+/pat` 또는 `+?pat` 같은 검색 명령이 유용합니다.  

`:e` 명령에 새 파일 이름을 지정할 때 `%` 문자는 현재 파일 이름으로, `#` 문자는 대체 파일 이름으로 바뀝니다.  
대체 파일 이름은 일반적으로 현재 파일이 아닌 마지막으로 입력한 파일 이름입니다.  

따라서 `:e`를 실행했을 때 "파일을 저장하지 않았다"는 진단 메시지가 나오면, 먼저 `:w` 명령으로 저장한 뒤 `:e #` 명령을 실행해서 이전 `:e`를 다시 수행할 수 있습니다.

  You can write part of the buffer to a file by finding out the lines that bound the range to be written using ^G, and giving these numbers after the : and before the w, separated by ,'s. You can also mark these lines with m and then use an address of the form 'x,'y on the w command here.

`^G`를 사용해서 저장할 범위를 이루는 줄 번호를 확인한 뒤, 그 번호들을 `:` 뒤에, `w` 앞에 `,`로 구분해서 입력하면 버퍼의 일부를 파일에 쓸 수 있습니다.  
또한, 해당 줄들을 `m` 명령으로 표시(mark)한 다음, `w` 명령에서 `'x,'y` 형태의 주소를 사용해서 저장할 수도 있습니다.

  You can read another file into the buffer after the current line by using the :r command. You can similarly read in the output from a command, just use !cmd instead of a file name.

`:r` 명령을 사용하면 현재 줄 뒤에 다른 파일을 버퍼로 읽어들일 수 있습니다.  
마찬가지로, 파일 이름 대신 `!cmd`를 사용하면 명령의 출력을 읽어들일 수 있습니다.

  If you wish to edit a set of files in succession, you can give all the names on the command line, and then edit each one in turn using the command :n. It is also possible to respecify the list of files to be edited by giving the :n command a list of file names, or a pattern to be expanded as you would have given it on the initial vi command.

연속해서 여러 파일을 편집하려면, 명령줄에 모든 파일 이름을 지정한 뒤 `:n` 명령을 사용해서 차례로 각 파일을 편집할 수 있습니다.  
또한, `:n` 명령에 파일 이름 목록이나, 초기 vi 명령에서 사용했던 것처럼 확장될 패턴을 지정해서 편집할 파일 목록을 다시 설정할 수도 있습니다.

  If you are editing large programs, you will find the :ta command very useful. It utilizes a data base of function names and their locations, which can be created by programs such as ctags, to quickly find a function whose name you give. If the :ta command will require the editor to switch files, then you must :w or abandon any changes before switching. You can repeat the :ta command without any arguments to look for the same tag again.

큰 프로그램을 편집할 때는 `:ta` 명령이 매우 유용합니다.  
이 명령은 `ctags`와 같은 프로그램으로 생성할 수 있는 **함수 이름과 그 위치에 대한 데이터베이스**를 활용해서, 지정한 함수 이름을 빠르게 찾습니다.  

`:ta` 명령이 파일 전환을 필요로 하는 경우, 전환 전에 반드시 `:w`로 저장하거나 변경 사항을 포기해야 합니다.  
또한, 인수 없이 `:ta`를 반복 실행하면 이전에 찾았던 동일한 태그를 다시 검색합니다.


## More about searching for strings
  When you are searching for strings in the file with / and ?, the editor normally places you at the next or previous occurrence of the string. If you are using an operator such as d, c or y, then you may well wish to affect lines up to the line before the line containing the pattern. You can give a search of the form /pat/-n to refer to the n'th line before the next line containing pat, or you can use + instead of - to refer to the lines after the one containing pat. If you don't give a line offset, then the editor will affect characters up to the match place, rather than whole lines; thus use “+0” to affect to the line which matches.

`/`와 `?`로 파일에서 문자열을 검색하면, 편집기는 기본적으로 해당 문자열의 다음 또는 이전 위치로 이동합니다.  
`d`, `c`, `y`와 같은 연산자를 사용할 때는, 패턴이 포함된 줄의 바로 이전 줄까지 영향을 주고 싶을 수 있습니다.  

이 경우 `/pat/-n` 형태로 검색하면, 다음에 나오는 `pat`가 포함된 줄의 **n줄 전**을 가리킬 수 있습니다.  
반대로 `-` 대신 `+`를 사용하면, `pat`가 포함된 줄 **이후의 줄**을 가리킵니다.  

줄 오프셋을 지정하지 않으면, 편집기는 전체 줄이 아니라 **일치하는 위치까지의 문자**에만 영향을 줍니다.  
따라서 해당 줄 전체에 영향을 주려면 `+0`을 사용해서 **일치하는 줄**을 지정하면 됩니다.

  You can have the editor ignore the case of words in the searches it does by giving the command :se icCR. The command :se noicCR turns this off.

편집기가 검색 시 단어의 대소문자를 무시하도록 하려면 `:se icCR` 명령을 사용하면 됩니다.  
이 기능을 끄려면 `:se noicCR` 명령을 사용합니다.

  Strings given to searches may actually be regular expressions. If you do not want or need this facility, you should

검색에 사용되는 문자열은 실제로 정규 표현식일 수 있습니다.  
이 기능을 원하지 않거나 필요하지 않다면, `nomagic` 설정을 사용해야 합니다.

```
set nomagic
```

in your EXINIT. In this case, only the characters ↑ and $ are special in patterns. The character \ is also then special (as it is most everywhere in the system), and may be used to get at the an extended pattern matching facility. It is also necessary to use a \ before a / in a forward scan or a ? in a backward scan, in any case. The following table gives the extended forms when magic is set.

당신의 `EXINIT`에 설정하십시오.  
이 경우, 패턴에서 특수한 문자는 `↑`와 `$`뿐입니다.  
문자 `\`도(시스템 전반에서 그렇듯) 특수하게 취급되며, 이를 사용해 확장된 패턴 매칭 기능을 사용할 수 있습니다.  

또한, 순방향 검색에서는 `/` 앞에, 역방향 검색에서는 `?` 앞에 반드시 `\`를 붙여야 합니다.  
다음 표는 `magic`이 설정되었을 때의 확장 형태를 보여줍니다.


| Pattern     | Description                                           |
|-------------|-------------------------------------------------------|
| ↑           | at beginning of pattern, matches beginning of line    |
| $           | at end of pattern, matches end of line                |
| .           | matches any character                                 |
| \<          | matches the beginning of a word                       |
| \>          | matches the end of a word                             |
| [str]       | matches any single character in str                   |
| [^str]      | matches any single character **not** in str           |
| [x-y]       | matches any character between x and y                 |
| *           | matches any number of the preceding pattern           |



| 패턴(Pattern) | 설명(직역) |
|---------------|-----------|
| ↑ | 패턴의 시작에서, 줄의 시작과 일치 |
| $ | 패턴의 끝에서, 줄의 끝과 일치 |
| . | 임의의 문자와 일치 |
| \< | 단어의 시작과 일치 |
| \> | 단어의 끝과 일치 |
| [str] | `str` 안의 임의의 한 문자와 일치 |
| [^str] | `str` 안에 없는 임의의 한 문자와 일치 |
| [x-y] | x와 y 사이의 임의의 문자와 일치 |
| * | 앞선 패턴이 0번 이상 반복되는 것과 일치 |


If you use nomagic mode, then the . [ and * primitives are given with a preceding \.

`nomagic` 모드를 사용하면, `.` , `[` , `*` 원시 패턴(primitive)은 앞에 `\`를 붙여서 사용해야 합니다.



## More about input mode
  There are a number of characters which you can use to make corrections during input mode. These are summarized in the following table.

입력 모드에서 수정 작업을 할 때 사용할 수 있는 여러 문자가 있습니다.  
이 문자들은 다음 표에 요약되어 있습니다.


| Key/Command | Description                                                       |
|-------------|-------------------------------------------------------------------|
| ^H          | deletes the last input character                                  |
| ^W          | deletes the last input word, defined as by `b`                    |
| erase       | your erase character, same as ^H                                  |
| kill        | your kill character, deletes the input on this line               |
| \           | escapes a following ^H and your erase and kill                    |
| ESC         | ends an insertion                                                 |
| DEL         | interrupts an insertion, terminating it abnormally               |
| CR          | starts a new line                                                 |
| ^D          | backtabs over autoindent                                          |
| 0^D         | kills all the autoindent                                          |
| ↑^D         | same as 0^D, but restores indent next line                        |
| ^V          | quotes the next non-printing character into the file              |



| 키/명령(Key/Command) | 설명(직역) |
|----------------------|-----------|
| ^H | 마지막 입력 문자를 삭제 |
| ^W | 마지막 입력 단어를 삭제 (`b`로 정의된 단어 기준) |
| erase | 사용자의 erase 문자, ^H와 동일 |
| kill | 사용자의 kill 문자, 현재 줄의 입력을 삭제 |
| \ | 뒤따르는 ^H, erase, kill을 이스케이프 처리 |
| ESC | 입력 모드를 종료 |
| DEL | 입력을 중단하고 비정상적으로 종료 |
| CR | 새 줄을 시작 |
| ^D | 자동 들여쓰기에서 역탭(backtab) |
| 0^D | 모든 자동 들여쓰기를 제거 |
| ↑^D | 0^D와 동일하지만, 다음 줄에서 들여쓰기를 복원 |
| ^V | 다음 비인쇄 문자를 파일에 인용(그대로 입력) |




  The most usual way of making corrections to input is by typing ^H to correct a single character, or by typing one or more ^W's to back over incorrect words. If you use # as your erase character in the normal system, it will work like ^H.

가장 일반적인 입력 수정 방법은 `^H`를 눌러 한 글자를 고치거나, `^W`를 한 번 이상 눌러 잘못 입력한 단어를 지우는 것입니다.  
일반 시스템에서 `#`를 지우기(erase) 문자로 사용한다면, 이는 `^H`와 동일하게 동작합니다.

  Your system kill character, normally @, ^X or ^U, will erase all the input you have given on the current line. In general, you can neither erase input back around a line boundary nor can you erase characters which you did not insert with this insertion command. To make corrections on the previous line after a new line has been started you can hit ESC to end the insertion, move over and make the correction, and then return to where you were to continue. The command A which appends at the end of the current line is often useful for continuing.

시스템의 kill 문자(일반적으로 `@`, `^X`, 또는 `^U`)는 현재 줄에서 입력한 모든 내용을 지웁니다.  
일반적으로 줄 경계를 넘어 입력을 지우거나, 이번 삽입 명령으로 입력하지 않은 문자를 지울 수는 없습니다.  

새 줄을 시작한 뒤 이전 줄을 수정하려면, `ESC`를 눌러 삽입을 종료하고, 커서를 이동해 수정한 다음, 다시 원래 위치로 돌아와 계속 입력하면 됩니다.  
현재 줄 끝에 이어서 입력하려면 `A` 명령이 자주 유용합니다.


  If you wish to type in your erase or kill character (say # or @) then you must precede it with a \, just as you would do at the normal system command level. A more general way of typing non-printing characters into the file is to precede them with a ^V. The ^V echoes as a ↑ character on which the cursor rests. This indicates that the editor expects you to type a control character. In fact you may type any character and it will be inserted into the file at that point (footnote 7-3).

지우기(erase) 문자나 kill 문자(예: `#` 또는 `@`)를 입력하려면, 일반 시스템 명령 수준에서와 마찬가지로 앞에 `\`를 붙여야 합니다.  
더 일반적인 방법으로, 인쇄되지 않는(non-printing) 문자를 파일에 입력하려면 앞에 `^V`를 붙입니다.  

`^V`를 입력하면 커서가 위치한 곳에 `↑` 문자가 표시되는데, 이는 편집기가 제어 문자 입력을 기다린다는 뜻입니다.  
이때는 어떤 문자든 입력할 수 있으며, 해당 문자가 그 위치에 그대로 삽입됩니다(각주 7-3).


  If you are using autoindent you can backtab over the indent which it supplies by typing a ^D. This backs up to a shiftwidth boundary. This only works immediately after the supplied autoindent.

자동 들여쓰기(autoindent)를 사용 중이라면, 편집기가 제공한 들여쓰기를 `^D`를 입력해서 되돌릴 수 있습니다.  
이 동작은 **shiftwidth** 단위 경계까지 들여쓰기를 줄여주며, 반드시 **자동으로 제공된 들여쓰기 직후**에만 작동합니다.

  When you are using autoindent you may wish to place a label at the left margin of a line. The way to do this easily is to type ↑ and then ^D. The editor will move the cursor to the left margin for one line, and restore the previous indent on the next. You can also type a 0 followed immediately by a ^D if you wish to kill all the indent and not have it come back on the next line.

자동 들여쓰기(autoindent)를 사용하는 동안, 줄의 왼쪽 여백(맨 앞)에 라벨을 배치하고 싶을 때가 있습니다.  
이때 가장 간단한 방법은 `↑`를 입력한 뒤 `^D`를 누르는 것입니다.  
그러면 편집기는 **해당 줄에서만** 커서를 왼쪽 여백으로 이동시키고, 다음 줄에서는 이전 들여쓰기를 복원합니다.  

만약 모든 들여쓰기를 완전히 제거하고, 다음 줄에도 들여쓰기가 돌아오지 않게 하려면 `0`을 입력한 직후 `^D`를 누르면 됩니다.



## Upper case only terminals
  If your terminal has only upper case, you can still use vi by using the normal system convention for typing on such a terminal. Characters which you normally type are converted to lower case, and you can type upper case letters by preceding them with a \. The characters { ~ } | ` are not available on such terminals, but you can escape them as \( \↑ \) \! \'. These characters are represented on the display in the same way they are typed (footnote 7-4).

터미널이 **대문자만 지원**하더라도, 해당 터미널에서 사용하는 일반적인 입력 규칙을 적용하면 vi를 사용할 수 있습니다.  
보통 입력하는 문자는 자동으로 소문자로 변환되며, 대문자를 입력하려면 앞에 `\`를 붙입니다.  

또한 `{`, `~`, `}`, `|`, `` ` `` 문자는 이런 터미널에서 직접 입력할 수 없지만, 다음과 같이 **이스케이프**해서 입력할 수 있습니다.  

```
\(   \↑   \)   \!   \'
```

이 문자들은 화면에 표시될 때도 입력한 그대로 나타납니다(각주 7-4).


## Vi and ex
  Vi is actually one mode of editing within the editor ex. When you are running vi you can escape to the line oriented editor of ex by giving the command Q. All of the : commands which were introduced above are available in ex. Likewise, most ex commands can be invoked from vi using :. Just give them without the : and follow them with a CR.

vi는 사실상 **ex 편집기** 안에 포함된 하나의 편집 모드입니다.  
vi를 실행 중일 때 `Q` 명령을 입력하면, **라인 지향(line-oriented)** 편집기인 ex 모드로 전환할 수 있습니다.  

앞서 소개한 모든 `:` 명령은 ex에서도 그대로 사용할 수 있습니다.  
반대로, 대부분의 ex 명령은 vi에서도 `:`를 붙여 실행할 수 있습니다.  
또는 `:` 없이 명령만 입력하고 **CR(Enter)**로 끝내면 vi 안에서 바로 실행됩니다.

  In rare instances, an internal error may occur in vi. In this case you will get a diagnostic and be left in the command mode of ex. You can then save your work and quit if you wish by giving a command x after the : which ex prompts you with, or you can reenter vi by giving ex a vi command.

드물게 vi에서 내부 오류가 발생할 수 있습니다.  
이 경우 진단 메시지가 표시되고, ex의 명령 모드로 전환됩니다.  

이 상태에서 작업을 저장하고 종료하려면, ex가 표시하는 `:` 프롬프트 뒤에 `x` 명령을 입력하면 됩니다.  
또는 `vi` 명령을 입력해서 다시 vi 모드로 돌아갈 수도 있습니다.

  There are a number of things which you can do more easily in ex than in vi. Systematic changes in line oriented material are particularly easy. You can read the advanced editing documents for the editor ed to find out a lot more about this style of editing. Experienced users often mix their use of ex command mode and vi command mode to speed the work they are doing.

ex에서는 vi보다 더 쉽게 할 수 있는 작업들이 몇 가지 있습니다.  
특히 **라인 지향(line-oriented)** 자료에서 체계적인 변경을 하는 데 매우 유리합니다.  

이러한 편집 방식에 대해 더 깊이 알고 싶다면, `ed` 편집기의 고급 편집 문서를 참고하면 많은 정보를 얻을 수 있습니다.  
숙련된 사용자들은 작업 속도를 높이기 위해 **ex 명령 모드**와 **vi 명령 모드**를 혼합해서 사용하는 경우가 많습니다.



## Open mode: vi on hardcopy terminals and “glass tty's”
  If you are on a hardcopy terminal or a terminal which does not have a cursor which can move off the bottom line, you can still use the command set of vi, but in a different mode. When you give a vi command, the editor will tell you that it is using open mode. This name comes from the open command in ex, which is used to get into the same mode.

하드카피 터미널이나, 커서가 화면의 맨 아래 줄을 벗어나 움직일 수 없는 터미널에서도 vi의 명령 집합을 사용할 수 있습니다.  
다만 이 경우에는 **다른 모드**로 동작하게 됩니다.  

vi 명령을 입력하면, 편집기는 **open mode**를 사용 중이라는 메시지를 표시합니다.  
이 이름은 ex 편집기의 `open` 명령에서 유래했으며, 해당 명령을 사용하면 동일한 모드로 진입할 수 있습니다.


  The only difference between visual mode and open mode is the way in which the text is displayed.

시각 모드와 오픈 모드의 유일한 차이점은 텍스트가 표시되는 방식이다.


  In open mode the editor uses a single line window into the file, and moving backward and forward in the file causes new lines to be displayed, always below the current line. Two commands of vi work differently in open: z and ^R. The z command does not take parameters, but rather draws a window of context around the current line and then returns you to the current line.

오픈 모드에서 편집기는 파일에 대해 한 줄짜리 창을 사용하며, 파일에서 앞뒤로 이동하면 항상 현재 줄 아래에 새 줄이 표시됩니다.  
vi의 두 명령어 `z`와 `^R`은 오픈 모드에서 다르게 동작합니다.  
`z` 명령은 매개변수를 받지 않고, 현재 줄을 중심으로 한 컨텍스트 창을 그린 뒤 다시 현재 줄로 돌아옵니다.

  If you are on a hardcopy terminal, the ^R command will retype the current line. On such terminals, the editor normally uses two lines to represent the current line. The first line is a copy of the line as you started to edit it, and you work on the line below this line. When you delete characters, the editor types a number of \'s to show you the characters which are deleted. The editor also reprints the current line soon after such changes so that you can see what the line looks like again.

하드카피 터미널에서는 `^R` 명령이 현재 줄을 다시 출력합니다.  
이러한 터미널에서 편집기는 보통 현재 줄을 두 줄로 표시합니다.  
첫 번째 줄은 편집을 시작했을 때의 줄 사본이고, 그 아래 줄에서 실제 편집 작업을 합니다.  
문자를 삭제하면, 편집기는 삭제된 문자의 개수만큼 `\` 문자를 출력해서 표시합니다.  
또한 이러한 변경이 있은 직후 현재 줄을 다시 출력해서 줄의 최신 상태를 확인할 수 있게 합니다.


  It is sometimes useful to use this mode on very slow terminals which can support vi in the full screen mode. You can do this by entering ex and using an open command.

이 모드는 전체 화면 모드에서 vi를 지원할 수 있는 매우 느린 터미널에서 유용하게 사용할 수 있습니다.  
이를 위해 ex로 들어가서 `open` 명령을 사용하면 됩니다.


Acknowledgements
  Bruce Englar encouraged the early development of this display editor. Peter Kessler helped bring sanity to version 2's command layout. Bill Joy wrote versions 1 and 2.0 through 2.7, and created the framework that users see in the present editor. Mark Horton added macros and other features and made the editor work on a large number of terminals and Unix systems.

브루스 잉글라(Bruce Englar)는 이 디스플레이 편집기의 초기 개발을 장려했습니다.  
피터 케슬러(Peter Kessler)는 버전 2의 명령 구성을 정리하는 데 기여했습니다.  
빌 조이(Bill Joy)는 1버전과 2.0부터 2.7까지를 작성했으며, 현재 편집기에서 사용자가 보는 기본 틀을 만들었습니다.  
마크 호튼(Mark Horton)은 매크로와 기타 기능을 추가하고, 이 편집기가 많은 터미널과 유닉스 시스템에서 동작하도록 만들었습니다.





Footnotes
  The financial support of an IBM Graduate Fellowship and the National Science Foundation under grants MCS74-07644-A03 and MCS78-07291 is gratefully acknowledged. 
IBM 대학원 펠로십과 미국 국립과학재단(National Science Foundation)의 연구비 MCS74-07644-A03 및 MCS78-07291의 재정 지원에 감사드립니다.


1-1
  If you gave the system an incorrect terminal type code then the editor may have just made a mess out of your screen. This happens when it sends control codes for one kind of terminal to some other kind of terminal. n this case hit the keys :q (colon and the q key) and then hit the RETURN key. This should get you back to the command level interpreter. Figure out what you did wrong (ask someone else if necessary) and try again.

시스템에 잘못된 터미널 유형 코드를 지정하면, 편집기가 화면을 엉망으로 만들 수 있습니다.  
이는 한 종류의 터미널에 맞는 제어 코드를 다른 종류의 터미널로 보내는 경우에 발생합니다.  
이 경우 `:q`(콜론과 q 키)를 입력한 뒤 **RETURN** 키를 누르십시오.  
그러면 명령어 수준 인터프리터로 돌아갈 수 있습니다.  
무엇이 잘못되었는지 확인하고(필요하면 다른 사람에게 물어보고) 다시 시도하십시오.

  Another thing which can go wrong is that you typed the wrong file name and the editor just printed an error diagnostic. In this case you should follow the above procedure for getting out of the editor, and try again this time spelling the file name correctly.

또 다른 문제로는 잘못된 파일 이름을 입력해서 편집기가 오류 진단만 출력하는 경우가 있습니다.  
이 경우 앞서 설명한 절차에 따라 편집기를 종료한 뒤, 이번에는 파일 이름을 올바르게 입력해서 다시 시도해야 합니다.

  If the editor doesn't seem to respond to the commands which you type here, try sending an interrupt to it by hitting the DEL or RUB key on your terminal, and then hitting the :q command again followed by a carriage return.

편집기가 여기서 입력한 명령에 반응하지 않는 것 같으면, 터미널에서 **DEL** 키나 **RUB** 키를 눌러 인터럽트를 보낸 뒤, `:q` 명령을 다시 입력하고 캐리지 리턴(Enter)을 누르십시오.

1-2
  As we will see later, h moves back to the left (like control-h which is a backspace), j moves down (in the same column), k moves up (in the same column), and l moves to the right.

나중에 보겠지만, `h`는 왼쪽으로 이동하며(백스페이스인 control-h처럼), `j`는 아래로(같은 열에서), `k`는 위로(같은 열에서), `l`은 오른쪽으로 이동합니다.

1-3
  On smart terminals where it is possible, the editor will quietly flash the screen rather than ringing the bell.

가능한 경우, 스마트 터미널에서는 편집기가 종소리를 울리는 대신 화면을 조용히 깜박이게 합니다.

1-4
  Backspacing over the '/' will also cancel the search.

`/` 위에서 백스페이스를 하면 검색도 취소됩니다.

  Note: If the editor prints No previous regular expression on the bottom line of the screen, the DEL key on your terminal does not send the delete character ^?, but a character sequence starting with ESC. The interrupt function is most often assigned to ^C then (refer to section 2.1 about the notation). If you cannot find the appropriate key or key sequence, type

참고: 편집기가 화면 하단에 `No previous regular expression`을 출력한다면, 터미널의 **DEL** 키가 삭제 문자 `^?`를 보내는 것이 아니라 ESC로 시작하는 문자 시퀀스를 보내고 있는 것입니다. 이 경우 인터럽트 기능은 보통 `^C`에 할당되어 있습니다(표기법에 대해서는 2.1절 참조). 적절한 키나 키 시퀀스를 찾을 수 없다면, 입력하십시오.

```
% stty -a
```

at the shell command level and look for the characters following “intr”.

셸 명령어 수준에서 입력하고, “intr” 뒤에 나오는 문자를 확인하십시오.

1-5
  On some systems, this interruptibility comes at a price: you cannot type ahead when the editor is computing with the cursor on the bottom line.

일부 시스템에서는 이러한 인터럽트 가능성이 대가를 수반합니다.  
즉, 커서가 맨 아래 줄에 있을 때 편집기가 계산 중이면 미리 입력을 할 수 없습니다.


1-6
  All commands which read from the last display line can also be terminated with a ESC as well as an CR.

마지막 표시 줄에서 입력을 받는 모든 명령은 CR뿐만 아니라 ESC로도 종료할 수 있습니다.

2-1
  If you don't have a '^' key on your terminal then there is probably a key labelled '↑'; in any case these characters are one and the same. Note: Some web browsers are unable to display an uparrow character and show &uarr; instead. Read this as uparrow. Be aware that the uparrow mentioned here is not one of the keys on the cursor keypad, but an ancient notation for the caret or circumflex character.

터미널에 `^` 키가 없다면, 아마도 `↑`라고 표시된 키가 있을 것입니다. 어떤 경우든 이 두 문자는 동일합니다.  
참고: 일부 웹 브라우저는 위쪽 화살표 문자를 표시할 수 없어 `&uarr;`로 표시하기도 합니다. 이는 ‘uparrow’로 읽으십시오.  
여기서 말하는 uparrow는 커서 키패드에 있는 화살표 키가 아니라, 캐럿(caret) 또는 서컴플렉스(circumflex) 문자를 나타내는 오래된 표기법입니다.

2-2
  These searches will normally wrap around the end of the file, and thus find the string even if it is not on a line in the direction you search provided it is anywhere else in the file. You can disable this wraparound in scans by giving the command :se nowrapscanCR, or more briefly :se nowsCR.

이러한 검색은 보통 파일의 끝을 돌아가며 수행되므로, 검색 방향에 해당 줄이 없더라도 파일 어딘가에만 있으면 문자열을 찾습니다.  
이 스캔에서 래핑을 비활성화하려면 `:se nowrapscanCR` 명령을 사용하거나, 더 간단히 `:se nowsCR`을 입력하면 됩니다.

2-3
  Actually, the string you give to search for here can be a regular expression in the sense of the editors ex(1) and ed(1). If you don't wish to learn about this yet, you can disable this more general facility by doing :se nomagicCR; by putting this command in EXINIT in your environment, you can have this always be in effect (more about EXINIT later.)

사실 여기서 검색할 문자열은 편집기 **ex(1)**와 **ed(1)**에서 사용하는 정규 표현식이 될 수 있습니다.  
아직 이 기능을 배우고 싶지 않다면 `:se nomagicCR` 명령으로 이 일반화된 기능을 비활성화할 수 있습니다.  
또한 이 명령을 환경 변수 **EXINIT**에 넣어두면 항상 이 설정이 적용됩니다(EXINIT에 대해서는 뒤에서 더 설명합니다).

3-1
  In fact, the character ^H (backspace) always works to erase the last input character here, regardless of what your erase character is.

사실 `^H`(백스페이스) 문자는 여기서 마지막으로 입력한 문자를 지우는 데 항상 사용할 수 있으며, 이는 설정된 삭제 문자가 무엇이든 관계없습니다.

3-2
  The command S is a convenient synonym for for cc, by analogy with s. Think of S as a substitute on lines, while s is a substitute on characters.

`S` 명령은 `cc`의 편리한 동의어로, `s` 명령과의 유사성에서 나온 것입니다.  
`S`를 줄 단위의 대체(substitute)로, `s`를 문자 단위의 대체로 생각하면 됩니다.

3-3
  One subtle point here involves using the / search after a d. This will normally delete characters from the current position to the point of the match. If what is desired is to delete whole lines including the two points, give the pattern as /pat/+0, a line address.

여기서 미묘한 점 하나는 `d` 뒤에 `/` 검색을 사용하는 경우입니다.  
이는 보통 현재 위치부터 일치 지점까지의 문자를 삭제합니다.  
만약 두 지점을 포함한 전체 줄을 삭제하려면, 패턴을 `/pat/+0`처럼 **줄 주소**로 지정하면 됩니다.


4-1
  This is settable by a command of the form :se ts=xCR, where x is 4 to set tabstops every four columns. This has effect on the screen representation within the editor.

이는 `:se ts=xCR` 형식의 명령으로 설정할 수 있으며, 예를 들어 `x`를 4로 지정하면 매 4열마다 탭 정지가 설정됩니다.  
이 설정은 편집기 내에서 화면 표시 방식에 영향을 줍니다.

4-2
  The [[ and ]] operations require the operation character to be doubled because they can move the cursor far from where it currently is. While it is easy to get back with the command ``, these commands would still be frustrating if they were easy to hit accidentally.

`[[`와 `]]` 동작은 커서를 현재 위치에서 멀리 이동시킬 수 있기 때문에 동작 문자를 두 번 입력해야 합니다.  
`` 명령으로 쉽게 돌아올 수 있지만, 이 명령들이 실수로 쉽게 입력된다면 여전히 불편할 수 있습니다.

4-3
  You can easily change or extend this set of macros by assigning a different string to the paragraphs option in your EXINIT. See section 6.2 for details. The '.bp' directive is also considered to start a paragraph.

이 매크로 집합은 **EXINIT**의 `paragraphs` 옵션에 다른 문자열을 지정해서 쉽게 변경하거나 확장할 수 있습니다.  
자세한 내용은 6.2절을 참조하십시오.  
`.bp` 지시어 또한 단락의 시작으로 간주됩니다.

6-1
  Note that the command 5z. has an entirely different effect, placing line 5 in the center of a new window.

`5z.` 명령은 전혀 다른 효과를 가지며, 5번 줄을 새 창의 중앙에 배치합니다.

6-2
  All commands which start with : are ex commands.

콜론(`:`)으로 시작하는 모든 명령은 ex 명령입니다.

6-3
  In rare cases, some of the lines of the file may be lost. The editor will give you the numbers of these lines and the text of the lines will be replaced by the string 'LOST'. These lines will almost always be among the last few which you changed. You can either choose to discard the changes which you made (if they are easy to remake) or to replace the few lost lines by hand.

드물게 파일의 일부 줄이 손실될 수 있습니다.  
편집기는 이러한 줄의 번호를 알려주며, 해당 줄의 내용은 문자열 `LOST`로 대체됩니다.  
이 줄들은 거의 항상 최근에 변경한 몇 줄 중에 포함됩니다.  
변경 사항을 쉽게 다시 만들 수 있다면 이를 버리거나, 손실된 몇 줄을 직접 다시 입력해서 복구할 수 있습니다.

7-1
  You can make long lines very easily by using J to join together short lines.

짧은 줄들을 `J`를 사용해 서로 연결하면 긴 줄을 아주 쉽게 만들 수 있습니다.

7-2
  But not by a ^L which just redraws the screen as it is.

하지만 화면을 있는 그대로 다시 그리는 `^L`로는 그렇게 되지 않습니다.

7-3
  This is not quite true. The implementation of the editor does not allow the NULL (^@) character to appear in files. Also the LF (linefeed or ^J) character is used by the editor to separate lines in the file, so it cannot appear in the middle of a line. You can insert any other character, however, if you wait for the editor to echo the ↑ before you type the character. In fact, the editor will treat a following letter as a request for the corresponding control character. This is the only way to type ^S or ^Q, since the system normally uses them to suspend and resume output and never gives them to the editor to process.

이것은 완전히 사실은 아니다. 편집기의 구현은 파일에 NULL(^@) 문자가 나타나는 것을 허용하지 않는다. 또한 LF(linefeed 또는 ^J) 문자는 편집기가 파일에서 줄을 구분하는 데 사용되므로 줄 중간에 나타날 수 없다. 그러나 문자를 입력하기 전에 편집기가 ↑를 에코할 때까지 기다리면 다른 어떤 문자든 삽입할 수 있다. 사실, 편집기는 뒤따르는 글자를 해당 제어 문자에 대한 요청으로 취급한다. 이는 시스템이 일반적으로 그것들을 출력을 일시 중지하고 재개하는 데 사용하고 결코 편집기가 처리하도록 넘겨주지 않기 때문에 ^S나 ^Q를 입력하는 유일한 방법이다.


7-4
  The \ character you give will not echo until you type another key.

당신이 입력한  문자는 다른 키를 입력할 때까지 화면에 표시되지 않는다

















