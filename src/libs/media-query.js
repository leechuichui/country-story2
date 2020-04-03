const handlers = new Map()

export function add(query, handler) {
  const mediaQuery = matchMedia(query)
  const handlerWrapper = ({ matches }) => {
    if (matches) handler()
  }
  mediaQuery.addListener(handlerWrapper)
  handlers.set(mediaQuery, handlerWrapper)
  handlerWrapper(mediaQuery)
}

export function removeAll() {
  for (let [query, handler] of handlers.entries()) {
    query.removeListener(handler)
  }
}
