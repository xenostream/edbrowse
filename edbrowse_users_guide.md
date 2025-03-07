# edbrowse Documentation, a User's Guide (v.3.8.9)

**Chapter 0, Contents**

[Chapter 1 Preface](#Chapter-1-Preface)  
[Chapter 2 Quick Reference Guide](#Chapter-2-Quick-Reference-Guide)  
[Chapter 3 The Editor](#Chapter-3-The-Editor)  
[Chapter 4 Web Browser](#Chapter-4-Web-Browser)  
[Chapter 5 Javascript](#Chapter-5-Javascript)  
[Chapter 6 Edbrowse Scripts and the Configuration File](#Chapter-6-Edbrowse-Scripts-and-the-Configuration-File)  
[Chapter 7 Mail Client](#Chapter-7-Mail-Client)  
[Chapter 8 IRC Client](#Chapter-8-IRC-Client)  
[Chapter 9 Database Access](#Chapter-9-Database-Access) 

---

# Chapter 1 Preface

## Maintainer
The edbrowse home page is <http://www.edbrowse.org>. *Chris Brannon* is the current project maintainer and webmaster.

## Author
*Karl Dahlke* wrote the first version of edbrowse in perl, in 2001, and he is still the principal developer of the project.

## Copyright Notice
This program is copyright © Karl Dahlke (and other authors and contributors), 2001-2023. It is made available by the authors under the terms of the GNU General Public License (GPL), as articulated by the Free Software Foundation. It may be used for any purpose, and redistributed, provided this copyright notice is included.

## Disclaimer
Edbrowse is provided as-is, with no implied warranty of fitness for any particular purpose. It might trash your precious files. It might send bad data across the Internet, causing you to buy a $37,000 elephant instead of $37 worth of printer supplies. It may delete all the rows in your mysql customer table. This is a spare-time project written by a couple of volunteers, that (understandably) cannot attain the quality and rigor of corporate or government software. By using this program, you agree to use it as-is.

## Acknowledgements
*Chris Brannon* wrote or modified at least 20% of the code, and provided valuable ideas for the overall design. *Adam Thompson* converted the Javascript interface from C to C++, as required by Mozilla JS versions 2, and he continues to direct the project's overall architecture. *Kevin Carhart* deciphered the mysteries of jquery, and upgraded the DOM to support it. *Jeremy O'Brien* ported the software to Mac OS X. Several people translated the output and error messages into other languages, and they are given due credit in the Languages section below.

## Overview
This program is, at first glance, a reimplementation of ```/bin/ed```. In fact you might issue a few ed commands and not realize that you are actually running this program. But as you proceed you will eventually discover some discrepancies, areas where edbrowse differs from ed. These are discussed below.

Reinventing ed seems like a complete waste of time, until you realize that this program also acts as a browser - a browser embedded inside ed. You can edit a URL as easily as a local file, and activate browse mode to render the html tags in a manner that is appropriate for a command-response program such as this. In other words, we discard most of the formatting information and retain the links and fill-out forms. This allows blind users to access the Internet through an application that is compatible with the linear nature of speech or braille.

Edbrowse presents the following features:

* Edbrowse can edit multiple files or browse multiple websites simultaneously, and transfer blocks of text between them in a manner similar to cut & paste. For instance, ```edbrowse *.c``` accesses all the C sourcefiles in the current directory.

* The regular expressions of ed have been replaced with Perl Compatible Regular Expressions, which have more power and flexibility. This simplifies the task of finding or modifying text in a large document. You can, for instance, replace each instance of the word ```foo```, not ```foot``` or ```food```, but ```foo``` by itself, in upper or lower case, with the word ```bar```, as long as foo is not followed by an exclamation point or a question mark. The change in regular expressions means edbrowse is not 100% backward compatible with ed, though it is close.

* Edbrowse can fetch a web page from the Internet as easily as it opens a file on the current computer, using http, https, ftp, or gopher. Once the page is fetched into the active buffer, it can be browsed or rendered as text, using the ```b``` command. This supplements the other one-letter commands which were already part of ed. Once the page is browsed, the user can go to hyperlinks, or fill out and submit forms.

* The ```-fm``` option turns edbrowse into an interactive email client. It fetches mail from one or more pop3 accounts and presents these emails to the user one at a time, where they can be read, deleted, or saved to a file for future reference. Filters can automatically save certain emails to certain files, based on subject, sender, or destination email address. Other options cause edbrowse to send mail using smtp. imap is also supported.

* In database mode, edbrowse can access selected rows and columns of an sql table through odbc. The insert, substitute, and delete commands of edbrowse now correspond to the insert, update, and delete operations of a database respectively. This feature is well tested on some databases, and completely untested on others. Since text editing has consequences outside the context of the current buffer, there is no undo command. When a row is deleted, it is gone, without any chance of retrieval. Fortunately, referential integrity often prevents these unintended deletions.

* When editing a directory, each line of text corresponds to a file. Again, the substitute command renames a file, while the delete command removes a file, or moves it to your trash can, depending on your edbrowse configuration. There is no undo operation, thus moving files to the trash can is safer. However, this does not free up any disk space.

* The edbrowse configuration file can contain functions, similar to the .bashrc file in Linux. These functions can invoke other edbrowse commands, along with branching and loops based on the success of these commands. This simple example changes every ```x``` to ```y```. If any changes were made, the file is written back to disk. The * in the if statement is true if the previous command was successful.
```
function+xy {
        ,s/x/y/g
        if(*) {
                w
        }
}
```
If edbrowse is not included in your distribution, there is a perl version, with fewer features, that you can bring up right away on any computer: Linux, Unix, Mac, Windows, etc. Give ```edbrowse.pl``` a try, and if you like it then you can git the package and build it from source to realize the full-featured C version.

If you are a Linux user, and your distribution doesn't package edbrowse, you can use the aforementioned perl version of course, but you can also run the full-featured C version without going through the hassle of building it yourself. Statically-linked executables for 32 bit and 64 bit architectures are maintained on the edbrowse home page.

This documentation assumes you are familiar with ed. In fact it helps if you are fluent in ed. Experience with Internet browsers and the associated terminology is also helpful.


## Other Languages
First, a few words about character sets (charsets). English is easily contained within a byte stream, one letter per byte. In fact, each letter fits in 7 bits; the eighth bit is not needed, and is set to 0. This system is called ```ascii```, and is English specific.

Indo-european languages bring in more characters, such as ```ñ``` (Spanish), ```è``` (French), and ```ö``` (German). These can still fit within single bytes, by setting the eighth bit to 1, according to the ISO8859-1 standard. Still other languages, such as Czech and Hungarian, fit within the iso8859-2 standard, which assigns different characters to the bytes above 127. And there is iso8859-3, and so on. Select your code page, and all the letters of your language still fit within one byte. This is the iso8859 standard, and it is backward compatible with ascii. In other words, z is 122 in ascii and in every iso8859-x code page, but the higher numbers, above 127, could represent different letters in different languages.

This worked well for a while, but what if you want to write one paragraph in French and one in Czech? You either switch from iso8859-1 to iso8859-2 in mid stream, or we come up with a new standard that represents all letters in all languages simultaneously. This charset, which obviously will not fit into a single byte, is known as ```utf8```, and it has become the new standard across the computer industry. Software does not have to select an iso8859 page and map numbers to letters in a manner that depends on the country you live in. Instead, ```ñ``` is represented by two bytes, not one. This is transparent to you; you see the same letter on the screen, and you hear the same sounds if your screen reader passes these letters to a speech synthesizer. A quick way to tell which system you are on is to ```echo $LANG```. If it ends in ```utf8``` or ```utf-8```, and it probably does, then your console is using utf8, and it expects two-byte sequences. Your files probably contain these underlying sequences. Older pre-utf8 systems store each character in a single byte, with an iso8859 codepage doing the translation.

There's much more to say about charsets; this is merely a brief introduction. I need not go further, because edbrowse only supports ```iso8859-1 ⇔ utf8``` at this time. Other iso8859 pages are not supported, and even iso8859-1 may drop off in the future, since utf8 is nearly universal.

The output and error messages, such as "*search string not found*", have been internationalized. Set the environment variable ```LANG``` to interact with edbrowse in your home language. Supported languages are shown below. If you can translate edbrowse into additional languages, please contact the developers.

|Language|Environment & Author|
|:---|:---|
|* English | LANG=en (this is the default)|
|* French | LANG=fr by Erwin Bliesenick including documentation|
|* Brazilian Portuguese | LANG=pt_br by Cleverson Casarin Uliana|
|* Polish | LANG=pl by Wojciech Gac|
|* Russian | LANG=ru by Wojciech Gac|
|* German | LANG=de by Sebastian Humenda|
|* Italian | LANG=it by Enrico Mioso|
|* Spanish | LANG=es by Oriol Prieto|
 
Some edbrowse messages include the output of strerror, e.g. when opening, reading, or writing files. These text fragments are also internationalized, if you have installed the appropriate libc configuration module for your language. This is probably installed on your behalf if you specified a preferred language when setting up the operating system. However, other language modules may not be present. ```LANG=es_ES.UTF8``` edbrowse causes all the edbrowse messages to display in Spanish, however, if the libc Spanish module is not installed, because your native language is German, then the strerror portion might appear in English, as that is the default for strerror when the module corresponding to LANG is not present. That could indeed be confusing. That said, most users will use edbrowse consistently with the language of their operating system, and this issue will not arise.

When an output or error message is displayed, accented letters are printed using single bytes, vectoring through an iso8859 page, unless the string ```utf8``` or ```utf-8``` appears in ```$LANG```, whence the nonascii characters are generated using utf8. Similarly, the contents of a buffer, be it a local document or an Internet website, are displayed as single bytes or multi-byte sequences, according to ```$LANG```. Bear in mind, utf8 has become the standard, and edbrowse may not display text or error messages through iso8859 pages for long. In other words, iso8859 is deprecated.

If an older file is read into edbrowse, i.e. read into an empty buffer, and that file is in iso8859, while your computer is set to run in utf8, then that file is converted on the fly before you ever see it. Thus it will look normal to you. Use the ```iu``` command to disable this feature.

When you write data out to the same file, e.g. if you have made some corrections or additions, edbrowse converts it back to its original single-byte iso8859 charset, and restores dos newline crlf sequences if the file was originally a dos text file. Thus you can send the edited file back to your friend, and it will be in his charset as he expects. However, if you write the data, or any portion of that data, into a new file, it is left in the charset that is used by your computer.

These conversions should never take place on zip files, or executable files, or other forms of binary data. If you see the words "*converting to iso8859*" or "*converting to utf8*", and the file is something other than international text, we have a problem. Don't try to run the converted executable; it won't work.

If your world is utf8, the search function can lead to some confusion. Consider the Spanish word ```niño```, for a boy child. If you search for ```ni.o```, you may not find this line of text. The dot stands for one character, and should match ```ñ```, but this accented letter takes up two bytes. Ironically, you have to search for ```ni..o```, and you will find what you are looking for. Needless to say, this is very confusing.

Search and substitute is performed by the pcre library, and fortunately, the latest version supports utf8. Edbrowse passes pcre an option that tells it to treat certain two-byte sequences as single letters, and thus it behaves the way you want it to. Searching for ```ni.o``` works again. If you want to disable utf8 search and substitute temporarily, use the ```su8``` command.

Some websites offer their contents in multiple languages. For example, twitter.com has an English version, a French version, and so forth. It is possible to select the language when requesting the page. Edbrowse supports this via the ```localizeweb``` keyword in its configuration file. For instance, the following entry in ```.ebrc``` indicates that you want the French version, when it is available.
```
localizeweb = fr
```
If not specified, edbrowse defers to the environment variable ```$LANG```, which is set on almost every system. Thus you rarely need to set ```localizeweb``` in your config file. If ```LANG``` is not set, the default is English. Edbrowse always sends a language designator to the web servers, because some websites, such as amazon.com, will not run properly without it. If you do set ```localizeweb``` yourself, be sure to set it to language code hyphen territory code.


[⬆️](#top)
<br><br><br><br>

# Chapter 2 Quick Reference Guide
## Quick Reference Guide
Here are the ed and edbrowse commands, all in one place. This is a quick reference guide. Most of these commands will not make sense until you read the rest of the documentation. Commands that are designated (toggle), such as ```js``` to turn Javascript on and off, also admit a ```+```or ```-``` suffix to explicitly enable or disable the feature. Thus ```js``` toggles Javascript, ```js+``` enables Javascript, and ```js-``` disables Javascript. The ```+``` and ```-``` variants are not listed. Toggle prints the state of the feature, on or off, if help messages are enabled or if the debug level is at least 1. Setting or clearing a mode only prints the message if help messages are on.

<details><summary>Fold / Expand command reference tables</summary>  
        
## Leave the Program  
|command|description|
|:---|:---|
|q | quit the current session|
|qt | quit the program completely, whether you've written your files or not|
|q7 | quit session 7|
|q/foo | quit session whose file name contains the substring foo|
|bw | buffer written; you can quit at any time|
|bw7 | buffer written in session 7|
|bw/foo | buffer written in session whose file name contains the substring foo|
|!command | shell command|
|!! | previous shell command|
|!! stuff | previous shell command with stuff appended|
|ebvar | update environment variables before each shell command (toggle)|
|! program "$EB_DOT" | run program on the contents of the current line|
|! program '. | same as above|
|! program "$EB_PLUS" | run program on the contents of the next line|
|! program '+ | same as above|
|! program "$EB_MINUS" | run program on the contents of the previous line|
|! program '- | same as above|
|! program "$EB_LNx" | run program on the contents of the line marked by kx|
|! program 'x | same as above|
|!program $EB_LN | access the current line number|
|!program $EB_LINES | access the number of lines in the buffer|
|! program "$EB_FILE" | run program on the file name|
|! program '_ | same as above|
|! program "$EB_BASE" | use the file name without the .browse suffix|
|!program $EB_DIR | access the directory that holds the file|
|! | spawn an interactive shell|
|cd newdirectory | change directory|
|pwd | print working directory|
|config | reread the config file|


## Input  
|command|description|
|:---|:---|
|~c2~b1 | enter bytes as hex, in this case utf8 for plussminus|
|~u1f600 | enter a unicode as hex, in this case the symbol for grin|
|~jfood.carrot | enter the carrot emoji from the food group|
|~~ | enter a literal tilde, only necessary when the following character is hex or u or j|
|P | show prompt (toggle)|
|P=foo | set prompt to foo|
|rl | use readline() on input (toggle), respects $HISTCONTROL|


## Display Lines in the Buffer   
|command|description|
|:---|:---|
|p | print the current line|
|4,7p | print lines 4 through 7|
|+3p | advance 3 lines and print|
|+3 | same as +3p, print is default command|
|- | previous line|
|--- | back up three lines|
|'a,'bp | print a range of lines marked with labels a and b|
|kb | mark the current line as b|
|0ks | unset the line label s|
|l | list the current line, showing invisible chars and end markers|
|endm | show end markers ^$ on listed lines (toggle)|
|lna | expand all nonascii chars into hex when a line is listed (toggle)|
|n | print the current line with its line number|
|ll=1000 | line length 1000, show the first 1000 chars of each line|
|ll | print the current line length|
|fll=80 | format line length 80, cut lines to 80 chars, perhaps to fit the terminal|
|fll 80+ | cut lines to 80 chars but allow some overflow so the next line isn't just one or two words|
|fll | print the format line length|
|z22 | print the next 22 lines|
|z | print another 22 lines|
|= | print the number of lines in the file|
|.= | print the current line number|
|B | find the line with the balancing open or closed brace|
|B[ | find the line with the balancing closed bracket|
|B( | find the line with the balancing closed parenthesis|
|B{2 | find the line that balances the second (from the inside out) unbalanced brace|


## Help Messages   
|command|description|
|:---|:---|
|h | help, explain the last question mark|
|H | show all error messages (toggle)|
|help | put this reference guide in an edbrowse buffer for review|


## Search and Substitute    
|command|description|
|:---|:---|
|s/x/y/ | replace x with y on the current line|
|s/x/y | replace x with y and print the result|
|s//y/ | use the last substitution string, in this case x|
|s/x/%/ | use the last replacement string, in this case y|
|s/x | replace x with nothing and print the result|
|s | repeat the previous substitute command|
|s/x/y/2p | replace the second instance of x with y on the current line|
|s2 | same as above|
|s$ | s//%/$p|
|4,7s/x/y/g | replace all instances of x with y on lines 4 through 7|
|s/x/y/3g | replace x with y starting with the third instance and proceeding down the line|
|s/dog/cat/gfip | replace dog or DOG with cat throughout this line, forget dog and cat as search and replacement strings, and print the result|
|s/a\(.\)c/a$1$1c/ | duplicate the letter between a and c|
|s, | replace comma space with newline, break line in two|
|s. | replace period space with newline, break line in two|
|s?2 | break line at the second question mark|
|s.$ | break line at the last period|
|bl | break very long line into sentences and phrases, uses fll to wrap|
|/x/ | look for the line containing x|
|/x | same as /x/|
|/x/i | look for the line containing x or X|
|/x/f | look for x, but forget x as a search string|
|?x? | look backwards for x|
|/x/! | find the next line that doesn't contain x|
|?x?i! | find the previous line that doesn't contain x or X|
|ci | searches and substitutions are case insensitive (toggle)|
|sg | substitution strings are global across sessions (toggle)|
|su8 | search and substitute uses utf8 character sequences (toggle)|
|ebre | edbrowse modified regular expressions, to be more like ed (toggle)|
|sss | search similar sessions (sessions with the same mode) (toggle)|
|sw | search with wrap (toggle)|
|g/x/ p | print every line that has an x|
|g/x | same as above|
|v/x/ p | print every line that does not have an x|
|v/x/i l | list every line that does not have x or X|
|g/x/f p | print every line that has x, but forget x as a search string|
|g/x/ -r foo | read the file foo before every line that has an x|
|g/x/ -,.w !command | run the prior and current line through a command, for each line that contains x|
|lc | convert line to lower case|
|mc | convert line to mixed case|
|uc | convert line to upper case|
|s/foo/uc | convert foo to FOO on the current line|
|s/\bfoo\b/mc/g | convert foo to Foo, but not foobar|
|,s/$/ %line/ | put the line number at the end of each line|


## Files and Sessions   
|command|description|
|:---|:---|
|f | print the name of the current file|
|f foo | set the file name to foo|
|f/ | retain only the last component of the filename|
|f clear | clear the filename|
|e | print the number of the current session|
|e3 | move to session 3|
|e+ | move to the next editing session|
|e- | move to the previous editing session|
|e/foo | move to the session whose filename contains the substring foo|
|e?foo | move back to the session whose filename contains the substring foo|
|enum | move to the session indicated by the number on the current line|
|eret | return to the session you were previously in|
|enew | create a new empty buffer in the current session|
|etmp | like enew but don't check for buffer written|
|e foo | edit the file named foo|
|^ e foo | edit foo but don't push the stack, replace the current file. ^ can be prepended to the following e commands as well.|
|e ~/projects/edbrowse/src/buf*.c | expand wildcards if exactly one match|
|e $EBSRC/buf*.c | variable expansion|
|e !command | create a new buffer with the output of the shell command|
|e http://this.that.com | http or https download|
e ftp://login:password@example.com/file ftp download
e scp://login:password@example.com/absolute-path scp download
|r foo | read the contents of foo into the current buffer|
|r7 | read the contents of session 7 into the current buffer|
|r7@3,8 | read session 7 lines 3 through 8 into the current buffer|
|r7@-,+ | read 3 lines around . into the current buffer|
|r7@'a,'b | read the designated block into the current buffer|
|r7@100, | same as r7@100,$|
|r7@, | same as r7|
|r/foo | find the session whose filename contains foo and read it into the current buffer|
|r/foo@6 | read line 6 of session foo into the current buffer|
|r/foo@'a,'b | read a range of lines from session foo into the current buffer|
|r+1@'a,'b | read a block of text from the buffer up 1 level in the stack|
|r-2@$ | read the last line of text from the buffer down 2 levels in the stack|
|r-2@, | read in the entire buffer from below|
|r-2 | shorthand for r-2@,|
|11r !command | put the output of the shell command after line 11|
|w | write the buffer out to the current file|
|wq | write and quit|
|w foo | write the current buffer to foo|
|w+ foo | append to foo|
|w/ | write to the last component of the filename|
|w+/ | append to the last component of the filename|
|8,20w7 | write lines 8 through 20 to session 7, overwriting whatever was there before|
|'a,'bw7@'c | write this block of text into session 7 at the line with label c|
|.w7@0 | write this line at the start of session 7|
|9w7@- | write line 9 to session 7 before the current line|
|w7@$ | append this file to session 7|
|w/foo | find the session whose filename contains foo and overwrite it with the current buffer|
|3w/foo@6 | write line 3 into session foo after line 6|
|'a,'bw+1@'c | write a block of text into the buffer up 1 level in the stack|
|.w-2@0 | write the current line at the start of the buffer down 2 levels in the stack|
|.w-2 | syntax error, @ is necessary for on-stack write, to set the location|
|5,7w !command | send lines 5 through 7 to a shell command|
|'a,'bW !command | run a range of lines through a shell command and replace them|
|W !sort | sort the lines in the buffer|
|w ftp://login:password@example.com/file | ftp upload|
|w scp://login:password@example.com/absolute-path | scp upload|
|bflist | buffer list, all edbrowse sessions and their file names or titles|
|bflist/foo | list each edbrowse session whose file name or title contains the substring foo|
|bflist?foo | list in reverse each edbrowse session whose file name or title contains the substring foo|
|hist | show the history of buffers for the current session|
|hist/foo | list each buffer in the history whose file name or title contains the substring foo|
|hist?foo | list in reverse each buffer in the history whose file name or title contains the substring foo|
|up | go up in the history of buffers|
|down | go down in the history of buffers|
|up3 | go up 3 buffers in the history|
|down4 | go down 4 buffers in the history|
|up/foo | go up in the history to a buffer whose file name or title contains the substring foo|
|down/foo | go down in the history to a buffer whose file name or title contains the substring foo|
|bd | binary detection on files (toggle)|
|iu | automatically convert between iso8859 and utf8 (toggle)|


## Text Editing, much like ed   
|command|description|
|:---|:---|
|u | undo the last command|
|d | delete the current line|
|1,$d | delete all the lines, 1 through eof|
|D | delete the current line and print the next line|
|j | join this line with the next one|
|2,5j | join lines 2 through 5|
|2,5J | join lines 2 through 5 with space separator|
|2,5Jhello | join lines 2 through 5 with hello separator|
|i | insert text before the current line, end with a period|
|c | change the current line, enter a new block of text, end with period|
|a | add text after the current line, end with a period|
|a+ | include the line you just typed in, when you thought you were in append mode|
|4,7m11 | move lines 4 through 7 to line 11|
|4,7t11 | copy lines 4 through 7 to line 11|


## Directory Scan   
|command|description|
|:---|:---|
|dr | directory is readonly|
|dw | directory is writable, and d moves files to your trash bin|
|dx | directory is writable, and d deletes files|
|hf | show hidden files in directory listing (toggle)|
|dno | directory listing names only (toggle)|
|lsl | list length of the file on the current line (directory), or the current file|
|lss | list the approximate size of the file, in kilobytes, megabytes, etc|
|lst | list the mod time of the file|
|lsp | list owner group permissions|
|lsi | list the inode|
|lsk | list the number of hard links|
|lsm | list major and minor number|
|lsy | list path for a symbolic link|
|lsX | verify directory mode, primarily for scripting|
|ls | same as lsst|
|lst | list mod time of the current file if not in directory mode, and same for the other ls commands|
|ls=lt | display length and time of all files in subsequent directory scans|
|ls= | just list the files in a directory scan|
|sort=a | sort files alphabetically|
|sort=t | sort files by mod time|
|sort=s | sort files by size|
|sort+a | same as sort=a|
|sort-a | reverse alphabetical|
|sort-t | reverse mod time|
|sort-s | reverse size|
|rf | refresh directory scan, useful if you have changed ls or sort parameters|
|M | move this directory to an empty session and back up|
|g | go to the file or subdirectory, activates plugin if appropriate|
|g- | go to the file with no plugin|
|g.pdf | go to the file using plugin pdf|
|d | delete the file or move it to your trash can; there is no undo|
|g/\.o$/d | delete all the .o files|
|s/x/y | rename the file|
|.m3 | move this file to the directory in session 3. You don't need the @ sign here as the file is always placed at the end of the listing. e3 and refresh if you want it in sorted order.|
|.m/foo | move this file to the session whose name contains the substring foo|
|.t3 | copy this file to the directory in session 3|
|.t/foo | copy this file to the session whose name contains the substring foo|
|.l3 | link this file to the directory in session 3|
|.L3 | symlink this file to the directory in session 3, not recommended unless the current directory is an absolute path|
|.m+2 | move this file up 2 levels in your editing history. Destination must be a directory. You don't need the @ sign here as the file is always placed at the end of the listing. Go up2 and refresh if you want it in sorted order.|
|.t-3 | copy this file down 3 levels in your editing history|


## Browse an html file or a web page   
|command|description|
|:---|:---|
|b | browse the current file, either html, or email, or rendered by plugin|
|b.pdf | browse the current file using plugin pdf|
|b foo.html | edit the file foo.html and browse it|
|b url | fetch url from the Internet and browse it|
|nostack b url | don't push a new window, replace the current window using the new url|
|^ b url | same as above|
|attimg | show all images even those without alt attributes (toggle)|
|ub | unbrowse a file|
|ft | show the title of the current web page (file title)|
|fa | show the author of the current web page|
|fd | show the description of the current web page|
|fg | show the generator of the current web page|
|fk | show the keywords of the current web page|
|fu | print the file's underlying URL|
|rf | refresh the web page or directory listing|
|et | edit this web page as pure text|
|hr | http redirection (toggle)|
|vs | verify ssl connections (toggle)|
|sr | send referrer (toggle)|
|local | fetch pages from cache (toggle)|
|ua3 | pretend to be the third user agent in your config file|
|ua | print the current user agent|
|can | (curl auth negotiate) toggle SPNEGO type authentication, required for kerberos (krb5/gss)|
|crs | (curl restart) to recover from certain curl or ssl bugs|


## FTP or HTTP Downloads   
|command|description|
|:---|:---|
|pdd | progress of download indicated by dots|
|pdc | progress of download indicated by megabyte count|
|pdq | progress of download quiet, no indicator|
|dld=foo | preset the name of the next file to download|
|dld=% | accept the download filename as set by the server|
|ftpa | ftp active mode (toggle)|
|bg | download files in background (toggle)|
|bglist | list background downloads, complete or in progress|
|jsbg | download Javascript files in background (toggle)|


## Interact with a Web Page   
|command|description|
|:---|:---|
|g | go to the link on the current line|
|g- | go to the link, but don't browse, or render, or play|
|g2 | go to the second link on the current line|
|g$ | go to the last link on the current line|
|g? | print the url for the link on the current line|
|g2? | print the url for the second link|
|g$? | print the url for the last link|
|A | create a buffer of <a> tags for the hyperlinks on the current line|
|4,7A | create a buffer of <a> tags for the hyperlinks on lines 4 through 7|
|exp | expand a frame, g also works|
|,exp | expand all frames|
|ctr | contract a frame|
|^ | the back key, go back to the web page you were looking at before|
|& | internal link back key, go back to the source of an internal link|
|img | download the image on the current line|
|img2 | download the second image on the current line|
|img$ | download the last image on the current line|
|img? | print the url of the image on the current line|
|i=xyz | set the input field on the current line to xyz|
|i=red,green,blue | select the options red, green, and blue from a multiple select list|
|s/$/,oran | add the option orange to the select list|
|i=`amber | put in your own color if it is a suggested select list|
|s/,red/ | remove red from the select list|
|selsep=| | change the separator between items in a select list|
|selsep= | print the separator|
|i<5 | read session 5 into the text input field, one line of text|
|i<5@3 | read line 3 from session 5 into the text input field|
|i<5@'c | read line label c from session 5 into the text input field|
|i<-1@'c | read line label c from the buffer below into the text input field|
|i<foo | read file foo into the text input field, one line of text|
|i2=xyz | set the second input field on the current line to xyz|
|i2* | push the second button on the current line, usually submit or reset|
|i$* | push the last button on the current line|
|i3? | describe the third input field on the current line|
|ipass2 | prompt for the content of the second input field, disabling echo|
|ib | allocate an input buffer for this textarea|
|ib7 | use session 7 for this input textarea|
|/<session/ ib | note the space between / and i|
|shc | show columns of an html table|
|ur | unfold a row in an html table (toggle)|
|M4 | move this web page to session 4 and back up to the previous page|
|M | move this web page to an empty session and back up|
|js | allow Javascript (toggle)|
|rr | rerender the screen, to reflect asynchronous Javascript changes|
|rr=75 | rerender the screen automatically every 75 seconds|
|showall | show all hover and invisible text (toggle)|
|colors | show the colors on the page|


## Mail Client   
|command|description|
|:---|:---|
|sm | send mail [account number]|
|re | reply to a mail message|
|rea | reply to all|
|flow | send mail with format=flowed (toggle)|
|attimg | show attached images (toggle)|
|imap n | establish an imap connection|
|imap 0 | tear down the imap connection|
|rf | refresh the folders and their message counts|
|l=40 | fetch 40 envelopes at a time|
|e=ufs | envelope format is unseen, from, subject|
|a | add folders, like append mode, . when finished|
|s/x/y/ | rename a folder - but not a system folder!|
|d | delete a folder - but not a system folder! All email in that folder is lost.|
|g | go into a folder, similar to directory mode|


## Envelopes   
|command|description|
|:---|:---|
|rf | refresh the envelopes in this buffer|
|d | delete this email|
|m abc | move email to folder abc|
|t abc | copy email to folder abc|
|r | mark email as read|
|r- | mark email as not read|
|u filename | write this email unformatted to a file|
|U filename | same as above but delete the email|
|w filename | write this email formatted to a file, and an unformatted copy in ~/.trash/rawmail|
|W filename | same as above but delete the email|
|g | go into this email for reading|
|t | go into this email but present the plain text mime component|
|g- | go to this email but do not browse|


## Reading an email beneath Imap   
|command|description|
|:---|:---|
|rf | refresh the email you are reading|
|d | delete the email you are reading|
|m abc | move the email you are reading|
|t abc | copy the email you are reading|
|u filename | save the email you are reading unformatted|
|w filename | save the email you are reading formatted|
|^ | back up to envelopes|
|^^ | back up to folders|


## IRC Client   
|command|description|
|:---|:---|
|irc m n domain nickname | set up irc chat using sessions m and n with the specified domain and nickname|
|irc m n domain nickname group | set up irc chat and join the specified group|
|irc m n domain:port nickname:password group | specify a port and a password|
|irc m n domain+:port* nickname:password group | show this channel in the output buffer, and use secure sockets|
|showchan | show channels as messages are displayed (toggle)|
|lst | show the date and time when this line was received in the output buffer|


## Plugins   
|command|description|
|:---|:---|
|pb | play buffer (typically audio)|
|pb.mp3 | play the current buffer as an mp3 file|
|pg | plugins active (toggle)|


## Database Access   
|command|description|
|:---|:---|
|ds=source,login,password | set the data source|
|sht | show tables|
|shc | show columns (and primary key) for the current table|
|shf | show foreign keys for the current table|
|fbc | fetch blob columns (toggle)|


## Edbrowse Functions   
|command|description|
|:---|:---|
|<foo arg1 arg2 … | invoke the function foo, defined in your .ebrc file|
|<7 | run the commands in session 7|
|<*7 | run the commands but stopp on error|
|<7@22,29 | run the commands from lines 22 through 29|
|</foo | run the commands in session whose file name contains foo|
|<*/foo | run commands but stop on error|
|</foo@22,29 | run the commands from lines 22 through 29|
|<7 | pass the commands in session 7 to jdb if in jdb mode|
|<-1 | runn the commands in the buffer down one on your stack|
|<+2 | runn the commands in the buffer up two on your stack|
|X | silently make this the current line, often used in scripts|
|sleep n | sleep for n seconds, while some javascript runs in the background|
|var x=7 | set the variable x to 7|
|var x=clear | clear the variable x|
|var x:=7 | set x in the environment|
|var x:=clear | clear x from the environment|
|$(x) | expand the variable x|
|$(:LANG) | expand the environment variable LANG|
|p text | print text|
|p $(x) | print the variable x|
|$(x+3*y-7) | perform basic arithmetic|
|[ $(x) = $(y) ] | test for equality|
|[ $(x) != $(y) and friends ] | test for inequality|


## Debug   
|command|description|
|:---|:---|
|db3 | set debug level, 0 through 9|
|db | report debug level|
|db>/tmp/edbrowse.out | redirect debugging output to a file|
|demin | deminimize Javascript (toggle)|
|timers | enable Javascript timers (toggle)|
|speed=7 | Javascript timers run 7 times slower|
|tmlist | show all timers for this window|
|dbcn | enable cloneNode debugging (toggle)|
|dbev | enable event debugging (toggle)|
|dberr | enable js error debugging (toggle)|
|dbcss | enable css debugging (toggle)|
|dbtags | debug the html scanner (toggle)|
|dblay | debug the page layout (toggle)|
|trace | inject trace points into the Javascript (toggle)|
|jdb | Javascript debugger, bye to exit|
|ok(o) | list all the members of an object, some may not be enumerable|
|showscripts() | show scripts anywhere in the tree|
|searchscripts(string) | look for a string in the scripts|
|showframes() | show frames anywhere in the tree|
|snapshot() | snapshot the Javascript and css files for local debugging|
|aloop(array, string_on[i]) | execute string on each member of the array|
|uptrace(node) | climb up the tree from a given node|
|dumptree(node) | show the tree below a given node|
|by_esn(n) | find the tag with the given edbrowse sequence number|
|bp@(label) | inject this code into a js file for a simple breakpoint|
|step$stack() | show stack, usually from within a breakpoint|
|step$l = 0|1|2 | set the trace level for each step|
|step$go = label | set step$l to 2 at this point, breaking at each step thereafter|
|step$exp = expression | set step$l to 2 when expression is true, breaking at each step thereafter|
|arg$ | reference the arguments object from within a breakpoint|
</details>    


## Tips for Avoiding Line Numbers
If you haven't spent time using the ed editor, you may find this program awkward. It seems like you have to use line numbers, which are ever changing as text is added and removed. However, line numbers are rarely needed in practice. Here are some tips for avoiding them.

If you want to read the entire file, type ```,p```. Of course a large document will fly past your screen, but there's an easy way to step through page by page. Start with ```0z24``` to get the first 24 lines. Then the ```z``` command will give you the next 24, and the next 24, and so on. You may want to use 22, or 23, or whatever makes sense relative to your screen. Another approach is to simply hit return, again and again, and proceed line by line.

Once you are used to regular expressions, you can jump to any part of the document, even a large document, in record time simply by searching for a unique text fragment. This comes with practice. If your search string is not unique, you may have to search two or three times to find the desired paragraph.

If you want to mark certain lines of text, please don't try to remember the line numbers. Use the ```k``` command to mark them. For example, use ```ka``` and ```kb``` to mark the start and end of a block of text, while ```kc``` marks the new location. The move command is then ```'a,'bm'c``` - with absolutely no line numbers. This is standard ed fare.

To look for links on a web page, search for the left brace. Yes, you may stumble across a literal left brace in the text, but this doesn't happen very often. You might access a particular link by typing ```/{Next}/g```. Similarly, you can look for input fields by searching for the less than sign. This will make sense as you read about the representation of web pages below. And of course, multiple operations can be scripted, an important feature of edbrowse.


## Mailing List
There is a mailing list for users of edbrowse and other command line utilities. You can subscribe by sending a message to <commandline+subscribe@lists.the-brannons.com>


## Edbrowse Wiki
There is a [wiki](https://github.com/CMB/edbrowse/wiki) devoted to edbrowse, including tips and tricks, and sample ```.ebrc``` configurations and functions. See edbrowse.org for more information.


[⬆️](#top)
<br><br><br><br>

# Chapter 3 The Editor
## Important Deviations From /bin/ed
Certain search/substitute commands may behave differently under this editor. This is because the regular expressions are interpreted by the perl compatible regular expression (pcre) library, rather than the traditional regexp library. 

Hence regular expressions have more features, and more power, than the regular expressions employed by ```/bin/ed```. 

The syntax is also somewhat different. For instance, perl uses bare parentheses where ed uses escaped braces -- to delimit sections of matched text. And perl uses ```$1 ... $9``` to reference the matched substrings, whereas ed uses ```\1 ... \9```. Also, perl supports the ```i``` suffix, for case insensitive search, along with the traditional ```g``` suffix for global substitute. 

There is no reason to describe all the nuances here. Please read the perlre man page ```man perlre``` for a full description of regular expressions under perl, or visit this pcre page. Once you are accustomed to their power and flexibility, you'll never go back to ed.

Great. You've read the perlre man page, and you're back. Here are a few changes that I've made to perl regular expressions. I have found that ```(``` and ```)``` are almost always meant to be literal, as in searching for myFunction(), so I reverse the sense of escaped parentheses in perl. That is, ```(``` and ```)``` now match the literal characters, and ```\(``` and ```\)``` are used to demark substrings of the matched text. 

These substrings are then referenced, in the replacement string, by ```$1``` through ```$9```. Similarly, ```|``` means a literal ```|```, and ```\|``` is alternation. I also change the sense of ```&``` on the right, so that it means what it means in ed, i.e. the entire matched string. ```$0``` also means the matched string; this is a feature of perl. 

I leave ```^ $ . [ ] + * ?``` and ```{m,n}``` alone, to be interpreted by perl, as described in the perlre man page. However, if ```*``` is the first character, it is treated as a literal star. This makes sense, as there is no previous character to modify. Some versions of ed do this, some don't. This is convenient; when you want to replace ```* +``` or ```?``` you don't have to escape it just because it is a modifier. Similarly, an open bracket with no closing bracket is treated as literal, and ```{m,n}``` at the beginning is literal. 

These changes to regular expressions, to look more like ed, may be confusing if you are a perl expert, however, these changes make this editor easier to use for others, especially the experienced ed users. Perl users may wish to turn edbrowse modified regular expressions off via ```ebre-```. At this point edbrowse passes regular expressions to perl with almost no changes. If a script employs complex regular expressions with many parentheses, that script might begin with ```ebre-```, so these parentheses need not be escaped. You can use look ahead, look behind, back references, and all the cool pcre features in a recognizable format. The ```ebre``` setting is restored when the script is complete.

Below are some additional differences between this program and ```/bin/ed```.

Lines beginning with ```#``` are ignored, making it easier to comment your edbrowse scripts. The ```#``` character has no special significance in the middle of a line.

Lines beginning with ```!``` implement a shell escape. The ```!``` character has no special significance in the middle of a line, unless it is starting a shell command under a global regexp, or as part of a read or write command. The ```!``` alone spawns an interactive subshell - type ```exit``` to return to edbrowse. The work "*ok*" is printed when the shell command is finished - thus you can tell when a no-output command is done. Use ```db0``` to suppress this ok acknowledgement.

> [!NOTE]
**Warning** - some versions of ```system()``` spawn ```/bin/sh```, regardless of your ```$SHELL``` environment variable. We have no control over this. Your shell command, or your plugin commands, might not work properly if you are using bash features, and edbrowse launches sh. ed has the same issue. You can test this with ```!echo $RANDOM```, which is a bash feature. If you get nothing, edbrowse is running sh. Prove it by:
```
!/bin/bash -c 'echo $RANDOM'
```
Type ```cd dirname``` to change directories. The new directory is always printed. Type ```cd``` alone to find out where you are.

Unlike bash, edbrowse does not retrace your steps back through symbolic links. Thus ```..``` is always the physical parent directory.

If the string contains ```$ [] * ?``` or a leading ```~```, environment variables are expanded, and globbing is performed. Thus ```cd ~/work``` takes you to the work directory under your home directory. This is performed by the shell, and is separate from edbrowse variables, which will be described later.

This command does not change any filenames that may be active. You can edit foo, ```cd ..```, and write, and foo will be copied to the parent directory. That's probably not what you want, so be careful when changing directories.

```r``` operates on the current line by default, rather than the last line. Use ```$r``` to read a file at the end of your working text.

The ```w+``` command appends to the file. Some versions of ed use ```W``` for this operation. Some versions of ed use ```w>``` for this operation, but for 40 years ```>``` has been the industry standard for write with truncate, so using ```>``` for append is somewhat confusing. And ```w>>``` is just too clunky, so I use ```w+```.

```w/``` writes the data into a file whose name is the last component of the current file name. This is useful when you've just downloaded ```this.that.com/foo/bar/package-2.7.7-22.tar.gz```, and you want to write the file locally, but don't want to retype the stuff at the end. Alternatively, ```f/``` changes the filename, keeping only the last component.

Whenever a file is read from or written to disk, ```$var```, in the filename, is replaced with the corresponding environment variable. Thus you can edit your address book at any time via ```e $adbook```, provided ```$adbook``` has been set in your environment. Constructs such as ```${foo}bar``` are supported. Also, a leading ```~/``` is replaced with ```$HOME/```, making it easy to edit files in your home directory such as ```~/.profile```. Or use ```~user``` for another user's home directory. This is once again separate from edbrowse variables.

Shell meta characters are expanded, provided the result is one file name. You can read or write a file by typing a minimal portion of its name. Neither ```$variables``` nor stars are expanded for files on the command line, as this expansion is already done for you by the Unix shell. Thus you should be able to edit ```*.c```, and get all the C source files in the current directory.

Variable substitution and globbing of filenames can be completely suppressed by a leading backquote. If you really want to read a file called ```*a?```, type ```r `*a?```. You can escape an individual shell meta character with the backslash, as in fun```\*house```.

```p``` text will print the text, basically an echo. ```p``` without anything following prints the line as usual.

Many versions of ed place a ```$``` at the end of a listed line, but this is not one of them, at least not by default. Use the command ```endm``` to place end markers around listed lines. Listed lines begin with ```^``` and end with ```$```.

Capital ```Q``` does not quit the editor absolutely. This is because I often hit caps lock by mistake, or even shift ```q``` by mistake, and if I've forgotten about some important changes that I've made, those changes are gone! This seems contrived, like it would never happen, but it does, so I disabled capital ```Q```. Type ```qt``` to quit absolute.

Capital ```J``` joins lines together with spaces between them. ```J:``` joins lines using a colon separator. Any string can be used here. Whitespace is significant here, as in ```J :``` .

```0kx``` unsets the label x. This is useful in scripts that want to set labels for temporary work; they can unset those labels when done.

missing line numbers before and after the comma are assumed to be ```1``` and ```$```. This is consistent with ```,p``` -- to print the entire file. Edbrowse does not recognize ```3;5p```, as some versions of ed do. The comma is the range separator, and ```;p``` means ```.,$p```.

```g``` continues to sweep until all marked lines are operated on. Most versions of ed will not do this. Example: a file with 10 lines, 1 through 10, run ```g/[89]/;m0``` Line 8 matches, and lines 8 through 10 are moved to the start. At this point ed stops, but I sweep again, and discover the second line, that contains 9, and move that block to the beginning. Neither implementation is particularly right or wrong, as far as I can tell.

You cannot enter one command across two physical lines by putting a backslash at the end of the first line. And there's no need to in any case, because perl supports ```\n``` translation. To split a line in the middle of the word ```doghouse```, type:
```
s/doghouse/dog-\nhouse/
```
Only the first 500 characters of a line are displayed. The rest of the line is in the buffer, and can even be modified via a substitute command, but if you want to see it, you will need to split it, as in the doghouse example above. You can change the number of characters displayed by using the ```ll``` command.

```a+``` adds text, like ```a```, but also adds the line you last typed, when you thought you were in append mode, but you weren't.

This program is less tolerant of whitespace than ```/bin/ed```. ```57 , 63 p``` will not fly.

When searching for a regular expression, both ed and edbrowse will wrap around the buffer, back to the beginning. Thus ```/./``` on the last line prints the first line. This behavior can be turned on and off via the ```sw``` (*search with wrap*) command. Some people prefer to stop searching at the end of the buffer, without going back to the beginning.

A single ```%``` on the right hand side of a substitution is replaced with the last right hand side. Some versions of ed do this, some don't.

```s```, is shorthand for ```s/, +/,\n``` This is used to split lines at phrase boundaries. You can also use ```s.``` to split a line after the first period -- at a sentence boundary. ```s; s: s)``` and ```s"``` can also be used. ```s,3``` splits the line after the third comma. You might need to use ```s.2``` if the sentence begins with ```Mr. Flintstone```. Use ```s.$``` for the last period.

Type ```s``` by itself for ```s//%```.

```/xyz/!``` searches for the next line that does not contain ```xyz```. ed does not do this, but sed does, and it's quite handy. Note that xyz is in the remembered regexp buffer, and so is ```!.``` type ```/``` for the next line that doesn't have xyz. type ```?``` for the previous line that doesn't have xyz. Note that there is no need for ```g/xyz/!``` since that is the same as ```v/xyz/```.

As mentioned earlier, the ```i suffix``` on a search or substitute means case insensitive. This is perl compatible. The ```f suffix``` means forget; these strings are not stored for the purposes of search and replace. If you are searching through the buffer for the word ```foo```, and you have typed ```/foo/``` once, you can keep typing ```/``` to find the next instance of ```foo```. 

By entering ```/bar/f```, you search for ```bar``` but ```bar``` is forgotten, so that the next ```/``` searches for ```foo``` once again. The ```$ suffix``` makes the last substitution on the line. ```5g``` replaces the fifth instance of the regular expression and all subsequent instances. Some versions of sed do this. In summary, the possible suffixes for a substitute command are ```i f g $ number p```, in any order, although ```$``` cannot appear with ```g``` or with a number.

The ```sg``` command makes searches and substitutions global across editing sessions. This is a toggle, so type ```sg``` again to keep search strings local to their sessions. As with any toggle, you can enter ```sg+``` or ```sg-```. If you want to look at all instances of  ```foo``` in all the files in the current directory, and change some of them to ```bar``` at your discretion, edit ```*```, then enter ```sg``` to make substitution strings global to all edit sessions. In the first session, search for ```foo```, and replace some of them with ```bar```. Type ```e2``` or ```e+``` to move to the next session, whence you can search using slash alone, because the string ```foo``` is applied to all sessions. Similarly, you can use ```%``` to refer to ```bar```. The ```sg-``` command returns this editor to its local behavior, where each file has its own search/replace strings.

Errors associated with reading or writing files, or switching sessions, are always printed. Other errors elicit the usual question mark, whence you must type ```h``` to read the explanation. Type capital ```H``` if you always want to see the error messages. This is consistent with ed. Most of the new commands, introduced by edbrowse, elicit a question mark on error, but some print the error message. This is a matter of taste, and largely at the discretion of the software developers.

In most versions of ed, the command ```z7``` means ```.,+6p```, making the current line ```+7```. This is inconsistent, having one and only one ed command that leaves dot somewhere other than the last line printed. The confusion is compounded when ```z``` prints the last lines in the file, whence dot actually is the last line printed. In this program ```z7``` means ```+,+7p```, and the current line becomes the last line printed, just like the other commands you know and love. Without a number, ```z``` prints the previous number of lines. Thus you can read your file a chunk or screen at a time.

Subsequent sections describe new and interesting features, completely foreign to ed. These include the simultaneous edit of multiple files similar to emacs and vi, and the ability to browse an html file and edit its fill-out form.


## Performance of the Editor
Certain ```g``` commands have been optimized for performance. for example, consider ```r !seq 100000```, followed by ```g/[678]$/d```. Line 6 is deleted, then the remaining lines are pulled up to fill in the gap. Next line 7 is deleted, then 8, then 16, and so on. This direct algorithm is quadratic in the size of the file, and becomes untenable for large files. Therefore, edbrowse invokes a linear algorithm when the subcommand deletes or joins a fixed number of lines containing the marked line, e.g. ```g/re/ -,+3J```. In this case edbrowse prints "*mass delete*" or "*mass join*" at debug level 3 or higher.

These commands are not optimized in browse mode, sql mode, or directory mode - with one exception. ```g/re/d```, wherein we delete the marked lines, is optimized in directory mode. And what else would you do in directory mode anyways? ```g/\.o$/d``` makes sense, ```g/\.o$/-d```, or anything else, is risky and unpredictable.

Reading from a buffer is also optimized. ```g/re/ r7``` this prints "*mass read*" at debug level 3. You must read the contents of a buffer, or part of the buffer using the at syntax. If you want to inject the contents of a file many times over, read that file into a buffer in another session first, and then use the above construct. This is more efficient anyways; you don't want to open that file over and over again.

To implement ```g/xyz/ 1,3t```. efficiently:
```
1,3w7
g/xyz/r7
q7
```
If you are scripting this, and you're not sure that session 7 is available, it can all be done on-stack.
```
etmp
r+1@1,3
up
g/xyz/r-1
down
^
```
To implement g/xyz/+r5 efficiently:
```
g/xyz/+s/$/uvw/
g/uvw$/r5
,s/uvw$//.
```
The ```s``` (substitute) command across a range is optimized when it turns one line into many, e.g. ```,s/doghouse/dog\nhouse/```. However, it is not optimized when under the ```g``` command. If you want to split doghouse on lines that begin with xyz, instead of ```g/^xyz/ s/doghouse/dog\nhouse/ try ,s/\(^xyz.*dog\)house/$1\nhouse/```

Contact the developers if you feel other editor commands should be optimized.


## Balancing Braces
The capital ```B``` command is of interest to programmers, and will probably not be used by casual home users. It locates the line with the balancing brace, parenthesis, or bracket. Consider the following code fragment.
```
    if(x == 3 &&
    y == 7) {
        printf("hello\n");
    } else {
        printf("world\n");
        exit(1);
    }
```
The capital ```B``` command, on either the second or the last line, moves to the middle line "} else {", because that balances the open brace. On the first line, B moves to the second line, which balances the open parenthesis. The second line balances {, rather than ), because braces have precedence over parentheses, which have precedence over brackets. You can force a parenthesis match by typing B), which moves from line 2 back to line 1.

The B command on the else line is ambiguous - not knowing whether to look backwards or forwards. Type B{ or B}.

You can explicitly balance <>, as in multiline html tags.

B can be used on a line without braces, or with no unbalanced braces. B} on the fourth line moves to the third line, the start of the block that contains that line. B{ on the fourth line moves to the last line.

If a line contains many braces, such as }}}, B}1 balances the first unbalanced brace, from the inside out. In this example, B is the same as B} is the same as B}3.

Edbrowse skips past strings, so that c = '{', or s = "abc}def", should not derail this function. However, comments, or bare regular expressions, (as seen in perl or javascript), that contain punctuation marks, will throw edbrowse off the track.


## Context Switch
This program allows you to edit multiple files at the same time, and transfer text between them. This is similar to the world of virtual terminals (Linux), where you switch between sessions via alt-f1 through alt-f6. In this case you switch to a different editing session via the commands e1 through e6. Note that `e 2' edits a file whose name is "2", whereas `e2' (without the space) switches to session 2. Similarly, you can read the contents of session 3 into the current buffer via r3, or write the current buffer into session 5 via w5. The latter command will produce a warning if session five already exists, and you have made changes to its text, but have not saved those changes. In other words, you are about to lose your edits in session 5. Typing h will produce the explanation: "Expecting `w' on session 5".

e+ and e- move to the next and previous editing sessions, like channel up and channel down on your tv remote.

eret returns to the previous editting session, like the button on your tv remote that goes back to the channel you were just watching.

e/foo moves ahead to the session whose file name, or html title, contains the substring foo. The search is case insensitive. This search will wrap around if the sw (search with wrap) option is enabled. If sss (search similar sessions) is enabled, the search restricts to sessions of the same mode: directory, browse, imap, etc. e?foo moves back to the session whose file name, or html title, contains the substring foo. A script can create temp buffers, and name them, and move among them, without knowing their session numbers. Use enew to create a new empty buffer, f to name it, and M to move it to a new session. Use etmp if you don't want to check whether the current buffer has been written.

enum moves to the sesssion indicated by the number on the current line. A new session is created if none was there before. The first number on the line is chosen. For example, enum on the line jj3jj7jj moves to session 3.

If you quit a session you are moved to the next valid editing session, wrapping around to session 1 if necessary. The program exits when the last session quits.

Warning, the program contains a limitation regarding the undo command. If you switch to another session, then switch back, you cannot undo your last edit. You'd think this would be easy to fix, but it is trickier than it seems, so I haven't gotten around to it. Make sure everything is copacetic before you switch to another session.

Use the bflist (buffer list) command to see a list of all the editing sessions that are currently open. Edbrowse presents the session number, and the title if the session's buffer holds a web page, else it prints the file name. Use bflist/foo to list each session whose file name or title contains the substring foo. The search is case insensitive. Use bflist?foo to show this list in reverse.

Use the hist command to see a history of files or web pages that are open on the current session. This is more common when browsing, where each new web page pushes the previous page onto a stack, and the ^ command pops the stack. It is less common when editing local files. Use hist/foo to list each buffer whose file name or title contains the substring foo. The search is case insensitive. Use hist?foo to see this list in reverse.

Let's run through a cut & paste example. You are editing file foo in session 1, and you realize that a paragraph from file bar would fit perfectly right here. Here is how it might look. Lines beginning with < are the user's input, and lines beginning with > form the program's responses. The # sign delimits my injected comments, which would not normally appear in the middle of a line.
```
< e2   # switch to session 2
> new session
#  Unlike ed, the r command does not establish a file name, even if the
#  buffer is empty.
#  Thus "r bar" is safer than "e bar".
#  The text is not linked to the file bar,
#  and we cannot accidentally corrupt this file.
#  After all, we don't want to change bar, we just want to steal from it.
< r bar
> 28719
< /start/
> This is the start of the cool paragraph that you want to copy.
< 1,-d  # don't need the stuff before it
< /end/
> This is the end of the cool paragraph that you want to copy.
< +,$d  # don't need the stuff after it
< e1
> foo
< r2
> 3279  # size of text read from session 2
< w  # write foo, with the new paragraph included
> 62121
```
The following moves the data from one file to another.
```
< e2
> new session
< e bar  # this time I'm going to change bar
> 28719
< /start/
> This is the start of the cool paragraph that you want to move.
< ka  # mark the paragraph
< /end/
> This is the end of the cool paragraph that you want to move.
< kb
< 'a,'bw3
> 3279
< 'a,'bd
< w  # write bar, without the cool paragraph
> 25440
< q
> no file  # now in session 3
< e1
> foo  # back to session 1
< r3
> 3279
< q3  # quit session 3 remotely, while still in session 1
< w  # write foo, with the new paragraph included
> 62121
```
Here is a faster and easier way to do the same thing, without using an extra transfer buffer. It uses the special notation 'a,'bw1@'c, which injects the prescribed text from a to b, into session 1, at line label c, rather than overwriting the file. The at sign makes all the difference. Say the word at to yourself: put the text *at* this line in the preexisting buffer. This is called the at syntax. A label or a line number or $ or . or + or - must follow @, and there can be no whitespace. Complex expressions like @/xyz/-3 are not allowed here. A single space can change the meaning. 'a,'bw 1@'c writes the block of text to a file named 1@'c, which is not what you want.

kc # mark your current location, where you want the cool paragraph to be
```
< e2
> new session
< e bar
> 28719
< /start/
> This is the start of the cool paragraph that you want to move.
< ka
< /end/
> This is the end of the cool paragraph that you want to move.
< kb
< 'a,'bw1@'c
> 3279
< 'a,'bd
< w  # write bar, without the cool paragraph
> 25440
< e1
> foo  # back to session 1
< w  # write foo, with the new paragraph included
> 62121
```
Here is another way, that reads instead of writes. It uses the special notation r2@'a,'b, which reads the prescribed text from a to b, into session 1, at the current location. The at sign makes all the difference. Say the word at to yourself: read the text starting *at* this line in the other session. This is once again the at syntax. A label or a line number or $ or . or + or - or ; or , must follow @, and there can be no whitespace. Note that r3@, is the same as r3. Complex expressions such as @/xyz/-3 are not allowed here. If a second line number is not given, the single line is read.
```
kc # mark your current location, where you want the cool paragraph to be
< e2
> new session
< e bar
> 28719
< /start/
> This is the start of the cool paragraph that you want to move.
< ka
< /end/
> This is the end of the cool paragraph that you want to move.
< kb
< e1
> foo  # back to session 1
< r2@'a,'b
> 3279
< 'c+   # just to verify we read it
> This is the start of the cool paragraph that you want to move.
< w  # write foo, with the new paragraph included
> 62121
#  now we have to switch back to session 2 if we want to delete it from bar
< e2
> bar
< 'a,'bd
< w  # write bar, without the cool paragraph
> 25440
```
If you want to do this cut & paste operation in a script, and you aren't sure that you are in session 1, and you aren't sure that session 2 is available, you can do it all on-stack, like this.
```
kc # mark your current location, where you want the cool paragraph to be
< e bar # push the file bar onto the editing stack
> 28719
< /start/
> This is the start of the cool paragraph that you want to move.
< ka
< /end/
> This is the end of the cool paragraph that you want to move.
< kb
< up # go up in the stack, like gdb
> foo  # back to the first file
< r-1@'a,'b
> 3279
< 'c+   # just to verify we read it
> This is the start of the cool paragraph that you want to move.
< w  # write foo, with the new paragraph included
> 62121
#  now we have to step down if we want to delete it from bar
< down
> bar
< 'a,'bd
< w  # write bar, without the cool paragraph
> 25440
```
The command that makes this all possible is r-1@'a,'b. -1 is a relative number. + or - n doesn't refer to an edbrowse session, but rather, a buffer on the current stack. In this case it is the buffer that is 1 down from the current position. It is the file bar, below the file foo. Type hist to see the history of edits in the current session. This is like a browser history, and is in fact the browser history if you are on the internet. In this example it prints foo and then bar.

Sometimes it is easier to work within one stack; sometimes it is easier to work across separate edbrowse sessions. Separate sessions are more intuitive in an interactive setting, in my opinion, but a script might not know what sesssion you are in, or what sessions are available, whence working within the current stack is easier.

An e command by itself prints the current session, in case you've forgotten. This is similar to f, by itself, which prints the current file.

r/foo reads the contents of the session whose filename contains the substring foo, or whose html title contains the substring foo, if it is a web page. The bflist command shows you the filenames or titles of the sessions. r?foo looks backwards through the sessions for the buffer to read. This is just like e/foo and e?foo, which were described earlier. And w/foo and w?foo work the same way.

Unlike the e/ command, r/ and w/ respect the at syntax. r/foo@3 reads line 3 into the current buffer, from the next session whose filename or title contains the substring foo. 'a,'bw/foo@7 writes a range of lines from the current buffer into the next session whose filename or title contains the substring foo. This notation can be cryptic, but it can be powerful.


## Usage
type `edbrowse -h' to produce the following usage message. You will see the -f, -fm, and -m options used in several different ways; just ignore them for now. These options cause edbrowse to act as a mail retriever or interactive mail client. This will be discussed later.
```
edbrowse  -v    (show version)
edbrowse -h (this message)
edbrowse -c (edit config file)
edbrowse [-d#] -f[#] (fetch mail) 
edbrowse  [-d#] -[p]m    (read pending mail)
edbrowse  [-d#] -[p]fm[#]    (fetch mail and read pending mail)
edbrowse  [-d#] -m[#] address1 address2 ... file [+attachments]
edbrowse  [-c configfile] [-b] [-e] [-dn] file1 file2 ...
```
Type help from within an edbrowse session for a summary of the common edbrowse commands.
The -dn option sets the debug level to n, where n is between 0 and 9. The default is -d1, which prints the sizes of files as they are written and read. Some people like -d2, which prints the URLs as you jump to new web pages or submit forms online. Unless you are a developer, you probably don't want to go any higher than that. Remember, the debug level can be changed interactively by using the dbn command (n between 0 and 9). You can direct debugging output to a file by `db>filename', and you probably want to for db5 or above. There's a lot of output.

The -e option causes edbrowse to exit when it encounters an error. This is usually used by batch scripts. If there is a problem, you don't want to march on, executing the rest of the edbrowse commands. Note that set -e has the same effect in a bash script.

Use -c alone to suppress processing of, and edit, the .ebrc configuration file. (This config file will be described later.) You might want to do this if your config file has syntax errors, which are displayed when edbrowse starts. Your config file is automatically loaded into session 1. Make changes, save the file, and type `config' to reload the file. If there is another error you may need to make another change, save, and config again. Continue until there are no errors. Processing of the config file stops at the first error, so you really want a clean run.

From within edbrowse, a file name of -c is treated as the config file. You can switch to a new session, view, edit, save, and reapply the config file without ever leaving edbrowse.

If the first arguments are -c filename, edbrowse uses filename as its config file, rather than the default file under your home directory. As long as this edbrowse process runs, -c refers to the file specified on the command line, as does the config command, which reprocesses the config file.

The -b option browses each file or url on the command line, or plays it if a plugin so indicates. Without -b, only the urls are browsed. edbrowse this.example.com reads the data from the web page, prints the size in bytes, browses the page, and prints the size of the rendered text. The -b option causes the same thing to happen on a local file, e.g. if you have html files on your computer. It also activates any plugins that might render your file, e.g. pdf, or play your file, e.g. mp3. Plugins will be described later.

The arguments to edbrowse are the files to edit. Edbrowse reads these files into corresponding sessions and starts in session 1. If there are no arguments, edbrowse starts in session 1 with no text and no associated file. If the file is an empty string, "", edbrowse creates an empty buffer for that session. If the file is a url, that web page is fetched from the Internet and browsed. Finally, if the argument begins with a plus sign, such as edbrowse file "+37", then that command is run on the current file. This example prints line 37. Use '+<func' to run an edbrowse function inline. Files, urls, and +commands can be intermixed on the command line. They are processed in order. Leading +commands are applied to the first file, rather than the previous file, since there is no previous file.

If you like this program, and you want it to be your primary editor, you can set the following bash alias.
```
alias e="/usr/bin/edbrowse"
```
If you do this you can use `e filename' to edit a new file, whether you are inside edbrowse or at the shell prompt.


## Binary Characters
At all times, even when entering a file name, this program scans its input for binary codes. Use the three character sequence ~bd to enter the nonascii character 0xbd, which is the unicode for 1/2. Assuming utf8, you will need to enter ~c2~bd for 1/2. Similarly, if you list a line with lna active, the 1/2 character is displayed as ~c2~bd. All nonascii and most control characters are entered and displayed in this manner. Tab and newline must be entered directly from the keyboard. Tab and backspace are displayed as > and < respectively. If the following line is entered,
```
Hello~07 ~x is ~c2~bd of y
```
And then listed, you will see the very same text, but there is a bell and a 1/2 character inside. The ~x is not encoded into anything, because x is not a hex digit. To force a ~, even though there are hex digits following, use two tildes, ~~.

for international text, there are easier ways to enter accented letters into your document, assuming those letters are in your native language and your keyboard has been configured appropriately. In other words, there are typically keyboard shortcuts for your accented letters, so no need to mess with utf8.

Use ~u to enter a high unicode outside of your native language and beyond your keyboard shortcuts. The unicode is in hex. Thus ~u3b3; is the Greek letter gamma. The semicolon is optional. You only need it if another hex digit follows, as in ~u3b3;4 for gamma4. hello~u1f600world puts a grin emoji between hello and world, because w cannot be confused with a hex digit.

Regular expressions can be entered via hex or octal. This program converts ~xx, as a hex value, and the perl regexp machinery converts \nnn, as octal. Thus any of the following will undos a file. The first is translated by edbrowse, the second and third by perl regular expressions.
```
,s/~0d$//
,s/\15$//
,s/\r$//
```
Embedded escape characters are always displayed in hex, whether the line is listed or not. Most terminals and terminal emulators, including the Linux console, interpret various escape sequences as control commands. Thus an errant escape sequence from a binary file could send your terminal into an unexpected state, making recovery difficult. Use /usr/bin/reset to put the terminal back into a sane state. Thus it seems prudent to render escapes as ascii characters all the time. If you have no idea where that ~1B came from, it's probably a literal escape character in your file. Control n and control o are also printed in hex, ~0E and ~0F, as they can also derail many terminal systems.

Returns and nulls are also converted into hex all the time. Thus an embedded return will not make one line look like two lines. You might see this when importing a dos or Windows text file. Every line ends in ~0d. Issue one of the three commands shown above to undos the file. However, edbrowse usually converts these dos files automatically for you, unless you have disabled this feature with the iu command.


## Emojis
An emoji is a small image that is represented by a high unicode. For example, unicode 1f34f displays a picture of a green apple 🍏. For the purposes of this document, I will refer to any high unicode as an emoji. Thus an emoji could be a letter in the Cyrrilic alphabet, a traditional chinese symbol, a math operator, or a picture of a green apple. They are all the same to edbrowse.

When describing a forest, or a basket of fruit, you can enter the green apple emoji as ~u1f34f. That works fine, if you happen to know the unicode for the apple emoji. If not, you have to find and consult a library of emojis, look up the green apple, remember the unicode, and type it in, digit for digit. fortunately, edbrowse includes a more streamlined approach.

It starts with a library of emojis, in a simple text-based format. A file of common emojis is available from the edbrowse wiki, under Emojis.txt. Start with this file if you wish, then edit it to make it your own. This file is then referenced from the edbrowse config file .ebrc, like your address book, cookie jar, and ssl certificates.
```
emoji = /home/mylogin/.ebsys/Emojis.txt
```
For illustration, here is part of that file.
```
#  fruit, and fruit-like plants, like melons
fruit {
    1f347 grapes
    1f34c banana
    1f34e red apple
    1f34f green apple
    1f351 peach
}
```

The group definition must be a single word of ascii letters and numbers, followed by a left brace. At present, the group name cannot contain accented letters. Each emoji is a unicode followed by a series of words, without punctuation. Accented letters are permitted here. Thus you can write an emoji file in your own language. The right brace closes the group.

At any point during edbrowse input, ~jfruit.greenapple is translated into the green apple emoji. There is no space between green and apple, because a space would terminate the description of the emoji. Omit any spaces as you enter the emoji description.

Why do we use ~j to indicate an emoji, rather than ~e? Because e is a hex digit, and we already have code to watch for ~ followed by hex digits. So we had to do something else, and j seems like a reasonable letter to indicate an emoji.

As is typical of edbrowse, unambiguous shorthand is allowed. In this example, ~jfr.gre will work just as well. There is only one group of emojis that starts with fr, that is, fruit, and one emoji in that group that starts with gre, that is, green apple. If the group string does not produce a unique match, edbrowse prints out all the emoji groups in your library, and then prints the word stop. The emoji string is replaced with @@, and input continues. If you are entering text, you will have to go back later and replace @@ with the emoji you want, or something else. You may have typed a very long line, hundreds of characters, or inserted a long line by cut & paste, and I don't want to throw it all away just because the emoji didn't match.

The approach is different if a group is selected, but the emoji string doesn't produce a unique match. Edbrowse presents a menu of emojis that start with the string you entered, or all the emojis in the group if there is no match. Thus ~jfruit.xx, or ~jfruit by itself, produces a menu of emojis in the fruit group.
```
1: grapes
2: banana
3: red apple
4: green apple
5: peach
```
Select an entry by number, or by a unique substring. Thus 4, or green, will select the green apple. gr will not work, since both grapes and green apple start with gr. In this context, spaces can and should be entered. greenapple will not match anything, but green app will work. Select by number to avoid any confusion. Enter an empty line to make no selection. This again produces the word stop, and the emoji string is reduced to @@.

You can select many emojis from the menu. If you are writing an article about fruit, type ~jfruit, and select, from the menu, 5,3,4 - and your text will contain pictures of a peach, a red apple, and a green apple, in that order. 🍑🍎🍏

This comes up more often in a supportive email or post, where you might want to present several hearts. Type ~jheart, and select the blue heart, green heart, orange heart, purple heart … as many as you like, and perhaps items from the party group. Happy birthday 💛🧡💙💚 🎂

Perhaps something is extremely funny, and you want to indicate same with three roll-on-floor-laughing emojis. Type ~jmisc, or whatever group has this emoji, then roll,roll,roll to produce three of them.

Emoji combinations are allowed. These can be simple concatenations, such as the flags. Two emojis together, regional U and regional S, produce the flag of the united states, stars & stripes. The line in your config file, in the flags group, looks like this.
```
1f1fa+1f1f8 united states
```
During text entry, ~jflag.united produces the regional U and the regional S, which is code for the flag. Unless you also have the United Arab Emirates in your config file, in which case you will see a menu of both countries.

There is a sneaky way of joining two emojis together to produce a symbol that is related to both. This uses the join combinator. An example is the baseball mit, which is a baseball joined with a pair of gloves. In the sports group, the line might look like this. The ^ indicates the join operator, the emojis are not simply next to each other, they are joined by unicode 8205.
```
26be^1f9e4 baseball glove
```
Refer to the sample file in the wiki for more examples of these combinations.


## Binary Files
Data is considered binary if it is sufficiently large (more than 50 bytes), and it contains a significant fraction of non-ascii or null characters (more than 25%). International text may contain scattered binary codes for accented letters, but most of the characters should still be ascii. Therefore binary data is not international text. In fact you probably won't be able to display or edit binary data effectively, at least not by this program. But hey, don't let that stop you. As an exercise, create an executable program that prints "hello world", then edit the executable using this editor. Look for the string "hello world" and replace world with jorld. Write the file and run the executable. You should now see "hello jorld".

When binary data is first read into the buffer, you will see the words "binary data". After that the buffer remains "binary", even if you delete all the data and read in ascii text. You must use the `e' command to get a fresh text buffer.

For the most part it doesn't matter if the data is binary or text. Either way you can display and edit the data, and write it to a file. However, edbrowse tries to "do the right thing" for dos text files. It converts crlf to and from newline if it believes the file is text; and it leaves binary data alone. This happens automatically under dos; it can be suppressed with the iu command under unix, if you really want to see the carriage returns.

Although this approach is satisfactory for utf8, it can fail for a large iso8859-1 file with lots of accented letters. Such looks binary, even though it is ascii. You can disable binary detection with the `bd' command, whence your file will remain ascii. This is a corner case, since utf8 is nearly universal. Therefore, the bd command is deprecated, and could go away in a future version of edbrowse.

If you want to find sporadic lines in your file that contain binary characteres that are not part of a valid utf8 sequence, do this. This is destructive, so don't save the file.
```
su8+
,s/^/@@/
su8-
v/^@@/ n
```


## Directory Scan, File Manager
If you edit a directory you will see a list of all the visible files in that directory in alphabetical order, according to your locale. This is the same order as /bin/ls, and is determined by the environment variable $LC_COLLATE. Set LC_COLLATE=C for traditional ascii order. Note: the Raspberry Pi (raspbian) seems to have a bug, wherein LC_ALL trumps LC_COLLATE. It's not supposed to but it does. So unset LC_ALL and set the other LC_ variables individually, according to your taste. Make sure LC_MESSAGES is set, so you can interact with linux in your language.

Use the `hf' option to see the hidden files. (This includes the parent directory ..). Type g to go to one of these files or sub directories. Type ^ to get back to where you were. This is consistent with the browser, where g is the go command and ^ is the back key - more on this later. Thus you can traverse an entire directory tree as though you were inside a file manager.

Like the browser, and like other file managers, the go command will invoke a plugin if that is indicated by the suffix of the file. An mp3 file plays, and a pdf file is rendered into readable text. Use the `pg' toggle command to disable plugins if you don't want this automatic behavior. More on plugins later.

The capital M (move) command moves this directory to another session and backs up. Once again, we will find the same command in the browser. If you were in directory foo, and descended into directory bar, and you wish to look at both of them in parallel, type M, and bar moves to a new session, and you are back in foo, on the line that contains bar. You can now switch between the two directories; foo is not hidden on the stack. Use M6 to move the directory specifically to session 6; this will clobber session 6. If unsure, type M. Note, this command works just as well with files.

Like `ls -F', a subdirectory is indicated by a trailing slash. This slash is not part of the filename. Similarly, named pipe is indicated by |, symbolic link by @, block special by *, character special by <, and socket by ^. If a regular file ends in one of these characters, it may confuse you, but it won't confuse this program. Edbrowse knows whether that trailing | is part of the filename or a pipe indicator. Since each file is represented by a single line of text, files with newlines embedded in their names cannot be accessed.

If you read a directory into a preexisting file it is just text. You can't visit any of the underlying files, because they are just words. You must edit a directory in its own session or read a directory into an empty session if you want to access the underlying files. Note that you can write the buffer to another editing session, and in that session the words are just words. This distinction is important as we start to edit the text.

By default, directories are readonly. If you try to delete a line, and hence the associated file, it will tell you that you are still in directory read mode. Type dw to enable directory writes, and dr to make directories readonly again.

When directory writes are enabled, you can remove files using the d command. For instance, g/\.o$/d removes all the object files. Since these edits have implications outside the scope of this program, there is no undo capability. When you make a change it is made. With this in mind, I borrowed a good idea from Microsoft / Apple. The deleted file isn't actually deleted; it is moved to your trash bin, located in $HOME/.Trash. This is consistent with the Mac and many versions of Linux. If you accidentally type ,d and remove all your files, you can recover them from your trash bin. You may want to set up a cron job that removes all the files from your trash bin once a week. This directory is created mode 700, so nobody else can look at your deleted files. If you create this directory yourself, please make it 700. After all, some of your deleted files might be private.

Because this operation is a move, rather than a true delete, there are a few restrictions based on the operating system. If your OS can move directories, this program will be able to delete a subdirectory as easily as a file. The entire subtree is moved to your trash bin. Make sure your cleanup cron job is capable of removing directory trees, not just files.

If the trash bin is on another file system, the file is copied, rather than moved. It's practically the same; though the file will have your permissions and a current time stamp. Directories cannot be copied in this way. You must copy the directory tree yourself, then delete it, using cp -r and rm -r.

Note that the dx command, wherein files are truly deleted, is the only way to free up space on the disk. Symbolic links and special files are always deleted; there isn't much point in moving a link to the trash bin.

There is one context wherein the u command is available to you. If you have renamed a single file by substitution, not under g//, the u command puts it back. It resurrects the old text, and renames the file as it was. Some filenames are long, and a substitute command doesn't always do what you expect, so the undo command is convenient.

If sessions 1 and 5 both contain directories, you can move the current file from the first directory to the second by .m5. This does not move lines around like the editor; it moves the file from one session to another. The kernel rename function is used whenever possible, to preserve the underlying directory tree, ownership, permissions, or special attributes. This cannot be assured if the file is moved to another file system. The file must be copied, then deleted, giving it your ownership and the current time. In some cases, edbrowse may call upon /bin/mv to perform this operation. You can move a range of files by 'a,'bm5, or files matching a regular expression by g/re/ .m5.

Use .t5 to copy the file to the directory in session 5. Small files are copied by edbrowse; large files or special files or directory trees are copied by /bin/cp. As with move, this will not overwrite an existing file. These move copy operations cannot be undone.

Use .m+2 to move a file to a directory that is up two levels on your stack. Recall that the hist command prints your editting history, so you can see which directories are where on your stack. Similarly, .t-3 copies a file into a directory that is 3 levels down.

.l3 links the file to the directory in session 3. This is a hard link. If you want a different name for the second link, switch to session 3 and use the s command to rename that file. Similarly, .l+2 links this file into the directory two levels up in the edbrowse history.

.L3 creates a symbolic link. Again, you can switch to session 3 and rename it if you wish. For best results, the current directory should have an absolute path. If it does not, results can be unexpected. If you are located in directory foo, and you edit . in session 1 and ../bar in session 2, .L2 will not do what you want. A file j in foo will have a counterpart j in ../bar that is a symbolic link to ./j, because that is how it is seen from foo. j is symbolically linked to j. Accessing j in bar leads to infinite recursion. If you want your files in foo symbolically linked to the parallel directory bar, using relative links, do this. cd bar ; edbrowse ../foo . Now .L2 sees the file j, which is ../foo/j, links it into the current directory, which is bar, thus bar has a file j which is a symbolic linke to ../foo/j. This is the correct strategy for building relative symbolic links in edbrowse.

“What's the point of all this?” you may ask. “What's wrong with the shell?”

Nothing, as long as the file names are small and familiar. But sometimes the file names are long and cumbersome, and it is nearly impossible to type those names into the shell, character for character, upper and lower case, with no mistakes. Meta characters such as the * can help, but only when the file you want has a name substantially different from the other files in the directory. This isn't always the case. Suppose an application generates log files as follows.
```
ProgramFooBar.-04-04-1998.06:31:59.log
ProgramFooBar.-04-11-1998.11:37:14.log
ProgramFooBar.-04-18-1998.16:22:51.log
```
How do you delete the old ones and keep the most recent, or rename them to something more manageable? Stars are a bit risky; you can access multiple files without realizing it. And we're not even talking about those pesky files with spaces or invisible control characters in their names. A file manager brings up the list of files, whence you can click on the file you wish to view or edit or remove. Edbrowse gives you that kind of power in a command line setting.

When the substitute command changes text, it renames the underlying file. This won't move the file on top of another existing file, so you can't lose any data this way.

The search and substitute commands ignore the trailing filetype characters. If you want to rename a directory from foo/ to foobar/, you can type s/$/bar/. The bar will be placed at the end of the word foo, because the trailing / isn't really there.

Now suppose you want to run an arbitrary program on some of these files. This could be a print utility,a compiler, whatever. Sometimes you can rename the files for your convenience, then work in the shell. But sometimes you don't own the files, and sometimes they must retain their original names. This happens when several html documents reference each other through hyperlinks, using their existing filenames. So you can't rename the files, yet you still want to run your program on one or two of them.

You can run any program on any file without retyping that filename via the shell escape. Use kx to assign the label x to the file you are interested in. This is standard ed syntax. Then run !program $EB_LNx to invoke your program on the contents of the line marked by x. This sounds involved, but it is merely variable substitution by the shell. If your filename contains spaces, run !program "$EB_LNx" to make sure the entire file name is one argument to the running program.

EB_DOT holds the text on the current line, EB_PLUS holds the text on the next line, EB_MINUS holds the text on the previous line, and EB_FILE holds the current filename. If you try to write a file, and remember that you left it readonly, you can make it writable via !chmod +w "$EB_FILE", then write the text to the file.

You can expand multiple tokens in one shell command. Use kx and ky to mark two files that you want to compare, then run !diff "$EB_LNx" "$EB_LNy".

This feature is not limited to directory scans. You may be editing a simple file, but you can still paste the contents of a line into your shell command.

'. is shorthand for "$EB_DOT". '- becomes "$EB_MINUS", '+ becomes "$EB_PLUS", 't becomes "$EB_LNt", and '_ becomes "$EB_FILE". These replacements are only made if there are no lettters or numbers on either side of the punctuation marks. After all, you wouldn't want to replace 't in the word wouldn't.

The replacement is quoted, and thus a single argument to the shell. Because the shorthand references the environment variable, and not the line itself, it is quoted safely. For example, create a line that contains only ", then !echo '. works. If you don't want the contents of your line to be quoted in this way, use the variable $EB_DOT directly.

When in directory mode, the ls command displays various attributes of the file on the current line. Type lsl for the length, lss for the approximate size, lst for the mod time, lsp for the owner group permissions, lsi for the inode, lsk for the number of hard links, lsy for the path associated with this symbolic link, or lsm for the major and minor device numbers. These can be combined, e.g. lspk prints permissions and the number of hard links. ls is the same as lsst, size and mod time. Edbrowse prints ~ if the attributes cannot be acquired, e.g. asking the size of a broken symbolic link. The original symbol was a question mark, but that was easily confused with the question mark of an invalid command.

This feature is not limited to directory scans. Type lst while viewing a file to get the mod time of that file.

If you want file length and time to appear next to every file in a directory listing, then enter ls=lt. The equals sign applies the ls directive to all subsequent directory scans. Type ls= to turn this off. Here is how the root directory might look with ls=lt.
```
bin@/ 36864 Aug 31 2015 16:20
boot/ 4096 Dec  4 2014 07:54
cd/ 4096 Nov 30 2014 09:38
dev/ 3560 Sep  3 2015 05:00
etc/ 4096 Sep  3 2015 05:00
home/ 4096 Mar 10 2015 07:52
lib@/ 53248 Aug 31 2015 16:20
lost+found/ 16384 Dec 10 2014 15:32
opt/ 4096 Jan 12 2015 04:36
proc/ 0 Sep  3 2015 04:59
root/ 4096 Mar 10 2015 07:37
run/ 740 Sep  3 2015 05:00
sbin@/ 12288 Jul 14 2015 10:43
sys/ 0 Sep  3 2015 04:59
tmp/ 260 Sep 24 2015 11:05
usr/ 4096 Jan 12 2015 04:47
var/ 4096 Sep  3 2015 04:59
```
All entries are directories under the root directory, thus they all end in /. The first entry is bin@/ because bin is a symbolic link to usr/bin (most systems are configured this way), and /usr/bin is a directory. The size of /proc is 0, because /proc is a virtual filesystem. The same holds for /sys.

If you search for the year 2014, you won't find anything, because the date and time are extras that are not part of the file name. Searches and substitutes apply to file names only. If you want to view the entire text as text, write it to a file, or to another session.

The dno (directory names only) suppresses the supplementary information about file type, name, time, etc. This is useful when the directory is on a remote file server, and you don't want to issue a stat() call on every file. The names of the files are sufficient. The various ls commands still work, along with g to go to that file, even if that file is a directory.

Files are sorted alphabetically, according to your locale. Use the command sort+a for the standard alphabetical sort, and sort-a for a reverse alphabetical sort. sort+t sorts by modification time, from oldest to newest, and sort-t reverses this, with the newest files at the top. sort+s and sort-s sort by file size.

With dno enabled, sorting by size or time won't work. The listing reverts back to alphabetical.


## Upper/Lower Case
The `lc' command converts a line to lower case, and `uc' converts it to upper case. Perl users will recognize these directives. As an extension, `mc' converts to mixed case, capitalizing the first letter of each word, and the d in mcdonald.

This is especially useful in a directory scan. If directory write mode is enabled, type ,lc to convert all the file names to lower case. It's that simple.

If you want to uppercase a particular word, type s/word/uc/. This converts the word to upper case. All the other substitution suffixes apply. To change foo, Foo, FOo, and FOO to FOO, everywhere, type ,s/\bfoo\b/uc/ig.


## Break Line
The `bl' command breaks the current line into sentences and phrases, each no more than 80 characters long. You can change this default with the fll (format line length) command. Some terminals are more than 80 characters wide. Use ffl 80+ to allow a little overflow, so the next line isn't just one or two words.

bl compresses white space and strips white space from the end of the line. If the line contains return characters, these are turned into line separators - places where the line will definitely be cut. The only white space that is preserved is the tabs or spaces at the beginning of the line, or after each return character. This is a modest attempt to keep indented text indented, if that makes any sense. Once bl is issued, physical lines will contain sentences or phrases, as delimited by punctuation, or by the newline/return characters embedded in the original text, or by the format line length. A long line that has no spaces cannot be cut, and remains long.

If one of the original lines, delimited by newline or return, is long, i.e. more than 120 characters, it is assumed to be a self-contained paragraph, and a blank line is added before and after. Thus a disassembled paragraph containing 20 sentences does not simply flow into the next disassembled paragraph containing 18 more sentences. An empty line separates the two paragraphs. This is only applicable if bl is applied to a range of lines, or the entire document, as might occur when making an outside document readable.

Don't apply the bl command to a preformatted section, such as a table or ascii art. If you're not sure what to expect, i.e. you didn't write the file, scan through it first, and apply bl to the range of lines that actually represents text.

You might be tempted to use bl to make Word documents readable, but use catdoc instead; it does a better job. This is a must-have program for people who want a command line environment.

This function is also used to format html text into sentences and phrases, as part of the browse process, producing lines no longer than 80 columns, or 80 utf8 characters. Again, the fll command changes the format line length. Each character counts as one column, so wide characters, e.g. a line with several emojis, might cause an overflow on your terminal. Try fll=78 to give yourself some breathing room.


## Race Conditions
Suppose you are writing a file, and edbrowse truncates the existing file, then the computer crashes before edbrowse can write the new data. When you bring your computer back to life, your file is empty, zero bytes, and all your work is lost. This is a narrow window to be sure; the computer has to fail at precisely the wrong millisecond. To guard against this improbable calamity, some editors write your data to a temp file, remove the true file, and move the temp file over to the true file. This way your data cannot be lost. Either the new or the old file will survive.

Then links came on the scene, first hard links, and then symbolic links. Authors of ed and other editors had to scramble. You can't remove a link, write to temp, and move the temp file over to the link. It isn't a link any more, it's a regular file, and your filesystem is not what it used to be. For one thing, the true file, pointed to by the (symbolic) link, has not been changed at all. This is not what you want! So people rewrote their editors to disable this feature if the named file is a link to some other file. They had to revert back to the old truncate and write paradigm, and hope that nothing bad happens in between. And you know what, it never does. The window is just too small. With this in mind, edbrowse doesn't mess with temp files at all. It truncates the file and writes out the data, hoping nothing will go wrong during the critical millisecond.

Another race condition is more subtle. Suppose you are editing a file and your friend, or a system program, edits the same file. Your file has actually been changed out from under you while you held it in memory. When you go to write your changes, they will clobber any changes made by your friend, or the system utility. Most text editors guard against this by watching the timestamp. When you first edit the file foo, an editor might remember the timestamp on foo. then, when you are ready to write your changes, it checks the timestamp, and if foo has been updated in the interim it issues a warning message. "File has been updated by someone else - do you really want to write?" This is a good feature, but edbrowse doesn't have it, simply because I haven't gotten round to writing it. This feature is not in high demand.

[⬆️](#top)
<br><br><br><br>

# Chapter 4 Web Browser
## Accessing A URL
Instead of invoking ```e filename```, you can invoke ```e http://this.that.com/file.html```, and the editor will retrieve the named file using the http protocol. The source (i.e. raw html) is made available for editing. You can modify it or save it on your local machine. Because the text was retrieve from another machine, it cannot be written back to that machine, hence the ```w``` command will not work. You must specify a local file ```w myfile.html```, or another editing session ```w3```.

Many common protocols are supported. You can fetch a file from an ftp server via `e ftp://this.that.com/file'. edbrowse always gives you the option to download, since ftp was originally developed for that purpose, and the file may be too large for memory or for edbrowse to handle. You can use the current file name, enter a new file name, enter space to read it into memory, or enter x to abort. These are the options whenever edbrowse offers to download a file. If you have pulled the file into memory, you can edit it, then write it back to the server, affecting an ftp upload, assuming you have permission to upload onto that server. It has the same look and feel as editing a local file on your computer. This also works with scp, although paths are absolute, rather than relative to your home directory, as is the case with ftp. ftps, sftp, and tftp are also supported. Of course, edbrowse is primarily used as a browser, so let's return to http and https.

Note that the initial fetch via the e command is not browsing, we are simply retrieving text from another machine and viewing it locally. The text need not be html, it could be (for instance) a plain ascii document. Many people put various types of files, even executables, on their websites for retrieval. You wouldn't want to edit a binary file, but you can still use this editor to retrieve the file and save it locally, thus implementing an http download.

While inside the editor, you can type ```e URL``` to push the current buffer and retrieve text from a remote machine. Or you can type ```r URL``` to retrieve remote text and add it to the current buffer. There is no ```w URL``` command, because the http protocol does not allow you to write html source back to a remote machine. However, you can write to an ftp url, assuming you have permission to upload onto that server.

As a convenience, any filename with two or more embedded dots and a standard suffix (such as .com or .net) is treated as a URL. You can usually omit the http:// prefix. Try invoking `e www.space.com', as an example. But again, you are looking at html source, which probably isn't what you want. Browsing will be discussed later.

Whenever you retrieve data from a URL, the editor, directed by the http protocol, might change the filename out from under you. This is because the resource has moved and the original computer was kind enough to give you the new address. If debugging is set to 2 or higher, you might see a series of three or four different URLs as the editor is redirected across the Internet. Finally it retrieves your document, and the current file name holds the correct and latest URL. You might want to update your bookmark file accordingly. Then again, you might not. Sometimes the initial url is the "public" location of the web page, and subsequent redirections occur inside the company. In this case you'll want to retain the public url, which will always work, even if the company relocates its web server. Use your best judgment.

When fetching by https, or imaps or pop3s or ftps or any of those protocols that end in s, a secure socket layer (ssl) is used to encrypt the data. edbrowse can use any of several ssl engines to perform the encryption and decryption. The most common engines are openssl and gnutls. This is at the whim of curl, a library that edbrowse uses to communicate over the internet. In other words, edbrowse does not select the ssl engine. For the most part, it doesn't matter. However, once in a while, one ssl engine might encounter a problem, where another would have no trouble. Thus edbrowse may work fine on a given website, on one machine, but not on another. It takes a bit of detective work to track down the problem - even to know which engine you are using.

One problem that pops up occasionally is: "dh key too short". This is from openssl, and can be caused by a low security setting in /etc/ssl/openssl.cnf. You could update that file, but if you don't have permission to do so, edbrowse responds to the environment variable EBCIPHERS. Set this to the list of cifers that you want the ssl engine to use. This string is opaque to edbrowse, and to curl; it is simply passed on to ssl. However, there is a shortcut. EBCIPHERS=1 becomes DEFAULT@SECLEVEL=1, which is what openssl needs to generate the larger keys, to solve the "short key" problem. But don't set this variable on another machine, because it completely derails the other ssl engines. They may need a different setting for EBCIPHERS, or more likely, they will run just fine out of the box.

We may add other shortcuts, EBCIPHERS=2 etc, as we discover other configuration issues in other ssl engines.


## Browse Mode
If the editor contains html text, from any source, even html that you wrote yourself, you can type `b' to activate browse mode. The command will be rejected only if the buffer is lacking in common html tags, or the editor is already in browse mode. You can force its hand by adding <html> at the top, or any other tag we recognize - it will always try to convert such a file. Now the transformed text is readable, without any visible html tags. In other words, <p> has been turned into a paragraph break, \<ol> has become an ordered list, and so on. The filename is also changed; a .browse suffix has been appended. If you write the transformed data, deliberately or accidentally, the reformatted text will be saved in a new file, whatever.html.browse, without disturbing the original html. This protects you if you are developing your own web pages.

Type `ub' to undo the browse conversion. This is the unbrowse command. It takes you back to the raw html text under its original filename.

If you try to quit, and the editor says "expecting `w'", remember that you should be back in raw html before you issue the write command. You could write the browsed text into file.browse, and that will satisfy the "write" criteria, but this isn't really what you want.

As an exercise, invoke `e www.edbrowse.org', and use the `b' and `ub' commands to switch between the raw html and the browsable text.

The browse reformatting is relatively simple. Most tags are discarded, except those related to headers, paragraphs, and lists. Subsections and list items are not indented. The visual effect is not important, and sometimes the extra spaces get in the way.

Because the physical line is the unit of thought, i.e. the atomic construct that is modified or moved or copied, lines are cut at approximately 80 characters, give or take a few, usually at a sentence or phrase boundary. Thus reading line by line often reveals a sequence of sentences, or at least self-contained phrases within a larger sentence. If you read this manual raw, without doing the browse on the file, you'll see what I mean.

The layout of a preformatted section, ```<pre>```, is honored, although sequences of blank lines are compressed down to one blank line, and whitespace at the end of lines is stripped. This preserves the structure of street addresses, code fragments, poems, and other preformatted blocks.

Note that the browsable text is readonly. After all, it's not the "source" -- why should you edit it? There are ways to enter and edit the input fields of an on-line form, but that will be discussed later. For now, you can think of the text as readonly. Issue a copy or insert or substitute command, and you'll get an error.

If you want to edit the text as pure text, enter the `et' command (edit as text). You will not be able to return to the html that produced this page, nor can you follow a hyperlink or submit a fill-out form. The browsable text has become plain text, with no Internet semantics.

The command `b file.html' is shorthand for `e file.html', followed by `b'. Remember that the ub command reverses the browse conversion, and reproduces the original html, as though you had entered `e file.html' alone.

If a url is opened from the command line, as in `edbrowse www.google.com', it is automatically browsed. Type `ub' to revert back to the raw html.


## HTML Tables
Tables are formatted like an ascii unload from a spreadsheet or sql database. Pipes separate the fields on each row. There is no whitespace around the pipes, and the fields of a given row probably won't line up with the fields below. It isn't pretty, but you can't really trace down a column when using a line editor such as this in any case. Better to write the table to a local file and use cut, sort, join, etc. Here is a sample table.
```
part number|quantity|price
2635|2|$34.80
1398|1|$67.50
8118|5|$125.00
```
Empty fields at the end of a row are dropped. These are almost always images -- sometimes an entire row of images -- sometimes an entire table of images. Tables are used for presentation, more often than they are used for data. For instance, a table with two rows, and two cells in each row, can be used to partition the screen into four quadrants, wherein images or text can be placed in each quadrant, and updated insitu. It would be awkward for edbrowse to insert pipes here, as the cells do not form a spreadsheet of data. Html tables can be ambiguous, which causes many headaches for edbrowse. We do our best to determine whether a table contains data, e.g. looking for a caption, or column headings, or a specific head section within the table. Data tables are sometimes treated differently from presentation tables.

The shc (show columns) command prints the column headings, if they can be determined. In this example you would get:
```
1 part number
2 quantity
3 price
```
The ur command unfolds a row, presenting it one line per cell. This is useful when a row is long, and creates a very long line, or wraps in unpredictable ways. Apply this command to the second line of the previous table and get this.
```
row 2
part number: 1398
quantity: 1
price: $67.50
```
This is a toggle command, i.e. ur on an unfolded row puts it back on one line, pipe separated. As with other toggle commands, ur+ unfolds the row, or leaves it unfolded, and ur- puts it back on one line.

You can apply this command to a range, 17,29ur, but don't apply it to an entire web page, since html tables are often used for screen layout, rather than an actual table. The result could be confusing. Make sure ur is only applied to rows of an actual table, presenting traditional rows and columns of data.

Presentation tables will often merge cells together, horizontally, using the colspan directive, or vertically, using the rowspan directive. Imagine a wide image running all the way across the screen. This is housed in the first row of a table, with colspan=3. In other words, the image covers three cells. Below it, the second row has three cells, housing three separate sections of the website. This is how web developers set up side panels of controls, etc. If left to its own devices, edbrowse displays this as
```
[image]
Section 1
Section 2
Section 3 That is the simplest possible presentation for a line-oriented program. We don't want to change a thing.
```
However, colspan can be confusing in a data table. Fortunately, colspan is rarely used in a spreadsheet, so you might run edbrowse for ten years and never run into it. In case you do, here is an example.
```
Name|Birthdate|Deathdate|Gender
```
this is a simple spreadsheet with four columns. The web developer wants to call attention to anyone who is still-born, that is, the birthdate and deathdate are the same. He can do that by setting colspan=2 on the second cell. Thus the second cell actually covers the second and third cells on the screen. The date appears in the middle of this longer cell, straddling birthdate and deathdate. It stands out, visually, especially if cells are bordered - but it is confusing under edbrowse.
```
Name|Birthdate|Deathdate|Gender
Sally|01/27/1977|F
```
It looks like F is Sally's date of death - after all, F is in the third column. Actually F stands for female. She died at birth, but that isn't clear from this inline format.

For data tables only, edbrowse uses a right arrow and a number to indicate a colspan. This tells you that the date covers both birthdate and deathdate.
```
Name|Birthdate|Deathdate|Gender
Sally|01/27/1977 →2|F
```
Edbrowse honors colspan when it unfolds the row, and assigns values to the correct headings.
```
row 1
Name: Sally
Birthdate ⇔ Deathdate: 01/27/1977
Gender: F
```
This looks different, inline and unfolded, when Sally is alive.
```
Name|Birthdate|Deathdate|Gender
Sally|01/27/1977||F

Name: Sally
Birthdate: 01/27/1977
Deathdate:
Gender: F
```
Cells can also merge vertically, often for layout purposes. Imagine a tall picture on the left side of the screen, and three paragraphs on the right. The first cell in the first row of the table has rowspan=3, and extends down for three rows. The next cell of the first row contains the first paragraph. The second row contains just one cell, housing the second paragraph, and The third row contains just one cell, housing the third paragraph. Edbrowse displays the picture as [image], or a description of the image if one is provided, and then the three paragraphs in sequence. This is ideal, and should not be changed.

However, rarely, rowspan is used in a data table. Consider this example. The webmaster has decided to write one cell, with Stephen King, and a link to his biography. This cell extends down through five rows, for the five books in the table. That's easier than typing in his information five times over.
```
Author|book
{Stephen King} ↓5|The Stand
Stephen King|The Shining
Stephen King|It
Stephen King|Under the Dome
Stephen King|Nightshift
```
Because it is a data table, edbrowse indicates the rowspan with ↓5, and then replicates the data in the subsequent rows. Only the text is copied; the html tags are not. The first row, with the original html, has a link to a biography on Stephen King; subsequent rows do not. Once again, values are assigned to their correct column headings when rows are unfolded.
```
row 1
Author: {Stephen King}
Book: The Stand
row 2
Author: Stephen King
Book: The Shining
```
We realize, as developers and as blind users, that these display conventions are imperfect. Turning a table into a stream of lines, while preserving the underlying semantics, is quite a challenge. We feel the edbrowse conventions are a good compromise, supporting the various html tables that exist in the wild. You will see these concepts again, including unfolded rows, when accessing an sql database. Of course, there are no colspan or rowspan issues in an sql table. If there are rowspan considerations, then your database is probably not in normal form.


## Technical, Math
Most people never read technical web pages, but if you do...

A subscript, as indicated by html tags, is enclosed in brackets. Thus x<sub>n</sub> becomes x[n]. (sub should render the subscript properly in your css file - lower and in a smaller font.) This transformation is not done if the subscript is a one or two digit number. Thus x subscript 1 is rendered x1, just like your professor would say it. This is not ambiguous, as you might first think; only programmers use x1 as a variable name, not mathematicians. If you see x1 in a formula, it means x subscript 1. Even 17a3b3 is not ambiguous; it is a translation of 17 times a[3] times b[3].

Superscripts, as indicated by \<sup>, are enclosed in parentheses with a preceding arrow. The parentheses are omitted if the superscript is a number. Thus x cubed looks like x^3, while x to the n-1 power looks like x^(n-1). Again, your css file should define sup, but even if it doesn't, most browsers will do the right thing, putting the text above and in a smaller font.

The sup and sub tags are honored in other browsers and screen readers, so it is best to use these tags, rather than spans with css that places the text visually above or below the line. The sup and sub tags preserve the semantics of the relationship, so that edbrowse, and other browsers, can read the text in a helpful manner.

Edbrowse supports the translation of the &word; constructs in html, such as &lt; for the less than sign, along with &#code: or &#xcode; for direct inclusion of unicodes in html. The Greek letter theta can be encoded as &theta; or &#952;, or &#x3b8;. In each case it is translated into the utf8 sequence for theta. Your screen reader should be able to render this as the word theta, perhaps under the direction of a configuration file. Such translations are left to the adapter; edbrowse merely turns html into the proper utf8 sequences.

These translations are designed to work with the pages of the Math Reference Project, an archive of advanced mathematics that attempts to be both sighted and blind friendly at the same time.


## Title, Description, Keywords
While in browse mode, the commands ft, fa, fd, fg, and fk produce the title, author, description, generator, and keywords of the current web file respectively. These are normally not visible to the user. The title describes the web page in 80 characters or less. The description is a more complete explanation, which is displayed by a search engine such as yahoo or altavista. The user reads the description via the search engine and decides whether to read that web page. The author is the name of the author of the page. The generator is the name and version of the software that generated the page. Finally, the keywords are used by search engines to facilitate keyword searches. Like the rest of the browsable text, these five attributes are readonly. If it is your web page, you can modify them by returning to the raw html. Web designers should pay close attention to the description and the keywords, else your pages might not rank high in the standard search engines.

The fu command prints the file's url. This may be encoded, with a lot of percent signs. It does not change, even if you change the file name. This is the same string that is put into a bookmark if you issue the A command on a line without any links. See Web and Email Addresses below.


## The Refresh Command
Type `rf' to refresh the current file. This rereads the file or url into the current buffer. It does not push a new editing session onto the stack. This is analogous to the refresh button on any other browser.

If a web page is updated every minute, e.g. with the latest stock prices for your favorite companies, you can type rf to fetch the latest copy of this web page. This assumes the intervening Internet servers are not caching the web page and handing you the same out-of-date copy over and over again.

On your local machine, you can use this feature to read the latest version of a dynamic file, such as a log file. Or you can reread a directory, to incorporate any new files that have been placed in that directory. For example, you might use the shell escape to execute `cat x y >z', yet z will not appear in your directory scan until you type rf.

rf does not lose the history below. Say you are going up and down in a chain of directories. There's a file abc you want to move up. .m+1 does the trick. Up it goes, and when you go back up it's there but not in position. rf resorts the files. Because the file is closed and reopened, it use to lop off everything below in the editing history. In the same way refreshing a web page would lose anything below. I fixed this, so that the files below are retained if the iaction is designated nostack - and refresh is always nostack. In fact you can do any replacement. Perhaps you're in file foo and you want bar instead. ^ e bar does the trick. Since edbrowse isn't pushing onto the stack, you won't lose any files below, and hist will show you the same chain of buffers - except for bar instead of foo.

It can be somewhat misleading if you replace one web page with another. The page below is still there, but you didn't get there by activating a hyperlink on the current page; you got there by activating a hyperlink on some other page.


## Hyperlinks
A link to another web page is enclosed in braces, like this:
```
{Recent reports} suggest a connection between health and intestinal bacteria.
```
Behind the scenes, "recent reports" is linked to http://www.sciam.com/article.cfm?id=jeremy-nicholsons-gut-instincts, but you don't see that unless you activate the link or view the raw html.

Of course the browsable text might also contain words inside braces, especially if the web page is technical in nature. There is some ambiguity, but it is often clear from context. {More information} is probably a link, whereas ${HOME}/.profile is probably not.

Some web pages present a series of icons that are actually links to other pages. You click on a picture, rather than a phrase, to go somewhere else. These icons are suppose to be intuitive. Sometimes they are - sometimes they're not. Sometimes the web designer is kind enough to supply a text phrase that roughly describes the image. In this case the phrase is used as the link. If there is no alternate phrase, the filename of the hyperlink reference is used. This name can be surprisingly helpful, or it can be utterly useless, as in "index.html". If this name cannot be determined, the generic link {image} is used. In this case you will have to go to the web page to find out what it contains.

Note, an image that is not part of a hyperlink has its alt text enclosed in brackets, as in [girl with a long red braid]. Images with no alt text are omitted, unless you have enabled attached images via attimg+.

To follow a link, enter the ```g``` (go) command. Yes, ```g``` also initiates a global substitute command, but only when it is followed by a regular expression. By itself, g follows the link on the current line, g2 follows the second link on the current line, and 4g follows the link on line 4. g$ activates the last link on the line. If a link spreads across multiple lines, you must be on the first of these lines, the line containing the left brace. Use g? to print the url - where you will go if you type g. g- goes to the link, but does not browse, or render (e.g. a pdf file), or play (e.g. an mp3 file). This bypasses your plugins and retrieves the raw file.

The g command can also act on a link that is written in raw text, as long as it looks like a valid url. If your friend sends you an interesting url via email, and you save it to a text file, you can go to that link, even though the file is not html and you've never issued a browse command.

g also goes to a local file, if the line of text is exactly the name of that file. This is like directory mode, where you edit a directory and go to files in that directory, but there are important differences. It is still a text file. Deleting the line does not delete the file, substituting in the line does not rename the file, and the path is not adjusted relative to the current filename. If your text file contains filenames that you want to go to, you have to be in the directory that contains those files, (unless they are absolute pathnames). This aspect of g can be convenient at times, but please don't confuse it with directory mode.


## Internal Links
Although most links lead to other web pages, some links point to other sections within the current web page. Again, you might be able to tell by context. Links in the table of contents are usually shortcuts to chapters in the current document. The same holds for links that look like: see {Appendix I}, or, see the section on {Hardware Configuration}.

The g command follows an internal link or an external link. Either way you find yourself in a different place. However, if the link is internal, you are still browsing the same file. In fact, the only thing that has changed is the current line number. The new line is displayed, and should correspond to the link you activated. Often the words are the same. Activate {Appendix I}, and you'll probably see the section heading "Appendix I". Enter z10 to read the first few lines of the appendix.


## The Back Key
If you edit a new file via the `e', `b', or `g' command, and you already have text in the buffer, that text is bundled up and pushed onto a stack. You can pop the stack by issuing the `^' command. This is suppose to be intuitive -- the up arrow points to the previous page that rolled off your screen.

This feature seems rather silly if you're just editing files, but it makes sense when surfing the net. Often we descend through two or three links, only to find ourselves at a dead end. "I didn't want to go here." Hit the back key again and again, until you reach familiar territory. You can now proceed in a new direction. The command ^3 or ^^^ backs up through three pages. Don't use this iterative feature unless you know exactly how many times you need to back up.

Note that the entire state of an editing session is saved and reproduced, including the file name, the last search/replace strings for substitutions, the hyperlinks and forms, the compiled Javascript, everything!

The stack should not be confused with parallel edits, as described in an earlier section. In fact each editing session, e1 e2 e3 …, has its own stack. Parallel sessions are appropriate when you need to move back and forth between two files, or cut & paste between them. However, one session, with its internal stack, is usually sufficient to surf the net.

If a browse command fails completely, giving you a rather uninteresting empty buffer, the stack is popped automatically, taking you back to the previous web page. Now you can retry the link by typing `g' again, or follow a different link on the page. Note that a browse command can fail, and still give you text explaining why it failed, if the remote server is well-designed. In this case you may see the error message "file not found", yet you will be viewing a new web page, which explains the problem. After you've read the explanation, follow its directions, or type ^ to back up and try again.

If you are presented with a number, even 0, the stack has been pushed, and you are in a new file or url. The number is the size of the new file. Use the ^ command to get back. If there is no number, merely an error message, then edbrowse did not create a new buffer. It probably didn't get that far. Typing . will produce the same line you saw before.

Use the nostack prefix to replace the current web page, rather than pushing it onto the stack. For example, `nostack b www.ibm.com' replaces your current web page with ibm.com, and ^ will not take you back to where you were, because that page is gone. `^ b www.ibm.com' does the same thing. The ^ prefix indicates we already popped the stack, and now you can't go back. This feature saves resources, if you know you don't need that web page any more.

Following an internal link to another section in the current document does not push anything onto the stack. In other words, ^ will not take you back to where you were. In fact, it will take you up to the previous web page, which is not what you want. Instead, a separate per-page history is accessible with the & key. You can use &3 or &&&, similar to ^, but only do so when you know how far back you want to go. An alternative, if you often want to go back to the table of contents, is to mark the current position with kr, then return to it via the label 'r. Even with this label set, & is often more convenient, since it takes you back to the last heading you jumped on, whence you can proceed down the table of contents to the next section that interests you.


## The M Command
If you want to read and/or interact with several web pages in parallel, pages that would normally stack up, you can move each one to another session using the capital M command. The tags and links are transferred along with the rendered text. Once the web page has moved to another session, edbrowse issues the ^ command for you. Now you are back to the previous page.

It is generally unsafe to make a copy of a running web page, with all its Javascript objects etc, so the M command moves the page out of the way, and takes you back to the previous page. Note, this command works just as well with files.

Suppose a web page presents
```
{planes}
{trains}
{automobiles}
```
If you are curious about all three topics, issue these commands in this order.
```
1g
M2
2g
M3
3g
M4
```
Now sessions 2 3 and 4 are the subpages about plains trains and automobiles respectively. You can fill out forms or follow hyperlinks in any of them, or stay in session 1 and do something else.

Edbrowse clobbers the destination session, unless there are edits that have not been written out to a file. You can issue the M command without a destination if you are not sure which sessions are available. Edbrowse will pick an empty session for you and print something like "moved to session 15".

M0 is the same as M, but does not print the new session at debug level 0. Just as M3 does not print session 3 at debug level 0.


## Browsing History
Edbrowse maintains a stack of buffers for each session. Whenever you edit a new file, or go to a hyperlink on a web page, the existing buffer is pushed onto the stack and a new buffer is allocated, to hold the new file or web page. Type hist to see a history of your files and/or web pages. This is similar to a browser history, however, this is transient, reflecting only the web pages you have visited since you launched edbrowse. Edbrowse does not maintain a permanent file of the sites you have visited. With this in mind, it is important to maintain a bookmark file with your favorites, so you can call up those websites quickly.

The hist command prints the buffers on the stack, starting with the first file you accessed, and proceding down to the last. It prints the title if it is a web page, or the file name, or nothing if there is no file name. A star indicates the buffer that you are currently viewing. This is usually the last buffer on the stack.
```
hist
+2: first file of this session
+1: intermediate file
*0: file I just called up
```
The up and down commands move up and down in the history, i.e. up and down in this list. This is similar to gdb, where up and down traverse the stack frames.

up3 is shorthand for up 3 times. up/foo goes up to a buffer whose file name or title contains the substring foo. You can append these modifiers to down.

Note that up and down do not produce errors if the buffer is not written. You can move to another edbrowse session with impunity, and to be consistent, you can also move up or down in the stack. However, there is a difference. If you are in session 1 and move to session 2, then type q1, edbrowse says session 1 has not been written. But if you go up to an earlier buffer and quit, edbrowse will let you quit without writing, because the current bufffer does not have the change flag set. Edbrowse does not look all the way up and down the stack to see if there is an unwritten buffer. In the same way, you can go up, then switch to session 2, then q1, and edbrowse will happily quit session 1. So be careful when leaving an unwritten buffer by going up or down.

If you follow a hyperlink, then go up, then follow another hyperlink, the page fetched by the first hyperlink is freed. Edbrowse retains a line of fetched pages, not a tree. This is how other browsers behave. If you want to keep both pages, pointed to by the two hyperlinks, follow the first link, use the M command (described in the previous section), then go to the second link.

Do not confuse up with ^. ^ discards the page you are on and goes back to the previous page. You can't go down after that. However, up simply moves up the stack; the page you were on is still there, and accessible by down.


## Background Music
If you are trying to listen to a speech synthesizer, the last thing you need is background music. Instead of playing the song, I make it available to you through a hyperlink.
```
{Background Music}
```
This always appears at or near the top of the page. Click on this link to hear the music. It should play automatically if you have the proper plugins configured. If there is no plugin for that particular file type, or if plugins are disabled, then edbrowse will load the audio file into the current buffer. You can download it to a file, or play it in some other fashion. Try the play buffer `pb' command. Normally pb uses the name of the file to infer the audio format. If the filename ends in .wav, it's a wave file, and so on. Failing this, edbrowse tries to infer the file type from the Content-Type attribute in the http headers. If the filename is not particularly helpful, and the http headers do not provide a known content type, and you know the audio format, you can specify it by typing pb.wav for a wave file, pb.mp3 for an mp3 file, and so on. The config file (described below) includes mime types and plugins, which tell edbrowse how to play various audio files. These must be set up, or the pb command won't work. It will say something like, "I don't know how to process an mp3 file". This is consistent with other browsers, which use plugins to play multimedia files that are retrieved from the Internet.


## Headings
Some web pages are written with headings, from level 1 to level 6. These headings are indicated by h1 through h6 respectively. Just as braces indicate a hyperlink, h2 indicates a second level heading. Thus h2 is not part of the text; it is a markup character. You can jump to different headings using the familiar ed commands: /h2 for the next level 2 heading, ?h1 for the previous level 1 heading, and /h\d for the next heading at any level.


## Input Fields
The input fields of an on-line form are indicated by angle brackets. For example, a search engine might present the following form.
```
Keywords: <>
Advanced parsing: <->
Language: <en>
Search now: <GO>
Clear form: <RESET>
```
The first line in this sample form is a simple text field, which is initially empty. You supply the keywords to search for. Entering and editing input fields is discussed later.

The second line is a checkbox. This field tells the search engine to use advanced boolean features, such as this keyword and that, or this, but not that, etc. The feature is inactive, indicated by -. (Most people don't know how to use advanced search anyways.) A + means the checkbox is on.

The third line determines the language of the keywords, English by default. This isn't a free text field, you can't just type in anything you want. It is a dropdown list of languages. I'll describe how to view the options later.

The fourth line is the submit button, which sends the form to the search engine and retrieves the results. This field cannot be edited; it is merely a button to push.

The fifth line is also a button to push. It clears all the data you have entered, so you can start over. Default values will be restored. Thus the third line goes back to <en>, rather than <>.


## Data Entry
Filling out a form is relatively easy, once you are familiar with the overloaded `i' command. Yes, i by itself means insert text, but in browse mode, i refers to the input fields.

If there is only one input field on the current line, i? displays information about that input field. If the line contains multiple input fields, you will need to use a number, as in i3? for the third field. The type of input field is displayed, then its size, then the field name. If the input field is drawn from a set of options, the type is select, and the option list is displayed below, with menu numbers prepended. When you want to select an option, you can either type in a substring that determines that option uniquely, such as mich for Michigan, or you can type in its menu number. A stop sign 🛑 means that option is disabled, and you won't be able to choose that option. Recall the sample form in the previous section. If you type i? at the third field, you might see the following.
```
select[7] language
1: english
2: french
3: german
4: italian
5: spanish
```
If a select list contains hundreds of options, type i?string to see only those options that contain the specified string. Type I?mi in a state field and get Michigan, Mississippi, Missouri, and Minnesota. Then you can select the option you want by name or by number.

If the type is suggested select, then you don't have to choose one of these options; you can type in something else. A leading ` indicates this. Enter `japanese, instead of one of the given languages.

Now let's do some data entry. Type i=xyz to place xyz in the input field. Type i3=xyz to put information into the third input field on the current line. If you get an error, it is probably because the field has a fixed set of options, and you didn't pick one of those options. You can either type in one of the options or its menu number. You can also type in a fragment of the option you want, and edbrowse will fill in the rest. This is done whenever one and only one option contains a copy (case insensitive) of the string you entered. Thus you could enter tali above and get Italian, as that is the only language with those four letters. This is useful when you are entering your address, and they ask for the state. Type in a few letters of your state name, enough to be unique, and glom onto the correct option in the list. Note the paradigm here: in a command line program, you don't want to wade through a menu unless you absolutely have to.

There is some ambiguity when the option is itself a number. In this case edbrowse performs three matches. If you type in the number exactly as it appears, that option is selected. If the number you entered is not a perfect match for one of the options, it is treated as a menu number. If it is not a valid menu number (e.g. out of range), edbrowse performs a partial match on the options, looking for those digits as a substring. This may seem confusing, but it is usually what you want.

If multiple options are allowed, use a comma to separate them. i=span,tial will give you spanish, italian. s/$/,3 adds german to the list.

What if one of the options contains a comma? Use selsep=| to change the separator to |. Select lines will be updated in all your buffers, even those in the background; this is a global change. You may want to set your preferred separator in your init function. Characters like | or ` or ^ are unlikely to appear in options.

If you would like your password to not be displayed on screen when you type it, you can use ipass (or ipass2 if the password is the second field) to get a no-echo prompt for your password. When printing anything you entered with ipass, or if the input field type is password, you will get stars back, consistent with other browsers. However, if you submit a form, and the debug level is 3 or higher, you will see the password in plain text as edbrowse prints the fields it is sending to the server. Users rarely run in debug mode, so this is not an issue.

You can use i<7 to pull the contents of session 7 into the current input field. Session 7 must have one line of text only. Use i<7@39 to read in line 39, or i<7@'c to read in the line at label c. + - . and $ are also allowed. Similarly, i<filename reads the contents of the file into the current input field. Only the first line of text is read. The filename is expanded in the usual way. This includes wildcard expansion, as long as the expansion leads to one file. Put enough characters around the * to designate a single file.

Text areas are often used to capture a paragraph, i.e. a complex thought, but some websites expect you to compose your thought in a one-line input field. In that case, switch to another session where you can use the power of the editor. Compose your thought, type ,J to put it all on one line, switch back, and type i<7 to pull it into the input field. Alternatively, type etmp to make a temp area on the current stack. Compose your message as before, go up, type i<-1, then down and ^ to get rid of the temp buffer.

Suppose you are entering your credit card number, all 16 digits, into a free text field. If you've made a typo, you don't really want to enter the entire string again. No problem -- use the substitute command. You can write this as i/x/y/ or s/x/y/ -- as you prefer. Remember, you may need to specify a field, as in s3/x/y/. The usual substitution syntax is honored. Don't overgeneralize the g suffix. s3/x/y/g changes every x to y in the third input field, but does not affect the other fields on the current line.

If the submit button is the third field on the current line, you can press it via i3*. However, i* is sufficient when there is only one button on the line. Similarly, you can establish a text field by entering i=kangaroo, rather than i1=kangaroo, if the second field on the current line is a submit button. You only need specify a field number when there are multiple input fields, or multiple buttons, on the current line.


## Text Areas
Some Internet forms allow you to type freely, as in "Please enter your comments here." This is done inside a window within the screen, having a fixed number of rows and columns, although that is usually an artificial constraint. The sighted user can type more lines than the window will hold, and the window scrolls appropriately. Fortunately the blind user can ignore the artificial window and type freely. Still, the i? directive tells you how big the window would be if you were running a visual browser. You might see something like "area[7x40]", which indicates a window 7 rows by 40 columns.

The lynx implementation of the text area is somewhat restricted. This is not surprising, since lynx is not an editor. You can correct small typos on the current line, but you can't actually edit the text you are working on. Once you hit return, that line is done, and you're on to the next line. You can't move lines around or insert lines, nor can you prepare your comments ahead of time and read them into the text area from a file. In edbrowse, the text area is managed from another editing session. This allows you to use the full power of the editor. You can move text, make global substitutions, or read comments in from a prepared file. The editing session is chosen for you, and appears in the input field. Consider the following form.
```
Enter your email address: <>
Enter your comments: <session ?>
```
If you wish to enter any comments, you must allocate the buffer using the ib command. At this point <session ?> changes to <session 2> (or some such). Session 2 was not active when browsing began, but it is now. Type e2 to move to session 2, prepare your comments, then type e1 to return to the input form.

Alternatively, use ib100 to associate session 100 with this input textarea. This can be useful in scripts, whence you know where your buffers are and can populate them with text.

On most web pages, the text area starts out blank, whence session 2 will be empty, but this is not always the case. Be sure to check for pre-existing text before you start typing your thoughts. A particularly arrogant site might preload the text area with: "I love your website because:". Preset text is indicated by <session text> rather than <session ?>.

When you finally submit the form, as discussed in the next section, the text in session 2 will replace the words "session 2" in the input field, and your carefully crafted comments are on their way.

If your comments fit on one line, possibly a long line, you can type i=comments, and skip the ancillary session. At this point the textarea acts like a simple text input field. You can't change your mind; your comments are now an inline string.


## Push The Button
If the third input field on the current line is a reset or submit button, press the button via i3*. The reset button puts the input fields back to their original values, as supplied by the web page when it was first loaded. The submit button sends the form to the remote server and waits for a response. This is similar to following an Internet link, but in this case you are sending some data along with the request. Type "kangaroo" into a search engine and you'll soon be reading a web page about kangaroos. As with any other link, you can use the ^ key to go back. In this case you will return to the on-line form. You can change the data and submit the form again, asking about another animal.

Edbrowse supports the "get" and "post" methods, the most common http protocols, and they seem to work on most sites.

Once you have submitted your form and you are viewing the results, you may notice some strange characters at the end of the filename. If you have retrieved information on kangaroos, the filename might look like: www.search-engine.com?keywords=kangaroo. The text after the question mark is an encoded version of the data you entered into the form. It becomes part of the virtual URL. This only applies to the get method; the post method sends the data through another channel.

Remember that buttons can run Javascript, without being type submit or reset. These are all pressed by the i* command. If more than one button is on the current line, any style of button, then i* is not sufficient; you have to specify which button, as in i3*.


## Hover Text
Some websites cause text to appear when you hover over a link or icon; then it disappears when you move the mouse away. Edbrowse has nothing analogous to a mouse hovering over an icon, so we had to think of something else.

Hover text is usually explanatory, and rarely essential. Since the goal of edbrowse is minimal output, edbrowse does not display this text by default. However, you can turn it on with the showall command. All the hover text appears, all over the page. It might be nice to hover over a particular line, but so far this has proved problematic. It's not clear what if anything you can hover over, and the message might pop up on a different part of the screen, perhaps 20 lines down in the buffer. For now, the approach is to reveal all hover text wherever it appears. If you like, you can save the two buffers, and diff to read the lines that have changed. You probably only need to do this once on a website that you will be visiting again and again. Once you have read the hover explanations you probably won't need to read them in the future, whereupon you can run with showall disabled.

In rare cases, hovering over an icon reveals links or buttons. Because they are active elements, these are shown all the time. You need to know that these links or buttons are available. In other words, edbrowse only hides hover text, not hover links.

Cascading style sheets (css) also injects text into the page, but this tends to be based on element type or class. Put a star in front of every paragraph that has class=footnote. Put a right arrow after every hyperlink with class=external, taking you to another website. Put a green circle in front of every input field with class=required, a required field. These little symbols are primarily visual, and of almost no value to edbrowse users. Once again they are hidden by default. They are not strictly hover text, but these are also revealed by the showall command. As mentioned earlier, the injected characters or emojis are helpful visual reminders of the nodes they adorn, and are rarely vital; however, there are a few websites where the injected text is explanatory, and might be worth reading at least once.

Finally, the showall command shows the sections that are rendered invisible by css or Javascript. These are in double brackets, e.g. [[hello world]]. These might be hidden because they are not relevant to you, or to your current situation. Why show the checkout link if there is nothing in your shopping cart? However, edbrowse Javascript is still a work in progress, and sometimes a bug keeps a section invisible, when it should be shown. Thus you might want to see what you are missing.

The showall command is rarely needed when javascript is turned off. Without Javascript and css, all the hover text and all the invisible sections are shown.


## Colors on the Page
In an accessible world, colors should not be semantically relevant; but sometimes they are. You may have pushed submit on an entry form, and received a message like: “Invalid entry, please review the fields marked in red.” How do you know which fields are red? Enter the colors command to find out. This is a toggle command, so colors+ and colors- will work. Words, sentences, or entire sections will be surrounded by color indicators. In this example, Birthday is in red, because February doesn't have 29 days. The rest of the input form is in black.
```
:black≪First name <John>
Last name <Smith>
:red≪Birthday≫ <02/29/1983>
Submit <send>≫
```
Websites often specify colors using rgb values, which are almost useless to us. Do you really know that #e8180f is red? So edbrowse converts these values to the nearest standard color. These color words are established by css convention, and are necessarily in English. You might be using edbrowse in German, with messages translated accordingly, but a black section is denoted :black, not :schwartz.

The delimiters are nonascii mathematical operators similar to << and >>. I occasionally use higher unicodes, since we are badly overloading the ascii character set. You can configure your adapter to read these higher unicodes any way you like, for example, "color start" and "color end".

Colors come from css, and css doesn't run without Javascript, thus this feature only works with Javascript enabled.


## Web And Email Addresses
The capital A command shows you the web addresses behind the links on the current line, or on a range of lines, as in 4,7A. Each web address will be surrounded by <a> and </a> tags, ready to be pasted into a bookmark file, if that is what you wish. These addresses exist in a new editing session; the previous session has been pushed onto the stack. You can add these to your bookmark file via w+ $bookmarks, assuming you have set the environment variable bookmarks appropriately. They will be appended at the end; you can move them to a more appropriate place in the file later on. Finally, use the ^ key to return to the web page you were viewing. Here is how it might look.
```
< b this.that.com/whatever  # browse a web page
> 16834  # size of the raw html
> 7855  # size of the browsable text
< /kangaroo/i  # looking for kangaroo on the page
> Click here for {more information about kangaroos}, or {send us mail}.
< A  # capture the URLs
> 144  # size of the URLs
< ,p  # let's see them
> <br><a href='http://www.kangaroo-info.com'>
> more information about kangaroos
>  </a>
> send us mail:info@kangaroo.org
< 4d  # don't need the email address
< w+ $bookmarks  # append this url to the bookmark file
> 336
< ^  # back to browsing
> Click here for {more information about kangaroos}, or {send us mail}.
```
I suppose I could interrogate the environment variable $bookmarks myself and append the URL to that file automatically, but as this example shows, you might not want all the links. In fact the email link makes no sense in a bookmark file. Also, you may want to change the description of the link, though in this example the description is reasonable.

Alternatively, you might discard the url and retain the email address, appending it to your address book. Again, you will want to change the generic phrase "send us mail" to a brief string that is meaningful to you, such as kangaroo-mail. This becomes the alias, which you can use to send mail to that recipient. Subsequent sections will describe the use of edbrowse as a mail client.

If A is applied to a single line, and there are no links on that line, or you are not in browse mode, the current filename is used. This is useful when you want to bookmark the current page, rather than some other page pointed to by a link.

If the current page is the result of a form submission, the filename may include your input fields after the question mark. If it does, that's a feature, not a bug. This exact URL, with the data at the end, can be stored as a bookmark and activated again and again, as though you had filled out the form each time. Every week you can call up this virtual URL to see if there is any new information on kangaroos. A more practical example might be a canned query that retrieves the weather for a certain city or the stock prices for the companies in your portfolio. You can also write concise scripts that fill in the virtual form, simply by modifying the information after the question mark. This provides a simple command to retrieve the weather from any major city or the current price of any stock.

Under the A command, the text of the newly created hyperlink is the title of the current page. If there is no title, the text of the link is drawn from the url, which is definitely suboptimal. In that case you might want to change the text of the link. fortunately, most Internet pages have a title.

One last warning about adding links to your bookmark file. Let's say you've issued the A command, and tweaked the description just a bit. Now the link is just write, and you want to save it. You accidentally type `w $bookmarks', forgetting the plus. Instead of appending the link to the end, you have clobbered your entire bookmark file. Years of accumulated links are gone. To avoid this disastrous typo, create a macro to append to your bookmark file. I know, we haven't talked about user defined macros yet, but we will. And when we do, you should write a "bookmark append" macro that looks like this.
```
function+bma {
  w+ $bookmarks
}
```
Now you can type <bma to add a link to your favorites, and you don't have to worry about typos. It's shorter than `w+ $bookmarks' anyway.


## Cookies
Most websites serve cookies, which your browser is expected to retain and pass back during subsequent exchanges. In fact many websites simply won't work without cookie support. Therefore edbrowse always accepts cookies.
Persistent cookies are stored in a file, specified as `jar = file' in .ebrc, and are thus available for subsequent edbrowse sessions. These cookies are used to store long-term information about you, such as your login and password into amazon.com. Hence your cookie file should be mode 0600. In fact it is created mode 0600 if it does not exist.

You probably won't need to view your cookie file, ever, but it is text based, and can be edited directly if you wish. Don't edit it when any web pages are active, or you may run into race conditions.

speaking of race conditions, don't surf the net using separate instances of edbrowse running in different virtual consoles. Instead, run one instance of edbrowse with different web pages in different sessions. Parallel edbrowse programs could each write out the cookie file independently, and the second could conceivably clobber some cookies that were set by the first. It's only a minor nuisance, and you might not even notice. Still, a future version of edbrowse might use one global http server to get around this problem.


## Secure Connections
Edbrowse supports the most common method of encrypting web traffic, HTTP over SSL/TLS, colloquially known as secure http. Websites that support secure http have URLs of the form: https://secure.server.com. Notice the protocol is https:// rather than http://. The extra s stands for "secure". The traffic is encrypted, i.e. mathematically scrambled, and cannot be intercepted by a nefarious third party.

Edbrowse will verify ssl connections, based on a file of certificates provided by the system. This is an antispoofing measure, to make sure a hacker isn't posing as your bank, trying to steal your account numbers and passwords. You can provide your own file of certificates, or point to a different file, using the certfile directive, but this is not recommended. The system file is probably your best bet. In general it's a good idea to verify secure connections, unless it prevents you from getting to a website whose authenticity you accept at face value. In that case you can use the vs command to turn the feature off. This is a toggle command; type vs again to turn the feature on. For another method of disabling verification on a site-by-site basis, see the novs directive in the configuration file section below.

Never send sensitive information, such as social security numbers or credit card numbers, over an insecure channel. Make sure the form is using ssl. How can you tell? i? describes the button as "submit secure". This is similar to the lock icon that Explorer uses to tell you that your connection is secure.

Note that generic buttons, besides the submit button, can also submit your form through Javascript. I don't know if that button is going to submit the form or not, and it could send it through an insecure channel. At some point we have to trust the website that we are on, after verifying the url, that it is indeed the genuine article.

If you have logins on secure servers, such as PayPal.com, you must keep your password absolutely safe. Never send that password over an insecure connection. It becomes as valuable as your credit card numbers. Use a special password for your secure logins, and only for those logins. Use other, expendable passwords when the connection is not secure.

Please don't fall for all those phishing email scams that tell you your login has expired, and would you please log in again using this convenient form. The mail is forged to look legitimate, and the form actually sends your secret password to a thief who then raids your account. A reputable company will never ask you to login through an email form. They will always tell you to go back to the website and log in there.

Internet security is complex, to say the least, and it is beyond the scope of this document. As a general rule, secure http is really quite safe, and you can use it to send sensitive information across the Net. It's probably safer than giving your credit card number to the clerk on the phone, who use to take your order before there was e-commerce. so it's OK to be a little bit paranoid, in fact it's probably a good idea, but don't let that stop you from making your online purchases.


## FTP Retrievals
This browser supports the retrieval of ftp files and directories. You can provide an FTP URL like: ftp://ftp.random.com/tarball.tar.gz and the file will be fetched. It doesn't matter whether you type in the url yourself, or it is a hyperlink on a web page. The file is retrieved, and placed in a new buffer. Type w/ to save it locally, which is what a traditional ftp client would do. Of course the download could fail, in which case you will receive an error message. If it was interrupted due to some Internet glitch, you can always issue the command again and hope for better luck.

By default, edbrowse uses the account name "anonymous" and the password "ftp@example.com" for ftp connections. However, you can override this in the url, and some web pages take advantage of this feature. For example, let's say you want to access the file /opt/foobar on whatever.localdomain. This file isn't readable by anonymous users. You have to log in as a real person. Within edbrowse, you might use the command:
```
e ftp://chris:xxx@whatever.localdomain/opt/foobar
```
The ftp connection will be made as user "Chris", with password "XXX".

Some ftp URLs point at directories, not files. If you visit one of these, and it is located on a Unix-like server, you will receive the listing as an html file with hyperlinks. You can visit the directory members as though you were exploring a website. If the server does not run some flavour of Unix, you will receive the directory listing in plain text.

The ftp mode, i.e. the style of data connection, can be either active or passive. One works well when the client is behind a router, and the other works well when the server is behind a router. You can specify ftp mode active by entering the command `ftpa+', or ftp mode passive by `ftpa-'.


## Gopher Support
Gopher is similar to ftp, providing an easy way to download files from a public site. Edbrowse supports this via the gopher:// protocol. Once again, directory listings are converted into html, so you can activate a hyperlink and proceed to a submenu or download a file.


## Proxy Servers
A proxy server is a web server that sits between your web browser and remote websites. It intercepts your requests for web pages and forwards them to the system that hosts the site you are browsing. Proxy servers are used for a variety of reasons. Here are just a few of them:

Efficiency. The proxy server may be able to store previously-accessed webpages (known as caching). If your connection to the proxy is faster than your connection to the rest of the Internet, then caching ensures that frequently-accessed web pages load quickly.

Policies. Some firewall administrators require their users to use a proxy server.

Anonymity. There are so-called anonymizing proxy servers that hide your IP address from the websites that you browse.

If you wish to use a proxy server for http traffic, simply set the proxy option in your configuration file. Provide the proxy's hostname and port, separated by a colon. For example:
```
proxy = http * proxy.campus.edu:3128
```
All http traffic, for any domain (indicated by *), is routed through proxy.campus.edu on port 3128. Note that proxies often listen on ports other than port 80. Squid is a proxy server that comes bundled with some Linux distributions, and it uses port 3128 by default.

Protocol and domain can be specified, or either can be replaced with a * for any protocol or any domain. A missing domain is treated as a * (all domains), and a missing protocol and domain matches everything. Such an entry should be last in the list of proxies in your config file, since proxies beyond this point have no meaning.

The word DIRECT in the third position is a direct connection, with no proxy server. These are usually placed at the top of the list, to access certain internal domains; then the proxy server is specified for all others.
```
proxy = http|https hr.mycompany.com DIRECT
proxy = http|https|ftp * proxy.mycompany.com
```
As shown in this example, different protocols can be separated by pipes. Beware, placing a * in the protocol field embraces all protocols, including ftp, pop3, and smtp. Mail will attempt to pass through this proxy, just like web traffic.


## Frames
Frames are a mechanism whereby a web page can fetch and display several other web pages on the screen at once. Each subpage is called a frame, and lives in its own space on the screen. Sometimes the frames are top middle and bottom; sometimes they are left middle and right. Edbrowse presents these frames as hyperlinks, and you can expand each in turn using the `exp' command, or expand them all if you wish. Type 1,$exp to expand them all, or equivalently, ,exp. The ctr (contract) command hides the frame and makes it a hyperlink again. Type ,ctr to contract them all. Sometimes you can leave a frame closed if you have been to this website before and you know that information does not interest you. On rare occasions, and I've only seen this once, you must open the top frame, whether you are interested in it or not, because that particular html page sets some cookies that you need to run the website.

Here is a page of frames, and then the same page after the middle frame is expanded.
```
Frame {navigation}
Frame {main}
Frame {bottom}

Frame {navigation}
`--
This is the home page of blah blah blah. Interesting information about blah blah blah. We've got the lowest prices anywhere.
--`
Frame {bottom}
```

[⬆️](#top)
<br><br><br><br>

# Chapter 5 Javascript
## Introduction to Javascript
Javascript is software, embedded in the web page, that runs on your computer. These functions do not run on the web server, they run right on your box. Hence it is sometimes called client side javascript. And javascript can do almost anything. You could, for instance, download a web page that includes a javascript function to compute the digits of pi, right on your computer, although that would be rather silly. Most of the time javascript is used to validate and/or modify forms or create fancy visual effects.
The first version of edbrowse, written in perl, ignored javascript completely, and that was OK for a while, but more and more sites use javascript, and these websites were simply inaccessible. Most of the e-commerce sites fall into this category. If you want to make purchases, or manage your bank account online, you need a javascript enabled browser.

The second version of edbrowse, written in C, and indicated by a version number that starts with 2, included a home grown javascript compiler and engine that I wrote myself. This worked pretty well, for a spare time project, but javascript evolves, like any other language or standard, and I just couldn't keep up.

The third version uses an open source javascript engine, originally Mozilla js, then Duktape, and now, as of version 3.8.0, Quick js. This allows us to leverage, rather than reinvent, some 70,000 lines of code - and somebody else is maintaining that code as javascript evolves.

Edbrowse does not support all the features of client side DOM javascript, and it probably never will. For example, many websites use javascript to change images on the fly as you move your mouse around the screen. This has no meaning in edbrowse. Other websites bring up multiple windows, and let you control the contents of subwindows using icons in a master window. This would be difficult to simulate in a command-line environment, though perhaps not impossible.

Some javascript is implemented, some is not. This is still a work in progress. If you submit a form, or go to a hyperlink, and nothing happens, absolutely nothing, then the web page is probably trying to use javascript features that are not yet implemented. Raise the debug level to 3 or higher and push the button again to see the javascript errors. Then, if you wish, disable javascript with the js command and try again. However, the website may not behave properly or as expected with javascript disabled. See the disclaimer at the top of this users guide.

You can also disable javascript for specific domains. This will be discussed later in the edbrowse config file.

If a page is slow to browse, it may be running a lot of javascript, or it could be fetching files from the Internet. In either case, you can interrupt the process by hitting Control-C. Javascript stops at a breakpoint, if it can, and the page browses with the information it has at hand. This is fine if you're just reading a newspaper article and you don't want to wait for all the advertising to come into place, but you should never do this on an e-commerce site, or a banking site, or a site whose operation is mission critical. If the javascript does not run to completion, we cannot guarantee the proper operation of that website. You might wind up ordering a $37,000 elephant instead of $37 worth of printer supplies.

If you have been hitting Control-C for 45 seconds with no reaction, edbrowse forcibly interrupts the running javascript and issues this message.

No reaction for 45 seconds, operations aborted, results are unpredictable!

This is drastic, but some websites fall into an infinite loop, and this is better than being locked out of edbrowse forever. Javascript is disabled at this point. You can turn it back on - at your own risk. The javascript engine was interrupted in mid operation, and its behavior is unpredictable if it starts executing somewhere else. However, I have tried it a few times and it seems to work.


## Validating Forms
When a web page asks for user input, it often includes a "validate&submit" function. This function checks your entries: have you filled in all the required fields - is there an @ sign in your email address - are there 5 digits in your zip code - and so on. If there are no errors, it submits the form. These functions usually behave well under edbrowse. When you push the button, you will either see the error message, or the form will be submitted, and a confirmation page should appear shortly.
In some cases the javascript function reformats your data. It may fill in some of the hidden fields for you, or it may compute sales tax and adjust the purchase price accordingly. This is more than form validation, this is active javascript, and the data won't be right unless the javascript runs properly on your computer. More and more sites are using active javascript, so a javascript enabled browser is a must.

Some javascript functions manage menus dynamically. Make a primary selection, and javascript populates a second dropdown list with options corresponding to your first selection. You can now make a second selection, which further refines your search. If the first menu presents "meats", "vegetables", "fruits", and "grains", and you select fruits, the second menu might contain "apples", "oranges", "lemons", etc. Javascript makes this possible. These dynamic menus are supported by edbrowse. You will see a message like, "Line 352 has been updated", where 352 contains the submenu. Type 352I? to see the newly created menu options.


## Popups and Popunders
A popup is a window that suddenly appears in front of the window you really want to see. It usually advertises something, and is often annoying, although in rare cases it is a necessary aspect of the website.
You have a distinct advantage over all those other surfers with their graphical browsers. The popup window does not open automatically. Instead, the popup appears as a hyperlink at or near the top of the page, and you can click on it if you like, or ignore it. This is similar to the background music, described in an earlier section. The popup link might look like this.
```
redirect: {Spring specials}
```
Popunders are not as common. They appear after you have closed the window. In some sense they are hidden "under" your web page, and when you close the page they pop out. In edbrowse, this does not happen automatically. When you type q, you quit, and that's the end of it. As you might expect, the popunder function appears as a hyperlink. It might look like this.
```
Onclose {Body}
```
Remember, the popup link is a simple html link to another web page, while the Close link calls a javascript function on the current page. However, this javascript function usually links to another web page, so don't be surprised if you find yourself somewhere else on the Internet. In either case, popup or popunder, you can use the back key to return to the page you were looking at. If you need access to a popup window and the main page in parallel, use the M command.


## Onchange and Undo
When you set or change the value of an input field, the form can optionally call a javascript routine. It doesn't usually, but it can. An earlier example describes a primary and secondary menu. When the first selection is made, e.g. fruits, javascript sets up the second menu commensurate with your primary selection using the onchange feature. This is all well and good, but edbrowse has something your graphical browser does not, the undo command. Because there are side effects under javascript, the undo command generally does not work. There is one exception however - if you change an input field by a substitute command, on one line only, and not under g//, you can undo it with the u command. This effectively puts the old text back, and runs the onchange code, as though you had typed it in yourself. Sometimes the input field is long, and a substitute doesn't do what you expect it to do, so the undo command is convenient.

If you are formulating a text response in a textarea, that is done in another session, and you have the full power of the editor, including the undo command.


## Javascript Debugger
In browse mode, the jdb (javascript debug) command directs subsequent input to the javascript engine containing the objects associated with the current web page, specifically, the frame associated with the current line number. Type bye to return to edbrowse. It is best to enter jdb with debug level 3, so you can see any javascript syntax or reference errors. This feature is for developers, and is not intended for end users.

If the output of any command is long, you can redirect it into a file by using the ^> symbol, as in expression ^> file. I didn't want to use > since that is a valid javascript operator. A predefined ok (object keys) command lists all the members of an object. showscripts() shows you the scripts in the current document, even generated scripts. These will be left in $ss. Type dumptree(document) to see the structure of the document. Use aloop(0,5,expression) to evaluate the expression as i runs from 0 to 4. Use aloop(y,expression) to run over the length of the array y.

A few edbrowse commands are valid inside the javascript debugger. These are: the db commands (to change debugging), e number (to jump to another edbrowse session and look at another file), bflist, bglist, timers, demin, and shell escapes.

[⬆️](#top)
<br><br><br><br>

# Chapter 6 Edbrowse Scripts and the Configuration File
## Config File
At startup, edbrowse reads and parses a config file. It's OK if this file is missing, but if it is present it should be syntactically correct. If there is an error, edit the config file, fix the error, and type ```config``` to reapply. Repeat until there are no errors. Processing of the config file stops at the first error, so you really want a clean run. Remember that ```edbrowse -c```, from the command line, will edit the config file directly. Also, from within edbrowse, a file name of ```-c``` is treated as the config file. You can switch to a new session, view, edit, save, and reapply the config file without ever leaving edbrowse.

The config file is in ```$HOME/.ebrc```. The "eb" is shorthand for edbrowse. You cannot rename the config file; it is what it is. However, ```-c otherfile``` on the command line causes edbrowse to access a different config file. This option must precede any arguments. The ```config``` command, issued from within edbrowse, continues to access otherfile.

The config file is line oriented. Lines beginning with ```#``` are comments, and are ignored. Blank lines are also ignored. All other lines fall into one of 7 categories.

* Define an option using the keyword=value syntax.
* Define an edbrowse script that can be invoked from the command line or from another script.
* An edbrowse command, that is part of an edbrowse script.
* Establish an email account. This will be described later, under email clients.
* A mail filtering rule.
* Describe a plugin.
* Describe a table or a view in an sql database.

### Keyword = Value

The best documentation is an example, so let's dive right in.
Recall the section on cookies. You'll need a file, often called a ```cookie jar```, to store your cookies. The line that establishes this cookie jar might look like this.

```
jar = /home/mylogin/.ebsys/cookie-jar
```

This is a simple ```keyword = value``` syntax. It's OK if the filename has embedded spaces, or even an equals sign. No need to quote it.

When edbrowse sees this line in its config file, it records the location of the ```cookie jar```, and it checks the validity of that file. If the file is a directory (or something weird), or is otherwise inaccessible, edbrowse prints an error message and stops processing the config file at that point. If this happens, edit your config file and change the cookie jar.

Here are some additional ```name=value``` directives. Some of these are used to set up an email account. This will become clearer when we talk about the mail client.

```
certfile = /etc/pki/tls/cert.pem
```

Specify the file that holds the certificates for secure connections. This was explained in the section on secure connections. This can usually be omitted, whereupon edbrowse uses the system's certificate file.

```
maildir = /home/mylogin/mbox
```

Go to this directory when fetching mail. thus, if you save a mail message, you'll always know where it is.

```
cachedir = /home/mylogin/.ebcache
cachesize = 200
```

Edbrowse stores some web pages locally, in a cache, so that they can be fetched directly from your computer when you visit them again. (All modern browsers do this.) You can specify the cache directory where these files are stored. If omitted, edbrowse selects ```~/.ebcache```. On a multiuser system, your cache should be private, since it literally contains the web pages you are looking at. Separate users should not share the same cache space. The cache directory is created mode 0700, if it does not already exist.

The cachesize parameter sets the size of the cache in megabytes. Default is 1000. If this is set to 0, edbrowse does not cache any files. When the cache is full, edbrowse deletes the 100 oldest files and marches on. Edbrowse does not retain more than 10,000 files, even if the cache could hold more.

The ```local``` command causes edbrowse to read http or https pages from cache. It does not go out to the Internet. If a page is not in cache it prints a connection error. This can be useful when there is no Internet connection and you want to review some pages that are cached. It can also be used in a function that fetches a web page that is static, and fetched often, so it will not fall out of cache. Remember that settings are ```local``` to a function, so ```local+``` in a function will not disturb your interactive session. This setting does not affect ftp, scp, gopher, etc.

```
imapfetch = 40
```

Fetch the last 40 emails when calling up a folder through imap. The fetch count must be between 1 and 1000. In the interactive imap client, you can specify -40, for the first 40 emails (in time order), but that can't be done from the config file. I assume you are always starting with the most recent emails.

```
envelope = fsd
```

Prescribe the format of an imap envelope, one letter per field. t = to, f = from, s = subject, d = date, z = size, n = number, and u = unseen. The default is ```fs```, from subject. This can be changed interactively with the ```e``` command. The "unseen" field presents a star if the email has not been read.

```
webtimer = 30
mailtimer = 180
```

Wait 30 seconds for a response from a web server, and 3 minutes for a response from the mail server. A time value of 0 waits forever. Sorry, there seems to be no way to interrupt a socket call, other than control backslash (quit), which kills the entire program. That's why these timers are here - so you don't hang forever. The defaults are 20 and 0 respectively.

```
downdir = /home/mylogin/downloads
```

When you access a binary file on a website, you have the option of downloading it directly to disk, rather than reading it into memory. If you do this, the file is placed in this download directory by default. If the file name you entered has a slash, or if there is no download directory, the path is taken relative to the current directory (assuming it is not absolute). In this case, globbing is performed. For instance, you can direct an mp3 file to ```~/music/country/Some-Song.mp3```. Downloads take place in the foreground, with progress dots, thus locking up edbrowse until the download is complete. If you prefer, you can run downloads in the background by issuing the ```bg``` (*background*) command. This is especially useful for large files. You are notified when the download is complete. Meantime you can continue to use edbrowse. No dots will be printed, as they would interfere with what you are doing.

When prompted for the filename, hit return for the default file name as provided by the website, enter ```x``` to abort, enter ```space``` to read the data into memory, or type a different file name if you wish. If the file already exists, it is overwritten.

The ```dld=``` command presets a download file name. This can be used in a noninteractive setting, such as an edbrowse function or a batch job. ```dld=jkl``` is the same as typing ```jkl``` when edbrowse asks you for the file name. A single space downloads into memory as usual, and ```x``` aborts. ```dld=%``` accepts the file name as provided by the server. ```dld=``` is a one-time command; it only applies to the next download.

Type ```bglist``` to list your background download jobs, including those that have run to completion. If edbrowse exits, any background downloads still in progress will not complete.

Foreground downloads, or any Internet fetch for that matter, prints progress dots, but you can suppress these with the ```pdq``` (*progress of download quiet*) command. Another option is the ```pdc``` (*progress of download by count*) command. This prints megabytes downloaded and megabytes total. For instance, 17/235 means 17 megs received out of 235. These are decimal megabytes, not binary 0x100000 megabytes - there is only a slight difference.

```
nojs = space.com
```

Specify domains that don't need javascript. Javascript will not be run on pages within these domains, nor will it be fetched from these domains. The above directive will also drop javascript from subdomains such as www.space.com.

You can include a path or partial path after the domain, as in ```space.com/popups```. This will block the popup ads that you don't want to see, which often generate edbrowse errors in any case. Subdomains are not considered when a path is given; the domain must match exactly.

This seems like a useful feature, but it is risky. The popup page may define a variable that the rest of javascript needs to run properly. thus, you probably shouldn't block certain pages on this site, or other domains that are fetched on behalf of this website, such as google-analytics.com or googlesyndication.com. Fetching all those other pages slows down edbrowse, and seems like a waste of time, but if you need javascript, you probably need all of it.

```
js = nasa.gov
```

Specify a site that must have javascript to run properly, such as nasa.gov. This directive is used under a different paradigm. Use ```nojs``` to block .com, .net, and .gov, for example, thus ```js``` hardly ever runs. Then turn on the websites that require ```js```. Some users prefer to run edbrowse in this fashion. It's definitely faster. However, if you run into a new site that requires javascript, you have to edit your config file, add the new site, run config, and rebrowse.

```
novs = example.com
```

Indicate hostnames for which SSL certificate verification should not be performed. This directive is useful for sites that use self-signed certificates, since these cannot be verified. It should probably not be used for anything serious, such as a site that is going to receive your credit card number. This directive includes subdomains, such as www.example.com.

```
inserver = pop3.some-domain.com
inport = 110
outserver = smtp.some-domain.com
outport = 25
```

Specify the machines and ports that you use to fetch mail and send mail respectively. You can use the fully qualified domain names, or aliases as defined in ```/etc/hosts```. The ports shown here are standard, and usually correct. They are also default in edbrowse, so you need not set inport and outport unless they are different from that shown above. Note, these keywords are only valid in the context of a mail account, as indicated by mail{}.

A star in front of the port number, e.g. ```outport *465```, means the socket is to be encrypted for security. When the smtp port is encrypted, login authentication is assumed. No other authentication method is implemented at this time.

An arrow in front of the port number, e.g. ```outport ^587```, encrypts the socket, but only after an initial handshake in the clear. This is the hotmail protocol, and it is as secure as ```*465```; just different.

Use ```+587``` to authenticate yourself without encryption. This is sometimes done when you are directly connected to the mail server and traffic is not flowing across the Internet, but the server still wants to make sure you are you.

```
secure
```

Incoming and outgoing email connections are secure. This effectively puts stars in front of the port numbers, if ports are specified. If ports are not specified, the defaults change to reflect the secure connections. Default pop3s is 995 and default smtps is 465.

```
nofetch
```

Do not fetch mail from this account through the ```-f``` option.

```
login = eklhad
password = secret
```

Specify the login and password that edbrowse uses to fetch your mail.

```
from = Full Name
reply = john.smith@some-domain.com
```

These lines are added in to the emails that you send. They tell the recipient who you are, and how to reply. It is illegal to use these lines for deceptive purposes. Make sure they identify you, and that the reply address is indeed one of your email accounts.

```
to = address
cc = address
bcc = address
```

Specify a recipient; every email you send through this account will go to that recipient. cc is carbon copy and bcc is blind carbon copy. gmail.com keeps a copy of every email you send, but most mail servers don't do that. If you want to replicate this behavior, include ```cc = your-address``` in the mail descriptor, whence every mail you send out goes back to yourself. A filter on the mail server can redirect mail from you into a sent folder. That is the only practical use I know of for this feature.

```
attach = file
```

The named file is sent, as an attachment, on every email you send through this account. If it is a work account, you might want an image or logo to be part of every email. That is the only practical use I know of for this feature.

```
imask = 3,5
```

Present folders 3 and 5 when accessing this account. imap is assumed here. You can toggle this masking feature on and off interactively with the imask command. When searching for a folder by number or by substring, all folders are searched, not just the ones presented on screen. Thus you can still access folders that are not presented or preselected.
```
imask = ju,inbox
```
You can use folder names or unique substrings in the imask directive. Note that there are sometimes multiple folders with the substring inbox, so if you want inbox, specify inbox, not just box, so you get an exact match. Edbrowse searches for an exact match first, then substring.
```
isub = substring
```
Do not display this substring of the imap folder. Also, do not use this substring when searching for a folder. A typical substring is [Gmail]/ as seen in gmail accounts.
```
dx = 8,2,6
```
Hard delete from these folders in imap. d in any other folder moves to trash. Trash is assumed to be the first number in the dx line. In gmail, you can't delete an email from inbox directly anyways. If you try, it is still in all-mail. So moving it to trash, and then emptying the trash, is the only way to actually delete it. You can use bulk delete to empty the trash efficiently in imap.

Without a dx line, d is always a hard delete. This generally works on other (not gmail) servers. Still, if you want to be safe, you might choose to move emails to trash.

You can use folder names or unique substrings in the dx directive.
```
adbook = /home/mylogin/.ebsys/address-book
```
When specifying recipients, you can use aliases instead of full email addresses. Aliases are checked against your address book, a line oriented text file that is specified here. If your address book contains the line
```
fred : fred.flintstone@bedrock.us : 226 cobblestone way : 5553827
```
then you can use the alias fred, and edbrowse will substitute Fred's email address when sending mail. Only the first two fields in the address book are significant as far as edbrowse is concerned. Other fields might hold phone/fax numbers, street address, anything you like. You can send Fred's name, as the intended recipient, buy using a greater than sign, like this.
```
fred : fred.flintstone@bedrock.us > Fred W. Flintstone : 226 cobblestone way : 5553827
```
Edbrowse ignores spaces and tabs surrounding the colons and the greater than sign. If the prefix of the email address contains special characters, like colon or greater than or even the at sign, you can quote it, like this. "this:>that"@gmail.com

On a multi-user system, create this file mode 600, or put it in a directory that is mode 700, so that others cannot see all your contacts.
```
emoji = /home/mylogin/.ebsys/Emojis.txt
```
Specify a library of emojis for edbrowse. This was described in the Emojis section.

You can use environment variables or the ~ notation in this, and other pathnames, in .ebrc.
```
emoji = ~/.ebsys/Emojis.txt
irclog = /home/mylogin/.ebsys/irclog
```
Specify a log for all your irc chats. This log is pulled back into the output buffer when irc is resumed. See the section on the Irc Client for more details.
```
include = ~/.ebsys/plugins
```
Include another file, like #include in C, or include() in m4. This can be used to modularize your edbrowse settings: mail accounts and filters in one file, plugins in another, functions in another etc. However, edbrowse -c only brings up the base config file, and would not provide direct access to these other files. So it is a matter of taste; some people use this feature and some don't.


## User Agent
Every time you fetch a web page from the Internet, your browser identifies itself to the host. This is done automatically. Edbrowse identifies itself as "edbrowse/3.5.1", where the number after the slash indicates the current version of edbrowse.
All well and good, but some websites have no respect for edbrowse, and no concern for Internet accessibility. They won't even let you in the door unless you look like Explorer or Netscape or one of the major players. StartPage.com, a front end to Google, is one example. So what do we do? We lie of course.
```
agent = Lynx/2.8.4rel.1 libwww-FM/2.14
agent = Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)
```
You can specify different agents in your .ebrc file, and activate them with the `ua' (user agent) command. If the previous lines are in your .ebrc file, you can type ua1 to pretend to bee lynx, or ua2 to pretend to be Mozilla. Type ua0 to resurrect the standard edbrowse identification.
```
agentsite = google.com 2
```
Pretend to be user agent 2, that is, Internet Explorer version 7, when talking to google.com or any of its subdomains. This was necessary for a time, but is, fortunately, no longer needed. Still, some sites are particular about the type of browser, and none of them are looking for edbrowse.


## Edbrowse Functions
You can bundle a set of edbrowse commands together under one name, similar to a macro. If the following appears in your .ebrc file, you can type <ud to undos a file.
```
function:ud {
  ,s/\r$//f
}
```
The < command is suppose to remind you of redirection, i.e. read input commands from this macro. And macros can invoke other macros by using a < command in the body. Almost any edbrowse command is fair game. A macro can fetch web pages from the Internet, fill out forms, submit requests, and send mail.

It is usually a good idea to use the forget flag, suffix f, within functions, so that they do not disturb the search and substitute that you have established in your interactive session.

Unlike many things in the Unix world, macro names are case-insensitive. Thus: dostuff, DoStuff, doStuff, ad nauseum, are all equivalent. Also, if you define a macro with the same name multiple times, the first definition wins. Edbrowse silently ignores subsequent definitions.

Function names are alphanumeric, but must start with a letter, much like other programming languages. Names are case insensitive.

Normally, edbrowse marches along, whether a command succeeds or not. However, you can tell a function to stop if it encounters an error by using this syntax.
```
function+hw {
  /hello/f p
  /world/f p
}
```
The plus sign after the word function means each command in that function must succeed. If there is no line containing the word hello, the function stops. If there is such a line, then the function moves on, and looks for a line containing the word world.

Other than some indenting, the format is fixed and unforgiving. You cannot, for instance, put the opening brace on its own line, as K&R would suggest.

If a function changes settings, such as case insensitive, search with wrap, debug level, user agent, etc, those settings are restored when the function exits; unless the function is the init function, or the function name begins with the word set. Clearly the init function is intended to establish settings for the interactive session, thus changes should not be local to that function.

These functions can accept parameters. Let's make the previous function a bit more general.
```
function+hw {
  /~1/f p
  /~2/f p
}
```
Reproduce the earlier behavior by typing <hw hello world, or search for different lines by invoking <hw foo bar. The latter looks for a line containing foo and prints it, and if this succeeds it looks for a line containing bar and prints that. Now let's build a more useful function, a shortcut to google search. The variable ~0 represents all the arguments together. In this case ~0 is the keywords you pass to google for your search.
```
function+gg {
  b http://www.google.com
  sw+
  /<>/f i=~0
  /</f i1*
  /h3/p }
```
With this in place, you simply type `<gg kangaroo habitat' to find out where kangaroos live.

Finally, an edbrowse function can branch, based upon the success or failure of the previous command. Use if(*) for success, and if(?) for failure. The ? is suppose to remind you of the question mark that you get when an edbrowse command fails. You can follow up with an else block, by } else {, if you wish. The following looks for a line containing foo, and if it finds one, it advances to the next line, and if that line contains bar, it deletes it.
```
function+silly {
  /foo/
  if(*) {
    +s/bar//
    if(*) {
      d
    }
  }
}
```
I deliberately used function+ instead of function: in the above example. Normally the + will cause the function to abort if an edbrowse command fails. However, if the result of that command is used by a control statement, the function does not abort. This is similar to set -e in the shell, which causes the script to abort after a failed command, unless the result of the command is used by an if or while statement.

Other control statements include while(*) while(?) until(*) and until(?). The following deletes lines from the top of the file, as long as they contain foo or bar. It then deletes the blank lines at the top.
```
function+topclean {
  until(?) {
    1g/foo\|bar/d
  }
  until(?) {
    1g/^$/d
  }
}
```
You can use loop(100){ ... } to repeat a set of commands 100 times. This feature is not used very often.

<7 executes the edbrowse commands in session 7. This is not a function, simply a sequence of commands. The commands are executed in your current context. If session 7 has one line, containing the letter n, <7 will print the current line, with its number, in your current session. It is possible to be in session 7 and issue <7, though I don't know when you would ever want to do that. There might be unintended consequences, if earlier commands modify the commands that have yet to run.

Since this is not a function, it does not take arguments. However, you can use edbrowse to construct the commands in session 7 just as you want them.

<*7 executes the commands in session 7, but stops upon error. I would have used +, but that has a different meaning, as we shall seee below.

The at syntax is supported here. <7@22,29 will run the commands from lines 22 through 29.

If you are scripting this, and you're not sure that session 7 is available, it can all be done on-stack. Use etmp, then build your commands in that buffer. Go up, and run <-1 which runs all the commands that are one buffer down in your history. When complete, go down, and then ^ back up to get rid of the temp buffer. <*-1 will stop upon error.

Since this is not a function, changes are not local to this execution. If you modify a setting at the start, you should restore it at the end.

In jdb mode, <7 passes the expressions in session 7 to javascript, as though you had typed them in.


## The Init Function
The function named "init" is run at edbrowse startup. Use this to establish your default settings - even read in your bookmark file, so your favorites are close at hand. Here is an example.
```
function+init {
#  turn debug off, so we don't see any status messages from this script
db0
#  Assume directories can be modified
dw
#  Put beginning and end markers around listed lines
endm+
#  Use readline for input
rl+
#  Let session 99 hold your favorites, ready to surf.
e99
b $bookmarks
#  back to session 1, ready to go to work
e1
}
```
This is just a sample. Put anything you like in your init function, or leave it out altogether if you are happy with edbrowse out of the box.

The -d option on the command line overrides any db settings that are made by the init script. Thus edbrowse -d4 could make a lot of noise, even if db0 is the first entry in your init script.


## Edbrowse Variables
Variables can be set and accessed, usually for scripting purposes. The following sets jj to the string "hello world".
```
var jj=hello world
```
The syntax of setting and referencing variables is quite rigid, just as it is in the shell. There can be no whitespace before the equals sign, and any whitespace following is significant. A variable begins with a letter, and contains only letters and digits. Variable names are case sensitive.

$(jj) expands the variable jj inline. This is the makefile syntax, rather than the simpler shell syntax $jj, which you might stumble upon by accident. There is no escape character to prevent the expansion. If you want to replace x with $(jj), you must do something like this.
```
s/x/$(jj
s/jj/jj)
```
Variables are not set or expanded during text entry, so you can type a and write your edbrowse scripts or makefiles as you please. Also, expansion does not take place if jj is not defined. Thus you are unlikely to run into this unless you are writing scripts that use variables.

A modest amount of arithmetic is supported, similar to $((expression)) in the shell. Here an expression is a sequence of variables or numbers, separated by the operators +, -, *, and /. The following evaluates to 49.
```
var jj=7
p $(jj+3*4+5*6)
```
var jj=clear will clear the variable jj from the cache. This is similar to the "f clear" command, which clears the filename.

The edbrowse cache of variables is similar to, but completely separate from, the environment. Use : to access the environment. The following also produces 49, but the variable jj is in the environment, and will be passed down to any shell commands.
```
var jj:=7
p $(:jj+3*4+5*6)
```
A variable can exist in both worlds if you wish.
```
var z=elephant
var z:=$(z)
```
An arithmetic expression can include variables from both arenas, as in $(jj+7-3*:kk)

there is a test command, which is similar in syntax and function to that found in the shell. If the line comprises [ expression = expression ], then it quietly returns success if the expressions are equal, and returns error if they are not. The != operator does the opposite. Here is a goofy little function that counts to 17.
```
function+count17 {
    db0
    var i=0
    while(*) {
        var i=$(i+1)
        p $(i)
        [ $(i) != 17 ]
    }
    var i=clear
}
```

## Mail Accounts
The next chapter describes edbrowse as a mail client, so let's use the config file to define some email accounts. You can define several accounts as necessary. They are implicitly numbered in the order they appear in the config file. The first mail account becomes #1, the second becomes #2, and so on.
We already discussed the relevant keywords for an email account. All you have to do is enclose them in mail{...}, like this.
```
mail {
  default
  inserver = pop3.some-domain.com
  outserver = smtp.some-domain.com
  login = eklhad
  password = secret
  from = Full Name
  reply = john.smith@some-domain.com
}
```
The "default" directive makes this account the default. One and only one account should be labeled default. If you do not specify an account when fetching or sending mail, the default account is used. Beyond this, the default smtp server is always used to send mail, no matter which account you specify. If account #1 is default, and you send mail using account #3, the name and reply address from account #3 will be sent to the recipient, and if he replies, his reply will be sent to your third email account. However, the smtp server from your default account is used to physically transmit the message. There are technical reasons for doing this having to do with security. However, if an account has its sendmail stream encrypted, then security is not an issue, and we can use these settings to send and receive mail. Here is a typical configuration for Google's gmail.
```
mail {
  inserver = pop.gmail.com
  outserver = smtp.gmail.com
  secure
#  Google also supports outport = ^587
  login = somebody@gmail.com
  password = secret
  reply = somebody@gmail.com
  from = Full Name
}
```
Mail filtering, by sender and/or subject, is controlled by your config file as well. This will be described later, as part of the fetchmail client.


## Plugin Descriptors
Plugins are determined by the extension of the file, or in some cases the protocol. They might tell edbrowse to use /usr/bin/play to play file.wav or file.voc, and /usr/bin/mpg123 to play file.mp3, and so on. Rather than repeat it all here, you may want to look at the plugin {...} sections in the sample config file provided with this package. Linux users can probably copy this part directly into their own config file. It generally does the right thing. Here is one example.
```
plugin {
type = audio/mp3
desc = audio file in mp3 format
suffix = mp3
content = audio/mpeg
#  %i is replaced with the mp3 file or the mp3 url
program = mpg123 -q -C %i
}
```
This example handles an mp3 file or an mp3 stream. That works because mpg123 will play a local file or an mp3 stream from the Internet. If mpg123 was limited to local files on your computer, we would have to add the keyword down_url, whereupon a url is downloaded to a temp file and then played. The automatic play feature can be disabled with the pg command that turns plugins on and off.

The cookies that would pass to the server, if you were to download the file directly, are available in the environment variable PLUGINHEADERS. In some cases the plugin program may need those cookies as it contacts the server on your behalf. Example: the --http-header-fields option on the mpv command. In practice this is rarely needed.

If you have read an audio file into memory from your own computer, you can type `pb' to play the contents of the buffer. The data is put into a temp file under /tmp/.edbrowse, and them mpg123 is invoked. Finally, you can play an mp3 file, or any plugin-enabled file, from directory mode. The g (go) command plays the file on the current line. This is very efficient; no need to read the file into memory or create a temporary file under /tmp.

In some cases the stream is not indicated by protocol or suffix. A youtube video, for example, looks like just another html page; yet it can be played by a music player. use the urlmatch attribute for this.
```
urlmatch = .youtube.com/watch?
```
Some plugins play files, and some plugins process files. The outtype attribute determines the type of plugin. In this example, a pdf file turns into html, where it can be browsed in the usual way.
```
plugin {
type = pdf
desc = pdf file
suffix = pdf
content = application/pdf
#  file must be local
down_url
program = pdftohtml -i -q -stdout -noframes %i
outtype = H
}
```
Other plugins could convert rich text, Word docs, Open Office docs, etc. Set outtype to h if the output is in html, or t if the output is in text.
```
plugin {
type = Word doc
desc = Microsoft Word document, not docx
suffix = doc
content = application/msword
down_url
#  without %o, the output is piped directly into the buffer
# with %o, the output is sent to a temp file, then read back into the buffer
# not every program can send its output to stdout
program = catdoc %i
outtype = T
}
```
Note, there are pdf to text converters that skip the middle html step, but I wanted to preserve the functionality of any hyperlinks that might be embedded within pdf, so I thought it worthwhile going through html, even though it adds another step.

If the file name does not reflect the correct plugin, use b.xxx to browse with the converter indicated by the suffix .xxx. This is the same as pb.xxx, to play the current buffer using the player indicated by .xxx.

If the pdf file requires a password, type b.pdfp, and use this plugin. %p means parameter, edbrowse will ask you for the parameter. In this case the parameter is the password.
```
plugin {
type = pdf
desc = pdf file with password
suffix = pdfp
program = pdftohtml -opw %p -i -q -stdout -noframes %i
outtype = H
}
```


## A Sample Config File
The best documentation is an example, so I have provided a sample config file with fake data. It is well commented. You can see a sample config file here. Also available in French and Italian.



[⬆️](#top)
<br><br><br><br>

# Chapter 7 Mail Client
## Send Mail
Email the contents of your current editing session to someone else via the `sm' command. Your email accounts are described in the config file.
Most mail clients can automatically append a signature to outgoing email messages; edbrowse is no exception. In fact, you may have a different signature for each of your mail accounts. Thus, you can use one signature for work email, and another for personal email. When sending mail from account N, edbrowse first checks for a file named .signatureN in your home directory. For example, when sending from account 2, edbrowse looks for .signature2. If that file is not found, edbrowse looks for a file named .signature in your home directory, appending its contents if it is found.

The recipients, attachments, and subject must appear at the top of your file. The sm command is picky, so observe the following syntax carefully.
```
To: fred.flintstone@bedrock.us
CC: barney.rubble@bedrock.us
account: 1
attach: hollyrock-brochure.pdf
Subject: Hollyrock Vacation
Come visit Hollyrock.
Brochure attached.
Sincerely,
Rock studios incorporated.
```
The account line is optional. It tells edbrowse to use the first mail account specified in your .ebrc config file. If you don't include an account: line, edbrowse uses the default account, indicated by "default" in your .ebrc file.

Typing sm5 causes edbrowse to use account number 5. This overrides the account: line if there is one. It is often easier to type sm5 than to insert an account:5 line. Note, sm-5 is the same as sm5, but the .signature file is not included. Sometimes you want a different ending on your email for a particular situation.

When the body of your message contains lines longer than 76 characters, edbrowse either uses the quoted-printable transfer encoding, to preserve the text exactly as you wrote it, or it wraps the lines and sends the message using format=flowed, whence the receiving email client can unwrap the paragraphs in a manner that makes sense on the user's device. You can choose between these options with the flow command. With flow+, paragraphs with long lines, or with a line that ends in a space, will be reformatted. If a paragraph contains all short lines, like a poem, with no trailing spaces, it is preserved, even under flow+. flow+ is the default; you probably won't have cause to turn it off.

When the body of your message includes a word longer than 998 bytes, edbrowse uses the quoted-printable transfer encoding. This is an Internet requirement. It will probably never happen in the real world.

Different operating systems traditionally use different characters to mark the end of a line. Usually, edbrowse sends text attachments with neutral line endings. The receiving email client will save the file with the line endings that are usual on that operating system. Use flow- if you want edbrowse to send text files with the line endings exactly as they are. You won't need to do this very often.
```
sub: is an acceptable shorthand for subject:
```
Use the attach: lines to add attachments to your email. Each line should specify a file to attach, and they must appear before the subject line. If the filename is simply a number, the corresponding edbrowse session is used instead. Return to the earlier example, where we are trying to attach a Hollyrock brochure. Another way to do this is to switch to session 2 and read in the pdf file. This is a binary file, but that doesn't matter. Don't try to edit it, just hold it in session 2. Then switch back to session 1 and use the line attach:2.

If you use attach:2, instead of attach:hollyrock-brochure.pdf, Fred will notice one difference. The attachment is not prenamed for him. If he wants to save the attachment, he'll have to come up with a filename himself. Other than that, the email looks the same.

The alt: directive is almost the same as the attach: directive. If you use alt:, the attachment is not treated as an adjunct file. Instead, it is an alternate representation of the same email. The mail client will use the alternate representation if it can. This is usually used to send multimedia email with hyperlinks and pictures etc. The primary email is in plain text, but the alternate attachment is in html or rich text. Unless something is amiss, the user sees the alternate presentation, complete with graphics and hyperlinks. Like attachments, the alt: line can refer to a file or an edbrowse session.

As you may have guessed, the to: lines establish the recipients. Please don't specify more than a few dozen recipients. Some mail servers set a hard limit of 100 on the number of recipients. If you exceed this number, the remaining recipients simply don't get their mail. Best to limit your "to:" lines to a couple dozen.

Remember that CC stands for carbon copy. This tells the recipient, in this case Barney Rubble, that he is receiving a copy of the email for his convenience; he need not respond. Use BCC for blind carbon copy, so that each person does not see all the other email addresses.

When specifying recipients, you can use aliases instead of full email addresses. Aliases are checked against your address book, a text file that is specified in your .ebrc file. If your address book contains the line
```
fred : fred.flintstone@bedrock.us : 226 cobblestone way : 5553827
```
then you can simply write "To:fred" at the top of your file. Only the first two fields in the address book are significant as far as edbrowse is concerned. Other fields might hold phone/fax numbers, street address, etc. That's up to you.

Note that "Reply to fred" is an alternate syntax for "to: fred".

Some web pages include sendmail links. They look just like other hyperlinks, but they send email to the appropriate person. If you activate a sendmail link, you will be placed in a new editing session with the "to" and "subject" lines preloaded. If the url did not specify a subject, the subject is simply "Hello". You will probably want to replace this with a better subject line. Write your mail message and type `sm' to send it on its way. Then type ^ to return to the web page you were looking at. Note that the body of your email may also be preloaded with some default text, so be sure to check before you write and send.

You can include attachments by placing "attach:" lines at the top of the file, assuming the recipient can handle these attachments. This might make sense when the sendmail link is asking for bug reports - you might attach a program and/or its output. Yet this is somewhat unusual. Most sendmail links expect a few sentences of feedback, and nothing more.

Some web forms are submitted via email, rather than a direct http transmission. Edbrowse handles this properly. It shows you the destination email address, sends the mail through smtp, and tells you to watch for a reply. This reply could be an email response, or even a phone call if you provided your phone number in the form. But remember, nothing happens immediately. You are still on the same web page, still looking at the same submit button. Don't push the button again! The mail has been sent, and you'll be hearing from the company in the next few days.


## Send Mail Client
as described in the previous section, edbrowse incorporates the features of a mail client. In addition to the interactive `sm' command, you can send mail in a batch fashion from the command line. If fred and barney are in your address book, and you want to send them mail from the command line, with an attachment, using your first email account, do this.
edbrowse -m1 fred ^barney hollyrock-notice +hollyrock-brochure.pdf

The ^ in front of barney means he is a CC recipient. Use "?barney" for BCC.

Files with a leading + are assumed to be attachments. A leading - indicates an alternate format, like this.
```
edbrowse -m1 fred ^barney hollyrock-notice -hollyrock-graphical.html
```

## Retrieving Mail
If edbrowse is invoked with the -f option, it will fetch mail from all accounts, except the ones that you have marked nofetch. Alternatively, you may specify a number following -f, in order to fetch mail from a single account. For instance, -f1 will fetch mail from your first mail account, ignoring all the rest. When it has finished retrieving mail, the program prints the total number of messages that it retrieved. Fetched messages are stored in a directory named unread/, relative to the directory specified with the maildir setting in your .ebrc file. You may read them, as described in the next section.
Remember, you can specify several mail accounts in your .ebrc file. The first account is indicated by index 1, as in -m1, and so on. You can make life easier with some aliases in your .bashrc file.
```
#  My mail, home account
alias mymail="edbrowse -fm1"
#  My wife's account.
alias wifemail="edbrowse -pfm2"
#  My work account.
alias workmail="edbrowse -fm3"
#  mail is obsolete
alias mail="echo use mymail, wifemail, or workmail"
```

## Interactive Mail Reader
If edbrowse is run with the -m option, and no other arguments, it is an interactive mail reader, allowing you to examine mail from your directory of unread messages. If you wish to retrieve and read in one step, you can combine the -f and -m options.
The first thing it tells you is how many messages you have. If there are no messages it says "No mail", and exits. If there are unread messages, it shows each one in turn. For each message, it displays some header information (such as subject and sender) and the first page of text, and then presents a prompt. A '?' prompt means the message is complete - a '*' prompt means there is more text to read. You respond by hitting a key. Keys have the following meaning.
```
?	summary of key commands
q	quit the program
space	display more text
g	go to top
t	read as plain text
n	read the next message
d	delete this message
w	write this message to a file and delete it
u	write this message unformatted to a file and delete it
```
Typing space continues to display the email, like /bin/more. Type g to go back to the top. Type t to view the plain text version of this email, however, the result is often unsatisfying. Many emails only have an html component. In this case edbrowse tells you there is no plain text component, then renders the email through html, as it did before. In other cases there is a plain text component, but it simply says, “This email has no plain text version; please enable html processing on your email client.” When a plain text version is available, it can be simpler than the html version.

If the raw email is in a file, the special command b.plain browses it using the plain text component, as though you had typed t in the email client.

The last two commands, w and u, require a filename, which you enter. The reserved filename, "x" or "X", is essentially /dev/null, whence the mail message is discarded. If the file is anything other than x, and edbrowse cannot write to the specified file, it asks you for a new filename.

In practice, you might save a message with w, later realizing that you need something, such as a hyperlink or attachment, which is only available in the unformatted message. When you use the w command to write a formatted message to a file, edbrowse retains an unformatted copy as well. These copies are placed in the directory $HOME/.Trash/rawmail, with file names consisting of 5 digit numbers. When you save a formatted message, you'll notice some text like "Unformatted 12345" at the end of the file. This tells you where to find the original, unformatted message: $HOME/.Trash/rawmail/12345. As mentioned previously, it's a good idea to run a weekly cron job to clean out the trash bin; if that cron job removes subdirectories, it will ensure that raw mail does not accumulate indefinitely.


## Formatted Mail
When mail is retrieved, it is saved in the directory of unread messages without any formatting applied. In other words, it is a faithful copy of the message as it existed on the server. When you read it by invoking edbrowse with the -m option, edbrowse displays it after applying various formatting rules. You can save the message in either its raw or formatted state. Selecting `w' at the interactive mail prompt writes the formatted version to disk, while selecting `u' saves the unformatted version.
When an html mail message is rendered, javascript is disabled. If you want to interact with this email message, you must save it unformatted to a file, finish your email session, edit that file, and type b to browse. Now the html is active, as though you were looking at a web page on somebody's site.


## Mail Filtering
The config file supports a modest level of mail filtering. You can redirect incoming mail based upon the sender, the receiver, or the subject. These parameters are established in your config file. A mail filtering rule has the form:
matchString > destinationFile

Actually the > is a bit misleading. If the file exists, the email is appended to the end; the file is not truncated. So perhaps we should use >>, but I didn't want to bother with the extra greater, over and over again.

The destination file is interpreted relative to the mail directory, which is set in your config file. Of course you can override with an absolute path if you wish.

A mail filtering rule always occurs in the context of a filter block. For instance, if you wish to redirect mail from certain people, do this.
```
fromfilter {
fred flintstone > fredmail
fred.flintstone@bedrock.us > fredmail
jerk@hotmail.com > x
word@m-w.com > -wod
}
```
You can specify the sender's name or his email address. It's not a bad idea to do both, in case he sends mail from some other account.

Notice that I didn't capitalize Fred Flintstone. Matches are case insensitive.

The file name "x" is special; it discards the mail entirely. You can use this to throw away mail from people who are constantly harassing you or sending spam.

The last entry sends mail to -wod. The leading - is special; it means the mail should be saved to wod unformatted. This happens to be the word of the day from Merriam Webster. You can save it unformatted, then browse it, and click on {audio} to hear the word pronounced. If an email contains hyperlinks, you may want to save it unformatted so you can browse it later.

You can also filter mail based on the to: field. This is useful if you have several mail accounts, or mail aliases that are forwarded to your primary account. Here is a sample block.
```
tofilter {
support@my-side-business.com > support
sales@my-side-business.com > sales
@my-side-business.com > business
me@my-regular-dayjob.com > work
}
```
The third entry is a catchall address, saving any mail that is sent to that domain. Since rules are applied in order, support requests are stored in a file called "support", sales are stored in a file called "sales", and all other emails sent to your business are stored in "business".

You can use catchall addresses in the fromfilter block as well. Anything from this domain goes here.

You can filter based on subject, using the subjfilter{...} block. This can close the door on the virus de jure. If a virus uses a subject line of "Come Kiss Me", you can redirect "come kiss me" to x, and it's gone.

You can also use this feature to block warnings from other ISPs, complaining that you sent them emails with virus attachments. You didn't, of course, because you run linux, and a nonstandard mail client to boot. Your reply address was forged, so the virus warning was sent back to you, but you really had nothing to do with it. this is called backscatter. Lines like this one can throw these spurious warnings away.
```
subjfilter {
Come Kiss Me > x
Net Integrator Virus Alert > x
}
```
If the subject equals the match string (case insensitive), or the subject begins or ends with the match string, and is not more than twice as long as the match string, then the email is redirected.

Finally, the reply address is checked against your address book. If there is a match, the mail is saved in a file whose name is the email alias. Consider a line in your address book that looks like fred:Fred.Flintstone@SomeDomain.com. When you receive email from this particular address, it is saved to the file fred. Thus you don't have to enter and maintain redundant entries in the filter. There is no need to include Fred.Flintstone@SomeDomain.com > fred. It's taken care of by your address book.

If you want to save mail from Fred unformatted, place a minus sign, i.e. -fred, in your address book. This is the same convention as the from filter. If you don't want mail from Fred to be redirected, but you still want to use the alias fred when sending mail, place an exclamation mark at the start, i.e. !fred.

If an email is redirected to a file, and it includes attachments, edbrowse will ask you what to do with those attachments, as though you had used the w command to save the mail yourself. If your friend has sent you a program (attached) that he wants you to look at, just hit return to save it to the default filename. If your friend's mail has some kind of logo, or background image, that you don't care about, type x and it will go away. If the image has a recognizable suffix, such as gif, I discard it automatically. If you really want these images, you'll have to save the email unformatted and browse it later. When browsing an email inside the editor, edbrowse offers you all the attachments, as hyperlinks that you can go to, for an html email, or interactively, for a text email. The vast majority of emails with attachments are in html, so you will usually see them as hyperlinks. Type g to put the attachment into a buffer, then do whatever you like with it.

If attimg is set, attached images are presented as hyperlinks, or interactively. If this mode is clear, (the default), image attachments are skipped. This is a bit like hidden files in directory mode. If images are offered interactively, You can discard a single attachment by entering x, or all the image attachments by entering capital X. Type e to put the attachment in another edbrowse session. Edbrowse will tell you what session this attachment is in.

Use the -p option to pass over the filters, as in `e -pm1'. I set this when looking at other people's mail, such as my wife's account. I don't want her mail sent somewhere else because it matches one of my filter rules.


## Mail Reply
The `re' command prepares a formatted email for reply. The "Reply to" line (which must exist) is moved to the top. This contains the email address that you will reply to, and it is created when you format (i.e. browse) your email message. If this line is not present, the reply command will fail.
The "Subject:" line must also be present. This too is created when the email is formatted. After the re command is issued, the subject may move down the page, to make room for other email headers as follows.

If this email has just been browsed, and the unformatted data still exists within the current edbrowse session, or if this same data is available in the database file maildir/.reply, then re inserts the message id of the original email. This should be part of the reply. The resulting lines might look like this.
```
Reply to somebody@foo.bar.com
references: <4387A55E6AF43C4F9830C74EFECE9132022D0638@foo-bar.net>
Subject: What's in a name?
```
The reference line is not a line you should ever type in, edit, or delete. Just leave it be. If you participate in a discussion list, this line is important. It tells the server that your reply is indeed a reply and that it should be linked to the referenced message. Using this information, the server maintains discussion threads. If you delete this line before sending your response, you will create a new thread, and that will only confuse and annoy the other participants. So - if you are going to reply to a message on a discussion list, make sure the re command inserts the References: line, and then leave it alone. Edit the body of the email, add your comments, and send.

Sometimes the references line will have two IDs separated by white space. The first is the beginning of the thread, the message that started this topic, and the second is the comment that you are replying to directly. Again, this helps list servers organize the emails into threads.

The command `rea' means reply to all, and this also uses the original email data. All the recipients will appear at the top of your file. Some will be indicated by cc, if they were carbon copied. You can delete any of these recipients before sending your response. Of course you probably don't want to delete the first line, as that is the reply to address.

If the email was unformatted, and you have typed b to browse it, the re command takes the file out of browse mode and turns it into a plain text file. This supports text editing, to write your reply in the body of the message. If you want to start over from scratch, you can't just unbrowse, because it is not in browse mode. You must re-edit the saved mail message, browse, and reply. Like everything else in edbrowse, you'll get use to it once you play with it.


## Imap Client
A pop3 client, as described above, fetches mail down to your computer, whereupon you are responsible for it. You must archive your emails, if you wish, and back them up, etc. However, the imap protocol allows you to keep your emails on the server indefinitely, in the cloud so to speak. You can access your email, perhaps 20 years worth of email, perhaps 100,000 messages, from any computer or any tablet or any smart phone. You can download emails locally if you wish, but you don't have to. This is more of a server side approach. The earlier configuration entry for gmail, when adjusted for imap, looks like this.
```
mail {
  imap
  inserver = imap.gmail.com
  outserver = smtp.gmail.com
  secure
  login = somebody@gmail.com
  password = secret
  reply = somebody@gmail.com
  from = Full Name
}
```
If this is the third mail entry in your config file, then you access this account by `edbrowse -f3'. This does not simply fetch all the emails down to your local computer, as is the case with a pop3 account. Rather, edbrowse provides access to all the emails on the imap server in an interactive fashion. Here is a sample screenshot.
```
 1 INBOX, 0 messages
 2 [Gmail]/All Mail, 7 messages
 3 [Gmail]/Drafts, 0 messages
 4 [Gmail]/Important, 0 messages
 5 [Gmail]/Sent Mail, 0 messages
 6 [Gmail]/Spam, 7 messages
 7 [Gmail]/Starred, 0 messages
 8 [Gmail]/Trash, 16 messages
Select a folder by number or by substring. q to quit,
```
rf to refresh, l=number to change fetch limit, e=string to set envelope format.
Type 6, or spam, or just spa, and edbrowse takes you through the 7 messages in the Spam folder. It prints the sender and subject of each email, also known as its envelope, and asks you what to do, similar to the pop3 client interface. Type q to quit, n for the next message, d to delete, or m to move this message to another folder. Again, you can specify the destination folder by number or by name. Type space to read the body of the email, and keep typing space, like more, to read as much of the email as you wish. g has the same effect as space; go to that email, rather like going to hyperlinks on a page, or files in a directory scan. g in the middle of an email goes back up to the top. Type w to write the email formatted, or W to write and delete. Type u or U to save the email unformatted. Type a to save the attachments. r marks the email as read, and R marks it as unread. Type / to search for emails by subject, by sender, or by the text in the body of the email. Finally type h for the help message, which looks like this.
```
h	print this help message
q	quit this program
s	stop reading from this folder
n	continue to next message
p	go back to previous message
d	delete this email
m	move this email to another folder
v	view all
b	batch move or delete
f	from move or delete
space	read and manage this email
t	read as plain text
/	search for words in subject, from, to, or body
w	write this email to a file
W	write this email to a file and delete it
u	write this email unformatted to a file
U	write this email unformatted to a file and delete it
a	scan and save attachments
r	mark as read
R	mark as unread
e	envelope format string
l	set fetch limit
=	print the number of messages in the list
```
On some servers, such as gmail, you can't delete an email from the "All Mail" folder. Instead you must move it to Trash and then delete it from there.

The search is case insensitive, and often looks for words, rather than simple substrings. Thus foo matches Foo, but does not match foobar. The implementation will depend on your imap server. The default is to search through subjects. Type `f Smith' to search for mail from Smith, or `b neutron star' to find all emails that talk about a neutron star. If there are thousands of matches, only the last 100 are shown. You can change this limit with the l command.

If there are 300 emails in your spam folder, there is an easy way to delete them all. Type v to view them all, just to make sure a valid email didn't wind up here. You don't want to delete anything good by mistake. Then type b for batch mode, then d to delete. Poof, they're gone. In the same way, you can batch move all the messages to another folder. However, move is more useful with the from clause. If the current message is from Fred Flintstone, type f, and edbrowse will print "from Fred Flintstone". Then type m cartoon, and all the messages from Fred Flintstone will move to the cartoon folder.

The create and delete commands will create new folders or delete existing folders. Type `create foo' to create a new folder foo. You can move messages into it right away. Warning - if you delete foo, all the messages in foo could disappear. This will depend on the imap server. You can rename a folder via `rename foo bar'. This command assumes there is no whitespace in a folder's name.


## Imap Within Edbrowse
Edbrowse presents an ed-like interface in almost everything it does: browsing, file manager, sql databbase, irc client, etc. In fact that is part of its appeal. Thus we try to do this for imap as well. This presents a seamless user experience, as seen in other browsers. While reading an email, you can go to a hyperlink, issue a reply, delete the email, save its attachments, etc. The stand-alone client is faster for some things, but you can't perform all these integrated operations.

Call up a server by the "imap n" command. n is the number of the mail block in your config file. (imap 0 closes down the connection and clears the buffer.)

If the connection is made successfully, there is one folder per line in the buffer. This line will have the message count, so many messages in the folder; unless that folder is excluded by an imask directive in its mail block. In that case the count is simply a question mark. This behavior is similar to, though not identical to, the stand-alone mail client. The client doesn't print the excluded folders at all. In an edbrowse buffer, you have complete control, so we include all the folders, with counts by those that are active.

The imask command toggles the imask feature on and off. It is only available in this window, and is per account.

The a command adds new folders, the s command renames a folder, and the d command deletes a folder. These are the ed commands you already know, with the expected side effects. Since d is drastic and irreversible, edbrowse asks if you are sure you want to delete. Type y or yes if you really want to delete that folder, and all emails therein. I have no idea what happens if you delete a system folder, like Trash or INBOX. I don't recommend it! Only rename or delete the folders that you have created.

Type /expression to find the folder you want, then type g to go to it, like it was a directory. You can do this even if the folder is excluded by imask.

In a new buffer, (the folders are still up one level in your history), you will find the most recent emails, one envelope per line. These are in time order, with the newest email at the bottom. Type g to go to an email, and it is in your buffer. From here the contents of an email, raw or browsed, can be manipulated in the usual way. If a link interests you, go to it; you couldn't do that from the imap client.

^ goes back up to the list of envelopes, and ^ again goes back up to the folders.

d deletes an email, either the email you are reading, or the email indicated by the current envelope. In the page of envelopes, you can delete a range of emails, or a collection of emails via g/re/d. Be careful, there is no undo. However, delete might not actually delete on the server, depending on the server - and you can use the dx directive, as described before, to make d act like a move to trash in certain folders.

d removes the envelope you are on, but does not adjust the page above. Back up to folders and the message count is still what it was before. Type rf to get a new, accurate message count on all the folders.

When viewing the folders or the envelopes, "l=number" will change the fetch limit, how many envelopes fetched at a time, and "e=format" changes the format of the envelope. These are the same as the imap client. For instance, "e=fstd" shows from, subject, to, and date. The n attribute is not meaningful here, since edbrowse already maintains line numbers for you. If you are on the envelopes page, you might want to refresh, so you can see them in the new format.

A limit of -n fetches the first n emails, rather than the most recent. This makes it easy to clear out the old emails.

edbrowse can perform a remote search on the imap server. This isn't just a search through the emails in your buffer; the search takes place on the server, through all of your emails. For the folder on the current line, the following searches apply.
```
/f fred : emails that come from Fred
/t wilma : emails that were sent to Wilma
/s paypal transfer : emails with paypal and transfer in the subject line
/b baseball : emails that mention baseball anywhere in the body
/u unread emails
/uf fred unread emails from fred ... etc
```
Any other /expression is just a text search through the buffer as usual.

The envelope and fetch limits still apply. You can ask for the first 20, or last 30, emails of this search, showing from, subject, and size, for example. You might use the to field in the search, if you are searching through the Sent or Drafts folders, and want the emails that you sent to a particular person.

When viewing an envelope, or reading the associated mail, "m abc" will move the email to the folder whose name contains abc. Because the email is gone, edbrowse automatically pops the window, and puts you back in the envelopes. The envelope for this email is also gone. "t abc" copies the email to the abc folder. This leaves you where you are. On the page of envelopes, you can move or copy a range of emails, or a collection via g/re/m abc.

Numbers are also valid in the move and copy commands. If abc is the third folder, you can type "m 3" or "t 3". It is probably safer and easier however, to type in the name of the folder or a fragment of its name.

If you happen to have the abc folder open in another buffer, and you move an email into that folder, it will not appear in that list of envelopes. It can't, because it acquires a new uid from the imap server once it moves. The uid is how edbrowse accesses that email, to perform any operations. You must refresh the abc envelopes to see that email. It will be the most recent, even if it was send years ago. In that sense, it probably doesn't help to have multiple folders open simultaneously. Descend into a folder, do some work, go back up, descend into another folder, etc.

When reading an email, there is a write command that mirrors the imap client. "w foo" writes the email formatted to the file foo, and saves the raw email in the directory ~/.trash/rawmail. This is what the mail client does, although it places your files in the mailbox directory, while this session saves the files wherever you are. Attachments are also saved, one by one, with their default filenames, or different filenames if you prefer. Type x to skip an attachment, and X to skip all image attachments. If you have worked with the imap client before, this will seem familiar.

The w command alone, without a filename, may select a default filename based on your address book. If it comes from an email address that is associated with the alias fred, edbrowse will ask you if you want to use fred. Of course you can change the filename to something else.

If the file already exists, the new email is appended, with a line of equal signs separating them. However, an attachment will not append. It might be a binary executable; appending one to another would make no sense. Each attachment must save in a stand-alone file.

The u command saves the email unformatted. Type "u filename" to specify a filename, otherwise edbrowse prompts you for one. You are not prompted to save attachments, because you have the raw email in hand. You can always browse it and save the attachments later.

Capital W and U perform the functions of w and u, and then delete the email, just like the imap client. This necessarily takes you back up to the envelopes page, whereupon the envelope for this email will also be gone.

This is a special feature of an email that is in-buffer, indicated by a leading w or u. Anything else is interpreted in the usual way. If you want to write the text somewhere with no backup email in ~/.trash/rawmail, and no attachments, type ",w filename".

If you move the email away with the M command, this special functionality is lost. u means undo as usual. You can still save the raw email if you wish, by ub and then w. Or save the attachments by ub and then b. The imap client shortcuts are lost, and that's not a big deal, as long as you are aware of it. It's probably best to leave the email where it is.

The special write commands are also available on the envelopes page. Again, it is a leading w or u with no prefix, and it applies to the current line, that is to say, the email you are on. Edbrowse prints a byte count when the email is written, like writing any other file, then it prints the envelope you are on. This will be the next envelope if you used capital W or U to write and delete the email. The imap client works exactly the same way.

On the envelopes page, the r command, without suffix, marks a mail as read, without having to read it. Thus ,r marks all emails as read. If you have u in your envelope format, the stars go away.

Use r- to mark an email as unread, as though you had not seen it. If you have u in your envelope format, the stars reappear.

The reply commands re and rea can be used on an envelope. This is simply shorthand for g followed by re.

[⬆️](#top)
<br><br><br><br>


# Chapter 8 IRC Client
## Using IRC
Edbrowse can participate in irc chat sessions, on multiple servers in parallel. An example is perhaps the best form of documentation. Issue this command to join the edbrowse developers on irc.
```
irc 8 9 irc.libera.chat nickname #edbrowse
```
Use your nickname here; whatever nickname you want for your irc session. If you have established a password, use nickname:password. This is consistent with ftp and other protocols.

Use domain:port for a different port; default is 6667. Place * before the port number for secure sockets, e.g. :*3000. This is consistent with the ports in an email block in the config file. :* alone uses the default port for secure irc, 6697.

The group is optional. If you don't specify a group on the irc line, You will have to send :j group to the server to join a group. Note, these groups are also called channels in the irc world. I may use these terms interchangeably.

Sessions 8 and 9 are created or commandeered for this irc chat, and you will be left in session 9. Session 9 is readonly; although you can delete lines if you wish. IRC comments are appended to this buffer as they arrive, and to the log if irc logging is enabled. If you are at the end of the buffer, just hit return to see if anything new has come in. Switch to other sessions, do some work, then go back to session 9 and hit return. You may want an instance of edbrowse running in its own console, to manage all your irc sessions.

Session 8 is for your input. Create some text, then type w to send. The text will go away as it is sent to the server. Switch to session 9 and you will see your comments, and then any replies from your friends. Switch to session 8 to send more text, and so on. You will probably want a function to switch to session 8 on your behalf, and send one line as entered. You can switch to session 8 manually when you want to compose a paragraph, or read in some lines that you want to send, or otherwise use the power of the editor.

If you quit either session, the socket is closed, and the other session is no longer in irc mode. It is simply text. However, q is not allowed in either of these sessions. It is too easy to send some text and then quit by accident, typing w and then q out of habit. I've done it many times. If you wish to quit session 8, and keep session 9, retaining a log of the irc chat, type .w8 from session 9. This blows away session 8, and the irc connection associated with it. If that was the only irc channel feeding into session 9, then it has become a text buffer, and you can quit that session as well.

If you sent several lines of text to Fred, only to discover he was offf line, and you want to send them again, mark the block of text in session 9 with labels a and b, and do this.
```
'a,'bw8@0
e8
,s/^.*?> *//
w
e9
```
When you write text back into session 8, the at syntax adds to the buffer, and does not blow it away. You can then get rid of your nickname at the start of every line, and send it again.

At debug level 0 or 1 you will see the conversations, your comments and those of the other participants. Debug level 2 brings in the JOIN, QUIT, and PART notifications as other people join and leave the channel. This can be useful, knowing whether Fred is still online. Debug level 4 prints the ping pong messages to and from the server. These are not logged, just printed. This is like the http headers that appear at level 4, i.e. the metadata that supports the transport of the actual data.

Irc uses sockets directly, and does not go through curl. Secure sockets use openssl, which is also used by some instances of curl, though others use gnutls. We hope that irc and curl will not collide in any way, as they both use openssl.

Edbrowse recognizes some shorthand colon commands when sending to the server. We already mentioned :j group, which joins a group. The file names of sessions 8 and 9 will change when you join a group.
```
:l leaves a group. This is the opposite of :j.
```
:s group, switches to a different group. It is possible to join multiple groups through the same irc session, assuming they are on the same irc server. Use :s to switch between these groups, so that your messages go out on the correct channels. The filename will reflect the active group. Type f to see which group you are sending to.

:m nickname text, sends a private message to a person on your chat session. Others will not see this message.

It is possible to multiplex some or all of the output from different irc servers into one window. This has the advantage of watching for irc responses in one place. Just hit return and see if anyone has commented, from any of your groups. However, you have to determine the origin of each comment, and move to the correct send buffer, to respond on the corresponding server. Commands like these will multiplex the output in buffer 9.
```
irc 7 9 foo.bar.org nickname group1
irc 8 9 hork.snork.net+ nickname group2
```
The bflist command will include:
```
7: group1 send
8: group2 send
9: group1 group2 receive
```
The + on the second domain causes "group2" to be displayed with each message from that channel. This disambiguates which message comes from which channel. Each connection can display its channels or not, as indicated by the presence or absence of + on the irc domains. When channels are shown, the format is channel<sender> message. In the event of a private message, channel is replaced with the receiver. In other words, you are having a conversation with a person, not a channel.

The lst command lists the mod time of the file on the current line, when you are in directory mode. Similarly, lst gives the time of the current message in irc mode. Thus you can determine when things were said on the channel. The other ls commands do not apply here.


## IRC Log
Set irclog = filename in your config file, to log your irc sessions. This makes certain assumptions about how you use irc. It assumes all your irc output merges into one session on one instance of edbrowse. Each message comes into the buffer, and is also appended onto the log file. If you close or lose your irc session, and restart it, the log is loaded back into the buffer. It is a faithful representation of what you just saw. Furthermore, the reload preserves the time stamps on each line, so lst still provides the time of each message.

Now, let's ask what happens if you don't use irc in this manner. Separate channels have their output in separate buffers, perhaps in multiple instances of edbrowse running on separate consoles. Each message is still appended to the one and only log file. If a session closes, and then irc restarts, the log file is loaded into that buffer. This is a merge of all the irc channels you were monitoring, as if they all went into one buffer. The same thing happens if you restart irc in another edbrowse process. It too will have the same log, all your irc traffic merged together.

If you continue to monitor channels in separate buffers, each buffer will continue on with its own separate chat, but the log file will grow with all the messages merged together, as it did before. This is not a harmful or unreasonable behavior, and it was the easiest to implement. However, most users find it simpler to monitor all their irc channels in one place, whence the log faithfully represents what they are seeing in real time.

On a multi-user system, create this log file mode 600, or put it in a directory that is mode 700, so that others cannot read your irc chats.


[⬆️](#top)
<br><br><br><br>

# Chapter 9 Database Access
## Building edbrowse with Database Access
Edbrowse can connect to sql databases through odbc. This assumes you have the unixODBC and unixODBC-devel packages installed on your machine. A separate target, edbrowseinf, provides a direct link to an Informix database. This works, but is not generally supported. Other database specific edbrowse connectors could be built. You are basically implementing the interface described in dbapi.h, using the C database development toolkit provided by the vendor. Since odbc connects to everything, it will probably meet your needs.


## Reading Tables
When a file name is of a certain format, with http:// in front, it is deemed to be a url. Edbrowse does not look on your computer for the file; it goes out to the Internet. Similarly, when the file name has a certain format, it is assumed to be a table or view in the database. If you have a table called customers, put it in right brackets.
e ]customers]

This allows you to bring in the entire table, or portions thereof, one row per line, with fields delimited by pipes. If the result looks like a bunch of numbers and pipes, and you have forgotten the structure of the table, use the shc (show columns) command. The output might look like this.
```
Table customers, 536281 rows
1 *custnum int
2 firstname string
3 lastname string
4 birthdate date
5 sex char
6 email string
7 picture blob
```
The first column is a unique number that designates this particular customer. After all, two customers could have the same first and last name, and even the same birthdate. Serial numbers are always a good idea, and that usually becomes the primary key. This is indicated by a star just before the column name. When edbrowse changes or deletes a record, the primary key is used. I assume, at all times, that the key determines a unique record in the database, and that each record appears at most once in an editing session. You could read customer 37 in twice, thus having two copies in your buffer, but don't do it!

Note that edbrowse can support a primary key with two or three columns, such as a serial number and a modifier. More than three key columns are not supported. If the primary key comprises more than three columns, or if the table has no primary key, you will not be able to update or delete. Rows in the table are readonly.

The table syntax is more than just an identifier between brackets. You can follow the second bracket with a where clause. This is important if you don't want the entire table, especially if there are millions of rows. Here are some table commands and their meanings.
```
]customers]
```
Set the buffer up for the customers table, but don't fetch any rows.
```
]customers]*
```
Fetch all the rows in the table.
```
]customers]37
```
Fetch the customer whose serial number is 37. The primary key is assumed; your table has to have a primary key if you are going to use this syntax.
```
]customers]1=37
```
Fetch the row whose first column is 37.
```
]customers]37-59
```
Fetch the customers with serial numbers between 37 and 59 inclusive.
```
]customers]3=Smith
```
Fetch the customers whose last name is Smith.
```
]customers]lastname=Smith
```
Same as above.
```
]customers]last=Smith
```
Same as above. If the string uniquely gloms onto a column name, we're all set.
```
]customers]last=Barn%
```
Fetch the customers whose last names begin with Barn. This uses the like operator in sql, like "Barn%". This operator is more portable than matches or glob. However, it is case insensitive, thus you would get the same rows with last=barn%. Unfortunately this makes it difficult to use an index on last name, if there is one, for fast retrieval.
```
]customers]birth=01/01/1960-12/31/1960
```
Fetch the customers who were born in 1960.

It is usually best to edit with a blank template, i.e. without a where clause. Then you can read in whatever rows you like. Type an r before any of the strings shown above to read rows into your buffer. Note, you cannot read data from different tables into the same buffer, but you can switch to another editing session to look at another table without losing the rows you are working on.

When reading rows into a growing buffer, you can usually omit the table, since it has to be ]customers] every time. For instance, you can bring in customer #738 by typing `r ]customers]738' or `r 738'.

If you want a clean slate, type `rf' to refresh the buffer. This brings you back to a template for the table with no rows. WARNING - do not clear your buffer by deleting all the rows, as that will delete the corresponding entries in the database. This feature works just like directory mode - your edits are translated into actions in the real world, so be careful! Referential integrity might save you from this accidental delete disaster, if you routinely use this sql feature to link tables together, which is a good idea at many levels. But don't rely on it!

Now, how about the seventh column in our example, the one called "picture"? This is the customer's picture, a jpg image that is in binary, and cannot be easily folded into an editing session. Instead, it is stored in another session, e.g. session 9, and this is indicated by <9>. You can switch to session 9 and save the file, or throw it away.
```
2139|Fred|Flintstone|08/21/1969|M|foo@bar.bar.com|<9>
```
Binary columns are not fetched by default. You usually don't want them anyways. To fetch binary columns, use the fbc command. It is not possible to fetch more than one binary column at a time, so make sure your select only grabs one such column.


## Data source
To do anything with the database, your config file must specify the name of the data source, the login, and the password. Data source must match one of the entries in your .odbc.ini file. Login and password can sometimes be omitted, if they are inferred from your identity on the computer, or they are set in the data source in your .odbc.ini file. Here is how the line might look if you are tapping into the retail database, where the customers table resides.
datasource = retail,mylogin,mypassword

This can be changed at run time by the ds= command. Make sure you do not refer to any old rows in your buffer after you have switched to a new data source.

In some cases you can access other databases without changing the data source. For instance, you can read the parts table in the inventory database by calling up ]inventory:parts]. This is standard sql syntax for looking at tables in another database; edbrowse just passes it through.


## Insert, Update, Delete
Now that we have run a few selects, let's modify some data. These operations are known as insert, update, and delete in the database world.
Adding database rows is substantially different from adding text. Since a row may contain a dozen fields, and you may not remember what goes where, edbrowse prompts you for each field in turn. It also checks the integrity of each field as you go, e.g. a date has to look like mm/dd/yyyy etc. If a row cannot be added because of a database error, edbrowse prints the error and data entry continues, giving you a chance to reenter the row. Data entry stops when you enter a period all by itself, no matter what field you are on. The rows that were entered successfully will be present in your buffer, and the current line is the last entered row. Blobs cannot be entered at this time.

A row appears as you typed it; and this may differ from the actual values in the database. for instance, you might put a null into a field that is "default 3". Within the database, the value is 3, but there is nothing in that field in your buffer. Another field might truncate a floating point number, according to the precision of that column. Another field might be type serial, and turn 0 into the next serial number. And then there are triggers. There are many ways data can be modified as it enters the database. It would be better to refresh each row as it is inserted, so you could see exactly what is there, but this is not implemented yet. remember, you can always type `rf' to get an empty buffer, and then reread the rows you just inserted.

If the first column of the primary key is an integer, and you enter a 0, edbrowse selects the next number in sequence. Some databases do this internally, some don't, thus it is done at the front end. There is a possible race condition here, if you and somebody else glom onto the same serial number, but it's not likely, and it will create a "duplicate key" error in any case.

Use the substitute command to update a row. Make sure you don't accidentally introduce an additional pipe, or remove a pipe. Key columns cannot be modified. If you are updating many rows with one command, through a range or through g//s, and an error occurs while updating the database, substitution stops in its tracks. The editing session will reflect the database, with some rows changed and others untouched. There are many reasons for these update errors, including datatype mismatch (e.g. pushing an integer into a date field), and check constraints (e.g. putting J in for sex instead of M or F). If you have any say in the database design, apply check constraints wherever they make sense. They will protect you from erroneous substitutions that would produce inconsistent data.

Delete works as you would expect; delete a row, and the corresponding entry disappears. There is no undo command. It couldn't be done in any case, since you may have selected only part of the row (see below), and I wouldn't have all the data to put the row back. As mentioned before, referential integrity should be employed wherever it makes sense. As a last check, I only let you delete 100 rows at a time. Be careful, and run regular backups.


## Table Descriptors
Suppose a table contains 100 fields. Displaying all those fields is awkward, to say the least. Sometimes you are interested in a group of 6 fields, and sometimes you are interested in another group of 8. You can set up virtual tables, similar to views, in your config file. The short name is the alias, and you can call up the table using this alias. It will contain only the columns you specify. Here are two descriptors for the aforementioned customers table.
```
table {
    tname = customers
#  cnm is my cryptic shorthand for customer name
#  I want to be cryptic here, cause I'm going to be typing this a lot.
    tshort = cnm
    cols = custnum,firstname,lastname
#  Specify the primary key, in this case, the first column selected.
    keycol = 1
}

table {
    tname = customers
#  All I care about here is customer and birthdate.
    tshort = cbd
    cols = birthdate,custnum
    keycol = 2
}
```
When inserting a row through one of these descriptors, you are only specifying a subset of the columns in the table. The other columns will be null, or they will take on their default values as specified by the schema. If you receive a Not-Null error, it could be due to one of the other columns, which requires an entered value. It is usually safer to insert a row using the complete table.


## Go SQL
If you know the trick, you can feed sql statements directly to the database, similar to the isql program that ships with odbc. Within a text buffer (not a table buffer), place a right bracket at the beginning of a line, then write your sql statement. Your statement can run across many lines, but it must have a semicolon at the end of the last line, or a leading right bracket at the beginning of the following line. Type g by itself to go, thus sending the statement to the database. This is similar to g on a web page, which goes to a hyperlink. Edbrowse reports any errors, or the number of rows modified. In a select statement, the fetched rows will appear just below the statement, with pipes delimiting the columns. All this happens in the current buffer. Delete what you don't need (it's just text), or save the data to a file and import it into a spreadsheet. For your convenience, fetched rows will be delimited by the labels 'a and 'b. Thus you can save the data with a 'a,'bw command.

Canned queries can be saved in a file for future use. Call them up, modify parameters, and go again, like a qbe screen.
```
] select * from customers, address
where custnum = addrnum and addrtype = "HOME"
and custnum between 500 and 600;
```

## Pipes in the Data
Since | is our reserved separator, what happens if the strings contain pipes? Edbrowse escapes each literal pipe with a backslash. If Fred's first name has a pipe in it, it might present as Fr\|ed|Flintstone. (The pipe is silent, of course.) A backslash in any other context is simply a backslash. It means nothing to edbrowse or SQL. If his first name presents as F\r\|ed, then it is F\r|ed in the database. Remember this convension as you use the s command to update a row. When inserting a pipe, where there was none before, you have to insert \|. If you don't, it will look like a field separator, and edbrowse will tell you the line has too many fields.

When entering a new row field by field, (in append mode), there is no need to escape the pipe. Each field is added one at a time, and thus there is no confusion; the pipe is not ambiguous. Enter the first name as Fr|ed, and it will go into the database that way, then present as Fr\|ed in the new row in the edbrowse buffer.

Neither should you escape a | when feeding sql directly into the engine using the go sql feature.
```
] update customer set firstname = "Fr|ed" where custnum = 2139;
g
```
This pipe convension supports almost every row in almost every database, however, it fails if a field ends in a backslash. That naturally blends into the pipe that is the field separator. Such data cannot be represented in edbrowse. If you try to read it into a buffer, corresponding to that table, edbrowse prints an error, "field ends in backslash", and aborts the read. It's not a perfect solution.

Since the row is represented on one edbrowse line, it can't contain a newline. If there are nonascii characters, we hope they are utf-8, or they will display strangely.


## Unfolded Rows
The ur command unfolds a row, just as it does with an html table. The row begins with the keyword @row:, then each line contains a field in that row. The format is fieldname:value. This is particularly useful for wide tables, i.e. tables with many columns. Unfold a row and find the field you are looking for. Furthermore, you can update this field with the s command, and you won't accidentally update a different field, as could easily occur when they are all on one line. See below for more details.

Type ur again, or ur-, to put the row back on one line.

When a row is unfolded, pipes are no longer escaped with a backslash. Since there is only one field per line, there is no ambiguity.

An unfolded row cannot be deleted. Type ur and then d to delete the row. I may change this behavior in the future, but for now, people might think they are deleting that particular field, and then the whole row goes away, and that could cause confusion.

If you append rows while in the middle of an unfolded row, edbrowse moves to the end of that row. An unfolded row is a block of text that cannot be broken up. Similarly, the m command will not move part of an unfolded row, nor move other text into the middle of an unfolded row.

The unfolded row is particularly useful when updating a field in a wide table. A substitute command on a long line might inadvertantly update the wrong field, which could then invoke an sql trigger, which could have cascading effects that are difficult to undo. However, if the row is unfolded, you are looking at one field at a time. The s command can only affect that field. This runs the sql update, just as it would if the row was on one line. Remember that pipes need not be escaped here. s/Fred/Fr|ed/ places a pipe in the middle of Fred's name. Type ur, to put the row on one line, and his name presents as Fr\|ed, to disambiguate from the field separators. Type ur again and the field goes back to Fr|ed.
