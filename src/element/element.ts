import { Environment } from "../environment/environment"
import { Color, ColorStrategy } from "../painter/color"

export enum ElementType {
  Element, Empty,
  Solid, Sand, Ice, Stone, Wood,
  Liquid, Water, Oil,
  Gas, Steam, Smoke,
  Fire, Spark
}

export abstract class Element {
  type = ElementType.Element

  baseColor: Color = [0, 0, 0, 255]
  colors: Color[] = []
  color: Color = [0, 0, 0, 255]

  /* move */
  isMovable: boolean = true
  isPassable: boolean = true
  density: number = Environment.density
  private speedX: number = 0
  private speedY: number = 0
  private directionGravity: number = 1
  private directionX: number = 1
  private directionY: number = 1
  protected minSpeedX: number = 0.0
  protected minSpeedY: number = 0.0
  protected maxSpeedX: number = 5.0
  protected maxSpeedY: number = 5.0
  protected resistanceX: number = 0.8
  protected resistanceY: number = 0

  /* lifetime */
  isLiving: boolean = false
  lifeTimeTotal: number = 400 + Math.floor(Math.random() * 100)
  lifeTimeLeft: number = this.lifeTimeTotal

  /* fire */
  isFlammable: boolean = false
  isChangedByFire: boolean = false

  init() {
    this.color = ColorStrategy.monochrome(this.baseColor)
    this.directionGravity = this.density < Environment.density ? -1 : 1
    this.directionX = Math.random() > 0.5 ? -1 : 1
    this.directionY = this.directionGravity

    return this
  }

  private getSpeed(speed: number): number {
    const integer = Math.floor(speed)
    const decimal = speed - Math.trunc(speed)

    return integer + (Math.random() < decimal ? 1 : 0)
  }

  getSpeedX() {
    return this.getSpeed(this.speedX)
  }

  getSpeedY() {
    return this.getSpeed(this.speedY)
  }

  setSpeedX(speed: number) {
    this.speedX = Math.max(0, Math.min(speed, this.maxSpeedX))
  }

  setSpeedY(speed: number) {
    this.speedY = Math.max(0, Math.min(speed, this.maxSpeedY))
  }

  mergeSpeedToX() {
    this.setSpeedX(this.speedX + this.speedY)
    this.setSpeedY(0)
  }

  mergeSpeedToY() {
    this.setSpeedY(this.speedX + this.speedY)
    this.setSpeedX(0)
  }

  randDirectionX() {
    this.directionX = Math.random() > 0.5 ? -1 : 1
  }

  randDirectionY() {
    this.directionY = Math.random() > 0.5 ? -1 : 1
  }

  reverseDirectionX() {
    this.directionX = -this.directionX
  }

  reverseDirectionY() {
    this.directionY = -this.directionY
  }

  setDirectionYtoGravity() {
    this.directionY = this.directionGravity
  }

  getDirectionGravity() {
    return this.directionGravity
  }

  getDirectionX() {
    return this.directionX
  }

  getDirectionY() {
    return this.directionY
  }

  updateSpeed(isFalling: boolean, isStuck: boolean) {
    if (isStuck) {
      this.setSpeedX(this.minSpeedX)
      this.setSpeedY(this.minSpeedY)
      return
    }

    this.setSpeedX(this.speedX - this.resistanceX)

    if (isFalling) {
      this.speedY = this.speedY - this.resistanceY + Environment.gravity * this.directionGravity * this.directionY

      if (this.directionGravity != this.directionY && this.speedY < 0) {
        this.setSpeedY(Math.abs(this.speedY))
        this.directionY = this.directionGravity
      }
      else {
        this.setSpeedY(this.speedY)
      }
    }
    else {
      this.setSpeedY(this.speedY - this.resistanceY)
    }

    if (this.speedY == 0) {
      this.setSpeedX(Math.max(this.speedX, this.minSpeedX))
    }
    if (this.speedX == 0) {
      this.setSpeedY(Math.max(this.speedY, this.minSpeedY))
    }
  }
}

export class Empty extends Element {
  type = ElementType.Empty

  baseColor: Color = [255, 255, 255, 255]

  isMovable: boolean = false
}
