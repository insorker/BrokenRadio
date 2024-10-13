import { PlayerLab } from './lab'
import './assets/broken-radio.css'

let container = document.getElementById('broken-radio')

if (container != null) {
  let lab = new PlayerLab(container)
  let FPS = 60, lastTimestamp = 0

  function update(timestamp: number) {
    if (timestamp - lastTimestamp < 1000 / FPS) {
      requestAnimationFrame(update);
      return
    }
    lastTimestamp = timestamp

    lab.update()

    requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}
