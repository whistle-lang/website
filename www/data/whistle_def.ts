// deno-lint-ignore-file no-explicit-any
let completionItems: any[] | null = null;
export function WhistleGetCompletionItems(monaco: any): any[] {
  const keyword = monaco.languages.CompletionItemKind.Keyword;
  if (completionItems) {
    return completionItems;
  }
  return completionItems = [
    {
      label: "fn",
      documentation: "function declaration",
      kind: keyword,
      insertText: "fn",
    },
    {
      label: "i32",
      documentation: "32-bit integer",
      kind: keyword,
      insertText: "i32",
    },
    {
      label: "i64",
      documentation: "64-bit integer",
      kind: keyword,
      insertText: "i64",
    },
    {
      label: "f32",
      documentation: "32-bit floating point",
      kind: keyword,
      insertText: "f32",
    },
    {
      label: "f64",
      documentation: "64-bit floating point",
      kind: keyword,
      insertText: "f64",
    },
    {
      label: "str",
      documentation: "string",
      kind: keyword,
      insertText: "str",
    },    
    {
      label: "bool",
      documentation: "boolean",
      kind: keyword,
      insertText: "bool",
    },
    {
      label: "none",
      documentation: "none",
      kind: keyword,
      insertText: "none",
    },
  ];
}

const LanguageConfiguration = {
  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"],
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
    { open: "<", close: ">" },
  ],
};

const MonarchDefinitions = {
  defaultToken: "invalid",
  keywords: [
    "import",
    "extern",
    "as",
    "from",
    "export",
    "fn",
    "return",
    "if",
    "else",
    "while",
    "break",
    "continue",
    "var",
    "val",
    "none",
    "for",
    "in",
    "match",
    "type",
    "struct",
    "trait",
  ],

  typeKeywords: [
    "none",
    "str",
    "bool",
    "i8",
    "i16",
    "i32",
    "i64",
    "u8",
    "u16",
    "u32",
    "u64",
    "f32",
    "f64",
  ],

  operators: [
    "&&=",
    "||=",
    "&&",
    "||",
    "!",
    "+=",
    "-=",
    "*=",
    "/=",
    "%=",
    "**=",
    "+",
    "-",
    "*",
    "/",
    "%",
    "**",
    "<<=",
    ">>=",
    "<<",
    ">>",
    "&=",
    "|=",
    "^=",
    "&",
    "|",
    "^",
    "~",
    "==",
    "!=",
    "<=",
    ">=",
    "<",
    ">",
    "=",
  ],

  symbols: /[=><!~?:&|+\-*\/\^%]+/,

  escapes:
    /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

  tokenizer: {
    root: [
      [/[a-z_$][\w$]*/, {
        cases: {
          "@keywords": "keyword",
          "@typeKeywords": "keyword.type",
          "@default": "identifier",
        },
      }],
      [/[A-Z][\w$]*/, "type.identifier"],

      { include: "@whitespace" },

      [/[{}()\[\]]/, "@brackets"],
      [/[<>](?!@symbols)/, "@brackets"],

      [/@symbols/, {
        cases: {
          "@operators": "operator",
          "@default": "",
        },
      }],

      [/#!?\[[^]*\]/, "annotation"],
      [/#!?.*$/, "annotation.invalid"],

      [/\d*\.\d+([eE][\-+]?\d+)?[fFdD]?/, "number.float"],
      [/0[xX][0-9a-fA-F_]*[0-9a-fA-F][Ll]?/, "number.hex"],
      [/0[0-7_]*[0-7][Ll]?/, "number.octal"],
      [/0[bB][0-1_]*[0-1][Ll]?/, "number.binary"],
      [/\d+[lL]?/, "number"],

      [/[;,.]/, "delimiter"],

      [/"([^"\\]|\\.)*$/, "string.invalid"],
      [/"/, "string", "@string"],

      [/"[^\\"]"/, "string"],
      [/(")(@escapes)(")/, ["string", "string.escape", "string"]],
      [/"/, "string.invalid"],
    ],

    whitespace: [
      [/[ \t\r\n]+/, "white"],
      [/\/\*/, "comment", "@comment"],
      [/\/\/.*$/, "comment"],
    ],

    comment: [
      [/[^\/*]+/, "comment"],
      [/\/\*/, "comment", "@push"],
      [/\/\*/, "comment.invalid"],
      ["\\*/", "comment", "@pop"],
      [/[\/*]/, "comment"],
    ],

    string: [
      [/[^\\"]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/"/, "string", "@pop"],
    ],
  },
};

export function WhistleWordAt(s: string, i: number) {
  const l = s.slice(0, i + 1).search(/[A-Za-z0-9_\.\/]+$/);
  const r = s.slice(i).search(/[^A-Za-z0-9_\.\/]/);
  if (r < 0) {
    return { index: l, word: s.slice(l) };
  }
  return { index: l, word: s.slice(l, r + i) };
}

export function Whistle(monaco: any) {
  return {
    MonarchDefinitions,
    LanguageConfiguration,
    CompletionItemProvider: {
      provideCompletionItems: (monaco: any, _model: any, _position: any) =>
        WhistleGetCompletionItems(monaco),
    },
    HoverProvider: {
      provideHover: function (model: any, position: any) {
        const lineContent = model.getLineContent(position.lineNumber);
        const { index, word } = WhistleWordAt(lineContent, position.column - 1);
        if (!word) {
          return;
        }
        const item = WhistleGetCompletionItems(monaco).find((x) =>
          x.label === word
        );
        if (!item) {
          return;
        }
        return {
          range: new monaco.Range(
            position.lineNumber,
            index + 1,
            position.lineNumber,
            index + 1 + word.length,
          ),
          contents: [
            "**DETAILS**",
            { language: "html", value: item.documentation },
          ],
        };
      },
    },
  };
}
