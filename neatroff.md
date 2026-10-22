Getting Started with Neatroff
---

*A. G. Rudi*

본 문서는 Neatroff를 설정하고 사용하는 데 필요한 단계를 설명합니다. Neatroff를 설정하고 사용하는 데 필요한 단계를 설명합니다. 이 문서는 neatroff_make Git 저장소를 사용하며, 이 저장소에는 일련의 표준 매크로 패키지와 최상위 Makefile이 포함되어 있어 Neatroff 및 그 보조 프로그램(본 문서에서는 Neat*로 지칭됨)을 가져오고 빌드할 수 있습니다. Neatroff와 이에 수반되는 프로그램에 대한 자세한 내용은 홈페이지 https://dev.rudi.ir/ 에서 확인할 수 있습니다.


# 설치없이 Neatroff 사용하기

Neatroff를 설치하지 않고 사용하려면, 다음과 같이 neatroff_make를 가져와 컴파일하면 됩니다.

```
$ git clone https://github.com/aligrudi/neatroff_make
$ cd neatroff_make/
$ make init
$ make neat
```

이 과정은 생성된 디렉터리가 삭제되지 않을 것이며, Neatroff를 사용할 때 Neatroff 글꼴, 매크로 및 바이너리가 포함되어 있을 것임을 전제로 합니다. “init” make 타깃은 필요한 Git 저장소를 클론하고 Ghostscript 글꼴을 가져옵니다. “neat” 타깃은 프로그램을 컴파일하고 Neatroff 글꼴 설명을 생성합니다. neatroff_make의 demo/ 하위 디렉토리에는 예제와 Neatroff 문서를 빌드하는 방법을 보여주는 Makefile이 포함되어 있습니다. neatroff_make/demo 외부에서 Neatroff 문서를
컴파일하려면 이 디렉토리에 있는 Makefile을 좋은 템플릿으로 활용할 수 있습니다. 이 파일을 문서 디렉터리로 복사한 후, BASE 매크로를 수정해서 neatroff_make 디렉터리를 가리키도록 설정하십시오. 또는 다음과 같이 Makefile을 직접 사용해서 input.ms 또는 input.tr을 컴파일할 수도 있습니다.

```
$ make -f $BASE/demo/Makefile BASE=$BASE input.PDF
```

새 글꼴을 추가하려면, 해당 글꼴을 fonts/ 하위 디렉터리에 넣고 “neat” 타깃을 다시 생성하면 됩니다. Neatroff에서 새 글꼴을 사용하려면 확장자를 제외한 파일 이름을 마운트해야 합니다. 예를 들어, 글꼴 이름이 NewFont.ttf인 경우, 다음 Troff 코드는 이 글꼴을 마운트해서 사용합니다.

```
.fp - F1 NewFont
.ft F1
NewFont로 표시된 텍스트
```


# Neatroff 설치

이 섹션은 시스템 디렉터리에 Neatroff를 설치하는 방법을 설명합니다. 먼저 neatroff_make/Makefile 내의 BASE 매크로를 수정해서 설치 위치를 지정하십시오. 그런 다음, 이전 섹션에서 설명한 대로 Neatroff를 컴파일한 후, Makefile의 install 타깃을 빌드하십시오.

```
$ make install
```

BASE로 지정된 디렉터리에 따라 이 명령을 슈퍼유저 권한으로 실행해야 할 수도 있다는 점에 유의하십시오. 이 시점에서 Neat*가 설치되었을 것입니다. 이전 섹션에서 설명한 것 같이, demo/ 하위 디렉터리에 있는 Makefile은 Neatroff 문서를 컴파일하기 위한 좋은 템플릿입니다. 이 파일에서 BASE 매크로의 값을 업데이트해야 합니다.

글꼴 추가: troff에서 주목할 만한 설계 결정 중 하나는 포스트스크립트(Postscript) 같은 출력 장치를 troff 조판 프로그램과 분리시킨 것이었습니다. 이런 분리를 위해서는 장치에 구애받지 않는 글꼴 설명을 생성해서, 각 글꼴에 사용 가능한 글리프와 그 메트릭을 나열해야 합니다. Neatroff의 글꼴 설명은 다음과 같이 Neatmkfn 프로그램을 사용해서 생성할 수 있습니다(BASE는 Neatroff의 설치 디렉터리입니다):

```
$ neatmkfn -b -a <fontpath.afm >$BASE/devutf/fontname
$ neatmkfn -b -o <fontpath.ttf >$BASE/devutf/fontname
```

글꼴 설명을 생성한 후, .fp 요청을 사용해서 다른 글꼴과 마찬가지로 새로운 글꼴을 troff에 등록할 수 있습니다:

```
.fp 12 F2 fontname
```

또는, make neat를 실행하기 전에 neatroff_make/fonts 디렉터리에 글꼴을 배치할 수도 있습니다. neat Makefile 타깃은 해당 디렉터리에 있는 모든 글꼴에 대한
글꼴 설명 파일을 자동으로 생성하고 설치합니다. 이는 특히 글꼴 수가 많을 때 매우 편리합니다.

Neatroff에서 글꼴을 사용하는 또 다른 방법은 글꼴 설명을 실행 시에 즉석에서 생성하는 것입니다. 오버헤드가 발생하지만, 이 방법은 새로운 글꼴을 테스트할 때
편리할 수 있습니다. 이 방법은 neatroff_make에 포함된 fp 매크로 패키지를 사용하며(Neatroff에 -mfp 옵션을 전달해야 함), 먼저 fp.src 문자열 레지스터의 값으로 새로운 글꼴이 들어 있는 디렉터리를 지정해야 합니다. 이 패키지는 .fp.ttf, .fp.otf, 및 .fp.afm 매크로를 정의하며, 이들의 동작은 표준 .fp 요청과 매우 유사하지만, 세 번째 인수는 확장자를 제외한 글꼴 파일 이름이어야 한다는 점이 다릅니다. 따라서 /path/to/fonts/NewFont.ttf를 마운트하려면 test.tr 파일에 다음 내용을 포함하면 됩니다:

```
.ds fp.src "/path/to/fonts/
.fp.ttf - F3 NewFont
.ft F3
새 글꼴 테스트 중...
```


# 추가 정보

Neatroff 소개
Neatroff와 다른 troff 구현체 간의 차이점을 설명합니다.
https://dev.rudi.ir/neatroff.pdf에서 확인할 수 있습니다.

Neateqn을 이용한 수학 식 조판
수학 방정식 조판을 위한 Neateqn 전처리기를 소개합니다.
https://dev.rudi.ir/neateqn.pdf에서 확인할 수 있습니다.

페르시아어로 된 Neatroff 소개
오른쪽에서 왼쪽으로 읽는 언어의 텍스트 방향 지정 방법과 페르시아어의 케시데(Keshideh)
조정 방법에 대해 설명합니다. https://dev.rudi.ir/neatfarsi.pdf에서 확인할 수 있습니다.



