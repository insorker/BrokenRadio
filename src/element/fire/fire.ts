import { Color } from "../../painter/color"
import { Element, ElementType } from "../element"

export class Fire extends Element {
  type = ElementType.Fire

  baseColor: Color = [255, 31, 31, 255]
  colors: Color[] = [
    [255, 31, 31, 255],
    [234, 90, 0, 255],
    [255, 105, 0, 255],
    [238, 204, 9, 255],
    // [84, 30, 30, 255],
  ]

  isMovable: boolean = false

  maxSpeed: number = 0.3
  acceleration: number = 0.05

  isLiving: boolean = true
  lifeTimeTotal: number = 100 + Math.floor(Math.random() * 50)
  lifeTimeLeft: number = this.lifeTimeTotal
}
