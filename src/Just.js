export function Just (value) {
  if (!isJust(this)) return new Just(value)
  this.value = value
}

Just.prototype.is = isJust

export function isJust (thing) {
  return thing instanceof Just
}
