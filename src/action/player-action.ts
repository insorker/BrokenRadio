import { Player } from "../world/player"
import { Coordinate, World } from "../world/world"

export class PlayerAction {
  static movementCheck(w: World, nc: Coordinate): boolean {
    if (!w.check(nc)) return false
    if (!w.get(nc).isPassable) return false

    return true
  }

  static moveTop(w: World, player: Player) {
    for (let shape of player.shapeTop.shape) {
      for (let i = 0; i < player.shapeTop.len; i++) {
        let nc = {x: shape.x, y: shape.y - 1}

        if (!this.movementCheck(w, nc)) {
          return
        }
      }
    }

    for (let shape of player.shapeTop.shape) {
      for (let i = 0; i < player.shapeTop.len; i++) {
        let c = {x: shape.x, y: shape.y + i}
        let nc = {x: shape.x, y: shape.y + i - 1}

        w.swap(c, nc)
      }
    }
  }

  static moveDown(w: World, player: Player) {
    for (let shape of player.shapeTop.shape) {
      for (let i = 0; i < player.shapeTop.len; i++) {
        let nc = {x: shape.x, y: shape.y - 1}

        if (!this.movementCheck(w, nc) || !w.get(nc).isPlayerDownAccessible) {
          return
        }
      }
    }

    for (let shape of player.shapeTop.shape) {
      for (let i = 0; i < player.shapeTop.len; i++) {
        let c = {x: shape.x, y: shape.y + i}
        let nc = {x: shape.x, y: shape.y + i - 1}

        w.swap(c, nc)
      }
    }
  }

  static moveLeft(w: World, player: Player) {
    for (let shape of player.shapeLeft.shape) {
      for (let i = 0; i < player.shapeLeft.len; i++) {
        let nc = {x: shape.x + i - 1, y: shape.y}

        if (!this.movementCheck(w, nc)) {
          return
        }
      }
    }

    for (let shape of player.shapeLeft.shape) {
      for (let i = 0; i < player.shapeLeft.len; i++) {
        let c = {x: shape.x + i, y: shape.y}
        let nc = {x: shape.x + i - 1, y: shape.y}

        w.swap(c, nc)
      }
    }
  }

  static moveRight(w: World, player: Player) {
    for (let shape of player.shapeRight.shape) {
      for (let i = 0; i < player.shapeRight.len; i++) {
        let nc = {x: shape.x - i - 1, y: shape.y}

        if (!this.movementCheck(w, nc)) {
          return
        }
      }
    }

    for (let shape of player.shapeRight.shape) {
      for (let i = 0; i < player.shapeRight.len; i++) {
        let c = {x: shape.x - i, y: shape.y}
        let nc = {x: shape.x - i - 1, y: shape.y}

        w.swap(c, nc)
      }
    }
  }
}
