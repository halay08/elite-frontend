import React from 'react';
import { useAuth } from 'contexts/AuthContext';
import { Route, Redirect } from 'react-router-dom';
import { StudentRouteConfig } from 'config/routes';

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
              pathname: StudentRouteConfig.account.setting,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProfileRedirect;
