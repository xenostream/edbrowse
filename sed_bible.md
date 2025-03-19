# SED Bible 

# Getting to know the sed editor
**sed** 편집기는 일반적인 대화형 텍스트 편집기와는 달리 스트림 편집기(stream editor)라고 불립니다. 대화형 텍스트 편집기, 예를 들어 **vim**에서는 키보드 명령어를 사용하여 데이터를 대화식으로 삽입, 삭제 또는 교체합니다. 
반면, 스트림 편집기는 데이터를 처리하기 전에 미리 제공한 규칙을 바탕으로 데이터 스트림을 편집합니다.

**sed** 편집기는 `명령어` 를 명령줄에 입력하거나 `명령 텍스트 파일` 에 저장해 데이터 스트림에서 데이터를 조작할 수 있습니다. **sed** 편집기는 다음과 같은 작업을 수행합니다: 

1. 입력에서 한 줄씩 데이터를 읽습니다.  
2. 해당 데이터를 제공된 편집 명령어와 비교해 일치시킵니다.  
3. 명령에 지정한 대로 스트림의 데이터를 변경합니다.  
4. 변경된 데이터를 **STDOUT** 에 출력합니다.

스트림 편집기가 데이터의 한 줄에 대해 모든 명령을 적용한 후, 다음 데이터 줄을 읽고 그 과정을 반복합니다. 스트림 편집기가 스트림 내의 모든 데이터 줄을 처리하면, 작업을 종료합니다.

명령어는 한 줄씩 순차적으로 적용되기 때문에, **sed** 편집기는 데이터를 편집하기 위해 한 번만 데이터 스트림을 통과합니다. 이로 인해 **sed** 편집기는 대화형 편집기보다 훨씬 빠르며, 파일 내 데이터를 실시간으로 빠르게 수정할 수 있게 해줍니다.

**sed** 명령어를 사용하는 형식은 다음과 같습니다:

```
sed options script file
```

**options** 매개변수는 **sed** 명령어의 동작을 사용자 맞춤화할 수 있게 해주며, 이에 대한 옵션들은 **표 19-1**에 나와 있습니다.

| 옵션 | 설명 |
| ---  | ---  |
| -e script | 입력을 처리하는 동안 실행할 명령에 스크립트에 지정한 명령을 추가합니다. |
| -f file   | 파일에 지정한 명령을 입력을 처리하는 동안 실행되는 명령에 추가합니다. |
| -n        | 각 명령에 대해 출력을 생성하지 않고, **print** 명령을 기다립니다. |

**script** 매개변수는 스트림 데이터에 적용할 단일 명령을 지정합니다. 여러 명령이 필요한 경우, **-e** 옵션을 사용하여 명령줄에 명령들을 지정하거나, **-f** 옵션을 사용해 별도의 파일에 명령들을 지정해야 합니다. 
데이터를 조작하는 데 사용할 수 있는 다양한 명령이 있으며, 이번 장에서는 **sed** 편집기에서 사용하는 `기본 명령` 들을 살펴보고, 21장에서 더 고급 명령들을 다룰 것입니다.

## Defining an editor command in the command line
기본적으로 **sed** 편집기는 지정된 명령을 **STDIN** 입력 스트림에 적용합니다. 이를 통해 데이터를 직접 **sed** 편집기로 파이프하여 처리할 수 있습니다. 다음은 이를 수행하는 방법을 보여주는 간단한 예입니다:

```
$ echo "This is a test" | sed 's/test/big test/'
This is a big test
$
```
이 예제에서는 **sed** 편집기의 **s** 대체 명령어를 사용합니다. **s** 명령어는 첫 번째 텍스트 문자열 패턴을 지정된 두 번째 텍스트 문자열로 대체합니다. 이 예제에서는 **test** 라는 단어가 **big test** 로 대체되었습니다.  

이 예제를 실행하면 결과는 즉시 화면에 표시됩니다. 이것이 바로 **sed** 편집기를 사용하는 장점입니다. **sed** 편집기를 사용하면, 일부 대화형 편집기가 시작되는 데 걸리는 시간과 비슷한 시간 안에 데이터를 여러 번 수정할 수 있습니다.  

물론, 이 간단한 테스트는 한 줄의 데이터만 수정한 것입니다. 전체 파일을 편집할 때도 같은 속도의 결과를 얻을 수 있습니다:

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

**sed** 명령어는 실행 후 거의 즉시 데이터를 반환합니다. 데이터를 처리하는 각 줄에 대해 결과가 표시되며, **sed** 편집기가 전체 파일을 처리하기 전에 결과를 먼저 살펴볼 수 있습니다.

중요한 점은 **sed** 편집기가 텍스트 파일 자체의 데이터는 수정하지 않는다는 것입니다. 수정된 텍스트는 **STDOUT**으로만 출력됩니다. 텍스트 파일을 확인해 보면, 여전히 원본 데이터가 그대로 포함되어 있다는 것을 알 수 있습니다.

```
$ cat data1.txt
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
$
```

## Using multiple editor commands in the command line
**sed** 명령줄에서 여러 명령을 실행하려면 **-e** 옵션을 사용하면 됩니다.

```
$ sed -e 's/brown/green/; s/dog/cat/' data1.txt
The quick green fox jumps over the lazy cat.
The quick green fox jumps over the lazy cat.
The quick green fox jumps over the lazy cat.
The quick green fox jumps over the lazy cat.
$
```

두 명령은 파일의 각 데이터 줄에 적용됩니다. 명령은 세미콜론으로 구분해야 하며, 명령 끝과 세미콜론 사이에 공백이 없어야 합니다.  

세미콜론 대신, **bash** 쉘에서 보조 프롬프트를 사용할 수 있습니다. 첫 번째 작은따옴표를 입력하여 **sed** 프로그램 스크립트(즉, **sed** 편집기 명령 목록)를 열면, **bash**는 닫는 따옴표를 입력할 때까지 추가 명령을 계속 요청합니다.

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

닫는 작은따옴표가 나타나는 동일한 줄에서 명령을 마무리해야 합니다. **bash** 쉘은 닫는 따옴표를 감지한 후 명령을 처리합니다. 명령을 시작하면, **sed** 명령은 지정한 각 명령을 텍스트 파일의 각 데이터 줄에 적용합니다.


## Reading editor commands from a file
마지막으로, 처리할 **sed** 명령이 많이 있을 경우, 이를 별도의 파일에 저장하는 것이 더 쉬울 때가 많습니다. 이 경우, **-f** 옵션을 사용하여 **sed** 명령에서 파일을 지정할 수 있습니다.

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

이 경우, 각 명령 뒤에 세미콜론을 넣을 필요가 없습니다. **sed** 편집기는 각 줄이 별도의 명령을 포함하고 있다는 것을 알고 있습니다. 명령줄에서 명령을 입력하는 것과 마찬가지로, 
**sed** 편집기는 지정된 파일에서 명령을 읽고 이를 데이터 파일의 각 줄에 적용합니다.

> [!TIP]
> **sed** 편집기 스크립트 파일을 **bash** 쉘 스크립트 파일과 혼동하기 쉬울 수 있습니다. 혼란을 피하려면 **sed** 스크립트 파일에 **.sed** 파일 확장자를 사용하는 것이 좋습니다.

"Commanding at the sed Editor Basics" 섹션에서 데이터를 조작하는 데 유용한 몇 가지 다른 **sed** 편집기 명령을 살펴보겠습니다. 



# Commanding at the sed Editor Basics
**sed** 편집기를 성공적으로 사용하려면 그 수많은 명령어와 형식을 이해하는 것이 중요합니다. 이러한 명령어와 형식은 텍스트 편집을 사용자 맞춤화하는 데 도움이 됩니다. 
이 섹션에서는 **sed** 편집기를 사용하기 시작할 때 스크립트에 포함할 수 있는 몇 가지 기본 명령어와 기능을 설명합니다.


## Introducing more substitution options
이미 **s** 명령어를 사용하여 한 줄의 텍스트를 새 텍스트로 대체하는 방법을 보았습니다. 하지만 **substitute** 명령에는 추가적인 몇 가지 옵션이 있어, 이를 활용하면 더 쉽게 작업을 할 수 있습니다.

### Substituting flags
**substitute** 명령어가 텍스트 문자열에서 일치하는 패턴을 대체하는 방식에는 주의할 점이 있습니다. 다음 예제를 통해 무슨 일이 일어나는지 살펴보세요:

```
$ cat data4.txt
This is a test of the test script.
This is the second test of the test script.
$
$ sed 's/test/trial/' data4.txt
This is a trial of the test script.
This is the second trial of the test script.
$
```

**substitute** 명령어는 여러 줄에서 텍스트를 대체하는 데 잘 작동하지만, 기본적으로 각 줄에서 첫 번째 발생만 대체합니다. 
텍스트의 다른 발생 부분도 대체하려면 **substitute** 명령어에 **substitution flag**를 사용해야 합니다. 이 플래그는 **substitution** 명령어 문자열 뒤에 설정됩니다.

```
s/pattern/replacement/flags
```

다음은 **substitute** 명령어에 사용할 수 있는 네 가지 유형의 `substitution flag` 입니다:

- **숫자**: 패턴이 나타나는 특정 발생 위치를 지정하여, 해당 위치에 새로운 텍스트를 대체합니다.
- **g**: 기존 텍스트의 모든 발생에 대해 새로운 텍스트를 대체합니다.
- **p**: 원본 줄의 내용을 출력합니다.
- **w file**: 대체된 결과를 지정된 파일에 기록합니다.

첫 번째 유형의 **substitution** 에서는 **sed** 편집기가 일치하는 패턴 중 어떤 발생에 대해 새로운 텍스트를 대체할지 지정할 수 있습니다. 예를 들어, 숫자를 사용하여 특정 발생을 지정하면 그 위치에만 새로운 텍스트가 대체됩니다.

```
$ sed 's/test/trial/2' data4.txt
This is a test of the trial script.
This is the second test of the trial script.
$
```

**substitution flag** 로 **2** 를 지정하면, **sed** 편집기는 각 줄에서 두 번째 발생에만 패턴을 대체합니다. 반면, **g** 플래그는 텍스트에서 패턴이 나타나는 모든 발생을 대체할 수 있게 해줍니다.

```
$ sed 's/test/trial/g' data4.txt
This is a trial of the trial script.
This is the second trial of the trial script.
$
```

**p** **substitution flag**는 **substitute** 명령에서 일치하는 패턴이 포함된 줄을 출력합니다. 이 플래그는 주로 **-n** **sed** 옵션과 함께 사용됩니다. 
**-n** 옵션은 기본적으로 출력을 억제하고, **p** 플래그가 있는 경우에만 변경된 줄을 출력합니다.

```
$ cat data5.txt
This is a test line.
This is a different line.
$
$ sed -n 's/test/trial/p' data5.txt
This is a trial line.
$
```

**-n** 옵션은 **sed** 편집기에서 출력을 억제합니다. 그러나 **p** **substitution flag**는 수정된 모든 줄을 출력합니다. 
이 두 가지를 조합하여 사용하면, **substitute** 명령으로 수정된 줄에 대해서만 출력을 생성할 수 있습니다.

**w** **substitution flag**는 수정된 결과를 출력하는 것과 동일한 결과를 생성하지만, 출력 내용을 지정된 파일에 저장합니다.

```
$ sed 's/test/trial/w test.txt' data5.txt
This is a trial line.
This is a different line.
$
$ cat test.txt
This is a trial line.
$
```

**sed** 편집기의 일반 출력은 **STDOUT**에 나타나지만, 일치하는 패턴을 포함하는 줄만 지정된 출력 파일에 저장됩니다.


### Replacing characters
때때로, 텍스트 문자열에서 대체 패턴으로 사용하기 어려운 문자가 있을 수 있습니다. **Linux** 세계에서 대표적인 예는 슬래시 (**/**)입니다. 
파일 내에서 경로 이름을 대체하는 것은 번거로울 수 있습니다. 예를 들어, **/etc/passwd** 파일에서 **C shell**을 **bash shell**로 대체하고자 할 때, 이렇게 해야 합니다:

```
$ sed 's/\/bin\/bash/\/bin\/csh/' /etc/passwd
```

슬래시(**/**)는 문자열 구분자로 사용되므로, 패턴 텍스트에 슬래시가 포함되면 이를 이스케이프하기 위해 백슬래시(**\**)를 사용해야 합니다. 이로 인해 혼동이나 실수가 발생할 수 있습니다. 
이 문제를 해결하기 위해, **sed** 편집기는 **substitute** 명령에서 문자열 구분자로 다른 문자를 선택할 수 있도록 허용합니다.

```
$ sed 's!/bin/bash!/bin/csh!' /etc/passwd
```

이 예제에서는 문자열 구분자로 느낌표(**!**)를 사용하여 경로 이름을 훨씬 더 읽기 쉽고 이해하기 쉽게 만듭니다.



## Using addresses
기본적으로 **sed** 편집기에서 사용하는 명령은 텍스트 데이터의 모든 줄에 적용됩니다. 특정 줄이나 여러 줄에만 명령을 적용하려면, 줄 주소 지정(line addressing)을 사용해야 합니다. 

**sed** 편집기에는 두 가지 형태의 줄 주소 지정 방법이 있습니다:

- **숫자 범위**: 특정 줄 범위를 지정하여 명령을 적용합니다.
- **텍스트 패턴**: 텍스트 패턴을 사용하여 해당 패턴이 포함된 줄을 필터링하여 명령을 적용합니다.

두 가지 형태 모두 주소를 지정할 때 동일한 형식을 사용합니다:

```
[address]command
```

특정 주소에 대해 여러 명령을 그룹화하여 함께 사용할 수도 있습니다:

```
address {
    command1
    command2
    command3
}
```

**sed** 편집기는 지정한 명령을 주소가 일치하는 줄에만 적용합니다. 이 섹션에서는 **sed** 편집기 스크립트에서 이 두 가지 주소 지정 기법을 사용하는 방법을 설명합니다.


### Addressing the numeric line
숫자 줄 주소 지정을 사용할 때, 텍스트 스트림에서 줄 번호를 기준으로 참조합니다. **sed** 편집기는 텍스트 스트림의 첫 번째 줄을 1번 줄로 지정하고, 이후 각 줄에 대해 순차적으로 번호를 매깁니다.  
명령에서 지정하는 주소는 단일 줄 번호일 수도 있고, 시작 줄 번호와 끝 줄 번호 사이에 쉼표를 사용하여 범위로 지정할 수도 있습니다. 아래는 **sed** 명령이 적용될 줄 번호를 지정하는 예입니다:

```
$ sed '2s/dog/cat/' data1.txt
The quick brown fox jumps over the lazy dog
The quick brown fox jumps over the lazy cat
The quick brown fox jumps over the lazy dog
The quick brown fox jumps over the lazy dog
$
```

**sed** 편집기는 지정된 주소에 따라 두 번째 줄만 수정했습니다. 이번에는 줄 주소 범위를 사용한 예제를 살펴보겠습니다:

```
$ sed '2,3s/dog/cat/' data1.txt
The quick brown fox jumps over the lazy dog
The quick brown fox jumps over the lazy cat
The quick brown fox jumps over the lazy cat
The quick brown fox jumps over the lazy dog
$
```

텍스트 내에서 특정 지점부터 시작하여 텍스트의 끝까지 명령을 적용하려면, 특수 주소인 달러 기호(**$**)를 사용할 수 있습니다:

```
$ sed '2,$s/dog/cat/' data1.txt
The quick brown fox jumps over the lazy dog
The quick brown fox jumps over the lazy cat
The quick brown fox jumps over the lazy cat
The quick brown fox jumps over the lazy cat
$
```

텍스트에 몇 줄의 데이터가 있는지 알 수 없기 때문에, 달러 기호(**$**)는 매우 유용하게 사용됩니다.


### Using text pattern filters
명령이 적용될 줄을 제한하는 또 다른 방법은 조금 더 복잡합니다. **sed** 편집기는 명령을 적용할 줄을 필터링하기 위해 텍스트 패턴을 지정할 수 있습니다. 그 형식은 다음과 같습니다:

```
/pattern/command
```

지정한 패턴은 슬래시(/)로 감싸야 합니다. **sed** 편집기는 지정한 텍스트 패턴을 포함하는 줄에만 명령을 적용합니다.  

예를 들어, **Samantha** 사용자만을 위한 기본 셸을 변경하려면 다음과 같은 **sed** 명령을 사용할 수 있습니다:

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

이 명령은 일치하는 텍스트 패턴이 있는 줄에만 적용되었습니다. 고정된 텍스트 패턴을 사용하면 특정 값을 필터링하는 데 유용할 수 있지만, 그 사용에 있어 다소 제한적입니다. 
**sed** 편집기는 **정규 표현식(regular expressions)**이라는 기능을 사용하여 더 복잡한 패턴을 생성할 수 있습니다. 

정규 표현식은 다양한 데이터에 일치하는 고급 텍스트 패턴을 만들 수 있게 해줍니다. 이 표현식은 와일드카드 문자, 특수 문자 및 고정 텍스트 문자를 결합하여 거의 모든 텍스트 상황에 맞는 간결한 패턴을 생성할 수 있습니다. 
정규 표현식은 쉘 스크립트 프로그래밍에서 가장 어려운 부분 중 하나이며, **20장**에서 자세히 다룹니다.


### Grouping commands
개별 줄에 여러 명령을 수행해야 할 경우, 중괄호를 사용하여 명령을 그룹화할 수 있습니다. **sed** 편집기는 주소 줄에서 나열된 각 명령을 처리합니다:

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

두 명령 모두 주소에 대해 처리됩니다. 물론, 그룹화된 명령 앞에 주소 범위를 지정할 수도 있습니다:

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

**sed** 편집기는 주소 범위 내 모든 줄에 대해 모든 명령을 적용합니다.


## Deleting lines
**sed** 편집기에서 텍스트 대체 명령만 있는 것이 아닙니다. 텍스트 스트림에서 특정 줄을 삭제해야 하는 경우, **삭제 명령(delete command)**인 **d**를 사용할 수 있습니다. 

**d** 명령은 문자 그대로 동작하여, 지정된 주소 체계에 일치하는 모든 텍스트 줄을 삭제합니다. **삭제 명령**을 사용할 때는 주소 체계를 포함하는 것을 잊지 않아야 합니다. 
만약 주소 체계를 포함하지 않으면, 스트림의 모든 줄이 삭제될 수 있습니다.

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

**삭제 명령(delete command)**은 명확히 지정된 주소와 함께 사용할 때 가장 유용합니다. 이를 통해 줄 번호를 기준으로 데이터 스트림에서 특정 텍스트 줄을 삭제할 수 있습니다:

```
$ cat data6.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
$
$ sed '3d' data6.txt
This is line number 1.
This is line number 2.
This is line number 4.
$
```

또는 특정 범위의 줄을 기준으로 삭제할 수도 있습니다:

```
$ sed '2,3d' data6.txt
This is line number 1.
This is line number 4.
$
```

또는 특수한 **끝-of-파일** 문자(**$**)를 사용하여 삭제할 수도 있습니다:

```
$ sed '3,$d' data6.txt
This is line number 1.
This is line number 2.
$
```

**sed** 편집기의 패턴 매칭 기능은 **삭제 명령(delete command)**에도 적용됩니다. 이를 통해 특정 텍스트 패턴을 기준으로 줄을 삭제할 수 있습니다:

```
$ sed '/number 1/d' data6.txt
This is line number 2.
This is line number 3.
This is line number 4.
$
```

**sed** 편집기는 지정한 패턴과 일치하는 텍스트를 포함하는 줄을 삭제합니다.

> [!NOTE]
> **sed** 편집기는 원본 파일을 수정하지 않음을 기억하세요. 삭제한 줄은 **sed** 편집기의 출력에서만 사라지며, 원본 파일에는 여전히 "삭제된" 줄이 남아 있습니다.

두 개의 텍스트 패턴을 사용하여 줄 범위를 삭제할 수도 있습니다. 하지만 이 방법을 사용할 때는 주의해야 합니다. 지정한 첫 번째 패턴이 줄 삭제를 "켜고," 두 번째 패턴이 줄 삭제를 "끄는" 역할을 합니다. 
**sed** 편집기는 두 패턴 사이의 모든 줄을 삭제하며, 지정된 줄도 포함됩니다.

```
$ sed '/1/,/3/d' data6.txt
This is line number 4.
$
```

또한, **sed** 편집기는 데이터 스트림에서 시작 패턴을 감지하면 삭제 기능이 "켜지기" 때문에 주의해야 합니다. 이로 인해 예상치 못한 결과가 발생할 수 있습니다:

```
$ cat data7.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
This is line number 1 again.
This is text you want to keep.
This is the last line in the file.
$
$ sed '/1/,/3/d' data7.txt
This is line number 4.
$
```

두 번째로 "1"이 포함된 줄이 삭제 명령을 다시 트리거하여 데이터 스트림의 나머지 줄들이 삭제되었습니다. 이는 정지 패턴이 인식되지 않아서 발생한 문제입니다. 
물론, 다른 명백한 문제는 텍스트에서 정지 패턴이 전혀 나타나지 않는 경우 발생합니다.

```
$ sed '/1/,/5/d' data7.txt
$
```

첫 번째 패턴 일치에서 삭제 기능이 "켜졌지만", 종료 패턴 일치는 찾지 못했기 때문에 전체 데이터 스트림이 삭제된 것입니다.



## Inserting and appending text
예상대로, 다른 편집기들과 마찬가지로 **sed** 편집기도 데이터 스트림에 텍스트 줄을 삽입하거나 추가할 수 있습니다. 이 두 작업의 차이는 다소 혼란스러울 수 있습니다:

- **삽입 명령(insert command, `i`)**은 지정된 줄 **앞**에 새 줄을 추가합니다.
- **추가 명령(append command, `a`)**은 지정된 줄 **뒤**에 새 줄을 추가합니다.

이 두 명령이 혼란스러운 이유는 형식에 있습니다. 이 명령들을 한 줄에 작성할 수 없습니다. 삽입하거나 추가할 줄을 지정하는 별도의 줄을 작성해야 합니다. 다음은 이를 수행하는 형식입니다:

```
sed '[address]command\
new line'
```

새로운 줄에 있는 텍스트는 **sed** 편집기 출력에서 지정한 위치에 나타납니다. **삽입 명령(insert command)**을 사용할 때는 텍스트가 데이터 스트림 텍스트 **앞**에 나타난다는 점을 기억하세요:

```
$ echo "Test Line 2" | sed 'i\Test Line 1'
Test Line 1
Test Line 2
$
```

**추가 명령(append command)**을 사용할 때는 텍스트가 데이터 스트림 텍스트 **뒤**에 나타납니다:

```
$ echo "Test Line 2" | sed 'a\Test Line 1'
Test Line 2
Test Line 1
$
```

**sed** 편집기를 명령줄 인터페이스에서 사용할 때, 새로운 데이터 줄을 입력하기 위해 보조 프롬프트가 나타납니다. 이 줄에서 **sed** 편집기 명령을 완성해야 합니다. 종료 작은따옴표를 입력한 후, **bash** 셸이 명령을 처리합니다:

```
$ echo "Test Line 2" | sed 'i\
> Test Line 1'
Test Line 1
Test Line 2
$
```

데이터 스트림의 텍스트 앞이나 뒤에 텍스트를 추가하는 것은 잘 작동하지만, 데이터 스트림 내부에 텍스트를 추가하려면 어떻게 해야 할까요?

데이터 스트림의 줄 내부에 데이터를 삽입하거나 추가하려면, **주소 지정**을 사용하여 **sed** 편집기에게 데이터가 나타날 위치를 알려야 합니다. 이 명령을 사용할 때는 **단일 줄 주소**만 지정할 수 있습니다. 
숫자 줄 번호나 텍스트 패턴을 사용할 수 있지만, **주소 범위**는 사용할 수 없습니다. 이는 한 줄 앞이나 뒤에만 삽입하거나 추가할 수 있기 때문에, 여러 줄에 대해서는 사용할 수 없는 논리적인 이유입니다.

다음은 데이터 스트림에서 3번 줄 앞에 새 줄을 삽입하는 예입니다:

```
$ sed '3i\
> This is an inserted line.' data6.txt
This is line number 1.
This is line number 2.
This is an inserted line.
This is line number 3.
This is line number 4.
$
```

다음은 데이터 스트림에서 3번 줄 뒤에 새 줄을 추가하는 예입니다:

```
$ sed '3a\
> This is an appended line.' data6.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is an appended line.
This is line number 4.
$
```

이것은 **삽입 명령(insert command)**과 동일한 프로세스를 사용하며, 단지 지정한 줄 번호 뒤에 새로운 텍스트 줄을 추가합니다. 
멀티라인 데이터 스트림에서 데이터 스트림의 끝에 새 줄을 추가하려면, **달러 기호($)**를 사용하면 됩니다. 이는 데이터의 마지막 줄을 나타냅니다:

```
$ sed '$a\
> This is a new line of text.' data6.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
This is a new line of text.
$
```

데이터 스트림의 시작 부분에 새 줄을 추가하려면, **1번 줄** 앞에 새 줄을 삽입하면 됩니다.

여러 줄의 텍스트를 삽입하거나 추가하려면, **새 텍스트의 각 줄 앞에 백슬래시(\\)**를 사용하여 마지막 텍스트 줄에 도달할 때까지 계속해야 합니다:

```
$ sed '1i\
> This is one line of new text.\
> This is another line of new text.' data6.txt
This is one line of new text.
This is another line of new text.
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
$
```

지정된 두 줄 모두 데이터 스트림에 추가됩니다.


## Changing lines
**변경(change) 명령**은 데이터 스트림의 전체 텍스트 줄 내용을 변경할 수 있습니다. 이는 **삽입(insert)** 및 **추가(append)** 명령과 동일하게 작동하며, 새 줄을 나머지 **sed 명령**과 별도로 지정해야 합니다.

```
$ sed '3c\
> This is a changed line of text.' data6.txt
This is line number 1.
This is line number 2.
This is a changed line of text.
This is line number 4.
$
```

이 예제에서는 **sed 편집기**가 3번 줄의 텍스트를 변경합니다. 또한 주소로 **텍스트 패턴**을 사용할 수도 있습니다:

```
$ sed '/number 3/c\
> This is a changed line of text.' data6.txt
This is line number 1.
This is line number 2.
This is a changed line of text.
This is line number 4.
$
```

**텍스트 패턴** 변경 명령은 데이터 스트림에서 일치하는 모든 텍스트 줄을 변경합니다:

```
$ cat data8.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
This is line number 1 again.
This is yet another line.
This is the last line in the file.
$
$ sed '/number 1/c\
> This is a changed line of text.' data8.txt
This is a changed line of text.
This is line number 2.
This is line number 3.
This is line number 4.
This is a changed line of text.
This is yet another line.
This is the last line in the file.
$
```

**변경(change) 명령**에서 주소 범위를 사용할 수 있지만, 결과가 예상과 다를 수 있습니다:

```
$ sed '2,3c\
> This is a new line of text.' data6.txt
This is line number 1.
This is a new line of text.
This is line number 4.
$
```

텍스트가 있는 두 줄을 변경하는 대신, **sed 편집기**는 단일 텍스트 줄로 두 줄을 모두 교체합니다.


## Transforming characters
**변환(transform) 명령(y)**은 **sed 편집기**에서 단일 문자에만 작동하는 유일한 명령입니다. **변환 명령**은 다음 형식을 사용합니다:

```
[address]y/inchars/outchars/
```

변환 명령은 `inchars`와 `outchars` 값을 일대일로 매핑합니다. `inchars`의 첫 번째 문자는 `outchars`의 첫 번째 문자로 변환되고, 두 번째 문자는 두 번째 문자로 변환됩니다. 
이 매핑은 지정된 문자의 길이에 따라 계속됩니다. 만약 `inchars`와 `outchars`의 길이가 같지 않으면, `sed` 편집기는 오류 메시지를 생성합니다.

다음은 변환 명령을 사용하는 간단한 예입니다:

```
$ sed 'y/123/789/' data8.txt
This is line number 7.
This is line number 8.
This is line number 9.
This is line number 4.
This is line number 7 again.
This is yet another line.
This is the last line in the file.
$
```

출력에서 볼 수 있듯이, `inchars` 패턴에 지정된 각 문자는 `outchars` 패턴에서 같은 위치에 있는 문자로 교체되었습니다. `transform` 명령은 전역 명령입니다. 
즉, 텍스트 라인에서 발견된 모든 문자에 대해 자동으로 변환을 수행하며, 해당 문자가 몇 번째로 나타나는지에 관계없이 처리됩니다.

```
$ echo "This 1 is a test of 1 try." | sed 'y/123/456/'
This 4 is a test of 4 try.
$
```

`sed` 편집기는 텍스트 라인에서 일치하는 문자 '1'의 두 인스턴스를 모두 변환했습니다. 문자의 특정 발생에만 변환을 제한할 수 없습니다.


## Printing revisited
“더 많은 치환 옵션 소개” 섹션에서는 `p` 플래그를 사용하여 `sed` 편집기가 변경한 라인을 표시하는 방법을 보여주었습니다. 또한 데이터 스트림에서 정보를 출력하는 데 사용할 수 있는 세 가지 명령이 있습니다:

- ■ `p` 명령: 텍스트 라인 출력  
- ■ 등호( = ) 명령: 라인 번호 출력  
- ■ `l` (소문자 L) 명령: 라인 목록 출력

다음 섹션에서는 이 세 가지 출력 명령을 `sed` 편집기에서 사용하는 방법을 다룹니다.


### Printing lines
`p` 플래그와 마찬가지로, `p` 명령은 `sed` 편집기 출력에서 라인을 출력합니다. 이 명령은 단독으로 사용하면 특별한 기능을 제공하지 않습니다:

```
$ echo "this is a test" | sed 'p'
this is a test
this is a test
$
```

이 명령은 이미 존재하는 데이터를 출력하는 것에 불과합니다. `print` 명령의 가장 일반적인 용도는 텍스트 패턴과 일치하는 텍스트가 포함된 라인을 출력하는 것입니다:

```
$ cat data6.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
$
$ sed -n '/number 3/p' data6.txt
This is line number 3.
$
```

`-n` 옵션을 명령어에 사용하면 다른 모든 라인을 억제하고 일치하는 텍스트 패턴이 포함된 라인만 출력할 수 있습니다. 

또한 데이터를 스트림에서 일부 라인만 빠르게 출력하는 방법으로 사용할 수도 있습니다:

```
$ sed -n '2,3p' data6.txt
This is line number 2.
This is line number 3.
$
```

`print` 명령은 `substitution` 또는 `change` 명령어로 변경되기 전에 라인을 확인해야 할 때도 사용할 수 있습니다. 변경되기 전에 라인을 표시하는 스크립트를 생성할 수 있습니다:

```
$ sed -n '/3/{
> p
> s/line/test/p
> }' data6.txt
This is line number 3.
This is test number 3.
$
```

이 `sed` 편집기 명령은 숫자 3을 포함하는 라인을 검색하고 두 개의 명령을 실행합니다. 먼저, 스크립트는 `p` 명령을 사용하여 원본 버전의 라인을 출력합니다. 
그 다음 `s` 명령을 사용하여 텍스트를 대체하고, `p` 플래그를 사용하여 결과 텍스트를 출력합니다. 출력에는 원본 라인 텍스트와 새 라인 텍스트가 모두 표시됩니다.


### Printing line numbers
등호( `=` ) 명령은 데이터 스트림 내에서 현재 라인의 번호를 출력합니다. 라인 번호는 데이터 스트림에서 줄 바꿈 문자(newline character)를 사용하여 결정됩니다. 
각 줄 바꿈 문자가 데이터 스트림에 나타날 때마다 `sed` 편집기는 해당 문자가 텍스트 라인의 끝을 나타낸다고 가정합니다.

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

`sed` 편집기는 실제 텍스트 라인 앞에 라인 번호를 출력합니다. 등호(`=`) 명령은 데이터 스트림에서 특정 텍스트 패턴을 검색할 때 유용합니다:

```
$ sed -n '/number 4/{
> =
> p
> }' data6.txt
4
This is line number 4.
$
```

`-n` 옵션을 사용하면, `sed` 편집기가 일치하는 텍스트 패턴을 포함한 라인의 라인 번호와 텍스트를 모두 표시하게 할 수 있습니다.


### Listing lines
`l` 명령은 데이터 스트림에서 텍스트와 비가시적 문자를 모두 출력할 수 있게 해줍니다. 비가시적 문자는 8진수 값으로 표시되며, 
백슬래시로 앞에 붙거나 탭 문자와 같은 일반적인 비가시적 문자는 C 스타일 명명법인 `\t`와 같은 형식으로 표시됩니다.

```
$ cat data9.txt
This          line            contains        tabs.
$
$ sed -n 'l' data9.txt
This\tline\tcontains\ttabs.$
$
```

탭 문자의 위치는 `\t` 명명법으로 표시됩니다. 줄 끝의 달러 기호는 줄 바꿈 문자를 나타냅니다. 
만약 데이터 스트림에 이스케이프 문자가 포함되어 있다면, `list` 명령은 필요할 경우 8진수 코드로 이를 표시합니다.

```
$ cat data10.txt
This line contains an escape character.
$
$ sed -n 'l' data10.txt
This line contains an escape character. \a$
$
```

`data10.txt` 파일에는 벨 소리를 발생시키는 이스케이프 제어 코드가 포함되어 있습니다. 
`cat` 명령을 사용하여 텍스트 파일을 표시할 때, 이스케이프 제어 코드는 화면에 보이지 않고 소리만 들리게 됩니다(스피커가 켜져 있을 경우). 
하지만 `list` 명령을 사용하면 사용된 이스케이프 제어 코드를 화면에 표시할 수 있습니다.



## Using fi les with sed
대체 명령에는 파일과 작업할 수 있는 플래그가 포함되어 있습니다. 또한 텍스트를 대체하지 않고도 작업할 수 있는 일반적인 `sed` 편집기 명령들도 존재합니다.

### Writing to a file
`w` 명령은 파일에 줄을 쓰는 데 사용됩니다. `w` 명령의 형식은 다음과 같습니다:

```
[address]w filename
```

`filename`은 상대 경로 또는 절대 경로로 지정할 수 있지만, 어떤 경우든 `sed` 편집기를 실행하는 사용자는 해당 파일에 대한 쓰기 권한을 가지고 있어야 합니다. 
주소는 `sed`에서 사용하는 모든 종류의 주소 지정 방법을 사용할 수 있습니다. 예를 들어, 단일 줄 번호, 텍스트 패턴, 또는 줄 번호나 텍스트 패턴의 범위 등이 있습니다.

다음은 데이터 스트림의 첫 번째 두 줄만 텍스트 파일로 출력하는 예입니다:

```
$ sed '1,2w test.txt' data6.txt
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

물론, 만약 출력이 `STDOUT`에 표시되지 않기를 원한다면, `sed` 명령어에 `-n` 옵션을 사용할 수 있습니다.  

이 옵션은 마스터 파일에서 공통된 텍스트 값을 기준으로 데이터 파일을 생성해야 할 때 매우 유용한 도구입니다. 예를 들어, 메일링 리스트와 같은 텍스트 값들을 기준으로 새로운 파일을 만들 수 있습니다.

```
$ cat data11.txt
Blum, R Browncoat
McGuiness, A Alliance
Bresnahan, C Browncoat
Harken, C Alliance
$
$ sed -n '/Browncoat/w Browncoats.txt' data11.txt
$
$ cat Browncoats.txt
Blum, R Browncoat
Bresnahan, C Browncoat
$
```

`sed` 편집기는 텍스트 패턴을 포함하는 데이터 라인만을 목적지 파일에 씁니다.


### Reading data from a file
이미 `sed` 명령어 라인에서 데이터를 삽입하고 텍스트를 추가하는 방법을 보았습니다. `read` 명령어 (r)는 별도의 파일에 포함된 데이터를 데이터 스트림에 삽입할 수 있게 해줍니다. 

`read` 명령어의 형식은 다음과 같습니다:

```
[address]r filename
```

`filename` 매개변수는 데이터를 포함하는 파일의 절대 경로 또는 상대 경로를 지정합니다. `read` 명령어에서는 주소 범위를 사용할 수 없습니다. 
단일 라인 번호나 텍스트 패턴 주소만 지정할 수 있습니다. `sed` 편집기는 주소 이후에 파일의 텍스트를 삽입합니다.

```
$ cat data12.txt
This is an added line.
This is the second added line.
$
$ sed '3r data12.txt' data6.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is an added line.
This is the second added line.
This is line number 4.
$
```

sed 편집기는 데이터 파일의 모든 텍스트 라인을 데이터 스트림에 삽입합니다. 동일한 기법은 텍스트 패턴 주소를 사용할 때도 작동합니다:

```
$ sed '/number 2/r data12.txt' data6.txt
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
$ sed '$r data12.txt' data6.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
This is an added line.
This is the second added line.
$
```

`read` 명령어의 멋진 활용법은 삭제 명령어와 함께 사용하여 파일에서 자리 표시자를 다른 파일의 데이터로 교체하는 것입니다. 
예를 들어, 다음과 같은 형태의 텍스트 파일에 저장된 양식이 있다고 가정해 보겠습니다:

```
$ cat notice.std
Would the following people:
LIST
please report to the ship's captain.
$
```

양식 편지에서는 사람 목록 대신 일반적인 자리 표시자 `LIST`를 사용합니다. 자리 표시자 뒤에 사람 목록을 삽입하려면 `read` 명령어를 사용하면 됩니다. 
그러나 이렇게 하면 여전히 출력에 자리 표시자 텍스트가 남아 있습니다. 이를 제거하려면 `delete` 명령어를 사용하면 됩니다. 그 결과는 다음과 같습니다:

```
$ sed '/LIST/{
> r data11.txt
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

이제 자리 표시자 텍스트는 데이터 파일의 이름 목록으로 교체되었습니다.


# Summary
셸 스크립트는 많은 작업을 스스로 할 수 있지만, 셸 스크립트만으로 데이터를 조작하는 것은 종종 어렵습니다. 리눅스는 텍스트 데이터를 처리하는 데 도움을 주는 두 가지 유용한 유틸리티를 제공합니다. 
`sed` 편집기는 데이터를 읽으면서 실시간으로 빠르게 처리하는 스트림 편집기입니다. `sed` 편집기에는 데이터를 처리할 수 있는 편집 명령어 목록을 제공해야 합니다. 

`gawk` 프로그램은 GNU 조직에서 제공하는 유틸리티로, 유닉스의 `awk` 프로그램의 기능을 모방하고 확장합니다. `gawk` 프로그램은 데이터를 처리하고 조작하는 스크립트를 작성할 수 있는 내장 프로그래밍 언어를 제공합니다. 
`gawk` 프로그램을 사용하면 대용량 데이터 파일에서 데이터 요소를 추출하고 원하는 형식으로 출력할 수 있습니다. 이는 대용량 로그 파일을 처리하거나 데이터 파일에서 맞춤형 보고서를 생성하는 데 매우 유용합니다.

`sed`와 `gawk` 프로그램을 사용할 때 중요한 요소는 정규 표현식을 사용하는 방법을 아는 것입니다. 정규 표현식은 텍스트 파일에서 데이터를 추출하고 조작하기 위한 맞춤형 필터를 만드는 데 중요한 역할을 합니다. 
다음 장에서는 종종 오해를 받는 정규 표현식의 세계에 대해 다루며, 모든 유형의 데이터를 조작할 수 있는 정규 표현식을 만드는 방법을 보여줍니다.





# Advanced sed
이전 장에서는 데이터 스트림에서 텍스트를 조작하는 데 `sed` 편집기의 기본 사용법을 보여주었습니다. 기본 `sed` 편집기 명령어는 대부분의 일상적인 텍스트 편집 요구를 처리할 수 있습니다. 
이 장에서는 `sed` 편집기가 제공하는 더 고급 기능을 살펴봅니다. 이러한 기능은 자주 사용하지 않을 수 있습니다. 그러나 필요할 때 이를 사용할 수 있다는 것과 사용하는 방법을 아는 것이 좋습니다.


## Looking at Multiline Commands
기본 `sed` 편집기 명령어를 사용할 때, 제한 사항을 느꼈을 수도 있습니다. 모든 `sed` 편집기 명령어는 데이터를 한 줄씩 처리합니다. `sed` 편집기가 데이터 스트림을 읽을 때, 데이터는 줄 바꿈 문자를 기준으로 여러 줄로 나뉩니다. 
`sed` 편집기는 각 데이터를 한 번에 한 줄씩 처리하며, 정의된 스크립트 명령어를 해당 데이터 줄에 적용한 후, 다음 줄로 넘어가며 처리를 반복합니다.

때때로 한 줄을 넘는 데이터에 대해 작업을 수행해야 할 필요가 있습니다. 이는 특히 구문을 찾거나 교체하려고 할 때 자주 발생합니다. 예를 들어, 데이터에서 "Linux System Administrators Group"라는 구문을 찾고 있다고 가정해 보겠습니다. 
구문의 단어가 두 줄로 나뉘어 있을 수 있기 때문에, 일반적인 `sed` 편집기 명령어로 텍스트를 처리하면 이 분리된 구문을 감지하는 것이 불가능합니다.

다행히도, `sed` 편집기의 설계자들은 이러한 상황을 염두에 두고 해결책을 마련했습니다. `sed` 편집기에는 멀티라인 텍스트를 처리할 수 있는 세 가지 특별한 명령어가 포함되어 있습니다:

- **N**: 데이터 스트림에서 다음 줄을 추가하여 멀티라인 그룹을 생성합니다.
- **D**: 멀티라인 그룹에서 한 줄을 삭제합니다.
- **P**: 멀티라인 그룹에서 한 줄을 출력합니다.

다음 섹션에서는 이러한 멀티라인 명령어를 더 자세히 살펴보고, 스크립트에서 어떻게 사용할 수 있는지 보여줍니다.


### Navigating the next command
멀티라인 `next` 명령어를 살펴보기 전에, 먼저 단일 줄 버전의 `next` 명령어가 어떻게 작동하는지 알아야 합니다. 해당 명령어가 무엇을 하는지 알면, 멀티라인 버전의 `next` 명령어가 어떻게 작동하는지 이해하기 훨씬 쉬워집니다.


#### Using the single-line next command
소문자 `n` 명령어는 `sed` 편집기에게 데이터 스트림에서 다음 텍스트 줄로 이동하라고 지시합니다. 이때 명령어의 처음으로 돌아가지 않고 바로 이동합니다. 
일반적으로 `sed` 편집기는 데이터를 처리할 때 한 줄에 대해 정의된 모든 명령어를 처리한 후, 그 다음 텍스트 줄로 이동하지만, 단일 줄 버전의 `next` 명령어는 이 흐름을 변경합니다.

이것은 다소 복잡하게 들릴 수 있으며, 때때로 그럴 수도 있습니다. 예를 들어, 다섯 줄이 포함된 데이터 파일이 있다고 가정하고, 그 중 두 줄은 비어 있습니다. 
목표는 헤더 줄 뒤의 빈 줄을 제거하되, 마지막 줄 앞의 빈 줄은 그대로 두는 것입니다. 빈 줄을 제거하는 `sed` 스크립트를 작성하면 두 개의 빈 줄 모두 제거됩니다.

```
$ cat data1.txt
This is the header line.
This is a data line.
This is the last line.
$
$ sed '/ ^ $/d' data1.txt
This is the header line.
This is a data line.
This is the last line.
$
```

제거하려는 줄이 빈 줄이기 때문에 고유하게 식별할 수 있는 텍스트가 없습니다. 해결책은 `n` 명령어를 사용하는 것입니다. 
다음 예제에서는 스크립트가 "header"라는 단어가 포함된 고유한 줄을 찾습니다. 스크립트가 해당 줄을 식별한 후, `n` 명령어는 `sed` 편집기를 텍스트의 다음 줄로 이동시키며, 그 줄은 빈 줄입니다.

```
$ sed '/header/{n ; d}' data1.txt
This is the header line.
This is a data line.
This is the last line.
$
```

그 시점에서 `sed` 편집기는 명령 목록 처리를 계속하며, `d` 명령어를 사용해 빈 줄을 삭제합니다. 
`sed` 편집기가 명령 스크립트의 끝에 도달하면, 데이터 스트림에서 다음 텍스트 줄을 읽고 명령 스크립트의 맨 위에서부터 명령을 다시 처리하기 시작합니다. 
그러나 `sed` 편집기는 더 이상 "header"라는 단어가 포함된 줄을 찾지 못하므로, 이후의 줄들은 삭제되지 않습니다.


#### Combining lines of text
이제 단일 줄 `next` 명령어를 살펴봤으므로, 멀티라인 버전을 볼 수 있습니다. 단일 줄 `next` 명령어는 데이터 스트림에서 다음 텍스트 줄을 처리 공간(즉, `pattern space`)으로 이동시킵니다. 
멀티라인 버전인 `N` 명령어는 이미 `pattern space`에 있는 텍스트에 다음 텍스트 줄을 추가합니다.

이로 인해 데이터 스트림에서 두 줄의 텍스트가 동일한 `pattern space`에 결합됩니다. 텍스트 줄들은 여전히 줄 바꿈 문자로 구분되지만, 이제 `sed` 편집기는 두 줄의 텍스트를 하나의 줄로 처리할 수 있습니다.

다음은 `N` 명령어가 어떻게 작동하는지 보여주는 예시입니다:

```
$ cat data2.txt
This is the header line.
This is the first data line.
This is the second data line.
This is the last line.
$
$ sed '/first/{ N ; s/\n/ / }' data2.txt
This is the header line.
This is the first data line. This is the second data line.
This is the last line.
$
```


































