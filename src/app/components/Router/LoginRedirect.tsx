import React from 'react';
import { useAuth } from 'contexts/AuthContext';
import { Route, Redirect } from 'react-router-dom';
import { Layout } from 'app/components/Layout/Layout';

const LoginRedirect = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Layout>
            <Component {...props} />
          </Layout>
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
