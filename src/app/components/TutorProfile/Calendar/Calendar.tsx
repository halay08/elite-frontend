import React, { useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Tabs } from '@material-ui/core';
import { Session } from 'types/Session';
import TabItemHeader from './TabItemHeader';
import TabItem from './TabItem';
import TabPanel from './TabPanel';
import moment, { Moment } from 'moment';
import { Course } from 'types/Course';
import { CourseService } from 'services';

type Slot = {
  time: string;
  content: string;
};

export type CalendarData = {
  date: Moment;
  slots: Array<Slot>;
};

const getDatesBetweenDates = (
  startDate: Moment,
  endDate: Moment,
): Array<Moment> => {
  let dates: Array<Moment> = [startDate.clone()];

  while (startDate.add(1, 'days').diff(endDate) < 0) {
    dates.push(startDate.clone());
  }

  return dates;
};

const formatTime = (hour: number, minute: number): string =>
  moment(`${hour}:${minute}`, 'hh:mm').format('HH:mm');

const formatSessions = (
  sessions: Array<Session>,
  startDate: Moment,
  endDate: Moment,
): Array<CalendarData> => {
  const dates = getDatesBetweenDates(startDate, endDate);
  const filterSessionByDate = (date: Moment) => (session: Session): Boolean => {
    const allSessionDate = [session.date, ...session.repeatOn].map(d =>
      d.toString(),
    );
    return allSessionDate.includes(date.toDate().toString());
  };

  const normalizeSession = (session: Session) => {
    const { hour, minute } = session.startTime;
    const endHour = hour + session.duration / 60;
    const endMinute = minute + (session.duration % 60);

    const time = `${formatTime(hour, minute)} - ${formatTime(
      endHour,
      endMinute,
    )}`;
    return {
      time,
      content: session.topicName,
    };
  };

  return dates.map(date => {
    const slots = sessions
      .filter(filterSessionByDate(date))
      .map(normalizeSession);

    return {
      date,
      slots,
    };
  });
};

type CalendarType = {
  selectedCourse: Course | undefined;
  selectedDate: Moment;
};
function Calendar({ selectedCourse, selectedDate }: CalendarType): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);
  const [data, setData] = useState<Array<CalendarData>>([]);

  useEffect(() => {
    const courseId = selectedCourse?.id;
    if (!courseId) return;

    (async () => {
      const startDate = selectedDate.clone().startOf('week');
      const endDate = selectedDate.clone().endOf('week');
      const sessions = await CourseService.getSessionsByCourse(
        courseId,
        startDate.toDate(),
        endDate.toDate(),
      );

      const formatedData = formatSessions(sessions, startDate, endDate);
      setData(formatedData);
      setValue(1);
    })();
  }, [selectedCourse, selectedDate]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        <TabItemHeader classes={classes} />
        {data.map((item, index) => (
          <TabItem key={index} item={item} classes={classes} />
        ))}
      </Tabs>
      {data.map((item, index) => (
        <TabPanel
          classes={classes}
          key={index}
          value={value}
          index={index + 1}
          calendarData={item}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
}

export default React.memo(Calendar);

const tableWidth = {
  xs: 160,
  sm: 200,
  md: 280,
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.table,
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(3),
  },
  tabItem: {
    [theme.breakpoints.down('xs')]: {
      minWidth: tableWidth.xs,
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: tableWidth.sm,
    },
    [theme.breakpoints.up('md')]: {
      minWidth: tableWidth.md,
    },
    minHeight: 52,
    padding: 12,
    borderBottom: `1px solid ${theme.palette.divider}`,
    cursor: 'pointer',
    '&:last-child': {
      border: 'none',
    },
  },
  tab: {
    position: 'absolute',
    marginTop: -12,
    marginLeft: -12,
    border: 'none',
  },
  tabs: {
    [theme.breakpoints.down('xs')]: {
      minWidth: tableWidth.xs,
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: tableWidth.sm,
    },
    [theme.breakpoints.up('md')]: {
      minWidth: tableWidth.md,
    },
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabPanel: {
    [theme.breakpoints.down('xs')]: {
      minWidth: `calc(100% - ${tableWidth.xs}px)`,
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: `calc(100% - ${tableWidth.sm}px)`,
    },
    [theme.breakpoints.up('md')]: {
      minWidth: `calc(100% - ${tableWidth.md}px)`,
    },
  },
  chip: {
    backgroundColor: '#CCCCCC',
  },
  date: {
    fontWeight: 700,
  },
  button: {
    minWidth: theme.spacing(4),
  },
}));
