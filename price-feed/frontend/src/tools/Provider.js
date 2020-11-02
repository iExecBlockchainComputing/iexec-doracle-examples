import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient   } from 'apollo-client';
import { InMemoryCache  } from 'apollo-cache-inmemory';
import { HttpLink       } from 'apollo-link-http';

const Provider = (props) => {
	const cache  = new InMemoryCache();
	const link   = new HttpLink({ uri: props.uri });
	const client = new ApolloClient({ cache, link });

	return <ApolloProvider client={client}>{ props.children }</ApolloProvider>;
}

export default Provider;
