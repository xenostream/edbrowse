# Org Mode Compact Guide 

<br><br>
# 1 Introduction
Org 모드는 빠르고 효율적인 순수 텍스트 시스템으로 메모를 작성하거나 할 일 목록을 관리하고 프로젝트의 계획을 세울 수 있는 메이저 모드(major mode)입니다. 또한 문서 작성 및 출판 시스템이며 리터러시 프로그래밍과 재현 가능한 연구를 위한 소스 코드 작업도 지원합니다.

이 문서는 포괄적인 Org 모드 매뉴얼을 대폭 “압축해서 정리” 한 것입니다. 여기엔 모든 기본적인 기능과 명령어뿐만 아니라 사용자 정의에 대한 중요한 팁도 포함됩니다. 이 문서는 “분량이 방대하다!” 는 이유로 200페이지에 달하는 매뉴얼 읽기가 부담스러운 초보자를 위해 작성되었습니다.

## 1.1 Installation
> [!NOTE] **중요**: Emacs 배포판에 포함된 Org 버전을 사용할 경우엔 이번 섹션을 건너뛰고 ‘활성화’ 섹션으로 이동합니다.

웹에서 Org를 ‘.zip’ 또는 ‘.tar’ (배포) 파일이나 Git 아카이브 형태로 다운로드한 경우엔 배포 디렉터리에서 직접 실행하는 것이 가장 좋습니다. Emacs 로드 경로에 ‘lisp/’ 하위 디렉터리를 추가해야 합니다. 이를 위해 Emacs 초기화 파일에 다음과 같은 줄을 추가합니다:

```
(add-to-list 'load-path "~/path/to/orgdir/lisp")
```

Git이나 tar 아카이브를 통해 Org를 설치한 경우 자동 로드 정보를 생성하려면 다음과 같은 명령어를 실행합니다.

```
make autoloads
```

## 1.2 Activation
Emacs 초기화 파일에 다음과 같은 줄을 추가해서 Org 버퍼뿐만 아니라 모든 Emacs 버퍼에서 유용하게 사용할 수 있는 세 가지 명령의 전역 단축키를 정의합니다. 적절한 단축키는 직접 선택하시기 바랍니다.

```
(global-set-key (kbd "C-c l") #'org-store-link)
(global-set-key (kbd "C-c a") #'org-agenda)
(global-set-key (kbd "C-c c") #'org-capture)
```

확장자가 ‘.org’ 인 파일은 자동으로 Org 모드로 전환됩니다.

## 1.3 Feedback
Org 모드에서 어떤 문제를 발견했거나 질문, 의견, 제안이 있으면 Org 메일링 리스트(mailto:emacs-orgmode@gnu.org)로 메일을 보내주시기 바랍니다. 버그 보고를 제출하는 방법에 대한 정보는 기본 설명서를 참조합니다.




<br><br>
# 2 Document Structure
`Org mode` 는 “아웃라이너” 입니다. 아웃라인을 사용하면 “문서를 계층적인 구조로 정리” 할 수 있는데 적어도 제게는 이것이 “메모와 생각을 표현하는 가장 좋은 방법” 입니다. 

문서의 구조나 개요를 파악하기 위해 ‘접기(folding)’ 기능을 사용합니다. 즉, 문서 대부분을 숨겨서 전체적인 문서의 구조를 파악하고 현재 작업 중인 부분만 표시하는 방법입니다. Org는 전체 표시 및 숨기기 기능을 `TAB` 키에 할당한 단일 명령어인 `org-cycle` 로 통합함으로써 아웃라인 사용법을 크게 간소화합니다.

## 2.1 Headlines
“제목(headline)은 개요 트리(outline tree)의 구조를 정의” 합니다. 

Org에서 제목은 왼쪽에 여백[^1]없이 하나 이상의 별표와 그 뒤에 공백을 붙여서 시작합니다. 예를 들어:

[^1]: 헤드라인에서 C-a 및 C-e의 특수 동작을 설정하려면 org-special-ctrl-a/e 변수를 참조합니다.

```
* First (top) level headline
** Second level
*** Third level
    some text
*** Third level
    more text
* Another first (top) level headline
```

org-footnote-section 에서 이름을 딴 제목(기본값은 ‘Footnotes’)은 특수한 것으로 간주된다는 점에 유의합니다. 이런 제목을 가진 하위 트리는 내보내기(export) 함수에 의해 아무런 경고없이 무시됩니다.

일부 사용자들은 “별표가 많아서 산만하다!” 고 느끼며 제목 시작 부분의 공백 뒤에 별표 하나만 오는 형식의 개요를 선호합니다. 이를 구현하는 설정 방법은 ‘기타’ 항목을 참조합니다.


## 2.2 Visibility Cycling
아웃라인을 사용하면 버퍼 내의 텍스트를 숨길 수 있습니다. Org는 “TAB” 및 “S-TAB” (org-cycle 및 org-shifttab)에 할당된 두 가지 명령어로 버퍼 내의 텍스트 표시 여부를 변경합니다.

`TAB` (org-cycle)
서브트리 순환: 현재 서브트리를 상태 사이를 순환시킵니다.

```
,-> FOLDED -> CHILDREN -> SUBTREE --.
'-----------------------------------'
```

접두사 인자(C-u TAB)를 사용해서 호출하거나 Shift 키를 누른 상태에서 호출하면 전역 순환 기능이 실행됩니다.

`S-TAB` (org-global-cycle), `C-u TAB` (org-cycle)
전역 사이클링: 버퍼 전체를 상태 사이를 순환시킵니다.

```
,-> OVERVIEW -> CONTENTS -> SHOW ALL --.
'--------------------------------------'
```

`C-u C-u C-u TAB` (org-fold-show-all)
서랍(drawer)을 포함해서 모두 표시합니다.

Emacs가 Org 파일을 처음 열 때의 전역 상태는 showeverything 으로 설정되어 즉, “파일의 모든 내용을 표시” 합니다. 이는 org-startup-folded 변수로 설정할 수 있으며 다음과 같이 ‘overview’, ‘content’, ‘showall’, ‘showeverything’ 또는 ‘show<n>levels’(n = 2..5)를 ‘STARTUP’ 키워드에 추가해서 파일별로 설정할 수 있습니다:

```
#+STARTUP: content
```

## 2.3 Motion
다음 명령어는 버퍼 내의 다른 제목으로 이동합니다.

`C-c C-n` (org-next-visible-heading)\\
다음 제목으로 이동합니다.

`C-c C-p` (org-previous-visible-heading)
이전 제목으로 이동합니다.

`C-c C-f` (org-backward-heading-same-level)
같은 수준(형제)의 다음 제목으로 이동합니다.

`C-c C-b` (outline-backward-same-level)
같은 수준(형제)의 이전 제목으로 이동합니다.

`C-c C-u` (outline-up-heading)
좀 더 높은 수준(부모)의 제목으로 이동합니다.

## 2.4 Structure Editing
`M-RET` (org-meta-return)
현재 제목과 같은 수준의 새로운 제목을 삽입합니다. 만약 커서가 일반 목록 항목에 있을 경우 새로운 항목을 생성합니다(일반 목록 참조). 이 명령을 줄 중간에서 사용하면 줄은 분할되고 나머지 부분은 새로운 heading [^2]가 됩니다.

[^2]: 줄이 나뉘는 것을 원하지 않는다면 org-M-RET-may-split-line 변수를 사용자 정의합니다.

`M-S-RET` (org-insert-todo-heading)
현재 제목과 같은 수준의 새로운 TODO 항목을 삽입합니다.

새로 생성된 빈 항목에서 TAB (org-cycle)
아직 텍스트가 없는 새 항목에서 TAB 키를 누르면 적절한 수준 순서대로 순환합니다.

`M-LEFT` (org-metaleft), `M-RIGHT` (org-metaright)
현재 헤딩의 수준을 한 단계 올리거나 내립니다.

`M-UP` (org-move-subtree-up), `M-DOWN` (org-move-subtree-down)
서브트리 위나 아래로 이동시킵니다. 즉, 같은 수준의 이전 또는 다음 서브트리와 위치를 바꿉니다.

`C-c C-w` (org-refile)
항목이나 영역을 다른 위치로 재배치합니다. ‘재배치(Refile)’ 및 ‘복사(Copy)’를 참조합니다.

`C-x n s` (org-narrow-to-subtree), `C-x n w` (widen)
버퍼를 현재 서브트리로 좁히거나 다시 넓힙니다.

활성 영역(Transient Mark 모드)이 설정된 경우 수준 올리기 및 내리기 기능은 해당 영역 내의 모든 제목에 적용됩니다.

## 2.5 Sparse Trees
Org 모드의 중요한 기능 중 하나는 “아웃라인 트리에서 선택한 정보에 대한 스파스 트리를 구성할 수 있다” 는 점입니다. 이를 통해 문서 전체는 가능한 한 접혀있지만 선택한 정보는 그 위의 제목 구조와 함께 표시됩니다[^3]. 직접 사용해 보시면 어떻게 작동하는지 곧바로 알 수 있습니다.

[^3]: 각 일치 항목 주변에 표시될 컨텍스트의 양을 결정하려면 org-fold-show-context-detail 변수를 참조합니다.

Org 모드는 트리를 생성할 수 있는 여러 명령어가 포함되며 이 모든 명령어는 디스패처를 통해 실행할 수 있습니다:

`C-c /` (org-sparse-tree)
이 명령어는 스파스 트리 생성 명령어를 선택하기 위한 추가 키 입력을 요청합니다.

`C-c / r` (org-occur)
Occur. “정규식을 입력하라” 는 메시지가 표시되며 모든 일치 항목을 포함한 스파스 트리가 표시됩니다. 각 일치 항목은 강조 표시되며 C-c C-c 를 누르면 강조 표시는 사라집니다.

다른 스파스 트리 명령어들은 TODO 키워드, 태그 또는 속성을 기반으로 제목을 선택하며 이에 대해선 이 매뉴얼 뒷부분에 다시 다루겠습니다.

## 2.6 Plain Lists
개요 트리 항목 내에서 수동으로 서식 지정한 목록은 추가적인 구조를 제공할 수 있습니다. 또한 체크박스 목록을 만드는 방법도 제공합니다(‘체크박스’ 섹션 참조). Org는 이런 목록의 편집을 지원하며 모든 내보내기 도구(‘내보내기’ 섹션 참조)는 이를 분석하고 서식을 지정할 수 있습니다.

Org는 순서있는 목록, 순서없는 목록, 설명 목록을 지원합니다.

- 번호없는 목록 항목은 ‘-’, ‘+’ 또는 ‘*’ 를 글머리 기호로 사용해서 시작합니다.
- 순서있는 목록 항목은 ‘1.’ 또는 ‘1)’ 로 시작합니다.
- 설명 목록은 ‘::’ 을 사용해서 용어와 설명을 구분합니다.

동일한 목록에 속한 항목들은 첫 줄의 들여쓰기가 동일해야 합니다. 항목은 해당 글머리 기호나 번호와 같은 들여쓰기 또는 그보다 적은 들여쓰기를 가진 다음 줄이 시작되기 전에 끝납니다. 목록은 모든 항목이 종료되거나 두 줄의 빈 줄이 나오기 전에 끝납니다. 예:

```
* Lord of the Rings
  My favorite scenes are (in this order)
  1. The attack of the Rohirrim
  2. Eowyn's fight with the witch king
     + this was already my favorite scene in the book
     + I really like Miranda Otto.
  Important actors in this film are:
  - Elijah Wood :: He plays Frodo
  - Sean Astin :: He plays Sam, Frodo's friend.
```

다음 명령어들은 커서가 항목 첫 번째 줄(글머리 기호나 번호가 있는 줄)에 있을 때 해당 항목에 적용됩니다.

`TAB` (org-cycle)
항목은 제목 수준과 마찬가지로 접거나 펼 수 있습니다.

`M-RET` (org-insert-heading)
현재 수준에 새로운 항목을 삽입합니다. 접두사 인수를 지정하면 새로운 제목을 강제로 생성합니다(‘구조 편집’ 섹션 참조).

`M-S-RET` (org-insert-todo-heading)
체크박스가 있는 새로운 항목을 삽입합니다(‘체크박스’ 섹션 참조).

`M-UP` (org-move-item-up), `M-DOWN` (org-move-item-down)
하위 항목을 포함해서 항목을 위/아래로 이동합니다(동일한 들여쓰기 수준의 이전/다음 항목과 위치를 바꿉니다). 목록이 정렬된 경우 번호 매기기가 자동 수행됩니다.

`M-LEFT` (org-do-promote), `M-RIGHT` (org-do-demote)
자식 항목을 그대로 두고 항목의 들여쓰기를 줄이거나 늘립니다.

`M-S-LEFT` (org-promote-subtree), `M-S-RIGHT` (org-demote-subtree)
하위 항목을 포함해서 항목의 들여쓰기를 줄이거나 늘립니다.

`C-c C-c` (org-toggle-checkbox)
항목 줄에 체크박스(‘체크박스’ 참조)가 있을 경우 체크박스의 상태를 전환합니다. 또한 전체 목록에서 글머리 기호와 들여쓰기의 일관성을 확인합니다.

`C-c -` (org-cycle-list-bullet)
전체 목록 수준에서 다양한 항목 표시 기호(‘-’, ‘+’, ‘*’, ‘1.’, ‘1)’)를 순환합니다.



<br><br>
# 3 Tables
Org는 빠르고 직관적인 표 편집기가 포함되어 있습니다. Emacs Calc 패키지와 연동해서 스프레드시트와 유사한 계산 기능을 사용할 수 있습니다(GNU Emacs 계산기 설명서 참조).

Org를 사용하면 일반 ASCII로 표의 서식을 쉽게 지정할 수 있습니다. 공백이 아닌 첫 번째 문자가 ‘|’ 인 모든 줄은 “표의 일부로 간주” 합니다. ‘|’ 문자는 “열 구분자 역할” 도 처리합니다. 표는 다음과 같이 표시될 수 있습니다:

```
| Name  | Phone | Age |
|-------+-------+-----|
| Peter |  1234 |  17 |
| Anna  |  4321 |  25 |
```

표 내부에서 TAB, RET 또는 C-c C-c 를 누를 때마다 표는 “자동으로 재정렬” 됩니다. TAB을 누르면 다음 필드로 이동하고(RET을 누르면 다음 행으로 이동), 표의 끝이나 수평선 앞에는 새로운 행이 생성됩니다. 표의 들여쓰기는 첫 번째 행에 따라 결정됩니다. ‘|-’ 로 시작하는 모든 줄은 수평 구분선으로 간주하며 다음 재정렬 시 테이블 전체 너비로 확장됩니다. 따라서 위의 테이블을 만들려면 다음과 같이 입력합니다.

```
|Name|Phone|Age|
|-
```

그런 다음 TAB 키를 눌러 표를 정렬하고 필드에 내용을 입력합니다. ‘|이름|전화번호|나이’ 를 입력한 뒤 C-c RET 을 누르면 좀 더 빠르게 작업할 수 있습니다.

필드에 텍스트를 입력할 때 Org는 DEL, Backspace 및 모든 문자 키를 특별한 방식으로 처리해서 문자를 삽입하거나 삭제할 때 다른 필드의 위치가 이동되지 않도록 처리합니다. 또한, TAB, S-TAB 또는 RET 키를 사용해서 커서를 새로운 필드로 이동한 직후에 입력하면 해당 필드는 자동으로 비워집니다.

## Creation and conversion
C-c | (org-table-create-or-convert-from-region)
활성 영역을 표로 변환합니다. 모든 줄에 적어도 하나의 TAB 문자가 포함되면 이 함수는 해당 내용이 탭으로 구분된 것으로 간주합니다. 모든 줄에 쉼표가 포함되면 쉼표로 구분된 값(CSV)으로 간주합니다. 그렇지 않은 경우 줄은 “공백 기준으로 필드로 분할” 됩니다.

활성 영역이 없을 경우 이 명령은 빈 Org 테이블을 생성합니다. 하지만, | N a m e | P h o n e | A g e RET | - TAB 같이 곧바로 입력을 시작하는 편이 좀 더 쉽습니다.

## Re-aligning and field motion
`C-c C-c` (org-table-align)
커서를 이동하지 않고 표를 다시 정렬합니다.

`TAB` (org-table-next-field)
표를 다시 정렬하고 다음 필드로 이동합니다. 필요할 경우 새로운 행을 생성합니다.

`S-TAB` (org-table-previous-field)
다시 정렬하고 이전 필드로 이동합니다.

`RET` (org-table-next-row)
테이블 정렬을 재조정하고 다음 행으로 이동합니다. 필요할 경우 새로운 행을 생성합니다.

`S-U`P (org-table-move-cell-up), `S-DOWN` (org-table-move-cell-down), `S-LEFT` (org-table-move-cell-left), `S-RIGHT` (org-table-move-cell-right)
인접한 셀과 위치를 바꾸고 셀을 위, 아래, 왼쪽, 오른쪽으로 이동합니다.

## Column and row editing
`M-LEFT` (org-table-move-column-left), `M-RIGHT` (org-table-move-column-right)
현재 열을 왼쪽/오른쪽으로 이동합니다.

`M-S-LEFT` (org-table-delete-column)
현재 열을 삭제합니다.

`M-S-RIGHT` (org-table-insert-column)
커서 위치의 왼쪽에 새로운 열을 삽입합니다.

`M-UP` (org-table-move-row-up), `M-DOWN` (org-table-move-row-down)
현재 행을 위/아래로 이동합니다.

`M-S-UP` (org-table-kill-row)
현재 행 또는 수평선을 삭제합니다.

`M-S-DOWN` (org-table-insert-row)
현재 행 위에 새로운 행을 삽입합니다. 접두사 인수를 지정하면 현재 행 아래에 행을 생성합니다.

`C-c -` (org-table-insert-hline)
현재 행 아래에 수평선을 삽입합니다. 접두사 인수를 지정하면 현재 행 위에 수평선을 생성합니다.

`C-c RET` (org-table-hline-and-move)
현재 행 아래에 수평선을 삽입하고 커서를 그 수평선 바로 아래 행으로 이동시킵니다.

`C-c ^` (org-table-sort-lines)
영역 내의 테이블 행을 정렬합니다. 커서 위치는 정렬에 사용될 열을 나타내며 행의 범위는 가장 가까운 수평 구분선 사이의 범위나 테이블 전체입니다.



<br><br>
# 4 Hyperlinks
HTML과 마찬가지로 Org는 파일 내부 링크는 물론 다른 파일, 유즈넷(Usenet) 게시글, 이메일 등으로 연결되는 외부 링크를 지원합니다.

Org는 각괄호로 묶여있을 수 있는 일반 URI를 인식해서 클릭 가능한 링크로 작동시킵니다. 일반적인 링크 형식은 다음과 같습니다:

```
[[LINK][DESCRIPTION]]
```

또는 다음과 같습니다.

```
[[LINK]]
```

버퍼 내의 링크가 완성되어 모든 괄호가 포함되면 Org는 표시 방식을 변경해서 ‘[[LINK][DESCRIPTION]]’ 대신 ‘DESCRIPTION’, ‘[[LINK]]’ 대신 ‘LINK’ 로 표시합니다. 보이지 않는 LINK 부분을 편집하려면 커서를 링크 위에 둔 상태에서 `C-c C-l` 을 누릅니다.

## Internal links
링크가 URL처럼 보이지 않을 경우 해당 링크는 현재 파일 내부의 링크로 간주합니다. 중요한 경우는 ‘[[#my-custom-id]]’ 같은 링크로 이는 ‘CUSTOM_ID’ 속성이 ‘my-custom-id’ 인 항목으로 연결됩니다.

‘[[My Target]]’ 이나 ‘[[My Target][Find my target]]’ 같은 링크는 현재 파일 내에서 ‘<<My Target>>’ 같은 형식의 해당 타깃에 대한 텍스트 검색으로 이어집니다.

## External Links
Org는 파일, 웹사이트, 유즈넷(Usenet) 및 이메일 메시지, BBDB 데이터베이스 항목 그리고 IRC 대화와 로그에 대한 링크를 지원합니다. 외부 링크는 URL과 유사한 위치 지정자입니다. 외부 링크는 짧은 식별 문자열로 시작하고 그 뒤에 콜론이 옵니다. 콜론 뒤에는 공백이 있을 수 없습니다!! 다음은 몇 가지 예입니다:

```
‘http://www.astro.uva.nl/=dominik’    		웹상
‘file:/home/dominik/images/jupiter.jpg’    	파일, 절대 경로
‘/home/dominik/images/jupiter.jpg’    		위와 동일
‘file:papers/last.pdf’    					파일, 상대 경로
‘./papers/last.pdf’    						위와 동일
‘file:projects.org’    						다른 Org 파일
‘docview:papers/last.pdf::NNN’    			DocView 모드에서 NNN 페이지로 열기
‘id:B7423F4D-2E8A-471B-8810-C40F074717E9’	ID로 표제 링크
‘news:comp.emacs’    						유즈넷 링크
‘mailto:adent@galaxy.net’    				이메일 링크
‘mhe:folder#id’	MH-E 						메시지 링크
‘rmail:folder#id’    						Rmail 메시지 링크
‘gnus:group#id’    							Gnus 기사 링크
‘bbdb:R.*Stallman’    						BBDB 링크 (정규식 사용)
‘irc:/irc.com/#emacs/bob’    				IRC 링크
‘info:org#Hyperlinks’    					Info 노드 링크
```

파일 링크는 링크를 따라갈 때 Emacs가 파일 내의 특정 위치로 이동하는 추가 정보가 포함될 수 있습니다. 이는 줄 번호나 이중 콜론 뒤에 오는 검색 옵션일 수 있습니다. 다음은 몇 가지 예와 설명입니다:

```
‘file:~/code/main.c::255’    				255번째 줄 찾기
‘file:~/xx.org::My Target’    				‘<<My Target>>’ 찾기
‘[[file:~/xx.org::#my-custom-id]]’    		사용자 정의 ID가 있는 항목 찾기
```

## Handling Links
Org는 올바른 구문으로 링크를 생성하고 Org 파일에 삽입하며 링크를 따라가는 방법을 제공합니다.

주요 함수는 org-store-link 이며 M-x org-store-link 로 호출합니다. 이 함수의 중요성을 고려해서 “널리 사용하는 키로 바인딩할 것을 권장” 합니다(‘활성화’ 참조). 이 함수는 현재 위치에 대한 링크를 저장합니다. 저장된 링크는 나중에 Org 버퍼에 삽입할 때 사용됩니다—아래를 참조합니다.

Org 버퍼에서 다음과 같은 명령으로 링크를 생성하고 이동하거나 좀 더 일반적으로 링크에 대한 작업을 수행할 수 있습니다.

`C-c C-l` (org-insert-link)
링크를 삽입합니다. 이 명령을 실행하면 버퍼에 삽입할 링크를 입력하라는 메시지를 표시합니다. 링크를 직접 입력하거나 위/아래 방향 키로 저장된 링크에 접근할 수 있습니다. 링크의 설명 부분을 입력하라는 메시지를 표시합니다.

C-u 접두사 인수로 호출하면 파일 이름 자동 완성 기능으로 파일 링크를 생성합니다.

`C-c C-l` (포인터가 기존 링크에 위치했을 때) (org-insert-link)
포인터가 기존 링크에 위치했을 때 C-c C-l 을 사용하면 링크와 링크의 설명 부분을 편집할 수 있습니다.

`C-c C-o` (open-link-at-point)
커서 위치의 링크를 엽니다.

`C-c &` (org-mark-ring-goto)
기록된 위치로 되돌아갑니다. 위치는 내부 링크를 따르는 명령어나 C-c % 로 기록됩니다. 이 명령을 여러 번 연속 사용하면 이전에 기록된 위치들의 순환 목록을 순차적으로 이동합니다.



<br><br>
# 5 TODO Items
Org 모드에선 할 일 목록을 별도의 문서에 저장할 필요가 없습니다!! 대신, 할 일 항목은 메모 파일의 일부로 포함됩니다. 왜냐하면, 할 일 항목은 대개 메모를 작성하는 도중에 떠오르기 때문입니다! Org 모드를 사용하면 트리 내의 어떤 항목이든 할 일 항목으로 간단히 표시할 수 있습니다. 이렇게 처리하면 정보가 중복되지 않을뿐만 아니라 할 일 항목이 처음 떠올랐던 맥락 속에 그대로 남게 됩니다.

Org 모드는 여러 파일에서 수집된 해야할 일들을 한 눈에 파악할 수 있는 다양한 방법을 제공합니다.

## 5.1 Basic TODO Functionality
제목이 ‘TODO’ 단어로 시작하면 해당 제목은 TODO 항목입니다. 예를 들어:

```
*** TODO Write letter to Sam Fortune
```

TODO 항목을 다룰 때 중요한 명령어는 다음과 같습니다.

`C-c C-t` (org-todo)
현재 항목의 TODO 상태를 다음 중 하나로 순환합니다.

```
,-> (unmarked) -> TODO -> DONE --.
'--------------------------------'
```

`t` 명령 키를 사용하면 아젠다 버퍼에서 “원격으로” 동일한 순환 작업을 수행할 수 있습니다(‘아젠다 버퍼의 명령’ 참조).

`S-RIGHT` (org-shiftright), S-LEFT (org-shiftleft)
순환 작업과 유사하게 다음/이전 TODO 항목을 선택합니다.

`C-c / t` (org-show-todo-tree)
TODO 항목을 스파스 트리 형태로 표시합니다(‘스파스 트리’ 참조). 전체 버퍼를 접지만 ‘not-DONE’ 상태의 모든 TODO 항목과 그 위의 제목 계층 구조를 표시합니다.

`M-x org-agenda t` (org-todo-list)
전역 TODO 목록을 표시합니다. 모든 아젠다 파일(아젠다 보기 참조)에서 (DONE 상태가 아닌) TODO 항목을 수집해서 단일 버퍼로 모읍니다. 자세한 내용은 전역 TODO 목록을 참조합니다.

`S-M-RET` (org-insert-todo-heading)
현재 항목 바로 아래에 새로운 TODO 항목을 삽입합니다.

TODO 상태를 변경하면 태그 변경이 유발될 수 있습니다. 자세한 내용은 org-todo-state-tags-triggers 옵션의 docstring을 참조합니다.

## 5.2 Multi-state Workflow
TODO 키워드를 사용해서 작업 진행 상태를 순차적으로 표시할 수 있습니다:

```
(setq org-todo-keywords
      '((sequence "TODO" "FEEDBACK" "VERIFY" "|" "DONE" "DELEGATED")))
```
      
수직 막대는 ‘TODO’ 키워드(조치가 필요한 상태)와 ‘DONE’ 상태(조치가 필요없는 상태)를 구분합니다. 구분 기호를 지정하지 않으면 마지막 상태가 ‘DONE’ 상태로 사용됩니다. 이 설정에서 C-c C-t 명령을 실행하면 항목이 ‘TODO’ 에서 ‘FEEDBACK’, ‘VERIFY’, ‘DONE’ 과 ‘DELEGATED’ 순으로 순환합니다.

때로는 서로 다른 TODO 키워드 세트를 병행해서 사용할 수 있습니다. 예를 들어, 기본적인 ‘TODO=/=DONE’ 을 유지하면서 버그 수정용 워크플로우도 함께 운영할 수 있습니다. 이 경우 설정은 다음과 같이 처리됩니다:

```
(setq org-todo-keywords
      '((sequence "TODO(t)" "|" "DONE(d)")
        (sequence "REPORT(r)" "BUG(b)" "KNOWNCAUSE(k)" "|" "FIXED(f)")))
```

키워드는 모두 다 달라야 합니다. 이렇게 처리해야 Org 모드가 주어진 항목에 어떤 부분열을 사용하는지 파악할 수 있습니다. 또한 이 예제는 키워드 뒤에 괄호 안에 문자를 추가해서 특정 상태에 빠르게 접근할 수 있는 키를 정의하는 방법도 보여줍니다. C-c C-t 를 입력하면 해당 키를 입력하라는 메시지가 표시됩니다.

단일 파일 내에서만 유효한 TODO 키워드로 정의하려면 파일 내 아무 곳에서 다음과 같은 텍스트를 사용합니다.

```
#+TODO: TODO(t) | DONE(d)
#+TODO: REPORT(r) BUG(b) KNOWNCAUSE(k) | FIXED(f)
#+TODO: | CANCELED(c)
```

이 줄 중 하나를 수정한 후에는 커서를 해당 줄에 둔 상태에서 C-c C-c 를 입력해서 Org 모드에 변경 사항을 반영합니다.

## 5.3 Progress Logging
TODO 상태를 변경할 때 타임스탬프와 메모를 기록하려면 접두사 인수를 지정해서 org-todo 명령을 호출합니다.

`C-u C-c C-t` (org-todo)
메모 입력을 요청하고 TODO 상태 변경 시점을 기록합니다.

Org 모드는 TODO 항목을 DONE 으로 표시할 때 또는 TODO 항목의 상태를 변경할 때마다 타임스탬프를 자동으로 기록하고 선택적으로 메모를 기록할 수 있습니다. 이 시스템은 매우 유연하게 구성할 수 있으며 설정을 키워드별로 지정하거나 특정 파일 또는 하위 트리에만 적용할 수 있습니다. 작업에 소요된 시간을 기록하는 방법에 대한 자세한 내용은 ‘작업 시간 기록’ 을 참조합니다.

### Closing items
가장 기본적인 로깅은 특정 TODO 항목이 언제 완료로 표시된지를 기록하는 것입니다. 이는 다음을 통해 구현할 수 있습니다.[^4]

[^4]: 이에 해당한 인버퍼 설정은 ‘#+STARTUP: logdone’ 입니다.

```
(setq org-log-done 'time)
```

그런 다음 TODO(미완료) 상태의 항목을 DONE 상태로 변경할 때마다 제목 바로 뒤에 ‘CLOSED: [타임스탬프]’ 라는 줄이 삽입됩니다.

타임스탬프와 함께 메모를 기록하려면 다음을[^5] 사용합니다.

[^5]: 이에 해당한 인버퍼 설정은 ‘#+STARTUP: logenotedone’ 입니다.

```
(setq org-log-done 'note)
```

그러면 메모를 입력하라는 메시지가 표시되며 해당 메모는 ‘마무리 메모’ 라는 제목 아래에 항목과 함께 저장됩니다.

### Tracking TODO state changes
TODO 상태의 변경 사항을 추적할 때가 있습니다. 변경 사항에 단순히 타임스탬프만 기록하거나 타임스탬프가 포함된 메모를 기록할 수 있습니다. 이런 기록은 제목 뒤에 항목별 목록 형태로 삽입됩니다. 메모를 많이 작성할 때는 메모를 서랍으로 옮겨서 화면에서 치워둘 수 있습니다. org-log-into-drawer 변수를 사용자 정의해서 이런 동작을 설정할 수 있습니다.

상태 기록의 경우 Org 모드는 키워드별로 설정을 요구합니다. 이는 각 키워드 뒤의 괄호 안에 특수한 마커 ‘!’(타임스탬프용) 및 ‘@’(메모용)를 추가해서 구현합니다. 예를 들어:

```
#+TODO: TODO(t) WAIT(w@/!) | DONE(d!) CANCELED(c@)
```

TODO 키워드와 빠른 접근 키를 정의하며 항목이 ‘DONE’ 으로 설정될 때의 시간을 기록하고 ‘WAIT’ 또는 ‘CANCELED’ 로 전환될 때 메모를 기록하도록 요청합니다. org-todo-keywords 를 설정할 때도 동일한 구문을 사용할 수 있습니다.

## 5.4 Priorities
Org 모드를 많이 사용하면 할 일 항목이 너무 많아져서 우선순위를 정하는 것이 합리적으로 느껴질 수 있습니다. 우선순위를 정하려면 다음과 같이 할 일 항목의 제목에 우선순위 태그를 추가합니다.

```
*** TODO [#A] Write letter to Sam Fortune
```

Org 모드는 ‘A’, ‘B’, ‘C’ 세 가지의 우선순위를 지원합니다. ‘A’ 가 가장 높고 ‘B’ 는 우선순위가 지정되지 않았을 때의 기본값입니다. 우선순위는 의제에만 영향을 미칩니다.

`C-c ,` (org-priority)
현재 제목의 우선순위를 설정합니다. A, B 또는 C 를 눌러 우선순위를 선택하거나 SPC를 눌러 설정을 해제합니다.

`S-UP` (org-priority-up)
`S-DOWN` (org-priority-down)
현재 제목의 우선순위를 높이거나 낮춥니다.

## 5.5 Breaking Tasks Down into Subtasks
대규모 작업을 좀 더 작고 관리하기 쉬운 하위 작업으로 나누는 것이 종종 바람직합니다. 이를 위해 TODO 항목 아래에 개요 트리를 만들고 트리 내에 세부 하위 작업을 추가합니다. 이미 완료로 표시된 하위 작업의 비율을 한 눈에 파악하려면 제목의 아무 곳에서 ‘[/]’ 또는 ‘[%]’ 를 삽입합니다. 이 마커는 하위 항목의 TODO 상태가 변경될 때마다 또는 마커에서 C-c C-c 를 누를 때마다 업데이트됩니다. 예를 들어:

```
* Organize Party [33%]
** TODO Call people [1/2]
*** TODO Peter
*** DONE Sarah
** TODO Buy food
** DONE Talk to neighbor
```

## 5.6 Checkboxes
일반 목록(일반 목록 참조)의 모든 항목은 ‘[ ]’ 문자열로 시작하면 체크박스 형태로 만들 수 있습니다. 체크박스는 전체 TODO 목록에 포함되지 않으므로 작업을 여러 개의 간단한 단계로 나눌 때 자주 사용합니다.

다음은 체크박스 목록의 예입니다.

```
* TODO Organize party [2/4]
  - [-] call people [1/2]
    - [ ] Peter
    - [X] Sarah
  - [X] order food
```

체크박스는 계층적으로 작동하므로 체크박스 항목에 체크박스의 자식 항목이 있을 경우 자식 체크박스 중 하나를 토글하면 부모 체크박스가 자식 항목 중 하나도 선택되지 않았는지 일부가 선택된지 아니라면 모두 선택된지를 반영합니다.

다음 명령어들은 체크박스와 함께 사용할 수 있습니다:

`C-c C-c, C-u C-c C-c` (org-toggle-checkbox)
체크박스의 상태를 전환하거나 접두사 인수를 사용하면 커서 위치의 체크박스 유무를 전환합니다.

`M-S-RET` (org-insert-todo-heading)
체크박스가 포함된 새로운 항목을 삽입합니다. 이 기능은 커서가 이미 일반 목록 항목 내에 있을 때만 작동합니다(일반 목록 참조).



<br><br>
# 6 Tags
정보 간의 상호 연관성을 파악하기 위해 라벨과 컨텍스트를 구현하는 훌륭한 방법은 제목에 태그를 할당하는 것입니다. Org 모드는 태그를 폭넓게 지원합니다.

모든 제목은 태그 목록을 포함할 수 있으며 태그는 제목 끝에 위치합니다. 태그는 문자, 숫자, ‘_’, ‘@’, ‘#’, ‘%’ 로 구성된 일반적인 단어입니다. 태그 앞뒤에는 반드시 콜론(:)이 하나씩 와야만 합니다(예: ‘:work:’). ‘:work:urgent:’ 같이 여러 개의 태그를 지정할 수 있습니다. 태그는 기본적으로 헤드라인과 같은 색상의 굵은 글씨로 표시됩니다.

## Tag inheritance
태그는 개요 트리의 계층적인 구조를 활용합니다. 특정 제목에 특정 태그가 지정되면 모든 하위 제목도 해당 태그를 상속받습니다. 예를 들어, 다음과 같은 목록에서

```
* Meeting with the French group      :work:
** Summary by Frank                  :boss:notes:
*** TODO Prepare slides for him      :action:
```

마지막 제목은 ‘work’, ‘boss’, ‘notes’, ‘action’ 태그가 포함되지만 해당 제목 자체는 이런 태그가 명시적으로 지정되지 않습니다.

또한, 마치 파일 전체를 둘러싸는 가상의 레벨 0에 이런 태그가 정의된 것처럼 파일 내 모든 항목이 상속받을 태그를 설정할 수 있습니다. 다음과 같은 줄을 사용합니다[^6]:

[^6]: 이 모든 인-버퍼 설정과 마찬가지로 C-c C-c 를 누르면 해당 줄의 변경 사항이 적용됩니다.

```
#+FILETAGS: :Peter:Boss:Secret:
```

## Setting tags
태그는 제목 끝부분의 버퍼에 직접 입력합니다. 콜론(:) 뒤에 M-TAB 을 누르면 태그 자동 완성 기능이 제공됩니다. 태그를 삽입하기 위한 특수 명령어도 있습니다:

`C-c C-q` (org-set-tags-command)
현재 제목에 대한 새로운 태그를 입력합니다. Org 모드는 자동 완성 기능을 제공하거나 태그 설정을 위한 특수한 단일 키 인터페이스를 제공합니다(아래 참조).

`C-c C-c` (org-set-tags-command)
포인트가 헤드라인 내에 있을 때 이 명령은 C-c C-q 와 동일한 기능을 수행합니다.

Org는 태그 목록을 기반으로 한 태그 삽입을 지원합니다. 기본적으로 이 목록은 동적으로 생성되며 버퍼에서 현재 사용 중인 모든 태그를 포함합니다. 또한 org-tag-alist 변수를 사용해서 전역적으로 고정된 태그 목록을 지정할 수 있습니다. 마지막으로 ‘TAGS’ 키워드를 사용해서 특정 파일의 기본 태그를 설정할 수 있습니다. 예를 들어,

```
#+TAGS: @work @home @tennisclub
#+TAGS: laptop car pc sailboat
```

기본적으로 Org 모드는 태그 입력을 위해 표준 미니버퍼 자동 완성 기능을 사용합니다. 하지만, ‘빠른 태그 선택(fast tag selection)’ 이란 좀 더 신속한 태그 선택 방법도 구현되어 있습니다. 이를 통해 단 한 번의 키 입력으로 태그를 선택하거나 선택 해제할 수 있습니다. 

이 기능이 원활히 작동하려면 자주 사용하는 태그에 고유한 문자를 할당해야 합니다. Emacs 초기화 파일에 org-tag-alist 변수를 설정해서 전역적으로 이 기능을 적용할 수 있습니다. 예를 들어, 여러 파일의 수 많은 항목에 ‘@home’ 태그를 붙일 수 있습니다. 이 경우 다음과 같이 설정합니다:

```
(setq org-tag-alist '(("@work" . ?w) ("@home" . ?h) ("laptop" . ?l)))
```

해당 태그가 현재 작업 중인 파일에만 관련있다면 대신 ‘TAGS’ 키워드를 다음과 같이 설정할 수 있습니다:

```
#+TAGS: @work(w)  @home(h)  @tennisclub(t)  laptop(l)  pc(p)
```

## Tag groups
태그는 다른 태그들의 집합을 나타내는 그룹 태그로 정의될 수 있습니다. 그룹 태그는 해당 태그 집합에 대한 “좀 더 포괄적인 용어” 로 볼 수 있습니다.

대괄호를 사용하고 그룹 태그와 관련 태그 사이에 콜론을 삽입해서 그룹 태그로 설정할 수 있습니다:

```
#+TAGS: [ GTD : Control Persp ]
```

또는, 그룹 내 태그들이 서로 배타적일 경우:

```
#+TAGS: { Context : @Home @Work }
```

그룹 태그를 검색하면 해당 그룹과 하위 그룹에 속한 모든 구성원에 대한 일치 결과가 반환됩니다. 의제 보기에서 그룹 태그로 필터링하면 해당 그룹 또는 하위 그룹의 구성원 중 적어도 한 명에게 태그가 지정된 헤드라인이 표시되거나 숨겨집니다.

그룹 태그를 일시적으로 무시하려면 C-c C-x q 에 할당된 org-toggle-tags-groups 명령을 사용해서 그룹 태그 지원 기능을 켜거나 끕니다.

## Tag searches
`C-c / m` 또는 `C-c \` (org-match-sparse-tree)
태그 검색 조건에 맞는 모든 헤드라인을 포함한 스파스 트리를 생성합니다. C-u 프리픽스 인수를 지정하면 TODO 행이 아닌 헤드라인은 무시합니다.

`M-x org-agenda m` (org-tags-view)
모든 아젠다 파일에서 태그 일치 항목을 모아 전역 목록으로 생성합니다. ‘태그 및 속성 일치’를 참조합니다.

`M-x org-agenda M` (org-tags-view)
모든 아젠다 파일에서 태그 일치 항목을 모아 전역 목록으로 생성하되 TODO 항목만 확인합니다.

이 명령어들은 모두 일치 문자열을 입력받으며 ‘+boss+urgent-project1’ 같은 기본적인 부울 논리를 사용해서 ‘boss’ 와 ‘urgent’ 태그가 있지만 ‘project1’ 태그는 없는 항목을 찾거나 ‘Kathy|Sally’ 같이 ‘Kathy’ 나 ‘Sally’ 같은 태그가 붙은 항목을 찾을 수 있습니다. 

검색 문자열의 전체 구문은 다양하며 TODO 키워드, 항목 수준 및 속성의 일치 검색도 가능합니다. 좀 더 자세한 설명과 다양한 예제는 ‘태그 및 속성 일치’를 참조합니다.



<br><br>
# 7 Properties
속성은 항목과 연관된 “키-값의 쌍” 입니다. 이런 속성들은 ‘PROPERTIES’ 라는 이름의 특수한 드로어에 저장됩니다. 각 속성은 한 줄에 하나씩 지정되며 키(콜론으로 둘러싸인)가 먼저 오고 그 뒤에 값이 따라옵니다:

```
* CD collection
** Classic
*** Goldberg Variations
    :PROPERTIES:
    :Title:     Goldberg Variations
    :Composer:  J.S. Bach
    :Publisher: Deutsche Grammophon
    :NDisks:    1
    :END:
```

‘Xyz’ 라는 특정 속성에 허용되는 값을 정의하려면 ‘Xyz_ALL’ 속성을 설정합니다. 이 특수 속성은 상속되므로 1단계 항목에서 설정하면 트리 전체에 적용됩니다. 허용되는 값을 미리 정의해 두면 해당 속성을 설정하기 좀 더 쉬워지고 입력 오류도 줄일 수 있습니다. CD 컬렉션 예의 경우 다음과 같이 레이블과 박스당 디스크 수를 미리 정의할 수 있습니다:

```
* CD collection
  :PROPERTIES:
  :NDisks_ALL:  1 2 3 4
  :Publisher_ALL: "Deutsche Grammophon" Philips EMI
  :END:
```

파일 내의 모든 항목이 상속받을 수 있는 속성으로 설정하려면 다음과 같은 줄을 사용합니다:

```
#+PROPERTY: NDisks_ALL 1 2 3 4
```

다음 명령어는 속성을 다루는 데 도움됩니다:

`C-c C-x p` (org-set-property)
속성을 설정합니다. 이 명령어를 실행하면 “속성 이름과 값을 입력하라” 는 메시지가 표시됩니다.

`C-c C-c d` (org-delete-property)
현재 항목에서 속성을 제거합니다.

속성을 기반으로 한 선택 기능을 사용해서 스파스 트리 및 특수 목록을 생성하려면 태그 검색과 동일한 명령을 사용합니다(‘태그’ 참조). 검색 문자열의 구문은 ‘태그 및 속성 일치’ 에 설명되어 있습니다.



<br><br>
# 8 Dates and Times
프로젝트의 계획을 돕기위해 TODO 항목에 날짜 및/또는 시간을 표시할 수 있습니다. 날짜와 시간 정보를 포함하는 특수 형식의 문자열을 Org 모드에선 “타임스탬프” 라고 부릅니다. ‘타임스탬프’ 라는 용어는 흔히 무언가 생성되거나 마지막으로 변경된 시점을 나타낼 때 사용하기 때문에 헷갈릴 수 있습니다. 하지만, Org 모드는 이 용어가 훨씬 더 넓은 의미로 사용됩니다.

타임스탬프는 약속 계획, 작업 일정 수립, 마감일 설정, 시간 추적 등에 사용할 수 있습니다. 다음 섹션은 시간 및 시간 간격과 관련된 일반적인 사용 사례를 위해 Org 모드가 제공하는 타임스탬프 형식과 도구에 대해 설명합니다.

## 8.1 Timestamps
타임스탬프는 ‘<2003-09-16 화>’, ‘<2003-09-16 화 09:39>’ 또는 ‘<2003-09-16 화 12:00-12:30>’ 같은 특수한 형식으로 표기된 날짜(시간 또는 시간 범위가 포함될 수 있음)를 의미합니다. 타임스탬프는 Org 트리 항목의 제목이나 본문 어디나 나타날 수 있습니다. 타임스탬프가 있으면 해당 항목이 일정표의 특정 날짜에 표시됩니다(주간/일일 일정표 참조). 다음을 구분합니다:

### 일반 타임스탬프; 이벤트; 약속
단순 타임스탬프는 항목에 날짜/시간을 지정하는 것입니다. 이는 종이 일정표에 약속이나 행사를 기록하는 것과 같습니다. 하나의 항목에 여러 개의 타임스탬프를 포함할 수 있습니다.

```
* Meet Peter at the movies
  <2006-11-01 Wed 19:15>
* Discussion on climate change
  <2006-11-02 Thu 20:00-22:00>
* My days off
  <2006-11-03 Fri>
  <2006-11-06 Mon>
```

### Timestamp with repeater interval
타임스탬프는 반복 간격이 포함될 수 있으며 이는 해당 타임스탬프가 지정된 날짜뿐만 아니라 N시간(h), 일(d), 주(w), 월(m) 또는 년(y) 단위의 특정 간격마다 반복적으로 적용됨을 나타냅니다. 다음은 매주 수요일마다 일정표에 표시되는 내용입니다:

```
* Pick up Sam at school
  <2007-05-16 Wed 12:30 +1w>
```

### Diary-style expression entries
좀 더 복잡한 날짜 지정을 위해 Org 모드는 Emacs Calendar 패키지에 구현된 특수한 표현식 일기 항목을 사용할 수 있도록 지원합니다. 예를 들어, 선택 사항인 시간을 포함할 경우:

```
* 22:00-23:00 The nerd meeting on every 2nd Thursday of the month
  <%%(diary-float t 4 2)>
```

### Time range
시간 범위는 ‘-’ 로 연결된 두 개의 시간 단위를 가진 타임스탬프입니다.

```
* Discussion on climate change
  <2006-11-02 Thu 10:00-12:00>
```

### Time/Date range
‘--’ 로 연결된 두 개의 타임스탬프는 범위를 나타냅니다. 의제는 해당 범위의 첫 날과 마지막 날 그리고 표시된 날짜 중 해당 범위에 속하는 모든 날짜에 제목이 표시됩니다. 첫 번째 예는 범위의 날짜만 지정하는 반면 두 번째 예는 각 날짜에 대한 시간 범위를 지정합니다.

```
** Meeting in Amsterdam
   <2004-08-23 Mon>--<2004-08-26 Thu>
** This weeks committee meetings
   <2004-08-23 Mon 10:00-11:00>--<2004-08-26 Thu 10:00-11:00>
```

### Inactive timestamp
일반 타임스탬프와 똑같지만 뾰족한 괄호 대신 “둥근 괄호가 사용된다” 는 점이 다릅니다. 이런 타임스탬프는 “일정에 항목이 표시되도록 트리거하지 않는다” 는 점에서 비활성 상태입니다.

```
* Gillian comes late for the fifth time
  [2006-11-01 Wed]
```

## 8.2 Creating Timestamps
Org 모드가 타임스탬프를 인식하려면 특정 형식을 따라야 합니다. 아래에 나열된 모든 명령어는 올바른 형식의 타임스탬프를 생성합니다.

`C-c .` (org-timestamp)
날짜 입력을 요청한 후 해당 타임스탬프를 삽입합니다. 커서가 버퍼 내의 기존 타임스탬프에 위치할 경우 이 명령은 새로운 타임스탬프를 삽입하는 대신 기존 타임스탬프를 수정합니다. 이 명령을 연속 두 번 사용하면 시간 범위가 삽입됩니다. 접두사 인수를 지정하면 현재 시간도 추가됩니다.

`C-c !` (org-timestamp-inactive)
`C-c .` 와 동일하지만 아젠다 항목을 생성하지 않는 비활성 타임스탬프를 삽입합니다.

`S-LEFT` (org-timestamp-down-day), `S-RIGHT` (org-timestamp-up-day)
커서 위치의 날짜를 하루씩 변경합니다.

`S-UP` (org-timestamp-up), `S-DOWN` (org-timestamp-down)
타임스탬프의 시작 괄호나 닫는 괄호에서 해당 타임스탬프의 유형을 변경합니다. 타임스탬프 내부는 커서가 위치한 항목의 값을 변경합니다. 커서는 연도, 월, 일, 시 또는 분에 위치할 수 있습니다. 타임스탬프에 ‘15:30-16:30’ 같은 시간 범위가 포함될 경우 첫 번째 시간을 수정하면 두 번째 시간도 함께 이동해서 시간 블록의 길이를 일정하게 유지합니다. 길이를 변경하려면 두 번째 시간을 수정합니다.

Org 모드가 날짜/시간 입력을 요청할 때 날짜/시간 정보가 포함된 모든 문자열을 허용하며 해당 문자열을 지능적으로 해석해서 지정되지 않은 정보에 대해 현재 날짜와 시간을 기준으로 기본값을 도출합니다. 팝업 달력에서 날짜를 선택할 수 있습니다. 날짜/시간 입력 요청이 정확히 어떻게 작동하는지에 대한 자세한 내용은 설명서를 참조합니다.

## 8.3 Deadlines and Scheduling
계획 수립을 용이하게 만들기 위해 타임스탬프 앞에 특수 키워드를 붙일 수 있습니다:

`C-c C-d` (org-deadline)
제목 다음 줄에 타임스탬프와 함께 ‘DEADLINE’ 키워드를 삽입합니다.

의미: 해당 작업(반드시 그런 것은 아니지만 대개 TODO 항목일 가능성이 높음)은 그 날짜까지 완료되어야 합니다.

마감일이 되면 해당 작업이 일정에 표시됩니다. 또한, 마감일 ‘org-deadline-warning-days’ 일 전부터 오늘의 일정에 마감일이 다가오고 있거나 이미 지났다는 경고가 표시되며 해당 항목이 완료로 표시될 때까지 계속됩니다. 예:

```
*** TODO write article about the Earth for the Guide
    DEADLINE: <2004-02-29 Sun>
    The editor in charge is [[bbdb:Ford Prefect]]
```

`C-c C-s` (org-schedule)
제목 바로 다음 줄에 ‘SCHEDULED’ 키워드와 날짜 스탬프를 삽입합니다.

의미: 지정된 날짜[^7]에 해당 작업에 착수할 계획임을 나타냅니다.

[^7]: 이는 일반적으로 이해되는 회의 일정 잡기와 상당히 다릅니다. Org는 키워드없이 타임스탬프만 삽입하면 회의 일정이 잡힙니다.

제목은 지정된 날짜[^8] 아래에 나열됩니다. 또한, 해당 항목이 완료로 표시될 때까지(즉, 작업이 완료될 때까지 자동으로 이월됨) 오늘의 목록에 예정된 날짜가 지났음을 알리는 알림이 표시됩니다.

[^8]: 이 항목은 완료로 표시된 후에도 해당 날짜에 계속 나열됩니다. 이런 점이 마음에 들지 않는다면 org-agenda-skip-scheduled-if-done 변수를 설정합니다.

```
*** TODO Call Trillian for a date on New Years Eve.
    SCHEDULED: <2004-12-25 Sat>
```

어떤 작업들은 반복 수행할 때가 있습니다. Org 모드는 소위 ‘리피터(repeater)’ 기능을 사용해서 이런 작업들을 ‘DEADLINE’, ‘SCHEDULED’ 또는 일반 타임스탬프로 체계적으로 정리할 수 있습니다. 다음 예를 살펴보겠습니다:

```
** TODO Pay the rent
   DEADLINE: <2005-10-01 Sat +1m>
```

여기서 ‘+1m’ 은 반복자입니다. 이 표현은 해당 작업의 마감일은 ‘<2005-10-01>’ 이며 그 시점부터 매 (1)개월마다 반복된다는 의미로 해석합니다.

## 8.4 Clocking Work Time
Org 모드를 사용하면 프로젝트 내 특정 작업에 소요된 시간을 기록할 수 있습니다.

`C-c C-x C-i` (org-clock-in)
현재 항목에서 시간 기록을 시작합니다(clock-in). 이 명령은 ‘CLOCK’ 키워드와 타임스탬프를 함께 삽입합니다. C-u 접두사 인수를 함께 지정해서 호출하면 최근에 시간을 기록한 작업 목록에서 해당 작업을 선택할 수 있습니다.

`C-c C-x C-o` (org-clock-out)
시간 측정을 중지합니다(clock-out). 이렇게 처리하면 마지막으로 시간 측정을 시작한 위치에 또 다른 타임스탬프가 삽입됩니다. 또한 소요 시간을 직접 계산해서 시간 범위 뒤에 ‘=>HH:MM’  형식으로 삽입합니다.

`C-c C-x C-e` (org-clock-modify-effort-estimate)
현재 타임클록이 적용된 작업의 예상 소요 시간을 업데이트합니다.

`C-c C-x C-q` (org-clock-cancel)
현재 타임클록을 취소합니다. 실수로 타임클록을 시작했거나 다른 작업을 할 경우 유용합니다.

`C-c C-x C-jㅋㅍ (org-clock-goto)
현재 클록이 설정된 작업의 제목으로 이동합니다. C-u 접두사 인수를 사용하면 최근에 클록이 설정된 작업 목록에서 대상 작업을 선택할 수 있습니다.

`l` 키는 아젠다(주간/일일 아젠다 참조)에서 하루 동안 작업했거나 완료한 작업을 표시할 때 사용할 수 있습니다.



<br><br>
# 9 Capture, Refile, Archive
모든 조직이나 시스템에서 중요한 부분은 새로운 아이디어와 작업을 신속하게 수집하고 이에 참고 자료를 연결할 수 있는 능력입니다. Org는 ‘캡처(capture)’ 로 이를 수행합니다. 또한 작업과 관련된 파일(첨부 파일)을 특수 디렉터리에 저장할 수 있습니다. 시스템에 등록된 작업과 프로젝트는 필요에 따라 이동되야 합니다. 완료된 프로젝트 트리를 아카이브 파일로 이동하면 시스템을 보다 간결하고 빠르게 유지할 수 있습니다.

## 9.1 Capture
Capture를 사용하면 업무 흐름을 방해받지 않고 메모를 빠르게 저장할 수 있습니다. 새로운 항목에 대한 템플릿을 정의하고 이를 메모로 저장할 다양한 대상과 연결할 수 있습니다.

### Setting up capture
다음과 같은 사용자 지정은 메모에 대한 기본 target[^9] 파일을 설정합니다.

[^9]: 캡처 템플릿을 사용하면 캡처 위치를 좀 더 세밀하게 제어할 수 있습니다. ‘캡처 템플릿’을 참조합니다.

```
(setq org-default-notes-file (concat org-directory "/notes.org"))
```

또한 새로운 자료를 등록하기 위한 전역 키를 정의할 수 있습니다(‘활성화’ 항목 참조).

### Using capture
`M-x org-capture` (org-capture)
캡처 프로세스를 시작하며 편집을 위해 제한된 보조 버퍼로 이동합니다.

`C-c C-c` (org-capture-finalize)
캡처 버퍼에 정보 입력을 마친 후 C-c C-c 를 누르면 캡처 프로세스 이전의 창 구성으로 돌아가므로 더 이상 방해받지 않고 작업을 재개할 수 있습니다.

`C-c C-w` (org-capture-refile)
노트를 다른 위치로 재저장해서 캡처 과정을 완료합니다(‘재저장 및 복사’ 참조).

`C-c C-k` (org-capture-kill)
캡처 과정을 중단하고 이전 상태로 돌아갑니다.

### Capture templates
다양한 유형의 캡처 항목과 각기 다른 대상에 템플릿을 사용할 수 있습니다. 예를 들어, 하나의 템플릿을 사용해서 일반적인 할 일(TODO) 항목을 생성하고 이 항목들을 ‘~/org/gtd.org’ 파일의 ‘Tasks’ 항목에 저장한다고 가정합니다. 또한, ‘journal.org’ 파일의 날짜 트리에는 일기 항목을 캡처해야 합니다. 사용 가능한 구성은 다음과 같습니다:

```
(setq org-capture-templates
      '(("t" "Todo" entry (file+headline "~/org/gtd.org" "Tasks")
         "* TODO %?\n  %i\n  %a")
        ("j" "Journal" entry (file+datetree "~/org/journal.org")
         "* %?\nEntered on %U\n  %i\n  %a")))
```

그런 다음 캡처 메뉴에서 t 키를 누르면 Org가 다음과 같이 템플릿을 준비합니다:

```
* TODO
  [[file:LINK TO WHERE YOU INITIATED CAPTURE]]
```

템플릿을 확장할 때 특수한 %-에스케이프[^10]을 사용하면 콘텐츠를 동적으로 삽입할 수 있습니다. 다음은 사용 가능한 방법 중 일부에 불과하므로 자세한 내용은 설명서를 참조합니다.

[^10]: 이런 시퀀스 중 하나를 문자그대로 사용할 경우 ‘%’ 앞에 백슬래시를 붙여 이스케이프 처리합니다.

```
‘%a’    		주석. 일반적으로 org-store-link 명령어로 생성된 링크
‘%i’    		초기 내용. C-u 키로 capture를 호출했을 때의 영역
‘%t’, ‘%T’    	타임스탬프. 날짜만 표시하거나 날짜와 시간을 함께 표시
‘%u’, ‘%U’    	위와 같으나 비활성 타임스탬프
‘%?’    		템플릿 작성을 마친 후 커서를 이곳에 위치시킴
```

## 9.2 Refile and Copy
캡처한 데이터를 검토할 때 일부 항목을 다른 목록(예: 프로젝트)으로 정리하거나 복사할 수 있습니다. 항목을 잘라내고 적절한 위치를 찾은 다음 메모를 붙여넣는 과정은 번거롭습니다. 이 과정을 간소화하려면 다음과 같은 특수 명령을 사용할 수 있습니다.

`C-c C-w` (org-agenda-refile)
커서 위치의 항목이나 영역을 다른 위치로 재배치합니다. 이 명령어는 항목을 재배치 가능한 위치를 제시하며 자동 완성 기능을 통해 그 중 하나를 선택할 수 있도록 해줍니다. 해당 항목(또는 영역 내의 모든 항목)은 대상 제목 아래에 하위 항목으로 배치됩니다.

기본적으로 현재 버퍼의 모든 1단계 제목이 대상으로 간주되지만 여러 파일에 걸쳐 좀 더 복잡한 정의를 설정할 수 있습니다. 자세한 내용은 org-refile-targets 변수를 참조합니다.

`C-u C-c C-w` (org-agenda-refile)
재분류 인터페이스를 사용해서 특정 헤딩으로 이동합니다.

`C-u C-u C-c C-w` (org-refile-goto-last-stored)
org-refile 이 마지막으로 트리를 이동시킨 위치로 이동합니다.

`C-c M-w` (org-refile-copy)
복사는 재정렬과 동일하게 작동하지만 원본 노트는 삭제되지 않는다는 점이 다릅니다.

## 9.3 Archiving
(하위)트리로 표시된 프로젝트가 완료되면 해당 트리를 다른 곳으로 옮기고 의제 생성에 포함되지 않도록 처리할 수 있습니다. 이런 아카이빙은 작업 파일을 간결하게 유지하고 의제 보기 구성 같은 전역 검색 속도를 높이는 데 중요합니다.

가장 일반적인 아카이빙 작업은 프로젝트 트리를 다른 파일 즉, 아카이브 파일로 옮기는 것입니다.

`C-c C-x C-a` (org-archive-subtree-default)
org-archive-default-command 변수에 지정된 명령을 사용해서 현재 항목을 아카이브합니다.

`C-c C-x C-s` 또는 약어 `C-c $` (org-archive-subtree)
커서 위치에서 시작하는 서브트리를 org-archive-location 에 지정한 위치로 아카이브합니다.

기본 아카이브 위치는 현재 파일과 동일한 디렉토리의 파일이며 파일명은 현재 파일 이름 뒤에 ‘_archive’ 를 붙여 생성됩니다. 또한 아카이브된 항목을 어떤 헤딩 아래에 저장할지 선택할 수 있으며 파일 내의 날짜 트리(datetree)에 추가할 수 있습니다. 파일 및 헤딩을 지정하는 방법에 대한 정보와 예제는 org-archive-location 변수의 문서 문자열을 참조합니다.

이 변수를 설정하기 위한 인버퍼 옵션도 있습니다. 예를 들면 다음과 같습니다:

```
#+ARCHIVE: %s_done::
```



<br><br>
# 10 Agenda Views
Org의 작동 방식상 TODO 항목, 타임스탬프가 지정된 항목, 태그가 지정된 제목은 하나의 파일 전체에 흩어져 있거나 심지어 여러 파일에 분산될 수 있습니다. 미처리 작업 항목이나 특정 날짜에 중요한 일정에 대한 개요를 파악하려면 이런 정보를 수집하고 정렬한 뒤 체계적인 방식으로 표시해야 합니다.

추출된 정보는 특수한 의제 버퍼에 표시됩니다. 이 버퍼는 읽기 전용이지만 원본 Org 파일의 해당 위치로 이동하거나 심지어 원격으로 해당 파일을 편집할 수 있는 명령어를 제공합니다. 의제 버퍼에서 원격 편집이 가능하다는 것은 예를 들어, 의제 버퍼에서 마감일이나 약속 날짜를 변경할 수 있음을 의미합니다. 의제 버퍼에서 사용할 수 있는 명령어는 ‘의제 버퍼의 명령어’ 를 참조합니다.

## 10.1 Agenda Files
표시될 정보는 일반적으로 모든 아젠다 파일 즉, org-agenda-files 변수에 나열된 파일들에서 수집됩니다.

`C-c [` (org-agenda-file-to-front)
현재 파일을 아젠다 파일 목록에 추가합니다. 파일은 목록 맨 앞으로 추가됩니다. 이미 목록에 있을 경우 맨 앞으로 이동됩니다. 접두사 인수를 지정하면 파일이 목록 맨 뒤로 추가되거나 이동됩니다.

`C-c ]` (org-remove-file)
현재 파일을 아젠다 파일 목록에서 제거합니다.

`C-'`
`C-,` (org-cycle-agenda-files)
아젠다 파일 목록을 순차적으로 순환하며 파일을 하나씩 차례대로 열어서 확인합니다.

## 10.2 The Agenda Dispatcher
뷰는 디스패처로 생성되며 M-x org-agenda 를 통해 접근하거나 좀 더 좋은 방법은 전역 키에 바인딩해서 사용할 수 있습니다(‘활성화’ 참조). 디스패처는 메뉴를 표시하며 여기서 명령을 실행하려면 추가 문자를 입력해야 합니다. 디스패처는 다음과 같은 기본 명령을 제공합니다:

`a`
달력 형식의 아젠다를 생성합니다(‘주간/일일 아젠다’ 참조).

`t, T`
모든 TODO 항목 목록을 생성합니다(‘전역 TODO 목록’ 참조).

`m, M`
주어진 표현식과 일치한 헤드라인 목록을 생성합니다(‘태그 및 속성 일치’ 참조).

`s`
항목 내에 반드시 포함되거나 포함되선 안 되는 키워드 또는 정규 표현식의 부울 표현식으로 선택된 항목 목록을 생성합니다.

## 10.3 The Weekly/Daily Agenda
주간/일일 일정표의 목적은 종이 일정표의 한 페이지처럼 작동해서 해당 주 또는 당일의 모든 작업을 보여주는 것입니다.

`M-x org-agenda a` (org-agenda-list)
Org 파일 목록을 바탕으로 해당 주의 일정표를 생성합니다. 이 일정표는 매일의 항목이 표시됩니다.

Org 모드는 일기 구문을 인식하며 Org 파일 내에서 일기 표현식 항목을 직접 사용할 수 있도록 해줍니다:

```
* Holidays
  :PROPERTIES:
  :CATEGORY: Holiday
  :END:
%%(org-calendar-holiday)   ; special function for holiday names

* Birthdays
  :PROPERTIES:
  :CATEGORY: Ann
  :END:
%%(org-anniversary 1956  5 14) Arthur Dent is %d years old
%%(org-anniversary 1869 10  2) Mahatma Gandhi would be %d years old
```
Org는 Emacs의 일정 알림 기능과 연동할 수 있습니다. 일정 파일에 일정을 추가하려면 org-agenda-to-appt 명령어를 사용합니다.

## 10.4 The Global TODO List
전역 TODO 목록은 완료되지 않은 모든 TODO 항목이 정렬되어 한 곳으로 모아져 있습니다. TODO 항목의 원격 편집 기능을 사용하면 키를 한 번만 눌러도 TODO 항목의 상태를 변경할 수 있습니다. TODO 목록에서 사용할 수 있는 명령어는 ‘아젠다 버퍼의 명령어’ 를 참조합니다.

`M-x org-agenda t` (org-todo-list)
전역 TODO 목록을 표시합니다. 이 명령은 모든 아젠다 파일(‘아젠다 보기’ 참조)에서 TODO 항목을 수집해서 하나의 버퍼로 통합합니다.

`M-x org-agenda T` (org-todo-list)
위와 동일하지만 특정 TODO 키워드를 선택할 수 있습니다.

## 10.5 Matching Tags and Properties
의제 파일의 제목에 태그(‘태그’ 참조)가 지정되어 있거나 속성(‘속성’ 참조)이 설정된 경우 이 메타데이터를 기준으로 제목을 선택해서 의제 버퍼로 모을 수 있습니다. 여기서 설명하는 일치 구문은 C-c / m 을 사용해서 스파스 트리를 생성할 때도 적용됩니다.

`M-x org-agenda m` (org-tags-view)
지정된 태그 집합과 일치한 모든 제목 목록을 생성합니다. 이 명령은 선택 기준을 입력하도록 요청하며 선택 기준은 ‘+work+urgent-withboss’ 나 ‘work|home’ 같이 태그를 포함한 부울 논리 표현식입니다(태그 참조). 특정 검색을 자주 수행할 경우 이를 위한 사용자 정의 명령을 정의합니다(아젠다 디스패처 참조).

`M-x org-agenda M` (org-tags-view)
m 과 유사하지만 TODO 항목인 헤드라인만 선택합니다.

검색 문자열은 AND 를 나타내는 부울 연산자 ‘&’ 와 OR 을 나타내는 ‘|’ 를 사용할 수 있습니다. ‘&’ 는 ‘|’ 보다 우선순위가 높습니다!! 현재 괄호는 구현되지 않았습니다. 검색의 각 요소는 태그, 태그와 일치한 정규 표현식 또는 비교 연산자가 포함된 ‘PROPERTY OPERATOR VALUE’ 같은 표현식(속성 값에 접근) 중 하나입니다. 각 요소 앞에는 ‘-’ 를 붙여 해당 요소를 제외할 수 있으며 ‘+’ 는 긍정 선택을 나타내는 구문적 편의 표현입니다. ‘+’ 나 ‘-’ 가 포함된 경우 AND 연산자 ‘&’ 는 생략 가능합니다. 

다음은 태그만 사용한 몇 가지 예입니다.

‘+work-boss’
‘work’ 태그가 붙은 헤드라인을 선택하되 ‘boss’ 태그도 함께 붙은 것은 제외합니다.

‘work|laptop’
‘work’ 또는 ‘laptop’ 태그가 붙은 줄을 선택합니다.

‘work|laptop+night’
앞서 설명한 것과 같지만 ‘laptop’ 태그가 붙은 줄은 반드시 ‘night’ 태그도 함께 붙어 있어야 합니다.

태그와 일치시키는 동시에 속성도 확인할 수 있습니다. 자세한 내용은 설명서를 참조합니다.

## 10.6 Search View
이 아젠다 보기는 Org 모드 항목을 대상으로 하는 일반적인 텍스트 검색 기능입니다. 이는 특히 메모를 찾을 때 유용합니다.

`M-x org-agenda s` (org-search-view)
이 기능은 부울 논리를 사용해서 부분 문자열이나 특정 단어를 일치시켜 항목을 선택할 수 있게 해주는 특수 검색 기능입니다.

예를 들어, 검색 문자열 ‘computer equipment’ 는 ‘computer equipment’ 를 부분 문자열로 포함한 항목과 일치합니다.

검색 보기는 부울 논리를 사용해서 항목 내의 특정 키워드를 검색할 수 있습니다. 검색 문자열 ‘+computer +wifi -ethernet -{8\.11[bg]}’ 는 ‘computer’ 와 ‘wifi’ 키워드를 포함하되 ‘ethernet’ 키워드는 포함하지 않고 정규 표현식 ‘8\.11[bg]’ 와 일치하지 않는(즉, ‘8.11b’와 ‘8.11g’를 모두 제외하는) 노트 항목을 찾아냅니다.

이 명령어는 의제 파일 외에도 org-agenda-text-search-extra-files 에 나열된 파일들도 검색한다는 점에 유의합니다.

## 10.7 Commands in the Agenda Buffer
의제 버퍼의 항목들은 해당 항목이 생성된 Org 파일이나 일기 파일로 연결되어 있습니다. 의제 버퍼 자체를 편집할 수는 없지만 원본 항목의 위치를 표시하거나 해당 위치로 이동하는 명령어와 의제 버퍼에서 Org 파일을 “원격으로” 편집할 수 있는 명령어가 제공됩니다. 이는 수 많은 명령어 중 일부에 불과하므로 전체 목록을 확인하려면 의제 메뉴와 설명서를 살펴보시기 바랍니다.

### Motion
`n` (org-agenda-next-line)
다음 줄 (DOWN 및 C-n과 동일).

`p` (org-agenda-previous-line)
이전 줄 (UP 및 C-p와 동일).

### View/Go to Org file
`SPC` (org-agenda-show-and-scroll-up)
다른 창에서 항목의 원래 위치를 표시합니다. 접두사 인수를 지정하면 드로어가 접힌 상태로 유지됩니다.

`TAB` (org-agenda-goto)
다른 창에서 항목의 원래 위치로 이동합니다.

`RET` (org-agenda-switch-to)
항목의 원래 위치로 이동하고 다른 창들을 닫습니다.

### Change display
`o` (delete-other-windows)
다른 창을 닫습니다.

`v d` 또는 단축키 `d` (org-agenda-day-view)
일별 보기로 전환합니다.

`v w` 또는 단축키 `w` (org-agenda-week-view)
주간 보기로 전환합니다.

`f` (org-agenda-later)
시간을 앞으로 이동해서 현재 기간 다음의 기간을 표시합니다. 예를 들어, 표시 범위가 일주일인 경우 다음 주로 전환합니다.

`b` (org-agenda-earlier)
시간을 뒤로 이동해서 이전 날짜를 표시합니다.

`.` (org-agenda-goto-today)
오늘로 이동합니다.

`j` (org-agenda-goto-date)
날짜를 입력하라는 메시지가 표시되고 해당 날짜로 이동합니다.

`v l` 또는 `v L` 또는 짧은 `l` (org-agenda-log-mode)
로그북 모드로 전환합니다. 로그북 모드는 로그 기록이 활성화된 상태에서 완료로 표시된 항목(org-log-done 변수 참조)과 해당 날에 기록된 항목이 아젠다에 표시됩니다. C-u 접두사 인수를 함께 호출하면 상태 변경 사항을 포함해서 가능한 모든 로그북 항목을 표시합니다.

`r, g` (org-agenda-redo)
항목의 타임스탬프를 수정한 이후의 변경 사항을 반영하는 등, 아젠다 버퍼를 다시 생성합니다.

`s` (org-save-all-org-buffers)
현재 Emacs 세션의 모든 Org 버퍼와 ID의 위치를 저장합니다.

### Remote editing
`0--9`
숫자 인자.

`t` (org-agenda-todo)
아젠다와 원본 Org 파일 모두에서 항목의 TODO 상태를 변경합니다.

`C-k` (org-agenda-kill)
현재 아젠다 항목과 원본 Org 파일 내 해당 항목에 속한 전체 하위 트리를 함께 삭제합니다.

`C-c C-w` (org-agenda-refile)
커서 위치의 항목을 다시 정리합니다.

`a` (org-agenda-archive-default-with-confirmation)
org-archive-default-command 에 설정된 기본 아카이빙 명령을 사용해서 커서 위치의 항목에 해당하는 서브트리를 아카이브합니다.

`$` (org-agenda-archive)
현재 헤드라인에 해당하는 서브트리를 아카이브합니다.

`C-c C-s` (org-agenda-schedule)
이 항목을 일정으로 등록합니다. 접두사 인수를 지정하면 일정 타임스탬프를 제거합니다.

`C-c C-d` (org-agenda-deadline)
이 항목에 마감일을 설정합니다. 접두사 인수를 지정하면 마감일을 제거합니다.

`S-RIGHT` (org-agenda-do-date-later)
현재 줄에 연결된 타임스탬프를 하루 앞으로 변경합니다.

`S-LEFT` (org-agenda-do-date-earlier)
현재 줄에 연결된 타임스탬프를 하루 과거로 변경합니다.

`I` (org-agenda-clock-in)
현재 항목에 대한 타이머를 시작합니다.

`O` (org-agenda-clock-out)
이전에 시작한 타이머를 중지합니다.

`X` (org-agenda-clock-cancel)
현재 실행 중인 타이머를 취소합니다.

`J` (org-agenda-clock-goto)
다른 창에서 실행 중인 타이머로 이동합니다.

### Quit and exit
`q` (org-agenda-quit)
아젠다를 종료하고 아젠다 버퍼를 제거합니다.

`x` (org-agenda-exit)
아젠다를 종료하고 아젠다 버퍼와 아젠다 생성을 위해 Emacs가 불러온 모든 버퍼를 제거합니다.

## 10.8 Custom Agenda Views
사용자 지정 검색의 첫 번째 용도는 자주 사용하는 검색에 대한 키보드 단축키를 정의하는 것으로 어젠다 버퍼를 생성하거나 스파스 트리를 생성하는 데 사용됩니다(물론 후자는 현재 버퍼만 포함합니다).

사용자 정의 명령은 org-agenda-custom-commands 변수로 구성됩니다. 예를 들어, 아젠다 디스패처에서 C 키를 눌러 이 변수를 사용자 정의할 수 있습니다(‘아젠다 디스패처’ 참조). 또한 Emacs 초기화 파일에서 Emacs Lisp을 사용해서 직접 설정할 수 있습니다. 다음 예제에는 유효한 모든 아젠다 보기가 포함되어 있습니다:

```
(setq org-agenda-custom-commands
      '(("w" todo "WAITING")
        ("u" tags "+boss-urgent")
        ("v" tags-todo "+boss-urgent")))
```

각 항목의 첫 번째 문자열은 해당 명령에 접근하기 위해 디스패처 명령어 뒤에 입력할 키를 정의합니다. 보통 이는 단일 문자로 구성됩니다. 두 번째 매개변수는 검색 유형이며 그 뒤에 일치 검색에 사용될 문자열이나 정규 표현식이 이어집니다. 따라서 위의 예는 다음을 정의합니다:

`w`
는 TODO 키워드가 ‘WAITING’ 인 TODO 항목에 대한 전역 검색을 의미합니다.

`u`
‘boss’ 태그가 붙어있지만 ‘urgent’ 태그가 없는 헤드라인에 대한 전역 태그 검색으로 정의합니다.

`v`
동일한 검색이지만 TODO 항목이기도 한 헤드라인으로만 범위를 제한합니다.



<br><br>
# 11 Markup for Rich Contents
Org는 주로 일반 텍스트 메모를 정리하고 검색하는 데 중점을 둡니다. 하지만, 동시에 서식 지정 등 다양한 기능을 위한 가볍지만 강력한 마크업 언어도 제공합니다. 내보내기 프레임워크(‘내보내기’ 항목 참조)와 함께 사용하면 Org로 멋진 문서를 작성할 수 있습니다.

## 11.1 Paragraphs
단락은 최소 한 줄의 빈 줄로 구분됩니다. 단락 내에서 강제로 줄 바꿈하려면 줄 끝에 ‘\\’ 를 사용합니다.

특정 영역에서 줄 바꿈, 들여쓰기 및 빈 줄을 유지하되 그 외에는 일반 서식을 적용할 때 이 구문을 사용할 수 있으며 이 구문은 시를 서식 지정할 때도 사용할 수 있습니다.

```
#+BEGIN_VERSE
 Great clouds overhead
 Tiny black birds rise and fall
 Snow covers Emacs

    ---AlexSchroeder
#+END_VERSE
```

다른 문서의 구절을 인용할 때는 일반적으로 좌우 여백 모두 들여쓰기된 단락으로 서식을 지정하는 것이 관례입니다. Org 문서는 다음과 같이 “인용문” 을 삽입할 수 있습니다:

```
#+BEGIN_QUOTE
Everything should be made as simple as possible,
but not any simpler ---Albert Einstein
#+END_QUOTE
```

텍스트를 가운데 정렬하려면 다음과 같이 처리합니다:

```
#+BEGIN_CENTER
Everything should be made as simple as possible, \\
but not any simpler
#+END_CENTER
```

## 11.2 Emphasis and Monospace
단어를 ‘*굵게*’, ‘/이탤릭체/’, ‘_밑줄_’, ‘=원문 그대로=’ 및 ‘~코드~’ 로 표시할 수 있으며 꼭 필요하다면 ‘+취소선+’ 도 사용할 수 있습니다. 코드 및 원문그대로 표시된 문자열 내의 텍스트는 Org 고유의 구문으로 처리되지 않으며 원문그대로 내보내집니다.

## 11.3 Embedded LaTeX
수학 기호나 가끔씩 등장하는 수식을 포함하는 과학적 노트 작성 시 Org 모드는 파일에 LaTeX 코드를 직접 삽입하는 기능을 지원합니다. 특수 기호를 표기하거나 수식을 입력하고 전체 LaTeX 환경을 직접 TeX와 유사한 구문을 사용해서 사용할 수 있습니다.

```
The radius of the sun is R_sun = 6.96 x 10^8 m.  On the other hand,
the radius of Alpha Centauri is R_{Alpha Centauri} = 1.28 x R_{sun}.

\begin{equation}                        % arbitrary environments,
x=\sqrt{b}                              % even tables, figures
\end{equation}                          % etc

If $a^2=b$ and \( b=2 \), then the solution must be
either $$ a=+\sqrt{2} $$ or \[ a=-\sqrt{2} \].
```

## 11.4 Literal examples
마크업이 적용되지 않을 구문을 포함할 수 있습니다. 이런 예는 고정폭 글꼴로 표시되므로 소스 코드나 이와 유사한 예에 매우 적합합니다.

```
#+BEGIN_EXAMPLE
  Some example from a text file.
#+END_EXAMPLE
```

간단한 예제를 다룰 때는 예제 줄 맨 앞에 콜론과 공백을 붙여서 시작할 수 있습니다. 콜론 앞에 추가 공백이 있을 수 있습니다:

```
Here is an example
   : Some example from a text file.
```

예제가 프로그래밍 언어의 소스 코드나 Emacs의 Font Lock 기능을 통해 마크업할 수 있는 텍스트일 경우 해당 예제가 Font Lock이 적용된 Emacs 버퍼와 같은 모양으로 표시되도록 요청할 수 있습니다.

```
#+BEGIN_SRC emacs-lisp
  (defun org-xor (a b)
    "Exclusive or."
    (if a (not b) b))
 #+END_SRC
```
 
이 언어를 지원하는 특수 버퍼에서 예제를 편집하려면 C-c ' 를 사용해서 편집 버퍼로 진입하고 빠져나옵니다.

## 11.5 Images
이미지는 설명 부분이 없는 이미지 파일에 대한 링크입니다. 예를 들어,

```
./img/cat.jpg
```

이미지에 캡션을 정의하거나 내부 상호 참조를 위한 레이블(‘하이퍼링크’ 참조)을 지정하려면 해당 링크가 별도의 줄에 위치하도록 만들고 다음과 같이 ‘CAPTION’ 및 ‘NAME’ 키워드를 앞에 붙입니다:

```
#+CAPTION: This is the caption for the next figure link (or table)
#+NAME:   fig:SED-HR4049
[[./img/a.jpg]]
```

## 11.6 Creating Footnotes
각주는 0열에 괄호로 묶인 각주 표시자로 시작되는 단락에 정의되며 들여쓰기는 허용되지 않습니다!! 각주 참조는 본문 내의 괄호로 묶인 각주 표시자 그 자체입니다. 예를 들어:

```
The Org website[fn:1] now looks a lot better than it used to.
...
[fn:1] The link is: https://orgmode.org
```

다음 명령어들은 각주를 처리합니다:

`C-c C-x f` (org-footnote-action)
각주 처리 명령어입니다. 커서가 각주 참조 위치에 있을 때는 정의 위치로 이동합니다. 정의 위치에 있을 때는 (첫 번째) 참조 위치로 이동합니다. 그 외의 경우는 새로운 각주를 생성합니다. 이 명령어를 접두사 인수를 지정해서 호출하면 번호 재지정을 포함한 추가 옵션 메뉴가 표시됩니다.

`C-c C-c` (org-ctrl-c-ctrl-c)
정의와 참조 사이를 오갑니다.



<br><br>
# 12 Exporting
Org는 문서의 구조(‘문서 구조’ 참조)와 마크업(‘리치 콘텐츠용 마크업’ 참조)을 최대한 유지한채로 문서를 다양한 다른 형식으로 변환하고 내보낼 수 있습니다.

## 12.1 The Export Dispatcher
내보내기 디스패처는 Org의 내보내기 기능을 위한 주요 인터페이스입니다. 계층형 메뉴를 통해 현재 설정된 내보내기 형식을 확인할 수 있습니다. 옵션들은 같은 화면에서 간편하게 전환할 수 있는 토글 스위치 형태로 표시됩니다.

`C-c C-e` (org-export-dispatch)
내보내기 디스패처 인터페이스를 호출합니다.

Org는 기본적으로 전체 버퍼를 내보냅니다. Org 버퍼에 활성 영역이 설정된 경우 Org는 해당 영역만 내보냅니다.

## 12.2 Export Settings
수출기는 버퍼 내에서 추가 정보를 제공하는 특수 줄을 인식합니다. 이런 줄은 파일 내 어디나 위치할 수 있습니다:

```
#+TITLE: I'm in the Mood for Org
```

가장 대표적인 수출 품목은 다음과 같습니다:

```
‘TITLE’	the title to be shown
‘AUTHOR’	the author (default taken from user-full-name)
‘DATE’	a date, fixed, or an Org timestamp
‘EMAIL’	email address (default from user-mail-address)
‘LANGUAGE’	language code, e.g., ‘en’
```

옵션 키워드 세트는 내보내기 디스패처(‘내보내기 디스패처’ 참조)에서 # 키를 눌러 ‘템플릿 삽입’ 명령을 사용해서 삽입할 수 있습니다.

## 12.3 Table of Contents
목차는 문서의 모든 제목이 포함됩니다. 따라서 목차의 계층 수준은 파일 내 제목의 계층 수준과 동일합니다. 다른 계층 수준을 사용하거나 목차를 완전히 비활성화하려면 org-export-with-toc 변수를 적절히 설정합니다. ‘OPTIONS’ 키워드에 ‘toc’ 항목을 사용해서 파일별로 동일한 설정을 적용할 수 있습니다:

```
#+OPTIONS: toc:2          (only include two levels in TOC)
#+OPTIONS: toc:nil        (no default TOC at all)
```

Org는 일반적으로 파일의 첫 번째 제목 앞에 목차를 삽입합니다.

## 12.4 Include Files
내보내기 시 다른 파일의 내용을 포함시킬 수 있습니다. 예를 들어, ‘.emacs’ 파일을 포함시키려면 다음과 같이 입력합니다:

```
#+INCLUDE: "~/.emacs" src emacs-lisp
```

첫 번째 매개변수는 포함할 파일 이름입니다. 선택 사항인 두 번째 매개변수는 블록 유형(‘example’, ‘export’ 또는 ‘src’)을 지정합니다. 선택 사항인 세 번째 매개변수는 내용 서식에 사용할 소스 코드 언어를 지정합니다. 이는 ‘export’ 및 ‘src’ 블록 유형 모두에 적용됩니다.

`C-c '.` 을 입력하면 포함된 파일을 열 수 있습니다.

## 12.5 Comment Lines
0개 이상의 공백 문자로 시작하고 그 뒤에 ‘#’ 하나와 공백이 오는 줄은 주석으로 처리되며 따라서 내보내지 않습니다.

마찬가지로, ‘#+BEGIN_COMMENT’ … ‘#+END_COMMENT’ 로 둘러싸인 영역도 내보내지 않습니다.

마지막으로 항목 시작 부분에 다른 키워드나 우선순위 쿠키 뒤에 ‘COMMENT’ 키워드가 있으면 해당 하위 트리 전체가 주석 처리됩니다. 다음 명령어는 제목의 주석 상태를 변경하는 데 도움됩니다.

`C-c ;` (org-toggle-comment)
항목 시작 부분의 ‘COMMENT’ 키워드를 토글합니다.

## 12.6 ASCII/UTF-8 Export
ASCII 내보내기는 일반 ASCII 문자만 포함된 출력 파일을 생성합니다. 이는 가장 간단하고 직접적인 텍스트 출력 방식입니다. 여기엔 Org 마크업이 전혀 포함되지 않습니다!! UTF-8 내보내기는 인코딩 표준에서 사용할 수 있는 추가 문자와 기호를 사용합니다.

`C-c C-e t a`, `C-c C-e t u` (org-ascii-export-to-ascii)
확장자가 ‘.txt’ 인 ASCII 파일로 내보냅니다. ‘myfile.org’ 의 경우 Org는 ‘myfile.txt’ 로 내보내며 경고없이 기존 파일을 덮어씁니다!! ‘myfile.txt’ 의 경우 데이터 손실을 방지하기 위해 Org는 ‘myfile.txt.txt’ 로 내보냅니다.

## 12.7 HTML Export
Org 모드는 XHTML 1.0 Strict 표준과 호환되는 광범위한 HTML 서식 기능을 갖춘 HTML 내보내기 기능이 포함되어 있습니다.

`C-c C-e h h` (org-html-export-to-html)
확장자가 ‘.html’ 인 HTML 파일로 내보냅니다. ‘myfile.org’ 의 경우 Org는 ‘myfile.html’ 로 내보내며 경고없이 기존 파일을 덮어씁니다. C-c C-e h o 를 입력하면 HTML로 내보낸 후 웹 브라우저에서 해당 파일을 엽니다.

HTML 내보내기 백엔드는 ‘<’ 와 ‘>’ 를 ‘&lt;’ 와 ‘&gt;’ 로 변환합니다. Org 파일에 원시 HTML 코드를 포함해서 HTML 내보내기 백엔드가 해당 HTML 코드를 출력에 삽입할 수 있도록 하려면 ‘@@html:...@@’ 같은 인라인 구문을 사용합니다. 예를 들어:

```
@@html:<b>@@bold text@@html:</b>@@
```

좀 더 큰 원본 HTML 코드 블록의 경우 다음과 같은  HTML 내보내기 코드 블록을 사용합니다:

```
#+HTML: Literal HTML code for export

#+BEGIN_EXPORT html
  All lines between these markers are exported literally
#+END_EXPORT
```

## 12.8 LaTeX Export
LaTeX 내보내기 백엔드는 복잡한 문서를 처리하고 표준 또는 사용자 정의 LaTeX 문서 클래스를 통합하며 대체 LaTeX 엔진을 사용해서 문서를 생성하고 상호작용 가능한 온라인 열람이나 고품질 인쇄 출판을 위해 색인, 참고 문헌 및 목차가 포함된 완전한 하이퍼링크가 적용된 PDF 파일을 생성할 수 있습니다.

기본적으로 LaTeX 출력은 article 클래스를 사용합니다. 파일 내에 ‘#+LATEX_CLASS: myclass’ 같은 옵션을 추가해서 이를 변경할 수 있습니다. 해당 클래스는 org-latex-classes 에 등록되야 합니다.

`C-c C-e l l` (org-latex-export-to-latex)
확장자가 ‘.tex’ 인 LaTeX 파일로 내보냅니다. ‘myfile.org’ 의 경우 Org는 ‘myfile.tex’ 로 내보내며 경고없이 기존 파일을 덮어씁니다.

`C-c C-e l p` (org-latex-export-to-pdf)
LaTeX 파일로 내보낸 후 PDF 파일로 변환합니다.

`C-c C-e l o` (<해당하는 명령어 없음>)
LaTeX 파일로 내보낸 후 PDF로 변환하고 기본 뷰어를 사용해서 PDF를 엽니다.

LaTeX 내보내기 백엔드는 임의의 LaTeX 코드를 삽입할 수 있습니다. 자세한 내용은 ‘내장 LaTeX’ 을 참조합니다. Org 파일에 이런 코드를 삽입하는 방법은 세 가지가 있으며 각각 다른 인용 구문을 사용합니다.

@ 기호로 인용된 인라인 삽입:

```
Code embedded in-line @@latex:any arbitrary LaTeX code@@ in a paragraph.
```

Org 파일에 하나 이상의 키워드 줄을 삽입하려면:

```
#+LATEX: any arbitrary LaTeX code
```

Org 파일에 내보내기 블록으로 삽입할 경우 백엔드는 begin 및 end 마커 사이의 모든 코드를 내보냅니다:

```
#+BEGIN_EXPORT latex
  any arbitrary LaTeX code
#+END_EXPORT
```

## 12.9 iCalendar Export
Org 모드의 상호 운용성이 성공한 데는 외부 애플리케이션으로 쉽게 내보내거나 외부 애플리케이션에서 쉽게 가져올 수 있는 기능이 큰 역할을 했습니다. iCalendar 내보내기 백엔드는 Org 파일에서 캘린더 데이터를 가져와서 표준 iCalendar 형식으로 내보냅니다.

`C-c C-e c f` (org-icalendar-export-to-ics)
현재 Org 버퍼에서 iCalendar 항목을 생성하고 ‘.ics’ 파일 확장자를 사용해서 동일한 디렉터리에 저장합니다.

`C-c C-e c c` (org-icalendar-combine-agenda-files)
org-agenda-files 에 있는 Org 파일들을 기반으로 통합된 iCalendar 파일을 생성하고 org-icalendar-combined-agenda-file 파일 이름에 저장합니다.



<br><br>
# 13 Publishing
Org는 상호 연결된 Org 파일로 구성된 프로젝트의 HTML 자동 변환을 설정할 수 있는 게시 관리 시스템이 포함되어 있습니다. 또한 Org를 설정해서 내보낸 HTML 페이지와 이미지, 소스 코드 파일 등의 관련 첨부 파일을 웹 서버에 자동으로 업로드할 수 있습니다.

또한 Org를 사용해서 파일을 PDF로 변환하거나 HTML 및 PDF 변환을 결합해서 서버에서 두 가지 형식으로 파일을 이용할 수 있도록 설정할 수 있습니다.

설정에 대한 자세한 지침은 설명서를 참조합니다. 다음은 예입니다:

```
(setq org-publish-project-alist
      '(("org"
         :base-directory "~/org/"
         :publishing-function org-html-publish-to-html
         :publishing-directory "~/public_html"
         :section-numbers nil
         :with-toc nil
         :html-head "<link rel=\"stylesheet\"
                    href=\"../other/mystyle.css\"
                    type=\"text/css\"/>")))
```

`C-c C-e P x` (org-publish)
특정 프로젝트를 입력하라는 메시지가 표시되면 해당 프로젝트에 속한 모든 파일을 게시합니다.

`C-c C-e P p` (org-publish-current-project)
현재 파일이 포함된 프로젝트를 게시합니다.

`C-c C-e P f` (org-publish-current-file)
현재 파일만 게시합니다.

`C-c C-e P a` (org-publish-all)
모든 프로젝트를 게시합니다.

Org는 타임스탬프를 사용해서 파일을 변경한 시점을 추적합니다. 위의 함수들은 일반적으로 변경된 파일만 게시합니다. 위 명령어 중 하나에 접두사 인수를 지정하면 이 동작을 무시하고 모든 파일을 강제로 게시할 수 있습니다.



<br><br>
# 14 Working with Source Code
Org 모드는 소스 코드 작업을 위한 다양한 기능을 제공하며 여기에는 기본 메이저 모드에서 코드 블록 편집, 코드 블록 평가, 코드 블록 탱글링 그리고 코드 블록과 결과를 여러 형식으로 내보내기 등이 포함됩니다.

소스 코드 블록은 다음과 같은 구조를 따릅니다:

```
#+NAME: <name>
#+BEGIN_SRC <language> <switches> <header arguments>
  <body>
#+END_SRC
```

여기서:

‘<name>’은 코드 블록을 고유하게 식별하기 위해 사용되는 문자열이며,
‘<language>’는 코드 블록의 언어를 지정합니다(예: ‘emacs-lisp’, ‘shell’, ‘R’, ‘python’ 등),
‘<switches>’는 코드 블록의 내보내기를 제어하는 데 사용할 수 있으며,
‘<header arguments>’는 아래에서 보여주는 것처럼 코드 블록 동작의 여러 측면을 제어하는 데 사용할 수 있으며,
‘<body>’에는 실제 소스 코드가 포함됩니다.

`C-c '` 를 사용해서 현재 코드 블록을 편집할 수 있습니다. 그러면 소스 코드 블록의 본문이 포함된 새로운 메이저 모드 편집 버퍼가 열리며 곧바로 편집할 수 있는 상태가 됩니다. `C-c '` 를 다시 누르면 버퍼는 닫히고 Org 버퍼로 돌아갑니다.

## Using header arguments
헤더 인수는 처음에 콜론을 붙이고 그 뒤에 소문자로 된 인수 이름을 적어서 지정합니다. 헤더 인수는 여러 방법으로 설정할 수 있으며 중복이나 충돌이 발생할 경우 Org는 로컬 설정을 우선시합니다.

시스템 전체 헤더 인수
이는 org-babel-default-header-args 변수를 사용자 정의해서 지정하거나 특정 언어 LANG의 경우 org-babel-default-header-args:LANG 을 사용해서 지정합니다.

속성 내의 헤더 인자
‘header-args’ 속성(속성 참조)을 사용하거나 언어 LANG의 경우 ‘header-args:LANG’ 을 사용해서 설정할 수 있습니다. 속성 드로어를 통해 설정된 헤더 인자는 하위 트리 수준부터 적용됩니다.

코드 블록 내의 헤더 인자
헤더 인자는 가장 일반적으로 소스 코드 블록 수준에서 ‘BEGIN_SRC’ 줄에 설정됩니다:

```
#+NAME: factorial
#+BEGIN_SRC haskell :results silent :exports code :var n=0
  fac 0 = 1
  fac n = n * fac (n-1)
#+END_SRC
```

코드 블록 헤더 인수는 각 줄에 ‘HEADER’ 키워드를 사용해서 여러 줄에 걸쳐 작성할 수 있습니다.

## Evaluating code blocks
`C-c C-c` 를 사용하면 현재 코드 블록을 평가하고 그 결과를 Org 문서에 삽입할 수 있습니다. 기본적으로 ‘emacs-lisp’ 코드 블록만 평가 기능이 활성화되지만 다양한 언어의 코드 블록을 평가할 수 있는 기능도 지원됩니다. 지원되는 언어의 전체 목록은 설명서를 참조합니다. 다음은 코드 블록과 그 결과를 보여줍니다.

```
#+BEGIN_SRC emacs-lisp
  (+ 1 2 3 4)
#+END_SRC

#+RESULTS:
: 10
```

다음 구문은 ‘var’ 헤더 인수를 사용해서 코드 블록에 인수를 전달하는 데 사용됩니다.

```
:var NAME=ASSIGN
```

NAME은 코드 블록 본문에 바인딩된 변수의 이름입니다. ASSIGN은 문자열, 숫자, 테이블 참조, 리스트, 리터럴 예시, 인자가 있거나 없는 다른 코드 블록 또는 코드 블록을 평가한 결과 같은 리터럴 값입니다.

## Results of evaluation
Org가 코드 블록 실행 결과를 처리하는 방식은 여러 헤더 인자가 함께 작용하는 방식에 따라 달라집니다. 그러나 가장 중요한 결정 요소는 ‘results’ 헤더 인자입니다. 이 인자는 코드 블록 결과의 수집, 유형, 형식 및 처리를 제어합니다.

수집
코드 블록에서 결과를 어떻게 수집할지 지정합니다. ‘output’ 또는 ‘value’(기본값) 중 하나를 선택할 수 있습니다.

유형
코드 블록 실행 시 예상되는 결과 유형을 지정합니다. ‘table’, ‘list’, ‘scalar’, ‘file’ 중에서 선택할 수 있습니다. 지정하지 않으면 Org가 자동 추측합니다.

형식
Org가 결과를 처리하는 방식입니다. 가능한 값으로는 ‘code’, ‘drawer’, ‘html’, ‘latex’, ‘link’ 및 ‘raw’ 가 있습니다.

처리 방식
결과가 적절하게 형식화된 후 삽입되는 방식입니다. 허용되는 값은 ‘silent’, ‘replace’(기본값), ‘append’ 또는 ‘prepend’ 입니다.

그래프, 다이어그램, 그림 등 결과를 파일로 출력하는 코드 블록은 ‘:file FILENAME’ 헤더 인수를 사용할 수 있습니다. 이 경우 결과는 지정된 파일에 저장되고 해당 파일에 대한 링크가 버퍼에 삽입됩니다.

## Exporting code blocks
코드 블록의 코드, 코드 블록 평가 결과, 코드 블록의 코드와 평가 결과 모두 또는 아무것도 내보내지 않을 수 있습니다. Org는 대부분의 언어에 대해 기본적으로 코드를 내보내도록 설정되어 있습니다.

‘exports’ 헤더 인수는 Org 파일의 해당 부분이 HTML이나 LaTeX 형식으로 내보내질지 여부를 지정하는 데 사용됩니다. 이 인수는 ‘code’, ‘results’, ‘both’ 또는 ‘none’ 중 하나로 설정할 수 있습니다.

## Extracting source code
`C-c C-v t` 를 사용해서 현재 버퍼의 소스 블록에서 코드를 추출해서 순수한 소스 코드 파일을 생성할 수 있습니다. 이를 “탱글링(tangling)” 이라 부르는데 이는 리터러시 프로그래밍(literate programming) 커뮤니티에서 차용한 용어입니다. 코드 블록을 탱글링하는 동안 org-babel-expand-src-block 을 사용해서 블록 본문이 확장되며 이 함수는 변수 참조와 “Noweb” 스타일 참조 모두를 확장할 수 있습니다. 코드 블록을 탱글링하려면 해당 블록에 ‘tangle’ 헤더 인수가 반드시 포함되야 합니다!! 자세한 내용은 매뉴얼을 참조합니다.



<br><br>
# 15 Miscellaneous
## Completion
Org에서는 `M-TAB` 을 사용해서 버퍼 내에서 자동 완성 기능을 제공합니다. 미니버퍼는 사용되지 않습니다. 한 글자 이상을 입력한 후 단축키를 누르면 해당 위치에서 텍스트가 자동으로 완성됩니다.

예를 들어, 이 명령을 사용하면 ‘\’ 뒤의 TeX 기호, 제목의 시작 부분에 있는 TODO 키워드 그리고 제목 내 ‘:’ 뒤의 태그가 자동으로 완성됩니다.

## Structure Templates
‘#+BEGIN_SRC’ … ‘#+END_SRC’ 같은 빈 구조 블록을 빠르게 삽입하거나 기존 텍스트를 이런 코드 블록으로 감싸려면 다음을 사용합니다.

`C-c C-,` (org-insert-structure-template)
블록 구조의 유형을 입력하라는 메시지가 표시되며 커서 위치에 블록이 삽입됩니다. 영역이 활성화된 경우 해당 영역은 블록으로 감싸집니다.

## Clean view
별표만 사용하고 들여쓰지 않는 Org의 기본 개요 형식은 짧은 문서의 경우 복잡해 보일 수 있습니다. 책 같은 긴 문서의 경우 이런 현상은 그리 두드러지지 않습니다. Org는 다음 표의 오른쪽에 표시된 것처럼 별표와 들여쓰기를 조합한 대체 방식을 제공합니다. 이 방식은 별표를 하나만 사용하고 텍스트를 제목과 같은 줄에 위치하도록 들여쓰기를 적용합니다:

```
* Top level headline             |    * Top level headline
** Second level                  |      * Second level
*** Third level                  |        * Third level
    some text                    |          some text
*** Third level                  |        * Third level
    more text                    |          more text
* Another top level headline     |    * Another top level headline
```

이런 형식의 화면은 각 줄의 맨 앞에 보이지 않는 공백을 삽입하는 Org Indent 모드(M-x org-indent-mode RET)를 사용해서 표시 시점에 동적으로 구현할 수 있습니다. 변수 org-startup-indented 를 사용자 정의해서 모든 파일에 Org Indent 모드를 활성화하거나 다음 명령을 사용해서 개별 파일에 활성화할 수 있습니다.

```
#+STARTUP: indent
```

일반 텍스트 파일이 Emacs 화면과 최대한 비슷하게 보이도록 들여쓰기를 하드 스페이스 문자로 설정하려면 Org는 각 제목 아래의 텍스트를 (TAB 키로) 들여쓰고 앞의 별표(*)를 숨기며 각 레벨마다 두 글자씩 들여쓰기되도록 레벨 1, 3 등에만 사용하도록 지원합니다. 파일에서 이 기능을 사용하려면 다음을 사용합니다.

```
#+STARTUP: hidestars odd
```
