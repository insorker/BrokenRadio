import { Color } from "../color/color"

export class Painter {
  private cvs: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private img: ImageData
  private pixels: Uint8ClampedArray

  width: number
  height: number

  constructor(canvs: HTMLCanvasElement) {
    this.cvs = canvs
    this.ctx = canvs.getContext('2d')!
    this.img = this.ctx.getImageData(0, 0, this.cvs.width, this.cvs.height)
    this.pixels = this.img.data

    this.width = this.cvs.width
    this.height = this.cvs.height
  }

  check(x: number, y: number) {
    return 0 <= x && x < this.cvs.width && 0 <= y && y < this.cvs.height
  }

  setPixel(x: number, y: number, color: Color) {
    let i = (y * this.cvs.width + x) * 4
    
    if (this.check(x, y) == false) {
      return
    }
    else {
      for (let j = 0; j < 4; j++) {
        this.pixels[i + j] = color[j]
      }
    }
  }

  paintToCanvas() {
    this.ctx.putImageData(this.img, 0, 0)
  }
}
