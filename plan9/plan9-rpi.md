Plan 9: Setting up 9front on a Raspberry Pi

---

[Reference](https://luksamuk.codes/posts/plan9-setup-rpi.html)

안녕하세요, 여러분. 오늘은 제 라즈베리 파이를 9front의 최신 버전으로 업그레이드하려고 했는데, arm64에서 소스 코드가 컴파일되지 않아서 라즈베리 파이에 9front를 다시 설치하기로 했습니다.

다음 단계들은 제가 이 내용을 절대 잊지 않도록 간단히 적어둔 메모를 바탕으로 작성한 것입니다. 추후 이 게시물에 내용을 추가하여 업데이트할 가능성이 조금 있습니다.

마지막 업데이트: [2023-12-16 토 11:42]


# Preparation

![20261023_195223.jpg](images/20261023_195223.jpg)  
그림 1: 제 컴퓨터에 설치된 라즈베리 파이.

다음과 같은 준비물이 필요합니다:

- 라즈베리 파이 (이 예시에서는 Pi 3 Model B+를 사용했습니다);
- 9front 파일을 저장할 수 있는 SD 카드 (최대 2GB면 충분합니다);
- 여분의 키보드와 3버튼 마우스 (대부분의 휠 마우스가 호환됩니다);
- [9front 라즈베리 파이 이미지](http://9front.org/releases/) (사용 중인 Pi와 호환되는 것을 사용하세요);
- HDMI 케이블 (그리고 라즈베리 파이를 연결할 TV나 모니터);
- 라즈베리 파이를 라우터(또는 사용 중인 다른 기기)에 연결할 이더넷 케이블;
- 다음 프로그램이 설치된 리눅스 배포판을 실행하는 컴퓨터:
	+ 로컬 네트워크에서 장치를 검색하기 위한 arp-scan;
	+ 9front 웹사이트에서 찾을 수 있는 drawterm 프로그램의 9front 수정판.
+ [Drawterm](http://wiki.9front.org/drawterm), 특히 9front에서 변경된 사항과 호환되는 버전.

리눅스 프로그램과 9front Pi 이미지를 다운로드하는 것은 매우 간단한 작업이므로, 이 부분은 직접 알아보시기 바랍니다.

또한 SD 카드 이미지가 SD 카드에 쓰여져야 합니다. .img.gz 파일에서 이미지를 추출한 후, dd 명령어를 사용하여 .img 파일을 SD 카드에 쓰십시오. 이 부분도 직접 알아보시기 바랍니다.

SD 카드를 라즈베리 파이의 카드 슬롯에 삽입하고, 이더넷 케이블을 라즈베리 파이와 라우터(또는 사용 가능한 네트워크 장치)에 연결하세요. 여기서 중요한 점은 라즈베리 파이와 리눅스 컴퓨터가 동일한 네트워크에 접속할 수 있도록 하는 것입니다.

또한, 마우스와 키보드, HDMI 케이블을 모두 라즈베리 파이에 연결하세요. 이는 초기 설정 시에만 필요하지만, 나중에 9front의 커널을 업데이트하려면 다시 부팅하기 전에 이 장치들을 연결해야 합니다. 그 이유는 나중에 설명하겠습니다.



## A quick note on Drawterm

저는 리눅스에서 Drawterm을 기본 빌드 구성으로 설정했을 때 오디오가 제대로 작동하게 한 적이 없기 때문에, sndio 드라이버를 사용할 것을 권장합니다. 빌드에 성공했다면 콘솔 창에서 sndiod -dd 명령을 실행하기만 하면 Drawterm에서 모든 사운드 재생이 정상적으로 작동할 것입니다. 다만, 이 드라이버는 오디오 채널을 차단하여 재생에 사용하므로, 다른 리눅스 프로그램의 사운드 재생에 영향을 줄 수 있다는 점에 유의하시기 바랍니다.



# Automatic boot

기본부터 시작해 봅시다. 9front 이미지를 SD 카드에 구워 Raspberry Pi에 삽입하고 전원을 연결했다고 가정해 봅시다. 또한 마우스와 키보드가 연결되어 있고, RPI는 TV나 모니터에 연결되어 있습니다.

RPI가 부팅되면 Plan 9 콘솔이 표시되는데, 그래픽 모드일 수도 있고 아닐 수도 있습니다. 어느 쪽이든, 부팅 인수(bootargs)나 사용자 이름 등을 입력하려면 Return 키를 몇 번 눌러야 합니다. Return 키를 누르면 모든 항목에 대해 기본 옵션이 선택됩니다.

첫 번째 단계는 이 성가신 입력 요청을 제거하는 것입니다. 부팅 인수와 사용자는 항상 동일하므로, plan9.ini 파일을 설정하여 이러한 입력을 요구하지 않도록 할 수 있습니다.

이 시점에서 아마도 rio 윈도우 매니저 화면에 있을 것입니다. 키보드 설정과 관계없이 9front는 미국식 키보드 레이아웃을 사용한다는 점을 기억하십시오.

터미널을 열고, RPI의 DOS 파티션을 마운트한 다음 다음 명령어를 사용하여 해당 마운트 디렉터리로 이동하십시오:

```
9fs pidos
cd /n/pidos
```

9front의 RPI 이미지에는 plan9.ini 파일이 없습니다. 이 파일은 실제로 부팅 시 cmdline.txt 파일에 기록된 명령어를 기반으로 생성됩니다.

그런 다음 sam이나 acme를 사용하여 cmdline.txt 파일을 열거나, ed를 이용해 편집할 수도 있습니다.

파일에 다음 내용이 기재되어 있는지 확인하십시오:

```
console=0 user=glenda nobootprompt=local!/dev/sdM0/fs
```

console은 이미 존재해야 하는 매개변수이며, user는 설명이 필요 없을 정도로 간단합니다. nobootprompt는 9front 부팅 시 bootargs 값에 대한 입력 요청을 억제합니다. 이는 대신 bootargs를 사용한다면 bootargs의 기본값만 설정하게 되어, 부팅 과정에서 어쨌든 Return 키 입력을 기다리며 멈춰버리기 때문입니다.

사용자 glenda는 대부분의 Plan 9 배포판에서 기본값이므로, 정확히 무엇을 하는지 모르는 한 이 값을 변경하지 마십시오.

파일 끝에 줄 바꿈이 있는지 확인한 후 저장하십시오.

이제 명령줄에서 reboot 명령을 사용하여 RPi를 재부팅하고 테스트할 수 있습니다. 키보드, 마우스 및 모니터가 계속 연결되어 있는지 확인하십시오.



# Configuring remote access

다음으로, 부팅 후 다른 컴퓨터가 자동으로 원격으로 연결할 수 있도록 9front를 설정하겠습니다.

구체적으로 말하면, 여기서 CPU 서버를 시작하는 작업을 수행할 것이지만, RPi는 여전히 다른 종류의 서버 역할도 수행할 수 있습니다(예를 들어, 로컬 저장소를 계속 제공할 수 있습니다).

sam, acme 또는 ed를 사용하여 $home/lib/profile 파일을 엽니다.

이 파일에는 사용자가 현재 세션에 연결한 방식과 관련된 $service 환경 변수의 값을 비교하는 switch 구조가 있습니다. 간단히 말해, 현재는 터미널 케이스에 해당하지만, 우리가 주목해야 할 부분은 cpu 케이스입니다. 이는 컴퓨터가 CPU 서버에 원격으로 연결된 경우를 의미합니다.

이 switch 구조체 앞에 다음 줄들을 추가하십시오. 필요에 따라 내용을 변경할 수 있지만, 사용자 glenda는 그대로 유지하십시오.

```
auth/factotum -g ‘key proto=p9sk1 dom=plan9 user=glenda !password=glenda’
aux/listen1 -t tcp!*!rcpu /rc/bin/service/tcp17019 -R &
ip/ipconfig
```

여기서는 몇 가지 명령줄 프로그램이 사용되므로, 이들이 정확히 어떤 역할을 하는지 이해하는 데 시간을 할애해 보겠습니다. 더 자세한 정보는 해당 프로그램의 매뉴얼 페이지를 확인해 주세요(진심으로 부탁드립니다. Plan 9를 사용한다는 것은 매뉴얼 페이지를 읽는 것을 의미합니다).

factotum은 실행 중인 인증 서버(Auth Servers)와 통신합니다. 위의 특정 명령어는 CPU 서버에 원격으로 연결을 시도할 수 있는 ‘glenda’라는 특정 사용자에게 비밀번호를 등록합니다. 비밀번호는 원하는 대로 설정할 수 있으며, 이 정보를 암호화하는 방법도 있지만, 여기서는 그렇게 하지 않겠습니다.

listen1은 현재 CPU 서버를 원격 연결에 개방하는 간단한 방법입니다… 설명은 이 정도로만 하겠습니다.

ipconfig는 현재 네트워크에서 라즈베리 파이의 IP 주소를 설정합니다(이 명령을 실행하기 전까지는 ip나 ping과 같은 도구가 작동하지 않는다는 점을 눈치채셨을 겁니다!).

이 명령들은 사용자가 9front에서 세션을 언제, 어떻게 시작하든 상관없이 항상 실행되도록 배치되어 있습니다. 이 시점에서, 키보드, 마우스 또는 비디오 출력 장치 없이 라즈베리 파이를 켠다 해도 여전히 glenda 사용자로 로그인되어 이 스크립트가 실행됩니다.

다행히도, 이 명령들을 여러 번 실행해도 시스템 작동에는 영향을 미치지 않습니다.

이제 다른 운영 체제에서 drawterm을 사용하거나 /bin/ncpu를 통해 라즈베리 파이에서 실행 중인 9front 인스턴스에 원격으로 접속할 수 있습니다. 다만, 이 글에서는 후자에 대해서는 다루지 않겠습니다.

이제 RPi를 일시적으로 끌 수 있습니다. 임의의 콘솔에서 fshalt를 실행하고, “done halting” 메시지가 표시될 때까지 기다린 후 전원을 뽑으세요. 네트워크 장치에 연결된 이더넷 케이블을 제외한 모든 케이블을 제거하십시오.

이제 RPi를 다시 켤 수 있습니다. 이번에는 전원 코드와 이더넷 케이블만 있으면 됩니다.



# Connecting remotely

이제 9front가 실행 중인 RPi에 원격으로 연결해 보겠습니다.

원격 접속 시에는 DOS 파티션(pidos)에 접근할 수 없으므로, cmdline.txt 파일을 다시 편집하거나 커널을 업데이트하려면 비디오 출력과 키보드/마우스 입력이 가능한 상태에서 RPi를 재부팅해야 합니다.

리눅스에서 먼저 네트워크 내 라즈베리 파이의 IP 주소를 확인하세요.

```
sudo arp-scan --local
```

이 명령을 실행하면 비밀번호 입력을 요청하고 다음과 같은 결과가 표시됩니다:

```
Interface: xxxx, type: xxxx, MAC: xx:xx:xx:xx:xx:xx, IPv4: 192.168.2.x
Starting arp-scan 1.9.7 with 256 hosts (https://github.com/royhills/arp-scan)
...
192.168.2.7	xx:xx:xx:xx:xx:xx	Raspberry Pi Foundation
...

4 packets received by filter, 0 packets dropped by kernel
Ending arp-scan 1.9.7: 256 hosts scanned in 1.889 seconds (135.52 hosts/sec). 4 responded
```

제 경우, 제 RPi는 로컬 네트워크에서 192.168.2.7이라는 IP 주소를 가지고 있습니다.

drawterm을 사용하여 연결해 봅시다. 다음 명령어를 실행하기만 하면 됩니다. -a 인수는 인증 서버가 실행 중인 머신을 가리켜야 하며, -h 인수는 CPU(호스트) 서버가 실행 중인 머신을 가리킵니다. 이 예시에서는 두 서버가 같은 컴퓨터에 있습니다. -u 옵션은 사용자(“glenda”)를 지정하는 것입니다.

```
drawterm -a 192.168.2.7 -h 192.168.2.7 -u glenda
```

그러면 다음과 같은 프롬프트가 표시된 Drawterm 창이 열립니다:

```
glenda@plan9 p9sk1 password:
```

앞서 factotum으로 정의한 비밀번호(이 예에서는 glenda)를 입력한 후 Return 키를 누르세요. 비밀번호가 화면에 표시되지 않는다는 점에 유의하세요. ipconfig와 관련된 오류가 표시될 수 있습니다(부팅 시 처음 실행된 후 두 번째로 실행되기 때문입니다). 그러면 다음과 같은 프롬프트가 나타납니다:

```
cpu%
```

여기서 rio를 입력하고 Enter 키를 누르면 그래픽 인터페이스가 표시됩니다.

아직 스크립트(일반적으로 로컬 터미널에서 riostart)를 실행하도록 지시하여 rio를 시작하지 않았기 때문에 화면에 아무것도 표시되지 않는 것을 확인할 수 있습니다. 이를 변경해 보겠습니다.



# Logging in remotely to a graphical session

riostart 스크립트는 HDMI 케이블, 키보드, 마우스를 연결하여 9front를 부팅한다고 가정하므로, drawterm 세션용으로는 이 스크립트의 수정된 버전이 필요합니다.

콘솔 창을 열고 $home/bin/rc로 이동하세요. $home의 bin 폴더에는 rc라는 이름의 하위 폴더와 아키텍처 이름(대개 arm 또는 arm64)이 붙은 또 다른 하위 폴더가 두 개 있다는 것을 알 수 있습니다.

rc 폴더는 실행 가능한 모든 rc 스크립트가 저장되는 곳입니다.

새로운 스크립트를 만들어 봅시다.

```
touch riostart-remote
```

그런 다음 sam이나 acme를 사용하여 파일을 열고, 맨 앞에 shebang #!/bin/rc를 추가하세요.

이 단계부터는 사용자의 취향에 따라 설정을 조정하면 됩니다. 저는 부팅 시 통계, 시계, winwatch와 같은 정보를 보여주는 창이 몇 개 열리도록 설정하는 것을 선호합니다.

다음은 예시로 제 설정입니다. 리눅스 시스템에서 이 설정을 복사하여 파일에 붙여넣을 수도 있습니다(Acme를 통해 하는 것이 더 좋습니다). 다만, 아직 Plumber를 설정하지 않았기 때문에 faces는 작동하지 않을 가능성이 높으며, bar는 마지막에 설명할 추가 유틸리티입니다.

```
#!/bin/rc
window 0,0,161,117 stats -lmisc
window 161,0,278,117 clock
window 278,0,478,117 winwatch -e '^(winwatch|stats|clock|faces)'
window 478,0,877,117 faces -i
window -scroll bar
```

이 파일의 마지막에 줄 바꿈이 있는지 확인하십시오.

이제 이 파일을 실행 가능하게 설정합시다.

```
chmod +x riostart-remote
```

다시 돌아가서 $home/lib/profile 파일을 편집해 봅시다. cpu라는 스위치의 케이스로 스크롤해 보세요. 이 케이스는 CPU 서버에 원격으로 연결하는 경우입니다.

fn cpu% 함수 정의 뒤에 몇 줄을 추가해 봅시다(들여쓰기를 꼭 지켜주세요):

```
if(! webcookies >[2]/dev/null)
        webcookies -f /tmp/webcookies
webfs
plumber
rio -i riostart-remote
```

이 줄들이 해당 케이스의 마지막 줄이 되도록 하세요.

webcookies는 HTTP 쿠키 관리자를 시작합니다. 실행에 실패하면 /tmp/webcookies 파일을 기본 쿠키 파일로 사용하여 다시 실행을 시도합니다.

webfs는 웹 파일 시스템 인터페이스를 바인딩하여 abaco나 mothra를 사용하여 웹을 탐색할 수 있게 해줍니다.

plumber는 프로세스 간 메시징 시스템을 파일 시스템에 바인딩하여, 예를 들어 명령 프롬프트에서 PDF 파일 이름을 'plumbing'하여 PDF를 여는 등 흥미로운 작업을 수행할 수 있게 해줍니다. 마지막에 이를 제대로 설정할 시간을 갖겠습니다.

마지막 줄은 rio를 시작하고, 시작 시 riostart-remote를 실행하도록 지시합니다.

이제 파일을 저장한 후 drawterm을 닫고, 위의 명령어를 통해 다시 로그인할 수 있습니다. 이는 9front의 안정성에 영향을 주지 않습니다. drawterm은 기본적으로 터미널일 뿐이므로 시스템의 나머지 부분과는 분리되어 있습니다.

drawterm을 통해 다시 로그인하면, rio가 자동으로 환영 메시지를 표시할 것입니다.



# Binding the local filesystem

9fs 프로토콜을 간접적으로 활용하는 흥미로운 방법 중 하나는 로컬 파일 시스템을 drawterm 세션에서 액세스할 수 있도록 하는 것입니다.

즉, drawterm 세션에서 리눅스 파일에 격리된 방식으로 액세스할 수 있어, 해당 파일은 오직 해당 drawterm 세션에서만 볼 수 있으며 다른 세션이나 다른 사용자에게는 표시되지 않습니다.

이는 9front 서버에 로그인하면 자동으로 수행되며, 파일 시스템의 루트가 /mnt/term에 마운트됩니다. 따라서 사용자가 해야 할 일은 어딘가에 해당 폴더로 연결되는 “링크”를 생성하는 것뿐입니다.

리눅스에서는 심볼릭 링크를 떠올리겠지만, 여기서는 단순히 한 폴더를 다른 폴더에 바인딩하기만 하면 됩니다.

$home/lib/profile 파일을 다시 편집하십시오. webfs를 시작하기 바로 앞에 다음 내용을 추가하십시오:

```
bind -a /mnt/term/home /usr >[2]/dev/null
```

이렇게 하면 /mnt/term/home/에 있는 모든 파일이 /usr에 바인딩됩니다. 따라서 /usr에 있는 모든 파일(예: 9front 홈 폴더인 /usr/glenda)은 그대로 유지되며, /mnt/term/home/에 있는 모든 파일도 /usr 아래에서 볼 수 있게 됩니다.

예를 들어, 리눅스에서 사용자 폴더가 /home/user에 있다면, 이제 9front에서(drawterm 세션을 통해서만) /usr/user에서 해당 폴더를 사용할 수 있게 됩니다.

/usr 아래에 새 파일을 생성하려면 bind 명령어에서 -a 대신 -ac를 사용해야 한다는 점에 유의하십시오. 자세한 내용은 bind(1)을 참조하십시오.

이는 리눅스와 9front 간에 파일을 전송할 때 특히 유용하며, 9fs 프로토콜을 통해 원격 저장소를 직접 사용할 수도 있게 해줍니다.

다른 디렉터리를 바인딩해 보는 것도 좋습니다.

![20261023_195633.jpg](images/20261023_195633.jpg)  
그림 2: 설정 과정 중의 스크린샷. 이 스크린샷은 Drawterm에서 캡처한 것입니다.



# Setting up the Plumber

plumber(4)는 매우 중요한 프로세스 간 메시지 프로토콜로, 세션에 로그인할 때 plumber 명령을 통해 초기화됩니다.

현재로서는 plumber가 작동하지 않지만, 최소한의 설정만으로도 이미지 및 PDF 파일을 page로 열거나, 텍스트 파일을 acme 또는 sam으로 열거나, URL을 mothra에서 여는 것과 같은 간단한 기본 리디렉션을 수행할 수 있게 할 수 있습니다.

$home/lib/plumbing 파일을 생성하십시오. 그런 다음 Acme나 Sam을 사용하여 다음과 같이 편집하십시오:

```
editor = sam
include basic
```

이것만으로도 충분하지만, 이 줄들 앞에 더 많은 규칙을 추가할 수도 있습니다. plumber 규칙의 구문에 대한 자세한 내용은 plumb(6)을 참조하십시오.

다음은 제가 직접 작성한 plumb 파일입니다. 여기서는 Acme를 기본 텍스트 편집기로 설정하고, mothra를 기본 웹 브라우저로 지정했습니다(구체적으로는 mothra의 alt 표시 모드를 사용하여 웹 페이지를 열도록 명시했습니다). 이러한 변수들은 파일 끝에 포함된 기본 plumbing 규칙에서 사용됩니다.

```
editor  = acme
browser = ‘mothra -a’
include basic
```

이제 이미지나 PDF 파일이 들어 있는 폴더로 이동하여 파일을 나열한 후, 마우스로 파일 이름을 선택한 다음, 가운데 버튼을 클릭하고 ‘plumb’를 선택하면 해당 파일이 적절한 애플리케이션으로 새 창에 열립니다. 웹 링크의 경우, 링크를 아무 곳이나 선택한 뒤 동일한 방법으로 plumb를 실행하면 됩니다.

이를 통해 링크를 통해 웹 페이지를 열 수 있게 되며, 설정을 완료하면 이메일 열기 기능에도 적용됩니다.

다음 명령어를 사용하여 플러빙 규칙을 수동으로 업데이트할 수 있습니다:

```
cp $home/lib/plumbing /mnt/plumb/rules
```

또는 새 세션에 로그인하여 변경 사항이 적용되는지 확인할 수도 있습니다.



# Extra stuff

![20261023_195743.jpg](images/20261023_195743.jpg)  
그림 3: Plan 9의 또 다른 스크린샷으로, 이번에는 프로그램 내에서 직접 캡처한 것입니다. 이 스크린샷은 rio에서 캡처하여 제 리눅스 하드 드라이브에 직접 저장했습니다.



## Setting up Git

[Plan 9용 Git](https://github.com/oridb/git9)은 해당 저장소에 명시된 대로 간단한 단계만 거치면 설정할 수 있습니다. 다음 내용은 링크된 저장소의 지침을 그대로 반복한 것입니다.

참고: 현재(2022년 11월 18일) 기준으로, Plan 9용 Git은 9front에 기본적으로 포함되어 있습니다. 따라서 더 이상 설치 단계를 수행할 필요가 없습니다.


### Installation

먼저 부트스트랩 사본을 확보합니다.

```
cd /tmp
hget https://orib.dev/git/git9/HEAD/snap.tar.gz | tar xvz
cd git9
mk all
mk install
```

이제 가끔씩 새로운 업데이트를 가져올 수 있는 복사본을 확보하겠습니다. 저는 $home/src 디렉터리를 생성한 다음, 다음과 같은 작업을 수행하여 이를 구현했습니다:

```
cd $home/src
git/clone gits://orib.dev/git9
cd git9
mk all
mk install
```

### Setting up username

다음 단계는 사용자 이름과 이메일 주소를 설정하는 것입니다.

$home/lib/git 파일을 생성하세요. touch 명령어를 사용하면 됩니다. 그런 다음 Acme나 Sam을 사용하여 파일을 편집하고 다음과 같은 내용을 추가하세요:

```
[user]
    name=Your Name
    email=youremail@example.com
```

파일 끝에 줄바꿈을 꼭 추가해야 합니다.


### Setting up an SSH key for Git

SourceHut이나 GitHub와 같이 SSH 통신이 가장 원활하게 작동하는 웹사이트에서 9front 박스를 인증하려면 SSH 키를 생성해야 할 수도 있습니다.

먼저, 공유하지 않을 SSH 개인 키를 생성하세요. 이 단계는 다소 시간이 걸릴 수 있으니 유의하세요:

```
auth/rsagen -t ‘service=ssh’ >$home/lib/sshkey
```

이제 Git Forge와 공유할 SSH 공개 키를 생성하세요:

```
auth/rsa2ssh $home/lib/sshkey >$home/lib/sshkey.pub
```

마지막으로, 개인 키를 [factotum](http://man.9front.org/4/factotum)에 전송하여 사용할 수 있도록 하세요. 로그인 시 항상 사용할 수 있도록 이 명령어를 프로필에 추가할 수도 있습니다.

```
cat $home/lib/sshkey >/mnt/factotum/ctl
```

이 단계에 대한 참고 자료는 [여기]http://wiki.9front.org/ssh)에서 확인할 수 있습니다.

이제 git(1) 및 gitfs(4) 매뉴얼 페이지를 참고하여 시작할 수 있습니다.




## Setup automatic time synchronization

만약 여러분이 저처럼 현재 1970년 1월 1일에 있지 않다면, Plan 9가 인터넷에서 현재 날짜를 가져오도록 설정하고 싶을 수도 있습니다. 다행히도, 이는 아주 간단하게 할 수 있습니다.

이 설정은 다른 플랫폼의 9front 설치본에서는 자동으로 이루어지지만, 우리 RPi 이미지에는 9front가 미리 설치되어 있으므로 시간대를 수동으로 설정해야 합니다.

/adm/timezone 디렉터리를 살펴보면 수많은 시간대 목록이 표시됩니다. local 파일을 덮어쓰도록 원하는 시간대 파일을 복사하기만 하면 됩니다. 제가 직접 수행한 방법은 다음과 같습니다:

```
cp /adm/timezone/Brazil_East /adm/timezone/local
```

이제 RPi 시간을 수동으로 업데이트하는 방법에 대해 알아보겠습니다. 다음과 같은 명령을 실행하면 됩니다:

```
aux/timesync -n pool.ntp.org
```

혹은 저처럼 브라질에 계신다면:

```
aux/timesync -n pool.ntp.br
```

이제 $home/lib/profile 파일을 다시 열어보세요. ipconfig 설정 바로 뒤에 앞서 언급한 명령어를 추가하세요.

9front는 부팅 시 /rc/bin/cpurc 또는 /rc/bin/termrc를 통해 이 명령을 실행하도록 되어 있지만, 안타깝게도 IP 주소를 할당받기 전에는 이 중 어느 것도 작동하지 않습니다.

하지만, 다음 내용을 해당 파일 어딘가에 추가하도록 파일을 편집할 수도 있습니다. 편집 후에는 파일 끝에 줄바꿈이 포함되어 있는지 확인하세요:

```
TIMESYNCARGS=(-n pool.ntp.org)
```

(또는 브라질 NTP 서버를 대신 사용하세요).

변경 사항이 적용되도록 시스템을 재부팅하세요.

이 정보는 [여기](https://clueelf.wordpress.com/2018/06/29/clocks-time-ntp-plan9-9front/)에서 일부 참고한 것이며, [9p.io 위키](https://9p.io/wiki/plan9/installation_instructions/)도 함께 살펴보시기를 권장합니다.




## Bottom bar

우연히 발견한 [흥미로운 위젯](https://git.sr.ht/~ft/bar)이 하나 있는데, 몇 가지 정보를 표시해 줍니다. 특히 제가 가장 그리워하던 ‘오늘 날짜’를 보여주죠.

이 위젯은 rio를 활용한 일련의 실험 프로젝트인 ‘[riow](https://git.sr.ht/~ft/riow)’의 일부로, rio에서 키보드로 창을 관리할 수 있게 해줍니다. 하지만 저는 아직 그 기능을 사용해 보지는 않았습니다.

이미 git9를 설치했다면, bar를 클론하고 빌드할 수 있습니다:

```
cd $home/src
git clone https://git.sr.ht/~ft/bar
cd bar
mk install
```

그러면 시스템에 /bin/bar 바이너리 파일이 생성됩니다. 이제 $home/bin/rc/riostart-remote 파일을 편집하고, 파일 끝에 다음 줄을 추가하세요(뒤에 빈 줄을 남겨두는 것을 잊지 마세요!):

```
window bar
```

창 크기나 위치를 지정할 필요는 없습니다. bar가 자동으로 처리해 줄 것입니다.




## Lua

Lua 5.4는 Plan 9에서 문제없이 작동하며, Lua와 Plan 9 간의 상호 운용성을 향상시켜 주는 몇 가지 라이브러리가 있습니다.

$home/src로 이동하여 lu9 저장소를 클론하세요:

```
cd $home/src
git clone https://git.sr.ht/~kvik/lu9
```

이제 몇 가지 종속성을 가져온 다음, 빌드하고 설치해야 합니다:

```
cd $home/src/lu9
mk pull
mk install
```

lu9를 사용하려면 lu9 file.lua 명령어로 Lua 파일을 실행하거나, lu9 -i 명령어로 대화형 셸을 실행하면 됩니다.




## Scheme


[Nils M. Holm이 만든 훌륭한 Scheme 구현체](http://www.t3x.org/s9fes/)가 있는데, 이는 Plan 9에서 실행될 뿐만 아니라 Plan 9를 위해 특별히 제작된 것입니다.

또한 [저자가 쓴 책](http://www.t3x.org/s9book/index.html)을 한 번 읽어보시길 추천합니다. 이 책은 기본적으로 Scheme을 처음부터 직접 빌드하는 방법을 알려줍니다.

[GitHub](https://github.com/bakul/s9fes)에 있는 이 저장소는 모든 Plan 9 아키텍처에서 문제없이 실행될 뿐만 아니라, 시스템에 설치할 수도 있습니다.

```
cd $home/src
git clone https://github.com/bakul/s9fes
cd s9fes
mk
mk inst
```

Empty Space의 Scheme 9를 사용하려면 s9 프로그램을 실행하기만 하면 됩니다.

```
cpu% s9
Empty Space의 Scheme 9 (Reimagined)
> (+ 1 2 3)
6
> ,l draw-tree
; /usr/glenda/lib/s9fes/draw-tree.scm에서 불러옴
> (draw-tree '(a b c))
[o|o]---[o|o]---[o|/]
 |       |       |
 a       b       c
>
```



## Vim


무엇보다 먼저, Acme나 Sam을 사용하는 것이 좋습니다. 하지만 그래도 Vim을 사용하겠다고 고집하신다면, Plan 9에서 Vim 7.1을 [작동시키는 방법](https://vmsplice.net/9vim.html)이 있습니다.

다음 명령을 실행하세요:

```
cd /tmp
hget http://vmsplice.net/vim71src.tgz | gunzip -c | tar x
cd vim71/src
mk -f Make_plan9.mk install
```

설치가 완료되면 시스템에 xxd와 vim이 설치됩니다. xxd는 16진수 덤프를 생성하는 데 유용합니다.




## Netsurf


Mothra는 가장 기본적인 작업만 처리할 수 있는 브라우저이지만, HTML을 제대로 렌더링하는 브라우저를 사용하고 싶을 수도 있습니다.

Netsurf는 소스 코드에서 직접 컴파일해야 합니다. 이 과정에는 시간이 다소 걸리므로, 가능한 한 대용량 외부 저장 장치를 사용하는 것을 권장합니다.

![20261023_200354.jpg](images/20261023_200354.jpg)

그림 4: Mothra(왼쪽)와 NetSurf(오른쪽)에서 Google.com이 렌더링된 모습의 비교.

개인적으로 저는 리눅스 Drawterm 세션에서 RPi에 연결하고 있기 때문에, 앞서 설명한 바인딩을 활용하여 빌드된 모든 파일이 RPi가 아닌 리눅스에 저장되도록 했습니다. 빌드 후에는 Plan 9 시스템 자체에 설치했습니다.

먼저, Netsurf를 클론할 수 있는 폴더를 생성하세요. 제 프로젝트 폴더는 이전에 `bind -ac` 명령어를 사용하여 $home/projects에 바인딩되어 있었습니다.

```
mkdir $home/projects
bind -ac /mnt/term/home/alchemist/projects $home/projects
mkdir $home/projects/plan9
cd $home/projects/plan9
```

이제 Netsurf 포트를 빌드하기 위한 적절한 mkfile이 포함된 저장소를 클론합니다. 이를 위해서는 Git9가 필요하며, 앞서 설명한 Git 구성 섹션을 참조하십시오.

```
git/clone https://github.com/netsurf-plan9/nsport
cd nsport
git/clone https://github.com/netsurf-plan9/netsurf
```

그 후, Netsurf 빌드에 필수적인 다른 라이브러리를 가져옵니다. nsport 저장소 루트에 있는 fetch 스크립트를 사용할 수 있습니다.

모든 라이브러리 저장소를 가져오는 데는 시간이 다소 소요될 수 있습니다.

```
cd nsport
fetch clone https
```

가끔씩 새로운 패치와 개선 사항을 적용하기 위해 Netsurf 소스 코드를 업데이트하고 싶을 수 있습니다. 빌드하기 전에 이 저장소로 이동하여 다음 명령을 실행하면 됩니다:

```
fetch pull
```

이제 Netsurf를 빌드하고 시스템에 설치하기만 하면 됩니다.

말할 필요도 없이, 특히 9front의 파일 시스템 캐시와 리눅스 파일 시스템 간의 파일 전송과 관련된 병목 현상을 고려할 때 이 과정은 시간이 꽤 걸릴 수 있습니다.

```
mk
mk install
```

또한 웹 링크에 대한 기본 실행 프로그램으로 Netsurf를 사용하도록 $home/lib/plumbing 파일을 편집할 수도 있습니다. 브라우저 이름을 netsurf로 바꾸기만 하면 됩니다.

