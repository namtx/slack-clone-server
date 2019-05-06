import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import Home from '../containers/Home';
import Register from '../containers/Register';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
    </Switch>
  </Router>
);
export default Routes;
