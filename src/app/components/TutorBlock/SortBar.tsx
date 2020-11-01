import React, { ChangeEvent } from 'react';
import {
  Grid,
  Typography,
  makeStyles,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { sortByReview, sortByAvailability } from 'store/TutorBlock/actions';
import { connect } from 'react-redux';

const mapDispathToProps = dispatch => ({
  sortByReview: order => dispatch(sortByReview(order)),
  sortByAvailability: order => dispatch(sortByAvailability(order)),
});

type SortBarProps = {
  sortByReview: Function;
  sortByAvailability: Function;
};
function SortBar({
  sortByReview,
  sortByAvailability,
}: SortBarProps): JSX.Element {
  const classes = useStyles();
  const { sortBar } = translations;
  const { options } = sortBar;
  const { t: translator } = useTranslation();
  const optionKeys = Object.keys(options || {});

  const handleChangeAvailability = (e: ChangeEvent<{ value: unknown }>) => {
    sortByAvailability(parseInt(String(e.target.value)));
  };

  const handleChangeReviews = (e: ChangeEvent<{ value: unknown }>): void => {
    sortByReview(parseInt(String(e.target.value)));
  };

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={4}
      className={classes.container}
    >
      <Grid item>
        <Typography variant="h3">{translator(sortBar.title)}</Typography>
      </Grid>
      <Grid item>
        <Typography component="span" variant="body1">
          {translator(sortBar.availability)}
        </Typography>
        <Select
          variant="outlined"
          onChange={handleChangeAvailability}
          defaultValue="0"
        >
          {optionKeys.map((key, index) => (
            <MenuItem key={index} value={key}>
              {translator(options[key])}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item>
        <Typography component="span" variant="body1">
          {translator(sortBar.reviews)}
        </Typography>
        <Select
          variant="outlined"
          onChange={handleChangeReviews}
          defaultValue="0"
        >
          {optionKeys.map((key, index) => (
            <MenuItem key={index} value={key}>
              {translator(options[key])}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
}

export default connect(null, mapDispathToProps)(SortBar);

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    margin: 0,
    backgroundColor: theme.palette.background.white,
    border: `15px solid ${theme.palette.background.default}`,
  },
}));
