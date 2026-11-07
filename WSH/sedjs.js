
// [사용법]
// 이름
//     sed - 텍스트 필터링 및 변환용 스트림 편집기
//
// 구문
//     sed [OPTION]... {script-only-if-no-other-script} [input-file]...
//
// 설명
//     sed는 스트림 편집기이다.
//     스트림 편집기는 입력 스트림(파일 또는 파이프라인)에 텍스트 변환을 수행하는 데 사용된다.
//     편집 스크립트를 사용할 수 있고 입력에 한 번의 패스로 작동하므로 효율적이다.
//     파이프라인 텍스트에 필터 기능을 수행할 수 있으므로 다른 유형의 편집기와 다르다.
//
// OPTION
//     /n, /quiet, /silent
//         패턴 공간의 자동 출력 기능을 억제한다.
//
//     /e script, /expression script
//         실행할 명령으로 script 를 추가한다.
//
//     /f script-file, /file script-file
//         실행할 명령어로 script-file 의 내용을 추가한다.
//
//     /b br, /break br
//         줄바꿈 코드로 br 을 지정한다. 지정할 수 있는 값은 \r, \n, \r\n 중 하나이다.
//         기본값은 \r\n (Windows 표준 줄바꿈 코드)이다.
//
//     /?, /help
//         도움말을 표시하고 종료한다.
//
//     /v, /version
//         버전 정보를 출력하고 종료한다.
//
//
// 일반적인 sed와 다른점
//     Windows 줄바꿈 코드(\r\n)를 사용할 수 있다.
//
//     s 명령어의 인수를 /regexp/replacement/ 로 지정할 경우, regexp 는 JScript의 정규 표현식을 따른다.
//     또한, replacement 에서 역참조할 때 $ 기호를 사용한다(예: $&, $1, $2...).
//
//     컴파일 시 정규 표현식을 재사용할 수 없다.
//
//     주소 지정 방법으로 addr,+N 및 addr,~N 은 지원하지 않는다.
//     단일 주소의 step 지정(addr~N)은 지원한다.
//
//     e 명령은 Windows 쉘 명령을 실행하며 주소 지정을 지원한다.
//     s 명령의 e 플래그는 치환 결과를 쉘 명령으로 실행한다.
//

// [Version]
// sed.js version 0.4

function error(m) {
    WScript.StdErr.WriteLine(m);
    WScript.Quit(1);
}

function view(label) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var file = fso.OpenTextFile(WScript.ScriptFullName);
    var line;

    while (!file.AtEndOfStream) {
        line = file.ReadLine();
        if (line.indexOf("// [" + label + "]") === 0) {
            while (!file.AtEndOfStream) {
                line = file.ReadLine();
                if (line.indexOf("//") === -1) { break; }
                WScript.StdOut.WriteLine(line.slice(3));
            }
            break;
        }
    }
    file.Close();
}

function get_next_arg(index) {
    if (index < WScript.Arguments.length) {
        return WScript.Arguments(index);
    } else {
        WScript.StdErr.WriteLine("sed: arguments error");
        WScript.Quit(1);
    }
}

function echo(m) {
    WScript.Echo(m);
}

function sed(opts, scripts, files) {
    function Statement(addr, cmd) {
        this.next = null;
        this.addr = addr;
        this.cmd = cmd;
    }

    Statement.prototype = {
        type: "STATEMENT",
        toString: function() {
            return "(" + this.type + " " + this.addr.toString() + " " + this.cmd.toString() + ")";
        }
    };

    function RangeAddress(addr1, addr2) {
        this.addr1 = addr1;
        this.addr2 = addr2;
        this.state = "UNMATCH";
    }

    RangeAddress.prototype = {
        type: "RANGE_ADDRESS",
        match: function(sed_state) {
            var ret;
            switch (this.state) {
            case "UNMATCH":
                ret = this.addr1.match(sed_state);
                if (ret) { this.state = "MATCH"; }
                break;
            case "MATCH":
                ret = true;
                if (this.addr2.match(sed_state)) { this.state = "UNMATCH"; }
                break;
            default:
                error("");
            }
            return ret;
        },
        toString: function() {
            return "(" + this.type + " " + this.addr1.toString() + " " + this.addr2.toString() + ")";
        }
    };

    function StepAddress(addr, step) {
        this.first = addr.num;
        this.step = step;
    }

    StepAddress.prototype = {
        type: "STEP_ADDRESS",
        match: function(sed_state) {
            return sed_state.line_num % this.step === this.first;
        },
        toString: function() {
            return "(" + this.type + " " + this.first + " " + this.step + ")";
        }
    };

    function NumberAddress(num) {
        this.num = num;
    }

    NumberAddress.prototype = {
        type: "NUMBER_ADDRESS",
        match: function(sed_state) {
            return sed_state.line_num === this.num;
        },
        toString: function() {
            return "(" + this.type + " " + this.num + ")";
        }
    };

    function RegexAddress(re) {
        this.re = re;
    }

    RegexAddress.prototype = {
        type: "REGEX_ADDRESS",
        match: function(sed_state) {
            return this.re.test(sed_state.pattern.join(opts.br));
        },
        toString: function() {
            return "(" + this.type + " " + this.re.source + ")";
        }
    };

    function TailAddress() {
        this.value = "$";
    }

    TailAddress.prototype = {
        type: "TAIL_ADDRESS",
        match: function(sed_state) {
            return sed_state.AtEndOfStream;
        },
        toString: function() {
            return "(" + this.type + " " + this.value + ")";
        }
    };

    function NotAddress(addr) {
        this.addr = addr;
    }

    NotAddress.prototype = {
        type: "NOT_ADDRESS",
        match: function(sed_state) {
            return !this.addr.match(sed_state);
        },
        toString: function() {
            return "(" + this.type + " " + this.addr.toString() + ")";
        }
    };

    function BlankAddress() {
    }

    BlankAddress.prototype = {
        type: "BLANK_ADDRESS",
        match: function() {
            return true;
        },
        toString: function() {
            return "(" + this.type + ")";
        }
    };

    function Command(name, args) {
        this.name = name;
        this.args = args;
    }

    Command.prototype = {
        type: "COMMAND",
        toString: function() {
            var buf = [], i, len, item;
            buf.push("(" + this.name);
            if (this.name === "GROUP") {
                buf.push(" ");
                for (item = this.args[0]; item; item = item.next) {
                    buf.push(item.toString());
                }
            } else {
                for (i = 0, len = this.args.length; i < len; i++) {
                    buf.push(" ");
                    buf.push(this.args[i].toString());
                }
            }
            buf.push(")");
            return buf.join("");
        }
    };

    function vmachine(opts, scripts) {
        function error(m) {
            WScript.StdErr.WriteLine("sed: runtime error: " + m);
            WScript.Quit(1);
        }

        function echo(m) {
            WScript.StdOut.WriteLine(m);
        }

        function parse(text) {
            var at, ch;

            function error(m) {
                WScript.StdErr.WriteLine("sed: parse error: " + m + " at " + at);
                WScript.Quit(1);
            }

            function next() {
                at++;
                ch = text.charAt(at);
                return ch;
            }

            function white() {
                while (ch && ch <= " ") { next(); }
            }

            function space_break() {
                while (ch === " " || ch === "\t") { next(); }
                switch (ch) {
                case "":
                case "\r":
                case "\n":
                case "}":
                    break;
                default:
                    error("require break.");
                }
            }

            function program() {
                var ret = statements();
                white();
                if (ch !== "") { error("unexpected `" + ch + "'"); }
                return ret;
            }

            function statements() {
                var list_head = statement();
                var list_item = list_head;
                white();
                while (ch !== "") {
                    if (ch === "}") { break; }
                    list_item.next = statement();
                    list_item = list_item.next;
                    white();
                }
                return list_head;
            }

            function statement() {
                var addr, cmd, skip = /[ \n\r\t;]/;
                while (skip.test(ch)) { next(); }
                addr = address();
                white();
                cmd = command(addr);
                return new Statement(addr, cmd);
            }

            function address() {
                var addr, tmp;

                if (is_number(ch)) {
                    addr = new NumberAddress(number());
                    if (ch === "~") {
                        next();
                        addr = new StepAddress(addr, number());
                    }
                } else if (ch === "/") {
                    addr = new RegexAddress(regex(ch));
                    addr.re.ignoreCase = true;
                    next();
                } else if (ch === "\\") {
                    next();
                    addr = new RegexAddress(regex(ch));
                    next();
                } else if (ch === "$") {
                    addr = new TailAddress();
                    next();
                } else {
                    return new BlankAddress();
                }

                white();
                if (ch === ",") {
                    next();
                    white();
                    if (is_number(ch)) {
                        tmp = new NumberAddress(number());
                    } else if (ch === "/") {
                        tmp = new RegexAddress(regex(ch));
                        next();
                    } else if (ch === "\\") {
                        next();
                        tmp = new RegexAddress(regex(ch));
                        next();
                    } else if (ch === "$") {
                        tmp = new TailAddress();
                        next();
                    } else {
                        error("missing range end address");
                    }
                    addr = new RangeAddress(addr, tmp);
                }
                white();
                if (ch === "!") {
                    addr = new NotAddress(addr);
                    next();
                }
                return addr;
            }

            function command(addr) {
                var name, args = [], tmp;
                name = ch;
                next();
                switch (name) {
                case "":
                    if (addr.type !== "BLANK_ADDRESS") { error("missing command"); }
                    break;
                case "}":
                    error("unexpected `}'");
                case "#":
                    if (addr.type !== "BLANK_ADDRESS") { error("doesn't want any address"); }
                    white();
                    args.push(string_line());
                    break;
                case ":":
                    if (addr.type !== "BLANK_ADDRESS") { error("doesn't want any address"); }
                    white();
                    args.push(string_line());
                    break;
                case "{":
                    name = "GROUP";
                    args.push(statements());
                    white();
                    if (ch === "}") {
                        next();
                    } else {
                        error("unmatched `{'");
                    }
                    break;
                case "=":
                case "d":
                case "D":
                case "h":
                case "H":
                case "g":
                case "G":
                case "n":
                case "N":
                case "p":
                case "P":
                case "x":
                    while (/[ ;\t\r\n]/.test(ch)) { next(); }
                    break;
                case "q":
                case "Q":
                    tmp = number_opt();
                    if (tmp !== undefined) { args.push(tmp); }
                    break;
                case "b":
                case "t":
                case "T":
                    while (ch === " " || ch === "\t") { next(); }
                    args.push(string_line());
                    break;
                case "r":
                case "R":
                case "w":
                case "W":
                    white();
                    tmp = string_line();
                    if (!tmp) { error("missing files"); }
                    args.push(tmp);
                    break;
                case "a":
                case "i":
                case "c":
                    white();
                    tmp = string();
                    if (!tmp) { error("missing string"); }
                    args.push(tmp);
                    break;
                case "e":
                    while (ch === " " || ch === "\t") { next(); }
                    args.push(string_line());
                    break;
                case "l":
                    while (/[ \t\r\n;]/.test(ch)) { next(); }
                    break;
                case "s":
                    args.push(regex(ch));
                    args.push(replacement(ch));
                    next();
                    tmp = flags();
                    args.push(tmp);
                    args[0] = new RegExp(args[0].source, tmp.replace(/[^igm]/g, ""));
                    if (tmp.indexOf("w") > -1) {
                        while (/[ \t]/.test(ch)) { next(); }
                        tmp = string_line();
                        if (!tmp) { error("file?"); }
                        args.push(tmp);
                    }
                    break;
                case "y":
                    args.push(src(ch));
                    args.push(dest(ch));
                    next();
                    if (args[0].length !== args[1].length) {
                        error("strings for 'y' command are different lengths.");
                    }
                    break;
                default:
                    error("unknown command: '" + name + "'");
                }
                return new Command(name, args);
            }

            function flags() {
                var flag = { "m": "", "g": "", "i": "", "p": "", "w": "", "e": "" };
                var flag_char = /[migpwe]/;

                while (flag_char.test(ch)) {
                    if (flag[ch]) { error("duplicate flag"); }
                    flag[ch] = ch;
                    next();
                }
                return values(flag).join("");
            }

            function values(obj) {
                var iter, ary = [];
                for (iter in obj) {
                    if (obj.hasOwnProperty(iter) && obj[iter]) {
                        ary.push(obj[iter]);
                    }
                }
                return ary;
            }

            function src(delim) {
                return quoted_string(delim);
            }

            function dest(delim) {
                return quoted_string(delim);
            }

            function replacement(delim) {
                return quoted_string(delim);
            }

            function quoted_string(delim) {
                var buf = [];
                if (ch === "") { error(""); }
                next();
                while (ch !== delim) {
                    if (ch === "" || ch === "\r" || ch === "\n") { error(""); }
                    if (ch === "\\") {
                        next();
                        buf.push(escape());
                    } else {
                        buf.push(ch);
                        next();
                    }
                }
                return buf.join("");
            }

            function string_line() {
                var buf = [];
                while (ch !== "") {
                    if (ch === "\r" || ch === "\n" || ch === ";") { break; }
                    buf.push(ch);
                    next();
                }
                return buf.join("");
            }

            function string() {
                var buf = [];
                while (ch !== "") {
                    if (ch === "\r" || ch === "\n") { break; }
                    if (ch === "\\") {
                        next();
                        buf.push(escape());
                    } else {
                        buf.push(ch);
                        next();
                    }
                }
                if (buf.length === 0) { error("not string"); }
                return buf.join("");
            }

            function number_opt() {
                var buf, digit;
                while (ch === " " || ch === "\t") { next(); }
                if (ch === "" || ch === "\r" || ch === "\n" || ch === ";" || ch === "}") { return; }
                if (!is_number(ch)) { error("not number"); }
                buf = 0;
                while (is_number(ch)) {
                    digit = +ch;
                    buf = buf * 10 + digit;
                    next();
                }
                return buf;
            }

            function number() {
                var ret;
                if (!is_number(ch)) { error("not number"); }
                ret = +ch;
                next();
                while (ch !== "") {
                    if (!is_number(ch)) { break; }
                    ret = ret * 10 + (+ch);
                    next();
                }
                return ret;
            }

            function regex(delim) {
                var buf = [];
                next();
                while (ch !== delim) {
                    if (ch === "") { error("not closed regex"); }
                    if (ch === "\\") {
                        switch (next()) {
                        case "t": buf.push("\t"); break;
                        case "n": buf.push("\n"); break;
                        case "r": buf.push("\r"); break;
                        case "\\": buf.push("\\\\"); break;
                        case delim: buf.push(delim); break;
                        default: buf.push("\\" + ch); break;
                        }
                    } else {
                        buf.push(ch);
                    }
                    next();
                }
                return new RegExp(buf.join(""));
            }

            function escape() {
                var buf = [];
                switch (ch) {
                case "\\":
                    buf.push(ch);
                    next();
                    break;
                case "\r":
                    buf.push(ch);
                    next();
                    if (ch === "\n") {
                        buf.push(ch);
                        next();
                    }
                    break;
                case "\n":
                    buf.push(ch);
                    next();
                    break;
                case "t":
                    buf.push("\t");
                    next();
                    break;
                case "n":
                    buf.push("\n");
                    next();
                    break;
                case "r":
                    buf.push("\r");
                    next();
                    break;
                case "x":
                    buf.push(hex());
                    break;
                default:
                    buf.push(ch);
                    next();
                    break;
                }
                return buf.join("");
            }

            function hex() {
                var xffff = 0, i, digit;
                next();
                for (i = 0; i < 4; i++) {
                    digit = parseInt(ch, 16);
                    if (!isFinite(digit)) { break; }
                    xffff = (xffff * 16) + digit;
                    next();
                }
                return String.fromCharCode(xffff);
            }

            function is_number(c) {
                return "0" <= c && c <= "9";
            }

            at = 0;
            ch = text.charAt(at);
            return program();
        }

        function scan(item, func) {
            while (item) {
                if (item.cmd.name === "GROUP") {
                    scan(item.cmd.args[0], func);
                } else {
                    func(item);
                }
                item = item.next;
            }
        }

        function run_shell(command) {
            var shell = new ActiveXObject("WScript.Shell");
            var process, output, err;

            try {
                process = shell.Exec("%COMSPEC% /d /s /c " + quote_shell(command));
                output = process.StdOut.ReadAll();
                err = process.StdErr.ReadAll();

                if (process.ExitCode !== 0 && err !== "") {
                    WScript.StdErr.WriteLine(err);
                }

                output = output.replace(/\r\n|\r|\n$/, "");
                return output;
            } catch (e) {
                error("shell execution failed: " + e.message);
            }
        }

        function quote_shell(command) {
            return "\"" + command.replace(/"/g, "\\\"") + "\"";
        }

        function cmd_text(cmd) {
            var text = cmd.args[0];
            switch (cmd.name) {
            case "i":
                insert_text.push(text);
                break;
            case "c":
                pattern = [text];
                break;
            case "a":
                append_text.push(text);
                break;
            }
        }

        function cmd_read(cmd) {
            var path = cmd.args[0];
            var file, text;

            if (!fso.FileExists(path)) { return; }

            try {
                file = fso.OpenTextFile(path, 1, false);
                text = file.ReadAll();
                file.Close();

                if (text === "") { return; }

                text = text.replace(/\r\n|\r|\n/g, "\n");
                if (text.charAt(text.length - 1) === "\n") {
                    text = text.substring(0, text.length - 1);
                }
                append_text = append_text.concat(text.split("\n"));
            } catch (e) {
                if (file) {
                    try { file.Close(); } catch (ignore) {}
                }
            }
        }
        
        function cmd_read_line(cmd) {
            var path = cmd.args[0];
            var file;

            if (!readFiles[path]) {
                if (!fso.FileExists(path)) { return; }
                try {
                    readFiles[path] = fso.OpenTextFile(path, 1, false);
                } catch (e) {
                    return;
                }
            }

            file = readFiles[path];

            if (!file.AtEndOfStream) {
                append_text.push(file.ReadLine());
            }
        }
        
        function cmd_print(cmd) {
            var text;
            if (pattern.length === 0) { return; }

            switch (cmd.name) {
            case "p":
                text = pattern.join(br);
                break;
            case "P":
                text = pattern[0];
                break;
            }
            echo(text);
        }

        function cmd_list(cmd) {
            var i, j, text, ch, code, result;

            for (i = 0; i < pattern.length; i++) {
                text = pattern[i];
                result = "";

                for (j = 0; j < text.length; j++) {
                    ch = text.charAt(j);
                    code = text.charCodeAt(j);

                    switch (code) {
                    case 7: result += "\\a"; break;
                    case 8: result += "\\b"; break;
                    case 9: result += "\\t"; break;
                    case 10: result += "\\n"; break;
                    case 11: result += "\\v"; break;
                    case 12: result += "\\f"; break;
                    case 13: result += "\\r"; break;
                    case 27: result += "\\033"; break;
                    case 92: result += "\\\\"; break;
                    case 127: result += "\\177"; break;
                    default:
                        if (code < 32) {
                            result += "\\" + ("00" + code.toString(8)).slice(-3);
                        } else {
                            result += ch;
                        }
                    }
                }
                echo(result + "$");
            }
        }

        function cmd_next(cmd) {
            if (stream.AtEndOfStream) { return; }

            switch (cmd.name) {
            case "n":
                pattern = [stream.ReadLine()];
                break;
            case "N":
                pattern.push(stream.ReadLine());
                break;
            }
            line_num += 1;
        }

        function cmd_quit(cmd) {
            if (cmd.name === "q") {
                echo(pattern.join(br));
            }
            WScript.Quit(cmd.args.length === 0 ? 0 : cmd.args[0]);
        }

        function cmd_write(cmd) {
            var path = cmd.args[0];
            var mode = writtenFiles[path] ? 8 : 2;
            var file = fso.OpenTextFile(path, mode, true);
            var text;

            switch (cmd.name) {
            case "w":
                text = pattern.join(br);
                break;
            case "W":
                text = pattern[0];
                break;
            }

            file.Write(text + br);
            file.Close();
            writtenFiles[path] = true;
        }

        function cmd_branch(cmd) {
            var bool, label;

            switch (cmd.name) {
            case "b":
                bool = true;
                break;
            case "t":
                bool = substitute_succeeded;
                break;
            case "T":
                bool = !substitute_succeeded;
                break;
            }

            label = cmd.args[0];
            if (bool) {
                next_stack = [];
                pc = label ? labels[label] : null;
            }
        }

        function cmd_execute(cmd) {
            var command = cmd.args[0];
            var output;

            if (!command) { return; }

            output = run_shell(command);
            pattern = output === "" ? [] : output.split(/\r\n|\r|\n/);
        }

        function cmd_substitute(cmd) {
            var file, regexp = cmd.args[0];
            var replacement = cmd.args[1];
            var flags = cmd.args[2];
            var path = cmd.args[3];
            var text = pattern.join(br);

            regexp.lastIndex = 0;

            if (regexp.test(text)) {
                substitute_succeeded = true;
                text = text.replace(regexp, replacement);

                if (flags.indexOf("e") > -1) {
                    text = run_shell(text);
                }

                if (flags.indexOf("w") > -1) {
                    file = fso.OpenTextFile(path, 8, true);
                    file.Write(text);
                    file.Close();
                }

                if (flags.indexOf("p") > -1) {
                    echo(text);
                }

                pattern = text === "" ? [] : text.split(/\r\n|\r|\n/);
            } else {
                substitute_succeeded = false;
            }
        }

        function cmd_y(cmd) {
            var i, len;
            var src = cmd.args[0];
            var dest = cmd.args[1];
            var text = pattern.join(br);

            for (i = 0, len = src.length; i < len; i++) {
                text = text.replace(
                    new RegExp(src.charAt(i).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
                    dest.charAt(i)
                );
            }
            pattern = text.split(br);
        }

        function exec() {
            var cmd = pc.cmd, tmp;

            switch (cmd.name) {
            case "#":
            case ":":
                break;
            case "=":
                echo(line_num);
                break;
            case "GROUP":
                next_stack.push(pc.next);
                pc = { next: pc.cmd.args[0] || next_stack.pop() };
                break;
            case "D":
                if (pattern.length) { pattern.shift(); }
                next_stack = [];
                pc = null;
                break;
            case "d":
                pattern = [];
                next_stack = [];
                pc = null;
                break;
            case "h":
                hold = pattern.slice(0);
                break;
            case "H":
                hold.push(pattern.join(br));
                break;
            case "g":
                pattern = hold.slice(0);
                break;
            case "G":
                pattern.push(hold.join(br));
                break;
            case "n":
            case "N":
                cmd_next(cmd);
                break;
            case "p":
            case "P":
                cmd_print(cmd);
                break;
            case "x":
                tmp = pattern;
                pattern = hold;
                hold = tmp;
                break;
            case "q":
            case "Q":
                cmd_quit(cmd);
                break;
            case "b":
            case "t":
            case "T":
                cmd_branch(cmd);
                break;
            case "w":
            case "W":
                cmd_write(cmd);
                break;
            case "r":
                cmd_read(cmd);
                break;
            case "a":
            case "i":
            case "c":
                cmd_text(cmd);
                break;
            case "e":
                cmd_execute(cmd);
                break;
            case "s":
                cmd_substitute(cmd);
                break;
            case "y":
                cmd_y(cmd);
                break;
            case "l":
                cmd_list(cmd);
                break;
            case "R":
                cmd_read_line(cmd);
                break;
            default:
                error("invalid command. '" + cmd.name + "'");
            }
        }

        function read() {
            if (stream.AtEndOfStream) { return; }
            pattern = [stream.ReadLine()];
            line_num += 1;
            substitute_succeeded = false;
        }

        function next() {
            if (pc === null) { return null; }

            if (pc.next) {
                pc = pc.next;
            } else if (next_stack.length) {
                pc = next_stack.pop();
            } else {
                pc = null;
            }
            return pc;
        }

        function match() {
            state.pattern = pattern;
            state.line_num = line_num;
            state.AtEndOfStream = stream.AtEndOfStream;
            return pc.addr.match(state);
        }

        function flush() {
            if (insert_text.length !== 0) {
                echo(insert_text.join(br));
                insert_text = [];
            }

            if (pattern.length !== 0 && !quiet) {
                echo(pattern.join(br));
            }

            if (append_text.length !== 0) {
                echo(append_text.join(br));
                append_text = [];
            }
        }

        function run(strm) {
            stream = strm;

            while (!stream.AtEndOfStream) {
                pc = stat_head;
                read();

                while (pc) {
                    if (match()) {
                        exec();
                    }
                    next();
                }
                flush();
            }
        }

        var state = {};
        var br = opts.br;
        var quiet = opts.n;
        var pattern = [];
        var hold = [];
        var line_num = 0;
        var insert_text = [];
        var append_text = [];
        var labels = {};
        var substitute_succeeded = false;
        var fso = WScript.CreateObject("Scripting.FileSystemObject");
        var stat_head = parse(scripts);
        var next_stack = [];
        var pc = stat_head;
        var writtenFiles = {};
        var readFiles = {};

        if (opts.debug) {
            for (; pc; pc = pc.next) {
                echo(pc.toString());
            }
            WScript.Quit(0);
        }

        scan(stat_head, function(item) {
            if (item.cmd.name === ":") {
                labels[item.cmd.args[0]] = item;
            }
        });

        return { run: run };
    }

    var vm = vmachine(opts, scripts);
    var i, len, stream, path;

    for (i = 0, len = files.length; i < len; i++) {
        path = files[i];
        stream = path === "-" ? WScript.StdIn : fso.OpenTextFile(path);
        vm.run(stream);
        if (path !== "-") { stream.Close(); }
    }
}

function break_code(text) {
    if (text === "\\r\\n") {
        return "\r\n";
    }
    if (text === "\\n") {
        return "\n";
    }
    if (text === "\\r") {
        return "\r";
    }
    error("invalid break code.");
}

// 인수가 없으면 도움말 출력
if (WScript.Arguments.length === 0) {
    view("사용법");
    WScript.Quit(0);
}

// parse options
var fso = WScript.CreateObject("Scripting.FileSystemObject");
var arg, i, len, opts = {}, scripts = [], inputs = [];

opts.n = false;
opts.br = "\r\n";

for (i = 0, len = WScript.Arguments.length; i < len; i++) {
    arg = WScript.Arguments(i);

    if (arg === "//" || arg === "--") { break; }
    if (arg.charAt(0) !== "/" && arg.charAt(0) !== "-") { break; }

    switch (arg.charAt(0) === "-" ? "/" + arg.slice(1) : arg) {
    case "/debug":
        opts.debug = true;
        break;
    case "/b":
    case "/break":
        i++;
        arg = get_next_arg(i);
        opts.br = break_code(arg);
        break;
    case "/n":
    case "/quiet":
    case "/silent":
        opts.n = true;
        break;
    case "/nf":
        opts.n = true;
    case "/f":
    case "/file":
        i++;
        arg = get_next_arg(i);
        var script_file = fso.OpenTextFile(arg, 1);
        var script_text = script_file.ReadAll();
        script_file.Close();
        if (/^#n(?:\r\n|\r|\n|$)/.test(script_text)) {
            opts.n = true;
        }
        scripts.push(script_text);
        break;
    case "/ne":
        opts.n = true;
    case "/e":
    case "/expression":
        i++;
        arg = get_next_arg(i);
        scripts.push(arg);
        break;
    case "/?":
    case "/help":

        view("사용법");
        WScript.Quit(0);
        break;
    case "/v":
    case "/version":
        view("Version");
        WScript.Quit(0);
        break;
    default:
        error("sed: invalid arguments. '" + arg + "'");
        break;
    }
}

if (scripts.length === 0) {
    arg = get_next_arg(i);
    scripts.push(arg);
    i++;
}

// parse arguments
for (; i < len; i++) {
    arg = WScript.Arguments(i);

    if (fso.FileExists(arg)) {
        inputs.push(arg);
    } else if (arg === "-") {
        inputs.push("-");
    } else {
        error("file not found.");
    }
}

if (scripts.length === 0) {
    view("사용법");
    WScript.Quit(1);
}

if (inputs.length === 0) {
    inputs.push("-");
}

sed(opts, scripts.join(opts.br), inputs);
