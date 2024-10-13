import { Color } from "../../color/color"
import { Element, ElementType } from "../element"

export abstract class Gas extends Element {
  type = ElementType.Gas

  density: number = 0.5
  protected minSpeedX: number = 0.2
  protected maxSpeedX: number = 0.4
  protected maxSpeedY: number = 0.4
  protected resistanceX: number = 0.0
  protected resistanceY: number = 0.90
}

export class Steam extends Gas {
  type = ElementType.Steam

  baseColor: Color = [200, 200, 200, 200]

  density: number = 0.3
}

export class Smoke extends Gas {
  type = ElementType.Smoke

  baseColor: Color = [100, 100, 100, 220]

  density: number = 0.9

  isLiving: boolean = true
}
