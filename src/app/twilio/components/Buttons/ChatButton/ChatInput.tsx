import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, TextField } from '@material-ui/core';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import { useAppState } from '../../../state';
import { IDataTrackCommunication } from '../../../types';

export default function ChatInput() {
  const classes = useStyles();

  const [text, setText] = useState('');
  const { room } = useVideoContext();
  const { setMessage } = useAppState();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text) {
      // Get the LocalDataTrack that we published to the room.
      const [localDataTrackPublication] = [
        ...room.localParticipant.dataTracks.values(),
      ];

      const msg: IDataTrackCommunication = {
        author: room.localParticipant.identity,
        message: text,
        type: 'chat',
      };

      // Send the message
      localDataTrackPublication.track.send(JSON.stringify(msg));

      // Push message to the array list of message
      setMessage(msg);

      //Reset the text field
      setText('');
    }
  };

  return (
    <form
      autoComplete="off"
      className={classes.formControl}
      onSubmit={handleSubmit}
    >
      <FormControl>
        <TextField
          value={text}
          autoFocus={true}
          onChange={handleChange}
          size="small"
          className={classes.chatInput}
        />
      </FormControl>
    </form>
  );
}

const useStyles = makeStyles(theme => ({
  formControl: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',

    '& .MuiFormControl-root': {
      width: '100%',
    },
  },

  chatInput: {
    width: '100%',

    '& input': {
      fontSize: '14px',
    },
  },
}));
