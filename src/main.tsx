import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import store from './state';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './graphql/apollo';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ApolloProvider client={apolloClient}>
				<App />
			</ApolloProvider>
		</Provider>
	</React.StrictMode>,
);
