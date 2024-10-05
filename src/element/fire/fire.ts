import { Color, ColorStrategy } from "../../painter/color"
import { Element } from "../element"

export class Fire extends Element {
  static baseColor: Color = [255, 31, 31, 255]
  baseColor: Color = Fire.baseColor
  colors: Color[] = [
    [255, 31, 31, 255],
    [234, 90, 0, 255],
    [255, 105, 0, 255],
    [238, 204, 9, 255],
    [84, 30, 30, 255],
  ]

  isMovable: boolean = false

  maxSpeed: number = 0.3
  acceleration: number = 0.05

  isLiving: boolean = true
  lifeTimeTotal: number = 16 + Math.floor(Math.random() * 8)
  lifeTimeLeft: number = this.lifeTimeTotal

  init() {
    this.color = ColorStrategy.blink(this.colors, this.lifeTimeLeft % this.colors.length)

    return this
  }
}
