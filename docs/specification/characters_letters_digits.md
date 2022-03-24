There are a few predefined rules that could not easily be written as valid
EBNF or are used multiple times and therefor defined here to avoid repeating
them. The EBNF rules for the identifiers `unicode_*` are written within
comments as there is no real way to define them otherways.

```EBNF
unicode_any       = // any Unicode code point
unicode_letter    = // any Unicode code point classified as a "Letter"
unicode_digit     = // any Unicode code point classified as a "Digit"

letter            = unicode_letter | "_"
digit_decimal    = { "0" ... "9" }
digit_binary     = { "0" | "1" }
digit_octal      = { "0" ... "7" }
digit_hex        = { "0" ... "9" | "A" ... "F" | "a" ... "f" }
```
