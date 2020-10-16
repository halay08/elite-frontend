import React from 'react';
import { useAuth } from 'contexts/AuthContext';
import { Route, Redirect } from 'react-router-dom';

const LoginRedirect = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default LoginRedirect;
