export const WatDefinitions = {
  // Set defaultToken to invalid to see what you do not tokenize yet
  // defaultToken: 'invalid',

  keywords: [
    "module",
    "table",
    "memory",
    "export",
    "import",
    "func",
    "result",
    "offset",
    "anyfunc",
    "type",
    "data",
    "start",
    "element",
    "global",
    "local",
    "mut",
    "param",
    "result",

    "i32.load8_s",
    "i32.load8_u",
    "i32.load16_s",
    "i32.load16_u",
    "i32.load",
    "i64.load8_s",
    "i64.load8_u",
    "i64.load16_s",
    "i64.load16_u",
    "i64.load32_s",
    "i64.load32_u",
    "i64.load",
    "f32.load",
    "f64.load",

    "i32.store8",
    "i32.store16",
    "i32.store",
    "i64.store8",
    "i64.store16",
    "i64.store32",
    "i64.store",
    "f32.store",
    "f64.store",

    "i32.const",
    "i64.const",
    "f32.const",
    "f64.const",

    "i32.add",
    "i32.sub",
    "i32.mul",
    "i32.div_s",
    "i32.div_u",
    "i32.rem_s",
    "i32.rem_u",
    "i32.and",
    "i32.or",
    "i32.xor",
    "i32.shl",
    "i32.shr_u",
    "i32.shr_s",
    "i32.rotl",
    "i32.rotr",
    "i32.eq",
    "i32.ne",
    "i32.lt_s",
    "i32.le_s",
    "i32.lt_u",
    "i32.le_u",
    "i32.gt_s",
    "i32.ge_s",
    "i32.gt_u",
    "i32.ge_u",
    "i32.clz",
    "i32.ctz",
    "i32.popcnt",
    "i32.eqz",

    "f32.add",
    "f32.sub",
    "f32.mul",
    "f32.div",
    "f32.abs",
    "f32.neg",
    "f32.copysign",
    "f32.ceil",
    "f32.floor",
    "f32.trunc",
    "f32.nearest",
    "f32.eq",
    "f32.ne",
    "f32.lt",
    "f32.le",
    "f32.gt",
    "f32.ge",
    "f32.sqrt",
    "f32.min",
    "f32.max",

    "f64.add",
    "f64.sub",
    "f64.mul",
    "f64.div",
    "f64.abs",
    "f64.neg",
    "f64.copysign",
    "f64.ceil",
    "f64.floor",
    "f64.trunc",
    "f64.nearest",
    "f64.eq",
    "f64.ne",
    "f64.lt",
    "f64.le",
    "f64.gt",
    "f64.ge",
    "f64.sqrt",
    "f64.min",
    "f64.max",

    "i32.wrap/i64",
    "i32.trunc_s/f32",
    "i32.trunc_s/f64",
    "i32.trunc_u/f32",
    "i32.trunc_u/f64",
    "i32.reinterpret/f32",
    "i64.extend_s/i32",
    "i64.extend_u/i32",
    "i64.trunc_s/f32",
    "i64.trunc_s/f64",
    "i64.trunc_u/f32",
    "i64.trunc_u/f64",
    "i64.reinterpret/f64",
    "f32.demote/f64",
    "f32.convert_s/i32",
    "f32.convert_s/i64",
    "f32.convert_u/i32",
    "f32.convert_u/i64",
    "f32.reinterpret/i32",
    "f64.promote/f32",
    "f64.convert_s/i32",
    "f64.convert_s/i64",
    "f64.convert_u/i32",
    "f64.convert_u/i64",
    "f64.reinterpret/i64",

    "get_local",
    "set_local",
    "tee_local",
    "get_global",
    "set_global",

    "current_memory",
    "grow_memory",
  ],

  typeKeywords: [
    "i32",
    "i64",
    "f32",
    "f64",
    "anyfunc",
  ],

  operators: [
    // deno-lint-ignore no-explicit-any
  ] as any,

  brackets: [
    ["(", ")", "bracket.parenthesis"],
    ["{", "}", "bracket.curly"],
    ["[", "]", "bracket.square"],
  ],

  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*\/\^%]+/,

  // C# style strings
  escapes:
    /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // identifiers and keywords
      [/[a-z_$][\w$\.]*/, {
        cases: {
          "@keywords": "keyword",
          "@typeKeywords": "type",
          "@default": "type.identifier",
        },
      }],

      // numbers
      [/\d+/, "number"],

      // strings
      [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],

      [/[{}()\[\]]/, "@brackets"],
      // deno-lint-ignore no-explicit-any
    ] as any,

    comment: [
      [/[^\/*]+/, "comment"],
      [/\/\*/, "comment", "@push"], // nested comment
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
