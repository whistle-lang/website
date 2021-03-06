---
id: grammar
title: Grammar
---

## Notation

To describe the grammar fo _Whistle_, [extended Backus-Naur form (EBNF)](https://en.wikipedia.org/wiki/Extended_Backus–Naur_form)
is used. The following table describes all of the used notations in the grammar specification of _Whistle_.

| usage         | notation            |
| ------------- | ------------------- |
| definition    | `=`                 |
| concatination | `,`                 |
| alteration    | <code>&#124;</code> |
| optional      | `[`, `]`            |
| repetition    | `{`, `}`            |
| grouping      | `(`, `)`            |
| string        | `"`, `"`            |
| exception     | `-`                 |
| range         | `...`               |
| comment       | `//`                |
| comment       | `/*`, `*/`          |

## Characters, letters and digits

There are a few predefined values that could not easily be written as valid EBNF, these are instead written with the value of a comment which describes its content.

```
unicode_any       = // any Unicode code point
unicode_letter    = // any Unicode code point classified as a "Letter"
unicode_digit     = // any Unicode code point classified as a "Digit"

letter            = unicode_letter | "_"
digits_decimal    = { "0" ... "9" }
digits_binary     = { "0" | "1" }
digits_octal      = { "0" ... "7" }
digits_hex        = { "0" ... "9" | "A" ... "F" | "a" ... "f" }
```

## Whitespace

In _Whistle_ whitespace serves no purpose but to separate tokens and if included in a literal that explicitly allows it (string and character literals).

```
whitespace = " " | "\t" | "\r" | "\n"
```

## Comments

Just like whitespace comments get ignored unless it is in a literal that explicitly allows it. _Whistle_ provides two comment types: line comments and multiline/inline comments.

```
comment        = comment_line | comment_inline
comment_line   = "//" , { unicode_any - "\n" } , "\n"
comment_inline = "/*" , { unicode_any } , "*/"
```

## Identifiers

Identifiers are mainly used in _Whistle_ to name certain entities such as types, functions and variables. Some identifiers however are reserved as keywords and are not allowed for naming.

```
ident        = letter , { letter | unicode_digit }
ident_typed  = ident , ":" , ident
ident_as     = ident , "as" , ident
ident_import = ident_as | ident
```

## Keywords

The following identifiers reserved as keywords in _Whistle_ are currently:

```
import    as        from
export    fun       return
if        else      while
break     continue  var
val
```

And here are some of the planned keywords:

```
for       in        match
type      struct    trait
```

## Operators

Operators are defined by one or more operator characters coming after each other.

```
operator_unary     = "-"   | "!"   | "~"
operator_binary    = "+"   | "-"   | "*"   | "/"   | "%"   | "**"  | "=="
                   | "!="  | "<="  | "<"   | ">"   | ">="  | "&&"  | "||"
                   | "<<"  | ">>"  | "&"   | "|"   | "^"   | "+="  | "-="
                   | "*"=  | "/="  | "%="  | "**=" | "&&=" | "||=" | "<<="
                   | ">>=" | "&="  | "|="  | "^="  | operator_assign
operator_assign    = "="
```

## Literals

Literals in _Whistle_ represent a fixed value.

```
literal     = float
            | int
            | string
            | char
            | bool
            | none

float       = ( digits_decimal , [ "." , digits_decimal ] , [ exponent ] )
exponent    = ( "e" | "E" ) , [ "+" | "-" ] , digits_decimal

int         = int_binary
            | int_octal
            | int_hex
            | int_decimal
int_decimal = digits_decimal
int_binary  = "0" , ( "b" | "B" ) , digits_binary
int_octal   = "0" , ( "o" | "O" ) , digits_octal
int_hex     = "0" , ( "x" | "X" ) , digits_hex

string       = "\"" , string_inner , "\"
string_inner = { unicode_any - ( "\"" | "\\" ) } , [ escape , inner ]

char        = "'" , ( unicode_any - "\'" ) , "'"
char_inner  = escape | unicode_any

escape      = "\\" , ("\"" | "\\" | "r" | "n" | "t" | "0" | "'")

bool        = "true" | "false"

none        = "none"
```

## Tips

Tips are in _Whistle_ similar to macros. They tell the compiler certain stuff
and are very useful for a plethera of reasons. There are two types of tips in
_Whistle_: line tips and multiline/inline tips.

```
tip       = "#(" , ident ,  ")" , ( tip_line | tip_block )
tip_line  =  { unicode_any - "\n" } , "\n"
tip_block = "{" , { unicode_any - "}" } , "}"
```

## Expressions

Expressions specify the computation of a value by applying operators to an operands.

**Disclaimers**:

- The syntax for conditionals in _Whistle_ is still undecided
- Both index and slice array accessing is not ready along with arrays which is why it is commented

```
expression      = unary | binary | conditional

unary           = primary | ( operator_unary , unary )
binary          = expression , operator_binary , expression
conditional     = expression , "if" , expression , "else" , expression

primary         = operand
                | ( primary , selector )
                | ( primary , arguments )
//              | ( primary , index )
//              | ( primary , slice )

operand         = literal | ident | grouping
grouping        = "(" , expression , ")"
selector        = "." , ident
arguments       = "(" , [ expression , { "," , expression } ] , ")"
// index        = primary , "[" , expression , "]"
// slice        = primary , "[" , [ expression ] , ":" , [ expression ] , [ ":" , [ expression ] ] , "]"
```

## Statements

Statements control the execution and flow of the program.

```
statement = if
          | while
          | continue
          | break
          | return
          | var_decl
          | val_decl
          | fun_decl
          | block
          | import
          | tip
          | expression

if        = "if" , expression , statement , [ "else", statement ]
while     = "while" , [ expression ] , statement
continue  = "continue"
break     = "break"
return    = "return" , [ expression ]
var_decl  = "var" , ident_typed , operator_assign , expression
val_decl  = "val" , ident_typed , operator_assign , expression
fun_decl  = "fun" , ident , { "(" , ident_typed , { "," , ident_typed } ")" } , ":" , ident , statement
block     = "{" , { statement } , "}"
import    = "import" , [ ident_import , { "," , ident_import } , "from" ] , string
```

## Grammar

Finally the grammar of the _Whistle_ programming language can be described as zero or more `statement`s repeating.

```
grammar = { statement }
```
