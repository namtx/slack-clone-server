import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import Home from '../containers/Home';
import Register from '../containers/Register';
import Login from '../containers/Login';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
    </Switch>
  </Router>
);
export default Routes;
