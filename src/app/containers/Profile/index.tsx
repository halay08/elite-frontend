/* eslint-disable */
import { Helmet } from 'react-helmet-async';
import { Grid, Tab, Tabs, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { ProfileTab } from 'app/components/Profile';
import { UserService } from 'services';
import isEmpty from 'ramda.isempty';

export function Profile() {
  const classes = useStyles();
  const [activeTabId, setActiveTabId] = useState(0);
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
      <Container className={classes.cardGrid} fixed>
        <Grid item xs={12} sm={12} md={12}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Account" />
            <Tab label="Profile" />
            <Tab label="Session" />
            <Tab label="Help" />
          </Tabs>
          {activeTabId === 0 && <div />}
          {activeTabId === 1 && !isEmpty(userData) && (
            <ProfileTab _id={user.uid} userData={userData} />
          )}
          {activeTabId === 2 && <div />}
          {activeTabId === 3 && <div />}
        </Grid>
      </Container>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));
