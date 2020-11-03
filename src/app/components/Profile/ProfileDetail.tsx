import { Button, Grid } from '@material-ui/core';
import { Photo as PhotoIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import CustomTextField from './CustomTextField';
import Title from './Title';
import { UserAvatar } from 'app/components/Avatar';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';

export default function ProfileDetail({ register, user }: any) {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { profile } = translations;

  return (
    <React.Fragment>
      <Title defaultMessage={profile.details.title} />
      <Grid
        container
        direction="row"
        alignItems="center"
        className={classes.container}
      >
        <Grid item xs={6}>
          <UserAvatar user={user} />
        </Grid>
        <Grid item xs={6}>
          <input id="avatar-input" type="file" hidden accept="image/*" />
          <label htmlFor="avatar-input">
            <Button
              color="primary"
              component="span"
              startIcon={<PhotoIcon />}
              variant="contained"
            >
              {translator(profile.details.avatarButton)}
            </Button>
          </label>
        </Grid>
      </Grid>
      <Grid container className={classes.container} direction="row">
        <Grid item xs={6} className={classes.item}>
          <CustomTextField
            name="name"
            inputRef={register}
            label={profile.details.name.label}
            placeholder={profile.details.name.placeholder}
          />
        </Grid>
        <Grid item xs={6} className={classes.item}>
          <CustomTextField
            name="surname"
            inputRef={register}
            label={profile.details.surname.label}
            placeholder={profile.details.surname.placeholder}
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
