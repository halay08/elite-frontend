import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useAuth } from 'contexts/AuthContext';

export function HomePage() {
  const classes = useStyles();
  const { user } = useAuth();
  if (!user.isLoggedIn) {
    return <React.Fragment>loading...</React.Fragment>;
  }

  const title = 'Title';
  const overview = 'Overview';
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>HomePage container</span>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="caption">{overview}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              View
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '100%', // "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));
