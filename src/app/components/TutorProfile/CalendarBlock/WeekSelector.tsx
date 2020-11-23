import clsx from 'clsx';
import React, { useState } from 'react';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';
import { IconButton, makeStyles } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import moment, { Moment } from 'moment';

type WeekSelectorType = {
  handleOnClose: (value) => void;
};
export default function WeekSelector({
  handleOnClose,
}: WeekSelectorType): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { tutorCalendar } = translations;
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());

  const handleWeekChange = date => {
    setSelectedDate(moment(date));
  };

  const formatWeekSelectLabel = (date, invalidLabel) => {
    let dateClone = moment(date);

    return dateClone && dateClone.isValid()
      ? translator(tutorCalendar.datePicker.value, {
          date: dateClone.format('MMM DD YYYY'),
        })
      : invalidLabel;
  };

  const renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
    let dateClone = moment(date).clone();
    let selectedDateClone = moment(selectedDate).clone();

    const start = selectedDateClone.startOf('week').toDate();
    const end = selectedDateClone.endOf('week').toDate();

    const dayIsBetween = dateClone.isBetween(start, end, undefined, '[]');
    const isFirstDay = dateClone.isSame(start, 'day');
    const isLastDay = dateClone.isSame(end, 'day');

    const wrapperClassName = clsx({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay,
    });

    const dayClassName = clsx(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
    });

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span>{dateClone.format('DD')}</span>
        </IconButton>
      </div>
    );
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        variant="inline"
        inputVariant="outlined"
        format="MM/dd/yyyy"
        value={selectedDate}
        onChange={handleWeekChange}
        onClose={() => handleOnClose(selectedDate)}
        renderDay={renderWrappedWeekDay}
        labelFunc={formatWeekSelectLabel}
      />
    </MuiPickersUtilsProvider>
  );
}

const useStyles = makeStyles(theme => ({
  dayWrapper: {
    position: 'relative',
  },
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: '0 2px',
    color: 'inherit',
  },
  customDayHighlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '2px',
    right: '2px',
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: '50%',
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled,
  },
  highlightNonCurrentMonthDay: {
    color: '#676767',
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  endHighlight: {
    extend: 'highlight',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  },
  firstHighlight: {
    extend: 'highlight',
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  },
}));
