import { Coordinate, World } from "../../world/world"
import { Action, State } from "../action"
import { ColorStrategy } from "../../painter/color"
import { Element, Empty, Water, Steam, Fire } from "../../element/elements" 

export class FireAction extends Action {
  protected static override _update(w: World, c: Coordinate): State {
    let e = w.get(c)
    
    e.color = ColorStrategy.blink(e.colors, e.lifeTimeLeft % e.colors.length)

    return this.flame(w, c)
  }

  protected static flame(w: World, c: Coordinate): State {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let nc = {x: c.x + i, y: c.y + j}

        if (i == 0 && j == 0) continue
        if (!w.check(nc)) continue

        if (w.get(nc).isFlammable) {
          let fire = new Fire()

          fire.lifeTimeTotal *= 4
          fire.lifeTimeLeft = fire.lifeTimeTotal

          w.set(nc, fire)

          return [true, c]
        }
        else if (w.get(nc).isChangedByFire) {
          w.get(c).lifeTimeLeft = 0
          w.set(nc, new (FireAction.getParticleAfterFire(w.get(nc)))().init())

          return [true, c]
        }
      }
    }

    return [true, c]
  }

  private static getParticleAfterFire(e: Element) {
    switch (e.constructor.name) {
      case "Water": return Steam
      case "Ice": return Water
      default: return Empty
    }
  }
}
