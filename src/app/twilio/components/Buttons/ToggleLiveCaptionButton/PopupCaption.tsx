import React, { useState } from 'react';
import { useToggle, useUpdateEffect } from 'ahooks';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { useAppState } from '../../../state';

function ToggleLiveCaptionButton() {
  const classes = useStyles();
  const { caption } = useAppState();
  const [open, { toggle }] = useToggle();
  const [message, setMessage] = useState<string>();

  useUpdateEffect(() => {
    caption.map(({ message }) => {
      setMessage(message);
      return message;
    });
    toggle(true);
  }, [caption]);

  return (
    <Snackbar
      className={classes.container}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      message={message}
      autoHideDuration={5000}
      onClose={() => {
        toggle();
      }}
      style={{ textTransform: 'lowercase' }}
    />
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    bottom: `${theme.footerHeight + 5}px`,
  },
}));

export default ToggleLiveCaptionButton;
