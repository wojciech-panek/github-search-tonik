import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';

import App from './routes';
import browserHistory from './services/history';
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
