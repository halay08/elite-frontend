import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  makeStyles,
} from '@material-ui/core';

const DashboadCard = ({ title, children }) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" clone>
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          title={
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                component="p"
                className={classes.textTruncate}
                color="text.primary"
                alignSelf="flex-start"
              >
                {title}
              </Box>
            </Box>
          }
        />
        <CardContent className={classes.cardContent}>{children}</CardContent>
      </Card>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  textTruncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: '#5b5b5b',
  },
  card: {
    padding: '20px 24px',
    borderRadius: 0,
  },
  cardHeader: {
    padding: '0',
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    padding: '0',
    height: '100%',
    textAlign: 'center',
    '&:last-child': {
      paddingBottom: 0,
    },
  },
}));
export default DashboadCard;
