import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';

type HeaderBarType = {
  title: string;
  subTitle: string;
  Icon: JSX.Element;
};
function HeaderBar({ title, subTitle, Icon }: HeaderBarType): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" className={classes.container}>
      <Grid item className={classes.icon}>
        {Icon}
      </Grid>
      <Grid item xs={8} sm={10} md={10} container direction="column">
        <Typography component="h3" variant="h3">
          {title}
        </Typography>
        <Typography component="p" variant="subtitle1">
          {subTitle}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default HeaderBar;

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3.5),
    backgroundColor: theme.palette.background.dark,
  },
  icon: {
    margin: 14,
  },
}));
