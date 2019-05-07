import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { store } from './store';
import Routes from './routes';
import './index.css';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

const App = () => (
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <Routes />
    </ApolloProvider>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
