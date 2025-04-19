# SED Bible 

# Getting to know the sed editor
`sed` 편집기는 일반적인 **대화형 텍스트 편집기** (*interactive text editor*) 와 달리 **스트림 편집기** (*stream editor*) 라 불립니다. 

대화형 텍스트 편집기, 예를 들어 **vim** 에선 **키보드 명령** 을 사용해 데이터를 대화식으로 삽입, 삭제 또는 교체합니다. 이에 반해, 
스트림 편집기는 데이터를 처리하기 전에 미리 제공한 **규칙 또는 명령을 바탕으로 데이터 스트림을 편집** 합니다.

`sed` 편집기는 **명령** (*command*) 을 명령줄에 직접 입력하거나 **명령 텍스트 파일** 에 저장해 데이터 스트림의 데이터를 조작할 수 있습니다. 

`sed` 편집기는 다음과 같은 작업을 수행합니다: 

1. 입력 스트림에서 한 줄씩 데이터를 읽습니다.  
2. 읽은 데이터를 함께 제공한 편집 명령의 주소나 패턴과 비교한 후 일치 여부를 검사합니다.  
3. 명령에 지정한 대로 스트림의 데이터를 지침대로 변경합니다.  
4. 변경된 데이터를 **STDOUT** (표준 출력) 에 출력합니다.

스트림 편집기는 읽어온 데이터의 **한 줄에 모든 명령을 적용** 한 후 **다음 데이터 줄을 읽으며 그 과정을 계속 반복** 합니다. 
스트림 편집기가 스트림의 모든 데이터 줄을 처리하면 작업을 종료합니다.

명령은 한 줄씩 순차적으로 적용되기 때문에 `sed` 편집기에선 데이터를 편집하기 위해 한 번만 데이터 스트림을 통과합니다. 
이로 인해 `sed` 편집기는 대화형 편집기보다 **훨씬 빠르며** 파일의 데이터를 **실시간으로 빠르게 수정** 할 수 있습니다.

`sed` 명령을 사용하는 구문은 다음과 같습니다:

```
sed options scriptfile
```

**options** 매개변수 (혹은 플래그) 는 `sed` 명령의 기본 동작을 사용자화할 수 있으며 옵션은 다음 표에 나와 있습니다.

| 옵션 | 설명 |
| ---  | ---  |
| -e script | 지정한 명령을 입력을 처리하는 명령에 추가합니다. |
| -f file   | 스크립트 명령 파일에 지정한 명령을 입력을 처리하는 명령에 추가합니다. |
| -n        | 각 명령의 출력 결과를 생성하지 않고 **print** 명령을 기다립니다. |

**scriptfile** 은 스트림 데이터에 적용할 단일 또는 복수 명령을 지정한 파일입니다. 만약, 여러 개의 명령이 필요할 경우 `-e` 옵션을 사용해 명령줄에 명령을 직접 지정하거나 
`-f` 옵션을 사용해 명령을 별도의 스크립트 파일에 저장합니다. 

데이터를 조작할 수 있는 다양한 명령들이 존재하며 이번 장에서는 `sed` 편집기에서 사용하는 **기본 명령** 을 살펴보고 다음 장에선 **고급 명령** 에 대해 다룰 것입니다.

<br>

## Defining an editor command in the command line
기본적으로 `sed` 편집기는 명령을 **STDIN** (표준 입력) 입력 스트림에 적용합니다. 따라서, `sed` 편집기로 데이터를 **파이프** (*pipe*) 처리할 수 있습니다. 
다음은 이를 수행하는 방법을 보여주는 간단한 예입니다:

> [!NOTE]
> 다른 프로그램의 출력 결과를 입력으로 처리하는 프로그램을 **필터** (*filter*) 라 부릅니다.

```
$ echo "This is a test" | sed 's/test/big test/'
This is a big test
$
```

이 예제는 `sed` 편집기의 `s` (*substitute*) 대체 명령을 사용합니다. `s` 명령은 첫 번째 텍스트 문자열 패턴을 두 번째 텍스트 문자열로 대체합니다. 
예제에선 *test* 란 단어를 *big test* 로 대체했습니다.  

> [!TIP]
> 대체 명령의 첫 번째 텍스트 문자열은 **검색 문자열** 이라 부르고 두 번째 텍스트 문자열은 **대체 문자열** 이라 부릅니다.

이 예제를 실행하면 화면에 결과가 곧바로 표시됩니다. 이것이 바로 `sed` 편집기를 사용하는 주된 이유입니다. 
`sed` 편집기를 사용하면 일부 대화형 편집기 프로그램을 시작하는 데 걸리는 시간과 비슷한 시간에 데이터를 여러 번 수정할 정도로 빠릅니다.  

물론, 예제처럼 간단한 테스트는 한 줄의 데이터만 수정한 것입니다. 하지만, 전체 파일을 편집하더라도 빠른 속도로 실행 결과를 얻을 수 있습니다:

```
$ cat data1.txt
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
$
$ sed 's/dog/cat/' data1.txt
The quick brown fox jumps over the lazy cat.
The quick brown fox jumps over the lazy cat.
The quick brown fox jumps over the lazy cat.
The quick brown fox jumps over the lazy cat.
$
```

`sed` 편집기는 실행되면 빠르게 결과 데이터를 반환합니다. 입력 데이터 줄을 처리하면서 곧바로 결과를 표시하므로 `sed` 편집기가 전체 파일을 처리하기 전에도 결과를 볼 수 있습니다.

여기선 중요한 점은 `sed` 편집기는 **"원본 텍스트 파일의 데이터는 전혀 수정하지 않는다!"** 는 것입니다. 명령으로 수정한 결과 텍스트는 **STDOUT** (표준 출력)으로만 출력됩니다. 
다음과 같이 원본 텍스트 파일을 확인하면 원본 데이터가 그대로 포함되어 있다는 것을 알 수 있습니다.

```
$ cat data1.txt
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
$
```

<br>

## Using multiple editor commands in the command line
`sed` 편집기를 명령줄 (*command line*) 에서 여러 개의 명령을 지정해 실행하려면 다음과 같이 `-e` 옵션을 사용합니다.

```
$ sed -e 's/brown/green/; s/dog/cat/' data1.txt
The quick green fox jumps over the lazy cat.
The quick green fox jumps over the lazy cat.
The quick green fox jumps over the lazy cat.
The quick green fox jumps over the lazy cat.
$
```

두 개의 명령은 *data1* 파일의 각 줄에 매번 적용됩니다. 이때, 여러 개의 명령을 **세미콜론 문자로 구분** 하며 명령과 세미콜론 문자 사이엔 공백 문자가 없어야 합니다.  

> [!TIP]
> 만약, 공백 문자가 있다면 다음과 같은 오류가 발생합니다. `sed: Command garbled: s/brown/green/ ; s/dog/cat/` 하지만, GNU 버전의 sed는 정상적으로 실행됩니다.

세미콜론 문자 대신 `bash` 쉘의 **보조 프롬프트** 를 사용할 수 있습니다. 작은따옴표 문자를 입력해 `sed` 편집기를 (스크립트 즉, `sed` 편집기 명령 목록) 시작하면 
`bash` 쉘은 닫는 작은따옴표 문자를 입력할 때까지 추가적인 명령을 계속해 요청합니다.

```
$ sed -e '
> s/brown/green/
> s/fox/elephant/
> s/dog/cat/' data1.txt
The quick green elephant jumps over the lazy cat.
The quick green elephant jumps over the lazy cat.
The quick green elephant jumps over the lazy cat.
The quick green elephant jumps over the lazy cat.
$
```

닫는 작은따옴표 문자가 나타난 동일한 줄에서 명령을 마무리해야 합니다. `bash` 쉘은 닫는 작은따옴표 문자를 감지하면 명령을 처리합니다. 
`sed` 편집기는 지정한 각각의 명령을 *data1* 파일의 각 줄에 적용합니다.

<br>

## Reading editor commands from a file
처리할 `sed` 명령이 많을 경우 **별도의 파일에 저장** 하는 것이 유용할 수 있습니다. 이 경우, `-f` 옵션을 사용해 `sed` 편집기에 스크립트 명령 파일을 지정해 실행할 수 있습니다.

```
$ cat script1.sed
s/brown/green/
s/fox/elephant/
s/dog/cat/
$
$ sed -f script1.sed data1.txt
The quick green elephant jumps over the lazy cat.
The quick green elephant jumps over the lazy cat.
The quick green elephant jumps over the lazy cat.
The quick green elephant jumps over the lazy cat.
$
```

이 경우, 각 명령 뒤에 세미콜론 문자를 추가할 필요는 없습니다. `sed` 편집기는 각 줄이 단일 명령을 포함한다는 것을 알고 있습니다. 
명령줄에 `sed` 명령을 직접 입력한 것과 마찬가지로 `sed` 편집기는 지정한 명령 파일에서 명령을 읽고 데이터 파일의 각 줄에 적용합니다.

> [!TIP]
> `sed` 편집기의 명령 스크립트 파일과 `bash` 쉘 스크립트 파일을 혼동할 수 있습니다. 이런 혼란을 피하려면 `sed` 스크립트 파일에 `.sed` 파일 확장자를 사용하는 것이 좋습니다.

다음 섹션부터 데이터를 조작하는 데 유용한 `sed` 편집기 명령을 살펴보겠습니다. 



<br><br>

# Commanding at the sed Editor Basics
`sed` 편집기를 성공적으로 사용하려면 **명령** 과 **사용 형식** 을 제대로 이해하는 것이 중요합니다. 이런 명령과 사용 형식은 편집 작업을 사용자화하는 데 많은 도움이 됩니다. 
이 섹션에선 `sed` 편집기로 편집 작업을 시작할 때나 스크립트 파일에 포함할 수 있는 몇 가지 기본적인 명령과 기능에 대해 설명합니다.

<br>

## Introducing more substitution options
이미 `s` 명령을 사용해 한 줄의 텍스트를 새로운 텍스트로 대체하는 방법을 살펴봤습니다. 하지만, **대체 명령엔 추가적인 옵션** 이 존재하고 이를 잘 활용하면 보다 쉽게 작업을 처리할 수 있습니다.

<br>

### Substituting flags
대체 명령으로 텍스트 문자열에서 검색 일치한 패턴을 대체하는 방식엔 한 가지 주의할 점이 있습니다. 다음 예제를 통해 무슨일이 일어나는지 살펴보시길 바랍니다:

```
$ cat data2.txt
This is a test of the test script.
This is the second test of the test script.
$
$ sed 's/test/trial/' data2.txt
This is a trial of the test script.
This is the second trial of the test script.
$
```

대체 명령은 여러 줄의 텍스트를 대체하는 작업을 잘 처리하지만, **기본적으로 각 줄의 첫 번째 검색 일치 대상만 대체 문자열로 대체합니다.** 

각 줄내의 다른 부분까지 대체하려면 대체 명령에 **substitution flag** 를 사용해야 합니다. 이 **대체 플래그는 대체 명령의 대체 문자열 (*replacement*) 뒤에 설정** 합니다.

```
s/pattern/replacement/flags
```

다음은 대체 명령에 사용할 수 있는 네 가지 유형의 **substitution flag** 입니다:

| flags | description |
| --- | --- | 
| **숫자** |  검색 패턴이 발견된 특정 위치를 지정해, 해당 위치의 텍스트를 새로운 텍스트로 대체합니다. |
| **g** |  원본 텍스트내의 모든 검색 일치 텍스트를 새로운 텍스트로 대체합니다. |
| **p** |  원본 텍스트 줄의 내용을 출력합니다. |
| **w file** |  대체 명령으로 대체한 결과를 지정한 파일에 저장합니다. |

첫 번째 유형은 검색 일치한 패턴 중, 어떤 위치에 새로운 텍스트를 대체할지 지정할 수 있습니다. 예를 들어, 숫자를 사용해 특정 위치를 지정하면 그 위치의 텍스트만 새로운 텍스트로 대체합니다.

```
$ sed 's/test/trial/2' data2.txt
This is a test of the trial script.
This is the second test of the trial script.
$
```

예제와 같이 **substitution flag** 에 숫자 **2** 를 지정해 실행하면, 각 줄내에서 두 번째 위치의 패턴만 대체합니다. 

반면에 **g** (*global*) 플래그는 패턴이 나타나는 모든 위치를 대체합니다.

```
$ sed 's/test/trial/g' data2.txt
This is a trial of the trial script.
This is the second trial of the trial script.
$
```

**p** (*print*) 플래그는 검색 일치한 패턴이 포함된 줄만 출력합니다. 이 플래그는 주로 `sed -n` 옵션과 함께 사용합니다. 

**`-n` (*next*) 옵션은 sed 편집기의 기본 출력 작업을 억제한 후, `p` 플래그로 인해 대체한 줄만 출력합니다.**

```
$ cat data3.txt
This is a test line.
This is a different line.
$
$ sed -n 's/test/trial/p' data3.txt
This is a trial line.
$
```

위와 같이 `-n` 옵션은 `sed` 편집기의 기본 출력 작업을 모두 억제합니다. 따라서, **p** 플래그로 인해 대체한 줄만 출력합니다. 그래서, 이 두 가지 명령을 조합하면 **대체 명령으로 수정한 줄만 출력** 할 수 있습니다.

**w** (*write*)플래그는 **p** 플래그 같이 대체한 줄만 출력한 것과 동일한 결과를 생성하지만, 출력 내용을 지정한 파일에 저장합니다.

```
$ sed 's/test/trial/w test.txt' data3.txt
This is a trial line.
This is a different line.
$
$ cat test.txt
This is a trial line.
$
```

`sed` 편집기의 기본 출력은 **STDOUT** (표준 출력) 에 나타나지만, 검색 일치한 패턴을 포함해 대체한 줄만 파일에 저장합니다.

<br>

### Replacing characters
때때로, 텍스트 문자열 중에는 대체 명령의 패턴에 사용하기 어려운 문자가 있습니다. **Linux** 환경의 대표적인 예로 슬래시 (`/`) 문자가 있습니다. 

예를 들어, 파일에 포함된 경로 이름을 대체하는 작업은 매우 번거로울 수 있습니다. `/etc/passwd` 파일에 "bash" 를 "csh" 쉘로 대체할 경우에는 다음과 같이 처리합니다:

```
$ sed 's/\/bin\/bash/\/bin\/csh/' /etc/passwd
```

슬래시 (`/`) 문자는 검색 문자열과 대체 문자열의 **구분자** 로 사용되므로 만약, 패턴 텍스트에 슬래시 문자가 포함된다면 이스케이프 처리하기 위해 백슬래시 (`\`) 문자를 매번 사용해야 합니다. 이로 인해, 혼동이나 입력 실수가 발생할 수 있습니다. 

이런 문제를 해결하기 위해, `sed` 편집기는 대체 명령의 **구분자로 다른 문자를 선택할 수 있도록 허용** 합니다.

```
$ sed 's!/bin/bash!/bin/csh!' /etc/passwd
```

위의 예제는 구분자로 느낌표 (`!`) 문자를 사용해, 경로 이름을 훨씬 더 읽기 쉽고 이해하기 쉽게 만듭니다.

<br>

## Using addresses
기본적으로, `sed` 편집기에 사용하는 **명령은 텍스트 데이터의 모든 줄에 적용** 됩니다. 따라서, 특정한 줄이나 여러 줄 범위에만 명령을 적용하려면, **줄 주소 지정** (*line addressing*) 방식으로 처리해야 합니다. 

`sed` 편집기엔 두 가지 형태의 줄 주소 지정 방식이 있습니다:

- **주소 또는 주소 범위**: 특정 줄이나 줄 범위에만 명령을 적용합니다.
- **텍스트 패턴 또는 패턴 범위**: 해당 패턴이 포함된 줄만 필터링해 명령을 적용합니다.

두 가지 줄 주소 지정 방식 모두, 주소를 지정할 때는 다음과 같이 동일한 형식으로 사용합니다:

```
[address]command
```

또한, 특정 주소에 여러 명령을 묶어 **그룹화** 해 적용할 수 있습니다:

```
address {
    command1
    command2
    command3
}
```

`sed` 편집기는 지정한 그룹 명령을 주소와 일치한 줄에만 적용합니다. 

다음 섹션은 `sed` 스크립트에서 두 가지 **줄 주소 지정** 방식을 사용하는 방법에 대해 설명합니다.

<br>

### Addressing the numeric line
숫자로 된 줄 주소 지정 방식을 사용할 때, 텍스트 스트림의 **줄 번호를 기준으로 처리** 합니다. `sed` 편집기는 텍스트 스트림의 첫 번째 줄을 1번 줄로 지정하고, 이후 각 줄에 순차적으로 번호를 매깁니다. 또한, 명령에 지정한 주소는 **단일 줄 번호** 일 수도 있고, **시작 줄 번호와 종료 줄 번호 사이에 쉼표 문자를 사용해 범위 주소 형태로 지정** 할 수 있습니다. 

다음은 `sed` 명령을 적용할 단일 줄 번호를 지정한 예입니다:

```
$ sed '2s/dog/cat/' data1.txt
The quick brown fox jumps over the lazy dog
The quick brown fox jumps over the lazy cat
The quick brown fox jumps over the lazy dog
The quick brown fox jumps over the lazy dog
$
```

`sed` 편집기는 두 번째 줄만 수정했습니다. 이번엔 주소 범위를 사용한 예를 살펴보겠습니다:

```
$ sed '2,3s/dog/cat/' data1.txt
The quick brown fox jumps over the lazy dog
The quick brown fox jumps over the lazy cat
The quick brown fox jumps over the lazy cat
The quick brown fox jumps over the lazy dog
$
```

텍스트의 특정 지점부터 텍스트의 끝까지 명령을 적용하려면, 특수 주소인 달러 기호 (`$`) 문자를 사용할 수 있습니다:

```
$ sed '2,$s/dog/cat/' data1.txt
The quick brown fox jumps over the lazy dog
The quick brown fox jumps over the lazy cat
The quick brown fox jumps over the lazy cat
The quick brown fox jumps over the lazy cat
$
```

일반적으로 텍스트 파일에 몇 줄의 데이터가 있는지 알 수 없기 때문에, 달러 기호 (`$`) 는 유용하게 사용됩니다.

<br>

### Using text pattern filters
명령을 적용할 줄을 제한할 또 다른 방법은 조금 복잡해 보일 수 있습니다. 

`sed` 편집기는 명령을 적용할 줄을 **필터링** (*filtering*) 하기 위해 **텍스트 패턴으로 지정** 할 수 있습니다. 그 사용 형식은 다음과 같습니다:

```
/pattern/command
```

**패턴 (*pattern*) 은 슬래시 (`/`) 문자로 감싸야 합니다.** 

`sed` 편집기는 **텍스트 패턴을 포함한 줄에만 명령을 적용** 합니다. 예를 들어, *Samantha* 사용자의 기본 셸을 변경하려면 다음과 같이 사용할 수 있습니다:

```
$ grep Samantha /etc/passwd
Samantha:x:502:502::/home/Samantha:/bin/bash
$
$ sed '/Samantha/s/bash/csh/' /etc/passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
[...]
Christine:x:501:501:Christine B:/home/Christine:/bin/bash
Samantha:x:502:502::/home/Samantha:/bin/csh
Timothy:x:503:503::/home/Timothy:/bin/bash
$
```

이 명령은 **검색 일치한 텍스트 패턴이 포함된 줄에만 적용** 되었습니다. 

지금 같이, 고정된 텍스트 패턴을 사용하면 특정 값을 필터링할 떄는 유용하지만 범용적인 사용 방법에 있어선 다소 제한적입니다. 

`sed` 편집기는 **정규 표현식** (*regular expressions*) 을 사용해 좀 더 복잡한 텍스트 패턴을 생성할 수 있습니다. **정규 표현식** 은 다양한 형태의 텍스트 데이터와 일치할 수 있는 **고급 텍스트 패턴** 을 만들 수 있습니다. 

정규 표현식은 **와일드카드 문자**, **특수 문자** 및 **고정 텍스트** 문자를 결합해 거의 모든 상황을 처리할 수 있는 텍스트 패턴을 생성할 수 있습니다. 정규 표현식은 스크립트 프로그래밍에서 가장 어려운 부분 중 하나이며 **별도의 장** 에 자세히 다루겠습니다.

<br>

### Grouping commands
개별 줄에 여러 명령을 수행할 경우, **중괄호 문자를 사용해 명령을 그룹화** 할 수 있습니다. `sed` 편집기는 지정한 주소의 줄에만 여러 명령을 적용합니다:

```
$ sed '2{
> s/fox/elephant/
> s/dog/cat/
> }' data1.txt
The quick brown fox jumps over the lazy dog.
The quick brown elephant jumps over the lazy cat.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
$
```

**그룹 명령의 두 명령 모두 동일한 2번 줄에 적용** 됩니다. 물론, 그룹 명령은 주소 범위로 지정할 수 있습니다:

```
$ sed '3,${
> s/brown/green/
> s/lazy/active/
> }' data1.txt
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick green fox jumps over the active dog.
The quick green fox jumps over the active dog.
$
```

`sed` 편집기는 주소 범위의 모든 줄에 그룹 명령을 일괄 적용합니다.

<br>

## Deleting lines
`sed` 편집기에 대체 명령만 있는 것은 아닙니다. 

텍스트 스트림의 특정 줄만 삭제할 경우, **삭제** 명령 (*delete command*) 인 `d` 명령을 사용할 수 있습니다. 
`d` 명령은 문자그대로 동작해, 지정한 **주소 체계에 일치한 텍스트 줄을 삭제** 합니다. 

**삭제 명령을 사용할 떈 항상 주소 체계를 포함해야 한다** 는 사실을 절대 잊지말아야 합니다. 

만약, **주소 체계를 포함하지 않는다면 스트림의 모든 줄이 삭제됩니다!!**

```
$ cat data1.txt
The quick brown fox jumps over the lazy dog
The quick brown fox jumps over the lazy dog
The quick brown fox jumps over the lazy dog
The quick brown fox jumps over the lazy dog
$
$ sed 'd' data1.txt
$
```

삭제 명령은 주소 체계와 함께 사용할 때만 유용합니다. 이를 통해, 줄 번호를 기준으로 데이터 스트림의 특정 텍스트 줄만 삭제할 수 있습니다:

```
$ cat data4.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
$
$ sed '3d' data4.txt
This is line number 1.
This is line number 2.
This is line number 4.
$
```

또는, 주소 범위의 줄을 삭제할 수 있습니다:

```
$ sed '2,3d' data4.txt
This is line number 1.
This is line number 4.
$
```

특수한 **end-of-file** 문자인 (`$`) 를 사용해 특정 줄부터 마지막 줄까지 삭제할 수 있습니다:

```
$ sed '3,$d' data4.txt
This is line number 1.
This is line number 2.
$
```

`sed` 편집기의 패턴 주소 또한 삭제 명령에 그대로 적용할 수 있습니다. 이를 통해, 특정 텍스트 패턴을 기준으로 줄을 삭제할 수 있습니다:

```
$ sed '/number 1/d' data4.txt
This is line number 2.
This is line number 3.
This is line number 4.
$
```

`sed` 편집기는 지정한 패턴과 일치한 텍스트를 포함한 줄을 삭제합니다.

> [!NOTE]
> `sed` 편집기는 **원본 파일을 절대 수정하지 않음** 을 항상 기억하시기 바랍니다. 삭제한 줄은 `sed` 편집기의 출력 결과에서만 사라진 것이며, 원본 파일엔 여전히 "삭제한" 줄이 그대로 남아 있습니다.

두 개의 텍스트 패턴을 쉼표 문자로 구분해 줄 범위를 삭제할 수 있습니다. 하지만, 이 방법을 사용할 때는 주의할 점이 있습니다. 

**첫 번째 패턴이 줄 삭제 기능을 켜고, 두 번째 패턴이 줄 삭제 기능을 끄는 역할을 합니다!!** 

`sed` 편집기는 두 패턴 사이의 모든 줄을 삭제하며 이때 **지정한 줄까지 포함** 됩니다.

```
$ sed '/1/,/3/d' data4.txt
This is line number 4.
$
```

`sed` 편집기는 데이터 스트림에서 삭제 명령의 시작 패턴을 감지하면, 삭제 기능이 "**켜지기**" 때문에 예상치 못한 결과가 발생할 수 있습니다:

```
$ cat data5.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
This is line number 1 again.
This is text you want to keep.
This is the last line in the file.
$
$ sed '/1/,/3/d' data5.txt
This is line number 4.
$
```

두 번째 "1" 패턴이 포함된 줄에서 삭제 명령을 켜고 데이터 스트림의 나머지 줄까지 삭제했습니다. 이것은 **정지 패턴이 제대로 인식되지 않아 발생한 문제** 입니다. 

또 다른 명백한 문제는 다음과 같이 텍스트에 **정지 패턴이 전혀 나타나지 않은 경우** 에도 발생할 수 있습니다.

```
$ sed '/1/,/5/d' data5.txt
$
```

첫 번째 패턴에서 삭제 기능이 "**켜졌지만**", 종료 패턴을 찾지 못했기 때문에 전체 데이터 스트림 모두를 삭제한 것입니다.

<br>

## Inserting and appending text
일반적인 대화형 편집기와 마찬가지로, `sed` 편집기는 **데이터 스트림에 텍스트 줄을 삽입하거나 추가** 할 수 있습니다. 

이 두 가지 텍스트 입력 명령은 다소 혼란스러울 수 있습니다:

- **삽입** `i` 명령 (*insert*) 은 지정한 줄 **앞에** 새로운 줄을 추가합니다.
- **추가** `a` 명령 (*append*) 은 지정한 줄 **뒤에** 새로운 줄을 추가합니다.

이 두 명령이 혼란스러운 이유는 사용 형식에 있습니다. 이 텍스트 입력 명령은 한 줄에 작성할 수 없을 수 있습니다. 텍스트를 삽입할 별도의 줄을 지정해야 합니다. 다음은 명령을 수행하는 형식입니다:

```
sed '[address]command\
new line'
```

새로운 줄에 포함된 텍스트는 `sed` 편집기 출력의 지정한 위치 앞이나 뒤에 나타납니다. 

삽입 `i` 명령을 사용하면 데이터 스트림 텍스트 **앞에** 나타난다는 점을 기억하시기 바랍니다:

```
$ echo "Test Line 2" | sed 'i\Test Line 1'
Test Line 1
Test Line 2
$
```

추가 `a` 명령을 사용하면 데이터 스트림 텍스트 **뒤에** 나타납니다:

```
$ echo "Test Line 2" | sed 'a\Test Line 1'
Test Line 2
Test Line 1
$
```

`sed` 편집기를 명령줄 인터페이스에서 사용할 때, 작은따옴표 문자를 입력하면 데이터를 입력할  **보조 프롬프트** 가 표시됩니다. 이 줄에 텍스트를 입력합니다. 
입력 종료를 의미하는 작은따옴표 문자를 입력하면 **bash** 셸은 명령을 처리합니다:

```
$ echo "Test Line 2" | sed 'i\
> Test Line 1'
Test Line 1
Test Line 2
$
```

단일라인 데이터 스트림의 텍스트 앞이나 뒤 라인에 텍스트를 추가하는 것은 잘 작동하지만, 멀티라인 데이터 스트림에 텍스트를 추가하려면 어떻게 처리해야 할까요?

멀티라인 데이터 스트림에 데이터를 삽입하거나 추가하려면, **주소 지정 방식** 을 사용해, `sed` 편집기에게 데이터가 입력될 위치를 알려줘야 합니다. 
또한, 이 명령을 사용할 경우 **단일 줄 주소** 만 지정할 수 있습니다!! 줄 번호나 텍스트 패턴 주소는 사용할 수 있지만, **범위 주소** 는 사용할 수 없습니다. 
왜냐하면, 한 줄 앞이나 뒤에만 텍스트를 삽입하거나 추가할 수 있기 때문에, 여러 줄에는 사용할 수 없다는 지극히 논리적인 이유입니다.

다음은 데이터 스트림에서 3번 줄 **앞에** 새로운 줄을 **삽입** 하는 예입니다:

```
$ cat data4.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
$
$ sed '3i\
> This is an inserted line.' data4.txt
This is line number 1.
This is line number 2.
This is an inserted line.
This is line number 3.
This is line number 4.
$
```

다음은 데이터 스트림에서 3번 줄 **뒤에** 새로운 줄을 **추가** 하는 예입니다:

```
$ cat data4.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
$
$ sed '3a\
> This is an appended line.' data4.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is an appended line.
This is line number 4.
$
```

이 명령은 삽입 명령과 동일한 프로세스로 처리되며, 단지 지정한 줄 번호 **뒤에** 새로운 텍스트를 추가합니다. 

멀티라인 데이터 스트림에서 데이터 스트림의 끝에 새로운 줄을 추가하려면, 달러 기호 (`$`) 를 사용하면 됩니다. 이것은 데이터의 **마지막 줄** 을 의미합니다:

```
$ cat data4.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
$
$ sed '$a\
> This is a new line of text.' data4.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
This is a new line of text.
$
```

멀티라인 데이터 스트림의 시작 부분에 새로운 줄을 추가하려면, **1번 줄** 앞에 새로운 줄을 삽입하면 됩니다.

만일, 단일 라인이 아닌 여러 줄의 텍스트를 삽입하거나 추가하려면, 새로운 텍스트 줄 뒤에 백슬래시 (`\`) 문자를 사용하고 마지막 텍스트 줄에 도달할 때까지 계속해야 합니다:

```
$ cat data4.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
$
$ sed '1i\
> This is one line of new text.\
> This is another line of new text.' data4.txt
This is one line of new text.
This is another line of new text.
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
$
```

위의 경우 두 줄 모두 데이터 스트림에 추가됩니다.

> [!TIP]
> 즉, 입력할 여러 줄 중 마지막 줄을 제외한 이전 줄까진 `\` 문자를 사용해 줄 바꿈 처리해야 합니다.

<br>

## Changing lines
**변경** `c` (*change*) 명령은 데이터 스트림의 텍스트 줄 내용을 변경할 수 있습니다. 이것은 텍스트 삽입 및 추가 명령과 동일하게 작동합니다. 

```
$ cat data4.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
$
$ sed '3c\
> This is a changed line of text.' data4.txt
This is line number 1.
This is line number 2.
This is a changed line of text.
This is line number 4.
$
```

`sed` 편집기는 3번 줄의 텍스트를 변경합니다. 또한, 텍스트 패턴을 주소로 사용할 수 있습니다:

```
$ cat data4.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
$
$ sed '/number 3/c\
> This is a changed line of text.' data4.txt
This is line number 1.
This is line number 2.
This is a changed line of text.
This is line number 4.
$
```

하지만, 텍스트 패턴 주소를 사용한 변경 명령은 데이터 스트림에 검색 일치한 **모든 텍스트 줄을 변경** 합니다:

```
$ cat data7.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
This is line number 1 again.
This is yet another line.
This is the last line in the file.
$
$ sed '/number 1/c\
> This is a changed line of text.' data7.txt
This is a changed line of text.
This is line number 2.
This is line number 3.
This is line number 4.
This is a changed line of text.
This is yet another line.
This is the last line in the file.
$
```

변경 명령에 주소 범위를 사용할 수 있겠지만, 실행 결과는 예상과 다를 수 있습니다:

```
cat data4.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
$
$ sed '2,3c\
> This is a new line of text.' data4.txt
This is line number 1.
This is a new line of text.
This is line number 4.
$
```

텍스트가 포함된 범위의 두 줄을 변경하므로, `sed` 편집기는 단일 텍스트 줄로 두 줄 모두를 교체합니다.

<br>

## Transforming characters
**변환** (*transform*, `y`) 명령은 `sed` 편집기에서 **단일 문자에 작동하는 유일한 명령** 입니다. 변환 명령은 다음과 같은 형식으로 사용합니다:

```
[address]y/in-chars/out-chars/
```

변환 명령은 `in-chars` 와 `out-chars` 값을 **일대일로 매핑** 합니다. `in-chars`의 첫 번째 문자는 `out-chars`의 첫 번째 문자로 변환되고, 두 번째 문자는 두 번째 문자로 변환됩니다. 
이런 매핑 작업은 지정한 문자 길이를 따라 계속됩니다. 만약, `in-chars`와 `out-chars` 의 길이가 같지 않다면, `sed` 편집기는 **오류 메시지** 를 생성합니다.

다음은 변환 명령을 사용하는 간단한 예입니다:

```
$ cat data7.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
This is line number 1 again.
This is yet another line.
This is the last line in the file.
$
$ sed 'y/123/789/' data7.txt
This is line number 7.
This is line number 8.
This is line number 9.
This is line number 4.
This is line number 7 again.
This is yet another line.
This is the last line in the file.
$
```

출력 결과로 알 수 있듯이, `in-chars` 패턴에 지정한 각각의 문자는 `out-chars` 패턴의 **같은 위치에 있는 문자로 교체** 되었습니다. 

또한, 변환 명령은 **전역 범위 명령** 입니다. 즉, 텍스트 라인에 발견된 **모든 문자를 자동으로 변환** 하며, 해당 문자가 몇 번째로 나타나는지엔 관계없이 처리됩니다.

```
$ echo "This 1 is a test of 1 try." | sed 'y/123/456/'
This 4 is a test of 4 try.
$
```

`sed` 편집기는 텍스트 라인에 일치한 문자인 `1` 의 두 인스턴스 모두를 `4` 로 변환했습니다. 따라서, 특정 위치만 변환 작업을 처리할 수 없습니다.


<br>

## Printing revisited
대체 명령 섹션에서 `p` 플래그를 사용해 `sed` 편집기가 **변경 작업을 처리한 라인만 표시하는 방법** 에 대해 살펴봤습니다. 

또한, 데이터 스트림에서 특정 정보를 출력하는 데 사용할 수 있는 다음과 같은 세 가지 명령이 있습니다:

| command | description |
| --- | --- |
| `p` | 텍스트 라인 출력 | 
| `=` | 텍스트 라인 번호 출력 |
| `l` (소문자 L) | 라인 목록 출력 |

다음 섹션에 세 가지 출력 명령을 `sed` 편집기에서 사용하는 방법에 대해 다룹니다.

<br>

### Printing lines
대체 명령의 `p` 플래그와 마찬가지로, `p` 명령은 `sed` 편집기 출력에 지정한 라인을 출력합니다. 이 명령은 단독으로 사용할 경우엔 특별한 기능을 제공하지 않습니다:

```
$ echo "this is a test" | sed 'p'
this is a test
this is a test
$
```

이 명령은 이미 존재하는 데이터를 그저 중복 출력하는 것에 불과합니다. 

`p` 명령의 가장 일반적인 사용 용도는 텍스트 패턴과 검색 일치한 **텍스트가 포함된 라인만 출력** 하는 것입니다:

```
$ cat data4.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
$
$ sed -n '/number 3/p' data4.txt
This is line number 3.
$
```

`sed` 편집기의 옵션으로 `-n` 을 사용하면 모든 라인의 출력은 억제하고 텍스트 패턴이 포함된 라인만 출력할 수 있습니다. 

또한, 스트림의 일부 라인만 빠르게 출력하는 방법으로 사용할 수 있습니다:

```
$ sed -n '2,3p' data4.txt
This is line number 2.
This is line number 3.
$
```

`p` 명령은 `s` 또는 `c` 명령으로 텍스트를 변경하기 직전에 해당 라인을 확인할 용도로 사용할 수 있습니다. 명령으로 변경하기 직전의 라인을 표시하는 다음과 같은 스크립트를 생성할 수 있습니다:

```
$ sed -n '/3/{
> p
> s/line/test/p
> }' data4.txt
This is line number 3.
This is test number 3.
$
```

위의 `sed` 편집기 명령은 숫자 "3" 을 포함한 라인을 검색한 후 두 개의 그룹 명령을 실행합니다. 스크립트는 `p` 명령을 사용해 원본 버전의 라인을 출력합니다. 
그런 다음, `s` 명령을 사용해 텍스트를 대체하고, 대체 명령의 `p` 플래그를 사용해 결과 텍스트를 출력합니다. 따라서, 출력에는 **원본 라인 텍스트와 새로운 라인 텍스트가 모두 표시** 됩니다.

<br>

### Printing line numbers
등호 `=` (*equal*) 명령은 데이터 스트림의 **라인 번호를 출력** 합니다. 라인 번호는 데이터 스트림에 **줄 바꿈 문자** (*newline character*) 를 사용하면 결정됩니다. 
즉, 줄 바꿈 문자가 데이터 스트림에 나타날 때마다, `sed` 편집기는 해당 문자가 **텍스트 라인의 끝을 의미한다** 고 가정합니다.

```
$ cat data1.txt
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
$
$ sed '=' data1.txt
1
The quick brown fox jumps over the lazy dog.
2
The quick brown fox jumps over the lazy dog.
3
The quick brown fox jumps over the lazy dog.
4
The quick brown fox jumps over the lazy dog.
$
```

`sed` 편집기는 원본 텍스트 라인 앞 라인에 라인 번호를 출력합니다. 등호 `=` 명령은 데이터 스트림에서 특정 텍스트 패턴만 검색할 때 유용합니다:

```
$ sed -n '/number 4/{
> =
> p
> }' data4.txt
4
This is line number 4.
$
```

이때 `-n` 옵션을 함께 사용하면, `sed` 편집기는 텍스트 패턴을 포함한 라인 번호와 원본 텍스트 모두를 함께 표시하도록 처리할 수 있습니다.

<br>

### Listing lines
목록 `l` (*list*) 명령은 데이터 스트림에서 텍스트와 **비가시적 문자까지 출력** 할 수 있습니다. 

**비가시적 문자는 8진수 값으로 표시** 되며, 백슬래시 문자가 앞에 붙거나 또는 탭 문자 같은 비가시적 문자는 C언어 스타일의 명명법인 `\t` 같은 형식으로 표시됩니다.

```
$ cat data9.txt
This          line          contains          tabs.
$
$ sed -n 'l' data9.txt
This\tline\tcontains\ttabs.$
$
```

탭 문자는 `\t` 명명법으로 표시됩니다. 줄 끝을 의미하는 달러 `$` 기호는 **줄 바꿈 문자를 의미** 합니다. 

만약, 데이터 스트림에 제어 문자가 포함되어 있다면, `l` 명령은 필요할 경우 **8진수 코드** 형태로 표시합니다.

```
$ cat data10.txt
This line contains an escape character.
$
$ sed -n 'l' data10.txt
This line contains an escape character. \a$
$
```

*data10.txt* 파일에는 벨 소리를 발생시키는 `\a` (*alert*) 제어 문자가 포함되어 있습니다. `cat` 명령을 사용해 해당 텍스트 파일을 화면에 표시할 때, 제어 문자는 화면에 보이진 않고 소리만 들리게 됩니다. (스피커가 켜져 있을 경우) 하지만, `l` 명령을 사용하면 제어 문자를 화면에 표시할 수 있습니다.

<br>

## Using files with sed
대체 명령에는 파일 작업을 처리하는 `w` 플래그가 포함되어 있습니다. 하지만, 텍스트를 대체하지 않고서도 파일 작업을 처리할 수 있는 `sed` 편집기 명령이 존재합니다.

<br>

### Writing to a file
저장 `w` (*write*) 명령은 파일에 줄의 내용을 저장합니다. `w` 명령의 형식은 다음과 같습니다:

```
[address]w filename
```

`filename` 은 상대 경로 또는 절대 경로 형태로 지정할 수 있지만, 어떤 경우든 `sed` 편집기를 실행하는 사용자는 해당 파일에 대한 **쓰기 권한** 을 가지고 있어야만 합니다. 
주소는 `sed` 에 사용하는 **모든 종류의 주소 지정 방법을 사용** 할 수 있습니다. 예를 들어, **단일 줄 번호**, **단일 텍스트 패턴**, 또는 **줄 번호 범위** 나 **텍스트 패턴 범위** 등이 있습니다.

다음은 데이터 스트림의 첫 번째 두 줄만 파일로 출력 (저장) 하는 예입니다:

```
$ sed '1,2w test.txt' data4.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
$
$ cat test.txt
This is line number 1.
This is line number 2.
$
```

> [!NOTE]
> 물론, 기본 출력이 `STDOUT` 에 표시되지 않기를 원한다면, `sed` 에 `-n` 옵션을 사용할 수 있습니다.  

마스터 파일에 공통으로 사용된 텍스트 값을 기준으로 파일을 생성할 때 매우 유용한 도구입니다. 예를 들어, 메일링 리스트의 경우, 텍스트 값을 기준으로 새로운 파일을 만들 수 있습니다.

```
$ cat data10.txt
Blum, R Browncoat
McGuiness, A Alliance
Bresnahan, C Browncoat
Harken, C Alliance
$
$ sed -n '/Browncoat/w Browncoats.txt' data10.txt
$
$ cat Browncoats.txt
Blum, R Browncoat
Bresnahan, C Browncoat
$
```

`sed` 편집기는 텍스트 패턴을 포함한 데이터 라인만 파일에 저장합니다.

<br>

### Reading data from a file
`sed` 명령으로 데이터를 삽입하거나 추가하는 방법에 대해서는 이미 학습했습니다. 읽기 `r` (*read*) 명령은 별도의 파일에 포함된 데이터를 데이터 스트림에 삽입할 수 있게 해줍니다. 

`r` 명령의 형식은 다음과 같습니다:

```
[address]r filename
```

`filename` 매개변수는 데이터를 포함한 파일의 절대 경로 또는 상대 경로를 지정합니다. 하지만, **r 명령은 주소 범위는 사용할 수 없습니다.** 
단일 라인 번호나 텍스트 패턴 주소만 지정할 수 있습니다. `sed` 편집기는 지정한 주소 **이후에** 파일의 텍스트를 삽입합니다.

```
$ cat data11.txt
This is an added line.
This is the second added line.
$
$ sed '3r data11.txt' data4.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is an added line.
This is the second added line.
This is line number 4.
$
```

sed 편집기는 데이터 파일의 모든 텍스트 라인을 데이터 스트림에 삽입합니다. 텍스트 패턴 주소로 삽입할 때도 동일하게 처리됩니다:

```
$ sed '/number 2/r data11.txt' data4.txt
This is line number 1.
This is line number 2.
This is an added line.
This is the second added line.
This is line number 3.
This is line number 4.
$
```

데이터 스트림의 끝에 텍스트를 추가하려면 달러 기호 주소 기호를 사용하면 됩니다:

```
$ sed '$r data11.txt' data4.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
This is an added line.
This is the second added line.
$
```

`r` 명령의 멋진 활용법은 삭제 명령을 활용해 파일의 **자리 표시자** 를 다른 파일의 데이터를 읽어와 교체하는 것입니다. 예를 들어, 다음과 같은 형식의 텍스트 파일이 있다고 가정하겠습니다:

```
$ cat notice.std
Would the following people:
LIST
please report to the ship's captain.
$
```

*notice.std* 파일에는 이름 목록 대신 일반적인 자리 표시자인 *LIST* 문자열을 사용합니다. 자리 표시자 뒤에 실제 이름 목록을 읽어와 삽입하려면 `r` 명령을 사용합니다. 
하지만, 이렇게 처리해도 출력엔 여전히 자리 표시자 문자열이 그대로 남아있습니다. 이를 제거하려면 `d` 명령을 사용하면 됩니다. 다음과 같이 처리합니다:

```
$ sed '/LIST/{
> r data10.txt
> d
> }' notice.std
Would the following people:
Blum, R Browncoat
McGuiness, A Alliance
Bresnahan, C Browncoat
Harken, C Alliance
please report to the ship's captain.
$
```

이제 자리 표시자 `LIST` 문자열은 외부의 데이터 파일의 이름 목록으로 교체되었습니다.



# Summary
셸 스크립트로 수많은 작업을 처리할 수 있겠지만, 데이터를 세밀하게 조작한다는 것은 어려울 수 있습니다. `Linux` 는 텍스트 데이터를 처리하는 데 도움을 줄 수 있는 유용한 유틸리티를 제공합니다. 
그 중 `sed` 편집기는 데이터를 읽어 실시간으로 빠르게 편집할 수 있는 스트림 편집기 프로그램입니다. `sed` 편집기는 데이터를 처리할 수 있는 유용한 편집 명령을 제공합니다. 



