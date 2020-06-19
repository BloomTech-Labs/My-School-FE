import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

// Exception monitoring
Sentry.init({dsn: "https://a1ae3e3658b84f849266ede630f96caf@o347185.ingest.sentry.io/5255546"});

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
