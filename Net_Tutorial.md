 
 # Getting started

가장 중요한 C# 개념을 다루는 94개의 문서로 구성된 C# 자습서에 오신 것을 환영합니다. 이 자습서는 주로 이 훌륭한 기술의 신규 사용자를 위한 것이며 가능한 한 최대한 활용하기 위해 모든 장을 살펴보는 것이 좋습니다. 각 장은 이전 장을 읽지 않고도 사용할 수 있지만 일부는 이전 장에서 수행된 내용을 참조할 수 있습니다.


## Introduction
C# 자습서에 오신 것을 환영합니다. *.NET 프레임워크* 가 도입되면서 Microsoft는 `C#` (*C Sharp* 로 발음)이라는 새로운 언어를 포함시켰습니다. C#은 다른 여러 언어, 특히 Java의 핵심 개념을 차용해서 간단하고 현대적이며 범용적인 객체 지향 프로그래밍 언어로 설계되었습니다.

C#은 이론적으로 기계어 코드로 컴파일할 수 있지만 실제로는 항상 .NET 프레임워크와 함께 사용됩니다. 따라서 C#으로 작성된 응용 프로그램을 사용하려면 응용 프로그램을 실행하는 컴퓨터에 .NET Framework가 설치되어 있어야 합니다. .NET 프레임워크를 사용하면 다양한 언어를 사용할 수 있지만 C#은 프레임워크와 함께 설계되었기 때문에 **.NET 언어** 라고도 합니다.

> [!CAUTION]
> C#은 객체 지향 언어이며 전역 변수나 함수를 제공하지 않습니다. 모든 것이 클래스에 래핑되며, `System.Object` 클래스에서 상속되는 `int` 및 `string` 같은 간단한 유형도 포함됩니다.

다음 장에서는 C#에 대한 가장 중요한 주제를 안내합니다.





## Visual Studio Community
Visual Studio는 많은 .NET 개발자가 선택하는 전문 IDE(통합 개발 환경)입니다. .NET 프레임워크와 C# 프로그래밍 언어도 Microsoft에서 만들었으므로 이는 완벽하게 이해됩니다. 역사적으로 VS(*Visual Studio* 의 약자)는 사용 비용이 많이 들었지만 다행스럽게 Microsoft는 수 년 동안 개인 개발자를 위한 **무료 버전을 제공** 해 왔습니다.

이전까지는 무료 버전은 *Visual C# Express, Visual Web Developer* 과 같은 다양한 작업에 대해 별도의 버전으로 제공되었습니다. 그러나 이제는 단순히 *Visual Studio Community* 이며 Express 버전과 마찬가지로 Visual Studio 프로페셔널 버전의 가벼운 버전입니다. 즉, 일부 기능을 놓치게 될 것이지만 Community 에디션에는 가장 고급 기능을 제외한 모든 기능이 포함되어 있으며 이 자습서를 통해서 C#을 배우기에는 충분할 것입니다.

### Visual Studio 커뮤니티 다운로드
따라서 이 자습서를 시작하려면 visualstudio.com 에서 Visual Studio Community를 다운로드합니다. 다운로드 페이지에 대한 링크는 다음과 같습니다.

[https://www.visualstudio.com/downloads/]("https://www.visualstudio.com/downloads/")

다운로드해서 설치하면 첫 번째 C# 응용 프로그램을 만드는 다음 문서를 진행할 모든 준비가 완료된 것입니다.

혹시 Windows를 사용하지 않습니까? macOS용 버전도 있으니 위의 링크를 따라 macOS용 Visual Studio Community 버전을 선택할 수 있습니다!





## Hello, world!
프로그래밍 언어를 배운 적이 있다면 "Heloo, World!" 예제로 시작한다는 것을 알고 있는데, 그런 훌륭한 전통을 깨뜨릴 수 있는 사람이 누가 있을까요? Visual Studio Community(이전 장에서 소개)를 시작하고 **파일 -> 새로 만들기 -> 프로젝트** 를 선택합니다. 프로젝트 대화 상자에서 **콘솔 앱** (.NET Framework)을 선택합니다. 이것은 Windows 시스템에서 가장 기본적인 응용 프로그램 유형이지만 언어를 배우는 데 좋습니다. **확인** 을 클릭하면 Visual Studio에서 `Program.cs` 라는 파일을 포함해서 새로운 프로젝트를 만듭니다. 이것이 모든 재미가 있는 곳이며 다음과 같아야 합니다.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
        }
    }
}
```

사실, 이 모든 내용은 실제로는 아무것도 진행하지 않으며 적어도 그렇게 보일 수 있습니다. 키보드에서 `F5` 키를 눌러 응용 프로그램을 실행합니다. 이렇게 하면 Visual Studio가 코드를 컴파일하고 실행하지만 보시다시피 별도의 작업은 수행하지 않습니다. 검은색 창이 실행된 후 다시 닫히는 것이 보일 수 있습니다. 우리의 응용 프로그램은 아직까지 아무런 작업도 수행하지 않기 때문입니다. 

다음 장에서 이 줄들의 모든 것을 확인하겠지만 지금은 몇 가지 결과를 보고 싶으므로 C#을 모두 알고있는 척하면서 출력을 얻기 위해 몇 줄만 추가하겠습니다. 마지막 `{...}` 집합 안에 다음과 같은  줄을 추가합니다.

```
Console.WriteLine("Hello, world!");
Console.ReadLine();
```

이제 첫 번째 응용 프로그램의 코드는 다음과 같아야 합니다.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, world!");
            Console.ReadLine();
        }
    }
}
```

다시 한 번 `F5` 키를 눌러 실행하면 검은색 창이 실제로 남아있고 *Hello, World!* 인사말이 화면에 표시되는 것을 볼 수 있습니다. 자, 단 두 줄의 코드를 추가했는데 어떻습니까? C# 및 .NET Framework의 좋은 점 중 하나는 이 예제에서 볼 수 있듯이 많은 코드는 훈련되지 않은 사람 눈에도 의미가 있다는 사실입니다.

첫 번째 줄은 `Console` 클래스를 사용해서 텍스트 줄을 출력하고 두 번째 줄은 콘솔에서 텍스트 줄을 읽습니다. 읽는다고요? 왜? 사실 이것은 약간의 **트릭** 인데, 그렇지 않으면 응용 프로그램이 곧바로 끝나버리고 사람이 보기도 전에 출력이 포함된 창을 닫아버리기 때문입니다.


`ReadLine()` 명령은 응용 프로그램에게 **사용자의 입력** 을 기다리도록 지시하며, 말 그대로 이제 콘솔 창에서 텍스트를 입력할 수 있습니다. `Enter` 키를 눌러서 닫습니다. 

축하합니다!! 방금 첫 번째 C# 응용 프로그램을 만들었습니다! 실제로 무슨 일이 일어난지에 대한 자세한 내용은 다음 장을 계속해서 읽으시길 바랍니다.





## Hello world explained
이전 장에서는 첫 번째 C# 응용 프로그램에서 콘솔에 텍스트를 출력했습니다. 진행 상황을 확인하기 위해 사용했던 코드에 대해 자세히 설명하지 않았으므로 이 장에서는 *Hello world!* 예제 코드에 대한 설명입니다. 

코드에서도 볼 수 있듯이 일부 줄은 비슷해 보이므로 개별 설명을 위해 그룹 단위로 다시 가져와 보겠습니다. 코드에서 가장 짧고 일반적인 문자인 `{` 및 `}` 부터 시작하겠습니다. 중괄호라고도 하며 C#에서는 **논리적 코드 블록의 시작과 끝을 표시** 합니다. 중괄호는 C++, Java, JavaScript 및 기타 여러 언어를 포함한 다른 많은 언어에서도 사용됩니다. 코드에서 볼 수 있듯이 함께 속한 여러 줄의 코드를 감싸는(*Wrapping*) 용도로 사용됩니다. 이후 예에서는 사용 방법이 더욱 명확해질 것입니다.

이제 처음 라인부터 시작하겠습니다.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
```

`using` 명령은 편집기에서 파란색으로 강조 표시된 **키워드** 입니다. `using` 키워드는 네임스페이스를 가져오며 **네임스페이스는 클래스의 모음** 입니다. **클래스는 일종의 기능을 제공** 하며 Visual Studio 같은 고급 IDE로 작업할 때는 일반적으로 사소한 코드의 일부를 자동으로 생성합니다. 이 경우 클래스를 만들거나 일반적으로 사용이 예상되는 네임스페이스를 가져왔습니다. 이 경우 5개의 네임스페이스를 가져왔고 각 네임스페이스에는 유용한 클래스가 많이 포함되어 있습니다. 예를 들어 `System` 네임스페이스의 일부인 `Console` 클래스를 사용합니다.

반면에 우리는 아직까지 `System.Linq` 네임스페이스는 사용하지 않으므로 순수주의자라면 이 줄을 제거할 수 있겠지만 큰 차이는 없습니다.

보시다시피 우리 프로그램에서 사용하는 네임스페이스도 있습니다.

```
namespace ConsoleApp1
```

네임스페이스 `ConsoleApp1` 은 이 애플리케이션의 **기본 네임스페이스** 이며 새로운 클래스는 기본적으로 이 네임스페이스의 일부가 됩니다. 분명히 이를 변경하고 또 다른 네임스페이스에 클래스를 만들 수 있습니다. 이 경우 다른 네임스페이스와 마찬가지로 `using` 명령으로 애플리케이션에서 사용하려면 이 네임스페이스를 가져와야 합니다.

다음으로 **클래스를 정의** 합니다. **C# 언어는 진정한 객체 지향 언어** 이기 때문에 실제 모든 작업을 수행하는 코드는 클래스 내에 래핑됩니다. 이 경우 클래스는 단순히 `Program` 이라고 합니다.

```
class Program
```

동일한 파일에 더 많은 클래스를 가질 수 있습니다. 지금 단지 하나의 클래스만 필요합니다. 클래스에는 여러 **변수**, **속성** 및 **메서드** 가 포함될 수 있으며, 나중에 자세히 설명할 개념입니다. 지금은 현재 클래스에는 단 하나의 메서드만 포함되어 있고 다른 것은 아무것도 포함되어 있지 않다는 것만 알면 됩니다. 다음과 같이 선언합니다.

```
static void Main(string[] args)
```

이 줄은 아마 이 예에서 가장 복잡한 줄일 것이므로 조금 나누어 설명합니다. 

첫 번째 단어는 **정적** 을 의미합니다. `static` 키워드는 **클래스를 인스턴스화하지 않고도 이 메서드에 액세스할 수 있다** 고 알려주지만, 이에 대해서는 클래스에 대한 장에서 자세히 설명합니다.

다음 키워드는 `void` 이며 이것은 **메서드가 반환할 내용** 을 알려줍니다. 예를 들어, 정수 또는 텍스트 문자열일 수 있지만 이 경우 메서드가 **아무 것도 반환하지 않는 것** 을 의미합니다. 

> [!TIP]
> C# 언어는 키워드 `void` 를 사용해서 아무것도 없다는 개념을 표현합니다.

다음 단어는 `Main` 이며 단순한 메서드의 이름입니다. 이 메서드는 소위 **애플리케이션의 진입점**, 즉 **실행할 첫 번째 코드 조각** 이며 이 예에서는 실행되는 유일한 부분입니다.

이제 메서드 이름 뒤에 괄호 집합에 **인수 집합을 지정** 할 수 있습니다. 이 예에서 메서드는 `args` 라는 단 하나의 인수만 사용합니다. 인수의 유형은 문자열 또는 더 정확하게는 문자열 배열이지만 나중에 보다 자세히 설명합니다. 

생각해보면 Windows 응용 프로그램은 항상 선택적 인수 집합으로 호출할 수 있기 때문에 이것은 완벽하게 이해될 것입니다. 이 인수는 기본 메서드에 텍스트 문자열로 전달됩니다.

이게 전부입니다. 이제 첫 번째 C# 응용 프로그램과 콘솔 응용 프로그램을 작동시키는 **기본 원칙과 기본적인 이해** 는 마쳤을 것입니다.


---


# The Basics

## Variables
변수는 창고에 비유할 수 있으며 프로그래머에게 **필수적** 입니다. C#에서 변수는 다음과 같이 선언합니다.

```
<데이터 유형> <이름>;
```

변수 선언 예제는 다음과 같습니다.

```
string name;
```

가장 기본적이지만 이 변수에는 아직까지 지정한 값이 없습니다. 다음과 같이 나중에 또는 선언과 동시에 할당할 수 있습니다.

```
<data type> <name> = <value>;
```

이 변수가 현재 작업중인 메서드(예: 클래스 멤버 변수)에 로컬 범위이 아닌 경우에는 **변수에 가시성을 할당** 할 수 있습니다.

```
<visibility> <데이터 유형> <이름> = <값>;
```

그리고 완전한 예는 다음과 같습니다:

```
private string name = "John Doe";
```

가시성 부분은 클래스와 관련이 깊으므로 클래스에 대한 장에서 보다 완전한 설명을 찾을 수 있습니다. 실제로 몇 가지를 사용하는 예를 통해 변수 부분에 집중해 보겠습니다.

```
using System;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            string firstName = "John";
            string lastName = "Doe";
            
            Console.WriteLine("Name: " + firstName + " " + lastName);
            
            Console.WriteLine("Please enter a new first name:");
            firstname = Console.ReadLine();
            
            Console.WriteLine("New name: " + firstName + " " + lastName);
            
            
            Console.ReadLine();
        }
    }
}
```

자, 이 중 많은 부분은 이미 설명했으므로 흥미로운 부분으로 바로 넘어가겠습니다. 우선, 문자열 유형의 몇 가지 변수를 선언합니다. 문자열은 보시다시피 단순히 텍스트를 포함하는데, 이것은 바로 값을 제공하기 때문입니다. 다음으로 두 변수를 사용해서 콘솔에 텍스트 줄을 출력합니다. 문자열은 `+` 문자를 사용해서 다른 부분을 **수집** 해서 구성됩니다.

다음으로, 사용자에게 새로운 이름을 입력하도록 요청한 다음 `ReadLine()` 메서드를 사용해서 콘솔에서 사용자의 입력을 읽고 *firstName* 변수에 할당합니다. 사용자가 `Enter` 키를 누르면 새로운 이름은 변수에 할당되고 다음 줄에서 이름을 다시 출력해서 변경 사항을 화면에 표시합니다. 우리는 방금 첫 번째 변수와 변수의 가장 중요한 기능인 **런타임에 값을 변경하는 기능** 을 사용했습니다.

또 다른 흥미로운 예는 간단한 수학을 사용하는 것입니다. 다음은 방금 사용한 것과 동일한 코드를 기반으로 작성한 것입니다.

> [!NOTE]
> 설명의 편의상 프로그램의 기본적인 코드는 생략하고 Main 메소드 내부의 코드만 작성했습니다.

```
int number1, number2;

Console.WriteLine("Please enter a number:");
number1 = int.Parse(Console.ReadLine());

Console.WriteLine("Thank you. One more:");
number2 = int.Parse(Console.ReadLine());

Console.WriteLine("Adding the two numbers: " + (number1 + number2));

Console.ReadLine();
```

이것을 `Main` 메서드에 넣고 사용해 보시길 바랍니다. 여기서 사용한 유일한 새로운 트릭은 `int` 입니다. 또한 `Parse()` 메서드를 사용합니다. 이는 단순히 **문자열로 읽고 정수로 변환** 합니다. 보시다시피 이 응용 프로그램은 사용자의 입력에 대한 유효성을 검사하는 노력은 전혀 기울이지 않으며 숫자가 아닌 것을 입력하면 **예외가 발생** 합니다. 이에 대해서는 나중에 자세히 설명합니다.


### 변수 및 범위
지금까지는 동일한 메서드 내에서 정의하고 사용하는 변수인 **지역 변수** 만 사용했습니다. C# 언어에서 **메서드 내부에 정의한 변수는 메서드 외부에서 사용할 수 없으므로 `local` 이라고 합니다.** 다른 프로그래밍 언어에 익숙하다면 더 많은 위치에 액세스할 수 있는 **전역 변수** 에 대해서도 알고 있을 수 있지만 **C# 언어는 전역 변수의 개념을 지원하지 않습니다.** 대신 이 클래스의 모든 메서드에서 액세스할 수 있는 클래스의 필드로 정의할 수 있습니다. 예를 들어 보여 드리겠습니다.

```
using System;

namespace VariableScope
{
    class Program
    {
        private static string helloClass = "Hello, class!";
        
        static void Main(string[] args)
        {
            string helloLocal = "Hello, local!";
            
            Console.WriteLine(helloLocal);
            Console.WriteLine(helloClass);
            
            DoStuff();
            
            Console.ReadLine();
        }
        
        static void DoStuff()
        {
            Console.WriteLine("A message from DoStuff: " + Program.helloClass);
        }
    }
}
```

메서드 내부가 아닌 클래스 범위로 선언된 *helloClass* 멤버를 주목하시기 바랍니다. - 이렇게 처리하면 `Main()` 메서드와 `DoStuff()` 메서드 모두에서 액세스할 수 있습니다. `Main()` 메서드 내부에서 선언되었으므로 이 메서드 내부에서만 사용할 수 있는 *helloLocal* 변수에는 해당되지 않습니다.


이와 같이 **변수가 선언 된 위치로 구별하는 개념을 범위 지정** 이라고 하며 너무 많은 곳에서 변경 될 수 있는 변수의 엄청난 혼란 상황을 방지합니다. 이를 돕는 또 다른 기술은 멤버 가시성(이 경우 private 키워드로 설명됨)이라고 하며, 클래스에 대한 장에서 논의할 것입니다.

### 요약
변수를 사용하면 텍스트 문자열, 숫자 또는 사용자 정의 개체 같은 **다양한 유형의 데이터를 저장** 할 수 있습니다. 정의한 메서드 내부에서 액세스할 수 있는 **지역 변수** 가 있고, 가시성이 허용하는 경우 클래스의 모든 메서드와 클래스 외부에서도 액세스할 수 있는 **클래스 필드** 가 있습니다.




## Data types
데이터 형식은 C# 같은 프로그래밍 언어의 모든 곳에서 사용됩니다. C# 언어는 **강력한 형식의 언어** 이기 때문에 변수에 대한 장에서 볼 수 있듯이 변수를 선언할 때마다 사용할 데이터 유형을 컴파일러에 알려야만 합니다. 이 장에서는 가장 많이 사용되는 데이터 유형 중 일부와 작동 방식을 살펴보겠습니다.

`bool` 은 가장 간단한 데이터 유형 중 하나입니다. `false` 또는 `true` 의 2개 값만 포함할 수 있습니다. `bool` 유형은 `if` 문 같은 논리 연산자를 사용할 때 이해하는 것이 중요합니다.

`int` 는 *integer* 의 약자로, **소수 없는 숫자** 를 저장하기 위한 데이터 유형입니다. 숫자로 작업할 때 `int` 는 **가장 일반적으로 사용되는 데이터 유형** 입니다. 정수는 저장할 숫자의 크기에 따라 C# 내에서 여러 데이터 유형을 가지고 있습니다.

`string` 은 텍스트, 즉 여러 개의 문자를 저장하는 데 사용됩니다. **C# 언어에서 문자열은 변경할 수 없으므로 문자열을 만든 후에는 변경되지 않습니다.** 문자열을 변경하는 메서드를 사용할 때는 실제 문자열은 변경되지 않고 대신 **새로운 문자열이 반환** 됩니다.

`char` 는 **단일 문자** 를 저장하는 데 사용됩니다.

`float` 는 소수를 포함할 수 있는 숫자를 저장하는 데 사용되는 데이터 유형 중 하나입니다.

### 요약
이것들은 C#에서 가장 기본적인 데이터 유형일 뿐이며 매우 건조한 주제이고 이에 대해 자세히 읽기 전에 일부 데이터 유형이 작동하는 것을 보고 싶을 수 있기 때문에 이에 대한 매우 기본적인 내용만 말씀드렸습니다. 따라서 변수를 사용해서 다양한 유형의 데이터를 포함하는 다음 장으로 넘어갑니다!

이 자습서 뒷부분에서는 .NET Framework에 있는 모든 다양한 데이터 형식에 대해 훨씬 더 자세히 살펴보겠습니다.



## Code Comments
코드를 작성할 때 입력하는 거의 모든 문자나 단어가 특별한 의미를 갖는다는 사실에 금방 익숙해질 것입니다. 예를 들어 C#에는 `class`, `namespace`, `public` 같은 수 많은 **키워드** 가 표시됩니다. 또한 컴파일러가 이러한 키워드와 자체 변수 및 메서드를 올바른 방식으로 사용하고 있는지 확인한다는 것도 알 수 있습니다. C#은 상당히 엄격한 언어이며 컴파일러는 모든 것이 제대로 입력되었는지 확인하는 데 도움이 됩니다. 그러나 코드 주석 덕분에 원하는 것을 작성할 수 있는 단일 가능성이 있습니다.

C#이든 다른 프로그래밍 언어이든 코드 중 일부에서 이미 주석을 경험했을 수 있습니다. 하지만 작성 방식은 매우 다양하므로 C#에서 사용할 수 있는 주석의 유형을 살펴보겠습니다.


### 한 줄 주석
C#에서 가장 기본적인 주석 유형은 한 줄 주석입니다. 이름에서 알 수 있듯이 한 줄을 주석으로 바꿉니다.

```
// My comments about the class name could go here...
class Program
{
    ......
```

이게 다입니다! 줄에 두 개의 슬래시(`//`)를 접두사로 붙이면 컴파일러가 이를 확인하고 완전히 무시하는 것으로 바뀝니다. 이것은 접두사가 붙은 줄에만 적용되지만 기본적으로 한 줄 주석을 사용해서 여러 주석 줄을 만드는 다음과 같이 자유롭게 수행할 수 있습니다.

```
// My comments about the class name could go here...
// Add as many lines as you would like
// ...Seriously!
class Program
{
    ...... 
```


### 여러 줄 주석
여러 줄의 주석을 많이 작성할 경우 C#에서 제공하는 여러 줄 주석 변형을 사용하는 것이 더 합리적일 수 있습니다. 모든 줄에 접두사를 붙일 필요 없이 시작 및 중지 문자 시퀀스를 입력하기만 하면 됩니다.

```
/*  
My comments about the class name could go here...  
Add as many lines of comments as you want  
    ...and use indentation, if you want to!  
*/  
class Program  
{
    ......
```

슬래시 문자와 별표 문자(`/*`)는 시작 시퀀스를 사용하고, 여러 줄에 걸쳐 원하는 것을 쓴 다음 별표 슬래시(*/)를 끝 시퀀스로 주석 블럭을 끝냅니다. 이 마커 사이에는 원하는 것을 모두 쓸 수 있습니다.

다른 프로그래밍 관련 주제와 마찬가지로 여러 개의 한 줄 주석을 사용할지 아니면 하나의 여러 줄 주석을 사용할지 여부는 종종 논쟁 거리가 됩니다. 개인적으로 저는 다양한 상황에 둘 다 사용합니다 - 결국 당신에게 달려 있습니다!


### 문서 주석
문서 주석(*XML 문서 주석* 이라고도 함)은 일반 주석처럼 보이지만 XML이 포함되어 있습니다. 일반 주석과 마찬가지로 한 줄과 여러 줄의 두 가지 형태로 제공됩니다. 또한 같은 방식으로 쓰지만 추가적인 문자를 사용합니다. 따라서 **한 줄 XML 문서 주석** 은 두 개 대신 **세 개의 슬래시(`///`)를 사용** 하며 여러 줄 주석의 변형은 시작 구분 기호에 추가 별표를 추가합니다. 어떻게 생겼는지 보겠습니다.

```
class User
{
    /// <summary>
    /// The Name of the User.
    /// </summary>
    public string Name { get; set; }

    /**
    * <summary>The Age of the User.</summary>
    */
    public string Age { get; set; }
}
```

여기서 단일 라인과 다중 라인 문서 주석의 두 가지 변형을 모두 살펴볼 수 있습니다. 결과는 동일하지만 첫 번째 변형이 문서 주석에서 가장 일반적으로 사용하는 경향이 있습니다.

문서 주석으로 유형과 해당 구성원을 문서화한다는 것은 꽤나 큰 주제이므로 이후의 장에서 더 자세히 다루겠지만 이제 어떻게 보이는지는 알 수 있습니다!


### 코드 주석 및 작업 목록
Visual Studio를 사용할 경우 코드 주석을 추적하는 데 도움이 될 수 있습니다. 작업 목록 창(메뉴에서 액세스하며 보기 > 작업 목록)은 특별하지만 매우 간단한 작업 목록 주석 구문을 사용할 경우 주석이 나타납니다.

```
//TODO: Change "world" to "universe"
Console.WriteLine("Hello, world!");
//HACK: Don't try this at home....
int answerToLife = 42;
```

따라서 한 줄 주석 바로 뒤에 `TODO` 또는 `HACK` 이 오면 다음과 같이 Visual Studio의 작업 목록에 나타납니다.


![](./images/img_20250726_193351.jpg)


그리고 사용 중인 Visual Studio 버전에 따라 다음과 같이 주석 토큰의 일부 또는 전부에 응답하는 더욱 많은 형식이 있습니다.

- TODO
- HACK
- MEMO
- CANCEL

원할 경우 자신만의 토큰도 추가할 수 있습니다 - 이 문서에 설명된 단계를 따르기만 하면 됩니다.


### 요약
코드 주석은 코드를 문서화하거나 자신이나 잠재적인 동료에게 작동 방식에 대한 단서를 남기는 데 매우 유용합니다. 추가적인 이점으로, 무언가의 코드를 빠르게 테스트할 때도 유용합니다 - 줄을 복사한 후 원래 줄을 주석 처리하면 어떻게 작동하는지 간단히 확인할 수 있습니다. 결과가 만족스럽지 않으면 새로운 줄은 삭제하고 원래 줄의 주석 처리를 제거한다면 이전으로 돌아갈 수 있습니다.

그리고 최종 사용자가 주석문을 본다는 것에 대해서는 걱정하지 마시길 바랍니다. - 이미 언급했듯이 컴파일러에 의해 **완전히 무시** 되므로 최종 DLL 또는 EXE 파일에는 포함되지 않습니다. 코드 주석은 프로그래밍할 때 개인적인 여유 공간이므로 원하는 방식으로 자유롭게 사용하시기 바랍니다.



---



# Control Structures

## The if statement
모든 프로그래밍 언어에서 가장 중요한 명령문 중 하나는 `if` 문입니다. 조건부 코드 블록을 설정할 수 있다는 것은 소프트웨어 작성의 기본 원칙입니다. C#에서 `if` 문은 사용하기 매우 간단합니다. 이미 다른 프로그래밍 언어를 사용한 경우 C#에서 `if` 문은 바로 사용할 수 있습니다. 어쨌든 어떻게 사용하는지 보려면 계속해서 읽으시길 바랍니다. 

`if` 문에는 부울 결과, 즉 `true` 또는 `false` 값이 필요합니다. 일부 프로그래밍 언어에서는 여러 데이터 유형을 자동으로 부울 형태로 변환할 수 있지만 C#에서는 결과를 부울로만 만들어야 합니다. 예를 들어, `if(number)` 를 사용할 수 없지만 나중에 하는 것처럼 숫자를 무언가와 비교해서 참 또는 거짓을 생성할 수는 있습니다.

이전 장에서 변수를 살펴봤으므로 예제 중 하나를 확장해서 조건부 논리를 사용하는 방법을 살펴보겠습니다.

```
using System;

namespace VariableScope
{
    class Program
    {
        private static string helloClass = "Hello, class!";
        
        static void Main(string[] args)
        {
            int number;
            
            Console.WriteLine("Please enter a number between 0 and 10:");
            number = int.Parse(Console.ReadLine());
            
            if (number > 10)
                Console.WriteLine("Hey! The number should be 10 or lesss!");
            else
            
            if (number < 0)
                Console.WriteLine("Hey! The number should be 0 or more!");
            else
                Console.WriteLine("Good job!");
                
            Console.ReadLine();
        }
    }
}
```

입력한 숫자가 0 에서 10 사이인지 확인하기 위해 2개의 `if` 문을 사용하고 `if` 문의 동반자인 `else` 키워드도 사용합니다. 그 의미는 영어를 사용하는 모든 사람에겐 분명합니다 - `if` 문의 조건이 충족되지 않을 경우 실행될 코드에 대한 대안을 제공합니다.

눈치채셨겠지만 `{` 및 `}` 문자를 사용해서 코드의 조건부 블록을 정의하지 않았습니다!! 규칙은 블록에 한 줄의 코드만 포함된 경우 블록 문자는 필요하지 않다는 것입니다. 자, 단순히 숫자를 확인하는 데 많은 줄을 사용한 것처럼 보이지 않습니까? 다음과 같이 더 적은 코드로 수행할 수 있습니다.

```
if((number > 10) || (number < 0))
    Console.WriteLine("Hey! The number should be 0 or more and 10 or less!");
else
    Console.WriteLine("Good job!");
```

각 조건을 괄호에 넣은 다음 `||` (*or*) 단순히 "또는" 을 의미하는 연산자로 숫자가 10보다 크거나 0보다 작은지 확인합니다. 많이 사용하게 될 또 다른 연산자는 `&&` AND 연산자입니다. OR 대신 AND 연산자를 사용할 수 있을까요? 물론 다음과 같이 약간 뒤집어 사용합니다.

```
if((number <= 10) && (number >= 0))
    Console.WriteLine("Good job!");
else
    Console.WriteLine("Hey! The number should be 0 or more and 10 or less!");
```

이것은 "작거나 같음" 과 "크거나 같음" 이라는 몇 가지 새로운 연산자를 도입합니다.





## The switch statement
`switch` 문은 `if` 문과 같습니다. 각 가능성에 대한 작업과 다른 것은 `true` 로 평가되지 않는 경우를 대비한 선택적 기본 작업이 있는 가능성 목록입니다. 간단한 `switch` 문은 다음과 같습니다.

```
int number = 1;
switch(number)
{
    case 0:
        Console.WriteLine("The number is zero!");
        break;
    case 1:
        Console.WriteLine("The number is one!");
        break;
}
```

확인할 식별자(변수)는 `switch` 키워드 뒤에 배치하고 주어진 값에 대한 식별자를 확인하는 `case` 문 목록이 있습니다. 각 케이스의 끝에 `break` 문이 있음을 알 수 있습니다. C#에서는 블록이 끝나기 전에 블록을 떠나기만 하면 됩니다. 함수를 작성할 경우 `break` 문 대신 `return` 문을 사용할 수 있습니다.

이 경우 정수를 사용하지만 문자열 또는 다른 간단한 데이터 유형일 수도 있습니다. 또한 여러 케이스에 동일한 작업을 지정할 수 있습니다. 다음 예제에서 이를 수행해서 사용자의 입력을 가져와 `switch` 문에서 사용합니다.

```
Console.WriteLine("Do you enjoy C# ? (yes/no/maybe)");
string input = Console.ReadLine();
switch(input.ToLower())
{
    case "yes":
    case "maybe":
        Console.WriteLine("Great!");
        break;
    case "no":
        Console.WriteLine("Too bad!");
        break;
}
```

이 예제는 사용자에게 질문하고 *yes*, *no* 또는 *mamabe* 를 입력하도록 제안합니다. 그런 다음 사용자 입력을 읽고 이에 대한 `switch` 문을 만듭니다. 사용자를 돕기 위해 소문자와 대문자 사이에 차이가 없도록 소문자 문자열과 비교하기 전에 입력을 소문자로 변환합니다.

그래도 사용자는 오타를 만들거나 완전히 다른 것을 작성할 수 있으며, 이 경우 `switch` 문의 `default` 문에 의해 출력은 생성되지 않습니다. 기본 키워드를 입력하세요!

```
Console.WriteLine("Do you enjoy C# ? (yes/no/maybe)");
string input = Console.ReadLine();
switch(input.ToLower())
{
    case "yes":
    case "maybe":
      Console.WriteLine("Great!");
      break;
    case "no":
      Console.WriteLine("Too bad!");
      break;
    default:
      Console.WriteLine("I'm sorry, I don't understand that!");
      break;
}
```

`case` 문 중에 `true` 로 평가되지 않을 경우 `default` 문(있을 경우)이 실행됩니다. 이전 예제에서 보았듯이 이것은 **선택 사항** 입니다.




## Loops
소프트웨어를 작성할 때 또 다른 필수 기술은 코드 블록을 X번 반복하는 기능인 반복(*looping*) 기능입니다. C#에는 4가지 변형이 존재하며 각각을 살펴보겠습니다.

### while 루프
`while` 루프는 가장 간단한 것이므로 그것부터 시작하겠습니다. `while` 루프는 주어진 조건이 참인 동안만 코드 블록을 실행합니다. 작은 예와 몇 가지 추가 설명입니다:

```
using System;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            int number = 0;
    
            while(number < 5)
            {
                Console.WriteLine(number);
                number = number + 1;
            }
    
            Console.ReadLine();
        }
    }
}
```

코드를 실행해 보시기 바랍니다. 0 에서 4 까지의 숫자 목록을 얻을 수 있습니다. 숫자는 먼저 0 으로 정의되고 루프의 코드가 실행될 때마다 1씩 증가합니다. 그런데 코드에는 5 라고 표시되어 있는데 왜 4까지만 표시할까요? 조건이 `true` 값을 반환하려면 숫자가 5보다 작아야만 하며, 이 경우 숫자가 5와 같다면 숫자를 출력하는 코드에 도달하지 못함을 의미합니다. `while` 루프의 조건은 **코드 블록에 들어가기 전에 평가** 되기 때문입니다.


### do 루프
`do` 루프의 경우 그 반대이며, `while` 루프처럼 작동합니다. `do` 루프는 루프가 먼저 실행된 후 조건을 평가하며 코드 블록이 **항상 한 번 이상 실행** 되도록 합니다.

```
int number = 0;
do  
{  
    Console.WriteLine(number);  
    number = number + 1;  
} while(number < 5);
```

출력 결과는 동일하고 숫자가 5보다 크면 루프가 종료됩니다.


### for 루프
`for` 루프는 약간 다릅니다. **정확한 반복 횟수** 를 알고 있거나 반복 횟수를 알고 있을 때 선호됩니다. 다음은 `for` 루프의 예입니다.

```
using System;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            int number = 5;
    
            for(int i = 0; i < number; i++)
                Console.WriteLine(i);
    
            Console.ReadLine();
        }
    }
}
```

정확히 위의 예제와 동일한 출력을 생성하지만 보시다시피 `for` 루프는 조금 더 **컴팩트** 합니다. 계산을 위해 **변수를 초기화** 하고, 이를 테스트하기 위해 **조건문을 설정** 하고, **카운터를 증가** 시킵니다. 여기서 `++` 는 "변수 = 변수 + 1" 과 동일함을 의미하며 3개 부분으로 구성됩니다.

*i* 변수를 정의하고 0 으로 설정하는 첫 번째 부분은 **루프가 시작되기 전에 한 번만 실행** 됩니다. 마지막 2개 부분은 루프의 각 반복에 대해 실행됩니다. 매번 i는 숫자 변수와 비교됩니다 - i가 숫자보다 작으면 루프가 한 번 더 실행됩니다. 그 후, i는 1씩 늘어납니다.

프로그램을 실행한 다음 숫자 변수를 5보다 크거나 작은 변수로 변경하시길 바랍니다. 루프가 변경 사항에 곧바로 응답하는 것을 볼 수 있습니다.


### foreach 루프
우리가 살펴볼 마지막 루프는 `foreach` 루프입니다. 배열 또는 기타 기본 제공되는 목록 유형 같은 항목 모음에서 작동합니다. 이 예에서는 `ArrayList` 라는 간단한 목록을 사용합니다. 이는 배열과 매우 유사하게 작동하지만 걱정하지 마시길 바랍니다.

```
using System;
using System.Collections;

namespace ConsoleApplication1
{
    class Program
    {
        private static string helloClass = "Hello, class!";
        
        static void Main(string[] args)
        {
            ArrayList list = new ArrayList();
            list.Add("John Doe");
            list.Add("Jane Doe");
            list.Add("Someone Else");
            
            foreach(string name in list)
                Console.WriteLine(name);
                
            Console.ReadLine();
        }
    }
}
```

먼저, `ArrayList` 의 인스턴스를 만든 다음 몇 가지 문자열 항목을 추가합니다. `foreach` 루프를 사용해서 각 항목을 추출하고 *name* 변수를 매번 추출한 항목으로 설정합니다. 이렇게 처리하면 출력할 명명된 변수가 있습니다. 보시다시피, *name* 변수를 문자열 유형으로 선언합니다 – 컬렉션에서 가져올 데이터 유형을 항상 `foreach` 루프에 알려야 합니다. 다양한 유형으로 구성된 목록이 있을 경우에는 특정 클래스 대신 객체 클래스를 사용해서 각 항목을 객체 형태로 가져올 수 있습니다.


컬렉션으로 작업할 때 대부분의 경우 `foreach` 루프를 사용할 가능성이 매우 높은데, 이는 주로 이런 종류의 작업에 다른 루프문보다 간단하기 때문입니다.



---




# Classes

## Introduction to C# classes
많은 프로그래밍 튜토리얼에서 클래스에 대한 정보는 훨씬 나중을 위해 저장됩니다. 그러나 C#은 객체 지향 프로그래밍과 클래스에 관한 것이므로 이제 가장 중요한 기능에 대한 기본 소개를 살펴보겠습니다.

우선, 클래스는 관련 메서드와 변수의 그룹입니다. 클래스는 이러한 것들을 설명하며, 대부분의 경우 이 클래스의 인스턴스를 만들어 현재 객체라고 합니다. 이 개체에서는 정의된 메서드와 변수를 사용합니다. 물론 원하는 만큼 클래스의 인스턴스를 만들 수 있습니다. 클래스와 일반적으로 객체 지향 프로그래밍은 큰 주제입니다. 우리는 이 장과 이후 장에서 그 중 일부를 다룰 것이지만 전부는 아닙니다.

Hello world 장에서는 C#의 모든 것이 클래스를 기반으로 구축되었기 때문에 처음으로 사용되는 클래스를 보았습니다. Hello world 예제를 자체적으로 빌드한 클래스로 확장해 보겠습니다.

```
using System;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            Car car;

            car = new Car("Red");
            Console.WriteLine(car.Describe());

            car = new Car("Green");
            Console.WriteLine(car.Describe());

            Console.ReadLine();

        }
    }

    class Car
    {
        private string color;

        public Car(string color)
        {
            this.color = color;
        }

        public string Describe()
        {
            return "This car is " + Color;
        }

        public string Color
        {
            get { return color; }
            set { color = value; }
        }
    }
}
```

좋아요, 여기에 많은 새로운 것들이 있지만 거의 모든 것은이 튜토리얼의 앞부분에서 이미 사용한 것들을 기반으로 합니다. 보시다시피 Car라는 새 클래스를 정의했습니다. 더 쉬운 개요를 위해 기본 응용 프로그램과 동일한 파일에 선언되지만 일반적으로 새 클래스는 자체 파일에 정의됩니다. 그것은 물론 우리 차의 색상을 말하는 데 사용되는 색상이라는 단일 변수를 정의합니다. 우리는 그것을 private으로 선언했는데, 이는 좋은 방법입니다 - 외부에서 변수에 액세스하는 것은 속성을 사용해서 수행해야 합니다. Color 속성은 클래스 끝에 정의되어 color 변수에 대한 액세스 권한을 부여합니다.

그 외에도 Car 클래스는 생성자를 정의합니다. Car 객체를 색상으로 초기화할 수 있는 매개변수를 사용합니다. 생성자가 하나뿐이므로 Car 객체는 색상으로만 인스턴스화할 수 있습니다. Describe() 메서드를 사용하면 자동차에 대해 기록한 단일 정보로 멋진 메시지를 얻을 수 있습니다. 단순히 우리가 제공한 정보가 포함된 문자열을 반환합니다.


이제 기본 응용 프로그램에서 Car 유형의 변수를 선언합니다. 그런 다음 "Red"를 매개변수로 사용해서 새 인스턴스를 만듭니다. 우리 클래스의 코드에 따르면 이것은 빨간색이 자동차 색상으로 할당된다는 것을 의미합니다. 이를 확인하기 위해 Describe() 메서드를 호출하고 동일한 클래스의 여러 인스턴스를 얼마나 쉽게 만들 수 있는지 보여주기 위해 다른 색상으로 다시 수행합니다. 우리는 방금 첫 번째 함수형 클래스를 만들어 사용했습니다.


다음 장에서는 속성, 생성자 및 가시성과 같은 개념에 대해 더 자세히 설명합니다.





## Fields
클래스의 가장 기본적인 구성 요소 중 하나는 필드입니다. 앞서 이야기한 변수와 같지만 메서드 수준이 아닌 클래스 수준에서 정의됩니다. 그 차이는 매우 중요하며 변수에 액세스할 수 있는 위치를 결정하는 범위의 개념과 모든 관련이 있습니다. 지역 변수(메서드 내부에 정의됨)는 이 특정 메서드에서만 액세스할 수 있는 반면, 클래스 필드는 클래스의 모든 메서드에서 액세스할 수 있으며 가시성이 허용하는 경우 다른 클래스의 메서드에서도 액세스할 수 있습니다.

즉, 변수와 필드의 차이는 선언된 위치에 거의 있습니다. 클래스 수준 변수는 필드라고 하는 반면 메서드 수준 변수는 일반적으로 변수라고 합니다.

필드는 종종 클래스의 맨 위 근처에서 선언되며 가시성은 종종 비공개로 설정됩니다(이 장의 뒷부분에서 가시성에 대해 논의할 것입니다). 다음과 같을 수 있습니다.

```
public class FieldsSample
{
    private string name;
    ....
```

이제 이 클래스의 모든 메서드에서 액세스할 수 있는 "name"이라는 클래스 수준 변수가 있습니다. 수업 외부에서 액세스할 수 없지만 비공개로 표시했기 때문입니다. 파생 클래스에서 필드에 액세스하려는 경우 필드를 보호된 것으로 자유롭게 선언할 수 있고, 어디서나 액세스하려는 경우 공개로 선언할 수 있지만, 클래스 외부에서 필드에 액세스하는 권장 방법은 다음 섹션에서 논의할 속성을 사용하는 것입니다.

위의 예에서 또는 "name" 변수에는 초기 값이 없으므로 사용하려면 먼저 무언가를 할당해야 합니다. 필드가 어떤 값으로 시작해야 하는지 이미 알고 있는 경우 선언하는 동시에 쉽게 할당할 수 있습니다.

```
public class FieldsSample
{
    private string name = "John Doe";
    ....
```

또는 클래스 생성자의 필드에 값을 할당할 수 있습니다. 이렇게 하면 선언 지점에서 필드에 할당된 모든 값을 덮어쓰고 동적 값을 할당할 수 있습니다.

앞서 이야기했듯이 클래스의 멤버는 "class.member"와 같은 점 표기법으로 액세스할 수 있습니다. 그러나 현재 클래스의 멤버에 액세스할 때 "this.member"와 같은 "this" 키워드를 사용합니다. 다음은 몇 개의 필드를 선언하고 메서드 내에서 사용하는 보다 완전한 예입니다.

```
public class Fields1
{
    private string name = "John Doe";
    private int age = 42;

    public void Describe()
    {
        string description = this.name + " is " + this.age + " years old...";
        Console.WriteLine(description);
    }
}
```

Describe() 메서드에서 (걱정하지 마세요. 다음 섹션 중 하나에서 메서드에 대해 설명하겠습니다) 선언된 두 필드를 기반으로 하는 값을 사용해서 "description"이라는 지역 변수를 선언합니다. "description"변수는 항상 변수여야 하며 필드가 아니어야 하는 변수의 좋은 예입니다. 일시적이며 이를 사용하는 메서드에만 관련이 있으며, 필드는 클래스의 다른 메서드와 쉽게 관련될 수 있습니다.

### 요약
필드는 클래스 내 어디에서나 액세스할 수 있는 데이터를 저장하는 데 사용할 수 있기 때문에 전역 변수와 약간 비슷하게 작동합니다. 선언 클래스 외부에서도 액세스 할 수 있지만 일반적으로는이 목적으로 속성이 사용됩니다. 다음 섹션에서 속성에 대해 이야기하겠습니다.




## Properties
이전 섹션에서는 필드에 대해 논의했습니다. 이는 클래스의 전역 변수와 같아서 모든 메서드에서 액세스할 수 있습니다. 또한 필드가 public으로 표시된 경우 다른 클래스에서 액세스할 수 있지만 일반적으로 권장되지 않는다는 사실에 대해서도 간략하게 논의했습니다. 클래스 외부에서 액세스하려는 변수/필드의 경우 대신 속성을 사용해야 합니다.

필드를 public으로 선언하면 외부에서 필드에 대한 완전한 액세스 권한을 부여합니다 - 다른 클래스는 선언하는 클래스에 통지하지 않고 원하는 모든 작업을 수행할 수 있습니다. Properties는 필드가 읽기 전용인지 쓰기 전용인지 여부를 지정하고 선언 클래스가 값을 반환하거나 필드에 할당하기 전에 값을 확인하고 조작할 수 있도록 해서 선언 클래스에 컨트롤을 다시 제공합니다.

속성은 가시성, 데이터 유형 및 이름이 있는 필드와 매우 유사하게 선언되기 때문에 필드와 메서드 사이의 교차처럼 보이지만 동작을 제어하기위한 메서드와 같은 본문도 있습니다.

```
public string Name
{
    get { return _name; }
    set { _name = value; }
}
```

특별한 get 및 set 키워드를 확인하십시오. 필드를 읽고(get'ing) 쓰고(set'ing) 할 때 동작을 제어하기 위해 속성에만 사용됩니다. 읽기 전용 또는 쓰기 전용 속성을 만들기 위해 get 또는 set 구현 만 있는 속성을 가질 수 있으며, get 또는 set 구현의 가시성을 제어 할 수도 있습니다 (예 : 어디에서나 읽을 수 있지만 (public) 선언 클래스 (private) 내부에서만 수정 할 수 있습니다.

또한 _name라는 필드를 언급한다는 것을 알 수 있습니다. 속성이 사용할 수 있도록 클래스에서도 선언해야 합니다. 필드 및 속성에 대한 일반적인 사용 패턴은 다음과 같습니다.

```
private string _name = "John Doe";

public string Name
{
    get { return _name; }
    set { _name = value; }
}
```

이제 필드와 속성이 함께 작동하는 방식을 볼 수 있습니다. get 메서드는 _name 필드의 값을 반환하고 set 메서드는 전달된 값을 _name 필드에 할당합니다. set 메서드에서는 이 특정 상황에서 속성에 전달된 값을 참조하는 특수 키워드 값을 사용합니다.

따라서 이것은 거의 기본적인 일이며 이 시점에서 우리는 단순한 공공 분야로는 달성할 수 없는 일을 하지 않습니다. 그러나 나중에 다른 클래스가 이름으로 작동하는 방법을 더 많이 제어하고 싶다고 결정할 수 있으며 이것을 속성으로 구현했으므로 클래스를 사용하는 사람을 방해하지 않고 구현을 자유롭게 수정할 수 있습니다. 예를 들어 Name 속성을 다음과 같이 수정할 수 있습니다.

```
private string _name = "John Doe";

public string Name
{
    get 
    {
        return _name.ToUpper();
    }
    set 
    {
        if(!value.Contains(" "))
            throw new Exception("Please specify both first and last name!");
        _name = value; 
    }
}
```

이제 get 메서드는 지원 필드(_name)가 있는 경우에 관계없이 반환된 값이 항상 UPPERCASE로 표시되도록 합니다. set 메서드에서 이름에 항상 이름과 성이 모두 포함되어야 한다고 결정했기 때문에 전달된 값에 공백이 포함되어 있는지 확인하기 위해 몇 줄의 코드를 추가했습니다. 이것은 모두 매우 조잡하고 단순화 된 것이지만 속성을 사용할 때 얻을 수있는 전체 수준의 제어를 설명해야합니다.

### 읽기 전용 속성
이 자습서의 예제에서 볼 수 있는 대부분의 속성은 속성의 가장 일반적인 사용법이기 때문에 읽을 수 있고 쓸 수 있지만 항상 그럴 필요는 없습니다. 우선, 다음과 같이 get-메서드만 사용해서 속성을 선언할 수 있습니다.

```
private string _name = "John Doe";

public string Name
{
    get { return _name; }
}
```

이 경우 더 이상 "Name" 속성을 변경할 수 없습니다 - 읽을 수만 있으며 값을 할당하려고 하면 컴파일러에서 오류가 발생합니다. 백업 필드 "_name"에 새 값을 할당할 수 있으므로 클래스 내부에서 값을 변경할 수 있습니다. 그런 식으로 하면 속성의 가장 큰 장점 중 하나 인 값을 수락 할 수 있는지 여부를 항상 제어 할 수있는 기능이 무효화됩니다. 이미 이야기했듯이 set-method는 값의 유효성 검사를 수행하는 좋은 방법이지만 여러 위치에서 _name 필드에 새 값을 할당하면 속성이 읽기 전용이기 때문에이 유효성 검사를 받을 수 없습니다.

다행스럽게도 C#은 이에 대한 해결책을 제공합니다. 속성에 set 메서드를 정의할 수 있지만 예를 들어 private 또는 protected 키워드를 사용해서 가시성을 제한할 수 있습니다. 이렇게 하면 클래스 내부(또는 protected 키워드를 사용하는 경우 상속된 클래스)에서 속성에 값을 할당하고 그에 따라 유효성을 검사할 수 있는 두 가지 장점을 모두 제공합니다. 예를 들면 다음과 같습니다.

```
private string _name = "John Doe";

public string Name
{
    get { return _name; }

    private set
    {
        if(IsValidName(value))
            this._name = value;
    }
}

public bool IsValidName(string name)
{
    return name.EndsWith("Doe");

}
```

여기서 주요 차이점은 단순히 "set"키워드 바로 앞에 있는 "private" 키워드이며, 언급했듯이 필요에 따라 protected 또는 internal로 바꿀 수 있습니다.

### 자동 구현된 속성
경우에 따라 필드에 대한 모든 제어가 필요하지 않으며 첫 번째 예제에서 본 것 외에는 아무 작업도 수행하지 않는 get 및 set 메서드를 사용해서 필드와 속성을 모두 구현하는 것이 번거롭게 느껴질 수 있습니다. 이 모든 추가 번거로움을 피하기 위해 변수를 공개 필드로 선언하고 싶은 유혹을 받을 수 있습니다. 하지만 그렇게 하지 마세요! 다행스럽게도 Microsoft는 C# 버전 3에 자동 구현 속성을 추가하기로 결정해서 여러 줄의 코드를 절약할 수 있습니다. 차이점을 고려하십시오.

**선언된 지원 필드가 있는 일반 속성:**

```
private string _name;

public string Name
{
    get { return _name; }
    set { _name = value; }
}
```

**똑같은 동작이지만 자동 구현 된 속성이 있습니다.**

```
public string Name { get; set; }
```

get 및 set 메서드가 비어 있고 개인 지원 필드가 선언되지 않았습니다 - 즉, 이제 첫 번째 예제와 똑같은 동작을 수행할 수 있지만 한 줄의 코드로 수행할 수 있습니다! private backing 필드는 런타임에 여전히 존재하며 이름에서 알 수 있듯이 컴파일러에 의해 자동으로 구현됩니다. 나중에 이 특정 속성에 대한 더 많은 제어가 필요하다고 결정하면 get 및 set 메서드의 원하는 구현을 사용해서 일반 필드/속성 조합으로 간단히 변경할 수 있습니다.


자동 구현 된 속성을 사용할 때 일반 속성에서 제어하는 중요한 메커니즘이 여전히 남아 있습니다. set 키워드를 생략해서 읽기 전용 속성을 만들 수 있습니다.

```
public string ReadOnlyProperty { get; }
```

자동 구현 속성을 사용할 때 쓰기 전용 속성은 허용되지 않습니다.

#### 기본값이 있는 자동 구현 속성
C# 버전 6 이전에는 자동 구현 속성에 대한 기본값을 정의할 수 없었습니다.

```
private string _name = "John Doe";

public string Name
{
    get { return _name; }
    set { _name = value; }
}
```

그러나 C# 버전 6에서 Microsoft는 마침내 다음과 같이 기본값으로 자동 구현 속성을 초기화하는 기능을 추가했습니다.

```
public string Name { get; set; } = "John Doe";
```

### 표현식 본문 속성
Microsoft가 C# 6.0 및 7.0에서 구현한 또 다른 속성 관련 기능은 식 본문 멤버입니다. 단순히 속성과 메서드에 대한 한 줄 표현식을 작성할 수 있습니다 - 이 경우 공간을 덜 차지하고 약간 덜 입력이 필요한 방식으로 get / set 메서드에 사용하는 방법을 살펴 보겠습니다.

```
private string name;
public string Name
{
    get => name;
    set => name = value;
}
```

속성이 읽기 전용인 경우 구문이 더 짧을 수 있습니다.

```
public string Name => "John Doe";
```

물론 이것은 다음과 같이 값을 반환하기 전에 실제로 무언가를 수행해야하는 경우에도 작동합니다.

```
public string Name { get; set; } = "John Doe";

public string FirstName => this.Name.Substring(0, this.Name.IndexOf(" "));
```

보시다시피 이를 통해 실제 get 및 return 키워드 없이 get 메서드를 정의할 수 있으며 여러 줄이 아닌 한 줄에 모두 유지하도록 권장합니다.

### 요약
속성은 클래스가 필드에 액세스하고 조작할 수 있는 방법을 더 잘 제어할 수 있도록 하며, 선언 클래스 외부에서 필드에 대한 액세스 권한을 부여하려는 경우 항상 사용해야 합니다.





## Methods (functions)
속성과 필드는 클래스의 수동 부분으로 간주될 수 있지만 메서드는 활성입니다. 하나 이상의 작업을 수행하고 선택적으로 결과를 반환합니다. 다른 프로그래밍 언어에서는 함수 또는 "함수"라고도 하지만 클래스에 속하는 C#에서는 메서드라고 합니다. 메서드는 여러 위치에서 다시 호출할 수 있는 메서드에 기능을 캡슐화할 수 있기 때문에 매우 유용합니다.

메서드는 다음과 같이 정의됩니다.

```
<visibility> <return type> <name>(<parameters>)
{
    <method code>
}
```

다음은 매우 기본적인 예입니다.

```
public int AddNumbers(int number1, int number2)
{
    return number1 + number2;
}
```

이 매우 기본적인 방법은 두 개의 숫자를 더하고 결과를 반환합니다. 다양한 부분을 단계별로 살펴보겠습니다.

- public은 가시성입니다(자세한 내용은 이 튜토리얼의 뒷부분에서 설명)
- int는 반환 유형입니다. 메서드가 아무 것도 반환하지 않도록 하려면 대신 void 키워드를 사용하십시오
- AddNumbers는 메서드의 이름입니다.
- (정수 번호1, 정수 번호2) - 이것들은 매개변수입니다(나중에 자세히 설명). 매개변수는 선택 사항이므로 괄호 사이의 공백을 비워 둘 수 있습니다. 괄호는 선택 사항이 아닙니다.
- 메서드 내부(중괄호 사이)에서 메서드의 실제 코드를 찾을 수 있습니다. 하나 또는 여러 줄의 코드일 수 있습니다.

메서드를 호출하려면 이름 뒤에 괄호 집합을 작성하기만 하면 됩니다. 괄호 안에 다음과 같이 매개변수(메서드가 허용하는 경우)를 작성해야 합니다.

```
AddNumbers(3, 39);
```

메서드는 클래스에 정의되어 있으므로 현재 있는 클래스가 아닌 다른 클래스에서 메서드를 호출할 수 있습니다. 그렇다면 메서드 호출 앞에 객체 이름을 붙이거나 정적 메소드의 경우 클래스 이름을 붙여야 합니다(나중에 자세히 설명). 다음은 MathHelper라는 다른 클래스에 배치된 AddNumbers() 메서드를 호출하는 예입니다.

```
public void DoMath()
{
    MathHelper mathHelper = new MathHelper();
    int result = mathHelper.AddNumbers(4, 38);
    Console.WriteLine(result);
}
```

    
### 메서드 반환 형식
반환 유형에 대해 더 자세히 이야기해 보겠습니다. 위의 예제에서는 정수를 반환 형식으로 사용해서 메서드를 정의했지만 다른 종류의 C# 데이터 형식을 자유롭게 반환할 수 있습니다. 사실, 위의 DoMath() 메서드에서 본 것처럼 아무 것도 반환하지 않는 메서드를 선언할 수도 있습니다. int 를 void 키워드로 대체했는데, 이는 이 메서드가 아무 것도 반환해서는 안된다는 것을 의미합니다. 일부 프로그래밍 언어에서는 반환 형식이 없는 함수를 프로시저라고 하지만 C#에서는 항상 메서드라고 합니다.


메소드에 대한 반환 유형을 선언 할 때 무언가를 반환해야한다는 것을 알아야합니다 - 그렇지 않으면 컴파일러가 즉시 불평 할 것입니다.

```
public int AddNumbers(int number1, int number2)
{
    Console.WriteLine(number1 + number2);
}

Compiler error: AddNumbers(int, int)': not all code paths return a value
```

즉, 선언 된 반환 유형이있는 경우 메서드 내에 하나 (또는 여러 개) return 키워드가 필요합니다. 다음과 같이 가능한 코드 경로가 여러 개 있는 상황에는 둘 이상이 필요할 수 있습니다.

```
public int AddLargeNumbers(int number1, int number2)
{            
    if((number1 > 1000) && (number2 > 1000))
    {
        return number1 + number2;
    }
    return 0;
}
```

이 경우 두 번째 return 문도 필요합니다 - 생략하면 조건문이 첫 번째 return 문이 적중되는 것을 방지할 수 있기 때문에 컴파일러가 불평할 것입니다.

### 요약
메서드를 사용하면 여러 위치에서 기능을 캡슐화하고 재사용할 수 있습니다. 메서드에 다른 매개변수를 제공하면 다른 결과를 얻을 수 있습니다. 위의 예에서 몇 가지 매개변수를 사용했지만 다음 섹션에서는 메서드 매개변수의 주제에 대해 훨씬 더 자세히 살펴보겠습니다.





## Method parameters
이전 섹션에서는 메서드에 대해 이야기하고 메서드/함수 매개변수의 개념에 대해 간략하게 소개했습니다. 이 섹션에서는 이 주제에 대해 모든 변형에 대해 더 깊이 파고들 것입니다. 언급했듯이 메서드는 매개변수 없이 작동할 수 있지만 일반적으로 하나 이상의 매개변수가 있어 메서드가 작업을 수행하는 데 도움이 됩니다.

이전 섹션에서 매개변수에 대한 매우 간단한 사용 시나리오를 이미 살펴보았습니다. 두 개의 숫자를 매개변수로 사용하고 이 두 숫자의 합계를 반환하는 AddNumbers() 메서드입니다.

```
public int AddNumbers(int number1, int number2)
{
    return number1 + number2;
}
```

이것은 메소드를 사용하면 메소드의 기능을 캡슐화할 수 있지만 매개변수를 통해 이 메소드를 호출할 때 결과에 영향을 줄 수 있기 때문에 영리한 개념 메소드가 무엇인지 보여주는 데 큰 도움이 됩니다.

```
AddNumbers(2, 3);

Result: 5

AddNumbers(38, 4);

Result: 42
```

이것은 기본 유형의 매개변수이지만 매개변수의 동작을 변경하는 데 사용할 수 있는 모든 다양한 수정자와 옵션에 대해 자세히 이야기해 보겠습니다.

이 섹션에서는 다양한 유형의 매개 변수와 매개 변수가 어떻게 도움이 될 수 있는지 자세히 알아볼 것이지만, C#을 막 시작하고 몇 가지 결과만 보고 싶다면 현재로서는 다음이 너무 복잡하고 기술적일 수 있습니다. 섹션의 나머지 부분을 건너뛰고 나중에 준비가 되면 다시 돌아오십시오.

### 선택적 매개변수
기본적으로 하나 이상의 매개 변수를 사용해서 메서드를 호출할 때 이러한 모든 매개 변수에 대한 값을 제공해야 합니다. 그러나 경우에 따라 하나 이상의 매개변수를 선택 사항으로 만들어야 할 수도 있습니다. 일부 프로그래밍 언어에서는 매개 변수를 선택 사항으로 표시하기만 하면 됩니다., 그러나 C #에서는 매개 변수가 메서드 선언에 기본값을 제공해서 선택 사항으로 만듭니다. 이것은 호출자가 매개 변수를 제공하지 않는 상황을 처리하기 위해 추가 코드를 작성하지 않아도 되기 때문에 실제로 좋은 솔루션입니다.

다음은 선택적 매개 변수가 있는 메서드의 예입니다.

```
public int AddNumbers(int number1, int number2, int number3 = 0)
{
    return number1 + number2 + number3;
}
```

마지막 매개변수(number3)는 기본값(0)을 제공했기 때문에 이제 선택 사항입니다. 호출할 때 이제 다음과 같이 두세 개의 값을 제공할 수 있습니다.

```
public void Main(string[] args)
{
    AddNumbers(38, 4);
    AddNumbers(36, 4, 2);
}
```

둘 이상의 매개 변수를 선택 사항으로 만들 수 있습니다 - 실제로 메서드는 필요한 경우 선택적 매개 변수 만 구성 될 수 있습니다. 선택적 매개 변수는 메서드 선언에서 마지막에 와야하며 선택 사항이 아닌 매개 변수 사이에 있지 않아야합니다.

**params 수정자**
여러 선택적 매개 변수 대신 params 한정자를 사용해서 임의의 수의 매개 변수를 허용할 수 있습니다. 다음과 같을 수 있습니다.

```
public void GreetPersons(params string[] names) { }
```

호출하면 다음과 같이 보일 수 있습니다.

```
GreetPersons("John", "Jane", "Tarzan");
```

params 접근 방식을 사용하는 또 다른 이점은 메서드에 0 매개 변수를 전달할 수 있다는 것입니다. params 수정자가 있는 매개 변수가 마지막 매개 변수인 한 params가 있는 메서드는 일반 매개 변수를 사용할 수도 있습니다. 그 외에도 메서드당 params 키워드를 사용하는 매개변수는 하나만 사용할 수 있습니다. 다음은 params 수정자를 사용해서 GreetPersons() 메서드로 가변 수의 이름을 인쇄하는 완전한 예입니다.

```
public void Main(string[] args)
{
    GreetPersons("John", "Jane", "Tarzan");
}

public void GreetPersons(params string[] names)
{
    foreach(string name in names)
        Console.WriteLine("Hello " + name);
}
```

### 매개 변수 유형: 값 또는 참조
C# 및 기타 프로그래밍 언어도 "값별"과 "참조별"의 두 가지 매개 변수 형식 간에 다릅니다. C#의 기본값은 "값별"이며, 이는 기본적으로 변수를 메서드 호출에 전달할 때 실제로 객체에 대한 참조 대신 객체의 복사본을 보내는 것을 의미합니다. 이는 또한 매개 변수로 전달한 원래 개체에 영향을 주지 않고 메서드 내부에서 매개 변수를 변경할 수 있음을 의미합니다.

예를 들어 이 동작을 쉽게 시연할 수 있습니다.

```
public void Main(string[] args)
{
    int number = 20;
    AddFive(number);
    Console.WriteLine(number);
}

public void AddFive(int number)
{
    number = number + 5;
}
```

전달하는 숫자에 5를 더하는 AddFive()라는 매우 기본적인 메서드가 있습니다. 따라서 Main() 메서드에서 값이 20인 number라는 변수를 만든 다음 AddFive() 메서드를 호출합니다. 이제 다음 줄에서 숫자 변수를 쓸 때 그 값은 이제 25일 것으로 예상할 수 있지만 대신 20으로 유지됩니다. 왜? 기본적으로 매개 변수는 원래 개체의 복사본(값별)으로 전달되었으므로 AddFive() 메서드가 매개 변수에서 작동할 때 복사본에서 작동하므로 원래 변수에 영향을 주지 않습니다.

현재 AddFive() 메서드가 원래 값을 수정할 수 있도록 이 동작을 변경하는 두 가지 방법이 있습니다. ref 한정자 또는 in/out 한정자를 사용할 수 있습니다.

**ref 수정자**
ref 수정자는 "reference"의 줄임말이며 기본적으로 매개변수의 동작을 "값으로"의 기본 동작에서 "참조로"로 변경하므로 이제 값의 복사본 대신 원래 변수에 대한 참조를 전달합니다. 다음은 수정된 예입니다.

```
public void Main(string[] args)
{
    int number = 20;
    AddFive(ref number);
    Console.WriteLine(number);
}

public void AddFive(ref int number)
{
    number = number + 5;
}
```

메서드 선언과 메서드 호출에서 매개 변수를 전달 할 때 두 곳에 "ref"키워드를 추가했음을 알 수 있습니다. 이 변경으로 우리는 이제 원래 예상했을 수 있는 동작을 얻습니다 - ref 수정자를 사용하면 메서드가 복사본 대신 매개 변수로 전달된 실제 값에 대해 작동할 수 있기 때문에 결과는 이제 20이 아닌 25입니다.

**out 수정자**
ref 수정자와 마찬가지로 out 수정자는 매개 변수가 값 대신 참조로 전달되도록 하지만 큰 차이점이 있습니다. ref 수정자를 사용할 때 메서드 내에서 수정하거나 그대로 두도록 선택할 수 있는 초기화 된 값을 전달합니다. 반면에 out 수정자를 사용하는 경우 메서드 내부의 매개 변수를 초기화해야 합니다. 이것은 또한 out 수정자를 사용할 때 초기화되지 않은 값을 전달할 수 있음을 의미합니다 - 컴파일러는 값을 할당하지 않고 out 매개 변수가 있는 메서드를 남겨두려고하면 불평할 것입니다.


C#에서 메서드는 하나의 값만 반환할 수 있지만 out 한정자를 사용하는 경우 out 한정자와 함께 여러 매개 변수를 전달해서 이를 우회할 수 있습니다. 다음은 두 개의 숫자를 전달한 다음 out 수정자를 사용해서 이 숫자를 사용해서 덧셈과 뺄셈을 모두 반환하는 예입니다.

```
public void Main(string[] args)
{
    int addedValue, subtractedValue;
    DoMath(10, 5, out addedValue, out subtractedValue);
    Console.WriteLine(addedValue);
    Console.WriteLine(subtractedValue);
}

public void DoMath(int number1, int number2, out int addedValue, out int subtractedValue)
{
    addedValue = number1 + number2;
    subtractedValue = number1 - number2;
}
Output:

15
5
```

예제의 시작 부분에서 볼 수 있듯이 두 변수 (addedValue 및 subtractedValue)를 아웃 매개 변수로 전달하기 전에 선언합니다. 이는 이전 버전의 C# 언어의 요구 사항이었지만 C# 버전 6에서는 다음과 같이 메서드 호출에서 직접 선언할 수 있습니다.

```
DoMath(10, 5, out int addedValue, out int subtractedValue);
Console.WriteLine(addedValue);
Console.WriteLine(subtractedValue);
```

**in 한정자**
out 한정자와 마찬가지로 in 한정자는 매개 변수가 값의 복사본 대신 참조로 전달되도록 하지만 out 한정자와 달리 in 한정자는 메서드 내부의 변수를 변경할 수 없도록 합니다.

당신의 첫 번째 생각은 다음과 같습니다 : 매개 변수의 값을 변경할 수없다면 변경 사항이 원래 변수에 영향을 미치지 않는 일반 매개 변수로 전달하는 것이 좋습니다. 그리고 당신이 옳습니다, 결과는 정확히 동일하게 보일 것이지만 여전히 in 수정자를 사용하는 매우 타당한 이유가 있습니다. 값 대신 참조로 전달함으로써 프레임워크가 일반 매개 변수와 같이 메서드에 전달 할 때 객체의 복사본을 만드는 데 시간을 소비 할 필요가 없기 때문에 리소스를 절약 할 수 있습니다.


대부분의 경우 대부분의 매개 변수가 간단한 문자열 또는 정수이기 때문에 큰 차이는 없지만 루프에서 동일한 메서드를 여러 번 반복적으로 호출하거나 큰 값을 가진 매개 변수를 전달하는 상황에서는 매우 큰 문자열 또는 구조체, 이것은 당신에게 좋은 성능 향상을 줄 수 있습니다.

다음은 in 수정자를 사용하는 예입니다.

```
public void Main(string[] args)
{
    string aVeryLargeString = "Lots of text...";
    InMethod(aVeryLargeString);
}

public void InMethod(in string largeString)
{
    Console.WriteLine(largeString);
}
```

우리 메서드인 InMethod()에서 largeString 매개변수는 이제 원래 변수(aVeryLargeString)에 대한 읽기 전용 참조이므로 사용할 수 있지만 수정할 수는 없습니다. 시도하면 컴파일러가 불평할 것입니다.

```
public void InMethod(in string largeString)
{
    largeString = "We can't do this...";
}

Error: Cannot assign to variable 'in string' because it is a readonly variable
```

### 명명된 매개변수
위의 모든 예제에서 보았듯이 각 매개 변수에는 메서드 선언에서 고유한 이름이 있습니다. 이를 통해 메서드 내부의 매개변수를 참조할 수 있습니다. 그러나 메서드를 호출할 때 이러한 이름을 사용하지 않고 선언된 순서와 동일한 순서로 값을 제공합니다. 이것은 2-3개의 매개변수를 사용하는 간단한 방법에는 문제가 되지 않지만 일부 방법은 더 복잡하고 더 많은 매개변수가 필요합니다. 이러한 상황에서는 다음 예와 같이 메서드 호출의 다양한 값이 무엇을 참조하는지 파악하기가 매우 어려울 수 있습니다.

```
PrintUserDetails(1, "John", 42, null);
```

이 메서드 호출에서 다양한 매개 변수가 무엇을 의미하는지는 명확하지 않지만 메서드 선언을 보면 다음을 알 수 있습니다.

```
public void PrintUserDetails(int userId, string name, int age = -1, List<string> addressLines = null)
{
    // Print details...
}
```

그러나 매개 변수가 수행하는 작업을 이해하기 위해 메서드 선언을 지속적으로 조회해야하는 경우 성가신 일이므로 더 복잡한 메서드의 경우 메서드 호출에서 직접 매개 변수 이름을 제공 할 수 있습니다. 또한 선언 순서를 강제로 사용하는 대신 매개변수 이름을 임의의 순서로 제공할 수 있습니다. 예를 들면 다음과 같습니다.

```
PrintUserDetails(name: "John Doe", userId: 1);
```

추가 보너스로, 선언에서 이전의 모든 선택적 매개변수에 대한 값을 제공할 필요 없이 선택적 매개변수에 대한 값을 제공할 수 있습니다. 즉, 이 예제에서 addressLines 매개 변수에 대한 값을 제공하려면 메서드 선언에서 먼저 오기 때문에 age 매개 변수에 대한 값도 제공해야 합니다. 그러나 명명된 매개변수를 사용하는 경우 순서는 더 이상 중요하지 않으며 필수 매개변수에 대한 값과 하나 또는 여러 개의 선택적 매개변수에 대한 값만 제공할 수 있습니다.

```
PrintUserDetails(addressLines: new List<string>() { }, name: "Jane Doe", userId: 2);
```

명명된 매개변수를 사용하는 전체 예는 다음과 같습니다.

```
public void Main(string[] args)
{
    PrintUserDetails(1, "John", 42, null);
    PrintUserDetails(name: "John Doe", userId: 1);
    PrintUserDetails(addressLines: new List<string>() { }, name: "Jane Doe", userId: 2);
}

public void PrintUserDetails(int userId, string name, int age = -1, List<string> addressLines = null)
{
    // Print details...
    Console.WriteLine(name + " is " + age + " years old...");
}
```

### 요약
이 섹션에서 볼 수 있듯이 매개변수는 다양한 형태와 유형으로 제공됩니다. 다행히도 평범하고 오래된 일반 매개 변수를 사용할 수 있지만 C# 언어에 대해 더 깊이 파고들기 시작하면 이 문서에서 설명한 대로 모든 형식과 한정자를 아는 것이 도움이 될 것입니다.





## Constructors and destructors
생성자는 클래스를 인스턴스화할 때 사용되는 특수 메서드입니다. 생성자는 아무 것도 반환 할 수 없으므로 반환 유형을 정의 할 필요가 없습니다. 일반 메서드는 다음과 같이 정의됩니다.

```
public string Describe()
```

생성자는 다음과 같이 정의할 수 있습니다.

```
public Car()
```

이 장의 예에는 문자열을 인수로 사용하는 생성자가 있는 Car 클래스가 있습니다. 물론 생성자도 오버로드될 수 있으므로 이름은 같지만 매개변수는 다른 여러 생성자를 가질 수 있습니다. 예를 들면 다음과 같습니다.

```
public Car()
{

}

public Car(string color)
{
    this.color = color;
}
```

생성자는 여러 상황에서 유용할 수 있는 다른 생성자를 호출할 수 있습니다. 예를 들면 다음과 같습니다.

```
public Car()
{
    Console.WriteLine("Constructor with no parameters called!");
}

public Car(string color) : this()
{
    this.color = color;
    Console.WriteLine("Constructor with color parameter called!");
}
```

이 코드를 실행하면 매개 변수가없는 생성자가 먼저 호출되는 것을 볼 수 있습니다. 이는 클래스의 다른 생성자에서 호출할 수 있는 기본 생성자에서 클래스에 대한 다양한 객체를 인스턴스화하는 데 사용할 수 있습니다. 호출하려는 생성자가 매개 변수를 사용하는 경우 그렇게 할 수도 있습니다. 다음은 간단한 예입니다.

```
public Car(string color) : this()
{
    this.color = color;
    Console.WriteLine("Constructor with color parameter called!");
}

public Car(string param1, string param2) : this(param1)
{

}
```

2개의 매개 변수를 사용하는 생성자를 호출하는 경우 첫 번째 매개 변수는 1개의 매개 변수를 사용하는 생성자를 호출하는 데 사용됩니다.

### 소멸자
C#은 가비지 수집되므로 프레임워크가 더 이상 사용하지 않는 개체를 해제하므로 수동 정리를 수행해야 하는 경우가 있을 수 있습니다. 객체가 삭제되면 호출되는 메서드인 소멸자는 객체에서 사용하는 리소스를 정리하는 데 사용할 수 있습니다. 소멸자는 C #의 다른 메서드와 크게 다릅니다. 다음은 Car 클래스에 대한 소멸자의 예입니다.

```
~Car() 
{
    Console.WriteLine("Out..");
}
```

가비지 수집기에서 개체를 수집하면 이 메서드가 호출됩니다.





## Method overloading
많은 프로그래밍 언어는 기본/선택적 매개변수라는 기술을 지원합니다. 이를 통해 프로그래머는 기본값을 제공해서 하나 이상의 매개변수를 선택 사항으로 만들 수 있습니다. 기존 코드에 기능을 추가할 때 특히 실용적입니다.

예를 들어, 하나 이상의 매개변수를 추가해야 하는 기존 함수에 기능을 추가할 수 있습니다. 이렇게 하면 이 함수를 호출하는 기존 코드가 필요한 양의 매개변수를 전달하지 않으므로 중단됩니다. 이 문제를 해결하려면 새로 추가된 매개 변수를 선택 사항으로 정의하고 매개 변수를 추가하기 전에 코드가 작동하는 방식에 해당하는 기본값을 제공할 수 있습니다.

기본 매개 변수는 C# 버전 4.0에서 도입되었지만 그때까지 C# 코더는 기본적으로 동일한 작업을 수행하는 메서드 오버로딩이라는 다른 기술을 사용해 왔습니다. 이를 통해 프로그래머는 다른 매개변수 세트를 사용하는 한 동일한 이름으로 여러 메서드를 정의할 수 있습니다. .NET Framework의 클래스를 사용하면 메서드 오버로드가 모든 곳에서 사용된다는 것을 곧 알게 될 것입니다. 이에 대한 좋은 예는 String 클래스의 Substring() 메서드입니다. 다음과 같이 추가 오버로드가 있습니다.

```
string Substring (int startIndex)
string Substring (int startIndex, int length)
```

하나 또는 두 개의 매개 변수로 호출할 수 있습니다. 하나의 매개변수로만 호출하면 길이 매개변수가 문자열의 나머지 부분으로 간주되어 단순히 문자열의 마지막 부분을 가져오려는 경우 시간을 절약할 수 있습니다.

그렇다면 동일한 함수의 여러 버전을 정의함으로써 여러 곳에서 동일한 코드가 있는 것을 어떻게 방지할 수 있습니까? 그것은 실제로 매우 간단합니다: 우리는 메서드의 간단한 버전이 복잡한 버전이 모든 작업을 수행하도록 합니다. 다음 예를 고려하십시오.

```
class SillyMath
{
    public static int Plus(int number1, int number2)
    {
        return Plus(number1, number2, 0);
    }

    public static int Plus(int number1, int number2, int number3)
    {
        return number1 + number2 + number3;
    }
}
```

두 가지 다른 버전에서 Plus 메서드를 정의합니다. 첫 번째는 두 개의 숫자를 더하기 위해 두 개의 매개변수를 사용하고 두 번째 버전은 세 개의 숫자를 사용합니다. 실제 작업은 세 개의 숫자를 취하는 버전에서 수행됩니다 - 두 개만 더하려면 세 개의 매개변수 버전을 호출하고 기본값으로 작동하는 세 번째 매개변수로 0을 사용합니다. 클래스 이름에서 알 수 있듯이 어리석은 예라는 것을 알고 있지만 모든 것이 어떻게 작동하는지에 대한 아이디어를 제공해야 합니다.

이제 총 4개의 숫자를 더해서 고급 수학을 하고 싶을 때마다 (농담입니다) 새 오버로드를 추가하는 것은 매우 간단합니다.

```
class SillyMath
{
    public static int Plus(int number1, int number2)
    {
        return Plus(number1, number2, 0);
    }

    public static int Plus(int number1, int number2, int number3)
    {
        return Plus(number1, number2, number3, 0);
    }

    public static int Plus(int number1, int number2, int number3, int number4)
    {
        return number1 + number2 + number3 + number4;
    }
}
```

이것에 대한 멋진 점은 Plus 메서드에 대한 모든 기존 호출이 아무것도 변경되지 않은 것처럼 계속 작동한다는 것입니다. C#을 더 많이 사용할수록 메서드 오버로드를 이해하는 방법을 더 많이 배우게 됩니다.





## Visibility
클래스, 메서드, 변수 또는 속성의 가시성은 이 항목에 액세스할 수 있는 방법을 알려줍니다. 가장 일반적인 유형의 가시성은 비공개 및 공용이지만 실제로 C# 내에는 몇 가지 다른 유형의 가시성이 있습니다. 다음은 전체 목록이며, 그 중 일부는 지금 당장과 관련이 없다고 느낄 수 있지만 언제든지 이 페이지로 돌아와 읽어볼 수 있습니다.

- public - 어디서나 구성원에게 연락할 수 있습니다. 이는 가장 제한적인 가시성입니다. 열거형과 인터페이스는 기본적으로 공개적으로 표시됩니다.

- protected - 멤버는 동일한 클래스 내에서만 또는 이 클래스에서 상속되는 클래스에서만 연결할 수 있습니다.

- internal - 구성원은 동일한 프로젝트 내에서만 연락할 수 있습니다.

- protected internal - 이 클래스에서 상속 된 클래스가 멤버에 도달 할 수 있다는 점을 제외하고는 internal과 동일합니다. 다른 프로젝트에서도.

- private - 같은 클래스의 구성원만 연결할 수 있습니다. 이는 가장 제한적인 가시성입니다. 클래스와 구조체는 기본적으로 비공개 가시성으로 설정됩니다.

예를 들어 Class1과 Class2의 두 클래스가 있는 경우 Class1의 개인 멤버는 Class1 내에서만 사용할 수 있습니다. Class2 내에서 Class1의 새 인스턴스를 만든 다음 개인 멤버를 사용할 수 있을 것으로 예상할 수 없습니다.

Class2가 Class1에서 상속되는 경우 Class2 내부에서 비공개 멤버에만 연결할 수 있습니다.





## Static members
이전 장에서 보았듯이 클래스와 통신하는 일반적인 방법은 클래스의 새 인스턴스를 만든 다음 결과 객체에 대해 작업하는 것입니다. 대부분의 경우 이것이 수업의 전부입니다. 동일한 클래스의 여러 복사본을 인스턴스화한 다음 어떤 식으로든 다르게 사용하는 기능. 그러나 어떤 경우에는 인스턴스화하지 않고 사용할 수있는 클래스 또는 최소한 객체를 만들지 않고 멤버를 사용할 수있는 클래스를 원할 수 있습니다. 예를 들어, 변수가 있는 클래스가 어디서 어떻게 사용되든 항상 동일하게 유지될 수 있습니다. 이를 동일하게 유지되기 때문에 정적 멤버라고 합니다.

클래스는 정적일 수 있으며 함수와 필드 모두의 정적 멤버를 가질 수 있습니다. 정적 클래스는 인스턴스화할 수 없으므로 실제 클래스보다 관련 멤버의 그룹으로 더 많이 작동합니다. 대신 비정적 클래스를 만들도록 선택할 수 있지만 특정 정적 멤버를 갖도록 할 수 있습니다. 비정적 클래스는 여전히 일반 클래스처럼 인스턴스화하고 사용할 수 있지만 클래스의 객체에 정적 멤버를 사용할 수는 없습니다. 정적 클래스에는 정적 멤버만 포함될 수 있습니다.

먼저 정적 클래스의 예는 다음과 같습니다.

```
public static class Rectangle
{
    public static int CalculateArea(int width, int height)
    {
        return width * height;
    }
}
```

보시다시피 static 키워드를 사용해서 클래스를 static으로 표시한 다음 다시 사용해서 메서드 CalculateArea도 static으로 표시합니다. 그렇게 하지 않으면 정적 클래스의 비 정적 멤버를 가질 수 없기 때문에 컴파일러가 불평 할 것입니다.

이 메서드를 사용하려면 다음과 같이 클래스에서 직접 호출합니다.

```
Console.WriteLine("The area is: " + Rectangle.CalculateArea(5, 4));
```

Rectangle 클래스에 다른 유용한 메서드를 추가할 수 있지만 클래스 내부에 저장한 다음 필요할 때 가져 오는 대신 실제 메서드에 너비와 높이를 전달하는 이유가 궁금할 것입니다. 정적이기 때문입니다! 우리는 그것들을 저장할 수 있지만 정적 클래스의 버전은 하나뿐이기 때문에 하나의 차원 세트만 저장할 수 있습니다. 이것은 이해하는 것이 매우 중요합니다.

대신 클래스를 비정적 클래스로 만든 다음 CalculateArea 를 이 클래스의 유틸리티 함수로 사용할 수 있습니다.

```
public class Rectangle
{
    private int width, height;

    public Rectangle(int width, int height)
    {
        this.width = width;
        this.height = height;
    }

    public void OutputArea()
    {
        Console.WriteLine("Area output: " + Rectangle.CalculateArea(this.width, this.height));
    }

    public static int CalculateArea(int width, int height)
    {
        return width * height;
    }
}
```

보시다시피 클래스를 비정적으로 만들었습니다. 또한 너비와 높이를 가져와 인스턴스에 할당하는 생성자를 추가했습니다. 그런 다음 정적 메서드를 사용해서 면적을 계산하는 OutputArea 메서드를 추가했습니다. 이것은 비정적 클래스에서 정적 멤버와 비정적 멤버를 혼합하는 좋은 예입니다.

정적 클래스의 일반적인 사용법은 일부 사람들이 눈살을 찌푸리게 하지만 유틸리티 / 도우미 클래스로, 함께 속하지 않을 수도 있지만 다른 곳에도 적합하지 않은 유용한 메서드를 많이 수집합니다.





## Inheritance
C#이 구축되는 개념인 OOP(객체 지향 프로그래밍)의 절대적인 핵심 측면 중 하나는 부모 클래스의 특정 측면을 상속하는 클래스를 만드는 기능인 상속입니다. 전체 .NET 프레임워크는 이 개념을 기반으로 구축되었으며 그 결과 "모든 것이 객체입니다"가 됩니다. 간단한 숫자조차도 System.Object 클래스에서 상속되는 클래스의 인스턴스이지만 NET은 약간의 도움이되므로 정수 클래스와 같은 새 인스턴스를 만들 필요 없이 직접 숫자를 할당 할 수 있습니다.

이 주제는 이해하기 약간 어려울 수 있지만 때로는 몇 가지 예에 도움이 되므로 그 중 간단한 항목부터 시작하겠습니다.

```
public class Animal
{
    public void Greet()
    {
        Console.WriteLine("Hello, I'm some sort of animal!");
    }
}

public class Dog : Animal
{

}
```

먼저 인사말을 출력하는 간단한 메서드를 사용해서 Animal 클래스를 정의합니다. 그런 다음 Dog 클래스를 정의하고 콜론을 사용해서 C#에 Dog 클래스가 Animal 클래스에서 상속되어야 한다고 지시합니다. 이것의 아름다운 점은 현실 세계에서도 의미가 있다는 것입니다 - 개는 분명히 동물입니다. 클래스를 사용해 봅시다.

```
Animal animal = new Animal();
animal.Greet();
Dog dog = new Dog();
dog.Greet();
```

이 예제를 실행하면 Dog 클래스에 대한 Greet() 메서드를 정의하지 않았지만 Animal 클래스에서 이 메서드를 상속하기 때문에 여전히 인사하는 방법을 알고 있음을 알 수 있습니다. 그러나 이 인사말은 약간 익명이므로 어떤 동물인지 알면 사용자 지정해 보겠습니다.

```
public class Animal
{
    public virtual void Greet()
    {
        Console.WriteLine("Hello, I'm some sort of animal!");
    }
}

public class Dog : Animal
{
    public override void Greet()
    {
        Console.WriteLine("Hello, I'm a dog!");
    }
}
```

Dog 클래스에 추가된 메서드 외에도 두 가지 사항을 확인해야 합니다. Animal 클래스의 메서드에 virtual 키워드를 추가하고 Dog 클래스에서 override 키워드를 사용합니다.

C#에서는 가상으로 표시되지 않는 한 클래스의 멤버를 재정의할 수 없습니다. 원하는 경우 base 키워드를 사용해서 재정의하는 경우에도 상속된 메서드에 계속 액세스할 수 있습니다.

```
public override void Greet()
{
    base.Greet();
    Console.WriteLine("Yes I am - a dog!");
}
```

그러나 메소드만 상속되는 것은 아닙니다. 실제로 필드와 속성을 포함해서 거의 모든 클래스 멤버가 상속됩니다. 이전 장에서 논의한 것처럼 가시성 규칙을 기억하십시오.

상속은 한 클래스에서 다른 클래스로만 이루어지는 것이 아니라 서로 상속되는 클래스의 전체 계층 구조를 가질 수 있습니다. 예를 들어, Dog 클래스에서 상속되는 Puppy 클래스를 만들 수 있으며, 이 클래스는 Animal 클래스에서 상속됩니다. C #에서 할 수없는 것은 하나의 클래스가 동시에 여러 다른 클래스에서 상속되도록하는 것입니다. 다중 상속이라고 하는 다중 상속은 C#에서 지원되지 않습니다.





## Abstract classes
클래스 정의에서 키워드 abstract로 표시된 추상 클래스는 일반적으로 계층 구조에서 기본 클래스를 정의하는 데 사용됩니다. 그것들의 특별한 점은 인스턴스를 만들 수 없다는 것입니다 - 시도하면 컴파일 오류가 발생합니다. 대신 상속에 대한 장에서 가르친 대로 서브 클래스를 서브 클래스화하고 서브 클래스의 인스턴스를 만들어야합니다. 그렇다면 추상 클래스는 언제 필요할까요? 그것은 정말로 당신이 무엇을 하느냐에 달려 있습니다.

솔직히 말해서 추상 클래스 없이도 먼 길을 갈 수 있지만 프레임 워크와 같은 특정 항목에는 적합하므로 .NET 프레임 워크 자체에서 꽤 많은 추상 클래스를 찾을 수 있습니다. 좋은 경험 법칙은 이름이 실제로 정말 의미가 있다는 것입니다 - 추상 클래스는 항상 그런 것은 아니더라도 추상적인 것, 실제보다 개념에 가까운 것을 설명하는 데 매우 자주 사용됩니다.

이 예에서는 다리가 네 개인 동물에 대한 기본 클래스를 만든 다음 다음과 같이 상속되는 Dog 클래스를 만듭니다.

```
namespace AbstractClasses
{
    class Program
    {
        static void Main(string[] args)
        {
            Dog dog = new Dog();
            Console.WriteLine(dog.Describe());
            Console.ReadKey();
        }
    }

    abstract class FourLeggedAnimal
    {
        public virtual string Describe()
        {
            return "Not much is known about this four legged animal!";
        }
    }

    class Dog : FourLeggedAnimal
    {

    }
}
```

상속에 관한 장의 예와 비교해 보면 큰 차이는 보이지 않을 것입니다. 사실 FourLeggedAnimal 정의 앞에 있는 추상 키워드가 가장 큰 차이점입니다. 보시다시피 Dog 클래스의 새 인스턴스를 만든 다음 FourLeggedAnimal 클래스에서 상속된 Describe() 메서드를 호출합니다. 이제 대신 FourLeggedAnimal 클래스의 인스턴스를 만들어 보십시오.

```
FourLeggedAnimal someAnimal = new FourLeggedAnimal();
```

이 훌륭한 컴파일러 오류가 발생합니다.

추상 클래스 또는 인터페이스 'AbstractClasses.FourLeggedAnimal'의 인스턴스를 만들 수 없습니다.

보시다시피 Describe() 메서드를 상속했지만 Dog 클래스의 현재 형태로는 그다지 유용하지 않습니다. 재정의해 보겠습니다.

```
class Dog : FourLeggedAnimal
{
    public override string Describe()
    {
        return "This four legged animal is a Dog!";
    }
}
```

이 경우 전체 재정의를 수행하지만 경우에 따라 새 기능 외에 기본 클래스의 동작을 사용할 수 있습니다. 이것은 우리가 상속받은 클래스를 참조하는 base 키워드를 사용해서 수행할 수 있습니다.

```
abstract class FourLeggedAnimal
{
    public virtual string Describe()
    {
        return "This animal has four legs.";
    }
}


class Dog : FourLeggedAnimal
{
    public override string Describe()
    {
        string result = base.Describe();
        result += " In fact, it's a dog!";
        return result;
    }
}
```

이제 분명히 FourLeggedAnimal 클래스의 다른 하위 클래스를 만들 수 있습니다 - 아마도 고양이 또는 사자? 다음 장에서는 보다 고급 예제를 수행하고 추상적인 방법도 소개합니다. 읽어.





## More abstract classes
이전 장에서는 추상 클래스에 대해 살펴보았습니다. 이 장에서는 예제를 약간 확장하고 몇 가지 추상적인 방법도 던질 것입니다. 추상 메서드는 추상 클래스 내에서만 허용됩니다. 정의는 일반 메서드처럼 보이지만 내부에는 코드가 없습니다.

```
abstract class FourLeggedAnimal
{
    public abstract string Describe();
}
```

그렇다면 아무것도하지 않는 빈 메서드를 정의하려는 이유는 무엇입니까? 추상 메서드는 모든 하위 클래스에서 바로 그 메서드를 구현해야 할 의무이기 때문입니다. 실제로 컴파일 타임에 확인되어 하위 클래스에 이 메서드가 정의되어 있는지 확인합니다. 다시 한 번, 이것은 하위 클래스가 수행할 수 있어야 하는 작업에 대한 어느 정도의 제어를 유지하면서 무언가에 대한 기본 클래스를 만드는 좋은 방법입니다. 이를 염두에 두고 기본 클래스에서 추상 메서드로 정의된 메서드를 사용해야 할 때마다 항상 하위 클래스를 기본 클래스로 처리할 수 있습니다. 예를 들어 다음 예를 고려하십시오.

```
namespace AbstractClasses
{
    class Program
    {
        static void Main(string[] args)
        {
            System.Collections.ArrayList animalList = new System.Collections.ArrayList();
            animalList.Add(new Dog());
            animalList.Add(new Cat());
            foreach(FourLeggedAnimal animal in animalList)
                Console.WriteLine(animal.Describe());
            Console.ReadKey();
        }
    }

    abstract class FourLeggedAnimal
    {
        public abstract string Describe();
    }


    class Dog : FourLeggedAnimal
    {

        public override string Describe()
        {
            return "I'm a dog!";
        }
    }

    class Cat : FourLeggedAnimal
    {
        public override string Describe()
        {
            return "I'm a cat!";
        }
    }
}
```

보시다시피 동물을 포함하기 위해 ArrayList를 만듭니다. 그런 다음 새 개와 새 고양이를 인스턴스화하고 목록에 추가합니다. 각각 Dog와 Cat으로 인스턴스화되지만 FourLeggedAnimal 유형이기도 하며 컴파일러는 해당 클래스의 하위 클래스에 Describe() 메서드가 포함되어 있다는 것을 알고 있기 때문에 실제로 정확한 유형의 동물 유형도 모르고도 해당 메서드를 호출할 수 있습니다. 따라서 foreach 루프에서 수행하는 FourLeggedAnimal로 타입캐스팅하면 하위 클래스의 멤버에 액세스할 수 있습니다. 이것은 많은 시나리오에서 매우 유용할 수 있습니다.







## Interfaces
이전 장에서는 추상 클래스를 살펴보았습니다. 인터페이스는 추상 클래스와 매우 유사하며 인스턴스를 만들 수 없다는 사실을 공유합니다. 그러나 인터페이스는 메서드 본문이 전혀 허용되지 않기 때문에 추상 클래스보다 훨씬 더 개념적입니다. 따라서 인터페이스는 추상 메서드 외에는 아무것도 없는 추상 클래스와 비슷하며 실제 코드가있는 메서드가 없기 때문에 필드가 필요하지 않습니다. 그러나 인덱서 및 이벤트뿐만 아니라 속성도 허용됩니다. 인터페이스를 계약으로 간주할 수 있습니다 - 모든 메서드와 속성을 구현하는 데 필요한 클래스입니다. 그러나 가장 중요한 차이점은 C#은 클래스가 단일 이상의 기본 클래스를 상속하는 다중 상속을 허용하지 않지만 실제로는 여러 인터페이스를 구현할 수 있다는 것입니다!

그렇다면 이 모든 것이 코드에서 어떻게 보일까요? 다음은 매우 완전한 예입니다. 살펴보고 직접 사용해 본 다음 전체 설명을 읽으십시오.

```
using System;
using System.Collections.Generic;

namespace Interfaces
{
    class Program
    {
        static void Main(string[] args)
        {
            List<Dog> dogs = new List<Dog>();
            dogs.Add(new Dog("Fido"));
            dogs.Add(new Dog("Bob"));
            dogs.Add(new Dog("Adam"));
            dogs.Sort();
            foreach(Dog dog in dogs)
                Console.WriteLine(dog.Describe());
            Console.ReadKey();
        }
    }

    interface IAnimal
    {
        string Describe();

        string Name
        {
            get;
            set;
        }
    }

    class Dog : IAnimal, IComparable
    {
        private string name;

        public Dog(string name)
        {
            this.Name = name;
        }

        public string Describe()
        {
            return "Hello, I'm a dog and my name is " + this.Name;
        }

        public int CompareTo(object obj)
        {
            if(obj is IAnimal)
                return this.Name.CompareTo((obj as IAnimal).Name);
            return 0;
        }

        public string Name
        {
            get { return name; }
            set { name = value; }
        }
    }
}
```

인터페이스를 선언하는 중간부터 시작하겠습니다. 보시다시피 클래스 선언과의 유일한 차이점은 클래스 대신 인터페이스라는 키워드를 사용하는 것입니다. 또한 인터페이스 이름에는 인터페이스의 I가 접두사로 붙습니다 - 이것은 단순히 코딩 표준이며 요구 사항이 아닙니다. 인터페이스를 원하는 대로 호출 할 수 있지만 클래스처럼 너무 많이 사용되어 코드의 일부 부분에서 차이점을 구분하는 데 어려움을 겪을 수 있으므로 I 접두사는 꽤 의미가 있습니다.

그런 다음 Describe 메서드를 선언한 다음 get 키워드와 set 키워드가 모두 있는 Name 속성을 선언해서 읽기 및 쓰기 가능한 속성으로 만듭니다. 또한 액세스 수정자(public, private, protected 등)가 부족하다는 것을 알 수 있으며, 이는 인터페이스에서 허용되지 않기 때문에 기본적으로 모두 공개되어 있습니다.


다음은 개 수업입니다. 클래스 이름과 클래스/인터페이스 사이의 콜론이 서브클래싱/구현되는 다른 클래스에서 상속되는 것처럼 보이는 것을 주목하십시오. 그러나 이 경우 쉼표로 구분된 동일한 클래스에 대해 두 개의 인터페이스가 구현됩니다. 원하는 만큼 인터페이스를 구현할 수 있지만 이 경우 자체 IAnimal 인터페이스와 정렬할 수 있는 클래스에 대한 공유 인터페이스인 .NET IComparable 인터페이스의 두 개만 구현합니다. 이제 보시다시피 IAnimal 인터페이스의 메서드와 속성, IComparable 인터페이스의 CompareTo 메서드를 모두 구현했습니다.


이제 당신은 생각할 수 있습니다: 우리가 모든 작업을 스스로 수행해야 한다면, 전체 메서드와 속성을 구현함으로써 왜 귀찮게 합니까? 그리고 시간을 할애할 가치가 있는 이유에 대한 아주 좋은 예가 예제 상단에 나와 있습니다. 여기서는 여러 개의 Dog 객체를 목록에 추가한 다음 목록을 정렬합니다. 그리고 목록은 개를 분류하는 방법을 어떻게 알고 있습니까? Dog 클래스에는 두 개를 비교하는 방법을 알려줄 수 있는 CompareTo 메서드가 있기 때문입니다. 그리고 목록은 Dog 객체가 바로 그 일을 할 수 있다는 것을 어떻게 알 수 있으며, 개를 비교하기 위해 어떤 메서드를 호출해야 할까요? 우리가 그렇게 말했기 때문에 CompareTo 메서드를 약속하는 인터페이스를 구현합니다! 이것이 인터페이스의 진정한 아름다움입니다.





## Namespaces
첫 번째 섹션 중 하나에서 네임스페이스에 대해 간략하게 논의했습니다. 키워드는 C# 코드가 포함된 대부분의 파일에서 일반적으로 거의 맨 위에 있기 때문에 인식할 수 있습니다. 네임스페이스는 본질적으로 클래스와 같은 유형 집합을 자체 명명된 공간에 그룹화하는 방법입니다. Visual Studio에서 새 프로젝트를 생성할 때 첫 번째 파일을 배치하는 기본 네임스페이스도 생성합니다(적어도 콘솔 앱 프로젝트 형식의 경우). 다음과 같을 수 있습니다.

```
using System;  

namespace MyProject  
{  
    class Program  
    {  
    static void Main(string[] args)  
    {  
        // More code below this....
```
이 경우 네임스페이스 "MyProject"는 이제 애플리케이션의 일부이며 외부에서 해당 클래스를 사용할 때 클래스 이름 앞에 네임스페이스 이름을 붙여야 합니다. 다음과 같이 .NET 프레임워크 깊숙이 묻혀 있는 것을 사용하려는 경우에도 똑같은 내용이 표시됩니다.

```
System.IO.File.ReadAllText("test.txt");
```

이 경우 System.IO 네임스페이스에 있는 File 클래스에 있는 ReadAllText() 메서드를 사용합니다. 물론 네임스페이스의 클래스를 사용할 때마다 이렇게 긴 이름을 작성하는 것은 지루할 수 있으므로 C#을 사용하면 using 문을 사용해서 전체 네임스페이스를 파일 범위로 "가져 올 수 있습니다". 다시 말하지만, 일반적으로 C# 파일의 맨 위에서 찾을 수 있기 때문에 이미 알고 있을 수 있습니다. 위의 예에서 File 클래스가 두 번 이상 필요한 경우 다음과 같은 using 문을 사용해서 System.IO 네임스페이스를 가져오는 것이 좋습니다.

```
using System;
using System.IO;
// More using statements here...
```

### 네임스페이스가 필요한 이유는 무엇입니까?
이제 막 프로그래밍을 시작했다면 네임스페이스가 필요한 이유가 궁금할 것입니다. 모든 클래스를 동일한 네임스페이스에 배치해서 항상 액세스할 수 있도록 하는 것은 어떨까요? 타당한 지적이 있지만 프로젝트가 매우 작은 경우에만 가능합니다. 점점 더 많은 클래스를 추가하기 시작하자마자 클래스를 네임스페이스로 분리하는 것이 매우 합리적입니다. 특히 해당 폴더에 파일을 배치하는 경우 코드를 더 쉽게 찾을 수 있습니다 - 실제로 프로젝트에 폴더를 추가 한 다음 클래스를 추가하면 Visual Studio에서 자동으로 해당 네임 스페이스에 넣습니다. 따라서 MyProject에 MyFolder라는 폴더를 만들면 이 폴더에 추가된 클래스는 기본적으로 MyProject.MyFolder라는 네임스페이스에 배치됩니다.

네임스페이스가 필요한 이유를 보여주는 좋은 예는 .NET Framework 자체입니다. 프레임 워크의 모든 클래스가 전역 네임 스페이스에 떠 있다면 엉망이 될 것입니다! 대신 System을 대부분의 클래스의 루트 네임스페이스로 사용한 다음 입력/출력 항목의 경우 System.IO, 네트워크 관련 항목의 경우 System.Net, 메일 관련 항목의 경우 System.Net.Mail과 같은 하위 네임스페이스를 사용해서 멋지게 구성했습니다.

### 네임스페이스와 이름 충돌
앞서 언급했듯이 네임스페이스는 유형(일반적으로 클래스)을 캡슐화해서 자체 도메인 내에 존재할 수 있도록 하는 데에도 있습니다. 이는 또한 프로젝트의 다른 곳이나 .NET Framework에서 찾을 수 있는 클래스와 동일한 이름의 클래스를 자유롭게 만들 수 있음을 의미합니다. 예를 들어 사용자 고유의 File 클래스가 필요하다고 결정할 수 있습니다. 이전 예제에서 보았듯이 이러한 클래스는 이미 System.IO 네임스페이스에 존재하지만 다음과 같이 자신의 네임스페이스에 자유롭게 만들 수 있습니다.

```
using System;  

namespace MyProject.IO  
{  
    class File  
    {  
    public static void HelloWorld()  
    {  
        Console.WriteLine("Hello, world!");  
    }  
    }  
}
```

이제 프로젝트에서 사용하려는 경우, 예를 들어 Program.cs Main 메서드 (저처럼 콘솔 앱에서 작업하는 경우) 전체 이름을 작성할 수 있습니다.

```
MyProject.IO.File.HelloWorld();
```

그러나 using 문 덕분에 다른 네임스페이스(내장 또는 사용자 정의)와 마찬가지로 네임스페이스를 가져올 수도 있습니다. 다음은 더 완전한 예입니다.

```
using System;
using MyProject.IO;

namespace MyProject
{
    class Program
    {
    static void Main(string[] args)
    {
        File.HelloWorld();
    }
    }
}
```

지금까지는 좋았어요! 그러나 System.IO 네임스페이스의 File 클래스도 사용하려면 어떻게 해야 할까요? 글쎄, using 문을 사용해서 해당 네임 스페이스도 가져 오면 컴파일러는 더 이상 참조하는 File 클래스 (우리 자신의 클래스 또는 System.IO 네임 스페이스의 클래스)를 알지 못하기 때문에 문제가 시작됩니다. 이 문제는 네임스페이스 중 하나(이상적으로는 가장 많은 유형을 사용하는 네임스페이스)만 가져온 다음 다음 예제와 같이 다른 네임스페이스의 이름을 완전히 한정화해서 해결할 수 있습니다.

```
using System;
using System.IO;

namespace MyProject
{
    class Program
    {
    static void Main(string[] args)
    {
        MyProject.IO.File.HelloWorld();
    }
    }
}
```

그러나 특히 클래스가 MyProject.FileStuff.IO.File과 같은 네임스페이스에 더 깊이 중첩되어 있는 경우 매번 입력하는 것이 약간 번거롭습니다. 다행히도 C#에는 이에 대한 솔루션이 있습니다.

### 별칭 지시문 사용
네임스페이스의 이름을 많이 줄이려면 Using Alias 지시문을 사용해서 다른 이름으로 네임스페이스를 가져올 수 있습니다. 다음 예제에서 어떻게 수행하는지 확인하십시오.

```
using System;
using System.IO;
using MyIO = MyProject.IO;

namespace MyProject
{
    class Program
    {
    static void Main(string[] args)
    {
        File.ReadAllText("test.txt");
        MyIO.File.HelloWorld();
    }
    }
}
```

마법은 세 번째 줄에서 발생하는데, 여기서 MyProject.IO 네임스페이스를 가져와 더 짧은 이름(MyIO)을 지정한 다음 유형에 액세스하려고 할 때 사용할 수 있습니다. 이 시점에서 우리는 많은 키 입력을 저장하지 않지만 더 긴 이름과 네임스페이스 수준을 상상해야 하며 상당히 길고 중첩될 수 있습니다.

### 요약
네임스페이스는 형식을 "명명된 공간"으로 캡슐화할 수 있는 기회를 제공하므로 코드에서 더 나은 구조를 얻을 수 있을 뿐만 아니라 별도의 네임스페이스에 존재하는 한 동일한 이름을 가진 여러 클래스를 가질 수 있습니다.





## Constants (the const keyword)
지금까지 우리는 변수에 대해 많은 것을 다루었고 이름에서 알 수 있듯이 변수는 항상 변경될 수 있습니다. 그 반대는 C#에서 키워드 const와 함께 도입된 상수입니다. 상수를 선언할 때 즉시 값을 할당해야하며 그 이후에는 이 상수의 값을 변경할 수 없습니다. 이것은 결코 변경되지 않는 값이 있고 우연히라도 코드에 의해 조작되지 않도록하고 싶을 때 유용합니다.

프레임워크 자체에서 많은 상수를 찾을 수 있습니다 (예 : PI에 대한 상수가 정의 된 Math 클래스에서).

```
Console.WriteLine(Math.PI);
```

그러나 물론 흥미로운 부분은 우리 자신의 상수를 선언하는 것입니다. 상수는 다음과 같이 메서드 범위에서 정의할 수 있습니다.

```
static void Main(string[] args)
{
    const int TheAnswerToLife = 42;
    Console.WriteLine("The answer to life, the universe and everything: " +  TheAnswerToLife);
}
```

그러나 대부분의 상수는 클래스 수준에서 선언되므로 가시성에 따라 클래스의 모든 메서드와 클래스 외부에서도 액세스할 수 있습니다(물론 변경은 할 수 없음). 상수는 클래스의 정적 멤버처럼 작동하므로 클래스를 인스턴스화하지 않고도 액세스할 수 있습니다. 이를 염두에 두고 두 개의 상수가 정의되는 전체 예제(개인 상수와 공개 상수)를 사용해 보겠습니다.

```
using System;

namespace Constants
{
    class Program
    {
    static void Main(string[] args)
    {
        Console.WriteLine("The fake answer to life: " + SomeClass.TheFakeAnswerToLife);
        Console.WriteLine("The real answer to life: " +  SomeClass.GetAnswer());
    }
    }

    class SomeClass
    {
    private const int TheAnswerToLife = 42;
    public const int TheFakeAnswerToLife = 43;

    public static int GetAnswer()
    {
        return TheAnswerToLife;
    }
    }
}
```

두 개의 상수로 클래스 (SomeClass)를 정의하는 방법을 확인하십시오. 첫 번째는 private이므로 클래스에서만 액세스할 수 있지만 다른 하나는 public입니다. 따라서 기본 프로그램 코드에서는 두 상수에 서로 다르게 액세스합니다 - 첫 번째는 가짜 답변이 공개적으로 사용 가능하기 때문에 직접으로, 두 번째는 GetAnswer() 메서드의 도움으로.

### 어떤 유형을 상수로 사용할 수 있습니까?
상수는 즉시 선언해야 하고 나중에 변경할 수 없으므로 상수에 할당하는 값은 상수 식이어야 하며 컴파일러는 컴파일 타임에 이미 값을 평가할 수 있어야 합니다. 즉, 숫자, 부울 값 및 문자열은 상수에 잘 사용할 수 있지만 예를 들어 DateTime 객체는 상수로 사용할 수 없습니다.

컴파일러는 값을 즉시 알아야 하기 때문에 값을 설정할 때 수행할 수 있는 작업에 몇 가지 제한이 있음을 의미하기도 합니다. 예를 들어, 다음은 당신이 할 수 있는 일의 완벽한 예입니다.

```
const int a = 10;  
const float b = a * 2.5f;

const string s1 = "Hello, world!";  
const string s2 = s1 + " How are you?";
```

반면에 메서드 호출의 결과나 상수가 아닌 클래스 멤버는 상수 표현식이 아니기 때문에 사용할 수 없습니다. 다음은 할 수 없는 일에 대한 몇 가지 예입니다.

```
// NOT possible:
const int a = Math.Cos(4) * 2;
// Possible:
const string s1 = "Hello, world!";
// NOT possible:
const string s2 = s1.Substring(0, 6) + " Universe";
```

차이점은 컴파일러가 코드에 도달 할 때 알 수있는 것과 같은 숫자, 문자열 및 기타 상수에 있으며, 값을 얻기 위해 실행해야하는 것과 대조됩니다.

### 지속적인 대안: 읽기 전용 필드
클래스 상수의 약간 덜 제한적인 버전을 찾고 있다면 readonly 키워드를 살펴보는 것이 좋습니다. 메서드 수준에서는 사용할 수 없지만 클래스 수준에서 사용해서 선언 또는 클래스의 생성자 메서드 실행 중에만 수정할 수 있는 필드를 정의할 수 있습니다. 따라서 개체를 사용할 수 있게 되면 읽기 전용 필드는 영원히 동일한 값을 가지며 사용자가 수정할 수 없습니다. 사용해 봅시다:

```
class SomeClass
{
    private readonly DateTime rightNow;
    public readonly DateTime later = DateTime.Now.AddHours(2);

    public SomeClass()
    {
    this.rightNow = DateTime.Now;
    }
}
```

따라서 두 개의 읽기 전용 필드가 있습니다. 첫 번째는 private이고 두 번째는 public입니다(일반적으로 이에 대한 속성이 있지만 여기서는 참아주세요). 첫 번째는 값 없이 선언되고(상수와 달리 읽기 전용 필드를 사용해서 이를 수행할 수 있음) 다른 하나는 즉시 초기화됩니다. 또한 DateTime 클래스를 데이터 유형으로 사용하고 있으며 상수가 아닌 값을 할당한다는 것을 알 수 있습니다. 즉, 우리는 상수로 할 수 없는 많은 일을 하기 때문에 읽기 전용 필드를 상수에 대한 좋은 대안으로 만듭니다.

SomeClass 클래스의 생성자에서 rightNow 필드에 값을 할당하는 방법을 확인하십시오. 이미 언급했듯이 이것은 읽기 전용 필드에 값을 할당할 수 있는 마지막 기회입니다. 그 후, 정의 클래스 내부의 메소드에 있든 외부에 있든 읽기 전용 필드에 값을 할당하려고하면 컴파일 오류가 발생합니다.

### 요약
상수는 메서드 범위 내에서 또는 클래스 수준에서 정의할 수 있습니다. 컴파일 타임에 이미 알려져 있고 나중에 변경할 수 없는 값을 정의할 수 있습니다. 상수에 사용되는 일반적인 유형은 정수, 부동 소수점, 문자열 및 부울입니다. 더 많은 유연성을 찾고 있다면 위에서 설명한 대로 읽기 전용 필드를 사용해 보십시오.





## Partial Classes
C # 또는 다른 프로그래밍 언어로 작업했다면 클래스의 이름이 고유해야한다는 사실에 익숙합니다 - 다른 네임 스페이스에 있지 않는 한 같은 이름을 가진 두 개의 클래스는 있을 수 없습니다. 그러나 어느 시점에서 Microsoft는 부분 클래스라는 것을 도입해서 이를 변경하기로 결정했습니다.

partial 키워드로 클래스를 정의하면 사용자 또는 다른 사람이 다른 클래스로 클래스의 기능을 확장할 수 있으며 이 클래스도 partial로 선언해야 합니다. 이는 다음과 같은 상황에서 유용합니다.

- 매우 큰 클래스가 있는 경우 클래스의 다양한 부분으로 더 쉽게 작업할 수 있도록 여러 파일에 보관할 수 있습니다. 예를 들어, 하나의 클래스만 있으면서도 모든 속성을 한 파일에 넣고 모든 메서드를 다른 파일에 가질 수 있습니다.
- Visual Studio와 같은 디자이너를 사용하는 경우(예: WinForms를 사용하여) 자동으로 생성된 모든 디자이너 코드는 하나의 파일에 보관되고 코드는 다른 파일에 보관될 수 있습니다.
예를 들어 설명하겠습니다. 내 프로젝트에는 콘솔 앱에서 찾을 수 있는 일반적인 Program.cs이 있습니다. 그 외에도 PartialClass1.cs와 PartialClass2.cs의 두 파일을 추가했습니다. 파일 및 해당 내용은 다음과 같습니다.

*PartialClass1.cs*

```
using System;

namespace PartialClasses
{
    public partial class PartialClass
    {
    public void HelloWorld()
    {
        Console.WriteLine("Hello, world!");
    }
    }
}
```

*PartialClass2.cs*

```
using System;

namespace PartialClasses
{
    public partial class PartialClass
    {
    public void HelloUniverse()
    {
        Console.WriteLine("Hello, universe!");
    }
    }
}
```

두 클래스 모두 partial 키워드로 정의되고 이름이 동일합니다. 또한 각각은 HelloWorld() 및 HelloUniverse() 메서드를 정의합니다. 우리 Program.cs에서는 이제 다른 클래스와 마찬가지로 이 클래스가 한 곳에서만 정의된 것처럼 사용할 수 있습니다.

```
using System;

namespace PartialClasses
{
    class Program
    {
    static void Main(string[] args)
    {
        PartialClass pc = new PartialClass();
        pc.HelloWorld();
        pc.HelloUniverse();
    }
    }
}
```

### 요약
부분 클래스를 사용하면 클래스 정의가 매우 크거나 WinForms용 Visual Studio 디자이너와 같이 작업하는 도구가 이점을 활용할 수 있기 때문에 클래스를 여러 파일로 분할할 수 있습니다.





## Local functions
이전 섹션에서 메서드와 속성이 C#의 클래스에 속한다는 것을 배웠습니다. 메서드 내부에는 이 특정 메서드의 범위에서만 액세스할 수 있는 변수인 지역 변수가 있을 수 있습니다. 저장해야 하는 임시 데이터가 종종 있지만 다른 클래스나 동일한 클래스의 다른 메서드에서 액세스할 수 없어야 하기 때문에 이는 의미가 있습니다. 이전에는 메서드로 동일한 작업을 수행할 수 없었습니다 - 메서드가 클래스에 선언된 경우 최소한 동일한 클래스 내의 다른 메서드에서 액세스할 수 있었지만 C# 버전 7에서는 로컬 함수의 개념이 도입되었습니다.

로컬 함수는 기존 메서드 내에서 선언되며 이 메서드에서만 액세스할 수 있습니다. 이렇게 하면 기능이 매우 긴밀하게 캡슐화되며 코드 독자에게 이 기능이 선언 메서드에만 관련되어 있음을 분명히 알 수 있습니다. 로컬 함수는 일반 메서드처럼 보이지만 로컬 함수는 항상 선언 메서드 내에서만 액세스할 수 있기 때문에 가시성 수정자가 없습니다. 예를 들면 다음과 같습니다.

```
public void MethodWithLocalFunction()
{
    bool doesNameStartWithUppercaseChar(string name)
    {
        if(String.IsNullOrEmpty(name))
            throw new Exception("name parameter must contain a value!");
        return Char.IsUpper(name[0]);
    }

    List<string> names = new List<string>()
    {
        "john doe",
        "Jane doe",
        "dog Doe"
    };

    foreach(string name in names)
        Console.WriteLine(name + " starts with uppercase char: " + doesNameStartWithUppercaseChar(name));
}
```

매우 어리석은 예제이지만 메서드 ( MethodWithLocalFunction )에서 로컬 함수 (이 경우 doesNameStartWithUppercaseChar 라고 함)를 선언 한 다음 메서드 내부에서 한 번 또는 여러 번 호출하는 방법을 보여줍니다.

내 예에서 볼 수 있듯이 메서드의 시작 부분에서 로컬 함수를 선언합니다. 예를 들어 메서드의 중간이나 끝에서 선언해서 자유롭게 변경할 수 있습니다. 한 가지 경우에만 차이가 있습니다: 로컬 함수는 선언 메서드 내에서 선언된 변수에 액세스할 수 있지만 로컬 함수 이전에 선언된 경우에만 가능합니다. 따라서 이 동작을 활용하려면 다음과 같이 메서드를 수정해야합니다.

```
public void MethodWithLocalFunction()
{
    int nameMaxLength = 10;

    List<string> names = new List<string>()
    {
        "john doe",
        "Jane doe",
        "dog Doe"
    };

    foreach(string name in names)
        Console.WriteLine(name + " starts with uppercase char: " + doesNameStartWithUppercaseChar(name));

    bool doesNameStartWithUppercaseChar(string name)
    {
        if(String.IsNullOrEmpty(name))
            throw new Exception("name parameter must contain a value!");
        if(name.Length > nameMaxLength)
            throw new Exception("name is too long! Max length: " + nameMaxLength);
        return Char.IsUpper(name[0]);

    }
}
```

메서드 내에서 nameMaxLength 변수를 선언한 다음 로컬 함수 내에서 액세스하는 방법을 확인하십시오.

### 정적 로컬 함수
C# 버전 8에서는 정적 로컬 함수에 대한 지원이 추가되었습니다. 글을 쓰는 시점에서 일반 로컬 함수와 정적 로컬 함수의 유일한 차이점은 정적 로컬 함수가 선언 메서드의 변수를 사용할 수 없다는 사실입니다. 따라서 로컬 함수가 메서드에서 변수를 참조하거나 변경할 수 없도록 하려면 다음과 같이 static으로 선언하십시오.

```
public void MethodWithLocalStaticFunction()
{
    int nameMaxLength = 10;
    
    static bool doesNameStartWithUppercaseChar(string name)
    {
        // Local variables, e.g. nameMaxLength, are no longer accessible here....
        if(String.IsNullOrEmpty(name))
            throw new Exception("name parameter must contain a value!");
        return Char.IsUpper(name[0]);
    }
    ....
}
```

### 요약
어떤 상황에서는 매우 구체적인 기능을 캡슐화하고 재사용해야 할 때 로컬 함수가 큰 도움이 될 수 있습니다. 또는 다른 메서드에서 기능을 재사용할 수 있는 경우 도우미 클래스의 실제 메서드 또는 확장 메서드로 추가하는 것을 고려할 수 있습니다.



---



# Collections

## Arrays
배열은 문자열과 같은 항목의 모음으로 작동합니다. 이를 사용해서 단일 그룹으로 항목을 수집하고 정렬과 같은 다양한 작업을 수행할 수 있습니다. 그 외에도 프레임워크 내의 여러 메서드가 배열에서 작동해서 하나가 아닌 다양한 항목을 허용할 수 있습니다. 이 사실만으로도 배열에 대해 조금 아는 것이 중요합니다.

배열은 변수와 매우 유사하게 선언되며 다음과 같이 데이터 유형 뒤에 [] 대괄호 집합이 있습니다.

```
string[] names;
```

배열을 사용하려면 배열을 인스턴스화해야하며 다음과 같이 수행됩니다.

```
string[] names = new string[2];
```

숫자(2)는 배열의 크기, 즉 배열에 넣을 수 있는 항목의 양입니다. 배열에 항목을 넣는 것도 매우 간단합니다.

```
names[0] = "John Doe";
```

그런데 왜 0일까요? 프로그래밍 세계의 많은 것들이 그렇듯이 계산은 1이 아닌 0부터 시작됩니다. 따라서 첫 번째 항목은 0으로 인덱싱되고 다음 항목은 1로 인덱싱됩니다. 배열을 항목으로 채울 때 너무 많이 채우면 예외가 발생하므로 이것을 기억해야 합니다. 이니셜 라이저를 보면 배열을 2 크기로 설정하면 항목 번호 0, 1, 2 를 넣는 것이 자연스러워 보일 수 있지만 이것은 하나의 항목이 너무 많습니다. 그렇게 하면 예외가 발생합니다. 예외에 대해서는 이후 장에서 설명하겠습니다.

이전에 우리는 루프에 대해 배웠고 분명히 이것은 배열과 잘 어울립니다. 배열에서 데이터를 가져오는 가장 일반적인 방법은 배열을 반복하고 각 값에 대해 일종의 작업을 수행하는 것입니다. 실제 예를 만들기 위해 이전의 배열을 사용해 보겠습니다.

```
using System;
using System.Collections;

namespace ConsoleApplication1
{
    class Program
    {
    static void Main(string[] args)
    {
        string[] names = new string[2];

        names[0] = "John Doe";
        names[1] = "Jane Doe";

        foreach(string s in names)
        Console.WriteLine(s);

        Console.ReadLine();
    }
    }
}
```

가장 쉽기 때문에 foreach 루프를 사용하지만 물론 다른 유형의 루프 중 하나를 대신 사용할 수도 있습니다. for 루프는 배열에도 적합합니다. 예를 들어 다음과 같이 각 항목을 계산해야하는 경우:

```
for(int i = 0; i < names.Length; i++)
    Console.WriteLine("Item number " + i + ": " + names[i]);
```

사실 매우 간단합니다. 배열의 Length 속성을 사용해서 루프가 반복해야 하는 횟수를 결정한 다음 카운터(i)를 사용해서 프로세스의 위치를 출력하고 배열에서 항목을 가져옵니다. 소위 인덱서라고 하는 숫자를 사용해서 배열에 항목을 넣는 것처럼 이를 사용해서 특정 항목을 다시 가져올 수 있습니다.

앞서 배열을 사용해서 값 범위를 정렬할 수 있다고 말했는데 실제로 매우 쉽습니다. Array 클래스에는 배열 작업을 위한 여러 가지 스마트 메서드가 포함되어 있습니다. 이 예제는 다른 것을 시도하기 위해 문자열 대신 숫자를 사용하지만 쉽게 문자열일 수 있습니다. 배열을 채우는 또 다른 방법을 보여 드리고 싶은데, 배열에 넣고자 하는 작은 미리 정의 된 항목 세트가있는 경우 훨씬 쉽습니다. 보세요:

```
int[] numbers = new int[5] { 4, 3, 8, 0, 5 };
```

한 줄로 크기가 5인 배열을 만들고 5개의 정수로 채웠습니다. 이렇게 배열을 채우면 컴파일러가 배열에 너무 많은 항목을 넣지 않았는지 확인하고 확인하기 때문에 추가적인 이점을 얻을 수 있습니다. 숫자를 더 추가해 보십시오 - 컴파일러가 그것에 대해 불평하는 것을 볼 수 있습니다.

실제로 다음과 같이 더 짧게 수행할 수 있습니다.

```
int[] numbers = { 4, 3, 8, 0, 5 };
```

이것은 짧고 크기를 지정할 필요가 없습니다. 하지만 첫 번째 접근 방식은 나중에 읽기가 더 쉬울 수 있습니다.

배열을 정렬해 봅시다 - 다음은 완전한 예입니다.

```
using System;
using System.Collections;

namespace ConsoleApplication1
{
    class Program
    {
    static void Main(string[] args)
    {
        int[] numbers = { 4, 3, 8, 0, 5 };

        Array.Sort(numbers);

        foreach(int i in numbers)
        Console.WriteLine(i);

        Console.ReadLine();
    }
    }
}
```

여기서 유일한 새로운 것은 Array.Sort 명령입니다. 다양한 종류의 정렬을 위해 다양한 매개변수를 사용할 수 있지만 이 경우 단순히 배열을 사용합니다. 결과에서 볼 수 있듯이 배열이 정렬되었습니다. Array 클래스에는 Reverse() 메서드와 같은 다른 메서드도 있습니다. Array 클래스의 모든 기능을 보려면 설명서에서 찾을 수 있습니다.

지금까지 사용한 배열은 하나의 차원만 가지고 있습니다. 그러나 C# 배열은 다차원적일 수 있으며 배열의 배열이라고도 합니다. 다차원 배열은 C#에서 사각형 배열과 들쭉날쭉한 배열의 두 가지 종류로 제공됩니다. 차이점은 직사각형 배열의 경우 모든 치수가 동일한 크기여야 하므로 직사각형이라는 이름이 붙었습니다. 들쭉날쭉한 배열은 다양한 크기의 차원을 가질 수 있습니다. 다차원 배열은 무거운 주제이며 이 튜토리얼의 범위를 약간 벗어납니다.





## Lists
C#에는 목록을 처리하기 위한 다양한 클래스가 있습니다. IList 인터페이스를 구현하며 가장 널리 사용되는 구현은 종종 List<T>라고 하는 일반 목록입니다. T는 목록에 포함된 개체의 형식을 지정하며, 컴파일러가 올바른 형식의 개체만 목록에 추가하는지 확인하고 확인하는 추가 이점이 있습니다. 즉, List<T>는 형식이 안전합니다.

List는 C#에서 제네릭 목록을 지원하기 전에 List 선택이었던 ArrayList 클래스와 매우 유사합니다. 따라서 List가 Array와 동일한 작업을 많이 수행할 수 있음을 알 수 있지만(그런데 IList 인터페이스도 구현함) 많은 상황에서 List가 더 간단하고 작업하기 쉽습니다. 예를 들어 특정 크기의 목록을 만들 필요는 없으며 대신 목록을 만들면 .NET은 항목을 추가할 때 항목의 양에 맞게 자동으로 확장합니다.

앞서 언급했듯이 T는 유형을 나타내며 목록에 포함할 개체의 유형을 지정하는 데 사용됩니다. 첫 번째 예에서는 문자열을 포함해야 하는 목록을 만드는 방법을 보여 드리겠습니다.

```
List<string> listOfStrings = new List<string>();
```

이렇게 하면 빈 목록이 생성되지만 나중에 Add 메서드를 사용해서 항목을 추가하는 것은 매우 쉽습니다.

```
listOfStrings.Add("a string");
```

그러나 문자열이 아닌 것을 추가하려고하면 컴파일러는 즉시 이에 대해 불평합니다.

```
listOfStrings.Add(2);
Error   CS1503  Argument 1: cannot convert from 'int' to 'string'
```

### 항목으로 목록 초기화
위의 예에서는 목록을 만든 다음 여기에 항목을 추가했습니다. 그러나 C#에서는 실제로 컬렉션 이니셜라이저라는 기술을 사용해서 동일한 문 내에서 목록을 만들고 항목을 추가할 수 있습니다. 어떻게 수행되는지 봅시다.

```
List<string> listOfNames = new List<string>()
{
    "John Doe",
    "Jane Doe",
    "Joe Doe"
};
```

구문은 매우 간단합니다. 일반적인 끝 세미콜론 앞에는 중괄호 세트가 있으며, 이 중괄호는 처음부터 목록에 표시하려는 값 목록을 보유합니다. 이것은 문자열 목록이므로 우리가 제공하는 초기 객체는 물론 문자열 유형이어야 합니다. 그러나 다음 예제에서 설명하듯이 자체 클래스를 사용하는 경우에도 다른 유형의 목록에 대해서도 똑같은 작업을 수행할 수 있습니다.

### 항목 작업
일반 목록의 항목으로 작업하는 방법에는 여러 가지가 있으며 그 중 일부를 보여주기 위해 더 큰 예제를 만들었습니다.

```
using System;
using System.Collections.Generic;

namespace Lists
{
    class Program
    {
    static void Main(string[] args)
    {
        List<User> listOfUsers = new List<User>()
        {
        new User() { Name = "John Doe", Age = 42 },
        new User() { Name = "Jane Doe", Age = 34 },
        new User() { Name = "Joe Doe", Age = 8 },
        };

        for(int i = 0; i < listOfUsers.Count; i++)
        {
        Console.WriteLine(listOfUsers[i].Name + " is " + listOfUsers[i].Age + " years old");
        }
        Console.ReadKey();
    }
    }

    class User
    {
    public string Name { get; set; }

    public int Age { get; set; }
    }
}
```

사용자에 대한 정보를 보유하기 위한 간단한 클래스(이름과 나이)를 정의하는 맨 아래부터 시작하겠습니다. 예제의 맨 부분으로 돌아가서 간단한 문자열 대신에 이 User 클래스를 사용하도록 목록을 변경했습니다. 컬렉션 이니셜 라이저를 사용해서 목록을 사용자로 채웁니다 - 구문이 이전과 동일하지만 문자열보다 더 복잡한 객체를 다루기 때문에 조금 더 복잡합니다.

목록이 준비되면 for 루프를 사용해서 목록을 실행합니다 - 얼마나 많은 반복을 수행할지 알기 위해 List의 Count 속성을 사용합니다. 각 반복에서 대괄호 구문 (예 : listOfUsers [i])을 사용해서 목록의 인덱서를 통해 문제의 사용자에 액세스합니다. 사용자가 있으면 이름과 나이를 출력합니다.

### 항목 추가, 삽입 및 제거
이미 목록에 단일 항목을 추가하려고 시도했지만 이를 위한 더 많은 옵션이 있습니다. 우선, 항목을 추가하는 대신 항목을 삽입할 수 있습니다 - 차이점은 Add 메서드는 항상 목록 끝에 추가되는 반면 Insert 메서드를 사용하면 특정 위치에 항목을 삽입할 수 있다는 것입니다. 예를 들면 다음과 같습니다.

```
List<string> listOfNames = new List<string>()
{
    "Joe Doe"
};
// Insert at the top (index 0)
listOfNames.Insert(0, "John Doe");
// Insert in the middle (index 1)
listOfNames.Insert(1, "Jane Doe");
```

목록을 단 하나의 항목으로 시작하지만 먼저 목록 상단에 두 개의 항목을 더 삽입한 다음 중간에 삽입합니다. Insert 메서드의 첫 번째 매개변수는 항목을 삽입하려는 인덱스입니다. 하지만 목록에 항목이 적으면 인덱스 3에 항목을 삽입하려고하면 예외가 발생합니다!

#### 여러 항목 추가
단일 항목을 추가하기 위한 Add 및 Insert 메서드가 있는 것처럼 여러 항목을 추가하고 삽입하는 해당 메서드도 있습니다. AddRange() 및 InsertRange() 라고 하며 IEnumerable 인터페이스를 매개 변수로 구현하는 모든 유형의 컬렉션을 허용합니다.

Range 메서드의 예로 AddRange 메서드와 컬렉션 이니셜라이저를 결합해서 단일 문에서 기존 목록에 여러 새 이름을 추가합니다.

```
listOfNames.AddRange(new string[]
        {
        "Jenna Doe",
        "Another Doe"
        });
```

즉석에서 문자열 배열을 만들고 해당 항목을 이전 예제의 이름 목록에 즉시 추가하기만 하면 됩니다.

#### 항목 제거
현재 목록에서 하나 이상의 항목을 제거하려는 경우 Remove() , RemoveAt() 및 RemoveAll()의 세 가지 방법을 마음대로 사용할 수 있습니다.


Remove() 메서드는 제거하려는 항목이라는 하나의 매개 변수만 사용합니다. 이것은 예를 들어 문자열 또는 정수 목록에 유용한데, 제거하려는 항목을 간단히 쓸 수 있기 때문입니다. 반면에 복잡한 객체 목록이있는 경우 Remove() 메서드에 전달할 수 있는 참조를 갖기 위해 먼저 해당 객체를 찾아야합니다. ̈나중에 처리합시다 - 다음은 Remove() 메서드로 단일 항목을 제거하는 방법에 대한 매우 기본적인 예입니다.

```
List<string> listOfNames = new List<string>()
{
    "John Doe",
    "Jane Doe",
    "Joe Doe",
    "Another Doe"
};

listOfNames.Remove("Joe Doe");
```

Remove() 메서드는 제거를 위해 지정한 객체의 첫 번째 인스턴스를 찾을 때까지 목록을 반복하고 제거합니다 - 하나의 인스턴스 만 제거하고 존재하지 않는 항목을 목록에 지정하면 오류가 발생하지 않습니다. 이 메서드는 항목을 제거할 수 있는 경우 true를 반환하고 그렇지 않은 경우 false를 반환합니다.

RemoveAt() 메서드는 목록의 인덱스/위치에 따라 항목을 제거할 수 있도록 해서 일반 목록이 인덱스 기반이라는 사실을 활용합니다. 예를 들어 다음과 같이 목록에서 첫 번째 항목을 제거할 수 있습니다.

```
listOfNames.RemoveAt(0);
```

또는 다음과 같이 목록의 마지막 항목:

```
listOfNames.RemoveAt(listOfNames.Count - 1);
```

다시 말하지만, 이것은 단일 항목 만 제거하며 이번에는 제거 할 항목의 인덱스를 제공 할 때 주의해야합니다 - 범위를 벗어난 인덱스 (0보다 낮거나 항목의 양보다 높음)를 사용하면 예외가 발생합니다! 따라서 자신이 무엇을 하고 있는지 확신하지 않는 한 예외를 처리하기 위해 RemoveAt() 메서드를 try-catch 블록으로 래핑할 수 있습니다(이 튜토리얼의 다른 곳에서 자세히 설명됨). RemoveAt() 메서드는 아무 것도 반환하지 않으므로 호출 전후에 목록의 항목 수를 확인해서 성공 여부를 결정해야 합니다.

RemoveAll()은 제거 메소드 중 가장 복잡하지만 확실히 가장 강력합니다. 메서드에 대한 대리자를 매개 변수로 사용하고이 메서드는 true 또는 false를 반환해서 항목을 제거해야 하는지 여부를 결정합니다. 이렇게 하면 항목을 제거할 때 고유한 논리를 적용할 수 있으며 한 번에 두 개 이상의 항목을 제거할 수도 있습니다. 대리자는 크고 복잡한 주제이기 때문에이 자습서의 다른 곳에서 다루겠지만 RemoveAll 메서드가 얼마나 멋진지 느끼기를 원하므로 여기에 예가 있습니다.

```
List<string> listOfNames = new List<string>()
{
    "John Doe",
    "Jane Doe",
    "Joe Doe",
    "Another Doe"
};

listOfNames.RemoveAll(name => 
{
    if (name.StartsWith("J"))
    return true;
    else
    return false;
});
```

이 예제에서는 익명 메서드(여기에서 설명하기에는 너무 복잡하지만 다른 장에서 다루겠습니다)를 RemoveAll 메서드의 매개 변수로 사용합니다. 우리의 익명 메서드는 매우 간단합니다 - 목록의 각 항목에 대해 호출되고 name이라는 매개변수가 있으며, 이는 물론 반복의 현재 항목입니다. 이 이름을 보고 "J"로 시작하면 true가 반환되고 그렇지 않으면 false가 반환됩니다. RemoveAll() 메서드는 이 응답(true 또는 false)을 사용해서 각 항목을 제거해야 하는지 여부를 결정합니다. 결국 초기 목록에는 Doe 멤버가 한 명만 남게 됩니다.

### 목록 항목 정렬
지금까지 우리가 작업한 목록의 항목은 목록에 추가된 순서대로 사용되었습니다. 그러나 특정 방식(예: 이름 목록의 경우 알파벳순)으로 항목을 정렬하고 싶을 수도 있습니다. List<T>에는 이를 위해 사용할 수 있는 Sort() 메서드가 있습니다.

```
List<string> listOfNames = new List<string>()
{
    "John Doe",
    "Jane Doe",
    "Joe Doe",
    "Another Doe"
};
listOfNames.Sort();
foreach (string name in listOfNames)
    Console.WriteLine(name);
```

출력에서 볼 수 있듯이 목록의 항목은 이제 알파벳순으로 정렬되었으며 대신 내림차순(Z에서 A까지)으로 정렬하려면 정렬을 수행한 후 Reverse() 메서드를 호출하기만 하면 됩니다.

```
listOfNames.Sort();
listOfNames.Reverse();
```

그래서 목록을 정렬하는 것은 꽤 쉬웠죠? 글쎄요, 문자열 목록이 있고 .NET 프레임워크가 두 문자열을 비교하는 방법을 정확히 알고 있기 때문에 주로 매우 쉬웠습니다. 숫자 목록이있는 경우 .NET은 물론 이를 정렬하는 방법도 알고 있습니다. 반면에 .NET에서 비교하는 방법을 알 수 없는 사용자 지정 개체 목록(List<T>에는 모든 개체가 포함될 수 있기 때문에)가 있을 수 있습니다. 이 문제에 대한 몇 가지 솔루션이 있습니다(예: IComparable 인터페이스를 구현하거나 LINQ를 사용하여(이 자습서의 뒷부분에서 둘 다 살펴보겠습니다) 빠른 수정으로 다음과 같이 두 항목이 서로 어떻게 쌓이는지 알아보기 위해 Sort() 메서드를 호출할 메서드를 제공할 수도 있습니다.

```
using System;
using System.Collections.Generic;

namespace ListSort
{
    class Program
    {
    static void Main(string[] args)
    {
        List<User> listOfUsers = new List<User>()
        {
        new User() { Name = "John Doe", Age = 42 },
        new User() { Name = "Jane Doe", Age = 39 },
        new User() { Name = "Joe Doe", Age = 13 },
        };
        listOfUsers.Sort(CompareUsers);
        foreach (User user in listOfUsers)
        Console.WriteLine(user.Name + ": " + user.Age + " years old");
    }

    public static int CompareUsers(User user1, User user2)
    {
        return user1.Age.CompareTo(user2.Age);
    }
    }

    public class User
    {
    public string Name { get; set; }
    public int Age { get; set; }
    }
}
```

이렇게 하면 예제에 꽤 많은 코드가 추가되었지만 실제로는 그리 복잡하지 않습니다. 맨 아래부터 시작하면 이름과 나이로 구성된 매우 간단한 User 클래스를 만들었습니다. 중간에 CompareUsers()라는 메서드를 선언했습니다 - 두 명의 사용자를 매개 변수로 사용한 다음 한 항목이 "더 작은", "동일한" 또는 "더 큰"(-1, 0 또는 1)인지 여부를 나타내는 정수를 반환합니다. 이 값은 Sort() 메서드에서 항목을 이동하는 데 사용되어 항목의 순서가 원하는 것과 일치하도록 합니다. 이 경우 비교를 위해 Age 속성을 사용해서 기본적으로 연령별로 정렬된 사용자 목록을 남깁니다.

### 요약
이 섹션는 이 튜토리얼에서 더 긴 섹션 중 하나이지만, 더 많은 프로그래밍을 할수록 목록과 사전이 얼마나 중요한지 더 많이 깨닫게 될 것이기 때문에 목록에 대해 많은 것을 배웠기를 바랍니다. 사전에 대해 말하자면, 다음 섹션에서 논의하겠습니다.





## Dictionaries
C#의 사전은 모두 IDictionary 인터페이스를 구현합니다. 여러 가지 사전 유형이 있지만 가장 일반적으로 사용되는 것은 종종 Dictionary<TKey, TValue라고 하는 일반 사전> 유형별 키와 해당 유형별 값을 보유합니다. 이것은 기본적으로 사전을 목록과 구분하는 것입니다 - 목록의 항목은 특정 순서로 제공되며 숫자 인덱스로 액세스할 수 있으며, 사전의 항목은 고유 키로 저장되며 항목을 다시 검색하는 데 사용할 수 있습니다.

사전이 무엇인지 더 자세히 알아보겠지만 먼저 간단한 예를 들어 사전이 무엇인지 보여드리겠습니다.

```
Dictionary<string, int> users = new Dictionary<string, int>();  
users.Add("John Doe", 42);  
users.Add("Jane Doe", 38);  
users.Add("Joe Doe", 12);  
users.Add("Jenna Doe", 12);

Console.WriteLine("John Doe is " + users["John Doe"] + " years old");
```

이 자습서의 예제에 대한 테스트 데이터인 Doe 제품군을 만나보세요. 아빠, 엄마, 쌍둥이 조와 제나. 문자열을 키 (이 경우 이름)로 사용하고 값 (이 경우 나이)에 대한 정수를 사용하도록 사전을 정의하는 방법을 확인하십시오. 멋진 점은 숫자 인덱스 대신 키(이름)를 사용해서 사전의 항목에 액세스할 수 있다는 것입니다. 예제의 마지막 줄에서 대괄호 집합 사이에 값을 지정하기만 하면 값(나이)에 액세스하는 것을 볼 수 있습니다.

여기서 알아야 할 두 가지 중요한 사항이 있습니다. 우선, 키는 고유해야 합니다. 이 경우 문자열을 키로 사용하는 경우 정확히 동일한 이름을 가진 두 명의 사용자를 추가할 수 없음을 의미합니다. 키를 사용해서 단일 항목을 참조할 수 있는 경우 키는 하나의 값만 가리킬 수 있기 때문에 꽤 의미가 있습니다. 반면에 중복 이름이 존재할 수 없는 사용자 모음을 가질 수 없기 때문에 이 예제를 너무 단순하게 만들지만 지금은 참아주세요.

사전에서 값에 액세스 할 때 기억해야하는 또 다른 사항은 키가 해당 값에 액세스하려고할 때 컬렉션에 존재해야한다는 것입니다. 즉, 내 예제는 목록에 포함된 내용을 완전히 제어 할 수있을까 안전했습니다 - 대부분의 상황에서 키를 사용하기 전에 항상 키가 존재하는지 확인해야합니다.

```
string key = "John Doe";
if(users.ContainsKey(key))
    Console.WriteLine("John Doe is " + users[key] + " years old");
```

이미 존재하는 키를 추가하려고 하거나 존재하지 않는 키로 값에 액세스하려고하면 NET에서 예외가 발생합니다. 당연하게 들릴지 모르지만 실제로 두 가지 모두 전 세계의 예외 로그에서 매우 일반적으로 발견됩니다.

### 항목 작업
단일 항목에 액세스하는 것은 매우 유용 할 수 있지만 컬렉션을 반복하고 예를 들어 무언가를 찾으려면 어떻게해야합니까? 이 경우 가장 먼저 알아야 할 것은 목록의 항목이 단순한 객체가 아니라 Dictionary 가 KeyValuePair<TKey, TValue> 형식의 항목을 보유한다는 것입니다. T는 목록을 선언하는 데 사용한 유형입니다 - 이 경우 문자열과 정수입니다. 따라서 foreach 루프를 사용해서 컬렉션을 반복하면 다음과 같이 표시됩니다.

```
Dictionary<string, int> users = new Dictionary<string, int>()
{
    { "John Doe", 42 },
    { "Jane Doe", 38 },
    { "Joe Doe", 12 },
    { "Jenna Doe", 12 }
};
foreach (KeyValuePair<string, int> user in users)
{
    Console.WriteLine(user.Key + " is " + user.Value + " years old");
}
```

가장 먼저 눈에 띄는 것은 사전을 초기화하는 방법을 변경할 수 있는 기회를 사용했다는 것입니다 - 사전을 인스턴스화한 후 각 항목을 수동으로 추가하는 대신 이전 섹션에서 설명한 대로 컬렉션 이니셜라이저 구문을 사용합니다.

이제 이전과 동일한 사전이 생겼습니다. 보시다시피 foreach 루프를 사용하고 사전을 선언하는 데 사용되는 것과 똑같은 두 가지 유형인 KeyValuePair<string, int> 로 예상하는 항목 유형을 선언했습니다. 이제 각 항목의 키와 값(이름 및 나이)에 모두 액세스할 수 있으며, 이를 사용해서 콘솔에 대한 사람에 대한 간단한 정보 문자열을 생성합니다.

#### 항목의 순서
위의 예는 매우 중요한 점을 제시합니다: 항목의 기본 순서가 숫자 인덱스에 의해 결정되는 List와 달리 사전의 항목 순서는 비결정적입니다 - 각 항목을 개별적으로 수동으로 추가하는 경우에도 항목이 특정 순서로 되어 있다고 의존할 수 없습니다. 물론 위의 예제를 실행하면 항목이 추가한 순서와 정확히 동일한 순서로 표시되는 것을 경험할 수 있지만 보장되는 것은 아니며 더 많은 항목이 있는 사전이 있고 항목 추가 및 제거를 시작하자마자 순서가 변경될 수 있습니다.


Dictionary 클래스는 Sort() 메서드와 함께 제공되지 않는데, 결국 정렬하더라도 다시 작업을 시작하자마자 순서가 변경될 수 있기 때문입니다. 대신 LINQ의 OrderBy() 및 OrderByDescending() 메서드를 사용해서 (자세한 내용은 다른 장에서 참조) 정렬된 사전의 복사본을 가져올 수 있습니다. 또한 키 또는 값별로 정렬할 수 있으며, 이는 이 예에서 유용할 수 있으며 사용자를 연령 순서대로 가져옵니다.

```
Dictionary<string, int> users = new Dictionary<string, int>()
{
    { "John Doe", 42 },
    { "Jane Doe", 38 },
    { "Joe Doe", 12 },
    { "Jenna Doe", 12 }
};
foreach (KeyValuePair<string, int> user in users.OrderBy(user => user.Value))
{
    Console.WriteLine(user.Key + " is " + user.Value + " years old");
}
```

예제를 실행하면 사전이 한 순서로 항목과 함께 선언되더라도 적절하다고 생각되는 다른 순서로 쉽게 가져올 수 있음을 알 수 있습니다. .NET Framework는 적절하다고 생각되는 대로 정확하게 저장하므로 원하는 순서대로 항목을 가져올 책임이 있습니다.



---




# Data types

## Introduction
이전 섹션에서는 데이터 유형의 개념에 대해 간략하게 논의했습니다. C#은 강력한 형식의 언어이기 때문에 어느 시점에서 알고 싶은 데이터 형식이 많이 있습니다. 시작하기 위해 문자열, 정수 및 부울과 같은 가장 기본적인 것에 대해 조금 이야기했습니다. 데이터 유형은 처음부터 매우 이론적이고 약간 지루한 주제이기 때문에 주제에 대해 더 자세히 알아보기 전에 약간의 프로그래밍 마법을 보여주고 싶었습니다.

그러나 이제 데이터 유형에 대해 더 많이 배워야 할 때가 왔습니다. 다음 섹션에서는 각 데이터 유형에 대해 훨씬 더 자세히 알아볼 것이므로 다양한 작업에 사용할 데이터 유형과 작업 방법을 알 수 있습니다.

이 시점에서 각 섹션를 읽거나 일부를 건너뛰거나 지금은 모두 건너뛸 수 있습니다. 그렇다면 걱정하지 마십시오 - 그냥 진행한 다음 하나 또는 여러 C# 데이터 유형에 대해 더 알고 싶을 때 돌아오십시오.





## Booleans
bool(부울) 데이터 형식은 false 또는 true의 두 가지 가능한 값만 있기 때문에 .NET Framework에서 발견되는 가장 간단한 데이터 형식 중 하나입니다. 다음과 같이 부울 변수를 선언할 수 있습니다.

```
bool isAdult;
```

기본적으로 bool 의 값은 false 이지만 변수를 선언 할 때 또는 나중에 변경할 수 있습니다.

```
bool isAdult = true;
```

부울 값으로 작업한다는 것은 일반적으로 현재 상태를 확인한 다음 if-문을 사용해서 반응하는 것을 의미합니다.

```
bool isAdult = true;  
if (isAdult == true)  
    Console.WriteLine("An adult");  
else  
    Console.WriteLine("A child");
```

그러나 실제로는 부울 값을 확인할 때 실제 부분을 생략할 수 있기 때문에 조금 더 짧게 수행할 수 있습니다.

```
bool isAdult = true;  
if (isAdult)  
    Console.WriteLine("An adult");  
else  
    Console.WriteLine("A child");
```

명시적인 접근 방식을 사용하는지 여부는 일반적으로 취향의 문제일 뿐입니다. 물론 false 를 확인할 수도 있습니다 - 키워드 true 를 false 키워드로 전환하거나 느낌표 연산자로 변수를 부정해서 할 수 있습니다.

```
bool isAdult = true;  
if (!isAdult)  
    Console.WriteLine("NOT an adult");  
else  
    Console.WriteLine("An adult");
```

if 문은 이제 기본적으로 "변수 isAdult 가 true의 반대입니까?", 논리적 부정 연산자라고도 알려진 느낌표 덕분입니다.

### 유형 변환
부울을 다른 유형으로 변환해야 할 필요성을 발견하는 경우는 매우 간단하기 때문에 흔하지 않습니다. 그러나 부울은 때때로 0(거짓) 또는 1(참)으로 표시되기 때문에 정수와 부울 사이를 변환해야 할 수도 있습니다. 이를 위해 대부분의 변환 작업에 도움이 될 수 있는 내장 Convert 클래스를 권장합니다. ToBoolean() 메서드를 사용해서 정수를 부울로 변환하고 다른 방법으로 이동하려면 ToInt32() 메서드를 사용하십시오. 예를 들면 다음과 같습니다.

```
int val = 1;
bool isAdult = Convert.ToBoolean(val);
Console.WriteLine("Bool: " + isAdult.ToString());
Console.WriteLine("Int: " + Convert.ToInt32(isAdult).ToString());
```

### 요약
bool 데이터 형식에는 false 또는 true의 두 가지 값만 있을 수 있습니다. if 문으로 쉽게 확인할 수 있으며 종종 많은 메서드의 반환 유형입니다.





## Integers
컴퓨터와 숫자는 밀접한 관련이 있으므로 프로그래밍할 때 다양한 형태의 숫자로 작업하는 경우가 매우 많습니다. C#에서 가장 일반적으로 사용되는 유형 중 하나는 정수입니다. "정수"라는 단어는 라틴어로 "전체"를 의미하는데, 정수는 소수 부분이 없는 숫자 - 정수이기 때문에 의미가 있습니다.

### Int32 - 기본 정수
잠시 후에 논의하겠지만 C#에는 다양한 정수 형식이 제공되지만 대부분의 경우 사용할 수 있는 정수는 32비트 정수인 Int32입니다. 다음과 같이 선언할 수 있습니다.

```
Int32 number;
```

그러나 이것은 실제로 C#에서 가장 많이 사용되는 정수 유형이기 때문에 바로 가기가 있습니다 - "int"를 쓰면 C#은 Int32에 대해 이야기하고 있다는 것을 자동으로 알 수 있습니다. 물론 선언하는 것과 동일한 명령문에서 값을 할당할 수도 있습니다.

```
int number = 42;
```

대소문자의 차이에 주목하십시오 - Int32는 클래스를 참조하므로 대문자 I로 시작하고 int는 키워드이므로 소문자 i로 시작합니다.

Int32는 -2,147,483,648에서 2,147,483,647 사이의 숫자를 보유할 수 있는 소위 부호 있는 정수입니다. Int32.MinValue 및 Int32.MaxValue 상수에 액세스해서 이를 확인할 수 있습니다. 더 큰 숫자가 필요하거나 작업할 숫자가 정수의 한계에 도달하지 않는다는 것을 이미 알고 있는 경우 다른 유형을 선택할 수 있습니다.

### 정수 유형
이미 언급했듯이 C#에는 많은 정수 유형이 있습니다. 사실, 이 섹션에서 모두 언급하기에는 너무 많지만 때때로 접하게 될 가장 일반적인 것은 다음과 같습니다.

- byte - 0에서 255 사이의 숫자를 보유할 수 있는 부호 없는 정수입니다.
- short - -32,768에서 32,767 사이의 값을 보유할 수 있는 16비트 부호 있는 정수입니다. 정식 이름 Int16으로도 알려져 있습니다.
- long - -9,223,372,036,854,775,808에서 9,223,372,036,854,775,807 사이의 값을 보유할 수 있는 64비트 정수입니다. 공식 이름 Int64로도 알려져 있습니다.

long 유형이 허용하는 것보다 더 큰 숫자를 보유해야 하는 경우 대신 ulong을 사용할 수 있습니다 - 최대 18,446,744,073,709,551,615의 값을 보유할 수 있는 부호 없는 정수입니다. 반면에 부호 없는 정수이기 때문에 음수 값을 허용하지 않습니다. 마찬가지로 uint 및 ushort와 같이 동일한 방식으로 작동하는 다른 정수 유형의 부호 없는 버전을 찾을 수 있습니다.

### 정수를 사용한 수학
일반적으로 정수와 숫자로 작업할 때 몇 가지 계산을 수행하려고 할 수 있습니다. 이것은 가장 일반적인 수학 연산자를 모두 그대로 사용할 수 있는 C#을 포함한 대부분의 프로그래밍 언어에서 매우 쉽습니다. 예를 들어 다음과 같은 계산을 수행할 수 있습니다.

```
int a = 42;  
int b = 8;  

Console.WriteLine(a + b);
```

숫자 50이 콘솔에 인쇄됩니다. 특별한 작업을하지 않고이 계산을 어떻게 처리 할 수 있는지 확인하십시오 - 변수와 수학적 더하기 연산자를 지정하면 됩니다.

다른 수학 연산자를 사용하려는 경우에도 마찬가지이며 물론 아직 변수로 정의되지 않은 숫자도 사용할 수 있습니다.

```
int a = 42;  
int b = 8;  

Console.WriteLine(200 - ((a + b) * 2));
```

추가 괄호 집합에 주목하십시오 - 일반 수학에서와 마찬가지로 연산 순서를 처리해야 합니다.

#### 정수와 나눗셈
이제 더하기, 빼기, 곱하기를 마쳤으니 나눗셈에 대해 조금 이야기해 보겠습니다. 다음 예를 고려하십시오.

```
int a = 10;
int b = 3;

Console.WriteLine(a / b);
```

당신은 아마도 당신의 머리로 그것을 계산할 수 있으므로 결과가 3.3333333333333 일 것이라는 것을 알 수 있습니다. 그러나 예제를 실행하면 이상한 것을 볼 수 있습니다 - 결과는 대신 3입니다. 그 이유는 두 정수를 나누면 C#에서도 정수를 반환하고 정수에는 분수를 포함할 수 없기 때문에 결과가 반올림되기 때문입니다(이 경우 3으로 축소). 따라서 분수로 결과를 원하면 변수 중 하나를 부동 소수점 변수로 선언하거나(나중에 자세히 설명) 그 중 하나를 즉석에서 타입캐스트해야 합니다.

```
int a = 10;
int b = 3;

Console.WriteLine((float)a / b);
```

### 유형 변환/캐스팅
정수에서 정수로 변환하는 방법에 대해 자세히 이야기해 보겠습니다. 우선, C#에서는 다양한 정수 유형 간의 암시적 및 명시적 변환을 허용합니다. 암시적 변환의 예는 다음과 같습니다.

```
int a = 10;
long b = a;
```

즉, 정수가 있으면 긴 것으로 취급할 수 있습니다. 이것은 C#이 정수 값이 long 안에 들어갈 수 있다는 것을 알고 있기 때문에 가능합니다. 반면에 그 반대는 사실이 아닐 수 있으므로 명시적 변환을 사용해야 합니다.

```
long a = 10;
int b = (int)a;
```

이것은 물론 잠재적으로 잘못될 수있는 일을 하고 있다는 것을 인식시키기 위한 것입니다 - 일반 정수의 용량을 초과하는 긴 값을 가지면, 당신은 곤경에 처하게 됩니다!

### 요약
정수 및 부동 소수점과 같은 숫자 작업은 거의 모든 프로그래밍 작업에서 많이 수행하게 될 작업입니다. 정수에 대한 새로운 지식과 정수 작업 방법을 얻었으므로 다음 섹션에서 부동 소수점 값으로 넘어갈 차례입니다.





## Floating points
부동 소수점 숫자는 소수 부분이 있는 숫자입니다(일반적으로 소수점으로 표시됨). 숫자(분수 또는 분수 없음)를 처리하는 데 단일 데이터 유형이 없는 이유가 궁금할 수 있지만 컴퓨터가 분수가 포함된 숫자보다 정수를 처리하는 것이 훨씬 빠르기 때문입니다. 따라서 정수만 다룰 것이라는 것을 알고 있다면 정수 데이터 유형을 선택하십시오. 그렇지 않으면 이 문서에 설명된 대로 부동 소수점 데이터 형식 중 하나를 사용합니다.

부동 소수점 값을 사용하는 것은 정수를 사용하는 것만큼 쉽지만 부동 소수점 값에 대한 몇 가지 우려 사항이 더 있으며 이에 대해서는 나중에 설명합니다. 지금은 가장 일반적으로 사용되는 부동 소수점 데이터 유형 중 하나인 double을 선언할 때 어떻게 보이는지 살펴보겠습니다.

```
double number;
```

정수와 마찬가지로 선언하는 동시에 값을 할당할 수 있습니다.

```
double number = 42.0;
```

float 및 decimal 유형도 마찬가지이며 잠시 후에 논의되지만 여기서는 표기법이 약간 다릅니다.

```
double doubleVal = 42.0;
float floatVal = 42.0f;
decimal decimalVal = 42.0m;
```

숫자 뒤의 "f"와 "m"을 주목하십시오 - 그것은 우리가 부동 소수점과 십진수 값을 할당하고 있음을 컴파일러에 알려줍니다. 이 값이 없으면 C#은 숫자를 double로 해석하며 float 또는 decimal로 자동 변환할 수 없습니다.

### float, double 또는 decimal?
프로그래밍에서 부동 소수점 값을 다루는 것은 항상 많은 질문과 우려를 불러일으켰습니다. 예를 들어 C#에는 정수가 아닌 숫자/정수가 아닌 숫자를 처리하기 위한 세 가지 이상의 데이터 형식이 있습니다.

- float(System.Single의 별칭)
- double(System.Double의 별칭)
- decimal(System.Decimal의 별칭)

컴퓨터가 내부적으로 어떻게 작동하는지에 대한 많은 지식이 없는 한 근본적인 차이점을 이해하기 약간 어려울 수 있으므로 여기서는 보다 실용적인 내용을 고수하겠습니다.

일반적으로 float, double 및 decimal 데이터 유형의 차이점은 정밀도에 있으며 따라서 이를 보유하는 데 사용되는 메모리의 양에 있습니다. float는 가장 저렴한 것으로 최대 7자리의 숫자를 나타낼 수 있습니다. double은 최대 16자리로 더 정확하고 십진수는 최대 29자리로 가장 정확합니다.

그 모든 정밀도가 필요한 것이 무엇인지 궁금할 수 있지만 대답은 "수학 문제"입니다. 차이점을 이해하는 고전적인 예는 10을 3으로 나누는 것입니다. 우리 대부분은 머릿속으로 그렇게 하고 결과가 3.33이라고 말하지만, 많은 사람들이 그것이 완전히 정확하지 않다는 것을 알고 있습니다. 진짜 답은 3.33 다음에 추가 3 의 양이 뒤따르는 것입니다 - C #으로이 계산을 수행 할 때 데이터 유형에 따라 결정됩니다. 이 예제를 확인하십시오.

```
float a = 10f / 3;
Console.WriteLine(a);
double b = 10d / 3;
Console.WriteLine(b);
decimal c = 10m / 3;
Console.WriteLine(c);
```

정확히 동일한 계산을 수행하지만 데이터 유형이 다릅니다. 결과는 다음과 같습니다.

```
a: 3.333333
b: 3.33333333333333
c: 3.3333333333333333333333333333
```

그 차이는 매우 분명하지만 대부분의 작업에 실제로 얼마나 많은 정밀도가 필요합니까?

#### 선택 방법
우선, 저장해야 하는 자릿수를 고려해야 합니다. float는 7자리 숫자만 포함할 수 있으므로 그보다 더 큰 숫자가 필요한 경우 대신 double 또는 decimal을 사용하는 것이 좋습니다.

둘째, float와 double은 모두 실제 값의 근사치로 값을 나타냅니다. 이는 또한 이러한 변수로 점점 더 많은 계산을 시작하면 더 이상 정확하지 않을 수 있음을 의미하며, 이는 기본적으로 동일하게 확인되어야 하는 두 값이 갑자기 같지 않다는 것을 의미합니다.

따라서 정밀도가 주요 관심사인 상황에서는 십진수 유형을 사용해야 합니다. 좋은 예는 재무 숫자(돈)를 나타내는 것입니다 - 결과가 예상한 것과 다르다는 것을 알기 위해 장부에 10개의 금액을 추가하고 싶지 않습니다. 반면에 성능이 더 중요하다면 float(작은 숫자의 경우) 또는 double(큰 숫자의 경우)을 사용해야 합니다. 십진수는 추가 정밀도 덕분에 부동 소수점보다 훨씬 느립니다 - 일부 테스트에 따르면 최대 20배 느립니다!

### 요약
부동 소수점 값을 처리할 때 정밀도가 성능보다 덜 중요한 경우 float 또는 double 데이터 유형을 사용해야 합니다. 반면에 최대 정밀도를 원하고 더 낮은 수준의 성능을 기꺼이 받아들이려면 특히 재무 수치를 다룰 때 10진수 데이터 유형을 사용해야 합니다.

이러한 데이터 유형 간의 근본적인 차이점에 대해 훨씬 더 자세한 수준에서 더 알고 싶다면 이 매우 자세한 섹션를 살펴봐야 합니다: 모든 컴퓨터 과학자가 부동 소수점 산술에 대해 알아야 할 사항





## The Char type
System.Char 데이터 형식은 단일 유니코드 문자를 보유하는 데 사용됩니다. C#에는 char 변수를 선언할 때 사용할 수 있는 char라는 별칭이 있습니다.

```
char ch;
```

물론 원하는 경우 즉시 값을 할당할 수 있습니다. C#에서 char는 작은따옴표 집합으로 묶여 있습니다.

```
char ch = 'H';
```

문자열(다음 장에서 설명)은 기본적으로 문자 범위일 뿐이므로 NET은 실제로 문자열을 나타내기 위해 char 목록을 사용합니다. 이는 또한 문자열에서 단일 char를 가져오거나 문자열을 반복해서 각 문자를 char 데이터 유형으로 가져올 수 있음을 의미합니다.

```
string helloWorld = "Hello, world!";
foreach(char c in helloWorld)
{
    Console.WriteLine(c);
}
```

헬멧 아래에서 char는 숫자 값으로, 각 문자에는 유니코드 "알파벳"의 특정 숫자가 있습니다. 이 글을 쓰는 시점에는 라틴어/서양 알파벳에서 역사적 문자에 이르기까지 130.000개 이상의 다양한 유니코드 문자가 있습니다. 따라서 C#에서는 이전 예제의 약간 확장된 버전에서 볼 수 있듯이 char 데이터 형식에서 숫자 표현으로 매우 쉽게 이동할 수 있습니다.

```
string helloWorld = "Hello, world!";
foreach(char c in helloWorld)
{
    Console.WriteLine(c + ": " + (int)c);
}
```

문자를 출력한 다음 숫자 표현을 출력하기만 하면 char를 정수로 캐스팅하기만 하면 됩니다. 이것은 또한 숫자에서 문자로 반대 방향으로 쉽게 이동할 수 있음을 의미합니다. 그런데 왜 그렇게 하겠습니까? 글쎄, 대부분의 키보드에서 직접 사용할 수 없는 많은 문자가 있습니다(예: copyright (©) 문자). 대신 유니코드 조회 테이블을 사용해서 필요한 문자의 숫자 버전을 찾은 다음 char로 만들 수 있습니다.

```
char ch = (char)169;
Console.WriteLine(ch);
```

### Char 도우미 메서드
Char 클래스에는 현재 다루고있는 char 유형을 결정하는 데 도움이 될 수 있는 몇 가지 정말 멋진 도우미 메서드가 있습니다. 이것은 입력을 검증할 때와 같은 많은 상황에서 매우 유용합니다. 예를 들면 다음과 같습니다.

```
Console.WriteLine("Enter a single number:");
char ch = Console.ReadKey(true).KeyChar;
if (Char.IsDigit(ch))
    Console.WriteLine("Thank you!");
else
    Console.WriteLine("Wrong - please try again!");
```

사용자가 누른 첫 번째 키를 읽은 다음 Char.IsDigit() 메서드를 사용해서 숫자인지 여부를 확인합니다. 그리고 캐릭터의 유형을 확인하는 이와 같은 많은 방법이 있습니다. 이것을 사용해서 매우 간단한 문자열 유효성 검사를 수행할 수 있습니다.

```
Console.WriteLine("Write your name:");
string name = Console.ReadLine();  
bool isValid = true;  
for(int i = 0; i < name.Length; i++)  
{  
    char ch = name[i];  
    if((i == 0) && ((!Char.IsLetter(ch)) || (!Char.IsUpper(ch))))  
    {  
    Console.WriteLine("The first character has to be an uppercase letter!");  
    isValid = false;  
    break;  
    }  
    if(Char.IsDigit(ch))  
    {  
    Console.WriteLine("No digits allowed!");  
    isValid = false;  
    break;  
    }  
}  
if (isValid)  
    Console.WriteLine("Hello, " + name);
```

사용자가 입력한 이름을 반복하고 다양한 버전의 Is* 메서드를 사용해서 입력이 간단한 요구 사항과 일치하는지 확인합니다. 그리고 Char.IsLetterOrDigit() 메서드와 같은 몇 가지 다른 유용한 메서드가 있습니다. 전체 목록을 보려면 설명서를 살펴보십시오.

### 요약
char 데이터 형식(System.Char의 별칭)은 단일 유니코드 문자를 나타내는 데 사용됩니다. 둘 이상의 문자를 나타내려면 기본적으로 문자 목록인 문자열을 사용합니다. 다음 섹션에서는 문자열에 대해 설명합니다.





## Strings
문자열은 텍스트 조각입니다. 일반적으로 2자 이상으로 구성되는데, 1자만 있으면 대신 char를 사용하는 것을 고려해야 합니다. 그러나 문자열은 참조 유형이기 때문에 비어 있거나 null일 수도 있습니다. 문자열은 이미 작업한 다른 데이터 유형과 매우 유사하게 선언할 수 있습니다.

```
string s;
```

또는 즉시 값을 할당하려는 경우 :

```
string name = "John Doe";
```

C #에서 큰따옴표 집합 내의 모든 것은 위의 예에서와 같이 문자열로 간주됩니다 - 큰따옴표 사이에 하나 또는 여러 문자를 둘러싸는 것은 단순히 컴파일러에게 그 사이의 항목이 키워드 및 명령 대신 문자열로 해석되어야한다고 말하는 방법입니다.

### 문자열은 변경할 수 없습니다.
C#에서 문자열은 변경할 수 없으며, 이는 기본적으로 문자열이 생성되면 변경할 수 없음을 의미합니다. 이는 일상적인 사용에서는 분명히 실용적이지 않으므로 프레임워크는 우리를 돕습니다 - 변경하기 위해 새 문자열을 계속 선언할 필요 없이 기존 문자열을 변경할 때마다 새 문자열을 생성합니다. 이렇게 하면 프로세스가 원활하게 이루어지지만 자신도 모르게 코드의 효율성이 떨어질 수도 있습니다. 이를 설명하는 예는 다음과 같습니다.

```
string numbers = "";
for (int i = 0; i < 10000; i++)
    numbers += i.ToString();
```

이 경우 10.000번 반복하며 매번 현재 인덱스를 문자열에 추가합니다. 방금 얻은 지식을 통해 이제 최신 숫자를 포함하도록 기존 문자열을 변경하는 대신 새 문자열이 생성된 다음 이전 변수에 할당되어 프레임워크에서 이전 값을 정리할 수 있다는 것을 알 수 있습니다. 그리고 이것은 10.000번 발생합니다! 대신 일반적으로 여러 작업을 통해 문자열을 작성할 것이라는 것을 알고 있는 경우 소위 StringBuilder를 사용하는 것이 좋습니다.

```
StringBuilder numbers = new StringBuilder();
for (int i = 0; i < 10000; i++)
    numbers.Append(i);
Console.WriteLine(numbers.ToString());
```

### 기본 문자열 연산
문자열이 불변이라는 것에 대한 모든 것을 말했음에도 불구하고 여전히 간단한 문자열을 많이 조작하고 작업하는 것을 발견하게 될 것이며 그것에 대해 걱정하지 마십시오 - 거대한 루프 내에서 작업하지 않는 한 문제가 없을 것입니다! 다음은 문자열로 할 수 있는 몇 가지 기본 작업입니다.

두 개 이상의 문자열을 "추가"하기만 하면 연결할 수 있습니다(더하기 연산자 사용).

```
string name = "John" + " " + "Doe";
```

물론 큰따옴표로 묶인 문자열과 문자열이거나 문자열로 바꿀 수 있는 변수를 혼합하는 변수에 대해서도 동일한 작업을 수행할 수 있습니다(모든 객체에 있는 ToString() 메서드 사용). 그러나 더 "깨끗한"방법은 String 클래스에있는 Format 메서드를 사용하는 것입니다.

```
string name = "John Doe";
int age = 42;
string userString = String.Format("{0} is {1} years old and lives in {2}", name, age, "New York");
```

번호가 매겨진 자리 표시자 ({0}, {1} 등)를 사용한 다음 값을 메서드에 매개 변수로 제공하는 방법을 확인하십시오. 인덱스와 자리 표시자의 양은 전달하는 매개변수와 일치해야 한다는 점을 기억하십시오!

Length 속성을 사용하면 예를 들어 유효성 검사 목적으로 문자열의 현재 길이를 확인할 수 있습니다. Length 속성은 Substring() 및 IndexOf() 메서드와 같은 다른 속성 및 메서드와 함께 사용할 때도 매우 유용합니다. Substring 메서드를 사용하면 문자열의 일부를 검색할 수 있고 IndexOf 메서드를 사용하면 주어진 문자/문자열의 첫 번째 인덱스를 찾을 수 있습니다. 예를 들어 설명하겠습니다.

```
string name = "John Doe";
int indexOfSpace = name.IndexOf(' ') + 1;
string lastName = name.Substring(indexOfSpace, name.Length - indexOfSpace);
Console.WriteLine(lastName);
```

빠른 설명: 이름을 정의한 다음 IndexOf() 메서드를 사용해서 공백 문자의 첫 번째 위치를 찾습니다. 그런 다음 Substring() 메서드를 사용해서 시작 위치와 길이를 제공해서 공백 문자 뒤의 모든 것을 가져옵니다.


String 클래스의 또 다른 멋진 도우미 메서드는 Replace() 메서드입니다. 문자열을 가져온 다음 다음과 같이 검색/바꾸기 작업을 실행할 수 있습니다.

```
string name = "John Doe";
Console.WriteLine(name.Replace("John", "Jane"));
```

Replace() 메서드는 전혀 엄격하지 않습니다 - 검색중인 문자열 (첫 번째 매개 변수)이 없으면 아무 일도 일어나지 않습니다 (예외가 발생하지 않음 또는 이와 유사한 것이 발생하지 않음). 있는 경우 두 번째 매개변수로 대체됩니다. 그러나 바꾸기 전에 확인하려면 Contains() 메서드를 사용할 수 있습니다.

```
string name = "John Doe";
if (name.Contains("John"))
    Console.WriteLine(name.Replace("John", "Jane"));
else
    Console.WriteLine("John was not found!");
```

때로는 문자열이 특정 char 또는 문자열로 시작하는지 또는 끝나는지 알고 싶을 때가 있습니다. 이를 위해 String 클래스는 이름에서 알 수 있듯이 작동하는 StartsWith() 및 EndsWith() 메서드를 사용할 수 있습니다.

```
string name = "John Doe";
if ((name.StartsWith("John")) && (name.EndsWith("Doe")))
    Console.WriteLine("Hello, Mr. Doe!");
```

훨씬 더 멋진 String 메서드가 있으며 이러한 짧은 예제에서 설명하는 것보다 확실히 더 많은 방법을 사용합니다. 이에 대해 자세히 알고 싶다면 String 클래스에 대한 MSDN 설명서를 참조하십시오.

### 축어적 문자열 및 이스케이프
문자열을 정의할 때 특정 문자가 특별한 목적을 가지고 있음을 곧 알 수 있습니다. 이것의 가장 중요한 예는 큰 따옴표 자체입니다., 컴파일러에 문자열의 시작과 끝을 표시하는 데 사용되기 때문에 문자열 내에서 어떻게 사용할 수 있습니까? 이에 대한 가장 간단한 대답은 컴파일러에 특수 문자를 일반적인 함수 대신 문자 그대로 처리해야 한다는 신호를 보내는 이스케이프입니다. 예를 들면 다음과 같습니다.

```
Console.WriteLine("What do you mean by \"Hello, world\" ??");
```

실행되면 결과는 다음과 같습니다.

```
What do you mean by "Hello, world" ??
```

즉, 우리는 단순히 큰따옴표 앞에 백슬래시를 사용해서 이것이 문자열의 끝이 아니라 실제로 큰따옴표가 필요함을 나타냅니다. 그렇게... 백슬래시를 원하고 다른 문자를 이스케이프하는 데 사용하는 것이 아니라 실제로 원한다면 어떻게 될까요? 그럼 당신도 그것에서 벗어나야 할 것입니다 - 또 다른 백슬래시를 사용합니다.

```
Console.WriteLine("Right here \\ Right now");
```

결과:

```
Right here \ Right now
```

그 이유는 백슬래시가 큰따옴표를 이스케이프하는 데 사용되는 것뿐만 아니라 특별한 의미를 부여하기 위해 문자 범위에 접두사를 붙이는 데에도 사용되기 때문입니다. 예를 들어, \n은 새 줄, \t는 탭 문자 등입니다. 여기에서 멋진 탈출 시퀀스 목록을 찾을 수 있습니다.

### 축어적 문자열
이 모든 이스케이프의 대안으로 축어적 문자열을 사용할 수 있습니다. 일반 문자열 선언과 비슷하지만 @ 문자 접두사가 붙고 그 안에서 모든 문자는 문자 그대로 처리됩니다.

```
Console.WriteLine(@"In a verbatim string \ everything is literal: \n & \t");
```

출력은 입력과 똑같이 보입니다.

```
In a verbatim string \ everything is literal: \n & \t
```

이 규칙에는 단 한 가지 예외가 있습니다 : 큰따옴표는 여전히 이스케이프 되어야하지만 그렇지 않으면 컴파일러가 문자열을 끝내려고 하는지 여부를 어떻게 알 수 있기 때문에 꽤 의미가 있습니다. 그러나 축어적 문자열에서 큰따옴표는 백슬래시로 이스케이프되지 않고 대신 다음과 같이 다른 큰따옴표로 이스케이프됩니다.

```
Console.WriteLine(@"What do you mean by ""Hello, world"" ??");
```

결과는 다음과 같습니다.

```
What do you mean by "Hello, world" ??

```

### 요약
문자열은 모든 프로그래머에게 매우 중요한 주제입니다 - 코드를 작성하는 데 소비하는 대부분의 시간 동안 일종의 문자열 처리를 수행하게 될 것입니다. 다행히도 C#에는 이 섹션에서 설명하려고 했듯이 이를 수행하는 데 필요한 모든 도구가 있습니다.





## Working with Dates & Time
C#에는 날짜와 시간 작업을 위한 정말 훌륭한 구조체가 포함되어 있습니다. 실제로 데이터 유형은 아니지만, DateTime 구조체를 사용해서 날짜 및/또는 시간으로 작업하는 경우가 많기 때문에이 장에 포함시켰습니다.

새 DateTime 객체를 인스턴스화하는 것부터 시작하겠습니다.

```
DateTime dt = new DateTime();
Console.WriteLine(dt.ToString());
```

결과는 꽤 지루합니다: 01-01-0001 00:00:00. 이는 DateTime.MinValue 필드에 해당하지만 DateTime에는 더 많은 도움이 되는 속성이 있습니다.

```
DateTime dt = DateTime.Now;
Console.WriteLine(dt.ToString());
```

이렇게 하면 현재 날짜와 시간이 남게 되며, 이는 종종 매우 관련성이 높습니다. 그러나 많은 상황에서 특정 날짜와 시간을 나타내려고 할 수 있습니다 - 다행스럽게도 DateTime에는 이를 도와주는 여러 생성자가 있습니다. 예를 들면 다음과 같습니다.

```
DateTime dt = new DateTime(2042, 12, 24);
Console.WriteLine(dt.ToString());
```

이 생성자의 매개 변수 순서는 Year, Month, Day이므로 2042년의 크리스마스 이브를 나타내는 날짜가 있는 DateTime 개체가 제공됩니다.

### DateTime - 시간이 있거나 없습니까?
하지만 시간은 어떻습니까? 글쎄, 하나를 지정하지 않으면 이전 예에서 볼 수 있듯이 기본적으로 00:00:00이 됩니다. 시간도 쉽게 지정할 수 있습니다.

```
DateTime dt = new DateTime(2042, 12, 24, 18, 42, 0);
Console.WriteLine(dt.ToString());
```

이제 DateTime에도 시간이 있습니다(이 경우 18:42). 입력에 24시간제를 사용하기 때문에 시간은 0에서 23 사이의 숫자로 지정해야 하지만 AM/PM이 있는 12시간제로 원하더라도 걱정하지 마십시오.

남은 질문은 날짜 부분에만 관심이 있다면 어떻게 해야 합니까? 명백한 대답은 DateTime 클래스 대신 Date 클래스를 사용하는 것이지만 실제로는 그런 것이 존재하지 않습니다. 대신 DateTime 클래스에는 Date 속성이 있습니다.

```
DateTime dt = new DateTime(2042, 12, 24, 18, 42, 0);
DateTime date = dt.Date;
Console.WriteLine(date.ToString());
```

그러나 보시다시피 Date 속성은 시간 부분이 00:00:00으로 설정된 DateTime 개체이기도 합니다. 이것은 약간 혼란스러울 수 있지만 DateTime은 항상 컨테이너 역할을 해야 하며 다양한 방법과 형식으로 사용자에게 출력할 수 있는 데이터를 보유해야 하기 때문에 꽤 의미가 있습니다. 우리는 이미 기본 ToString() 메서드를 사용했지만 DateTime 객체의 출력을 얻는 더 많은 방법이 있습니다.

### DateTime 출력
DateTime의 출력을 얻는 것은 가장 중요한 측면 중 하나이지만 복잡한 작업이 될 수도 있습니다. 지금까지 우리는 출력의 매우 기본적인 버전인 ToString() 메서드에 대한 간단한 호출을 보았습니다. 이렇게 하면 기본적으로 시스템 설정을 기반으로 하는 애플리케이션의 현재 문화권에 따라 날짜와 시간이 출력됩니다. 즉, ToString() 메서드를 호출하면 날짜와 시간이 전 세계 어디에 있든 사용자에게 의미가 있는 방식으로 표시됩니다.

출력을 더 잘 제어하려는 경우 여러 가지 방법이 있습니다. 가장 빠른 방법은 To* 메서드 중 하나를 사용하는 것입니다(예: ToShortDateString() 메서드).

```
Console.WriteLine(DateTime.Now.ToShortDateString());
```

이렇게 하면 시간 부분을 완전히 생략한 짧은 버전의 날짜가 출력됩니다. ToLongDateString() 메서드를 사용할 수도 있습니다.

```
Console.WriteLine(DateTime.Now.ToLongDateString());
```

출력은 지역 설정에 따라 달라지지만 일반적으로 긴 날짜에는 숫자 표현 대신 월의 텍스트 표현이 포함됩니다.

날짜/시간 정보를 특정 지역에 맞게 조정하려는 경우 ToString() 메서드의 오버로드 중 하나를 사용할 수 있습니다.

```
var usCulture = new System.Globalization.CultureInfo("en-US");
Console.WriteLine(DateTime.Now.ToString(usCulture.DateTimeFormat));
```

CultureInfo 클래스를 사용하면 언어에 대한 전체 정보 상자(예: 날짜 및 시간을 작성하는 방법)를 가져올 수 있습니다(CultureInfo 클래스는 이 자습서의 뒷부분에서 다룹니다). 그런 다음 이 정보를 DateTime 클래스에 전달해서 이 언어와 일치하는 날짜 및 시간의 시각적 표현을 원한다는 것을 알릴 수 있습니다. 하지만 출력에 대해 더 구체적으로 알고 싶다면 어떻게 해야 할까요?

### 표준 날짜 및 시간 형식 문자열
출력을 더 세부적으로 제어하려면 .NET Framework에서 제공하는 표준 날짜 및 시간 형식 문자열을 사용할 수 있습니다. 날짜 및/또는 시간을 표시하는 방법을 나타내는 데 사용되는 한 글자입니다. 전체 목록은 문서를 살펴보는 것이 좋지만 지금은 몇 가지 예가 있습니다.

```
DateTime dt = new DateTime(2042, 12, 24, 18, 42, 0);  

Console.WriteLine("Short date pattern (d): " + dt.ToString("d"));  
Console.WriteLine("Long date pattern (D): " + dt.ToString("D"));  
Console.WriteLine("Full date/time pattern (F): " + dt.ToString("F"));  
Console.WriteLine("Year/month pattern (y): " + dt.ToString("y"));
```

출력은 다음과 같습니다.

```
Short date pattern (d):         24-12-2042
Long date pattern (D):      24. december 2042
Full date/time pattern (F):     24. december 2042 18:42:00
Year/month pattern (y):         december 2042
```

이렇게 하면 출력을 좀 더 제어할 수 있지만 때로는 충분하지 않은 경우가 있습니다.

#### 사용자 지정 날짜 및 시간 형식 문자열
모든 권한을 위해 사용자 지정 형식 문자열이 있습니다. 이는 ToString() 메서드에 전달하는 문자와 특수 문자의 조합으로, 날짜 및/또는 시간에 대해 원하는 정확한 형식을 표시합니다. 분명히 이것은 당신에게 많은 옵션을 남기므로 사용 가능한 형식 지정자의 전체 목록은 문서를 확인하되 어떻게 작동하는지 바로 살펴 보겠습니다.

```
DateTime dt = new DateTime(2042, 12, 24, 18, 42, 0);

Console.WriteLine(dt.ToString("MM'/'dd yyyy"));
Console.WriteLine(dt.ToString("dd.MM.yyyy"));
Console.WriteLine(dt.ToString("MM.dd.yyyy HH:mm"));
Console.WriteLine(dt.ToString("dddd, MMMM (yyyy): HH:mm:ss"));
Console.WriteLine(dt.ToString("dddd @ hh:mm tt", System.Globalization.CultureInfo.InvariantCulture));
```

출력은 다음과 같습니다.

```
12/24 2042
24.12.2042
12.24.2042 18:42
onsdag, december (2042): 18:42:00
Wednesday @ 06:42 PM
```

일반적으로 하나 또는 여러 개의 d는 하루의 일부 버전을 얻고, 하나 또는 여러 개의 M은 월을 제공하고(소문자 m은 분을 나타냄) 여러 y는 연도를 제공합니다. 이러한 형식 지정자가 수행하는 작업을 완전히 이해하려면 여전히 문서를 살펴보는 것이 좋지만 위의 예제를 통해 사용자 지정 형식 문자열이 얼마나 강력한지에 대한 좋은 아이디어를 얻을 수 있기를 바랍니다.

### 날짜 구문 분석
지금까지 코드에서 직접 정의된 날짜로 작업했지만 사용자가 지정한 날짜로 작업해야 하는 상황에 빠르게 직면하게 될 것입니다. 날짜를 쓰는 방법은 너무 많기 때문에 이것은 놀라울 정도로 복잡한 주제입니다. .NET Framework는 이전 예제에서 설명한 것처럼 모든 문화권을 지원하므로 이 작업을 수행할 수 있지만 사용자가 예상한 형식으로 날짜를 지정할 수 있도록 도와야 합니다. 그런 다음 Parse() 메서드를 사용해서 다음과 같이 사용자 지정 문자열을 DateTime 개체로 변환할 수 있습니다.

```
var usCulture = new System.Globalization.CultureInfo("en-US");
Console.WriteLine("Please specify a date. Format: " + usCulture.DateTimeFormat.ShortDatePattern);
string dateString = Console.ReadLine();
DateTime userDate = DateTime.Parse(dateString, usCulture.DateTimeFormat);
Console.WriteLine("Date entered (long date format):" + userDate.ToLongDateString());
```

이 예제는 사용하려는 CultureInfo 클래스의 인스턴스가 있는 한 .NET 프레임워크가 얼마나 도움이 될 수 있는지 보여주기 때문에 실제로 매우 멋집니다(이 경우 미국 영어 - 걱정하지 마십시오. 나중에 CultureInfo 클래스에 대해 훨씬 더 자세히 논의할 것입니다). 이것이 생기자마자 사용자에게 예상하는 형식을 알려주는 데 사용합니다. 그런 다음 4번째 줄에서 다시 사용해서 실제로 입력을 구문 분석합니다. 마지막 줄에서는 이번에는 시스템에서 지정한 형식만 사용해서 사용자 지정 날짜를 출력합니다.

그러나 Parse() 메서드는 매우 엄격합니다 - 사용자가 예상 형식으로 날짜를 입력하지 않으면 예외가 발생합니다. 이러한 이유로 일반적으로 TryParse() 메서드를 대신 사용하는 것이 좋습니다 - 똑같은 작업을 수행하지만 날짜를 구문 분석할 수 있는지 여부를 확인할 수 있으며 예외를 발생시키지 않습니다. 다음은 이전 예제의 수정된 버전입니다.

```
var usCulture = new System.Globalization.CultureInfo("en-US");
Console.WriteLine("Please specify a date. Format: " + usCulture.DateTimeFormat.ShortDatePattern);
string dateString = Console.ReadLine();
DateTime userDate;
if (DateTime.TryParse(dateString, usCulture.DateTimeFormat, System.Globalization.DateTimeStyles.None, out userDate))
    Console.WriteLine("Valid date entered (long date format):" + userDate.ToLongDateString());
else
    Console.WriteLine("Invalid date specified!");
```

### 요약
날짜와 시간 작업은 매우 중요하지만 매우 복잡합니다. 운 좋게도 .NET 프레임워크는 뛰어난 DateTime 클래스를 사용해서 거의 모든 상황에서 우리를 돕습니다.







## Nullable types
NULL은 말 그대로 아무 의미도 없습니다 - 아직 값을 보유하지 않는 변수입니다. 튜토리얼의 이 시점에서 의도적이든 아니든 초기화되지 않은 변수를 이미 처리했을 수 있습니다. 그렇지 않은 경우 NullReferenceException이 발생할 수 있습니다.

NULL은 자신의 객체와 문자열을 다룰 때 특히 관련이 있습니다. 반면에 정수와 같은 숫자를 다룰 때는 항상 (기본값) 값이 있음을 알 수 있습니다. 정수의 경우 기본값/대체 값은 0(영)이며, 이는 NULL과 혼동해서는 안 됩니다. 0은 숫자이고 NULL은 아무것도 아닙니다.

따라서 정의되지 않은 / NULL 값을 나타내는 숫자를 원하면 정수 변수에 null을 할당 할 수 없기 때문에 막혔다고 느낄 수 있습니다. 물론 그 정수가 nullable 로 정의되지 않는 한 - 이와 같은 상황을 위해 만들어진 특수 언어 구조입니다. 물음표를 사용해서 형식을 사후 수정해서 nullable 변수를 정의합니다. 다음은 차이점을 설명하는 예입니다.

```
int notNullable = null; // Will cause an error from the compiler

int? nullable = null; // Just fine - it's nullable!
```

이것은 정수, 부동 소수점, 부울 및 구조체와 같은 소위 모든 값 유형에 유효합니다. 반면에 문자열과 개체는 참조 형식이며 기본적으로 null을 허용하므로 null을 허용하는 것으로 선언할 수 없습니다.

### null에 대한 null 허용 확인
이제 null 일 수있는 변수를 정의했으므로 이것이 사실인지 확인하는 것이 분명히 중요합니다. 다른 형식과 마찬가지로 변수를 null kewyord와 비교하거나 nullable 개체가 System.Nullable 구조체에서 상속하는 HasValue 속성을 사용하는 두 가지 방법으로 이 작업을 수행할 수 있습니다. 예를 들면 다음과 같습니다.

```
int? nullable = null;  
if (nullable == null)  
    Console.WriteLine("It's a null!");  
if (!nullable.HasValue)  
    Console.WriteLine("It's a null!");
```

결과는 동일하므로 가장 읽기 쉽고 이해하기 쉬운 방법을 사용하십시오. 이제 값이 null 일 수 있으므로 사용하기 전에 항상 확인해야합니다 - 그렇지 않으면 예외가 발생할 수 있습니다.

### nullable 값 사용
System.Nullable에서 nullable 개체도 Value 속성을 상속합니다. 이는 nullable 개체의 실제 값을 검색하는 데 사용할 수 있습니다. 그러나 == 및 != 연산자를 사용하는 것과 같은 간단한 비교 작업의 경우 C#을 사용하면 Value 속성을 생략하고 nullable 객체를 직접 비교할 수 있습니다. 즉, 이 두 예제는 모두 동일한 작업을 수행합니다.

```
int? nullable = 42;

if (nullable.Value == 42)  
    Console.WriteLine("It's 42!");  

if (nullable == 42)  
    Console.WriteLine("It's 42!");
```

Nullable 객체는 항상 기본 데이터 형식(예: 이전 예제와 같이 정수)에서 가져옵니다. 이러한 데이터 형식에는 기본값이 있을 수 있지만 nullable 기본값은 항상 null입니다. 그렇기 때문에 앞에서 설명한 대로 값을 사용하기 전에 null 참조를 확인해야 합니다. 그러나 nullable 유형은 사용할 수있는 매우 멋진 도우미 메서드 인 GetValueOrDefault()를 상속합니다. null이 아닌 한 nullable 개체의 값을 반환하며, 이 경우 기본 형식의 기본값을 반환합니다. 따라서 nullable 정수의 경우 0을 반환하고 nullable 부울의 경우 false 등을 반환합니다. 이를 통해 단일 문에서 값의 확인과 검색을 모두 처리할 수 있습니다.

```
if ((nullable.HasValue) && (nullable.Value == 42))
    Console.WriteLine("It's 42!");

if(nullable.GetValueOrDefault() == 42)
    Console.WriteLine("It's 42!");
```

보시다시피 후자의 예는 동일한 작업을 수행하면서 더 짧고 읽기 쉽습니다.

### 요약
정수 및 부울과 같은 C#의 값 형식에는 항상 기본값이 있습니다. 예를 들어 0과 null을 구별해야 하거나 사용자가 무언가에 대해 "false"를 적극적으로 선택했는지 또는 변수가 기본값 false를 보유하는지 여부를 알아야 하기 때문에이 동작을 해결하려는 경우 유형을 ? (물음표).





## Implicitly typed variables (the var keyword)
C# 버전 3.0부터는 변수의 형식을 명시적으로 선언하는 대신 변수 선언의 왼쪽에 var 키워드를 사용할 수 있습니다. 이것은 항상 유형을 지정해야하는 클래스 수준이 아닌 메서드 내부에서만 가능합니다. var 키워드를 사용할 때 어떻게 보이는지 봅시다.

```
int age = 42; // Explicitly typed variable

var name = "John Doe"; // Implicitly typed variable
```

두 개의 변수 - 하나는 int 유형으로 선언되고 다른 하나는 문자열로 지정하는 대신 var 키워드로 선언됩니다. 유형을 선언 할 때는 필요하지 않지만 var 키워드를 사용할 때는 필요하기 때문에 두 경우 모두 값을 할당하고 있습니다. 그 이유는 C# 컴파일러가 명령문의 오른쪽 부분에서 유형을 유추하기 때문입니다 - 컴파일 중에 변수에 할당하려는 것을 살펴본 다음 var 키워드를 적절한 유형으로 변경합니다.

이것은 또한 var 키워드를 사용할 때 오버헤드가 없음을 의미합니다 - .NET 프레임워크가 코드를 실행할 때 본질적으로 그렇기 때문에 런타임 중에 명시 적으로 선언 된 변수만큼 빠릅니다.

우리의 첫 번째 예는 매우 사소합니다 - "string" 대신 "var"를 작성하는 데 많은 시간이 절약되지 않습니다. 그러나 때로는 훨씬 더 복잡한 유형을 새 변수로 선언하거나 함수(사용자 정의 또는 프레임워크)의 로컬 결과로 선언할 수도 있습니다. 다음과 같은 예에서 상당한 양의 키 입력을 저장할 수 있는 기회가 있습니다.

```
Dictionary<int, List<string>> dict1 = new Dictionary<int, List<string>>();

var dict2 = new Dictionary<int, List<string>>();
```

결과는 정확히 동일하지만 후자의 예제에서는 확실히 일부 키 입력을 저장하고 두 경우 모두 오른쪽에 유형을 지정하기 때문에 이와 같은 예제에서 var 키워드를 사용할 때 코드의 가독성이 거의 손실되지 않습니다.

메서드 호출의 결과로 지역 변수를 선언할 때 var 키워드를 사용할 수도 있습니다.

```
var s = DateTime.Now.ToString();
```

다시 말하지만, 더 빠르고 무슨 일이 일어나는지, 변수가 어떤 유형(문자열)을 보유할 것인지 여전히 매우 명확합니다. 하지만 이와 같은 경우에는 그렇지 않을 수도 있습니다.

```
var myVar = SomeMethodWithANameWhichDoesntIndicateTheReturnType();
```

이와 같은 상황에서는 변수에 무엇이 포함될지 전혀 명확하지 않으며 코드의 가독성을 희생할 수 있습니다. 여기에서 명시 적으로 입력 된 변수를 사용하는 것을 고려할 수 있습니다.

### var 키워드 및 익명 유형
지금까지 var 키워드로 본 예제는 대부분 "구문 설탕" 부서에서 가져온 것입니다. 그러나 익명 유형으로 작업할 때(나중에 자세히 설명) var 키워드를 사용해서 객체를 선언하는 것이 좋습니다.

```
var myObj = new
{
    Name = "John Doe",
    Age = 42
};
Console.WriteLine(myObj.Name);
```

이 경우 이 예제와 같이 나중에 익명 유형의 필드에 액세스하려면 var 키워드가 실제로 필요합니다.

### 요약
var 키워드를 사용하면 유형을 명시적으로 명시하지 않고 지역 변수(메서드 또는 루프 내부)를 선언할 수 있습니다. 이것은 많은 상황에서 정말 편리 할 수 있지만 코드를 약간 덜 읽을 수 있습니다. 그것을 사용하거나 변수 유형을 명시 적으로 선언 할 수 있습니다 - 원하는 대로 그러나 이미 설명했듯이 익명 유형에는 필요합니다.





## The dynamic Type
C# 버전 4.0에서 Microsoft는 새로운 형식인 동적을 도입했습니다. 실제로는 정적 유형이지만 다른 정적 유형과 달리 동적 객체의 (잠재적인) 멤버는 컴파일러에서 확인하지 않습니다. 이렇게 하면 동적/약한 형식의 언어의 장점 중 일부를 제공하는 동시에 다른 모든 경우에는 강력한 형식의 언어의 장점을 유지할 수 있습니다.

동적 선언은 다른 유형을 선언하는 것과 같습니다 - 데이터 유형 대신 dynamic 키워드를 사용하면 됩니다.

```
dynamic d1;
dynamic d2 = "A string";
dynamic d3 = 42;
```

이제 세 개의 다른 객체가 있습니다 - 첫 번째는 이 시점에서 실제로 아무것도 아니고 (null), 두 번째는 문자열이고 세 번째는 정수입니다. 인터프리터는 변수에 할당한 내용에 따라 런타임에 이를 자동으로 결정합니다. 이는 또한 컴파일러가 다음 예제와 같이 이러한 변수로 수행하는 작업을 확인하지 않는다는 것을 의미합니다.

```
dynamic d1;
dynamic d2 = "A string";
dynamic d3 = 42;
Console.WriteLine(d2.Length);
Console.WriteLine(d3.Length);
```

문자열에는 문자열의 길이를 결정하는 length 속성이 있지만 정수는 그렇지 않습니다. 이 경우 두 변수 모두에서 이 속성을 사용하려고하면 컴파일러가 이에 대해 불평하지 않을 것입니다 - 이러한 변수가 문자열과 정수로 선언되었다면 컴파일러는 가로챘을 것입니다. 그러나 유형은 동적이기 때문에 컴파일하고 실행됩니다. 그러나 인터프리터가 마지막 줄에 도달하자마자 존재하지 않는 속성에 액세스 할 수 없기 때문에 예외가 발생합니다.

이것은 또한 동적 유형의 위험을 보여줍니다 - 컴파일러가 작업을 다시 확인하지 않기 때문에 기본적으로 매번 실패하는 코드를 게시 할 수 있기 때문에 무엇을하고 있는지 알고 모든 속성과 메서드 호출을 올바르게 철자해야 합니다.

### 동적 개체
물론 dynamic 키워드는 정수 및 문자열보다 더 복잡한 유형에 사용할 수 있습니다. 이에 대한 좋은 예는 다음과 같이 익명 객체를 보유하는 데 사용되는 경우입니다.

```
dynamic user = new
{
    Name = "John Doe",
    Age = 42
};
Console.WriteLine(user.Name + " is " + user.Age + " years old");
```

이를 통해 먼저 클래스를 정의하지 않고도 개체를 만들 수 있습니다. dynamic 키워드를 사용해서 보유할 수 있지만 var 키워드도 사용할 수 있으므로 많은 상황에서 더 적합할 수 있습니다.

유형이 동적이기 때문에 나중에 다음과 같이 속성을 추가 할 수 있다고 생각할 수 있습니다.

```
dynamic user = new
{
    Name = "John Doe",
    Age = 42
};
user.HomeTown = "New York";
```

동적 형식에서는 컴파일 타임 검사가 수행되지 않으므로 컴파일러가 실제로 HomeTown 속성의 존재 여부를 확인하지 않기 때문에 이 코드는 실제로 실행되지만 마지막 줄에 도달하자마자 예외가 throw됩니다. 동적 유형은 매우 동적이지만 새 속성을 동적으로 추가할 수는 없습니다. 이를 위해 다음 섹션에서 설명할 ExpandoObject를 사용할 수 있습니다.

### 유형 변경
동적으로 선언된 변수는 전혀 형식이 없습니다. 대신 C#은 내부적으로 할당한 개체의 종류로 처리합니다. 첫 번째 예에서는 변수를 동적으로 선언하고 문자열 또는 정수를 할당한 다음 이러한 유형에 속하는 속성을 사용하기 시작하는 방법을 볼 수 있습니다. 그러나 동적 변수의 유형을 쉽게 변경할 수 있습니다 - 새 값을 할당하기만 하면 됩니다. 예를 들면 다음과 같습니다.

```
dynamic user = new
{
    Name = "John Doe",
    Age = 42
};
Console.WriteLine(user.GetType() + ": " + user.Name + " is " + user.Age + " years old");
user = "Jane Doe";
Console.WriteLine(user.GetType() + ": String.Length = " + user.Length);
```

동적 사용자 변수를 사용하는 방법을 살펴보십시오. 먼저 익명 객체를 보유한 다음 대신 간단한 문자열을 할당합니다. 모든 C# 개체에 있는 GetType() 메서드를 사용해서 유효성을 검사하고, 두 경우 모두 현재 가지고 있는 형식에 있는 속성(익명 개체의 첫 번째 Name/Age 속성, 문자열 개체에 있는 Length 속성)에 액세스합니다.

### 요약
dynamic 키워드를 사용하면 유형별로 지정되지 않은 변수를 사용할 수 있습니다. 동적 변수에 새 값을 쉽게 할당할 수 있으며, 할당하는 값 유형이 현재 보유 중인 값과 동일하지 않으면 동적 변수가 자동으로 유형을 변경합니다.

동적 변수는 컴파일러에서 확인하지 않으므로 존재하거나 존재하지 않을 수 있는 속성에 액세스할 수 있습니다. 이렇게 하면 매우 유연하지만 애플리케이션이 오류에 훨씬 더 취약해집니다. 특히 이러한 이유로 동적 키워드를 사용하지 않고는 원하는 것을 달성할 수 없는 상황으로 동적 키워드의 사용을 제한할 수 있습니다. dynamic 키워드를 사용하는 것이 좋은 경우의 예로는 COM interop 및 JSON 및 XML과 같은 데이터 형식과 상호 작용할 때가 있습니다.





## The ExpandoObject
이전 섹션에서 보았듯이 dynamic 키워드를 사용해서 클래스를 먼저 정의하지 않고도 속성을 정의할 수 있는 객체를 보유할 수 있습니다. 동적 객체로 할 수 없는 것은 객체가 초기화된 후 동적으로 속성을 추가하는 것입니다. 이 특정 기능이 필요한 경우 C#에는 ExpandoObject라는 솔루션이 함께 제공됩니다. 사용이 얼마나 쉬운지 알 수 있도록 예로 바로 이동해 보겠습니다.

```
dynamic user = new System.Dynamic.ExpandoObject();
user.Name = "John Doe";
user.Age = 42;
user.HomeTown = "New York";
Console.WriteLine(user.Name + " is " + user.Age + " years old and lives in " + user.HomeTown);
```

ExpandoObject 를 인스턴스화하더라도 동적 유형으로 객체를 선언한다는 것을 알 수 있습니다. 그 이유는 객체가 ExpandoObject로 선언되면 컴파일러가 객체를 확인하고 즉시 우리가 발명한 속성(이름, 연령 등)이 부족하다고 불평하기 때문입니다. 이전 섹션에서 배운 것처럼 컴파일러가 우리가 사용하는 속성의 존재를 확인하는 것을 방지하는 동적으로 선언해서 이를 방지할 수 있습니다.

멋진 점은 ExpandoObject 가 ExpandoObject 의 속성이기도 가질 수 있으므로 다음 예제와 같이 즉석에서 복잡한 유형을 만들 수 있다는 것입니다.

```
dynamic user = new System.Dynamic.ExpandoObject();
user.Name = "John Doe";
user.Age = 42;

user.HomeTown = new System.Dynamic.ExpandoObject();
user.HomeTown.Name = "New York";
user.HomeTown.ZipCode = 10001;

Console.WriteLine(user.Name + " is " + user.Age + " years old and lives in " + user.HomeTown.Name + " [" + user.HomeTown.ZipCode + "]");
```

HomeTown 속성을 문자열에서 ExpandoObject로 변경 한 다음 속성 (이 경우 도시의 이름과 우편 번호)을 추가하기 만하면됩니다. 그러나 그것으로 끝날 필요는 없습니다 - 우리는 또한 몇 가지 매우 정교한 트릭을 사용해서 즉석에서 객체에 메서드를 추가할 수도 있습니다.

```
user.DescribeUser = (Func<String>)(() => {
    return user.Name + " is " + user.Age + " years old and lives in " + user.HomeTown.Name + " [" + user.HomeTown.ZipCode + "]";
});

Console.WriteLine(user.DescribeUser());
```

꽤 깔끔한 것이지만 ExpandoObject 는 실제로 무엇입니까? 몇 가지 흥미로운 인터페이스를 구현하지만 그 중 하나는 IDictionary<string, object> - 이것은 모든 구문 설탕 아래에서 ExpandoObject 는 기본적으로 문자열 키를 기반으로 객체 값을 보유하는 사전이라는 것을 의미합니다. 이는 또한 ExpandoObject를 반복하는 것이 일반 사전을 반복하는 것만큼 쉽다는 것을 의미합니다. 이것은 매우 실용적입니다.

```
dynamic user = new System.Dynamic.ExpandoObject();  
user.Name = "John Doe";  
user.Age = 42;  

foreach (KeyValuePair<string, object> kvp in user)
{
    Console.WriteLine(kvp.Key + ": " + kvp.Value);
}
```

### 요약
ExpandoObject 형식을 사용하면 즉석에서 개체를 정의한 다음 원할 때마다 속성을 추가할 수 있습니다. 기본적으로 동적 유형이기 때문에 이전 섹션에서 논의한 것과 동일한 장점과 단점을 상속합니다. 보너스로 ExpandoObject 는 INotifyPropertyChanged 인터페이스를 구현하는데, 예를 들어 응용 프로그램에 WPF를 사용하는 경우 확실히 감사할 것입니다.





## Anonymous Types
지금까지 우리는 객체가 클래스에서 온다는 것을 배웠습니다. 클래스는 여러 필드, 속성 및/또는 메서드로 선언된 다음 이 클래스의 인스턴스를 객체로 만들 수 있습니다. 그러나 익명 형식이 도입됨에 따라 더 이상 개체를 만들기 전에 클래스를 선언할 필요가 없습니다. 익명 유형(또는 객체)에는 몇 가지 제한 사항이 있기 때문에 클래스는 전혀 죽지 않았지만 일부 상황에서는 정말 훌륭합니다!

익명 유형은 객체 이니셜라이저와 함께 new 연산자를 사용해서 초기화됩니다 - 그런 점에서 클래스를 인스턴스화하는 것과 매우 유사하며 클래스 이름만 생략합니다. 또한 객체 뒤에 클래스가 없으므로 객체에 대한 참조를 검색할 때 var 키워드를 사용해야 합니다. 복잡하게 들릴 수 있지만 다음 예제는 전혀 복잡하지 않다는 것을 보여줍니다.

```
var user = new    
{    
    Name = "John Doe",    
    Age = 42   
};
Console.WriteLine(user.Name + " - " + user.Age + " years old");
```

이제 사용자에 대한 정보(이름 및 나이)가 있는 개체가 있습니다. 익명 유형은 많은 상황, 특히 문자열이나 숫자보다 더 복잡한 것을 빠르게 반환해야 하는 경우에 유용합니다. 익명 유형을 사용하면 먼저 클래스를 선언한 다음 필요할 때 이 클래스를 변경하는 것에 대해 걱정하지 않고 즉석에서 속성을 만들 수 있습니다. 그러나 앞서 언급했듯이 클래스 정의보다 익명 유형을 사용하는 것을 고려할 때 알아야 할 몇 가지 제한 사항이 있습니다.

- 실제 클래스와 달리 익명 유형은 필드나 메서드를 가질 수 없으며 속성만 가질 수 있습니다.
- 개체가 초기화되면 새 속성을 추가할 수 없습니다
- 속성은 읽기 전용입니다 - 개체가 초기화되는 즉시 해당 값을 변경할 수 없습니다.

그러나 익명 유형은 여전히 많은 작업에 매우 실용적입니다. 일반적인 사용 시나리오는 복잡한 객체 (정의 된 클래스에서)가 있고 예를 들어 브라우저로 보내기 위해 객체를 가능한 한 작게 유지해야하거나 전체 객체에 소비자에게 노출하고 싶지 않은 민감한 정보가 있기 때문에 단순화해야하는 경우입니다. 익명 형식은 다음 예제와 같이 이에 적합합니다.

```
using System;
using System.IO;

namespace AnonymousTypes
{
    class Program
    {
    static void Main(string[] args)
    {
        string pathOfExe = System.Reflection.Assembly.GetEntryAssembly().Location;
        FileInfo fileInfo = new FileInfo(pathOfExe);
        var simpleFileInfo = new
        {
        Filename = fileInfo.Name,
        FileSize = fileInfo.Length
        };
        Console.WriteLine("File name: " + simpleFileInfo.Filename + ". Size: " + simpleFileInfo.FileSize + " bytes");
    }
    }
}
```

첫 번째 줄은 단순히 현재 실행 중인 파일, 즉 자체 응용 프로그램의 파일 이름을 가져옵니다. 이를 사용해서 FileInfo 클래스의 인스턴스를 생성하면 이 특정 파일에 대한 많은 정보가 포함됩니다. 우리는 그 모든 정보를 원하지 않으므로 원래 FileInfo 인스턴스의 정보를 사용해서 익명 유형으로 단순화된 버전을 만듭니다. 마지막 줄에서는 이 정보를 몇 가지 기본 출력에 사용합니다.

아마도 익명 유형(Filename 및 FileSize)에 정의된 각 속성에 이름을 부여한다는 것을 눈치채셨을 것입니다. 그러나 기존 객체의 정보를 기반으로 객체를 만들 때 실제로 우리 자신의 이름을 생략하고 컴파일러가 다음과 같이 할당한 속성의 이름만 사용하도록 할 수 있습니다.

```
var simpleFileInfo = new
{
    fileInfo.Name,
    fileInfo.Length
};
```

이제 Filename 및 FileSize 대신 Name 및 Length라는 두 가지 속성이 있습니다. 이름에 신경 쓰지 않거나 아마도 더 가능성이 더 높은 경우 : 실제로 원래 개체와 정확히 동일한 이름을 선호하는 경우.

### 요약
익명 유형을 사용하면 하나 이상의 속성을 사용해서 개체를 빠르게 인스턴스화할 수 있습니다. 이러한 속성은 읽기 전용이며 나중에 더 많은 속성을 추가할 수 없습니다.




---





# Operators

## Introduction
연산자는 기본적으로 단일 문자 또는 여러 문자의 특정 조합인 기호로, 표현식에서 수행할 연산(수학, 물론 인덱싱, 함수 호출 등)을 지정합니다. 이 자습서의 이전 섹션를 읽었다면 변수 등에 대해 배울 때 사용된 할당 연산자(단일 등호)와 같은 여러 연산자를 이미 보았을 것입니다.

지금까지 우리는 이러한 연산자에 대해 대부분 자명했기 때문에 실제로 이야기하지 않았습니다. 그러나 C#의 모든 연산자가 그런 것은 아니며(그리고 저를 믿으세요, 많은 연산자가 있습니다), 그것을 볼 때 이해가 되는 사람들에게도 적절한 이름을 얻고 내부적으로 작동하는 방식에 대해 조금 더 배우는 것이 좋습니다.

다음 몇 섹션에서는 간단한 연산자와 단순하지 않은 C# 연산자를 모두 살펴보고, 그 기능에 대해 이야기하고, 이를 사용하는 방법을 보여 드리겠습니다. 이 섹션에서 코드를 해석할 때 어떤 일이 일어나는지 더 잘 이해할 수 있는 매우 귀중한 정보를 찾을 수 있지만 이전에 읽은 것보다 조금 더 이론적일 것입니다. 지금 당장 너무 많은 것으로 판명되면 일부를 건너뛰고 나중에 다시 돌아올 수 있습니다.





## Comparison operators
C#에는 많은 연산자가 있으며 그 중 일부는 값을 비교하는 데 사용됩니다. 이것은 프로그래밍할 때 두 개 이상의 값이 서로 어떻게 관련되어 있는지 확인하는 매우 일반적인 작업입니다. 이 장에서는 값을 비교하는 데 사용되는 이러한 연산자를 살펴보겠습니다 - 아마도 그 중 일부를 이미 알고 있을 수 있지만 어쨌든 살펴보고 새로운 것을 배우는지 확인하십시오!

### 같음 연산자: ==
두 값을 비교하는 것은 분명히 여러 가지 방법으로 수행할 수 있지만 실제로 같은지 확인하려면 이중 등호(==) 연산자를 사용할 수 있습니다. 방법을 보여드리겠습니다.

```
int val1 = 42;
int val2 = 42;
if(val1 == val2)
    Console.WriteLine(val1 + " is equal to " + val2);
```

내가 하나가 아닌 두 개의 등호를 서로 바로 뒤에 사용하는 방법을 주목하십시오 - 이것은 당신이 단독 같은 부호를 사용하면 비교하는 대신 값을 할당 할 것이기 때문에 중요합니다.

### NOT equal 연산자: !=
때로는 두 값이 같지 않고 같지 않은지 확인해야 합니다. C #에는 이에 대한 연산자가 있습니다 - 첫 번째 등호를 느낌표로 바꾸기만 하면 됩니다. 다음은 이전의 예제이지만 대신 not equal 연산자를 사용합니다.

```
int val1 = 42;
int val2 = 43;
if(val1 != val2)
    Console.WriteLine(val1 + " is NOT equal to " + val2);
```

### 작고 큰 연산자: < 및 >
특히 숫자를 비교할 때 한 값이 다른 값보다 크거나 작은지 확인하고 싶어하는 경우가 많습니다. 다음과 같이 보다 큼 및 보다 작은 기호를 사용합니다.

```
int val1 = 42;
int val2 = 43;
if(val1 > val2)
    Console.WriteLine(val1 + " is larger than " + val2);
else
{
    if(val1 < val2)
        Console.WriteLine(val1 + " is smaller than " + val2);
    else
        Console.WriteLine(val1 + " is equal to " + val2);
}
```

### 작거나 크다: <= 및 >=
위의 예에서는 값이 다른 값보다 작거나 큰지 확인하지만 때로는 더 작거나 큰 대신 어떤 것이 작거나 같거나 크거나 같은지 확인하고 싶을 때가 있습니다. 이 경우 다음과 같이 smaller/bigger-than 연산자 뒤에 등호를 넣으십시오.

```
int val1 = 42;
if (val1 >= 42)
    Console.WriteLine("val1 is larger than or equal to 42");
if (val1 <= 42)
    Console.WriteLine("val1 is smaller than or equal to 42");
```

### 요약
항목을 비교하는 것은 프로그래밍에서 매우 필수적인 작업이지만 다행히도 C#에는 이 문서와 같이 도움이 되는 다양한 연산자가 있습니다. 그러나 때로는 두 객체를 비교하는 것이 두 숫자를 비교하는 것만큼 간단하지 않습니다 - 이를 위해 C#을 사용하면 비교와 같은 작업을 수행하기 위한 사용자 정의 메서드를 작성할 수 있습니다. 연산자 과부하에 대한 섹션에서 이에 대해 살펴보겠습니다.





## Increment/decrement operators
값, 특히 숫자 종류를 다룰 때 종종 1을 더하거나 빼야 할 필요가 있습니다. 물론 이것은 매우 쉽습니다 – 값을 가져와 1을 더한 다음 원래 변수에 다시 할당하기만 하면 됩니다. 예를 들면 다음과 같습니다.

```
int userAge = 41; 
userAge = userAge + 1; 
```

userAge 변수에는 이제 41 대신 42 값이 포함됩니다. 물론 1로 빼고 싶을 때도 같은 작업을 수행 할 수 있습니다.

```
userAge = userAge - 1; 
```

### 접미사 증가/감소
그러나 C#에는 이 작업을 처리하기 위한 훨씬 짧은 연산자인 증가/감소 연산자가 있습니다. 단순히 두 개의 더하기 또는 두 개의 빼기 기호로 구성됩니다. 다음은 이 연산자를 사용하도록 다시 작성된 첫 번째 예제입니다.

```
int userAge = 41; 
userAge++; 
Console.WriteLine("Age of user: " + userAge); 
```

결과는 똑같지만 얼마나 짧은지 보세요! 그리고 이 연산자는 물론 기존 문 내부에서 사용할 수 있기 때문에 더 짧게 만들 수 있습니다.

```
int userAge = 41; 
Console.WriteLine("Age of user: " + userAge++); 
```

하지만 잠깐만요 – 이것을 테스트할 때 userAge가 여전히 41로 인쇄되는 것을 볼 수 있습니다. 왜? 우리는 주변 문 이후에 평가되는 접미사 버전을 사용하고 있기 때문입니다. 즉, 값이 증가하기 전에 줄이 인쇄됩니다. 경우에 따라 원하는 동작이지만 이 특정 사용 사례에는 최적이 아닙니다. 필요한 것은 접두사 증분 연산자입니다.

### 접두사 증가/감소
이 연산자는 접미사 버전과 똑같이 보이지만 변수 뒤에 나타나는 대신 앞에 나타나 인터프리터가 주변 문을 평가하기 전에 변수를 평가하도록 지시합니다.

```
int userAge = 41; 
Console.WriteLine("Age of user: " + ++userAge); 
```

이렇게 하면 줄이 인쇄되기 전에 userAge가 증가하는 원하는 효과를 얻을 수 있습니다. 이제 세 개의 + 기호로 약간 혼란스러워 보일 수 있지만 첫 번째는 문자열 연결용이고 마지막 두 개는 실제 연산자입니다. 원하는 경우 increment 문을 괄호로 묶어 함께 속하는 항목을 명확하게 할 수 있습니다.

```
Console.WriteLine("Age of user: " + (++userAge)); 
```

그것은 모두 당신에게 달려 있습니다 – 그것은 정확히 동일하게 작동합니다!

물론 위에서 설명한 것과 똑같은 방식으로 감소 연산자를 사용할 수 있습니다. 접미사 버전은 다음과 같습니다.

```
int userAge = 41; 
Console.WriteLine("Age of user: " + (userAge--)); 
```

그리고 접두사 버전:

```
int userAge = 41; 
Console.WriteLine("Age of user: " + (--userAge)); 
```

### 요약
그래서 이들은 증가 및 감소 연산자였습니다. 매우 구체적인 사용 사례에 적합합니다: 값을 1씩 증가시키거나 감소시키려는 경우. 다음 장에서는 이 연산자와 매우 유사하지만 약간 더 광범위하게 사용되는 덧셈 할당 연산자를 살펴보겠습니다.


다른 여러 C# 연산자와 마찬가지로 이 연산자는 "구문 설탕"이라는 용어에 속하며, 이 특정 연산자 없이도 동일한 작업을 수행할 수 있지만 이를 사용하면 코드가 더 짧아집니다. 더 가독성이 높아지는지 여부는 매우 주관적입니다 – 어떤 사람들은 그것들을 좋아하는 반면, 다른 사람들은 그것 없이 코드가 더 쉽게 읽고 이해할 수 있다고 생각합니다. 정말 모든 것이 당신에게 달려 있습니다!





## Addition assignment operators
이전에 단순히 값에 1을 더하거나 빼는 증가/감소 연산자를 살펴보았지만 대부분의 경우 더하거나 빼려는 양에 더 많은 유연성을 원할 수 있습니다. 이를 위해 덧셈 할당 연산자를 사용할 수 있습니다. 그것이없으면 값에 더하는 것은 다음과 같습니다.

```
int userAge = 38; 
userAge = userAge + 4; 
```

그리 길거나 복잡하지는 않지만 코드를 더 짧게 만들 수 있는 방법을 항상 찾고 있기 때문에 대신 덧셈 할당 연산자를 사용할 수 있습니다.

```
int userAge = 38; 
userAge += 4; 
```

차이점을 확인하십시오: 값의 이름을 다시 명시하는 대신, 값에 무언가를 추가하고 동일한 변수에 다시 할당하려고 한다는 것을 나타내기 위해 연산자 +=(더하기-같음)로 모든 것을 말합니다. 물론 값을 빼고 싶을 때도 똑같이 할 수 있습니다.

```
int userAge = 42;   
userAge -= 4; 
```

이것은 아마도 명백해 보일 수 있지만 덜 분명할 수 있는 것은 곱셈과 나눗셈으로 할 수 있고 그만큼 쉽다는 것입니다.

```
int userAge = 42;   

userAge *= 2;   
Console.WriteLine("User age: " + userAge);   

userAge /= 2;   
Console.WriteLine("User age: " + userAge);   

Console.ReadKey(); 
```

### 문자열에 추가
지금까지 우리는 숫자로만 작업했지만 덧셈 할당 연산자는 문자열에도 똑같은 방식으로 사용할 수 있습니다. 비슷한 예제 세트로 설명하겠습니다 – 먼저 덧셈 할당 연산자 없이:

```
string userName = "John";   
userName = userName + " Doe"; 
```

물론 짧고 간결하지만 덧셈 배열 연산자를 사용하면 더 짧게 만들 수 있습니다.

```
string userName = "John"; 
userName += " Doe";  
```

멋지고 쉬운!

### 요약
다른 여러 C# 연산자와 마찬가지로 이 연산자는 "구문 설탕"이라는 용어에 속하며, 이 특정 연산자 없이도 동일한 작업을 수행할 수 있지만 이를 사용하면 코드가 더 짧아집니다. 더 가독성이 높아지는지 여부는 매우 주관적입니다 – 어떤 사람들은 그것들을 좋아하는 반면, 다른 사람들은 그것 없이 코드가 더 쉽게 읽고 이해할 수 있다고 생각합니다. 정말 모든 것이 당신에게 달려 있습니다!





## The NULL coalescing operator
그만큼 ?? 연산자는 NULL 값을 확인하고 한 줄의 코드에서 대체 값을 할당할 수 있기 때문에 "null 병합 연산자"라고도 합니다. 이 연산자 없이 수행하는 것은 사소해 보일 수 있지만 다음 예제를 고려하십시오.

```
string userSuppliedName = null; 

if (userSuppliedName == null) 
    Console.WriteLine("Hello, Anonymous!"); 
else 
    Console.WriteLine("Hello," + userSuppliedName); 
```

userSuppliedName 변수는 대화 상자 또는 데이터 파일과 같이 사용자로부터 오는 것으로 생각해야합니다. 이 경우 사용자에게 이름을 표시하기 위해 사용하기 전에 값을 확인해서 이를 처리해야 합니다.

위의 예에서는 고전적인 if-else 접근 방식을 사용하지만 null-병합 연산자를 사용하면 한 줄로 훨씬 더 짧게 수행할 수 있습니다.

```
Console.WriteLine("Hello, " + (userSuppliedName ?? "Anonymous")); 
```

단일 문에서 인터프리터에게 값이 있는 경우 userSuppliedName 변수를 사용하도록 요청하고, 그렇지 않은 경우 대체 값(이 경우 "Anonymous"이라는 이름)을 제공합니다. 짧고 간단합니다!

### 요약
null 병합 연산자와 같은 모든 "구문 설탕"과 마찬가지로 항상 코드를 짧고 읽기 쉽게 유지하는 것 사이의 절충안입니다. 어떤 사람들은 이러한 연산자가 코드를 읽고 탐색하는 것을 더 어렵게 만든다고 생각하는 반면, 다른 사람들은 코드가 얼마나 짧고 간단한지 좋아합니다. 결국 모든 것은 당신에게 달려 있습니다!





## The String Interpolation Operator
이 자습서의 다른 곳에서는 텍스트를 처리하는 것이 매우 중요한 작업이기 때문에 문자열 데이터 형식에 대한 긴 설명을 찾을 수 있습니다. 이 섹션에서는 문자열 작업을 위한 특수 연산자에 중점을 두어 문자열을 선언할 때 몇 가지 추가 트릭을 수행할 수 있습니다. 문자열 보간(C# 6.0에 도입됨)이라고 하며 문자열에 특수 마커를 배치할 수 있으며 인터프리터는 나중에 관련 값으로 대체합니다. 이미 논의한 String.Format() 메서드와 매우 유사하게 작동하지만 구문이 더 읽기 쉽고 편리합니다.

문자열 보간은 매우 쉽게 달성할 수 있습니다 - 문자열 앞에 $ 문자를 붙이기만 하면 됩니다. 항상 그렇듯이 바로 예로 넘어가겠습니다.

```
string name = "John Doe";
int age = 42;

Console.WriteLine(name + " is " + age + " years old");
Console.WriteLine($"{name} is {age} years old");
```

마지막 두 줄에서는 똑같은 작업을 수행합니다: 먼저 두 변수를 사용해서 문자열을 연결한 다음 문자열 보간을 사용하는 전통적인 방식입니다. 문자열을 중괄호로 묶어 문자열에 직접 변수를 삽입할 수 있는 방법을 주목하십시오. 그리고 이것이 문자열 내에서 발생하더라도 컴파일러는 실제로 주입하려는 변수를 확인합니다!

또한 사용하는 변수는 단순한 유형일 필요는 없습니다 - 일반 문자열 연결을 수행하는 경우와 마찬가지로 복잡한 객체의 속성도 사용할 수 있습니다. 예를 들면 다음과 같습니다.

```
var user = new
{
    Name = "John Doe",
    Age = 42
};
Console.WriteLine($"{user.Name} is {user.Age} years old");
```

### 문자열 형식 지정
기본적으로 포함하는 변수는 ToString() 메서드를 호출해서 필요한 문자열 표현으로 변환됩니다. 그러나 때로는 각 변수가 표시되는 방식을 좀 더 제어하려고 할 수 있으며 다행히도 형식 문자열 덕분에 이 작업을 매우 간단하게 수행할 수 있습니다. 변수 뒤에 콜론(:)을 넣은 다음 다음 예제와 같이 사용할 형식 문자열을 입력하기만 하면 됩니다.

```
double daysSinceMillenium = (DateTime.Now - new DateTime(2000, 1, 1)).TotalDays;  
Console.WriteLine($"Today is {DateTime.Now:d} and {daysSinceMillenium:N2} days have passed since the last millennium!");
```

결과는 날짜와 숫자에 대한 시스템 설정에 따라 다음과 같습니다.

```
Today is Friday, June 29, 2018 and 6,754.49 days have passed since the last millenium!
```

날짜가 긴 날짜 형식("D" 형식 문자열로 지정된 대로)으로 표시되는 방식과 "N2" 숫자 형식 문자열 덕분에 숫자가 천 개의 구분 기호와 두 개의 십진수로 멋지게 형식화되는 방식을 확인합니다.

더 많은 제어를 원하면 기본 형식 문자열에서 사용자 지정 형식 문자열(예: 날짜)으로 변경할 수 있습니다.

```
Console.WriteLine($"Today is {DateTime.Now:yyyy-MM-dd}");
```

보간된 문자열에서 사용할 수 있는 DateTime의 서식을 지정하는 더 많은 방법이 있습니다. 모든 옵션에 대해서는 설명서를 참조하십시오.

### 변수 너머
이제 문자열에 변수와 객체의 속성까지 포함시켰고 결과 문자열의 형식을 얼마나 쉽게 지정할 수 있는지 확인했습니다. 그러나 문자열 보간은 문자열에 추가할 수 있는 결과를 생성하는 한 실제로 문자열 안에 전체 C# 표현식을 가질 수 있기 때문에 그 이상입니다. 그 좋은 예는 "1 year old" 또는 "2 years old"의 문자열을 만들어야하는 고전적인 "어미 s 유무에 관계없이" 상황입니다. 문자열 내부에서 삼항 연산자를 사용해서 문자열 보간을 사용해서 직접 수행할 수 있습니다.

```
string name = "John Doe";
int age = 42;

Console.WriteLine($"{name} is {age} year{(age == 1 ? "" : "s")} old");
```

괄호 집합 안에 간단한 if-then-else 문을 문자열에 삽입한 방법을 확인하십시오. 표현식의 결과가 문자열(빈 문자열 또는 "s")이기 때문에 그렇게 할 수 있습니다. 수학도 할 수 있습니다.

```
Console.WriteLine($"5 + 5 * 2 = {((5 + 5) * 2)}");
```

다시 말하지만, 표현식의 결과를 문자열로 변환할 수 있는 한 보간된 문자열 내에서 사용할 수 있습니다.

### 문자열 보간 및 이스케이프
매우 명백한 질문이 떠오르기 전에 문자열 보간으로 오래 작업하지 않았을 것입니다: 중괄호와 같은 특정 의미를 가진 문자를 어떻게 포함하고 문자 그대로 처리 할 수 있습니까? 이에 대한 대답은 일반적으로 특별한 목적을 무효화하기 위해 캐릭터에 다른 문자로 접두사/접미사를 붙이는 행위인 탈출입니다. 이것은 문자열 보간에도 해당되며, 중괄호를 문자 그대로 처리하려면 다음과 같이 두 번 작성해야합니다.

```
Console.WriteLine($"Insert {name} between curly braces: {{name here}}");
```

결과:

```
Insert John Doe between curly braces: {name here}
```

### 요약
고전적인 문자열 연결을 보고 너무 서투른 것으로 생각한 적이 있다면 문자열 보간을 좋아할 것입니다! C# 버전 6.0에서 도입되었으며 변수가 포함된 텍스트를 매우 자연스럽고 읽기 쉬운 방식으로 작성할 수 있습니다. 또한 표현식을 문자열에 직접 통합할 수 있다는 점에서 정말 멋지지만, 특정 시점에서 보간된 문자열이 너무 발전해서 대안보다 읽기가 더 어려워질 수 있습니다.



---




# LINQ

## Introduction
Language-Integrated Query의 약자인 LINQ는 .NET 프레임워크에 내장된 기술로, 다양한 소스에서 데이터를 쉽게 쿼리하고 조작할 수 있습니다. 즉, 소스가 단순 목록, 사전, XML 파일 또는 데이터베이스 테이블인지 여부에 관계없이 동일한 방식으로 데이터로 작업할 수 있습니다. LINQ는 Query 구문과 Method 구문의 두 가지 구문 버전으로 제공됩니다. 다음 섹션에서는 두 가지 방법에 대해 자세히 설명하겠지만 LINQ에 대해 자세히 알아볼 수 있도록 LINQ가 간단한 데이터 원본을 쿼리하는 방법을 간단히 보여 드리겠습니다.

```
var names = new List<string>()  
{  
    "John Doe",  
    "Jane Doe",  
    "Jenna Doe",  
    "Joe Doe"  
};  

// Get the names which are 8 characters or less, using LINQ  
var shortNames = from name in names where name.Length <= 8 orderby name.Length select name;

foreach (var name in shortNames)  
    Console.WriteLine(name);
```

LINQ 쿼리 구문을 사용해서 한 줄로 8자 이하의 목록의 모든 이름을 요청하고 길이별로 정렬 할 수 있습니다! 이는 한 줄의 코드일 뿐이며 LINQ가 할 수 있는 것의 극히 일부만 보여줍니다! 다음 섹션에서는 LINQ를 사용할 때 얻을 수 있는 모든 놀라운 가능성을 살펴보겠지만 먼저 LINQ 쿼리가 실행되는 방법과 시기에 대해 조금 이야기해야 합니다.

### 지연된 실행
대부분의 프로그래머는 코드가 한 줄씩 실행되는 것을 보는 데 익숙하므로 쿼리 부분이 있는 줄에 도달하자마자 LINQ 쿼리가 실행되지 않는다는 사실에 놀랄 수도 있습니다. 대신 LINQ는 데이터 사용을 시작하자마자 실행됩니다 (예 : 데이터를 반복하거나 ToList () 또는 Count ()와 같은 메서드를 호출 할 때). 이는 또한 여러 줄에 걸쳐 쿼리를 작성해서 여러 작업을 수행할 수 있지만 필요할 때까지 데이터가 실제로 가져오지 않는다는 것을 의미합니다. 이전 쿼리 구문 대신 메서드 구문으로 전환하는 이전 예제의 확장 버전을 사용해서 설명하겠습니다.

```
var names = new List<string>()
{
    "John Doe",
    "Jane Doe",
    "Jenna Doe",
    "Joe Doe"
};

// Get the names which are 8 characters or less, using LINQ
var shortNames = names.Where(name => name.Length <= 8);
// Order it by length
shortNames = shortNames.OrderBy(name => name.Length);
// Add a name to the original list
names.Add("Zoe Doe");

// Iterate over it - the query has not actually been executed yet!
// It will be as soon as we hit the foreach loop though!
foreach (var name in shortNames)
    Console.WriteLine(name);
```

코드에 몇 가지 주석을 추가했으므로 따라하기 쉬울 것입니다. 또한 거기에 약간의 증거를 추가했습니다. 쿼리를 수행한 후 원래 목록에 이름을 추가합니다. 이제 쿼리가 이미 실행되었다면 물론 결과에 포함되지 않지만 쿼리 이후에 추가되지만 실제로 데이터를 사용하기 전에 추가되기 때문에 foreach 루프에서 발생합니다.

이것은 4개 또는 5개의 이름이 있는 목록을 쿼리할 때 그다지 중요하지 않지만 대신 1,000만 개의 항목 목록이나 어딘가에 원격 데이터베이스가 있다고 상상해 보십시오. 이 경우 하나의 쿼리만 실행할 수 있을 때 여러 쿼리를 실행하지 않는 것이 매우 중요합니다.

### 요약
LINQ를 사용하면 다음 문서에서 설명할 쿼리 구문 또는 메서드 구문과 같은 동일한 구문을 사용해서 다양한 데이터 원본을 간단하고 기본적으로 쿼리할 수 있습니다.





## LINQ: Query Syntax vs. Method syntax
이전 섹션에서는 두 LINQ 구문이 어떻게 표시되는지 간략하게 살펴보았지만 이 문서에서 논의할 내용을 확신할 수 있도록 다시 바로 옆에 테이블에 배치해 보겠습니다.

```
 var listOfNames = new List<string>()
{
    "John Doe",
    "Jane Doe",
    "Jenna Doe",
    "Joe Doe"
};

// Query syntax
var qNames = from name in listOfNames where name.Length <= 8 select name;
// Method syntax
var mNames = listOfNames.Where(name => name.Length <= 8);
```

두 줄은 정확히 동일한 작업을 수행하지만 구문적 차이는 매우 명확합니다. 쿼리 구문은 다른 쿼리 언어와 비슷하고 일반 C# 문과는 e.g. SQL 비슷합니다. 반면 메서드 구문은 이 자습서에서 본 나머지 C# 코드와 매우 유사합니다.

따라서 가장 큰 차이점은 확실히 구문이므로 C# 섹션를 읽고 질문에 대한 답변을 찾을 때 사용되는 두 가지 변형을 모두 볼 수 있습니다. 쿼리 구문이 약간 더 인기 있는 것 같아서 일부 사람들은 메서드 구문보다 읽기 쉽다고 생각하기 때문에 어쨌든 SQL에서 데이터 검색 작업을 표현하는 데 익숙한 사람들일 수 있습니다. 반면에 이전에 SQL과 같은 쿼리 언어를 사용해 본 적이 없지만 C# 경험이 있는 경우 메서드 구문을 더 쉽게 읽을 수 있습니다. 또한 쿼리 결과의 항목 계산과 같은 적어도 몇 가지 작업의 경우 메서드 구문을 사용해야 합니다.

### 람다 표현식
메서드 구문 예제에서 이전에 못한 것을 Where() 메서드의 매개 변수로 볼 수 있습니다. 다음과 같습니다.

```
name => name.Length <= 8
```

이것을 람다 표현식이라고 하며 LINQ 기능의 특정 부분은 아니지만 LINQ 세계에서 많이 사용됩니다. 따라서 다음 섹션에서도 많이 볼 수 있으며 다른 섹션에서 람다 표현식에 대해 자세히 설명하겠지만 작동 방식에 대한 매우 기본적인 이해를 얻을 수 있는 좋은 시간입니다.

실제로는 아주 간단합니다. 람다 표현식에는 왼쪽과 오른쪽이 있으며 => 연산자로 나뉩니다("크거나 같은" 연산자와 혼동하지 마십시오. >=).

왼쪽에는 입력 매개변수가 있습니다 - 여러 개가 있을 수 있지만 이 예에서는 이름 변수인 하나만 있습니다. 이 경우 이름 목록을 반복해서 Where() 메서드에서 가져와 이름을 선택하게 됩니다. 이름 목록에서 찾을 수 있는 이름이기 때문에 "이름"을 선택했지만 "x", "z", "foobar" 또는 다른 이름으로 부를 수도 있습니다.

오른쪽에는 표현/명령문 부분이 있습니다. 여기에서 예상 결과를 생성합니다 - 이 경우 Where() 메서드에 문제의 이름을 포함할지 여부를 알려주는 부울 값입니다. 길이가 8자(이하)인 경우 이름을 포함하고 싶다는 표현식으로 대답합니다. 입력(왼쪽)을 사용해서 이를 결정할 수 있습니다(반드시 필요한 것은 아닙니다). 다시 말하지만, 우리는 그것을 "이름"이라고 부르지만 대신 "x"라고 부를 수 있었습니다 - 이 경우 명령문은 다음과 같았을 것입니다.

```
var mNames = listOfNames.Where(x => x.Length <= 8);
```

람다 표현식은 LINQ 쿼리 그 이상에 관한 것이지만 앞서 언급했듯이 LINQ를 사용할 때 중요합니다. 일반적으로 람다 표현식에 대해 자세히 알고 싶다면 이 튜토리얼의 다른 곳에서 해당 주제를 다루십시오.

### 요약
LINQ는 Query 구문과 Method 구문의 두 가지 구문 버전으로 제공됩니다. 거의 동일한 작업을 수행할 수 있지만 쿼리 구문은 C# 내에서 거의 새로운 언어이지만 메서드 구문은 일반 C# 메서드 호출과 같습니다. 이 자습서에서는 다음 문서에서 LINQ에서 사용할 수 있는 모든 작업에 대해 설명할 때 주로 메서드 구문을 사용합니다.





## Filtering data: the Where() method
데이터 집합에 대해 수행할 수 있는 가장 기본적인(그러나 가장 강력한) 작업 중 하나는 데이터 중 일부를 필터링하는 것입니다. LINQ 소개 문서에서 Where() 메서드로 수행할 수 있는 작업에 대해 이미 살펴보았지만 이 문서에서는 좀 더 자세히 살펴보겠습니다. 람다 표현식을 사용해서 작업을 수행할 수 있는 LINQ 메서드의 수에 대해 이미 논의했으며 Where() 메서드는 그 중 하나입니다 - 각 항목을 입력으로 제공한 다음 항목이 포함될지(true 반환) 또는 제외(false 반환)을 결정하는 논리를 제공합니다. 다음은 기본적인 예입니다.

```
List<int> numbers = new List<int>()
{
    1, 2, 4, 8, 16, 32
};
var smallNumbers = numbers.Where(n => n < 10);
foreach (var n in smallNumbers)
    Console.WriteLine(n);
```

이 예에서 각 숫자는 표현식에 대해 확인되며, 숫자가 10보다 작으면 true를 반환하고 10 이상이면 false를 반환합니다. 결과적으로 10 미만의 숫자만 포함된 원본 목록 버전을 얻은 다음 콘솔로 출력됩니다.

그러나 표현식은 그렇게 간단할 필요가 없습니다 - 일반 if 문인 것처럼 더 많은 요구 사항을 쉽게 추가 할 수 있습니다.

```
List<int> numbers = new List<int>()
{
    1, 2, 4, 8, 16, 32
};
var smallNumbers = numbers.Where(n => n > 1 && n != 4 &&  n < 10);
foreach (var n in smallNumbers)
    Console.WriteLine(n);
```

숫자가 1보다 커야 하지만 특정 숫자 4는 아니어야 하며 10보다 작아야 한다고 지정합니다.

물론 표현식에서 다양한 메서드 call 을 사용할 수도 있습니다 - 최종 결과가 부울 값인 한 Where() 메서드가 문제의 항목을 포함할지 여부를 알 수 있도록 하면 됩니다. 예를 들면 다음과 같습니다.

```
List<int> numbers = new List<int>()
{
    1, 2, 4, 7, 8, 16, 29, 32, 64, 128
};
List<int> excludedNumbers = new List<int>()
{
    7, 29
};
var validNumbers = numbers.Where(n => !excludedNumbers.Contains(n));
foreach (var n in validNumbers)
    Console.WriteLine(n);
```

이 예에서는 두 번째 숫자 목록을 선언합니다 - 포함하고 싶지 않은 숫자의 블랙리스트와 같습니다! Where() 메서드에서는 블랙리스트의 Contains() 메서드를 사용해서 숫자가 최종 숫자 목록에 포함될 수 있는지 여부를 결정합니다.

물론 숫자와 문자열보다 더 복잡한 개체에 대해 작동하며 여전히 사용하기 매우 쉽습니다. 숫자 대신 사용자 정보가 있는 객체를 사용하고 Where() 메서드를 사용해서 39세 이하의 문자 "J"로 시작하는 이름을 가진 사용자 목록을 가져오는 이 예제를 살펴보십시오.

```
using System;
using System.Collections.Generic;
using System.Linq;

namespace LinqWhere2
{
    class Program
    {
    static void Main(string[] args)
    {
        List<User> listOfUsers = new List<User>()
        {
        new User() { Name = "John Doe", Age = 42 },
        new User() { Name = "Jane Doe", Age = 34 },
        new User() { Name = "Joe Doe", Age = 8 },
        new User() { Name = "Another Doe", Age = 15 },
        };

        var filteredUsers = listOfUsers.Where(user => user.Name.StartsWith("J") && user.Age < 40);
        foreach (User user in filteredUsers)
        Console.WriteLine(user.Name + ": " + user.Age);
    }


    class User
    {
        public string Name { get; set; }
        public int Age { get; set; }

    }
    }
}
```

비교를 위해 메서드 기반 대신 쿼리 기반 구문을 사용한 경우 where 연산은 다음과 같습니다.

```
// Method syntax
var filteredUsers = listOfUsers.Where(user => user.Name.StartsWith("J") && user.Age < 40);

// Query syntax
var filteredUsersQ = from user in listOfUsers where user.Name.StartsWith("J") && user.Age < 40 select user;
```

### 여러 Where() 메서드 연결
LINQ 소개에서 이에 대해 간략하게 논의했습니다. LINQ 표현식의 실제 결과는 실제로 데이터가 필요할 때까지(예: 데이터를 반복하거나 계산하거나 반복할 때까지) 실현되지 않습니다(예제에서와 같이). 이는 또한 여러 Where() 메서드를 함께 연결한다는 것을 의미하며, 읽기 쉽다고 생각되면 매우 복잡한 표현식에서 확실히 그럴 수 있습니다! 다음은 이전 예제의 수정된 버전입니다.

```
List<int> numbers = new List<int>()
{
    1, 2, 4, 8, 16, 32
};
var smallNumbers = numbers.Where(n => n > 1).Where(n => n != 4).Where(n => n < 10);
foreach (var n in smallNumbers)
    Console.WriteLine(n);
```

결과는 정확히 동일하며 첫 번째 버전은 여러 Where() 메서드 호출로 분할하는 것을 정당화할 만큼 복잡하지 않았을 수 있지만 그렇게 하는 것이 합리적인 상황에 직면할 수 있습니다. 실제 "어디"작업은 결과를 반복하는 부분까지 수행되지 않기 때문에 성능 측면에서 추가 비용이 들지 않는다는 점을 강조하고 싶습니다.

### 요약
Where() 메서드를 사용하면 데이터 원본에서 원하지 않는 항목을 쉽게 필터링해서 원본 데이터의 하위 집합을 만들 수 있습니다. 그것은 실제로 당신이 얻는 새로운 데이터 세트라는 것을 기억하십시오 - 원래 변수를 특별히 재정의하지 않는 한 원래 데이터 소스는 그대로 유지됩니다.





## Sorting data: the OrderBy() & ThenBy() methods
이제 이전 문서를 통해 LINQ를 사용해서 데이터 원본에서 데이터를 가져오고 Where() 메서드로 필터링하는 방법을 배웠으므로 다음 단계는 데이터를 정렬하는 것일 수 있습니다. 우리는 숫자 또는 예를 들어 User 클래스를 기반으로 하는 객체 목록을 사용했으므로 항목을 가져온 순서는 목록에 추가된 순서와 동일했습니다. 그러나 앞에서 설명했듯이 LINQ 작업에 대한 데이터 원본은 XML 문서 또는 데이터베이스일 수도 있습니다. 따라서 필요한 데이터가 확보되면 데이터를 적절하게 정렬하는 능력이 중요합니다. 다행스럽게도 LINQ에는 데이터를 정렬하는 데 사용하기 쉬운 몇 가지 방법이 있습니다.

```
List<int> numbers = new List<int>()
{
    1, 7, 2, 61, 14
};
List<int> sortedNumbers = numbers.OrderBy(number => number).ToList();
foreach (int number in sortedNumbers)
    Console.WriteLine(number);
```

쉬웠죠? OrderBy() 메서드를 호출하고 정렬 기준이 되는 객체 또는 객체의 멤버를 제공하면 정렬된 목록이 반환됩니다. 물론 다음 예제에서 볼 수 있듯이 문자열을 사용해서 쉽게 수행할 수 있지만 항목을 내림차순(가장 큰 것에서 가장 작은 것으로/Z에서 A로) 순서로 가져와 보겠습니다.

```
List<string> cityNames = new List<string>()
{
    "Amsterdam", "Berlin", "London", "New York"
};
List<string> sortedCityNames = cityNames.OrderByDescending(city => city).ToList();
foreach (string cityName in sortedCityNames)
    Console.WriteLine(cityName);
```

OrderBy() 메서드 대신 OrderByDescending() 메서드를 사용한다는 점을 제외하고는 이전과 똑같은 작업을 수행합니다. 그러나 물론 정수와 문자열 목록을 쉽게 정렬할 수 있습니다. 그러나 LINQ 덕분에 더 복잡한 개체를 정렬하는 것도 거의 쉽습니다. 예를 들면 다음과 같습니다.

```
using System;
using System.Collections.Generic;
using System.Linq;

namespace LinqOrder2
{
    class Program
    {
    static void Main(string[] args)
    {
        List<User> listOfUsers = new List<User>()
        {
        new User() { Name = "John Doe", Mail = "john@doe.com", Age = 42 },
        new User() { Name = "Jane Doe", Mail = "jane@doe.com", Age = 34 },
        new User() { Name = "Joe Doe", Mail = "joe@doe.com", Age = 8 },
        new User() { Name = "Another Doe", Mail = "another@doe.com", Age = 15 },
        };

        List<User> usersByAge = listOfUsers.OrderBy(user => user.Age).ToList();
        foreach (User user in usersByAge)
        Console.WriteLine(user.Name + ": " + user.Age + " years");
    }

    class User
    {
        public string Name { get; set; }
        public string Mail { get; set; }
        public int Age { get; set; }
    }
    }
}
```

물론 이것은 User 클래스가 포함되어 있고 사용자 목록이 초기화된 보다 완전한 예이지만 보시다시피 실제 정렬은 여전히 매우 짧고 정확합니다. OrderBy() 메서드를 호출할 때 여전히 매개변수 이름을 제공한 다음 이 매개변수를 사용해서 User 객체의 Age 속성에 액세스합니다. 그 결과 완벽하게 연령별로 정렬된 목록이 탄생했습니다! 하지만 둘 이상의 속성으로 주문하려면 어떻게 해야 할까요?

### ThenBy() 및 ThenByDescending()
위의 예에서는 사용자 목록을 연령별로 정렬했는데, 같은 나이의 사용자가 여러 명 있다면 어떻게 될까요? 우리의 작은 예에서도 꽤 일반적인 시나리오는 Jane과 John이 동갑이고 그들의 자녀가 쌍둥이라고 상상해 보십시오. 이 경우 데이터 소스가 연령별로 정렬된 후에도 순서를 제어하는 것이 실용적입니다. 이를 위해 ThenBy() 및 ThenByDescending() 메서드를 사용할 수 있습니다. 그들은 이름에서 알 수 있듯이 초기 정렬 후 순서를 제어합니다. 이를 사용해서 사용자 목록을 먼저 연령별로 정렬한 다음 이름별로 알파벳순으로 정렬할 수 있습니다.

```
List<User> listOfUsers = new List<User>()
{
    new User() { Name = "John Doe", Mail = "john@doe.com", Age = 42 },
    new User() { Name = "Jane Doe", Mail = "jane@doe.com", Age = 42 },
    new User() { Name = "Joe Doe", Mail = "joe@doe.com", Age = 8 },
    new User() { Name = "Jenna Doe", Mail = "another@doe.com", Age = 8 },          
};

List<User> sortedUsers = listOfUsers.OrderBy(user => user.Age).ThenBy(user => user.Name).ToList();
foreach (User user in sortedUsers)
    Console.WriteLine(user.Name + ": " + user.Age + " years");
```

아주 간단하지만 매우 효과적입니다! 데이터가 테스트 케이스의 데이터보다 더 복잡한 경우 여러 ThenBy() 메서드 호출을 연결할 수도 있습니다. 물론 필요한 방식으로 OrderBy(), OrderByDescending(), ThenBy() 및 ThenByDescending() 메서드를 혼합하고 일치시킬 수 있습니다.

```
List<User> sortedUsers = listOfUsers.OrderBy(user => user.Age).ThenByDescending(user => user.Name).ToList();
foreach (User user in sortedUsers)  
    Console.WriteLine(user.Name + ": " + user.Age + " years");
```

이 자습서에서는 주로 LINQ의 메서드 기반 구문을 사용하지만 항상 그렇듯이 섹션의 예제 중 하나를 사용해서 쿼리 구문으로 어떻게 표시되는지 보여 드리겠습니다.

```
// Method syntax
List<User> sortedUsers = listOfUsers.OrderBy(user => user.Age).ThenByDescending(user => user.Name).ToList();

// Query syntax
List<User> sortedUsersQ = (from user in listOfUsers orderby user.Age ascending, user.Name descending select user).ToList();
```

보시다시피 구문은 약간 다릅니다 - 방향(오름차순 또는 내림차순)은 순서 필드 바로 뒤에 지정됩니다(오름차순은 실제로 암시적이지만 차이점을 보여주기 위해 포함했습니다). 또한 "ThenBy"가 없으며 대신 여러 정렬 명령을 쉼표로 구분하기만 하면 됩니다. 물론 결국 두 쿼리 모두 동일한 결과를 제공합니다.

### 요약
OrderBy() 및 ThenBy() 메서드(및 "내림차순" 메서드)를 사용하면 원하는 방식으로 데이터를 쉽게 정렬할 수 있습니다. 그리고 다른 LINQ 메서드와 마찬가지로 실제 데이터 원본은 조작되지 않고 대신 작업할 수 있는 원본 데이터 원본의 정렬된 복사본을 가져옵니다.





## Limiting data: the Take() & Skip() methods
지금까지 자습서의 이 LINQ 장에서는 LINQ를 사용해서 데이터 원본을 사용하는 몇 가지 방법을 알아보았습니다. 이제 작업할 데이터의 양을 제한할 수 있는 방법을 알아볼 때가 왔습니다. 이는 데이터베이스를 데이터 소스로 사용할 때 특히 유용한데, 이는 가져오는 데 리소스를 소비하는 엄청난 양의 행을 포함하기 때문입니다.

이 섹션에서 논의할 메서드는 Take() 및 Skip()이라고 하며, 조합하면 웹 사이트에서 페이지 매김과 같은 작업을 수행하는 데 적합합니다. 사실 함께 사용하는 경우가 많지만 물론 단독으로 사용할 수도 있습니다. Take() 메서드는 데이터 소스에서 X 개의 항목을 가져오는 반면 Skip() 을 사용하면 처음 X 항목을 무시할 수 있습니다. 간단한 예는 다음과 같습니다.

```
List<string> names = new List<string>()
{
    "John Doe",
    "Jane Doe",
    "Joe Doe",
    "Jenna Doe",
};
var middleNames = names.Skip(1).Take(2).ToList();
foreach (var name in middleNames)
    Console.WriteLine(name);
```

간단한 이름 목록을 만든 다음 출력의 경우 이름(Skip(1))을 건너뛰고 다음 두 이름(Take(2))을 가져와 기본적으로 목록의 중간 이름 두 개만 남깁니다.

### Skip() 및 Take()를 사용한 기본 페이지 매김
보시다시피 Take() 및 Skip() 메서드는 모두 사용하기가 매우 간단하지만 이전에 사용한 것보다 더 많은 데이터로 시연하는 것이 더 흥미롭기 때문에 이러한 방법이 어떻게 도움이 될 수 있는지 더 잘 보여줄 약간 더 복잡한 예제를 자유롭게 만들었습니다. 먼저 코드는 다음과 같습니다.

```
using System;
using System.Globalization;
using System.Linq;
using System.Xml.Linq;

namespace LinqTakeSkip1
{
    class Program
    {
    static void Main(string[] args)
    {
        CultureInfo usCulture = new CultureInfo("en-US");
        XDocument xDoc = XDocument.Load("http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml");
        var cubeNodes = xDoc.Descendants().Where(n => n.Name.LocalName == "Cube" && n.Attribute("currency") != null).ToList();
        var currencyRateItems = cubeNodes.Select(node => new
        {
        Currency = node.Attribute("currency").Value,
        Rate = double.Parse(node.Attribute("rate").Value, usCulture)
        });


        int pageSize = 5, pageCounter = 0;
        var pageItems = currencyRateItems.Take(pageSize);
        while(pageItems.Count() > 0)
        {
        foreach (var item in pageItems)
            Console.WriteLine(item.Currency + ": " + item.Rate.ToString("N2", usCulture));
        Console.WriteLine("Press any key to get the next items...");
        Console.ReadKey();
        pageCounter++;
        // Here's where we use the Skip() and Take() methods!
        pageItems = currencyRateItems.Skip(pageSize * pageCounter).Take(pageSize);
        }
        Console.WriteLine("Done!");
        
    }
    }
}
```

꽤 많은 코드이지만 실행해 보겠습니다. 전반부에서는 공개적으로 사용 가능한 환율 XML 소스를 구문 분석합니다. 이를 통해 LINQ 에코시스템의 매우 멋진 부분인 LINQ to XML을 간략하게 보여드릴 수 있습니다. LINQ to XML에 대해서는 다른 섹션에서 설명하겠지만, 지금은 LINQ to XML을 사용해서 XML 원본에서 중요한 노드를 가져와 나중에 사용할 통화의 이름과 현재 환율로 구성된 익명 개체에 넣는다는 점만 알아두세요.


이제 currencyRateItems 변수에 통화 정보의 멋진 데이터 소스가 있습니다. 예제의 마지막 절반에서는 이 소스를 사용해서 간단한 페이지 매김을 수행합니다 - 단순히 5개의 항목을 꺼낸 다음 사용자에게 키를 눌러 다음 5개(또는 소스에 남아 있는 수)를 가져오도록 요청합니다. 처음 5개의 항목을 추출한 다음 while 루프를 사용해서 소스가 비워질 때까지 다음 5개의 항목을 계속 꺼냅니다. 다음 5개의 항목을 가져오는 것은 이 문서의 전체 기초인 Skip()과 Take()의 조합으로 수행됩니다.

### 요약
Skip() 및 Take() 메서드는 사용하기가 매우 간단하지만 그럼에도 불구하고 많은 상황에서 매우 유용합니다. 앞서 언급했듯이 종종 함께 사용되지만 특히 Take() 메서드는 단독으로 사용할 수도 있습니다.





## Data transformations: the Select() method
지금까지 튜토리얼의 이 LINQ 장에서는 정수, 문자열 또는 User 클래스와 같은 간단한 객체 목록과 같은 간단한 데이터 소스로 작업했습니다. 다양한 LINQ 메서드의 예제를 보여 줄 때 매우 실용적이기 때문에 계속 그렇게 할 것이지만 LINQ를 사용하면 데이터 원본이 복잡한 XML 문서 또는 거대한 데이터베이스일 수도 있습니다.

이 섹션에서는 데이터 소스에서 데이터를 가져와 다른 것으로 만들 수 있는 Select() 메서드에 대해 설명합니다. 위에서 언급한 것과 같이 더 크고 복잡한 데이터 소스에서 더 분명하게 유용 할 수 있지만 Select() 메서드가 어떻게 작동하고 무엇을해야하는지 보여주려고 노력하는 동안 어쨌든 참아주세요. 평소와 같이 바로 예로 넘어가겠습니다.

```
using System;  
using System.Collections.Generic;  
using System.Linq;  

namespace LinqSelect1  
{  
    class Program  
    {  
    static void Main(string[] args)  
    {  
        List<User> listOfUsers = new List<User>()  
        {  
        new User() { Name = "John Doe", Age = 42 },  
        new User() { Name = "Jane Doe", Age = 34 },  
        new User() { Name = "Joe Doe", Age = 8 },  
        new User() { Name = "Another Doe", Age = 15 },  
        };  

        List<string> names = listOfUsers.Select(user => user.Name).ToList();  

        foreach (string name in names)  
        Console.WriteLine(name);  
    }  

    class User  
    {  
        public string Name { get; set; }  
        public int Age { get; set; }  
    }  
    }  
}
```

개체 목록(이 경우 User 형식)을 가져온 다음 Select() 메서드를 사용해서 이 목록을 새 형식의 목록으로 만드는 방법을 확인합니다. 이 예에서는 객체 목록을 사용자 이름이 포함된 문자열 목록으로 변환합니다. 이는 데이터를 다르게 보여야 하거나 데이터의 하위 집합만 필요한 경우 매우 실용적입니다. 물론 그 반대의 방법으로도 작동합니다 - 이름 목록에서 User 객체 목록을 쉽게 만들 수 있습니다 (나중에 수동으로 나이를 추가해야합니다).

```
List<User> listOfUsers = new List<User>()
{
    new User() { Name = "John Doe", Age = 42 },
    new User() { Name = "Jane Doe", Age = 34 },
    new User() { Name = "Joe Doe", Age = 8 },
    new User() { Name = "Another Doe", Age = 15 },
};

List<string> names = listOfUsers.Select(user => user.Name).ToList();

List<User> users = names.Select(name => new User { Name = name }).ToList();

foreach (User user in users)
    Console.WriteLine(user.Name);
```

Select() 메서드로 새 객체를 만드는 방법을 주목하십시오 - 그것은 매우 강력한 기능으로, 즉석에서 데이터로 거의 모든 것을 할 수 있습니다! 이 기능의 일반적인 용도는 웹 서비스를 통해 JSON 또는 XML로 반환하는 것과 같이 개체의 덜 복잡한 버전을 만드는 것입니다. 많은 속성 (생일, 성별, 메일, 주소, 국가 등)을 가진 User 클래스가 있지만 이러한 속성의 제한된 집합 만 반환하려고한다고 상상해보십시오. 다음은 단순화 된 예입니다 - 훨씬 더 복잡한 User 클래스를 상상해보십시오.

```
using System;
using System.Collections.Generic;
using System.Linq;

namespace LinqSelect2
{
    class Program
    {
    static void Main(string[] args)
    {
        List<User> listOfUsers = new List<User>()
        {
        new User() { Name = "John Doe", Mail = "john@doe.com", Age = 42 },
        new User() { Name = "Jane Doe", Mail = "jane@doe.com", Age = 34 },
        new User() { Name = "Joe Doe", Mail = "joe@doe.com", Age = 8 },
        new User() { Name = "Another Doe", Mail = "another@doe.com", Age = 15 },
        };

        var simpleUsers = listOfUsers.Select(user => new
        {
        Name = user.Name,
        Age = user.Age
        });
        foreach (var user in simpleUsers)
        Console.WriteLine(user.Name);
    }

    class User
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public string Mail { get; set; }
    }
    }
}
```

이 예에서는 Select() 메서드를 사용해서 데이터 원본에 있는 속성의 하위 집합만 포함하는 익명 형식 목록을 반환합니다. 그런 다음 이러한 개체의 고전적인 출력을 콘솔로 수행하지만 암호 등과 같은 비밀을 공개하지 않고 결과를 가능한 한 단순하게 유지하는 것이 중요한 웹 사이트나 다른 곳으로 반환하는 것을 상상해야합니다.


이미 논의한 것처럼 이 예제에서는 주로 LINQ의 메서드 구문을 사용하지만 물론 이 예제에서 수행하는 작업은 LINQ 쿼리 구문으로도 표현할 수 있습니다.

```
// Method syntax
var simpleUsers = listOfUsers.Select(user => new
{
    Name = user.Name,
    Age = user.Age
});

// Query syntax
var simpleUsersQ = (from user in listOfUsers
            select new
            {
            Name = user.Name,
            Age = user.Age
            }).ToList();

foreach (var user in simpleUsersQ)
    Console.WriteLine(user.Name);
```

이것이 당신이 선호하는 구문에 대한 더 명확한 아이디어를 제공하기를 바라지만 결과는 물론 동일합니다!

### 요약
Select() 메서드를 사용하면 예를 들어 단일 속성만 선택하거나 원본 개체에 있는 속성의 하위 집합만 포함하는 개체를 반환해서 데이터 원본의 데이터를 새 변형으로 변환하고 셰이핑할 수 있습니다.





## Grouping data: the GroupBy() Method
지금까지 우리는 주로 데이터 목록으로 작업했습니다. 우리는 그것을 정렬하고, 제한하고, 새로운 개체로 형성했지만 한 가지 중요한 작업이 여전히 누락되어 있습니다. 데이터를 그룹화할 때 항목을 가져온 다음 하나 이상의 속성에 따라 여러 그룹으로 나눕니다. 다음과 같은 데이터 소스가 있다고 상상해 보십시오.

```
var users = new List<User>()
{
    new User { Name = "John Doe", Age = 42, HomeCountry = "USA" },
    new User { Name = "Jane Doe", Age = 38, HomeCountry = "USA" },
    new User { Name = "Joe Doe", Age = 19, HomeCountry = "Germany" },
    new User { Name = "Jenna Doe", Age = 19, HomeCountry = "Germany" },
    new User { Name = "James Doe", Age = 8, HomeCountry = "USA" },
};
```

사용자 개체의 플랫 목록이지만 이러한 사용자를 모국이나 나이에 따라 그룹화하는 것이 흥미로울 수 있습니다. LINQ를 사용하면 처음에는 GroupBy() 메서드를 사용하는 것이 약간 혼란스러울 수 있지만 이 작업은 매우 쉽습니다. 작동 방식을 살펴보겠습니다.

```
using System;    
using System.Collections.Generic;    
using System.Linq;    

namespace LinqGroup    
{    
    class Program    
    {    
    static void Main(string[] args)    
    {    
        var users = new List<User>()    
        {    
        new User { Name = "John Doe", Age = 42, HomeCountry = "USA" },    
        new User { Name = "Jane Doe", Age = 38, HomeCountry = "USA" },    
        new User { Name = "Joe Doe", Age = 19, HomeCountry = "Germany" },    
        new User { Name = "Jenna Doe", Age = 19, HomeCountry = "Germany" },    
        new User { Name = "James Doe", Age = 8, HomeCountry = "USA" },    
        };    
        var usersGroupedByCountry = users.GroupBy(user => user.HomeCountry);    
        foreach(var group in usersGroupedByCountry)    
        {    
        Console.WriteLine("Users from " + group.Key + ":");    
        foreach(var user in group)    
            Console.WriteLine("* " + user.Name);
        }    
    }    

    public class User    
    {    
        public string Name { get; set; }    

        public int Age { get; set; }    

        public string HomeCountry { get; set; }    
    }    
    }    
}
```

결과 출력은 다음과 같습니다.

```
Users from USA:
* John Doe
* Jane Doe
* James Doe
Users from Germany:
* Joe Doe
* Jenna Doe
```

이 예제는 약간 길어 보일 수 있지만 곧 알게 될 것이지만 대부분은 데이터 원본을 준비하는 것입니다. 모든 데이터는 XML 문서나 데이터베이스에서 가져올 수도 있으므로 있는 그대로 사용할 수 있는 개체 데이터 소스를 사용해서 더 쉽게 시연할 수 있습니다.

흥미로운 부분은 usersGroupedByCountry 변수를 만들 때입니다. 데이터 소스에서 GroupBy() 메서드를 호출하고 데이터를 그룹화하려는 매개변수를 제공해서 이를 만듭니다. 이 경우 사용자를 본국별로 그룹화하고 싶으므로 GroupBy() 메서드에 제공하는 속성입니다. 결과는 그룹화한 속성(이 경우 HomeCountry)의 값과 그룹에 속하는 모든 개체를 보유하는 Key 속성을 가진 개체입니다. 다음 줄에서 이를 사용해서 방금 만든 그룹을 반복하고 각 그룹에 대해 Key(HomeCountry)를 인쇄한 다음 그룹의 모든 User 개체를 반복하고 인쇄합니다.

### 사용자 지정 그룹 키
보시다시피 기존 속성을 기준으로 그룹화하는 것은 쉽지만 지금쯤 알고 계시겠지만 LINQ 메서드는 매우 유연합니다. 원하는 것을 기반으로 자신만의 사용자 지정 그룹을 만드는 것도 간단합니다 - 사용자 이름의 처음 두 글자를 기반으로 그룹을 만드는 예는 다음과 같습니다.

```
using System;
using System.Collections.Generic;
using System.Linq;

namespace LinqGroup
{
    class Program
    {
    static void Main(string[] args)
    {
        var users = new List<User>()
        {
        new User { Name = "John Doe", Age = 42, HomeCountry = "USA" },
        new User { Name = "Jane Doe", Age = 38, HomeCountry = "USA" },
        new User { Name = "Joe Doe", Age = 19, HomeCountry = "Germany" },
        new User { Name = "Jenna Doe", Age = 19, HomeCountry = "Germany" },
        new User { Name = "James Doe", Age = 8, HomeCountry = "USA" },
        };
        var usersGroupedByFirstLetters = users.GroupBy(user => user.Name.Substring(0, 2));
        foreach(var group in usersGroupedByFirstLetters)
        {
        Console.WriteLine("Users starting with " + group.Key + ":");
        foreach(var user in group)
            Console.WriteLine("* " + user.Name);
        }
    }

    public class User
    {
        public string Name { get; set; }

        public int Age { get; set; }

        public string HomeCountry { get; set; }
    }
    }
}
```

이름에 대해 Substring() 메서드를 호출해서 처음 두 글자를 가져온 다음 LINQ는 이를 기반으로 사용자 그룹을 만듭니다. 결과는 다음과 같습니다.

```
Users starting with Jo:
* John Doe
* Joe Doe
Users starting with Ja:
* Jane Doe
* James Doe
Users starting with Je:
* Jenna Doe
```

보시다시피 GroupBy() 메서드 내에서 메서드를 자유롭게 호출 할 수 있습니다 - 사실, LINQ가 항목을 그룹화하는 데 사용할 수있는 것을 반환하는 한 원하는 거의 모든 작업을 수행 할 수 있습니다. 다음 예제에서와 같이 항목에 대한 새 정보를 반환하는 메서드를 만든 다음 이를 사용해서 그룹을 만들 수도 있습니다.

```
using System;
using System.Collections.Generic;
using System.Linq;

namespace LinqGroup
{
    class Program
    {
    static void Main(string[] args)
    {
        var users = new List<User>()
        {
        new User { Name = "John Doe", Age = 42, HomeCountry = "USA" },
        new User { Name = "Jane Doe", Age = 38, HomeCountry = "USA" },
        new User { Name = "Joe Doe", Age = 19, HomeCountry = "Germany" },
        new User { Name = "Jenna Doe", Age = 19, HomeCountry = "Germany" },
        new User { Name = "James Doe", Age = 8, HomeCountry = "USA" },
        };
        var usersGroupedByAgeGroup = users.GroupBy(user => user.GetAgeGroup());
        foreach(var group in usersGroupedByAgeGroup)
        {
        Console.WriteLine(group.Key + ":");
        foreach(var user in group)
            Console.WriteLine("* " + user.Name + " [" + user.Age + " years]");
        }
    }

    public class User
    {
        public string Name { get; set; }

        public int Age { get; set; }

        public string HomeCountry { get; set; }

        public string GetAgeGroup()
        {
        if (this.Age < 13)
            return "Children";
        if (this.Age < 20)
            return "Teenagers";
        return "Adults";
        }
    }
    }
}
```

User 클래스에서 GetAgeGroup() 메서드를 구현한 방법을 확인하십시오. 사용자의 연령 그룹을 정의하는 문자열을 반환하고 GroupBy() 메서드에서 호출해서 그룹 키로 사용하기 만합니다. 결과는 다음과 같습니다.

```
Adults:
* John Doe [42 years]
* Jane Doe [38 years]
Teenagers:
* Joe Doe [19 years]
* Jenna Doe [19 years]
Children:
* James Doe [8 years]
```

다른 곳에서 유용 할 수 있기 때문에 User 클래스에서 GetAgeGroup() 메서드를 구현하기로 선택했지만 때로는 다른 곳에서 재사용하지 않고 그룹을 만들기 위해 빠른 논리가 필요합니다. 이러한 상황에서는 다음과 같이 GroupBy() 메서드에 직접 로직을 람다 식으로 자유롭게 제공할 수 있습니다.

```
var usersGroupedByAgeGroup = users.GroupBy(user =>
        {
        if (user.Age < 13)
            return "Children";
        if (user.Age < 20)
            return "Teenagers";
        return "Adults";
        });
```

결과는 물론 동일합니다!

### 복합 키로 그룹화
지금까지 우리 그룹의 키는 속성이나 메서드 호출 결과와 같은 단일 값이었습니다. 그러나 여러 값을 포함하는 고유한 키를 자유롭게 만들 수 있습니다. 사용 예는 다음과 같이 모국과 연령을 기준으로 사용자를 그룹화하려는 경우일 수 있습니다.

```
using System;
using System.Collections.Generic;
using System.Linq;

namespace LinqGroup2
{
    class Program
    {
    static void Main(string[] args)
    {
        var users = new List<User>()
        {
        new User { Name = "John Doe", Age = 42, HomeCountry = "USA" },
        new User { Name = "Jane Doe", Age = 38, HomeCountry = "USA" },
        new User { Name = "Joe Doe", Age = 19, HomeCountry = "Germany" },
        new User { Name = "Jenna Doe", Age = 19, HomeCountry = "Germany" },
        new User { Name = "James Doe", Age = 8, HomeCountry = "USA" },
        };

        var usersGroupedByCountryAndAge = users.GroupBy(user => new { user.HomeCountry, user.Age });
        foreach(var group in usersGroupedByCountryAndAge)
        {
        Console.WriteLine("Users from " + group.Key.HomeCountry + " at the age of " + group.Key.Age + ":");
        foreach (var user in group)
            Console.WriteLine("* " + user.Name + " [" + user.Age + " years]");
        }
    }

    public class User
    {
        public string Name { get; set; }

        public int Age { get; set; }

        public string HomeCountry { get; set; }

    }
    }
}
```

GroupBy() 메서드에서 사용하는 구문에 주목하세요 - 단일 속성을 제공하는 대신 HomeCountry 및 Age 속성을 포함하는 새 익명 개체를 만듭니다. 이제 LINQ는 이러한 두 속성을 기반으로 그룹을 만들고 익명 개체를 그룹의 Key 속성에 연결합니다. 보시다시피 그룹을 반복할 때 두 속성을 모두 자유롭게 사용할 수 있습니다. 결과는 다음과 같습니다.

```
Users from USA at the age of 42:
* John Doe [42 years]
Users from USA at the age of 38:
* Jane Doe [38 years]
Users from Germany at the age of 19:
* Joe Doe [19 years]
* Jenna Doe [19 years]
Users from USA at the age of 8:
* James Doe [8 years]
```

항상 그렇듯이 이 섹션에서는 LINQ 메서드 구문을 사용했지만 LINQ 쿼리 구문을 사용해서 수행하는 방법에 대한 비교 예제를 제공하겠습니다.

```
// Method syntax
var usersGroupedByCountryAndAge = users.GroupBy(user => new { user.HomeCountry, user.Age });
// Query syntax
var usersGroupedByCountryAndAgeQ = from user in users group user by new { user.HomeCountry, user.Age } into userGroup select userGroup;
```

### 요약
이 섹션의 예제에서 알 수 있듯이 LINQ의 GroupBy() 메서드는 매우 강력합니다. 이를 통해 아주 적은 코드로 새로운 방식으로 데이터를 사용할 수 있습니다. 이전에는 매우 번거롭거나 관계형 데이터베이스가 필요했지만 LINQ를 사용하면 원하는 데이터 원본을 사용하면서도 동일하고 사용하기 쉬운 기능을 계속 사용할 수 있습니다.



---




# Working with Culture & Regions

## Introduction
단 몇 대의 로컬 컴퓨터에서 실행할 소프트웨어를 만들던 시대는 거의 사라졌습니다. 세계화와 특히 인터넷 덕분에 오늘날 소프트웨어는 일반적으로 전 세계적으로 매우 광범위한 장치에서 사용됩니다. 즉, 코드는 예상과 다른 형식의 숫자와 날짜를 처리하는 것과 같은 많은 문화권별 사례를 처리해야 합니다. 예를 들어, 많은 국가에서 분수가 있는 숫자(예: 1.42)가 마침표가 아니라 쉼표를 소수점 구분 기호(예: 1,42)로 사용한다는 사실을 알고 계셨습니까? 그리고 많은 국가에서 날짜의 월 앞에 날짜가 쓰여지고 다른 나라에서는 연도를 먼저 쓴다는 사실을 알고 계십니까?

이 모든 것을 처리하는 것은 큰 번거로움이 될 수 있지만 다행스럽게도 .NET 프레임워크에는 이러한 상황을 처리하는 데 도움이 되는 여러 클래스가 있습니다. 가장 일반적으로 사용되는 클래스는 다음 섹션에서 설명할 CultureInfo 클래스이지만 NET은 지역 및 특정 달력 작업을 위한 클래스도 제공합니다(달력도 전 세계적으로 동일하지 않다는 것을 알고 계실 것입니다).

이 주제는 여러 언어를 지원해야하는 응용 프로그램에서 작업하는 경우 특히 중요하지만, 그렇지 않더라도 예를 들어 날짜 및 숫자에 대해 동일한 표기법을 사용하지 않는 장치에서 사용될 수 있다는 사실을 처리해야 합니다. 이것이 얼마나 중요한지 설명하기 위해 다음 예를 고려하십시오.

```
string inputNumber = "1.425";
double usNumber = double.Parse(inputNumber, CultureInfo.GetCultureInfo("en-US"));
double germanNumber = double.Parse(inputNumber, CultureInfo.GetCultureInfo("de-DE"));
Console.WriteLine(usNumber.ToString() + " is not the same as " + germanNumber);
```

inputNumber 변수는 애플리케이션 사용자로부터 방금 받은 것(예: 웹 양식의 텍스트 필드에 입력된 것)으로 생각하십시오. 우리는 더블을 사용합니다. Parse() 메서드를 사용해서 float로 변환하지만 CultureInfo 유형의 두 번째 매개변수를 전달합니다 - 이 매개변수를 전달하지 않으면 시스템 설정이 사용되며 영어, 독일어 또는 완전히 다른 것이 될 수 있습니다. 이제 출력을 확인하십시오.

```
1,425 is not the same as 1425
```

아주 사실입니다! 독일에서는 쉼표를 소수점 구분 기호로 사용하고 마침표는 천 단위 구분 기호로 사용하기 때문에 숫자 값이 천 배 더 커졌습니다. 이것은 대부분의 응용 프로그램에서 주요 문제가 될 수 있지만 좋은 소식은 예제에서 문제를 설명하는 동시에 해결책도 설명한다는 것입니다. 보시다시피 CultureInfo 클래스 덕분에 .NET은 가능한 모든 형식의 숫자(및 날짜)를 구문 분석할 수 있기 때문에 항상 입력을 받는 방법을 제어한 다음 그에 따라 처리해야 합니다. 당신이 무엇을 기대해야 하는지 말하는 한.

### 요약
문화적, 지역적 차이를 다루는 것은 아마도 실생활보다 프로그래밍할 때 훨씬 더 중요할 것입니다. 다행스럽게도 .NET 프레임워크는 어디를 봐야 하는지 아는 한 이러한 점에서 큰 도움이 될 수 있습니다. 다음 몇 섹션에서는 이러한 차이점을 처리하기 위해 .NET Framework에서 제공하는 도구에 대해 설명합니다.





## Application Culture & UICulture
이전 섹션에서 논의했듯이 문화를 다루는 것은 특히 날짜와 숫자를 다룰 때 매우 중요합니다. 이러한 이유로 응용 프로그램에는 항상 "CurrentCulture"로 정의된 CultureInfo 클래스의 인스턴스가 있습니다. CultureInfo 클래스에 있는 이 속성을 변경하지 않는 한 운영 체제에서 사용하는 문화권과 동일합니다. 이를 확인하는 간단한 방법은 다음과 같습니다.

```
Console.WriteLine("Current culture: " + CultureInfo.CurrentCulture.Name);
```

이 섹션에서는 항상 CultureInfo 클래스를 사용하므로 예제 맨 위에 표시된 것처럼 using 문에 포함하는 것을 잊지 마십시오.

이 예제에서는 응용 프로그램에서 사용하는 문화권(예: 미국에서 영어로 실행되는 컴퓨터의 경우 "en-US")를 출력합니다. 독일에 거주하고 컴퓨터가 독일어를 사용하는 경우 결과는 대신 "de-DE"가 됩니다. 즉, 처음 두 글자는 언어를 지정하고 마지막 두 글자는 국가 또는 지역을 지정합니다.

그러나 응용 프로그램에서 사용하는 문화권을 더 많이 제어해야 할 수도 있습니다. 예를 들어, 응용 프로그램이 모든 곳에서 영어를 사용하는 경우 사용자의 컴퓨터가 지정했다는 이유만으로 독일어 또는 스웨덴어 형식으로 숫자를 출력하는 것이 합리적입니까? 아마도 그럴 수 있지만 그렇지 않은 경우 CurrentCulture 속성을 다시 사용해서 새 기본값/대체 문화권을 매우 쉽게 지정할 수 있습니다.

```
CultureInfo.CurrentCulture = new CultureInfo("en-US");
Console.WriteLine("Current culture: " + CultureInfo.CurrentCulture.Name);

float largeNumber = 12345.67f;
Console.WriteLine("Number format (Current culture): " + largeNumber.ToString());

CultureInfo germanCulture = new CultureInfo("de-DE");
Console.WriteLine("Number format (German): " + largeNumber.ToString(germanCulture));
```

기본적으로 CurrentCulture 속성을 en-US 문화권으로 설정해서 재정의합니다. 그런 다음 큰 부동 소수점 숫자와 함께 출력합니다. 결과는 영어 형식의 숫자임을 알 수 있습니다. 마지막 몇 줄에서는 다른 CultureInfo 인스턴스를 ToString() 메서드에 전달해서 대체 문화권을 무효화하는 방법을 보여 줍니다. 이 경우 숫자도 독일어 형식으로 출력됩니다. 이 예제의 결과 출력은 다음과 같아야 합니다.

```
Current culture: en-US
Number format (Current culture): 12345.67
Number format (German): 12345,67
```

### CurrentCulture 및 CurrentUICulture
CultureInfo에는 CurrentUICulture라는 속성도 있습니다. 이 속성은 사용자 인터페이스를 지역화하기 위해 리소스 파일을 사용하는 경우에만 관련이 있으며, 이 경우 애플리케이션은 CurrentUICulture 속성에 따라 로드해야 하는 리소스 파일 버전을 알 수 있습니다. 숫자, 날짜 등의 서식을 포함한 다른 모든 목적을 위해 CurrentCulture 속성을 사용해야 합니다.

### CurrentCulture 및 스레드
아직 스레드에 대해 이야기하지는 않았지만 기본적으로 응용 프로그램이 동시에 여러 작업을 수행할 수 있도록 하는 개념입니다. .NET 응용 프로그램이 시작되면 단일 스레드가 만들어지고 프레임워크의 많은 다중 스레딩 전략 중 하나를 사용해서 특별히 새 스레드를 만들지 않는 한 이 스레드만 사용됩니다. 여기에서 언급하는 이유는 애플리케이션의 대체 문화와 관련해서 매우 관련이 있기 때문입니다. 실제로 CultureInfo.CurrentCulture는 기본적으로 Thread.CurrentThread.CurrentCulture 속성에 대한 바로 가기이므로 CurrentCulture를 정의할 때마다 현재 스레드에만 유효합니다.

.NET Framework 버전 4.5 이전에는 만든 각 새 스레드의 문화권을 수동으로 지정해야 했습니다. 그러나 .NET 4.5에서는 CultureInfo.DefaultThreadCurrentCulture 속성이 도입되었습니다. 설정하면 생성된 각 새 스레드도 이 문화권을 사용하며 CurrentCulture 속성만큼 사용하기 쉽습니다.

```
CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("de-DE");
```

그러나 기존 스레드는 어떻습니까? 실제로 CurrentCulture 속성에 대해 다른 문화권을 아직 정의하지 않은 경우 DefaultThreadCurrentCulture 속성을 설정하면 CurrentCulture 속성에도 적용됩니다. 즉, 응용 프로그램에서 여러 스레드를 사용하려는 경우 CurrentCulture 대신 DefaultThreadCurrentCulture 를 사용하는 것이 좋습니다.

### 요약
CultureInfo.CurrentCulture 및/또는 CultureInfo.DefaultThreadCurrentCulture 속성을 사용해서 응용 프로그램에 대한 대체 문화권을 정의할 수 있으며, 각 상황에서 이를 특별히 무시하지 않는 한 숫자 또는 날짜가 출력될 때마다 항상 사용됩니다.





## The CultureInfo class
지난 몇 개의 섹션에서는 응용 프로그램에 숫자와 날짜가 표시되는 방식을 완전히 제어해야 할 때 CultureInfo 클래스가 얼마나 유용한지에 대해 이야기했습니다. 또한 애플리케이션에서 대체로 사용해야 하는 문화권을 확인하고 수정하는 방법에 대해서도 설명했습니다. 이 모든 것이 준비되었으므로 실제 CultureInfo 클래스를 더 깊이 파고들어 이를 최대한 활용할 수 있는 방법을 알아볼 차례입니다.

시작하기 전에 빠른 알림: CultureInfo 클래스는 System.Globalization 네임스페이스의 일부이므로 예제를 시도할 때마다 가져와야 합니다.

```
using System.Globalization;
```

### 중립적이고 특정 문화권
이 장의 이전 예제에서는 언어와 국가/지역을 모두 지정하는 문화권인 특정 문화권만 사용했습니다. 이에 대한 예는 원하는 언어가 영어여야 하고 지역이 미국이어야 한다고 명확하게 명시하는 en-US 문화입니다. 이에 대한 대안은 동일한 언어(영어)이지만 미국 대신 영국을 지역으로 사용하는 en-GB 문화입니다.

이러한 차이점이 중요한 경우가 있으며, 이 경우 이러한 지역별 버전의 CultureInfo 클래스를 사용해야 합니다. 반면에 영어가 언어일 뿐이고 이 언어를 특정 국가나 지역에 묶고 싶지 않은 상황도 있을 것입니다. 이를 위해 .NET Framework는 언어만 지정하는 소위 중립 문화권을 정의합니다. 실제로 en-US와 en-GB는 모두 이러한 중립 문화권에서 상속되며(동일한 언어를 공유하기 때문에 완벽하게 의미가 있습니다!) Parent 속성에서 액세스할 수 있습니다. 예를 들어 설명하겠습니다.

```
CultureInfo enGb = new CultureInfo("en-GB");
CultureInfo enUs = new CultureInfo("en-US");
Console.WriteLine(enGb.DisplayName);
Console.WriteLine(enUs.DisplayName);
Console.WriteLine(enGb.Parent.DisplayName);
Console.WriteLine(enUs.Parent.DisplayName);
```

매우 유용한 예제는 아니지만 CultureInfo 클래스의 내부 구조에 대한 더 나은 아이디어를 제공합니다. 출력은 다음과 같아야 합니다.

```
English (United Kingdom)
English (United States)
English
English
```

### 올바른 CultureInfo 가져오기
이전 예제에서 언어-국가/지역 식별자를 클래스의 생성자에 전달해서 원하는 CultureInfo 클래스를 가져올 수 있음을 확인했습니다. 그러나 위에서 설명한 것처럼 중립 문화권을 찾고 있을 수 있으므로 언어 식별자를 전달할 수도 있습니다.

```
CultureInfo en = new CultureInfo("en");
```

그러면 .NET Framework가 지역 중립적인 영어 CultureInfo 인스턴스를 반환합니다. 가능한 언어 및/또는 언어 국가/지역 식별자의 전체 목록은 MSDN 설명서를 확인하는 것이 좋습니다.

특정 문화권을 식별하는 또 다른 방법은 소위 LCID(LoCale ID)를 사용하는 것입니다. 기존 CultureInfo 인스턴스의 속성으로 찾을 수 있지만 ID를 알고 있는 경우 CultureInfo 개체를 인스턴스화하는 데 사용할 수도 있습니다. 예를 들어 en-US의 LCID는 1033입니다.

```
CultureInfo enUs = new CultureInfo(1033);
```

그러나 대부분의 경우 이전에 설명한 것처럼 language-country/region 지정자를 사용하는 것이 훨씬 쉽습니다.

### 사용 가능한 문화권 목록 가져오기
이제 특정 문화권을 가져와 다양한 용도로 사용할 수 있지만 사용자가 언어 및/또는 국가/지역을 선택할 수 있도록 하기 위해 사용 가능한 문화권 목록이 필요할 수 있습니다. 다행히도 .NET 프레임워크를 사용하면 이러한 작업을 쉽게 수행할 수 있습니다.

```
CultureInfo[] specificCultures = CultureInfo.GetCultures(CultureTypes.SpecificCultures);
foreach (CultureInfo ci in specificCultures)
    Console.WriteLine(ci.DisplayName);
Console.WriteLine("Total: " + specificCultures.Length);
```

코드의 첫 번째 줄에서 알 수 있듯이 CultureInfo 클래스에서 GetCultures 정적 메서드를 사용해서 문화권 목록을 가져옵니다. 찾고 있는 문화권의 종류를 지정하는 CultureTypes 매개 변수가 필요합니다. 이 경우 이전에 이야기했듯이 언어와 국가/지역 모두에 연결된 문화인 특정 문화를 요청했습니다. 그건 그렇고, 그것은 꽤 긴 목록입니다 - 이 컴퓨터에서는 총 563개의 사용 가능한 문화를 얻을 수 있습니다!

하지만 중립적인 문화에 더 관심이 있으신가요? 예를 들어, 사용 가능한 언어 목록을 작성하면서 해당 언어가 어느 국가나 지역과 관련이 있는지 신경 쓰지 않는 경우 이는 완벽하게 의미가 있을 것입니다. 이 작업은 CultureTypes 매개 변수를 변경하는 것만큼 간단합니다.

```
CultureInfo[] neutralCultures = CultureInfo.GetCultures(CultureTypes.NeutralCultures);
foreach (CultureInfo ci in neutralCultures)
    Console.WriteLine(ci.DisplayName);
Console.WriteLine("Total: " + neutralCultures.Length);
```

이렇게하면 특정 문화권만큼 중립 문화권이 많지 않다는 것을 알 수 있습니다 - 내 컴퓨터 / .NET Framework 버전에서는 총 280 개의 중립 문화권이 있습니다.

### CultureInfo의 중요한 속성 및 메서드
CultureInfo 클래스의 인스턴스가 있으면 즉시 사용 가능한 매우 광범위한 속성과 메서드에 액세스할 수 있습니다. 이 회원들은 문화와 관련해서 많은 유용한 일을 성취하는 데 도움을 줄 수 있습니다 - 그 중 일부를 살펴보겠습니다!

#### 날짜/시간 형식
DateTimeFormat 속성을 사용하면 날짜 및 시간의 서식을 지정하는 방법에 대한 정보와 지정된 문화권의 달력에 대한 많은 유용한 정보에 액세스할 수 있습니다. 이에 대한 좋은 예는 FirstDayOfWeek 및 CalendarWeekRule 속성입니다 - 일주일이 시작되는 요일(보통 일요일 또는 월요일)과 연도의 첫 번째 달력 주가 결정되는 방법(예: 첫날 또는 첫 번째 전체 주)을 알려줄 수 있습니다.

```
CultureInfo enUs = new CultureInfo("en-US");
Console.WriteLine("First day of the: " + enUs.DateTimeFormat.FirstDayOfWeek.ToString());
Console.WriteLine("First calendar week starts with: " + enUs.DateTimeFormat.CalendarWeekRule.ToString());
```

CultureInfo 인스턴스를 자신의 문화권 또는 알고 있는 다른 문화권으로 변경해서 이러한 속성이 어떻게 다른지 확인하십시오.

또 다른 멋진 점은 MonthNames와 같은 속성과 GetMonthName()과 같은 메서드를 사용해서 특정 문화권의 월 및 일 이름에 대한 정보를 얻을 수 있다는 것입니다. 다음은 간단한 예입니다.

```
CultureInfo enUs = new CultureInfo("en-US");

foreach (string monthName in enUs.DateTimeFormat.MonthNames)
    Console.WriteLine(monthName);
Console.WriteLine("Current month: " + enUs.DateTimeFormat.GetMonthName(DateTime.Now.Month));
```

그리고 DayNames 속성과 GetDayName() 메서드를 사용해서 며칠 동안 똑같은 작업을 수행할 수 있습니다.

```
CultureInfo enUs = new CultureInfo("en-US");

foreach (string dayName in enUs.DateTimeFormat.DayNames)
    Console.WriteLine(dayName);
Console.WriteLine("Today is: " + enUs.DateTimeFormat.GetDayName(DateTime.Now.DayOfWeek));
```

DateTimeFormat 속성에는 DateSeparator, YearMonthPattern 등과 같은 더 많은 유용한 속성과 메서드가 있습니다. 자신을 찾아보십시오 - 날짜 / 시간 관련 문제에 대한 해결책이 숨겨져 있을 수 있습니다 : DateTimeFormatInfo 문서.

#### 숫자 형식
DateTimeFormat에 날짜에 대한 정보가 있는 것처럼 특정 문화권이 NumberFormat 속성에서 숫자를 처리하는 방법에 대한 정보에 액세스할 수 있습니다. 이 정보는 숫자의 시각적 표현을 요청할 때마다(예: 문자열로 변환하고 콘솔에 쓸 때) 사용되지만 NumberFormat 속성의 속성과 메서드를 사용해서 정보에 직접 액세스할 수도 있습니다.

```
CultureInfo enUs = new CultureInfo("en-US");  
Console.WriteLine(enUs.DisplayName + ":");  
Console.WriteLine("NumberGroupSeparator: " + enUs.NumberFormat.NumberGroupSeparator);  
Console.WriteLine("NumberDecimalSeparator: " + enUs.NumberFormat.NumberDecimalSeparator);  

CultureInfo deDe = new CultureInfo("de-DE");  
Console.WriteLine(deDe.DisplayName + ":");  
Console.WriteLine("NumberGroupSeparator: " + deDe.NumberFormat.NumberGroupSeparator);  
Console.WriteLine("NumberDecimalSeparator: " + deDe.NumberFormat.NumberDecimalSeparator);
```

NumberGroupSeparator 및 NumberDecimalSeparator 속성을 사용해서 영어 및 독일어 문화권에 대한 숫자가 표시되는 방법(예: 1,000.00 또는 1.000,00)에 대한 정보를 가져옵니다. 살펴보면 통화(CurrencyGroupSeparator 및 CurrencyDecimalSeparator)와 백분율(PercentGroupSeparator 및 PercentDecimalSeparator)에 대해 일치하는 속성을 찾을 수 있습니다.

통화에 대해 말하자면, NumberFormat 속성은 주어진 문화권이 통화 금액을 표시하는 데 사용하는 기호를 알려줄 수도 있습니다.

```
CultureInfo enUs = new CultureInfo("en-US");
Console.WriteLine(enUs.DisplayName + " - currency symbol: " + enUs.NumberFormat.CurrencySymbol);
CultureInfo deDe = new CultureInfo("de-DE");
Console.WriteLine(deDe.DisplayName + " - currency symbol: " + deDe.NumberFormat.CurrencySymbol);
CultureInfo ruRu = new CultureInfo("ru-RU");
Console.WriteLine(ruRu.DisplayName + " - currency symbol: " + ruRu.NumberFormat.CurrencySymbol);
```

이러한 모든 속성에 대해 알아두면 좋지만 숫자를 문자열로 변환할 때 올바른 형식 문자열을 지정하는 한 C#은 자동으로 정보를 사용해서 숫자, 백분율 및 통화 형식을 지정하기 때문에 대부분의 경우 처리할 필요가 없습니다.

### 이름 및 식별자
마지막으로 CultureInfo 인스턴스를 나타내는 속성을 살펴보겠습니다. 우리는 이미 Name 및 DisplayName과 같은 그 중 일부를 사용했지만 실제로 어떻게 작동합니까? 먼저 CultureInfo를 식별하는 데 사용되는 사용 가능한 속성 목록은 다음과 같습니다.

- 이름은 languagecode-country/region-code 형식으로 CultureInfo를 식별합니다(예: 미국의 영어는 "en-US", 영국의 영어는 en-GB 등). 국가/지역을 지정하지 않으면 첫 번째 부분만 반환됩니다(예: 영어의 경우 "en").
- TwoLetterISOLanguageName 은 Name과 거의 동일하지만 국가/지역이 지정되었는지 여부에 관계없이 언어 코드만 반환합니다. 예를 들어 "en-US"와 "en-GB" 모두에 대해 "en"이 반환됩니다. 반환된 문자는 ISO 639-1 표준에 지정되어 있습니다.
- ThreeLetterISOLanguageName은 TwoLetterISOLanguageName과 매우 유사하게 작동하지만 ISO 639-2 표준에 지정된 대로 두 글자가 아닌 세 글자를 반환합니다.
- EnglishName은 언어 이름(영어)을 반환합니다. 국가/지역이 지정된 경우 괄호 집합 안에 결과에 추가됩니다.
- NativeName은 CultureInfo 인스턴스에서 지정한 언어로 언어의 이름을 반환합니다. 국가/지역이 지정된 경우 괄호 집합 안에 결과에 추가됩니다.

### 요약
이 섹션의 길이에서 알 수 있듯이 일반적으로 문화를 다루는 것은 간단한 작업이 아닙니다. 다행히도 .NET 프레임워크를 사용하면 CultureInfo 클래스를 사용하면 훨씬 더 쉽게 사용할 수 있습니다. 숫자와 날짜의 서식을 지정할 때 응용 프로그램 전체에서 자동으로 사용되지만 필요한 경우 동작을 수정할 수 있도록 작동 방식을 아는 것이 좋습니다. 이 섹션가 CultureInfo 수업에 대해 알아야 할 대부분의 내용을 가르쳐 주었기를 바랍니다.





## The RegionInfo class
CultureInfo 클래스에 대한 이전 섹션에서는 국가/지역 부분에 대해 약간 설명했지만 실제로 System.Globalization 네임스페이스의 다른 클래스 중 하나인 RegionInfo 클래스를 사용해서 훨씬 더 많은 지역 기반 작업을 수행할 수 있습니다. 여기에는 특정 지역(일반적으로 국가)에 대한 많은 유용한 정보(예: 통화 이름 및 기호, 미터법 사용 여부 등)가 포함됩니다.

### RegionInfo 인스턴스 가져오기
지역 정보에 액세스하려면 RegionInfo 클래스의 인스턴스가 필요합니다. ISO 3166 코드 또는 지역의 언어 코드/지역-국가 코드(예: "en-US")를 사용할 수 있는 생성자가 있습니다. 예를 들면 다음과 같습니다.

```
RegionInfo regionInfo = new RegionInfo("en-US");
Console.WriteLine(regionInfo.EnglishName);
```

즉, CultureInfo 클래스에 대한 참조가 이미 있는 경우 이를 사용해서 일치하는 RegionInfo를 쉽게 가져올 수 있습니다. 이전 섹션에서 배운 것처럼 애플리케이션에는 항상 참조할 수 있는 대체 CultureInfo 인스턴스가 있습니다.

```
RegionInfo regionInfo = new RegionInfo(CultureInfo.CurrentCulture.Name);
Console.WriteLine(regionInfo.EnglishName);
```

이제 RegionInfo 클래스의 몇 가지 유용한 기능을 살펴보겠습니다.

### RegionInfo 클래스의 중요한 속성
우리는 이미 EnglishName 속성을 체크아웃했습니다 - 단순히 지역 이름을 영어로 반환합니다. 그러나 물론 거기에는 더 좋은 것들이 있습니다 - 예를 들어 통화와 관련된 몇 가지 속성:

```
RegionInfo regionInfo = new RegionInfo("sv-SE");
Console.WriteLine(regionInfo.CurrencySymbol);
Console.WriteLine(regionInfo.ISOCurrencySymbol);
Console.WriteLine(regionInfo.CurrencyEnglishName);
Console.WriteLine(regionInfo.CurrencyNativeName);
```

CurrencySymbol, ISOCurrencySymbol, CurrencyEnglishName 및/또는 CurrencyNativeName을 사용해서 금전적으로 관련된 메시지를 출력하는 데 필요한 정보를 얻습니다. 결과는 다음과 같습니다(이 경우 스웨덴어/스웨덴의 경우).

```
kr
SEK
Swedish Krona
Svensk krona
```

IsMetric 속성을 사용해서 지정된 지역에서 미터법을 사용하는지 쉽게 확인할 수도 있습니다.

```
RegionInfo regionInfo = new RegionInfo(CultureInfo.CurrentCulture.Name);
Console.WriteLine("Is the metric system used in " + regionInfo.EnglishName + "? " + (regionInfo.IsMetric ? "Yes" : "No"));
```

그러면 모든 ID 관련 속성이 남습니다.

- 이름은 언어 및 국가/지역을 식별하는 ISO 3166 코드를 가져옵니다(예: 영어/미국의 경우 "en-US"_).
- DisplayName은 지역화된 .NET Framework 버전에서 국가/지역의 전체 이름을 가져옵니다.
- EnglishName은 영어로 된 국가/지역의 전체 이름을 가져옵니다.
- NativeName은 지정된 언어로 된 국가/지역의 전체 이름을 가져옵니다(예: en-US의 경우 "United States" 또는 de-DE의 경우 "Deutschland").
- TwoLetterISORegionName은 국가/지역에 대한 두 글자 ISO 3166 코드(예: 미국의 경우 "US" 또는 독일의 경우 "DE")를 가져옵니다.
- ThreeLetterISORegionName은 국가/지역에 대한 세 글자 ISO 3166 코드(예: 미국의 경우 "USA" 또는 독일의 경우 "DEU")를 가져옵니다.

분명히 이러한 속성은 다음 예제에서 볼 수 있듯이 국가/지역에 대한 정보를 표시해야 할 때 유용합니다.

### RegionInfo를 사용해서 국가 목록 가져오기
이전 섹션에서는 기본적으로 언어-국가/지역 조합 목록을 남기는 .NET Framework에서 정의된 모든 문화권 목록을 가져오는 방법을 보여 주었습니다. RegionInfo 클래스와 함께 사용해서 국가/지역 목록을 가져올 수 있습니다.

```
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace RegionInfoCountries
{
    class Program
    {
    static void Main(string[] args)
    {
        CultureInfo[] cultures = CultureInfo.GetCultures(CultureTypes.SpecificCultures);
        List<RegionInfo> countries = new List<RegionInfo>();
        foreach (CultureInfo ci in cultures)
        {
        RegionInfo regionInfo = new RegionInfo(ci.Name);
        if (countries.Count(x => x.EnglishName == regionInfo.EnglishName) <= 0)
            countries.Add(regionInfo);
        }
        foreach (RegionInfo regionInfo in countries.OrderBy(x => x.EnglishName))
        Console.WriteLine(regionInfo.EnglishName);
    }
    }
}
```

따라서 이 예제는 이 섹션의 다른 예제보다 조금 더 길지만 자세히 설명하겠습니다. 우리는 사용 가능한 모든 특정 문화권의 목록을 얻는 것으로 시작합니다 - 이전 섹션에서 배웠듯이 특정 문화권은 언어와 지역/국가를 정의하는 문화권입니다. 이 목록을 반복하고 반복할 때마다 CultureInfo 인스턴스를 사용해서 해당 RegionInfo 인스턴스를 만듭니다. 해당 이름을 가진 국가가 이미 목록에 추가되었는지 확인하고 추가되지 않은 경우 추가합니다. 루프가 완료되면 이제 .NET 프레임워크에서 정의한 국가의 전체 목록이 생겨 루프를 통해 콘솔로 출력하거나 유용하다고 생각되는 거의 모든 작업을 수행할 수 있습니다.

이것은 CultureInfo와 RegionInfo의 조합으로 수행할 수 있는 작업의 좋은 예이지만 이것이 완전하고 정확한 국가 목록이 아니라는 점을 강조하겠습니다. 대신 사용 중인 .NET Framework 버전에 정의된 국가의 전체 목록으로, 기본적으로 일부 국가가 누락되었거나 버전이 출시된 이후 이름이 변경되었을 수 있음을 의미합니다. 따라서 100% 정확하고 최신 상태인 국가 목록이 필요한 경우 직접 만들고 유지 관리해야 할 것입니다.

### 요약
RegionInfo 클래스는 기본적으로 특정 국가/지역에 대한 훨씬 더 유용한 정보를 제공하는 CultureInfo 클래스의 확장입니다. 이를 통해 특정 지역의 신원과 통화에 대해 더 많이 알 수 있으며 국가/지역 목록을 얻는 데 도움이 될 수 있습니다.



---




# Regular Expressions (Regex)

## Introduction
우리는 이전에 문자열에 대해 많이 이야기했습니다 - 텍스트를 처리하고 조작하는 능력은 모든 프로그래머에게 매우 중요합니다! 그러나 SubString 메서드를 사용해서 문자열을 자르거나 간단한 문자열 대 문자열 바꾸기 작업을 수행하는 것은 간단한 문자열 처리로 간주될 수 있지만 정규식(일반적으로 Regex로 축약됨)을 사용한 문자열 처리는 극단적인 버전입니다!

우선, 정규식은 Microsoft/.NET의 발명품이 아닙니다. 사실 정규식은 검색 패턴을 표현하는 방법으로 .NET 프레임워크보다 훨씬 먼저 발명되었습니다. 그런 다음 이 검색 패턴을 사용해서 텍스트 조각에 대한 검색 또는 검색-바꾸기 작업을 수행할 수 있습니다. 첫 번째 생각은 문자열을 검색하는 데 다른 "언어"가 필요하지 않다는 것일 수 있지만 정규식으로 무엇을 할 수 있는지 기다리십시오!

정규식의 멋진 점은 거의 모든 프로그래밍 언어에서 지원되며 약간의 변형이 있지만 이러한 프로그래밍 언어에서 동일한 정규식을 사용해서 동일한 작업을 수행할 수 있다는 것입니다. .NET Framework에는 System.Text.RegularExpressions 네임스페이스에 있는 Regex 클래스를 중심으로 한 정규식의 매우 훌륭한 구현이 있습니다.

### 요약
정규식을 사용하면 문자열에 대한 검색 및 검색/바꾸기 작업을 수행하는 검색 패턴을 정의할 수 있습니다. .NET Framework는 정규식과 함께 쉽게 작동할 수 있으며, 다음 섹션에서는 Regex 클래스와 Match 및 MatchCollection 클래스 같은 도우미 클래스를 사용합니다.



## Searching with the Regex Class
이전 섹션에서 설명했듯이 정규식을 사용하면 문자열 작업을 위한 검색 패턴을 정의할 수 있습니다. 이 검색 패턴을 처리하기 위해 .NET  Framework에는 매우 다양한 클래스인 Regex 클래스가 함께 제공됩니다. 이 섹션에서는 몇 가지 **검색 패턴을 정의** 하고 Regex 클래스와 함께 사용하지만 정규식의 구문은 매우 복잡할 수 있으며 이것은 정규식 자습서가 아닌 C# 자습서라는 점을 명심하십시오. 대신 몇 가지 간단한 정규식 패턴을 사용해서 C#에서 작업하는 방법을 보여 드리겠습니다. 정규식에 대해 좀 더 알고 싶다면 이 정규식 튜토리얼을 추천할 수 있습니다.


### IsMatch() 메서드
이 첫 번째 예제에서는 IsMatch 라는 Regex 클래스의 가장 기본적인 메서드 중 하나를 사용합니다. 테스트 문자열에서 하나 또는 여러 개의 일치 항목이 있는지 여부에 따라 true 또는 false 를 반환합니다.

```
string testString = "John Doe, 42 years";
Regex regex = new Regex("[0-9]+");
if (regex.IsMatch(testString))
    Console.WriteLine("String contains numbers!");
else
    Console.WriteLine("String does NOT contain numbers!");
```

테스트 문자열을 정의한 다음 Regex 클래스의 인스턴스를 만듭니다. 실제 정규식을 문자열로 전달합니다 - 이 경우 정규식은 모든 길이의 숫자를 찾음으로 지정합니다. 그런 다음 정규식이 테스트 문자열과 일치하는지 여부에 따라 텍스트 줄을 출력합니다. 꽤 멋지지만 대부분의 경우에는 일치 항목으로 무언가를 수행하려고 합니다.


### Match 클래스 및 메서드
다음 예제에서는 테스트 문자열에 발견된 숫자를 캡처해서 사용자에게 제시합니다.

```
string testString = "John Doe, 42 years";
Regex regex = new Regex("[0-9]+");
Match match = regex.Match(testString);
if (match.Success)
    Console.WriteLine("Number found: " + match.Value);
```

이전과 동일한 정규식과 테스트 문자열을 사용합니다. Match 클래스의 인스턴스를 반환하는 Match() 메서드를 호출합니다. 일치하는 항목이 발견되었는지 확인하기 위해 Success 속성을 확인합니다. 일치하는 항목이 발견되었다고 확신하면 Value 속성을 사용해서 검색합니다.

Match 클래스에는 일치하는 문자열보다 유용한 정보가 더 포함되어 있습니다 - 예를 들어, 일치 항목이 발견 된 위치나 길이 등을 쉽게 찾을 수 있습니다.

```
string testString = "John Doe, 42 years";
Regex regex = new Regex("[0-9]+");
Match match = regex.Match(testString);
if (match.Success)
    Console.WriteLine("Match found at index " + match.Index + ". Length: " + match.Length);
```

인덱스 및 길이 속성은 일치 항목의 위치 및 길이에 대한 정보를 표시하는 데 사용됩니다.


#### 캡처 그룹(하위 문자열)
처음 몇 가지 예에서는 검색 문자열에서 단일 값을 찾았지만 정규식은 물론 그 이상의 작업을 수행할 수 있습니다! 예를 들어, 테스트 문자열에서 이름과 나이를 모두 찾는 동시에 명령 및 "years" 텍스트와 같은 관련 없는 항목을 정렬할 수 있습니다. 이와 같은 작업을 수행하는 것은 정규식의 경우 식은 죽 먹기지만 구문에 익숙하지 않다면 매우 복잡해 보일 수 있지만 어쨌든 시도해 보겠습니다.

```
string testString = "John Doe, 42 years";
Regex regex = new Regex(@"^([^,]+),\s([0-9]+)");
Match match = regex.Match(testString);
if (match.Success)
    Console.WriteLine("Name: " + match.Groups[1].Value + ". Age: " + match.Groups[2].Value);
```

쉼표가 아닌 모든 것을 찾도록 정규식을 수정했습니다 - 이 값은 괄호 덕분에 첫 번째 캡처 그룹에 배치됩니다. 그런 다음 구분용 쉼표를 찾고 그 다음에 두 번째 캡처 그룹에 배치되는 숫자를 찾습니다(다시 말하지만, 주변 괄호 덕분에) 마지막 줄에서는 Groups 속성을 사용해서 일치하는 그룹에 액세스합니다. 이름에는 인덱스 1을 사용하고 연령에는 인덱스 2를 사용하므로 정규식 문자열에 일치 그룹이 정의된 순서를 따르며 인덱스 0에는 전체 일치 항목이 포함됩니다.


#### 명명된 캡처 그룹
방금 사용한 정규식보다 더 고급에 길어지면 번호가 매겨진 캡처 그룹의 순서와 인덱스를 지속적으로 기억해야 하기 때문에 관리하기 어려워질 수 있습니다. 다행히 정규식과 .NET  Framework는 명명된 캡처 그룹 기능을 지원하므로 정규식에서 각 캡처 그룹에 이름을 지정한 다음 Groups 속성에서 이름으로 참조할 수 있습니다. 번호가 매겨진 대신 명명된 그룹 이름을 사용하는 다음 예제를 확인하십시오.

```
string testString = "John Doe, 42 years";
Regex regex = new Regex(@"^(?<name>[^,]+),\s(?<age>[0-9]+)");
Match match = regex.Match(testString);
if (match.Success)
    Console.WriteLine("Name: " + match.Groups["name"].Value + ". Age: " + match.Groups["age"].Value);
```

이전과 똑같이 작동하지만 이제 인덱스 번호를 기억할 필요 없이 논리적인 이름을 사용해서 일치하는 값을 조회할 수 있습니다. 이것은 간단한 예에서는 큰 차이가 아닐 수 있지만 언급했듯이 정규식의 복잡성과 길이가 증가하면 확실히 감사할 것입니다.


### MatchCollection 클래스
Match 클래스는 단일 일치 항목으로만 작업할 경우(이전 예제에서 본 것처럼 일치 항목에는 여러 값이 포함될 수 있음) 한 번에 여러 일치 항목으로 작업할 경우에 적합합니다. 이를 위해 MatchCollection 클래스를 반환하는 Matches() 메서드가 있습니다. 일치하는 모든 값을 찾은 순서대로 포함합니다. 어떻게 사용할 수 있는지 살펴보겠습니다.

```
string testString = "123-456-789-0";
Regex regex = new Regex(@"([0-9]+)");
MatchCollection matchCollection = regex.Matches(testString);
foreach (Match match in matchCollection)
    Console.WriteLine("Number found at index " + match.Index + ": " + match.Value);
```

이전 예제에 정규식과 테스트 문자열을 변경했습니다. 이제 여러 숫자를 포함하는 테스트 문자열과 하나 이상의 숫자로 구성된 문자열을 구체적으로 찾는 정규식이 있습니다. Matches() 메서드를 사용해서 문자열에서 발견된 일치 항목을 포함하는 MatchCollection 을 가져옵니다. 이 경우 4개의 일치 항목이 있으며 foreach 루프로 차례대로 출력합니다. 결과는 다음과 같습니다.

```
Number found at index 0: 123
Number found at index 4: 456
Number found at index 8: 789
Number found at index 12: 0
```

만약 일치하는 항목이 없으면 빈 MatchCollection 을 반환합니다.


### 요약
Match 및 MatchCollection 클래스와 함께 Regex 클래스의 도움으로 매우 고급 문자열 일치를 쉽게 수행할 수 있습니다. 정규식 구문은 매우 복잡해 보일 수 있지만 일단 배우면 매우 강력한 도구를 갖게 될 것입니다. 정규식 구문을 배우는 데 시간을 투자하고 싶지 않더라도 간단한 Google 검색을 통해 다른 프로그래머가 만든 특정 요구 사항에 맞는 정규 표현식을 찾을 수 있는 경우가 많습니다. 정규식 문자열을 작성하거나 채용하자마자 이 문서에 설명된 기술과 클래스를 사용해서 자신의 목적에 맞게 사용할 수 있습니다.

그러나 검색은 재미의 일부일 뿐입니다 - 정규식으로 매우 멋진 검색/바꾸기 작업을 수행할 수 있습니다. 다음 섹션에서 이에 대해 살펴보겠습니다.


## Search/Replace with the Regex Class
이전 섹션에서 Regex 클래스와 문자열을 검색할 경우 이를 사용하는 방법에 대해 이미 논의했습니다. 정규식은 이에 적합하지만 또 다른 용도는 특정 문자열 패턴을 찾아 다른 패턴으로 바꾸는 검색/바꾸기 작업을 수행할 경우입니다. 

String 클래스에는 이미 Replace() 메서드가 있지만 간단한 검색에만 적합합니다. 정규식을 사용할 때 정규식 검색 기능을 사용할 수 있으며 캡처된 그룹을 바꾸기 문자열의 일부로 사용할 수도 있습니다. 복잡하게 들리나요? 간단한 예제부터 시작한 다음 천천히 고급 사용 사례로 작업하겠습니다.

이전 문서에서와 마찬가지로 모든 예제에서는 다음과 같이 RegularExpressions 네임스페이스를 선언했다고 가정합니다.

```
using System.Text.RegularExpressions;
```

그런 다음 정규식 기반 문자열 교체로 작업해 보겠습니다. Regex 클래스에 있는 Replace() 메서드를 사용합니다.

```
string testString = "<b>Hello, <i>world</i></b>";
Regex regex = new Regex("<[^>]+>");
string cleanString = regex.Replace(testString, "");
Console.WriteLine(cleanString);
```

이 예제에서는 문자열에서 HTML 태그를 제거하는 매우 간단한 접근 방식을 보여줍니다. 꺾쇠 괄호(`<...>`) 집합으로 둘러싸인 모든 것을 일치시킨 다음 Replace() 메서드를 사용해서 각 항목을 빈 문자열로 바꾸고 이것은 기본적으로 테스트 문자열에서 HTML 태그를 제거합니다.


### 캡처된 값으로 바꾸기
그러나 실제로 제거하고 싶지 않고 대신 꺾쇠 괄호(`<...>`)를 대괄호(`[...]`)로 바꾸는 등 브라우저에서 해석되지 않는 것으로 태그를 변환한다고 가정해 보겠습니다. 이것은 정규식이 실제로 그 힘을 보여주는 곳인데, 이전 예제에서 다시 작성한 버전에서 알 수 있듯이 실제로 매우 사용하기 쉽습니다.

```
string testString = "<b>Hello, <i>world</i></b>";
Regex regex = new Regex("<([^>]+)>");
string cleanString = regex.Replace(testString, "[$1]");
Console.WriteLine(cleanString);
```

실제로 두 가지 사소한 세부 사항을 변경했습니다. 정규식에 괄호 세트를 추가해서 캡처 그룹을 만들고 기본적으로 꺾쇠 괄호 사이의 값을 첫 번째 캡처 그룹으로 캡처했습니다. Replace() 메서드에서는 기본적으로 캡처 그룹 번호 1을 의미하는 특수 표기법 `$1` 을 사용해서 이것을 역참조합니다. 이 작업을 수행하면 출력은 다음과 같습니다.

```
[b]Hello, [i]world[/i][/b]
```

#### 명명된 캡처 그룹
물론 명명된 캡처 그룹(이전 섹션에서 설명)을 사용할 때도 다음과 같이 똑같은 작업을 수행할 수 있습니다.

```
string testString = "<b>Hello, <i>world</i></b>";
Regex regex = new Regex("<(?<tagName>[^>]+)>");
string cleanString = regex.Replace(testString, "[${tagName}]");
Console.WriteLine(cleanString);
```

명명된 캡처 그룹을 사용할 때는 `${name-of-capture-group}` 표기법을 사용합니다.


### MatchEvaluator 메서드 사용
그러나 값이 대체되는 방법에 대해 보다 많은 제어를 원한다면? 이를 위해 MatchEvaluator 매개변수를 사용할 수 있습니다 - 기본적으로 대체가 이루어질 때마다 호출되는 메서드에 대한 참조(대리자)일 뿐이므로 대체 값을 사용하기 전에 수정할 수 있습니다. 이미 몇 번 사용한 HTML 태그 예제를 고수하겠지만 이번에는 어떤 HTML 태그가 사용되는지 제어합니다. 전체 예는 다음과 같습니다.

```
using System;
using System.Text.RegularExpressions;

namespace RegexSearchReplaceMethod
{
    class Program
    {
    static void Main(string[] args)
    {
        string testString = "<b>Hello, <i>world</i></b>";
        Regex regex = new Regex("<(?<tagName>[^>]+)>");
        string cleanString = regex.Replace(testString, ProcessHtmlTag);
        Console.WriteLine(cleanString);
    }

    private static string ProcessHtmlTag(Match m)
    {
        string tagName = m.Groups["tagName"].Value;
        string endTagPrefix = "";
        if(tagName.StartsWith("/"))
        {
        endTagPrefix = "/";
        tagName = tagName.Substring(1);
        }
        switch (tagName)
        {
        case "b":
            tagName = "strong";
            break;
        case "i":
            tagName = "em";
            break;
        }
        return "<" + endTagPrefix + tagName.ToLower() + ">";
    }
    }
}
```

예제의 첫 번째 부분은 이전과 똑같이 보이지만 대체 문자열을 제공하는 대신 ProcessHtmlTag() 메서드에 대한 참조를 전달합니다. 언급했듯이 이 메서드는 해당 Match를 매개 변수로 사용해서 교체가 이루어질 때마다 호출됩니다. 즉, MatchEvaluator 메서드에는 일치에 대한 모든 정보가 있으므로 그에 따라 조치를 취할 수 있습니다. 이 경우 이 기회를 사용해서 굵은 (b) 태그를 강력한 태그로 바꾸고 기울임꼴 (i) 태그를 강조(em) 태그로 대체해서 태그를 더 의미 있게 만듭니다. 태그가 변경되든 없든 소문자로 바꿉니다.

MatchEvaluator 파라미터를 사용하는 것은 분명히 매우 강력하며 이것은 수행할 수 있는 작업의 간단한 예일 뿐입니다.

### 요약
검색/바꾸기 작업은 정규식을 사용할 때 매우 강력해지며, 문자열 조작 가능성이 거의 무한해지는 MatchEvaluator 매개 변수를 사용할 때 더욱 강력해집니다.





## Regex Modifiers
이전 섹션에서는 정규식이 무엇인지, C#에서 정규식을 사용해서 일치, 바꾸기 등을 수행하는 방법에 대해 이야기했습니다. 이 시점에서 정규식이 얼마나 강력한지, 그리고 많은 상황에서 어떻게 도움이 될 수 있는지 이미 깨달았을 것이지만, 가능한 수정자에 대해 알면 훨씬 더 강력해집니다.

정규식으로 작업할 때 하나 이상의 수정자를 사용해서 일치하는 엔진의 동작을 제어할 수 있습니다. 예를 들어, 정규식 일치 프로세스는 일반적으로 대소문자를 구분하므로 "a"는 "A"와 동일하지 않습니다. 그러나 많은 상황에서 문자 "a"가 소문자든 대문자든 상관없이 문자가 되도록 일치 항목을 대/소문자를 구분하지 않기를 원합니다. Regex 인스턴스를 만들 때 RegexOptions.IgnoreCase 옵션을 제공하기만 하면 일치 항목이 대/소문자를 구분하지 않습니다.

사용 가능한 모든 한정자는 RegexOptions 열거형에서 찾을 수 있습니다. 그 중 일부는 정규식 표준을 지원하는 모든 프로그래밍 언어에서 공통적인 반면 다른 일부는 .NET Framework에만 해당됩니다.

첫 번째 예제에서 볼 수 있듯이 Regex 수정자는 일반적으로 Regex 인스턴스를 만들 때 두 번째 매개변수로 지정됩니다. 다음과 같이 파이프(|) 문자로 구분해서 둘 이상의 옵션을 지정할 수 있습니다.

```
new Regex("[a-z]+", RegexOptions.IgnoreCase | RegexOptions.Singleline);
```

이제 모든 수정자를 실행해서 작동 방식과 무엇을 할 수 있는지에 대한 아이디어를 제공하겠습니다.

### RegexOptions.IgnoreCase
이것은 아마도 가장 많이 사용되는 수정자 중 하나일 것입니다. 위에서 설명한 대로 정규식이 대소문자를 구분하는 것에서 대소문자를 구분하지 않는 것으로 변경됩니다. 이 예에서 볼 수 있듯이 큰 차이가 있습니다.

```
public void IgnoreCaseModifier()
{
    string testString = "Hello World";
    string regexString = @"^[a-z\s]+$";
    Regex caseSensitiveRegex = new Regex(regexString);
    Regex caseInsensitiveRegex = new Regex(regexString, RegexOptions.IgnoreCase);

    Console.WriteLine("Case-sensitive match: " + caseSensitiveRegex.IsMatch(testString));
    Console.WriteLine("Case-insensitive match: " + caseInsensitiveRegex.IsMatch(testString));
}
```

문자(a-z)와 공백만 일치하도록 설계된 간단한 정규식을 지정합니다. RegexOptions.IgnoreCase 수정자가 없는 인스턴스와 RegexOptions.IgnoreCase 수정자가 있는 인스턴스를 만든 다음 소문자와 대문자와 단일 공백으로 구성된 동일한 테스트 문자열을 일치시키려고 합니다. 출력은 놀랍지 않게 다음과 같습니다.

```
Case-sensitive match: False
Case-insensitive match: True
```

### RegexOptions.Singleline
정규식에서 점 (.) 은 기본적으로 포괄적 인 문자입니다. 그러나 기본적으로 줄 바꿈과 일치하지 않으므로 점을 사용해서 문자, 숫자, 특수 문자 등의 전체 줄을 일치시킬 수 있지만 줄 바꿈이 발견되는 즉시 일치가 종료됩니다. 그러나 Singleline 수정자를 제공하면 점도 줄 바꿈과 일치합니다. 차이점을 보여 드리겠습니다.

```
public void SinglelineModifier()
{
    string testString = 
                        @"Hello World
                        This string contains
                        several lines";
    string regexString = ".*";
    
    Regex normalRegex = new Regex(regexString);
    Regex singlelineRegex = new Regex(regexString, RegexOptions.Singleline);            

    Console.WriteLine("Normal regex: " + normalRegex.Match(testString).Value);
    Console.WriteLine("Singleline regex: " + singlelineRegex.Match(testString).Value);
}
```

출력은 다음과 같습니다.

```
Normal regex: Hello World

Singleline regex: Hello World
                            This string contains
                            several lines
```

### RegexOptions.Multiline
이 장에서 이야기했듯이 정규식은 특별한 목적을 가진 다양한 문자로 구성됩니다. 이에 대한 또 다른 예는 ^ 및 $ 두 문자입니다. 실제로 위의 대소문자 구분 예제에서 문자열의 시작과 끝을 일치시키기 위해 사용했습니다. 그러나 여러 줄 한정자를 제공하면 이 동작을 문자열의 시작/끝과 일치시키는 것에서 줄의 시작/끝과 일치하도록 변경할 수 있습니다. 이는 일치하는 라인을 개별적으로 처리하려는 경우에 매우 유용합니다. 예를 들면 다음과 같습니다.

```
public void MultilineModifier()
{
    string testString =
                        @"Hello World
                        This string contains
                        several lines";
    string regexString = "^.*$";

    Regex singlelineRegex = new Regex(regexString, RegexOptions.Singleline);
    Regex multilineRegex = new Regex(regexString, RegexOptions.Multiline);

    Console.WriteLine("Singleline regex: " + singlelineRegex.Match(testString).Value);

    Console.WriteLine("Multiline regex:");
    MatchCollection matches = multilineRegex.Matches(testString);
    for(int i = 0; i < matches.Count; i++)
        Console.WriteLine("Line " + i + ": " + matches[i].Value.Trim());
}
```

여러 줄로 구성된 여러 테스트 문자열을 사용한 다음 일치 메커니즘을 다르게 사용하는 방법을 확인하십시오. singlelineRegex를 사용하면 위에서 논의한 것처럼 줄 바꿈이 포함되어 있더라도 전체 테스트 문자열을 한 줄로 처리합니다. multilineRegex를 사용할 때 테스트 문자열을 여러 줄로 처리해서 각 줄이 일치합니다. Regex.Matches() 메서드를 사용해서 각 줄을 포착하고 작업할 수 있습니다 - 이 경우 콘솔에 출력하기만 하면 됩니다.

### RegexOptions.컴파일됨
정규식은 일반적으로 매우 빠르지만 매우 복잡하고 루프와 같이 여러 번 실행되는 경우 속도가 약간 느려질 수 있습니다. 이러한 상황에서는 프레임워크가 Regex를 어셈블리로 컴파일할 수 있도록 하는 RegexOptions.Compiled 한정자를 사용할 수 있습니다. 이것은 Regex 객체를 정상적으로 인스턴스화하는 것과 비교해서 만들 때 약간의 추가 시간이 걸리지만 모든 후속 Regex 작업(일치 등)을 더 빠르게 만듭니다.

```
Regex compiledRegex = new Regex("[a-z]*", RegexOptions.Compiled);
```

### 더 많은 수정자
위의 수정자는 가장 흥미로운 수정자이지만 몇 가지 수정자가 더 있으므로 조금 더 빠르게 살펴보겠습니다.

- RegexOptions.CultureInvariant: 이 한정자를 사용하면 언어의 문화적 차이가 무시됩니다. 이는 애플리케이션이 영어가 아닌 여러 언어에서 작동하는 경우에 주로 관련이 있습니다.
- RegexOptions.ECMAScript: 사용된 정규식 변형을 .NET 특정 버전에서 ECMAScript 표준으로 변경합니다. 이것은 거의 필요하지 않습니다.
- RegexOptions.ExplicitCapture: 일반적으로 Regex의 괄호 집합은 캡처 그룹 역할을 하므로 인덱스를 통해 캡처된 각 값에 액세스할 수 있습니다. ExplicitCapture 한정자를 지정하면 나중에 검색할 수 있도록 명명된 그룹만 캡처되고 저장되도록 이 동작이 변경됩니다.
- RegexOptions.IgnorePatternWhitespace: 이 한정자를 활성화하면 Regex의 공백이 무시되고 해시(#) 문자가 접두사로 붙은 주석을 포함할 수도 있습니다.
- RegexOptions.RightToLeft: 기본값이 왼쪽에서 오른쪽으로 이동하는 대신 오른쪽에서 시작해서 왼쪽으로 이동하도록 일치를 변경합니다.

### 요약
보시다시피 가능한 한 많은 사용 사례를 지원하기 위해 정규식을 최대한 활용하기 위해 알아야 할 중요한 정규식 수정자가 많이 있습니다.



---




# Misc

## Randomness with the Random class
어느 시점에서는 애플리케이션에서 임의성을 달성해야 할 수도 있습니다. 그 이유는 여러 가지일 수 있습니다 - 목록의 항목을 임의의 순서로 정렬해야 하거나(셔플링) 게임을 만드는 중일 때 상대방이 임의의 방향으로 움직이기를 원할 수도 있습니다. 이유가 무엇이든 컴퓨터에서 임의의 값을 얻는 일종의 방법이 필요하며 다행스럽게도 C#이 도움이 될 수 있습니다.

대부분의 경우 특정 범위 내에서 하나 이상의 난수를 생성할 수 있는 Random 클래스로 시작합니다. 사용하기도 매우 간단합니다.

```
Random random = new Random();
Console.WriteLine("A random number: " + random.Next());
```

Random 클래스의 새 인스턴스를 초기화한 다음 Next() 메서드를 호출해서 난수(정수)를 얻습니다.

정수 대신 소수점이있는 숫자가 필요한 경우 NextDouble() 메서드를 대신 사용할 수 있습니다 - 0.0 (포함)에서 0.99 사이의 숫자 (실제로 1.0 미만)를 제공합니다.

```
Random random = new Random();
Console.WriteLine("A random number with decimals: " + random.NextDouble());
```

### 랜덤 범위
대부분의 경우 난수를 원하는 것이 아니라 1에서 100 사이와 같은 일종의 범위 내에서 원합니다. 걱정하지 마세요, Random 클래스는 매우 쉽게 할 수 있습니다.

```
Random random = new Random();
Console.WriteLine("A random number between 1 and 100: " + random.Next(1, 101));
```

Next() 호출을 최소값과 최대 수를 포함하는 호출로 변경하기만 하면 됩니다. 최소값은 포함 되지만(이 숫자는 가능한 결과에 포함됨) 최대값은 배타적 인 (이 숫자는 가능한 결과에 포함되지 않음) 100 대신 101을 사용하는 이유입니다. 숫자를 0에서 99 사이로 만들고 싶다면 대신 다음과 같습니다.

```
Console.WriteLine("A random number between 0 and 99: " + random.Next(0, 100));
```

### Random 클래스 시드
Random 클래스는 항상 시드로 인스턴스화되며, 시드를 제공하는 경우 직접 또는 프레임워크에 의해 간접적으로 인스턴스화됩니다. 이 시드를 사용하면 기본적으로 무작위성을 제어할 수 있습니다 - 여러 번 사용되는 특정 시드를 사용하면 동일한 난수 세트를 만들 수 있습니다. 이상하게 들릴 수도 있지만 애플리케이션/게임의 특정 시나리오를 테스트하는 데 유용할 수 있습니다.

시드는 다음과 같이 생성자 오버로드를 사용해서 Random 클래스에 제공됩니다.

```
Random random = new Random(1000);
```

이것을 사용해서 서로 5개의 난수를 생성하면 어떻게 되는지 봅시다.

```
Random random = new Random(1000);
for(int i = 0; i < 5; i++)
    Console.WriteLine("A random number between 1 and 100: " + random.Next(1, 101));
```

이 코드를 몇 번이나 실행해도 얻을 수 있는 5 개의 "난수"숫자는 다음과 같을 것이라고 확신합니다.

```
A random number between 1 and 100: 16
A random number between 1 and 100: 24
A random number between 1 and 100: 76
A random number between 1 and 100: 1
A random number between 1 and 100: 70
```

보시다시피 Random 클래스에 의해 생성된 임의 값은 결국 그렇게 무작위가 아닙니다. 대신 시드 값을 사용해서 의사 랜덤 값을 만듭니다. 따라서 귀하가 시드를 공급하지 않으면 프레임워크가 귀하를 위해 시드를 생성합니다. 원래 .NET 프레임워크에서는 현재 시간이 사용되는 반면, 최신 .NET Core 프레임워크는 스레드 정적 의사 난수 생성기를 사용해서 시드를 생성합니다. 즉, 제어된 임의성이 필요하지 않은 한 첫 번째 예제에서 사용된 것처럼 Random 클래스의 기본 생성자를 고수할 수 있습니다.

### 요약
Random 클래스를 사용해서 난수를 생성하지만 예측 가능한 무작위가 아니라면 임의의 시드를 사용해야 합니다.

또한 Random 클래스를 인스턴스화하는 것은 다소 비용이 많이 들기 때문에 루프 내에서 여러 번 수행하지 말고 대신 단일 Random 인스턴스를 인스턴스화하고 Next() 메서드를 필요한 만큼 호출하십시오.

마지막으로 이미 논의했듯이 Random 클래스는 의사 랜덤 생성기입니다. 암호화 및/또는 임의 암호 생성과 같이 더 안전한 것이 필요한 경우 RNGCryptoServiceProvider 클래스를 사용할 수 있습니다.





## Starting applications with the Process class
응용 프로그램에서 처리할 수 있는 매우 유용한 작업은 다른 응용 프로그램을 시작하는 것입니다. 예를 들어, 애플리케이션에 웹 사이트에 대한 링크를 포함하고 사용자가 브라우저에 수동으로 입력하거나 URL을 복사/붙여넣도록 강요하는 대신 링크를 클릭 가능하게 만든 다음 사용자의 기본 브라우저에서 열도록 하는 것이 좋습니다.

이 튜토리얼에서는 콘솔 응용 프로그램이 너무 복잡하지 않고 언어 구문을 더 잘 보여줄 수 있기 때문에 주로 콘솔 응용 프로그램을 사용합니다. 위의 예제는 WinForms 또는 WPF 같은 .NET GUI 프레임워크 중 하나를 사용하는 GUI 기반 응용 프로그램과 관련이 많지만 콘솔 응용 프로그램에서 다른 응용 프로그램을 시작하는 것이 여전히 유용할 수 있으며, 그렇지 않더라도 최소한 기술은 배웠을 것입니다.


### Process 클래스 사용
다른 응용 프로그램을 인스턴스화하려면 Process 클래스를 사용할 수 있습니다. Process 클래스는 System.Diagnostics 네임스페이스에 포함되어 있으므로 포함해야 합니다.

```
using System.Diagnostics;
```

가장 기본적인 형태는 정적 Start() 메서드를 사용해서 응용 프로그램을 시작할 수 있습니다.

```
Process.Start("https://www.google.com/");
```

URL을 제공한다는 사실을 알 수 있습니다. 다음과 같이 로컬 응용 프로그램(예: 메모장에 대한 경로일 수 있습니다.

```
Process.Start(@"C:\Windows\notepad.exe");
```

두 가지 모두 작동하는 이유는 Process 클래스가 기본적으로 "run this!" 라고 말하면서 운영 체제에게 명령을 전달하기 때문입니다. 그런 다음 운영 체제는 제공된 정보를 검사하고 지원되는 작업이 있는지 확인합니다. 실행 파일에 대한 경로가 제공되면 시작됩니다 - 만약 다른 것이 제공되면 (예 : URL 또는 일종의 로컬 파일에 대한 경로) 관련 응용 프로그램으로 처리하려고 시도합니다. 이것은 또한 프로그램에 로컬 폴더에 대한 경로를 실행하도록 지시할 수 있음을 의미합니다 - Windows를 사용하는 경우 Windows 파일 탐색기가 시작되면서 요청한 경로를 표시합니다.

#### 인수/매개변수를 사용해서 애플리케이션 시작
응용 프로그램을 시작할 때 하나 이상의 인수/매개 변수를 제공하는 것이 유용한 경우가 많습니다. 콘솔 응용 프로그램은 일반적으로 다양한 매개 변수를 사용하지만 Windows 응용 프로그램도 일반적으로 명령줄을 통해서 제공되는 **매개 변수를 처리** 할 수 있습니다. 예를 들어, 메모장을 시작하면서 편집할 파일을 함께 제공할 수 있습니다.

```
Process.Start(@"C:\Windows\notepad.exe", @"C:\Windows\win.ini");
```

이것은 메모장이 매개 변수에 대한 명령줄을 지원하도록 설계되었기 때문에 제대로 작동합니다 - 매개 변수를 제공한 경우 첫 번째 매개 변수를 오픈할 파일 경로로 사용합니다. win.ini 경로를 자신의 파일 중 하나의 경로로 쉽게 바꿔서 테스트할 수 있습니다!


### ProcessStartInfo 클래스 사용
Process 클래스는 응용 프로그램을 시작하는 것보다 훨씬 더 많은 작업을 수행할 수 있는 매우 복잡한 클래스입니다. 이 섹션에서는 새로운 프로세스를 시작하는 기능에만 중점을 두지 않겠습니다. 그렇게 처리할 때는 때때로 수행 방법을 좀 더 자세히 제어해야하며 바로 ProcessStartInfo 클래스가 작동하는 곳입니다. Start() 메서드에 경로를 제공하는 대신 다음과 같이 ProcessStartInfo 클래스의 인스턴스를 전달할 수 있습니다.

```
ProcessStartInfo processStartInfo = new ProcessStartInfo();
processStartInfo.FileName = @"C:\Windows\notepad.exe";
processStartInfo.Arguments = @"C:\Windows\win.ini";

Process.Start(processStartInfo);
```

이것은 단순히 지금까지 실행한 작업을 동일하게 수행하므로 위의 예제에서 사용한 Filename 및 Arguments 속성 외에 ProcessStartInfo 클래스의 몇 가지 흥미로운 속성을 살펴보겠습니다.


#### 창 스타일
WindowStyle 속성을 사용해서 시작할 응용 프로그램의 창이 화면에 표시되는 방식을 제어합니다. 예를 들어 다음과 같이 최대화 또는 최소화로 시작할 수 있습니다.

```
processStartInfo.WindowStyle = ProcessWindowStyle.Minimized;
```


#### 창 만들기 없음
CreateNoWindow 속성은 이름이 의미하는 바를 정확히 수행합니다. true 로 설정하면 시작 중인 애플리케이션에 대한 창이 생성되지 않습니다. 물론 이것은 사용자의 상호 작용 없이 작업을 수행할 수 있는 응용 프로그램에만 관련이 있습니다. (예 : 콘솔 응용 프로그램이 입력을 받아서 무언가를 수행하고 결과를 호출 응용 프로그램에 다시 반환할 경우)


#### 셸 실행 사용
UseShellExecute 속성을 사용하면 시스템 셸을 사용해서 프로세스를 시작할지 여부를 제어할 수 있습니다. 그렇지 않으면 프로세스는 실행 파일에서 직접 생성합니다. 이 속성은 .NET Core 이전의 .NET Framework 로 작업할 경우 기본적으로 true 지만 .NET Core 를 사용할 경우 기본적으로 false 입니다. 나중에 확장된 예제에서 이 속성을 사용할 것입니다.

#### 워킹디렉토리
WorkingDirectory 속성을 사용해서 작업을 실행할 디렉터리 경로를 설정합니다. 그러나 UseShellExecute 가 true 로 설정되어 있는지 false 로 설정된지에 따라 다르게 사용된다는 점에 유의하시기 바랍니다. UseShellExecute가 true 로 설정되면 WorkingDirectory 속성은 단순히 실행 파일의 위치를 지정하고 실행 파일을 시작하는 애플리케이션의 작업 디렉터리는 실행 파일의 작업 디렉터리로 설정합니다. UseShellExecute 가 false 로 설정되면 WorkingDirectory 속성은 실행 파일을 찾는 데 사용하지 않고 대신 해당 값을 시작한 프로세스에 적용하며 새로운 프로세스의 컨텍스트 내에서만 의미가 있습니다.

```
RedirectStandardInput, RedirectStandardOutput 및 RedirectStandardError
```

이 속성을 true 로 설정하면 실행된 프로세스에서 호출한 프로세스로 입력/출력 및 오류를 리디렉션할 수 있습니다. 예를 들어 CreateNoWindow 속성과 함께 사용하면 프로세스를 시작하고 입력을 제공하거나 오류 및 출력까지 받을 수 있기 때문에 유용합니다. 


### 종합 예제
논의할 속성이 조금 더 있지만 지금까지 설명한 속성이 가장 흥미롭습니다. 대신 방금 논의한 몇 가지 기술을 모두 결합한 예제를 보여 드리겠습니다. 먼저 전체 예제 코드를 제공한 다음 이에 대해 논의하겠습니다.

```
Console.WriteLine("Press any key to run CMD...");
Console.ReadKey();

ProcessStartInfo processStartInfo = new ProcessStartInfo();
processStartInfo.FileName = @"C:\Windows\system32\cmd.exe";
processStartInfo.Arguments = "/c date /t";

processStartInfo.CreateNoWindow = true;
processStartInfo.UseShellExecute = false;            
processStartInfo.RedirectStandardOutput = true;

Process process = new Process();
process.StartInfo = processStartInfo;
process.Start();

string output = process.StandardOutput.ReadToEnd();
process.WaitForExit();

Console.WriteLine("Current date (received from CMD):");
Console.Write(output);
```

먼저 ProcessStartInfo 개체를 만듭니다. 파일 이름 및 인수 속성을 사용해서 cmd.exe (기본 Windows 명령줄 인터프리터) 파일을 사용해서 프로그램을 실행하도록 지정합니다. 실행할 명령은 인수로 지정합니다 - 이 경우 `/t` 인수와 함께 date 명령을 사용하며 단순히 현재 날짜를 출력합니다.

또한 방금 논의한 세 가지 속성을 사용한다는 것도 알 수 있습니다: CreateNoWindow = true (cmd 창을 화면에 표시하지 않고 출력을 캡쳐함), UseShellExecute = false (이러한 유형의 명령을 실행할 수 있으려면 이와 같이 설정함) 및 RedirectStandardOutput = false (출력 결과를 캡처함)

다음으로 Process 인스턴스를 만들고 StartInfo 를 할당한 다음 Start() 메서드를 호출해서 프로세스를 시작합니다.

다음 두 줄에는 Process.StandardOutput.ReadToEnd() 메서드를 호출해서 생성된 출력을 수신하도록 요청합니다. 이것을 문자열 변수에 저장한 다음 WaitForExit() 메서드를 호출해서 시작한 프로세스가 완료되도록 대기합니다.

마지막 두 줄에는 수신한 출력을 간단히 출력하면 현재 날짜가 출력됩니다. 분명히 현재 날짜를 출력하는 데 많은 작업이 필요했습니다 - 한 줄의 코드로 처리할 수 있었습니다. 그러나 다른 응용 프로그램을 호출하고 자신만의 응용 프로그램에서 해당 작업을 사용할 수 있는 매우 강력한 기술을 보여줍니다.


### 요약
Process 클래스는 매우 강력한 도구로, 다른 프로세스를 시작하거나 제어할 수 있습니다. 이 섹션에서는 많은 기능 중 일부만 시연했지만 그것이 얼마나 다재다능한 도구인지 보여주었기를 바라며 계속해서 보다 많은 실험을 할 수 있기를 바랍니다.



---



# Debugging

## Introduction to debugging
가장 기본적인 "Hello world!" 예제를 지나치면 코드를 실행하는 것만으로는 무슨 일이 일어나고 있는지 파악할 수 없는 복잡성 수준에 도달하게 됩니다. 필요한 것은 응용 프로그램이 실행되는 동안 응용 프로그램의 가상 후드를 열고 무슨 일이 일어나고 있는지 볼 수있는 흑마술입니다. 디버깅은 마법의 도구이며, 가장 기본적인 단계를 배우자마자 디버깅 없이 어떻게 살았는지 궁금해할 것입니다. 이 도구 없이는 복잡한 코드의 버그를 수정하는 것이 거의 불가능하기 때문에 모든 훌륭한 프로그래머가 이해해야 하는 도구입니다.

고급 프로그래머도 여전히 사용하고 있는 가장 기본적인 유형의 디버깅은 때때로 "인쇄 디버깅"이라고 불립니다. - 응용 프로그램이 어딘가에 텍스트 조각이나 숫자를 인쇄하도록 해서 코드의 어느 부분에 도달했는지, 변수에 무엇이 포함되어 있는지 확인할 수 있는 간단한 절차입니다. C#에서는 Console.Write() 메서드를 사용해서 변수의 내용이나 간단한 상태 메시지를 출력해서 콘솔에 인쇄할 수 있습니다. 어떤 상황에서는 충분할 수 있지만 Visual Studio 또는 Express 버전 중 하나와 같은 멋진 IDE를 사용하는 경우 훨씬 더 강력한 도구를 마음대로 사용할 수 있으며 가장 기본적인 원칙을 배우면 사용하기 쉽습니다. 다음 몇 장에서는 IDE의 디버깅 가능성을 안내하고 그 후에는 훨씬 더 강력한 프로그래머가 될 것입니다.





## Breakpoints
디버깅에 대해 가장 먼저 알아야 할 것은 중단점입니다. 그것은 실제로 이름에서 알 수 있듯이 실행이 중단되는 코드의 지점을 표시합니다 (아니요, 실제로 코드를 중단하지는 않습니다. 걱정하지 마십시오). Visual Studio 또는 Express 버전 중 하나에 중단점을 배치하는 것은 코드 왼쪽에 있는 회색 여백을 마우스 왼쪽 버튼으로 클릭하는 것만큼 간단합니다. 클릭하면 반짝이는 빨간색 원이 보상으로 표시됩니다 - 이 원은 응용 프로그램을 실행할 때 디버거가 중지되는 위치를 표시합니다. 자신을 살펴보는 것이 좋으며 효과를 확인하기 위해 다음 코드를 사용합니다.

```
namespace DebugTest
{
    class Program
    {
    static void Main(string[] args)
    {
        int a = 5, b = 8, c = 233;
        int d = a + c - b;
        Console.WriteLine(d);
    }
    }
}
```

이제 코드를 보는 것만으로도 결과를 예측할 수 있습니까? 아마도, 그렇지 않다면 오래된 계산기를 꺼내 계산을 할 수 있지만 그것은 실제로 요점이 아닙니다. 코드의 양이 훨씬 더 크다고 상상하고 디버깅해 봅시다! 왼쪽 여백을 클릭해서 중단점을 배치하면 IDE가 이제 다음과 같이 표시됩니다.



![](./images/img_20250726_213807.jpg)


자, 첫 번째 디버깅 세션을 시작할 준비가 되었습니다. 중단점을 배치하자마자 메뉴, 도구 모음 또는 F5 키를 눌러 평소와 같이 응용 프로그램을 실행할 수 있습니다. 이제 응용 프로그램이 평소와 같이 실행되지만 중단점이 있는 줄에 도달하자마자 해당 줄이 실행되기 직전에 실행이 중지됩니다. 이 경우 변수 a, b 및 c에는 값이 있지만 중단점이 있는 줄이 평가되기 전에 설정되지 않기 때문에 d는 기본값(정수의 경우 0)만 갖는다는 것을 의미합니다. 이제 멋진 부분이 왔습니다 - 다른 변수 위로 마우스를 가져 가십시오 - IDE가 무엇이 포함되어 있는지 알려줍니다. 언급했듯이 d 변수는 기본값을 갖지만 실행을 진행해서 변경해 보겠습니다. 다음 장에서는 코드가 실행되는 동안 코드를 탐색하는 방법을 보여 드리겠습니다.





## Stepping through the code
이 장에서는 디버깅의 또 다른 매우 필수적인 부분인 코드를 단계별로 실행하는 방법을 살펴보겠습니다. 이를 위해 이 간단한 응용 프로그램을 작성했습니다.

```
namespace DebugTest
{
    class Program
    {
        static void Main(string[] args)
        {
            int a = 5;
            a = a * 2;
            a = a - 3;
            a = a * 6;
            Console.WriteLine(a);
        }
    }
}
```

변수 "a"를 몇 번 조작하고 최종 결과를 출력합니다. 이전 장에서 설명한 대로 a가 사용되는(그리고 선언된) 첫 번째 줄에 중단점을 배치해 보십시오. 이제 응용 프로그램을 실행합니다. 실행이 중지되고 이전 장에서 배운 내용이 실제로 사실인지 확인하기 위해 a 위에 마우스를 올려놓을 수 있습니다. 값을 할당하는 코드(이 경우 5)가 아직 실행되지 않았기 때문에 변수에는 기본값만 포함되어 있지만 변경해 보겠습니다. 디버그 메뉴에서 "한 단계씩" 옵션을 선택하거나 키보드 단축키 F10을 사용하는 것이 좋습니다. 이제 실행이 다음 관련 줄로 진행되고 a 변수 위로 마우스를 가져가면 이제 값이 있는 것을 볼 수 있습니다. 다시 시도하면 끝에 도달할 때까지 실행되는 줄에 따라 값이 변경되는 것을 볼 수 있습니다.

자, 그것은 매우 기본적이었지만 더 복잡한 코드를 작성하기 시작하면 깨닫게 될 것처럼 매우 유용합니다. 이 예에서는 단일 함수 내에 머물렀기 때문에 코드의 흐름이 매우 간단했지만 코드가 여러 클래스 및/또는 함수에 걸쳐 퍼지기 시작하면 어떻게 될까요? 이 예제를 시도하십시오.

```
namespace DebugTest
{
    class Program
    {
        static void Main(string[] args)
        {
            int a = 5;
            int b = 2;
            int result = MakeComplicatedCalculation(a, b);
            Console.WriteLine(result);
        }

        static int MakeComplicatedCalculation(int a, int b)
        {
            return a * b;
        }
    }
}
```

Main 메서드의 첫 번째 줄에 중단점을 배치하고 응용 프로그램을 실행합니다. 이제 "스텝 오버" 기능을 사용해서 각 줄을 단계별로 실행합니다. 보시다시피 예고 없이 함수 호출 위로 이동합니다 - 이것이 단순히 디버깅이 작동하는 방식입니다. 이제 처음부터 다시 시도하고 MakeComplicatedCalculation() 호출이 있는 줄로 이동한 후 디버그 -> 한 단계씩 실행을 선택하거나 바로 가기 키 F11을 사용합니다. 이제 디버거는 가능한 첫 번째 함수 호출을 단계별로 실행하므로 해당 함수도 단계별로 실행할 수 있습니다. 상상할 수 있듯이 이를 통해 관심 있는 함수 호출만 입력하면서 복잡한 코드 블록을 단계별로 실행할 수 있습니다.

함수로 한 단계씩 실행한 다음 이전 컨텍스트로 돌아가고 싶다는 것을 알게 되면 디버그 메뉴에서 "한 단계씩 실행"이라는 매우 논리적으로 명명된 옵션을 사용합니다(바로 가기 키는 Shift+F11). 이렇게 하면 이전 컨텍스트로 돌아가게 되며, 이는 원하는 만큼 함수 호출을 한 단계씩 실행한 다음 step out 옵션을 사용해서 다시 돌아가는 길을 찾을 수 있음을 의미합니다.





## The tool windows
Visual Studio에서 디버깅할 때 화면 아래쪽의 도구 창이 변경되고 새 창이 표시됩니다(해제하지 않은 경우). 창은 "Locals", "Watch", "Call stack" 및 "Immediate window"의 줄을 따라 호출되며 모두 디버깅 환경과 관련이 있습니다. 이 장에서는 그들 각각을 살펴보고 그들이 당신을 위해 무엇을 할 수 있는지 보여줄 것입니다.

### 지역
이 창은 그 중 가장 간단합니다. 중단점에 도달하면 모든 지역 변수가 여기에 나열되어 해당 이름, 유형 및 값에 대한 빠른 개요를 얻을 수 있습니다. 그리드를 마우스 오른쪽 버튼으로 클릭하고 "값 편집"을 선택해서 변수에 새 값을 부여할 수도 있습니다. 이를 통해 현재 조건이 아닌 다른 조건에서 코드를 테스트할 수 있습니다.

### 시계
Watch 창은 Locals 창과 약간 비슷하지만, 여기에서만 어떤 변수를 추적할지 결정할 수 있습니다. 코드 창이나 지역 창에서 변수를 드래그하거나 마지막 빈 줄에 이름을 작성해서 감시할 변수를 추가할 수 있습니다. 변수는 다시 제거할 때까지 감시 창에 유지되지만 현재 범위 내에서 디버깅할 때만 업데이트됩니다. 예를 들어 함수 A의 변수는 함수 B를 단계별로 실행할 때 업데이트되지 않습니다. 로컬 창과 마찬가지로 감시 변수를 마우스 오른쪽 버튼으로 클릭하고 "값 편집"을 선택해서 변수의 현재 값을 변경할 수 있습니다.

### 호출 스택
호출 스택 창에는 호출된 함수의 현재 계층 구조가 표시됩니다. 예를 들어 함수 A가 함수 B를 호출하고 함수 C를 호출한 다음 함수 D를 호출하면 호출 스택 창에 표시되고 각 함수 선언으로 이동할 수 있습니다. 각 함수에 전달된 매개변수도 확인할 수 있습니다. 지금까지 작업한 간단한 예제에서는 어떤 함수가 어떤 함수를 호출하는지 추적하는 것이 사소하기 때문에 무의미해 보일 수 있지만 코드가 더 높은 수준의 복잡성에 도달하고 클래스의 함수가 다른 클래스의 함수를 호출하는 즉시 호출 스택은 실제 생명의 은인이 될 수 있습니다.

### 즉시 창
즉시 실행 창은 아마도 그 중 가장 유용할 것입니다. 이를 통해 디버거의 현재 컨텍스트에서 사용자 정의 코드 줄을 실행할 수 있습니다. 이를 통해 변수를 확인하거나 값을 변경하거나 단순히 코드 줄을 테스트할 수 있습니다. 창에 입력하고 Enter 키를 누르기만 하면 줄이 실행됩니다. 변수 이름을 입력하면 해당 값이 인쇄됩니다. a = 5를 작성해서 변수 값을 설정합니다. 결과가 있는 경우 인쇄되고 변경 사항은 코드 실행을 계속할 때 반영됩니다. 즉시 실행 창은 코드를 입력하고 결과를 즉시 볼 수 있는 C# 터미널과 같습니다. 나는 내가 그렇다는 것을 알고 있습니다.





## Advanced breakpoints
이전 장에서 첫 번째 중단점을 설정했는데 좋았습니다. 그러나 적어도 Visual Studio를 사용하는 경우 실제로 중단 점에는 그보다 더 많은 것이 있습니다. 불행히도 Microsoft는 일부 Express 버전에서 이러한 추가 디버깅 기능을 비활성화 한 것 같지만 걱정하지 마십시오. 그러나 Visual Studio에 액세스할 수 있는 사용자를 위해 가장 흥미로운 중단점 관련 기능은 다음과 같습니다. 중단점을 설정하고 마우스 오른쪽 버튼을 클릭한 다음 원하는 기능을 선택하면 액세스할 수 있습니다.

### 조건
이 옵션을 사용하면 중단점에 적중하기 위해 true이거나 변경되어야 하는 조건을 지정할 수 있습니다. 이것은 특정 상황에서만 실행을 중지하려는 고급 코드를 처리할 때 정말 유용할 수 있습니다. 예를 들어, 관련 코드에 도달하기 전에 많은 시간을 반복하는 루프가 있을 수 있습니다 - 이와 같은 상황에서는 중단점을 배치한 다음 적절한 조건을 구성할 수 있습니다. 다음은 작동 방식을 보여주는 다소 지루한 예입니다.

```
static void Main(string[] args)
{
    for(int i = 0; i < 10; i++)
        Console.WriteLine("i is " + i);
}
```

콘솔에 출력하는 줄에 중단점을 설정합니다. 이제 응용 프로그램을 실행하십시오 - 루프가 반복될 때마다 중단점이 트리거됩니다. 그러나 아마도 그것은 우리가 원하는 것이 아닐 것입니다. 어쩌면 우리는 i가 4(5번째 반복)와 같을 때만 적중되기를 원할 수도 있습니다. 다음과 같은 간단한 조건을 정의해서 이를 수행합니다.

```
나 == 4
```

중단 점은 이제 내부에 약간의 흰색 더하기 가지고, 응용 프로그램을 실행할 때 i 변수가 4 일 때만 끊어집니다. "변경됨" 옵션을 사용해서 위 문의 결과가 변경된 경우(예: false에서 true로) 실행을 중지하도록 디버거에 지시할 수도 있습니다.

### 적중 횟수
이 대화 상자를 사용하면 중단점에 적중된 횟수에 따라 대체 조건을 정의할 수 있습니다. 예를 들어, 중단점이 특정 횟수에 도달할 때까지 실행을 중지하지 않도록 결정할 수 있습니다. 필요한 사항에 따라 이를 제어하는 다양한 옵션이 있으며, 디버그 시간 동안 이 대화 상자를 확인해서 지금까지 중단점에 도달한 횟수를 확인할 수 있습니다.

### 맞았을 때...
이 대화 상자를 사용해서 중단점에 적중될 때의 대체 동작을 정의할 수 있습니다. 이것은 실행을 중지하지 않고 단순히 상태 메시지를 인쇄하거나 매크로를 활성화하는 것을 원하지 않는 많은 상황에서 유용할 수 있습니다. 이를 통해 실행에 대한 모든 종류의 정보를 포함할 수 있는 인쇄될 사용자 지정 메시지를 정의할 수 있습니다. 고급 사용자의 경우 중단점에 도달했을 때 특정 매크로를 실행하는 옵션도 유용합니다.



---





# Advanced topics

## Enumerations
열거형은 모두 숫자 집합(일반적으로 정수)에 매핑되는 명명된 값의 특수 집합입니다. 상수 값 집합 중에서 선택할 수 있기를 원할 때 유용하며 숫자와 관련된 각 가능한 값을 사용해서 다양한 상황에서 사용할 수 있습니다. 이 예제에서 볼 수 있듯이 열거형은 네임스페이스 내부의 클래스 위에 정의됩니다. 즉, 동일한 네임스페이스 내의 모든 클래스의 열거형을 사용할 수 있습니다.

다음은 모든 내용을 보여주는 간단한 열거형의 예입니다.

```
public enum Days { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday }
```

이러한 가능한 값은 모두 숫자에 해당합니다. 구체적으로 설정하지 않으면 첫 번째 값은 0이고 다음 값은 1과 같습니다. 다음 코드 조각은 이를 증명하고 열거형에서 가능한 값 중 하나를 사용하는 방법을 보여줍니다.

```
using System;

namespace ConsoleApplication1
{
    public enum Days { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday }

    class Program
    {
        static void Main(string[] args)
        {
            Days day = Days.Monday;
            Console.WriteLine((int)day);
            Console.ReadLine();
        }
    }
}
```

월요일 값이 숫자 0에 직접 매핑되므로 출력은 0이 됩니다. 분명히 우리는 그것을 변경할 수 있습니다 - 줄을 다음과 같이 변경하십시오.

```
public enum Days { Monday = 1, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday }
```

코드를 다시 실행하면 월요일이 0이 아닌 1과 같은 것을 볼 수 있습니다. 다른 모든 값은 결과뿐만 아니라 한 숫자 더 높습니다. 다른 값에도 다른 숫자를 할당할 수 있습니다. 숫자에 대한 직접 매핑으로 인해 숫자를 사용해서 다음과 같이 열거형에서 해당 값을 가져올 수도 있습니다.

```
Days day = (Days)5;
Console.WriteLine(day);
Console.ReadLine();
```

열거형의 또 다른 멋진 기능은 값의 문자열 표현도 첨부할 수 있다는 사실입니다. 위의 예제를 다음과 같이 변경하십시오.

```
static void Main(string[] args)
{
    string[] values = Enum.GetNames(typeof(Days));
    foreach(string s in values)
        Console.WriteLine(s);
    
    Console.ReadLine();
}
```

Enum 클래스에는 열거형 작업에 유용한 메서드가 많이 포함되어 있습니다.





## Exception handling
모든 프로그램에서 때때로 문제가 발생합니다. C#을 사용하면 가장 일반적인 실수를 방지하는 데 도움이 되는 우수한 컴파일러가 있습니다. 분명히 발생할 수있는 모든 오류를 볼 수는 없으며 이러한 경우 .NET 프레임워크는 예외를 발생시켜 문제가 발생했음을 알려줍니다. 배열에 대한 이전 장에서 너무 많은 항목을 배열에 채우려고 할 경우 예외가 발생하는 방법을 설명했습니다. 예를 들어 보겠습니다.

```
using System;
using System.Collections;

namespace ConsoleApplication1
{
    class Program
    {
    static void Main(string[] args)
    {
        int[] numbers = new int[2];

        numbers[0] = 23;
        numbers[1] = 32;
        numbers[2] = 42;

        foreach(int i in numbers)
        Console.WriteLine(i);
        Console.ReadLine();
    }
    }
}
```

좋아, 이 예제를 실행해 보면 내가 말하는 것을 알 수 있을 것입니다. 우리가 뭘 잘못하고 있는지 아시나요? 우리는 2개의 항목을 위한 공간이 있는 정수 배열을 정의했지만 그 안에 3개의 공백을 사용하려고 합니다. 분명히 이로 인해 오류가 발생하며, 이 예제를 실행하려고 하면 표시됩니다. Visual Studio 내에서 실행할 때 IDE는 예외에 대한 몇 가지 옵션을 제공하지만 EXE 파일을 두 번 클릭해서 프로그램을 실행하려고 하면 불쾌한 오류가 발생합니다. 오류가 발생할 수 있다는 것을 알고 있다면 이를 처리해야 합니다. 여기에서 예외가 사용됩니다. 다음은 위의 코드의 약간 수정된 버전입니다.

```
int[] numbers = new int[2];
try
{
    numbers[0] = 23;
    numbers[1] = 32;
    numbers[2] = 42;

    foreach(int i in numbers)
    Console.WriteLine(i);
}
catch
{
    Console.WriteLine("Something went wrong!");
}
Console.ReadLine();
```

오류 처리와 관련해서 새로운 가장 친한 친구인 시도를 소개하겠습니다.. catch 블록. 지금 프로그램을 실행해 보고 차이점을 확인하십시오 - Visual Studio / Windows가 심각한 문제가 발생했다고 말하는 대신 우리 자신의 이야기를 들려줍니다. 하지만 무엇이 잘못되었는지 알 수 있다면 좋지 않을까요? 문제 없어요:

```
catch(Exception ex)
{
    Console.WriteLine("An error occured: " + ex.Message);
}
```

보시다시피 catch 문에 무언가를 추가했습니다. 이제 어떤 예외를 포착할 것인지, 이 경우 모든 예외의 기본인 Exception을 알려줍니다. 이렇게 하면 예외를 일으킨 문제에 대한 몇 가지 정보를 얻을 수 있으며 Message 속성을 출력해서 문제에 대한 이해하기 쉬운 설명을 얻을 수 있습니다.

내가 말했듯이 예외는 가장 일반적인 유형의 예외입니다. 예외 처리 규칙은 항상 가장 일반적인 유형의 예외를 사용해야 한다고 말하며, 이 경우 실제로 코드에서 생성된 정확한 유형의 예외를 알고 있습니다. 어떻게? Visual Studio가 우리가 처리하지 않았을 때 알려주었기 때문입니다. 확실하지 않은 경우 문서는 일반적으로 메서드가 throw할 수 있는 예외를 설명합니다. 알아내는 또 다른 방법은 Exception 클래스를 사용해서 출력 줄을 다음과 같이 변경하는 것입니다.

```
Console.WriteLine("An error occured: " + ex.GetType().ToString());
```

결과는 예상대로 IndexOutOfRangeException입니다. 따라서 이 예외를 처리해야 하지만 둘 이상의 예외를 처리하는 것을 막을 수 있는 것은 없습니다. 어떤 상황에서는 어떤 예외가 발생했는지에 따라 다른 작업을 수행하려고 할 수도 있습니다. catch 블록을 다음과 같이 변경하기만 하면 됩니다.

```
catch(IndexOutOfRangeException ex)
{
    Console.WriteLine("An index was out of range!");
}
catch(Exception ex)
{
    Console.WriteLine("Some sort of error occured: " + ex.Message);
}
```

보시다시피 먼저 IndexOutOfRangeException을 찾습니다. 반대로 하면 모든 예외가 파생되기 때문에 Exception 클래스가 있는 catch 블록이 이를 가져옵니다. 즉, 가장 구체적인 예외를 먼저 사용해야 합니다.

예외와 관련해서 알아야 할 한 가지 사항은 finally 블록입니다. finally 블록은 필요에 따라 catch 블록 집합에 추가하거나 독점적으로 사용할 수 있습니다. finally 블록 내의 코드는 항상 예외 또는 예외 없음으로 실행됩니다. 파일 참조를 닫거나 더 이상 필요하지 않은 개체를 삭제해야 하는 경우 좋은 위치입니다. 지금까지 예제가 매우 간단했기 때문에 가비지 수집기가 처리하기 때문에 정리가 필요하지 않았습니다. 그러나 finally 블록이 필요한 상황에 직면할 가능성이 높기 때문에 예제의 확장 버전은 다음과 같습니다.

```
int[] numbers = new int[2];
try
{
    numbers[0] = 23;
    numbers[1] = 32;
    numbers[2] = 42;

    foreach(int i in numbers)
    Console.WriteLine(i);
}
catch(IndexOutOfRangeException ex)
{
    Console.WriteLine("An index was out of range!");
}
catch(Exception ex)
{
    Console.WriteLine("Some sort of error occured: " + ex.Message);
}
finally
{
    Console.WriteLine("It's the end of our try block. Time to clean up!");
}
Console.ReadLine();
```

코드를 실행하면 첫 번째 예외 블록과 finally 블록이 모두 실행되는 것을 볼 수 있습니다. 배열에 숫자 42를 추가하는 줄을 제거하면 finally 블록에만 도달하는 것을 볼 수 있습니다.

예외에 대해 알아야 할 또 다른 중요한 부분은 예외가 발생하는 메서드에 미치는 영향입니다. 처리되지 않은 모든 예외가 애플리케이션에 치명적인 것은 아니지만, 그렇지 않은 경우 메서드의 나머지 코드가 실행될 것으로 예상해서는 안 됩니다. 반면에 예외를 처리하면 try 블록 뒤의 줄만 실행됩니다. 이 예에서 배열 값을 출력하는 루프는 예외가 발생하면 try 블록이 catch/finally 블록으로 바로 이동하기 때문에 도달하지 않습니다. 그러나 응용 프로그램이 즉시 종료되지 않도록 콘솔에서 읽는 마지막 줄에 도달합니다. try 블록을 구성할 때 항상 이 점을 염두에 두어야 합니다.





## Structs
C# 구조체는 클래스에 대한 경량 대안입니다. 클래스와 거의 동일하게 할 수 있지만 클래스가 아닌 구조체를 사용하는 것이 "비용이 적습니다". 그 이유는 약간 기술적이지만 요약하자면 클래스의 새 인스턴스가 힙에 배치되고 새로 인스턴스화된 구조체가 스택에 배치됩니다. 또한 클래스와 같이 구조체에 대한 참조를 처리하는 것이 아니라 구조체 인스턴스로 직접 작업합니다. 이것은 또한 구조체를 함수에 전달할 때 참조가 아닌 값으로 전달된다는 것을 의미합니다. 이에 대한 자세한 내용은 함수 매개변수에 대한 장에 있습니다.

따라서 더 간단한 데이터 구조를 나타내고 싶을 때, 특히 많은 데이터 구조를 인스턴스화할 것이라는 것을 알고 있는 경우 구조체를 사용해야 합니다. .NET 프레임워크에는 Microsoft가 클래스 대신 구조체(예: Point, Rectangle 및 Color 구조체)를 사용한 많은 예제가 있습니다.

먼저 구조체를 사용하는 예를 보여 드린 다음 클래스 대신 구조체를 사용할 때의 몇 가지 제한 사항에 대해 논의하겠습니다.

```
class Program
{
    static void Main(string[] args)
    {
        Car car;

        car = new Car("Blue");
        Console.WriteLine(car.Describe());

        car = new Car("Red");
        Console.WriteLine(car.Describe());

        Console.ReadKey();
    }
}

struct Car
{
    private string color;

    public Car(string color)
    {
        this.color = color;
    }

    public string Describe()
    {
        return "This car is " + Color;
    }

    public string Color
    {
        get { return color; }
        set { color = value; }
    }
}
```

관찰력이 뛰어난 독자는 이것이 클래스에서 구조체로의 변경 외에 클래스 소개에서 사용된 것과 정확히 동일한 예제 코드임을 알 수 있습니다. 이것은 두 개념이 얼마나 유사한지 보여줍니다. 그러나 이 장의 시작 부분에서 언급한 기술적 세부 사항 외에 어떻게 다릅니까?

우선, 필드에는 이니셜라이저가 있을 수 없으므로 다음과 같이 멤버를 선언할 수 없습니다.

```
private string color = "Blue";
```

생성자를 선언하는 경우 생성자를 종료하기 전에 모든 필드를 할당해야 합니다. 구조체에는 기본 생성자가 함께 제공되지만 자신의 생성자를 정의하기로 선택하는 즉시 모든 필드를 초기화하는 데 동의합니다. 이는 또한 자신의 paramaterless 생성자를 선언할 수 없음을 의미합니다 - 모든 구조체 생성자는 적어도 하나의 매개 변수를 가져와야합니다. 위의 예에서 우리는 실제로 색상 필드에 값을 할당했습니다. 우리가 그렇게 하지 않았다면 컴파일러는 불평할 것입니다.

구조체는 다른 클래스 또는 구조체에서 상속할 수 없으며 클래스는 구조체에서 상속할 수 없습니다. 구조체는 Object 클래스에서 상속되지만 상속 및 구조체는 그게 전부입니다. 하지만 인터페이스를 지원하므로 구조체가 사용자 정의 인터페이스를 구현할 수 있습니다.



---




# XML

## Introduction to XML with C#
XML은 eXtensible Markup Language의 약자입니다. 주로 인간과 기계 모두가 쉽게 읽을 수 있기 때문에 데이터 교환에 매우 널리 사용되는 형식입니다. HTML로 웹 사이트를 작성해 본 적이 있다면 XML은 기본적으로 HTML의 더 엄격한 버전이기 때문에 매우 친숙해 보일 것입니다. XML은 태그, 속성 및 값으로 구성되며 다음과 같습니다.

```
<users>
<user name="John Doe" age="42" />
<user name="Jane Doe" age="39" />
</users>
```

보시다시피 데이터 형식의 경우 실제로 읽기가 매우 쉽고 널리 사용되는 표준이기 때문에 거의 모든 프로그래밍 언어에는 이를 처리하기 위한 내장 함수 또는 클래스가 있습니다. C#은 XML의 거의 모든 측면을 처리하기 위해 전체 네임스페이스인 System.Xml 네임스페이스를 가진 그 중 하나입니다. 다음 장에서는 XML 쓰기 및 읽기 모두에 사용하는 방법을 살펴보겠습니다. 읽어보세요!





## Reading XML with the XmlReader class
C#을 사용해서 XML을 읽는 데는 주로 XmlDocument 클래스와 XmlReader 클래스의 두 가지 메서드가 있습니다. XmlDocument는 전체 XML 콘텐츠를 메모리로 읽은 다음 원하는 대로 앞뒤로 이동하거나 XPath 기술을 사용해서 문서를 쿼리할 수도 있습니다.

XmlReader는 더 빠르고 메모리 소모가 적은 대안입니다. XML 콘텐츠를 한 번에 하나의 요소씩 실행하면서 값을 확인한 다음 다음 요소로 이동할 수 있습니다. 이렇게 하면 현재 요소만 보유하기 때문에 분명히 메모리를 거의 소비하지 않으며, 값을 수동으로 확인해야 하기 때문에 관련 요소만 얻을 수 있어 매우 빠릅니다. 이 장에서는 XmlReader 클래스에 초점을 맞춘 다음 다음 장에서 XmlDocument 클래스로 이동합니다.

환율이 포함된 XML 문서를 읽는 작은 예를 들어 보겠습니다. 다행스럽게도 유럽중앙은행(ECB)은 우리가 사용할 수 있는 것을 가지고 있습니다. 다운로드해서 하드 드라이브에서 읽을 수 있지만 실제로 XmlReader 및 XmlDocument 클래스 모두 로컬 파일뿐만 아니라 원격 URL에서도 XML을 읽을 수 있습니다. 여기에서 XML ( http://www.ecb.int/stats/eurofxref/eurofxref-daily.xml )을 볼 수 있으며 여기에 몇 가지 코드와 설명이 있습니다.

```
using System;
using System.Text;
using System.Xml;

namespace ParsingXml
{
    class Program
    {
        static void Main(string[] args)
        {            
            XmlReader xmlReader = XmlReader.Create("http://www.ecb.int/stats/eurofxref/eurofxref-daily.xml");
            while(xmlReader.Read())
            {
                if((xmlReader.NodeType == XmlNodeType.Element) && (xmlReader.Name == "Cube"))
                {
                    if(xmlReader.HasAttributes)
                        Console.WriteLine(xmlReader.GetAttribute("currency") + ": " + xmlReader.GetAttribute("rate"));                    
                }
            }
            Console.ReadKey();
        }
    }
}
```

정적 Create() 메서드를 사용해서 XmlReader 인스턴스를 만드는 것으로 시작합니다. 여러 오버로드가 있지만 가장 간단한 오버로드는 파일을 가리키는 URL만 사용합니다. while 루프에서는 XmlReader 인스턴스에서 Read() 메서드를 호출합니다. 독자를 다음 요소로 진행한 다음 읽을 내용이 더 있는 한 true를 반환합니다. 루프 내에서 이제 XmlReader의 많은 속성과 메서드 중 하나를 사용해서 현재 요소의 데이터에 액세스할 수 있습니다.

우리의 경우 NodeType을 확인해서 Element(태그 부분)가 있는지, 이름이 "Cube"인지 확인합니다. 우리가 사용한 XML 문서에서 볼 수 있듯이 각 통화 환율은 Cube라는 요소 내에 있으므로 이것은 물론 우리가 찾고 있는 것입니다. 큐브 요소가 있으면 속성이 있는지 확인하기 위해 공식적인 검사를 수행한 다음(그래야 함) GetAttribute() 메서드를 사용해서 두 속성 값 "currency"와 "rate"를 읽습니다. 콘솔에 인쇄한 다음 다음 요소로 이동합니다. 결과는 통화와 현재 환율의 전체 목록이어야 합니다.


보시다시피 이것은 매우 간단하지만 주로 멋진 작업을 수행하지 않고 읽을 때와 동일한 순서로 데이터가 필요하기 때문입니다. 다음 장에서는 차이점을 볼 수 있도록 XmlDocument 클래스를 사용해서 동일한 작업을 수행합니다.


참고: 위의 코드가 실패하고 예외를 발생시킬 수 있는 여러 가지 방법이 있으므로 물론 처리해야 합니다. 자세한 내용은 예외에 대한 장을 참조하십시오.





## Reading XML with the XmlDocument class
이전 장에서 설명한 것처럼 XmlDocument는 XmlReader 접근 방식보다 메모리를 더 많이 사용하고 약간 느릴 수 있습니다. 그러나 여러 용도로 XmlDocument를 사용하면 작업하기가 더 쉬울 수 있으며 코드가 덜 필요한 경우가 많습니다. XML 콘텐츠를 읽은 후에는 XML 구조와 마찬가지로 자식 요소를 가질 수 있는 루트 요소, 자식 요소를 가질 수 있는 계층적 방식으로 데이터를 읽을 수 있습니다. 이전 장에서는 현재 환율에 대해 알려줄 수 있는 유럽 중앙 은행의 XML 데이터를 구문 분석했으며 지금도 동일한 작업을 수행하지만 대신 XmlDocument 클래스를 사용합니다.

XML은 현재 URL(http://www.ecb.int/stats/eurofxref/eurofxref-daily.xml)에서 찾을 수 있으며 필요한 데이터는 <cube> 요소에 있습니다. 트리 구조에서는 다음과 같습니다.

```
<gesmes:Envelope>
    [other child nodes]
    <Cube>
    <Cube time="2011-04-12">
        <Cube currency="USD" rate="1.4470"/>
        <Cube currency="JPY" rate="121.87"/>
        …
```
gesmes:Envelope는 DocumentElement 속성을 사용해서 액세스할 수 있는 루트 요소입니다. 그런 다음 ChildNodes 컬렉션 속성을 사용해서 이 노드의 자식에 액세스할 수 있습니다. 이 예에서는 자식 노드가 루트/문서 요소 아래의 세 수준에 있기를 원합니다. 기본적으로 이전 장의 XmlReader 기반 코드와 동일한 다음 코드를 사용해서 이 작업을 수행할 수 있습니다.

```
using System;
using System.Text;
using System.Xml;

namespace ParsingXml
{
    class Program
    {
    static void Main(string[] args)
    {
        XmlDocument xmlDoc = new XmlDocument();
        xmlDoc.Load("http://www.ecb.int/stats/eurofxref/eurofxref-daily.xml");
        foreach(XmlNode xmlNode in xmlDoc.DocumentElement.ChildNodes[2].ChildNodes[0].ChildNodes)
        Console.WriteLine(xmlNode.Attributes["currency"].Value + ": " + xmlNode.Attributes["rate"].Value);
        Console.ReadKey();
    }
    }
}
```

보시다시피 ChildNodes 계층 구조를 내려가서 큐브 노드에 액세스합니다. DocumentElement(루트 요소)에서 세 번째 자식 노드(인덱스 기반)를 요청한 다음 첫 번째 자식 노드를 요청한 다음 자식 노드의 전체 컬렉션을 요청합니다. 분명히 이것은 우리가 XML 문서의 구조를 알고 있기 때문에 가능하며 나중에 변경하기가 쉽지 않고 예쁘거나 쉽지 않습니다. 그러나 XML 문서를 탐색하는 방법은 XML 소스와 필요한 데이터에 따라 크게 달라집니다. 이 예제의 경우 위의 내용은 매우 제한된 양의 코드로도 잘 작동하지만 다른 목적으로는 가독성을 높이기 위해 조금 더 많은 코드를 사용할 수 있습니다.


환율이 있는 노드가 있으면 관심 있는 두 속성에 액세스한 다음 이전 장의 예와 같이 콘솔에 출력합니다.





## Working with the XmlNode class
이전 장에서는 XmlDocument 클래스를 사용해서 XML 파일을 구문 분석했습니다. 이 예제에는 XmlDocument를 사용해서 XML을 구문 분석하는 데 매우 필수적인 새 클래스인 XmlNode 클래스가 도입되었습니다. XML은 기본적으로 루트 요소 인 XmlNode로 구문 분석 된 다음 ChildNodes 속성을 사용해서 자식 요소에 액세스 할 수 있습니다. 그러나 XmlNode 클래스를 사용하면 태그 이름, 속성, 내부 텍스트 및 XML 자체와 같은 다른 많은 정보에도 액세스할 수 있습니다. 이 장에서는 XmlNode 클래스의 몇 가지 흥미로운 측면에 대해 간략하게 설명하며, XmlDocument 클래스를 사용해서 XML을 구문 분석할 때 XmlNode 클래스가 핵심 개념이기 때문에 알아야 할 중요한 측면입니다. 다음 예제에서는 DocumentElement를 많이 사용하며 실제로는 XmlElement 형식이지만 XmlElement는 XmlNode에서 상속되므로 본질적으로 동일합니다.

Name 속성은 단순히 노드의 이름을 제공합니다. 예를 들어 다음 예제에서는 "user"라는 텍스트를 출력합니다.

```
XmlDocument xmlDoc = new XmlDocument();
xmlDoc.LoadXml("<user name=\"John Doe\">A user node</user>");
Console.WriteLine(xmlDoc.DocumentElement.Name);
Console.ReadKey();
```

InnerText 속성은 다음과 같이 시작 및 끝 태그 내에 포함된 텍스트를 보유합니다.

```
XmlDocument xmlDoc = new XmlDocument();
xmlDoc.LoadXml("<test>InnerText is here</test>");
Console.WriteLine(xmlDoc.DocumentElement.InnerText);
Console.ReadKey();
```

InnerXml 속성은 InnerText 속성과 약간 비슷하지만 InnerText는 그 안의 모든 XML을 제거하지만 InnerXml 속성은 분명히 제거하지 않습니다. 다음 예제는 차이점을 설명해야 합니다.

```
XmlDocument xmlDoc = new XmlDocument();
xmlDoc.LoadXml("<users><user>InnerText/InnerXml is here</user></users>");
Console.WriteLine("InnerXml: " + xmlDoc.DocumentElement.InnerXml);
Console.WriteLine("InnerText: " + xmlDoc.DocumentElement.InnerText);
Console.ReadKey();
```

OuterXml 속성은 InnerXml과 동일하지만 노드 자체의 XML도 포함됩니다. 다음 예제는 차이점을 설명해야 합니다.

```
XmlDocument xmlDoc = new XmlDocument();
xmlDoc.LoadXml("<users><user>InnerText/InnerXml is here</user></users>");
Console.WriteLine("InnerXml: " + xmlDoc.DocumentElement.InnerXml);
Console.WriteLine("OuterXml: " + xmlDoc.DocumentElement.OuterXml);
Console.ReadKey();
```

이전 장에서 속성으로 작업했지만 여기에 다른 예가 있습니다.

```
XmlDocument xmlDoc = new XmlDocument();
xmlDoc.LoadXml("<user name=\"John Doe\" age=\"42\"></user>");
if(xmlDoc.DocumentElement.Attributes["name"] != null)
    Console.WriteLine(xmlDoc.DocumentElement.Attributes["name"].Value);
if(xmlDoc.DocumentElement.Attributes["age"] != null)
    Console.WriteLine(xmlDoc.DocumentElement.Attributes["age"].Value);
Console.ReadKey();
```




## Using XPath with the XmlDocument class
이전 장에서는 XmlDocument 클래스를 사용해서 XML 파일에서 정보를 가져옵니다. ChildNodes 속성에 대한 다양한 호출을 사용해서 이 작업을 수행했는데, 예제가 매우 간단했기 때문에 다소 간단했습니다. 그러나 코드의 가독성에는 별로 도움이 되지 않았으므로 이 장에서는 확실히 더 강력하면서도 읽고 유지 관리하기 쉬운 또 다른 접근 방식을 살펴보겠습니다. 이를 위해 사용할 기술을 XPath라고 하며 XML 표준을 만든 동일한 조직에서 유지 관리합니다. XPath는 실제로 많은 가능성이 있는 전체 쿼리 언어이지만 XPath 튜토리얼이 아니기 때문에 몇 가지 기본 쿼리만 살펴보겠습니다. 그러나 가장 단순한 형태에서도 XPath는 다음 예에서 볼 수 있듯이 여전히 강력합니다.

XmlDocument 클래스에는 XPath 쿼리를 매개 변수로 사용한 다음 결과 XmlNode를 반환하는 여러 메서드가 있습니다. 이 장에서는 제공된 XPath 쿼리를 기반으로 단일 XmlNode를 반환하는 SelectSingleNode() 메서드와 제공된 XPath 쿼리를 기반으로 XmlNode 개체의 XmlNodeList 컬렉션을 반환하는 SelectNodes() 메서드의 두 가지 메서드를 살펴보겠습니다.

위에서 언급한 두 가지 방법을 모두 시도하지만 이전 장에서 테스트한 통화 정보 XML을 사용하는 대신 이제 새 XML 소스를 시도합니다. RSS 피드는 기본적으로 다양한 뉴스 리더가 고유한 방식으로 동일한 정보를 구문 분석하고 표시할 수 있도록 특정 방식으로 구축된 XML 문서입니다.

우리는 전 세계의 뉴스와 함께 http://rss.cnn.com/rss/edition_world.rss 에 위치한 CNN의 RSS 피드를 사용할 것입니다. 브라우저에서 열면 브라우저가 이것을 좋은 방식으로 렌더링해서 피드에 대한 개요를 얻고 구독할 수 있지만 속지 마십시오. 내부적으로는 브라우저에서 "소스 보기"를 수행하면 볼 수 있는 XML일 뿐입니다. 루트 요소가 "rss"라는 것을 알 수 있습니다. rss 요소에는 일반적으로 하나 이상의 "채널" 요소가 있으며, 이 요소 내에서 피드에 대한 정보와 일반적으로 원하는 뉴스 항목인 "항목" 노드에 대한 정보를 찾을 수 있습니다.

다음 예제에서는 SelectSingleNode() 메서드를 사용해서 피드의 제목을 가져옵니다. XML을 보면 <channel> 요소의 하위 요소로 <title> 요소가 있으며, 이 요소는 <rss> 요소의 하위 요소인 루트임을 알 수 있습니다. 해당 쿼리는 XPath에서 다음과 같이 설명할 수 있습니다.

```
RSS/채널/제목
```

우리는 단순히 찾고 있는 요소의 이름을 슬래시(/)로 구분해서 작성하며, 이는 요소가 이전 슬래시 앞의 요소의 자식이어야 함을 나타냅니다. 이 XPath를 사용하는 것은 다음과 같이 간단합니다.

```
using System;
using System.Text;
using System.Xml;

namespace ParsingXml
{
    class Program
    {
        static void Main(string[] args)
        {
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load("http://rss.cnn.com/rss/edition_world.rss");
            XmlNode titleNode = xmlDoc.SelectSingleNode("//rss/channel/title");
            if(titleNode != null)
                Console.WriteLine(titleNode.InnerText);
            Console.ReadKey();   
        }
    }
}
```

SelectSingleNode() 메서드를 사용해서 XPath를 문자열 매개변수로 사용하는 <title> 요소를 찾습니다. 그런 다음 결과를 반환했는지 확인하고, 반환된 경우 RSS 피드의 제목이 되어야 하는 찾은 노드의 InnerText를 인쇄합니다.

다음 예에서는 SelectNodes() 메서드를 사용해서 RSS 피드의 모든 항목 노드를 찾은 다음 이에 대한 정보를 인쇄합니다.

```
using System;
using System.Text;
using System.Xml;

namespace ParsingXml
{
    class Program
    {
        static void Main(string[] args)
        {
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load("http://rss.cnn.com/rss/edition_world.rss");
            XmlNodeList itemNodes = xmlDoc.SelectNodes("//rss/channel/item");
            foreach(XmlNode itemNode in itemNodes)
            {
                XmlNode titleNode = itemNode.SelectSingleNode("title");
                XmlNode dateNode = itemNode.SelectSingleNode("pubDate");
                if((titleNode != null) && (dateNode != null))
                    Console.WriteLine(dateNode.InnerText + ": " + titleNode.InnerText);
            }
            Console.ReadKey();   
        }
    }
}
```

SelectNodes() 메서드는 이전 예제에서 본 것처럼 XPath 쿼리를 문자열로 가져온 다음 XmlNodeList 컬렉션의 XmlNode 개체 목록을 반환합니다. foreach 루프를 사용해서 반복하고 각 항목 노드에서 항목 노드에서 직접 SelectSingleNode()를 사용해서 title 및 pubDate(게시 날짜)라는 하위 노드를 요청합니다. 둘 다 얻으면 같은 줄에 날짜와 제목을 인쇄한 다음 계속 진행합니다.

이 예에서는 각 항목 노드에서 두 개의 서로 다른 값을 원했기 때문에 항목 노드를 요청한 다음 각각을 처리했습니다. 그러나 예를 들어 각 항목의 제목만 필요한 경우 XPath 쿼리를 다음과 같이 변경할 수 있습니다.

```
RSS/채널/항목/제목
```

각 항목 노드의 각 타이틀 노드와 일치합니다. 다음은 모든 작업을 수행하기 위한 일부 C# 코드가 포함된 쿼리입니다.

```
XmlDocument xmlDoc = new XmlDocument();
xmlDoc.Load("http://rss.cnn.com/rss/edition_world.rss");
XmlNodeList titleNodes = xmlDoc.SelectNodes("//rss/channel/item/title");
foreach(XmlNode titleNode in titleNodes)
    Console.WriteLine(titleNode.InnerText);            
Console.ReadKey();
```





## Writing XML with the XmlWriter class
이전 장에서는 XML 읽기에 대해 다루었지만 이제 XML 작성도 시작할 차례입니다. XML은 단순히 텍스트이므로 파일에 XML 태그를 작성하고 xml 확장명을 지정할 수 있지만 .NET Framework에서 처리하도록 하는 것이 더 쉽고 안전하며 XML을 읽을 때와 마찬가지로 XmlWriter 접근 방식과 XmlDocument 접근 방식의 두 가지 옵션이 있습니다. 이 섹션에서는 첫 번째 접근 방식에 초점을 맞춘 다음 다음 장에서 XmlDocument를 사용해서 XML을 작성하는 방법을 살펴보겠습니다.

둘 사이의 차이점은 다시 한 번 메모리 소비와 관련이 있습니다 - XmlWriter는 XmlDocument보다 적은 메모리를 사용하므로 매우 큰 파일을 작성하는 경우에만 문제가 됩니다. 또 다른 중요한 차이점은 XmlDocument를 사용할 때 기존 파일을 읽고 조작한 다음 변경 내용을 다시 쓸 수 있다는 것입니다. XmlWriter를 사용하면 매번 전체 문서를 처음부터 작성해야 합니다. 하지만 이것이 반드시 문제가 되는 것은 아니므로 항상 그렇듯이 상황과 개인 취향에 따라 결정됩니다.

다음은 XmlWriter 클래스를 사용해서 XML을 작성하는 예입니다.

```
using System;
using System.Text;
using System.Xml;

namespace WritingXml
{
    class Program
    {
        static void Main(string[] args)
        {
            XmlWriter xmlWriter = XmlWriter.Create("test.xml");

            xmlWriter.WriteStartDocument();
            xmlWriter.WriteStartElement("users");

            xmlWriter.WriteStartElement("user");
            xmlWriter.WriteAttributeString("age", "42");
            xmlWriter.WriteString("John Doe");
            xmlWriter.WriteEndElement();

            xmlWriter.WriteStartElement("user");
            xmlWriter.WriteAttributeString("age", "39");
            xmlWriter.WriteString("Jane Doe");

            xmlWriter.WriteEndDocument();
            xmlWriter.Close();
        }
    }
}
```

위의 코드는 다음 XML을 생성합니다.

```
<users>
  <user age="42">John Doe</user>
  <user age="39">Jane Doe</user>
</users>
```

따라서 XmlWriter 클래스의 인스턴스를 만드는 것부터 시작합니다. 하나 이상의 매개 변수(이 경우 XML을 작성해야 하는 경로)를 사용하지만 다양한 목적에 따라 다양한 변형이 있습니다. 가장 먼저 해야 할 일은 WriteStartDocument() 메서드를 호출하는 것입니다. 그런 다음 "users"라는 시작 요소를 작성합니다. XmlWriter는 이를 <users>로 변환합니다. 닫기 전에 또 다른 시작 요소인 "user"를 작성하면 "users"의 자식이 됩니다. 그런 다음 WriteAttributeString() 메서드를 사용해서 요소에 속성(age)을 추가한 다음 WriteString() 메서드를 호출해서 요소의 내부 텍스트를 작성합니다. 그런 다음 WriteEndElement() 메서드를 호출해서 첫 번째 "사용자" 요소를 닫습니다.

이 프로세스는 이전처럼 WriteEndElement()를 호출하지 않는다는 점을 제외하고는 다른 사용자를 추가하기 위해 반복됩니다. 사실, 열린 "users" 요소도 있기 때문에 두 번 호출해야하지만 XmlWriter는 WriteEndDocument() 메서드를 호출할 때 이를 수행합니다.


XmlWriter가 디스크에 데이터를 쓰도록 하려면 Close() 메서드를 호출합니다. 이제 프로젝트의 EXE 파일이 있는 동일한 디렉터리(일반적으로 bin\debug 디렉터리)에서 "test.xml" 파일을 열 수 있습니다.


이것이 간단한 XML 파일을 작성하는 데 필요한 전부입니다. 다음 장에서는 XmlDocument 클래스를 사용해서 동일한 작업을 수행합니다.





## Writing XML with the XmlDocument class
이전 장에서는 XmlWriter 클래스를 사용해서 XML을 작성했습니다. 그러나 일부 상황, 특히 기존 XML을 업데이트할 때 XmlDocument 클래스를 사용하는 것이 유용할 수 있습니다. 그러나 주로 큰 XML 문서의 경우 더 높은 메모리 소비를 알고 있어야 합니다. 다음은 몇 가지 코드입니다.

```
using System;
using System.Text;
using System.Xml;
using System.Xml.Serialization;

namespace WritingXml
{
    class Program
    {
        static void Main(string[] args)
        {
            XmlDocument xmlDoc = new XmlDocument();
            XmlNode rootNode = xmlDoc.CreateElement("users");
            xmlDoc.AppendChild(rootNode);

            XmlNode userNode = xmlDoc.CreateElement("user");
            XmlAttribute attribute = xmlDoc.CreateAttribute("age");
            attribute.Value = "42";
            userNode.Attributes.Append(attribute);
            userNode.InnerText = "John Doe";
            rootNode.AppendChild(userNode);

            userNode = xmlDoc.CreateElement("user");
            attribute = xmlDoc.CreateAttribute("age");
            attribute.Value = "39";
            userNode.Attributes.Append(attribute);
            userNode.InnerText = "Jane Doe";
            rootNode.AppendChild(userNode);

            xmlDoc.Save("test-doc.xml");
        }
    }
}
```

그리고 결과 XML은 다음과 같습니다.

```
<users>
  <user age="42">John Doe</user>
  <user age="39">Jane Doe</user>
</users>
```

보시다시피 이것은 XmlWriter 접근 방식보다 약간 더 객체 지향적이며 조금 더 많은 코드가 필요합니다. 우리가 하는 일은 CreateElement() 및 CreateAttribute() 메서드를 사용해서 새 요소와 속성을 모두 만드는 데 사용할 XmlDocument 개체를 인스턴스화하는 것입니다. 그렇게 할 때마다 문서를 문서에 직접 추가하거나 다른 요소에 요소를 추가합니다. 루트 요소("사용자")가 문서에 직접 추가되고 사용자 요소가 루트 요소에 추가되는 예에서 이를 볼 수 있습니다. 물론 속성은 속성 속성의 Append() 메서드를 사용해서 속성이 속한 요소에 추가됩니다. 전체 XML 문서는 Save() 메서드를 사용하는 마지막 줄의 디스크에 기록됩니다.

이제 이미 언급했듯이 XmlWriter를 사용할 때보다 약간 더 많은 코드가 필요하지만 기존 XML 문서로 이동해서 몇 가지 값을 변경하기만 하면 되는 상황을 상상해 보십시오. XmlWriter 접근 방식을 사용하면 먼저 XmlReader를 사용해서 모든 정보를 읽고, 저장하고, 변경한 다음 XmlWriter를 사용해서 전체 정보를 다시 써야 합니다. XmlDocument는 메모리에 모든 것을 보관하기 때문에 기존 XML 파일을 업데이트하는 것이 훨씬 간단해집니다. 다음 예제에서는 이전 장에서 만든 "test-doc.xml" 파일을 열고 모든 사용자의 나이를 1씩 늘립니다. 얼마나 쉬운지 확인하십시오.

```
using System;
using System.Text;
using System.Xml;
using System.Xml.Serialization;

namespace WritingXml
{
    class Program
    {
        static void Main(string[] args)
        {
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load("test-doc.xml");
            XmlNodeList userNodes = xmlDoc.SelectNodes("//users/user");
            foreach(XmlNode userNode in userNodes)
            {
                int age = int.Parse(userNode.Attributes["age"].Value);
                userNode.Attributes["age"].Value = (age + 1).ToString();
            }
            xmlDoc.Save("test-doc.xml");           
        }
    }
}
```

XML 파일을 로드하고 모든 <사용자> 노드를 요청합니다. 그런 다음 반복하고 age 속성을 정수 변수로 읽은 다음 값을 1씩 늘린 후 값을 노드와 속성에 다시 씁니다. 마지막으로 문서를 동일한 파일에 다시 저장하고 문서를 열면 사용자가 모두 생일을 맞았다는 것을 알 수 있습니다. 꽤 멋지다!



---




# C# 3.0

## Introduction to C# 3.0
Microsoft .NET Framework 3.5 및 Visual Studio 2008(코드명 "Orcas")이 출시되면서 C# 버전 3이라는 이름으로 C# 언어에 새로운 기능이 많이 추가되었습니다. 다음 장에서는 모든 프로그래머가 좋은 코드를 더 쉽고 빠르게 작성할 수 있도록 끊임없는 노력의 일환으로 Microsoft가 추가한 멋진 새로운 기능 중 일부를 보여 드리겠습니다.

예제를 컴파일하고 활용하려면 최소 버전 3.5의 프레임워크가 설치되어 있어야 하며, 즐겨 사용하는 IDE(Visual Studio 또는 Express 버전 중 하나)의 버전 2008이 필요합니다.


## Automatic properties
객체 지향 코드를 작성하는 모든 프로그래머에게 정말 골치 아픈 것은 항상 모든 개인 필드에 대한 공용 속성을 선언하는 것입니다. 이것은 특히 거의 모든 속성이 다음과 같이 영리하게 추가되지 않고 개인 필드에 대한 간단한 가져오기 및 설정 매핑이기 때문에 많이 지루한 작업입니다.

```
private string name;

public string Name
{
    get { return name; }
    set { name = value; }
}
```

이와 같은 간단한 속성을 사용하면 속성의 추가 레이어를 추가하는 대신 필드를 public 으로 선언하고 직접 사용할 수 있습니다. 그러나 OOP의 지침은 우리에게 이런식으로 처리하라고 말하고 있으며 우리 대부분은 보다 쉬운 방법으로 처리하고 싶은 유혹에 저항합니다. C# 3.0을 사용하면 더 이상 이런 딜레마를 처리할 필요가 없습니다! 위의 예제는 이제 다음과 같이 작성할 수 있습니다.

```
public string Name
{
    get;
    set;
}
```

또는 다음과 같이 더 적은 공간을 사용합니다.

```
public string Name { get; set; }
```

필드 선언이 없으며 필드 값을 가져오고 설정하는 코드도 없습니다. 이 모든 것은 컴파일러에 의해 자동으로 처리되며, 컴파일러는 자동으로 개인 필드를 만들고 필드를 읽고 쓰는 데 필요한 기본 코드로 get 및 set 메서드를 채웁니다. 외부에서 보면 일반 속성처럼 보이지만 추가 키 입력을 많이 절약하고 클래스가 덜 부풀어 오를 것입니다. 물론 첫 번째 예에서 볼 수 있듯이 이전 방법을 계속해서 사용할 수 있습니다 - 이것은 원할 경우 사용할 수 있는 추가 기능일 뿐입니다.



## Object Initializers
C# 3.0을 사용하면 개체와 컬렉션을 모두 초기화하는 것이 훨씬 쉬워졌습니다. 이전 장에서 설명한 자동 속성을 사용하는 간단한 Car 클래스를 고려하십시오.

```
class Car
{
    public string Name { get; set; }
    public Color Color { get; set; }
}
```

이제 C# 2.0에서는 Car 인스턴스를 만들고 해당 속성을 설정하기 위해 다음과 같은 코드를 작성해야 합니다.

```
Car car = new Car();
car.Name = "Chevrolet Corvette";
car.Color = Color.Yellow;
```

실제로는 괜찮지만 C # 3.0에서는 새로운 객체 이니셜 라이저 구문 덕분에 좀 더 깔끔하게 수행 할 수 있습니다.

```
Car car = new Car { Name = "Chevrolet Corvette", Color = Color.Yellow };
```

보시다시피 새 Car 객체를 인스턴스화한 후 중괄호 세트를 사용하며, 그 안에서 Car 클래스의 모든 공용 속성에 액세스할 수 있습니다. 이렇게 하면 약간의 타이핑과 약간의 공간도 절약됩니다. 멋진 부분은 중첩도 할 수 있다는 것입니다. 다음과 같이 Car 클래스에 새 복합 속성을 추가하는 다음 예를 고려하십시오.

```
class Car
{
    public string Name { get; set; }
    public Color Color { get; set; }
    public CarManufacturer Manufacturer { get; set; }
}

class CarManufacturer
{
    public string Name { get; set; }
    public string Country { get; set; }
}
```

C# 2.0으로 새 차를 초기화하려면 다음과 같은 작업을 수행해야 합니다.

```
Car car = new Car();
car.Name = "Corvette";
car.Color = Color.Yellow;
car.Manufacturer = new CarManufacturer();
car.Manufacturer.Name = "Chevrolet";
car.Manufacturer.Country = "USA";
```

C# 3.0에서는 다음과 같이 할 수 있습니다.

```
Car car = new Car { 
                Name = "Chevrolet Corvette", 
                Color = Color.Yellow, 
                Manufacturer = new CarManufacturer { 
                    Name = "Chevrolet", 
                    Country = "USA" 
                } 
            };
```

또는 가독성에 대해 크게 걱정하지 않는 경우:

```
Car car = new Car { Name = "Chevrolet Corvette", Color = Color.Yellow, Manufacturer = new CarManufacturer { Name = "Chevrolet", Country = "USA" } };
```

자동 속성과 마찬가지로 이것은 구문 설탕입니다 - 당신은 그것을 사용하거나 구식의 작업 방식을 고수할 수 있습니다.





## Collection Initializers
C# 3.0이 개체를 초기화하는 새로운 방법을 제공하는 것처럼 특정 항목 집합이 추가된 목록을 초기화하기 위한 새로운 구문이 포함되었습니다. 마지막 장의 Car 클래스를 사용할 수 있습니다.

```
class Car
{
    public string Name { get; set; }
    public Color Color { get; set; }
}
```

자동차 범위를 포함하는 목록을 만들려면 C# 2.0에서 다음과 같은 작업을 수행해야 합니다.

```
Car car;
List<Car> cars = new List<Car>();

car = new Car();
car.Name = "Corvette";
car.Color = Color.Yellow;
cars.Add(car);

car = new Car();
car.Name = "Golf";
car.Color = Color.Blue;
cars.Add(car);
```

객체 이니셜라이저를 사용하면 조금 더 짧게 수행할 수 있습니다.

```
List<Car> cars = new List<Car>();
cars.Add(new Car { Name = "Corvette", Color = Color.Yellow });
cars.Add(new Car { Name = "Golf", Color = Color.Blue});
```

그러나 컬렉션 이니셜라이저와 결합하면 훨씬 더 간단할 수 있습니다.

```
List<Car> cars = new List<Car> 
{ 
    new Car { Name = "Corvette", Color = Color.Yellow },
    new Car { Name = "Golf", Color = Color.Blue}
};
```

또는 정확히 동일한 작업을 수행하는 한 줄 버전에서:

```
List<Car> cars = new List<Car> { new Car { Name = "Corvette", Color = Color.Yellow }, new Car { Name = "Golf", Color = Color.Blue} };
```

10줄의 코드가 객체 및 컬렉션 이니셜라이저 덕분에 약간 길지만 한 줄로 줄어들었습니다.





## Extension Methods
C# 3.0의 또 다른 멋진 기능은 확장 메서드입니다. 이를 통해 이전 형식을 서브클래싱하거나 다시 컴파일할 필요 없이 기존 형식을 새로운 기능으로 확장할 수 있습니다. 예를 들어, 특정 문자열이 숫자인지 아닌지를 알고 싶을 수 있습니다. 일반적인 접근 방식은 함수를 정의한 다음 매번 호출하는 것이며, 이러한 종류의 함수를 많이 얻으면 다음과 같이 유틸리티 클래스에 함께 넣습니다.

```
public class MyUtils
{
    public static bool IsNumeric(string s)
    {
        float output;
        return float.TryParse(s, out output);
    }
}
```

이제 다음과 같은 코드 줄을 실행해서 문자열을 확인할 수 있습니다.

```
string test = "4";
if (MyUtils.IsNumeric(test))
    Console.WriteLine("Yes");
else
    Console.WriteLine("No");
```

그러나 확장 메서드를 사용하면 실제로 String 클래스를 확장해서 이를 직접 지원할 수 있습니다. 확장 메서드 라이브러리가 될 정적 메서드 집합을 사용해서 정적 클래스를 정의해서 이를 수행합니다. 예를 들면 다음과 같습니다.

```
public static class MyExtensionMethods
{
    public static bool IsNumeric(this string s)
    {
        float output;
        return float.TryParse(s, out output);
    }
}
```

이것을 다른 정적 메서드와 구분하는 유일한 것은 메서드의 매개 변수 섹션에있는 "this"키워드입니다. 컴파일러에게 이것이 문자열 클래스의 확장 메서드이며 실제로 확장 메서드를 만드는 데 필요한 전부임을 알려줍니다. 이제 다음과 같이 문자열에서 직접 IsNumeric() 메서드를 호출할 수 있습니다.

```
string test = "4";
if (test.IsNumeric())
    Console.WriteLine("Yes");
else
    Console.WriteLine("No");
```


---



# File handling

## Reading and writing files
이 장에서는 C#을 사용해서 간단한 파일을 읽고 쓰는 방법을 살펴보겠습니다. 다행스럽게도 C#을 사용하면 매우 쉽습니다. Syste.IO 네임스페이스의 File 클래스에는 우리가 원하는 거의 모든 것이 포함되어 있어 파일을 간단하게 읽고 쓰는 것이 매우 쉽습니다.

첫 번째 예에서는 매우 미니멀한 텍스트 편집기를 구성합니다. 사실, 너무 간단해서 하나의 파일만 읽은 다음 새 콘텐츠를 쓸 수 있으며 한 번에 한 줄의 텍스트만 쓸 수 있습니다. 그러나 File 클래스를 사용하는 것이 얼마나 쉬운지 보여줍니다.

```
using System;
using System.IO;

namespace FileHandlingArticleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            if(File.Exists("test.txt"))
            {
                string content = File.ReadAllText("test.txt");
                Console.WriteLine("Current content of file:");
                Console.WriteLine(content);
            }
            Console.WriteLine("Please enter new content for the file:");
            string newContent = Console.ReadLine();
            File.WriteAllText("test.txt", newContent);
        }
    }
}
```

파일 클래스를 사용해서 파일이 있는지 확인하고, ReadAllText() 메서드를 사용해서 파일 내용을 읽고, WriteAllText() 메서드를 사용해서 파일에 새 콘텐츠를 씁니다. 절대 경로가 아니라 간단한 파일 이름을 사용하고 있음을 알 수 있습니다. 이렇게 하면 파일이 실행 파일과 동일한 디렉토리에 배치되며 현재로서는 괜찮습니다. 그 외에는 예제가 이해하기 쉬워야 합니다. 파일을 확인하고 존재하는 경우 내용을 읽고 콘솔에 출력합니다. 그런 다음 사용자에게 새 콘텐츠를 입력하라는 메시지를 표시하고 콘텐츠가 있으면 파일에 씁니다. 분명히 이전 내용을 덮어쓰겠지만 지금은 괜찮습니다. 그러나 대신 AppendAllText 메서드를 사용할 수 있습니다. 대신 WriteAllText 줄을 다음과 같이 변경해 보십시오.

```
File.AppendAllText("test.txt", newContent);
```

실행하면 새 텍스트를 덮어쓰지 않고 기존 텍스트에 추가되는 것을 볼 수 있습니다. 그렇게 간단합니다. 그러나 여전히 응용 프로그램 실행당 한 줄의 텍스트만 가져옵니다. 조금 창의력을 발휘해서 그것을 바꾸자. 예제의 마지막 줄을 다음과 같이 바꿉니다.

```
Console.WriteLine("Please enter new content for the file - type exit and press enter to finish editing:");
string newContent = Console.ReadLine();
while(newContent != "exit")
{
    File.AppendAllText("test.txt", newContent + Environment.NewLine);
    newContent = Console.ReadLine();
}
```

보시다시피 사용자가 파일 편집을 중지할 때 exit이라는 단어를 입력하도록 지시하고, 그렇게 할 때까지 파일에 사용자 입력을 추가한 다음 새 줄을 입력하라는 메시지를 표시합니다. 또한 줄 바꿈 문자인 Environment.NewLine을 추가해서 실제 텍스트 줄처럼 보이게 합니다.

그러나 매번 파일에 쓰는 대신 더 예쁜 솔루션은 다음과 같이 보일 것입니다.

```
Console.WriteLine("Please enter new content for the file - type exit and press enter to finish editing:");
using(StreamWriter sw = new StreamWriter("test.txt"))
{
    string newContent = Console.ReadLine();
    while(newContent != "exit")
    {
        sw.Write(newContent + Environment.NewLine);
        newContent = Console.ReadLine();
    }
}
```

Streams의 사용법은 이 장의 범위를 약간 벗어났지만 이 예제에서 멋진 점은 파일을 한 번만 열고 만족스러우면 변경 사항을 기록한다는 것입니다. 이 경우 C#의 using() 문을 활용해서 파일 참조가 범위를 벗어나면 닫히도록 합니다. using() 문을 사용하지 않는 경우 StreamWriter 인스턴스에서 Close() 메서드를 수동으로 호출해야 합니다.





## Manipulating files and directories
이전 장에서는 간단한 파일로 텍스트를 읽고 쓰는 방법을 살펴보았습니다. 이를 위해 File 클래스를 사용했지만 단순히 읽고 쓰는 것 이상의 작업을 수행합니다. Directory 클래스와 결합하면 이름 바꾸기, 이동, 삭제 등과 같은 거의 모든 파일 시스템 작업을 수행할 수 있습니다.

이 장에서는 바로 그러한 일을 하는 수많은 예를 제공할 것입니다. 사용된 방법이 매우 간단하고 사용하기 쉽기 때문에 설명은 제한적입니다. 두 가지 사항을 알고 있어야 합니다. 우선, 다음과 같이 System.IO 네임스페이스를 가져와야 합니다.

```
using System.IO;
```

또한 여기서는 예외 처리를 수행하지 않습니다. 사용하기 전에 파일과 디렉토리가 존재하는지 확인하지만 예외 처리가 없으므로 문제가 발생할 경우 응용 프로그램이 충돌합니다. 예외 처리는 일반적으로 IO 작업을 수행할 때 좋은 생각입니다. 자세한 내용은 이 자습서의 예외 처리 장을 참조하세요.

모든 예제에서 간단한 파일 및 디렉터리 이름을 사용하며, 이는 응용 프로그램의 생성된 EXE 파일과 동일한 디렉터리에 있어야 합니다. 프로젝트 설정에서 EXE 파일이 생성되는 위치를 확인할 수 있습니다.

### 파일 삭제
이 예제를 다운로드, 편집 및 실행하십시오!

```
if(File.Exists("test.txt"))
{
    File.Delete("test.txt");
    if(File.Exists("test.txt") == false)
    Console.WriteLine("File deleted...");
}
else
    Console.WriteLine("File test.txt does not yet exist!");
Console.ReadKey();
```

### 디렉토리 삭제
이 예제를 다운로드, 편집 및 실행하십시오!

```
if(Directory.Exists("testdir"))
{
    Directory.Delete("testdir");
    if(Directory.Exists("testdir") == false)
    Console.WriteLine("Directory deleted...");
}
else
    Console.WriteLine("Directory testdir does not yet exist!");
Console.ReadKey();
```

testdir이 비어 있지 않으면 예외가 표시됩니다. 왜? Directory 클래스의이 버전의 Delete()는 빈 디렉토리에서만 작동하기 때문입니다. 하지만 변경하기는 매우 쉽습니다.

```
Directory.Delete("testdir", true);
```

추가 매개변수는 Delete() 메서드가 재귀적인지 확인하며, 이는 디렉토리를 삭제하기 전에 하위 디렉토리를 순회하고 파일을 삭제한다는 것을 의미합니다.

### 파일 이름 바꾸기
이 예제를 다운로드, 편집 및 실행하십시오!

```
if(File.Exists("test.txt"))
{
    Console.WriteLine("Please enter a new name for this file:");
    string newFilename = Console.ReadLine();
    if(newFilename != String.Empty)
    {
    File.Move("test.txt", newFilename);
    if(File.Exists(newFilename))
    {
        Console.WriteLine("The file was renamed to " + newFilename);
        Console.ReadKey();
    }
    }
}
```

Move() 메서드를 사용해서 파일 이름을 바꾼다는 것을 알 수 있습니다. Rename () 메소드가 아닌 이유는 무엇입니까? 이동과 이름 바꾸기는 본질적으로 같은 것이기 때문에 그러한 방법이 없기 때문입니다.

### 디렉토리 이름 바꾸기
디렉토리로 동일한 작업을 수행하는 것도 쉽습니다.

```
if(Directory.Exists("testdir"))
{
    Console.WriteLine("Please enter a new name for this directory:");
    string newDirName = Console.ReadLine();
    if(newDirName != String.Empty)
    {
    Directory.Move("testdir", newDirName);
    if(Directory.Exists(newDirName))
    {
        Console.WriteLine("The directory was renamed to " + newDirName);
        Console.ReadKey();
    }
    }
}
```

### 새 디렉터리 만들기
새로운 디렉토리를 만드는 것도 쉽습니다 - 다음 예와 같이 Directory 클래스에서 CreateDirectory() 메서드를 사용하십시오.

```
Console.WriteLine("Please enter a name for the new directory:");
string newDirName = Console.ReadLine();
if(newDirName != String.Empty)
{
    Directory.CreateDirectory(newDirName);
    if(Directory.Exists(newDirName))
    {
    Console.WriteLine("The directory was created!");
    Console.ReadKey();
    }
}
```

### 파일 읽기 및 쓰기
마지막 예로 File 클래스를 사용해서 파일을 매우 쉽게 읽고 쓸 수 있는 방법을 보여 드리겠습니다. 이 작업은 C#을 사용해서 여러 가지 방법으로 수행할 수 있지만 File 클래스에 있는 Read* 및 Write* 메서드가 아마도 사용하기 가장 쉬운 메서드일 것입니다. WriteAllBytes(), WriteAllLines() 및 WriteAllText()의 세 가지 버전과 해당 Read 메서드가 있습니다. 사용하기 가장 간단한 것은 간단한 문자열을 입력으로 사용하는 마지막 것입니다. 간단한 예를 들어 어떻게 작동하는지 설명하겠습니다.

```
string fileContents = "John Doe & Jane Doe sitting in a tree...";
File.WriteAllText("test.txt", fileContents);

string fileContentsFromFile = File.ReadAllText("test.txt");
Console.WriteLine(fileContentsFromFile);
```

파일에 무언가를 작성한 다음 다시 읽는 데 얼마나 몇 줄의 코드가 필요한지 확인하십시오! 두 메서드의 첫 번째 매개 변수는 텍스트를 쓰고 읽어야 하는 경로입니다. 일반적으로 여기에 전체 경로를 지정하지만 예제를 보다 명확하게 하기 위해 파일 이름만 지정해서 파일이 EXE 파일과 동일한 디렉토리에 기록됩니다.

### 요약
보시다시피 File 및 Directory 클래스는 파일 및 디렉토리로 작업해야 할 때 큰 도움이 됩니다. 필요한 대부분의 작업을 수행하는 데 도움이 될 수 있으며, 더 고급 작업을 수행해야 하는 경우 이러한 클래스와 해당 메서드는 일반적으로 확장할 수 있는 훌륭한 구성 요소 역할을 합니다.







## File and directory information
이전 몇 장에서 사용한 File 및 Directory 클래스는 직접 파일 및 디렉터리 조작에 적합합니다. 그러나 때로는 대신 정보를 얻고 싶을 때도 있는데, 다시 한 번 System.IO 네임스페이스인 FileInfo 및 DirectoryInfo 클래스가 도움이 됩니다. 이 장에서는 이 두 클래스를 사용하는 몇 가지 방법을 살펴보겠습니다.

### FileInfo 클래스
먼저 FileInfo 클래스를 사용하는 간단한 방법을 살펴보겠습니다.

```
static void Main(string[] args)
{
    FileInfo fi = new FileInfo(System.Reflection.Assembly.GetExecutingAssembly().Location);
    if(fi != null)
    Console.WriteLine(String.Format("Information about file: {0}, {1} bytes, last modified on {2} - Full path: {3}", fi.Name, fi.Length, fi.LastWriteTime, fi.FullName));
    Console.ReadKey();
}
```

FileInfo 클래스의 새 인스턴스를 만듭니다. 정보를 원하는 파일의 경로인 하나의 매개변수를 사용합니다. 파일 이름을 지정할 수도 있었지만 재미를 위해 작업 중인 실제 응용 프로그램, 즉 프로젝트가 컴파일되는 EXE 파일에 대한 정보를 얻는 것이 멋질 것이라고 생각했습니다. 콘솔 응용 프로그램(WinForms 어셈블리의 일부)에서 Application 프로젝트에 액세스할 수 없기 때문에 약간의 Reflection을 사용해서 현재 어셈블리의 경로를 가져옵니다. 이것은 이 특정 장의 범위를 벗어났지만 적어도 지금은 알고 있습니다.

FileInfo 인스턴스가 있으면 이에 대한 모든 종류의 정보를 출력합니다. 응용 프로그램을 실행해 보면 볼 수 있습니다. 모두 매우 훌륭하고 쉬우며 FileInfo 클래스를 보면 더 많은 정보와 File 클래스에 있는 메서드에 대한 바로 가기를 제공한다는 것을 알 수 있습니다. 어쨌든 FileInfo 인스턴스를 사용해서 파일에 대한 참조가 있으므로 File 클래스와 동일한 옵션을 얻을 수 있습니다.

### DirectoryInfo 클래스
이제 단일 파일에 대한 정보는 괜찮지만 DirectoryInfo 클래스를 사용하면 디렉토리 내의 모든 파일과 디렉토리에 대한 정보를 얻을 수 있으며 이는 분명히 매우 일반적인 시나리오입니다. 간단한 예를 들어 보여드리겠습니다.

```
DirectoryInfo di = new DirectoryInfo(Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location));
if(di != null)
{
    FileInfo[] subFiles = di.GetFiles();
    if(subFiles.Length > 0)
    {
    Console.WriteLine("Files:");
    foreach(FileInfo subFile in subFiles)
    {
        Console.WriteLine("   " + subFile.Name + " (" + subFile.Length + " bytes)");
    }
    }
    Console.ReadKey();
}
```

FileInfo 인스턴스 대신 DirectoryInfo 인스턴스를 만듭니다. 동일한 트릭을 사용해서 실행 파일의 경로를 가져온 다음 Path 클래스에서 GetDirectoryName() 메서드를 사용해서 경로의 디렉터리 부분만 가져옵니다. GetFiles() 메서드를 사용해서 각각 디렉터리의 파일을 나타내는 FileInfo 인스턴스 배열을 가져옵니다. 그런 다음 각 파일 이름과 크기를 인쇄하면서 반복합니다.

아마도 우리는 디렉토리도 원할 것입니다. 그것은 마찬가지로 쉽습니다.

```
DirectoryInfo[] subDirs = di.GetDirectories();
if(subDirs.Length > 0)
{
    Console.WriteLine("Directories:");
    foreach(DirectoryInfo subDir in subDirs)
    {
    Console.WriteLine("   " + subDir.Name);
    }
}
```

경우에 따라 특정 이름이나 파일 확장자를 가진 파일이나 디렉토리만 원할 수 있습니다. 다행히도 FileInfo 및 DirectoryInfo 도 이에 대한 꽤 좋은 지원을 제공합니다.

이렇게 하면 확장자가 .exe 디렉토리의 모든 파일이 제공됩니다.

```
FileInfo[] subFiles = di.GetFiles("*.exe");
```

이렇게 하면 이름 어딘가에 "test"라는 단어가 있는 모든 디렉토리가 제공됩니다.

```
DirectoryInfo[] subDirs = di.GetDirectories("*test*");
```

파일과 디렉토리를 모두 재귀적으로 찾을 수도 있는데, 이는 하위 디렉토리의 하위 디렉토리에서 검색한다는 것을 의미합니다.... 원래 디렉토리:

```
FileInfo[] subFiles = di.GetFiles("*.exe", SearchOption.AllDirectories);
```

최상위 디렉터리만 검색하려면 코드가 다음과 같아야 합니다.

```
FileInfo[] subFiles = di.GetFiles("*.exe", SearchOption.TopDirectoryOnly);
```

### 요약
FileInfo 및 DirectoryInfo 클래스를 사용하면 현재 컴퓨터의 파일 시스템에 대한 정보를 쉽게 검색할 수 있습니다.




---



# Data Streams

## Introduction
.NET 프레임워크에서 스트림의 개념은 메모리 내, 파일, 네트워크 연결 또는 기본적으로 한 위치에서 다른 위치로 바이트를 전송하려는 기타 상황과 같은 광범위한 소스/대상에서 데이터를 읽거나 쓰려는 모든 경우에 사용됩니다.

.NET Framework에서 많은 IO 관련 클래스로 작업할 때 Stream 형식의 매개 변수를 허용하는 메서드가 있는 것을 볼 수 있습니다. Stream은 문자열을 처리하기 위한 기본 클래스이며 다음 섹션에서 볼 수 있듯이 MemoryStream 또는 FileStream과 같은 다양한 형식을 취할 수 있습니다. 그러나 Stream 클래스 자체는 추상적이므로 인스턴스화할 수 없으며 다양한 유형의 스트림에 대한 공통 기본 클래스로만 사용됩니다.

대부분의 Stream 형식은 읽기, 쓰기 및 탐색(스트림의 새 위치로 이동해서 현재 위치 대신 읽기 또는 쓰기)의 세 가지 작업을 수행할 수 있습니다. 따라서 Stream 클래스는 파생 스트림 클래스가 이 작업을 수행할 수 있는지 여부를 결정하는 세 가지 메서드인 CanRead, CanWrite 및 CanSeek를 구현합니다. 작업 중인 스트림에서 이러한 속성을 참조해서 원하는 작업(예: 쓰기)을 사용할 수 있는지 확인할 수 있습니다.

스트림은 작업을 마칠 때마다 항상 삭제해야 합니다. 그렇지 않으면 더 이상 잠그지 않아야 하는 리소스(예: FileStream을 사용할 때 파일)에 대한 잠금을 보유할 수 있습니다. Stream 기본 클래스는 IDisposable 인터페이스를 구현하므로 Dispose() 메서드를 호출하는 것만큼 간단하거나 using() 블록을 사용해서 스트림 사용을 캡슐화하는 것이 더 나을 수 있습니다(이 자습서에서 사용할 접근 방식).

### 스트림 리더 및 라이터
스트림의 일반적인 용도는 Reader 또는 Writer 클래스 중 하나(예: FileReader 또는 BinaryWriter)의 백업 소스로 사용됩니다. Streams를 이러한 클래스의 새 인스턴스에 전달해서 예를 들어 전체 파일을 읽고 메모리에서 조작한 다음 다시 쓸 수 있습니다. 다음 섹션에서도 이에 대한 설명을 보게 될 것입니다.

### 요약
스트림은 기본적으로 바이트를 한 위치에서 다른 위치로(예: 파일 또는 네트워크 리소스) 이동하는 메커니즘입니다. .NET Framework는 추상 Stream 클래스를 이 모든 것의 기반으로 사용해서 다음 문서에서 설명할 FileStream 및 MemoryStream과 같은 여러 파생 구현을 제공합니다.





## MemoryStream
MemoryStream 은 꽤 많이 사용되는 기본 Stream 클래스 중 하나입니다. 이름에서 알 수 있듯이 메모리에서 직접 데이터를 처리하며 소스를 잠그지 않고 파일 또는 네트워크 위치와 같은 다른 위치에서 오는 바이트를 처리하는 데 자주 사용됩니다.

예를 들어 파일의 전체 내용을 MemoryStream으로 읽으면 파일을 즉시 잠그고 다시 잠금 해제한 다음 MemoryStream의 바이트 작업을 시작할 수 있습니다. 바이트에서 앞뒤로 많은 검색을 수행해야하는 경우 MemoryStream의 바이트가 디스크가 아닌 메모리에 저장되기 때문에 FileStream에서 직접 동일한 작업을 수행하는 것보다 훨씬 빠릅니다.

따라서 MemoryStream이 다른 소스에서 오는 바이트 배열(byte[])으로 초기화되는 것을 종종 볼 수 있으며, 인스턴스화된 MemoryStream이 MemoryStream을 활용하는 다른 메커니즘(예: StreamReader 유형 중 하나)에 전달되는 것을 종종 볼 수 있습니다. 예를 들면 다음과 같습니다.

```
public void UseMemoryStream()
{
    byte[] fileContents = File.ReadAllBytes("test.txt");
    using(MemoryStream memoryStream = new MemoryStream(fileContents))
    {
        using(TextReader textReader = new StreamReader(memoryStream))
        {
            string line;
            while((line = textReader.ReadLine()) != null)
                Console.WriteLine(line);
        }
    }
}
```

이 예에서는 간단한 텍스트 파일의 모든 바이트를 읽습니다. 그런 다음 이 바이트로 MemoryStream을 만든 다음 MemoryStream에서 모든 줄을 읽을 StreamReader 인스턴스를 만듭니다. 이 예제에서 알 수 있듯이 MemoryStream은 작업을 수행할 다른 클래스(이 경우 StreamReader)에 대한 좋은 백업 소스입니다.

StreamReader / StreamWriter 클래스를 사용하는 것은 기본 Stream 작업을위한 좋은 단축키이지만, 고집한다면 MemoryStream 에서 직접 바이트를 읽고 작업 할 수 있습니다. MemoryStream 클래스에는 ReadByte() 메서드와 같은 몇 가지 메서드가 있습니다. 현재 위치에서 바이트를 읽고 반환한 다음 Position 속성을 진행해서 다음 바이트를 읽을 수 있도록 MemoryStream을 준비합니다. 예를 들면 다음과 같습니다.

```
public void UseMemoryStream()
{
    byte[] fileContents = File.ReadAllBytes("test.txt");
    using(MemoryStream memoryStream = new MemoryStream(fileContents))
    {
        int b;
        while((b = memoryStream.ReadByte()) >= 0)
            Console.WriteLine(Convert.ToChar(b));
    }
}
```

MemoryStream에 있는 각 바이트를 읽고 콘솔에 출력합니다. 소스가 일반 텍스트라는 것을 알고 있기 때문에 Convert.ToChar() 메서드를 사용해서 바이트를 ASCII 문자로 변환합니다.

### 요약
MemoryStream 클래스는 메모리에 유지하려는 데이터의 백업 원본으로 사용할 수 있습니다. 이렇게 하면 파일이나 네트워크 리소스에서 들어오는 데이터를 위한 훌륭한 임시 저장소가 되어 데이터로 작업하는 동안 잠금 등을 방지할 수 있습니다.



---





# Reflection

## Reflection introduction
Wikipedia는 "컴퓨터 과학에서 반사는 컴퓨터 프로그램이 자신의 구조와 동작을 관찰하고 수정할 수 있는 과정"이라고 말합니다. 이것이 바로 C#의 리플렉션이 작동하는 방식이며, 현재로서는 깨닫지 못할 수도 있지만 런타임 중에 애플리케이션에 대한 정보를 검사하고 변경할 수 있다는 것은 엄청난 잠재력을 제공합니다. 일반적인 용어이자 C#의 리플렉션 기능의 실제 이름인 리플렉션은 매우 잘 작동하며 실제로 사용하기가 그리 어렵지 않습니다. 다음 몇 장에서는 작동 방식에 대해 더 자세히 알아보고 Reflection이 얼마나 유용한지 보여주는 몇 가지 멋진 예를 제공할 것입니다.

그러나 시작하고 관심을 갖기를 위해 여기에 작은 예가 있습니다. 그것은 내가 모든 프로그래밍 언어를 처음 접하는 많은 사람들로부터 본 질문을 해결합니다 : 런타임 중에 변수의 이름을 아는 것만으로는 변수의 값을 어떻게 변경할 수 있습니까? 솔루션에 대해이 작은 데모 응용 프로그램을 살펴보고 다음 장에서 사용된 다양한 기술에 대한 설명을 읽으십시오.

```
using System;
using System.Collections.Generic;
using System.Text;
using System.Reflection;

namespace ReflectionTest
{
    class Program
    {
        private static int a = 5, b = 10, c = 20;

        static void Main(string[] args)
        {
            Console.WriteLine("a + b + c = " + (a + b + c));
            Console.WriteLine("Please enter the name of the variable that you wish to change:");
            string varName = Console.ReadLine();
            Type t = typeof(Program);
            FieldInfo fieldInfo = t.GetField(varName, BindingFlags.NonPublic | BindingFlags.Static);
            if(fieldInfo != null)
            {
                Console.WriteLine("The current value of " + fieldInfo.Name + " is " + fieldInfo.GetValue(null) + ". You may enter a new value now:");
                string newValue = Console.ReadLine();
                int newInt;
                if(int.TryParse(newValue, out newInt))
                {
                    fieldInfo.SetValue(null, newInt);
                    Console.WriteLine("a + b + c = " + (a + b + c));
                }
                Console.ReadKey();
            }
        }
    }
}
```

코드를 실행하고 어떻게 작동하는지 확인하십시오. 실제 리플렉션을 사용하는 라인을 제외하고는 모두 매우 간단합니다. 이제 작동 방식에 대한 더 많은 이론을 보려면 다음 장으로 이동하십시오.







## The right Type
Type 클래스는 Reflection의 기초입니다. 어셈블리, 모듈 또는 형식에 대한 런타임 정보 역할을 합니다. 다행히도 객체의 Type에 대한 참조를 얻는 것은 Object 클래스에서 상속되는 모든 클래스에 GetType() 메서드가 있기 때문에 매우 간단합니다. 인스턴스화되지 않은 유형에 대한 정보가 필요한 경우 전역적으로 사용 가능한 typeof() 메서드를 사용할 수 있습니다. 두 가지 접근 방식을 모두 사용하는 다음 예를 고려하십시오.

```
using System;
using System.Collections.Generic;
using System.Text;
using System.Reflection;

namespace ReflectionTest
{
    class Program
    {
        static void Main(string[] args)
        {
            string test = "test";
            Console.WriteLine(test.GetType().FullName);
            Console.WriteLine(typeof(Int32).FullName);
            Console.ReadKey();
        }
    }
}
```

자체 변수에서 GetType() 메서드를 사용한 다음 알려진 클래스인 Int32에서 typeof()를 사용합니다. 보시다시피 두 경우 모두 FullName 속성을 읽을 수 있는 Type 개체입니다.

어느 시점에서는 찾고 있는 유형의 이름만 있을 수도 있습니다. 이 경우 적절한 어셈블리에서 참조를 가져와야 합니다. 다음 예제에서는 실행 중인 어셈블리, 즉 현재 코드가 실행되는 어셈블리에 대한 참조를 가져온 다음 모든 형식을 나열합니다.

```
using System;
using System.Collections.Generic;
using System.Text;
using System.Reflection;

namespace ReflectionTest
{
    class Program
    {
        static void Main(string[] args)
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            Type[] assemblyTypes = assembly.GetTypes();
            foreach(Type t in assemblyTypes)
                Console.WriteLine(t.Name);
            Console.ReadKey();
        }
    }

    class DummyClass
    {
        //Just here to make the output a tad less boring :)
    }
}
```

출력은 선언된 두 클래스인 Program 및 DummyClass의 이름이지만 더 복잡한 응용 프로그램에서는 목록이 더 흥미로울 수 있습니다. 이 경우 유형의 이름만 가져오지만 분명히 얻은 Type 참조를 사용해서 훨씬 더 많은 작업을 수행할 수 있습니다. 다음 장에서는 우리가 그것으로 무엇을 할 수 있는지 조금 더 보여드리겠습니다.





## Instantiating a class
지금까지 이미 인스턴스화된 .NET 형식 또는 개체로 작업했습니다. 그러나 Reflection을 사용하면 인스턴스화하려는 클래스의 이름을 알고 실제로 런타임에도 인스턴스화를 수행할 수 있습니다. 여러 가지 방법이 있지만 사용하려는 생성자에 대한 참조를 가져 와서 호출 한 다음 반환 된 값을 인스턴스로 사용하는 것을 선호합니다. 다음은 바로 그 방법의 예입니다. 먼저 코드를 만든 다음 모든 것을 설명하겠습니다.

```
using System;
using System.Collections.Generic;
using System.Text;
using System.Reflection;

namespace ReflectionTest
{
    class Program
    {
        static void Main(string[] args)
        {
            Type testType = typeof(TestClass);
            ConstructorInfo ctor = testType.GetConstructor(System.Type.EmptyTypes);
            if(ctor != null)
            {
                object instance = ctor.Invoke(null);
                MethodInfo methodInfo = testType.GetMethod("TestMethod");
                Console.WriteLine(methodInfo.Invoke(instance, new object[] { 10 }));
            }
            Console.ReadKey();
        }
    }

    public class TestClass
    {
        private int testValue = 42;

        public int TestMethod(int numberToAdd)
        {
            return this.testValue + numberToAdd;
        }
    }
}
```

TestClass 라는 간단한 클래스를 정의했습니다. 여기에는 전용 필드와 공용 메서드가 포함되어 있습니다. 이 메서드는 매개 변수의 값이 추가된 개인 속성의 값을 반환합니다. 이제 우리가 원하는 것은 이 TestClass의 새 인스턴스를 만들고 TestMethod를 호출한 다음 결과를 콘솔에 출력하는 것입니다.

이 예에서는 TestClass에서 직접 typeof()를 사용할 수 있지만 어느 시점에서는 원하는 클래스의 이름만 사용해야 할 수도 있습니다. 이 경우 Type에 대한 장에서 설명한 대로 선언된 어셈블리를 통해 참조를 얻을 수 있습니다.

따라서 클래스에 대한 Type 참조를 사용해서 GetConstructor() 메서드를 사용해서 System.Type.EmptyTypes를 매개 변수로 전달해서 기본 생성자를 요청합니다. 특정 생성자를 원하는 경우 Type의 배열을 제공해야 하며, 각 배열은 우리가 찾고 있는 생성자가 사용할 매개변수를 정의합니다.


생성자에 대한 참조가 있으면 Invoke() 메서드를 호출해서 TestClass 클래스의 새 인스턴스를 생성하기만 하면 됩니다. 매개변수를 지정하지 않으려는 것이므로 null을 Invoke()에 매개변수로 전달합니다. 원하는 메서드의 이름과 함께 GetMethod()를 사용해서 TestMethod() 함수를 가져온 다음 다시 한 번 Invoke() 메서드의 마법을 사용해서 이 함수를 호출합니다. 이번에는 객체 배열 형태로 매개변수를 지정해야 합니다. 필요한 유일한 매개변수로 숫자 10을 지정해서 즉석에서 이 작업을 수행한 다음 메서드 호출 결과를 출력합니다. 이 모든 것은 Reflection의 마법을 통해!





## A Reflection based settings class
좋아, 그래서 나는 멋지고 유용한 예제로 Reflection에 대한 튜토리얼의 이 부분을 끝낼 것이라고 생각했습니다. 여기 사이트에 있는 일반적인 예제보다 약간 크지만 정말 유용하기를 바랍니다. 지난 몇 장에서 살펴본 많은 내용을 사용하므로 따라갈 수 있기를 바랍니다.

모든 종류의 응용 프로그램을 만들 때 일반적인 시나리오는 사용자 설정을 저장하려는 욕구입니다. 여러 설정을 가져오면 원하는 설정의 로드 및 저장을 처리하는 Settings 클래스를 만들 것입니다. Settings 클래스에 새 설정이 필요할 때마다 이 새 설정을 포함하도록 Load() 및 Save() 메서드를 업데이트해야 합니다. 하지만 Settings 클래스가 자체 속성을 검색한 다음 자동으로 로드하고 저장하도록 하는 것은 어떨까요? Reflection을 사용하면 매우 쉬우며, 이 튜토리얼의 Reflection 섹션에 있는 다른 장을 읽었다면 다음 예제를 이해할 수 있을 것입니다.

작은 예제에 더 잘 맞도록 응용 프로그램 설정 대신 사람에 대한 정보를 저장하고 있지만 어쨌든 일반적인 아이디어를 얻을 수 있기를 바랍니다. Reflection을 사용하는 것은 알려진 속성을 수동으로 읽고 쓰는 것보다 느리므로 언제 사용할지, 언제 더 빠른 접근 방식을 선택할지 고려해야 합니다! 또한 이 예에서는 간단한 텍스트 파일을 사용해서 더 간단한 값을 저장하며 | (파이프 문자)를 클릭합니다. 이것을 실제 세계에 사용하는 경우 데이터에 더 나은 형식(아마도 XML)을 원할 것입니다. 물론 오류 처리가 많지 않으므로 그 중 일부도 추가해야 할 것입니다.

자, 시작하겠습니다. 첫째, Person 클래스는 단순히 이름을 설정 또는 이와 유사한 것으로 바꿔 더 유용하게 만들 수 있습니다.

```
public class Person
{
    private int age = -1;
    private string name = String.Empty;

    public void Load()
    {
        if(File.Exists("settings.dat"))
        {
            Type type = this.GetType();

            string propertyName, value;
            string[] temp;
            char[] splitChars = new char[] { '|' };
            PropertyInfo propertyInfo;

            string[] settings = File.ReadAllLines("settings.dat");
            foreach(string s in settings)
            {
                temp = s.Split(splitChars);
                if(temp.Length == 2)
                {
                    propertyName = temp[0];
                    value = temp[1];
                    propertyInfo = type.GetProperty(propertyName);
                    if(propertyInfo != null)
                        this.SetProperty(propertyInfo, value);
                }
            }
        }
    }

    public void Save()
    {
        Type type = this.GetType();
        PropertyInfo[] properties = type.GetProperties();
        TextWriter tw = new StreamWriter("settings.dat");
        foreach(PropertyInfo propertyInfo in properties)
        {
            tw.WriteLine(propertyInfo.Name + "|" + propertyInfo.GetValue(this, null));
        }
        tw.Close();
    }

    public void SetProperty(PropertyInfo propertyInfo, object value)
    {
        switch(propertyInfo.PropertyType.Name)
        {
            case "Int32":
                propertyInfo.SetValue(this, Convert.ToInt32(value), null);
                break;
            case "String":
                propertyInfo.SetValue(this, value.ToString(), null);
                break;
        }
    }

    public int Age
    {
        get { return age; }
        set { age = value; }
    }

    public string Name
    {
        get { return name; }
        set { name = value; }
    }
}
```

좋아, 많은 것들이 있다는 걸 알아요. 하지만 수업 내내 도와드리겠습니다. 우선, 우리 개인에 대한 정보를 보관하기 위한 몇 가지 개인 필드가 있습니다. 클래스의 맨 아래에는 물론 private 필드를 사용하는 해당 public 속성이 있습니다.

Load() 메서드도 있습니다. settings.dat 파일을 찾고, 파일이 있는 경우 전체 파일을 읽고 각 줄을 문자열 배열에 배치합니다. 이제 각 설정 줄을 실행해서 속성 이름과 값 부분의 두 부분으로 나눕니다. 둘 다 있는 경우 Type 개체를 사용해서 속성 이름으로 속성을 가져온 다음 자체 SetProperty 메서드를 사용해서 값을 설정합니다.

SetProperty() 메서드는 변경하려는 속성의 형식을 살펴본 다음 그에 따라 작동합니다. 현재로서는 정수와 문자열만 지원하지만 아시다시피 이 지원을 확장하는 것은 매우 쉬울 것입니다.

Save() 메서드는 Person 클래스에 정의된 각 속성에 대해 하나씩 PropertyInfo 인스턴스 배열을 가져온 다음 TextWriter를 사용해서 각 속성과 해당 값을 데이터 파일에 씁니다.

이제 이 클래스를 사용하기 위한 몇 가지 코드만 있으면 됩니다. 이 작은 응용 프로그램은 설정 파일에서 사람을로드하려고 시도하고 성공하지 못하면 사용자에게 정보를 입력하라는 메시지가 표시됩니다.

```
class Program
{
    static void Main(string[] args)
    {
        Person person = new Person();
        person.Load();
        if((person.Age > 0) && (person.Name != String.Empty))
        {
            Console.WriteLine("Hi " + person.Name + " - you are " + person.Age + " years old!");
        }
        else
        {
            Console.WriteLine("I don't seem to know much about you. Please enter the following information:");
            Type type = typeof(Person);
            PropertyInfo[] properties = type.GetProperties();
            foreach(PropertyInfo propertyInfo in properties)
            {
                Console.WriteLine(propertyInfo.Name + ":");
                person.SetProperty(propertyInfo, Console.ReadLine());
            }
            person.Save();
            Console.WriteLine("Thank you! I have saved your information for next time.");
        }
        Console.ReadKey();
    }
}
```

여기에 있는 모든 것은 사용자에게 정보를 요청하는 부분을 제외하고는 매우 사소합니다. 다시 한 번, Reflection을 사용해서 Person 클래스의 모든 공용 속성을 가져온 다음 각각을 요청합니다.

독자 연습으로 Person 클래스를 확장해서 더 많은 정보를 포함하는 것이 좋습니다. 더 많은 속성을 추가하기만 하면 이 정보도 저장되고 로드되는 것을 볼 수 있습니다.





