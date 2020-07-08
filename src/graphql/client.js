import ApolloClient from 'apollo-boost';
import {InMemoryCache} from 'apollo-cache-inmemory';
import endpoint from '../config';

// const delay = setContext(
//   request =>
//     new Promise((success, fail) => {
//       setTimeout(() => {
//         success();
//       }, 800);
//     }),
// );

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: endpoint,
});

export default client;
