import { makeStyles, Grid, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { Phone as PhoneIcon } from '@material-ui/icons';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';
import MuiPhoneNumber from 'material-ui-phone-number';

export default function VerifyPhoneNumber(): JSX.Element {
  const classes = useStyles();
  const [phoneNumber, setPhoneNumber] = useState('');
  const { t: translator } = useTranslation();
  const { timeline } = translations;

  const handleChange = value => {
    setPhoneNumber(value);
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={3} />
      <Grid container item xs={4} direction="row" alignItems="center">
        <PhoneIcon />
        <MuiPhoneNumber
          name="phone"
          label={translator(timeline.verifyPhone.label)}
          defaultCountry="vn"
          value={phoneNumber}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={5}>
        <Button color="primary" component="span" variant="contained">
          {translator(timeline.verifyPhone.sendCode)}
        </Button>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing(4),
  },
}));
