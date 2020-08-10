import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ListAll from './pages/ListAll';
import Details from './pages/Details';
import NotFound from './pages/NotFound';
import Template from './components/Template';
import Favorites from './pages/Favorites';

const Routes = () => (
  <BrowserRouter>
    <Template>
      <Switch>
        <Route path="/" exact component={ListAll} />
        <Route path="/details/:id" exact component={Details} />
        <Route path="/favorites" exact component={Favorites} />
        <Route component={NotFound} />
      </Switch>
    </Template>
  </BrowserRouter>
);

export default Routes;
