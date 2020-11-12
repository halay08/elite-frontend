import React from 'react';
import { IconButton, Box } from '@material-ui/core';
import { IconFlagUS } from 'material-ui-flags';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface Props {
  children?: JSX.Element;
}

const Lang = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <>
      <IconButton className={classes.headerButton}>
        <IconFlagUS />
        {children && (
          <Box ml={2} fontSize={16} component="span">
            {children}
          </Box>
        )}
      </IconButton>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerButton: {
      color: theme.palette.mainSidebarText.main,
    },
  }),
);

export { Lang };
