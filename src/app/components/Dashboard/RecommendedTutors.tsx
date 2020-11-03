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
import { TutorData, recommendedTutors } from './mocks';
import { Star as StarIcon } from '@material-ui/icons';
import { getDisplayStars, getShortDisplayName } from 'utils/helpers/user';
import { UserAvatar } from 'app/components/Avatar';

const RecommendedTutors = () => {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const translatedTexts = translations.dashboard.tutorsTable;

  const [data, setData] = useState<TutorData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const preparedData = data.map(tutor => {
    const { name = '', surname = '' } = tutor;
    return {
      ...tutor,
      displayName: getShortDisplayName(name, surname),
      stars: getDisplayStars(tutor.stars),
    };
  });

  useEffect(() => {
    setIsLoading(true);
    setData(recommendedTutors);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
    return <></>;
  }

  return (
    <>
      <Grid container md={7} className={classes.root}>
        <div className={classes.tableContainer}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="left" className={classes.largeCol}>
                  {translator(translatedTexts.tutor)}
                </TableCell>
                <TableCell align="left" className={classes.largeCol}>
                  {translator(translatedTexts.country)}
                </TableCell>
                <TableCell align="left" className={classes.smallCol}>
                  {translator(translatedTexts.happyUsers)}
                </TableCell>
                <TableCell
                  align="left"
                  className={classes.smallCol}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {preparedData.map(row => (
                <TableRow key={row.id}>
                  <TableCell align="left" className={classes.largeCol}>
                    <div className={classes.nameContainer}>
                      <UserAvatar user={row} size={3} withBorder={false} />
                      <span className={classes.displayName}>
                        {row.displayName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell align="left" className={classes.largeCol}>
                    {row.country}
                  </TableCell>
                  <TableCell align="left" className={classes.smallCol}>
                    <StarIcon className={classes.icon} />
                    {row.stars}
                  </TableCell>
                  <TableCell align="left" className={classes.smallCol}>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      component={Link}
                      to="/"
                      className={classes.button}
                    >
                      {translator(translatedTexts.button)}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
    width: '30%',
  },
  tableContainer: {
    width: '100%',
    overflowX: 'hidden',
  },
  button: {
    textTransform: 'none',
    borderRadius: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: '6px',
  },
  icon: {
    fontSize: 'inherit',
    color: theme.palette.success.main,
    marginRight: '3px',
  },
  displayName: {
    marginLeft: theme.spacing(0.5),
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
}));

export { RecommendedTutors };
