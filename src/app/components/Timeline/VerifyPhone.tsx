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
      justify="center"
      spacing={2}
      className={classes.container}
    >
      <Grid container item xs={12} sm={5} md={5} alignItems="center">
        <PhoneIcon />
        <MuiPhoneNumber
          name="phone"
          label={translator(timeline.verifyPhone.label)}
          defaultCountry="vn"
          value={phoneNumber}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
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
