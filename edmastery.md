# Chapter 0: Introduction 
여기서 분명히 말하겠습니다: ed(1)은 표준 유닉스 텍스트 편집기입니다.유닉스의 공동 창시자 데니스 리치(Dennis Ritchie)가 그렇게 선언했습니다. 유리 텔레타이프 없이도 완전한 운영체제를 작성할 수 있는 사람과 누가 논쟁을 벌이겠습니까? [^1]

[^1]: 글쎄, 유리 텔레타이프 말이야. 애들이 계속 “모니터”라고 부르는 그 장난감 말이지. 우리 모두 모니터가 오디오 제작에 쓰이는 레퍼런스 스피커라는 걸 알면서도 말이야.

많은 젊은 시스템 관리자들은 순진하게도 깃발을 휘날리며 ex, vi, 심지어 터무니없이 부풀려진 nvi 같은 과대포장되고, 과도하게 복잡하며, 지나치게 설계된 텍스트 편집기를 옹호합니다. 일부는 vim이나 Emacs처럼 일반 사용자를 위한 난해한 편집기에 매달릴 정도로 길을 잃기도 한다. 이는 형편없는 시스템 관리 능력뿐 아니라 도덕적 근성의 부재를 의미한다. 시스템 관리자로서 당신은 입력한 내용을 기억하고, 머릿속에 자신의 맥락을 유지하며, 기계와 깊고 개인적인 수준에서 진정으로 소통할 수 있는 충분한 두뇌 능력을 갖춰야 한다.

대부분의 유닉스 호스트는 데이터베이스 지원이나 웹 페이지 제공 같은 실제 업무를 수행하기 위해 존재한다. 시스템의 메모리, 프로세서, 디스크 I/O를 사양할 때, 당신은 바로 그 작업들을 실행하는 데 필요한 하드웨어 양을 고려했다. 그 이상으로 할당된 시스템 자원은 비정상적인 피크 부하를 지원하기 위한 것이지, 한심하게 과잉 설계된 텍스트 편집기를 위한 것이 아닙니다.

화려한 편집기를 실행하기 위해 추가 킬로바이트—혹은 더 나쁘게는 메가바이트—를 빨아들인다면, 당신은 호스트로부터 훔치는 것입니다.  vim 같은 것에 의존하는 시스템 관리자들? 그들은 적극적으로 시스템을 해칩니다.  믿지 마십시오.

일반 사용자에게 ed를 못 쓴다고 부끄러워할 필요 없어요. 저는 네이비 씰이 될 자격이 없어요. 해변에 누워 짖는 물개가 될 자격조차 없죠. 괜찮아요. 세상은 컴퓨터로 가득하니까요. 순수한 영광인 ed를 감당할 수 없다면 친근한 클릭식 시스템을 쓰세요. 그것들은 바로 당신 같은 사람을 위해 존재합니다. 다만 키보드가 없는 태블릿 컴퓨터를 추천합니다.  화려하고 다채로운 아이콘들이 교육받지 못한 이들에게 매우 유용하거든요.

ed(1) 사용이 시스템 관리의 정점이라는 뜻이 아니다.  그것은 최소한의 요구사항이다. 이 컴퓨터를 관리하려면 이 정도 역량은 갖춰야 한다. 이 책을 읽고 있다면, 엘리트에 합류하고 싶기 때문일 것이다. 정보 기술계의 네이비 씰에 이름을 올리고 싶을 것이다. 진짜 시스템 관리자가 되고 싶은 거지, “모니터” 같은 화려한 장난감이 필요한 허세꾼이 되고 싶은 게 아니잖아. 물론 나도 모니터는 갖고 있지만, 그건 이 약골 같은 현대식 노트북에 내장형 라인 프린터가 안 달려서일 뿐이야. 진짜 시스템 관리자는 일만 할 수 있는 게 아니라, 오직 자신의 지혜와 라인 프린터만으로 진정으로 번창한다. 우리와 함께할 자격이 있음을 증명하는 누구든 환영한다.

이 책은 표준 ed를 다룹니다. 많은 운영체제 개발자들은 ed에 추가 기능을 넣고 싶은 충동을 참지 못합니다. 결국 ex와 vi의 비극이 그렇게 일어난 것이죠. 이러한 개발자들의 ed처럼 중대한 프로젝트에 참여하려는 욕구는 충분히 이해할 수 있지만, ed는 기능이 완성된 상태입니다. 이 책은 Linux의 x 및 y 명령어나 FreeBSD의 암호화 지원 같은 OS별 확장 기능은 다루지 않을 것입니다. [^2]

[^2]: ed에 왜 암호화를 추가하나요? 그건 crypt(1)이 하는 일입니다.

하지만 경고합니다: 일부 시스템 관리자들은 이 책에 반대합니다. 그들은 최고의 시스템 관리자는 운영체제 소스 코드를 연구하거나, 최악의 경우 매뉴얼 페이지를 읽으며 배운다고 진심으로 믿습니다. 하지만 그들 중 다수는 자신의 젊은 시절을 잊고 있습니다. 혼자서는 컴퓨팅을 배울 수 없습니다. 가장 현명한 유닉스 관리자조차도 멘토가 있었습니다.  검색 엔진 알고리즘이 허술하게 짜여진 HOWTO 문서를 끌어올려 권위 있는 문서인 양 내세우는 이 암울한 시대에, 차세대 시스템 관리자를 양성하는 것은 우리 직업이 직면한 가장 중요한 과제 중 하나입니다. 저는 제 퇴직금을 보관하는 서버가 ex(1)의 위엄에 맞서 애쓰는 소위 시스템 관리자에게 맡겨지길 원치 않습니다. 이 책을 곁에 두고 ed(1) 소스를 연구하라.  존경받는 브라이언 커니건과 데니스 리치의 1978년판 『C 프로그래밍 언어』 같은 훌륭한 C 참고서와 함께 말이다.  그들이 라인 프린터로 출력하는 완전한 운영체제를 쓸 수 있었다면, 너는 네 작은 작업들을 처리할 수 있을 것이다.

자신의 한계를 뛰어넘어 제대로 된 시스템 관리자가 되려는 시도를 비웃는 자는 바보일 뿐이다. 안타깝게도 사회적 편견 때문에 이 책을 소중히 간직한 비밀로 간직하는 당신을 탓할 수는 없다. 필요하다면 가장 가까운 고퍼 사이트에서 갈색 종이 봉투로 보호용 책 커버를 만드는 방법을 찾을 수 있다.

진짜 시스템 관리자는 컴퓨터가 어떻게 작동하는지 이해한다. 우리는 오랫동안 추구해 온 “보이는 그대로 출력된다”(WYSIWYG) 편집기가 마케팅 부서의 해로운 거짓말에 불과하다는 걸 안다. .txt로 끝나는 파일이 반드시 텍스트 파일은 아니라는 걸 뼈속 깊이 알고 있다— 사실 텍스트 파일은 어떤 이름이라도 가질 수 있다. 이러한 속임수를 초월하는 것이 진정한 시스템 관리자의 경지에 이르는 필수 단계다.  표준 유닉스 편집기는 텍스트 조작 엔진 그 이상을 가장하지 않는다.  그리고 그 엔진은 얼마나 위대한가.





# Chapter 1: Ed Essentials 



## Starting E



## Commands and Modes 



## Switching Modes 



## Saving and Exiting 






# Chapter 10: Addresses 



## Setting Your Address 



## Finding Your Address 



## Address Range



## Relative Addresses 



## Scrolling 



## Displaying Addresses 



## Viewing Trailing Space 



## Bookmarks 






# Chapter 11: Text Editing 



## Changing Lines 



## Inserting Amidst the File 



## Moving Text 



## Deleting Lines 



## Undo 



## Inserting Text from Files 



## Joining Lines 



## Copying Lines 



## Appending Lines to Another File 






# Chapter 100: File Management and Shell Escapes 



## The Empty Buffer 



## The Default Filename 



## Switching Files 



## Saving Part of the Buffer 



## Shell Escapes 



## Send to a Program 



## Starting with an Escape 






# Chapter 101: Regular Expressions and Searches 



## Regular Expression Format 



## Searching in Ed 



## Running Commands on Searches 



## Interactive Searching 



## Inverted Matches 



## Character Classes 



## Anchors 



## Inverted Classes 



## Multiple Matches and Wildcards 



## Commands and Searches 






# Chapter 110: Substitution 



## Combining Searches and Substitution 



## Subexpressions and Backreferences 



## Multiple Substitutions 



## Underlining via Substitution 



## Partial Underlining 



## Shortcuts and Alternates 






# Chapter 111: Scripting 



## The Ed Command File 



## Ed in Shell Scripts 



## Afterword 



## Sponsors 



## Print Sponsors 



## Patrons 



## Appendix A: Jabberwocky 



