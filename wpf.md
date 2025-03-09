# The complete WPF tutorial
현재 126개의 문서로 구성된 이 WPF 자습서에 오신 것을 환영합니다. 여기서 WPF  UI 프레임워크를 사용하여 고유한 애플리케이션을 만드는 방법을 알아봅니다. WPF를 처음 사용하는 경우 첫 번째 장부터 시작하여 모든 장을 읽는 것이 좋습니다.

모든 챕터가 나열된 오른쪽의 목차를 살펴보고 계속해서 새로운 챕터를 추가할 것이므로 정기적으로 다시 방문하시기 바랍니다. 이 자습서를 통해 WPF를 제대로 시작할 수 있기를 바랍니다.

WPF 사용 방법을 배울 때 C#에 대한 기본 지식이 권장됩니다. C#에 대해 잘 모르는 경우 C# 자습서를 통해 더 잘 이해할 수 있습니다. XAML 및 스타일링에 대한 항목을 수행하는 동안 HTML 및 CSS에 대한 올바른 이해도 얻을 수 있습니다.

이 튜토리얼이 마음에 드셨기를 바라며, 마음에 드셨다면 웹사이트에서 링크를 걸어 저희를 도와주시고 Facebook 및 Twitter와 같은 소셜 미디어에서 친구들과 공유해 주십시오. 누리다!



# About WPF
## What is WPF?
WPF(Windows Presentation Foundation)는 GUI  프레임워크에 대한 Microsoft의 최신 접근 방식으로, .  NET 프레임워크입니다.

그러나 GUI 프레임 워크는 무엇입니까? GUI는 Graphical User Interface의 약자이며, 아마도 지금 이 페이지를 보고 계실 것입니다. Windows에는 컴퓨터 작업을 위한 GUI가 있으며, 이 문서를 읽고 있을 가능성이 있는 브라우저에는 웹 서핑을 할 수 있는 GUI가 있습니다.

GUI 프레임워크를 사용하면 레이블, 텍스트 상자 및 기타 잘 알려진 요소와 같은 다양한 GUI 요소가 있는 응용 프로그램을 만들 수 있습니다. GUI 프레임워크가 없으면 이러한 요소를 수동으로 그리고 텍스트 및 마우스 입력과 같은 모든 사용자 상호 작용 시나리오를 처리해야 합니다. 이것은 많은 작업이므로 대신 대부분의 개발자는 모든 기본 작업을 수행하고 개발자가 훌륭한 응용 프로그램을 만드는 데 집중할 수 있도록 하는 GUI 프레임워크를 사용합니다.

많은 GUI 프레임워크가 있지만 .NET 개발자에게 가장 흥미로운 프레임워크는 현재 WinForms와 WPF입니다. WPF는 최신 버전이지만 Microsoft는 여전히 WinForms를 유지 관리하고 지원하고 있습니다. 다음 장에서 볼 수 있듯이 두 프레임워크 사이에는 몇 가지 차이점이 있지만 목적은 동일합니다.

다음 장에서는 WinForms와 WPF의 차이점을 살펴보겠습니다.


## WPF vs. WinForms
이전 장에서 WPF가 무엇인지, WinForms에 대해 조금 이야기했습니다. 이 장에서 나는 둘을 비교하려고 노력할 것인데, 그 이유는 그들이 같은 목적을 수행하지만 그들 사이에는 많은 차이점이 있기 때문입니다. 이전에 WinForms로 작업한 적이 없고 특히 WPF가 첫 번째 GUI 프레임워크인 경우 이 장을 건너뛸 수 있지만 차이점에 관심이 있다면 계속 읽으십시오.

WinForms와 WPF의 가장 중요한 차이점은 WinForms는 단순히 표준 Windows 컨트롤(예: TextBox) 위에 있는 계층인 반면 WPF는 처음부터 빌드되며 거의 모든 상황에서 표준 Windows 컨트롤에 의존하지 않는다는 사실입니다. 이것은 미묘한 차이처럼 보일 수 있지만 실제로는 그렇지 않으므로 Win32/WinAPI에 의존하는 프레임워크로 작업한 적이 있다면 확실히 알 수 있습니다.

이에 대한 좋은 예는 이미지와 텍스트가 있는 버튼입니다. 이것은 표준 Windows 컨트롤이 아니므로 WinForms는 즉시 이러한 가능성을 제공하지 않습니다. 대신 이미지를 직접 그리거나, 이미지를 지원하는 고유한 버튼을 구현하거나, 제3자 컨트롤을 사용해야 합니다. WPF를 사용하면 버튼은 본질적으로 콘텐츠와 다양한 상태 (예 : 손대지 않은, 호버링, 눌림)와의 경계이기 때문에 무엇이든 포함 할 수 있습니다. WPF 버튼은 대부분의 다른 WPF 컨트롤과 마찬가지로 "모양이 없는" 것이므로 그 안에 다양한 다른 컨트롤을 포함할 수 있습니다. 이미지와 텍스트가 있는 버튼을 원하십니까? 단추 안에 Image와 TextBlock 컨트롤을 넣기만 하면 됩니다. 표준 WinForms 컨트롤에서는 이러한 종류의 유연성을 얻을 수 없기 때문에 이미지가있는 버튼 등과 같은 컨트롤의 다소 간단한 구현에 대한 큰 시장이 있습니다.

이 유연성의 단점은 WinForms가 필요한 시나리오를 위해 만들어졌기 때문에 WinForms로 매우 쉬운 것을 달성하기 위해 때때로 더 열심히 일해야 한다는 것입니다. 적어도 처음에는 WinForms ListViewItem 이 한 줄의 코드로 수행하는 이미지와 멋지게 정렬 된 텍스트로 ListView 를 만드는 템플릿을 만드는 느낌입니다.

이것은 단지 하나의 차이점 일 뿐이지만 WPF로 작업하면서 WPF는 단순히 좋든 나쁘든 자신의 방식으로 일을하는 다른 많은 차이점의 근본적인 이유라는 것을 깨닫게 될 것입니다. 더 이상 Windows 방식으로 작업을 수행하는 데 얽매이지 않지만, 이러한 종류의 유연성을 얻기 위해 Windows 방식으로 작업을 수행하려는 경우 조금 더 많은 작업을 수행해야 합니다.

다음은 WPF 및 WinForms의 주요 이점에 대한 완전히 주관적인 목록입니다. 그것은 당신이 무엇을 하고 있는지에 대한 더 나은 아이디어를 줄 것입니다.

### WPF의 장점
- 더 새롭기 때문에 현재 표준과 더 잘 어울립니다
- Microsoft는 Visual Studio와 같은 많은 새로운 응용 프로그램에 사용하고 있습니다
- 더 유연하므로 새 컨트롤을 작성하거나 구입할 필요 없이 더 많은 작업을 수행할 수 있습니다
- 제 3 자 컨트롤을 사용해야하는 경우 이러한 컨트롤의 개발자는 WPF가 최신 버전이기 때문에 WPF에 더 집중할 것입니다
XAML을 사용하면 GUI를 쉽게 만들고 편집할 수 있으며 디자이너(XAML)와 프로그래머(C#, VB.NET 등) 간에 작업을 분할할 수 있습니다.
- 데이터 바인딩 - 데이터와 레이아웃을 보다 깔끔하게 분리할 수 있습니다.
- 성능 향상을 위해 GUI를 그리기 위해 하드웨어 가속을 사용합니다.
- Windows 응용 프로그램과 웹 응용 프로그램(Silverlight/XBAP) 모두에 대한 사용자 인터페이스를 만들 수 있습니다

### WinForms의 장점
- 그것은 더 오래되었기 때문에 더 많은 시도와 테스트를 거쳤습니다
- 이미 많이 있습니다.rd 당신이 사거나 무료로 얻을 수 있는 파티 컨트롤
- Visual Studio의 디자이너는 WPF를 사용하여 더 많은 작업을 직접 수행해야하는 WPF보다 WinForms에 더 적합합니다

# Getting started:

## Visual Studio Community
WPF는 이미 설명했듯이 XAML (마크 업)과 C # / VB.NET / 기타 .  NET 언어에서 사용할 수 있습니다. 이 모든 것은 Windows에 포함된 메모장을 포함한 모든 텍스트 편집기에서 편집한 다음 명령줄에서 컴파일할 수 있습니다. 그러나 대부분의 개발자는 코드 작성에서 인터페이스 설계 및 컴파일에 이르기까지 모든 것을 훨씬 쉽게 만들기 때문에 IDE(통합 개발 환경)를 사용하는 것을 선호합니다.

.NET/WPF IDE에 대해 선호되는 선택은 Visual Studio이지만 비용이 많이 듭니다. 운 좋게도 Microsoft는 모든 사람이 .NET 및 WPF를 쉽고 무료로 시작할 수 있도록 하여 Visual Studio Community라는 무료 버전의 Visual Studio를 만들었습니다. 이 버전에는 실제 Visual Studio보다 기능이 약간 적지만 WPF를 배우고 실제 응용 프로그램을 만드는 데 필요한 모든 것이 포함되어 있습니다.

따라서 Microsoft에서 Visual Studio Community를 다운로드하십시오 - 무료이며 쉽게 설치하고 사용할 수 있습니다.

https://www.visualstudio.com/vs/community/

다운로드 및 설치가 완료되면 다음 문서를 클릭하여 WPF 학습 프로세스를 시작하십시오!


## Hello, WPF!
거의 모든 프로그래밍 자습서에서 첫 번째이자 매우 고전적인 예는 "Hello, world!" 예제이지만 이 자습서에서는 대신 "Hello, WPF!"로 변경합니다. 목표는 단순히 이 텍스트를 화면에 표시하여 시작하는 것이 얼마나 쉬운지 보여주는 것입니다.

이 자습서의 나머지 부분에서는 IDE, 가급적이면 Visual Studio 또는 Visual Studio Community가 설치되어 있다고 가정합니다(가져오는 방법에 대한 지침은 이전 문서 참조). 다른 제품을 사용하는 경우 제품에 맞게 지침을 조정해야 합니다.

Visual Studio의 파일  메뉴에서 새 프로젝트를 선택하여 시작합니다. 왼쪽에는 카테고리 트리가 있어야 합니다. 이 자습서에서는 코드가 포함될 때마다 C#에 중점을 두므로 템플릿 목록에서 선택해야 하며, Windows 응용 프로그램을 만들 것이므로 트리에서 Windows를 선택해야 합니다. 그러면 WPF 응용 프로그램을 선택해야 하는 오른쪽에 사용 가능한 Windows 응용 프로그램 유형 목록이 표시됩니다. 이름 텍스트 필드에 프로젝트 이름을 "HelloWPF"로 지정했습니다. 대화 상자 하단의 나머지 설정이 정상인지 확인한 다음 확인 버튼을 누릅니다.

새 프로젝트에는 몇 개의 파일이 있지만 지금은 그 중 하나인 MainWindow.xaml에 대해서만 집중적으로 설명하겠습니다. 이것은 응용 프로그램 기본 창이며, 특별히 변경하지 않는 한 응용 프로그램을 시작할 때 먼저 표시되는 창입니다. 여기에 있는 XAML 코드(XAML은 이 자습서의 다른 장에서 자세히 설명함)는 다음과 같습니다.

```csharp
<Window x:Class="WpfApplication1.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    Title="MainWindow" Height="350" Width="525">
    <Grid>

    </Grid>
</Window>
```

이것은 Visual Studio에서 창에 대해 만드는 기본 XAML이며, 모든 부분은 XAML 및 "창"에 대한 장에서 설명합니다. 지금 실제로 응용 프로그램을 실행하면(디버그 -> 디버깅 시작을 선택하거나 F5 키를 누름) 현재 응용 프로그램이 구성되어 있는 빈 창을 볼 수 있지만 이제 화면에 메시지를 표시할 차례입니다.

이를 위해 TextBlock 컨트롤을 Grid 패널에 추가하고 앞서 언급한 메시지를 콘텐츠로 사용합니다.

```c#
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
```

지금 응용 프로그램을 실행 해 보시고 (디버그 -> 디버깅 시작을 선택하거나 F5 키를 누름) 첫 번째 WPF 응용 프로그램을 통해 노력의 아름다운 결과를 확인하십시오.

![](./_image/2025-03-09-21-23-02.jpg)

TextBlock에서 세 가지 다른 특성을 사용하여 창 중간에 사용자 지정 정렬을 얻었고 FontSize 속성을 사용하여 더 큰 텍스트를 얻었음을 알 수 있습니다. 이러한 모든 개념은 이후 기사에서 다룰 것입니다.

여기까지 오신 것을 축하드립니다. 이제 자습서의 나머지 부분을 읽으면 곧 WPF를 마스터하게 될 것입니다!








# XAML
## What is XAML?
## Basic XAML
## Events in XAML

# A WPF application
## A WPF Application - Introduction
## The Window
## Working with App.xaml
## Command-line parameters in WPF
## Resources
## Handling exceptions in WPF
## Application Culture / UICulture


# Basic controls
## The TextBlock control
## The TextBlock control - Inline formatting
## The Label control
## The TextBox control
## The Button control
## The CheckBox control
## The RadioButton control
## The PasswordBox control
## The Image control


# Control concepts
## Control ToolTips
## WPF text rendering
## Tab Order
## Access Keys

# Panels
## Introduction to WPF panels
## The Canvas control
## The WrapPanel control
## The StackPanel control
## The DockPanel control
## The Grid Control
## The Grid - Rows & columns
## The Grid - Units
## The Grid - Spanning
## The GridSplitter
## Using the Grid: A contact form

# UserControls & CustomControls
## Introduction
## Creating & using a UserControl


# Data binding
## Introduction to WPF data binding
## Hello, bound world!
## Using the DataContext
## Data binding via Code-behind
## The UpdateSourceTrigger property
## Responding to changes
## Value conversion with IValueConverter
## The StringFormat property
## Debugging data bindings

# Commands
## Introduction to WPF Commands
## Using WPF commands
## Implementing a custom WPF Command


# Dialogs
## The MessageBox
## The OpenFileDialog
## The SaveFileDialog
## The other dialogs
## Creating a custom input dialog


# Common interface controls
## The WPF Menu control
## The WPF ContextMenu
## The WPF ToolBar control
## The WPF StatusBar control
## The Ribbon control


# Rich Text controls
## Introduction to WPF Rich Text controls
## The FlowDocumentScrollViewer control
## The FlowDocumentPageViewer control
## The FlowDocumentReader control
## Creating a FlowDocument from Code-behind
## Advanced FlowDocument content
## The RichTextBox control
## How-to: Creating a Rich Text Editor


# Misc. controls
## The Border control
## The Slider control
## The ProgressBar control
## The WebBrowser control
## The WindowsFormsHost control
## The GroupBox control
## The Calendar control
## The DatePicker control
## The Expander control


# The TabControl
## Using the WPF TabControl
## WPF TabControl: Tab positions
## WPF TabControl: Styling the TabItems


# List controls
## The ItemsControl
## The ListBox control
## The ComboBox control


# The ListView control
## Introduction to the ListView control
## A simple ListView example
## ListView, data binding and ItemTemplate
## ListView with a GridView
## How-to: ListView with left aligned column names
## ListView grouping
## ListView sorting
## How-to: ListView with column sorting
## ListView filtering


# The TreeView control
## TreeView introduction
## A simple TreeView example
## TreeView, data binding and multiple templates
## TreeView - Selection/Expansion state
## Lazy loading TreeView items


# The DataGrid control
## The DataGrid control
## DataGrid columns
## DataGrid with row details


# Styles
## Introduction to WPF styles
## Using WPF styles
## Trigger, DataTrigger & EventTrigger
## WPF MultiTrigger and MultiDataTrigger
## Trigger animations


# Audio & Video
## Playing audio
## Playing video
## How-to: Creating a complete Audio/Video player
## Speech synthesis (making WPF talk)
## Speech recognition (making WPF listen)


# Misc.
## The DispatcherTimer
## Multi-threading with the BackgroundWorker
## Cancelling the BackgroundWorker


# Creating a Game: SnakeWPF
## Introduction
## Creating the game area
## Creating & moving the Snake
## Continuous movement with DispatcherTimer
## Adding food for the Snake
## Controlling the Snake
## Collision Detection
## Improving SnakeWPF: Making it look more like a game
## Improving SnakeWPF: Adding a high score list
## Improving SnakeWPF: Adding sound
## Full game & final words




















































































