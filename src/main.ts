import { BrokenRadio } from "./broken-radio"
import './assets/broken-radio.css'

let container = document.getElementById('broken-radio')

if (container != null) {
  let br = new BrokenRadio(container, 320, 180, 4)

  function update() {
    br.update()

    requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}
