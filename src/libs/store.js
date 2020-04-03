import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import query from "react-hoc-query/lib/reducers"
// import { reducer as form } from "redux-form"
import thunkMiddleware from "redux-thunk"
import promiseMiddleware from "redux-promise-middleware"
import { createLogger } from "redux-logger" // we need to fix this plugin only for dev environment
import createHistory from "history/createBrowserHistory"
import { routerMiddleware } from "react-router-redux"

import app from "modules/app/reducers"

const history = createHistory()
let middleware = [
  thunkMiddleware,
  promiseMiddleware(),
  routerMiddleware(history),
]
if (DEBUG) {
  middleware.push(createLogger())
}
const store = createStore(
  combineReducers({
    query,
    app,
  }),
  compose(
    applyMiddleware(...middleware),
    //TODO: this is deprecated
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
)

export const dispatch = store.dispatch.bind(store)
export const getState = store.getState.bind(store)

export default store
