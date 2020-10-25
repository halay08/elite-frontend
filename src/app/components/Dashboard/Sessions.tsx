import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Grid,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Link } from 'react-router-dom';
import isEmpty from 'ramda.isempty';
import { EmptySessions } from './EmptySessions';

import { sessions, SessionData } from './mocks';

type Props = {
  type?: string;
};

const Sessions = ({ type = 'upcoming' }: Props) => {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const translatedTexts = translations.dashboard.sessionsTable;

  const [data, setData] = useState<SessionData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setData(sessions[type]);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [type]);

  if (isLoading) {
    return (
      <Grid
        container
        md={7}
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <CircularProgress size={26} />
      </Grid>
    );
  }

  if (isEmpty(data)) {
    return <EmptySessions />;
  }

  return (
    <>
      <Grid container md={7} className={classes.root}>
        <div className={classes.tableContainer}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="left" className={classes.smallCol}>
                  {translator(translatedTexts.date)}
                </TableCell>
                <TableCell align="left" className={classes.smallCol}>
                  {translator(translatedTexts.day)}
                </TableCell>
                <TableCell align="left" className={classes.smallCol}>
                  {translator(translatedTexts.session)}
                </TableCell>
                <TableCell align="left" className={classes.largeCol}>
                  {translator(translatedTexts.tutor)}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <TableRow key={row.id}>
                  <TableCell align="left" className={classes.smallCol}>
                    {row.date}
                  </TableCell>
                  <TableCell align="left" className={classes.smallCol}>
                    {row.day}
                  </TableCell>
                  <TableCell align="left" className={classes.smallCol}>
                    {row.session}
                  </TableCell>
                  <TableCell align="left" className={classes.largeCol}>
                    {row.tutor}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Grid>

      <Grid
        container
        md={7}
        justify="center"
        alignItems="center"
        className={classes.buttonContainer}
      >
        <Button
          size="small"
          variant="outlined"
          color="primary"
          component={Link}
          to="/"
          className={classes.button}
        >
          {translator(translatedTexts.button[type])}
        </Button>
      </Grid>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    display: 'flex',
  },
  table: {
    width: '100%',

    '& .MuiTableRow-root': {
      height: '30px',
    },

    '& .MuiTableCell-root': {
      padding: '0 !important',
      paddingTop: `${theme.spacing(1)}px !important`,
      paddingRight: `${theme.spacing(2)}px !important`,
    },

    '& th': {
      color: theme.palette.primary.main,
    },

    '& td, & th': {
      border: 'none',
    },
  },
  smallCol: {
    width: '20%',
  },
  largeCol: {
    width: '40%',
  },
  tableContainer: {
    width: '100%',
    overflowX: 'hidden',
  },
  button: {
    textTransform: 'none',
    borderRadius: 0,
    marginTop: theme.spacing(1),
  },
  buttonContainer: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
}));

export { Sessions };
