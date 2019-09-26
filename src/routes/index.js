import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { App } from './app.component';
import { Home } from './home';
import { NotFound } from './notFound';
import { ROUTES } from './app.constants';

export default () => {
  return (
    <App>
      <Switch>
        <Route exact path={ROUTES.home} component={Home} />

        <Route component={NotFound} />
      </Switch>
    </App>
  );
};
