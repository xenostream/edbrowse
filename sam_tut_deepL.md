# A tutorial for the sam command language


<br><br><br><br>
*Rob Pike*
<br><br>


**ABSTRACT**

> [!NOTE]
> sam은 정규 표현식을 많이 사용하는 명령 언어를 사용하는 대화형 텍스트 편집기입니다. 이 명령 언어는 구문상으로는 ed(1) 와 비슷하지만 세부 사항은
> 흥미롭게도 다릅니다. 이 튜토리얼에서는 명령 언어를 소개하지만 화면 및 마우스 인터페이스에 대해서는 설명하지 않습니다. 9번째 버전 Blit 소프트웨어에 
> 익숙하지 않은 분들께 죄송하지만, 이 수준에서는 샘과 mux(9) 의 유사성 때문에 sam의 마우스 언어는 쉽게 익힐 수 있다고 가정합니다.
> 
> sam 명령 언어는 일반 터미널 환경에서 sam 을 실행할 때 (```sam -d``` 를 통해) 와 다운로드한 sam 의 명령창 즉, 비트맵 디스플레이와 마우스를 사용하는 두 가지 환경에 동일하게 적용됩니다.

<br><br><br><br>

**Table of Contents**
- [Introduction](#Introduction)
- [Text](#Text)
- [Addresses](#Addresses)
- [Loops](#Loops)
- [Conditionals](#Conditionals)
- [Composition](#Composition)
- [Grouping](#Grouping)
- [Multiple Changes](#Multiple-Changes)
- [Unix](#Unix)
- [A few other text commands](#A-few-other-text-commands)
- [Files](#Files)

  <br><br><br><br>

# Introduction
이 튜토리얼에서는 Blits 및 비트맵 디스플레이가 있는 일부 컴퓨터에서 실행되는 대화형 텍스트 편집기인 sam 의 **명령 언어** (*command language*) 를 설명합니다. 대부분의 편집 작업은 
마우스 기반 편집 기능으로 충분하며, 사용하기 쉽고 배우기 쉽습니다.

그러나, 이 명령 언어는 특히 ```전역 변경 작업``` 을 처리할 때 유용할 때가 많습니다. 변경 작업에 필요한 ed 명령 언어와 달리, sam 의 명령 언어는 복잡하거나 반복적인 편집 작업에 사용되는 경향이 있습니다. 
sam 과 다른 텍스트 편집기의 차이점이 가장 분명하게 드러나는 것은 바로 이러한 복잡한 용도에서입니다.

sam 의 명령 언어를 사용하면 ```sed``` 나 ```awk``` 같은 프로그램을 포함한 다른 편집기에서는 우아하게 처리하지 못하는 몇 가지 작업을 쉽게 수행할 수 있으므로 
이 튜토리얼은 부분적으로 sam 의 텍스트 조작 방식에 대한 교훈을 제공하는 역할을 합니다. 따라서, 아래 예제에서는 sam 에서 마우스를 사용하는 기능이 최악의 경우 
쉽게 익힐 수 있다고 가정하며 명령 언어에 대해 전적으로 집중합니다. 실제로 sam 은 ```-d``` 플래그를 지정하여 마우스를 전혀 사용하지 않고(다운로드하지 않고) 
실행할 수 있으며, 이 튜토리얼에서 다루는 영역은 바로 이 모드이며, 이 모드에서의 명령 언어는 동일합니다.

> [!IMPORTANT]
> **유닉스 숙련자를 위한 한마디:** sam 은 구문상으로는 ed 와 매우 유사하지만, 설계와 세부 의미론에서 근본적으로 그리고 의도적으로 다릅니다. 
> 대체 명령의 작동 방식을 예측하기 위해 ed 에 대한 지식을 사용할 수 있지만, sam 의 작동 방식에 대한 이해가 어느 정도 있어야만 예측이 정확할 수 있습니다. **관용구** 에 특히 주의하시기 바랍니다.
> 관용구는 명령 언어의 흥미로운 구석에서 형성되며 신뢰할 수 없는 특성에 의존합니다. ```1,$s/a/b/```  명령은 한 라인당 하나가 아> 니라 파일 전체 범위에서 하나의 치환을 만듭니다.
> sam 에는 이런 고유한 관용구가 있습니다. 이 튜토리얼의 목적 대부분은 이러한 관용구를 게시하고 sam 을 유창하게 사용하는 것이 교활한 것이 아니라 학습의 문제로 만드는 것입니다.

이 튜토리얼은 정규식에 익숙해야 하지만, 기존 Unix 편집기를 사용해 본 경험이 있다면 도움이 될 수 있습니다. ed 에 익숙한 독자를 돕기 위해 대괄호 ```[]``` 로 
ed 와 sam 의 몇 가지 차이점을 지적했습니다. 이 설명은 sam 과 ed 의 차이점을 이해하고자 하는 경우에만 읽으시기 바랍니다. 또 다른 타이포그래피 규칙은 출력은 
이 글꼴로 표시되는 반면, 사용자의 입력은 비스듬한 텍스트로 표시된다는 것입니다.

> [!NOTE]
**명명법:** sam 은 현재 편집 중인 텍스트의 사본을 보관합니다. 이 사본을 **파일** 이라고 합니다. 혼동을 피하기 위해 디스크의 영구 저장소를 **Unix 파일** 이라고 부릅니[다.

[⬆️](#top)
<br><br><br><br>

# Text
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

```sam -d``` 로 sam 을 실행합니다. **a** (*add* 또는 *append*) 명령은 마침표만 포함된 줄까지 텍스트를 추가하고, **현재 텍스트** (점이라고도 함)를 입력한 내용 (**a** 명령과 마침표 명령 사이의 모든 것) 으로 설정합니다. 

> [!TIP]
[ed는 현재 주소를 마지막 줄에만 설정합니다.] 

**p** (*print*) 명령은 **현재 텍스트** 를 출력합니다:

```
p
This manual is organized in a rather haphazard manner. The first
several sections were written hastily in an attempt to provide a
general introduction to the commands in Emacs and to try to show
the method in the madness that is the Emacs command structure.
```

> [!TIP]
[다시 말하지만, ed는 마지막 줄만 출력합니다.] 

**a** 명령은 점 ```뒤에``` 텍스트를 추가하고, **i** 명령은 **a** 와 같지만, 점 ```앞에``` 텍스트를 추가합니다.

```
i
Introduction
.
p
Introduction
```

**현재 텍스트** 를 변경(바꾸기)하는 **c** (*change*) 명령과 삭제하는 **d** (*delete*) 명령도 있으며, 아래에 설명되어 있습니다.

파일의 모든 텍스트를 보려면 출력할 텍스트를 지정할 수 있는데, 지금은 단지 ```0,$``` 가 **전체 파일** 을 지정한다고 생각하면 충분합니다. 

> [!TIP]
[일반 ed 사용자는 ```1,$``` 를 입력할 수도 있지만 실제로는 동일합니다.]

```
0,$p
Introduction
This manual is organized in a rather haphazard manner. The first
several sections were written hastily in an attempt to provide a
general introduction to the commands in Emacs and to try to show
the method in the madness that is the Emacs command structure.
```

아래에 설명된 **w** (*write*) 명령을 제외한 모든 명령 (**p** 명령 포함) 은 터치하는 텍스트에 점을 설정합니다. 따라서, **a** 와 **i** 는 새 텍스트로, 
**p** 는 출력된 텍스트로 설정하는 등의 방식으로 dot (점) 을 설정합니다. 마찬가지로, 모든 명령 (**w** 명령 제외) 은 기본적으로 현재 텍스트에서 작동합니다.

> [!TIP]
[일부 명령 (예: **g**) 이 전체 파일 범위로 기본 설정되는 ed 와 다릅니다.]

점을 사용자가 임의로 설정할 수 있을 때까지는 상황이 그리 흥미롭지 않을 것입니다. 이 작업은 파일의 일부를 지정하는 **주소** 로 수행됩니다. 예를 들어, 
주소 **1** 은 파일의 첫 번째 줄에 점을 설정합니다.

```
1p
Introduction
c
Preamble
.
```

여기서 사용한 **c** 명령은 별도로 점을 지정할 필요가 없습니다. 왜냐하면, 이전 **p** 명령으로 첫 번째 줄에 점이 설정되어 있기 때문입니다. 따라서, 
첫 번째 줄은 완전히 삭제하고 마지막 명령은 첫 번째 줄에 점을 남겨두면 됩니다:

```
d
1p
This manual is organized in a rather haphazard manner. The first
```

(파일 변경 사항을 반영하여 줄 번호가 변경됩니다.)

주소 ```/text/``` 는 점 이후에 나타나는 첫 번째 텍스트에 점을 설정합니다. 

> [!TIP]
[ed는 텍스트가 포함된 첫 줄과 일치합니다.] 

만약, 텍스트를 찾을 수 없는 경우, 검색은 파일의 시작 부분에서 다시 시작하여 점까지 계속됩니다.

```
/Emacs/p
Emacs
```

타이포그래피로 표시하기는 어렵지만, 이 예제에서는 ```Emacs``` 뒤에 개행 문자가 나타나지 않으므로, 출력할 텍스트는 정확히 ```Emacs``` 라는 문자열입니다. 
(마지막 **p** 명령은 생략할 수 있으며 **기본 명령** 입니다. 그러나, 다운로드 모드의 기본값은 텍스트를 선택하고 강조 표시하며, 필요한 경우 해당 파일로 
창을 이동하여 텍스트를 살펴볼 수 있도록 처리하는 것입니다. 따라서, ```/Emacs/``` 는 디스플레이에 텍스트의 다음 항목을 표시합니다.)

```haphazard``` 라는 단어를 ```thoughtless``` 라는 단어로 바꾸고 싶다고 가정합니다. 물론 다른 **c** 명령이 필요하지만, 지금까지 텍스트를 삽입하는 데 사용된 
방법에는 개행 문자가 직접 포함되어 있습니다. 개행 문자 없이 텍스트를 포함하는 구문은 슬래시 문자로 해당 텍스트를 둘러싸는 것입니다. 
(텍스트 검색 구문과 동일하지만, 문맥에서 무슨 일이 일어나고 있는지 명확해야 함) 또한, 텍스트는 **c** (또는 **a** 또는 **i**) 바로 뒤에 나타나야 합니다.

이런 처리 방식을 감안하면 필요한 변경을 쉽게 할 수 있습니다:

```
/haphazard/c/thoughtless/
1p
This manual is organized in a rather thoughtless manner. The first
```

> [!TIP]
[텍스트가 한 줄보다 작은 경우에도 항상 **c** 명령으로 변경할 수 있습니다.] 

명령에 텍스트를 직접 제공하는 이런 방식이 라인 단위 처리 구문보다 훨씬 더 일반적이라는 것을 알게 될 것입니다. 

텍스트에 슬래시 ```/``` 를 포함하려면 슬래시 문자 앞에 백슬래시 ```\``` 를 붙여 백슬래시 문자 자체를 보호합니다.

```
/Emacs/c/Emacs\\360/
4p
general introduction to the commands in Emacs\360 and to try to show
```

다음과 같은 방법으로도 이 특정 변경을 수행할 수 있습니다.

```
/Emacs/a/\\360/
```

마지막 명령을 ```실행 취소``` 하는 **u** (*undo*) 명령을 소개하기에 가장 좋은 위치입니다. 두 번째 **u** 명령은 두 번째 명령을 실행 취소하는 방식으로 
실행 취소합니다.

```
u
4p
general introduction to the commands in Emacs and to try to show
u
3p
This manual is organized in a rather haphazard manner. The first
```

실행 취소는 백업만 가능하며 이전 실행을 취소할 수 있는 방법은 없습니다.

[⬆️](#top)
<br><br><br><br>

# Addresses
가장 간단한 형태의 **주소** 에 대해 살펴봤지만, 더 깊이 들어가기 전에 배워야 할 것이 더 있습니다. 

주소는 파일에서 **영역 (하위 문자열)을 선택** 하므로, 영역의 시작과 끝을 정의해야 합니다. 따라서, 주소 ```13``` 은 13번째 줄의 시작부터 
13번째 줄의 끝까지 선택하며, ```/Emacs/``` 주소는 ```Emacs``` 라는 단어의 시작부터 끝까지 선택합니다.

주소는 쉼표와 결합할 수 있습니다:

```
13,15
```

이 범위 주소는 13 ~ 15 번째 줄을 선택합니다. 쉼표 연산자의 정의는 왼쪽 주소의 시작 (13번째 줄의 시작) 부터 오른쪽 주소의 끝 (15번째 줄의 끝) 까지 
선택하는 것입니다.

```.``` (마침표)는 **현재 텍스트** 인 점을 나타내고, ```0``` (0번째 줄)은 파일의 시작 부분에 있는 널 문자열을 선택하며, ```$``` 는 파일의 마지막 줄이 
아닌 파일의 끝 부분에 있는 널 문자열을 선택합니다. 따라서,

```
0,13
```

주소는 파일의 시작부터 13번째 줄 끝까지 선택합니다,

```
.,$
```

주소는 현재 텍스트의 시작부터 파일 끝까지 선택하고

```
0,$
```

주소는 **전체 파일** [즉, 파일의 모든 줄 목록이 아닌, 전체 파일을 포함하는 단일 문자열] 을 선택합니다.

이들은 모두 **절대 주소** 로, 파일의 특정 위치를 가리킵니다. sam 에는 dot의 값에 따라 달라지는 **상대 주소** 도 있으며, 실제로 우리는 이미 한 가지 
형태를 보았습니다: 

```/Emacs/``` 는 dot에서 이후 방향으로 검색하고 ```Emacs``` 의 첫 번째 항목을 찾습니다. 어떤 ```Emacs``` 를 찾는지는 dot의 값에 따라 달라집니다. 

점 앞에 첫 번째 항목을 찾으려면 어떻게 해야 할까요? 패턴 앞에 마이너스 기호를 붙여 검색 방향을 반대로 검색하면 됩니다:

```
-/Emacs/
```

실제로 정방향 검색의 전체 구문은 다음과 같습니다.

```
+/Emacs/
```

즉, ```+``` 문자를 사용하지만 더하기 기호는 기본값이며 실제로는 거의 사용되지 않습니다. 다음은 명확성을 위해 더하기 문자가 포함된 예제입니다:

```
0+/Emacs/
```

이 명령은 파일에서 처음 나오는 ```Emacs``` 를 선택하므로, **0 라인으로 이동한 다음, ```Emacs``` 를 앞방향으로 검색합니다.** 로 읽습니다.

```+``` 문자는 **선택 사항** 이므로, ```0/Emacs/`` 라고 쓸 수 있습니다. 이와 마찬가지로,

```
$-/Emacs/
```

이 명령은 파일에서 마지막 항목을 찾습니다.

```
0/Emacs/,$-/Emacs/
```

이 명령은 첫 번째부터 마지막 ```Emacs``` 까지 텍스트를 선택합니다. 다음은 조금 더 흥미롭습니다:

```
/Emacs/+/Emacs/
```

(시작 부분에 암시적인 ```.+``` 주소가 있음) 이 명령은 점 다음에 오는 두 번째 ```Emacs``` 을 선택합니다.

또한, 줄 번호는 상대적일 수도 있습니다.

```
-2
```

이 명령은 두 번째 이전 줄을 선택하고

```
+5
```

이 명령은 다음 다섯 번째 줄을 선택합니다. (여기서 더하기 기호는 필수입니다.)

주소는 두 개 이상의 줄을 선택할 수 있으므로, **이전** 과 **다음** 에 대한 정의가 필요합니다.

**이전** 은 ```점의 시작 전을 의미``` 하고, **다음** 은 ```점의 끝을 의미``` 합니다.

예를 들어, 파일에 ```AAAA``` 가 포함되어 있고, 점(dot)이 가운데 두 번째의 ```A``` (기울어진 문자) 로 설정된 경우, ```-/A/``` 명령은 
첫 번째 ```A``` 에, ```+/A/``` 명령은 마지막 ```A``` 문자에 점을 설정합니다. 

아주 이상한 상황 (파일에서 텍스트가 이미 현재 텍스트인 경우 등) 을 제외하고는 검색에서 선택한 텍스트는 점과 분리되어 검색됩니다.

점 문자가 포함된 troff -ms 문서에서 길이가 아무리 길어도 단락 부분을 선택하려면 다음과 같이 실행합니다.

```
-/.PP/,/.PP/-1
```

이 경우, 단락을 시작하는 ```.PP``` 는 포함하고 단락을 끝내는 ```.PP``` 는 제외합니다.

상대 줄 번호 주소를 입력할 때, 기본 번호는 **1** 이므로, 다음과 같이 조금 더 간단하게 작성할 수 있습니다:

```
-/.PP/,/.PP/-
```

주소 ```+1-1``` 또는 이에 상응하는 ```+-``` 는 무엇을 의미할까요? 아무것도 처리하지 않는 것처럼 보이지만, **점은 완전한 텍스트 줄일 필요는 없다** 는 
것을 기억하시기 바랍니다. 

```+1``` 은 현재 텍스트의 끝 부분 뒤의 줄을 선택하고, ```-1``` 은 시작 부분 앞의 줄을 선택합니다. 따라서, ```+1-1``` 은 점 끝 이후의 줄 앞의 줄 
즉, 점 끝이 포함된 완전한 줄을 선택합니다. 이 구조를 사용하여 선택 영역을 확장하여 전체 줄을 포함하도록 처리할 수 있습니다. (예: ```Emacs``` 가 포함된 
파일의 첫 번째 줄)

```
0/Emacs/+-p
```

일반적인 소개를 하면 ```Emacs``` 를 검색한 후 포함된 라인을 출력하는 것이고, ```+-``` 주소는 **sam 의 관용구*** 입니다.

[⬆️](#top)
<br><br><br><br>

# Loops
위에서 ```Emacs``` 의 한 인스턴스를 ```Emacs\360``` 으로 변경했지만, 만약 편집기 이름이 실제로 변경되는경우 단일 명령으로 이름의 모든 인스턴스를 
변경하는 것이 매우 유용합니다. sam 은 이런 작업을 처리하기 위해 **x** (*extract*)라는 명령을 제공합니다. 

구문은 ```x/pattern/command``` 입니다. 선택한 텍스트에서 해당 패턴이 나타날 때마다 **x** 명령은 해당 패턴에 점을 설정하고 명령을 실행합니다. 

예를 들어, 다음은 ```Emacs``` 를 ```vi``` 로 변경합니다.

```
0,$x/Emacs/c/vi/
0,$p
This manual is organized in a rather haphazard manner. The first
several sections were written hastily in an attempt to provide a
general introduction to the commands in vi and to try to show
the method in the madness that is the vi command structure.
```

이 방법은 현재 텍스트 (```0,$``` - 전체 파일) 를 텍스트 인수 (```Emacs```)의 출현으로 세분한 다음, 해당 텍스트에 점을 설정하고 뒤에 오는 명령 (```c/vi/```) 을
 실행하는 방식으로 작동합니다. 이것은 **파일내의 ```Emacs``` 의 모든 항목을 찾은 다음, 각 항목에 대해 현재 텍스트를 해당 항목으로 점을 설정하고 ```c/vi/``` 
 명령을 실행하면 현재 텍스트가 ```vi``` 로 바뀝니다** 로 읽을 수 있습니다. 
 
[이 명령은 ed의 **g** 명령과 다소 유사합니다. 차이점은 아래에서 설명하지만 기본 주소는 항상 그렇듯이 파일 전체가 아닌 점이라는 점을 유의하시기 바랍니다.]

**x** 명령이 얼마나 수 많은 변경을 수행했는지에 관계없이 한 번의 **u** 명령으로 **x** 명령을 실행 취소할 수 있습니다.

```
u
0,$p
This manual is organized in a rather haphazard manner. The first
several sections were written hastily in an attempt to provide a
general introduction to the commands in Emacs and to try to show
the method in the madness that is the Emacs command structure.
```

물론 **x** 명령에서 실행할 수 있는 명령은 **c** 명령만 아닙니다. **a** 명령을 사용하여 ```Emac``` 에 독점적인 ```{TM}``` 표시를 할 수도 있습니다:

```
0,$x/Emacs/a/{TM}/
/Emacs/+-p
```

명령에 대한 일반적인 소개와 [ed의 ```g/Emacs/s//&{TM}/p``` 처럼 변경이 일어난 상황을 살펴볼 수 있는 방법은 없습니다. 아래 다중 변경 섹션 참조] **p** 명령은 
**x** 명령으로 구동할 때라도 유용하지만 의미 전달 방법에는 주의해야 합니다.

```
0,$x/Emacs/p
EmacsEmacs
```

**x** 명령은 슬래시 문자안의 텍스트에 점을 설정하므로, 해당 텍스트만 출력한다는 것은 그다지 유익하지 않습니다. 하지만, **x** 명령에는 주소를 포함할 수 있습니다.
 
예를 들어, ```Emacs``` 가 포함된 모든 줄을 출력하려면 ```+-``` 관용구를 사용하면 됩니다:

```
0,$x/Emacs/+-p
general introduction to the commands in Emacs{TM} and to try to show
the method in the madness that is the Emacs{TM} command structure.
```

마지막으로 다른 **x** 명령으로 파일 상태를 복원하고 편리한 단축키를 사용해 보겠습니다. 

쉼표만 사용한 주소에서 왼쪽 기본값은 **0** 이고, 오른쪽 기본값은 **$** 이므로 입력하기 쉬운 ```단일 쉼표 주소는 전체 파일``` 을 가리킵니다:

```
,x/Emacs/ /{TM}/d
,p
This manual is organized in a rather haphazard manner. The first
several sections were written hastily in an attempt to provide a
general introduction to the commands in Emacs and to try to show
the method in the madness that is the Emacs command structure.
```

위에서 **x** 명령이 무엇을 처리하는지 주목하시기 바랍니다. ```Emacs``` 가 나타날 때마다 뒤에 오는 ```{TM}``` 을 찾아 삭제합니다.

sam 에서 주소와 **x** 명령어의 검색 구문에 허용한 ```텍스트``` 는 단순한 텍스트가 아니라, **정규식** 입니다. 유닉스에는 정규식에 대한 여러 가지 해석이 
있습니다. sam 에서 사용한 형식은 그룹화를 위한 괄호 ```()``` 와 문자열을 병렬로 일치시키기 위한 ```|``` 를 포함하는 정규식(6)의 형식입니다. 

또한, sam 은 문자 시퀀스 ```\n``` 과 ```개행 문자``` 를 동일하게 처리합니다. **a** 및 **c** 명령에 사용하는 대체 텍스트는 여전히 일반 텍스트이지만, 
해당 문맥에서 ```\n ``` 시퀀스는 ```개행 문자``` 를 나타냅니다.

다음은 예제입니다. 만약, 문서의 공백을 두 배 크기로 늘려 모든 줄을 두 줄로 바꾸고 싶다고 가정하겠습니다. 다음 예제 모두 이 작업을 수행합니다:

```
,x/\n/ a/\n/
,x/\n/ c/\n\n/
,x/$/ a/\n/
,x/ˆ/ i/\n/
```

마지막 예제는 각 줄 앞에 개행 문자를 넣지만, 다른 예제는 개행 문자를 뒤에 넣기 때문에 약간 다릅니다. 앞의 두 예제는 개앵 문자를 직접 조작하지만, 
마지막 두 예제는 정규식을 사용합니다. 즉, ```$``` 는 줄 끝에 있는 빈 문자열이고, ```ˆ``` 은 시작 부분에 있는 빈 문자열입니다.

이러한 솔루션에는 모두 단점이 있습니다. 이미 빈 줄이 있는 경우 (즉, 두 줄이 연속된 경우) 훨씬 더 큰 줄 (네 줄이 연속된 경우) 이 만들어집니다. 

좀 더 나은 처리 방법은 모든 줄 바꿈 그룹을 하나씩 확장하는 것입니다:

```
,x/\n+/ a/\n/
```

정규식 연산자 ```+``` 는 **하나 이상** 을 의미하므로```\n+``` 는 ```\n\n*``` 와 동일합니다. 따라서, 이 예에서는 모든 줄바꿈 시퀀스를 취하고 끝에 다른 줄바꿈을 추가합니다.

좀 더 일반적인 예로는 탭 스톱으로 텍스트 블록을 들여쓰는 것입니다. 첫 번째 방법이 가장 깔끔하지만 다음 방법도 모두 작동합니다. (슬래시 안의 빈 텍스트는 탭입니다)

```
,x/ˆ/a/ /
,x/ˆ/c/ /
,x/.*\n/i/ /
```

마지막 예는 ```.*\n``` 패턴 (sam 관용구) 을 사용하여 줄을 일치시킵니다: ```.*``` 는 개행 문자가 아닌 문자의 가능한 한 가장 긴 문자열과 일치합니다. 

시작 부분에 추가한 탭 문자를 제거하는 것도 마찬가지로 쉽습니다:

```
,x/ˆ /d
```

이 예제에서는 주소 (전체 파일) 를 지정했지만 실제로는 주소 지정 없이 마우스로 텍스트를 선택하여 설정한 점 값을 사용해서 이와 같은 명령이 실행될 가능성이 더
높습니다.


[⬆️](#top)
<br><br><br><br>


# Conditionals
**x** 명령은 정규식이 일치할 때마다 일치하는 항목을 추출 (dot으로 설정) 하고 명령을 실행하는 **반복 구조** 입니다. 

또한, 조건부 명령인 ```g/pattern/command``` 는 **dot의 값을 변경하지 않고**, dot에 일치하는 패턴이 포함되어 있다면 명령을 실행하는 **조건부 구조** 입니다. 
그 반대인 **v** 명령은 dot에 일치하는 패턴이 포함되어 있지 않으면 명령을 실행 합니다. (문자 **g** 와 **v** 는 역사적인 의미이며 니모닉에 의미가 없습니다. 
**g** 를 ```guard``` 라고 생각하시면 됩니다.) 

[ed 사용자는 위의 명령에 대한 정의를 주의 깊게 읽어야 합니다. sam의 **g** 명령은 ed의 그것과는 근본적으로 다릅니다.] 

다음은 **x** 와 **g** 명령의 차이점에 대한 예시입니다:

```
,x/Emacs/c/vi/
```

이 명령은 파일에서 ```Emacs``` 라는 단어가 나올 때마다, ```vi``` 라는 단어로 변경하지만

```
,g/Emacs/c/vi/
```

이 명령은 파일에 ```Emacs``` 라는 단어가 있으면 전체 파일을 ```vi``` 로 변경합니다.

이들 명령 중 어느 것도 단독으로 사용하면 특별히 흥미롭지는 않지만, **x** 명령과 결합해 사용하면 그자체로 매우 유용합니다.

[⬆️](#top)
<br><br><br><br>

# Composition
**X** 명령에 대해 한 가지 생각할 수 있는 방법은 선택 (점 값) 이 주어지면 흥미로운 하위 선택 (점 안의 값) 을 반복한다는 것입니다. 

즉, 텍스트 한 조각을 가져와서 좀 더 작은 조각으로 잘라내는 것입니다. 그러나, 잘라낸 텍스트는 이미 이전 **x** 명령으로 잘라낸 조각이거나, **g** 명령에 의해 
선택된 조각일 수 있습니다. sam 의 가장 흥미로운 속성은 특정 작업을 수행하기 위해 일련의 명령을 정의하는 기능입니다. [^1] 


[^1]: 개별 sam 명령은 모두 동일한 텍스트에 대해 작업하기 때문에 셸 파이프라인과의 명백한 비유는 부분적으로만 유효하며, 변경되는 것은 텍스트가 분할되는 방식일 뿐입니다.

간단한 예로는 ```Emacs``` 의 모든 발생을 ```emacs``` 로 변경하는 것입니다.

```
,x/Emacs/ c/emacs/
```

위와 같이 처리해도 되지만, **x** 명령을 추가로 사용하면 ```Emacs``` 단어를 다시 입력하지 않아도 됩니다:

```
,x/Emacs/ x/E/ c/e/
```

(공백을 사용해 한 줄에서 명령들을 구분하면 보다 읽기 쉽게 만들 수 있습니다.) 이 명령은 ```Emacs (,x/Emacs/)``` 의 모든 항목을 찾은 다음, 해당 텍스트에 
점을 설정한 상태에서 다시 문자 ```E(x/E/)``` 의 모든 항목을 찾은 다음, 해당 텍스트에 점을 설정한 상태에서 ```c/e/``` 명령을 실행하여 문자를 소문자로 
변경하는작업을 처리합니다. 

명령의 주소 (쉼표로 지정된 전체 파일) 는 명령 가장 왼쪽 부분에만 주어지며, 나머지 부분에서는 왼쪽에 있는 부분을 실행하면 점으로 설정됩니다.

또 다른 간단한 예제로, 위에서 이미 해결한 문제인 ```Emacs``` 라는 단어가 포함된 파일의 모든 줄을 출력하는 문제를 생각해 보겠습니다:

```
,x/.*\n/ g/Emacs/p
general introduction to the commands in Emacs and to try to show
the method in the madness that is the Emacs command structure.
```

이 명령은 파일을 줄 (```,x/.*\n/```) 로 나누고, 문자열 ```Emacs (g/Emacs/)``` 가 포함된 각 줄에 대해 해당 줄에 점을 설정한 상태에서 **p** 명령을 
실행하면 줄이 출력됩니다. (Emacs와 일치하지 않음) 

타이핑을 절약하기 위해 ```.*\n``` 은 **x** 명령에서 사용하는 일반적인 패턴이므로 **x** 뒤에 공백이 바로 위치하면 ```.*\n``` 패턴으로 가정합니다. 따라서, 
위의 명령은 다음과 같이 좀 더 간결하게 작성할 수 있습니다:

```
,x g/Emacs/p
```

이전까지 사용했던 방법은 다음과 같습니다.

```
,x/Emacs/+-p
```

파일에 있는 일치하는 각각의 ```Emac``` 에 점을 설정하여 ```+-p``` 명령을 실행합니다. (관용구 ```+-p``` 는 점의 끝이 포함된 줄을 출력한다는 점을 기억하시기 바랍니다.)

두 명령은 일반적으로 동일한 결과를 생성합니다. (```+-p``` 형식은 ```Emacs``` 가 두 번 포함된 경우 한 줄을 두 번 출력합니다.) 

과연 어느 것이 더 나을까요? 만약, 파일이 크고 문자열 발생 횟수가 적은 경우에는 ```x/Emacs/+-p``` 가 입력하기 쉽고 훨씬 빠르지만, 이것은 정말 이상하고 특수한 경우입니다. 
각 줄을 개별적으로 분리한 다음, 일치하는지 검사하므로 속도가 좀 느리지만 개념적으로 더 깔끔하고 일반화하기가 더 쉽습니다. 

예를 들어, 다음 Emacs 매뉴얼을 살펴보겠습니다:

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

이 텍스트는 비어 있지 않은 줄의 그룹으로 구성되며, 각 그룹내의 텍스트 형식은 간단합니다. ```apropos``` 명령에 대한 설명을 찾고 싶다고 가정하겠습니다. 여기서 
문제는 파일을 개별적인 설명으로 나눈 다음, ```apropos``` 에 대한 설명을 찾아 출력하는 것입니다. 해결책은 간단합니다:

```
,x/(.+\n)+/ g/command name="apropos"/p
command name="apropos", key="ESC-?"
Prompts for a keyword and then prints a list of those commands
whose short description contains that keyword. For example,
if you forget which commands deal with windows, just type
"@b[ESC-?]@t[window]@b[ESC]".
```

정규식 ```(.+\n)+``` 는 각각 하나 이상의 줄 즉, 빈 줄 사이의 텍스트와 하나 이상의 문자를 일치시키므로 ```,x/(.+\n)+/``` 는 각 설명을 추출한 다음, 
```g/command name="apropos"/``` 는 ```apropos``` 에 대한 설명만 선택하고 **p** 명령은 이를 출력합니다.

변수 ```n``` 이 포함된 C프로그램이 있는 데 이를 ```num``` 으로 변경하고 싶다고 가정하겠습니다. 다음 명령은 첫 번째 도전입니다:

```
,x/n/ c/num/
```

하지만, 식별자 ```n``` 뿐만아니라, 파일내의 모든 ```n``` 문자를 변경한다는 점에서 명백한 결함이 있습니다. 

좀 더 나은 해결책은 **x** 명령을 사용하여 식별자를 먼저 추출한 다음, **g** 명령을 사용하여 ```n``` 을 찾는 것입니다:

```
,x/[a-zA-Z_][a-zA-Z_0-9]*/ g/n/ v/../ c/num/
```

비록 보기에는 끔찍해 보이겠지만, 왼쪽에서 오른쪽으로 차례대로 읽어보면 꽤 쉽게 이해할 수 있습니다. C언어에서 식별자 (*identifier*) 는 영숫자 또는 밑줄 뒤에 
0개 이상의 영숫자 또는 밑줄 즉, 정규식 ```[a-zA-Z_][a-zA-Z_0-9]*``` 으로 표현할 수 있습니다. **g** 명령은 ```n``` 이 포함된 식별자만 선택하며, **v** 명령은 
두 개 이상의 문자가 포함된 식별자는 거부하는 트릭을 사용합니다. 따라서, ```c/num/``` 명령은 독립된 ```n``` 식별자에만 적용됩니다.

여기서도 여전히 문제가 있습니다. 문자 상수 ```\n``` 의 일부인 ```n``` 은 변경하고 싶지 않다는 것입니다.

**x** 명령을 보완하는 명령인 **y** 가 있는 데, 바로 이 명령이 지금 필요합니다. 

```y/pattern/command``` 구문은 패턴과 일치하는 텍스트 조각에 대해 명령을 실행합니다. **x** 명령이 선택한다면, **y** 명령은 거부합니다. 

다음 예제는 최종으로 구성한 명령입니다:

```
,y/\\n/ x/[a-zA-Z_][a-zA-Z_0-9]*/ g/n/ v/../ c/num/
```

```y/\\n/``` (일반 리터럴 문자로 만들기 위해 백슬래시를 두 번 사용) 는 두 문자 시퀀스인 ```\n``` 을 처리 대상에서 제외하므로, 나머지 명령은 이 시퀀스는 
전혀 건드리지 않습니다. 

예를 들어, 코드내에 포함된 주석은 제외하기 위해 다른 **y** 명령을 시작 부분에 추가할 수 있습니다. 더 이상 예제를 자세히 설명하지 않겠지만, 
sam 의 반복 및 조건부 명령이 흥미로운 작업을 수행하기 위해 어떻게 구성될 수 있는지에 대한 아이디어를 얻으실 수 있을 것입니다.

[⬆️](#top)
<br><br><br><br>

# Grouping
명령을 정렬하는 또 다른 방법이 있습니다. 명령을 중괄호 ```{}``` 로 묶으면 명령을 병렬로 실행할 수 있습니다. 

다음 예제에서는 파일에서 ```Emac``` 를 검색한 후, **=** 명령과 **p** 명령을 함께 사용하여 줄과 문자 번호를 추가로 출력합니다. 

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

(세미콜론 앞의 숫자는 줄 번호이고, ```#``` 문자로 시작하는 숫자는 문자 번호입니다.) 

좀 더 흥미로운 예제로, ```Emacs``` 의 모든 항목을 ```vi``` 로 변경하고 또는 그 반대로도 변경하겠습니다. 다음과 같이 입력하면 됩니다.

```
,x/Emacs|vi/{
g/Emacs/ c/vi/
g/vi/ c/Emacs/
}
```

또는

```
,x/[a-zA-Z]+/{
g/Emacs/ v/....../ c/vi/
g/vi/ v/.../ c/Emacs/
}
```

위와 같이 사용하여 단어내에 포함된 문자열은 변경하지 않도록 보호합니다.

[⬆️](#top)
<br><br><br><br>

# Multiple Changes
위 예제에서 ```Emacs``` 가 ```vi``` 로 변경된 후, 중괄호 안의 두 번째 명령으로 다시 변경되지 않는 이유가 궁금할 수 있습니다. 그 이유는 명령들은 병렬로 실행되기 때문입니다. 
sam 에서 복합 명령내의 모든 변경 사항은 해당 명령으로 변경하기 전의 파일 상태를 참조합니다. 모든 변경 사항이 결정된 후에는 모두 동시에 적용됩니다.

즉, 앞서 언급했듯이 복합 명령내의 명령은 변경 사항이 적용되기 전에 파일 상태를 확인합니다. 이런 평가 방법은 어떤 작업 (예: ```Emacs``` 와 ```vi``` 의 교환) 은 
더 쉽게 처리할 수 있고, 어떤 작업은 더 어렵게 만들 수 있습니다. 

예를 들어, **p** 명령이 복합 명령내에서 실행될 때는 변경 사항이 발생하지 않았기 때문에 **p** 명령을 사용하여 변경된 사항을 출력한다는 것은 불가능합니다. 
간접적인 영향은 변경 사항이 파일을 통해 정방향 순서로 발생해야 하며 서로 겹치지 않아야 한다는 것입니다.

[⬆️](#top)
<br><br><br><br>


# Unix
sam 에는 유닉스 프로세스에 연결하는 몇 가지 명령이 있습니다. 가장 간단한 명령은 터미널에 입력과 출력이 연결된 상태에서 명령을 실행하는 ```!``` 명령입니다.

```
!date
Wed May 28 23:25:21 EDT 1986
!
```

(다운로드 모드에서 입력은 ```/dev/null``` 에 연결되고, 처음 몇 줄에 대한 출력만 출력되며, 오버플로된 내용은 ```$HOME/sam.err``` 파일에 저장됩니다.) 

마지막의 ```!``` 은 해당 명령이 완료되었음을 나타내는 프롬프트 문자입니다.

조금 더 흥미로운 것은 ```>``` 로, 현재 텍스트를 Unix 명령의 표준 입력으로 제공합니다:

```
1,2 >wc
2 22 131
!
```

```>``` 명령의 보수 명령은 당연히 ```<``` 이며, 현재 텍스트를 유닉스 명령의 표준 출력으로 대체합니다.

```
1 <date
!
1p
Wed May 28 23:26:44 EDT 1986
```

마지막 명령은 ```<``` 와 ```>``` 명령의 조합인 ```|``` 명령으로, 현재 텍스트가 Unix 명령의 표준 입력으로 제공된 후, Unix 명령의 표준 출력이 수집되어 
원본 텍스트를 대체하는 데 사용됩니다. 예를 들어,

```
,| sort
```

위의 명령은 파일 전체에 ```sort(1)``` 명령을 실행해 텍스트의 줄을 사전식으로 정렬합니다. ```<```, ```>``` 및 ```|``` 명령은 유닉스 셸 연산자가 아닌, 
sam 의 명령어입니다.

다음 예제는 ```tr(1)``` 을 사용하여 ```Emacs``` 의 모든 문자를 대문자로 변환합니다.

```
,x/Emacs/ | tr a-z A-Z
```

```tr``` 프로그램은 ```Emacs``` 가 발생할 때마다 한 번씩 실행됩니다. 물론, 간단한 ```c``` 명령으로 이 예제를 좀 더 효율적으로 수행할 수도 있겠지만, 
다음과 같이 좀 더 유용한 상황이 있습니다. 현재 텍스트를 Unix 메일 프로그램에 대한 입력으로 제공해 모든 제목 헤더를 별개의 운세로로 변환하는 것입니다:

```
,x/ˆSubject:.*\n/ x/[ˆ:]*\n/ < /usr/games/fortune
```

(정규식 ```[ˆ:]``` 의 의미는 ```:``` 및 개행 문자를 제외한 모든 문자를 의미하며, 부정 연산자 ```ˆ``` 은 문자 목록에서 개행 문자는 제외합니다.) 

다시 말하지만, ```/usr/games/fortune``` 프로그램은 메일의 각 제목 줄에 대해 한 번씩 실행되므로, 각각의 제목은 매번 다른 운세로 변경됩니다.

[⬆️](#top)
<br><br><br><br>

# A few other text commands
완전성을 위해 텍스트를 조작하는 다른 세 가지 명령에 대해 언급해야 합니다. *m* (*move*) 명령은 명령 뒤의 (필수) 주소로 지정된 텍스트 뒤에 현재 텍스트를 이동합니다. 따라서,

```
/Emacs/+- m 0
```

이 명령은 현재 텍스느 다음의 ```Emacs``` 가 포함된 줄을 파일의 시작 부분으로 이동합니다. 

마찬가지로 **t** (*transfer*, 또 다른 역사적 명령 문자) 는 텍스트를 복사합니다.

```
/Emacs/+- t 0
```

이 명령을 사용하면 파일 시작 부분에 현재 텍스트 다음 줄에 ```Emacs``` 가 포함된 복사본이 만들어집니다.

세 번째 명령은 좀 더 흥미로운 데, 대체를 처리하는 명령입니다. 구문은 ```s/pattern/replacement/``` 입니다. 

현재 텍스트 내에서 패턴의 첫 번째 발생 위치를 찾아 대체 텍스트로 대체하고, 대체의 전체 주소에 점을 설정합니다.

```
1p
This manual is organized in a rather haphazard manner. The first
s/haphazard/thoughtless/
p
This manual is organized in a rather thoughtless manner. The first
```

검색 일치 문자의 발생 위치 및 대체 텍스트에서 패턴과 일치하는 텍스트를 나타냅니다.

```
s/T/"&&&&"/
p
"TTTT"his manual is organized in a rather thoughtless manner. The first
```

대체 **s** (*substitute*) 명령에는 두 가지 변형된 사용법이 있습니다. 첫 번째는 **s** 명령 뒤에 숫자를 지정하여 대체할 패턴의 발생 위치를 나타내는 것으로
, 기본값은 첫 번째 발생 위치입니다.

```
s2/is/was/
p
"TTTT"his manual was organized in a rather thoughtless manner. The first
```

두 번째는 접미사 **g** (*global*)수정자 명령을 붙이면, 첫 번째 항목뿐만 아니라 현재 텍스트내의 모든 항목이 대체되는 것입니다.

```
s/[a-zA-Z]/x/g
p
"xxxx"xxx xxxxxx xxx xxxxxxxxx xx x xxxxxx xxxxxxxxxxx xxxxxxx xxx xxxxx
```

이 모든 예제에서 점은 전체 줄로 설정되어 있음을 알 수 있습니다.

> [!TIP]
> [대체 명령은 한 줄 내에서 텍스트를 변경할 수 있는 유일한 방법이기 때문에 ed 에서는 매우 중요합니다. 줄에 대한 개념이 훨씬 덜 중요한 sam 에서는 그 가치가 덜합니다. 예를 들어, 많은 ed 대체 관용구는 sam 의 기본 명령으로 잘 처리할 수 있습니다. 다음과 같은 명령을 생각해 보시기 바랍니다.

```
s/good/bad/
s/good//
s/good/& bye/
```

위의 명령은 다음과 같은 sam 명령과 같으며

```
/good/c/bad/
/good/d
/good/a/ bye/
```

위와 같이 원하는 텍스트로 이미 점이 설정되어 있으므로 검색 작업이 불필요한 경우입니다. 

또한, 다음과 같은 관용구에는 주의하시기 바랍니다.

```
1,$s/good/bad/
```

이 명령 ed 에서 사용하면 각 줄의 첫 번째 일치 항목을 변경하고, sam 에서 같은 명령을 사용하면 전체 파일을 첫 번째 일치 항목으로 변경합니다.  따라서, 
올바른 sam 버전은 다음과 같습니다.

```
,x s/good/bad/
```

하지만, 좀 더 사용 가능성이 높은 것은 다음과 같습니다.

```
,x/good/ c/bad/
```

이처럼, sam 은 다른 규칙에 따라 운영됩니다.]

[⬆️](#top)
<br><br><br><br>

# Files
지금까지는 단일 파일로만 작업했지만, 엄연히 sam 은 **다중 파일 편집기** 입니다. 하지만, 한 번에 하나의 파일만 편집할 수 있지만, 
어떤 파일이 현재 편집할 **현재 파일** 인지 알 수 있고 변경하는 것도 쉽습니다. 

이것을 확인하려면 몇 개의 파일이 포함되어 실행된 sam 이 필요한 데, 가장 쉬운 방법은 Unix 파일 이름의 목록으로 sam 을 시작하는 것입니다.

```
$ echo *.ms
conquest.ms death.ms emacs.ms famine.ms slaughter.ms
$ sam -d *.ms
-. conquest.ms
```

(죄송합니다만, 기병들이 전례적인 순서대로 나타나지 않습니다.) sam 이 출력한 줄은 Unix 파일 ```conquest.ms``` 를 현재 읽었으며 **현재 파일** 이란 표시입니다. 

sam 은 ```Unix 파일``` 과 연결된 sam ```파일``` 이 현재 파일이 되기 전까진 Unix 파일을 읽지 않습니다.

**n** (*name*) 명령은 모든 파일의 이름을 출력합니다:

```
n
-. conquest.ms
- death.ms
- emacs.ms
- famine.ms
- slaughter.ms
```

이 파일 이름 목록은 그래픽 환경 (다운로드 모드) 에서 마우스 버튼 3의 ```메뉴``` 에서도 동일하게 사용할 수 있습니다. 

**f** (*file*) 명령은 **현재 파일** 의 이름만 알려줍니다.

```
f
-. conquest.ms
```

파일 이름 왼쪽에 있는 3 문자는 파일에 대한 유용한 정보를 인코딩합니다. 파일에 열려 있는 창이 하나만 있으면, 빼기 기호가 더하기 기호로 표시되고, 
둘 이상이 열려 있다면 별표 기호가 됩니다. 마침표 (점의 다른 의미) 는 **현재 파일** 임을 식별합니다. sam 이 알고 있는 한, sam 파일이 연결된 Unix 파일의 
내용과 다를 경우엔 앞의 공백 문자는 아포스트로피 문자로 바뀝니다. 이것은 파일을 변경해보면 분명해집니다.

```
1d
f
’-. conquest.ms
```

실행 취소 명령으로 파일을 다시 복원한다면 아포스트로피 문자가 사라집니다.

```
u
f
-. conquest.ms
```

또한, 파일 이름은 **f** 명령으로 새로운 이름을 지정하여 변경할 수 있습니다:

```
f pestilence.ms
’-. pestilence.ms
```

**f** 명령은 파일의 새로운 상태를 항상 출력합니다. 즉, 파일 이름이 제공된다면 파일 이름을 변경하고 파일 이름이 제공되지 않으면 파일 이름을 출력합니다. 또한, 
파일 이름 변경 작업을 실행 취소할 수도 있습니다.

```
u
f
-. conquest.ms
```

다운로드 모드로 sam 이 실행되면 메뉴에서 원하는 파일을 직접 선택하면 현재 파일을 변경할 수 있습니다. (이후 메뉴에서 동일한 파일을 선택하면 파일에 열린 창이 
계속해서 순환합니다) 그렇지 않고 ```sam -d``` 로 실행한 경우는 **b** 명령을 사용해서 원하는 파일을 선택할 수 있습니다. [^2]

[^2]: 다운로드 모드로 실행할 경우, **b** 명령이 작동하지 않는 버그가 있습니다. 왜냐하면, 어쩃거나  메뉴가 사용하기 더 편리하고 명령 언어에서 파일을 선택하는 방법이 변경될 예정이기 때문에 이 버그는 수정되지 않았습니다.

```
b emacs.ms
-. emacs.ms
```

다시 말하지만, sam 은 Unix 파일인 ```emacs.ms``` 를 처음으로 읽고있기 때문에 파일 이름을 출력합니다. (실제로는 암시적인 **f** 명령을 실행합니다.)

sam 이 모르는 파일 이름을 요청하는 것은 오류지만, **B** (대문자) 명령은 sam 의 메뉴를 새로운 파일 이름으로 갱신하고 최신 상태로 만듭니다.

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

**b** 와 **B** 명령 모두 파일 이름의 목록을 허용합니다. **b** 명령은 단순히 파일 이름 목록의 첫 번째 파일만 가져오지만, **B** 명령은 모든 파일을 로드합니다.

파일 이름 목록은 한 줄에 입력할 수 있습니다.

```
B devil.tex satan.tex 666.tex emacs.tex
```

또는, 다음과 같이 유닉스 프로그램으로 생성할 수 있습니다.

```
B <echo *.tex
```

이런 형식은 Unix 프로그램이 반드시 필요합니다. sam 은 시스템 셸의 파일 이름에 대한 메타 문자를 이해하지 못하므로, ```B *.tex``` 는 ```*.tex``` 라는 단일 파일을 로드하려고 시도합니다. (물론 **<** 형식은 sam 의 **<** 명령에서 파생된 것입니다.) 

예를 들어, ```echo``` 는 **B** 명령에 종속적으로 실행하는 유일한 유용한 프로그램이 아닙니다,

```
B <grep -l Emacs *
```

이것은 ```Emacs``` 문자열이 포함된 파일만 로드합니다. 

마지막으로, 특별한 경우로 인수가 없는 **B** 명령은 sam 에게 파일 이름이 없는 **빈 파일** 을 생성합니다. **B** 명령의 보수 명령은 **D** 명령입니다.

```
D devil.tex satan.tex 666.tex emacs.tex
```

이 명령은 sam 의 메모리 (유닉스 시스템의 Unix 파일이 아닌)에서 해당 파일을 삭제합니다. 파일 이름없이 **D** 명령을 실행하면 sam 의 현재 파일은 제거됩니다.

현재 파일을 Unix 파일과 연관시키는 다른 세 가지 명령이 있습니다. **w** (*write*) 명령은 파일을 디스크의 Unix 파일에 쓰고, 파일 이름 인수가 없으면 
현재 파일과 연결된 Unix 파일에 전체 파일을 sam 으로 씁니다. (이 명령은 기본 주소가 점이 아닌 유일한 명령입니다). 

물론, 다음과 같은 구문을 사용해 저장할 주소와 새로운 파일 이름을 지정할 수도 있습니다.

```
1,2w /tmp/revelations
/tmp/revelations: #44
```

sam 은 파일 이름과 파일에 쓰여진 글자 수로 응답합니다. 다운로드 모드의 버튼 3 메뉴의 쓰기 (**write**) 메뉴는 인수가 없는 **w** 명령과 기능이 동일합니다.

나머지 두 명령인 **e** (*edit*) 와 **r** (*read*) 명령은 Unix 파일에서 데이터를 읽습니다. **e** 명령은 현재 파일을 지운 후, 파일 이름으로 지정한 파일에서 
데이터를 읽고 (또는, 명시적으로 제공되지 않은 경우엔 현재 파일의 이전 이름을 사용) , 파일 이름으로 설정합니다. 

**B** 명령과 비슷하지만, 새로운 파일 대신 현재 파일에 정보를 넣습니다. 따라서, 파일 이름 없이 **e** 명령만 사용한다면 sam 의 Unix 파일의 복사본을 
쉽게 새로 고칠 수 있습니다. 

[ed 와 달리 **e** 명령은 파일이 수정되더라도 불평하지 않습니다. 무언가 잘못하면 되돌릴 수 있는 것은 보호하지 않는다는 것이 원칙입니다.] 

또한, 전체 텍스트를 대체하는 것이 임무이므로, **e** 명령은 현재 주소를 설정하지 않습니다.

**r** (*read*) 명령은 **e** 명령과 비슷하지만, 현재 파일을 지우지 않습니다. 

Unix 파일의 텍스트가 점으로 바뀌거나 주소가 지정된 경우엔 지정된 텍스트로 바뀝니다.

```
r emacs.ms
```

위의 명령은 본질적으로 다음과 같은 동일한 효과가 있습니다.

```
<cat emacs.ms
```

현재 파일에 정의한 이름이 없을 경우, **r** 과 **w** 명령은 파일 이름을 설정하고, 이미 파일에 이름이 있는 경우에도 **e** 명령은 파일 이름을 재설정합니다.

텍스트가 대상이 아닌 파일 이름을 대상으로 반복하는 **x** 명령과 유사한 명령이 있습니다. 

**X** (대문자) 명령 구문은 간단합니다. ```X/pattern/command``` 으로 **x** 명령과 비슷합니다. (보완 명령은 **y** 와 유사한 **Y** 명령입니다.) 

처리 효과는 파일 이름 목록 항목 (즉, **f** 명령으로 출력된 줄) 이 패턴과 일치하면 각 파일에 명령을 실행하는 것입니다. 

예를 들어, 파일 이름 목록에서 아포스트로피 문자는 수정된 파일을 식별합니다,

```
X/’/ w
```

이 명령은 변경된 파일만 디스크에 저장합니다. 

다음은 좀 더 긴 예제입니다. C언어 소스 파일에서 특정 변수를 사용한 파일을 찾습니다.

```
X/\.c$/ ,x/variable/+-p
```

**f** 명령을 사용해 특정 변수가 어느 위치에 있는지 출력할 수 있습니다.

```
X/\.c$/ ,g/variable/ {
    f
    ,x/variable/+-{
        =
        p
     }
}
```

여기서 사용한 **g** 명령은 변수가 포함된 파일 이름만 출력되도록 처리합니다. (단, 명령 처리 중에 읽은 파일 이름까지 출력해서 문제를 혼동할 수 있으므로 주의하시길 바랍니다.) 

위의 명령은 파일에 변수가 나타나는 위치를 표시하고, **p** 명령은 해당 줄을 출력합니다.

이 예제에선 특정 변수를 포함하지 않는 모든 C 파일을 파일 이름 목록 메뉴에서 삭제하는 **D** 명령을 **X** 명령의 처리 대상으로 사용하면 편리합니다.

```
X/\.c$/ ,v/variable/ D
```

**X** 명령에 대한 패턴이 제공되지 않으면, 모든 파일에 명령 (기본값은 **f** 명령) 이 실행됩니다.

```
X D
```

새로운 출발을 위해 sam 을 정리합니다.

하지만, 더 이상의 작업은 처리하지 말고 여기서 멈추겠습니다.

```
q
$
```

일부 파일 조작 명령은 실행 취소할 수 있습니다. **f**, **e**, **r** 명령을 실행 취소하면 파일의 이전 상태가 복원되지만, **w**, **B**, **D** 명령은 
실행 취소가 불가능합니다. 물론 **q** 명령도 마찬가지입니다.



<br><br><br><br>

# sam quick reference card    

## Addresses    
| command | description |
|:---|:---|    
|n,m | line n to line m |   
|’ | address mark, see k below |   
|. | correct selection/position |   
|0 | start of file |   
|ˆ | start of line |   
|$ | end of line/file |   
|, | equivalent to 0,$ |   

  
## Regular Expressions    
| command | description |
|:---|:---|    
|. | any character |   
|* | 0 or more of previous |   
|+ | 1 or more of previous |   
|[ˆn] | any char but n |   
|[nm] | n or m |   
|[a-z] | class a thru z |   
|(re) | tag pattern |   
|\# |  substitute #’th tagged pattern |   


## Text commands     
| command | description |
|:---|:---|    
|-/re/ | search backward |   
|+/re/ | search forward |   
|/re/ | search in same direction as last |   
|a/text/ | Append text after dot |   
|c/text/ | Change text in dot |   
|i/text/ | Insert text before dot |   
|d | Delete text in dot |   
|s/regexp/text/ | Substitute text for regexp in dot |   
|m | address Move dot to after address |   
|t | address  Copy dot to after address  |   

  
## Display commands     
| command | description |
|:---|:---|   
|p | Print contents of dot |   
|= | Print value of dot |   
|n | Print file menu list |   


## I/O commands     
| command | description |
|:---|:---|    
|b file-list | Set current file to first in menu list |   
|B file-list | As b, but load new file-list |   
|D file-list | Delete named buffers |   
|e [file-name] | Replace current with file |   
|r file-name | Replace dot by contents of file |   
|w file-name | Write current to named file |   
|f [file-name] | Set current file name |   
|< command | Replace dot by stdout of command |   
|> command | Send dot to stdin of command |   
| command | Pipe dot through command |   
|! command | Run the command |   


## Loops and conditionals     
| command | description |
|:---|:---|    
|x/regexp/ command | Set dot and run command on each match |   
|x cmd | Set dot and run command on each matching line |   
|y/regexp/ command | as x but select unmatched text |   
|X/regexp/ command | Run command on files whose menu line matches |   
|Y/regexp/ command | As X but select unmatched files |   
|g/regexp/ command | If dot contains regexp, run command |   
|v/regexp/ command | If dot does not contain, run command |   


## Miscellany    
| command | description |
|:---|:---|    
|k | Set address mark to value of dot |   
|q | Quit |   
|u n | Undo last n (default 1) changes |   
|{ } | Braces group commands |   
|<compose> Xnnnn | Insert char xxxx hex (Unix/Plan9) |   
|Alt-nnnn | Insert char xxxx hex (Windows)  |   


## Sam idioms     
| command | description |
|:---|:---|    
|X/.*/,x/<cr>/d | strip <cr> from all files |   
|x/ˆ/ .,/0d | strip C comments from selection |   
|-/ˆ/+#10 | goto the 10th colum in the current line |   
|-0+,+0- | round dot down to whole lines only |   
|,x/ +/ v/ˆ/ c/ / | compress runs of spaces, leaving indentation |   
|s/"([ˆ"]*)"/‘‘1’’/ | replace "hello" with ‘‘hello’’ in selection |   
|f <nl> | set current file-name to null |   
|< echo "" | insert ascii code xxx at current pos |   
|, > wc -l | count lines in file |   
|/text/+-p | highlight the lines containing <pat> |   
|-/text/ | search for text backwards |   
|$-/text/ | search for the last occurrence of text in file |   
|,x/<text>/+-p | grep for text |   
|.x/<pat>/ c/<rep>/ | search for <pat> and replace with <rep> |   
|B < echo *.c | add all the C files in current dir to file list |   
|B < grep -l <pat> * | add all the files containing <pat> to file list |   
|X/’/w | write all modified files |   
|Y/.c/D | remove all non C files from file list |   
|\| fmt | pipe selection through the text formatter |   
|> mail <user> | send selection as Email to <user> |   
|x/0 a/0 | double space selection |   
|x/ˆ/ a/ / | indent selection 1 tab |   
|x/ˆ<tab>/d | remove 1 tab of indent from selection |   
|/(.+0+/ | matches blocks of text separated by blank lines |   
|! date | get current date in sam window |   
|,> wc | push file into wc, count appears in sam window |   
|0 < date | insert date at start of file |   
|1 < date | replace first line with todays date |   
|X D | remove out all up-to-date files |   
|, | sort sort current file |   
|,x/ˆTODAY$/ < date | replace TODAY on with the output of date |   
|,x/Plan9/tr a-z A-Z | replace all instances of Plan9 with upper case |   
|,t "junk.c" 0 | copy current file to start of junk.c |   
|-/.PP/,/.PP/- | highlight current paragraph in an nroff doc |   
|,x/[a-zA-Z0-9]+/ -#0;+#1  tr a-z A-Z | capitalise every word (slow) |   
|,x[a-zA-Z]+/{ |   |
|g/fred/ v/...../ c/jim/ | |   
|g/jim/ v/..../ c/fred/ |   |
|} |  swap fred for jim in file |





