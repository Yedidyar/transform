/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * monaco-languages version: 2.5.0(19ce286ce42684fd0d08b19a2b8f36a7cfd830dd)
 * Released under the MIT license
 * https://github.com/Microsoft/monaco-languages/blob/master/LICENSE.md
 *-----------------------------------------------------------------------------*/
define("vs/basic-languages/cameligo/cameligo", ["require", "exports"], function(
  e,
  o
) {
  "use strict";
  Object.defineProperty(o, "__esModule", { value: !0 }),
    (o.language = o.conf = void 0),
    (o.conf = {
      comments: { lineComment: "//", blockComment: ["(*", "*)"] },
      brackets: [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
        ["<", ">"]
      ],
      autoClosingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: "<", close: ">" },
        { open: "'", close: "'" },
        { open: '"', close: '"' },
        { open: "(*", close: "*)" }
      ],
      surroundingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: "<", close: ">" },
        { open: "'", close: "'" },
        { open: '"', close: '"' },
        { open: "(*", close: "*)" }
      ]
    }),
    (o.language = {
      defaultToken: "",
      tokenPostfix: ".cameligo",
      ignoreCase: !0,
      brackets: [
        { open: "{", close: "}", token: "delimiter.curly" },
        { open: "[", close: "]", token: "delimiter.square" },
        { open: "(", close: ")", token: "delimiter.parenthesis" },
        { open: "<", close: ">", token: "delimiter.angle" }
      ],
      keywords: [
        "abs",
        "assert",
        "block",
        "Bytes",
        "case",
        "Crypto",
        "Current",
        "else",
        "failwith",
        "false",
        "for",
        "fun",
        "if",
        "in",
        "let",
        "let%entry",
        "let%init",
        "List",
        "list",
        "Map",
        "map",
        "match",
        "match%nat",
        "mod",
        "not",
        "operation",
        "Operation",
        "of",
        "record",
        "Set",
        "set",
        "sender",
        "skip",
        "source",
        "String",
        "then",
        "to",
        "true",
        "type",
        "with"
      ],
      typeKeywords: ["int", "unit", "string", "tz", "nat", "bool"],
      operators: [
        "=",
        ">",
        "<",
        "<=",
        ">=",
        "<>",
        ":",
        ":=",
        "and",
        "mod",
        "or",
        "+",
        "-",
        "*",
        "/",
        "@",
        "&",
        "^",
        "%",
        "->",
        "<-",
        "&&",
        "||"
      ],
      symbols: /[=><:@\^&|+\-*\/\^%]+/,
      tokenizer: {
        root: [
          [
            /[a-zA-Z_][\w]*/,
            {
              cases: {
                "@keywords": { token: "keyword.$0" },
                "@default": "identifier"
              }
            }
          ],
          { include: "@whitespace" },
          [/[{}()\[\]]/, "@brackets"],
          [/[<>](?!@symbols)/, "@brackets"],
          [
            /@symbols/,
            { cases: { "@operators": "delimiter", "@default": "" } }
          ],
          [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
          [/\$[0-9a-fA-F]{1,16}/, "number.hex"],
          [/\d+/, "number"],
          [/[;,.]/, "delimiter"],
          [/'([^'\\]|\\.)*$/, "string.invalid"],
          [/'/, "string", "@string"],
          [/'[^\\']'/, "string"],
          [/'/, "string.invalid"],
          [/\#\d+/, "string"]
        ],
        comment: [
          [/[^\(\*]+/, "comment"],
          [/\*\)/, "comment", "@pop"],
          [/\(\*/, "comment"]
        ],
        string: [
          [/[^\\']+/, "string"],
          [/\\./, "string.escape.invalid"],
          [/'/, { token: "string.quote", bracket: "@close", next: "@pop" }]
        ],
        whitespace: [
          [/[ \t\r\n]+/, "white"],
          [/\(\*/, "comment", "@comment"],
          [/\/\/.*$/, "comment"]
        ]
      }
    });
});
