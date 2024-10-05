import { Color } from "../../painter/color"
import { Element, ElementType } from "../element"

export abstract class Solid extends Element {
  type = ElementType.Solid

  isPassable: boolean = false
  density: number = 10.0

  maxSpeed: number = 2.0
  acceleration: number = 0.5
}

export class Sand extends Solid {
  type = ElementType.Sand

  static baseColor: Color = [220, 177, 89, 255]
  baseColor: Color = Sand.baseColor
}

export class Ice extends Solid {
  type = ElementType.Ice

  static baseColor: Color = [140, 204, 255, 255]
  baseColor: Color = Ice.baseColor

  density: number = 4.0

  isChangedByFire: boolean = true
}

export class Stone extends Solid {
  type = ElementType.Stone

  static baseColor: Color = [125, 128, 131, 255]
  baseColor: Color = Stone.baseColor

  isMovable: boolean = false
  isPassable: boolean = false

  maxSpeed: number = 0.0
  acceleration: number = 0.0
}

export class Wood extends Solid {
  type = ElementType.Wood

  static baseColor: Color = [70, 40, 29, 255]
  baseColor: Color = Wood.baseColor

  isMovable: boolean = false
  isPassable: boolean = false

  maxSpeed: number = 0.0
  acceleration: number = 0.0

  isFlammable: boolean = true
}
