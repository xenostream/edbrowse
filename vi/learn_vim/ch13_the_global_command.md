# Ch13. the Global Command
지금까지 점 명령어(`.`)로 마지막 변경 사항을 반복하는 방법, 매크로(`q`)로 동작을 재현하는 방법, 텍스트를 레지스터(`"`)에 저장하는 방법을 배웠습니다.

이 장은 글로벌 명령어를 사용해서 명령줄 명령을 반복하는 방법을 배웁니다.


## Global Command Overview
Vim의 글로벌 명령어는 여러 줄에 동시에 명령줄 명령을 실행하는 데 사용됩니다.

참고로, “Ex 명령어” 라는 용어를 들어보셨을 수도 있습니다. 본 가이드는 이를 명령줄 명령어라고 지칭하겠습니다. Ex 명령어와 명령줄 명령어는 동일합니다. 콜론(`:`)으로 시작하는 명령들이 바로 그것입니다. 지난 장에서 다룬 substitute 명령어는 Ex 명령어의 예입니다. 이 명령어들이 Ex라고 불리는 이유는 원래 Ex 텍스트 에디터에서 유래했기 때문입니다. 본 가이드는 계속해서 이를 명령줄 명령어라고 지칭하겠습니다. Ex 명령어 전체 목록은 `:h ex-cmd-index` 를 참조합니다.

global 명령어의 구문은 다음과 같습니다:

```
:g/pattern/command
```

`pattern` 은 대체 명령어의 패턴과 유사하게 해당 패턴을 포함하는 모든 줄을 일치시킵니다. `command` 는 어떤 명령줄 명령어든 가능합니다. 글로벌 명령어는 `pattern` 에 일치하는 각 줄에 `command` 를 실행하는 방식으로 작동합니다.

다음과 같은 표현식이 있다면:

```
const one = 1;
console.log("one: ", one);

const two = 2;
console.log("two: ", two);

const three = 3;
console.log("three: ", three);
```

“console” 을 포함하는 모든 줄을 제거하려면 다음을 실행할 수 있습니다:

```
:g/console/d
```

실행 결과:

```
const one = 1;

const two = 2;

const three = 3;
```

글로벌 명령어는 “console” 패턴에 일치하는 모든 줄에 삭제 명령어(`d`)를 실행합니다.

`g` 명령어를 실행할 때, Vim은 파일을 두 번 스캔합니다. 첫 번째 스캔은 각 줄을 검사해서 `/console/` 패턴에 일치하는 줄을 표시합니다. 모든 일치하는 줄이 표시되면, 두 번째 스캔에서 표시된 줄에 `d` 명령어를 실행합니다.

대신 “const” 를 포함하는 모든 줄을 삭제하려면 다음을 실행합니다:

```
:g/const/d
```

실행 결과:

```
console.log("one: ", one);

console.log("two: ", two);

console.log("three: ", three);
```


## Inverse Match
일치하지 않는 줄에 글로벌 명령어를 실행하려면 다음을 실행할 수 있습니다:

```
:g!/pattern/command
```

또는

```
:v/pattern/command
```

`:v/console/d` 를 실행하면 “console” 을 포함하지 않는 모든 줄이 삭제됩니다.


## Pattern
글로벌 명령어는 대체 명령어와 동일한 패턴 시스템을 사용하므로, 이 섹션은 복습용으로 활용됩니다. 다음 섹션으로 건너뛰거나 계속 읽어도 좋습니다!

다음과 같은 표현이 있다면:

```
const one = 1;
console.log("one: ", one);

const two = 2;
console.log("two: ", two);

const three = 3;
console.log("three: ", three);
```

“one” 또는 “two” 가 포함된 줄을 삭제하려면 다음을 실행합니다:

```
:g/one\|two/d
```

단일 숫자가 포함된 줄을 삭제하려면 다음 중 하나를 실행합니다:

```
:g/[0-9]/d
```

또는

```
:g/\d/d
```

다음과 같은 표현이 있을 경우:

```
const oneMillion = 1000000;
const oneThousand = 1000;
const one = 1;
```

0이 3개에서 6개 사이인 줄을 일치시키려면 다음을 실행합니다:

```
:g/0\{3,6\}/d
```


## Passing a Range
`g` 명령어 앞에 범위를 지정할 수 있습니다. 다음과 같은 방법이 있습니다:

- `:1,5g/console/d` 1번 줄부터 5번 줄 사이의 “console” 문자열을 찾아 삭제합니다.
- `:,5g/console/d` 쉼표 앞에 주소가 없으면 현재 줄부터 시작합니다. 현재 줄부터 5번째 줄 사이에서 “console” 문자열을 찾아 삭제합니다.
- `:3,g/console/d` 쉼표 뒤에 주소가 없으면 현재 줄에서 종료됩니다. 3번째 줄부터 현재 줄 사이에서 “console” 문자열을 찾아 삭제합니다.
- `:3g/console/d` 쉼표 없이 하나의 주소만 전달하면 명령은 3번째 줄만 실행됩니다. 3번째 줄을 검색해서 “console” 문자열이 있으면 삭제합니다.

숫자 외에도 다음과 같은 기호를 범위 지정자로 사용할 수 있습니다:

- `.` 은 현재 줄을 의미합니다. `.,3` 범위는 현재 줄부터 3번째 줄까지를 의미합니다.
- `$` 는 파일의 마지막 줄을 의미합니다. `3,$` 범위는 3번째 줄부터 마지막 줄까지를 의미합니다.
- `+n` 은 현재 줄 이후 n번째 줄을 의미합니다. `.` 과 함께 또는 단독으로 사용할 수 있습니다. `3,+1` 또는 `3,.+1` 은 3번째 줄부터 현재 줄 이후 첫 번째 줄까지를 의미합니다.

범위를 지정하지 않으면 기본적으로 파일 전체에 적용됩니다. 이는 사실 일반적인 방식은 아닙니다. Vim의 대부분의 명령줄 명령은 범위를 지정하지 않으면 현재 줄에 실행됩니다. 두 가지 주목할 만한 예외는 전역 명령(`:g`)과 저장 명령(`:w`)입니다.


## Normal Command
`:normal` 명령줄 명령을 사용해서 일반 명령을 글로벌 명령으로 실행할 수 있습니다.

다음과 같은 텍스트가 있다면:
```
const one = 1
console.log("one: ", one)

const two = 2
console.log("two: ", two)

const three = 3
console.log("three: ", three)
```

각 줄 끝에 “;” 를 추가하려면 다음을 실행합니다:

```
:g/./normal A;
```

자세히 살펴보겠습니다:

- `:g` 는 전역 명령어입니다.
- `/./` 는 “비어 있지 않은 줄” 을 의미하는 패턴입니다. 최소 한 글자가 있는 줄과 일치하므로 “const” 나 “console” 이 포함된 줄은 일치하지만 빈 줄은 일치하지 않습니다.
- `normal A;` 는 `:normal` 명령줄 명령을 실행합니다. `A;` 는 줄 끝에 “;” 를 삽입하는 일반 모드 명령입니다.


## Executing a Macro
글로벌 명령어로 매크로를 실행할 수도 있습니다. 매크로는 `normal` 명령어로 실행할 수 있습니다. 다음과 같은 표현식이 있다면:

```
const one = 1
console.log("one: ", one);

const two = 2
console.log("two: ", two);

const three = 3
console.log("three: ", three);
```

“const” 가 포함된 줄에는 세미콜론이 없다는 점에 유의합니다. 레지스터 a에 해당 줄 끝에 쉼표를 추가하는 매크로를 생성해 보겠습니다:

```
qaA;<Esc>q
```

복습이 필요하다면 매크로 장을 참고합니다. 이제 다음 명령을 실행합니다:

```
:g/const/normal @a
```

이제 “const” 가 포함된 모든 줄 끝에 “;” 가 추가됩니다.

```
const one = 1;
console.log("one: ", one);

const two = 2;
console.log("two: ", two);

const three = 3;
console.log("three: ", three);
```

이 단계를 따라하셨다면 첫 번째 줄에는 세미콜론이 두 개 있을 겁니다. 이를 방지하려면 두 번째 줄부터 `:2,$g/const/normal @a` 글로벌 명령을 실행합니다.


## Recursive Global Command
글로벌 명령어 자체는 일종의 명령줄 명령어이므로, 기술적으로 글로벌 명령어 내부에서 글로벌 명령어를 실행할 수 있습니다.

다음과 같은 표현식에서 두 번째 `console.log` 문을 삭제하려면:

```
const one = 1;
console.log("one: ", one);

const two = 2;
console.log("two: ", two);

const three = 3;
console.log("three: ", three);
```

다음 명령을 실행하면:

```
:g/console/g/two/d
```

먼저 `g` 는 “console” 패턴을 포함하는 줄을 찾아 3개의 일치 항목을 찾습니다. 그런 다음 두 번째 `g` 는 그 세 개의 일치 항목 중에서 “two” 패턴을 포함하는 줄을 찾습니다. 마지막으로 해당 일치 항목을 삭제합니다.

`g` 와 `v` 를 조합해서 양수/음수 패턴을 찾을 수도 있습니다. 예를 들어:

```
:g/console/v/two/d
```

“two” 패턴을 포함하는 줄을 찾는 대신, “two” 패턴을 **포함하지 않는** 줄을 찾습니다.


## Changing the Delimiter
대체 명령어와 마찬가지로 전역 명령어의 구분자를 변경할 수 있습니다. 규칙은 동일합니다: 알파벳, 숫자, `"`, `|`, `\` 를 제외한 모든 단일 바이트 문자를 사용할 수 있습니다.

“console” 이 포함된 줄을 삭제하려면:

```
:g@console@d
```

글로벌 명령어와 함께 substitute 명령어를 사용할 경우 두 개의 서로 다른 구분자를 설정할 수 있습니다:

```
g@one@s+const+let+g
```

여기서 글로벌 명령어는 “one” 을 포함하는 모든 줄을 찾습니다. substitute 명령어는 해당 일치 항목에서 ‘const’ 문자열을 “let” 으로 대체합니다.


## The Default Command
글로벌 명령어에 명령줄 명령을 지정하지 않으면 어떻게 될까요?

글로벌 명령어는 현재 줄의 텍스트를 출력하기 위해 print(`:p`) 명령을 사용합니다. 다음을 실행하면:

```
:g/console
```

화면 하단에 “console” 을 포함하는 모든 줄이 출력됩니다.

참고로 흥미로운 사실 하나를 알려드립니다. 글로벌 명령어가 기본적으로 사용하는 명령어가 `p` 이기 때문에, `g` 구문은 다음과 같이 구성됩니다:

```
:g/re/p
```

- `g` 글로벌 명령어
- `re` 정규식 패턴
- `p` 출력 명령어

이것은 **“grep”** 을 의미하며, 바로 명령줄의 그 `grep` 과 동일합니다. 이는 **우연이 아닙니다**. `g/re/p` 명령어는 원래 초기 라인 텍스트 편집기 중 하나인 Ed 편집기에서 유래했습니다. `grep` 명령어의 이름은 Ed에서 따온 것입니다.

여러분의 컴퓨터에 아마 아직까지 Ed 편집기가 있을 것입니다. 터미널에서 `ed` 를 실행해 보시기 바랍니다. (힌트: 종료하려면 `q` 를 입력합니다.)


## Reversing the Entire Buffer
전체 파일을 반전시키려면 다음을 실행합니다:

```
:g/^/m 0
```

`^` 는 줄의 시작을 나타내는 패턴입니다. 빈 줄을 포함해서 모든 줄에 일치시키려면 `^` 를 사용합니다.

몇 줄만 반전시키려면 범위를 지정합니다. 5번 줄부터 10번 줄까지 줄을 반전시키려면 다음을 실행합니다:

```
:5,10g/^/m 0
```

move 명령어에 대한 자세한 내용은 `:h :move` 를 참조합니다.


## Aggregating All Todos
코딩할 때 가끔 편집 중인 파일에 TODO 를 작성하곤 합니다:

```
const one = 1;
console.log("one: ", one);
// TODO: feed the puppy

const two = 2;
// TODO: feed the puppy automatically
console.log("two: ", two);

const three = 3;
console.log("three: ", three);
// TODO: create a startup selling an automatic puppy feeder
```

생성된 모든 TODO를 추적하기 어려울 수 있습니다. Vim은 모든 일치 항목을 지정된 위치로 복사하는 `:t` (복사)명령이 있습니다. 복사 명령에 대한 자세한 내용은 `:h :copy` 를 참조합니다.

모든 TODO를 파일 끝으로 복사해서 쉽게 확인할 수 있도록 처리하려면 다음을 실행합니다:

```
:g/TODO/t $
```

실행 결과:

```
const one = 1;
console.log("one: ", one);
// TODO: feed the puppy

const two = 2;
// TODO: feed the puppy automatically
console.log("two: ", two);

const three = 3;
console.log("three: ", three);
// TODO: create a startup selling an automatic puppy feeder

// TODO: feed the puppy
// TODO: feed the puppy automatically
// TODO: create a startup selling an automatic puppy feeder
```

이제 생성한 모든 할 일 목록을 검토하고, 처리할 시간을 찾거나 다른 사람에게 위임한 후 다음 작업으로 계속 진행할 수 있습니다.

복사 대신 모든 할 일 목록을 맨 끝으로 이동하려면 이동 명령어 `:m` 을 사용합니다:

```
:g/TODO/m $
```

실행 결과:

```
const one = 1;
console.log("one: ", one);

const two = 2;
console.log("two: ", two);

const three = 3;
console.log("three: ", three);

// TODO: feed the puppy
// TODO: feed the puppy automatically
// TODO: create a startup selling an automatic puppy feeder
```


## Black Hole Delete
레지스터 장에서 배운 것 같이 삭제된 텍스트는 번호가 매겨진 레지스터에 저장됩니다. (레지스터 용량이 충분할 경우) `:g/console/d` 를 실행할 때마다 Vim은 삭제된 줄을 번호가 매겨진 레지스터에 저장합니다. 많은 줄을 삭제하면 번호가 매겨진 레지스터가 금방 가득 차게 됩니다. 이를 방지하려면 블랙홀 레지스터(`"_`)를 사용해서 삭제된 줄을 레지스터에 저장하지 않도록 처리할 수 있습니다. 다음 명령을 실행합니다:

```
:g/console/d_
```

`d` 뒤에 `_` 를 전달하면 Vim은 레지스터를 소모하지 않습니다.


## Reduce Multiple Empty Lines to One Empty Line
여러 개의 빈 줄이 포함된 텍스트가 있다면:

```
const one = 1;
console.log("one: ", one);


const two = 2;
console.log("two: ", two);





const three = 3;
console.log("three: ", three);
```

빈 줄을 하나의 빈 줄로 빠르게 줄이려면 다음을 사용합니다:

```
:g/^$/,/./-1j
```

실행 결과:

```
const one = 1;
console.log("one: ", one);

const two = 2;
console.log("two: ", two);

const three = 3;
console.log("three: ", three);
```

일반적으로 글로벌 명령어는 다음과 같이 `:g/pattern/command` 형식을 사용합니다. 그러나, 다음과 같은 형식으로 `:g/pattern1/,/pattern2/command` 글로벌 명령어를 실행할 수 있습니다. 이 경우 Vim은 `pattern1` 과 `pattern2` 내에서 `command` 를 적용합니다.

이를 염두에 두고 `:g/^$/,/./-1j` 명령어를 `:g/pattern1/,/pattern2/command` 형식에 따라 분석해 보겠습니다:

- `/pattern1/` 은 `/^$/` 입니다. 이는 빈 줄(문자가 하나도 없는 줄)을 나타냅니다.
- `/pattern2/` 는 `-1` 라인 수정자가 적용된 `/./` 입니다. `/./` 는 비어 있지 않은 줄(문자가 하나 이상 있는 줄)을 나타냅니다. `-1` 은 그 위의 줄을 의미합니다.
- `command` 는 `j`, 즉 연결 명령어(`:j`)입니다. 이 맥락에서 이 전역 명령어는 지정된 모든 줄을 연결합니다.

참고로, 여러 개의 빈 줄을 줄 없이 줄로 줄이려면 다음을 실행합니다:

```
:g/^$/,/./j
```

좀 더 간단한 대안:

```
:g/^$/-j
```

이제 텍스트는 다음과 같이 줄어듭니다:

```
const one = 1;
console.log("one: ", one);
const two = 2;
console.log("two: ", two);
const three = 3;
console.log("three: ", three);
```


## Advanced Sort
Vim은 범위 내의 줄을 정렬하는 `:sort` 명령어가 있습니다. 예를 들어:

```
d
b
a
e
c
```

`:sort` 를 실행하면 정렬할 수 있습니다. 범위를 지정하면 해당 범위 내의 줄만 정렬합니다. 예를 들어, `:3,5sort` 는 3번째와 5번째 줄만 정렬합니다.

다음과 같은 표현식이 있다면:

```
const arrayB = [
  "i",
  "g",
  "h",
  "b",
  "f",
  "d",
  "e",
  "c",
  "a",
]

const arrayA = [
  "h",
  "b",
  "f",
  "d",
  "e",
  "a",
  "c",
]
```

배열 자체는 정렬하지 않고 배열 내부의 요소만 정렬할 경우 다음을 실행할 수 있습니다:

```
:g/\[/+1,/\]/-1sort
```

실행 결과:

```
const arrayB = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
]

const arrayA = [
  "a"
  "b",
  "c",
  "d",
  "e",
  "f",
  "h",
]
```

이거 정말 대단하네요! 하지만, 명령어가 복잡해 보이네요. 하나씩 쪼개서 살펴볼까요. 이 명령어도 `:g/pattern1/,/pattern2/command` 형식을 따릅니다.

- `:g` 는 전역 명령 패턴입니다.
- `/\[/+1` 은 첫 번째 패턴입니다. 리터럴 왼쪽 대괄호 “[” 를 찾습니다. `+1` 은 그 아래 줄을 가리킵니다.
- `/\]/-1` 은 두 번째 패턴입니다. 리터럴 오른쪽 대괄호 “]” 에 일치합니다. `-1` 은 그 위 줄을 가리킵니다.
- `/\[/+1,/\]/-1` 은 “[” 와 “]” 사이의 모든 줄을 가리킵니다.
- `sort` 는 정렬을 위한 명령줄 명령어입니다.


## Learn the Global Command the Smart Way
글로벌 명령어는 일치하는 모든 줄에 명령줄 명령을 실행합니다. 이를 사용하면 명령을 한 번만 실행하면 Vim이 나머지를 처리해 줍니다. 글로벌 명령어를 능숙하게 다루려면 두 가지가 필요합니다: 풍부한 명령줄 명령어 어휘와 정규 표현식에 대한 지식입니다. Vim을 사용할수록 자연스럽게 좀 더 많은 명령줄 명령어를 익히게 될 것입니다. 정규 표현식 지식은 보다 적극적인 접근이 필요하지만, 일단 정규 표현식에 익숙해지면 많은 사용자보다 앞서 나갈 수 있습니다.

여기 소개된 예제 중 일부는 복잡합니다. 겁먹지 말고 시간을 들여서 충분히 이해해야 합니다. 패턴을 읽는 법을 익혀야 합니다. 포기하지 마시기 바랍니다.

여러 명령어를 실행할 때마다 잠시 멈추고 `g` 명령어를 활용할 수 있는지 살펴봅니다. 작업에 가장 적합한 명령어를 찾아서 한 번에 최대한 많은 대상을 지정할 수 있는 패턴을 작성합니다.

이제 글로벌 명령어의 강력한 힘을 알게 되었으니, 외부 명령어를 활용해서 도구 모음을 확장하는 방법을 배워보겠습니다.


## Link
- Prev [Ch12. Search and Substitute](./ch12_search_and_substitute.md)
- Next [Ch14. External Commands](./ch14_external_commands.md)
