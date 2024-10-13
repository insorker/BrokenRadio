import { Color, ColorStrategy } from "../../color/color"
import { Element, ElementType } from "../element"

export abstract class Solid extends Element {
  type = ElementType.Solid

  isPassable: boolean = false
  density: number = 10.0

  init() {
    super.init()

    this.color = ColorStrategy.vary(this.baseColor)

    return this
  }
}

export class Sand extends Solid {
  type = ElementType.Sand

  baseColor: Color = [220, 177, 89, 255]
}

export class Ice extends Solid {
  type = ElementType.Ice

  baseColor: Color = [140, 204, 255, 255]

  density: number = 4.0

  isChangedByFire: boolean = true
}

export class Stone extends Solid {
  type = ElementType.Stone

  baseColor: Color = [125, 128, 131, 255]

  isMovable: boolean = false
  isPassable: boolean = false
}

export class Wood extends Solid {
  type = ElementType.Wood

  baseColor: Color = [70, 40, 29, 255]

  isMovable: boolean = false
  isPassable: boolean = false

  isFlammable: boolean = true
}
