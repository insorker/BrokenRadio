import { World } from "./world"
import { PaintColor } from "./painter"
import { rgbToHsl, hslToRgb } from "./utils/color-conversion-algorithms"

function varyColor(
  baseColor: PaintColor,
  varyS: () => number = () => Math.random() * 0.2 - 0.2,
  varyL: () => number = () => Math.random() * 0.2 - 0.1
  ): PaintColor
{
  let [h, s, l] = rgbToHsl(baseColor[0], baseColor[1], baseColor[2])

  s = Math.min(Math.max(0, s + varyS()), 1)
  l = Math.min(Math.max(0, l + varyL()), 1)

  let [r, g, b] = hslToRgb(h, s, l)

  return [Math.floor(r), Math.floor(g), Math.floor(b), baseColor[3]]
}

export abstract class Particle {
  static baseColor: PaintColor = [255, 255, 255, 0]
  color: PaintColor = [255, 255, 255, 0]

  isMovable: boolean = true
  isPassable: boolean = true
  density: number = 1.0

  speed: number = 0.0
  maxSpeed: number = 1.0
  acceleration: number = 1.0

  hasLife: boolean = false
  lifeTimeTotal: number = 200 + Math.floor(Math.random() * 100)
  lifeTimeLeft: number = this.lifeTimeTotal
  ParticleNextLife = Empty

  isFlammable: boolean = false
  isChangedByFire: boolean = false
  ParticleAfterFire = Empty

  update(w: World, x: number, y: number) {
    let state: [boolean, number, number] = [false, 0, 0]

    for (let i = 0; i < this.getSpeed(); i++) {
      state = this._update(w, x, y)

      if (!state[0]) {
        this.speed = 0.0
        return
      }
      else {
        x = state[1]
        y = state[2]
      }
    }

    this.updateSpeed()

    if (this.hasLife) {
      if (this.lifeTimeLeft == 0) {
        w.set(x, y, new this.ParticleNextLife())
      }
      else if (state[0]) {
        this.lifeTimeLeft--
        this.color[3] -= Math.floor(255 * (1.0 / this.lifeTimeTotal))
      }
    }
  }

  protected _update(_w: World, _x: number, _y: number): [boolean, number, number] { return [false, 0, 0] }

  protected move(w: World, x: number, y: number, direction: [number, number][], rule: (x1: number, y1: number, x2: number, y2: number) => boolean)
    : [boolean, number, number]
  {
    for (let d of direction) {
      if (!w.check(d[0], d[1])) continue
      if (!w.get(d[0], d[1]).isMovable) continue
      if (!w.get(d[0], d[1]).isPassable) continue
      if (!rule(x, y, d[0], d[1])) continue

      w.swap(w.getIndex(x, y), w.getIndex(d[0], d[1]))

      return [true, d[0], d[1]]
    }

    return [false, 0, 0]
  }

  protected updateSpeed() {
    this.speed += this.acceleration

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed
    }
  }

  protected getSpeed() {
    const integer = Math.floor(this.speed)
    const decimal = this.speed - Math.trunc(this.speed)

    return integer + (Math.random() < decimal ? 1 : 0)
  }
}

export class Empty extends Particle {
  static baseColor: PaintColor = [255, 255, 255, 255]
  color: PaintColor = [255, 255, 255, 255]
}

abstract class Gas extends Particle {
  density: number = 0.5

  _update(w: World, x: number, y: number) {
    let state

    let moveDirection = [
      [x, y - 1], [x - 1, y - 1], [x + 1, y - 1], [x - 1, y], [x + 1, y]
    ].sort(() => Math.random() - 0.5) as [number, number][]

    let moveRule = (x1: number, y1: number, x2: number, y2: number) => {
      return w.get(x1, y1).density <= w.get(x2, y2).density
    }

    state = this.move(w, x, y, moveDirection, moveRule)

    return state
  }
}

abstract class Liquid extends Particle {
  density: number = 1.5

  maxSpeed: number = 12.0
  acceleration: number = 2.0

  _update(w: World, x: number, y: number) {
    let state

    let moveDirection = [
      [x, y + 1], [x - 1, y + 1], [x + 1, y + 1], [x - 1, y], [x + 1, y],
    ].sort(() => Math.random() - 0.5) as [number, number][]

    let moveRule = (x1: number, y1: number, x2: number, y2: number) => {
      return w.get(x1, y1).density >= w.get(x2, y2).density
    }

    state = this.move(w, x, y, moveDirection, moveRule)

    return state
  }
}

abstract class Solid extends Particle {
  density: number = 3.0

  isPassable: boolean = false

  _update(w: World, x: number, y: number) {
    let state

    let moveDirection = [
      [x, y + 1], [x - 1, y + 1], [x + 1, y + 1]
    ] as [number, number][]

    let moveRule = (x1: number, y1: number, x2: number, y2: number) => {
      return w.get(x1, y1).density > w.get(x2, y2).density
    }

    state = this.move(w, x, y, moveDirection, moveRule)

    return state
  }
}

export class Smoke extends Gas {
  static baseColor: PaintColor = [60, 60, 60, 200]
  color: PaintColor = Smoke.baseColor

  hasLife: boolean = true

  density: number = 0.9

  maxSpeed: number = 0.8
  acceleration: number = 0.05

  constructor() {
    super()

    this.color = varyColor(Smoke.baseColor)
  }
}

export class Steam extends Gas {
  static baseColor: PaintColor = [200, 200, 200, 200]
  color: PaintColor = Steam.baseColor

  density: number = 0.5

  maxSpeed: number = 0.8
  acceleration: number = 0.05

  // hasLife: boolean = true
  // ParticleNextLife = Water

  constructor() {
    super()

    this.color = varyColor(Steam.baseColor)
  }
}

export class Water extends Liquid {
  static baseColor: PaintColor = [33, 159, 223, 255]
  color: PaintColor = Water.baseColor

  isChangedByFire: boolean = true
  ParticleAfterFire = Steam
}

export class Oil extends Liquid {
  static baseColor: PaintColor = [124, 81, 54, 255]
  color: PaintColor = Oil.baseColor

  density: number = 1.3

  isFlammable: boolean = true
}

export class Sand extends Solid {
  static baseColor: PaintColor = [220, 177, 89, 255]
  color: PaintColor = Sand.baseColor

  maxSpeed: number = 4.0
  acceleration: number = 0.5

  constructor() {
    super()

    this.color = varyColor(Sand.baseColor)
  }
}

export class Wood extends Solid {
  static baseColor: PaintColor = [70, 40, 29, 255]
  color: PaintColor = Wood.baseColor

  isMovable: boolean = false
  isPassable: boolean = false
  isFlammable: boolean = true

  constructor() {
    super()

    this.color = varyColor(Wood.baseColor)
  }
  
  _update(_w: World, _x: number, _y: number): [boolean, number, number] {
    return [false, 0, 0]
  }
}

export class Ice extends Solid {
  static baseColor: PaintColor = [140, 204, 255, 255]
  color: PaintColor = Ice.baseColor

  density: number = 1.2

  maxSpeed: number = 4.0
  acceleration: number = 0.5

  isChangedByFire: boolean = true
  ParticleAfterFire = Water

  constructor() {
    super()

    this.color = varyColor(Ice.baseColor)
  }
}

export class Stone extends Solid {
  static baseColor: PaintColor = [125, 128, 131, 255]
  color: PaintColor = Wood.baseColor

  isMovable: boolean = false
  isPassable: boolean = false

  constructor() {
    super()

    this.color = varyColor(Stone.baseColor)
  }
  
  _update(_w: World, _x: number, _y: number): [boolean, number, number] {
    return [false, 0, 0]
  }
}

export class Fire extends Particle {
  static baseColor: PaintColor = [255, 31, 31, 255]
  color: PaintColor = Fire.baseColor
  colors: PaintColor[] = [
    [255, 31, 31, 255],
    [84, 30, 30, 255],
    [234, 90, 0, 255],
    [255, 105, 0, 255],
    [238, 204, 9, 255],
  ]

  isMovable: boolean = false

  hasLife: boolean = true

  maxSpeed: number = 0.4
  acceleration: number = 0.05

  lifeTimeTotal: number = 16 + Math.floor(Math.random() * 8)
  lifeTimeLeft: number = this.lifeTimeTotal
  ParticleNextLife = Smoke

  constructor() {
    super()

    this.color = Fire.baseColor
  }

  flame(w: World, x: number, y: number): [boolean, number, number] {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let nx = x + i, ny = y + j

        if (!w.check(nx, ny)) continue

        if (w.get(nx, ny).isFlammable) {
          let f = new Fire()

          f.lifeTimeTotal *= 4
          f.lifeTimeLeft = f.lifeTimeTotal
          w.set(nx, ny, f)

          return [true, x, y]
        }
        else if (w.get(nx, ny).isChangedByFire) {
          let np = new (w.get(nx, ny).ParticleAfterFire)()

          this.lifeTimeLeft = 0
          w.set(nx, ny, np)

          return [true, x, y]
        }
      }
    }

    return [true, x, y]
  }

  _update(w: World, x: number, y: number): [boolean, number, number] {
    this.color = this.colors[this.lifeTimeLeft % this.colors.length]

    let state = this.flame(w, x, y)

    return state
  }
}
