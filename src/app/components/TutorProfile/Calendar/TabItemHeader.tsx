import React from 'react';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';

type TabItemHeaderType = {
  classes: Record<'tabItem', string>;
};
export default function TabItemHeader({
  classes,
}: TabItemHeaderType): JSX.Element {
  const { t: translator } = useTranslation();
  const { tutorCalendar } = translations;

  return (
    <Grid container alignContent="center" className={classes.tabItem}>
      <Grid item xs={4}>
        <Typography component="span">
          {translator(tutorCalendar.header.date)}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography component="span">
          {translator(tutorCalendar.header.day)}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography component="span">
          {translator(tutorCalendar.header.slots)}
        </Typography>
      </Grid>
    </Grid>
  );
}
