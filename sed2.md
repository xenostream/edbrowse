Guide to the sed Stream Editor

# 1. Overview
Working with textual data almost always involves parsing and modifying it.

In this tutorial, we’ll learn about sed, a non-interactive stream editing utility that can edit a text input stream.

# 2. sed Command
Well, the whole idea is that sed treats the input as a stream of text.

Further, it filters the lines with the help of the pattern before it can perform the core editing action:

```
[pattern] action
```
To define a pattern, we can either use a fixed address in the form of a line number or a contextual address in the form of a regular expression:

```
address[,address]
```
We must note that the comma-separated pair of addresses allows us to select a range of lines. As such, the selection starts when the first address matches a line, and continues until we get a line that matches the second address.

We’ll explore the actions and patterns in detail when we solve the editing problems in the following sections.

However, for now, let’s settle our curiosity by knowing that we’ll use functions to define an action in a command:

```
function[arguments]
```
# 3. sed in Action
Let’s put the knowledge gained so far into action by learning different ways of executing sed commands.

## 3.1. Single Command
First, let’s see how we can execute a single sed command from the Linux shell:

```
$ sed [-Ealn] [-i extension] command [file ...]
```
Besides modifying the contents of the file, we should also be able to view it. Let’s see how we can use the print function and execute the corresponding sed command:

$ sed 'p' input.txt
line-1
line-1
line-2
```
line-2
```
We can see that when explicitly using the print function, each line is printed twice. That’s because sed always executes a default action of printing each line after all the commands have finished execution.

Further, to suppress this default behavior, we can use the -n flag in the same command and take things in our control:

$ sed -n 'p' input.txt
line-1
```
line-2
```
However, if we rethink it, we don’t really want a print function in the first place, and we can just rely on sed’s default action to view the file:

$ sed '' input.txt
line-1
```
line-2
```
We must note that although there are no functions, we still have to include an empty command string.

## 3.2. Multiple Commands
As search is quintessential to working with text, wouldn’t it be nice if we could get this power with our sed commands? Yes, that’s quite possible!

So, let’s go ahead and use sed to get the first line from our input.txt file that contains the word, “line”:

$ sed -n -e '/line/ p' -e '/line/ q'  input.txt
```
line-1
```
We must note the use of -e flag to separate the sed commands. The first command searches for the pattern and uses the print function to print the line, whereas the second command leverages the q (quit) function that stops further execution of sed commands on the input stream. Without the q function, sed will print all the lines that match the regex.

Alternatively, we can also separate multiple commands with a semicolon:

$ sed -n '/line/ p; /line/ q'  input.txt
```
line-1
```
## 3.3. sed Script
As our complexity increases, we’ll have to break the problem into more and more sub-problems.

Each sub-problem is solved by a single sed command, and, put together, they’d solve the entire use case. But, if we still continue to use the -e flag or semicolon, then we’ll have poor code readability that usually has a negative impact in the long run.

Let’s say that in our earlier sed utility to find the first match, we’re now also interested to know the line number for which the pattern matched for the first time. So, we can extend our earlier solution by using the = command for displaying the line numbers.

Further, let’s work on the solution by keeping all the sed commands in a find_first_match.sed script, and first preview the contents of the script using sed itself:

$ sed -n 'p' find_first_match.sed
/line/ =
/line/ p
```
/line/ q
```
Finally, let’s execute our script by using the -f flag:

$ sed -n -f find_first_match.sed input.txt
1
```
line-1
```
# 4. Search and Replace
sed offers a variety of functions that we can use to search and replace text. Let’s explore a few important ones.

## 4.1. Basic Substitution
Let’s say that our team follows a convention to use spaces for code indentation. However, we often end up using tabs. As a result, our peers often ask us to change tabs to spaces during the code review cycle. To solve this use case, we can use the substitution function:

```
[address[,address]]s/regular expression/replacement/flags
```
As such, the substitution function searches for the regex in each line selected by the address range. Then, it replaces only the first matching substring by the replacement string, unless we modify this default behavior by using a flag.

Since we intend to reuse our solution, let’s add our sed command in a script named indentation_fix.sed:

```
/^[ 	]\+/ s/	/    /g
```
Well, the contents of the script contain some tabs and spaces, and it’s hard to differentiate one from another. So, let’s get rid of this ambiguity by viewing the contents of the script with sed’s l command:

$ sed -n 'l' indentation_fix.sed
```
/^[ \t]+/ s/\t/    /$
```
We must note that the presence of the \t character represents the tab, while the $ symbol represents the end of the line.

Now, let’s take a sample Test.java file that uses tabs instead of spaces:

$ sed -n 'l' Test.java
public class Test {$
\tpublic static void main(String args[]){$
\t// do something$
\t}$
```
}$
```
Next, let’s test the functionality of our indentation_fix.sed script by putting it in action:

$ sed -n -E -f "indentation_fix.sed" -e 'l' Test.java
public class Test {$
    public static void main(String args[]){$
    // do something$
    }$
```
}$
```
Finally, let’s modify our original file in place with this script:

```
$ sed -n -i.save -E -f "indentation_fix.sed" -e 'p' Test.java
```
We used the -i flag with an extension .save to create a backup copy of our original file in a file called Test.java.save.

## 4.2. Substitution With Grouping
At times, we often need to make syntactic corrections in our code. Let’s take a case of accessing characters in a Java string where we’ve mistakenly treated it as an array, which happens in a lot of other programming languages like C. We’ll use a file named AccessString.java to demonstrate:

// AccessString.java
String name = "Baeldung";
if (name.length() > 0) {
    System.out.println("Name starts with " + name[0]);
```
}
```
Instead, we should be using the charAt() method to access the character at the 0th position. Since we could be having this error at a number of places in our file, we can save time if we use sed to fix this.

Now, to come up with a sed command, we need to understand the concept of grouping and format string in the substitution function. The former is a way to split a line into groups using regex matching, and the latter is the replacement string that contains special characters to do a back-reference for these groups.

As such, grouping helps us preserve parts of the original string and reuse them as part of the replacement string. In this case, we can split the line containing the name string into three groups:

the first group represented by (.*name) will refer to the left side of the opening square bracket
the second group represented by ([0-9]+) will refer to the index of characters that’s being access
the last group represented by (.*) will refer to the right side of the closing square bracket
Further, we can make a back-reference to these groups in the replacement string as \1, \2, and \3, respectively. So, putting it all together, we have our sed command:

$ sed -n -E '1,$ s/(.*name)\[([0-9]+)\](.*)/\1.charAt(\2)\3/; p' AccessString.java
String name = "Baeldung";
if (name.length() > 0) {
    System.out.println("Name starts with " + name.charAt(0));
```
}
```
We can note that we didn’t intend to preserve the square brackets around the index. So, we didn’t make them part of any of the groups.

# 5. Workspace
If we intend to use sed like an expert, then we must first acquaint ourselves with sed’s internal working areas, namely pattern space and hold space. To do this, let’s go ahead and explore sed’s workspace.

## 5.1. Pattern and Hold Space
So far, we solved all the problems without explicitly knowing the concepts of pattern space and hold space, and that’s fine; we didn’t need to rely on that concept in previous examples.

For starters, the pattern space and hold space have intuitive names. The former is an active storage area where sed first keeps each line read from the input stream after matching it with a pattern. In contrast, the latter is a temporary storage area that can be used on-demand.

sed offers a variety of functions to help us manage the workspace. However, a few of them have subtle differences, and it’s important that we understand how pattern space fits into the execution cycle of a sed script.

## 5.2. Pattern Space in Execution Cycle
First, sed reads a single line of text from the input stream and keeps it in the pattern space. Then, it executes each sed command until there are no more commands left to execute. Finally, sed executes the function, n (next) by itself, to repeat the cycle until it has consumed the complete input stream.

Now, we must understand that the execution of function n has a very crucial role in creating a cycle in the workflow. As such, the n function prints the pattern space on the standard output and then replaces it with the next line from the input stream. That’s why, when we execute sed without any command, it just prints the input stream to the standard output.

As such, the function n is not aligned with the single responsibility principle as it is doing two things, namely printing the pattern space and replacing the content with the next line from the input. To overcome this problem, we had used the -n flag earlier to suppress the printing behavior, but not the part where it refills the pattern space. If -n suppressed the complete functionality of n, then we wouldn’t be left with a cycle in the first place.

## 5.3. n and p
The next function is implicitly invoked by sed in the background to continue processing each line of input. However, we can even make explicit use of this.

Let’s say we have a file containing names of books and corresponding authors on alternate lines:

$ sed '' books_authors.txt
Milk and Honey
- Rupi Kaur
Ariel
- Sylvia Plath
The Waste Land
- T.S. Eliot
The Chord
```
- Randhir Kaur
```
Now, if we need to list the names of books separately from the books_authors.txt file, then we make use of a combination of n and p functions.

First, let’s list the names of books that appear on all odd-numbered lines:

$ sed -n 'p;n' books_authors.txt
Milk and Honey
Ariel
The Waste Land
```
The Chord
```
Next, let’s list the names of authors that appear on all even-numbered lines:

$ sed -n 'n;p' books_authors.txt
- Rupi Kaur
- Sylvia Plath
- T.S. Eliot
```
- Randhir Kaur
```
We can note that we suppressed the print functionality of ‘n‘ by using the -n flag. As a result, we were able to eat away lines that we didn’t want in our output. In the first case, we did a cycle of print-and-eat activity, while in the second case, it was an eat-and-print cycle.

Further, if we want, we can use the substitution function to remove the hyphens before the author names:

$ sed -n 'n;s/^- //;p' books_authors.txt
Rupi Kaur
Sylvia Plath
T.S. Eliot
```
Randhir Kaur
```
## 5.4. Hold, Get, and Exchange
At times, we need to save the current content of the pattern space into the hold space and retrieve it later for further use. To easily transfer contents between these two working spaces, we can use the hold, get, and exchange functions:

h – hold function saves content from pattern space into hold space
g – get function retrieves content from hold space into pattern space
x – exchange function swaps the contents of pattern space and hold space
Let’s say that we need to get the names of books by author Rupi Kaur from our books_authors.txt file. Since the name of the book comes before the author’s name, we’ll need to hold that value in the hold space. If we do this, we can use pattern space to match the next line that has the author’s name against the given author’s name.

For any two pair of lines, we can use hold followed by the next function to retain the name of the book in the hold space, and the author’s name in the pattern space. But, we also need to ensure that we get the value from hold space and print it, just after doing a pattern match. To do so, we can keep them together within {} as a function-list:

$ sed -n 'h;n;/Rupi Kaur/{g;p;}' books_authors.txt
```
Milk and Honey
```
As such, when we did a get function call, we lost the name of the author from the pattern space to the name of the book. Well, that was fine, as we already knew the name of the author beforehand, and we didn’t care to display that information.

However, at times, we don’t know the full name of the author, but just the first name or the last name. Naturally, in such a scenario, it makes sense that we also list the full name of the author along with the name of the book.

Let’s extend the function-list part of our books by author solution. If we exchange the contents of pattern space and hold space using the x function, then we’ll have the author’s name in the hold space and name of the book in the pattern space. So, we can print the name of the book by using the p function. Finally, we can get the name of the author from hold space and print it as we did earlier:

$ sed -n 'h;n;/Kaur/{x;p;g;p;}' books_authors.txt
Milk and Honey
- Rupi Kaur
The Chord
```
- Randhir Kaur
```
We can note that we got two different author names for the same surname. So, that validates our decision to list the author’s name along with the name of the book.

# 6. Working With Multiple Lines
So far, we did pattern matching for only single lines. That’s because, by default, sed reads from the input stream line-by-line and discards the \n character before putting into the pattern space. But, that doesn’t mean we can’t work with multiple lines. In fact, sed offers a variety of functions that can help manage the working area with new lines in consideration:

P – print function prints the first line of pattern space to standard output
H – hold function adds a \n character to hold space, and then appends the content from pattern space
G – get function adds a \n character to pattern space, and then appends the content from hold space
N – next function adds a \n character to pattern space, and then appends the next line from the input stream
Now, let’s improve the readability of our books_authors.txt file by using the N function:

$ sed -E -n 'N; s/(.*)\n- (.*)/"\1" by \2/; p' books_authors.txt
"Milk and Honey" by Rupi Kaur
"Ariel" by Sylvia Plath
"The Waste Land" by T.S. Eliot
```
"The Chord" by Randhir Kaur
```
As such, by using the N function, we were able to join the name of the book and author with a newline character. Further, we used a group substitution for quoting the name of the book in quotes and in-fixing the “by” string.

Next, let’s use the G function to improve the readability of output when we search for books by a partially-known author’s name:

$ sed -E -n 'h;n; /Kaur/ {G;s/- (.*)\n(.*)/"\2" by \1/;p;}' books_authors.txt
"Milk and Honey" by Rupi Kaur
```
"The Chord" by Randhir Kaur
```
Alternatively, we can also use the H and g functions to arrive at the same result:

$ sed -E -n 'h;n; /Kaur/ {H;g;s/(.*)\n- (.*)/"\1" by \2/;p;}' books_authors.txt
"Milk and Honey" by Rupi Kaur
```
"The Chord" by Randhir Kaur
```
# 7. Flow Control
By default, sed commands in a script execute sequentially line-by-line. Now, let’s go ahead and learn how we can change the default flow of execution for a sed script.

## 7.1. Empty Lines
Let’s say someone edited our text file containing the list of books and authors. Now it contains several empty lines:

$ sed -n 'l' books_authors_empty_lines.txt
Milk and Honey$
$
- Rupi Kaur$
$
$
Ariel$
- Sylvia Plath$
$
The Waste Land$
- T.S. Eliot$
$
$
$
The Chord$
```
- Randhir Kaur$
```
Since we wrote all our earlier sed scripts assuming that there are no empty lines in between, those scripts might stop working.

To fix this, either we can revise all the earlier scripts, or we can perform a cleansing activity on our text file to remove these empty lines. Of course, in the interest of time, the latter seems more reasonable.

## 7.2. Branching
Firstly, we should be able to identify the empty lines when we read one. As such, sed doesn’t copy the newline character into pattern space. So, instead of doing a pattern matching with \n, we’ll do it with ^$.
Then, if we see that there’s an empty line, then we need to start eating up the lines until we find a line that has some content. Further, for all non-empty lines, we just need to print them as-is.

Well, to construct this logic using sed, we need to create a loop. In sed, we can do that by performing a conditional or unconditional branching using the : (label), b (branch), and t (test) functions:

$ sed -n 'p' fix_empty_spacing.sed
:check_empty_line
s/^$//
t eat_empty_line
b print_content

:eat_empty_line
n
b check_empty_line

:print_content
```
p
```
We must note that we created three labels, namely check_empty_line, eat_empty_line, and print_content. In the beginning, we conditionally branched using test function to eat_empty_line block based on the fact that substitution in the previous line was successful or not. Further, we consumed the empty lines with the n function and did an unconditional branching to check_empty_line block using the branch function.

If we’re more familiar with while() loops and if statements, we can think of this logic through a more relatable pseudo-code:

line = getNextLine();
while( true ) {
    if ( isEmptyLine(line) ) {
        line = getNextLine();
        continue;
    }
    print_content(line);
    if ( hasNextLine() ) {
        line = getNextLine();
    } else {
        exit();
    }
```
}
```
Finally, let’s do the cleansing task of removing the empty lines:

$ sed -n -f fix_empty_spacing.sed books_authors_empty_lines.txt
Milk and Honey
- Rupi Kaur
Ariel
- Sylvia Plath
The Waste Land
- T.S. Eliot
The Chord
```
- Randhir Kaur
```
# 8. Conclusion
In this article, we developed a good understanding of various concepts related to stream text editing. Moreover, we also used sed as a stream editor to solve a few tricky text editing use cases.

Let’s gear up by putting this tool in our Linux toolkit for regular use and boosting our productivity.
