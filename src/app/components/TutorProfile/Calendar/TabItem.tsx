import React from 'react';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';
import { Grid, Chip, Typography, Tab } from '@material-ui/core';
import { CalendarData } from './Calendar';

type TabItemProps = {
  classes: Record<'tabItem' | 'tab' | 'chip' | 'date', string>;
  item: CalendarData;
};
export default function TabItem(props: TabItemProps): JSX.Element {
  const { item, classes, ...others } = props;
  const { t: translator } = useTranslation();
  const { dayOfWeek } = translations;

  return (
    <Grid container alignContent="center" className={classes.tabItem}>
      <Grid item xs={4}>
        <Typography component="span" className={classes.date}>
          {item.date.format('DD/MM')}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography component="span">
          {translator(dayOfWeek[item.date.day().toString()])}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Chip size="small" label={item.slots.length} className={classes.chip} />
      </Grid>
      <Tab {...others} className={`${classes.tab} ${classes.tabItem}`} />
    </Grid>
  );
}
