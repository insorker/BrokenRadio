import { rgbToHsl, hslToRgb } from "./color-conversion-algorithms"

export type Color = [number, number, number, number]

export class ColorStrategy {
  static monochrome(baseColor: Color): Color {
    return baseColor.slice() as Color
  }
  
  static vary(
    baseColor: Color,
    varyS: () => number = () => Math.random() * 0.2 - 0.2,
    varyL: () => number = () => Math.random() * 0.2 - 0.1
  ): Color {
    let [h, s, l] = rgbToHsl(baseColor[0], baseColor[1], baseColor[2])

    s = Math.min(Math.max(0, s + varyS()), 1)
    l = Math.min(Math.max(0, l + varyL()), 1)

    let [r, g, b] = hslToRgb(h, s, l)

    return [Math.floor(r), Math.floor(g), Math.floor(b), baseColor[3]]
  }

  static fade(baseColor: Color, ratio: number): Color {
    let color = baseColor.slice() as Color

    color[3] = Math.floor(baseColor[3] * ratio)

    return color
  }

  static blink(colors: Color[], i: number): Color {
    return colors[i].slice() as Color
  }
}
