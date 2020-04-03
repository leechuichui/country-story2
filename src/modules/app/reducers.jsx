import { handleActions } from "redux-actions"
import update from "immutability-helper"
import {
  setBreakpoint,
  setLandscape,
} from "modules/app/actions"

const initialState = {
  breakpoint: null,
  landscape: false
}

update.extend("$auto", (value, object) => {
  return object ? update(object, value) : update({}, value)
})

export default handleActions(
  {
    [setBreakpoint](state, { payload }) {
      return update(state, {
        breakpoint: { $set: payload.breakpoint },
      })
    },
    [setLandscape](state, { payload }) {
      return update(state, {
        landscape: {
          $set: payload.landscape,
        },
      })
    },
  },
  initialState,
)
