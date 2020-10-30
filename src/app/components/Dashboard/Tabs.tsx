import React, { useState } from 'react';
import { makeStyles, Grid, withStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { Sessions } from './Sessions';
import { RecommendedTutors } from './RecommendedTutors';

const tabs = ['upcoming', 'completed', 'recommended'];

const Tabs = () => {
  const classes = useStyles();
  const { t: translator } = useTranslation();
  const translatedTexts = translations.dashboard.tabs;
  const [current, setCurrent] = useState(tabs[0]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: string,
  ) => {
    setCurrent(nextView);
  };

  return (
    <>
      <Grid container md={7} className={classes.root}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          wrap="nowrap"
        >
          <ToggleButtonGroup value={current} exclusive onChange={handleChange}>
            {tabs.map(tab => {
              return (
                <ColorButton size="small" value={tab}>
                  {translator(translatedTexts[tab])}
                </ColorButton>
              );
            })}
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      {current !== 'recommended' && <Sessions type={current} />}
      {current === 'recommended' && <RecommendedTutors />}
    </>
  );
};

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
    textDecoration: 'none',
    textTransform: 'none',
    border: 'none',
    borderRight: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 0,
    paddingTop: 0,
    paddingBottom: 0,
    fontWeight: 'normal',

    '&:hover': {
      fontWeight: 'bold',
      backgroundColor: 'transparent',
    },
  },
  selected: {
    fontWeight: 'bold',
    color: `${theme.palette.primary.main} !important`,
    backgroundColor: 'transparent !important',
    '&:hover': {
      backgroundColor: 'transparent !important',
    },
  },
}))(ToggleButton);

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),

    '& > div > div > button:first-child': {
      paddingLeft: 0,
    },
    '& > div > div > button:last-child': {
      border: 'none',
    },
  },
}));

export { Tabs };
