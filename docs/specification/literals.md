Literals are one of the essential parts of any program, they express values and one of the possible
building blocks of an [expression](./expressions).

In _Whistle_ there are six literal types: booleans, integers, floats, characters, strings and the
none literal.

```EBNF
literal = bool_literal
        | int_literal
        | float_literal
        | char_literal
        | string_literal
        | none_literal
```

## Booleans

Booleans represent a true or false value, it does this through the keywords `true` and `false`.

```EBNF
bool_literal = "true" | "false"
```

## Integers

Integers represent a whole number in either binary, octal, decimal or hexadecimal base. Integer
literals are always positive/unsigned numbers, but this does not mean _Whistle_ only supports
unsigned integers, instead to use signed integers one would use the [negate](./operators#unary)
operator.

```EBNF
int_literal         = int_literal_binary
                    | int_literal_octal
                    | int_literal_hex
                    | int_literal_decimal
int_literal_decimal = { digit_decimal }
int_literal_binary  = "0" , ( "b" | "B" ) , { digit_binary }
int_literal_octal   = "0" , ( "o" | "O" ) , { digit_octal }
int_literal_hex     = "0" , ( "x" | "X" ) , { digit_hex }
```

## Floating point numbers

The float literal represents an [ieee754](https://en.wikipedia.org/wiki/IEEE_754) floating point
number. This number can contain an optional fractional part and or exponent along with the whole
part. Once again to negate the float literal one would use the [negate](./operators#unary)
operator.

```EBNF
float_literal  = { digit_decimal } , [ float_decimal ] , [ float_exponent ]
float_decimal  = "." , { digit_decimal }
float_exponent = ( "e" | "E" ) , [ "+" | "-" ] , { digit_decimal }
```

## Characters and strings

The character literal represents a single unicode character while a string represents an sequence
of these unicode characters. There are certain escaped values for things like newlines, tabs and
null bytes. These escaped values apply for both the inner values of strings and characters.

```EBNF
escaped_value  = "\" , (""" | "\" | "r" | "n" | "t" | "0" | "'")

char_literal   = "'" , ( char_inner - "'" ) , "'"
char_inner     = escaped_value | unicode_any

string_literal = """ , ( string_inner - """ ) , """
string_inner   = { escaped_value | unicode_any }
```

## None literals

The none literal represents an empty value, null or undefined.

```EBNF
none_literal = "none"
```
