# Live text editing


## Stylus with Github

```js
.cm-editor .cm-scroller,
    .cm-editor .cm-content,
    .cm-editor .cm-line {
        font-family: "Sarasa Mono K Nerd Font", monospace !important;
        font-size: 16px !important;
        line-height: 1.5 !important;
    }
```


## runCode with Github's Editor

- <kbd>Ctrl+Shift+J</kbd> open Console

```js
(() => {
  "use strict";

  let view = null;

  const isView = v =>
    v &&
    v.state?.doc &&
    typeof v.dispatch === "function" &&
    v.dom?.isConnected;

  function findView() {
    if (isView(view)) return view;

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

      for (const key of Reflect.ownKeys(o)) {
        let value;

        try {
          value = o[key];
        } catch {
          continue;
        }

        if (
          value === window ||
          value === document ||
          (typeof Node !== "undefined" &&
            value instanceof Node)
        )
          continue;

        scan(value, depth + 1);

        if (found)
          return;
      }
    }

    for (
      let el = cm;
      el && !found;
      el = el.parentElement
    ) {
      for (const key of Reflect.ownKeys(el)) {
        const name = String(key);

        if (
          name.startsWith("__reactFiber$") ||
          name.startsWith("__reactInternalInstance$")
        ) {
          try {
            scan(el[key]);
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

  function address(expr, base = currentLine()) {
    const d = doc();

    expr = String(expr ?? "").trim();

    if (!expr)
      return base;

    let pos = 0;
    let n;

    if (expr[pos] === ".") {
      n = base;
      pos++;
    } else if (expr[pos] === "$") {
      n = d.lines;
      pos++;
    } else if (/\d/.test(expr[pos])) {
      const m = expr.slice(pos).match(/^\d+/);
      n = Number(m[0]);
      pos += m[0].length;
    } else if (expr[pos] === "+" || expr[pos] === "-") {
      n = base;
    } else {
      throw Error(`잘못된 주소: ${expr}`);
    }

    while (pos < expr.length) {
      const m = expr.slice(pos).match(
        /^([+-])(\d*)/
      );

      if (!m)
        throw Error(`잘못된 주소: ${expr}`);

      const amount =
        m[2] === ""
          ? 1
          : Number(m[2]);

      n +=
        m[1] === "+"
          ? amount
          : -amount;

      pos += m[0].length;
    }

    if (n < 1 || n > d.lines)
      throw Error(`잘못된 줄 주소: ${n}`);

    return n;
  }

  function range(expr) {
    const base = currentLine();

    expr = String(expr ?? "").trim();

    if (!expr)
      return {
        s: base,
        e: base
      };

    if (expr === ",")
      return {
        s: 1,
        e: doc().lines
      };

    const m = expr.match(
      /^(.+?)\s*,\s*(.+)$/
    );

    if (!m) {
      const n = address(expr, base);

      return {
        s: n,
        e: n
      };
    }

    const s = address(
      m[1],
      base
    );

    const e = address(
      m[2],
      base
    );

    if (s > e)
      throw Error("잘못된 줄 범위입니다.");

    return { s, e };
  }

  function selectLine(n) {
    const v = findView();
    const l = line(n);

    const Transaction =
      v.state.update({}).constructor;

    v.dispatch(
      v.state.update({
        selection: {
          anchor: l.from
        },
        annotations:
          Transaction.addToHistory.of(false),
        scrollIntoView: true
      })
    );
  }

  function edit(changes, selection) {
    const v = findView();

    v.dispatch({
      changes,
      selection: selection
        ? { anchor: selection }
        : undefined,
      userEvent: "input.ed",
      scrollIntoView: true
    });
  }

  function cursorAt(n) {
    return line(n).from;
  }

  function textOf(s, e) {
    return doc().sliceString(
      line(s).from,
      line(e).to
    );
  }

  function quote(s) {
    s = s.trim();

    if (
      s.length < 2 ||
      !(
        (s[0] === '"' && s.at(-1) === '"') ||
        (s[0] === "'" && s.at(-1) === "'")
      )
    )
      throw Error(
        '문자열은 "..." 형식이어야 합니다.'
      );

    return s.slice(1, -1)
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, "\\");
  }

  function remove(addr) {
    const { s, e } = range(addr);
    const d = doc();

    const from = line(s).from;
    const to =
      line(e).to +
      (e < d.lines ? 1 : 0);

    const newCurrent =
      e < d.lines
        ? s
        : Math.max(1, s - 1);

    edit(
      {
        from,
        to,
        insert: ""
      },
      cursorAt(newCurrent)
    );

    console.log(`삭제: ${s}~${e}`);
  }

  function insert(addr, text) {
    const n = address(
      addr || "."
    );

    const l = line(n);

    edit(
      {
        from: l.from,
        insert: text + "\n"
      },
      cursorAt(n)
    );

    console.log(`삽입: ${n}행`);
  }

  function append(addr, text) {
    const n = address(
      addr || "."
    );

    const l = line(n);

    edit(
      {
        from: l.to,
        insert: "\n" + text
      },
      cursorAt(n + 1)
    );

    console.log(`추가: ${n}행`);
  }

  function change(addr, text) {
    const { s, e } = range(addr);

    const from = line(s).from;
    const to = line(e).to;

    edit(
      {
        from,
        to,
        insert: text
      },
      cursorAt(s)
    );

    console.log(`교체: ${s}~${e}`);
  }

  function print(addr) {
    const { s, e } = range(addr);
    const d = doc();

    for (let n = s; n <= e; n++)
      console.log(
        `${n}: ${d.line(n).text}`
      );

    selectLine(e);
  }

  function list(addr) {
    const { s, e } = range(addr);
    const d = doc();

    for (let n = s; n <= e; n++) {
      const text = d.line(n).text
        .replace(/\t/g, "→")
        .replace(/ /g, "·");

      console.log(
        `${n}: ${text}¶`
      );
    }

    console.log("$");

    selectLine(e);
  }

  function printMatch(pattern, flags) {
    const d = doc();
    const re = new RegExp(
      pattern,
      flags
    );

    for (let n = 1; n <= d.lines; n++) {
      re.lastIndex = 0;

      if (re.test(d.line(n).text))
        console.log(
          `${n}: ${d.line(n).text}`
        );
    }
  }

  function replaceRange(
    addr,
    pattern,
    flags,
    text
  ) {
    const { s, e } = range(addr);

    const from = line(s).from;
    const to = line(e).to;

    const oldText =
      doc().sliceString(from, to);

    const newText =
      oldText.replace(
        new RegExp(pattern, flags),
        text
      );

    if (oldText === newText) {
      console.log("치환 없음");
      return;
    }

    edit(
      {
        from,
        to,
        insert: newText
      },
      cursorAt(e)
    );

    console.log(
      `치환: ${s}~${e}`
    );
  }

  function replaceAll(
    pattern,
    flags,
    text
  ) {
    const v = findView();

    const oldText =
      v.state.doc.toString();

    const newText =
      oldText.replace(
        new RegExp(pattern, flags),
        text
      );

    if (oldText === newText) {
      console.log("치환 없음");
      return;
    }

    edit(
      {
        from: 0,
        to: v.state.doc.length,
        insert: newText
      },
      0
    );

    console.log(
      `전체 치환: /${pattern}/${flags}`
    );
  }

  function transfer(
    addr,
    dest
  ) {
    const { s, e } = range(addr);
    const target = address(dest);

    if (target >= s && target <= e)
      throw Error(
        "복사 대상이 원본 범위 안에 있습니다."
      );

    const text = textOf(s, e);
    const pos = line(target).to;
    const count = e - s + 1;

    edit(
      {
        from: pos,
        insert: "\n" + text
      },
      cursorAt(
        target + count
      )
    );

    console.log(
      `복사: ${s}~${e} -> ${target}`
    );
  }

  function move(
    addr,
    dest
  ) {
    const { s, e } = range(addr);
    let target = address(dest);

    if (target >= s && target <= e)
      throw Error(
        "이동 대상이 원본 범위 안에 있습니다."
      );

    const d = doc();

    const text = textOf(s, e);

    const from = line(s).from;

    const to =
      line(e).to +
      (e < d.lines ? 1 : 0);

    const count = e - s + 1;

    if (target < s) {
      const pos = line(target).to;

      edit(
        [
          {
            from,
            to,
            insert: ""
          },
          {
            from: pos,
            insert: text + "\n"
          }
        ],
        cursorAt(target + count)
      );
    } else {
      const newTarget =
        target - count;

      const pos =
        line(newTarget).to;

      edit(
        [
          {
            from,
            to,
            insert: ""
          },
          {
            from: pos,
            insert: "\n" + text
          }
        ],
        cursorAt(target)
      );
    }

    console.log(
      `이동: ${s}~${e} -> ${target}`
    );
  }

  function join(addr) {
    const { s, e } = range(addr);

    if (s === e) {
      selectLine(s);
      return;
    }

    const from = line(s).from;
    const to = line(e).to;

    const text =
      doc().sliceString(from, to);

    edit(
      {
        from,
        to,
        insert: text.replace(
          /\r?\n/g,
          " "
        )
      },
      cursorAt(s)
    );

    console.log(
      `합치기: ${s}~${e}`
    );
  }

  function undo() {
    const v = findView();

    const event =
      new InputEvent(
        "beforeinput",
        {
          inputType: "historyUndo",
          bubbles: true,
          cancelable: true
        }
      );

    if (
      v.contentDOM.dispatchEvent(event)
    )
      return;

    v.dom.dispatchEvent(
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

  function help() {
    console.log(`
GitHub CodeMirror ed

주소
  .       현재 줄
  $       마지막 줄
  3       절대 주소
  +2      현재 + 2
  -2      현재 - 2
  3+2     3 + 2
  $-1     마지막 - 1
  .+3     현재 + 3

범위
  1,$
  .,$
  .,+3
  .-2,.+2

주소 생략
  p       현재 줄 출력
  l       현재 줄 표시
  d       현재 줄 삭제
  j       현재 줄 합치기
  a "x"   현재 줄 뒤에 추가
  i "x"   현재 줄 앞에 삽입
  c "x"   현재 줄 교체

출력
  p
  1,$p
  .,+3p

list
  l
  1,$l
  .,$l

복사
  3t10
  3,5t.
  .t$
  -2,+1t.

이동
  3m10
  3,5m.
  .m$
  -2,+1m.

합치기
  j
  3,5j
  .,+2j

치환
  /foo/g, "bar"
  1,$ /foo/g, "bar"
  .,$ /foo/gi, "bar"

정규식 출력
  /foo/p
  /foo/gi,p

실행 취소
  u

줄 수
  =

도움말
  help
`);
  }

  function runCode(code) {
    code = String(code).trim();

    if (!code)
      return;

    findView();

    let m;

    if (
      code === "help" ||
      code === "?"
    )
      return help();

    if (code === "u")
      return undo();

    if (code === "=")
      return console.log(
        `줄 수: ${doc().lines}`
      );

    /*
     * d
     */

    m = code.match(
      /^((?:\.|\$|\d+)(?:[+-]\d+)*(?:\s*,\s*(?:\.|\$|\d+)(?:[+-]\d+)*)?)?\s*d$/i
    );

    if (m)
      return remove(
        m[1] || "."
      );

    /*
     * i / a / c
     */

    m = code.match(
      /^((?:\.|\$|\d+)(?:[+-]\d+)*)?\s*i\s+(.+)$/i
    );

    if (m)
      return insert(
        m[1] || ".",
        quote(m[2])
      );

    m = code.match(
      /^((?:\.|\$|\d+)(?:[+-]\d+)*)?\s*a\s+(.+)$/i
    );

    if (m)
      return append(
        m[1] || ".",
        quote(m[2])
      );

    m = code.match(
      /^((?:\.|\$|\d+)(?:[+-]\d+)*(?:\s*,\s*(?:\.|\$|\d+)(?:[+-]\d+)*)?)?\s*c\s+(.+)$/i
    );

    if (m)
      return change(
        m[1] || ".",
        quote(m[2])
      );

    /*
     * p
     */

    m = code.match(
      /^((?:\.|\$|\d+)(?:[+-]\d+)*(?:\s*,\s*(?:\.|\$|\d+)(?:[+-]\d+)*)?)?\s*p$/i
    );

    if (m)
      return print(
        m[1] || "."
      );

    /*
     * l
     */

    m = code.match(
      /^((?:\.|\$|\d+)(?:[+-]\d+)*(?:\s*,\s*(?:\.|\$|\d+)(?:[+-]\d+)*)?)?\s*l$/i
    );

    if (m)
      return list(
        m[1] || "."
      );

    /*
     * t
     */

    m = code.match(
      /^((?:\.|\$|\d+)(?:[+-]\d+)*(?:\s*,\s*(?:\.|\$|\d+)(?:[+-]\d+)*)?)\s*t\s*((?:\.|\$|\d+)(?:[+-]\d+)*)$/i
    );

    if (m)
      return transfer(
        m[1],
        m[2]
      );

    /*
     * m
     */

    m = code.match(
      /^((?:\.|\$|\d+)(?:[+-]\d+)*(?:\s*,\s*(?:\.|\$|\d+)(?:[+-]\d+)*)?)\s*m\s*((?:\.|\$|\d+)(?:[+-]\d+)*)$/i
    );

    if (m)
      return move(
        m[1],
        m[2]
      );

    /*
     * j
     */

    m = code.match(
      /^((?:\.|\$|\d+)(?:[+-]\d+)*(?:\s*,\s*(?:\.|\$|\d+)(?:[+-]\d+)*)?)?\s*j$/i
    );

    if (m)
      return join(
        m[1] || "."
      );

    /*
     * regex print
     */

    m = code.match(
      /^\/((?:\\\/|[^\/])*)\/([a-z]*)\s*,?\s*p$/i
    );

    if (m)
      return printMatch(
        m[1].replace(
          /\\\//g,
          "/"
        ),
        m[2]
      );

    /*
     * range replace
     */

    m = code.match(
      /^((?:\.|\$|\d+)(?:[+-]\d+)*(?:\s*,\s*(?:\.|\$|\d+)(?:[+-]\d+)*)?)?\s+\/((?:\\\/|[^\/])*)\/([a-z]*)\s*,\s*(.+)$/i
    );

    if (m)
      return replaceRange(
        m[1] || ".",
        m[2].replace(
          /\\\//g,
          "/"
        ),
        m[3],
        quote(m[4])
      );

    /*
     * whole replace
     */

    m = code.match(
      /^\/((?:\\\/|[^\/])*)\/([a-z]*)\s*,\s*(.+)$/i
    );

    if (m)
      return replaceAll(
        m[1].replace(
          /\\\//g,
          "/"
        ),
        m[2],
        quote(m[3])
      );

    throw Error(
      "알 수 없는 명령입니다. help를 입력하세요."
    );
  }

  view = findView();

  window.__githubView = view;
  window.runCode = runCode;
  window.findGithubEditor = findView;

  console.log(
    `%cGitHub CodeMirror ready — ${view.state.doc.lines} lines`,
    "color:#4caf50;font-weight:bold"
  );

  console.log(
    "runCode('help')"
  );
  
 window.ed = (strings, ...values) => {
   if (typeof strings === "string")
     return runCode(strings);
 
   return runCode(
     String.raw({ raw: strings }, ...values)
   );
 };
 
})();

```
