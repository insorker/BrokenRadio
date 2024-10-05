import { Painter } from './painter/painter'
import { Coordinate, World } from "./world/world"
import { Empty, Sand, Ice, Stone, Wood, Water, Oil, Steam, Smoke, Fire } from './element/elements'
import { SolidAction, LiquidAction, GasAction, SmokeAction, FireAction } from './action/actions'

export class BrokenRadio {
  container: HTMLElement
  canvas: HTMLCanvasElement
  buttonList: HTMLDivElement

  pen = Empty
  painter: Painter
  world: World

  constructor(container: HTMLElement, width: number, height: number, zoom: number) {
    this.container = container

    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height
    this.canvas.style.width = `${width * zoom}px`
    this.canvas.style.height = `${height * zoom}px`
    this.canvas.style.border = `1px solid black`
    this.canvas.style.imageRendering = `pixelated`

    this.buttonList = document.createElement('div')
    this.buttonList.appendChild(this.createElementButton('Empty', Empty))
    this.buttonList.appendChild(this.createElementButton('Sand', Sand))
    this.buttonList.appendChild(this.createElementButton('Ice', Ice))
    this.buttonList.appendChild(this.createElementButton('Stone', Stone))
    this.buttonList.appendChild(this.createElementButton('Wood', Wood))
    this.buttonList.appendChild(this.createElementButton('Water', Water))
    this.buttonList.appendChild(this.createElementButton('Oil', Oil))
    this.buttonList.appendChild(this.createElementButton('Steam', Steam))
    this.buttonList.appendChild(this.createElementButton('Smoke', Smoke))
    this.buttonList.appendChild(this.createElementButton('Fire', Fire))

    this.container.appendChild(this.canvas)
    this.container.appendChild(this.buttonList)

    this.painter = new Painter(this.canvas)
    this.world = new World(this.canvas.width, this.canvas.height)
  }

  update() {
    this.updateWorld()
    this.updateMouse()

    this.painter.paintBackground([255, 255, 255, 255])
    this.painter.paintWorld(this.world)
    this.painter.paintMouse(this.pen.baseColor)
    this.painter.paint()
  }

  private createElementButton(name: string, ElementClass: any) {
    let button = document.createElement('button')

    button.type = 'button'
    button.textContent = name
    button.onclick = () => { this.pen = ElementClass }

    return button
  }

  private updateElement(c: Coordinate) {
    switch(this.world.get(c).constructor.name) {
      case "Sand": SolidAction.update(this.world, c); break
      case "Ice": SolidAction.update(this.world, c); break
      case "Wood": SolidAction.update(this.world, c); break
      case "Stone": SolidAction.update(this.world, c); break
      case "Water": LiquidAction.update(this.world, c); break
      case "Oil": LiquidAction.update(this.world, c); break
      case "Steam": GasAction.update(this.world, c); break
      case "Smoke": SmokeAction.update(this.world, c); break
      case "Fire": FireAction.update(this.world, c); break
    }
  }

  private updateWorld() {
    for (let y = this.world.height - 1; y >= 0; y--) {
      let direction = Math.random() > 0.5

      for (let x = 0; x < this.world.width; x++) {
        let c = direction ? {x: x, y: y} : {x: this.world.width - 1 - x, y: y}

        this.updateElement(c)
      }
    }
  }

  private updateMouse() {
    if (this.painter.isPainting) {
      if (this.painter.check(this.painter.mousex, this.painter.mousey) == false) {
        return
      }

      for (let i = -this.painter.mouser; i <= this.painter.mouser; i++) {
        for (let j = -this.painter.mouser; j <= this.painter.mouser; j++) {
          if (i * i + j * j < this.painter.mouser * this.painter.mouser) {
            let c = {
              x: this.painter.mousex + i,
              y: this.painter.mousey + j
            }

            if (this.world.check(c) && Math.random() > 0.4) {
              this.world.set(c, new this.pen().init())
            }
          }
        }
      }
    }
  }
}
