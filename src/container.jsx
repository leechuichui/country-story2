import { hot } from "react-hot-loader"
import React from "react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { ApolloProvider } from "react-apollo"

import store from "libs/store"
import apolloClient from "libs/apollo"
import App from "components/app"

const Container = () => (
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
)

const HotContainer = hot(module)(Container)

export default HotContainer
