import { Painter } from "./painter"
import { Empty, Sand, Steam, Wood, Smoke, Fire, Water, Ice, Oil, Stone } from "./particle"
import { World } from "./world"

function render(width: number, height: number, zoom: number) {
  function createParticleButton(name: string, penParticleClass: any) {
    let button = document.createElement('button')

    button.type = 'button'
    button.textContent = name
    button.onclick = () => { PenParticle = penParticleClass }

    return button
  }

  const container = document.getElementById('broken-radio')

  if (container == null) {
    return
  }

  const canvas = document.createElement('canvas')

  canvas.width = width
  canvas.height = height
  canvas.style.width = `${width * zoom}px`
  canvas.style.height = `${height * zoom}px`
  canvas.style.border = `1px solid black`
  canvas.style.imageRendering = `pixelated`

  const buttonList = document.createElement('div')

  buttonList.appendChild(createParticleButton('Empty', Empty))
  buttonList.appendChild(createParticleButton('Sand', Sand))
  buttonList.appendChild(createParticleButton('Steam', Steam))
  buttonList.appendChild(createParticleButton('Wood', Wood))
  buttonList.appendChild(createParticleButton('Smoke', Smoke))
  buttonList.appendChild(createParticleButton('Fire', Fire))
  buttonList.appendChild(createParticleButton('Water', Water))
  buttonList.appendChild(createParticleButton('Ice', Ice))
  buttonList.appendChild(createParticleButton('Oil', Oil))
  buttonList.appendChild(createParticleButton('Stone', Stone))

  container.appendChild(canvas)
  container.appendChild(buttonList)

  const FPS = 60
  let lastTimestamp = 0

  let painter = new Painter(canvas)
  let world = new World(canvas.width, canvas.height)
  let PenParticle: any = Empty

  function update (timestamp: number) {
    if (timestamp - lastTimestamp < 1000 / FPS) {
      requestAnimationFrame(update);
      return
    }
    lastTimestamp = timestamp

    painter.paintBackground([255, 255, 255, 255])

    world.update(painter)

    painter.paintMouse(PenParticle.baseColor)

    if (painter.isPainting) {
      if (painter.check(painter.mousex, painter.mousey) == false) {
        return
      }

      for (let i = -painter.mouser; i <= painter.mouser; i++) {
        for (let j = -painter.mouser; j <= painter.mouser; j++) {
          if (i * i + j * j < painter.mouser * painter.mouser) {
            let x = painter.mousex + i, y = painter.mousey + j

            if (world.check(x, y) && Math.random() > 0.4) {
              world.set(x, y, new PenParticle())
            }
          }
        }
      }
    }

    painter.paint()

    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

render(320, 180, 4)
