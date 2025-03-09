The complete WPF tutorial
현재 126개의 문서로 구성된 이 WPF 자습서에 오신 것을 환영합니다. 여기서 WPF UI 프레임워크를 사용하여 고유한 애플리케이션을 만드는 방법을 알아봅니다. WPF를 처음 사용하는 경우 첫 번째 장부터 시작하여 모든 장을 읽는 것이 좋습니다.

모든 챕터가 나열된 오른쪽의 목차를 살펴보고 계속해서 새로운 챕터를 추가할 것이므로 정기적으로 다시 방문하시기 바랍니다. 이 자습서를 통해 WPF를 제대로 시작할 수 있기를 바랍니다.

WPF 사용 방법을 배울 때 C#에 대한 기본 지식이 권장됩니다. C#에 대해 잘 모르는 경우 C# 자습서를 통해 더 잘 이해할 수 있습니다. XAML 및 스타일링에 대한 항목을 수행하는 동안 HTML 및 CSS에 대한 올바른 이해도 얻을 수 있습니다.

이 튜토리얼이 마음에 드셨기를 바라며, 마음에 드셨다면 웹사이트에서 링크를 걸어 저희를 도와주시고 Facebook 및 Twitter와 같은 소셜 미디어에서 친구들과 공유해 주십시오. 누리다!

About WPF
What is WPF?
WPF(Windows Presentation Foundation)는 GUI 프레임워크에 대한 Microsoft의 최신 접근 방식으로, . NET 프레임워크입니다.

그러나 GUI 프레임 워크는 무엇입니까? GUI는 Graphical User Interface의 약자이며, 아마도 지금 이 페이지를 보고 계실 것입니다. Windows에는 컴퓨터 작업을 위한 GUI가 있으며, 이 문서를 읽고 있을 가능성이 있는 브라우저에는 웹 서핑을 할 수 있는 GUI가 있습니다.

GUI 프레임워크를 사용하면 레이블, 텍스트 상자 및 기타 잘 알려진 요소와 같은 다양한 GUI 요소가 있는 응용 프로그램을 만들 수 있습니다. GUI 프레임워크가 없으면 이러한 요소를 수동으로 그리고 텍스트 및 마우스 입력과 같은 모든 사용자 상호 작용 시나리오를 처리해야 합니다. 이것은 많은 작업이므로 대신 대부분의 개발자는 모든 기본 작업을 수행하고 개발자가 훌륭한 응용 프로그램을 만드는 데 집중할 수 있도록 하는 GUI 프레임워크를 사용합니다.

많은 GUI 프레임워크가 있지만 .NET 개발자에게 가장 흥미로운 프레임워크는 현재 WinForms와 WPF입니다. WPF는 최신 버전이지만 Microsoft는 여전히 WinForms를 유지 관리하고 지원하고 있습니다. 다음 장에서 볼 수 있듯이 두 프레임워크 사이에는 몇 가지 차이점이 있지만 목적은 동일합니다.

다음 장에서는 WinForms와 WPF의 차이점을 살펴보겠습니다.

WPF vs. WinForms
이전 장에서 WPF가 무엇인지, WinForms에 대해 조금 이야기했습니다. 이 장에서 나는 둘을 비교하려고 노력할 것인데, 그 이유는 그들이 같은 목적을 수행하지만 그들 사이에는 많은 차이점이 있기 때문입니다. 이전에 WinForms로 작업한 적이 없고 특히 WPF가 첫 번째 GUI 프레임워크인 경우 이 장을 건너뛸 수 있지만 차이점에 관심이 있다면 계속 읽으십시오.

WinForms와 WPF의 가장 중요한 차이점은 WinForms는 단순히 표준 Windows 컨트롤(예: TextBox) 위에 있는 계층인 반면 WPF는 처음부터 빌드되며 거의 모든 상황에서 표준 Windows 컨트롤에 의존하지 않는다는 사실입니다. 이것은 미묘한 차이처럼 보일 수 있지만 실제로는 그렇지 않으므로 Win32/WinAPI에 의존하는 프레임워크로 작업한 적이 있다면 확실히 알 수 있습니다.

이에 대한 좋은 예는 이미지와 텍스트가 있는 버튼입니다. 이것은 표준 Windows 컨트롤이 아니므로 WinForms는 즉시 이러한 가능성을 제공하지 않습니다. 대신 이미지를 직접 그리거나, 이미지를 지원하는 고유한 버튼을 구현하거나, 제3자 컨트롤을 사용해야 합니다. WPF를 사용하면 버튼은 본질적으로 콘텐츠와 다양한 상태 (예 : 손대지 않은, 호버링, 눌림)와의 경계이기 때문에 무엇이든 포함 할 수 있습니다. WPF 버튼은 대부분의 다른 WPF 컨트롤과 마찬가지로 "모양이 없는" 것이므로 그 안에 다양한 다른 컨트롤을 포함할 수 있습니다. 이미지와 텍스트가 있는 버튼을 원하십니까? 단추 안에 Image와 TextBlock 컨트롤을 넣기만 하면 됩니다. 표준 WinForms 컨트롤에서는 이러한 종류의 유연성을 얻을 수 없기 때문에 이미지가있는 버튼 등과 같은 컨트롤의 다소 간단한 구현에 대한 큰 시장이 있습니다.

이 유연성의 단점은 WinForms가 필요한 시나리오를 위해 만들어졌기 때문에 WinForms로 매우 쉬운 것을 달성하기 위해 때때로 더 열심히 일해야 한다는 것입니다. 적어도 처음에는 WinForms ListViewItem 이 한 줄의 코드로 수행하는 이미지와 멋지게 정렬 된 텍스트로 ListView 를 만드는 템플릿을 만드는 느낌입니다.

이것은 단지 하나의 차이점 일 뿐이지만 WPF로 작업하면서 WPF는 단순히 좋든 나쁘든 자신의 방식으로 일을하는 다른 많은 차이점의 근본적인 이유라는 것을 깨닫게 될 것입니다. 더 이상 Windows 방식으로 작업을 수행하는 데 얽매이지 않지만, 이러한 종류의 유연성을 얻기 위해 Windows 방식으로 작업을 수행하려는 경우 조금 더 많은 작업을 수행해야 합니다.

다음은 WPF 및 WinForms의 주요 이점에 대한 완전히 주관적인 목록입니다. 그것은 당신이 무엇을 하고 있는지에 대한 더 나은 아이디어를 줄 것입니다.

WPF의 장점
더 새롭기 때문에 현재 표준과 더 잘 어울립니다
Microsoft는 Visual Studio와 같은 많은 새로운 응용 프로그램에 사용하고 있습니다
더 유연하므로 새 컨트롤을 작성하거나 구입할 필요 없이 더 많은 작업을 수행할 수 있습니다
제 3 자 컨트롤을 사용해야하는 경우 이러한 컨트롤의 개발자는 WPF가 최신 버전이기 때문에 WPF에 더 집중할 것입니다 XAML을 사용하면 GUI를 쉽게 만들고 편집할 수 있으며 디자이너(XAML)와 프로그래머(C#, VB.NET 등) 간에 작업을 분할할 수 있습니다.
데이터 바인딩 - 데이터와 레이아웃을 보다 깔끔하게 분리할 수 있습니다.
성능 향상을 위해 GUI를 그리기 위해 하드웨어 가속을 사용합니다.
Windows 응용 프로그램과 웹 응용 프로그램(Silverlight/XBAP) 모두에 대한 사용자 인터페이스를 만들 수 있습니다
WinForms의 장점
그것은 더 오래되었기 때문에 더 많은 시도와 테스트를 거쳤습니다
이미 많이 있습니다.rd 당신이 사거나 무료로 얻을 수 있는 파티 컨트롤
Visual Studio의 디자이너는 WPF를 사용하여 더 많은 작업을 직접 수행해야하는 WPF보다 WinForms에 더 적합합니다
Getting started:
Visual Studio Community
WPF는 이미 설명했듯이 XAML (마크 업)과 C # / VB.NET / 기타 . NET 언어에서 사용할 수 있습니다. 이 모든 것은 Windows에 포함된 메모장을 포함한 모든 텍스트 편집기에서 편집한 다음 명령줄에서 컴파일할 수 있습니다. 그러나 대부분의 개발자는 코드 작성에서 인터페이스 설계 및 컴파일에 이르기까지 모든 것을 훨씬 쉽게 만들기 때문에 IDE(통합 개발 환경)를 사용하는 것을 선호합니다.

.NET/WPF IDE에 대해 선호되는 선택은 Visual Studio이지만 비용이 많이 듭니다. 운 좋게도 Microsoft는 모든 사람이 .NET 및 WPF를 쉽고 무료로 시작할 수 있도록 하여 Visual Studio Community라는 무료 버전의 Visual Studio를 만들었습니다. 이 버전에는 실제 Visual Studio보다 기능이 약간 적지만 WPF를 배우고 실제 응용 프로그램을 만드는 데 필요한 모든 것이 포함되어 있습니다.

따라서 Microsoft에서 Visual Studio Community를 다운로드하십시오 - 무료이며 쉽게 설치하고 사용할 수 있습니다.

https://www.visualstudio.com/vs/community/

다운로드 및 설치가 완료되면 다음 문서를 클릭하여 WPF 학습 프로세스를 시작하십시오!

Hello, WPF!
거의 모든 프로그래밍 자습서에서 첫 번째이자 매우 고전적인 예는 "Hello, world!" 예제이지만 이 자습서에서는 대신 "Hello, WPF!"로 변경합니다. 목표는 단순히 이 텍스트를 화면에 표시하여 시작하는 것이 얼마나 쉬운지 보여주는 것입니다.

이 자습서의 나머지 부분에서는 IDE, 가급적이면 Visual Studio 또는 Visual Studio Community가 설치되어 있다고 가정합니다(가져오는 방법에 대한 지침은 이전 문서 참조). 다른 제품을 사용하는 경우 제품에 맞게 지침을 조정해야 합니다.

Visual Studio의 파일 메뉴에서 새 프로젝트를 선택하여 시작합니다. 왼쪽에는 카테고리 트리가 있어야 합니다. 이 자습서에서는 코드가 포함될 때마다 C#에 중점을 두므로 템플릿 목록에서 선택해야 하며, Windows 응용 프로그램을 만들 것이므로 트리에서 Windows를 선택해야 합니다. 그러면 WPF 응용 프로그램을 선택해야 하는 오른쪽에 사용 가능한 Windows 응용 프로그램 유형 목록이 표시됩니다. 이름 텍스트 필드에 프로젝트 이름을 "HelloWPF"로 지정했습니다. 대화 상자 하단의 나머지 설정이 정상인지 확인한 다음 확인 버튼을 누릅니다.

새 프로젝트에는 몇 개의 파일이 있지만 지금은 그 중 하나인 MainWindow.xaml에 대해서만 집중적으로 설명하겠습니다. 이것은 응용 프로그램 기본 창이며, 특별히 변경하지 않는 한 응용 프로그램을 시작할 때 먼저 표시되는 창입니다. 여기에 있는 XAML 코드(XAML은 이 자습서의 다른 장에서 자세히 설명함)는 다음과 같습니다.

<Window x:Class="WpfApplication1.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    Title="MainWindow" Height="350" Width="525">
    <Grid>

    </Grid>
</Window>

이것은 Visual Studio에서 창에 대해 만드는 기본 XAML이며, 모든 부분은 XAML 및 "창"에 대한 장에서 설명합니다. 지금 실제로 응용 프로그램을 실행하면(디버그 -> 디버깅 시작을 선택하거나 F5 키를 누름) 현재 응용 프로그램이 구성되어 있는 빈 창을 볼 수 있지만 이제 화면에 메시지를 표시할 차례입니다.

이를 위해 TextBlock 컨트롤을 Grid 패널에 추가하고 앞서 언급한 메시지를 콘텐츠로 사용합니다.

<Window x:Class="WpfApplication1.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    Title="MainWindow" Height="350" Width="525">
    <Grid>
        <TextBlock HorizontalAlignment="Center" VerticalAlignment="Center" FontSize="72">
            Hello, WPF!
        </TextBlock>
    </Grid>
</Window>

지금 응용 프로그램을 실행 해 보시고 (디버그 -> 디버깅 시작을 선택하거나 F5 키를 누름) 첫 번째 WPF 응용 프로그램을 통해 노력의 아름다운 결과를 확인하십시오.



TextBlock에서 세 가지 다른 특성을 사용하여 창 중간에 사용자 지정 정렬을 얻었고 FontSize 속성을 사용하여 더 큰 텍스트를 얻었음을 알 수 있습니다. 이러한 모든 개념은 이후 기사에서 다룰 것입니다.

여기까지 오신 것을 축하드립니다. 이제 자습서의 나머지 부분을 읽으면 곧 WPF를 마스터하게 될 것입니다!

XAML
What is XAML?
XAML은 eXtensible Application Markup Language의 약자로 GUI를 설명하기 위한 Microsoft의 XML 변형입니다. WinForms와 같은 이전 GUI 프레임워크에서 GUI는 GUI와 상호 작용하는 데 사용하는 것과 동일한 언어(예: C# 또는 VB.NET)로 만들어졌으며 일반적으로 디자이너(예: Visual Studio)가 유지 관리하지만 XAML을 사용하면 Microsoft는 다른 길을 가고 있습니다. HTML과 마찬가지로 GUI를 쉽게 작성하고 편집할 수 있습니다.

이것은 실제로 XAML 자습서는 아니지만 WPF의 필수적인 부분이기 때문에 XAML 자습서를 사용하는 방법에 대해 간략하게 설명하겠습니다. 창을 만들든 페이지를 만들든 XAML 문서와 CodeBehind 파일로 구성되며, 이 파일들은 함께 Window/Page를 만듭니다. XAML 파일은 모든 요소와 함께 인터페이스를 설명하는 반면, CodeBehind는 모든 이벤트를 처리하고 XAML 컨트롤을 사용하여 조작할 수 있는 액세스 권한을 갖습니다.

다음 장에서는 XAML의 작동 방식과 XAML을 사용하여 인터페이스를 만드는 방법을 살펴보겠습니다.

Basic XAML
이전 장에서 XAML의 정의와 용도에 대해 설명했지만 XAML에서 컨트롤을 만들려면 어떻게 해야 할까요? 다음 예제에서 볼 수 있듯이 XAML에서 컨트롤을 만드는 것은 꺾쇠 괄호로 묶인 이름을 쓰는 것만큼 쉽습니다. 예를 들어 Button은 다음과 같습니다.

<Button>

XAML 태그는 끝 태그를 작성하거나 시작 태그의 끝에 슬래시를 넣어 끝내야 합니다.

<Button></Button>

또는

<Button />

많은 컨트롤을 사용하면 시작 태그와 끝 태그 사이에 콘텐츠를 배치할 수 있으며, 이 태그는 컨트롤의 콘텐츠입니다. 예를 들어, Button 컨트롤을 사용하면 시작 태그와 끝 태그 사이에 표시되는 텍스트를 지정할 수 있습니다.

<Button>A button</Button>

HTML은 대/소문자를 구분하지 않지만 XAML은 컨트롤 이름이 .NET Framework의 형식과 일치해야 하기 때문에 대/소문자를 구분합니다. 컨트롤의 속성에 해당하는 속성 이름도 마찬가지입니다. 다음은 태그에 속성을 추가하여 몇 가지 속성을 정의하는 버튼입니다.

<Button FontWeight="Bold" Content="A button" />

FontWeight 속성을 설정하여 굵은 텍스트를 제공한 다음 시작 태그와 끝 태그 사이에 텍스트를 쓰는 것과 동일한 Content 속성을 설정합니다. 그러나 컨트롤의 모든 특성은 다음과 같이 정의할 수도 있으며, Control-Dot-Property 표기법을 사용하여 주 컨트롤의 자식 태그로 표시됩니다.

<Button>
    <Button.FontWeight>Bold</Button.FontWeight>
    <Button.Content>A button</Button.Content>
</Button>

결과는 위와 정확히 동일하므로이 경우에는 구문에 관한 것입니다. 그러나 많은 컨트롤이 텍스트 이외의 콘텐츠(예: 다른 컨트롤)를 허용합니다. 다음은 Button 내부에 여러 TextBlock 컨트롤을 사용하여 동일한 단추에 다른 색의 텍스트가 있는 경우입니다.

이 예제를 다운로드하고 실행하십시오.

<Button>
    <Button.FontWeight>Bold</Button.FontWeight>
    <Button.Content>
        <WrapPanel>
            <TextBlock Foreground="Blue">Multi</TextBlock>
            <TextBlock Foreground="Red">Color</TextBlock>
            <TextBlock>Button</TextBlock>
        </WrapPanel>
    </Button.Content>
</Button>

Content 속성은 단일 자식 요소만 허용하므로 WrapPanel을 사용하여 서로 다른 색상의 텍스트 블록을 포함합니다. WrapPanel과 같은 패널은 WPF에서 중요한 역할을 하며, 이에 대해서는 나중에 더 자세히 설명하겠지만 지금은 다른 컨트롤의 컨테이너로 간주하는 것이 좋습니다.

다음 태그를 사용하여 정확히 동일한 결과를 얻을 수 있으며, 이는 단순히 동일한 내용을 작성하는 또 다른 방법입니다.

이 예제를 다운로드하고 실행하십시오.

<Button FontWeight="Bold">
    <WrapPanel>
        <TextBlock Foreground="Blue">Multi</TextBlock>
        <TextBlock Foreground="Red">Color</TextBlock>
        <TextBlock>Button</TextBlock>
    </WrapPanel>
</Button>

코드 및 XAML 비교
위의 예제를 통해 XAML이 작성하기가 매우 쉽지만 다양한 방법이 있으며 위의 예제가 다른 색상의 텍스트가 있는 버튼을 가져오기 위해 많은 마크업을 제공한다고 생각한다면 C#에서 정확히 동일한 작업을 수행하는 것과 비교해 보십시오.

이 예제를 다운로드하고 실행하십시오.

Button btn = new Button();
btn.FontWeight = FontWeights.Bold;

WrapPanel pnl = new WrapPanel();

TextBlock txt = new TextBlock();
txt.Text = "Multi";
txt.Foreground = Brushes.Blue;
pnl.Children.Add(txt);

txt = new TextBlock();
txt.Text = "Color";
txt.Foreground = Brushes.Red;
pnl.Children.Add(txt);

txt = new TextBlock();
txt.Text = "Button";
pnl.Children.Add(txt);

btn.Content = pnl;
pnlMain.Children.Add(btn);

물론 위의 예제는 덜 명시 적으로 작성하고 더 많은 구문 론적 설탕을 사용할 수 있지만, XAML은 인터페이스를 설명하기 위해 매우 짧고 간결합니다.

Events in XAML
대부분의 최신 UI 프레임워크는 이벤트 기반이며 WPF도 마찬가지입니다. Control 클래스를 상속하는 Window를 포함한 모든 컨트롤은 구독할 수 있는 다양한 이벤트를 노출합니다. 이러한 이벤트를 구독할 수 있으며, 이는 이벤트가 발생할 때 애플리케이션에 알림이 전송되고 이에 대응할 수 있음을 의미합니다.

이벤트에는 여러 가지 유형이 있지만 가장 일반적으로 사용되는 이벤트 중 일부는 마우스나 키보드를 사용하여 애플리케이션과 사용자의 상호 작용에 응답하는 것입니다. 대부분의 컨트롤에서 KeyDown, KeyUp, MouseDown, MouseEnter, MouseLeave, MouseUp 및 기타 여러 이벤트를 찾을 수 있습니다.

이 주제는 복잡하기 때문에 WPF에서 이벤트가 작동하는 방식에 대해 자세히 살펴보겠지만 지금은 XAML의 컨트롤 이벤트를 코드 숨김 파일의 코드 조각에 연결하는 방법을 알아야 합니다. 다음 예를 살펴보십시오.

<Window x:Class="WpfTutorialSamples.XAML.EventsSample"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="EventsSample" Height="300" Width="300">
	<Grid Name="pnlMainGrid" MouseUp="pnlMainGrid_MouseUp" Background="LightBlue">        
		
    </Grid>
</Window>

메서드 이름을 작성하여 Grid의 MouseUp 이벤트를 구독한 방법에 주목하십시오. 이 메서드는 올바른 이벤트 서명을 사용하여 코드 숨김에서 정의해야 합니다. 이 경우 다음과 같이 표시되어야 합니다.

private void pnlMainGrid_MouseUp(object sender, MouseButtonEventArgs e)
{
	MessageBox.Show("You clicked me at " + e.GetPosition(this).ToString());
}

MouseUp 이벤트는 사용자가 구독하는 MouseButtonEventHandler라는 대리자를 사용합니다. 여기에는 두 개의 매개 변수가 있는데, 하나는 sender (이벤트를 발생시킨 컨트롤)이고 다른 하나는 유용한 정보를 담고 있는 MouseButtonEventArgs 개체입니다. 예제에서는 마우스 커서의 위치를 가져오고 사용자에게 이에 대해 알리는 데 사용합니다.

예를 들어, MouseUp과 MouseDown은 모두 MouseButtonEventHandler 대리자를 사용하는 반면 MouseMove 이벤트는 MouseEventHandler 대리자를 사용합니다. 이벤트 핸들러 메소드를 정의 할 때 사용하는 대리자를 알아야하며이를 모르는 경우 설명서에서 조회 할 수 있습니다.

다행히 Visual Studio는 이벤트에 대한 올바른 이벤트 처리기를 생성하는 데 도움이 될 수 있습니다. 이 작업을 수행하는 가장 쉬운 방법은 XAML에서 이벤트 이름을 작성한 다음 VS의 IntelliSense가 나머지 작업을 수행하도록하는 것입니다.



<새 이벤트 처리기>를 선택하면 Visual Studio에서 코드 숨김 파일에 적절한 이벤트 처리기를 생성합니다. 이 경우 pnlMainGrid_MouseDown _으로 명명됩니다. 이벤트 이름을 마우스 오른쪽 버튼으로 클릭하고 Navigate to Event Handler를 선택하면 VS가 바로 이동합니다.

Subscribing to an event from Code-behind
이벤트를 구독하는 가장 일반적인 방법은 위에서 설명했지만 대신 코드 숨김에서 직접 이벤트를 구독하려는 경우가 있을 수 있습니다. 이 작업은 += C# 구문을 사용하여 수행되며, 여기서 이벤트 처리기를 개체에서 직접 이벤트에 추가합니다. 이에 대한 자세한 설명은 전용 C# 예제에 속하지만 비교를 위해 다음과 같은 예제가 있습니다.

using System;
using System.Windows;
using System.Windows.Input;


namespace WpfTutorialSamples.XAML
{
	public partial class EventsSample : Window
	{
		public EventsSample()
		{
			InitializeComponent();
			pnlMainGrid.MouseUp += new MouseButtonEventHandler(pnlMainGrid_MouseUp);
		}

		private void pnlMainGrid_MouseUp(object sender, MouseButtonEventArgs e)
		{
			MessageBox.Show("You clicked me at " + e.GetPosition(this).ToString());
		}

	}
}

다시 한 번 말하지만, 어떤 대리자를 사용할지 알아야 하며, 다시 한 번 Visual Studio가 이를 지원할 수 있습니다. 당신이 쓰자마자 :

pnlMainGrid.MouseDown +=

Visual Studio는 다음과 같은 지원을 제공합니다.



[Tab] 키를 두 번 누르기만 하면 Visual Studio에서 현재 메서드 바로 아래에 올바른 이벤트 처리기를 생성하여 구현할 수 있습니다. 이와 같은 이벤트를 구독하는 경우 XAML에서 구독할 필요가 없습니다.

A WPF application
A WPF Application - Introduction
이 자습서에서는 WPF를 사용하여 응용 프로그램을 만드는 방법을 중점적으로 설명합니다. 아시다시피 .NET은 .NET 구현이 있는 모든 플랫폼에서 실행할 수 있지만 가장 일반적인 플랫폼은 여전히 Microsoft Windows입니다. 이 자습서에서 Windows 응용 프로그램에 대해 이야기할 때 실제로는 브라우저나 인터넷을 통해 원격으로 실행되는 것이 아니라 Windows(또는 다른 .NET 호환 플랫폼)에서 실행되는 응용 프로그램을 의미합니다.

WPF 응용 프로그램을 실행하려면 다른 .NET 응용 프로그램 유형과 마찬가지로 .NET Framework가 필요합니다. 다행히 Microsoft는 Vista 이후 모든 버전의 Windows에 .NET 프레임워크를 포함해 왔으며 Windows Update를 통해 이전 버전에서 프레임워크를 푸시하고 있습니다. 즉, 대부분의 Windows 사용자가 WPF 응용 프로그램을 실행할 수 있다는 것을 확신할 수 있습니다.

다음 장에서는 WPF 응용 프로그램의 구조와 다양한 측면을 살펴보겠습니다.

The Window
WPF 응용 프로그램을 만들 때 가장 먼저 만나게 되는 것은 Window 클래스입니다. 창의 루트 역할을 하며 표준 테두리, 제목 표시줄 및 최대화, 최소화 및 닫기 버튼을 제공합니다. WPF 창은 요소가 루트인 XAML(.xaml) 파일과 CodeBehind(.cs) 파일의 조합입니다. Visual Studio(Express)를 사용하는 경우 새 WPF 응용 프로그램을 만들면 다음과 같은 기본 창이 만들어집니다.

<Window x:Class="WpfApplication1.Window1"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    Title="Window1" Height="300" Width="300">
    <Grid>

    </Grid>
</Window>

x:class 특성은 사용할 클래스(이 경우 Visual Studio에서 만든 Window1)를 XAML 파일에 알려줍니다. VS의 프로젝트 트리에서 XAML 파일의 자식 노드로 찾을 수 있습니다. 기본적으로 다음과 같이 표시됩니다.

using System;
using System.Windows;
using System.Windows.Controls;
//…more using statements

namespace WpfApplication1
{
    /// <summary>
    /// Interaction logic for Window1.xaml
    /// </summary>
    public partial class Window1 : Window
    {
        public Window1()
        {
            InitializeComponent();
        }
    }
}

여기에서 볼 수 있듯이 Window1 클래스는 런타임에 XAML 파일과 결합되어 전체 창을 제공하기 때문에 partial로 정의됩니다. 이것이 실제로 InitializeComponent()에 대한 호출이 수행하는 작업이므로 전체 기능 창을 시작하고 실행해야 하는 이유입니다.

XAML 파일로 돌아가 보면 Window 요소에서 창의 제목(제목 표시줄에 표시)과 시작 너비 및 높이를 정의하는 Title과 같은 몇 가지 다른 흥미로운 특성을 확인할 수 있습니다. XAML 장에서 설명할 몇 가지 네임스페이스 정의도 있습니다.

또한 Visual Studio에서 Window 내부에 Grid 컨트롤을 만들었다는 것을 알 수 있습니다. Grid는 WPF 패널 중 하나이며, 모든 패널 또는 컨트롤이 될 수 있지만 Window에는 자식 컨트롤이 하나만 있을 수 있으므로 여러 자식 컨트롤을 포함할 수 있는 Panel을 선택하는 것이 좋습니다. 이 자습서의 뒷부분에서는 WPF에서 매우 중요하므로 사용할 수 있는 다양한 유형의 패널에 대해 훨씬 자세히 살펴보겠습니다.

Important Window properties
WPF Window 클래스에는 응용 프로그램 창의 모양과 동작을 제어하기 위해 설정할 수 있는 여러 가지 흥미로운 특성이 있습니다. 다음은 가장 흥미로운 것들의 짧은 목록입니다.

Icon - 일반적으로 창 제목의 왼쪽에 있는 왼쪽 상단 모서리에 표시되는 창의 아이콘을 정의할 수 있습니다.

ResizeMode - 최종 사용자가 창 크기를 조정할 수 있는지 여부와 방법을 제어합니다. 기본값은 CanResize이며, 이를 통해 사용자는 최대화/최소화 단추를 사용하거나 가장자리 중 하나를 끌어 다른 창과 마찬가지로 창 크기를 조정할 수 있습니다. CanMinimize를 사용하면 사용자가 창을 최소화할 수 있지만 최대화하거나 더 크거나 작게 끌 수는 없습니다. NoResize는 최대화 및 최소화 버튼이 제거되고 창을 더 크거나 작게 드래그할 수 없는 가장 엄격한 것입니다.

ShowInTaskbar - 기본값은 true이지만 false로 설정하면 창이 Windows 작업 표시줄에 표시되지 않습니다. 기본이 아닌 창 또는 트레이로 최소화해야 하는 응용 프로그램에 유용합니다.

SizeToContent - 창의 크기를 자동으로 콘텐츠에 맞게 조정해야 하는지 여부를 결정합니다. 기본값은 수동이며, 이는 창의 크기가 자동으로 조정되지 않음을 의미합니다. 다른 옵션으로는 Width, Height 및 WidthAndHeight가 있으며 각 옵션은 창 크기를 가로, 세로 또는 둘 다 자동으로 조정합니다.

Topmos - 기본값은 false이지만 true로 설정하면 최소화하지 않는 한 창이 다른 창 위에 유지됩니다. 특별한 상황에서만 유용합니다.

WindowStartupLocation - 창의 초기 위치를 제어합니다. 기본값은 Manual이며, 이는 창의 Top 및 Left 속성에 따라 창이 처음에 배치됨을 의미합니다. 다른 옵션으로는 창을 소유자 창의 중앙에 배치하는 CenterOwner와 창을 화면 중앙에 배치하는 CenterScreen이 있습니다.

WindowState - 초기 창 상태를 제어합니다. Normal, Maximized 또는 Minimized일 수 있습니다. 기본값은 Normal이며, 창을 최대화 또는 최소화하여 시작하려는 경우를 제외하고 사용해야 합니다.

하지만 다른 속성이 많이 있으므로 직접 살펴보고 다음 장으로 넘어가십시오.

Working with App.xaml
App.xaml은 응용 프로그램의 선언적 시작 지점입니다. Visual Studio는 App.xaml.cs라는 코드 숨김 파일을 포함하여 새 WPF 응용 프로그램을 시작할 때 자동으로 만듭니다. 두 파일이 partial 클래스인 Window와 매우 유사하게 작동하며, 함께 작동하여 태그(XAML)와 코드 숨김 모두에서 작업할 수 있습니다.

App.xaml.cs는 WPF Windows 응용 프로그램의 중심 클래스인 Application 클래스를 확장합니다. NET은 시작 지침을 위해 이 클래스로 이동한 다음 거기에서 원하는 창 또는 페이지를 시작합니다. 또한 응용 프로그램 시작, 처리되지 않은 예외 등과 같은 중요한 응용 프로그램 이벤트를 구독할 수 있는 위치이기도 합니다. 나중에 자세히 설명합니다.

App.xaml 파일에서 가장 일반적으로 사용되는 기능 중 하나는 전역 스타일과 같이 응용 프로그램 전체에서 사용 및 액세스할 수 있는 전역 리소스를 정의하는 것입니다. 이에 대해서는 나중에 자세히 설명하겠습니다.

App.xaml structure
새 응용 프로그램을 만들 때 자동으로 생성된 App.xaml은 다음과 같습니다.

<Application x:Class="WpfTutorialSamples.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             StartupUri="MainWindow.xaml">
    <Application.Resources>

    </Application.Resources>
</Application>

여기서 주목해야 할 주요 사항은 StartupUri 속성입니다. 이것은 실제로 응용 프로그램이 시작될 때 시작할 Window 또는 Page를 지시하는 부분입니다. 이 경우 MainWindow.xaml이 시작되지만 다른 창을 시작점으로 사용하려는 경우 간단히 변경할 수 있습니다.

경우에 따라 첫 번째 창이 표시되는 방법과 시기를 더 세밀하게 제어해야 합니다. 이 경우 StartupUri 속성과 값을 제거한 다음 대신 코드 숨김에서 모든 작업을 수행할 수 있습니다. 이것은 아래에서 설명될 것입니다.

App.xaml.cs structure
일치하는 App.xaml.cs은 일반적으로 새 프로젝트에 대해 다음과 같습니다.

using System;
using System.Collections.Generic;
using System.Windows;

namespace WpfTutorialSamples
{
	public partial class App : Application
	{

	}
}

이 클래스가 Application 클래스를 확장하여 응용 프로그램 수준에서 작업을 수행할 수 있도록 하는 방법을 볼 수 있습니다. 예를 들어, 시작 창을 수동으로 만들 수 있는 Startup 이벤트를 구독할 수 있습니다.

예를 들면 다음과 같습니다.

<Application x:Class="WpfTutorialSamples.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
			 Startup="Application_Startup">
    <Application.Resources></Application.Resources>
</Application>

StartupUri가 Startup 이벤트에 대한 구독으로 어떻게 바뀌었는지 확인합니다(XAML을 통한 이벤트 구독은 다른 장에서 설명). 코드 숨김에서는 다음과 같이 이벤트를 사용할 수 있습니다.

using System;
using System.Collections.Generic;
using System.Windows;

namespace WpfTutorialSamples
{
	public partial class App : Application
	{

		private void Application_Startup(object sender, StartupEventArgs e)
		{
			// Create the startup window
			MainWindow wnd = new MainWindow();
			// Do stuff here, e.g. to the window
			wnd.Title = "Something else";
			// Show the window
			wnd.Show();
		}
	}
}

이 예제의 멋진 점은 StartupUri 속성을 사용하는 것과 비교했을 때 시작 창을 표시하기 전에 조작할 수 있다는 것입니다. 여기에서 우리는 그다지 유용하지 않은 제목을 변경하지만 이벤트에 가입하거나 시작 화면을 표시할 수도 있습니다. 모든 통제권을 가지면 많은 가능성이 있습니다. 이 튜토리얼의 다음 기사에서 그 중 몇 가지에 대해 자세히 살펴볼 것입니다.

Command-line parameters in WPF
명령줄 매개 변수는 시작하려는 응용 프로그램에 매개 변수 집합을 전달하여 어떻게든 영향을 줄 수 있는 기술입니다. 가장 일반적인 예는 응용 프로그램을 특정 파일(예: 편집기)로 여는 것입니다. Windows의 내장 메모장 응용 프로그램을 사용하여 직접 시도해 볼 수 있습니다(시작 메뉴에서 실행을 선택하거나 [WindowsKey-R]을 누름).

notepad.exe c:\Windows\win.ini

그러면 win.ini 파일이 열린 메모장이 열립니다(시스템에 맞게 경로를 조정해야 할 수도 있음). 메모장은 단순히 하나 또는 여러 매개 변수를 찾은 다음 이를 사용하며 응용 프로그램도 동일한 작업을 수행할 수 있습니다!

명령줄 매개 변수는 App.xaml 문서에서 구독한 Startup 이벤트를 통해 WPF 응용 프로그램에 전달됩니다. 이 예제에서도 동일한 작업을 수행한 다음 메서드 인수를 통해 전달된 값을 사용합니다. 먼저 App.xaml 파일은 다음과 같습니다.

<Application x:Class="WpfTutorialSamples.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
			 Startup="Application_Startup">
    <Application.Resources></Application.Resources>
</Application>

여기서 우리가 할 일은 StartupUri 속성을 대체하여 Startup 이벤트를 구독하는 것입니다. 그런 다음 이벤트는 App.xaml.cs 구현됩니다.

using System;
using System.Collections.Generic;
using System.Windows;

namespace WpfTutorialSamples
{
	public partial class App : Application
	{

		private void Application_Startup(object sender, StartupEventArgs e)
		{
			MainWindow wnd = new MainWindow();
			if(e.Args.Length == 1)
				MessageBox.Show("Now opening file: \n\n" + e.Args[0]);
			wnd.Show();
		}
	}
}

StartupEventArgs 는 우리가 여기서 사용하는 것입니다. e라는 이름으로 Application Startup 이벤트에 전달됩니다. 문자열의 배열인 Args 속성이 있습니다. 명령줄 매개 변수는 공백이 따옴표 붙은 문자열 내부에 있지 않는 한 공백으로 구분됩니다.

Testing the command-line parameter
위의 예제를 실행하면 명령줄 매개 변수가 지정되지 않았기 때문에 아무 일도 일어나지 않습니다. 다행히 Visual Studio를 사용하면 응용 프로그램에서 이를 쉽게 테스트할 수 있습니다. 프로젝트 메뉴에서 "[프로젝트 이름] 속성"을 선택한 다음 디버그 탭으로 이동하여 명령줄 매개 변수를 정의할 수 있습니다. 다음과 같이 표시되어야 합니다.



응용 프로그램을 실행해 보면 매개 변수에 응답하는 것을 볼 수 있습니다.

물론, 그 메시지는 그다지 유용하지 않습니다. 대신 주 창의 생성자에 전달하거나 다음과 같이 public open 메소드를 호출 할 수 있습니다.

using System;
using System.Collections.Generic;
using System.Windows;

namespace WpfTutorialSamples
{
	public partial class App : Application
	{

		private void Application_Startup(object sender, StartupEventArgs e)
		{
			MainWindow wnd = new MainWindow();
			// The OpenFile() method is just an example of what you could do with the
			// parameter. The method should be declared on your MainWindow class, where
			// you could use a range of methods to process the passed file path
			if(e.Args.Length == 1)
				wnd.OpenFile(e.Args[0]);
			wnd.Show();
		}
	}
}

Command-line possibilities
이 예에서는 정확히 하나의 인수가 있는지 테스트하고 있는 경우 이를 파일 이름으로 사용합니다. 실제 예에서는 여러 인수를 수집하고 옵션에 사용할 수도 있습니다(예: 특정 기능을 켜거나 끄는 것). 진행에 필요한 정보를 수집하는 동안 전달된 인수의 전체 목록을 반복하여 이 작업을 수행할 수 있지만 이는 이 기사의 범위를 벗어납니다.

Resources
WPF에는 데이터를 리소스로 저장하거나, 컨트롤의 경우 로컬로, 전체 창에 대해 로컬로 저장하거나, 전역적으로 저장할 수 있는 매우 편리한 개념이 도입되었습니다. 전체 응용 프로그램. 데이터는 실제 정보에서 WPF 컨트롤의 계층 구조에 이르기까지 원하는 모든 것이 될 수 있습니다. 이를 통해 배치할 수 있습니다. 데이터를 한 곳에서 사용하거나 다른 여러 곳에서 사용하면 매우 유용합니다.

이 개념은 스타일과 템플릿에 많이 사용되며, 이에 대해서는 이 튜토리얼의 뒷부분에서 설명하겠지만 이 장에서 설명하듯이 다음을 수행할 수 있습니다 다른 많은 일에도 사용하십시오. 간단한 예를 들어 설명하겠습니다.

<Window x:Class="WpfTutorialSamples.WPF_Application.ResourceSample"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:sys="clr-namespace:System;assembly=mscorlib"
        Title="ResourceSample" Height="150" Width="350">
    <Window.Resources>
        <sys:String x:Key="strHelloWorld">Hello, world!</sys:String>
    </Window.Resources>
    <StackPanel Margin="10">
        <TextBlock Text="{StaticResource strHelloWorld}" FontSize="56" />
        <TextBlock>Just another "<TextBlock Text="{StaticResource strHelloWorld}" />" example, but with resources!</TextBlock>
    </StackPanel>
</Window>



리소스에는 x:Key 특성을 사용하여 키가 지정되며, 이 키를 사용하여 응용 프로그램의 다른 부분에서 참조할 수 있습니다. StaticResource 태그 확장과 함께 사용할 수 있습니다. 이 예제에서는 간단한 문자열을 저장한 다음 두 개의 서로 다른 TextBlock 컨트롤에서 사용합니다.

StaticResource vs. DynamicResource
지금까지의 예제에서는 StaticResource 태그 확장을 사용하여 리소스를 참조했습니다. 그러나 다음과 같은 형태로 대안이 존재합니다. DynamicResource입니다.

주요 차이점은 정적 리소스는 XAML이 로드되는 지점에서 한 번만 확인된다는 것입니다. 그런 다음 리소스가 나중에 변경되는 경우 이 변경 사항은 StaticResource를 사용한 위치에 반영되지 않습니다.

반면에 DynamicResource는 실제로 필요하면 해결되고 리소스가 변경되면 다시 확인됩니다. static에 바인딩하는 것으로 생각하십시오. value vs. binding 이 값을 모니터링하고 변경 될 때마다 당신에게 보내는 함수에 바인딩 - 정확히 어떻게 작동하는지는 아니지만 제공해야합니다. 언제 무엇을 사용해야하는지에 대한 더 나은 아이디어. Dynamic resources를 사용하면 디자인 타임 동안에도 존재하지 않는 리소스를 사용할 수 있습니다 (예 : 추가하는 경우). 응용 프로그램을 시작하는 동안 코드 숨김에서.

More resource types
간단한 문자열을 공유하는 것은 쉬웠지만 훨씬 더 많은 작업을 수행할 수 있습니다. 다음 예제에서는 그라데이션 브러시와 함께 완전한 문자열 배열도 저장합니다 배경으로 사용됩니다. 이것은 당신이 자원으로 얼마나 많은 일을 할 수 있는지에 대한 꽤 좋은 아이디어를 줄 것입니다.

<Window x:Class="WpfTutorialSamples.WPF_Application.ExtendedResourceSample"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:sys="clr-namespace:System;assembly=mscorlib"
        Title="ExtendedResourceSample" Height="160" Width="300"
        Background="{DynamicResource WindowBackgroundBrush}">
    <Window.Resources>
        <sys:String x:Key="ComboBoxTitle">Items:</sys:String>

        <x:Array x:Key="ComboBoxItems" Type="sys:String">
            <sys:String>Item #1</sys:String>
            <sys:String>Item #2</sys:String>
            <sys:String>Item #3</sys:String>
        </x:Array>

        <LinearGradientBrush x:Key="WindowBackgroundBrush">
            <GradientStop Offset="0" Color="Silver"/>
            <GradientStop Offset="1" Color="Gray"/>
        </LinearGradientBrush>
    </Window.Resources>
    <StackPanel Margin="10">
        <Label Content="{StaticResource ComboBoxTitle}" />
        <ComboBox ItemsSource="{StaticResource ComboBoxItems}" />
    </StackPanel>
</Window>



이번에는 몇 가지 리소스를 추가하여 이제 창에 간단한 문자열, 문자열 배열 및 LinearGradientBrush가 포함되도록 했습니다. 이 문자열은 레이블에 사용되고, 문자열 배열은 ComboBox 컨트롤의 항목으로 사용되며, 그라데이션 브러시는 전체의 배경으로 사용됩니다 창. 따라서 보시다시피 거의 모든 것을 리소스로 저장할 수 있습니다.

Local and application wide resources
지금은 창 수준에 리소스를 저장했는데, 이는 창 전체에서 액세스할 수 있음을 의미합니다.

특정 컨트롤에 대해 지정된 리소스만 필요한 경우 창 대신 이 특정 컨트롤에 추가하여 더 로컬로 만들 수 있습니다. 잘돼요 정확히 같은 방식으로, 유일한 차이점은 이제 컨트롤 범위 내에서만 액세스 할 수 있다는 것입니다.

<StackPanel Margin="10">
    <StackPanel.Resources>
        <sys:String x:Key="ComboBoxTitle">Items:</sys:String>
    </StackPanel.Resources>
    <Label Content="{StaticResource ComboBoxTitle}" />
</StackPanel>

이 경우 StackPanel에 리소스를 추가한 다음 자식 컨트롤인 Label에서 사용합니다. StackPanel 내부의 다른 컨트롤에는 다음이 있을 수 있습니다. 이 자식 컨트롤의 자식이 액세스 할 수 있었던 것처럼 사용했습니다. 이 특정 StackPanel 외부의 컨트롤에는 그래도 액세스할 수 있습니다.

여러 창에서 리소스에 액세스할 수 있는 기능이 필요한 경우에도 이 작업이 가능합니다. App.xaml 파일에는 리소스가 포함될 수 있습니다 창 및 모든 종류의 WPF 컨트롤과 마찬가지로 App.xaml에 저장하면 모든 창 및 사용자 컨트롤에서 전역 적으로 액세스 할 수 있습니다. 프로젝트. Window에서 저장하고 사용할 때와 똑같은 방식으로 작동합니다.

<Application x:Class="WpfTutorialSamples.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:sys="clr-namespace:System;assembly=mscorlib"
             StartupUri="WPF application/ExtendedResourceSample.xaml">
    <Application.Resources>
        <sys:String x:Key="ComboBoxTitle">Items:</sys:String>
    </Application.Resources>
</Application>

WPF는 로컬 컨트롤에서 창으로, 그리고 App.xaml로 범위를 자동으로 올라가 주어진 리소스를 찾습니다.

<Label Content="{StaticResource ComboBoxTitle}" />

Resources from Code-behind
지금까지 태그 확장을 사용하여 XAML에서 직접 모든 리소스에 액세스했습니다. 그러나 물론 코드 숨김에서 리소스에 액세스 할 수 있습니다 또한 여러 상황에서 유용할 수 있습니다. 이전 예에서는 리소스를 여러 다른 위치에 저장하는 방법을 보았으므로 이 예에서는 예를 들어, 코드 숨김에서 각각 다른 범위에 저장된 세 가지 다른 리소스에 액세스합니다.

App.xaml:

<Application x:Class="WpfTutorialSamples.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:sys="clr-namespace:System;assembly=mscorlib"
             StartupUri="WPF application/ResourcesFromCodeBehindSample.xaml">
    <Application.Resources>
        <sys:String x:Key="strApp">Hello, Application world!</sys:String>
    </Application.Resources>
</Application>

Windows:

<Window x:Class="WpfTutorialSamples.WPF_Application.ResourcesFromCodeBehindSample"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:sys="clr-namespace:System;assembly=mscorlib"
        Title="ResourcesFromCodeBehindSample" Height="175" Width="250">
    <Window.Resources>
        <sys:String x:Key="strWindow">Hello, Window world!</sys:String>
    </Window.Resources>
    <DockPanel Margin="10" Name="pnlMain">
        <DockPanel.Resources>
            <sys:String x:Key="strPanel">Hello, Panel world!</sys:String>
        </DockPanel.Resources>

        <WrapPanel DockPanel.Dock="Top" HorizontalAlignment="Center" Margin="10">
            <Button Name="btnClickMe" Click="btnClickMe_Click">Click me!</Button>
        </WrapPanel>

        <ListBox Name="lbResult" />
    </DockPanel>
</Window>

Code-behind:

using System;
using System.Windows;

namespace WpfTutorialSamples.WPF_Application
{
	public partial class ResourcesFromCodeBehindSample : Window
	{
		public ResourcesFromCodeBehindSample()
		{
			InitializeComponent();
		}

		private void btnClickMe_Click(object sender, RoutedEventArgs e)
		{
			lbResult.Items.Add(pnlMain.FindResource("strPanel").ToString());
			lbResult.Items.Add(this.FindResource("strWindow").ToString());
			lbResult.Items.Add(Application.Current.FindResource("strApp").ToString());
		}
	}
}



따라서 여기에서 볼 수 있듯이 세 개의 서로 다른 "Hello, world!" 메시지를 저장하는데, 하나는 App.xaml에, 다른 하나는 창 내부에, 다른 하나는 메인 패널에 대해 로컬에 저장됩니다. 이 인터페이스는 Button과 ListBox로 구성됩니다.

코드 숨김에서는 스크린샷에서 볼 수 있듯이 각 텍스트 문자열을 ListBox에 추가하는 단추의 클릭 이벤트를 처리합니다. FindResource() 메서드를 사용하여 리소스를 개체(있는 경우)로 반환한 다음 이를 알고 있는 문자열로 바꿉니다 ToString() 메서드를 사용합니다.

FindResource() 메소드를 다른 범위에서 사용하는 방법에 주목하십시오 - 처음에는 패널에서, 그 다음에는 창에서, 그 다음에는 현재 Application 객체에서. 우리가 알고 있는 리소스를 찾는 것은 의미가 있지만 이미 언급했듯이 리소스를 찾을 수 없는 경우 검색은 계층 구조를 따라 진행되므로 원칙적으로 세 가지 경우 모두에서 패널에서 FindResource() 메소드를 사용할 수 있습니다. 창까지 계속하고 나중에 찾을 수 없는 경우 응용 프로그램 수준까지 계속합니다.

반대의 경우도 마찬가지입니다 - 검색은 트리를 탐색하지 않으므로 응용 프로그램 수준에서 리소스를 찾기 시작할 수 없습니다. 컨트롤 또는 창에 대해 로컬로 정의된 경우.

Handling exceptions in WPF
C# 또는 WPF와 함께 사용할 수 있는 다른 .NET 언어에 익숙하다면 예외 처리가 새롭지 않을 것입니다. 예외를 발생시킬 가능성이 있는 코드 조각이 있는 경우 예외를 정상적으로 처리하려면 try-catch 블록으로 래핑해야 합니다. 예컨대 다음 예제를 참조하세요.

private void Button_Click(object sender, RoutedEventArgs e)
{
	string s = null;
	s.Trim();
}

현재 null 인 변수에 대해 Trim() 메서드를 수행하려고하기 때문에 분명히 잘못 될 것입니다. 예외를 처리하지 않으면 응용 프로그램이 충돌하고 Windows에서 문제를 처리해야 합니다. 보시다시피, 그것은 매우 사용자 친화적이지 않습니다.



이 경우 사용자는 간단하고 쉽게 피할 수 있는 오류로 인해 응용 프로그램을 닫아야 합니다. 그래서, 일이 진행될 수 있다는 것을 알고 있다면 틀리면 다음과 같이 try-catch 블록을 사용해야합니다.

private void Button_Click(object sender, RoutedEventArgs e)
{
	string s = null;
	try
	{
		s.Trim();
	}
	catch(Exception ex)
	{
		MessageBox.Show("A handled exception just occurred: " + ex.Message, "Exception Sample", MessageBoxButton.OK, MessageBoxImage.Warning);
	}
}

그러나 가장 간단한 코드에서도 예외가 발생할 수 있으며, 모든 코드 줄을 try-catch 블록으로 래핑하는 대신 WPF를 사용하면 다음과 같은 작업을 수행할 수 있습니다. 처리되지 않은 모든 예외를 전역으로 처리합니다. 이 작업은 Application 클래스의 DispatcherUnhandledException 이벤트를 통해 수행됩니다. 면 구독하면 WPF는 자신의 코드에서 처리되지 않는 예외가 발생하면 subscribing 메서드를 호출합니다. 다음은 다음을 기반으로 한 완전한 예입니다. 우리가 방금 겪은 것들 :

<Window x:Class="WpfTutorialSamples.WPF_Application.ExceptionHandlingSample"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="ExceptionHandlingSample" Height="200" Width="200">
    <Grid>
        <Button HorizontalAlignment="Center" VerticalAlignment="Center" Click="Button_Click">
            Do something bad!
        </Button>
    </Grid>
</Window>

using System;
using System.Windows;

namespace WpfTutorialSamples.WPF_Application
{
	public partial class ExceptionHandlingSample : Window
	{
		public ExceptionHandlingSample()
		{
			InitializeComponent();
		}

		private void Button_Click(object sender, RoutedEventArgs e)
		{
			string s = null;
			try
			{
				s.Trim();
			}
			catch(Exception ex)
			{
				MessageBox.Show("A handled exception just occurred: " + ex.Message, "Exception Sample", MessageBoxButton.OK, MessageBoxImage.Warning);
			}
			s.Trim();
		}
	}
}

try-catch 블록 외부에서 Trim() 메서드를 한 번 더 호출하여 첫 번째 호출은 처리되고 두 번째 호출은 처리되지 않도록 합니다. 의 경우 두 번째로, App.xaml 마법이 필요합니다.

<Application x:Class="WpfTutorialSamples.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             DispatcherUnhandledException="Application_DispatcherUnhandledException"
             StartupUri="WPF Application/ExceptionHandlingSample.xaml">
    <Application.Resources>
    </Application.Resources>
</Application>

using System;
using System.Windows;

namespace WpfTutorialSamples
{
	public partial class App : Application
	{
		private void Application_DispatcherUnhandledException(object sender, System.Windows.Threading.DispatcherUnhandledExceptionEventArgs e)
		{
			MessageBox.Show("An unhandled exception just occurred: " + e.Exception.Message, "Exception Sample", MessageBoxButton.OK, MessageBoxImage.Error);
			e.Handled = true;
		}
	}
}

 

우리는 로컬 예외와 매우 유사하게 예외를 처리하지만 메시지 상자에 약간 다른 텍스트와 이미지를 사용합니다. 또한 e.Handled를 설정했습니다. 속성을 true로 설정합니다. 이렇게 하면 WPF에 이 예외 처리가 완료되었으며 이에 대해 다른 작업을 수행할 필요가 없음을 알 수 있습니다.

Summary
예외 처리는 모든 응용 프로그램에서 매우 중요한 부분이며 다행히 WPF와 .NET을 사용하면 로컬과 로컬에서 예외를 매우 쉽게 처리할 수 있습니다. 세계적 으로. 타당할 때 예외를 로컬에서 처리해야 하며, 로컬 처리가 허용하기 때문에 전역 처리를 대체 메커니즘으로만 사용해야 합니다 더 구체적이고 더 전문적인 방식으로 문제를 처리합니다.

Application Culture / UICulture
예를 들어 이 자습서에 있는 기사 중 하나로 인해 WPF 응용 프로그램에서 숫자 또는 날짜를 약간 사용한 경우 숫자와 날짜가 컴퓨터에서 사용되는 형식과 일치하는 형식으로 자동으로 표시된다는 멋진 사실을 발견했을 것입니다. 영어권 국가에 살고 있다면 이것이 큰 일처럼 보이지 않을 수 있지만 날짜 및/또는 숫자가 다르게 표시되는 많은 국가 중 하나에 살고 있다면 정말 멋집니다.

그리고 "숫자와 날짜와 같은 간단한 서식을 지정할 때 그렇게 많은 차이가 없을 수 있습니까?"라고 생각한다면 미국, 독일 및 스웨덴에서 선호하는 방식에 따라 동일한 숫자와 동일한 날짜의 서식을 지정한이 샘플 앱을 살펴 보는 것이 좋습니다.



보시다시피 숫자와 날짜가 표시되는 방식에는 많은 미묘한 차이가 있습니다. 좋은 소식은 .NET 프레임워크가 많은 도움을 줄 수 있다는 것입니다 - 사실 이미 많은 도움을 주고 있습니다: 기본적으로 날짜와 숫자는 응용 프로그램이 실행되는 컴퓨터의 시스템 설정에 따라 형식이 지정됩니다. 나쁜 소식은 이 동작이 항상 원하는 것은 아닐 수도 있다는 것입니다. 그러나 걱정하지 마십시오-이것을 쉽게 변경할 수 있습니다. 이 모든 것은 CultureInfo 클래스의 사용과 관련이 있으며, 이에 대한 자세한 내용은 CultureInfo에 대한 C# 자습서 문서에서 확인할 수 있습니다. 지금은 이러한 기술을 WPF 응용 프로그램에 적용하는 방법에 대해 설명하겠습니다.소프트웨어 개발

Ad-hoc formatting
특정 정보(예: 단일 Label 컨트롤의 내용)에 대해서만 서식을 적용해야 하는 경우 ToString() 메서드와 CultureInfo 클래스의 조합을 사용하여 즉석에서 이 작업을 쉽게 수행할 수 있습니다. 예를 들어, 위의 예에서는 다음과 같이 다른 문화권 기반 서식을 적용했습니다.

double largeNumber = 123456789.42;

CultureInfo usCulture = new CultureInfo("en-US");
CultureInfo deCulture = new CultureInfo("de-DE");
CultureInfo seCulture = new CultureInfo("sv-SE");

lblNumberUs.Content = largeNumber.ToString("N2", usCulture);
lblNumberDe.Content = largeNumber.ToString("N2", deCulture);
lblNumberSe.Content = largeNumber.ToString("N2", seCulture);

몇 군데에서 특별한 서식이 필요한 경우도 있지만 일반적으로 응용 프로그램에서 시스템 설정(기본값)을 사용해야 하는지 또는 전체 응용 프로그램에 대한 특정 문화권 설정으로 이 동작을 재정의해야 하는지 여부를 결정해야 합니다.

CurrentCulture & CurrentUICulture
WPF 응용 프로그램에 다른 culture를 적용하는 것은 매우 쉽습니다. 잠재적으로 Thread 클래스의 CurrentThread 속성에 있는 두 가지 특성인 CurrentCulture 및 CurrentUICulture를 처리하게 될 것입니다. 하지만 차이점은 무엇일까요?

CurrentCulture 속성은 숫자와 날짜 등의 서식을 지정하는 방법을 제어하는 속성입니다. 기본값은 응용 프로그램을 실행하는 컴퓨터의 운영 체제에서 가져오며 운영 체제에서 사용하는 언어와 독립적으로 변경할 수 있습니다. 예를 들어, 독일에 거주하는 사람이 인터페이스 언어로 영어를 사용하여 Windows를 설치하면서 숫자와 날짜에 대한 독일어 표기법을 선호하는 것은 매우 일반적입니다. 이와 같은 상황에서 CurrentCulture 속성은 기본적으로 독일어로 설정됩니다.

CurrentUICulture 속성은 인터페이스에서 사용해야 하는 언어를 지정합니다. 이는 응용 프로그램이 여러 언어를 지원하는 경우(예: 언어 리소스 파일 사용)에만 관련이 있습니다. 다시 한 번, 이를 통해 언어에 대해 하나의 문화(예: 영어)를 사용하는 동시에 숫자, 날짜 등의 입력/출력을 처리할 때 다른 문화(예: 독일어)를 사용할 수 있습니다.

Changing the application Culture
이를 염두에 두고 이제 CurrentCulture 및/또는 CurrentUICulture를 변경할지 여부를 결정해야 합니다. 원할 때마다 거의 모든 작업을 수행할 수 있지만, 응용 프로그램을 시작할 때 수행하는 것이 가장 합리적입니다 - 그렇지 않으면 일부 출력이 전환 전에 기본 문화권으로 이미 생성되었을 수 있습니다. 다음은 WPF 응용 프로그램의 App.xaml.cs 파일에서 사용할 수 있는 Application_Startup() 이벤트에서 Culture와 UICulture를 변경하는 예제입니다.

private void Application_Startup(object sender, StartupEventArgs e)
{
    Thread.CurrentThread.CurrentCulture = new CultureInfo("de-DE");
    Thread.CurrentThread.CurrentUICulture = new CultureInfo("en-US");
}

Thread 클래스와 CultureInfo를 사용하므로 필요한 네임스페이스가 아직 없는 경우 파일에 추가하는 것을 잊지 마십시오.

using System.Threading;
using System.Globalization;

이를 통해 숫자와 날짜는 이제 독일어(de-DE)에서 선호하는 방식에 따라 형식이 지정됩니다. 앞서 언급했듯이 응용 프로그램이 여러 언어를 지원하지 않는 경우 UICulture의 문화권을 정의하는 줄(마지막 줄)을 생략할 수 있습니다.

Application_Startup 이벤트 중에 또는 주 창의 생성자에서 늦어도 문화권을 변경하는 것이 가장 적합한데, 이미 생성된 값은 CurrentCulture 속성을 변경할 때 자동으로 업데이트되지 않기 때문입니다. 그렇다고 해서 이 작업을 수행할 수 없다는 의미는 아니며, 다음 예제에서 볼 수 있듯이 출력이 CurrentCulture 속성에 의해 어떻게 영향을 받는지를 보여 주는 좋은 예이기도 합니다.

<Window x:Class="WpfTutorialSamples.WPF_Application.ApplicationCultureSwitchSample"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:local="clr-namespace:WpfTutorialSamples.WPF_Application"
    mc:Ignorable="d"
    Title="ApplicationCultureSwitchSample" Height="200" Width="320">
    <StackPanel Margin="20">
    <Grid>
        <Grid.RowDefinitions>
        <RowDefinition Height="Auto" />
        <RowDefinition Height="Auto" />
        </Grid.RowDefinitions>
        <Grid.ColumnDefinitions>
        <ColumnDefinition Width="*" />
        <ColumnDefinition Width="*" />
        </Grid.ColumnDefinitions>
        <Label>Number:</Label>
        <Label Name="lblNumber" Grid.Column="1" />
        <Label Grid.Row="1">Date:</Label>
        <Label Name="lblDate" Grid.Row="1" Grid.Column="1" />
    </Grid>
    <StackPanel Orientation="Horizontal" HorizontalAlignment="Center" Margin="0,20">
        <Button Tag="en-US" Click="CultureInfoSwitchButton_Click" HorizontalContentAlignment="Stretch">English (US)</Button>
        <Button Tag="de-DE" Click="CultureInfoSwitchButton_Click" HorizontalContentAlignment="Stretch" Margin="10,0">German (DE)</Button>
        <Button Tag="sv-SE" Click="CultureInfoSwitchButton_Click" HorizontalContentAlignment="Stretch">Swedish (SE)</Button>
    </StackPanel>
    </StackPanel>
</Window>

using System;  
using System.Globalization;  
using System.Threading;  
using System.Windows;  
using System.Windows.Controls;  

namespace WpfTutorialSamples.WPF_Application  
{  
    public partial class ApplicationCultureSwitchSample : Window  
    {  
    public ApplicationCultureSwitchSample()  
    {  
        InitializeComponent();          
    }  

    private void CultureInfoSwitchButton_Click(object sender, RoutedEventArgs e)  
    {  
        Thread.CurrentThread.CurrentCulture = new CultureInfo((sender as Button).Tag.ToString());          
        lblNumber.Content = (123456789.42d).ToString("N2");  
        lblDate.Content = DateTime.Now.ToString();  
    }  
    }  
}

흥미로운 부분은 CultureInfoSwitchButton_Click 이벤트에서 찾을 수 있는데, 여기서 클릭된 단추에 따라 CurrentCulture를 설정한 다음 숫자와 날짜가 포함된 두 레이블을 업데이트합니다.



Culture & Threads: The DefaultThreadCurrentCulture property
응용 프로그램에서 스레드를 두 개 이상 사용하는 경우 DefaultThreadCurrentCulture 속성을 사용하는 것이 좋습니다. .NET Framework 버전 4.5에 도입된 CultureInfo 클래스에서 찾을 수 있으며 현재 스레드뿐만 아니라 향후 스레드에서도 동일한 문화권을 사용하도록 합니다. 예를 들어 Application_Startup 이벤트에서 다음과 같이 사용할 수 있습니다.소프트웨어 개발

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("de-DE");

그렇다면 CurrentCulture 속성과 DefaultThreadCurrentCulture 속성을 모두 설정해야 할까요? CurrentCulture 속성을 아직 변경하지 않은 경우 DefaultThreadCurrentCulture 속성 설정이 CurrentCulture 속성에도 적용됩니다. 즉, 응용 프로그램에서 여러 스레드를 사용할 계획이라면 CurrentCulture 대신 DefaultThreadCurrentCulture를 사용하는 것이 합리적이며 모든 시나리오를 처리합니다.

Summary
WPF 응용 프로그램의 문화를 다루는 것은 매우 중요하지만 다행스럽게도 WPF는 즉시 사용할 수 있는 많은 작업을 수행할 것입니다. 기본 동작을 변경해야 하는 경우 이 기사의 수많은 예제에 나와 있는 것처럼 CurrentCulture 및 CurrentUICulture 속성을 사용하면 매우 쉽습니다.

Basic controls
The TextBlock control
The TextBlock control - Inline formatting
The Label control
The TextBox control
The Button control
The CheckBox control
The RadioButton control
The PasswordBox control
The Image control
Control concepts
Control ToolTips
WPF text rendering
Tab Order
Access Keys
Panels
Introduction to WPF panels
The Canvas control
The WrapPanel control
The StackPanel control
The DockPanel control
The Grid Control
The Grid - Rows & columns
The Grid - Units
The Grid - Spanning
The GridSplitter
Using the Grid: A contact form
UserControls & CustomControls
Introduction
Creating & using a UserControl
Data binding
Introduction to WPF data binding
Hello, bound world!
Using the DataContext
Data binding via Code-behind
The UpdateSourceTrigger property
Responding to changes
Value conversion with IValueConverter
The StringFormat property
Debugging data bindings
Commands
Introduction to WPF Commands
Using WPF commands
Implementing a custom WPF Command
Dialogs
The MessageBox
The OpenFileDialog
The SaveFileDialog
The other dialogs
Creating a custom input dialog
Common interface controls
The WPF Menu control
The WPF ContextMenu
The WPF ToolBar control
The WPF StatusBar control
The Ribbon control
Rich Text controls
Introduction to WPF Rich Text controls
The FlowDocumentScrollViewer control
The FlowDocumentPageViewer control
The FlowDocumentReader control
Creating a FlowDocument from Code-behind
Advanced FlowDocument content
The RichTextBox control
How-to: Creating a Rich Text Editor
Misc. controls
The Border control
The Slider control
The ProgressBar control
The WebBrowser control
The WindowsFormsHost control
The GroupBox control
The Calendar control
The DatePicker control
The Expander control
The TabControl
Using the WPF TabControl
WPF TabControl: Tab positions
WPF TabControl: Styling the TabItems
List controls
The ItemsControl
The ListBox control
The ComboBox control
The ListView control
Introduction to the ListView control
A simple ListView example
ListView, data binding and ItemTemplate
ListView with a GridView
How-to: ListView with left aligned column names
ListView grouping
ListView sorting
How-to: ListView with column sorting
ListView filtering
The TreeView control
TreeView introduction
A simple TreeView example
TreeView, data binding and multiple templates
TreeView - Selection/Expansion state
Lazy loading TreeView items
The DataGrid control
The DataGrid control
DataGrid columns
DataGrid with row details
Styles
Introduction to WPF styles
Using WPF styles
Trigger, DataTrigger & EventTrigger
WPF MultiTrigger and MultiDataTrigger
Trigger animations
Audio & Video
Playing audio
Playing video
How-to: Creating a complete Audio/Video player
Speech synthesis (making WPF talk)
Speech recognition (making WPF listen)
Misc.
The DispatcherTimer
Multi-threading with the BackgroundWorker
Cancelling the BackgroundWorker
Creating a Game: SnakeWPF
Introduction
Creating the game area
Creating & moving the Snake
Continuous movement with DispatcherTimer
Adding food for the Snake
Controlling the Snake
Collision Detection
Improving SnakeWPF: Making it look more like a game
Improving SnakeWPF: Adding a high score list
Improving SnakeWPF: Adding sound
Full game & final words
