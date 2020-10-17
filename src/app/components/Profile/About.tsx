import { Grid } from '@material-ui/core';
import {
  AccountBalance as AccountBalanceIcon,
  Work as WorkIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import CustomTextField from './CustomTextField';
import Title from './Title';
import { translations } from 'locales/i18n';

export default function About({ register }: any) {
  const classes = useStyles();
  const { profile } = translations;

  return (
    <React.Fragment>
      <Title defaultMessage={profile.about.title} />
      <Grid container className={classes.container} direction="row">
        <Grid
          item
          xs={1}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <AccountBalanceIcon />
        </Grid>
        <Grid item xs={6} className={classes.item}>
          <CustomTextField
            name="studyTitle"
            inputRef={register}
            label={profile.about.study.label}
            placeholder={profile.about.study.placeholder}
          />
        </Grid>
        <Grid item xs={5} className={classes.item}>
          <CustomTextField
            name="studyPlace"
            inputRef={register}
            label={profile.about.studyAt.label}
            placeholder={profile.about.studyAt.placeholder}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.container} direction="row">
        <Grid
          item
          xs={1}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <WorkIcon />
        </Grid>
        <Grid item xs={6} className={classes.item}>
          <CustomTextField
            name="jobTitle"
            inputRef={register}
            label={profile.about.work.label}
            placeholder={profile.about.work.placeholder}
          />
        </Grid>
        <Grid item xs={5} className={classes.item}>
          <CustomTextField
            name="jobPlace"
            inputRef={register}
            label={profile.about.workAt.label}
            placeholder={profile.about.workAt.placeholder}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.item}>
          <CustomTextField
            name="description"
            inputRef={register}
            multiline
            rows={4}
            inputProps={{ maxLength: 500 }}
            label={profile.about.description.label}
            placeholder={profile.about.description.placeholder}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
  },

  item: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));
