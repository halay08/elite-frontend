import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Tutor } from 'types/Tutor';
import path from 'ramda.path';
import Title from './Title';

type TableRowType = {
  label: string;
  value?: string;
};
const TableRow = ({ label, value }: TableRowType): JSX.Element => (
  <Grid item container justify="space-between">
    <Typography component="span">{label}</Typography>
    {!!value && <Typography component="span">{value}</Typography>}
  </Grid>
);

type ExperiencesType = {
  tutor: Tutor;
};
function Experiences({ tutor }: ExperiencesType): JSX.Element {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const { experiences } = translations.tutorSidebar;

  const createdAt = tutor.createdAt
    ? new Date(tutor.createdAt).toLocaleDateString()
    : '';
  const totalHours = Math.round(
    (Date.now() - (tutor.createdAt || Date.now())) / (3600 * 1000),
  );

  return (
    <Grid item>
      <Grid item xs={12} sm={12} md={12}>
        <Title
          title={translator(experiences.title)}
          subTitle={translator(experiences.since) + createdAt}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} className={classes.table}>
        <TableRow
          label={translator(experiences.country)}
          value={path(['country', 'name'], tutor)}
        />
        <TableRow
          label={translator(experiences.certified)}
          value={path(['certificates', 0, 'name'], tutor)}
        />
        <TableRow
          label={translator(experiences.category)}
          value={tutor.category.name}
        />
        <TableRow
          label={translator(experiences.hour)}
          value={totalHours?.toString()}
        />
        <TableRow
          label={translator(experiences.lession.completed)}
          value={'0'}
        />
        <TableRow label={translator(experiences.lession.missed)} value={'0'} />
        <TableRow
          label={translator(experiences.happy)}
          value={tutor.happyUsers?.toString()}
        />
      </Grid>
    </Grid>
  );
}

export default Experiences;

const useStyles = makeStyles(theme => ({
  table: {
    backgroundColor: theme.palette.background.white,
    '& .MuiGrid-item': {
      padding: theme.spacing(1.5),
      border: `1px solid ${theme.palette.background.dark}`,
      borderTop: 'none',
    },
  },
}));
