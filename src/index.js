import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';

import App from './routes';
import browserHistory from './shared/services/history';

const render = () => {
  ReactDOM.render(
    <Router history={browserHistory}>
      <App />
    </Router>,
    document.getElementById('root')
  );
};

render();
