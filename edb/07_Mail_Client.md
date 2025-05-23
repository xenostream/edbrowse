# Send Mail

현재 편집 중인 세션의 내용을 `sm` 명령어를 사용해 다른 사람에게 이메일로 보낼 수 있습니다. 이메일 계정은 설정 파일 섹션에 설명되어 있습니다.

대부분의 메일 클라이언트는 발신 이메일 메시지에 자동으로 서명을 추가할 수 있으며 edbrowse도 예외는 아닙니다. 실제로 각 이메일 계정에 대해 서로 다른 서명을 설정할 수 있습니다. 
예를 들어, 업무용 이메일에 하나의 서명을 사용하고 개인용 이메일에는 또 다른 서명을 사용할 수 있습니다. edbrowse는 계정 N에서 메일을 보낼 때 홈 디렉토리의 `.signatureN` 란 파일을 먼저 확인합니다. 
예를 들어, 계정 2에서 메일을 보낼 때는 `.signature2` 파일을 찾습니다. 만약, 해당 파일이 발견되지 않으면 홈 디렉토리의 `.signature` 파일을 찾아 그 내용을 서명으로 추가합니다.

수신자, 첨부 파일, 그리고 제목은 파일 상단에 나타나야 합니다. `sm` 명령어는 문법에 매우 민감하므로 다음과 같이 구문을 주의 깊게 확인하시길 바랍니다.

```
To: fred.flintstone@bedrock.us
CC: barney.rubble@bedrock.us
account: 1
attach: hollyrock-brochure.pdf
Subject: Hollyrock Vacation
Come visit Hollyrock.
Brochure attached.
Sincerely,
Rock studios incorporated.
```

`account:` 계정 라인은 선택 사항입니다. 이 라인은 edbrowse의 `.ebrc` 설정 파일에 지정한 첫 번째 메일 계정을 사용하라고 지시합니다. `account:` 라인을 포함하지 않으면 edbrowse는 `.ebrc` 파일의 *default* 로 표시한 기본 계정을 사용합니다.

`sm5` 명령을 입력하면 edbrowse는 계정 번호 5 를 사용합니다. 이것은 `account:` 라인을 무시합니다. `sm5` 명령을 입력하는 것이 `account:5` 라인을 입력하는 것보다 더 간편합니다. `sm-5` 명령은 `sm5` 명령과 동일하지만 `.signature` 파일을 포함하지 않습니다. 
특정 상황에 맞는 다른 서명 파일을 원할 때는 유용합니다.

메시지 본문에 76자보다 긴 줄이 포함되어 있으면 edbrowse는 작성한 텍스트를 정확히 유지하기 위해 *quoted-printable* 전송 인코딩을 사용하거나 줄을 감싸서 *format=flowed* 를 사용해 이메일 클라이언트가 사용자의 장치에서 적절히 단락을 펼칠 수 있도록 합니다. 
이 두 가지 옵션은 `flow` 명령어로 사용자가 선택할 수 있습니다. `flow+` 명령을 사용하면 긴 줄이 있는 단락이나 공백으로 끝나는 줄은 재형식화 처리됩니다. 짧은 줄로만 구성된 단락 (예: 시) 같은 경우는 공백이 없으면 `flow+` 명령에도 그대로 보존됩니다. 
`flow+` 명령어는 기본 설정이며 이 기능을 끌 일은 거의 없을 것입니다.

메시지 본문에 998바이트보다 긴 단어가 포함될 경우 edbrowse는 *quoted-printable* 전송 인코딩 방식을 사용합니다. 이것은 인터넷 필수 요구 사항입니다. 하지만, 실제론 거의 발생하지 않을 것입니다.

다양한 운영 체제는 전통적으로 줄 끝을 표시하는 데 서로 다른 문자를 사용합니다. 일반적으로 edbrowse는 중립적인 줄 끝 문자를 사용하여 텍스트 첨부 파일을 전송합니다. 수신 이메일 클라이언트는 해당 운영 체제에서 일반적으로 사용되는 줄 끝 문자를 사용해 파일을 저장합니다. 
줄 끝 문자를 정확히 유지하려면 `flow-` 명령을 사용합니다. 하지만, 이런 작업은 자주 필요하지 않을 것입니다.

```
sub: is an acceptable shorthand for subject:
```

`attach:` 라인을 사용하여 이메일에 첨부 파일을 추가할 수 있습니다. 각 라인은 첨부할 파일을 지정해야 하며, 이 라인들은 제목 라인 앞에 위치해야 합니다. 파일 이름이 단순히 숫자인 경우, 해당하는 `edbrowse` 세션이 사용됩니다. 예를 들어, `Hollyrock` 브로셔를 첨부하려면 세션 2로 전환하여 PDF 파일을 읽어들이고, 세션 1로 돌아와서 `attach:2`를 사용하면 됩니다.

`attach:2`를 사용할 경우, 첨부 파일의 이름이 자동으로 지정되지 않습니다. Fred는 파일을 저장할 때 파일 이름을 직접 지정해야 합니다. 그 외에는 이메일의 형식은 동일합니다.

`alt:` 지시어는 `attach:` 지시어와 비슷하지만, 첨부 파일이 부가 파일로 처리되지 않고 이메일의 대체 표현으로 간주됩니다. 메일 클라이언트는 가능한 경우 대체 표현을 사용합니다. 보통 하이퍼링크와 이미지가 포함된 멀티미디어 이메일을 전송할 때 사용됩니다. 기본 이메일은 일반 텍스트지만, 대체 첨부 파일은 HTML이나 리치 텍스트로 제공됩니다. 사용자에게는 그래픽과 하이퍼링크가 포함된 대체 표현이 보이게 됩니다. `alt:` 라인은 파일 또는 `edbrowse` 세션을 참조할 수 있습니다.

`to:` 라인은 수신자를 설정합니다. 수신자를 몇십 명 이상 지정하지 않는 것이 좋습니다. 일부 메일 서버는 수신자 수에 대해 100명의 하드 한도를 설정하고 있으며, 이 숫자를 초과하면 나머지 수신자는 메일을 받지 못합니다. 따라서 `to:` 라인은 몇십 명으로 제한하는 것이 좋습니다.

`CC`는 탄소 복사본을 의미하며, 수신자에게 이메일의 사본을 제공하여 응답할 필요가 없다는 것을 알립니다. `BCC`는 숨은 참조를 의미하며, 각 사람이 다른 이메일 주소를 볼 수 없게 합니다.

수신자를 지정할 때 전체 이메일 주소 대신 별칭을 사용할 수 있습니다. 별칭은 `.ebrc` 파일에 지정된 주소록과 대조됩니다. 주소록에 다음과 같은 항목이 포함되어 있다면,

```
fred : fred.flintstone@bedrock.us : 226 cobblestone way : 5553827
```

그럼 "To:fred"라고 파일 상단에 작성하면 됩니다. `edbrowse`에서 주소록의 첫 두 필드만 중요합니다. 다른 필드는 전화번호, 팩스번호, 주소 등으로 사용할 수 있습니다. 

"Reply to fred"는 "to: fred"의 대체 문법입니다.

일부 웹 페이지에는 `sendmail` 링크가 포함되어 있습니다. 이 링크는 다른 하이퍼링크처럼 보이지만, 적절한 사람에게 이메일을 보냅니다. `sendmail` 링크를 활성화하면 "to"와 "subject" 라인이 미리 로드된 새로운 편집 세션이 시작됩니다. URL이 주제를 지정하지 않았다면, 주제는 기본적으로 "Hello"로 설정됩니다. 더 나은 주제로 변경하는 것이 좋습니다. 메일 메시지를 작성하고 `sm`을 입력하여 발송합니다. 이후 `^`를 입력하여 이전에 보던 웹 페이지로 돌아갑니다. 이메일 본문에 기본 텍스트가 미리 로드될 수도 있으니, 작성 및 발송 전에 확인하는 것이 좋습니다.

첨부 파일을 포함하려면 파일 상단에 "attach:" 라인을 넣으면 됩니다. 수신자가 첨부 파일을 처리할 수 있다고 가정합니다. 이는 `sendmail` 링크가 버그 보고를 요청할 때 유용할 수 있습니다. 프로그램과/또는 결과물을 첨부할 수 있습니다. 그러나 이는 다소 비정상적입니다. 대부분의 `sendmail` 링크는 몇 문장의 피드백을 기대하며, 그 이상은 기대하지 않습니다.

일부 웹 양식은 직접 HTTP 전송이 아니라 이메일을 통해 제출됩니다. `edbrowse`는 이를 올바르게 처리합니다. 이메일 주소를 보여주고, SMTP를 통해 메일을 전송하며, 회신을 기다리라고 안내합니다. 회신은 이메일 응답일 수도 있고, 양식에 전화번호를 제공한 경우 전화 통화일 수도 있습니다. 하지만 즉시 반응이 있지는 않습니다. 여전히 같은 웹 페이지에 있으며, 같은 제출 버튼을 보고 있습니다. 버튼을 다시 누르지 마세요! 메일은 전송되었으며, 며칠 내에 회사로부터 연락을 받을 것입니다.




# Send Mail Client
앞서 설명된 바와 같이, `edbrowse`는 메일 클라이언트 기능을 포함하고 있습니다. 인터랙티브한 `sm` 명령 외에도, 명령줄에서 배치 방식으로 메일을 보낼 수 있습니다. 주소록에 fred와 barney가 있고, 첫 번째 이메일 계정을 사용하여 첨부 파일과 함께 메일을 보내고 싶다면, 다음과 같이 할 수 있습니다.

```
edbrowse -m1 fred ^barney hollyrock-notice +hollyrock-brochure.pdf
```

`^` 기호가 앞에 붙은 `barney`는 CC 수신자를 의미합니다. BCC 수신자를 지정하려면 `?barney`를 사용합니다.

파일 이름에 `+`가 붙은 경우, 해당 파일은 첨부 파일로 간주됩니다. 반면, `-`가 붙은 경우에는 대체 형식으로 처리됩니다.

```
edbrowse -m1 fred ^barney hollyrock-notice -hollyrock-graphical.html
```





# Retrieving Mail

`edbrowse`가 `-f` 옵션과 함께 호출되면, `nofetch`로 표시된 계정을 제외하고 모든 계정에서 메일을 가져옵니다. `-f` 뒤에 숫자를 지정하면, 특정 계정에서만 메일을 가져올 수 있습니다. 예를 들어, `-f1`은 첫 번째 메일 계정에서만 메일을 가져오고 나머지 계정은 무시합니다. 메일 가져오기가 완료되면, 프로그램은 가져온 메시지의 총 수를 출력합니다.

가져온 메시지는 `.ebrc` 파일의 `maildir` 설정에 지정된 디렉토리 아래의 `unread/` 디렉토리에 저장됩니다. 다음 섹션에서 설명된 대로 이 메시지들을 읽을 수 있습니다.

여러 메일 계정을 `.ebrc` 파일에 지정할 수 있음을 기억하세요. 첫 번째 계정은 `-m1`처럼 인덱스 1로 표시됩니다. 좀 더 쉽게 관리하려면, `.bashrc` 파일에 별칭을 추가하는 것도 좋습니다.

```
#  My mail, home account
alias mymail="edbrowse -fm1"
#  My wife's account.
alias wifemail="edbrowse -pfm2"
#  My work account.
alias workmail="edbrowse -fm3"
#  mail is obsolete
alias mail="echo use mymail, wifemail, or workmail"
```





# Interactive Mail Reader

`edbrowse`가 `-m` 옵션과 함께 실행되면, 다른 인수 없이도 인터랙티브 메일 리더로 작동하여 읽지 않은 메시지 디렉토리에서 메일을 검사할 수 있습니다. 메일을 가져오고 읽는 작업을 한 단계에서 수행하려면 `-f`와 `-m` 옵션을 함께 사용할 수 있습니다.

실행 시, 먼저 보유한 메시지 수를 알려줍니다. 메시지가 없으면 "No mail"이라고 표시하고 종료됩니다. 읽지 않은 메시지가 있는 경우, 각각의 메시지를 차례로 보여줍니다. 각 메시지에 대해 일부 헤더 정보(예: 제목과 발신자)와 첫 페이지의 텍스트를 표시한 후, 프롬프트를 제공합니다.

프롬프트가 `?`이면 메시지가 완료된 것이며, `*`이면 더 많은 텍스트가 남아 있음을 의미합니다. 키를 눌러 응답할 수 있습니다. 키는 다음과 같은 의미를 가집니다.

```
?	summary of key commands
q	quit the program
space	display more text
g	go to top
t	read as plain text
n	read the next message
d	delete this message
w	write this message to a file and delete it
u	write this message unformatted to a file and delete it
```

스페이스를 입력하면 `/bin/more`처럼 이메일 표시가 계속됩니다. `g`를 입력하면 상단으로 돌아가며, `t`를 입력하면 이메일의 일반 텍스트 버전을 볼 수 있습니다. 그러나 일반 텍스트 버전이 없을 경우, `edbrowse`는 "이 이메일에는 일반 텍스트 버전이 없습니다; 이메일 클라이언트에서 HTML 처리를 활성화해 주세요."라는 메시지를 표시합니다. 일반 텍스트 버전이 사용 가능한 경우, HTML 버전보다 간단할 수 있습니다.

파일에 원본 이메일이 저장되어 있는 경우, `b.plain` 명령을 사용하여 일반 텍스트 구성 요소로 브라우징할 수 있습니다.

마지막 두 명령어인 `w`와 `u`는 파일 이름을 요구합니다. `x` 또는 `X`라는 예약된 파일 이름은 본질적으로 `/dev/null`과 같아, 메일 메시지가 버려집니다. `x`가 아닌 다른 파일 이름을 입력하면, `edbrowse`는 해당 파일에 쓸 수 없을 경우 새로운 파일 이름을 요청합니다.

실제로, `w` 명령으로 메시지를 저장한 후, 하이퍼링크나 첨부 파일과 같이 포맷되지 않은 메시지에서만 사용할 수 있는 항목이 필요할 수 있습니다. 이 경우, 포맷된 메시지를 파일에 저장할 때 `edbrowse`는 원본 포맷되지 않은 사본도 유지합니다. 이 사본은 `$HOME/.Trash/rawmail` 디렉토리에 5자리 숫자로 구성된 파일 이름으로 저장됩니다. 포맷된 메시지를 저장할 때, 파일 끝에 "Unformatted 12345"와 같은 텍스트가 표시됩니다. 이는 원본 포맷되지 않은 메시지의 위치를 알려줍니다: `$HOME/.Trash/rawmail/12345`.

이전에도 언급했듯이, 매주 크론 작업을 실행하여 휴지통을 청소하는 것이 좋습니다. 크론 작업이 하위 디렉토리를 제거하면 원본 메일이 무한정 쌓이지 않도록 보장합니다.



# Formatted Mail

메일이 수신되면, 형식 없이 읽지 않은 메시지 디렉토리에 저장됩니다. 즉, 서버에 존재하던 메시지의 충실한 복사본입니다. `-m` 옵션으로 `edbrowse`를 실행하여 메시지를 읽으면, 여러 형식 규칙이 적용된 후 표시됩니다. 메시지를 원시 상태 또는 형식이 적용된 상태로 저장할 수 있습니다. 인터랙티브 메일 프롬프트에서 `w`를 선택하면 형식이 적용된 버전이 디스크에 저장되고, `u`를 선택하면 형식이 없는 버전이 저장됩니다.

HTML 메일 메시지가 렌더링될 때, 자바스크립트는 비활성화됩니다. 이 이메일 메시지와 상호작용하려면, 형식이 없는 상태로 파일에 저장하고 이메일 세션을 종료한 후, 그 파일을 편집하여 `b`를 입력하여 브라우징해야 합니다. 이제 HTML이 활성화되어 웹 페이지를 보는 것처럼 상호작용할 수 있습니다.



# Mail Filtering

설정 파일은 적당한 수준의 메일 필터링을 지원합니다. 발신자, 수신자 또는 제목에 따라 수신 메일을 리디렉션할 수 있습니다. 이러한 매개변수는 설정 파일에 설정됩니다. 메일 필터링 규칙은 다음과 같은 형식을 가집니다:

```
matchString > destinationFile
```

실제로 `>` 기호는 약간 오해의 소지가 있습니다. 파일이 존재하는 경우, 이메일이 파일 끝에 추가되며, 파일이 잘리지 않습니다. 그래서 `>>`를 사용하는 것이 좋겠지만, 반복적으로 추가 기호를 사용하는 것보다 `>`를 사용하는 것이 더 간편했습니다.

대상 파일은 설정 파일에서 설정한 메일 디렉토리를 기준으로 해석됩니다. 물론 절대 경로를 사용하여 오버라이드할 수도 있습니다.

메일 필터링 규칙은 항상 필터 블록 내에서 적용됩니다. 예를 들어, 특정 사람들로부터의 메일을 리디렉션하려면 다음과 같이 설정합니다.

```
fromfilter {
fred flintstone > fredmail
fred.flintstone@bedrock.us > fredmail
jerk@hotmail.com > x
word@m-w.com > -wod
}
```

발신자의 이름이나 이메일 주소를 지정할 수 있습니다. 발신자가 다른 계정에서 메일을 보낼 경우를 대비해 둘 다 지정하는 것이 좋습니다.

"Fred Flintstone"의 대문자를 사용하지 않은 점에 주의하세요. 매칭은 대소문자를 구분하지 않습니다.

파일 이름 "x"는 특별한 의미를 가집니다; 메일을 완전히 삭제합니다. 이를 사용하여 지속적으로 괴롭히거나 스팸을 보내는 사람의 메일을 버릴 수 있습니다.

마지막 항목은 -wod로 메일을 전송합니다. 선행 `-` 기호는 메일이 형식이 없는 상태로 wod에 저장되어야 함을 의미합니다. 이는 Merriam-Webster의 단어입니다. 형식 없이 저장한 후, 브라우징하고 {audio}를 클릭하여 발음을 들을 수 있습니다. 이메일에 하이퍼링크가 포함된 경우, 나중에 브라우징할 수 있도록 형식 없이 저장하는 것이 좋습니다.

메일을 `to:` 필드에 따라 필터링할 수도 있습니다. 이는 여러 메일 계정이나 주 계정으로 포워딩된 메일 별칭이 있는 경우 유용합니다. 다음은 샘플 블록입니다.

```
tofilter {
support@my-side-business.com > support
sales@my-side-business.com > sales
@my-side-business.com > business
me@my-regular-dayjob.com > work
}
```

세 번째 항목은 모든 메일을 수신하는 캣콜 주소로, 해당 도메인으로 전송된 모든 메일이 저장됩니다. 규칙이 순서대로 적용되므로, 지원 요청은 "support"라는 파일에 저장되고, 판매 관련 메일은 "sales"라는 파일에 저장되며, 비즈니스 관련 기타 모든 메일은 "business"라는 파일에 저장됩니다.

`fromfilter` 블록에서도 캣콜 주소를 사용할 수 있습니다. 이 도메인에서 온 메일은 여기로 들어갑니다.

주제에 따라 필터링할 수 있는 `subjfilter{...}` 블록도 사용 가능합니다. 예를 들어, 바이러스의 주제가 "Come Kiss Me"인 경우, "come kiss me"를 x로 리디렉션하여 메일을 차단할 수 있습니다.

이 기능을 사용하여 다른 ISP로부터 바이러스 첨부 파일을 보냈다는 경고를 차단할 수도 있습니다. 실제로는 바이러스 첨부 파일을 보낸 적이 없지만, 포워딩된 이메일의 발신 주소가 위조되어 경고가 당신에게 돌아온 경우, 이를 "backscatter"라고 합니다. 이러한 허위 경고를 없애는 라인도 작성할 수 있습니다.

```
subjfilter {
Come Kiss Me > x
Net Integrator Virus Alert > x
}
```

주제가 일치하거나 주제의 시작 또는 끝이 일치하며, 주제 길이가 일치 문자열의 두 배를 넘지 않는 경우 이메일이 리디렉션됩니다.

답장 주소가 주소록과 일치하면, 메일은 이메일 별칭의 파일에 저장됩니다. 예를 들어, 주소록에 `fred:Fred.Flintstone@SomeDomain.com`이라는 항목이 있으면, 해당 주소에서 온 이메일은 `fred` 파일에 저장됩니다. 이를 통해 필터에서 중복 항목을 관리할 필요가 없습니다.

메일을 비포맷 상태로 저장하려면 주소록에 `-fred`를 추가합니다. 이메일을 보내는 데 별칭 `fred`를 사용하되, 리디렉션을 원하지 않으면 `!fred`를 사용합니다.

이메일이 파일로 리디렉션되면, 첨부 파일 처리 방법을 묻는 메시지가 나타납니다. 첨부 파일이 프로그램일 경우, 기본 파일명으로 저장하려면 리턴을 누르고, 불필요한 로고나 배경 이미지가 있다면 `x`를 입력하여 삭제할 수 있습니다. 이미지 파일이 `.gif`와 같은 인식 가능한 접미사를 가지면 자동으로 삭제됩니다.

첨부된 이미지를 하이퍼링크나 상호작용적으로 제공하려면 `attimg`를 설정합니다. 기본적으로는 이미지 첨부 파일이 스킵됩니다. 상호작용 모드에서는 `x`를 입력하여 개별 이미지 첨부 파일을 삭제하거나, `X`를 입력하여 모든 이미지 첨부 파일을 삭제할 수 있습니다. `e`를 입력하면 첨부 파일을 다른 edbrowse 세션에 넣을 수 있습니다.

`-p` 옵션을 사용하면 필터를 우회할 수 있습니다. 예를 들어, `e -pm1`을 사용하여 다른 사람의 메일을 볼 때 필터를 적용하지 않을 수 있습니다.



# Mail Reply

`re` 명령은 포맷된 이메일을 답장용으로 준비합니다. "Reply to" 라인(반드시 존재해야 함)은 상단으로 이동합니다. 이 라인은 답장할 이메일 주소를 포함하고 있으며, 이메일 메시지를 포맷할 때 생성됩니다. 이 라인이 없으면 `re` 명령은 실패합니다.

"Subject:" 라인도 반드시 존재해야 합니다. 이 라인 역시 이메일을 포맷할 때 생성됩니다. `re` 명령을 실행한 후, 주제는 다른 이메일 헤더를 위해 페이지 아래로 이동할 수 있습니다.

이메일이 방금 열려졌고, 포맷되지 않은 데이터가 현재 edbrowse 세션에 여전히 존재하거나 동일한 데이터가 데이터베이스 파일 `maildir/.reply`에 저장되어 있는 경우, `re` 명령은 원본 이메일의 메시지 ID를 삽입합니다. 이 메시지 ID는 답장의 일부로 포함되어야 합니다. 결과적으로 라인은 다음과 같을 수 있습니다.


```
Reply to somebody@foo.bar.com
references: <4387A55E6AF43C4F9830C74EFECE9132022D0638@foo-bar.net>
Subject: What's in a name?
```

`re` 명령은 답장을 준비하는 명령으로, 포맷된 이메일을 처리합니다. 이 명령은 "Reply to" 라인을 상단으로 이동시킵니다. 이 라인은 답장할 이메일 주소를 포함하고 있으며, 이메일 메시지를 포맷할 때 생성됩니다. 이 라인이 없으면 `re` 명령은 실패합니다. 

"Subject:" 라인도 필수로 존재해야 하며, 이메일을 포맷할 때 생성됩니다. `re` 명령을 실행한 후, 주제 라인은 다른 이메일 헤더를 위해 페이지 아래로 이동할 수 있습니다.

이메일이 방금 열려졌고, 포맷되지 않은 데이터가 현재 edbrowse 세션에 여전히 존재하거나 동일한 데이터가 데이터베이스 파일 `maildir/.reply`에 저장되어 있는 경우, `re` 명령은 원본 이메일의 메시지 ID를 삽입합니다. 이 메시지 ID는 답장의 일부로 포함되어야 합니다. 결과적으로 라인은 다음과 같을 수 있습니다.

참조 라인은 절대 입력하거나 수정하거나 삭제해서는 안 됩니다. 이 라인은 토론 목록에 참여할 때 중요합니다. 이 라인은 서버에 답장이 실제로 답장임을 알리고, 참조된 메시지와 연결되어야 함을 나타냅니다. 서버는 이 정보를 사용하여 토론 스레드를 유지합니다. 이 라인을 삭제하면 새로운 스레드가 생성되어 다른 참가자들을 혼란스럽게 하고 짜증나게 할 수 있습니다. 따라서 토론 목록에서 메시지에 답장할 때는 `re` 명령이 "References:" 라인을 삽입하도록 하고, 이를 그대로 두십시오. 이메일 본문을 편집하고, 의견을 추가한 후, 이메일을 전송하면 됩니다.

참조 라인에 두 개의 ID가 공백으로 구분되어 있을 수도 있습니다. 첫 번째 ID는 스레드의 시작, 즉 이 주제를 시작한 메시지이며, 두 번째 ID는 직접 답장하는 댓글입니다. 이는 리스트 서버가 이메일을 스레드로 정리하는 데 도움을 줍니다.

`rea` 명령은 모든 수신자에게 답장하는 명령으로, 원본 이메일 데이터를 사용합니다. 모든 수신자는 파일 상단에 나타납니다. CC로 표시된 수신자도 있을 수 있으며, 이들은 탄소 복사본을 받았다는 의미입니다. 응답을 보내기 전에 이 수신자 중 일부를 삭제할 수 있습니다. 첫 번째 줄은 답장할 주소이므로 삭제하지 않는 것이 좋습니다.

이메일이 포맷되지 않았고, `b` 명령으로 브라우징을 했을 경우, `re` 명령은 파일을 브라우징 모드에서 제거하고 일반 텍스트 파일로 변환합니다. 이를 통해 텍스트 편집을 지원하여 메시지 본문에 답장을 작성할 수 있습니다. 만약 처음부터 새로 시작하고 싶다면, 단순히 언브라우즈할 수는 없습니다. 저장된 메일 메시지를 다시 편집하고 브라우징한 후 답장해야 합니다. edbrowse의 모든 작업이 그렇듯이, 사용해 보면 익숙해질 것입니다.



# Imap Client

위에서 설명한 POP3 클라이언트는 메일을 컴퓨터로 가져오며, 이후에는 해당 메일에 대한 책임이 사용자의 몫이 됩니다. 이메일을 아카이브하고 백업하는 등의 작업은 사용자가 해야 합니다. 그러나 IMAP 프로토콜은 이메일을 서버에 무기한 저장할 수 있도록 하여, 말하자면 클라우드에 보관할 수 있게 합니다. 이로 인해 이메일을 20년 치든, 10만 메시지든, 어떤 컴퓨터나 태블릿, 스마트폰에서도 접근할 수 있습니다. 필요시 이메일을 로컬로 다운로드할 수도 있지만, 다운로드할 필요는 없습니다. 이는 서버 측 접근 방식에 해당합니다. IMAP에 맞게 조정된 Gmail의 초기 구성 항목은 다음과 같습니다.

```
mail {
  imap
  inserver = imap.gmail.com
  outserver = smtp.gmail.com
  secure
  login = somebody@gmail.com
  password = secret
  reply = somebody@gmail.com
  from = Full Name
}
```

이것이 구성 파일의 세 번째 메일 항목이라면, `edbrowse -f3` 명령어로 이 계정에 접근할 수 있습니다. 이는 POP3 계정처럼 모든 이메일을 로컬 컴퓨터로 가져오는 것이 아닙니다. 대신, edbrowse는 IMAP 서버의 모든 이메일에 인터랙티브하게 접근할 수 있도록 합니다. 다음은 샘플 스크린샷입니다.

```
 1 INBOX, 0 messages
 2 [Gmail]/All Mail, 7 messages
 3 [Gmail]/Drafts, 0 messages
 4 [Gmail]/Important, 0 messages
 5 [Gmail]/Sent Mail, 0 messages
 6 [Gmail]/Spam, 7 messages
 7 [Gmail]/Starred, 0 messages
 8 [Gmail]/Trash, 16 messages
Select a folder by number or by substring. q to quit,
rf to refresh, l number to change fetch limit, e string to set envelope format.
```

`6`, 또는 `spam`, 또는 단순히 `spa`를 입력하면 edbrowse가 스팸 폴더의 7개 메시지를 안내합니다. 각 이메일의 발신자와 제목, 즉 봉투 정보를 출력하고, 수행할 작업을 묻습니다. 이는 POP3 클라이언트 인터페이스와 유사합니다. `q`를 입력하면 종료하고, `n`은 다음 메시지로 이동하며, `d`는 삭제하고, `m`은 다른 폴더로 이동시킵니다. 목적지 폴더는 번호 또는 이름으로 지정할 수 있습니다. `space`를 입력하면 이메일 본문을 읽기 시작하고, 계속 입력하면 이메일을 원하는 만큼 읽을 수 있습니다. `g`는 `space`와 같은 효과가 있으며, 이메일로 이동하거나, 페이지의 하이퍼링크나 디렉토리 스캔의 파일처럼 작동합니다. 이메일 중간에 `g`를 입력하면 상단으로 돌아갑니다. `w`는 이메일을 포맷된 상태로 저장하고, `W`는 저장 후 삭제합니다. `u` 또는 `U`를 입력하면 이메일을 포맷되지 않은 상태로 저장합니다. `a`는 첨부 파일을 저장하고, `/`를 입력하면 주제, 발신자 또는 이메일 본문 텍스트로 이메일을 검색합니다. 마지막으로 `h`를 입력하면 도움말 메시지가 표시됩니다.


```
h	print this help message
q	quit this program
s	stop reading from this folder
n	continue to next message
p	go back to previous message
d	delete this email
m	move this email to another folder
v	view all
b	batch move or delete
f	from move or delete
space	read and manage this email
t	read as plain text
/	search for words in subject, from, to, or body
w	write this email to a file
W	write this email to a file and delete it
u	write this email unformatted to a file
U	write this email unformatted to a file and delete it
a	scan and save attachments
e	envelope format string
```

일부 서버, 예를 들어 Gmail에서는 "모든 메일" 폴더에서 이메일을 직접 삭제할 수 없습니다. 대신, 이메일을 휴지통으로 이동한 후 거기서 삭제해야 합니다.

검색은 대소문자를 구분하지 않으며, 일반적으로 단순 부분 문자열이 아닌 단어를 찾습니다. 따라서 `foo`는 `Foo`와 일치하지만 `foobar`와는 일치하지 않습니다. 구현 방식은 IMAP 서버에 따라 다를 수 있습니다. 기본적으로 주제를 검색합니다. `f Smith`를 입력하여 Smith로부터의 메일을 검색하거나, `b neutron star`를 입력하여 중성자별에 관한 모든 이메일을 찾을 수 있습니다. 검색 결과가 수천 개인 경우, 마지막 100개만 표시됩니다. 이 제한은 `l` 명령으로 변경할 수 있습니다.

스팸 폴더에 300개의 이메일이 있는 경우, 모두 삭제하는 쉬운 방법이 있습니다. 먼저 `v`를 입력하여 모든 이메일을 확인하고, 유효한 이메일이 포함되지 않았는지 확인합니다. 실수로 좋은 이메일을 삭제하지 않도록 하세요. 그런 다음 `b`를 입력하여 배치 모드로 전환하고, `d`를 입력하여 삭제합니다. 이렇게 하면 모든 이메일이 삭제됩니다. 같은 방식으로 모든 메시지를 다른 폴더로 일괄 이동할 수 있습니다. 그러나 이동은 `from` 절과 함께 사용할 때 더 유용합니다. 현재 메시지가 Fred Flintstone으로부터 온 것이라면 `f`를 입력하면 "from Fred Flintstone"이 출력됩니다. 그 후 `m cartoon`을 입력하면 Fred Flintstone으로부터 온 모든 메시지가 cartoon 폴더로 이동합니다.

`create` 및 `delete` 명령은 새 폴더를 생성하거나 기존 폴더를 삭제합니다. `create foo`를 입력하여 새 폴더 `foo`를 생성할 수 있으며, 즉시 메시지를 이동할 수 있습니다. 경고 - `foo`를 삭제하면 `foo`의 모든 메시지가 사라질 수 있습니다. 이는 IMAP 서버에 따라 달라질 수 있습니다. `rename foo bar`를 입력하면 폴더 이름을 `foo`에서 `bar`로 변경할 수 있습니다. 이 명령은 폴더 이름에 공백이 없다고 가정합니다.


# Imap Within Edbrowse

Edbrowse는 거의 모든 기능에서 ed 유사 인터페이스를 제공합니다: 탐색, 파일 관리자, SQL 데이터베이스, IRC 클라이언트 등. 이 점이 Edbrowse의 매력 중 하나입니다. IMAP에서도 이와 같은 경험을 제공합니다. 이메일을 읽으면서 하이퍼링크로 이동하거나, 회신을 발송하거나, 이메일을 삭제하거나, 첨부 파일을 저장하는 등의 작업을 할 수 있습니다. 독립형 클라이언트는 일부 작업에서 더 빠를 수 있지만, 모든 통합 작업을 수행할 수는 없습니다.

서버를 호출하려면 "imap n" 명령을 입력합니다. 여기서 n은 구성 파일에서 메일 블록의 번호입니다. (imap 0은 연결을 종료하고 버퍼를 지웁니다.)

연결이 성공적으로 이루어지면, 버퍼에는 폴더당 한 줄씩 표시됩니다. 이 줄에는 메시지 수가 표시됩니다. 폴더가 imask 지시문에 의해 제외된 경우, 수는 물음표로 표시됩니다. 이 동작은 독립형 메일 클라이언트와 유사하지만 동일하지는 않습니다. 클라이언트는 제외된 폴더를 전혀 출력하지 않습니다. edbrowse 버퍼에서는 모든 폴더를 포함하며, 활성화된 폴더의 개수를 표시합니다.

imask 명령은 imask 기능을 켜거나 끄는 명령입니다. 이 기능은 이 창에서만 사용할 수 있으며, 계정별로 적용됩니다.

a 명령은 새 폴더를 추가하고, s 명령은 폴더 이름을 변경하며, d 명령은 폴더를 삭제합니다. 이는 여러분이 이미 알고 있는 ed 명령이며, 예상되는 부작용이 있습니다. d 명령은 결정적이고 되돌릴 수 없으므로, edbrowse는 삭제할 폴더와 그 안의 모든 이메일을 정말로 삭제할 것인지 확인합니다. 삭제하려면 y 또는 yes를 입력합니다. 시스템 폴더(예: Trash 또는 INBOX)를 삭제하면 어떻게 되는지 모릅니다. 추천하지 않습니다! 자신이 생성한 폴더만 이름을 변경하거나 삭제하세요.

/expression을 입력하여 원하는 폴더를 찾은 후, g를 입력하여 폴더로 이동할 수 있습니다. 폴더가 imask에 의해 제외된 경우에도 가능합니다.

새 버퍼에서는 가장 최근의 이메일이 시간순으로 나열되며, 가장 최근 이메일이 하단에 표시됩니다. g를 입력하면 이메일이 버퍼에 표시됩니다. 여기서 이메일의 내용(원본 또는 브라우징된)을 일반적인 방식으로 조작할 수 있습니다. 하이퍼링크가 흥미롭다면 이동할 수 있으며, 이는 IMAP 클라이언트에서는 불가능합니다.

^를 입력하면 봉투 목록으로 돌아가고, ^를 다시 입력하면 폴더 목록으로 돌아갑니다.

d 명령은 현재 읽고 있는 이메일이나 현재 봉투에 표시된 이메일을 삭제합니다. 봉투 페이지에서는 g/re/d 명령으로 이메일 범위 또는 여러 이메일을 삭제할 수 있습니다. 주의: 실행 후 취소할 수 없습니다. 그러나 서버에 따라 d 명령이 실제로 삭제되지 않을 수도 있으며, 특정 폴더에서는 d 명령이 휴지통으로 이동하는 동작을 하도록 dx 지시문을 사용할 수 있습니다.

d 명령은 현재 위치의 봉투를 제거하지만, 상위 페이지의 상태를 조정하지 않습니다. 폴더로 돌아가면 메시지 수가 이전과 동일하게 유지됩니다. 정확한 메시지 수를 얻으려면 rf를 입력하세요.

폴더 또는 봉투를 볼 때, "l number" 명령은 가져오기 제한을 변경하며, 한 번에 가져오는 봉투의 수를 설정합니다. "e format" 명령은 봉투의 형식을 변경합니다. 이는 IMAP 클라이언트와 동일합니다. 예를 들어, "e fstd"는 발신자, 제목, 수신자, 날짜를 표시합니다. n 속성은 여기서 의미가 없으며, edbrowse가 이미 줄 번호를 유지합니다. 봉투 페이지에 있을 때는 새 형식으로 보이도록 새로 고침할 수 있습니다.

- n 제한은 최신 이메일이 아닌 처음 n개의 이메일을 가져옵니다. 이는 오래된 이메일을 쉽게 정리할 수 있게 해줍니다.

edbrowse는 IMAP 서버에서 원격 검색을 수행할 수 있습니다. 이는 버퍼에 있는 이메일을 검색하는 것이 아니라, 서버의 모든 이메일을 대상으로 검색을 수행합니다. 현재 줄의 폴더에 대해 적용되는 검색은 다음과 같습니다.

```
/f fred : emails that come from Fred
/t wilma : emails that were sent to Wilma
/s paypal transfer : emails with paypal and transfer in the subject line
/b baseball : emails that mention baseball anywhere in the body
/u unread emails
/uf fred unread emails from fred ... etc
```

다른 `/expression`은 버퍼를 통해 텍스트 검색을 수행합니다.

봉투와 가져오기 제한이 여전히 적용됩니다. 예를 들어, 첫 20개 또는 마지막 30개의 이메일을 요청하여 발신자, 제목, 크기를 표시할 수 있습니다. Sent 또는 Drafts 폴더를 검색하는 경우, 특정 사람에게 보낸 이메일을 찾기 위해 `to` 필드를 사용할 수 있습니다.

봉투를 보거나 관련 메일을 읽는 중에, "m abc" 명령은 이메일을 abc라는 이름이 포함된 폴더로 이동시킵니다. 이메일이 사라지면 edbrowse는 자동으로 창을 닫고 봉투 목록으로 돌아갑니다. 이메일의 봉투도 사라집니다. "t abc"는 이메일을 abc 폴더에 복사합니다. 현재 위치를 유지하면서 복사합니다. 봉투 페이지에서는 이메일 범위 또는 여러 이메일을 이동하거나 복사할 수 있습니다. `g/re/m abc` 명령을 사용할 수 있습니다.

숫자도 이동 및 복사 명령에서 유효합니다. 만약 abc가 세 번째 폴더라면, "m 3" 또는 "t 3"을 입력할 수 있습니다. 그러나 폴더의 이름 또는 이름의 일부를 입력하는 것이 더 안전하고 쉽습니다.

다른 버퍼에서 abc 폴더가 열려 있으면, 이메일을 그 폴더로 이동해도 해당 봉투 목록에는 나타나지 않습니다. 이메일이 이동하면서 IMAP 서버에서 새로운 uid를 얻기 때문입니다. 이 uid는 edbrowse가 이메일에 접근하여 작업을 수행하는 방법입니다. abc 폴더의 봉투를 새로 고쳐야 이메일을 볼 수 있습니다. 이메일은 가장 최근의 것이며, 심지어 몇 년 전의 것이더라도 그렇습니다. 여러 폴더를 동시에 열어 두는 것은 유용하지 않을 수 있습니다. 폴더를 탐색하고 작업을 수행한 후, 다시 상위로 올라가서 다른 폴더로 이동하는 방식이 좋습니다.

이메일을 읽는 동안, imap 클라이언트를 반영한 쓰기 명령이 있습니다. "w foo" 명령은 이메일을 포맷된 상태로 foo 파일에 쓰고, 원본 이메일은 `~/.trash/rawmail` 디렉토리에 저장합니다. 이는 메일 클라이언트가 하는 작업과 비슷하지만, 이 세션에서는 파일을 현재 위치에 저장합니다. 첨부 파일은 기본 파일 이름으로 저장되거나 원하는 다른 파일 이름으로 저장할 수 있습니다. 첨부 파일을 건너뛰려면 x를 입력하고, 모든 이미지 첨부 파일을 건너뛰려면 X를 입력합니다. imap 클라이언트를 사용한 경험이 있다면 익숙할 것입니다.

w 명령만 사용하고 파일 이름을 지정하지 않으면, 주소록에 기반하여 기본 파일 이름이 선택될 수 있습니다. 만약 이메일 주소가 alias fred와 연결되어 있다면, edbrowse는 fred를 사용할 것인지 묻습니다. 물론 파일 이름을 다른 것으로 변경할 수 있습니다.

파일이 이미 존재하는 경우, 새로운 이메일이 추가되며, 이메일 간의 구분을 위해 등호가 삽입됩니다. 그러나 첨부 파일은 추가되지 않습니다. 첨부 파일은 독립적인 파일로 저장해야 합니다.

u 명령은 이메일을 포맷 없이 저장합니다. "u filename"을 입력하여 파일 이름을 지정할 수 있으며, 그렇지 않으면 edbrowse가 파일 이름을 묻습니다. 첨부 파일 저장을 위한 프롬프트는 나타나지 않습니다. 원본 이메일을 가지고 있으므로, 나중에 이메일을 탐색하고 첨부 파일을 저장할 수 있습니다.

대문자 W 및 U는 w 및 u 명령의 기능을 수행하고 이메일을 삭제합니다. 이는 imap 클라이언트와 마찬가지로 상위 봉투 페이지로 돌아가며, 해당 이메일의 봉투도 사라집니다.

이메일이 버퍼에 있을 때의 특별한 기능은 선행 w 또는 u로 표시됩니다. 다른 명령은 일반적으로 해석됩니다. 이메일을 어디론가 쓰고 백업 이메일을 `~/.trash/rawmail`에 저장하지 않으려면, ",w filename"을 입력하세요.

M 명령으로 이메일을 이동시키면 이 특별 기능이 손실됩니다. u는 일반적인 취소 기능을 수행합니다. 원본 이메일을 저장하려면 ub 후 w를 입력하거나, 첨부 파일을 저장하려면 ub 후 b를 입력하세요. imap 클라이언트의 단축키는 사라지며, 이를 인식하는 것이 좋습니다. 이메일을 원래 위치에 두는 것이 좋습니다.

특별한 쓰기 명령은 봉투 페이지에서도 사용할 수 있습니다. 이는 선행 w 또는 u가 없는 명령이며, 현재 줄에 적용됩니다. 이메일이 작성되면 바이트 수가 출력되며, 이는 다른 파일을 작성하는 것과 같습니다. 대문자 W 또는 U를 사용하여 이메일을 작성하고 삭제한 경우, 다음 봉투가 표시됩니다. imap 클라이언트는 정확히 동일한 방식으로 작동합니다.

봉투 페이지에서 r 명령, 접미사 없이, 이메일을 읽은 것으로 표시합니다. 따라서 ,r은 모든 이메일을 읽은 것으로 표시합니다. 만약 봉투 형식에 u가 포함되어 있다면, 별표가 사라집니다.

r-를 사용하여 이메일을 읽지 않은 것으로 표시할 수 있으며, 읽지 않은 상태로 표시됩니다. 봉투 형식에 u가 포함되어 있다면, 별표가 다시 나타납니다.

회신 명령인 re 및 rea는 봉투에서 사용할 수 있습니다. 이는 g 후 re를 간단히 축약한 것입니다.
