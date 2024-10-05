import { Coordinate, World } from "../../world/world"
import { Action, State } from "../action"

export class LiquidAction extends Action {
  protected static override _update(w: World, c: Coordinate): State {
    if (w.get(c).isMovable) {
      return this.move(w, c)
    }

    return [false, {x: 0, y: 0}]
  }

  protected static move(w: World, c: Coordinate): State {
    let directions = this.getMoveDirection(c)

    for (let direction of directions) {
      direction.sort(() => Math.random() - 0.5)

      for (let d of direction) {
        if (!w.check(d)) continue
        if (!w.get(d).isMovable) continue
        if (!w.get(d).isPassable) continue
        if (w.get(d).density >= w.get(c).density) continue

        w.swap(d, c)

        return [true, d]
      }
    }

    return [false, {x: 0, y: 0}]
  }

  protected static getMoveDirection(c: Coordinate): Coordinate[][] {
    return [
      [
        {x: c.x, y: c.y + 1},
      ],
      [
        {x: c.x - 1, y: c.y + 1},
        {x: c.x + 1, y: c.y + 1},
      ],
      [
        {x: c.x - 1, y: c.y},
        {x: c.x + 1, y: c.y},
      ],
    ]
  }
}
