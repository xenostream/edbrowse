# Ch16. Tags
텍스트 편집에 유용한 기능 중 하나는 어떤 정의로도 빠르게 이동할 수 있는 것입니다. 이 장은 Vim 태그를 사용해서 이를 수행하는 방법을 배웁니다.


## Tag Overview
누군가 당신에게 다음과 같은 새로운 코드베이스를 건넸다고 가정합니다:

```
one = One.new
one.donut
```

`One`? `donut`? 글쎄요, 이 코드를 작성했던 개발자들은 당연했을지 모르지만, 이제 그 개발자들은 더 이상 여기 없으며 이런 난해한 코드를 이해하는 것은 당신의 몫입니다. 이를 이해하는 한 가지 방법은 `One` 과 `donut` 이 정의된 소스 코드를 따라가는 것입니다.

`fzf` 나 `grep` (또는 `vimgrep`)으로 검색할 수 있지만, 이 경우는 태그가 좀 더 빠릅니다.

태그를 주소록처럼 생각합니다:

```
Name    Address
Iggy1   1234 Cool St, 11111
Iggy2   9876 Awesome Ave, 2222
```

이름-주소 쌍 대신 태그는 정의와 주소를 쌍으로 저장합니다.

동일한 디렉토리에 다음 두 루비 파일이 있다고 가정해 보겠습니다:

```
## one.rb
class One
  def initialize
    puts "Initialized"
  end

  def donut
    puts "Bar"
  end
end
```

그리고 

```
## two.rb
require './one'

one = One.new
one.donut
```

정의로 이동하려면 일반 모드에서 `Ctrl-]` 을 사용할 수 있습니다. `two.rb` 파일 내에서 `one.donut` 이 있는 줄로 이동한 후 커서를 `donut` 위에 놓습니다. `Ctrl-]` 을 누릅니다.

아차, Vim이 태그 파일을 찾을 수 없습니다. 먼저 태그 파일을 생성해야 합니다.


## Tag Generator
현대식 Vim은 태그 생성기가 포함되어 있지 않으므로 외부 태그 생성기를 다운로드해야 합니다. 선택할 수 있는 몇 가지 옵션이 있습니다:

- ctags = C 전용. 거의 모든 곳에서 사용 가능.
- exuberant ctags = 가장 인기 있는 것 중 하나. 다양한 언어 지원.
- universal ctags = exuberant ctags와 유사하지만 최신 버전.
- etags = Emacs용. 음...
- JTags = Java
- ptags.py = Python
- ptags = Perl
- gnatxref = Ada

온라인 Vim 튜토리얼을 보면 [exuberant ctags](http://ctags.sourceforge.net/)를 추천하는 경우가 많습니다. [41개 프로그래밍 언어](http://ctags.sourceforge.net/languages.html)를 지원합니다. 저도 사용해 봤는데 아주 잘 작동했습니다. 하지만, 2009년 이후로 유지보수가 중단됐기 때문에, Universal ctags가 좀 더 나은 선택입니다. exuberant ctags와 유사하게 작동하며 현재도 유지보수가 이루어지고 있습니다.

Universal ctags 설치 방법은 자세히 설명하지 않겠습니다. 자세한 지침은 [universal ctags](https://github.com/universal-ctags/ctags) 저장소를 참고합니다.

universal ctags가 설치됐다고 가정하고 기본 태그 파일을 생성해 보겠습니다. 다음 명령을 실행합니다:

```
ctags -R .
```

`R` 옵션은 ctags가 현재 위치(`.`)에서 재귀적 스캔을 실행하도록 지시합니다. 현재 디렉터리에서 `tags` 파일을 확인할 수 있습니다. 파일 내부는 다음과 같은 내용이 표시됩니다:

```
!_TAG_FILE_FORMAT	2	/extended format; --format=1 will not append ;" to lines/
!_TAG_FILE_SORTED	1	/0=unsorted, 1=sorted, 2=foldcase/
!_TAG_OUTPUT_FILESEP	slash	/slash or backslash/
!_TAG_OUTPUT_MODE	u-ctags	/u-ctags or e-ctags/
!_TAG_PATTERN_LENGTH_LIMIT	96	/0 for no limit/
!_TAG_PROGRAM_AUTHOR	Universal Ctags Team	//
!_TAG_PROGRAM_NAME	Universal Ctags	/Derived from Exuberant Ctags/
!_TAG_PROGRAM_URL	<https://ctags.io/>	/official site/
!_TAG_PROGRAM_VERSION	0.0.0	/b43eb39/
One	one.rb	/^class One$/;"	c
donut	one.rb	/^  def donut$/;"	f	class:One
initialize	one.rb	/^  def initialize$/;"	f	class:One
```

사용 중인 Vim 설정과 ctags 생성기에 따라 다르게 보일 수도 있습니다. 태그 파일은 두 부분으로 구성됩니다: 태그 메타데이터와 태그 목록입니다. 이런 메타데이터(`!TAG_FILE...`)는 일반적으로 ctags 생성기에 의해 제어됩니다. 여기서는 다루지 않겠지만, 자세한 내용은 해당 문서를 참고합니다! 태그 목록은 ctags가 색인한 모든 정의에 대한 목록입니다.

이제 `two.rb` 로 이동해서 커서를 `donut` 에 놓고 `Ctrl-]` 을 입력합니다. Vim은 `one.rb` 파일의 `def donut`이 있는 줄로 이동합니다. 성공입니다! 그런데 Vim은 어떻게 이런 작업을 수행했을까요?


## Tags Anatomy
`donut` 태그 항목을 살펴보겠습니다:

```
donut	one.rb	/^  def donut$/;"	f	class:One
```

위의 태그 항목은 네 가지 구성 요소로 이루어집니다: `tagname`, `tagfile`, `tagaddress` 그리고 태그 옵션입니다.

- `donut` 은 `tagname` 입니다. 커서가 “donut” 에 있을 때, Vim은 태그 파일에서 “donut” 문자열이 포함된 줄을 검색합니다.
- `one.rb` 는 `tagfile` 입니다. Vim은 `one.rb` 파일을 찾습니다.
- `/^ def donut$/` 는 `tagaddress` 입니다. `/.../` 는 패턴 지시자입니다. `^` 는 줄의 첫 번째 요소를 나타내는 패턴입니다. 그 뒤에 두 개의 공백이 있고, 문자열 `def donut` 이 이어집니다. 마지막으로 `$` 는 줄의 마지막 요소를 나타내는 패턴입니다.
- `f class:One` 은 태그 옵션으로, 함수 `donut` 이 함수(`f`)이며 `One` 클래스의 일부임을 Vim에 알려줍니다.

태그 목록의 다른 항목을 살펴보겠습니다:

```
One	one.rb	/^class One$/;"	c
```

이 줄은 `donut` 패턴과 동일한 방식으로 작동합니다:

- `One` 은 `tagname` 입니다. 태그의 경우 첫 번째 검색은 대소문자를 구분합니다. 목록에 `One` 과 `one` 이 있다면 Vim은 `one` 보다 `One` 을 우선시합니다.
- `one.rb` 는 `tagfile` 입니다. Vim은 `one.rb` 파일을 찾습니다.
- `/^class One$/` 는 `tagaddress`  패턴입니다. Vim은 (`^`) `class` 로 시작하고 (`$`) `One`으로 끝나는 줄을 찾습니다.
- `c` 는 가능한 태그 옵션 중 하나입니다. `One` 이 루비 클래스(절차형이 아님)이므로 `c` 로 표시합니다.

사용하는 태그 생성기에 따라 태그 파일의 내용은 다를 수 있습니다. 최소한 태그 파일은 다음 형식 중 하나를 가져야 합니다:

```
1.  {tagname} {TAB} {tagfile} {TAB} {tagaddress}
2.  {tagname} {TAB} {tagfile} {TAB} {tagaddress} {term} {field} ..
```


## The Tag File
`ctags -R .` 실행 후 `tags` 라는 새로운 파일이 생성된다는 것을 배웠습니다. Vim은 태그 파일을 어디서 찾아야 하는지 어떻게 알까요?

`:set tags?` 를 실행하면 `tags=./tags,tags` 가 표시될 수 있습니다. (Vim 설정에 따라 다를 수 있음) 여기서 Vim은 `./tags` 의 경우 현재 파일의 경로 전체에서, `tags` 의 경우 현재 디렉터리(프로젝트 루트)에서 모든 태그 파일을 찾습니다.

또한, `./tags` 의 경우, Vim은 먼저 현재 파일의 경로 내부에 있는 태그 파일을 찾습니다. (중첩 수준과 무관하게) 그런 다음 현재 디렉터리(프로젝트 루트)의 태그 파일을 찾습니다. Vim은 첫 번째 일치 항목을 찾은 후 검색을 중단합니다.

만약 ,`‘tags’` 파일에 `tags=./tags,tags,/user/iggy/mytags/tags` 라고 설정했다면, Vim은 `./tags` 와 `tags` 디렉터리 검색을 마친 후 `/user/iggy/mytags` 디렉터리도 태그 파일을 검색합니다. 태그 파일을 프로젝트 내부에만 저장할 필요는 없으며, 별도로 보관할 수 있습니다.

새로운 태그 파일 위치를 추가하려면 다음을 사용합니다:

```
set tags+=path/to/my/tags/file
```


## Generating Tags for a Large Project
대규모 프로젝트에서 ctags를 실행하면 Vim이 중첩된 모든 디렉터리 내부까지 검색하기 때문에 오랜 시간이 소요될 수 있습니다. 자바스크립트 개발자라면 `node_modules` 디렉터리가 매우 커질 수 있다는 점을 잘 알고 있습니다. 5개의 하위 프로젝트가 있고 각각 자체 `node_modules` 디렉터리를 포함한다고 가정합니다. `ctags -R .` 를 실행하면 ctags는 5개의 `node_modules` 전체를 스캔하려고 시도합니다. `node_modules` 에 ctags를 실행할 필요는 거의 없습니다.

`node_modules` 를 제외하고 ctags를 실행하려면 다음을 실행합니다:

```
ctags -R --exclude=node_modules .
```

이번에는 1초도 걸리지 않습니다. 참고로 `exclude` 옵션을 여러 번 사용할 수 있습니다:

```
ctags -R --exclude=.git --exclude=vendor --exclude=node_modules --exclude=db --exclude=log .
```

요점은, 디렉터리를 제외하려면 `--exclude` 옵션이 가장 유용하다는 것입니다.


## Tags Navigation
`Ctrl-]` 만으로도 꽤 유용하게 쓸 수 있지만, 몇 가지 알아두면 좋은 트릭이 있습니다. 태그 점프 키 `Ctrl-]` 는 명령줄 모드 대안인 `:tag {태그명}` 이 있습니다. 다음을 실행하면:

```
:tag donut
```

Vim은 “donut” 문자열에서 `Ctrl-]` 을 누른 것과 마찬가지로 `donut` 메서드로 점프합니다. 인수도 `<Tab>` 으로 자동 완성할 수 있습니다:

```
:tag d<Tab>
```

Vim은 “d” 로 시작하는 모든 태그를 나열합니다. 이 경우 “donut” 입니다.

실제 프로젝트에서 동일한 이름의 여러 메서드를 만나게 될 수 있습니다. 이전에 사용했던 두 루비 파일을 업데이트해 보겠습니다. 

`one.rb` 내부:

```
## one.rb
class One
  def initialize
    puts "Initialized"
  end

  def donut
    puts "one donut"
  end

  def pancake
    puts "one pancake"
  end
end
```

`two.rb` 내부:

```
## two.rb
require './one.rb'

def pancake
  "Two pancakes"
end

one = One.new
one.donut
puts pancake
```

코딩을 따라하고 있다면, 이제 여러 개의 새로운 프로시저가 생겼으므로 `ctags -R .` 을 다시 실행하는 것을 잊지 마시기 바랍니다. `pancake` 프로시저가 두 개 있습니다. `two.rb` 안에서 `Ctrl-]` 을 누르면 어떻게 될까요?

Vim은 `one.rb` 내부의 `def pancake` 가 아닌 `two.rb` 내부의 `def pancake` 로 이동합니다. 이는 Vim이 `two.rb` 내부의 `pancake` 프로시저를 다른 `pancake` 프로시저보다 우선순위가 높다고 인식했기 때문입니다.


## Tag Priority
모든 태그가 동등한 것은 아닙니다. 일부 태그는 우선순위가 더 높습니다. Vim이 중복된 항목 이름을 발견하면 키워드의 우선순위를 확인합니다. 순서는 다음과 같습니다:

1. 현재 파일 내에서 완전히 일치하는 정적 태그.
2. 현재 파일 내에서 완전히 일치하는 전역 태그.
3. 다른 파일 내에서 완전히 일치하는 전역 태그.
4. 다른 파일 내에서 완전히 일치하는 정적 태그.
5. 현재 파일 내에서 대소문자 구분 없이 일치하는 정적 태그.
6. 현재 파일 내에서 대소문자 구분 없이 일치하는 전역 태그.
7. 다른 파일 내에서 대소문자 구분 없이 일치하는 전역 태그.
8. 현재 파일 내에서 대소문자 구분 없이 일치하는 정적 태그.

우선순위 목록에 따라 Vim은 동일 파일에서 발견된 정확한 일치를 우선시합니다. 따라서, Vim은 `one.rb` 내의 `pancake` 프로시저보다 `two.rb` 내의 `pancake` 프로시저를 선택합니다. 위의 우선순위 목록에는 `‘tagcase’`, `‘ignorecase’`, `‘smartcase’` 설정에 따라 일부 예외가 존재하지만, 여기서는 다루지 않겠습니다. 관심이 있으시면 `:h tag-priority`를 참고합니다.


## Selective Tag Jumps
항상 최우선순위 태그 항목으로 이동하는 대신, 어떤 태그 항목으로 이동할지 선택할 수 있으면 좋습니다. 실제로 `two.rb` 의 `pancake` 메서드가 아닌 `one.rb` 의 `pancake` 메서드로 이동할 수도 있습니다. 이를 위해 `:tselect` 를 사용할 수 있습니다. 다음 명령을 실행합니다:

```
:tselect pancake
```

그러면 화면 하단에 다음과 같이 표시됩니다:

```
## pri kind tag               file
1 F C f    pancake           two.rb
             def pancake
2 F   f    pancake           one.rb
             class:One
             def pancake
```

2 를 입력하면 Vim은 `one.rb` 의 프로시저로 이동합니다. 1 을 입력하면 Vim은 `two.rb`의 프로시저로 이동합니다.

`pri` 열에 주목합니다. 첫 번째 일치 항목은 `F C` 가, 두 번째 일치 항목은 `F` 가 표시됩니다. Vim은 태그 우선순위를 결정하기 위해 이 정보를 사용합니다. `F C` 는 현재 파일(`C`) 내에서 완전 일치(`F`) 글로벌 태그를 의미합니다. `F` 는 완전 일치(`F`) 글로벌 태그만 의미합니다. `F C` 는 항상 `F` 보다 우선순위가 높습니다.

`:tselect donut` 을 실행하면 선택할 항목이 하나 뿐임에도 Vim은 이동할 태그 항목을 선택하라는 프롬프트를 표시합니다. Vim이 태그 목록을 여러 개 찾을 때만 선택을 요청하고, 단일 태그만 발견되면 즉시 이동하도록 설정할 수 있을까요?

물론입니다! Vim에는 `:tjump` 가 있습니다. 다음을 실행합니다:

```
:tjump donut
```

Vim은 `:tag donut` 실행과 마찬가지로 즉시 `one.rb` 파일의 `donut` 프로시저로 이동합니다. 이제 다음을 실행합니다:

```
:tjump pancake
```

Vim은 `:tselect pancake` 를 실행한 것과 유사하게 선택 가능한 태그 옵션을 프롬프트로 표시합니다. `tjump` 를 사용하면 두 방법의 장점을 모두 누릴 수 있습니다.

Vim은 `tjump` 를 위한 `g Ctrl-]` 일반 모드 키가 있습니다. 개인적으로는 `Ctrl-]` 보다 `g Ctrl-]` 를 좀 더 선호합니다.


## Autocompletion With Tags
태그는 자동완성을 지원할 수 있습니다. 6장 '삽입 모드' 에서 `Ctrl-X` 서브 모드를 사용해서 다양한 자동완성을 수행할 수 있다는 점을 상기합니다. 제가 언급하지 않은 자동완성 서브 모드 중 하나는 `Ctrl-]` 입니다. 삽입 모드에서 `Ctrl-X Ctrl-]` 을 실행하면 Vim은 태그 파일을 자동완성에 활용합니다.

삽입 모드로 전환한 후 `Ctrl-x Ctrl-]` 을 입력하면 다음과 같은 화면이 표시됩니다:

```
One
donut
initialize
pancake
```


## Tag Stack
Vim은 태그 스택에 이동한 모든 태그 목록을 저장합니다. `:tags` 명령으로 이 스택을 확인할 수 있습니다. 예를 들어, `pancake` 로 태그 점프한 후 `donut` 으로 이동했다면, `:tags` 를 실행하면 다음과 같이 표시됩니다:

```
  # TO tag         FROM line  in file/text
  1  1 pancake            10  ch16_tags/two.rb
  2  1 donut               9  ch16_tags/two.rb
>
```

위의 `>` 기호를 확인합니다. 이는 스택 내의 현재 위치를 나타냅니다. 스택을 “팝(pop)” 해서 이전 스택으로 돌아가려면 `:pop` 을 실행합니다. 시도해 본 후 다시 `:tags` 를 실행합니다:

```
  # TO tag         FROM line  in file/text
  1  1 pancake            10  puts pancake
> 2  1 donut               9  one.donut

```

`>` 기호는 이제 `donut` 이 있는 두 번째 줄에 있음을 유의합니다. 한 번 더 `pop` 을 실행한 후, 다시 `:tags` 를 실행합니다:

```
  # TO tag         FROM line  in file/text
> 1  1 pancake            10  puts pancake
  2  1 donut               9  one.donut
```

일반 모드는 `Ctrl-t` 를 실행해서 `:pop` 과 동일한 효과를 얻을 수 있습니다.


## Automatic Tag Generation
Vim 태그의 가장 큰 단점 중 하나는 중요한 변경을 할 때마다 태그 파일을 재생성해야 한다는 점입니다. 최근에 `pancake` 프로시저를 `waffle` 프로시저로 이름을 변경했다면, 태그 파일은 `pancake` 프로시저가 이름이 변경된 사실을 알지 못합니다. 여전히 태그 목록에 `pancake` 를 저장하고 있습니다. 업데이트된 태그 파일을 생성하려면 `ctags -R .` 을 다시 실행해야 합니다. 이런 방식으로 새로운 태그 파일을 재생성하는 것은 번거로울 수 있습니다.

다행히 태그를 자동으로 생성하는 여러 방법을 사용할 수 있습니다. 


## Generate a Tag on Save
Vim은 이벤트 발생 시 임의의 명령어를 실행하는 자동 명령어(`autocmd`) 메서드가 있습니다. 이를 활용해서 저장 시마다 태그를 생성할 수 있습니다. 

다음을 실행합니다:

```
:autocmd BufWritePost *.rb silent !ctags -R .
```

분석하겠습니다:

- `autocmd` 는 명령줄 명령어입니다. 이벤트, 파일 패턴, 명령어를 인수로 받습니다.
- `BufWritePost` 는 버퍼 저장 이벤트입니다. 파일을 저장할 때마다 `BufWritePost` 이벤트가 발생합니다.
- `.rb` 는 루비 파일용 파일 패턴입니다.
- `silent` 는 실제로 전달하는 명령어의 일부입니다. 이 옵션이 없으면, 자동 명령이 실행될 때마다 Vim은 `press ENTER or type command to continue` 를 표시합니다.
- `!ctags -R .` 는 실행할 명령입니다. Vim 내부에서 `!cmd` 는 터미널 명령을 실행한다는 점을 기억합니다.

이제 루비 파일 내부에서 저장할 때마다 Vim은 `ctags -R .` 을 실행합니다.


## Using Plugins
자동으로 ctags를 생성하는 플러그인이 여러 가지 있습니다:

- [vim-gutentags](https://github.com/ludovicchabant/vim-gutentags)
- [vim-tags](https://github.com/szw/vim-tags)
- [vim-easytags](https://github.com/xolox/vim-easytags)
- [vim-autotag](https://github.com/craigemery/vim-autotag)

저는 vim-gutentags를 사용합니다. 사용법이 간단하며 바로 사용할 수 있습니다.


## Ctags and Git Hooks
티모시 포프(Tim Pope)는 수많은 훌륭한 Vim 플러그인의 저자로, git 훅을 사용하라고 제안하는 블로그 글을 썼습니다. [Check it out](https://tbaggery.com/2011/08/08/effortless-ctags-with-git.html).


## Learn Tags the Smart Way
태그는 올바르게 설정되면 유용합니다. 새로운 코드베이스를 접했을 때 `functionFood` 가 무엇을 처리하는지 이해하려면, 정의로 곧바로 이동해서 쉽게 읽을 수 있습니다. 그 안에서 `functionFood` 가 `functionBreakfast` 를 호출한다는 것을 알게 됩니다. 이를 따라가면 `functionBreakfast` 가 `functionPancake` 를 호출한다는 것을 알게 됩니다. 함수 호출 그래프는 다음과 같이 보입니다:

```
functionFood -> functionBreakfast -> functionPancake
```

이를 통해 이 코드 흐름이 아침에 팬케이크를 먹는 것과 관련이 있다는 통찰력을 얻을 수 있습니다.

태그에 대해 좀 더 알아보려면 `:h tags` 를 확인합니다. 이제 태그 사용법을 알았으니 다른 기능인 폴딩을 살펴보겠습니다.



## Link
- Prev [Ch15. Command-line Mode](./ch15_command-line_mode.md)
- Next [Ch17. Fold](./ch17_fold.md)
