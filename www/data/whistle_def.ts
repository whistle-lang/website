export const WhistleLanguageDef = {
  keywords: [
    "import",
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
      [/#\([a-zA-Z]\w*\)/, "annotation"],
      [/[a-z_$][\w$]*/, {
        cases: {
          "@typeKeywords": "keyword",
          "@keywords": "keyword",
          "@default": "identifier",
        },
      }],
      [/[A-Z][\w\$]*/, "type.identifier"],
      { include: "@whitespace" },
      [/[{}()\[\]]/, "@brackets"],
      [/[<>](?!@symbols)/, "@brackets"],
      [/@symbols/, {
        cases: {
          "@operators": "operator",
          "@default": "",
        },
      }],

      [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
      [/0[xX][0-9a-fA-F]+/, "number.hex"],
      [/\d+/, "number"],

      [/[;,.]/, "delimiter"],

      [/"([^"\\]|\\.)*$/, "string.invalid"],
      [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],

      [/'[^\\']'/, "string"],
      [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
      [/'/, "string.invalid"],
    ],

    comment: [
      [/[^\/*]+/, "comment"],
      [/\/\*/, "comment", "@push"],
      ["\\*/", "comment", "@pop"],
      [/[\/*]/, "comment"],
    ],

    string: [
      [/[^\\"]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
    ],

    whitespace: [
      [/[ \t\r\n]+/, "white"],
      [/\/\*/, "comment", "@comment"],
      [/\/\/.*$/, "comment"],
    ],
  },
};

export const WatPatterns = {
  // the default separators except `@$`
  wordPattern:
    /(-?\d*\.\d\w*)|([^\`\~\!\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
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
