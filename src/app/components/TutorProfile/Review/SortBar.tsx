import React, { useState } from 'react';
import {
  Grid,
  Typography,
  makeStyles,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';

function SortBar(): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { tutorReview } = translations;
  const { options } = tutorReview.sort;
  const optionKeys = Object.keys(options);
  const [sort, setSort] = useState<string>(optionKeys[0]);
  const handleChange = e => setSort(e.target.value);

  return (
    <Grid
      container
      justify="flex-end"
      alignItems="center"
      className={classes.container}
    >
      <Typography component="span" className={`${classes.label}`}>
        {translator(tutorReview.sort.label)}
      </Typography>
      <FormControl variant="outlined">
        <Select
          onChange={handleChange}
          value={sort}
          autoWidth={true}
          className={classes.select}
        >
          {optionKeys.map((key, index) => (
            <MenuItem key={index} value={key}>
              {translator(options[key])}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}

export default SortBar;

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
  },
  label: {
    marginRight: theme.spacing(1.5),
  },
  select: {
    backgroundColor: theme.palette.background.white,
  },
}));
