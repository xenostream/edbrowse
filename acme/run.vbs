Set WshShell = CreateObject("WScript.Shell")

WshShell.CurrentDirectory = CreateObject("Scripting.FileSystemObject").GetAbsolutePathName(".")

WshShell.Environment("PROCESS")("HOME") = WshShell.CurrentDirectory
WshShell.Environment("PROCESS")("acmeshell") = "C:/Util/9pm/bin/rcsh.exe"
WshShell.Environment("PROCESS")("SHELL") = "C:/Util/9pm/bin/rcsh.exe"
WshShell.Environment("PROCESS")("font") = "Sarasa-Mono-K-Nerd-Font-Regular/13a/font"

WshShell.Run """C:/Util/9pm/bin/acme.exe"" -a", 0, False