import { Color } from "../color/color"
import { Coordinate, World } from "../world/world"

export class Player {
  shape: (Color|null)[][]
  shapeTop: Coordinate[]
  shapeBottom: Coordinate[]
  shapeLeft: Coordinate[]
  shapeRight: Coordinate[]
  lenH: number[] = []
  lenV: number[] = []

  constructor() {
    let colors: Color[] = [
      [172, 50, 50, 255],   // 0 red
      [238, 195, 154, 255], // 1 pink
      [0, 0, 0, 255],       // 2 black
      [26, 130, 197, 255],  // 3 blue
      // [255, 240, 137, 255], // 4 yellow
      [66, 164, 89, 255],   // 4 green
      [252, 71, 33, 255],   // 5 orange
      [255, 255, 255, 0],   // 6 transparent
    ]

    this.shape = [
      [null, colors[0], colors[0], colors[0], colors[0], colors[6], colors[4], colors[5]],
      [colors[0], colors[1], colors[1], colors[0], colors[0], colors[6], colors[4], colors[4]],
      [colors[0], colors[1], colors[2], colors[1], colors[2], colors[4], null, null],
      [null, colors[3], colors[3], colors[3], colors[4], null, null, null],
      [null, colors[1], null, colors[1], null, null, null, null],
    ]

    this.shapeTop = [
      {x: 0, y: 1}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}, {x: 7, y: 0}
    ]

    this.shapeBottom = [
      {x: 0, y: 2}, {x: 1, y: 4}, {x: 2, y: 3}, {x: 3, y: 4}, {x: 4, y: 3}, {x: 5, y: 2}, {x: 6, y: 1}, {x: 7, y: 1}
    ]
    
    this.shapeLeft = [
      {x: 1, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: 3}, {x: 1, y: 4}
    ]

    this.shapeRight = [
      {x: 7, y: 0}, {x: 7, y: 1}, {x: 5, y: 2}, {x: 4, y: 3}, {x: 3, y: 4}
    ]

    for (let i in this.shapeTop) {
      this.lenV[i] = this.shapeBottom[i].y - this.shapeTop[i].y + 1
    }

    for (let i in this.shapeLeft) {
      this.lenH[i] = this.shapeRight[i].x - this.shapeLeft[i].x + 1
    }
  }

  movementCheck(w: World, nc: Coordinate): boolean {
    if (!w.check(nc)) return false
    if (!w.get(nc).isPassable) return false

    return true
  }

  getShape(pos: Coordinate, shape: Coordinate[]): Coordinate[] {
    let s = []

    for (let i of shape) {
      s.push({x: i.x + pos.x, y: i.y + pos.y})
    }

    return s
  }

  moveUp(w: World, pos: Coordinate) {
    let shape = this.getShape(pos, this.shapeTop)

    for (let i in shape) {
      let nc = {x: shape[i].x, y: shape[i].y - 1}

      if (!this.movementCheck(w, nc)) {
        return false
      }
    }

    for (let i in shape) {
      for (let j = 0; j < this.lenV[i]; j++) {
        let c = {x: shape[i].x, y: shape[i].y + j}
        let nc = {x: shape[i].x, y: shape[i].y + j - 1}

        w.swap(c, nc)
      }
    }

    return true
  }

  moveDown(w: World, pos: Coordinate) {
    let shape = this.getShape(pos, this.shapeBottom)

    for (let i in shape) {
      let nc = {x: shape[i].x, y: shape[i].y + 1}

      if (!this.movementCheck(w, nc)) {
        return false
      }
    }

    for (let i in shape) {
      for (let j = 0; j < this.lenV[i]; j++) {
        let c = {x: shape[i].x, y: shape[i].y - j}
        let nc = {x: shape[i].x, y: shape[i].y - j + 1}

        w.swap(c, nc)
      }
    }

    return true
  }

  moveLeft(w: World, pos: Coordinate) {
    let shape = this.getShape(pos, this.shapeLeft)

    for (let i in shape) {
      let nc = {x: shape[i].x - 1, y: shape[i].y}

      if (!this.movementCheck(w, nc)) {
        return false
      }
    }

    for (let i in shape) {
      for (let j = 0; j < this.lenH[i]; j++) {
        let c = {x: shape[i].x + j, y: shape[i].y}
        let nc = {x: shape[i].x + j - 1, y: shape[i].y}

        w.swap(c, nc)
      }
    }

    return true
  }

  moveRight(w: World, pos: Coordinate) {
    let shape = this.getShape(pos, this.shapeRight)

    for (let i in shape) {
      let nc = {x: shape[i].x + 1, y: shape[i].y}

      if (!this.movementCheck(w, nc)) {
        return false
      }
    }

    for (let i in shape) {
      for (let j = 0; j < this.lenH[i]; j++) {
        let c = {x: shape[i].x - j, y: shape[i].y}
        let nc = {x: shape[i].x - j + 1, y: shape[i].y}

        w.swap(c, nc)
      }
    }

    return true
  }
}
