import React, { MouseEventHandler } from 'react';
import { Grid, Typography, makeStyles, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Tutor } from 'types/Tutor';

type recommendBarProps = {
  tutors: Array<Tutor>;
  text: any;
  handleGetOnline: MouseEventHandler<HTMLButtonElement>;
};
export default function RecommendBar({
  tutors,
  text,
  handleGetOnline,
}: recommendBarProps): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="stretch"
      className={classes.container}
    >
      <Grid
        item
        xs={6}
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item>
          <Typography variant="h1">
            {translator(text.title, { available: tutors.length })}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">
            {translator(text.subTitle, {
              recommended: tutors.length,
            })}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={6}
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item>
          <Button variant="contained" color="primary" size="large">
            {translator(text.button.choose)}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleGetOnline}
          >
            {translator(text.button.online)}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
    border: `2px solid ${theme.palette.primary.dark}`,
    color: theme.palette.primary.dark,
  },
}));
