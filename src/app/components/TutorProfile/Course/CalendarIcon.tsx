import React from 'react';
import CalendarSVG from 'statics/calendar.svg';
import { Icon, makeStyles } from '@material-ui/core';

function CalendarIcon(): JSX.Element {
  const classes = useStyles();

  return (
    <Icon className={classes.svg}>
      <img className={classes.iconImg} src={CalendarSVG} alt="calendar" />
    </Icon>
  );
}

export default CalendarIcon;

const useStyles = makeStyles(theme => ({
  iconImg: {
    height: '100%',
  },
  svg: {
    fontSize: '3rem',
  },
}));
