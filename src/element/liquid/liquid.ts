import { Color, ColorStrategy } from "../../painter/color"
import { Element } from "../element"

export abstract class Liquid extends Element {
  density: number = 5.0

  maxSpeed: number = 10.0
  acceleration: number = 2.0

  init() {
    this.color = ColorStrategy.monochrome(this.baseColor)

    return this
  }
}

export class Water extends Liquid {
  static baseColor: Color = [33, 159, 223, 255]
  baseColor: Color = Water.baseColor

  isChangedByFire: boolean = true
}

export class Oil extends Liquid {
  static baseColor: Color = [124, 81, 54, 255]
  baseColor: Color = Oil.baseColor

  density: number = 3.0

  isFlammable: boolean = true
}