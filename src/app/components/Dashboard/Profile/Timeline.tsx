import React from 'react';
import {
  makeStyles,
  createStyles,
  withStyles,
  Theme,
  Box,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import LinearProgress from '@material-ui/core/LinearProgress';

type Props = {
  value: number;
};

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 4,
      borderRadius: 20,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 20,
      backgroundColor: theme.palette.primary.main,
    },
  }),
)(LinearProgress);

function Progress({ value }: Props) {
  return (
    <div style={{ width: '100%' }}>
      <BorderLinearProgress variant="determinate" value={value} />
    </div>
  );
}

const Timeline = ({ value }: Props) => {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const translatedTexts = translations.dashboard.profile;

  return (
    <Box mt={2} flex={1} display="flex" flexDirection="column">
      <Box display="flex" alignItems="center" className={classes.progress}>
        <Box component="p" color="text.secondary">
          {translator(translatedTexts.timelineHeader)}
        </Box>
        <Box minWidth={35} className={classes.value}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            value,
          )}%`}</Typography>
        </Box>
      </Box>
      <Box mt={1}>
        <Progress value={value} />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  progress: {
    justifyContent: 'space-between',
  },
  value: {
    textAlign: 'right',
    '& p': {
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    },
  },
}));
export default Timeline;
