import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

import App from './routes';
import browserHistory from './shared/services/history';
import configureStore from './modules/store';

const initialState = {};
const store = configureStore(initialState);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <App />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
};

render();
