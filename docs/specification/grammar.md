---
id: grammar
title: Grammar
---

## Notation

To describe the grammar fo _Whistle_, [extended Backus-Naur form (EBNF)](https://en.wikipedia.org/wiki/Extended_Backus–Naur_form)
is used.

The operator `...` represents a range from the toke that comes before to the that comes after as alternatives. For examaple `"A" ... "C"` is equivelent to `"A" | "B" | "C"`. Line comments are specified using double slashes (`//`) and continue until a new line character is encountered while multiline comments are nesting and start with `/*` and end with `*/`.

## The Whistle Grammar Specification

### Characters, letters and digits

There are a few predefined values that could not easily be written as valid EBNF, these are instead written with the value of a comment which describes its content.

```
unicode_character = // any Unicode code point except newline
unicode_letter    = // any Unicode code point classified as a "Letter"
unicode_digit     = // any Unicode code point classified as a "Digit"

letter            = unicode_letter | "_"
digits_decimal    = { "0" ... "9" }
digits_binary     = { "0" | "1" }
digits_octal      = { "0" ... "7" }
digits_hex        = { "0" ... "9" | "A" ... "F" | "a" ... "f" }
```

### Whitespace

In _Whistle_ whitespace serves no purpose but to separate tokens and if included in a literal that explicitly allows it (string and character literals).

```
whitespace = " " | "\t" | "\r" | "\n"
```

### Comments

Just like whitespace comments get ignored unless it is in a literal that explicitly allows it. _Whistle_ provides two comment types: line comments and multiline/inline comments specified as following:

```
line_comment   = "//" , { unicode_character } , "\n"
inline_comment = "/*" , { unicode_character } , "*/"
```

### Identifiers

Identifiers are mainly used in _Whistle_ to name certain entities such as types, functions and variables. Some identifiers however are reserved as keywords and are not allowed for naming.

```
identifier = letter , { letter | unicode_digit }
```

### Keywords

The following identifiers reserved as keywords in _Whistle_ are currently:

```
import    as        from
export    fun       return
if        else      while
loop      break     continue
var       val
```

And here are some of the planned keywords:

```
for       in        match
type      struct    trait
```

### Operators

Operators are defined by one or more operator characters coming after each other.

```
operator_character = "+" | "-" | "*" | "/" | "%" | "^" | "=" | ":" | "." | ";"
                   | "!" | "|" | "&" | "!" | "<" | ">"
operator = { operator_character }
```

### Number Literals

```
integer         = integer_decimal | integer_binary | integer_octal | integer_hex
integer_decimal = digits_decimal
integer_binary  = "0" , ( "b" | "B" ) , digits_binary
integer_octal   = "0" , ( "o" | "O" ) , digits_octal
integer_hex     = "0" , ( "x" | "X" ) , digits_hex

float           = ( digits_decimal , "." , [ digits_decimal ] , [ exponent ] )
                | ( digits_decimal , exponent )
                | ( "." , digits_decimal , exponent )
exponent        = ( "e" | "E" ) , [ "+" | "-" ] , digits_decimal
```

### String Literals

```
string = "\"" , { unicode_character | "\n" } , "\""
```

### Char Literals

```
char = "'" , ( unicode_character | "\n" ) , "'"
```
