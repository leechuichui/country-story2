import { createAction } from "redux-actions"

export const setBreakpoint = createAction("PANDA_SET_BREAKPOINT", breakpoint => ({
  breakpoint
}))
 

export const setLandscape = createAction("PANDA_SET_LANDSCAPE", landscape => ({
  landscape
}))
