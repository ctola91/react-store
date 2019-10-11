import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './App';
import Home from './views/Home';
import About from './views/About/About';
import Error404 from './views/Error/404';
import Login from './views/Login/Login';
import PrivateRoute from './shared/components/PrivateRoute';
import Dashboard from './views/Dashboard/Dashboard';
import Register from './views/Register/Register';

const mockAuth = false;

const AppRoutes = () => (
  <App>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <PrivateRoute path="/dashboard" component={Dashboard} exact isAuthenticated={mockAuth} />

      <Error404 component={Error404} />
    </Switch>
  </App>
);

export default AppRoutes;
