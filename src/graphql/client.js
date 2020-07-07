import {ApolloClient, InMemoryCache} from 'apollo-boost';
// import {InMemoryCache} from 'apollo-cache-inmemory';
// import {ApolloLink} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import endpoint from '../config';
// import {setContext} from 'apollo-link-context';

// const delay = setContext(
//   request =>
//     new Promise((success, fail) => {
//       setTimeout(() => {
//         success();
//       }, 800);
//     }),
// );

const cache = new InMemoryCache();
const http = new HttpLink({
  uri: endpoint,
});

const link = http; //ApolloLink.from([delay, http]);

const client = new ApolloClient({
  cache,
  link,
});

export default client;
