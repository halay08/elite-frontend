/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { HomePage } from './containers/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { Login } from './containers/Login/Loadable';
import { ProfileRedirect, LoginRedirect } from './components/Router';
import { Profile } from './containers/Profile/Loadable';
import { EmailVerification } from './containers/EmailVerification/Loadable';
import { Dashboard } from './containers/Dashboard/Loadable';
import { ForgetPassword } from './containers/ForgetPassword/Loadable';
import { AccountAction } from './containers/AccountAction/Loadable';

export function App() {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <ProfileRedirect exact path="/login" component={Login} />
        <LoginRedirect exact path="/profile" component={Profile} />
        <Route exact path="/email-verification" component={EmailVerification} />
        <LoginRedirect exact path="/dashboard" component={Dashboard} />
        <ProfileRedirect
          exact
          path="/forgot-password"
          component={ForgetPassword}
        />
        <ProfileRedirect
          exact
          path="/account-action"
          component={AccountAction}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
