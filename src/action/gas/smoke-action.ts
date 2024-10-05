import { Coordinate, World } from "../../world/world"
import { State } from "../action"
import { GasAction } from "./gas-action"
import { ColorStrategy } from "../../painter/color"

export class SmokeAction extends GasAction {
  protected static override _update(w: World, c: Coordinate): State {
    let e = w.get(c)

    e.color = ColorStrategy.fade(e.baseColor, e.lifeTimeLeft / e.lifeTimeTotal)

    return GasAction._update(w, c)
  }
}
