import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL;

const httpLink = createHttpLink({
  uri: API_URL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
