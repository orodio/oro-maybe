import * as J from "./Just"
import * as N from "./Nope"

export var Just = J.Just
export var Nope = N.Nope

export var isJust = J.isJust
export var isNope = N.isNope

export function isMaybe (thing) {
  return isJust(thing) || isNope(thing)
}
