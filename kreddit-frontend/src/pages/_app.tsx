import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/quicksand';
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql';
import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache';
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from '../generated/graphql';

// can add a custom theme by passing a theme object to the ChakraProvider




function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
  );
}

export default MyApp;
