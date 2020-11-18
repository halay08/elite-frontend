import React from 'react';

import { EventEmitter } from 'ahooks/lib/useEventEmitter';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import ChatDrawerButton from '../Buttons/ChatButton/ChatDrawerButton';
import ToggleParticipantsListButton from '../Buttons/ToggleParticipantsListButton/ToggleParticipantsListButton';

export default function TopMenu(props: {
  showParticipantList$: EventEmitter<void>;
}) {
  const classes = useStyles();

  return (
    <>
      <ButtonGroup
        size="small"
        aria-label="small outlined button group"
        className={classes.floatBtnGroup}
      >
        <ToggleParticipantsListButton
          showParticipantList$={props.showParticipantList$}
        />
        <ChatDrawerButton />
      </ButtonGroup>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    floatBtnGroup: {
      position: 'fixed',
      top: 0,
      right: 0,
      zIndex: 1500,
      borderRadius: '0px 0px 0px 4px',
      background: 'white',
      padding: '10px',
      '& > button': {
        border: '0px',
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    closeDrawerBtn: {
      color: 'rgb(255 255 255)',
      paddingLeft: '0px',
      position: 'absolute',
      left: '-5px',
      padding: '0px',
      width: '100%',
      textAlign: 'left',
    },
    closeDrawerIco: {
      position: 'absolute',
      left: '0px',
      width: '100%',
    },
  }),
);
