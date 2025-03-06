# SED — A Non-interactive Text Editor

<br><br>
*Lee E. McMahon*
<br><br>

**ABSTRACT**
<br>

Sed는 UNIX 운영 체제에서 실행되는 비대화형 (*non-interactive*) 텍스트 편집기입니다.

Sed는 다음과 같은 세 가지 경우에 유용하도록 설계되었습니다:

1) 너무 커서 대화형 편집이 불편한 파일을 편집하는 경우;
1) 편집 명령의 순서가 너무 복잡하여 대화형 모드에서 편안하게 입력할 수 없는 경우 모든 크기의 파일을 편집합니다.
1) 한 번의 입력으로 여러 '전역' 편집 기능을 효율적으로 수행합니다.

이 문서는 SED 사용자를 위한 매뉴얼입니다.


# Introduction
Sed는 다음과 같은 세 가지 경우에 유용하도록 설계된 `비대화형 텍스트 편집기` 입니다:

1) 너무 커서 대화형 편집이 불편한 파일을 편집하는 경우;
1) 편집 명령의 순서가 너무 복잡하여 대화형 모드에서 편안하게 입력할 수 없는 경우 모든 크기의 파일을 편집합니다.
1) 한 번의 입력으로 여러 '전역' 편집 기능을 효율적으로 수행합니다.

Since only a few lines of the input reside in core at one time, and no temporary files are used, the effective
size of file that can be edited is limited only by the requirement that the input and output fit simultaneously
into available secondary storage.
한 번에 몇 줄의 입력만 코어에 상주하고 임시 파일을 사용하지 않으므로 편집할 수 있는 파일의유효 크기는 입력과 출력이 사용 가능한 보조 저장소에동시에 들어맞는다는 조건에 의해서만 제한됩니다.

Complicated editing scripts can be created separately and given to sed as a command file. For complex
edits, this saves considerable typing, and its attendant errors. Sed running from a command file is much
more efficient than any interactive editor known to the author, even if that editor can be driven by a pre-
written script.
복잡한 편집 스크립트는 별도로 생성하여 sed에 명령 파일로 제공할 수 있습니다. 복잡한 편집의 경우 이렇게 하면 상당한 타이핑과 그에 따른 오류를 줄일 수 있습니다. 
미리 작성된 스크립트로 편집기를 구동할 수 있더라도명령 파일에서 실행되는 Sed는 작성자가 알고 있는 어떤 대화형 편집기보다훨씬 효율적입니다.

The principal loss of functions compared to an interactive editor are lack of relative addressing (because of
the line-at-a-time operation), and lack of immediate verification that a command has done what was
intended.
대화형 편집기와 비교했을 때 가장 큰 기능 손실은 상대 주소 지정이 불가능하다는 점(한 줄씩 작업하기때문에)과 명령이 의도한대로 수행되었는지 즉시 확인할 수 없다는 점입니다.

Sed is a lineal descendant of the UNIX editor, ed. Because of the differences between interactive and non-
interactive operation, considerable changes have been made between ed and sed; ev en confirmed users of
ed will frequently be surprised (and probably chagrined), if they rashly use sed without reading Sections 2
and 3 of this document. The most striking family resemblance between the two editors is in the class of
patterns (‘regular expressions’) they recognize; the code for matching patterns is copied almost verbatim
from the code for ed, and the description of regular expressions in Section 2 is copied almost verbatim from
the UNIX Programmer’s Manual[1]. (Both code and description were written by Dennis M. Ritchie.)
Sed는 UNIX 편집기인 ed의 직계 후손입니다. 대화형과 비대화형 작업의차이로 인해 ed와 sed 사이에는 상당한 변화가 있었으며, 이 문서의 섹션 2와 3을 읽지 않고 섣불리 sed를 사용했다면 ed의사용자라면
놀랄 것입니다. (그리고 아마도 당황할 것입니다). 두 편집기 간에 가장 눈에 띄는 유사점은 인식하는 패턴('정규식')클래스입니다. 패턴을 일치시키는 코드는 ed용 코드에서거의 그대로 복사했고, 
섹션 2의 정규식에 대한 설명은 UNIX 프로그래머 매뉴얼[1]에서 거의 그대로 복사했습니다. (코드와 설명은 모두 Dennis M. Ritchie가 작성했습니다.)

# 1. Overall Operation  
Sed by default copies the standard input to the standard output, perhaps performing one or more editing
commands on each line before writing it to the output. This behavior may be modified by flags on the com-
mand line; see Section 1.1 below.
Sed는 기본적으로 표준 입력을 표준 출력으로 복사하며, 출력에 쓰기 전에 각 줄에서 하나 이상의 편집
명령을 수행할 수 있습니다. 이 동작은 명령줄의 플래그를 통해 수정할 수 있습니다 (아래 1.1절 참조).

The general format of an editing command is:

```
[address1,address2][function][arguments]
```

One or both addresses may be omitted; the format of addresses is given in Section 2. Any number of
blanks or tabs may separate the addresses from the function. The function must be present; the available
commands are discussed in Section 3. The arguments may be required or optional, according to which
function is given; again, they are discussed in Section 3 under each individual function.

Tab characters and spaces at the beginning of lines are ignored.


## 1.1. Command-line Flags
Three flags are recognized on the command line:

-n: tells sed not to copy all lines, but only those specified by p functions or p flags after s functions
(see Section 3.3);
-e: tells sed to take the next argument as an editing command;
-f: tells sed to take the next argument as a file name; the file should contain editing commands, one
to a line.


## 1.2. Order of Application of Editing Commands
Before any editing is done (in fact, before any input file is even opened), all the editing commands are com-
piled into a form which will be moderately efficient during the execution phase (when the commands are
actually applied to lines of the input file). The commands are compiled in the order in which they are
encountered; this is generally the order in which they will be attempted at execution time. The commands
are applied one at a time; the input to each command is the output of all preceding commands.

The default linear order of application of editing commands can be changed by the flow-of-control com-
mands, t and b (see Section 3). Even when the order of application is changed by these commands, it is
still true that the input line to any command is the output of any previously applied command.


## 1.3. Pattern-space
The range of pattern matches is called the pattern space. Ordinarily, the pattern space is one line of the
input text, but more than one line can be read into the pattern space by using the N command (Section 3.6.).


## 1.4. Examples
Examples are scattered throughout the text. Except where otherwise noted, the examples all assume the
following input text:

```
In Xanadu did Kubla Khan
A stately pleasure dome decree:
Where Alph, the sacred river, ran
Through caverns measureless to man
Down to a sunless sea.
```

(In no case is the output of the sed commands to be considered an improvement on Coleridge.)

Example:
The command

```
2q
```

will quit after copying the first two lines of the input. The output will be:

```
In Xanadu did Kubla Khan
A stately pleasure dome decree:
```



# 2. ADDRESSES: Selecting lines for editing
Lines in the input file(s) to which editing commands are to be applied can be selected by addresses.
Addresses may be either line numbers or context addresses.

The application of a group of commands can be controlled by one address (or address-pair) by grouping the
commands with curly braces (‘{ }’)(Sec. 3.6.).


## 2.1. Line-number Addresses
A line number is a decimal integer. As each line is read from the input, a line-number counter is incre-
mented; a line-number address matches (selects) the input line which causes the internal counter to equal
the address line-number. The counter runs cumulatively through multiple input files; it is not reset when a
new input file is opened.

As a special case, the character $ matches the last line of the last input file.


## 2.2. Context Addresses
A context address is a pattern (‘regular expression’) enclosed in slashes (‘/’). The regular expressions rec-
ognized by sed are constructed as follows:

1) An ordinary character (not one of those discussed below) is a regular expression, and matches
that character.
2) A circumflex ‘ˆ’ at the beginning of a regular expression matches the null character at the begin-
ning of a line.
3) A dollar-sign ‘$’ at the end of a regular expression matches the null character at the end of a
line.
4) The characters ‘\n’ match an imbedded newline character, but not the newline at the end of the
pattern space.
5) A period ‘.’ matches any character except the terminal newline of the pattern space.
6) A regular expression followed by an asterisk ‘*’ matches any number (including 0) of adjacent
occurrences of the regular expression it follows.
7) A string of characters in square brackets ‘[ ]’ matches any character in the string, and no others.
If, however, the first character of the string is circumflex ‘ˆ’, the regular expression
matches any character except the characters in the string and the terminal newline of the
pattern space.
8) A concatenation of regular expressions is a regular expression which matches the concatenation
of strings matched by the components of the regular expression.
9) A regular expression between the sequences ‘\(’ and ‘\)’ is identical in effect to the unadorned
regular expression, but has side-effects which are described under the s command below
and specification 10) immediately below.
10) The expression ‘\d’ means the same string of characters matched by an expression enclosed in
‘\(’ and ‘\)’ earlier in the same pattern. Here d is a single digit; the string specified is that
beginning with the dth occurrence of ‘\(’ counting from the left. For example, the
expression ‘ˆ\(.*\)\1’ matches a line beginning with two repeated occurrences of the same
string.
11) The null regular expression standing alone (e.g., ‘//’) is equivalent to the last regular expres-
sion compiled.

To use one of the special characters (ˆ $ . * [ ] \ /) as a literal (to match an occurrence of itself in the input),
precede the special character by a backslash ‘\’.

For a context address to ‘match’ the input requires that the whole pattern within the address match some
portion of the pattern space.


## 2.3. Number of Addresses
The commands in the next section can have 0, 1, or 2 addresses. Under each command the maximum num-
ber of allowed addresses is given. For a command to have more addresses than the maximum allowed is
considered an error.

If a command has no addresses, it is applied to every line in the input.
If a command has one address, it is applied to all lines which match that address.
If a command has two addresses, it is applied to the first line which matches the first address, and to all sub-
sequent lines until (and including) the first subsequent line which matches the second address. Then an
attempt is made on subsequent lines to again match the first address, and the process is repeated.

Two addresses are separated by a comma.

Examples:

```
/an/  matches lines 1, 3, 4 in our sample text
/an.*an/  matches line 1
/ˆan/  matches no lines
/./  matches all lines
/\./  matches line 5
/r*an/  matches lines 1,3, 4 (number = zero!)
/\(an\).*\1/  matches line 1
```



# 3. FUNCTIONS
All functions are named by a single character. In the following summary, the maximum number of allow-
able addresses is given enclosed in parentheses, then the single character function name, possible argu-
ments enclosed in angles (< >), an expanded English translation of the single-character name, and finally a
description of what each function does. The angles around the arguments are not part of the argument, and
should not be typed in actual editing commands.

## 3.1. Whole-line Oriented Functions
(2)d -- delete lines
The d function deletes from the file (does not write to the output) all those lines matched
by its address(es).
It also has the side effect that no further commands are attempted on the corpse of a
deleted line; as soon as the d function is executed, a new line is read from the input, and
the list of editing commands is re-started from the beginning on the new line.
(2)n -- next line
The n function reads the next line from the input, replacing the current line. The current
line is written to the output if it should be. The list of editing commands is continued fol-
lowing the n command.
(1)a\
<text> -- append lines
The a function causes the argument <text> to be written to the output after the line
matched by its address. The a command is inherently multi-line; a must appear at the
end of a line, and <text> may contain any number of lines. To preserve the one-com-
mand-to-a-line fiction, the interior newlines must be hidden by a backslash character (‘\’)
immediately preceding the newline. The <text> argument is terminated by the first
unhidden newline (the first one not immediately preceded by backslash).
Once an a function is successfully executed, <text> will be written to the output regard-
less of what later commands do to the line which triggered it. The triggering line may be
deleted entirely; <text> will still be written to the output.
The <text> is not scanned for address matches, and no editing commands are attempted
on it. It does not cause any change in the line-number counter.
(1)i\
<text> -- insert lines
The i function behaves identically to the a function, except that <text> is written to the
output before the matched line. All other comments about the a function apply to the i
function as well.
(2)c\
<text> -- change lines
The c function deletes the lines selected by its address(es), and replaces them with the
lines in <text>. Like a and i, c must be followed by a newline hidden by a backslash; and
interior new lines in <text> must be hidden by backslashes.
The c command may have two addresses, and therefore select a range of lines. If it does,
all the lines in the range are deleted, but only one copy of <text> is written to the output,
not one copy per line deleted. As with a and i, <text> is not scanned for address matches,
and no editing commands are attempted on it. It does not change the line-number
counter.
After a line has been deleted by a c function, no further commands are attempted on the
corpse.
If text is appended after a line by a or r functions, and the line is subsequently changed,
the text inserted by the c function will be placed before the text of the a or r functions.
(The r function is described in Section 3.4.)

Note: Within the text put in the output by these functions, leading blanks and tabs will disappear, as always
in sed commands. To get leading blanks and tabs into the output, precede the first desired blank or tab by a
backslash; the backslash will not appear in the output.

Example:
The list of editing commands:

```
n
a\
XXXX
d
```

applied to our standard input, produces:

```
In Xanadu did Kubhla Khan
XXXX
Where Alph, the sacred river, ran
XXXX
Down to a sunless sea.
```

In this particular case, the same effect would be produced by either of the two following command lists:

```
n n
i\  c\
XXXX  XXXX
d
```

## 3.2. Substitute Function
One very important function changes parts of lines selected by a context search within the line.

(2)s<pattern><replacement><flags> -- substitute
The s function replaces part of a line (selected by <pattern>) with <replacement>. It can
best be read:

Substitute for <pattern>, <replacement>

The <pattern> argument contains a pattern, exactly like the patterns in addresses (see 2.2
above). The only difference between <pattern> and a context address is that the context
address must be delimited by slash (‘/’) characters; <pattern> may be delimited by any
character other than space or newline.

By default, only the first string matched by <pattern> is replaced, but see the g flag below.

The <replacement> argument begins immediately after the second delimiting character of
<pattern>, and must be followed immediately by another instance of the delimiting char-
acter. (Thus there are exactly three instances of the delimiting character.)

The <replacement> is not a pattern, and the characters which are special in patterns do
not have special meaning in <replacement>. Instead, other characters are special:

& is replaced by the string matched by <pattern>
\d (where d is a single digit) is replaced by the dth substring matched by parts of
<pattern> enclosed in ‘\(’ and ‘\)’. If nested substrings occur in <pat-
tern>, the dth is determined by counting opening delimiters (‘\(’).
As in patterns, special characters may be made literal by preceding
them with backslash (‘\’).

The <flags> argument may contain the following flags:

g -- substitute <replacement> for all (non-overlapping) instances of <pattern> in
the line. After a successful substitution, the scan for the next instance
of <pattern> begins just after the end of the inserted characters; charac-
ters put into the line from <replacement> are not rescanned.
p -- print the line if a successful replacement was done. The p flag causes the
line to be written to the output if and only if a substitution was actually
made by the s function. Notice that if several s functions, each fol-
lowed by a p flag, successfully substitute in the same input line, multi-
ple copies of the line will be written to the output: one for each success-
ful substitution.
w <filename> -- write the line to a file if a successful replacement was done.
The w flag causes lines which are actually substituted by the s function
to be written to a file named by <filename>. If <filename> exists
before sed is run, it is overwritten; if not, it is created.
A single space must separate w and <filename>.
The possibilities of multiple, somewhat different copies of one input
line being written are the same as for p.
A maximum of 10 different file names may be mentioned after w flags
and w functions (see below), combined.

Examples:
The following command, applied to our standard input,

```
s/to/by/w changes
```

produces, on the standard output:

```
In Xanadu did Kubhla Khan
A stately pleasure dome decree:
Where Alph, the sacred river, ran
Through caverns measureless by man
Down by a sunless sea.
```

and, on the file ‘changes’:

```
Through caverns measureless by man
Down by a sunless sea.
```

If the nocopy option is in effect, the command:

```
s/[.,;?:]/*P&*/gp
```

produces:

```
A stately pleasure dome decree*P:*
Where Alph*P,* the sacred river*P,* ran
Down to a sunless sea*P.*
```

Finally, to illustrate the effect of the g flag, the command:

```
/X/s/an/AN/p
```

produces (assuming nocopy mode):

```
In XANadu did Kubhla Khan
```

and the command:

```
/X/s/an/AN/gp
```

produces:

```
In XANadu did Kubhla KhAN
```

## 3.3. Input-output Functions
(2)p -- print
The print function writes the addressed lines to the standard output file. They are written
at the time the p function is encountered, regardless of what succeeding editing com-
mands may do to the lines.
(2)w <filename> -- write on <filename>
The write function writes the addressed lines to the file named by <filename>. If the file
previously existed, it is overwritten; if not, it is created. The lines are written exactly as
they exist when the write function is encountered for each line, regardless of what subse-
quent editing commands may do to them.
Exactly one space must separate the w and <filename>.
A maximum of ten different files may be mentioned in write functions and w flags after s
functions, combined.
(1)r <filename> -- read the contents of a file
The read function reads the contents of <filename>, and appends them after the line
matched by the address. The file is read and appended regardless of what subsequent
editing commands do to the line which matched its address. If r and a functions are
executed on the same line, the text from the a functions and the r functions is written to
the output in the order that the functions are executed.
Exactly one space must separate the r and <filename>. If a file mentioned by a r function
cannot be opened, it is considered a null file, not an error, and no diagnostic is given.

NOTE: Since there is a limit to the number of files that can be opened simultaneously, care should be taken
that no more than ten files be mentioned in w functions or flags; that number is reduced by one if any r
functions are present. (Only one read file is open at one time.)

Examples
Assume that the file ‘note1’ has the following contents:

```
Note: Kubla Khan (more properly Kublai Khan; 1216-1294) was the grandson and most
eminent successor of Genghiz (Chingiz) Khan, and founder of the Mongol dynasty in
China.
```

Then the following command:

```
/Kubla/r note1
```

produces:

```
In Xanadu did Kubla Khan
Note: Kubla Khan (more properly Kublai Khan; 1216-1294) was the grandson and most
eminent successor of Genghiz (Chingiz) Khan, and founder of the Mongol dynasty in
China.
A stately pleasure dome decree:
Where Alph, the sacred river, ran
Through caverns measureless to man
Down to a sunless sea.
```

## 3.4. Multiple Input-line Functions
Three functions, all spelled with capital letters, deal specially with pattern spaces containing imbedded
newlines; they are intended principally to provide pattern matches across lines in the input.

(2)N -- Next line
The next input line is appended to the current line in the pattern space; the two input lines
are separated by an imbedded newline. Pattern matches may extend across the imbedded
newline(s).
(2)D -- Delete first part of the pattern space
Delete up to and including the first newline character in the current pattern space. If the
pattern space becomes empty (the only newline was the terminal newline), read another
line from the input. In any case, begin the list of editing commands again from its begin-
ning.
(2)P -- Print first part of the pattern space
Print up to and including the first newline in the pattern space.

The P and D functions are equivalent to their lower-case counterparts if there are no imbedded newlines in
the pattern space.


## 3.5. Hold and Get Functions
Four functions save and retrieve part of the input for possible later use.
(2)h -- hold pattern space
The h functions copies the contents of the pattern space into a hold area (destroying the
previous contents of the hold area).
(2)H -- Hold pattern space
The H function appends the contents of the pattern space to the contents of the hold area;
the former and new contents are separated by a newline.
(2)g -- get contents of hold area
The g function copies the contents of the hold area into the pattern space (destroying the
previous contents of the pattern space).
(2)G -- Get contents of hold area
The G function appends the contents of the hold area to the contents of the pattern space;
the former and new contents are separated by a newline.
(2)x -- exchange
The exchange command interchanges the contents of the pattern space and the hold area.

Example
The commands

```
1h
1s/ did.*//
1x
G
s/\n/ :/
```

applied to our standard example, produce:

```
In Xanadu did Kubla Khan :In Xanadu
A stately pleasure dome decree: :In Xanadu
Where Alph, the sacred river, ran :In Xanadu
Through caverns measureless to man :In Xanadu
Down to a sunless sea. :In Xanadu
```

## 3.6. Flow-of-Control Functions
These functions do no editing on the input lines, but control the application of functions to the lines
selected by the address part.

(2)! -- Don’t
The Don’t command causes the next command (written on the same line), to be applied
to all and only those input lines not selected by the adress part.
(2){ -- Grouping
The grouping command ‘{’ causes the next set of commands to be applied (or not
applied) as a block to the input lines selected by the addresses of the grouping command.
The first of the commands under control of the grouping may appear on the same line as
the ‘{’ or on the next line.
The group of commands is terminated by a matching ‘}’ standing on a line by itself.
Groups can be nested.
(0):<label> -- place a label
The label function marks a place in the list of editing commands which may be referred
to by b and t functions. The <label> may be any sequence of eight or fewer characters; if
two different colon functions have identical labels, a compile time diagnostic will be gen-
erated, and no execution attempted.
(2)b<label> -- branch to label
The branch function causes the sequence of editing commands being applied to the cur-
rent input line to be restarted immediately after the place where a colon function with the
same <label> was encountered. If no colon function with the same label can be found
after all the editing commands have been compiled, a compile time diagnostic is pro-
duced, and no execution is attempted.
A b function with no <label> is taken to be a branch to the end of the list of editing
commands; whatever should be done with the current input line is done, and another
input line is read; the list of editing commands is restarted from the beginning on the new
line.
(2)t<label> -- test substitutions
The t function tests whether any successful substitutions have been made on the current
input line; if so, it branches to <label>; if not, it does nothing. The flag which indicates
that a successful substitution has been executed is reset by:
1) reading a new input line, or
2) executing a t function.


## 3.7. Miscellaneous Functions
(1)= -- equals
The = function writes to the standard output the line number of the line matched by its
address.
(1)q -- quit
The q function causes the current line to be written to the output (if it should be), any
appended or read text to be written, and execution to be terminated.

# Reference
[1]  Ken Thompson and Dennis M. Ritchie, The UNIX Programmer’s Manual. Bell Laboratories, 1978.
