# sed Bible (Basic & Advanced)

By far, one of the most common functions that people use shell scripts for is to work with text
fi les. Between examining log fi les, reading confi guration fi les, and handling data elements,
shell scripts can help automate the mundane tasks of manipulating any type of data con-
tained in text fi les. However, trying to manipulate the contents of text fi les using just shell script
commands can be somewhat awkward. If you perform any type of data manipulation in your shell
scripts, you want to become familiar with the  sed and  gawk tools available in Linux. These tools
can greatly simplify any data-handling tasks you need to perform.

# Manipulating Text
Chapter 10 showed you how to edit text fi les using different editor programs available in the Linux
environment. These editors enable you to easily manipulate text contained in a text fi le by using
simple commands or mouse clicks.

There are times, however, when you’ll fi nd yourself wanting to manipulate text in a text fi le on the
fl y, without having to pull out a full-fl edged interactive text editor. In these situations, it would be
useful to have a simple command line editor that could easily format, insert, modify, or delete text
elements automatically.

The Linux system provides two common tools for doing just that. This section describes the two
most popular command line editors used in the Linux world,  sed and  gawk .


## Getting to know the sed editor
The  sed editor is called a stream editor, as opposed to a normal interactive text editor. In an inter-
active text editor, such as  vim , you interactively use keyboard commands to insert, delete, or
replace text in the data. A stream editor edits a stream of data based on a set of rules you supply
ahead of time, before the editor processes the data.


The  sed editor can manipulate data in a data stream based on commands you either enter
into the command line or store in a command text fi le. The  sed editor does these things:

1. Reads one data line at a time from the input
2. Matches that data with the supplied editor commands
3. Changes data in the stream as specifi ed in the commands
4. Outputs the new data to  STDOUT
   
After the stream editor matches all the commands against a line of data, it reads the next
line of data and repeats the process. After the stream editor processes all the lines of data
in the stream, it terminates.

Because the commands are applied sequentially line by line, the  sed editor makes only one
pass through the data stream to make the edits. This makes the  sed editor much faster than
an interactive editor and allows you to quickly make changes to data in a fi le on the fl y.
Here’s the format for using the  sed command:

```bash
sed options script file
```

The  options parameters allow you to customize the behavior of the  sed command and
include the options shown in Table 19-1.

** TABLE 19-1 The sed Command Options **

| Option | Description |
| :--- | :--- |
| -e script | Adds commands specifi ed in the script to the commands run while processing the input |
| -f file | Adds the commands specifi ed in the fi le to the commands run while processing the input |
| -n | Doesn’t produce output for each command, but waits for the  print command |

The script parameter specifi es a single command to apply against the stream data. If more
than one command is required, you must use either the  -e option to specify them in the
command line or the  -f option to specify them in a separate fi le. Numerous commands are
available for manipulating data. We examine some of the basic commands used by the  sed
editor in this chapter and then look at some of the more advanced commands in Chapter 21.


## Defining an editor command in the command line
By default, the  sed editor applies the specifi ed commands to the  STDIN input stream. This
allows you to pipe data directly to the  sed editor for processing. Here’s a quick example
demonstrating how to do this:

```bash
$ echo "This is a test" | sed 's/test/big test/'
This is a big test
$
```

This example uses the  s command in the  sed editor. The  s command substitutes a second
text string for the fi rst text string pattern specifi ed between the forward slashes. In this
example, the words  big test were substituted for the word  test .

When you run this example, it should display the results almost instantaneously. That’s the
power of using the  sed editor. You can make multiple edits to data in about the same time
it takes for some of the interactive editors just to start up.

Of course, this simple test just edited one line of data. You should get the same speedy
results when editing complete fi les of data:

```bash
$ cat data1.txt
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
$
$ sed 's/dog/cat/' data1.txt
The quick brown fox jumps over the lazy cat.
The quick brown fox jumps over the lazy cat.
The quick brown fox jumps over the lazy cat.
The quick brown fox jumps over the lazy cat.
$
```

The  sed command executes and returns the data almost instantaneously. As it processes
each line of data, the results are displayed. You’ll start seeing results before the  sed editor
completes processing the entire fi le.

It’s important to note that the  sed editor doesn’t modify the data in the text fi le itself. It
only sends the modifi ed text to  STDOUT . If you look at the text fi le, it still contains the
original data:

```bash
$ cat data1.txt
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
$
```


## Using multiple editor commands in the command line
To execute more than one command from the  sed command line, just use the  -e option:

```bash
$ sed -e 's/brown/green/; s/dog/cat/' data1.txt
The quick green fox jumps over the lazy cat.
The quick green fox jumps over the lazy cat.
The quick green fox jumps over the lazy cat.
The quick green fox jumps over the lazy cat.
$
```

Both commands are applied to each line of data in the fi le. The commands must be sepa-
rated with a semicolon, and there shouldn’t be any spaces between the end of the command
and the semicolon.

Instead of using a semicolon to separate the commands, you can use the secondary prompt
in the bash shell. Just enter the fi rst single quotation mark to open the  sed program script
( sed editor command list), and bash continues to prompt you for more commands until you
enter the closing quotation mark:

```bash
$ sed -e '
> s/brown/green/
> s/fox/elephant/
> s/dog/cat/' data1.txt
The quick green elephant jumps over the lazy cat.
The quick green elephant jumps over the lazy cat.
The quick green elephant jumps over the lazy cat.
The quick green elephant jumps over the lazy cat.
$
```

You must remember to fi nish the command on the same line where the closing single quota-
tion mark appears. After the bash shell detects the closing quotation mark, it processes the
command. After it starts, the  sed command applies each command you specifi ed to each
line of data in the text fi le.


## Reading editor commands from a file
Finally, if you have lots of  sed commands you want to process, it is often easier to just
store them in a separate fi le. Use the  -f option to specify the fi le in the  sed command:

```bash
$ cat script1.sed
s/brown/green/
s/fox/elephant/
s/dog/cat/
$
$ sed -f script1.sed data1.txt
The quick green elephant jumps over the lazy cat.
The quick green elephant jumps over the lazy cat.
The quick green elephant jumps over the lazy cat.
The quick green elephant jumps over the lazy cat.
$
```

In this case, you don’t put a semicolon after each command. The  sed editor knows that
each line contains a separate command. As with entering commands on the command line,
the  sed editor reads the commands from the specifi ed fi le and applies them to each line in
the data file.

> [!TIP] It can be easy to confuse your  sed editor script fi les with your bash shell script fi les. To eliminate confusion, use a  .sed
file extension on your  sed script files.

We’ll look at some other  sed editor commands that come in handy for manipulating data
in the “Commanding at the  sed Editor Basics” section. Before that, let’s quickly look at the
other Linux data editor.




# Commanding at the sed Editor Basics
The key to successfully using the  sed editor is to know its myriad of commands and for-
mats, which help you to customize your text editing. This section describes some of the
basic commands and features you can incorporate into your script to start using the  sed
editor.


## Introducing more substitution options
You’ve already seen how to use the  s command to substitute new text for the text in a line.
However, a few additional options are available for the  substitute command that can
help make your life easier.

### Substituting flags
There’s a caveat to how the  substitute command replaces matching patterns in the text
string. Watch what happens in this example:

```bash
$ cat data4.txt
This is a test of the test script.
This is the second test of the test script.
$
$ sed 's/test/trial/' data4.txt
This is a trial of the test script.
This is the second trial of the test script.
$
```

The substitute command works fi ne in replacing text in multiple lines, but by default, it
replaces only the fi rst occurrence in each line. To get the  substitute command to work
on different occurrences of the text, you must use a substitution fl ag. The substitution fl ag
is set after the substitution command strings:

```bash
s/pattern/replacement/flags
```

Four types of substitution fl ags are available:

■ A number, indicating the pattern occurrence for which new text should be substituted
■ g , indicating that new text should be substituted for all occurrences of the existing text
■ p , indicating that the contents of the original line should be printed
■ w file, which means to write the results of the substitution to a fi le

In the fi rst type of substitution, you can specify which occurrence of the matching pattern
the  sed editor should substitute new text for:

```bash
$ sed 's/test/trial/2' data4.txt
This is a test of the trial script.
This is the second test of the trial script.
$
```

As a result of specifying a  2 as the substitution fl ag, the  sed editor replaces the pattern
only in the second occurrence in each line. The  g substitution fl ag enables you to replace
every occurrence of the pattern in the text:

```bash
$ sed 's/test/trial/g' data4.txt
This is a trial of the trial script.
This is the second trial of the trial script.
$
```

The p substitution fl ag prints a line that contains a matching pattern in the substitute
command. This is most often used in conjunction with the  -n sed option:

```bash
$ cat data5.txt
This is a test line.
This is a different line.
$
$ sed -n 's/test/trial/p' data5.txt
This is a trial line.
$
```

The  -n option suppresses output from the  sed editor. However, the  p substitution fl ag out-
puts any line that has been modifi ed. Using the two in combination produces output only
for lines that have been modifi ed by the substitute command.

The  w substitution fl ag produces the same output but stores the output in the specifi ed fi le:

```bash
$ sed 's/test/trial/w test.txt' data5.txt
This is a trial line.
This is a different line.
$
$ cat test.txt
This is a trial line.
$
```

The normal output of the  sed editor appears in  STDOUT , but only the lines that include the
matching pattern are stored in the specifi ed output fi le.


### Replacing characters
Sometimes, you run across characters in text strings that aren’t easy to use in the substitu-
tion pattern. One popular example in the Linux world is the forward slash (/).

Substituting pathnames in a fi le can get awkward. For example, if you wanted to substitute
the C shell for the bash shell in the  /etc/passwd fi le, you’d have to do this:

```bash
$ sed 's/\/bin\/bash/\/bin\/csh/' /etc/passwd
```

Because the forward slash is used as the string delimiter, you must use a backslash to
escape it if it appears in the pattern text. This often leads to confusion and mistakes.

To solve this problem, the  sed editor allows you to select a different character for the
string delimiter in the substitute command:

```bash
$ sed 's!/bin/bash!/bin/csh!' /etc/passwd
```

In this example, the exclamation point is used for the string delimiter, making the path-
names much easier to read and understand.


## Using addresses
By default, the commands you use in the  sed editor apply to all lines of the text data. If
you want to apply a command only to a specifi c line or a group of lines, you must use line
addressing.

There are two forms of line addressing in the  sed editor:

■ A numeric range of lines
■ A text pattern that fi lters out a line

Both forms use the same format for specifying the address:

```bash
[address]command
```

You can also group more than one command together for a specifi c address:

```bash
address {
    command1
    command2
    command3
}
```

The  sed editor applies each of the commands you specify only to lines that match the
address specifi ed. This section demonstrates using both of these addressing techniques in
your  sed editor scripts.


### Addressing the numeric line
When using numeric line addressing, you reference lines using their line position in the
text stream. The  sed editor assigns the fi rst line in the text stream as line number one and
continues sequentially for each new line.

The address you specify in the command can be a single line number or a range of lines
specifi ed by a starting line number, a comma, and an ending line number. Here’s an exam-
ple of specifying a line number to which the  sed command will be applied:

```bash
$ sed '2s/dog/cat/' data1.txt
The quick brown fox jumps over the lazy dog
The quick brown fox jumps over the lazy cat
The quick brown fox jumps over the lazy dog
The quick brown fox jumps over the lazy dog
$
```

The  sed editor modifi ed the text only in line two per the address specifi ed. Here’s another
example, this time using a range of line addresses:

```bash
$ sed '2,3s/dog/cat/' data1.txt
The quick brown fox jumps over the lazy dog
The quick brown fox jumps over the lazy cat
The quick brown fox jumps over the lazy cat
The quick brown fox jumps over the lazy dog
$
```

If you want to apply a command to a group of lines starting at some point within the text,
but continuing to the end of the text, you can use the special address, the dollar sign:

```bash
$ sed '2,$s/dog/cat/' data1.txt
The quick brown fox jumps over the lazy dog
The quick brown fox jumps over the lazy cat
The quick brown fox jumps over the lazy cat
The quick brown fox jumps over the lazy cat
$
```

Because you may not know how many lines of data are in the text, the dollar sign often
comes in handy.

### Using text pattern filters
The other method of restricting which lines a command applies to is a bit more compli-
cated. The  sed editor allows you to specify a text pattern that it uses to fi lter lines for the
command. This is the format:

```bash
/pattern/command
```

You must encapsulate the pattern you specify in forward slashes. The  sed editor applies the
command only to lines that contain the text pattern you specify.

For example, if you want to change the default shell for only the user Samantha, you’d use
the  sed command:

```bash
$ grep Samantha /etc/passwd
Samantha:x:502:502::/home/Samantha:/bin/bash
$
$ sed '/Samantha/s/bash/csh/' /etc/passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
[...]
Christine:x:501:501:Christine B:/home/Christine:/bin/bash
Samantha:x:502:502::/home/Samantha:/bin/csh
Timothy:x:503:503::/home/Timothy:/bin/bash
$
```

The command was applied only to the line with the matching text pattern. Although using
a fi xed text pattern may be useful for fi ltering specifi c values, as in the  userid example,
it’s somewhat limited in what you can do with it. The  sed editor uses a feature called
regular expressions in text patterns to allow you to create patterns that get pretty involved.

Regular expressions allow you to create advanced text pattern–matching formulas to match
all sorts of data. These formulas combine a series of wildcard characters, special characters,
and fi xed text characters to produce a concise pattern that can match just about any text
situation. Regular expressions are one of the scarier parts of shell script programming, and
Chapter 20 covers them in great detail.


### Grouping commands
If you need to perform more than one command on an individual line, group the commands
together using braces. The  sed editor processes each command listed on the address line(s):

```bash
$ sed '2{
> s/fox/elephant/
> s/dog/cat
> }' data1.txt
The quick brown fox jumps over the lazy dog.
The quick brown elephant jumps over the lazy cat.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
$
```

Both commands are processed against the address. And of course, you can specify an
address range before the grouped commands:

```bash
$ sed '3,${
> s/brown/green/
> s/lazy/active/
> }' data1.txt
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick green fox jumps over the active dog.
The quick green fox jumps over the active dog.
$
```

The  sed editor applies all the commands to all the lines in the address range.


## Deleting lines
The text substitution command isn’t the only command available in the  sed editor. If you
need to delete specifi c lines of text in a text stream, you can use the  delete command.

The  delete command,  d , pretty much does what it says. It deletes any text lines that
match the addressing scheme supplied. Be careful with the  delete command, because if
you forget to include an addressing scheme, all the lines are deleted from the stream:

```bash
$ cat data1.txt
The quick brown fox jumps over the lazy dog
The quick brown fox jumps over the lazy dog
The quick brown fox jumps over the lazy dog
The quick brown fox jumps over the lazy dog
$
$ sed 'd' data1.txt
$
```

The  delete command is obviously most useful when used in conjunction with a specifi ed
address. This allows you to delete specifi c lines of text from the data stream, either by line
number:

```bash
$ cat data6.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
$
$ sed '3d' data6.txt
This is line number 1.
This is line number 2.
This is line number 4.
$
```

or by a specifi c range of lines:

```bash
$ sed '2,3d' data6.txt
This is line number 1.
This is line number 4.
$
```

or by using the special end-of-fi le character:

```bash
$ sed '3,$d' data6.txt
This is line number 1.
This is line number 2.
$
```

The pattern-matching feature of the  sed editor also applies to the  delete command:

```bash
$ sed '/number 1/d' data6.txt
This is line number 2.
This is line number 3.
This is line number 4.
$
```

The  sed editor removes the line containing text that matches the pattern you specify.

> [!NOTE] Remember that the  sed editor doesn’t touch the original fi le. Any lines you delete are only gone from the output of
the  sed editor. The original fi le still contains the “deleted” lines.

You can also delete a range of lines using two text patterns, but be careful if you do this.
The fi rst pattern you specify “turns on” the line deletion, and the second pattern “turns
off” the line deletion. The  sed editor deletes any lines between the two specifi ed lines
(including the specifi ed lines):

```bash
$ sed '/1/,/3/d' data6.txt
This is line number 4.
$
```

In addition, you must be careful because the delete feature “turns on” whenever the  sed
editor detects the start pattern in the data stream. This may produce an unexpected result:

```bash
$ cat data7.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
This is line number 1 again.
This is text you want to keep.
This is the last line in the file.
$
$ sed '/1/,/3/d' data7.txt
This is line number 4.
$
```

The second occurrence of a line with the number 1 in it triggered the  delete command
again, deleting the rest of the lines in the data stream, because the stop pattern wasn’t
recognized. Of course, the other obvious problem occurs if you specify a stop pattern that
never appears in the text:

```bash
$ sed '/1/,/5/d' data7.txt
$
```

Because the delete features “turned on” at the fi rst pattern match, but never found the end
pattern match, the entire data stream was deleted.


## Inserting and appending text
As you would expect, like any other editor, the  sed editor allows you to insert and append
text lines to the data stream. The difference between the two actions can be confusing:

■ The  insert command ( i ) adds a new line before the specifi ed line.
■ The  append command ( a ) adds a new line after the specifi ed line.

What is confusing about these two commands is their formats. You can’t use these com-
mands on a single command line. You must specify the line to insert or append the line to
insert on a separate line by itself. Here’s the format for doing this:

```bash
sed '[address]command\
new line'
```

The text in  new line appears in the  sed editor output in the place you specify. Remember
that when you use the  insert command, the text appears before the data stream text:

```bash
$ echo "Test Line 2" | sed 'i\Test Line 1'
Test Line 1
Test Line 2
$
```

And when you use the  append command, the text appears after the data stream text:

```bash
$ echo "Test Line 2" | sed 'a\Test Line 1'
Test Line 2
Test Line 1
$
```

When you use the  sed editor from the command line interface prompt, you get the second-
ary prompt to enter the new line of data. You must complete the  sed editor command on
this line. After you enter the ending single quotation mark, the bash shell processes the
command:

```bash
$ echo "Test Line 2" | sed 'i\
> Test Line 1'
Test Line 1
Test Line 2
$
```

This works well for adding text before or after the text in the data stream, but what about
adding text inside the data stream?

To insert or append data inside the data stream lines, you must use addressing to tell the
sed editor where you want the data to appear. You can specify only a single line address
when using these commands. You can match either a numeric line number or a text pat-
tern, but you cannot use a range of addresses. This is logical, because you can only insert
or append before or after a single line, and not a range of lines.

Here’s an example of inserting a new line before line 3 in the data stream:

```bash
$ sed '3i\
> This is an inserted line.' data6.txt
This is line number 1.
This is line number 2.
This is an inserted line.
This is line number 3.
This is line number 4.
$
```

Here’s an example of appending a new line after line 3 in the data stream:

```bash
$ sed '3a\
> This is an appended line.' data6.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is an appended line.
This is line number 4.
$
```

This uses the same process as the  insert command; it just places the new text line after
the specifi ed line number. If you have a multiline data stream, and you want to append a
new line of text to the end of a data stream, just use the dollar sign, which represents the
last line of data:

```bash
$ sed '$a\
> This is a new line of text.' data6.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
This is a new line of text.
$
```

The same idea applies if you want to add a new line at the beginning of the data stream.
Just insert a new line before line number one.

To insert or append more than one line of text, you must use a backslash on each line of
new text until you reach the last text line where you want to insert or append text:

```bash
$ sed '1i\
> This is one line of new text.\
> This is another line of new text.' data6.txt
This is one line of new text.
This is another line of new text.
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
$
```

Both of the specifi ed lines are added to the data stream.


## Changing lines
The  change command allows you to change the contents of an entire line of text in the
data stream. It works the same way as the  insert and  append commands, in that you
must specify the new line separately from the rest of the  sed command:

```bash
$ sed '3c\
> This is a changed line of text.' data6.txt
This is line number 1.
This is line number 2.
This is a changed line of text.
This is line number 4.
$
```

In this example, the  sed editor changes the text in line number 3. You can also use a text
pattern for the address:

```bash
$ sed '/number 3/c\
> This is a changed line of text.' data6.txt
This is line number 1.
This is line number 2.
This is a changed line of text.
This is line number 4.
$
```

The text pattern  change command changes any line of text in the data stream that it
matches.

```bash
$ cat data8.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
This is line number 1 again.
This is yet another line.
This is the last line in the file.
$
$ sed '/number 1/c\
> This is a changed line of text.' data8.txt
This is a changed line of text.
This is line number 2.
This is line number 3.
This is line number 4.
This is a changed line of text.
This is yet another line.
This is the last line in the file.
$
```

You can use an address range in the  change command, but the results may not be what you
expect:

```bash
$ sed '2,3c\
> This is a new line of text.' data6.txt
This is line number 1.
This is a new line of text.
This is line number 4.
$
```

Instead of changing both lines with the text, the  sed editor uses the single line of text to
replace both lines.


## Transforming characters
The  transform command ( y ) is the only  sed editor command that operates on a single
character. The  transform command uses the format:

```bash
[address]y/inchars/outchars/
```

The  transform command performs a one-to-one mapping of the  inchars and the
outchars values. The fi rst character in  inchars is converted to the fi rst character in
outchars . The second character in  inchars is converted to the second character in
outchars . This mapping continues throughout the length of the specifi ed characters. If the
inchars and  outchars are not the same length, the  sed editor produces an error message.

Here’s a simple example of using the  transform command:

```bash
$ sed 'y/123/789/' data8.txt
This is line number 7.
This is line number 8.
This is line number 9.
This is line number 4.
This is line number 7 again.
This is yet another line.
This is the last line in the file.
$
```

As you can see from the output, each instance of the characters specifi ed in the  inchars
pattern has been replaced by the character in the same position in the  outchars pattern.

The  transform command is a global command; that is, it performs the transformation on
any character found in the text line automatically, without regard to the occurrence:

```bash
$ echo "This 1 is a test of 1 try." | sed 'y/123/456/'
This 4 is a test of 4 try.
$
```

The  sed editor transformed both instances of the matching character 1 in the text line.
You can’t limit the transformation to a specifi c occurrence of the character.


## Printing revisited
The “Introducing more substitution options” section showed you how to use the  p fl ag with
the substitution command to display lines that the  sed editor changed. In addition, three
commands that can be used to print information from the data stream:

■ The  p command to print a text line
■ The equal sign ( = ) command to print line numbers
■ The  l (lowercase L) command to list a line

The following sections look at these three printing commands in the  sed editor.


### Printing lines
Like the  p fl ag in the  substitution command, the  p command prints a line in the  sed
editor output. On its own, this command doesn’t offer much excitement:

```bash
$ echo "this is a test" | sed 'p'
this is a test
this is a test
$
```

All it does is print the data text that you already know is there. The most common use for
the  print command is printing lines that contain matching text from a text pattern:

```bash
$ cat data6.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
$
$ sed -n '/number 3/p' data6.txt
This is line number 3.
$
```

By using the  -n option on the command line, you can suppress all the other lines and print
only the line that contains the matching text pattern.

You can also use this as a quick way to print a subset of lines in a data stream:

```bash
$ sed -n '2,3p' data6.txt
This is line number 2.
This is line number 3.
$
```

You can also use the  print command when you need to see a line before it gets altered,
such as with the  substitution or  change command. You can create a script that displays
the line before it’s changed:

```bash
$ sed -n '/3/{
> p
> s/line/test/p
> }' data6.txt
This is line number 3.
This is test number 3.
$
```

This  sed editor command searches for lines that contain the number 3 and executes two
commands. First, the script uses the  p command to print the original version of the line;

then it uses the  s command to substitute text, along with the  p fl ag to print the resulting
text. The output shows both the original line text and the new line text.


### Printing line numbers
The  equal sign command prints the current line number for the line within the data
stream. Line numbers are determined by using the newline character in the data stream.
Each time a newline character appears in the data stream, the  sed editor assumes that it
terminates a line of text:

```bash
$ cat data1.txt
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
The quick brown fox jumps over the lazy dog.
$
$ sed '=' data1.txt
1
The quick brown fox jumps over the lazy dog.
2
The quick brown fox jumps over the lazy dog.
3
The quick brown fox jumps over the lazy dog.
4
The quick brown fox jumps over the lazy dog.
$
```

The  sed editor prints the line number before the actual line of text. The  equal sign com-
mand comes in handy if you’re searching for a specifi c text pattern in the data stream:

```bash
$ sed -n '/number 4/{
> =
> p
> }' data6.txt
4
This is line number 4.
$
```

By using the  -n option, you can have the  sed editor display both the line number and text
for the line that contains the matching text pattern.


## Listing lines
The  list command ( l ) allows you to print both the text and nonprintable characters in a
data stream. Any nonprintable characters are shown using either their octal values, pre-
ceded by a backslash or the standard C-style nomenclature for common nonprintable char-
acters, such as  \t for tab characters:

```bash
$ cat data9.txt
This line contains tabs.
$
$ sed -n 'l' data9.txt
This\tline\tcontains\ttabs.$
$
```

The tab character locations are shown with the  \t nomenclature. The dollar sign at the
end of the line indicates the newline character. If you have a data stream that contains an
escape character, the  list command displays it using the octal code if necessary:

```bash
$ cat data10.txt
This line contains an escape character.
$
$ sed -n 'l' data10.txt
This line contains an escape character. \a$
$
```

The  data10.txt fi le contains an escape control code, which generates a bell sound. When
you use the  cat command to display the text fi le, you don’t see the escape control code;
you just hear the sound (if your speakers are turned on). However, using the  list com-
mand, you can display the escape control code used.


## Using fi les with sed
The  substitution command contains fl ags that allow you to work with fi les. There are
also regular  sed editor commands that let you do that without having to substitute text.


### Writing to a file
The  w command is used to write lines to a fi le. Here’s the format for the  w command:

```bash
[address]w filename
```

The  filename can be specifi ed as either a relative or absolute pathname, but in either
case, the person running the  sed editor must have write permissions for the fi le. The
address can be any type of addressing method used in  sed , such as a single line number, a
text pattern, or a range of line numbers or text patterns.

Here’s an example that prints only the fi rst two lines of a data stream to a text fi le:

```bash
$ sed '1,2w test.txt' data6.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
$
$ cat test.txt
This is line number 1.
This is line number 2.
$
```

Of course, if you don’t want the lines to display on  STDOUT , you can use the  -n option for
the  sed command.

This is a great tool to use if you need to create a data fi le from a master fi le on the basis of
common text values, such as those in a mailing list:

```bash
$ cat data11.txt
Blum, R Browncoat
McGuiness, A Alliance
Bresnahan, C Browncoat
Harken, C Alliance
$
$ sed -n '/Browncoat/w Browncoats.txt' data11.txt
$
$ cat Browncoats.txt
Blum, R Browncoat
Bresnahan, C Browncoat
$
```

The  sed editor writes to a destination fi le only the data lines that contain the text pattern.


### Reading data from a file
You’ve already seen how to insert data into and append text to a data stream from the  sed
command line. The  read command ( r ) allows you to insert data contained in a separate fi le.

Here’s the format of the  read command:

```bash
[address]r filename
```

The  filename parameter specifi es either an absolute or relative pathname for the fi le that
contains the data. You can’t use a range of addresses for the  read command. You can only
specify a single line number or text pattern address. The  sed editor inserts the text from
the fi le after the address.

```bash
$ cat data12.txt
This is an added line.
This is the second added line.
$
$ sed '3r data12.txt' data6.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is an added line.
This is the second added line.
This is line number 4.
$
```

The  sed editor inserts into the data stream all the text lines in the data fi le. The same
technique works when using a text pattern address:

```bash
$ sed '/number 2/r data12.txt' data6.txt
This is line number 1.
This is line number 2.
This is an added line.
This is the second added line.
This is line number 3.
This is line number 4.
$
```

If you want to add text to the end of a data stream, just use the dollar sign address symbol:

```bash
$ sed '$r data12.txt' data6.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
This is an added line.
This is the second added line.
$
```

A cool application of the  read command is to use it in conjunction with a  delete com-
mand to replace a placeholder in a fi le with data from another fi le. For example, suppose
that you had a form stored in a text fi le that looked like this:

```bash
$ cat notice.std
Would the following people:
LIST
please report to the ship's captain.
$
```

The form letter uses the generic placeholder  LIST in place of a list of people. To insert the
list of people after the placeholder, you just use the  read command. However, this still
leaves the placeholder text in the output. To remove that, just use the  delete command.
The result looks like this:

```bash
$ sed '/LIST/{
> r data11.txt
> d
> }' notice.std
Would the following people:
Blum, R Browncoat
McGuiness, A Alliance
Bresnahan, C Browncoat
Harken, C Alliance
please report to the ship's captain.
$
```

Now the placeholder text is replaced with the list of names from the data fi le.


## Summary
Shell scripts can do lots of work on their own, but it’s often diffi cult to manipulate data
with just a shell script. Linux provides two handy utilities to help with handling text data.
The  sed editor is a stream editor that quickly processes data on the fl y as it reads it. You
must provide the  sed editor with a list of editing commands, which it applies to the data.

The  gawk program is a utility from the GNU organization that mimics and expands on the
functionality of the Unix  awk program. The g awk program contains a built-in programming
language that you can use to write scripts to handle and process data. You can use the
gawk program to extract data elements from large data fi les and output them in just about
any format you desire. This makes processing large log fi les a snap, as well as creating
custom reports from data fi les.

A crucial element of using both the  sed and  gawk  programs is knowing how to use regular
expressions. Regular expressions are key to creating customized fi lters for extracting and
manipulating data in text fi les. The next chapter dives into the often misunderstood world
of regular expressions, showing you how to build regular expressions for manipulating all
types of data.





---

# Regular Expressions

The key to successfully working with the  sed editor and the  gawk program in your shell script
is your comfort using regular expressions. This is not always an easy thing to do, because
trying to fi lter specifi c data from a large batch of data can (and often does) get complicated.
This chapter describes how to create regular expressions in both the  sed editor and the  gawk
program that can fi lter out just the data you need.

## What Are Regular Expressions?
The fi rst step to understanding regular expressions is to defi ne just exactly what they are. This
section explains what a regular expression is and describes how Linux uses regular expressions.


### A definition
A regular expression is a pattern template you defi ne that a Linux utility uses to fi lter text.
A Linux utility (such as the  sed editor or the  gawk program) matches the regular expression
pattern against data as that data fl ows into the utility. If the data matches the pattern, it’s
accepted for processing. If the data doesn’t match the pattern, it’s rejected. This is illustrated
in Figure 20-1.

The regular expression pattern makes use of wildcard characters to represent one or more charac-
ters in the data stream. There are plenty of instances in Linux where you can specify a wildcard
character to represent data you don’t know about. You’ve already seen an example of using wildcard
characters with the Linux  ls command for listing fi les and directories (see Chapter 3).

The asterisk wildcard character allows you to list only fi les that match a certain criteria.
For example:

```bash
$ ls -al da*
-rw-r--r-- 1 rich rich 45 Nov 26 12:42 data
-rw-r--r-- 1 rich rich 25 Dec 4 12:40 data.tst
-rw-r--r-- 1 rich rich 180 Nov 26 12:42 data1
-rw-r--r-- 1 rich rich 45 Nov 26 12:44 data2
-rw-r--r-- 1 rich rich 73 Nov 27 12:31 data3
-rw-r--r-- 1 rich rich 79 Nov 28 14:01 data4
-rw-r--r-- 1 rich rich 187 Dec 4 09:45 datatest
$
```

The  da* parameter instructs the  ls command to list only the fi les whose name starts with
da. There can be any number of characters after the  da in the fi lename (including none).
The  ls command reads the information regarding all the fi les in the directory but displays
only the ones that match the wildcard character.

Regular expression wildcard patterns work in a similar way. The regular expression pattern
contains text and/or special characters that defi ne a template for the  sed editor and the
gawk program to follow when matching data. You can use different special characters in a
regular expression to defi ne a specifi c pattern for fi ltering data.

### Types of regular expressions
The biggest problem with using regular expressions is that there isn’t just one set of them.
Several different applications use different types of regular expressions in the Linux envi-
ronment. These include such diverse applications as programming languages (Java, Perl, and
Python), Linux utilities (such as the  sed editor, the  gawk program, and the grep utility),
and mainstream applications (such as the MySQL and PostgreSQL database servers).

A regular expression is implemented using a regular expression engine. A regular expres-
sion engine is the underlying software that interprets regular expression patterns and uses
those patterns to match text.

The Linux world has two popular regular expression engines:

■ The POSIX Basic Regular Expression (BRE) engine
■ The POSIX Extended Regular Expression (ERE) engine

Most Linux utilities at a minimum conform to the POSIX BRE engine specifi cations,
recognizing all the pattern symbols it defi nes. Unfortunately, some utilities (such as the
sed editor) conform only to a subset of the BRE engine specifi cations. This is due to speed
constraints, because the  sed editor attempts to process text in the data stream as quickly
as possible.

The POSIX ERE engine is often found in programming languages that rely on regular expres-
sions for text fi ltering. It provides advanced pattern symbols as well as special symbols for
common patterns, such as matching digits, words, and alphanumeric characters. The  gawk
program uses the ERE engine to process its regular expression patterns.

Because there are so many different ways to implement regular expressions, it’s hard to
present a single, concise description of all the possible regular expressions. The following
sections discuss the most commonly found regular expressions and demonstrate how to use
them in the  sed editor and  gawk program.


## Defining BRE Patterns
The most basic BRE pattern is matching text characters in a data stream. This section dem-
onstrates how you can defi ne text in the regular expression pattern and what to expect
from the results.


### Plain text
Chapter 18 demonstrated how to use standard text strings in the  sed editor and the  gawk
program to fi lter data. Here’s an example to refresh your memory:

```bash
$ echo "This is a test" | sed -n '/test/p'
This is a test
$ echo "This is a test" | sed -n '/trial/p'
$
$ echo "This is a test" | gawk '/test/{print $0}'
This is a test
$ echo "This is a test" | gawk '/trial/{print $0}'
$
```

The fi rst pattern defi nes a single word, test. The  sed editor and  gawk program scripts each
use their own version of the  print command to print any lines that match the regular
expression pattern. Because the  echo statement contains the word “test” in the text
string, the data stream text matches the defi ned regular expression pattern, and the  sed
editor displays the line.

The second pattern again defi nes just a single word, this time the word “trial.” Because
the  echo statement text string doesn’t contain that word, the regular expression pattern
doesn’t match, so neither the  sed editor nor the  gawk program prints the line.

You probably already noticed that the regular expression doesn’t care where in the data
stream the pattern occurs. It also doesn’t matter how many times the pattern occurs. After
the regular expression can match the pattern anywhere in the text string, it passes the
string along to the Linux utility that’s using it.

The key is matching the regular expression pattern to the data stream text. It’s important
to remember that regular expressions are extremely picky about matching patterns. The
fi rst rule to remember is that regular expression patterns are case sensitive. This means
they’ll match only those patterns with the proper case of characters:

```bash
$ echo "This is a test" | sed -n '/this/p'
$
$ echo "This is a test" | sed -n '/This/p'
This is a test
$
```

The fi rst attempt failed to match because the word “this” doesn’t appear in all lowercase in
the text string, while the second attempt, which uses the uppercase letter in the pattern,
worked just fi ne.

You don’t have to limit yourself to whole words in the regular expression. If the defi ned
text appears anywhere in the data stream, the regular expression matches the following:

```bash
$ echo "The books are expensive" | sed -n '/book/p'
The books are expensive
$
```

Even though the text in the data stream is  books , the data in the stream contains the
regular expression book, so the regular expression pattern matches the data. Of course, if
you try the opposite, the regular expression fails:

```bash
$ echo "The book is expensive" | sed -n '/books/p'
$
```

The complete regular expression text didn’t appear in the data stream, so the match failed
and the  sed editor didn’t display the text.

You also don’t have to limit yourself to single text words in the regular expression. You can
include spaces and numbers in your text string as well:

```bash
$ echo "This is line number 1" | sed -n '/ber 1/p'
This is line number 1
$
```

Spaces are treated just like any other character in the regular expression:

```bash
$ echo "This is line number1" | sed -n '/ber 1/p'
$
```

If you defi ne a space in the regular expression, it must appear in the data stream. You can
even create a regular expression pattern that matches multiple contiguous spaces:

```bash
$ cat data1
This is a normal line of text.
This is a line with too many spaces.
$ sed -n '/ /p' data1
This is a line with too many spaces.
$
```

The line with two spaces between words matches the regular expression pattern. This is a
great way to catch spacing problems in text fi les!


### Special characters
As you use text strings in your regular expression patterns, there’s something you need to
be aware of. There are a few exceptions when defi ning text characters in a regular expres-
sion. Regular expression patterns assign a special meaning to a few characters. If you try to
use these characters in your text pattern, you won’t get the results you were expecting.

These special characters are recognized by regular expressions:

```bash
.*[]^${}\+?|()
```

As the chapter progresses, you’ll fi nd out just what these special characters do in a regular
expression. For now, however, just remember that you can’t use these characters by them-
selves in your text pattern.

If you want to use one of the special characters as a text character, you need to escape it.
When you escape the special characters, you add a special character in front of it to indi-
cate to the regular expression engine that it should interpret the next character as a nor-
mal text character. The special character that does this is the backslash character (\).

For example, if you want to search for a dollar sign in your text, just precede it with a
backslash character:

```bash
$ cat data2
The cost is $4.00
$ sed -n '/\$/p' data2
The cost is $4.00
$
```

Because the backslash is a special character, if you need to use it in a regular expression
pattern, you need to escape it as well, producing a double backslash:

```bash
$ echo "\ is a special character" | sed -n '/\\/p'
\ is a special character
$
```

Finally, although the forward slash isn’t a regular expression special character, if you use it
in your regular expression pattern in the  sed editor or the  gawk program, you get an error:

```bash
$ echo "3 / 2" | sed -n '///p'
sed: -e expression #1, char 2: No previous regular expression
$
```

To use a forward slash, you need to escape that as well:

```bash
$ echo "3 / 2" | sed -n '/\//p'
3 / 2
$
```

Now the  sed editor can properly interpret the regular expression pattern, and all is well.


## Anchor characters
As shown in the “Plain Text” section, by default, when you specify a regular expression
pattern, if the pattern appears anywhere in the data stream, it matches. You can use two
special characters to anchor a pattern to either the beginning or the end of lines in the
data stream.


### Starting at the beginning
The caret character ( ^ ) defi nes a pattern that starts at the beginning of a line of text in
the data stream. If the pattern is located any place other than the start of the line of text,
the regular expression pattern fails.

To use the caret character, you must place it before the pattern specifi ed in the regular
expression:

```bash
$ echo "The book store" | sed -n '/ ^ book/p'
$
$ echo "Books are great" | sed -n '/ ^ Book/p'
Books are great
$
```

The caret anchor character checks for the pattern at the beginning of each new line of
data, as determined by the newline character:

```bash
$ cat data3
This is a test line.
this is another test line.
A line that tests this feature.
Yet more testing of this
$ sed -n '/ ^ this/p' data3
this is another test line.
$
```

As long as the pattern appears at the start of a new line, the caret anchor catches it.

If you position the caret character in any place other than at the beginning of the pattern,
it acts like a normal character and not as a special character:

```bash
$ echo "This  ^ is a test" | sed -n '/s  ^ /p'
This ^ is a test
$
```

Because the caret character is listed last in the regular expression pattern, the  sed editor
uses it as a normal character to match text.

> [!NOTE] If you need to specify a regular expression pattern using only the caret character, you don’t need to escape it with a
backslash. However, if you specify the caret character fi rst, followed by additional text in the pattern, you need to use
the escape character before the caret character.


### Looking for the ending
The opposite of looking for a pattern at the start of a line is looking for it at the end of a
line. The dollar sign ( $ ) special character defi nes the end anchor. Add this special character
after a text pattern to indicate that the line of data must end with the text pattern:

```bash
$ echo "This is a good book" | sed -n '/book$/p'
This is a good book
$ echo "This book is good" | sed -n '/book$/p'
$
```

The problem with an ending text pattern is that you must be careful what you’re looking for:

```bash
$ echo "There are a lot of good books" | sed -n '/book$/p'
$
```

Making the word “book” plural at the end of the line means that it no longer matches the
regular expression pattern, even though book is in the data stream. The text pattern must
be the last thing on the line for the pattern to match.


### Combining anchors
In some common situations, you can combine both the start and end anchor on the same
line. In the fi rst situation, suppose you want to look for a line of data containing only a
specifi c text pattern:

```bash
$ cat data4
this is a test of using both anchors
I said this is a test
this is a test
I'm sure this is a test.
$ sed -n '/ ^ this is a test$/p' data4
this is a test
$
```

The  sed editor ignores the lines that include other text besides the specifi ed text.

The second situation may seem a little odd at fi rst but is extremely useful. By combining
both anchors in a pattern with no text, you can fi lter blank lines from the data stream.
Consider this example:

```bash
$ cat data5
This is one test line.
This is another test line.
$ sed '/ ^ $/d' data5
This is one test line.
This is another test line.
$
```

The regular expression pattern that is defi ned looks for lines that have nothing between
the start and end of the line. Because blank lines contain no text between the two newline
characters, they match the regular expression pattern. The  sed editor uses the  d delete
command to delete lines that match the regular expression pattern, thus removing all
blank lines from the text. This is an effective way to remove blank lines from documents.


### The dot character
The dot special character is used to match any single character except a newline character. The
dot character must match a character, however; if there’s no character in the place of the dot,
then the pattern fails.

Let’s look at a few examples of using the dot character in a regular expression pattern:

```bash
$ cat data6
This is a test of a line.
The cat is sleeping.
That is a very nice hat.
This test is at line four.
at ten o'clock we'll go home.
$ sed -n '/.at/p' data6
The cat is sleeping.
That is a very nice hat.
This test is at line four.
$
```

You should be able to fi gure out why the fi rst line failed and why the second and third
lines passed. The fourth line is a little tricky. Notice that we matched the  at , but there’s
no character in front of it to match the dot character. Ah, but there is! In regular expres-
sions, spaces count as characters, so the space in front of the  at matches the pattern. The
fi fth line proves this, by putting the  at in the front of the line, which fails to match the
pattern.


### Character classes
The dot special character is great for matching a character position against any character,
but what if you want to limit what characters to match? This is called a character class in
regular expressions.

You can defi ne a class of characters that would match a position in a text pattern. If one of
the characters from the character class is in the data stream, it matches the pattern.

To defi ne a character class, you use square brackets. The brackets should contain any char-
acter you want to include in the class. You then use the entire class within a pattern just
like any other wildcard character. This takes a little getting used to at fi rst, but after you
catch on, it can generate some pretty amazing results.

The following is an example of creating a character class:

```bash
$ sed -n '/[ch]at/p' data6
The cat is sleeping.
That is a very nice hat.
$
```

Using the same data fi le as in the dot special character example, we came up with a differ-
ent result. This time we managed to fi lter out the line that just contained the word  at . The
only words that match this pattern are  cat and  hat . Also notice that the line that started
with  at didn’t match as well. There must be a character in the character class that matches
the appropriate position.

Character classes come in handy if you’re not sure which case a character is in:

```bash
$ echo "Yes" | sed -n '/[Yy]es/p'
Yes
$ echo "yes" | sed -n '/[Yy]es/p'
yes
$
```

You can use more than one character class in a single expression:

```bash
$ echo "Yes" | sed -n '/[Yy][Ee][Ss]/p'
Yes
$ echo "yEs" | sed -n '/[Yy][Ee][Ss]/p'
yEs
$ echo "yeS" | sed -n '/[Yy][Ee][Ss]/p'
yeS
$
```

The regular expression used three character classes to cover both lower and upper cases for
all three character positions.

Character classes don’t have to contain just letters; you can use numbers in them as well:

```bash
$ cat data7
This line doesn't contain a number.
This line has 1 number on it.
This line a number 2 on it.
This line has a number 4 on it.
$ sed -n '/[0123]/p' data7
This line has 1 number on it.
This line a number 2 on it.
$
```

The regular expression pattern matches any lines that contain the numbers 0, 1, 2, or 3.
Any other numbers are ignored, as are lines without numbers in them.

You can combine character classes to check for properly formatted numbers, such as phone
numbers and ZIP codes. However, when you’re trying to match a specifi c format, you must
be careful. Here’s an example of a ZIP code match gone wrong:

```bash
$ cat data8
60633
46201
223001
4353
22203
$ sed -n '
>/[0123456789][0123456789][0123456789][0123456789][0123456789]/p
>' data8
60633
46201
223001
22203
$
```

This might not have produced the result you were thinking of. It did a fi ne job of fi ltering
out the number that was too short to be a ZIP code, because the last character class didn’t
have a character to match against. However, it still passed the six-digit number, even
though we only defi ned fi ve character classes.

Remember that the regular expression pattern can be found anywhere in the text of the
data stream. You may always have additional characters besides the matching pattern char-
acters. If you want to ensure that you match against only fi ve numbers, you need to delin-
eate them somehow, either with spaces, or as in this example, by showing that they’re at
the start and end of the line:

```bash
$ sed -n '
> / ^ [0123456789][0123456789][0123456789][0123456789][0123456789]$/p
> ' data8
60633
46201
22203
$
```

Now that’s much better! Later in this chapter, we look at how to simplify this even further.

One extremely popular use for character classes is parsing words that might be misspelled,
such as data entered from a user form. You can easily create regular expressions that can
accept common misspellings in data:

```bash
$ cat data9
I need to have some maintenence done on my car.
I'll pay that in a seperate invoice.
After I pay for the maintenance my car will be as good as new.
$ sed -n '
/maint[ea]n[ae]nce/p
/sep[ea]r[ea]te/p
' data9
I need to have some maintenence done on my car.
I'll pay that in a seperate invoice.
After I pay for the maintenance my car will be as good as new.
$
```

The two  sed print commands in this example utilize regular expression character classes
to help catch the misspelled words, maintenance and separate, in the text. The same regular
expression pattern also matches the properly spelled occurrence of “maintenance.”

### Negating character classes
In regular expression patterns, you can also reverse the effect of a character class. Instead of
looking for a character contained in the class, you can look for any character that’s not in the
class. To do that, just place a caret character at the beginning of the character class range:

```bash
$ sed -n '/[ ^ ch]at/p' data6
This test is at line four.
$
```

By negating the character class, the regular expression pattern matches any character
that’s neither a c nor an h, along with the text pattern. Because the space character fi ts
this category, it passed the pattern match. However, even with the negation, the character
class must still match a character, so the line with the  at in the start of the line still
doesn’t match the pattern.


### Using ranges
You may have noticed when I showed the ZIP code example earlier that it was somewhat
awkward having to list all the possible digits in each character class. Fortunately, you can
use a shortcut so you don’t have to do that.

You can use a range of characters within a character class by using the dash symbol. Just
specify the fi rst character in the range, a dash, and then the last character in the range.
The regular expression includes any character that’s within the specifi ed character range,
according to the character set used by the Linux system (see Chapter 2).

Now you can simplify the ZIP code example by specifying a range of digits:

```bash
$ sed -n '/^[0-9][0-9][0-9][0-9][0-9]$/p' data8
60633
46201
45902
$
```

That saved lots of typing! Each character class matches any digit from 0 to 9. The pattern
fails if a letter is present anywhere in the data:

```bash
$ echo "a8392" | sed -n '/^[0-9][0-9][0-9][0-9][0-9]$/p'
$
$ echo "1839a" | sed -n '/^[0-9][0-9][0-9][0-9][0-9]$/p'
$
$ echo "18a92" | sed -n '/^[0-9][0-9][0-9][0-9][0-9]$/p'
$
```

The same technique works with letters:

```bash
$ sed -n '/[c-h]at/p' data6
The cat is sleeping.
That is a very nice hat.
$
```

The new pattern  [c-h]at matches words where the fi rst letter is between the letter c and
the letter h. In this case, the line with only the word  at failed to match the pattern.

You can also specify multiple, non-continuous ranges in a single character class:

```bash
$ sed -n '/[a-ch-m]at/p' data6
The cat is sleeping.
That is a very nice hat.
$
```

The character class allows the ranges a through c, and h through m to appear before the  at
text. This range would reject any letters between d and g:

```bash
$ echo "I'm getting too fat." | sed -n '/[a-ch-m]at/p'
$
```

This pattern rejected the  fat text, as it wasn’t in the specifi ed range.


### Special character classes
In addition to defi ning your own character classes, the BRE contains special character
classes you can use to match against specifi c types of characters. Table 20-1 describes the
BRE special characters you can use.

**TABLE 20-1 BRE Special Character Classes**

| Class | Description |
| :--- | :--- |
| [[:alpha:]] |  Matches any alphabetical character, either upper or lower case |
| [[:alnum:]] |  Matches any alphanumeric character 0–9, A–Z, or a–z |
| [[:blank:]] |  Matches a space or Tab character |
| [[:digit:]] |  Matches a numerical digit from 0 through 9 |
| [[:lower:]] |  Matches any lowercase alphabetical character a–z |
| [[:print:]] |  Matches any printable character |
| [[:punct:]] |  Matches a punctuation character |
| [[:space:]] |  Matches any whitespace character: space, Tab, NL, FF, VT, CR |
| [[:upper:]] |  Matches any uppercase alphabetical character A–Z |

You use the special character classes just as you would a normal character class in your
regular expression patterns:

```bash
$ echo "abc" | sed -n '/[[:digit:]]/p'
$
$ echo "abc" | sed -n '/[[:alpha:]]/p'
abc
$ echo "abc123" | sed -n '/[[:digit:]]/p'
abc123
$ echo "This is, a test" | sed -n '/[[:punct:]]/p'
This is, a test
$ echo "This is a test" | sed -n '/[[:punct:]]/p'
$
```

Using the special character classes is an easy way to defi ne ranges. Instead of having to use
a range [0–9], you can just use  [[:digit:]] .


### The asterisk
Placing an asterisk after a character signifi es that the character must appear zero or more
times in the text to match the pattern:

```bash
$ echo "ik" | sed -n '/ie*k/p'
ik
$ echo "iek" | sed -n '/ie*k/p'
iek
$ echo "ieek" | sed -n '/ie*k/p'
ieek
$ echo "ieeek" | sed -n '/ie*k/p'
ieeek
$ echo "ieeeek" | sed -n '/ie*k/p'
ieeeek
$
```

This pattern symbol is commonly used for handling words that have a common misspelling
or variations in language spellings. For example, if you need to write a script that may be
used in either American or British English, you could write:

```bash
$ echo "I'm getting a color TV" | sed -n '/colou*r/p'
I'm getting a color TV
$ echo "I'm getting a colour TV" | sed -n '/colou*r/p'
I'm getting a colour TV
$
```

The  u* in the pattern indicates that the letter u may or may not appear in the text to
match the pattern. Similarly, if you know of a word that is commonly misspelled, you can
accommodate it by using the asterisk:

```bash
$ echo "I ate a potatoe with my lunch." | sed -n '/potatoe*/p'
I ate a potatoe with my lunch.
$ echo "I ate a potato with my lunch." | sed -n '/potatoe*/p'
I ate a potato with my lunch.
$
```

Placing an asterisk next to the possible extra letter allows you to accept the
misspelled word.

Another handy feature is combining the dot special character with the asterisk special
character. This combination provides a pattern to match any number of any characters. It’s
often used between two text strings that may or may not appear next to each other in the
data stream:

```bash
$ echo "this is a regular pattern expression" | sed -n '
> /regular.*expression/p'
this is a regular pattern expression
$
```

Using this pattern, you can easily search for multiple words that may appear anywhere in a
line of text in the data stream.

The asterisk can also be applied to a character class. This allows you to specify a group or
range of characters that can appear more than once in the text:

```bash
$ echo "bt" | sed -n '/b[ae]*t/p'
bt
$ echo "bat" | sed -n '/b[ae]*t/p'
bat
$ echo "bet" | sed -n '/b[ae]*t/p'
bet
$ echo "btt" | sed -n '/b[ae]*t/p'
btt
$
$ echo "baat" | sed -n '/b[ae]*t/p'
baat
$ echo "baaeeet" | sed -n '/b[ae]*t/p'
baaeeet
$ echo "baeeaeeat" | sed -n '/b[ae]*t/p'
baeeaeeat
$ echo "baakeeet" | sed -n '/b[ae]*t/p'
$
```

As long as the a and e characters appear in any combination between the b and t characters
(including not appearing at all), the pattern matches. If any other character outside of the
defi ned character class appears, the pattern match fails.


## Extended Regular Expressions
The POSIX ERE patterns include a few additional symbols that are used by some Linux
applications and utilities. The  gawk program recognizes the ERE patterns, but the  sed
editor doesn’t.

> [!CAUTION] Remember that the regular expression engines in the  sed editor and the  gawk program are different. The  gawk
program can use most of the extended regular expression pattern symbols, and it can provide some additional fi l-
tering capabilities that the  sed editor doesn’t have. However, because of this, it is often slower in processing data
streams.

This section describes the more commonly found ERE pattern symbols that you can use in
your  gawk program scripts.


### The question mark
The question mark is similar to the asterisk, but with a slight twist. The question mark
indicates that the preceding character can appear zero or one time, but that’s all. It doesn’t
match repeating occurrences of the character:

```bash
$ echo "bt" | gawk '/be?t/{print $0}'
bt
$ echo "bet" | gawk '/be?t/{print $0}'
bet
$ echo "beet" | gawk '/be?t/{print $0}'
$
$ echo "beeet" | gawk '/be?t/{print $0}'
$
```

If the e character doesn’t appear in the text, or as long as it appears only once in the text,
the pattern matches.

As with the asterisk, you can use the question mark symbol along with a character class:

```bash
$ echo "bt" | gawk '/b[ae]?t/{print $0}'
bt
$ echo "bat" | gawk '/b[ae]?t/{print $0}'
bat
$ echo "bot" | gawk '/b[ae]?t/{print $0}'
$
$ echo "bet" | gawk '/b[ae]?t/{print $0}'
bet
$ echo "baet" | gawk '/b[ae]?t/{print $0}'
$
$ echo "beat" | gawk '/b[ae]?t/{print $0}'
$
$ echo "beet" | gawk '/b[ae]?t/{print $0}'
$
```

If zero or one character from the character class appears, the pattern match passes.
However, if both characters appear, or if one of the characters appears twice, the pattern
match fails.


### The plus sign
The plus sign is another pattern symbol that’s similar to the asterisk, but with a different
twist than the question mark. The plus sign indicates that the preceding character can
appear one or more times, but must be present at least once. The pattern doesn’t match if
the character is not present:

```bash
$ echo "beeet" | gawk '/be+t/{print $0}'
beeet
$ echo "beet" | gawk '/be+t/{print $0}'
beet
$ echo "bet" | gawk '/be+t/{print $0}'
bet
$ echo "bt" | gawk '/be+t/{print $0}'
$
```

If the e character is not present, the pattern match fails. The plus sign also works with
character classes, the same way as the asterisk and question mark do:

```bash
$ echo "bt" | gawk '/b[ae]+t/{print $0}'
$
$ echo "bat" | gawk '/b[ae]+t/{print $0}'
bat
$ echo "bet" | gawk '/b[ae]+t/{print $0}'
bet
$ echo "beat" | gawk '/b[ae]+t/{print $0}'
beat
$ echo "beet" | gawk '/b[ae]+t/{print $0}'
beet
$ echo "beeat" | gawk '/b[ae]+t/{print $0}'
beeat
$
```

This time if either character defi ned in the character class appears, the text matches the
specifi ed pattern.


### Using braces
Curly braces are available in ERE to allow you to specify a limit on a repeatable regular
expression. This is often referred to as an interval. You can express the interval in two
formats:

■ m : The regular expression appears exactly m times.
■ m,n : The regular expression appears at least m times, but no more than n times.

This feature allows you to fi ne-tune exactly how many times you allow a character (or char-
acter class) to appear in a pattern.

> [!CAUTION] By default, the  gawk program doesn’t recognize regular expression intervals. You must specify the
--re-interval command line option for the  gawk program to recognize regular expression intervals.

Here’s an example of using a simple interval of one value:

```bash
$ echo "bt" | gawk --re-interval '/be{1}t/{print $0}'
$
$ echo "bet" | gawk --re-interval '/be{1}t/{print $0}'
bet
$ echo "beet" | gawk --re-interval '/be{1}t/{print $0}'
$
```

By specifying an interval of one, you restrict the number of times the character can be
present for the string to match the pattern. If the character appears more times, the
pattern match fails.

Often, specifying the lower and upper limit comes in handy:

```bash
$ echo "bt" | gawk --re-interval '/be{1,2}t/{print $0}'
$
$ echo "bet" | gawk --re-interval '/be{1,2}t/{print $0}'
bet
$ echo "beet" | gawk --re-interval '/be{1,2}t/{print $0}'
beet
$ echo "beeet" | gawk --re-interval '/be{1,2}t/{print $0}'
$
```

In this example, the e character can appear once or twice for the pattern match to pass;
otherwise, the pattern match fails.

The interval pattern match also applies to character classes:

```bash
$ echo "bt" | gawk --re-interval '/b[ae]{1,2}t/{print $0}'
$
$ echo "bat" | gawk --re-interval '/b[ae]{1,2}t/{print $0}'
bat
$ echo "bet" | gawk --re-interval '/b[ae]{1,2}t/{print $0}'
bet
$ echo "beat" | gawk --re-interval '/b[ae]{1,2}t/{print $0}'
beat
$ echo "beet" | gawk --re-interval '/b[ae]{1,2}t/{print $0}'
beet
$ echo "beeat" | gawk --re-interval '/b[ae]{1,2}t/{print $0}'
$
$ echo "baeet" | gawk --re-interval '/b[ae]{1,2}t/{print $0}'
$
$ echo "baeaet" | gawk --re-interval '/b[ae]{1,2}t/{print $0}'
$
```

This regular expression pattern matches if there are exactly one or two instances of the
letter a or e in the text pattern, but it fails if there are any more in any combination.


### The pipe symbol
The pipe symbol allows to you to specify two or more patterns that the regular expression engine
uses in a logical  OR formula when examining the data stream. If any of the patterns match the
data stream text, the text passes. If none of the patterns match, the data stream text fails.

Here’s the format for using the pipe symbol:

```bash
expr1|expr2|...
```

Here’s an example of this:

```bash
$ echo "The cat is asleep" | gawk '/cat|dog/{print $0}'
The cat is asleep
$ echo "The dog is asleep" | gawk '/cat|dog/{print $0}'
The dog is asleep
$ echo "The sheep is asleep" | gawk '/cat|dog/{print $0}'
$
```


This example looks for the regular expression  cat or  dog in the data stream. You can’t
place any spaces within the regular expressions and the pipe symbol, or they’re added to
the regular expression pattern.

The regular expressions on either side of the pipe symbol can use any regular expression
pattern, including character classes, to defi ne the text:

```bash
$ echo "He has a hat." | gawk '/[ch]at|dog/{print $0}'
He has a hat.
$
```

This example would match  cat ,  hat , or  dog in the data stream text.


### Grouping expressions
Regular expression patterns can also be grouped by using parentheses. When you group a
regular expression pattern, the group is treated like a standard character. You can apply a
special character to the group just as you would to a regular character. For example:

```bash
$ echo "Sat" | gawk '/Sat(urday)?/{print $0}'
Sat
$ echo "Saturday" | gawk '/Sat(urday)?/{print $0}'
Saturday
$
```

The grouping of the “urday” ending along with the question mark allows the pattern to
match either the full day name Saturday or the abbreviated name Sat.

It’s common to use grouping along with the pipe symbol to create groups of possible pattern
matches:

```bash
$ echo "cat" | gawk '/(c|b)a(b|t)/{print $0}'
cat
$ echo "cab" | gawk '/(c|b)a(b|t)/{print $0}'
cab
$ echo "bat" | gawk '/(c|b)a(b|t)/{print $0}'
bat
$ echo "bab" | gawk '/(c|b)a(b|t)/{print $0}'
bab
$ echo "tab" | gawk '/(c|b)a(b|t)/{print $0}'
$
$ echo "tac" | gawk '/(c|b)a(b|t)/{print $0}'
$
```

The pattern  (c|b)a(b|t) matches any combination of the letters in the fi rst group along
with any combination of the letters in the second group.



## Regular Expressions in Action
Now that you’ve seen the rules and a few simple demonstrations of using regular expression
patterns, it’s time to put that knowledge into action. The following sections demonstrate
some common regular expression examples within shell scripts.
Counting directory fi les

To start things out, let’s look at a shell script that counts the executable fi les that are pres-
ent in the directories defi ned in your  PATH environment variable. To do that, you need to
parse out the  PATH variable into separate directory names. Chapter 6 showed you how to
display the  PATH environment variable:

```bash
$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/
local/games
$
```

Your  PATH environment variable will differ, depending on where the applications are
located on your Linux system. The key is to recognize that each directory in the  PATH is
separated by a colon. To get a listing of directories that you can use in a script, you must
replace each colon with a space. You now recognize that the  sed editor can do just that
using a simple regular expression:

```bash
$ echo $PATH | sed 's/:/ /g'
/usr/local/sbin /usr/local/bin /usr/sbin /usr/bin /sbin /bin
/usr/games /usr/local/games
$
```

After you have the directories separated out, you can use them in a standard  for state-
ment (see Chapter 13) to iterate through each directory:

```bash
mypath=$(echo $PATH | sed 's/:/ /g')
for directory in $mypath
do
...
done
```

After you have each directory, you can use the  ls command to list each fi le in each direc-
tory, and use another  for statement to iterate through each fi le, incrementing a counter
for each fi le.

The fi nal version of the script looks like this:

```bash
$ cat countfiles
#!/bin/bash
# count number of files in your PATH
mypath=$(echo $PATH | sed 's/:/ /g')
count=0
for directory in $mypath
do
check=$(ls $directory)
for item in $check
do
count=$[ $count + 1 ]
done
echo "$directory - $count"
count=0
done
$ ./countfiles /usr/local/sbin - 0
/usr/local/bin - 2
/usr/sbin - 213
/usr/bin - 1427
/sbin - 186
/bin - 152
/usr/games - 5
/usr/local/games – 0
$
```

Now we’re starting to see some of the power behind regular expressions!


### Validating a phone number
The previous example showed how to incorporate the simple regular expression along with
sed to replace characters in a data stream to process data. Often, regular expressions are
used to validate data to ensure that data is in the correct format for a script.

A common data validation application checks phone numbers. Often, data entry forms
request phone numbers, and often customers fail to enter a properly formatted phone num-
ber. People in the United States use several common ways to display a phone number:

```bash
(123)456-7890
(123) 456-7890
123-456-7890
123.456.7890
```

This leaves four possibilities for how customers can enter their phone number in a form.
The regular expression must be robust enough to handle any of these situations.

When building a regular expression, it’s best to start on the left side and build your pattern
to match the possible characters you’ll run into. In this example, there may or may not be a
left parenthesis in the phone number. This can be matched by using the pattern:

```bash
^\(?
```

The caret is used to indicate the beginning of the data. Because the left parenthesis is a
special character, you must escape it to use it as a normal character. The question mark
indicates that the left parenthesis may or may not appear in the data to match.

Next is the three-digit area code. In the United States, area codes start with the number 2
(no area codes start with the digits 0 or 1), and can go to 9. To match the area code, you’d
use the following pattern:

```bash
[2-9][0-9]{2}
```

This requires that the fi rst character be a digit between 2 and 9, followed by any two digits.
After the area code, the ending right parenthesis may or may not appear:

```bash
\)?
```

After the area code, there can be a space, no space, a dash, or a dot. You can group those
using a character group along with the pipe symbol:

```bash
(| |-|\.)
```

The very fi rst pipe symbol appears immediately after the left parenthesis to match the no
space condition. You must use the escape character for the dot; otherwise, it is interpreted
to match any character.

Next is the three-digit phone exchange number. Nothing special is required here:

```bash
[0-9]{3}
```

After the phone exchange number, you must match a space, a dash, or a dot (this time
you don’t have to worry about matching no space because there must be at least a space
between the phone exchange number and the rest of the number):

```bash
( |-|\.)
```

Then to fi nish things off, you must match the four-digit local phone extension at the end
of the string:

```bash
[0-9]{4}$
```

Putting the entire pattern together results in this:

```bash
^\(?[2-9][0-9]{2}\)?(| |-|\.)[0-9]{3}( |-|\.)[0-9]{4}$
```

You can use this regular expression pattern in the  gawk program to fi lter out bad phone
numbers. Now you just need to create a simple script using the regular expression in a  gawk
program and fi lter your phone list through the script. Remember that when you use regular
expression intervals in the  gawk program, you must use the  --re-interval command
line option, or you won’t get the correct results.

Here’s the script:

```bash
$ cat isphone
#!/bin/bash
# script to filter out bad phone numbers
gawk --re-interval '/^\(?[2-9][0-9]{2}\)?(| |-|\¬
[0-9]{3}( |-|\.)[0-9]{4}/{print $0}'
$
```

Although you can’t tell from this listing, the  gawk command is on a single line in the shell
script. You can then redirect phone numbers to the script for processing:

```bash
$ echo "317-555-1234" | ./isphone
317-555-1234
$ echo "000-555-1234" | ./isphone
$ echo "312 555-1234" | ./isphone
312 555-1234
$
```

Or you can redirect an entire fi le of phone numbers to fi lter out the invalid ones:

```bash
$ cat phonelist
000-000-0000
123-456-7890
212-555-1234
(317)555-1234
(202) 555-9876
33523
1234567890
234.123.4567
$ cat phonelist | ./isphone
212-555-1234
(317)555-1234
(202) 555-9876
234.123.4567
$
```

Only the valid phone numbers that match the regular expression pattern appear.


### Parsing an e-mail address
These days, e-mail has become a crucial form of communication. Trying to validate e-mail
addresses has become quite a challenge for script builders because of the myriad ways to
create an e-mail address. This is the basic form of an e-mail address:

```bash
username@hostname
```

The  username value can use any alphanumeric character, along with several special
characters:

■ Dot
■ Dash
■ Plus sign
■ Underscore

These characters can appear in any combination in a valid e-mail userid. The  hostname
portion of the e-mail address consists of one or more domain names and a server name. The
server and domain names must also follow strict naming rules, allowing only alphanumeric
characters, along with the special characters:

■ Dot
■ Underscore

The server and domain names are each separated by a dot, with the server name specifi ed
fi rst, any subdomain names specifi ed next, and fi nally, the top-level domain name without
a trailing dot.

At one time, the top-level domains were fairly limited, and regular expression
pattern builders attempted to add them all in patterns for validation. Unfortunately, as
the Internet grew, so did the possible top-level domains. This technique is no longer a
viable solution.

Let’s start building the regular expression pattern from the left side. We know that there
can be multiple valid characters in the username. This should be fairly easy:

```bash
^([a-zA-Z0-9_\-\.\+]+)@
```

This grouping specifi es the allowable characters in the username and the plus sign to indi-
cate that at least one character must be present. The next character obviously is the @
symbol — no surprises there.

The hostname pattern uses the same technique to match the server name and the subdo-
main names:

```bash
([a-zA-Z0-9_\-\.]+)
```

This pattern matches the text:

```bash
server
server.subdomain
server.subdomain.subdomain
```

There are special rules for the top-level domain. Top-level domains are only alphabetic characters,
and they must be no fewer than two characters (used in country codes) and no more than fi ve
characters in length. The following is the regular expression pattern for the top-level domain:

```bash
\.([a-zA-Z]{2,5})$
```

Putting the entire pattern together results in the following:

```bash
^([a-zA-Z0-9_\-\.\+]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$
```

This pattern fi lters out poorly formatted e-mail addresses from a data list. Now you can
create your script to implement the regular expression:

```bash
$ echo "rich@here.now" | ./isemail
rich@here.now
$ echo "rich@here.now." | ./isemail
$
$ echo "rich@here.n" | ./isemail
$
$ echo "rich@here-now" | ./isemail
$
$ echo "rich.blum@here.now" | ./isemail
rich.blum@here.now
$ echo "rich_blum@here.now" | ./isemail
rich_blum@here.now
$ echo "rich/blum@here.now" | ./isemail
$
$ echo "rich#blum@here.now" | ./isemail
$
$ echo "rich*blum@here.now" | ./isemail
$
```


### Summary
If you manipulate data fi les in shell scripts, you need to become familiar with regular
expressions. Regular expressions are implemented in Linux utilities, programming
languages, and applications using regular expression engines. A host of different regular
expression engines is available in the Linux world. The two most popular are the POSIX
Basic Regular Expression (BRE) engine and the POSIX Extended Regular Expression (ERE)
engine. The  sed editor conforms mainly to the BRE engine, while the  gawk program uti-
lizes most features found in the ERE engine.

A regular expression defi nes a pattern template that’s used to fi lter text in a data stream.
The pattern consists of a combination of standard text characters and special characters.
The special characters are used by the regular expression engine to match a series of one or
more characters, similarly to how wildcard characters work in other applications.

By combining characters and special characters, you can defi ne a pattern to match almost
any type of data. You can then use the  sed editor or  gawk program to fi lter specifi c data
from a larger data stream, or for validating data received from data entry applications.

The next chapter digs deeper into using the  sed editor to perform advanced text manipula-
tion. Lots of advanced features are available in the  sed editor that make it useful for han-
dling large data streams and fi ltering out just what you need.


---



# Advanced sed

Chapter 19 showed you how to use the basics of the  sed editor to manipulate text in data
streams. The basic  sed editor commands are capable of handling most of your everyday text-
editing requirements. This chapter looks at the more advanced features that the  sed editor
has to offer. These are features that you might not use as often. But when you need them, it’s nice
to know that they’re available and how to use them.


## Looking at Multiline Commands
When using the basic  sed editor commands, you may have noticed a limitation. All the  sed
editor commands perform functions on a single line of data. As the  sed editor reads a data stream,
it divides the data into lines based on the presence of newline characters. The  sed editor handles
each data line one at a time, processing the defi ned script commands on the data line, and then
moving on to the next line and repeating the processing.

Sometimes, you need to perform actions on data that spans more than one line. This is especially
true if you’re trying to fi nd or replace a phrase.

For example, if you’re looking for the phrase  Linux System Administrators Group in your
data, it’s quite possible that the phrase’s words can be split onto two lines. If you processed the
text using a normal  sed editor command, it would be impossible to detect the split phrase.

Fortunately, the designers behind the  sed editor thought of that situation and devised a
solution. The  sed editor includes three special commands that you can use to process mul-
tiline text:

■ N adds the next line in the data stream to create a multiline group for processing.
■ D deletes a single line in a multiline group.
■ P prints a single line in a multiline group.

The following sections examine these multiline commands more closely and demonstrate
how you can use them in your scripts.


### Navigating the next command
Before you can examine the multiline  next command, you fi rst need to look at how the
single-line version of the  next command works. After you know what that command does,
it’s much easier to understand how the multiline version of the  next command operates.


#### Using the single-line next command
The lowercase  n command tells the  sed editor to move to the next line of text in the data
stream, without going back to the beginning of the commands. Remember that normally
the  sed editor processes all the defi ned commands on a line before moving to the next line
of text in the data stream. The single-line  next command alters this fl ow.

This may sound somewhat complicated, and sometimes it is. In this example, you have a
data fi le that contains fi ve lines, two of which are empty. The goal is to remove the blank
line after the header line but leave the blank line before the last line intact. If you write a
sed script to just remove blank lines, you remove both blank lines:

```bash
$ cat data1.txt
This is the header line.
This is a data line.
This is the last line.
$
$ sed '/ ^ $/d' data1.txt
This is the header line.
This is a data line.
This is the last line.
$
```

Because the line you want to remove is blank, you don’t have any text you can search for to
uniquely identify the line. The solution is to use the  n command. In this next example, the

script looks for a unique line that contains the word  header . After the script identifi es that
line, the  n command moves the  sed editor to the next line of text, which is the empty line.

```bash
$ sed '/header/{n ; d}' data1.txt
This is the header line.
This is a data line.
This is the last line.
$
```

At that point, the  sed editor continues processing the command list, which uses the  d
command to delete the empty line. When the  sed editor reaches the end of the command
script, it reads the next line of text from the data stream and starts processing commands
from the top of the command script. The  sed editor does not fi nd another line with the
word  header ; thus, no further lines are deleted.


#### Combining lines of text
Now that you’ve seen the single-line  next command, you can look at the multiline version.
The single-line  next command moves the next line of text from the data stream into the
processing space (called the  pattern space ) of the  sed editor. The multiline version of
the  next command (which uses a capital  N ) adds the next line of text to the text already
in the pattern space.

This has the effect of combining two lines of text from the data stream into the same pat-
tern space. The lines of text are still separated by a newline character, but the  sed editor
can now treat both lines of text as one line.

Here’s a demonstration of how the  N command operates:

```bash
$ cat data2.txt
This is the header line.
This is the first data line.
This is the second data line.
This is the last line.
$
$ sed '/first/{ N ; s/\n/ / }' data2.txt
This is the header line.
This is the first data line. This is the second data line.
This is the last line.
$
```

The  sed editor script searches for the line of text that contains the word “fi rst” in it. When
it fi nds the line, it uses the  N command to combine the next line with that line. It then
uses the  substitution command ( s ) to replace the newline character with a space. The
result is that the two lines in the text fi le appear as one line in the  sed editor output.

This has a practical application if you’re searching for a text phrase that may be split
between two lines in the data fi le. Here’s an example:

```bash
$ cat data3.txt
On Tuesday, the Linux System
Administrator's group meeting will be held.
All System Administrators should attend.
Thank you for your attendance.
$
$ sed 'N ; s/System Administrator/Desktop User/' data3.txt
On Tuesday, the Linux System
Administrator's group meeting will be held.
All Desktop Users should attend.
Thank you for your attendance.
$
```

The  substitution command is looking for the specifi c two-word phrase
System Administrator in the text fi le. In the single line where the phrase appears,
everything is fi ne; the  substitution command can replace the text. But in the situation
where the phrase is split between two lines, the  substitution command doesn’t recog-
nize the matching pattern.

The  N command helps solve this problem:

```bash
$ sed 'N ; s/System.Administrator/Desktop User/' data3.txt
On Tuesday, the Linux Desktop User's group meeting will be held.
All Desktop Users should attend.
Thank you for your attendance.
$
```

By using the  N command to combine the next line with the line where the fi rst word is
found, you can detect when a line split occurs in the phrase.

Notice that the  substitution command uses a wildcard pattern (.) between the word
System and the word  Administrator to match both the space and the newline situation.
However, when it matched the newline character, it removed it from the string, causing the
two lines to merge into one line. This may not be exactly what you want.

To solve this problem, you can use two  substitution commands in the  sed editor script,
one to match the multiline occurrence and one to match the single-line occurrence:

```bash
$ sed 'N
> s/System\nAdministrator/Desktop\nUser/
> s/System Administrator/Desktop User/
> ' data3.txt
On Tuesday, the Linux Desktop
User's group meeting will be held.
All Desktop Users should attend.
Thank you for your attendance.
$
```

The fi rst  substitution command specifi cally looks for the newline character between the
two search words and includes it in the replacement string. This allows you to add the new-
line character in the same place in the new text.

There’s still one subtle problem with this script, however. The script always reads the
next line of text into the pattern space before executing the  sed editor commands. When
it reaches the last line of text, there isn’t a next line of text to read, so the  N command
causes the  sed editor to stop. If the matching text is on the last line in the data stream,
the commands don’t catch the matching data:

```bash
$ cat data4.txt
On Tuesday, the Linux System
Administrator's group meeting will be held.
All System Administrators should attend.
$
$ sed 'N
> s/System\nAdministrator/Desktop\nUser/
> s/System Administrator/Desktop User/
> ' data4.txt
On Tuesday, the Linux Desktop
User's group meeting will be held.
All System Administrators should attend.
$
```

Because the  System Administrator text appears in the last line in the data stream, the
N command misses it, as there isn’t another line to read into the pattern space to combine.
You can easily resolve this problem by moving your single-line commands before the  N com-
mand and having only the multiline commands appear after the  N command, like this:

```bash
$ sed '
> s/System Administrator/Desktop User/
> N
> s/System\nAdministrator/Desktop\nUser/
> ' data4.txt
On Tuesday, the Linux Desktop
User's group meeting will be held.
All Desktop Users should attend.
$
```

Now, the  substitution command that looks for the phrase in a single line works just fi ne
on the last line in the data stream, and the multiline  substitution command covers the
occurrence in the middle of the data stream.


### Navigating the multiline delete command
Chapter 19 introduced the single-line  delete command ( d ). The  sed editor uses it to
delete the current line in the pattern space. If you’re working with the  N command, how-
ever, you must be careful when using the single-line  delete command:

```bash
$ sed 'N ; /System\nAdministrator/d' data4.txt
All System Administrators should attend.
$
```

The  delete command looked for the words  System and  Administrator in separate lines
and deleted both of the lines in the pattern space. This may or may not have been what you
intended.

The  sed editor provides the multiline  delete command ( D ), which deletes only the
fi rst line in the pattern space. It removes all characters up to and including the newline
character:

```bash
$ sed 'N ; /System\nAdministrator/D' data4.txt
Administrator's group meeting will be held.
All System Administrators should attend.
$
```

The second line of text, added to the pattern space by the  N command, remains intact. This
comes in handy if you need to remove a line of text that appears before a line that you fi nd
a data string in.

Here’s an example of removing a blank line that appears before the fi rst line in a data
stream:

```bash
$ cat data5.txt
This is the header line.
This is a data line.
This is the last line.
$
$ sed '/^$/{N ; /header/D}' data5.txt
This is the header line.
This is a data line.
This is the last line.
$
```

This  sed editor script looks for blank lines and then uses the  N command to add the next
line of text into the pattern space. If the new pattern space contents contain the word

header , the  D command removes the fi rst line in the pattern space. Without the combina-
tion of the  N and  D commands, it would be impossible to remove the fi rst blank line with-
out removing all other blank lines.


### Navigating the multiline print command
By now, you’re probably catching on to the difference between the single-line and multiline
versions of the commands. The multiline print command ( P ) follows along using the same
technique. It prints only the fi rst line in a multiline pattern space. This includes all char-
acters up to the newline character in the pattern space. It is used in much the same way as
the single-line  p command to display text when you use the  -n option to suppress output
from the script.

```bash
$ sed -n 'N ; /System\nAdministrator/P' data3.txt
On Tuesday, the Linux System
$
```

When the multiline match occurs, the  P command prints only the fi rst line in the pattern
space. The power of the multiline  P command comes into play when you combine it with
the  N and  D multiline commands.

The  D command has a unique feature in that it forces the  sed editor to return to the begin-
ning of the script and repeat the commands on the same pattern space (it doesn’t read
a new line of text from the data stream). By including the  N command in the command
script, you can effectively single-step through the pattern space, matching multiple lines
together.

Next, by using the  P command, you can print the fi rst line, and then using the  D command,
you can delete the fi rst line and loop back to the beginning of the script. When you are
back at the script’s beginning, the  N command reads in the next line of text and starts the
process all over again. This loop continues until you reach the end of the data stream.



## Holding Space
The  pattern space is an active buffer area that holds the text examined by the  sed editor
while it processes commands. However, it isn’t the only space available in the  sed editor for
storing text.

The  sed editor utilizes another buffer area called the  hold space . You can use the hold
space to temporarily hold lines of text while working on other lines in the pattern space.
The fi ve commands associated with operating with the hold space are shown in Table 21-1.

**TABLE 21-1 The sed Editor Hold Space Commands**
| Command | Description |
| :--- | :--- |
| h | Copies pattern space to hold space |
| H | Appends pattern space to hold space |
| g | Copies hold space to pattern space |
| G | Appends hold space to pattern space |
| x | Exchanges contents of pattern and hold spaces |

These commands let you copy text from the pattern space to the hold space. This frees up
the pattern space to load another string for processing.

Usually, after using the  h or  H commands to move a string to the hold space, eventually you
want to use the  g ,  G , or  x commands to move the stored string back into the pattern space
(otherwise, you wouldn’t have cared about saving them in the fi rst place).

With two buffer areas, trying to determine what line of text is in which buffer area can
sometimes get confusing. Here’s a short example that demonstrates how to use the  h and  g
commands to move data back and forth between the  sed editor buffer spaces:

```bash
$ cat data2.txt
This is the header line.
This is the first data line.
This is the second data line.
This is the last line.
$
$ sed -n '/first/ {h ; p ; n ; p ; g ; p }' data2.txt
This is the first data line.
This is the second data line.
This is the first data line.
$
```

Look at the preceding code example step by step:

1. The  sed script uses a regular expression in the address to fi lter the line containing the word  first .
2. When the line containing the word  first appears, the initial command in  {} , the h command, places the line in the hold space.
3. The next command, the  p command, prints the contents of the pattern space, which is still the fi rst data line.
4. The  n command retrieves the next line in the data stream ( This is the second data line ) and places it in the pattern space.
5. The  p command prints the contents of the pattern space, which is now the second data line.
6. The  g command places the contents of the hold space ( This is the first data line ) back into the pattern space, replacing the current text.
7. The  p command prints the current contents of the pattern space, which is now back to the fi rst data line.

By shuffl ing the text lines around using the hold space, you can force the fi rst data line to
appear after the second data line in the output. If you just drop the fi rst  p command, you
can output the two lines in reverse order:

```bash
$ sed -n '/first/ {h ; n ; p ; g ; p }' data2.txt
This is the second data line.
This is the first data line.
$
```

This is the start of something useful. You can use this technique to create a  sed script that
reverses an entire fi le of text lines! To do that, however, you need to see the negating fea-
ture of the  sed editor, which is what the next section is all about.


### Negating a Command
Chapter 19 showed that the  sed editor applies commands either to every text line in the
data stream or to lines specifi cally indicated by either a single address or an address range.
You can also confi gure a command to not apply to a specifi c address or address range in the
data stream.

The exclamation mark command ( ! ) is used to negate a command. This means in situations
where the command would normally have been activated, it isn’t. Here’s an example demon-
strating this feature:

```bash
$ sed -n '/header/!p' data2.txt
This is the first data line.
This is the second data line.
This is the last line.
$
```

The normal  p command would have printed only the line in the  data2 fi le that contained
the word  header . By adding the exclamation mark, the opposite happens — all lines in the
fi le are printed except the one that contained the word  header .

Using the exclamation mark comes in handy in several applications. Recall that earlier in
the chapter, the “Navigating the next command” section showed a situation where a  sed
editor command wouldn’t operate on the last line of text in the data stream because there
wasn’t a line after it. You can use the exclamation point to fi x that problem:

```bash
$ sed 'N;
> s/System\nAdministrator/Desktop\nUser/
> s/System Administrator/Desktop User/
> ' data4.txt
On Tuesday, the Linux Desktop
User's group meeting will be held.
All System Administrators should attend.
$
$ sed '$!N;
> s/System\nAdministrator/Desktop\nUser/
> s/System Administrator/Desktop User/
> ' data4.txt
On Tuesday, the Linux Desktop
User's group meeting will be held.
All Desktop Users should attend.
$
```

This example shows the exclamation mark used with the  N command, along with the dollar
sign ( $ ) special address. The dollar sign represents the last line of text in the data stream,
so when the  sed editor reaches the last line, it doesn’t execute the  N command. However,
for all other lines, it does execute the command.

Using this technique, you can reverse the order of text lines in a data stream. To reverse
the order of the lines as they appear in the text stream (display the last line fi rst and the
fi rst line last), you need to do some fancy footwork using the hold space.

The pattern you need to work with goes like this:

1. Place a line in the pattern space.
2. Place the line from the pattern space to the hold space.
3. Put the next line of text in the pattern space.
4. Append the hold space to the pattern space.
5. Place everything in the pattern space into the hold space.
6. Repeat Steps 3 through 5 until you’ve put all the lines in reverse order in the hold space.
7. Retrieve the lines, and print them.
   
Figure 21-1 diagrams what this looks like in more detail.

When using this technique, you do not want to print lines as they are processed. This
means using the  -n command line option for  sed . The next thing to determine is how to
append the hold space text to the pattern space text. This is done by using the  G command.
The only problem is that you don’t want to append the hold space to the fi rst line of text
processed. This is easily solved by using the exclamation mark command:

```bash
1!G
```

The next step is to place the new pattern space (the text line with the appended reverse
lines) into the hold space. This is simple enough; just use the  h command.

When you’ve got the entire data stream in the pattern space in reverse order, you just need
to print the results. You know you have the entire data stream in the pattern space when
you’ve reached the last line in the data stream. To print the results, just use the following
command:

```bash
$p
```

**FIGURE 21-1 Reversing the order of a text file using the hold space**


Those are the pieces you need to create your line-reversing  sed editor script. Now try it out
in a test run:

```bash
$ cat data2.txt
This is the header line.
This is the first data line.
This is the second data line.
This is the last line.
$
$ sed -n '{1!G ; h ; $p }' data2.txt
This is the last line.
This is the second data line.
This is the first data line.
This is the header line.
$
```

The  sed editor script performed as expected. The output from the script reverses the origi-
nal lines in the text fi le. This demonstrates the power of using the hold space in your  sed
scripts. It provides an easy way to manipulate the order of lines in the script output.

> [!NOTE] In case you’re wondering, a bash shell command can perform the function of reversing a text fi le. The  tac command
displays a text fi le in reverse order. You probably noticed the clever name of the command because it performs the
reverse function of the  cat command.



## Changing the Flow
Normally, the  sed editor processes commands starting at the top and proceeding toward
the end of the script (the exception is the  D command, which forces the  sed editor to
return to the top of the script without reading a new line of text). The  sed editor provides
a method for altering the fl ow of the command script, producing a result similar to that of a
structured programming environment.


### Branching
In the previous section, you saw how the exclamation mark command is used to negate
the effect of a command on a line of text. The  sed editor provides a way to negate an
entire section of commands, based on an address, an address pattern, or an address range.
This allows you to perform a group of commands only on a specifi c subset within the data
stream.

Here’s the format of the  branch command:

```bash
[address]b [label]
```

The  address parameter determines which line or lines of data trigger the  branch com-
mand. The  label parameter defi nes the location to branch to. If the  label parameter is
not present, the  branch command proceeds to the end of the script.

```bash
$ cat data2.txt
This is the header line.
This is the first data line.
This is the second data line.
This is the last line.
$
$ sed '{2,3b ; s/This is/Is this/ ; s/line./test?/}' data2.txt
Is this the header test?
This is the first data line.
This is the second data line.
Is this the last test?
$
```

The  branc h command skips the two  substitution commands for the second and third
lines in the data stream.

Instead of going to the end of the script, you can defi ne a label for the  branch command
to jump to. Labels start with a colon and can be up to seven characters in length:

```bash
:label2
```

To specify the label, just add it after the  b command. Using labels allows you to skip com-
mands that match the  branch address but still process other commands in the script:

```bash
$ sed '{/first/b jump1 ; s/This is the/No jump on/
> :jump1
> s/This is the/Jump here on/}' data2.txt
No jump on header line
Jump here on first data line
No jump on second data line
No jump on last line
$
```

The  branch command specifi es that the program should jump to the script line labeled
jump1 if the matching text “fi rst” appears in the line. If the  branch command pattern
doesn’t match, the  sed editor continues processing commands in the script, including the
command after the  branch label. (Thus, all three  substitution commands are processed
on lines that don’t match the  branch pattern.)

If a line matches the  branch pattern, the  sed editor branches to the  branch label line.
Thus, only the last  substitution command is executed.

The example shows branching to a label further down in the  sed script. You can also
branch to a label that appears earlier in the script, thus creating a looping effect:

```bash
$ echo "This, is, a, test, to, remove, commas." | sed -n '{
> :start
> s/,//1p
> b start
> }'
This is, a, test, to, remove, commas.
This is a, test, to, remove, commas.
This is a test, to, remove, commas.
This is a test to, remove, commas.
This is a test to remove, commas.
This is a test to remove commas.
^C
$
```

Each script iteration removes the fi rst occurrence of a comma from the text string and
prints the string. There’s one catch to this script: It never ends. This situation creates an
endless loop, searching for commas until you manually stop it by sending a signal with the
Ctrl+C key combination.

To prevent this problem, you should specify an address pattern for the  branch command to
look for. If the pattern isn’t present, the branching should stop:

```bash
$ echo "This, is, a, test, to, remove, commas." | sed -n '{
> :start
> s/,//1p
> /,/b start
> }'
This is, a, test, to, remove, commas.
This is a, test, to, remove, commas.
This is a test, to, remove, commas.
This is a test to, remove, commas.
This is a test to remove, commas.
This is a test to remove commas.
$
```

Now the  branch command branches only if there’s a comma in the line. After the last
comma has been removed, the  branch command doesn’t execute, allowing the script to
properly fi nish.


### Testing
Similar to the  branch command, the  test command ( t ) is also used to modify the fl ow
of the  sed editor script. Instead of jumping to a label based on an address, the  test com-
mand jumps to a label based on the outcome of a  substitution command.

If the  substitution command successfully matches and substitutes a pattern, the  test
command branches to the specifi ed label. If the  substitution command doesn’t match
the specifi ed pattern, the  test command doesn’t branch.

The  test command uses the same format as the  branch command:

```bash
[address]t [label]
```

Like the  branch command, if you don’t specify a label,  sed branches to the end of the
script if the test succeeds.

The  test command provides a cheap way to perform a basic  if-then statement on the
text in the data stream. For example, if you don’t need to make a substitution if another
substitution was made, the  test command can help:

```bash
$ sed '{
> s/first/matched/
> t
> s/This is the/No match on/
> }' data2.txt
No match on header line
This is the matched data line
No match on second data line
No match on last line
$
```

The fi rst  substitution command looks for the pattern text  first . If it matches the
pattern in the line, it replaces the text, and the  test command jumps over the second
substitution command. If the fi rst  substitution command doesn’t match the pattern,
the second  substitution command is processed.

Using the  test command, you can clean up the loop you tried using the  branch command:

```bash
$ echo "This, is, a, test, to, remove, commas. " | sed -n '{
> :start
> s/,//1p
> t start
> }'
This is, a, test, to, remove, commas.
This is a, test, to, remove, commas.
This is a test, to, remove, commas.
This is a test to, remove, commas.
This is a test to remove, commas.
This is a test to remove commas.
$
```

When there are no more substitutions to make, the  test command doesn’t branch and con-
tinues with the rest of the script.



## Replacing via a Pattern
You’ve seen how to use patterns in the  sed commands to replace text in the data stream.
However, when using wildcard characters it’s not easy to know exactly what text will match
the pattern.

For example, say that you want to place double quotation marks around a word you match
in a line. That’s simple enough if you’re just looking for one word in the pattern to match:

```bash
$ echo "The cat sleeps in his hat." | sed 's/cat/"cat"/'
The "cat" sleeps in his hat.
$
```

But what if you use a wildcard character (.) in the pattern to match more than one word?

```bash
$ echo "The cat sleeps in his hat." | sed 's/.at/".at"/g'
The ".at" sleeps in his ".at".
$
```

The substitution string used the dot wildcard character to match any occurrence of a letter
followed by “at”. Unfortunately, the replacement string doesn’t match the wildcard charac-
ter value of the matching word.


### Using the ampersand
The  sed editor has a solution for you. The ampersand symbol ( & ) is used to represent the
matching pattern in the  substitution command. Whatever text matches the pattern
defi ned, you can use the ampersand symbol to recall it in the replacement pattern. This lets
you manipulate whatever word matches the pattern defi ned:

```bash
$ echo "The cat sleeps in his hat." | sed 's/.at/"&"/g'
The "cat" sleeps in his "hat".
$
```

When the pattern matches the word cat, “cat” appears in the substituted word. When it
matches the word hat, “hat” appears in the substituted word.



### Replacing individual words
The ampersand symbol retrieves the entire string that matches the pattern you specify
in the  substitution command. Sometimes, you’ll only want to retrieve a subset of the
string. You can do that, too, but it’s a little tricky.

The  sed editor uses parentheses to defi ne a substring component within the substitution
pattern. You can then reference each substring component using a special character in the
replacement pattern. The replacement character consists of a backslash and a number. The
number indicates the substring component’s position. The  sed editor assigns the fi rst com-
ponent the character  \1 , the second component the character  \2 , and so on.

> [!CAUTION] When you use parentheses in the  substitution command, you must use the escape character to identify them
as grouping characters and not normal parentheses. This is the reverse of when you escape other special characters.

Look at an example of using this feature in a  sed editor script:

```bash
$ echo "The System Administrator manual" | sed '
> s/\(System\) Administrator/\1 User/'
The System User manual
$
```

This  substitution command uses one set of parentheses around the word  System identi-
fying it as a substring component. It then uses the  \1 in the replacement pattern to recall
the fi rst identifi ed component. This isn’t too exciting, but it can really be useful when
working with wildcard patterns.

If you need to replace a phrase with just a single word, that’s a substring of the phrase, but
that substring just happens to be using a wildcard character; using substring components
is a lifesaver:

```bash
$ echo "That furry cat is pretty" | sed 's/furry \(.at\)/\1/'
That cat is pretty
$
$ echo "That furry hat is pretty" | sed 's/furry \(.at\)/\1/'
That hat is pretty
$
```

In this situation, you can’t use the ampersand symbol, because it would replace the entire
matching pattern. The substring component provides the answer, allowing you to select
just which part of the pattern to use as the replacement pattern.

This feature can be especially helpful when you need to insert text between two or more
substring components. Here’s a script that uses substring components to insert a comma in
long numbers:

```bash
$ echo "1234567" | sed '{
> :start
> s/\(.*[0-9]\)\([0-9]\{3\}\)/\1,\2/
> t start
> }'
1,234,567
$
```

The script divides the matching pattern into two components:

```bash
.*[0-9]
[0-9]{3}
```

This pattern looks for two substrings. The fi rst substring is any number of characters,
ending in a digit. The second substring is a series of three digits (see Chapter 20 for infor-
mation about how to use braces in a regular expression). If this pattern is found in the
text, the replacement text puts a comma between the two components, each identifi ed by
its component position. The script uses the  test command to iterate through the number
until all commas have been placed.


## Placing sed Commands in Scripts
Now that you’ve seen the various parts of the  sed editor, it’s time to put them together
and use them in your shell scripts. This section demonstrates some of the features that you
should know about when using the  sed editor in your bash shell scripts.


### Using wrappers
You may have noticed that trying to implement a  sed editor script can be cumbersome,
especially if the script is long. Instead of having to retype the entire script each time you
want to use it, you can place the  sed editor command in a shell script  wrapper . The wrap-
per acts as a go-between for the  sed editor script and the command line.

Once inside the shell script, you can use normal shell variables and parameters with your
sed editor scripts. Here’s an example of using the command line parameter variable as the
input to a  sed script:

```bash
$ cat reverse.sh
#!/bin/bash
# Shell wrapper for sed editor script.
# to reverse text file lines.
#
sed -n '{ 1!G ; h ; $p }' $1
#
$
```

The shell script called  reverse uses the  sed editor script to reverse text lines in a data
stream. It uses the  $1 shell parameter to retrieve the fi rst parameter from the command
line, which should be the name of the fi le to reverse:

```bash
$ ./reverse.sh data2.txt
This is the last line.
This is the second data line.
This is the first data line.
This is the header line.
$
```

Now you can easily use the  sed editor script on any fi le, without having to constantly
retype the entire command line.


### Redirecting sed output
By default, the  sed editor outputs the results of the script to  STDOUT . You can employ all
the standard methods of redirecting the output of the  sed editor in your shell scripts.

You can use dollar sign/parenthesis,  $() , to redirect the output of your  sed editor com-
mand to a variable for use later in the script. The following is an example of using the  sed
script to add commas to the result of a numeric computation:

```bash
$ cat fact.sh
#!/bin/bash
# Add commas to number in factorial answer
#
factorial=1
counter=1
number=$1
#
while [ $counter -le $number ]
do
factorial=$[ $factorial * $counter ]
counter=$[ $counter + 1 ]
done
#
result=$(echo $factorial | sed '{
:start
s/\(.*[0-9]\)\([0-9]\{3\}\)/\1,\2/
t start
}')
#
echo "The result is $result"
#
$
$ ./fact.sh 20
The result is 2,432,902,008,176,640,000
$
```

After you use the normal factorial calculation script, the result of that script is used as the
input to the  sed editor script, which adds commas. This value is then used in the  echo
statement to produce the result.


## Creating sed Utilities
As you’ve seen in the short examples presented so far in this chapter, you can do lots of
cool data-formatting things with the  sed editor. This section shows a few handy well-
known  sed editor scripts for performing common data-handling functions.


### Spacing with double lines
To start things off, look at a simple  sed script to insert a blank line between lines in a
text fi le:

```bash
$ sed 'G' data2.txt
This is the header line.
This is the first data line.
This is the second data line.
This is the last line.
$
```

That was pretty simple! The key to this trick is the default value of the hold space.
Remember that the  G command simply appends the contents of the hold space to the cur-
rent pattern space contents. When you start the  sed editor, the hold space contains an
empty line. By appending that to an existing line, you create a blank line after the exist-
ing line.

You may have noticed that this script also adds a blank line to the last line in the data
stream, producing a blank line at the end of the fi le. If you want to get rid of this, you can
use the negate symbol and the last line symbol to ensure that the script doesn’t add the
blank line to the last line of the data stream:

```bash
$ sed '$!G' data2.txt
This is the header line.
This is the first data line.
This is the second data line.
This is the last line.
$
```

Now that looks a little better. As long as the line isn’t the last line, the  G command
appends the contents of the hold space. When the  sed editor gets to the last line, it skips
the  G command.


### Spacing fi les that may have blanks
To take double spacing one step further, what if the text fi le already has a few blank lines,
but you want to double space all the lines? If you use the previous script, you’ll get some
areas that have too many blank lines, because each existing blank line gets doubled:

```bash
$ cat data6.txt
This is line one.
This is line two.
This is line three.
This is line four.
$
$ sed '$!G' data6.txt
This is line one.
This is line two.
This is line three.
This is line four.
$
```

Now you have three blank lines where the original blank line was located. The solution to
this problem is to fi rst delete any blank lines from the data stream and then use the  G com-
mand to insert new blank lines after all the lines. To delete existing blank lines, you just
need to use the  d command with a pattern that matches a blank line:

```bash
/ ^ $/d
```

This pattern uses the start line tag (the caret) and the end line tag (the dollar sign).
Adding this pattern to the script produces the desired results:

```
$ sed '/^$/d ; $!G' data6.txt
This is line one.
This is line two.
This is line three.
This is line four.
$
```

Perfect! It works just as expected.


### Numbering lines in a fi le
Chapter 19 showed you how to use the equal sign to display the line numbers of lines in the
data stream:

```bash
$ sed '=' data2.txt
1
This is the header line.
2
This is the first data line.
3
This is the second data line.
4
This is the last line.
$
```

This can be a little awkward to read, because the line number is on a line above the actual
line in the data stream. A better solution is to place the line number on the same line as
the text.

Now that you’ve seen how to combine lines using the  N command, it shouldn’t be too hard
to utilize that information in the  sed editor script. The trick to this utility, however, is
that you can’t combine the two commands in the same script.

After you have the output for the equal sign command, you can pipe the output to another
sed editor script that uses the  N command to combine the two lines. You also need to use
the  substitution command to replace the newline character with either a space or a tab
character. Here’s what the fi nal solution looks like:

```bash
$ sed '=' data2.txt | sed 'N; s/\n/ /'
1 This is the header line.
2 This is the first data line.
3 This is the second data line.
4 This is the last line.
$
```

Now that looks much better. This is a great little utility to have around when working on
programs where you need to see the line numbers used in error messages.

There are bash shell commands that can also add line numbers. However, they add some
additional (and potentially unwanted spacing):

```bash
$ nl data2.txt
1 This is the header line.
2 This is the first data line.
3 This is the second data line.
4 This is the last line.
$
$ cat -n data2.txt
1 This is the header line.
2 This is the first data line.
3 This is the second data line.
4 This is the last line.
$
```

The  sed editor script handles the output without any additional spacing.


### Printing last lines
So far, you’ve seen how to use the  p command to print all the lines in a data stream or just
lines that match a specifi c pattern. What if you just need to work with the last few lines of
a long listing, such as a log fi le?

The dollar sign represents the last line of a data stream, so it’s easy to display just the
last line:

```bash
$ sed -n '$p' data2.txt
This is the last line.
$
```

Now how can you use the dollar sign symbol to display a set number of lines at the end of
the data stream? The answer is to create a rolling window.

A rolling window is a common way to examine blocks of text lines in the pattern space by
combining them using the  N command. The  N command appends the next line of text to
the text already in the pattern space. After you have a block of 10 text lines in the pattern
space, you can check to see if you’re at the end of the data stream using the dollar sign. If
you’re not at the end, continue adding more lines to the pattern space, while removing the
original lines (remember the  D command, which deletes the fi rst line in the pattern space).

By looping through the  N and  D commands, you add new lines to the block of lines in the
pattern space while removing old lines. The  branch command is the perfect fi t for the
loop. To end the loop, just identify the last line and use the  q command to quit.

Here’s what the fi nal  sed editor script looks like:

```bash
$ cat data7.txt
This is line 1.
This is line 2.
This is line 3.
This is line 4.
This is line 5.
This is line 6.
This is line 7.
This is line 8.
This is line 9.
This is line 10.
This is line 11.
This is line 12.
This is line 13.
This is line 14.
This is line 15.
$
$ sed '{
> :start
> $q ; N ; 11,$D
> b start
> }' data7.txt
This is line 6.
This is line 7.
This is line 8.
This is line 9.
This is line 10.
This is line 11.
This is line 12.
This is line 13.
This is line 14.
This is line 15.
$
```

The script fi rst checks whether the line is the last line in the data stream. If it is, the  quit
command stops the loop. The  N command appends the next line to the current line in the
pattern space. The  11,$D command deletes the fi rst line in the pattern space if the current
line is after line 10. This creates the sliding window effect in the pattern space. Thus, the
sed program script displays only the last 10 lines of the  data7.txt fi le.


### Deleting lines
Another useful utility for the  sed editor is to remove unwanted blank lines in a data
stream. It’s easy to remove all the blank lines from a data stream, but it takes a little inge-
nuity to selectively remove blank lines. This section shows you a couple of quick  sed editor
scripts that you can use to help remove unwanted blank lines from your data.


#### Deleting consecutive blank lines
It can be a nuisance when extra blank lines crop up in data fi les. Often you have a data
fi le that contains blank lines, but sometimes a data line is missing and produces too many
blank lines (as you saw in the double-spacing example earlier).

The easiest way to remove consecutive blank lines is to check the data stream using a
range address. Chapter 19 showed you how to use ranges in addresses, including how to
incorporate patterns in the address range. The  sed editor executes the command for all
lines that match within the specifi ed address range.

The key to removing consecutive blank lines is to create an address range that includes
a non-blank line and a blank line. If the  sed editor comes across this range, it shouldn’t
delete the line. However, for lines that don’t match that range (two or more blank lines in a
row), it should delete the lines.

Here’s the script to do this:

```bash
/./,/ ^ $/!d
```

The range is /./ to  / ^ $/ . The start address in the range matches any line that contains at
least one character. The end address in the range matches a blank line. Lines within this
range aren’t deleted.

Here’s the script in action:

```bash
$ cat data8.txt
This is line one.


This is line two.

This is line three.


This is line four.
$
$ sed '/./,/^$/!d' data8.txt
This is line one.

This is line two.

This is line three.

This is line four.
$
```

No matter how many blank lines appear between lines of data in the fi le, the output places
only one blank line between the lines.


#### Deleting leading blank lines
It is also a nuisance when data fi les contain multiple blank lines at the start of the fi le.
Often when you are trying to import data from a text fi le into a database, the blank lines
create null entries, throwing off any calculations using the data.

Removing blank lines from the top of a data stream is not a diffi cult task. Here’s the script
that accomplishes that function:

```bash
/./,$!d
```

The script uses an address range to determine what lines are deleted. The range starts
with a line that contains a character and continues to the end of the data stream. Any line
within this range is not deleted from the output. This means that any lines before the fi rst
line that contain a character are deleted.

Look at this simple script in action:

```bash
$ cat data9.txt


This is line one.

This is line two.
$
$ sed '/./,$!d' data9.txt
This is line one.

This is line two.
$
```

The test fi le contains two blank lines before the data lines. The script successfully removes
both of the leading blank lines, while keeping the blank line within the data intact.

#### Deleting trailing blank lines
Unfortunately, deleting trailing blank lines is not as simple as deleting leading blank lines.
Just like printing the end of a data stream, deleting blank lines at the end of a data stream
requires a little ingenuity and looping.

Before we start the discussion, let’s see what the script looks like:

```bash
sed '{
:start
/ ^ \n*$/{$d; N; b start }
}'
```

This may look a little odd to you at fi rst. Notice that there are braces within the normal
script braces. This allows you to group commands together within the overall command
script. The group of commands applies to the specifi ed address pattern. The address pattern
matches any line that contains only a newline character. When one is found, if it’s the last
line, the  delete command deletes it. If it’s not the last line, the  N command appends the
next line to it, and the  branch command loops to the beginning to start over.

Here’s the script in action:

```bash
$ cat data10.txt
This is the first line.
This is the second line.



$ sed '{
> :start
> /^\n*$/{$d ; N ; b start }
> }' data10.txt
This is the first line.
This is the second line.
$
```

The script successfully removed the blank lines from the end of the text fi le.


### Removing HTML tags
These days, it’s not uncommon to download text from a website to save or use as data in an
application. Sometimes, however, when you download text from the website, you also get
the HTML tags used to format the data. This can be a problem when all you want to see is
the data.

A standard HTML web page contains several different types of HTML tags, identifying for-
matting features required to properly display the page information. Here’s a sample of what
an HTML fi le looks like:

```bash
$ cat data11.txt
<html>
<head>
<title>This is the page title</title>
</head>
<body>
<p>
This is the <b>first</b> line in the Web page.
This should provide some <i>useful</i>
information to use in our sed script.
</body>
</html>
$
```

HTML tags are identifi ed by the less-than and greater-than symbols. Most HTML tags come
in pairs. One tag starts the formatting process (for example,  <b> for bolding), and another
tag stops the formatting process (for example,  </b> to turn off bolding).

Removing HTML tags creates a problem, however, if you’re not careful. At fi rst glance, you’d
think that the way to remove HTML tags would be to just look for a text string that starts
with a less-than symbol (<), ends with a greater-than symbol (>), and has data in between
the symbols:

```bash
s/<.*>//g
```

Unfortunately, this command has some unintended consequences:

```bash
$ sed 's/<.*>//g' data11.txt






This is the line in the Web page.
This should provide some
information to use in our sed script.

$
```

Notice that the title text is missing, along with the text that was bolded and italicized.
The  sed editor literally interpreted the script to mean any text between the less-than and
greater-than sign, including other less-than and greater-than signs! Each time the text was
enclosed in HTML tags (such as  <b>first</b> ), the  sed script removed the entire text.

The solution to this problem is to have the  sed editor ignore any embedded greater-than
signs between the original tags. To do that, you can create a character class that negates
the greater-than sign. This changes the script to:

```bash
s/<[ ^ >]*>//g
```

This script now works properly, displaying the data you need to see from the web page
HTML code:

```bash
$ sed 's/<[^>]*>//g' data11.txt

This is the page title


This is the first line in the Web page.
This should provide some useful
information to use in our sed script.


$
```

That’s a little better. To clean things up some, you can add a  delete command to get rid of
those pesky blank lines:

```bash
$ sed 's/<[^>]*>//g ; /^$/d' data11.txt
This is the page title
This is the first line in the Web page.
This should provide some useful
information to use in our sed script.
$
```

Now that’s much more compact; there’s only the data you need to see.


## Summary
The  sed editor provides some advanced features that allow you to work with text patterns
across multiple lines. This chapter showed you how to use the  next command to retrieve
the next line in a data stream and place it in the pattern space. Once in the pattern space,
you can perform complex  substitution commands to replace phrases that span more
than one line of text.

The multiline  delete command allows you to remove the fi rst line when the pattern space
contains two or more lines. This is a convenient way to iterate through multiple lines in
the data stream. Similarly, the multiline  print command allows you to print just the fi rst
line when the pattern space contains two or more lines of text. The combination of the
multiline commands allows you to iterate through the data stream and create a multiline
substitution system.

Next, we covered the hold space. The hold space allows you to set aside a line of text while
processing more lines of text. You can recall the contents of the hold space at any time and
either replace the text in the pattern space or append the contents of the hold space to the
text in the pattern space. Using the hold space allows you to sort through data streams,
reversing the order of text lines as they appear in the data.

Next we reviewed the various  sed editor fl ow control commands. The  branch command
provides a way for you to alter the normal fl ow of  sed editor commands in the script,
creating loops or skipping commands under certain conditions. The  test command pro-
vides an  if-then type of statement for your  sed editor command scripts. The  test
command branches only if a prior  substitution command succeeds in replacing text
in a line.

The chapter concluded with a discussion of how to use  sed scripts in your shell scripts. A
common technique for large  sed scripts is to place the script in a shell wrapper. You can
use command line parameter variables within the  sed script to pass shell command line
values. This creates an easy way to utilize your  sed editor scripts directly from the com-
mand line, or even from other shell scripts.

The next chapter digs deeper into the  gawk world. The  gawk program supports many
features of higher-level programming languages. You can create some pretty involved data
manipulation and reporting programs just by using  gawk  . The chapter describes the vari-
ous programming features and demonstrates how to use them to generate your own fancy
reports from simple data.




