# sed tutorial

https://fulmanski.pl/tutorials/computer-science/text-data-processing/sed/

In this part we cover the following topics

sed
Basic usage
Options and flags
Restrictions
Adding, changing, inserting
Working with multiple lines
The hold buffer
Control flow
Working with multiple files
Sources, examples, tutorials


# sed
`sed` 라는 약어는 ‘스트림 편집기(**s**tream **ed**itor)’ 를 의미합니다. 가장 대표적인 용도가 텍스트 치환이기 때문에 때로는 이를 ‘치환 편집기(substitution editor)’ 라고 생각하기도 합니다. 유닉스의 탄생과 함께(1973~74년, 벨 연구소의 리 E. 맥마혼에 의해) 개발된 이 도구는 없어선 안 될 가장 필수적인 도구 중 하나입니다. 일반적인 유닉스 철학[유닉스 철학](https://en.wikipedia.org/wiki/Unix_philosophy)에 따르면

- 한 가지 일을 처리하고 그 일을 잘 하는 프로그램을 작성하라.
- 서로 협력할 수 있는 프로그램을 작성하라.
- 텍스트 스트림을 처리할 수 있는 프로그램을 작성하라. 그것이 보편적인 인터페이스이기 때문이다.

sed는 텍스트를 변환할 수 있게 해주는 간단한 유틸리티입니다. 단순함이 바로 힘의 원천이며 오늘날 모든 주요 운영체제에서 실행됩니다.

초보 사용자는 sed의 구문이 난해하게 보일 수 있는데 이는 모든 명령줄 도구에 해당된 사실입니다. 하지만 일단 구문에 익숙해지면 단 몇 줄의 코드만으로 많은 복잡한 작업을 해결할 수 있습니다. sed는 표준 입력(STDIN)이나 파일에서 들어오는 정보에 편집 작업을 수행하는 줄 단위 스트림 편집기입니다. sed는 한 줄씩, 비대화형 방식으로 편집을 수행합니다. 즉, “편집기를 호출하는 순간 모든 편집 결정을 내려야 한다” 는 뜻입니다. WYSIWYG(보이는대로 편집) 환경에 익숙한 사람들은 혼란스럽거나 직관적이지 않게 느껴질 수 있지만 이는 텍스트를 변환하는 매우 강력하고 빠른 방법입니다. 

sed는 소스(표준 입력 스트림 또는 파일)에서 텍스트를 한 줄씩 읽어 ‘패턴 스페이스’ (pattern space)라는 내부 버퍼에 저장합니다. 읽어들이는 각 줄마다 새로운 주기(cycle)가 시작됩니다. sed는 명령줄이나 sed 스크립트로 지정된 하나 이상의 연산(명령)을 패턴 스페이스에 적용합니다.


# Basic usage

`s` 대체 명령어는 sed에서 가장 잘 알려진 기능입니다. 가장 간단한 형태는 다음과 같습니다.

```
sed s/[PATTERN]/[REPLACEMENT]/ [INPUT_FILE]
```

다음과 같이 사용할 수 있습니다.

```
$ echo foo bar > text.txt
$ cat text.txt 
foo bar
$ echo foo bar | sed s/foo/FOO/ 
FOO bar
$ sed s/foo/FOO/ text.txt 
FOO bar
$ sed s/foo/FOO/ < text.txt 
FOO bar
$ sed s/foo/FOO/ < text.txt > res.txt
$ cat res.txt 
FOO bar
```

설명:

- 'foo'가 처음 나타나는 부분만 변경되었습니다.
- sed는 우리가 지시한 대로 정확히 변경합니다.

```
$ sed s/oo/OO/ < text.txt
fOO bar
```

- 향후 발생할 수 있는 문제를 방지하기 위해, 이 경우에도 따옴표를 사용하는 것이 좋습니다.

```
$ sed s/foo/FOO/ < text.txt
FOO bar
$ sed ‘s/foo/FOO/’ < text.txt
FOO bar
```

- 슬래시(/)는 기본적으로 구분자로 사용되는데, 이로 인해 매우 혼란스러운 명령문이 생성될 수 있습니다.

```
$ echo /path/to/some/location | sed ‘s/some\/location/other\/location\/possible\/to\/use/’
/path/to/other/location/possible/to/use
```

따옴표를 사용하지 않으면 오류가 발생한다는 점에 유의하십시오.

```
$ echo /path/to/some/location | sed s/some\/location/other\/location\/possible\/to\/use/
sed: 1: “s/some/location/other/l ...”: substitute 명령에서 잘못된 플래그: 'o'
```

밑줄(_)과 같은 다른 문자를 사용할 수도 있습니다.

```
$ echo /path/to/some/location | sed ‘s_some/location_other/location/possible/to/use_’
/path/to/other/location/possible/to/use
```

또는 콜론(:)을 사용할 수도 있습니다.

```
$ echo /path/to/some/location | sed ‘s:some/location:other/location/possible/to/use:’
/path/to/other/location/possible/to/use
```

찾고자 하는 문자열에 포함되어 있지 않은 한, 어떤 문자든 사용할 수 있습니다. 알파벳도 마찬가지입니다.

```
$ echo abcd | sed ‘szbzsz’
ascd
```

앰퍼샌드(&) 문자를 사용하여 대체 문자열에서 찾은 내용을 참조할 수 있습니다.

```
$ echo ‘foo bar foo’ | sed ‘s/foo [a-z]* foo/& &/’
foo bar foo foo bar foo
```

패턴 [a-z]*는 0개 이상의 문자와 일치하므로 몇 가지 문제가 발생할 수 있습니다.

```
$ echo ‘1 a’ | sed ‘s/[a-z]*/b/’
b1 a
```

따라서 비어 있지 않은 문자열과 일치할 것이 확실한 패턴을 사용하는 것이 좋습니다.

```
$ echo ‘1 a’ | sed 's/[a-z][a-z]*/b/'
1 b
```
&는 치환 시 검색 패턴을 사용하고 싶지만 정확히 무엇을 찾을지 모르는 경우에 매우 유용합니다.

```
$ echo 'foo 123
> bar 345' | sed ‘s/[0-9][0-9]*/& &/’
foo 123 123
bar 345 345
```

때로는 전체 검색 패턴을 참조하는 대신 패턴의 일부를 참조해야 할 수도 있습니다. 이 경우 \1은 첫 번째로 저장된 패턴을, \2는 두 번째로 저장된 패턴을 가리키며, 이와 같이 이어집니다. 숫자 값은 \1부터 \9까지 최대 9개까지 사용할 수 있습니다.

예를 들어, 한 줄에서 두 번째 단어만 남기고 나머지는 모두 삭제하려면 다음과 같이 해볼 수 있습니다.

```
$ echo ‘ab cd ef gh’ | sed ‘s/\([a-z][a-z]*\) \([a-z][a-z]*\).*/\2/’
cd
```
기억된 패턴을 활용하는 좋은 예로는 중복 단어 탐지가 있습니다.

```
sed -n '/\([a-z][a-z]*\) \1/p'
```

이 명령어는 단어가 중복된 줄을 출력합니다.

```
$ echo 'ab cd
> cd cd ef
> cd ef
> cd ef ef' | sed -n ‘/\([a-z][a-z]*\) \1/p’
cd cd ef
cd ef ef
```

n과 p가 어떤 역할을 하는지 궁금하다면, 다음 소절에서 계속 읽어보세요.



# 옵션 및 플래그
## -n 옵션과 p 플래그
기본적으로 sed는 모든 줄을 출력합니다. 치환이 이루어지면 기존 텍스트 대신 새로운 텍스트(치환된 텍스트)가 출력됩니다. -n 옵션을 사용하면 sed는 기본적으로 어떤 줄도 출력하지 않습니다. p 플래그를 사용하면 수정된 줄이 출력됩니다.

```
$ echo 'ab cd
> cd ef
> ef gh
> gh ij' | sed -n ‘s/ef/&/p’
cd ef
ef gh
```

다음은 grep 명령어를 대체하는 sed 명령어입니다.

```
sed -n ‘s/[PATTERN]/&/p’ [FILE]
```

데이터를 출력하는 p 명령어도 있다는 점에 유의하십시오. p 명령어를 단독으로 사용하면

```
sed ‘p’
```

모든 줄이 중복되어 출력됩니다.

```
$ echo 'ab cd
> ef gh' | sed ‘p’
ab cd
ab cd
ef gh
ef gh
```

예를 들어, 빈 줄을 모두 두 번 출력하려면 다음 패턴을 사용할 수 있습니다.

```
sed '/^$/ p'
```

아래와 같이 표시됩니다.

```
$ echo 'ab cd
>
> ef gh
>
> ij kl' | sed ‘/^$/ p’
ab cd


ef gh


ij kl

```

p 명령어를 사용하면 grep 명령어를 더 간단하게 대체할 수 있습니다.

```
$ echo 'ab cd
> cd ef
> ef gh
> gh ij' | sed -n ‘/ef/ p’
cd ef
ef gh
```

## -e 명령어
-e는 --expression을 의미하며, 하나의 호출로 여러 명령어를 결합할 수 있게 해줍니다.
-e 명령어가 없으면 파이프를 사용해야 합니다.

```
sed ‘s/b/B/’ < alphabet01.txt | sed ‘s/g/G/’ > res.txt
```

다음 예제에서와 같이

```
$ echo 'ab bc cd de
> ef fg gh hi' > alphabet01.txt
$ cat alphabet01.txt
ab bc cd de
ef fg gh hi
$ sed ‘s/b/B/’ < alphabet01.txt | sed ‘s/g/G/’ > res.txt
$ cat res.txt
aB bc cd de
ef fG gh hi
```

이 방법은 다소 투박해 보입니다. 다음과 같이 작성하는 것이 훨씬 더 좋습니다.

```
$ sed -e ‘s/b/B/’ -e ‘s/g/G/’ < alphabet01.txt > res.txt
$ cat res.txt
aB bc cd de
ef fG gh hi
```

또는

```
$ sed -e ‘s/b/B/; s/g/G/’ < alphabet01.txt > res.txt
$ cat res.txt
aB bc cd de
ef fG gh hi
```

명령어가 많아서 한 줄에 깔끔하게 들어가지 않을 경우, 유닉스 명령어에서 흔히 그렇듯이 백슬래시 \를 사용하여 줄을 나눌 수 있습니다.

```
$ sed -e ‘s/b/B/’ \
> -e ‘s/g/G/’ < alphabet01.txt > res.txt
$ cat res.txt
aB bc cd de
ef fG gh hi
```

세 번째 방법은 스크립트인데, 이는 다음 명령어에서 다룰 예정입니다.

> [!NOTE]
> 명령어는 지정된 순서대로 차례차례 실행된다는 점에 유의하십시오.
>
> ```
> $ echo ‘a b c’ | sed -e ‘s/a/b/g’ -e ‘s/b/B/g’
> B B c
> ```


## -f 명령어
명령어를 파일에 저장할 수 있습니다.

```
$ echo 's/b/B/
> s/g/G/' > sed_script_01.txt
$ cat sed_script_01.txt
s/b/B/
s/g/G/
```

그리고 -f 명령어를 사용하여 이를 호출할 수 있습니다.

```
$ sed -f sed_script_01.txt < alphabet01.txt > res.txt
$ cat res.txt
aB bc cd de
ef fG gh hi
```

sed를 스크립트로 실행하는 또 다른 방법은 인터프리터 스크립트를 사용하는 것입니다. 다음과 같은 내용이 담긴 파일을 준비하면

```
#!/usr/bin/sed -f
s/b/B/
s/g/G/
```

다음과 같이 호출할 수 있습니다.

```
$ ./sed_script_02.txt < alphabet01.txt > res.txt
$ cat res.txt
aB bc cd de
ef fG gh hi
```

> [!NOTE]
> sed의 위치가 /usr/bin/sed와 다른 경우, whereis 명령어를 사용하여 찾을 수 있습니다.
> 
> ```
> $ whereis sed
> /usr/bin/sed
> ```

> [!NOTE]
> 유닉스에서 파일을 실행할 때 왜 ./[파일명]을 사용하나요? gcc, ls 같은 다른 명령어처럼 그냥 입력하면 안 되는 건가요?
> 유닉스 및 관련 운영 체제에서 점(.)은 현재 디렉터리를 나타냅니다. 현재 디렉터리에 있는 파일을 실행하고자 하는데, 해당 디렉터리가 $PATH에 포함되어 있지 않기 때문에 쉘에 실행 파일이 어디에 있는지 알려주기 위해 ./라는 “접두사”가 필요합니다. 따라서 ./[파일명]은 '이(현재) 디렉터리에 있는 FILENAME이라는 실행 파일을 실행하라'는 의미입니다.
>
> 이 답변은 또 다른 의문을 제기합니다. 왜 ./가 $PATH에 포함되지 않는 걸까요?
>
> 이는 보안상의 이유 때문입니다. 다른 사람의 홈 디렉터리를 살펴보고 있을 때, 단순히 gcc를 입력하거나 더 간단하고 자연스럽게 ls를 입력한다고 상상해 보세요. 이 경우, 누군가가 남겨둔 모든 파일을 지워버릴 수도 있는 악성 버전이 아닌, 진짜 명령어를 실행하고 있는지 확인하고 싶을 것입니다.
>
> $PATH의 마지막 항목으로 .을 포함시키는 것이 조금 더 안전하지만, 이를 악용하는 다른 공격 방법들도 있습니다. 가장 쉬운 예로는 sl이나 ls-l과 같은 흔한 오타를 악용하는 것입니다. 저 역시 매일 몇 번씩 이런 실수를 저지르곤 합니다. 또는 vim과 같이 이 시스템에 설치되어 있지 않은 일반적인 명령어를 노리는 방법도 있습니다.
>
> 혹시 이렇게 질문하실 수도 있습니다. 왜 단순히 . 대신 ./를 앞에 붙여야 할까요?
>
> 이 질문에도 답이 있습니다. /는 유닉스에서 경로 구분자이므로, 이를 사용하여 (현재) 디렉터리 .와 뒤따르는 [파일명]을 구분합니다. 이를 생략하면 .[파일명]이 되는데, 이는 그 자체로 유효한 숨겨진 파일 이름입니다.
>
> 왜 파일을 실행할 때 “./”를 사용하는 것일까요?

물론 셸 스크립트에서 sed를 호출할 수 있습니다. 다음과 같은 내용이 담긴 파일이 있다면

```
#!/bin/sh
sed -e ‘s/b/B/’ \
    -e ‘s/g/G/’
```

다음과 같이 실행합니다.

```
$ ./sed_script_03.txt < alphabet01.txt > res.txt
$ cat res.txt
aB bc cd de
ef fG gh hi
```

## w 플래그와 w 명령어
이 플래그를 사용하면 데이터가 저장될 파일을 지정할 수 있습니다. 별다른 일이 아닌 것처럼 들릴 수도 있습니다. 어차피 > 문자를 이용한 출력 리디렉션만으로도 데이터를 저장할 수 있으니까요. 흥미로운 점은 하나의 sed 인스턴스로 최대 10개의 파일을 동시에 열 수 있다는 것입니다. 이를 통해 데이터 스트림을 별도의 파일들로 분할할 수 있습니다. 이에 대해서는 ‘여러 파일 대체 작업’에서 살펴보겠습니다.
w 플래그 외에도 w 명령어가 있습니다. 둘은 작동 방식은 동일하지만 구문에서 약간 차이가 있습니다. 다음은 #으로 시작하는 줄만 기록하는 예시입니다.

```
$ echo '# comment 1
> no comment 1
> # comment 2
> no comment 2
> # comment 3
> no comment 3
> # comment 4
> no comment 4' > comments.txt
$ cat comments.txt
# comment 1
no comment 1
# comment 2
no comment 2
# comment 3
no comment 3
# comment 4
no comment 4
```

	- 플래그로 사용

```
$ sed -n ‘s/^#/&/w res.txt’ < comments.txt
$ cat res.txt
# comment 1
# comment 2
# comment 3
# comment 4
```

	- 명령어로 사용

```
$ sed -n ‘/^#/ w res.txt’ < comments.txt
$ cat res.txt
# comment 1
# comment 2
# comment 3
# 주석 4
```

## r 명령어
쓰기 명령어가 있다면 읽기 명령어도 있어야 합니다. 바로 이것입니다. 다음 명령어는 hlines.txt 파일의 내용을

```
$ cat hlines.txt
=========
=========
```

`#` 문자로 시작하는 줄 뒤에 삽입합니다(/#^/는 패턴 제한자입니다. 자세한 내용은 ‘제한 사항’에서 확인할 수 있습니다).

```
$ sed ‘/^#/ r hlines.txt’ < comments.txt > res.txt
$ cat res.txt
# 주석 1
=========
=========
주석 1 없음
# 주석 2
=========
=========
주석 2 없음
# 주석 3
=========
=========
주석 3 없음
# 주석 4
=========
=========
주석 4 없음
```

## d 명령어
이 명령어는

	- 현재 패턴 공간을 지우고,
	- 다음 줄을 읽어들이며,
	- 새 줄을 패턴 공간에 넣고,
	- 현재 명령어를 중단한 뒤,
	- 첫 번째 sed 명령어부터 실행을 시작합니다. 이를 새로운 사이클을 시작한다고 합니다.

# 문자로 시작하는 모든 줄을 삭제하려면 (/#^/는 패턴 제한자입니다. 이에 대한 자세한 내용은 ‘제한 사항’에서 확인할 수 있습니다)

```
$ sed ‘/^#/ d’ < comments.txt > res.txt
$ cat res.txt
no comment 1
no comment 2
no comment 3
no comment 4
```

## n 명령어
이 명령어는 패턴 공간을 출력한 다음, 이를 다음 입력 행으로 대체하고 다음 명령어를 계속 실행합니다.

```
$ echo $‘1\n2\n3’ | sed 's/./A/; s/./B/'
B
B
B
$ echo $‘1\n2\n3’ | sed ‘s/./A/; n; s/./B/’
A
B
A
```

이것이 바로 n 명령어가 바로 앞에 있는 명령어들이 방금 읽어온 줄에 적용되는 것을 배제한다고 말할 수 있는 이유입니다.

## = 명령어
= 명령어는 현재 줄 번호를 표준 출력으로 출력합니다.

```
$ sed ‘/^#/ =’ < comments.txt > res.txt
$ cat res.txt
1
# comment 1
no comment 1
3
# comment 2
no comment 2
5
# comment 3
no comment 3
7
# comment 4
no comment 4
$ sed -n ‘$=’ comments.txt
8
```

= 명령어는 표준 출력으로만 출력하기 때문에, 패턴과 같은 줄에 줄 번호를 출력할 수 없습니다. 이를 위해서는 여러 줄로 구성된 패턴을 편집해야 합니다. 자세한 내용은 ‘여러 줄 다루기’ 섹션에서 확인할 수 있습니다.

## i 플래그
이 플래그를 사용하면 sed는 대소문자를 구분하지 않습니다.

## q 명령어
q 명령어는 sed를 종료합니다. 이 명령어는 특정 조건에 도달했을 때 편집을 중단하고 싶을 때 가장 유용합니다. 예를 들어, 입력의 첫 2줄을 출력하는 데 사용할 수 있습니다(표시되는 줄 수는 q 명령어 바로 앞에 지정됩니다. 이에 대한 자세한 내용은 ‘제한 사항’에서 확인할 수 있습니다).

```
$ echo 'ab
> cd
> ef
> gh' | sed 2q
ab
cd
```

## 주석
주석은 첫 번째 비공백 문자가 #인 줄입니다. 일부 시스템에서는 sed에 주석을 하나만 사용할 수 있으며, 반드시 스크립트의 첫 번째 줄에 위치해야 한다는 점에 유의하십시오.

## {[명령어]}
일련의 명령어를 그룹화하여 단일 제한 조건(‘제한 사항’ 참조)에 일치할 때 실행되도록 할 수 있습니다.

```
$ echo '1
> 2
> 3
> 4' | sed -n '
> 2 {
> s/2/*/
> p
> }'
*
```

위의 예제는 한 줄 버전으로도 작동합니다.

```
$ echo '1
> 2
> 3
> 4' | sed -n ‘2{s/2/*/;p;}’
*
```

마지막 세미콜론을 생략하면 (macOS에서) 오류가 발생합니다.

```
$ echo '1
> 2
> 3
> 4' | sed -n ‘2{s/2/*/;p;}’
```

sed: 1: “2{s/2/*/;p;}”: p 명령어 끝에 여분의 문자가 있습니다



# Restrictions
때로는 모든 줄에 대해 sed를 실행하고 싶지 않을 때가 있습니다. 어떤 이유로든, 기본 설정대로 모든 줄이 아닌 일부 줄로만 sed의 적용 범위를 제한하고 싶을 때가 있습니다.

## 줄 번호로 제한하기
가장 간단한 제한 방법은 단일 줄 번호를 지정하는 것입니다. 2번째 줄에서만 치환을 수행하려면 명령어 앞에 2를 추가해야 합니다.

```
$ echo 'a1 b1 c2
> a2 b2 c2
> a3 b3 c3
> a4 b4 c4
> a5 b5 c5
> a6 b6 c6' > abc_6_lines.txt
$ cat abc_6_lines.txt
a1 b1 c2
a2 b2 c2
a3 b3 c3
a4 b4 c4
a5 b5 c5
a6 b6 c6
$ sed ‘2 s/a/A/’ < abc_6_lines.txt > res.txt
$ cat res.txt
a1 b1 c2
A2 b2 c2
a3 b3 c3
a4 b4 c4
a5 b5 c5
a6 b6 c6
```

줄 번호 사이에 쉼표를 삽입하여 범위도 지정할 수 있습니다. 첫 3줄로 치환 범위를 제한하려면 다음 명령을 사용할 수 있습니다.

```
$ sed ‘1,3 s/a/A/’ < abc_6_lines.txt > res.txt
$ cat res.txt
A1 b1 c2
A2 b2 c2
A3 b3 c3
a4 b4 c4
a5 b5 c5
a6 b6 c6
```

파일의 마지막 줄을 의미하는 특수 문자 $를 사용하면, 3번째 줄부터 파일 끝까지의 범위에서 치환을 수행할 수 있습니다.

```
$ sed ‘4,$ s/a/A/’ < abc_6_lines.txt > res.txt
$ cat res.txt
a1 b1 c2
a2 b2 c2
a3 b3 c3
A4 b4 c4
A5 b5 c5
A6 b6 c6
```

여러 파일을 사용할 경우 줄 번호가 누적되는 것은 아닙니다.

```
$ cat abc_3_lines.txt
a7 b7 c7
a8 b8 c8
a9 b9 c9
$ sed ‘6,7 s/a/A/’ abc_6_lines.txt abc_3_lines.txt > res.txt
$ cat res.txt
a1 b1 c2
a2 b2 c2
a3 b3 c3
a4 b4 c4
a5 b5 c5
A6 b6 c6
A7 b7 c7
a8 b8 c8
a9 b9 c9
```

GNU sed를 사용하면 특정 줄(6)부터 시작하여 그 다음 몇 줄(1)에 대해 작업을 수행할 수도 있습니다.

```
$ sed ‘6,+1 s/a/A/’ abc_6_lines.txt abc_3_lines.txt
```

macOS에서는 오류가 발생합니다.

```
$ sed ‘6,+1s/a/A/’ abc_6_lines.txt abc_3_lines.txt
```

sed: 1: “6,+1s/a/A/”: 예상된 컨텍스트 주소가 없습니다.



## Patterns
정규 표현식을 사용하여 sed의 동작을 제한할 수 있습니다.

```
$ sed ‘/a[1,3,5]/ s/b/B/’ < abc_6_lines.txt
a1 B1 c2
a2 b2 c2
a3 B3 c3
a4 b4 c4
a5 B5 c5
a6 b6 c6
```

치환과 마찬가지로 패턴 구분자를 지정할 수 있습니다. 표현식이 백슬래시 \로 시작하면, 그 다음 문자가 구분자가 됩니다.

```
$ sed ‘\_a[1,3,5]_ s/b/B/’ < abc_6_lines.txt
a1 B1 c2
a2 b2 c2
a3 B3 c3
a4 b4 c4
a5 B5 c5
a6 b6 c6
```

## 패턴을 이용한 범위 지정
두 개의 정규식을 범위로 지정할 수 있습니다.

```
$ sed ‘/b3/,/b5/ s/[a-z]//g’ < abc_6_lines.txt
a1 b1 c2
a2 b2 c2
3 3 3
4 4 4
5 5 5
a6 b6 c6
```

줄 번호와 정규식을 결합할 수 있습니다.

```
$ sed ‘1,/b5/ s/[a-z]//g’ < abc_6_lines.txt
1 1 2
2 2 2
3 3 3
4 4 4
5 5 5
a6 b6 c6
```


## Reversing the restriction
때로는 정규 표현식과 일치하는 줄이나 주소 범위 밖에 있는 줄을 제외한 모든 줄에 대해 특정 작업을 수행하고 싶을 때가 있습니다. 이 경우 ! 문자를 사용하여 주소 제한을 반전시킬 수 있습니다.

```
$ sed -n ‘1,3 s/a/A/ p’ < abc_6_lines.txt
A1 b1 c2
A2 b2 c2
A3 b3 c3
$ sed -n ‘1,3! s/a/A/ p’ < abc_6_lines.txt
A4 b4 c4
A5 b5 c5
A6 b6 c6
MacBook-A
```

# 추가, 변경, 삽입
## a: 줄 추가(append)

```
$ sed '
> /^#/ a\
> ### ### ###
> ' < comments.txt > res.txt
$ cat res.txt
# 주석 1
### ### ###
주석 없음 1
# 주석 2
### ### ###
주석 2 없음
# 주석 3
### ### ###
주석 3 없음
# 주석 4
### ### ###
주석 4 없음
```

## i 한 줄 삽입

```
$ sed '
> /^#/ i\
> ### ### ###
> ' < comments.txt > res.txt
$ cat res.txt
### ### ###
# 주석 1
주석 1 없음
### ### ###
# 주석 2
주석 2 없음
### ### ###
# 주석 3
주석 3 없음
### ### ###
# 주석 4
주석 4 없음
```

## c 줄 변경

```
$ sed '
> /^#/ c\
> ### ### ###
> ' < comments.txt > res.txt
$ cat res.txt
### ### ###
주석 없음 1
### ### ###
주석 없음 2
### ### ###
주석 없음 3
### ### ###
주석 없음 4
```

이 세 가지 명령어 모두 한 번에 여러 줄을 추가할 수 있게 해줍니다. 각 줄의 끝을 \로 마무리하기만 하면 됩니다.

```
$ sed '
> /^#/ c\
> ###
>
> ###
> ' < comments.txt > res.txt
$ cat res.txt
###
no comment 1
###
no comment 2
###
no comment 3
###
no comment 4
$ sed '
> /^#/ c\
> ###\
> \
> ###\
> ' < comments.txt > res.txt
$ cat res.txt
###

###
no comment 1
###

###
no comment 2
###

###
no comment 3
###

###
no comment 4
```


# Working with multiple lines
여러 줄을 다루는 작업은 다소 헷갈릴 수 있으므로, 지금까지 설명한 내용을 모두 이해했는지 다시 한 번 확인해 주시기 바랍니다. 이 주제를 시작하며, 여러 줄 패턴에서 사용되는 세 가지 새로운 명령어인 N, D, P에 대해 설명하겠습니다. 이를 잘 알려진 단일 줄 명령어인 n, d, p와 비교하여 살펴보겠습니다.

## N 명령어
아시다시피, n 명령어는
	- 현재 패턴 공간을 출력하고,
	- 현재 패턴 공간을 비우며,
	- 다음 입력 줄을 읽어옵니다.

반면, N 명령어는

	- 현재 패턴 공간을 출력하지 않고,
	- 패턴 공간을 비우지 않으며,
	- 패턴 공간에 줄 바꿈 문자를 추가하고,
	- 다음 줄을 읽어와 패턴 공간에 추가합니다.

다음 예제를 비교해 보십시오.

```
$ echo $'1\n2\n3' | sed 's/./A/; s/./B/;'
B
B
B
$ echo $'1\n2\n3' | sed 's/./A/; n; s/./B/;'
A
B
A
$ echo $'1\n2\n3' | sed 's/./A/; N; s/./B/;'
B
2
$ echo $'1\n2\n3\n4' | sed 's/./A/; N; s/./B/;'
B
2
B
4
```

특정 세 줄을 일치시키고 싶다면 다음과 같이 할 수 있습니다.

```
$ echo 'a 1 a
> b 2 b
> c 3 c
> d 4 d
> e 5 e' | sed '
> /2/ {
>     N
>     /3/ {
>         N
>         /4/ {
>             N
>             s/2.*3.*4/join: 2+3+4/
>             }
>         }
>     }
> '
a 1 a
b join: 2+3+4 d
e 5 e
```

## P 명령어
아시다시피, p 명령어는
	- 단순히 패턴 공간 전체를 출력할 뿐이며,
	- 이 명령어는 패턴 공간을 변경하지 않습니다.

반면, N 명령어는

	- 패턴 공간의 첫 부분, 즉 줄바꿈 문자에 이르기까지만 출력하며,
	- 이 명령어는 패턴 공간을 변경하지 않습니다.

```
$ echo ‘1 2 3’ | sed -n 's/ /\
/g; P;'
1
```

> [!NOTE]
> 패턴 내에서 새 줄을 사용하려면 리터럴 \n을 사용해야 하는 반면, 새 줄을 출력하려면 리터럴 새 줄 문자를 삽입해야 한다는 점에 유의하십시오. 이것이 바로 다음 명령어를 작성할 수 없는 이유입니다.
> 
> ```
> echo ‘1 2 3’ | sed -n ‘s/ /\n/g; P;’
> ```
>
> 오류 메시지를 방지하기 위해 이스케이프 문자 \를 사용하는 것을 잊지 마십시오.
>
> ```
> $ echo ‘1 2 3’ | sed -n 'p; s/ /
> /g; D;'
> sed: 1: "p; s/ /
> /g; D;": 대체 패턴 내부에 이스케이프되지 않은 줄바꿈이 있습니다
> ```

## D 명령어
아시다시피, d 명령어는

	- 현재 패턴 공간을 삭제하고,
	- 다음 줄을 읽어들이며,
	- 새 줄을 패턴 공간에 넣은 뒤,
	- 현재 명령어를 중단하고,
	- 첫 번째 sed 명령어부터 실행을 시작합니다.

반면, D 명령어는

	- 패턴 공간의 첫 부분(줄바꿈 문자에 이르기까지)을 삭제하고 나머지 패턴은 그대로 남겨둔 채
	- 현재 명령어를 중지하며,
	- 현재 패턴 공간을 출력하지 않고,
	- 명령어 실행 주기를 다시 시작합니다.

```
$ echo ‘1 2 3’ | sed -n 'p; s/ /\
/g; D;'
1 2 3
2
3
3
```

이 세 가지 명령을 함께 사용하면 파일에서 마지막 3줄을 제거할 수 있습니다.

```
$ echo '1
> 2
> 3
> 4
> 5
> 6' | sed '1 {N;N;}
> N
> P
> D'
1
2
3
```

또 다른 예로는 각 줄 앞에 줄 번호를 출력한 뒤 해당 줄을 출력하는 것입니다.

```
$ cat abc_6_lines.txt
a1 b1 c2
a2 b2 c2
a3 b3 c3
a4 b4 c4
a5 b5 c5
a6 b6 c6
$ sed ‘/.*/ =’ < abc_6_lines.txt | sed ‘N;s/\n/: /’
1: a1 b1 c2
2: a2 b2 c2
3: a3 b3 c3
4: a4 b4 c4
5: a5 b5 c5
6: a6 b6 c6
```

또는 입력 데이터를 두 열로 표시하는 것입니다

```
$ echo '1
> 2
> 3
> 4
> 5' | sed -En '
> $!N
> s/(.*)\n/\1          \
> /
> s/(.{10}).*\n/\1/
> p'
1         2
3         4
5
```


# The hold buffer
지금까지 설명한 바와 같이, 수정하여 출력 스트림으로 보낼 수 있는 문자를 포함하는 패턴 공간이나 버퍼 외에도 또 하나의 버퍼, 즉 홀드 버퍼 또는 홀드 공간이 있습니다. 이 새로운 버퍼는 나중에 사용할 수 있도록 패턴 공간에 있는 데이터의 사본을 만드는 데 사용할 수 있습니다. 홀드 버퍼를 다룰 때 사용할 수 있는 명령어는 다섯 가지가 있습니다.

- x 명령어
이 명령어는 패턴 공간과 홀드 버퍼의 내용을 서로 교환합니다.

- h 명령어
h 명령어는 패턴 버퍼의 내용을 홀드 버퍼로 복사합니다. 패턴 버퍼의 내용은 변경되지 않습니다.

- H 명령어
H 명령어를 사용하면 홀드 버퍼에 여러 줄을 결합할 수 있습니다. 이 명령어는 \n으로 시작하는 줄이 버퍼에 추가되는 방식이므로 N 명령어와 유사하게 작동합니다. 이를 통해 홀드 버퍼에 여러 줄을 저장해 두었다가, 나중에 특정 패턴이 발견될 때만 이를 출력할 수 있습니다.

- g 명령어
h 명령어와 비슷하게 작동하지만, 홀드 공간에서 패턴 공간으로 데이터를 옮기는 반대 방향입니다.

- G 명령어
H 명령어와 비슷하게 작동하지만, 홀드 공간에서 패턴 공간으로 데이터를 옮기는 반대 방향입니다.

```
$ echo '1 2
> 2 3
> 3 4
> 4 5' | sed -n '
> h
> s/3//
> :print
> p'
1 2
2 
 4
4 5
$ echo '1 2
> 2 3
> 3 4
> 4 5' | sed -n '
> h
> s/3//
> g
> :print
> p'
1 2
2 3
3 4
4 5
```

# Control flow
실행 흐름을 제어하기 위해 sed는 반복 및 분기 명령어를 제공합니다.

## loops
sed의 반복은 일반적인 goto 문과 유사하게 작동합니다. 레이블로 표시된 줄로 점프한 후 나머지 명령어를 계속 실행할 수 있습니다. 레이블은 콜론(:) 뒤에 오는 이름입니다.

```
:loop
:start
:end
```

특정 레이블로 이동하려면 b 명령어 뒤에 레이블 이름을 지정하면 됩니다. 레이블 이름을 생략하면 스크립트의 끝으로 이동합니다.

```
$ echo '1 2
> 2 3
> 3 4
> 4 5' | sed -n '
> /3/!b print
> s/^/# /
> :print
> p'
1 2
# 2 3
# 3 4
4 5
```

## branches
t 명령어를 사용하여 분기를 만들 수 있습니다. 이 명령어를 사용하면, 이전의 대체 명령어가 성공한 경우에만 sed가 해당 레이블로 이동합니다.
루프 부분에서 수행했던 작업과 유사한 작업을 완료하려면 다음과 같이 작성할 수 있습니다(안타깝게도 b 명령어를 사용해야 하는데, b 명령어만으로도 이 작업을 완료할 수 있기 때문에 이는 전혀 말이 되지 않습니다).

```
$ echo '1 2
> 2 3
> 3 4
> 4 5' | sed -n '
> h
> s/3//
> t comment
> b print
> :comment
> g
> s/^/# /
> :print
> p'
1 2
# 2 3
# 3 4
4 5
```

다른 예시가 더 도움이 될 수도 있습니다.

```
$ echo '1
> 1 2
> 1 2 3
> 1 2 3 4' | sed -E '
> :start
> s/^(.{1,8})$/\1*/
> t start'
1********
1 2******
1 2 3****
1 2 3 4**
```

여기서는 확장 정규식을 활성화하기 위해 -E 명령줄 옵션이 사용되었습니다. macOS 이외의 시스템에서는 -r 옵션이 올바른 선택일 수 있습니다.


> [!NOTE]
> 때로는 다음과 같은 이상한 코드 줄을 볼 수 있습니다.
>
> ```
> ... 일부 코드 ...
> t label
> :label
> ... 일부 코드 ...
> ```
>
> 언뜻 보면, 이 분기문은 어차피 실행되었을 명령어로 점프하기 때문에 무의미해 보입니다. 하지만 t 명령어의 정의를 주의 깊게 읽어보면, 현재 사이클이 시작된 이후 또는 이전 test 명령어가 실행된 이후 대체 작업이 발생한 경우에만 분기가 이루어진다는 것을 알 수 있습니다. 다시 말해, test 명령어는 대체 플래그를 지우는 부수 효과를 가집니다. 이것이 바로 위 코드 조각의 목적입니다. 이는 여러 개의 대체 명령어를 사용할 때 오탐을 방지하기 위한 기법입니다.



# Working with multiple files

```
$ echo '100 abc
> 101 def
> 102 ghi
> 103 jkl' | sed -n '
> h
> s/\(^[0-9]*[02468] \)/\1/
> t even
> s/\(^[0-9]*[13579] \)/\1/
> t odd
> b
> :even
> g
> w res_even.txt
> b
> :odd
> g
> w res_odd.txt
> '
$ cat res_even.txt 
100 abc
102 ghi
$ cat res_odd.txt 
101 def
103 jkl
```


# 참고 자료, 예제, 튜토리얼
- [리눅스에서 Sed 스트림 편집기를 사용하여 텍스트를 조작하는 기본 사항](https://www.digitalocean.com/community/tutorials/the-basics-of-using-the-sed-stream-editor-to-manipulate-text-in-linux)
- [중급 Sed: 리눅스 환경에서 텍스트 스트림 조작하기](https://www.digitalocean.com/community/tutorials/intermediate-sed-manipulating-streams-of-text-in-a-linux-environment)
- [Sed 명령어 완전 가이드 - 실전 예제를 통한 설명](https://linuxhandbook.com/sed-reference-guide) Sed의 “내부 구조”에 대한 매우 상세한 설명
- [리눅스 sed 명령어](https://www.computerhope.com/unix/used.htm): 여기에서는 정규 표현식 구문에 대한 훌륭한 개요를 비롯한 다양한 정보를 확인할 수 있습니다.
- [리눅스용 정규 표현식 튜토리얼 (Sed & AWK) 예제](https://likegeeks.com/regex-tutorial-linux/)
- [예제가 포함된 궁극의 Sed 튜토리얼](https://www.poftut.com/ultimate-sed-tutorial-with-examples/)
- [리눅스 사용자를 위한 20가지 Sed (스트림 편집기) 명령어 예제](https://www.linuxtechi.com/20-sed-command-examples-linux-users/)
- [텍스트 조작을 위한 sed 리눅스 명령어 예제 31개 이상](https://likegeeks.com/sed-linux/)
- [Sed와 Awk 101가지 활용법](https://vds-admin.ru/sed-and-awk-101-hacks)
