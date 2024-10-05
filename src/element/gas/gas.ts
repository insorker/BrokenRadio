import { Color, ColorStrategy } from "../../painter/color"
import { Element, ElementType } from "../element"

export abstract class Gas extends Element {
  type = ElementType.Gas

  density: number = 0.5

  maxSpeed: number = 0.3
  acceleration: number = 0.05

  init() {
    this.color = ColorStrategy.monochrome(this.baseColor)

    return this
  }
}

export class Steam extends Gas {
  type = ElementType.Steam

  static baseColor: Color = [200, 200, 200, 200]
  baseColor: Color = Steam.baseColor

  density: number = 0.3
}

export class Smoke extends Gas {
  type = ElementType.Smoke

  static baseColor: Color = [40, 40, 40, 220]
  baseColor: Color = Smoke.baseColor

  density: number = 0.9

  isLiving: boolean = true
}
