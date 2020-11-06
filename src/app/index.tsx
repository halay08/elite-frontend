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
import { RecommendedTutors } from './containers/RecommendedTutors/Loadable';
import AppStateProvider from './twilio/state';
import PrivateRoute from './twilio/components/PrivateRoute/PrivateRoute';
import { VideoApp } from './twilio/';
import RoutePath from 'config/routes';
import TutorProfile from './containers/TutorProfile';

export function App() {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <AppStateProvider>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <ProfileRedirect exact path={RoutePath.login} component={Login} />
          <LoginRedirect
            exact
            path={RoutePath.dashboard}
            component={Dashboard}
          />
          <LoginRedirect
            exact
            path={RoutePath.accountSettings}
            component={Profile}
          />
          <LoginRedirect
            exact
            path={RoutePath.tutorProfile}
            component={TutorProfile}
          />
          <LoginRedirect
            exact
            path={RoutePath.accountTutors}
            component={RecommendedTutors}
          />
          <Route
            exact
            path={RoutePath.emailVerification}
            component={EmailVerification}
          />
          <ProfileRedirect
            exact
            path={RoutePath.forgotPassword}
            component={ForgetPassword}
          />
          <ProfileRedirect
            exact
            path={RoutePath.accountAction}
            component={AccountAction}
          />
          <PrivateRoute exact path="/room">
            <VideoApp />
          </PrivateRoute>
          <PrivateRoute path="/room/:URLRoomName">
            <VideoApp />
          </PrivateRoute>
          <Route component={NotFoundPage} />
        </Switch>
      </AppStateProvider>
    </BrowserRouter>
  );
}
