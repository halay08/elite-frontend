import React from 'react';

import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';

export default (props: { showParticipantList$: EventEmitter<void> }) => {
  return (
    <Button
      size="small"
      onClick={() => props.showParticipantList$.emit()}
      startIcon={<PersonIcon fontSize="small" />}
    ></Button>
  );
};
