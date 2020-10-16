import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, makeStyles, Tabs, Tab } from '@material-ui/core';
import { LoginForm } from 'app/components/Login';

export function Login() {
  const classes = useStyles();
  const [activeTabId, setActiveTabId] = useState(0);

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Grid container className={classes.container}>
        <div className={classes.formContainer}>
          <div className={classes.form}>
            <Tabs
              value={activeTabId}
              onChange={(e, id) => setActiveTabId(id)}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Login" classes={{ root: classes.tab }} />
              <Tab label="New User" classes={{ root: classes.tab }} />
            </Tabs>
            {activeTabId === 0 && <LoginForm />}
            {/* {activeTabId === 1 && <RegisterForm />} */}
          </div>
        </div>
      </Grid>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  logotypeContainer: {
    backgroundColor: theme.palette.primary.main,
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  logotypeImage: {
    width: 165,
    marginBottom: theme.spacing(4),
  },
  logotypeText: {
    color: 'white',
    fontWeight: 500,
    fontSize: 84,
    [theme.breakpoints.down('md')]: {
      fontSize: 48,
    },
  },
  formContainer: {
    position: 'relative',
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
  },
  form: {
    width: 320,
    position: 'absolute',
    top: '0px',
  },
  tab: {
    fontWeight: 400,
    fontSize: 18,
  },
}));
