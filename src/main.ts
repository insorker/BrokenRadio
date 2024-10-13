import { BrokenRadio } from "./broken-radio"
import './assets/broken-radio.css'

let container = document.getElementById('broken-radio')

if (container != null) {
  let br = new BrokenRadio(container, 320, 180, 4)
  let FPS = 60
  let lastTimestamp = 0

  function update(timestamp: number) {
    if (timestamp - lastTimestamp < 1000 / FPS) {
      requestAnimationFrame(update);
      return
    }
    lastTimestamp = timestamp

    br.update()

    requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}
