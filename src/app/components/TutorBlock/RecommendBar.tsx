import React, { MouseEventHandler } from 'react';
import { Grid, Typography, makeStyles, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Tutor } from 'types/Tutor';
import { handleAdvancedSearchPopup } from 'store/TutorBlock/actions';
import { connect } from 'react-redux';

const mapDispathToProps = dispatch => ({
  handleAdvancedSearchPopup: isOpen =>
    dispatch(handleAdvancedSearchPopup(isOpen)),
});

type RecommendBarProps = {
  tutors: Array<Tutor>;
  text: any;
  handleGetOnline: MouseEventHandler<HTMLButtonElement>;
  handleAdvancedSearchPopup: Function;
};
function RecommendBar({
  tutors,
  text,
  handleGetOnline,
  handleAdvancedSearchPopup,
}: RecommendBarProps): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();

  const handleOpenAdvancedSearch = () => {
    handleAdvancedSearchPopup(true);
  };

  return (
    <Grid container spacing={2} className={classes.container}>
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
        <Grid item>
          <Typography variant="h3">
            {translator(text.title, { available: tutors.length })}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">
            {translator(text.subTitle, {
              recommended: tutors.length,
            })}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        container
        justify="space-around"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleOpenAdvancedSearch}
          >
            {translator(text.button.choose)}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleGetOnline}
          >
            {translator(text.button.online)}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default connect(null, mapDispathToProps)(RecommendBar);

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.white,
    border: `15px solid ${theme.palette.background.default}`,
  },
}));
