export function Nope (value, code, message) {
  if (!isNope(this)) return new Nope(value, code, message)
  console.error(`NOPE: [${ code }] ${ message }`)
  this.value = value
  this.code = code
  this.message = message
}

Nope.prototype.is = isNope

export function isNope (thing) {
  return thing instanceof Nope
}
