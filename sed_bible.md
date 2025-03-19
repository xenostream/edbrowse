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

sed 편집기 스크립트는 "fi rst"라는 단어를 포함한 텍스트 라인을 검색합니다. 해당 라인을 찾으면, `N` 명령어를 사용하여 그 라인과 다음 라인을 결합합니다. 
그 후 `s` (치환) 명령어를 사용하여 줄 바꿈 문자를 공백으로 바꿉니다. 그 결과, 텍스트 파일의 두 라인이 sed 편집기 출력에서 하나의 라인처럼 나타납니다.

이 방법은 데이터 파일에서 텍스트 구문이 두 줄에 걸쳐 나눠져 있을 수 있는 경우에 실용적으로 사용됩니다. 예를 들어, 다음과 같습니다:

```
$ cat data3.txt
On Tuesday, the Linux System
Administrator's group meeting will be held.
All System Administrators should attend.
Thank you for your attendance.
$
$ sed 'N ; s/System Administrator/Desktop User/' data3.txt
On Tuesday, the Linux System
Administrator's group meeting will be held.
All Desktop Users should attend.
Thank you for your attendance.
$
```

치환 명령어는 텍스트 파일에서 특정한 두 단어 구문인 "System Administrator"를 찾고 있습니다. 이 구문이 포함된 단일 라인에서는 모든 것이 정상적으로 작동하여 치환 명령어가 텍스트를 교체할 수 있습니다. 
그러나 구문이 두 줄에 걸쳐 나뉘어 있는 경우, 치환 명령어는 일치하는 패턴을 인식하지 못합니다.

`N` 명령어는 이 문제를 해결하는 데 도움이 됩니다:

```
$ sed 'N ; s/System.Administrator/Desktop User/' data3.txt
On Tuesday, the Linux Desktop User's group meeting will be held.
All Desktop Users should attend.
Thank you for your attendance.
$
```

`N` 명령어를 사용하여 첫 번째 단어가 있는 라인과 그 다음 라인을 결합하면, 구문이 두 줄로 나누어졌을 때 이를 감지할 수 있습니다.

치환 명령어는 `System`과 `Administrator`라는 두 단어 사이에 와일드카드 패턴 (.)을 사용하여 공백과 줄 바꿈 상황을 모두 매칭합니다. 
그러나 줄 바꿈 문자를 매칭했을 때, 해당 문자가 문자열에서 제거되어 두 줄이 하나로 합쳐졌습니다. 이는 원하는 결과가 아닐 수 있습니다.

이 문제를 해결하려면, `sed` 편집기 스크립트에서 두 개의 치환 명령어를 사용할 수 있습니다. 하나는 멀티라인에서 발생한 구문을 매칭하고, 다른 하나는 단일 라인에서 발생한 구문을 매칭하는 방식입니다.

```
$ sed 'N
> s/System\nAdministrator/Desktop\nUser/
> s/System Administrator/Desktop User/
> ' data3.txt
On Tuesday, the Linux Desktop
User's group meeting will be held.
All Desktop Users should attend.
Thank you for your attendance.
$
```

첫 번째 치환 명령어는 두 검색 단어 사이에 있는 줄 바꿈 문자를 정확히 찾아서 교체 문자열에 포함시킵니다. 이렇게 하면 새 텍스트에서 동일한 위치에 줄 바꿈 문자를 추가할 수 있습니다.

그러나 이 스크립트에는 여전히 미묘한 문제가 있습니다. 스크립트는 항상 `sed` 편집기 명령어를 실행하기 전에 다음 텍스트 라인을 패턴 공간에 읽어옵니다. 
마지막 텍스트 라인에 도달하면 읽을 다음 텍스트 라인이 없기 때문에, `N` 명령어는 `sed` 편집기가 멈추도록 만듭니다. 만약 일치하는 텍스트가 데이터 스트림의 마지막 줄에 있다면, 명령어가 일치하는 데이터를 처리하지 못합니다.

```
$ cat data4.txt
On Tuesday, the Linux System
Administrator's group meeting will be held.
All System Administrators should attend.
$
$ sed 'N
> s/System\nAdministrator/Desktop\nUser/
> s/System Administrator/Desktop User/
> ' data4.txt
On Tuesday, the Linux Desktop
User's group meeting will be held.
All System Administrators should attend.
$
```

`System Administrator` 텍스트가 데이터 스트림의 마지막 줄에 나타나기 때문에, `N` 명령어는 그것을 놓칩니다. 그 이유는 패턴 공간에 결합할 다음 라인이 없기 때문입니다.

이 문제는 간단하게 해결할 수 있습니다. 단일 라인 명령어를 `N` 명령어 앞에 배치하고, 멀티라인 명령어만 `N` 명령어 뒤에 배치하면 됩니다. 예를 들어, 다음과 같이 구성할 수 있습니다:

```
$ sed '
> s/System Administrator/Desktop User/
> N
> s/System\nAdministrator/Desktop\nUser/
> ' data4.txt
On Tuesday, the Linux Desktop
User's group meeting will be held.
All Desktop Users should attend.
$
```

이제 단일 라인에서 구문을 찾는 치환 명령어가 데이터 스트림의 마지막 줄에서도 잘 작동하고, 멀티라인 치환 명령어는 데이터 스트림 중간에 있는 일치 항목을 처리합니다.


### Navigating the multiline delete command
19장에서는 단일 라인 삭제 명령어 (`d`)를 소개했습니다. `sed` 편집기는 이를 사용하여 패턴 공간에서 현재 라인을 삭제합니다. 그러나 `N` 명령어를 사용할 때는 단일 라인 삭제 명령어를 사용할 때 주의해야 합니다:

```
$ sed 'N ; /System\nAdministrator/d' data4.txt
All System Administrators should attend.
$
```

삭제 명령어는 `System`과 `Administrator` 단어를 각각 다른 줄에서 찾고, 패턴 공간에서 두 줄을 모두 삭제했습니다. 이것이 의도한 결과였을 수도 있고, 아닐 수도 있습니다.

`sed` 편집기는 멀티라인 삭제 명령어 (`D`)를 제공하는데, 이는 패턴 공간에서 첫 번째 줄만 삭제합니다. 이 명령어는 줄 바꿈 문자를 포함하여 해당 줄의 모든 문자를 제거합니다.

```
$ sed 'N ; /System\nAdministrator/D' data4.txt
Administrator's group meeting will be held.
All System Administrators should attend.
$
```

`N` 명령어에 의해 패턴 공간에 추가된 두 번째 텍스트 줄은 그대로 유지됩니다. 이는 데이터 문자열을 찾는 라인 앞에 있는 텍스트 줄을 제거해야 할 때 유용하게 사용됩니다.

다음은 데이터 스트림에서 첫 번째 라인 앞에 있는 빈 줄을 제거하는 예입니다:

```
$ cat data5.txt

This is the header line.
This is a data line.

This is the last line.
$
$ sed '/^$/{N ; /header/D}' data5.txt
This is the header line.
This is a data line.

This is the last line.
$
```

이 `sed` 편집기 스크립트는 빈 줄을 찾고, `N` 명령어를 사용하여 다음 텍스트 줄을 패턴 공간에 추가합니다. 만약 새 패턴 공간 내용에 "header"라는 단어가 포함되어 있다면, 
`D` 명령어가 패턴 공간에서 첫 번째 줄을 제거합니다. `N`과 `D` 명령어의 조합 없이는 첫 번째 빈 줄만 제거하는 것이 불가능하며, 다른 빈 줄까지 모두 제거될 수 있습니다.



### Navigating the multiline print command
이제 아마 단일 라인 명령어와 멀티라인 명령어의 차이를 이해하고 있을 것입니다. 멀티라인 출력 명령어 (`P`)도 같은 방식으로 작동합니다. 이 명령어는 멀티라인 패턴 공간에서 첫 번째 줄만 출력합니다. 
여기에는 패턴 공간에서 줄 바꿈 문자를 포함한 모든 문자가 포함됩니다. `-n` 옵션을 사용하여 스크립트의 출력을 억제할 때, 텍스트를 표시하는 방식은 단일 라인 `p` 명령어와 비슷하게 사용됩니다.

```
$ sed -n 'N ; /System\nAdministrator/P' data3.txt
On Tuesday, the Linux System
$
```

멀티라인 매칭이 발생하면, `P` 명령어는 패턴 공간에서 첫 번째 줄만 출력합니다. 멀티라인 `P` 명령어의 강력함은 이를 `N`과 `D` 멀티라인 명령어와 결합할 때 나타납니다.

`D` 명령어는 독특한 기능을 가지고 있는데, 이는 `sed` 편집기가 스크립트의 처음으로 돌아가서 동일한 패턴 공간에 대해 명령어를 반복 실행하게 만듭니다. 
새로운 텍스트 라인을 데이터 스트림에서 읽어오지 않습니다. 명령어 스크립트에 `N` 명령어를 포함시키면, 패턴 공간을 한 줄씩 순차적으로 처리하면서 여러 줄을 결합할 수 있습니다.

그다음, `P` 명령어를 사용하여 첫 번째 줄을 출력하고, `D` 명령어로 첫 번째 줄을 삭제한 후 스크립트의 처음으로 돌아갑니다. 
스크립트의 처음에 돌아가면, `N` 명령어는 다음 텍스트 줄을 읽어들이고, 이 과정이 반복됩니다. 이 루프는 데이터 스트림의 끝에 도달할 때까지 계속됩니다.



### Holding Space
패턴 공간은 `sed` 편집기가 명령어를 처리하는 동안 텍스트를 저장하는 활성 버퍼 영역입니다. 그러나 이것이 `sed` 편집기에서 텍스트를 저장할 수 있는 유일한 공간은 아닙니다.

`sed` 편집기는 또 다른 버퍼 영역인 **홀드 공간(hold space)** 을 사용합니다. 홀드 공간은 패턴 공간에서 다른 줄을 작업하는 동안 텍스트 라인을 임시로 저장하는 데 사용할 수 있습니다.

홀드 공간을 사용하는 데 관련된 다섯 가지 명령어는 **표 21-1**에 나와 있습니다.

| 명령 | 설명 |
| ---  | ---  |
| h    | 패턴 공간을 홀드 공간에 복사합니다.     |
| H    | 패턴 공간을 홀드 공간에 추가합니다.     |
| g    | 홀드 공간을 패턴 공간에 복사합니다.     |
| G    | 홀드 공간을 패턴 공간에 추가합니다.     |
| x    | 패턴 공간과 홀드 공간의 내용을 교환합니다.     |

이 명령어들을 사용하면 패턴 공간에서 홀드 공간으로 텍스트를 복사할 수 있습니다. 이렇게 하면 패턴 공간을 비워 두고 다른 문자열을 로드하여 처리할 수 있게 됩니다.

보통 `h` 또는 `H` 명령어로 문자열을 홀드 공간으로 이동한 후, 나중에 `g`, `G`, 또는 `x` 명령어를 사용하여 저장된 문자열을 다시 패턴 공간으로 이동시키게 됩니다. (그렇지 않으면 처음에 문자열을 저장할 필요가 없었을 것입니다.)

두 개의 버퍼 영역을 사용하면 어느 텍스트 라인이 어떤 버퍼에 있는지 파악하는 것이 때때로 혼란스러울 수 있습니다. 다음은 `h`와 `g` 명령어를 사용하여 `sed` 편집기 버퍼 공간 간에 데이터를 이동시키는 방법을 보여주는 간단한 예입니다:

```
$ cat data2.txt
This is the header line.
This is the first data line.
This is the second data line.
This is the last line.
$
$ sed -n '/first/ {h ; p ; n ; p ; g ; p }' data2.txt
This is the first data line.
This is the second data line.
This is the first data line.
$
```

앞서 언급한 코드 예제를 단계별로 살펴보겠습니다:

1. `sed` 스크립트는 주소에서 정규 표현식을 사용하여 "first"라는 단어가 포함된 라인을 필터링합니다.
2. "first"라는 단어가 포함된 라인이 나타나면, `{}` 내의 첫 번째 명령어인 `h` 명령어가 그 라인을 홀드 공간에 저장합니다.
3. 그 다음 명령어인 `p` 명령어는 패턴 공간의 내용을 출력합니다. 패턴 공간에는 여전히 첫 번째 데이터 라인이 들어 있습니다.
4. `n` 명령어는 데이터 스트림에서 다음 라인(두 번째 데이터 라인)을 읽어와서 패턴 공간에 넣습니다.
5. `p` 명령어는 패턴 공간의 내용을 출력하는데, 이제 두 번째 데이터 라인이 출력됩니다.
6. `g` 명령어는 홀드 공간에 저장된 첫 번째 데이터 라인을 패턴 공간에 다시 넣어 현재 텍스트를 대체합니다.
7. `p` 명령어는 패턴 공간의 현재 내용을 출력하는데, 이제 첫 번째 데이터 라인이 출력됩니다.

홀드 공간을 사용하여 텍스트 라인을 재배치함으로써 첫 번째 데이터 라인이 두 번째 데이터 라인 뒤에 나오도록 할 수 있습니다. 만약 첫 번째 `p` 명령어를 제거하면 두 라인을 역순으로 출력할 수 있습니다.

```
$ sed -n '/first/ {h ; n ; p ; g ; p }' data2.txt
This is the second data line.
This is the first data line.
$
```

이것은 유용한 작업의 시작입니다. 이 기술을 사용하여 텍스트 파일의 전체 라인을 뒤집는 `sed` 스크립트를 만들 수 있습니다! 하지만 이를 위해서는 `sed` 편집기의 부정 기능을 이해할 필요가 있으며, 그 내용은 다음 섹션에서 다루고 있습니다.


### Negating a Command
19장에서 `sed` 편집기는 명령어를 데이터 스트림의 모든 텍스트 라인에 적용하거나, 단일 주소나 주소 범위로 지정된 라인에만 적용한다고 설명했습니다. 또한, 특정 주소나 주소 범위에 명령어가 적용되지 않도록 설정할 수도 있습니다.

느낌표 명령어 (`!`)는 명령어를 부정하는 데 사용됩니다. 이는 명령어가 일반적으로 활성화되었을 상황에서, 그것이 활성화되지 않도록 합니다. 이 기능을 보여주는 예는 다음과 같습니다:

```
$ sed -n '/header/!p' data2.txt
This is the first data line.
This is the second data line.
This is the last line.
$
```

일반적으로 `p` 명령어는 "header"라는 단어가 포함된 `data2` 파일의 라인만 출력합니다. 하지만 느낌표를 추가하면 반대의 결과가 발생합니다. 즉, "header"라는 단어가 포함된 라인을 제외한 모든 라인이 출력됩니다.

느낌표를 사용하는 것은 여러 응용 프로그램에서 유용합니다. 이전 장에서 "다음 명령어 탐색" 섹션에서는 `sed` 편집기 명령어가 데이터 스트림의 마지막 라인에 적용되지 않는 상황을 설명했었습니다. 이 문제를 해결하려면 느낌표를 사용할 수 있습니다:

```
$ sed 'N;
> s/System\nAdministrator/Desktop\nUser/
> s/System Administrator/Desktop User/
> ' data4.txt
On Tuesday, the Linux Desktop
User's group meeting will be held.
All System Administrators should attend.
$
$ sed '$!N;
> s/System\nAdministrator/Desktop\nUser/
> s/System Administrator/Desktop User/
> ' data4.txt
On Tuesday, the Linux Desktop
User's group meeting will be held.
All Desktop Users should attend.
$
```

이 예제에서는 `N` 명령어와 달러 기호 (`$`) 특별 주소를 함께 사용한 느낌표를 보여줍니다. 달러 기호는 데이터 스트림의 마지막 텍스트 라인을 나타내므로, 
`sed` 편집기가 마지막 라인에 도달하면 `N` 명령어를 실행하지 않습니다. 그러나 다른 모든 라인에서는 명령어를 실행합니다.

이 기술을 사용하면 데이터 스트림에서 텍스트 라인의 순서를 반전시킬 수 있습니다. 텍스트 스트림에서 라인의 순서를 반대로(마지막 라인을 먼저, 
첫 번째 라인을 마지막에) 출력하려면, 홀드 공간을 사용하여 약간의 추가 작업을 해야 합니다.

이 작업을 위한 패턴은 다음과 같습니다:

1. 패턴 공간에 라인을 놓습니다.
2. 패턴 공간에서 라인을 홀드 공간에 놓습니다.
3. 다음 텍스트 라인을 패턴 공간에 넣습니다.
4. 홀드 공간을 패턴 공간에 추가합니다.
5. 패턴 공간의 모든 내용을 홀드 공간에 넣습니다.
6. 3단계부터 5단계를 반복하여 모든 라인을 홀드 공간에 반전된 순서로 넣습니다.
7. 라인들을 꺼내서 출력합니다.

**그림 21-1**은 이 과정을 더 자세하게 다이어그램으로 설명합니다.

이 기술을 사용할 때, 처리되는 라인들을 바로 출력하지 않기를 원합니다. 즉, `sed`의 `-n` 명령행 옵션을 사용해야 합니다. 
그다음으로 결정할 것은 홀드 공간의 텍스트를 패턴 공간의 텍스트에 어떻게 추가할지입니다. 이것은 `G` 명령어를 사용하여 수행됩니다.

문제는 첫 번째 텍스트 라인에 홀드 공간을 추가하고 싶지 않다는 점입니다. 이는 쉽게 해결할 수 있는데, `!` 명령어를 사용하면 됩니다.

```
1!G
```

다음 단계는 새 패턴 공간(반전된 라인들이 추가된 텍스트 라인)을 홀드 공간에 넣는 것입니다. 이는 간단하며, h 명령어를 사용하면 됩니다.

전체 데이터 스트림이 패턴 공간에 반전된 순서로 들어갔다면, 이제 결과를 출력하기만 하면 됩니다. 데이터 스트림의 마지막 라인에 도달했을 때, 
전체 데이터 스트림이 패턴 공간에 있다는 것을 알 수 있습니다. 결과를 출력하려면, 다음 명령어를 사용하면 됩니다:

```
$p
```

>> 그림 571 page
>

그것들이 라인 순서를 반전시키는 `sed` 편집기 스크립트를 만드는 데 필요한 요소들입니다. 이제 테스트 실행을 통해 시도해 보세요:

```
$ cat data2.txt
This is the header line.
This is the first data line.
This is the second data line.
This is the last line.
$
$ sed -n '{1!G ; h ; $p }' data2.txt
This is the last line.
This is the second data line.
This is the first data line.
This is the header line.
$
```

`sed` 편집기 스크립트는 예상대로 작동했습니다. 스크립트의 출력은 원본 텍스트 파일의 라인 순서를 반전시킵니다. 
이는 `sed` 스크립트에서 홀드 공간을 사용하는 강력한 기능을 보여줍니다. 홀드 공간을 사용하면 스크립트 출력에서 라인 순서를 쉽게 조작할 수 있습니다.

> [!NOTE]
> 궁금할 수 있겠지만, bash 셸 명령어는 텍스트 파일을 반전시키는 기능을 수행할 수 있습니다. `tac` 명령어는 텍스트 파일을 반대 순서로 출력합니다.
> 아마도 이 명령어의 이름이 `cat` 명령어의 반대 기능을 수행하기 때문에 기발하다는 것을 눈치챘을 것입니다.





## Changing the Flow
일반적으로 `sed` 편집기는 명령어를 위에서 아래로 처리합니다(예외는 `D` 명령어로, 이는 `sed` 편집기가 새로운 텍스트 라인을 읽지 않고 스크립트의 맨 위로 돌아가게 만듭니다). 
`sed` 편집기는 명령어 흐름을 변경하는 방법을 제공하여, 구조화된 프로그래밍 환경에서와 유사한 결과를 생성할 수 있습니다.


### Branching
이전 섹션에서는 느낌표 명령어가 텍스트 라인에 대한 명령의 효과를 부정하는 데 어떻게 사용되는지 보았습니다. `sed` 편집기는 주소, 주소 패턴 또는 주소 범위를 기반으로 
명령어의 전체 섹션을 부정하는 방법을 제공합니다. 이를 통해 데이터 스트림 내에서 특정 하위 집합에 대해서만 명령어 그룹을 수행할 수 있습니다.

다음은 브랜치 (*branch*) 명령어의 형식입니다:

```
[address]b [label]
```

주소 매개변수는 어떤 데이터 라인이나 라인이 브랜치 명령어를 트리거할지를 결정합니다. 라벨 매개변수는 분기할 위치를 정의합니다. 만약 라벨 매개변수가 없으면, 브랜치 명령어는 스크립트의 끝으로 진행됩니다.

```
$ cat data2.txt
This is the header line.
This is the first data line.
This is the second data line.
This is the last line.
$
$ sed '{2,3b ; s/This is/Is this/ ; s/line./test?/}' data2.txt
Is this the header test?
This is the first data line.
This is the second data line.
Is this the last test?
$
```

`branch` 명령어는 데이터 스트림의 두 번째 및 세 번째 라인에 대해 두 개의 치환 명령어를 건너뜁니다. 

스크립트의 끝으로 가는 대신, 브랜치 명령어가 이동할 라벨을 정의할 수 있습니다. 라벨은 콜론(:)으로 시작하며, 최대 7자의 길이를 가질 수 있습니다.

```
:label2
```

라벨을 지정하려면, `b` 명령어 뒤에 라벨을 추가하면 됩니다. 라벨을 사용하면 브랜치 주소와 일치하는 명령을 건너뛰면서도 스크립트의 다른 명령은 계속 처리할 수 있습니다.

```
$ sed '{/first/b jump1 ; s/This is the/No jump on/
> :jump1
> s/This is the/Jump here on/}' data2.txt
No jump on header line
Jump here on first data line
No jump on second data line
No jump on last line
$
```

`branch` 명령어는 텍스트 "first"가 라인에 나타나면 프로그램이 `jump1` 라벨이 붙은 스크립트 라인으로 이동하도록 지정합니다. 
만약 `branch` 명령어 패턴이 일치하지 않으면, `sed` 편집기는 스크립트에서 다음 명령을 계속 처리합니다. (따라서 세 개의 치환 명령어는 `branch` 패턴과 일치하지 않는 라인에서 처리됩니다.)

라인이 `branch` 패턴과 일치하면, `sed` 편집기는 `branch` 라벨 라인으로 분기합니다. 따라서 마지막 치환 명령어만 실행됩니다.

이 예시는 `sed` 스크립트에서 더 아래쪽에 있는 라벨로 분기하는 경우를 보여줍니다. 또한, 스크립트에서 더 앞쪽에 있는 라벨로 분기할 수도 있으며, 이를 통해 루프 효과를 만들 수 있습니다.

```
$ echo "This, is, a, test, to, remove, commas." | sed -n '{
> :start
> s/,//1p
> b start
> }'
This is, a, test, to, remove, commas.
This is a, test, to, remove, commas.
This is a test, to, remove, commas.
This is a test to, remove, commas.
This is a test to remove, commas.
This is a test to remove commas.
^C
$
```

각 스크립트 반복은 텍스트 문자열에서 첫 번째 쉼표를 제거하고 문자열을 출력합니다. 이 스크립트에는 한 가지 문제가 있습니다: 끝나지 않습니다. 
이 상황은 쉼표를 찾을 때까지 무한 루프가 발생하며, 수동으로 Ctrl+C 키 조합으로 중지해야 합니다.

이 문제를 방지하려면, `branch` 명령어가 찾을 주소 패턴을 지정해야 합니다. 만약 해당 패턴이 없으면, 브랜칭을 멈추도록 해야 합니다.

```
$ echo "This, is, a, test, to, remove, commas." | sed -n '{
> :start
> s/,//1p
> /,/b start
> }'
This is, a, test, to, remove, commas.
This is a, test, to, remove, commas.
This is a test, to, remove, commas.
This is a test to, remove, commas.
This is a test to remove, commas.
This is a test to remove commas.
$
```

이제 `branch` 명령어는 라인에 쉼표가 있을 경우에만 분기합니다. 마지막 쉼표가 제거된 후에는 `branch` 명령어가 실행되지 않으므로, 스크립트가 제대로 종료될 수 있습니다.


### Testing
`branch` 명령어와 유사하게, `test` 명령어(t)는 `sed` 편집기 스크립트의 흐름을 수정하는 데 사용됩니다. 주소를 기반으로 라벨로 분기하는 대신, `test` 명령어는 치환 명령어의 결과에 따라 라벨로 분기합니다.

만약 치환 명령어가 성공적으로 패턴을 일치시키고 치환을 수행하면, `test` 명령어는 지정된 라벨로 분기합니다. 반대로, 치환 명령어가 지정된 패턴과 일치하지 않으면, `test` 명령어는 분기하지 않습니다.

`test` 명령어는 `branch` 명령어와 동일한 형식을 사용합니다:

```
[address]t [label]
```

`branch` 명령어와 마찬가지로, 라벨을 지정하지 않으면 `test` 명령어는 테스트가 성공하면 스크립트의 끝으로 분기합니다.

`test` 명령어는 데이터 스트림의 텍스트에 대해 기본적인 `if-then` 문을 수행하는 간단한 방법을 제공합니다. 예를 들어, 다른 치환이 이루어졌을 때 추가적인 치환을 하지 않으려면, `test` 명령어가 도움이 될 수 있습니다:

```
$ sed '{
> s/first/matched/
> t
> s/This is the/No match on/
> }' data2.txt
No match on header line
This is the matched data line
No match on second data line
No match on last line
$
```

첫 번째 `substitution` 명령어는 패턴 텍스트 "first"를 찾습니다. 만약 라인에서 패턴과 일치하면, 텍스트를 치환하고 `test` 명령어는 두 번째 `substitution` 명령어를 건너뜁니다. 
첫 번째 `substitution` 명령어가 패턴과 일치하지 않으면, 두 번째 `substitution` 명령어가 처리됩니다.

`test` 명령어를 사용하면, `branch` 명령어를 사용할 때 시도했던 루프를 정리할 수 있습니다:

```
$ echo "This, is, a, test, to, remove, commas. " | sed -n '{
> :start
> s/,//1p
> t start
> }'
This is, a, test, to, remove, commas.
This is a, test, to, remove, commas.
This is a test, to, remove, commas.
This is a test to, remove, commas.
This is a test to remove, commas.
This is a test to remove commas.
$
```

더 이상 치환할 내용이 없으면, `test` 명령어는 분기하지 않고 스크립트의 나머지 부분을 계속 처리합니다.




## Replacing via a Pattern
`sed` 명령어에서 패턴을 사용하여 데이터 스트림의 텍스트를 교체하는 방법을 이미 보았을 것입니다. 그러나 와일드카드 문자를 사용할 때 어떤 텍스트가 정확히 패턴에 일치할지 예측하기가 쉽지 않습니다.

예를 들어, 라인에서 일치하는 단어에 큰따옴표를 추가하고 싶다고 가정해 봅시다. 패턴에서 일치하는 단어가 하나뿐이라면 이것은 꽤 간단한 작업입니다:

```
$ echo "The cat sleeps in his hat." | sed 's/cat/"cat"/'
The "cat" sleeps in his hat.
$
```

하지만 패턴에서 와일드카드 문자 (.)를 사용하여 여러 단어와 일치시키는 경우에는 어떻게 될까요?

```
$ echo "The cat sleeps in his hat." | sed 's/.at/".at"/g'
The ".at" sleeps in his ".at".
$
```

치환 문자열은 점 (.) 와일드카드 문자를 사용하여 "at" 뒤에 오는 모든 문자에 일치시킵니다. 불행히도, 치환 문자열은 일치하는 단어의 와일드카드 문자 값을 제대로 처리하지 못합니다.


### Using the ampersand
`sed` 편집기에는 이를 해결할 수 있는 방법이 있습니다. 앰퍼샌드 기호 ( &) 는 치환 명령에서 일치하는 패턴을 나타내는 데 사용됩니다. 
정의된 패턴과 일치하는 텍스트는 앰퍼샌드 기호를 사용하여 치환 패턴에서 다시 호출할 수 있습니다. 이를 통해 정의된 패턴과 일치하는 단어를 조작할 수 있습니다.

```
$ echo "The cat sleeps in his hat." | sed 's/.at/"&"/g'
The "cat" sleeps in his "hat".
$
```

패턴이 "cat"과 일치하면, "cat"이 치환된 단어에 나타납니다. 패턴이 "hat"과 일치하면, "hat"이 치환된 단어에 나타납니다.


### Replacing individual words
앰퍼샌드 기호는 치환 명령에서 지정한 패턴과 일치하는 전체 문자열을 가져옵니다. 때때로 문자열의 일부만 가져오고 싶을 때도 있습니다. 그것도 가능합니다만, 약간 까다롭습니다.

`sed` 편집기는 괄호를 사용하여 치환 패턴 내에서 부분 문자열을 정의합니다. 그런 다음, 치환 패턴에서 특수 문자를 사용하여 각 부분 문자열을 참조할 수 있습니다. 
치환 문자에는 백슬래시와 숫자가 포함됩니다. 이 숫자는 부분 문자열의 위치를 나타냅니다. `sed` 편집기는 첫 번째 구성 요소를 `\1`, 두 번째 구성 요소를 `\2`와 같이 할당합니다.

> [!CAUTION]
> 치환 명령에서 괄호를 사용할 때는 이들이 일반 괄호가 아니라 그룹화 문자임을 식별하기 위해 역슬래시(escape character)를 사용해야 합니다. 이는 다른 특수 문자를 이스케이프할 때와 반대입니다.

이 기능을 `sed` 편집기 스크립트에서 사용하는 예를 살펴보겠습니다:

```
$ echo "The System Administrator manual" | sed '
> s/\(System\) Administrator/\1 User/'
The System User manual
$
```

이 치환 명령은 "System"이라는 단어 주위에 괄호를 사용하여 그것을 부분 문자열로 식별합니다. 그런 다음 치환 패턴에서 `\1`을 사용하여 첫 번째로 식별된 구성 요소를 호출합니다. 
이것은 그다지 흥미롭지 않지만, 와일드카드 패턴을 사용할 때 정말 유용할 수 있습니다.

만약 구절을 하나의 단어로 교체해야 하고, 그 단어가 구절의 부분 문자열이라면, 그러나 그 부분 문자열이 와일드카드 문자를 사용하는 경우, 부분 문자열 구성 요소를 사용하는 것은 정말 유용합니다.

```
$ echo "That furry cat is pretty" | sed 's/furry \(.at\)/\1/'
That cat is pretty
$
$ echo "That furry hat is pretty" | sed 's/furry \(.at\)/\1/'
That hat is pretty
$
```

이 상황에서는 전체 일치 패턴을 대체할 수 있는 앰퍼샌드( &) 기호를 사용할 수 없습니다. 부분 문자열 구성 요소가 해결책을 제공하여, 패턴에서 어떤 부분을 치환 패턴으로 사용할지 선택할 수 있습니다.

이 기능은 두 개 이상의 부분 문자열 구성 요소 사이에 텍스트를 삽입해야 할 때 특히 유용할 수 있습니다. 아래는 부분 문자열 구성 요소를 사용하여 긴 숫자 사이에 쉼표를 삽입하는 스크립트입니다:

```
$ echo "1234567" | sed '{
> :start
> s/\(.*[0-9]\)\([0-9]\{3\}\)/\1,\2/
> t start
> }'
1,234,567
$
```

스크립트는 일치하는 패턴을 두 개의 구성 요소로 나눕니다:

```
.*[0-9]
[0-9]{3}
```

이 패턴은 두 개의 하위 문자열을 찾습니다. 첫 번째 하위 문자열은 숫자로 끝나는 문자들의 연속입니다. 두 번째 하위 문자열은 세 자릿수 숫자입니다 (정규 표현식에서 중괄호 사용법에 대해서는 20장을 참조하세요). 
이 패턴이 텍스트에서 발견되면, 교체 텍스트는 두 구성 요소 사이에 쉼표를 넣습니다. 각 구성 요소는 해당하는 위치로 식별됩니다. 이 스크립트는  `test` 명령어를 사용하여 숫자에 쉼표가 모두 삽입될 때까지 반복합니다.




## Placing sed Commands in Scripts
이제 `sed` 편집기의 다양한 부분을 살펴보았으므로, 이를 결합하여 셸 스크립트에서 사용하는 방법을 알아보겠습니다. 이 섹션에서는 bash 셸 스크립트에서 `sed` 편집기를 사용할 때 알아야 할 몇 가지 기능을 설명합니다.



### Using wrappers
`sed` 편집기 스크립트를 구현하는 것이 번거롭다는 것을 느꼈을 수도 있습니다. 특히 스크립트가 길어질 경우 그렇습니다. 
매번 전체 스크립트를 다시 입력하는 대신, `sed` 편집기 명령어를 셸 스크립트 래퍼(wrapper)에 넣을 수 있습니다. 래퍼는 `sed` 편집기 스크립트와 명령줄 간의 중개자 역할을 합니다. 

셸 스크립트 내부에서는 일반적인 셸 변수와 매개변수를 사용하여 `sed` 편집기 스크립트를 사용할 수 있습니다. 다음은 명령줄 매개변수 변수를 `sed` 스크립트의 입력으로 사용하는 예입니다:

```
$ cat reverse.sh
#!/bin/bash
# Shell wrapper for sed editor script.
# to reverse text file lines.
#
sed -n '{ 1!G ; h ; $p }' $1
#
$
```

쉘 스크립트 `reverse`는 `sed` 편집기 스크립트를 사용하여 데이터 스트림에서 텍스트 라인의 순서를 반전시킵니다. 
이 스크립트는 `$1` 셸 매개변수를 사용하여 명령줄에서 첫 번째 매개변수를 가져오는데, 이 값은 반전시킬 파일의 이름이어야 합니다.

```
$ ./reverse.sh data2.txt
This is the last line.
This is the second data line.
This is the first data line.
This is the header line.
$
```

이제 `sed` 편집기 스크립트를 매번 전체 명령어를 다시 입력할 필요 없이 어떤 파일에서든 쉽게 사용할 수 있습니다.


### Redirecting sed output
기본적으로 `sed` 편집기는 스크립트의 결과를 `STDOUT`(표준 출력)으로 출력합니다. 셸 스크립트에서 `sed` 편집기의 출력을 리디렉션하는 모든 표준 방법을 사용할 수 있습니다. 

예를 들어, `$()`를 사용하여 `sed` 편집기 명령의 출력을 변수에 리디렉션하여 나중에 스크립트에서 사용할 수 있습니다. 다음은 숫자 계산 결과에 쉼표를 추가하는 `sed` 스크립트 사용 예입니다:

```
$ cat fact.sh
#!/bin/bash
# Add commas to number in factorial answer
#
factorial=1
counter=1
number=$1
#
while [ $counter -le $number ]
do
factorial=$[ $factorial * $counter ]
counter=$[ $counter + 1 ]
done
#
result=$(echo $factorial | sed '{
:start
s/\(.*[0-9]\)\([0-9]\{3\}\)/\1,\2/
t start
}')
#
echo "The result is $result"
#
$
$ ./fact.sh 20
The result is 2,432,902,008,176,640,000
$
```

정상적인 팩토리얼 계산 스크립트를 사용한 후, 그 결과는 `sed` 편집기 스크립트의 입력으로 사용되어 쉼표가 추가됩니다. 그런 다음 이 값은 `echo` 문에서 사용되어 결과를 출력합니다.




## Creating sed Utilities
지금까지 이 장에서 제시된 간단한 예제들을 통해, `sed` 편집기를 사용하여 다양한 멋진 데이터 형식 작업을 할 수 있다는 것을 보았습니다. 
이번 섹션에서는 일반적인 데이터 처리 기능을 수행하는 몇 가지 유용한 잘 알려진 `sed` 편집기 스크립트를 소개합니다.


### Spacing with double lines
시작으로, 텍스트 파일에서 각 줄 사이에 빈 줄을 삽입하는 간단한 `sed` 스크립트를 살펴보겠습니다:

```
$ sed 'G' data2.txt
This is the header line.

This is the first data line.

This is the second data line.

This is the last line.

$
```

정말 간단하죠! 이 트릭의 핵심은 홀드 공간의 기본 값입니다. `G` 명령은 홀드 공간의 내용을 현재 패턴 공간에 추가하는 역할을 합니다. 
`sed` 편집기를 시작할 때, 홀드 공간은 빈 줄을 포함하고 있습니다. 이 빈 줄을 기존 줄에 추가하면 기존 줄 뒤에 빈 줄이 삽입됩니다.

이 스크립트가 데이터 스트림의 마지막 줄에도 빈 줄을 추가한다는 점을 눈치챘을 것입니다. 파일의 끝에 빈 줄을 추가하지 않으려면, 
부정 기호와 마지막 줄 기호를 사용하여 스크립트가 데이터 스트림의 마지막 줄에 빈 줄을 추가하지 않도록 할 수 있습니다:

```
$ sed '$!G' data2.txt
This is the header line.

This is the first data line.

This is the second data line.

This is the last line.
$
```

이제 좀 더 나아 보입니다. 마지막 줄이 아닌 경우에만 `G` 명령이 홀드 공간의 내용을 추가합니다. `sed` 편집기가 마지막 줄에 도달하면 `G` 명령을 건너뛰게 됩니다.



### Spacing fi les that may have blanks
만약 텍스트 파일에 이미 몇 개의 빈 줄이 있고, 모든 줄을 두 배 간격으로 만들고 싶다면, 이전 스크립트를 사용하면 빈 줄이 이미 있는 부분에서 불필요하게 두 줄씩 추가되는 문제가 발생할 수 있습니다.

```
$ cat data6.txt
This is line one.
This is line two.

This is line three.
This is line four.
$
$ sed '$!G' data6.txt
This is line one.

This is line two.



This is line three.

This is line four.
$
```

이제 원래의 빈 줄 위치에 세 개의 빈 줄이 생겼습니다. 이 문제를 해결하려면 먼저 데이터 스트림에서 빈 줄을 삭제한 후, `G` 명령을 사용하여 모든 줄 뒤에 새 빈 줄을 추가하면 됩니다. 
기존의 빈 줄을 삭제하려면 빈 줄을 찾는 패턴과 함께 `d` 명령을 사용하면 됩니다:

```
/^$/d
```

이 패턴은 시작 줄 태그(캐럿 기호)와 끝 줄 태그(달러 기호)를 사용합니다. 이 패턴을 스크립트에 추가하면 원하는 결과를 얻을 수 있습니다:

```
$ sed '/^$/d ; $!G' data6.txt
This is line one.

This is line two.

This is line three.

This is line four.
$
```

완벽해요! 예상대로 잘 작동합니다.


### Numbering lines in a fi le
19장에서는 데이터 스트림의 각 라인에 대해 등호(=)를 사용하여 라인 번호를 표시하는 방법을 보여주었습니다.

```
$ sed '=' data2.txt
1
This is the header line.
2
This is the first data line.
3
This is the second data line.
4
This is the last line.
$
```

이 방식은 라인 번호가 데이터 스트림의 실제 라인 위에 표시되기 때문에 읽기에 다소 불편할 수 있습니다. 더 나은 해결책은 라인 번호를 텍스트와 동일한 라인에 배치하는 것입니다.

이제 `N` 명령을 사용하여 라인들을 결합하는 방법을 봤으므로, 이 정보를 `sed` 편집기 스크립트에서 활용하는 것은 그리 어렵지 않을 것입니다. 
하지만 이 유틸리티의 요령은 두 명령을 동일한 스크립트에서 결합할 수 없다는 점입니다.

`equal` 명령의 출력을 얻은 후, 해당 출력을 다른 `sed` 편집기 스크립트에 파이프하여 `N` 명령을 사용해 두 라인을 결합할 수 있습니다. 
또한, 줄 바꿈 문자를 공백이나 탭 문자로 대체하기 위해 치환 명령을 사용해야 합니다. 최종 해결책은 다음과 같습니다:

```
$ sed '=' data2.txt | sed 'N; s/\n/ /'
1 This is the header line.
2 This is the first data line.
3 This is the second data line.
4 This is the last line.
$
```

이제 훨씬 나아 보입니다. 이 유틸리티는 프로그램에서 오류 메시지에 사용된 라인 번호를 볼 때 매우 유용하게 사용할 수 있습니다. 

라인 번호를 추가할 수 있는 bash 셸 명령도 있지만, 이 명령은 추가적인 (그리고 원치 않는) 공백을 추가할 수 있습니다:

```
$ nl data2.txt
    1 This is the header line.
    2 This is the first data line.
    3 This is the second data line.
    4 This is the last line.
$
$ cat -n data2.txt
    1 This is the header line.
    2 This is the first data line.
    3 This is the second data line.
    4 This is the last line.
$
```

`sed` 에디터 스크립트는 추가적인 공백 없이 출력을 처리합니다.



### Printing last lines
지금까지 `p` 명령어를 사용하여 데이터 스트림의 모든 라인 또는 특정 패턴에 맞는 라인만 출력하는 방법을 살펴보았습니다. 
만약 긴 목록, 예를 들어 로그 파일의 마지막 몇 줄만 작업하고 싶다면 어떻게 해야 할까요?

달러 기호(`$`)는 데이터 스트림의 마지막 줄을 나타내므로, 마지막 줄만 쉽게 출력할 수 있습니다.

```
$ sed -n '$p' data2.txt
This is the last line.
$
```

이제 데이터 스트림의 마지막에서 지정된 수의 줄을 표시하려면 어떻게 해야 할까요? 그 해답은 "롤링 윈도우"를 만드는 것입니다.

롤링 윈도우는 패턴 공간에서 텍스트 라인 블록을 결합하여 텍스트 라인을 검사하는 일반적인 방법입니다. `N` 명령어를 사용하면, 이미 패턴 공간에 있는 텍스트에 다음 텍스트 라인을 추가할 수 있습니다. 
10개의 텍스트 라인이 패턴 공간에 있으면, 달러 기호(`$`)를 사용하여 데이터 스트림의 끝에 있는지 확인할 수 있습니다. 만약 끝이 아니라면, 계속해서 새로운 라인을 패턴 공간에 추가하면서 원래 라인들은 제거합니다(첫 번째 라인을 삭제하는 `D` 명령어를 기억하세요).

`N`과 `D` 명령어를 반복하면서, 패턴 공간에 새로운 라인을 추가하고 오래된 라인은 제거합니다. 이때, `branch` 명령어가 반복문에 적합합니다. 반복문을 종료하려면 마지막 라인을 식별하고 `q` 명령어를 사용하여 종료할 수 있습니다.

다음은 최종 `sed` 편집기 스크립트 예제입니다:

```
$ cat data7.txt
This is line 1.
This is line 2.
This is line 3.
This is line 4.
This is line 5.
This is line 6.
This is line 7.
This is line 8.
This is line 9.
This is line 10.
This is line 11.
This is line 12.
This is line 13.
This is line 14.
This is line 15.
$
$ sed '{
> :start
> $q ; N ; 11,$D
> b start
> }' data7.txt
This is line 6.
This is line 7.
This is line 8.
This is line 9.
This is line 10.
This is line 11.
This is line 12.
This is line 13.
This is line 14.
This is line 15.
$
```

스크립트는 먼저 현재 라인이 데이터 스트림의 마지막 라인인지 확인합니다. 만약 그렇다면 `quit` 명령어가 반복문을 멈춥니다. 
`N` 명령어는 패턴 공간의 현재 라인에 다음 라인을 추가합니다. `11,$D` 명령어는 현재 라인이 10번째 라인 이후라면 패턴 공간에서 첫 번째 라인을 삭제합니다. 
이는 패턴 공간에서 슬라이딩 윈도우 효과를 생성합니다. 따라서, 이 `sed` 프로그램 스크립트는 `data7.txt` 파일의 마지막 10개 라인만 표시합니다.


### Deleting lines
`sed` 편집기의 또 다른 유용한 기능은 데이터 스트림에서 원하지 않는 빈 라인을 제거하는 것입니다. 빈 라인을 모두 제거하는 것은 쉽지만, 특정 빈 라인만 선택적으로 제거하는 데는 약간의 창의력이 필요합니다. 
이 섹션에서는 데이터에서 원하지 않는 빈 라인을 제거하는 데 도움이 되는 몇 가지 빠른 `sed` 스크립트를 소개합니다.


#### Deleting consecutive blank lines
데이터 파일에서 여분의 빈 라인이 나타나면 번거로울 수 있습니다. 종종 데이터 파일에 빈 라인이 포함되어 있지만, 때때로 데이터 라인이 누락되어 너무 많은 빈 라인이 발생합니다 (앞서 더블 스페이싱 예제에서 보았듯이).  

연속된 빈 라인을 제거하는 가장 쉬운 방법은 범위 주소를 사용하여 데이터 스트림을 확인하는 것입니다. 19장에서 범위 주소를 사용하는 방법과 주소 범위에 패턴을 포함하는 방법을 배웠습니다. 
`sed` 편집기는 지정된 주소 범위 내에서 일치하는 모든 라인에 대해 명령을 실행합니다.  

연속된 빈 라인을 제거하는 핵심은 비어 있지 않은 라인과 빈 라인이 포함된 주소 범위를 만드는 것입니다. `sed` 편집기가 이 범위를 만나면 라인을 삭제하지 않아야 합니다. 
그러나 해당 범위에 일치하지 않는 라인(두 개 이상의 연속된 빈 라인)에는 라인을 삭제해야 합니다.  

이 작업을 수행하는 스크립트는 다음과 같습니다:

```
/./,/ ^ $/!d
```

The range is /./ to  / ^ $/ . The start address in the range matches any line that contains at
least one character. The end address in the range matches a blank line. Lines within this
range aren’t deleted.
Here’s the script in action:

```
$ cat data8.txt
This is line one.


This is line two.

This is line three.



This is line four.
$
$ sed '/./,/^$/!d' data8.txt
This is line one.

This is line two.

This is line three.

This is line four.
$
```

No matter how many blank lines appear between lines of data in the fi le, the output places
only one blank line between the lines.


#### Deleting leading blank lines
It is also a nuisance when data fi les contain multiple blank lines at the start of the fi le.
Often when you are trying to import data from a text fi le into a database, the blank lines
create null entries, throwing off any calculations using the data.

Removing blank lines from the top of a data stream is not a diffi cult task. Here’s the script
that accomplishes that function:

```
/./,$!d
```

The script uses an address range to determine what lines are deleted. The range starts
with a line that contains a character and continues to the end of the data stream. Any line
within this range is not deleted from the output. This means that any lines before the fi rst
line that contain a character are deleted.

Look at this simple script in action:

```
$ cat data9.txt
T

his is line one.

This is line two.
$
$ sed '/./,$!d' data9.txt
This is line one.

This is line two.
$
```

The test fi le contains two blank lines before the data lines. The script successfully removes
both of the leading blank lines, while keeping the blank line within the data intact.


#### Deleting trailing blank lines
Unfortunately, deleting trailing blank lines is not as simple as deleting leading blank lines.
Just like printing the end of a data stream, deleting blank lines at the end of a data stream
requires a little ingenuity and looping.

Before we start the discussion, let’s see what the script looks like:

```
sed '{
:start
/ ^ \n*$/{$d; N; b start }
}'
```

This may look a little odd to you at fi rst. Notice that there are braces within the normal
script braces. This allows you to group commands together within the overall command
script. The group of commands applies to the specifi ed address pattern. The address pattern
matches any line that contains only a newline character. When one is found, if it’s the last
line, the  delete command deletes it. If it’s not the last line, the  N command appends the
next line to it, and the  branch command loops to the beginning to start over.

Here’s the script in action:

```
$ cat data10.txt
This is the first line.
This is the second line.



$ sed '{
> :start
> /^\n*$/{$d ; N ; b start }
> }' data10.txt
This is the first line.
This is the second line.
$
```

The script successfully removed the blank lines from the end of the text fi le.



### Removing HTML tags
These days, it’s not uncommon to download text from a website to save or use as data in an
application. Sometimes, however, when you download text from the website, you also get
the HTML tags used to format the data. This can be a problem when all you want to see is
the data.

A standard HTML web page contains several different types of HTML tags, identifying for-
matting features required to properly display the page information. Here’s a sample of what
an HTML fi le looks like:

```
$ cat data11.txt
<html>
<head>
<title>This is the page title</title>
</head>
<body>
<p>
This is the <b>first</b> line in the Web page.
This should provide some <i>useful</i>
information to use in our sed script.
</body>
</html>
$
```

HTML tags are identifi ed by the less-than and greater-than symbols. Most HTML tags come
in pairs. One tag starts the formatting process (for example,  <b> for bolding), and another
tag stops the formatting process (for example,  </b> to turn off bolding).

Removing HTML tags creates a problem, however, if you’re not careful. At fi rst glance, you’d
think that the way to remove HTML tags would be to just look for a text string that starts
with a less-than symbol (<), ends with a greater-than symbol (>), and has data in between
the symbols:

```
s/<.*>//g
```

Unfortunately, this command has some unintended consequences:

```
$ sed 's/<.*>//g' data11.txt






This is the line in the Web page.
This should provide some
information to use in our sed script.


$
```

Notice that the title text is missing, along with the text that was bolded and italicized.
The  sed editor literally interpreted the script to mean any text between the less-than and
greater-than sign, including other less-than and greater-than signs! Each time the text was
enclosed in HTML tags (such as  <b>first</b> ), the  sed script removed the entire text.

The solution to this problem is to have the  sed editor ignore any embedded greater-than
signs between the original tags. To do that, you can create a character class that negates
the greater-than sign. This changes the script to:

```
s/<[ ^ >]*>//g
```

This script now works properly, displaying the data you need to see from the web page
HTML code:

```
$ sed 's/<[^>]*>//g' data11.txt


This is the page title



This is the first line in the Web page.
This should provide some useful
information to use in our sed script.


$
```

That’s a little better. To clean things up some, you can add a  delete command to get rid of
those pesky blank lines:

```
$ sed 's/<[^>]*>//g ; /^$/d' data11.txt
This is the page title
This is the first line in the Web page.
This should provide some useful
information to use in our sed script.
$
```

Now that’s much more compact; there’s only the data you need to see.


# Summary
The  sed editor provides some advanced features that allow you to work with text patterns
across multiple lines. This chapter showed you how to use the  next command to retrieve
the next line in a data stream and place it in the pattern space. Once in the pattern space,
you can perform complex  substitution commands to replace phrases that span more
than one line of text.

The multiline  delete command allows you to remove the fi rst line when the pattern space
contains two or more lines. This is a convenient way to iterate through multiple lines in
the data stream. Similarly, the multiline  print command allows you to print just the fi rst
line when the pattern space contains two or more lines of text. The combination of the
multiline commands allows you to iterate through the data stream and create a multiline
substitution system.

Next, we covered the hold space. The hold space allows you to set aside a line of text while
processing more lines of text. You can recall the contents of the hold space at any time and
either replace the text in the pattern space or append the contents of the hold space to the
text in the pattern space. Using the hold space allows you to sort through data streams,
reversing the order of text lines as they appear in the data.

Next we reviewed the various  sed editor fl ow control commands. The  branch command
provides a way for you to alter the normal fl ow of  sed editor commands in the script,
creating loops or skipping commands under certain conditions. The  test command pro-
vides an  if-then type of statement for your  sed editor command scripts. The  test
command branches only if a prior  substitution command succeeds in replacing text
in a line.

The chapter concluded with a discussion of how to use  sed scripts in your shell scripts. A
common technique for large  sed scripts is to place the script in a shell wrapper. You can
use command line parameter variables within the  sed script to pass shell command line
values. This creates an easy way to utilize your  sed editor scripts directly from the com-
mand line, or even from other shell scripts.

The next chapter digs deeper into the  gawk world. The  gawk program supports many
features of higher-level programming languages. You can create some pretty involved data
manipulation and reporting programs just by using  gawk  . The chapter describes the vari-
ous programming features and demonstrates how to use them to generate your own fancy
reports from simple data.














