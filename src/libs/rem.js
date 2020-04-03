import { addEventListener } from "libs/handle-passive-event"
import store from "libs/store"
import { PHONE, PAD_NARROW, PAD_WIDE } from "libs/constants"

const FPS = 15
const BASE_WIDTHS = new Map()
BASE_WIDTHS.set(PHONE, 375)
BASE_WIDTHS.set(PAD_NARROW, 768)
BASE_WIDTHS.set(PAD_WIDE, 1024)

let resizeTimer = null

function resizeHandler(e) {
  if (!resizeTimer) {
    resizeTimer = setTimeout(() => {
      resizeTimer = null
      calcBaseFont(e)
    }, 1000 / FPS)
  }
}

export function calcBaseFont() {
  const breakpoint = store.getState().app.breakpoint
  const width = document.documentElement.clientWidth
  const html = document.querySelector("html")
  html.style.fontSize = `${width * 100 / BASE_WIDTHS.get(breakpoint)}px`
}

export function init() {
  addEventListener(window, "resize", resizeHandler)
  calcBaseFont()
}
