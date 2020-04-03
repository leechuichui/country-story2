/**
 * passive event listener polyfill
 */

let supportsPassive = false
try {
  let opts = Object.defineProperty({}, "passive", {
    get() {
      supportsPassive = true
    },
  })
  window.addEventListener("passive-event-test", null, opts)
} catch (e) {} // eslint-disable-line no-empty

const defaultValues = {
  useCapture: false,
  isPassive: true,
}

export function addEventListener(
  element,
  eventType,
  handler,
  useCapture = defaultValues.useCapture,
  isPassive = defaultValues.isPassive,
) {
  if (supportsPassive) {
    element.addEventListener(eventType, handler, {
      capture: useCapture,
      passive: isPassive,
    })
  } else {
    element.addEventListener(eventType, handler, useCapture)
  }
}

export function removeEventListener(
  element,
  eventType,
  handler,
  useCapture = defaultValues.useCapture,
  isPassive = defaultValues.isPassive,
) {
  if (supportsPassive) {
    element.removeEventListener(eventType, handler, {
      capture: useCapture,
      passive: isPassive,
    })
  } else {
    element.removeEventListener(eventType, handler, useCapture)
  }
}
