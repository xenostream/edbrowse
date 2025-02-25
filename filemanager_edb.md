# edbrowse as a file manager
모든 컴퓨터는 디렉토리를 돌아다니거나 특정 파일로 이동하고 파일 이름을 바꾸고 파일에서 프로그램을 실행하고 파일 크기와 타임스탬프를 확인하고 파일을 삭제할 수 있는 일종의 `파일 관리자` 를 제공합니다. 
edbrowse는 파일 편집, 웹 페이지 탐색, 입력 양식 작성 등 이전에 사용하던 것과 동일한 `ed` 인터페이스를 사용해 이러한 모든 기능을 제공합니다.

즉, edbrowse는 사용자가 하나의 작동 방식만 익힌다면 다양한 작업에 반복적으로 활용할 수 있도록 처리하는 것을 목표로 합니다.

​첫 번째 단계는 `디렉터리를 편집` 하는 것입니다. 이 작업은 명령줄에서 `edbrowse dir1` 형식으로 입력하거나, edbrowse 실행 세션 내에선 `e dir1` 명령을 입력하면 됩니다. 
버퍼내의 각 줄에는 해당 디렉터리에 있는 `파일 이름` 이나 `디렉토리 이름` 이 포함되며 해당 파일을 효과적으로 나타냅니다. 이것을 `디렉터리 모드` 라고 합니다.

​디렉터리가 비어있다면 버퍼 또한 비어있는 것입니다. 만약, 디렉터리에 파일이 1,000개 있는 경우 버퍼에도 1,000줄이 있습니다. 이미 알고있는 검색 명령을 사용해 특정 파일을 찾을 수 있습니다. 
예를 들어, `/foo` 명령은 파일 이름에 "foo" 가 포함된 파일을 찾습니다. `/foo/i` 명령은 "foo" 또는 "FOO" 같이 대소문자 구별없이 파일이나 디렉토리 이름을 검색합니다. 모든 정규식을 그대로 적용할 수 있습니다.

​자신이 원하는 파일을 제대로 찾았다면 <bkd>g</kbd> 명령을 사용해 파일을 실행한다거나 편집할 수 있습니다. 이것은 브라우저 모드에서 웹 페이지의 하이퍼링크를 통해 해당 웹 페이지로 이동하는 `g` 명령과 동일합니다. 
그리고, `g` 명령과 마찬가지로 `^` 명령은 뒤로 이동합니다. 즉, 파일 보기 또는 편집 작업을 마친 후, `^` 명령을 입력하면 이전 디렉토리 목록으로 다시 되돌아갑니다. 그런 다음, 해당 디렉토리내의 또 다른 파일로 이동할 수 있습니다.

​

해당 파일이 하위 디렉터리일 경우에는 어떻게 처리되나요? 디렉토리 이름에서 g 키를 누르면 예상대로 해당 디렉터리로 이동합니다. 따라서 새로운 파일 목록이 나타납니다. 다시 원래의 디렉토리로 돌아가려면 ^ 키를 입력합니다. 이 결과 디렉토리 트리를 드릴다운 했다가 다시 올라가서 전체 디렉토리 트리를 탐색할 수 있습니다.

​

하위 디렉터리를 버리지 않고 디렉토리 트리의 상위로 이동하려면 up 명령을 사용합니다. 이것은 브라우저 모드의 기록내에서 위아래로 이동하는 것과 비슷합니다. hist 명령을 입력하면 지금까지 이동했던 디렉터리 내역을 살펴볼 수 있습니다. 현재 디렉터리 옆에는 별표 문자가 표시됩니다. 그러나 g 명령을 사용해 새로운 디렉토리로 이동한다면 이전에 방문했던 하위 디렉토리는 사라집니다. 이것은 다른 브라우저에서 방문 기록 세션을 관리하는 방식이므로 익숙한 소프트웨어와도 기능이 일치합니다.

​

숨겨진 파일은 기본적으로 표시되지 않지만 hf 명령으로 표시하도록 변경할 수 있습니다. hf 명령을 입력한 후 rf 명령을 입력해 새로고침하면 표시되는 파일과 함께 숨겨진 파일까지 함께 표시됩니다. 이런 숨김 파일은 UNIX 파일 시스템에선 . (점) 문자로 시작하거나 vfat 파생 파일 시스템에선 숨겨진 속성이 설정되어 있습니다. 

​

.   이란 파일은 현재 디렉터리인 것이고 사용자가 지금 현재 보고 있는 디렉토리이기 때문에 일부러 생략했습니다. 

.. 이란 파일로 이동하면 상위 디렉터리로 이동합니다. 만약 상위 디렉터리에서 g 명령으로 여기로 이동했다면 이 작업은 원하지 않을 것입니다. 이 경우 ^ 명령을 입력해 뒤로 이동해 이 디렉터리는 메모리에 유지하면서 위로 이동하면 됩니다. 그러나 명령줄에서 이 디렉터리로 이동한 경우 백 키가 없는 경우에는 ... 를 사용해 상위 디렉터리로 이동할 수 있습니다.

​

파일에 g 명령을 실행하면 해당 파일에 대한 플러그인이 설정되어 있을 경우 해당 플러그인이 실행됩니다. 예를 들어 파일이 .mp3 확장자로 끝나고 mp3 파일 재생용 플러그인을 설정한 경우 음악이 재생됩니다. 파일이 .pdf 파일이고 PDF 뷰어를 설정한 경우에는 뷰어가 실행되어 PDF를 보게 됩니다. 일반적으로 이런 기능을 원하지만 만약 그렇지 않을 경우엔 명시적으로 pg- 명령으로 플러그인 기능을 비활성화할 수 있습니다. 또는 일회성 전용 명령으로 g- 명령을 사용해 플러그인 작동없이 해당 파일로 이동할 수 있습니다.

​

디렉토리 목록에서 디렉터리는 슬래시 문자로 끝나는데 이것은 디렉터리임을 나타냅니다. 이 / 문자는 실제 파일 이름의 일부가 아니라 디렉터리임을 나타내는 표시 문자일 뿐입니다. 디렉토리에서 g 명령을 입력하면 모든 파일이 포함된 해당 디렉토리로 이동합니다.

​

다음과 같은 또 다른 특수 문자는 덜 일반적일 수 있지만 나타날 수 있습니다. 

​

| 문자는 명명된 파이프를, 

* 문자는 블록 특수문자, 

> 문자는 특수문자, 

^ 문자는 소켓을 나타냅니다. 

​

이것은 UNIX의 ls -1p 명령과 정확히 일치합니다. 다시 한 번 말하지만 이러한 문자는 파일 이름의 일부가 아닙니다!!  bar$/ 를 통해 bar 로 끝나는 디렉토리를 검색할 수 있으며 예를 들어 foobar 가 디렉터리고 끝 부분에 / 문자가 표시되더라도 foobar 와 일치합니다. 실제 파일 이름만 검색 및 대체 작업의 처리 대상입니다.

​

ls 명령을 사용하면 파일 속성을 한 눈에 살펴볼 수 있습니다. ls 명령은 목록의 크기와 시간을 의미하는 lsst 명령에 대한 줄임말입니다. 대략적인 크기와 타임스탬프가 출력됩니다. 이때 사용되는 크기는 킬로바이트, 메가바이트, 기가바이트, 테라바이트의 단위인 K, M, G 또는 T 로 2자리 정밀도를 갖습니다.

​

정확한 길이는 lsl 명령을 사용해서 확인합니다. lsk 명령은 하드링크의 수이며 lsi 명령은 inode 번호입니다. lsp 명령은 소유자 및 그룹과 함께 사용 권한을 출력합니다. lsy 명령은 심볼릭 링크를 따릅니다. 심볼릭 링크가 아닌 경우 edbrowse가 출력합니다.

​

또한 이러한 속성 제어 문자는 원하는대로 조합해 사용할 수 있습니다. (예: 크기 - s, 권한 - p 및 시간 - t 을 출력하려면 lsspt) 여기서의 시간은 수정 시간을 의미하며 액세스 시간이나 생성 시간을 볼 수 있는 방법은 없습니다.

​

lsx 명령은 디렉터리 모드에서만 사용하는 특수 자동 명령어입니다. 디렉터리와 파일에 대해 다른 작업을 수행할 수 있는 스크립트에서 주로 사용합니다.

​

ls= 명령을 사용하면 파일 이름과 함께 속성이 자동으로 표시될 수 있습니다. ls=s 명령은 파일 이름과 같은 줄에 각 파일의 크기를 표시하고 ls=t 명령은 시간을 함께 출력하는 등의 작업을 수행합니다.

​

다시 한 번 말하지만 이러한 속성은 파일 이름의 일부가 아니며 검색 및 대체 명령에 영향을 전혀 미치지 않습니다.

​

ls= 지시어 뒤에는 반드시 rf 명령을 입력해 새로고침 이후에 현재 버퍼에 있는 파일에 대한 속성을 확인할 수 있습니다.

​

만약 디렉터리에 수천 개의 파일이 포함된 경우라면 출력의 순서가 중요합니다. edbrowse는 시스템의 로케일 설정에 따라 알파벳 순서로 파일을 표시합니다. 이것은 /bin/ls 유틸리티와 동일한 출력 순서이며 환경 변수 $LC_COLLATE 에 의해 결정됩니다. 전통적인 아스키 출력 순서로 사용하려면 LC_COLLATE=C 로 설정합니다.

​

참고: 라즈베리 파이(라즈비안)에는 LC_ALL 이 LC_COLLATE 환경 변수보다 우선하는 버그가 있는 것 같습니다. 원래라면 그렇게 처리되지 않아야 하지만 실제로는 그렇습니다. 따라서 LC_ALL 을 해제하고 취향에 따라 다른 LC_ 변수를 개별적으로 설정합니다. 또한 현재 사용 중인 국가의 언어로 Linux와 상호 작용할 수 있도록 LC_MESSAGES 환경 변수가 설정되어 있는지 확인하시기 바랍니다.

​

목록에 대한 정렬 순서는 각각 알파벳순, 크기순, 시간순으로 오름차순으로 정렬하려면 sort+a, sort+s, sort+t 내림차순으로 정렬하려면 sort-a, sort-s, sort-t 로 처리합니다. sort-t 명령으로 최신 파일이 맨 위에 표시되도록 처리하는 것은 유용할 수 있습니다. 현재 버퍼에 있는 파일에 정렬 순서를 적용하려면 rf 명령을 입력해야 한다는 것을 항상 잊지마시길 바랍니다.

​

일부 ed 명령은 디렉터리 모드에서 동일하게 작동하거나 아닐 수도 있습니다. 예를 들어 디렉토리 모드에서 m 명령은 작동하지 않으므로 버퍼의 다른 위치로 줄을 이동할 수 없습니다. 줄은 사용자가 지정한 순서대로 정렬되어 출력될 뿐이며 이동할 수 없습니다. 또한 t 명령을 사용해 줄을 복사할 수도 없습니다. 파일을 복사한다 하더라도 복사할 파일 이름은 달라야만 하므로 같은 줄의 복사본이 두 개가 되지 않습니다. 그러나 d 명령은 정상적으로 작동합니다. 줄과 실제 파일을 삭제합니다. 하지만 edbrowse 능력 밖의 처리 효과이기 때문에 실행 취소 명령은 사용할 수 없으므로 주의하시기 바랍니다.

​

d 명령은 전체 디렉터리까지 지울 수 있는 매우 강력하고 위험한 무기입니다. 하지만 대체 방법이 있습니다. Edbrowse는 디렉터리를 읽기 전용(dr), 쓰기 가능(dw) 또는 쓰기/삭제(dx) 로 취급할 수 있습니다. 키보드나 초기화 함수에서 dx 명령을 입력한 경우 삭제 명령은 실제 삭제 작업을 의미합니다. dw 명령은 좀 더 안전한 삭제 방법으로 삭제된 파일은 $HOME/.Trash 의 휴지통 디렉토리로 이동합니다. 다른 많은 운영체제가 이와 같은 기능을 이미 구현하고 있습니다. 따라서 실수로 삭제한 파일을 복구할 수 있습니다. 하지만 이렇게 삭제해도 실제 디스크의 공간이 확보되지 않는다는 단점이 있습니다. 실제 디스크에 공간을 확보하려면 파일을 하드 삭제하거나 dx 모드에서 삭제한 다음 휴지통 디렉토리를 비워야만 합니다.

​

이러한 작업은 매우 중요한 작업이므로 edbrowse는 0 이상의 모든 디버그 수준에서 해당 작업의 결과를 항상 출력합니다.  예를 들어 C언어의 목적 파일을 제거한다고 가정해 보겠습니다.

​

    foo.o ↓

    bar.o ↓

    bas.o ↓

​

아래쪽 화살표 아이콘은 파일이 사라졌음을 나타냅니다. 이 아이콘은 실제로 삭제하는 dx 모드에서 볼 수 있습니다.

​

dw 모드에서는 파일이 휴지통 디렉토리로 이동되며 오른쪽 화살표가 파일을 휴지통으로 밀어 넣는 형태로 표시됩니다.

​

    foo.o → 🗑

    bar.o → 🗑

    bas.o → 🗑

​

만약 해당 파일이 디렉터리일 경우 edbrowse는 전체 디렉터리 트리를 삭제(dx)하거나 휴지통으로 이동(dw)합니다. 만약 휴지통 디렉토리가 다른 파일 시스템에 있을 경우 edbrowse는 먼저 복사한 다음 삭제해서 이동 작업을 구현합니다. 이 경우 출력은 일반 파일과 동일하게 보입니다. 특수 파일은 단순히 삭제되므로 별도로 휴지통으로 옮길 필요가 없습니다.

​

이동과 복사 명령인 m 과 t 명령은 의미가 있긴하지만 여러분이 예상하는 것과는 다르게 작동합니다. 이 명령은 파일을 다른 디렉터리로 이동하거나 복사합니다. 

​

명령줄에서 edbrowse dir1 dir2 를 입력하면 두 개의 디렉터리를 사용할 수 있습니다. 첫 번째 디렉터리에서 foobar 를 찾은 후 .m2  명령을 입력합니다.

그러면 foobar 는 두 번째 디렉토리로 이동합니다. 이 경우 다음과 같이 출력됩니다.

​

    foobar → dir2

​

모든 오브젝트 파일을 g/\.o$/ .m2 명령으로 dir2 로 옮길 수 있습니다. 이것을 염두에 두고 t 명령은 예상대로 작동합니다. 파일은 동일한 파일명을 사용하여 복사됩니다. 다음과 같이 출력됩니다.

​

    foobar ≡ dir2

​

등가 (≡) 아이콘은 화살표가 의미하는 이동 작업이 아니라 복사 표시기로 출력합니다. 파일을 이동하든 복사하든 edbrowse는 세션 2의 버퍼에 줄 바꿈 표시줄을 추가하지만 특정 위치가 아니라 끝 부분에 있습니다. 정렬 순서에 따라 목록에서 foobar 가 있어야 할 위치에 표시되도록 하려면 rf 명령을 입력해야 합니다.

​

기록내에서 파일을 위나 아래로 이동하거나 복사할 수 있습니다. 다시 hist 명령을 입력해 스택내의 디렉터리의 위치를 확인합니다. 파일을 스택내에서 2단계 위로 이동하려면 .m+2 명령을 입력하고 파일을 3단계 아래로 복사하려면 .t-3 명령을 입력합니다.

​

s 명령은 평소와 같이 대체 작업을 수행하여 파일 이름을 바꿉니다. s/.*/snork/ 명령은 파일 이름이 무엇이든 간에 모두 snork 로 바꿉니다. 이 대체 명령은 디렉터리 모드에서 u(실행 취소) 명령을 사용할 수 있는 유일한 경우입니다.

​

g// 아래가 아닌 한 줄을 대체하면 u 명령은 해당 줄을 이전으로 되돌립니다. 이전의 텍스트를 부활시키고 파일 이름을 원래대로 바꿉니다.

​

파일을 관리할 때 대문자와 소문자를 혼동하고 싶지 않다면 lc 명령을 입력해 모든 파일 이름을 소문자로 만들 수 있습니다. 이것은 매우 강력한 도구입니다. 하지만 특정 운영 체제에선 주의할 점이 있습니다. edbrowse에서는 파일 이름을 이미 존재하는 다른 파일로 바꿀 수 없습니다. bar 파일이 이미 있는 경우 s/foo/bar/ 명령은 실패합니다. 또한 vfat 파일 시스템과 그 하위 파일 시스템은 대소문자를 구분하지 않습니다. 따라서 소문자로 변환할 때 foo 는 FOO 라는 파일에 액세스하고 디렉토리 목록에 FOO 로 표시됩니다. 따라서 s/foo/FOO/ 는 이미 존재하는 파일의 이름을 바꾸는 것처럼 보이므로 오류가 발생합니다. 이에 대한 좋은 해결 방법은 없지만 대소문자를 구분하지 않는 파일 시스템에서는 edbrowse를 거의 사용하지 않으므로 사실 크게 걱정할 필요는 없습니다.

​

s 명령은 파일 이름을 바꿀 때 특별한 메시지를 별도로 출력하지 않습니다. 따라서 세 번째 슬래시 문자는 생략할 수 있으며 그럴 경우 edbrowse는 ed 명령과 동일하게 새로운 파일 이름을 기본적으로 출력합니다. 일반적으로 업데이트된 파일 이름을 직접 확인하려면 ed와 마찬가지로 수정자 p 명령으로 출력하면 됩니다.

​

,s/xyz/abc/p

​

셸 유틸리티에 파일 이름을 전달하는 데 도움이 되는 몇 가지 환경 변수가 있습니다. 환경 변수 EB_DOT 는 현재 주소의 파일 이름을 보유합니다. 파일 이름에 공백이나 셸에서 중요한 메타 문자가 포함되어 있다면 반드시 따옴표로 묶어 인용 처리해야 합니다. 다음과 같이 현재 주소의 파일에 대한 맞춤법을 검사할 수 있습니다.

​

!spellcheck "$EB_DOT"

​

EB_PLUS 환경 변수는 현재 주소 다음 줄의 내용을 보유하고 EB_MINUS 는 이전 줄의 내용을 보유합니다.

​

또 다른 환경 변수는 파일 이름(이 경우 현재 디렉터리)을 저장하고 있는 EB_FILE 입니다.

​

edbrowse가 여러 디렉터리를 통해 아래로 내려갔을 수도 있지만 셸 명령은 여전히 시작 당시 edbrowse의 위치에서 실행됩니다. 따라서 다음과 같은 명령이 필요할 수 있습니다.

​

!spellcheck "$EB_FILE/$EB_DOT"

​

디렉터리 스캔과 cd 명령을 혼용해서 사용하는 것은 위험할 수 있습니다. 명령줄에서 edbrowse dir1 을 입력한 다음 homework.txt 파일로 이동합니다. 이제 현재 파일은 dir1/homework.txt 입니다. 하지만 cd dir1 을 입력해 dir1 디렉토리로 옮기는 방법이 더 좋다고 생각할 수 있겠지만 그렇게 처리하면 문제가 더 복잡해 집니다. 파일을 저장하려고 w 명령를 사용한다면 edbrowse는 dir1/homework.txt 파일에 씁니다. 그러나 이미 dir1 디렉토리에 있는 상태에서 dir1/dir1/homework.txt 파일에 쓸 수 있는 별도의 방법은 없으므로 명령은 실패합니다. 이때 오류 메시지를 확인하지 않고 edbrowse를 종료했다면 모든 작업은 손실됩니다. 모든 파일 이름은 ``edbrowse 시작 지점을 기준'' 으로 정확히 처리되도록 edbrowse는 그대로 두고 사용하는 것이 가장 좋습니다. 셸 유틸리티에 파일 이름을 전달할 경우 EB_FILE 과 EB_DOT 환경 변수를 함께 사용하시기 바랍니다.

​

디렉토리 모드에서 w dir1listing 명령은 표시된 모든 속성을 포함하고 예상대로 버퍼를 dir1listing 파일에 씁니다. w5 명령은 목록을 세션 5에 텍스트 형식으로 씁니다. 그후 e5 명령을 사용해 세션 5로 편집 전환하고 디렉토리 목록을 일반 텍스트 파일로 작업할 수 있습니다. 이 경우 포함된 목록의 줄은 더 이상 컴퓨터의 실제 파일에 연결되어 있지 않습니다. 따라서 파일 관리에 대한 걱정없이 줄을 삭제한다거나 이동할 수 있습니다.

​

목록에서 디렉터리는 g/\/$/ p 명령으로 찾을 수 있습니다. et 명령은 디렉터리 모드에선 작동하지 않으므로 목록을 순수한 텍스트로 만들려면 또 다른 세션에 저장해야 합니다.

​

일반적인 방법으로 목록의 일부를 파일이나 또 다른 edbrowse 세션에 쓸 수 있습니다.

​

    27,$w dir1listing

    g/c$/ .w5@$

​

빈 버퍼에서 r dir1 명령은 dir1 디렉토리를 읽고 디렉터리 모드로 전환합니다. 만약 버퍼에 단 1바이트라도 이미 있을 경우 r dir1 명령은 속성과 함께 목록을 읽긴하지만 원래의 버퍼가 텍스트 버퍼였기 때문에 텍스트로 유지합니다.

​

​

​

​

## Function to move to the parent directory

g` 명령을 사용하여 상위 디렉터리에서 현재 파일 또는 디렉터리를 열었다면 `^` 명령이나 `up` 명령을 사용하여 상위 디렉터리로 돌아가는 것이 가장 좋은 방법입니다. 또 다른 방법으로 현재 파일 또는 디렉토리에 도달한 경우 `e $EB_DIR` 명령을 사용하여 상위 디렉터리로 이동할 수 있습니다. 이 방법을 사용하여 상위 디렉터리로 이동하려면 다음 함수를 사용할 수 있습니다.

​

    # Move to the parent directory.

    # usage: <up

    function+up {

    db0

    H-

    ebvar+

    ![ "$EB_BASE" = / ]

    if(*) {

    ebvar-

    !echo already in root directory

    } else {

    ebvar-

    ![ "$EB_BASE" = "$EB_DIR" ] && [ "$EB_BASE" != . ]

    if(*) {

    !echo already at top

    } else {

    sw+

    e/temporary buffer for function up to use

    if(*) {

    eret

    !echo temporary buffer already exists

    } else {

    ![ "$EB_BASE" = . ]

    if(*) {

    ![ "${EB_DOT#.}" != '. ]

    if(*) {

    # The last component of the file name begins with a period so show hidden files.

    hf+

    }

    e $PWD

    enew

    f temporary buffer for function up to use

    r !echo '.

    ,s/\./\\./gf

    if(?) {

    }

    ,s/.*/\/^&$\/fX/f

    bw

    M0

    <*/temporary buffer for function up to use

    q/temporary buffer for function up to use

    ebvar+

    !true

    ebvar-

    }

    !temp=$(basename "$EB_BASE"); [ "$temp" != "${temp#.}" ]

    if(*) {

    # The last component of the file name begins with a period so show hidden files.

    hf+

    }

    e $EB_DIR

    lsX

    if(*) {

    enew

    f temporary buffer for function up to use

    r !basename "$EB_BASE"

    ,s/\./\\./gf

    if(?) {

    }

    ,s/.*/\/^&$\/f/f

    bw

    M0

    <*/temporary buffer for function up to use

    q/temporary buffer for function up to use

    } else {

    ![ "$EB_BASE" != '_ ]

    if(*) {

    b

    }

    }

    }

    }

    }

    }

​

## Function to add a file to the current directory

디렉토리를 편집하는 경우 이 기능을 사용하여 현재 디렉토리에 파일을 추가할 수 있습니다.

파일을 편집 중인 경우 이 기능을 사용하여 파일이 포함된 디렉터리에 파일을 추가할 수 있습니다.

​

    # Add a file to the current directory or to the directory containing the current file.

    # usage: <af <file>

    function+af {

    db0

    H-

    ebvar-

    ![ -z "~0" ]

    if(*) {

    !echo specify a file

    } else {

    sw+

    e/temporary buffer for function af to use

    if(*) {

    eret

    !echo temporary buffer already exists

    } else {

    ebvar+

    lsX

    if(*) {

    !if ! [ -e '_"/~0" ]; then  mkdir -p "$(dirname '_"/~0")" && touch '_"/~0"; fi

    } else {

    enew

    ^

    !if ! [ -e "$EB_DIR/~0" ]; then  mkdir -p "$(dirname "$EB_DIR/~0")" && touch "$EB_DIR/~0"; fi

    }

    ebvar-

    enew

    f temporary buffer for function af to use

    r !echo "~0"

    s/\//\n/gf

    if(?) {

    }

    g/^\.?$/fd

    if(?) {

    }

    g/^\./fX

    if(*) {

    hf+

    }

    ,s/\./\\./gf

    if(?) {

    }

    ,s/.*/\/^&$\/fg/f

    s/g$//f

    bw

    M0

    lsX

    if(*) {

    rf

    } else {

    e $EB_DIR

    }

    <*/temporary buffer for function af to use

    q/temporary buffer for function af to use

    }

    }

    }

​

## Function to add a directory to the current directory

디렉토리를 편집하는 경우 이 기능을 사용하여 현재 디렉토리에 디렉토리를 추가할 수 있습니다. 파일을 편집하는 경우 이 기능을 사용하여 파일이 포함된 디렉터리에 디렉터리를 추가할 수 있습니다.

​

    # Add a directory to the current directory.

    # usage: <mkdir <directory>

    function+mkdir {

    db0

    H-

    ebvar-

    ![ -z "~0" ]

    if(*) {

    !echo specify a directory

    } else {

    sw+

    e/temporary buffer for function mkdir to use

    if(*) {

    eret

    !echo temporary buffer already exists

    } else {

    ebvar+

    lsX

    if(*) {

    !mkdir -p '_"/~0"

    } else {

    enew

    ^

    !mkdir -p "$EB_DIR/~0"

    }

    ebvar-

    enew

    f temporary buffer for function mkdir to use

    r !echo "~0"

    s/\//\n/gf

    if(?) {

    }

    g/^\.?$/fd

    if(?) {

    }

    g/^\./fX

    if(*) {

    hf+

    }

    ,s/\./\\./gf

    if(?) {

    }

    ,s/.*/\/^&$\/fg/f

    s/g$//f

    bw

    M0

    lsX

    if(*) {

    rf

    } else {

    e $EB_DIR

    }

    <*/temporary buffer for function mkdir to use

    q/temporary buffer for function mkdir to use

    }

    }

    }

​

## Function to copy the current file or directory

이 함수는 현재 파일 또는 디렉터리에 상대적인 참조를 가진 파일 또는 디렉터리를 복사합니다.

​

    # Copy the current file or directory.

    # usage: <cp <file or directory>

    function+cp {

    db0

    H-

    ebvar-

    ![ -z "~0" ]

    if(*) {

    !echo specify a file or directory

    } else {

    lsX

    if(*) {

    sw+

    e/temporary buffer for function cp to use

    if(*) {

    eret

    !echo temporary buffer already exists

    } else {

    ebvar+

    !mkdir -p "$(dirname '_"/~0")" && cp -r '_/'. '_"/~0"

    if(*) {

    ebvar-

    enew

    f temporary buffer for function cp to use

    r !echo '.

    g/^\./fX

    if(*) {

    hf+

    }

    s/\./\\./gf

    if(?) {

    }

    s/.*/\/^&$\/fX/f

    bw

    M0

    rf

    <*/temporary buffer for function cp to use

    q/temporary buffer for function cp to use

    }

    }

    } else {

    ebvar+

    !mkdir -p "$(dirname "$EB_DIR/~0")" && cp '_ "$EB_DIR/~0"

    if(*) {

    }

    }

    }

    }

​

## Function to edit a file or directory

이 함수는 현재 파일 또는 디렉터리에 상대적인 파일 참조를 사용하여 파일 또는 디렉터리를 엽니다.

​

    # Edit a file or directory.

    # usage: <e [<file or directory>]

    function+e {

    db0

    H-

    ebvar-

    ![ -z "~0" ]

    if(*) {

    lsX

    if(*) {

    g

    }

    } else {

    sw+

    e/temporary buffer for function e to use

    if(*) {

    eret

    !echo temporary buffer already exists

    } else {

    ebvar+

    lsX

    if(*) {

    !if ! [ -e '_"/~0" ]; then  mkdir -p "$(dirname '_"/~0")" && touch '_"/~0"; fi

    } else {

    enew

    ^

    !if ! [ -e "$EB_DIR/~0" ]; then  mkdir -p "$(dirname "$EB_DIR/~0")" && touch "$EB_DIR/~0"; fi

    }

    ebvar-

    enew

    f temporary buffer for function e to use

    r !echo "~0"

    s/\//\n/gf

    if(?) {

    }

    g/^\.?$/fd

    if(?) {

    }

    g/^\./fX

    if(*) {

    hf+

    }

    ,s/\./\\./gf

    if(?) {

    }

    ,s/.*/\/^&$\/fg/f

    bw

    M0

    lsX

    if(*) {

    rf

    } else {

    e $EB_DIR

    }

    <*/temporary buffer for function e to use

    q/temporary buffer for function e to use

    }

    }

    }

​

## Function to move a file or directory

이 함수는 현재 파일 또는 디렉터리에 상대적인 참조를 가진 파일 또는 디렉터리를 이동합니다. 파일을 편집 중인 경우 이 함수는 새 이름으로 파일을 엽니다.

​

    # Move a file or directory.

    # usage: <m <file or directory>

    function+m {

    db0

    H-

    ebvar-

    ![ -z "~0" ]

    if(*) {

    !echo specify a file or directory

    } else {

    sw+

    e/temporary buffer for function m to use

    if(*) {

    eret

    !echo temporary buffer already exists

    } else {

    ebvar+

    lsX

    if(*) {

    !mkdir -p "$(dirname '_"/~0")" && mv '_/'. '_"/~0"

    if(*) {

    ebvar-

    ![ $EB_LN != $EB_LINES ]

    if(*) {

    enew

    f temporary buffer for function m to use

    r !echo '+

    g/^\./fX

    if(*) {

    hf+

    }

    s/\./\\./gf

    if(?) {

    }

    s/.*/\/^&$\/fX/f

    bw

    M0

    rf

    <*/temporary buffer for function m to use

    q/temporary buffer for function m to use

    } else {

    rf

    }

    }

    } else {

    enew

    ^

    !mkdir -p "$(dirname "$EB_DIR/~0")" && mv '_ "$EB_DIR/~0"

    if(*) {

    ebvar-

    enew

    f temporary buffer for function m to use

    r !if [ -d "$EB_DIR/~0" ]; then echo "~0/"$(basename '_); else echo "~0"; fi

    s/\//\n/gf

    if(?) {

    }

    g/^\.?$/fd

    if(?) {

    }

    g/^\./fX

    if(*) {

    hf+

    }

    ,s/\./\\./gf

    if(?) {

    }

    ,s/.*/\/^&$\/fg/f

    bw

    M0

    e $EB_DIR

    <*/temporary buffer for function m to use

    q/temporary buffer for function m to use

    }

    }

    }

    }

    }

​

## Functions to change the file name

f` 및 `fs` 함수는 파일 이름을 변경합니다. 디렉터리에서 이 함수는 저장된 파일의 이름을 바꿉니다.

파일에서 이 함수는 저장된 파일을 변경하지 않고 파일 이름을 변경합니다.

​

f` 함수는 파일 이름의 마지막 구성 요소를 사용자가 지정한 문자열로 변경합니다.

f` 함수는 대체 문자열을 사용하여 파일 이름을 변경합니다.

​

파일 이름이 `toys`인 경우 `<fs /y/ol/` 명령은 파일 이름을 `tools`로 변경합니다.

파일 이름이 `2023-03-23`인 경우 `<fs /3/4/g` 명령은 파일 이름을 `2024-04-24`로 변경합니다.

​

    # Change the file name.

    # usage: <f <file>

    function+f {

    db0

    H-

    ebvar-

    ![ -z "~0" ]

    if(*) {

    !echo specify a file

    } else {

    lsX

    if(*) {

    s/.*/~0/f

    } else {

    ebvar+

    !true

    f $EB_DIR/~0

    }

    }

    }

​

    # Change the file name using substitution.

    # usage: <fs <substitution>

    function+fs {

    db0

    lsX

    if(*) {

    s~0

    } else {

    H-

    sw+

    e/temporary buffer for function fs to use

    if(*) {

    eret

    ebvar-

    !echo temporary buffer already exists

    } else {

    ebvar+

    !true

    ebvar-

    bw

    enew

    f temporary buffer for function fs to use

    r !echo '_

    s~0

    if(*) {

    -X

    if(*) {

    ,.d

    }

    s/^/f /f

    bw

    M0

    <*/temporary buffer for function fs to use

    } else {

    h

    bw

    M0

    }

    q/temporary buffer for function fs to use

    }

    }

    }

​

## Function to find files that contain lines that match a pattern

이 함수를 사용하면 현재 디렉토리(및 하위 디렉토리)에서 패턴과 일치하는 줄이 포함된 파일 목록을 가져올 수 있습니다.

g` 명령을 사용하여 목록에 있는 파일 중 하나를 열 수 있습니다.

함수를 편집하여 다른 옵션과 함께 `grep`를 호출할 수 있습니다.

​

    # Find files that contain lines that match a pattern.

    # usage: <grep <search pattern>

    function+grep {

    db0

    H-

    ebvar+

    lsX

    if(?) {

    !true

    e $EB_DIR

    }

    !true

    ebvar-

    enew

    r !grep -lr '~0' '_

    if(*) {

    bw

    1

    f grep -lr '~0' $EB_FILE

    } else {

    !echo no results

    ^

    }

    }

​

## Function to find files 

이 함수를 사용하면 현재 디렉토리(및 하위 디렉토리)에 있는 파일 목록을 가져올 수 있습니다.

g` 명령을 사용하여 목록에 있는 파일 중 하나를 열 수 있습니다.

함수 인수를 사용하여 다른 옵션과 함께 `find`를 호출할 수 있습니다.

예를 들어 `<find -type f -name '*draft*'`는 파일 이름에 "draft"라는 문자열이 포함된 일반 파일만 나열합니다.

​

    # Find files.

    # usage: <find [options]

    function+find {

    db0

    H-

    ebvar+

    lsX

    if(?) {

    !true

    e $EB_DIR

    }

    !true

    ebvar-

    enew

    r !find '_ ~0

    if(*) {

    }

    bw

    1

    if(*) {

    f find $EB_FILE ~0

    } else {

    !echo no results

    ^

    }

    }

​

## Function to change the file mode of the current file

이 기능을 사용하여 현재 파일의 파일 모드를 변경할 수 있습니다.

​

    # Change the file mode of the current file.

    # usage: <chmod <options>

    function+chmod {

    db0

    H-

    ebvar-

    ![ -z "~0" ]

    if(*) {

    !echo specify a file mode operation

    } else {

    ebvar+

    lsX

    if(*) {

    !chmod ~0 '_/'.

    } else {

    !chmod ~0 '_

    }

    }

    }
