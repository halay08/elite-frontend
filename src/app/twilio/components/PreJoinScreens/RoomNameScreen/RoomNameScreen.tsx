import React, { ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import {
  Typography,
  makeStyles,
  TextField,
  Grid,
  Button,
  InputLabel,
  Theme,
} from '@material-ui/core';
import { useAppState } from '../../../state';

interface RoomNameScreenProps {
  name: string;
  roomName: string;
  setName: (name: string) => void;
  setRoomName: (roomName: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function RoomNameScreen({
  name,
  roomName,
  setName,
  setRoomName,
  handleSubmit,
}: RoomNameScreenProps) {
  const classes = useStyles();
  const { user } = useAppState();

  const { t: translator } = useTranslation();
  const { prejoinScreen: p } = translations.room;

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const hasUsername =
    !window.location.search.includes('customIdentity=true') &&
    user?.displayName;

  return (
    <>
      <Typography variant="h5" className={classes.gutterBottom}>
        {translator(p.join)}
      </Typography>
      <Typography variant="body1">
        {hasUsername
          ? translator(p.enterTheRoomName)
          : translator(p.enterTheRoomNameLikeToJoin)}
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className={classes.inputContainer}>
          {!hasUsername && (
            <div className={classes.textFieldContainer}>
              <InputLabel shrink htmlFor="input-user-name">
                {translator(p.yourName)}
              </InputLabel>
              <TextField
                id="input-user-name"
                variant="outlined"
                fullWidth
                size="small"
                value={name}
                onChange={handleNameChange}
              />
            </div>
          )}
          <div className={classes.textFieldContainer}>
            <InputLabel shrink htmlFor="input-room-name">
              {translator(p.roomName)}
            </InputLabel>
            <TextField
              autoCapitalize="false"
              id="input-room-name"
              variant="outlined"
              fullWidth
              size="small"
              value={roomName}
              onChange={handleRoomNameChange}
            />
          </div>
        </div>
        <Grid container justify="flex-end">
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={!name || !roomName}
            className={classes.continueButton}
          >
            {translator(p.continue)}
          </Button>
        </Grid>
      </form>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  gutterBottom: {
    marginBottom: '1em',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1.5em 0 3.5em',
    '& div:not(:last-child)': {
      marginRight: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '1.5em 0 2em',
    },
  },
  textFieldContainer: {
    width: '100%',
  },
  continueButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));
