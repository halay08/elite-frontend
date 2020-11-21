import React, { useState } from 'react';
// import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/Icon';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';

import Participant from '../Participant/Participant';
import { useUpdateEffect } from 'ahooks';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';

import {
  makeStyles,
  createStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';
import useMainParticipant from '../../hooks/useMainParticipant/useMainParticipant';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant';
import useScreenShareParticipant from '../../hooks/useScreenShareParticipant/useScreenShareParticipant';

export default function ParticipantList(props: { show$: EventEmitter<void> }) {
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const theme = useTheme();

  const {
    room: { localParticipant },
  } = useVideoContext();
  const participants: any = useParticipants();
  const [
    selectedParticipant,
    setSelectedParticipant,
  ] = useSelectedParticipant();
  const screenShareParticipant = useScreenShareParticipant();
  const mainParticipant = useMainParticipant();

  props.show$.useSubscription(() => {
    setOpen(true);
  });

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  useUpdateEffect(() => {
    const isRemoteParticipantScreenSharing =
      screenShareParticipant && screenShareParticipant !== localParticipant;

    if (isRemoteParticipantScreenSharing) setOpen(false);
  }, [screenShareParticipant, localParticipant]);

  if (participants.length === 0) return null; // Don't render this component if there are no remote participants.

  return (
    <>
      <Drawer
        open={open}
        variant="persistent"
        onClose={handleCloseDrawer}
        anchor="right"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Button
            className={classes.closeDrawerBtn}
            onClick={handleCloseDrawer}
          >
            <IconButton className={classes.closeDrawerIco}>
              {theme.direction === 'rtl' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </Button>
        </div>
        <Divider />
        <Participant participant={localParticipant} isLocalParticipant={true} />
        {participants.map(participant => {
          const isSelected = participant === selectedParticipant;
          const hideParticipant =
            participant === mainParticipant &&
            participant !== screenShareParticipant &&
            !isSelected;
          return (
            <Participant
              key={participant.sid}
              participant={participant}
              isSelected={participant === selectedParticipant}
              onClick={() => setSelectedParticipant(participant)}
              hideParticipant={hideParticipant}
            />
          );
        })}
      </Drawer>
    </>
  );
}

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      '& > .MuiDrawer-paper': {
        background: 'transparent',
        padding: '0px 20px 10px 0px',
        border: 'none',
        height: '50%',
        top: '60px',
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
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
