import { makeStyles, Grid, Button } from '@material-ui/core';
import React from 'react';
import { Photo as PhotoIcon } from '@material-ui/icons';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';
import { UserAvatar } from 'app/components/Avatar';
import { User } from 'types/User';

type AvatarUploadderProps = {
  userData: User;
};
export default function AvatarUploadder({
  userData,
}: AvatarUploadderProps): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { profile } = translations;

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      spacing={2}
      className={classes.container}
    >
      <Grid item xs={12} sm={3} md={3} container justify="center">
        <UserAvatar user={userData} />
      </Grid>
      <Grid item xs={12} sm={3} md={3} container justify="center">
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
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing(4),
  },
}));
