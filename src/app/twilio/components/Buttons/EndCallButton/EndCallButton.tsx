import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';

import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      background: theme.brand,
      color: 'white',
      '&:hover': {
        background: '#600101',
      },
    },
  }),
);

export default function EndCallButton(props: { className?: string }) {
  const classes = useStyles();
  const { room } = useVideoContext();

  const { t: translator } = useTranslation();
  const { button: t } = translations.room;

  return (
    <Button
      onClick={() => room.disconnect()}
      className={clsx(classes.button, props.className)}
      data-cy-disconnect
    >
      {translator(t.disconnect)}
    </Button>
  );
}
