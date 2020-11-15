import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';

function Event({ event }) {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const translatedTexts = translations.bigCalendar;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const start = moment(event.start).format('HH:mm');
  const end = moment(event.end).format('HH:mm');

  return (
    <div className={classes.eventWrapper}>
      <button type="button" onClick={handleClick} className={classes.event}>
        {`${start}-${end} ${event.title}`}
      </button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{ paper: classes.popup }}
      >
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid
            item
            style={{
              color: `#${event.hexColor}`,
              width: '100%',
            }}
          >
            <Typography variant="h6">{event.title}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              {translator(translatedTexts.start)}: <b>{start}</b>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              {translator(translatedTexts.end)}: <b>{end}</b>
            </Typography>
          </Grid>
        </Grid>
      </Popover>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    event: { fontWeight: 'bold' },
    popup: {
      width: '200px',
      height: '150px',
      padding: theme.spacing(1),
    },
    fullHeight: { height: '100%' },
    icon: {
      position: 'relative',
      width: theme.typography.h6.fontSize,
      height: theme.typography.h6.fontSize,
    },
    eventWrapper: {
      height: '100%',
    },
  }),
);

export default Event;
