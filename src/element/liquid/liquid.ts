import { Color } from "../../color/color"
import { Element, ElementType } from "../element"

export abstract class Liquid extends Element {
  type = ElementType.Liquid

  density: number = 5.0
  protected minSpeedX: number = 2.0
  protected resistanceX: number = 0.0
}

export class Water extends Liquid {
  type = ElementType.Water

  baseColor: Color = [33, 159, 223, 255]

  isChangedByFire: boolean = true
}

export class Oil extends Liquid {
  type = ElementType.Oil

  baseColor: Color = [124, 81, 54, 255]

  density: number = 3.0

  isFlammable: boolean = true
}
