import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import useStyles from './styles';
import events from './events';
import Box from '@material-ui/core/Box';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
import Event from './Event';
import Toolbar from './Toolbar';
import 'moment/locale/vi';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import StyledRadio from './StyledRadio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import Grid from '@material-ui/core/Grid';

const localizer = momentLocalizer(moment);
const langs = ['en', 'vi'];
const sessions = ['coming', 'completed'];

const Calendar = props => {
  const classes = useStyles(props);
  const { t: translator } = useTranslation();
  const translatedTexts = translations.bigCalendar;
  const [lang, setLang] = useState(langs[0]);
  const [session, setSession] = useState(sessions[0]);

  const formats = {
    timeGutterFormat: 'HH:mm',
  };

  const eventStyleGetter = event => {
    return {
      style: { backgroundColor: `#${event.hexColor}` },
    };
  };

  const handleLangChange = event => {
    const value = event.target.value;
    moment.locale(value);
    setLang(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSession((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={1}
        className={classes.filterWrapper}
      >
        <Grid item xs={12} md={8}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              {translator(translatedTexts.filter)}:
            </FormLabel>
            <RadioGroup value={session} onChange={handleChange} row>
              {sessions.map(item => (
                <FormControlLabel
                  value={item}
                  control={<StyledRadio />}
                  label={translator(translatedTexts[item])}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={classes.langSelector}>
            <Select value={lang} onChange={handleLangChange}>
              {langs.map(item => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box className="app-calendar app-cul-calendar">
        <BigCalendar
          formats={formats}
          views={['month', 'week', 'day']}
          selectable
          className={classes.root}
          localizer={localizer}
          events={events}
          defaultDate={new Date()}
          eventPropGetter={eventStyleGetter}
          components={{
            event: Event,
            toolbar: Toolbar,
          }}
        />
      </Box>
    </>
  );
};

export default Calendar;
