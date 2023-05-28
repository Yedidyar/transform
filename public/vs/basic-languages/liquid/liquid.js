/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * monaco-languages version: 2.5.0(19ce286ce42684fd0d08b19a2b8f36a7cfd830dd)
 * Released under the MIT license
 * https://github.com/Microsoft/monaco-languages/blob/master/LICENSE.md
 *-----------------------------------------------------------------------------*/
define("vs/basic-languages/liquid/liquid", [
  "require",
  "exports",
  "../fillers/monaco-editor-core"
], function(e, t, i) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.language = t.conf = void 0);
  var n = [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "menuitem",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ];
  (t.conf = {
    wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g,
    brackets: [
      ["\x3c!--", "--\x3e"],
      ["<", ">"],
      ["{{", "}}"],
      ["{%", "%}"],
      ["{", "}"],
      ["(", ")"]
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "%", close: "%" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" }
    ],
    surroundingPairs: [
      { open: "<", close: ">" },
      { open: '"', close: '"' },
      { open: "'", close: "'" }
    ],
    onEnterRules: [
      {
        beforeText: new RegExp(
          "<(?!(?:" + n.join("|") + "))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$",
          "i"
        ),
        afterText: /^<\/(\w[\w\d]*)\s*>$/i,
        action: { indentAction: i.languages.IndentAction.IndentOutdent }
      },
      {
        beforeText: new RegExp(
          "<(?!(?:" + n.join("|") + "))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$",
          "i"
        ),
        action: { indentAction: i.languages.IndentAction.Indent }
      }
    ]
  }),
    (t.language = {
      defaultToken: "",
      tokenPostfix: "",
      builtinTags: [
        "if",
        "else",
        "elseif",
        "endif",
        "render",
        "assign",
        "capture",
        "endcapture",
        "case",
        "endcase",
        "comment",
        "endcomment",
        "cycle",
        "decrement",
        "for",
        "endfor",
        "include",
        "increment",
        "layout",
        "raw",
        "endraw",
        "render",
        "tablerow",
        "endtablerow",
        "unless",
        "endunless"
      ],
      builtinFilters: [
        "abs",
        "append",
        "at_least",
        "at_most",
        "capitalize",
        "ceil",
        "compact",
        "date",
        "default",
        "divided_by",
        "downcase",
        "escape",
        "escape_once",
        "first",
        "floor",
        "join",
        "json",
        "last",
        "lstrip",
        "map",
        "minus",
        "modulo",
        "newline_to_br",
        "plus",
        "prepend",
        "remove",
        "remove_first",
        "replace",
        "replace_first",
        "reverse",
        "round",
        "rstrip",
        "size",
        "slice",
        "sort",
        "sort_natural",
        "split",
        "strip",
        "strip_html",
        "strip_newlines",
        "times",
        "truncate",
        "truncatewords",
        "uniq",
        "upcase",
        "url_decode",
        "url_encode",
        "where"
      ],
      constants: ["true", "false"],
      operators: ["==", "!=", ">", "<", ">=", "<="],
      symbol: /[=><!]+/,
      identifier: /[a-zA-Z_][\w]*/,
      tokenizer: {
        root: [
          [/\{\%\s*comment\s*\%\}/, "comment.start.liquid", "@comment"],
          [/\{\{/, { token: "@rematch", switchTo: "@liquidState.root" }],
          [/\{\%/, { token: "@rematch", switchTo: "@liquidState.root" }],
          [/(<)(\w+)(\/>)/, ["delimiter.html", "tag.html", "delimiter.html"]],
          [
            /(<)([:\w]+)/,
            ["delimiter.html", { token: "tag.html", next: "@otherTag" }]
          ],
          [
            /(<\/)(\w+)/,
            ["delimiter.html", { token: "tag.html", next: "@otherTag" }]
          ],
          [/</, "delimiter.html"],
          [/\{/, "delimiter.html"],
          [/[^<{]+/]
        ],
        comment: [
          [/\{\%\s*endcomment\s*\%\}/, "comment.end.liquid", "@pop"],
          [/./, "comment.content.liquid"]
        ],
        otherTag: [
          [/\{\{/, { token: "@rematch", switchTo: "@liquidState.otherTag" }],
          [/\{\%/, { token: "@rematch", switchTo: "@liquidState.otherTag" }],
          [/\/?>/, "delimiter.html", "@pop"],
          [/"([^"]*)"/, "attribute.value"],
          [/'([^']*)'/, "attribute.value"],
          [/[\w\-]+/, "attribute.name"],
          [/=/, "delimiter"],
          [/[ \t\r\n]+/]
        ],
        liquidState: [
          [/\{\{/, "delimiter.output.liquid"],
          [/\}\}/, { token: "delimiter.output.liquid", switchTo: "@$S2.$S3" }],
          [/\{\%/, "delimiter.tag.liquid"],
          [/raw\s*\%\}/, "delimiter.tag.liquid", "@liquidRaw"],
          [/\%\}/, { token: "delimiter.tag.liquid", switchTo: "@$S2.$S3" }],
          { include: "liquidRoot" }
        ],
        liquidRaw: [
          [/^(?!\{\%\s*endraw\s*\%\}).+/],
          [/\{\%/, "delimiter.tag.liquid"],
          [/@identifier/],
          [/\%\}/, { token: "delimiter.tag.liquid", next: "@root" }]
        ],
        liquidRoot: [
          [/\d+(\.\d+)?/, "number.liquid"],
          [/"[^"]*"/, "string.liquid"],
          [/'[^']*'/, "string.liquid"],
          [/\s+/],
          [
            /@symbol/,
            { cases: { "@operators": "operator.liquid", "@default": "" } }
          ],
          [/\./],
          [
            /@identifier/,
            {
              cases: {
                "@constants": "keyword.liquid",
                "@builtinFilters": "predefined.liquid",
                "@builtinTags": "predefined.liquid",
                "@default": "variable.liquid"
              }
            }
          ],
          [/[^}|%]/, "variable.liquid"]
        ]
      }
    });
});
