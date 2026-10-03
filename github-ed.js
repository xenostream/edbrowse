(() => {
  "use strict";

  let view = null;
  let lastRegex = "";

  const isView = v =>
    v &&
    v.state?.doc &&
    typeof v.dispatch === "function" &&
    v.dom?.isConnected;

  function findView() {
    if (isView(view))
      return view;

    if (isView(window.__githubView)) {
      view = window.__githubView;
      return view;
    }

    const cm = document.querySelector(
      '[data-testid="codemirror-editor"], .cm-editor'
    );

    if (!cm)
      throw Error("CodeMirror 편집기를 찾지 못했습니다.");

    const seen = new WeakSet();
    let found = null;

    function scan(o, depth = 0) {
      if (!o || found || depth > 16)
        return;

      const type = typeof o;

      if (type !== "object" && type !== "function")
        return;

      if (seen.has(o))
        return;

      if (isView(o)) {
        found = o;
        return;
      }

      seen.add(o);

      let keys;

      try {
        keys = Reflect.ownKeys(o);
      } catch {
        return;
      }

      for (const k of keys) {
        let v;

        try {
          v = o[k];
        } catch {
          continue;
        }

        if (
          v === window ||
          v === document ||
          (
            typeof Node !== "undefined" &&
            v instanceof Node
          )
        )
          continue;

        scan(v, depth + 1);

        if (found)
          return;
      }
    }

    for (
      let el = cm;
      el && !found;
      el = el.parentElement
    ) {
      let keys = [];

      try {
        keys = Reflect.ownKeys(el);
      } catch {}

      for (const k of keys) {
        const s = String(k);

        if (
          s.startsWith("__reactFiber$") ||
          s.startsWith("__reactInternalInstance$")
        ) {
          try {
            scan(el[k]);
          } catch {}
        }

        if (found)
          break;
      }
    }

    if (!found)
      throw Error("CodeMirror EditorView를 찾지 못했습니다.");

    view = window.__githubView = found;

    return view;
  }

  function doc() {
    return findView().state.doc;
  }

  function currentLine() {
    const v = findView();

    return v.state.doc.lineAt(
      v.state.selection.main.head
    ).number;
  }

  function line(n) {
    const d = doc();

    if (
      !Number.isInteger(n) ||
      n < 1 ||
      n > d.lines
    )
      throw Error(`잘못된 줄 주소: ${n}`);

    return d.line(n);
  }

  function moveCursor(n) {
    const v = findView();
    const d = v.state.doc;

    n = Math.max(
      1,
      Math.min(n, d.lines)
    );

    v.dispatch({
      selection: {
        anchor: d.line(n).from
      },
      scrollIntoView: true
    });
  }

  function parseAddress(s, base = currentLine()) {
    const d = doc();

    s = String(s ?? "").trim();

    if (!s)
      return base;

    let p = 0;
    let n;

    if (s[p] === ".") {
      n = base;
      p++;
    } else if (s[p] === "$") {
      n = d.lines;
      p++;
    } else if (/\d/.test(s[p] || "")) {
      const m = s.slice(p).match(/^\d+/);

      n = Number(m[0]);
      p += m[0].length;
    } else if (
      s[p] === "+" ||
      s[p] === "-"
    ) {
      n = base;
    } else {
      throw Error(`잘못된 주소: ${s}`);
    }

    while (p < s.length) {
      const m = s.slice(p).match(
        /^([+-])(\d*)/
      );

      if (!m)
        throw Error(`잘못된 주소: ${s}`);

      const amount =
        m[2] === ""
          ? 1
          : Number(m[2]);

      n +=
        m[1] === "+"
          ? amount
          : -amount;

      p += m[0].length;
    }

    if (n < 1 || n > d.lines)
      throw Error(`잘못된 줄 주소: ${n}`);

    return n;
  }

  function splitAddress(s) {
    for (let i = 0; i < s.length; i++) {
      if (s[i] === ",") {
        return [
          s.slice(0, i),
          s.slice(i + 1)
        ];
      }
    }

    return null;
  }

  function getRange(s, defaultAddr = ".") {
    const d = doc();

    s = String(s ?? "").trim();

    if (!s)
      s = defaultAddr;

    if (s === ",") {
      return {
        s: 1,
        e: d.lines
      };
    }

    const parts = splitAddress(s);

    if (!parts) {
      const n = parseAddress(s);

      return {
        s: n,
        e: n
      };
    }

    const a =
      parts[0].trim()
        ? parseAddress(parts[0])
        : 1;

    const b =
      parts[1].trim()
        ? parseAddress(parts[1])
        : d.lines;

    if (a > b)
      throw Error("잘못된 줄 범위입니다.");

    return {
      s: a,
      e: b
    };
  }

  function dispatch(changes, cursor) {
    const v = findView();
    const d = v.state.doc;

    v.dispatch({
      changes,
      selection:
        cursor == null
          ? undefined
          : {
              anchor:
                d.line(
                  Math.max(
                    1,
                    Math.min(
                      cursor,
                      d.lines
                    )
                  )
                ).from
            },
      scrollIntoView: true
    });
  }

  function quoted(s) {
    s = s.trim();

    if (
      s.length < 2 ||
      !(
        (
          s[0] === '"' &&
          s.at(-1) === '"'
        ) ||
        (
          s[0] === "'" &&
          s.at(-1) === "'"
        )
      )
    ) {
      throw Error(
        '문자열은 "..." 형식이어야 합니다.'
      );
    }

    return s.slice(1, -1)
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, "\\");
  }

  function deleteCommand(addr) {
    const { s, e } =
      getRange(addr, ".");

    const d = doc();

    const from = line(s).from;

    const to =
      line(e).to +
      (e < d.lines ? 1 : 0);

    const cursor =
      e < d.lines
        ? s
        : Math.max(1, s - 1);

    dispatch(
      {
        from,
        to,
        insert: ""
      },
      cursor
    );

    return cursor;
  }

  function insertCommand(addr, text) {
    const n =
      parseAddress(addr || ".");

    dispatch(
      {
        from: line(n).from,
        insert: text + "\n"
      },
      n
    );

    return n;
  }

  function appendCommand(addr, text) {
    const n =
      parseAddress(addr || ".");

    dispatch(
      {
        from: line(n).to,
        insert: "\n" + text
      },
      n + 1
    );

    return n + 1;
  }

  function changeCommand(addr, text) {
    const { s, e } =
      getRange(addr, ".");

    dispatch(
      {
        from: line(s).from,
        to: line(e).to,
        insert: text
      },
      s
    );

    return s;
  }

  function printCommand(addr) {
    const { s, e } =
      getRange(addr, ".");

    const d = doc();

    for (let n = s; n <= e; n++) {
      console.log(
        `${n}: ${d.line(n).text}`
      );
    }

    moveCursor(e);

    return e;
  }

  function listCommand(addr) {
    const { s, e } =
      getRange(addr, ".");

    const d = doc();

    for (let n = s; n <= e; n++) {
      const text =
        d.line(n).text
          .replace(/\t/g, "→")
          .replace(/ /g, "·");

      console.log(
        `${n}: ${text}¶`
      );
    }

    console.log("$");

    moveCursor(e);

    return e;
  }

  function joinCommand(addr) {
    const { s, e } =
      getRange(addr, ".,+1");

    if (s === e) {
      moveCursor(s);
      return s;
    }

    const d = doc();

    const text =
      d.sliceString(
        line(s).from,
        line(e).to
      ).replace(/\r?\n/g, " ");

    dispatch(
      {
        from: line(s).from,
        to: line(e).to,
        insert: text
      },
      s
    );

    return s;
  }

  function copyCommand(addr, dest) {
    const { s, e } =
      getRange(addr, ".");

    const target =
      parseAddress(
        dest,
        currentLine()
      );

    if (
      target >= s &&
      target <= e
    )
      throw Error(
        "복사 대상이 원본 범위 안에 있습니다."
      );

    const d = doc();

    const text =
      d.sliceString(
        line(s).from,
        line(e).to
      );

    const count = e - s + 1;

    dispatch(
      {
        from: line(target).to,
        insert: "\n" + text
      },
      target + count
    );

    return target + count;
  }

  function moveCommand(addr, dest) {
    const { s, e } =
      getRange(addr, ".");

    let target =
      parseAddress(
        dest,
        currentLine()
      );

    if (
      target >= s &&
      target <= e
    )
      throw Error(
        "이동 대상이 원본 범위 안에 있습니다."
      );

    const d = doc();

    const text =
      d.sliceString(
        line(s).from,
        line(e).to
      );

    const from = line(s).from;

    const to =
      line(e).to +
      (e < d.lines ? 1 : 0);

    const count = e - s + 1;

    if (target < s) {
      dispatch(
        [
          {
            from,
            to,
            insert: ""
          },
          {
            from: line(target).to,
            insert: text + "\n"
          }
        ],
        target + count
      );

      return target + count;
    }

    target -= count;

    dispatch(
      [
        {
          from,
          to,
          insert: ""
        },
        {
          from: line(target).to,
          insert: "\n" + text
        }
      ],
      target + count
    );

    return target + count;
  }

 function parseSubstitute(s) {
   if (!s.startsWith("s"))
     throw Error("잘못된 substitute 명령입니다.");
 
   const delimiter = s[1];
 
   if (!delimiter)
     throw Error("s 구분자가 없습니다.");
 
   let p = 2;
   const parts = [];
 
   for (let field = 0; field < 2; field++) {
     let value = "";
     let closed = false;
 
     while (p < s.length) {
       const c = s[p];
 
       if (c === "\\") {
         if (p + 1 >= s.length)
           throw Error("이스케이프가 닫히지 않았습니다.");
 
         const next = s[p + 1];
 
         if (next === delimiter) {
           value += delimiter;
           p += 2;
           continue;
         }
 
         value += "\\";
         p++;
         continue;
       }
 
       if (c === delimiter) {
         p++;
         closed = true;
         break;
       }
 
       value += c;
       p++;
     }
 
     if (!closed)
       throw Error("substitute 구분자가 닫히지 않았습니다.");
 
     parts.push(value);
   }
 
   const flagStart = p;
 
   while (
     p < s.length &&
     /[dgimsuvy]/.test(s[p])
   ) {
     p++;
   }
 
   return {
     delimiter,
     pattern: parts[0],
     replacement: parts[1],
     flags: s.slice(flagStart, p),
     end: p
   };
 }


  function decodeSubPart(s, delimiter) {
    const d =
      "\\" + delimiter;

    return s
      .replaceAll(d, delimiter)
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t");
  }

  function substituteCommand(addr, command) {
    const sub =
      parseSubstitute(command);

    let pattern =
      decodeSubPart(
        sub.pattern,
        sub.delimiter
      );

    if (!pattern)
      pattern = lastRegex;

    if (!pattern)
      throw Error(
        "이전 정규식이 없습니다."
      );

    lastRegex = pattern;

    const replacement =
      decodeSubPart(
        sub.replacement,
        sub.delimiter
      );

    const re =
      new RegExp(
        pattern,
        sub.flags
      );

    const { s, e } =
      getRange(addr, ".");

    const d = doc();
    const changes = [];

    for (let n = s; n <= e; n++) {
      const l = d.line(n);
      const old = l.text;

      re.lastIndex = 0;

      const neu =
        old.replace(
          re,
          replacement
        );

      if (old !== neu) {
        changes.push({
          from: l.from,
          to: l.to,
          insert: neu
        });
      }
    }

    if (!changes.length) {
      console.log("치환 없음");
      return e;
    }

    dispatch(changes, e);

    return e;
  }

  function parseGlobal(code) {
    const type = code[0];

    if (
      type !== "g" &&
      type !== "v"
    )
      throw Error(
        "잘못된 global 명령입니다."
      );

    if (code[1] !== "/")
      throw Error(
        "g/v 명령은 g/regexp/command 형식이어야 합니다."
      );

    let p = 2;
    let pattern = "";
    let escaped = false;
    let closed = false;

    while (p < code.length) {
      const c = code[p++];

      if (escaped) {
        pattern += "\\" + c;
        escaped = false;
        continue;
      }

      if (c === "\\") {
        escaped = true;
        continue;
      }

      if (c === "/") {
        closed = true;
        break;
      }

      pattern += c;
    }

    if (!closed)
      throw Error(
        "global 정규식이 닫히지 않았습니다."
      );

    return {
      type,
      pattern,
      command: code.slice(p).trim()
    };
  }

  function splitGlobalCommands(text) {
    const result = [];
    let p = 0;

    while (p < text.length) {
      while (
        p < text.length &&
        /\s/.test(text[p])
      ) {
        p++;
      }

      if (p >= text.length)
        break;

      if (text[p] === "\\") {
        p++;
        continue;
      }

      const start = p;

      if (
        text[p] === "s" &&
        p + 1 < text.length
      ) {
        const sub =
          parseSubstitute(
            text.slice(p)
          );

        const end =
          p + sub.end;

        result.push(
          text.slice(p, end)
        );

        p = end;

        if (text[p] === "\\")
          p++;

        continue;
      }

      while (
        p < text.length &&
        text[p] !== "\\"
      ) {
        p++;
      }

      const command =
        text.slice(start, p).trim();

      if (command)
        result.push(command);

      if (text[p] === "\\")
        p++;
    }

    return result;
  }

  function globalCommand(addr, code) {
    const g =
      parseGlobal(code);

    lastRegex = g.pattern;

    const { s, e } =
      getRange(addr, "1,$");

    const d = doc();
    const re =
      new RegExp(g.pattern);

    const selected = [];

    for (let n = s; n <= e; n++) {
      re.lastIndex = 0;

      const matched =
        re.test(
          d.line(n).text
        );

      if (
        g.type === "g"
          ? matched
          : !matched
      ) {
        selected.push(n);
      }
    }

    if (!selected.length)
      return;

    const commands =
      splitGlobalCommands(
        g.command
      );

    if (!commands.length)
      throw Error(
        "global 실행 명령이 없습니다."
      );

    for (const originalLine of selected) {
      let n = originalLine;

      if (
        n < 1 ||
        n > doc().lines
      )
        continue;

      for (const command of commands) {
        n = execute(
          command,
          String(n)
        );

        if (
          n == null ||
          n < 1 ||
          n > doc().lines
        )
          break;
      }
    }

    return selected.at(-1);
  }

  function undo() {
    const v = findView();

    v.contentDOM.dispatchEvent(
      new KeyboardEvent(
        "keydown",
        {
          key: "z",
          code: "KeyZ",
          ctrlKey: true,
          bubbles: true,
          cancelable: true
        }
      )
    );
  }

  function execute(code, forcedAddr = null) {
    code = String(code).trim();

    if (!code)
      return;

    if (
      code === "help" ||
      code === "?"
    )
      return help();

    if (code === "=")
      return console.log(
        `줄 수: ${doc().lines}`
      );

    if (code === "u")
      return undo();

    let m;

    m = code.match(
      /^((?:[.$]|\d+)(?:[+-]\d+)*(?:\s*,\s*(?:[.$]|\d+)(?:[+-]\d+)*)?)?\s*([gv]\/[\s\S]*)$/i
    );

    if (m) {
      return globalCommand(
        m[1] ||
        forcedAddr ||
        "1,$",
        m[2]
      );
    }

    m = code.match(
      /^((?:[.$]|\d+)(?:[+-]\d+)*(?:\s*,\s*(?:[.$]|\d+)(?:[+-]\d+)*)?)?\s*(s\/[\s\S]*)$/i
    );

    if (m) {
      return substituteCommand(
        m[1] ||
        forcedAddr ||
        ".",
        m[2]
      );
    }

    m = code.match(
      /^((?:[.$]|\d+)(?:[+-]\d+)*(?:\s*,\s*(?:[.$]|\d+)(?:[+-]\d+)*)?)?\s*d$/i
    );

    if (m) {
      return deleteCommand(
        m[1] ||
        forcedAddr ||
        "."
      );
    }

    m = code.match(
      /^((?:[.$]|\d+)(?:[+-]\d+)*(?:\s*,\s*(?:[.$]|\d+)(?:[+-]\d+)*)?)?\s*p$/i
    );

    if (m) {
      return printCommand(
        m[1] ||
        forcedAddr ||
        "."
      );
    }

    m = code.match(
      /^((?:[.$]|\d+)(?:[+-]\d+)*(?:\s*,\s*(?:[.$]|\d+)(?:[+-]\d+)*)?)?\s*l$/i
    );

    if (m) {
      return listCommand(
        m[1] ||
        forcedAddr ||
        "."
      );
    }

    m = code.match(
      /^((?:[.$]|\d+)(?:[+-]\d+)*)?\s*j$/i
    );

    if (m) {
      return joinCommand(
        m[1] ||
        forcedAddr ||
        ".,+1"
      );
    }

    m = code.match(
      /^((?:[.$]|\d+)(?:[+-]\d+)*)?\s*i\s+([\s\S]+)$/i
    );

    if (m) {
      return insertCommand(
        m[1] ||
        forcedAddr ||
        ".",
        quoted(m[2])
      );
    }

    m = code.match(
      /^((?:[.$]|\d+)(?:[+-]\d+)*)?\s*a\s+([\s\S]+)$/i
    );

    if (m) {
      return appendCommand(
        m[1] ||
        forcedAddr ||
        ".",
        quoted(m[2])
      );
    }

    m = code.match(
      /^((?:[.$]|\d+)(?:[+-]\d+)*(?:\s*,\s*(?:[.$]|\d+)(?:[+-]\d+)*)?)?\s*c\s+([\s\S]+)$/i
    );

    if (m) {
      return changeCommand(
        m[1] ||
        forcedAddr ||
        ".",
        quoted(m[2])
      );
    }

    m = code.match(
      /^((?:[.$]|\d+)(?:[+-]\d+)*(?:\s*,\s*(?:[.$]|\d+)(?:[+-]\d+)*)?)\s*t\s*((?:[.$]|\d+)(?:[+-]\d+)*)$/i
    );

    if (m) {
      return copyCommand(
        m[1],
        m[2]
      );
    }

    m = code.match(
      /^((?:[.$]|\d+)(?:[+-]\d+)*(?:\s*,\s*(?:[.$]|\d+)(?:[+-]\d+)*)?)\s*m\s*((?:[.$]|\d+)(?:[+-]\d+)*)$/i
    );

    if (m) {
      return moveCommand(
        m[1],
        m[2]
      );
    }

    throw Error(
      `알 수 없는 명령입니다: ${code}`
    );
  }

  function splitTopLevelCommands(text) {
    const result = [];
    let start = 0;
    let p = 0;

    while (p < text.length) {
      const c = text[p];

      if (
        (c === "g" || c === "v") &&
        text[p + 1] === "/"
      ) {
        p += 2;

        let escaped = false;

        while (p < text.length) {
          const x = text[p++];

          if (escaped) {
            escaped = false;
            continue;
          }

          if (x === "\\") {
            escaped = true;
            continue;
          }

          if (x === "/")
            break;
        }

        continue;
      }

      if (
        c === "s" &&
        text[p + 1]
      ) {
        const sub =
          parseSubstitute(
            text.slice(p)
          );

        p += sub.end;

        continue;
      }

      if (c === "\\") {
        const command =
          text.slice(start, p).trim();

        if (command)
          result.push(command);

        p++;
        start = p;
        continue;
      }

      p++;
    }

    const last =
      text.slice(start).trim();

    if (last)
      result.push(last);

    return result;
  }

  function runCode(code) {
    code = String(code).trim();

    if (!code)
      return;

    const commands =
      splitTopLevelCommands(code);

    for (const command of commands)
      execute(command);
  }

  function help() {
    console.log(`
GitHub CodeMirror ed

주소
  .          현재 줄
  $          마지막 줄
  3          절대 주소
  +2         현재 + 2
  -2         현재 - 2
  .+3
  $-2
  1,$
  .,$
  .,+3
  .-2,.+2
  ,

주소 생략
  p l d j s  현재 줄
  g v        1,$

출력
  p
  1,$p
  .,+3p

list
  l
  1,$l
  .,$l

삽입 / 추가 / 교체
  i "text"
  a "text"
  c "text"
  3i "text"
  3a "text"
  3,5c "text"

멀티라인
  a "첫째\\n둘째\\n셋째"
  i "foo\\nbar"
  c "foo\\nbar"

삭제
  d
  3d
  3,10d
  $d

복사 / 이동
  3t10
  3,5t$
  3m10
  3,5m$

합치기
  j
  3,5j

치환
  s/foo/bar/
  s/foo/bar/g
  s/foo/bar/gi
  1,$s/foo/bar/g
  s//bar/g

global
  g/abc/p
  g/abc/l
  g/abc/d
  g/abc/s/abc/def/g
  g/abc/s//def/gi
  g/\\d+/p

inverse global
  v/abc/p
  v/abc/d

global 연속 명령
  g/abc/p\\l
  g/abc/s/foo/bar/g\\p
  g/e/s//E/g\\p
  g/e/ s//E/g\\ p

undo
  u

줄 수
  =

도움말
  help
`);
  }

  view = findView();

  window.__githubView = view;
  window.runCode = runCode;
  window.findGithubEditor = findView;

  window.ed = (strings, ...values) => {
    if (typeof strings === "string")
      return runCode(strings);
  
    return runCode(
      String.raw(strings, ...values)
    );
  };

  console.log(
    `%cGitHub CodeMirror ed ready — ${view.state.doc.lines} lines`,
    "color:#4caf50;font-weight:bold"
  );

  console.log(
    "ed`help`  또는  ed('help')"
  );
})();
