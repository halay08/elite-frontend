import React, { ChangeEvent, useMemo } from 'react';
import {
  Grid,
  Typography,
  makeStyles,
  withStyles,
  Button,
  Badge,
  Theme,
  createStyles,
  Collapse,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { sortByReview, sortByAvailability } from 'store/TutorBlock/actions';
import { connect } from 'react-redux';
import { generateFontSize } from 'styles/theme';
import { SubmitHandler } from 'react-hook-form';
import { useToggle } from 'ahooks';
import CustomSelect from './CustomSelect';
import clsx from 'clsx';

const mapDispathToProps = dispatch => ({
  sortByReview: order => dispatch(sortByReview(order)),
  sortByAvailability: order => dispatch(sortByAvailability(order)),
});

type SortBarProps = {
  sortByReview: Function;
  sortByAvailability: Function;
  filterOnline: Function;
  handleFilter: SubmitHandler<Record<string, any>>;
};
function SortBar({
  sortByReview,
  sortByAvailability,
  filterOnline,
  handleFilter,
}: SortBarProps): JSX.Element {
  const classes = useStyles();
  const { sortBar, filterBar } = translations;
  const { t: translator } = useTranslation();
  const [isOpenFilter, { toggle: toggleFilter }] = useToggle();
  const [isOnline, { toggle: toggleOnline }] = useToggle();

  const handleChangeAvailability = (e: ChangeEvent<{ value: unknown }>) => {
    sortByAvailability(parseInt(String(e.target.value)));
  };

  const handleChangeReviews = (e: ChangeEvent<{ value: unknown }>): void => {
    sortByReview(parseInt(String(e.target.value)));
  };

  const handleToggleOnline = () => {
    toggleOnline();
    filterOnline(!isOnline);
  };

  const onlineButtonStyle = useMemo(
    () =>
      clsx(classes.button, {
        [classes.primaryButton]: isOnline,
      }),
    [isOnline, classes.button, classes.primaryButton],
  );

  const filterButtonStyle = useMemo(
    () =>
      clsx(classes.button, {
        [classes.primaryButton]: isOpenFilter,
      }),
    [isOpenFilter, classes.button, classes.primaryButton],
  );

  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={3}
        className={classes.sortBar}
      >
        <Grid item>
          <Typography
            component="span"
            variant="body2"
            className={classes.sortLabel}
          >
            {translator(sortBar.title)}
          </Typography>
        </Grid>
        <Grid item>
          <CustomSelect
            name="availability"
            onChange={handleChangeAvailability}
            options={sortBar.options}
            label={translator(sortBar.availability)}
          />
        </Grid>
        <Grid item>
          <CustomSelect
            name="review"
            onChange={handleChangeReviews}
            options={sortBar.options}
            label={translator(sortBar.reviews)}
          />
        </Grid>
        <Grid item className={classes.buttonGroup}>
          <Button
            className={onlineButtonStyle}
            onClick={() => handleToggleOnline()}
            endIcon={<StyledBadge overlap="circle" variant="dot" />}
          >
            {translator(sortBar.online)}
          </Button>
          <Button className={filterButtonStyle} onClick={() => toggleFilter()}>
            {translator(sortBar.advancedFilter)}
          </Button>
        </Grid>
      </Grid>
      <Collapse in={isOpenFilter} timeout="auto" unmountOnExit>
        <Grid
          container
          justify="flex-end"
          alignItems="center"
          className={classes.filterBar}
        >
          <Grid item>
            <CustomSelect
              name="category"
              options={filterBar.category.options}
              label={translator(filterBar.category.label)}
            />
          </Grid>
          <Grid item>
            <CustomSelect
              name="expertise"
              options={filterBar.expertise.options}
              label={translator(filterBar.expertise.label)}
            />
          </Grid>
          <Grid item>
            <CustomSelect
              name="time"
              options={filterBar.time.options}
              label={translator(filterBar.time.label)}
            />
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
}

export default connect(null, mapDispathToProps)(SortBar);

const useStyles = makeStyles(theme => ({
  sortBar: {
    padding: theme.spacing(2),
    paddingBottom: 0,
    marginBottom: 0,
  },
  filterBar: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.background.border}`,
  },
  label: {
    paddingRight: theme.spacing(1.5),
  },
  sortLabel: {
    fontWeight: 700,
  },
  buttonGroup: {
    marginLeft: 'auto',
  },
  button: {
    border: `1px solid ${theme.palette.background.border}`,
    borderRadius: theme.spacing(4),
    textTransform: 'uppercase',
    padding: '8px 20px',
    marginLeft: theme.spacing(2),
    ...generateFontSize(8, 10, 12),
  },
  primaryButton: {
    color: theme.palette.background.white,
    backgroundColor: theme.palette.primary.main,
  },
}));

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: 8,
    },
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }),
)(Badge);
