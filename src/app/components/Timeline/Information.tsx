import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import {
  AccountBalance as AccountBalanceIcon,
  Work as WorkIcon,
} from '@material-ui/icons';
import { translations } from 'locales/i18n';
import CustomTextField from '../Profile/CustomTextField';
import { useForm } from 'react-hook-form';
import { User } from 'types/User';
import { useTranslation } from 'react-i18next';

type updateInformationProps = {
  userData: User;
};

export default function UpdateInformation({ userData }): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { profile } = translations;
  const { register } = useForm({ defaultValues: userData });

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={1} container justify="center" alignItems="center">
          <AccountBalanceIcon />
        </Grid>
        <Grid item xs={6} className={classes.item}>
          <CustomTextField
            name="studyTitle"
            inputRef={register({
              required: `${translator(profile.requiredField)}`,
            })}
            label={profile.about.study.label}
            placeholder={profile.about.study.placeholder}
          />
        </Grid>
        <Grid item xs={6} sm={5} md={5} className={classes.item}>
          <CustomTextField
            name="studyPlace"
            inputRef={register({
              required: `${translator(profile.requiredField)}`,
            })}
            label={profile.about.studyAt.label}
            placeholder={profile.about.studyAt.placeholder}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Grid item xs={1} container justify="center" alignItems="center">
          <WorkIcon />
        </Grid>
        <Grid item xs={6} className={classes.item}>
          <CustomTextField
            name="jobTitle"
            inputRef={register({
              required: `${translator(profile.requiredField)}`,
            })}
            label={profile.about.work.label}
            placeholder={profile.about.work.placeholder}
          />
        </Grid>
        <Grid item xs={6} sm={5} md={5} className={classes.item}>
          <CustomTextField
            name="jobPlace"
            inputRef={register({
              required: `${translator(profile.requiredField)}`,
            })}
            label={profile.about.workAt.label}
            placeholder={profile.about.workAt.placeholder}
          />
        </Grid>
      </Grid>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing(4),
    '& > div:first-of-type': {
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
  },
  item: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));
