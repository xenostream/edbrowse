# Chapter 1: Sed Syntax and Basic Commands
모든 Sed 예제에서 다음의 `employee.txt` 파일을 사용할 것입니다. 이 책에서 제공하는 명령어를 직접 실행해 보려면 이 텍스트 파일을 생성해 주세요.

```
$ vi employee.txt
101,John Doe,CEO
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```

위의 직원 데이터베이스에는 각 기록마다 다음과 같은 필드가 포함되어 있습니다.

- Employee Id
- Employee Name
- Title

Sed는 스트림 편집기(Stream Editor)의 약자입니다. 이는 텍스트를 조작하고, 필터링하며, 변환하는 매우 강력한 도구입니다. Sed는 파일에서 입력을 받을 수도 있고, 파이프에서 입력을 받을 수도 있습니다. 심지어 여러분이 정확히 Sed 스크립트를 이해하지 못한 채 다양한 상황에서 사용하기 위해 Bash 시작 파일에 여러 개의 Sed 한 줄 명령어를 추가해 두었을 수도 있습니다.

초보자에게는 Sed 스크립트가 난해하게 보일 수도 있습니다. 하지만 Sed 명령어를 자세히 이해하면, 간단한 Sed 스크립트를 작성하여 복잡한 텍스트 조작 문제를 빠르게 해결할 수 있게 될 것입니다.

이 책에서는 모든 Sed 명령어를 설명하고 이해하기 쉬운 예제들을 제공합니다.


## 1. Sed Command Syntax
이 섹션의 목적은 Sed의 문법과 명령어 구조에 익숙해지도록 돕는 것입니다. 개별 Sed 명령어에 대한 설명은 후반부에서 자세히 다룰 예정이므로, 여기서는 다루지 않습니다.

**Basic sed syntax:**

```
sed [options] {sed-commands} {input-file}
```

Sed는 `{input-file}`에서 한 번에 한 줄씩 읽고, 해당 줄에 `{sed-commands}`를 실행합니다.  

먼저 `{input-file}`에서 첫 번째 줄을 읽고, 그 줄에 `{sed-commands}`를 실행합니다. 그런 다음 두 번째 줄을 읽고, 동일한 방식으로 `{sed-commands}`를 실행합니다. Sed는 `{input-file}`의 끝에 도달할 때까지 이 과정을 반복합니다.  

또한 Sed에는 몇 가지 선택적 명령어 옵션(`[options]`)이 있으며, 이를 통해 추가적인 기능을 수행할 수도 있습니다.  

다음 예제는 기본적인 Sed 문법을 보여줍니다. 이 간단한 Sed 예제는 `/etc/passwd` 파일의 모든 줄을 출력합니다.

```
sed -n 'p' /etc/passwd
```

여기서 주요 초점은 `{sed-commands}`에 있으며, 이는 단일 Sed 명령어일 수도 있고, 여러 개의 Sed 명령어일 수도 있습니다.  

또한 여러 개의 Sed 명령어를 하나의 파일로 작성한 후, 아래와 같이 `-f` 옵션을 사용하여 해당 Sed 스크립트 파일을 실행할 수도 있습니다.

**Basic sed syntax for use with sed-command file:**

```
sed [options] -f {sed-commands-in-a-file} {input-file}
```

다음 예제는 기본적인 문법을 보여줍니다. 이 예제는 `/etc/passwd` 파일에서 "root"와 "nobody"로 시작하는 줄을 출력합니다.

```
$ vi test-script.sed
/^root/ p
/^nobody/ p

$ sed -n -f test-script.sed /etc/passwd
```

여러 개의 Sed 명령어를 실행할 때, 아래와 같이 `-e` 옵션을 사용하여 명령어를 명령줄에 직접 지정할 수도 있습니다.

**Basic sed syntax using -e:**

```
sed [options] -e {sed-command-1} -e {sed-command-2} {input-file}
```

다음 예제는 기본적인 문법을 보여줍니다. 이 예제는 `/etc/passwd` 파일에서 "root"와 "nobody"로 시작하는 줄을 출력합니다:

```
sed -n -e '/^root/ p' -e '/^nobody/ p' /etc/passwd
```

여러 개의 `-e` 인수를 사용하여 한 줄에서 많은 명령어를 실행하는 경우, 아래와 같이 백슬래시를 사용하여 여러 줄로 나눠서 작성할 수 있습니다.

```
sed -n \
-e '/^root/ p' \
-e '/^nobody/ p' \
/etc/passwd
```

또한 `{ }`를 사용하여 여러 개의 Sed 명령어를 그룹화하여 명령줄에서 실행할 수 있습니다.

**Basic sed syntax using { }:**

```
sed [options] '{
sed-command-1
sed-command-2
}' input-file
```

다음 예제는 기본 문법의 이 버전을 보여줍니다. 이 예제는 `/etc/passwd` 파일에서 "root"와 "nobody"로 시작하는 줄을 출력합니다.

```
sed -n '{
/^root/ p
/^nobody/ p
}' /etc/passwd
```

**참고:** Sed는 원본 파일을 절대 수정하지 않습니다. 항상 출력을 stdout으로 인쇄합니다. 변경 사항을 저장하려면 명시적으로 `> filename.txt`를 지정하여 출력을 파일로 리디렉션해야 합니다.



## 2. Sed Scripting Flow
Sed 스크립팅은 쉽게 기억할 수 있는 순서인 읽기(Read), 실행(Execute), 출력(Print), 반복(Repeat)을 따릅니다. 이 실행 흐름을 기억하기 위해 간단한 REPR 약어를 사용할 수 있습니다.

이 순서의 각 단계를 살펴보겠습니다. Sed는 다음과 같이 작동합니다:

- **읽기(Read)**: 입력 파일에서 읽은 줄을 패턴 공간(Pattern Space)이라는 내부 임시 버퍼에 저장합니다.
- **실행(Execute)**: Sed 명령어를 패턴 공간에 있는 줄에 실행합니다. 여러 개의 Sed 명령어가 있을 경우, Sed 스크립트, `-e` 옵션 또는 `{ }`을 통해 제공된 명령어를 순차적으로 실행합니다.
- **출력(Print)**: 패턴 공간에서 줄을 출력합니다. 이 줄을 출력한 후 패턴 공간은 비게 됩니다.
- **반복(Repeat)**: 입력 파일의 끝에 도달할 때까지 이 과정을 반복합니다.

![](./_image/2025-03-01-14-23-10.jpg)
Fig: Illustration of SED execution flow


## 3. Print Pattern Space (p command)
`sed`의 `p` 명령어를 사용하면 현재 패턴 공간을 출력할 수 있습니다. 

기본적으로 `sed`는 명령어를 실행한 후 패턴 버퍼를 출력하기 때문에 `p` 명령어가 왜 필요한지 궁금할 수 있습니다. 하지만 이유가 있습니다. `p` 명령어는 무엇을 출력할지 구체적으로 제어할 수 있게 해줍니다.

보통 `p`를 사용할 때는 `-n` 옵션을 함께 사용하여 표준 `sed` 흐름에서 발생하는 기본 출력은 억제합니다. 그렇지 않으면 `p`(출력) 명령어가 실행될 때 한 줄이 두 번 출력됩니다.

**The following example prints every line of employee.txt twice:**

```
$ sed 'p' employee.txt
101,John Doe,CEO
101,John Doe,CEO
102,Jason Smith,IT Manager
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
105,Jane Miller,Sales Manager
```

**Print each line once (functionally the same as `cat employee.txt`):**

```
$ sed -n 'p' employee.txt
101,John Doe,CEO
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```

### Specifying an Address Range
Sed 명령어 앞에 주소 범위를 지정하지 않으면, 기본적으로 모든 줄에 대해 일치합니다. 다음은 Sed 명령어 앞에 주소 범위를 지정하는 몇 가지 예입니다.

**Print only the 2 nd line:**

```
$ sed -n '2 p' employee.txt
102,Jason Smith,IT Manager
```

**Print from line 1 through line 4:**

```
$ sed -n '1,4 p' employee.txt
101,John Doe,CEO
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
```

**Print from line 2 through the last line ($ represents the last line):**

```
$ sed -n '2,$ p' employee.txt
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```


### Modify Address Range
주소 범위는 쉼표(comma), 더하기(plus), 물결표(tilde)를 사용하여 수정할 수 있습니다. 위의 예제에서 쉼표(,)가 주소 범위 지정의 일부로 사용된 것을 보았습니다. 그 의미는 명확합니다: `n,m`은 n번 줄에서 m번 줄까지를 나타냅니다.

더하기 기호(+)는 쉼표와 함께 사용하여 절대적인 줄 번호 대신 특정 줄 수를 지정할 수 있습니다. 예를 들어, `n,+m`은 n번 줄부터 시작하여 m개의 줄을 의미합니다.

물결표(~)는 주소 범위에서도 사용될 수 있습니다. 이 특별한 의미는 명령어 사이에 줄을 건너뛰는 것입니다. 예를 들어, 주소 범위 `n~m`은 sed가 n번째 줄에서 시작하여 그 이후로 m번째 줄마다 선택하라는 의미입니다.

- 1~2 matches 1,3,5,7, etc.
- 2~2 matches 2,4,6,8, etc.
- 1~3 matches 1,4,7,10, etc.
- 2~3 matches 2,5,8,11, etc

**Print only odd numbered lines:**

```
$ sed -n '1~2 p' employee.txt
101,John Doe,CEO
103,Raj Reddy,Sysadmin
105,Jane Miller,Sales Manager
```

### Pattern Matching
번호가 매겨진 주소(또는 주소 범위)처럼, 패턴(또는 패턴 범위)을 지정하여 일치시킬 수도 있습니다. 다음 몇 가지 예제에서 그 방법을 보여줍니다.

**Print lines matching the pattern “Jane”:**

```
$ sed -n '/Jane/ p' employee.txt
105,Jane Miller,Sales Manager
```

**Print lines starting from the 1st match of "Jason" until the 4th line:**

```
$ sed -n '/Jason/,4 p' employee.txt
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
```

**참고:** 만약 첫 번째 4줄에서 "Jason"과 일치하는 항목이 없다면, 이 명령어는 4번째 줄 이후에서 "Jason"과 일치하는 줄을 출력할 것입니다.

**Print lines starting from the 1st match of "Raj" until the last line:**

```
$ sed -n '/Raj/,$ p' employee.txt
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```

**Print lines starting from the line matching "Raj" until the line matching "Jane":**

```
$ sed -n '/Raj/,/Jane/ p' employee.txt
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```

**Print the line matching "Jason" and 2 lines immediately after that:**

```
$ sed -n '/Jason/,+2 p' employee.txt
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
```


## 4. Delete Lines (d command)
`sed`의 `d` 명령어를 사용하면 줄을 삭제할 수 있습니다. 주의할 점은, 줄이 출력 스트림에서만 삭제된다는 것입니다. 다른 `sed` 명령어들처럼, `d` 명령어는 원본 입력 파일의 내용을 수정하지 않습니다.

기본적으로 주소 범위를 지정하지 않으면, `sed`는 모든 줄에 대해 일치합니다. 따라서 아래 예제는 `employee.txt` 파일의 모든 줄을 일치시켜 삭제하므로 아무것도 출력하지 않습니다.

```
sed 'd' employee.txt
```

삭제할 주소 범위를 지정하는 것이 더 유용합니다. 다음은 몇 가지 예제입니다:

**Delete only the 2nd line:**

```
$ sed '2 d' employee.txt
101,John Doe,CEO
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```

**Delete from line 1 through 4:**

```
$ sed '1,4 d' employee.txt
105,Jane Miller,Sales Manager
```

**Delete from line 2 through the last line:**

```
$ sed '2,$ d' employee.txt
101,John Doe,CEO
```

**Delete only odd number of lines:**

```
$ sed '1~2 d' employee.txt
102,Jason Smith,IT Manager
104,Anand Ram,Developer
```

**Delete lines matching the pattern "Manager":**

```
$ sed '/Manager/ d' employee.txt
101,John Doe,CEO
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
```

**Delete lines starting from the 1st match of "Jason" until the 4th line:**

```
$ sed '/Jason/,4 d' employee.txt
101,John Doe,CEO
105,Jane Miller,Sales Manager
```

만약 첫 번째 4줄에서 "Jason"과 일치하는 항목이 없다면, 이 명령어는 4번째 줄 이후에서 "Jason"과 일치하는 줄만 삭제합니다.

**Delete lines starting from the 1st match of "Raj" until the last line:**

```
$ sed '/Raj/,$ d' employee.txt
101,John Doe,CEO
102,Jason Smith,IT Manager
```

**Delete lines starting from the line matching "Raj" until the line matching "Jane":**

```
$ sed '/Raj/,/Jane/ d' employee.txt
101,John Doe,CEO
102,Jason Smith,IT Manager
```

**Delete lines starting from the line matching "Jason" and 2 lines immediately after that:**

```
$ sed '/Jason/,+2 d' employee.txt
101,John Doe,CEO
105,Jane Miller,Sales Manager
```

### Useful Delete Examples
다음 예제들은 실제 일상적인 작업에서 매우 유용합니다.

**Delete all the empty lines from a file:**

```
sed '/^$/ d' employee.txt
```

**Delete all comment lines (assuming the comment starts with #):**

```
sed '/^#/ d' employee.txt
```

참고: 여러 개의 Sed 명령어가 있을 때, Sed가 `'d'` 명령어를 만나면 패턴과 일치하는 전체 줄이 삭제되며, 삭제된 줄에 대해서는 이후 명령어가 실행되지 않습니다.


## 5. Write Pattern Space to File (w command)
`sed`의 `w` 명령어를 사용하면 현재 패턴 공간을 파일에 쓸 수 있습니다. 기본적으로 Sed 표준 흐름에 따라 패턴 공간은 `stdout`에 출력되므로, 출력이 파일로만 저장되고 화면에는 출력되지 않도록 하려면 `-n` 옵션을 함께 사용해야 합니다.

다음은 몇 가지 예제입니다.

**Write the content of employee.txt file to file output.txt (and display on screen):**

```
$ sed 'w output.txt' employee.txt
101,John Doe,CEO
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager

$ cat output.txt
101,John Doe,CEO
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```

**Write the content of employee.txt file to output.txt file but not to screen:**

```
$ sed -n 'w output.txt' employee.txt

$ cat output.txt
101,John Doe,CEO
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```

**Write only the 2nd line:**

```
$ sed -n '2 w output.txt' employee.txt

$ cat output.txt
102,Jason Smith,IT Manager
```

**Write lines 1 through 4:**

```
$ sed -n '1,4 w output.txt' employee.txt

$ cat output.txt
101,John Doe,CEO
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
```

**Write from line 2 through the last line:**

```
$ sed -n '2,$ w output.txt' employee.txt

$ cat output.txt
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```

**Write only odd numbered lines:**

```
$ sed -n '1~2 w output.txt' employee.txt

$ cat output.txt
101,John Doe,CEO
103,Raj Reddy,Sysadmin
105,Jane Miller,Sales Manager
```

**Write lines matching the pattern "Jane":**

```
$ sed -n '/Jane/ w output.txt' employee.txt

$ cat output.txt
105,Jane Miller,Sales Manager
```

**Write lines starting from the 1st match of "Jason" until the 4th line:**

```
$ sed -n '/Jason/,4 w output.txt' employee.txt

$ cat output.txt
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
```

첫 번째 4줄에서 "Jason"과 일치하는 항목이 없다면, 이 명령어는 4번째 줄 이후에서 "Jason"과 일치하는 줄만 파일에 씁니다.

**Write lines starting from the 1st match of "Raj" until the last line:**

```
$ sed -n '/Raj/,$ w output.txt' employee.txt

$ cat output.txt
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```

**Write lines starting from the line matching "Raj" until the line matching "Jane":**

```
$ sed -n '/Raj/,/Jane/ w output.txt' employee.txt

$ cat output.txt
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```

**Write the line matching "Jason" and the next 2 lines immediately after that:**

```
$ sed -n '/Jason/,+2 w output.txt' employee.txt

$ cat output.txt
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
```

참고: `w` 명령어는 자주 사용되지 않을 수 있습니다. 대부분의 사람들은 대신 UNIX 출력 리디렉션을 사용하여 `sed`의 출력을 파일에 저장합니다. 예를 들어: `sed 'p' employee.txt > output.txt`





# Chapter 2. Sed Substitute Command
스트림 편집기에서 가장 강력한 명령어는 `substitute`입니다. 이 명령어는 매우 강력하고 많은 옵션을 제공하여, 하나의 전체 장을 할애하여 설명합니다.



## 6. Sed Substitute Command Syntax

```
sed '[address-range|pattern-range] s/original string/replacement-string/[substitute-flags]' inputfile
```

위의 `sed` 치환 명령어 구문에서:

- **address-range** 또는 **pattern-range**는 선택 사항입니다. 이를 지정하지 않으면, `sed`는 모든 줄에서 치환 명령어를 실행합니다.
- **s** – `sed`에게 치환 명령어를 실행하라고 지시합니다.
- **original-string** – 입력 파일에서 검색할 문자열입니다. `original-string`은 정규 표현식이 될 수도 있습니다.
- **replacement-string** – `sed`는 `original-string`을 이 문자열로 대체합니다.
- **substitute-flags**는 선택 사항입니다. 이 부분은 다음 섹션에서 자세히 설명됩니다.

원본 파일은 변경되지 않습니다. 치환은 패턴 공간 버퍼에서 이루어지며, 이후 이 내용이 `stdout`으로 출력됩니다.

다음은 몇 가지 간단한 `sed` 치환 예제입니다(변경된 부분은 굵게 표시됨).

**Replace all occurrences of Manager with Director:**

```
$ sed 's/Manager/Director/' employee.txt
101,John Doe,CEO
102,Jason Smith,IT Director
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Director
```

**Replace Manager with Director only on lines that contain the keyword 'Sales':**

```
$ sed '/Sales/s/Manager/Director/' employee.txt
101,John Doe,CEO
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Director
```

주소 범위를 사용한 경우, 이전 예제에서 보여준 두 개의 변경 사항 대신 하나의 변경만 발생했다는 점에 유의하세요.



## 7. Global Flag (g flag)
`sed`의 치환 플래그 `g`는 글로벌(global)을 의미합니다. 기본적으로 `sed`의 치환 명령어는 각 줄에서 `{original-string}`의 첫 번째 발생만 교체합니다. 만약 한 줄에서 `{original-string}`의 모든 발생을 `{replacement-string}`으로 변경하고 싶다면, 글로벌 플래그 `g`를 사용해야 합니다.

**Replace the 1st occurrence of lower case a with upper case A:**

```
$ sed 's/a/A/' employee.txt
101,John Doe,CEO
102,JAson Smith,IT Manager
103,RAj Reddy,Sysadmin
104,AnAnd Ram,Developer
105,JAne Miller,Sales Manager
```

**Replace all occurrences of lower case a with upper case A:**

```
$ sed 's/a/A/g' employee.txt
101,John Doe,CEO
102,JAson Smith,IT MAnAger
103,RAj Reddy,SysAdmin
104,AnAnd RAm,Developer
105,JAne Miller,SAles MAnAger
```

**참고:** 이러한 예제는 주소 범위가 지정되지 않았기 때문에 전체 파일에 적용되었습니다.



## 8. Number Flag (1,2,3.. flag)
숫자 플래그를 사용하여 `original-string`의 특정 발생을 지정할 수 있습니다. 오직 n번째 발생만 치환을 트리거합니다. 카운팅은 각 줄에서 새로 시작되며, n은 1부터 512까지 아무 값이나 될 수 있습니다.

예를 들어, `/11`은 한 줄에서 `original-string`의 11번째 발생만 교체합니다.

다음은 몇 가지 예제입니다.

**Replace the 2nd occurrence of lower case a to upper case A:**

```
$ sed 's/a/A/2' employee.txt
101,John Doe,CEO
102,Jason Smith,IT MAnager
103,Raj Reddy,SysAdmin
104,Anand RAm,Developer
105,Jane Miller,SAles Manager
```

**For this example, create the following file with three lines:**

```
$ vi substitute-locate.txt
locate command is used to locate files
locate command uses database to locate files
locate command can also use regex for searching
```

**In the file you just created, change only the 2nd occurrence of locate to find:**

```
$ sed 's/locate/find/2' substitute-locate.txt
locate command is used to find files
locate command uses database to find files
locate command can also use regex for searching
```

**참고:** 위 예제의 3번 줄에서는 원본 `substitute-locate.txt` 파일에 "locate"가 하나만 존재합니다. 따라서 3번 줄에서는 아무 변경도 이루어지지 않습니다.


## 9. Print Flag (p flag)
`sed` 치환 플래그 `p`는 출력(print)을 의미합니다. 치환이 성공하면 변경된 줄을 출력합니다. `sed`의 대부분의 출력 명령어처럼, 기본적으로 모든 줄을 출력하는 것을 억제하려면 `-n` 옵션과 함께 사용하는 것이 가장 유용합니다.

**Print only the line that was changed by the substitute command:**

```
$ sed -n 's/John/Johnny/p' employee.txt
101,Johnny Doe,CEO
```

숫자 플래그 예제에서 우리는 `/2`를 사용하여 "locate"의 두 번째 발생을 "find"로 변경했습니다. 그러나 `locate.txt` 파일의 3번 줄에는 두 번째 발생이 없으므로 해당 줄에서는 치환이 발생하지 않았습니다. 이전에 사용한 명령어에 `p` 플래그를 추가하면 변경된 두 줄이 출력됩니다.

**Change the 2 nd instance of “locate” to “find” and print the result:**

```
$ sed -n 's/locate/find/2p' substitute-locate.txt
locate command is used to find files
locate command uses database to find files
```


## 10. Write Flag (w flag)
`sed` 치환 플래그 `w`는 쓰기(write)를 의미합니다. 치환이 성공하면 변경된 줄을 파일에 씁니다. 대부분의 사람들은 대신 `p` 플래그를 사용하고 출력을 파일로 리디렉션합니다. 이 명령어는 완전성을 위해 포함된 것입니다.

**Write only the line that was changed by the substitute command to output.txt:**

```
$ sed -n 's/John/Johnny/w output.txt' employee.txt

$ cat output.txt
101,Johnny Doe,CEO
```

`p` 명령어에서 보여준 것처럼, `w`를 사용하여 예제에서 `substitute-locate.txt` 파일을 적용하면 변경된 두 줄이 출력 파일로 전송됩니다.

**Change the 2 nd instance of “locate” to “find”,write the result to a file, print all lines:**

```
$ sed 's/locate/find/2w output.txt' substitute-locate.txt
locate command is used to find files
locate command uses database to find files
locate command can also use regex for searching

$ cat output.txt
locate command is used to find files
locate command uses database to find files
```


## 11. Ignore Case Flag (i flag)
`sed` 치환 플래그 `i`는 대소문자 구분을 무시(ignore case)를 의미합니다. 이 플래그를 사용하면 원본 문자열을 대소문자 구분 없이 일치시킬 수 있습니다. 단, 이 기능은 GNU Sed에서만 사용할 수 있습니다.

다음 예제에서 `sed`는 "John"을 "Johnny"로 교체하지 않습니다. 왜냐하면 원본 문자열이 소문자 "john"으로 지정되었기 때문입니다.

**Replace “john” with Johnny:**

```
$ sed 's/john/Johnny/' employee.txt
101,John Doe,CEO
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```

**Replace “john” or “John” with Johnny:**

```
$ sed 's/john/Johnny/i' employee.txt
101,Johnny Doe,CEO
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```


## 12. Execute Flag (e flag)
`sed` 치환 플래그 `e`는 실행(execute)을 의미합니다. `sed`의 `e` 플래그를 사용하면, 패턴 공간에 있는 내용을 셸 명령어로 실행할 수 있으며, 그 출력 결과는 다시 패턴 공간으로 반환됩니다. 이 기능은 GNU Sed에서만 사용할 수 있습니다.

다음은 몇 가지 예제입니다.

**For these examples create the following files.txt that contains a list of filenames with their full path:**

```
$ cat files.txt
/etc/passwd
/etc/group
```

**Add the text "ls -l " in front of every line in the files.txt and print the output:**

```
$ sed 's/^/ls -l /' files.txt
ls -l /etc/passwd
ls -l /etc/group
```

**Add the text "ls -l " in front of every line in the files.txt and execute the output:**

```
$ sed 's/^/ls -l /e' files.txt
-rw-r--r-- 1 root root 1547 Oct 27 08:11 /etc/passwd
-rw-r--r-- 1 root root 651 Oct 27 08:11 /etc/group
```


## 13. Combine Sed Substitution Flags
필요에 따라 하나 이상의 치환 플래그를 결합할 수 있습니다. 

다음 예제는 "Manager" 또는 "manager"의 모든 발생을 "Director"로 변경합니다. 또한 이 명령어는 치환 명령어로 변경된 줄만 화면에 출력하고, 같은 정보를 `output.txt` 파일에 씁니다.

**Combine g,i,p and w flags:**

```
$ sed -n 's/Manager/Director/gipw output.txt' employee.txt
102,Jason Smith,IT Director
105,Jane Miller,Sales Director

$ cat output.txt
102,Jason Smith,IT Director
105,Jane Miller,Sales Director
```



## 14. Sed Substitution Delimiter
위의 모든 `sed` 예제에서 기본 `sed` 구분자 `/`를 사용했습니다. 즉, `s/original-string/replacement-string/` 형태입니다. 만약 원본 문자열(original-string)이나 교체 문자열(replacement-string) 안에 슬래시 `/`가 포함되어 있다면, 이를 `\`로 이스케이프해야 합니다.

이 예제에서는 다음과 같은 디렉토리 경로가 포함된 `path.txt` 파일을 생성해야 합니다.

```
$ vi path.txt
reading /usr/local/bin directory
```

이제 sed 치환 명령어를 사용하여 /usr/local/bin을 /usr/bin으로 변경해 보겠습니다. 이 sed 치환 예제에서는 원본 문자열과 교체 문자열에서 경로 구분자 '/'가 백슬래시 \를 사용하여 이스케이프 처리되었습니다.

```
$ sed 's/\/usr\/local\/bin/\/usr\/bin/' path.txt
reading /usr/bin directory
```

보기 싫지 않나요? 긴 경로 이름을 교체하려 할 때, 많은 이스케이프 문자 '\'를 사용하는 것이 매우 혼란스러울 수 있습니다. 다행히도, `sed`에서는 치환 구분자로 어떤 문자든 사용할 수 있습니다. 예를 들어, `|`, `^`, `@`, `!` 등을 사용할 수 있습니다.

다음 예제들은 모두 유효하고 읽기 쉽습니다. 결과는 모두 동일하므로 명령어의 출력은 생략하였습니다. 저는 디렉토리 경로를 교체할 때 `@`(또는 `!`) 기호를 사용하는 것을 선호하지만, 이는 개인적인 선택입니다.

```
sed 's|/usr/local/bin|/usr/bin|' path.txt
sed 's^/usr/local/bin^/usr/bin^' path.txt
sed 's@/usr/local/bin@/usr/bin@' path.txt
sed 's!/usr/local/bin!/usr/bin!' path.txt
```



## 15. Multiple Substitute Commands Affecting the Same Line
앞서 논의한 대로, `sed` 실행 흐름은 "읽기(Read), 실행(Execute), 출력(Print), 반복(Repeat)"입니다. 실행(Execute) 부분은 여러 개의 `sed` 명령어로 구성될 수 있으며, `sed`는 이를 하나씩 실행합니다.

예를 들어, 두 개의 `sed` 명령어가 있을 경우, `sed`는 패턴 공간에서 `command-1`을 실행한 후, 같은 패턴 공간에서 `command-2`를 실행합니다. 만약 `command-1`이 패턴 공간에서 무언가를 변경했다면, `command-2`는 원래 읽은 줄이 아니라 새롭게 변경된 패턴 공간에 대해 실행됩니다.

다음 예제는 패턴 공간에서 두 개의 `sed` 치환 명령어가 실행되는 것을 보여줍니다.

**Change Developer to IT Manager, then change Manager to Director:**

```
$ sed '{
s/Developer/IT Manager/
s/Manager/Director/
}' employee.txt
101,John Doe,CEO
102,Jason Smith,IT Director
103,Raj Reddy,Sysadmin
104,Anand Ram,IT Director
105,Jane Miller,Sales Director
```

예제에서 4번 줄에 대한 `sed` 실행 흐름을 분석해 보겠습니다.

1. **읽기(Read)**: 이 단계에서 `sed`는 해당 줄을 읽고 패턴 공간에 넣습니다. 따라서 패턴 공간의 내용은 다음과 같습니다.

```
104,Anand Ram,Developer
```

2. **실행(Execute)**: `sed`는 첫 번째 `sed` 명령어인 `s/Developer/IT Manager/`를 패턴 공간에서 실행합니다. 따라서 이 명령어 실행 후, 패턴 공간의 내용은 다음과 같습니다.

```
104,Anand Ram,IT Manager
```

이제 `sed`는 두 번째 `sed` 명령어인 `s/Manager/Director/`를 패턴 공간에서 실행합니다. 이 명령어 실행 후, 패턴 공간의 내용은 다음과 같습니다.

```
104,Anand Ram,IT Director
```

기억하세요: `sed`는 첫 번째 명령어 실행 후, 현재 패턴 공간의 내용에 대해 두 번째 명령어를 실행합니다.


3. **출력(Print)**: `sed`는 현재 패턴 공간의 내용을 출력합니다. 그 내용은 다음과 같습니다.

```
104,Anand Ram,IT Director
```

4. **반복(Repeat)**: `sed`는 다음 줄로 이동하여 1단계부터 다시 반복합니다.



## 16. Power of & - Get Matched Pattern
`&`가 교체 문자열에서 사용되면, 그것은 원본 문자열이나 정규 표현식과 일치한 텍스트로 대체됩니다. 이는 매우 강력하고 유용한 기능입니다.

다음은 몇 가지 예시입니다.

**Enclose the employee id (the 1st three numbers) between [ and ], i.e. 101 becomes [101], 102 becomes [102], etc.**

```
$ sed 's/^[0-9][0-9][0-9]/[&]/g' employee.txt
[101],John Doe,CEO
[102],Jason Smith,IT Manager
[103],Raj Reddy,Sysadmin
[104],Anand Ram,Developer
[105],Jane Miller,Sales Manager
```

**Enclose the whole input line between < and >**

```
$ sed 's/^.*/<&>/' employee.txt
<101,John Doe,CEO>
<102,Jason Smith,IT Manager>
<103,Raj Reddy,Sysadmin>
<104,Anand Ram,Developer>
<105,Jane Miller,Sales Manager>
```



## 17. Substitution Grouping (Single Group)
`sed`에서는 일반적인 정규 표현식처럼 그룹화(grouping)를 사용할 수 있습니다. 그룹은 `\( `로 열고 `\)`로 닫습니다. 그룹화는 백참조(back-referencing)와 함께 사용할 수 있습니다.

백참조(back-reference)는 그룹화로 선택된 정규 표현식의 일부를 다시 사용하는 것입니다. `sed`에서 백참조는 정규 표현식과 치환 명령어의 교체 부분 모두에서 사용할 수 있습니다.

**Single grouping:**

```
$ sed 's/\([^,]*\).*/\1/g' employee.txt
101
102
103
104
105
```

위의 예제에서:

- 정규 표현식 `\([^,]*\)`는 첫 번째 쉼표까지의 문자열을 일치시킵니다.
- 교체 문자열에서 `\1`은 첫 번째로 일치한 그룹을 교체합니다.
- `g`는 글로벌 치환 플래그로, 각 줄에 대해 모든 일치 항목을 변경합니다.

**This sed example displays only the first field from the /etc/passwd file, i.e. it displays only the username:**

```
sed 's/\([^:]*\).*/\1/' /etc/passwd
```

**The following example encloses the 1st letter in every word inside (), if the 1st character is upper case.**

```
$ echo "The Geek Stuff" | sed 's/\(\b[A-Z]\)/\(\1\)/g'
(T)he (G)eek (S)tuff
```

다음 예제를 위해 아래와 같이 numbers.txt 샘플 파일을 생성하세요.

```
$ vi numbers.txt
1
12
123
1234
12345
123456
```

**Commify numbers,  i.e. insert commas to make them more readable:**

```
$ sed 's/\(^\|[^0-9.]\)\([0-9]\+\)\([0-9]\
{3\}\)/\1\2,\3/g' numbers.txt
1
12
123
1,234
12,345
123,456
```

위 명령은 한 줄로 실행해야 하며, 다음과 같이 입력할 수 있습니다:

```
sed 's/\(^\|[^0-9.]\)\([0-9]\+\)\([0-9]\{3\}\)/\1\2,\3/g' numbers.txt
```



## 18. Substitution Grouping (Multiple Group)
다중 그룹화에서는 여러 개의 그룹을 `\( \)`로 감싸서 사용할 수 있습니다. 치환 정규 표현식에서 여러 그룹을 사용하면, `\n`을 사용하여 n번째 그룹을 `sed` 교체 문자열에서 지정할 수 있습니다. 아래에 예시가 나와 있습니다.

**Get only the 1st column (employee id) and the 3rd column (title):**

```
$ sed 's/\([^,]*\),\([^,]*\),\([^,]*\).*/\1,\3/g'
employee.txt
101,CEO
102,IT Manager
103,Sysadmin
104,Developer
105,Sales Manager
```

위 명령은 한 줄로 실행해야 하며, 다음과 같이 입력할 수 있습니다:

```
sed 's/\([^,]*\),\([^,]*\),\([^,]*\).*/\1,\3/g' employee.txt
```

위 예제에서 볼 수 있듯이, 원본 문자열(정규 표현식)에는 세 개의 그룹이 언급되어 있습니다. 이 세 그룹은 쉼표로 구분되어 있습니다.

- `([^,]*)`는 그룹 1로, 직원 ID를 매칭합니다.
- `,`는 그룹 1 뒤의 필드 구분자입니다.
- `([^,]*)`는 그룹 2로, 직원 이름을 매칭합니다.
- `,`는 그룹 2 뒤의 필드 구분자입니다.
- `([^,]*)`는 그룹 3으로, 직원 직책을 매칭합니다.
- `,`는 그룹 3 뒤의 필드 구분자입니다. 위 예제에서 교체 문자열 부분은 이 그룹들이 어떻게 사용되어야 하는지 나타냅니다.
- `\1`은 그룹 1(직원 ID)을 출력합니다.
- `,`는 그룹 1 뒤에 쉼표를 출력합니다.
- `\3`은 그룹 3(직책)을 출력합니다.

참고: `sed`는 최대 9개의 그룹을 사용할 수 있으며, 이 그룹들은 `\1`부터 `\9`까지 참조할 수 있습니다.

**Swap field 1 (employee id) with field 2 (employee name); print the employee.txt file:**

```
$ sed 's/\([^,]*\),\([^,]*\),\(.*\).*/\2,\1,\3/g'
employee.txt
John Doe,101,CEO
Jason Smith,102,IT Manager
Raj Reddy,103,Sysadmin
Anand Ram,104,Developer
Jane Miller,105,Sales Manager
```

위 명령은 한 줄로 실행해야 하며, 다음과 같이 입력할 수 있습니다:

```
sed 's/\([^,]*\),\([^,]*\),\(.*\).*/\2,\1,\3/g' employee.txt
```


## 19. Gnu Sed Only Replacement String Flags
이 플래그들은 GNU 버전의 sed에서만 사용할 수 있습니다. 이들은 sed 대체 명령의 교체 문자열 부분에서 사용할 수 있습니다.


### \l replacement string flag**

교체 문자열 부분에서 `\l`을 지정하면, `\l` 뒤에 오는 문자를 소문자로 처리합니다. 이미 알고 있듯이, 다음 간단한 예제는 "John"을 "JOHNNY"로 변경합니다.

```
sed 's/John/JOHNNY/' employee.txt
```

다음 예제는 교체 문자열에서 `\l`을 H 앞에 두었습니다 (즉, `JO\lHNNY`). 이 경우 "JOHNNY"에서 H 뒤의 문자 'H'만 소문자로 변경됩니다.

**Change John to JOhNNY:**

```
$ sed -n 's/John/JO\lHNNY/p' employee.txt
101,JOhNNY Doe,CEO
```


### \L replacement string flag
교체 문자열에서 `\L`을 지정하면, 그 뒤에 오는 모든 문자를 소문자로 처리합니다.

다음 예제는 교체 문자열에서 `\L`을 H 앞에 두었습니다 (즉, `JO\LHNNY`). 이 경우 "JOHNNY"에서 H 뒤의 모든 문자가 소문자로 변경됩니다.

**Change Johnny to JOhnny:**

```
$ sed -n 's/John/JO\LHNNY/p' employee.txt
101,JOhnny Doe,CEO
```

### \u replacement string flag
` \u`는 `\l`과 비슷하지만, 대문자 처리를 합니다. 교체 문자열에서 `\u`를 지정하면, `\u` 뒤에 오는 문자를 대문자로 처리합니다.

다음 예제는 교체 문자열에서 `\u`를 h 앞에 두었습니다 (즉, `jo\uhnny`). 이 경우 "johnny"에서 'h'만 대문자로 변경되어 "Johnny"가 됩니다.

**Change John to joHnny:**

```
$ sed -n 's/John/jo\uhnny/p' employee.txt
101,joHnny Doe,CEO
```


### \U replacement string flag
교체 문자열에서 `\U`를 지정하면, 그 뒤에 오는 모든 문자를 대문자로 처리합니다. 다음 예제는 교체 문자열에서 `\U`를 h 앞에 두었습니다 (즉, `jo\Uhnny`). 이 경우 "johnny"에서 h 뒤의 모든 문자가 대문자로 변경되어 "JOHNNY"가 됩니다.

**Change John to joHNNY:**

```
$ sed -n 's/John/jo\Uhnny/p' employee.txt
101,joHNNY Doe,CEO
```


### \E replacement string flag
이것은 `\L` 또는 `\U`와 함께 사용해야 합니다. 이것은 `\L` 또는 `\U`로 시작된 변환을 멈추게 합니다. 다음 예제는 교체 문자열의 시작에 `\U`가 있기 때문에 "Johnny Boy" 전체 문자열을 대문자로 출력합니다.

**Change John to JOHNNY BOY:**

```
$ sed -n 's/John/\UJohnny Boy/p' employee.txt
101,JOHNNY BOY Doe,CEO
```

**Change John to JOHNNY Boy:**

```
$ sed -n 's/John/\UJohnny\E Boy/p' employee.txt
101,JOHNNY Boy Doe,CEO
```

위 예제는 교체 문자열에서 "Johnny" 뒤에 바로 `\E`가 있기 때문에 "Johnny"만 대문자로 출력됩니다.



## Replacement String Flag Usages
위의 정적 예제들은 이러한 스위치들이 어떻게 작동하는지 이해하기 위해 보여진 것입니다. 그러나 플래그는 정적 값에 사용될 때 큰 의미가 없습니다. 왜냐하면 필요한 대로 정확한 대소문자를 정적으로 입력할 수 있기 때문입니다. 

이 플래그들은 그룹화와 결합할 때 매우 유용합니다. 이전 예제에서는 그룹화를 사용하여 필드 1과 필드 3을 교환하는 방법을 배웠습니다. 이러한 스위치를 사용하여 전체 그룹을 대문자나 소문자로 변환할 수 있습니다.

**Employee name in all upper case, and title in all lower case:**

```
$ sed 's/\([^,]*\),\([^,]*\),\(.*\).*/\U\2\E,\1,\L\3/g'
employee.txt
JOHN DOE,101,ceo
JASON SMITH,102,it manager
RAJ REDDY,103,sysadmin
ANAND RAM,104,developer
JANE MILLER,105,sales manager
```

위 명령은 아래와 같이 한 줄로 실행되어야 합니다.

```
sed 's/\([^,]*\),\([^,]*\),\(.*\).*/\U\2\E,\1,\L\3/g' employee.txt
```

위 예제에서, 교체 문자열에서는 다음과 같습니다:

- **\U\2\E** - 이는 두 번째 그룹(직원 이름)인 이 필드를 대문자로 변환해야 함을 나타냅니다. \U는 대문자 변환을 시작하고, \E는 이를 중지합니다.
- **\L\3** - 이는 세 번째 그룹(직책)인 이 필드를 소문자로 변환해야 함을 나타냅니다. \L은 나머지 문자의 소문자 변환을 시작합니다.




# Chapter 3. Regular Expressions

## 20. Regular Expression Fundamentals
정규 표현식(또는 regex)은 많은 *nix 명령어에서 사용되며, sed에도 사용됩니다.


### Beginning of line ( ^ )
캐럿 기호 ^는 행의 시작 부분과 일치합니다.

**Display lines which start with 103:**

```
$ sed -n '/^103/ p' employee.txt
103,Raj Reddy,Sysadmin
```

^는 정규 표현식에서 첫 번째 문자일 때만 행의 시작 부분과 일치한다는 점을 유의하세요. 이 예제에서 ^N은 N으로 시작하는 모든 행과 일치합니다.


### End of line ( $)
달러 기호 $는 행의 끝과 일치합니다.

**Display lines which end with the letter r:**

```
$ sed -n '/r$/ p' employee.txt
102,Jason Smith,IT Manager
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```


### Single Character (.)
특수 메타 문자 “.” (점)은 줄 끝 문자를 제외한 모든 문자와 일치합니다.
- .은 단일 문자와 일치합니다.
- ..은 두 문자와 일치합니다.
- ...은 세 문자와 일치합니다.
- 등등.

다음 예시에서 "J 뒤에 세 문자가 오고 그 뒤에 공백이 오는" 패턴은 "Jason 뒤에 공백"으로 대체됩니다.
따라서 "J... "는 "John "과 "Jane "을 모두 일치시키며, employee.txt의 이 두 줄은 각각 아래와 같이 대체됩니다.

```
$ sed -n 's/J... /Jason /p' employee.txt
101,Jason Doe,CEO
105,Jason Miller,Sales Manager
```


### Zero or more Occurrences (*)
특수 문자 "*" (별표)는 이전 문자의 0번 이상의 발생과 일치합니다. 예를 들어, 패턴 '1*'은 '1'이 0번 이상 나타나는 경우와 일치합니다.

**For this example create the following log.txt file:**

```
$ vi log.txt
log: Input Validated
log:
log: testing resumed
log:
log:output created
```

"로그:" 뒤에 메시지가 있는 줄만 보고 싶다고 가정해봅시다. 메시지가 "log:" 바로 뒤에 올 수도 있고, 일부 공백이 있을 수도 있습니다. "log:"만 포함된 줄은 보고 싶지 않습니다.

**Display all the lines that contain "log:" followed by one or more spaces followed by a character:**

```
$ sed -n '/log: *./ p' log.txt
log: Input Validated
log: testing resumed
log:output created
```

**참고:** 위 예제에서 끝에 있는 점(.)은 필요합니다. 만약 포함되지 않으면, sed는 "log:"만 포함된 모든 줄도 출력합니다.



### One or more Occurrence (\+)
특수 문자 “\+”는 이전 문자가 하나 이상 나타나는 경우에 일치합니다. 예를 들어, “\+” 앞에 공백이 있으면, 즉 “ \+”는 하나 이상의 공백 문자와 일치합니다.  

같은 log.txt 파일을 예시로 사용해 보겠습니다.

**Display all the lines that contain "log:" followed by one or more spaces:**

```
$ sed -n '/log: \+/ p' log.txt
log: Input Validated
log:   testing resumed
```

**참고:** 위 예제는 "log:"만 포함된 라인뿐만 아니라 "log:output created"와 같은 라인도 일치하지 않았습니다. 이는 이 라인에 "log:" 뒤에 공백이 없기 때문입니다.


### Zero or one Occurrence (\?)
특수 문자 “?”는 이전 문자의 0회 또는 1회의 발생과 일치합니다.

```
$ sed -n '/log: \?/ p' log.txt
log: Input Validated
log:
log:    testing resumed
log:
log:output created
```


### Escaping the Special Character (\)
특수 문자를 검색하려면(예: *, dot) 정규 표현식에서 해당 특수 문자를 이스케이프해야 합니다.

```
$ sed -n '/127\.0\.0\.1/ p' /etc/hosts
127.0.0.1 localhost.localdomain localhost
```


### Character Class ([0-9])
문자 클래스는 대괄호 안에 나열된 문자 목록일 뿐입니다. 이는 여러 문자 중 하나와만 일치하는 데 사용됩니다.

**Match any line that contains 2 or 3 or 4:**

```
$ sed -n '/[234]/ p' employee.txt
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
```

대괄호 안에서는 하이픈을 사용하여 문자 범위를 지정할 수 있습니다. 예를 들어, [0123456789]는 [0-9]로 표현할 수 있으며, 알파벳 범위는 [a-z], [A-Z] 등으로 지정할 수 있습니다.

**Match any line that contains 2 or 3 or 4 (alternate form):**

```
$ sed -n '/[2-4]/ p' employee.txt
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
```



## 21. Additional Regular Expressions

### OR Operation (|)
파이프 문자 (|)는 두 개의 전체 하위 표현식 중 하나가 해당 위치에서 발생할 수 있음을 지정하는 데 사용됩니다. "하위표현식1|하위표현식2"는 하위표현식1 또는 하위표현식2 중 하나와 일치합니다.

**Print lines containing either 101 or 102:**

```
$ sed -n '/101\|102/ p' employee.txt
101,John Doe,CEO
102,Jason Smith,IT Manager
```

다음과 같이 `|` 기호는 `/`로 이스케이프 처리되어야 합니다.

**Print lines that contain a character from 2 to 3 or that contain the string 105:**

```
$ sed -n '/[2-3]\|105/ p' employee.txt
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
105,Jane Miller,Sales Manager
```


### Exactly M Occurrences ({m})
정규 표현식 뒤에 {m}이 오면, 앞선 표현식이 정확히 m번 발생하는지 일치합니다.  

이 예시를 위해 아래와 같은 `numbers.txt` 파일을 만듭니다.

```
$ vi numbers.txt
1
12
123
1234
12345
123456
```

**Print lines that contain any digit (will print all lines):**

```
$ sed -n '/[0-9]/ p' numbers.txt
1
12
123
1234
12345
123456
```

**Print lines consisting of exactly 5 digits:**

```
$ sed -n '/^[0-9]\{5\}$/ p' numbers.txt
12345
```


### M to N Occurrences ({m,n})
정규 표현식 뒤에 {m,n}이 오면, 앞선 항목이 최소 m번 이상, 최대 n번 이하로 일치해야 함을 나타냅니다. m과 n의 값은 음이 아닌 숫자여야 하며 255보다 작아야 합니다.

**Print lines consisting of at least 3 but not more than 5 digits:**

```
$ sed -n '/^[0-9]\{3,5\}$/ p' numbers.txt
123
1234
12345
```

정규 표현식 뒤에 {m,}이 오는 경우는 특수한 경우로, 앞선 표현식이 m번 이상 일치하는 경우를 나타냅니다.


### Word Boundary (\b)
\b는 단어 경계를 일치시키는 데 사용됩니다. \b는 단어의 시작(\bxx) 또는 끝(xx\b)에서 문자를 일치시킵니다. 따라서 \bthe\b는 "the"는 찾지만 "they"는 찾지 않습니다. \bthe는 "the" 또는 "they"를 찾습니다.

테스트를 위해 아래와 같은 샘플 파일을 생성하세요.

```
$ cat words.txt
word matching using: the
word matching using: thethe
word matching using: they
```

**Match lines containing the whole word "the":**

```
$ sed -n '/\bthe\b/ p' words.txt
word matching using: the
```

만약 \b를 끝에 지정하지 않으면, 모든 줄과 일치하게 됩니다.

**Match lines containing words that start with “the”:**

```
$ sed -n '/\bthe/ p' words.txt
word matching using: the
word matching using: thethe
word matching using: they
```


### Back References (\n)
백참조(Back references)는 표현식을 그룹화하여 나중에 사용할 수 있게 해줍니다.

**Match only the line that has the word "the" repeated twice:**

```
$ sed -n '/\(the\)\1/ p' words.txt
```

같은 논리를 사용하여, 정규 표현식 "\([0-9]\)\1"은 두 자릿수 숫자 중 두 자릿수가 동일한 숫자(예: 11, 22, 33 등)를 매칭합니다.


## 22. Sed Substitution Using Regular Expression
다음은 정규 표현식을 사용하는 몇 가지 sed 치환 예제입니다.

**Replace the last two characters in every line of employee.txt with ",Not Defined":**

```
$ sed 's/..$/,Not Defined/' employee.txt
101,John Doe,C,Not Defined
102,Jason Smith,IT Manag,Not Defined
103,Raj Reddy,Sysadm,Not Defined
104,Anand Ram,Develop,Not Defined
105,Jane Miller,Sales Manag,Not Defined
```

**Delete the rest of the line starting from “Manager”:**

```
$ sed 's/Manager.*//' employee.txt
101,John Doe,CEO
102,Jason Smith,IT
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales
```

**Delete all lines that start with "#" :**

```
sed -e 's/#.*// ; /^$/ d' employee.txt
```

다음 예제를 위한 test.html 파일을 생성하세요:

```
$ vi test.html
<html><body><h1>Hello World!</h1></body></html>
```

**Strip all html tags from test.html:**

```
$ sed -e 's/<[^>]*>//g' test.html
Hello World!
```

**Remove all comments and blank lines:**

```
sed -e 's/#.*//' -e '/^$/ d' /etc/profile
```

**Remove only the comments. Leave the blank lines:**

```
sed -e '/^#.*/ d' /etc/profile
```

DOS 형식의 새 줄 (CR/LF)을 Unix 형식으로 변환할 수 있습니다. DOS 파일을 Unix로 복사하면 각 줄의 끝에 \r\n이 있을 수 있습니다.

**Convert the DOS file format to Unix file format using sed:**

```
sed 's/.$//' filename
```




# Chapter 4. Sed Execution

## 23. Multiple Sed Commands in Command Line
1장에서도 보여드린 것처럼, 명령줄에서 여러 개의 sed 명령을 실행하는 방법은 여러 가지가 있습니다.


### 1. Use multiple -e option in the command line
다음과 같이 -e sed 명령어 옵션을 사용하여 여러 개의 sed 명령을 사용할 수 있습니다:

```
sed -e 'command1' -e 'command2' -e 'command3'
```

**Search for root, or nobody, or mail in the /etc/passwd file:**

```
sed -n -e '/^root/ p' -e '/^nobody/ p' -e '/^mail/p' /etc/passwd
```

위의 명령은 아래와 같이 한 줄로 실행해야 합니다.

```
sed -n -e '/^root/ p' -e '/^nobody/ p' -e '/^mail/ p' /etc/passwd
```


### 2. Break-up several sed commands using \
매우 긴 명령을 실행할 때, -e 옵션을 사용하여 여러 sed 명령을 명령줄에서 실행하는 경우, \를 사용하여 줄을 나눌 수 있습니다.

```
sed -n -e '/^root/ p' \
-e '/^nobody/ p' \
-e '/^mail/ p' \
/etc/passwd
```


### 3. Group multiple commands using { }
여러 개의 sed 명령을 실행해야 할 때, 아래와 같이 `{ }`를 사용하여 그룹화할 수 있습니다.

```
sed -n '{
/^root/ p
/^nobody/ p
/^mail/ p
}' /etc/passwd
```


## 24. Sed Script Files
특정 sed 명령어 세트를 재사용하려면, 모든 sed 명령어를 포함하는 sed 스크립트 파일을 생성한 후, 아래와 같이 `-f` 명령줄 옵션을 사용하여 실행할 수 있습니다.  

먼저, 아래와 같이 모든 sed 명령어를 포함하는 파일을 생성합니다. 개별 sed 명령어의 동작은 이전 섹션에서 이미 설명했습니다.

```
$ vi mycommands.sed
s/\([^,]*\),\([^,]*\),\(.*\).*/\2,\1,\3/g
s/^.*/<&>/
s/Developer/IT Manager/
s/Manager/Director/
```

다음으로, 이 sed 명령어 파일을 입력 파일에 실행합니다.



## 25. Sed Comments
Sed 주석은 #으로 시작합니다. Sed는 매우 난해한 언어를 사용하기 때문에, 오늘 작성한 sed 명령어가 시간이 지나 다시 보면 생소할 수 있습니다. 따라서 sed 스크립트 파일 안에 주석을 추가하여 의미를 문서화하는 것이 좋습니다. 다음과 같이 sed 주석을 사용할 수 있습니다.

```
$ vi mycommands.sed
# Swap field 1 (employee id) with field 2 (employee
name)
s/\([^,]*\),\([^,]*\),\(.*\).*/\2,\1,\3/g
# Enclose the whole line within < and >
s/^.*/<&>/
# Replace Developer with IT Manager
s/Developer/IT Manager/
# Replace Manager with Director
s/Manager/Director/
```

**참고:** `*.sed` 스크립트의 첫 번째 줄에서 처음 두 글자가 `#n`이면, `sed`는 자동으로 `-n` 옵션(패턴 버퍼를 출력하지 않음)을 사용합니다.



## 26. Sed as an Interpreter
쉘 스크립트를 작성하여 파일 이름만으로 실행하는 것처럼, `sed` 스크립트도 설정하여 명령줄에서 실행할 수 있습니다. 즉, `sed`를 인터프리터로 사용할 수 있습니다. 이를 위해 `sed-script.sh` 파일의 첫 번째 줄에 `#!/bin/sed -f`를 추가합니다.

```
$ vi myscript.sed
#!/bin/sed -f
# Swap field 1 (employee id) with field 2 (employee
name)
s/\([^,]*\),\([^,]*\),\(.*\).*/\2,\1,\3/g
# Enclose the whole line within < and >
s/^.*/<&>/
# Replace Developer with IT Manager
s/Developer/IT Manager/
# Replace Manager with Director
s/Manager/Director/
```

이제 명령줄에서 직접 `sed` 스크립트를 실행하여 실행할 수 있습니다.

```
chmod u+x myscript.sed

./myscript.sed employee.txt
```

sed 스크립트의 첫 번째 줄에 `-n`을 지정하여 출력을 억제할 수도 있습니다.

```
$ vi testscript.sed
#!/bin/sed -nf
/root/ p
/nobody/ p
```

이제 위의 테스트 스크립트를 다음과 같이 실행하십시오.

```
chmod u+x testscript.sed

./testscript.sed /etc/passwd
```

테스트 목적으로 `testscript.sed`의 첫 번째 줄에서 `-n`을 제거하고 다시 실행하여 어떻게 작동하는지 확인하십시오.  

중요한 점: `-nf`를 사용해야 하며 `-fn`을 사용하면 다음과 같은 오류 메시지가 표시됩니다.

```
$ ./testscript.sed /etc/passwd
/bin/sed: couldn't open file n: No such file or directory
```


## 27. Modifying the Input File Directly
이미 알고 계시겠지만, sed는 기본적으로 입력 파일을 수정하지 않습니다. sed는 출력을 표준 출력에 씁니다. 그 출력을 파일에 저장하려면 리디렉션을 사용하거나 `w` 명령을 사용해야 합니다.  

이 예제를 계속 진행하기 전에 `employee.txt`의 백업을 만드세요.

```
cp employee.txt employee.txt.orig
```

입력 파일을 직접 수정하려면 일반적으로 출력을 임시 파일로 리디렉션한 후, 임시 파일을 새로운 파일로 이름을 바꾸는 방식으로 진행합니다.

```
sed 's/John/Johnny/' employee.txt > new-employee.txt
mv new-employee.txt employee.txt
```

대신에, sed 명령의 -i 옵션을 사용하여 sed가 입력 파일을 직접 수정할 수 있습니다.

**Replace John with Johnny in the original employee.txt file itself:**

```
$ sed -i 's/John/Johnny/' employee.txt

$ cat employee.txt
101,Johnny Doe,CEO
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```

다시 말하지만, **-i 옵션은 입력 파일을 수정합니다.** 이 작업은 때때로 필요할 수 있지만, 매우 조심해야 합니다. 이를 보호하기 위해 할 수 있는 한 가지 방법은 -i를 사용할 때 파일 확장자를 추가하는 것입니다. 그러면 sed는 새 콘텐츠를 작성하기 전에 원본 파일의 백업을 만듭니다.

**Replace John with Johnny in the original employee.txt file but save a backup copy:**

```
$ sed -ibak 's/John/Johnny/' employee.txt
```

이것은 원본 파일의 백업을 아래와 같이 생성합니다.

```
$ cat employee.txtbak
101,John Doe,CEO
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```

위의 sed 명령어에 의해 원본 입력 파일이 수정되었습니다.

```
$ cat employee.txt
101,Johnny Doe,CEO
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```

-i 대신에 --in-place를 사용할 수도 있습니다. 다음의 두 명령어는 동일합니다.

```
sed -ibak 's/John/Johnny/' employee.txt
sed --in-place=bak 's/John/Johnny/' employee.txt
```

마지막으로, 나머지 예제에서 필요한 원본 `employee.txt` 파일을 복원하세요.

```
cp employee.txt.orig employee.txt
```



# Chapter 5. Additional Sed Commands

## 28. Append Line After (a command)
특정 위치에 새 줄을 추가하려면 sed append 명령(a)을 사용할 수 있습니다.

**Syntax:**

```
$ sed '[address] a the-line-to-append' input-file
```

**Add a new record to the employee.txt file after line number:**

```
$ sed '2 a 203,Jack Johnson,Engineer' employee.txt
101,John Doe,CEO
102,Jason Smith,IT Manager
203,Jack Johnson,Engineer
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```

**Add a new record to the end of the employee.txt file:**

```
$ sed '$ a 106,Jack Johnson,Engineer' employee.txt
101,John Doe,CEO
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
106,Jack Johnson,Engineer
```

sed a 명령을 사용하여 여러 줄을 추가할 수도 있습니다.

**Add two lines after the line that matches 'Jason':**

```
$ sed '/Jason/a\
203,Jack Johnson,Engineer\
204,Mark Smith,Sales Engineer' employee.txt
101,John Doe,CEO
102,Jason Smith,IT Manager
203,Jack Johnson,Engineer
204,Mark Smith,Sales Engineer
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```


## 29. Insert Line Before (i command)
sed insert 명령(i)은 append 명령과 동일하게 작동하지만, 특정 위치 이후가 아니라 그 위치 이전에 줄을 삽입합니다.

**Syntax:**

```
$ sed '[address] i the-line-to-insert' input-file
```

**Insert a new record before line number 2 of the employee.txt file:**

```
$ sed '2 i 203,Jack Johnson,Engineer' employee.txt
101,John Doe,CEO
203,Jack Johnson,Engineer
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```

**Insert a new record before the last line of the employee.txt file:**

```
$ sed '$ i 108,Jack Johnson,Engineer' employee.txt
101,John Doe,CEO
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
108,Jack Johnson,Engineer
105,Jane Miller,Sales Manager
```

sed i 명령을 사용하여 여러 줄을 삽입할 수도 있습니다.

**Insert two lines before the line that matches 'Jason':**

```
$ sed '/Jason/i\
203,Jack Johnson,Engineer\
204,Mark Smith,Sales Engineer' employee.txt
101,John Doe,CEO
203,Jack Johnson,Engineer
204,Mark Smith,Sales Engineer
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```


## 30. Change Line (c command)
sed 변경 명령(c)은 기존의 줄을 새로운 텍스트로 교체할 수 있게 해줍니다.

**Syntax:**

```
$ sed '[address] c the-line-to-insert' input-file
```

**Delete the record at line number 2 and replace it with a new record:**

```
$ sed '2 c 202,Jack Johnson,Engineer' employee.txt
101,John Doe,CEO
202,Jack Johnson,Engineer
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```

한 줄을 여러 줄로 교체할 수도 있습니다.

**Delete the line that matches 'Raj' and replaces it with two new lines:**

```
$ sed '/Raj/c\
203,Jack Johnson,Engineer\
204,Mark Smith,Sales Engineer' employee.txt
101,John Doe,CEO
102,Jason Smith,IT Manager
203,Jack Johnson,Engineer
204,Mark Smith,Sales Engineer
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```


## 31. Combine a, i, and c Commands
a, i, c 명령을 결합할 수도 있습니다. 다음의 sed 예제는 세 가지 작업을 모두 수행합니다:

- a - 'Jason' 뒤에 'Jack Johnson'을 추가
- i - 'Jason' 앞에 'Mark Smith'를 삽입
- c - 'Jason'을 'Joe Mason'으로 변경

```
$ sed '/Jason/ {
a\
204,Jack Johnson,Engineer
i\
202,Mark Smith,Sales Engineer
c\
203,Joe Mason,Sysadmin
}' employee.txt
101,John Doe,CEO
202,Mark Smith,Sales Engineer
203,Joe Mason,Sysadmin
204,Jack Johnson,Engineer
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```


## 32. Print Hidden Characters (l command)
sed `l` 명령은 숨겨진 문자를 출력합니다. 예를 들어, `\t`는 탭을, `$`는 줄의 끝을 나타냅니다.

테스트를 위해 다음과 같은 내용을 가진 테스트 파일을 만드세요. 이 파일에서 필드 사이에는 탭 키를 사용해야 합니다.

```
$ cat tabfile.txt
fname First Name
lname Last Name
mname Middle Name
```

**Executing the sed l command will display \t for tab, and $ for EOL:**

```
$ sed -n l tabfile.txt
fname\tFirst Name$
lname\tLast Name$
mname\tMiddle Name$
```

숫자 뒤에 `l` 명령을 지정하면 출력 줄이 n번째 숫자에서 비표시 문자를 사용하여 래핑됩니다. 아래의 예시처럼 동작합니다. 이 기능은 GNU sed에서만 작동합니다.

```
$ sed -n 'l 20' employee.txt
101,John Doe,CEO$
102,Jason Smith,IT \
Manager$
103,Raj Reddy,Sysad\
min$
104,Anand Ram,Devel\
oper$
105,Jane Miller,Sal\
es Manager$
```



## 33. Print Line Numbers (= command)
`sed =` 명령은 입력 파일에서 줄 번호와 해당 줄의 내용을 출력합니다.

**Print all line numbers:**

```
$ sed = employee.txt
1
101,John Doe,CEO
2
102,Jason Smith,IT Manager
3
103,Raj Reddy,Sysadmin
4
104,Anand Ram,Developer
5
105,Jane Miller,Sales Manager
```

**참고:** `=` 명령과 `N` 명령을 결합하여 줄 번호와 해당 줄의 내용을 같은 줄에 출력할 수 있습니다 (자세한 내용은 나중에 설명합니다).

**Print line numbers only for lines 1,2 and 3:**

```
$ sed '1,3 =' employee.txt
1
101,John Doe,CEO
2
102,Jason Smith,IT Manager
3
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
105,Jane Miller,Sales Manager
```

"Jane"이라는 키워드를 포함하는 라인의 라인 번호만 출력하고, 여전히 원본 라인 내용이 입력 파일에서 출력되도록 하라는 요청을 하셨습니다.

```
$ sed '/Jane/ =' employee.txt
101,John Doe,CEO
102,Jason Smith,IT Manager
103,Raj Reddy,Sysadmin
104,Anand Ram,Developer
5
105,Jane Miller,Sales Manager
```

원본 내용은 출력하지 않고, "Jane" 키워드를 포함하는 라인들의 라인 번호만 출력하고자 할 경우, -n 옵션과 함께 =를 사용하라는 내용입니다.

```
$ sed -n '/Raj/ =' employee.txt
3
```

**Print the total number of lines in a file:**

```
$ sed -n '$ =' employee.txt
5
```



## 34. Change Case (using the y 'transform' command)
































































































































































