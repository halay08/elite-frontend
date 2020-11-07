import React from 'react';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';
import { Grid, makeStyles, Typography, Button, Icon } from '@material-ui/core';
import WeekSelector from './WeekSelector';
import CartSVG from 'statics/shopping-bag.svg';

type ControllBarType = {
  handleChangeWeek: (value) => void;
};
function ControllBar({ handleChangeWeek }: ControllBarType): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { tutorCalendar, tutorCourse } = translations;

  return (
    <Grid
      container
      alignItems="center"
      spacing={2}
      className={classes.container}
    >
      <Grid item>
        <Typography component="span">
          {translator(tutorCalendar.datePicker.label)}
        </Typography>
      </Grid>
      <Grid item>
        <WeekSelector handleOnClose={handleChangeWeek} />
      </Grid>
      <Grid item style={{ marginLeft: 'auto' }}>
        <Button
          variant="contained"
          color="primary"
          className={classes.bookButton}
        >
          <Icon>
            <img
              className={classes.iconImg}
              src={CartSVG}
              alt={translator(tutorCourse.book)}
            />
          </Icon>
          <Typography component="span" className={classes.buttonText}>
            {translator(tutorCourse.book)}
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
}

export default ControllBar;

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
  },
  bookButton: {
    borderRadius: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      minWidth: theme.spacing(4),
    },
  },
  iconImg: {
    height: '100%',
  },
  buttonText: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      display: 'none',
      margin: 0,
    },
  },
}));
