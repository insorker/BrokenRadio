export class Keyboard {
  up: boolean = false
  down: boolean = false
  left: boolean = false
  right: boolean = false

  constructor() {
    window.onkeydown = (e: KeyboardEvent) => {
      let code = e.code

      switch (code) {
        case "KeyW": this.up = true; break
        case "KeyS": this.down = true; break
        case "KeyA": this.left = true; break
        case "KeyD": this.right = true; break
      }
    }

    window.onkeyup = (e: KeyboardEvent) => {
      let code = e.code

      switch (code) {
        case "KeyW": this.up = false; break
        case "KeyS": this.down = false; break
        case "KeyA": this.left = false; break
        case "KeyD": this.right = false; break
      }
    }
  }
}
