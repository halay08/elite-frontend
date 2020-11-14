import { Grid, Button, makeStyles } from '@material-ui/core';
import React from 'react';
import About from './About';
import ProfileDetail from './ProfileDetail';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { UserService } from 'services';

export default function ProfileTab({ _id = '', userData = {} }: any) {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { profile } = translations;
  const { register, handleSubmit } = useForm({ defaultValues: userData });

  const onSubmit = async data => {
    await UserService.update(_id, data);
  };

  return (
    <Grid
      container
      item
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProfileDetail register={register} user={userData} />
        <About register={register} />
        <Grid item className={classes.updateButton}>
          <Button color="primary" type="submit" variant="contained">
            {translator(profile.updateButton)}
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  updateButton: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(1),
  },
}));
