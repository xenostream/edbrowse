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

    if (!cm) throw Error("CodeMirror 편집기를 찾지 못했습니다.");

    const seen = new WeakSet();
    let found = null;

    function scan(o, depth = 0) {
      if (!o || found || depth > 16) return;

      const t = typeof o;
      if (t !== "object" && t !== "function") return;
      if (seen.has(o)) return;

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
          (typeof Node !== "undefined" && v instanceof Node)
        ) continue;

        scan(v, depth + 1);
        if (found) return;
      }
    }

    for (let el = cm; el && !found; el = el.parentElement) {
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
        if (found) break;
      }
    }

    if (!found)
      throw Error("CodeMirror EditorView를 찾지 못했습니다.");

    view = window.__githubView = found;
    return found;
  }

  function doc() {
    return findView().state.doc;
  }

  function num(x) {
    const d = doc();
    const n = x === "$" ? d.lines : Number(x);

    if (!Number.isInteger(n) || n < 1 || n > d.lines)
      throw Error(`잘못된 줄 번호: ${x}`);

    return n;
  }

  function range(a, b = a) {
    const d = doc();
    const s = num(a);
    const e = num(b);

    if (s > e) throw Error("잘못된 줄 범위입니다.");

    return {
      d,
      s,
      e,
      from: d.line(s).from,
      to: d.line(e).to + (e < d.lines ? 1 : 0)
    };
  }

  function quote(s) {
    s = s.trim();

    if (
      s.length < 2 ||
      !(
        (s[0] === '"' && s.at(-1) === '"') ||
        (s[0] === "'" && s.at(-1) === "'")
      )
    ) {
      throw Error('문자열은 "..." 형식이어야 합니다.');
    }

    return s.slice(1, -1)
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, "\\");
  }

  function regex(pattern, flags) {
    try {
      return new RegExp(pattern, flags);
    } catch (e) {
      throw Error(`RegExp 오류: ${e.message}`);
    }
  }

  function remove(a, b) {
    const v = findView();
    const r = range(a, b);

    v.dispatch({
      changes: { from: r.from, to: r.to, insert: "" }
    });

    console.log(`삭제: ${r.s}~${r.e}`);
  }

  function insert(a, text) {
    const v = findView();
    const d = v.state.doc;
    const n = num(a);
    const l = d.line(n);

    v.dispatch({
      changes: {
        from: l.from,
        insert: text + "\n"
      }
    });

    console.log(`삽입: ${n}행`);
  }

  function append(a, text) {
    const v = findView();
    const d = v.state.doc;
    const n = num(a);
    const l = d.line(n);

    v.dispatch({
      changes: {
        from: l.to,
        insert: "\n" + text
      }
    });

    console.log(`추가: ${n}행`);
  }

  function change(a, text) {
    const v = findView();
    const d = v.state.doc;
    const n = num(a);
    const l = d.line(n);

    v.dispatch({
      changes: {
        from: l.from,
        to: l.to,
        insert: text
      }
    });

    console.log(`교체: ${n}행`);
  }

  function print(a, b) {
    const r = range(a, b);

    for (let n = r.s; n <= r.e; n++)
      console.log(`${n}: ${r.d.line(n).text}`);
  }

  function printMatch(pattern, flags) {
    const d = doc();
    const re = regex(pattern, flags);

    for (let n = 1; n <= d.lines; n++) {
      re.lastIndex = 0;
      if (re.test(d.line(n).text))
        console.log(`${n}: ${d.line(n).text}`);
    }
  }

  function replace(a, b, pattern, flags, text) {
    const v = findView();
    const r = range(a, b);
    const oldText = r.d.sliceString(r.from, r.to);
    const newText = oldText.replace(
      regex(pattern, flags),
      text
    );

    if (oldText === newText) {
      console.log("치환 없음");
      return;
    }

    v.dispatch({
      changes: {
        from: r.from,
        to: r.to,
        insert: newText
      }
    });

    console.log(`치환: ${r.s}~${r.e}`);
  }

  function replaceAll(pattern, flags, text) {
    const v = findView();
    const d = v.state.doc;
    const oldText = d.toString();
    const newText = oldText.replace(
      regex(pattern, flags),
      text
    );

    if (oldText === newText) {
      console.log("치환 없음");
      return;
    }

    v.dispatch({
      changes: {
        from: 0,
        to: d.length,
        insert: newText
      }
    });

    console.log(`전체 치환: /${pattern}/${flags}`);
  }

  function help() {
    console.log(`
GitHub CodeMirror commands

삭제
  3d
  3,10d
  $d

삽입 / 추가 / 교체
  3i "hello"
  3a "hello"
  3c "hello"

출력
  3p
  3,10p
  /foo/p

줄 수
  =
  3=

치환
  /foo/g, "bar"
  /has/gim, "Hello"
  3,10 /foo/g, "bar"
  10,$ /foo/gi, "bar"

JS RegExp
  /\\d+/g, "NUMBER"
  /^\\s*$/gm, ""
  /(foo)=(bar)/g, "$2=$1"

도움말
  help
`);
  }

  function runCode(code) {
    code = String(code).trim();
    if (!code) return;

    try {
      findView();

      let m;

      if (code === "help" || code === "?")
        return help();

      if (code === "=" || /^\d+\s*=$/.test(code))
        return console.log(`줄 수: ${doc().lines}`);

      m = code.match(
        /^(\d+|\$)\s*(?:,\s*(\d+|\$))?\s*d$/
      );
      if (m) return remove(m[1], m[2]);

      m = code.match(
        /^(\d+|\$)\s*i\s+(.+)$/
      );
      if (m) return insert(m[1], quote(m[2]));

      m = code.match(
        /^(\d+|\$)\s*a\s+(.+)$/
      );
      if (m) return append(m[1], quote(m[2]));

      m = code.match(
        /^(\d+|\$)\s*c\s+(.+)$/
      );
      if (m) return change(m[1], quote(m[2]));

      m = code.match(
        /^(\d+|\$)\s*(?:,\s*(\d+|\$))?\s*p$/
      );
      if (m) return print(m[1], m[2]);

      m = code.match(
        /^\/((?:\\\/|[^\/])*)\/([a-z]*)\s*,?\s*p$/i
      );
      if (m) {
        return printMatch(
          m[1].replace(/\\\//g, "/"),
          m[2]
        );
      }

      m = code.match(
        /^(\d+|\$)\s*(?:,\s*(\d+|\$))?\s+\/((?:\\\/|[^\/])*)\/([a-z]*)\s*,\s*(.+)$/i
      );
      if (m) {
        return replace(
          m[1],
          m[2],
          m[3].replace(/\\\//g, "/"),
          m[4],
          quote(m[5])
        );
      }

      m = code.match(
        /^\/((?:\\\/|[^\/])*)\/([a-z]*)\s*,\s*(.+)$/i
      );
      if (m) {
        return replaceAll(
          m[1].replace(/\\\//g, "/"),
          m[2],
          quote(m[3])
        );
      }

      throw Error(
        "알 수 없는 명령입니다. help를 입력하세요."
      );

    } catch (e) {
      console.error("runCode:", e.message || e);
    }
  }

  view = findView();

  window.__githubView = view;
  window.runCode = runCode;
  window.findGithubEditor = findView;

  console.log(
    `%cGitHub CodeMirror ready — ${view.state.doc.lines} lines`,
    "color:#4caf50;font-weight:bold"
  );
  console.log("runCode('help')");

})();
```
