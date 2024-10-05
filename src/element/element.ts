import { Color, ColorStrategy } from "../painter/color"

export abstract class Element {
  static baseColor: Color = [0, 0, 0, 255]
  baseColor: Color = Element.baseColor
  colors: Color[] = []
  color: Color = [0, 0, 0, 255]

  /* move */
  isMovable: boolean = true
  isPassable: boolean = true
  density: number = 1.0

  /* update speed */
  speed: number = 0.0
  maxSpeed: number = 1.0
  acceleration: number = 1.0

  /* lifetime */
  isLiving: boolean = false
  lifeTimeTotal: number = 400 + Math.floor(Math.random() * 100)
  lifeTimeLeft: number = this.lifeTimeTotal

  /* fire */
  isFlammable: boolean = false
  isChangedByFire: boolean = false

  init() {
    this.color = ColorStrategy.vary(this.baseColor)

    return this
  }
}

export class Empty extends Element {
  static baseColor: Color = [255, 255, 255, 255]
  baseColor: Color = Empty.baseColor
  color: Color = [255, 255, 255, 255]

  init() {
    this.color = ColorStrategy.monochrome(this.baseColor)

    return this
  }
}
