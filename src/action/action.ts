import { World, Coordinate } from "../world/world"
import { Element, Empty, Smoke } from '../element/elements'

export type State = [boolean, Coordinate]

export abstract class Action {
  static update(w: World, c: Coordinate) {
    for (let i = 0; i < this.getSpeed(w, c); i++) {
      let state = this._update(w, c)

      if (state[0]) {
        c = state[1]
        continue
      }

      this.setSpeed(w, c, 0)
      break
    }

    this.updateSpeed(w, c)
    this.updateLife(w, c)
  }

  protected static _update(_w: World, _c: Coordinate): State { return [false, {x: 0, y: 0}]}

  protected static getSpeed(w: World, c: Coordinate): number {
    let e = w.get(c)
    const integer = Math.floor(e.speed)
    const decimal = e.speed - Math.trunc(e.speed)

    return integer + (Math.random() < decimal ? 1 : 0)
  }

  protected static setSpeed(w: World, c: Coordinate, s: number) {
    let e = w.get(c)

    e.speed = Math.min(s, e.maxSpeed)
  }

  protected static updateSpeed(w: World, c: Coordinate) {
    let e = w.get(c)

    e.speed = Math.min(e.speed + e.acceleration, e.maxSpeed)
  }

  protected static getNextLife(e: Element) {
    switch(e.constructor.name) {
      case "fire": return Smoke
      default: return Empty
    }
  }

  protected static updateLife(w: World, c: Coordinate) {
    let e = w.get(c)

    if (e.isLiving) {
      // e.color = ColorStrategy.fade(e.baseColor, e.lifeTimeLeft / e.lifeTimeTotal)

      if (e.lifeTimeLeft-- == 0) {
        w.set(c, new (Action.getNextLife(e))().init())
      }
    }
  }
}
