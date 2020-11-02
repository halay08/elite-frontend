import React from 'react';
import { useAuth } from 'contexts/AuthContext';
import { Route, Redirect } from 'react-router-dom';
import RoutePath from 'config/routes';

const ProfileRedirect = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        !isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: RoutePath.accountSettings,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProfileRedirect;
