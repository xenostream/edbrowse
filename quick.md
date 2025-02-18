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
