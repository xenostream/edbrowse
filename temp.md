A tutorial for the sam command language



Rob Pike



ABSTRACT
sam is an interactive text editor with a command language that makes heavy use of
regular expressions. Although the language is syntactically similar to ed(1), the details
are interestingly different. This tutorial introduces the command language, but does not
discuss the screen and mouse interface. With apologies to those unfamiliar with the
Ninth Edition Blit software, it is assumed that the similarity of sam to mux(9) at this
level makes sam’s mouse language easy to learn.
sam은
정규 표현식을 많이 사용하는 명령어를 사용하는 대화형 텍스트 편집기입니다
. 이 언어는 구문상으로는 ed(1)과 비슷하지만 세부 사항은
흥미롭게도 다릅니다. 이 튜토리얼에서는 명령 언어를 소개하지만
화면 및 마우스 인터페이스에 대해서는 설명하지 않습니다. 9번째 버전 Blit 소프트웨어에익숙하지 않은 분들께 죄송하지만
, 이 수준에서는 샘과 mux(9)의 유사성 때문에
샘의 마우스 언어를 쉽게 익힐 수 있다고 가정합니다
.

The sam command language applies identically to two environments: when running sam on an ordinary terminal (via sam -d), and in the command window of a downloaded sam, that is, one using the bitmap display and mouse.
샘 명령어는 일반 터미널에서 샘을 실행할 때(sam -d를 통해)와 다운로드한 샘의 명령창, 즉 비트맵 디스플레이와 마우스를 사용하는 두 가지 환경에 동일하게 적용됩니다.



# Introduction
This tutorial describes the command language of sam, an interactive text editor that runs on Blits and
some computers with bitmap displays. For most editing tasks, the mouse-based editing features are sufficient, and they are easy to use and to learn.
이 튜토리얼에서는 Blits 및
비트맵 디스플레이가 있는 일부 컴퓨터에서 실행되는 대화형 텍스트 편집기인 샘의 명령어를 설명합니다
. 대부분의 편집 작업은 마우스 기반 편집 기능으로 충분하며, 사용하기 쉽고 배우기 쉽습니다.

The command language is often useful, however, particularly when making global changes. Unlike
the commands in ed, which are necessary to make changes, sam commands tend to be used only for complicated or repetitive editing tasks. It is in these more involved uses that the differences between sam and
other text editors are most evident.
그러나 이 명령어는 특히 전역 변경을 할 때 유용할 때가 많습니다. 변경에 필요한 ed 명령과 달리
, 샘 명령은 복잡하거나 반복적인 편집 작업에만 사용되는 경향이 있습니다. 샘과
다른 텍스트 편집기의 차이점이
가장 분명하게 드러나는 것은 바로 이러한 복잡한 용도에서입니다.

sam’s language makes it easy to do some things that other editors, including programs like sed and
awk, do not handle gracefully, so this tutorial serves partly as a lesson in sam’s manner of manipulating
text. The examples below therefore concentrate entirely on the language, assuming that facility with the
use of the mouse in sam is at worst easy to pick up. In fact, sam can be run without the mouse at all (not
downloaded), by specifying the -d flag, and it is this domain that the tutorial occupies; the command language in these modes are identical.
샘의 언어를 사용하면 sed나
awk같은 프로그램을 포함한 다른 편집기에서는
우아하게 처리하지 못하는몇 가지 작업을 쉽게 수행할 수
있으므로 이 튜토리얼은 부분적으로 샘의
텍스트 조작 방식에 대한 교훈을 제공하는 역할을
합니다. 따라서 아래 예제에서는
샘에서 마우스를 사용하는 기능이
최악의 경우 쉽게 익힐 수 있다고 가정하여 언어에 전적으로 집중합니다
. 실제로 샘은
-d 플래그를 지정하여 마우스를 전혀 사용하지 않고(다운로드하지 않고) 실행할 수
있으며, 이 튜토리얼이 다루는 영역은 바로 이 모드이며, 이 모드의 명령 언어는 동일합니다.

A word to the Unix adept: although sam is syntactically very similar to ed, it is fundamentally and
deliberately different in design and detailed semantics. You might use knowledge of ed to predict how the
substitute command works, but you’d only be right if you had used some understanding of sam’s workings
to influence your prediction. Be particularly careful about idioms. Idioms form in curious nooks of languages and depend on undependable peculiarities. ed idioms simply don’t work in sam: 1,$s/a/b/ makes
one substitution in the whole file, not one per line. sam has its own idioms. Much of the purpose of this
tutorial is to publish them and make fluency in sam a matter of learning, not cunning.
유닉스 숙련자를 위한 한마디: 샘은 구문상으로는 ed와 매우 유사하지만,
설계와 세부 의미론에서 근본적으로 그리고
의도적으로 다릅니다. 대체명령의 작동 방식을 예측하기 위해 ed에 대한 지식을 사용할 수
있지만, 샘의 작동 방식에 대한 이해가 어느 정도 있어야만
예측이 정확할 수 있습니다. 숙어에 특히 주의하세요. 숙어는 언어의 흥미로운 구석에서 형성되며 신뢰할 수 없는 특성에 의존합니다. 1,$s/a/b/는
한 줄당 하나가 아니라 파일 전체에서 하나의 치환을 만듭니다. 샘에는 고유한 숙어가 있습니다. 이 튜토리얼의 목적은 대부분
이러한 관용구를 게시하고 샘을 유창하게 사용하는 것이 교활한 것이 아니라 학습의 문제로 만드는 것입니다.

The tutorial depends on familiarity with regular expressions, although some experience with a more
traditional Unix editor may be helpful. To aid readers familiar with ed,Ihav e pointed out in square brackets [] some of the relevant differences between ed and sam. Read these comments only if you wish to
understand the differences; the lesson is about sam, not sam vs. ed. Another typographic convention is
that output appears in this font, while typed input appears as slanty text.
이 튜토리얼은 정규식에 익숙해야 하지만,
기존 Unix 편집기를 사용해 본 경험이
있으면 도움이 될 수 있습니다. ed에 익숙한 독자를 돕기 위해 대괄호[]로 ed와 sam의 몇 가지 관련 차이점을 지적했습니다. 이 설명은
샘과 ed의 차이점을 이해하고자하는 경우에만 읽으시기 바랍니다. 또 다른 타이포그래피 규칙은
출력은 이 글꼴로 표시되는 반면 입력은 비스듬한 텍스트로 표시된다는 것입니다.

Nomenclature: sam keeps a copy of the text it is editing. This copy is called a file. To avoid confusion, I have called the permanent storage on disc a Unix file.
명명법: 샘은 편집 중인 텍스트의 사본을 보관합니다. 이 사본을 파일이라고 합니다. 혼동을 피하기 위해 디스크의 영구 저장소를 Unix 파일이라고 부릅니다.




# Text
To get started, we need some text to play with. Any text will do; try something from James Gosling’s Emacs manual:
시작하려면 사용할 텍스트가 필요합니다. 제임스 고슬링의 Emacs 매뉴얼에 있는 텍스트를 사용해도 됩니다:

```
$ sam -d
a
This manual is organized in a rather haphazard manner. The first
several sections were written hastily in an attempt to provide a
general introduction to the commands in Emacs and to try to show
the method in the madness that is the Emacs command structure.
.
```

sam -d starts sam running. The a command adds text until a line containing just a period, and sets the current text (also called dot) to what was typed — everything between the a and the period. [ed would leave
dot set to only the last line.] The p command prints the current text:
sam -d는 샘 실행을 시작합니다. a 명령은 마침표만 포함된 줄까지 텍스트를 추가하고 현재 텍스트(점이라고도 함)를 입력한 내용(a와 마침표 사이의 모든 것)으로 설정합니다. [ed는
점을 마지막 줄에만 설정합니다.] p 명령은 현재 텍스트를 인쇄합니다:

```
p
This manual is organized in a rather haphazard manner. The first
several sections were written hastily in an attempt to provide a
general introduction to the commands in Emacs and to try to show
the method in the madness that is the Emacs command structure.
```

[Again, ed would print only the last line.] The a command adds its text after dot; the i command is like a,
but adds the text before dot.
[다시 말하지만, ed는 마지막 줄만 인쇄합니다.] a 명령은 점 뒤에 텍스트를 추가하고, i 명령은 a와 같지만
점 앞에 텍스트를 추가합니다.

```
i
Introduction
.
p
Introduction
```

There is also a c command that changes (replaces) the current text, and d that deletes it; these are illustrated
below.
현재 텍스트를 변경(바꾸기)하는 c 명령과 삭제하는 d 명령도
있으며, 아래에 설명되어
있습니다.

To see all the text, we can specify what text to print; for the moment, suffice it to say that 0,$ specifies the entire file. [ed users would probably type 1,$, which in practice is the same thing, but see below.]
모든 텍스트를 보려면 인쇄할 텍스트를 지정할 수 있는데, 지금은 0,$가 전체 파일을 지정한다고 하면 충분합니다. [일반 사용자는 1,$를 입력할 수도 있지만 실제로는 동일합니다.]

```
0,$p
Introduction
This manual is organized in a rather haphazard manner. The first
several sections were written hastily in an attempt to provide a
general introduction to the commands in Emacs and to try to show
the method in the madness that is the Emacs command structure.
```

Except for the w command described below, all commands, including p, set dot to the text they touch.
Thus, a and i set dot to the new text, p to the text printed, and so on. Similarly, all commands (except w) by
default operate on the current text [unlike ed, for which some commands (such as g) default to the entire
file].
아래에 설명된 w 명령을 제외한 모든 명령(p 포함)은 터치하는 텍스트에 점을 설정합니다.
따라서 a와 i는 새 텍스트로, p는 인쇄된 텍스트로 설정하는 등의 방식으로 dot을 설정합니다. 마찬가지로 모든 명령(w 제외)은
기본적으로 현재 텍스트에서 작동합니다[일부 명령(예: g)이 전체 파일로 기본 설정되는 ed와 달리
].

Things are not going to get very interesting until we can set dot arbitrarily. This is done by
addresses, which specify a piece of the file. The address 1, for example, sets dot to the first line of the file.
점을 임의로 설정할 수 있을 때까지는 상황이 그리 흥미롭지 않을 것입니다. 이 작업은
파일의 일부를 지정하는 주소로 수행됩니다
. 예를 들어 주소 1은 파일의 첫 번째 줄에 점을 설정합니다.

```
1p
Introduction
c
Preamble
.
```

The c command didn’t need to specify dot; the p left it on line one. It’s therefore easy to delete the first line
utterly; the last command left dot set to line one:
c 명령은 점을 지정할 필요가 없고, p는 첫 번째 줄에 그대로 둡니다. 따라서 첫 번째 줄은
완전히삭제하고
마지막 명령은 첫 번째 줄에 점을 남겨두면 됩니다:

```
d
1p
This manual is organized in a rather haphazard manner. The first
```

(Line numbers change to reflect changes to the file.)
(파일 변경 사항을 반영하여 줄 번호가 변경됩니다.)

The address /text/ sets dot to the first appearance of text, after dot. [ed matches the first line containing text.] If text is not found, the search restarts at the beginning of the file and continues until dot.
주소 /text/는 점 다음에 나타나는 첫 번째 텍스트에 점을 설정합니다. [ed는 텍스트가 포함된 첫 줄과 일치합니다.] 텍스트를 찾을 수 없는 경우 검색은 파일의 시작 부분에서 다시 시작하여 점까지 계속됩니다.

```
/Emacs/p
Emacs
```

It’s difficult to indicate typographically, but in this example no newline appears after Emacs: the text to be
printed is the string ‘Emacs’, exactly. (The final p may be left off — it is the default command. When
downloaded, however, the default is instead to select the text, to highlight it, and to make it visible by moving the window on the file if necessary. Thus, /Emacs/ indicates on the display the next occurrence of the
text.)
타이포그래피로 표시하기는 어렵지만 이 예제에서는 Emacs 뒤에 개행이 나타나지 않으므로 인쇄할 텍스트는
정확히 'Emacs'라는 문자열입니다. (마지막 p는 생략할 수 있으며 기본 명령입니다. 그러나 다운로드할 때
기본값은 대신 텍스트를 선택하고 강조 표시하며 필요한 경우 파일에서 창을 이동하여 텍스트를 볼 수 있도록 하는 것입니다. 따라서 /Emacs/는 디스플레이에 텍스트의 다음 항목을 표시합니다
.)

Imagine we wanted to change the word haphazard to thoughtless. Obviously, what’s needed is
another c command, but the method used so far to insert text includes a newline. The syntax for including
text without newlines is to surround the text with slashes (which is the same as the syntax for text searches,
but what is going on should be clear from context). The text must appear immediately after the c (or a or i).
Given this, it is easy to make the required change:
haphazard라는 단어를 생각 없이라는 단어로 바꾸고 싶다고 상상해 봅시다. 물론
다른 c 명령이 필요하지만
지금까지 텍스트를 삽입하는 데 사용된 방법에는 개행이 포함되어 있습니다. 개행 없이 텍스트를포함하는 구문은
슬래시로 텍스트를 둘러싸는 것입니다(텍스트 검색 구문과 동일하지만
문맥에서 무슨 일이 일어나고 있는지 명확해야 함). 텍스트는 c(또는 a 또는 i) 바로 뒤에 나타나야 합니다.
이 점을 감안하면 필요한 변경을 쉽게 할 수 있습니다:

```
/haphazard/c/thoughtless/
1p
This manual is organized in a rather thoughtless manner. The first
```

[Changes can always be done with a c command, even if the text is smaller than a line]. You’ll find that this
way of providing text to commands is much more common than is the multiple-lines syntax. If you want to
include a slash / in the text, just precede it with a backslash \, and use a backslash to protect a backslash
itself.
[텍스트가 한 줄보다 작은 경우에도 항상 c 명령으로 변경할 수 있습니다.] 명령에 텍스트를 제공하는 이
방식이 여러 줄 구문보다 훨씬 더 일반적이라는 것을 알게 될 것입니다
. 텍스트에 슬래시 /를포함하려면
슬래시 앞에 백슬래시 \를 붙이고 백슬래시
자체를 보호하려면 백슬래시를 사용하면
됩니다.

```
/Emacs/c/Emacs\\360/
4p
general introduction to the commands in Emacs\360 and to try to show
```

We could also make this particular change by
다음과 같은 방법으로도 이 특정 변경을 수행할 수 있습니다.

```
/Emacs/a/\\360/
```

This is as good a place as any to introduce the u command, which undoes the last command. A second u will undo the penultimate command, and so on.
마지막 명령을 실행 취소하는 u 명령을 소개하기에 가장 좋은 위치입니다. 두 번째 u는 두 번째 명령을 실행 취소하는 식으로 실행 취소합니다.

```
u
4p
general introduction to the commands in Emacs and to try to show
u
3p
This manual is organized in a rather haphazard manner. The first
```

Undoing can only back up; there is no way to undo a previous u.
실행 취소는 백업만 가능하며 이전 실행을 취소할 수 있는 방법은 없습니다.



# Addresses
We’v e seen the simplest forms of addresses, but there is more to learn before we can get too much
further. An address selects a region in the file — a substring — and therefore must define the beginning
and the end of a region. Thus, the address 13 selects from the beginning of line thirteen to the end of line
thirteen, and /Emacs/ selects from the beginning of the word ‘Emacs’ to the end.
가장 간단한 형태의 주소에 대해 살펴봤지만 더 깊이 들어가기 전에 배워야 할 것이 더 있습니다
. 주소는 파일에서 영역(하위 문자열)을 선택하므로
영역의 시작과
끝을 정의해야
합니다. 따라서 주소 13은 13번째 줄의 시작부터
13번째 줄의 끝까지 선택하며
, /Emacs/는 'Emacs'라는 단어의 시작부터 끝까지 선택합니다.

Addresses may be combined with a comma:
주소는 쉼표와 결합할 수 있습니다:

```
13,15
```

selects lines thirteen through fifteen. The definition of the comma operator is to select from the beginning
of the left hand address (the beginning of line 13) to the end of the right hand address (the end of line 15).
은 13~15번째 줄을 선택합니다. 쉼표 연산자의 정의는
왼쪽 주소의 시작(13번째 줄의 시작)부터 오른쪽 주소의 끝(15번째 줄의 끝)까지 선택하는 것입니다
.

A few special simple addresses come in handy: . (a period) represents dot, the current text, 0 (line
zero) selects the null string at the beginning of the file, and $ selects the null string at the end of the file [not
the last line of the file]. Therefore,
(마침표)는 현재 텍스트인 점을 나타내고, 0(0번째 줄)
은 파일의 시작 부분에 있는 널 문자열을 선택하며, $는 파일의
마지막 줄이 아닌 파일의 끝 부분에 있는 널 문자열을 선택합니다
. 따라서

```
0,13
```

selects from the beginning of the file to the end of line thirteen,
은 파일의 시작부터 13번째 줄 끝까지 선택합니다,

```
.,$
```

selects from the beginning of the current text to the end of the file, and
는 현재 텍스트의 시작부터 파일 끝까지 선택하고

```
0,$
```

selects the whole file [that is, a single string containing the whole file, not a list of all the lines in the file].
은 전체 파일[즉, 파일의 모든 줄 목록이 아닌 전체 파일을 포함하는 단일 문자열]을 선택합니다.

These are all absolute addresses: they refer to specific places in the file. sam also has relative
addresses, which depend on the value of dot, and in fact we have already seen one form: /Emacs/ finds the
first occurrence of Emacs searching forwards from dot. Which occurrence of Emacs it finds depends on
the value of dot. What if you wanted the first occurrence before dot? Just precede the pattern with a minus
sign, which reverses the direction of the search:
이들은 모두 절대 주소로, 파일의 특정 위치를 가리킵니다. 샘에는
dot의 값에 따라 달라지는 상대 주소도
있으며, 실제로 우리는 이미 한 가지 형태를 보았습니다: /Emacs/는
dot에서 앞으로 검색하는 Emacs의 첫 번째 항목을  찾습니다
. 어떤 Emacs를 찾는지는
dot의 값에 따라 달라집니다
. 점 앞에 첫 번째 항목을 찾으려면 어떻게 해야 할까요? 패턴 앞에 마이너스
기호를 붙여 검색 방향을 반대로 하면 됩니다:

```
-/Emacs/
```

In fact, the complete syntax for forward searching is
실제로 정방향 검색의 전체 구문은 다음과 같습니다.

```
+/Emacs/
```

but the plus sign is the default, and in practice is rarely used. Here is an example that includes it for clarity:
를 사용하지만 더하기 기호가 기본값이며 실제로는 거의 사용되지 않습니다. 다음은 명확성을 위해 더하기 기호가 포함된 예제입니다:

```
0+/Emacs/
```

selects the first occurrence of Emacs in the file; read it as ‘‘go to line 0, then search forwards for Emacs.’’
Since the + is optional, this can be written 0/Emacs/. Similarly,
는 파일에서 처음 나오는 Emacs를 선택하므로 ''0 줄로 이동한 다음 Emacs를 앞으로 검색합니다.''로 읽습니다.
는 선택 사항이므로 0/Emacs/라고 쓸 수 있습니다. 마찬가지로,

```
$-/Emacs/
```

finds the last occurrence in the file, so
은 파일에서 마지막 항목을 찾습니다.

```
0/Emacs/,$-/Emacs/
```

selects the text from the first to last Emacs, inclusive. Slightly more interesting:
은 첫 번째부터 마지막 Emac까지 텍스트를 선택합니다. 조금 더 흥미롭습니다:

```
/Emacs/+/Emacs/
```

(there is an implicit .+ at the beginning) selects the second Emacs following dot.
Line numbers may also be relative.
(시작 부분에 암시적 .+가 있음)은 점 다음에 오는 두 번째 이맥을 선택합니다.
줄 번호는 상대적일 수도 있습니다.

```
-2
```

selects the second previous line, and
은 두 번째 이전 줄을 선택하고

```
+5
```

selects the fifth following line (here the plus sign is obligatory).
는 다음 다섯 번째 줄을 선택합니다(여기서는 더하기 기호가 필수입니다).

Since addresses may select (and dot may be) more than one line, we need a definition of ‘previous’
and ‘following:’ ‘previous’ means before the beginning of dot, and ‘following’ means after the end of dot.
For example, if the file contains AAAA, with dot set to the middle two A’s (the slanting characters), -/A/
sets dot to the first A, and +/A/ sets dot to the last A. Except under odd circumstances (such as when the
only occurrence of the text in the file is already the current text), the text selected by a search will be disjoint from dot.
주소는 두 개 이상의 줄을 선택할 수 있으므로 '이전'
과 '다음'에 대한 정의가 필요합니다.
'이전'은 점의 시작 전을 의미하고 '다음'은 점의 끝을 의미합니다.
예를 들어, 파일에 AAAA가 포함되어 있고 점(dot)이 가운데 두 개의 A(기울어진 문자)로 설정된 경우, -/A/는
첫 번째 A에, +/A/는 마지막 A에 점을 설정합니다. 이상한 상황(
파일에서 텍스트가 이미 현재 텍스트인 경우 등)을 제외하고는
검색에서 선택한 텍스트는 점과 분리되어 검색됩니다.

To select the troff -ms paragraph containing dot, however long it is, use
도트가 포함된 troff -ms 단락을 선택하려면 길이가 아무리 길어도

```
-/.PP/,/.PP/-1
```

which will include the .PP that begins the paragraph, and exclude the one that ends it.
단락을 시작하는 .PP는 포함하고 단락을 끝내는 .PP는 제외합니다.

When typing relative line number addresses, the default number is 1, so the above could be written
slightly more simply:
상대 줄 번호 주소를 입력할 때 기본 번호는 1이므로 위와
같이 조금 더 간단하게 작성할 수 있습니다
:

```
-/.PP/,/.PP/-
```

What does the address +1-1 or the equivalent +- mean? It looks like it does nothing, but recall that
dot need not be a complete line of text. +1 selects the line after the end of the current text, and -1 selects
the line before the beginning. Therefore +1-1 selects the line before the line after the end of dot, that is, the
complete line containing the end of dot. We can use this construction to expand a selection to include a
complete line, say the first line in the file containing Emacs:
주소 +1-1 또는 이에 상응하는 +-는 무엇을 의미하나요? 아무것도 하지 않는 것처럼 보이지만
점이 완전한 텍스트 줄일 필요는 없다는 점을 기억하세요
. +1은 현재 텍스트의 끝 부분 뒤의 줄을 선택하고 -1은
시작 부분 앞의 줄을  선택합니다
. 따라서 +1-1은 점 끝 이후의 줄 앞의 줄, 즉
점 끝이 포함된 완전한 줄을 선택합니다
. 이 구조를 사용하여 선택 영역을 확장하여
전체 줄을 포함하도록 할 수 있습니다
(예: Emacs가 포함된 파일의 첫 번째 줄):

```
0/Emacs/+-p
```

general introduction to the commands in Emacs and to try to show
The address +- is an idiom.
명령에 대한 일반적인 소개와
+- 주소는 관용구입니다.




# Loops
Above, we changed one occurrence of Emacs to Emacs\360, but if the name of the editor is really
changing, it would be useful to change all instances of the name in a single command. sam provides a
command, x (extract), for just that job. The syntax is x/pattern/command. For each occurrence of the
pattern in the selected text, x sets dot to the occurrence and runs command. For example, to change Emacs
to vi,
위에서 Emacs의 한
인스턴스를Emacs\360으로 변경했지만 편집기의 이름이 실제로
변경되는경우
단일 명령으로 이름의 모든 인스턴스를 변경하는 것이 유용합니다. sam은
해당 작업에 대해 x(추출)라는 명령을 제공합니다
. 구문은 x/pattern/command입니다. 선택한 텍스트에서 패턴이 나타날 때마다
x는 해당 패턴에 점을 설정하고 명령을 실행합니다. 예를 들어 Emacs를
vi로 변경합니다
,

```
0,$x/Emacs/c/vi/
0,$p
This manual is organized in a rather haphazard manner. The first
several sections were written hastily in an attempt to provide a
general introduction to the commands in vi and to try to show
the method in the madness that is the vi command structure.
```

This works by subdividing the current text (0,$ — the whole file) into appearances of its textual argument
(Emacs), and then running the command that follows (c/vi/) with dot set to the text. We can read this
example as, ‘‘find all occurrences of Emacs in the file, and for each one, set the current text to the occurrence and run the command c/vi/, which will replace the current text by vi.’’ [This command is somewhat
similar to ed’s g command. The differences will develop below, but note that the default address, as
always, is dot rather than the whole file.]
이 방법은 현재 텍스트(0,$ - 전체 파일)를 텍스트 인수
(Emacs)의 출현으로 세분한
 다음, 텍스트에 점을 설정하고 뒤에 오는 명령(c/vi/)을 실행하는 방식으로 작동합니다
. 이
예는 '파일에서 Emacs의 모든 항목을 찾은 다음 각 항목에 대해 현재 텍스트를 해당 항목으로 설정하고 c/vi/ 명령을 실행하면 현재 텍스트가 vi로 바뀝니다'로 읽을 수 있습니다
. [이 명령은
ed의 g 명령과  다소
유사합니다. 차이점은 아래에서 설명하지만 기본 주소는
항상 그렇듯이
파일 전체가 아닌 점이라는 점에 유의하세요.]

A single u command is sufficient to undo an x command, regardless of how many individual changes the x makes.
x 명령이 얼마나 많은 개별 변경을 수행했는지에 관계없이 한 번의 u 명령으로 x 명령을 실행 취소할 수 있습니다.

```
u
0,$p
This manual is organized in a rather haphazard manner. The first
several sections were written hastily in an attempt to provide a
general introduction to the commands in Emacs and to try to show
the method in the madness that is the Emacs command structure.
```

Of course, c is not the only command x can run. An a command can be used to put proprietary markings on Emacs:
물론 x가 실행할 수 있는 명령은 c만이 아닙니다. a 명령을 사용하여 Emac에 독점적인 표시를 할 수도 있습니다:

```
0,$x/Emacs/a/{TM}/
/Emacs/+-p
```

general introduction to the commands in Emacs{TM} and to try to show
[There is no way to see the changes as they happen, as in ed’s g/Emacs/s//&{TM}/p; see the section on Multiple Changes, below.]
The p command is also useful when driven by an x, but be careful that you say what you mean;
명령에 대한 일반적인 소개와
[ed의 g/Emacs/s//&{TM}/p처럼 변경이 일어나는 대로 볼 수 있는 방법은 없습니다; 아래 다중 변경 섹션 참조].
p 명령은 x로 구동할 때에도 유용하지만 의미 전달에 주의해야 합니다;

```
0,$x/Emacs/p
EmacsEmacs
```

since x sets dot to the text in the slashes, printing only that text is not going to be very informative. But the
command that x runs can contain addresses. For example, if we want to print all lines containing Emacs,
just use +-:
x는 슬래시 안의 텍스트에 점을 설정하므로 해당 텍스트만 인쇄하는 것은 그다지 유익하지 않습니다. 하지만
x가 실행하는 명령에는 주소를 포함할 수 있습니다. 예를 들어 Emacs가 포함된 모든 줄을 인쇄하려면
+-를 사용하면 됩니다:

```
0,$x/Emacs/+-p
general introduction to the commands in Emacs{TM} and to try to show
the method in the madness that is the Emacs{TM} command structure.
```

Finally, let’s restore the state of the file with another x command, and make use of a handy shorthand: a
comma in an address has its left side default to 0, and its right side default to $, so the easy-to-type address ,
refers to the whole file:
마지막으로 다른 x 명령으로 파일의 상태를 복원하고 편리한 단축키를 사용해 보겠습니다
. 주소의 쉼표는 왼쪽 기본값이 0이고 오른쪽 기본값이 $이므로 입력하기 쉬운 주소 는
전체 파일을 가리킵니다:

```
,x/Emacs/ /{TM}/d
,p
This manual is organized in a rather haphazard manner. The first
several sections were written hastily in an attempt to provide a
general introduction to the commands in Emacs and to try to show
the method in the madness that is the Emacs command structure.
```

Notice what this x does: for each occurrence of Emacs, find the {TM} that follows, and delete it.
이 x가 무엇을 하는지 주목하세요. Emacs가 나타날 때마다 뒤에 오는 {TM}을 찾아 삭제합니다.

The ‘text’ sam accepts for searches in addresses and in x commands is not simple text, but rather
regular expressions. Unix has several distinct interpretations of regular expressions. The form used by
sam is that of regexp(6), including parentheses () for grouping and an ‘or’ operator | for matching strings in
parallel. sam also matches the character sequence \n with a newline character. Replacement text, such as
used in the a and c commands, is still plain text, but the sequence \n represents newline in that context, too.
샘이 주소와 x 명령어에서 검색에 허용하는 '텍스트'는 단순한 텍스트가 아니라
정규식입니다. 유닉스에는 정규식에 대한 여러 가지 해석이 있습니다. sam이 사용하는 형식은
그룹화를 위한 괄호()와 문자열을 병
렬로 일치시키기 위한 '또는' 연산자 |를 포함하는 정규식(6)의형식입니다

. 또한 sam은 문자 시퀀스 \n과 개행 문자를 일치시킵니다. a 및 c 명령에 사용되는 것과 같은 대체 텍스트는
여전히 일반 텍스트이지만 해당 문맥에서 \n 시퀀스도 개행 문자를 나타냅니다.

Here is an example. Say we wanted to double space the document, that is, turn every newline into
two newlines. The following all do the job:
다음은 예시입니다. 문서의 공백을 두 배로 늘리고 모든 줄을
두 줄로 바꾸고 싶다고 가정해
보겠습니다. 다음은 모두 이 작업을 수행합니다:

```
,x/\n/ a/\n/
,x/\n/ c/\n\n/
,x/$/ a/\n/
,x/ˆ/ i/\n/
```

The last example is slightly different, because it puts a newline before each line; the other examples place it
after. The first two examples manipulate newlines directly [something outside ed’s ken]; the last two use
regular expressions: $ is the empty string at the end of a line, while ˆ is the empty string at the beginning.
마지막 예제는 각 줄 앞에 줄 바꿈을 넣지만 다른 예제는 줄 바꿈을
뒤에 넣기 때문에 약간 다릅니다
. 앞의 두 예제는 줄 바꿈을 직접 조작하지만, 마지막 두 예제는
정규식을 사용합니다
. $는 줄 끝에 있는 빈 문자열이고 ˆ은 시작 부분에 있는 빈 문자열입니다.

These solutions all have a possible drawback: if there is already a blank line (that is, two consecutive
newlines), they make it much larger (four consecutive newlines). A better method is to extend every group
of newlines by one:
이러한 솔루션에는 모두 단점이 있습니다. 이미 빈 줄이 있는 경우(즉, 두 줄이 연속된 경우
) 훨씬 더 큰 줄(네 줄이 연속된 경우)이 만들어집니다. 더 나은 방법은 모든 줄 바꿈 그룹을
하나씩 확장하는
것입니다:

```
,x/\n+/ a/\n/
```

The regular expression operator + means ‘one or more;’ \n+ is identical to \n\n*. Thus, this example takes
ev ery sequence of newlines and adds another to the end.
정규식 연산자 +는 '하나 이상'을 의미하며, \n+는 \n\n*와 동일합니다. 따라서 이 예에서는
모든 줄 바꿈 시퀀스를 취하고
끝에 다른 줄 바꿈을 추가합니다.

A more common example is indenting a block of text by a tab stop. The following all work, although
the first is arguably the cleanest (the blank text in slashes is a tab):
더 일반적인 예는 탭 스톱으로 텍스트 블록을 들여쓰는 것입니다. 첫 번째 방법이 가장 깔끔하지만 다음 방법도 모두 작동합니다
(슬래시 안의 빈 텍스트는 탭입니다):

```
,x/ˆ/a/ /
,x/ˆ/c/ /
,x/.*\n/i/ /
```

The last example uses the pattern (idiom, really) .*\n to match lines: .* matches the longest possible string
of non-newline characters. Taking initial tabs away is just as easy:
마지막 예는 .*\n 패턴(관용구, 정말)을 사용하여 줄을 일치시킵니다: .*는
줄 바꿈이 아닌 문자의 가능한 가장 긴 문자열과 일치합니다
. 초기 탭을 제거하는 것도 마찬가지로 쉽습니다:

```
,x/ˆ /d
```

In these examples I have specified an address (the whole file), but in practice commands like these are more
likely to be run without an address, using the value of dot set by selecting text with the mouse.
이 예에서는 주소(전체 파일)를 지정했지만 실제로는
주소 없이 마우스로 텍스트를 선택하여 설정한 점 값을 사용하여 이와 같은 명령이
실행될 가능성이 더
높습니다.




# Conditionals
The x command is a looping construct: for each match of a regular expression, it extracts (sets dot to)
the match and runs a command. sam also has a conditional, g: g/pattern/command runs the command if
dot contains a match of the pattern without changing the value of dot. The inverse, v, runs the command if
dot does not contain a match of the pattern. (The letters g and v are historical and have no mnemonic significance. You might think of g as ‘guard.’) [ed users should read the above definitions very carefully; the
g command in sam is fundamentally different from that in ed.] Here is an example of the difference between x and g:
x 명령은 정규식이 일치할 때마다
일치하는 항목을추출(dot을 설정)
하고 명령을 실행하는반복 구조입니다
. 또한 조건부인 g/pattern/command는
dot의 값을 변경하지 않고 dot에 일치하는 패턴이 포함되어 있으면 명령을 실행하는 조건부입니다
. 그 반대인 v는
dot에 일치하는 패턴이 포함되어 있지 않으면 명령을 실행
합니다. (문자 g와 v는 역사적 의미이며 니모닉 의미가 없습니다. g를 '가드'라고 생각하시면 됩니다.) [편집 사용자는 위의 정의를 주의 깊게 읽어야 합니다
. 샘의 g 명령은 편집의 그것과 근본적으로 다릅니다.] 다음은 x와 g의 차이점에 대한 예시입니다:

```
,x/Emacs/c/vi/
```

changes each occurrence of the word Emacs in the file to the word vi, but
는 파일에서 Emacs라는 단어가 나올 때마다 vi라는 단어로 변경되지만

```
,g/Emacs/c/vi/
```

changes the whole file to vi if there is the word Emacs anywhere in the file.
는 파일에 Emacs라는 단어가 있으면 전체 파일을 vi로 변경합니다.

Neither of these commands is particularly interesting in isolation, but they are valuable when combined with x and with themselves.
이 명령 중 어느 것도 단독으로 사용하면 특별히 흥미롭지는 않지만, x와 결합하거나 그 자체로 사용하면 유용합니다.




# Composition
One way to think about the x command is that, givenaselection (a value of dot) it iterates through
interesting subselections (values of dot within). In other words, it takes a piece of text and cuts it into
smaller pieces. But the text that it cuts up may already be a piece cut by a previous x command or selected
by a g. sam’s most interesting property is the ability to define a sequence of commands to perform a particular task.† A simple example is to change all occurrences of Emacs to emacs; certainly the command
X 명령에 대해 한 가지 생각할 수 있는 방법은 선택(점 값)이 주어지면
흥미로운 하위 선택(점 안의 값)을 반복한다는
것입니다. 즉, 텍스트 한 조각을 가져와서
더 작은 조각으로
잘라내는 것입니다. 그러나 잘라내는 텍스트는 이미 이전 x 명령으로 잘라낸 조각이거나
g에 의해 선택된 조각일 수 있습니다
. 샘의 가장 흥미로운 속성은 특정 작업을 수행하기 위해 일련의 명령을 정의하는 기능입니다.† 간단한 예는 Emacs의 모든 발생을 emacs로 변경하는 것입니다.

```
,x/Emacs/ c/emacs/
```

will work, but we can use an x command to save retyping most of the word Emacs:
를 사용해도 되지만, x 명령을 사용하면 대부분의 Emacs 단어를 다시 입력하지 않아도 됩니다:

```
,x/Emacs/ x/E/ c/e/
```

(Blanks can be used to separate commands on a line to make them easier to read.) What this command
does is find all occurrences of Emacs (,x/Emacs/), and then with dot set to that text, find all occurrences of
the letter E (x/E/), and then with dot set to that text, run the command c/e/ to change the character to lower
case. Note that the address for the command — the whole file, specified by a comma — is only given to
the leftmost piece of the command; the rest of the pieces have dot set for them by the execution of the
pieces to their left.
(공백을 사용하여 한 줄에서 명령을 구분하여 읽기 쉽게 만들 수 있습니다.) 이 명령은
Emacs(,x/Emacs/)의 모든 항목을 찾은 다음 해당 텍스트에 점을 설정한
상태에서 문자 E(x/E/)의 모든 항목을 찾은
다음 해당 텍스트에 점을 설정한 상태에서 c/e/ 명령을 실행하여 문자를 소문자로 변경하는역할을

합니다. 명령의 주소(쉼표로 지정된 전체 파일)는
명령의 가장 왼쪽부분에만 주어지며
, 나머지 부분은
왼쪽에 있는 부분을 실행하면 점으로 설정됩니다
.

As another simple example, consider a problem solved above: printing all lines in the file containing
the word Emacs:
또 다른 간단한 예로, 위에서 해결한 문제인
Emacs라는 단어가 포함된 파일의 모든 줄을 인쇄하는 문제를 생각해
보세요:

```
,x/.*\n/ g/Emacs/p
general introduction to the commands in Emacs and to try to show
the method in the madness that is the Emacs command structure.
```

This command says to break the file into lines (,x/.*\n/), and for each line that contains the string Emacs
(g/Emacs/), run the command p with dot set to the line (not the match of Emacs), which prints the line. To
save typing, because .*\n is a common pattern in x commands, if the x is followed immediately by a space,
the pattern .*\n is assumed. Therefore, the above could be written more succinctly:
이 명령은 파일을 줄(,x/.*\n/)로 나누고, 문자열 Emacs
(g/Emacs/)가 포함된 각 줄에 대해
 해당 줄에 점을 설정한 상태에서 p 명령을 실행하면 줄이 인쇄됩니다(Emacs와 일치하지 않음). 타이핑을 절약하기위해
.*\n은 x 명령에서 일반적인 패턴이므로 x 뒤에 공백이 바로 오면
.*\n 패턴이 가정됩니다. 따라서 위의 명령은 더 간결하게 작성할 수 있습니다:

† The obvious analogy with shell pipelines is only partially valid, because the individual sam commands are all
working on the same text; it is only how the text is sliced up that is changing.
개별 샘 명령은 모두
동일한 텍스트에 대해 작업하기때문에 셸 파이프라인과의 명백한 비유는 부분적으로만 유효하며
, 변경되는 것은 텍스트가 분할되는 방식일 뿐입니다.

```
,x g/Emacs/p
```

The solution we used before was
이전에 사용했던 솔루션은

```
,x/Emacs/+-p
```

which runs the command +-p with dot set to each match of Emacs in the file (recall that the idiom +-p
prints the line containing the end of dot).
파일에 있는 각 일치하는 Emac에 점을 설정하여 +-p 명령을 실행합니다(관용구 +-p는
점의 끝이 포함된 줄을 출력한다는 점을 기억하세요
).

The two commands usually produce the same result (the +-p form will print a line twice if it contains
Emacs twice). Which is better? ,x/Emacs/+-p is easier to type and will be much faster if the file is large
and there are few occurrences of the string, but it is really an odd special case. ,x/.*\n/ g/Emacs/p is slower
— it breaks each line out separately, then examines it for a match — but is conceptually cleaner, and generalizes more easily. For example, consider the following piece of the Emacs manual:
두 명령은 일반적으로 동일한 결과를 생성합니다(+-p 형식은
Emacs가 두 번 포함된 경우 한 줄을 두 번 인쇄합니다
). 어느 것이 더 낫나요? 파일이 크고
문자열의 발생 횟수가 적은  경우에는 x/Emacs/+-p가 입력하기 쉽고 훨씬 빠르지만
, 이는 정말 이상한 특수한 경우입니다. 각 줄을 개별적으로 분리한 다음 일치하는지 검사하므로  속도가 느리지만
개념적으로 더 깔끔하고 일반화하기가 더 쉽습니다. 예를 들어 다음 Emacs 매뉴얼을 살펴보세요:

```
command name="append-to-file", key="[unbound]"
Takes the contents of the current buffer and appends it to the
named file. If the file doesn’t exist, it will be created.
command name="apropos", key="ESC-?"

Prompts for a keyword and then prints a list of those commands
whose short description contains that keyword. For example,
if you forget which commands deal with windows, just type
"@b[ESC-?]@t[window]@b[ESC]".

and so on
```

This text consists of groups of non-empty lines, with a simple format for the text within each group. Imagine that we wanted to find the description of the ‘apropos’ command. The problem is to break the file into
individual descriptions, and then to find the description of ‘apropos’ and to print it. The solution is straightforward:
이 텍스트는 비어 있지 않은 줄의 그룹으로 구성되며, 각 그룹 내 텍스트의 형식은 간단합니다. 'apropos' 명령에 대한 설명을 찾고 싶다고 가정해 보겠습니다. 문제는 파일을
개별 설명으로
나눈 다음 'apropos'에 대한 설명을 찾아서 인쇄하는 것입니다. 해결책은 간단합니다:

```
,x/(.+\n)+/ g/command name="apropos"/p
command name="apropos", key="ESC-?"
Prompts for a keyword and then prints a list of those commands
whose short description contains that keyword. For example,
if you forget which commands deal with windows, just type
"@b[ESC-?]@t[window]@b[ESC]".
```

The regular expression (.+\n)+ matches one or more lines with one or more characters each, that is, the text
between blank lines, so ,x/(.+\n)+/ extracts each description; then g/command name="apropos"/ selects
the description for ‘apropos’ and p prints it.
정규식 (.+\n)+는 각각 하나 이상의 줄, 즉
빈 줄 사이의텍스트와 하나 이상의 문자를 일치시키므로
,x/(.+\n)+/는 각 설명을 추출한 다음, g/command name="apropos"/는
'apropos'의 설명을 선택하고
p는 이를 인쇄합니다.

Imagine that we had a C program containing the variable n, but we wanted to change it to num. This
command is a first cut:
변수 n이 포함된 C 프로그램이 있는데 이를 num으로 변경하고 싶다고 가정해 보겠습니다. 이
명령은 첫 번째 컷입니다:

```
,x/n/ c/num/
```

but is obviously flawed: it will change all n’s in the file, not just the identifier n. A better solution is to use
an x command to extract the identifiers, and then use g to find the n’s:
하지만 식별자 n뿐만 아니라 파일의 모든 n을 변경한다는 점에서 명백한 결함이 있습니다. 더 나은 해결책은
x 명령을 사용하여
식별자를 추출한 다음 g를 사용하여 n을 찾는 것입니다:

```
,x/[a-zA-Z_][a-zA-Z_0-9]*/ g/n/ v/../ c/num/
```

It looks awful, but it’s fairly easy to understand when read left to right. ACidentifier is an alphabetic or
underscore followed by zero or more alphanumerics or underscores, that is, matches of the regular expression [a-zA-Z_][a-zA-Z_0-9]*. The g command selects those identifiers containing n, and the v is a trick: it
rejects those identifiers containing more than one character. Hence the c/num/ applies only to free-standing
n’s.
보기에는 끔찍해 보이지만 왼쪽에서 오른쪽으로 읽으면 꽤 쉽게 이해할 수 있습니다. ACidentifier는 영
숫자 또는 밑줄 뒤에 0개 이상의 영숫자 또는 밑줄, 즉 정규식 [a-zA-Z_][a-zA-Z_0-9]*의 일치 항목입니다. g 명령은 n이 포함된 식별자를 선택하며, v는
두 개 이상의 문자가 포함된 식별자를 거부하는 트릭을
사용합니다. 따라서 c/num/는 독립형 n에만 적용됩니다
.

There is still a problem here: we don’t want to change n’s that are part of the character constant \n.
There is a command y, complementary to x, that is just what we need: y/pattern/command runs the command on the pieces of text between matches of the pattern; if x selects, y rejects. Here is the final command:
여기서 여전히 문제가 있습니다. 문자 상수 \n의 일부인 n을 변경하고 싶지 않다는 것입니다.
x를 보완하는 명령 y가 있는데, 바로 이 명령이 필요합니다. y/pattern/command는 패턴이 일치하는 텍스트 조각에 대해 명령을 실행하고, x가 선택되면 y는 거부합니다. 다음은 마지막 명령입니다:

```
,y/\\n/ x/[a-zA-Z_][a-zA-Z_0-9]*/ g/n/ v/../ c/num/
```

The y/\\n/ (with backslash doubled to make it a literal character) removes the two-character sequence \n
from consideration, so the rest of the command will not touch it. There is more we could do here; for
example, another y could be prefixed to protect comments in the code. I won’t elaborate the example any
further, but you should have an idea of the way in which the looping and conditional commands in sam
may be composed to do interesting things.
y/\\n/(리터럴 문자로 만들기 위해 백슬래시를 두 번 사용)는 두 문자 시퀀스 \n을
고려 대상에서 제거하므로
나머지 명령은 이 시퀀스를 건드리지 않습니다. 예를 들어
코드에서 주석을 보호하기 위해 다른 y를 접두사로 추가할 수 있습니다. 더 이상예제를 자세히 설명하지는
않겠지만 샘의 반복 및 조건부 명령이
흥미로운 작업을 수행하기 위해 어떻게 구성될 수 있는지에 대한 아이디어를 얻으실
수 있을 것입니다.




# Grouping
There is another way to arrange commands. By enclosing them in brace brackets {}, commands may
be applied in parallel. This example uses the = command, which reports the line and character numbers of
dot, together with p, to report on appearances of Emacs in our original file:
명령을 정렬하는 또 다른 방법이 있습니다. 명령을 중괄호 {}로 묶으면 명령을
병렬로 적용할 수 있습니다
. 이 예에서는 = 명령을 사용하여
p와 함께 줄과 문자 번호를 보고하여
원본 파일에서 Emac의 모양을 보고합니다:

```
,p
This manual is organized in a rather haphazard manner. The first
several sections were written hastily in an attempt to provide a
general introduction to the commands in Emacs and to try to show
the method in the madness that is the Emacs command structure.
,x/Emacs/{
=
+-p
}
3; #171,#176
general introduction to the commands in Emacs and to try to show
4; #234,#239
the method in the madness that is the Emacs command structure.
```

(The number before the semicolon is the line number; the numbers beginning with # are character numbers.) As a more interesting example, consider changing all occurrences of Emacs to vi and vice versa.
We can type
(세미콜론 앞의 숫자는 줄 번호이고, #로 시작하는 숫자는 문자 번호입니다.) 좀 더 흥미로운 예로, Emacs의 모든 항목을 vi로 또는 그 반대로 변경해 보겠습니다.
다음과 같이 입력하면 됩니다.

```
,x/Emacs|vi/{
g/Emacs/ c/vi/
g/vi/ c/Emacs/
}
```

or even
또는 심지어

```
,x/[a-zA-Z]+/{
g/Emacs/ v/....../ c/vi/
g/vi/ v/.../ c/Emacs/
}
```

to make sure we don’t change strings embedded in words.
를 사용하여 단어에 포함된 문자열을 변경하지 않도록 합니다.




# Multiple Changes
You might wonder why, once Emacs has been changed to vi in the above example, the second command in the braces doesn’t put it back again. The reason is that the commands are run in parallel: within
any top-level sam command, all changes to the file refer to the state of the file before any of the changes in
that command are made. After all the changes have been determined, they are all applied simultaneously.
위 예제에서 Emacs가 vi로 변경된 후 중괄호 안의 두 번째 명령이 다시 변경되지 않는 이유가 궁금할 것입니다. 그 이유는 명령이 병렬로 실행되기 때문입니다
. 최상위 샘 명령내에서
파일에 대한 모든 변경 사항은
해당 명령에서 변경되기 전의 파일 상태를 참조합니다
. 모든 변경 사항이 결정된 후에는 모두 동시에 적용됩니다.

This means, as mentioned, that commands within a compound command see the state of the file
before any of the changes apply. This method of evaluation makes some things easier (such as the
exchange of Emacs and vi), and some things harder. For instance, it is impossible to use a p command to
print the changes as they happen, because they hav en’t happened when the p is executed. An indirect ramification is that changes must occur in forward order through the file, and must not overlap.
즉, 앞서 언급했듯이 복합 명령 내의 명령은
변경 사항이 적용되기 전에 파일 상태를 확인합니다
. 이 평가 방법은 어떤 작업(예:
Emacs와 vi의 교환)은 더 쉽게
, 어떤 작업은 더 어렵게 만듭니다. 예를 들어, p 명령이
실행될 때는 변경 사항이 발생하지 않았기 때문에 p 명령을 사용하여
변경 사항을 인쇄하는 것은 불가능합니다
. 간접적인 영향은 변경 사항이 파일을 통해 정방향 순서로 발생해야 하며 겹치지 않아야 한다는 것입니다.




# Unix
sam has a few commands to connect to Unix processes. The simplest is !, which runs the command
with input and output connected to the terminal.
샘에는 유닉스 프로세스에 연결하는 몇 가지 명령이 있습니다. 가장 간단한 명령은
터미널에 입력과 출력이 연결된 상태에서 명령을 실행하는 !입니다
.

```
!date
Wed May 28 23:25:21 EDT 1986
!
```

(When downloaded, the input is connected to /dev/null and only the first few lines of output are printed;
any overflow is stored in $HOME/sam.err.) The final ! is a prompt to indicate when the command completes.
(다운로드 시 입력은 /dev/null에 연결되고 처음 몇 줄의 출력만 인쇄되며,
오버플로는 $HOME/sam.err에 저장됩니다.) 마지막 ! 은 명령이 완료되었음을 나타내는 프롬프트입니다.

Slightly more interesting is >, which provides the current text as standard input to the Unix command:
조금 더 흥미로운 것은 >로, 현재 텍스트를 Unix 명령의 표준 입력으로 제공합니다:

```
1,2 >wc
2 22 131
!
```

The complement of > is, naturally, <: it replaces the current text with the standard output of the Unix command:
의 보수는 당연히 <: 현재 텍스트를 유닉스 명령의 표준 출력으로 대체합니다:

```
1 <date
!
1p
Wed May 28 23:26:44 EDT 1986
```

The last command is |, which is a combination of < and >: the current text is provided as standard input to
the Unix command, and the Unix command’s standard output is collected and used to replace the original
text. For example,
마지막 명령은 <와 >의 조합인 |로, 현재 텍스트가
Unix 명령의표준 입력으로 제공되고
Unix 명령의 표준 출력이 수집되어 원본
텍스트를 대체하는 데 사용됩니다
. 예를 들어

```
,| sort
```

runs sort(1) on the file, sorting the lines of the text lexicographically. Note that <, > and | are sam commands, not Unix shell operators.
The next example converts all appearances of Emacs to upper case using tr(1):
는 파일에서 sort(1)을 실행하여 텍스트의 줄을 사전식으로 정렬합니다. <, > 및 |는 유닉스 셸 연산자가 아닌 샘 명령어입니다.
다음 예제는 tr(1)을 사용하여 Emac의 모든 모양을 대문자로 변환합니다:

```
,x/Emacs/ | tr a-z A-Z
```

tr is run once for each occurrence of Emacs. Of course, you could do this example more efficiently with a
simple c command, but here’satrickier one: givenaUnix mail box as input, convert all the Subject headers to distinct fortunes:
tr은 Emacs가 발생할 때마다 한 번씩 실행됩니다. 물론
간단한 c 명령으로 이 예제를 더 효율적으로 수행할 수도
있지만, 여기에는 더 간단한 방법이 있습니다. givenaUnix 메일 상자를 입력으로 제공하고 모든 제목 헤더를 별개의 운으로 변환하는 것입니다:

```
,x/ˆSubject:.*\n/ x/[ˆ:]*\n/ < /usr/games/fortune
```

(The regular expression [ˆ:] refers to any character except : and newline; the negation operator ˆ excludes
newline from the list of characters.) Again, /usr/games/fortune is run once for each Subject line, so each
Subject line is changed to a different fortune.
(정규식 [ˆ:]은 : 및 개행을 제외한 모든 문자를 의미하며, 부정 연산자 ˆ은
문자 목록에서 개행을  제외합니다
.) 다시 말하지만 /usr/games/fortune은 각 제목 줄에 대해 한 번씩 실행되므로 각
제목 줄은 다른 운세로 변경됩니다.




# A few other text commands
For completeness, I should mention three other commands that manipulate text. The m command
moves the current text to after the text specified by the (obligatory) address after the command. Thus
완전성을 위해 텍스트를 조작하는 다른 세 가지 명령을 언급해야 합니다. m 명령은
명령 뒤의 (필수) 주소로 지정된 텍스트 뒤에 현재 텍스트를 이동합니다. 따라서

```
/Emacs/+- m 0
```

moves the next line containing Emacs to the beginning of the file. Similarly, t (another historic character)
copies the text:
는 Emacs가 포함된 다음 줄을 파일의 시작 부분으로 이동합니다. 마찬가지로 t(또 다른 역사적 문자)는
텍스트를 복사합니다:

```
/Emacs/+- t 0
```

would make, at the beginning of the file, a copy of the next line containing Emacs.
를 사용하면 파일 시작 부분에 다음 줄에 Emacs가 포함된 복사본이 만들어집니다.

The third command is more interesting: it makes substitutions. Its syntax is s/pattern/replacement/. Within the current text, it finds the first occurrence of the pattern and replaces it by the replacement
text, leaving dot set to the entire address of the substitution.
세 번째 명령은 더 흥미로운데, 대체를 하는 명령입니다. 구문은 s/pattern/replacement/입니다. 현재 텍스트 내에서 패턴의 첫 번째 발생을 찾아 대체
텍스트로 대체하고, 대체의 전체 주소에 점 설정을 남깁니다.

```
1p
This manual is organized in a rather haphazard manner. The first
s/haphazard/thoughtless/
p
This manual is organized in a rather thoughtless manner. The first
```

Occurrences of the character & in the replacement text stand for the text matching the pattern.
문자의 발생 및 대체 텍스트에서 패턴과 일치하는 텍스트를 나타냅니다.

```
s/T/"&&&&"/
p
"TTTT"his manual is organized in a rather thoughtless manner. The first
```

There are two variants. The first is that a number may be specified after the s, to indicate which occurrence
of the pattern to substitute; the default is the first.
두 가지 변형이 있습니다. 첫 번째는 s 뒤에 숫자를 지정하여
대체할 패턴의 발생 위치를 나타내는 것으로
, 기본값은 첫 번째입니다.

```
s2/is/was/
p
"TTTT"his manual was organized in a rather thoughtless manner. The first
```

The second is that suffixing a g (global) causes replacement of all occurrences, not just the first.
두 번째는 접미사 g(글로벌)를 붙이면 첫 번째 항목뿐만 아니라 모든 항목이 대체된다는 것입니다.

```
s/[a-zA-Z]/x/g
p
"xxxx"xxx xxxxxx xxx xxxxxxxxx xx x xxxxxx xxxxxxxxxxx xxxxxxx xxx xxxxx
```

Notice that in all these examples dot is left set to the entire line.
이 모든 예제에서 점이 전체 줄로 설정되어 있음을 알 수 있습니다.

[The substitute command is vital to ed, because it is the only way to make changes within a line. It is
less valuable in sam, in which the concept of a line is much less important. For example, many ed substitution idioms are handled well by sam’s basic commands. Consider the commands
[대체 명령은 한 줄 내에서 변경할 수 있는 유일한 방법이기 때문에 ed에서 매우 중요합니다. 줄의 개념이 훨씬 덜 중요한 샘에서는 그
가치가 덜합니다. 예를 들어, 많은 ed 대체 관용구는 샘의 기본 명령으로 잘 처리됩니다. 다음 명령을 고려해 보세요.

```
s/good/bad/
s/good//
s/good/& bye/
```

which are equivalent in sam to
와 샘이 같으며

```
/good/c/bad/
/good/d
/good/a/ bye/
```

and for which the context search is likely unnecessary because the desired text is already dot. Also, beware this ed idiom:
와 같이 원하는 텍스트가 이미 점으로 표시되어 있어 문맥 검색이 불필요할 수 있는 경우입니다. 또한 이 관용구도 주의하세요:

```
1,$s/good/bad/
```

which changes the first good on each line; the same command in sam will only change the first one in the
whole file. The correct sam version is
을 사용하면 각 줄의 첫 번째
파일을 변경하고, sam에서 같은 명령을 사용하면
전체 파일에서 첫 번째 파일만 변경합니다
. 올바른 샘 버전은

```
,x s/good/bad/
```

but what is more likely meant is
하지만 더 가능성이 높은 것은

```
,x/good/ c/bad/
```

sam operates under different rules.]
샘은 다른 규칙에 따라 운영됩니다.]




# Files
So far, we hav e only been working with a single file, but sam is a multi-file editor. Only one file may
be edited at a time, but it is easy to change which file is the ‘current’ file for editing. To see how to do this,

we need a sam with a few files; the easiest way to do this is to start it with a list of Unix file names to edit.
지금까지는 단일 파일로만 작업했지만 샘은 다중 파일 편집기입니다. 한 번에 하나의 파일만
편집할 수
있지만 어떤 파일이 편집할 '현재' 파일인지 변경하는 것은 쉽습니다. 이를 확인하려면

몇 개의 파일이 있는 샘이 필요한데, 가장 쉬운 방법은 편집할 Unix 파일 이름 목록으로 샘을 시작하는 것입니다.

```
$ echo *.ms
conquest.ms death.ms emacs.ms famine.ms slaughter.ms
$ sam -d *.ms
-. conquest.ms
```

(I’m sorry the Horsemen don’t appear in liturgical order.) The line printed by sam is an indication that the
Unix file conquest.ms has been read, and is now the current file. sam does not read the Unix file until the
associated sam file becomes current.
(호스맨이 전례 순서대로 나타나지 않아서 죄송합니다.) 샘이 인쇄한 줄은
Unix 파일 conquest.ms를
읽었으며 현재 파일이라는 표시입니다
. 샘은
연결된 샘 파일이 현재 파일이 될 때까지 Unix 파일을 읽지 않습니다
.

The n command prints the names of all the files:
n 명령은 모든 파일의 이름을 인쇄합니다:

```
n
-. conquest.ms
- death.ms
- emacs.ms
- famine.ms
- slaughter.ms
```

This list is also available in the menu on mouse button 3. The command f tells the name of just the current
file:
이 목록은 마우스 버튼 3의 메뉴에서도 사용할 수 있습니다. 명령 f는 현재
파일의 이름만 알려줍니다
:

```
f
-. conquest.ms
```

The characters to the left of the file name encode helpful information about the file. The minus sign
becomes a plus sign if the file has a window open, and an asterisk if more than one is open. The period
(another meaning of dot) identifies the current file. The leading blank changes to an apostrophe if the file is
different from the contents of the associated Unix file, as far as sam knows. This becomes evident if we
makeachange.
파일 이름 왼쪽에 있는 문자는 파일에 대한 유용한 정보를 인코딩합니다. 파일에 열려 있는 창이 하나 있으면 빼기 기호가
더하기 기호가 되고, 둘 이상 열려 있으면 별표가 됩니다. 마침표
(점의 다른 의미)는 현재 파일을 식별합니다. 샘이 알고 있는 한, 파일이
연결된 유닉스 파일의 내용과 다른 경우 앞의 공백은 아포스트로피로 바뀝니다
. 이는 변경하면 분명해집니다.

```
1d
f
’-. conquest.ms
```

If the file is restored by an undo command, the apostrophe disappears.
실행 취소 명령으로 파일을 복원하면 아포스트로피가 사라집니다.

```
u
f
-. conquest.ms
```

The file name may be changed by providing a new name with the f command:
파일 이름은 f 명령으로 새 이름을 지정하여 변경할 수 있습니다:

```
f pestilence.ms
’-. pestilence.ms
```

f prints the new status of the file, that is, it changes the name if one is provided, and prints the name regardless. A file name change may also be undone.
f는 파일의 새 상태를 인쇄합니다. 즉, 이름이 제공되면 이름을 변경하고 이름이 제공되지 않으면 이름을 인쇄합니다. 파일 이름 변경을 취소할 수도 있습니다.

```
u
f
-. conquest.ms
```

When sam is downloaded, the current file may be changed simply by selecting the desired file from
the menu (selecting the same file subsequently cycles through the windows opened on the file). Otherwise,
the b command can be used to choose the desired file:†
샘이 다운로드되면 메뉴에서 원하는 파일을 선택하기만 하면 현재 파일을 변경할 수 있습니다
(이후 동일한 파일을 선택하면 파일에 열린 창이 계속 순환합니다). 그렇지 않은 경우,
b 명령을 사용하여 원하는 파일을 선택할 수 있습니다.

†Abug prevents the b command from working when downloaded. Because the menu is more convenient anyway, and because the method of choosing files from the command language is slated to change, the bug hasn’t
been fixed.
다운로드 시 b 명령이 작동하지 않는 버그. 어쨌든 메뉴가 더 편리하고 명령어에서 파일을 선택하는 방법이 변경될 예정이기 때문에 버그는 수정
되지 않았습니다.

```
b emacs.ms
-. emacs.ms
```

Again, sam prints the name (actually, executes an implicit f command) because the Unix file emacs.ms is
being read for the first time. It is an error to ask for a file sam doesn’t know about, but the B command will
prime sam’s menu with a new file, and make it current.
다시 말하지만, sam은 Unix 파일 emacs.ms를
처음 읽고 있기 때문에 이름을 출력합니다(실제로는 암시적 f 명령을 실행합니다)
. 샘이 모르는 파일을 요청하는 것은 오류이지만 B 명령은
샘의 메뉴를 새 파일로 프라임하고 최신 상태로 만듭니다.

```
b flood.pic
?no such file ‘flood.pic’
B flood.pic
-. flood.pic
n
- conquest.ms
- death.ms
- emacs.ms
- famine.ms
-. flood.pic
- slaughter.ms
```

Both b and B will accept a list of file names. b simply takes the first file in the list, but B loads them all.
The list may be typed on one line —
b와 B 모두 파일 이름 목록을 허용합니다. b는 단순히 목록의 첫 번째 파일을 가져오지만 B는 모든 파일을 로드합니다.
목록은 한 줄에 입력할 수 있습니다.

```
B devil.tex satan.tex 666.tex emacs.tex
```

— or generated by a Unix command —
- 또는 유닉스 명령으로 생성 -

```
B <echo *.tex
```

The latter form requires a Unix command; sam does not understand the shell file name metacharacters, so
B *.tex attempts to load a single file named *.tex. (The < form is of course derived from sam’s < command.) echo is not the only useful command to run subservient to B; for example,
후자의 형식은 Unix 명령이 필요합니다. 샘은 셸 파일 이름 메타문자를 이해하지 못하므로
B *.tex는 *.tex라는 단일 파일을 로드하려고 시도합니다. (물론 < 형식은 샘의 < 명령에서 파생된 것입니다.) 예를 들어 echo는 B에 종속적으로 실행되는 유일한 유용한 명령은 아닙니다,

```
B <grep -l Emacs *
```

will load only those files containing the string Emacs. Finally,aspecial case: a B with no arguments creates an empty, nameless file within sam.
The complement of B is D:
는 Emacs 문자열이 포함된 파일만 로드합니다. 마지막으로, 특별한 경우: 인수가 없는 B는 샘 내에 이름 없는 빈 파일을 생성합니다.
B의 보수는 D입니다:

```
D devil.tex satan.tex 666.tex emacs.tex
```
eradicates the files from sam’s memory (not from the Unix machine’s disc). D without any file names
removes the current file from sam.
는 샘의 메모리(유닉스 시스템의 디스크가 아닌)에서 파일을 삭제합니다. 파일 이름 없이 D를
실행하면 샘의 현재 파일이 제거됩니다.

There are three other commands that relate the current file to Unix files. The w command writes the
file to disc; without arguments, it writes the entire file to the Unix file associated with the current file in sam
(it is the only command whose default address is not dot). Of course, you can specify an address to be written, and a different file name, with the obvious syntax:
현재 파일을 유닉스 파일과 연관시키는 다른 세 가지 명령이 있습니다. w 명령은
파일을 디스크에쓰고
, 인수가 없으면 현재 파일과 연결된 Unix 파일에 전체 파일을 sam으로 씁
니다(기본 주소가 점이 아닌 유일한 명령입니다). 물론 분명한 구문을 사용하여 쓸 주소와 다른 파일 이름을 지정할 수도 있습니다:

```
1,2w /tmp/revelations
/tmp/revelations: #44
```

sam responds with the file name and the number of characters written to the file. The write command on
the button 3 menu is identical in function to an unadorned w command.
샘은 파일 이름과 파일에 쓰여진 글자 수로 응답합니다. 버튼 3 메뉴의 쓰기 명령은
꾸미지 않은 w 명령과 기능이 동일합니다.

The other two commands, e and r, read data from Unix files. The e command clears out the current
file, reads the data from the named file (or uses the current file’s old name if none is explicitly provided),
and sets the file name. It’s much like a B command, but puts the information in the current file instead of a
new one. e without any file name is therefore an easy way to refresh sam’s copy of a Unix file. [Unlike in
ed, e doesn’t complain if the file is modified. The principle is not to protect against things that can be
undone if wrong.] Since its job is to replace the whole text, e never takes an address.
나머지 두 명령인 e와 r은 Unix 파일에서 데이터를 읽습니다. e 명령은 현재
파일을 지우고, 이름이 지정된 파일에서 데이터를 읽고(또는 명시적으로 제공되지 않은 경우 현재 파일의 이전 이름 사용)
, 파일 이름을 설정합니다. B 명령과 비슷하지만
새 파일 대신 현재 파일에 정보를 넣습니다
. 따라서 파일 이름 없이 e를 사용하면 샘의 유닉스 파일 복사본을 쉽게 새로 고칠 수 있습니다. [ed와 달리
e는 파일이 수정되더라도 불평하지 않습니다. 잘못하면 되돌릴 수 있는 것을 보호하지 않는 것이 원칙입니다
.] 전체 텍스트를 대체하는 것이 임무이므로 e는 주소를 가져가지 않습니다.

The r command is like e, but it doesn’t clear the file: the text in the Unix file replaces dot, or the
specified text if an address is given.
r 명령은 e와 비슷하지만 파일을 지우지는 않습니다. Unix 파일의 텍스트가 점으로 바뀌거나
주소가 지정된 경우 지정된 텍스트로바뀝니다.

```
r emacs.ms
```

has essentially the effect of
는 본질적으로 다음과 같은 효과가 있습니다.

```
<cat emacs.ms
```

The commands r and w will set the name of the file if the current file has no name already defined; e sets
the name even if the file already has one.
현재 파일에 이미 정의된 이름이 없는 경우 r과 w 명령은 파일 이름을 설정하고,
파일에 이미 이름이 있는 경우에도 e 명령은 파일 이름을 설정합니다.

There is a command, analogous to x, that iterates over files instead of pieces of text: X (capital x).
The syntax is easy; it’s just like that of x — X/pattern/command. (The complementary command is Y,
analogous to y.) The effect is to run the command in each file whose menu entry (that is, whose line
printed by an f command) matches the pattern. For example, since an apostrophe identifies modified files,
텍스트가 아닌 파일을 반복하는 x와 유사한 명령이 있습니다: X(대문자 x).
구문은 간단합니다. x - X/pattern/command와 비슷합니다. (보완 명령은
y와 유사한 y입니다.) 그 효과는 메뉴 항목(즉,
f 명령으로 인쇄된 줄
)이 패턴과 일치하는 각 파일에서 명령을 실행하는
것입니다. 예를 들어 아포스트로피는 수정된 파일을 식별하기 때문입니다,

```
X/’/ w
```

writes the changed files out to disc. Here is a longer example: find all uses of a particular variable in the C
source files:
는 변경된 파일을 디스크에 씁니다. 다음은 더 긴 예시입니다. C
소스 파일에서 특정 변수의 모든 용도를 찾습니다:

```
X/\.c$/ ,x/variable/+-p
```

We can use an f command to identify which file the variable appears in:
f 명령을 사용하여 변수가 어느 파일에 나타나는지 식별할 수 있습니다:

```
X/\.c$/ ,g/variable/ {
    f
    ,x/variable/+-{
        =
        p
     }
}
```

Here, the g command guarantees that only the names of files containing the variable will be printed (but
beware that sam may confuse matters by printing the names of files it reads in during the command). The
= command shows where in the file the variable appears, and the p command prints the line.
여기서 g 명령은 변수가 포함된 파일 이름만 인쇄되도록 합니다(단,
명령 중에 읽은 파일 이름까지 인쇄하여 문제를 혼동할 수 있으므로 주의하세요). 명령은
 파일에서 변수가 나타나는 위치를 표시하고, p 명령은 해당 줄을 인쇄합니다.

The D command is handy as the target of an X. This example deletes from the menu all C files that
do not contain a particular variable:
이 예에서는
특정 변수를 포함하지 않는 모든 C 파일을 메뉴에서 삭제하는 D 명령을 X의 대상으로 사용하면 편리합니다
:

```
X/\.c$/ ,v/variable/ D
```

If no pattern is provided for the X, the command (which defaults to f) is run in all files, so
X에 대한 패턴이 제공되지 않으면 모든 파일에서 명령(기본값은 f)이 실행됩니다.

```
X D
```

cleans sam up for a fresh start.
새 출발을 위해 샘을 정리합니다.

But rather than working any further, let’s stop now:
하지만 더 이상 작업하지 말고 여기서 멈추자:

```
q
$
```

Some of the file manipulating commands can be undone: undoing a f, e, or r restores the previous
state of the file, but w, B and D are irrevocable. And, of course, so is q.
일부 파일 조작 명령은 실행 취소가 가능합니다. f, e, r을 실행 취소
하면 파일의 이전
상태가 복원되지만
w, B, D는 실행 취소가 불가능합니다. 물론 q도 마찬가지입니다.










