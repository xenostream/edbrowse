(() => {
  "use strict";

  let view = null;
  let lastRegex = "";

  const ESC = "\uFFFF";

  /*
   * ------------------------------------------------------------
   * CodeMirror
   * ------------------------------------------------------------
   */

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
                    Math.min(cursor, d.lines)
                  )
                ).from
            },
      scrollIntoView: true
    });
  }

  /*
   * ------------------------------------------------------------
   * 문자열 / 출력
   * ------------------------------------------------------------
   */

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

  function printCommand(addr, numbered = false, list = false) {
    const { s, e } =
      getRange(addr, ".");

    const d = doc();

    for (let n = s; n <= e; n++) {
      let text = d.line(n).text;

      if (list) {
        text = text
          .replace(/\\/g, "\\\\")
          .replace(/\t/g, "\\t")
          .replace(/[^\x20-\x7e]/g, c => {
            if (c === "\n")
              return "\\n";

            const cp = c.codePointAt(0);

            return "\\x" +
              cp.toString(16).padStart(4, "0");
          });
      }

      if (numbered)
        console.log(`${n}\t${text}`);
      else
        console.log(`${n}: ${text}`);
    }

    moveCursor(e);
    return e;
  }

  /*
   * ------------------------------------------------------------
   * 주소
   *
   * 원본 ed의 핵심:
   *
   *   address [, address]
   *
   * 주소에는
   *
   *   .
   *   $
   *   숫자
   *   + / -
   *   /regexp/
   *   ?regexp?
   *
   * 등이 올 수 있다.
   * ------------------------------------------------------------
   */

  function readDelimited(s, p, delimiter) {
    let value = "";
    let escaped = false;

    while (p < s.length) {
      const c = s[p++];

      if (escaped) {
        value += "\\" + c;
        escaped = false;
        continue;
      }

      if (c === "\\") {
        escaped = true;
        continue;
      }

      if (c === delimiter)
        return {
          value,
          end: p
        };

      value += c;
    }

    throw Error("주소 정규식이 닫히지 않았습니다.");
  }

  function searchAddress(re, base, direction) {
    const d = doc();

    if (!re)
      re = lastRegex;

    if (!re)
      throw Error("이전 정규식이 없습니다.");

    lastRegex = re;

    const rx = new RegExp(re);

    let n = base;

    for (let i = 0; i < d.lines; i++) {
      n += direction;

      if (n > d.lines)
        n = 1;

      if (n < 1)
        n = d.lines;

      if (rx.test(d.line(n).text))
        return n;
    }

    throw Error("주소를 찾지 못했습니다.");
  }

  function parseAddressAt(s, pos = 0, base = currentLine()) {
    const d = doc();

    while (
      pos < s.length &&
      (s[pos] === " " || s[pos] === "\t")
    )
      pos++;

    if (pos >= s.length)
      return {
        value: base,
        end: pos,
        present: false
      };

    let n;
    let haveBase = false;

    const c = s[pos];

    if (c === ".") {
      n = base;
      pos++;
      haveBase = true;
    } else if (c === "$") {
      n = d.lines;
      pos++;
      haveBase = true;
    } else if (/[0-9]/.test(c)) {
      const m =
        s.slice(pos).match(/^\d+/);

      n = Number(m[0]);
      pos += m[0].length;
      haveBase = true;
    } else if (c === "/" || c === "?") {
      const delimiter = c;

      const r =
        readDelimited(
          s,
          pos + 1,
          delimiter
        );

      n = searchAddress(
        r.value,
        base,
        delimiter === "/" ? 1 : -1
      );

      pos = r.end;
      haveBase = true;
    } else if (c === "+" || c === "-") {
      n = base;
      haveBase = true;
    } else {
      return {
        value: base,
        end: pos,
        present: false
      };
    }

    while (pos < s.length) {
      while (
        pos < s.length &&
        (s[pos] === " " || s[pos] === "\t")
      )
        pos++;

      if (
        s[pos] !== "+" &&
        s[pos] !== "-"
      )
        break;

      const sign =
        s[pos++] === "+" ? 1 : -1;

      const m =
        s.slice(pos).match(/^\d+/);

      const amount =
        m ? Number(m[0]) : 1;

      if (m)
        pos += m[0].length;

      n += sign * amount;
    }

    if (
      n < 0 ||
      n > d.lines
    )
      throw Error(`잘못된 줄 주소: ${n}`);

    /*
     * ed에서 0 주소는 일부 내부 처리에서는 존재하지만
     * 일반적인 사용자 명령의 주소로는 허용하지 않는다.
     */
    if (n === 0)
      throw Error("잘못된 줄 주소: 0");

    return {
      value: n,
      end: pos,
      present: haveBase
    };
  }

  function parseRangeAt(s, pos = 0, defaultAddr = ".") {
    const startPos = pos;

    while (
      pos < s.length &&
      (s[pos] === " " || s[pos] === "\t")
    )
      pos++;

    if (pos >= s.length) {
      return {
        s: parseAddress(defaultAddr).value,
        e: parseAddress(defaultAddr).value,
        end: pos,
        present: false
      };
    }

    const first =
      parseAddressAt(
        s,
        pos,
        currentLine()
      );

    if (!first.present) {
      const n =
        parseAddress(defaultAddr).value;

      return {
        s: n,
        e: n,
        end: startPos,
        present: false
      };
    }

    pos = first.end;

    while (
      pos < s.length &&
      (s[pos] === " " || s[pos] === "\t")
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

    const separator = s[pos++];

    const second =
      parseAddressAt(
        s,
        pos,
        separator === ";"
          ? first.value
          : currentLine()
      );

    if (!second.present)
      throw Error("두 번째 주소가 없습니다.");

    if (separator === ";")
      moveCursor(first.value);

    if (first.value > second.value)
      throw Error("잘못된 줄 범위입니다.");

    return {
      s: first.value,
      e: second.value,
      end: second.end,
      present: true
    };
  }

  function parseAddress(s, base = currentLine()) {
    const old = currentLine();

    /*
     * parseAddress는 단일 주소용.
     */
    const r =
      parseAddressAt(
        String(s ?? ""),
        0,
        base
      );

    if (!r.present)
      throw Error(`잘못된 주소: ${s}`);

    if (
      String(s ?? "")
        .slice(r.end)
        .trim()
    )
      throw Error(`잘못된 주소: ${s}`);

    /*
     * old는 주소 파싱 자체에는 사용하지 않는다.
     * 단, 명시적으로 유지하여 . 주소의 의미를
     * current line 기준으로 고정한다.
     */
    void old;

    return r.value;
  }

  function getRange(s, defaultAddr = ".") {
    const text = String(s ?? "");

    const r =
      parseRangeAt(
        text,
        0,
        defaultAddr
      );

    if (text.slice(r.end).trim())
      throw Error(`잘못된 주소: ${s}`);

    return {
      s: r.s,
      e: r.e
    };
  }

  /*
   * ------------------------------------------------------------
   * 기본 편집 명령
   * ------------------------------------------------------------
   */

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
      parseAddress(
        addr || "."
      );

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
      parseAddress(
        addr || "."
      );

    dispatch(
      {
        from: line(n).to,
        insert: "\n" + text
      },
      n + text.split("\n").length
    );

    return n + text.split("\n").length;
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
            insert: "\n" + text
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

  /*
   * ------------------------------------------------------------
   * substitute
   *
   * 원본 compsub():
   *
   *   \x  -> ESCFLG x
   *   \<newline> -> ESCFLG newline
   *
   * 따라서 여기서 '\'를 무조건 결과 문자열에 넣으면 안 된다.
   * ------------------------------------------------------------
   */

  function parseSubstitute(s) {
    if (s[0] !== "s")
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
            throw Error(
              "이스케이프가 닫히지 않았습니다."
            );

          const next = s[p + 1];

          /*
           * 원본 ed:
           *
           *     if(c == '\\') {
           *       c = getchr();
           *       *p++ = ESCFLG;
           *       ...
           *     }
           *
           * 실제 LF를 만난 경우에도 ESC로 저장된다.
           */
          if (next === "\n") {
            value += ESC + "\n";
            p += 2;
            continue;
          }

          if (
            next === "\r" &&
            s[p + 2] === "\n"
          ) {
            value += ESC + "\n";
            p += 3;
            continue;
          }

          /*
           * \delimiter
           */
          value += ESC + next;
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

    const flagStart = p;

    while (
      p < s.length &&
      /[g]/.test(s[p])
    )
      p++;

    return {
      delimiter,
      pattern: parts[0],
      replacement: parts[1],
      flags: s.slice(flagStart, p),
      end: p
    };
  }

  function decodeSubPattern(s, delimiter) {
    let out = "";

    for (let i = 0; i < s.length; i++) {
      const c = s[i];

      if (c !== ESC) {
        out += c;
        continue;
      }

      const n = s[++i];

      if (n === delimiter)
        out += delimiter;
      else
        out += "\\" + n;
    }

    return out;
  }

  function decodeSubReplacement(s, delimiter) {
    let out = "";

    for (let i = 0; i < s.length; i++) {
      const c = s[i];

      if (c !== ESC) {
        out += c;
        continue;
      }

      const n = s[++i];

      /*
       * s/foo/ham \
       * ster/
       *
       * => "ham \nster"
       *
       * 여기서는 '\' 자체를 넣지 않는다.
       */
      if (n === "\n") {
        out += "\n";
        continue;
      }

      /*
       * \delimiter
       */
      if (n === delimiter) {
        out += delimiter;
        continue;
      }

      /*
       * \1 ~ \9
       *
       * JS replace()의 $1 계열과 구분하기 위해
       * 원본 ed의 ESC 처리는 나중에 변환한다.
       */
      if (/[1-9]/.test(n)) {
        out += "$" + n;
        continue;
      }

      /*
       * 기타 \x는 원본의 ESCFLG x.
       * JS replacement에서는 그대로 x를 넣는다.
       */
      out += n;
    }

    return out;
  }

  function substituteCommand(addr, command) {
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

    let flags = sub.flags;

    /*
     * ed의 s 명령은 기본적으로 첫 번째 match만,
     * g가 있으면 모든 match.
     */
    const re =
      new RegExp(
        pattern,
        flags
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
      /*
       * 원본 ed의 substitute는 global 내부가 아니면
       * 실패 시 에러 상태가 되지만, 여기서는 기존
       * 콘솔 인터페이스를 유지한다.
       */
      console.log("치환 없음");
      return e;
    }

    dispatch(changes, e);

    return e;
  }

  /*
   * ------------------------------------------------------------
   * global
   *
   * 원본 global()은:
   *
   *   g/re/command
   *
   * command가 비어 있으면 p를 집어넣는다.
   *
   * 또한 command 내부에서 \를 사용하여 여러 명령을
   * 하나의 global command stream으로 만든다.
   * ------------------------------------------------------------
   */

  function parseGlobal(code) {
    const type = code[0];

    if (
      type !== "g" &&
      type !== "v"
    )
      throw Error(
        "잘못된 global 명령입니다."
      );

    const delimiter = code[1];

    if (!delimiter)
      throw Error(
        "global 구분자가 없습니다."
      );

    let p = 2;
    let pattern = "";
    let escaped = false;

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

      if (c === delimiter)
        break;

      pattern += c;
    }

    if (
      p > code.length ||
      code[p - 1] !== delimiter
    )
      throw Error(
        "global 정규식이 닫히지 않았습니다."
      );

    /*
     * 원본:
     *
     * if(gp == globuf)
     *     *gp++ = 'p';
     *
     * 즉 g/re/ 자체는 p.
     */
    let command =
      code.slice(p);

    if (!command.trim())
      command = "p";

    return {
      type,
      delimiter,
      pattern,
      command
    };
  }

  function splitGlobalCommands(text) {
    const result = [];

    let start = 0;
    let p = 0;
    let braceDepth = 0;

    while (p < text.length) {
      const c = text[p];

      /*
       * substitute 안의 \는 command separator가 아니다.
       */
      if (c === "s" && p + 1 < text.length) {
        let q = p + 2;
        const delim = text[p + 1];

        let escaped = false;

        while (q < text.length) {
          const x = text[q++];

          if (escaped) {
            escaped = false;
            continue;
          }

          if (x === "\\") {
            escaped = true;
            continue;
          }

          if (x === delim)
            break;
        }

        /*
         * replacement 종료 delimiter
         */
        escaped = false;

        while (q < text.length) {
          const x = text[q];

          if (x === "\\") {
            q += 2;
            continue;
          }

          if (x === delim) {
            q++;
            break;
          }

          q++;
        }

        p = q;
        continue;
      }

      /*
       * 주소 regexp 안의 '\'도 separator가 아니다.
       */
      if (
        (c === "/" || c === "?") &&
        (p === 0 ||
         /[\s,;]/.test(text[p - 1]))
      ) {
        const delim = c;
        p++;

        while (p < text.length) {
          const x = text[p++];

          if (x === "\\") {
            p++;
            continue;
          }

          if (x === delim)
            break;
        }

        continue;
      }

      /*
       * 원본 global()의 command stream separator.
       */
      if (c === "\\") {
        const command =
          text
            .slice(start, p)
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
      text.slice(start).trim();

    if (last)
      result.push(last);

    return result;
  }

  function globalCommand(addr, code) {
    const g =
      parseGlobal(code);

    lastRegex =
      decodeSubPattern(
        g.pattern,
        g.delimiter
      );

    const { s, e } =
      getRange(
        addr,
        "1,$"
      );

    const d = doc();

    const re =
      new RegExp(
        lastRegex
      );

    const selected = [];

    /*
     * global은 명령 실행 전에 대상 줄을
     * 먼저 모두 선택한다.
     *
     * 원본 C 코드의 mark 방식과 같은 의미다.
     */
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
      )
        selected.push(n);
    }

    const commands =
      splitGlobalCommands(
        g.command
      );

    /*
     * g/re/ -> p
     */
    if (!commands.length)
      commands.push("p");

    /*
     * 원본 global:
     *
     * for(a1=zero; a1<=dol; a1++) {
     *   if(*a1 & 01) {
     *     ...
     *     globp = globuf;
     *     commands();
     *   }
     * }
     *
     * 즉 선택된 각 줄에서 command stream을
     * 실행한다.
     */
    for (const originalLine of selected) {
      if (
        originalLine < 1 ||
        originalLine > doc().lines
      )
        continue;

      let n = originalLine;

      for (const command of commands) {
        if (!command)
          continue;

        n =
          execute(
            command,
            String(n)
          );

        /*
         * p/n/l 등은 반환값으로 현재 줄을
         * 유지한다.
         */
        if (
          n == null ||
          n < 1 ||
          n > doc().lines
        )
          break;
      }
    }

    return selected.length
      ? selected.at(-1)
      : currentLine();
  }

  /*
   * ------------------------------------------------------------
   * 명령 파서
   *
   * 여기서 가장 중요한 차이:
   *
   *   "명령을 정규식 하나로 잡는다"
   *
   * 가 아니라
   *
   *   1. 주소를 먼저 읽고
   *   2. 남은 부분에서 command를 읽는다
   *
   * 로 처리한다.
   *
   * 이것이 원본 ed의 commands()와 같은 구조다.
   * ------------------------------------------------------------
   */

  function splitAddressAndCommand(code) {
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
          .slice(0, r.end)
          .trim(),
      rest:
        code
          .slice(r.end)
          .trimStart()
    };
  }

  function execute(code, forcedAddr = null) {
    code = String(code ?? "");

    /*
     * top-level의 실제 newline은 command 종료.
     * 단, substitute replacement 내부 newline은
     * parseSubstitute에서 이미 처리한다.
     */
    code = code.replace(/\r\n/g, "\n");

    /*
     * global 내부에서 전달되는 command에는
     * 앞뒤 공백을 제거해도 된다.
     */
    code = code.trim();

    if (!code)
      return;

    /*
     * help
     */
    if (
      code === "help" ||
      code === "?"
    )
      return help();

    /*
     * undo
     */
    if (code === "u")
      return undo();

    /*
     * 먼저 주소를 분리한다.
     *
     * /the/
     * /the/ p
     * 1,5p
     * 1,5
     * $d
     * 등 모두 여기서 처리된다.
     */
    let parsed;

    try {
      parsed =
        splitAddressAndCommand(code);
    } catch (err) {
      /*
       * 주소가 아니라 명령 자체인 경우에만
       * 아래 command parser로 넘긴다.
       */
      parsed = {
        addr: null,
        rest: code
      };
    }

    let addr =
      parsed.addr;

    let command =
      parsed.rest;

    /*
     * global / substitute는 주소 parser가
     * 정상적으로 끝나지 않는 특수 command이므로
     * 여기서도 직접 처리한다.
     */
    if (
      !addr &&
      /^[gv]/.test(command)
    ) {
      const g =
        command[0];

      if (
        command[1] === "/" ||
        command[1] === "?"
      ) {
        return globalCommand(
          forcedAddr ||
          "1,$",
          command
        );
      }
    }

    if (
      !addr &&
      command[0] === "s"
    ) {
      return substituteCommand(
        forcedAddr ||
        ".",
        command
      );
    }

    /*
     * forcedAddr는 global이 한 줄씩 명령을
     * 실행할 때 사용한다.
     */
    const effectiveAddr =
      addr ||
      forcedAddr ||
      null;

    /*
     * 주소만 있는 경우:
     *
     *   /the/
     *   3
     *   1,5
     *
     * 원본 ed에서는 newline command.
     * 즉 print.
     */
    if (!command) {
      return printCommand(
        effectiveAddr || ".",
        false,
        false
      );
    }

    /*
     * global
     */
    if (
      command[0] === "g" ||
      command[0] === "v"
    ) {
      if (
        command[1] === "/" ||
        command[1] === "?"
      ) {
        return globalCommand(
          effectiveAddr ||
          "1,$",
          command
        );
      }
    }

    /*
     * substitute
     */
    if (command[0] === "s") {
      return substituteCommand(
        effectiveAddr || ".",
        command
      );
    }

    /*
     * 주소 뒤에 command가 붙은 일반 명령
     */
    const c = command[0];

    switch (c) {
      case "p":
        if (command.slice(1).trim())
          throw Error(
            `알 수 없는 명령입니다: ${code}`
          );

        return printCommand(
          effectiveAddr || ".",
          false,
          false
        );

      case "n":
        if (command.slice(1).trim())
          throw Error(
            `알 수 없는 명령입니다: ${code}`
          );

        return printCommand(
          effectiveAddr || ".",
          true,
          false
        );

      case "l":
        if (command.slice(1).trim())
          throw Error(
            `알 수 없는 명령입니다: ${code}`
          );

        return printCommand(
          effectiveAddr || ".",
          false,
          true
        );

      case "d":
        if (command.slice(1).trim())
          throw Error(
            `알 수 없는 명령입니다: ${code}`
          );

        return deleteCommand(
          effectiveAddr || "."
        );

      case "j":
        if (command.slice(1).trim())
          throw Error(
            `알 수 없는 명령입니다: ${code}`
          );

        return joinCommand(
          effectiveAddr || ".,+1"
        );

      case "i": {
        const rest =
          command.slice(1).trim();

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
          command.slice(1).trim();

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
          command.slice(1).trim();

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
          command.slice(1).trim();

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
          command.slice(1).trim();

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
            ? getRange(effectiveAddr, ".")
            : {
                s: doc().lines,
                e: doc().lines
              };

        console.log(
          r.e
        );

        return r.e;
      }

      default:
        throw Error(
          `알 수 없는 명령입니다: ${code}`
        );
    }
  }

  /*
   * ------------------------------------------------------------
   * undo
   *
   * CodeMirror의 native history를 사용한다.
   * ------------------------------------------------------------
   */

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

  /*
   * ------------------------------------------------------------
   * top-level command splitter
   *
   * 중요한 점:
   *
   *   s/foo/bar/...
   *   g/foo/...
   *   /regexp/
   *
   * 내부의 '\'는 top-level separator가 아니다.
   * ------------------------------------------------------------
   */

  function scanSubstituteEnd(text, start) {
    const delimiter =
      text[start + 1];

    let p = start + 2;

    for (let field = 0; field < 2; field++) {
      while (p < text.length) {
        const c = text[p];

        if (c === "\\") {
          /*
           * 실제 LF 포함.
           */
          if (
            text[p + 1] === "\r" &&
            text[p + 2] === "\n"
          ) {
            p += 3;
          } else {
            p += 2;
          }

          continue;
        }

        if (c === delimiter) {
          p++;
          break;
        }

        p++;
      }
    }

    while (
      p < text.length &&
      text[p] === "g"
    )
      p++;

    return p;
  }

  function scanGlobalEnd(text, start) {
    const delimiter =
      text[start + 1];

    let p = start + 2;

    while (p < text.length) {
      const c = text[p];

      if (c === "\\") {
        p += 2;
        continue;
      }

      if (c === delimiter) {
        p++;
        break;
      }

      p++;
    }

    return p;
  }

  function splitTopLevelCommands(text) {
    const result = [];

    let start = 0;
    let p = 0;

    while (p < text.length) {
      const c = text[p];

      /*
       * substitute
       */
      if (
        c === "s" &&
        p + 1 < text.length
      ) {
        p =
          scanSubstituteEnd(
            text,
            p
          );

        continue;
      }

      /*
       * global
       */
      if (
        (c === "g" || c === "v") &&
        p + 1 < text.length &&
        (
          text[p + 1] === "/" ||
          text[p + 1] === "?"
        )
      ) {
        p =
          scanGlobalEnd(
            text,
            p
          );

        /*
         * global command의 내부 command stream은
         * 여기서 하나의 command로 취급한다.
         */
        continue;
      }

      /*
       * 주소 정규식.
       */
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

        while (p < text.length) {
          if (text[p] === "\\") {
            p += 2;
            continue;
          }

          if (text[p] === delimiter) {
            p++;
            break;
          }

          p++;
        }

        continue;
      }

      /*
       * top-level \ 는 command separator.
       */
      if (c === "\\") {
        const command =
          text
            .slice(start, p)
            .trim();

        if (command)
          result.push(command);

        p++;
        start = p;
        continue;
      }

      /*
       * 실제 LF는 top-level command separator.
       *
       * substitute 내부의 LF는 이미
       * scanSubstituteEnd()가 소비했으므로 여기에는
       * 도달하지 않는다.
       */
      if (c === "\n") {
        const command =
          text
            .slice(start, p)
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

  function runCode(code) {
    code = String(code ?? "");

    if (!code.trim())
      return;

    const commands =
      splitTopLevelCommands(code);

    let result;

    for (const command of commands)
      result = execute(command);

    return result;
  }

  /*
   * ------------------------------------------------------------
   * help
   * ------------------------------------------------------------
   */

  function help() {
    console.log(`
GitHub CodeMirror ed

주소
  .             현재 줄
  $             마지막 줄
  3             절대 주소
  +             현재 + 1
  -             현재 - 1
  +2
  -2
  .+3
  $-2
  /regexp/      다음 regexp 일치 줄
  ?regexp?      이전 regexp 일치 줄
  1,$
  .,$
  .,+3
  .-2,.+2
  1;5

주소만 입력
  /the/
  3
  1,5

출력
  p
  n
  l
  1,$p
  1,$n
  1,$l

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
  1,$s/foo/bar/g
  s//bar/g

치환 문자열 실제 줄바꿈
  s/hamster/ham \\
ster/

global
  g/abc/p
  g/abc/n
  g/abc/l
  g/abc/d
  g/abc/s/abc/def/g
  g/abc/s//def/g

  g/the/
  g/the/ p
  g/the/ n
  g/the/ l

global 연속 명령
  g/abc/p\\l
  g/abc/s/foo/bar/g\\p
  g/e/s//E/g\\p

inverse global
  v/abc/p
  v/abc/n
  v/abc/d

undo
  u

줄 수
  =

도움말
  help
`);
  }

  /*
   * ------------------------------------------------------------
   * install
   * ------------------------------------------------------------
   */

  view = findView();

  window.__githubView = view;
  window.runCode = runCode;
  window.findGithubEditor = findView;

  window.ed = (strings, ...values) => {
    if (typeof strings === "string")
      return runCode(strings);

    /*
     * tagged template에서는 String.raw을 사용해야
     * 사용자가 입력한 '\'가 JS escape 처리로
     * 사라지지 않는다.
     */
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
