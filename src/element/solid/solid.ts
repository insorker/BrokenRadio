import { Color } from "../../painter/color"
import { Element } from "../element"

export abstract class Solid extends Element {
  isPassable: boolean = false
  density: number = 10.0

  maxSpeed: number = 2.0
  acceleration: number = 0.5
}

export class Sand extends Solid {
  static baseColor: Color = [220, 177, 89, 255]
  baseColor: Color = Sand.baseColor
}

export class Ice extends Solid {
  static baseColor: Color = [140, 204, 255, 255]
  baseColor: Color = Ice.baseColor

  density: number = 4.0

  isChangedByFire: boolean = true
}

export class Stone extends Solid {
  static baseColor: Color = [125, 128, 131, 255]
  baseColor: Color = Stone.baseColor

  isMovable: boolean = false
  isPassable: boolean = false

  maxSpeed: number = 0.0
  acceleration: number = 0.0
}

export class Wood extends Solid {
  static baseColor: Color = [70, 40, 29, 255]
  baseColor: Color = Wood.baseColor

  isMovable: boolean = false
  isPassable: boolean = false

  maxSpeed: number = 0.0
  acceleration: number = 0.0

  isFlammable: boolean = true
}
