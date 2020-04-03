import { addEventListener } from "libs/handle-passive-event"

export function getScreenAngle() {
  let screen = window.screen
  let orientation =
    screen.orientation || screen.mozOrientation || screen.msOrientation
  let angle = (orientation && orientation.angle) || window.orientation

  let mm
  if (angle === null && typeof window.matchMedia == "function") {
    mm = window.matchMedia("(orientation: landscape)")
    if (mm.matches) {
      angle = 90
    }
  }
  return angle || 0
}

export function init(orientationChange) {
  addEventListener(
    window,
    "onorientationchange" in window ? "orientationchange" : "resize",
    orientationChange,
  )
}
