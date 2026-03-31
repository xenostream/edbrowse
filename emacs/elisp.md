# Elisp in a Minutes

- Emacs를 실행합니다.
- `q` 키를 눌러 환영 메시지를 닫습니다.
- 이제 창 하단의 회색 줄을 살펴봅니다: “*scratch*” 는 현재 여러분이 있는 "편집 공간의 이름" 입니다. 

이 편집 공간을 “버퍼” (buffer)라고 부릅니다. 스크래치 버퍼는 Emacs를 열 때 기본으로 설정되는 버퍼입니다.
따라서, 여러분은 파일을 편집하는 것이 아니라, 파일로 저장할 수 있는 버퍼를 편집하는 것입니다.

- “Lisp interaction” 은 여기서 사용할 수 있는 명령어 집합을 의미합니다.

Emacs는 모든 버퍼에서 사용할 수 있는 내장 명령어 집합을 갖추고 있으며, 특정 모드를 활성화하면 사용할 수 있는 여러 하위 명령어 집합도 있습니다.

여기서는 `lisp-interaction-mode` 를 사용하는데, 이 모드는 Elisp 코드를 평가하거나 탐색하는 명령어가 포함되어 있습니다.

세미콜론은 어느 위치서나 주석을 시작합니다.

Elisp 프로그램은 기호식(“sexps”)으로 구성됩니다:

```emacs-lisp
(+ 2 2)
```
이 기호식은 “2에 2를 더하라” 로 읽습니다.

기호식은 괄호로 묶이며, 중첩할 수 있습니다:

```emacs-lisp
(+ 2 (+ 1 1))
```

기호 표현식은 원자(atom)나 다른 기호 표현식을 포함합니다. 

위의 예에서 `1` 과 `2` 는 원자이고, `(+ 2 (+ 1 1))` 와 `(+ 1 1)` 은 기호 표현식입니다.

`lisp-interaction-mode' 에서 s-exp를 평가할 수 있습니다.

닫는 괄호 바로 뒤에 커서를 놓고 Control 키를 누른 상태에서 j 키를 누릅니다(줄여서 “C-j”).

```emacs-lisp
(+ 3 (+ 1 2))
             ^ 커서가 여기에 위치
```

`C-j => 6` 에서 `C-j` 는 평가 결과를 버퍼에 삽입합니다.

`C-x C-e` 는 Emacs 하단 줄, 이른바 “에코 영역” 에 동일한 결과를 표시합니다.
 
 일반적으로 버퍼를 쓸모없는 텍스트로 어지럽히지 않기 위해 `C-x C-e` 를 사용합니다.

`setq` 는 변수에 값을 저장합니다:

```emacs-lisp
(setq my-name “Bastien”)
```

`C-x C-e' => “Bastien” (에코 영역에 표시됨)

`insert` 는 커서 위치에 “Hello!” 를 삽입합니다:

```emacs-lisp
(insert “Hello!”)
```

`C-x C-e' => “Hello!”

방금 `insert` 를 사용할 때는 “Hello!” 라는 단일 인수를 사용했지만, 더 많은 인수를 전달할 수도 있습니다. 

다음은 두 개의 인수를 사용합니다:

```emacs-lisp
(insert “Hello” “ world!”)
```

`C-x C-e` => “Hello world!”

문자열 대신 변수를 사용할 수 있습니다:

```emacs-lisp
(insert “Hello, I am ” my-name)
```

`C-x C-e` => “Hello, I am Bastien”

S-표현식을 함수로 결합할 수 있습니다:

```emacs-lisp
(defun hello () (insert “Hello, I am ” my-name))
```

`C-x C-e` => hello

함수를 평가할 수 있습니다:

```emacs-lisp
(hello)
```

`C-x C-e` => Hello, I am Bastien

함수 정의에 괄호가 비어 있는 것은 "인수를 받지 않는다" 는 의미입니다. 하지만, 항상 `my-name` 을 사용하는 것은 지루합니다.

다음은 함수가 하나의 인수를 받도록 지정합니다 (여기서 인수 이름은 “name” 입니다): 

```emacs-lisp
(defun hello (name) (insert “Hello ” name))
```

`C-x C-e` => hello

이제 유일한 인수 값으로 문자열 “you” 를 전달해서 함수를 호출합니다:

```emacs-lisp
(hello “you”)
```

`C-xC-e` => “Hello you”

예이!

잠시 숨을 고르시기 바랍니다.


이제 다른 창에서 “*test*” 라는 이름의 새로운 버퍼로 전환합니다:

```emacs-lisp
(switch-to-buffer-other-window “*test*”)
 ```
 
`C-x C-e` => [화면에 두 개의 창이 표시되고 커서는 *test* 버퍼에 위치함]

위쪽 창 위로 마우스를 가져가서 왼쪽 클릭하면 돌아갑니다. 

또는 `C-x o` (즉, control-x 를 누른 상태에서 o 키를 누름)를 사용해서 다른 창으로 대화형으로 이동할 수 있습니다.

`progn` 을 사용해서 여러 S-표현식을 결합할 수 있습니다:

```emacs-lisp
(progn
  (switch-to-buffer-other-window “*test*”)
  (hello “you”))
```

`C-x C-e' => [화면에 두 개의 창이 있고 커서는 *test* 버퍼에 있습니다]

이제 괜찮다면, 더이상 `C-x C-e` 를 누르라고 요청하지 않겠습니다. 이후 모든 sexp에 직접 실행합니다.

마우스나 `C-x o' 를 사용해서 항상 `*scratch*` 버퍼로 돌아갑니다.

버퍼를 지우는 것은 종종 유용합니다:

```emacs-lisp
(progn
  (switch-to-buffer-other-window “*test*”)
  (erase-buffer)
  (hello “there”))
```

또는 다른 창으로 돌아가려면:

```emacs-lisp
(progn
  (switch-to-buffer-other-window “*test*”)
  (erase-buffer)
  (hello “you”)
  (other-window 1))
```

`let` 을 사용해서 값을 지역 변수에 할당할 수 있습니다:

```emacs-lisp
(let ((local-name “you”))
  (switch-to-buffer-other-window “*test*”)
  (erase-buffer)
  (hello local-name)
  (other-window 1))
```

이 경우 `let` 또한 여러 S-표현식을 결합할 수 있으므로 `progn` 을 사용할 필요는 없습니다.


문자열을 포맷팅합니다:

```emacs-lisp
(format “Hello %s!\n” “visitor”)
```

"%s" 는 문자열을 위한 자리 표시자로, 이 경우 “visitor” 로 대체됩니다. "\n" 은 줄 바꿈 문자입니다.

format 함수를 사용해서 hello 함수를 개선합니다:

```emacs-lisp
(defun hello (name)
  (insert (format “Hello %s!\n” name)))

(hello “you”)
```

`let` 을 사용하는 또 다른 함수를 만들어 보겠습니다:

```emacs-lisp
(defun greeting (name)
  (let ((your-name “Bastien”))
    (insert (format “Hello %s!\n\nI am %s.”
                    name          함수의 인자
                    your-name   let으로 바인딩된 변수 “Bastien”
                    ))))
```

그리고 실행합니다:

```emacs-lisp
(greeting “you”)
```

일부 함수는 대화형입니다:

```emacs-lisp
(read-from-minibuffer “이름을 입력하세요: ”)
```

이 함수를 실행하면 프롬프트에 입력한 내용이 반환됩니다.

`greeting' 함수가 이름을 입력받도록 만들어 보겠습니다:

```emacs-lisp
(defun greeting (from-name)
  (let ((your-name (read-from-minibuffer “이름을 입력하세요: ”)))
    (insert (format “안녕하세요!\n\n저는 %s이고, 당신은 %s입니다.”
                    from-name       함수의 인자
                    your-name       프롬프트에서 입력된 let으로 정의된 변수
                    ))))

(greeting “Bastien”)
```

다른 창에 결과를 표시해서 완성합니다:

```emacs-lisp
(defun greeting (from-name)
  (let ((your-name (read-from-minibuffer “이름을 입력하세요: ”)))
    (switch-to-buffer-other-window “*test*”)
    (erase-buffer)
    (insert (format “Hello %s!\n\nI am %s.” your-name from-name))
    (other-window 1)))
```

이제 테스트하겠습니다:

```emacs-lisp
(greeting “Bastien”)
```

이름 목록을 저장합니다: 

리터럴 데이터 목록을 생성하려면, 평가되지 않도록 `'` 를 사용해서 데이터를 문자 그대로 “인용” 합니다.

```emacs-lisp
(setq list-of-names '(“Sarah” ‘Chloe’ “Mathilde”))
```

`car` 를 사용해서 목록 첫 번째 요소를 가져옵니다:

```emacs-lisp
(car list-of-names)
```

`cdr` 을 사용해서 첫 번째 요소를 제외한 나머지 요소들의 리스트를 가져옵니다:

```emacs-lisp
(cdr list-of-names)
```

`push` 를 사용해서 리스트의 맨 앞에 새로운 요소를 추가합니다:

```emacs-lisp
(push “Stephanie” list-of-names)
```

> [!NOTE]
> `car' 와 `cdr' 은 리스트를 수정하지 않지만, `push' 는 리스트를 수정합니다.
> 이는 중요한 차이점입니다: 일부 함수(예: `car`)는 부수 효과가 없지만, 다른 함수(예: `push`)는 부수 효과가 있습니다.

`list-of-names` 의 각 요소에 `hello' 를 호출합니다:

```emacs-lisp
(mapcar 'hello list-of-names)
```

`list-of-names' 에 있는 모든 사람에게 인사하도록 `greeting' 을 개선합니다:

```emacs-lisp
(defun greeting ()
    (switch-to-buffer-other-window “*test*”)
    (erase-buffer)
    (mapcar 'hello list-of-names)
    (other-window 1))

(greeting)
```

위에서 정의한 `hello' 함수를 기억하시나요? 이 함수는 하나의 인자, 즉 이름을 받습니다. 

`mapcar' 는 `list-of-names' 의 각 요소를 차례대로 `hello' 의 인자로 사용해서 `hello' 를 호출합니다.

이제 표시된 버퍼의 내용을 조금 정리하겠습니다:

```emacs-lisp
(defun replace-hello-by-bonjour ()
    (switch-to-buffer-other-window “*test*”)
    (goto-char (point-min))
    (while (search-forward “Hello”)
      (replace-match “Bonjour”))
    (other-window 1))
```

- `(goto-char (point-min))` 은 버퍼의 시작 부분으로 이동합니다.
- `(search-forward “Hello”)` 는 “Hello” 라는 문자열을 검색합니다.
- `(while x y)` 는 x 가 무언가를 반환하는 동안 `y sexp(s)` 를 평가합니다.
- x 가 `nil' (무엇도 없음)을 반환하면 while 루프를 종료합니다.


```emacs-lisp
(replace-hello-by-bonjour)
```

*test* 버퍼에서 “Hello” 가 나타나는 모든 부분이 “Bonjour” 로 대체된 것을 확인할 수 있습니다.

또한, “Search failed: Hello” 라는 오류 메시지가 표시됩니다.

이런 오류를 피하려면 `search-forward' 에 버퍼의 특정 지점에서 검색을 중지해야 하는지, 

그리고, 아무것도 찾지 못했을 때 오류 메시지 없이 조용히 실패하도록 설정해야 합니다:

`(search-forward “Hello” nil t)` 를 사용하면 됩니다:

- `nil' 인수는 검색이 특정 위치에 바인딩되지 않음을 의미합니다.
- `‘t’ 인수는 아무것도 찾지 못했을 때 오류 메시지 없이 조용히 실패함을 의미합니다.

다음 함수는 이런 S-표현식을 사용하며, 이 함수는 오류를 발생시키지 않습니다:

```emacs-lisp
(defun hello-to-bonjour ()
    (switch-to-buffer-other-window “*test*”)
    (erase-buffer)
     `list-of-names` 에 있는 이름들에게 인사하기
    (mapcar 'hello list-of-names)
    (goto-char (point-min))
     “Hello” 를 “Bonjour” 로 바꾸기
    (while (search-forward “Hello” nil t)
      (replace-match “Bonjour”))
    (other-window 1))

(hello-to-bonjour)
```

이름을 굵게 표시해 보겠습니다:

```emacs-lisp
(defun boldify-names ()
    (switch-to-buffer-other-window “*test*”)
    (goto-char (point-min))
    (while (re-search-forward “Bonjour \\(.+\\)!” nil t)
      (add-text-properties (match-beginning 1)
                           (match-end 1)
                           (list 'face 'bold)))
    (other-window 1))
```

이 함수는 `re-search-forward` 를 도입합니다: 

문자열 “Bonjour” 를 검색하는 대신, “정규 표현식”(접두사 “re-”로 약칭됨)을 사용해서 패턴을 검색합니다.

정규 표현식은 “Bonjour \\(.+\\)!” 이며, 이는 다음과 같이 해석됩니다:

- 문자열 “Bonjour ”, 그리고
- `\\( ... \\)` 구문입니다
- `.` 은 임의의 단일 문자입니다
- `+` 는  반복 가능을 의미합니다
- `!` 문자 자체입니다

준비되셨나요?  한번 테스트해 보겠습니다!

```emacs-lisp
(boldify-names)
```

`add-text-properties' 는 글꼴 같은 텍스트의 속성을 추가합니다.

자, 이제 끝났습니다. 즐거운 프로그래밍 되시기 바랍니다!

변수나 함수에 대해 좀 더 알고 싶다면:

```emacs-lisp
C-h v variable-name RET
C-h f variable-name RET
```

Emacs에서 Emacs Lisp 매뉴얼을 읽으려면:

```emacs-lisp
C-h i m elisp RET
```

Emacs Lisp에 대한 온라인 입문서를 읽으려면:
 https://www.gnu.org/software/emacs/manual/html_node/eintr/index.html














