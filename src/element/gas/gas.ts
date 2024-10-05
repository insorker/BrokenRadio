import { Color, ColorStrategy } from "../../painter/color"
import { Element } from "../element"

export abstract class Gas extends Element {
  density: number = 0.5

  maxSpeed: number = 0.3
  acceleration: number = 0.05

  init() {
    this.color = ColorStrategy.monochrome(this.baseColor)

    return this
  }
}

export class Steam extends Gas {
  static baseColor: Color = [200, 200, 200, 200]
  baseColor: Color = Steam.baseColor

  density: number = 0.3
}

export class Smoke extends Gas {
  static baseColor: Color = [50, 50, 50, 200]
  baseColor: Color = Smoke.baseColor

  density: number = 0.9

  isLiving: boolean = true
}
