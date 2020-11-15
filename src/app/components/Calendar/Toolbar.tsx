import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import RightArrowIcon from '@material-ui/icons/ChevronRight';
import LeftArrowIcon from '@material-ui/icons/ChevronLeft';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';

const CalendarToolBar = ({ view, views, onNavigate, label, onView }) => {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const translatedTexts = translations.bigCalendar;

  const handleChange = (event, newView) => {
    onView(newView);
  };

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      spacing={1}
      className={classes.root}
    >
      <Grid item xs={12} sm={12} md={4}>
        <ButtonGroup size="small" aria-label="small button group">
          <Button type="button" onClick={() => onNavigate('PREV')}>
            <LeftArrowIcon />
          </Button>
          <Button type="button" onClick={() => onNavigate('TODAY')}>
            {translator(translatedTexts.today)}
          </Button>
          <Button type="button">
            <RightArrowIcon onClick={() => onNavigate('NEXT')} />
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Typography className={classes.label} variant="h5">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} className={classes.viewsGroup}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleChange}
          size="small"
        >
          {views.map(value => (
            <ToggleButton value={value}>{value}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(1),

      '& button': {
        textTransform: 'capitalize',
      },
    },
    label: {
      textTransform: 'capitalize',
      width: '100%',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    viewsGroup: {
      textAlign: 'right',
      '& button': {
        padding: '4px 9px',
        '&.Mui-selected': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
      },
    },
  }),
);

export default CalendarToolBar;
