import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { BaseGraphUri, HasuraToken } from "./Graph";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: BaseGraphUri,
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = HasuraToken
    return {
      headers: {
        ...headers,
        "x-hasura-admin-secret": token,
      },
    };
  });
  
  export const Api = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });