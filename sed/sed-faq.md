THE SED FAQ
=====

Frequently Asked Questions about sed, the stream editor


# 1. 일반 정보

## 1.1. 소개 - 이 FAQ의 구성

   이 FAQ는 sed에 관한 일반적인(그리고 일부 드문) 질문에 신속하게 답변할 수 있도록 구성되어 있습니다. 예제에서 명확하지 않은 용어나 약어가 보이면, 해당 용어가 1.5절에 정의되어 있는지 확인해 보십시오. 정의되어 있지 않다면, pemente@northpark.edu 로 의견을 보내 주십시오.

## 1.2. sed FAQ 최신 버전

   sed FAQ의 최신 버전은 대개 다음 위치에서 확인할 수 있습니다:

       http://sed.sourceforge.net/sedfaq.html (HTML 버전)
       http://sed.sourceforge.net/sedfaq.txt  (일반 텍스트)
       http://www.student.northpark.edu/pemente/sed/sedfaq.html
       http://www.student.northpark.edu/pemente/sed/sedfaq.txt
       http://www.faqs.org/faqs/editor-faq/sed
       ftp://rtfm.mit.edu/pub/faqs/editor-faq/sed

   다른 저자가 작성한 sed에 관한 또 다른 FAQ 파일은 다음에서 확인할 수 있습니다:

       http://www.dreamwvr.com/sed-info/sed-faq.html

## 1.3. FAQ 개정 정보

   일반 텍스트 버전은 변경된 부분이 해당 줄의 78번째 열에 수직 막대(|)로 표시됩니다. 수직 막대를 제거하려면 (MS-DOS의 경우 큰따옴표를 사용하십시오):

     sed ‘s/  *|$//’ sedfaq.txt > sedfaq2.txt

   HTML 버전은 수직 막대가 표시되지 않습니다. FAQ의 새로 추가되거나 수정된 부분은 진한 파란색 글씨로 표시됩니다.

   텍스트 버전은 강조가 필요한 단어를 밑줄 ‘_’ 또는 별표 '*' 로 둘러쌀 수 있습니다. HTML 버전은 이들이 각각 이탤릭체와 굵은 글씨로 변경됩니다.

## 1.4. sed FAQ에 질문이나 답변을 추가하려면 어떻게 해야 하나요?

   질문을 간결하게 작성해서 pemente[at]northpark.edu 로 보내주시고, 제안하는 변경 사항을 명시해 주세요. 저희는 이를 sed-users 메일링 리스트(2.3.2절 참조)에 게시하고 그곳에서 논의할 것입니다. 내용이 적절하다면, 귀하의 기여 내용은 다음 판에 추가될 것입니다.

## 1.5. FAQ 약어

       files = 공백으로 구분된 하나 이상의 파일 이름
       gsed  = GNU sed
       ssed  = super-sed
       RE    = sed에서 지원하는 정규 표현식
       LHS   = “s/find/repl/” 명령어의 왼쪽 부분(“find” 부분)
       RHS   = “s/find/repl/” 명령어의 오른쪽 부분(“repl” 부분)
       nn+   = 버전 _nn_ 이상 (예: “15+” = 버전 1.5 이상)

   files: “files” 는 명령줄에 입력된 하나 이상의 파일 이름을 의미합니다. 파일 이름은 셸이 인식하는 모든 와일드카드(예: `zork*` 또는 `Aug[4-9].let`)를 포함할 수 있습니다. sed는 셸을 통해 전달된 각 파일 이름을 처리합니다.

   RE: 정규 표현식에 대한 자세한 내용은 아래 3.1.1절을 참조하십시오.

## 1.6. 출처 및 감사의 말

   이 FAQ에 담긴 아이디어 중 상당수는 다음 Awk FAQ에서 발췌한 것입니다:
 
       http://www.faqs.org/faqs/computer-lang/awk/faq/
       ftp://rtfm.mit.edu/pub/usenet/comp.lang.awk/faq

   그리고 구 버전의 Perl FAQ:

       http://www.perl.com/doc/FAQs/FAQ/oldfaq-html/index.html

   다음의 분들은 이 문서에 크게 기여하셨으며, 질문, 답변 및 스크립트 예제에 대한 의견과 문구 제안을 제공해 주셨습니다. 이 기여자분들께 감사를 표합니다
   (성씨 알파벳 순):

   Al Aab, Yiorgos Adamopoulos, Paolo Bonzini, Walter Briscoe, Jim
   Dennis, Carlos Duarte, Otavio Exel, Sven Guckes, Aurelio Jargas,
   Mark Katz, Toby Kelsey, Eric Pement, Greg Pfeiffer, Ken Pizzini,
   Niall Smart, Simon Taylor, Peter Tillier, Greg Ubben, Laurent
   Vogel.

## 1.7. 표준 면책 조항

   본 문서에 제시된 정보의 정확성을 보장하기 위해 진지한 노력을 기울였으나, 이 문서의 기여자 및 관리자는 오류가 전혀 없다고 주장하지 않으며, 제공된 정보에 대해 어떠한 보증도 하지 않습니다. 오류를 발견하신 경우, 수정할 수 있도록 저희에게 알려 주시기 바랍니다.

-----------------------------



# 2. 기본 SED

## 2.1. sed란 무엇인가?

   “sed” 는 Stream EDitor 의 약자입니다. sed는 비대화형 편집기로, 1973년 또는 1974년에 고(故) 리 E. 맥마혼(Lee E. McMahon)이 작성했습니다. sed의 기원에 대한 간략한 역사는 유닉스 도구의 초기 역사 문서인 <http://www.columbia.edu/~rh120/ch106.x09> 에서 확인할 수 있습니다.

   (워드 프로세서에서처럼) 화면 위에서 커서를 이동해서 파일을 직접 편집하는 대신, 사용자는 편집 명령이 담긴 스크립트와 편집할 파일 이름을 sed에 전달합니다(또는 편집할 텍스트가 파이프를 통해 입력될 수도 있습니다). 이런 의미에서 sed는 필터처럼 작동해서 문자, 단어, 텍스트 줄을 삭제, 삽입 및 변경합니다. 그 적용 범위는 작고 간단한 변경부터 매우 복잡한 변경에 이르기까지 다양합니다.

   sed는 stdin (유닉스에서 “표준 입력”, 즉 콘솔을 가리키는 약어)이나 파일(또는 둘 다)에서 입력을 읽고, 결과를 stdout (“표준 출력”, 보통 콘솔이나 화면)으로 보냅니다. 대부분의 사람들은 sed를 주로 치환 기능 때문에 사용합니다.
 
   Sed는 종종 찾기 및 바꾸기 도구로 사용됩니다.

     sed ‘s/Glenn/Harold/g’ oldfile >newfile

   이 명령은 파일 내 어디에 있든 “Glenn” 이 나타나는 모든 부분을 “Harold” 로 대체합니다. “찾기” 부분은 정규 표현식(“RE”)으로, 단순한 단어일 수도 있고 좀 더 큰 유연성을 위해 특수 문자를 포함할 수도 있습니다(예를 들어, “Glenn” 이 “Glennon” 과 일치하는 것을 방지하기 위해).

   제가 sed를 처음 사용한 것은 파일의 왼쪽 부분에 공백 8개를 추가하기 위해서였습니다. 그래야 파일을 출력할 때, 출력물이 종이 왼쪽 끝에서 시작되지 않도록 처리하기 위해서였습니다.

     sed ‘s/^/        /’ myfile >newfile   # 제 첫 번째 sed 스크립트
     sed ‘s/^/        /’ myfile | lp       # 그 다음 sed 스크립트

   그 후, sed를 사용하면 파일에서 “and where it came” 문구부터 시작해서 “for all people” 문구로 끝나는 단락 하나만 표시할 수 있다는 것을 알게 되었습니다.
 
   제 스크립트는 다음과 같았습니다:

     sed -n ‘/and where it came/,/for all people/p’ myfile

   sed의 일반적인 동작은 -n 스위치를 사용하지 않는 한, 수정되지 않은 부분을 포함해서 파일 전체를 출력(즉, 화면에 표시)하는 것입니다. “-n” 은 “no output(출력 없음)” 을 의미합니다. 이 스위치는 거의 항상 어딘가에 ‘p’ 명령과 함께 사용되며, 이는 지정된 파일 부분만 출력하라는 의미입니다. 'p' 명령과 함께 -n 스위치를 사용하면 파일의 일부만 출력(즉, 콘솔로 전송)할 수 있습니다.

   그 후, sed를 사용하면 파일의 (예를 들어) 12~18행만 표시하고 나머지는 표시하지 않을 수 있다는 것을 알게 되었습니다. 이는 긴 파일의 일부만 검토해야 하고 파일을 변경하고 싶지 않을 때 매우 유용했습니다.

     # 'p'는 print(출력)을 의미합니다.
     sed -n 12,18p myfile

   마찬가지로, sed는 디스크에 있는 파일을 물리적으로 변경하지 않고도 특정 줄을 제외한 나머지 모든 내용을 표시할 수 있습니다:

     # 'd'는 delete(삭제)를 의미합니다.
     sed 12,18d myfile

   Sed는 파일을 출력할 때, 단일 간격으로 작성된 파일을 이중 간격으로 변환할 수도 있습니다:

     sed G myfile >newfile

   삭제, 추가, 치환 같은 편집 명령이 여러 줄에 걸쳐 있을 경우, 해당 명령들을 별도의 파일에 담아, 그 파일에 포함된 모든 명령을 현재 편집 중인 파일에 적용할 수 있습니다:

     # 'script.sed' 는 명령어 파일입니다
     # 'myfile' 은 수정 대상 파일입니다
     sed -f script.sed myfile  # 'script.sed'는 명령어 파일입니다

   이 FAQ 파일을 본격적인 sed 튜토리얼로 만들려는 것은 아닙니다(좋은 튜토리얼은 2.3절을 참조하십시오). 오히려, 이 설명이 sed를 사용하는 방법에 대해 완전한 초보자에게 몇 가지 아이디어를 제공하기를 바랍니다.


## 2.2. sed에는 어떤 버전이 있으며, 어디서 구할 수 있습니까?

### 2.2.1. 무료 버전

   참고: “무료” 는 “퍼블릭 도메인” 을 의미하지 않으며, 반드시 비용을 지불하지 않아도 된다는 뜻도 아닙니다. 이 절에 소개된 CP/M 버전을 제외한 모든 sed 버전은 GNU 일반 공중 사용 허가서(GPL)를 기반으로 하며, 해당 기준에 따라 “자유 소프트웨어”입니다(자세한 내용은 http://www.gnu.org/philosophy/free-sw.html 참조). 이는 소스 코드를 입수해서 이를 기반으로 추가 개발할 수 있음을 의미합니다.

   이 카테고리에 나열된 URL에서 sed 바이너리나 소스 코드를 다운로드해서 요금이나 라이선스 비용 없이 사용할 수 있습니다.

#### 2.2.1.1. 유닉스 플랫폼

   ssed v3.60 
   ssed는 FAQ 관리자들이 권장하는 버전입니다. 이는 GNU sed와 동일한 코드베이스를 공유하고, 가장 많은 옵션을 제공하며, 자유 소프트웨어(소스 코드를 구할 수 있음)이기 때문입니다. 이전 버전의 ssed도 배포된 적이 있지만, 해당 버전을 제공하는 사이트는 목록에 포함되지 않았습니다.

       http://sed.sourceforge.net/grabbag/ssed
       http://freshmeat.net/project/sed/

   GNU sed v4.0.5
   이는 GNU sed의 최신 공식 버전입니다. 이 버전은 옵션 스위치를 통해 텍스트를 제자리에서 교체하는 기능을 제공합니다.

       ftp://ftp.gnu.org/pub/gnu/sed/sed-4.0.5.tar.gz
       http://freshmeat.net/project/sed

   BSD 멀티바이트 sed (일본어)
   멀티바이트 문자를 지원하는 최신 버전의 GNU sed를 기반으로 합니다.

       ftp://ftp1.freebsd.org/pub/FreeBSD/FreeBSD-stable/packages/Latest/ja-sed.tgz

   GNU sed v3.02.80
   ssed 및 GNU sed v4.0 개발의 기반이 된 알파 테스트 릴리스입니다.

       ftp://alpha.gnu.org/pub/gnu/sed/sed-3.02.80.tar.gz

   GNU sed v3.02a
   GNU sed v3.02.80의 대부분의 기능을 갖춘 중간 버전입니다.

   GNU sed v3.02
       ftp://ftp.gnu.org/pub/gnu/sed/sed-3.02.tar.gz

   사전 컴파일된 버전:

   GNU sed v3.02-8
   Debian GNU/Linux용 소스 코드 및 바이너리

       http://www.debian.org/Packages/stable/base/sed.html

   한동안 GNU 프로젝트 <http://www.gnu.org>는 에릭 S.레이먼드(Eric S. Raymond)가 개발한 sed 버전(ESR sed v1.1)을 사용했으나, 내제된 제한 사항이 너무 많다는 이유로 결국 이를 포기했습니다. 1991년 하워드 헬만(Howard Helman)은 GNU/ESR sed를 수정해서 여러 사이트에서 구할 수 있는 유연한 버전의 sed v1.5를 제작했습니다(헬만의 버전은 \<...\>를 사용해서 단어 경계를 구분하거나, \xHH 를 사용해서 16진수 코드를 입력하고, \n 을 사용해서 치환 문자열에서 줄 바꿈을 나타내는 등의 기능을 허용했습니다). 이 버전은 GNU 프로젝트에서 널리 채택되지 못했으며, GNU 버전의 sed는 비슷하면서도 다른 방향으로 발전해 왔습니다.

   에릭 스티븐 레이먼드(Eric Steven Raymond)의 sed v1.3 (1998년 6월 4일 출시)
 
       http://catb.org/~esr/sed-1.3.tar.gz

   에릭 레이먼드 <esr@snark.thyrsus.com> 는 sed의 초기 버전 중 하나를 작성했습니다. 그가 직접 작성하거나 개발에 참여한 수많은 프리웨어 유틸리티를 배포하는 그의 웹사이트 <http://www.catb.org/~esr/>에서 그는 sed v1.1을 다음과 같이 설명합니다:

   “이것은 원래 GNU 툴킷에 포함되어 배포되었으며, 현재도 Minix와 함께 배포되고 있는 빠르고 작은 sed입니다. 
   GNU 개발자들은 향상된 정규식 패키지를 기반으로 자체 sed를 개발하면서 이 버전을 버렸지만,
   여전히 일부 용도는 이 버전이 좀 더 낫습니다(특히 더 빠르고 메모리 사용량이 적습니다)." 
   (버전 1.3은 미확인 버그를 수정하고, 현재 패턴 공간을 16진수 덤프하는 L 명령어를 추가했습니다.)

#### 2.2.1.2. OS/2

   GNU sed v3.02.80
       http://www2s.biglobe.ne.jp/~vtgf3mpr/gnu/sed.htm

   GNU sed v3.02
       http://hobbes.nmsu.edu/pub/os2/util/file/sed-3_02-r2-bin.zip # 바이너리
       http://hobbes.nmsu.edu/pub/os2/util/file/sed-3_02-r2.zip     # 소스

#### 2.2.1.3. Microsoft Windows (Win3x, Win9x, WinNT, Win2K)

   GNU sed v4.0.5
   32비트 바이너리 및 문서. 사전 컴파일된 버전은 (아직) 제공되지 않습니다.

   GNU sed v3.02.80
   DJGPP 컴파일러를 사용한 32비트 바이너리 및 문서. 새로운 기능에 대한 자세한 내용은 위의 Unix 섹션을 참조하십시오.

       http://www.student.northpark.edu/pemente/sed/sed3028a.zip       # DOS 바이너리
       ftp://alpha.gnu.org/pub/gnu/sed/sed-3.02.80.tar.gz              # 소스
       ftp://ftp.simtel.net/pub/simtelnet/gnu/djgpp/v2gnu/sed3028b.zip # 바이너리
       ftp://ftp.simtel.net/pub/simtelnet/gnu/djgpp/v2gnu/sed3028d.zip # 문서
       ftp://ftp.simtel.net/pub/simtelnet/gnu/djgpp/v2gnu/sed3028s.zip # 소스

   GNU sed v2.05
   32비트 바이너리, 문서 없음. 80386 DX가 필요하며(SX에서는 실행되지 않음), Microsoft Windows 환경에서 DOS 창 또는 전체 화면 DOS 세션에서 실행해야 합니다. MS-DOS 모드(Win/Win95 외부)에서는 실행되지 않습니다. 최신 버전의 GNU sed를 사용하는 것을 권장합니다.
 
       http://www.simtel.net/pub/win95/prog/gsed205b.zip
       ftp://ftp.cdrom.com/pub/simtelnet/win95/prog/gsed205b.zip

   GNU sed v1.03
   Frank Whaley가 수정함.

   이 버전은 itribe.net 에서 호스팅하던 “Virtually UN*X” 툴셋의 일부였으나, 해당 웹사이트는 현재 폐쇄되었습니다. Gsed v1.03은 Win9x의 긴 파일 이름은 물론, 16진수, 10진수, 2진수, 8진수 문자 표현을 지원했습니다.

   Cygwin 툴킷:
       http://www.cygwin.com

   이전에는 “GNU-Win32 도구” 로 알려졌습니다. 홈페이지에 따르면, “Cygwin 도구는 Windows NT, 95 및 98용으로 인기 있는 GNU 개발 도구를 Win32 환경으로 이식한 것입니다. 이 도구들은 Win32 API 위에 UNIX와 유사한 API를 제공하는 Cygwin 라이브러리를 통해 작동합니다.” 사용된 sed 버전은 GNU sed v3.02입니다.

   Minimalist GNU for Windows (MinGW):
 
       http://www.mingw.org
       http://mingw.sourceforge.net

   홈페이지에 따르면, “MinGW(‘Minimalist GNU for Windows’) 는 GNU GCC 및 binutils 프로젝트를 기반으로 한 컴파일러 시스템을 빌드하는 데 사용되는 런타임 헤더 모음을 가리킵니다. 이는 Win32 플랫폼에서 실행될 코드를 컴파일하고 링크합니다. MinGW는 Windows 운영 체제와 함께 배포되는 Microsoft 런타임 라이브러리를 사용합니다." 사용된 sed 버전은 GNU sed v3.02입니다.

   Howard Helman의 sed v1.5 (일명 HHsed)
   위에서 설명한 32비트 환경용 Mingw32로 컴파일되었습니다. 이 버전은 Win95의 긴 파일 이름을 지원해야 합니다.
 
       http://www.dbnet.ece.ntua.gr/~george/sed/OLD/sed15.exe
       http://www.student.northpark.edu/pemente/sed/sed15exe.zip

#### 2.2.1.4. MS-DOS

   sed v1.6 (HHsed에서 제공), Walter Briscoe 제작
   이 버전은 출시 예정이며 현재 베타 테스트 중이지만, 많은 새로운 기능을 갖추고 있습니다. sed v1.5의 모든 버그를 수정하고, sedmod v1.0(아래 참조)의 가장 뛰어난 기능들을 추가했습니다. MS-DOS용 16비트 및 32비트 컴파일된 버전으로 제공됩니다. 죄송하지만, 아직 URL은 제공되지 않습니다.

   sed v1.5 (일명 HHsed), Howard Helman 제작
   컴파일되지 않은 소스 코드 (Turbo C)
 
       ftp://ftp.simtel.net/pub/simtelnet/msdos/txtutl/sed15.zip
       ftp://ftp.cdrom.com/pub/simtelnet/msdos/txtutl/sed15.zip

   DOS 실행 파일 및 설명서
 
       ftp://ftp.simtel.net/pub/simtelnet/msdos/txtutl/sed15x.zip
       ftp://ftp.cdrom.com/pub/simtelnet/msdos/txtutl/sed15x.zip

   sedmod v1.0, Hern Chen 제작
 
       http://www.ptug.org/sed/SEDMOD10.ZIP
       http://www.student.northpark.edu/pemente/sed/sedmod10.zip
       ftp://garbo.uwasa.fi/pc/unix/sedmod10.zip

   GNU sed v3.02.80
   위의 2.2.1.3절(“Microsoft Windows”)을 참조하십시오.

   GNU sed v2.05
   MS-DOS에서는 실행되지 않습니다.

   GNU sed v1.18
   DJGPP 컴파일러를 사용해서 제작된 32비트 바이너리 및 소스 코드. 80386 SX 이상 프로세서가 필요합니다. 또한 경로에 3개의 CWS*.EXE 확장 프로그램이 있어야 합니다. 아래 5.5절(“CSDPMI*B.ZIP이란 무엇이며 왜 필요한가요?”)을 참조하십시오. 좀 더 최신 버전의 GNU sed를 사용하는 것을 권장합니다.
 
       http://www.simtel.net/pub/simtelnet/gnu/djgpp/v2gnu/sed118b.zip
       ftp://ftp.cdrom.com/pub/simtelnet/gnu/djgpp/v2gnu/sed118b.zip
       http://www.simtel.net/pub/simtelnet/gnu/djgpp/v2gnu/sed118s.zip
       ftp://ftp.cdrom.com/pub/simtelnet/gnu/djgpp/v2gnu/sed118s.zip

   GNU sed v1.06
   16비트 바이너리 및 소스 코드. 모든 MS-DOS 시스템에서 실행될 것입니다.
 
       http://www.simtel.net/pub/gnu/gnuish/sed106.zip
       ftp://ftp.cdrom.com/pub/simtelnet/gnu/gnuish/sed106.zip

#### 2.2.1.5. CP/M

   ssed v2.2, 작성자: Chuck A. Forsberg
   CP/M용으로 작성된 ssed(“small/stupid stream editor”의 약자) 는 a(추가), c(변경), d(삭제) 및 i(삽입) 옵션만 지원하며, 정규 표현식은 지원하지 않는 것으로 보입니다. -u 스위치는 압축된 파일을 “압축 해제” 하며, 주로 소스 코드 관리를 위해 DIF.COM 과 함께 사용되었습니다. (파일: ssed22.lbr)

   change, Michael M. Rubenstein 作
   Rubenstein은 CHANGE.COM 이라는 이름의 sed 버전을 출시했습니다(TTOOLS.LBR 아카이브에 포함된 CHANGE.CZM은 “압축된” 파일입니다). CHANGE.COM은 그룹화 및 역참조를 제외한 모든 정규 표현식을 지원하며, 유일한 기능은 전역 치환입니다. (파일: ttools.lbr)

#### 2.2.1.6. Macintosh v8 또는 v9

   sed는 명령줄 유틸리티이므로, Mac에서 sed를 사용한다고 생각하는 것은 흔하지 않습니다. 그럼에도 불구하고, 다음은 Aurelio Jargas가 제공한 지침으로, MacOS 버전 8 또는 9에서 sed를 실행하는 과정을 설명하고 있습니다.

   (1) Apple DiskCopy 애플리케이션을 다운로드해서 설치합니다.

       ftp://ftp.apple.com/developer/Development_Kits

   (2) Apple MPW를 다운로드해서 설치합니다.

       ftp://ftp.apple.com/developer/Tool_Chest/Core_Mac_OS_Tools/MPW_etc./

   (3) Matthias Neeracher가 제작한 MPW용 GNU sed를 다운로드해서 압축을 풉니다. (sed 파일 번호가 잘못 매겨진 것 같습니다.)

       ftp://sunsite.cnlab-switch.ch/software/platform/macos/src/mpw_c/sed-2.03.sit.bin

   (4) sed-3.02 디렉터리로 이동해서 ‘sed’ 파일을 더블클릭하세요.

   (5) MPW 셸이 열립니다. 명령줄 대신 명령 창이 표시되겠지만, sed는 예상대로 작동할 것입니다. 예를 들어:

       echo aa | sed ‘s/a/Z/g’<ENTER>

   iMac의 경우 ENTER 키와 RETURN 키가 다르다는 점에 유의하십시오. Apple은 *또한* MPW용 자체 sed 버전인 “StreamEdit” 를 제공하며, 이 프로그램의 구문은 일반 sed와 상당히 유사합니다.


### 2.2.2. 셰어웨어 및 상용 버전

#### 2.2.2.1. 유닉스 플랫폼

       [ 추가 정보 필요. ]

#### 2.2.2.2. OS/2

   Hamilton Labs:
       http://www.hamiltonlabs.com/cshell.htm

   OS/2용으로 설계된 방대한 유닉스/C 셸 유틸리티 모음입니다. 가격은 미국 내 350달러, 그 외 지역 395달러이며, FedEx 배송, 무조건적 보증, 무제한 지원 및 무료 업데이트가 포함됩니다. 이 제품군의 데모 버전은 이 사이트에서 다운로드할 수 있지만, sed의 독립 실행형 버전은 제공되지 않습니다.

#### 2.2.2.3. Windows 95/98, Windows NT, Windows 2000

   Hamilton Labs:
       http://www.hamiltonlabs.com/cshell.htm

   Win9x, WinNT 및 Win2K용으로 설계된 방대한 유닉스/C 셸 유틸리티 모음입니다. 가격은 미국 내 $350, 기타 지역 $395이며, FedEx 배송, 무조건 보증, 무제한 지원 및 무료 업데이트가 제공됩니다. 이 사이트에서 제품군의 데모 버전을 다운로드할 수 있지만, 독립 실행형 sed 버전은 제공되지 않습니다.

   Interix:
       http://www.interix.com

   Interix(이전 명칭: OpenNT)는 “Microsoft Windows NT에서 네이티브로 실행되는 완전한 UNIX 시스템 환경”으로 홍보되며, Softway Systems에서 라이선스를 부여하고 지원을 제공합니다. 이 제품은 200개 이상의 유닉스 유틸리티를 제공하며, 유닉스 셸, 소켓, 네트워킹 등을 지원합니다. 단일 사용자 버전의 가격은 약 200달러입니다. 무료 데모 또는 평가판은 31일간 실행된 후 종료되며, 계속 사용하려면 상용 버전을 구매해야 합니다.

   MKS NuTCRACKER Professional
       http://www.datafocus.com/products/nutc/

   MKS(Mortice Kern
   Systems, 아래 참조)에서 제공하는, 별개이면서도 관련이 있는 제품군입니다. 다소 어색한 철자인 “NuTCRACKER”는 의도된 것입니다. 다양한 패키지를 통해 Win32
   환경용 수백 가지의 유닉스 유틸리티를 제공합니다. Sed는 별도의 제품으로 제공되지 않습니다.

   UnixDos:
       http://www.unixdos.com

   UnixDos는 Windows 환경으로 포팅된 82개의 유닉스 유틸리티 모음입니다. Win3.x용 16비트 버전과 WinNT/Win95용 32비트 버전이 있습니다. 처음 30일 동안은 기능이 제한되지 않은 셰어웨어로 배포됩니다. 시험 기간이 지나면 유틸리티가 실행되지 않으며, 50달러의 등록비를 지불해야 합니다.

   이 버전의 sed는 표현식의 우측(RHS)에서 “\n” 을 지원하며, 입력 줄의 길이를 10,000자로 늘려줍니다. 소유자와의 특별 협약에 따라, *오직* sed 라이선스 버전만(다른 유틸리티 없이) 원하시는 분은 10달러의 라이선스 비용을 지불하시면 됩니다.

   U/WIN:
       http://www.research.att.com/sw/tools/uwin/

   U/WIN은 WinNT 및 Win95 시스템용으로 개발된 유닉스 유틸리티 모음입니다. 이 소프트웨어는 AT&T가 소유하고 있으며, 데이비드 콘(Unix korn 셸의 개발자)이 제작했습니다. 교육 기관, AT&T 직원 또는 특정 연구자에게만 무료로 배포되며, 그 외의 모든 사용자는 90일 평가 기간이 만료된 후 사용료를 지불해야 합니다. U/WIN은 NTFS(WinNT 파일 시스템)에서 가장 원활하게 작동하지만, FAT 파일 시스템에서는 성능이 저하된 모드로, Win95 환경에서는 더 낮은 성능의 모드로 실행됩니다. 최소 설치 시 약 25~30메가바이트의 디스크 공간이 필요합니다. Sed는 별도의 파일로 다운로드할 수 없지만, 이 유틸리티 모음에 포함되어 제공됩니다.

#### 2.2.2.4. MS-DOS

   Mix C/Utilities Toolchest
       http://www.mixsoftware.com/product/utility.htm

   해당 웹 페이지에 따르면, “C/Utilities Toolchest 는 MS-DOS 운영 체제에 40개 이상의 강력한 UNIX 유틸리티를 추가합니다. 그 결과, UNIX 운영 체제와 매우 유사한 환경이 조성되며, 동시에 MS-DOS 프로그램 및 명령어와 100% 호환됩니다." 이 툴체스트의 가격은 19.95달러이며, 소스 코드는 추가 비용을 지불해야 이용할 수 있습니다. Mix C의 sed 버전은 별도로 제공되지 않습니다.

   MKS (Mortice Kern Systems) 툴킷
       http://www.mks.com

   Sed는 MKS Toolkit 에 포함되어 제공되며, 이 툴킷은 상용 소프트웨어로만 배포되므로 별도로 구할 수 없습니다.

   Thompson Automation Software
       http://www.tasoft.com

   Thompson Toolkit은 Unix Korn 셸 버전을 포함해서 100개가 넘는 친숙한 Unix 유틸리티가 포함되어 있습니다. 이 툴킷은 MS-DOS, OS/2, Win3.x, Win9x 및 WinNT에서 실행됩니다. sed도 이 유틸리티 중 하나이지만, Thompson은 DOS용 awk 버전인 TAWK로 더 잘 알려져 있습니다. 이 툴킷의 가격은 약 150달러이며, sed는 별도로 제공되지 않습니다.


## 2.3. sed 사용법은 어디서 배울 수 있나요?

### 2.3.1. 서적

       _Sed & Awk, 제2판_, Dale Dougherty & Arnold Robbins 지음
       (캘리포니아주 세바스토폴: O'Reilly and Associates, 1997)
       ISBN 1-56592-225-5
       http://www.oreilly.com/catalog/sed2/noframes.html

   이 책의 대략 40%는 sed에, 50% 정도는 awk에 할애되어 있습니다. 나머지 10%는 정규 표현식과 두 도구 모두에 공통된 개념을 다룹니다. 종이책을 선호하신다면, 이 책은 sed의 고급 기능을 포함해서 sed 사용법을 배우기에 단연 최고의 자료입니다.

   초판도 매우 유용합니다. 초판의 첫 인쇄본은 몇 가지 오타가 섞여 있습니다(하지만 튜토리얼을 꼼꼼히 따라가다 보면 금방 알아차릴 수 있을 것입니다). _sed & awk_ 초판의 오류 목록은 <http://www.cs.colostate.edu/~dzubera/sedawk.txt> 에서 확인할 수 있으며, 제2판의 오류는 <http://www.cs.colostate.edu/~dzubera/sedawk2.txt> 에 나와 있습니다. 다만 이들 중 대부분은 이후 인쇄판에서 수정되었습니다. 제2판은 POSIX 표준이 이러한 도구에 어떤 영향을 미쳤는지 설명하고,
   널리 사용되는 GNU 버전의 sed와 awk에 대해서도 다룹니다. 가격은 약 (미국) $30.00입니다.

   -----

       _Mastering Regular Expressions, 2판,_ 저자: Jeffrey E. F. Friedl
       (캘리포니아주 세바스토폴: O'Reilly and Associates, 2002)
       ISBN 0-596-00289-0
       http://regex.info
       http://www.oreilly.com/catalog/regex2/
       http://public.yahoo.com/~jfriedl/regex/ (제1판)

   “정규 표현식” 을 사용하는 방법을 안다는 것은 대부분의 유닉스 도구를 효과적으로 활용하는 데 필수적입니다. 이 책은 perl, vi, emacs, awk 같은 유틸리티에서 정규 표현식을 가장 효과적으로 구현하는 방법에 중점을 두지만, sed도 다루고 있습니다. 프리들(Friedl)의 홈페이지(위)에는 학습자들이 정규 표현식을 숙달하는 데 도움이 되는 다른 사이트들로 연결되는 링크가 있습니다. 또한 그의 사이트에는 정규 표현식을 사용해서 구문적으로 유효한 이메일 주소를 판별하는 Perl 스크립트도 제공됩니다:

       http://public.yahoo.com/~jfriedl/regex/code.html

   -----

       _Awk und Sed_, 헬무트 헤롤트 지음.
       (본: 애디슨-웨슬리, 1994; 288쪽)
       제2판은 2003년 3월에 출간 예정
       ISBN 3-8273-2094-1
       http://www.addison-wesley.de/main/main.asp?page=home/bookdetails&ProductID=37214

### 2.3.2. 메일링 리스트

   sed에 대해 좀 더 자세히 알고 싶으신 분(구문, 정규 표현식 사용법 등)에 대해 자세히 알고 싶으시면, sed 관련 메일링 리스트에 가입하시기 바랍니다. 실제로 sed에 관한 메일링 리스트는 두 개가 있습니다. 하나는 SvenGuckes가 관리하는 영어 메일링 리스트 “sed-users” 이고, 다른 하나는 Aurelio Marinho Jargas가 관리하는 포르투갈어 메일링 리스트 “sed-BR”(sed-Brazil의 약자)입니다. “sed-users”의 평균 메일 발송량은 주당 약 35건이며, “sed-BR”의 평균 메일 발송량은 주당 약 15건입니다.

       sed-BR 메일링 리스트:    http://br.groups.yahoo.com/group/sed-br/
       sed-users 메일링 리스트: http://groups.yahoo.com/group/sed-users/

   sed-users에 가입하려면 다음 주소로 빈 이메일을 보내십시오:

       sed-users-subscribe@yahoogroups.com

   sed-users에서 탈퇴하려면 다음 주소로 빈 이메일을 보내십시오:

       sed-users-unsubscribe@yahoogroups.com

### 2.3.3. 튜토리얼, 전자 텍스트

   Lee E. McMahon이 집필한 sed의 원본 사용자 매뉴얼로,『UNIX 매뉴얼』 제7판(1978)에 수록된 것으로, 고전적인 “Kubla Khan” 예제와 튜토리얼이 포함되어 있으며, 서식 지정된 텍스트 형식으로 제공됩니다:
 
       http://sed.sourceforge.net/grabbag/tutorials/sed_mcmahon.txt

   앞서 소개한 설명서의 소스 코드입니다. 이 파일을 올바르게 출력하려면 “troff -ms sed” 를 사용하십시오:
 
   http://plan9.bell-labs.com/7thEdMan/vol2/sed
   http://cm.bell-labs.com/7thEdMan/vol2/sed

   “Do It With Sed”, 저자: Carlos Duarte
 
       http://www.dbnet.ece.ntua.gr/~george/sed/OLD/sedtut_1.html

   “Sed: 파일을 자동으로 수정하는 특수 편집기인 sed 사용법”,
   저자: Bruce Barnett 및 General Electric Company
 
       http://www.grymoire.com/Unix/Sed.html

   U-SEDIT2.ZIP, 마이크 아스트(Mike Arst) 저 (1990년 6월 16일)
 
       ftp://ftp.cs.umu.se/pub/pc/u-sedit2.zip
       ftp://ftp.uni-stuttgart.de/pub/systems/msdos/util/unixlike/u-sedit2.zip
       ftp://sunsite.icm.edu.pl/vol/wojsyl/garbo/pc/editor/u-sedit2.zip
       ftp://ftp.sogang.ac.kr/pub/msdos/garbo_pc/editor/u-sedit2.zip

   U-SEDIT3.ZIP, Mike Arst 저 (1992년 1월 24일)
 
       http://www.student.northpark.edu/pemente/sed/u-sedit3.zip
       CompuServe DTPFORUM, “PC DTP Utilities” 라이브러리, SEDDOC.ZIP 파일

   또 다른 sed FAQ
 
       http://www.dreamwvr.com/sed-info/sed-faq.html

   sed-tutorial, Felix von Leitner 저
 
       http://www.math.fu-berlin.de/~leitner/sed/tutorial.html

   SCO OpenServer
   “운영 체제 사용자 가이드” 제14장 “sed를 이용한 텍스트 조작”
 
       http://ou800doc.caldera.com/SHL_automate/CTOC-Manipulating_text_with_sed.html


   “UNIX 환경에서 언어 분석을 위한 Bourne 셸, sed 및 awk의 결합”
   저자: Lothar Schmitt 및 Kiel Christianson.
   Bourne 셸, sed 및 awk에 대한 이 기본 튜토리얼은 71페이지 분량의 PostScript 파일(gzip으로 압축 시 290K)로 다운로드할 수 있습니다. 파일을 얻으려면
   루트 디렉터리에서 아래로 이동해야 할 수도 있습니다.
 
       ftp://ftp.u-aizu.ac.jp/u-aizu/doc/Tech-Report/1997/97-2-007.tar.gz
       Lothar Schmitt <lothar@u-aizu.ac.jp>에게 요청 시 제공됩니다.

2.3.4. 일반적인 웹 및 FTP 사이트

       http://sed.sourceforge.net/grabbag             # 스크립트 모음
       http://main.rtfiber.com.tw/~changyj/sed/       # Yao-Jen Chang
       http://www.math.fu-berlin.de/~guckes/sed/      # Sven Guckes
       http://www.math.fu-berlin.de/~leitner/sed/     # Felix von Leitner
       http://www.dbnet.ece.ntua.gr/~george/sed/      # Yiorgos Adamopoulos
       http://www.student.northpark.edu/pemente/sed/  # Eric Pement

       http://spacsun.rice.edu/FAQ/sed.html
       ftp://algos.inesc.pt/pub/users/cdua/scripts.tar.gz (sed 및 셸 스크립트)

   “Sed를 위한 유용한 한 줄 명령어 모음”, 에릭 페먼트(Eric Pement) 편. 명령줄에서 실행할 수 있는 한 줄짜리 sed 명령어 목록입니다.
 
       http://sed.sourceforge.net/sed1line.txt
       http://www.student.northpark.edu/pemente/sed/sed1line.txt

   “Handy One-Liners For Sed”, 포르투갈어로 번역됨
 
       http://wmaker.lrv.ufsc.br/sed_ptBR.html

   단일 유닉스 사양, 버전 3 (기술 매뉴얼 페이지)
 
       http://www.opengroup.org/onlinepubs/007904975/utilities/sed.html

   sed 시작하기
 
       http://www.cs.hmc.edu/tech_docs/qref/sed.html

   masm에서 gas로 변환기
 
       http://www.delorie.com/djgpp/faq/converting/asm2s-sed.html

   mail2html.zip
 
       http://www.crispen.org/src/#mail2html

   배치 파일 및 스크립트에서 sed를 사용한 예시 (Benny Pederson)
 
       http://users.cybercity.dk/~bse26236/batutil/help/SED.HTM

   dc.sed - 지금까지 작성된 것 중 가장 복잡하고 인상적인 sed 스크립트.
   Greg Ubben이 작성한 이 sed 스크립트는 유닉스 dc(데스크 계산기)를 에뮬레이트하며, 기수 변환, 지수 연산, 제곱근 계산 등 다양한 기능을 포함하고 있습니다.
 
       http://sed.sourceforge.net/grabbag/scripts/dc_overview.htm

   이 문서에 추가되어야 할 다른 튜토리얼이나 스크립트를 발견하신다면, 해당 URL을 FAQ 관리자에게 전달해 주시기 바랍니다.

------------------------------




# 3. 기술적 사항

## 3.1. 기본 sed에 대한 보다 자세한 설명

   sed는 편집 명령으로 구성된 스크립트를 받아, 각 명령을 순서대로 입력의 각 줄에 적용합니다. 모든 명령이 입력의 첫 번째 줄에 적용된 후, 해당 줄이 출력됩니다. 그런 다음 두 번째 입력 줄을 가져와 처리하고, 이 과정이 반복됩니다. sed 스크립트는 줄 번호를 사용하거나 해당 줄에서 /RE 패턴/ 과 일치하는 부분을 찾아 단일 줄을 지정할 수 있습니다. 정규식 (‘/RE/!’) 또는 줄 번호 뒤에 느낌표 '!' 를 붙이면 해당 주소와 일치하지 않는 모든 줄이 선택됩니다. 또한 sed는 쉼표를 사용해서 두 주소를 구분함으로써 동일한 방식으로 줄 범위를 지정할 수도 있습니다.

     $d               # 파일 마지막 줄 삭제
     /[0-9]\{3\}/p    # 연속된 3자리 숫자가 포함된 줄 출력
     5!s/ham/cheese/  # 5번째 줄을 제외하고, 'ham' 을 'cheese' 로 치환
     /awk/!s/aaa/bb/  # 'awk' 가 발견되지 않는 경우, 'aaa' 를 'bb' 로 치환
     17,/foo/d        # 17번째 줄부터 'foo' 까지의 모든 줄을 삭제합니다

   주소나 주소 범위 뒤에는 sed가 중괄호 '{...}' 를 허용하므로, 해당 줄이나 주소 범위에 일치하는 줄들에 여러 명령을 적용할 수 있습니다. 명령줄에서는 세미콜론 ';' 이 각 명령을 구분하며, 닫는 중괄호 앞에 반드시 와야 합니다.

     sed ‘/Owner:/{s/yours/mine/g;s/your/my/g;s/you/me/g;}’ file

   범위 주소는 사용하는 sed 버전에 따라 작동 방식이 다릅니다(아래 3.4절 참조). sed 사용에 대한 자세한 내용은 위 2.3절의 참고 문헌을 참조하십시오.

### 3.1.1. “s///” 왼쪽에 사용되는 정규 표현식

   모든 버전의 sed는 기본 정규 표현식(BRE)을 지원합니다. BRE 구문은 유닉스 셸 프롬프트에서 “man ed” 를 입력합니다. IEEE POSIX 1003.1-2001 및 Single UNIX Specification Version 3에 기반한 BRE에 대한 기술적 설명은 다음 웹사이트에서 확인할 수 있습니다:
 
   http://www.opengroup.org/onlinepubs/007904975/basedefs/xbd_chap09.html#tag_09_03

   sed는 일반적으로 BRE를 지원하며, 여기에 패턴 공간 내의 줄바꿈을 일치시키기 위한 ‘\n' 과, ’/RE/‘ 와 동등한 ’\xREx' 를 지원합니다. 여기서 'x' 는 줄바꿈이나 다른 백슬래시 이외의 임의의 문자를 의미합니다.

   일부 sed 버전은 BRE의 상위 집합인 “확장 정규 표현식” (ERE)을 지원하며, 이를 통해 유연성을 높이기 위한 추가 메타문자를 제공합니다. GNU sed의 확장 정규 표현식에 대한 자세한 내용은 아래 3.7절("정규 표현식에 대한 GNU/POSIX 확장“) 및 6.7.3절(”정규 표현식의 특수 구문")을 참조하십시오.

   BRE에서 필수 사항이 아니지만, 일부 sed 버전은 \t 를 탭(TAB)으로, \r 을 캐리지 리턴으로, \xHH 를 16진수 코드의 직접 입력으로 나타내는 등을 지원합니다. 다른 버전의 sed는 이를 지원하지 않습니다.

   ssed(super-sed)는 LHS 패턴 매칭을 위한 많은 새로운 기능을 도입했는데, 그 수가 너무 많아서 여기서 모두 나열할 수 없습니다. 전체 목록은 아래 6.7.3.H절(“ssed”)에서 확인할 수 있습니다.

### 3.1.2. “s///” 우측에 있는 이스케이프 문자

   “s/find/replace/” 에서 우측(치환 부분)은 거의 항상 문자열 리터럴이며, 다음 메타문자의 보간은 이루어지지 않습니다:

   .   ^   $   [   ]   {   }   (   )  ?   +   *   |

   세 가지 항목은 *확실히* 삽입됩니다: 앰퍼샌드(&), 역참조, 그리고 특수 sed 명령어의 옵션입니다. 우측에 있는 앰퍼샌드는 좌측에서 일치된 전체 표현식으로 대체됩니다. 다음과 같이 그룹화를 사용할 이유는 _절대_ 없습니다:

       s/\(some-complex-regex\)/one two \1 three/

   대신 다음과 같이 처리할 수 있기 때문입니다:

       s/some-complex-regex/one two & three/

   우측(RHS)에 리터럴 앰퍼샌드를 입력하려면 \& 를 입력하십시오.

   그룹화와 역참조: 모든 버전의 sed는 좌측(LHS)에 그룹화와 역참조를 지원하며, 우측(RHS)은 역참조만 지원합니다. 그룹화를 사용하면 일련의 문자를 하나의 집합으로 묶을 수 있으며, \( 와 \) 를 사용해서 집합의 경계를 지정합니다. 그런 다음 해당 집합을 특정 횟수만큼 반복하도록 지정할 수 있습니다.

       \(이렇게\)*   또는   \(이렇게\)\{5,7\}

   그룹은 “\(like \(this\) is here\)” 같이 중첩될 수 있으며, 유효한 정규 표현식(RE)을 포함할 수 있습니다. 역참조는 각 해당 그룹에 대해 백슬래시와 숫자(1-9)를 사용해서 특정 그룹의 내용을 반복합니다. 즉, “/\(pom\)\1/” 은 “/pompom/” 을 다른 방식으로 표기한 것입니다. 그룹이 중첩된 경우, 역참조 번호는
   \( 기호를 엄격하게 왼쪽에서 오른쪽으로 순서대로 일치시켜 계산됩니다. 따라서, /..\(the \(word\)\) \(“foo”\)../ 는 역참조 \3 과 일치합니다. 역참조는 왼쪽 식(LHS), 오른쪽 식(RHS) 및 일반 정규 표현식 주소 지정에서 사용할 수 있습니다(3.3절 참조). 따라서,

       /\(.\)\1\(.\)\2\(.\)\3/;      # “bookkeeper”와 일치
       /^\(.\)\(.\)\(.\)\3\2\1$/;    # 6글자 팔린드롬을 찾음

   Seds는 대응하는 그룹이 존재하지 않는 유효하지 않은 역참조를 처리하는 방식이 다릅니다. 리터럴 앰퍼샌드나 백슬래시를 RHS에 삽입하려면, 그 앞에 백슬래시를 붙여야 합니다: \& 또는 \\

   ssed, sed16 및 sedmod는 RHS에서 추가 옵션을 허용합니다. 이들 모두는 치환 문자열의 일부를 대문자 (\u 또는 \U), 소문자 (\l 또는 \L) 또는 대소문자 변환 없음 (\E) 으로 변경하는 기능을 지원합니다. sed16과 sedmod 모두 awk 스타일의 단어 참조($1, $2, $3, ...)와 변환 전 전체 줄을 삽입하는 $0 을 지원합니다.

     echo ab ghi | sed16 “s/.*/$0 - \U$2/”   # “ab ghi - GHI”를 출력합니다

   *참고:* sed16 및 sedmod의 이 기능은 오른쪽 표현식(RHS)에 달러 기호와 숫자를 포함하는 sed 스크립트의 작동을 방해합니다. 비록 이런 조합이 드물긴 하지만,
   다른 사람이 작성한 스크립트를 사용할 때는 이런 점을 기억해 두는 것이 좋습니다.

### 3.1.3.  치환 스위치

   표준 버전의 sed는 “s///” 명령어 끝에 추가할 수 있는 4가지 플래그 또는 스위치를 지원합니다. 이들은 다음과 같습니다:

       N      - 왼쪽 인수(LHS)에서 패턴과 일치하는 N번째 항목을 치환합니다. 여기서 N 은 1에서 512 사이의 정수입니다. N 이 생략되면, 기본적으로 첫 번째 일치 항목만 치환됩니다.
       g      - 패턴과 일치하는 모든 부분을 전역적으로 치환합니다.
       p      - -n 스위치가 사용된 경우에도 결과를 stdout으로 출력합니다.
       w 파일 - 치환이 수행된 경우 패턴 공간을 '파일' 에 기록합니다. 스크립트 실행 시 파일이 이미 존재하면 덮어씁니다. 스크립트 실행 중에는 각 일치 항목마다 w 가 파일에 내용을 추가합니다.

   GNU sed 3.02와 ssed는 대소문자를 구분하지 않는 일치를 수행하기 위한 /I 스위치도 제공합니다. 예를 들어,

     echo ONE TWO | gsed “s/one/unos/I”      # “unos TWO”를 출력합니다

   GNU sed 4.x와 ssed는 여러 줄로 된 패턴을 다루는 작업을 단순화하기 위해 /M 스위치가 추가되었습니다. 이 스위치를 사용하면 ^ 또는 $ 가 줄 시작(BOL) 또는 줄 끝(EOL)과 일치합니다.

   \` 와 \' 는 각각 패턴 영역의 시작과 끝을 일치시키는 데 계속 사용할 수 있습니다.

   ssed는 Perl 모드를 사용할 때 /S 와 /X 두 가지 스위치를 추가로 지원합니다. 이에 대한 자세한 내용은 아래 6.7.3.H절에서 설명합니다.

### 3.1.4. 명령줄 스위치

   모든 버전의 sed는 -e 및 -n 두 가지 스위치를 지원합니다. sed는 일반적으로 여러 명령을 세미콜론으로 구분하지만(예: “H;d;”), 특정 명령은 세미콜론을 명령 구분자로 사용할 수 없습니다. 여기는 :labels, ‘t’, 'b' 가 포함됩니다. 이런 명령은 스크립트에서 가장 마지막에 위치해야 하며, -e 옵션 스위치로 구분되어야 합니다. 예를 들어:

     # 'ta'는 마지막 s///가 참을 반환할 경우 레이블 :a로 점프함을 의미합니다.
     sed -e :a -e ‘$!N;s/\n=/ /;ta’ -e ‘P;D’ file

   -n 스위치는 모든 줄을 출력하는 sed의 기본 동작을 비활성화합니다. -n 을 사용하면 명시적으로 지시한 경우만 줄을 출력합니다. 또한 특정 버전의 sed는 외부 스크립트의 첫 두 문자가 “#n” 으로 시작할 경우, 출력이 억제됩니다(마치 명령줄에서 -n 을 입력한 것과 똑같이). 해당 버전 목록은 아래 6.7.2절에 나와 있습니다.

   GNU sed 4.x와 ssed는 추가적인 스위치를 지원합니다. -l(소문자 L) 뒤에 숫자를 붙이면 ‘l’ 및 ‘L’ 명령의 기본 길이를 조정할 수 있습니다(이 sed 구현체들은 또한 각 명령이 실행될 때마다 길이를 개별적으로 조정할 수 있도록 해당 명령에 인수를 지원하는 점에 유의하십시오).

  -i 는 제자리 편집(in-place)을 활성화합니다(아래 4.41.1절 참조). -s 는 각 파일을 별도의 스트림으로 취급합니다. sed는 기본적으로 모든 파일을 결합하므로, $ 는 마지막 파일의 마지막 줄을 나타내고, 15는 결합된 스트림의 15번째 줄을 의미하며, /abc/,/def/ 는 여러 파일에 걸쳐 일치할 수 있습니다.

   그러나 -s 를 사용할 경우 모든 주소는 단일 파일을 가리킵니다. 예를 들어, $ 는 각 입력 파일의 마지막 줄을 나타내고, 15 는 각 입력 파일의 15번째 줄을 의미하며, /abc/,/def/ 는 “재설정” 됩니다(즉, sed는 명령을 실행하지 않고 /abc/ 를 다시 검색하지 않습니다). -i 옵션을 사용하면 주소에 대한 이런 해석이 자동으로 활성화된다는 점에 유의하십시오.


## 3.2. 일반적인 한 줄 sed 스크립트

   70개가 넘는 유용한 “한 줄” sed 명령어를 다룬 별도의 문서는 다음 주소에서 확인할 수 있습니다.
 
       http://sed.sourceforge.net/sed1line.txt

   다음은 한 줄로 사용할 수 있는 몇 가지 일반적인 sed 명령어입니다. MS-DOS 사용자는 예제의 작은따옴표(‘...’)를 큰따옴표(“...”)로 대체해야 합니다. 일반적으로 스크립트 뒤에 구체적인 파일명이 따라오지만, 파이프나 리디렉션을 통해 입력을 받을 수도 있습니다.

   # 파일의 줄 간격을 두 배로 늘리기
   sed G file

   # 파일의 줄 간격을 세 칸으로 늘리기
   sed ‘G;G’ file

   # UNIX에서 DOS 줄바꿈(CR/LF)을 Unix 형식으로 변환
   sed ‘s/.$//’ file           # 모든 줄이 CR/LF로 끝난다고 가정
   sed ‘s/^M$//’ file          # bash/tcsh에서 Ctrl-V를 누른 다음 Ctrl-M을 누릅니다

   # DOS 환경에서 유닉스 줄바꿈(LF)을 DOS 형식으로 변환
   sed ‘s/$//’ file            # 방법 1
   sed -n p file               # 방법 2

   # 각 줄의 맨 앞에서 공백(공백/탭) 제거
   # (이렇게 하면 모든 텍스트가 왼쪽 정렬됩니다). '^t'는 실제 탭 문자를 나타냅니다. 
   # bash 또는 tcsh 는 Ctrl-V 를 누른 다음 Ctrl-I 를 누릅니다.
   sed ‘s/^[ ^t]*//’ file

   # 각 줄 끝의 여백(공백/탭) 삭제
   sed ‘s/[ ^t]*$//’ file       # 위의 '^t' 참고 사항 참조

   # 각 줄의 앞뒤 여백 모두 삭제
   sed ‘s/^[ ^t]*//;s/[ ^]*$//’ file    # 위의 '^t'에 대한 참고 사항 참조

   # 각 줄에서 “foo” 를 “bar” 로 치환
   sed ‘s/foo/bar/’ file        # 한 줄에서 첫 번째 발생만 치환
   sed ‘s/foo/bar/4’ file       # 한 줄에서 네 번째 발생만 치환
   sed ‘s/foo/bar/g’ file       # 한 줄 내의 모든 발생을 치환

   # “baz” 가 포함된 줄만 “foo” 를 “bar” 로 치환
   sed ‘/baz/s/foo/bar/g’ file

   # 파일의 첫 번째 빈 줄을 제외한 모든 연속된 빈 줄을 삭제합니다.
   # 이 방법은 파일의 맨 위와 맨 끝의 빈 줄도 모두 삭제합니다.
   # (“cat -s” 명령어를 모방함)
   sed ‘/./,/^$/!d’ file       # 이 명령은 맨 위에 빈 줄 0개, 파일 끝(EOF)에 1개를 허용합니다.
   sed ‘/^$/N;/\n$/D’ file     # 이 명령은 맨 위에 빈 줄 1개, 파일 끝(EOF)에 0개를 허용합니다.

   # 파일 맨 앞의 빈 줄만 모두 삭제합니다.
   sed ‘/./,$!d’ file

   # 파일 맨 뒤의 빈 줄만 모두 삭제합니다.
   sed -e :a -e ‘/^\n*$/{$d;N;};/\n$/ba’ file

   # 줄이 백슬래시로 끝나는 경우, 다음 줄을 그 줄에 연결합니다.
   sed -e :a -e ‘/\\$/N; s/\\\n//; ta’ file

   # 줄이 등호로 시작하는 경우, 그 줄을 앞의 줄에 추가합니다
   # (그리고 “=” 를 공백 하나로 바꿉니다).
   sed -e :a -e ‘$!N;s/\n=/ /;ta’ -e ‘P;D’ 파일


## 3.3. 주소 및 주소 범위

   Sed 명령어는 선택적인 “주소” 또는 “주소 범위” 접두사가 있을 수 있습니다. 주소나 주소 범위가 지정되지 않은 경우, 해당 명령어는 입력 파일이나 텍스트
   스트림의 모든 줄에 적용됩니다. 다음 세 가지 명령어는 주소 접두사를 사용할 수 없습니다:

      - 스크립트 내에서 분기하거나 점프하는 데 사용되는 레이블
      - ‘{’ “명령어” 를 종료하는 닫는 중괄호 ‘}’
      - 기술적으로도 “명령어” 에 해당하는 ‘#’ 주석 문자

   주소는 줄 번호(예: 1, 5, 37 등), 정규 표현식(/RE/ 또는 \xREx 형식으로 표기되며, 여기서 ‘x' 는 ’\' 를 제외한 임의의 문자이고 RE는 정규 표현식임), 또는 파일의 마지막 줄을 나타내는 달러 기호($)일 수 있습니다. 주소나 주소 범위 뒤에 느낌표(!)를 붙이면, 해당 주소로 지정한 줄을 제외한 모든 줄에 명령이 적용됩니다.
 
   빈 정규식(“//”)은 마지막으로 사용된 정규식으로 대체됩니다. 또한, 일부 sed는 \xREx 를 정규식 구분자로 지원하지 않습니다.

     5d               # 5번째 줄만 삭제
     5!d              # 5번째 줄을 제외한 모든 줄 삭제
     /RE/s/LHS/RHS/g  # 해당 줄에 RE가 나타날 경우만 치환
     /^$/b label      # 줄이 비어 있으면 ':label' 로 분기
     /./!b label      # ... 동일한 명령을 작성하는 또 다른 방법
     \%.%!b label     # ... 이 명령을 작성하는 또 다른 방법
     $!N              # 마지막 줄을 제외한 모든 줄에서 다음 줄을 가져옴

   주목할 점은, 주소 내에서 삽입된 줄바꿈을 기호 \n 으로 나타낼 수 있지만, 이 구문은 스크립트가 N, G 또는 기타 명령어를 통해 패턴 공간에 2줄 이상을 넣는 경우만 필요하다는 것입니다. \n 기호는 줄 끝의 줄바꿈과 일치하지 않습니다. 이는 sed가 처리를 위해 각 줄을 패턴 공간으로 읽어올 때 줄 끝의 줄바꿈을 제거하고, 해당 줄을 처리한 뒤, 표준 출력으로 줄을 출력할 때 다시 줄바꿈을 추가하기 때문입니다. 줄 끝과 일치시키려면 다음과 같이 ‘$’ 메타문자를 사용하십시오:

     /tape$/          # 줄 끝의 'tape' 단어를 일치시킵니다
     /tape$deck/      # 리터럴 '$' 가 포함된 'tape$deck' 단어를 일치시킵니다
     /tape\ndeck/     # 사이에 줄바꿈이 있는 'tape' 과 'deck' 을 일치시킵니다

   다음 sed 명령어는 일반적으로 *단일* 주소만 허용합니다. 그 외의 모든 명령어(label, ‘}’, ‘#’ 제외)는 단일 주소와 주소 범위 모두를 허용합니다.

     =       현재 줄의 줄 번호를 stdout에 출력합니다
     a       현재 줄을 출력한 후, stdout에 “text” 를 추가합니다
     i       현재 줄을 출력하기 전에, stdout에 “text” 를 삽입합니다
     q       현재 줄이 일치한 후 종료합니다
     r file  줄이 일치한 후 “file” 의 내용을 stdout에 출력합니다

   여기서 “보통” 이라 표현한 것에 유의합니다. 주소 범위 내의 모든 줄에 ‘=’, ‘a’, ‘i’ 또는 ‘r’ 명령을 적용할 경우, 중괄호를 사용해서 이런 동작을 강제할 수 있습니다. 따라서, “1,9=” 는 유효하지 않은 명령이지만, “1,9{=;}” 는 처음 9줄에 각 줄 번호와 그에 해당하는 줄을 출력합니다(그 후 파일의 나머지 부분은 평소와 같이 출력됩니다).

   주소 범위는 다음 형식으로 나타납니다.

       <address1>,<address2>    또는    <address1>,<address2>!

   여기서 주소는 줄 번호나 표준 정규식(/regex/)일 수 있습니다. <address2> 는 파일 끝을 나타내는 달러 기호(달러)일 수도 있습니다. GNU sed 3.02 이상, ssed 및 sed15 이상은 <address2> 가 +num 형식의 표기법일 수도 있으며, 이는 <address1> 이 일치한 후 다음 _num_ 줄을 나타냅니다.

   주소 범위는 다음과 같습니다:

   (1) 포괄적. 
   범위 “/From here/,/eternity/” 는 “From here” 가 포함된 모든 줄부터 “eternity” 가 포함된 줄까지(해당 줄 포함)를 일치시킵니다. “eternity” 바로 앞 줄에서 멈추지 않습니다! (이런 점이 마음에 들지 않으면, 4.24절을 참조하십시오.)

   (2) 전체 일치. 
   주소 범위는 줄의 일부가 아닌 항상 전체 줄과 일치합니다. 즉, 주소 범위를 변경하거나 삭제하는 명령은 줄 전체를 변경하거나 삭제하며, 줄 중간에서 멈추지 않습니다.

   (3) 다중 행. 
   주소 범위는 일반적으로 2행 이상과 일치합니다. 두 번째 주소는 첫 번째 주소가 일치한 행과 절대 일치하지 않습니다. 따라서 유효한 주소 범위는 항상 최소 두
   행에 걸쳐 있으며, 다음의 예외 사항만 한 행과 일치합니다:

      - 첫 번째 주소가 파일의 마지막 줄과 일치하는 경우
      - “/RE/,3” 구문을 사용하며 /RE/ 가 파일 내 3번째 줄 이하에서 단 한 번만 나타나는 경우
      - HHsed v1.5를 사용하는 경우. 3.4절을 참조하십시오.

   (4) 최소주의. 
   <address2> 로 /regex/ 를 사용하는 주소 범위에서, “/foo/,/bar/” 범위는 “bar” 가 “foo” 아래 줄에 나타나는 경우, 발견된 첫 번째 “bar” 에서 멈춥니다. 만약 “bar” 라는 단어가 “foo” 단어 아래 여러 줄에 걸쳐 나타난다면, 이 범위는 첫 번째 “foo” 부터 첫 번째 “bar” 까지의 모든 줄과 일치합니다. 더 많은 “bar” 를 찾기 위해 앞으로 건너뛰며 검색을 계속하지 않습니다. 즉, 주소 범위는 정규 표현식 같이 “탐욕적” 이 아닙니다.

   (5) 반복. 
   주소 범위는 파일 내의 하나 이상의 줄 블록과 일치하려고 시도합니다. 그러나 블록들은 중첩될 수 없습니다. 또한, 두 번째 일치는 이전 블록의 마지막 줄을
   “포함” 하지 않습니다.  예를 들어, 다음 텍스트가 주어졌을 때,

       start
       stop  start
       stop

   sed 명령어 '/start/,/stop/d' 는 처음 두 줄만 삭제합니다. 3줄 모두를 삭제하지 않습니다!!

   (6) 끊임없는 일치. 
   주소 범위에서 “시작” 일치 항목을 찾았으나 “종료” 일치 항목을 찾지 못한 경우, “시작” 부터 파일 끝까지 모든 줄이 일치하게 됩니다. 따라서 다음과 같은 동작에 유의합니다:

     /RE1/,/RE2/  # /RE2/ 가 발견되지 않으면, /RE1/부터 파일 끝까지 일치합니다.

     20,/RE/      # /RE/ 가 발견되지 않으면, 20번째 줄부터 파일 끝까지 일치합니다.

     /RE/,30      # /RE/ 가 30번째 줄 이후 어디서든 나타나면, sed15+, sedmod 및 GNU sed v3.02+는 
                  # 매 발생 위치가 일치 대상으로 처리됩니다. 
                  # GNU sed v2.05 및 1.18은 /RE/ 가 두 번째로 나타나는 위치부터 파일 끝까지 일치 대상으로 처리됩니다.

   이런 동작이 이상하게 느껴진다면, 이는 sed가 파일 내부를 “앞을 미리” 살펴보지 않기 때문이라는 점을 기억합니다. 그렇게 한다면 sed가 스트림 편집기 역할을 처리할 수 없게 되어 효율성에 부정적인 영향을 미치게 됩니다.
 
   이런 동작이 바람직하지 않다면, 중괄호 내의 중첩된 테스트를 사용해서 이를 우회하거나 수정할 수 있습니다. 다음 스크립트는 GNU sed 3.02에서 작동합니다:

     # “/RE1/,/RE2/” 범위에서 your_commands 를 실행하지만, 
     # /RE2/ 가 발견되지 않으면 아무 작업도 수행하지 않습니다.
     /RE1/{:a;N;/RE2/!ba;your_commands;}

     # “20,/RE/” 범위에서 your_commands 를 실행하되, 
     # /RE/ 가 발견되지 않으면 아무 작업도 수행하지 않습니다.
     20{:a;N;/RE/!ba;your_commands;}

   참고로, N 명령을 사용해서 줄들을 한꺼번에 “모아” 끝 표현식을 테스트하면, 패턴 공간은 수많은 줄(수천 개에 달할 수도 있음)을 한데 모아 \n 시퀀스로 줄 바꿈을 표시하며 하나의 표현식으로 연결하게 됩니다. 패턴 공간 내부의 정규 표현식을 수정해야 할 수도 있습니다(예: ‘/^Start/’ 대신 ‘/\nStart/' 를, ’/.*/‘ 대신 ’/[^\n]*/' 를 작성해야 함). 또한 다른 표준 sed 명령어는 사용할 수 없거나 사용하기 어려울 수 있습니다.

     # “/RE/,30” 범위에서 your_commands 를 실행하되, 
     # /RE/ 가 31행 이후에 나타나는 경우에는 일치시키지 않습니다.
     1,30{/RE/,$ your_commands;}

   주소 범위 사용에 관한 관련 제안 사항은 이 FAQ의 4.2, 4.15 및 4.19 절을 참조하십시오. 또한 다음 절도 참고하십시오.


## 3.4. GNU sed 및 HHsed 의 주소 범위

   (1) GNU sed 3.02 이상, ssed 및 sed15 이상은 모두 다음과 같은 주소 범위를 지원합니다:

       /regex/,+5

   이는 /regex/ 와 그 다음 5줄(또는 EOF, 둘 중 먼저 나타나는 쪽)을 일치시킵니다.

   (2) GNU sed v3.02.80(이상) 및 ssed는 다음과 같은 주소 범위를 지원합니다:

       0,/regex/

   이는 /regex/ 가 첫 번째 줄에 나타날 경우 이를 일치시킬 수 있도록 허용하는 특수한 경우입니다. 이 구문은 /regex/ 가 첫 번째 줄에 있더라도 파일의 맨 위부터 /regex/ 가 처음 나타나는 위치까지의 모든 줄과 일치하는 범위 표현식을 허용합니다.

   (3) HHsed (sed15)는 다음과 같은 예외적인 방식으로

       /regex1/,/regex2/

   /RE1/ 과 /RE2/ 가 *동일한* 줄에 모두 나타나면, HHsed는 해당된 한 줄을 일치시킵니다. 다시 말해, 주소 범위 블록은 단 한 줄로만 구성될 수 있습니다. 그러면 HHsed는 블록을 다시 시작하기 위해 /regex1/ 이 다음에 나타나는 위치를 찾습니다.

   sed의 다른 모든 버전(sed16 포함)은 주소 범위를 일치시키기 위해 2줄이 필요하므로, /regex1/ 과 /regex2/ 만으로는 한 줄을 성공적으로 일치시킬 수 없습니다. 아래 7.9.4절의 설명도 참조하십시오.

   (4) BEGIN~STEP 선택: ssed와 GNU sed(v2.05 이상)는 “BEGIN~STEP 선택” 이라는 주소 지정 방식을 제공합니다. 이는 /start/ 부터 /finish/ 까지의 연속된 줄을 포함하는 블록을 선택하는 범위 주소가 *아닙니다!!*. 하지만 이 내용도 여기에 포함되어야 할 것 같습니다.

   M 과 N 이 정수인 “M~N” 형태의 표현식이 주어지면, GNU sed와 ssed는 M행부터 시작해서 N번째마다 한 행씩 선택합니다.(gsed v2.05는 M 이 N 보다 작아야 했지만, 이런 제한은 더 이상 필요하지 않습니다). M 과 N 모두 0 이 될 수 있습니다(“0~0” 은 모든 줄을 선택합니다). 다음 예제는 이런 구문을 보여줍니다:

     sed ‘1~3d’ file      # 1번 줄부터 시작해서 3번째 줄마다 삭제
                          # 1, 4, 7, 10, 13, 16번 줄 등을 삭제합니다

     sed ‘0~3d’ file      # 3번째 줄, 6번째 줄, 9번째 줄, 12번째 줄, 15번째 줄, 18번째 줄, ...을 삭제합니다

     sed -n ‘2~5p’ file   # 2번째 줄부터 시작해서 5번째 줄마다 출력
                          # 2, 7, 12, 17, 22, 27번째 줄 등을 출력합니다.

   (5) 마지막으로, GNU sed v2.05는 범위 지정 기능에 버그가 있습니다(7.5절 참조). 이 버그는 이후 버전에서 수정되었습니다.


## 3.5. sed 스크립트 디버깅

   다음 두 가지 디버거를 사용하면 sed 스크립트가 어떻게 작동하는지 좀 더 쉽게 이해할 수 있습니다. 이 디버거들은 sed 스크립트의 문제를 파악할 때 많은 고생 시간을 덜어줄 수 있습니다.

   (1) sd (sed 디버거), Brian Hiles 제작
   이 디버거는 유닉스 셸에서 실행되며, 강력하고 사용하기 쉽습니다. sd는 정규식 일치 또는 스크립트 줄 번호로 정의된 모든 범위에서 패턴 공간과 홀드 공간에 대한 조건부 중단점 및 스파이포인트를 지원합니다. 반자동으로 작동할 수 있고, 진단 보고서를 저장할 수 있으며, sed 스크립트를 실행하기 전에 잠재적인 문제를 보여줍니다. 이 스크립트는 안정적이며, 실행을 위해서는 유닉스 셸 유틸리티와 Bourne 셸 또는 Korn 셸이 필요합니다.

       http://sed.sourceforge.net/grabbag/scripts/sd.ksh.txt (2003)
       http://sed.sourceforge.net/grabbag/scripts/sd.sh.txt  (1998)

   (2) sedsed, 작성자: Aurelio Jargas
   이 디버거는 실행에 파이썬이 필요하며, 사용자가 사용하는 어떤 버전의 sed든 상관없이 이를 활용합니다. 각 sed 명령이 실행되기 전과 후에 현재 입력 줄, 패턴 영역, 홀드 영역을 표시합니다.

       http://sedsed.sourceforge.net


## 3.6. sed-to-perl 변환기인 s2p에 대한 참고 사항

   s2p(sed to perl)는 sed 스크립트를 Perl 프로그래밍 언어로 변환하는 Perl 프로그램으로, 많은 버전의 Perl에 포함되어 있습니다. s2p 를 사용할 때 다음과 같은 문제가 발견되었습니다:

   (1) s/// 명령어 뒤의 세미콜론을 제대로 인식하지 못합니다.

       s/foo/bar/g;

   (2) s/// 명령어 뒤의 끝 공백을 제거하지 못합니다. 주석이 없는 경우도 끝 공백이 하나만 있어도 오류가 발생합니다.

   (3) 중괄호 안의 여러 명령어를 제대로 처리하지 못합니다. 예를 들어,

       1,4{=;G;}

   는 중괄호가 누락된 Perl 코드를 생성하며, 두 번째 “G” 명령어도 누락됩니다. 사실, 첫 번째 명령어 이후의 모든 명령어는 Perl 출력 스크립트에서 누락되며, 출력된 Perl 스크립트는 중괄호 불일치도 포함됩니다.


## 3.7. 정규 표현식에 대한 GNU/POSIX 확장 기능

   GNU sed는 [0-9A-F] 같은 일반 문자 집합 외에도 “문자 클래스” 를 지원합니다. 일반 문자 집합과 마찬가지로, 문자 클래스는 집합 내의 임의의 단일 문자를 나타냅니다.

   “문자 클래스는 POSIX 표준에 새로 도입된 기능입니다. 문자 클래스는 특정 속성을 가진 문자 목록을 설명하기 위한 특수한 표기법이지만, 실제 문자 자체는 국가마다 또는 문자 집합마다 다를 수 있습니다. 예를 들어, 알파벳 문자가 무엇인지에 대한 개념은 미국과 프랑스에서 다릅니다.” [GNU awk v3.1.0 문서에서 인용.]

   문자 클래스는 일반적으로 줄 공간을 절약해 주지는 않지만, 스크립트를 국제적으로 사용할 수 있도록 이식성을 높이는 데 도움이 됩니다. _미국 사용자_ 를 위한 이에 상응하는 문자 집합은 다음과 같습니다.

     [[:alnum:]]  - [A-Za-z0-9]     영숫자
     [[:alpha:]]  - [A-Za-z]        알파벳
     [[:blank:]]  - [ \x09]         공백 또는 탭 문자만
     [[:cntrl:]]  - [\x00-\x19\x7F] 제어 문자
     [[:digit:]]  - [0-9]           숫자 문자
     [[:graph:]]  - [!-~]           인쇄 가능하고 가시적인 문자
     [[:lower:]]  - [a-z]           소문자
     [[:print:]]  - [ -~]           인쇄 가능(제어 문자 아님) 문자
     [[:punct:]]  - [!-/:-@[-`{-~]  구두점 문자
     [[:space:]]  - [ \t\v\f]       모든 공백 문자
     [[:upper:]]  - [A-Z]           대문자 알파벳
     [[:xdigit:]] - [0-9a-fA-F]     16진수 숫자 문자

   [[:graph:]] 는 공백 “ ” 과 일치하지 않지만, [[:print:]] 는 일치합니다. 일부 문자 클래스는 sed를 컴파일할 때 사용된 C 라이브러리에 따라 높은 ASCII 범위(ASCII 128-255 또는 0x80-0xFF)의 문자와 일치할 수도 있고 그렇지 않을 수도 있습니다. 비-영어권의 경우, [[:alpha:]] 및 기타 클래스도 높은 ASCII 문자와 일치할 수 있습니다.

------------------------------




# 4. 예제 - 한 글자 관련 질문

4.1. 치환식의 우측(RHS)에 줄바꿈을 삽입하려면 어떻게 해야 합니까?

   여러 버전의 sed는 '\n' 을 우측 표현식(RHS)에 직접 입력할 수 있으며, 이 경우 출력 시 줄바꿈으로 변환됩니다: ssed, gsed302a+, gsed103 (-x 스위치 사용 시), sed15+, sedmod, 그리고 UnixDOS sed. 가장 _쉬운_ 해결책은 이런 버전 중 하나를 사용하는 것입니다.

   다른 버전의 sed를 사용할 경우, 다음 방법 중 하나를 시도해 보십시오:

   (a) Bourne 셸에서 sed 스크립트를 입력할 때, 스크립트가 '단일 따옴표' 를 사용하는 경우 백슬래시 “\” 하나를, 스크립트가 “쌍 따옴표” 를 요구하는 경우 백슬래시 두 개 “\\” 를 사용하십시오. 아래 예제에서, 2번째 줄 맨 앞에 있는 '>' 는 셸이 사용자에게 추가 입력을 요청하기 위해 생성한 것임을 유의합니다. 사용자는 슬래시, 작은 따옴표를 입력한 다음, Enter 키를 눌러 명령을 종료합니다:

     [sh-prompt]$ echo twolines | sed 's/two/& new\
     >/'
     two new
     lines
     [bash-prompt]$

   (b) 스크립트 내에 백슬래시 '\'가 하나 있고, 바로 뒤에 줄바꿈이 오는 스크립트 파일을 사용합니다. 이렇게 하면 줄바꿈이 “replace” 부분에 삽입됩니다. 예시:

     sed -f newline.sed files

     # newline.sed
     s/twolines/two new\
     lines/g

   일부 sed 버전은 마지막 백슬래시가 필요하지 않을 수 있습니다. 그럴 경우, 이를 제거하십시오.

   (c) 사용되지 않은 문자를 삽입하고 출력을 tr 로 파이프 처리합니다:

     echo twolines | sed ‘s/two/& new=/’ | tr “=” “\n”   # 다음 결과를 생성합니다:
     two new
     lines

   (d) “G” 명령어를 사용합니다: G 는 패턴 공간 끝에 줄바꿈 문자와 홀드 공간의 내용을 추가합니다. 홀드 공간이 비어 있더라도 줄바꿈 문자는 어쨌든 추가됩니다. 이 줄바꿈 문자는 패턴 공간에 “\n” 으로 저장되며, 여기서 “\(...\)” 그룹화를 통해 참조할 수 있고, 우측 표현식(RHS)으로 이동시킬 수 있습니다. 따라서 앞서 사용한 “twolines” 예제를 수정하려면 다음 스크립트를 사용하면 됩니다:

     sed ‘/twolines/{G;s/\(two\)\(lines\)\(\n\)/\1\3\2/;}’

   (e) 줄을 나누지 않고 전체 줄 삽입하기: 줄을 *변경* 하는 것이 아니라 패턴 앞이나 뒤에 전체 줄을 삽입하는 경우, 절차는 훨씬 더 간단합니다. “i”(삽입) 또는 “a”(추가) 명령을 사용하고, 외부 스크립트를 통해 변경을 수행하면 됩니다. 정규 표현식과 일치하는 각 줄 앞에 “This line is new” 를 삽입하려면:

     /RE/i This line is new               # HHsed, sedmod, gsed 3.02a
     /RE/{x;s/$/This line is new/;G;}     # 기타 sed 버전

   위의 두 예제는 콘솔에 입력하는 “한 줄” 명령어입니다. sed 스크립트를 사용하는 경우, “i\” 바로 뒤에 리터럴 줄바꿈을 붙이면 모든 버전의 sed에서 작동합니다. 또한, “s/$/This line is new/” 명령어는 홀드 공간이 이미 비어 있을 때만 작동합니다(기본적으로 비어 있습니다).

   정규 표현식과 일치하는 각 줄 뒤에 “This line is new” 를 추가하려면:

     /RE/a This line is new               # HHsed, sedmod, gsed 3.02a
     /RE/{G;s/$/This line is new/;}       # 그 외의 sed 버전

   정규 표현식과 일치하는 각 줄 뒤에 빈 줄 2개를 추가하려면:

     /RE/{G;G;}                           # 홀드 공간이 비어 있다고 가정

   정규 표현식과 일치하는 각 줄을 빈 줄 5개로 바꾸려면:

     /RE/{s/.*//;G;G;G;G;}                # 홀드 공간이 비어 있다고 가정

   (f) 가능하면 “y///” 명령을 사용하세요: 일부 유닉스 버전의 sed(GNU sed는 아님!)는 s/// 명령어가 우측 인수(RHS)에 '\n' 을 허용하지 않지만, y/// 명령어는 허용합니다. 만약 현재 사용 중인 유닉스 sed가 이를 지원한다면, “aaa” 뒤에 줄바꿈을 다음과 같이 삽입할 수 있습니다(단, 이 방법은 GNU sed나 다른 sed 버전은 호환되지 않습니다):

     s/aaa/&~/; y/~/\n/;                  # 해당 줄에 다른 '~'가 없다고 가정!


## 4.2. 제어 코드나 인쇄 불가능한 문자는 어떻게 표현하나요?

   여러 버전의 sed는 \xHH 표기법을 지원합니다. 여기서 “HH” 는 00-FF 범위의 두 자리 16진수입니다: ssed, GNU sed v3.02.80 이상, GNU sed v1.03, sed16 및 sed15(HHsed). 이 중 하나를 사용해 보시기 바랍니다.

   Sed는 바이너리나 객체 코드를 처리하도록 설계되지 않았으며, 널 문자(0x00)를 포함하는 파일은 대부분의 sed 버전에서 일반적으로 오류를 발생시킵니다. GNU sed와 ssed의 최신 버전은 예외로, 입력 파일은 물론 정규식 내에서도 널 문자를 허용합니다.

   유닉스 플랫폼에서 ‘echo’ 명령어는 8진수 또는 16진수 값을 삽입할 수 있습니다(예: `echo “\0nnn”` 또는 `echo -n “\0nnn”`). 또한 echo 명령어는 백스페이스
   또는 탭 문자를 나타내는 ‘\\b' 나 ’\\t' 같은 구문을 지원할 수도 있습니다. 현재 사용 중인 echo 버전이 어떤 구문을 지원하는지 확인하려면 매뉴얼 페이지를 참조하십시오. 일부 버전은 다음을 지원합니다:

     # 0x1A(8진수 32)를 ASCII 문자로 대체
     sed ‘s/’`echo “\032”`‘/Ctrl-Z/g’

     # 다음 명령어에서 3개의 백슬래시를 주의하세요
     sed “s/.`echo \\\b`//g”


## 4.3. +this+ 같은 토글 문자가 포함된 파일을 [i]this[/i] 처럼 변환하려면 어떻게 합니까?

   입력 파일, 특히 메시지 중심의 텍스트 파일은 종종 ~this~, *this*, 또는 =this= 같이 강조하기 위한 토글 문자가 포함되어 있습니다. Sed는 동일한 입력 패턴이 나타날 때마다 번갈아 가며 다른 출력을 생성할 수 있습니다. 일반적인 용도로는 HTML 코드를 생성하거나 굵은 글씨, 기울임꼴, 밑줄을 나타내는 코드를 출력하는 경우가 있습니다. 이 스크립트는 같은 줄에 토글 패턴이 여러 번 나타나는 경우뿐만 아니라, 패턴이 한 줄에서 시작되어 몇 줄 뒤에 끝나는 경우, 심지어 파일 끝에서 끝나는 경우까지 모두 처리할 수 있습니다:

     # +this+ 를 [i]this[/i] 로 변환하는 sed 스크립트
     :a
     /+/{ x;        # “+” 가 발견되면 홀드 공간과 패턴 공간을 교환
       /^ON/{       # (이전의) 홀드 공간에 “ON” 이 있으면 ..
         s///;      # .. 이를 삭제
         x;         # .. 홀드 공간과 패턴 공간을 다시 교환
         s|+|[/i]|; # .. 다음 “+” 를 “[/i]” 로 변환
         ba;        # .. 레이블 :a 로 돌아가서 다시 시작
       }
     s/^/ON/;       # 그렇지 않은 경우, 홀드 공간에 “ON” 이 없었으므로 새로 생성
     x;             # 홀드 공간과 패턴 공간을 교환
     s|+|[i]|;      # 첫 번째 “+” 를 “[i]” 로 변환
     ba;            # 레이블 :a 로 분기해서 다른 패턴 찾음
     }
     #---스크립트 끝---

   이 스크립트는 홀드 공간을 사용해서 토글이 ON 인지 여부를 나타내는 일종의 “플래그” 를 생성합니다. 스크립트 논리를 설명하기 위해 주석을 추가했으나,
   대부분의 sed 버전은 'b'ranch 명령어나 레이블 뒤에 주석을 넣을 수 없습니다!!

   +toggle+ 문자가 절대 줄 경계를 넘지 않는다고 확신한다면(즉, 한 줄에서 시작해서 다른 줄에서 끝나는 경우가 절대 없다면), 이 스크립트는 한 줄로 줄일 수 있습니다:

     s|+\([^+][^+]*\)+|[i]\1[/i]|g

   토글 패턴에 정규식 메타문자(예: ‘*’ 또는 ‘+’, ‘?’ 등)가 포함되면, 백슬래시로 묶어야 합니다.

   문자열 변경


## 4.10. 대소문자를 구분하지 않는 검색은 어떻게 수행하나요?

   여러 버전의 sed가 대소문자를 구분하지 않는 일치를 지원합니다: ssed 와 GNU sed v3.02 이상(s/// 또는 /regex/ 뒤에 I 플래그를 사용할 경우); -i 스위치를 사용한 sedmod; 그리고 sed16(두 가지 유형의 스위치를 모두 지원함).

   다른 버전의 sed는 대소문자를 구분하지 않는 검색이 번거로울 수 있으므로, 사용자들은 awk나 perl을 사용할 수 있습니다. 이 프로그램들은 대소문자를 구분하지 않는 검색 옵션을 기본 제공하기 때문입니다. gawk/mawk 는 "BEGIN{IGNORECASE=1}“, perl은 ”/regex/i" 를 사용하십시오. 다른 버전의 sed의 경우, 다음 세 가지 해결 방법이 있습니다:

   해결 방법 1: 모든 문자를 대문자로 변환한 후 정상적으로 검색하기

     # sed 스크립트, 해결 방법 1
     h;              # 원본 줄을 홀드 공간에 복사
                     # 패턴 공간의 문자를 모두 대문자로 변환
     y/abcdefghijklmnopqrstuvwxyz/ABCDEFGHIJKLMNOPQRSTUVWXYZ/
                     # 이제 “CARLOS” 단어를 검색할 수 있습니다
     /CARLOS/ {
          # 줄을 추가하거나 삽입합니다. 참고: “s/.../.../” 는
          # 수정된 패턴 공간을 검색하며 패턴 공간을 출력하지 않기 때문에
          # 여기서는 작동하지 않습니다.
     }
     x;              # 원래의 패턴 공간을 되찾습니다
                     # 원래의 패턴 공간이 출력됩니다
     #---sed 스크립트 끝---

   해결 방법 2: 두 가지 경우 모두 검색

   대개 고유 명사는 모두 소문자로 시작하거나(“unix”), 첫 글자가 대문자인 경우(“Unix”), 또는 전체가 대문자인 경우(“UNIX”)로 나타납니다. 모든 가능성을 검색할 필요는 없을 수 있습니다.

     /UNIX/b match
     /[Uu]nix/b match

   해결 방법 3: 가능한 모든 경우 검색

     # 부득이할 경우, 가능한 모든 조합을 검색합니다
     /[Ca][Aa][Rr][Ll][Oo][Ss]/ { ... }

   패턴 길이가 늘어날수록 이 방법은 적어도 일부 sed 구현체는 해결 방법 1보다 한 차원 더 느려진다는 점을 유의하십시오.


## 4.11. 패턴이 처음 나타나는 부분만 일치시키려면 어떻게 해야 하나요?

   (1) 일반적인 해결 방법은 GNU sed 또는 ssed를 사용해서 다음과 같은 범위 표현식 중 하나를 사용하는 것입니다. 첫 번째 스크립트("첫 번째 일치 항목만 출력")는 모든 버전의 sed에서 작동합니다:

     sed -n ‘/RE/{p;q;}’ file       # 첫 번째 일치 항목만 출력
     sed ‘0,/RE/{//d;}’ file        # 첫 번째 일치 항목만 삭제
     sed ‘0,/RE/s//to_that/’ file   # 첫 번째 일치 항목만 변경

   (2) GNU sed를 사용할 수 없고, 패턴이 첫 번째 줄에 나타나지 않을 것임을 *확실히 알고* 있다면 다음 방법이 작동합니다:

     sed ‘1,/RE/{//d;}’ file        # 첫 번째 일치 항목만 삭제
     sed ‘1,/RE/s//to_that/’ file   # 첫 번째 일치 항목만 변경

   (3) GNU sed를 사용할 수 없고, 패턴이 첫 번째 줄에 *나타날 수도* 있는 경우, 다음 명령어 중 하나를 사용하십시오 (이 짧은 GNU 스크립트의 저작권은 Donald Bruce Stewart에게 있습니다):

     sed ‘/RE/{x;/Y/!{s/^/Y/;h;d;};x;}’ file                 # 삭제 (한 가지 방법)
     sed -e ‘/RE/{d;:a’ -e ‘$!N;$ba’ -e ‘}’ file             # 삭제 (다른 방법)
     sed ‘/RE/{d;:a;N;$ba;}’ file                            # 동일한 스크립트, GNU sed
     sed -e ‘/RE/{s//to_that/;:a’ -e ‘$!N;$!ba’ -e ‘}’ file  # 변경

   홀드 공간의 플래그를 사용하는 또 다른 해결책입니다. 이 방법은 모든 sed에서 호환되며, 패턴이 첫 번째 줄에 있을 때 작동합니다:

     # 첫 번째 출현 시에만 “foo” 를 “bar” 로 변경하는 sed 스크립트
     1{x;s/^/first/;x;}
     1,/foo/{x;/first/s///;x;s/foo/bar/;}
     #---스크립트 끝---

## 4.12. 쉼표로 구분된(CSV) 데이터 파일을 어떻게 구문 분석하나요?

   쉼표로 구분된 데이터 파일은 여러 형태로 존재할 수 있으며, 이에 따라 구문 분석 및 처리의 복잡도도 점점 높아집니다. 이런 파일은 흔히 CSV 파일(“comma separated values”의 약자)이라 불리며, 때로는 SDF 파일(“standard data format” 의 약자)이라고도 합니다. 주의할 점은, 일부 공급업체는 “SDF” 라는 용어를 쉼표로 구분된 필드를 가진 가변 길이 레코드를 지칭할 때 사용하며, 이 경우 문자 값이 포함된 필드는 “쌍따옴표” 로 묶여 있는 반면, 다른 공급업체는 “SDF” 를 고정 길이 필드를 가진 고정 길이 레코드를 지칭하는 데 사용한다는 점입니다!(고정 길이 필드에 대한 도움말은 질문 4.23을 참조하십시오)

   “CSV” 라는 용어는 Microsoft Excel에서 이를 선택적 출력 파일 형식으로 사용하면서 사실상 표준이 되었습니다.

   쉼표로 구분된 데이터에서 접할 수 있는 4가지 형식은 다음과 같습니다:

   (a) 따옴표 없음, 내부 쉼표 없음

       1001,John Smith,PO Box 123,Chicago,IL,60699
       1002,Mary Jones,320 Main,Denver,CO,84100,

   (b) (a)와 같으나 각 필드 주위에 따옴표가 있는 경우

       “1003”,“John Smith”,“PO Box 123”,“Chicago”,‘IL’,“60699”
       “1004”,“Mary Jones”,“320 Main”,“Denver”,‘CO’,“84100”

   (c) (b)와 같으나, 쉼표가 포함된 경우

       “1005”,“Tom Hall, Jr.”,“61 Ash Ct.”," Niles“,”OH",‘44446’
       “1006”,“Bob Davis”,“429 Pine, Apt. 5”,“Boston”,“MA”,“02128”

   (d) (c)와 마찬가지로, 쉼표와 따옴표가 포함된 형식

       “1007”,“Sue ”Red“ Smith”,“19 Main”,“Troy”,“MI”,‘48055’
       “1008”,“Joe ”Hey, guy!“ Hall”,“POB 44”,“Reno”,“NV”,“89504”

   위의 각 예시는 7개의 필드와 필드 구분자로 기능한 6개의 쉼표가 있습니다. 사례 (c)는 이런 데이터 파일의 전형적인 형태로, 각 필드를 묶고 내부 쉼표(예:
   “Tom Hall, Jr.”)가 필드 구분자로 해석되는 것을 방지하기 위해 큰따옴표가 사용됩니다. 그러나 위의 사례 (d)에서 볼 수 있듯이, 데이터는 종종 내장된 따옴표와 내장된 쉼표가 모두 포함될 수도 있습니다.

   사례 (d)는 Microsoft CSV 형식과 가장 유사합니다. *그러나*, 마이크로소프트 CSV 형식은 큰따옴표로 묶인 필드 내에 줄바꿈 문자가 포함될 수 있도록 허용합니다. 데이터 필드 내에 줄바꿈 문자가 포함될 가능성이 있다면, 데이터 파일을 처리할 때 sed 이외의 다른 도구를 사용하는 것을 고려해야 합니다.

   쉼표로 구분된 데이터 파일을 처리하기 전에, 해당 형식을 완전히 이해하고 데이터 무결성을 확인하십시오. 각 줄에 동일한 수의 필드가 포함되어 있습니까? 특정
   필드는 숫자로만 구성됩니까, 아니면 대문자로 된 두 글자 약어로 구성됩니까? 데이터 파일을 변경하거나 파일에서 특정 필드를 추출하기 전에 sed(또는 awk, perl)를 사용해서 데이터 파일의 무결성을 검증해야 합니다.

   각 행에 유효한 수의 필드가 포함되어 있는지 확인한 후, sed를 사용해서 개별 필드를 찾아서 수정하고, 필요한 경우 \(...\) 그룹화 명령을 사용하십시오.

   사례 (a):

     sed ‘s/^[^,]*,[^,]*,[^,]*,[^,]*,/.../’
             ^     ^     ^
             |     |     |_ 3번째 필드
             |     |_______ 2번째 필드
             |_____________ 1번째 필드

     # 사례 (a)에서 두 번째 필드를 삭제하는 Unix 스크립트
     sed ‘s/^\([^,]*\),[^,]*,/\1,,/’ file

     # 사례 (a)에서 1번째 필드를 9999로 변경하는 유닉스 스크립트
     sed ‘s/^[^,]*,/9999,/’ file

   사례 (b) 및 (c):

     sed 's/^“[^”]*“,”[^“]*”,“[^”]*“,” [^“]*”,/.../'
              1번째--  2번째-- 3번째-- 4번째--

     # 사례 (c)에서 두 번째 필드를 삭제하는 Unix 스크립트
     sed ‘s/^\(“[^”]*“\),”[^“]*”,/\1,“”,/’ file

     # 사례 (c)에서 첫 번째 필드를 9999로 변경하는 Unix 스크립트
     sed ‘s/^“[^”]*“,/”9999",/’ file


   사례 (d):

   이런 파일을 파싱하는 한 가지 방법은 필드 구분자 “,” 를 탭이나 수직 바 같이 사용되지 않는 문자로 대체하는 것입니다.(엄밀히 말하면, 필드 구분자는 쉼표뿐이고 필드는 “쌍따옴표” 로 둘러싸여 있지만, 실질적인 _효과_ 는 필드가 따옴표-쉼표-따옴표로 구분되며, 각 레코드의 시작과 끝에 따옴표 문자가 추가된다는 것입니다.) 데이터 파일을 _먼저_ 검색해서 해당 문자가 파일 내 어디서도 나타나지 않는지 확인하십시오!

     sed -n ‘/|/p’ file        # '|' 가 나타나는 모든 부분 검색
     # 발견되지 않으면, '|' 를 사용해서 필드를 구분할 수 있습니다

   그런 다음 필드 구분자를 대체하고 이전과 같이 파싱합니다:

     # 사례 (d)에서 두 번째 필드를 삭제하는 sed 스크립트
     s/“,”/|/g;                  # “,” 를 바(|)로 전역 변경
     s/^\([^|]*\)|[^|]|/\1||/;   # 두 번째 필드 삭제
     s/|/“,”/g;                  # 바(|)를 “,” 로 전역 변경
     #---스크립트 끝---

     # 사례 (d)에서 첫 번째 필드를 9999로 변경하는 sed 스크립트 (d)
     # 앞뒤 따옴표를 모두 처리해야 함
     s/“,”/|/g;
     s/^[^|]*|/"9999|/;
     s/|/“,”/g;
     #---스크립트 끝---

   이 기법은 빈 필드를 포함해서 _각_ 필드 모두 큰따옴표로 둘러싸여 있을 때만 작동한다는 점에 유의하십시오.

   다음 해결 방법은 (d)의 복잡한 예시로 예를 들어 모든 필드에 “쌍따옴표” 가 포함되지 않거나, 필드 내에 “쌍따옴표” 가 포함되거나, 필드 구분자 주위에 불필요한 공백이 있는 경우 등을 처리하기 위한 것입니다. (이 스크립트를 제공해 주신 Greg Ubben 님께 감사드립니다!)

     # (d) 사례를 슬래시로 구분된 레코드로 변환하는 sed 스크립트
     s/^ *\(.*[^ ]\) *$/|\1|/;
     s/“ *, */”|/g;
     : loop
     s/| *\([^",|][^,|]*\) *, */|\1|/g;
     s/| *, */|\1|/g;
     t loop
     s/  *|/|/g;
     s/|  */|/g;
     s/^|\(.*\)|$/\1/;
     #---스크립트 끝---

   예를 들어, 이 스크립트는 다음과 같은 (구문은 틀렸지만 유효한) 내용을:

   first,“”,unquoted ,“”this“ is, quoted ” ,, sub ‘quote’ inside, f“, lone  ” empty:

   다음과 같이 변환합니다:

   first|“”|unquoted|“”this“ is, quoted ”||sub ‘quote’ inside|f“|lone  ”   empty:

   이 스크립트는 “쌍따옴표” 는 그대로 유지하지만, 필드 구분자로 사용되는 쉼표만 변경한다는 점에 유의하십시오. 저는 가독성을 높이기 위해 수직 바 “|” 를 사용했지만, 원한다면 다른 필드 구분자로 변경할 수도 있습니다.

   CSV 데이터 파일이 좀 더 복잡한 경우, sed로 작성하는 데 드는 수고가 그만한 가치가 없을 것입니다. 이런 경우는 전용 CSV 모듈이 있는 Perl을 사용해야 합니다(CPAN에서 최소 두 가지 최신 CSV 파서를 구할 수 있습니다).


## 4.13. 고정 길이 열 기반 데이터는 어떻게 처리하나요?

   sed는 \(grouping\) 부분 문자열과 역참조 (\1, \2, \3 ...)를 통해 고정 길이 필드를 처리합니다. 필드당 10, 25, 9자 길이의 필드가 3개 있다면, sed 스크립트는 다음과 같이 작성할 수 있습니다:

     s/^\(.\{10\}\)\(.\{25\}\)\(.\{9\}\)/\3\2\1/;  # 필드 순서를
        ^^^^^^^^^^^~~~~~~~~~~~==========           # 1,2,3에서 3,2,1로 변경
         필드 #1   필드 #2   필드 #3

   이 코드는 읽기에 다소 어렵습니다. GNU sed나 ssed를 사용하며 -r 스위치를 활성화하면 다음과 같이 간단히 표시할 수 있습니다:

     s/^(.{10})(.{25})(.{9})/\3\2\1/;          # -r 스위치 사용

   sed에서 필드를 삭제하려면 그룹화를 사용하고, 삭제할 필드에서 역참조를 생략합니다. 데이터가 길거나 처리하기 어려운 경우, s/// 명령어 뒤에 -R 스위치와 /x 플래그를 사용해서 ssed를 실행하면, 필드에 대한 주석과 설명을 삽입할 수 있습니다.

   필드가 많은 레코드의 경우, 스크립트 상단에 FIELDWIDTHS 변수를 설정해서 사용하십시오. 예를 들어:

     awk ‘BEGIN{FIELDWIDTHS = “10 25 9”}; {print $3 $2 $1}’ file

   이는 유사한 sed 스크립트보다 읽기 훨씬 더 쉬우며, 특히 처리해야 할 필드가 5~6개 이상인 경우 더욱 그렇습니다.


## 4.14. 숫자 문자열을 쉼표로 구분된 형식으로 변환하려면 어떻게 합니까?

   작업을 수행하는 데 필요한 가장 간단한 스크립트를 사용하십시오. 해당 줄의 변형이 늘어날수록, sed 스크립트는 추가적인 조건을 처리하기 위해 더 복잡해져야 합니다. 정수가 가장 간단하고, 그 다음은 소수 형식, 그 다음은 숫자 사이에 단어가 포함된 경우입니다.

   사례 1: 공백이나 쉼표로 구분된 간단한 정수 문자열로, 선택적으로 음수 기호가 포함될 수 있습니다. 이를 변환하려면:

       4381, -1222333, 70000: - 44555666 1234567890 단어
       56890  -234567, 89222  -999777  345888777666 문자

   다음과 같이:

       4,381, -1,222,333, 70,000: - 44,555,666 1,234,567,890 단어
       56,890  -234,567, 89,222  -999,777  345,888,777,666 자

   다음 한 줄 명령어 중 하나를 사용하세요:

     sed ‘:a;s/\B[0-9]\{3\}\>/,&/;ta’                      # GNU sed
     sed -e :a -e ‘s/\(.*[0-9]\)\([0-9]\{3\}\)/\1,\2/;ta’  # 기타 sed

   사례 2: 소수점이 포함될 수 있는 숫자 문자열로, 공백이나 쉼표로 구분되며, 선택적으로 음수 부호가 붙을 수 있습니다. 이를 변경하려면:

       4381,  -6555.1212 및 70000,  7.18281828  44906982.071902
       56890   -2345.7778 및 8.0000:  -49000000 -1234567.89012

   다음과 같이:

       4,381,  -6,555.1212 및 70,000,  7.18281828  44,906,982.071902
       56,890   -2,345.7778 및 8.0000:  -49,000,000 -1,234,567.89012

   GNU sed의 경우 다음 명령어를 사용하세요:

     sed ‘:a;s/\(^\|[^0-9.]\)\([0-9]\+\)\([0-9]\{3\}\)/\1\2,\3/g;ta’

   다른 버전의 sed의 경우:

     sed -f case2.sed files

     # case2.sed
     s/^/ /;                 # 줄 시작 부분에 공백 추가
     :a
     s/\( [-0-9]\{1,\}\)\([0-9]\{3\}\)/\1,\2/g
     ta
     s/ //;                  # 줄 시작 부분의 공백 제거
     #---스크립트 끝---


## 4.15. 치환 시 정규식 확장을 방지하려면 어떻게 합니까?

   때로는 정규식 메타문자를 리터럴 그대로 *일치* 시켜(예: “[0-9]” 또는 “\n” 과 일치시키고), 이를 다른 내용으로 치환할 때가 있습니다. 메타문자의 확장을
   방지하는 일반적인 방법은 그 앞에 백슬래시를 붙이는 것입니다. 따라서 “\n” 이 줄바꿈과 일치하는 반면, “\\n” 은 ‘백슬래시’ 뒤에 'n' 이 오는 두 글자 문자열과 일치합니다.

   하지만 정규 표현식이 많을 경우 이런 작업을 반복하는 것은 번거로울 수 있습니다. 다음 스크립트는 리터럴로 구성된 번갈아 나타나는 문자열을 치환하며, 이때 어떤 문자도 정규 표현식의 메타문자로 해석되지 않습니다:

     # 파일명: sub_quote.sed
     # 작성자: Paolo Bonzini
     # 찾기/바꾸기 메타문자에 백슬래시를 추가하는 sed 스크립트
     N;                  # 짝수 행을 패턴 공간에 추가
     s,[]/\\$*[],\\&,g;  # [, ], /, \, $, * 모두 따옴표로 묶음
     s,^,s/,;            # 패턴 공간 맨 앞에 “s/” 를 추가
     s,$,/,;             # 패턴 공간 끝에 “/” 를 추가
     s,\n,/,;            # “\n” 을 “/” 로 변경해서 s/from/to/ 형식으로 만들기
     #---스크립트 끝---

   다음은 sub_quote.sed 를 사용하는 예시입니다. 이 예제는 일반적인 sed 정규식을 Perl 스타일의 정규식으로 변환합니다. 입력 파일은 10줄로 구성되어 있습니다:

       [0-9]
       \d
       [^0-9]
       \D
       \+
       +
       \?
       ?
       \|
       |

   “sed -f sub_quote.sed input” 명령을 실행하면,(위의) 입력 파일이 다음과 같은 5줄의 출력 결과로 변환됩니다:

       s/\[0-9\]/\\d/
       s/\[^0-9\]/\\D/
       s/\\+/+/
       s/\\?/?/
       s/\\|/|/

   위의 파일은 그 자체로 sed 스크립트이며, 이를 사용해서 다른 파일을 수정할 수 있습니다.


## 4.16. 문자열을 모두 소문자나 대문자로 변환하려면 어떻게 합니까?   

   가장 쉬운 방법은 GNU sed의 새 버전인 ssed, sedmod 또는 sed16 을 사용하고, s/// 명령어 오른쪽 부분에 \U, \L 또는 기타 스위치를 사용하는 것입니다. 예를 들어, “reg” 나 “exp” 로 시작하는 모든 단어를 모두 대문자로 변환하려면 다음과 같이 처리합니다:

       sed -r “s/\<(reg|exp)[a-z]+/\U&/g”              # gsed4.+ 또는 ssed
       sed “s/\<reg[a-z]+/\U&/g; s/\<exp[a-z]+/\U&/g”  # sed16 및 sedmod

   보시다시피, sedmod 와 sed16 은 선택 연산자(|)를 지원하지 않지만, 대소문자 변환은 지원합니다. 만약 이런 버전의 sed를 사용할 수 없다면, 이 작업을 위한 몇 가지 샘플 스크립트를 Seder's Grab Bag에서 확인할 수 있습니다:

       http://sed.sourceforge.net/grabbag/scripts

   일부 대소문자 변환 스크립트는 “파일명 조작” 항목에, 다른 일부는 “텍스트 서식 지정” 항목에 나열되어 있다는 점에 유의하십시오.

   블록(연속된 줄) 변경


## 4.20. 파일의 특정 부분만 변경하려면 어떻게 합니까?

   줄 번호, 정규 표현식(예: “from” 과 “until” 사이의 모든 줄), 또는 이 둘을 조합해서 줄 범위를 지정할 수 있습니다. 동일한 범위에서 여러 번 치환을 수행하려면, 명령어를 중괄호 {...} 사이에 넣습니다. 예를 들어:

     # 1행과 20행 사이만 치환
     1,20 s/Johnson/White/g

     # 1행과 20행 사이를 제외한 모든 곳에서 치환
     1,20 !s/Johnson/White/g

     # “from” 과 “until” 사이의 단어만 치환합니다. GNU sed에서
     # 단어 경계 표시자로 \<....\> 가 사용된다는 점에 유의하십시오.
     /from/,/until/ { s/\<red\>/magenta/g; s/\<blue\>/cyan/g; }

     # “ENDNOTES:” 단어부터 파일 끝까지만 치환
     /ENDNOTES:/,$ { s/Schaff/Herzog/g; s/Kraft/Ebbing/g; }

   주소 범위 사용에 대한 기술적 세부 사항은 3.3절(“주소 지정 및 주소 범위”)을 참조하십시오.


## 4.21. 텍스트 블록에 특정 정규 표현식이 포함된 경우, 해당 블록을 삭제하거나 변경하려면 어떻게 합니까?

   다음 코드는 ‘start' 와 'end’ 사이의 블록(양쪽 끝 포함)을, 해당 블록에 'regex' 문자열이 포함된 경우만 삭제합니다. Russell Davies가 작성했으며, 추가 설명이 포함되어 있습니다:

     # 블록 내부에서 /regex/ 와 일치하는 경우 해당 블록을 삭제하는 sed 스크립트
     :t
     /start/,/end/ {    # 이 블록 마커들 사이의 각 줄에 대해..
        /end/!{         # /end/ 마커에 도달하지 않았고
           $!{          # 파일 마지막 줄도 아닌 경우,
              N;        # 다음 줄을 패턴 공간에 추가하고
              bt
           }            # :t 레이블로 분기(루프 복귀)합니다.
        }               # 이 줄은 /end/ 마커와 일치합니다.
        /regex/d;       # /regex/ 와 일치하면 블록을 삭제합니다.
     }                  # 그렇지 않으면 블록이 출력됩니다.
     #---스크립트 끝---

   참고: 위의 스크립트가 /regex/ 에 도달하면, 전체 여러 줄로 구성된 블록이 패턴 공간에 들어옵니다. 블록 내의 항목을 치환하려면 “s///” 를 사용하십시오. 블록 전체를 변경하려면 ‘c’ (변경)명령을 사용하십시오:

     /regex/c\
     1: 이렇게 하면 전체 블록이\
     2: 이 두 줄의 텍스트로 치환됩니다.


## 4.22. 단락에 특정 정규 표현식이 포함되면, 해당 단락을 어떻게 찾을 수 있나요?

   단락이 빈 줄로 구분되어 있다고 가정합니다. 단일 항으로 구성된 정규 표현식의 경우, 다음 스크립트 중 하나를 사용하십시오:

     sed -e ‘/./{H;$!d;}’ -e ‘x;/regex/!d’      # 대부분의 sed
     sed ‘/./{H;$!d;};x;/regex/!d’              # GNU sed

   단락 내에 순서와 상관없이 3개의 특정 정규 표현식(RE1, RE2, RE3)이 포함된 단락만 출력하려면:

     sed -e ‘/./{H;$!d;}’ -e 'x;/RE1/!d;/RE2/!d;/RE3/!d'

   이 해결책과 앞의 해결책을 사용할 때, 단락이 지나치게 길면(길이 4k 초과), sed의 내부 버퍼가 오버플로우될 수 있습니다. HHsed를 사용할 경우, HHsed의 버그 방지를 위해 위 스크립트에서 “x;” 바로 뒤에 “G;” 명령을 추가해야 합니다(자세한 설명은 아래 7.9(5) 절 참조).


## 4.23. _특정_ 연속된 줄들로 구성된 블록을 어떻게 일치시킬 수 있나요?

   이 문제를 해결하는 방법은 세 가지가 있습니다:

       (1) “/range/,/expression/” 을 사용합니다.
       (2) “/multi-line\nexpression/”을 사용합니다.
       (3) “리터럴 문자열” 블록을 사용합니다.

   다음 섹션에서 각 접근 방식에 대해 설명합니다.


### 4.23.1.  “/범위/,/표현식/” 을 사용합니다

   해당 줄 블록이 *순서가 절대 바뀌지 않는* 문자열이고, 맨 윗 줄이 블록 외부에 절대 나타나지 않는 경우, 예를 들어 다음과 같은 경우:

       Abel
       Baker
       Charlie
       Delta

   이 경우, 다음 해결책으로 블록을 삭제할 수 있습니다:

     sed ‘s/^Abel$/{N;N;N;d;}’ files    # 줄 수가 적은 블록의 경우
     sed ‘/^Abel$/ /^Zebra$/d’ files    # 줄 수가 많은 블록의 경우
     sed ‘/^Abel$/+25d’ files           # HHsed, sedmod, ssed, gsed 3.02.80

   블록을 수정하려면 ‘d’ 대신 ‘c’(변경) 명령을 사용합니다. 해당 블록만 출력하려면 -n 스위치와 ‘d’ 명령 대신 ‘p’(출력)를 사용합니다.
 
   블록 내부의 일부 내용을 변경하려면 다음을 시도합니다:

     /^Abel$/,/^Delta$/ {
         :ack
         N;
         /\nDelta$/! b ack
         # 이 시점에서 블록 내의 모든 줄이 수집됩니다
         s/ubstitute /somethin/g;
     }


### 4.23.2. “여러 줄로 구성된 표현식” 을 사용합니다

   블록의 맨 윗 줄이 때로는 단독으로 나타나거나 다른 줄들이 뒤따를 경우, 또는 파일의 어느 곳이든 블록의 일부가 나타날 경우, 여러 줄로 구성된 표현식이 필요할 수 있습니다.

   이 예제들은 N줄로 구성된 블록을 일치시키는 해결책을 제시합니다. “/^RE1\nRE2\nRE3...$/” 표현식은 올바르게 구성된 정규식을 나타내며, 여기서 \n 은 줄 사이의 줄 바꿈을 의미합니다. ‘N’ 뒤에 ‘P;D;’ 명령어가 오는 것은 "슬라이딩 윈도우" 기법을 형성한다는 점에 유의합니다. N줄로 구성된 윈도우가 형성됩니다. 다중 행 패턴이 일치하면 해당 블록이 처리됩니다. 일치하지 않으면 맨 윗 줄이 출력된 후 패턴 공간에서 삭제되며, 다음 줄에서 일치를 시도합니다.

     # 연속된 2줄을 삭제하는 sed 스크립트: /^RE1\nRE2$/
     $b
     /^RE1$/ {
       $!N
       /^RE1\nRE2$/d
       P;D
     }
     #---스크립트 끝---

     # 연속된 3줄을 삭제하는 sed 스크립트. (이 스크립트는 s///n 을 사용할 때 발생하는 ‘t’ 버그로 인해 
     # GNU sed v2.05 및 그 이전 버전은 작동하지 않습니다. FAQ의 7.5(1) 절을 참조하십시오.)
     : more
     $!N
     s/\n/&/2;
     t enough
     $!b more
     : enough
     /^RE1\nRE2\nRE3$/d
     P;D
     #---스크립트 끝---

   예를 들어, 연속된 5줄의 블록을 삭제하려면, 앞서 소개한 스크립트에서 단 두 군데만 수정하면 됩니다:

   (1) “s/\n/&/2;” 에서 2를 4로 변경합니다(끝에 세미콜론을 붙이는 것은 HHsed v1.5의 버그를 해결하기 위해 필요합니다).

   (2) 정규식 줄을 “/^RE1\nRE2\nRE3\nRE4\nRE5$/d” 로 변경하고, 필요에 따라 표현식을 수정합니다.

   두 개의 빈 줄 블록 뒤에 “foo” 단어가 오고, 그 뒤에 또 다른 빈 줄이 오는 부분(총 4줄)을 삭제한다고 가정합니다. 다른 빈 줄이나 다른 “foo” 는 그대로
   남겨둬야 합니다. '2' 를 '3' 으로 변경한 후(항상 총 줄 수보다 1 적은 숫자여야 함), 정규식 줄은 다음과 같이 됩니다:

     “/^\n\nfoo\n$/d”     (이 스크립트를 제공해 주신 Greg Ubben 님께 감사드립니다.)

   구버전 GNU sed의 ‘t’ 버그를 우회하기 위한 대안으로, 다음 스크립트는 연속된 4줄을 삭제합니다:

     # 연속된 4줄을 삭제하는 sed 스크립트. 
     # GNU sed 2.05 이하 버전을 사용할 경우 이 스크립트를 사용하십시오.
     /^RE1$/!b
     $!N
     $!N
     :a
     $b
     N
     /^RE1\nRE2\nRE3\nRE4$/d
     P
     s/^.*\n\(.*\n.*\n.*\)$/\1/
     ba
     #---스크립트 끝---

   이 스크립트의 단점은 줄 수를 늘리기 위해 2곳이 아닌 3곳을 수정해야 한다는 점이며, 줄이 추가될수록 ‘s’ 명령어가 정규식을 일치시키기 위해 더 많은 작업을 수행해야 한다는 점입니다. 반면, gsed-2.05 버전의 버그를 피할 수 있으며, 연속된 줄을 삭제하는 문제를 해결하는 또 다른 방법을 보여줍니다.


### 4.23.3.  “리터럴 문자열” 블록을 사용합니다

   (파일 전체에서 몇 번이든 나타날 수 있는) 정적인 텍스트 블록을 일치시켜야 하고, 해당 블록의 내용이 미리 알려진 경우라면 이 스크립트를 사용하기 쉽습니다. 이를 위해 “findrep.txt” 중간 파일이 필요합니다(아래 참조):

       문자 그대로 일치시켜야 할 여러 줄이 연속된
       블록은 맨 위에
       배치해야 합니다. .*  또는 [a-z] 같은 정규 표현식은
       이 블록 내에서 특수한 의미를 잃고
       문자 그대로 해석됩니다.
       ----
       네 개의 하이픈이 두 섹션을 구분합니다.
       하단 섹션에 대체할 텍스트를 입력하십시오.
       위와 마찬가지로 &, \n, \1 같은 sed 기호는
       특수한 의미를 잃게 됩니다.

   이 과정은 3단계로 이루어집니다. “blockrep.sed” 라는 일반 스크립트가 (위의) “findrep.txt” 를 읽어들이고 사용자 정의 스크립트를 생성하며, 이 스크립트는 실제 입력 파일에 적용됩니다. 다시 말해, “findrep.txt” 는 블록에 수행할 편집 작업을 간략하게 설명한 것이며, “blockrep.sed” 는 이를 실제 sed 명령어로 변환합니다.

   이 프로세스는 유닉스 셸이나 DOS 프롬프트에서 다음과 같이 실행하십시오:

     sed -nf blockrep.sed findrep.txt >custom.sed
     sed -f custom.sed input.file >output.file
     (custom.sed를 삭제하십시오)

   일반적인 스크립트인 “blockrep.sed” 는 아래와 같습니다. 꽤 깁니다. 출력 결과를 살펴보면 _슬라이딩 윈도우_ 기법을 사용하는 방법을 이해하는 데 도움이 될 수 있습니다.

     # 파일명: blockrep.sed
     # 작성자: Paolo Bonzini
     # 필요 사항:
     #    (1) 찾아 교체할 블록, 예: findrep.txt
     #    (2) 변경 처리할 입력 파일, input.file
     #
     # blockrep.sed 는 두 번째 sed 스크립트인 custom.sed 를 생성해서,
     # 4개의 하이픈으로 구성된 행 바로 위의 줄들을 전역적으로 찾아
     # 하단의 텍스트 블록으로 대체합니다. 
     # 이 스크립트는 GNU sed 사용이 권장되지만 필수 조건은 아닙니다.
     #
     # 첫 번째 부분을 반복하며, `from' 텍스트를 홀드 공간에 축적합니다.
     :a
     /^----$/! {
        # 슬래시, 백슬래시, 마지막 줄바꿈 및 정규식 메타문자를 이스케이프 처리합니다.
        s,[/\[.*],\\&,g
        s/$/\\/
        H
        #
        # 슬라이딩 윈도우를 유지하는 데 필요한 N개의 명령을 추가합니다.
        x
        1 s,^.,s/,
        1! s/^/N\
     /
        x
        n
        ba
     }
     #
     # s 명령어의 양쪽을 구분하기 위해 마지막 백슬래시를 슬래시로 변경합니다.
     #
     x
     s,\\$,/,
     x
     #

     # EOF에 도달할 때까지 대체 결과를 임시 저장 공간에 모읍니다.
     :b
     n
     s,[/\],\\&,g
     $! s/$/\\/
     H
     $! bb
     #
     # s 명령어의 우측 부분(RHS)을 선행된 개행 없이 시작하고, 
     # 슬라이딩 윈도우에 P/D 쌍을 추가한 뒤, 스크립트를 출력합니다.
     g
     s,/\n,/,
     s,$,/\
     P\
     D,p
     #---스크립트 끝---


## 4.24. RE1 과 RE2 사이의 모든 줄(해당 줄 자체는 제외)을 지정하려면 어떻게 합니까?

   일반적으로 두 정규 표현식(RE1 과 RE2 사이의 모든 줄을 처리하려면 일반적으로 '/RE1/,/RE2/{명령어;}' 같이 작성합니다. 해당 줄들을 제외하려면 추가 단계가 필요합니다. RE1 과 RE2 사이의 각 줄 앞에(해당 줄들은 제외하고) 화살표 두 개를 추가하려면:

     sed ‘1,/RE1/!{ /RE2/,/RE1/!s/^/>>/; }’ input.fil

   위의 스크립트는 짧지만 이해하기 어려울 수 있습니다. 또한 입력 파일의 첫 번째 줄에 /RE1/ 이 나타나지 않아야 합니다. 다음 스크립트는 한 줄로 된 스크립트는 아니지만, 읽기 쉽고 첫 번째 줄에 /RE1/ 이 나타나도 무방합니다:

     # /RE1/ 이나 /RE2/ 를 일치시키지 않고 /RE1/ 과 /RE2/ 사이의 
     # 모든 줄을 대체하는 sed 스크립트
     /RE1/,/RE2/{
       /RE1/b
       /RE2/b
       s/^/>>/
     }
     #---스크립트 끝---

   input.fil의 내용:         sed 스크립트의 출력:
      aaa                           aaa
      bbb                           bbb
      RE1                           RE1
      aaa                           >>aaa
      bbb                           >>bbb
      ccc                           >>ccc
      RE2                           RE2
      end                           end


## 4.25. 1번 줄이 [특정 문자열]로 끝나는 경우, 두 줄을 어떻게 결합할 수 있나요?

   이 질문은 한 줄짜리 sed 스크립트 섹션에 나와 있지만, 너무 자주 제기되는 문제라서 여기서도 다루어야 합니다. 어떤 줄이 특정 문자열(대개 줄 끝이
   백슬래시로 끝나는 경우)로 끝난다고 가정합니다. 그 뒤에 오는 두 번째 줄을 어떻게 불러올 수 있을까요? 심지어 여러 줄이 연속해서 모두 백슬래시로 끝나는 경우도요?

     sed -e :a -e ‘/\\$/N; s/\\\n//; ta’ file   # 모든 sed
     sed ‘:a; /\\$/N; s/\\\n//; ta’ file        # GNU sed, ssed, HHsed

   이 명령은 백슬래시-줄바꿈을 아무것도 없는 상태로 대체한다는 점에 유의하십시오. 대신 백슬래시-줄바꿈을 단일 공백으로 대체할 수도 있습니다.


## 4.26. 두 번째 줄이 [특정 문자열]로 시작할 때 두 줄을 어떻게 결합하나요?

   이와 반대된 상황도 자주 묻는 질문 중 하나입니다. 어떤 줄이 특정 문자열로 시작한다고 가정합니다. 그 줄을 앞줄 바로 뒤에 붙이려면 어떻게 할까요? 이 예제는 한 줄의 시작 부분에 있는 “<<=” 문자열을 찾아, 해당 줄을 앞 줄의 끝 부분 바로 뒤에 붙이고, 그 문자열을 공백 하나(space)로 바꾸고자 합니다:
 
     sed -e :a -e ‘$!N;s/\n<<=/ /;ta’ -e ‘P;D’ file   # 모든 sed 버전
     sed ‘:a; $!N;s/\n<<=/ /;ta;P;D’ file             # GNU, ssed, sed15+


## 4.27. 모든 단락을 긴 줄로 변경하려면 어떻게 합니까?

   자주 제기되는 요청 중 하나는, 각 줄이 “단락 구분자” 로 끝나는 DOS 스타일 텍스트 파일을, “단락” 구분자가 실제 단락의 끝에만 나타나는 Microsoft 스타일 텍스트 파일로 변환하는 방법입니다. 때로는 이 질문이 “단락 내 각 줄 끝의 하드 리턴을 제거하려면 어떻게 하나요?” 라는 형태로 제기되기도 합니다.

   이 문제가 발생하는 이유는 최신 워드 프로세서가 구형 텍스트 편집기와 다르게 작동하기 때문입니다. 구형 텍스트 편집기는 화면이나 디스크에서 각 줄을 끝내기 위해 줄바꿈(DOS는 CR/LF, 유닉스는 LF만)을 사용했고, 단락을 구분하기 위해 줄바꿈 두 개를 사용했습니다. 일부 워드 프로세서는 단락 재포맷팅과 재배치가 원활하게 이루어지도록 처리하기 위해, 단락을 끝내는 데 줄바꿈 하나를 사용하고 단락 _내부_ 는 줄바꿈을 절대 허용하지 않습니다. 이는 표준 편집기(Emacs, vi, Vedit, Boxer 등)로 생성된 텍스트 파일에 부적절한 위치에 “하드 리턴” 이 있는 것처럼 보이게 만듭니다. 다음 sed 스크립트는 연속된 비-공백 줄(즉, 텍스트 단락)을 찾아내어 각 블록을 끝에 하나의 “하드 리턴” 이 포함된 하나의 긴 줄로 변환합니다.
 
     # 모든 단락을 긴 하나의 줄로 변경하는 sed 스크립트
     /./{H; $!d;}             # 각 단락을 홀드 공간에 추가
     x;                       # 홀드 공간과 패턴 공간 교환
     s/^\(\n\)\(..*\)$/\2\1/; # 앞의 \n 을 패턴 공간 끝으로 이동
     s/\n\(.\)/ \1/g;         # 나머지 모든 \n 을 공백 한 개로 대체
     # 불필요한 빈 줄을 제거하려면 다음 줄의 주석 처리를 해제합니다:
     # /./!d;
     #---sed 스크립트 끝---

   입력 파일에 (프로그램 소스 코드 같이) 특별한 의미를 전달하는 서식이나 들여쓰기가 포함되면, 이 스크립트는 이를 제거합니다. 하지만 텍스트를 좀 더 길게 확장할 경우, 'par' (단락 재포맷터)나 -t 또는 -c 스위치를 사용하고 너비 옵션(-w)을 9999 같은 숫자로 설정한 ‘fmt’ 유틸리티를 사용합니다.

   셸 및 환경

## 4.30. sed를 사용해서 환경 변수를 읽는 방법은 무엇입니까?

### 4.30.1. - 유닉스 플랫폼에서

   유닉스에서 환경 변수는 달러 기호($)로 시작합니다(예: $TERM, $PATH, $var 또는 $i). sed에서 달러 기호는 입력 파일의 마지막 줄, 줄 끝(LHS에서), 또는 리터럴 기호(RHS에서)를 나타내는 데 사용됩니다. sed는 변수에 직접 접근할 수 없으므로, 변수를 올바르게 확장하려면 셸의 따옴표 처리 규칙을 주의 깊게 준수해야 합니다.

   유닉스 셸이 달러 기호를 해석하려면, 스크립트를 큰따옴표로 묶으십시오:

     sed “s/_terminal-type_/$TERM/g” input.file >output.file

   유닉스 셸이 달러 기호를 셸 변수로 해석하지 못하게 하려면, 스크립트를 작은 따옴표로 묶으십시오:

     sed ‘s/.$//’ infile >outfile

   유닉스의 $환경 변수와 sed의 /줄 끝$/ 패턴 일치를 모두 사용하려면 두 가지 해결 방법이 있습니다. 
 
   (1) 가장 쉬운 방법은 스크립트를 “큰따옴표” 로 묶어 셸이 $변수를 인식할 수 있게 하고, sed 메타문자($) 앞에 백슬래시를 붙이는 것입니다. 따라서,

     sed “s/$user\$/root/” file

   은 셸이 $user 를 보간하고, sed는 \$ 를 줄 끝을 나타내는 기호로 해석합니다.

   (2) 또 다른 방법—가독성은 다소 떨어지지만—은 $ 가 대체되지 않아야 하는 부분은 '단일 따옴표' 를, 변수 대체가 이루어져야 하는 부분은 “쌍따옴표” 를 사용해서 스크립트를 연결하는 것입니다. 앞서 언급한 스크립트를 예로 들어 설명하면 다음과 같습니다:

     sed “s/$user”‘$/root/’ file

   해결책 (1) 이 좀 더 기억하기 쉬워 보입니다. 두 경우 모두, 줄 끝($)에 위치할 때 ($user 변수에 저장된) 사용자 이름을 검색하고, 일치하는 모든 부분에서 “root” 단어로 대체합니다.

   긴 셸 스크립트의 경우, 다음과 같이 시작하는 것이 때때로 유용합니다. 작은 따옴표(')로 시작해서 변수가 나올 때 이를 닫고, 변수 이름을 큰 따옴표(")로 묶은 다음, 다시 작은 따옴표로 이어가며 sed 스크립트 끝에서 이를 닫습니다. 예시:

     #! /bin/sh
     # ‘따옴표“일치”’ 사용법을 보여주는 sed 스크립트
     FROM=‘abcdefgh’
     TO=‘ABCDEFGH’
     sed -e '
     y/‘“$FROM”’/'“$TO”'/;    # 쌍을 이루는 따옴표에 유의합니다!
     # 여기에 몇 가지 명령어가 더 이어집니다 . . .
     # 마지막 줄은 작은 따옴표입니다
     '

   따라서 $FROM 이름의 각 변수는 $TO 로 대체되며, 작은 따옴표는 스크립트 내에서 여러 줄을 하나로 연결하는 데 사용됩니다.(4.10절, “sed에서 셸 따옴표 처리는 어떻게 하나요?” 도 참조하십시오.)


### 4.30.2. - MS-DOS 및 4DOS 플랫폼에서

   4DOS 및 MS-DOS 버전 7.0(Win95) 또는 7.10(Win95 OSR2)은, 명령 프롬프트에서 환경 변수에 접근할 수 있습니다. MS-DOS v6.22 및 그 이전 버전은 배치 파일 내에서만 환경 변수에 접근할 수 있습니다. 환경 변수는 퍼센트 기호로 묶어야 하며 대소문자를 구분하지 않습니다. 즉, %USER% 또는 %user% 는 USER 변수를 표시합니다. 실제 퍼센트 기호를 생성하려면 해당 기호를 두 번 입력하면 됩니다.

   DOS 버전의 sed는 스크립트에 탭, 공백, 리디렉션 화살표 또는 수직 막대가 포함될 경우, sed 스크립트를 큰따옴표 “...” (작은따옴표가 아님!)로 묶어야 합니다. 사실, sed의 입력원이 파이프로 전달될 경우, 비록 이중 따옴표로 보호되더라도 sed 스크립트는 수직 막대가 포함되면 안 됩니다(이는 일반적인 MS-DOS 구문상의 버그로 보입니다). 따라서,

       echo blurk | sed “s/^/ |foo /”     # 이는 오류가 발생합니다
       sed “s/^/ |foo /” blurk.txt        # 예상대로 작동합니다

   sed 스크립트 내에서 DOS 경로 문법(예: “C:\TEMP” 로 설정된 TMP 변수)을 포함하는 DOS 환경 변수를 사용하는 것은 권장되지 않습니다. sed는 백슬래시 '\' 를 일반 기호가 아닌, 다음 문자를 “따옴표로 묶는” 메타문자로 해석하기 때문입니다. 따라서,

       sed “s/^/%TMP% /” somefile.txt

   는 각 줄의 앞에 (예를 들어) “C:\TEMP ” 를 붙이지 않고, 각 줄의 앞에 “C:TEMP ” 를 붙이게 됩니다. sed는 백슬래시를 제거하는데, 이는 아마도 사용자가 원하는 결과가 아닐 것입니다. %PATH% 나 %COMSPEC% 같은 다른 변수들도 sed 스크립트 내에서 백슬래시가 제거됩니다.

   백슬래시를 사용하지 않는 환경 변수는 대개 정상 작동합니다. 따라서 다음의 모든 명령은 DOS 배치 파일 내에서 호출될 경우 문제없이 작동할 것입니다:

       sed “s/=username=/%USER%/g” somefile.txt
       echo %FILENAME% | sed “s/\.TXT/.BAK/”
       grep -Ei “%string%” somefile.txt | sed “s/^/  /”

   반면, DOS 프롬프트나 배치 파일 내에서 실행할 경우,

       sed “s/%%/ percent/g” input.fil >output.fil

   이 명령은 파일 내의 각 퍼센트 기호를 “ percent” 로 대체합니다(가독성을 위해 앞쪽에 공백을 추가함).


## 4.31. 변수를 환경으로 내보내거나 다시 전달하려면 어떻게 합니까?


### 4.31.1. - 유닉스 플랫폼에서

   ‘terminals’ 파일의 첫 번째 줄, 두 번째 단어에 TERM 환경 변수에 설정할 값이 포함되어 있다고 가정합니다. sed는 변수를 쉘로 직접 내보낼 수는 없지만, 문자열을 쉘 명령어에 전달할 수는 있습니다. Bourne 셸에서 변수를 설정하려면:

       TERM=`sed ‘s/^[^ ][^ ]* \([^ ][^ ]*\).*/\1/;q’ terminals`;
       export TERM

   두 번째 단어가 “Wyse50” 이면, 이 코드는 셸 명령어 “TERM=Wyse50” 을 전달하게 됩니다.


### 4.31.2. - MS-DOS 또는 4DOS 플랫폼에서

   Sed는 환경을 직접 조작할 수 없습니다. DOS 환경은 배치 파일(.BAT)만 SET 명령어를 사용해서 환경을 변경할 수 있는데, 이는 배치 파일이 명령 셸에 의해 직접 실행되기 때문입니다. 4DOS 환경은 특수한 4DOS 명령어(예: ESET)를 사용해서 환경을 변경할 수도 있습니다.

   DOS 또는 4DOS 환경에서 sed는 단어를 선택해서 이를 SET 명령어에 전달할 수 있습니다. MY.DAT 파일의 두 번째 줄에 있는 첫 번째 단어를 %PHONE% 환경 변수에 설정한다고 가정합니다. 다음과 같이 처리할 수 있습니다.

       @echo off
       sed -n “2 s/^\([^ ][^ ]*\) .*/SET PHONE=\1/p;3q” MY.DAT > GO_.BAT
       call GO_.BAT
       echo PHONE 환경 변수는 %PHONE%입니다.
       :: cleanup
       del GO_.BAT

   이 sed 스크립트는 두 번째 줄의 첫 번째 문자가 공백이 아니라고 가정하고, 그룹화 \(...\) 를 사용해서 공백이 아닌 첫 번째 문자열을 \1 로 저장해서 우측 표현식(RHS)에 전달합니다. 배치 파일을 작성할 때는 GO_.BAT 같은 출력 파일 이름이 동일한 이름의 기존 파일을 덮어쓰지 않도록 주의하십시오.


## 4.32. sed에서 유닉스 셸의 따옴표 처리는 어떻게 하나요?

   스크립트에 리터럴 작은 따옴표(')를 삽입하려면 (a) 또는 (b)를 사용하십시오:

   (a) 가능하면 스크립트를 큰따옴표로 묶으십시오:

     sed “s/cannot/can't/g” file

   (b) 스크립트에 반드시 작은따옴표를 사용할 경우, 작은따옴표 바로 앞에 닫는 작은따옴표를 추가하고, 작은따옴표 앞에 백슬래시를 붙인 다음, 두 번째 작은따옴표 쌍을 사용해서 스크립트 구분을 마무리하십시오. 예를 들면 다음과 같습니다:

     sed ‘s/cannot$/can’\'‘t/g’ file

   보기에는 복잡해 보이지만, 크게 3가지 부분으로 나눌 수 있습니다:

      ‘s/cannot$/can’   \‘   't/g’
      -------------- -   --   -----

   스크립트 내에 리터럴 큰따옴표(")를 삽입하려면 (a) 또는 (b)를 사용하십시오:

   (a) 가능하면 스크립트를 작은따옴표로 묶으십시오. 큰따옴표 앞에 아무것도 붙일 필요가 없습니다. 따라서:

     sed ‘s/14"/fourteen inches/g’ file

   (b) 스크립트에 반드시 큰따옴표를 사용할 경우, 큰따옴표 앞에 백슬래시(\)를 붙이십시오. 예를 들어,

     sed “s/$length\”/$length inches/g" file

   스크립트에 리터럴 백슬래시(\)를 삽입하려면, 이를 두 번 입력하십시오:

     sed ‘s/C:\\DOS/D:\\DOS/g’ config.sys

   파일, 디렉터리 및 경로


## 4.40. 텍스트 파일 맨 위에 파일을 읽을(삽입/추가)려면 어떻게 합니까?

   일반적으로 “본문” 파일 맨 위에 “헤더” 파일을 추가하는 작업은 파일을 sed로 전달하기 전에 명령 프롬프트에서 수행합니다.(버전 6.0 미만의 MS-DOS는 다음 예제에서 MOVE 대신 COPY 와 DEL 을 사용해야 합니다.)

       copy header.txt+body temp                  # MS-DOS 명령 1
       echo Y | move temp body                    # MS-DOS 명령 2
                                                    #
       cat header.txt body >temp; mv temp body    # 유닉스 명령

   하지만 파일 삽입을 반드시 sed 내에서 수행해야 한다면, 방법이 하나 있습니다. sed 명령어 “1 r header.txt” 는 작동하지 않습니다! 이 명령어는 첫 번째 줄을 출력한 다음, 첫 번째 줄과 두 번째 줄 사이에 “header.txt” 를 삽입합니다.
 
   다음 스크립트는 이 문제를 해결해 줍니다. 다만, 스크립트가 제대로 작동하려면 대상 파일에 최소한 두 줄이 있어야 합니다.

     # 첫 번째 줄 위에 “header.txt” 를 삽입하는 sed 스크립트
     1{h; r header.txt
       D; }
     2{x; G; }
     #---sed 스크립트 끝---


## 4.41. 디렉토리 내의 모든 파일이나 전체 디렉토리 트리에서 치환하려면 어떻게 합니까?


### 4.41.1. - ssed 및 Perl을 이용한 해결 방법

   단일 디렉토리 내의 여러 파일에 대한 최선의 해결책은 ssed 또는 gsed v4.0 이상을 사용하는 것입니다:

     sed -i.BAK ‘s|foo|bar|g’ files       # -i 는 원본 파일에서 직접 치환을 수행합니다

   ssed가 없다면, Perl을 이용한 유사한 해결 방법이 있습니다. (네, 이 문서가 sed에 대한 FAQ 파일이지 Perl에 대한 것은 아니라는 것을 알지만, 수많은 사용자에게 ssed보다 Perl이 좀 더 널리 사용됩니다.)

     perl -pi.bak -e ‘s|foo|bar|g’ files                # 또는
     perl -pi.bak -e ‘s|foo|bar|g’ `find /pathname -name “filespec”`

   파일 목록에 있는 각 파일에 대해, sed(또는 Perl)는 소스 파일의 이름을 “filename.bak” 로 변경하며, 수정된 파일에는 원래의 파일 이름이 부여됩니다. 백업 사본이 필요하지 않다면 '.bak' 를 제거하십시오. (여기와 아래 스크립트에서 “s///” 대신 “s|||” 가 사용된 점에 유의하십시오. 's' 명령어의 수직 막대(|)를 사용하면 '/some/path' 를 '/another/path' 로 대체할 수 있으므로, 왼쪽(LHS)과 오른쪽(RHS) 모두에 슬래시가 포함될 수 있습니다.)

   유닉스(Unix) 또는 GNU/리눅스에서 디렉터리를 재귀적으로 처리하려면:

     # xargs 를 사용해서 sed에 너무 많은 파일 이름이 전달되는 것을 방지하지만,
     # 파일 이름에 공백이나 줄바꿈이 포함되면 이 명령은 실패합니다!!
     find /my/path -name ‘*.ht’ -print | xargs sed -i.BAK ‘s|foo|bar|g’

   Windows 2000(CMD.EXE 또는 COMMAND.COM)에서 디렉터리를 재귀적으로 처리하려면:

     # 이 구문은 Windows 9x의 COMMAND.COM에서 지원되지 않습니다.
     for /R c:\my\path %f in (*.htm) do sed -i.BAK “s|foo|bar|g” %f

### 4.41.2. - 유닉스 방식

   단일 디렉터리에 있는 모든 파일에 대해, 파일 확장자가 *.txt 로 끝나고 “[임의의 이름].txt.bak” 이름의 파일이 존재하지 않는다고 가정할 때, 다음 쉘 스크립트를 사용합니다:

     #! /bin/sh
     # 오류 발생 시 원본 파일은 “filename.txt.bak” 로 저장됩니다.
     # cp 뒤의 '&&' 는 추가적인 안전 장치입니다.
     for file in *.txt
     do
        cp $file $file.bak &&
        sed ‘s|foo|bar|g’ $file.bak >$file
     done

   전체 디렉터리 트리를 처리하려면 다음과 같이 유닉스 유틸리티인 find 를 사용하세요.(이 스크립트를 제공해 주신 Jim Dennis <jadestar@rahul.net> 님께 감사드립니다):

     #! /bin/sh
     # 파일명: replaceall
     # 이 스크립트는 백업 파일이 저장되지 않습니다.
     find . -type f -name ‘*.txt’ -print | while read i
     do
        sed ‘s|foo|bar|g’ $i > $i.tmp && mv $i.tmp $i
     done

   이 쉘 스크립트는 디렉터리 트리를 재귀적으로 탐색해서, 디렉터리 내의 파일만 찾아냅니다(상단 쉘 명령어 “for file in *.txt” 에서 처리되는 심볼릭 링크는 제외됩니다). 파일 권한을 유지하고 백업 사본을 만들려면, “sed ... && mv ...” 대신 앞서 소개한 스크립트의 두 줄짜리 cp 루틴을 사용하십시오. sed 명령어 's|foo|bar|g' 를 다음과 같이

     sed “s|$1|$2|g” ${i}.bak > $i

  와 같이 작은따옴표 대신 큰따옴표를 사용하면, 사용자는 쉘 스크립트 명령어 tail 에 위치 매개변수를 적용해서 이 스크립트를 수시로 재사용할 수도 있습니다. 예를 들어,

       replaceall East West

  를 실행하면 현재 디렉토리에 있는 모든 *.txt 파일이 수정됩니다.


### 4.41.3. - DOS 해결 방법:

   MS-DOS 사용자는 다음과 같은 두 개의 배치 파일을 사용해야 합니다:

      @echo off
      :: MS-DOS 파일명: REPLACE.BAT
      ::
      :: 새 파일을 저장할 대상 디렉터리를 생성합니다.
      :: 참고: “SHOW DOTS=ON” 이 활성화되지 않으면, 버전 4.10 미만의 Novel Netware 환경에서 다음 명령이 실패합니다.
      if not exist .\NEWFILES\NUL mkdir NEWFILES
      for %%f in (*.txt) do CALL REPL_2.BAT %%f
      echo 완료!!
      :: ---첫 번째 배치 파일 끝---

      @echo off
      :: MS-DOS 파일 이름: REPL_2.BAT
      ::
      sed “s/foo/bar/g” %1 > NEWFILES\%1
      :: ---두 번째 배치 파일 끝---

   작업이 완료되면 현재 디렉터리에 모든 원본 파일이 남고, 새로 생성된 NEWFILES 하위 디렉터리에 수정된 *.TXT 파일이 들어 있습니다. 다음과 같은 명령은 시도하지 마시기 바랍니다!!

       for %%f in (*.txt) do sed “s/foo/bar/g” %%f >NEWFILES\%%f

   위의 명령은 시도하지 않습니다! 출력 파일 이름이 (*.txt) 각 파일 이름으로 %%f 가 확장되기 전에 NEWFILES 디렉터리 내에 리터럴 '%f' 로 생성되기 때문입니다. 이는 MS-DOS가 “for..in..do” 변수를 확장하기 전에 리디렉션 명령을 통해 출력 파일 이름을 생성하기 때문입니다.

   MS-DOS에서 전체 디렉터리 트리를 재귀적으로 탐색하려면 이 글에서 설명할 수 있는 범위를 넘어서는 복잡한 배치 파일이 필요합니다. <ftp://garbo.uwasa.fi/pc/link/tsbat.zip> 에 있는 Timo Salmi의 훌륭한 배치 트릭 아카이브에서 SWEEP.BAT 파일을 확인합니다(이 파일은 정기적으로 업데이트됩니다). 
 
   또 다른 방법은 디렉터리 재귀 처리를 위해 설계된 외부 프로그램을 사용하는 것입니다. 다음은 디렉터리 재귀 처리에 권장되는 프로그램들입니다. 첫 번째 프로그램인 FORALL 은 OS/2 또는 DOS 환경에서 모두 실행됩니다. 안타깝게도 이 프로그램들 중 어느 것도 Win9x의 긴 파일 이름을 지원하지 않습니다.

       http://hobbes.nmsu.edu/pub/os2/util/disk/forall72.zip
       ftp://garbo.uwasa.fi/pc/filefind/target15.zip


## 4.42. 치환 작업에서 “/some/UNIX/path” 를 어떻게 대체할 수 있나요?

   기술적으로, 슬래시의 일반적인 의미를 비활성화하려면 그 앞에 백슬래시를 붙이면 됩니다. 따라서,

     sed ‘s/\/some\/UNIX\/path/\/a\/new\/path/g’ files

   하지만 이 방법은 읽거나 작성하기에 어렵습니다. 좀 더 나은 해결책이 있습니다. s/// 치환 명령을 사용하면 '/' 를 다른 문자(공백이나 영숫자 포함)로 대체할 수 있게 해줍니다. 따라서,

     sed ‘s|/some/UNIX/path|/a/new/path|g’ files

   그리고 유닉스 셸 스크립트에서 변수명을 사용할 경우,

     sed “s|$OLDPATH|$NEWPATH|g” oldfile >newfile


## 4.43. 치환 작업에서 “C:\SOME\DOS\PATH” 를 어떻게 대체할 수 있나요?

   MS-DOS 사용자의 경우, 모든 백슬래시는 두 번 입력해야 합니다. 따라서 “C:\SOME\DOS\PATH” 를 “D:\MY\NEW\PATH” 로 바꾸려면:

     sed “s|C:\\SOME\\DOS\\PATH|D:\\MY\\NEW\\PATH|g” infile >outfile

   DOS 경로명은 대소문자를 구분하지 않으므로 입력 파일에서 대문자나 소문자로 나타날 수 있다는 점을 기억하십시오. 이 점이 우려된다면, 일치 시 대소문자를 무시할 수 있는 sed 버전(gsed, ssed, sedmod, sed16)을 사용하십시오.

       @echo off
       :: 경로 문장을 변경하는 MS-DOS 배치 파일 예시
       :: s/// 를 사용하려면 /i 플래그가 지정된 GNU sed가 필요합니다
       set old=C:\\SOME\\DOS\\PATH
       set new=D:\\MY\\NEW\\PATH
       gsed “s|%old%|%new%|gi” infile >outfile
       :: 또는
       ::     sedmod -i “s|%old%|%new%|g” infile >outfile
       set old=
       set new=

   또한, Windows 환경은 긴 파일 이름이 두 가지 형식(예: “C:\Program Files” 또는 “C:\PROGRA~1”)으로 저장될 수 있다는 점을 기억하십시오.


## 4.44. sed를 사용해서 파일 포함을 어떻게 에뮬레이트할 수 있나요?

   다음과 같은 형식의 C 스타일 포함문이나 “서버 측 포함(SSI)” 과 유사한 파일 포함 문장이 포함된 입력 파일이 주어졌을 때:

       이것은 소스 파일입니다. 짧습니다.
       파일 이름은 단순히 'source' 입니다. 아래 스크립트를 참조하세요.
       <!--#include file="ashe.inc"-->
              그리고 다음은
       <!--#include file="jesse.inc"-->
       이 파일의 마지막 줄입니다.

   'file=“filename”' 토큰이 있는 위치에 있는 파일을 sed가 가져오거나 삽입하려면 어떻게 할까요? 먼저, 다음 파일을 사용하세요:

     #n
     # 파일 이름: incl.sed
     # GNU sed 또는 ssed에서 지원하는 주석. 
     # 선행 '#n' 은 반드시 1행의 1~2열에 위치해야 합니다.
     /<!--#include file="/ {  # 각 "include file" 명령어마다,
       =;                     #   줄 번호를 출력
       s/^[^“]*”/{r /;        #   패턴을 'r{ '로 변경
       s/".*//p;              #   나머지 부분을 줄 끝(EOL)까지 삭제하고,
                              #   삭제 명령어를 (추가)합니다
       a\
       d;}
     }
     #---sed 스크립트 끝---

   둘째, 다음 셸 스크립트나 DOS 배치 파일을 사용하십시오(DOS 배치 파일을 실행할 경우, ‘단일 따옴표’ 대신 “쌍따옴표” 를 사용하고, 임시 파일을 삭제할 때는 “rm” 대신 “del” 을 사용하십시오):

     sed -nf incl.sed source | sed ‘N;N;s/\n//’ >temp.sed
     sed -f temp.sed source >target
     rm temp.sed

   GNU sed나 ssed가 있다면 스크립트를 훨씬 더 간소화할 수 있습니다(알려주신 Michael Carmack 님께 감사드립니다):

     sed -nf incl.sed source | sed ‘N;N;s/\n//’ | sed -f - source >target

   간단히 말해, 이 스크립트는 각 파일 이름을 'r filename' 명령으로 바꿔 해당 위치에 파일을 삽입하고, 불필요한 부분은 생략합니다. 이 스크립트를 사용할 때 주의할 두 가지 중요한 사항은 다음과 같습니다:

   (1) 한 줄에 ‘#include file’ 지시문은 하나만 있어야 하며,
   (2) 각 ‘#include file’ 지시문은 해당 줄에서 *유일하게* 존재해야 합니다.

   그 외의 모든 내용은 삭제되기 때문입니다.

   이 스크립트는 내장 스크립트 주석에 대한 뛰어난 지원 덕분에 GNU sed나 ssed를 사용하지만, 어떤 버전의 sed에서도 실행될 것입니다. 그렇지 않다면 저에게 연락해 주세요.

------------------------------



# 5. 왜 작동하지 않나요?

## 5.1. sed 스크립트에서 $var 같은 변수가 확장되지 않는 이유는 무엇입니까?

   sed 스크립트에서 “쌍따옴표” 대신 '단일 따옴표' 를 사용했기 때문입니다. 유닉스 셸은 단일 따옴표 안의 $변수를 절대 확장하지 않습니다!!

   이는 아마 sed에서 가장 자주 묻는 질문일 것입니다. 변수 사용에 대한 자세한 내용은 4.30절을 참조하십시오.


## 5.2. 'p'를 사용해서 출력하는데, 가끔 줄이 중복되어 나옵니다.

   Sed는 기본적으로 파일 전체를 출력하므로, ‘p’ 명령어가 줄 중복을 유발할 수 있습니다. 파일 전체를 출력하려면, 's/foo/bar/p' 같은 명령어에서 'p' 를 제거해 보세요. 파일 일부만 출력하려면, -n 플래그를 사용해서 sed 스크립트를 실행해서 일반 출력을 억제하고, ‘p’ 명령을 통해 모든 출력을 얻도록 스크립트를 수정하세요.

   그래도 줄이 중복 출력된다면, 아마 같은 줄에 여러 개의 일치 항목이 발견된 것입니다. 예를 들어, “Peter” 나 ‘James’ 또는 “John” 단어가 포함된 줄을 출력하고 싶지만, 같은 줄이 두 번 출력되지 않도록 처리하려면 “Peter”, ‘James’ 또는 “John” 단어가 포함된 줄을 출력하되, 같은 줄이 두 번 출력되지 않게 하려는 경우를 가정합니다. 다음 명령은 실패할 것입니다:

     sed -n ‘/Peter/p; /James/p; /John/p’ files

   스크립트의 3개 명령이 각 줄마다 모두 실행되기 때문에, 불필요한 줄이 추가됩니다. 더 좋은 방법은 ‘d’(삭제) 또는 'b'(분기) 명령어를 사용하는 것이며, 다음과 같이 작성할 수 있습니다(GNU sed 기준):

     sed ‘/Peter/b; /James/b; /John/b; d’ files          # 첫 번째 방법
     sed -n ‘/Peter/{p;d;};/James/{p;d;};/John/p’ files  # 두 번째 방법
     sed -n ‘/Peter/{p;b;};/James/{p;b;};/John/p’ files  # 세 번째 방법
     sed ‘/Peter\|James\|John/!d’ files                  # 가장 짧은 방법

   일반적인 sed는 -e 명령어를 사용해서 이를 다음과 같이 분할해야 합니다:

     sed -e ‘/Peter/b’ -e ‘/James/b’ -e ‘/John/b’ -e d files
     sed -n -e ‘/Peter/{p;d;}’ -e ‘/James/{p;d;}’ -e ‘/John/p’ files

   세 번째 줄의 경우, 표준 sed 버전은 각 ‘b’ 뒤와 닫는 중괄호 ‘}’ 뒤마다 -e 명령을 추가해야 하므로, 한 줄에 모두 담기에 -e 명령이 너무 많이 필요합니다.


## 5.3. DOS 버전의 sed가 파일을 처리하다가 중간에 중단되는 이유는 무엇입니까?

   먼저 스크립트에 오류가 있는지부터 확인하십시오. 콘솔에 아무것도 출력하지 않도록 설정하지 않은 채 -n 스위치를 사용하셨습니까? 현재 사용 중인 sed 버전의
   설명서를 자세히 읽어보고, 잘못 사용할 수 있는 구문이 있는지 확인했습니까?(너무 많은 데이터를 한번에 수집하는 N 또는 H 명령어를 찾아보십시오.)

   다음으로, sed 스크립트가 유효하다고 확신한다면, 가장 유력한 원인은 파일에 포함된 파일 끝(EOF) 마커일 수 있습니다. EOF 마커(SUB)는 Control-Z 문자로, 1A(16진수, 10진수 26) 값을 가집니다. DOS 버전의 sed는 Ctrl-Z 문자를 감지하는 즉시 처리를 중단합니다!!

   EOF 문자를 찾으려면 Vern Buerg의 셰어웨어 파일 뷰어인 LIST.COM <http://www.buerg.com/list.html>을 사용하십시오. 텍스트 모드는 오른쪽 화살표 기호를 찾고, 16진수 모드(Alt-H)는 1A 코드를 찾으십시오. DOS로 포팅된 유닉스 유틸리티를 사용할 경우, ‘od’ (8진수 덤프)를 사용해서 파일 내의 16진수 코드를 표시한 다음, sed를 사용해서 문제되는 문자를 찾으십시오:

       od -txC badfile.txt | sed -n “/ 1a /p; / 1a$/p”

   그런 다음 입력 파일을 편집해서 문제되는 문자를 제거하십시오.

   입력 파일을 편집하지 않는 해결 방법이 있습니다. 이를 위해서는 유닉스 변환 프로그램인 'tr' 의 DJGPP 32비트 포트(v1.22 이상)가 필요합니다. GNU od 와 tr 은 현재 v2.0(DOS용)이며, 다음 주소에서 구할 수 있는 GNU 텍스트 유틸리티 패키지에 포함되어 있습니다.

       ftp://ftp.simtel.net/pub/simtelnet/gnu/djgpp/v2gnu/txt20b.zip
       http://www.simtel.net/gnudlpage.php?product=/gnu/djgpp/v2gnu/txt20b.zip&name=txt20b.zip

   DJGPP 버전의 'tr' 을 사용하는 것이 중요한데, DOS로 포팅된 다른 버전들은 EOF 문자를 만나면 처리를 중단하기 때문입니다. -d (삭제) 명령어를 사용하십시오:

       tr -d \32 < badfile.txt | sed -f myscript.sed


## 5.4. 정규 표현식이 일치하거나 삭제되지 않습니다. (또는, "탐욕적(Greedy) 대 절약적(Stingy) 패턴 일치")


   이 문제의 가장 흔한 두 가지 원인은 (1) ‘.’ 메타문자의 오용과 (2) ‘*’ 메타문자의 오용입니다. 
 
   정규 표현식 '.*' 은 “탐욕적”(즉, 가능한 한 많은 문자를 일치시키려는) 방식으로 설계되었습니다. 하지만 때로는 사용자가 가능한 한 짧은 문자열만 일치시키는
   “인색한” 표현식, 즉 가능한 한 가장 짧은 문자열만 일치시키는 표현식이 필요한 경우가 있습니다.

   (1) 한 줄 패턴에서 ‘.’ 메타문자는 해당 줄의 임의의 단일 문자와 일치합니다. ('.' 은 줄 끝의 개행문자와 일치할 수 없는데, 이는 줄을 패턴 공간에 넣을 때 개행문자는 제거되기 때문입니다. sed는 패턴 공간을 출력할 때 자동으로 개행문자를 추가합니다.) 'N' 또는 ‘G’ 명령어로 생성된 다중 행 패턴의 경우, '.' 는 패턴 공간 중간에 있는 줄바꿈과 일치합니다. 패턴 공간에 3개의 행이 있다면, “s/.*//” 는 첫 번째 행뿐만 아니라 3개 행 모두를 삭제합니다(출력에 끝줄바꿈이 추가되므로 1개의 빈 행이 남게 됩니다).

   '.' 을 잘못 사용하는 일반적인 경우는 단어 또는 경계가 정해진 필드와 일치시킬 때, '.' 가 필드 경계를 넘나든다는 사실을 잊어버릴 경우입니다.
 
   중괄호 안의 첫 번째 단어를 삭제한다고 가정합니다:

       echo {one} {two} {three} | sed ‘s/{.*}/{}/’       # 실패
       echo {one} {two} {three} | sed ‘s/{[^}]*}/{}/’    # 성공

   's/{.*}/{}/‘ 는 해결책이 아닙니다! 정규식 ’.' 는 닫는 중괄호를 포함한 모든 문자와 일치하기 때문입니다. '.' 을 '[^}]' 로 대체합니다. 이는 오른쪽 중괄호를 제외한 모든 문자를 포함하는 부정 문자 집합 '[^...]' 을 의미합니다. 참고로, 's/{one}/{}/' 도 이 문제를 해결할 수 있다는 것을 알고 있지만, 여기서는
   부정 문자 집합 [^이것 이외의 모든 것] 의 사용법을 설명하고자 합니다.

   부정 문자 집합은 따옴표로 묶인 단어, 쉼표로 구분된 필드 등을 일치시키는 데 사용해야 합니다. 4.12절(“쉼표로 구분된 데이터 파일을 어떻게 파싱하나요?”)도 참조하십시오.

   (2) ‘*’ 메타문자는 앞의 표현식이 0개 이상 반복되는 것을 나타냅니다. ‘*’ 메타문자는 가능한 한 가장 왼쪽에 있는 일치 항목을 먼저 찾으며, 0개의 문자와도 일치합니다. 따라서,

       echo foo | sed ‘s/o*/EEE/’

   는 예상과 달리 'fEEE' 가 아닌 'EEEfoo' 를 생성합니다. 이는 /o*/ 가 단어 시작 부분에 있는 빈 문자열과 일치하기 때문입니다.

   가능한 가장 왼쪽의 일치 항목을 찾은 후, '*' 는 탐욕적(GREEDY)으로 동작해서 항상 가능한 가장 긴 문자열과 일치시키려고 시도합니다. 동일한 정규 표현식(RE)에 '.*' 가 두 개 또는 세 개 나타날 경우, 가장 왼쪽에 있는 '.*' 가 가장 많은 문자를 차지하게 됩니다. 패턴을 간소화하기 위해 ‘\(...\)’ 그룹화를 사용하는 다음 예제를 살펴보십시오:

       echo bar bat bay bet bit | sed 's/^.*\(b.*\)/\1/'

   표시 결과는 ‘bit’ 이며, 그보다 긴 문자열은 절대 표시되지 않습니다. 왜냐하면 가장 왼쪽에 있는 ‘.*’ 가 가능한 한 가장 긴 일치 항목을 선택했기 때문입니다. 다음 규칙을 기억하세요: “가장 왼쪽에 있는 일치 항목, 가능한 한 가장 긴 문자열, 0도 일치합니다.”


## 5.5. CSDPMI*B.ZIP 은 무엇이며 왜 필요한가요?

   Windows 외부에서 MS-DOS를 사용하며 GNU sed v1.18 또는 3.02를 사용하면 다음과 같은 오류 메시지가 나타날 수 있습니다:

       no DPMI - Get csdpmi*b.zip

   “DPMI” 는 DOS Protected Mode Interface 의 약자입니다. 이는 기본적으로(리얼 모드와 대조되는) 보호 모드에서 DOS를 실행하는 수단으로, 프로그램들이 서로 충돌하지 않고 확장 메모리에서 자원을 공유할 수 있게 해줍니다. HIMEM.SYS 와 EMM386.EXE 를 실행하는 것만으로는 충분하지 않습니다. “CSDPMI*B.ZIP” 은 Charles
   Sandmann이 32비트 컴퓨터(예: 386SX, 386DX, 486SX 등)에 DPMI 서비스를 제공하기 위해 작성한 파일을 가리킵니다. 바이너리 파일을 다운로드하십시오(소스 코드도 제공됩니다):

       http://www.delorie.com/djgpp/dl/ofc/simtel/v2misc/csdpmi5b.zip  # 바이너리
       http://www.delorie.com/djgpp/dl/ofc/simtel/v2misc/csdpmi5s.zip  # 소스
       ftp://ftp.cdrom.com/pub/simtelnet/gnu/djgpp/v2misc/csdpmi5b.zip # 바이너리
       ftp://ftp.cdrom.com/pub/simtelnet/gnu/djgpp/v2misc/csdpmi5s.zip # 소스

   그리고 ZIP 파일에서 CWSDPMI.EXE, CWSDPR0.EXE, CWSPARAM.EXE를 추출합니다. 이 3개의 CWS*.EXE 파일 모두를 GSED.EXE 와 같은 디렉터리에 넣으면 모든 준비가 끝납니다. DOC 파일이 포함되어 있지만, 일반 컴퓨터 사용자는 거의 이해하기 어려운 내용입니다. (또 다른 사용자 친화적이지 않은 설명서의 사례입니다.)

   Windows를 사용 중이고 평소 DOS 세션을 통해 GNU sed를 실행할 경우(즉, 크기 조절이 가능한 창에서 DOS 프롬프트를 사용하거나 Alt-Enter 를 눌러 전체 화면 모드로 전환하는 경우), Windows는 이미 DPMI를 사용하므로 CWS*.EXE 파일은 전혀 필요하지 않습니다.


## 5.6. GNU sed의 매뉴얼 페이지는 어디에 있습니까?

   GNU sed v3.02 이전에는 매뉴얼 페이지가 전혀 없었습니다. 최근까지 gsed 와 함께 배포된 매뉴얼 페이지는 오래된 소스나 다른 편집물에서 차용한 것이었습니다. 그 중 어느 것도 “공식” 은 아니었습니다. GNU sed v3.02 는 최초의 진정한 공식 매뉴얼 페이지가 포함되었으며, GNU sed 버전 4.0 는 매뉴얼 페이지와 textinfo 페이지 모두 포함되면서 문서가 크게 개선되었습니다.


## 5.7. 현재 사용 중인 sed 버전을 어떻게 확인할 수 있나요?

   명령줄에 “sed” 만 단독 입력하고, 인자나 매개변수를 추가하지 않습니다.  또한, “sed --version” 을 시도합니다.  어쩔 수 없는 상황이면 다음 명령도 시도할 수 있습니다:

       strings sed | grep -i ver

   현재 사용 중인 ‘strings’ 는 반드시 이 이름의 유닉스 유틸리티 버전이어야 합니다. Douglas Boling이 만든 DOS 유틸리티 STRINGS.COM 을 사용하면 안 됩니다.


## 5.8. sed는 종료 코드를 반환하나요?

   대부분의 sed 버전은 종료 코드를 반환하지 않지만, 사용 중인 버전에 포함된 설명서를 확인해 보시기 바랍니다. GNU sed는 프로그램이 정상 종료되면 종료 코드 0 을, 스크립트에 오류가 있으면 1 을, 스크립트 실행 중에 오류가 발생하면 2 를 반환합니다.


## 5.9. ‘r’ 명령을 사용해도 파일이 텍스트에 삽입되지 않습니다.

   대부분의 sed 버전(전부는 아님)에서 ‘r’ (읽기) 및 ‘w’ (쓰기) 명령 뒤에는 정확히 하나의 공백이 와야 하며, 그 다음에 파일명이 오고, 줄바꿈으로 끝나야 합니다. 파일 이름 앞이나 뒤에 추가된 문자는 파일 이름의 *일부* 로 해석됩니다. 따라서

       /RE/r  insert.me

   는 ' insert.me' 라는 파일을 찾으려고 시도할 것입니다(앞에 공백이 있다는 점에 유의합니다!). 파일을 찾지 못하면 대부분의 sed 버전은 오류 메시지조차 표시하지 않고 아무런 반응도 보이지 않습니다.

   명령줄에서 sed 스크립트를 사용할 때, 모든 'r' 과 'w' 명령은 해당 스크립트 부분의 마지막 명령이어야 합니다. 따라서,

       sed -e ‘/regex/{r insert.file;d;}’ source         # 실패함
       sed -e ‘/regex/{r insert.file’ -e ‘d;}’ source    # 성공함


## 5.10. \n 이스케이프 시퀀스를 사용해서 줄바꿈을 일치시키거나 삭제할 수 없는 이유는 무엇입니까? \n을 사용해서 2줄 이상을 일치시킬 수 없는 이유는 무엇입니까?

   \n 은 줄 끝의 개행 문자와 절대 일치하지 않습니다!! 왜냐하면 줄이 패턴 공간에 저장되기 전에 개행 문자는 항상 제거되기 때문입니다. 두 줄 이상의 내용을 패턴 공간에 넣으려면 ‘N’ 명령어나 이와 유사한 방법(예: ‘H;...;g;’)을 사용하십시오.

   Sed는 다음과 같이 작동합니다. sed는 한 번에 한 줄씩 읽고 줄 끝의 개행 문자를 잘라내고, 남은 내용을 패턴 공간에 넣고 sed 스크립트가 이를 참조하거나 변경할 수 있게 하며, 패턴 공간이 출력될 때 stdout(또는 파일)에 개행 문자를 추가합니다. 만약 패턴 공간이 ‘d' 나 'D’ 명령어로 전체 또는 일부가 삭제되면, 이런 경우는 줄바꿈 문자가 *추가되지* 않습니다. 따라서 다음과 같은 스크립트

       sed ‘s/\n//’ file             # 각 줄에서 줄바꿈을 삭제하기 위해
       sed ‘s/\n/foo\n/’ file        # 각 줄 끝에 단어를 추가하기 위해

   는 _절대_ 작동하지 않습니다!! 왜냐하면 줄 끝의 줄바꿈은 해당 줄이 패턴 공간에 저장되기 _이전에_ 제거되기 때문입니다. 위의 작업을 수행하려면, 대신 다음 스크립트 중 하나를 사용하십시오:

       tr -d ‘\n’ < file              # tr을 사용해서 줄바꿈 제거
       sed ‘:a;N;$!ba;s/\n//g’ file   # GNU sed를 사용해서 줄바꿈 제거
       sed ‘s/$/ foo/’ file           # 각 줄 끝에 “foo” 추가

   GNU sed를 제외한 다른 버전의 sed는 패턴 버퍼의 크기에 제한이 있으므로, 여기서는 유닉스 ‘tr’ 유틸리티를 사용하는 것이 좋습니다. 파일 마지막 줄에 줄바꿈 문자가 포함될 경우, GNU sed는 해당 줄바꿈 문자를 출력에 추가하되 다른 모든 줄바꿈 문자는 삭제하는 반면, tr 은 모든 줄바꿈 문자를 삭제합니다.

   두 줄 이상의 블록을 일치시키려면 다음 3가지 기본 방법이 있습니다:
 
   (1) ‘N’ 명령을 사용해서 다음 줄을 패턴 공간에 추가하거나;
   (2) ‘H’ 명령을 최소 두 번 사용해서 현재 줄을 홀드 공간에 추가한 다음, x, g 또는 G를 사용해서 홀드 공간에서 해당 줄들을 가져오거나; 또는 
   (3) 주소 범위(위의 3.3절 참조)를 사용해서 지정된 두 주소 사이의 줄을 일치시키는 방법입니다.

   (1)과 (2)를 사용하면 패턴 공간에 \n 이 삽입되며, 이를 원하는 대로 참조할 수 있습니다(‘s/ABC\nXYZ/alphabet/g’). 'N' 을 사용해서 일련의 줄을 삭제하는 예시는 4.13절(“특정 연속된 줄 블록을 삭제하려면 어떻게 합니까?”)에 나와 있습니다. 이 예제는 삭제 명령어를 ‘p’(인쇄), ‘i’(삽입), ‘c’(변경), ‘a’(추가),
   또는 ‘s’(치환) 같은 다른 명령어로 변경해서 수정할 수 있습니다.

   선택지 (3)은 패턴 영역에 \n 을 삽입하지 않지만, 연속된 줄 블록과 일치하므로, 원하는 내용을 찾기 위해 \n 이 필요치 않을 수도 있습니다. 여러 버전의 sed가 이 구문을 지원하기 때문에:

       sed ‘/start/,+4d’               # “start”와 그 다음 4줄을 삭제하기 위해,

   기존의 ‘/from here/,/to there/{...}’ 범위 지정 방식 외에도, \n 을 아예 사용하지 않을 수 있습니다.


## 5.11. 스크립트가 “event not found” 오류 메시지와 함께 중단됩니다.

   이 오류는 sed가 아닌 csh 또는 tcsh 셸에서 주로 발생합니다. 감탄 부호(!)는 csh/tcsh 에서 특수 문자로, 명령줄이나 셸 스크립트에서 이를 사용할 경우—단일 따옴표 안에서도—반드시 앞에 백슬래시를 붙여야 합니다. 따라서 csh/tcsh 셸은:

       sed ‘/regex/!d’      # 실패함
       sed ‘/regex/\!d’     # 성공함

   “-f script.file” 같이 파일에서 스크립트를 호출할 때는 느낌표 앞에 백슬래시를 붙이지 않아야 합니다.

------------------------------



# 6. 기타 문제

## 6.1. 해결 방법을 모르는 문제가 있습니다. 어디서 도움을 받을 수 있나요?

   “sed-users” 메일링 리스트(2.3.2절)에 질문을 게시하세요. 그곳에는 수많은 sed 사용자들이 여러분의 질문을 볼 수 있습니다. 게시 권한을 얻으려면 먼저 메일링 리스트에 가입해야 합니다.

   또 다른 방법은 다음 뉴스그룹 중 하나를 이용하는 것입니다:

      - alt.comp.editors.batch
      - comp.editors
      - comp.unix.questions
      - comp.unix.shell


## 6.2. sed는 awk, perl 및 기타 유틸리티와 비교했을 때 어떤가요?

   Awk는 변수 이름, 수학 함수, 배열, 시스템 호출 등을 포함합니다. 명령 구조는 sed와 유사합니다:

      address { command(s) }

   이는 address와 일치하는 각 줄 또는 줄 범위에 명령을 실행함을 의미합니다. sed와 awk 모두에서 address는 줄 번호이거나, 줄 내의 정규 표현식(RE)이거나, 또는 둘 다일 수 있습니다.

   프로그램 크기 측면에서 awk 는 sed보다 3~10배 더 큽니다. awk는 sed의 기능 대부분을 갖추고 있지만, 전부는 아닙니다. 특히, sed는 이전 표현식에 대한 역참조(\1, \2, ...)를 지원하지만, awk는 이에 상응하는 구문이 없습니다. (한 가지 예외: GNU awk v3.0은 gensub() 이 도입되었는데, 이 함수는 치환 시에만 역참조를 지원합니다.)

   Perl은 범용 프로그래밍 언어로, 텍스트 처리 및 프로세스 간 통신을 넘어서는 다양한 기능을 갖추고 있으므로, awk나 다른 스크립트 언어보다 훨씬 더 뛰어난 성능을 발휘합니다. Perl은 sed가 지원하는 모든 기능을 지원할 뿐만 아니라, 자체적인 확장 정규 표현식 세트를 갖추고 있으므로 패턴 매칭 및 처리에 막강한 성능을 발휘합니다. (참고: 표준 Perl 배포판은 's2p' 라는 sed-to-perl 변환 스크립트가 포함되어 있습니다. 자세한 내용은 3.6절을 참조하십시오.)
 
   sed나 awk와 마찬가지로, Perl 스크립트는 바이너리 코드로 컴파일할 필요가 없습니다. sed와 마찬가지로, Perl도 명령줄에서 수많은 유용한 “한 줄 명령어” 를 실행할 수 있지만, 좀 더 큰 유연성을 제공합니다. 질문 4.41(“디렉토리 내의 모든 파일이나 전체 디렉토리 트리에서 치환을 수행하려면 어떻게 합니까?”)을 참조하십시오.

   반면, 현재 버전의 Perl은 실행 파일만 놓고 보더라도 sed보다 8배에서 35배 더 큽니다(Perl의 라이브러리 모듈과 관련 파일은 포함되지 않음!). 게다가 치환 같은 대부분의 간단한 작업의 경우, sed는 Perl이나 awk보다 더 빠르게 실행됩니다. 이 모든 유틸리티는 입력 텍스트를 처리해서 필요에 맞게... 혹은 임의적인 변덕에 따라 변환하는 역할을 합니다.


## 6.3. 언제 sed를 사용할까요?

   텍스트 파일 내의 단어, 줄, 또는 줄 블록을 수정하기 위해 작고 빠른 프로그램이 필요할 때입니다.


## 6.4. 언제 sed를 사용하면 안 될까요?

   해당 작업을 좀 더 빠르게 수행하거나 좀 더 쉬운 구문으로 처리할 수 있는 “전용” 도구가 있는 경우는 sed를 사용하면 안 됩니다. 다음과 같은 작업만 수행하려는 경우는 sed를 사용하지 마십시오:

   - 줄 자체 내의 패턴을 기준으로 개별 줄을 출력하는 경우.
     대신 “grep” 을 사용하십시오.

   - 특정 정규 표현식 위나 아래에 1줄 이상의 맥락을 포함해서 줄 블록을 출력하려는 경우. 
     대신 다음과 같이 GNU 버전의 grep 을 사용하십시오:

        grep -A{숫자} -B{숫자} “정규 표현식”

   - 줄 자체 내의 패턴을 기준으로 개별 줄을 제거하려는 경우.
     대신 “grep -v” 를 사용하십시오.

   - 줄 번호를 출력합니다. 
     대신 “nl” 또는 “cat -n” 을 사용하십시오.

   - 줄이나 단락의 서식을 재조정합니다. 
     대신 “fold”, ‘fmt’ 또는 “par” 를 사용하십시오.

   tr 유틸리티는 일부 간단한 작업에 sed보다 훨씬 더 적합합니다. 예를 들어, 다음과 같은 작업을 수행할 때:

   - 개별 문자를 삭제합니다. “s/[a-d]//g” 대신 다음을 사용하십시오.

        tr -d “[a-d]”

   - 연속된 문자를 압축합니다. “s/ee*/e/g” 대신 다음을 사용하십시오.

        tr -s “{문자 집합}”

   - 개별 문자를 변경합니다. “y/abcdef/ABCDEF/” 대신 다음을 사용하십시오.

        tr “[a-f]” “[A-F]”

   단, tr 은 명령줄에서 입력 파일을 지정하는 것을 지원하지 않으므로 사용 구문은 다음과 같습니다:

     tr {옵션 및 패턴} < 입력 파일

   또는, 여러 파일을 처리하려면:

     cat 입력 파일1 입력 파일2 | tr {옵션 및 패턴}

   파일이 여러 개인 경우, sed 대신 tr 을 사용하는 것은 종종 유용한 작업이라기 보단 연습에 가깝습니다. sed는 cat, grep, nl, rev, sort, tac, tail, tr, uniq
   및 기타 유틸리티의 특정 기능을 완벽하게 모방해서 동일한 출력을 생성할 수 있지만, 기본 제공 유틸리티는 대개 sed보다 작업을 좀 더 빠르게 수행하도록 최적화되어 있습니다.


## 6.5. 언제 sed를 제쳐두고 awk나 Perl을 사용할까요?

   동일한 스크립트를 awk나 Perl로 작성할 수 있고, 그 작업에 걸리는 시간이 더 짧다면, Perl이나 awk를 사용하십시오. Perl로 10분 만에 처리할 수 있고(이미 Perl을 알고 있다고 가정할 때), 처리 시간이나 메모리 사용량이 문제되지 않는다면, 한 시간이나 들여서 sed 스크립트를 작성하고 디버깅할 이유는 전혀 없습니다. 곁에 산탄총이 있는데도 .22구경 소총으로 꿩을 사냥하지 마세요... 물론 단순히 그 도전 자체를 즐긴다면 모를까요!

   구체적으로, 다음과 같은 경우 awk나 Perl을 사용하세요:

      - 한 줄에 있는 필드나 단어의 개수를 세야할 때. (awk)
      - 블록 내의 줄 수나 파일 내의 객체 수를 세야할 때.
      - 문자열의 길이를 확인하거나 산술 연산을 수행할 때.
      - 매우 긴 줄을 처리하거나 매우 큰 버퍼가 필요한 경우. (또는 gsed)
      - 바이너리 데이터(제어 문자)를 처리할 때. (perl: binmode)
      - 배열이나 리스트를 순회할 때.
      - 파일 존재 여부, 파일 크기 또는 생성 날짜를 확인할 때.
      - 각 단락을 한 줄로 취급할 때. (물론, 항상 그런 것은 아닙니다)


## 6.6. sed 버전별 알려진 제한 사항

   배포판별로 제한 사항이 있으나, 대부분의 무료 sed 버전의 소스 코드는 수정 및 재컴파일 가능합니다. 아래에 사용된 것 같이, “제한 없음” 은 “고정된” 제한이 없음을 의미합니다. 제한 사항은 실제로 사용자의 하드웨어, 메모리, 운영 체제, 그리고 sed를 컴파일하는 데 사용된 C 라이브러리에 따라 결정됩니다.


### 6.6.1. 최대 줄 길이

      GNU sed:        제한 없음
      ssed:           제한 없음
      sedmod v1.0:    4096 바이트
      HHsed v1.5:     4000 바이트
      sed v1.6:       [미정]

### 6.6.2. 모든 버퍼의 최대 크기 (패턴 공간 + 홀드 공간)

      GNU sed:        제한 없음
      ssed:           제한 없음
      sedmod v1.0:    4096 바이트
      HHsed v1.5:     4000 바이트
      sed v1.6:       [미정]

### 6.6.3. read 명령어로 읽을 수 있는 파일의 최대 개수

      GNU sed v3+:    제한 없음
      ssed:           제한 없음
      GNU sed v2.05:  r 및 w 명령어의 총 개수가 32개를 초과할 수 없음
      sedmod v1.0:    r 및 w 명령어의 총 개수가 20개를 초과할 수 없음
      sed v1.6:       [미정]

### 6.6.4. ‘w’ 명령어로 쓸 수 있는 최대 파일 수

      GNU sed v3+:    제한 없음 (하지만 일반적인 유닉스 시스템에서는 253개)
      ssed:           제한 없음 (하지만 일반적인 유닉스 시스템에서는 253개)
      GNU sed v2.05:  r 및 w 명령어의 총 개수는 32개를 초과할 수 없음
      sedmod v1.0:    10
      HHsed v1.5:     10
      sed v1.6:       [미정]

### 6.6.5. 레이블 이름의 길이 제한

      GNU sed:        제한 없음
      ssed:           제한 없음
      HHsed v1.5:     제한 없음
      sed v1.6:       [미정]
      BSD sed:        8자

   GNU sed와 ssed는 모두 세미콜론을 레이블 이름의 끝으로 간주한다는 점에 유의하십시오.

### 6.6.6. 파일 쓰기 이름의 길이 제한

      GNU sed:        제한 없음
      ssed:           제한 없음
      HHsed v1.5:     제한 없음
      sed v1.6:       [미정]
      BSD sed:        40자

### 6.6.7. 분기/점프 명령어의 제한

      GNU sed:        제한 없음
      ssed:           제한 없음
      HHsed v1.5:     50
      sed v1.6:       [미정]

   실질적으로 이는 HHsed가 N 명령어를 통해 패턴 공간에 50줄 이상을 읽어들이지 않는다는 것을 의미하며, 비록 패턴 공간의 크기가 수백 바이트에 불과하더라도 마찬가지입니다. HHsed는 “{nn}행에서 무한 분기 루프 발생” 오류 메시지를 표시하며 종료됩니다.


## 6.7. sed 버전 간 알려진 비호환성

### 6.7.1. 명령줄에서 명령어 실행

   대부분의 sed 버전은 세미콜론(;)으로 구분해서 명령줄에서 여러 명령어를 실행할 수 있도록 허용합니다. 따라서,

       sed ‘G;G’ file

   파일의 공백을 3배로 늘려야 합니다. 하지만 GNU sed가 아닌 경우, 일부 명령어는 명령줄에서 별도의 표현식을 *반드시* 사용해야 합니다. 여기는 다음도 포함됩니다:

      - 모든 레이블 (‘:a’, ‘:more’ 등)
      - 모든 분기 지시어(‘b’, ‘t’)
      - 파일 읽기 및 쓰기 명령어(‘r’ 및 ‘w’)
      - 모든 닫는 중괄호, '}'

   이런 명령어를 사용할 경우, 반드시 표현식 마지막 명령어여야 합니다. 그 뒤의 명령어는 다른 표현식(다른 -e 스위치와 인자)을 사용해야 합니다. 예를 들어,

     sed  -e :a -e ‘s/^.\{1,77\}$/ &/;ta’ -e ‘s/\( *\)\1/\1/’ files

   GNU sed, ssed, sed15 및 sed16은 모두 이런 명령 뒤에 세미콜론을 붙일 수 있도록 허용하므로, 앞서 언급한 스크립트는 다음과 같이 작성할 수 있습니다:

     sed  ‘:a;s/^.\{1,77\}$/ &/;ta;s/\( *\)\1/\1/’ files

   버전에 따라 ‘a’(추가), ‘c’(변경) 및 ‘i’(삽입) 명령어의 구현 방식이 다릅니다:

      sed “/foo/i New text here”              # HHsed/sedmod/gsed-30280
      gsed -e “/foo/i\\” -e “New text here”   # GNU sed
      sed1 -e “/foo/i” -e “New text here”     # sed의 한 버전
      sed2 “/foo/i\ New text here”            # 다른 버전


### 6.7.2. 주석 사용 (‘#’ 기호로 시작하는)

   대부분의 sed 버전은 스크립트의 첫 번째 줄만 주석이 나타날 수 있도록 허용합니다. 두 번째 줄이나 그 이후의 주석은 인식되지 않으며, “알 수 없는 명령어” 또는 “명령어 [여기 잘못된 줄]의 끝에 무의미한 문자가 있습니다” 같은 오류가 발생합니다.

   GNU sed, HHsed, sedmod 및 HP-UX sed는 레이블과 분기 명령어(b, t) 뒤를 제외하고 스크립트의 모든 줄에 주석을 넣을 수 있도록 허용합니다. 단, 명령어 자체 뒤에 세미콜론(;)이 와야 합니다. *단,* 이 구문 덕분에 sed는 스크립트에 유사한 주석 구조를 사용하는 awk 및 perl과 비슷해집니다. 따라서,

      # GNU 스타일 sed 스크립트
      $!N;                            # 마지막 줄을 제외하고 다음 줄을 가져옴
      s/^\([0-9]\{5\}\).*\n\1.*//;    # 각 줄의 첫 5자리 숫자가
                                      # 일치하면 두 줄 모두 삭제합니다.
      t skip
      P;                              # 일치하는 행이 없을 때만 첫 번째 줄 출력
      :skip
      D;                              # 패턴 공간의 첫 번째 줄을 삭제하고 반복
      #---스크립트 끝---

   는 GNU 기반 sed 버전에서 유효한 스크립트이지만, 다른 대부분의 sed 버전은 인식되지 않습니다.

   마지막으로, 디스크 파일 스크립트의 처음 두 문자가 “#n” 인 경우, 마치 명령행에서 -n 을 입력한 것과 똑같이 출력이 억제됩니다. 이는 다음 버전의 sed에서 적용됩니다:

      - ssed v3.57 이상
      - gsed
      - HHsed v1.5
      - sed v1.6

   다음 버전의 sed는 이 구문을 인식하지 못합니다:

      - ssed v3.45 ~ v3.50 (다른 버전은 테스트되지 않음)
      - sedmod v1.0


### 6.7.3. 정규 표현식의 특수 구문

#### A. HHsed v1.5 (Howard Helman 저)

   다음 표현식은 /RE/ 주소나 치환 왼쪽(LHS)에서 사용할 수 있습니다:

      +    - 이전 정규 표현식이 1회 이상 반복됨: \{1,\}과 동일
      \<   - 비단어 문자와 단어 문자 사이의 경계
      \>   - 단어 문자와 비단어 문자 사이의 경계

   다음 표현식은 /RE/ 주소나 치환 양쪽 모두에서 사용할 수 있습니다:

      \a   - 벨            (ASCII 07, 0x07)
      \b   - 백스페이스    (ASCII 08, 0x08)
      \e   - 이스케이프    (ASCII 27, 0x1B)
      \f   - 페이지 피드   (ASCII 12, 0x0C)
      \n   - 줄바꿈        (DOS에서는 2바이트, 0D 0A 또는 ^M^J로 출력됨)
      \r   - 리턴          (ASCII 13, 0x0D)
      \t   - 탭            (ASCII 09, 0x09)
      \v   - 수직 탭       (ASCII 11, 0x0B)
      \xHH - 2자리 16진수 HH에 해당하는 ASCII 문자.

#### B. sed v1.6 (Walter Briscoe 작성)

   sed v1.6은 (위의) sed v1.5에서 지원하는 모든 표현식을 허용하며, 여기에 더해 다음 요소들도 사용할 수 있습니다. 이 요소들은 (위에 나열된 것들 외에도) 치환 우측(RHS)에서 사용할 수 있습니다:

      \\~  - 마지막 s/// 명령에서 정의된 대체 패턴 삽입  (RHS에서 단독으로 사용해야 함)
      \l   - 다음 요소를 소문자로 변환
      \L   - 나머지 요소를 소문자로 변환
      \u   - 다음 요소를 대문자로 변환
      \U   - 나머지 요소를 대문자로 변환
      \e   - 다음 요소의 대소문자 변환 종료
      \E   - 나머지 요소에 대한 대소문자 변환을 종료
      $0   - 치환 위치 바로 앞에 패턴 공간을 삽입
      $1-$9 - 패턴 공간에서 N번째 단어를 일치시킴

#### C. sedmod v1.0 (작성자: Hern Chen)

   다음 표현식은 치환식 좌측(LHS)의 /RE/ 주소에 사용할 수 있습니다.

      +    - 이전 정규 표현식이 1회 이상 반복됨: \{1,\}과 동일
      \a   - 임의의 영숫자: [a-zA-Z0-9]와 동일
      \A   - 알파벳 1개 이상: \a+와 동일
      \d   - 임의의 숫자: [0-9]와 동일
      \D   - 숫자 1개 이상: \d+와 동일
      \h   - 임의의 16진수: [0-9a-fA-F]와 동일
      \H   - 1개 이상의 16진수 문자: \h+와 동일
      \l   - 임의의 문자: [A-Za-z]와 동일
      \L   - 1개 이상의 문자: \l+와 동일
      \n   - 줄 바꿈 (DOS에서는 2바이트, 0D 0A 또는 ^M^J로 읽힘)
      \s   - 임의의 공백 문자: 공백, 탭 또는 수직 탭
      \S   - 1개 이상의 공백 문자: \s+와 동일
      \t   - 탭 (ASCII 09, 0x09)
      \<   - 비단어 문자와 단어 문자 사이의 경계
      \>   - 단어 문자와 비단어 문자 사이의 경계

다음 표현식은 치환식 우측(RHS)에서 사용할 수 있습니다. “요소”란 \1 .. \9, &, $0 또는 $1 .. $9 를 의미합니다:

      &    - 좌측(LHS)에 정의된 정규식을 삽입합니다
      \e   - 다음 요소의 대소문자 변환을 종료합니다
      \E   - 나머지 요소의 대소문자 변환을 종료합니다
      \l   - 다음 요소를 소문자로 변경
      \L   - 나머지 요소를 소문자로 변경
      \n   - 줄바꿈 (DOS에서는 2바이트, 0D 0A 또는 ^M^J로 출력됨)
      \t   - 탭 (ASCII 09, 0x09)
      \u   - 다음 요소를 대문자로 변경
      \U   - 나머지 요소를 대문자로 변경
      $0   - 원본 패턴 공간을 삽입
      $1-$9 - 패턴 공간에서 N번째 단어와 일치

#### D. UnixDos sed

   텍스트, LHS 및 RHS에서 다음 표현식을 사용할 수 있습니다:

      \n   - 줄바꿈      (DOS에서는 2바이트, 0D 0A 또는 ^M^J로 출력됨)
 
#### E. GNU sed v1.03 (Frank Whaley 제작)

   명령행에서 -x (확장) 스위치를 함께 사용하거나, 스크립트의 첫 번째 줄에 '#x' 가 나타날 경우, Whaley의 gsed103은 치환식의 좌측(LHS)과 우측(RHS) 모두에서 다음 표현식을 지원합니다:

      \|      양쪽 모두에서 해당 표현식과 일치
      ?       이전 정규 표현식이 0회 또는 1회 발생: \{0,1\}과 동일
      +       이전 정규 표현식이 1회 이상 발생: \{1,\}과 동일
      \a      “알림” 신호음 (BEL, Ctrl-G, 0x07)
      \b      백스페이스 (BS, Ctrl-H, 0x08)
      \f      폼피드 (FF, Ctrl-L, 0x0C)
      \n      줄바꿈 (LF, Ctrl-J, 0x0A)
      \r      캐리지 리턴  (CR, Ctrl-M, 0x0D)
      \t      수평 탭 (HT, Ctrl-I, 0x09)
      \v      수직 탭 (VT, Ctrl-K, 0x0B)
      \bBBB   이진 문자, 여기서 BBB는 1~8개의 이진 자릿수, [0-1]
      \dDDD   십진수 문자, 여기서 DDD는 1~3개의 십진수 자릿수, [0-9]
      \oOOO   8진수 문자, 여기서 OOO는 1~3개의 8진수 자릿수, [0-7]
      \xHH    16진수 문자, 여기서 HH는 1~2개의 16진수 자릿수, [0-9A-F]

   일반 모드는 -x 스위치의 사용 여부와 관계없이, 정규식 주소 지정이나 치환의 왼쪽 부분(LHS)에서 다음 이스케이프 시퀀스도 지원됩니다:

      \`      패턴 공간의 시작과 일치: /^/와 동일
      \'      패턴 공간의 끝과 일치: /$/와 동일
      \B      두 단어 또는 두 비단어 문자 사이의 경계
      \w      모든 비단어 문자 [*버그!* 단어 문자로 처리되어야 함]
      \W      모든 비단어 문자: /[^A-Za-z0-9]/와 동일
      \<      비단어 문자와 단어 문자 사이의 경계
      \>      단어 문자와 비단어 문자 사이의 경계

#### F. GNU sed v2.05 및 이후 버전

   다음 표현식은 /RE/ 주소나 치환 왼쪽(LHS)에서 사용할 수 있습니다:

      \`  - 패턴 공간의 시작과 일치 ( “^”와 동일)
      \'  - 패턴 공간의 끝과 일치 ( “$”와 동일)
      \?  - 이전 문자가 0회 또는 1회 나타나는 경우: \{0,1\}과 동일
      \+  - 이전 문자가 1회 이상 나타나는 경우: \{1,\}과 동일
      \|  - 양쪽 문자열 중 하나와 일치, 예: foo\|bar
      \b  - 단어 문자와 비단어 문자 사이의 경계 (역방향도 가능)
      \B  - 두 단어 문자 사이 또는 두 비단어 문자 사이의 경계
      \n  - 내장된 줄바꿈 (N, G 또는 이와 유사한 명령어 뒤에 사용 가능)
      \w  - 모든 단어 문자: [A-Za-z0-9_]
      \W  - 모든 비단어 문자: [^A-Za-z0-9_]
      \<  - 비단어 문자와 단어 문자 사이의 경계
      \>  - 단어 문자와 비단어 문자 사이의 경계

   \b, \B, \< 및 \> 는 아래 6.7.4절(“단어 경계”)을 참조하십시오.

   문서화되지 않은 -r 스위치:

   버전 3.02부터 GNU sed는 문서화되지 않은 -r 스위치가(버전 4.0까지 문서화되지 않음) 있으며, 이 스위치는 다음과 같은 방식으로 확장 정규 표현식을 활성화합니다:

       ?      -  이전 문자가 0회 또는 1회 등장
       +      -  이전 문자가 1회 이상 등장
       |      -  양쪽 문자열과 일치, 예: foo|bar
       (...)  -  백슬래시 없이 그룹화를 활성화
       {...}  -  백슬래시 없이 범위 표현식을 활성화

   -r 스위치(기호: “정규 표현식”)를 사용할 경우, 특수 의미를 비활성화하려면 이런 기호 앞에 백슬래시를 붙이십시오.

   이스케이프 시퀀스:

   버전 3.02.80부터, 다음 이스케이프 시퀀스를 “s///” 치환 양쪽에서 사용할 수 있습니다:

      \a      “경고” 신호음 (BEL, Ctrl-G, 0x07)
      \f      폼피드 (FF, Ctrl-L, 0x0C)
      \n      줄바꿈 (LF, Ctrl-J, 0x0A)
      \r      캐리지 리턴 (CR, Ctrl-M, 0x0D)
      \t      수평 탭 (HT, Ctrl-I, 0x09)
      \v      수직 탭 (VT, Ctrl-K, 0x0B)
      \oNNN   8진수 값 NNN을 가진 문자
      \dNNN   10진수 값 NNN을 가진 문자
      \xHH    16진수 값 HH를 가진 문자

   GNU sed는 위 3.7절에서 설명한, 정규 표현식에 대한 POSIX 확장 기능인 “문자 클래스”도 지원한다는 점에 유의하십시오.

#### G. sed 4.0 및 그 이후 버전

   다음 표현식들은 치환 우측(RHS)에서 사용할 수 있습니다.

      \e   - 대소문자 변환 종료
      \l   - 다음 문자를 소문자로 변경
      \L   - 나머지 텍스트를 소문자로 변경
      \n   - 줄바꿈 (DOS에서는 2바이트, 0D 0A 또는 ^M^J로 출력됨)
      \t   - 탭 (ASCII 09, 0x09)
      \u   - 다음 문자를 대문자로 변환
      \U   - 나머지 텍스트를 대문자로 변환

   또한, GNU sed 4.0는 ^ 와 $ 의 해석 방식을 수정할 수 있어, ^ 가 줄바꿈 문자 뒤의 빈 문자열과도 일치하도록 하고, $ 가 줄바꿈 문자 앞의 빈 문자열과도 일치하도록 처리할 수 있습니다(이를 수행하려면 정규 표현식 종료자 뒤에 “M” 을 추가하면 됩니다. 예: /^>/M -- 3.1.1절 참조). 이 기능을 사용하더라도, \` 와 \' 는 여전히 패턴 공간의 시작과 끝을 각각 일치시킵니다.

#### H. ssed

   GNU sed에 설명한 모든 내용은 ssed도 동일하게 적용됩니다. 또한 Perl 모드(-R 스위치)는 다음 옵션들이 활성화되거나 비활성화됩니다:

      .     - 더 이상 줄바꿈 문자와 일치하지 않습니다
      \A    - 패턴 공간의 시작 부분과 일치합니다
      \Z    - 패턴 공간의 끝 부분 또는 패턴 공간 내의 마지막 줄바꿈 문자와 일치합니다
      \z    - 패턴 공간의 끝과 일치
      \d    - 임의의 숫자와 일치: [0-9]와 동일
      \D    - 숫자가 아닌 임의의 문자와 일치: [^0-9]와 동일
      \`    - 더 이상 패턴 공간의 시작과 일치하지 않음
      \'    - 더 이상 패턴 공간의 끝과 일치하지 않음
      \<    - 더 이상 비단어 문자와 단어 문자 사이의 경계를 일치시키지 않음
      \>    - 더 이상 단어 문자와 비단어 문자 사이의 경계를 일치시키지 않음
      \oNNN - 더 이상 8진수 값이 NNN인 문자를 일치시키지 않음
      \dNNN - 더 이상 10진수 값이 NNN인 문자를 일치시키지 않음
      \NNN  - 8진수 값이 NNN인 문자를 일치시킴

   Perl 모드는 룩어헤드(?=match) 및 룩비하인드(?<=match) 패턴 매칭을 지원합니다. 검색 일치된 텍스트는 s/// 치환 시 “&” 에 캡처되지 않습니다!!

      foo(?=bar)              - “bar”가 뒤따를 때만 “foo”와 일치
      foo(?!bar)              - “bar”가 뒤따르지 않는 경우에만 “foo”와 일치
      (?<=foo)bar             - “foo”가 앞에 오는 경우에만 “bar”와 일치
      (?<!foo)bar             - “foo”가 앞에 오지 않는 경우에만 “bar”와 일치

      (?<!in|on|at)foo        - “in”, ‘on’ 또는 “at”이 앞에 오지 않는 경우에만 “foo”를 일치시킵니다
      (?<=\d{3})(?<!999)foo   - “999”가 아닌 3자리 숫자가 앞에 오는 경우에만 “foo”를 일치시킵니다

   Perl 모드는 /addressing/ 또는 s/// 명령에 두 가지 새로운 스위치가 추가되었습니다. s/// 명령은 스위치를 소문자로 사용할 수 있지만, /addressing/ 는 반드시 대문자로 사용해야 합니다:

       /S  - “.” 가 줄바꿈과도 일치하도록 합니다
       /X  - 여분의 공백을 무시합니다. 사용 예시는 아래를 참조하십시오.

   다음은 Perl 스타일 정규 표현식의 몇 가지 예시입니다. -R 스위치를 사용하십시오.

     (?i)abc       - 대소문자를 구분하지 않고 abc, ABC, aBc, ABc 등을 일치시킵니다.
     ab(?i)c       - 위와 동일합니다. (?i)는 패턴 전체에 적용됩니다.
     (ab(?i)c)     - abc 또는 abC와 일치합니다. 겉 괄호가 차이를 만듭니다!
     (?m)          - 여러 줄에 걸친 패턴 영역: “s/FIND/REPL/M”과 동일
     (?s)          - “.”가 줄바꿈도 일치하도록 설정: “s/FIND/REPL/S”와 동일
     (?x)          - 공백과 #주석을 무시; 아래 (9) 절 참조.

     (?:abc)foo    - “abcfoo”와 일치하지만, \1에는 'abc'를 캡처하지 않음
     (?:ab|cd)ef   - “abef” 또는 “cdef”와 일치; \1에는 'cd'만 캡처됨
     (?#remark)xy  - “xy”와 일치; “#” 뒤의 주석은 무시됨.


   다음은 복잡한 표현식에 주석을 추가하기 위해 /X 스위치를 사용하는 몇 가지 예시입니다. 리터럴 공백을 삽입하려면 앞에 \ 를 붙이거나 [대괄호] 안에 넣으십시오.

     # “(123) 456-7890”을 “[ac123] 456-7890”으로 변경하는 ssed 스크립트
     #
     s/                   # 각 줄 끝에는 백슬래시가 필요합니다!   \
     \(                   # 리터럴 왼쪽 괄호, (    \
     (\d{3})              # 3자리 숫자                 \
     \)                   # 리터럴 오른쪽 괄호, )   \
     [ \t]*               # 공백 또는 탭 0개 이상  \
     (\d{3}-\d{4})        # 3자리 숫자, 하이픈, 4자리 숫자   \
     /[ac\1] \2/gx;       # g(전역)으로, e(확장) 공백을 사용해서 치환


### 6.7.4. 단어 경계

   GNU sed, ssed, sed16, sed15 및 sedmod는 특정 기호를 사용해서 “단어 문자” 와 비-단어 문자 사이의 경계를 정의합니다. 단어 문자는 정규식 “[A-Za-z0-9_]” 에 부합합니다. 참고: 단어 문자는 밑줄 “_” 을 포함하지만 하이픈은 포함하지 않습니다. 이는 아마도 sed 및 다른 스크립팅 언어에서 밑줄이 레이블로 허용되기 때문일 것입니다.(gsed103은 단어 문자에 밑줄이 포함되지 않았으며, 영숫자만 포함했습니다.)

   이런 기호는 ‘\<’ 및 ‘\>’ (gsed, ssed, sed15, sed16, sedmod)와 ‘\b’ 및 ‘\B’ (gsed 전용)가 포함됩니다. 경계 기호는 문자를 나타내는 것이 아니라 줄 내의 위치를 나타낸다는 점에 유의하십시오. 
 
   단어 경계 기호는 리터럴 문자나 문자 집합과 함께 사용되어, 단어 외부의 공백이나 구두점에 영향을 주지 않고 단어 전체를 일치시키고(삭제하거나 변경할 수 있게) 해줍니다. 이 기호들은 “/pattern/” 주소나 ‘s/LHS/RHS/’ 명령 왼쪽 부분(LHS)에서 사용할 수 있습니다. 다음 표는 이런 기호들이 HHsed와 GNU sed에서 어떻게 사용될 수 있는지를 보여줍니다. Sedmod는 HHsed의 구문을 따릅니다.

      일치 위치      사용 가능한 단어 경계       HHsed   GNU sed
      ---------------------------------------------------------------
      단어 시작      [비단어 문자]^[단어 문자]   \<    \< 또는 \b
      단어 끝        [단어 문자]^[비단어 문자]   \>    \> 또는 \b
      단어 중간      [단어 문자]^[단어 문자]     없음      \B
      단어 외부      [비단어 문자]^[비단어 문자] 없음      \B
      ---------------------------------------------------------------

   ssed에서 ‘\<’ 및 ‘\>’ 기호는 -R 스위치를 사용해서 Perl 스타일의 표현식을 호출할 때 특수한 의미를 잃게 됩니다. 그러나 ‘\<' 와 ’\>' 와 동일한 의미를 다음과 같은 일치하지 않는 0폭 어설션을 통해 얻을 수 있습니다:

       (?<!\w)(?=\w)  및   (?<=\w)(?!\w)


### 6.7.5. 다르게 동작하는 명령어

   A. GNU sed 버전 3.02 및 3.02.80

   N 명령어는 더 이상 파일 끝에 도달했을 때 패턴 공간의 내용을 버리지 않습니다. 이는 버그가 아니라 의도된 기능입니다. 그러나 이는 N 의 이전 동작에 의존하던 특정 스크립트의 작동을 방해합니다.

   'N' 은 다음 줄을 패턴 공간에 추가해서, 여러 줄을 저장하고 이에 대한 작업을 수행할 수 있게 합니다. 파일 마지막 줄에 도달했을 때 N 명령을 다시 실행하면,
   패턴 공간의 내용은 아무런 경고 없이 삭제되고 스크립트가 중단되었습니다(이는 기존 동작 방식이었습니다). 이런 이유로 sed 사용자들은 일반적으로 다음과 같이 작성했습니다:

       $!N;        # 마지막 줄을 제외한 모든 줄에 다음 줄을 추가하기 위해.

   그러나 파일 끝의 빈 줄을 삭제하는 스크립트(위의 3.2절 “일반적인 한 줄 sed 스크립트”에 있는 스크립트 #12 참조) 같이, 특정 sed 스크립트들은 이 동작에 의존하고 있었습니다. 또한, 데일 더허티(Dale Dougherty)와 아놀드 로빈스(Arnold Robbins)의『_sed & awk_』같은 고전적인 교재들도 이전 동작 방식이 기록되어 있었습니다.

   GNU sed 유지보수자는 이로 인해 발생할 이식성 문제에도 불구하고, N 명령어가 패턴 영역을 삭제하는 대신 출력하도록 변경하는 것이 “다음 줄을 추가” 하는 명령어가 _어떻게 동작해야 하는지_ 에 대한 직관적 기대와 좀 더 일관성이 있다고 판단했습니다. 이 변경을 뒷받침하는 또 다른 사실은, “{N;command;}” 가 파일의 줄 수가 홀수일 때는 마지막 줄을 삭제하지만, 파일의 줄 수가 짝수일 때는 마지막 줄을 출력한다는 점입니다.

   N 의 이전 동작(EOF에 도달 시 패턴 영역을 삭제)을 사용하던 스크립트를 모든 버전의 sed와 호환되는 스크립트로 변환하려면, 단독 사용된 “N;” 을 “$d;N;” 으로 변경하십시오.

------------------------------




# 7. SED 버전에 존재하는 알려진 버그

   대부분의 GNU sed 및 ssed 버전은 아카이브 소스 코드에 잘 알려진 오류나 버그로 오해할 수 있는 보고된 동작을 담은 “버그 목록” 이 포함되어 있습니다. 이 sed FAQ의 해당 부분은 이런 버그 목록 파일을 완전히 재현하려는 것이 _아닙니다_. 그러나 우리는 특히 특정 프로그램에 자체적인 “버그 목록” 이 없거나 적극적으로
   유지보수되지 않는 경우, 실질적인 보고를 시도하고 있습니다.

   경험상, sed-users 메일링 리스트에서 누군가에게 버그로 인해 “피해를 입는” 경우, 저는 이를 보고하는 편입니다.


## 7.1. ssed v3.59 (Paolo Bonzini 작성)

   (1) N 은 파일 끝에 도달했을 때 패턴 공간의 내용을 버리지 않습니다. 이는 버그가 아닙니다. 위의 6.7.5.A 절을 참조하십시오.

   (2) 치환 우측(RHS)에 \x26 가 입력되면, 이는 앰퍼샌드 메타문자로 해석되며, “find” 부분에서 일치된 전체 패턴이 해당 지점에 삽입됩니다. 대신 리터럴
   앰퍼샌드를 삽입해야 합니다.

   (3) Windows 2000 환경에서 -i 스위치는 백업 파일을 제대로 생성하지 않습니다. 처리할 파일을 하나 이상 전달하면, 원본 파일은 변경되지 않은 채로 남아 있으며, 변경된 출력 파일에는 sedDOSxyz 같은 파일명이 부여되고 원본 파일의 이름과 대응시킬 방법이 없습니다.


## 7.2. GNU sed v4.0 - v4.0.5

   (1) N 은 파일 끝에 도달했을 때 패턴 공간의 내용을 버리지 않습니다. 이는 버그가 아닙니다. 위의 6.7.5.A 절을 참조하십시오.

   (2) 치환 우측(RHS)에 \x26이 입력되면, 이는앰퍼샌드 메타문자로 해석되며, “find” 부분에서 일치된 전체 패턴이 해당 위치에 삽입됩니다. 대신 리터럴 앰퍼샌드를 삽입해야 합니다.


## 7.3. GNU sed v3.02.80

   (1) N 은 파일 끝에 도달했을 때 패턴 공간의 내용을 버리지 않습니다. 이는 버그가 아닙니다. 위의 6.7.5.A 절을 참조하십시오.

   (2) 위의 GNU sed v4.0에 대한 #2 항목과 동일합니다.


## 7.4. GNU sed v3.02

   (1) MS-DOS 및 MS-Windows용 DJGPP로 컴파일된 v3.02 바이너리만 영향을 미칩니다: ‘l’ (목록) 명령은 줄에 포함된 단독 캐리지 리턴(0x0D, ^M)을 표시하지 않습니다.

   (2) “\<” 표현식은 다음과 같은 유형의 치환을 시도할 때 문제를 일으키며, 이 경우 “+aaa +bbb” 가 출력되야 합니다:

       echo aaa bbb | sed ‘s/\</+/g’    # “+a+a+a +b+b+b”를 출력합니다
       echo aaa bbb | sed ‘s/\<./+&/g’  # “+a+a+a +b+b+b”를 출력합니다

   (3) N 명령어는 파일 끝에 도달했을 때 더 이상 패턴 공간의 내용을 버리지 않습니다. 이는 버그가 아니라 의도된 기능입니다. 6.7.5절, “다르게 작동하는 명령어” 를 참조하십시오.


## 7.5. GNU sed v2.05

   (1) 대체 명령어 뒤에 숫자가 따라오고(예: s/f/F/10), 그 숫자가 패턴 공간에서 일치할 수 있는 개수를 초과하는 경우, ‘t label’ 명령어는 _항상_ 지정된 레이블로 점프합니다. 't' 는 대체가 성공했을 때(또는 “true”를 반환했을 때)만 점프해야 합니다.

   (2) ‘l’(목록) 명령어는 뒤따르는 문자들을 16진수 값으로 변환하지 않고, 변경 없이 그대로 전달합니다: 0xF7, 0xFB, 0xFC, 0xFD, 0xFE.

   (3) “/foo/,14” 같은 범위 주소는 “foo” 가 처음 나타나는 위치부터 14번째 줄까지(14번째 줄 포함)의 모든 줄과 일치한 다음, 그 이후부터는 “foo” 가 포함된 줄만 일치시켜야 합니다. gsed v2.05는, “foo” 가 파일 후반부에 나타날 경우, 그 지점부터 파일 끝까지의 모든 줄이 일치 대상으로 처리됩니다(gsed가 14번째 줄이
   다시 나타날 것을 찾기 때문입니다!).

   (4) 정규 표현식 /\`/ 및 /\'/ 는 예상과 달리 백쿼트 및 아포스트로피로 해석되지 않습니다. 대신, 이 표현식들은 GNU 버전의 Emacs 및 awk에서 사용되는 유사한 정규 표현식과 호환되도록 각각 줄의 시작과 끝을 나타내는 데 사용됩니다. 그 결과, 아포스트로피를 명확하게 표시할 방법이 없습니다.
 
   왜냐하면 단순한 아포스트로피(')는 유닉스 셸에서 특별한 의미를 가지며, 따옴표로 묶인 아포스트로피(\')는 줄 끝(EOL)으로 해석되기 때문입니다. 큰따옴표 안의 아포스트로피(\\')는 sed에서 백슬래시로, 셸에서 따옴표로 해석되어 이 역시 기대했던 결과를 제공하지 못했습니다. 이 구문은 gsed의 다음 버전에서 변경되었습니다.

   (5) 여기서 볼 수 있듯이, 파일 내에 “aaa” 와 “bbb” 가 모두 포함된 경우, ‘w’ 명령을 여러 번 실행하면 오류가 발생합니다:

       gsed -e “/aaa/w FILE” -e “/bbb/w FILE” input.txt

   (6) “\<” 표현식은 다음과 같은 유형의 치환을 시도할 때 문제를 일으키며, 이 경우 “+aaa +bbb” 가 출력되야 합니다:

       echo aaa bbb | sed ‘s/\</+/g’    # sed가 출력 없이 멈춥니다

   ‘s/\<./+&/g’ 구문은 올바른 출력을 생성합니다.


## 7.6. GNU sed v1.18

   (1) 위의 GNU sed v2.05에 대한 #1과 동일합니다.

   (2) 다음 명령은 Win95 환경에서 컴퓨터를 멈춰 버립니다. echos 는 줄 끝 개행 문자를 출력하지 않는 echo 명령어입니다:

       echos any_word | gsed “s/[ ]*$//”

   (3) 위의 GNU sed v2.05에 대한 #3과 동일합니다.


## 7.7. GNU sed v1.03 (Frank Whaley 작성)

   (1) \w 및 \W 이스케이프 시퀀스는 모두 비-단어 문자만 일치시킵니다. \w 는 잘못 정의되어 있으며 단어 문자와 일치해야 합니다.

   (2) 밑줄(_)은 비-단어 문자로 정의되어 있습니다. 이는 단어 문자로 정의되야 합니다.

   (3) 위의 GNU sed v2.05에 대한 #3과 동일합니다.


## 7.8. sed v1.6 (Walter Briscoe 제작) - 아직 베타 버전

   (1) 중복된 부분식(sub-expression)은 (여전히) 원래대로 빈 집합과 일치하지 않습니다. 이 문제는 HHsed15에서 이어받은 것입니다.

       echo 123 | sed “s/\([a-z][a-z]\)*/=\1/”  # '='를 반환하지 않음

   (2) 그룹화 뒤에 + 연산자가 오면 아무것도 일치하지 않습니다. 이 문제는 HHsed에서 이어받은 것으로, * 연산자와 관련된 버그는 수정되었으나 + 연산자와 관련된 문제는 여전히 남아 있습니다.

       echo aaa | sed “/\(a\)+/d”          # 아무것도 삭제되지 않습니다.

   (3) 구간 표현식 \{1,\} 및 + 를 사용할 때, & 치환 문자와 관련된 버그가 있습니다. 이 문제는 베타 버전에 영향을 미쳤으며, 정식 릴리스도 영향을 미치는지는 알려지지 않았습니다.

       echo ab | sed “s/a[^a]*/&c/”        # 'abc'를 반환합니다. 정상입니다.
       echo ab | sed “s/a[^a]+/&c/”        # 'ab'를 반환합니다. 버그!
       echo ab | sed “s/a[^a]\{1,\}/&c/”   # 'ab'를 반환합니다. 버그!


## 7.9. HHsed v1.5 (Howard Helman 작성)

   (1) 명령줄에서 입력한 sed 스크립트에서 대체 명령어 뒤에 숫자가 오는 경우(예: s/foo/bar/2), 숫자 뒤에는 세미콜론 두 개가 따르거나, -e 스위치로 구분되어야 합니다. 일반적으로 명령어를 구분하는 데는 세미콜론 하나만 필요합니다.

       echo bit bet | HHsed “s/b/n/2;;s/b/B/”          # 해결 방법 1
       echo bit bet | HHsed -e “s/b/n/2” -e “s/b/B”    # 해결 방법 2

   (2) 대체 명령어 뒤에 숫자와 “p” 플래그가 오는 경우, -n 스위치를 사용할 때는 “p” 플래그가 먼저 와야 합니다.

       echo aaa | HHsed -n “s/./B/3p”    # 버그! 아무것도 출력되지 않음
       echo aaa | HHsed -n “s/./B/p3”    # 예상대로 “aaB” 출력

   (3) 다음 명령을 실행하면 MS-DOS 또는 Win95 환경에서 HHsed가 컴퓨터를 멈춰버리게 합니다. 이는 어떤 문자도 일치시키지 않는 잘못된 형식의 정규 표현식 때문에 발생하는 점에 유의하십시오.

       sed -n “p;s/\<//g;” file
       sed -n “p;s/[char-set]*//g;” file

   (4) HHsed의 범위 명령어 '/RE1/,/RE2/' 는 두 정규 표현식 모두 같은 줄에 나타날 경우 한 줄을 일치시킵니다(위의 3.4(3)절 참조). 비록 이를 기능으로 볼 수도 있겠지만, 다른 모든 sed 버전과 동작 방식이 다르기 때문에 아마 버그로 간주해야 할 것입니다. 예를 들어, '/----/,/----/{s/^/>>/;}' 는 4개 이상의 하이픈으로 둘러싸인 모든 줄 앞에 두 개의 각괄호 “>>” 를 추가해야 합니다. HHsed를 사용하면 이 명령은 하이픈 앞에만 각괄호를 붙입니다.

   (5) 홀드 공간이 비어 있는 경우, H 명령어는 패턴 공간을 홀드 공간으로 복사하지만, 앞쪽에 줄바꿈 문자를 추가하는 데 실패합니다. H 명령어는 항상 줄바꿈 문자를 추가한 뒤, 그 뒤에 패턴 공간의 내용을 홀드 공간에 추가해야 합니다. 이를 우회하는 방법은 “{G;s/^\(.*\)\(\n\)$/\2\1/;H;s/\n$//;}” 이지만, 이 방법은
   홀드 공간이 비어 있다는 것을 알고 있어야 하며 명령을 한 번만 사용해야 합니다. 또 다른 대안은 스크립트의 중요한 지점에서 G 또는 h 명령을 단독 사용하는 것입니다.

   (6) 그룹핑 뒤에 ‘*’ 또는 ‘+’ 연산자가 오는 경우, HHsed는 패턴과 일치하지 않지만 경고를 표시하지 않습니다. 아래를 참조하십시오:

       echo aaa | HHsed “/\(a\)*/d”      # 아무것도 삭제되지 않음
       echo aaa | HHsed “/\(a\)+/d”      # 아무것도 삭제되지 않음
       echo aaa | HHsed “s/\(a\)*/\1B/”  # 변경 사항 없음
       echo aaa | HHsed “s/\(a\)+/\1B/”  # 변경 사항 없음

   (7) 그룹화 뒤에 간격 표현식이 오는 경우, HHsed는 다음의 모든 예시에서 “garbled command” 오류 메시지와 함께 중단됩니다:

       echo aaa | HHsed “/\(a\)\{3\}/d”
       echo aaa | HHsed “/\(a\)\{1,5\}/d”
       echo aaa | HHsed “s/\(a\)\{3\}/\1B/”

   (8) 구간 표현식에서 0이 지원되지 않습니다. 예: \{0,3\}


## 7.10. sedmod v1.0 (작성자: Hern Chen)

   엄밀히 말해, 다음 사항들은 sedmod의 한계(혹은 기능?)일 뿐 버그가 아닙니다. sedmod 문서는 이런 누락된 기능을 지원한다고 명시하지 않았기 때문입니다.

   (1) sedmod는 거의 모든 버전의 sed에 존재하는 표준 구간 표현식  \{...\} 을 지원하지 않습니다.

   (2) 그룹화 뒤에 ‘*’ 또는 ‘+’ 연산자가 오면, sedmod는 “명령이 손상되었습니다(garbled command)” 메시지를 표시합니다. 그러나 그룹화된 표현식이 메타문자가 없는 문자열 리터럴인 경우, 다음과 같이 부분적인 해결 방법을 사용할 수 있습니다:

       \(string\)\1*    # 'string'이 1회 이상 나타나는 경우 일치
       \(string\)\1+    # 'string'이 2회 이상 나타나는 경우 일치

   (3) sedmod는 거의 모든 버전의 sed에 존재하는 's/a/b/3' 같이 s/// 명령어 뒤에 오는 숫자 인수를 지원하지 않습니다.

   다음은 sedmod v1.0의 버그입니다:

   (4) -i(대소문자 무시) 스위치를 사용할 때, ‘/regex/d’ 명령이 제대로 적용되지 않습니다. Sedmod는 스크립트 내 어디에 위치하든 상관없이 해당 표현식과 일치하는 한 줄 이상을 놓칠 수 있습니다. 해결 방법: 대신 “/regex/{d;}” 를 사용하십시오.


## 7.11. HP-UX sed

   (1) 버전 10.20까지(10.20 포함)의 HP-UX sed는 버그가 있습니다. <ftp://ftp.ntua.gr/pub/gnu/sed/sed-2.05.bin.README> 에 있는 GNU cc와 함께 제공되는 README 파일에 따르면:

   "hppa*-*-hpux10 플랫폼에서 gcc를 빌드할 때, `fixincludes' 단계(sed 스크립트 실행을 포함)가 공급업체의 sed 구현에 있는 버그로 인해 실패합니다. 현재 알려진 유일한 해결 방법은 gcc를 빌드하기 전에 GNU sed를 설치하는 것입니다. 파일 sed-2.05.bin.hpux10 은 해당 플랫폼용으로 미리 컴파일된 바이너리입니다."


## 7.12. SunOS sed v4.1

   (1) null이 아닌 ‘[char-set]*’ 뒤에 null인 ‘\NUM’ 패턴 재호출이 올 때 정규식 패턴 매칭에서 버그가 발생합니다. 다음 예시에서 볼 수 있듯이, 이 문제는 Greg Ubben이 보고했습니다:

       s/\(a\)\(b*\)cd\1[0-9]*\2foo/bar/  # ‘[0-9]*'와 ’\2' 사이
       s/\(a\{0,1\}\).\{0,1\}\1/bar/      # ‘.\{0,1\}'와 ’\1' 사이

   해결 방법: 두 구성 요소 사이의 줄에서 어떤 문자도 일치시키지 않는 아무 작업도 수행하지 않는 ‘X*’ 표현식을 추가합니다. 예:

       s/\(a\)\(b*\)cd\1[0-9]*X*\2foo/bar/
       s/\(a\{0,1\}\).\{0,1\}X*\1/bar/


## 7.13. SunOS sed v5.6

   (1) 그룹핑 뒤에 별표(*)가 오면, SunOS sed는 null 문자열과 일치하지 않는데, 이는 정상적으로 일치해야 합니다. 다음 명령어:

       echo foo | sed ‘s/f\(NO-MATCH\)*/g\1/’

   는 일반적인 버전의 sed는 “foo” 를 “goo” 로 변환해야 합니다.


## 7.14. Ultrix sed v4.3

   (1) 그룹화 뒤에 별표가 오면, Ultrix sed는 다음 예에서 볼 수 있듯이 “command garbled” 오류 메시지를 반환합니다:

       echo foo | sed 's/f\(NO-MATCH\)*/g\1/'

   (2) 그룹화 뒤에 \{0,9\} 같은 숫자 연산자가 오는 경우, Ultrix sed는 일치하는 항목을 찾지 못합니다.


## 7.15. Digital Unix sed

   (1) 다음 내용은 1998년 출시된 새로운 버전의 Digital Unix에 포함된 sed 매뉴얼 페이지에서 발췌한 것입니다(본 문서의 여백에 맞게 재편집됨):

   [Digital] sed의 h 하위 명령이 제대로 작동하지 않습니다. h 하위 명령을 사용해서 텍스트를 홀드 영역에 저장할 때, 지정된 텍스트의 마지막 줄만 저장됩니다. H 하위 명령을 사용해서 텍스트를 홀드 영역에 추가할 수 있습니다. H 하위 명령과 홀드 영역을 다루는 다른 모든 명령은 올바르게 작동합니다.

   (2) “$d” 명령을 실행하면 “cannot parse” 오류 메시지가 표시됩니다.  1998년 6월 8일 Carlos Duarte가 보고했습니다.


