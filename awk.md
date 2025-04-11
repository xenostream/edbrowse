# The awk Programming Language
A program is a solution to a problem, formulated in the syntax of a particular language. It is a small step
from writing complex editing scripts with sed to writing programs with awk, but it is a step that many
writers may fear to take. “Script” is less loaded a term than “program” for many people, but an editing
script is still a program.

Each programming language has its own “style” that lends itself to performing certain tasks better
than other languages. Anyone can scan a reference page and quickly learn a language’s syntax, but a close
examination of programs written in that language is usually required before you understand how to apply
this knowledge. In this sense, a programming language is simply another tool; you need to know not only
how to use it but also when and why it is used.

We recommend that you learn more than one programming language. We have already looked at a
number of different programs or scripts written for and executed by the shell, ex, and sed. As you learn
the awk programming language, you will notice similarities and differences. Not insignificantly, an awk
script looks different from a shell script. The awk language shares many of the same basic constructs as
the shell’s programming language, yet awk requires a slightly different syntax. The awk program’s basic
operations are not much different from sed’s: reading standard input one line at a time, executing instruc-
tions that consist of two parts, pattern and procedure, and writing to standard output.

More importantly, awk has capabilities that make it the tool of choice for certain tasks. A program-
ming language is itself a program that was written to solve certain kinds of problems for which adequate
tools did not exist. The awk program was designed for text-processing applications, particularly those in
which information is structured in records and fields. The major capabilities of awk that we will demon-
strate in upcoming pages are as follows:

• definable record and field structure
• conditional and looping constructs
• assignment, arithmetic, relational, and logical operators
• numeric and associative arrays
• formatted print statements
• built-in functions

A quick comparison of a single feature will show you how one programming language can differ from
another. You will find it much easier to perform arithmetic operations in awk than in the shell. To incre-
ment the value of x by 1 using the shell, you’d use the following line:

```
x=‘expr $x + 1‘
```

The expr command is a UNIX program that is executed as a separate process returning the value of its
arguments. In awk, you only have to write:

```
++x
```

This is the same as x = x + 1. (This form could also be used in awk).



# Invoking awk
The awk program itself is a program that, like sed, runs a specified program on lines of input. You can
enter awk from the command line, or from inside a shell script.

```
$ ]awk ’program’ files
```

Input is read a line at a time from one or more files. The program, enclosed in single quotation marks to
protect it from the shell, consists of pattern and procedure sections. If the pattern is missing, the procedure
is performed on all input lines:

```
$ awk ’{print}’ sample Prints all lines in sample file
```

The procedure is placed within braces. If the procedure is missing, lines matching the pattern are printed:

```
$ awk ’/programmer’s guide/’ sample Prints lines matching pattern in sample file
```

The awk program allows you to specify zero, one, or two pattern addresses, just like sed. Regular
expressions are placed inside a pair of slashes (/). In awk, patterns can also be made up of expressions. An
expression (or a primary expression so as not to confuse it with a regular expression) can be a string or
numeric constant (for example, red or 1), a variable (whose value is a string or numeric), or a function
(which we’ll look at later).

You can associate a pattern with a specific procedure as follows:

```
/pattern1/ {
procedure1
}
/pattern2/ {
procedure2
}
{ procedure 3 }
```

Like sed, only the lines matching the particular pattern are the object of a procedure, and a line can match
more than one pattern. In this example, the third procedure is performed on all input lines. Usually, multi-
line awk scripts are placed in a separate file and invoked using the -f option:

```
$ awk -f awkscript sample
```


# Records and Fields
Perhaps the most important feature of awk is that it divides each line of input into fields. In the simplest
case, each field contains a single word, delimited by a blank space. The awk program allows you to refer-
ence these fields by their position in the input line, either in patterns or procedures. The symbol $0 repre-
sents the entire input line. $1, $2, ... refer, by their position in the input line, to individual fields.

We’ll demonstrate some of these capabilities by building an awk program to search through a list of
acronyms in a file. Each acronym is listed along with its meaning. If we print the first field of each line,
we’ll get the name of the acronym:

```
$ awk ’{print $1}’ sample
BASIC
CICS
COBOL
DBMS
GIGO
GIRL
```

We can construct a useful program that would allow you to specify an acronym and get its description. We
could use awk just like grep:

```
$ awk ’/BASIC/’ sample
BASIC Beginner’s All-Purpose Symbolic Instruction Code
```

However, there are three things we’d like to do to improve this program and make better use of awk’s capa-
bilities:

1. Limit the pattern-matching search.
2. Make the program more general and not dependent on the particular acronym that is the subject of the search.
3. Print only the description.


# Testing Fields
The pattern as specified will match the word BASIC anywhere on the line. That is, it might match BASIC
used in a description. To see if the first field ($1) matches the pattern, we write:

```
$1 == "BASIC"
```

The symbol == is a relational operator meaning “equal to” and is used to compare the first field of each line
with the string BASIC. You could also construct this test using a given regular expression that looks for the
acronym at the beginning of the line.

```
$1 ˜ /ˆBASIC/
```

The pattern-matching operator ˜ evaluates as true if an expression ($1) matches a regular expression. Its
opposite, !˜, evaluates true if the expression does not match the regular expression.

Although these two examples look very similar, they achieve very different results. The relational
operator == evaluates true if the first field is BASIC but false if the first field is BASIC, (note the comma).
The pattern-matching operator ˜ locates both occurrences.

Pattern-matching operations must be performed on a regular expression (a string surrounded by
slashes). Variables cannot be used inside a regular expression with the exception of shell variables, as
shown in the next section. Constants cannot be evaluated using the pattern-matching operator.



# Passing Parameters from a Shell Script
Our program is too specific and requires too much typing. We can put the awk script in a file and invoke it
with the -f option. Or we can put the command inside a shell script, named for the function it performs.
This shell script should be able to read the first argument from the command line (the name of the acronym)
and pass it as a parameter to awk. We’ll call the shell script awkronym and set it up to read a file named
acronyms. Here’s the simplest way to pass an argument into an awk procedure:

```
$ cat awkronym
awk ’$1 == search’ search=$1 acronyms
```

Parameters passed to an awk program are specified after the program. The search variable is set up to pass
the first argument on the command line to the awk program. Even this gets confusing, because $1 inside
the awk program represents the first field of each input line, while $1 in the shell represents the first argu-
ment supplied on the command line. Here’s how this version of the program works:

```
$ awkronym CICS
CICS Customer Information Control System
```

By replacing the search string BASIC with a variable (which could be set to the string CICS or BASIC),
we have a program that is fairly generalized.

Notice that we had to test the parameter as a string ($1 == search). This is because we can’t
pass the parameter inside a regular expression. Thus, the expressions ‘‘$1 ˜ /search/’’ or ‘‘$1 ˜
search’’ will produce syntax errors.

As an aside, let’s look at another way to import a shell variable into an awk program that even works
inside a regular expression. However, it looks complicated:

```
search=$1
awk ’$1 ˜ /’"$search"’/’ acronyms
```

This program works the same as the prior version (with the exception that the argument is evaluated inside
a regular expression). Note that the first line of the script makes the variable assignment before awk is
invoked. In the awk program, the shell variable is enclosed within single, then double, quotation marks.
These quotes cause the shell to insert the value of $search inside the regular expression before it is inter-
preted by awk. Therefore, awk never sees the shell variable and evaluates it as a constant string.

You will come upon situations when you wish it were possible to place awk variables within regular
expressions. As mentioned in the previous section, pattern matching allows us to search for a variety of
occurrences. For instance, a field might also include incidental punctuation marks and would not match a
fixed string unless the string included the specific punctuation mark. Perhaps there is some undocumented
way of getting an awk variable interpreted inside a regular expression, or maybe there is a convoluted
work-around waiting to be figured out.



# Changing the Field Separator
The awk program is oriented toward data arranged in fields and records. A record is normally a single line
of input, consisting of one or more fields. The field separator is a blank space or tab and the record separa-
tor is a newline. For example, here’s one record with five fields:

```
CICS Customer Information Control System
```

Field three or $3 is the string Information. In our program, we like to be able to print the description as a
field. It is obvious that we can’t just say print $2 and get the entire description. But that is what we’d
like to be able to do.

This will require that we change the input file using another character (other than a blank) to delimit
fields. A tab is frequently used as a field separator. We’ll have to insert a tab between the first and second
fields:

```
$ cat acronyms
awk Aho, Weinstein & Kernighan
BASIC Beginner’s All-Purpose Symbolic Instruction Code
CICS Customer Information Control System
COBOL Common Business Orientated Language
DBMS Data Base Management System
GIGO Garbage In, Garbage Out
GIRL Generalized Information Retrieval Language
```

You can change the field separator from the command line using the -F option:

```
$ awk -F"|——|" ’$1 == search {print $2}’ search=$1 acronyms
```

Note that |——| is entered by typing a double quotation mark, pressing the TAB key, and typing a double
quotation mark. This makes the tab character (represented in the example as |——|) the exclusive field sep-
arator; spaces no longer serve to separate fields. Now that we’ve implemented all three enhancements, let’s
see how the program works:

```
$ awkronym GIGO
Garbage In, Garbage Out
```


# System Variable
The awk program defines a number of special variables that can be referenced or reset inside a program.
See Table 13-1.

Table 13.1 awk System Variables

| System Variable | Meaning |
|:--- | :--- |
| FILENAME Current filename |
| FS | Field separator (a blank) |
| NF | Number of fields in the current record |
| NR | Number of the current record |
| OFS | Output field separator (a blank) |
| ORS | Output record separator (a newline) |
| RS | Record separator (a newline) |

The system variable FS defines the field separator used by awk. You can set FS inside the program
as well as from the command line.

Typically, if you redefine the field or record separator, it is done as part of a BEGIN procedure. The
BEGIN procedure allows you to specify an action that is performed before the first input line is read.

```
BEGIN { FS = "|——|" }
```

You can also specify actions that are performed after all input is read by defining an END procedure.

The awk command sets the variable NF to the number of fields on the current line. Try running the
following awk command on any text file:

```
$ awk ’{print $NF}’ test
```

If there are five fields in the current record, NF will be set to five; $NF refers to the fifth and last field.
Shortly, we’ll look at a program, double, that makes good use of this variable.



# Looping
The awkronym program can print field two because we restructured the input file and redefined the field
separator. Sometimes, this isn’t practical, and you need another method to read or print a number of fields
for each record. If the field separator is a blank or tab, the two records would have six and five fields,
respectively.

```
BASIC Beginner’s All-Purpose Symbolic Instruction Code
CICS Customer Information Control System
```

It is not unusual for records to have a variable number of fields. To print all but the first field, our program
would require a loop that would be repeated as many times as there are fields remaining. In many awk pro-
grams, a loop is a commonly used procedure.

The while statement can be employed to build a loop. For instance, if we want to perform a proce-
dure three times, we keep track of how many times we go through the loop by incrementing a variable at
the bottom of the loop, then we check at the top of the loop to see if that variable is greater than 3. Let’s
take an example in which we print the input line three times.

```
{ i = 1
    while (i <= 3) {
         print
         ++i
    }
}
```

Braces are required inside the loop to describe a procedure consisting of more than a single action. Three
operators are used in this program: = assigns the value 1 to the variable i; <= compares the value of i to
the constant 3; and ++ increments the variable by 1. The first time the while statement is encountered, i
is equal to 1. Because the expression i <= 3 is true, the procedure is performed. The last action of the
procedure is to increment the variable i. The while expression is true after the end of the second loop has
incremented i to 3. However, the end of the third loop increments i to 4 and the expression evaluates as
false.

A for loop serves the same purpose as a while loop, but its syntax is more compact and easier to
remember and use. Here’s how the previous while statement is restructured as a for loop:

```
for (i = 1; i <= 3; i++)
print
```

The for statement consists of three expressions within parentheses. The first expression, i = 1, sets the
initial value for the counter variable. The second expression states a condition that is tested at the top of the
loop. (The while statement tested the condition at the bottom of the loop). The third expression incre-
ments the counter.

Now, to loop through remaining fields on the line, we have to determine how many times we need to
execute the loop. The system variable NF contains the number of fields on the current input record. If we
compare our counter (i) against NF each time through the loop, we’ll be able to tell when all fields have
been read:

```
for (i = 1; i <= NF; i++)
```

We will print out each field ($i), one to a line. Just to show how awk works, we’ll print the record and
field number before each field.

```
awk ’{ for (i = 1; i <= NF; i++)
print NR":"i, $i } ’ $*
```

Notice that the print statement concatenates NR, a colon, and i. The comma produces an output field sepa-
rator, which is a blank by default.

This program produces the following results on a sample file:

```
1:1 awk
1:2 Aho,
1:3 Weinstein
1:4 &
1:5 Kernighan
2:1 BASIC
2:2 Beginner’s
2:3 All-Purpose
2:4 Symbolic
2:5 Instruction
2:6 Code
```

Symbolic is the fourth field of the second record. You might note that the sample file is acronyms, the
one in which we inserted a tab character between the first and second fields. Because we did not change the
default field separator, awk interpreted the tab or blank as a field separator. This allows you to write pro-
grams in which the special value of the tab is ignored.



## Conditional Statements
Now let’s change our example so that when given an argument, the program returns the record and field
number where that argument appears.

Essentially, we want to test each field to see if it matches the argument; if it does, we want to print the
record and field number. We need to introduce another flow control construct, the if statement. The if
statement evaluates an expression—if true, it performs the procedure; if false, it does not.

In the next example, we use the if statement to test whether the current field is equal to the argu-
ment. If it is, the current record and field number are printed.

```
awk ’{ for (i = 1; i <= NF; i++) {
    if ($i == search) {
        print NR":"i
       }
    }
} ’ search=$1 acronyms
```

This new procedure prints 2:1 or 3:4 and isn’t very useful by itself, but it demonstrates that you can retrieve
and test any single field from any record.

The next program, double, checks if the first word on a line is a duplicate of the last word on the
previous line. We use double in proofing documents and it catches a surprisingly common typing mis-
take.

```
awk ’
NF > 0 {
    if ($1 == lastword) {
        print NR ": double " $1
        }
        lastword = $NF
}’ $1
```

When the first line of input is read, if the number of fields is greater than 0, then the expression in the if
statement is evaluated. Because the variable lastword has not been set, it evaluates to false. The final
action assigns the value of $NF to the variable lastword. ($NF refers to the last field; the value of NF is
the number of the last field). When the next input line is read, the first word is compared against the value
of lastword. If they are the same, a message is printed.

```
double sect1
15: double the
32: double a
```

This version of double is based on the program presented by Kernighan and Pike in The UNIX Program-
ming Environment. (Writer’s Workbench now includes this program). Kernighan and Pike’s program also
checks for duplicate words, side-by-side, in the same line. You might try implementing this enhancement,
using a for loop and checking the current field against the previous field. Another feature of Kernighan
and Pike’s double is that you can run the program on more than one file. To allow for additional files,
you can change the shell variable from $1 to $* but the record or line number printed by NR will corre-
spond to consecutive input lines. Can you write a procedure to reset NR to 0 before reading input from a
new file?



## Arrays
The double program shows us how we can retain data by assigning it to a variable. In awk, unlike sev-
eral other programming languages, variables do not have to be initialized before they are referenced in a
program. In the previous program, we evaluated lastword at the top, although it was not actually
assigned a value until the bottom of the program. The awk program initialized the variable, setting it to the
null string or 0, depending upon whether the variable is referenced as a string or numeric value.
An array is a variable that allows you to store a list of items or elements. An array is analogous to a
restaurant menu. Each item on this menu is numbered:

#1 tuna noodle casserole
#2 roast beef and gravy
#3 pork and beans
One way of ordering roast beef is to say simply “Number 2.” Using ordinary variables, you would have
had to define a variable two and assign it the value roast beef and gravy. An array is a way of referencing a
group of related values. This might be written:
menu[choice]
where menu is the name of the array and choice is the subscript used to reference items in the array.
Thus, menu[1] is equal to tuna noodle casserole. In awk, you don’t have to declare the size of the array;
you only have to load the array (before referencing it). If we put our three menu choices on separate lines
in a file, we could load the array with the following statement:
menu[NR] = $0
The variable NR, or record number, is used as the subscript for the array. Each input line is read into the
next element in the array. We can print an individual element by referring to the value of the subscript (not
the variable that set this value).
print menu[3]
This statement prints the third element in the array, which is pork and beans. If we want to refer to all the
elements of this array, we can use a special version of the for loop. It has the following syntax:
for (element in array)
This statement can be used to descend the array to print all of the elements:
for (choice in menu)
print menu[choice]
Each time through the loop, the variable choice is set to the next element in the array. The menu array is
an example of an array that uses a numeric subscript as an index to the elements.
Now, let’s use arrays to increase the functionality of awkronym. Our new version will read
acronyms from a file and load them into an array; then we’ll read a second file and search for the acronyms.
Basically, we’re reading one input file and defining keywords that we want to search for in other files. A
similar program that reads a list of terms in a glossary might show where the words appear in a chapter.
Let’s see how it works first:
$ awkronym sect1
exposure to BASIC programming.
in COBOL and take advantage of a DBMS environment.
in COBOL and take advantage of a DBMS environment .
Of the high-level languages, BASIC is probably
Let’s look at the program carefully.
awk ’ {
if ( FILENAME == "acronyms" ) {
acro_desc[NR] = $1
next
}
for ( name in acro_desc )
for (i = 1; i <= NF; i++)
if ($i == acro_desc[name] ) {
print $0
}
}’ acronyms $*
The current filename is stored in the system variable FILENAME. The procedure within the first condi-
tional statement is only performed while input is taken from acronyms. The next statement ends this
procedure by reading the next line of input from the file. Thus, the program does not advance beyond this
procedure until input is taken from a different file.
The purpose of the first procedure is to assign each acronym ($1) to an element of the array
acro_desc; the record number (NR) indexes the array.
In the second half of the program, we start comparing each element in the array to each field of every
record. This requires two for loops, one to cycle through the array for each input line, and one to read
each field on that line for as many times as there are elements in the array. An if statement compares the
current field to the current element of the array; if they are equal, then the line is printed.
The line is printed each time an acronym is found. In our test example, because there were two
acronyms on a single line, the one line is duplicated. To change this, we could add next after the print
statement.
What if we changed awkronym so that it not only scanned the file for the acronym, but printed the
acronym with the description as well? If a line refers to BASIC, we’d like to add the description (Begin-
ner’s All-Purpose Symbolic Instruction Code). We can design such a program for use as a filter that prints
all lines, regardless of whether or not a change has been made. To change the previous version, we simply
move the print statement outside the conditional statement. However, there are other changes we must
make as well. Here’s the first part of the new version.
awk ’ {
if ( FILENAME == "acronyms" ) {
split ( $0, fields, "|——|" )
acro_desc[fields[1]] = fields[2]
next
}
The records in acronyms use a tab as a field separator. Rather than change the field separator, we use the
split function (we’ll look at the syntax of this function later on) to give us an array named fields that
has two elements, the name of the acronym and its description. This numeric array is then used in creating
an associative array named acro_desc. An associative array lets us use a string as a subscript to the ele-
ments of an array. That is, given the name of the acronym, we can locate the element corresponding to the
description. Thus the expression acro_desc[GIGO] will access Garbage In, Garbage Out.
Now let’s look at the second half of the program:
for ( name in acro_desc )
for (i = 1 ; i <= NF; i++)
if ( $i == name) {
$i = $i " ("acro_desc[name]")"
}
print $0
Just like the previous version, we loop through the elements of the array and the fields for each
record. At the heart of this section is the conditional statement that tests if the current field ($i) is equal to
the subscript of the array (name). If the value of the field and the subscript are equal, we concatenate the
field and the array element. In addition, we place the description in parentheses.
It should be clear why we make the comparison between $i and name, and not
acro_desc[name]; the latter refers to an element, while the former refers to the subscript, the name of
the acronym.
If the current field ($i) equals BASIC and the index of the array (name) is the string BASIC, then
the value of the field is set to:
BASIC (Beginner’s All-Purpose Symbolic Instruction Code)
For this program to be practical, the description should be inserted for the first occurrence of an acro-
nym, not each time. (After we’ve inserted the description of the acronym, we don’t need the description
any more). We could redefine that element in the array after we’ve used it.
acro_desc[name] = name
In this instance, we simply make the element equal to the subscript. Thus, acro_desc[BASIC] is equal
to Beginner’s All-Purpose Symbolic Instruction Code at the beginning of the procedure, and equal to BASIC
# awk Application

## Formatted Print Statements

## Defensive Techniques

## awk and nroff/troff

## Multiline Records

# Testing Programs
