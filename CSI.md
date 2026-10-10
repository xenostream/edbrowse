C# Scripting
---

Visual Studio 2015 Update 1(이하 Update 1) 출시와 함께, 새로운 C# 읽기-평가-출력 루프(REPL)가 도입되었습니다. 이 기능은 Visual Studio 2015 의 새로운 대화형 창이나 CSI 라는 새로운 명령줄 인터페이스(CLI)를 통해 사용할 수 있습니다. Update 1은 C# 언어를 명령줄로 가져온 것 외에도, 일반적으로 CSX 파일로 저장되는 새로운 C# 스크립팅 언어를 도입합니다.

새로운 C# 스크립팅에 대해 자세히 알아보기 전에, 대상 시나리오부터 이해하는 것이 중요합니다. “C# 스크립팅” 은 여러 단위 테스트 프로젝트나 콘솔 프로젝트를 별도로 생성할 필요 없이 “C# 및 .NET 코드 조각을 테스트할 수 있는 도구” 입니다. 이 기능은 명령줄에서 LINQ 집계 메서드 호출을 빠르게 코딩하거나, 파일 압축 해제를 위한 .NET API를 확인하거나, REST API를 호출해서 반환 값이나 작동 방식을 파악할 수 있는 가벼운 옵션을 제공합니다. 또한 `%TEMP%` 디렉터리에 또 다른 *CSPROJ* 파일을 생성하는 번거로움 없이 API를 탐색하고 이해할 수 있는 간편한 수단을 제공합니다.


# The C# REPL Command-Line Interface (CSI.EXE)

C# 자체를 배우는 것과 마찬가지로, C# REPL 인터페이스를 배우기 시작하는 가장 좋은 방법은 이를 직접 실행하고 명령을 실행해 보는 것입니다. 이를 실행하려면 Visual Studio 2015 개발자 명령 프롬프트에서 `csi.exe` 명령을 실행하거나 전체 경로인 `C:\Program Files (x86)\MSBuild\14.0\bin\csi.exe` 를 사용합니다. 그런 다음 그림 1에 표시된 것과 같은 C# 문장을 실행합니다.

예제 1 CSI REPL 예제

```csharp
C:\Program Files (x86)\Microsoft Visual Studio 14.0>csi
Microsoft (R) Visual C# Interactive Compiler version 1.1.0.51014
Copyright (C) Microsoft Corporation. All rights reserved.
Type "#help" for more information.
> System.Console.WriteLine("Hello! My name is Inigo Montoya");
Hello! My name is Inigo Montoya
> 
> ConsoleColor originalConsoleColor  = Console.ForegroundColor;
> try{
.  Console.ForegroundColor = ConsoleColor.Red;
.  Console.WriteLine("You killed my father. Prepare to die.");
. }
. finally
. {
.  Console.ForegroundColor = originalConsoleColor;
. }
You killed my father. Prepare to die.
> IEnumerable<Process> processes = Process.GetProcesses();
> using System.Collections.Generic;
> processes.Where(process => process.ProcessName.StartsWith("c") ).
.  Select(process => process.ProcessName ).Distinct()
DistinctIterator { "chrome", "csi", "cmd", "conhost", "csrss" }
> processes.First(process => process.ProcessName == "csi" ).MainModule.FileName
"C:\\Program Files (x86)\\MSBuild\\14.0\\bin\\csi.exe"
> $"The current directory is { Environment.CurrentDirectory }."
"The current directory is C:\\Program Files (x86)\\Microsoft Visual Studio 14.0."
>
```

가장 먼저 주목할 점은 당연한 사실이지만, 이 언어는 “C#과 비슷하다!” 는 것입니다. 비록 C#의 새로운 방언이지만(다만, 본격적인 프로덕션 프로그램에서는 환영받지만, 대충 만든 프로토타입에서는 불필요하고 복잡한 절차는 생략되어 있습니다). 예상했겠지만, 정적 메서드를 호출하려면 완전한 메서드 이름으로 작성하고 괄호 안에 인수를 전달하면 됩니다. C#과 마찬가지로, 변수를 선언할 때는 변수 앞에 형명을 붙이고, 선택적으로 선언 시점에 새로운 값을 할당할 수 있습니다. 예상했듯이, `try/catch/finally` 블록, 변수 선언, 람다 표현식, LINQ 등 유효한 모든 메서드 본문 구문이 매끄럽게 작동합니다.

명령줄에서도 문자열 구문(대소문자 구분, 문자열 리터럴, 문자열 보간) 같은 C# 기능들이 그대로 유지됩니다. 따라서 경로를 사용하거나 출력할 때, `csi.exe` 같은 경로 출력에서 이중 백슬래시(`\`)와 마찬가지로 백슬래시는 C# 이스케이프 문자(“`\`”)나 문자열 리터럴을 사용해서 이스케이프 처리해야 합니다. 예제 1의 “현재 디렉터리” 예제 줄에서 볼 수 있듯이, 문자열 보간도 정상 작동합니다.

하지만 C# 스크립팅은 문장과 표현식 이상의 기능을 제공합니다. 사용자 정의 유형을 선언하고, 속성을 통해 유형 메타데이터를 삽입할 수 있으며, C# 스크립팅 전용 선언문을 사용해서 코드 양을 줄일 수도 있습니다. 예제 2의 맞춤법 검사 예제를 살펴봅니다.

예제 2 C# 스크립팅 클래스 Spell (Spell.csx)

```csharp
#r ".\Newtonsoft.Json.7.0.1\lib\net45\Newtonsoft.Json.dll"
#load "Mashape.csx"  // Sets a value for the string Mashape.Key
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
public class Spell
{
  [JsonProperty("original")]
  public string Original { get; set; }
  [JsonProperty("suggestion")]
  public string Suggestion { get; set; }
  [JsonProperty(PropertyName ="corrections")]
  private JObject InternalCorrections { get; set; }
  public IEnumerable<string> Corrections
  {
    get
    {
      if (!IsCorrect)
      {
        return InternalCorrections?[Original].Select(
          x => x.ToString()) ?? Enumerable.Empty<string>();
      }
      else return Enumerable.Empty<string>();
    }
  }
  public bool IsCorrect
  {
    get { return Original == Suggestion; }
  }
  static public bool Check(string word, out IEnumerable<string> corrections)
  {
    Task <Spell> taskCorrections = CheckAsync(word);
    corrections = taskCorrections.Result.Corrections;
    return taskCorrections.Result.IsCorrect;
  }
  static public async Task<Spell> CheckAsync(string word)
  {
    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(
      $"https://montanaflynn-spellcheck.p.mashape.com/check/?text={ word }");
    request.Method = "POST";
    request.ContentType = "application/json";
    request.Headers = new WebHeaderCollection();
    // Mashape.Key is the string key available for
    // Mashape for the montaflynn API.
    request.Headers.Add("X-Mashape-Key", Mashape.Key);
    using (HttpWebResponse response =
      await request.GetResponseAsync() as HttpWebResponse)
    {
      if (response.StatusCode != HttpStatusCode.OK)
        throw new Exception(String.Format(
        "Server error (HTTP {0}: {1}).",
        response.StatusCode,
        response.StatusDescription));
      using(Stream stream = response.GetResponseStream())
      using(StreamReader streamReader = new StreamReader(stream))
      {
        string strsb = await streamReader.ReadToEndAsync();
        Spell spell = Newtonsoft.Json.JsonConvert.DeserializeObject<Spell>(strsb);
        // Assume spelling was only requested on first word.
        return spell;
      }
    }
  }
}
```

대체로 이는 일반적인 C# 클래스 선언과 다를 바 없습니다. 하지만 몇 가지 특수한 C# 스크립팅 기능이 있습니다. 

- 첫째, `#r` 지시어는 외부 어셈블리를 참조하는 데 사용됩니다. 이 경우, JSON 데이터를 구문 분석하는 데 도움을 주는 *Newtonsoft.Json.dll* 파일을 참조합니다. 다만, 이 지시어는 파일 시스템 내의 파일을 참조하도록 설계된 것이므로, 백슬래시 이스케이프 시퀀스 같은 불필요한 절차가 필요하지 않습니다.

- 둘째, 전체 코드 목록을 CSX 파일로 저장한 다음, `#load Spell.csx` 명령으로 해당 파일을 C# REPL 창으로 “가져오기” 하거나 “인라인” 으로 삽입할 수 있습니다. `#load` 지시어를 사용하면 마치 모든 `#load 파일` 이 동일한 “프로젝트” 나 “컴파일” 에 포함된 것처럼 추가 스크립트 파일을 포함할 수 있습니다. 코드를 별도의 C# 스크립트 파일에 배치하면 일종의 파일 리팩토링이 가능해지며, 더 중요한 것은 “C# 스크립트를 장기적으로 보존할 수 있다” 는 점입니다.

`using` 선언문은 C# 스크립팅에서 허용되는 또 다른 C# 언어 기능으로, 예제 2에서는 이 기능을 여러 번 활용하고 있습니다. C#과 마찬가지로 “`using` 선언문의 범위는 파일 단위로 제한된다!” 는 점에 유의합니다. 따라서 REPL 창에서 `#load Spell.csx` 명령을 호출하더라도, *Spell.csx* 파일 외부에서는 `using Newtonsoft.Json` 선언문이 유지되지 않습니다. 다시 말해, *Spell.csx* 파일에 정의된 `using Newtonsoft.Json` 선언문은 REPL 창에서 명시적으로 다시 선언하지 않는 한 *Spell.csx* 파일 외부로 유지되지 않습니다(반대 경우도 마찬가지입니다). C# 6.0의 “`using static` 선언도 지원된다!” 는 점에 유의합니다. 따라서 `using static System.Console` 선언문으로 `System.Console` 의 멤버 앞에 타입을 붙일 필요가 없어지므로, `WriteLine("Hello! My name is Inigo Montoya")` 같은 REPL 명령어를 사용할 수 있게 해줍니다.

C# 스크립팅에서 주목할 만한 구문으로는 속성 사용, `using` 문, 속성 및 함수 선언, 그리고 `async/await` 지원이 있습니다. 후자의 지원 덕분에 REPL 창에서 `await` 를 활용하는 것도 가능합니다:

```csharp
(await Spell.CheckAsync("entrepreneur")).IsCorrect
```

C# REPL 인터페이스에 대한 추가 설명은 다음과 같습니다.

- *csi.exe* 는 직접 콘솔 입력이 필요하지만, Windows PowerShell ISE의 “시뮬레이션된” 콘솔 창에서는 이를 지원하지 않으므로 Windows PowerShell ISE 내에서 *csi.exe* 를 실행할 수 없습니다. (이런 이유로, 지원되지 않는 콘솔 애플리케이션 목록(`$psUnsupportedConsoleApplications`)에 추가하는 것을 고려해 보시기 바랍니다.)

- CSI 프로그램을 종료하는 `exit` 또는 `quit` 명령어는 없습니다!! 대신 <kbd>Ctrl+C</kbd> 를 사용해서 프로그램을 종료합니다.

- 동일한 *cmd.exe* 또는 *PowerShell.exe* 세션에서 실행된 *csi.exe* 세션 간에는 명령어 기록이 유지됩니다. 예를 들어, *csi.exe* 를 시작하고 `Console.WriteLine(“HelloWorld”)` 를 호출한 후 <kbd>Ctrl+C</kbd> 를 눌러 종료한 다음 *csi.exe* 를 다시 실행한 후, 위쪽 화살표 키를 누르면 이전의 `Console.WriteLine(“HelloWorld”)` 명령이 그대로 표시됩니다. *cmd.exe* 창을 닫았다가 다시 실행하면 기록은 지워집니다.

- *csi.exe* 는 `#help REPL` 명령을 지원하며, 이 명령을 실행하면 예제 3에 표시된 출력이 나타납니다.

- *csi.exe* 는 예제 4에 표시된 것처럼 여러 명령줄 옵션을 지원합니다.

예제 3. REPL #help 명령 출력

```csharp
> #help
Keyboard shortcuts:
  Enter         If the current submission appears to be complete, evaluate it.
                Otherwise, insert a new line.
  Escape        Clear the current submission.
  UpArrow       Replace the current submission with a previous submission.
  DownArrow     Replace the current submission with a subsequent
                submission (after having previously navigated backward).
REPL commands:
  #help         Display help on available commands and key bindings.
```

예제 4. csi.exe 명령줄 옵션

```csharp
Microsoft (R) Visual C# Interactive Compiler version 1.1.0.51014
Copyright (C) Microsoft Corporation. All rights reserved.
Usage: csi [option] ... [script-file.csx] [script-argument] ...
Executes script-file.csx if specified, otherwise launches an interactive REPL (Read Eval Print Loop).
Options:
  /help       Display this usage message (alternative form: /?)
  /i          Drop to REPL after executing the specified script
  /r:<file>   Reference metadata from the specified assembly file
              (alternative form: /reference)
  /r:<file list> Reference metadata from the specified assembly files
                 (alternative form: /reference)
  /lib:<path list> List of directories where to look for libraries specified
                   by #r directive (alternative forms: /libPath /libPaths)
  /u:<namespace>   Define global namespace using
                   (alternative forms: /using, /usings, /import, /imports)
  @<file>     Read response file for more options
  --          Indicates that the remaining arguments should not be
              treated as options
```

앞서 언급한 것 같이, *csi.exe* 를 사용하면 명령 창을 사용자 지정할 수 있는 기본 “프로필” 파일을 지정할 수 있습니다.

- CSI 콘솔을 지우려면 `Console.Clear` 를 호출합니다. (`Clear` 를 간단히 호출하려면 `using static System.Console` 선언을 추가하는 것을 고려합니다.)

- 여러 줄로 구성된 명령을 입력하는 도중 앞선 줄에서 오류를 범한 경우, <kbd>Ctrl+Z</kbd> 를 누른 후, <kbd>Enter</kbd> 를 눌러 명령을 취소하고 실행하지 않은 상태로 빈 명령 프롬프트로 돌아갈 수 있습니다(콘솔에 `^Z` 가 표시된다는 점에 유의합니다).


## The Visual Studio C# Interactive Window

앞서 언급했듯이, 업데이트 1에는 그림 5와 같이 새로운 Visual Studio C# 대화형 창도 포함되어 있습니다. C# 대화형 창은 ‘보기 | 기타 창 | C# 대화형’ 메뉴로 실행되며, 이를 통해 추가적인 도킹 창이 열립니다. *csi.exe* 창과 마찬가지로 이 창도 C# REPL 창이지만 몇 가지 기능이 추가되어 있습니다. 첫째, 구문 색상 강조 표시와 IntelliSense 기능이 포함되어 있습니다. 마찬가지로, 편집하는 동안 실시간으로 컴파일이 이루어지므로 구문 오류 등은 자동으로 빨간색 물결선 밑줄로 표시됩니다.

Visual Studio C# 대화형 창을 사용해서 클래스 외부에서 C# 스크립트 함수 선언하기

그림 5. Visual Studio C# 대화형 창으로 클래스 외부에서 C# 스크립트 함수 선언하기

C# 대화형 창을 떠올리면 당연히 Visual Studio의 ‘즉시 실행(Immediate)’ 창과 ‘명령(Command)’ 창이 연상됩니다. 물론 두 창 모두 .NET 문장을 실행할 수 있는 REPL 창이라는 점에서 공통점이 있지만, 용도는 상당히 다릅니다. C# 즉시 실행 창은 애플리케이션의 디버그 컨텍스트에 직접 연결되므로, 이 컨텍스트에 추가 문을 삽입하고, 디버그 세션 내의 데이터를 검사하며, 심지어 데이터와 디버그 컨텍스트를 조작하고 업데이트할 수도 있습니다. 마찬가지로, 명령 창은 다양한 메뉴를 실행하는 것을 포함해서 Visual Studio를 조작하기 위한 CLI를 제공하지만, 이는 메뉴 자체가 아닌 명령 창을 통해 이루어집니다. (예를 들어, View.C#Interactive 명령을 실행하면 C# 대화형 창이 열립니다.) 반면, C# 대화형 창에서는 이전 섹션에서 설명한 C# REPL 인터페이스와 관련된 모든 기능을 포함해서 C# 코드를 실행할 수 있습니다. 하지만 C# 대화형 창은 디버그 컨텍스트에 접근할 수 없습니다! 이 창은 디버그 컨텍스트나 Visual Studio에 대한 핸들조차 없는, 완전히 독립적인 C# 세션입니다. *csi.exe* 와 마찬가지로, 이 환경에서는 별도의 Visual Studio 콘솔이나 단위 테스트 프로젝트를 시작할 필요 없이 간단한 C# 및 .NET 코드 조각을 실험하면서 이해도를 확인할 수 있습니다. 다만 별도의 프로그램을 실행할 필요 없이, C# 대화형 창은 개발자가 이미 작업 중일 것으로 예상되는 Visual Studio 내에서 호스팅됩니다.

C# 대화형 창에 대한 몇 가지 참고 사항은 다음과 같습니다.

- C# 대화형 창은 *csi.exe* 에는 없는 다음과 같은 여러 가지 추가 REPL 명령을 지원합니다.
	- `#cls/#clear:` 명령은 편집기 창의 내용을 지웁니다.
	- `#reset:` 명령은 명령 이력을 유지한 채 실행 환경을 초기 상태로 복원합니다.
- 그림 6의 `#help` 출력에서 볼 수 있듯이, 키보드 단축키는 다소 예상치 못한 방식입니다.

예제 6. C# 대화형 창의 키보드 단축키

단축키 | 설명
--- | ---
Enter | 현재 제출 내용이 완료된 것으로 보이면 이를 평가합니다. 그렇지 않으면 새 줄을 삽입합니다.
Ctrl+Enter | 현재 제출 내용 내에서 해당 제출 내용을 평가합니다.
Shift+Enter |새 줄을 삽입합니다.
Escape | 현재 입력 내용을 지웁니다.
Alt+위 화살표 | 현재 입력 내용을 이전 입력 내용으로 대체합니다.
Alt+아래 화살표 | 현재 입력 내용을 (이전에 뒤로 이동한 후) 다음 입력 내용으로 대체합니다.
Ctrl+Alt+위 화살표 | 현재 입력 내용을 동일한 텍스트로 시작하는 이전 입력 내용으로 대체합니다.
Ctrl+Alt+아래 화살표 | 현재 입력 내용을 동일한 텍스트로 시작하는 이후의 입력 내용으로 대체합니다(이전에 뒤로 이동한 후).
UpArrow | 현재 입력 내용의 끝에서, 현재 입력 내용을 이전 입력 내용으로 대체합니다. 그 외의 위치에서는 커서를 한 줄 위로 이동합니다.
DownArrow | 현재 입력 내용의 끝에서, 현재 입력 내용을 이후의 입력 내용으로 대체합니다(이전에 뒤로 이동한 후). 그 외의 위치에서는 커서를 한 줄 위로 이동합니다. 아래쪽 화살표 현재 제출 내용의 끝에서, 현재 제출 내용을 이전 제출 내용으로 대체합니다. 그 외의 위치에서는 커서를 한 줄 아래로 이동합니다.
Ctrl+K, Ctrl+Enter | 선택한 내용을 대화형 버퍼의 끝에 붙여넣고, 커서를 입력 끝 부분에 남겨둡니다.
Ctrl+E, Ctrl+Enter | 선택한 내용을 대화형 버퍼에 대기 중인 입력 내용 앞에 붙여넣고 실행합니다.
Ctrl+A | 첫 번째 누름 시, 커서가 위치한 제출 내용을 선택합니다. 두 번째 누름 시, 창 내의 모든 텍스트를 선택합니다.

Alt+위쪽 화살표/아래쪽 화살표가 명령어 기록을 불러오는 키보드 단축키라는 점을 유의합니다. Microsoft는 대화형 창(*Interactive window*)의 사용 경험을 표준 Visual Studio 코드 창과 일치시키기 위해, 좀 더 간단한 위쪽 화살표/아래쪽 화살표 대신 이 단축키를 선택했습니다.

C# 대화형 창은 Visual Studio 내에서 호스팅되므로, *csi.exe* 와 달리 명령줄을 통해 선언문이나 임포트를 사용해서 참조를 전달할 수 있는 기능이 제한적입니다. 대신, C# 대화형 창은 `C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\IDE\PrivateAssemblies\CSharpInteractive.rsp` 파일에서 기본 실행 컨텍스트를 불러오며, 이 파일은 기본적으로 참조할 어셈블리를 지정합니다:

```csharp
# This file contains command-line options that the C# REPL
# will process as part of every compilation, unless
# \"/noconfig\" option is specified in the reset command.
/r:System
/r:System.Core
/r:Microsoft.CSharp
/r:System.Data
/r:System.Data.DataSetExtensions
/r:System.Xml
/r:System.Xml.Linq
SeedUsings.csx
```

또한, *CSharpInteractive.rsp* 파일은 기본값인 `C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\IDE\PrivateAssemblies\SeedUsings.csx` 파일을 참조합니다:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
```

이 두 파일의 결합 덕분에, 각각 완전한 이름인 `System.Console.WriteLine` 과 `System.Environment.CurrentDirectory` 대신 `Console.WriteLine` 과 `Environment.CurrentDirectory` 를 사용할 수 있습니다. 또한, `Microsoft.CSharp` 같은 어셈블리를 참조하면 별도의 설정 없이도 `dynamic` 같은 언어 기능을 사용할 수 있습니다. (이 파일들을 수정하면 “프로필” 이나 “기본 설정” 을 변경해서 세션 간에도 변경 사항을 유지하도록 처리할 수 있습니다.)


## More on the C# Script Syntax

C# 스크립트 구문에서 유의할 점은, 표준 C#에서 중요한 많은 형식적인 요소들이 C# 스크립트에서는 적절하게 선택 사항이 된다는 것입니다. 예를 들어, 메서드 본문은 함수 내부에 반드시 포함될 필요가 없으며, C# 스크립트 함수는 클래스 범위 밖에서도 선언할 수 있습니다. 예를 들어, 예제 5에 표시된 것처럼 REPL 창에 직접 나타나는 NuGet Install 함수를 정의할 수 있습니다. 또한 놀랍게도, C# 스크립팅은 네임스페이스 선언을 지원하지 않습니다!! 예를 들어, `Spell` 클래스를 `Grammar` 네임스페이스로 감쌀 수 없습니다: `namespace Grammar { class Spell {} }`

동일한 구성 요소(변수, 클래스, 함수 등)를 반복 선언할 수 있다는 점을 유의합니다. 마지막 선언은 이전의 모든 선언을 가립니다.

또 하나 유의할 중요한 사항은 명령어 끝을 표시하는 세미콜론의 동작 방식입니다. 문(예: 변수 할당)에는 세미콜론이 필요합니다. 세미콜론이 없으면 REPL 창은 세미콜론이 입력될 때까지 (마침표를 통해) 추가 입력을 계속 요청합니다. 반면, 식은 세미콜론 없이도 실행됩니다. 따라서 `System.Diagnostics.Process.Start(“notepad”)` 는 끝에 세미콜론이 없어도 메모장을 실행합니다. 또한, `Start` 메서드 호출은 프로세스를 반환하므로, 식의 문자열 출력이 명령줄에 표시됩니다:

`[System.Diagnostics.Process (Notepad)]`. 하지만 식의 끝을 세미콜론으로 닫으면 출력이 숨겨집니다. 따라서 마지막에 세미콜론을 붙여 `Start` 를 호출하면 *Notepad* 는 여전히 실행되지만, 어떤 출력도 생성되지 않습니다. 물론, `Console.WriteLine(“기적이 일어나야 할텐데.”);` 의 경우, 세미콜론이 있더라도 텍스트는 출력됩니다. 이는 메서드 자체가 출력을 표시하기 때문입니다(메서드 반환 값이 아님).

표현식(*expression*)과 문(*statement*)의 구분은 때때로 미묘한 차이를 초래할 수 있습니다. 예를 들어, 문 `string text = “There’s a shortage of perfect b….”;` 는 아무 출력도 생성하지 않지만, `text="Stop that rhyming and I mean it"` 는 할당된 문자열을 반환합니다(할당문은 할당된 값을 반환하며, 출력을 억제하는 세미콜론이 없기 때문입니다).

추가 어셈블리를 참조하는 (`#r`) 및 기존 C# 스크립트를 가져오는 (`#load`) C# 스크립트 지시어는 훌륭한 기능입니다. (같은 결과를 얻기 위해 *project.json* 파일 같은 복잡한 해결책을 사용할 수도 있지만, 그다지 우아한 방법은 아닐 것입니다.) 안타깝게도 이 글을 쓰는 시점에서는 NuGet 패키지는 지원되지 않습니다. NuGet에서 파일을 참조하려면 패키지를 디렉터리에 설치한 다음 `#r` 지시어로 특정 DLL을 참조해야 합니다. (마이크로소프트 측에서는 이 기능이 곧 추가될 것이라고 알려왔습니다.)

현재 이 지시어들은 특정 파일을 참조한다는 점에 유의합니다. 예를 들어, 지시어 내에서 변수를 지정할 수는 없습니다. 지시어라면 당연히 가능할 것이라고 기대할 수 있겠지만, 이로 인해 어셈블리를 동적으로 로드할 수 있는 가능성이 차단됩니다. 예를 들어, “nuget.exe install” 을 동적으로 호출해서 어셈블리를 추출할 수 있습니다(다시 예제 5 참조). 그러나 이렇게 해도 CSX 파일이 추출된 NuGet 패키지에 동적으로 바인딩될 수는 없습니다. `#r` 지시문에 어셈블리 경로를 동적으로 전달할 방법이 없기 때문입니다.

## A C# CLI

솔직히 말해서 저는 Windows PowerShell 과 애증의 관계를 맺고 있습니다. 명령줄에서 Microsoft .NET Framework를 사용할 수 있는 편리함과, 과거의 수많은 CLI에서 사용되던 전통적인 텍스트 대신 “파이프를 통해 .NET 객체를 전달할 수 있다!” 는 점이 정말 마음에 듭니다. 하지만 C# 언어에 관해서는 “편파적” 입니다. 저는 C#의 우아함과 강력함을 사랑합니다. (지금까지도 `LINQ` 를 가능하게 한 언어 확장에 깊은 감명을 받고 있습니다.) 따라서 Windows PowerShell .NET의 폭넓은 기능과 C# 언어의 우아함을 결합할 수 있다는 생각에, 저는 `C# REPL` 을 Windows PowerShell의 대체 수단으로 접근했습니다. *csi.exe* 를 실행한 후, 즉시 `cd, dir, ls, pwd, cls, alias` 같은 명령어를 시도해 보았습니다. 말할 필요도 없이, 아무것도 작동하지 않아서 실망했습니다. 이런 경험을 곰곰이 되새기고 C# 팀과 논의한 끝에, Windows PowerShell을 대체하는 것이 팀이 버전 1에서 중점을 둔 목표가 아니란 사실도 깨달았습니다. 게다가 이는 .NET Framework 이므로, 앞서 언급한 명령어에 대한 사용자 정의 함수를 추가하거나 Roslyn의 C# 스크립트 구현을 업데이트하는 등의 확장성을 지원합니다. 저는 즉시 이런 명령어에 대한 함수를 정의하기 시작했습니다. 이 라이브러리의 초기 버전은 GitHub(github.com/CSScriptEx)에서 다운로드할 수 있습니다.

앞서 언급한 명령어 목록을 기본적으로 지원하는, 좀 더 기능적인 C# CLI를 찾고 계신 분들은 scriptcs.net(GitHub: github.com/scriptcs)의 ScriptCS 도 고려하시기 바랍니다. 이 도구 역시 Roslyn을 활용하며, `alias, cd, clear, cwd, exit, help, install, references, reset, scriptpacks, usings` 및 `vars` 명령어를 포함하고 있습니다. ScriptCS 를 사용할 때는 현재 명령어 접두사가 해시 기호(예: `#reset`)가 아닌 콜론(예: `:reset`)이란 점에 유의하시기 바랍니다. 또한, ScriptCS 는 Visual Studio Code에서 CSX 파일에 대한 색상 강조 및 IntelliSense 기능을 추가로 지원합니다.


## Wrapping Up

적어도 현재로서는 C# REPL 인터페이스의 목적은 *Windows PowerShell* 이나 *cmd.exe* 를 대체하는 것이 아닙니다. 처음부터 그렇게 생각했다면 실망할 것입니다. 오히려 C# 스크립팅과 REPL CLI를 “Visual Studio | 새 프로젝트: UnitTestProject” 나 이와 유사한 용도의 dotnetfiddle.net 을 대체할 수 있는 가벼운 대안으로 접근하시길 권장합니다. 이는 C# 및 .NET에 초점을 맞춘 방식으로, 언어와 .NET API에 대한 이해를 높이는 데 도움이 됩니다. C# REPL은 짧은 코드 조각이나 프로그램 단위를 작성해서, 좀 더 큰 프로그램에 복사해서 붙여넣을 준비가 될 때까지 자유롭게 실험할 수 있는 수단을 제공합니다. 이를 통해 코드를 작성하는 즉시 구문(대소문자 불일치 같은 사소한 부분까지)이 검증되는 보다 광범위한 스크립트를 작성할 수 있으며, 스크립트를 실행하고 나서야 오타를 발견하는 상황을 피할 수 있습니다. C# 스크립팅과 대화형 창이 어떤 역할을 처리하는지 이해하면, 이는 버전 1.0 때부터 여러분이 찾던 바로 그 도구이자 즐거움이 될 것입니다.

C# REPL과 C# 스크립팅 자체가 흥미로운 기능인 것은 물론이지만, 이 기능들이 Visual Basic for Applications(VBA) 같은 방식으로 사용자의 애플리케이션을 위한 확장 프레임워크로 활용될 수 있는 발판이 된다는 점도 고려하시기 바랍니다. 대화형 창과 C# 스크립팅 지원이 있다면, 별도의 사용자 정의 언어, 파서, 편집기를 개발할 필요 없이 사용자 자신의 애플리케이션에 .NET “매크로” 를 추가할 수 있는—그리 멀지 않은—미래를 상상할 수 있습니다. 이것이야말로 현대적인 환경에 조속히 도입할 가치가 있는 레거시 COM 기능이라 할 수 있습니다.

---
마크 마이클리스(*Mark Michaelis*)는 IntelliTect의 창립자이자 수석 기술 아키텍트 겸 강사로 활동하고 있습니다. 거의 20년 동안 마이크로소프트 MVP로 선정되어 왔으며, 2007년부터 마이크로소프트 리저널 디렉터로 활동하고 있습니다. 마이클리스는 C#, 마이크로소프트 애저(Microsoft Azure), 셰어포인트(SharePoint), 비주얼 스튜디오 ALM(Visual Studio ALM)을 비롯한 여러 마이크로소프트 소프트웨어 설계 검토 팀에서 활동하고 있습니다. 그는 개발자 컨퍼런스에서 강연하고 있으며, 최근 저서인 『Essential C# 6.0 (5판)』(itl.tc/EssentialCSharp)을 비롯해 수많은 책을 집필했습니다. 페이스북(facebook.com/Mark.Michaelis), 블로그(IntelliTect.com/Mark), 트위터(@markmichaelis) 또는 이메일(mark@IntelliTect.com)을 통해 그에게 연락할 수 있습니다.

이 기사를 검토해 주신 다음 Microsoft 기술 전문가분들께 감사드립니다: Kevin Bost 및 Kasey Uhlenhuth

