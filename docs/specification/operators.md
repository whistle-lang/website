---
id: operators
title: Operators
---

## Unary Operators

Unary operators appear before the operand in _Whistle_ and modifies it in a set way:

operator operand

For exampe -10 where - is the operator and 10 is the operand.

| precedence | operator | operand type  | description                                                    |
| ---------- | -------- | ------------- | -------------------------------------------------------------- |
| 0          | -        | Signed Number | The arithmetic negate operator negates the sign of the operand |
| 0          | !        | Boolean       | The logical not operator inverts the operand                   |
| 0          | ~        | Integer       | The bitwise not operator inverts the bits of the operand       |

## Binary Operators

Binary operators appear between to operands:

operand operator operand

For exampe 5 - 10 where - is the operator, 5 and 10 is the operands.

### Arithmetic Operators

| precedence | operand | operator | operand | description                                                                        |
| ---------- | ------- | -------- | ------- | ---------------------------------------------------------------------------------- |
| 1          | Number  | \*\*     | Number  | The exponentiation operator calculates the left operands to the power of the right |
| 2          | Number  | \*       | Number  | The multiplication operator multiplies the operands                                |
| 2          | Number  | /        | Number  | The division operator divides the operands                                         |
| 2          | Number  | %        | Number  | The modulo operator calculates the remainder operands                              |
| 3          | Number  | +        | Number  | The addition operator adds the operands                                            |
| 3          | Number  | -        | Number  | The subtraction operator subtracts the operands                                    |

### String Operators

| precedence | operand | operator | operand | description                                |
| ---------- | ------- | -------- | ------- | ------------------------------------------ |
| 3          | String  | +        | String  | Concatinates the right operand to the left |

### Comparison Operators

| precedence | operand | operator | operand | description                                                     |
| ---------- | ------- | -------- | ------- | --------------------------------------------------------------- |
| 5          | Any     | >=       | Any     | Is the left operand greater than or equal to the right operand? |
| 5          | Any     | >        | Any     | Is the left operand greater than the right operand?             |
| 5          | Any     | <=       | Any     | Is the left operand less than or equal to the right operand?    |
| 5          | Any     | <        | Any     | Is the left operand less than the right operand?                |
| 6          | Any     | ==       | Any     | Are the operands equal?                                         |
| 6          | Any     | !=       | Any     | Are the operands unequal?                                       |

### Logical Operators

| precedence | operand | operator     | operand | description                  |
| ---------- | ------- | ------------ | ------- | ---------------------------- |
| 10         | Boolean | &&           | Boolean | Are both the operands true?  |
| 11         | Boolean | &#124;&#124; | Boolean | Is one of the operands true? |

### Bitwise Operators

| precedence | operand | operator | operand | description                                                                                                                |
| ---------- | ------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| 4          | Integer | <<       | Integer | The bitwise left shift operator shifts the left operand in binary representation right operand number of bits to the left  |
| 4          | Integer | >>       | Integer | The bitwise left shift operator shifts the left operand in binary representation right operand number of bits to the right |
| 7          | Integer | &        | Integer | The bitwise and operator returns a one in each bit position for which the corresponding bits of both operands are ones     |
| 8          | Integer | ^        | Integer | The bitwise xor returns a zero in each bit position for which the corresponding bits are the same                          |
| 9          | Integer |          |         | Integer                                                                                                                    | The bitwise or returns a zero in each bit position for which the corresponding bits of both operands are zeros |

### Assignment Operators

| precedence | operand | operator | operand | description/equivalent                                 |
| ---------- | ------- | -------- | ------- | ------------------------------------------------------ |
| 12         | Number  | \*\*=    | Number  | left_operand = left_operand \*\* right_operand         |
| 13         | Number  | \*=      | Number  | left_operand = left_operand \* right_operand           |
| 13         | Number  | /=       | Number  | left_operand = left_operand / right_operand            |
| 13         | Number  | %=       | Number  | left_operand = left_operand % right_operand            |
| 14         | String  | +=       | String  | left_operand = left_operand + right_operand            |
| 14         | Number  | +=       | Number  | left_operand = left_operand + right_operand            |
| 14         | Number  | -=       | Number  | left_operand = left_operand - right_operand            |
| 15         | Number  | >>=      | Number  | left_operand = left_operand >> right_operand           |
| 15         | Number  | <<=      | Number  | left_operand = left_operand << right_operand           |
| 16         | Number  | &=       | Number  | left_operand = left_operand & right_operand            |
| 17         | Number  | ^=       | Number  | left_operand = left_operand ^ right_operand            |
| 18         | Number  | \|=      | Number  | left_operand = left_operand &#124; right_operand       |
| 19         | Boolean | &&=      | Boolean | left_operand = left_operand && right_operand           |
| 20         | Boolean | \|\|=    | Boolean | left_operand = left_operand &#124;&#124; right_operand |
| 21         | Any     | =        | Any     | Assigns the right value to the left                    |

## Conditional Operator

The conditional operator is the only operator which takes three operands:

operand if operand else operand

Where the first operand signifies the value if the second operand is true, otherwise the third operand is the value of the operation.
