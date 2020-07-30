import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import List from './pages/List';
import Details from './pages/Details';
import NotFound from './pages/NotFound';
import Template from './components/Template';

const Routes = () => (
  <Template>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={List} />
        <Route path="/details/:id" exact component={Details} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Template>
);

export default Routes;
