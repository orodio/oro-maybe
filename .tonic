var Maybe = require("oro-maybe")

function double (x) {
      return Maybe.Just(x * 2)
}

function square (x) {
      return Maybe.Just(x * x)
}

function doubleAndSquare (x) {
      return Maybe.pipe(x, double, square)
}

function quadruple (x) {
      return Maybe.pipe(x, double, double)
}

function gate (x) {
      if (x > 1024) return Maybe.Nope(x, "GATE_ERROR", `${ x } was bigger than 1024`)
            return Maybe.Just(x)
}

// var result = Maybe.pipe(2, double, square, doubleAndSquare, quadruple, gate) // will trigger gate error
var result = Maybe.pipe(2, double, square, doubleAndSquare, gate, quadruple) // will NOT trigger gate error

console.log(result.value)
