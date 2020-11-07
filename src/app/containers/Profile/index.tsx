/* eslint-disable */
import { Helmet } from 'react-helmet-async';
import { Grid, Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { ProfileTab } from 'app/components/Profile';
import { UserService } from 'services';
import isEmpty from 'ramda.isempty';
import { Timeline } from 'app/components/Timeline';
import { mockStudent } from 'types/Student';

export function Profile() {
  const [userData, setUserData] = useState({});
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const { uid: _id } = user;
        const { props } = await UserService.get(_id);
        setUserData(props);
      })();
    }
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Profile page" />
      </Helmet>
      <Container fixed>
        <Grid item xs={12} sm={12} md={12}>
          {!isEmpty(userData) && (
            <ProfileTab _id={user.uid} userData={userData} />
          )}
        </Grid>
      </Container>
      <Timeline userData={mockStudent} />
    </>
  );
}
