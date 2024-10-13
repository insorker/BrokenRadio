export class Mouse {
  private cvs: HTMLCanvasElement
  
  x: number = 0
  y: number = 0
  
  pressed: boolean = false

  constructor(canvs: HTMLCanvasElement) {
    this.cvs = canvs

    this.cvs.onmousedown = (_: MouseEvent) => {
      this.pressed = true
    }

    this.cvs.onmousemove = (evt: MouseEvent) => {
      [this.x, this.y] = this.mousepos(evt)

      if (this.check(this.x, this.y) == false) {
        this.pressed = false
      }
    }

    this.cvs.onmouseup = (_: MouseEvent) => {
      this.pressed = false
    }
  }

  check(x: number, y: number) {
    return 0 <= x && x < this.cvs.width && 0 <= y && y < this.cvs.height
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
