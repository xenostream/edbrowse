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

1. Login => Select File => "Edit" button

1. <kbd>Ctrl+Shift+J</kbd> open Console => Sources => github-ed.js => Run

```js
(() => {
  "use strict";

  let view = null;
  let lastRegex = "";
  let lastSubstitution = null;

  const ESC = "\uFFFF";

  /* ============================================================
   * CodeMirror
   * ============================================================ */

  function isView(v) {
    return !!(
      v &&
      v.state?.doc &&
      typeof v.dispatch === "function" &&
      v.dom?.isConnected
    );
  }

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

  function readLines() {
    const d = findView().state.doc;
    const result = [];

    for (let n = 1; n <= d.lines; n++)
      result.push(d.line(n).text);

    return result;
  }


  function writeLines(lines, cursor = 1) {
    const v = findView();

    if (!Array.isArray(lines) || !lines.length)
      lines = [""];

    const normalized =
      lines.map(
        x => String(x ?? "")
      );

    const text =
      normalized.join("\n");

    const newLineCount =
      Math.max(
        1,
        normalized.length
      );

    const targetLine =
      Math.max(
        1,
        Math.min(
          Number(cursor) || 1,
          newLineCount
        )
      );

    let anchor = 0;

    for (
      let i = 0;
      i < targetLine - 1;
      i++
    ) {
      anchor +=
        normalized[i].length + 1;
    }

    anchor =
      Math.max(
        0,
        Math.min(
          anchor,
          text.length
        )
      );

    v.dispatch({
      changes: {
        from: 0,
        to: v.state.doc.length,
        insert: text
      },

      selection: {
        anchor
      },

      scrollIntoView: true
    });
  }

  function currentLine() {
    const v = findView();

    return v.state.doc.lineAt(
      v.state.selection.main.head
    ).number;
  }

  function moveCursor(n) {
    const v = findView();
    const d = v.state.doc;

    n = Math.max(
      1,
      Math.min(
        n,
        d.lines
      )
    );

    v.dispatch({
      selection: {
        anchor: d.line(n).from
      },
      scrollIntoView: true
    });
  }

  /* ============================================================
   * 내부 buffer
   * ============================================================ */

  let buffer = null;
  let current = 1;
  let nextId = 1;

  function makeLine(text) {
    return {
      id: nextId++,
      text: String(text ?? "")
    };
  }

  function syncBuffer() {
    const lines = readLines();

    buffer =
      lines.map(makeLine);

    current =
      Math.max(
        1,
        Math.min(
          currentLine(),
          buffer.length
        )
      );
  }

  function ensureBuffer() {
    if (!buffer)
      syncBuffer();
  }

  function lineCount() {
    ensureBuffer();
    return buffer.length;
  }

  function getLine(n) {
    ensureBuffer();

    if (
      !Number.isInteger(n) ||
      n < 1 ||
      n > buffer.length
    )
      throw Error(`잘못된 줄 주소: ${n}`);

    return buffer[n - 1];
  }

  function lineIndexById(id) {
    ensureBuffer();

    return buffer.findIndex(
      x => x.id === id
    );
  }

  function lineNumberById(id) {
    const i =
      lineIndexById(id);

    return i < 0
      ? null
      : i + 1;
  }

  function setCurrent(n) {
    ensureBuffer();

    if (!buffer.length) {
      current = 0;
      return;
    }

    current =
      Math.max(
        1,
        Math.min(
          n,
          buffer.length
        )
      );
  }

  function commit() {
    ensureBuffer();

    writeLines(
      buffer.map(
        x => x.text
      ),
      Math.max(
        1,
        Math.min(
          current || 1,
          buffer.length
        )
      )
    );
  }

  /* ============================================================
   * 문자열
   * ============================================================ */

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

  /* ============================================================
   * 주소
   * ============================================================ */

  function readDelimited(
    s,
    p,
    delimiter
  ) {
    let value = "";

    while (p < s.length) {
      const c = s[p++];

      if (c === "\\") {
        if (p >= s.length)
          throw Error(
            "주소 정규식이 닫히지 않았습니다."
          );

        value +=
          "\\" + s[p++];

        continue;
      }

      if (c === delimiter) {
        return {
          value,
          end: p
        };
      }

      value += c;
    }

    throw Error(
      "주소 정규식이 닫히지 않았습니다."
    );
  }

  function searchAddress(
    re,
    base,
    direction
  ) {
    ensureBuffer();

    if (!re)
      re = lastRegex;

    if (!re)
      throw Error(
        "이전 정규식이 없습니다."
      );

    lastRegex = re;

    let rx;

    try {
      rx = new RegExp(re);
    } catch (e) {
      throw Error(
        `잘못된 정규식: ${e.message}`
      );
    }

    let n = base;

    for (
      let i = 0;
      i < buffer.length;
      i++
    ) {
      n += direction;

      if (n > buffer.length)
        n = 1;

      if (n < 1)
        n = buffer.length;

      rx.lastIndex = 0;

      if (
        rx.test(
          buffer[n - 1].text
        )
      )
        return n;
    }

    throw Error(
      `정규식에 일치하는 줄이 없습니다: /${re}/`
    );
  }

  function parseAddressAt(
    s,
    pos = 0,
    base = current
  ) {
    ensureBuffer();

    while (
      pos < s.length &&
      /\s/.test(s[pos])
    )
      pos++;

    if (pos >= s.length) {
      return {
        value: base,
        end: pos,
        present: false
      };
    }

    let n;
    let present = true;

    const c = s[pos];

    if (c === ".") {
      n = base;
      pos++;
    }

    else if (c === "$") {
      n = buffer.length;
      pos++;
    }

    else if (c === "0") {
      n = 0;
      pos++;
    }

    else if (/[0-9]/.test(c)) {
      const m =
        s
          .slice(pos)
          .match(/^\d+/);

      n =
        Number(m[0]);

      pos +=
        m[0].length;
    }

    else if (
      c === "/" ||
      c === "?"
    ) {
      const delimiter = c;

      const r =
        readDelimited(
          s,
          pos + 1,
          delimiter
        );

      n =
        searchAddress(
          r.value,
          base,
          delimiter === "/"
            ? 1
            : -1
        );

      pos = r.end;
    }

    else if (
      c === "+" ||
      c === "-"
    ) {
      n = base;
    }

    else {
      return {
        value: base,
        end: pos,
        present: false
      };
    }

    while (pos < s.length) {
      while (
        pos < s.length &&
        /\s/.test(s[pos])
      )
        pos++;

      if (
        s[pos] !== "+" &&
        s[pos] !== "-"
      )
        break;

      const sign =
        s[pos++] === "+"
          ? 1
          : -1;

      const m =
        s
          .slice(pos)
          .match(/^\d+/);

      const amount =
        m
          ? Number(m[0])
          : 1;

      if (m)
        pos +=
          m[0].length;

      n +=
        sign * amount;
    }

    if (
      n < 0 ||
      n > buffer.length
    )
      throw Error(
        `잘못된 줄 주소: ${n}`
      );

    return {
      value: n,
      end: pos,
      present
    };
  }

  function parseRangeAt(
    s,
    pos = 0,
    defaultAddr = "."
  ) {
    ensureBuffer();

    const startPos = pos;

    while (
      pos < s.length &&
      /\s/.test(s[pos])
    )
      pos++;

    if (
      s[pos] === "," ||
      s[pos] === ";"
    ) {
      const separator =
        s[pos++];

      const first =
        separator === ","
          ? 1
          : current;

      const second =
        buffer.length;

      return {
        s: first,
        e: second,
        end: pos,
        present: true
      };
    }

    if (pos >= s.length) {
      const n =
        parseAddress(
          defaultAddr
        );

      return {
        s: n,
        e: n,
        end: pos,
        present: false
      };
    }

    const first =
      parseAddressAt(
        s,
        pos,
        current
      );

    if (!first.present) {
      const n =
        parseAddress(
          defaultAddr
        );

      return {
        s: n,
        e: n,
        end: startPos,
        present: false
      };
    }

    pos =
      first.end;

    while (
      pos < s.length &&
      /\s/.test(s[pos])
    )
      pos++;

    if (
      s[pos] !== "," &&
      s[pos] !== ";"
    ) {
      return {
        s: first.value,
        e: first.value,
        end: pos,
        present: true
      };
    }

    const separator =
      s[pos++];

    const second =
      parseAddressAt(
        s,
        pos,
        separator === ";"
          ? first.value
          : current
      );

    if (!second.present)
      throw Error(
        "두 번째 주소가 없습니다."
      );

    pos =
      second.end;

    if (separator === ";")
      setCurrent(first.value);

    if (
      first.value >
      second.value
    )
      throw Error(
        "잘못된 줄 범위입니다."
      );

    return {
      s: first.value,
      e: second.value,
      end: pos,
      present: true
    };
  }

  function parseAddress(
    s,
    base = current
  ) {
    ensureBuffer();

    const text =
      String(s ?? "");

    const r =
      parseAddressAt(
        text,
        0,
        base
      );

    if (!r.present)
      throw Error(
        `잘못된 주소: ${s}`
      );

    if (
      text
        .slice(r.end)
        .trim()
    )
      throw Error(
        `잘못된 주소: ${s}`
      );

    return r.value;
  }

  function getRange(
    s,
    defaultAddr = "."
  ) {
    ensureBuffer();

    const text =
      String(s ?? "");

    if (text.trim() === ",") {
      return {
        s: 1,
        e: buffer.length
      };
    }

    if (text.trim() === ";") {
      return {
        s: current,
        e: buffer.length
      };
    }

    const r =
      parseRangeAt(
        text,
        0,
        defaultAddr
      );

    if (
      text
        .slice(r.end)
        .trim()
    )
      throw Error(
        `잘못된 주소: ${s}`
      );

    return {
      s: r.s,
      e: r.e
    };
  }

  /* ============================================================
   * 출력
   * ============================================================ */

  function printCommand(
    addr,
    numbered = false,
    list = false
  ) {
    const { s, e } =
      getRange(
        addr,
        "."
      );

    for (
      let n = s;
      n <= e;
      n++
    ) {
      let text =
        getLine(n).text;

      if (list) {
        text =
          text
            .replace(
              /\\/g,
              "\\\\"
            )
            .replace(
              /\t/g,
              "\\t"
            )
            .replace(
              /\r/g,
              "\\r"
            )
            .replace(
              /[\x00-\x1f\x7f-\x9f]/g,
              c => {
                if (c === "\n")
                  return "\\n";

                return (
                  "\\x" +
                  c
                    .codePointAt(0)
                    .toString(16)
                    .padStart(
                      2,
                      "0"
                    )
                );
              }
            );

        console.log(
          `${text}$`
        );
      }

      else if (numbered) {
        console.log(
          `${n}\t${text}`
        );
      }

      else {
        console.log(text);
      }
    }

    setCurrent(e);

    return e;
  }

  /* ============================================================
   * 기본 편집
   * ============================================================ */

  function deleteCommand(addr) {
    const { s, e } =
      getRange(
        addr,
        "."
      );

    buffer.splice(
      s - 1,
      e - s + 1
    );

    if (!buffer.length) {
      buffer.push(
        makeLine("")
      );

      setCurrent(1);

      return 1;
    }

    setCurrent(
      Math.min(
        s,
        buffer.length
      )
    );

    return current;
  }

  function splitText(text) {
    return String(text)
      .replace(
        /\r\n/g,
        "\n"
      )
      .replace(
        /\r/g,
        "\n"
      )
      .split("\n");
  }

  function insertCommand(
    addr,
    text
  ) {
    const n =
      parseAddress(
        addr || "."
      );

    const items =
      splitText(text)
        .map(makeLine);

    buffer.splice(
      n - 1,
      0,
      ...items
    );

    setCurrent(
      n +
      items.length -
      1
    );

    return current;
  }

  function appendCommand(
    addr,
    text
  ) {
    const n =
      parseAddress(
        addr || "."
      );

    const items =
      splitText(text)
        .map(makeLine);

    buffer.splice(
      n,
      0,
      ...items
    );

    setCurrent(
      n +
      items.length
    );

    return current;
  }

  function changeCommand(
    addr,
    text
  ) {
    const { s, e } =
      getRange(
        addr,
        "."
      );

    const items =
      splitText(text)
        .map(makeLine);

    buffer.splice(
      s - 1,
      e - s + 1,
      ...items
    );

    if (items.length) {
      setCurrent(
        s +
        items.length -
        1
      );
    }

    else {
      setCurrent(
        Math.min(
          s,
          buffer.length
        )
      );
    }

    return current;
  }

  /* ============================================================
   * j
   * ============================================================ */

  function joinCommand(addr) {
    ensureBuffer();

    let s;
    let e;

    if (
      addr == null ||
      String(addr).trim() === ""
    ) {
      s = current;
      e = current + 1;
    }

    else {
      const range =
        getRange(
          addr,
          "."
        );

      s = range.s;
      e = range.e;

      if (s === e)
        e = s + 1;
    }

    if (
      s < 1 ||
      s > buffer.length
    )
      throw Error(
        `잘못된 줄 주소: ${s}`
      );

    if (
      e > buffer.length
    )
      e = buffer.length;

    if (s === e) {
      setCurrent(s);
      return s;
    }

    const text =
      buffer
        .slice(
          s - 1,
          e
        )
        .map(
          x => x.text
        )
        .join("");

    const joined =
      makeLine(text);

    buffer.splice(
      s - 1,
      e - s + 1,
      joined
    );

    setCurrent(s);

    return s;
  }

  /* ============================================================
   * t
   * ============================================================ */

  function copyCommand(
    addr,
    dest
  ) {
    const { s, e } =
      getRange(
        addr,
        "."
      );

    const target =
      parseAddress(
        dest,
        current
      );

    if (target === 0) {
      const copies =
        buffer
          .slice(
            s - 1,
            e
          )
          .map(
            x =>
              makeLine(x.text)
          );

      buffer.splice(
        0,
        0,
        ...copies
      );

      setCurrent(
        copies.length
      );

      return current;
    }

    if (
      target >= s &&
      target <= e &&
      !(
        s === e &&
        target === s
      )
    ) {
      throw Error(
        "복사 대상이 원본 범위 안에 있습니다."
      );
    }

    const copies =
      buffer
        .slice(
          s - 1,
          e
        )
        .map(
          x =>
            makeLine(x.text)
        );

    buffer.splice(
      target,
      0,
      ...copies
    );

    setCurrent(
      target +
      copies.length
    );

    return current;
  }

  /* ============================================================
   * m
   * ============================================================ */

  function moveCommand(
    addr,
    dest
  ) {
    const { s, e } =
      getRange(
        addr,
        "."
      );

    const target =
      parseAddress(
        dest,
        current
      );

    if (
      target >= s &&
      target <= e
    ) {
      throw Error(
        "이동 대상이 원본 범위 안에 있습니다."
      );
    }

    const count =
      e - s + 1;

    const moved =
      buffer.splice(
        s - 1,
        count
      );

    let insertAt;

    if (target < s)
      insertAt = target;
    else
      insertAt =
        target - count;

    buffer.splice(
      insertAt,
      0,
      ...moved
    );

    setCurrent(
      insertAt + count
    );

    return current;
  }

  /* ============================================================
   * Substitute parser
   * ============================================================ */

  function parseSubstitute(s) {
    if (s[0] !== "s")
      throw Error(
        "잘못된 substitute 명령입니다."
      );

    const delimiter = s[1];

    if (!delimiter)
      throw Error(
        "s 구분자가 없습니다."
      );

    let p = 2;
    const parts = [];

    for (
      let field = 0;
      field < 2;
      field++
    ) {
      let value = "";
      let closed = false;

      while (p < s.length) {
        const c = s[p];

        if (c === "\\") {
          if (
            p + 1 >= s.length
          )
            throw Error(
              "substitute escape가 닫히지 않았습니다."
            );

          const n =
            s[p + 1];

          if (n === "\n") {
            value +=
              ESC + "\n";

            p += 2;

            continue;
          }

          if (
            n === "\r" &&
            s[p + 2] === "\n"
          ) {
            value +=
              ESC + "\n";

            p += 3;

            continue;
          }

          value +=
            ESC + n;

          p += 2;

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
        throw Error(
          "substitute 구분자가 닫히지 않았습니다."
        );

      parts.push(value);
    }

    let flags = "";

    while (
      p < s.length &&
      /[0-9gGpPlnIi]/.test(
        s[p]
      )
    ) {
      const f = s[p++];

      if (flags.includes(f))
        throw Error(
          `중복 substitute flag: ${f}`
        );

      flags += f;
    }

    if (
      s
        .slice(p)
        .trim()
    )
      throw Error(
        `잘못된 substitute suffix: ${s.slice(p)}`
      );

    return {
      delimiter,
      pattern: parts[0],
      replacement: parts[1],
      flags
    };
  }

  function decodeSubPattern(
    s,
    delimiter
  ) {
    let out = "";

    for (
      let i = 0;
      i < s.length;
      i++
    ) {
      const c = s[i];

      if (c !== ESC) {
        out += c;
        continue;
      }

      const n =
        s[++i];

      if (n === delimiter)
        out += delimiter;

      else if (n === "\n")
        out += "\n";

      else
        out +=
          "\\" + n;
    }

    return out;
  }

  function decodeSubReplacement(
    s,
    delimiter
  ) {
    let out = "";

    for (
      let i = 0;
      i < s.length;
      i++
    ) {
      const c = s[i];

      if (c !== ESC) {
        out += c;
        continue;
      }

      const n =
        s[++i];

      if (n === "\n") {
        out += "\n";
        continue;
      }

      if (n === delimiter) {
        out += delimiter;
        continue;
      }

      if (/[1-9]/.test(n)) {
        out +=
          "$" + n;
        continue;
      }

      if (n === "&") {
        out += "$&";
        continue;
      }

      out += n;
    }

    return out;
  }

  function jsReplacementToText(
    old,
    regex,
    replacement
  ) {
    return old.replace(
      regex,
      replacement
    );
  }

  function substituteCommand(
    addr,
    command
  ) {
    const sub =
      parseSubstitute(command);

    let pattern =
      decodeSubPattern(
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
      decodeSubReplacement(
        sub.replacement,
        sub.delimiter
      );

    const flags =
      sub.flags;

    const globalFlag =
      flags.includes("g");

    const ignoreCase =
      flags.includes("I") ||
      flags.includes("i");

    const regexFlags =
      (
        globalFlag
          ? "g"
          : ""
      ) +
      (
        ignoreCase
          ? "i"
          : ""
      );

    let re;

    try {
      re =
        new RegExp(
          pattern,
          regexFlags
        );
    } catch (e) {
      throw Error(
        `잘못된 정규식: ${e.message}`
      );
    }

    const range =
      getRange(
        addr,
        "."
      );

    const start =
      range.s;

    const originalEnd =
      range.e;

    let n = start;

    let changed = false;
    let lastChanged =
      current;

    while (
      n <= originalEnd &&
      n <= buffer.length
    ) {
      const item =
        buffer[n - 1];

      re.lastIndex = 0;

      const old =
        item.text;

      const neu =
        jsReplacementToText(
          old,
          re,
          replacement
        );

      if (old === neu) {
        n++;
        continue;
      }

      changed = true;

      const newTexts =
        splitText(neu);

      const newItems =
        newTexts.map(
          makeLine
        );

      buffer.splice(
        n - 1,
        1,
        ...newItems
      );

      lastChanged =
        n +
        newItems.length -
        1;

      n =
        lastChanged + 1;
    }

    if (!changed)
      throw Error(
        "치환 없음"
      );

    setCurrent(
      lastChanged
    );

    lastSubstitution = {
      pattern,
      replacement,
      global: globalFlag
    };

    if (flags.includes("p"))
      printCommand(
        String(current),
        false,
        false
      );

    if (flags.includes("n"))
      printCommand(
        String(current),
        true,
        false
      );

    if (flags.includes("l"))
      printCommand(
        String(current),
        false,
        true
      );

    return current;
  }

  /* ============================================================
   * Global parser
   * ============================================================ */

  function parseGlobalHeader(code) {
    const type = code[0];

    if (
      type !== "g" &&
      type !== "v"
    )
      throw Error(
        "잘못된 global 명령입니다."
      );

    const delimiter =
      code[1];

    if (!delimiter)
      throw Error(
        "global 구분자가 없습니다."
      );

    let p = 2;
    let pattern = "";

    while (p < code.length) {
      const c =
        code[p++];

      if (c === "\\") {
        if (
          p >= code.length
        )
          throw Error(
            "global 정규식 escape가 닫히지 않았습니다."
          );

        pattern +=
          "\\" + code[p++];

        continue;
      }

      if (c === delimiter)
        break;

      pattern += c;
    }

    if (
      p > code.length ||
      code[p - 1] !== delimiter
    ) {
      throw Error(
        "global 정규식이 닫히지 않았습니다."
      );
    }

    return {
      type,
      delimiter,
      pattern,
      restStart: p
    };
  }

  function scanSubstituteCommand(
    text,
    start
  ) {
    const delimiter =
      text[start + 1];

    if (!delimiter)
      throw Error(
        "substitute 구분자가 없습니다."
      );

    let p =
      start + 2;

    for (
      let field = 0;
      field < 2;
      field++
    ) {
      let closed = false;

      while (
        p < text.length
      ) {
        const c =
          text[p];

        if (c === "\\") {
          if (
            text[p + 1] === "\r" &&
            text[p + 2] === "\n"
          ) {
            p += 3;
          }

          else {
            p += 2;
          }

          continue;
        }

        if (
          c === delimiter
        ) {
          p++;
          closed = true;
          break;
        }

        p++;
      }

      if (!closed)
        throw Error(
          "global 내부 substitute가 닫히지 않았습니다."
        );
    }

    while (
      p < text.length &&
      /[0-9gGpPlnIi]/.test(
        text[p]
      )
    )
      p++;

    return p;
  }

  function splitGlobalCommands(text) {
    const result = [];

    let start = 0;
    let p = 0;

    while (
      p < text.length
    ) {
      const c =
        text[p];

      if (
        c === "s" &&
        p + 1 < text.length
      ) {
        p =
          scanSubstituteCommand(
            text,
            p
          );

        continue;
      }

      if (
        c === "\\" &&
        (
          text[p + 1] === "\n" ||
          (
            text[p + 1] === "\r" &&
            text[p + 2] === "\n"
          )
        )
      ) {
        const command =
          text
            .slice(
              start,
              p
            )
            .trim();

        if (command)
          result.push(command);

        if (
          text[p + 1] === "\r"
        )
          p += 3;
        else
          p += 2;

        start = p;

        continue;
      }

      if (c === "\n") {
        const command =
          text
            .slice(
              start,
              p
            )
            .trim();

        if (command)
          result.push(command);

        p++;
        start = p;

        continue;
      }

      p++;
    }

    const last =
      text
        .slice(start)
        .trim();

    if (last)
      result.push(last);

    return result;
  }

  /* ============================================================
   * global
   * ============================================================ */

  function globalCommand(
    addr,
    code
  ) {
    const g =
      parseGlobalHeader(code);

    let pattern =
      decodeSubPattern(
        g.pattern,
        g.delimiter
      );

    if (!pattern)
      pattern = lastRegex;

    if (!pattern)
      throw Error(
        "이전 정규식이 없습니다."
      );

    lastRegex = pattern;

    let re;

    try {
      re =
        new RegExp(pattern);
    } catch (e) {
      throw Error(
        `잘못된 global 정규식: ${e.message}`
      );
    }

    const { s, e } =
      getRange(
        addr,
        "1,$"
      );

    const markedIds = [];

    for (
      let n = s;
      n <= e;
      n++
    ) {
      re.lastIndex = 0;

      const matched =
        re.test(
          buffer[n - 1].text
        );

      const select =
        g.type === "g"
          ? matched
          : !matched;

      if (select)
        markedIds.push(
          buffer[n - 1].id
        );
    }

    let commandText =
      code.slice(
        g.restStart
      );

    if (
      !commandText.trim()
    )
      commandText = "p";

    const commands =
      splitGlobalCommands(
        commandText
      );

    if (!commands.length)
      commands.push("p");

    let lastResult =
      current;

    for (
      const id of markedIds
    ) {
      const index =
        lineIndexById(id);

      if (index < 0)
        continue;

      setCurrent(
        index + 1
      );

      for (
        const command of commands
      ) {
        if (!command)
          continue;

        const trimmed =
          command.trim();

        if (
          /^[gv][/?]/.test(
            trimmed
          )
        ) {
          throw Error(
            "global 안에서 global/vglobal은 사용할 수 없습니다."
          );
        }

        lastResult =
          execute(
            trimmed,
            String(current)
          );
      }
    }

    return lastResult;
  }

  /* ============================================================
   * 주소 + command 분리
   * ============================================================ */

  function splitAddressAndCommand(
    code
  ) {
    const r =
      parseRangeAt(
        code,
        0,
        "."
      );

    if (!r.present) {
      return {
        addr: null,
        rest: code.trim()
      };
    }

    return {
      addr:
        code
          .slice(
            0,
            r.end
          )
          .trim(),

      rest:
        code
          .slice(
            r.end
          )
          .trimStart()
    };
  }

  /* ============================================================
   * execute
   * ============================================================ */

  function execute(
    code,
    forcedAddr = null
  ) {
    ensureBuffer();

    code =
      String(code ?? "")
        .replace(
          /\r\n/g,
          "\n"
        )
        .trim();

    if (!code)
      return current;

    if (
      code === "help" ||
      code === "?"
    )
      return help();

    if (code === "u") {
      const v =
        findView();

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

      buffer = null;

      return currentLine();
    }

    let parsed;

    try {
      parsed =
        splitAddressAndCommand(
          code
        );
    } catch {
      parsed = {
        addr: null,
        rest: code
      };
    }

    const addr =
      parsed.addr;

    const command =
      parsed.rest;

    const effectiveAddr =
      addr ||
      forcedAddr ||
      null;

    if (
      !addr &&
      (
        command.startsWith("g/") ||
        command.startsWith("g?") ||
        command.startsWith("v/") ||
        command.startsWith("v?")
      )
    ) {
      return globalCommand(
        forcedAddr || "1,$",
        command
      );
    }

    if (
      !addr &&
      command[0] === "s"
    ) {
      return substituteCommand(
        forcedAddr || ".",
        command
      );
    }

    if (!command) {
      return printCommand(
        effectiveAddr || ".",
        false,
        false
      );
    }

    if (
      command[0] === "g" ||
      command[0] === "v"
    ) {
      if (
        command[1] === "/" ||
        command[1] === "?"
      ) {
        return globalCommand(
          effectiveAddr || "1,$",
          command
        );
      }
    }

    if (
      command[0] === "s"
    ) {
      return substituteCommand(
        effectiveAddr || ".",
        command
      );
    }

    const c =
      command[0];

    switch (c) {

      case "p": {
        const suffix =
          command
            .slice(1)
            .trim();

        if (suffix)
          throw Error(
            `알 수 없는 명령입니다: ${code}`
          );

        return printCommand(
          effectiveAddr || ".",
          false,
          false
        );
      }

      case "n": {
        const suffix =
          command
            .slice(1)
            .trim();

        if (suffix)
          throw Error(
            `알 수 없는 명령입니다: ${code}`
          );

        return printCommand(
          effectiveAddr || ".",
          true,
          false
        );
      }

      case "l": {
        const suffix =
          command
            .slice(1)
            .trim();

        if (suffix)
          throw Error(
            `알 수 없는 명령입니다: ${code}`
          );

        return printCommand(
          effectiveAddr || ".",
          false,
          true
        );
      }

      case "d": {
        if (
          command
            .slice(1)
            .trim()
        )
          throw Error(
            `알 수 없는 명령입니다: ${code}`
          );

        return deleteCommand(
          effectiveAddr || "."
        );
      }

      case "j": {
        if (
          command
            .slice(1)
            .trim()
        )
          throw Error(
            `알 수 없는 명령입니다: ${code}`
          );

        return joinCommand(
          effectiveAddr || null
        );
      }

      case "i": {
        const rest =
          command
            .slice(1)
            .trim();

        if (!rest)
          throw Error(
            "insert 내용이 없습니다."
          );

        return insertCommand(
          effectiveAddr || ".",
          quoted(rest)
        );
      }

      case "a": {
        const rest =
          command
            .slice(1)
            .trim();

        if (!rest)
          throw Error(
            "append 내용이 없습니다."
          );

        return appendCommand(
          effectiveAddr || ".",
          quoted(rest)
        );
      }

      case "c": {
        const rest =
          command
            .slice(1)
            .trim();

        if (!rest)
          throw Error(
            "change 내용이 없습니다."
          );

        return changeCommand(
          effectiveAddr || ".",
          quoted(rest)
        );
      }

      case "t": {
        const rest =
          command
            .slice(1)
            .trim();

        if (!rest)
          throw Error(
            "copy 대상 주소가 없습니다."
          );

        return copyCommand(
          effectiveAddr || ".",
          rest
        );
      }

      case "m": {
        const rest =
          command
            .slice(1)
            .trim();

        if (!rest)
          throw Error(
            "move 대상 주소가 없습니다."
          );

        return moveCommand(
          effectiveAddr || ".",
          rest
        );
      }

      case "=": {
        const r =
          effectiveAddr
            ? getRange(
                effectiveAddr,
                "."
              )
            : {
                s: buffer.length,
                e: buffer.length
              };

        console.log(r.e);

        return current;
      }

      default:
        throw Error(
          `알 수 없는 명령입니다: ${code}`
        );
    }
  }

  /* ============================================================
   * Top-level command splitter
   * ============================================================ */

  function scanTopLevelSubstitute(
    text,
    start
  ) {
    return scanSubstituteCommand(
      text,
      start
    );
  }

  function scanTopLevelGlobal(
    text,
    start
  ) {
    const delimiter =
      text[start + 1];

    let p =
      start + 2;

    while (
      p < text.length
    ) {
      const c =
        text[p];

      if (c === "\\") {
        p += 2;
        continue;
      }

      if (
        c === delimiter
      ) {
        p++;
        break;
      }

      p++;
    }

    return text.length;
  }

  function splitTopLevelCommands(
    text
  ) {
    const result = [];

    let start = 0;
    let p = 0;

    while (
      p < text.length
    ) {
      const c =
        text[p];

      if (
        (
          c === "g" ||
          c === "v"
        ) &&
        p + 1 < text.length &&
        (
          text[p + 1] === "/" ||
          text[p + 1] === "?"
        ) &&
        (
          p === start ||
          /[\s,;]/.test(
            text[p - 1]
          )
        )
      ) {
        p =
          scanTopLevelGlobal(
            text,
            p
          );

        continue;
      }

      if (
        c === "s" &&
        p === start
      ) {
        p =
          scanTopLevelSubstitute(
            text,
            p
          );

        continue;
      }

      if (
        (
          c === "/" ||
          c === "?"
        ) &&
        (
          p === start ||
          /[\s,;]/.test(
            text[p - 1]
          )
        )
      ) {
        const delimiter = c;

        p++;

        while (
          p < text.length
        ) {
          if (
            text[p] === "\\"
          ) {
            p += 2;
            continue;
          }

          if (
            text[p] === delimiter
          ) {
            p++;
            break;
          }

          p++;
        }

        continue;
      }

      if (c === "\n") {
        const command =
          text
            .slice(
              start,
              p
            )
            .trim();

        if (command)
          result.push(command);

        p++;
        start = p;

        continue;
      }

      p++;
    }

    const last =
      text
        .slice(start)
        .trim();

    if (last)
      result.push(last);

    return result;
  }

  /* ============================================================
   * runCode
   * ============================================================ */

  function runCode(code) {
    code =
      String(code ?? "");

    if (!code.trim())
      return;

    syncBuffer();

    const commands =
      splitTopLevelCommands(
        code
      );

    let result =
      current;

    for (
      const command of commands
    ) {
      result =
        execute(command);
    }

    commit();

    return result;
  }

  /* ============================================================
   * help
   * ============================================================ */

  function help() {
    console.log(`
GitHub CodeMirror ed

주소
  .             현재 줄
  $             마지막 줄
  0             첫 줄 앞
  3             절대 주소
  +             현재 + 1
  -             현재 - 1
  +2
  -2
  .+3
  $-2
  /regexp/      다음 일치 줄
  ?regexp?      이전 일치 줄

범위
  1,$
  .,$
  .,+3
  .-2,.+2
  1;5
  ,
  ;

출력
  p
  n
  l
  ,p
  ,n
  ,l
  ;p
  ;n
  ;l
  1,$p
  1,$n
  1,$l

삽입
  i "text"
  3i "text"

추가
  a "text"
  3a "text"

교체
  c "text"
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

복사
  3t10
  3,5t$
  t.
  g/the/t.

이동
  3m10
  3,5m$

합치기
  j
  3j
  3,5j
  $j

치환
  s/foo/bar/
  s/foo/bar/g
  1,$s/foo/bar/g
  s//bar/g

치환 줄바꿈
  s/hamster/ham \\
ster/

  s/(.*)(the).*/x\\1\\
\\2/

global
  g/abc/p
  g/abc/n
  g/abc/l
  g/abc/d
  g/abc/t.
  g/abc/s/abc/def/g

  g/the/
  g/the/p
  g/the/n
  g/the/l

global command-list
  g/abc/p\\
s/foo/bar/g\\
p

  g/the/t.\\
s/(.*)(the).*/x\\1\\
\\2/\\
s/./=/g\\
-s/./ /g\\
s/^ //\\
j

inverse global
  v/abc/p
  v/abc/n
  v/abc/d

줄 수
  =

undo
  u

도움말
  help
`);
  }

  /* ============================================================
   * install
   * ============================================================ */

  view = findView();

  window.__githubView =
    view;

  window.runCode =
    runCode;

  window.findGithubEditor =
    findView;

  window.ed = (
    strings,
    ...values
  ) => {
    if (
      typeof strings === "string"
    )
      return runCode(strings);

    return runCode(
      String.raw(
        strings,
        ...values
      )
    );
  };

  console.log(
    `%cGitHub CodeMirror ed ready — ${view.state.doc.lines} lines`,
    "color:#4caf50;font-weight:bold"
  );

  console.log(
    "ed`help` 또는 ed('help')"
  );
})();

```
