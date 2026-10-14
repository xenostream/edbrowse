SED Handbook: The Complete Beginner's Guide
=====

유닉스 도구 모음 중에서 가장 강력한 명령어인 ‘sed’ (스트림 편집기)를 실제 예제를 통해 배워보세요!


Sed는 60년대 후반부터 유닉스 표준 도구 모음의 일부로 자리잡아 왔습니다. 다른 텍스트 편집기와 마찬가지로, 텍스트 파일을 수정하는 데 도움이 됩니다. 하지만, 여러분이 이미 사용해 보셨을 다른 텍스트 편집기와 달리, Sed는 비-상호작용형(non-interactive) 편집 도구입니다. 즉, 파일에 적용할 변환 작업을 미리 지정해 두면, 도구가 별도의 감독 없이 해당 변환을 자동으로 수행합니다.

이 도구의 설계 목표를 가장 잘 설명한 내용은, 초기 구현의 핵심 개발자인 리 E. 맥마혼(Lee E. McMahon)이 자신의 [원본 sed 논문](http://sed.sourceforge.net/grabbag/tutorials/sed_mcmahon.txt?ref=linuxhandbook.com)에서 밝힌 바와 같습니다:

Sed는 유닉스 운영 체제에서 실행되는 비-상호작용형 컨텍스트 편집기입니다. Sed는 특히 다음 세 가지 경우에 유용하도록 설계되었습니다:

1. 상호작용 모드로 편집하기에 파일이 너무 커서 편리한 편집이 어려운 경우;
1. 편집 명령어 순서가 너무 복잡해서 대화형 모드에서 편하게 입력하기 어려운 경우, 크기에 상관 없이 파일을 편집할 때;
1. 입력 데이터를 한 번만 처리해서 여러 가지 ‘전역’ 편집 기능을 효율적으로 수행할 때.

설계 목표 중 (1) 과 (3) 은 현대의 하드웨어 환경에서는 관련성이 다소 떨어지겠지만, 두 번째 목표는 여전히 유효합니다. 개인적으로 덧붙이면, sed는 일련의 파일에 동일한 변환을 적용할 때 같이 반복적인 작업에 특히 적합하다고 생각합니다.



# Learn basic SED commands with these examples

sed의 강력한 기능을 간략히 보여드리기 위해, 프로젝트의 각 소스 파일 맨 위에 다음과 같은 라이선스 헤더를 추가하는 사례로 살펴보겠습니다:

```bash
$ head MIT.LICENSE *.sh
==> MIT.LICENSE <==
-----8<----------------------------------------------------------------
Copyright <YEAR> <COPYRIGHT HOLDER>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

==> script1.sh <==
#!/bin/bash

echo Hello, I\'m the first script

==> script2.sh <==
#!/bin/bash

cat << EOF
Hello, I'm the second script
EOF
```

각 셸 스크립트 파일 맨 위에 라이선스 파일이 표시되길 바랄 뿐만 아니라, 연도(YEAR)와 저작권 표시(COPYRIGHT HOLDER) 자리 표시자도 실제 값으로 대체되기를 원합니다. 이것이 바로 첫 번째 사례가 될 것입니다.


# 1. Replacing text in SED

라이선스 파일(MIT.LICENSE)에서 `<YEAR>` 와 `<COPYRIGHT HOLDER>` 자리 표시자를 실제(현재) 값으로 바꾸고 싶습니다. 이 작업은 sed의 치환 명령어에 안성맞춤입니다. 모든 sed 명령어 중에서 가장 유용한 명령어일 것입니다:

```bash
$ sed -e 's/<YEAR>/2018/' MIT.LICENSE  | head -5
-----8<----------------------------------------------------------------
Copyright 2018 <COPYRIGHT HOLDER>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
```

파이프(`|`)를 사용해서 sed 명령어의 출력을 `head` 도구로 전달해서, 처음 5줄만 표시했습니다. 하지만 오늘 다룰 구체적인 주제와 관련해서 가장 흥미로운 부분은 `s/<YEAR>/2018/` 표현식입니다.

sed는 입력 파일을 한 줄씩 처리하는 방식으로 작동합니다. 각 줄에 대해 *substitute* (`s`) 명령어는 첫 번째 두 슬래시(`/<YEAR>/`) 사이의 텍스트가 처음 나타나는 부분을 마지막 두 슬래시(`/2018/`) 사이의 텍스트로 대체합니다. 이를 GUI 텍스트 편집기의 ‘찾기 및 바꾸기’ 기능과 비슷하게 생각하면 됩니다.

여기서 언급할 것은, “원본 MIT.LICENSE 파일은 수정되지 않았다!” 는 것입니다. 다음 명령어로 직접 확인해 보시기 바랍니다:

```bash
head -5 MIT.LICENSE
```


# 2. Replacing text… again

좋습니다!! 연도 자리 표시자는 교체했습니다. 하지만 교체할 두 번째 자리 표시자가 하나 더 있습니다. 앞의 예제를 이해했다면, 다음과 같은 두 번째 sed 표현식을 상상할 수 있을 겁니다:

```bash
's/<COPYRIGHT HOLDER>/Sylvain Leroux/'
```

그런데 이 표현식은 어디에 배치해야 할까요? 여러 가지 선택지가 있습니다. 리디렉션 개념에 익숙하면, 첫 번째 sed 명령의 출력을 두 번째 sed 인스턴스로 파이프하는 것이 가장 직관적인 방법입니다:

```bash
$ sed -e 's/<YEAR>/2018/' MIT.LICENSE  |
    sed -e 's/<COPYRIGHT HOLDER>/Sylvain Leroux/' |
    head -5
----8<----------------------------------------------------------------
Copyright 2018 Sylvain Leroux

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
```

하지만 좀 더 나은 방법이 있습니다. `-e` 옵션은 sed 표현식을 지정하므로, 동일한 sed 호출에 여러 개의 표현식을 사용할 수 있으며, 처리 결과는 동일합니다:

```bash
# 줄 끝의 \ 기호에 특히 주의합니다.
# *동일한* 명령으로 지정할 경우,
# 다음 줄로 이어집니다:
$ sed -e 's/<YEAR>/2018/' \
      -e 's/<COPYRIGHT HOLDER>/Sylvain Leroux/' \
      MIT.LICENSE |
      head -5
``` 

마지막으로, 같은 sed 표현식에 여러 명령어를 각 줄마다 한 줄씩 구분해서 지정할 수도 있습니다. 이는 좀 더 복잡한 sed 프로그램을 작성할 때 특히 유용합니다:

```bash
# 작은 따옴표와
# 백슬래시의 위치에 각별히 주의합니다:
$ sed -e 's/<YEAR>/2018/
          s/<COPYRIGHT HOLDER>/Sylvain Leroux/' \
    MIT.LICENSE |
    head -5
```


# 3. Inserting text

이제 자리 표시자를 실제 값으로 대체했습니다. 하지만 해당 라이선스 파일을 프로젝트 파일에 삽입하기 전에 처리할 작업이 몇 가지 남아 있습니다. 프로젝트의 파일들은 셸 스크립트로, 셸에서 해당 줄을 해석하지 않으려면 라이선스 파일의 각 줄을 해시 기호(#)로 시작해야 합니다.

이를 위해 다시 한 번 치환 명령어를 사용할 것입니다. 앞서 언급하지 않았던 점은, 대부분의 GUI 기반 편집기의 검색 및 치환 기능과 달리, “검색 패턴은 반드시 검색할 문자열 그대로일 필요는 없다!” 는 것입니다. 사실, 이것은 정규 표현식(`regex`)입니다. 

즉, 문자 그대로 일치하는 일반 문자 외에 특별한 의미를 갖는 문자를 사용할 수 있습니다. 예를 들어, 캐럿(`^`)은 줄의 시작을, 달러 기호(`$`)는 줄의 끝을 나타내며, 마지막 예시에서 봤듯이 점-별표(`.*`)는 0개, 1개 또는 여러 개의 문자로 구성된 임의의 문자열을 의미합니다. 이와 같은 메타문자는 많이 있지만, 지금 당장은 이 정도면 충분합니다.

따라서 줄 시작 부분에 텍스트를 삽입하려면, 줄 시작 부분의 텍스트를 대체하는 방법이 있습니다:

```bash
$ sed -e 's/<YEAR>/2018/'  \
        -e 's/<COPYRIGHT HOLDER>/Sylvain Leroux/' \
        -e 's/^/# /' \
        MIT.LICENSE | head -5
# -----8<----------------------------------------------------------------
# Copyright 2018 Sylvain Leroux
#
# Permission is hereby granted, free of charge, to any person obtaining
# a copy of this software and associated documentation files (the
```


# 4. Clearing selected lines

sed의 치환 명령어는 다재다능해서, 이를 제대로 활용하면 대부분의 텍스트 변환 작업을 수행할 수 있습니다. 예를 들어, 라이선스 텍스트 상단과 하단에 있는 점선(들)을 제거하려면 다음과 같이 작성할 수 있습니다:

```bash
$ sed -e 's/<YEAR>/2018/'  \
        -e 's/<COPYRIGHT HOLDER>/Sylvain Leroux/' \
        -e 's/^/# /' \
        -e 's/^.*----.*$//' \
        MIT.LICENSE | head -5

# Copyright 2018 Sylvain Leroux
#
# Permission is hereby granted, free of charge, to any person obtaining
# a copy of this software and associated documentation files (the
```

이 치환 명령으로 모든 텍스트는 빈 문자열로 대체되었습니다:

정규식 기호 | 설명
--- | ---
`^`  | 줄 시작 부분
`.*`  | 뒤에 0개, 1개 또는 여러 개의 문자로 구성된 임의의 문자열이 오는 경우
`----` | 뒤에 4개의 하이픈이 오는 경우
`.*`  | 뒤에 0개, 1개 또는 여러 개의 문자로 구성된 임의의 문자열이 오는 경우
`$`  | 줄 끝 부분

요약하면, 이 명령어는 줄에 대시 4개가 연속 포함되면 전체 줄을 빈 문자열로 대체합니다. 하지만 빈 줄 자체는 그대로 남아 빈 줄로 표시됩니다.

요구 사항과 선호도에 따라 다음과 같은 대안도 고려할 수 있습니다. 명령어의 변경 사항을 정확히 파악하고 결과에 어떤 영향을 미쳤는지 직접 확인해 보시기 바랍니다:

```bash
$ sed -e 's/<YEAR>/2018/'  \
        -e 's/<COPYRIGHT HOLDER>/Sylvain Leroux/' \
        -e 's/^.*----.*$//' \
        -e 's/^/# /' \
        MIT.LICENSE | head -5
```

줄을 지우는 데 사용된 정규 표현식이 다소 복잡하다면, sed의 또 다른 기능을 활용할 수도 있습니다. 거의 모든 명령어는 명령어 앞에 선택적인 주소를 지정할 수 있습니다. 주소가 지정되면, 해당 주소와 일치하는 줄로 명령어의 적용 범위가 제한됩니다:

```bash
$ sed -e 's/<YEAR>/2018/'  \
        -e 's/<COPYRIGHT HOLDER>/Sylvain Leroux/' \
        -e 's/^/# /' \
        -e '/----/s/^.*$//' \
        MIT.LICENSE | head -5
```

이 최신 치환 명령은 연속된 네 개의 대시(즉, “포함된”)와 일치하는 줄만 적용됩니다. 그리고 일치하는 각 줄에서 줄 시작(^)과 끝($) 사이의 모든 내용(`.*`)을 빈 문자열(`//`)로 치환합니다.



# 5. Removing selected lines

이전 섹션은 몇 줄의 텍스트를 지우기 위해 대체 명령어를 약간 수정했습니다. 하지만 빈 줄은 그대로 남아 있었습니다. 이것은 바람직할 수도 있고, 그렇지 않을 수도 있습니다. 후자의 경우, 출력에서 줄 전체를 제거하기 위해 삭제 명령어를 살펴보는 것이 좋습니다:

```bash
# 다음은 ‘> LICENSE’ 리디렉션을 사용해서
# sed 명령어 결과를 새로
# 생성된 LICENSE 파일에 저장합니다:
$ sed -e 's/<YEAR>/2018/'  \
        -e 's/<COPYRIGHT HOLDER>/Sylvain Leroux/' \
        -e 's/^/# /' \
        -e '/----/d' \
        MIT.LICENSE > LICENSE
$ head -5 LICENSE
# Copyright 2018 Sylvain Leroux
#
# Permission is hereby granted, free of charge, to any person obtaining
# a copy of this software and associated documentation files (the
# "Software"), to deal in the Software without restriction, including
```

`d` 문자는 삭제 명령어의 이름입니다. `s` 문자가 치환 명령어의 이름인 것과 마찬가지입니다. 여기서는 명령어 앞에 주소를 지정했기 때문에, 일치하는 줄만 삭제됩니다(주소를 지정하지 않았다면 `d` 명령어는 파일의 모든 줄을 삭제했을 것입니다).


# 6. Convert to uppercase

지금까지는 라이선스 파일 상단 부분에 초점을 맞췄습니다. 하지만 문서 중간 부분도 몇 가지 변경 사항을 적용하고 싶습니다. 제가 무슨 말을 하는지 살펴보겠습니다:

```bash
$ sed -ne '/The above/,$ p' LICENSE
# The above copyright notice and this permission notice shall be
# included in all copies or substantial portions of the Software.
#
# The software is provided "as is", without warranty of any kind,
# express or implied, including but not limited to the warranties of
# merchantability, fitness for a particular purpose and noninfringement.
# In no event shall the authors or copyright holders be liable for any
# claim, damages or other liability, whether in an action of contract,
# tort or otherwise, arising from, out of or in connection with the
# software or the use or other dealings in the software.
```

위의 명령어에서 `-n` 옵션을 사용해서 패턴 영역의 자동 출력 기능을 비활성화했습니다. 즉, 명시적으로 요청하지 않는 한, sed는 아무것도 출력하지 않습니다!! 

`p` 출력 명령어를 사용해서 바로 이 작업을 수행합니다. `p` 명령어 앞에 단일 주소를 사용하는 대신, “The above” 라는 텍스트가 포함된 줄부터 문서 끝(`$`)까지의 텍스트를 표시하기 위해 “범위 지정 방식을 사용했다!” 는 점에 유의합니다.

`p` 명령어는 파일 일부를 추출할 때 유용할 수 있습니다. 하지만 현재 필요한 내용을 설명하기 위해 마지막 두 단락만 표시합니다. 라이선스 파일 관례에 따라, 소프트웨어가 “있는 그대로(as-is)” 제공된다는 점을 명확히 고지해서 법적인 책임을 회피하고자 합니다. 따라서 “The software” 로 시작하는 마지막 단락은 모두 대문자로 재작성해서 이를 강조하고 싶습니다.

치환 명령어의 대체 문자열에서 `&` 문자는 검색 패턴과 일치하는 텍스트로 대체됩니다. `\U GNU` 확장 기능을 사용하면 치환 문자열의 대소문자를 변경할 수 있습니다:

```bash
$ sed -i -e '/The software/,$s/.*/\U&/' LICENSE
$ cat LICENSE
```

대체 명령어의 `s/.*/\U&/` 는 “임의의 텍스트(`.*`)를 대문자(`\U`)로 전부(`&`) 대체한다!” 는 의미입니다. 직접 확인해 보면 알겠지만, 마지막 문단은 모두 대문자로 표시되어 있을 것입니다. 참고로, `-i` 옵션 덕분에 변경 사항은 LICENSE 파일에 직접 적용된 것을 눈치챌 수도 있습니다.

이에 대해서는 다음 섹션에 살펴보겠습니다. 그동안 직접 연습하면서 원하는 대로 명령어를 수정해 보시기 바랍니다. 취향에 맞는 라이선스 파일이 완성되면, 이제 프로젝트의 각 소스 파일에 이를 포함시키는 방법을 알아볼 차례입니다.


# 7. Inserting a text file

만약 여기서 복잡한 명령어를 기대하셨다면 약간 실망할 겁니다. 한 파일을 다른 파일에 삽입하는 방법은 꽤 간단합니다:

```bash
$ sed -i -e '1r LICENSE' script1.sh
cat script1.sh
```

여기서 주목할 점은 두 가지입니다:

- `1r LICENSE` 표현식은 외부 파일을 읽어 현재 처리 중인 파일에 삽입하는 명령어입니다. 여기서는 입력 파일의 첫 번째 줄만 일치하는 주소인 숫자 1이 접두사로 붙어 있습니다.

- `-i` 옵션을 사용하면 파일 원본을 직접 수정할 수 있습니다. 즉, sed는 백그라운드에서 임시 파일을 생성해서 출력을 저장한 다음, 처리가 완료되면 원본 파일을 수정된 파일로 대체합니다.

`-i` 옵션의 흥미로운 효과 중 하나는 명령줄에 여러 파일을 지정할 수 있으며, sed는 “각 파일에 동일한 변환 작업을 독립적으로 적용한다!” 는 점입니다:

```bash
$ sed -i -e ‘1r LICENSE’ *.sh
```


# 8. Back to the future

sed 명령어의 마지막 예시로, 몇 년쯤 지나서 2029년 1월 1일이라 가정합니다. 따라서 모든 파일의 저작권 표시를 업데이트해야 합니다. 프로젝트 파일이 생성된 시기에 따라 여러 가지 사례가 있을 수 있습니다. 

저작권 표시는 다음 두 가지 형식 중 하나를 따라야 합니다:

현재 저작권  |  설명
--- | ----
Copyright 2023 | 작년에 생성된 파일의 경우
Copyright 2018-2023 | 작년 이전에 생성된 파일의 경우

확장 정규식(`-E` 옵션 사용)을 사용하면 두 가지 사례를 한 번에 처리할 수 있습니다. 여기서 실제로 사용할 “확장 정규식” 의 기능은 괄호 뿐입니다:

```bash
$ sed -i -Ee 's/Copyright (....)(-....)?/Copyright \1-2024/' *.sh
```

모든 스크립트(`*.sh`) 파일의 저작권 표시를 수정한 다음, 위의 명령어를 실행해서 어떻게 작동하는지 확인해 보시기 바랍니다.

다만, 검색 패턴의 `Copyright` 는 문자 그대로, 일치하는 리터럴 텍스트이며, `(….)` 는 임의의 4개 문자와 일치하는 “캡처 그룹을 정의한다!” 는 점을 알려드리면 이해하기 쉬울 겁니다. 즉, 연도의 네 자리 숫자를 의미합니다; `(-….)?` 는 대시 뒤에 임의의 네 글자가 오는 패턴과 일치하는 캡처 그룹을 정의합니다. 끝의 물음표는 해당 캡처 그룹이 선택적임을 의미합니다. 따라서 입력 줄에 있을 수도 있고 없을 수도 있습니다.

대체 문자열의 `Copyright` 는 문자 그대로 복사될 리터럴 텍스트입니다; `\1` 는 첫 번째 캡처 그룹의 내용이며, `-2024` 는 그대로 복사될 리터럴 텍스트입니다.

앞선 표에서 설명한 사례에 이 규칙을 적용했을 때 다음과 같은 결과가 나온다는 것을 확인할 수 있습니다:

검색 텍스트  |  `\1`  |  `\2`  |  대체 문자열
--- | --- | --- | ----
Copyright 2023  |  2023 |     |  Copyright 2023-2024
Copyright 2018-2023 |   2018 | -2023 |   Copyright 2018-2024



# To conclude our SED guide

지금까지 다룬 내용은 빙산의 일각에 불과합니다. sed 도구는 이보다 훨씬 더 강력합니다!! 하지만 `s`, `p`, `d`, `i` 명령어와 `^, $, ., ?, .*` 같은 몇 가지 기본적인 정규식 구문만 배웠을 뿐이라도, 일상에서 마주치는 수많은 문제를 해결할 수 있는 충분한 지식을 갖추게 되었습니다.

저는 작은 과제를 좋아하기 때문에, 다음과 같은 과제를 제안합니다. 프로젝트 디렉터리에 hello.c 라는 기본적인 C 소스 파일이 있다고 가정합니다:

```bash
$ ls
hello.c  MIT.LICENSE  script1.sh  script2.sh
$ gcc hello.c -o hello
$ ./hello sylvain
Hello sylvain
$ cat hello.c
```

소스 파일에는 몇 가지 주석이 포함되어 있습니다. 이 주석들을 sed 명령어를 사용해서 hello.c 소스 파일에 MIT 라이선스를 삽입할 수 있을까요? sed 명령어를 하나 또는 여러 개 사용할 수도 있고, 한 sed 명령어의 출력을 다른 명령어로 파이프 연결할 수도 있으며, 원한다면 임시 파일을 사용할 수도 있겠지만, sed 이외의 다른 명령어는 사용할 수 없습니다. 물론, 라이선스 파일을 삽입한 후에도 여전히 C 소스 파일은 컴파일되야 합니다!


