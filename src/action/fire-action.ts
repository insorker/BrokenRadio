import { ColorStrategy } from "../color/color"
import { Element, ElementType, Empty, Fire, Spark, Steam, Water } from "../element/elements"
import { Coordinate, World } from "../world/world"
import { Action, State } from "./action"

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

        if (i == 0 && j == -1 && w.get(nc).type == ElementType.Empty) {
          if (Math.random() < Fire.sparkProbability) {
            w.set(nc, new Spark().init())
          }
        }

        if (w.get(nc).isFlammable) {
          let fire = new Fire().init()

          fire.isMovable = w.get(nc).isMovable
          fire.lifeTimeTotal *= Fire.lifeTimeExtensionCoef
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
    switch (e.type) {
      case ElementType.Water: return Steam
      case ElementType.Ice: return Water
      default: return Empty
    }
  }
}

export class SparkAction extends Action {
  protected static override _update(w: World, c: Coordinate): State {
    let e = w.get(c)
    
    e.color = ColorStrategy.blink(e.colors, e.lifeTimeLeft % e.colors.length)
    e.color = ColorStrategy.fade(e.color, e.lifeTimeLeft / e.lifeTimeTotal)

    return [false, c]
  }
}
