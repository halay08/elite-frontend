import React from 'react';
import { makeStyles, Box, Icon } from '@material-ui/core';
import CompletedSessions from 'statics/completed.svg';
import UpcomingSessions from 'statics/upcoming.svg';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { hideIfNoData } from 'helpers';
import isEmpty from 'ramda.isempty';

type Props = {
  sessions: {
    coming: number;
    completed: number;
  };
};

const checkProps = hideIfNoData(({ sessions }: Props) => isEmpty(sessions));

const Sessions = ({ sessions }: Props) => {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const translatedTexts = translations.dashboard.profile;

  return (
    <Box mt={2} flex={1} display="flex" flexDirection="column">
      <Box component="p" color="text.secondary" className={classes.title}>
        {translator(translatedTexts.sessionsHeader)}
      </Box>
      <Box
        mt={1}
        width={1}
        px={2}
        py={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        className={classes.root}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={1 / 2}
          className={classes.leftBox}
        >
          <Box>
            <Icon className={classes.svg}>
              <img
                className={classes.iconImg}
                src={CompletedSessions}
                alt="completed"
              />
            </Icon>
          </Box>
          <Box mt={1} component="p" className={classes.value}>
            {sessions.completed}
          </Box>
          <Box mt={0.5} component="p" className={classes.text}>
            {translator(translatedTexts.learnedSessions)}
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={1 / 2}
          className={classes.rightBox}
        >
          <Box>
            <Icon className={classes.svg}>
              <img
                className={classes.iconImg}
                src={UpcomingSessions}
                alt="upcoming"
              />
            </Icon>
          </Box>
          <Box mt={1} component="p" className={classes.value}>
            {sessions.coming}
          </Box>
          <Box mt={0.5} component="p" className={classes.text}>
            {translator(translatedTexts.upcomingSessions)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#FFDECC',
  },
  iconImg: {
    height: '100%',
  },
  svg: {
    fontSize: '3rem',
  },
  title: { textAlign: 'left' },
  leftBox: {
    textAlign: 'center',
  },
  rightBox: {
    textAlign: 'center',
    borderLeft: 'solid 1px rgba(204, 204, 204, 0.9)',
  },
  value: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  text: {
    fontSize: '0.75rem',
  },
}));

export default checkProps(Sessions);
