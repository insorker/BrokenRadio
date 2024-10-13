import { Color } from "../../color/color"
import { Element, ElementType } from "../element"

export class Fire extends Element {
  type = ElementType.Fire

  baseColor: Color = [255, 90, 0, 200]
  colors: Color[] = [
    [255, 0, 0, 200],
    [255, 90, 0, 200],
    [255, 154, 0, 200],
    [255, 206, 0, 200],
    [255, 232, 8, 200],
  ]

  density: number = 1.1

  isLiving: boolean = true
  lifeTimeTotal: number = 50 + Math.floor(Math.random() * 300)
  lifeTimeLeft: number = this.lifeTimeTotal

  static lifeTimeExtensionCoef: number = 3
  static sparkProbability: number = 0.1
}

export class Spark extends Fire {
  type = ElementType.Spark

  density: number = 0.9
  protected minSpeedX: number = 0.2
  protected maxSpeedX: number = 0.4
  protected maxSpeedY: number = 0.4
  protected resistanceX: number = 0.0
  protected resistanceY: number = 0.90

  isLiving: boolean = true
  lifeTimeTotal: number = 20 + Math.floor(Math.random() * 10)
  lifeTimeLeft: number = this.lifeTimeTotal
}
