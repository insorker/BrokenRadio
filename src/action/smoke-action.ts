import { ColorStrategy } from "../painter/color"
import { Coordinate, World } from "../world/world"
import { Action, State } from "./action"

export class SmokeAction extends Action {
  protected static override _update(w: World, c: Coordinate): State {
    let e = w.get(c)

    e.color = ColorStrategy.fade(e.baseColor, e.lifeTimeLeft / e.lifeTimeTotal)

    return Action._update(w, c)
  }
}
