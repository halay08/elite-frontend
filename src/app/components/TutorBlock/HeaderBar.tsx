import React from 'react';
import {
  Grid,
  Typography,
  makeStyles,
  withStyles,
  Paper,
  InputBase,
  IconButton,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';
import { Tutor } from 'types/Tutor';
import { generateFontSize } from 'styles/theme';

type RecommendBarProps = {
  tutors: Array<Tutor>;
};
function HeaderBar({ tutors }: RecommendBarProps): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { availableBar } = translations;

  return (
    <Grid container className={classes.container}>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Typography component="p">
          {translator(availableBar.title, { available: tutors.length })}
        </Typography>
        <SubTitle component="p" variant="subtitle1">
          {translator(availableBar.subTitle, {
            from: 1,
            to: 20,
            available: tutors.length,
          })}
        </SubTitle>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        container
        justify="flex-end"
        alignItems="center"
      >
        <Paper component="form" className={classes.form}>
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder={translator(availableBar.search)}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default HeaderBar;

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.background.white,
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    width: 400,
    boxShadow: 'none',
    border: `1px solid ${theme.palette.background.dark}`,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const SubTitle = withStyles({
  root: {
    ...generateFontSize(8, 10, 12),
  },
})(Typography) as typeof Typography;
