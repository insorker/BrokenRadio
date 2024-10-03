import { Particle, Empty } from "./particle"
import { Painter } from "./painter"

export class World {
  width: number
  height: number
  particles: Array<Particle>

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.particles = new Array(this.width * this.height).fill(0).map(() => new Empty())
  }

  update(painter: Painter) {
    for (let y = this.height - 1; y >= 0; y--) {
      let direction = Math.random() > 0.5

      if (direction) {
        for (let x = 0; x < this.width; x++) {
          let i = this.getIndex(x, y)
          this.particles[i].update(this, x, y)
        }
      }
      else {
        for (let x = this.width - 1; x >= 0; x--) {
          let i = this.getIndex(x, y)
          this.particles[i].update(this, x, y)
        }
      }
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let i = this.getIndex(x, y)
        painter.setPixel(x, y, this.particles[i].color)
      }
    }
  }

  clear() {
    this.particles = new Array(this.width * this.height).fill(0).map(() => new Empty())
  }

  check(x: number, y: number) {
    if (0 > x || x >= this.width || 0 > y || y >= this.height) {
      return false
    }

    return true
  }

  get(x: number, y: number) {
    return this.particles[this.getIndex(x, y)]
  }

  set(x: number, y: number, p: Particle) {
    this.particles[this.getIndex(x, y)] = p
  }

  getIndex(x: number, y: number) {
    return y * this.width + x
  }

  swap(i: number, j: number) {
    [this.particles[i], this.particles[j]] = [this.particles[j], this.particles[i]]
  }
}
