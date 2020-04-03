import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { onError } from "apollo-link-error"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"
import * as cookies from "tiny-cookie"

const errorLink = onError(({ graphQLErrors, networkError }) => {
  // Go to login page if unauthorized.
  if (
    networkError &&
    networkError.statusCode === 401 &&
    location.pathname !== "/login"
  ) {
    window.location.href = `/login?url=${encodeURIComponent(
      `${location.pathname}${location.search}`,
    )}`
  }
})

const authLink = setContext((_, { headers }) => {
  const accessToken = cookies.get("access_token")
  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : null,
    },
  }
})

const httpLink = new HttpLink({
  uri: "/graphql",
  credentials: "include",
})

export default new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache({
    dataIdFromObject: object => null,
  }),
})
