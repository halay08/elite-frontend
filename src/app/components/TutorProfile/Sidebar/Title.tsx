import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';

type TitleType = {
  title: string;
  subTitle?: string;
};
function Title({ title, subTitle }: TitleType): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.container}>
      <Typography variant="h3">{title}</Typography>
      {!!subTitle && (
        <Typography component="p" variant="subtitle1">
          {subTitle}
        </Typography>
      )}
    </Grid>
  );
}

export default Title;

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(1.5),
    backgroundColor: theme.palette.background.dark,
  },
}));
