# Ch19. Compile
컴파일은 많은 언어에서 중요한 주제입니다. 이 장은 Vim에서 컴파일하는 방법을 배웁니다. 또한, Vim의 `:make` 명령어를 활용하는 방법도 살펴봅니다.


## Compile From the Command Line
뱅 연산자(`!`)를 사용해서 컴파일할 수 있습니다. `.cpp` 파일을 `g++` 로 컴파일한다면 다음을 실행합니다:

```
:!g++ hello.cpp -o hello
```

하지만, 매번 파일명과 출력 파일명을 직접 입력하는 것은 실수하기 쉽고 번거롭습니다. 메이크파일을 사용하는 것이 좋습니다.


## The Make Command
Vim은 메이크파일을 실행하는 `:make` 명령어가 있습니다. 이 명령어를 실행하면 Vim은 현재 디렉터리에서 실행할 메이크파일을 찾습니다.

현재 디렉터리에 `makefile` 이란 파일을 생성하고 다음 내용을 입력합니다:

```
all:
	echo "Hello all"
foo:
	echo "Hello foo"
list_pls:
	ls
```

Vim에서 다음을 실행합니다:

```
:make
```

Vim은 터미널에서 실행할 때와 동일한 방식으로 이를 실행합니다. `:make` 명령어는 터미널 make 명령어와 마찬가지로 매개변수를 받습니다. 다음을 실행합니다:

```
:make foo
" Outputs "Hello foo"

:make list_pls
" Outputs the ls command result
```

`:make` 명령어는 잘못된 명령어를 실행할 경우 Vim의 퀵픽스(quickfix)를 사용해서 오류를 저장합니다. 존재하지 않는 대상으로 실행합니다:

```
:make dontexist
```

해당 명령어를 실행하면 오류가 표시됩니다. 이 오류를 확인하려면 퀵픽스 창을 열기 위해 `:copen` 명령어를 실행합니다:

```
|| make: *** No rule to make target `dontexist'.  Stop.
```


## Compiling With Make
메이크파일을 사용해서 기본적인 `.cpp` 프로그램을 컴파일해 보겠습니다. 먼저 `hello.cpp` 파일을 생성합니다:

```
#include <iostream>

int main() {
    std::cout << "Hello!\n";
    return 0;
}
```

`.cpp` 파일을 빌드하고 실행하도록 메이크파일을 업데이트합니다:

```
all:
	echo "build, run"
build:
	g++ hello.cpp -o hello
run:
	./hello
```

이제 다음을 실행합니다:

```
:make build
```

`g++` 가 `./hello.cpp` 를 컴파일해서 `./hello` 를 생성합니다. 그런 다음 다음을 실행합니다:

```
:make run
```

터미널에 `“Hello!”` 가 출력되는 것을 확인할 수 있습니다.


## Different Make Program
`:make`를 실행하면 Vim은 실제로 `makeprg` 옵션에 설정된 명령을 실행합니다. `:set makeprg?` 를 실행하면 다음과 같이 표시됩니다:

```
makeprg=make
```

기본 `:make` 명령은 `make` 외부 명령입니다. `:make` 명령을 실행할 때마다 `g++ {your-file-name}` 을 실행하도록 변경하려면 다음을 실행합니다:

```
:set makeprg=g++\ %
```

`\` 는 `g++` 뒤의 공백을 이스케이프하기 위한 것입니다. Vim에서 `%` 기호는 현재 파일을 나타냅니다. 명령어 `g++\\ %` 는 `g++ hello.cpp` 를 실행하는 것과 동일합니다.

`./hello.cpp` 로 이동한 후 `:make` 를 실행합니다. 출력 경로를 지정하지 않았기 때문에 Vim은 `hello.cpp` 를 컴파일하고 `a.out` 을 생성합니다. 컴파일된 출력 파일 이름을 원본 파일 이름에서 확장자를 뺀 형태로 지정하도록 리팩토링해 보겠습니다. 다음 명령을 실행하거나 vimrc에 추가합니다:

```
set makeprg=g++\ %\ -o\ %<
```

세부 설명:

- `g++\ %` 는 위와 동일합니다. `g++ <your-file>` 실행과 같습니다.
- `-o` 는 출력 옵션입니다.
- Vim에서 `%<` 는 확장자를 제외한 현재 파일 이름을 나타냅니다. (`hello.cpp` 는 `hello` 가 됨)

`./hello.cpp` 내부에서 `:make` 를 실행하면 `./hello` 로 컴파일됩니다. `./hello.cpp` 내부에서 `./hello` 를 빠르게 실행하려면 `:!./%<` 를 실행합니다. 이는 `:!./{현재 파일 이름에서 확장자 제외}` 를 실행하는 것과 동일합니다.

자세한 내용은 `:h :compiler` 및 `:h write-compiler-plugin` 을 참조합니다.


## Auto-compile on Save
컴파일을 자동화하면 작업을 좀 더 간편하게 만들 수 있습니다. Vim의 `autocmd` 를 사용하면 특정 이벤트에 기반해서 자동 작업을 실행할 수 있다는 점을 기억합니다. `.cpp` 파일을 저장할 때마다 자동으로 컴파일하려면 vimrc에 다음을 추가합니다:

```
autocmd BufWritePost *.cpp make
```

`.cpp` 파일에 저장할 때마다 Vim이 `make` 명령어를 실행합니다.


## Switching Compiler
Vim은 컴파일러를 빠르게 전환하는 `:compiler` 명령어가 있습니다. 사용 중인 Vim 빌드에는 여러 사전 구축된 컴파일러 구성이 포함되어 있습니다. 보유한 컴파일러를 확인하려면 다음을 실행합니다:

```
:e $VIMRUNTIME/compiler/<Tab>
```

다양한 프로그래밍 언어용 컴파일러 목록이 표시됩니다.

`:compiler` 명령어를 사용하려면, 루비 파일 `hello.rb` 가 있고 그 안에 다음과 같은 내용이 있다고 가정해 보겠습니다:

```
puts “Hello ruby”
```

`:make` 를 실행하면 Vim이 `makeprg` 에 할당된 명령어(기본값은 `make`)를 실행한다는 점을 기억합니다. 다음 명령어를 실행하면:

```
:compiler ruby
```

Vim은 `$VIMRUNTIME/compiler/ruby.vim` 스크립트를 실행하고 `makeprg` 를 `ruby` 명령어로 변경합니다. 이제 `:set makeprg?` 를 실행하면 `makeprg=ruby` 라고 표시됩니다. (이는 `$VIMRUNTIME/compiler/ruby.vim` 파일의 내용이나 다른 사용자 정의 루비 컴파일러가 있는지 여부에 따라 다릅니다. 즉, 사용자 환경에 따라 다를 수 있음) `:compiler {your-lang}` 명령어를 사용하면 다른 컴파일러로 빠르게 전환할 수 있습니다. 여러 언어를 사용하는 프로젝트에서 유용합니다.

프로그램 컴파일을 위해 반드시 `:compiler` 와 `makeprg` 를 사용할 필요는 없습니다. 테스트 스크립트 실행, 파일 린트 검사, 신호 전송 등 원하는 작업을 수행할 수 있습니다.


## Creating a Custom Compiler
간단한 타입스크립트 컴파일러를 만들어 보겠습니다. 컴퓨터에 타입스크립트를 설치합니다. (`npm install -g typescript`) 이제 `tsc` 명령어가 사용 가능해집니다. 타입스크립트를 사용한 적이 없다면, `tsc` 는 타입스크립트 파일을 자바스크립트 파일로 컴파일합니다. `hello.ts` 라는 파일이 있다고 가정해 보겠습니다:

```
const hello = "hello";
console.log(hello);
```

`tsc hello.ts` 를 실행하면 `hello.js` 로 컴파일됩니다. 그러나, `hello.ts` 에 다음과 같은 표현식이 포함되면:

```
const hello = "hello";
hello = "hello again";
console.log(hello);
```

이것은 `const` 변수를 변경할 수 없기 때문에 오류를 발생시킵니다. 즉, `tsc hello.ts` 를 실행하면 오류가 발생합니다:

```
hello.ts:2:1 - error TS2588: Cannot assign to 'person' because it is a constant.

2 person = "hello again";
  ~~~~~~


Found 1 error.
```

간단한 Typescript 컴파일러를 만들기 위해, `~/.vim/` 디렉토리에 `compiler` 디렉토리(`~/.vim/compiler/`)를 추가한 후 `typescript.vim` 파일(`~/.vim/compiler/typescript.vim`)을 생성합니다. 다음 내용을 입력합니다:

```
CompilerSet makeprg=tsc
CompilerSet errorformat=%f:\ %m
```

첫 번째 줄은 `tsc` 명령을 실행하도록 `makeprg` 를 설정합니다. 두 번째 줄은 파일(`%f`)을 표시한 뒤, 리터럴 콜론(`:`)과 이스케이프된 공백(`\ `)을 거쳐 오류 메시지(`%m`)를 표시하도록 오류 형식을 설정합니다. 오류 형식에 대해 자세히 알아보려면 `:h errorformat` 을 확인합니다.

다른 사람들이 어떻게 처리하는지 알아보려면 미리 만들어진 컴파일러 몇 가지를 읽어봅니다. `:e $VIMRUNTIME/compiler/<some-language>.vim` 을 확인합니다.

일부 플러그인이 Typescript 파일과 충돌할 수 있으므로, `--noplugin` 플래그를 사용해서 플러그인 없이 `hello.ts` 를 열어 보겠습니다:

```
vim --noplugin hello.ts
```

`makeprg` 를 확인합니다:

```
:set makeprg?
```

기본 `make` 프로그램이 표시되야 합니다. 새로운 타입스크립트 컴파일러를 사용하려면 다음을 실행합니다:

```
:compiler typescript
```

이제 `:set makeprg?` 를 실행하면 `tsc` 라고 표시되야 합니다. 테스트해 보겠습니다. 다음 명령을 실행합니다:

```
:make %
```

`%` 는 현재 파일을 의미한다는 점을 기억합니다. 타입스크립트 컴파일러가 예상대로 작동하는지 확인합니다! 오류 목록을 보려면 `:copen` 을 실행합니다.


## Async Compiler
때로는 컴파일이 오래 걸릴 수 있습니다. 컴파일 과정이 끝날 때까지 멈춰버린 Vim을 멍하니 바라보고 싶지는 않습니다. 컴파일 중에도 Vim을 계속 사용할 수 있도록 비동기적으로 컴파일할 수 있다면 얼마나 좋을까요?

다행히 비동기 프로세스를 실행하는 플러그인이 있습니다. 주요 두 가지는 다음과 같습니다:

- [vim-dispatch](https://github.com/tpope/vim-dispatch)
- [asyncrun.vim](https://github.com/skywind3000/asyncrun.vim)

이 장의 나머지 부분에서 vim-dispatch를 살펴보겠지만, 가능한 모든 플러그인을 직접 사용해 보시길 강력히 권장합니다.

> [!NOTE]
> Vim과 NeoVim은 실제로 비동기 작업을 지원하지만, 이 장의 범위를 벗어납니다. 궁금하면 `:h job-channel-overview.txt` 를 확인합니다.


## Plugin: Vim-dispatch
Vim-dispatch는 여러 명령어가 있지만, 주요 명령어는 `:Make` 와 `:Dispatch` 명령어 두 가지입니다.


### Async Make
Vim-dispatch의 `:Make` 명령어는 Vim의 `:make` 와 유사하지만 비동기적으로 실행됩니다. 자바스크립트 프로젝트에서 `npm t` 를 실행할 경우, makeprg 를 다음과 같이 설정할 수 있습니다:

```
:set makeprg=npm\\ t
```

다음 명령을 실행하면:

```
:make
```

Vim은 `npm t` 를 실행하지만, 자바스크립트 테스트가 실행되는 동안 화면이 멈춘 상태로 보입니다. vim-dispatch를 사용하면 다음과 같이 실행하면 됩니다:

```
:Make
```

Vim은 `npm t` 를 비동기적으로 실행합니다. 이렇게 하면 `npm t` 가 백그라운드 프로세스에서 실행되는 동안에도 기존 작업을 계속할 수 있습니다. 대단하죠!


### Async Dispatch
`:Dispatch` 명령어는 `:compiler` 및 `:!` 명령어와 유사합니다. Vim 내에서 모든 외부 명령어를 비동기적으로 실행할 수 있습니다.

루비 스펙 파일에서 테스트를 실행한다고 가정해 보겠습니다. 다음을 실행합니다:

```
:Dispatch bundle exec rspec %
```

Vim은 현재 파일(`%`)에 `rspec` 명령어를 비동기적으로 실행합니다.


### Automating Dispatch
Vim-dispatch는 특정 명령어를 자동으로 평가하도록 설정할 수 있는 `b:dispatch` 버퍼 변수가 있습니다. `autocmd` 를 활용해서 이를 사용할 수 있습니다. vimrc에 다음을 추가합니다:

```
autocmd BufEnter *_spec.rb let b:dispatch = ‘bundle exec rspec %’
```

이제 `_spec.rb` 로 끝나는 파일(`BufEnter`)에 진입할 때마다 `:Dispatch` 를 실행하면 자동으로 `bundle exec rspec {현재 루비 스펙 파일}` 이 실행됩니다.

## Learn Compile the Smart Way
이 장은 `make` 및 `compiler` 명령어를 사용해서 Vim 내부에서 **어떤** 프로세스든 비동기적으로 실행함으로써 프로그래밍 워크플로우를 보완할 수 있음을 배웠습니다. Vim이 다른 프로그램으로 자신을 확장할 수 있는 능력은 힘을 발휘합니다.


## Link
- Prev [Ch18. Git](./ch18_git.md)
- Next [Ch20. Views, Sessions, and Viminfo](./ch20_views_sessions_viminfo.md)
