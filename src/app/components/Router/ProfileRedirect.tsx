import React from 'react';
import { useAuth } from 'contexts/AuthContext';
import { Route, Redirect } from 'react-router-dom';

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
            to={{ pathname: '/profile', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default ProfileRedirect;
