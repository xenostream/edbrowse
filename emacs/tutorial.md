[Ref from](https://blog.naver.com/kesam1/224227501605)

[KLDP Emacs](https://wiki.kldp.org/HOWTO/html/Emacs-Beginner/Emacs-Beginner-HOWTO.html#toc6)

[Emacs Guide Eng](http://xahlee.info/emacs/emacs/emacs_init_index.html)

[Emacs Guide Kor](https://tsgates.github.io/emacsbook/)

[Org Mode](https://blog.weirdx.io/post/54692?utm_source=chatgpt.com)

[Mastering EMACS' Note](https://susam.net/cc/mastering-emacs/notes.html)

[Mastering EMACS CHN](https://blog.3vyd.com/docs/mastering-emacs.html)

<br><br>
# 이맥스에서 한글 사용
이맥스에서 한글 입력이 제대로 되지 않는다면 `~/.emacs.d/init.el` 파일에 다음 내용을 추가한다.

```
(setq default-input-method "korean-hangul") (global-set-key (kbd "<S-SPC>")
'toggle-input-method)
```

이외에 다른 방법도 여럿 존재한다.


<br><br>
# 터미널에서 이맥스 실행

```
emacs -nw
```
​

<br><br>
# 이맥스 명령/단축키
이맥스 명령(commands)는 `Control` (Ctrl 키)과 `Meta` 키(Alt 혹은 ESC 키)로 구성되며 `C-<chr>` / `M-<chr>` 로 나타낸다.

예) `C-x` 는 컨트롤 키를 누른 상태에서 x, `C-x C-c` 는 컨트롤 키를 누른 상태에서 `x -> c` 를 입력한다.


## 기본 단축키
- `C-x C-c` : Emacs 종료
- `C-x k`   : 킬 버퍼

> [!NOTE]
> `C-x` 로 시작하는 명령은 주로 윈도우, 파일, 버퍼 등과 관련된 작업을 수행하는 경우가 많음.


## 화면 움직이기
- `C-v` : 다음 스크린으로(PageUp)
- `M-v` : 이전 스크린으로(PageDn)
- `C-l` : 현재 커서가 위치한 텍스트를 중심으로 모든 텍스트를 다시 표시한다. 다시 한 번 누르면 페이지 위로, 한 번 더 누르면 페이지 밑으로 이동한다.

​
## 커서 움직이기
- 방향키를 사용하거나 `C-b` (backward). `C-f` (forward), `C-p` (previous), `C-n` (mext)을 이용한다. 
- 좀 더 빨리 이동하려면 `M-b`, `M-f` 를 사용(단어 단위)한다.

주로 `Meta` 키는 언어의 구성 단위(단어, 문장, 절)와 관련된 조작을, `Contol` 키는 문자, 라인 같은 기본적이고 독립적인 단위에 대한 조작을 담당한다.

`C-a`, `C-e` 는 줄의 처음과 끝으로(이전 줄 혹은 다음 줄로는 이동하지 않음), `M-a`, `M-e` 는 문장의 처음과 끝으로 이동(이전 문장 혹은 다음 문장으로 이동함)한다.
​
> [!NOTE]
> 현재 커서 위치를 `포인트` (point)라고 부른다.

`M-<` 는 문서의 처음으로, `M->` 는 문서 마지막으로 이동한다.

​

## NUMERIC AGRUMENT / PREFIX ARGUMENT
이맥스 명령 대부분은 수 인자(numeric argument)와 함께 사용 가능하다. 대다수의 수 인자는 반복 작업을 위해 사용되지만 몇몇은 플래그로 사용된다.

`C-u <수>` 혹은 `M-<수>` 를 입력한 후 명령을 실행하면 입력한 수만큼 반복해서 명령이 실행된다.

이는 명령을 적용하기 전에 인자부터 입력하므로 `prefix argument` 라고 한다.

`M-수` 를 입력하는 것은 `C-u <수>` 와 동일하다.

​예) `C-u 8 C-f` : 8글자 앞으로 이동, `M-8 M-f` : 8단어 앞으로 이동


​
<br><br>
# EMACS가 동작을 멈췄을 때
`C-g` 를 이용해서 실행한 명령을 취소할 수 있다. 이맥스가 동작을 멈췄을 때는 유용하다.

예) `C-u 100 C-g C-f` : `C-f` 만 한 번 실행한다.

​
<br><br>
# 윈도우
이맥스는 여러 개의 윈도우를 가질 수 있으며 각각의 윈도우는 각자의 버퍼를 표시한다.

`C-x 1` : 다른 윈도우를 모두 없애고 현재 커서가 위치한 하나의 윈도우만 남긴다.
​

<br><br>
# 삭제
- `<DEL>` (백스페이스, Delete 키가 아님!!) : 커서 앞에 있는 문자를 지운다.
- `C-d` : 커서 뒤에 있는 문자를 지운다.
- `M-<DEL>` : 커서 전에 있는 단어를 지운다.
- `M-d` : 커서 뒤에 있는 단어를 지운다.
- `C-k` : 커서가 위치한 곳부터 라인 끝까지 지운다.
- `M-k` : 현재 문장의 끝까지 지운다.

`C-<SPC>` (스페이스바)로 시작점을 설정하고 커서를 옮겨 범위를 설정한 후 `C-w` 를 눌러 삭제할 수 있다.

이맥스에서 `kill` 은 다른 에디터의 잘라내기와 유사하며(복사는 `M-w` 를 이용) 붙여넣기는 `yank` 라고 부른다.

`C-y` 를 이용해서 붙여 넣을 수 있으며 `M-y` 를 이용해서 이전에 지운 텍스트를 가져올 수 있다.

`<DEL>` (백스페이스)과 `C-d` 는 텍스트를 삭제(delete)하는 반면 `M-<DEL>, M-d, C-k, M-k, C-w` 는 텍스트를 kill 한다.

`<DEL>` 과 `C-d` 의 경우 아규먼트가 있다면 삭제하는 대신 Kill을 수행한다.


<br><br>
# 되돌리기 (Undo)
`C-/` 혹은 `C-_` 혹은 `C-x u`

​
<br><br>
# 파일
이맥스에서 편집할 파일을 찾는 것을 방문(visiting)이라 부른다.

- `C-x C-f` : 파일 찾기 - 해당하는 파일이 없으면 새로 만든다.
-`C-x C-s` : 파일 저장

​
<br><br>
# 버퍼
이맥스는 파일의 텍스트를 `버퍼` 라는 객체에 저장한다. 파일을 찾는 건 새로운 버퍼를 만드는 것과 동일하다.

이맥스에서 보이는 모든 텍스트는 버퍼에 있는 것이며, 여러 개의 버퍼가 있을 때는 현재 편집하는 버퍼가 현재 활성화된(current) 버퍼이다.

파일에 대응하는 버퍼로 변경하려면 `C-x C-f` 로 파일을 다시 열거나 `C-x b` 를 사용해서 변경한다.

​*버퍼 중에는 파일에 대응하지 않는 것도 있다.


## Message / Scratch 버퍼
이맥스는 기본적으로 두 개의 버퍼(*Messages*, *Scratch*)를 생성한다.

`*` 는 파일로 매핑되지 않은 버퍼를 의미하며, 메시지 버퍼는 이맥스가 출력한 값을 기록하기 위해,
스크래치는 저장하지 않는 텍스트 또는 이맥스 함수를 실행(eval)하기 위해 사용된다.

- `C-x C-b` : 버퍼 목록 보기
- `C+x b` : 버퍼 변경

여러 버퍼를 편집했을 때는 `C-x C-s` 대신 `C-x s` 를 사용해서 각각의 버퍼를 모두 저장할 수 있다.

​
- *버퍼: 편집하거나 현재 보이는 텍스트 혹은 그래픽 요소로 이맥스의 (기본적인) 편집 단위이다.
- *미니 버퍼: (수정할 파일 이름 등의) 실행시킬 아규먼트를 입력하고 에코 영역의 텍스트를 출력하는 곳이다. `C-g` 를 이용해서 없앨 수 있다.

​
<br><br>
# 확장 명령 집합
이맥스에는 수 많은 명령이 있으며 `X` (eXtend)명령으로 이를 해결한다. 이 명령에는 두 가지 종류가 있다.

1. `C-x` : 문자 확장 - 주로 하나의 문자와 함께 사용된다.

* `C-x` 명령 예시
- `C-x C-f`   : 파일 찾기
- `C-x C-s`   : 버퍼를 파일로 저장
- `C-x s`     : 각각의 버퍼를 각각의 파일로 저장
- `C-x C-b`   : 버퍼 목록 보기
- `C-x b`     : 버퍼 바꾸기
- `C-x C-c`   : 이맥스 종료
- `C-x 1`     : 하나의 윈도우만 남기기
- `C-x u`     : 실행 취소 (`C-/`, `C-_`)

1. `M-x` : 이름이 지정된 명령 확장(named eXtended commands)
특정한 모드에서 사용되거나 자주 사용되지 않는 경우가 많다.

* M-x의 예시
`M-x` 를 입력하고 `repl s` 입력 후 `tab` (자동완성)한 후 엔터, 변환할 문자열 입력 - 엔터 - 변환될 문자열 -엔터

​
<br><br>
# 자동 저장
이맥스는 `#파일 이름#` 형태로 자동 저장 파일을 만든다. 자동 저장 파일을 복구할 때는 일반적인 방법으로 파일을 연 후 `M-x recover-this-file` 명령을 사용한다.

*다른 애플리케이션으로 가기 위해 `C-z` 를 사용해서 잠시 멈출 수 있다. 다시 돌아가려면 `fg` 혹은 `%emacs` 명령을 사용한다.

​
<br><br>
# 에코 영역(Echo Area)
명령을 입력할 때 아래 부분에 뜨는 창을 "에코 영역" 이라 부른다.


<br><br>
# 모드 라인(Mode Line)
에코 영역 위의 `-:**- TUTORIAL 63% L749 (Fundamental)` 같은 정보가 뜨는 곳을 "모드 라인" 이라고 하며 이맥스의 상태와 편집 중인 텍스트에 대한 유용한 정보를 제공한다.

파일을 편집했는지 여부(없다면 -) 파일 이름 %로 표시되는 버퍼 텍스트의 위치(맨 위면 Top, 아래면 Bot, 버퍼가 작아서 한 화면에 표시될 경우는 All) 커서가 위치한 줄의 번호 편집 모드의 종류 순으로 표시된다.

​
<br><br>
# 메이저 / 마이너 모드
기본 모드인 "Fundamental" 은 메이저 모드의 좋은 예이다.

이맥스에는 다양한 메이저 모드가 있으며 Lisp mode, Text mode 등 사용하는 언어나 텍스트에 따라 달라진다. 한 번에 하나의 메이저 모드만 사용 가능하며 이는 모드 라인에 항상 표시된다.

메이저 모드의 종류에 따라 언어에 따라 적절한 주석 기호를 넣는 등 작동 방식이 살짝 변하기도 한다.

각각의 메이저 모드는 확장 명령 이름이기도 하며 `M-x text-mode` 등으로 변경할 수 있다.

마이너 모드는 켜고 끌 수 있으며 다른 메이저, 마이너 모드에 독립적이기에 전혀 사용하지 않거나 여러 개의 마이너를 함께 사용할 수도 있다.

마이너 모드 역시 `M-x 모드 이름` 으로 켜고 끌 수 있으며 좋은 예로 자동으로 줄 바꿈을 처리해 주는 `Auto Fill` 이 있다.
기본 설정은 70자이고 이를 바꾸려면 `C-x f` 를 사용하며 이를 다른 곳에 적용하려면 `M-q` 를 입력한다.

​
<br><br>
# 검색
정방향 검색은 `C-s` 역방향 검색은 `C-r` 이다.

​
<br><br>
# 멀티플 윈도우/프레임
- `C-x 2` 를 이용해서 윈도우를 두 개로 나눈다.
- `C-M-v` 를 이용하면 아래 창을 스크롤 할 수 있다.
- `C-x o` 를 이용해서 다른 창으로 커서를 옮긴다.

이맥스에서 프레임은 메뉴, 스크롤바, 에코 영역 등이 모여 있는 윈도우의 묶음(collection)이며 다른 응용 프로그램의 창/윈도우와 동일한 의미이다.

그래픽 환경에서 여러 개의 프레임을 띄울 수 있지만 터미널은 한 번에 하나만 보여진다.

- 프레임: 이맥스 윈도우의 클러스터이며 프레임을 여러 개의 윈도우로 나눌 수 있다. 다른 에디터는 프레임을 윈도우라고 말하는 경우가 많지만 이맥스의 윈도우는 다른 뜻이다.
- 윈도우: 이맥스는 프레임을 여러 개의 윈도우로 나눈다. 각각의 윈도우는 하나의 버퍼를 출력할 수 있다.

​
<br><br>
# \<ESC> \<ESC> \<ESC>
작업 중 메이저 모드 이름이 `[(Fundamental)]` 처럼 대괄호에 묶여 있을 때가 있으며,
이를 `Recursive Editing Level` 이라 한다. `<ESC>` 를 세 번 입력해서 벗어날 수 있으며,
이는 다른 윈도우를 제거하거나 미니 버퍼에서 나올 때도 사용할 수 있다.

`C-g` 와 유사하지만 `C-g` 는 `Recursive Editing Level` 에서 명령과 인자를 취소하기 위해 사용하므로
Recursive Editing Level에서 벗어날 때는 `<ESC> <ESC> <ESC>` 를 사용한다.

​
<br><br>
# 헬프
`C-h` 를 이용해서 헬프 메뉴에 접근할 수 있다.

무언가 모르는 명령이 있을 때는 `C-h c` 를 입력한 후 명령 이름을 입력해서 설명을 볼 수 있다. 보다 자세한 내용을 원할 때는 `C-h k` 를 이용한다.

*기본 용어는 `Help -> Search Documentation ->, Emacs Terminology` 에서 확인 가능하다.


*모드: 이맥스는 편집 방식을 바꾸는 다양한 모드가 존재하며 이는 메이저와 마이너 모드로 나뉜다.
- 메이저 모드: c 파일, 쉘 버퍼 등 특정 파일 형식에 특화된 기능을 제공한다. 각각의 버퍼는 하나의 메이저 모드만 가질 수 있다.
- 마이너 모드: 특정 파일 혹은 버퍼 형식에 한정되지 않는 부가적인 기능으로 켜거나 끌 수 있으며 각각의 버퍼는 여러 개의 마이너 모드를 가질 수 있으며 다른 마이너, 메이저 모드에 독립적이다.

​
<br><br>
# 참고 자료
Emacs Tutorial
{https://www.gnu.org/software/emacs/manual/html_mono/emacs.html}
{https://tsgates.github.io/emacsbook}



# ~/.emacs.d/init.el

```
;; ============================================================
;; Emacs 30.2 Minimal + Wombat Theme 
;; ============================================================

;; UTF-8 기본 인코딩
(prefer-coding-system 'utf-8)

;; -------------------------------
;; 1. UI 최소화 / 기본 환경
;; -------------------------------
;;(menu-bar-mode -1)
(tool-bar-mode -1)
(scroll-bar-mode -1)

(setq inhibit-startup-screen t
      inhibit-startup-message t
      initial-scratch-message nil)

;; 글꼴 설정 (GUI 전용)
(when (display-graphic-p)
  (set-frame-font "Sarasa Mono K Nerd Font-12" nil t))

;; 백업/자동저장 끄기
(setq auto-save-default nil
      make-backup-files nil
      vc-follow-symlinks t)
(delete-selection-mode t)

;; -------------------------------
;; 2. 파일 찾기 (fido-mode 권장)
;; -------------------------------
(fido-mode 1)
(global-set-key (kbd "C-x C-f") 'find-file)

;; -------------------------------
;; 3. 테마 (내장 wombat)
;; -------------------------------
(require 'package)
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/"))
(add-to-list 'package-archives '("org" . "https://orgmode.org/elpa/"))
(add-to-list 'package-archives '("melpa-stable" . "https://stable.melpa.org/packages/"))
(package-initialize)

(load-theme 'wombat t)

(use-package org-modern
  :ensure t
  :config
  (with-eval-after-load 'org
    (global-org-modern-mode)))

;; 헤딩 크기 키우기 (예: 제목 레벨별 폰트 크기 조정)
(custom-set-faces
 '(org-level-1 ((t (:height 1.4 :weight bold))))
 '(org-level-2 ((t (:height 1.2 :weight bold))))
 '(org-level-3 ((t (:height 1.1)))))

;; -------------------------------
;; 4. 줄번호 + 현재줄 강조
;; -------------------------------
(global-display-line-numbers-mode 1)
(setq display-line-numbers-type 'absolute)

(global-hl-line-mode 1)
(global-visual-line-mode 1) ;; Soft Word-Wrap

```
