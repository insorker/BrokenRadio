import { World, Coordinate } from "../world/world"
import { ElementType, Element, Empty, Smoke } from '../element/elements'
import { Environment } from "../environment/environment"

export type State = [boolean, Coordinate]

export class Action {
  static update(w: World, c: Coordinate) {
    this._update(w, c)

    this.updateLife(w, c)

    this.updateMovement(w, c)
  }

  protected static _update(_w: World, _c: Coordinate): State { return [false, {x: 0, y: 0}]}

  private static movementCheck(w: World, c: Coordinate, nc: Coordinate): boolean {
    let e = w.get(c), ne = w.get(nc)

    if (!w.check(nc)) return false
    if (!w.get(nc).isPassable) return false
    if (e.density == ne.density) return false
    if (e.density == Environment.density) return false
    if (e.density < Environment.density && ne.density < e.density) return false
    if (e.density > Environment.density && ne.density > e.density) return false

    return true
  }

  private static getMovingPath(w: World, c: Coordinate): Coordinate[] {
    let e = w.get(c)
    let path: Coordinate[] = []
    let distX = e.getSpeedX()
    let distY = e.getSpeedY()

    if (distX == 0 && distY == 0) {
      path = []
    }
    else if (distX == 0) {
      for (let i = 1; i <= distY; i++) {
        path.push({x: c.x, y: c.y + i * e.getDirectionY()})
      }
    }
    else if (distY == 0) {
      for (let i = 1; i <= distX; i++) {
        path.push({x: c.x + i * e.getDirectionX(), y: c.y})
      }
    }
    else {
      let k = distY / distX
      let lastY = 0, nextY = 0

      for (let i = 1; i <= distX; i++) {
        lastY = nextY + 1
        nextY = Math.round(k * i)

        for (let j = lastY; j <= nextY; j++) {
          path.push({
            x: c.x + i * e.getDirectionX(),
            y: c.y + j * e.getDirectionY()
          })
        }
      }
    }
    
    return path
  }

  private static updateMovement(w: World, c: Coordinate) {
    let e = w.get(c)

    if (!e.isMovable) return

    let path = this.getMovingPath(w, c)

    for (let nc of path) {
      if (!this.movementCheck(w, c, nc)) {
        if (nc.y == c.y) {
          e.reverseDirectionX()
        }
        else if (nc.x == c.x) {
          e.mergeSpeedToX()
          e.randDirectionX()
        }
        else {
          Math.random() > 0.5 ? e.mergeSpeedToX() : e.mergeSpeedToY()
        }

        break
      }

      w.swap(c, nc)
      c = nc
    }

    let fallingCheck = this.movementCheck(w, c, {x: c.x, y: c.y + e.getDirectionGravity()})
    let moveLeftCheck = this.movementCheck(w, c, {x: c.x - 1, y: c.y})
    let moveRightCheck = this.movementCheck(w, c, {x: c.x + 1, y: c.y})

    e.updateSpeed(
      fallingCheck,
      !fallingCheck && !moveLeftCheck && !moveRightCheck
    )
  }

  private static getNextLife(e: Element) {
    switch(e.type) {
      case ElementType.Fire: return Smoke
      default: return Empty
    }
  }

  private static updateLife(w: World, c: Coordinate) {
    let e = w.get(c)

    if (!e.isLiving) return

    if (e.lifeTimeLeft-- == 0) {
      w.set(c, new (Action.getNextLife(e))().init())
    }
  }
}
