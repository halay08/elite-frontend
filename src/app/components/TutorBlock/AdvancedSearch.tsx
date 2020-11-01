import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  Typography,
  Grid,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import React from 'react';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';
import { SlideProps } from '@material-ui/core/Slide';
import { useForm, Controller, Control, SubmitHandler } from 'react-hook-form';
import { handleAdvancedSearchPopup } from 'store/TutorBlock/actions';
import { connect } from 'react-redux';
import { State } from 'store/configureStore';

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

type searchSelectProps = {
  control: Control;
  name: string;
  options?: any;
  optionalOptions?: Array<string | number>;
  translations: any;
};
function SearchSelect({
  control,
  name,
  options = [],
  optionalOptions = [],
  translations,
}: searchSelectProps): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const optionKeys = Object.keys(options || {});

  return (
    <>
      <Typography component="p" variant="body1" className={classes.textCenter}>
        {translator(translations.title)}
      </Typography>
      <Controller
        control={control}
        as={
          <Select variant="outlined">
            <MenuItem value="all">{translator(translations.all)}</MenuItem>
            {optionKeys.map((key, index) => (
              <MenuItem
                key={index}
                value={key === 'all' ? 'all' : translator(options[key])}
              >
                {translator(options[key])}
              </MenuItem>
            ))}
            {optionalOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        }
        defaultValue="all"
        name={name}
      />
    </>
  );
}

const mapStateToProps = (state: State) => ({
  isOpen: state.tutorBlockReducer.isOpenSearchPopup,
});

const mapDispathToProps = dispatch => ({
  handlePopup: isOpen => dispatch(handleAdvancedSearchPopup(isOpen)),
});

type AdvancedSearchProps = {
  isOpen: boolean;
  handlePopup: Function;
  onSubmit: SubmitHandler<Record<string, any>>;
};
function AdvancedSearch({
  onSubmit,
  handlePopup,
  isOpen,
}: AdvancedSearchProps): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const {
    advancedSearch,
    timeOfDay,
    dayOfWeek,
    language,
    level,
  } = translations;
  const { handleSubmit, control } = useForm();

  const handleClose = (): void => {
    handlePopup(false);
  };

  return (
    <Dialog
      maxWidth="md"
      TransitionComponent={Transition}
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle className={classes.title}>
        {translator(advancedSearch.title)}
        <Typography
          className={classes.subtitle}
          variant="subtitle1"
          component="p"
        >
          {translator(advancedSearch.subTitle)}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            direction="row"
            justify="space-around"
            spacing={3}
            className={classes.container}
          >
            <Grid item xs={6} container direction="column">
              <SearchSelect
                name="timeOfDay"
                control={control}
                options={timeOfDay}
                translations={advancedSearch.timeOfDay}
              />
            </Grid>
            <Grid item xs={6} container direction="column">
              <SearchSelect
                name="dayOfWeek"
                control={control}
                options={dayOfWeek}
                translations={advancedSearch.dayOfWeek}
              />
            </Grid>
            <Grid item xs={3} container direction="column">
              <SearchSelect
                name="month"
                control={control}
                translations={advancedSearch.month}
              />
            </Grid>
            <Grid item xs={3} container direction="column">
              <SearchSelect
                name="day"
                control={control}
                translations={advancedSearch.day}
              />
            </Grid>
            <Grid item xs={6} container direction="column">
              <SearchSelect
                name="time"
                control={control}
                translations={advancedSearch.time}
              />
            </Grid>
            <Grid item xs={6} container direction="column">
              <SearchSelect
                name="language"
                control={control}
                options={language}
                translations={advancedSearch.language}
              />
            </Grid>
            <Grid item xs={6} container direction="column">
              <SearchSelect
                name="perfectFor"
                control={control}
                options={level}
                translations={advancedSearch.perfectFor}
              />
            </Grid>
            <Grid item xs={12} container justify="flex-end">
              <Button
                startIcon={<SearchIcon />}
                variant="contained"
                color="primary"
                type="submit"
              >
                {translator(advancedSearch.button)}
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default connect(mapStateToProps, mapDispathToProps)(AdvancedSearch);

const useStyles = makeStyles(theme => ({
  title: {
    textTransform: 'uppercase',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
  },
  subtitle: {
    textTransform: 'none',
  },
  textCenter: {
    textAlign: 'center',
  },
  container: {
    width: '100%',
    margin: 0,
  },
}));
