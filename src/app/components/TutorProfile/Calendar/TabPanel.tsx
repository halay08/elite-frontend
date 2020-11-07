import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
} from '@material-ui/icons';
import { CalendarData } from './Calendar';
import { hideIfNoData } from 'helpers';

type TabPanelProps = {
  classes: Record<'tabItem' | 'tabPanel' | 'date' | 'button', string>;
  calendarData: CalendarData;
  index: number;
  value: number;
  handleChange: Function;
};
const checkProps = hideIfNoData(
  ({ value, index }: TabPanelProps) => value !== index,
);

function TabPanel({
  classes,
  calendarData,
  value,
  handleChange,
}: TabPanelProps): JSX.Element {
  return (
    <Grid
      role="tabpanel"
      className={classes.tabPanel}
      container
      direction="column"
    >
      <Grid
        item
        container
        alignItems="center"
        justify="space-between"
        className={classes.tabItem}
      >
        <Button
          size="small"
          startIcon={<NavigateBeforeIcon />}
          onClick={e => handleChange(e, value - 1)}
          disabled={value === 1}
          className={classes.button}
        />
        <Typography component="span" className={classes.date}>
          {calendarData.date.format('DD/MM')}
        </Typography>
        <Button
          size="small"
          startIcon={<NavigateNextIcon />}
          onClick={e => handleChange(e, value + 1)}
          disabled={value === 7}
          className={classes.button}
        />
      </Grid>
      {calendarData.slots.map((slot, index) => (
        <Grid
          key={index}
          item
          container
          justify="space-between"
          alignContent="center"
          className={classes.tabItem}
        >
          <Typography component="span">{slot.time}</Typography>
          <Typography component="span" color="primary">
            {slot.content}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}

export default checkProps(TabPanel);
