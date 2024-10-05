import { World } from "../world/world"
import { Color } from "./color"

export class Painter {
  private cvs: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private id: ImageData

  private width: number
  private height: number
  private pixels: Uint8ClampedArray

  mousex: number = 0
  mousey: number = 0
  mouser: number = 4

  isPainting: boolean = false

  constructor(canvs: HTMLCanvasElement) {
    this.cvs = canvs
    this.ctx = canvs.getContext('2d')!
    this.width = this.cvs.width
    this.height = this.cvs.height
    this.id = this.ctx.getImageData(0, 0, this.width, this.height)
    this.pixels = this.id.data

    this.cvs.onmousedown = (_: MouseEvent) => {
      this.isPainting = true
    }

    this.cvs.onmousemove = (evt: MouseEvent) => {
      [this.mousex, this.mousey] = this.mousepos(evt)

      if (this.check(this.mousex, this.mousey) == false) {
        this.isPainting = false
      }
    }

    this.cvs.onmouseup = (_: MouseEvent) => {
      this.isPainting = false
    }
  }

  paintBackground(color: Color) {
    for (let i = 0; i < this.pixels.length; i += 4) {
      for (let j = 0; j < 4; j++) {
        this.pixels[i + j] = color[j]
      }
    }
  }

  paintMouse(color: Color) {
    if (this.check(this.mousex, this.mousey) == false) {
      return
    }

    for (let i = -this.mouser; i <= this.mouser; i++) {
      for (let j = -this.mouser; j <= this.mouser; j++) {
        if (i * i + j * j < this.mouser * this.mouser) {
          this.setPixel(
            this.mousex + i,
            this.mousey + j,
            color
          )
        }
      }
    }
  }

  paintWorld(world: World) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.setPixel(x, y, world.get({x: x, y: y}).color)
      }
    }
  }

  paint() {
    this.ctx.putImageData(this.id, 0, 0)
  }

  check(x: number, y: number) {
    if (0 > x || x >= this.width || 0 > y || y >= this.height) {
      return false
    }

    return true
  }

  private setPixel(x: number, y: number, color: Color) {
    let i = (y * this.width + x) * 4
    
    if (this.check(x, y) == false) {
      return
    }
    else {
      for (let j = 0; j < 4; j++) {
        this.pixels[i + j] = color[j]
      }
    }
  }

  private mousepos(evt: MouseEvent) {
    let rect = this.cvs.getBoundingClientRect()
    let scaleX = this.cvs.width / rect.width
    let scaleY = this.cvs.height / rect.height

    return [
      Math.round((evt.x - rect.left) * scaleX),
      Math.round((evt.y - rect.top) * scaleY),
    ]
  }
}
