import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    // eslint-disable-next-line
    {...rest}
    render={props =>
      isAuthenticated === true ? (
        // eslint-disable-next-line
        <Component {...props} />
      ) : (
        <Redirect
          // eslint-disable-next-line
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

export default PrivateRoute;
