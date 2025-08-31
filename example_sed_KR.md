# Preface
검색 및 바꾸기 대화 상자(일반적으로 Ctrl+H 단축키로 호출)를 사용하여 특정 문자열의 발생 위치를 찾아 다른 문자열로 바꾸는 데 익숙할 것입니다. sed 명령은 명령줄에서 사용할 수 있는 검색 및 바꾸기 작업을 위한 다목적의 풍부한 기능 버전입니다. GUI 애플리케이션에 부족할 수 있는 중요한 기능은 일치하는 기준을 정확하게 정의하는 미니 프로그래밍 언어인 정규식입니다.

이 책은 예제를 많이 활용하여 기능을 하나씩 소개합니다. 명령 옵션 외에도 정규 표현식에 대해서도 자세히 설명합니다. 그러나 데이터 버퍼를 조작하는 명령과 여러 줄 기법은 간략하게만 설명하고 일부 명령은 완전히 생략합니다.

각 예제는 직접 입력해 보실 것을 권장합니다. 예제 입력과 제시된 해결 방법을 이해하고 입력과 명령의 일부를 변경했을 때 출력이 변경되는지(또는 변경되지 않는지!) 확인하도록 노력하세요. 자동차 운전을 배우는 것을 비유하자면, 자동차에 대해 아무리 많은 책을 읽고 설명을 들어도 능숙해지려면 실제 경험이 필요합니다.


## Prerequisites
유닉스와 유사한 환경에서 명령줄 사용법에 익숙해야 합니다. 또한 파일 리디렉션 및 명령 파이프라인과 같은 개념에 익숙해야 합니다. grep 명령의 기본을 알면 sed 의 필터링 기능을 이해하는 데 도움이 됩니다.

명령줄을 처음 사용하는 경우 이 책을 시작하기 전에 명령줄에서 컴퓨팅하기 전자책과 Linux CLI 및 Shell 스크립팅에 대한 엄선된 리소스를 확인해 보세요.


## Conventions
여기에 제시된 예제는 GNU sed 버전 4.9로 테스트되었으며 이전 버전에서는 사용할 수 없는 기능이 포함되어 있을 수 있습니다.
코드 조각은 GNU bash 셸에서 복사하여 붙여넣고 프레젠테이션용으로 수정한 것입니다. 일부 명령어 앞에는 컨텍스트와 설명을 제공하기 위한 주석이 있습니다. 가독성을 높이기 위해 빈 줄이 표시되고, 속도 비교를 위해 실시간만 표시되며, wget 등의 명령에서는 출력이 생략됩니다. 별도의 언급이 없는 한, 모든 예제와 설명은 ASCII 입력에 대한 것입니다.
sed는 GNU sed를 의미하고, grep는 GNU grep 등을 의미합니다.
특정 주제를 더 자세히 살펴볼 수 있도록 책 곳곳에 외부 링크가 제공됩니다.
learn_gnused 저장소에는 예제, 연습 문제 및 책과 관련된 기타 세부 사항에 사용된 모든 코드 스니펫과 파일이 있습니다. git 명령에 익숙하지 않은 경우 웹페이지의 코드 버튼을 클릭하여 파일을 가져올 수 있습니다.


## Acknowledgements
GNU sed 설명서 - 설명서 및 예제
stackoverflow 및 unix.stackexchange - sed 및 관련 명령에 대한 관련 질문에 대한 답변
tex. stackexchange - 판독 및 tex 관련 질문에 대한 도움말
/r/commandline/, /r/linux4noobs/, /r/linuxquestions/ 및 /r/linux/ - 유용한 포럼
canva - 표지 이미지
oxipng, pngquant 및 svgcleaner - 이미지 최적화
Amada44의 공개 도메인 경고 및 정보 아이콘
모호한 설명을 발견한 arifmahmudrana
특히 어려운 시기에 도움, 지원 및 격려를 준 모든 친구와 온라인 지인에게 특별한 감사를 표합니다.


## Feedback and Errata
이 책에 대해 어떻게 생각하시는지 알려주시면 대단히 감사하겠습니다. 간단한 감사 인사부터 오타, 코드 스니펫의 실수, 책의 어떤 부분이 마음에 들었는지(또는 마음에 들지 않았는지) 등 무엇이든 가능합니다. 독자의 피드백은 필수적이며 특히 셀프 퍼블리싱 저자의 경우 더욱 중요합니다.

다음 연락처로 연락하실 수 있습니다:

이슈 관리자: https://github.com/learnbyexample/learn_gnused/issues
이메일: learnbyexample.net@gmail.com
트위터: https://twitter.com/learn_byexample


## Author info
순딥 아가왈은 소박한 생활에 필요한 만큼만 일하는 것을 선호하는 게으른 사람입니다. 그는 아날로그 디바이스에서 설계 엔지니어로 일하며 막대한 부를 축적했고, 스물여덟의 무르익은 나이에 회사에서 은퇴했습니다. 하지만 안타깝게도 그는 몇 년 만에 저축한 돈을 모두 탕진하고 생계를 위해 동분서주해야 했습니다. 모든 역경에도 불구하고 프로그래밍 전자책을 판매하면서 게으른 자신을 다시 일자리를 찾을 필요 없이 구할 수 있었습니다. 이제 그는 읽고 싶은 판타지 전자책을 모두 살 수 있게 되었고, 인터넷 검색에 건강하지 않은 시간을 할애하지 않게 되었습니다.

창의적인 뮤즈가 떠오르면 그는 또 다른 프로그래밍 전자책(항상 정규식이 포함된 예제가 하나 이상 포함되어 있습니다)을 작업하고 있는 모습을 볼 수 있습니다. 전자책을 위한 자료 조사와 일상적인 소셜 미디어 사용으로 북마크가 넘쳐나기 때문에 정신 건강을 위해 선별된 리소스 목록을 관리하고 있습니다. 그는 무료 학습 자료와 오픈 소스 도구에 감사하고 있습니다. 그의 기고문은 https://github.com/learnbyexample 에서 확인할 수 있습니다. 도서 목록: https://learnbyexample.github.io/books/

## License
이 저작물은 크리에이티브 커먼즈 저작자표시-비영리-동일조건변경허락 4.0 국제 라이선스에 따라 이용허락됩니다.

코드 스니펫은 MIT 라이선스에 따라 사용할 수 있습니다.

위의 감사 섹션에 언급된 리소스는 원본 라이선스에 따라 사용할 수 있습니다.

## Book version
2.0
2.0 책 버전 간의 변경 사항을 추적하려면 Version_changes.md를 참조하세요.




# Introduction
명령 이름 sed는 스트림 편집기에서 파생된 이름입니다. 여기서 스트림은 셸 파이프를 통해 전달되는 데이터를 의미합니다. 따라서 이 명령의 주요 기능은 출력 대상을 stdout으로 설정한 stdin 데이터의 텍스트 편집기 역할을 하는 것입니다. 이제는 파일 입력뿐만 아니라 제자리 파일 편집에도 sed를 사용하는 것이 일반적입니다.

이 장에서는 최신 sed 버전을 설치하는 방법과 문서와 관련된 세부 사항을 보여드리겠습니다. 그런 다음 가장 일반적으로 사용되는 기능인 대체 명령에 대해 소개합니다. 이어지는 장에서는 대체 명령에 대한 자세한 내용을 추가하고 다른 명령어와 명령줄 옵션에 대해 설명합니다. 각 장의 마지막에는 치트 시트, 요약 및 연습 문제도 포함되어 있습니다.

## Installation
유닉스 계열 시스템을 사용 중이라면 이미 일부 버전의 sed가 설치되어 있을 가능성이 높습니다. 이 책은 주로 GNU sed 에 대해 설명합니다. 다양한 구현 간에 구문과 기능에 차이가 있으므로 이 책에 제시된 예제를 따라 하려면 반드시 GNU sed를 사용해야 합니다.

GNU sed는 텍스트 생성 및 조작 도구의 일부이며 GNU/Linux 배포판에 기본적으로 제공됩니다. 특정 버전을 설치하려면 gnu: sed 소프트웨어를 참조하세요. 일부 명령이 예상대로 작동하지 않는다고 생각되면 버전 간 변경 사항과 버그 목록에 대한 개요를 보려면 릴리스 노트도 참조하세요.

```
$ wget https://ftp.gnu.org/gnu/sed/sed-4.9.tar.xz
$ tar -Jxf sed-4.9.tar.xz
$ cd sed-4.9/
# see https://askubuntu.com/q/237576 if you get compiler not found error
$ ./configure
$ make
$ sudo make install

$ sed --version | head -n1
sed (GNU sed) 4.9
```

Linux 배포판을 사용하지 않는 경우 아래 옵션을 사용하여 GNU sed에 액세스할 수 있습니다:

Windows용 Git - 명령줄에서 Git을 실행하는 데 사용되는 Bash 에뮬레이션을 제공합니다
Linux용 Windows 서브시스템 - Windows에서 기본적으로 Linux 바이너리 실행 파일을 실행하기 위한 호환성 계층
brew - macOS(또는 Linux)용 패키지 관리자

## Documentation
문서를 어디서 찾을 수 있는지 항상 알아두는 것이 좋습니다. 명령줄에서 간단한 설명서를 보려면 man sed를, 전체 설명서를 보려면 info sed를 사용하면 됩니다. 저는 사용과 탐색이 훨씬 쉬운 온라인 gnu sed 매뉴얼을 선호합니다.

```
$ man sed
SED(1) User Commands SED(1)

NAME
sed - stream editor for filtering and transforming text

SYNOPSIS
sed [-V] [--version] [--help] [-n] [--quiet] [--silent]
[-l N] [--line-length=N] [-u] [--unbuffered]
[-E] [-r] [--regexp-extended]
[-e script] [--expression=script]
[-f script-file] [--file=script-file]
[script-if-no-other-script]
[file...]

DESCRIPTION
Sed is a stream editor. A stream editor is used to perform basic
text transformations on an input stream (a file or input from a pipe‐
line). While in some ways similar to an editor which permits
scripted edits (such as ed), sed works by making only one pass over
the input(s), and is consequently more efficient. But it is sed's
ability to filter text in a pipeline which particularly distinguishes
it from other types of editors.
```

## Options overview
사용 가능한 모든 옵션에 대한 간략한 개요를 보려면 명령줄에서 sed --help를 사용하세요.

```
# only partial output shown here
$ sed --help
-n, --quiet, --silent
suppress automatic printing of pattern space
--debug
annotate program execution
-e script, --expression=script
add the script to the commands to be executed
-f script-file, --file=script-file
add the contents of script-file to the commands to be executed
--follow-symlinks
follow symlinks when processing in place
-i[SUFFIX], --in-place[=SUFFIX]
edit files in place (makes backup if SUFFIX supplied)
-l N, --line-length=N
specify the desired line-wrap length for the 'l' command
--posix
disable all GNU extensions.
-E, -r, --regexp-extended
use extended regular expressions in the script
(for portability use POSIX -E).
-s, --separate
consider files as separate rather than as a single,
continuous long stream.
--sandbox
operate in sandbox mode (disable e/r/w commands).
-u, --unbuffered
load minimal amounts of data from the input files and flush
the output buffers more often
-z, --null-data
separate lines by NUL characters
--help display this help and exit
--version output version information and exit

If no -e, --expression, -f, or --file option is given, then the first
non-option argument is taken as the sed script to interpret. All
remaining arguments are names of input files; if no input files are
specified, then the standard input is read.
```


## Editing standard input
sed에는 텍스트를 조작하는 다양한 명령이 있습니다. 대체 명령은 가장 일반적으로 사용되는 작업으로, 일치하는 텍스트를 다른 텍스트로 대체하는 데 도움이 됩니다. 구문은 s/REGEXP/REPLACEMENT/FLAGS입니다.

s는 대체 명령을 나타냅니다
/ 명령의 여러 부분을 구분하는 관용적 구분 기호입니다
REGEXP는 정규식을 나타냅니다
REPLACEMENT는 대체 문자열을 나타냅니다
FLAGS는 명령의 기본 동작을 변경하는 옵션입니다
현재로서는 s 명령이 검색 및 대체 작업에 사용된다는 것만 알아두면 충분합니다.

```
# input data that'll be passed to sed for editing
$ printf '1,2,3,4\na,b,c,d\n'
1,2,3,4
a,b,c,d

# for each input line, change only the first ',' to '-'
$ printf '1,2,3,4\na,b,c,d\n' | sed 's/,/-/'
1-2,3,4
a-b,c,d

# change all matches by adding the 'g' flag
$ printf '1,2,3,4\na,b,c,d\n' | sed 's/,/-/g'
1-2-3-4
a-b-c-d
```

위의 예에서는 스트림 편집을 보여주기 위해 printf 명령을 사용하여 입력 데이터를 생성합니다. 기본적으로 sed는 입력을 한 줄씩 처리합니다. 기본적으로 줄 바꿈 문자 \n이 줄 구분 기호로 사용됩니다. 첫 번째 sed 명령은 -의 첫 번째 항목만 대체합니다. 두 번째 명령은 g 플래그도 사용되므로 모든 항목을 대체합니다(g는 전역의 약자).

[!INFO]좋은 습관으로 스크립트 인수 주위는 항상 작은따옴표를 사용합니다. 셸 해석이 필요한 예제는 나중에 설명합니다.

[!경고]입력 파일에 줄 끝이 \r\n(캐리지 리턴 및 개행 문자)인 경우 처리하기 전에 입력 파일을 유닉스 스타일로 변환하세요. 스택 오버플로를 참조하세요: 도구 출력이 스스로 덮어쓰는 이유는 무엇이며 어떻게 해결하나요? 에서 자세한 설명과 해결 방법을 참조하세요.

```
# Unix style
$ printf '42\n' | file -
/dev/stdin: ASCII text

# DOS style
$ printf '42\r\n' | file -
/dev/stdin: ASCII text, with CRLF line terminators
```


## Editing file input
sed는 스트림 편집에서 그 이름이 유래되었지만, 파일 편집에 sed를 사용하는 것이 일반적입니다. 이를 위해 하나 이상의 입력 파일명을 인수로 전달할 수 있습니다. 를 사용하여 입력 소스 중 하나로 stdin을 나타낼 수 있습니다. 기본적으로 수정된 데이터는 stdout 스트림으로 이동하고 입력 파일은 수정되지 않습니다. 제자리 파일 편집 장에서 변경 사항을 소스 파일에 다시 적용하는 방법에 대해 설명합니다.

[예제_파일 디렉터리에는 예제에서 사용된 모든 파일이 있습니다.


```
$ cat greeting.txt
Hi there
Have a nice day

# for each line, change the first occurrence of 'day' with 'weekend'
$ sed 's/day/weekend/' greeting.txt
Hi there
Have a nice weekend

# change all occurrences of 'e' to 'E'
# redirect modified data to another file
$ sed 's/e/E/g' greeting.txt > out.txt
$ cat out.txt
Hi thErE
HavE a nicE day
```

이전 섹션의 예제에서는 모든 입력 줄이 검색 표현식과 일치했습니다. 여기서 첫 번째 sed 명령은 greeting.txt 파일의 첫 번째 줄과 일치하지 않는 day 를 검색했습니다. 기본적으로 한 줄이 검색 표현식을 충족하지 않더라도 출력의 일부가 됩니다. 수정된 줄만 가져오는 방법은 인쇄 명령 섹션에서 확인할 수 있습니다.


## Cheatsheet and summary
Note Description
man sed brief manual
sed --help brief description of all the command line options
info sed comprehensive manual
online gnu sed manual well formatted, easier to read and navigate
s/REGEXP/REPLACEMENT/FLAGS syntax for the substitute command
sed 's/,/-/' for each line, replace first , with -
sed 's/,/-/g' replace all , with -

참고 설명 man sed 간단한 설명서 sed --모든 명령줄 옵션에 대한 간략한 설명 정보 sed 종합 설명서 온라인 gnu sed 설명서 형식이 잘 갖춰져 있고 읽기 쉽고 탐색하기 쉬운 s/REGEXP/REPLACEMENT/FLAGS 구문 대체 명령의 경우 각 줄마다 sed 's/,/-/' 먼저 대체, 다음으로 - sed 's/,/-/g' 모두 대체, 다음으로 -로 대체합니다.

이 입문 장에서는 설치 과정, 문서, 명령줄에서 sed를 사용하여 텍스트를 검색하고 바꾸는 방법을 다루었습니다. 다음 장에서는 명령줄 텍스트 처리와 관련하여 sed를 중요한 도구로 만드는 더 많은 명령과 기능을 배우게 됩니다. 그러한 기능 중 하나는 다음 장에서 설명할 파일 제자리 편집입니다.


## Interactive exercises
이 책의 일부 연습 문제를 대화형으로 풀 수 있는 TUI 앱을 만들었습니다. 설치 단계는 SedExercises 리포지토리를 참조하고 이 앱의 사용 지침은 app_guide.md를 참조하세요. 다음은 샘플 스크린샷입니다:


## Exercises
모든 연습 문제도 Exercises.md에 한 곳에 모아져 있습니다. 솔루션은 Exercise_solutions.md를 참조하십시오.

연습 디렉터리에는 이 섹션에서 사용된 모든 파일이 있습니다.

1) 주어진 stdin 소스의 첫 번째 5만 5로 바꿉니다.

```
$ echo 'They ate 5 apples and 5 mangoes' | sed ##### add your solution here
They ate five apples and 5 mangoes
```

2) 5가 나오는 모든 숫자를 5로 바꿉니다.

```
$ echo 'They ate 5 apples and 5 mangoes' | sed ##### add your solution here
They ate five apples and five mangoes
```

3) 주어진 입력 파일에서 0xA0의 모든 항목을 0x50으로, 0xFF를 0x7F로 바꿉니다.

```
$ cat hex.txt
start address: 0xA0, func1 address: 0xA0
end address: 0xFF, func2 address: 0xB0

$ sed ##### add your solution here
start address: 0x50, func1 address: 0x50
end address: 0x7F, func2 address: 0xB0
```

4) 대체 명령은 문자 시퀀스를 검색하고 대체합니다. 하나 이상의 문자를 다른 대응 문자 세트와 매핑해야 하는 경우, y 명령을 사용할 수 있습니다. 매뉴얼에서 인용:
y/src/dst/ 패턴 공간에서 소스 문자와 일치하는 모든 문자를 대상 문자의 해당 문자와 음역합니다.

y 명령을 사용하여 주어진 입력 문자열을 변환하면 아래와 같이 출력 문자열을 얻을 수 있습니다.

```
$ echo 'goal new user sit eat dinner' | sed ##### add your solution here
gOAl nEw UsEr sIt EAt dInnEr
```

5) 다음 명령에서 오류가 발생하는 이유는 무엇인가요? 어떻게 수정하셨나요?

```
$ echo 'a sunny day' | sed s/sunny day/cloudy day/
sed: -e expression #1, char 7: unterminated `s' command

# expected output
$ echo 'a sunny day' | sed ##### add your solution here
a cloudy day
```


# In-place file editing
지금까지 제시한 예제에서는 sed의 출력이 터미널에 표시되거나 다른 파일로 리디렉션되었습니다. 이 장에서는 -i 명령줄 옵션을 사용하여 입력 파일에 변경 내용을 다시 쓰는 방법에 대해 설명합니다. 이 옵션은 원본 콘텐츠의 백업을 만들거나 만들지 않고 입력 파일을 변경하도록 구성할 수 있습니다. 백업이 필요한 경우 원본 파일 이름에 접두사나 접미사 또는 둘 다를 붙일 수 있습니다. 그리고 백업은 필요에 따라 같은 디렉터리 또는 다른 디렉터리에 저장할 수 있습니다.

example_files 디렉터리에는 예제에서 사용된 모든 파일이 있습니다.


## With backup
i 옵션의 인수로 확장자를 제공하면 입력 파일의 원본 내용은 주어진 확장자에 따라 보존됩니다. 예를 들어 입력 파일이 ip.txt이고 -i.orig를 사용하면 백업 파일의 이름은 ip.txt.orig로 지정됩니다.

```
$ cat colors.txt
deep blue
light orange
blue delight

# no output on terminal as -i option is used
# space is NOT allowed between -i and the extension
$ sed -i.bkp 's/blue/green/' colors.txt
# output from sed is written back to 'colors.txt'
$ cat colors.txt
deep green
light orange
green delight

# original file is preserved in 'colors.txt.bkp'
$ cat colors.txt.bkp
deep blue
light orange
blue delight
```


## Without backup
백업이 바람직하지 않은 경우도 있습니다. 이러한 경우에는 인수 없이 -i 옵션을 사용할 수 있습니다. 하지만 변경한 내용은 되돌릴 수 없으므로 주의하세요. 실제 파일에 -i 옵션을 적용하기 전에 샘플 입력으로 명령을 테스트하는 것이 좋습니다. 백업과 함께 이 옵션을 사용하여 다른 프로그램과 차이점을 비교한 다음 백업을 삭제할 수도 있습니다.

```
$ cat fruits.txt
banana
papaya
mango
$ sed -i 's/an/AN/g' fruits.txt
$ cat fruits.txt
bANANa
papaya
mANgo
```


## Multiple files
여러 입력 파일은 개별적으로 처리되며 변경 사항은 각 파일에 다시 기록됩니다.

```
$ cat f1.txt
have a nice day
bad morning
what a pleasant evening
$ cat f2.txt
worse than ever
too bad

$ sed -i.bkp 's/bad/good/' f1.txt f2.txt
$ ls f?.*
f1.txt f1.txt.bkp f2.txt f2.txt.bkp

$ cat f1.txt
have a nice day
good morning
what a pleasant evening
$ cat f2.txt
worse than ever
too good
```


## Prefix backup name
i 옵션 인수의 * 문자는 특수 문자입니다. 이 문자는 입력 파일 이름으로 대체됩니다. 이 옵션은 백업 파일명에 접미사 대신 접두사를 사용해야 하는 경우에 유용합니다. 또는 다른 조합이 필요할 수도 있습니다.

```
$ ls *colors*
colors.txt colors.txt.bkp

# single quotes is used here as * is a special shell character
$ sed -i'bkp.*' 's/green/yellow/' colors.txt

$ ls *colors*
bkp.colors.txt colors.txt colors.txt.bkp
```


## Place backups in a different directory
트릭을 사용하여 입력 파일의 상위 디렉터리가 아닌 다른 디렉터리에 백업을 배치할 수도 있습니다. 이 방법을 사용하려면 백업 디렉터리가 이미 존재해야 합니다.

```
$ mkdir backups
$ sed -i'backups/*' 's/good/nice/' f1.txt f2.txt
$ ls backups/
f1.txt f2.txt
```


## Cheatsheet and summary
참고 설명 -i 처리 후 원본 파일에 변경 사항을 다시 쓰면 변경 사항을 되돌릴 수 없으므로 이 옵션은 주의해서 사용하세요. -i.bkp 제자리 편집 외에도 입력 파일 이름에서 파생된 파일에 원본 내용을 보존하고 접미사 -i'bkp'를 붙여서 .bkp로 지정합니다. 여기서 *는 입력 파일 이름으로 대체되므로 접미사 대신 접두사를 추가하는 방법을 제공합니다. -i'backups/' 이렇게 하면 백업 복사본이 소스 디렉터리가 아닌 다른 기존 디렉터리에 배치됩니다.

이 장에서는 파일을 제자리에서 편집해야 할 때 유용한 -i 옵션에 대해 설명했습니다. 이 옵션은 자동화 스크립트에서 특히 유용합니다. 그러나 백업을 만들지 않고 이 옵션을 사용해야 하는 경우 실제 파일에 적용하기 전에 sed 명령을 테스트했는지 확인하세요. 다음 장에서는 sed의 필터링 기능과 이를 통해 모든 입력 줄이 아닌 특정 입력 줄에만 명령을 적용하는 방법을 배우게 됩니다.


## Exercises
연습 문제 디렉터리에는 이 섹션에서 사용된 모든 파일이 있습니다.

1) 입력 파일 text.txt 의 경우 in의 모든 항목을 an으로 바꾸고 변경 내용을 text.txt 자체에 다시 씁니다. 원본 콘텐츠는 text.txt.orig에 저장됩니다.

```
$ cat text.txt
can ran want plant
tin fin fit mine line
$ sed ##### add your solution here

$ cat text.txt
can ran want plant
tan fan fit mane lane
$ cat text.txt.orig
can ran want plant
tin fin fit mine line
```

2) 입력 파일 text.txt 의 경우, in의 모든 항목을 in으로 바꾸고 변경 사항을 text.txt 자체에 다시 씁니다. 이 연습을 위해 백업을 만들지 마세요. 이 연습을 시작하기 전에 이전 연습을 풀어야 합니다.

```
$ cat text.txt
can ran want plant
tan fan fit mane lane
$ sed ##### add your solution here

$ cat text.txt
cin rin wint plint
tin fin fit mine line
$ diff text.txt text.txt.orig
1c1
< cin rin wint plint
---
> can ran want plant
```

3) 입력 파일 copyright.txt의 경우 copyright: 2018을 copyright: 2019로 바꾸고 copyright.txt 자체에 변경 내용을 다시 기록합니다. 원본 콘텐츠는 2018_copyright.txt.bkp에 저장됩니다.

```
$ cat copyright.txt
bla bla 2015 bla
blah 2018 blah
bla bla bla
copyright: 2018
$ sed ##### add your solution here

$ cat copyright.txt
bla bla 2015 bla
blah 2018 blah
bla bla bla
copyright: 2019
$ cat 2018_copyright.txt.bkp
bla bla 2015 bla
blah 2018 blah
bla bla bla
copyright: 2018
```

4) 아래 표시된 코드 샘플에서는 echo 명령의 출력을 리디렉션하여 두 개의 파일을 만듭니다. 그런 다음 sed 명령을 사용하여 b1.txt를 제자리에서 편집하고 bkp.b1.txt라는 이름의 백업을 만듭니다. sed 명령이 예상대로 작동하나요? 그렇지 않다면 그 이유는 무엇인가요?

```
$ echo '2 apples' > b1.txt
$ echo '5 bananas' > -ibkp.txt
$ sed -ibkp.* 's/2/two/' b1.txt
```

5) 입력 파일 pets.txt의 경우 각 줄에서 처음 나오는 I like를 삭제하고 pets.txt 자체에 변경 내용을 다시 씁니다. 원본 콘텐츠는 bkp 디렉터리 내에 동일한 파일명으로 저장되어야 합니다. 현재 작업 디렉터리에 bkp가 있는지 없는지 모른다고 가정합니다.

```
$ cat pets.txt
I like cats
I like parrots
I like dogs

##### add your solution here

$ cat pets.txt
cats
parrots
dogs
$ cat bkp/pets.txt
I like cats
I like parrots
I like dogs
```


# Selective editing
기본적으로 sed는 전체 입력 콘텐츠에 대해 작동합니다. 많은 경우 입력의 특정 부분만 처리하고 싶을 때가 있습니다. 이를 위해 sed에는 grep, head, tail과 같은 도구와 유사하게 줄을 필터링하는 기능이 있습니다. sed는 큰 어려움 없이 대부분의 grep 필터링 기능을 복제할 수 있습니다. 또한 줄 번호 기반 필터링, 두 패턴 사이의 줄 선택, 상대 주소 지정 등과 같은 추가 기능도 있습니다. 함수형 프로그래밍에 익숙하다면 지도, 필터, 축소 패러다임을 접해 보셨을 것입니다. sed의 일반적인 작업은 입력의 하위 집합을 필터링한 다음 이를 수정(매핑)하는 것입니다. 때로는 이전 장의 예제에서 보았듯이 하위 집합이 전체 입력인 경우도 있습니다.

가능하면 특정 기능에 최적화된 도구를 사용하는 것이 좋습니다. 동등한 라인 필터링 솔루션의 경우 grep , head 및 tail이 sed에 비해 성능 면에서 더 우수합니다.

example_files 디렉터리에는 예제에서 사용된 모든 파일이 있습니다.


## REGEXP filtering
앞서 살펴본 것처럼 대체 명령의 구문은 s/REGEXP/REPLACEMENT/FLAGS 입니다. REGEXP/FLAGS 부분은 패턴과 일치하는 줄에 대해서만 명령이 실행되도록 하는 조건 표현식으로 사용할 수 있습니다.

```
# change commas to hyphens only if the input line contains '2'
# space between the filter and the command is optional
$ printf '1,2,3,4\na,b,c,d\n' | sed '/2/ s/,/-/g'
1-2-3-4
a,b,c,d
```

일치하는 줄 이외의 줄에 동작하려면 /REGEXP/FLAGS! 를 사용합니다.

```
# change commas to hyphens if the input line does NOT contain '2'
# space around ! is optional
$ printf '1,2,3,4\na,b,c,d\n' | sed '/2/! s/,/-/g'
1,2,3,4
a-b-c-d
```

/REGEXP/는 필터를 정의하는 방법 중 하나로, 매뉴얼에서는 주소라고 합니다. 다른 방법은 이 장의 뒷부분에서 다룹니다.

정규식은 나중에 설명합니다. 이 장에서는 /REGEXP/ 필터링을 사용하는 예제에서는 고정 문자열(정확한 문자열 비교)만 사용합니다.


## Delete command
필터링된 줄을 삭제하려면 d 명령을 사용합니다. 기본적으로 모든 입력 줄이 인쇄된다는 점을 기억하세요.

```
# same as: grep -v 'at'
$ printf 'sea\neat\ndrop\n' | sed '/at/d'
sea
drop
```

기본 grep 필터링을 사용하려면 !.d 조합을 사용합니다. 때로는 네거티브 논리를 사용하기가 혼란스러울 수 있습니다. 이는 프로그래밍 언어에서 if 조건과 unless 조건 중 하나를 선택하는 것과 비슷하게 개인 취향에 따라 달라집니다.

```
# same as: grep 'at'
$ printf 'sea\neat\ndrop\n' | sed '/at/!d'
eat
```

주소 사용은 선택 사항입니다. 예를 들어, sed '!d' 파일은 cat 파일 명령과 동일합니다.

```
# same as: cat greeting.txt
$ sed '!d' greeting.txt
Hi there
Have a nice day
```


## Print command
필터링된 줄을 인쇄하려면 p 명령을 사용합니다. 하지만 기본적으로 모든 입력 줄이 인쇄된다는 점을 기억하세요. 따라서 이 명령은 일반적으로 기본 인쇄를 해제하는 -n 옵션과 함께 사용됩니다.

```
$ cat rhymes.txt
it is a warm and cozy day
listen to what I say
go play in the park
come back before the sky turns dark

There are so many delights to cherish
Apple, Banana and Cherry
Bread, Butter and Jelly
Try them all before you perish

# same as: grep 'warm' rhymes.txt
$ sed -n '/warm/p' rhymes.txt
it is a warm and cozy day

# same as: grep 'n t' rhymes.txt
$ sed -n '/n t/p' rhymes.txt
listen to what I say
go play in the park
```

대체 명령은 p를 플래그로 제공합니다. 이 경우 대체가 성공한 경우에만 수정된 줄이 인쇄됩니다.

```
$ sed -n 's/warm/cool/gp' rhymes.txt
it is a cool and cozy day

# filter + substitution + p combination
$ sed -n '/the/ s/ark/ARK/gp' rhymes.txt
go play in the pARK
come back before the sky turns dARK
```

!p를 -n 옵션과 함께 사용하는 것은 d 명령을 사용하는 것과 동일합니다.

```
# same as: sed '/at/d'
$ printf 'sea\neat\ndrop\n' | sed -n '/at/!p'
sea
drop
```

다음은 -n 옵션 없이 p 명령을 사용하는 예제입니다.

```
# duplicate every line
$ seq 2 | sed 'p'
1
1
2
2
```


## Quit commands
q 명령은 sed를 즉시 종료합니다. 나머지 명령과 입력 줄은 처리되지 않습니다.

```
# quits after an input line containing 'say' is found
$ sed '/say/q' rhymes.txt
it is a warm and cozy day
listen to what I say
```

Q 명령은 q와 비슷하지만 일치하는 줄을 인쇄하지 않습니다.

```
# matching line won't be printed
$ sed '/say/Q' rhymes.txt
it is a warm and cozy day
```

전체 파일에서 검색 문자열의 마지막 항목부터 시작하는 모든 줄을 가져오려면 tac을 사용합니다.

```
$ tac rhymes.txt | sed '/an/q' | tac
Bread, Butter and Jelly
Try them all before you perish
```

종료 명령과 함께 종료 상태(0~255 )를 선택적으로 입력할 수 있습니다.

```
$ printf 'sea\neat\ndrop\n' | sed '/at/q2'
sea
eat
$ echo $?
$ printf 'sea\neat\ndrop\n' | sed '/at/Q3'
sea
$ echo $?
3
```

여러 파일과 함께 q 또는 Q 명령을 사용하려는 경우 처리해야 할 다른 파일이 남아 있어도 sed가 중지되므로 주의하세요. 해결 방법으로 혼합 주소 범위를 사용할 수 있습니다. 여러 파일에 q 적용하기를 참조하세요.


## Multiple commands
지금까지 표시된 명령은; 를 사용하여 구분하거나 -e 옵션을 여러 번 사용하여 두 번 이상 지정할 수 있습니다. sed 매뉴얼을 참조하세요: 여러 명령 구문에서 자세한 내용을 확인하세요.

```
# print all input lines as well as the modified lines
$ printf 'sea\neat\ndrop\n' | sed -n -e 'p' -e 's/at/AT/p'
sea
eat
eAT
drop

# equivalent command to the above example using ; instead of -e
# space around ; is optional
$ printf 'sea\neat\ndrop\n' | sed -n 'p; s/at/AT/p'
sea
eat
eAT
drop
```

리터럴 개행 문자를 사용하여 명령을 구분할 수도 있습니다. 많은 줄이 필요한 경우 대신 sed 스크립트를 사용하는 것이 좋습니다.

```
# here, each command is separated by a literal newline character
# similar to $ representing the primary prompt PS1,
# > represents the secondary prompt PS2
$ sed -n '
> /the/ s/ark/ARK/gp
> s/warm/cool/gp
> s/Bread/Cake/gp
> ' rhymes.txt
it is a cool and cozy day
go play in the pARK
come back before the sky turns dARK
Cake, Butter and Jelly
```

아래 그림과 같이 출력에 줄이 중복될 수 있으므로 여러 검색 문자열의 조건부 OR을 구성하는 데 여러 명령을 사용하지 마세요. 이러한 경우에는 정규식 기능 교체를 사용할 수 있습니다.

```
$ sed -ne '/play/p' -e '/ark/p' rhymes.txt
go play in the park
go play in the park
come back before the sky turns dark
```

공통 필터에 대해 여러 명령을 실행하려면 {}를 사용하여 명령을 그룹화합니다. 필요한 경우 명령을 중첩할 수도 있습니다.

```
# spaces around {} is optional
$ printf 'gates\nnot\nused\n' | sed '/e/{s/s/*/g; s/t/*/g}'
ga*e*
not
u*ed

$ sed -n '/the/{s/for/FOR/gp; /play/{p; s/park/PARK/gp}}' rhymes.txt
go play in the park
go play in the PARK
come back beFORe the sky turns dark
Try them all beFORe you perish
```

명령 그룹화는 여러 검색 문자열의 조건부 AND를 쉽게 구성할 수 있는 방법입니다.

```
# same as: grep 'ark' rhymes.txt | grep 'play'
$ sed -n '/ark/{/play/p}' rhymes.txt
go play in the park

# same as: grep 'the' rhymes.txt | grep 'for' | grep 'urn'
$ sed -n '/the/{/for/{/urn/p}}' rhymes.txt
come back before the sky turns dark

# same as: grep 'for' rhymes.txt | grep -v 'sky'
$ sed -n '/for/{/sky/!p}' rhymes.txt
Try them all before you perish
```

정규 표현식의 교대 기능과 sed의 제어 구조를 사용하는 다른 솔루션은 나중에 설명합니다.


## Line addressing
라인 번호도 필터링 기준으로 사용할 수 있습니다.

```
# here, 3 represents the address for the print command
# same as: head -n3 rhymes.txt | tail -n1
# same as: sed '3!d'
$ sed -n '3p' rhymes.txt
go play in the park

# print 2nd and 6th line
$ sed -n '2p; 6p' rhymes.txt
listen to what I say
There are so many delights to cherish

# apply substitution only for the 2nd line
$ printf 'gates\nnot\nused\n' | sed '2 s/t/*/g'
gates
no*
used
```

특수한 경우로 $는 입력의 마지막 줄을 나타냅니다.

```
# same as: tail -n1 rhymes.txt
$ sed -n '$p' rhymes.txt
Try them all before you perish
```

대용량 입력 파일의 경우 불필요한 입력 줄 처리를 피하려면 q 명령을 사용하세요.

```
$ seq 3542 4623452 | sed -n '2452{p; q}'
5993
$ seq 3542 4623452 | sed -n '250p; 2452{p; q}'
3791
5993

# here is a sample time comparison
$ time seq 3542 4623452 | sed -n '2452{p; q}' > f1
real 0m0.005s
$ time seq 3542 4623452 | sed -n '2452p' > f2
real 0m0.121s
$ rm f1 f2
Mimicking the head command using line number addressing and the q command.

# same as: seq 23 45 | head -n5
$ seq 23 45 | sed '5q'
```


## Print only the line number
= 명령은 일치하는 줄의 줄 번호를 표시합니다.

```
# gives both the line number and matching lines
$ grep -n 'the' rhymes.txt
3:go play in the park
4:come back before the sky turns dark
9:Try them all before you perish

# gives only the line number of matching lines
# note the use of the -n option to avoid default printing
$ sed -n '/the/=' rhymes.txt
3
4
9
```

필요한 경우 일치하는 줄을 인쇄할 수도 있습니다. 하지만 일치하는 줄과 줄 번호 사이에는 개행 문자가 표시됩니다.

```
$ sed -n '/what/{=; p}' rhymes.txt
2
listen to what I say

$ sed -n '/what/{p; =}' rhymes.txt
listen to what I say
2
```


## Address range
지금까지 필터링은 특정 줄 번호 또는 주어진 REGEXP 패턴과 일치하는 줄을 기준으로 이루어졌습니다. 주소 범위는 쉼표로 구분된 시작 주소와 끝 주소를 정의할 수 있는 기능을 제공합니다.

```
# note that all the matching ranges are printed
$ sed -n '/to/,/pl/p' rhymes.txt
listen to what I say
go play in the park
There are so many delights to cherish
Apple, Banana and Cherry

# same as: sed -n '3,8!p'
$ seq 15 24 | sed '3,8d'
15
16
23
24
```

라인 번호와 REGEXP 필터링을 혼합할 수 있습니다.

```
$ sed -n '6,/utter/p' rhymes.txt
There are so many delights to cherish
Apple, Banana and Cherry
Bread, Butter and Jelly

# same as: sed '/play/Q' rhymes.txt
# inefficient, but this will work for multiple file inputs
$ sed '/play/,$d' rhymes.txt
it is a warm and cozy day
listen to what I say
```

두 번째 필터링 조건이 일치하지 않으면 첫 번째 조건부터 입력의 마지막 줄까지 일치하는 줄이 일치합니다.

```
# there's a line containing 'Banana' but the matching pair isn't found
$ sed -n '/Banana/,/XYZ/p' rhymes.txt
Apple, Banana and Cherry
Bread, Butter and Jelly
Try them all before you perish
```

두 번째 주소는 항상 첫 번째 주소를 만족하는 줄 다음에 오는 줄에서만 필터링 조건으로 사용됩니다. 예를 들어 두 주소 모두에 동일한 검색 패턴이 사용되는 경우 출력에 최소 두 줄이 포함됩니다(첫 번째 일치하는 줄 뒤에 입력에 줄이 있다고 가정할 때).

```
$ sed -n '/w/,/w/p' rhymes.txt
it is a warm and cozy day
listen to what I say

# there's no line containing 'Cherry' after the 7th line
# so, rest of the file gets printed
$ sed -n '7,/Cherry/p' rhymes.txt
Apple, Banana and Cherry
Bread, Butter and Jelly
Try them all before you perish
```

특별한 경우로, 두 번째 주소가 REGEXP 필터인 경우 첫 번째 주소는 0이 될 수 있습니다. 이렇게 하면 검색 패턴이 파일의 첫 번째 줄과 일치할 수 있습니다.

```
# same as: sed '/cozy/q'
# inefficient, but this will work for multiple file inputs
$ sed -n '0,/cozy/p' rhymes.txt
it is a warm and cozy day

# same as: sed '/say/q'
$ sed -n '0,/say/p' rhymes.txt
it is a warm and cozy day
listen to what I say
```


## Relative addressing
grep 명령에는 일치하는 줄 뒤에 오는 줄을 볼 수 있는 -A 옵션이 있습니다. sed 명령은 두 번째 주소에 사용된 숫자에 + 문자를 접두사로 붙이면 비슷한 기능을 제공합니다. grep과 한 가지 다른 점은 컨텍스트 줄이 첫 번째 주소와 새로 일치하지 않는다는 것입니다.

```
# match a line containing 'the' and display the next line as well
# won't be same as: grep -A1 --no-group-separator 'the'
$ sed -n '/the/,+1p' rhymes.txt
go play in the park
come back before the sky turns dark
Try them all before you perish

# the first address can be a line number too
# helpful when it is programmatically constructed in a script
$ sed -n '6,+2p' rhymes.txt
There are so many delights to cherish
Apple, Banana and Cherry
Bread, Butter and Jelly
```

기호로 구분된 시작 값과 단계 값으로 산술 진행을 구성할 수 있습니다. ij는 i+0j , i+1j , i+2j , i+3j 등으로 번호가 매겨진 줄을 필터링합니다. 따라서 12는 모든 홀수 줄을 의미하고 5~3은 5번째, 8번째, 11번째 등을 의미합니다.

```
# print even numbered lines
$ seq 10 | sed -n '2~2p'
2
4
6
8
10

# delete lines numbered 2+0*4, 2+1*4, 2+2*4, etc (2, 6, 10, etc)
$ seq 7 | sed '2~4d'
1
3
4
5
7
```

i,~j를 사용하면 ( , )를 사용하면 의미가 완전히 바뀝니다. 시작 주소 뒤에서 j의 배수인 가장 가까운 줄 번호가 끝 주소를 표시합니다. 시작 주소는 REGEXP 기반 필터링도 가능합니다.

```
# here, closest multiple of 4 is the 4th line
$ seq 10 | sed -n '2,~4p'
2
3
4
# here, closest multiple of 4 is the 8th line
$ seq 10 | sed -n '5,~4p'
5
6
7
8

# line matching 'many' is the 6th line, closest multiple of 3 is the 9th line
$ sed -n '/many/,~3p' rhymes.txt
There are so many delights to cherish
Apple, Banana and Cherry
Bread, Butter and Jelly
Try them all before you perish
```


## n and N commands
지금까지 사용된 명령은 모두 한 번에 한 줄만 처리했습니다. 주소 범위 옵션은 줄 그룹에 대해 작업할 수 있는 기능을 제공하지만 명령은 여전히 해당 그룹에 대해 한 번에 한 줄씩만 작동합니다. 명령이 여러 줄이 포함된 문자열을 처리하도록 하려는 경우가 있습니다. 서문에서 언급했듯이 이 책에서는 여러 줄 처리와 관련된 고급 명령어를 다루지 않으므로 이러한 시나리오에서는 awk 또는 perl을 사용하는 것이 좋습니다. 그러나 이 섹션에서는 비교적 사용하기 쉬운 두 가지 명령인 n과 N을 소개하며 다음 장에서도 살펴볼 것입니다. 이 섹션은 sed의 작동 방식에 대해 자세히 알아볼 수 있는 좋은 장소이기도 합니다. sed 매뉴얼에서 인용: sed의 작동 방식:

sed는 활성 패턴 공간과 보조 홀드 공간이라는 두 개의 데이터 버퍼를 유지합니다. sed는 각 입력 줄에 대해 다음과 같은 주기를 수행하여 작동합니다. 먼저 sed는 입력 스트림에서 한 줄을 읽고 뒤에 오는 줄 바꿈을 제거한 후 패턴 공간에 배치합니다. 그런 다음 명령이 실행되며, 각 명령에는 연결된 주소가 있을 수 있습니다. 주소는 일종의 조건 코드이며, 명령이 실행되기 전에 조건이 확인된 경우에만 명령이 실행됩니다. 스크립트의 끝에 도달하면 -n 옵션을 사용하지 않는 한 패턴 스페이스의 내용이 출력 스트림에 인쇄되고, 제거된 경우 후행 줄 바꿈이 다시 추가됩니다. 그런 다음 다음 입력 줄에 대한 다음 사이클이 시작됩니다.

지금까지 살펴본 모든 예제에서 패턴 공간 버퍼에는 한 줄의 입력만 포함되었습니다. n과 N 명령을 사용하면 패턴 공간의 내용을 변경하고 명령을 사용하여 이 데이터 버퍼의 전체 내용에 대해 작업할 수 있습니다. 예를 들어 한 번에 두 개 이상의 줄에 대해 치환을 수행할 수 있습니다. 먼저 n 명령입니다. sed 매뉴얼에서 인용: 자주 사용하는 명령:

자동 인쇄가 비활성화되지 않은 경우 패턴 공간을 인쇄한 다음 패턴 공간을 다음 입력 줄로 바꿉니다. 더 이상 입력이 없으면 더 이상 명령을 처리하지 않고 sed가 종료됩니다.

```
# same as: sed -n '2~2p'
# n will replace pattern space with the next line of input
# as -n option is used, the replaced line won't be printed
# the p command then prints the new line
$ seq 10 | sed -n 'n; p'
2
4
6
8
10

# if a line contains 't', replace pattern space with the next line
# substitute all 't' with 'TTT' for the new line thus fetched
# note that 't' wasn't substituted in the line that got replaced
# replaced pattern space gets printed as -n option is NOT used here
$ printf 'gates\nnot\nused\n' | sed '/t/{n; s/t/TTT/g}'
gates
noTTT
used
```

다음으로 N 명령입니다. sed 매뉴얼에서 인용합니다: 자주 사용하지 않는 명령:

패턴 공간에 새 줄을 추가한 다음 패턴 공간에 다음 입력 줄을 추가합니다. 더 이상 입력이 없으면 sed는 더 이상 명령을 처리하지 않고 종료합니다. z를 사용하면 새 줄 대신 0바이트(아스키 'NUL' 문자)가 줄 사이에 추가됩니다(새 줄 대신).

```
# append the next line to the pattern space
# and then replace newline character with colon character
$ seq 7 | sed 'N; s/\n/:/'
1:2
3:4
5:6

# if line contains 'at', the next line gets appended to the pattern space
# then the substitution is performed on the two lines in the buffer
$ printf 'gates\nnot\nused\n' | sed '/at/{N; s/s\nnot/d/}'
gated
used
```

sed 매뉴얼도 참조하세요: N 명령을 마지막 줄에 사용합니다. n과 같은 이스케이프 시퀀스에 대해서는 나중에 자세히 설명합니다.

데이터 버퍼에 대해 자세히 살펴보고 다양한 멀티라인 명령어에 대해 알아보려면 grymoire: sed 튜토리얼을 참조하세요.


## Cheatsheet and summary
Note Description
ADDR cmd Execute cmd only if the input line satisfies the ADDR condition
ADDR can be REGEXP or line number or a combination of them
/at/d delete all lines satisfying the given REGEXP
/at/!d don’t delete lines matching the given REGEXP
/twice/p print all lines based on the given REGEXP
as print is the default action, usually p is paired with -n option
/not/ s/in/out/gp substitute only if line matches the given REGEXP
and print only if the substitution succeeds
/if/q quit immediately after printing the current pattern space
further input files, if any, won’t be processed
/if/Q quit immediately without printing the current pattern space
Note Description
/at/q2 both q and Q can additionally use 0-255 as exit code
-e 'cmd1' -e 'cmd2' execute multiple commands one after the other
cmd1; cmd2 execute multiple commands one after the other
note that not all commands can be constructed this way
commands can also be separated by a literal newline character
ADDR {cmds} group one or more commands to be executed for given ADDR
groups can be nested as well
ex: /in/{/not/{/you/p}} conditional AND of 3 REGEXPs
2p line addressing, print only the 2nd line
$ special address to indicate the last line of input
2452{p; q} quit early to avoid processing unnecessary lines
/not/= print line number instead of the matching line
ADDR1,ADDR2 start and end addresses to operate upon
if ADDR2 doesn’t match, lines till end of the file gets processed
/are/,/by/p print all groups of line matching the REGEXPs
3,8d delete lines numbered 3 to 8
5,/use/p line number and REGEXP can be mixed
0,/not/p inefficient equivalent of /not/q but works for multiple files
ADDR,+N all lines matching the ADDR and N lines after
i~j arithmetic progression with i as start and j as step
ADDR,~j closest multiple of j w.r.t. the line matching the ADDR
pattern space active data buffer, commands work on this content
n if -n option isn’t used, pattern space gets printed
and then pattern space is replaced with the next line of input
exit without executing other commands if there’s no more input
N add newline (or NUL for -z ) to the pattern space
and then append the next line of input
exit without executing other commands if there’s no more input

이 장에서는 sed의 필터링 기능과 sed 명령과 결합하여 전체 입력 내용 대신 관심 있는 줄만 처리하는 방법에 대해 소개했습니다. 필터링은 REGEXP , 줄 번호 또는 이들의 조합을 사용하여 지정할 수 있습니다. 여러 개의 sed 명령을 구성하는 다양한 방법도 배웠습니다. 다음 장에서는 sed 명령이 지원하는 정규 표현식의 구문과 기능에 대해 알아봅니다.


## Exercises
연습 문제 디렉터리에는 이 섹션에서 사용된 모든 파일이 있습니다.

1) 주어진 입력에 대해 세 번째 줄을 제외하고 표시합니다.

```
$ seq 34 37 | sed ##### add your solution here
34
35
37
```

2) 주어진 입력에 대해 네 번째, 다섯 번째, 여섯 번째, 일곱 번째 줄만 표시합니다.

```
$ seq 65 78 | sed ##### add your solution here
68
69
70
71
```

3) 입력 파일 addr.txt의 경우, 4번째 줄부터 파일 끝부분까지 are not과 is의 모든 항목을 are로 바꾸세요. 또한 출력에는 변경된 줄만 표시되어야 합니다.

```
$ cat addr.txt
Hello World
How are you
This game is good
Today is sunny
12345
You are funny

$ sed ##### add your solution here
Today is not sunny
You are not funny
```

4) sed를 사용하여 주어진 입력에 대해 아래와 같은 출력을 얻습니다. 먼저 입력에서 출력으로 변환하는 로직을 이해한 다음 이 장에서 소개한 명령을 사용하여 솔루션을 구성해야 합니다.

```
$ seq 15 | sed ##### add your solution here
2
4
7
9
12
14
```

5) 입력 파일 addr.txt 의 경우 파일 시작 부분부터 is가 처음 나타날 때까지 모든 줄을 표시합니다.

```
$ sed ##### add your solution here
Hello World
How are you
This game is good
```

6) 입력 파일 addr.txt 의 경우 is가 포함된 모든 줄을 표시하지만 좋지 않습니다.

```
$ sed ##### add your solution here
Today is sunny
```

7) n 및 N 명령은 더 이상 가져올 입력 줄이 없는 경우 더 이상 명령을 실행하지 않습니다. 아래 표시된 명령을 수정하면 예상 출력을 얻을 수 있습니다.

```
# wrong output
$ seq 11 | sed 'N; N; s/\n/-/g'
1-2-3
4-5-6
7-8-9
10
11

# expected output
$ seq 11 | sed ##### add your solution here
1-2-3
4-5-6
7-8-9
10-11
```

8) 입력 파일 addr.txt 의 경우 아래와 같은 형식으로 줄 번호를 추가합니다.

```
$ sed ##### add your solution here
1
Hello World
2
How are you
3
This game is good
4
Today is sunny
4
12345
6
You are funny
```

9) 입력 파일 addr.txt 의 경우 is가 포함된 모든 줄과 그 뒤에 오는 줄(있는 경우)을 인쇄합니다.

```
$ sed ##### add your solution here
How are you
This game is good
You are funny
```

보너스: 위의 입력 파일에 대해 sed -n '/is/,+1 p' addr.txt가 grep -A1 'is' addr.txt와 동일한 결과를 생성하나요? 그렇지 않다면 그 이유는 무엇인가요?

10) 줄 번호가 1, 15, 29, 43 등의 순서를 따르는 경우 모든 줄을 인쇄하지만 줄에 4가 포함되어 있는 경우에는 인쇄하지 않습니다.

```
$ seq 32 100 | sed ##### add your solution here
32
60
88
```

11) 입력 파일 sample.txt 의 경우 파일 시작 부분부터 일치하는 줄을 제외하고 are 가 처음 나타날 때까지 표시합니다.

```
$ cat sample.txt
Hello World
Hi there
How are you

Just do-it
Believe it

banana
papaya
mango

Much ado about nothing
He he he
Adios amigo

$ sed ##### add your solution here
Hello World

Hi there
```

12) 입력 파일 sample.txt의 경우 do가 마지막으로 나오는 부분부터 파일 끝부분까지 표시합니다.

```
##### add your solution here
Much ado about nothing
He he he
Adios amigo
```

13) 입력 파일 sample.txt 의 경우 9번째 줄부터 go 가 포함된 줄까지 표시합니다.

```
$ sed ##### add your solution here
banana
papaya
mango
```

14) 입력 파일 sample.txt 의 경우 해당 파일이 포함된 줄부터 3으로 나눌 수 있는 다음 줄 번호까지 표시합니다.

```
$ sed ##### add your solution here
Just do-it
Believe it
banana
```

15) addr.txt 에서 홀수 줄만 표시합니다.

```
$ sed ##### add your solution here
Hello World
This game is good
12345
```



# BRE/ERE Regular Expressions
이 장에서는 GNU sed 에서 구현된 기본 및 확장 정규 표현식을 다룹니다. 달리 명시되지 않는 한, 예제와 설명은 ASCII 입력을 가정합니다. 기본적으로 sed는 검색 패턴을 기본 정규식(BRE)으로 처리합니다. E 옵션을 사용하면 확장 정규식(ERE)을 사용할 수 있습니다. 이전 sed 버전에서는 ERE에 -r을 사용했지만 여전히 사용할 수 있지만 -E가 더 이식성이 뛰어납니다. GNU sed에서 BRE와 ERE는 메타문자가 표현되는 방식만 다를 뿐 기능상의 차이는 없습니다.

BRE 및 ERE에 대한 POSIX 사양도 참조하세요.

example_files 디렉터리에는 예제에서 사용된 모든 파일이 있습니다.


## Line Anchors
줄의 아무 곳이나 일치시키는 대신 제한을 지정할 수 있습니다. 이러한 제한은 특정 문자와 이스케이프 시퀀스에 특별한 의미를 할당함으로써 가능합니다. 특별한 의미를 가진 문자를 정규식 용어로 메타문자라고 합니다. 이러한 문자를 문자 그대로 일치시켜야 하는 경우에는 \ 문자로 이스케이프해야 합니다(메타문자 일치시키기 섹션에서 설명 참조). 두 개의 줄 앵커가 있습니다: 메타문자는 줄의 시작 부분으로 일치를 제한합니다 - $ 메타문자는 줄의 끝 부분으로 일치를 제한합니다.

```
$ cat anchors.txt
sub par
spar
apparent effort
two spare computers
cart part tart mart

# lines starting with 's'
$ sed -n '/^s/p' anchors.txt
sub par
spar

# lines ending with 'rt'
$ sed -n '/rt$/p' anchors.txt
apparent effort
cart part tart mart

# change only whole line 'par'
$ printf 'spared no one\npar\nspar\n' | sed 's/^par$/PAR/'
spared no one
PAR
spar
```

앵커는 그 자체로도 패턴으로 사용할 수 있습니다. 입력 줄의 시작/끝에 텍스트를 삽입하여 문자열 연결 연산을 에뮬레이션하는 데 도움이 됩니다. 별 쓸모없는 기능처럼 느껴질 수도 있지만 다른 기능과 함께 사용하면 매우 편리한 도구가 됩니다.

```
# add '* ' at the start of every input line
$ printf 'spared no one\npar\nspar\n' | sed 's/^/* /'
* spared no one
* par
* spar

# append '.' only if a line doesn't contain space characters
$ printf 'spared no one\npar\nspar\n' | sed '/ /! s/$/./'
spared no one
par.
spar.
```


## Word Anchors
두 번째 유형의 제한은 단어 앵커입니다. 단어 문자는 알파벳(대소문자 구분 없음), 숫자 및 밑줄 문자를 말합니다. 왜 숫자도 있고 밑줄도 있는데 왜 알파벳만 없는지 궁금할 수 있습니다. 이는 변수 및 함수 명명 규칙에서 비롯된 것으로, 일반적으로 알파벳, 숫자 및 밑줄이 허용됩니다. 따라서 이 정의는 자연어보다는 프로그래밍 지향적입니다.

이스케이프 시퀀스 \b는 단어 경계를 나타냅니다. 이는 단어의 시작과 단어의 끝 앵커링 모두에 적용됩니다. 단어의 시작은 단어 앞의 문자가 단어가 아닌 문자이거나 문자가 없음을 의미합니다(줄의 시작). 마찬가지로 단어 끝은 단어 뒤의 문자가 단어가 아닌 문자이거나 문자가 없는 경우(줄 끝)를 의미합니다. 이는 단어 문자가 없으면 단어 경계를 가질 수 없음을 의미합니다. 다음은 몇 가지 예입니다:

```
$ cat anchors.txt
sub par
spar
apparent effort
two spare computers
cart part tart mart

# words starting with 'par'
$ sed -n '/\bpar/p' anchors.txt
sub par
cart part tart mart

# words ending with 'par'
$ sed -n '/par\b/p' anchors.txt
sub par
spar

# replace only whole word 'par'
$ sed -n 's/\bpar\b/***/p' anchors.txt
sub ***
```

또는 <를 사용하여 단어 앵커의 시작을 나타내고 >를 사용하여 단어 앵커의 끝을 나타낼 수 있습니다. b를 사용하는 것이 다른 정규식 구현에서 더 일반적으로 사용되며 반대쪽에는 \B가 있으므로 선호됩니다.

\bREGEXP\b는 <REGEXP>와 약간 다르게 작동합니다. 자세한 내용은 단어 경계 차이 섹션을 참조하세요.


## Opposite Word Anchor
경계라는 단어에는 반대 앵커도 있습니다. \B는 \b가 일치하지 않는 곳이면 어디든 일치합니다. 이 이중성은 나중에 다른 이스케이프 시퀀스에서도 볼 수 있습니다.

```
# match 'par' if it is surrounded by word characters
$ sed -n '/\Bpar\B/p' anchors.txt
apparent effort
two spare computers

# match 'par' but not at the start of a word
$ sed -n '/\Bpar/p' anchors.txt
spar
apparent effort
two spare computers

# match 'par' but not at the end of a word
$ sed -n '/par\B/p' anchors.txt
apparent effort
two spare computers
cart part tart mart

$ echo 'copper' | sed 's/\b/:/g'
:copper:
$ echo 'copper' | sed 's/\B/:/g'
c:o:p:p:e:r
```

네거티브 논리는 많은 텍스트 처리 상황에서 유용합니다. 하지만 주의해서 사용하면 의도하지 않은 내용이 일치할 수 있습니다.


## Alternation
여러 개의 용어를 검색하고 싶을 때가 많습니다. 조건식에서는 논리 연산자를 사용하여 여러 조건을 결합할 수 있습니다. 정규 표현식에서 | 메타문자는 논리 OR과 유사합니다. 정규식은 |로 구분된 패턴 중 하나라도 충족되면 일치합니다.

| 메타문자 구문은 BRE와 ERE에 따라 다릅니다. 매뉴얼에서 인용한 것입니다:

GNU sed에서 기본 정규식과 확장 정규식의 유일한 차이점은 ? , + , 괄호, 중괄호( {} ) 및 | 와 같은 몇 가지 특수 문자의 동작에 있습니다. 다음은 몇 가지 예입니다:

```
# BRE vs ERE
$ sed -n '/two\|sub/p' anchors.txt
sub par
two spare computers
$ sed -nE '/two|sub/p' anchors.txt
sub par
two spare computers

# match 'cat' or 'dog' or 'fox'
# note the use of 'g' flag for multiple replacements
$ echo 'cats dog bee parrot foxed' | sed -E 's/cat|dog|fox/--/g'
--s -- bee parrot --ed
```

다음은 자체 앵커가 있는 대체 패턴의 예입니다:

```
# lines with whole word 'par' or lines ending with 's'
$ sed -nE '/\bpar\b|s$/p' anchors.txt
sub par
two spare computers
```


## Alternation precedence
교대를 사용할 때 몇 가지 까다로운 코너 케이스가 있습니다. 줄을 필터링하는 데 사용하는 경우에는 모호함이 없습니다. 그러나 대체와 같은 사용 사례의 경우 몇 가지 요소에 따라 달라집니다. are 또는 spared를 대체하고자 할 때 어느 것이 우선시되어야 할까요? 더 큰 단어인 spared 또는 하위 문자열이 그 안에 있을까요, 아니면 다른 것을 기반으로 할까요?

입력에서 가장 먼저 일치하는 대안이 우선권을 갖습니다.

```
# here, the output will be same irrespective of alternation order
# note that 'g' flag isn't used here, so only the first match gets replaced
$ echo 'cats dog bee parrot foxed' | sed -E 's/bee|parrot|at/--/'
c--s dog bee parrot foxed
$ echo 'cats dog bee parrot foxed' | sed -E 's/parrot|at|bee/--/'
c--s dog bee parrot foxed
```

예를 들어 스파링과 스페어처럼 같은 위치에서 시작하는 매칭의 경우, 가장 긴 매칭 부분이 우선권을 갖습니다. 다른 정규식 구현과 달리 왼쪽에서 오른쪽으로 교대하는 우선순위는 경기의 길이가 같은 경우에만 적용됩니다. 자세한 예는 가장 긴 일치 항목 및 역참조 섹션을 참조하세요. 이 주제에 대한 자세한 내용은 정규 표현식: 교대하기를 참조하세요.

```
$ echo 'spared party parent' | sed -E 's/spa|spared/**/g'
** party parent
$ echo 'spared party parent' | sed -E 's/spared|spa/**/g'
** party parent
# other regexp flavors like Perl have left-to-right priority
$ echo 'spared party parent' | perl -pe 's/spa|spared/**/'
**red party parent
```


## Grouping
정규식 대체 표현식에는 종종 몇 가지 공통점이 있습니다. 일반적인 문자나 앵커와 같은 한정어일 수 있습니다. 이러한 경우 한 쌍의 괄호 메타문자를 사용하여 그룹화할 수 있습니다. 수학에서 a(b+c)d = abd+acd와 유사하게 정규식에서는 a(b|c)d = abd|acd가 됩니다.

```
# without grouping
$ printf 'red\nreform\nread\ncrest\n' | sed -nE '/reform|rest/p'
reform
crest
# with grouping
$ printf 'red\nreform\nread\ncrest\n' | sed -nE '/re(form|st)/p'
reform
crest

# without grouping
$ sed -nE '/\bpar\b|\bpart\b/p' anchors.txt
sub par
cart part tart mart
# taking out common anchors
$ sed -nE '/\b(par|part)\b/p' anchors.txt
sub par
cart part tart mart
# taking out common characters as well
# you'll later learn a better technique instead of using empty alternate
$ sed -nE '/\bpar(|t)\b/p' anchors.txt
sub par
cart part tart mart
```


## Matching the metacharacters
정규식을 구성하는 데 도움이 되는 몇 가지 메타문자와 이스케이프 시퀀스를 이미 보았습니다. 메타문자를 문자 그대로 일치시키려면(즉, 특수 의미를 제거하려면) 해당 문자 앞에 \ 문자를 붙입니다. 문자 그대로 \ 문자를 표시하려면 \ 를 사용합니다. 줄 앵커와 같은 일부 메타문자는 BRE 구문에서 통상적인 위치에 사용하지 않으면 특별한 의미를 잃게 됩니다. 이스케이프 처리할 메타문자가 많으면 ERE와 BRE를 전환하여 명령을 단순화할 수 있는지 알아보세요.

```
# line anchors aren't special away from customary positions with BRE
$ printf 'a^2 + b^2 - C*3\nd = c^2' | sed -n '/b^2/p'
a^2 + b^2 - C*3
# but you'll have to escape them with ERE: sed -nE '/\$b/p'
$ printf '$a = $b + $c\n$x = 4' | sed -n '/$b/p'
$a = $b + $c

# here $ requires escaping even with BRE
$ echo '$a = $b + $c' | sed 's/\$//g'
a = b + c

# BRE vs ERE
$ printf '(a/b) + c\n3 + (a/b) - c\n' | sed -n '/^(a\/b)/p'
(a/b) + c
$ printf '(a/b) + c\n3 + (a/b) - c\n' | sed -nE '/^\(a\/b\)/p'
(a/b) + c
```

대체 섹션 메타문자 처리는 백레퍼런스 섹션에서 설명합니다.


## Using different delimiters
문자는 관용적으로 REGEXP 구분 기호로 사용됩니다. 그러나 \ 및 개행 문자를 제외한 모든 문자를 대신 사용할 수 있습니다. 이렇게 하면 이스케이프 구분 문자의 필요성을 피하거나 줄일 수 있습니다. 대체 및 음역 명령의 구문은 간단하며 / 대신 다른 문자를 사용하기만 하면 됩니다.

```
# instead of this
$ echo '/home/learnbyexample/reports' | sed 's/\/home\/learnbyexample\//~\//'
~/reports
# use a different delimiter
$ echo '/home/learnbyexample/reports' | sed 's#/home/learnbyexample/#~/#'
~/reports

$ echo 'a/b/c/d' | sed 'y/a\/d/1-4/'
1-b-c-4
$ echo 'a/b/c/d' | sed 'y,a/d,1-4,'
1-b-c-4
```

주소 일치의 경우 구문이 약간 다릅니다. 첫 번째 구분 기호는 이스케이프 처리해야 합니다. 주소 범위의 경우, 시작과 끝 REGEXP는 독립적이므로 서로 다른 구분 기호를 사용할 수 있습니다.

```
$ printf '/home/joe/1\n/home/john/1\n'
/home/joe/1
/home/john/1

# here ; is used as the delimiter
$ printf '/home/joe/1\n/home/john/1\n' | sed -n '\;/home/joe/;p'
/home/joe/1
```

구분 기호로 /가 일반적으로 사용되는 이유에 대한 약간의 역사도 참조하세요.


## The dot meta character
점 메타문자는 모든 문자(개행 문자 포함)를 일치시키는 자리 표시자 역할을 합니다. 나중에 제한된 문자 집합에 대해 사용자 정의 플레이스홀더를 정의하는 방법을 배우게 됩니다.

```
# 3 character sequence starting with 'c' and ending with 't'
$ echo 'tac tin cot abc:tyz excited' | sed 's/c.t/-/g'
ta-in - ab-yz ex-ed

# any character followed by 3 and again any character
$ printf '42\t3500\n' | sed 's/.3.//'
4200

# N command is handy here to show that . matches \n as well
$ printf 'abc\nxyz\n' | sed 'N; s/c.x/ /'
ab yz
```


## Quantifiers
교대는 여러 패턴 중 하나를 일치시키는 데 도움이 됩니다. 점 메타문자를 수량화자와 결합하면(필요한 경우 교대로 결합하면) 패턴 사이에 논리 AND를 수행할 수 있는 길이 열립니다. 예를 들어, 문자열이 두 개의 패턴과 일치하는지, 그 사이에 몇 개의 문자가 있는지 확인할 수 있습니다. 한정자는 문자, 그룹화 및 나중에 설명할 몇 가지 더 많은 구조에 적용할 수 있습니다. 정확한 수량과 한정된 범위를 지정하는 기능 외에도, 한정되지 않은 다양한 수량을 일치시킬 수도 있습니다.

먼저, 문자 또는 그룹을 0 또는 1로 일치하도록 정량화하는 메타문자인 ? 이는 선택적 패턴을 정의하고 더 짧은 패턴을 만드는 데 도움이 됩니다.

```
# same as: sed -E 's/\b(fe.d|fed)\b/X/g'
# BRE version: sed 's/fe.\?d\b/X/g'
$ echo 'fed fold fe:d feeder' | sed -E 's/\bfe.?d\b/X/g'
X fold X feeder

# same as: sed -nE '/\bpar(|t)\b/p'
$ sed -nE '/\bpart?\b/p' anchors.txt
sub par
cart part tart mart

# same as: sed -E 's/part|parrot/X/g'
$ echo 'par part parrot parent' | sed -E 's/par(ro)?t/X/g'
par X X parent
# same as: sed -E 's/part|parrot|parent/X/g'
$ echo 'par part parrot parent' | sed -E 's/par(en|ro)?t/X/g'
par X X X

# matches '<' or '\<' and they are both replaced with '\<'
$ echo 'apple \< fig ice < apple cream <' | sed -E 's/\\?</\\</g'
apple \< fig ice \< apple cream \<
```

* 메타문자는 문자 또는 그룹을 0회 이상 일치하도록 정량화합니다.

```
# 'f' followed by zero or more of 'e' followed by 'd'
$ echo 'fd fed fod fe:d feeeeder' | sed 's/fe*d/X/g'
X X fod fe:d Xer

# zero or more of '1' followed by '2'
$ echo '3111111111125111142' | sed 's/1*2/-/g'
3-511114-
```

+ 메타문자는 문자 또는 그룹이 1 이상 일치하도록 정량화합니다.

```
# 'f' followed by one or more of 'e' followed by 'd'
# BRE version: sed 's/fe\+d/X/g'
$ echo 'fd fed fod fe:d feeeeder' | sed -E 's/fe+d/X/g'
fd X fod fe:d Xer

# one or more of '1' followed by optional '4' and then '2'
$ echo '3111111111125111142' | sed -E 's/1+4?2/-/g'
3-5-
```

메타문자 {}를 사용하여 바운드 및 비바운드 정수 범위를 지정할 수 있습니다. 이 수량자를 사용하는 방법은 아래와 같이 네 가지가 있습니다:

한정자 설명 {m,n} m~n회 일치 {m,} 최소 m회 일치 {,n} 최대 n회 일치(0회 포함) {n} 정확히 n회 일치합니다.


```
# note that stray characters like space are not allowed anywhere within {}
# BRE version: sed 's/ab\{1,4\}c/X/g'
$ echo 'ac abc abbc abbbc abbbbbbbbc' | sed -E 's/ab{1,4}c/X/g'
ac X X X abbbbbbbbc

$ echo 'ac abc abbc abbbc abbbbbbbbc' | sed -E 's/ab{3,}c/X/g'
ac abc abbc X X

$ echo 'ac abc abbc abbbc abbbbbbbbc' | sed -E 's/ab{,2}c/X/g'
X X X abbbc abbbbbbbbc

$ echo 'ac abc abbc abbbc abbbbbbbbc' | sed -E 's/ab{3}c/X/g'
ac abc abbc X abbbbbbbbc
```

ERE에서는 {를 이스케이프하여 문자 그대로 표현합니다. 와 달리 } 문자를 이스케이프 처리할 필요가 없습니다.

```
$ echo 'a{5} = 10' | sed -E 's/a\{5}/x/'
x = 10

$ echo 'report_{a,b}.txt' | sed -E 's/_{a,b}/_c/'
sed: -e expression #1, char 12: Invalid content of \{\}
$ echo 'report_{a,b}.txt' | sed -E 's/_\{a,b}/_c/'
report_c.txt
```


## Conditional AND
다음은 점 메타문자와 수량자를 사용하여 AND 조건문을 구성하는 것입니다.

```
# match 'Error' followed by zero or more characters followed by 'valid'
$ echo 'Error: not a valid input' | sed -n '/Error.*valid/p'
Error: not a valid input
```

어떤 순서로든 매칭을 허용하려면 번갈아 가며 가져와야 합니다.

```
# 'cat' followed by 'dog' or 'dog' followed by 'cat'
$ echo 'two cats and a dog' | sed -E 's/cat.*dog|dog.*cat/pets/'
two pets
$ echo 'two dogs and a cat' | sed -E 's/cat.*dog|dog.*cat/pets/'
two pets
```


## Longest match wins
이미 같은 위치에서 시작하여 가장 긴 일치하는 부분이 선택되는 예시를 보셨을 것입니다. 예를 들어 스페어|스페어드는 스페어보다 스페어드가 선택됩니다. 동일한 시작 위치에서 두 개 이상의 일치 가능성이 있는 경우에도 동일하게 적용됩니다. 예를 들어, 일치시킬 입력 문자열이 foot인 경우 f.?o는 fo 대신 foo와 일치합니다.

```
# longest match among 'foo' and 'fo' wins here
$ echo 'foot' | sed -E 's/f.?o/X/'
Xt
# everything will match here
$ echo 'car bat cod map scat dot abacus' | sed 's/.*/X/'
X

# longest match happens when (1|2|3)+ matches up to '1233' only
# so that '12apple' can match as well
$ echo 'fig123312apple' | sed -E 's/g(1|2|3)+(12apple)?/X/'
fiX
# in other implementations like Perl, that is not the case
# precedence is left-to-right for greedy quantifiers
$ echo 'fig123312apple' | perl -pe 's/g(1|2|3)+(12apple)?/X/'
fiXapple
```

가장 긴 일치 항목을 결정하는 동안 전체 정규식 일치도 고려합니다. 이것이 Error.valid 예제의 작동 방식입니다. 가 Error 다음에 모든 문자를 소비했다면 유효한 일치시킬 문자가 더 이상 없을 것입니다. 따라서 .*에 일치시킬 다양한 문자 중에서 전체 정규식을 만족하는 가장 긴 부분이 선택됩니다. 예를 들어 a.*b 와 같은 것은 입력 문자열의 첫 번째 a부터 마지막 b까지 일치합니다. Perl과 같은 다른 구현에서는 백트래킹이라는 프로세스를 통해 이 작업을 수행합니다. 이러한 접근 방식에는 고유한 장단점이 있으며 패턴에 따라 기하급수적인 시간 소모가 발생할 수 있습니다.

```
# from the start of line to the last 'b' in the line
$ echo 'car bat cod map scat dot abacus' | sed 's/.*b/-/'
-acus

# from the first 'b' to the last 't' in the line
$ echo 'car bat cod map scat dot abacus' | sed 's/b.*t/-/'
car - abacus

# from the first 'b' to the last 'at' in the line
$ echo 'car bat cod map scat dot abacus' | sed 's/b.*at/-/'
car - dot abacus

# here 'm*' will match 'm' zero times as that gives the longest match
$ echo 'car bat cod map scat dot abacus' | sed 's/a.*m*/-/'
c-
```


## Character classes
제한된 문자 집합에 대한 사용자 지정 자리 표시자를 만들려면 [] 메타문자 안에 해당 문자를 묶으면 됩니다. 그룹 내에서 단일 문자를 번갈아 사용하는 것과 비슷하지만 유연성과 기능이 추가되었습니다. 문자 클래스에는 고유한 버전의 메타문자가 있으며 일반적인 사용 사례를 위해 미리 정의된 특수 집합을 제공합니다. 한정자는 문자 클래스에도 적용할 수 있습니다.

```
# same as: sed -nE '/cot|cut/p' and sed -nE '/c(o|u)t/p'
$ printf 'cute\ncat\ncot\ncoat\ncost\nscuttle\n' | sed -n '/c[ou]t/p'
cute
cot
scuttle

# same as: sed -nE '/.(a|e|o)t/p'
$ printf 'meeting\ncute\nboat\nat\nfoot\n' | sed -n '/.[aeo]t/p'
meeting
boat
foot

# same as: sed -E 's/\b(s|o|t)(o|n)\b/X/g'
$ echo 'no so in to do on' | sed 's/\b[sot][on]\b/X/g'
no X in X do X

# lines made up of letters 'o' and 'n', line length at least 2
# words.txt contains dictionary words, one word per line
$ sed -nE '/^[on]{2,}$/p' words.txt
no
non
noon
on
```


## Character class metacharacters
캐릭터 클래스에는 세트를 간결하게 정의하는 데 도움이 되는 자체 메타문자가 있습니다. , $ , () 등과 같은 캐릭터 클래스 외부의 메타문자는 특별한 의미가 없거나 캐릭터 클래스 내부에서 완전히 다른 의미를 갖습니다.

먼저, 메타문자는 문자를 개별적으로 지정하지 않고도 다양한 문자를 정의하는 데 도움이 됩니다.

```
# same as: sed -E 's/[0123456789]+/-/g'
$ echo 'Sample123string42with777numbers' | sed -E 's/[0-9]+/-/g'
Sample-string-with-numbers

# whole words made up of lowercase alphabets and digits only
$ echo 'coat Bin food tar12 best' | sed -E 's/\b[a-z0-9]+\b/X/g'
X Bin X X X

# whole words made up of lowercase alphabets, starting with 'p' to 'z'
$ echo 'road i post grip read eat pit' | sed -E 's/\b[p-z][a-z]*\b/X/g'
X i X grip X eat X
```

문자 클래스를 사용하여 숫자 범위를 구성할 수도 있습니다. 그러나 코너 케이스를 놓치기 쉽고 일부 범위는 구성하기가 복잡합니다.

```
# numbers between 10 to 29
$ echo '23 154 12 26 34' | sed -E 's/\b[12][0-9]\b/X/g'
X 154 X X 34

# numbers >= 100 with optional leading zeros
$ echo '0501 035 154 12 26 98234' | sed -E 's/\b0*[1-9][0-9]{2,}\b/X/g'
X 035 X 12 26 X
```

다음 메타문자는 ^이며, 문자 클래스의 첫 번째 문자로 지정해야 합니다. 이 문자는 문자 집합을 부정하므로 지정된 문자 이외의 모든 문자가 일치합니다. 앞서 강조한 것처럼 네거티브 로직을 주의해서 처리하면 원하는 것보다 더 많은 문자가 일치할 수 있습니다.

```
# replace all non-digit characters
$ echo 'Sample123string42with777numbers' | sed -E 's/[^0-9]+/-/g'
-123-42-777-

# delete last two columns
$ echo 'apple:123:banana:cherry' | sed -E 's/(:[^:]+){2}$//'
apple:123

# sequence of characters surrounded by double quotes
$ echo 'I like "mango" and "guava"' | sed -E 's/"[^"]+"/X/g'
I like X and X

# sometimes it is simpler to positively define a set than negation
# same as: sed -n '/^[^aeiou]*$/p'
$ printf 'tryst\nfun\nglyph\npity\nwhy\n' | sed '/[aeiou]/d'
tryst
glyph
why
```


## Escape sequence sets
일반적으로 사용되는 일부 문자 집합에는 미리 정의된 이스케이프 시퀀스가 있습니다:

\w는 모든 단어 문자[a-zA-Z0-9_]와 일치합니다(단어 경계에 대한 설명을 기억하세요)
\W는 모든 단어가 아닌 문자와 일치합니다(앞에서 본 이중성, 예: \b 및 \B)
\s는 모든 공백 문자(탭, 새줄, 세로 탭, 폼 피드, 캐리지 리턴 및 공백)와 일치합니다
\S는 모든 비공백 문자(공백이 아닌 문자)와 일치합니다.

이러한 이스케이프 시퀀스는 문자 클래스 내부에서는 사용할 수 없습니다. 또한 앞서 언급했듯이 이러한 정의는 ASCII 입력을 가정합니다.

```
# match all non-word characters
$ echo 'load;err_msg--\nant,r2..not' | sed -E 's/\W+/-/g'
load-err_msg-nant-r2-not

# replace all sequences of whitespaces with a single space
$ printf 'hi \v\f there.\thave \ra nice\t\tday\n' | sed -E 's/\s+/ /g'
hi there. have a nice day

# \w would simply match \ and w inside character classes
$ echo 'w=y\x+9*3' | sed 's/[\w=]//g'
yx+9*3
```

sed는 다른 구현에서 모든 숫자와 숫자가 아닌 것에 대한 바로 가기로 일반적으로 사용되는 \d 및 \D를 지원하지 않습니다.

```
# \d will match just the 'd' character
$ echo '42\d123' | sed -E 's/\d+/-/g'
42\-123

# \d here matches all digit characters
$ echo '42\d123' | perl -pe 's/\d+/-/g'
-\d-
```



## Named character sets
명명된 문자 집합은 [: 및 :] 사이로 묶인 이름으로 정의되며 필요에 따라 다른 문자와 함께 문자 클래스 [] 내에서 사용해야 합니다. 명명된 집합 설명 [:숫자:] [0-9] [:하위:] [a-z] [:상위:] [A-Z] [:알파:] [a-zA-Z] [:서수:] [0-9a-zA-Z] [:x디지트:] [0-9a-fA-F] [:cntrl:] 제어 문자 - 처음 32개의 ASCII 문자 및 127번째 (DEL) 명명된 집합 설명 [: punct:] 모든 구두점 문자 [:graph:] [:alnum:] 및 [:punct:] [:print:] [:alnum:] , [:punct:] 및 공백 [:blank:] 공백 및 탭 문자 [:space:] 공백 문자, \s와 같은 공백 문자

다음은 몇 가지 예입니다:

```
$ s='err_msg xerox ant m_2 P2 load1 eel'
$ echo "$s" | sed -E 's/\b[[:lower:]]+\b/X/g'
err_msg X X m_2 P2 load1 X

$ echo "$s" | sed -E 's/\b[[:lower:]_]+\b/X/g'
X X X m_2 P2 load1 X

$ echo "$s" | sed -E 's/\b[[:alnum:]]+\b/X/g'
err_msg X X m_2 X X X

$ echo ',pie tie#ink-eat_42' | sed -E 's/[^[:punct:]]+//g'
,#-_
```


## Matching character class metacharacters literally
문자 클래스 메타문자를 문자 그대로 일치시키려면 특정 배치가 필요합니다.
- 는 첫 번째 또는 마지막 문자여야 합니다.

```
# same as: sed -E 's/[-a-z]{2,}/X/g'
$ echo 'ab-cd gh-c 12-423' | sed -E 's/[a-z-]{2,}/X/g'
X X 12-423
```

] 가 첫 번째 문자가 되어야 합니다.

```
# no match
$ printf 'int a[5]\nfig\n1+1=2\n' | sed -n '/[=]]/p'

# correct usage
$ printf 'int a[5]\nfig\n1+1=2\n' | sed -n '/[]=]/p'
int a[5]
1+1=2
```

[는 문자 집합의 어느 곳에서나 사용할 수 있지만 [. 또는 [: . [][]를 사용하면 [ 및 ]와 모두 일치합니다.

```
$ echo 'int a[5]' | sed -n '/[x[.y]/p'
sed: -e expression #1, char 9: unterminated address regex

$ echo 'int a[5]' | sed -n '/[x[y.]/p'
int a[5]
```

^ 는 첫 번째 문자가 아닌 다른 문자여야 합니다.

```
$ echo 'f*(a^b) - 3*(a+b)/(a-b)' | sed 's/a[+^]b/c/g'
f*(c) - 3*(c)/(a-b)
```

위의 예에서 볼 수 있듯이 [. 또는 [:]와 같은 조합은 [] 내에서 특별한 의미를 가지므로 두 개의 개별 문자를 의미하는 데 함께 사용할 수 없습니다. 자세한 내용은 정보 sed의 문자 클래스 및 대괄호 표현식 섹션을 참조하세요.



## Escape sequences
탭 \t , 캐리지 리턴 \r , 개행 \n 등과 같은 특정 ASCII 문자에는 이를 나타내는 이스케이프 시퀀스가 있습니다. 또한 모든 문자는 10진수 \dNNN, 8진수 \oNNN 또는 16진수 \xNN 형식의 ASCII 값을 사용하여 표현할 수 있습니다. w와 같은 문자 집합 이스케이프 시퀀스와는 달리 문자 클래스 내에서 사용할 수 있습니다. 는 문자 클래스 내부에서 특수하므로 문자 그대로 표현하려면 \를 사용합니다(기술적으로는 \와 그 뒤에 오는 문자의 조합이 유효한 이스케이프 시퀀스인 경우에만 필요합니다).

```
# \t represents the tab character
$ printf 'apple\tbanana\tcherry\n' | sed 's/\t/ /g'
apple banana cherry
$ echo 'a b c' | sed 's/ /\t/g'
a       b        c

# these escape sequence work inside character class too
$ printf 'a\t\r\fb\vc\n' | sed -E 's/[\t\v\f\r]+/:/g'
a:b:c

# representing single quotes
# use \d039 and \o047 for decimal and octal respectively
$ echo "universe: '42'" | sed 's/\x27/"/g'
universe: "42"
$ echo 'universe: "42"' | sed 's/"/\x27/g'
universe: '42'
```

검색 섹션에서 ASCII 값 형식을 사용하여 메타문자를 지정한 경우에도 해당 문자는 메타문자로 작동합니다. 그러나 바꾸기 섹션에서 ASCII 값 형식을 사용하여 지정한 메타문자는 리터럴 문자로 작동합니다. 정의되지 않은 이스케이프 시퀀스(검색 및 바꾸기 섹션 모두)는 이스케이프하는 문자로 처리됩니다(예: \e는 \ 및 e가 아닌 e와 일치함).

```
# \x5e is ^ character, acts as line anchor here
$ printf 'cute\ncot\ncat\ncoat\n' | sed -n '/\x5eco/p'
cot
coat

# & metacharacter in replacement will be discussed in the next section
# it represents the entire matched portion
$ echo 'hello world' | sed 's/.*/"&"/'
"hello world"
# \x26 is & character, acts as a literal character here
$ echo 'hello world' | sed 's/.*/"\x26"/'
"&"
```

sed 매뉴얼을 참조하세요: 이스케이프에서 전체 목록과 우선순위 규칙 등 자세한 내용을 확인하세요. 스택 오버플로: 문자 클래스 내 ASCII 값 형식의 동작도 참조하세요.


## Backreferences
그룹화 메타문자()는 캡처 그룹이라고도 합니다. 프로그래밍 언어의 변수와 마찬가지로 ()로 캡처한 부분은 나중에 역참조를 사용하여 참조할 수 있습니다. 구문은 \N이며, 여기서 N은 원하는 캡처 그룹입니다. 정규 표현식에서 가장 왼쪽 ( 은 \1, 그 다음은 \2, 그 다음부터 \9까지입니다. 역참조는 검색과 바꾸기 섹션 모두에서 사용할 수 있습니다.

```
# whole words that have at least one consecutive repeated character
# word boundaries are not needed here as longest match wins
$ echo 'effort flee facade oddball rat tool' | sed -E 's/\w*(\w)\1\w*/X/g'
X X facade X rat X

# reduce \\ to \ and delete if it is a single \
$ echo '\[\] and \\w and \[a-zA-Z0-9\_\]' | sed -E 's/(\\?)\\/\1/g'
[] and \w and [a-zA-Z0-9_]

# remove two or more duplicate words separated by spaces
# \b prevents false matches like 'the theatre', 'sand and stone' etc
$ echo 'aa a a a 42 f_1 f_1 f_13.14' | sed -E 's/\b(\w+)( \1)+\b/\1/g'
aa a 42 f_1 f_13.14

# 8 character lines having the same 3 lowercase letters at the start and end
$ sed -nE '/^([a-z]{3})..\1$/p' words.txt
mesdames
respires
restores
testates
```

\0 또는 &는 대체 섹션에서 일치하는 전체 문자열을 나타냅니다.

```
# duplicate the first column value and add it as the final column
# same as: sed -E 's/^([^,]+).*/\0,\1/'
$ echo 'one,2,3.14,42' | sed -E 's/^([^,]+).*/&,\1/'
one,2,3.14,42,one

# surround the entire line with double quotes
$ echo 'hello world' | sed 's/.*/"&"/'
"hello world"

$ echo 'hello world' | sed 's/.*/Hi. &. Have a nice day/'
Hi. hello world. Have a nice day
```

내부() 메타문자로 그룹화된 패턴에 수량화자가 적용된 경우 일치하는 부분을 캡처하려면 외부() 그룹이 필요합니다. PCRE(Perl 호환 정규식)와 같은 다른 정규식 엔진은 이러한 경우를 처리하기 위해 캡처하지 않는 그룹을 제공합니다. sed에서는 추가 캡처 그룹을 고려해야 합니다.

```
# uppercase the first letter of the first column (\u will be discussed later)
# surround the third column with double quotes
# note the numbers used in the replacement section
$ echo 'one,2,3.14,42' | sed -E 's/^(([^,]+,){2})([^,]+)/\u\1"\3"/'
One,2,"3.14",42
```

다음은 일치하는 부분의 길이가 같은 경우 대체 순서가 중요한 예입니다. g 또는 p로 시작하고 y를 포함하지 않는 한 전체 단어를 모두 삭제하는 것이 목표입니다. 스택 오버플로우를 참조하세요: 다른 사용 사례에 대한 sed의 비욕심 매칭을 참조하세요.

```
$ s='tryst,fun,glyph,pity,why,group'

# all words get deleted because \b\w+\b gets priority here
$ echo "$s" | sed -E 's/\b\w+\b|(\b[gp]\w*y\w*\b)/\1/g'
,,,,,

# capture group gets priority here, so words in the capture group are retained
$ echo "$s" | sed -E 's/(\b[gp]\w*y\w*\b)|\b\w+\b/\1/g'
,,glyph,pity,,
```

\ 와 &는 대체 섹션에서 특수 문자이므로 문자 그대로 표현하려면 각각 \와 &를 사용합니다.

```
$ echo 'apple and fig' | sed 's/and/[&]/'
apple [and] fig
$ echo 'apple and fig' | sed 's/and/[\&]/'
apple [&] fig

$ echo 'apple and fig' | sed 's/and/\\/'
apple \ fig
```

역참조는 캡처 그룹 내부에 있던 패턴이 아니라 일치된 문자열을 제공합니다. 예를 들어 ([0-9][a-f])가 3b 와 일치하는 경우 역참조는 8f , 0a 등과 같은 다른 유효한 일치 항목이 아닌 3b를 제공합니다. 이는 프로그래밍에서 변수가 작동하는 방식과 유사하며, 변수 할당 후에는 표현식 자체는 남지 않고 표현식 결과만 남습니다.



## Known Bugs
알려진 문제를 보려면 sed 버그 목록을 참조하세요.

다음은 사용자가 직접 제기한 특정 역참조 및 정량화기 사용에 대한 문제입니다.

```
# takes some time and results in no output
# aim is to get words having two occurrences of repeated characters
# works if you use perl -ne 'print if /^(\w*(\w)\2\w*){2}$/'
$ sed -nE '/^(\w*(\w)\2\w*){2}$/p' words.txt | head -n5

# works when nesting is unrolled
$ sed -nE '/^\w*(\w)\1\w*(\w)\2\w*$/p' words.txt | head -n5
Abbott
Annabelle
Annette
Appaloosa
Appleseed
```

unix.stackexchange: 이 sed 명령은 왜 세 번째에서 마지막 "and"를 대체하지 않나요? 단어 경계와 그룹 반복이 관련되어 있을 때 또 다른 흥미로운 버그를 보여줍니다. 몇 가지 예가 아래에 나와 있습니다. 다시 말하지만, 해결 방법은 그룹을 확장하는 것입니다.

```
# wrong output
$ echo 'cocoa' | sed -nE '/(\bco){2}/p'
cocoa
# correct behavior, no output
$ echo 'cocoa' | sed -nE '/\bco\bco/p'

# wrong output, there's only 1 whole word 'it' after 'with'
$ echo 'it line with it here sit too' | sed -E 's/with(.*\bit\b){2}/XYZ/'
it line XYZ too
# correct behavior, input isn't modified
$ echo 'it line with it here sit too' | sed -E 's/with.*\bit\b.*\bit\b/XYZ/'
it line with it here sit too
```

단어 경계를 < 및 >로 변경하면 다른 문제가 발생합니다:

```
# this correctly doesn't modify the input
$ echo 'it line with it here sit too' | sed -E 's/with(.*\<it\>){2}/XYZ/'
it line with it here sit too

# this correctly modifies the input
$ echo 'it line with it here it too' | sed -E 's/with(.*\<it\>){2}/XYZ/'
it line XYZ too

# but this one fails to modify the input
# expected output: it line XYZ too sit
$ echo 'it line with it here it too sit' | sed -E 's/with(.*\<it\>){2}/XYZ/'
it line with it here it too sit
```


## Cheatsheet and summary
Note Description
BRE Basic Regular Expression, enabled by default
ERE Extended Regular Expression, enabled with the -E option
Note: only ERE syntax is covered below
metacharacters characters with special meaning in REGEXP
^ restricts the match to the start of the line
$ restricts the match to the end of the line
\b restricts the match to start/end of words
Note Description
word characters: alphabets, digits, underscore
\B matches wherever \b doesn’t match
\< start of word anchor
\> end of word anchor
pat1|pat2 combine multiple patterns as conditional OR
each alternative can have independent anchors
alternative which matches earliest in the input gets precedence
and the leftmost longest portion wins in case of a tie
() group pattern(s)
a(b|c)d same as abd|acd
\^ prefix metacharacters with \ to match them literally
\\ to match \ literally
switching between ERE and BRE helps in some cases
/ idiomatically used as the delimiter for REGEXP
any character except \ and newline character can also be used
. match any character (including the newline character)
? match 0 or 1 times
* match 0 or more times
+ match 1 or more times
{m,n} match m to n times
{m,} match at least m times
{,n} match up to n times (including 0 times)
{n} match exactly n times
pat1.*pat2 any number of characters between pat1 and pat2
pat1.*pat2|pat2.*pat1 match both pat1 and pat2 in any order
[ae;o] match any of these characters once
quantifiers are applicable to character classes too
[3-7] range of characters from 3 to 7
[^=b2] match other than = or b or 2
[a-z-] - should be the first/last character to match literally
[+^] ^ shouldn’t be the first character
[]=] ] should be the first character
combinations like [. or [: have special meaning
\w similar to [a-zA-Z0-9_] for matching word characters
\s similar to [ \t\n\r\f\v] for matching whitespace characters
use \W and \S for their opposites respectively
[:digit:] named character set, same as [0-9]
\xNN represent a character using its ASCII value in hexadecimal
use \dNNN for decimal and \oNNN for octal
\N backreference, gives matched portion of Nth capture group
applies to both the search and replacement sections
possible values: \1 , \2 up to \9
\0 or & represents entire matched string in the replacement section

정규식은 여러 명령줄 프로그램과 프로그래밍 언어에서 접할 수 있는 기능입니다. 텍스트 처리를 위한 다용도 도구입니다. BRE/ERE 구현에서 제공하는 기능은 프로그래밍 언어에서 제공하는 기능에 비해 적지만 명령줄 사용에 필요한 대부분의 작업에 충분합니다. 정규 표현식의 구문과 기능에 익숙해지는 데는 많은 시간이 걸리므로 많은 연습과 메모를 해두는 것이 좋습니다. 또한 유연성과 복잡성 때문에 그 자체로 미니 프로그래밍 언어라고 생각하면 도움이 될 것입니다. 다음 장에서는 정규식 사용에 더 많은 기능을 추가하는 플래그에 대해 알아보겠습니다.


## Exercises
연습 문제 디렉터리에는 이 섹션에서 사용된 모든 파일이 있습니다.

1) 입력 파일 patterns.txt 의 경우 den 으로 시작하거나 ly 로 끝나는 모든 줄을 표시합니다.

```
$ sed ##### add your solution here
2 lonely
dent
lovely
```

2) 입력 파일 패턴.txt의 경우 단어 가장자리에 있는 경우를 제외하고 42가 나오는 모든 부분을 [42]로 바꿉니다. 수정된 줄만 표시합니다.

```
$ sed ##### add your solution here
Hi[42]Bye nice1[42]3 bad42
eqn2 = pressure*3+42/5-1[42]56
cool_[42]a 42fake
_[42]_
```

3) 입력 파일 패턴.txt의 경우 s로 시작하고 e와 t가 포함된 단어 주위에 [] 를 순서와 상관없이 추가합니다. 수정된 줄만 표시합니다.

```
$ sed ##### add your solution here
[sets] tests Sauerkraut
[site] cite kite bite [store_2]
[subtle] sequoia
a [set]
```

4) 입력 파일 패턴.txt 에서 첫 단어와 마지막 단어의 문자가 같은 줄을 표시합니다.

```
$ sed ##### add your solution here
Not a pip DOWN
y
1 dentist 1
_42_
```

5) 입력 파일 패턴.txt 의 경우 *[5]가 포함된 줄을 문자 그대로 표시합니다.

```
$ sed ##### add your solution here
(9-2)*[5]
```

6) sed -nE '/\ba-z[a-z]\b/p'는 sed -nE '/\b[a-z][on]{2}[a-z]\b/p'와 동일합니다. 참 또는 거짓? 아래에 표시된 샘플 입력은 차이점을 이해하는 데 도움이 될 수 있습니다.

```
$ printf 'known\nmood\nknow\npony\ninns\n'
known
mood
know
pony
inns
```

7) 입력 파일 패턴.txt의 경우, 손으로 시작하여 s 또는 y 또는 le로 끝나는 모든 줄을 표시하거나 더 이상 문자를 표시하지 않습니다.

```
$ sed ##### add your solution here
handle
handy
hands
hand
```

8) 입력 파일 패턴.txt의 경우 42//5 또는 42/5를 8로 바꿉니다. 수정된 줄만 표시합니다.

```
$ sed ##### add your solution here
eqn3 = r*42-5/3+42///5-83+a
eqn1 = a+8-c
eqn2 = pressure*3+8-14256
```

9) 주어진 수량자에 대해 {m,n} 표현을 사용하는 등가 형식은 무엇일까요?

- ? is same as
- * is same as
- • + is same as

10) 참인가 거짓인가? ERE에서 (a*|b*)는 (a|b)*와 동일합니다.

11) 패턴.txt 입력 파일에 대해 아래와 같이 두 개의 서로 다른 REGEXP를 구성하여 출력을 얻습니다. 수정된 줄만 표시합니다.

```
# delete from '(' till next ')'
$ sed ##### add your solution here
a/b + c%d
*[5]
def factorial
12- *4)
Hi there. Nice day

# delete from '(' till next ')' but not if there is '(' in between
$ sed ##### add your solution here
a/b + c%d
*[5]
def factorial
12- (e+*4)
Hi there. Nice day(a
```

12) 입력 파일 anchors.txt의 경우 아래와 같이 마크다운 앵커를 해당 하이퍼링크로 변환합니다.

```
$ cat anchors.txt
# <a name="regular-expressions"></a>Regular Expressions
## <a name="subexpression-calls"></a>Subexpression calls
## <a name="the-dot-meta-character"></a>The dot meta character

$ sed ##### add your solution here
[Regular Expressions](#regular-expressions)
[Subexpression calls](#subexpression-calls)
[The dot meta character](#the-dot-meta-character)
```

13) 입력 파일 패턴.txt의 경우, 대문자가 포함된 줄에만 a 또는 r로 끝나는 단어 뒤에 오는 공백 문자를 새 줄 문자로 바꿉니다. 수정된 줄만 표시합니다.

```
$ sed ##### add your solution here
par
car
tar
far
Cart
Not a
pip DOWN
```

14) 전체 단어를 모두 ()로 묶습니다. 또한 전체 단어가 임프 또는 앤트인 경우 이를 삭제합니다. 한 번만 대체할 수 있나요?

```
$ words='tiger imp goat eagle ant important'
$ echo "$words" | sed ##### add your solution here
(tiger) () (goat) (eagle) () (important)
```

15) 입력 파일 패턴.txt의 경우 전체 단어가 아닌 자동차가 포함된 줄을 표시합니다.

```
$ sed ##### add your solution here
scar
care
a huge discarded pile of books
scare
part cart mart
```

16) ERE 패턴 ^a\w+([0-9]+:fig)? 가 입력 apple42:banana314와 apple42:fig100에 대해 동일한 문자와 일치합니까? 그렇지 않다면 그 이유는 무엇인가요?

17) 입력 파일 패턴.txt의 경우 4 또는 - 또는 u 또는 sub 또는 care로 시작하는 줄을 표시합니다.

```
$ sed ##### add your solution here
care
4*5]
-handy
subtle sequoia
unhand
```

18) 주어진 입력 문자열에 대해 모든 숫자 시퀀스를 반복되지 않는 고유한 시퀀스로만 바꿉니다. 예를 들어 232323은 23으로, 897897은 897로 변경해야 합니다. 반복이 없거나(예: 1234 ) 반복이 일찍 끝나는 경우(예: 12121 )는 변경하지 않아야 합니다.

```
$ s='1234 2323 453545354535 9339 11 60260260'
$ echo "$s" | sed ##### add your solution here
1234 23 4535 9339 1 60260260
```

19) 또는 로 구분된 단어로 구성된 시퀀스는 시퀀스의 첫 번째 단어로 바꿉니다. 이러한 시퀀스는 : 또는 . 뒤에 단어 문자가 오지 않으면 종료됩니다.

```
$ ip='wow:Good:2_two.five: hi-2 bye kite.777:water.'
$ echo "$ip" | sed ##### add your solution here
wow hi-2 bye kite
```

20) 또는 로 구분된 단어로 구성된 시퀀스는 시퀀스의 마지막 단어로 바꿉니다. 이러한 시퀀스는 : 또는 . 뒤에 단어 문자가 오지 않으면 종료됩니다.

```
$ ip='wow:Good:2_two.five: hi-2 bye kite.777:water.'
$ echo "$ip" | sed ##### add your solution here
five hi-2 bye water
```

21) 앞에 ( 문자가 오지 않는 한 모든 전체 단어를 X로 바꿉니다.

```
$ s='guava (apple) berry) apple (mango) (grape'
$ echo "$s" | sed ##### add your solution here
X (apple) X) X (mango) (grape
```

22) 전체 단어 뒤에 : 또는 , 또는 -가 오는 경우에만 []로 묶습니다.

```
$ ip='Poke,on=-=so_good:ink.to/is(vast)ever2-sit'
$ echo "$ip" | sed ##### add your solution here
[Poke],on=-=[so_good]:ink.to/is(vast)[ever2]-sit
```

23) fields.txt 파일에는 필드가 : 문자로 구분되어 있습니다. 마지막 필드 앞에 숫자 문자가 있는 경우 : 문자를 삭제하고 마지막 필드를 삭제합니다.

```
$ cat fields.txt
42:cat
twelve:a2b
we:be:he:0:a:b:bother
apple:banana-42:cherry:
dragon:unicorn:centaur

$ sed ##### add your solution here
twelve:a2b
we:be:he:0:a:b
apple:banana-42:cherry
dragon:unicorn:centaur
```

24) sed -n '/a^b/p'와 sed -nE '/a^b/p' 명령은 동일한가요?

25) REGEXP 구분 기호로 사용할 수 있는 문자는 무엇인가요?



# Flags
옵션이 셸 명령의 기본 동작을 변경하는 것처럼 플래그는 정규 표현식의 측면을 변경하는 데 사용됩니다. g와 p와 같은 플래그 중 일부는 이미 설명한 바 있습니다. 완전성을 위해 이 장에서 다시 설명하겠습니다. 정규식 용어로 플래그를 수정자라고도 합니다.

example_files 디렉터리에는 예제에서 사용된 모든 파일이 있습니다.


## Case insensitive matching
I 플래그를 사용하면 패턴 대소문자를 무감각하게 일치시킬 수 있습니다.

```
# match 'cat' case sensitively
$ printf 'Cat\ncOnCaT\nscatter\ncot\n' | sed -n '/cat/p'
scatter

# match 'cat' case insensitively
# note that a command (ex: p) cannot be used before flags
$ printf 'Cat\ncOnCaT\nscatter\ncot\n' | sed -n '/cat/Ip'
Cat
cOnCaT
scatter

# match 'cat' case insensitively and replace it with 'dog'
$ printf 'Cat\ncOnCaT\nscatter\ncot\n' | sed 's/cat/dog/I'
dog
cOndog
sdogter
cot
```

일반적으로 i는 이러한 용도로 사용됩니다(예: grep -i). 그러나 i는 명령이므로(추가, 변경, 삽입 장에서 설명함) /REGEXP/i는 사용할 수 없습니다. 대체 명령은 i와 I 를 모두 허용하지만 일관성을 위해 I 를 사용하는 것이 좋습니다.


## Changing case in the replacement section
이 장에서는 I 플래그를 보완하기 위해 이 섹션을 제공합니다. sed는 역참조, 셸 변수 등을 포함할 수 있는 대체 문자열의 대소문자를 변경하는 이스케이프 시퀀스를 제공합니다.

시퀀스 설명 \E는 대/소문자 변환의 끝을 나타냅니다 \l 다음 문자를 소문자로 변환합니다 \u 다음 문자를 대문자로 변환합니다 \L 다음 문자를 소문자로 변환합니다(\U 또는 \E로 재정의됨) \U 다음 문자를 대문자로 변환합니다(\L 또는 \E로 재정의됨).


먼저, 이스케이프 시퀀스 뒤의 바로 다음 문자만 대소문자를 변경합니다.

```
# match only the first character of a word
# use & to backreference the matched character
# \u would then change it to uppercase
$ echo 'hello there. how are you?' | sed 's/\b\w/\u&/g'
Hello There. How Are You?

# change the first character of a word to lowercase
$ echo 'HELLO THERE. HOW ARE YOU?' | sed 's/\b\w/\l&/g'
hELLO tHERE. hOW aRE yOU?

# match lowercase followed by underscore followed by lowercase
# delete the underscore and convert the 2nd lowercase to uppercase
$ echo '_fig aug_price next_line' | sed -E 's/([a-z])_([a-z])/\1\u\2/g'
_fig augPrice nextLine
```

다음으로 한 번에 여러 문자의 대/소문자를 변경합니다.

```
# change all alphabets to lowercase
$ echo 'HaVE a nICe dAy' | sed 's/.*/\L&/'
have a nice day
# change all alphabets to uppercase
$ echo 'HaVE a nICe dAy' | sed 's/.*/\U&/'
HAVE A NICE DAY

# \E will stop further conversion
$ echo 'fig_ aug_price next_line' | sed -E 's/([a-z]+)(_[a-z]+)/\U\1\E\2/g'
fig_ AUG_price NEXT_line
# \L or \U will override any existing conversion
$ echo 'HeLLo:bYe gOoD:beTTEr' | sed -E 's/([a-z]+)(:[a-z]+)/\L\1\U\2/Ig'
hello:BYE good:BETTER
```

마지막으로, 이스케이프가 나란히 사용되는 예제입니다.

```
# uppercase first character of a word
# and lowercase rest of the word characters
# note the order of escapes used, \u\L won't work
$ echo 'HeLLo:bYe gOoD:beTTEr' | sed -E 's/[a-z]+/\L\u&/Ig'
Hello:Bye Good:Better

# lowercase first character of a word
# and uppercase rest of the word characters
$ echo 'HeLLo:bYe gOoD:beTTEr' | sed -E 's/[a-z]+/\U\l&/Ig'
hELLO:bYE gOOD:bETTER
```


## Global replace
기본적으로 대체 명령은 일치하는 부분의 첫 번째 항목만 대체합니다. 일치하는 모든 부분을 바꾸려면 g 플래그를 사용합니다.

```
# for each input line, change only the first ',' to '-'
$ printf '1,2,3,4\na,b,c,d\n' | sed 's/,/-/'
1-2,3,4
a-b,c,d

# change all matches by adding the 'g' flag
$ printf '1,2,3,4\na,b,c,d\n' | sed 's/,/-/g'
1-2-3-4
a-b-c-d
```



## Replace specific occurrences
플래그로 제공된 숫자는 N번째 일치 항목만 교체되도록 합니다.

```
$ s='apple:banana:cherry:fig:mango'

# replace only the second occurrence
$ echo "$s" | sed 's/:/---/2'
apple:banana---cherry:fig:mango
$ echo "$s" | sed -E 's/[^:]+/"&"/2'
apple:"banana":cherry:fig:mango

# replace only the third occurrence, and so on
$ echo "$s" | sed 's/:/---/3'
apple:banana:cherry---fig:mango
$ echo "$s" | sed -E 's/[^:]+/"&"/3'
apple:banana:"cherry":fig:mango
```

캡처 그룹과 한정자의 조합을 사용하여 줄 끝에서 N번째 일치 항목을 대체합니다.

```
$ s='car,art,pot,tap,urn,ray,ear'

# replace the last occurrence
# can also use sed -E 's/,([^,]*)$/[]\1/'
$ echo "$s" | sed -E 's/(.*),/\1[]/'
car,art,pot,tap,urn,ray[]ear

# replace last but one
$ echo "$s" | sed -E 's/(.*),(.*,)/\1[]\2/'
car,art,pot,tap,urn[]ray,ear

# generic version, where {N} refers to last but N
$ echo "$s" | sed -E 's/(.*),((.*,){3})/\1[]\2/'
car,art,pot[]tap,urn,ray,ear
```

unix.stackexchange를 참조하세요: sed 명령이 세 번째에서 마지막 "and"를 대체하지 않는 이유: ((pat){N}) 일반 대소문자에서 단어 경계 사용과 관련된 버그를 수정했습니다.

숫자와 g 플래그의 조합은 첫 번째 N-1 개를 제외한 모든 일치 항목을 대체합니다. 즉, N번째 일치 항목부터 시작하는 모든 일치 항목이 대체됩니다.

```
$ s='apple:banana:cherry:fig:mango'

# replace all matches except the first occurrence
$ echo "$s" | sed -E 's/:/---/2g'
apple:banana---cherry---fig---mango

# replace all matches except the first three occurrences
$ echo "$s" | sed -E 's/:/---/4g'
apple:banana:cherry:fig---mango
```

여러 개의 N번째 항목을 교체해야 하는 경우 가독성을 위해 내림차순을 사용합니다.

```
$ s='car,art,pot,tap,urn,ray,ear'

# replace the second and third occurrences
# same as: sed 's/,/[]/2; s/,/[]/2'
$ echo "$s" | sed 's/,/[]/3; s/,/[]/2'
car,art[]pot[]tap,urn,ray,ear

# replace the second, third and fifth occurrences
$ echo "$s" | sed 's/,/[]/5; s/,/[]/3; s/,/[]/2'
car,art[]pot[]tap,urn[]ray,ear
```


## Print flag
이 플래그는 선택적 편집 장에서 이미 소개한 바 있습니다.

```
# no output if no substitution
$ echo 'hi there. have a nice day' | sed -n 's/xyz/XYZ/p'

# modified line is printed when the substitution succeeds
$ echo 'hi there. have a nice day' | sed -n 's/\bh/H/pg'
Hi there. Have a nice day
```


## Write to a file
w 플래그는 콘텐츠를 지정된 파일명으로 리디렉션하는 데 도움이 됩니다. 이 플래그는 필터링 명령과 대체 명령 모두에 적용됩니다. 단순히 셸 리디렉션을 사용하지 않는 이유가 궁금할 수 있습니다. sed는 여러 명령을 허용하므로 w 플래그를 선택적으로 사용하여 여러 파일에 쓰기를 허용하는 등의 작업을 수행할 수 있습니다.

```
# space between w and the filename is optional
# same as: sed -n 's/3/three/p' > 3.txt
$ seq 20 | sed -n 's/3/three/w 3.txt'
$ cat 3.txt
three
1three

# do not use -n if output should be displayed as well as written to a file
$ printf '1,2,3,4\na,b,c,d\n' | sed 's/,/:/gw cols.txt'
1:2:3:4
a:b:c:d
$ cat cols.txt
1:2:3:4
a:b:c:d
```

출력 파일이 여러 개인 경우 -e를 사용하여 명령을 구분합니다. 명령 사이에 ; 를 사용하면 파일 이름의 일부로 해석되므로 사용하지 마세요!

```
$ seq 20 | sed -n -e 's/5/five/w 5.txt' -e 's/7/seven/w 7.txt'
$ cat 5.txt
five
1five
$ cat 7.txt
seven
1seven
```

미리 정의된 파일 이름이 두 개 있습니다:
/dev/stdout 스트림을 나타내려면 /dev/stdout
/dev/stderr 스트림을 나타내려면 /dev/stderr을 입력합니다.
- /dev/stdout to represent the stdout stream
- /dev/stderr to represent the stderr stream


```
# in-place editing as well as display changes on stdout
# 3.txt was created at the start of this section
$ sed -i 's/three/3/w /dev/stdout' 3.txt
$ cat 3.txt
```


## Executing external commands
e 플래그를 사용하면 셸 명령의 출력을 사용할 수 있습니다. 외부 명령은 패턴 스페이스 내용을 기반으로 하거나 인수로 제공할 수 있습니다. 매뉴얼에서 인용합니다:

이 명령을 사용하면 셸 명령의 입력을 패턴 공간으로 파이프할 수 있습니다. 매개 변수를 포함하거나 제외하면, e 명령은 패턴 공간에 있는 명령을 실행하고 패턴 공간을 출력으로 바꾸며, 후행 줄 바꿈은 표시되지 않습니다.

대신 매개변수를 지정하면 e 명령은 이를 명령으로 해석하여 출력을 출력 스트림으로 보냅니다. 이 명령은 백슬래시로 끝나는 마지막 줄을 제외하고 여러 줄에 걸쳐 실행될 수 있습니다.

두 경우 모두 실행할 명령에 NUL 문자가 포함되어 있으면 결과가 정의되지 않습니다.

먼저, 대체 명령을 사용한 예제입니다.

```
# sample input
$ printf 'Date:\nreplace this line\n'
Date:
replace this line

# replace entire line with the output of a shell command
$ printf 'Date:\nreplace this line\n' | sed 's/^replace.*/date/e'
Date:
Monday 29 May 2023 04:09:24 PM IST
```

p 플래그도 사용하는 경우 순서가 중요합니다. 매뉴얼에서 인용한 것입니다:

p 옵션과 e 옵션을 모두 지정하면 두 옵션의 상대적 순서에 따라 매우 다른 결과가 생성됩니다. 일반적으로는 ep(평가 후 인쇄)를 사용하는 것이 좋지만 디버깅에는 그 반대로 작동하는 것이 유용할 수 있습니다. 이러한 이유로 현재 버전의 GNU sed는 평가 전과 후 모두에 p 옵션이 있는 경우 특별히 해석하여 평가 전후에 패턴 공간을 인쇄하지만, 일반적으로 s 명령의 플래그는 그 효과를 한 번만 표시합니다. 이 동작은 문서화되어 있지만 향후 버전에서 변경될 수 있습니다.

```
$ printf 'Date:\nreplace this line\n' | sed -n 's/^replace.*/date/ep'
Monday 29 May 2023 04:10:20 PM IST

$ printf 'Date:\nreplace this line\n' | sed -n 's/^replace.*/date/pe'
date
```

줄의 일부만 바뀐 경우, 바뀐 줄 뒤의 전체 수정된 줄이 셸 명령으로 실행됩니다.

```
# after substitution, the command that gets executed is 'seq 5'
$ echo 'xyz 5' | sed 's/xyz/seq/e'
1
2
3
4
5
```

다음은 필터링만 사용한 예제입니다.

```
# execute entire matching line as a shell command
# replaces the matching line with the output of the command
$ printf 'date\ndate -I\n' | sed '/date/e'
Monday 29 May 2023 04:12:01 PM IST
2023-05-29
$ printf 'date\ndate -I\n' | sed '2e'
date
2023-05-29
```

다음은 명령이 인자로 제공되는 예제입니다. 이러한 경우 명령의 출력은 일치하는 줄 앞에 삽입됩니다.

```
$ printf 'show\nexample\n' | sed '/am/e seq 2'
show
1
2
example
```


## Multiline mode
m(또는 M ) 플래그는 ^ , $ 및 . 메타문자의 동작을 변경합니다. 예를 들어 N 명령을 사용할 때와 같이 패턴 공간에 작업할 줄이 여러 개 있는 경우에만 이 플래그가 작동합니다.

m 플래그를 사용하면 . 메타문자가 줄 바꿈 문자와 일치하지 않습니다.

```
# without 'm' flag . will match the newline character
$ printf 'Hi there\nHave a Nice Day\n' | sed 'N; s/H.*e/X/'
X Day

# with 'm' flag . will not match across lines
$ printf 'Hi there\nHave a Nice Day\n' | sed 'N; s/H.*e/X/gm'
X
X Day
```

m 플래그를 사용하면 ^ 및 $ 앵커가 모든 줄의 시작 및 끝 위치와 일치합니다.

```
# without 'm' flag line anchors will match once for the whole string
$ printf 'Hi there\nHave a Nice Day\n' | sed 'N; s/^/* /g'
* Hi there
Have a Nice Day
$ printf 'Hi there\nHave a Nice Day\n' | sed 'N; s/$/./g'
Hi there
Have a Nice Day.

# with 'm' flag line anchors will work for every line
$ printf 'Hi there\nHave a Nice Day\n' | sed 'N; s/^/* /gm'
* Hi there
* Have a Nice Day
$ printf 'Hi there\nHave a Nice Day\n' | sed 'N; s/$/./gm'
Hi there.
Have a Nice Day.
```

및 ' 앵커는 한 줄 또는 여러 줄 모드에 관계없이 항상 전체 문자열의 시작과 끝과 일치합니다.

```
# similar to \A start of string anchor found in other regexp flavors
$ printf 'Hi there\nHave a Nice Day\n' | sed 'N; s/\`/* /gm'
* Hi there
Have a Nice Day

# similar to \Z end of string anchor found in other regexp flavors
# note the use of double quotes
# with single quotes, it will be: sed 'N; s/\'\''/./gm'
$ printf 'Hi there\nHave a Nice Day\n' | sed "N; s/\'/./gm"
Hi there
Have a Nice Day.
```

일반적으로 정규식 구현에는 .메타문자와 줄 앵커의 동작을 제어하는 별도의 플래그가 있습니다. 단일 플래그를 사용하면 유연성이 제한됩니다. 예를 들어, m 플래그가 활성화된 경우 줄 전체에서 일치하도록 .을 만들 수 없습니다. 이러한 경우에는 아래와 같이 몇 가지 창의적인 대안을 사용해야 합니다.

```
# \w|\W or .|\n can also be used
# recall that sed doesn't allow character set sequences inside []
$ printf 'Hi there\nHave a Nice Day\n' | sed -E 'N; s/H(\s|\S)*e/X/m'
X Day

# this one doesn't use alternation
$ printf 'Hi there\nHave a Nice Day\n' | sed -E 'N; s/H(.*\n.*)*e/X/m'
X Day
```


## Cheatsheet and summary
Note Description
flag changes default behavior of filtering and substitution commands
I match case insensitively for REGEXP address
i or I match case insensitively for the substitution command
\E indicates end of case conversion in the replacement section
\l convert the next character to lowercase
\u convert the next character to uppercase
\L convert the following characters to lowercase (overridden by \U or \E )
\U convert the following characters to uppercase (overridden by \L or \E )
g replace all occurrences instead of just the first match
N a number will cause only the Nth match to be replaced
p print only if the substitution succeeds (assuming -n is active)
w filename write contents of the pattern space to the given filename
whenever the REGEXP address matches or substitution succeeds
e executes contents of the pattern space as a shell command
and replaces the pattern space with the command output
if argument is passed, executes that external command
and inserts the output before matching lines
m or M multiline mode flag
. will not match the newline character
^ and $ will match every line’s start and end locations
\` always match the start of string irrespective of the multiline flag
\' always match the end of string irrespective of the multiline flag

이 장에서는 플래그를 추가 기능에 사용하는 방법을 설명했습니다. 일부 플래그는 셸과도 상호 작용합니다. 다음 장에서는 sed 명령을 동적으로 구성해야 할 때 셸 변수와 명령 출력을 통합하는 방법을 배우게 됩니다.



## Exercises
연습 문제 디렉터리에는 이 섹션에서 사용된 모든 파일이 있습니다.

1) 입력 파일 para.txt의 경우 start로 시작하는 줄과 end로 끝나는 줄로 표시된 모든 줄 그룹을 제거합니다. 이 두 마커는 대소문자를 구분하지 않고 일치시킵니다.

```
$ cat para.txt
good start
Start working on that
project you always wanted
to, do not let it end
hi there
start and try to
finish the End
bye

$ sed ##### add your solution here
good start
hi there
bye
```

2) headers.txt 파일에는 하나 이상의 # 문자로 시작하여 하나 이상의 공백 문자, 그리고 몇 개의 단어로 구성된 한 줄당 하나의 헤더가 포함되어 있습니다. 이러한 줄을 아래와 같이 해당 출력으로 변환합니다.

```
$ cat headers.txt
# Regular Expressions
## Subexpression calls
## The dot meta character

$ sed ##### add your solution here
regular-expressions
subexpression-calls
the-dot-meta-character
```

3) para.txt 를 사용하여 길이 5의 전체 단어가 포함된 줄이 있는 5.txt 파일과 길이 7의 전체 단어가 포함된 줄이 있는 7.txt 파일을 만듭니다.

```
$ sed ##### add your solution here

$ cat five.txt
good start
Start working on that
hi there
start and try to

$ cat seven.txt
Start working on that
project you always wanted
```

4) 주어진 샘플 문자열에는 필드가 로 구분되어 있으며 필드 값도 비어 있을 수 있습니다. sed를 사용하여 세 번째 필드를 42 로 바꿉니다.

```
$ echo 'lion,,ant,road,neon' | sed ##### add your solution here
lion,,42,road,neon

$ echo ',,,' | sed ##### add your solution here
,,42,
```

5) 처음 두 개를 제외한 모든 e를 3으로 바꿉니다.

```
$ echo 'asset sets tests site' | sed ##### add your solution here
asset sets t3sts sit3

$ echo 'sample item teem eel' | sed ##### add your solution here
sample item t33m 33l
```

6) 입력 파일 addr.txt의 경우 모든 입력 줄을 해당 줄의 문자 수로 바꿉니다. wc -L은 아래와 같이 줄의 길이를 구하는 방법 중 하나입니다. 입력 파일에 작은따옴표 또는 큰따옴표가 없다고 가정합니다.

```
# note that newline character isn't counted, which is preferable here
$ echo "Hello World" | wc -L
11

$ sed ##### add your solution here
11
11
17
14
5
13
```

7) 입력 파일 para.txt의 경우 항상 4의 배수인 줄이 있다고 가정합니다. 패턴 공간에 한 번에 4줄이 있도록 sed 명령을 사용합니다. 그런 다음 시작이 한 줄의 시작 부분에만 일치하는 경우 시작부터 끝까지 삭제합니다. 또한 이 두 키워드는 대소문자를 구분하지 않고 일치시킵니다.

```
$ sed ##### add your solution here
good start

hi there

bye
```

8) 입력 파일 패턴.txt의 경우 마지막 두 번째 ar을 X로 바꿉니다. 수정된 줄만 표시합니다.

```
$ sed ##### add your solution here
par car tX far Cart
pXt cart mart
```

9) sample.txt에서 이 두 조건을 모두 충족하는 줄을 표시합니다:
그는 대소문자에 관계없이 일치시켰습니다
월드 또는 하이 모두 대소문자를 민감하게 일치시켰습니다.

```
$ sed ##### add your solution here
Hello World
Hi there
```

10) 입력 파일 패턴.txt의 경우 최소 4자 이상의 모든 16진수 시퀀스를 [] 로 묶습니다. 선택적 접두사로 0x를 일치시키되 길이를 결정할 때 계산해서는 안 됩니다. 대소문자를 구분하지 않고 일치시키며, 시퀀스가 다른 단어 문자로 둘러싸여서는 안 됩니다. 수정된 줄만 표시합니다.

```
$ sed ##### add your solution here
"should not match [0XdeadBEEF]"
Hi42Bye nice1423 [bad42]
took 0xbad 22 [0x0ff1ce]
eqn2 = pressure*3+42/5-[14256]
```



# Shell substitutions
지금까지 sed 명령은 정적으로 구성되었습니다. 모든 세부 사항은 이미 알고 있었습니다. 예를 들어, 작업할 줄 번호, 검색 REGEXP , 대체 문자열 등이 있습니다. 자동화 및 스크립팅의 경우 사용자 입력, 파일 내용 등에 따라 동적으로 명령을 구성해야 하는 경우가 많습니다. 그리고 때로는 대체 문자열의 일부로 셸 명령의 출력이 필요할 때도 있습니다. 이 장에서는 셸 변수와 명령 출력을 통합하여 sed 명령을 동적으로 구성하는 방법에 대해 설명합니다. 앞서 언급했듯이 이 책에서는 GNU bash를 사용하는 셸로 가정합니다.

예를 들어, 명령이 동적으로 구성되는 실용적인 셸 스크립트에 대한 도움말은 제 도구인 ch: 명령 도움말을 참조하세요.

example_files 디렉터리에는 예제에서 사용된 모든 파일이 있습니다.


## Variable substitution
명령줄에 입력한 문자는 실행되기 전에 셸에서 먼저 해석됩니다. 파일 이름에 와일드카드가 일치하는지, 파이프 및 리디렉션이 설정되는지, 큰따옴표가 보간되는지 등을 확인합니다. 일부 사용 사례의 경우 sed 명령에 전달되는 스크립트에 작은따옴표 대신 큰따옴표를 사용하는 것이 더 쉽습니다. 이렇게 하면 셸 변수가 해당 값으로 대체됩니다.

울지 참조: 따옴표 및 unix.stackexchange를 참조하세요: 내 셸 스크립트가 공백이나 기타 특수 문자에 막히는 이유는 무엇인가요? bash의 다양한 인용 메커니즘과 인용이 필요한 경우에 대한 자세한 내용은 다음을 참조하세요.

아래 예제에서는 시작 및 끝 숫자 주소 값이 셸 변수를 통해 제공됩니다. 이러한 경우 전체 스크립트를 큰따옴표로 묶어 안전하게 보호할 수 있습니다.

```
$ start=6; step=1
$ sed -n "${start},+${step}p" rhymes.txt
There are so many delights to cherish
Apple, Banana and Cherry

$ step=3
$ sed -n "${start},+${step}p" rhymes.txt
There are so many delights to cherish
Apple, Banana and Cherry
Bread, Butter and Jelly
Try them all before you perish
```

그러나 셸 변수에 숫자 대신 일반 문자열을 포함할 수 있는 경우 필요한 경우에만 큰따옴표를 사용하는 것이 좋습니다. 그렇지 않으면 큰따옴표로 인해 sed 명령의 일부인 일반 문자가 보간될 수 있습니다. Bash 셸에서는 따옴표로 묶지 않은 문자열, 작은따옴표로 묶은 문자열 및 큰따옴표로 묶은 문자열을 나란히 배치하여 연결할 수 있습니다.

```
# ! is special within double quotes
# !d got expanded to 'date -Is' from my history and hence the error
$ word='at'
$ printf 'sea\neat\ndrop\n' | sed "/${word}/!d"
printf 'sea\neat\ndrop\n' | sed "/${word}/date -Is"
sed: -e expression #1, char 6: extra characters after command

# use double quotes only for the variable substitution
# and single quotes for everything else
# the command is concatenation of '/' and "${word}" and '/!d'
$ printf 'sea\neat\ndrop\n' | sed '/'"${word}"'/!d'
eat
```

작은따옴표와 큰따옴표로 적절하게 구분한 후에는 동적 명령을 견고하게 구성하기 위해 몇 가지 사항을 더 처리해야 합니다. 먼저 셸 변수가 검색 및 치환 연산에 사용되는 구분 기호와의 충돌을 피하기 위해 적절하게 사전 처리되었는지 확인해야 합니다.

울지 참조: 아래 예제에서 사용된 Bash 기능에 대한 자세한 내용은 매개변수 확장을 참조하세요.

```
# error because '/' inside HOME value conflicts with '/' as the delimiter
$ echo 'home path is:' | sed 's/$/ '"${HOME}"'/'
sed: -e expression #1, char 7: unknown option to `s'
# using a different delimiter will help in this particular case
$ echo 'home path is:' | sed 's|$| '"${HOME}"'|'
home path is: /home/learnbyexample

# but you may not have the luxury of choosing a delimiter
# in such cases, escape all delimiter characters before variable substitution
$ home=${HOME//\//\\/}
$ echo 'home path is:' | sed 's/$/ '"${home}"'/'
home path is: /home/learnbyexample
```

변수 값을 사용자 입력과 같은 외부 소스에서 가져오는 경우 보안에 대해서도 신경 써야 합니다. 자세한 내용은 셸 대체를 사용할 때 보안 고려 사항을 참조하세요.


## Escaping metacharacters
다음으로 셸 변수가 검색 또는 대체 문자열로 사용되는지 여부에 따라 모든 메타문자를 올바르게 이스케이프 처리해야 합니다. 이는 변수의 내용을 문자 그대로 처리해야 하는 경우에만 필요합니다. 다음은 하나의 메타문자에서 발생하는 문제를 설명하는 예제입니다.

```
$ c='&'
# & backreferences the entire matched portion
$ echo 'a and b and c' | sed 's/and/['"${c}"']/g'
a [and] b [and] c

# escape all occurrences of & to insert it literally
$ c1=${c//&/\\&}
$ echo 'a and b and c' | sed 's/and/['"${c1}"']/g'
a [&] b [&] c
```

일반적으로 대체 섹션에 사용되는 변수의 경우 \ , & 및 구분 기호를 이스케이프 처리해야 합니다. 검색 섹션의 경우 이스케이프 처리할 문자는 BRE 또는 ERE를 사용하는지 여부에 따라 달라집니다.

```
# replacement string
$ r='a/b&c\d'
$ r=$(printf '%s' "$r" | sed 's#[\&/]#\\&#g')

# ERE version for search string
$ s='{[(\ta^b/d).*+?^$|]}'
$ s=$(printf '%s' "$s" | sed 's#[{[()^$*?+.\|/]#\\&#g')
$ echo 'f*{[(\ta^b/d).*+?^$|]} - 3' | sed -E 's/'"$s"'/'"$r"'/g'
f*a/b&c\d - 3

# BRE version for search string
$ s='{[(\ta^b/d).*+?^$|]}'
$ s=$(printf '%s' "$s" | sed 's#[[^$*.\/]#\\&#g')
$ echo 'f*{[(\ta^b/d).*+?^$|]} - 3' | sed 's/'"$s"'/'"$r"'/g'
f*a/b&c\d - 3
```

메타문자 이스케이프에 대한 자세한 분석은 이 Q&A 스레드를 참조하세요:
unix.stackexchange: sed 치환으로 보간된 문자열이 모든 메타문자를 대문자로 바꾸도록 하는 방법 - 또한 치환 문자열에서 리터럴 개행 이스케이프하는 방법
stackoverflow를 보여줍니다: 정규식 메타문자를 안정적으로 이스케이프 처리할 수 있나요
unix.stackexchange: 스크립트에서 sed를 사용할 때 어떤 문자를 이스케이프해야 하나요?

울지 참조: 백틱보다 $()가 선호되는 이유는 무엇인가요?


## Command substitution
이 섹션에서는 셸 명령의 출력을 sed 스크립트의 일부로 사용하는 예제를 보여줍니다. 앞서 살펴본 모든 주의 사항이 여기에도 적용됩니다.

```
# note that the trailing newline character of the command output gets stripped
$ echo 'today is date.' | sed 's/date/'"$(date -I)"'/'
today is 2023-05-30.

# in some cases, changing the delimiter alone is enough
$ printf 'f1.txt\nf2.txt\n' | sed 's|^|'"$(pwd)"'/|'
/home/learnbyexample/f1.txt
/home/learnbyexample/f2.txt

# for a robust solution, always preprocess the command output
$ p=$(pwd | sed 's|/|\\/|g')
$ printf 'f1.txt\nf2.txt\n' | sed 's/^/'"${p}"'\//'
/home/learnbyexample/f1.txt
/home/learnbyexample/f2.txt
```

대체 명령은 이스케이프 처리되지 않는 한 대체 섹션에서 리터럴 개행이 허용되지 않으므로 여러 줄 명령 출력은 이러한 방식으로 대체할 수 없습니다.

```
$ printf 'a\n[x]\nb\n' | sed 's/x/'"$(seq 3)"'/'
sed: -e expression #1, char 5: unterminated `s' command
# prefix literal newlines with \ except the last newline
$ printf 'a\n[x]\nb\n' | sed 's/x/'"$(seq 3 | sed '$!s/$/\\/' )"'/'
a
[1
3]
b
```


## Cheatsheet and summary
Note Description
sed -n "${start},+${step}p" dynamically constructed sed command
start and step are shell variables
their values gets substituted before sed is executed
sed "/${word}/!d" entire command in double quotes is risky
within double quotes, $ , \ , ! and ` are special
sed '/'"${word}"'/!d' use double quotes only where needed
and variable contents have to be preprocessed to prevent
clashing with sed metacharacters and security issue
if you don’t control the variable contents
sed 's#[\&/]#\\&#g' escape metacharacters for replacement section
sed '$!s/$/\\/' escape literal newlines for replacement section
sed 's#[{[()^$*?+.\|/]#\\&#g' escape metacharacters for search section, ERE
sed 's#[[^$*.\/]#\\&#g' escape metacharacters for search section, BRE
sed 's/date/'"$(date -I)"'/' example for command substitution
command output’s final newline character gets stripped
other literal newlines, if any, have to be escaped

이 장에서는 sed 명령을 동적으로 구성하는 몇 가지 방법을 다루었습니다. 소프트웨어 프로그래밍의 대부분의 경우와 마찬가지로 90%의 경우는 비교적 쉽게 달성할 수 있습니다. 하지만 나머지 10%는 상당히 복잡해질 수 있습니다. 셸과 sed 메타문자 간의 충돌을 처리하는 것은 매우 복잡하며, 심지어 복잡성을 줄이기 위해 perl과 같은 대안을 찾는 것이 좋습니다. 다음 장에서는 몇 가지 명령줄 옵션을 더 다루겠습니다.


## Exercises
1) expr#을 usr_ip 셸 변수의 값으로 바꿉니다. 이 변수는 아래 샘플과 같이 메타문자만 포함할 수 있다고 가정합니다.

```
$ usr_ip='c = (a/b) && (x-5)'
$ mod_ip=$(echo "$usr_ip" | sed ##### add your solution here)
$ echo 'Expression: #expr#' | sed ##### add your solution here
Expression: c = (a/b) && (x-5)
```

2) 이전 연습을 반복하되 이번에는 임시 변수를 사용하는 대신 명령 대체를 사용합니다.

```
$ usr_ip='c = (a/b/y) && (x-5)'
$ echo 'Expression: #expr#' | sed ##### add your solution here
Expression: c = (a/b/y) && (x-5)
```





# z, s and f command line options
이 장에서는 -z , -s 및 -f 명령줄 옵션에 대해 설명합니다. 이러한 옵션은 특정 사용 사례에 유용합니다. 예를 들어 -z 옵션은 ASCII NUL 문자로 구분된 입력을 처리하는 데 도움이 되며 -f 옵션은 파일에서 sed 명령을 전달할 수 있습니다.

example_files 디렉터리에는 예제에서 사용된 모든 파일이 있습니다.


## NUL separated lines
z 옵션을 사용하면 줄 바꿈 문자 대신 ASCII NUL 문자를 기준으로 줄을 구분합니다. 줄 바꿈 기반 처리와 마찬가지로 NUL 문자가 입력 줄에서 제거되고(있는 경우) 출력 줄이 인쇄될 때 그에 따라 다시 추가됩니다.

파일 이름에 NUL 문자를 사용할 수 없기 때문에 NUL 구분은 파일 이름을 구분하는 데 매우 유용합니다. 예를 들어 grep -Z와 find -print0은 NUL로 구분된 파일 이름을 출력하는 반면, grep -z와 xargs -0은 NUL로 구분된 입력을 허용합니다.

```
$ printf 'earn xerox\0at\nmare\npart\0learn eye\n' | sed -nz '/are/p'
at
mare
part

# \0 at end of the output depends on the input having the \0 character
$ printf 'earn xerox\0at\nmare\npart\0learn eye\n' | sed -nz '/are/p' | od -c
0000000 a t \n m a r e \n p a r t \0
0000015
$ printf 'earn xerox\0at\nmare\npart\0learn eye\n' | sed -nz '/eye/p' | od -c
0000000 l e a r n e y e \n
0000012
```

입력에 NUL 문자가 없는 경우 -z 옵션을 사용하면 전체 입력을 단일 문자열로 처리하는 데 편리합니다. 출력에도 NUL 문자가 없습니다(출력에 항상 줄 구분자를 추가하는 GNU grep과 달리). 이 방법은 사용 가능한 컴퓨터 메모리에 맞을 정도로 작은 파일에만 효과적입니다. 또한 일부 패턴은 데이터 크기에 따라 기하급수적인 관계를 갖기 때문에 정규식에 따라 달라질 수 있습니다.

```
# add ; to the previous line if the current line starts with c
$ printf 'cater\ndog\ncoat\ncutter\nmat\n' | sed -z 's/\nc/;&/g'
cater
dog;
coat;
cutter
mat
```

더 많은 예제는 블로그 게시물 여러 줄 고정 문자열 검색 및 바꾸기를 참조하세요.


## Separate files
s 옵션을 사용하면 sed가 여러 입력 파일을 하나의 연결된 입력으로 처리하는 대신 개별적으로 처리합니다. 이 옵션은 각 입력 파일에 효과적인 줄 번호 주소 지정이 필요한 경우에 유용합니다. i 옵션이 활성화되어 있으면 -s도 암시됩니다.

```
# without -s, there is only one first line for the concatenated contents
# F command inserts filename of the current file at the given address
$ sed '1F' greeting.txt ip.txt
greeting.txt
Hi there
Have a nice day
	* sky
	* apple

# with -s, each file has its own address
# this is like the 'cat' command but including the filename as the header
$ sed -s '1F' greeting.txt ip.txt
greeting.txt
Hi there
Have a nice day
ip.txt
	* sky
	* apple
```


## File as the source of sed commands
sed 명령이 명령줄에 잘 맞지 않는 경우 명령을 파일에 넣고 -f 옵션을 사용하여 해당 파일을 실행할 명령의 소스로 지정할 수 있습니다. 이 방법은 다음과 같은 이점도 제공합니다:

리터럴 개행은 명령을 구분하는 데 사용할 수 있으며 작은따옴표는 더 이상 셸 메타문자와 충돌하지 않으므로 자유롭게 사용할 수 있습니다.
주석은 # 문자 뒤에 지정할 수 있습니다.
sed 매뉴얼을 참조하세요: 주석 사용에 대한 자세한 내용은 자주 사용하는 명령을 참조하세요.

다음 입력 파일과 일반 텍스트 파일에 저장된 sed 스크립트를 예로 들어 보겠습니다.

```
$ cat sample.txt
Hi there
cats and dogs running around
Have a nice day

# sed script saved in a file
$ cat word_mapping.sed
# word mappings
s/cat/Cat/g
s/dog/Dog/g
s/Hi/Hey/g
# appending another line
/there|running/ s/$/\n----------/
```

문자로 시작하는 두 줄은 주석 줄입니다. 다른 프로그래밍 언어와 마찬가지로 필요한 경우 명령줄 끝에 주석을 추가할 수도 있습니다. 파일의 내용을 sed 명령으로 전달하려면 -f 옵션을 사용합니다. n , -z , -E 등과 같은 다른 명령줄 옵션은 지금까지 해온 것처럼 sed 호출과 함께 언급해야 합니다.

```
# the first 3 substitutions will work
# but not the last one, as | is not a BRE metacharacter
$ sed -f word_mapping.sed sample.txt
Hey there
Cats and Dogs running around
Have a nice day

# | now works as ERE is enabled using the -E option
$ sed -E -f word_mapping.sed sample.txt
Hey there
----------
Cats and Dogs running around
----------
Have a nice day
```

실행 가능한 Bash나 Perl 또는 Python 스크립트를 만드는 것과 유사하게, sed 스크립트 파일에 shebang(자세한 내용은 위키백과: shebang 참조) 줄을 추가할 수 있습니다.

```
# to get the full path of the command
$ type sed
sed is /usr/local/bin/sed

# sed script with shebang, note the use of -f after the command path
$ cat executable.sed
#!/usr/local/bin/sed -f
s/cats\|dogs/'&'/g

# add execute permission to the script
$ chmod +x executable.sed

# executing the script
$ ./executable.sed sample.txt
Hi there
'cats' and 'dogs' running around
Have a nice day
```

n , -z , -E 등과 같은 다른 명령줄 옵션을 추가하는 것은 여러 가지 요인에 따라 달라집니다. 자세한 내용은 스택오버플로우: 셰방과 함께 옵션 사용법을 참조하세요.

sed 매뉴얼도 참조하세요: sed로 작성된 몇 가지 샘플 스크립트 및 소코반 게임.


## Cheatsheet and summary
Note Description
-z change the line separator from newline to the ASCII NUL character
grep -Z and find -print0 are examples for NUL separated data
-z is also useful to process the entire input as single string if it doesn’t
contain NUL characters, assuming small enough input file to fit memory
-s separate addressing for multiple file inputs
-s is implied if -i is active
-f supply commands from a file
literal newline can be used to separate the commands
single quotes can be freely used
comments can be specified after the # character
F command to insert the input filename at the given address

이 장에서는 특정 상황에 유용한 세 가지 명령줄 옵션을 다루었습니다. 또한 파이프라인이나 셸 스크립트에서 다른 명령어와 함께 솔루션의 일부로 사용되는 몇 가지 예도 살펴보았습니다. 다음 장에서는 좀 더 전문적인 명령어를 배우게 됩니다.


## Exercises
연습 문제 디렉터리에는 이 섹션에서 사용된 모든 파일이 있습니다.

1) 아래에 표시된 샘플 파일 이름에서 단어와 . 문자 이외의 문자를 _ 문자로 바꿉니다.

```
$ mkdir test_dir && cd $_
$ touch 'file with spaces.txt' $'weird$ch\nars.txt' '!f@oo.txt'
# > at start of line indicates continuation of multiline shell command
$ for file in *; do
> new_name=$(printf '%s' "$file" | sed ##### add your solution here)
> mv "$file" "$new_name"
> done

$ ls
file_with_spaces.txt _f_oo.txt weird_ch_ars.txt
$ cd .. && rm -r test_dir
```

2) 다음 입력 파일에서 세 번째 줄(있는 경우)만 인쇄합니다: addr.txt , para.txt 및 copyright.txt

```
$ sed ##### add your solution here
This game is good
project you always wanted
bla bla bla
```

3) 입력 파일 hex.txt 의 경우 replace.txt 의 콘텐츠를 사용하여 검색 및 바꾸기 작업을 수행합니다. replace.txt의 각 줄은 검색어로 시작한 다음 공백이 있고 그 뒤에 바꾸기 용어가 있습니다. 이러한 용어에는 sed 메타문자가 포함되어 있지 않다고 가정합니다.

```
$ cat hex.txt
start address: 0xA0, func1 address: 0xA0
end address: 0xFF, func2 address: 0xB0
$ cat replace.txt
0xA0 0x5000
0xB0 0x6000
0xFF 0x7000

##### add your solution here
start address: 0x5000, func1 address: 0x5000
end address: 0x7000, func2 address: 0x6000
```

4) 입력 파일 nul_separated의 경우 줄 구분 기호로 ASCII NUL 문자를 사용하고 그림이 포함된 줄을 표시합니다. 또한 출력의 NUL 문자를 줄 바꿈 문자로 변경합니다.

```
$ sed ##### add your solution here
apple
fig
mango
icecream
```

5) 입력 파일 addr.txt의 경우 대문자 앞에 오는 줄 바꿈 문자를 . 뒤에 오는 공백 문자로 변경합니다. 입력 파일에 ASCII NUL 문자가 없다고 가정합니다.

```
$ sed ##### add your solution here
Hello World. How are you. This game is good. Today is sunny
12345. You are funny
```




# append, change, insert
이 세 가지 명령은 이름에서 알 수 있듯이 특정 작업에 유용하게 사용할 수 있습니다. 대체 명령은 이러한 명령이 제공하는 대부분의 기능을 처리할 수 있습니다. 그러나 해당되는 경우 이러한 명령을 사용하는 것이 더 편리할 수 있습니다.

달리 명시되지 않는 한 다음 섹션에 언급된 규칙은 세 가지 명령어 모두에 유사하게 적용됩니다.

example_files 디렉터리에는 예제에서 사용된 모든 파일이 있습니다.


## Basic usage
대체 명령과 마찬가지로 이 세 가지 이름의 첫 글자는 sed 스크립트에서 명령을 나타냅니다.
a는 각 일치하는 주소의 줄 끝 뒤에 주어진 문자열을 추가합니다
c는 전체 일치하는 주소 내용을 주어진 문자열로 변경합니다
i는 각 일치하는 주소의 줄 시작 앞에 주어진 문자열을 삽입합니다.

이러한 명령의 문자열 값은 명령 문자 뒤에 입력합니다. 문자와 문자열 값 사이의 공백은 무시됩니다. 먼저 단일 주소를 한정자로 사용하는 몇 가지 예제입니다.

```
# same as: sed '2 s/$/\nhello/'
$ seq 3 | sed '2a hello'
1
2
hello

# same as: sed '/[24]/ s/.*/hello/'
$ seq 5 | sed '/[24]/c hello'
1
hello
3
hello
5

# same as: sed '2 s/^/hello\n/'
$ seq 3 | sed '2i hello'
1
hello
2
3
```

다음으로 주소 범위가 있는 몇 가지 예제입니다.

```
# append and insert is applied for each matching line in the address range
$ seq 5 | sed '2,4i hi there!'
1
hi there!
2
hi there!
3
hi there!
4
5

# change will replace the entire matching range with the given string
$ seq 5 | sed '2,4c hi there!'
1
hi there!
5

# to change every matching line, use the substitute command instead
$ seq 5 | sed '2,4 s/.*/hi there!/'
1
hi there!
hi there!
hi there!
5
```


## Escape sequences
대체 명령의 대체 문자열과 유사하게 \t, \n과 같은 이스케이프 시퀀스, \xNN과 같은 형식을 사용할 수 있습니다.

```
$ seq 3 | sed '2c rat\tdog\nwolf'
1
rat 	dog
wolf
3
$ seq 3 | sed '2a fruit: \x27mango\x27'
1
2
fruit: 'mango'
3
```

앞서 언급했듯이 명령어와 문자열 사이의 공백은 무시됩니다. 이를 방지하려면 명령 문자 뒤에 \를 사용하면 됩니다.

```
$ seq 3 | sed '2c hello'
1
hello
3

$ seq 3 | sed '2c\ hello'
1
	hello
3
```

는 명령 문자 바로 뒤에 사용하면 다른 의미가 있으므로 문자열 시작 부분에 일반 이스케이프 시퀀스가 있는 경우 추가로 \를 사용하세요.

```
$ seq 3 | sed '2c\nhi'
1
nhi
3

$ seq 3 | sed '2c\\nhi'
1

hi
3
```

스택 오버플로: 마지막 입력 줄에 개행 문자가 없는 경우 개행 문자를 추가하는 방법도 참조하세요.



## Multiple commands
세 명령은 모두 명령 문자 뒤에 오는 모든 것을 문자열 인수로 취급합니다. 따라서 명령 구분 기호로 ; 또는 #을 사용하여 주석을 시작할 수 없습니다. 를 사용하여 {}로 명령을 그룹화하더라도 -e 옵션이나 리터럴 개행 문자를 사용하여 닫는 }를 구분하지 않으면 실패합니다.

```
# 'hi ; 3a bye' will treated as a single string argument
$ seq 4 | sed '2c hi ; 3a bye'
1
hi ; 3a bye
3
4

# } gets treated as part of the argument for append, hence the error
$ seq 3 | sed '2{s/^/*/; a hi}'
sed: -e expression #1, char 0: unmatched `{'

# use -e or literal newline to separate the commands
$ seq 4 | sed -e '2c hi' -e '3a bye'
1
hi
3
bye
4
$ seq 3 | sed '2{s/^/*/; a hi
> }'
1
*2
hi
3
```


## Shell substitution
이 장에서는 셸 대체에 대한 더 많은 예시를 소개하고 잠재적인 함정에 대해 경고하기 위해 이 섹션을 포함했습니다.

```
# variable substitution
$ text='good\tone\nfood\tpun'
$ seq 13 15 | sed '2c'"$text"
good one
food pun
13

# command substitution
$ seq 13 15 | sed '3i'"$(date +%A)"
13
14
Wednesday
15
```

대체된 문자열에 리터럴 개행이 있으면 내용에 따라 오류가 발생할 수 있습니다. 아래 표시된 동작을 방지하려면 명령 대체 섹션에 설명된 대로 명령 출력을 처리하세요.

```
$ seq 13 15 | sed '3i'"$(printf 'hi\n123')"
sed: -e expression #1, char 8: missing command

# here, the content after the newline gets executed as a command
# same as: sed -e '3i hi' -e 's/5/five/'
$ seq 13 15 | sed '3i'"$(printf 'hi\ns/5/five/')"
13
14
hi
1five
```


## Cheatsheet and summary
Note Description
a appends the given string after the end of line for each matching address
c changes the entire matching address contents to the given string
i inserts the given string before the start of line for each matching address
string value for these commands is supplied after the command letter
escape sequences like \t , \n , \xNN , etc can be used in the string value
any whitespace between command letter and the string value is ignored
unless \ is the first non-whitespace character after the command letter
so, you’ll need an extra \ if the string argument starts with an escape sequence
-e or literal newline is needed to separate any further commands

이 장에서는 특정 사용 사례에 대해 대체 명령과 유사하게 작동하는 세 가지 sed 명령에 대해 설명했습니다. 이러한 명령의 문자열 인수를 사용하면 이스케이프 시퀀스를 사용할 수 있습니다. 파일의 내용을 문자 그대로 삽입하려면 다음 장에서 다루는 명령을 사용하세요.


## Exercises
연습 문제 디렉터리에는 이 섹션에서 사용된 모든 파일이 있습니다.

1) 입력 파일 addr.txt 의 경우 세 번째 줄을 ----- 으로 둘러싸서 표시합니다.

```
$ sed ##### add your solution here
-----
This game is good
-----
```

2) 입력 파일 addr.txt의 경우 사용자가 포함된 줄부터 파일 끝까지의 모든 줄을 빈 줄로 바꾸고 그 뒤에 Have a nice day 를 입력합니다.

```
$ sed ##### add your solution here
Hello World

Have a nice day
```

3) 입력 파일 addr.txt 의 경우 짝수 줄을 --- 로 바꿉니다.

```
$ sed ##### add your solution here
Hello World
---
This game is good
---
12345
---
```





# Adding content from file
이전 장에서는 a , c 및 i 명령을 사용하여 일치하는 주소에 주어진 문자열을 추가, 변경 또는 삽입하는 방법에 대해 설명했습니다. 문자열 인수의 \는 sed 이스케이프 시퀀스 규칙에 따라 처리되며 리터럴 개행 문자는 허용되지 않습니다.

r 및 R 명령은 파일 콘텐츠를 소스 문자열로 사용하며, 항상 문자 그대로 처리되고 개행 문자를 포함할 수 있습니다. 따라서 이 두 명령은 텍스트를 문자 그대로 추가하는 강력한 방법을 제공합니다. 그러나 이러한 명령은 추가 기능만 제공합니다. 다른 sed 기능은 변경 및 삽입 변형을 구성하는 데 사용됩니다.

example_files 디렉터리에는 예제에서 사용된 모든 파일이 있습니다.


## Append entire file using r
r 명령은 파일 이름 인수를 받아들이고 지정된 파일의 전체 내용이 일치하는 각 줄 뒤에 추가됩니다.

```
$ cat ip.txt
	* sky
	* apple
$ cat fav_color.txt
deep red
yellow
reddish
brown

# space between r and filename is optional
# add entire content of 'ip.txt' after each line containing 'red'
$ sed '/red/r ip.txt' fav_color.txt
deep red
	* sky
	* apple
yellow
reddish
	* sky
	* apple
brown
```

지정된 파일명이 존재하지 않으면 sed는 자동으로 무시하고 파일이 비어 있는 것처럼 계속 진행합니다. 사용된 sed 명령에 다른 문제가 발생하지 않는 한 종료 상태는 0이 됩니다.

명령 출력을 입력 파일 소스로 사용하려면 /dev/stdin을 파일 이름으로 사용하면 됩니다. 그러나 /dev/stdin의 내용이 모두 소진되면 더 이상 데이터를 얻을 수 없습니다. 따라서 /dev/stdin을 사용하는 것이 항상 파일 이름을 제공하는 것과 기능적으로 동일한 것은 아닙니다. 예를 들어 cat ip.txt | sed '/red/r /dev/stdin' fav_color.txt의 출력을 sed '/red/r ip.txt' fav_color.txt와 비교해 보세요. 따라서 일치하는 항목이 여러 개 있는 경우 먼저 명령 출력을 파일에 저장한 다음 해당 파일 이름에 /dev/stdin 대신 r을 사용합니다.

```
$ text='good\tone\nfood\tpun'
$ echo "$text" | sed '1r /dev/stdin' ip.txt
	* sky
good\tone\nfood\tpun
	* apple

# example for adding multiline command output
$ seq 2 | sed '2r /dev/stdin' ip.txt
	* sky
	* apple

# note that newline won't be added to the file content being read
$ printf '123' | sed '1r /dev/stdin' ip.txt
	* sky
123 	* apple
```

주소로 0을 사용하여 첫 줄 앞에 파일 내용을 삽입할 수 있습니다. 이 기능은 GNU sed 4.9에서 r 명령에 추가되었습니다.

```
$ sed '0r ip.txt' greeting.txt
	* sky
	* apple
Hi there
Have a nice day
```

다음은 변경 명령 기능을 에뮬레이트하는 몇 가지 예입니다. 이전 장에서 보았듯이 여러 명령이 필요한 경우 -e 옵션 또는 리터럴 개행을 사용합니다. unix.stackexchange도 참조하세요: 파일1의 M 줄을 파일2의 N 줄로 바꾸는 다양한 방법.

```
# replace only the 2nd line
# order is important, first 'r' and then 'd'
# note the use of command grouping to avoid repeating the address
$ items=' * blue\n * green\n'
$ printf '%b' "$items" | sed -e '2 {r /dev/stdin' -e 'd}' ip.txt
	* sky
	* blue
	* green

# replace range of lines
# command grouping will add file contents for each matching line
# so, use 'r' only for one of the addresses and then delete the range
# // here avoids address duplication
# same as: sed -e '/^red/r ip.txt' -e '/yellow/,//d' fav_color.txt
$ sed -e '/yellow/r ip.txt' -e '//,/^red/d' fav_color.txt
deep red
	* sky
	* apple
brown
```

매뉴얼에서 인용합니다:

빈 정규식 //은 마지막 정규식 일치를 반복합니다(빈 정규식이 s 명령에 전달된 경우에도 마찬가지입니다). 정규식에 대한 수정자는 정규식이 컴파일될 때 평가되므로 빈 정규식과 함께 지정하는 것은 유효하지 않습니다.

r 명령으로 삽입 명령 기능을 에뮬레이트하려면 이 책에서 다루지 않는 고급 sed 사용법이 필요합니다. 예제는 일치하는 줄 앞에 파일 내용 삽입하기를 참조하세요. 대신 다음 섹션에서는 이러한 목적으로 e 플래그를 사용하는 방법을 보여 드리겠습니다.


## Insert file using e and cat
매뉴얼에는 전자 플래그를 위한 유용한 메모가 있습니다:

r 명령은 명령의 출력이 즉시 인쇄되는 반면, r 명령은 출력이 현재 주기가 끝날 때까지 지연된다는 점에 유의하세요.

따라서 e 플래그를 사용하면 일치하는 줄 앞에 파일 콘텐츠를 삽입하는 가장 쉬운 방법이 됩니다. r 명령과 마찬가지로 외부 명령의 출력이 문자 그대로 삽입됩니다. 하지만 r 명령과 다른 점은 외부 cat 명령에 전달된 파일 이름이 존재하지 않는 경우 해당 오류 메시지가 삽입된다는 점입니다.

```
$ sed '/red/e cat ip.txt' fav_color.txt
	* sky
	* apple
deep red
yellow
	* sky
	* apple
reddish
brown
```


## Append line by line using R
R 명령은 r 명령과 매우 유사합니다. 하지만 R은 전체 파일 내용을 읽는 대신 주소가 일치하는 경우 소스 파일에서 한 번에 한 줄씩 읽습니다. 전체 파일이 이미 사용되었고 다른 일치 항목이 발견되면 sed는 다음 읽을 줄이 비어 있는 것처럼 계속 진행합니다.

```
$ sed '/red/R ip.txt' fav_color.txt
deep red
	* sky
yellow
reddish
	* apple
brown

# interleave contents of two files
$ seq 4 | sed 'R /dev/stdin' fav_color.txt
deep red
1
yellow
2
reddish
3
brown
4
```

스택 오버플로우도 참조하세요: 처음 몇 줄을 다른 파일의 처음 몇 줄로 바꿉니다.


## Cheatsheet and summary
Note Description
r filename entire file content is added after each matching line
e cat filename entire file content is added before each matching line
R filename add one line at a time after each matching line
space between the command and the filename is optional
/dev/stdin as the filename will use stdin data
content is added literally, unlike a , c and i commands

이 장에서는 파일이나 명령어 출력에서 문자 그대로 텍스트를 추가하는 강력한 솔루션을 보여드렸습니다. 특히 키워드가 포함된 줄을 다른 곳의 텍스트로 대체하는 템플릿 솔루션에 유용합니다. 다음 장에서는 분기 명령을 사용하여 제어 구조를 구현하는 방법을 배우게 됩니다.


## Exercises
연습 문제 디렉터리에는 이 섹션에서 사용된 모든 파일이 있습니다.

1) 입력 파일 addr.txt 의 경우 세 번째 줄부터 다섯 번째 줄까지를 para.txt 의 두 번째 줄부터 네 번째 줄로 바꿉니다.

```
$ sed ##### add your solution here
Hello World
How are you
Start working on that
project you always wanted
to, do not let it end
You are funny
```

2) copyright.txt 두 줄마다 hex.txt에서 한 줄씩 추가합니다.

```
$ sed ##### add your solution here
bla bla 2015 bla
blah 2018 blah
start address: 0xA0, func1 address: 0xA0
bla bla bla
copyright: 2019
end address: 0xFF, func2 address: 0xB0
```

3) 입력 파일 hex.txt의 모든 줄에 대해 줄 앞에 ---를 삽입하고 아래와 같이 replace.txt에서 한 줄을 추가합니다.

```
$ sed ##### add your solution here
---
start address: 0xA0, func1 address: 0xA0
0xA0 0x5000
---
end address: 0xFF, func2 address: 0xB0
0xB0 0x6000
```

4) 입력 파일 replace.txt의 0x6000과 일치하는 줄 앞에 hex.txt의 내용을 삽입합니다.

```
$ sed ##### add your solution here
0xA0 0x5000
start address: 0xA0, func1 address: 0xA0
end address: 0xFF, func2 address: 0xB0
0xB0 0x6000
0xFF 0x7000
```

5) 입력 파일 addr.txt 의 경우 are가 포함된 줄을 hex.txt 의 내용으로 바꿉니다.

```
$ sed ##### add your solution here
Hello World
start address: 0xA0, func1 address: 0xA0
end address: 0xFF, func2 address: 0xB0
This game is good
Today is sunny
12345
start address: 0xA0, func1 address: 0xA0
end address: 0xFF, func2 address: 0xB0
```

6) 아래에 표시된 두 명령은 동일합니다. 참 또는 거짓?

```
sed '/are/r pets.txt' addr.txt
cat pets.txt | sed '/are/r /dev/stdin' addr.txt
```

7) sed '0r file1' file2 및 sed '0R file1' file2 명령은 어떤 작업을 수행하나요?







# Control structures
sed는 제어 구조를 구성하기 위한 두 가지 유형의 분기 명령을 지원합니다. 이러한 명령(및 이 책에서 설명하지 않은 다른 고급 기능)을 사용하면 프로그래밍 언어에서 일반적으로 사용되는 다양한 기능을 에뮬레이션할 수 있습니다. 이 장에서는 기본적인 예제를 보여드리며 이후 장에서 더 많은 사용 사례를 찾을 수 있습니다.

catonmat도 참조하세요: 유닉스 유틸리티 sed가 튜링 완성형이라는 증거.

example_files 디렉터리에는 예제에서 사용된 모든 파일이 있습니다.


## Branch commands
명령 설명 b 레이블 무조건 지정된 레이블로 분기 b 나머지 명령 건너뛰고 다음 사이클 시작 t 레이블 대체 성공 시 지정된 레이블로 분기 t 대체 성공 시 나머지 명령 건너뛰고 다음 사이클 시작 t 레이블 대체 실패 시 지정된 레이블로 분기 t 대체 실패 시 나머지 명령 건너뛰고 다음 사이클 시작 t 대체 실패 시 나머지 명령 건너뛰고 다음 사이클 시작


레이블은 명령 앞에 :레이블을 붙여 지정하며, 여기서 레이블은 분기 명령으로 다른 곳에서 참조할 수 있는 이름입니다. t 명령의 경우 마지막 입력 줄을 읽은 이후 성공한 치환 또는 조건부 분기가 계산됩니다. 따라서 실패한 치환이 거의 없고 순서에 상관없이 치환이 한 번만 성공하면 분기가 수행될 수 있습니다. 마찬가지로 T 명령은 마지막 입력 줄을 읽은 이후 치환에 성공한 적이 없거나 조건부 분기인 경우에만 분기를 수행합니다.


## if-then-else
분기 명령은 if-then-else와 같은 제어 구조를 구성하는 데 사용할 수 있습니다. 예를 들어 숫자 열이 있는 입력 파일이 있고 양수를 음수로 또는 그 반대로 변경하는 작업이 필요하다고 가정해 보겠습니다. 줄이 - 문자로 시작하면 해당 줄을 삭제해야 합니다. 그렇지 않으면 양수를 음수로 변환하려면 줄의 시작 부분에 -를 삽입해야 합니다. 아래 그림과 같이 b와 t 명령을 모두 사용할 수 있습니다.

```
$ cat nums.txt
3.14
-20000
-51
4567

# empty REGEXP section will reuse last REGEXP match, in this case /^-/
# also note the use of ; after {} command grouping
# 2nd substitute command will execute only if a line doesn't start with -
$ sed '/^-/{s///; b}; s/^/-/' nums.txt
-3.14
20000
-4567

# t command will come into play only if the 1st substitute command succeeds
# in which case the 2nd substitute command won't be executed
$ sed '/^-/ s///; t; s/^/-/' nums.txt
-3.14
20000
-4567
```

T 명령은 마지막 입력을 읽었거나 조건부 분기를 수행한 이후 성공적인 치환이 없는 경우에만 분기됩니다. 즉, T 분기 이후의 명령은 적어도 한 번 이상 치환이 성공한 경우에만 실행됩니다.

```
# 2nd substitution will work only if the 1st one succeeds
# same as: sed '/o/{s//-/g; s/d/*/g}'
$ printf 'good\nbad\n' | sed 's/o/-/g; T; s/d/*/g'
g--*
bad

# append will work if any of the substitution succeeds
$ printf 'fig\ngood\nbad\nspeed\n' | sed 's/o/-/g; s/a/%/g; T; a ----'
fig
g--d
----
b%d
----
speed
```


## loop
레이블 인수 없이 분기 명령을 사용하면 sed는 스크립트의 나머지 부분을 건너뛰고 입력된 다음 줄부터 처리를 시작합니다. 레이블로 명령 위치를 표시하면 필요할 때 해당 특정 위치로 분기할 수 있습니다. 이러한 경우 sed는 여전히 현재 패턴 공간을 처리합니다.

아래 예는 줄의 시작부터 연속된 모든 숫자 문자를 * 문자로 대체합니다. :a는 대체 명령의 레이블을 a로 지정하고 대체 명령이 성공하면 ta가 이 레이블로 분기됩니다. 사실상 대체 조건이 충족되는 한 현재 줄을 대체하는 루핑 메커니즘이 작동합니다.

```
# same as: perl -pe 's/\G\d/*/g'
# first, * is matched 0 times followed by the digit 1
# next, * is matched 1 times followed by the digit 2
# then, * is matched 2 times followed by the digit 3
# and so on until the space character breaks the loop
$ echo '12345 hello42' | sed -E ':a s/^(\**)[0-9]/\1*/; ta'
***** hello42
# here, the x character breaks the loop
$ echo '123x45 hello42' | sed -E ':a s/^(\**)[0-9]/\1*/; ta'
***x45 hello42
# no change as the input didn't start with a number
$ echo 'hi 12345 hello42' | sed -E ':a s/^(\**)[0-9]/\1*/; ta'
hi 12345 hello42
```

디버깅 목적으로, 그리고 초보자가 이 명령을 더 잘 이해하는 데 도움이 되도록 루프를 언롤링하고 명령을 테스트하세요. 위의 예에서는 sed -E 's/^(*)[0-9]/\1/'에 이어 sed -E 's/^(*)[0-9]/\1/; s//\1*/' 등을 시도해 보세요.

와 레이블 사이의 공백은 선택 사항입니다. 마찬가지로 브랜치 명령과 대상 레이블 사이의 공백은 선택 사항입니다.

다음은 필드 처리에 대한 예제입니다. 필드 처리에는 awk와 perl이 더 적합하지만, 나머지 텍스트 처리는 이미 sed 에서 수행되고 있기 때문에 경우에 따라 sed 가 편리할 수 있습니다.

```
# replace space with underscore only for the 2nd column
# [^,]*, captures first column (comma is the field separator)
# [^ ,]* matches non-space and non-comma characters
# end of line or another comma will break the loop
$ echo 'he be me,1 2 3 4,nice slice' | sed -E ':b s/^([^,]*,[^ ,]*) /\1_/; tb'
he be me,1_2_3_4,nice slice
```

루핑 구조는 룩어라운드와 같이 sed에서 사용할 수 없는 특정 고급 정규식 기능을 에뮬레이션하는 데도 도움이 됩니다(룩어라운드에 대한 자세한 내용은 스택오버플로우: 정규식 FAQ 참조).

```
# replace empty fields with NA
# simple replacement won't work for the ,,, case
$ echo '1,,,two,,3' | sed 's/,,/,NA,/g'
1,NA,,two,NA,3
# looping to the rescue
$ echo '1,,,two,,3' | sed -E ':c s/,,/,NA,/g; tc'
1,NA,NA,two,NA,3
```

더 많은 예제는 제 블로그 게시물 GNU sed에서 정규식 룩어라운드 에뮬레이션을 참조하세요.

아래 예제는 이전 예제와 비슷한 해결 방법을 가지고 있지만 문제 문장이 달라서 우회로를 사용하여 해결할 수 없습니다. 여기서 치환을 수행하면 검색 패턴과 다시 일치하는 문자열이 출력됩니다.

```
# deleting 'fin' results in 'cofing' which can again match 'fin'
$ echo 'coffining' | sed 's/fin//'
cofing
# add more s commands if the number of times to substitute is known
$ echo 'coffining' | sed 's/fin//; s///'
cog
# use loop when the count isn't known
$ echo 'coffining' | sed ':d s/fin//; td'
cog
```


## Cheatsheet and summary
Note Description
b label unconditionally branch to the specified label
b skip rest of the commands and start next cycle
t label branch to the specified label on successful substitution
t on successful substitution, skip rest of the commands and start next cycle
T label branch to the specified label if substitution fails
T if substitution fails, skip rest of the commands and start next cycle

이 장에서는 if-else 및 루프와 같은 프로그래밍 기능을 에뮬레이션하는 데 사용할 수 있는 분기 명령을 소개했습니다. 이러한 명령은 특히 sed 의 필터링 기능과 결합할 때 특정 경우에 유용합니다. 필터링 기능에 관해서는 다음 장에서 다양한 사용 사례에 주소 범위를 사용하는 데 중점을 두겠습니다.


## Exercises
연습 문제 디렉터리에는 이 섹션에서 사용된 모든 파일이 있습니다.

1) 입력 파일 para.txt 를 사용하여 시작 또는 끝이 포함된 모든 줄(대소문자 구분 없이 일치)이 있는 markers.txt라는 파일을 만들고 나머지 줄이 있는 rest.txt라는 파일을 만듭니다.

```
$ sed ##### add your solution here

$ cat markers.txt
good start
Start working on that
to, do not let it end
start and try to
finish the End

$ cat rest.txt
project you always wanted
hi there
bye
```

2) 입력 파일 addr.txt의 경우 :
한 줄에 e가 포함된 경우 연속적으로 반복되는 모든 문자를 {}로 묶고 해당 문자를 대문자로
그렇지 않으면, 한 줄에 u가 포함된 경우 해당 줄의 모든 대문자를 [] 로 묶습니다.

```
# note that H in the second line and Y in the last line aren't modified
$ sed ##### add your solution here
He{LL}o World
How are you
This game is g{OO}d
[T]oday is sunny
12345
You are fu{NN}y
```

3) nums.txt 파일은 공백 문자를 필드 구분 기호로 사용합니다. 일부 줄의 첫 번째 필드에는 - 문자로 구분된 숫자가 하나 이상 있습니다. 아래 그림과 같이 첫 번째 필드에서 이러한 숫자를 []로 둘러쌉니다.

```
$ cat nums.txt
123-87-593 42-3 fig
apple 42-42-42 1000 banana 4-3
53783-0913 hi 3 4-2
1000 guava mango

$ sed ##### add your solution here
[123]-[87]-[593] 42-3 fig
apple 42-42-42 1000 banana 4-3
[53783]-[0913] hi 3 4-2
[1000] guava mango
```

4) anchors.txt의 콘텐츠와 일치하도록 headers.txt의 콘텐츠를 변환합니다. 입력 파일 headers.txt에는 한 줄당 하나의 헤더가 포함되며, 하나 이상의 # 문자 액터로 시작하여 공백 문자가 오고 그 다음에 제목이 나옵니다. 이러한 헤더는 anchors.txt의 내용에 표시된 대로 앵커 태그로 변환해야 합니다. 출력을 out.txt 에 저장합니다.

```
$ cat headers.txt
# Regular Expressions
## Subexpression calls
## The dot meta character
$ cat anchors.txt
# <a name="regular-expressions"></a>Regular Expressions
## <a name="subexpression-calls"></a>Subexpression calls
## <a name="the-dot-meta-character"></a>The dot meta character

$ sed ##### add your solution here
$ diff -s out.txt anchors.txt
Files out.txt and anchors.txt are identical
```

5) t 명령과 T 명령의 차이점은 무엇인가요?

6) blocks.txt 파일은 %=%=를 사용하여 줄 그룹을 구분합니다. 첫 번째 그룹을 표시합니다.

```
$ cat blocks.txt
%=%=
apple
banana
%=%=
3.14
1000
%=%=
brown
green
%=%=
hi
hello there
bye

$ sed ##### add your solution here
%=%=
apple
banana
```




# Processing lines bounded by distinct markers
주소 범위는 이전 장에서 이미 소개했습니다. 이 장에서는 시작과 끝 패턴으로 정의된 줄 그룹을 처리해야 하는 다양한 사용 사례를 다룹니다. 일부 예제에서는 다른 텍스트 처리 명령을 사용하여 복잡한 sed 전용 솔루션에 비해 더 간단한 한 줄을 구성할 수도 있습니다.

example_files 디렉터리에는 예제에서 사용된 모든 파일이 있습니다.


## Uniform markers
이 섹션에서는 입력 파일에 항상 같은 수의 시작 패턴과 끝 패턴이 번갈아 가며 배열되어 있는 경우를 다룹니다. 예를 들어, 두 개의 시작 패턴 사이에 끝 패턴 없이 두 개의 시작 패턴이 나타날 수 없으며 그 반대의 경우도 마찬가지입니다. 이러한 그룹 내부와 그룹 사이의 텍스트 줄은 선택 사항입니다.

아래 표시된 샘플 파일은 이 섹션의 예시를 설명하는 데 사용됩니다. 간단하게 하기 위해 시작 패턴은 start로, 종료 패턴은 end로 표시되어 있다고 가정합니다. 또한 출력을 더 쉽게 분석할 수 있도록 그룹 번호도 지정했습니다.

```
$ cat uniform.txt
mango
icecream
--start 1--
1234
6789
**end 1**
how are you
have a nice day
--start 2--
a
b
c
**end 2**
par,far,mar,tar
```

사례 1: 마커 자체와 일치하는 줄을 포함하여 고유한 마커를 기준으로 모든 줄 그룹을 처리합니다. 간단하게 하기 위해 아래 명령은 이러한 모든 줄을 인쇄합니다. 이 사용 사례는 주소 범위 섹션에서도 이미 다루었습니다.

```
$ sed -n '/start/,/end/p' uniform.txt
--start 1--
1234
6789
**end 1**
--start 2--
a
b
c
**end 2**
```

사례 2: 모든 라인 그룹을 처리하되 마커 자체와 일치하는 라인은 제외합니다.

```
# recall that // represents the last REGEXP that was matched
$ sed -n '/start/,/end/{//! s/^/* /p}' uniform.txt
* 1234
* 6789
* a
* b
* c
```

사례 3: 모든 줄 그룹을 처리하되 끝 마커를 제외합니다.

```
$ sed -n '/start/,/end/{/end/!p}' uniform.txt
--start 1--
1234
6789
--start 2--
a
b
c
```

사례 4: 시작 마커를 제외한 모든 줄 그룹을 처리합니다.

```
$ sed -n '/start/,/end/{/start/!p}' uniform.txt
1234
6789
**end 1**
a
b
c
**end 2**
```

사례 5: 마커로 바인딩된 줄 그룹을 제외한 모든 입력 줄을 처리합니다.

```
$ sed '/start/,/end/d; s/$/./' uniform.txt
mango.
icecream.
how are you.
have a nice day.
par,far,mar,tar.
```

사례 6 마커 사이의 줄 그룹을 제외한 모든 입력 줄을 처리합니다.

```
$ sed '/start/,/end/{//!d}' uniform.txt
mango
icecream
--start 1--
**end 1**
how are you
have a nice day
--start 2--
**end 2**
par,far,mar,tar
```

사례 7: 사례 6과 유사하지만 시작 마커를 포함합니다.

```
$ sed '/start/,/end/{/start/!d}' uniform.txt
mango
icecream
--start 1--
how are you
have a nice day
--start 2--
par,far,mar,tar
```

케이스 8: 케이스 6과 유사하지만 엔딩 마커를 포함합니다.

```
$ sed '/start/,/end/{/end/!d}' uniform.txt
mango
icecream
**end 1**
how are you
have a nice day
**end 2**
par,far,mar,tar
```


## Extracting the first or last group
이 섹션의 예제에도 이전 섹션의 동일한 샘플 입력 파일이 사용됩니다. 작업은 마커로 정의된 첫 번째 또는 맨 마지막 줄 그룹만 추출하는 것입니다.

첫 번째 블록을 가져오려면 끝 표시가 일치할 때 q 명령을 적용하기만 하면 됩니다.

```
$ sed -n '/start/,/end/{p; /end/q}' uniform.txt
--start 1--
1234
6789
**end 1**

# use other tricks discussed in previous section as needed
$ sed -n '/start/,/end/{//!p; /end/q}' uniform.txt
1234
6789
```

마지막 블록을 얻으려면 입력을 선형으로 역순으로 하고 주소 범위의 순서를 변경한 다음 첫 번째 블록을 얻은 다음 다시 선형으로 역순으로 합니다.

```
$ tac uniform.txt | sed -n '/end/,/start/{p; /start/q}' | tac
--start 2--
a
b
c
**end 2**
```


## Broken groups
시작 마커와 끝 마커가 항상 한 쌍으로 균일하게 표시되지 않는 경우도 있습니다. 예를 들어 아래와 같이 여러 개의 경고 메시지와 오류 메시지가 뒤따르는 로그 파일을 생각해 보세요.

```
$ cat log.txt
foo baz 123
--> warning 1
a,b,c,d
42
--> warning 2
x,y,z
--> warning 3
4,3,1
==> error 1
hi bye
```

오류 줄을 종료 마커로 간주하면 시작 마커는 두 가지 기능 중 하나가 될 수 있습니다. 모든 경고 메시지를 가져오거나 오류 이전에 발생하는 마지막 경고 메시지만 가져옵니다.

```
$ sed -n '/warning/,/error/p' log.txt
--> warning 1
a,b,c,d
42
--> warning 2
x,y,z
--> warning 3
4,3,1
==> error 1

$ tac log.txt | sed -n '/error/,/warning/p' | tac
--> warning 3
4,3,1
==> error 1
```

시작 마커와 끝 마커가 모두 여러 번 나타날 수 있는 경우 awk 또는 perl이 더 적합합니다.



## Summary
이 장에서는 새로운 기능을 소개하기보다는 주소 범위 필터가 필요한 다양한 사용 사례를 다루었습니다. 그 중 일부는 솔루션을 더 간단하게 만들기 위해 다른 명령을 사용해야 했습니다. 다음 장에서는 sed를 사용할 때 발생할 수 있는 다양한 문제와 더 나은 성능을 얻기 위한 몇 가지 요령에 대해 설명합니다. 그 후에는 추가 자료가 있는 리소스 링크가 있는 또 다른 장이 있습니다. sed가 흥미롭고 유용한 학습 도구라는 것을 알게 되셨기를 바랍니다. 행복한 코딩이 되시길 바랍니다!


## Exercises
연습 문제 디렉터리에는 이 섹션에서 사용된 모든 파일이 있습니다.

1) blocks.txt 파일은 %=%=를 사용하여 줄 그룹을 구분합니다. 마지막 그룹을 표시합니다.

```
##### add your solution here
%=%=
hi
hello there
bye
```

2) code.txt 파일에는 %%Code: python%% 및 %%end%% 를 포함하는 전체 줄로 둘러싸인 코드 스니펫이 있습니다. 이러한 코드 조각의 끝에는 항상 빈 줄이 이어집니다. 마커 사이에는 항상 적어도 한 줄의 코드가 있다고 가정하세요. 이러한 코드 조각과 그 뒤에 오는 빈 줄을 모두 삭제하세요.

```
$ sed ##### add your solution here
H1: Introduction

REPL is a good way to learn Python for beginners.

H2: String methods

Python comes loaded with awesome methods.
Enjoy learning Python.
```

3) code.txt 파일에는 %%Code: python%% 및 %%end%% 를 포함하는 전체 줄로 둘러싸인 코드 스니펫이 있습니다. 이러한 마커 사이의 줄은 첫 번째 블록에 대해서만 표시합니다.

```
$ sed ##### add your solution here
>>> 3 + 7
10
>>> 22 / 7
3.142857142857143
>>> 22 // 7
3
```

4) 입력 파일 broken.txt의 경우 마커 위쪽과 아래쪽 사이에 줄을 표시합니다. 아래에 표시된 첫 번째 sed 명령은 두 번째 주소를 찾을 수 없을 때 파일 끝까지의 줄이 인쇄되기 때문에 작동하지 않습니다.

```
$ cat broken.txt
--top--
3.14
[bottom]
--top--
1234567890
[bottom]
--top--
Hi there
Have a nice day
Good bye

# wrong output
$ sed -n '/top/,/bottom/ {//!p}' broken.txt
3.14
1234567890
Hi there
Have a nice day
Good bye

# expected output
##### add your solution here
3.14
1234567890
```

5) 입력 파일 addr.txt 의 경우 마커 How 와 12345 사이에 있는 줄을 hex.txt 파일의 내용으로 바꿉니다.

```
$ sed ##### add your solution here
Hello World
How are you
start address: 0xA0, func1 address: 0xA0
end address: 0xFF, func2 address: 0xB0
12345
You are funny
```





# Gotchas and Tricks
이 장에서는 초보자가 자주 저지르는 실수, 코너 사례, 성능 향상을 위한 몇 가지 요령에 대해 설명합니다. 일부 예제는 이전 장에서 이미 다루었습니다.

example_files 디렉터리에는 예제에서 사용된 모든 파일이 있습니다.


## Shell quoting
셸 메타문자와의 충돌 가능성을 피하려면 명령줄에서 스크립트를 작은따옴표로 묶어야 합니다.

```
# space is a shell metacharacter, hence the error
$ echo 'a sunny day' | sed s/sunny day/cloudy day/
sed: -e expression #1, char 7: unterminated `s' command

# shell treats characters inside single quotes literally
$ echo 'a sunny day' | sed 's/sunny day/cloudy evening/'
a cloudy evening
```

반면에 초보자는 작은따옴표와 큰따옴표의 차이를 인식하지 못하고 작은따옴표 안에서 셸 치환이 작동할 것으로 기대하는 경우가 많습니다. 울레지를 참조하세요: 따옴표 및 unix.stackexchange를 참조하세요: 셸 스크립트가 공백이나 다른 특수 문자로 막히는 이유는 무엇인가요? 에서 다양한 인용 메커니즘에 대해 자세히 알아보세요.

```
# $USER won't get expanded within single quotes
$ echo 'User name: ' | sed 's/$/$USER/'
User name: $USER

# use double quotes for such cases
$ echo 'User name: ' | sed "s/$/$USER/"
User name: learnbyexample
```

셸 대체가 필요한 경우 전체 명령을 큰따옴표로 묶으면 sed와 bash 특수 문자 간의 충돌로 인해 문제가 발생할 수 있습니다. 따라서 명령에서 큰따옴표가 필요한 부분에만 큰따옴표를 사용하세요.

```
# ! is one of special shell characters within double quotes
$ word='at'
# !d got expanded to 'date -Is' from my history and hence the error
$ printf 'sea\neat\ndrop\n' | sed "/${word}/!d"
printf 'sea\neat\ndrop\n' | sed "/${word}/date -Is"
sed: -e expression #1, char 6: extra characters after command

# works correctly when only the required portion is double quoted
$ printf 'sea\neat\ndrop\n' | sed '/'"${word}"'/!d'
eat
```


## Escaping metacharacters
변수 또는 명령 대체를 적용할 때 발생하는 또 다른 문제는 대체된 문자열의 값과 sed 메타문자 간의 충돌입니다.

```
# variable being substituted cannot have the delimiter character
$ printf 'path\n' | sed 's/$/: '"$HOME"'/'
sed: -e expression #1, char 8: unknown option to `s'

# use a different delimiter that won't conflict with the variable value
$ printf 'path\n' | sed 's|$|: '"$HOME"'|'
path: /home/learnbyexample
```

하지만 셸 변수의 문자와 충돌하지 않는 구분 기호를 선택할 수 있는 사치가 없을 수도 있습니다. 또한 리터럴 검색 및 바꾸기의 경우 메타문자를 피하기 위해 변수 콘텐츠를 사전 처리해야 합니다. 이러한 경우에 대한 자세한 내용과 예제는 셸 대체 챕터를 참조하세요.


## Options at the end of the command
명령어 마지막에도 명령줄 옵션을 지정할 수 있습니다. 일부 옵션을 잊어버려 셸 기록에서 이전 명령을 편집하려는 경우에 유용합니다.

```
# no output, as + is not special with default BRE
$ printf 'boat\nsite\nfoot\n' | sed -n 's/[aeo]+t/(&)/p'

# pressing up arrow will bring up the last command from history
# then you can add the option needed at the end of the command
$ printf 'boat\nsite\nfoot\n' | sed -n 's/[aeo]+t/(&)/p' -E
b(oat)
f(oot)
```

따라서 파일 이름이 -로 시작하는 경우 이스케이프 처리하거나 --를 옵션으로 사용하여 더 이상 옵션이 사용되지 않음을 표시해야 합니다. 기능은 sed 명령에만 적용되는 것이 아니라 다른 많은 명령에도 적용되며 일반적으로 다른 소스에서 파일 이름을 가져오거나 *.txt와 같은 셸 글로브에 의해 확장될 때 사용됩니다.

```
$ echo 'hi hello' > -dash.txt
$ sed 's/hi/HI/' -dash.txt
sed: invalid option -- 'd'

$ sed -- 's/hi/HI/' -dash.txt
HI hello

# clean up temporary file
$ rm -- -dash.txt
```


## DOS style line endings
입력 콘텐츠에 DOS 스타일의 줄 끝이 있는 경우 명령이 작동하지 않거나 이상한 출력을 생성할 수 있습니다.

```
# substitution doesn't work here because of DOS style line ending
$ printf 'hi there\r\ngood day\r\n' | sed -E 's/\w+$/123/'
hi there
good day
# matching \r optionally is one way to solve this issue
# that way, it'll work for both \r\n and \n line endings
$ printf 'hi there\r\ngood day\r\n' | sed -E 's/\w+(\r?)$/123\1/'
hi 123
good 123

# swapping every two columns, works well with \n line ending
$ printf 'good,bad,42,24\n' | sed -E 's/([^,]+),([^,]+)/\2,\1/g'
bad,good,24,42
# output gets mangled with \r\n line ending
$ printf 'good,bad,42,24\r\n' | sed -E 's/([^,]+),([^,]+)/\2,\1/g'
,42,good,24
```

저는 이러한 bash 함수(.bashrc 구성의 일부)를 사용하여 DOS와 유닉스 스타일의 줄 끝을 쉽게 전환할 수 있습니다. 일부 Linux 배포판에는 이러한 명령이 기본적으로 설치되어 있을 수 있습니다. 스택 오버플로우도 참조하세요: 내 도구 출력이 스스로 덮어쓰는 이유는 무엇이며 어떻게 해결하나요?

```
unix2dos() { sed -i 's/$/\r/' "$@" ; }
dos2unix() { sed -i 's/\r$//' "$@" ; }
```


## No newline at the end of the last input line
grep 과 달리 sed 는 마지막 입력 줄에 줄 바꿈이 없는 경우 새 줄을 추가하지 않습니다.

```
# grep adds a newline even though 'drop' doesn't end with newline
$ printf 'sea\neat\ndrop' | grep -v 'at'
sea
drop

# sed will not do so
# note how the prompt appears after 'drop'
$ printf 'sea\neat\ndrop' | sed '/at/d'
sea
drop$
```


## Command grouping and -e option
일부 명령(예: s 명령)은 세미콜론 또는 }로 종료할 수 있습니다. (명령 그룹화)로 끝낼 수 있습니다. 그러나 a 및 r과 같은 명령은 문자열 인수의 일부로 취급됩니다. 이러한 명령은 리터럴 개행으로 종료하거나 아래 그림과 같이 -e 옵션을 사용할 수 있습니다.

```
# } gets treated as part of the string argument, hence the error
$ seq 3 | sed '2{s/^/*/; a hi}'
sed: -e expression #1, char 0: unmatched `{'

# -e to the rescue
# note the use of -e for the first portion of the command as well
$ seq 3 | sed -e '2{s/^/*/; a hi' -e '}'
1
*2
hi
3
```


## Longest match wins
sed는 펄이나 파이썬과 같은 다른 언어에서 볼 수 있는 비욕심 정량화자와 같은 것을 지원하지 않습니다. 자세한 내용은 최장 경기 승리 횟수 섹션을 참조하세요.

```
$ s='food land bark sand band cue combat'
# this will always match from the first 'foo' to the last 'ba'
$ echo "$s" | sed 's/foo.*ba/X/'
Xt

# if you need to match from the first 'foo' to the first 'ba', then
# use a tool which supports non-greedy quantifiers
$ echo "$s" | perl -pe 's/foo.*?ba/X/'
Xrk sand band cue combat
```

특정 경우에는 문자 클래스가 관련 문자만 일치시키는 데 도움이 될 수 있습니다. 그리고 어떤 경우에는 .* 대신 한정자를 더 추가하는 것이 도움이 될 수 있습니다. 스택 오버플로우를 참조하세요: 첫 번째 항목까지 모든 것을 대체하는 방법을 예로 들어 보세요.

```
# first { to the last }
$ echo '{52} apples and {31} mangoes' | sed 's/{.*}/42/g'
42 mangoes

# matches from { to the very next }
$ echo '{52} apples and {31} mangoes' | sed 's/{[^}]*}/42/g'
42 apples and 42 mangoes
```


## Empty matches with * quantifier
수량 기호를 사용할 때는 빈 성냥을 주의하세요.

```
# * matches zero or more times
$ echo '42,,,,,hello,bye,,,hi' | sed 's/,*/,/g'
,4,2,h,e,l,l,o,b,y,e,h,i,

# + matches one or more times
$ echo '42,,,,,hello,bye,,,hi' | sed -E 's/,+/,/g'
42,hello,bye,hi
```


## BRE vs ERE
다른 sed 구현과 달리 GNU sed의 BRE와 ERE 버전 간에는 기능 차이가 없습니다. 매뉴얼에서 인용:

GNU sed에서 기본 정규식과 확장 정규식의 유일한 차이점은 ? , + , 괄호, 중괄호( {} ) 및 | 와 같은 몇 가지 특수 문자의 동작에 있습니다.

```
# no match as + is not special with default BRE
$ echo '52 apples and 31234 mangoes' | sed 's/[0-9]+/[&]/g'
52 apples and 31234 mangoes
# so, either use \+ with BRE or use + with ERE
$ echo '52 apples and 31234 mangoes' | sed 's/[0-9]\+/[&]/g'
[52] apples and [31234] mangoes

# the reverse is also a common beginner mistake
$ echo 'get {} set' | sed 's/\{\}/[]/'
sed: -e expression #1, char 10: Invalid preceding regular expression
$ echo 'get {} set' | sed 's/{}/[]/'
get [] set
```


## Using online regexp tools
특히 디버깅 목적으로는 regex101이나 debuggex와 같은 온라인 도구가 매우 유용할 수 있습니다. 그러나 이러한 도구의 인기로 인해 사용자들은 이러한 사이트에서 자신의 패턴을 시험해 보고 grep, sed, awk 같은 명령줄 도구에서 그대로 작동할 것으로 기대하게 됩니다. 문제는 비-그리디 및 룩어라운드와 같은 기능을 사용할 때 발생하는데, 이러한 기능은 BRE/ERE에서 작동하지 않기 때문입니다. unix.stackexchange도 참조하세요: 내 정규식이 X에서는 작동하지만 Y에서는 작동하지 않는 이유는 무엇인가요?

```
$ echo '1,,,two,,3' | sed -E 's/,\K(?=,)/NA/g'
sed: -e expression #1, char 15: Invalid preceding regular expression
$ echo '1,,,two,,3' | perl -pe 's/,\K(?=,)/NA/g'
1,NA,NA,two,NA,3

# \d is not available as a character set escape sequence
# will match 'd' instead
$ echo '52 apples and 31234 mangoes' | sed -E 's/\d+/[&]/g'
52 apples an[d] 31234 mangoes
$ echo '52 apples and 31234 mangoes' | perl -pe 's/\d+/[$&]/g'
[52] apples and [31234] mangoes
```


## End of line matching
줄 끝 일치에 문제가 있는 경우 이 장의 앞부분에서 설명한 DOS 스타일의 줄 끝이나 줄 끝의 공백 문자로 인해 발생하는 경우가 많습니다.

```
# there's no visual clue to indicate whitespace characters at the end of line
$ printf 'food bark \n1234 6789\t\n'
food bark
1234 6789
# no match
$ printf 'food bark \n1234 6789\t\n' | sed -E 's/\w+$/xyz/'
food bark
1234 6789
# cat command has options to indicate end of line, tabs, etc
$ printf 'food bark \n1234 6789\t\n' | cat -A
food bark $
1234 6789^I$
# works now, as whitespace characters at the end are matched too
$ printf 'food bark \n1234 6789\t\n' | sed -E 's/\w+\s*$/xyz/'
food xyz
1234 xyz
```


## Word boundary differences
단어 경계 \b는 단어 위치의 시작과 끝을 모두 일치시킵니다. 반면, <와 >는 각각 단어 위치의 시작과 끝과 정확히 일치합니다. 따라서 원하는 결과에 따라 이러한 단어 경계 중 어느 것을 사용할지 선택해야 하는 경우가 발생합니다. 아래에서 단어 경계를 표시하는 세로 막대가 있는 이미지로 표시된 샘플 텍스트로 나는 12, 그는 2!를 예로 들어 보겠습니다. 마지막 문자 ! 는 단어 문자가 아니므로 단어 경계 마커가 없습니다.

```
# \b matches both the start and end of word boundaries
# the first match here used starting boundary of 'I' and 'have'
$ echo 'I have 12, he has 2!' | sed 's/\b..\b/[&]/g'
[I ]have [12][, ][he] has[ 2]!

# \< and \> only matches the start and end word boundaries respectively
$ echo 'I have 12, he has 2!' | sed 's/\<..\>/[&]/g'
I have [12], [he] has 2!
```

다음은 두 가지 유형의 단어 경계의 차이를 보여주는 또 다른 예입니다.

```
# add something to both the start/end of word
$ echo 'hi log_42 12b' | sed 's/\b/:/g'
:hi: :log_42: :12b:

# add something only at the start of word
$ echo 'hi log_42 12b' | sed 's/\</:/g'
:hi :log_42 :12b

# add something only at the end of word
$ echo 'hi log_42 12b' | sed 's/\>/:/g'
hi: log_42: 12b:
```


## Filter and then substitute
경우에 따라 대체만 사용하는 대신 필터 조건을 추가하여 대체 명령의 가독성을 개선하고 단순화할 수 있습니다.

```
# insert 'Error: ' at the start of a line if it contains '42'
# also, remove all other starting whitespaces for such lines
$ printf '1423\n214\n 425\n' | sed -E 's/^\s*(.*42)/Error: \1/'
Error: 1423
Error: 425

# simpler and easier to understand
# also note that -E is no longer required
$ printf '1423\n214\n 425\n' | sed '/42/ s/^\s*/Error: /'
Error: 1423
Error: 425
```


## Addressing input that only has a single line
입력에 한 줄의 데이터만 있는 경우 1과 $가 모두 주소로 일치합니다.

```
$ printf '3.14\nhi\n42\n' | sed '1 s/^/start: /; $ s/$/ :end/'
start: 3.14
hi
42 :end
$ echo '3.14' | sed '1 s/^/start: /; $ s/$/ :end/'
start: 3.14 :end

# you can use control structures as a workaround
# this prevents ending address match if input has only one line
$ echo '3.14' | sed '1{s/^/start: /; b}; $ s/$/ :end/'
start: 3.14
# this prevents starting address match if input has only one line
$ echo '3.14' | sed '${s/$/ :end/; b}; 1 s/^/start: /'
3.14 :end
```


## Behavior of n and N commands at the end of input
n 및 N 명령은 더 이상 가져올 입력 줄이 없으면 더 이상 명령을 실행하지 않습니다.

```
# last line matches the filtering condition
# but substitution didn't work for the last line
$ printf 'red\nblue\ncredible\n' | sed '/red/{N; s/e.*e/2/}'
r2
credible

# $!N will avoid executing the N command for the last line of input
$ printf 'red\nblue\ncredible\n' | sed '/red/{$!N; s/e.*e/2/}'
r2
cr2
```


## Faster execution for ASCII input
로캘을 아스키로 변경하면(기본값이 아스키가 아니라고 가정할 때) 속도가 크게 향상될 수 있습니다.

```
# time shown is the best result from multiple runs
# speed benefit will vary depending on computing resources, input, etc
$ time sed -nE '/^([a-d][r-z]){3}$/p' words.txt > f1
real 0m0.023s

# LC_ALL=C will give ASCII locale, active only for this command
$ time LC_ALL=C sed -nE '/^([a-d][r-z]){3}$/p' words.txt > f2
real 0m0.012s

# check if the results are identical for both commands
$ diff -s f1 f2
Files f1 and f2 are identical
```

다른 예가 있습니다.

```
$ time sed -nE '/^([a-z]..)\1$/p' words.txt > f1
real 0m0.050s

$ time LC_ALL=C sed -nE '/^([a-z]..)\1$/p' words.txt > f2
real 0m0.029s

# clean up temporary files
$ rm f[12]
```


## Substitution with ripgrep command
ripgrep(명령명 rg )는 주로 grep 명령의 대안이지만 검색 및 바꾸기 기능도 지원합니다. BRE/ERE에 비해 정규식 기능이 더 많고, 유니코드, 여러 줄 및 고정 문자열 일치를 지원하며 일반적으로 sed보다 빠릅니다. rg --passthru -N 'search' -r 'replace' 파일을 사용하여 sed 's/search/replace/g' 파일을 에뮬레이트할 수 있습니다. 대체 기능이 제한적(제자리 지원 없음, 주소 필터링 없음, 제어 구조 없음 등)이지만 rg 학습을 권장하는 데에는 여러 가지 이유가 있습니다.

```
# same as: sed 's/e/E/g' greeting.txt
# --passthru is needed to print lines that don't match the search pattern
$ rg --passthru -N 'e' -r 'E' greeting.txt
Hi thErE
HavE a nicE day

# non-greedy quantifier
$ s='food land bark sand band cue combat'
$ echo "$s" | rg --passthru 'foo.*?ba' -r 'X'
Xrk sand band cue combat

# Multiline search and replacement
$ printf '42\nHi there\nHave a Nice Day' | rg --passthru -U '(?s)the.*ice' -r ''
42
Hi Day

# fixed string matching example, this one replaces [4]* with 2
$ printf '2.3/[4]*6\nfig\n5.3-[4]*9\n' | rg --passthru -F '[4]*' -r '2'
2.3/26
fig
5.3-29

# unicode support
$ echo 'fox:αλεπού,eagle:αετός' | rg '\p{L}+' -r '($0)'
(fox):(αλεπού),(eagle):(αετός)

# -P option enables PCRE if you need even more advanced features
$ echo 'car bat cod map' | rg -Pw '(bat|map)(*SKIP)(*F)|\w+' -r '[$0]'
[car] bat [cod] map
```

더 많은 예제와 자세한 내용은 GNU grep 및 ripgrep를 사용한 CLI 텍스트 처리 전자책을 참조하세요.



## Compiling sed script
sed-bin에서 인용: POSIX sed에서 C로 변환기:

이 프로젝트를 사용하면 sed를 C로 변환하여 결과를 컴파일하고 원래 sed 스크립트와 정확히 동일한 동작을 하는 바이너리를 생성할 수 있습니다.

복잡한 sed 스크립트 디버깅, 난독화, 속도 향상 등에 도움이 될 수 있습니다.


# Further Reading
man sed 및 정보 sed 및 온라인 매뉴얼
sed의 다양한 구현에 대한 정보
sed FAQ, 훌륭한 리소스이지만 2003년 3월 10일에 마지막으로 수정됨
stackoverflow: BSD/macOS sed 대 GNU sed 대 POSIX sed 사양
unix.stackexchange: Mac OSX의 sed와 다른 표준 sed의 차이점
grymoire: sed 튜토리얼 - 다양한 sed 버전 간의 차이점에 대한 자세한 내용이 있습니다
stackoverflow/stackexchange의 Q&A는 학습 자료의 좋은 소스이며 연습용으로도 좋습니다
unix stackexchange의 sed Q&A
sed Q&A on stackoverflow
정규 표현식 알아보기(BRE/ERE 외의 맛에 대한 정보도 있습니다) -regular-expression - 자습서와 도구
rexegg - 자습서, 트릭 및 기타
stackoverflow: 이 정규식은 무엇을 의미하나요?
온라인 정규식 테스터 및 디버거 - CLI 도구에 완전히 적합하지는 않지만 대부분의 ERE 구문은 작동합니다.
관련 도구
rpl - 검색 및 바꾸기 도구, 대화형 모드 및 재귀 모드와 같은 흥미로운 옵션이 있습니다
sedsed - sed 스크립트를 위한 디버거, 들여쓰기 및 HTMLizer
xo - 정규식 일치 그룹 구성
sd - 간단한 검색 및 바꾸기, Rust에서 구현
CLI 텍스트 처리 도구에 관한 내 전자책
다음은 특정 주제에 대한 리소스 링크입니다:

ASCII 참조 및 로캘 사용법
ASCII 코드 테이블
wiki.archlinux: 로캘
셸핵: 로캘 및 언어 설정 정의
unix.stackexchange: LC_ALL=C는 무엇을 하나요?
unix.stackexchange: grep, sed, awk, perl 등을 사용할 때
unix.stackexchange: 여러 줄 문자열 바꾸기
stackoverflow: 선택적 공백으로 빈 줄 삭제
unix.stackexchange: 일치하는 줄 위의 줄만 인쇄
stackoverflow: 두 패턴 사이에 세 번째 패턴이 있는 경우에만 줄 가져오기
unix.stackexchange: 비슷한 예제
 
