import { Action, FireAction, SmokeAction, SparkAction } from './action/actions'
import { Keyboard } from './controller/keyboard'
import { Mouse } from './controller/mouse'
import { Painter } from './controller/painter'
import { ElementType } from './element/elements'
import { Coordinate, World } from "./world/world"

export class BrokenRadio {
  protected mouse: Mouse
  protected keyboard: Keyboard

  protected painter: Painter
  protected world: World

  constructor(container: HTMLElement, width: number, height: number, zoom: number) {
    let canvas = document.createElement('canvas')

    canvas.width = width
    canvas.height = height
    canvas.style.width = `${width * zoom}px`
    canvas.style.height = `${height * zoom}px`
    container.appendChild(canvas)

    this.mouse = new Mouse(canvas)
    this.keyboard = new Keyboard()

    this.painter = new Painter(canvas)
    this.world = new World(canvas.width, canvas.height)
  }

  update() {
    this.paintBackground()

    this.updateWorld()
    this._update()

    this.paintWorld()
    this._paint()

    this.painter.paintToCanvas()
  }

  protected paintBackground() {
    for (let x = 0; x < this.painter.width; x++) {
      for (let y = 0; y < this.painter.height; y++) {
        this.painter.setPixel(x, y, [255, 255, 255, 255])
      }
    }
  }

  protected _update() { }

  protected _paint() { }

  private updateElement(c: Coordinate) {
    switch(this.world.get(c).type) {
      case ElementType.Smoke: SmokeAction.update(this.world, c); break
      case ElementType.Fire: FireAction.update(this.world, c); break
      case ElementType.Spark: SparkAction.update(this.world, c); break
      default: Action.update(this.world, c); break
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

  private paintWorld() {
    for (let x = 0; x < this.world.width; x++) {
      for (let y = 0; y < this.world.height; y++) {
        this.painter.setPixel(x, y, this.world.get({x: x, y: y}).color)
      }
    }
  }
}
