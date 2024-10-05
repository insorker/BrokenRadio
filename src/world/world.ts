import { Element, Empty } from "../element/element"

export type Coordinate = { x: number, y: number }

export class World {
  width: number
  height: number
  elements: Array<Element>

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.elements = new Array(this.width * this.height).fill(0).map(() => new Empty())
  }

  check(c: Coordinate): boolean {
    return 0 <= c.x && c.x < this.width && 0 <= c.y && c.y < this.height
  }

  get(c: Coordinate): Element {
    return this.elements[this.index(c)]
  }

  set(c: Coordinate, e: Element) {
    this.elements[this.index(c)] = e
  }

  swap(c1: Coordinate, c2: Coordinate) {
    [this.elements[this.index(c1)], this.elements[this.index(c2)]] = [this.elements[this.index(c2)], this.elements[this.index(c1)]]
  }

  private index(c: Coordinate) {
    return c.y * this.width + c.x
  }
}
