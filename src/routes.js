import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import List from './pages/List';
import Details from './pages/Details';
import NotFound from './pages/NotFound';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={List} />
      <Route path="/details/:id" exact component={Details} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
