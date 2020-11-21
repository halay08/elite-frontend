import React from 'react';
import { useEventEmitter } from 'ahooks';
import { styled } from '@material-ui/core/styles';

import ParticipantList from '../ParticipantList/ParticipantList';
import MainParticipant from '../MainParticipant/MainParticipant';
import TopMenu from '../TopMenu/TopMenu';

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: `1fr ${theme.sidebarWidth}px`,
  gridTemplateRows: '100%',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: `100%`,
    gridTemplateRows: `1fr ${theme.sidebarMobileHeight + 16}px`,
  },
}));

export default function Room() {
  const showParticipantList$ = useEventEmitter();

  return (
    <Container>
      <TopMenu showParticipantList$={showParticipantList$} />
      <MainParticipant />
      <ParticipantList show$={showParticipantList$} />
    </Container>
  );
}
