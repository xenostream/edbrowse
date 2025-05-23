# Config File

프로그램 시작 시 edbrowse는 설정 파일을 읽은 후 구문을 분석합니다. 이 파일이 없어도 괜찮지만 파일이 있는 경우엔 구문이 올바른지 확인해야만 합니다. 오류가 포함된 경우엔 설정 파일을 수정하고 `config` 명령을 직접 입력하여 설정 파일을 다시 적용합니다. 오류가 완전히 없을 때까지 반복하시기 바랍니다. 설정 파일의 처리는 첫 번째 오류에서 중지되므로 오류가 없이 깨끗하게 실행하는 것이 좋습니다. 

명령줄에서 `edbrowse -c` 를 사용하면 설정 파일을 직접 편집할 수 있습니다. 또한 edbrowse 내에서 `-c` 로 지정한 파일 이름은 설정 파일로 처리됩니다. 설정 파일을 새 세션에서 열고 보기, 편집, 저장, 다시 적용하는 것도 가능하며 따라서 edbrowse를 종료할 필요는 없습니다.

기본적으로 설정 파일은 `$HOME/.ebrc` 에 위치합니다. ``eb'' 는 edbrowse의 약어입니다. 설정 파일의 이름을 변경할 순 없지만 명령줄에서 `-c otherfile` 을 사용하면 다른 설정 파일에 접근할 수 있습니다. 참고로 이 옵션은 다른 인수보다 먼저 입력해야만 합니다. edbrowse 내에서 `config` 명령어를 실행하면 `otherfile`을 계속해 접근합니다.

설정 파일은 라인 단위로 구성되어 있습니다. `#` 문자로 시작하는 라인은 주석문이며 무시됩니다. 빈 라인도 역시 무시됩니다. 나머지 라인은 다음과 같은 7가지 범주 중 하나에 해당합니다.

.Ls
.Li
옵션 정의: keyword=value 구문을 사용하여 옵션을 정의합니다

.Li
edbrowse 스크립트 정의: 명령줄이나 다른 스크립트에서 호출할 수 있는 edbrowse 스크립트를 정의합니다.

.Li
edbrowse 명령어: edbrowse 스크립트의 일부로 포함된 edbrowse 명령어입니다.

.Li
이메일 계정 설정: 이메일 클라이언트에서 설정할 이메일 계정을 정의합니다.

.Li
메일 필터링 규칙: 메일 필터링 규칙을 정의합니다.

.Li
플러그인 설명: 플러그인을 설명합니다.

.Li
SQL 데이터베이스의 테이블 또는 뷰 설명: SQL 데이터베이스의 테이블이나 뷰를 설명합니다.
.Le



# Keyword = Value

최고의 문서는 예제이므로 바로 예제로 들어가겠습니다.

쿠키에 관한 섹션을 기억하실 것입니다. 쿠키를 저장할 파일 즉 일반적으로 쿠키 항아리(cookie jar)라 불리는 파일이 필요합니다. 이 쿠키 항아리를 설정하는 줄은 다음과 같이 보일 수 있습니다.

```
jar = /home/mylogin/.ebsys/cookie-jar
```

이것은 간단한 `keyword=value` 구문입니다. 파일 이름에 공백이나 심지어 등호가 포함되어 있더라도 괜찮습니다. 따옴표를 사용할 필요는 없습니다.

edbrowse가 구성 파일에서 이 줄을 발견하면 쿠키 항아리의 위치를 기록하고 해당 파일의 유효성을 검사합니다. 파일이 디렉토리이거나 (또는 다른 이상한 것이거나) 접근할 수 없는 경우 edbrowse는 오류 메시지를 출력하고 그 지점에서 구성 파일에 대한 처리를 중지합니다. 이 경우 구성 파일을 수정해 쿠키 항아리 파일을 정확히 변경해야 합니다.

다음은 추가적인 `name=value` 지시어들입니다. 이들 중 일부는 이메일 계정을 설정하는 데 사용됩니다. 이메일 클라이언트에 대해 설명할 때 좀 더 명확해질 것입니다.

```
certfile = /etc/pki/tls/cert```m
```

보안 연결을 위한 인증서가 저장된 파일을 지정합니다. 이것은 {secure connections} 섹션에 설명되었습니다. 일반적으로 생략할 수 있으며 이럴 경우 edbrowse는 시스템의 인증서 파일을 사용합니다.

```
maildir = /home/mylogin/mbox
```

메일을 가져올 때 이 디렉토리로 이동합니다. 따라서 메일 메시지를 저장하면 항상 저장 위치를 알 수 있습니다.

```
cachedir = /home/mylogin/.ebcache
cachesize = 200
```

Edbrowse는 일부 웹 페이지를 로컬 캐시에 저장해 다시 방문할 때 컴퓨터의 캐시에서 빠르게 가져올 수 있습니다. (모든 최신 브라우저는 이 기능을 사용합니다) 이 파일이 저장되는 캐시 디렉토리를 지정합니다. 만약 지정하지 않는다면 edbrowse는 기본적으로 `~/.ebcache` 를 사용합니다. 다중 사용자 시스템에선 캐시 파일은 개인적이어야만 하며 다른 사용자와 캐시 공간을 공유해선 안 됩니다. 캐시 디렉토리는 존재하지 않을 경우 모드 0700 으로 생성됩니다.

`cachesize` 매개변수는 캐시의 크기를 메가바이트 단위로 설정합니다. 기본값은 1000입니다. 값을 0 으로 설정하면 edbrowse는 파일을 캐시하지 않습니다. 또한 캐시가 가득 차면 edbrowse는 가장 오래된 100개의 파일을 삭제한 후 계속 진행합니다. edbrowse는 캐시가 더 많은 파일을 저장할 수 있더라도 10,000개를 초과하여 보관하지 않습니다.

`local` 명령은 edbrowse가 http 또는 https 페이지를 캐시에서 읽어오도록 처리하며 인터넷에 접속하지 않습니다. 만약 페이지가 캐시에 없다면 연결 오류를 출력합니다. 이 기능은 인터넷 연결이 없을 때 캐시된 페이지로 검토할 때 유용할 수 있습니다. 또한 정적이고 자주 가져오는 웹 페이지를 가져오는 함수에서 사용할 수 있으며 이 페이지가 캐시에서 사라지지 않도록 합니다. 이 설정은 함수에 국한되므로 함수 내에서 `local+` 를 설정하면 상호작용 세션에는 전혀 영향을 미치지 않습니다. 또한 이 설정은 ftp, scp, gopher 등에는 영향을 미치지 않습니다.

```
imapfetch = 40
```

IMAP을 통해 호출할 때 마지막 40개의 이메일을 가져옵니다. 가져오는 이메일 수는 1에서 1,000 사이여야 합니다. 인터랙티브 IMAP 클라이언트에서는 -40을 지정하여 가장 최근의 40개의 이메일(시간 순서대로)을 가져올 수 있지만 이것은 설정 파일에서 처리할 수 없습니다. 기본적으로 항상 가장 최근 이메일부터 시작한다고 가정합니다.

```
envelope = fsd
```

IMAP 봉투의 형식을 지정합니다. 각 필드는 다음과 같은 한 글자로 나타냅니다: t = 수신자, f = 발신자, s = 제목, d = 날짜, z = 크기, n = 번호, u = 읽지 않음을 의미하며 기본값은 fs 즉 발신자와 제목입니다. 이것은 e 명령어를 통해 상호작용적으로 변경할 수 있습니다. "읽지 않음" 필드는 이메일이 읽히지 않은 경우 별표 문자를 표시합니다.

```
webtimer = 30
mailtimer = 180
```

웹 서버로부터 응답을 받을 때 30초를 기다리고 메일 서버로부터 응답을 받을 때는 3분을 기다립니다. 시간 값이 0 이라면 무한히 기다립니다. 죄송하지만 소켓 호출을 중단할 별도의 방법이 없는 것 같습니다. 제어용 백슬래시(quit)를 제외하면 전체 프로그램이 종료됩니다. 이들 타이머가 존재하는 이유는 프로그램이 무한정 멈춰있도록 처리하지 않기 위함입니다. 기본값은 각각 20초와 0초입니다.

```
downdir = /home/mylogin/downloads
```

웹사이트에서 바이너리 파일에 접근할 때 메모리에 읽어들이는 대신 디스크에 다운로드할 수 있는 옵션이 있습니다. 이 경우 파일은 기본적으로 이 다운로드 디렉토리에 저장됩니다. 입력한 파일 이름에 슬래시 문자가 포함되어 있거나 다운로드할 디렉토리가 없을 경우 경로는 현재 디렉토리를 기준으로 처리합니다 (절대 경로가 아닌 경우). 이 경우 글로빙이 수행됩니다.

예를 들어 mp3 파일을 ~/music/country/Some-Song.mp3 로 지정할 수 있습니다. 다운로드는 전경에서 진행되며 진행 상황을 나타내는 점들이 표시되며 다운로드가 완료될 때까지 edbrowse는 잠깁니다. 원할 경우 bg (background) 명령을 사용하여 다운로드 작업을 백그라운드에서 실행할 수 있습니다. 이 기능은 특히 큰 파일을 다운로할 경우에 유용합니다. 백그라운드 다운로드가 완료되면 알림을 받습니다. 그동안 edbrowse를 계속해 사용할 수 있으며 점들이 별도로 출력되지 않으므로 작업에도 방해되지 않습니다.

파일 이름을 입력하라는 메시지가 표시되면 웹사이트에서 제공한 기본 파일 이름을 사용하려면 리턴을 누르고 x 키를 입력하면 처리가 중단되며 공백을 입력하면 데이터를 메모리로 읽어들이거나 다른 파일 이름을 입력할 수 있습니다. 만약 파일이 이미 존재할 경우엔 덮어쓰게 됩니다.

dld= 명령어는 다운로드 파일 이름을 미리 설정합니다. 이것은 edbrowse 함수나 배치 작업과 같은 비인터랙티브 환경에서 사용할 수 있습니다. 
dld=jkl 은 edbrowse가 파일 이름을 묻을 경우 jkl 을 직접 입력하는 것과 같습니다. 단일 공백은 메모리로 다운로드하고 x 는 중단합니다.
dld=% 는 서버에서 제공한 파일 이름을 그대로 받아들입니다.
dld= 는 일회성 명령어로 다음 다운로드에만 적용됩니다.

bglist 명령을 입력해 백그라운드 다운로드 작업을 나열할 수 있습니다. 여기엔 다운로드 완료된 작업도 포함됩니다. 만약 ebrowse가 종료된다면 진행 중인 모든 백그라운드 다운로드는 완료되지 않습니다.

전경 다운로드나 인터넷에서의 파일 가져오기 등은 진행 상황을 나타내는 점들을 출력하지만 pdq (progress of download quiet) 명령을 사용하면 이 기능을 억제할 수 있습니다. 또 다른 옵션은 pdc (progress of download by count) 명령어입니다. 이 명령어는 현재까지 다운로드된 메가바이트와 총 메가바이트를 출력합니다. 예를 들어 17/235 는 총 235메가바이트 중 현재 17메가바이트가 수신되었다는 의미입니다. 이것은 십진수의 메가바이트로 이진수 0x100000 메가바이트와는 약간의 차이가 있습니다.

```
nojs = space.com
```

특정 도메인에서 JavaScript가 필요하지 않은 경우를 지정할 수 있습니다. 이 지침에 따라 해당 도메인 내의 페이지에서는 JavaScript가 실행되지 않으며 해당 도메인에서 JavaScript가 로컬로 가져와지지 않습니다. 이 지침은 www.space.com 같은 서브도메인에도 JavaScript를 차단합니다.

또한 도메인 뒤에 특정 경로나 부분 경로를 추가할 수 있습니다. 예를 들어 space.com/popups 같이 사용할 수 있습니다. 이 기능은 팝업 광고를 차단하는 데 유용하며 이러한 광고는 종종 edbrowse 오류를 유발합니다. 경로를 지정할 때 서브도메인은 고려되지 않으며 도메인은 정확히 일치해야만 합니다.

하지만 이 기능은 비록 유용해 보일 수 있지만 위험이 따릅니다. 팝업 페이지가 JavaScript가 제대로 실행되는 데 필요한 변수를 정의할 수 있습니다. 따라서 이 사이트의 특정 페이지나 이 웹사이트를 대신해 가져오는 다른 도메인(예: google-analytics.com 또는 googlesyndication.com)에서는 페이지를 차단하지 않는 것이 좋습니다. 모든 페이지를 가져오는 작업은 edbrowse의 속도를 저하시킬 수 있으며 시간 낭비처럼 보일 수 있지만 JavaScript가 필요한 경우 모든 JavaScript가 필요할 가능성이 높습니다.

```
js = nasa.gov
```

JavaScript가 제대로 실행되기 위해 반드시 필요한 사이트를 지정할 수 있습니다. 예를 들어 nasa.gov 같은 사이트가 이에 해당합니다. 이 지침은 다른 패러다임에서 사용됩니다. 예를 들어 `.com`, `.net`, `.gov` 같은 도메인을 차단하기 위해 `nojs` 지침을 사용할 수 있습니다. 이렇게 처리하면 JavaScript가 거의 실행되지 않습니다. 그런 다음 JavaScript가 필요한 웹사이트를 활성화할 수 있습니다. 이런 처리 방법을 선호하는 사용자가 있으며 일반적으로 더 빠릅니다.

그러나 새로운 사이트에서 JavaScript가 필요할 경우 구성 파일을 수정하고 새로운 사이트를 추가한 다음 `config` 명령을 실행하고 `rebrowse`를 수행해야만 합니다.

```
novs = example.com
```

SSL 인증서 검증 작업을 처리하지 않아야만 하는 호스트명을 지정할 수 있습니다. 이 지침은 자가 서명된 인증서를 사용하는 사이트에 유용하며 이러한 인증서는 검증할 수 없습니다. 그러나 신용 카드 번호 같은 매우 중요한 정보를 주고받는 사이트에선 이 지침을 사용하는 것이 좋지 않습니다. 이 지침은 서브도메인도 포함됩니다. 예를 들어 www.example.com 이 해당됩니다.

```
inserver = pop3.some-domain.com
inport = 110
outserver = smtp.some-domain.com
outport = 25
```

메일을 가져오고 보내는 데 사용하는 서버 머신과 연결 포트를 지정할 수 있습니다. 완전한 도메인 이름(FQDN)이나 `/etc/hosts` 파일에 정의된 별칭을 사용할 수 있습니다. 여기서 나열된 포트는 표준 포트이며 보통 정확합니다. 기본값이 이미 edbrowse에 설정되어 있으므로 위에서 언급된 포트와 다른 경우에만 `inport` 와 `outport` 를 설정할 필요가 있습니다. 이런 키워드는 오직 `mail{}` 컨텍스트내에서만 유효합니다.

포트 번호 앞에 별표(*) 문자가 있으면 예를 들어 `outport *465` 소켓이 보안을 처리하기 위해 암호화된다는 의미입니다. SMTP 포트가 암호화되면 로그인 인증이 가정됩니다. 현재 다른 인증 방법은 구현되어 있지 않습니다.

포트 번호 앞에 화살표(^) 문자가 있으면 예를 들어 `outport ^587` 소켓이 초기 핸드쉐이크 이후에만 암호화된다는 의미입니다. 이것은 핫메일 프로토콜로 `*465` 같은 보안을 제공하지만 처리 방식은 다릅니다.

`+587` 을 사용해 별도의 암호화 처리없이 인증할 수 있습니다. 이것은 메일 서버에 직접 연결되어 있을 때 즉 인터넷을 통해 트래픽이 흐르지 않을 때 사용되지만 서버가 여전히 당신이 맞는지를 확인할 때 사용됩니다.

```
secure
```

수신 및 발신 이메일 연결이 모두 보안 처리됩니다. 이것은 포트 번호 앞에 별표(*) 문자가 붙는 것과 같은 효과를 줍니다. 만약 포트 번호가 지정되어 있다면 포트가 지정되지 않은 경우 기본값이 보안 연결을 반영하도록 변경됩니다. 기본 `pop3s` 포트는 995 이며 기본 `smtps` 포트는 465 입니다.

```
nofetch
```

`-f` 옵션을 통해 계정에서 메일을 가져오지 않도록 설정할 수 있습니다.

```
login = eklhad
password = secret
```

`edbrowse`가 메일을 가져오기 위해 사용하는 로그인 아이디와 비밀번호를 지정할 수 있습니다. 이를 통해 메일 서버에 접근할 수 있도록 인증 정보를 설정할 수 있습니다.

```
from = Full Name
reply = john.smith@some-domain.com
```

이 설정은 발송하는 이메일에 추가됩니다. 이 줄들은 수신자에게 당신이 누구인지 그리고 어떻게 답장할 수 있는지를 알려줍니다. 이러한 줄을 기만적인 목적으로 사용하는 것은 명백히 {불법}입니다. 당신을 제대로 식별할 수 있도록 하고 답장 주소가 실제 당신의 이메일 계정 중 하나인지 확인하시기 바랍니다.

```
to = address
cc = address
bcc = address
```

수신자를 지정하면 이 계정을 통해 발송하는 모든 이메일이 해당 수신자에게 전송됩니다. `cc`는 참조(copy) 수신자를 의미하고 `bcc`는 숨은 참조(blind carbon copy) 수신자를 의미합니다. `gmail.com` 은 발송한 모든 이메일에 대한 사본을 별도로 보관하지만 대부분의 메일 서버는 그렇지 않습니다.

이런 동작을 복제하고 싶다면 `cc = your-address` 를 메일 설명자에 포함시켜 발송하는 모든 메일이 자기 자신에게 다시 전송되도록 처리할 수 있습니다. 메일 서버에 필터를 설정하면 당신이 보낸 메일을 발송된 폴더로 리디렉션할 수 있습니다. 이런 기능의 유일한 실용적인 용도는 이와 같습니다.

```
attach = file
```

지정한 파일이 첨부 파일로 이 계정을 통해 발송하는 모든 이메일에 포함됩니다. 만약 이 계정이 업무용 계정이라면 회사 이미지나 로고를 모든 이메일의 일부로 포함시킬 수 있습니다. 이 기능의 유일한 실용적인 용도는 이와 같습니다.

```
imask = 3,5
```

계정을 접근할 때 폴더 3 과 5 를 표시하도록 설정합니다. 여기서는 IMAP 프로토콜이 가정됩니다. 이 마스킹 기능은 `imask` 명령을 사용하여 상호작용적으로 켜거나 끌 수 있습니다. 폴더를 번호나 문자열로 검색할 때는 화면에 표시된 폴더 뿐만 아니라 모든 폴더가 검색됩니다. 따라서 표시되거나 사전 선택되지 않은 폴더도 여전히 접근할 수 있습니다.

```
imask = ju,inbox
```

`imask` 지침에선 폴더 이름이나 고유한 부분 문자열을 사용할 수 있습니다. 예를 들어 "inbox" 라는 부분 문자열을 포함한 여러 폴더가 있을 수 있으므로 "box" 대신 "inbox" 를 지정하여 정확히 일치하는 폴더를 찾는 것이 좋습니다. `edbrowse` 는 먼저 정확한 검색 일치를 검색한 후 부분 문자열로 검색을 진행합니다.

```
isub = substring
```

IMAP 폴더에서 이 부분 문자열을 표시하지 않도록 설정합니다. 또한 폴더 검색 시 이 부분 문자열을 사용하지 않도록 처리합니다. 예를 들어 Gmail 계정에서 `[Gmail]/` 같은 문자열이 일반적입니다.

```
dx = 8,2,6
```

IMAP에서 이 폴더들에서 하드 삭제를 수행합니다. 다른 폴더에서는 `d` 명령은 휴지통으로 이동합니다. 휴지통은 `dx` 라인의 첫 번째 번호로 가정됩니다. Gmail에서는 직접 받은함에서 이메일을 삭제할 수 없으므로 이메일을 먼저 휴지통으로 이동한 후 휴지통을 비워야만 실제로 삭제됩니다. IMAP에서 대량 삭제 기능을 사용하여 휴지통을 효율적으로 비울 수 있습니다.

`dx` 라인이 없으면 `d` 는 항상 하드 삭제로 처리됩니다. 이것은 일반적으로 다른 서버에서는 작동합니다(예: Gmail이 아닌 서버). 그러나 안전을 위해 이메일을 휴지통으로 이동하도록 선택할 수 있습니다.

`dx` 지침에서는 폴더 이름이나 고유한 부분 문자열을 사용할 수 있습니다.

```
adbook = /home/mylogin/.ebsys/address-book
```

수신자를 지정할 때 전체 이메일 주소 대신 별칭을 사용할 수 있습니다. 별칭은 주소록과 비교되며 주소록은 여기에 지정된 줄 기반의 텍스트 파일입니다. 만약 주소록 파일에 다음과 같은 줄이 포함되어 있다면

```
fred : fred.flintstone@bedrock.us : 226 cobblestone way : 5553827
```

주소록에 `fred`라는 별칭이 포함되어 있으면 edbrowse는 메일을 보낼 때 Fred의 이메일 주소로 대체합니다. edbrowse가 중요하게 여기는 것은 주소록의 첫 부분의 두 필드입니다. 다른 필드는 전화번호, 팩스 번호, 주소 등 원하는 정보를 포함할 수 있습니다. Fred의 이름을 수신자로 보내려면 다음과 같이 큰따옴표(`>`) 문자를 사용할 수 있습니다.

```
fred : fred.flintstone@bedrock.us > Fred W. Flintstone : 226 cobblestone way :
5553827
```

edbrowse는 콜론 문자와 큰따옴표(`>`) 주위의 공백과 탭 문자는 무시합니다. 이메일 주소의 접두사에 콜론 및 큰따옴표(`>`) 또는 심지어 `@` 기호 같은 특수 문자가 포함된 경우 이를 다음과 같이 따옴표로 묶어 사용할 수 있습니다.

```
"this:>that"@gmail.com
```

다중 사용자 시스템에서 이 파일의 모드를 600으로 설정하거나 모드 700인 디렉토리에 파일을 위치해 다른 사용자가 모든 연락처를 읽어볼 수 없도록 처리해야 합니다.

```
emoji = /home/mylogin/.ebsys/Emojis.txt
```

edbrowse에서 이모지 라이브러리 파일을 지정할 수 있습니다. 이 것은 이모지 섹션에서 설명된 바와 같습니다.

환경 변수나 `~` 표기법을 사용하여 `.ebrc` 설정 파일에서 경로를 지정할 수 있습니다.

```
emoji = ~/.ebsys/Emojis.txt
irclog = /home/mylogin/.ebsys/irclog
```

IRC 채팅 로그 파일을 지정할 수 있습니다. 이 로그는 IRC 세션이 재개될 때 출력 버퍼로 다시 불러와집니다. 자세한 내용은 Irc Client 섹션을 참조하세요.

```
include = ~/.ebsys/plugins
```

다른 파일을 포함시킬 수 있으며 이는 C 언어의 `#include` 또는 m4의 `include()`와 유사합니다. 이를 통해 edbrowse 설정을 모듈화할 수 있습니다: 메일 계정과 필터를 하나의 파일에 플러그인을 다른 파일에 함수는 또 다른 파일에 저장할 수 있습니다. 그러나 `edbrowse -c` 는 기본 구성 파일만 열며 이러한 다른 파일에 직접 접근할 수 없습니다. 따라서 이 기능을 사용하는 것은 개인적인 취향에 따라 다를 것이며 어떤 사람들은 이 기능을 사용하고 어떤 사람들은 사용하지 않습니다.



# User Agent

웹 페이지를 인터넷에서 가져올 때마다 브라우저는 호스트에 자기 자신을 식별합니다. 이 기능은 자동으로 이루어집니다. edbrowse는 "edbrowse/3.5.1" 로 자신을 식별하며 슬래시 뒤의 숫자는 현재 edbrowse의 버전 번호를 나타냅니다.

문제는 일부 웹사이트에선 edbrowse를 존중하지 않고 인터넷 접근성엔 전혀 신경을 쓰지 않는다는 것입니다. 이들은 Explorer, Netscape 또는 주요 브라우저처럼 보이지 않는다면 아예 들어오지도 못하게 만듭니다. 예를 들어 Google의 프런트 엔드인 StartPage.com 이 그렇습니다. 그래서 우리는 어떻게 해야 할까요? 물론 거짓말을 해야만 하죠.

```
agent = Lynx/2.8.4rel.1 libwww-FM/2.14
agent = Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/5.0;
SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729;
Media Center PC 6.0; .NET4.0C; .NET4.0E)
```

죄송합니다! 번역해 드리겠습니다:

`.ebrc` 파일에서 다양한 사용자 브라우저 에이전트를 지정할 수 있으며 `ua` (user agent) 명령어로 활성화할 수 있습니다. 이전 줄이 `.ebrc` 파일에 있다면 `ua1` 을 입력하여 Lynx로 가장한다거나 `ua2` 를 입력해 Mozilla로 가장할 수 있습니다. `ua0` 을 입력하면 표준 edbrowse 식별자로 되돌릴 수 있습니다.

```
agentsite = google.com 2
```

google.com 또는 그 하위 도메인과 대화할 때 사용자 에이전트 2 즉 Internet Explorer 7 로 가장합니다. 이런 처리 방법은 한때는 필요했지만 다행히 이제는 필요하지 않습니다. 그럼에도 불구하고 특정 일부 사이트는 브라우저의 종류에 대해 별도의 요구사항이 있으며 어떤 사이트도 edbrowse를 찾고 있지는 않습니다.




# Edbrowse Functions

edbrowse에서 명령 집합을 하나의 이름으로 묶어 마치 매크로처럼 사용할 수 있습니다. 예를 들어 `.ebrc` 설정 파일에 다음과 같이 설정한다면 `<ud` 명령을 입력하여 dos 파일 변경을 처리할 수 있습니다.

```
function:ud {
,s/\er$//f
}
```

`<` 명령은 리디렉션 기능을 연상시키며 매크로에서 입력 명령을 읽어오는 역할을 처리합니다. 매크로는 본문 내에서 `<` 명령을 사용하여 또 다른 매크로를 호출할 수 있습니다. edbrowse 의 거의 모든 명령을 사용 가능하며 매크로를 사용해 웹 페이지를 가져오거나 입력 양식을 작성하고 요청을 제출하며 메일을 보낼 수도 있습니다.

매크로 이름은 대소문자를 구분하지 않으며 같은 이름의 매크로를 여러 번 정의한다면 첫 번째 정의가 우선합니다. 나머지 정의는 무시됩니다. 함수 이름은 알파벳과 숫자를 사용할 수 있으며 다른 프로그래밍 언어와 마찬가지로 문자로만 시작해야 하고 대소문자를 별도로 구분하지 않습니다.

edbrowse는 명령의 성공 여부와 관계없이 계속해 진행하지만 만약 오류가 발생할 경우 함수 처리를 중단하도록 설정할 수 있습니다.

```
function+hw {
/hello/f p
/world/f p
}
```

함수 이름 뒤에 붙는 플러스 기호(`+`) 문자는 해당 함수 내의 모든 명령이 반드시 성공해야 함을 의미합니다. 만약 `hello` 라는 단어를 포함하는 줄이 없다면 이 함수는 처리를 멈추고 만약 그런 줄이 있다면 함수는 계속 진행해 `world` 라는 단어를 포함하는 줄을 찾습니다.

구문 형식은 고정되어 있으며 여유가 없으므로 예를 들어 K&R 스타일처럼 여는 중괄호를 별도의 줄에 위치하는 것은 허용되지 않습니다.

함수가 설정 값을 변경하는 경우(예: 대소문자 구분 여부, 랩을 사용한 검색, 디버그 수준, 사용자 에이전트 등) 함수가 종료되면 이러한 설정은 원래대로 복원됩니다. 단 함수가 `init` 함수이거나 함수 이름이 `set` 으로 시작하는 경우에는 예외입니다. `init` 함수는 대화형 세션에 대한 설정을 처리하기 위해 사용되므로 설정 변경이 해당 함수에만 국한되지 않아야 합니다.

이 함수들은 매개변수를 받을 수 있습니다. 이제 이전의 함수를 좀 더 일반화해 보겠습니다.

```
function+hw {
/~1/f p
/~2/f p
}
```

이전 동작을 동일하게 재현하려면 `<hw hello world` 형식으로 입력합니다. 또는 `<hw foo bar` 를 호출해 다른 줄을 검색할 수 있습니다. 후자는 `foo` 를 포함하는 줄을 찾아 출력하고 만약 성공한다면 `bar` 를 포함하는 줄을 찾아 출력합니다. 

이젠 좀 더 유용한 함수를 만들어 보겠습니다. 구글 검색을 위한 단축키입니다. 변수 `~0` 은 모든 인수(매개변수)를 함께 나타내며 이 경우 `~0` 은 구글 검색에서 검색으로 사용할 키워드 문자열입니다.

```
function+gg {
  b http://www.google.com
  sw+
  /<>/f i=~0
  /</f i1*
  /h3/p 
}
```

이 함수 설정이 완료되면 `<gg kangaroo habitat`를 입력해서 캥거루의 서식지를 찾을 수 있습니다.

마지막으로 edbrowse 함수는 이전 명령의 성공 여부에 따라 분기할 수 있습니다. 이전 명령 성공 시에는 `if(*)`, 실패 시에는 `if(?)`를 사용합니다. `?` 문자는 edbrowse 명령이 실행 실패할 때 출력되는 물음표 오류 문자를 상기시킵니다. 필요에 따라 `} else {` 혹은 `else` 블록을 추가할 수 있습니다. 다음 예제는 `foo` 를 포함하는 줄을 찾고 만약 찾는다면 다음 줄로 이동한 후 그 줄에 `bar` 를 포함한다면 삭제합니다.

```
function+silly {
  /foo/
  if(*) {
    +s/bar//
    if(*) {
      d
    }
  }
}
```

위 예제에서 `function:` 대신해 `function+` 을 의도적으로 사용했습니다. 일반적으로 `+` 문자는 edbrowse 명령이 실패할 경우 함수 처리가 중단되도록 합니다. 그러나 그 명령의 결과가 제어문에서 사용된다면 함수는 처리가 중단되지 않습니다. 이것은 쉘의 `set -e` 와 유사하며 실패한 명령 이후 스크립트가 중단되지만 명령의 결과가 `if` 또는 `while` 문에서 사용된다면 중단되지 않습니다.

또 다른 제어문으로는 `while(*)`, `while(?)`, `until(*)`, `until(?)` 이 있습니다. 다음의 코드는 파일의 맨 위에서 `foo` 또는 `bar`를 포함하는 줄을 삭제한 후 맨 위의 빈 줄을 삭제합니다.

```
function+topclean {
  until(?) {
    1g/foo\e|bar/d
  }
  until(?) {
    1g/^$/d
  }
}
```

loop(100){ ... } 구문를 사용해 명령어나 명령 집합을 100번 반복할 수 있습니다. 하지만 이 기능은 자주 사용되지 않습니다.

<7 은 세션 7에 edbrowse 명령어를 실행합니다. 이것은 함수가 아니라 단순히 명령어의 연속입니다. 현재 컨텍스트에서 명령어가 실행됩니다. 만약 세션 7에 n 이란 문자가 포함된 한 줄만 있다면 <7 명령은 현재 세션에서 해당 줄과 줄 번호를 출력합니다. 세션 7에 있는 상태에서 <7 명령을 입력할 수도 있겠지만 그런 상황이 언제 발생할지는 잘 모르겠습니다. 이전 명령어가 아직 실행되지 않은 명령어를 수정하면 의도하지 않은 처리 결과가 발생할 수 있습니다.

참고로 이것은 함수가 아니므로 인수를 받을 순 없습니다. 하지만 edbrowse를 사용하여 세션 7의 명령어를 원하는 대로 구성할 수 있습니다.

<*7 은 세션 7의 명령어를 실행은 하되 오류가 발생한다면 처리를 중지합니다. + 문자를 사용할 수도 있겠지만 + 문자는 다른 의미를 가지므로 아래에서 다룰 것입니다.

여기선 @ 구문도 지원됩니다. <7@22,29 구문은 22번 줄부터 29번 줄까지의 명령어를 실행합니다.

스크립트를 작성할 경우 세션 7이 현재 사용 가능한지 확실하지 않다면 스택에서 작업을 처리할 수 있습니다. etmp 명령을 사용해 임시 버퍼에서 명령어를 구성한 후 위로 이동하고 <-1 명령을 실행해 히스토리내에서 하나 아래 버퍼에 있는 모든 명령어를 실행합니다. 작업이 완료되면 다시 스택 아래로 이동한 후 ^ 키를 눌러 임시 버퍼를 제거합니다. <*-1 명령은 오류가 발생할 경우 처리를 중지합니다.

이것 또한 함수가 아니므로 설정 변경은 이 실행에만 국한되지 않습니다. 따라서 시작 시 설정을 수정했다면 종료 시엔 원래대로 복원해야만 합니다.




# The Init Function

"init" 이란 이름의 함수는 edbrowse 시작 시에만 한 번 실행됩니다. 이 기능을 사용해 기본적인 설정을 처리하고 즐겨찾기 파일을 읽어와 자주 사용하는 북마크를 손 쉽게 접근할 수 있도록 처리할 수 있습니다. 다음은 예제입니다.

```
function+init {
#  turn debug off, so we don't see any status messages from this script
db0
#  Assume directories can be modified
dw
#  Put beginning and end markers around listed lines
endm+
#  Use readline for input
rl+
#  Let session 99 hold your favorites, ready to surf.
e99
b $bookmarks
#  back to session 1, ready to go to work
e1
}
```

이것은 단지 예제일 뿐입니다. init 함수에 원하는 내용을 넣거나 edbrowse 기본 설정에 만족한다면 아예 생략할 수도 있습니다.

명령줄에 -d 옵션을 사용하면 init 스크립트에서 설정한 db 설정을 무시합니다. 따라서 edbrowse -d4 형식은 init 스크립트의 첫 번째 항목이 db0 이라 하더라도 수 많은 출력을 발생시킬 수 있습니다.



# Mail Accounts

다음 장에서는 edbrowse를 메일 클라이언트로 사용하는 방법을 설명하므로, 설정 파일을 사용하여 이메일 계정을 정의해 보겠습니다. 필요한 만큼 여러 계정을 정의할 수 있으며, 이들은 설정 파일에 나타나는 순서대로 암시적으로 번호가 매겨집니다. 첫 번째 메일 계정은 #1이 되고, 두 번째는 #2가 되는 식입니다.

이메일 계정에 필요한 키워드는 이미 논의된 바 있습니다. 이들을 mail{...}로 감싸면 됩니다.

```
mail {
  default
  inserver = pop3.some-domain.com
  outserver = smtp.some-domain.com
  login = eklhad
  password = secret
  from = Full Name
  reply = john.smith@some-domain.com
}
```

"기본(default)" 지시어는 이 계정을 기본 계정으로 설정합니다. 하나의 계정만 기본으로 지정되어야 합니다. 메일을 가져오거나 보낼 때 계정을 지정하지 않으면 기본 계정이 사용됩니다. 또한, 기본 SMTP 서버가 항상 메일 발송에 사용되며, 지정한 계정과는 상관없이 사용됩니다. 만약 계정 #1이 기본 계정이고 계정 #3을 사용하여 메일을 보낸다면, 계정 #3의 이름과 회신 주소가 수신자에게 전송되며, 수신자가 회신하면 그 회신이 계정 #3으로 전송됩니다. 그러나 메일 전송은 기본 계정의 SMTP 서버를 통해 이루어집니다. 이는 보안과 관련된 기술적인 이유 때문입니다. 하지만 계정에 sendmail 스트림이 암호화되어 있다면 보안 문제는 없으며, 이러한 설정을 사용하여 메일을 송수신할 수 있습니다. 다음은 구글의 Gmail에 대한 전형적인 설정 예입니다.

```
mail {
  inserver = pop.gmail.com
  outserver = smtp.gmail.com
  secure
#  Google also supports outport = ^587
  login = somebody@gmail.com
  password = secret
  reply = somebody@gmail.com
  from = Full Name
}
```

메일 필터링, 즉 발신자나 제목에 따른 필터링은 설정 파일로 제어됩니다. 이는 fetchmail 클라이언트의 일부로 나중에 설명될 예정입니다.

# Plugin Descriptors

플러그인(Plugin)은 파일의 확장자 또는 경우에 따라 프로토콜에 의해 결정됩니다. 예를 들어, edbrowse는 /usr/bin/play를 사용하여 file.wav 또는 file.voc를 재생하거나, /usr/bin/mpg123를 사용하여 file.mp3를 재생할 수 있습니다. 여기서 모든 내용을 반복하기보다는, 이 패키지와 함께 제공된 샘플 설정 파일의 plugin {...} 섹션을 참조하는 것이 좋습니다. 리눅스 사용자는 이 부분을 자신의 설정 파일에 직접 복사해도 됩니다. 일반적으로 올바르게 작동합니다. 다음은 하나의 예시입니다.

```
plugin {
type = audio/mp3
desc = audio file in mp3 format
suffix = mp3
content = audio/mpeg
#  %i is replaced with the mp3 file or the mp3 url
program = mpg123 -q -C %i
}
```

이 예제는 mp3 파일이나 mp3 스트림을 처리합니다. 이는 `mpg123`가 로컬 파일이나 인터넷에서의 mp3 스트림을 재생할 수 있기 때문에 작동합니다. 만약 `mpg123`이 로컬 파일에만 제한된다면, `down_url` 키워드를 추가해야 했을 것입니다. 이 경우 URL이 임시 파일로 다운로드된 후 재생됩니다. 자동 재생 기능은 플러그인을 켜고 끄는 `pg` 명령어로 비활성화할 수 있습니다.

서버에 직접 파일을 다운로드할 경우 전달될 쿠키는 환경 변수 `PLUGINHEADERS`에 저장됩니다. 경우에 따라 플러그인 프로그램이 서버와의 통신 시 이러한 쿠키가 필요할 수 있습니다. 예를 들어, `mpv` 명령어의 `--http-header-fields` 옵션이 이에 해당합니다. 실제로는 이러한 기능이 거의 필요하지 않습니다.

자신의 컴퓨터에서 오디오 파일을 메모리에 읽어온 경우, `pb`를 입력하여 버퍼의 내용을 재생할 수 있습니다. 데이터는 `/tmp/.edbrowse` 하위의 임시 파일로 저장되고, 이후 `mpg123`가 호출됩니다. 마지막으로, 디렉터리 모드에서 mp3 파일이나 플러그인 지원 파일을 재생할 수 있습니다. `g` (go) 명령어는 현재 줄의 파일을 재생합니다. 이는 매우 효율적이며, 파일을 메모리에 읽거나 `/tmp`에 임시 파일을 생성할 필요가 없습니다.

일부 경우에는 스트림이 프로토콜이나 접미사로 표시되지 않습니다. 예를 들어, YouTube 비디오는 일반 HTML 페이지처럼 보이지만 음악 플레이어로 재생할 수 있습니다. 이 경우 `urlmatch` 속성을 사용하세요.

```
urlmatch = .youtube.com/watch?
```
일부 플러그인은 파일을 재생하고, 다른 플러그인은 파일을 처리합니다. `outtype` 속성은 플러그인의 유형을 결정합니다. 이 예제에서는 PDF 파일이 HTML로 변환되어 일반적인 방식으로 탐색할 수 있습니다.

```
plugin {
type = pdf
desc = pdf file
suffix = pdf
content = application/pdf
#  file must be local
down_url
program = pdftohtml -i -q -noframes %i %o
outtype = H
}
```

다른 플러그인은 리치 텍스트, 워드 문서, 오픈 오피스 문서 등을 변환할 수 있습니다. 출력이 HTML인 경우 `outtype`을 `h`로, 텍스트인 경우 `t`로 설정합니다.

```
plugin {
type = Word doc
desc = Microsoft Word document, not docx
suffix = doc
content = application/msword
down_url
#  without %o, the output is piped directly into the buffer
program = catdoc %i
outtype = T
}
```

PDF를 텍스트로 변환할 때 HTML 중간 단계를 건너뛰는 변환기도 있지만, PDF 내에 포함된 하이퍼링크 기능을 유지하고 싶어서 HTML을 거치는 방식이 더 낫다고 생각했습니다. 이 과정이 추가 단계가 되지만, 하이퍼링크 기능을 보존하는 것이 가치가 있다고 생각했습니다.

파일 이름이 올바른 플러그인을 반영하지 않는 경우, `b.xxx`를 사용하여 `.xxx` 접미사가 지정한 변환기로 브라우징할 수 있습니다. 이는 현재 버퍼를 `.xxx`로 지정된 플레이어를 사용하여 재생하는 `pb.xxx`와 동일합니다.

PDF 파일에 비밀번호가 필요한 경우, `b.pdfp`를 입력하고 이 플러그인을 사용하세요. `%p`는 매개변수를 의미하며, `edbrowse`는 매개변수(이 경우 비밀번호)를 묻게 됩니다.

```
plugin {
type = pdf
desc = pdf file with password
suffix = pdfp
program = pdftohtml -opw %p -i -q -noframes %i %o
outtype = H
}
```




# A Sample Config File

최고의 문서는 예제입니다. 그래서 가상의 데이터로 작성된 샘플 설정 파일을 제공하였습니다. 파일은 잘 주석이 달려 있습니다. 샘플 설정 파일을 [여기](#)에서 확인할 수 있으며, 프랑스어와 이탈리아어 버전도 제공됩니다.
