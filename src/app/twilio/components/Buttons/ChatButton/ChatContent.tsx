import React, { useRef } from 'react';
import { useMount, useUpdateEffect } from 'ahooks';
import Linkify from 'linkifyjs/react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ChatInput from './ChatInput';
import { useAppState } from '../../../state';
import { IDataTrackCommunication } from '../../../types';

const formatText = (msg: Partial<IDataTrackCommunication>) => {
  const { author, message } = msg;

  return (
    <span>
      <b>{author}</b>: <Linkify>{message}</Linkify>
    </span>
  );
};

export default function ChatContent() {
  const classes = useStyles();
  const { messages } = useAppState();
  const bottomEl = useRef<HTMLDivElement>(document.createElement('div'));

  const scrollToBottom = () => {
    if (typeof bottomEl.current !== 'undefined' || bottomEl !== null)
      bottomEl.current.scrollIntoView({ behavior: 'smooth' });
  };

  useMount(() => {
    scrollToBottom();
  });

  useUpdateEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <React.Fragment>
      <div className={classes.fullList} role="presentation">
        <List>
          {messages.map((message, index) => {
            return (
              <ListItem button key={index} className={classes.chatBubble}>
                <ListItemText>
                  <Typography variant="caption">
                    {formatText(message)}
                  </Typography>
                </ListItemText>
              </ListItem>
            );
          })}
          <div ref={bottomEl} />
        </List>
        <div className={classes.chatInputContainer}>
          <ChatInput />
        </div>
      </div>
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  fullList: {
    width: 300,
    height: '90%',
    overflowY: 'auto',
  },
  chatBubble: {
    padding: '0px 10px',
    wordBreak: 'break-word',
    cursor: 'initial',
  },
  chatInputContainer: {
    position: 'absolute',
    bottom: '0px',
    padding: '20px 10px',
    width: '100%',
    boxShadow:
      '-10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)',
  },
}));
