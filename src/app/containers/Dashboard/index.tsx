import React from 'react';
import { Container } from '@material-ui/core';
import { Information, Tabs } from 'app/components/Dashboard';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Information />
      <Tabs />
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
    },
  }),
);

export { Dashboard };
