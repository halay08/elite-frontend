import React from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

type SummaryItemType = {
  label: string;
  value: number;
};
function SummaryItem({ label, value }: SummaryItemType): JSX.Element {
  const classes = useStyles();

  return (
    <Grid
      item
      xs={3}
      sm={3}
      md={3}
      container
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      <Rating
        name="read-only"
        value={value}
        precision={0.5}
        className={classes.rating}
        readOnly
      />
      <Typography component="span">{label}</Typography>
    </Grid>
  );
}

function RatingBlock(): JSX.Element {
  const { t: translator } = useTranslation();
  const { tutorReview } = translations;

  return (
    <>
      <SummaryItem
        label={translator(tutorReview.summary.punctual)}
        value={2.5}
      />
      <SummaryItem
        label={translator(tutorReview.summary.organized)}
        value={2}
      />
      <SummaryItem label={translator(tutorReview.summary.engaging)} value={5} />
    </>
  );
}

export default RatingBlock;

const useStyles = makeStyles(theme => ({
  rating: {
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      fontSize: 10,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 12,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 16,
    },
  },
}));
