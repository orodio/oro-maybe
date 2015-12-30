Pipe will early exit on a `Nope` and give an log an error message (wont throw an error).

## Important

There is a peer dependency of `babel-polyfill`, you can resolve this by runing `npm install --save babel-polyfill`

## Basics

### `Maybe.Just :: seed -> Maybe.Just`
* `seed` - The thing you care about and want passed to the next thing

### `Maybe.Nope :: seed -> code -> description -> Maybe.Nope`
* `seed` - Probably the last seed in the sequence, should be enough data to recover from a Nope
* `code` - quick reference ie: `NUMBER_NOT_IN_RANGE`, `WRONG_TYPE`. In a http router this could be the status ie: `404`, `500`.
* `description` - a more helpful explanation of what went wrong and possibly how to fix it.

### `Maybe.pipe :: seed -> ...Func -> Maybe.Just|Maybe.Nope`
* `seed` - initial value

> Where: `Func :: seed -> seed -> Maybe.Just | Maybe.Nope`
* `seed` - initial value or result held in the return of the last `Func`

### One more thing
```javascript
assert(Maybe.Just("bob").value, "bob")
```

## Example 

```javascript
import { Just, Nope, pipe } from "oro-maybe"

var double = x => Just(x * 2)
var square = x => Just(x * x)

var doubleAndSquare = x => pipe(x, double, square)
var quadruple = x => pipe(x, double, double)

var isNumber = x => "number" == typeof x
  ? Just(x)
  : Nope(x, "WRONG_TYPE", `value had a type of "${ typeof x }" but should have had a type of "number"`)

var isGreaterThan = min => x => (x > min)
  ? Just(x)
  : Nope(x, "WAS_LESS_THAN", `"${ x }" should have been greaterThan "${ min }"`)

var isLessThan = max => x => (x < max)
  ? Just(x)
  : Nope(x, "WAS_GREATER_THAN", `"${ x }" should have been lessThan "${ min }"`)

var inRangeOf = (min, max) => x => pipe(x, isNumber, isGreaterThan(min), isLessThan(max))
var inRange = inRangeOf(4, 16)

pipe(2, double, square, doubleAndSquare, quadruple)          // Just(4096)
pipe(2, double, square, inRange, doubleAndSquare, quadruple) // Just(4096)

pipe(2, double, square, doubleAndSquare, inRange, quadruple) // Nope(1024, "NOT_IN_RANGE", "1024 was greater than the max of 16")
// Nope: [NOT_IN_RANGE] 1024 was greater than max of 16

pipe("bob", inRange(0,1000))                                 // Nope("bob", "WRONG_TYPE", `value had a type of "String" but should have had a type of "number"`)
// Nope: [WRONG_TYPE] value had a type of "String" but should have had a type of "number"
```

